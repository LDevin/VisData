import React, {Component, PureComponent} from 'react';
import {formatDateCN} from '../../../../public/plugins/common';

function HeadRight(props) {
    return(
        <div className="topRight">
            <div className='' style={{float: 'left', marginRight: 10}}>
                <span className='user_icon'></span><span>欢迎您</span>
            </div>
            <div className='' style={{float: 'right'}}>
                <a href="javascript:void();" className="exit_ico"></a><span>退出登录</span>
            </div>
        </div>
    );
}

class DynamicScroll extends Component {
    
    constructor() {
        super();
        this.state = {msg: '消防大数据综合业务平台!'}
    }

    render() {
        return(
            <div className="dynamic">
            <marquee direction="left" behavior="scroll" scrollamount="4" 
            scrolldelay="0" loop="loop" width="100%" height="100%" >
            <span id="checkAlarm" style={{width: '100%',marginTop: '0'}}>{this.state.msg}</span>
            </marquee>
            </div>
        );
    }
}

class CenterLogo extends PureComponent {

    constructor() {
        super();
        this.state = {date: formatDateCN(new Date().getTime())}
    }

    componentDidMount() {
        let self = this;
        this.topTime = setInterval(function (){
            let curTime=formatDateCN(new Date().getTime());
            self.setState({date: curTime});
        }, 1000);
    }

    componentWillMount() {
        clearInterval(this.topTime);
    }
    
    render() {
       return(
        <div className="logo"><h1></h1><span>{this.state.date}</span></div>
       )
    }
}

export default class App extends Component {

    constructor() {
        super();
    }
    _click = (index) => {
        this.props.onChgMenu(index)
    }
    render() {
        return(
            <div className="head-menu" id="head">
                <DynamicScroll />
                <CenterLogo />
                <HeadRight />
                <div className='center-menu'>
                    <div className='mli' style={{float: 'left'}}><div className={this.props.menuNum === 0 ? 'cur' : ''} 
                    style={{float: 'left'}} onClick={()=>this._click(0)}>即时信息</div></div>
                    <div className='mli' style={{float: 'right'}}><div className={this.props.menuNum === 1 ? 'cur' : ''} 
                    style={{float: 'right'}} onClick={()=>this._click(1)}>消防管理</div></div>
                </div>
            </div>
        )
    }
}
