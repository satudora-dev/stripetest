import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {CardElement, injectStripe} from 'react-stripe-elements';
const btnstyle = {
  marginRight: "10px",
  marginBottom: "10px",
  backgroundColor: "purple",
  "color": "white",
  textTransform: "none",
}

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    await this.props.addToken(this.props.cuid, token.id)
    this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Register Complete</h1>;

    return (
      <div className="checkout">
        <CardElement />
        <Button style={btnstyle}onClick={this.submit}>Send</Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
