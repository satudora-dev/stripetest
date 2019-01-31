import {fireStore} from '../firebase';

const stripeCustomerRef=fireStore.collection('stripe_customers');

const addTokenSuccess = token => {
  return {
    type: 'ADD_TOKEN',
    token: token
  }
}

export const addToken = (uid, token) => dispatch => {
  if(!uid || !token){
    return;
  }
  stripeCustomerRef.doc(uid).collection('/tokens').add({token:token});
  dispatch(addTokenSuccess(token));
}
