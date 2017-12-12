import React, { Component } from "react";
import "./Home.css";
import { Loader, Dimmer, Grid,Container, Segment, Rail, Menu, Header, Icon } from 'semantic-ui-react'
import LoaderButton from '../components/LoaderButton'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }

  }
  validateForm() {
    return 'success'
  }  
  render() {
    let divStyle = {
      width: '100%',
      height: '100%'
      //      width: '100%'
    }

    let iconStyle = {
      width: '50%',
      height: '50%',
      padding:'150px'
      //      width: '100%'
    }

    let headerStyle = {
      padding:'200px 150px'
      //      width: '100%'
    }

    let centerStyle = {
      textwidth: '100%',
      height: '100%'
      //      width: '100%'
    }

/*

<div class="ui inverted teal vertical segment">
    <div class="ui page grid">
      <div class="column">
        <h2 class="ui inverted header">Full Width Background</h2>
        <p>First section of content</p>
      </div>
    </div>
</div>
*/



    return (
      [
<Segment >
<Grid >
    <Grid.Row >
      <Grid.Column width={4} />
      <Grid.Column  width={8}>
      <Segment>
<Grid.Row>
    <Icon size='huge' name='settings' />
    <h1 className='lander' >Busche Reporter</h1>
    </Grid.Row>
  </Segment>
      </Grid.Column>
      <Grid.Column width={4} />

    </Grid.Row>
<Grid.Row>
  <Grid.Column columns={1}>


            <Dimmer >
              <Loader>Loading</Loader>
            </Dimmer>

    <Header textAlign='center' inverted color='teal' as='h1'>First Header</Header>
    <h2>Second Header</h2>
    <Header as='h3'>Third Header</Header>
    <Header as='h4'>Fourth Header</Header>
    <Header as='h5'>Fifth Header</Header>
    <Header as='h6'>Sixth Header</Header>
    </Grid.Column>
    </Grid.Row>
    </Grid>
</Segment>
  ]
    );
  }
}

/*
    <Grid.Row >
      <Grid.Column width={4} />
      <Grid.Column width={8} >
         <Header as='h2' style={headerStyle}>
            <Icon name='settings' />
            <Header.Content>
              Busche Reporter
            </Header.Content>
          </Header>      
      </Grid.Column>
      <Grid.Column width={4} />

    </Grid.Row>
    <Grid.Row columns={3}>
      <Grid.Column>
      </Grid.Column>
      <Grid.Column>
    <Header as='h1'>First Header</Header>
    <Header as='h2'>Second Header</Header>
    <Header as='h3'>Third Header</Header>
    <Header as='h4'>Fourth Header</Header>
    <Header as='h5'>Fifth Header</Header>
    <Header as='h6'>Sixth Header</Header>
      </Grid.Column>
      <Grid.Column>
      </Grid.Column>
    </Grid.Row>


    <Grid.Row columns={3}>
      <Grid.Column>
      </Grid.Column>
      <Grid.Column>
          <Segment style={iconStyle} >
            <Dimmer active>
              <Loader>Loading</Loader>
            </Dimmer>
          </Segment>

      </Grid.Column>
      <Grid.Column>
      </Grid.Column>

    </Grid.Row>
</Segment>
</Grid.Column>
<Grid.Column>
</Grid.Column>
</Grid.Row>
</Grid>


          <Segment style={iconStyle}>
              <Icon size='huge' name='settings' />
          </Segment>

    <Container textAlign='center'>
  <Header as='h2' icon>
    <Icon name='settings' />
    Account Settings
    <Header.Subheader>
      Manage your account settings and set e-mail preferences.
    </Header.Subheader>
  </Header>
    </Container>,


        <Header as='h2'>
            <Icon name='plug' />
            <Header.Content>
              Busche Reporter
            </Header.Content>
          </Header>      
          <Header as='h3'>
            <Header.Content>
          Web based reporting software. 
            </Header.Content>
          </Header>      
          <p><strong>Please wait while the system status is being verified...</strong>{' '}</p>

*/