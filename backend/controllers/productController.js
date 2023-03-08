const productSchema = require("../schema/productSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create Product - Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await productSchema.create(req.body);

  res.status(201).json({
    success: true,
    product: product,
  });
});

//Get all products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 5;
  const productCount = await productSchema.countDocuments();
  const apiFeature = new ApiFeatures(productSchema.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    product: products,
    productCount,
  });
});

//Update Product - Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await productSchema.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await productSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await productSchema.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  await productSchema.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});

//Get a single product
const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await productSchema.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
