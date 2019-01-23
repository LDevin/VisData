import React, {Component} from 'react';

import {EchartsStat, Highchart} from '../../../../../public/plugins/echartsStat';
import {Frag_ss, Frag_s} from '../../../../../public/tools/utils';

import * as echarts from 'echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import * as Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import highcharts3d from 'highcharts/highcharts-3d';

import LoadingIcon from '../../../../../public/tools/loading'

highcharts3d(ReactHighcharts.Highcharts);

export class Unitstatistics extends Component {

    constructor() {
        super();

        this.statChart_checkSameMonth_check = null;
        this.statChart_checkSameMonth_rect = null;
        this.statChart_checkAdjacentMonth_check = null;
        this.statChart_checkAdjacentMonth_rect = null;
        
        this.stateSelect = this.stateSelect.bind(this);
        this.checkUp = this.checkUp.bind(this);
        this.onPanelChange = this.onPanelChange.bind(this);

        this.state = {
            icoPerType:{
                groupAcheck:'',
                groupAfixs:'',
                groupBcheck:'',
                groupBfixs:''
            }
        }
    }   

    checkUp(index){
        //this.props.cacheData.tabIndex = index;
       // window.model.getCheckData(this.props.cacheData);

    //    setTimeout(() => {
    //         window.model.setState({tabIndex: index});
    //    }, 0)

      // window.model.getCheckData(this.props.cacheData);
    }
    
    stateSelect(index){
        console.log('stateSelect click',index);

       // this.props.cacheData.insIndex = index + 1;

        // switch(index){
        //     case 0:
        //         this.props.cacheData.timeType="日";
        //         break;
        //     case 1:
        //         this.props.cacheData.timeType="周";
        //         break;
        //     case 2:
        //         this.props.cacheData.timeType="月";
        //         break;
        // }

        // setTimeout(() => {
        //     window.model.setState(this.props.cacheData)
        // }, 0);

       // window.model.getCheckData(this.props.cacheData);

        // this.setState(this.props.cacheData);
        // console.log(this.props,this.state);
    }

     onPanelChange(value, mode) {
       // console.log(value, mode);
    }

