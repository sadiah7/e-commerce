import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";
import axios from "axios";

//add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/product/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//remove item from cart
export const removeItemsFromCart =
  (id, quantity) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
