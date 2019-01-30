import { connect } from 'react-redux';
import Send from '../../components/Send';
import { createCharge } from '../../actions/charges'
const mapStateToProps = state => ({
  cuid: state.auth.cuid,
})

const mapDispatchToProps = dispatch => ({
  createCharge: (cuid,amount, description) => dispatch(createCharge(cuid,amount, description)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Send)
