import React, {Component} from 'react';
import {connect} from 'react-redux';
import bindActions from 'bindActions';
import Store from 'store';

import {DeviceRunStatistics, DeviceWarnStatistics, DeviceResponce} from './container/left-device-monitor.js';
import {FireInspection} from './container/left-instant';
import {Unitstatistics} from './container/right-fireControlMgn';

import ItemSelect from '../../../../public/tools/item-select';

import {fetchDevRunStatus, fetchDevAlarmStatus, 
    fetchDevResDetails,fetchDevRunDetails, fetchDevAlarmDetails} from 'models';

const mapStateToProps = state => {
    return {
        devRes: state.cache.devRes,
        devRunStatus: state.cache.devRunStatus,
        devAlarmStatus: state.cache.devAlarmStatus,
        fireChecks: state.cache.fireChecks,
        comsChecks: state.cache.comsChecks,
    }
}

const mapDispathToProps = dispatch => {
    return {
        itemSelected: (index) => {
            console.log('index ',index)
            dispatch(bindActions.changeCom({type: 'CH_COM_SYSTYPE', payload: index}));
        },
        onDevResDetails: (type) => {
            dispatch(fetchDevResDetails(type));
        },
        onDevRunDetails: (type, deviceType) => {
            dispatch(fetchDevRunDetails(type, deviceType))
        },
        onDevAlarmDetails: (type, deviceType) => {
            dispatch(fetchDevAlarmDetails(type, deviceType))
        }
    }
}

class App extends Component {

    selected = (index) => {
        this.props.itemSelected(index)
        const fetchDevRun = fetchDevRunStatus(this.props.com.systemType)
        const fetchDevAlarm = fetchDevAlarmStatus(this.props.com.systemType)
        Store.dispatch(fetchDevRun)
        Store.dispatch(fetchDevAlarm)
    }

    _rendByCondition(index) {
        const {style, base, com} = this.props;
        
        let html = null;
        switch(index) {
            case 0: {
                const items = ["火灾自动报警","视频监控系统","室内水压控制","电器火灾监控"];
                const {devRes, devRunStatus, devAlarmStatus} = this.props;

                html = <div className="left-menu" id="left" style={style}>
                <DeviceResponce EquStatusData={devRes.data} resDateTime={devRes.date} deviceStatus={devRes.loading} devRes={devRes}
                onDevResDetails={this.props.onDevResDetails}/>
                <DeviceRunStatistics EquStatusOnlineData={devRunStatus.data} deviceOnOffStatus={devRunStatus.loading}
                onDevRunDetails={this.props.onDevRunDetails}/>
                <DeviceWarnStatistics EquAlarmProData={devAlarmStatus.data} deviceAlarmStatus={devAlarmStatus.loading}
                onDevAlarmDetails={this.props.onDevAlarmDetails}/>
                <ItemSelect style={{position: 'absolute', left: 'calc(100% + 20px)', bottom: 'calc(30% - 10px)', width: 200}}
                 items={items} activedIndex={com.systemType} setItemSelected={this.selected}/>
             </div>
            } break;
            case 1: {
                const {fireChecks, comsChecks} = this.props

            html = <div className="left-menu" id="left" style={style}>
                <FireInspection base={base} fireChecks={fireChecks}/>
                <Unitstatistics base={base} comsChecks={comsChecks}/>
            </div>
            } break;
        }

        return html;    
    }

    render() {
        return(
            this._rendByCondition(this.props.com.menuNum)
        );
    }
}

export default connect(mapStateToProps, mapDispathToProps)(App);