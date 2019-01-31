import React from 'react';
import { firebaseAuth } from '../../firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

firebaseAuth().useDeviceLanguage();
const btnstyle = {
  marginRight: "10px",
  marginBottom: "10px",
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 40,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
}
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
    this.setState({recaptchaVerifier: new firebaseAuth.RecaptchaVerifier('sign-in-Button', {
      'size': 'invisible',
      'callback': (response)  => {
        this.onSignInSubmit();
      }
    })})
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
      this.props.history.push('/mypage');
    })
  }

  render(){
    if(this.props.cuid) return this.props.history.push('/mypage')
    return (
      <div>
      {(() => {
        if(!this.state.codeSent){
          return (
            <div>
              <div>
                <p>SMSを利用して本人確認を行います</p>
                  <TextField
                    className={'phone-number'}
                    id={'phone-number'}
                    name="phone-number"
                    label="電話番号(ex)"
                    required={true}
                    value={this.state.phoneNumber}
                    onChange={e => this.setState({phoneNumber:e.target.value})}
                    margin="normal"
                  />
              </div>
              <div>
                <Button style={btnstyle} id={'sign-in-Button'}
                onClick={() => this.onSignInSubmit()}>同意してSMSを送る</Button>
              </div>
            </div>
          )
        }else{
          return (
            <div>
              <div>
                <p>SMSで届いた6桁の確認コードを入力してください</p>
                  <TextField
                    className={'code'}
                    id={'code'}
                    name="code"
                    label="000xxx"
                    required={true}
                    value={this.state.code}
                    onChange={e => this.setState({code:e.target.value})}
                    margin="normal"
                    />
              </div>
              <div>
                <Button style={btnstyle} onClick={() => this.confirmCode()}>確認コードを送信</Button>
              </div>
            </div>
          )
        }})()}
      </div>
    )
  }

}

export default Login
