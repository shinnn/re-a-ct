/*!
/**
 * Monkey patch jQuery 1.3.1+ to add support for setting or animating CSS
 * scale and rotation independently.
 * https://github.com/zachstronaut/jquery-animate-css-rotate-scale
 * Released under dual MIT/GPL license just like jQuery.
 * 2009-2012 Zachary Johnson www.zachstronaut.com
 */
(function(c){function e(a){var b=a.data("_ARS_data");if(!b){b={rotateUnits:"deg",scale:1,rotate:0};a.data("_ARS_data",b)}return b}function f(a,b){a.css("transform","rotate("+b.rotate+b.rotateUnits+") scale("+b.scale+","+b.scale+")")}c.fn.rotate=function(a){var b=c(this),d=e(b);if(typeof a=="undefined")return d.rotate+d.rotateUnits;if(a=a.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/)){if(a[3])d.rotateUnits=a[3];d.rotate=a[1];f(b,d)}return this};c.fn.scale=function(a){var b=c(this),d=e(b);if(typeof a==
"undefined")return d.scale;d.scale=a;f(b,d);return this};var g=c.fx.prototype.cur;c.fx.prototype.cur=function(){if(this.prop=="rotate")return parseFloat(c(this.elem).rotate());else if(this.prop=="scale")return parseFloat(c(this.elem).scale());return g.apply(this,arguments)};c.fx.step.rotate=function(a){var b=e(c(a.elem));c(a.elem).rotate(a.now+b.rotateUnits)};c.fx.step.scale=function(a){c(a.elem).scale(a.now)};var h=c.fn.animate;c.fn.animate=function(a){if(typeof a.rotate!="undefined"){var b,d=a.rotate.toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
if(d&&d[5]){b=c(this);b=e(b);b.rotateUnits=d[5]}a.rotate=d[1]}return h.apply(this,arguments)}})(jQuery);
