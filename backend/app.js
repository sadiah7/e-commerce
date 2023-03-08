const express = require("express");
const errorMiddleware = require("./middleware/error");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app = express();
app.use(express.json());

app.use("/product", productRoutes);
app.use("/user", userRoutes);

//MiddleWare for error
app.use(errorMiddleware);

module.exports = app;
