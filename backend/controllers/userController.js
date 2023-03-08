const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../schema/userSchema");
const sendToken = require("../utils/jwtToken");
const userSchema = require("../schema/userSchema");
const sendEmail = require("../utils/sendEmail.js");

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
    return next(new ErrorHandler("Invalid Email or Password"), 401);
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or password"), 401);
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

module.exports = { registerUser, loginUser, logoutUser, forgotPassword };
