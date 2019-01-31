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




class Header extends React.Component {
  componentDidMount(){
    this.props.fetchCurrentUser();
  }
  checkPath(cPath, target){
    return cPath === target;
  }
  render(){
    if (this.props.cuid){
      return (
        <div>
          <p>Satudora Prime<Button style={btnstyle} onClick={() => {
            this.props.signOut();
            this.props.history.push(`/`);
          }}>signOut</Button></p>
          <Button
            style={this.checkPath(this.props.match.params.cPath,undefined) ? disablestyle:btnstyle}
            disable={this.checkPath(this.props.match.params.cPath,undefined)}
            onClick={() => this.props.history.push(`/mypage/`)}>
            Member
          </Button>
          <Button
            style={this.checkPath(this.props.match.params.cPath,"card") ? disablestyle:btnstyle}
            disable={this.checkPath(this.props.match.params.cPath,"card")}
            onClick={() => this.props.history.push(`/mypage/card`)}>
            Card
          </Button>
          <Button
            style={this.checkPath(this.props.match.params.cPath,"send") ? disablestyle:btnstyle}
            disable={this.checkPath(this.props.match.params.cPath,"send")}
            onClick={() => this.props.history.push(`/mypage/send`)}>
            Send
          </Button>
          <Button
            style={this.checkPath(this.props.match.params.cPath,"history") ? disablestyle:btnstyle}
            disable={this.checkPath(this.props.match.params.cPath,"history")}
            onClick={() => this.props.history.push(`/mypage/history`)}>
            History
          </Button>
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
}


export default Header
