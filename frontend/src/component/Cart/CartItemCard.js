import React from "react";
import { Link } from "react-router-dom";
import "./cartItemCard.css";

export const CartItemCard = ({ item }) => {
  console.log(item);
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price : ₹${item.price}`}</span>
        <p>Remove</p>
      </div>
    </div>
  );
};
