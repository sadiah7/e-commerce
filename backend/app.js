const express = require("express");
const errorMiddleware = require("./middleware/error");
const productRoutes = require("./routes/productRoutes");

app = express();
app.use(express.json());

app.use("/product", productRoutes);

//MiddleWare for error
app.use(errorMiddleware);

module.exports = app;
