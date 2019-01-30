import { connect } from 'react-redux';
import History from '../../components/History';
import { fetchUserCharges, createRefund } from '../../actions/charges'
const mapStateToProps = state => ({
  cuid: state.auth.cuid,
  charges: state.charges
})

const mapDispatchToProps = dispatch => ({
  fetchUserCharges: (cuid) => dispatch(fetchUserCharges(cuid)),
  createRefund: (cuid, chargeId) => dispatch(createRefund(cuid, chargeId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History)
