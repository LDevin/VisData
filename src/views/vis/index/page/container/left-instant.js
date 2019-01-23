import React, {Component} from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import {EchartsStat} from '../../../../../public/plugins/echartsStat';
import {Frag_s} from '../../../../../public/tools/utils';

import LoadingIcon from '../../../../../public/tools/loading'

export class FireItemLine extends Component {

    constructor() {
        super();
        this.chart = null;
    }

    componentDidMount() {
        this._initChart();
        this.drawChart();
    }

    componentDidUpdate() {
        this.drawChart();
    }

    _initChart() {
        if (this.chart == null) {
            this.chart = echarts.init(document.getElementById(this.props.id));

            let self = this;
            addEventListener("resize",function() {
                self.chart.resize();
            });
        }
    }

    drawChart() {
        let bgColor = this.props.bgColor;
        let itemData = this.props.cacheData; 

        const {type, countHis, count} = itemData;
        var dateTxt = "", cPer, cPer_color;
        
        switch (type) {
            case 1:dateTxt="环比昨天 ";break;
            case 2:dateTxt="环比上周 ";break;
            case 3:dateTxt="环比上月 ";break;
        }
        
        var cp;
        if (countHis != null) {
            var n = countHis.length - 1;
            var lastNum = countHis[n], penulNum = countHis[n - 1];
            var subtracVal = lastNum - penulNum;
            if (penulNum > 0) {
                cp = parseInt(subtracVal / penulNum*100);
            } else {
                if (subtracVal==0){
                    cp=0;
                } else {
                    cp='denom=0';
                }
            }
        }

        if (cp > 0) {
            cPer=dateTxt + cp + "% ▲";
            cPer_color="#0492c4";
        }else if(cp < 0){
            cPer=dateTxt + Math.abs(cp) + "% ▼";
            cPer_color="#fe4b5e";
        }else if(cp == 0){
            cPer=dateTxt + cp +"% ▶";
            cPer_color="#0492c4";
        }else{
            cPer=dateTxt +"+∞";
            cPer_color="#0492c4";
        }
        this.chart.setOption(EchartsStat.line.getAllCheckOption(countHis, count, cPer, cPer_color, bgColor, this.props.index));
    }

    render() {
        const style = {minHeight: '120px', height: 'calc(100% - 50px)'};
        return(
            <div className={this.props.className} id={this.props.id} style={style}></div>
        );
    }
}

//消防检查
export class FireInspection extends Component {

    constructor() {
        super();
    }

    render() {

        const ckLiStyle = {padding: '10px 0px', height: 'calc(50% - 0px)'};
        const ckLiStyle2 = { height: 'calc(50% - 0px)'};
        const ckTiles = ['单位自查（家）', '监督检查（家）', '发现隐患数（项）', '已整改数（项）'];
        const bgColor = [['#18a6f2'], ['#d3406c'], ['#e9d653'], ['#20bca6']];

        const cacheData = {count:20, ringRatioRate: 10, dataList: [10,20,1,20,20,10], relatedIds:[0],type:1};

        const {base, fireChecks} = this.props

        return(
            <div className="statBox" style={{minHeight: '250px',height: 'calc(50% - 0px)'}}>
                {fireChecks.loading && <LoadingIcon/>}
                <Frag_s title="消防检查" className="divTime" subtitle={base.day}></Frag_s>

                <div className="stat_con hgt1_1" style={{padding: '10px 0px', height: 'calc(100% - 70px)'}}>
                    {
                        ckTiles.map((val, index) => {
                            return(
                                    <div className="ckLi fw50" style={index < 2?ckLiStyle: ckLiStyle2} key={index.toString()}>
                                    <h3>{ckTiles[index]}</h3>
                                    <FireItemLine className="statChart" id={"statChart_fireCheck_"+(index+1).toString()} 
                                    cacheData={fireChecks.data[index]} bgColor={bgColor[index]} index={index}/>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        );
    }
}