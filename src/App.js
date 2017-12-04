import React, {Component} from "react";
import { Panel} from "react-bootstrap";

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
import { Button,Accordion, Icon } from 'semantic-ui-react'
//import '../sass/main.scss';
//https://www.npmjs.com/package/react-split-pane


//var ReactGridLayout = require('react-grid-layout');




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      activeIndex: 0
    };
        // This binding is necessary to make `this` work in the callback
    this.handleLogout = this.handleLogout.bind(this);
        // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);

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

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
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
        const { activeIndex } = this.state
    return (

    <SplitPane split="horizontal" allowResize={false} defaultSize={40}>
        <div key="1">
          <MyNavBar childProps={childProps} />
        </div>
        <SplitPane split="vertical" defaultSize={300}>
            <div key="2" >
      <Accordion fluid styled>
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
            </div>
            <div key="3" >
              <Routes childProps={childProps} />
               <div id='detail'></div>
            </div>
        </SplitPane>
    </SplitPane>

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
