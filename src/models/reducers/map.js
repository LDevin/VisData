import {_Map} from '../cache';

export function map(state=_Map, action) {
    switch(action.type) {
        case 'CH_HEXS': 
        return {...state, hexs: action.payload}
        default:
        return state;
    }
}