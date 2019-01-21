import {firebaseAuth, fireStore} from '../firebase';
import JsBarcode from 'jsbarcode';
const stripeCustomerRef=fireStore.collection('stripe_customers');
const barcodeLogRef = fireStore.collection('barcode_log');

let nextTodoId = 0;
export const addTodo = text => dispatch => {
  return dispatch({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  })
}

export const toggleTodo = id => dispatch => {
  return dispatch({
    type: 'TOGGLE_TODO',
    id
  })
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
      // stripeCustomerRef.doc(user.uid).collection("prime").onSnapshot((snapshot) => {
      //   let prime=[];
      //   snapshot.docs.forEach((doc) => {
      //     prime.push(doc.data());
      //   })
        // dispatch(setCurrentUser(user.uid, prime));
      // });
      dispatch(setCurrentUser(user.uid))
    }else{
      dispatch(setCurrentUser(null));
    }
  })
}

export const addToken = (uid, token) => dispatch => {
  if(!uid || !token){
    console.log(uid, token);
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
  const status ="p" ;
  console.log(prime)
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
