import { connect } from 'react-redux';
import Point from '../../components/Point';
import { generateOTBarcode, eraseBarcode } from '../../actions/barcode'
import { upgradePrime } from '../../actions/auth'
import { createCharge } from '../../actions/charges'
const mapStateToProps = state => ({
  cuid: state.auth.cuid,
  prime: state.auth.prime,
  generated: state.barcode
})

const mapDispatchToProps = dispatch => ({
  generateOTBarcode: (cuid,prime, generated) => dispatch(generateOTBarcode(cuid,prime, generated)),
  eraseBarcode: () => dispatch(eraseBarcode()),
  createCharge: (cuid,amount, description) => dispatch(createCharge(cuid,amount, description)),
  upgradePrime: (cuid) => dispatch(upgradePrime(cuid))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Point)
