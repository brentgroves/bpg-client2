import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import Routes from './Routes'
import { authUser, signOutUser } from './libs/awsLib'
import './App.css'
import MyAccord from './containers/MyAccord'
// import { Grid} from "react-bootstrap";
import { Message, Dropdown, Sidebar, Segment, Button, Image, Header, Accordion, Icon, List, Menu } from 'semantic-ui-react'

// import '../sass/main.scss';
// https://www.npmjs.com/package/react-split-pane


// var ReactGridLayout = require('react-grid-layout');


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      activeItem: 0,
      rptStep: 1,
      sidebarvisible: false,
      sidebar: 'production'
    }


    // This binding is necessary to make `this` work in the callback
    this.handleLogout = this.handleLogout.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.setSidebarVisible = this.setSidebarVisible.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.setRptStep = this.setRptStep.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.getRptStep = this.getRptStep.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.rmReport = this.rmReport.bind(this)
    // window.onresize = this.handleResize;
  }
  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true)
      }
    } catch (e) {
      alert(e)
    }

    this.setState({ isAuthenticating: false })
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  rmReport = () => {
    let detail = document.getElementById('detail')
    detail.innerHTML = ''
  }

  setRptStep = rptStep => {
  	if (rptStep === 1) {
	    let detail = document.getElementById('detail')
	    detail.innerHTML = ''
  	}
    this.setState({ rptStep: rptStep })
  }
  getRptStep = () => {
    return this.state.rptStep
  }

  setSidebarVisible = visible => {
    this.setState({ sidebarVisible: visible })
  }

  getRptStep = () => {
    return this.state.rptStep
  }


  handleLogout = (event) => {
    this.rmReport()
    signOutUser()
    this.userHasAuthenticated(false)
    this.setState({ sidebarVisible: false })
    this.props.history.push('/login')
  }


  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout,
      setRptStep: this.setRptStep,
      getRptStep: this.getRptStep,
      rmReport: this.rmReport,
      sidebarVisible: this.sidebarVisible,
      setSidebarVisible: this.setSidebarVisible

    }

    const { activeItem, sidebarVisible } = this.state
    // const visible = true;
    let divStyle = {
      width: '100%',
      height: '100%',
      minHeight: '100%'
      //      width: '100%'
    }



    return (
      <div style={divStyle} className='mycontainer'>


        <Menu fluid attached='top'>
          {this.state.isAuthenticated ?
            <Dropdown item name='sidebar' icon='sidebar'
            closeOnChange={true}
            simple
              onClick={(e, v) => {
                this.setState({ sidebarVisible: !this.state.sidebarVisible })
              }} >
              <Dropdown.Menu>

                <Dropdown.Item
                  onFocus={(e, dropdown)=>{
                  }}
                  onClick={(e, dropdown) => {
                    e.stopPropagation()
                    this.setState({ sidebar: 'production' })
                    this.setState({ sidebarVisible: true })
                  }}


                >
                  <span className='text'>Production</span>
                </Dropdown.Item>
                <Dropdown.Item
                  onFocus={(e, dropdown)=>{
                  }}
                  onClick={(e, dropdown) => {
                    e.stopPropagation()
                    this.setState({ sidebar: 'purchasing' })
                    this.setState({ sidebarVisible: true })
                  }}

                >
                  <span className='text'>Purchasing</span>
                </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
            : 
            [
              <Menu.Item
                name='signup'
                onClick={() => {
                  childProps.rmReport()
                  this.props.history.push('/signup')
                }} >
                <Icon name='home'/>Signup
              </Menu.Item>,
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={(e, { name }) => {
                  this.setState({ activeItem: name })
                  childProps.rmReport()
                  this.props.history.push('/login')
                }} >
                <Icon name='block layout'/>Login
              </Menu.Item>
            ]

          }
          <Menu.Item
            onClick={(e, { name })=> {
              this.props.history.push('/home')
              this.setState({ sidebarVisible: false })
            }}>
            <Icon name='heartbeat'/>
              <span className='text'>Accuracy</span>
          </Menu.Item>
          <Menu.Menu position='right'>
            {childProps.isAuthenticated
              ?
              <Menu.Item
                onClick={(e, { name })=> {
                  this.props.history.push('/tcsbyplant')
                  this.setState({ sidebarVisible: false })
                }}>
                <Icon name='block layout'/>
                  <span className='text'>Logout&nbsp;&nbsp;&nbsp;</span>
              </Menu.Item>
              : ''
            }
          </Menu.Menu>
        </Menu>

        {this.state.sidebar === 'production' ?
          <Sidebar.Pushable as={Segment} attached='bottom'>
            <Sidebar as={Menu} animation='push' width='thin' visible={this.state.sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item onClick={() => {
                this.props.history.push('/tcsbyplant')
                this.setState({ sidebarVisible: false })
                this.setRptStep(1)
              }}>
                <Icon name='block layout'/>ToolCost
              </Menu.Item>
              <Menu.Item onClick={() => {
                this.props.history.push('/tcsbyplant')
                this.setState({ sidebarVisible: false })
                this.setRptStep(1)
              }}>
                <Icon name='home'/>Excel
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={this.state.sidebarVisible} style={divStyle} >
              <Segment style={divStyle} basic className='container fill mycontainer'>
                <Routes childProps={childProps} />
                <div id='detail' style={divStyle} className='container fill mycontainer' />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          :
          <Sidebar.Pushable as={Segment} attached='bottom'>
            <Sidebar as={Menu} animation='push' width='thin' visible={this.state.sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item onClick={() => {
                this.props.history.push('/tcsbyplant')
                this.setState({ sidebarVisible: false })
                this.setRptStep(1)
              }}>
                <Icon name='home'/>ToolCost
              </Menu.Item>
              <Menu.Item onClick={() => {
                this.props.history.push('/tcsbyplant')
                this.setState({ sidebarVisible: false })
                this.setRptStep(1)
              }}>
                <Icon name='block layout'/>Excel
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={this.state.sidebarVisible} style={divStyle} >
              <Segment style={divStyle} basic className='container fill mycontainer'>
                <Routes childProps={childProps} />
                <div id='detail' style={divStyle} className='container fill mycontainer' />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        }
      </div>
    )
  }
}

