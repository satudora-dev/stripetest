import { connect } from 'react-redux';
import { fetchCurrentUser, signOut } from '../../actions/auth';
import Header from '../../components/Header';

const mapStateToProps = state => ({
  cuid: state.auth.cuid
})

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  signOut: () => dispatch(signOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
