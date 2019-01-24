import React from 'react';
import Button from '@material-ui/core/Button';

const Todo = ({ onClick, completed, text, buyTodo }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
    <Button onClick={buyTodo}>BUY</Button>
  </li>
)

export default Todo
