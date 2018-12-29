import * as Actions from 'actions';
import Store from 'store';
import {bindActionCreators} from 'redux';

const bindActions = bindActionCreators(Actions, Store.dispatch);
console.log('bindActions ',bindActions);

export default bindActions;