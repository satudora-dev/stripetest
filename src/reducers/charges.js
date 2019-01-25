const charges = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CHARGE':
      return action.charges
    default:
      return state
  }
}

export default charges
