import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import MyReport from "./containers/MyReport";
import ToolCostSummaryByPlant from "./containers/ToolCostSummaryByPlant";
import AppliedRoute from "./components/AppliedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact 
    component={ childProps.isAuthenticated ? Home : Home } 
    props={childProps} />
    <AppliedRoute path="/home" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
	<AppliedRoute path="/signup" exact component={Signup} props={childProps} />
	<AppliedRoute path="/tcsbyplant" exact component={ToolCostSummaryByPlant} props={childProps} />
    <AppliedRoute path="/myreport" exact component={MyReport} props={childProps} />


	{ /* Finally, catch all unmatched routes */ }
	<Route component={NotFound} />
  </Switch>;


/*
    <AppliedRoute path="/" exact 
    component={ childProps.isAuthenticated ? ToolCostSummaryByPlant : Home } 
    props={childProps} />
    <AppliedRoute path="/home" exact component={Home} props={childProps} />
*/