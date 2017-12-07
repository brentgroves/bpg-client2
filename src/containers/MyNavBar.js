import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Sidebar, Segment, Button, Image, Icon, Header } from 'semantic-ui-react'
// import { Nav,NavItem,Navbar,Row,Col,Accordion,Panel,ListGroup,ListGroupItem } from "react-bootstrap";
import '../App.css'
import Routes from '../Routes'
import RouteNavItem from '../components/RouteNavItem'
import { authUser, signOutUser } from '../libs/awsLib'
// import "./index.css";

class MyNavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeItem: 0
    }
    // This binding is necessary to make `this` work in the callback
    this.handleItemClick = this.handleItemClick.bind(this)
  }


  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push('/login')
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu class='mycontainer' inverted>
        <Menu.Item header>Busche Reporter</Menu.Item>
        <Menu.Item name='visible'
          active={activeItem === 'visible'}
          onClick={this.props.childProps.toggleVisibility} >
            Toggle
        </Menu.Item>
        <Menu.Menu position='right'>
            {this.props.childProps.isAuthenticated
              ?
            <Menu.Item name='logout'
              active={activeItem === 'logout'}
              onClick={this.props.childProps.handleLogout} >
                Logout
            </Menu.Item>
            :
            [
              <Menu.Item name='signup'
                active={activeItem === 'signup'}
                onClick={(e, { name }) => {
                  this.props.childProps.rmReport()
                  this.setState({ activeItem: name })
                  this.props.history.push('/signup')
                }} >
                Signup
              </Menu.Item>,
              <Menu.Item name='login'
                active={activeItem === 'login'}
                onClick={(e, { name }) => {
                  this.props.childProps.rmReport()
                  this.setState({ activeItem: name })
                  this.props.history.push('/login')
                }} >
                  Login
              </Menu.Item>
            ]
          }
        </Menu.Menu>
      </Menu>

    )
  }
}

export default withRouter(MyNavBar)


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
