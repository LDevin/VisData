import React, {Component} from 'react';
import './css/msg-tips.css';

export default function MsgTips(props) {

    const _style = {left: 'calc(50% - 30px)', top: 'calc(50% - 0px)'};
    
    return(
        <div className='dialog-msg-tips' style={_style}>
            <div className="dialog-msg-content">{props.content}</div>
        </div>
    )
} 