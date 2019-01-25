import React, {Component} from 'react';

import * as echarts from 'echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import {EchartsStat} from '../../../../../public/plugins/echartsStat';
import LoadingIcon from '../../../../../public/tools/loading'

export default class FireRescue extends React.Component {

    constructor() {
        super();
        this.statChart_Chart_1 = null;
        this.statChart_Chart_2 = null;
        this.getIndustryNum = this.getIndustryNum.bind(this);
        this.getDevicePoint = this.getDevicePoint.bind(this);
    }

    state = { visible: false }

    componentDidMount(){
        this.initChart();
        this.drawChart();
        this.drawSortChart();
    }

    componentDidUpdate() {
        this.drawChart();
        this.drawSortChart();
    }

    getIndustryNum(){
       // console.log('getIndustryNum click');
        //window.model.setDialogNum(31);
    }

    getDevicePoint(val){
        //console.log(val);
        //window.model.getDevicePointInfo(val);
    }

    initChart() {
        if(this.statChart_Chart_1 == null) {
            this.statChart_Chart_1 = echarts.init(document.getElementById('statChart_Chart_1'));
            let self = this;
            this.statChart_Chart_1.on('click',(param)=>{
                //console.log(param);
               // let getName  =  param.data.name;
                //let type =param.data.type;
                // switch(getName){
                //     case '一般单位':
                //     type = 2;
                //     break;
                //     case '三小单位':
                //     type = 3;
                //     break;
                //     case '高危单位':
                //     type = 4;
                //     break;
                //     case '重点单位':
                //     type = 5;
                //     break;
                // }
               // window.model.getIndustryPoint(type);
               self.props.onNetComsDetails(param.data.type)
            });
        }

        if(this.statChart_Chart_2 == null){
            this.statChart_Chart_2 = echarts.init(document.getElementById('statChart_Chart_2'));
        }

        let self = this;
        addEventListener('resize', ()=> {
            self.statChart_Chart_1.resize();
            self.statChart_Chart_2.resize();
        })
    }

    drawChart() {
        const {netComs} = this.props;
        // console.log('nanNingIndustryInfo',nanNingIndustryInfo)
        let seriesData = [];
        let legendName = [];
        netComs.data.forEach(item=>{
            seriesData.push({name:item.name,value:item.count, type: item.type});
            legendName.push({name:item.name,textStyle:{color:"#ffffff"}});
        });
         let colorList =["#2F92FA","#00FE8F","#FEC401","#FF3C7C"];
         this.statChart_Chart_1.setOption(EchartsStat.pie.getIndustryNumOption(legendName,seriesData,colorList));
    }

    drawSortChart(){
        console.log("drawSortChart");
        var yAxisData =["高新大队","经开大队","华侨大队","马山大队","隆安大队","上林大队","宾阳大队","横县大队","武鸣大队","邕宁大队","良庆大队","西乡塘大队","江南大队","兴宁大队","青秀大队"];
        var dataColor= ["#ff0a40","#ff2b3a","#ff4d34","#ff712d","#ff8c28","#ffb121","#ffd11c","#e8e023","#cbe330","#abe83f","#89ec4f","#65f260","#47f56d","#24fa7e","#03fe8d"]
        var tooltip1 = '接入系统单位占比得分';
        var tooltip2 = '接入故障占比得分';
        var tooltip3 = '消防检查得分';
        var tooltip4 = '教育培训得分';
        var totalNum = ['50','60','65','69','70','71','73','75','80','82','86','93','94','95','98'];
        var total_1_num = ['10','15','20','18','17','16','14','13','20','16','15','20','19','17','18'];
        var total_2_num = ["10","15","15","16","18","19","21","22","20","29","27","25","30","28","30"];
        var total_3_num = ['10','15','15','17','17','18','19','24','25','20','26','28','26','30','30'];
        var total_4_num = ['20','15','15','18','18','18','19','16','15','17','18','20','19','20','20'];
        var percent_1 = '20';
        var percent_2 = '30';
        var percent_3 = '30';
        var percent_4 = '20';
        this.statChart_Chart_2.setOption(EchartsStat.bar.getPoliceSortOption(yAxisData,dataColor,tooltip1,tooltip2,tooltip3,tooltip4,
            totalNum,total_1_num,total_2_num,total_3_num,total_4_num,percent_1,percent_2,percent_3,percent_4));
    }

