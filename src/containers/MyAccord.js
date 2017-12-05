import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Accordion, Icon, List, Menu } from 'semantic-ui-react'
// import "./index.css";


class MyAccord extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }

    // This binding is necessary to make `this` work in the callback
    this.handleListItemClick = this.handleListItemClick.bind(this)
    this.engReports = (
      <List celled>
        <List.Item onClick={this.handleListItemClick}>Tool Cost Summary by Plant</List.Item>
        <List.Item>...</List.Item>
        <List.Item>
      Benefits

          <List.List>
            <List.Item href='#'>Link to somewhere</List.Item>
            <List.Item>Rebates</List.Item>
            <List.Item>Discounts</List.Item>
          </List.List>
        </List.Item>
        <List.Item>Warranty</List.Item>
      </List>
    )
  }


  handleListItemClick = (e) => {
    this.props.childProps.setRptStep(1)
    this.props.history.push('/tcsbyplant')
  }


  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    return (
      this.props.childProps.isAuthenticated ?
        <Accordion as={Menu} vertical>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 0}
              content='Size'
              index={0}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 0} content={this.engReports} />
          </Menu.Item>

          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 1}
              content='Colors'
              index={1}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 1} content={this.engReports} />
          </Menu.Item>
        </Accordion>

        :
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
          What is a dog?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
              {' '}welcome guest in many households across the world.
            </p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name='dropdown' />
          What kinds of dogs are there?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>
            There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of
              {' '}dog that they find to be compatible with their own lifestyle and desires from a companion.
            </p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
            <Icon name='dropdown' />
          How do you acquire a dog?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>
            Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.
            </p>
            <p>
            A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to
              {' '}assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your
              {' '}dog from a shelter, helps give a good home to a dog who may not find one so readily.
            </p>
          </Accordion.Content>
        </Accordion>

    )
  }
}

export default withRouter(MyAccord)

/*


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

*/
