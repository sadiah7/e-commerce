const Errorhandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //mongodb error
  if (err.name == "CastError") {
    const message = "source not found";
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
