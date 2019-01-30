import React from 'react';
import Button from '@material-ui/core/Button';

const responsiveHeader = (cuid,history,signOut) => {
  if (cuid){
    return (
      <div>
        <p>Satudora Prime<Button onClick={() => signOut()}>signOut</Button></p>
        <Button onClick={() => history.push(`/mypage/${cuid}`)}>Member</Button>
        <Button onClick={() => history.push(`/mypage/${cuid}/card`)}>Card</Button>
        <Button onClick={() => history.push(`/mypage/${cuid}/send`)}>Send</Button>
        <Button onClick={() => history.push(`/mypage/${cuid}/history`)}>History</Button>
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
    return responsiveHeader(this.props.cuid, this.props.history, this.props.signOut)
  }
}


export default Header
