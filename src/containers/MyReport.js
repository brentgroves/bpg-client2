import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav,NavItem,Navbar,Row,Col,Accordion,Panel,ListGroup,ListGroupItem } from "react-bootstrap";
import Routes from "../Routes";
import RouteNavItem from "../components/RouteNavItem";
import { authUser, signOutUser } from "../libs/awsLib";

class IframeComponent extends Component {
  render() {
    return (
      <iframe title="test" src="http://localhost:5488" frameBorder={'0'} style={{
         width: '100%',
         height: '100%'
      }} />
    );
  }
}

export default withRouter(IframeComponent);