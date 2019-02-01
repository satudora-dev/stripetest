import { connect } from 'react-redux';
import { addToken } from 'actions/token';
import CheckoutForm from 'components/Card/CheckoutForm';

const mapStateToProps = state => ({
  cuid: state.auth.cuid,
  sources: state.sources,
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  addToken: (uid, token) => dispatch(addToken(uid, token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutForm)
