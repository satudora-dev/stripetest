import {firebaseAuth} from '../firebase';


export const smsSignIn = (recaptchaVerifier,phoneNumber) => dispatch => {
  firebaseAuth().signInWithPhoneNumber('+81' + phoneNumber.slice(1), recaptchaVerifier)
    .then( (confirmationResult) => {
      dispatch(setConfirmatoinResultSuccess(confirmationResult));
      }).catch(error => {
      console.log(error)
    })
}

const setRecaptchaVerifierSuccess = recaptchaVerifier => {
  return {
    type: 'SET_RECAPTCHA',
    recaptchaVerifier: recaptchaVerifier
  }
}

export const setRecaptchaVerifier = () => dispatch => {
  const recaptchaVerifier = new firebaseAuth.RecaptchaVerifier('sign-in-Button', {
    'size': 'invisible',
    'callback': (response)  => {
      smsSignIn();
    }
  })
  dispatch(setRecaptchaVerifierSuccess(recaptchaVerifier));
}

const setConfirmatoinResultSuccess = confirmationResult => {
  return {
    type: 'SET_CONFIRMATION',
    confirmationResult: confirmationResult
  }
}


export const confirmCode = (confirmationResult, code) => dispatch => {
  confirmationResult.confirm(code).then( (result) => {
    var user = result.user
  })
}
