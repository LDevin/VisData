import _CONST from 'consts';
import {request, post, get, login} from 'helper';
import UTIL from 'utils';
import bindActions from 'bindActions';
import Store from 'store';


/**
 * @brief The root entry of get funtion
 * @param url: string
 * @returns dispatch: Function
 **/
function _Get(url, callback) {
    return dispatch => {
        get(url).then(result => {
            _CONST.DEBUG ? console.log('_Get data ', result) : '';
             if (result.code == _CONST.ERROR.SUCCESS) {
                _CONST.DEBUG ? console.log('_Get data.code=',result.code):''
                callback(dispatch, result.data)
             }
         })
    }
}

/**
 * @param url: string
 * @param data: json formate {} or application/x-www-form-urlencoded
 * @param callback: Function
 * @param post_type: 1 OR 2
 * @returns dispatch: Function
 **/
function _Post(url, data, callback, post_type = _CONST.POST_TYPE.JSON) {
    return dispatch => {
        post(url, data, post_type).then(result => {
            _CONST.DEBUG ? console.log('_Post result ', result) : '';
             if (result.code == _CONST.ERROR.SUCCESS) {
                _CONST.DEBUG ? console.log('_Post result.code=',result.code):''
                callback(dispatch, result.data)
             }
         })
    }
}

/**
 * @brief 测试接口使用
 * @param data: {} json
 **/
export const testPost = (data='') => {
    return _Post(_CONST.API.TEST_POST, data, (dispatch, result) => {
        console.log(' 获取test data ', result)
    }, _CONST.POST_TYPE.URLENCODED)
}


export const fetchDangers = () => {
    return _Get(_CONST.API.FETCH_DANGERS, (dispatch, result) => {
        _CONST.DEBUG ? console.log('fetchDangers success'):''
        let res = [];
        if (Array.isArray(result)) {
            result.forEach( item => {
                let cor = item.coordinates.split(':')
                res.push({coordinates: [Number(cor[0]), Number(cor[1])]})
            }) 
        }
        let action = bindActions.changeMap({type: _CONST.ACTION.CH_HEXS, payload: res});
        dispatch(action)
        console.log('store ', Store.getState().map)
    })
}

export const fetchStreetLabel = () => {
    return _Get(_CONST.API.FETCH_STREETS, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_STREETS success'):''
        let res = [];
        if (Array.isArray(result)) {
            result.forEach( item => {
                let cor = item.coordinates.split(':')
                res.push({coordinates: [Number(cor[0]), Number(cor[1]),Number(cor[2])], name: item.name, id: item.id})
            }) 
        }
        let action = bindActions.changeMap({type: _CONST.ACTION.CH_TEXTS, payload: res});
        dispatch(action)
        console.log('store ', Store.getState().map)
    })
}

export const fetchChecks = () => {
    return _Get(_CONST.API.FETCH_CHECKS, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_CHECKS success'):''
        let res = [];
        if (Array.isArray(result)) {
            result.forEach( item => {
                let cor = item.coordinates.split(':')
                res.push({coordinates: [Number(cor[0]), Number(cor[1]),Number(cor[2])]})
            }) 
        }
        let action = bindActions.changeMap({type: _CONST.ACTION.CH_POINTCLOUD, payload: res});
        dispatch(action)
        console.log('store ', Store.getState().map)
    })
}

export const fetchUnits = () => {
    return _Get(_CONST.API.FETCH_UNITS, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_UNITS success'):''
        let res = [];
        if (Array.isArray(result)) {
            result.forEach( item => {
                let cor = item.coordinates.split(':')
                res.push({coordinates: [Number(cor[0]), Number(cor[1]),Number(cor[2])]})
            }) 
        }
        let action = bindActions.changeMap({type: _CONST.ACTION.CH_ICONS, payload: res});
        dispatch(action)
        console.log('store ', Store.getState().map)
    })
}

