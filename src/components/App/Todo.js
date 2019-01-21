import React from 'react'

const Todo = ({ onClick, completed, text, buyTodo }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
    <button onClick={buyTodo}>BUY</button>
  </li>
)

export default Todo
