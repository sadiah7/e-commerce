import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { Rating } from "@material-ui/lab";

export const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan">
          ({product.numOfReviews} reviews){" "}
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};
