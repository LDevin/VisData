import React, {Component} from 'react';
import {Frag_sss, Frag_s} from '../../../../../public/tools/utils';

import * as echarts from 'echarts';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import {EchartsStat} from '../../../../../public/plugins/echartsStat';
import LoadingIcon from '../../../../../public/tools/loading'

//设备查岗应答情况
class DeviceResponce extends Component {
    constructor() {
        super();
        this.chart = null;
    }

    componentDidMount() {
        this._initChart();
        this.drawChart();

        if (this.props.devRes.datetype === 2) {
            frag_sss_sub_id.style.setProperty('--pressed', '#2798a0');
            rc_datepick_lineinput_id.style.setProperty('--pressed', '#fff');
        } else {
            frag_sss_sub_id.style.setProperty('--pressed', '#fff');
            rc_datepick_lineinput_id.style.setProperty('--pressed', '#2798a0');
        }
    }

    _onClkBtn() {
        console.log('_onClkBtn');
        frag_sss_sub_id.style.setProperty('--pressed', '#fff');
        rc_datepick_lineinput_id.style.setProperty('--pressed', '#2798a0');

       // this.props.cacheData.resDateTimeType = 1;
      //  window.model.getDeviceResponse(this.props.cacheData);
    }

    _dataTrigger(date) {
        console.log('_dataTrigger ', date);
        frag_sss_sub_id.style.setProperty('--pressed', '#2798a0');
        rc_datepick_lineinput_id.style.setProperty('--pressed', '#fff');
      //  this.props.cacheData.resDateTimeType = 2;
      //  this.props.cacheData.resDateTime = date;

      //  window.model.getDeviceResponse(this.props.cacheData);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.EquStatusData != nextProps.EquStatusData
    // }

    componentDidUpdate() {
        this.drawChart();
    }

    drawChart() {
        const {EquStatusData} = this.props; 
        this._handleChartData(EquStatusData);
    }

    _initChart() {
        if (this.chart == null) {
            this.chart = echarts.init(document.getElementById('statChart_equStatus_2'));
            let self = this;
            addEventListener('resize', ()=> {
                self.chart.resize();
            })
            this.chart.on('click', (param) => {
                let deviceType;
                switch(param.data.name){
                        case '未应答数':deviceType=2;break;
                        case '应答数':deviceType=1;break;
                }
                self.props.onDevResDetails(deviceType)
               // window.model.drawDeviceResponsePoint(this.props.cacheData, deviceType)
            })
        }
    }

    _handleChartData(data) {
        var total = 0, name="总数", legendName= [], seriesName="设备应答情况统计", colorList=['#DBED63','#00F0F9'];
        let seriesData = [];
        data.forEach((e) => {
            total += e.count;
            seriesData.push({name: e.name, value: e.count});
            legendName.push(e.name);
        });
        this.chart.setOption(EchartsStat.pie.getEquStatusOption(name,total,legendName,seriesName,seriesData,colorList))
    }

    render() {
        const {deviceStatus, resDateTime} = this.props;
        return(
            <div className="statBox mt15" style={{minHeight:'180px',height: 'calc(33% - 25px)'}}>
                {deviceStatus && <LoadingIcon />}
                <Frag_sss title="设备查岗应答情况" subtitle='近七天' onClick={this._onClkBtn.bind(this)} date={resDateTime}
                dateTrigger={this._dataTrigger.bind(this)}/>
                <div className="stat_con" id="statChart_Main" style={{padding:'0px 20px 0px 0px', height: 'calc(100% - 50px)'}}>
                    <div className="statChart" id="statChart_equStatus_2" style={{minHeight:165, height: 'calc(100% - 0px)', width:350}}></div>
                </div>
            </div>
        )
    }
}

//联网设备运行情况统计
class DeviceRunStatistics extends Component {

    constructor() {
        super();
        this.onlineChart = null;
    }

