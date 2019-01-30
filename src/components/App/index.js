import React from 'react';
import Button from '@material-ui/core/Button';

const App = ({history}) => (
  <div>
    <Button onClick={() => history.push("/login")}>ユーザー登録</Button>
  </div>
)

export default App;
