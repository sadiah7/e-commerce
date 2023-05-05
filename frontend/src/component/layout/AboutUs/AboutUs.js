import React, { Fragment } from "react";
import "./aboutus.css";
import { Link } from "react-router-dom";
import { MetaData } from "../MetaData";

export const AboutUs = () => {
  return (
    <Fragment>
      <MetaData title="About us" />
      {/* <div class="pimg1">
        <div class="ptext-1">
          <span class="border">Lavender Flame</span>
        </div>
      </div> */}

      {/* <section class="section section-light">
        <h2>Light Up Your World</h2>

        <p>
          Candles come in different sizes, shapes, scents, designs, colors and
          purpose. Moreover, they are used in different occasions, events and
          celebrations such as festivals, birthdays, religious activities and
          many others
        </p>
      </section> */}

      <div class="pimg2">
        <div class="ptext">
          <span class="border trans">Apollo Files</span>
        </div>
      </div>

      <section class="section section-dark">
        <h2>Our Vision</h2>

        <p>
          Apollo Files's vision is to be the provide best quality of production
          to his Clients, Corporate and other industries person through
          continuous improvement, openness and transparency. With over 45 years
          of Files making experience, Apollo Files Ahmedabad is one of the most
          prominent file manufacturer in the India It caters to the new
          corporate, industry through its manufacturing presence in Ahmedabad.
          Apollo Brands is a trusted name in the area of providing a vast series
          of BOX Files. Executive Files, Office Files for difference
          documentations, LIC files, Portfolio, Customic, Pasting Files and
          Register.
        </p>
      </section>

      <div class="pimg3">
        <div class="ptext">
          <span class="border trans">Premium Quality</span>
        </div>
      </div>

      <section class="section section-dark">
        <h2>Why Us?</h2>

        <p>
          Owing to many positive attributes of our products, our organization
          has managed to established a dignified and very prestigious position
          in the domain. We also give much importance to Customers satisfaction
          as we equalize our success with that and for that matter, our product
          range is extensively demanded by us. Furthermore, organization owns a
          sound infrastructure, conduct quality checking process of the
          manufactured goods, offers options for easy payment modes, customized
          service, timely delivery of the ordered consignments and most
          importantly, offer our product range at the most competitive prices.
        </p>
      </section>

      <div class="pimg4">
        <div class="ptext">
          <span class="border">
            <Link to="/">Shop Now at Apollo</Link>
          </span>
        </div>
      </div>
    </Fragment>
  );
};
