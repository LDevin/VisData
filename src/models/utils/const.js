const CONST = {
    HOST: '',
    API: {
        TEST_POST: '/api/v1/test/post',
        LOGIN: '/oauth/token',
        GET_TOKEN: '/oauth/token',
        FETCH_DANGERS: '/api/v1/dangers',
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
    },
    DEBUG: true,
    ACTION: {
        CH_HEXS:'CH_HEXS'
    }
}

export default CONST;