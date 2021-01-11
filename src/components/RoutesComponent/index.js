import React from 'react';
import { Route } from "react-router-dom";
import SignInComponent from "../SignInComponent";
import SignUpComponent from "../SignUpComponent";
import CVComponent from "../CVComponent";

const RoutesComponent = () => {
  return (
    <>
      <Route exact path="/sign-in" component={SignInComponent}/>
      <Route exact path="/" component={SignUpComponent}/>
      <Route exact path="/cv" component={CVComponent}/>
    </>
  );
};

export default RoutesComponent;