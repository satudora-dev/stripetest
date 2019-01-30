import { connect } from 'react-redux';
import MyPage from '../../components/MyPage';
import { generateOTBarcode, eraseBarcode } from '../../actions/barcode'
import { upgradePrime, deletePrime } from '../../actions/auth'
import { createCharge } from '../../actions/charges'
import { fetchUserSources } from '../../actions/sources';
const mapStateToProps = state => ({
  cuid: state.auth.cuid,
  prime: state.auth.prime,
  generated: state.barcode,
  sources: state.sources
})

const mapDispatchToProps = dispatch => ({
  generateOTBarcode: (cuid,prime, generated) => dispatch(generateOTBarcode(cuid,prime, generated)),
  eraseBarcode: () => dispatch(eraseBarcode()),
  upgradePrime: (cuid) => dispatch(upgradePrime(cuid)),
  deletePrime: (cuid, pid) => dispatch(deletePrime(cuid,pid)),
  fetchUserSources: (cuid) => dispatch(fetchUserSources(cuid))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage)
