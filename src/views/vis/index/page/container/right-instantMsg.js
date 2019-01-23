import React from 'react';

import * as echarts from 'echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import LoadingIcon from '../../../../../public/tools/loading'
import {EchartsStat} from '../../../../../public/plugins/echartsStat';

export class FireControlDanger extends React.Component {
    
    constructor() {
        super();
        this.state ={
            show:true,
            mapPoliceInfo:4,
            orgcount : 100,
            watercount:101,
            eleccount :102,
            gascount:103,
            EducationRatio :{
                "companyJoinRate":'98',
                "empOkRate":'97',
                "empJoinRate":"68"
            },
            Educationradar :{
                seriesData :[
                    {text: '消防设施设备常识', max: 100},
                    {text: '宣传培训', max: 100},
                    {text: '组织疏散', max: 100},
                    {text: '检查消除火灾隐患', max: 100},
                    {text: '扑救初起火灾', max: 100},
                    {text: '逃生自救', max: 100},
                    {text: '消防报警', max: 100}
                ],
                val :[60,78,85,40,46,78,93]
            }
        }
    }

    componentDidMount() {
        this.statChart_education_1 = echarts.init(document.getElementById('statChart_education_1'));
        this.statChart_education_1.setOption(EchartsStat.pie.getEduPieOption(this.state.EducationRatio.companyJoinRate,
            this.state.EducationRatio.empOkRate,
            this.state.EducationRatio.empJoinRate));

        this.statChart_education_2 = echarts.init(document.getElementById('statChart_education_2'));
        this.statChart_education_2.setOption(EchartsStat.radar.getEduRadarOption(this.state.Educationradar.seriesData,
            this.state.Educationradar.val));

        let self = this;
        window.addEventListener("resize",function() {
            self.statChart_education_1.resize();
            self.statChart_education_2.resize();
        });
    }

    render() {
        return(
            <div className="right-statbox mt15" style={{minHeight: '280px', height: 'calc(55% - 0px)', marginTop:'0px'}} key="c">
                <div className="stat_tit">
                    <i className="line"></i>
                    <h2>教育培训</h2>
                </div>
                <div className="stat_con hgt1_4" style={{height: 'calc(100% - 70px)'}}>
                    <div className="statChart" id="statChart_education_1" style={{minHeight: '120px', height: 'calc(50% - 10px)', borderBottom: '1px dotted #2c4676'}}></div>
                    <div className="statChart" id="statChart_education_2" style={{minHeight: '120px', height: 'calc(50% - 15px)', marginTop:'5%'}}></div>
                </div>
            </div>
        )
    }
}