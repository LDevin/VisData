import {_Com} from '../cache';

export function com(state=_Com, action) {
    switch(action.type) {
        case 'CH_MENU':
        return {...state, menuNum: action.payload};
        case 'CH_COM_SYSTYPE':
        return {...state, systemType: action.payload};
        default:
        return state;
    }
}