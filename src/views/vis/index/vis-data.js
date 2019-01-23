import React from 'react';
import {connect} from 'react-redux';

import '../../../public/resources/css/common.css';
import MapContainer from './map/index';

import LoadingIcon from '../../../public/tools/loading';
import ErrorMsgTips from '../../../public/tools/msg-tips';
import PageContainer from './page/page-container';

import Store from 'store';
import {chgMenu} from 'models';

const mapStateToProps = state => {
    return {
        base: state.base,
    }
}

const mapDispathToProps = dispatch => {
    return {
        onClick: (index) => {
        }
    }
}

class App extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        chgMenu(Store.getState().com.menuNum)
    }

    render() {
        const {errMsg, errMsgShow, loading} = this.props.base;

        return(
            <div>
                {errMsgShow && <ErrorMsgTips content={errMsg}/>}
                {loading && <LoadingIcon />}
                <MapContainer />
                <PageContainer />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispathToProps)(App);