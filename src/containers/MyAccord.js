import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Sidebar, Segment, Button, Image, Header,Accordion, Icon, List, Menu } from 'semantic-ui-react'
// import "./index.css";
import "../App.css"

class MyAccord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      activeIndex:0

    }
        // This binding is necessary to make `this` work in the callback
    this.toggleVisibility = this.toggleVisibility.bind(this);


    // This binding is necessary to make `this` work in the callback
    this.handleListItemClick = this.handleListItemClick.bind(this)



    this.engReports = (
      <List divided relaxed>
        <List.Item onClick={this.handleListItemClick}>
          <List.Icon name='github' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header>Tool Cost Summary</List.Header>
            <List.Description as='a'>Ordered by Plant</List.Description>
          </List.Content>
        </List.Item>
        <List.Item onClick={this.handleListItemClick}>
          <List.Icon name='github' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header>Tool Cost Summary</List.Header>
            <List.Description as='a'>Ordered by Plant</List.Description>
          </List.Content>
        </List.Item>
      </List>
    )
  }

 toggleVisibility = () => {
//    this.setState({ visible: !this.state.visible })
    this.props.childProps.toggleVisibility();
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

/*
        <Button style={divStyle}  onClick={this.toggleVisibility}>Toggle Visibility</Button>

*/
  render() {
    const { activeIndex } = this.state
    const { visible } = this.props.childProps
//const visible = true;
var divStyle = {
  width: '100%'
};    
    return (
      <div style={divStyle} className='myAccord'>
        <Sidebar.Pushable as={Segment} style={divStyle} className='myAccord' >
          <Sidebar style={divStyle} as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>

      this.props.childProps.isAuthenticated ?
        <Accordion style={divStyle} className='myAccord' as={Menu} vertical  >
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 0}
              content='Engineering'
              index={0}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 0} content={this.engReports} />
          </Menu.Item>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 1}
              content='Production'
              index={1}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 1} content={this.engReports} />
          </Menu.Item>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 2}
              content='Purchasing'
              index={2}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 2} content={this.engReports} />
          </Menu.Item>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 3}
              content='Purchasing'
              index={3}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 3} content={this.engReports} />
          </Menu.Item>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 4}
              content='Quality'
              index={4}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 4} content={this.engReports} />
          </Menu.Item>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 5}
              content='Sales'
              index={5}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 5} content={this.engReports} />
          </Menu.Item>
        </Accordion>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='/assets/images/wireframe/paragraph.png' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
        : ''

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
