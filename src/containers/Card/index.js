import { connect } from 'react-redux';
import { fetchUserSources } from '../../actions';
import Card from '../../components/Card';

const mapStateToProps = state => ({
  cuid: state.auth.cuid,
  sources: state.sources
})

const mapDispatchToProps = dispatch => ({
  fetchUserSources: (cuid) => dispatch(fetchUserSources(cuid))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card)
