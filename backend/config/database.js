const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/mern", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((data) => {
      console.log("mongo connected");
    });
};

module.exports = connectDatabase;
