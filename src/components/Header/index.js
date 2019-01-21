import React from 'react';


const responsiveHeader = (cuid,history,signOut) => {
  if (cuid){
    return (
      <div>
        <button onClick={() => history.push("/")}>ToDo</button>
        <button onClick={() => history.push(`/mypage/${cuid}`)}>MyPage</button>
        <button onClick={() => signOut()}>signOut</button>
      </div>
    )
  }else{
    return (
      <div>
        <button onClick={() => history.push("/")}>ToDo</button>
        <button onClick={() => history.push("/login")}>Login</button>
        <button onClick={() => history.push("/signup")}>SignUp</button>
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
