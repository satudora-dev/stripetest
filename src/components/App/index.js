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
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
}

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
      return this.props.history.push(`/mypage`);
    }else{
      return (
        <div>
          <Button style={btnstyle} onClick={() => this.props.history.push("/login")}>ユーザー登録</Button>
        </div>
      )
    }
  }
}

export default App;
