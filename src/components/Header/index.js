import React from 'react';
import Button from '@material-ui/core/Button';

const responsiveHeader = (cuid,history,signOut) => {
  if (cuid){
    return (
      <div>
        <Button onClick={() => history.push("/")}>ToDo</Button>
        <Button onClick={() => history.push(`/mypage/${cuid}`)}>MyPage</Button>
        <Button onClick={() => signOut()}>signOut</Button>
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
