// import logo from "./logo.svg";
import "./App.css";
import { Header } from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import { Footer } from "./component/layout/Footer/Footer";
import { Home } from "./component/Home/Home";
import { ProductDetails } from "./component/Product/ProductDetails";
import { Products } from "./component/Product/Products.js";
import { Search } from "./component/Product/Search.js";
import { LoginSignUp } from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Droid Serif", "Open Sans"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/login" component={LoginSignUp} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
