/** wangkangsheng 2018-07-24 */
;

//by函数接受一个成员名字符串做为参数
//并返回一个可以用来对包含该成员的对象数组进行排序的比较函数

var by = function (name) {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                //return a < b ? -1 : 1;//升序
                return a > b ? -1 : 1;//降序
            }
            //return typeof a < typeof b ? -1 : 1;//升序
            return typeof a > typeof b ? -1 : 1;//降序
        }
        else {
            throw ("error");
        }
    }
};

/*var zrColor = require('zrender/tool/color');
var colorList = [
    '#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
    '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'
];

var itemStyle = {
    normal: {
        color: function(params) {
            if (params.dataIndex < 0) {
                // for legend
                return zrColor.lift(
                    colorList[colorList.length - 1], params.seriesIndex * 0.1
                );
            }
            else {
                // for bar
                return zrColor.lift(
                    colorList[params.dataIndex], params.seriesIndex * 0.1
                );
            }
        }
    }
};*/

//标题文字竖排
function showVertical(val){
    return val.split('').join('\n');
}

var EchartsStat = {
    bar: {

    	/** 消防检查-检查单位统计 */
        getCheckOption: function (serData_name,serData_per,tit,comparePer,comparePerColor,maxNum) {
            return{
                title: {
                    x:'15px',
                    y:'10px',
                    text: showVertical(tit),
                    //text: tit,
                    textStyle: {
                        fontSize: 12,
                        //fontWeight: 'bolder',
                        color: '#1C90CA'          // 主标题文字颜色
                    },
                    /*subtext: '('+comparePer+')',
                    subtextStyle: {
                        color: comparePerColor , // 副标题文字颜色
                        fontSize: 12
                    },*/
                    textAlign:'center',
                    itemGap:5,
                },
                color: ['#FC9372','#62A7CF','#f4cf6d','#58be50','#6dd6c3'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#FFF'
                        }
                    },
                    formatter: function(datas)
                    {
                        var res = datas[0].name + '<br/>', val;
                        for(var i = 0, length = datas.length; i < length; i++) {
                            val = (datas[i].value);
                            res += datas[i].seriesName + '：' + val + '<br/>';
                        }
                        return res;
                    },
                },
                grid: {
                    left: '30px',
                    right: '10px',
                    top: '20px',
                    bottom:'10px',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        //show: false,
                        data: serData_name,
                        axisPointer: {
                            type: 'shadow'
                        },
                        // x轴的字体样式
                        axisLabel: {
                            show: true,
                            //margin:2,
                            textStyle: {
                                color: '#1C90CA',
                                fontSize:'12'
                            }
                        },
                        // y轴的颜色和宽度
                        axisLine:{
                            lineStyle:{
                                color:'#374b6e',
                                width:1
                            }
                        },
                    }
                ],
                yAxis: [
                    {
                        splitLine:{show: false},//去除网格线
                        //splitArea : {show : true}//保留网格区域

                        //控制y轴刻度是否显示
                        axisTick: {
                            show: false
                        },
                        type: 'value',
                        //show: false,
                        //name: "检查率",
                        min: 0,
                        max: maxNum,
                        interval: 20,
                        // y轴的字体样式
                        axisLabel: {
                            show: false,
                            textStyle: {
                                color: '#1C90CA'
                            },
                            formatter: '{value}%'
                        },
                        // y轴的颜色和宽度
                        axisLine:{
                            lineStyle:{
                                color:'#374b6e',
                                width:1
                            }
                        },


                    }
                ],
                series: [
                    {
                        name:'',
                        type:'bar',
                        barWidth: '20%',
                        //itemStyle: itemStyle,
                        itemStyle: {
                             normal: {
                                 color: function(params) {
                                     // build a color map as your need.
                                     var colorList = [
                                     '#01dacf','#27a0f9'
                                     ];
                                     return colorList[params.dataIndex]
                                 },

                                 //color: '#C1232B',
                                 label: {
                                     show: true,
                                     position: 'top',
                                     fontWeight: 'bolder',
                                     color:comparePerColor,
                                     //formatter: '{c}%'
                                     formatter: function(params) {
                                         if(params.dataIndex=='1'){
                                             return comparePer;
                                         }else{
                                             return "";
                                         }
                                     },
                                 }
                             }
                         },
                        data:serData_per,
                    }
                ]
            }
        },

        //获取数据 联网设施品牌 龙岗区设施品牌完好率情况
        getEquBrandCompleteOption: function (name,seriesName,dataName,dataVal,colorList) {
            return{
                title: {
                	x:'center',
                    y:'bottom',
                    text: name,
                    textStyle: {
                        fontSize: 14,
                        //fontWeight: 'bolder',
                        color: '#1C90CA'          // 主标题文字颜色
                    },
                    //textAlign:'center',
                },
                color: colorList,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#FFF'
                        }
                    },
                    formatter: function(datas)
                    {
                        var res = datas[0].name + '<br/>', val;
                        for(var i = 0, length = datas.length; i < length; i++) {
                            val = (datas[i].value)+'%';
                            res += datas[i].seriesName + '：' + val + '<br/>';
                        }
                        return res;
                    },
                },
                grid: {
                    left: '20px',
                    right: '20px',
                    top: '30px',
                    bottom:'40px',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: dataName,
                    axisPointer: {
                        type: 'shadow'
                    },
                    // x轴的字体样式
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#1C90CA',
                            fontSize:'12'
                        }
                    },
                    // y轴的颜色和宽度
                    axisLine:{
                        lineStyle:{
                            color:'#174266',
                            width:1
                        }
                    },
                },

                yAxis: {
                    splitLine:{show: false},//去除网格线
                    type: 'value',
                    //show: false,
                    name: "百分比(%)",
                    min: 0,
                    max: 100,
                    interval: 20,
                    // y轴的字体样式
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#1C90CA'
                        },
                        formatter: '{value}'
                    },
                    // y轴的颜色和宽度
                    axisLine:{
                        lineStyle:{
                            color:'#27669c',
                            width:1
                        }
                    },
                },
                series: [{
                    name: seriesName,
                    data: dataVal,
                    type: 'bar',
                    //barWidth: '30%',
                    barWidth: '15px',
                }]
            };
        },

        getIndustryInfoOption:function(legendName,xAxisData,sanxiao_color,sanxiao_data,
            normal_color,normal_data,danger_color,danger_data,imp_color,imp_data){
                // console.log(sanxiao_data,normal_data,danger_data,imp_data)
            var total_data = function(){
                var dataArr = [];
                for(var i =0;i<normal_data.length;++i){
                    dataArr.push(normal_data[i]+imp_data[i]);
                }
                return dataArr;
            }();
            return  {
                title:{
                    text:'联网企业数',
                    textStyle:{
                        color:"#ffffff",
                    },
                    right:'center',
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                legend: {
                    data: legendName,
                    top:'30px',
                    textStyle:{
                        color:"#ffffff"
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                    axisLine: {show:false},
                },
                xAxis:  {
                     type: 'category',
                    data: xAxisData,
                    axisTick: {show:false},
                    axisLine:{
                        lineStyle:{
                            color:"#ffffff",
                        }
                    },
                    axisLabel:{
                        interval:0,
                        rotate:40
                    }
                },
                yAxis: {
                   type: 'value',
                   axisTick: {show:false},
                   axisLabel: {show:false},
                   splitArea: {show:false},
                   splitLine: {show:false},
                   axisLine:{
                    lineStyle:{
                        color:"#ffffff",
                    }
                }
                },
                series: [
                    // {
                    //     name: '三小单位',
                    //     type: 'bar',
                    //     stack: '总量',
                    //     label: {
                    //         normal: {
                    //             position: 'insideRight'
                    //         }
                    //     },
                    //     itemStyle:{
                    //         normal:{color:sanxiao_color}
                    //     },
                    //     data: sanxiao_data
                    // },
                    {
                        name: '一般单位',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                position: 'insideRight'
                            }
                        },
                        itemStyle:{
                            normal:{color:normal_color}
                        },
                        data:normal_data
                    },
                    {
                        name: '高危单位',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                position: 'insideRight'
                            }
                        },
                        itemStyle:{
                            normal:{color:danger_color}
                        },
                        data: danger_data
                    },
                    {
                        name: '重点单位',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                position: 'insideRight'
                            }
                        }, 
                        itemStyle:{
                            normal:{color:imp_color}
                        },
                        data: imp_data
                    },
                    {
                        name: '总量',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                offset:['50', '80'],
                                show: true,
                                position: 'insideBottom',
                                formatter:'{c}',
                                textStyle:{ color:'#ffffff' }
                            }
                        },
                        itemStyle:{
                            normal:{
                                color:'rgba(128, 128, 128, 0)'
                            }
                        },
                        data: total_data
                    }
                    
                ]
            };
        },

        getPoliceSortOption:function(yAxisData,dataColor,tooltip1,tooltip2,tooltip3,tooltip4,totalNum,total_1_num,total_2_num,total_3_num,total_4_num,percent_1,percent_2,percent_3,percent_4){
            var mycolor = dataColor;
            return {
                grid: {
                    left: '3%',
                    right: '5%',
                    bottom: '10%',
                    top:'5%',
                    containLabel: true
                },
                tooltip: {
                    show:"true",
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'none' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        var tar = params[1];
                        var tar1 = params[0];
                        var tar2 = params[2];
                        var tar3 = params[3];
                        var tar4 = params[4];
                        return tar.name + '<br/>' + 
                        tar.seriesName + ' : ' + tar.value+"/"+percent_2+'<br/>'+
                        tar1.seriesName+" : "+tar1.value+"/"+percent_1+'<br/>'+
                        tar2.seriesName+" : "+tar2.value+"/"+percent_3+'<br/>'+
                        tar3.seriesName+" : "+tar3.value+"/"+percent_4+'<br/>';
                    }
                },
                xAxis:  {
                    type: 'value',
                    axisTick : {show: false},
                    axisLine: {
                        show: false,
                        lineStyle:{
                            color:'#fff',
                        }
                    },
                    axisLabel:{show:false},
                    splitLine: {
                        show: false
                    },
                },
                yAxis: [
                        {
                            type: 'category',
                            axisTick : {show: false},
                            axisLine: {
                                show: false,
                                lineStyle:{
                                    color:'#fff',
                                }
                            },
                            data: yAxisData
                        },
                        {
                            type: 'category',
                            axisLine: {show:false},
                            axisTick: {show:false},
                            axisLabel: {show:false},
                            splitArea: {show:false},
                            splitLine: {show:false},
                            data:yAxisData
                        },
                        {
                            type: 'category',
                            axisLine: {show:false},
                            axisTick: {show:false},
                            axisLabel: {show:false},
                            splitArea: {show:false},
                            splitLine: {show:false},
                            data: yAxisData
                        },
                        {
                            type: 'category',
                            axisLine: {show:false},
                            axisTick: {show:false},
                            axisLabel: {show:false},
                            splitArea: {show:false},
                            splitLine: {show:false},
                            data: yAxisData
                        },
                        {
                            type: 'category',
                            axisLine: {show:false},
                            axisTick: {show:false},
                            axisLabel: {show:false},
                            splitArea: {show:false},
                            splitLine: {show:false},
                            data:yAxisData
                        },
                        
                ],
                series: [
                    {
                        name: '总分值',
                        type: 'bar',
                        yAxisIndex:1,
                        barCategoryGap :'40%',
                        barWidth:"25%", 
                        itemStyle:{
                            normal: {
                                show: true,
                                color: function(params){
                                    var num = mycolor.length;
                                    return mycolor[params.dataIndex % num] 
                                },
                                barBorderRadius:50,
                                borderWidth:0,
                                borderColor:'#333',
                                label: {
                                        show: true, //开启显示
                                        position: 'right', //在上方显示
                                        textStyle: { //数值样式
                                            color: '#ffffff',
                                            fontSize: 16
                                        }
                                    }
                            }
                        },
                        barGap:'0%',
                        barCategoryGap:'50%',
                        data: totalNum
                    },
                    {
                        name: tooltip1,
                        type: 'bar',
                        itemStyle:{
                            normal: {
                                show: false,
                                color: 'rgba(0, 0, 0, 0)',
                                barBorderRadius:50,
                                borderWidth:0,
                                borderColor:'#333',
                            }
                        },
                        data: total_1_num
                    },
                    {
                        name: tooltip2,
                        type: 'bar',
                        itemStyle:{
                            normal: {
                                show: false,
                                color: 'rgba(0, 0, 0, 0)',
                                barBorderRadius:50,
                                borderWidth:0,
                                borderColor:'#333',
                            }
                        },
                        data: total_2_num
                    },
                    {
                        name: tooltip3,
                        type: 'bar',
                        itemStyle:{
                            normal: {
                                show: false,
                                color: 'rgba(0, 0, 0, 0)',
                                barBorderRadius:50,
                                borderWidth:0,
                                borderColor:'#333',
                            }
                        },
                        data: total_3_num
                    },
                    {
                        name: tooltip4,
                        type: 'bar',
                        itemStyle:{
                            normal: {
                                show: false,
                                color: 'rgba(0, 0, 0, 0)',
                                barBorderRadius:50,
                                borderWidth:0,
                                borderColor:'#333',
                            }
                        },
                        data: total_4_num
                    }
                ]
            }
        },
    },
    pie:{

        /** 即时信息-物联监控 */
        getPhyConnectOption: function (name,total,seriesName,seriesData,colorList,cirColor) {
            cirColor = cirColor == undefined ? '#202b3f' : cirColor;
            return{
                title:{
                    text :total,
                    subtext :name,
                    x :'center',
                    y :'center',
                    padding:[80,0,0,0],
                    textStyle :{
                        color:'#F3AA43',
                        fontSize:24
                    },
                    subtextStyle :{
                        color:'#25B4FC'
                    },
                    itemGap:0,
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                /*grid: {
                    left: '10px',
                    right: '10px',
                    top: '10px',
                    bottom:'10px',
                    containLabel: true
                },*/
                calculable : true,
                color:colorList,
                series : [
                    {
                        // name:'访问来源',
                        type:'pie',
                        selectedMode: 'single',
                        clickable:false,
                        legendHoverLink :false,
                        hoverAnimation :false,
                        radius:'40%',
                        center:['50%','50%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        tooltip:{
                            show: false
                        },
                        data:[{
                            value:'1',
                            itemStyle:{
                                normal:{
                                    color:cirColor
                                }
                            }
                        },
                        ]
                    },
                    {
                        name:seriesName,
                        type:'pie',
                        radius : ['45%', '60%'],
                        center: ['50%', '50%'],
                        roseType : 'radius',
                        label:{
                            normal: {
                                show: true,
                                formatter: "{a|{b}} \n{c} ({d}%)",
                                padding:[0,-5],
                                rich: {
                                    a: {
                                        lineHeight: 20
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                length: 20,
                                length2: 3
                            }

                        },

                        data:seriesData,
                    }
                ]
            }
        },
        //饼形图
        getPhyConnectOptions: function(seriesName,seriesData,colorList,cirColor) {
        	cirColor = cirColor == undefined ? '#202b3f' : cirColor;
        	return {
//                title:{
//                    text :total,
//                    subtext :name,
//                    left :'center',
//                    top :'center',
//                    textStyle :{
//                        color:'#F3AA43',
//                        fontSize:24
//                    },
//                    subtextStyle :{
//                        color:'#25B4FC'
//                    },
//                    itemGap:0,
//                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color:colorList,
        	    calculable : false,
        	    series : [
        	        {
        	            name:seriesName,
        	            type:'pie',
        	            radius : '65%',
        	            center: ['40%', '65%'],
                        label:{
                            normal: {
                                show: true,
                                formatter: "{a|{b}} \n{c} ({d}%)",
                                padding:[0,10],
                                rich: {
                                    a: {
                                        lineHeight: 20
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                length: 25,
                                length2: 3
                            }

                        },
        	            data:seriesData
        	        }
        	    ]
        	}
        },

        getIndustryNumOption:function(legendName,seriesData,colorList){
            return {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color:colorList,
                legend: {
                    orient: 'vertical',
                    x:'right',
                    y:'center',
                    data:legendName,
                    padding:[5,0,5,5]
                },
                series: [
                    {
                        name:"联网企业数",
                        type:'pie',
                        radius: '55%',
                        center: ['40%','50%'],
                        // label: {
                        //     normal: {
                        //         show: false,
                        //         // position: 'center'
                        //     },
                        //     emphasis: {
                        //         show: true,
                        //         formatter:'{d}%',
                        //         textStyle: {
                        //             fontSize: '20',
                        //             fontWeight: 'bold'
                        //         }
                        //     }
                        // },
                        data:seriesData
                    }
                ]
            }
        },
        
        // 单圆环图形
        getPhyConnectRing:function(per,colorList) {
        	
        	var labelTop = {
        		    normal : {
        		    	color: colorList[1],
        		        label : {
        		            show : false,
        		            position : 'center',  //center
        		            formatter : '{b}',
        		            textStyle: {
        		                baseline : 'bottom',  //bottom
        		             	
        		            }
        		        },
        		        labelLine : {
        		            show : false
        		        }
        		    }
        		};
        		var labelFromatter = {
        		    normal : {
        		        label : {
        		        	position: 'center',
//        		            formatter : function (params){
//        		                return params.value + '%'
//        		            },
        		            textStyle: {
        		                baseline : 'center',
        		                fontSize: 20,
        		                color: '#F7D85B',
        		            }
        		          
        		        }
        		    },
        		}
        		var labelBottom = {
        		    normal : {
        		        color: colorList[2],
        		        label : {
        		            show : true,
        		            position : 'center',
        		            textStyle: {
        		                baseline : 'center',
        		                fontSize: 12,
        		                color: '#F7D85B',
        		            }
        		        },
        		        labelLine : {
        		            show : false
        		        }
        		    },
        		    emphasis: {
        		        color: 'rgba(0,0,0,0)'
        		    }
        		};
        		var radius = [45, 55];//重点防空区域占比
        	return {
        	    title : {
        	        text: '',
        	        subtext: '',
        	        x: 'center',
        	        y:'right',
        	        padding: 15,
                    subtextStyle :{
                        color:'#cccccc'
                    },
        	    },
        	    series : [
        	        {
        	            type : 'pie',
        	            center : ['48%', '52%'],
        	            radius : radius,	   
        	            x: '0%', // for funnel
        	            itemStyle : labelFromatter,
        	            data : [
        	                {name:'', value:100-per, itemStyle : labelBottom},
        	                {name:per+'%', value:per,itemStyle : labelTop}
        	            ]
        	        }
        	    ]
        	}
        },        
        /** 即时信息-教育培训 考试情况 */
        getEduPieOption: function (unitPer,personPer,qualiPer) {
            var option={
                tooltip: {
                    show: true,
                    trigger: 'item',//提示框触发类型，item数据项图形触发，主要应用于无类目轴的图表（散点图、饼形图等）
                    formatter: function(params, ticket, callback) {//第一个参数数据集、第二个参数是异步回调标志、第三个参数是异步回调
                        //console.log(params);
                        return params.name + ": " + params.value + "%";//系列名称：数据值
                    }
                },
                color:['rgba(37,180,252,0.5)','rgba(37,180,252,0.8)','rgba(37,180,252,1)'],//调色盘颜色列表，默认情况下图例和饼形环图颜色使用
                legend: {
                    top: "5%",
                    left: "right",
                    itemWidth: 10,
                    itemHeight: 10,//图例的高度
                    itemGap:10,//图例之间的间距
                    formatter: function(params) {
                        for (var i = 0; i < option.series.length; i++) {
                            if (option.series[i].name == params) {
                                return params +' | '+option.series[i].data[0].value+'%';
                            }
                        }
                    },
                    data: ['单位参考率', '人员参考率', '人员合格率'],//图例的数据数组
                    textStyle: {
                        color: '#25B4FC'
                    },
                    selectedMode: true,//图例选择模式
                    orient: "align"//图例布局方式
                },
                series: [
                    {
                        name: '单位参考率',
                        type: 'pie',
                        // clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius : ['60%', '70%'],
                        center: ['32%', '45%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                },
                                labelLine: {
                                    show: false,
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        tooltip:{
                            trigger:'item',
                            normal: {
                                show:true,
                                formatter:'{b} {c} {d}'
                            }

                        },
                        data: [{
                            name:'单位参考率',
                            value: unitPer,
                        },
                            {
                                name:'单位未参考率',
                                value: 100-unitPer,
                                itemStyle: {
                                    normal: {
                                        color: 'transparent'
                                    }
                                }
                            }]
                    },
                    {
                        name: '人员参考率',
                        type: 'pie',
                        hoverAnimation: false, //鼠标移入变大
                        radius : ['50%', '60%'],
                        center: ['32%', '45%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                },
                                labelLine: {
                                    show: false,
                                }
                            }
                        },
                        data: [{
                            value: personPer,
                            name:'人员参考率'
                        },
                            {
                                value: 100-personPer,
                                name:"人员未参考率",
                                itemStyle: {
                                    normal: {
                                        color: 'transparent'
                                    }
                                }
                            }]
                    },
                    {
                        name: '人员合格率',
                        type: 'pie',
                        hoverAnimation: false, //鼠标移入变大
                        radius : ['40%', '50%'],
                        center: ['32%', '45%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                },
                                labelLine: {
                                    show: false,
                                }
                            }
                        },
                        data: [{
                            name:'人员合格率',
                            value: qualiPer,
                        },
                            {
                                name:'人员未合格率',
                                value: 100-qualiPer,
                                itemStyle: {
                                    normal: {
                                        color: 'transparent'
                                    }
                                }
                            }]
                    }]
            }
            return option;
        },

        /** 物联监控-联网设备运行情况统计 龙岗区设备联网情况 */
        getEquStatusOption: function (name,total,legendName,seriesName,seriesData,colorList) {
            return{
                title:{
                    text :total,
                    subtext :name,
                    left :'38%',
                    top :'center',
                    textStyle :{
                        color:'#F7D85B',
                        fontSize:24,
                        fontWeight:100
                    },
                    subtextStyle :{
                        color:'#25B4FC'
                    },
                    textAlign:'center',
                    itemGap:0,
                    bottom:10
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    y: '30px',
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 10,
                    textStyle:{
                    	fontSize: 12,
                        color:'#ffffff'
                    },
                    data:legendName
                },
                color:colorList,
                series: [
                    {
                        name:seriesName,
                        type:'pie',
                        radius: ['40%', '50%'],
                        center: ['40%','50%'],
                        minAngle: 55,//最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                        avoidLabelOverlap: true,   //是否启用防止标签重叠策略
                        hoverAnimation:true,　　  //是否开启 hover 在扇区上的放大动画效果。
                        silent: false,　　　　　　　　//图形是否不响应和触发鼠标事件

                        hoverOffset:15,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                formatter: "{a|{d}%}",
                                padding:[0,-5],
                                rich: {
                                    a: {
                                        color:'#ffffff',
                                        lineHeight: 20
                                    }
                                }
                            }
                        },
                        labelLine:{
                            normal: {
                                lineStyle:{
                                    type:'dashed'
                                }
                            }
                        },
                        data:seriesData
                    }
                ]
            };
        },

        // 物联监控 联网设备运行情况统计 龙岗区在线设备联网情况
        getEquStatusOnlineOption: function (seriesName,seriesData,colorList) {
            return{
                title:{
                    //text:"在线设备联网情况",
                    textStyle:{
                        color:'#1C90CA',
                        fontSize:14
                    },
                    left:'center',
                    bottom:10
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 10,
                    textStyle:{
                    	fontSize: 12,
                        color:'#ffffff'
                    },
                    data:['未应答数','应答数']
                },
                color:colorList,
                series: [
                    {
                        name:seriesName,
                        type:'pie',
                        radius: ['35%', '50%'],
                        center: ['35%','50%'],
                        hoverOffset:15,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                formatter: "{a|{d}%}",
                                padding:[0,-5],
                                rich: {
                                    a: {
                                        color:'#ffffff',
                                        lineHeight: 20
                                    }
                                }
                            }
                        },
                        labelLine:{
                            normal: {
                                lineStyle:{
                                    type:'dashed'
                                }
                            }
                        },
                        data:seriesData
                    }
                ]
            };
        },

        // 物联监控 设备告警处理情况统计
        getEquAlarmProOption: function (name,total,seriesName,seriesData,colorList) {
            return{
                title:{
                    text :total,
                    subtext :name,
                    left :'44%',
                    top :'center',
                    textStyle :{
                        color:'#F3AA43',
                        fontSize:24
                    },
                    subtextStyle :{
                        color:'#25B4FC'
                    },
                    textAlign:'center',
                    itemGap:0,
                    bottom:10
                },
                /*tooltip: {
                    trigger: 'item',
                    //formatter: "{a} <br/>{b}: {c} ({d}%)",
                    formatter: function (params) {
                    	   console.log(params);
                    	   for (var i = 0; i < option.series[0].data.length; i++) {
                    	       if (option.series[0].data[i].name == params) {
                    	           return params +":"+ option.series[0].data[i].value+"起";
                    	       }
                    	   }
                     }
                },*/
                /*legend: {
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    textStyle:{
                        color:'#8AC4FD'
                    },
                    data:legendName
                },*/
                color:colorList,
                series: [
                    {
                        name:seriesName,
                        type:'pie',
                        radius: ['45%', '60%'],
                        center: ['45%','50%'],
                        hoverOffset:15,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                formatter: "{a|{d}%} \n {b|{b}}",
                                padding:[0,-5],
                                rich: {
                                    a: {
                                        color:'#ffffff',
                                        fontSize:16,
                                        lineHeight: 20
                                    },
                                    b:{
                                        color:'#ffffff'
                                    }
                                }
                            }
                        },
                        labelLine:{
                            normal: {
                                lineStyle:{
                                    type:'dashed',
                                    color:'#8AC4FD'
                                }
                            }
                        },
                        data:seriesData
                    }
                ]
            };
        },

        // 物联监控 联网设施品牌 龙岗区设施品牌占有率情况
        getEquBrandPossessOption: function (name,legendName,seriesName,seriesData,colorList) {
        	return{
                title:{
                    text:name,
                    textStyle:{
                        color:'#1C90CA',
                        fontSize:14
                    },
                    left:'center',
                    bottom:10
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {d}%"
                    //formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    y:30,
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 10,
                    data:legendName,
                    textStyle:{
                        fontSize: 12,
                        color:'#8AC4FD'
                    }
                },
                color:colorList,
                series: [
                    {
                        name:seriesName,
                        type:'pie',
                        radius: ['40%', '55%'],
                        center: ['40%','50%'],
                        hoverOffset:10,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                // position: 'center'
                            },
                            emphasis: {
                                show: true,
                                formatter:'{d}%',
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        data:seriesData
                    }
                ]
            }
        },

        // 物联监控 各类设施系统故障率
        getEquFaultOption: function (serData_name,serData_num,tit) {
            return{
                title:{
                    text :"2351",
                    subtext :"告警设备",
                    left :'center',
                    top :'center',
                    textStyle :{
                        color:'#F3AA43',
                        fontSize:24
                    },
                    subtextStyle :{
                        color:'#25B4FC'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                // legend: {
                //     orient: 'vertical',
                //     x: 'right',
                //     y: 'center',
                //     textStyle:{
                //         color:'#8AC4FD'
                //     },
                //     data:['正常','异常']
                // },
                color:['#F2A340','#0FBEE0'],
                series: [
                    {
                        name:'在线设备联网情况',
                        type:'pie',
                        radius: ['30%', '50%'],
                        hoverOffset:15,
                        avoidLabelOverlap: false,

                        labelLine:{
                            normal: {
                                lineStyle:{
                                    type:'dashed'
                                }
                            }
                        },
                        data:[
                            {
                                value:30,
                                name:'告警未处理',
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: "{a|{d}%} \n {b|{b}}",
                                        padding:[0,-5],
                                        rich: {
                                            a: {
                                                color:'#25B4FC',
                                                fontSize:16,
                                                lineHeight: 20
                                            },
                                            b:{
                                                color:'#1C90CA'
                                            }
                                        }
                                    }
                                },
                                labelLine:{
                                    normal: {
                                        lineStyle:{
                                            color:'#8AC4FD'
                                        }
                                    }
                                },
                            },
                            {
                                value:100,
                                name:'告警已处理',
                                label: {
                                    normal: {
                                        show: false,
                                    }
                                },
                                labelLine:{
                                    normal: {
                                        show:false
                                    }
                                },
                            }
                        ]
                    }
                ]
            };
        }
    },
    line:{
        /** 即时信息-消防检查 */
    	getAllCheckOption: function (serData_num,curNum,comparePer,comparePerColor,bgColor,index) {
            return{
                title: {
                    x:'22px',
                    y:'10px',
                    text: curNum,
                    //text: tit,
                    textStyle: {
                        fontSize: 20,
                        //fontWeight: 'bolder',
                        color: '#25B4FC',          // 主标题文字颜色
                    },
                    subtext: comparePer,
                    subtextStyle: {
                        color: comparePerColor , // 副标题文字颜色
                        fontSize: 12,
                    },
                    //textAlign:'left',
                    itemGap:10,
                    target:'self',
                    link:"javascript:window.model.getCheckDataDetail("+index+");"
                },
                color: bgColor,
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    top: '70px',
                    left: '10px',
                    right: '20px',
                    bottom: '10px',
                    containLabel: true
                },
                xAxis : [
                    {
                        show : false,
                        type : 'category',

                        boundaryGap : false,
                        data : []
                    }
                ],
                yAxis : [
                    {
                        show : false,
                        type : 'value'
                    }
                ],
                series : [
                    {
                        type:'line',
                        smooth:true,//平滑折线
                        stack: '总量',
                        areaStyle: {normal: {opacity :0.3}},
                        data:serData_num
                    }
                ]
            }
        },

    },
    radar:{
        /** 即时信息-教育培训 考试类型 雷达图 */
    	getEduRadarOption: function (seriesData,val) {
            return{
                tooltip: {
                    trigger: 'axis',
                },
                radar: [
                    {
                        indicator: seriesData,
                        center: ['50%', '50%'],
                        radius: '50%',
                        splitLine:{
                            lineStyle:{
                                color:'#25B4FB',
                                opacity :0.5
                            }
                        },
                        splitArea: {
                            show: false,
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#cccccc',
                                opacity :0.5
                            }
                        }
                    }
                ],
                color:['#25B4FC','#62A7CF','#f4cf6d','#58be50','#6dd6c3'],
                series: [
                    {
                        type: 'radar',
                        tooltip: {
                            trigger: 'item',

                        },
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [
                            {
                                value: val,
                                name:'教育培训'
                            }
                        ]
                    }
                ]
            }
        }
    },
    categorys: {
    	getEduCategorysOption: function(xAxisData,seriesData,CategorysMessage){
    		return {
    		    xAxis: [
    		        {
    		            type: 'category',
    		            axisTick: {
    		                alignWithLabel: true
    		            },
    		            axisLine: {
    		                onZero: false,
    		                lineStyle: {
    		                    color: CategorysMessage.color
    		                }
    		            },
    		            splitLine:{show: false},
    		            data: xAxisData
    		        }
    		    ],
    		    yAxis: [
    		        {
    		            type: 'value',
    		            axisLine: {
    		                onZero: false,
    		                lineStyle: {
    		                    color: '#5793f3'
    		                }
    		            },
    		            splitLine:{show: false}
    		        }
    		    ],
    		    series: [
    		        {
    		            name: CategorysMessage.seriesName,
    		            type:'line',
    		            smooth: true,
			            stack: CategorysMessage.seriesName,
			            itemStyle : {
							normal : {
								lineStyle:{
									color: CategorysMessage.color
								}
							}
						},
    		            data: seriesData,
    		            showSymbol:false
    		        }
    		    ]
    		}
    	}
    }
};

