import React, {Component} from 'react';

export default class ItemSelect extends Component {

    constructor() {
        super();
    }

    _click = (index) => {
        this.props.setItemSelected(index)
       // this.props.cacheData.systemType = index;
        // window.model.getNanNingOnlineStatus(this.props.cacheData);
        // window.model.getNanNingAlarmStatus(this.props.cacheData);
    }

    render() {
        const {items, style, activedIndex} = this.props;

        const cls0 ='left-device-clk left-dev-clk1'
        const cls1 ='left-device-clk left-dev-clk2'
        const cls2 ='left-device-clk left-dev-clk3'
        const cls3 ='left-device-clk left-dev-clk4'
        const cls4 ='left-device-clk left-dev-clk5'

        let style_0 =  {background: "url(" + (activedIndex === 0 ? require("../resources/images/icon_all_sel.png") : 
        require("../resources/images/icon_all.png")) + ") no-repeat left center"}
        let style_1 =  {background: "url(" + (activedIndex === 1 ? require("../resources/images/icon_fire_sel.png") : 
        require("../resources/images/icon_fire.png")) + ") no-repeat left center"}
        let style_2 =  {background: "url(" + (activedIndex === 8 ? require("../resources/images/icon_vedio_sel.png") : 
        require("../resources/images/icon_vedio.png")) + ") no-repeat left center"}
        let style_3 =  {background: "url(" + (activedIndex === 6 ? require("../resources/images/icon_water_sel.png") : 
        require("../resources/images/icon_water.png")) + ") no-repeat left center"}
        let style_4 =  {background: "url(" + (activedIndex === 5 ? require("../resources/images/icon_electric_sel.png") : 
        require("../resources/images/icon_electric.png")) + ") no-repeat left center"}

        return(
            <div style={style}>
                    <div className= {cls1} onClick={() => this._click(1)} style={style_1}>
                        {activedIndex === 1 && <span>{items[0]}</span>}</div>
                    <div className= {cls2} onClick={() => this._click(8)} style={style_2}>
                        {activedIndex === 8 && <span>{items[1]}</span>}</div>
                    <div className= {cls3} onClick={() => this._click(6)} style={style_3}>
                        {activedIndex === 6  && <span>{items[2]}</span>}</div>
                    <div className= {cls4} onClick={() => this._click(5)} style={style_4}>
                        {activedIndex === 5 && <span>{items[3]}</span>}</div>
            </div>
        )
    }
}