import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos , toggleTodo, buyTodo }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} buyTodo={() => buyTodo()}/>
    ))}
  </ul>
)


export default TodoList
