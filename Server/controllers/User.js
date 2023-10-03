import { User } from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
import sendToken from "../utils/sendToken.js"
import ErrorHandler from "../utils/errorHandler.js"
import cloudinary from "cloudinary";
import catchAsyncError from "../middleware/catchAsyncError.js"


import fs from "fs";

// register user
export const register = async (req, res) => {
  try {
    // uploading to cloudinary
    const file = req.files.avatar;
    // console.log(file,"fbhjdshjbj")
    const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath,{
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    
    
    const { name, email, password, bloodgroup } = req.body;
    let user =await User.findOne({email});

    if (user) {
      return res
    .status(401)
    .json({ success: false, message: "User already exists"});
    };
    // delete tmp folder and files
    fs.rmSync("./tmp", { recursive: true });
    
    // Generate Otp
    const otp = Math.floor(Math.random() * 1000000);
 
    // After successfull search created a new user
    user = await User.create({
      name,
      email,
      password,
      bloodgroup,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });


     console.log(user);

    // Sending mail to verify

    await sendMail(
          email,
          "Verify your Account",
          `Your Otp is ${otp}.Please Verify within 5 minutes.`
         );
        // Sending Token as resposnse
         sendToken(user, 201, res,
          "OTP send to your email, Please verify your account within the 5 minutes"
          );

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message, 
       });
  };
};

//verify user

export const verify = async (req, res) => {
  try {
    const otp = Number(req.body.otp);
    const user = await User.findById(req.user._id);
    if (user.otp !== otp || user.otp_expiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or Your OTP has been  Expired",
      });
    }
    //else
    user.verified = true;
    user.otp = null;
    user.otp_expiry = null;
    
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Account Verified Successful",
    });
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//login user

export const login = async (req, res) => {
  try {
  const { email, password } = req.body;
  console.log(email, password)
  
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }
    // .select("+passwords") selects password during comparison of password on login
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password" });
    }
     
    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    console.log(user);
    // Sending Token as Response
    sendToken(user, 201, res,
      "Logged in successful"
      );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//logout user

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged out successful",
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
//Add Task/request

export const addTask = async (req, res) => {
  try {
    const {
      title,
      description,
      hospital_name,
      blood_group,
      number,
      latitude,
      longitude,
    } = req.body;
    const user = await User.findById(req.user._id);
    user?.tasks?.push({
      title,
      description,
      hospital_name,
      blood_group,
      number,
      latitude,
      longitude,
      completed: false,
      createdAt: new Date(Date.now()),
    });
    // console.log(user);
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Task added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// View task/request

export const viewTask = async (req, res) => {
  try {
    const userTasks = await User.findById(req?.user?._id);
    User.task = await User?.tasks?.find(task => task._id.toString());
    return res.status(200).json({ success: true, tasks: userTasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//update task/request
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const user = await User.findById(req.user._id);

    user.task = user.tasks.find(
      (task) => task._id.toString() === taskId.toString()
    );

    user.task.completed = !user.task.completed;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//remove task/request
export const removeTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const user = await User.findById(req.user._id);

    user.tasks = user.tasks.filter(
      (task) => task._id.toString() !== taskId.toString()
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Task removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



//view all task/request

export const viewAllTask = async (req, res) => {
  const data = await User.find();
  let allTasks = [];
  for (let i = 0; i < data.length; i++) {
    const tasks = data[i].tasks;
    for (let j = 0; j < tasks.length; j++) {
      const task = tasks[j];
      allTasks.push(task);
    }
  }
  console.log(allTasks,"All Taskssss");

  return res.status(200).json({
    success: true,
    allTasks,
    message: "Task added successfully",
  });

 
};

//update profile

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name } = req.body;
    const avatar = req.files.avatar.tempFilePath;

    if (name) user.name = name;

    if (avatar) {
      // first destroy previous avatar
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      // uploading to cloudinary
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });

      // delete tmp folder and files
      fs.rmSync("./tmp", { recursive: true });

      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update password

export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }
    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password doesnot matched.",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//forget password

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
    // create a otp
    const otp = Math.floor(Math.random() * 1000000);

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    await user.save();

    const message = `Your OTP is ${otp}. If you did not request it please ignore it.`;
    // Sending otp in mail to verify
    await sendMail(email, "Request to resetting password", message);

    res.status(200).json({
      success: true,
      message: `OTP sent to ${email}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//reset password

export const resetPassword = async (req, res, next) => {
  try {
    const { otp, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({
      resetPasswordOtp: otp,
      resetPasswordOtpExpiry: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP or has been expired." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password didn't matched.",
      });
    }

    user.password = newPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpiry = null; // 15 minutes expiry
    await user.save();

    res.status(200).json({
      success: true,
      message: `Password changed successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

  // Get User Details
export const getUserDetails = catchAsyncError(async(req,res)=> {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Get all user --admin

export const getAllUsers = catchAsyncError(async(req,res)=>{
  const users = await User.find();
  console.log("users",users,"*************")
  res.status(200).json({
    success: true,
    users,
  });
});
// Get Single User 
export const getSingleUser= catchAsyncError(async(req,re,nexts)=> {
  const user = await User.findById(req.params.id);
  if(!user){
    return next(
      new ErrorHandler(`User doenot existin this id ${req.params.id}`)
    );
    }
    res.status(200).json({
      success: true,
      user,
    });
  });
  
  // Update profile --admin

  export const updateUserRole =catchAsyncError(async(req,res,next)=>{
    const newUserData={
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
     await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "User Role updated successfully",
    });
  });
  
  // Delete user profile --admin
  
  export const deleteUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
      return next(
        new ErrorHandler(`User doenot existin this id ${req.params.id}`)
      );
    }
      // Cloudinary image remove
      const avatar = req.files.avatar.tempFilePath;
      
      await cloudinary.v2.uploader.destroy(avatar);

      await user.remove();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  });

