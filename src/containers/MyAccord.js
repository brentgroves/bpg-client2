import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Grid,Nav,NavItem,Navbar,Row,Col,Accordion,Panel,ListGroup,ListGroupItem } from "react-bootstrap";
//import "./index.css";


class MyAccord extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <div className="App container">
        {this.props.childProps.isAuthenticated
        ? 
        <Row>
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
         </Row>
         : 
        <Row key="11">
          <Col xs={3} > 
            <Accordion>
              <Panel header="Engineering" eventKey="1">
                Login first
              </Panel>
              <Panel header="Production" eventKey="2">
                Login first
              </Panel>
              <Panel header="Purchasing" eventKey="3">
                Login first
              </Panel>
              <Panel header="Quality" eventKey="4">
                Login first
              </Panel>
              <Panel header="Sales" eventKey="5">
                Login first
              </Panel>
            </Accordion>
         </Col> 
         </Row>
       }
       </div>

    );
  }
}

export default withRouter(MyAccord);

/*



*/
