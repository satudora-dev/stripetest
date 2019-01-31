import React from 'react';
import Button from '@material-ui/core/Button';

const ymlstyle = {
  marginLeft: "20px",
  marginBottom: "10px",
  backgroundColor: "purple",
  "color": "white",
  textTransform: "none",
}

const format = (unixTime) => {
  const date = new Date(unixTime);
  const years = date.getFullYear();
  const month = "0" + date.getMonth() + 1;
  const day = "0" + date.getDate();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const formattedTime = years + "-" + month.substr(-2) + "-" + day.substr(-2) +"  " + hours + "時" + minutes.substr(-2) +"分";
  return formattedTime;
}

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
    const charges = this.props.charges;
    if(charges !== []){
      return(
      <div>
        {charges.map((charge, i) => {
          if(!charge.refunded){
            return (
              <div style={{marginBottom: "20px"}}>
                  <span style={{marginLeft: "20px",}}>{format(charge.created)}</span>
                  <span style={{marginLeft: "20px",}}>{charge.amount + "¥"}</span>
                  <span style={{marginLeft: "20px",}}>{"詳細:" + charge.description}</span>
                <Button key={i} style={ymlstyle}variant="contained" onClick={() => this.props.createRefund(this.props.cuid, charge.id)} >
                  返金
                </Button>
              </div>
            );
          }
          else {
            return (
              <div>
                <span style={{marginLeft: "20px",}}>{format(charge.refunds.data[0].created)}</span>
                <span style={{marginLeft: "20px",}}>{charge.amount_refunded + "¥"}</span>
                <span style={{marginLeft: "20px",}}>{"詳細:" + charge.description}</span>
                <span style={{color: "red",marginLeft: "20px",}}>返金済み</span>
              </div>
            );
          }
        })}
      </div>
      )
    } else {
      return <p>送金履歴はありません</p>
    }
  }

}

export default History
