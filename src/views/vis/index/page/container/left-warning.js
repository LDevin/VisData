import React, {Component} from 'react';
import {Frag_s} from '../../../../../public/tools/utils';

import * as echarts from 'echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import {EchartsStat} from '../../../../../public/plugins/echartsStat';
import LoadingIcon from '../../../../../public/tools/loading'


//高风险单位
export class RiskUnitChunk extends Component {

    constructor() {
        super();
        this.chart = null;
    }

    componentDidMount() {
        this._initChart();
        this.drawChart();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.comsChunks != nextProps.comsChunks
    }

    componentDidUpdate() {
        this.drawChart();
    }

    drawChart() {
        this._handleData(this.props.comsChunks.data);
    }

    _initChart() {
        if (this.chart == null) {
            this.chart = echarts.init(document.getElementById('statChart_riskAssessUnit'));
            this.chart.on('click', (param) => {
                //window.model.getRiskUnitChunkDetail(++param.dataIndex, param.data.name)
            })
            let self = this;
            window.addEventListener("resize",function() {
                self.chart.resize();
            });
        }
    }

    _handleData(data) {
        var total = 0, name="(家)单位", seriesName="单位风险评估", colorList=['#1d8fcb','#32bee2','#f14865'];
        let seriesData = [{name: '正常单位', value: data.normal},{name: '危险单位', value: data.danger},{name: '高危单位', value: data.highrisk}];
        total += data.normal + data.danger + data.highrisk;
        this.chart.setOption(EchartsStat.pie.getPhyConnectOption(name,total,seriesName,seriesData,colorList))
    }

    render() {
        const {loading} = this.props.comsChunks;
        return(
            <div className="statBox" style={{minHeight:'230px',height: 'calc(45% - 42px)'}}>
            {loading && <LoadingIcon />}
                <Frag_s title="高风险单位"/>
                <div className="stat_con" style={{padding:'0px', height:'calc(100% - 48px)', minHeight: '150px', position: 'relative'}}>
                    <div className="statChart" id="statChart_riskAssessUnit" style={{minHeight:'120px', height:'calc(100% - 0px)'}}></div>
                </div>
            </div>
        );
    }
}

//重点防控区域
export class ProtectAreaChunk extends Component {

    constructor() {
        super();
        this.chart = null;
    }

    componentDidMount() {
        this._initChart();
        this.drawChart();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.areaChunks != nextProps.areaChunks
    }

    componentDidUpdate() {
        this.drawChart();
    }

    drawChart() {
        this._handleData(this.props.areaChunks.data);
    }

    _initChart() {
        if (this.chart == null) {
            this.chart = echarts.init(document.getElementById('statChart_riskImportantArea'));
            this.chart.on('click', (param) => {
                //window.model.getProtectAreaChunkDetail();
            })

            let self = this;
            window.addEventListener("resize",function() {
                self.chart.resize();
            });
        }
    }

    _handleData(data) {
        var count=data.emphasisCount+data.notEmphasisCount;
        var per=count <= 0? 0: (data.emphasisCount/count*100).toFixed(0);
        var colorList=['#cccccc','#25BFDE','#213c5f']; // 2 深色  3 底色
        this.chart.setOption(EchartsStat.pie.getPhyConnectRing(per,colorList));
    }

    render() {
        const {loading} = this.props.areaChunks;
        return(
            <div className="statBox mt15" style={{minHeight:'140px',height: 'calc(25% - 0px)'}}>
            {loading && <LoadingIcon />}
            <Frag_s title="重点防控区域"/>
            <div className="stat_con" style={{padding:0, height:'calc(100% - 49px)', minHeight: '90px'}}>
                <div className="statChart" id="statChart_riskImportantArea" style={{minHeight:'80px', height:'calc(100% - 0px)'}}></div>
            </div>
            </div>
        );
    }
}

//火灾发生概率
export class FireProbabilityChunk extends Component {

    constructor() {
        super();
        this.chart = null;
    }

    componentDidMount() {
        this._initChart();
        this.drawChart();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.fireChunks != nextProps.fireChunks
    }

    componentDidUpdate() {
        this.drawChart();
    }

    drawChart() {
        this._handleData(this.props.fireChunks.data);
    }

    _initChart() {
        if (this.chart == null) {
            this.chart = echarts.init(document.getElementById('statChart_riskAssessArea'));
            this.chart.on('click', (param) => {
               // window.model.getFireProbabilityChunkDetail(++param.dataIndex)
            })

            let self = this;
            window.addEventListener("resize",function() {
                self.chart.resize();
            });
        }
    }

    _handleData(data) {
        var seriesData=data, seriesName="火灾发生概率", colorList=['#1d8fcb','#32bee2','#f14865'];
        this.chart.setOption(EchartsStat.pie.getPhyConnectOptions(seriesName,seriesData,colorList));
    }

    render() {
        return(
            <div className="statBox mt15" style={{minHeight:'160px',height: 'calc(30% - 0px)'}}>
            {this.props.fireChunks.loading && <LoadingIcon />}
            <Frag_s title="火灾发生概率"/>
            <div className="stat_con" style={{padding:'0px', height:'calc(100% - 49px)', minHeight: 90}}>
                <div className="statChart" id="statChart_riskAssessArea" style={{minHeight:'90px', height:'calc(100% - 0px)',marginTop: 3}}></div>
            </div>
            </div>
        );
    }
}
