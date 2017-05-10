/*
jQWidgets v4.5.2 (2017-May)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
!function(a){"use strict";a.jqx.jqxWidget("jqxInput","",{}),a.extend(a.jqx._jqxInput.prototype,{defineInstance:function(){var b=this,c={disabled:!1,filter:b._filter,sort:b._sort,highlight:b._highlight,dropDownWidth:null,renderer:b._renderer,opened:!1,$popup:document.createElement("ul"),source:[],roundedCorners:!0,searchMode:"default",placeHolder:"",width:null,height:null,value:"",rtl:!1,displayMember:"",valueMember:"",events:["select","open","close","change"],popupZIndex:2e4,items:8,minLength:1,maxLength:null};return this===a.jqx._jqxInput.prototype?c:(a.extend(!0,this,c),c)},createInstance:function(){var b=this;"none"!==b.host.css("display")&&document.body.contains(b.element)!==!1||(b._initiallyHidden=!0),b._popupHelper=a(b.$popup),b.render()},render:function(){var b=this;if("textarea"===this.element.nodeName.toLowerCase())this.element.style.overflow="auto";else if("div"===this.element.nodeName.toLowerCase()){this.baseHost=this.element;var c=b.element.getElementsByTagName("input"),d=!1;if(a.each(c,function(){var b=this.type;if(null==b||"text"===b||"textarea"===b)return c=a(this),d=!0,!1}),!d)throw new Error("jqxInput: Missing Text Input in the Input Group");if(c.length>0){this.baseHost=a(this.element),b.baseElement=b.element;var e=this.host.data();this.host=c,this.element=c[0],this.host.data(e),b.baseElement.className+=" "+b.toThemeProperty("jqx-widget jqx-rc-all jqx-input-group");var f=this.baseHost.children();a.each(f,function(c){var d="jqx-input-group-addon";a(this).removeClass(b.toThemeProperty("jqx-rc-all")),0===c&&(d+=" jqx-rc-l"),c===f.length-1&&(d+=" jqx-rc-r"),this!==b.element&&(d+=" jqx-fill-state-normal"),this.className+=" "+b.toThemeProperty(d)})}}this.addHandlers(),this.rtl&&(b.element.className+=" "+b.toThemeProperty("jqx-rtl")),b.element.setAttribute("role","textbox"),a.jqx.aria(this,"aria-autocomplete","both"),a.jqx.aria(this,"aria-disabled",this.disabled),a.jqx.aria(this,"aria-readonly",!1),a.jqx.aria(this,"aria-multiline",!1),this.source&&this.source.length&&a.jqx.aria(this,"aria-haspopup",!0),""!==this.value&&(this.element.value=this.value),this._oldsource=this.source,this._updateSource()},_updateSource:function(){var b=this,c=function(a){if(void 0===a)return null;if("string"==typeof a||a instanceof String)return{label:a,value:a};if("string"!=typeof a&&a instanceof String==!1){var c="",d="";return""!==b.displayMember&&void 0!==b.displayMember&&a[b.displayMember]&&(c=a[b.displayMember]),""!==b.valueMember&&void 0!==b.valueMember&&(d=a[b.valueMember]),""===c&&(c=a.label),""===d&&(d=a.value),{label:c,value:d}}return a},d=function(a){for(var b=[],d=0;d<a.length;d++)b[d]=c(a[d]);return b};if(this.source&&this.source._source){if(this.adapter=this.source,null!=this.adapter._source.localdata)this.adapter.unbindBindingUpdate(this.element.id),this.adapter.bindBindingUpdate(this.element.id,function(){b.source=d(b.adapter.records)});else{var e={};this.adapter._options.data?a.extend(b.adapter._options.data,e):(this.source._source.data&&a.extend(e,this.source._source.data),this.adapter._options.data=e),this.adapter.unbindDownloadComplete(this.element.id),this.adapter.bindDownloadComplete(this.element.id,function(){b.source=d(b.adapter.records)})}return void this.source.dataBind()}a.isFunction(this.source)||(this.source=d(this.source))},_refreshClasses:function(b){var c=b?"addClass":"removeClass",d="jqx-widget-content jqx-input jqx-widget",e="jqx-popup jqx-input-popup jqx-menu jqx-menu-vertical jqx-menu-dropdown jqx-widget jqx-widget-content";a.jqx.browser.msie&&(e+=" jqx-noshadow"),this.roundedCorners&&(d+=" jqx-rc-all",e+=" jqx-rc-all"),this.disabled?d+=" jqx-fill-state-disabled":this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled")),this.host[c](this.toThemeProperty(d)),this._popupHelper[c](this.toThemeProperty(e))},selectAll:function(){var a=this.host;setTimeout(function(){if("selectionStart"in a[0])a[0].focus(),a[0].setSelectionRange(0,a[0].value.length);else{var b=a[0].createTextRange();b.collapse(!0),b.moveEnd("character",a[0].value.length),b.moveStart("character",0),b.select()}},10)},selectLast:function(){var a=this.host;this.selectStart(a[0].value.length)},selectFirst:function(){this.selectStart(0)},selectStart:function(a){var b=this.host;setTimeout(function(){if("selectionStart"in b[0])b[0].focus(),b[0].setSelectionRange(a,a);else{var c=b[0].createTextRange();c.collapse(!0),c.moveEnd("character",a),c.moveStart("character",a),c.select()}},10)},focus:function(){try{var a=this;a.element.focus(),setTimeout(function(){a.element.focus()},25)}catch(a){}},resize:function(a,b){this.width=a,this.height=b,this.refresh()},refresh:function(){if(this._refreshClasses(!1),this._refreshClasses(!0),this.baseHost){this.width&&(this.baseElement.style.width=this._toPx(this.width)),this.height&&(this.baseElement.style.height=this._toPx(this.height));var b=this,c=a.jqx.browser.msie&&a.jqx.browser.version<9,d=0;if(a.each(this.baseHost.children(),function(){this.style.height="100%",this!==b.element&&(d+=a(this).outerWidth())}),b._addonsWidth=d,c){var e=Math.max(0,b.baseElement.offsetHeight-2);b.element.style.width=Math.max(0,b.baseElement.offsetWidth-d-1)+"px",b.element.style.minHeight=e+"px",b.element.style.lineHeight=e+"px"}else b.element.style.width="calc(100% - "+d+"px)";a.jqx.utilities.resize(b.baseHost,function(){if(c&&"string"==typeof b.width&&b.width.indexOf("%")!==-1&&!b._initiallyHidden)b.element.style.width=b.baseElement.offsetWidth-b._addonsWidth-1+"px";else if(b._initiallyHidden){if(b._addonsWidth=b._getAddonsWidth(),c){b.element.style.width=b.baseElement.offsetWidth-b._addonsWidth-1+"px";var a=b.baseElement.offsetHeight-2;b.element.style.minHeight=a+"px",b.element.style.lineHeight=a+"px"}else b.element.style.width="calc(100% - "+b._addonsWidth+"px)";b._initiallyHidden=!1}})}else this.width&&(this.element.style.width=this._toPx(this.width)),this.height&&(this.element.style.height=this._toPx(this.height));this.disabled?this.element.setAttribute("disabled",!0):this.element.removeAttribute("disabled"),this.maxLength&&this.element.setAttribute("maxlength",this.maxLength),this.element.getAttribute("placeholder")||this._refreshPlaceHolder()},_refreshPlaceHolder:function(){var b=this;"placeholder"in this.element&&!(a.jqx.browser.msie&&a.jqx.browser.version<9)?b.element.setAttribute("placeHolder",b.placeHolder):""===b.element.value&&(b.element.value=b.placeHolder)},destroy:function(){this.removeHandlers(),this.baseHost?this.baseHost.remove():this.host.remove(),this.$popup&&this._popupHelper.remove()},propertiesChangedHandler:function(a,b,c){c.width&&c.height&&2===Object.keys(c).length&&a.refresh()},propertyChangedHandler:function(b,c,d,e){if("width"===c&&e!==d)return void(b.baseHost?(b.baseElement.style.width=b._toPx(e),a.jqx.browser.msie&&a.jqx.browser.version<9&&(b.element.style.width=b.baseElement.offsetWidth-b._addonsWidth-1+"px")):b.element.style.width=b._toPx(e));if("placeHolder"===c)return"placeholder"in b.element&&!(a.jqx.browser.msie&&a.jqx.browser.version<9)||b.element.value!==d||(b.element.value=""),void b._refreshPlaceHolder();if(!(b.batchUpdate&&b.batchUpdate.width&&b.batchUpdate.height&&2===Object.keys(b.batchUpdate).length)){if("theme"===c&&a.jqx.utilities.setTheme(d,e,b.host),"opened"===c)return void(e?b.open():b.close());"source"===c&&(b._oldsource=e,b._updateSource()),"displayMember"!==c&&"valueMember"!==c||(b.source=b._oldsource,b._updateSource()),"disabled"===c&&a.jqx.aria(b,"aria-disabled",b.disabled),"value"===c&&(b.element.value=e),b.refresh()}},select:function(a,b,c){var d=this._find("jqx-fill-state-pressed",this._popupHelper),e=d.getAttribute("data-value"),f=d.getAttribute("data-name");return this.element.value=this.renderer(f,this.element.value),this.selectedItem={label:f,value:e},this.element.setAttribute("data-value",e),this.element.setAttribute("data-label",f),this._raiseEvent("0",{item:{label:f,value:e},label:f,value:e}),this._raiseEvent("3",{type:c,item:{label:f,value:e},label:f,value:e}),this.value=f,this.close()},val:function(a){return 0===arguments.length||null!=a&&"object"==typeof a&&!a.label&&!a.value?""!==this.displayMember&&""!==this.valueMember&&this.selectedItem?""===this.element.value?"":this.selectedItem:this.element.value:a&&a.label?(this.selectedItem={label:a.label,value:a.value},this.element.setAttribute("data-value",a.value),this.element.setAttribute("data-label",a.label),this.value=a,this.element.value=a.label,this.element.value):(this.value=a,this.element.value=a,this.element.setAttribute("data-value",a),this.element.setAttribute("data-label",a),a&&a.label?this._raiseEvent("3",{type:null,item:{label:a.label,value:a.value},label:a.label,value:a.value}):this._raiseEvent("3",{type:null,item:{label:a,value:a},label:a,value:a}),this.element.value)},_raiseEvent:function(b,c){void 0===c&&(c={owner:null});var d=this.events[b];c.owner=this;var e=new a.Event(d);e.owner=this,e.args=c,e.preventDefault&&e.preventDefault();var f=this.host.trigger(e);return f},_renderer:function(a){return a},open:function(){if(!a.jqx.isHidden(this.host)){var b=a.extend({},this.host.coord(!0),{height:this.element.offsetHeight});if(this.$popup.parentNode!==document.body){var c=this.element.id+"_popup";this.$popup.id=c,a.jqx.aria(this,"aria-owns",c),document.body.appendChild(this.$popup)}this.$popup.style.position="absolute",this.$popup.style.zIndex=this.popupZIndex,this.$popup.style.top=this._toPx(b.top+b.height),this.$popup.style.left=this._toPx(b.left),this.$popup.style.display="block";var d=0,e=this._popupHelper.children();return a.each(e,function(){d+=a(this).outerHeight()+1}),this.$popup.style.height=this._toPx(d),this.opened=!0,this._raiseEvent("1",{popup:this.$popup}),a.jqx.aria(this,"aria-expanded",!0),this}},close:function(){return this.$popup.style.display="none",this.opened=!1,this._raiseEvent("2",{popup:this.$popup}),a.jqx.aria(this,"aria-expanded",!1),this},suggest:function(){var b;return this.query=this.element.value,!this.query||this.query.length<this.minLength?this.opened?this.close():this:(b=a.isFunction(this.source)?this.source(this.query,a.proxy(this.load,this)):this.source,b?this.load(b):this)},load:function(a){for(var b=this,c=[],d=0;d<a.length;d++){var e=a[d];b.filter(e)&&c.push(e)}return c=this.sort(c),c.length?this._render(c.slice(0,this.items)).open():this.opened?this.close():this},_filter:function(b){var c=this.query,d=b;switch(null!=b.label?d=b.label:this.displayMember&&(d=b[this.displayMember]),this.searchMode){case"none":break;default:return a.jqx.string.containsIgnoreCase(d,c);case"contains":return a.jqx.string.contains(d,c);case"equals":return a.jqx.string.equals(d,c);case"equalsignorecase":return a.jqx.string.equalsIgnoreCase(d,c);case"startswith":return a.jqx.string.startsWith(d,c);case"startswithignorecase":return a.jqx.string.startsWithIgnoreCase(d,c);case"endswith":return a.jqx.string.endsWith(d,c);case"endswithignorecase":return a.jqx.string.endsWithIgnoreCase(d,c)}},_sort:function(a){for(var b=[],c=[],d=[],e=0;e<a.length;e++){var f=a[e],g=f;f.label?g=f.label:this.displayMember&&(g=f[this.displayMember]),0===g.toString().toLowerCase().indexOf(this.query.toString().toLowerCase())?b.push(f):g.toString().indexOf(this.query)>=0?c.push(f):g.toString().toLowerCase().indexOf(this.query.toString().toLowerCase())>=0&&d.push(f)}return b.concat(c,d)},_highlight:function(a){var b=this.query;b=b.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");var c=new RegExp("("+b+")","ig");return a.replace(c,function(a,b){return"<b>"+b+"</b>"})},_render:function(b){var c=this,d=c._popupHelper.children();if(d.length>0)for(var e=0;e<d.length;e++)a(d[e]).remove();var f=function(a,b){var d,e,f=a,g=document.createElement("li"),h=document.createElement("a");h.setAttribute("href","#"),g.appendChild(h),void 0!==a.value&&null!==a.value?void 0!==a.label&&null!==a.label?(d=a.label,e=a.value):(d=a.value,e=a.value):void 0!==a.label&&null!==a.label?(d=a.label,e=a.label):void 0!==c.displayMember&&""!==c.displayMember?(d=a[c.displayMember],e=a[c.valueMember]):(d=a,e=a),g.setAttribute("data-value",e),g.setAttribute("data-name",d),a.label?f=a.label:c.displayMember&&(f=a[c.displayMember]),h.innerHTML=c.highlight(f);var i="";c.rtl&&(i=" jqx-rtl"),0===b&&(i+=" jqx-fill-state-pressed"),g.className=c.toThemeProperty("jqx-item jqx-menu-item jqx-rc-all"+i),c.$popup.appendChild(g),c.addHandler(g,"mouseenter",function(a){c.mouseenter(a)})},g=function(a){for(var b=0;b<a.length;b++)f(a[b],b)};return g(b),this.dropDownWidth?this.$popup.style.width=c._toPx(c.dropDownWidth):this.$popup.style.width=c._toPx(c.element.offsetWidth-6),this},next:function(){var b=this._find("jqx-fill-state-pressed",this._popupHelper),c=b.nextSibling;a(b).removeClass(this.toThemeProperty("jqx-fill-state-pressed")),c||(c=this.$popup.firstChild),c.className+=" "+this.toThemeProperty("jqx-fill-state-pressed")},prev:function(){var b=this._find("jqx-fill-state-pressed",this._popupHelper),c=b.previousSibling;a(b).removeClass(this.toThemeProperty("jqx-fill-state-pressed")),c||(c=this.$popup.lastChild),c.className+=" "+this.toThemeProperty("jqx-fill-state-pressed")},addHandlers:function(){var a=this,b=".jqxInput"+a.element.id;a.addHandler(a.host,"focus"+b,function(){a.onFocus()}),a.addHandler(a.host,"blur"+b,function(){a.onBlur()}),a.addHandler(a.host,"change"+b,function(b){if(!b.args){b.stopPropagation(),b.preventDefault();var c,d,e=a.val();e&&e.label?(c=e.label,d=e.val):(c=e,d=e),a._raiseEvent("3",{type:"keyboard",item:{label:c,value:d},label:c,value:d}),a.value=c}}),a.addHandler(a.host,"keypress"+b,function(b){a.keypress(b)}),a.addHandler(a.host,"keyup"+b,function(b){a.keyup(b)}),a.addHandler(a.host,"keydown"+b,function(b){a.keydown(b)}),a.addHandler(a.$popup,"mousedown"+b,function(b){a.click(b)})},removeHandlers:function(){var a=this,b=".jqxInput"+a.element.id;a.removeHandler(a.host,"change"+b),a.removeHandler(a.host,"focus"+b),a.removeHandler(a.host,"blur"+b),a.removeHandler(a.host,"keypress"+b),a.removeHandler(a.host,"keyup"+b),a.removeHandler(a.host,"keydown"+b),a.removeHandler(a.$popup,"mousedown"+b)},move:function(a){if(this.opened){switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:a.shiftKey||(a.preventDefault(),this.prev());break;case 40:a.shiftKey||(a.preventDefault(),this.next())}a.stopPropagation()}},keydown:function(a){var b=[40,38,9,13,27];this.suppressKeyPressRepeat=b.indexOf(a.keyCode)!==-1,this.move(a)},keypress:function(a){this.suppressKeyPressRepeat||this.move(a)},keyup:function(a){switch(a.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.opened)return;this.select(a,this,"keyboard");break;case 27:if(!this.opened)return;this.close();break;default:var b=this;this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){b.suggest()},300)}a.stopPropagation(),a.preventDefault()},clear:function(){this.val("")},onBlur:function(){var b=this;setTimeout(function(){b.close()},150),b.host.removeClass(b.toThemeProperty("jqx-fill-state-focus")),"placeholder"in b.element&&!(a.jqx.browser.msie&&a.jqx.browser.version<9)||""!==b.element.value&&b.element.value!==b.placeHolder||(b.element.value=b.placeHolder)},onFocus:function(){var b=this;b.element.className+=" "+b.toThemeProperty("jqx-fill-state-focus"),"placeholder"in b.element&&!(a.jqx.browser.msie&&a.jqx.browser.version<9)||b.element.value!==b.placeHolder||(b.element.value="")},click:function(a){a.stopPropagation(),a.preventDefault(),this.select(a,this,"mouse")},mouseenter:function(b){a(this._find("jqx-fill-state-pressed",this._popupHelper)).removeClass(this.toThemeProperty("jqx-fill-state-pressed")),b.currentTarget.className+=" "+this.toThemeProperty("jqx-fill-state-pressed")},_toPx:function(a){return"number"==typeof a?a+"px":a},_find:function(a,b){for(var c=b.children(),d=0;d<c.length;d++){var e=c[d];if(e.className.indexOf(a)!==-1)return e}},_getAddonsWidth:function(){for(var b=this,c=b.baseHost.children(),d=0,e=0;e<c.length;e++)c[e]!==b.element&&(d+=a(c[e]).outerWidth());return d}})}(jqxBaseFramework);

