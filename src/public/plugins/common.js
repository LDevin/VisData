export var publicMethods = {
    getIsValue: function (value) {
        return value == undefined || value == "" ? "--" : value;
    },
    getNumIsValue: function (value) {
        return value == undefined || value == "" ? "0" : value;
    },
    getNullIsValue: function (value) {
        return value == undefined || value == null ? "无" : value;
    },
}

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.removeVal = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

export function formatDateYM(time){
    var date = new Date(time);
    var year = date.getFullYear(),
        month = date.getMonth() + 1;//月份是从0开始的
        month = month < 10 ? ('0'+month) : month;
    var newTime = year + '-' +
        month;
    return newTime;
}

export function formatDateYMD(time){
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;//月份是从0开始的
    var	day = date.getDate();
        month = month < 10 ? ('0'+month) : month;
        day = day < 10 ? ('0'+day) : day;
    var newTime = year + '-' +
        month + '-' +
    	day;
    return newTime;
}

export function formatDateYM_cn(time){
    var date = new Date(time);
    var year = date.getFullYear(),
        month = date.getMonth() + 1;//月份是从0开始的
    var newTime = year + '年' +
        month + '月';
    return newTime;
}

export function formatDateCN(time){
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();

    var week = "星期" + "日一二三四五六".charAt(new Date().getDay());

    month = month < 10 ? ("0"+month) : month;
    day = day < 10 ? ("0"+day) : day;
    hour = hour < 10 ? ("0"+hour) : hour;
    min = min < 10 ? ("0"+min) : min;
    sec = sec < 10 ? ("0"+sec) : sec;

    var newTime = year + ' 年 ' +
        month + ' 月 ' +
        day + ' 日 ' +
        hour + ':' +
        min + ':' +
        sec + ' ' +
        week;
    return newTime;
}

export function formatDate(time){
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime = year + '-' +
        month + '-' +
        day + ' ' +
        hour + ':' +
        min + ':' +
        sec;
    return newTime;
}

//获取单击对象的宽高和坐标
export function getXY(Obj)
{
    var sumWidth=Obj.offsetWidth,sumHeight=Obj.offsetHeight;
    var h = Obj.offsetHeight;
    for (var sumTop=0,sumLeft=0;Obj!=document.body;sumTop+=Obj.offsetTop,sumLeft+=Obj.offsetLeft, Obj=Obj.offsetParent);
    sumTop = h+sumTop;
    return {left:sumLeft,top:sumTop,width:sumWidth,height:sumHeight}
}

export function timestampToTime(timestamp) {
    //var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var date = new Date(timestamp);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}