const Errorhandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //mongodb error
  if (err.name == "CastError") {
    const message = "source not found";
    err = new Errorhandler(message, 400);
  }

  //duplicate key
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new Errorhandler(message, 400);
  }

  //wrong JWT error
  if (err.name === "JSONWebTokenError") {
    const message = "Json Web token is invalid, Try again";
    err = new Errorhandler(message, 400);
  }

  //token expired
  if (err.name === "TokenExpiredError") {
    const message = "Json Web token has expired, Try again";
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
