import React, { Component } from "react";
import { Grid, Segment, Header, Icon, Button, Form, Message } from 'semantic-ui-react'
import GenericModal from '../components/GenericModal'

import {
  AuthenticationDetails,
  CognitoUserPool
} from "amazon-cognito-identity-js";
import config from "../config";
/*
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
*/
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";

let jsreport = require('jsreport-browser-client-dist')
jsreport.serverUrl = 'http://localhost:5488'

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",

      confirmPassword: "",
      confirmationCode: "",
      confirmationStatus:"",
      newUser: null,

      emailStatus: '',
      passwordStatus: '',
      formStatus: '',

      modalOpen: false,
      modalMessage: '',
      modalHeading: ''
    };
    // This binding is necessary to make `this` work in the callback
    this.emailChange = this.emailChange.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.passwordChange = this.passwordChange.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.confirmationChange = this.confirmationChange.bind(this)

    // This binding is necessary to make `this` work in the callback
    this.validateEmail = this.validateEmail.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.setModal = this.setModal.bind(this)


  }
componentDidMount() {
  setInterval(this.inc, 1000);
}

  setModal(open, message, heading) {
    if (message) {
      this.setState({
        modalOpen: open,
        modalMessage: message,
        modalHeading: heading
      })
    } else {
      this.setState({ modalOpen: open })
    }
  }
  validateEmail(x) {
    let atpos = x.indexOf('@')
    let dotpos = x.lastIndexOf('.')
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
      //  alert("Not a valid e-mail address");
      return 'error'
    }
    return 'success'
  }

 // cant combine change functions because of async nature of setState
  emailChange = event => {
    let emailStatus = this.validateEmail(event.target.value)
    this.setState({
      [event.target.id]: event.target.value,
      emailStatus: emailStatus
    }) // async so be careful
    let formStatus
    if (emailStatus === 'success' && this.state.passwordStatus === 'success') {
      formStatus = 'success'
    } else {
      formStatus = 'error'
    }
    this.setState({
      formStatus: formStatus
    }) // async so be careful
  }

  passwordChange = event => {
    let passwordStatus
    if (event.target.value.length > 0) {
      passwordStatus = 'success'
    } else {
      passwordStatus = 'error'
    }
    this.setState({
      [event.target.id]: event.target.value,
      passwordStatus: passwordStatus
    }) // async so be careful
    let formStatus
    if (this.state.emailStatus === 'success' && passwordStatus === 'success') {
      formStatus = 'success'
    } else {
      formStatus = 'error'
    }
    this.setState({
      formStatus: formStatus
    }) // async so be careful
  }

  confirmationChange = event => {
    let passwordStatus
    if (event.target.value.length > 0) {
      passwordStatus = 'success'
    } else {
      passwordStatus = 'error'
    }
    this.setState({
      [event.target.id]: event.target.value,
      passwordStatus: passwordStatus
    }) // async so be careful
    let formStatus
    if (this.state.emailStatus === 'success' && passwordStatus === 'success') {
      formStatus = 'success'
    } else {
      formStatus = 'error'
    }
    this.setState({
      formStatus: formStatus
    }) // async so be careful
  }


  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }



  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await this.signup(this.state.email, this.state.password);
      this.setState({
        newUser: newUser
      });

      this.props.history.push('/wait')

/*
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
        this.props.setRptStep(2);
        */
      this.props.setSidebarVisible(false)


    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.confirm(this.state.newUser, this.state.confirmationCode);
      await this.authenticate(
        this.state.newUser,
        this.state.email,
        this.state.password
      );

      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  signup(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });

    return new Promise((resolve, reject) =>
      userPool.signUp(email, password, [], null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result.user);
      })
    );
  }

  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) =>
      user.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    );
  }

  authenticate(user, email, password) {
    const authenticationData = {
      Username: email,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    );
  }


  renderConfirmationForm() {
    const { modalOpen,confirmationStatus } = this.state

    const childProps = {
      modalOpen: this.state.modalOpen,
      modalHeading: this.state.modalHeading,
      modalMessage: this.state.modalMessage,
      setModal: this.setModal
    }

/*

        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
  */

    return (
     <div >

        {modalOpen ? <GenericModal childProps={childProps} />
          :
          <Grid >

            <Grid.Row>
              <Grid.Column width={3} />
              <Grid.Column width={10}>
                    &nbsp;<br />&nbsp;

                <Segment>
                  <Header as='h2'>
                    <Icon name='plug' />
                    <Header.Content>
              Welcome to Busche!
                    </Header.Content>
                  </Header>

      <form onSubmit={this.handleConfirmationSubmit}>
                    {(confirmationStatus === 'error'
                      ?
                      <Form.Input
                        error
                        id='confirmationCode'
                        label='Confirmation' placeholder='confirmation'
                        onChange={this.handleChange}
                      />
                      :
                      <Form.Input
                        id='confirmationCode'
                        label='Confirmation' placeholder='confirmation'
                        onChange={this.handleChange}
                      />
                    )}

        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
                </Segment>
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid.Row>


          </Grid>
        }
      </div>

    );
  }

  renderForm() {

/*
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        */

    const { modalOpen,emailStatus,passwordStatus,confirmationStatus } = this.state

    const childProps = {
      modalOpen: this.state.modalOpen,
      modalHeading: this.state.modalHeading,
      modalMessage: this.state.modalMessage,
      setModal: this.setModal
    }

    return (
     <div >

        {modalOpen ? <GenericModal childProps={childProps} />
          :
          <Grid >

            <Grid.Row>
              <Grid.Column width={3} />
              <Grid.Column width={10}>
                    &nbsp;<br />&nbsp;

                <Segment>
                  <Header as='h2'>
                    <Icon name='plug' />
                    <Header.Content>
              Welcome to Busche!
                    </Header.Content>
                  </Header>

                  <Form >
                      {(emailStatus === 'error'
                      ?
                      <Form.Input
                        error
                        id='email'
                        label='Email' placeholder='joe@schmoe.com'
                        onChange={this.emailChange}
                      />
                      :
                      <Form.Input
                        id='email'
                        label='Email' placeholder='joe@schmoe.com'
                        onChange={this.emailChange}
                      />
                    )}

                   {(passwordStatus === 'error'
                      ?
                      <Form.Input
                        error
                        id='password'
                        label='Enter Password'
                        type='password'
                        onChange={this.passwordChange}
                      />
                      :
                      <Form.Input
                        id='password'
                        label='Enter Password'
                        type='password'
                        onChange={this.passwordChange}
                      />
                    )}

                   {(confirmationStatus === 'error'
                      ?
                      <Form.Input
                        error
                        id='passwordConfirmation'
                        label='Confirm Password'
                        type='password'
                        onChange={this.confirmationChange}
                      />
                      :
                      <Form.Input
                        id='passwordConfirmation'
                        label='Confirm Password'
                        type='password'
                        onChange={this.confirmationChange}
                      />
                    )}

                    <Button disabled={!this.validateForm}
                      loading={this.state.isLoading} onClick={this.handleSubmit}>Submit</Button>

      </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid.Row>


          </Grid>
        }
      </div>

    );
  }

  render() {


    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}

