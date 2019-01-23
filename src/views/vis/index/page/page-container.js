import React, {Component} from 'react';
import {connect} from 'react-redux';
import bindActions from 'bindActions';

import '../../../../public/resources/css/page.css';

import HeadMenu from './head-menu';
import LeftMenu from './left-menu';
import RightMenu from './right-menu';

import {chgMenu} from 'models';

const mapStateToProps = state => {
    return {
        com: state.com,
        base: state.base,
    }
}

const mapDispathToProps = dispatch => {
    return {
        onChgMenu: (index) => {
            console.log('index ', index)
            let action = bindActions.changeCom({type:'CH_MENU', payload:index});
            dispatch(action);
        }
    }
}

class App extends Component {

    chgMenu = (index) => {
        this.props.onChgMenu(index)
        chgMenu(this.props.com.menuNum)
    }

    constructor() {
        super()
        this.state = {style: {height: (window.innerHeight - 90)+'px'}}
        this._resize = this._resize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize');
    }

   _resize() {
        let height = (window.innerHeight - 90)+'px';
        this.setState({...this.state, style: {height: height}})
   }

    render() {
        const style = {height: '200px', width: '206px', position: 'absolute', top: '112px', 
        left: '403px', border: '1px solid #203B60', zIndex: '2000',cursor: 'pointer'};

        return(
            <div className="page-container" id="index">
                <HeadMenu menuNum={this.props.com.menuNum} onChgMenu={this.chgMenu} />
                <LeftMenu style={this.state.style} base={this.props.base} com={this.props.com} />
                <RightMenu style={this.state.style} base={this.props.base} com={this.props.com}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispathToProps)(App)