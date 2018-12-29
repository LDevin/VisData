import _CONST from './const';

export default class UTIL {
    static set(key, val) {
        localStorage.setItem(key, val);
    }
    static get(key) {
        return localStorage.getItem(key);
    };
    static remove(key) {
        return localStorage.removeItem(key);
    };
    static getToken() {
        return this.get(_CONST.KEY.ACCESS_TOKEN);
    };
    static setToken(token) {
        this.set(_CONST.KEY.ACCESS_TOKEN, token);
    };
    static go(url) {
        window.location.href = url;
    };
    static isGuest() {
        return !(this.getToken());
    }
}