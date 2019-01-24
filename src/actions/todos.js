import { fireStore} from '../firebase';

const todosRef=fireStore.collection('todos');

const fetchTodoSuccess = todos => {
  return {
    type: 'RECEIVE_TODO',
    todos: todos
  }
}

export const fetchTodos = () => dispatch => {
  todosRef.onSnapshot((snapshot) => {
    let todos=[];
    snapshot.docs.forEach((doc) => {
      const todo = doc.data();
      todos.push({
        id: doc.id,
        ...todo
      });
    })
    dispatch(fetchTodoSuccess(todos));
  })
}

export const addTodo = (text, cuid, amount) => dispatch => {
  todosRef.add({text:text, completed:false, purchased:false, amount:amount, createdBy:cuid});
  return;
}

export const toggleTodo = (id, completed) => dispatch => {
  todosRef.doc(id).update({completed: !completed})
  return;
}
