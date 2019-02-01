import { connect } from 'react-redux';
import Login from 'components/Login';
import { fetchUserCharges, createRefund } from 'actions/charges'
import {setRecaptchaVerifier, smsSignIn, confirmCode} from 'actions/smsreCAPTCHA'
const mapStateToProps = state => ({
  cuid: state.auth.cuid,
  charges: state.charges,
  recaptchaVerifier: state.smsreCAPTCHA.recaptchaVerifier,
  confirmationResult: state.smsreCAPTCHA.confirmationResult
})

const mapDispatchToProps = dispatch => ({
  fetchUserCharges: (cuid) => dispatch(fetchUserCharges(cuid)),
  createRefund: (cuid, chargeId) => dispatch(createRefund(cuid, chargeId)),
  setRecaptchaVerifier: () => dispatch(setRecaptchaVerifier()),
  smsSignIn: (recaptchaVerifier,phoneNumber) =>  dispatch(smsSignIn(recaptchaVerifier,phoneNumber)),
  confirmCode: (confirmationResult, code) =>  dispatch(confirmCode(confirmationResult, code))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
