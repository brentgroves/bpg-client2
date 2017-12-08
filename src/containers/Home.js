import React, { Component } from "react";
import "./Home.css";
import {  Grid,Container, Segment, Rail, Menu, Header, Icon } from 'semantic-ui-react'

export default class Home extends Component {
  render() {
    let divStyle = {
      width: '90%',
      height: '100%',
      minHeight: '100%'
      //      width: '100%'
    }

    return (
  <Grid >
    <Grid.Row>
      <Grid.Column width={3}>
      </Grid.Column>
      <Grid.Column width={10}>
        <Segment>
          <Header as='h2'>
            <Icon name='plug' />
            <Header.Content>
              Tool Cost Summary
            </Header.Content>
          </Header>      
          <p><strong>Description:</strong> There are several reports that can be used to summarize Tooling Activity and identify issues.  Read each description below to see what can be done to improve our numbers.  </p>
          <p><strong>Scripts:</strong>{' '}
          <br/><strong>To Do:</strong>{' '}
          <br/><strong>Description:</strong>{' '} If the scripts did not run the cost data will not be accurate.  </p>
        </Segment>
      </Grid.Column>
      <Grid.Column width={3}>
      </Grid.Column>
    </Grid.Row>


  </Grid>
    );
  }
}

/*
      <Rail position='left'>
      <Segment>
            <Icon name='settings' />
            <p><strong>  Report Dashboard </strong></p>
      </Segment>

      </Rail>

      <Rail  position='right'>
        <Segment>
            <Icon name='heartbeat' />
            <p><strong>Improve accuracy of reports</strong></p>

        </Segment>
      </Rail>

      <div className="mycontainer Home">

        <div className="lander">
          <h1>Busche Reporter</h1>
          <p>Please select a report...</p>
        </div>


      </div>

*/