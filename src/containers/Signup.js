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
      loading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,

      emailStatus: '',
      passwordStatus: '',
      confirmPasswordStatus:"",
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
    this.confirmaPasswordChange = this.confirmPasswordChange.bind(this)

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
  }

  passwordChange = event => {
    let passwordStatus
    if (event.target.value.length > 0) {
      passwordStatus = 'success'
    } else {
      passwordStatus = 'error'
    }
    let confirmPasswordStatus
    if (this.state.confirmPassword === event.target.value) {
      confirmPasswordStatus = 'success'
    } else {
      confirmPasswordStatus = 'error'
    }
    this.setState({
      [event.target.id]: event.target.value,
      passwordStatus: passwordStatus,
      confirmPasswordStatus: confirmPasswordStatus
    }) // async so be careful




  }

  confirmPasswordChange = event => {
    let confirmPasswordStatus
    if (this.state.password === event.target.value) {
      confirmPasswordStatus = 'success'
    } else {
      confirmPasswordStatus = 'error'
    }
    this.setState({
      [event.target.id]: event.target.value,
      confirmPasswordStatus: confirmPasswordStatus
    }) // async so be careful
  }


  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
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
    const { modalOpen,emailStatus,passwordStatus,confirmPasswordStatus } = this.state
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

                   {(confirmPasswordStatus === 'error'
                      ?
                      <Form.Input
                        error
                        id='confirmPassword'
                        label='Confirm Password'
                        type='password'
                        onChange={this.confirmPasswordChange}
                      />
                      :
                      <Form.Input
                        id='confirmPassword'
                        label='Confirm Password'
                        type='password'
                        onChange={this.confirmPasswordChange}
                      />
                    )}

                    <Button 
                      disabled={
                        emailStatus!=='success' || 
                        passwordStatus!=='success' ||
                        confirmPasswordStatus!=='success'
                      }
                      loading={this.state.loading} 
                      onClick={this.handleSubmit}>Submit</Button>

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

