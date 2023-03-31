const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/user.model");
const sendToken = require("../utils/jwtToken");

//{==================================================== Register User==================================}
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, gender, number } = req.body;
  if (!name) {
    return res.send({ error: "Name is Required" });
  }
  if (!email) {
    return res.send({ message: "Email is Required" });
  }
  if (!password) {
    return res.send({ message: "Password is Required" });
  }
  if (!gender) {
    return res.send({ message: "gender no is Required" });
  }
  if (!number) {
    return res.send({ message: "mobile no. is Required" });
  }

  //check user
  const exisitingUser = await User.findOne({ email });
  //exisiting user
  if (exisitingUser) {
    return res.status(200).send({
      success: false,
      message: "Already Register please login",
    });
  }
  const user = await User.create({
    name,
    email,
    password,
    gender,
    number,
  });

  sendToken(user, 201, res);
});

//{==================================================== Login User==================================}
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});
// {==========================LOGOUT-USR===============================}
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// {===========================Get all users(admin)==============================}
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// {==========================Delete User --Admin=========================}
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

//{===================== Get single user (admin)=====================}
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});
