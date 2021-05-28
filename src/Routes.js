import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Family from "./pages/Family";
import Products from "./pages/Products";
// import ProtectedRoute from "./components/ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/family" component={Family} />
          <Route exact path="/products" component={Products} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
