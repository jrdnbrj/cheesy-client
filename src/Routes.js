import { BrowserRouter, Switch, Route } from "react-router-dom"

import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Family from "./pages/Family"
import Products from "./pages/Products"
import Contact from "./pages/Contact"

import Product from "./pages/Product"
import BittesFruit from "./pages/BittesFruit"

import Checkout from "./pages/Checkout"
import Admin from "./pages/Admin"

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/family" component={Family} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/contact" component={Contact} />
          
          <Route exact path="/mozzarella" component={Product} />
          <Route exact path="/cheddar" component={Product} />
          <Route exact path="/pepperjack" component={Product} />
          <Route exact path="/mix" component={Product} />
          <Route exact path="/fruits" component={BittesFruit} />

          <Route exact path="/checkout" component={Checkout} />

          <Route exact path="/admin" component={Admin} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
