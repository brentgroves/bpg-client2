import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import Routes from './Routes'
import { authUser, signOutUser } from './libs/awsLib'
// import './App.css'
import MyAccord from './containers/MyAccord'
// import { Grid} from "react-bootstrap";
import { Message, Dropdown, Sidebar, Segment, Button, Image, Header, Accordion, Icon, List, Menu } from 'semantic-ui-react'
let jsreport = require('jsreport-browser-client-dist')
jsreport.serverUrl = 'http://localhost:5488'
// import '../sass/main.scss';
// https://www.npmjs.com/package/react-split-pane


// var ReactGridLayout = require('react-grid-layout');


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      rptStep: 1,
      sidebarvisible: false,
      activeItem: 'sidebar',
      sbActiveItem: 'tcsbyplant',
      ddActiveItem: 'production',
      dtStart: '12-6-2017 23:15:10',
      js: jsreport
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

/*
      let email = document.getElementById("email");
      let password = document.getElementById("password");
      this.setState({
        email
      });

      if (await authUser()) {
        this.userHasAuthenticated(true)
        let self = this
        // This binding is necessary to make `this` work in the callback
        jsreport.headers.Authorization = 'Basic ' + btoa('admin:password')

        let request = {
          template: {
            name: 'Json'
          },
          data: {
            dtStart: '11-01-2017 10:15:10'
          }
        }

        // render through AJAX request and return promise with array buffer response
        jsreport.renderAsync(request).then(function (res) {
          // This binding is necessary to make `this` work in the callback
          let self2 = self
          console.log(res)
          let json = res.toString()
          let t = json.replace(/&quot;/g, '"')
          let obj = JSON.parse(t)

          let request2 = {
            template: {
              name: 'HtmlToBrowserClient'
            },
            data: {
              rptName: 'DashBoard'
            }
          }

          jsreport.render('detail', request2)
        })
      }else{
        this.props.history.push('/login')
      }
      */
    } catch (e) {
      alert(e)
    }
 //   this.setState({ isAuthenticating: false })
  }


  // jsreport = require('jsreport-browser-client-dist')
  // jsreport.serverUrl = 'http://localhost:5488'

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
      setSidebarVisible: this.setSidebarVisible

    }

    const { activeItem, sbActiveItem, ddActiveItem, rptStep } = this.state

    let divStyle = {
      width: '100%',
      height: '100%',
      padding: '0px !important',
      margin: '0px !important'

      // margin:'0px 0px 0x 0px'
      // margin:'10px 5px 15px 20px'

      //      width: '100%'
    }

    return (
      <div style={divStyle} className='mycontainer'>


        <Menu fluid inverted attached='top'>
          {this.state.isAuthenticated ?
            [
              <Menu.Item
                name='toggleSidebar'
                active={activeItem === 'toggleSidebar'}
                onClick={(e, { name })=> {
                  this.setState({ sidebarVisible: !this.state.sidebarVisible })
                }}>
                <Icon name='sidebar'/>
              </Menu.Item>,
              <Dropdown
                icon='folder' item >
                <Dropdown.Menu>
                  <Dropdown.Item
                    name='production'
                    active={ddActiveItem === 'production'}
                    onClick={(e, { name }) => {
                      //  e.stopPropagation()
                      this.setState({ ddActiveItem: name })
                      this.setState({ sidebarVisible: true })
                    }}
                  >
                    <span id='ddProduction' className='text'>Production</span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    name='purchasing'
                    active={ddActiveItem === 'purchasing'}
                    onClick={(e, { name }) => {
                      //  e.stopPropagation()
                      this.setState({ ddActiveItem: name })
                      this.setState({ sidebarVisible: true })
                    }}
                  >
                    <span id='ddPurchasing' className='text'>Purchasing</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>,
              <Menu.Item
                name='accuracy'
                active={activeItem === 'accuracy'}
                onClick={(e, { name })=> {
                  this.setState({ activeItem: name })
                  this.setState({ sidebarVisible: false })

                  try {
                    let request = {
                      template: {
                        name: 'HtmlToBrowserClient'
                      },
                      data: {
                        rptName: 'DashBoard'
                      }
                    }

                    // add custom headers to ajax calls
                    jsreport.headers.Authorization = 'Basic ' + btoa('admin:password')
                    jsreport.render('detail', request)
                    this.setRptStep(2)
                  } catch (e) {
                    alert(e)
                  }
                }}>
                <Icon name='heartbeat'/>
                <span className='text'>Accuracy</span>
              </Menu.Item>,
              <Menu.Menu position='right'>
                <Menu.Item
                  name='logout'
                  active={activeItem === 'logout'}
                  onClick={(e, { name })=> {
                    this.setState({ activeItem: name })
                    this.setRptStep(1)
                    this.setState({ sidebarVisible: false })
                    childProps.rmReport()
                    this.handleLogout()
                  }}>
                  <Icon name='block layout'/>
                  <span className='text'>Logout&nbsp;&nbsp;&nbsp;</span>
                </Menu.Item>
              </Menu.Menu>
            ]
            :
            [
              <Menu.Item
                name='signup'
                active={activeItem === 'signup'}
                onClick={(e, { name }) => {
                  this.setState({ activeItem: name })
                  this.setRptStep(1)
                  childProps.rmReport()
                  this.props.history.push('/signup')
                }} >
                <Icon name='add user'/>Signup
              </Menu.Item>,
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={(e, { name }) => {
                  this.setRptStep(1)
                  this.setState({ activeItem: name })
                  childProps.rmReport()
                  this.props.history.push('/login')
                }} >
                <Icon name='mail forward'/>Login
              </Menu.Item>
            ]

          }
        </Menu>


        {this.state.ddActiveItem === 'production' ?
          <Sidebar.Pushable as={Segment} attached='bottom'>
            <Sidebar as={Menu} animation='push' width='thin' visible={this.state.sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item
                name='tcsbyplant'
                active={activeItem === 'tcsbyplant'}
                onClick={(e, { name }) => {
                  this.setState({ sbActiveItem: name })
                  this.setRptStep(1)
                  this.props.history.push('/tcsbyplant')
                  this.setState({ sidebarVisible: false })
                  this.setRptStep(1)
                }}>
                <Icon name='html5'/>ToolCost
              </Menu.Item>
              <Menu.Item
                name='tcsbyplantXLS'
                active={activeItem === 'tcsbyplantXLS'}
                onClick={(e, { name }) => {
                  this.setState({ sbActiveItem: name })
                  this.setRptStep(1)
                  this.props.history.push('/tcsbyplant')
                  this.setState({ sidebarVisible: false })
                }}>
                <Icon name='file excel outline'/>Excel
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={this.state.sidebarVisible} style={divStyle} >
              {rptStep === 1 ?
                <Routes childProps={childProps} />
                : ''
              }
              <div id='detail' style={divStyle} className='container fill mycontainer' />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          :
          <Sidebar.Pushable as={Segment} style={divStyle} attached='bottom'>
            <Sidebar as={Menu} style={divStyle} animation='push' width='thin' visible={this.state.sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item
                name='tcsbyplantXLS'
                active={activeItem === 'tcsbyplantXLS'}
                onClick={(e, { name }) => {
                  this.setState({ sbActiveItem: name })
                  this.setRptStep(1)
                  this.props.history.push('/tcsbyplant')
                  this.setState({ sidebarVisible: false })
                }}>
                <Icon name='file excel outline'/>Excel
              </Menu.Item>
              <Menu.Item
                name='tcsbyplant'
                active={activeItem === 'tcsbyplant'}
                onClick={(e, { name }) => {
                  this.setState({ sbActiveItem: name })
                  this.setRptStep(1)
                  this.props.history.push('/tcsbyplant')
                  this.setState({ sidebarVisible: false })
                  this.setRptStep(1)
                }}>
                <Icon name='html5'/>ToolCost
              </Menu.Item>

            </Sidebar>
            <Sidebar.Pusher dimmed={this.state.sidebarVisible} style={divStyle} >
              <Segment style={divStyle} basic >
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

