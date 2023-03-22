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
import { Profile } from "./component/User/Profile.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { UserOptions } from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./component/Route/ProtectedRoute";
import { UpdateProfile } from "./component/User/UpdateProfile.js";
import { UpdatePassword } from "./component/User/UpdatePassword.js";
import { ForgotPassword } from "./component/User/ForgotPassword.js";
import { ResetPassword } from "./component/User/ResetPassword.js";
import { Cart } from "./component/Cart/Cart.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
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
        {isAuthenticated && <UserOptions user={user} />}
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/cart" component={Cart} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
