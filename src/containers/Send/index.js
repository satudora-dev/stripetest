import { connect } from 'react-redux';
import Send from '../../components/Send';
import { fetchUserCharges,createCharge } from '../../actions/charges';
import { fetchUserSources } from '../../actions/sources';
const mapStateToProps = state => ({
  cuid: state.auth.cuid,
  sources: state.sources,
  charges: state.charges
})

const mapDispatchToProps = dispatch => ({
  createCharge: (cuid,amount,description) => dispatch(createCharge(cuid,amount, description)),
  fetchUserSources: (cuid) => dispatch(fetchUserSources(cuid)),
  fetchUserCharges: (cuid) => dispatch(fetchUserCharges(cuid)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Send)
