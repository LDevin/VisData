import React from 'react';
import {EchartsStat} from '../plugins/echartsStat';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import * as echarts from 'echarts/lib/echarts';
import  './css/dialog.css';

export default class DialogPage extends React.Component{

    constructor(){
        super();
        this.unitChart = null;
    }

    initChart(){
        if(this.unitChart == null){
            this.unitChart = echarts.init(document.getElementById('unitChart'));
        }
    }

    componentDidMount(){
        this.initChart();
    }

    closeDialog() {
       // window.model.closeDialog(30);
    }

    componentDidUpdate() {
        this.drawChart();
    }

    drawChart() {
        //const {nanNingUnitInfo} = this.props.cacheData;
        // console.log('nanNingUnitInfo',nanNingUnitInfo)
        var colorList =["#00FE8F","#FEC401","#FF3C7C"];
        var legendName = ['一般单位','高危单位','重点单位'];
        // console.log(nanNingIndustryInfo,legendName,seriesData,colorList);
        // var option = EchartsStat.bar.getIndustryInfoOption(legendName,nanNingUnitInfo.unitName,
        //     "#00FE8F",nanNingUnitInfo.sanxiao,'#2F92FA',nanNingUnitInfo.normal,'#FEC401',nanNingUnitInfo.danger,
        // '#FF3C7C',nanNingUnitInfo.imp);
        // console.log(option);
        // this.unitChart.setOption(option);


        // var yAxisData =["高新大队","经开大队","华侨大队","马山大队","隆安大队","上林大队","宾阳大队","横县大队","武鸣大队","邕宁大队","良庆大队","西乡塘大队","江南大队","兴宁大队","青秀大队"];
        // var dataColor= ["#ff0a40","#ff2b3a","#ff4d34","#ff712d","#ff8c28","#ffb121","#ffd11c","#e8e023","#cbe330","#abe83f","#89ec4f","#65f260","#47f56d","#24fa7e","#03fe8d"]
        // var tooltip1 = '接入系统单位占比得分';
        // var tooltip2 = '接入故障占比得分';
        // var tooltip3 = '消防检查得分';
        // var tooltip4 = '教育培训得分';
        // var totalNum = ['50','60','65','69','70','71','73','75','80','82','86','93','94','95','98'];
        // var total_1_num = ['10','15','20','18','17','16','14','13','20','16','15','20','19','17','18'];
        // var total_2_num = ["10","15","15","16","18","19","21","22","20","29","27","25","30","28","30"];
        // var total_3_num = ['10','15','15','17','17','18','19','24','25','20','26','28','26','30','30'];
        // var total_4_num = ['20','15','15','18','18','18','19','16','15','17','18','20','19','20','20'];
        // var percent_1 = '20';
        // var percent_2 = '30';
        // var percent_3 = '30';
        // var percent_4 = '20';
        // this.unitChart.setOption(EchartsStat.bar.getPoliceSortOption(yAxisData,dataColor,tooltip1,tooltip2,tooltip3,tooltip4,totalNum,total_1_num,total_2_num,total_3_num,total_4_num,percent_1,percent_2,percent_3,percent_4));
    }

    render(){
        return(
            <div style={{position: 'absolute', height: '100%', width: '100%',zIndex: 2500}}>
                <div id = "dialog" className="dialog-menu" >
                    <div  className='dialogBox' style={{width:"100%",height:"100%"}} >
                        <span className="close" onClick = {this.closeDialog}></span>
                        <div className="stat_con" style={{padding:'35px 10px 10px 10px',height: 'calc(100% - 40px)'}}>
                            <div className="statChart" id="unitChart" style={{minHeight: '165px', height: 'calc(100% - 0px)'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}