import { connect } from 'react-redux';
import Point from '../../components/Point';
import { generateOTBarcode, createCharge, upgradePrime } from '../../actions'
const mapStateToProps = state => ({
  cuid: state.auth.cuid,
  prime: state.auth.prime
})

const mapDispatchToProps = dispatch => ({
  generateOTBarcode: (cuid,prime) => dispatch(generateOTBarcode(cuid,prime)),
  createCharge: (cuid,amount) => dispatch(createCharge(cuid,amount)),
  upgradePrime: (cuid) => dispatch(upgradePrime(cuid))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Point)
