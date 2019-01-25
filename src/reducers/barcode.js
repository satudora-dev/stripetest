const barcode = (state = null, action) => {
  switch (action.type) {
    case 'GENERATE_BARCODE':
      return action.barcode
    case 'ERASE_BARCODE':
      return action.barcode
    default:
      return state
  }
}

export default barcode
