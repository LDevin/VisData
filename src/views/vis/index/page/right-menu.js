import React, {Component} from 'react';
import {connect} from 'react-redux';
import bindActions from 'bindActions';
import Store from 'store';

import {RiskUnitChunk, ProtectAreaChunk, FireProbabilityChunk} from './container/left-warning';

import FireRescue from './container/right-fire-rescue'; 

const mapStateToProps = state => {
    return {
        netComs: state.cache.netComs,
        devNets: state.cache.devNets,

        comsChunks: state.cache.comsChunks,
        areaChunks: state.cache.areaChunks,
        fireChunks: state.cache.fireChunks,
    }
}

const mapDispathToProps = dispatch => {
    return {
        onClick: (index) => {
        },
    }
}

class App extends React.Component {

    _rendByCondition(index){
        const {style, com} = this.props;
        let html = null;

        switch(index){
            case 0:{
                const {netComs, devNets} = this.props;
                html = <div className='right-menu' style={style}>
                    <FireRescue netComs={netComs} devNets={devNets} com={com}/>
                </div>
            }
            break;

            case 1:{
                const {comsChunks, areaChunks, fireChunks} = this.props;
                html = <div className='right-menu' style={style}>
                    <RiskUnitChunk comsChunks={comsChunks}/>
                    <ProtectAreaChunk areaChunks={areaChunks}/>
                    <FireProbabilityChunk fireChunks={fireChunks}/>
                    </div>
            }
            break;
        }

        return html;
    }


    render () {
        return (
            this._rendByCondition(this.props.com.menuNum)
        );
    }
}

export default connect(mapStateToProps, mapDispathToProps)(App);

