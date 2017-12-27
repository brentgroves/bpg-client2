import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { signOutUser } from './libs/awsLib'
import TopMenu from './components/TopMenu'
import MySidebar from './components/MySidebar'

let jsreport = require('jsreport-browser-client-dist')
jsreport.serverUrl = 'http://localhost:5488'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      rptStep: 1,
      sidebarVisible: false,
      dtStart: '12-6-2017 23:15:10',
      sidebarActiveItem: '',
      topmenuActiveItem: '',
      dropdownActiveItem: ''
    }

    // This binding is necessary to make `this` work in the callback
    this.handleLogout = this.handleLogout.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.setSidebarVisible = this.setSidebarVisible.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.setSidebarActiveItem = this.setSidebarActiveItem.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.setDropdownActiveItem = this.setDropdownActiveItem.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.setTopmenuActiveItem = this.setTopmenuActiveItem.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.setRptStep = this.setRptStep.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.getRptStep = this.getRptStep.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.rmReport = this.rmReport.bind(this)
    // window.onresize = this.handleResize;
  }


  async componentDidMount() {

  }


setSidebarActiveItem = item => {
  this.setState({ sidebarActiveItem: item })
}
setDropdownActiveItem = item => {
  this.setState({ dropdownActiveItem: item })
}
setTopmenuActiveItem = item => {
  this.setState({ topmenuActiveItem: item })
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

  handleLogout = () => {
    this.rmReport()
    signOutUser()
    this.userHasAuthenticated(false)
    this.setSidebarVisible(false)
    this.setRptStep(1)
    this.props.history.push('/login')
  }


  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout,
      setSidebarVisible: this.setSidebarVisible,
      sidebarVisible: this.state.sidebarVisible,
      topmenuActiveItem: this.state.topmenuActiveItem,
      dropdownActiveItem: this.state.dropdownActiveItem,
      sidebarActiveItem: this.state.sidebarActiveItem,
      setSidebarActiveItem: this.setSidebarActiveItem,
      setDropdownActiveItem: this.setDropdownActiveItem,
      setTopmenuActiveItem: this.setTopmenuActiveItem,
      setRptStep: this.setRptStep,
      getRptStep: this.getRptStep,
      rmReport: this.rmReport,
      jsreport: jsreport

    }


    let divStyle = {
      width: '100%',
      height: '100%',
      padding: '0px !important',
      margin: '0px !important'
    }

    return (
      <div style={divStyle} className='mycontainer'>
        <TopMenu childProps={childProps}/>
        <MySidebar childProps={childProps} />
      </div>
    )
  }
}

export default withRouter(App)

