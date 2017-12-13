import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Form, Message } from 'semantic-ui-react'
//import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import ErrorModal from './ErrorModal';
import './Login.css'
import config from '../config'
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js'

let jsreport = require('jsreport-browser-client-dist')
jsreport.serverUrl = 'http://localhost:5488'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      email: '',
      password: '',
      emailStatus:'',
      passwordStatus:'',
      formStatus:''
    }
  // This binding is necessary to make `this` work in the callback
  this.emailChange = this.emailChange.bind(this)
  // This binding is necessary to make `this` work in the callback
  this.passwordChange = this.passwordChange.bind(this)
    // This binding is necessary to make `this` work in the callback
  this.validateEmail = this.validateEmail.bind(this)


  }



  login(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    })
    const user = new CognitoUser({ Username: email, Pool: userPool })
    const authenticationData = { Username: email, Password: password }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    )
  }

  validateForm() {
    if (this.state.emailMsg === 'success' &&  this.state.passwordMsg === 'success'){
      this.state.validForm = true;
    }else{
      this.state.validForm = false;
    }
//    return this.emailMsg === 'success' && this.state.password.length > 0
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
    let emailStatus = this.validateEmail(event.target.value);
    this.setState({
      [event.target.id]: event.target.value,
      emailStatus: emailStatus
    }) //async so be careful
    let formStatus;
    if (emailStatus === 'success' &&  this.state.passwordStatus === 'success'){
      formStatus='success';
    }else{
      formStatus='error';
    }
    this.setState({
      formStatus: formStatus
    }) //async so be careful


  }

  passwordChange = event => {
    let passwordStatus;
    if(event.target.value.length>0){
      passwordStatus='success';
    }else{
      passwordStatus='error';
    } 
    this.setState({
      [event.target.id]: event.target.value,
      passwordStatus: passwordStatus
    }) //async so be careful
    let formStatus;
    if (this.state.emailStatus === 'success' &&  passwordStatus === 'success'){
      formStatus='success';
    }else{
      formStatus='error';
    }
    this.setState({
      formStatus: formStatus
    }) //async so be careful
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({ loading: true })
    try {
      await this.login(this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)

        let thisLv1 = this
        // This binding is necessary to make `this` work in the callback
        jsreport.headers.Authorization = 'Basic ' + btoa('admin:password')

        let request = {
          template: {
            name: 'Json'
          },
          data: {
            dtStart: '11-01-2017 10:15:10'
          }
        }

        // render through AJAX request and return promise with array buffer response
        jsreport.renderAsync(request).then(function (res) {
          // This binding is necessary to make `this` work in the callback
          let done=false;
          let thisLv2 = thisLv1
          console.log(res)
          let json = res.toString()
          let t = json.replace(/&quot;/g, '"')
          let obj = JSON.parse(t)
          const {notCurrent} = obj;
          if(notCurrent){
            thisLv2.props.history.push('/errorModal');
            done=true;
          }
          if(!done){
            let request2 = {
              template: {
                name: 'HtmlToBrowserClient'
              },
              data: {
                rptName: 'DashBoard'
              }
            }
            jsreport.render('detail', request2)
            thisLv2.props.history.push('/wait');
          }
        });
    } catch (e) {
      alert(e)
      this.props.history.push('/errorModal');
    }
    this.setState({ loading: false })
  }

  render() {
   const {emailStatus,passwordStatus,formStatus,loading} = this.state; 
   let disableSubmitButton = (this.state.formStatus!=='success')?true:false;
    return (
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


        <Message
          success
          header='Form Completed'
          content="You're all signed up for the newsletter"
        />


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

    <Button disabled={disableSubmitButton} loading={loading} onClick={this.handleSubmit}>Submit</Button>
  </Form>
    )
  }
}

export default withRouter(Login)

/*
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import ErrorModal from './ErrorModal';
import './Login.css'
import config from '../config'
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js'

let jsreport = require('jsreport-browser-client-dist')
jsreport.serverUrl = 'http://localhost:5488'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      email: '',
      password: ''
    }
  }

  login(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    })
    const user = new CognitoUser({ Username: email, Pool: userPool })
    const authenticationData = { Username: email, Password: password }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    )
  }

  validateForm() {
    return this.validateEmail() === 'success' && this.state.password.length > 0
  }

  validateEmail() {
    let x = this.state.email
    let atpos = x.indexOf('@')
    let dotpos = x.lastIndexOf('.')
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
      //  alert("Not a valid e-mail address");
      return 'error'
    }
    return 'success'
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({ isLoading: true })
    try {
      await this.login(this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)

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
        this.props.rmReport();
        this.props.setRptStep(2);
//      this.props.history.push('/home')
      this.props.setSidebarVisible(false)
    } catch (e) {
      alert(e)
      this.props.history.push('/errorModal');
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <div className='Login'>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId='email' validationState={this.validateEmail()} bsSize='large'>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type='email'
              value={this.state.email}
              placeholder='user@example.com'
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId='password' bsSize='large'>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type='password'
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize='large'
            disabled={!this.validateForm()}
            type='submit'
            isLoading={this.state.isLoading}
            text='Login'
            loadingText='Logging in…'
          />

        </form>
      </div>
    )
  }
}
*/