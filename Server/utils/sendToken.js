// Creating token and saving cookie
const sendToken = async (user, statusCode, res, message) => {
  console.log(user,"jdfhjhgh");
  // token 
  const token =  user.getAuthToken();
  console.log(token,"dfhdhfh")

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
  };

  const userData={
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bloodgroup: user.bloodgroup,
    avatar: user.avatar,
    verified: user.verified,
     };
     console.log(userData,"User ko dataa");
     // Saving in a cookie
      return res.status(statusCode).cookie("token", token, options)
       .json({success: true,
    token,
    message,
    user: userData,
  });
};


  export default sendToken;