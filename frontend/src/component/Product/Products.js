import React, { Fragment, useEffect } from "react";
import "./products.css";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { ProductCard } from "../Home/ProductCard";
import { useParams } from "react-router-dom";

export const Products = () => {
  const dispatch = useDispatch();

  const { products, loading, error, productCount } = useSelector(
    (state) => state.products
  );

  const { keyword } = useParams();
  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
