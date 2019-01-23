import React, {Component} from 'react';
import MonthPicker from '../tools/month-picker';
import DatePicker from '../tools/date-picker';

import './css/utils.css';


function Frag_s(props) {
    return(
        <div className="stat_tit"><i className="line"></i><h2>{props.title}</h2>
            <div className={props.className} style={{float: 'right', fontSize: 12, 
            textAlign: 'center', color: '#ffffff',marginTop: 2}}>{props.subtitle}</div>
        </div>
    )
}

function Frag_ss(props) {
    return (
        <div className="stat_tit"><i className="line"></i><h2>{props.title}</h2> 
            <MonthPicker selectMonth={props.monthTrigger} month={props.month}/>
        </div>
    )
}

function Frag_sss(props) {
    return (
        <div className="stat_tit"><i className="line"></i><h2>{props.title}</h2>
            <div className={props.className} style={{float: 'right', height: '100%', width: '60%'}}>
                <div id='frag_sss_sub_id' className='frag_sss_sub' onClick={props.onClick}>{props.subtitle}</div>
                <DatePicker style={{float:'right', width: 120, height: 20}} selectDate={props.dateTrigger} date={props.date}/>
            </div>
        </div>
    )
}

export {Frag_s, Frag_ss, Frag_sss}