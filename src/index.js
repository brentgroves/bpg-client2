import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import SplitPane from 'react-split-pane';
import "./index.css";
import MyNavBar from './containers/MyNavBar';
import MyReport from './containers/MyReport';
//https://www.npmjs.com/package/react-split-pane
ReactDOM.render(

    <SplitPane split="horizontal" allowResize={false} defaultSize={150}>
        <div key="1">
		  <Router>
        	<MyNavBar />
		  </Router>

        </div>
        <SplitPane defaultSize={150} split="vertical">
            <div key="2" >
			  <Router>
			    <App />
			  </Router>            
            </div>
            <div key="3" >
			  <Router>
            	<MyReport />
			  </Router>            
            </div>
        </SplitPane>
    </SplitPane>,


  document.getElementById("basic-vertical-example")
);
registerServiceWorker();



/*

allowResize={false} defaultSize={150}

        <SplitPane defaultSize={600} split="vertical">
            <div key="1" >
			  <Router>
			    <App />
			  </Router>            
            </div>
            <div key="1" >
			  <Router>
            	<MyReport />
			  </Router>            
            </div>
        </SplitPane>,



import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import SplitPane from 'react-split-pane';
import "./index.css";

const BasicVerticalExample = () => {
    return (
        <SplitPane split="vertical">
            <div key="1" >
	            Hello
            </div>
            <div key="1" >
			  <Router>
			    <App />
			  </Router>            
            </div>
        </SplitPane>
    );
};

if (document.getElementById('basic-vertical-example')) render(<BasicVerticalExample />, document.getElementById('basic-vertical-example'));

    */