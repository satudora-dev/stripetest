import React from 'react'
import JsBarcode from 'jsbarcode';

class Point extends React.Component {
  componentDidMount(){
    if(this.props.cuid){
      this.props.generateOTBarcode(this.props.cuid, this.props.prime);
      window.setTimeout(() => document.getElementById("barcode").remove(), 30*60*1000);
    }
  }
  render(){
    return(
    <div>
      <svg id="barcode"></svg>
      <p>This barcode will be invalid after 30 minites</p>
      <button onClick={() => this.props.upgradePrime(this.props.cuid)}>Be Prime</button>
      <button onClick={() => this.props.createCharge(this.props.cuid,2000)}>Pay 2000$</button>
    </div>
    )
  }

}

export default Point
