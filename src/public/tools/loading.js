import React, {Component} from 'react';

import './css/loading.css';

export default function LoadingIcon(props) {

    const _style = {left: 'calc(50% - 0px)', top: 'calc(50% - 0px)'};

    return(
        <div className="spinner" style={_style}>
            <div className="spinner-container container1">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
            </div>
            <div className="spinner-container container2">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
            </div>
            <div className="spinner-container container3">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
            <div className="circle4"></div>
        </div>
    </div>
    )
}