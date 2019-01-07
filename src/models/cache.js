import moment from 'moment';

const month_format = 'YYYY-MM', date_format = 'YYYY-MM-DD';

const month_now = moment().format(month_format);
const date_now = moment().format(date_format);

const _User = {
    name: 'devin',
    ps: '',
};

const _Base = {
    day: date_now,
    month: month_now,
};

const _Com = {
    menuNum:0,	  //主菜单编号 0即时信息，1消防管理，2物联监控，3预警研判
    relatedId:0, //当前区域id
    curType:2,	  //属地2,执法1,行业3
};

const _Map = {
    hexs:null,
    grids:null,
    texts:null,
    icons:null,
    characterSet:[],
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

};

export {_User, _Base, _Com, _Map, _Cache};