import React from 'react';
import Button from '@material-ui/core/Button';


class Mypage extends React.Component {

  render(){
    const cuid = this.props.match.params.cuid;
    return (
      <div>
        <Button onClick={() => this.props.history.push(`/mypage/${cuid}/point`)}>Point</Button>
        <Button onClick={() => this.props.history.push(`/mypage/${cuid}/purchaselog`)}>Purchase Log</Button>
        <Button onClick={() => this.props.history.push(`/mypage/${cuid}/card`)}>Manage Card</Button>
      </div>
    )
  }
}


export default Mypage
