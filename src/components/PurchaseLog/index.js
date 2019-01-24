import React from 'react'

class PurchaseLog extends React.Component {
  componentDidMount(){
    if(this.props.cuid){
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
              <button key={i} variant="contained" onClick={() => this.props.createRefund(this.props.cuid, charge.id)} >
                Refund
              </button>
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

export default PurchaseLog
