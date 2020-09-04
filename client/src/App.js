import React, { /*useState,*/ useEffect } from "react";
import { useDispatch /*, useSelector*/ } from "react-redux";
import { Router, Route } from "react-router-dom";
import history from "./history";

import PrivateRoute from "./components/PrivateRoute";
import UserValues from './components/UserValues';
import ValueList from './components/ValueList'
import Login from "./components/Login";
import Registration from "./components/Registration";
import "./App.css";

import UserProfile from './components/UserProfile';

import { getValues } from "./store/actions/valuesActions";

import styled from 'styled-components';
import bg from './images/bg-main.jpg';

// ********************* STYLED COMPONENTS *****************************************
let Background = styled.section`
background-image: url(${bg});
background-position: center;
background-size: cover;
/* margin: 10%; */
background-repeat: no-repeat;
display: flex; 
flex-direction: column;
/* align-items: center; */
justify-content: center;
width: 100%;
height: 100vh;

`;

// ********************* STYLED COMPONENTS END *************************************

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getValues())
  }, [dispatch]);

  return (
    <Background className='app-body'>
      <Router history={history}>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Registration} />
        <PrivateRoute exact path="/select-values" component={ValueList} />
        <PrivateRoute exact path="/user-values" component={UserValues} />
        <PrivateRoute exact path = '/user/:id/profile' component = {UserProfile} />
      </Router>
    </Background>
  );
}

export default App;
