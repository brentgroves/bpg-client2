import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

import ReactDOM from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import Routes from './Routes'
import registerServiceWorker from './registerServiceWorker'
import SplitPane from 'react-split-pane'
import { authUser, signOutUser } from './libs/awsLib'
import './index.css'
import MyNavBar from './containers/MyNavBar'
import MyAccord from './containers/MyAccord'
// import { Grid} from "react-bootstrap";
import { Button, Accordion, Icon } from 'semantic-ui-react'
// import '../sass/main.scss';
// https://www.npmjs.com/package/react-split-pane


// var ReactGridLayout = require('react-grid-layout');


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      activeIndex: 0,
      rptStep: 1,
      rptId: 0
    }
    // This binding is necessary to make `this` work in the callback
    this.handleLogout = this.handleLogout.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.setRptStep = this.setRptStep.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.getRptStep = this.getRptStep.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.handleResize = this.handleResize.bind(this)
    window.onresize = this.handleResize;


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

  setRptStep = rptStep => {
    this.setState({ rptStep: rptStep })
  }
  getRptStep = () => {
    return this.state.rptStep
  }

  handleLogout = event => {
    signOutUser()
    this.userHasAuthenticated(false)
    this.props.history.push('/login')
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  handleResize = (size) => {
        var myRpt =document.getElementById('myRpt');
         if(myRpt!==null){
          var verticalPane =document.getElementById('myRpt').parentElement;
           var height = verticalPane.clientHeight;
           var width = verticalPane.clientWidth-10;
           //myRpt.style.width=width;
           var style = `width:${width}px;height:${height}px`;
           myRpt.setAttribute("style",style);

         }
  }


  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout,
      setRptStep: this.setRptStep,
      getRptStep: this.getRptStep

    }
    let rerender = false
    if (this.state.rptStep === 1) {
      rerender = true
    }

//    <div key={this.state.rptId}>

    const { activeIndex, rptId } = this.state
    return (
      <SplitPane split='horizontal' allowResize={false} defaultSize={40}>
        <div key='1'>
          <MyNavBar childProps={childProps} />
        </div>
        <SplitPane onChange={ this.handleResize } split='vertical' allowResize={false} defaultSize={200}>
          <div key='2' >
            <MyAccord childProps={childProps} />
          </div>
          <div key='3' >
            <Routes childProps={childProps} />
            <div id='detail' />
          </div>
        </SplitPane>
      </SplitPane>
      );
  }
}

export default withRouter(App)

/*
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

