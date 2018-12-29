import {_User} from '../cache';

export function user(state=_User, action) {
    switch(action.type) {
        case 'CH_NAME':
        return {...state, name: action.payload};
        
        case 'CH_PS':
        return {...state, ps: action.payload};

        default:
        return state;
    }
}