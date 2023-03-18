import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import { MetaData } from "../layout/MetaData";
import "./home.css";
import { ProductCard } from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
// const prod = {
//   name: "Blue Tshirt",
//   images: [
//     {
//       url: "https://www.mydesignation.com/wp-content/uploads/2020/01/petrol-blue-plain-tshirt-mydesignation-unisex-image.jpg",
//     },
//   ],
//   price: "3000",
//   _id: "sadiah",
// };

export const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  // console.log(productCount, loading, product);

  useEffect(() => {
    if (error) {
      alert.error(error);
      return dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Home Page" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((produ) => <ProductCard product={produ} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
