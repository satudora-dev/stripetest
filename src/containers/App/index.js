import { connect } from 'react-redux';
import { fetchCurrentUser, signOut } from 'actions/auth';
import App from 'components/App';

const mapStateToProps = state => ({
  cuid: state.auth.cuid
})

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
