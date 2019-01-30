import { connect } from 'react-redux';
import Send from '../../components/Send';
import { createCharge } from '../../actions/charges';
import { fetchUserSources } from '../../actions/sources';
const mapStateToProps = state => ({
  cuid: state.auth.cuid,
  sources: state.sources
})

const mapDispatchToProps = dispatch => ({
  createCharge: (cuid,amount, description) => dispatch(createCharge(cuid,amount, description)),
  fetchUserSources: (cuid) => dispatch(fetchUserSources(cuid))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Send)
