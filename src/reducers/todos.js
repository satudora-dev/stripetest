const todos = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_TODO':
      console.log(action.todos)
      return action.todos
    default:
      return state
  }
}

export default todos
