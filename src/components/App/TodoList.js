import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos , toggleTodo, buyTodo }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id, todo.completed)} buyTodo={() => buyTodo()}/>
    ))}
  </ul>
)


export default TodoList
