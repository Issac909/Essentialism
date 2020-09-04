import React from "react";
import { useDispatch } from "react-redux";

import Navigation from "./Navigation";
import Value from "./Values";

import { logout } from "../store/actions/loginActions";


const ValueList = () => {
  const dispatch = useDispatch();


  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div>
      <Navigation logout={handleLogout} />
      <Value />
    </div>
  );
};

export default ValueList;
