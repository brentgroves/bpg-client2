import React, { Component } from 'react'
import { Grid, Segment, Header, Icon, Button, Form, Message } from 'semantic-ui-react'
import GenericModal from '../components/GenericModal'

import {
  AuthenticationDetails,
  CognitoUserPool
} from 'amazon-cognito-identity-js'
import config from '../config'
/*
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
*/
import LoaderButton from '../components/LoaderButton'
import './Signup.css'

let jsreport = require('jsreport-browser-client-dist')
jsreport.serverUrl = 'http://localhost:5488'

export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null,

      emailStatus: '',
      passwordStatus: '',
      confirmPasswordStatus: '',
      formStatus: '',
      confirmationsStatus: '',

      modalOpen: false,
      modalMessage: '',
      modalHeading: ''


    }
    // This binding is necessary to make `this` work in the callback
    this.emailChange = this.emailChange.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.passwordChange = this.passwordChange.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.confirmaPasswordChange = this.confirmPasswordChange.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this)


    // This binding is necessary to make `this` work in the callback
    this.validateEmail = this.validateEmail.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.setModal = this.setModal.bind(this)
  }
  componentDidMount() {
    setInterval(this.inc, 1000)
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
    let formStatus
    if (emailStatus === 'success' && 
      this.state.passwordStatus === 'success' &&
      this.state.confirmPasswordStatus === 'success') {
      formStatus = 'success'
    } else {
      formStatus = 'error'
    }
    this.setState({
      [event.target.id]: event.target.value,
      emailStatus: emailStatus,
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
    let confirmPasswordStatus
    if (this.state.confirmPassword === event.target.value) {
      confirmPasswordStatus = 'success'
    } else {
      confirmPasswordStatus = 'error'
    }
    let formStatus
    if (this.state.emailStatus === 'success' && 
      passwordStatus === 'success' &&
      confirmPasswordStatus === 'success') {
      formStatus = 'success'
    } else {
      formStatus = 'error'
    }

    this.setState({
      [event.target.id]: event.target.value,
      passwordStatus: passwordStatus,
      confirmPasswordStatus: confirmPasswordStatus,
      formStatus: formStatus
    }) // async so be careful
  }

  confirmPasswordChange = event => {
    let confirmPasswordStatus
    if (this.state.password === event.target.value) {
      confirmPasswordStatus = 'success'
    } else {
      confirmPasswordStatus = 'error'
    }
    let formStatus
    if (this.state.emailStatus === 'success' && 
      this.state.passwordStatus === 'success' &&
      confirmPasswordStatus === 'success') {
      formStatus = 'success'
    } else {
      formStatus = 'error'
    }

    this.setState({
      [event.target.id]: event.target.value,
      confirmPasswordStatus: confirmPasswordStatus,
      formStatus: formStatus
    }) // async so be careful
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    }) // async so be careful
  }



  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0
  }


  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ loading: true })

    try {
      const newUser = await this.signup(this.state.email, this.state.password)
      this.setState({
        newUser: newUser
      })

      //   this.props.history.push('/wait')

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
      alert(e)
    }

    this.setState({ loading: false })
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      await this.confirm(this.state.newUser, this.state.confirmationCode)
      await this.authenticate(
        this.state.newUser,
        this.state.email,
        this.state.password
      )

      this.props.userHasAuthenticated(true)
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  signup(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    })

    return new Promise((resolve, reject) =>
      userPool.signUp(email, password, [], null, (err, result) => {
        if (err) {
          reject(err)
          return
        }

        resolve(result.user)
      })
    )
  }

  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) =>
      user.confirmRegistration(confirmationCode, true, function (err, result) {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
    )
  }

  authenticate(user, email, password) {
    const authenticationData = {
      Username: email,
      Password: password
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    )
  }


  renderConfirmationForm() {
    const { modalOpen, confirmationStatus } = this.state

    const childProps = {
      modalOpen: this.state.modalOpen,
      modalHeading: this.state.modalHeading,
      modalMessage: this.state.modalMessage,
      setModal: this.setModal
    }

    return (
      <div >

          <Grid >

            <Grid.Row>
              <Grid.Column width={5} />
              <Grid.Column width={6}>
                    &nbsp;<br />&nbsp;

                <Segment inverted>
                  <Header as='h2'>
                    <Icon name='user outline' />
                    <Header.Content>
              Welcome to Busche!
                    </Header.Content>
                  </Header>
                <Form inverted >
                  <Form.Input
                    error={confirmationStatus === 'error'}
                        id='confirmationCode'
                        label='Confirmation Code' placeholder='confirmation code'
                        onChange={this.handleChange}
                  />
    <Message
      content="Please check your email for the code"
    />

                  <Button
                      disabled={!this.validateConfirmationForm()}
                    loading={this.state.loading}
                    onClick={this.handleConfirmationSubmit}>Submit</Button>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column width={5} />
          </Grid.Row>

          </Grid>
        }
      </div>

    )
  }

  renderForm() {
    const { emailStatus, passwordStatus, confirmPasswordStatus,loading,formStatus } = this.state
    let disableSubmitButton = (formStatus !== 'success') ? true : false

    return (
      <div >

        <Grid >

          <Grid.Row>
            <Grid.Column width={5} />
            <Grid.Column width={6}>
                    &nbsp;<br />&nbsp;

              <Segment inverted>
                <Header as='h2'>
                  <Icon name='user outline' />
                  <Header.Content>
              Welcome to Busche!
                  </Header.Content>
                </Header>

                <Form inverted>
                  <Form.Input
                    error={emailStatus === 'error'}
                    id='email'
                    label='Email' placeholder='joe@schmoe.com'
                    onChange={this.emailChange}
                  />

                  <Form.Input
                    error={(passwordStatus === 'error')}
                    id='password'
                    label='Enter Password'
                    type='password'
                    onChange={this.passwordChange}
                  />
                  <Form.Input
                    error={(confirmPasswordStatus === 'error')}
                    id='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    onChange={this.confirmPasswordChange}
                  />

                  <Button
                    disabled={disableSubmitButton}
                    loading={loading}
                    onClick={this.handleSubmit}>Submit</Button>

                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column width={5} />
          </Grid.Row>


        </Grid>
        }
      </div>

    )
  }

  render() {
    const { modalOpen } = this.state
    const childProps = {
      modalOpen: this.state.modalOpen,
      modalHeading: this.state.modalHeading,
      modalMessage: this.state.modalMessage,
      setModal: this.setModal
    }


    return (
      <div className='Signup'>
        {
          (() => {
            if (modalOpen) {
              return <GenericModal childProps={childProps} />
            }
            if (this.state.newUser === null) {
              return this.renderForm()
            }
            return this.renderConfirmationForm()
          })()
        }
      </div>
    )
  }
}

