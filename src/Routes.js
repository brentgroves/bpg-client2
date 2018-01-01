import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Confirm from './containers/Confirm'
import NotFound from './containers/NotFound'
import ToolCostSummaryByPlant from './containers/ToolCostSummaryByPlant'
import Wait from './containers/Wait'
import AppliedRoute from './components/AppliedRoute'
import ScriptCheck from './containers/ScriptCheck'

export default ({ childProps }) =>
  (<Switch>
    <AppliedRoute path='/' exact
      component={ childProps.isAuthenticated ? Login : Login }
      props={childProps} />
    <AppliedRoute path='/wait' exact component={Wait} props={childProps} />
    <AppliedRoute path='/scriptCheck' exact component={ScriptCheck} props={childProps} />

    <AppliedRoute path='/home' exact component={Home} props={childProps} />
    <AppliedRoute path='/login' exact component={Login} props={childProps} />
    <AppliedRoute path='/signup' exact component={Signup} props={childProps} />
    <AppliedRoute path='/confirm' exact component={Confirm} props={childProps} />
    <AppliedRoute path='/tcsbyplant' exact component={ToolCostSummaryByPlant} props={childProps} />
    <Route component={NotFound} />
  </Switch>)


