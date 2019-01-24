import {fireStore} from '../firebase';

const stripeCustomerRef=fireStore.collection('stripe_customers');

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
