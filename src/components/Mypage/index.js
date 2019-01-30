import React from 'react'
import JsBarcode from 'jsbarcode';
import Button from '@material-ui/core/Button';

class MyPage extends React.Component {
  componentDidMount(){
    if(this.props.cuid){
      this.props.generateOTBarcode(this.props.cuid, this.props.prime, this.props.generated);
      window.setTimeout(() => {
        this.props.eraseBarcode();
      }, 30*60*1000)
    }
  }
  render(){
    return(
    <div>
      <svg id="barcode"></svg>
      <p>This barcode will be invalid after 30 minites</p>
      <Button onClick={() => this.props.upgradePrime(this.props.cuid)}>Prime会員になる</Button>
    </div>
    )
  }
}

export default MyPage
