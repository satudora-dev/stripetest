import React from 'react';
import { firebaseAuth } from '../../firebase';


firebaseAuth().useDeviceLanguage();

// var JsBarcode = require('jsbarcode');
// var { createCanvas } = require("canvas");
// var canvas = createCanvas();





class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeSent: false,
      recaptchaVerifier: null,
      confirmationResult: null,
      phoneNumber : "",
      code : "",
    };
  }

  componentDidMount = () => {
    this.setState({recaptchaVerifier: new firebaseAuth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response)  => {
        this.onSignInSubmit();
      }
    })})
    // JsBarcode(canvas, "Hello");
  }

  onSignInSubmit = () => {
    var appVerifier = this.state.recaptchaVerifier;

    firebaseAuth().signInWithPhoneNumber('+81' + this.state.phoneNumber.slice(1), appVerifier)
      .then( (confirmationResult) => {
        this.setState({
          confirmationResult:confirmationResult,
          codeSent: true
        })
      }).catch(error => {
        console.log(error)
      })
  }

  confirmCode = () => {
    this.state.confirmationResult.confirm(this.state.code).then( (result) => {
      var user = result.user;
      this.props.history.push('/')
    })
  }

  render(){
    return (
      <div>
      {(() => {
        if(!this.state.codeSent){
          return (
          <div>
            <p>Enter Your Phone Number to confirm via SMS  ex.080XXXXXXXX</p>
            <input className={'phone-number'} id={'phone-number'} onChange={e => this.setState({phoneNumber:e.target.value})} />
            <button id={'sign-in-button'} onClick={() => {
              this.onSignInSubmit();
            }}>Signin</button>
          </div>
          )
        }else{
          return (
            <div>
              <p>Enter Confirmation 6-digits code   ex.999999</p>
              <input className={'code'} id={'code'} onChange={e => this.setState({code:e.target.value})} />
              <button onClick={() => this.confirmCode()}>code</button>
            </div>
          )
        }})()}
        <div>
          <button onClick={() => console.log(this.state.phoneNumber)}>Phone confirmation</button>
        </div>

      </div>
    )
  }

}

export default Login
