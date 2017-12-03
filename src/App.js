import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav,NavItem,Navbar,Row,Col,Accordion,Panel,ListGroup,ListGroupItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import { authUser, signOutUser } from "./libs/awsLib";
import SplitPane from 'react-split-pane';
//import "./index.css";









class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }
  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }


  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      !this.state.isAuthenticating &&      
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
            {this.state.isAuthenticated
              ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
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

        {this.state.isAuthenticated
        ? [
        <Row key="11">
           <Col xs={3} > 
            <Accordion>
              <Panel header="Engineering" eventKey="1">
                <ListGroup>
                  <ListGroupItem onClick={() => {this.props.history.push("/tcsbyplant");}}>Tool Cost Summary by Plant</ListGroupItem>
                  <ListGroupItem>Item 2</ListGroupItem>
                  <ListGroupItem>...</ListGroupItem>
                </ListGroup>
              </Panel>
              <Panel header="Production" eventKey="2">
                <ListGroup>
                  <ListGroupItem onClick={() => {this.props.history.push("/tcsbyplant");}}>Tool Cost Summary by Plant</ListGroupItem>
                  <ListGroupItem>Item 2</ListGroupItem>
                  <ListGroupItem>...</ListGroupItem>
                </ListGroup>
              </Panel>
              <Panel header="Purchasing" eventKey="3">
                <ListGroup>
                  <ListGroupItem onClick={() => {this.props.history.push("/tcsbyplant");}}>Tool Cost Summary by Plant</ListGroupItem>
                  <ListGroupItem>Item 2</ListGroupItem>
                  <ListGroupItem>...</ListGroupItem>
                </ListGroup>
              </Panel>
              <Panel header="Quality" eventKey="4">
                <ListGroup>
                  <ListGroupItem onClick={() => {this.props.history.push("/tcsbyplant");}}>Tool Cost Summary by Plant</ListGroupItem>
                  <ListGroupItem>Item 2</ListGroupItem>
                  <ListGroupItem>...</ListGroupItem>
                </ListGroup>
              </Panel>
              <Panel header="Sales" eventKey="5">
                <ListGroup>
                  <ListGroupItem onClick={() => {this.props.history.push("/tcsbyplant");}}>Tool Cost Summary by Plant</ListGroupItem>
                  <ListGroupItem>Item 2</ListGroupItem>
                  <ListGroupItem>...</ListGroupItem>
                </ListGroup>
              </Panel>
            </Accordion>
           </Col> 
            <Col xs={9} style={{}}> 
              <Routes childProps={childProps} />
            </Col>
          </Row>
         ] : <Routes childProps={childProps} />}

      </div>
    );
  }
}

export default withRouter(App);

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
            {this.state.isAuthenticated
              ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
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
        {this.state.isAuthenticated
        ? [
        <Row key="11">
           <Col xs={3} > 
            <Accordion>
              <Panel header="Engineering" eventKey="1">
                <ListGroup>
                  <ListGroupItem onClick={() => {this.props.history.push("/tcsbyplant");}}>Tool Cost Summary by Plant</ListGroupItem>
                  <ListGroupItem>Item 2</ListGroupItem>
                  <ListGroupItem>...</ListGroupItem>
                </ListGroup>
              </Panel>
              <Panel header="Production" eventKey="2">
                <ListGroup>
                  <ListGroupItem onClick={() => {this.props.history.push("/tcsbyplant");}}>Tool Cost Summary by Plant</ListGroupItem>
                  <ListGroupItem>Item 2</ListGroupItem>
                  <ListGroupItem>...</ListGroupItem>
                </ListGroup>
              </Panel>
              <Panel header="Purchasing" eventKey="3">
                <ListGroup>
                  <ListGroupItem onClick={() => {this.props.history.push("/tcsbyplant");}}>Tool Cost Summary by Plant</ListGroupItem>
                  <ListGroupItem>Item 2</ListGroupItem>
                  <ListGroupItem>...</ListGroupItem>
                </ListGroup>
              </Panel>
              <Panel header="Quality" eventKey="4">
                <ListGroup>
                  <ListGroupItem onClick={() => {this.props.history.push("/tcsbyplant");}}>Tool Cost Summary by Plant</ListGroupItem>
                  <ListGroupItem>Item 2</ListGroupItem>
                  <ListGroupItem>...</ListGroupItem>
                </ListGroup>
              </Panel>
              <Panel header="Sales" eventKey="5">
                <ListGroup>
                  <ListGroupItem onClick={() => {this.props.history.push("/tcsbyplant");}}>Tool Cost Summary by Plant</ListGroupItem>
                  <ListGroupItem>Item 2</ListGroupItem>
                  <ListGroupItem>...</ListGroupItem>
                </ListGroup>
              </Panel>
            </Accordion>
           </Col> 
            <Col xs={9} style={{}}> 
              <Routes childProps={childProps} />
            </Col>
          </Row>
         ] : <Routes childProps={childProps} />}

      </div>
    );
  }
}

export default withRouter(App);



*/
