import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    return inProgress === "none" ? <Route {...rest} render={(props) => {
        if (isAuthenticated) 
            return <Component {...rest} {...props} />;
        else 
            return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    }}/> : <p>Cargando...</p>
}

export default ProtectedRoute;
