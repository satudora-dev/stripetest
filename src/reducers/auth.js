const auth = (state = [], action) => {
  switch (action.type) {
    case 'CONFIRM_CODE':
      return action.confirmationResult
    case 'SET_CURRENT_USER':
      return {cuid: action.currentUserID, prime:action.prime}
    default:
      return state
  }
}

export default auth
