import React from 'react'
import JsBarcode from 'jsbarcode';
import Button from '@material-ui/core/Button';

const btnstyle = {
  marginRight: "10px",
  marginBottom: "10px",
  backgroundColor: "#04B486",
  "color": "white",
  textTransform: "none",
}

const ymlstyle = {
  marginRight: "10px",
  marginBottom: "10px",
  backgroundColor: "purple",
  "color": "white",
  textTransform: "none",
}

const disablestyle = {
  marginRight: "10px",
  marginBottom: "10px",
  backgroundColor: "grey",
  "color": "white",
}

class MyPage extends React.Component {
  componentDidMount(){
    if(this.props.cuid){
      this.props.fetchUserSources(this.props.cuid);
      this.props.generateOTBarcode(this.props.cuid, this.props.prime, this.props.generated);
      window.setTimeout(() => {
        this.props.eraseBarcode();
      }, 30*60*1000)
    }
    // this.props.generateOTBarcode(this.props.cuid, this.props.prime, this.props.generated);
  }
  componentDidUpdate(prevProps) {
    if (this.props.cuid !== prevProps.cuid && this.props.cuid) {
      this.props.fetchUserSources(this.props.cuid);
    }
    if(this.props.prime !== prevProps.prime && this.props.cuid){
      this.props.generateOTBarcode(this.props.cuid, this.props.prime);
      window.setTimeout(() => {
        this.props.eraseBarcode();
      }, 30*60*1000)
    }
  }

  render(){
    if(!this.props.prime){
      return(
        <div>
          <svg id="barcode"></svg>
          <p>このバーコードは生成から30分で失効します</p>
          <Button style={this.props.prime ? disablestyle:btnstyle} onClick={() => this.props.upgradePrime(this.props.cuid)}>Prime会員になる</Button>
        </div>
      )
    }else{
      return(
        <div>
          <svg id="barcode"></svg>
          <p>このバーコードは生成から30分で失効します</p>
          <Button style={!this.props.prime ? disablestyle:ymlstyle} onClick={() => this.props.deletePrime(this.props.cuid, this.props.prime)}>Prime会員をやめる</Button>
        </div>
      )
    }

  }
}

export default MyPage
