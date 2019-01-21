import {firebaseAuth, fireStore} from '../firebase';
import JsBarcode from 'jsbarcode';
const stripeCustomerRef=fireStore.collection('stripe_customers');
const barcodeLogRef = fireStore.collection('barcode_log');

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

export const addTodo = text => dispatch => {
  todosRef.add({text:text, completed:false});
  return;
}

export const toggleTodo = (id, completed) => dispatch => {
  todosRef.doc(id).update({completed: !completed})
  return;
}

export const signOut = () => dispatch => {
  firebaseAuth().signOut()
    .catch(error => dispatch({
      type: 'SIGNOUT_ERROR',
      message: error.message,
    }));
}

const setCurrentUser = (currentUserID,prime)  => {
  return {
    type: 'SET_CURRENT_USER',
    currentUserID: currentUserID,
    prime: prime
  }
}

export const fetchCurrentUser = () => dispatch => {
  firebaseAuth().onAuthStateChanged(user=>{
    if(user){
      stripeCustomerRef.doc(user.uid).collection("prime").onSnapshot((snapshot) => {
        let prime;
        snapshot.docs.forEach((doc) => {
          prime=doc.data();
        })
        dispatch(setCurrentUser(user.uid,prime));
      }).catch(() => dispatch(setCurrentUser(user.uid,null)));
    }else{
      dispatch(setCurrentUser(null));
    }
  })
}

export const addToken = (uid, token) => dispatch => {
  if(!uid || !token){
    return;
  }
  stripeCustomerRef.doc(uid).collection('/tokens').add({token:token});
}


export const setVisibilityFilter = filter => dispatch =>{
  return dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter
  })
}

export const generateOTBarcode = (cuid,prime) => dispatch => {
  const gen_time = new Date().getTime();
  const status = prime  ?  "p" : "f" ;
  JsBarcode('#barcode', cuid + '-' + status + '-' + gen_time);
  barcodeLogRef.doc(cuid).set({gen_time:gen_time});
}

const fetchUserSourcesSuccess = sources => {
  return {
    type: 'FETCH_SOURCE',
    sources: sources
  }
}

export const fetchUserSources = cuid => dispatch => {
  stripeCustomerRef.doc(cuid).collection("sources").onSnapshot((snapshot) => {
    let sources=[];
    snapshot.docs.forEach((doc) => {
      sources.push(doc.data());
    })
    dispatch(fetchUserSourcesSuccess(sources));
  })
}

export const createCharge = (cuid,amount) => dispatch => {
  stripeCustomerRef.doc(cuid).collection("charges").add({amount:amount});
}

export const upgradePrime = (cuid) => dispatch => {
  stripeCustomerRef.doc(cuid).collection("prime").add({status:"p"});
}
