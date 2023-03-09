const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../schema/userSchema");
const sendToken = require("../utils/jwtToken");
const userSchema = require("../schema/userSchema");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");

// Register a user
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "sample url",
    },
  });

  sendToken(user, 201, res);
});

//Login user
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user gave password and email
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 404));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }
  sendToken(user, 200, res);
});

//logout User
const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Oout",
  });
});

//Forgot Password
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await userSchema.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/user/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\n If you have not requested this email then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `ecommerce password recovery`,
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message));
  }
});

//Reset Password
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userSchema.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset password invalid", 400));
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//get user details
const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await userSchema.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update user password
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await userSchema.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

//update user profile
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await userSchema.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//get all users --- admin
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await userSchema.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get single user detail --- admin
const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await userSchema.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User of id: ${req.params.id} does not Exist`, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update user role --- admin
const updateRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await userSchema.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Delete User --- Admin
const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await userSchema.findById(req.params.id);

  //we will remove cloudinary later

  if (!user) {
    return next(
      new ErrorHandler(`User of id: ${req.params.id} does not Exist`, 400)
    );
  }

  await userSchema.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getSingleUser,
  getAllUsers,
  updateRole,
  deleteUser,
};
