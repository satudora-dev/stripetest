import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {CardElement, injectStripe} from 'react-stripe-elements';
import CircularProgress from '@material-ui/core/CircularProgress';
const btnstyle = {
  marginRight: "10px",
  marginBottom: "10px",
  marginTop: "40px",
  backgroundColor: "#04B486",
  "color": "white",
  textTransform: "none",
}

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false, token: null};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    if (!token) return;
    await this.props.addToken(this.props.cuid, token.id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.sources !== prevProps.sources && this.props.cuid) {
      this.setState({complete: true});
    }
    if(this.props.token !== prevProps.token && this.props.cuid){
      this.setState({token: this.props.token});
    }
  }
  render() {
    if (this.state.complete) return <h1>登録完了しました</h1>;
    if(this.state.token) return <CircularProgress />
    return (
      <div className="checkout">
        <CardElement />
        <Button style={btnstyle} onClick={this.submit}>Send</Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
