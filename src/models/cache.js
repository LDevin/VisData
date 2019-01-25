import moment from 'moment';

const month_format = 'YYYY-MM', date_format = 'YYYY-MM-DD';

const month_now = moment().format(month_format);
const date_now = moment().format(date_format);

const data_1 = {count:112, "countHis": ["124","846","352","100","130","582", "641", "160", "106", "486"],type:2}
const data_2 = {count:98, "countHis": ["231","996","652","703","673","530", "650", "512", "351", "708"],type:2}
const data_3 = {count:326, "countHis": ["134","453","420","485","291","243","344","438","216","164"],type:2}
const data_4 = {count:127, "countHis": ["36","352","318","409","297","302","310","291","289","114"],type:2}

const _d_data_1 = {normal: 100, danger: 10, highrisk: 200}
const _d_data_2 = {emphasisCount: 100, notEmphasisCount: 50}
const _d_data_3 =[{name:"低概率",value:100},{name:"中概率",value:200},{name:"高概率",value:100}];

import fakerJson from './fake-data.json';

const _User = {
    name: 'devin',
    ps: '',
};

const _Base = {
    day: date_now,
    month: month_now,
    loading:false,
    errMsg:'',
    errMsgShow:false,
    dialogShow: false,
};

const _Com = {
    menuNum:0,	  //主菜单编号 0即时信息，1消防管理，2物联监控，3预警研判
    relatedId:0, //当前区域id
    curType:2,	  //属地2,执法1,行业3
    systemType: 1,
};

const _Map = {
    hexs:null,
    grids:null,
    texts:null,
    icons:null,
    characterSet:null,
    pointClouds:null,
    ZoneLngLatData: null,
    gridZoneWarnData:null,
    ScatterplotData: null,
    RankListData: null,
    zoneIDPositions: null,
    RiskAreaData :null,
    IconSpotData :null,
    IndustryTotalData: null,
    videoIconData:null,
    zoneType:1, //街道（执法）：1， 社区为2，就是查询zone的边界的经纬度的标志，表明到了社区不在查了
    gridZoneWarnVisible: false
};

const _Cache = {
    devRes: {
        data: [{ "name": '应答数',"count": 0},{ "name": '未应答数',"count": 0}],
        loading: false,
        date: date_now,
        datetype: 1, //!: '近七天' or 2: '2018-10-02'
    },
    devRunStatus: {
        data: [{ "name": '在线率',"count": 0},{ "name": '离线率',"count": 0}],
        loading: false,
    },
    devAlarmStatus: {
        data: [{ "name": '告警未处理',"count": 0},{ "name": '告警设备',"count": 0}],
        loading: false,
    },
    netComs: {
        data: [{ "name": '一般单位',"count": 0, type: 2},{ "name": '高危单位',"count": 0, type: 4},
        { "name": '三小单位',"count": 0, type: 3},{ "name": '重点单位',"count": 0, type: 5}],
        total: 0,
        loading: false,
    },
    devNets: {
        gateWay: 0,probes:0, videos: 0,
        loading: false,
    },
    fireChecks: {
        data: [data_1, data_2, data_3, data_4],
        loading: false,
    },
    comsChecks: {
        data: fakerJson[2][0],
        loading: false,
        timeType: '月',
        type: 3,
        tabIndex: 1,
    },
    comsChunks: {
        loading: true,
        data: _d_data_1,
    },
    areaChunks: {
        loading: true,
        data: _d_data_2,
    },
    fireChunks: {
        loading: true,
        data: _d_data_3,
    },
};

export {_User, _Base, _Com, _Map, _Cache};