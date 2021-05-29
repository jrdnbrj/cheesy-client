import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Family from "./pages/Family";
import Products from "./pages/Products";
import Mozzarella from "./pages/Mozzarella";
import BittesFruit from "./pages/BittesFruit";
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
          <Route exact path="/mozzarella" component={Mozzarella} />
          <Route exact path="/fruit" component={BittesFruit} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
