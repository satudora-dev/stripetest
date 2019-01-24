import React from 'react';
import CheckoutForm from '../../containers/Card/CheckoutForm';
import Button from '@material-ui/core/Button';
import {Elements, StripeProvider} from 'react-stripe-elements';

class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {register: false};
  }
  componentDidMount(){
    if(this.props.cuid)this.props.fetchUserSources(this.props.cuid);
  }
  render(){
    if(this.state.register) return (
      <div>
      <StripeProvider apiKey="pk_test_PxKNDGSHcqzbtnBgOuecPwU3">
        <div className="example">
          <h3>Register your card</h3>
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
                  <Button key={i} variant="contained" >
                    編集
                  </Button>
                </div>
              );
            })}
        <Button onClick={() => this.setState({register: true})}>Register new card</Button>
      </div>
    )
  }
}
export default Card