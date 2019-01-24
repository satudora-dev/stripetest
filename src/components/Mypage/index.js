import React from 'react';



class Mypage extends React.Component {

  render(){
    const cuid = this.props.match.params.cuid;
    return (
      <div>
        <button onClick={() => this.props.history.push(`/mypage/${cuid}/point`)}>Point</button>
        <button onClick={() => this.props.history.push(`/mypage/${cuid}/purchaselog`)}>Purchase Log</button>
        <button onClick={() => this.props.history.push(`/mypage/${cuid}/card`)}>Manage Card</button>
      </div>
    )
  }
}


export default Mypage
