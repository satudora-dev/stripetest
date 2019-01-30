import React from 'react';
import CheckoutForm from '../../containers/Card/CheckoutForm';
import Button from '@material-ui/core/Button';
import {Elements, StripeProvider} from 'react-stripe-elements';

const btnstyle = {
  marginRight: "10px",
  marginBottom: "10px",
  backgroundColor: "purple",
  "color": "white",
  textTransform: "none",
}

class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {register: false};
  }
  componentDidMount(){
    if(this.props.cuid)this.props.fetchUserSources(this.props.cuid);
  }
  componentDidUpdate(prevProps) {
    if (this.props.cuid !== prevProps.cuid && this.props.cuid) {
      this.props.fetchUserSources(this.props.cuid);
    }
  }
  render(){
    if(this.state.register) return (
      <div>
      <StripeProvider apiKey="pk_test_PxKNDGSHcqzbtnBgOuecPwU3">
        <div className="example">
          <h3>カードを登録する</h3>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
      </div>
    )
    const cards = this.props.sources || [];
    return (

      <div>
        {cards.map((card, i) => {
              return (
                <div>
                  <p>{card.brand + "    下4桁" + card.last4}</p>
                </div>
              );
            })}
        <Button style={btnstyle} onClick={() => this.setState({register: true})}>新しいカードを登録する</Button>
      </div>
    )
  }
}
export default Card