    drawChart() {
        const {data, type, tabIndex} = this.props.comsChecks;
        console.log('data ',data)
        var reData = data;
        var seriesDataA=reData.group1;
        var seriesDataB=reData.group2;
       
        var serDataA_checksName = [], serDataA_checksValue = [],
            serDataA_fixsName = [], serDataA_fixsValue = [],
            serDataB_checksName = [], serDataB_checksValue = [],
            serDataB_fixsName = [], serDataB_fixsValue = [],
            cPer1,cPer2,cPer3,cPer4,cPer_color1,cPer_color2,cPer_color3,cPer_color4;
    
        var serDataA_checks=seriesDataA.checks;
        var serDataA_fixs=seriesDataA.fixs;
        var serDataB_checks=seriesDataB.checks;
        var serDataB_fixs=seriesDataB.fixs;  
        var groupTypeBeforeA,groupTypeBeforeB,groupTypeCurrent;//日、周、月同比环比对应标注

        switch(type){
            case 1:
                groupTypeBeforeA="上月同日";
                groupTypeBeforeB="昨天";
                groupTypeCurrent="今天";
            break;
            case 2:
                groupTypeBeforeA="上年同周";
                groupTypeBeforeB="上周";
                groupTypeCurrent="本周";
            break;
            case 3:
                groupTypeBeforeA="上年同月";
                groupTypeBeforeB="上月";
                groupTypeCurrent="本月";
            break;
        }
        serDataA_checksName.push(groupTypeBeforeA,groupTypeCurrent);
        serDataA_checksValue.push(serDataA_checks.counthis.key,serDataA_checks.countcur.key);
        
        serDataA_fixsName.push(groupTypeBeforeA,groupTypeCurrent);
        serDataA_fixsValue.push(serDataA_fixs.counthis.key,serDataA_fixs.countcur.key);

        serDataB_checksName.push(groupTypeBeforeB,groupTypeCurrent);
        serDataB_checksValue.push(serDataB_checks.counthis.key,serDataB_checks.countcur.key);
        
        serDataB_fixsName.push(groupTypeBeforeB,groupTypeCurrent);
        serDataB_fixsValue.push(serDataB_fixs.counthis.key,serDataB_fixs.countcur.key);

        var cp1=0,subtracVal1=serDataA_checks.countcur.key-serDataA_checks.counthis.key;
            if(serDataA_checks.counthis.key>0){
            	cp1=parseInt(subtracVal1/serDataA_checks.counthis.key*100);
            }else{
            	if(subtracVal1==0){
        			cp1=0;
        		}else{
        			cp1='denom=0';
        		}
            }

            var cp2=0,subtracVal2=serDataA_fixs.countcur.key-serDataA_fixs.counthis.key;
            if(serDataA_fixs.counthis.key>0){
            	cp2=parseInt(subtracVal2/serDataA_fixs.counthis.key*100);
            }else{
            	if(subtracVal2==0){
        			cp2=0;
        		}else{
        			cp2='denom=0';
        		}
            }
            var cp3=0,subtracVal3=serDataB_checks.countcur.key-serDataB_checks.counthis.key;
            if(serDataB_checks.counthis.key>0){
            	cp3=parseInt(subtracVal3/serDataB_checks.counthis.key*100);
            }else{
            	if(subtracVal3==0){
        			cp3=0;
        		}else{
        			cp3='denom=0';
        		}
            }
            
            var cp4=0,subtracVal4=serDataB_fixs.countcur.key-serDataB_fixs.counthis.key;
            if(serDataB_fixs.counthis.key>0){
            	cp4=parseInt(subtracVal4/serDataB_fixs.counthis.key*100);
            }else{
            	if(subtracVal4==0){
        			cp4=0;
        		}else{
        			cp4='denom=0';
        		}
            }

            var maxNum1,maxNum2,maxNum3,maxNum4;
            
            if(serDataA_checks.countcur.key > serDataA_checks.counthis.key){
            	maxNum1=serDataA_checks.countcur.key;
            }else{
            	maxNum1=serDataA_checks.counthis.key;
            }
            
            if(serDataA_fixs.countcur.key > serDataA_fixs.counthis.key){
            	maxNum2=serDataA_fixs.countcur.key;
            }else{
            	maxNum2=serDataA_fixs.counthis.key;
            }
            
            if(serDataB_checks.countcur.key > serDataB_checks.counthis.key){
            	maxNum3=serDataB_checks.countcur.key;
            }else{
            	maxNum3=serDataB_checks.counthis.key;
            }
            
            if(serDataB_fixs.countcur.key > serDataB_fixs.counthis.key){
            	maxNum4=serDataB_fixs.countcur.key;
            }else{
            	maxNum4=serDataB_fixs.counthis.key;
            }

            var cPer_color="#00d8ff";
            var upDown=function(num){
            	var reNum="",icoType="";
            	if(num>0){
            		cPer_color="#00d8ff";
            		reNum=num + "%";
            		icoType="icoPerUp";
            	}else if(num<0){
            		cPer_color="#fe4b5e";
            		reNum=Math.abs(num) + "%";
            		icoType="icoPerDown";
            	}else if(num==0){
            		cPer_color="#00d8ff";
            		reNum="▶ "+ num + "%"
            	}else{
            		cPer_color="#00d8ff";
            		reNum="+∞";
            		icoType="icoPerUp";
    	        }
            	var obj={num:reNum,color:cPer_color,icoType:icoType}
        		return obj;
            }
            
            var rePer1= upDown(cp1);
            cPer1=rePer1.num;
            cPer_color1=rePer1.color;
            let classObj = {};
            classObj.groupAcheck=rePer1.icoType;
            
            var rePer2= upDown(cp2);
            cPer2=rePer2.num;
            cPer_color2=rePer2.color;
            classObj.groupAfixs=rePer2.icoType;
            
            var rePer3= upDown(cp3);
            cPer3=rePer3.num;
            cPer_color3=rePer3.color;
            classObj.groupBcheck=rePer3.icoType;
            
            var rePer4= upDown(cp4);
            cPer4=rePer4.num;
            cPer_color4=rePer4.color;
            classObj.groupBfixs=rePer4.icoType;
            this.setState({icoPerType: classObj})

            this.statChart_checkSameMonth_check.setOption(EchartsStat.bar.getCheckOption(serDataA_checksName,serDataA_checksValue,'检查率',cPer1,cPer_color1,maxNum1));
            this.statChart_checkSameMonth_rect.setOption(EchartsStat.bar.getCheckOption(serDataA_fixsName,serDataA_fixsValue,'当场整改率',cPer2,cPer_color2,maxNum2));
            this.statChart_checkAdjacentMonth_check.setOption(EchartsStat.bar.getCheckOption(serDataB_checksName,serDataB_checksValue,'检查率',cPer3,cPer_color3,maxNum3));
            this.statChart_checkAdjacentMonth_rect.setOption(EchartsStat.bar.getCheckOption(serDataB_fixsName,serDataB_fixsValue,'当场整改率',cPer4,cPer_color4,maxNum4));
      }

