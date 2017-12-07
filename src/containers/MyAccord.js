import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Sidebar, Segment, Button, Image, Header, Accordion, Icon, List, Menu } from 'semantic-ui-react'
// import "./index.css";
import '../App.css'
import Routes from '../Routes'
class MyAccord extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: true,
      activeIndex: 0,
      sidebar: 'production'
    }

    this.divStyle = {
      width: '100%'
    }


    // This binding is necessary to make `this` work in the callback
    this.toggleVisibility = this.toggleVisibility.bind(this)


    // This binding is necessary to make `this` work in the callback
    this.handleListItemClick = this.handleListItemClick.bind(this)


    this.engReports = (
      <List inverted  divided relaxed>
        <List.Item onClick={this.handleListItemClick}>
          <List.Icon name='github' size='large' />
          <List.Content>
            <List.Header>Tool Cost Summary</List.Header>
            <List.Description as='a'>Ordered by Plant</List.Description>
          </List.Content>
        </List.Item>
      </List>
    )
  }

 toggleVisibility = () => {
   this.setState({ visible: !this.state.visible })
//   this.props.childProps.toggleVisibility()
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
    // const visible = true;
    let divStyle = {
      width: '100%',
      height: '100%',
      minHeight: '100%',
//      width: '100%'
    }
    return (
      <div style={divStyle} className='mycontainer'>
       <Menu secondary attached="top">
        <Menu.Item onClick={() => this.setState({ visible: !this.state.visible })} >
          <Icon name="sidebar" />Menu
        </Menu.Item>          
        <Menu.Item onClick={() => {
          this.setState({ sidebar: 'production' });
          this.setState({ visible: true });
        }}>
          <Icon name="home"/>Production
        </Menu.Item>
        <Menu.Item onClick={() => this.setState({ sidebar: 'purchasing' })}>
          <Icon name="smile"/>Purchasing
        </Menu.Item>

      </Menu>
      {this.state.sidebar==='production' ?
        <Sidebar.Pushable as={Segment} attached='bottom'>
          <Sidebar as={Menu} animation='push' width='thin'  visible={this.state.visible} icon='labeled' vertical inverted>
            <Menu.Item onClick={() => {
                this.props.history.push("/tcsbyplant");
                this.setState({ visible: false });

              }}>
              <Icon name="home"/>ToolCost
            </Menu.Item>
            <Menu.Item onClick={this.handleClick}>
              <Icon name="block layout"/>Excel
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={this.state.visible} style={divStyle} >
            <Segment style={divStyle} basic className='container fill mycontainer'>
            <Routes childProps={this.props.childProps} />
            <div id='detail' style={divStyle}  className='container fill mycontainer' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        :
        <Sidebar.Pushable as={Segment} attached='bottom'>
          <Sidebar as={Menu} animation='push' width='thin'  visible={this.state.visible} icon='labeled' vertical inverted>
            <Menu.Item onClick={this.handleClick}>
              <Icon name="home"/>ToolCost
            </Menu.Item>
            <Menu.Item onClick={this.handleClick}>
              <Icon name="block layout"/>Excel
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={this.state.visible} style={divStyle} >
            <Segment style={divStyle} basic className='container fill mycontainer'>
            <Routes childProps={this.props.childProps} />
            <div id='detail' style={divStyle}  className='container fill mycontainer' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      }
      </div>

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
