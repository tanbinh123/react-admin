(this["webpackJsonpreact-adminv4"]=this["webpackJsonpreact-adminv4"]||[]).push([[19],{224:function(e,t,n){"use strict";n.r(t);n(22);var o=n(26),c=n(5),r=n(20),u=n(0),l=n.n(u),a=function(e){Object(u.useEffect)(e,[])},i=function(e){a((function(){e()}))},f=function(e){var t=Object(u.useRef)(e);t.current=e,a((function(){return function(){return t.current()}}))},s=function(e,t){Object(u.useEffect)((function(){return e&&e(),function(){t&&t()}}),[])};var b=function(){return(b=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var c in t=arguments[n])Object.prototype.hasOwnProperty.call(t,c)&&(e[c]=t[c]);return e}).apply(this,arguments)};Object.create;Object.create;var O=function(e){void 0===e&&(e={});var t=Object(u.useState)(e),n=t[0],o=t[1],c=Object(u.useMemo)((function(){return{set:function(e,t){o((function(n){var o;return b(b({},n),((o={})[e]=t,o))}))},setAll:function(e){o(e)},remove:function(e){o((function(t){var n=t,o=e;n[o];return function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(o=Object.getOwnPropertySymbols(e);c<o.length;c++)t.indexOf(o[c])<0&&Object.prototype.propertyIsEnumerable.call(e,o[c])&&(n[o[c]]=e[o[c]])}return n}(n,["symbol"===typeof o?o:o+""])}))},reset:function(){return o(e)}}}),[o]),r=b({get:Object(u.useCallback)((function(e){return n[e]}),[n])},c);return[n,r]},m=n(19),p=n(82);t.default=Object(m.a)({path:"/react-use",title:"React Use"})((function(e){console.log("react-use"),i((function(){console.log("useMount")})),f((function(){console.log("useUnmount")})),a((function(){return console.log("useEffectOnce mount"),function(){console.log("useEffectOnce unmount")}})),s((function(){console.log("useLifecycles mount")}),(function(){console.log("useLifecycles unmount")}));var t=Object(u.useState)(0),n=Object(r.a)(t,2),b=n[0],m=n[1],v=O({hello:"there"}),j=Object(r.a)(v,2),d=j[0],g=j[1];return l.a.createElement(p.a,null,"hooks page",l.a.createElement("div",null,l.a.createElement("button",{onClick:function(){return g.set(String(Date.now()),(new Date).toJSON())}},"Add"),l.a.createElement("button",{onClick:function(){return g.reset()}},"Reset"),l.a.createElement("button",{onClick:function(){return g.set("hello","123")}},"Set new data"),l.a.createElement("button",{onClick:function(){d.age=23,g.setAll(Object(c.a)({},d))}},"Set new data and clear others"),l.a.createElement("button",{onClick:function(){return g.remove("hello")},disabled:!d.hello},"Remove 'hello'"),l.a.createElement("pre",null,JSON.stringify(d,null,2))),l.a.createElement("div",null,"count: ",b,l.a.createElement(o.default,{onClick:function(){return m(--b)}},"-"),l.a.createElement(o.default,{onClick:function(){return m(++b)}},"+")))}))}}]);
//# sourceMappingURL=19.627e797c.chunk.js.map