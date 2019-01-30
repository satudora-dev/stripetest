import React from 'react'
import Button from '@material-ui/core/Button';

class Send extends React.Component {
  render(){
    return(
    <div>
      <Button onClick={() => this.props.createCharge(this.props.cuid,2000, "Thanks!! ASAKO!")}>Pay 2000¥ to ASAKO</Button>
    </div>
    )
  }
}

export default Send