export default withRouter(App)

/*
      <Menu fluid borderless inverted  secondary attached='bottom' widths={3}>
        <Menu.Item name='buy' color='teal' active={activeItem === 'buy'} onClick={this.handleItemClick} />
        <Menu.Item name='sell' color='teal' active={activeItem === 'sell'} onClick={this.handleItemClick} />
        <Menu.Item name='rent' color='teal' active={activeItem === 'rent'} onClick={this.handleItemClick} />
      </Menu>
*/

/*

        {this.state.sidebar === 'production' ?
          <Sidebar.Pushable as={Segment} attached='bottom'>
            <Sidebar as={Menu} animation='push' width='thin' visible={this.state.sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item onClick={() => {
                this.props.history.push('/tcsbyplant')
                this.setState({ sidebarVisible: false })
                this.setRptStep(1)
              }}>
                <Icon name='block layout'/>ToolCost
              </Menu.Item>
              <Menu.Item onClick={() => {
                this.props.history.push('/tcsbyplant')
                this.setState({ sidebarVisible: false })
                this.setRptStep(1)
              }}>
                <Icon name='home'/>Excel
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={this.state.sidebarVisible} style={divStyle} >
              <Segment style={divStyle} basic className='container fill mycontainer'>
                <Routes childProps={childProps} />
                <div id='detail' style={divStyle} className='container fill mycontainer' />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          :
          <Sidebar.Pushable as={Segment} attached='bottom'>
            <Sidebar as={Menu} animation='push' width='thin' visible={this.state.sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item onClick={() => {
                this.props.history.push('/tcsbyplant')
                this.setState({ sidebarVisible: false })
                this.setRptStep(1)
              }}>
                <Icon name='home'/>ToolCost
              </Menu.Item>
              <Menu.Item onClick={() => {
                this.props.history.push('/tcsbyplant')
                this.setState({ sidebarVisible: false })
                this.setRptStep(1)
              }}>
                <Icon name='block layout'/>Excel
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={this.state.sidebarVisible} style={divStyle} >
              <Segment style={divStyle} basic className='container fill mycontainer'>
                <Routes childProps={childProps} />
                <div id='detail' style={divStyle} className='container fill mycontainer' />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        }


      <SplitPane split='horizontal' allowResize={false} defaultSize={40}>
        <div key='1'>
          <MyNavBar childProps={childProps} />
        </div>
        <SplitPane split='vertical' allowResize={true} defaultSize={200}>
          <div key='2' >
            <MyAccord childProps={childProps} />
          </div>
	        <SplitPane split='vertical' allowResize={true} defaultSize={200}>
	          <div key='4' >
	            <Routes childProps={childProps} />
	          </div>
	          <div key='3' className='container fill' >
	            <div  id='detail' />
	          </div>
	        </SplitPane>
	        </SplitPane>
	      </SplitPane>

      <SplitPane split='horizontal' allowResize={false} defaultSize={40}>
        <div key='1'>
          <MyNavBar childProps={childProps} />
        </div>
        <SplitPane onChange={ this.handleResize } split='vertical' allowResize={true} defaultSize={200}>
          <div key='2' >
            <MyAccord childProps={childProps} />
          </div>
          <div key='3' >
            <Routes childProps={childProps} />
            <div id='detail' />
          </div>
        </SplitPane>
      </SplitPane>

    <SplitPane split="horizontal" allowResize={false} defaultSize={70}>
        <div key="1">
          <MyNavBar childProps={childProps} />
        </div>
        <SplitPane split="vertical" defaultSize={300}>
            <div key="2" >
              <MyAccord childProps={childProps} />
            </div>
            <div key="3" >
              <Routes childProps={childProps} />
               <div id='detail'></div>
            </div>
        </SplitPane>
    </SplitPane>

*/

