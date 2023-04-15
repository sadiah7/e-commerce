const productSchema = require("../schema/productSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const { validate } = require("../schema/productSchema");
const cloudinary = require("cloudinary");

//Create Product - Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;
  const product = await productSchema.create(req.body);

  res.status(201).json({
    success: true,
    product: product,
  });
});

//Get all products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  // return next(new ErrorHandler("This is temp error"), 500);
  const resultPerPage = 8;
  const productCount = await productSchema.countDocuments();
  const apiFeature = new ApiFeatures(productSchema.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;
  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();
  res.status(200).json({
    success: true,
    products: products,
    productCount,
    resultPerPage,
    filteredProductsCount,
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

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
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

  //delete images from cloudinary

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
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

//create new review or update review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productSchema.findById(productId);
  console.log(product);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let total = 0;
  product.reviews.forEach((rev) => {
    total += rev.rating;
  });

  product.ratings = total / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//get all reviews of a single product
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await productSchema.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await productSchema.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let total = 0;
  reviews.forEach((rev) => {
    total += rev.rating;
  });

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = total / reviews.length;
  }

  const numOfReviews = reviews.length;

  await productSchema.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//GET ALL PRODUCTS (ADMIN)
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await productSchema.find();

  res.status(200).json({
    success: true,
    products,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
};
