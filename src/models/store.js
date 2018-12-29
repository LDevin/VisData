import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import Reducers from './reducers/index';

let store = createStore(Reducers, applyMiddleware(thunk));
console.log('init state ', store.getState());

export default store;