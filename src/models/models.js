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
    return _Get(_CONST.API.FETCH_GRID_STREET, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_GRID_STREET success'):''
        let res = [], character = '';

        if (Array.isArray(result)) {
            result.forEach( item => {
                let cor = item.coordinates.split(':')
                res.push({coordinates: [Number(cor[0]), Number(cor[1]),Number(cor[2])], name: item.name, id: item.id})
                character += item.name;
            }) 
        }
        let action = bindActions.changeMap({type: _CONST.ACTION.CH_TEXTS, payload: res});
        let action2 = bindActions.changeMap({type: _CONST.ACTION.CH_CHARACTER, payload: [...new Set(character)].join('')});

        dispatch(action) 
        dispatch(action2) 
        //console.log('store ', Store.getState().map)
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

export const fetchDevices = () => {
    return _Get(_CONST.API.FETCH_DEVICES, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_DEVICES success'):''
        let res = [];
        if (Array.isArray(result)) {
            result.forEach( item => {
                let cor = item.coordinates.split(':')
                res.push({coordinates: [Number(cor[0]), Number(cor[1])]})
            }) 
        }
        let action = bindActions.changeMap({type: _CONST.ACTION.CH_GRIDS, payload: res});
        dispatch(action)
        console.log('store ', Store.getState().map)
    })
}

/**
 * @brief 设备应答情况统计分析
 * @param type: 1：近七天，2：详细的日期，如2018-10-02
 * @param date: 2018-10-02, type 为1时填入 ''
 **/
export const fetchDevResponse = (type, date='') => {
    let url = _CONST.API.FETCH_DEV_RES + `?type=${type}` + (type === 2 ? `&date=${date}` : '');
    return _Get(url, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_DEV_RES success'):''
        let initDevResObj = {...Store.getState().cache.devRes, data: []}
        if (Array.isArray(result)) {
            result.forEach( item => {
                initDevResObj.data = [{ "name": '应答数',"count": item.response},{ "name": '未应答数',"count": item.nonresponse}],
                initDevResObj.loading = false;
            }) 
        }
        let action = bindActions.changeCache({type: _CONST.ACTION.CH_DEV_RES, payload: initDevResObj});
        dispatch(action)
    })
}

export const fetchDevRunStatus = (type) => {
    let url = _CONST.API.FETCH_DEV_RUN_STATUS + `?type=${type}`;
    return _Get(url, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_DEV_RUN_STATUS success'):''
        let initdevRunStatusObj = {...Store.getState().cache.devRunStatus, data: []}
        if (Array.isArray(result)) {
            result.forEach( item => {
                initdevRunStatusObj.data = [{ "name": '在线率',"count": item.on},{ "name": '离线率',"count": item.off}],
                initdevRunStatusObj.loading = false;
            }) 
        }
        let action = bindActions.changeCache({type: _CONST.ACTION.CH_DEV_RUN_STATUS, payload: initdevRunStatusObj});
        dispatch(action)
    })
}

export const fetchDevAlarmStatus = (type) => {
    let url = _CONST.API.FETCH_DEV_ALARM_STATUS + `?type=${type}`;
    return _Get(url, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_DEV_ALARM_STATUS success'):''
        let initdevAlarmStatusObj = {...Store.getState().cache.devAlarmStatus, data: []}
        if (Array.isArray(result)) {
            result.forEach( item => {
                initdevAlarmStatusObj.data = [{ "name": '告警未处理',"count": item.notfixed},{ "name": '告警设备',"count": item.total}],
                initdevAlarmStatusObj.loading = false;
            }) 
        }
        let action = bindActions.changeCache({type: _CONST.ACTION.CH_DEV_ALARM_STATUS, payload: initdevAlarmStatusObj});
        dispatch(action)
    })
}


export const fetchNetComs = () => {
    let url = _CONST.API.FETCH_NET_COMS;
    return _Get(url, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_NET_COMS success'):''
        let initnetComsObj = {...Store.getState().cache.netComs, data: []}
        if (Array.isArray(result)) {
            let total = 0;
            result.forEach( item => {
                initnetComsObj.data.push(item);
                total += item.count;
            }) 
            initnetComsObj.loading = false;
            initnetComsObj.total = total;
        }
        let action = bindActions.changeCache({type: _CONST.ACTION.CH_NETCOMS_CHECKS, payload: initnetComsObj});
        dispatch(action)
    })
}

export const fetchDevNets = () => {
    let url = _CONST.API.FETCH_DEV_NETS;
    return _Get(url, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_DEV_NETS success'):''
        let initObj = {...result, loading: false, }
        let action = bindActions.changeCache({type: _CONST.ACTION.CH_DEV_NETS, payload: initObj});
        dispatch(action)
    })
}

/**
 * @brief 设备应答情况统计分析 详细信息 经纬度
 * @param type: 1：应答，2：未应答
 **/
