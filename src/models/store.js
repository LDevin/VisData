import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import Reducers from './reducers/index';
import _CONST from 'consts';

let store = createStore(Reducers, applyMiddleware(thunk));
_CONST.DEBUG ? console.log('init state ', store.getState()) : '';

export default store;