    componentDidMount() {
        this._initChart();
        let self = this;
        window.addEventListener("resize",function() {
            self.onlineChart.resize();
        });
        this.drawChart();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.EquStatusOnlineData != nextProps.EquStatusOnlineData
    // }

    componentDidUpdate() {
        this.drawChart();
    }

    drawChart() {
        const {EquStatusOnlineData} = this.props; 
        this._handleOnLineChartData(EquStatusOnlineData);
    }

    _initChart() {
        var self = this;
        if (this.onlineChart == null) {
            this.onlineChart = echarts.init(document.getElementById('statChart_equStatus_1'));
            this.onlineChart.on('click', (param) => {
                let deviceType;
                switch(param.data.name){
                     case '离线率': deviceType=2; break;
                     case '在线率': deviceType=1; break;
                }
                self.props.onDevRunDetails(1, deviceType)
                //console.log('systemType= ',self.props.cacheData.systemType)
               // window.model.getdeviceDrawPoints(self.props.cacheData, param.data.name)
            })
        }
    }

    _handleOnLineChartData(data) {
        var total = 0, name="总数", legendName= [], seriesName="设备联网情况", colorList=['#9834FF','#00FF8E'];
        let seriesData = [];
        data.forEach((e) => {
            total += e.count;
            seriesData.push({name: e.name, value: e.count});
            legendName.push(e.name);
        });

        this.onlineChart.setOption(EchartsStat.pie.getEquStatusOption(name,total,legendName,seriesName,seriesData,colorList))
    }

    render() {
        const {deviceOnOffStatus} = this.props;

        return(
            <div className="statBox mt15" style={{minHeight:'180px',height: 'calc(33% - 22px)'}}>
                {deviceOnOffStatus && <LoadingIcon />}
                <Frag_s title="联网设备运行情况统计" subtitle="当前"/>
                <div className="stat_con" style={{padding:'0px 20px 0px 0px', height: 'calc(100% - 50px)'}}>
                    <div className="statChart" id="statChart_equStatus_1" style={{minHeight: '175px', height: 'calc(100% - 0px)', width: 350}}></div>
                </div>
            </div>
        )
    }
}

//设备告警处理情况统计
class DeviceWarnStatistics extends Component {
    
    constructor() {
        super();
        this.chart = null;
    }

    componentDidMount() {
        this._initChart();
        let self = this;
        window.addEventListener("resize",function() {
            self.chart.resize();
        });
        this.drawChart();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.EquAlarmProData != nextProps.EquAlarmProData
    // }

    componentDidUpdate() {
        this.drawChart();
    }
    
    drawChart() {
        const {EquAlarmProData} = this.props;
        this._handleChartData(EquAlarmProData);
    }

    _initChart() {
        var self = this;
        if (this.chart == null) {
            this.chart = echarts.init(document.getElementById('statChart_equAlarmPro'));
            this.chart.on('click', (param) => {
                console.log('statChart_checkSameMonth_check click',param.name);
                let deviceType;
                switch(param.name){
                    case '告警设备':deviceType=1;break;
                    case '告警未处理':deviceType=2;break;
                }
                self.props.onDevAlarmDetails(1, deviceType)
                //console.log('systemType= ',self.props.cacheData.systemType)
               // window.model.getdeviceDrawPoints(self.props.cacheData, param.name)
            })
        }
    }

    _handleChartData(data) {
        var total = 0, name="总数", legendName= [], seriesName="设备告警处理情况统计", colorList=['#33FDFF','#2F92FA'];
        let seriesData = [];

        var maxNum = 0, seris = [], serisvals = [];

        data.forEach((e) => {
            total += e.count;
            var obj = {name: e.name, value: e.count};
            seris.push(e.name);
            serisvals.push(e.count);

            if (e.name == "近七天告警设备") {
                maxNum = e.count;
            }
            seriesData.push(obj);
            legendName.push(e.name);
        });
        //EchartsStat.pie.getEquStatusOption(name,total,legendName,seriesName,seriesData,colorList)
        //this.chart.setOption(EchartsStat.pie.getEquStatusOption(name,total,legendName,seriesName,seriesData,colorList))
        this.chart.setOption(EchartsStat.bar.getCheckOption(seris,serisvals,'告警处理情况统计','', '#fe4b5e', maxNum));
    }

    render() {
        const {deviceAlarmStatus} = this.props;
        return(
            <div className="statBox mt15" style={{minHeight:'210px',height: 'calc(34% - 10px)'}}>
            {deviceAlarmStatus && <LoadingIcon />}
                <Frag_s className="divTimerr" title="设备告警处理情况统计"/>
                <div className="stat_con" style={{height: 'calc(100% - 60px)', padding:'10px 10px 20px 10px'}}>
                    <div className="statChart" id="statChart_equAlarmPro" style={{minHeight:'180px', height: 'calc(100% - 10px)',padding:'5px', width:350}}></div>
                </div>
            </div>
        )
    }
}

export {DeviceRunStatistics, DeviceWarnStatistics, DeviceResponce};