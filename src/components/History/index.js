import React from 'react';
import Button from '@material-ui/core/Button';

class History extends React.Component {
  componentDidMount(){
    if(this.props.cuid){
      this.props.fetchUserCharges(this.props.cuid);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.cuid !== prevProps.cuid && this.props.cuid) {
      this.props.fetchUserCharges(this.props.cuid);
    }
  }
  render(){
    const charges = this.props.charges || [];
    return(
    <div>
      {charges.map((charge, i) => {
        if(!charge.refunded){
          return (
            <div>
              <p>{"Created at:"+charge.created +
              "    Amount:" + charge.amount + "¥"+
              "    Description:" + charge.description
              }</p>
              <Button key={i} variant="contained" onClick={() => this.props.createRefund(this.props.cuid, charge.id)} >
                Refund
              </Button>
            </div>
          );
        }
        else {
          return (
            <div>
            <p style={{color: "red"}}>Refunded</p>
              <p>{"Created at:"+charge.created +
              "    RefundedAmount:" + charge.amount_refunded + "¥"+
              "    Description:" + charge.description
              }</p>
            </div>
          );
        }
      })}
    </div>
    )
  }

}

export default History
