import {firebaseAuth, fireStore} from '../firebase';
const stripeCustomerRef=fireStore.collection('stripe_customers');

export const signOut = () => dispatch => {
  firebaseAuth().signOut()
    .catch(error => dispatch({
      type: 'SIGNOUT_ERROR',
      message: error.message,
    }));
}

export const upgradePrime = (cuid) => dispatch => {
  stripeCustomerRef.doc(cuid).collection("prime").add({status:"pending"});
}

export const deletePrime = (cuid, prime) => dispatch => {
  stripeCustomerRef.doc(cuid).collection("prime").where("id", "==", prime.id).get().then( (querySnapshot) => {
      querySnapshot.forEach((primeDoc) => {
        stripeCustomerRef.doc(cuid).collection("prime").doc(primeDoc.id).delete();
      })
    })
};

const setCurrentUser = (currentUserID,primeID)  => {
  return {
    type: 'SET_CURRENT_USER',
    currentUserID: currentUserID,
    prime: primeID
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
      })
    }else{
      dispatch(setCurrentUser(null));
    }
  })
}
