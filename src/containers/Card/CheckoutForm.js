import { connect } from 'react-redux';
import { addToken } from '../../actions/charges';
import CheckoutForm from '../../components/Card/CheckoutForm';

const mapStateToProps = state => ({
  cuid: state.auth.cuid
})

const mapDispatchToProps = dispatch => ({
  addToken: (uid, token) => dispatch(addToken(uid, token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutForm)
