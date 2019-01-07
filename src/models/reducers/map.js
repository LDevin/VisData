import {_Map} from '../cache';

export function map(state=_Map, action) {
    switch(action.type) {
        case 'CH_HEXS': 
        return {...state, hexs: action.payload}
        case 'CH_TEXTS':
        return {...state, texts: action.payload}
        case 'CH_POINTCLOUD':
        return {...state, pointClouds: action.payload}
        case 'CH_ICONS':
        return {...state, icons: action.payload}
        case 'CH_GRIDS':
        return {...state, grids: action.payload}
        default:
        return state;
    }
}