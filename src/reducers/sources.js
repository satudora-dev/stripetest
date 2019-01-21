const sources = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SOURCE':
      return action.sources
    default:
      return state
  }
}

export default sources
