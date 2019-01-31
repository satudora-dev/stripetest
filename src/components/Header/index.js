import React from 'react';
import Button from '@material-ui/core/Button';
const btnstyle = {
  marginRight: "10px",
  marginBottom: "10px",
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 40,
  width: 100,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
}

const disablestyle = {
  height: 40,
  width: 100,
  backgroundColor: "grey",
  "color": "white",
  borderRadius: 3,
  border: 0,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
}

const responsiveHeader = (cuid,history,signOut,match) => {
  if (cuid){
    return (
      <div>
        <p>Satudora Prime<Button style={btnstyle} onClick={() => {
          signOut();
          history.push(`/`)
        }}>signOut</Button></p>
        <Button style={!match.params.cPath ? disablestyle:btnstyle} disable={match.params.cPath == ""} onClick={() => history.push(`/mypage/`)}>Member</Button>
        <Button style={match.params.cPath == "card" ? disablestyle:btnstyle} disable={match.params.cPath == "card"} onClick={() => history.push(`/mypage/card`)}>Card</Button>
        <Button style={match.params.cPath == "send" ? disablestyle:btnstyle} disable={match.params.cPath == "send"} onClick={() => history.push(`/mypage/send`)}>Send</Button>
        <Button style={match.params.cPath == "history" ? disablestyle:btnstyle} disable={match.params.cPath == "history"} onClick={() => history.push(`/mypage/history`)}>History</Button>
      </div>
    )
  }else{
    return (
      <div>
      <p>Satudora Prime</p>
      </div>
    )
  }
}



class Header extends React.Component {
  componentDidMount(){
    this.props.fetchCurrentUser();
  }
  render(){
    return responsiveHeader(this.props.cuid, this.props.history, this.props.signOut,this.props.match)
  }
}


export default Header