    render() {
       // const { IndustryNum,nanNingForce, nanNingDeviceStatus,enforceStatic,enforceStaticCnt,resecuStaticCnt,resecuStatic} = this.props.cacheData;
       // const {gridZoneWarnVisible} = this.props.cacheData.mapProps;
        //  console.log('---',enforceStaticCnt,enforceStatic,resecuStaticCnt,resecuStatic,'---');

        // <div style={{textAlign:"right"}}>
        // <label>
        //     <input id='grid_zone_Warning' type="checkbox" style={{color: '#ffffff',verticalAlign:"middle"}} 
        //      onChange={this.editChecked.bind(this)} checked={gridZoneWarnVisible && 'checked'}/>
        //     <span style={{verticalAlign:"middle" ,fontSize:"14px",color:"#ffffff" }} >网格化预警</span>
        // </label>
        // </div>
        const {netComs, devNets} = this.props;

        return(
            <div style={{height: '100%', marginTop: 18}}>
                <div className='statBox mb15' style={{minHeight: '130px', height: 'calc(28% - 25px)',color: '#fefefe'}}>
                    {netComs.loading && <LoadingIcon />}
                    <div className="stat_tit">
                        <i className="line"></i> 
                        <h2>联网企业数</h2>
                        <b className="textHover" style={{fontWeight: 'normal',fontSize: '22px',color: '#00fe8f',float:'right',cursor:'pointer'}}
                         onClick = {()=>console.log('')} >{netComs.total}</b>
                    </div>
                    <div className="stat_con" style={{padding:'0px 20px 0px 0px', height: 'calc(100% - 50px)'}}>
                            <div className="statChart" id="statChart_Chart_1" style={{minHeight: '165px', height: 'calc(100% - 0px)', width: 350}}></div>
                    </div>
                </div>
                <div className='statBox' style={{ height: 'calc(22% - 22px)'}}>
                    {devNets.loading && <LoadingIcon />}
                    <div className="stat_tit"><i className="line"></i> <h2>联网设备</h2></div>
                    <div className='stat_con boxSize' style={{height:'calc(100% - 50px)'}}>
                        <div id='statChart' style={{minHeight: '240px', height: 'calc(50% - 10px)', marginBottom: 10}}>
                            <div className='peopleTotal' style={{height: '30%'}}>
                                <div className='peopleTotal_zd fl'>
                                    <div style={{marginTop: 1}}>网关数量</div>
                                    <div className='peopleTotal_zd_img'>
                                        <img src={require("../../../../../public/resources/images/icon_wifi.png")}/>
                                    </div>
                                    <div><span className="peopleTotal_spn" onClick = {this.getDevicePoint.bind(this,1)} >{devNets.gateWay}</span>个</div>
                                </div>
                                <div className='peopleTotal_zd fl'>
                                    <div style={{marginTop: 1}}>探头数量</div>
                                    <div className='peopleTotal_zd_img'>
                                        <img src={require("../../../../../public/resources/images/icon_probe.png")}/>
                                    </div>
                                    <div><span className="peopleTotal_spn"  onClick = {this.getDevicePoint.bind(this,1)}>{devNets.probes}</span>个</div>
                                </div>
                                <div className='peopleTotal_zd fl'>
                                    <div style={{marginTop: 1}}>视频监控</div>
                                    <div className='peopleTotal_zd_img'>
                                        <img src={require("../../../../../public/resources/images/icon_vedio2.png")}/>
                                    </div>
                                    <div><span className="peopleTotal_spn"  onClick = {this.getDevicePoint.bind(this,8)}>{devNets.videos}</span>个</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='statBox' style={{ height: 'calc(50%)',marginTop:"18px"}} >
                    <div className="stat_tit">
                        <i className="line"></i> 
                        <h2>大队排名</h2>
                    </div>
                    <div className="stat_con" style={{padding:'0px 10px 0px 0px', height: 'calc(100% - 30px)'}}>
                            <div className="statChart" id="statChart_Chart_2" style={{minHeight: '205px', height: 'calc(100% - 0px)', width: 350}}></div>
                    </div>
                </div>
            </div>
        )
    }
}