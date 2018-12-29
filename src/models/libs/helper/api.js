import UTIL from 'utils';
import _CONST from 'consts';

const POST_TYPE = _CONST.BODY_TYPE.JSON;//post 为'application/json'格式
const IS_AUTH = false; //是否开启auth

function parseJson(res) {
    return res.json();
};

function checkStatus(res) {
    if (res.status >= 200 && res.status < 500) {
        return res;
    }
    const error = new Error(res.statusText);
    error.response = res;
    throw error;
}

/**
 * @param data {} json format 
 * 
 * @returns promise object
 **/
function login(data) {
     return post(_CONST.API.LOGIN, data, _CONST.POST_TYPE.URLENCODED)
     .then(res => {

         if (res.code === _CONST.ERROR.SUCCESS) {
            UTIL.setToken(res.data.token.access_token);
         } 
         return Promise.resolve({code: res.code, msg: res.msg})
     })
}

function request(options={}) {
    let {data, method, url, post_type = _CONST.POST_TYPE.JSON} = options;

    options = {...options};
    options.mode = 'cors';
    delete options.url;

    if (data) {
        delete options.data;

        if (post_type == _CONST.POST_TYPE.JSON) {
            options.body = JSON.stringify(data);
        } else {
            let dataUrl = '';
            for (let [k, v] of Object.entries(data)) {
                dataUrl += k + '=' + v + '&';
            }
            dataUrl = dataUrl.substr(0, dataUrl.length - 1);
            options.body = dataUrl;
        }  
    }
    
    options.headers = {};

    if (IS_AUTH) {
        options.headers[_CONST.KEY.ACCESS_TOKEN] = UTIL.getToken();
    }
    if (method && method.toLowerCase() == 'post') {
        options.headers['Content-Type'] = post_type == _CONST.POST_TYPE.JSON ?
        _CONST.BODY_TYPE.JSON : _CONST.BODY_TYPE.URLENCODED;
    }
    console.log('options ',options)
    return fetch(_CONST.HOST + url, options)
    .then(checkStatus)
    .then(parseJson)
    .catch(err=>({err}));
}

function get(url) {
    return request({
        method: 'GET',
        mode: 'cors',
        url: url,
    })
}

/**
 * @param url
 * @param data
 * @param post_type , 1: json, 2: urlencoded
 * 
 * @returns promise object
 * **/
function post(url, data, post_type = _CONST.POST_TYPE.JSON) {
    let options = {
        method: 'post',
        mode: 'cros',
        url,
        post_type,
        data, 
    }
    return request(options);
}

export {request, get, post, login}