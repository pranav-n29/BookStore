const jwt = require("jsonwebtoken");
const bigPromise = require("./bigPromise");
const customError = require("../utils/customError");
const userModel = require("../models/userModel");

exports.isLoggedIn = bigPromise(async (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return next(new customError("Authentication required", 401));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new customError("Authentication token missing", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new customError("Invalid or expired token", 401));
  }

  const user = await userModel.findById(decoded.id);
  if (!user) {
    return next(new customError("User no longer exists", 401));
  }

  req.user = user;
  return next();
});
