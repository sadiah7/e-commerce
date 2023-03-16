import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";

export const ProductDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  return (
    <Fragment>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
      </div>
    </Fragment>
  );
};
