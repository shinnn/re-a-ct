// Monkey patch jQuery 1.3.1+ css() method to support CSS 'transform'
// property uniformly across Safari/Chrome/Webkit, Firefox 3.5+, IE 9+, and Opera 11+.
// 2009-2011 Zachary Johnson www.zachstronaut.com
// Updated 2011.05.04 (May the fourth be with you!)
(function(c){var b=null,f=c.fn.css;c.fn.css=function(a,g){if(b===null)b=typeof c.cssProps!="undefined"?c.cssProps:typeof c.props!="undefined"?c.props:{};if(typeof b.transform=="undefined"&&(a=="transform"||typeof a=="object"&&typeof a.transform!="undefined")){var h=b,d;a:{d=this.get(0);for(var i=["transform","WebkitTransform","msTransform","MozTransform","OTransform"],e;e=i.shift();)if(typeof d.style[e]!="undefined"){d=e;break a}d="transform"}h.transform=d}if(b.transform!="transform")if(a=="transform"){a=
b.transform;if(typeof g=="undefined"&&jQuery.style)return jQuery.style(this.get(0),a)}else if(typeof a=="object"&&typeof a.transform!="undefined"){a[b.transform]=a.transform;delete a.transform}return f.apply(this,arguments)}})(jQuery);