export const fetchDevResDetails = (type) => {
    chgMapLoading(true);
    clearMapCache();

    return _Get(_CONST.API.FETCH_DEV_RES_DETAIL, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_DEV_RES_DETAIL success'):''
        let res = [], res2=[];
        if (Array.isArray(result)) {
            result.forEach( item => {
                let cor = item.coordinates.split(':')
                res.push({coordinates: [Number(cor[0]), Number(cor[1]),Number(cor[2])]})
                res2.push({coordinates: [Number(cor[0]), Number(cor[1])]})
            }) 
        }
        let action = bindActions.changeMap({type: _CONST.ACTION.CH_POINTCLOUD, payload: res});
        dispatch(action)
        let action2 = bindActions.changeMap({type: _CONST.ACTION.CH_HEXS, payload: res2});
        dispatch(action2)
        chgMapLoading(false)
    })
}

/**
 * @brief  经纬度
 * @param type: 1：火灾自动报警
 * @param deviceType:1在线率，2离线率
 **/
export const fetchDevRunDetails = (type, deviceType) => {
    chgMapLoading(true);
    clearMapCache();
    
    return _Get(_CONST.API.FETCH_DEV_RUN_DETAIL, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_DEV_RUN_DETAIL success'):''
        let res = []
        if (Array.isArray(result)) {
            result.forEach( item => {
                let cor = item.coordinates.split(':')
                res.push({coordinates: [Number(cor[0]), Number(cor[1])]})
            }) 
        }
        let action = bindActions.changeMap({type: _CONST.ACTION.CH_HEXS, payload: res});
        dispatch(action)
        chgMapLoading(false)
    })
}

/**
 * @brief  经纬度
 * @param type: 1：火灾自动报警
 * @param deviceType:1告警设备，2告警未处理
 **/
export const fetchDevAlarmDetails = (type, deviceType) => {
    chgMapLoading(true);
    clearMapCache();
    
    return _Get(_CONST.API.FETCH_DEV_ALARM_DETAIL, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_DEV_ALARM_DETAIL success'):''
        let res = []
        if (Array.isArray(result)) {
            result.forEach( item => {
                let cor = item.coordinates.split(':')
                res.push({icon: deviceType===1? 'monitor':'alarm', type: _CONST.ICON_TYPE.MONITOR, r: deviceType===1? 0x2f:0x33, 
                g:deviceType===1? 0x92: 0xfd, b:deviceType===1? 0xfa : 0xff,
                 coordinates: [Number(cor[0]), Number(cor[1]), Number(cor[2])]})
            }) 
        }
        let action = bindActions.changeMap({type: _CONST.ACTION.CH_ICONS, payload: res});
        dispatch(action)
        chgMapLoading(false)
    })
}

/**
 * @brief  经纬度
 * @param type: '一般单位'2,'三小单位'3,'高危单位'4,'重点单位'5
 **/
export const fetchNetComsDetails = (type) => {
    chgMapLoading(true);
    clearMapCache();
    
    return _Get(_CONST.API.FETCH_NET_COMS_DETAILS, (dispatch, result) => {
        _CONST.DEBUG ? console.log('FETCH_NET_COMS_DETAILS success'):''
        let res = [];
        let r = type === 2? 0x2f : (type === 3?0xfe:(type===4?0x00:0xFF))
        let g = type === 2? 0x92 : (type === 3?0xc4:(type===4?0xfe:0x3c))
        let b = type === 2? 0xfa : (type === 3?0x01:(type===4?0x8f:0x7c))

        if (Array.isArray(result)) {
            result.forEach( item => {
                let cor = item.coordinates.split(':')
                res.push({icon: 'normal', type: _CONST.ICON_TYPE.NORMAL, r:r, g:g, b:b,
                 coordinates: [Number(cor[0]), Number(cor[1]), Number(cor[2])]})
            }) 
        }
        let action = bindActions.changeMap({type: _CONST.ACTION.CH_ICONS, payload: res});
        dispatch(action)
        chgMapLoading(false)
    })
}

export const chgMenu = (menuNum) => {
    const state = Store.getState();
    
    switch(menuNum) {
        case 0: {
            const fetchDevRes = fetchDevResponse(state.cache.devRes.datetype, state.cache.devRes.date)
            const fetchDevRun = fetchDevRunStatus(state.com.systemType)
            const fetchDevAlarm = fetchDevAlarmStatus(state.com.systemType)
            const fetchNetCom = fetchNetComs()
            const fetchDevNet = fetchDevNets();
            const fetchStreet = fetchStreetLabel();

            Store.dispatch(fetchStreet)
            Store.dispatch(fetchDevRes)
            Store.dispatch(fetchDevRun)
            Store.dispatch(fetchDevAlarm)
            Store.dispatch(fetchNetCom)
            Store.dispatch(fetchDevNet)
        } break;

        case 1: {
            
        } break;
    }
}

const chgMapLoading = (flag) => {
   let action = bindActions.changeBase({type: 'CH_LOADING', payload: flag})
   Store.dispatch(action)
}

const clearMapCache = () => {
    let map = {
        hexs:null,
        grids:null,
        icons:null,
        pointClouds:null
    };
    let action = bindActions.changeMap({type: 'CH_MAP', payload: map})
    Store.dispatch(action)
}