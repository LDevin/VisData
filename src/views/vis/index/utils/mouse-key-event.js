function ScreenSaver(settings, callback) {
	this.settings = settings;

    this.nTimeout = this.settings.timeout;
    this.isTimerOut = false;
    this.fun = callback;

	document.body.screenSaver = this;
	document.body.onmousemove = ScreenSaver.prototype.onevent;
	document.body.onmousedown = ScreenSaver.prototype.onevent;
	document.body.onmousewheel = ScreenSaver.prototype.onevent;
    document.body.onkeydown = ScreenSaver.prototype.onevent;
    document.body.onkeypress = ScreenSaver.prototype.onevent;
	
	var pThis = this;
	var f = function() {
        pThis.isTimerOut = true;
		pThis.timeout();
	};
	this.timerID = window.setTimeout(f, this.nTimeout);
}


ScreenSaver.prototype.timeout = function() {
	if (this.isTimerOut) {
        this.fun(true);
	}
};


ScreenSaver.prototype.signal = function() {
  if (this.isTimerOut) {
    this.isTimerOut = false;
    this.fun(false);
  }
  
	window.clearTimeout(this.timerID);

	var pThis = this;
	var f = function() {
        pThis.isTimerOut = true;
        pThis.timeout();
	};
	this.timerID = window.setTimeout(f, this.nTimeout);
};

ScreenSaver.prototype.onevent = function(e) {
	this.screenSaver.signal();
};

export {ScreenSaver}