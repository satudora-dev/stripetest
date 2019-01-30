import React from 'react'
import Button from '@material-ui/core/Button';

const btnstyle = {
  marginRight: "10px",
  marginBottom: "10px",
  backgroundColor: "purple",
  "color": "white",
  textTransform: "none",
}

const disablestyle = {
  backgroundColor: "grey",
  "color": "white",
}

class Send extends React.Component {
  componentDidMount(){
    if(this.props.cuid)this.props.fetchUserSources(this.props.cuid);
  }
  render(){
    return(
    <div>
      <Button disable={!this.props.sources} style={!this.props.sources ? disablestyle:btnstyle} onClick={() => this.props.createCharge(this.props.cuid,2000, "Thanks!! Satudora!")}>サツドラに２０００円寄付する</Button>
    </div>
    )
  }
}

export default Send
