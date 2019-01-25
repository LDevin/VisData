const CONST = {
    HOST: '',
    API: {
        TEST_POST: '/api/v1/test/post',
        LOGIN: '/oauth/token',
        GET_TOKEN: '/oauth/token',
        FETCH_DANGERS: '/api/v1/dangers',
        FETCH_STREETS: '/api/v1/streetlabel',
        FETCH_CHECKS: '/api/v1/checks',
        FETCH_UNITS: '/api/v1/units',
        FETCH_DEVICES: '/api/v1/devices',

        FETCH_GRID_STREET: '/api/v1/grid/street',

        FETCH_DEV_RES: '/api/v1/devices/response',
        FETCH_DEV_RUN_STATUS: '/api/v1/devices/runstatus',
        FETCH_DEV_ALARM_STATUS: '/api/v1/devices/alarmstatus',
        FETCH_NET_COMS: '/api/v1/netcoms',
        FETCH_DEV_NETS: '/api/v1/devnets',

        FETCH_DEV_RES_DETAIL: '/api/v1/devices/response/details',
        FETCH_DEV_RUN_DETAIL: '/api/v1/devices/runstatus/details',
        FETCH_DEV_ALARM_DETAIL: '/api/v1/devices/alarmstatus/details',
        FETCH_NET_COMS_DETAILS: '/api/v1/netcoms/details',
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
        CH_HEXS:'CH_HEXS',
        CH_TEXTS:'CH_TEXTS',
        CH_POINTCLOUD:'CH_POINTCLOUD',
        CH_ICONS:'CH_ICONS',
        CH_GRIDS: 'CH_GRIDS',
        CH_CHARACTER: 'CH_CHARACTER',

        CH_COM_SYSTYPE: 'CH_COM_SYSTYPE',
        CH_DEV_RES: 'CH_DEV_RES',
        CH_DEV_RUN_STATUS: 'CH_DEV_RUN_STATUS',
        CH_DEV_ALARM_STATUS: 'CH_DEV_ALARM_STATUS',
        CH_COMS_CHECKS: 'CH_COMS_CHECKS',
        CH_NETCOMS_CHECKS: 'CH_NETCOMS_CHECKS',
        CH_DEV_NETS: 'CH_DEV_NETS',
    },
    ICON_TYPE: {
        NORMAL: 1,
        MONITOR: 2,
    }
}

export default CONST;