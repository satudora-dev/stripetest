import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const refundstyle = {
  marginLeft: "20px",
  marginBottom: "10px",
  backgroundColor: "purple",
  "color": "white",
  textTransform: "none",
}

const historystyle = {
  marginBottom: "20px",
  marginTop: "20px",
}

const strstyle = {
  marginLeft: "30px",
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
  formatTime(unixTime){
    const date = new Date(unixTime*1000);
    const years = date.getFullYear();
    const month = "0" + date.getMonth() + 1;
    const day = "0" + date.getDate();
    const yymmdd = years + "-" + month.substr(-2) + "-" + day.substr(-2)
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const hhmm = hours + "時" + minutes.substr(-2) +"分"
    const formattedTime = yymmdd + "  " + hhmm;
    return formattedTime;
  }
  render(){
    const charges = this.props.charges;
    charges.sort((a,b) => {
        if( a.created < b.created ) return 1;
        if( a.created > b.created ) return -1;
        return 0;
    });
    if(charges[0]){
      return(
      <div>
        {charges.map((charge, i) => {
          if(!charge.refunded && charge.status === "succeeded"){
            return (
              <div style={historystyle}>
                  <span style={strstyle}>{this.formatTime(charge.created)}</span>
                  <span style={strstyle}>{charge.amount + "¥"}</span>
                  <span style={strstyle}>{"詳細:" + charge.description}</span>
                <Button key={i}
                  style={refundstyle}
                  variant="contained"
                  onClick={() => this.props.createRefund(this.props.cuid, charge.id)} >
                  返金
                </Button>
              </div>
            );
          }else if(charge.status === "pending"){
            return(
              <div style={historystyle}>
                <span style={strstyle}>{charge.amount + "¥"}</span>
                <span style={strstyle}>{"詳細:" + charge.description}</span>
                <CircularProgress />
              </div>
            )
          }
          else {
            return (
              <div style={historystyle}>
                <span style={strstyle}>{this.formatTime(charge.refunds.data[0].created)}</span>
                <span style={strstyle}>{charge.amount_refunded + "¥"}</span>
                <span style={strstyle}>{"詳細:" + charge.description}</span>
                <span style={Object.assign({color:"red"},strstyle)}>返金済み</span>
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
