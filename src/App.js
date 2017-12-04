import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Link, withRouter } from "react-router-dom";
import Routes from "./Routes";
import registerServiceWorker from "./registerServiceWorker";
import SplitPane from 'react-split-pane';
import { authUser, signOutUser } from "./libs/awsLib";
import "./index.css";
import MyNavBar from './containers/MyNavBar';
import MyAccord from './containers/MyAccord';
import { Grid} from "react-bootstrap";
//https://www.npmjs.com/package/react-split-pane


var ReactGridLayout = require('react-grid-layout');




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
        // This binding is necessary to make `this` work in the callback
    this.handleLogout = this.handleLogout.bind(this);

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
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout
    };
        // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 1, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 2, w: 1, h: 2}
    ];//https://github.com/STRML/react-grid-layout#usage
    return (

      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={230} width={1200}>
        <div key="a">

        </div>
        <div key="b">
                  <MyNavBar childProps={childProps} />

        </div>
        <div id='detail' key="c">c</div>
      </ReactGridLayout>

    );
  }
}

export default withRouter(App);

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



    <SplitPane split="horizontal" allowResize={false} defaultSize={70}>
        <div key="1">
          <MyNavBar childProps={childProps} />
        </div>
        <SplitPane split="vertical" defaultSize={120}>
            <div key="2" >
              <MyAccord childProps={childProps} />
            </div>
            <SplitPane split="vertical" >
            <div key="3" >
              <Routes childProps={childProps} />
            </div>
                  <div id='detail'></div>
            </SplitPane>
        </SplitPane>
    </SplitPane>


                  <div style={{display: 'none'}} id='detail'></div>

        <SplitPane defaultSize={150} split="vertical">
            <div key="2" >
              <MyAccord childProps={childProps} />
            </div>
            <div key="3" >
              <Routes childProps={childProps} />
            </div>
            <div key="4" >
              <Routes childProps={childProps} />
                  <div id='detail'></div>
            </div>

        </SplitPane>


            <div key="4" >
            <Row>  
              <Col xs={12} >  
                  <div id='detail'></div>
              </Col>  
            </Row>
            </div>

*/
