import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
// import ProtectedRoute from "./components/ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
