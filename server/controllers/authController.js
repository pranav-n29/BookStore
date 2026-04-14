const bigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");
const userModel = require("../models/userModel");

exports.registerUser = bigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new customError("Name, email and password are required", 400));
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(new customError("User already exists with this email", 409));
  }

  const user = await userModel.create({ name, email, password });
  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

exports.loginUser = bigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new customError("Email and password are required", 400));
  }

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new customError("Invalid email or password", 401));
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(new customError("Invalid email or password", 401));
  }

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

exports.getLoggedInUser = bigPromise(async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});
