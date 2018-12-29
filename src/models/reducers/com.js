import {_Com} from '../cache';

export function com(state=_Com, action) {
    switch(action.type) {
        case 'CH_ALL':
        return {...state, ...action.payload};

        default:
        return state;
    }
}