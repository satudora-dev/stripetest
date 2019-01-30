import React from 'react';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  componentDidMount(){
    if(this.props.cuid){
      this.props.generateOTBarcode(this.props.cuid, this.props.prime, this.props.generated);
      window.setTimeout(() => {
        this.props.eraseBarcode();
      }, 30*60*1000)
    }
  }
  render(){
    if (this.props.cuid){
      return (
        <div>
          <p>Satudora Prime<Button onClick={() => this.props.signOut()}>signOut</Button></p>
          <Button onClick={() => this.props.history.push(`/mypage/${this.props.cuid}`)}>Member</Button>
          <Button onClick={() => this.props.history.push(`/mypage/${this.props.cuid}/card`)}>Card</Button>
          <Button onClick={() => this.props.history.push(`/mypage/${this.props.cuid}/send`)}>Send</Button>
          <Button onClick={() => this.props.history.push(`/mypage/${this.props.cuid}/history`)}>History</Button>
        </div>
      )
    }else{
      return (
        <div>
          <Button onClick={() => this.props.history.push("/login")}>ユーザー登録</Button>
        </div>
      )
    }
  }
}

export default App;
