import {combineReducers} from 'redux';
import {user} from './user';
import {base} from './base';
import {com} from './com';
import {map} from './map';


export default combineReducers({
    user,
    base,
    com, 
    map,
})