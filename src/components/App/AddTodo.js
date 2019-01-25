import React from 'react';
import Button from '@material-ui/core/Button';

const AddTodo = ({addTodo}) => {
  let input;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input) {
            return
          }
          addTodo(input);
          input = '';
        }}
      >
        <input onChange={e => {input = e.target.value}} />
        <Button type="submit">Add Todo</Button>
      </form>
    </div>
  )
}

export default AddTodo
