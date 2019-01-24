import { fireStore} from '../firebase';

const stripeCustomerRef=fireStore.collection('stripe_customers');

const fetchUserChargesSuccess = charges => {
  return {
    type: 'FETCH_CHARGE',
    charges: charges
  }
}

export const fetchUserCharges = (cuid) => dispatch => {
  stripeCustomerRef.doc(cuid).collection("charges").onSnapshot((snapshot) => {
    let charges=[];
    snapshot.docs.forEach((doc) => {
      const charge = doc.data();
      charges.push(charge);
    })
    dispatch(fetchUserChargesSuccess(charges));
  })
}

export const addToken = (uid, token) => dispatch => {
  if(!uid || !token){
    return;
  }
  stripeCustomerRef.doc(uid).collection('/tokens').add({token:token});
}

export const createCharge = (cuid, amount, description) => dispatch => {
  stripeCustomerRef.doc(cuid).collection("charges").add({amount:amount, description: description});
}


export const createRefund = (cuid, chargeId) => dispatch => {
  stripeCustomerRef.doc(cuid).collection("refunds").add({chargeId:chargeId});
}
