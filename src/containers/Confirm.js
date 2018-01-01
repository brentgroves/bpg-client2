import React, { Component } from 'react'
import { Grid, Segment, Header, Icon, Form, Message } from 'semantic-ui-react'
import GenericModal from '../components/GenericModal'
import {
  CognitoUserPool,
  CognitoUser
} from 'amazon-cognito-identity-js'
import config from '../config'


export default class Confirm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      email: '',
      emailStatus: '',
      confirmationCode: '',
      confirmationCodeStatus: '',
      formStatus: '',
      newUser: null,
      confirmed: false,
      modalOpen: false,
      modalMessage: '',
      modalHeading: ''


    }
    // This binding is necessary to make `this` work in the callback
    this.emailChange = this.emailChange.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.confirmationCodeChange = this.confirmationCodeChange.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.validateEmail = this.validateEmail.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.confirm = this.confirm.bind(this)

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
      this.state.confirmationStatus === 'success') {
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

  confirmationCodeChange = event => {
    let confirmationCodeStatus
    if (event.target.value.length > 0) {
      confirmationCodeStatus = 'success'
    } else {
      confirmationCodeStatus = 'error'
    }
    let formStatus
    if (this.state.emailStatus === 'success' &&
      confirmationCodeStatus === 'success') {
      formStatus = 'success'
    } else {
      formStatus = 'error'
    }

    this.setState({
      [event.target.id]: event.target.value,
      confirmationCodeStatus: confirmationCodeStatus,
      formStatus: formStatus
    }) // async so be careful
  }


  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ isLoading: true })

    let thisLv1 = this
    await this.confirm(this.state.email, this.state.confirmationCode)
      .then(function () {
        thisLv1.setState({
          confirmed: true
        })
      }).catch(function (e) {
        thisLv1.setState({ loading: false })
        thisLv1.setState({
          modalOpen: true,
          modalHeading: 'Confirmation failure!',
          modalMessage: e
        })
      })
  }


  // http://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html#using-amazon-cognito-identity-user-pools-javascript-example-confirming-user
  confirm(email, confirmationCode) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    })
    const user = new CognitoUser({ Username: email, Pool: userPool })
    return new Promise((resolve, reject) =>
      user.confirmRegistration(confirmationCode, true, function (err, result) {
        if (err) {
          reject(err.message)
        }
        resolve(result)
      })
    )
  }
  //                    &nbsp;<br />&nbsp;

  renderConfirmationForm() {
    const { emailStatus, confirmationStatus, loading, formStatus, confirmed } = this.state
    let disableSubmitButton = (formStatus !== 'success') ? true : false
    let disableLoginButton = (formStatus !== 'success') ? true : false
    let message = confirmed ? 'You may now login.'
      : 'Please check your email for the code.'
    return (
      <Grid >
        {confirmed ?

          <Grid.Row centered>
            <Grid.Column width={6} >

              <Segment inverted>

                <Header as='h2'>
                  <Icon name='user outline' />
                  <Header.Content>
              Confirmation Success
                  </Header.Content>
                </Header>
                <Form inverted >
                  <Form.Button key='9'
                    disabled={disableLoginButton}
                    onClick={()=>{
                      this.props.history.push('/login')
                    }} content='Login'/>
                  <Message color='blue' content={message} />

                </Form>

              </Segment>
            </Grid.Column>
          </Grid.Row>

          :


          <Grid.Row centered>
            <Grid.Column width={6} >
              <Segment inverted>

                <Header as='h2'>
                  <Icon name='user outline' />
                  <Header.Content>
              Confirmation Code
                  </Header.Content>
                </Header>
                <Form inverted >
                  <Form.Input
                    error={emailStatus === 'error'}
                    id='email'
                    label='Email' placeholder='joe@schmoe.com'
                    onChange={this.emailChange}
                  />
                  <Form.Input
                    error={confirmationStatus === 'error'}
                    id='confirmationCode'
                    label='Confirmation Code' placeholder='confirmation code'
                    onChange={this.confirmationCodeChange}
                  />
                  <Form.Button key='10'
                    disabled={disableSubmitButton}
                    loading={loading}
                    onClick={this.handleSubmit} content='Submit'/>
                </Form>
              </Segment>
              <Segment>
                <Message color='blue' content={message} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        }
      </Grid>

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
            return this.renderConfirmationForm()
          })()
        }
      </div>
    )
  }
}

