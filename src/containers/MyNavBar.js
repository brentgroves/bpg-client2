import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from 'semantic-ui-react'
//import { Nav,NavItem,Navbar,Row,Col,Accordion,Panel,ListGroup,ListGroupItem } from "react-bootstrap";
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
        // This binding is necessary to make `this` work in the callback
    this.handleItemClick = this.handleItemClick.bind(this);

  }


  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push("/login");
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name='editorials'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          Editorials
        </Menu.Item>

        <Menu.Item
          name='reviews'
          active={activeItem === 'reviews'}
          onClick={this.handleItemClick}
        >
          Reviews
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>
      </Menu>


    );
  }
}

export default withRouter(MyNavBar);


/*
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

*/