      _initChart() {
        let self = this;

        if (this.statChart_checkSameMonth_check == null) {
            this.statChart_checkSameMonth_check = echarts.init(document.getElementById('statChart_checkSameMonth_check'));
            this.statChart_checkSameMonth_check.on('click',function(param){
                console.log('statChart_checkSameMonth_check click',param);

                //self.setDisplayType(1);
                //window.model.getUnitSpotData(param.dataIndex+1);
            });
        }

        if (this.statChart_checkSameMonth_rect == null){
            this.statChart_checkSameMonth_rect = echarts.init(document.getElementById('statChart_checkSameMonth_rect'));
            this.statChart_checkSameMonth_rect.on('click',function(param){
                console.log('statChart_checkSameMonth_rect click',param);
                //self.setDisplayType(2);
                //window.model.getUnitSpotData(param.dataIndex+1);
            });
        }

        if (this.statChart_checkAdjacentMonth_check == null){
            this.statChart_checkAdjacentMonth_check  = echarts.init(document.getElementById('statChart_checkAdjacentMonth_check'));
            this.statChart_checkAdjacentMonth_check.on('click',function(param){
                console.log('statChart_checkAdjacentMonth_check click',param);
                //self.setDisplayType(3);
                //window.model.getUnitSpotData(param.dataIndex+1);
            });
        }

        if(this.statChart_checkAdjacentMonth_rect == null) {
            this.statChart_checkAdjacentMonth_rect = echarts.init(document.getElementById('statChart_checkAdjacentMonth_rect'));
            this.statChart_checkAdjacentMonth_rect.on('click',function(param){
                console.log('statChart_checkAdjacentMonth_rect click',param);
                //self.setDisplayType(4);
                //window.model.getUnitSpotData(param.dataIndex+1);
            })
        }

        window.addEventListener("resize",function() {
            self.statChart_checkSameMonth_check.resize();
            self.statChart_checkSameMonth_rect.resize();
            self.statChart_checkAdjacentMonth_check.resize();
            self.statChart_checkAdjacentMonth_rect.resize();
        });

      }

      setDisplayType(id){
         // this.props.cacheData.displayType = id;
      }

      shouldComponentUpdate(nextProps, nextState) {
         return this.props.comsChecks != nextProps.comsChecks
      }

    componentDidUpdate() {
        this.drawChart();
    }

    componentDidMount() {
        this._initChart();
        this.drawChart();
    }

