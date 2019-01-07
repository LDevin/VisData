import React from 'react';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';

import '../../../public/resources/css/common.css';
import '../../../public/resources/css/shop.css';
import Section from './page/sections';
import MapContainer from './map/index';

import {request, post, get, login} from 'helper';
import UTIL from 'utils';
import bindActions from 'bindActions';

import Store from 'store';

import {fetchDangers, testPost,fetchStreetLabel,fetchChecks,fetchUnits} from 'models';

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

class App extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
         var data = {userName: 'nnadmin', password: '888888', clientId: 'client'};

         const action = fetchDangers();
         const testAction = testPost('')
         const fetchStreet = fetchStreetLabel();
         const fetchCh = fetchChecks();
         const fetchUns = fetchUnits();

         Store.dispatch(action)
         Store.dispatch(testAction)
         Store.dispatch(fetchStreet)
         Store.dispatch(fetchCh)
         Store.dispatch(fetchUns)

        login(data).then(err => {
            console.log('err ', err);
            console.log('access_token ', UTIL.getToken());
        });   
    }
    
    componentDidUpdate() {
        console.log('update non')
    }

    render() {
        return(
            <div>
                <MapContainer />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispathToProps)(App);