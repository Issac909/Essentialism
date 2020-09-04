import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...restProps }) => {
    return (
        <Route 
            {...restProps}
            render = {props => {
                if(localStorage.getItem('token')) {
                    return <Component {...props} />
                } else {
                    return <Redirect to = '/' />
                }
            }}
        />
    )
}

export default PrivateRoute;