    render() {
        const selTime = ['今天','本周','本月'];
        const stateContent = ['单位自查','监管检查'];

        const {loading, timeType, type, tabIndex, data} = this.props.comsChecks;

        return(
            <div className="statBox" style={{minHeight:'350px',height: 'calc(50% - 20px)',marginTop: 18}}>
                {loading && <LoadingIcon />}
                <div className="stat_tit">
                    <i className="line"></i>
                    <h2>检查单位统计</h2>
                    <div className="divTime" style={{width:'150px',marginTop: '12px'}}>
                        {
                            selTime.map((val,index)=>{
                                return (
                                    <span className={['timeSelect ', (index+1)== type ? 'timeSelects':null].join(' ')} 
                                        onClick={this.stateSelect.bind(this, index)} key = {(index+1).toString()} >{val}</span>
                                )
                            })
                        }   
                    </div>
                </div>
                <div className="stat_con" style={{position:'relative', padding:'10px 0', height: 'calc(100% - 50px)', width: '100%'}}>
                    <div className="stat_con_select">
                        <div className="select_center">
                            {
                                stateContent.map((val,index)=>{
                                    return (
                                        <span className={["center_content ", tabIndex==(index+1)?'tabSpan':null].join(' ')} 
                                        onClick ={this.checkUp.bind(this,index+1)} key = {(index+1).toString()}> {val}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="stit">{timeType}同比</div>
                    <div className={["icoPer icoPerA1 ", this.state.icoPerType.groupAcheck != null?this.state.icoPerType.groupAcheck:null].join(' ')}></div>
                    <div className={["icoPer icoPerA2 ",this.state.icoPerType.groupAfixs != null?this.state.icoPerType.groupAfixs:null ].join(' ')}></div>
                    <div className="statChart fw50" id="statChart_checkSameMonth_check" style={{minHeight:'90px',height: 'calc(50% - 80px)',marginottom:'10px'}}></div>
                    <div className="statChart fw50" id="statChart_checkSameMonth_rect" style={{minHeight:'90px',height: 'calc(50% - 80px)',marginBottom:'10px'}}></div>
                    <div style= {{clear: 'both'}}></div>
                    <div className="stit">{timeType}环比</div>
                    <div className={["icoPer icoPerB1 " ,this.state.icoPerType.groupBcheck!= null?this.state.icoPerType.groupBcheck:null].join(' ')}></div>
                    <div className={["icoPer icoPerB2 ", this.state.icoPerType.groupBfixs!= null?this.state.icoPerType.groupBfixs:null].join(' ')}></div>
                    <div className="statChart fw50" id="statChart_checkAdjacentMonth_check" style={{minHeight:'90px',height: 'calc(50% - 80px)'}}></div>
                    <div className="statChart fw50" id="statChart_checkAdjacentMonth_rect" style={{minHeight:'90px',height: 'calc(50% - 80px)'}}></div>  
                </div>
            </div>
        )

    }
}


var serData = [{"name":"检查消火栓箱及外观破损","count":41,"id":"1","percent":"12.58%","dgPer":"12.58"},
{"name":"防火门被占用，堆放物品","count":21,"id":"2","percent":"6.44%","dgPer":"6.44"},
{"name":"疏散破损，被遮挡","count":13,"id":"3","percent":"3.99%","dgPer":"3.99"},
{"name":"保护距离15-20米内，配置灭火器少于2只","count":53,"id":"4","percent":"16.26%","dgPer":"16.26"},
{"name":"消防车道被侵占","count":63,"id":"5","percent":"19.33%","dgPer":"19.33"},
{"name":"防排烟系统无法远程启动风机","count":12,"id":"6","percent":"3.68%","dgPer":"3.68"},
{"name":"室内消火栓生锈","count":53,"id":"7","percent":"16.26%","dgPer":"16.26"},
{"name":"室外消火栓被遮挡","count":23,"id":"8","percent":"7.06%","dgPer":"7.06"},
{"name":"防火卷帘下堆放杂物","count":47,"id":"9","percent":"14.42%","dgPer":"14.42"}];
var total = 326;

export class Categorystatistics extends Component {

    constructor(props) {
        super(props);
        this.statChart_dangerSpecies = null;
        this.handleSelect = this.handleSelect.bind(this);
        this.setDangerSpecies = this.setDangerSpecies.bind(this);
    }

    setDangerSpecies(index){
       // window.model.setDangerSpeciesDot(index);
    }

    dataCounting = ()=> {
       let data = this.props.cacheData.cache.HighChartsData;
       let len = this.props.cacheData.cache.HighChartsDataLen;
       return [data,len];
    }

    highchartsBuilder = (data,len) => {
        return ({
            chart: {
                type: 'pie',
                backgroundColor: '#15182f00',
                shadow:false,
                options3d: {
                    enabled: true,
                    alpha: 60,
                    beta: 0
                },
                spacing: [-80, 10, 10, 20],
            },
            colors:['#00FF8E','#3CC1FF','#9834FF','#14FFE9','#FCFF00','#FF3C7C','#FEC401','#33FDFF','#FF9603'],
            title: {
                text:"隐患总数",
                style: {
                    color: '#25B4FC',
                    fontSize: '18px',
                    lineHeight: '24px',
                    fontFamily:'Microsoft Yahei'
                },
                verticalAlign:'top',
                floating: true,
                y:125,
            },
            subtitle: {
                useHTML:true,
                text:"<a href='javascript:vm.setDangerSpecies(0)' target='_self' style='color:#11afff'>"+len+"</a>",
                style: {
                    color: '#25B4FC',
                    fontSize: '18px',
                    //fontWeight: 'bold',
                    lineHeight: '24px',
                    fontFamily:'Microsoft Yahei'
                },
                verticalAlign:'top',
                floating: true,
                y:95
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            legend: {
                layout: 'vertical',
                align: 'left', //水平方向位置
                verticalAlign: 'top',
                horizontalAlign:'top',
                labelFormatter: function () {
                    return this.name + ':'+this.percentage+'%';
                },
                itemStyle: {
                    color: '#fff'
                },
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: false,//是否显示注释
                        format: '{point.name}',
                        style: {
                            color :'#fff',
                            textShadow:false,
                            textOutline:"none"//去掉恶心的文字阴影
                        }
                    },
                    showInLegend: false,//是否显示图例
                }
            },
            exporting: {enabled: false},//隐藏导出
            credits: { enabled: false },//隐藏右下角highcharts的链接
        
            series: [{
                type: 'pie',
                name: '隐患占比',
                data: data,
                events:{
                    click: function(e) {
                        //console.log(e.point.index);
                        //var dgType=e.point.name;
                        var index=e.point.index;
                        console.log('highcharts click:',index);
                        // window.model.setDangerSpeciesDot(index);
                    }
                },
            }]
        })
    }

    handleSelect(month){
        // var datdString = date._d;
        // var d = new Date(datdString);  
        // var year=d.getFullYear();
        // var month = d.getMonth() + 1;
        // if(month <10)
        // month = '0'+month;
        // var date = year+'-'+month;
        // console.log(date);
        //this.props.cacheData.time = month;
       // window.model.getDangerSpecies(this.props.cacheData);
    }    
    compare(property) {
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1-value2;
        }
    }

    updateHighChart(){
        var reData = this.props.cacheData.cache.DangerSpeciesData;
        var tmp = reData.dangerList.sort(this.compare('count'));//排序
        reData.dangerList = tmp;
        var seriesData=reData;
        var serData = [];
        var total=seriesData.dangerNum;
        var dgList=seriesData.dangerList;
          for (var i = 0; i < dgList.length; i++) {
              var attr=[];
              attr.push(dgList[i].name);
              attr.push(dgList[i].count);
              serData.push(attr);
              dgList[i].dgPer=(dgList[i].count/total*100).toFixed(2);
          }
        this.props.cacheData.checkStat.dangerSpecies={
          secTime:this.props.cacheData.time,
          dangerList:seriesData.dangerList,
          dgPer:seriesData.dgPer
        }
        console.log(serData,total);
        // this.props.cacheData.cache.relatedId=self.relatedId;
        // this.props.cacheData.cache.DangerSpeciesTime=t;
        // this.props.cacheData.cache.HighChartsData = serData;
        // this.props.cacheData.cache.HighChartsDataLen = total;
      }

    drawHiglightChart(){
       // this.props.cacheData.cache.HighChartsData = serData;
        // if(this.props.cacheData.cache.DangerSpeciesData == null){
        //     // this.initHighChartData();
        //     // this.updateHighChart();
        // }else{
        //     this.updateHighChart();
        // }
    }

    componentWillUpdate(){
      //console.log('Component WILL UPDATE!')
    }

    componentWillMount(){
     // console.log('Component WILL MOUNT!')
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log('Component DID UPDATE!');
        //   this.drawHiglightChart();
    }

    componentDidMount() {

    }

  render() {
        // var HighChartData= this.props.cacheData.cache.DangerSpeciesData;
        // console.log('---',HighChartData);
        // if(HighChartData === null){
        //     this.props.cacheData.cache.HighChartsData = serData;
        // }
        // var HighChartData= this.props.cacheData.cache.DangerSpeciesData;
        // if(HighChartData === null){
        //     HighChartData = {
        //         dangerList:[{ name:'',count:0,percent:'0%'}]
        //     }
        // }
        var HighChartData ={dangerList:serData};
    //  config.series[0].data = this.props.cacheData.cache.HighChartsData;
        // let objectOfDatas = this.dataCounting();
        var chartData = [];
        serData.forEach(item=>{
            let tmp =[];
            tmp.push(item.name);
            tmp.push(item.count);
            chartData.push(tmp);
        });
        var len = total; 
        let objectOfDatas  = [chartData,len];
        let config = this.highchartsBuilder(...objectOfDatas);
      return(
        <div className="statBox mt15" style={{minHeight:'280px',height: 'calc(45% - 0px)'}}>
        {<LoadingIcon />}
        <Frag_ss monthTrigger={this.handleSelect} title="隐患种类统计" month ={2019} />
        <div className="stat_con" style={{height: 'calc(100% - 50px)'}}>
            {/* <div className="statChart fw50" id="statChart_dangerSpecies" style={{minHeight:'180px',height: 'calc(100% - 20px)'}}></div> */}
            <div  className="statChart fw50"  style={{minHeight:'180px',height: 'calc(100% - 20px)'}}>
                <ReactHighcharts  config={config}/>
            </div>
            <div className="dgSpecList fw50 " style={{minHeight:'180px',height: 'calc(100% - 40px)', overflow: 'auto'}}>
                    <ul >
                        {
                        HighChartData.dangerList.map((val,index)=>{
                            return (
                                    <li onClick = {this.setDangerSpecies.bind(this,index)}  key = {(index+1).toString()} >
                                        <div className="dgtop"><i className={'tcolor'+(index+1)}>■</i><b className={'tcolor'+(index+1)}>{val.count}</b><span>{val.percent}</span></div>
                                        <div className="dgcon">{val.name}</div>
                                    </li>
                            )
                            })
                        }
                    </ul>
            </div>
            <div className="hiddenScroll" style={{width:'20px',minHeight:'180px',height: 'calc(100% - 40px)',backgroundColor:'#15182f00', position:'absolute',top:'50px',right:'5%'}} ></div>
            <span className="dgSpecListIconUp dgSpecListIcon"></span>
            <span className="dgSpecListIconDown dgSpecListIcon"></span>
        </div>
    </div>
      )
  }
}