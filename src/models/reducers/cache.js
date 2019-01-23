import {_Cache} from '../cache';

export function cache(state=_Cache, action) {
    switch(action.type) {
        case 'CH_DEV_RES':
        return {...state, devRes: {...action.payload}};
        case 'CH_DEV_RUN_STATUS':
        return {...state, devRunStatus: {...action.payload}};
        case 'CH_DEV_ALARM_STATUS':
        return {...state, devAlarmStatus: {...action.payload}};
        case 'CH_NETCOMS_CHECKS':
        return {...state, netComs:{...action.payload}};
        case 'CH_DEV_NETS':
        return {...state, devNets:{...action.payload}};
        
        case 'CH_COMS_CHECKS':
        return {...state, ...action.payload}
        default:
        return state;
    }
}