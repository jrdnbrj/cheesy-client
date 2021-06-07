import { BrowserRouter, Switch, Route } from "react-router-dom"

import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Family from "./pages/Family"
import Products from "./pages/Products"
import Contact from "./pages/Contact"

import Mozzarella from "./pages/Mozzarella"
import Cheddar from "./pages/Cheddar"
import PepperJack from "./pages/PepperJack"
import MixThemUp from "./pages/MIxThemUp"
import BittesFruit from "./pages/BittesFruit"

import Checkout from "./pages/Checkout"
// import ProtectedRoute from "./components/ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/cheesy-client" component={Home} />
          <Route exact path="/" component={Home} />
          <Route exact path="/family" component={Family} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/contact" component={Contact} />
          
          <Route exact path="/mozzarella" component={Mozzarella} />
          <Route exact path="/cheddar" component={Cheddar} />
          <Route exact path="/pepper-jack" component={PepperJack} />
          <Route exact path="/mix" component={MixThemUp} />
          <Route exact path="/fruit" component={BittesFruit} />

          <Route exact path="/checkout" component={Checkout} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
