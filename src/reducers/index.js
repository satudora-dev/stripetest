import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import auth from './auth'
import sources from './sources'
import charges from './charges'
import barcode from './barcode'
import token from './token'
import smsreCAPTCHA from './smsreCAPTCHA'
export default combineReducers({
  todos,
  visibilityFilter,
  auth,
  sources,
  charges,
  barcode,
  token,
  smsreCAPTCHA
})
