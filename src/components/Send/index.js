import React from 'react'
import Button from '@material-ui/core/Button';

const btnstyle = {
  marginRight: "10px",
  marginBottom: "10px",
  backgroundColor: "#04B486",
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
  componentDidUpdate(prevProps) {
    if (this.props.cuid !== prevProps.cuid && this.props.cuid) {
      this.props.fetchUserSources(this.props.cuid);
    }
  }
  render(){
    if(!this.props.sources[0]){
      return <p>送金をするにはカードを登録してください</p>
    }
    return(
    <div>
      <Button disable={this.props.sources === []} style={!this.props.sources ? disablestyle:btnstyle} onClick={() => this.props.createCharge(this.props.cuid,2000, "Thanks!! Satudora!")}>サツドラに2000円送金する</Button>
    </div>
    )
  }
}

export default Send
