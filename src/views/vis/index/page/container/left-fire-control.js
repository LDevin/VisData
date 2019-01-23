import React, {Component} from 'react';
import {Frag_ss, Frag_s} from '../../tools/utils';
import LoadingIcon from '../../tools/loading'

import moment from 'moment';
const month_format = 'YYYY-MM';
const month_now = moment().format(month_format);

//重点单位检查统计
export class SuperUnitStatistics extends Component {

    monthTrigger(month) {
        window.model.getSuperUnitStatistics(month);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.cacheData != nextProps.cacheData
    }

    render() {
        const {cacheData, isLoad, superTime} = this.props;
        const res = cacheData;
        
        return(
            <div className="statBox" style={{minHeight:'200px',height: 'calc(34% - 0px)'}}>
            {isLoad && <LoadingIcon/>}
            
            <Frag_ss monthTrigger={this.monthTrigger.bind(this)} title="重点单位检查统计" month={superTime}/>
            <div className="stat_con" style={{padding:'10px 20px', height: 'calc(100% - 70px)'}}>
                <div className="total_Li mb10">
                    <div className="perInfo" style={{width: '100%', height: '100%', float: 'right'}}>
                        <p className="perTit">
                            <span><i className="cnum1">复核数/检查数</i> / 单位总数</span>
                            <b><i className="cnum1">{res.formauthed}/{res.forms}</i>/{res.orgs}</b>
                        </p>
                        <div className="perBar barbg1">
                            <span className="jc_per cbg1" style={{zIndex:'200', backgroundColor: 'rgb(37, 180, 252)',width: '0.2%'}}></span>
                            <span className="jc_per cbg1" style={{width: '37.5%'}}></span>
                        </div>
                        <div className="perInfo_last">
                            <span className="perInfo_first_span">
                            检查率：
                            <span className="perInfo_last_span textHover" onClick={() => window.model.getStatisticsDetail(2, 1, superTime)}>
                            {res.orgs === 0 ? 0 : (res.forms/res.orgs*100).toFixed(1)}%</span>
                            </span>
                            <span className="perInfo_first_span">
                            复核率：
                            <span className="perInfo_last_span textHover" onClick={() => window.model.getStatisticsDetail(2, 2, superTime)}>
                            {res.orgs === 0 ? 0 : (res.formauthed/res.orgs*100).toFixed(1)}%</span>
                            </span>
                        </div>
                    </div>
                </div>
                
                {/*********/}
                <div className="total_Li">
                    <div className="perInfo" style={{width: '100%', height: '100%', float: 'right'}}>
                        <p className="perTit">
                            <span><i className="cnum1">复核数/整改数</i> / 隐患总数</span>
                            <b><i className="cnum1">{res == null ? 0 : res.dangerauthed}/{res == null ? 0 : res.fixed}</i>
                            /{res == null ? 0 : res.dangers}</b>
                        </p>
                        <div className="perBar barbg1">
                            <span className="jc_per cbg1" style={{zIndex:'200', backgroundColor: 'rgb(37, 180, 252)',width: '0.2%'}}></span>
                            <span className="jc_per cbg1" style={{width: '37.5%'}}></span>
                        </div>
                        <div className="perInfo_last">
                            <span className="perInfo_first_span">
                            整改率：
                            <span className="perInfo_last_span textHover" onClick={() => window.model.getStatisticsDetail(2, 3, superTime)}>
                            {res.dangers === 0 ? 0 : (res.fixed/res.dangers*100).toFixed(1)}%</span>
                            </span>
                            <span className="perInfo_first_span">
                            复核率：
                            <span className="perInfo_last_span textHover" onClick={() => window.model.getStatisticsDetail(2, 4, superTime)}>
                            {res.dangers === 0 ? 0 : (res.dangerauthed/res.dangers*100).toFixed(1)}%</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

//一般单位检查统计
export class CommonUnitStatistics extends Component {
    
    monthTrigger(month) {
        window.model.getCommonUnitStatistics(month);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.cacheData != nextProps.cacheData
    }

    render() {
        const {cacheData, isLoad, commonTime} = this.props;
        const res = cacheData;

        return(
            <div className="statBox mt15" style={{minHeight:'200px',height: 'calc(34% - 0px)'}}>
            {isLoad && <LoadingIcon/>}
           
            <Frag_ss monthTrigger={this.monthTrigger.bind(this)} title="一般单位检查统计" month={commonTime}/>
            <div className="stat_con" style={{padding:'10px 20px', height: 'calc(100% - 70px)'}}>
                <div className="total_Li mb10">
                    <div className="perInfo" style={{width: '100%', height: '100%', float: 'right'}}>
                        <p className="perTit">
                            <span><i className="cnum1">复核数/检查数</i> / 单位总数</span>
                            <b><i className="cnum1">{res.formauthed}/{res.forms}</i>/{res.orgs}</b>
                        </p>
                        <div className="perBar barbg1">
                            <span className="jc_per cbg1" style={{zIndex:'200', backgroundColor: 'rgb(37, 180, 252)',width: '0.2%'}}></span>
                            <span className="jc_per cbg1" style={{width: '37.5%'}}></span>
                        </div>
                        <div className="perInfo_last">
                            <span className="perInfo_first_span">
                            检查率：
                            <span className="perInfo_last_span textHover" onClick={() => window.model.getStatisticsDetail(1, 1, commonTime)}>
                            {res.orgs === 0 ? 0 : (res.forms/res.orgs*100).toFixed(1)}%</span>
                            </span>
                            <span className="perInfo_first_span">
                            复核率：
                            <span className="perInfo_last_span textHover" onClick={() => window.model.getStatisticsDetail(1, 2, commonTime)}>
                            {res.orgs === 0 ? 0 : (res.formauthed/res.orgs*100).toFixed(1)}%</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/*********/}
                <div className="total_Li">
                    <div className="perInfo" style={{width: '100%', height: '100%', float: 'right'}}>
                        <p className="perTit">
                            <span><i className="cnum1">复核数/整改数</i> / 隐患总数</span>
                            <b><i className="cnum1">{res == null ? 0 : res.dangerauthed}/{res == null ? 0 : res.fixed}</i>
                            /{res == null ? 0 : res.dangers}</b>
                        </p>
                        <div className="perBar barbg1">
                            <span className="jc_per cbg1" style={{zIndex:'200', backgroundColor: 'rgb(37, 180, 252)',width: '0.2%'}}></span>
                            <span className="jc_per cbg1" style={{width: '37.5%'}}></span>
                        </div>
                        <div className="perInfo_last">
                            <span className="perInfo_first_span">
                            整改率：
                            <span className="perInfo_last_span textHover" onClick={() => window.model.getStatisticsDetail(1, 3, commonTime)}>
                            {res.dangers === 0 ? 0 : (res.fixed/res.dangers*100).toFixed(1)}%</span>
                            </span>
                            <span className="perInfo_first_span">
                            复核率：
                            <span className="perInfo_last_span textHover" onClick={() => window.model.getStatisticsDetail(1, 4, commonTime)}>
                            {res.dangers === 0 ? 0 : (res.dangerauthed/res.dangers*100).toFixed(1)}%</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

//三小场所检查统计
export class SanxiaoUnitStatistics extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.cacheData != nextProps.cacheData
    }
    
    render() {
        const {cacheData, isLoad} = this.props;
        const res = cacheData;

        return(
            <div className="statBox mt15" style={{minHeight:'180px',height: 'calc(32% - 42px)'}}>
            {isLoad && <LoadingIcon/>}
                <Frag_s title="三小场所检查统计"/>
                <div className="stat_con" style={{padding:'10px 20px', height:'calc(100% - 70px)'}}>
                    <div className="total_Li mb10">
                        <div className="perTxt">
                            <b className="cnum3 textHover" onClick={() => window.model.getStatisticsDetail(3, 1, month_now)}>
                            {res.orgs === 0 ? 0 : (res.forms/res.orgs*100).toFixed(1)}%</b>
                            <span className="cname">检查率</span>
                        </div>
                        <div className="perInfo">
                            <p className="perTit">
                                <span><i className="cnum3">已检查场所数</i>/场所总数</span><b><i className="cnum3">{res.forms}
                                </i>/{res.orgs}</b>
                            </p>
                            <div className="perBar barbg3">
                                <span className="jc_per cbg3" style={{width:'7.5%'}}></span>
                            </div>
                        </div>
                    </div>
                    <div className="total_Li">
                        <div className="perTxt">
                            <b className="cnum3 textHover" onClick={() => window.model.getStatisticsDetail(3, 2, month_now)}>
                            {res.dangers === 0 ? 0 : (res.fixed/res.dangers*100).toFixed(1)}%</b>
                            <span className="cname">整改率</span>
                        </div>
                        <div className="perInfo">
                            <p className="perTit">
                                <span><i className="cnum3">整改数</i>/隐患总数</span><b><i className="cnum3">{res.fixed}</i>
                                /{res.dangers}</b>
                            </p>
                            <div className="perBar barbg3">
                                <span className="jc_per cbg3" style={{width:'7.5%'}}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}