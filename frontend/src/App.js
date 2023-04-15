// import logo from "./logo.svg";
import "./App.css";
import { Header } from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import axios from "axios";
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
import { Shipping } from "./component/Cart/Shipping.js";
import { ConfirmOrder } from "./component/Cart/ConfirmOrder.js";
import { Payment } from "./component/Cart/Payment.js";
import { OrderSuccess } from "./component/Cart/OrderSuccess.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MyOrders } from "./component/Order/MyOrders";
import { OrderDetails } from "./component/Order/OrderDetails";
import { Dashboard } from "./component/Admin/Dashboard";
import { ProductList } from "./component/Admin/ProductList";
import { NewProduct } from "./component/Admin/NewProduct";
import { UpdateProduct } from "./component/Admin/UpdateProduct";
import { OrderList } from "./component/Admin/OrderList";
import { ProcessOrder } from "./component/Admin/ProcessOrder";
import { UsersList } from "./component/Admin/UsersList";
import { UpdateUser } from "./component/Admin/UpdateUser";
import { ProductReviews } from "./component/Admin/ProductReviews.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = React.useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/pay/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Droid Serif", "Open Sans"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  console.log(stripeApiKey);
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
        <ProtectedRoute exact path="/shipping" component={Shipping} />

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <Switch>
          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        </Switch>

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={ProductList}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={NewProduct}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={OrderList}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={UsersList}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={ProductReviews}
        />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
