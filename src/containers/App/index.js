import { connect } from 'react-redux';
import { fetchTodos } from '../../actions/todos';
import App from '../../components/App';


const mapDispatchToProps = dispatch => ({
  fetchTodos: () => dispatch(fetchTodos())
})
export default connect(
  null,
  mapDispatchToProps
)(App)
