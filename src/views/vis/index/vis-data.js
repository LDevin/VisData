import React from 'react';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';

import '../../../public/resources/css/common.css';
import '../../../public/resources/css/shop.css';
import Section from './page/sections';
import MapContainer from './map/index';

import {request, post, login} from 'helper';
import UTIL from 'utils';
import bindActions from 'bindActions';

import Store from 'store';
import Devin from './data.json';

const mapStateToProps = state => {
    return {userName: state.user.name}
}

const mapDispathToProps = dispatch => {
    return {
        onClick: (index) => {
            console.log('clicked');
           let action = bindActions.changeUserName('laiddddevin');
           if (index === 2)
                action = bindActions.changeBase('5555555');

           dispatch(action);
           console.log(' day = ', Store.getState().base.day);
        }
    }
}

var fetchAjax = ()=> {
    return dispatch => {

        var data = {userName: 'nnadmin', password: '888888', clientId: 'client'}

        post('/oauth/token', data, 2).then(data => {
            console.log('data ', data);
            
            let action = bindActions.changeUserName(data.body.data.token.access_token);
            dispatch(action);
        })
    }
}

class Index extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        var data = {userName: 'nnadmin', password: '888888', clientId: 'client'};

        const action = fetchAjax();

        Store.dispatch(action)
        //console.log('version ', Congif.version);

        login(data).then(err => {
            console.log('err ', err);
            console.log('access_token ', UTIL.getToken());
        });
    }
    
    componentDidUpdate() {
        console.log('update non')
    }

    render() {

        // <div className='top'>这是头部</div>
        // <div className='test_section'>
        //     <a href='/index/index'>首页</a>
        //     <a href='javascript:void();'>商城</a>
        // </div>
        // <div>{this.props.userName}</div>
        // <div className='shop-content'>
        //     <img src={require('../../../public/resources/images/img_map_longgang.png')}/>
        // </div>
        // <div className='bottom'>这是底部</div>

        // <div className='bottom' onClick={()=>this.props.onClick(1)}>点击</div>
        // <div className='bottom' onClick={()=>this.props.onClick(2)}>点击2</div>

        // <Section />

        return(
            <div>

                <MapContainer />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Index);