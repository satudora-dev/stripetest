import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
      phoneNumber : "",
      code : "",

    };
  }
  componentDidMount(){
    this.props.setRecaptchaVerifier();
  }
  componentDidUpdate(prevProps) {
    if (this.props.confirmationResult !== prevProps.confirmationResult) {
      this.setState({codeSent:true})
    }
  }
  render(){
    if(this.props.cuid) {
      this.props.history.push('/mypage');
      return null;
    }
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
                <Button style={btnstyle}
                id={'sign-in-Button'}
                onClick={() => this.props.smsSignIn(this.props.recaptchaVerifier, this.state.phoneNumber)}
                disable={this.state.codeSent}>同意してSMSを送る</Button>
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
                <Button
                  style={btnstyle}
                  onClick={() => this.props.confirmCode(this.props.confirmationResult, this.state.code)}
                  >確認する</Button>
              </div>
            </div>
          )
        }})()}
      </div>
    )
  }
}

export default Login
