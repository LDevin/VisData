const CONST = {
    HOST: '',
    API: {
        LOGIN: '/oauth/token',
        GET_TOKEN: '/oauth/token',
    },
    KEY: {
        ACCESS_TOKEN: 'Authorization',
    },
    BODY_TYPE: {
        JSON: 'application/json;charset=UTF-8',
        URLENCODED: 'application/x-www-form-urlencoded'
    },

    POST_TYPE: {
        JSON: 1,
        URLENCODED: 2,
    },

    ERROR: {
        SUCCESS: 200,
    }

}

export default CONST;