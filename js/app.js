/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2014 Rico Sta. Cruz
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
function playBass(a){playSound(bufferLoader.bufferList[0],ctx.destination,a)}function playBass0(a){playSound(bufferLoader.bufferList[4],ctx.destination,a)}function playBass1(a){playSound(bufferLoader.bufferList[5],ctx.destination,a)}function playBass2(a){playSound(bufferLoader.bufferList[6],ctx.destination,a)}function playBass3(a){playSound(bufferLoader.bufferList[7],ctx.destination,a)}function playBass4(a){playSound(bufferLoader.bufferList[8],ctx.destination,a)}function playBass5(a){playSound(bufferLoader.bufferList[9],ctx.destination,a)}function playBass6(a){playSound(bufferLoader.bufferList[10],ctx.destination,a)}function playBass7(a){playSound(bufferLoader.bufferList[11],ctx.destination,a)}function playBass8(a){playSound(bufferLoader.bufferList[12],ctx.destination,a)}function playBass9(a){playSound(bufferLoader.bufferList[13],ctx.destination,a)}function playBass10(a){playSound(bufferLoader.bufferList[14],ctx.destination,a)}function playPiano(){var a=playSound(bufferLoader.bufferList[1],panner,0);createAnima(a.buffer.duration,animaX,animaY)}function playPiano2(){}function playPad(){}function playSound(a,b,c){var d=ctx.createBufferSource();return d.buffer=a,d.buffer.gain=seVolume,d.loop=!1,d.connect(analyzer),d.start(ctx.currentTime+c),d}function schedule(){var a=ctx.currentTime-startTime;for(bgloop.restart&&bgloop.ended&&document.getElementsByClassName("released").length>0&&(console.log("restart"),bgloop.play());a>=noteTime;){if(noteTime+=.001*interval*.1,drawSpectrum(),time%5===0&&createStart===!0&&(panner.setPosition(.01*(animaX-.5*window.innerWidth),0,10),playPiano(),createStart=!1),time%10===0){for(var b=1;b<beatMap.length;b++)if(beatMap[b]>a){interval=1e3*(beatMap[b]-beatMap[b-1]),hitInterval=.001*interval*1/12*6;break}released=document.getElementsByClassName("released"),frog=document.getElementsByClassName("frog"),hit=0;var c,d,e,f,g,h=window.innerWidth,i=window.innerHeight;for(b=0,len=released.length;len>b;b++){{b+Math.round(Math.random())}c=released[b],d=$(c),e=c.dataset.level,f=Math.floor((Math.random()-.5)*movementRange),g=Math.floor((Math.random()-.5)*movementRange),varXY=1.5*(Math.abs(f)+Math.abs(g))+100,10===e&&(f=1.5*f+50,g=1.5*g+50),(parseFloat(c.style.left)<0||h<parseFloat(c.style.left)||parseFloat(c.style.top)<0||i<parseFloat(c.style.top))&&(c.style.opacity=c.style.opacity-.1);var j=parseFloat(c.style.opacity);if(.05>=j&&(parentElm.removeChild(c),len--,b--),hitObj=d.collision(frog).not(c),hitObj.length>0){if(10!==e&&(void 0===e?c.dataset.level=0:(c.dataset.level++,e=Number(c.dataset.level))),c.style.opacity=j+.2+.1*(10-e),c.style.webkitAnimation="none",restartAnimation(c),void 0===e)playBass(hitInterval*hit);else switch(e){case 0:playBass0(hitInterval*hit);break;case 1:playBass1(hitInterval*hit);break;case 2:playBass2(hitInterval*hit);break;case 3:playBass3(hitInterval*hit);break;case 4:playBass4(hitInterval*hit);break;case 5:playBass5(hitInterval*hit);break;case 6:playBass6(hitInterval*hit);break;case 7:playBass7(hitInterval*hit);break;case 8:playBass8(hitInterval*hit);break;case 9:playBass9(hitInterval*hit);break;case 10:playBass10(hitInterval*hit)}hit++}1===Math.round(Math.random()+.3)&&d.transition({left:"+="+f,top:"+="+g,opacity:"-="+125e-7*Math.pow(len,3),rotate:180*Math.atan2(f,-g)/Math.PI+"deg"},interval-1)}$(".ripple:gt("+(15>=2*len?2*len:15)+")").remove()}time%20===0&&(time=0),time++}timeoutId=setTimeout(function(){schedule()},4)}function createAnima(a){var b=Math.floor(Math.random()*window.innerWidth),c=Math.random()<.5?-30:window.innerHeight,d=document.createElement("div");d.className="frog",void 0!==d.textContent?d.textContent="o o":d.innerText="o o",d.style.left=b+"px",d.style.top=c+"px",isMobile.any&&(d.style.boxShadow="none"),$(d).animaMove(animaX,animaY,1e3*a),parentElm.insertBefore(d,parentElm.childNodes[0])}function drawSpectrum(){canvasCtx.clearRect(0,0,canvasWidth,canvasHeight);var a=new Uint8Array(analyzer.frequencyBinCount);analyzer.getByteFrequencyData(a);for(var b=Math.round(canvasWidth/bar_width),c=0;b>c;c++){var d=a[c];canvasCtx.fillRect(bar_width*c,canvasHeight,bar_width-2,-d+60)}}!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){function b(a){if(a in l.style)return a;for(var b=["Moz","Webkit","O","ms"],c=a.charAt(0).toUpperCase()+a.substr(1),d=0;d<b.length;++d){var e=b[d]+c;if(e in l.style)return e}}function c(){return l.style[m.transform]="",l.style[m.transform]="rotateY(90deg)",""!==l.style[m.transform]}function d(a){return"string"==typeof a&&this.parse(a),this}function e(a,b,c){b===!0?a.queue(c):b?a.queue(b,c):a.each(function(){c.call(this)})}function f(b){var c=[];return a.each(b,function(b){b=a.camelCase(b),b=a.transit.propertyMap[b]||a.cssProps[b]||b,b=i(b),m[b]&&(b=i(m[b])),-1===a.inArray(b,c)&&c.push(b)}),c}function g(b,c,d,e){var g=f(b);a.cssEase[d]&&(d=a.cssEase[d]);var h=""+k(c)+" "+d;parseInt(e,10)>0&&(h+=" "+k(e));var i=[];return a.each(g,function(a,b){i.push(b+" "+h)}),i.join(", ")}function h(b,c){c||(a.cssNumber[b]=!0),a.transit.propertyMap[b]=m.transform,a.cssHooks[b]={get:function(c){var d=a(c).css("transit:transform");return d.get(b)},set:function(c,d){var e=a(c).css("transit:transform");e.setFromString(b,d),a(c).css({"transit:transform":e})}}}function i(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function j(a,b){return"string"!=typeof a||a.match(/^[\-0-9\.]+$/)?""+a+b:a}function k(b){var c=b;return"string"!=typeof c||c.match(/^[\-0-9\.]+/)||(c=a.fx.speeds[c]||a.fx.speeds._default),j(c,"ms")}a.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:!0,useTransitionEnd:!1};var l=document.createElement("div"),m={},n=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;m.transition=b("transition"),m.transitionDelay=b("transitionDelay"),m.transform=b("transform"),m.transformOrigin=b("transformOrigin"),m.filter=b("Filter"),m.transform3d=c();var o={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"},p=m.transitionEnd=o[m.transition]||null;for(var q in m)m.hasOwnProperty(q)&&"undefined"==typeof a.support[q]&&(a.support[q]=m[q]);return l=null,a.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"},a.cssHooks["transit:transform"]={get:function(b){return a(b).data("transform")||new d},set:function(b,c){var e=c;e instanceof d||(e=new d(e)),b.style[m.transform]="WebkitTransform"!==m.transform||n?e.toString():e.toString(!0),a(b).data("transform",e)}},a.cssHooks.transform={set:a.cssHooks["transit:transform"].set},a.cssHooks.filter={get:function(a){return a.style[m.filter]},set:function(a,b){a.style[m.filter]=b}},a.fn.jquery<"1.8"&&(a.cssHooks.transformOrigin={get:function(a){return a.style[m.transformOrigin]},set:function(a,b){a.style[m.transformOrigin]=b}},a.cssHooks.transition={get:function(a){return a.style[m.transition]},set:function(a,b){a.style[m.transition]=b}}),h("scale"),h("scaleX"),h("scaleY"),h("translate"),h("rotate"),h("rotateX"),h("rotateY"),h("rotate3d"),h("perspective"),h("skewX"),h("skewY"),h("x",!0),h("y",!0),d.prototype={setFromString:function(a,b){var c="string"==typeof b?b.split(","):b.constructor===Array?b:[b];c.unshift(a),d.prototype.set.apply(this,c)},set:function(a){var b=Array.prototype.slice.apply(arguments,[1]);this.setter[a]?this.setter[a].apply(this,b):this[a]=b.join(",")},get:function(a){return this.getter[a]?this.getter[a].apply(this):this[a]||0},setter:{rotate:function(a){this.rotate=j(a,"deg")},rotateX:function(a){this.rotateX=j(a,"deg")},rotateY:function(a){this.rotateY=j(a,"deg")},scale:function(a,b){void 0===b&&(b=a),this.scale=a+","+b},skewX:function(a){this.skewX=j(a,"deg")},skewY:function(a){this.skewY=j(a,"deg")},perspective:function(a){this.perspective=j(a,"px")},x:function(a){this.set("translate",a,null)},y:function(a){this.set("translate",null,a)},translate:function(a,b){void 0===this._translateX&&(this._translateX=0),void 0===this._translateY&&(this._translateY=0),null!==a&&void 0!==a&&(this._translateX=j(a,"px")),null!==b&&void 0!==b&&(this._translateY=j(b,"px")),this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var a=(this.scale||"1,1").split(",");return a[0]&&(a[0]=parseFloat(a[0])),a[1]&&(a[1]=parseFloat(a[1])),a[0]===a[1]?a[0]:a},rotate3d:function(){for(var a=(this.rotate3d||"0,0,0,0deg").split(","),b=0;3>=b;++b)a[b]&&(a[b]=parseFloat(a[b]));return a[3]&&(a[3]=j(a[3],"deg")),a}},parse:function(a){var b=this;a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(a,c,d){b.setFromString(c,d)})},toString:function(a){var b=[];for(var c in this)if(this.hasOwnProperty(c)){if(!m.transform3d&&("rotateX"===c||"rotateY"===c||"perspective"===c||"transformOrigin"===c))continue;"_"!==c[0]&&b.push(a&&"scale"===c?c+"3d("+this[c]+",1)":a&&"translate"===c?c+"3d("+this[c]+",0)":c+"("+this[c]+")")}return b.join(" ")}},a.fn.transition=a.fn.transit=function(b,c,d,f){var h=this,i=0,j=!0,l=a.extend(!0,{},b);"function"==typeof c&&(f=c,c=void 0),"object"==typeof c&&(d=c.easing,i=c.delay||0,j="undefined"==typeof c.queue?!0:c.queue,f=c.complete,c=c.duration),"function"==typeof d&&(f=d,d=void 0),"undefined"!=typeof l.easing&&(d=l.easing,delete l.easing),"undefined"!=typeof l.duration&&(c=l.duration,delete l.duration),"undefined"!=typeof l.complete&&(f=l.complete,delete l.complete),"undefined"!=typeof l.queue&&(j=l.queue,delete l.queue),"undefined"!=typeof l.delay&&(i=l.delay,delete l.delay),"undefined"==typeof c&&(c=a.fx.speeds._default),"undefined"==typeof d&&(d=a.cssEase._default),c=k(c);var n=g(l,c,d,i),o=a.transit.enabled&&m.transition,q=o?parseInt(c,10)+parseInt(i,10):0;if(0===q){var r=function(a){h.css(l),f&&f.apply(h),a&&a()};return e(h,j,r),h}var s={},t=function(b){var c=!1,d=function(){c&&h.unbind(p,d),q>0&&h.each(function(){this.style[m.transition]=s[this]||null}),"function"==typeof f&&f.apply(h),"function"==typeof b&&b()};q>0&&p&&a.transit.useTransitionEnd?(c=!0,h.bind(p,d)):window.setTimeout(d,q),h.each(function(){q>0&&(this.style[m.transition]=n),a(this).css(l)})},u=function(a){this.offsetWidth,t(a)};return e(h,j,u),this},a.transit.getTransitionValue=g,a}),/**
 * Copyright 2013 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.4.6
 * @url craig.is/killing/mice
 */
