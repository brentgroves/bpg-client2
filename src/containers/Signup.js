import React, { Component } from 'react'
import { Grid, Segment, Header, Icon, Button, Form } from 'semantic-ui-react'
import GenericModal from '../components/GenericModal'

import {
  CognitoUserPool
} from 'amazon-cognito-identity-js'
import config from '../config'
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
    this.signup = this.signup.bind(this)

    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this)

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


  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ loading: true })
    let thisLv1 = this
    await this.signup(this.state.email, this.state.password)
      .then(function () {
        thisLv1.props.history.push('/confirm')
      }).catch(function (e) {
        thisLv1.setState({
          loading: false,
          modalOpen: true,
          modalHeading: 'Signup failure!',
          modalMessage: e.message
        })
      })
  }


  signup(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    })

    return new Promise((resolve, reject) =>
      userPool.signUp(email, password, [], null, (err, result) => {
        if (err) {
          reject(err.message)
          return
        }
        resolve(result.user)
      })
    )
  }

  renderForm() {
    const { emailStatus, passwordStatus, confirmPasswordStatus, loading, formStatus } = this.state
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
              New user info
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
          })()
        }
      </div>
    )
  }
}

