import React from "react";
import { Link } from "react-router-dom";
import "./cartItemCard.css";

export const CartItemCard = ({ item, deleteCartItems }) => {
  console.log(item);
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price : ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};