function(a,b){function c(a,b,c){return a.addEventListener?void a.addEventListener(b,c,!1):void a.attachEvent("on"+b,c)}function d(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);return a.shiftKey||(b=b.toLowerCase()),b}return y[a.which]?y[a.which]:z[a.which]?z[a.which]:String.fromCharCode(a.which).toLowerCase()}function e(a,b){return a.sort().join(",")===b.sort().join(",")}function f(a){a=a||{};var b,c=!1;for(b in E)a[b]?c=!0:E[b]=0;c||(H=!1)}function g(a,b,c,d,f,g){var h,i,j=[],k=c.type;if(!C[a])return[];for("keyup"==k&&n(a)&&(b=[a]),h=0;h<C[a].length;++h)if(i=C[a][h],(d||!i.seq||E[i.seq]==i.level)&&k==i.action&&("keypress"==k&&!c.metaKey&&!c.ctrlKey||e(b,i.modifiers))){var l=!d&&i.combo==f,m=d&&i.seq==d&&i.level==g;(l||m)&&C[a].splice(h,1),j.push(i)}return j}function h(a){var b=[];return a.shiftKey&&b.push("shift"),a.altKey&&b.push("alt"),a.ctrlKey&&b.push("ctrl"),a.metaKey&&b.push("meta"),b}function i(a){return a.preventDefault?void a.preventDefault():void(a.returnValue=!1)}function j(a){return a.stopPropagation?void a.stopPropagation():void(a.cancelBubble=!0)}function k(a,b,c,d){J.stopCallback(b,b.target||b.srcElement,c,d)||a(b,c)===!1&&(i(b),j(b))}function l(a,b,c){var d,e=g(a,b,c),h={},i=0,j=!1;for(d=0;d<e.length;++d)e[d].seq&&(i=Math.max(i,e[d].level));for(d=0;d<e.length;++d)if(e[d].seq){if(e[d].level!=i)continue;j=!0,h[e[d].seq]=1,k(e[d].callback,c,e[d].combo,e[d].seq)}else j||k(e[d].callback,c,e[d].combo);var l="keypress"==c.type&&G;c.type!=H||n(a)||l||f(h),G=j&&"keydown"==c.type}function m(a){"number"!=typeof a.which&&(a.which=a.keyCode);var b=d(a);if(b)return"keyup"==a.type&&F===b?void(F=!1):void J.handleKey(b,h(a),a)}function n(a){return"shift"==a||"ctrl"==a||"alt"==a||"meta"==a}function o(){clearTimeout(x),x=setTimeout(f,1e3)}function p(){if(!w){w={};for(var a in y)a>95&&112>a||y.hasOwnProperty(a)&&(w[y[a]]=a)}return w}function q(a,b,c){return c||(c=p()[a]?"keydown":"keypress"),"keypress"==c&&b.length&&(c="keydown"),c}function r(a,b,c,e){function g(b){return function(){H=b,++E[a],o()}}function h(b){k(c,b,a),"keyup"!==e&&(F=d(b)),setTimeout(f,10)}E[a]=0;for(var i=0;i<b.length;++i){var j=i+1===b.length,l=j?h:g(e||t(b[i+1]).action);u(b[i],l,e,a,i)}}function s(a){return"+"===a?["+"]:a.split("+")}function t(a,b){var c,d,e,f=[];for(c=s(a),e=0;e<c.length;++e)d=c[e],B[d]&&(d=B[d]),b&&"keypress"!=b&&A[d]&&(d=A[d],f.push("shift")),n(d)&&f.push(d);return b=q(d,f,b),{key:d,modifiers:f,action:b}}function u(a,b,c,d,e){D[a+":"+c]=b,a=a.replace(/\s+/g," ");var f,h=a.split(" ");return h.length>1?void r(a,h,b,c):(f=t(a,c),C[f.key]=C[f.key]||[],g(f.key,f.modifiers,{type:f.action},d,a,e),void C[f.key][d?"unshift":"push"]({callback:b,modifiers:f.modifiers,action:f.action,seq:d,level:e,combo:a}))}function v(a,b,c){for(var d=0;d<a.length;++d)u(a[d],b,c)}for(var w,x,y={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},z={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},A={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},B={option:"alt",command:"meta","return":"enter",escape:"esc",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},C={},D={},E={},F=!1,G=!1,H=!1,I=1;20>I;++I)y[111+I]="f"+I;for(I=0;9>=I;++I)y[I+96]=I;c(b,"keypress",m),c(b,"keydown",m),c(b,"keyup",m);var J={bind:function(a,b,c){return a=a instanceof Array?a:[a],v(a,b,c),this},unbind:function(a,b){return J.bind(a,function(){},b)},trigger:function(a,b){return D[a+":"+b]&&D[a+":"+b]({},a),this},reset:function(){return C={},D={},this},stopCallback:function(a,b){return(" "+b.className+" ").indexOf(" mousetrap ")>-1?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable},handleKey:l};a.Mousetrap=J,"function"==typeof define&&define.amd&&define(J)}(window,document),/*
Copyright (c) 2011 Sean Cusack

MIT-LICENSE:

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function(a){function b(a,b){if(a)if("offset"in a){var c=a.data("jquery-collision-coordinates");if(c)this.x1=c.x1,this.y1=c.y1,this.x2=c.x2,this.y2=c.y2;else if(b&&b.length&&b.length>=4)this.x1=b[0],this.y1=b[1],this.x2=b[2]+a.outerWidth(!0),this.y2=b[3]+a.outerHeight(!0);else if(a.parent().length<=0)this.x1=parseInt(a.css("left"))||0,this.y1=parseInt(a.css("top"))||0,this.x2=parseInt(a.css("width"))||0,this.y2=parseInt(a.css("height"))||0,this.x2+=this.x1,this.x2+=(parseInt(a.css("margin-left"))||0)+(parseInt(a.css("border-left"))||0)+(parseInt(a.css("padding-left"))||0)+(parseInt(a.css("padding-right"))||0)+(parseInt(a.css("border-right"))||0)+(parseInt(a.css("margin-right"))||0),this.y2+=this.y1,this.y2+=(parseInt(a.css("margin-top"))||0)+(parseInt(a.css("border-top"))||0)+(parseInt(a.css("padding-top"))||0)+(parseInt(a.css("padding-bottom"))||0)+(parseInt(a.css("border-bottom"))||0)+(parseInt(a.css("margin-bottom"))||0);else{var d=a.offset();this.x1=d.left-(parseInt(a.css("margin-left"))||0),this.y1=d.top-(parseInt(a.css("margin-top"))||0),this.x2=this.x1+a.outerWidth(!0),this.y2=this.y1+a.outerHeight(!0)}this.proto=a}else"x1"in a&&(this.x1=a.x1,this.y1=a.y1,this.x2=a.x2,this.y2=a.y2,this.proto=a);else this.x1=this.y1=this.x2=this.y2=0,this.proto=null;"dir"in a&&(this.dir=a.dir)}function d(a,b,c,d){this.target=a,this.obstacle=b,this.overlap=c,this.overlapType=d}function e(a,b,c){this.targets=a,this.obstacles=b,this.collisions=null,this.cache=null,this.containment=c?c:null}function f(c){return a(c).get().map(function(c){return new b(a(c))})}function g(b){for(var c=a(),d=0;d<b.length;d++)c=c.add(b[d]);return c}b.prototype.innerContainer=function(){var a=new b(this);return this.proto.css&&(a.x1+=parseInt(this.proto.css("margin-left"))||0,a.x1+=parseInt(this.proto.css("border-left"))||0,a.x1+=parseInt(this.proto.css("padding-left"))||0,a.x2-=parseInt(this.proto.css("padding-right"))||0,a.x2-=parseInt(this.proto.css("border-right"))||0,a.x2-=parseInt(this.proto.css("margin-right"))||0,a.y1+=parseInt(this.proto.css("margin-top"))||0,a.y1+=parseInt(this.proto.css("border-top"))||0,a.y1+=parseInt(this.proto.css("padding-top"))||0,a.y2-=parseInt(this.proto.css("padding-bottom"))||0,a.y2-=parseInt(this.proto.css("border-bottom"))||0,a.y2-=parseInt(this.proto.css("margin-bottom"))||0),a},b.prototype.move=function(a,b){return this.x1+=a,this.x2+=a,this.y1+=b,this.y2+=b,this},b.prototype.update=function(a){if("x1"in a&&(this.x1=a.x1),"x2"in a&&(this.x1=a.x2),"y1"in a&&(this.x1=a.y1),"y2"in a&&(this.x1=a.y2),"left"in a){var b=this.x2-this.x1;this.x1=a.left,this.x2=this.x1+b}if("top"in a){var c=this.y2-this.y1;this.y1=a.top,this.y2=this.y1+c}if("offset"in a){var d=a.offset();this.update(d),this.x2=this.x1+a.width(),this.y2=this.y1+a.height()}return"dir"in a&&(this.x1=a.dir),this},b.prototype.width=function(){return this.x2-this.x1},b.prototype.height=function(){return this.y2-this.y1},b.prototype.centerx=function(){return(this.x1+this.x2)/2},b.prototype.centery=function(){return(this.y1+this.y2)/2},b.prototype.toString=function(){return(this.proto.get?"#"+this.proto.get(0).id:"")+"["+[this.x1,this.y1,this.x2,this.y2].join(",")+"]"},b.EPSILON=.001,b.prototype.containsPoint=function(a,c,d){d||(d=!1);var e=(d?-1:1)*b.EPSILON;return a>this.x1+e&&a<this.x2-e&&c>this.y1+e&&c<this.y2-e?!0:!1},b.prototype.overlaps=function(a,b){var c=this._overlaps(a,b);return c.length>0?c:(c=a._overlaps(this,b),c.length>0&&(c[0].dir="Inside"==c[0].dir?"Outside":"Outside"==c[0].dir?"Inside":"N"==c[0].dir?"S":"S"==c[0].dir?"N":"W"==c[0].dir?"E":"E"==c[0].dir?"W":"NE"==c[0].dir?"SW":"SW"==c[0].dir?"NE":"SE"==c[0].dir?"NW":"NW"==c[0].dir?"SE":void 0),c||[])},b.prototype._overlaps=function(a,c){var d=a,e=this;c||(c=!1);for(var f=d.centerx(),g=d.centery(),h=[[d.x1,d.y1,"SE"],[d.x2,d.y1,"SW"],[d.x2,d.y2,"NW"],[d.x1,d.y2,"NE"],[f,d.y1,"S"],[d.x2,g,"W"],[f,d.y2,"N"],[d.x1,g,"E"],[f,g,void 0]],i=null,j={NW:!1,N:!1,NE:!1,E:!1,SE:!1,S:!1,SW:!1,W:!1},k=0;k<h.length;k++)if(this.containsPoint(h[k][0],h[k][1],c)){if(h[k][2]&&(j[h[k][2]]=!0),i)continue;i=[new b({x1:Math.max(d.x1,e.x1),y1:Math.max(d.y1,e.y1),x2:Math.min(d.x2,e.x2),y2:Math.min(d.y2,e.y2),dir:h[k][2]})]}return i&&(j.NW&&j.NE&&(i[0].dir="N"),j.NE&&j.SE&&(i[0].dir="E"),j.SE&&j.SW&&(i[0].dir="S"),j.SW&&j.NW&&(i[0].dir="W"),j.NW&&j.NE&&j.SE&&j.SW&&(i[0].dir="Outside"),j.NW||j.NE||j.SE||j.SW||j.N||j.E||j.S||j.W||(i[0].dir="Inside")),i||[]},b.prototype._protrusion=function(a,c,d){var e=this.overlaps(new b(a),!1);return e.length<=0?d:(e[0].dir=c,d.push(e[0]),d)},b.prototype.protrusions=function(a){var b=[],c=Number.NEGATIVE_INFINITY,d=Number.POSITIVE_INFINITY,e=a.x1,f=a.x2,g=a.y1,h=a.y2;return b=this._protrusion({x1:e,y1:c,x2:f,y2:g},"N",b),b=this._protrusion({x1:f,y1:c,x2:d,y2:g},"NE",b),b=this._protrusion({x1:f,y1:g,x2:d,y2:h},"E",b),b=this._protrusion({x1:f,y1:h,x2:d,y2:d},"SE",b),b=this._protrusion({x1:e,y1:h,x2:f,y2:d},"S",b),b=this._protrusion({x1:c,y1:h,x2:e,y2:d},"SW",b),b=this._protrusion({x1:c,y1:g,x2:e,y2:h},"W",b),b=this._protrusion({x1:c,y1:c,x2:e,y2:g},"NW",b)},d.prototype.distance=function(){var a=c.target,b=c.overlap;return Math.sqrt((a.centerx()-b.centerx())*(a.centerx()-b.centerx())+(a.centery()-b.centery())*(a.centery()-b.centery()))},e.prototype.getCollisions=function(a){if(null!==this.collisions)return this.collisions;if(this.cache={},this.collisions=[],a||(a="collision"),"collision"!=a&&"protrusion"!=a)return[];for(var b=[],c=this.targets,e=this.obstacles,f=0;f<c.length;f++)for(var g=c[f],h=0;h<e.length;h++)for(var i=e[h],j="collision"==a?g.overlaps(i):g.protrusions(i.innerContainer()),k=0;k<j.length;k++)b.push(new d(c[f],e[h],j[k],a));return this.collisions=b,b},a.fn.collision=function(b,c){c||(c={});var d="collision",h=null,i=null,j=null,k=null,l="body";"protrusion"==c.mode&&(d=c.mode),c.as&&(h=c.as),c.colliderData&&(i=c.colliderData),c.obstacleData&&(j=c.obstacleData),c.directionData&&(k=c.directionData),c.relative&&(l=c.relative);var m,n=new e(f(this),f(b)),o=n.getCollisions(d);return m=h?a.map(o,function(b){var c=b.overlap.x1,d=b.overlap.y1;if(l&&"body"!=l){var e=a("collider"==l?b.target.proto:"obstacle"==l?b.obstacle.proto:l);if(e.length>0){var f=e.offset();c-=f.left,d-=f.top}}var g=a(h).offset({left:c,top:d}).width(b.overlap.width()).height(b.overlap.height());return i&&g.data(i,a(b.target.proto)),j&&g.data(j,a(b.obstacle.proto)),k&&b.overlap.dir&&g.data(k,b.overlap.dir),g}):a.map(o,function(a){return a.obstacle.proto}),g(m)}}(jQuery),/*!
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
function(a){function b(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var c,d=a.ui.mouse.prototype,e=d._mouseInit;d._touchStart=function(a){var d=this;!c&&d._mouseCapture(a.originalEvent.changedTouches[0])&&(c=!0,d._touchMoved=!1,b(a,"mouseover"),b(a,"mousemove"),b(a,"mousedown"))},d._touchMove=function(a){c&&(this._touchMoved=!0,b(a,"mousemove"))},d._touchEnd=function(a){c&&(b(a,"mouseup"),b(a,"mouseout"),this._touchMoved||b(a,"click"),c=!1)},d._mouseInit=function(){var b=this;b.element.bind("touchstart",a.proxy(b,"_touchStart")).bind("touchmove",a.proxy(b,"_touchMove")).bind("touchend",a.proxy(b,"_touchEnd")),e.call(b)}}}(jQuery),/*!
* screenfull
* v1.2.0 - 2014-04-29
* (c) Sindre Sorhus; MIT License
*/
function(){"use strict";var a="undefined"!=typeof module&&module.exports,b="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,c=function(){for(var a,b,c=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],d=0,e=c.length,f={};e>d;d++)if(a=c[d],a&&a[1]in document){for(d=0,b=a.length;b>d;d++)f[c[0][d]]=a[d];return f}return!1}(),d={request:function(a){var d=c.requestFullscreen;a=a||document.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?a[d]():a[d](b&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[c.exitFullscreen]()},toggle:function(a){this.isFullscreen?this.exit():this.request(a)},onchange:function(){},onerror:function(){},raw:c};return c?(Object.defineProperties(d,{isFullscreen:{get:function(){return!!document[c.fullscreenElement]}},element:{enumerable:!0,get:function(){return document[c.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!document[c.fullscreenEnabled]}}}),document.addEventListener(c.fullscreenchange,function(a){d.onchange.call(d,a)}),document.addEventListener(c.fullscreenerror,function(a){d.onerror.call(d,a)}),void(a?module.exports=d:window.screenfull=d)):void(a?module.exports=!1:window.screenfull=!1)}(),function(a,b){"use strict";a.AudioContext=a.AudioContext||a.webkitAudioContext,a.OfflineAudioContext=a.OfflineAudioContext||a.webkitOfflineAudioContext;var c=AudioContext.prototype,d=new AudioContext,e=function(a,b){return void 0===a&&void 0!==b},f=d.createBufferSource().constructor.prototype;if(e(f.start,f.noteOn)||e(f.stop,f.noteOff)){var g=c.createBufferSource;c.createBufferSource=function(){var a=g.call(this);return a.start=a.start||a.noteOn,a.stop=a.stop||a.noteOff,a}}if("function"==typeof d.createOscillator){var h=d.createOscillator().constructor.prototype;if(e(h.start,h.noteOn)||e(h.stop,h.noteOff)){var i=c.createOscillator;c.createOscillator=function(){var a=i.call(this);return a.start=a.start||a.noteOn,a.stop=a.stop||a.noteOff,a}}}void 0===c.createGain&&void 0!==c.createGainNode&&(c.createGain=c.createGainNode),void 0===c.createDelay&&void 0!==c.createDelayNode&&(c.createDelay=c.createGainNode),void 0===c.createScriptProcessor&&void 0!==c.createJavaScriptNode&&(c.createScriptProcessor=c.createJavaScriptNode);var j=-1!==navigator.userAgent.indexOf("like Mac OS X");if(j){var k=AudioContext;a.AudioContext=function(){function a(){e.start(0),e.connect(f),f.connect(c.destination)}var c=new k,d=b.body,e=c.createBufferSource(),f=c.createScriptProcessor(256,1,1);return d.addEventListener("touchstart",a,!1),f.onaudioprocess=function(){e.disconnect(),f.disconnect(),d.removeEventListener("touchstart",a,!1),f.onaudioprocess=null},c}}}(window,document),/**
 * isMobile.js v0.3.2
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/IEMobile/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,i=/BlackBerry/i,j=/Opera Mini/i,k=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,l=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),m=function(a,b){return a.test(b)},n=function(a){var n=a||navigator.userAgent;this.apple={phone:m(b,n),ipod:m(c,n),tablet:m(d,n),device:m(b,n)||m(c,n)||m(d,n)},this.android={phone:m(e,n),tablet:!m(e,n)&&m(f,n),device:m(e,n)||m(f,n)},this.windows={phone:m(g,n),tablet:m(h,n),device:m(g,n)||m(h,n)},this.other={blackberry:m(i,n),opera:m(j,n),firefox:m(k,n),device:m(i,n)||m(j,n)||m(k,n)},this.seven_inch=m(l,n),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet},o=new n;o.Class=n,"undefined"!=typeof module&&module.exports?module.exports=o:"function"==typeof define&&define.amd&&define(o),a.isMobile=o}(this),/*!
 * can-play-type-to-number.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/can-play-type-to-number
*/
!function(a){"use strict";function b(a){if("probably"===a)return 2;if("maybe"===a)return 1;if(""===a)return 0;if("string"==typeof a)throw new Error('The string should be "probably", "maybe" or "".');throw new TypeError(a+" is not a string.")}a.canPlayTypeToNumber=b}(this),/*!
 * audio-support-level.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/audio-support-level.js
*/
!function(a){"use strict";function b(a,b){var d;if("object"==typeof a){if(d=a,void 0===d.subtype)throw new TypeError("subtype property is required.");if("string"!=typeof d.subtype)throw new TypeError("subtype should be a string.")}else{if("string"!=typeof a)throw new TypeError("The first argument should be a string or object.");d={subtype:a,codecs:b}}if(d.codecs&&"string"!=typeof d.codecs)throw new TypeError("codecs should be a string.");var e="audio/"+d.subtype;return d.codecs&&(e+='; codecs="'+d.codecs+'"'),canPlayTypeToNumber(c.canPlayType(e))}var c=new Audio;a.audioSupportLevel=b}(this),/*! (c) 2013 - 2014 Shinnosuke Watanabe | MIT License */
function(a){"use strict";var b,c;a.BufferLoader=function(a,d,e,f,g){this.context=a,this.fileList=e,this.onload=g,this.bufferList=[],this.loadCount=0,this.getBufferFromName=function(a){var b=this.fileList.indexOf(a);return this.bufferList[b]},b=d,c=f};var d=-1!==navigator.userAgent.indexOf("like Mac OS X");BufferLoader.prototype.loadBuffer=function(a,b){var c=new XMLHttpRequest;c.open("GET",a,!0),c.responseType="arraybuffer";var d=this;c.onload=function(){d.context.decodeAudioData(e(c.response),function(c){return c?(d.bufferList[b]=c,void(++d.loadCount===d.fileList.length&&d.onload(d.bufferList))):void alert("error decoding file data: "+a)},function(a){console.error("decodeAudioData error",a)})},c.onerror=function(){alert("BufferLoader: XHR error")},c.send()};var e;if(d){var f=function(a){for(var b=new Uint8Array(a),c="",d=0,e=b.length;e>d;d++)c+=String.fromCharCode(b[d]);return c},g=function(a){for(var b=new ArrayBuffer(a.length*Uint8Array.BYTES_PER_ELEMENT),c=new Uint8Array(b),d=0,e=a.length;e>d;d++)c[d]=a.charCodeAt(d);return b};e=function(a){return g(f(a))}}else e=function(a){return a};BufferLoader.prototype.load=function(){for(var a=0;a<this.fileList.length;++a)this.loadBuffer(b+this.fileList[a]+"."+c,a)}}(window);var ctx=new AudioContext,panner,bufferLoader,analyzer,processor,timeoutId=!1,noteTime=0,startTime=0,createStart=!1,bgloop=new Audio,playlist=[bgloop],animaX=0,animaY=0,seVolume=1,parentElm,maxLevel=10,colorOfLevel=["#000AEB","#5F00EB","#8900EB","#C500EB","#EB00CC","#EB006B","#EB0038","#EB4F00","#EBA300","#EBD300","#FFFFFF"],src;$.ajax({url:"audio/data-json/src.json",dataType:"json",async:!1,success:function(a){src=a}}),$(function(){function a(){function a(a){a&&a.preventDefault&&a.preventDefault(),timeoutId===!1?(bgloop.play(),startTime=ctx.currentTime-noteTime,schedule()):(bgloop.pause(),clearTimeout(timeoutId),timeoutId=!1)}function b(){document.webkitHidden?(bgloop.pause(),clearTimeout(timeoutId),timeoutId=!1):(bgloop.play(),startTime=ctx.currentTime-noteTime,schedule())}console.log("finish load."),$(parentElm).on(g,null,function(a){(void 0===a.button||0===a.button)&&(timeoutId===!1&&(bgloop.play(),startTime=ctx.currentTime-noteTime,schedule()),createStart=!0,animaX=a.pageX||a.originalEvent.pageX,animaY=a.pageY||a.originalEvent.pageY)}),Mousetrap.bind("space",a),document.addEventListener("webkitvisibilitychange",b,!1)}function b(){var a=document.getElementsByTagName("head")[0],b=a.getElementsByTagName("link");b[b.length-1]===h?a.removeChild(h):a.insertBefore(h,a.getElementsByTagName("script")[0])}Mousetrap.bind(["f","F"],screenfull.request),analyzer=ctx.createAnalyser(),analyzer.smoothingTimeConstant=.85,analyzer.connect(ctx.destination),panner=ctx.createPanner(),panner.refDistance=.1,panner.rolloffFactor=.05,panner.connect(analyzer),panner.panningModel=0,panner.distanceModel=0,parentElm=document.getElementById("container");var c;isMobile.any?audioSupportLevel("mp4","mp4a.40.5")>0&&(c="m4a"):c="localhost"===location.hostname?"wav":audioSupportLevel("mp4","mp4a.40.5")>=audioSupportLevel("webm","vorbis")?"m4a":audioSupportLevel("webm","vorbis")>=audioSupportLevel("ogg","vorbis")?"webm":"ogg",console.log(c+" mode");var d,e=["beat","piano","piano2","pad","beat0","beat1","beat2","beat3","beat4","beat5","beat6","beat7","beat8","beat9","beat10"],f=src.cwd+src.format[c];$.getJSON("audio/data-json/playlist.json",function(a){var b=src.cwd+src.tracks.replace("{format}",src.format[c])+a.tracks[0].fileName+"."+c;bgloop.src=b}),bgloop.src=d,bgloop.autoplay=!1,bgloop.loop=!1;var g;g=void 0!==parentElm.ontouchstart?"touchstart":void 0!==parentElm.onmousedown?"mousedown":"click",bufferLoader=new BufferLoader(ctx,f+"effects/",e,c,a),bufferLoader.load();var h=document.createElement("link");h.href="debug/css/rect.css",h.rel="stylesheet",h.media="screen",Mousetrap.bind(["m","M"],b),Mousetrap.trigger("M")});var time=0,beatMap;$.getJSON("audio/data-json/_analysis.json",function(a){var b=a.tracks["main/background"];beatMap=b.beat_times,interval=1e3*(beatMap[1]-beatMap[0])});var movementRange=500,frog,released,varXY,hit,hitObj,restartAnimation=function(){var a="animation";_st=document.createElement("div").style,void 0!==_st.webkitAnimation?a="webkitAnimation":void 0!==_st.mozAnimation&&(a="webkitAnimation");var b=function(b){b.style[a]="";var c=document.createElement("div"),d=c.style;c.className="ripple",d.width=varXY+"px",d.height=varXY+"px",d.borderRadius=varXY+"px",d.left=parseFloat(b.style.left)+.5*(b.offsetWidth-varXY)+"px",d.top=parseFloat(b.style.top)+.5*(b.offsetHeight-varXY)+"px",d[a+"Duration"]=hit*hitInterval+"s",d.borderColor=colorOfLevel[b.dataset.level],parentElm.insertBefore(c,parentElm.childNodes[0])};return function(){arguments[0].style[a]="none",setTimeout(b,4,arguments[0])}}();$.fn.animaMove=function(a,b){var c=$(this);c.animate({left:a,top:b,opacity:"1"},interval,function(){c.transition({left:"-=100",top:"+=100"},interval,function(){c.transition({left:"+=100",top:"+=100"},interval),c.addClass("released")})})};var canvas,canvasCtx,canvasWidth,canvasHeight,bar_width;$(function(){canvas=document.getElementById("waveform"),canvasCtx=canvas.getContext("2d"),canvasWidth=canvas.width,canvasHeight=canvas.height,bar_width=10}),$(function(){function a(a,b){var c=g.classList;c.remove(a),c.add(b)}function b(a){bgloop.restart="boolean"==typeof a?a:!bgloop.restart,bgloop.restart?h.classList.remove("disabled"):h.classList.add("disabled")}function c(){null!==n&&clearTimeout(n),n=setTimeout(function(){d()},40)}function d(){bgloop.currentTime=l.slider("value")/m*bgloop.duration}function e(){l.slider("value",bgloop.currentTime/bgloop.duration*m);var a=f(Math.floor(bgloop.currentTime),1);if(o[0].innerText!==a&&(o[0].innerText=a,"number"==typeof bgloop.duration)){var b=f(Math.floor(bgloop.duration-bgloop.currentTime),1);o[1].innerText="- "+b}}function f(a,b){var c=parseInt(a,10),d=Math.floor(c/3600),e=Math.floor((c-3600*d)/60),f=c-3600*d-60*e;10>d&&(d="0"+d),10>e&&(e="0"+e),10>f&&(f="0"+f);var g="";return g=2===b?d+":"+e+":"+f:1===b?e+":"+f:f}var g=document.getElementById("track-control-pause");bgloop.addEventListener("pause",function(){a("icon-pause","icon-play")},!1),bgloop.addEventListener("play",function(){a("icon-play","icon-pause")},!1),bgloop.addEventListener("loadeddata",function(){a("icon-pause","icon-play");var b=document.getElementsByTagName("footer")[0];$(b).animate({bottom:0},500),parentElm.style.cursor="url(img/cursor.png), crosshair"},!1),g.addEventListener("click",function(){Mousetrap.trigger("space")},!1),playlist.length<=1&&($("#track-control-back, #track-control-next").css("display","none"),$("#track-control")[0].style.width="120px");var h=document.getElementById("track-control-repeat");h.addEventListener("click",b,!1),b(!0);var i=$("#volume .slider"),j=[0,0],k=$(document.getElementsByClassName("tooltip"));k.hide(),i[0].volumeChange=function(a){bgloop.volume=.01*a},i[1].volumeChange=function(a){seVolume=.01*a},i.each(function(a){var b=100;$(this).slider({range:"min",min:0,max:100,value:b,start:function(){},slide:function(c,d){j[a]=d.value,this.volumeChange(j[a]);var e=document.getElementsByClassName("icon_volume")[a].style;e.backgroundPositionY=j[a]<=.05*b?"0":j[a]<=.25*b?"-25px":j[a]<=.75*b?"-50px":"-75px"},stop:function(){this.volumeChange($(this).slider("value"))}})});var l=$("#time-control .slider"),m=500,n=null;l.slider({range:"min",min:0,max:m,value:0,start:function(){},slide:function(){bgloop.removeEventListener("timeupdate",e,!1),c()},stop:function(){bgloop.addEventListener("timeupdate",e,!1)}});var o=document.getElementById("time-counter").children;bgloop.addEventListener("loadeddata",function(){var a=f(Math.floor(bgloop.duration-bgloop.currentTime),1);o[1].innerText=a},!1),bgloop.addEventListener("timeupdate",e,!1)});