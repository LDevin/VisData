import {_Base} from '../cache';

export function base(state=_Base, action) {
    switch(action.type) {
        case 'CH_DAY':
        return {...state, day: action.payload};
        case 'CH_MONTH':
        return {...state, month: action.payload};
        case 'CH_LOADING':
        return {...state, loading: action.payload};

        default:
        return state;
    }
}