const smsreCAPTCHA = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECAPTCHA':
      return {recaptchaVerifier:action.recaptchaVerifier}
    case 'SET_CONFIRMATION':
      return {confirmationResult:action.confirmationResult}
    default:
      return state
  }
}

export default smsreCAPTCHA
