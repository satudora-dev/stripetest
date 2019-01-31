import React from 'react'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  constructor(props){
    super(props);
    this.state={
      pending: false,
      complete: false
    }
  }
  componentDidMount(){
    if(this.props.cuid){
      this.props.fetchUserSources(this.props.cuid);
      this.props.fetchUserCharges(this.props.cuid);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.cuid !== prevProps.cuid && this.props.cuid) {
      this.props.fetchUserSources(this.props.cuid);
      this.props.fetchUserCharges(this.props.cuid);
    }
    if(this.props.charges !== prevProps.charges && this.state.pending){
      this.setState({pending:false, complete:true});
    }
  }
  render(){
    if(!this.props.sources[0]){
      return <p>送金をするにはカードを登録してください</p>;
    }else if(this.state.pending){
      return <CircularProgress />;
    }else if(this.state.complete){
      return <p>送金が完了しました</p>;
    }
    return(
    <div>
      <Button disable={this.props.sources === []} style={!this.props.sources ? disablestyle:btnstyle} onClick={
        () => {
          this.props.createCharge(this.props.cuid,2000, "Thanks!! Satudora!");
          this.setState({pending:true})
        }
      }>サツドラに2000円送金する</Button>
    </div>
    )
  }
}

export default Send
