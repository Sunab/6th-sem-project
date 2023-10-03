import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Your Full Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be less than 50 characters long"], 
  },
  email: {
    type: String,
    required: [true,"Enter Your Email Address"],
    unique: true,
    validate:[validator.isEmail,"Please enter a valid Email Address"],
    minlength: [5, "Email must be at least 5 characters long"],
    maxlength: [50, "Email must be less than 50 characters long"],

  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be 8 characters long"],
    select: false,
  },
  bloodgroup: {
    type: String,
    required: true,

  },
  tasks: [
    {
      title: "String",
      description: "String",
      hospital_name: "String",
      blood_group: "String",
      number: Number,
      longitude: "String",
      latitude: "String",
      completed: Boolean,
      createdAt: Date,
    },
  ],
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: Number,
  otp_expiry: Date,
  resetPasswordOtp: Number,
  resetPasswordOtpExpiry: Date,
  resetPasswordToken: String,
});


//Password Hashing

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
//Generating JWTToken


userSchema.methods.getAuthToken=  function(){
  const token= jwt.sign({id:this._id.toString(),},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
  // return jwt.sign({ _id: this._id.toString(), }, process.env.JWT_SECRET, {
    // expiresIn: process.env.JWT_EXPIRE,
    // })
  };

  
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });


export const User = mongoose.model("User", userSchema);
