import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Validator from './Validator';
import { inspectElement } from '../actions';

const mapStateToProps = ({ state }) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  inspectElement: bindActionCreators(inspectElement, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Validator);