var Highchart = {
    pie: {
        /** 消防检查-隐患种类统计 */
        getDangerSpeciesOption: function (serData,total) {
            return{
                chart: {
                    type: 'pie',
                    backgroundColor: '#15182f',
                    shadow:false,
                    options3d: {
                        enabled: true,
                        alpha: 60,
                        beta: 0
                    },
                    // 指定内边距，下面的四个配置可以用 spacing: [10, 10, 15, 10] 来代替
                    /*spacingBottom: 15,
                    spacingTop: 10,
                    spacingLeft: 10,
                    spacingRight: 10,*/
                    spacing: [-50, 10, 15, 10],

                    // 指定外边距
                    //margin: null,

                    // 指定图表大小
                    //width: null,
                    //height: null
                },
                /*title: {
                    enabled: false,
                },*/
                colors:['#be4b59','#5256a7','#1f79b6','#30aa93','#c19e5e','#87ca72'],
                title: {
                    text:"隐患总数",
                    style: {
                        color: '#25B4FC',
                        fontSize: '18px',
                        //fontWeight: 'bold',
                        lineHeight: '24px',
                        fontFamily:'Microsoft Yahei'
                    },
                    verticalAlign:'middle',
                    floating: true,
                    y:125,
                },
                subtitle: {
                    useHTML:true,
                    text:"<a href='javascript:vm.setDangerSpecies(0)' target='_self' style='color:#11afff'>"+total+"</a>",
                    style: {
                        color: '#25B4FC',
                        fontSize: '18px',
                        //fontWeight: 'bold',
                        lineHeight: '24px',
                        fontFamily:'Microsoft Yahei'
                    },
                    verticalAlign:'middle',
                    floating: true,
                    y:95
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                legend: {
                    layout: 'vertical',
                    align: 'left', //水平方向位置
                    verticalAlign: 'top',
                    horizontalAlign:'center',
                    labelFormatter: function () {
                        return this.name + ':'+this.percentage+'%';
                    },
                    itemStyle: {
                        color: '#fff'
                    },
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: false,//是否显示注释
                            format: '{point.name}',
                            style: {
                                color :'#fff',
                                textShadow:false,
                                textOutline:"none"//去掉恶心的文字阴影
                            }
                        },
                        showInLegend: false,//是否显示图例
                    }
                },
                exporting: {enabled: false},//隐藏导出
                credits: { enabled: false },//隐藏右下角highcharts的链接

                series: [{
                    type: 'pie',
                    name: '隐患占比',
                    data: serData,
                    events:{
                        click: function(e) {
                        	//console.log(e.point.index);
                            //var dgType=e.point.name;
                        	var index=e.point.index;
                            vm.setDangerSpecies(index);
                        }
                    },
                }]
            }
        }
    }
}

/*封装默认悬浮函数*/
function defaultFloat(id,Chart,Option){
    var currentIndex = 0;
    setTimeout(function() {
        currentIndex--;
        var dataLen = Option.series[0].data.length;
        // 取消之前高亮的图形
        Chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen;
        // 高亮当前图形
        Chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
    }, 100);
    $("#"+id).mouseenter(function() {
        Chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
    });
    $("#"+id).mouseleave(function() {
        Chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
    });
}

export {EchartsStat,Highchart};