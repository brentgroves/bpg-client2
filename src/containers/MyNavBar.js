import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav,NavItem,Navbar,Row,Col,Accordion,Panel,ListGroup,ListGroupItem } from "react-bootstrap";
import "../App.css";
import Routes from "../Routes";
import RouteNavItem from "../components/RouteNavItem";
import { authUser, signOutUser } from "../libs/awsLib";
//import "./index.css";

class MyNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <div className="App container">
        <Navbar inverse fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Busche Reporter</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            {this.props.childProps.isAuthenticated
              ? <NavItem onClick={this.props.childProps.handleLogout}>Logout</NavItem>
              : [
                  <RouteNavItem key={1} href="/signup">
                    Signup
                  </RouteNavItem>,
                  <RouteNavItem key={2} href="/login">
                    Login
                  </RouteNavItem>
                ]}
            </Nav>
          </Navbar.Collapse>

        </Navbar>

      </div>
    );
  }
}

export default withRouter(MyNavBar);


