/*
jQWidgets v4.5.2 (2017-May)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
!function(a){a.jqx.jqxWidget("jqxRangeSelector","",{}),a.extend(a.jqx._jqxRangeSelector.prototype,{defineInstance:function(){var b={width:400,height:100,min:0,max:100,range:{from:0,to:1/0,min:0,max:1/0},majorTicksInterval:10,minorTicksInterval:1,showMajorTicks:!0,showMinorTicks:!1,snapToTicks:!0,labelsFormat:null,markersFormat:null,showLabels:!0,labelsOnTicks:!0,markersPosition:"top",labelsFormatFunction:null,groupLabelsFormatFunction:null,markersFormatFunction:null,showGroupLabels:!1,showMarkers:!0,resizable:!0,moveOnClick:!0,disabled:!1,rtl:!1,padding:"auto",events:["change"]};return this===a.jqx._jqxRangeSelector.prototype?b:(a.extend(!0,this,b),b)},createInstance:function(b){var c=this;if(this._isTouchDevice=a.jqx.mobile.isTouchDevice(),!a.jqx.dataAdapter)throw new Error("jqxRangeSelector: Missing reference to the following module: 'jqxdata.js'.");var d=a.jqx.isHidden(this.host);this.render();var e=this.host.width(),f=this.host.height();a.jqx.utilities.resize(this.host,function(){var a=c.host.width(),b=c.host.height();c.range=c.getRange(),d?(c.refresh(),d=!1):e==a&&f==b||c.refresh(),e=c.host.width(),f=c.host.height()})},render:function(){(this.host.children().length>1||this.rangeSelector)&&(this._removeHandlers(),this.rangeSelector&&this.rangeSelector.remove()),this.host.addClass(this.toThemeProperty("jqx-widget")),this.host.addClass(this.toThemeProperty("jqx-rangeselector")),this.host.children(":eq(0)").addClass(this.toThemeProperty("jqx-rangeselector-content")),this._id=this.element.id,"string"==typeof this.min||this.min instanceof Date?this._dataType="date":this._dataType="number",this._privateProperties(),this._checkProperties(),this._setSize(),this._scale(),this._initSlider()},refresh:function(a){1!=a&&(this.host.children(".jqx-rangeselector-ticks-container").remove(),this._removeHandlers(),this._privateProperties(),this._checkProperties(),this._setSize(),this._scale(),this._initSlider())},destroy:function(){this._removeHandlers(),this.host.remove()},setRange:function(a,b){if(a>b)throw new Error("jqxRangeSelector: range object initialization error. 'min' should be less than 'max'");var c=this._getValue();if(c.from!=a||c.to!=b){var d="number"==this._dataType?"numeric":"date",e="The set values are in the wrong format. Please set "+d+" values.";if("string"==typeof a||a instanceof Date){if("number"==this._dataType)throw new Error(e)}else if("date"==this._dataType)throw new Error(e);a=this._validateInput(a),b=this._validateInput(b),a>this._max&&(a=this._max),a<this._min&&(a=this._min),b>this._max&&(b=this._max),b<this._min&&(b=this._min);var f=b-a;f>this._range._max?b=a+this._range._max:f<this._range._min&&(b=a+this._range._min);var g=this._valuesArray.indexOf(a),h=this._valuesArray.indexOf(b),i=this._ticksArray[g],j=this._ticksArray[h],k=Math.abs(j-i);this.slider[0].style.width=k+"px";var l=this.rtl?j:i;if(this.slider[0].style.left=l,this._moveSlider(l),"date"==this._dataType)var a=new Date(a),b=new Date(b);this._raiseEvent("0",{type:null,from:a,to:b})}},val:function(a){return 0==arguments.length?this.getRange():void(void 0!=a.from&&this.setRange(a.from,a.to))},getRange:function(){var a=this._getValue();return a},propertyChangedHandler:function(b,c,d,e){switch(c){case"showMinorTicks":1==e?a("#"+this._id+" .jqx-rangeselector-ticks-minor").css("visibility","visible"):a("#"+this._id+" .jqx-rangeselector-ticks-minor").css("visibility","hidden");break;case"showMarkers":var f=a("#"+this._id+"LeftMarker, #"+this._id+"RightMarker, #"+this._id+"LeftMarkerArrow, #"+this._id+"RightMarkerArrow");1==e?f.css("visibility","visible"):f.css("visibility","hidden");break;default:this.refresh()}},_raiseEvent:function(b,c){var d=this.events[b],e=new a.Event(d);e.owner=this,e.args=c;try{var f=this.host.trigger(e)}catch(a){}return f},_setSize:function(){this.host.width(this.width),this.host.height(this.height)},resize:function(a,b){this.width=a,this.height=b,this.refresh()},_scale:function(){var a=this.host.width(),b=this._max-this._min;this._unitPerPixel=parseFloat((b/a).toFixed(4)),this._pixelPerUnit=a/b,this._minWidth=this._roundNumber(this._range._min/this._unitPerPixel),this._maxWidth=this._roundNumber(this._range._max/this._unitPerPixel),this._minWidth=parseInt(this._minWidth),this._maxWidth=parseInt(this._maxWidth),"number"==this._dataType&&(this._majorTicksCount=b/this.majorTicksInterval,this._majorTicksCount=Math.floor(this._majorTicksCount)+1,this._majorTicksDistance=parseInt(this._roundNumber(a/(b/this.majorTicksInterval))),this._unitsCount=b/this.minorTicksInterval,this._unitsCount=Math.floor(this._unitsCount)+1,this._unitsDistance=parseInt(this._roundNumber(a/(b/this.minorTicksInterval)))),this._addTicks()},_addTicks:function(){this.host.append("<div id='"+this._id+"TicksContainer' class='jqx-rangeselector-ticks-container'></div>"),this.rangeSelector=a("#"+this._id+"TicksContainer"),this._majorTicksArray=new Array,this._ticksArray=new Array,this._valuesArray=new Array;var b=new String;a("#"+this._id+"TicksContainer").append("<div id='labelPlaceholder' style='visibility: hidden; position: absolute;'></div>");var c=this.rangeSelector.height();b="number"==this._dataType?this._addNumericTicks(c):this._addDateTicks(c);var d=0;this.showLabels&&(d+=a("#labelPlaceholder").outerHeight()+6),"number"!=this._dataType&&this.showGroupLabels&&(d+=a("#labelPlaceholder").outerHeight()+6),"auto"==this.padding&&this.host.css("padding-bottom",d),a("#labelPlaceholder").remove(),a("#"+this._id+"TicksContainer").append(b),this._ticksArray.sort(function(a,b){return a-b});for(var e=1;e<this._ticksArray.length;e++)this._ticksArray[e]=this._roundNumber(this._ticksArray[e]);if(this._valuesArray.sort(function(a,b){return a-b}),"number"==this._dataType)for(var e=1;e<this._valuesArray.length;e++)this._valuesArray[e]=this._roundNumber(this._valuesArray[e],"marker",!0);for(var e=1;e<this._ticksArray.length;e++)this._ticksArray[e-1]==this._ticksArray[e]&&(this._ticksArray.splice(e,1),this._valuesArray.splice(e,1));this.rtl&&(this._valuesArray=this._valuesArray.reverse())},_addNumericTicks:function(b){for(var c=this,d=new String,e=0,f=this._min,g=this._max,h=0;h<this._majorTicksCount;h++){var i=this._id+"LabelTick"+(h+1);h==this._majorTicksCount-1&&(e=this.host.width());var j=c.showMajorTicks?"visible":"hidden";d+="<div id='"+i+"' class='"+this.toThemeProperty("jqx-rangeselector-ticks")+" "+this.toThemeProperty("jqx-slider-tick-horizontal")+"' style='visibility: "+j+"; left: "+e+"px;'></div>",this._ticksArray.push(e),this._majorTicksArray.push(e);var k=this._id+"Label"+(h+1),l=f;this._valuesArray.push(parseFloat(l.toFixed(4))),c.rtl&&(l=g),l=this._formatOutput(l,this.labelsFormat,this.minorTicksInterval>=1?0:2,"label"),a("#labelPlaceholder").html(l);var m=a("#labelPlaceholder").width(),n=c.showLabels?"visible":"hidden";c.labelsOnTicks&&(d+="<div id='"+k+"' class='"+this.toThemeProperty("jqx-rangeselector-labels")+"' style='visibility: "+n+"; left: "+(e-m/2)+"px; top: "+b+"px;'>"+l+"</div>");var o=e;f+=this.majorTicksInterval,g-=this.majorTicksInterval;var e=(f-c._min)/c._unitPerPixel;if(e=parseInt(e),!this.labelsOnTicks&&h<this._majorTicksCount-1){var p=Math.abs(o-e);d+="<div id='"+k+"' class='"+this.toThemeProperty("jqx-rangeselector-labels")+"' style='visibility: "+n+"; left: "+(o+p/2-m/2)+"px; top: "+b+"px;'>"+l+"</div>"}}for(var e=0,q=this.showMinorTicks?"visible":"hidden",f=this._min,h=0;h<this._unitsCount;h++){var i=this._id+"MinorTick"+(h+1);h==this._unitsCount-1&&(e=this.host.width()),d+="<div id='"+i+"' class='"+this.toThemeProperty("jqx-rangeselector-ticks")+" "+this.toThemeProperty("jqx-rangeselector-ticks-minor")+" "+this.toThemeProperty("jqx-slider-tick-horizontal")+"' style='visibility: "+q+"; left: "+e+"px;'></div>";var r=f;this._valuesArray.indexOf(parseFloat(r.toFixed(4)))===-1&&(this._valuesArray.push(parseFloat(r.toFixed(4))),this._ticksArray.push(e)),f+=this.minorTicksInterval;var e=(f-c._min)/c._unitPerPixel;e=parseInt(e)}return d},_getMillisecondsByInterval:function(a){var b={};return"year"==a||a.years?(b.divisor=a.years?a.years:1,31536e6*b.divisor):"month"==a||a.months?(b.divisor=a.months?a.months:1,2592e6*b.divisor):"week"==a||a.weeks?(b.divisor=a.weeks?a.weeks:1,6048e5*b.divisor):"day"==a||a.days?(b.divisor=a.days?a.days:1,864e5*b.divisor):"hour"==a||a.hours?(b.divisor=a.hours?a.hours:1,36e5*b.divisor):"minute"==a||a.minutes?(b.divisor=a.minutes?a.minutes:1,60*b.divisor*1e3):"second"==a||a.seconds?(b.divisor=a.seconds?a.seconds:1,1e3*b.divisor):"millisecond"==a||a.milliseconds?(b.divisor=a.milliseconds?a.milliseconds:1,1*b.divisor):b},_addDateTicks:function(b){var c=this,d=new String,e=function(a){var b="majorTicksInterval"==a?c.majorTicksInterval:c.minorTicksInterval,d=new Object;return"year"==b||b.years?(d.period="year",d.interval=864e5,d.divisor=b.years?b.years:1,d.value=31536e6*d.divisor):"month"==b||b.months?(d.period="month",d.interval=864e5,d.divisor=b.months?b.months:1,d.value=2592e6*d.divisor):"week"==b||b.weeks?(d.period="week",d.interval=864e5,d.divisor=b.weeks?b.weeks:1,d.value=6048e5*d.divisor):"day"==b||b.days?(d.period="day",d.interval=36e5,d.divisor=b.days?b.days:1,d.value=864e5*d.divisor):"hour"==b||b.hours?(d.period="hour",d.interval=6e4,d.divisor=b.hours?b.hours:1,d.value=36e5*d.divisor):"minute"==b||b.minutes?(d.period="minute",d.interval=6e4,d.divisor=b.minutes?b.minutes:1,d.value=60*d.divisor*1e3):"second"==b||b.seconds?(d.period="second",d.interval=1e3,d.divisor=b.seconds?b.seconds:1,d.value=1e3*d.divisor):("millisecond"==b||b.milliseconds)&&(d.period="millisecond",d.interval=1,d.divisor=b.milliseconds?b.milliseconds:1,d.value=1*d.divisor),d},f=function(a,b){var c=new Date(a),d=c.getDate(),e="year"==b&&0==c.getMonth()&&1==d,f="month"==b&&1==d,g="week"==b&&0==c.getDay(),h="day"==b&&0==c.getHours(),i="hour"==b&&0==c.getMinutes(),j="minute"==b&&0==c.getSeconds(),k="minute"==b&&0==c.getMilliseconds(),l="millisecond"==b;return!!(e||f||g||h||i||j||k||l)},g=function(e,f,g){var h=(e-c._min)/c._unitPerPixel;c.rtl&&(e="majorTicksInterval"==f?c._dateMajorTicks[c._dateMajorTicks.length-g]:c._dateMinorTicks[c._dateMinorTicks.length-g]),h=parseInt(h);var i=e;if(c._valuesArray.indexOf(i)===-1&&(c._ticksArray.push(h),c._valuesArray.push(i),"majorTicksInterval"==f&&c._majorTicksArray.push(h)),"majorTicksInterval"==f){var j=c._id+"LabelTick"+g,k=c.showMajorTicks?"visible":"hidden";d+="<div id='"+j+"' class='"+c.toThemeProperty("jqx-rangeselector-ticks")+" "+c.toThemeProperty("jqx-slider-tick-horizontal")+"' style='visibility: "+k+"; left: "+h+"px;'></div>";var l=i;l=c._formatOutput(l,c.labelsFormat,c.labelPrecision,"label"),a("#labelPlaceholder").html(l);var m=a("#labelPlaceholder").width(),n=c._id+"Label"+g,o=c.showLabels?"visible":"hidden";if(c.labelsOnTicks)c.labelsOnTicks&&(d+="<div id='"+n+"' class='"+c.toThemeProperty("jqx-rangeselector-labels")+"' style='visibility: "+o+"; left: "+(h-m/2)+"px; top: "+b+"px;'>"+l+"</div>");else{var p=c._getMillisecondsByInterval(c.majorTicksInterval)/c._unitPerPixel,q=p/2;d+="<div id='"+n+"' class='"+c.toThemeProperty("jqx-rangeselector-labels")+"' style='visibility: "+o+"; left: "+(q+h-m/2)+"px; top: "+b+"px;'>"+l+"</div>"}}else{var k=c.showMinorTicks?"visible":"hidden",r=c._id+"MinorTick"+g;d+="<div id='"+r+"' class='"+c.toThemeProperty("jqx-rangeselector-ticks")+" "+c.toThemeProperty("jqx-rangeselector-ticks-minor")+" "+c.toThemeProperty("jqx-slider-tick-horizontal")+"' style='visibility: "+k+"; left: "+h+"px;'></div>"}},h=function(a,b,d){for(var e=0,h=1,i=new Date(c._min).getHours(),j=864e5==b.interval,k=new Array,l=c._min;l<=c._max;l+=b.interval){if(1==j){var m=new Date(l).getHours();if(i!=m){var n;1==m?n=1:23==m&&(n=-1),l-=36e5*n,i=new Date(l).getHours()}}var o=f(l,b.period);1==o&&(e%b.divisor==0&&(d?k.push(l):g(l,a,h,b.interval),h++),e++)}return k};return c._dateMajorTicks=h("majorTicksInterval",e("majorTicksInterval"),!0),c._dateMinorTicks=h("minorTicksInterval",e("minorTicksInterval"),!0),h("majorTicksInterval",e("majorTicksInterval")),h("minorTicksInterval",e("minorTicksInterval")),1==this.showGroupLabels&&this.showLabels&&this._addGroupLabels(a("#labelPlaceholder").height()+b),d},_addGroupLabels:function(b){var c=this,d=new Date(this._min),e=new Date(this._max);if(e.getFullYear()-d.getFullYear()>0)var f="year",g=864e5;else if(e.getMonth()-d.getMonth()>0)var f="month",g=864e5;else{if(!(e.getDate()-d.getDate()>0))return;var f="day",g=36e5}for(var h=function(b){var d,e=new Date(b),g=e.getFullYear(),h=e.getMonth(),i=e.getDate(),j=!0;"year"==f&&0==h&&1==i?d=g:"month"==f&&1==i?(d=a.jqx.dataFormat.formatdate(e,"MMMM"),0==h&&(d=g+" "+d)):"day"==f&&0==e.getHours()?d=a.jqx.dataFormat.formatdate(e,"dddd"):j=!1;var k;k=1==j&&c.groupLabelsFormatFunction?c.groupLabelsFormatFunction(d,e):d;var l={check:j,value:k};return l},i=new String,j=this.toThemeProperty("jqx-rangeselector-group-labels-ticks")+" "+this.toThemeProperty("jqx-slider-tick-horizontal"),k=1,l=this._min;l<this._max;l+=g){var m=h(l);if(1==m.check){var n=(l-this._min)/this._unitPerPixel;i+="<div class='"+this.toThemeProperty("jqx-rangeselector-labels")+"' style='left: "+n+"px; top: "+b+"px;'><div class='"+j+"'></div><div id='"+this._id+"GroupLabel"+k+"' class='"+this.toThemeProperty("jqx-rangeselector-group-labels")+"' style='margin-left: 5px;'>"+m.value+"</div></div>",k++}}a("#"+this._id+"TicksContainer").append(i)},_updateCursor:function(a,b){var c=this.element.style.cursor,d=this.slider.offset().left,e=parseInt(this.slider[0].style.width),f=d+e;a>d-5&&a<d+5||a>f-5&&a<f+5?""!=c&&"auto"!=c||(this.element.style.cursor="e-resize"):"e-resize"==c&&(this.element.style.cursor="auto")},_handleMouseMove:function(b){var c=this,d=c.slider,e=b.pageX,f=b.pageY;if(c._isTouchDevice){var g=a.jqx.position(b);e=g.left,f=g.top}var h=c._hostOffset.left,i=c._hostWidth;if(c.resizable&&!c.dragging&&"none"==c.resizeDirection&&e>=h&&e<=h+i&&f>=c._hostOffset.top&&f<=c._hostOffset.top+c._hostHeight&&this._updateCursor(e,f),!c.isMouseDown)return!0;if(c._isTouchDevice&&(f<c._hostOffset.top||f>c._hostOffset.top+c._hostHeight))return!0;var j=c._findNearestTick(c._sliderLeftOffset+e-c._mouseDownX),k=parseInt(j);if(k<0)return!0;k<0&&(k=0);var l=parseInt(d[0].style.width),m=function(a){var b=parseInt(c._maxWidth),d=parseInt(c._minWidth);if(a<d||a>b)return!1;var e=parseInt(c.rightMarker[0].style.left),f=parseInt(c.leftMarker[0].style.left);return!(f>e)};if(1==c.resizable&&!c.dragging){var n=k*c._unitPerPixel+c._min;if("left"==c.resizeDirection||c.isLeftMarkerCaptured){var o=c.isLeftMarkerCaptured?c.leftMarker.outerWidth():0;e<h-o&&(e=h-o),e>h+i+o&&(e=h+i+o+1);var p=d[0].style.left,q=k-parseInt(p),r=parseInt(l-q);if(!m(r))if(e>c._mouseDownX){if(e=c.sliderRight-c._minWidth-h,r=c._minWidth,l==r)return!0;var j=c._findNearestTick(e);if(k=j,k<0)return!0;var n=(parseInt(p)*c._unitPerPixel+c._min,k*c._unitPerPixel+c._min)}else{if(!(0!=c._maxWidth&&e<c._mouseDownX&&r>c._maxWidth))return!0;if(e=c.sliderRight-c._maxWidth-h,r=c._maxWidth,l==r)return!0;var j=c._findNearestTick(e);if(k=j,k<0)return!0;var n=(parseInt(p)*c._unitPerPixel+c._min,k*c._unitPerPixel+c._min)}c.slider[0].style.left=k+"px",p!=d[0].style.left&&(c.slider[0].style.width=r+"px");var s=c._findNearestTick(k),t=c._valuesArray[c._ticksArray.indexOf(s)];void 0!=t?(c.leftMarkerValue[0].innerHTML=c._formatOutput(t,c.markersFormat,0,"left"),k!=s&&(c.slider[0].style.left=s+"px")):c.leftMarkerValue[0].innerHTML=c._formatOutput(n,c.markersFormat,0,"left"),c.oldX=e,c.moved=!0}else if("right"==c.resizeDirection||c.isRightMarkerCaptured){var o=c.isRightMarkerCaptured?c.rightMarker.outerWidth():0,u=!1,v=!1;e<h-o&&(e=h-o,v=!0),e>h+i+o&&(e=h+i+o,u=!0);var w=c._sliderInitialWidth,x=c._findNearestTick(w+c._sliderLeftOffset),y=c._findNearestTick(w+e-c._mouseDownX+c._sliderLeftOffset);if(y<0)return!0;var q=x-y,r=w-q;r<=0&&(q=w,r=0);var z=parseInt(c.element.style.width);c.element.style.width.indexOf("%")>=0&&(z=c.host.width()),(u||c._sliderLeftOffset+r>=z)&&(r=z-c._sliderLeftOffset,boundDetected=!0),r>parseInt(this._maxWidth)&&(r=parseInt(this._maxWidth)),r<parseInt(this._minWidth)&&(r=parseInt(this._minWidth)),c.slider[0].style.width=r+"px";var n=(c._sliderLeftOffset+r)*c._unitPerPixel+c._min,A=c._findNearestTick(c._sliderLeftOffset+r),B=c._valuesArray[c._ticksArray.indexOf(A)];void 0!=B?(c._sliderLeftOffset+r!=A&&(c.slider[0].style.width=A-c._sliderLeftOffset+"px"),c.rightMarkerValue[0].innerHTML=c._formatOutput(B,c.markersFormat,0,"right")):c.rightMarkerValue[0].innerHTML=c._formatOutput(n,c.markersFormat,0,"right"),c.oldX=e}c._layoutShutter(),c._layoutMarkers(),c.moved=!0}1==c.dragging&&(c._moveSlider(k,!0),c.oldX=e)},_moveSlider:function(a,b){var c=this;c.moved=!0;var d=parseInt(this.slider[0].style.width),e=parseInt(a+d),f=this._hostWidth,g=a;if(g<0&&(g=0,a=g),g+d>f&&(g=f-d,a=g),g>=0&&g+d<=f){this.slider[0].style.left=g+"px";var h=this._findNearestTick(g),i=this._majorTicksArray.indexOf(h)!=-1,j=this._valuesArray[this._ticksArray.indexOf(h)];if(void 0!=j){if(this.leftMarkerValue[0].innerHTML=this._formatOutput(j,this.markersFormat,0,"left"),a!=h&&i&&b){this.slider[0].style.left=h+"px";var e=parseInt(h+d)}}else this.leftMarkerValue[0].innerHTML=this._formatOutput(g*this._unitPerPixel+this._min,this.markersFormat,0,"left");var k=this._findNearestTick(e),l=this._valuesArray[this._ticksArray.indexOf(k)];if(void 0!=l){var m=this._majorTicksArray.indexOf(k)!=-1;if(this.rightMarkerValue[0].innerHTML=this._formatOutput(l,this.markersFormat,0,"right"),e!=k&&m&&i&&b){var n=k-h;this.slider[0].style.width=n+"px"}}else this.rightMarkerValue[0].innerHTML=this._formatOutput((g+d)*this._unitPerPixel+this._min,this.markersFormat,0,"right")}this._layoutShutter(),this._layoutMarkers()},_initSlider:function(){var b=this,c=this.toThemeProperty("jqx-rangeselector-shutter")+" "+this.toThemeProperty("jqx-scrollbar-state-normal");a("#"+this._id+"TicksContainer").append("<div id='"+this._id+"ShutterLeft' class='"+c+"'></div><div id='"+this._id+"Slider' class='"+this.toThemeProperty("jqx-rangeselector-slider")+" "+this.toThemeProperty("jqx-scrollbar-thumb-state-normal")+"'><div class='"+this.toThemeProperty("jqx-rangeselector-inner-slider")+"'></div></div><div id='"+this._id+"ShutterRight' class='"+c+"'></div>"),this.slider=a("#"+this._id+"Slider"),this.shutterLeft=a("#"+this._id+"ShutterLeft"),this.shutterRight=a("#"+this._id+"ShutterRight"),this._hostOffset=this.rangeSelector.offset(),this._hostWidth=this.rangeSelector.width(),this._hostHeight=this.rangeSelector.height();var d=this._hostOffset,e=this._initRange(),f=e.left,g=e.right-f,h=g/this._unitPerPixel;this.slider[0].style.width=Math.round(h)+"px";var i=d.left+parseInt((f-this._min)/this._unitPerPixel);if(this.slider.offset({left:i}),this._layoutShutter(),this._initMarkers(),0==this.disabled){this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled")),this.addHandler(this.host,"dragstart.rangeselector"+this._id,function(){return!1}),this.addHandler(a(window),"jqxReady.rangeselector",function(){return b._layoutMarkers(),!1}),this.isSliderCaptured=!1,this.resizeDirection="none",this.isLeftMarkerCaptured=!1,this.isRightMarkerCaptured=!1,this.dragging=!1,this._mouseDownX;var j,k,l="mousedown.rangeselector"+this.element.id;this._isTouchDevice&&(l=a.jqx.mobile.getTouchEventName("touchstart")+".rangeselector"+this.element.id),this.addHandler(this.host,l,function(c){b.isMouseDown=!0,b._hostOffset=b.rangeSelector.offset(),b._hostWidth=b.rangeSelector.width(),b._hostHeight=b.rangeSelector.height(),b._sliderLeftOffset=parseInt(b.slider[0].style.left);var d=c.pageX,e=c.pageY;if(b._isTouchDevice){var f=a.jqx.position(c);d=f.left,e=f.top}b._initialSliderOffset=d-b.slider.offset().left;var g=b.slider.width();b._sliderInitialWidth=g,j=b.slider.offset().left,k=b._sliderInitialWidth,b.initialOffset=j;var h=parseInt(j+k);if(b.oldX=d,b._mouseDownX=d,b.resizeDirection="none",b.sliderRight=h,d>j-5&&d<j+5&&b._heightCheck(e))b.isSliderCaptured=!1,b.dragging=!1,b.resizeDirection="left";else if(d>h-5&&d<h+5&&b._heightCheck(e))b.isSliderCaptured=!1,b.dragging=!1,b.resizeDirection="right";else if(d>=j+5&&d<=h+5&&b._heightCheck(e))b.isSliderCaptured=!0,b.dragging=!0;else if(b.isSliderCaptured=!1,b.dragging=!1,b.moveOnClick){if(b.isLeftMarkerCaptured||b.isRightMarkerCaptured)return!1;var i=b._sliderLeftOffset+b._initialSliderOffset,l=b._findNearestTick(i);i=l,i<0&&(i=0);var m=parseInt(b.slider[0].style.width);e>=b.slider.offset().top&&(d>h?b._moveSlider(i-m,!0):b._moveSlider(i,!0))}}),this.addHandler(b.leftMarker,l,function(c){if(b.leftMarkerAndArrow.addClass(b.toThemeProperty("jqx-fill-state-pressed")),b.oldLeftX=c.pageX,b._isTouchDevice){var d=a.jqx.position(c);oldLeftX=d.left}b._mouseDownX=b.oldLeftX,b.isLeftMarkerCaptured=!0}),this.addHandler(b.rightMarker,l,function(c){if(b.rightMarkerAndArrow.addClass(b.toThemeProperty("jqx-fill-state-pressed")),b.oldRightX=c.pageX,b._isTouchDevice){var d=a.jqx.position(c);oldRightX=d.left}b._mouseDownX=b.oldRightX,b.isRightMarkerCaptured=!0}),this.addHandler(a(document),"selectstart.rangeselector"+this._id,function(a){if(1==b.isSliderCaptured||1==b.isLeftMarkerCaptured||1==b.isRightMarkerCaptured||1==b.dragging)return a.preventDefault(),!1});var m="mousemove.rangeselector"+this.element.id;this._isTouchDevice&&(m=a.jqx.mobile.getTouchEventName("touchmove")+".rangeselector"+this.element.id),this.addHandler(a(document),m,function(a){b._handleMouseMove(a)});var n=function(a){try{var c=b.moved;if(b.moved=!1,b.isMouseDown=!1,b.dragging=!1,b.resizeDirection="none",1==b.isLeftMarkerCaptured&&(b.leftMarkerAndArrow.removeClass(b.toThemeProperty("jqx-fill-state-pressed")),b.isLeftMarkerCaptured=!1),1==b.isRightMarkerCaptured&&(b.rightMarkerAndArrow.removeClass(b.toThemeProperty("jqx-fill-state-pressed")),b.isRightMarkerCaptured=!1),c){var d=b._getValue();b._raiseEvent("0",{type:"mouse",from:d.from,to:d.to})}}catch(a){}};this.addHandler(a(document),"mouseup.rangeselector"+this._id,function(a){n(a)});try{if((""!=document.referrer||window.frameElement)&&null!=window.top&&window.top!=window.self){var o=function(a){n(a)},p=null;window.parent&&document.referrer&&(p=document.referrer),p&&p.indexOf(document.location.host)!=-1&&window.top.document&&(window.top.document.addEventListener?window.top.document.addEventListener("mouseup",o,!1):window.top.document.attachEvent&&window.top.document.attachEvent("onmouseup",o))}}catch(a){}}else this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"));this._moveSlider(parseInt(b.slider[0].style.left)),this.moved=!1},_initMarkers:function(){var b=a("#"+this._id+"TicksContainer"),c=this.toThemeProperty("jqx-rangeselector-markers")+" "+this.toThemeProperty("jqx-disableselect")+" "+this.toThemeProperty("jqx-fill-state-normal");b.append("<div id='"+this._id+"LeftMarker' class='"+c+"'></div><div id='"+this._id+"RightMarker' class='"+c+"'></div>");var d=this.toThemeProperty("jqx-rangeselector-marker-arrow")+" "+this.toThemeProperty("jqx-fill-state-normal");d+="bottom"==this.markersPosition?" "+this.toThemeProperty("jqx-rangeselector-marker-arrow-bottom"):" "+this.toThemeProperty("jqx-rangeselector-marker-arrow-top"),b.append("<div id='"+this._id+"LeftMarkerArrow' class='"+d+" "+this.toThemeProperty("jqx-rangeselector-marker-left-arrow")+"'></div>"),b.append("<div id='"+this._id+"RightMarkerArrow' class='"+d+" "+this.toThemeProperty("jqx-rangeselector-marker-right-arrow")+"'></div>"),a("#"+this._id+"LeftMarker").append("<div id='"+this._id+"LeftMarkerValue' class='"+this.toThemeProperty("jqx-disableselect")+" "+this.toThemeProperty("jqx-rangeselector-markers-value")+"'></div>"),a("#"+this._id+"RightMarker").append("<div id='"+this._id+"RightMarkerValue' class='"+this.toThemeProperty("jqx-disableselect")+" "+this.toThemeProperty("jqx-rangeselector-markers-value")+"'></div>");var e=a("#"+this._id+"LeftMarker, #"+this._id+"RightMarker, #"+this._id+"LeftMarkerArrow, #"+this._id+"RightMarkerArrow"),f=a("#"+this._id+"LeftMarker, #"+this._id+"LeftMarkerArrow"),g=a("#"+this._id+"RightMarker, #"+this._id+"RightMarkerArrow");if(1==this.showMarkers?e.css("visibility","visible"):e.css("visibility","hidden"),0==this.disabled&&1==this.resizable){var h=this;this.addHandler(f,"mouseenter.rangeselector"+this._id,function(a){h.element.style.cursor="pointer",f.addClass(h.toThemeProperty("jqx-fill-state-hover"))}),this.addHandler(f,"mouseleave.rangeselector"+this._id,function(a){h.element.style.cursor="auto",f.removeClass(h.toThemeProperty("jqx-fill-state-hover"))}),this.addHandler(g,"mouseenter.rangeselector"+this._id,function(a){h.element.style.cursor="pointer",g.addClass(h.toThemeProperty("jqx-fill-state-hover"))}),this.addHandler(g,"mouseleave.rangeselector"+this._id,function(a){h.element.style.cursor="auto",g.removeClass(h.toThemeProperty("jqx-fill-state-hover"))})}this.leftMarkerAndArrow=f,this.rightMarkerAndArrow=g,this.leftMarkerArrow=a("#"+this._id+"LeftMarkerArrow"),this.rightMarkerArrow=a("#"+this._id+"RightMarkerArrow"),this.leftMarker=a("#"+this._id+"LeftMarker"),this.rightMarker=a("#"+this._id+"RightMarker"),this.leftMarkerValue=a("#"+this._id+"LeftMarkerValue"),this.rightMarkerValue=a("#"+this._id+"RightMarkerValue");var i=this._initRange();this._updateMarkersValues(i.left,i.right),this._layoutMarkers(),"auto"==this.padding?(this.host.css("padding-left",this.leftMarker[0].offsetWidth),this.host.css("padding-right",this.rightMarker[0].offsetWidth),this.host.css("padding-top",this._leftMarkerHeight+7)):this.host.css("padding",this.padding)},_layoutMarkers:function(){if(1==this.showMarkers){this._hostOffset||(this._hostOffset=this.rangeSelector.offset()),this._leftMarkerHeight||(this._leftMarkerHeight=this.leftMarker.outerHeight(),this._rightMarkerHeight=this.rightMarker.outerHeight());var a=(this._hostOffset.top,parseInt(this.slider[0].style.left)+this._hostOffset.left),b=-5;"bottom"==this.markersPosition&&(b=parseInt(this.element.style.height)+4+this._rightMarkerHeight);var c=b-this._leftMarkerHeight,d=b-this._rightMarkerHeight;"bottom"==this.markersPosition&&(b=parseInt(this.element.style.height)-6);var e=this.leftMarker[0].offsetWidth,f=1+a-e-this._hostOffset.left;this.leftMarker[0].style.left=f+"px",this.leftMarker[0].style.top=c+"px",this.leftMarkerArrow[0].style.left=2+f+e+"px",this.leftMarkerArrow[0].style.top=6+b+"px";var g=a+parseInt(this.slider[0].style.width)-this._hostOffset.left;this.rightMarker[0].style.left=g+"px",this.rightMarker[0].style.top=d+"px",this.rightMarkerArrow[0].style.left=7+g+"px",this.rightMarkerArrow[0].style.top=6+b+"px"}},_updateMarkersValues:function(a,b){var c=a,d=b;this.leftMarkerValue[0].innerHTML=this._formatOutput(c,this.markersFormat,0,"left",!0),this.rightMarkerValue[0].innerHTML=this._formatOutput(d,this.markersFormat,0,"right",!0)},_removeHandlers:function(){var b=this.element.id,c=a("#"+b+"LeftMarker, #"+b+"LeftMarkerArrow"),d=a("#"+b+"RightMarker, #"+b+"RightMarkerArrow"),e="mousemove.rangeselector"+b,f="mousedown.rangeselector"+b;this._isTouchDevice&&(e=a.jqx.mobile.getTouchEventName("touchmove")+".rangeselector"+b,f=a.jqx.mobile.getTouchEventName("touchstart")+".rangeselector"+b),this.removeHandler(a(document),e),this.removeHandler(a(document),"mouseup.rangeselector"+b),this.removeHandler(this.host,f),this.removeHandler(this.host,"click.rangeselector"+b),this.removeHandler(this.host,"dragstart.rangeselector"+b),this.removeHandler(c,"mouseenter.rangeselector"+b),this.removeHandler(c,"mouseleave.rangeselector"+b),this.removeHandler(d,"mouseenter.rangeselector"+b),this.removeHandler(d,"mouseleave.rangeselector"+b),this.removeHandler(a("#"+b+"LeftMarker"),f),this.removeHandler(a("#"+b+"RightMarker"),f),this.removeHandler(a("#"+b+"LeftMarkerValue, #"+b+"RightMarkerValue"),"selectstart.rangeselector"+b)},_heightCheck:function(a){var b=this.slider,c=b.offset().top;return a>=c&&a<=c+b.height()},_checkProperties:function(){this._range._from<this._min?this._range._from=this._min:this._range._from>this._min&&this._range._from>this._max&&(this._range._from=this._min),this._range._to>this._max?this._range._to=this._max:this._range._to<this._min&&this._range._to<this._max&&(this._range._to=this._max);var a=this._max-this._min;this._range._min>a&&(this._range._min=a),this._range._max>a&&(this._range._max=a);var b=this._range._to-this._range._from;b<this._range._min?this._range._to=this._range._from+this._range._min:b>this._range._max&&(this._range._to=this._range._from+this._range._max)},_findNearestTick:function(a){for(var b=0,c=Math.abs(a-this._ticksArray[0]),d=1;d<this._ticksArray.length;d++){var e=Math.abs(a-this._ticksArray[d]);c>e&&(c=e,b=d)}return this._ticksArray[b]},_privateProperties:function(){this._min=this._validateInput(this.min),this._max=this._validateInput(this.max),this._range=new Object,this._range._from=this._validateInput(void 0!=this.range.from?this.range.from:0),this._range._to=this._validateInput(void 0!=this.range.to?this.range.to:1/0),this._range._min=this._minMaxDate(void 0!=this.range.min?this.range.min:0),this._range._max=this._minMaxDate(void 0!=this.range.max?this.range.max:1/0)},_validateInput:function(a){var b;return"number"==typeof a?b=a:"string"==typeof a?b=Date.parse(a):a instanceof Date&&(b=a.getTime()),b},_minMaxDate:function(a){if("number"!=typeof a){var b;switch(a){case"millisecond":b=1;break;case"second":b=1e3;break;case"minute":b=6e4;break;case"hour":b=36e5;break;case"day":b=864e5;break;case"week":b=6048e5;break;default:b=a.milliseconds?a.milliseconds:0+a.seconds?1e3*a.seconds:0+a.minutes?6e4*a.minutes:0+a.hours?36e5*a.hours:0+a.days?864e5*a.days:0+a.weeks?6048e5*a.weeks:0}return b}return a},_formatOutput:function(b,c,d,e,f){var g;if(this.values||(this.values=new Array),this.values[e]=b,"label"==e&&this.labelsFormatFunction)g="date"==this._dataType?this._roundDate(b):this._roundNumber(b,"label"),g=this.labelsFormatFunction(g);else if("label"!=e&&this.markersFormatFunction)"date"==this._dataType&&(g=this._roundDate(b)),g=this.markersFormatFunction(b,e);else if(c)"number"==this._dataType?g=a.jqx.dataFormat.formatnumber(b,c):(g=this._roundDate(b),g=a.jqx.dataFormat.formatdate(g,c));else{if("date"==this._dataType){var h;null==this.labelsFormat&&null==this.markersFormat?h="both labelsFormat and markersFormat":null==this.labelsFormat?h="labelsFormat":null==this.markersFormat&&(h="markersFormat");var i="When the data format is date, "+h+" should be set.";throw new Error(i)}g=b.toFixed(d)}return g},_getValue:function(a){function b(a){return"number"===c._dataType?Math.round(a/d)*d:c._roundNumber(a,"marker")}var c=this,d=c.minorTicksInterval,e=this.slider,f=e.width(),g=new Object,h=e.offset().left-this.rangeSelector.offset().left,i=h*this._unitPerPixel+this._min;if(g.from=b(i),g.to=b(i+f*this._unitPerPixel),!a&&1==this.snapToTicks){var j=this._findNearestTick((g.from-this._min)/this._unitPerPixel);g.from=this._valuesArray[this._ticksArray.indexOf(j)];var k=this._findNearestTick((g.to-this._min)/this._unitPerPixel);g.to=this._valuesArray[this._ticksArray.indexOf(k)]}return"date"==this._dataType&&(g.from=new Date(g.from),g.to=new Date(g.to)),g},_roundNumber:function(a,b,c){var d;return"marker"==b?(1==c&&(a=parseFloat(a)),d=parseFloat(a)):d="label"==b?parseFloat(a):parseFloat(a),d},_roundDate:function(a){"number"==typeof a&&(a=new Date(a));var b=this._max-this._min;if(b>12096e5){var c=a.getDate(),d=a.getHours();d>12&&(a.setDate(c+1),a.setHours(0),a.setMinutes(0),a.setSeconds(0))}else b>1728e5&&(a.setHours(a.getHours()+Math.round(a.getMinutes()/60)),a.setMinutes(0),a.setSeconds(0));return a},_layoutShutter:function(){var b=parseInt(this.slider[0].style.left);this.shutterLeft[0].style.width=b+"px",this.shutterLeft[0].style.left="0px",a.jqx.browser.msie&&a.jqx.browser.version<9&&(this.shutterLeft[0].style.filter="progid:DXImageTransform.Microsoft.Alpha(Opacity=75)",this.shutterRight[0].style.filter="progid:DXImageTransform.Microsoft.Alpha(Opacity=75)");var c=1+b+parseInt(this.slider[0].style.width);this.shutterRight[0].style.left=c+"px";var d=parseInt(this.element.style.width);
if(this.element.style.width.indexOf("%")>=0)var d=parseInt(this.host.width());var e=d-1-b-parseInt(this.slider[0].style.width);e<0&&(e=0),this.shutterRight[0].style.width=1+e+"px",c+1+e<2+d&&(this.shutterRight[0].style.width=2+e+"px"),0==e&&(this.shutterRight[0].style.width="0px")},_initRange:function(){if(this._range._from>this._range._to)throw new Error("jqxRangeSelector: range object initialization error. 'min' should be less than 'max'");var a=this._range._from,b=this._range._to,c={left:a,right:b};return c}})}(jqxBaseFramework);

