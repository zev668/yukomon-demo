(function(){"use strict";function ix(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var vf={exports:{}},ve={};var Gm;function ax(){if(Gm)return ve;Gm=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),y=Symbol.for("react.view_transition"),x=Symbol.iterator;function E(I){return I===null||typeof I!="object"?null:(I=x&&I[x]||I["@@iterator"],typeof I=="function"?I:null)}var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,S={};function L(I,lt,$){this.props=I,this.context=lt,this.refs=S,this.updater=$||A}L.prototype.isReactComponent={},L.prototype.setState=function(I,lt){if(typeof I!="object"&&typeof I!="function"&&I!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,I,lt,"setState")},L.prototype.forceUpdate=function(I){this.updater.enqueueForceUpdate(this,I,"forceUpdate")};function N(){}N.prototype=L.prototype;function w(I,lt,$){this.props=I,this.context=lt,this.refs=S,this.updater=$||A}var G=w.prototype=new N;G.constructor=w,M(G,L.prototype),G.isPureReactComponent=!0;var B=Array.isArray;function P(){}var V={H:null,A:null,T:null,S:null},D=Object.prototype.hasOwnProperty;function C(I,lt,$){var rt=$.ref;return{$$typeof:s,type:I,key:lt,ref:rt!==void 0?rt:null,props:$}}function H(I,lt){return C(I.type,lt,I.props)}function st(I){return typeof I=="object"&&I!==null&&I.$$typeof===s}function ft(I){var lt={"=":"=0",":":"=2"};return"$"+I.replace(/[=:]/g,function($){return lt[$]})}var q=/\/+/g;function Q(I,lt){return typeof I=="object"&&I!==null&&I.key!=null?ft(""+I.key):lt.toString(36)}function F(I){switch(I.status){case"fulfilled":return I.value;case"rejected":throw I.reason;default:switch(typeof I.status=="string"?I.then(P,P):(I.status="pending",I.then(function(lt){I.status==="pending"&&(I.status="fulfilled",I.value=lt)},function(lt){I.status==="pending"&&(I.status="rejected",I.reason=lt)})),I.status){case"fulfilled":return I.value;case"rejected":throw I.reason}}throw I}function nt(I,lt,$,rt,Rt){var Dt=typeof I;(Dt==="undefined"||Dt==="boolean")&&(I=null);var Ct=!1;if(I===null)Ct=!0;else switch(Dt){case"bigint":case"string":case"number":Ct=!0;break;case"object":switch(I.$$typeof){case s:case e:Ct=!0;break;case v:return Ct=I._init,nt(Ct(I._payload),lt,$,rt,Rt)}}if(Ct)return Rt=Rt(I),Ct=rt===""?"."+Q(I,0):rt,B(Rt)?($="",Ct!=null&&($=Ct.replace(q,"$&/")+"/"),nt(Rt,lt,$,"",function(z){return z})):Rt!=null&&(st(Rt)&&(Rt=H(Rt,$+(Rt.key==null||I&&I.key===Rt.key?"":(""+Rt.key).replace(q,"$&/")+"/")+Ct)),lt.push(Rt)),1;Ct=0;var Ut=rt===""?".":rt+":";if(B(I))for(var Ht=0;Ht<I.length;Ht++)rt=I[Ht],Dt=Ut+Q(rt,Ht),Ct+=nt(rt,lt,$,Dt,Rt);else if(Ht=E(I),typeof Ht=="function")for(I=Ht.call(I),Ht=0;!(rt=I.next()).done;)rt=rt.value,Dt=Ut+Q(rt,Ht++),Ct+=nt(rt,lt,$,Dt,Rt);else if(Dt==="object"){if(typeof I.then=="function")return nt(F(I),lt,$,rt,Rt);throw lt=String(I),Error("Objects are not valid as a React child (found: "+(lt==="[object Object]"?"object with keys {"+Object.keys(I).join(", ")+"}":lt)+"). If you meant to render a collection of children, use an array instead.")}return Ct}function Z(I,lt,$){if(I==null)return I;var rt=[],Rt=0;return nt(I,rt,"","",function(Dt){return lt.call($,Dt,Rt++)}),rt}function xt(I){if(I._status===-1){var lt=I._result,$=lt();$.then(function(rt){(I._status===0||I._status===-1)&&(I._status=1,I._result=rt,$.status===void 0&&($.status="fulfilled",$.value=rt))},function(rt){(I._status===0||I._status===-1)&&(I._status=2,I._result=rt,$.status===void 0&&($.status="rejected",$.reason=rt))}),I._status===-1&&(I._status=0,I._result=$)}if(I._status===1)return I._result.default;throw I._result}var vt=typeof reportError=="function"?reportError:function(I){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var lt=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof I=="object"&&I!==null&&typeof I.message=="string"?String(I.message):String(I),error:I});if(!window.dispatchEvent(lt))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",I);return}console.error(I)};function Nt(I){var lt=V.T,$={};$.types=lt!==null?lt.types:null,V.T=$;try{var rt=I(),Rt=V.S;Rt!==null&&Rt($,rt),typeof rt=="object"&&rt!==null&&typeof rt.then=="function"&&rt.then(P,vt)}catch(Dt){vt(Dt)}finally{lt!==null&&$.types!==null&&(lt.types=$.types),V.T=lt}}function Qt(I){var lt=V.T;if(lt!==null){var $=lt.types;$===null?lt.types=[I]:$.indexOf(I)===-1&&$.push(I)}else Nt(Qt.bind(null,I))}var ae={map:Z,forEach:function(I,lt,$){Z(I,function(){lt.apply(this,arguments)},$)},count:function(I){var lt=0;return Z(I,function(){lt++}),lt},toArray:function(I){return Z(I,function(lt){return lt})||[]},only:function(I){if(!st(I))throw Error("React.Children.only expected to receive a single React element child.");return I}};return ve.Activity=g,ve.Children=ae,ve.Component=L,ve.Fragment=i,ve.Profiler=l,ve.PureComponent=w,ve.StrictMode=r,ve.Suspense=m,ve.ViewTransition=y,ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=V,ve.__COMPILER_RUNTIME={__proto__:null,c:function(I){return V.H.useMemoCache(I)}},ve.addTransitionType=Qt,ve.cache=function(I){return function(){return I.apply(null,arguments)}},ve.cacheSignal=function(){return null},ve.cloneElement=function(I,lt,$){if(I==null)throw Error("The argument must be a React element, but you passed "+I+".");var rt=M({},I.props),Rt=I.key;if(lt!=null)for(Dt in lt.key!==void 0&&(Rt=""+lt.key),lt)!D.call(lt,Dt)||Dt==="key"||Dt==="__self"||Dt==="__source"||Dt==="ref"&&lt.ref===void 0||(rt[Dt]=lt[Dt]);var Dt=arguments.length-2;if(Dt===1)rt.children=$;else if(1<Dt){for(var Ct=Array(Dt),Ut=0;Ut<Dt;Ut++)Ct[Ut]=arguments[Ut+2];rt.children=Ct}return C(I.type,Rt,rt)},ve.createContext=function(I){return I={$$typeof:h,_currentValue:I,_currentValue2:I,_threadCount:0,Provider:null,Consumer:null},I.Provider=I,I.Consumer={$$typeof:c,_context:I},I},ve.createElement=function(I,lt,$){var rt,Rt={},Dt=null;if(lt!=null)for(rt in lt.key!==void 0&&(Dt=""+lt.key),lt)D.call(lt,rt)&&rt!=="key"&&rt!=="__self"&&rt!=="__source"&&(Rt[rt]=lt[rt]);var Ct=arguments.length-2;if(Ct===1)Rt.children=$;else if(1<Ct){for(var Ut=Array(Ct),Ht=0;Ht<Ct;Ht++)Ut[Ht]=arguments[Ht+2];Rt.children=Ut}if(I&&I.defaultProps)for(rt in Ct=I.defaultProps,Ct)Rt[rt]===void 0&&(Rt[rt]=Ct[rt]);return C(I,Dt,Rt)},ve.createRef=function(){return{current:null}},ve.forwardRef=function(I){return{$$typeof:d,render:I}},ve.isValidElement=st,ve.lazy=function(I){return{$$typeof:v,_payload:{_status:-1,_result:I},_init:xt}},ve.memo=function(I,lt){return{$$typeof:p,type:I,compare:lt===void 0?null:lt}},ve.startTransition=Nt,ve.unstable_useCacheRefresh=function(){return V.H.useCacheRefresh()},ve.use=function(I){return V.H.use(I)},ve.useActionState=function(I,lt,$){return V.H.useActionState(I,lt,$)},ve.useCallback=function(I,lt){return V.H.useCallback(I,lt)},ve.useContext=function(I){return V.H.useContext(I)},ve.useDebugValue=function(){},ve.useDeferredValue=function(I,lt){return V.H.useDeferredValue(I,lt)},ve.useEffect=function(I,lt){return V.H.useEffect(I,lt)},ve.useEffectEvent=function(I){return V.H.useEffectEvent(I)},ve.useId=function(){return V.H.useId()},ve.useImperativeHandle=function(I,lt,$){return V.H.useImperativeHandle(I,lt,$)},ve.useInsertionEffect=function(I,lt){return V.H.useInsertionEffect(I,lt)},ve.useLayoutEffect=function(I,lt){return V.H.useLayoutEffect(I,lt)},ve.useMemo=function(I,lt){return V.H.useMemo(I,lt)},ve.useOptimistic=function(I,lt){return V.H.useOptimistic(I,lt)},ve.useReducer=function(I,lt,$){return V.H.useReducer(I,lt,$)},ve.useRef=function(I){return V.H.useRef(I)},ve.useState=function(I){return V.H.useState(I)},ve.useSyncExternalStore=function(I,lt,$){return V.H.useSyncExternalStore(I,lt,$)},ve.useTransition=function(){return V.H.useTransition()},ve.version="19.3.1",ve}var Xm;function _f(){return Xm||(Xm=1,vf.exports=ax()),vf.exports}var ws=_f();const km=ix(ws);var yf={exports:{}},qo={},Sf={exports:{}},xf={};var qm;function rx(){return qm||(qm=1,(function(s){function e(F,nt){var Z=F.length;F.push(nt);t:for(;0<Z;){var xt=Z-1>>>1,vt=F[xt];if(0<l(vt,nt))F[xt]=nt,F[Z]=vt,Z=xt;else break t}}function i(F){return F.length===0?null:F[0]}function r(F){if(F.length===0)return null;var nt=F[0],Z=F.pop();if(Z!==nt){F[0]=Z;t:for(var xt=0,vt=F.length,Nt=vt>>>1;xt<Nt;){var Qt=2*(xt+1)-1,ae=F[Qt],I=Qt+1,lt=F[I];if(0>l(ae,Z))I<vt&&0>l(lt,ae)?(F[xt]=lt,F[I]=Z,xt=I):(F[xt]=ae,F[Qt]=Z,xt=Qt);else if(I<vt&&0>l(lt,Z))F[xt]=lt,F[I]=Z,xt=I;else break t}}return nt}function l(F,nt){var Z=F.sortIndex-nt.sortIndex;return Z!==0?Z:F.id-nt.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;s.unstable_now=function(){return c.now()}}else{var h=Date,d=h.now();s.unstable_now=function(){return h.now()-d}}var m=[],p=[],v=1,g=null,y=3,x=!1,E=!1,A=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function w(F){for(var nt=i(p);nt!==null;){if(nt.callback===null)r(p);else if(nt.startTime<=F)r(p),nt.sortIndex=nt.expirationTime,e(m,nt);else break;nt=i(p)}}function G(F){if(A=!1,w(F),!E)if(i(m)!==null)E=!0,B||(B=!0,st());else{var nt=i(p);nt!==null&&Q(G,nt.startTime-F)}}var B=!1,P=-1,V=5,D=-1;function C(){return M?!0:!(s.unstable_now()-D<V)}function H(){if(M=!1,B){var F=s.unstable_now();D=F;var nt=!0;try{t:{E=!1,A&&(A=!1,L(P),P=-1),x=!0;var Z=y;try{e:{for(w(F),g=i(m);g!==null&&!(g.expirationTime>F&&C());){var xt=g.callback;if(typeof xt=="function"){g.callback=null,y=g.priorityLevel;var vt=xt(g.expirationTime<=F);if(F=s.unstable_now(),typeof vt=="function"){g.callback=vt,w(F),nt=!0;break e}g===i(m)&&r(m),w(F)}else r(m);g=i(m)}if(g!==null)nt=!0;else{var Nt=i(p);Nt!==null&&Q(G,Nt.startTime-F),nt=!1}}break t}finally{g=null,y=Z,x=!1}nt=void 0}}finally{nt?st():B=!1}}}var st;if(typeof N=="function")st=function(){N(H)};else if(typeof MessageChannel<"u"){var ft=new MessageChannel,q=ft.port2;ft.port1.onmessage=H,st=function(){q.postMessage(null)}}else st=function(){S(H,0)};function Q(F,nt){P=S(function(){F(s.unstable_now())},nt)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(F){F.callback=null},s.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):V=0<F?Math.floor(1e3/F):5},s.unstable_getCurrentPriorityLevel=function(){return y},s.unstable_next=function(F){switch(y){case 1:case 2:case 3:var nt=3;break;default:nt=y}var Z=y;y=nt;try{return F()}finally{y=Z}},s.unstable_requestPaint=function(){M=!0},s.unstable_runWithPriority=function(F,nt){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var Z=y;y=F;try{return nt()}finally{y=Z}},s.unstable_scheduleCallback=function(F,nt,Z){var xt=s.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?xt+Z:xt):Z=xt,F){case 1:var vt=-1;break;case 2:vt=250;break;case 5:vt=1073741823;break;case 4:vt=1e4;break;default:vt=5e3}return vt=Z+vt,F={id:v++,callback:nt,priorityLevel:F,startTime:Z,expirationTime:vt,sortIndex:-1},Z>xt?(F.sortIndex=Z,e(p,F),i(m)===null&&F===i(p)&&(A?(L(P),P=-1):A=!0,Q(G,Z-xt))):(F.sortIndex=vt,e(m,F),E||x||(E=!0,B||(B=!0,st()))),F},s.unstable_shouldYield=C,s.unstable_wrapCallback=function(F){var nt=y;return function(){var Z=y;y=nt;try{return F.apply(this,arguments)}finally{y=Z}}}})(xf)),xf}var Ym;function sx(){return Ym||(Ym=1,Sf.exports=rx()),Sf.exports}var Mf={exports:{}},Bn={};var Wm;function ox(){if(Wm)return Bn;Wm=1;var s=_f();function e(v){var g="https://react.dev/errors/"+v;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var y=2;y<arguments.length;y++)g+="&args[]="+encodeURIComponent(arguments[y])}return"Minified React error #"+v+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal"),c=Symbol.for("react.recoverable"),h=Symbol.for("react.optimistic_key");function d(v,g,y){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:x==null?null:x===h?h:""+x,children:v,containerInfo:g,implementation:y}}var m=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(v,g){if(v==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return Bn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Bn.browser=function(v){return{$$typeof:c,_reason:v}},Bn.createPortal=function(v,g){var y=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(e(299));return d(v,g,null,y)},Bn.flushSync=function(v){var g=m.T,y=r.p;try{if(m.T=null,r.p=2,v)return v()}finally{m.T=g,r.p=y,r.d.f()}},Bn.preconnect=function(v,g){typeof v=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,r.d.C(v,g))},Bn.prefetchDNS=function(v){typeof v=="string"&&r.d.D(v)},Bn.preinit=function(v,g){if(typeof v=="string"&&g&&typeof g.as=="string"){var y=g.as,x=p(y,g.crossOrigin),E=typeof g.integrity=="string"?g.integrity:void 0,A=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;y==="style"?r.d.S(v,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:x,integrity:E,fetchPriority:A}):y==="script"&&r.d.X(v,{crossOrigin:x,integrity:E,fetchPriority:A,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},Bn.preinitModule=function(v,g){if(typeof v=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var y=p(g.as,g.crossOrigin);r.d.M(v,{crossOrigin:y,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0})}}else g==null&&r.d.M(v)},Bn.preload=function(v,g){if(typeof v=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var y=g.as,x=p(y,g.crossOrigin);r.d.L(v,y,{crossOrigin:x,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},Bn.preloadModule=function(v,g){if(typeof v=="string")if(g){var y=p(g.as,g.crossOrigin);r.d.m(v,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:y,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0})}else r.d.m(v)},Bn.requestFormReset=function(v){r.d.r(v)},Bn.unstable_batchedUpdates=function(v,g){return v(g)},Bn.useFormState=function(v,g,y){return m.H.useFormState(v,g,y)},Bn.useFormStatus=function(){return m.H.useHostTransitionStatus()},Bn.version="19.3.1",Bn}var Zm;function Km(){if(Zm)return Mf.exports;Zm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Mf.exports=ox(),Mf.exports}var jm;function lx(){if(jm)return qo;jm=1;var s=sx(),e=_f(),i=Km();function r(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){for(var n=t,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(t=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?t:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(r(188))}function p(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(r(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),t;if(f===o)return m(u),n;f=f.sibling}throw Error(r(188))}if(a.return!==o.return)a=u,o=f;else{for(var _=!1,b=u.child;b;){if(b===a){_=!0,a=u,o=f;break}if(b===o){_=!0,o=u,a=f;break}b=b.sibling}if(!_){for(b=f.child;b;){if(b===a){_=!0,a=f,o=u;break}if(b===o){_=!0,o=f,a=u;break}b=b.sibling}if(!_)throw Error(r(189))}}if(a.alternate!==o)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}function g(t,n,a,o,u,f){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,o,u,f)||(t.tag!==22||t.memoizedState===null)&&(n||t.tag!==5&&t.tag!==27)&&g(t.child,n,a,o,u,f))return!0;t=t.sibling}return!1}function y(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function x(t){var n=!1;for(t=t.return;t!==null&&(t.tag===4&&(n=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return n}function E(t){var n=[null,null],a=y(t);return a===null||A(n,t,a.child,{foundSelf:!1}),n}function A(t,n,a,o){for(;a!==null;){if(a===n)o.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(o.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&A(t,n,a.child,o))return!0;a=a.sibling}return!1}function M(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(r(559))}}var S=null,L=null;function N(t,n,a){return t===a?!0:t===n?(S=t,!0):!1}function w(t,n,a){return t===a?(L=t,!1):t===n?(L!==null&&(S=t),!0):!1}function G(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function B(t,n,a){for(var o=0,u=t;u;u=a(u))o++;u=0;for(var f=n;f;f=a(f))u++;for(;0<o-u;)t=a(t),o--;for(;0<u-o;)n=a(n),u--;for(;o--;){if(t===n||n!==null&&t===n.alternate)return t;t=a(t),n=a(n)}return null}var P=Object.assign,V=Symbol.for("react.element"),D=Symbol.for("react.transitional.element"),C=Symbol.for("react.portal"),H=Symbol.for("react.fragment"),st=Symbol.for("react.strict_mode"),ft=Symbol.for("react.profiler"),q=Symbol.for("react.consumer"),Q=Symbol.for("react.context"),F=Symbol.for("react.forward_ref"),nt=Symbol.for("react.suspense"),Z=Symbol.for("react.suspense_list"),xt=Symbol.for("react.memo"),vt=Symbol.for("react.lazy"),Nt=Symbol.for("react.activity"),Qt=Symbol.for("react.legacy_hidden"),ae=Symbol.for("react.memo_cache_sentinel"),I=Symbol.for("react.view_transition"),lt=Symbol.for("react.recoverable"),$=Symbol.iterator;function rt(t){return t===null||typeof t!="object"?null:(t=$&&t[$]||t["@@iterator"],typeof t=="function"?t:null)}var Rt=Symbol.for("react.client.reference");function Dt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===Rt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case H:return"Fragment";case ft:return"Profiler";case st:return"StrictMode";case nt:return"Suspense";case Z:return"SuspenseList";case Nt:return"Activity";case I:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case C:return"Portal";case Q:return t.displayName||"Context";case q:return(t._context.displayName||"Context")+".Consumer";case F:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case xt:return n=t.displayName||null,n!==null?n:Dt(t.type)||"Memo";case vt:n=t._payload,t=t._init;try{return Dt(t(n))}catch{}}return null}var Ct=Array.isArray,Ut=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ht=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,z={pending:!1,data:null,method:null,action:null},wt=[],yt=-1;function gt(t){return{current:t}}function pt(t){0>yt||(t.current=wt[yt],wt[yt]=null,yt--)}function Tt(t,n){yt++,wt[yt]=t.current,t.current=n}var At=gt(null),Bt=gt(null),fe=gt(null),ce=gt(null);function U(t,n){switch(Tt(fe,n),Tt(Bt,t),Tt(At,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?hS(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=hS(n),t=dS(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}pt(At),Tt(At,t)}function T(){pt(At),pt(Bt),pt(fe)}function et(t){var n=t.memoizedState;n!==null&&(Go._currentValue=n.memoizedState,Tt(ce,t)),n=At.current;var a=dS(n,t.type);n!==a&&(Tt(Bt,t),Tt(At,a))}function dt(t){Bt.current===t&&(pt(At),pt(Bt)),ce.current===t&&(pt(ce),Go._currentValue=z)}var Et,mt;function Zt(t){if(Et===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Et=n&&n[1]||"",mt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Et+t+mt}var It=!1;function ee(t,n){if(!t||It)return"";It=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var St=function(){throw Error()};if(Object.defineProperty(St.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(St,[])}catch(Wt){var W=Wt}Reflect.construct(t,[],St)}else{try{St.call()}catch(Wt){W=Wt}St=!1;try{var at=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),St=!0,new t}finally{St&&(at!==void 0?Object.defineProperty(t.prototype,"props",at):delete t.prototype.props)}}}else{try{throw Error()}catch(Wt){W=Wt}(St=t())&&typeof St.catch=="function"&&St.catch(function(){})}}catch(Wt){if(Wt&&W&&typeof Wt.stack=="string")return[Wt.stack,W.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),_=f[0],b=f[1];if(_&&b){var O=_.split(`
`),j=b.split(`
`);for(u=o=0;o<O.length&&!O[o].includes("DetermineComponentFrameRoot");)o++;for(;u<j.length&&!j[u].includes("DetermineComponentFrameRoot");)u++;if(o===O.length||u===j.length)for(o=O.length-1,u=j.length-1;1<=o&&0<=u&&O[o]!==j[u];)u--;for(;1<=o&&0<=u;o--,u--)if(O[o]!==j[u]){if(o!==1||u!==1)do if(o--,u--,0>u||O[o]!==j[u]){var ot=`
`+O[o].replace(" at new "," at ");return t.displayName&&ot.includes("<anonymous>")&&(ot=ot.replace("<anonymous>",t.displayName)),ot}while(1<=o&&0<=u);break}}}finally{It=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Zt(a):""}function $t(t,n){switch(t.tag){case 26:case 27:case 5:return Zt(t.type);case 16:return Zt("Lazy");case 13:return t.child!==n&&n!==null?Zt("Suspense Fallback"):Zt("Suspense");case 19:return Zt("SuspenseList");case 0:case 15:return ee(t.type,!1);case 11:return ee(t.type.render,!1);case 1:return ee(t.type,!0);case 31:return Zt("Activity");case 30:return Zt("ViewTransition");default:return""}}function Ot(t){try{var n="",a=null;do n+=$t(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Xt=Object.prototype.hasOwnProperty,se=s.unstable_scheduleCallback,ie=s.unstable_cancelCallback,Yt=s.unstable_shouldYield,ge=s.unstable_requestPaint,X=s.unstable_now,zt=s.unstable_getCurrentPriorityLevel,Vt=s.unstable_ImmediatePriority,Mt=s.unstable_UserBlockingPriority,Lt=s.unstable_NormalPriority,bt=s.unstable_LowPriority,ne=s.unstable_IdlePriority,me=s.log,Me=s.unstable_setDisableYieldValue,de=null,Pe=null;function cn(t){if(typeof me=="function"&&Me(t),Pe&&typeof Pe.setStrictMode=="function")try{Pe.setStrictMode(de,t)}catch{}}var an=Math.clz32?Math.clz32:ma,Jn=Math.log,Va=Math.LN2;function ma(t){return t>>>=0,t===0?32:31-(Jn(t)/Va|0)|0}var Ji=256,Oi=262144,fi=4194304;function Cn(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function $i(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,f=t.suspendedLanes,_=t.pingedLanes;t=t.warmLanes;var b=o&134217727;return b!==0?(o=b&~f,o!==0?u=Cn(o):(_&=b,_!==0?u=Cn(_):a||(a=b&~t,a!==0&&(u=Cn(a))))):(b=o&~f,b!==0?u=Cn(b):_!==0?u=Cn(_):a||(a=o&~t,a!==0&&(u=Cn(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function zi(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function hi(t,n){(n&8)!==0&&(n|=n&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=n;0<a;){var o=31-an(a),u=1<<o;n|=t[o],a&=~u}return n}function ao(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function rs(){var t=fi;return fi<<=1,(fi&62914560)===0&&(fi=4194304),t}function ta(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function ea(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function ss(t,n,a,o,u,f){var _=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var b=t.entanglements,O=t.expirationTimes,j=t.hiddenUpdates;for(a=_&~a;0<a;){var ot=31-an(a),St=1<<ot;b[ot]=0,O[ot]=-1;var W=j[ot];if(W!==null)for(j[ot]=null,ot=0;ot<W.length;ot++){var at=W[ot];at!==null&&(at.lane&=-536870913)}a&=~St}o!==0&&R(t,o,0),f!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=f&~(_&~n))}function R(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-an(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function J(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-an(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function ct(t,n){var a=n&-n;return a=(a&42)!==0?1:ut(a),(a&(t.suspendedLanes|n))!==0?0:a}function ut(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function tt(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Pt(){var t=Ht.p;return t!==0?t:(t=window.event,t===void 0?32:jS(t.type))}function kt(t,n){var a=Ht.p;try{return Ht.p=t,n()}finally{Ht.p=a}}var jt=Math.random().toString(36).slice(2),Gt="__reactFiber$"+jt,Jt="__reactProps$"+jt,he="__reactContainer$"+jt,le="__reactEvents$"+jt,Te="__reactListeners$"+jt,Ve="__reactHandles$"+jt,De="__reactResources$"+jt,Ie="__reactMarker$"+jt,Oe="__reactLoad$"+jt;function oe(t){delete t[Gt],delete t[Jt],delete t[Te],delete t[Ve]}function Be(t){var n;if(n=t[Gt])return n;for(var a=t.parentNode;a;){if(n=a[he]||a[Gt]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=DS(t);t!==null;){if(a=t[Gt])return a;t=DS(t)}return n}t=a,a=t.parentNode}return null}function _e(t){if(t=t[Gt]||t[he]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function un(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(r(33))}function Hn(t){var n=t[De];return n||(n=t[De]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Fe(t){t[Ie]=!0}function na(t){t[Oe]=void 0}var Ye=new Set,mn={};function fn(t,n){rn(t,n),rn(t+"Capture",n)}function rn(t,n){for(mn[t]=n,t=0;t<n.length;t++)Ye.add(n[t])}var wn=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ga={},Ei={};function ht(t){return Xt.call(Ei,t)?!0:Xt.call(Ga,t)?!1:wn.test(t)?Ei[t]=!0:(Ga[t]=!0,!1)}var Ft=!1;function Ue(){var t=Ft;return Ft=!1,t}function ze(t,n,a){if(ht(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,a)}}function tn(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,a)}}function $n(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,o)}}function _n(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ia(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function gr(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(_){a=""+_,f.call(this,_)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(_){a=""+_},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Ln(t){if(!t._valueTracker){var n=ia(t)?"checked":"value";t._valueTracker=gr(t,n,""+t[n])}}function Xa(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=ia(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}var ro=/[\n"\\]/g;function Vn(t){return t.replace(ro,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function hn(t,n,a,o,u,f,_,b){t.name="",_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"?t.type=_:t.removeAttribute("type"),n!=null?_==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+_n(n)):t.value!==""+_n(n)&&(t.value=""+_n(n)):_!=="submit"&&_!=="reset"||t.removeAttribute("value"),n!=null?_==="number"&&t.value==n?On(t,_n(t.value)):On(t,_n(n)):a!=null?On(t,_n(a)):o!=null&&t.removeAttribute("value"),u==null&&f!=null&&(t.defaultChecked=!!f),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?t.name=""+_n(b):t.removeAttribute("name")}function os(t,n,a,o,u,f,_,b){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(t.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Ln(t);return}a=a!=null?""+_n(a):"",n=n!=null?""+_n(n):a,b||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=b?t.checked:!!o,t.defaultChecked=!!o,_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(t.name=_),Ln(t)}function On(t,n){t.defaultValue!==""+n&&(t.defaultValue=""+n)}function Gn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+_n(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function Qe(t,n,a){if(n!=null&&(n=""+_n(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+_n(a):""}function Pi(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(r(92));if(Ct(o)){if(1<o.length)throw Error(r(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=_n(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),Ln(t)}function ls(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Qc=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function so(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||Qc.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function Jc(t,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="",Ft=!0);for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&(so(t,u,o),Ft=!0)}else for(var f in n)n.hasOwnProperty(f)&&so(t,f,n[f])}function ga(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _l=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),yl=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function vr(t){return yl.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function di(){}var Md=null;function Ed(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var oo=null,lo=null;function sv(t){var n=_e(t);if(n&&(t=n.stateNode)){var a=t[Jt]||null;t:switch(t=n.stateNode,n.type){case"input":if(hn(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Vn(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[Jt]||null;if(!u)throw Error(r(90));hn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&Xa(o)}break t;case"textarea":Qe(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&Gn(t,!!a.multiple,n,!1)}}}var Td=!1;function ov(t,n,a){if(Td)return t(n,a);Td=!0;try{var o=t(n);return o}finally{if(Td=!1,(oo!==null||lo!==null)&&(Ju(),oo&&(n=oo,t=lo,lo=oo=null,sv(n),t)))for(n=0;n<t.length;n++)sv(t[n])}}function Sl(t,n){var a=t.stateNode;if(a===null)return null;var o=a[Jt]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var ka=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),bd=!1;if(ka)try{var xl={};Object.defineProperty(xl,"passive",{get:function(){bd=!0}}),window.addEventListener("test",xl,xl),window.removeEventListener("test",xl,xl)}catch{bd=!1}var _r=null,Ad=null,$c=null;function lv(){if($c)return $c;var t,n=Ad,a=n.length,o,u="value"in _r?_r.value:_r.textContent,f=u.length;for(t=0;t<a&&n[t]===u[t];t++);var _=a-t;for(o=1;o<=_&&n[a-o]===u[f-o];o++);return $c=u.slice(t,1<o?1-o:void 0)}function tu(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function eu(){return!0}function cv(){return!1}function ai(t){function n(a,o,u,f,_){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=_,this.currentTarget=null;for(var b in t)t.hasOwnProperty(b)&&(a=t[b],this[b]=a?a(f):f[b]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?eu:cv,this.isPropagationStopped=cv,this}return P(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=eu)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=eu)},persist:function(){},isPersistent:eu}),n}var yr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},nu=ai(yr),Ml=P({},yr,{view:0,detail:0}),$A=ai(Ml),Rd,Cd,El,iu=P({},Ml,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Dd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==El&&(El&&t.type==="mousemove"?(Rd=t.screenX-El.screenX,Cd=t.screenY-El.screenY):Cd=Rd=0,El=t),Rd)},movementY:function(t){return"movementY"in t?t.movementY:Cd}}),uv=ai(iu),tR=P({},iu,{dataTransfer:0}),eR=ai(tR),nR=P({},Ml,{relatedTarget:0}),wd=ai(nR),iR=P({},yr,{animationName:0,elapsedTime:0,pseudoElement:0}),aR=ai(iR),rR=P({},yr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),sR=ai(rR),oR=P({},yr,{data:0}),fv=ai(oR),lR={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cR={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},uR={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fR(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=uR[t])?!!n[t]:!1}function Dd(){return fR}var hR=P({},Ml,{key:function(t){if(t.key){var n=lR[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=tu(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?cR[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Dd,charCode:function(t){return t.type==="keypress"?tu(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?tu(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),dR=ai(hR),pR=P({},iu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hv=ai(pR),mR=P({},yr,{submitter:0}),gR=ai(mR),vR=P({},Ml,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Dd}),_R=ai(vR),yR=P({},yr,{propertyName:0,elapsedTime:0,pseudoElement:0}),SR=ai(yR),xR=P({},iu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),MR=ai(xR),ER=P({},yr,{newState:0,oldState:0,source:0}),TR=ai(ER),bR=[9,13,27,32],Ud=ka&&"CompositionEvent"in window,Tl=null;ka&&"documentMode"in document&&(Tl=document.documentMode);var AR=ka&&"TextEvent"in window&&!Tl,dv=ka&&(!Ud||Tl&&8<Tl&&11>=Tl),pv=" ",mv=!1;function gv(t,n){switch(t){case"keyup":return bR.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var co=!1;function RR(t,n){switch(t){case"compositionend":return vv(n);case"keypress":return n.which!==32?null:(mv=!0,pv);case"textInput":return t=n.data,t===pv&&mv?null:t;default:return null}}function CR(t,n){if(co)return t==="compositionend"||!Ud&&gv(t,n)?(t=lv(),$c=Ad=_r=null,co=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return dv&&n.locale!=="ko"?null:n.data;default:return null}}var wR={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function _v(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!wR[t.type]:n==="textarea"}function yv(t,n,a,o){oo?lo?lo.push(o):lo=[o]:oo=o,n=rf(n,"onChange"),0<n.length&&(a=new nu("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var bl=null,Al=null;function DR(t){sS(t,0)}function au(t){var n=un(t);if(Xa(n))return t}function Sv(t,n){if(t==="change")return n}var xv=!1;if(ka){var Nd;if(ka){var Ld="oninput"in document;if(!Ld){var Mv=document.createElement("div");Mv.setAttribute("oninput","return;"),Ld=typeof Mv.oninput=="function"}Nd=Ld}else Nd=!1;xv=Nd&&(!document.documentMode||9<document.documentMode)}function Ev(){bl&&(bl.detachEvent("onpropertychange",Tv),Al=bl=null)}function Tv(t){if(t.propertyName==="value"&&au(Al)){var n=[];yv(n,Al,t,Ed(t)),ov(DR,n)}}function UR(t,n,a){t==="focusin"?(Ev(),bl=n,Al=a,bl.attachEvent("onpropertychange",Tv)):t==="focusout"&&Ev()}function NR(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return au(Al)}function LR(t,n){if(t==="click")return au(n)}function OR(t,n){if(t==="input"||t==="change")return au(n)}function zR(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var Ti=typeof Object.is=="function"?Object.is:zR;function Rl(t,n){if(Ti(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Xt.call(n,u)||!Ti(t[u],n[u]))return!1}return!0}function Od(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function bv(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Av(t,n){var a=bv(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=bv(a)}}function Rv(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Rv(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Cv(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=Od(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=Od(t.document)}return n}function zd(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var PR=ka&&"documentMode"in document&&11>=document.documentMode,uo=null,Pd=null,Cl=null,Id=!1;function wv(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Id||uo==null||uo!==Od(o)||(o=uo,"selectionStart"in o&&zd(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Cl&&Rl(Cl,o)||(Cl=o,o=rf(Pd,"onSelect"),0<o.length&&(n=new nu("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=uo)))}function cs(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var fo={animationend:cs("Animation","AnimationEnd"),animationiteration:cs("Animation","AnimationIteration"),animationstart:cs("Animation","AnimationStart"),transitionrun:cs("Transition","TransitionRun"),transitionstart:cs("Transition","TransitionStart"),transitioncancel:cs("Transition","TransitionCancel"),transitionend:cs("Transition","TransitionEnd")},Bd={},Dv={};ka&&(Dv=document.createElement("div").style,"AnimationEvent"in window||(delete fo.animationend.animation,delete fo.animationiteration.animation,delete fo.animationstart.animation),"TransitionEvent"in window||delete fo.transitionend.transition);function us(t){if(Bd[t])return Bd[t];if(!fo[t])return t;var n=fo[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Dv)return Bd[t]=n[a];return t}var Uv=us("animationend"),Nv=us("animationiteration"),Lv=us("animationstart"),IR=us("transitionrun"),BR=us("transitionstart"),FR=us("transitioncancel"),Ov=us("transitionend"),zv=new Map,Fd="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Fd.push("scrollEnd");function aa(t,n){zv.set(t,n),fn(n,[t])}var HR=0;function qa(t,n){if(t.name!=null&&t.name!=="auto")return t.name;if(n.autoName!==null)return n.autoName;t=la.identifierPrefix;var a=HR++;return t="_"+t+"t_"+a.toString(32)+"_",n.autoName=t}function Pv(t){if(t==null||typeof t=="string")return t;var n=null,a=No;if(a!==null)for(var o=0;o<a.length;o++){var u=t[a[o]];if(u!=null){if(u==="none")return"none";n=n==null?u:n+(" "+u)}}return n??t.default}function Ya(t,n){return t=Pv(t),n=Pv(n),n==null?t==="auto"?null:t:n==="auto"?null:n}var ru=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Ii=[],ho=0,Hd=0;function su(){for(var t=ho,n=Hd=ho=0;n<t;){var a=Ii[n];Ii[n++]=null;var o=Ii[n];Ii[n++]=null;var u=Ii[n];Ii[n++]=null;var f=Ii[n];if(Ii[n++]=null,o!==null&&u!==null){var _=o.pending;_===null?u.next=u:(u.next=_.next,_.next=u),o.pending=u}f!==0&&Iv(a,u,f)}}function ou(t,n,a,o){Ii[ho++]=t,Ii[ho++]=n,Ii[ho++]=a,Ii[ho++]=o,Hd|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Vd(t,n,a,o){return ou(t,n,a,o),lu(t)}function fs(t,n){return ou(t,null,null,n),lu(t)}function Iv(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=t.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(t=f.stateNode,t===null||t._visibility&1||(u=!0)),t=f,f=f.return;return t.tag===3?(f=t.stateNode,u&&n!==null&&(u=31-an(a),t=f.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function lu(t){if(50<jl)throw jl=0,Qu=null,Error(r(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var po={};function VR(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function pi(t,n,a,o){return new VR(t,n,a,o)}function Gd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Wa(t,n){var a=t.alternate;return a===null?(a=pi(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Bv(t,n){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function cu(t,n,a,o,u,f){var _=0;if(o=t,typeof o=="function")Gd(o)&&(_=1);else if(typeof o=="string")_=mC(t,a,At.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(o){case Nt:return t=pi(31,a,n,u),t.elementType=Nt,t.lanes=f,t;case H:return hs(a.children,u,f,n);case st:_=8,u|=24;break;case ft:return t=pi(12,a,n,u|2),t.elementType=ft,t.lanes=f,t;case nt:return t=pi(13,a,n,u),t.elementType=nt,t.lanes=f,t;case Z:return t=pi(19,a,n,u),t.elementType=Z,t.lanes=f,t;case Qt:case I:return t=u|32,t=pi(30,a,n,t),t.elementType=I,t.lanes=f,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof o=="object"&&o!==null)switch(o.$$typeof){case Q:_=10;break t;case q:_=9;break t;case F:_=11;break t;case xt:_=14;break t;case vt:_=16,o=null;break t}_=29,a=Error(r(130,t===null?"null":typeof t,"")),o=null}return n=pi(_,a,n,u),n.elementType=t,n.type=o,n.lanes=f,n}function hs(t,n,a,o){return t=pi(7,t,o,n),t.lanes=a,t}function Xd(t,n,a){return t=pi(6,t,null,n),t.lanes=a,t}function Fv(t){var n=pi(18,null,null,0);return n.stateNode=t,n}function kd(t,n,a){return n=pi(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Hv=new WeakMap;function Bi(t,n){if(typeof t=="object"&&t!==null){var a=Hv.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Ot(n)},Hv.set(t,n),n)}return{value:t,source:n,stack:Ot(n)}}var mo=[],go=0,uu=null,wl=0,Fi=[],Hi=0,Sr=null,va=1,_a="";function Za(t,n){mo[go++]=wl,mo[go++]=uu,uu=t,wl=n}function Vv(t,n,a){Fi[Hi++]=va,Fi[Hi++]=_a,Fi[Hi++]=Sr,Sr=t;var o=va;t=_a;var u=32-an(o)-1;o&=~(1<<u),a+=1;var f=32-an(n)+u;if(30<f){var _=u-u%5;f=(o&(1<<_)-1).toString(32),o>>=_,u-=_,va=1<<32-an(n)+u|a<<u|o,_a=f+t}else va=1<<f|a<<u|o,_a=t}function fu(t){t.return!==null&&(Za(t,1),Vv(t,1,0))}function qd(t){for(;t===uu;)uu=mo[--go],mo[go]=null,wl=mo[--go],mo[go]=null;for(;t===Sr;)Sr=Fi[--Hi],Fi[Hi]=null,_a=Fi[--Hi],Fi[Hi]=null,va=Fi[--Hi],Fi[Hi]=null}function Gv(t,n){Fi[Hi++]=va,Fi[Hi++]=_a,Fi[Hi++]=Sr,va=n.id,_a=n.overflow,Sr=t}var zn=null,en=null,be=!1,xr=null,Vi=!1,Yd=Error(r(519));function Mr(t){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Dl(Bi(n,t)),Yd}function Xv(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[Gt]=t,n[Jt]=o,a){case"dialog":we("cancel",n),we("close",n);break;case"iframe":case"object":case"embed":we("load",n);break;case"video":case"audio":for(a=0;a<Jl.length;a++)we(Jl[a],n);break;case"source":we("error",n);break;case"img":case"image":case"link":we("error",n),we("load",n);break;case"details":we("toggle",n);break;case"input":we("invalid",n),os(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":we("invalid",n);break;case"textarea":we("invalid",n),Pi(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||uS(n.textContent,a)?(o.popover!=null&&(we("beforetoggle",n),we("toggle",n)),o.onScroll!=null&&we("scroll",n),o.onScrollEnd!=null&&we("scrollend",n),o.onClick!=null&&(n.onclick=di),n=!0):n=!1,n||Mr(t,!0)}function hu(t){for(zn=t.return;zn;)switch(zn.tag){case 5:case 31:case 13:Vi=!1;return;case 27:case 3:Vi=!0;return;default:zn=zn.return}}function vo(t){if(t!==zn)return!1;if(!be)return hu(t),be=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Mm(t.type,t.memoizedProps)),a=!a),a&&en&&Mr(t),hu(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));en=wS(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));en=wS(t)}else n===27?(n=en,Br(t.type)?(t=Um,Um=null,en=t):en=n):en=zn?Xi(t.stateNode.nextSibling):null;return!0}function ds(){en=zn=null,be=!1}function Wd(){var t=xr;return t!==null&&(vi===null?vi=t:vi.push.apply(vi,t),xr=null),t}function Dl(t){xr===null?xr=[t]:xr.push(t)}var Zd=gt(null),ps=null,Ka=null;function Er(t,n,a){Tt(Zd,n._currentValue),n._currentValue=a}function ja(t){t._currentValue=Zd.current,pt(Zd)}function du(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function Kd(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var f=u.dependencies;if(f!==null){var _=u.child;f=f.firstContext;t:for(;f!==null;){var b=f;f=u;for(var O=0;O<n.length;O++)if(b.context===n[O]){f.lanes|=a,b=f.alternate,b!==null&&(b.lanes|=a),du(f.return,a,t),o||(_=null);break t}f=b.next}}else if(u.tag===18){if(_=u.return,_===null)throw Error(r(341));_.lanes|=a,f=_.alternate,f!==null&&(f.lanes|=a),du(_,a,t),_=null}else u.tag===13&&u.memoizedState!==null&&u.memoizedState.dehydrated===null?(u.lanes|=a,_=u.alternate,_!==null&&(_.lanes|=a),du(u.return,a,t),_=u.child,_=_!==null?_.sibling:null):_=u.child;if(_!==null)_.return=u;else for(_=u;_!==null;){if(_===t){_=null;break}if(u=_.sibling,u!==null){u.return=_.return,_=u;break}_=_.return}u=_}}function ms(t,n,a,o){t=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var _=u.alternate;if(_===null)throw Error(r(387));if(_=_.memoizedProps,_!==null){var b=u.type;Ti(u.pendingProps.value,_.value)||(t!==null?t.push(b):t=[b])}}else if(u===ce.current){if(_=u.alternate,_===null)throw Error(r(387));_.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Go):t=[Go])}u=u.return}return t!==null&&Kd(n,t,a,o),n.flags|=262144,t!==null}function pu(t){for(t=t.firstContext;t!==null;){if(!Ti(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function gs(t){ps=t,Ka=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Xn(t){return kv(ps,t)}function mu(t,n){return ps===null&&gs(t),kv(t,n)}function kv(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Ka===null){if(t===null)throw Error(r(308));Ka=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Ka=Ka.next=n;return a}var GR=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},XR=s.unstable_scheduleCallback,kR=s.unstable_NormalPriority,Mn={$$typeof:Q,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function jd(){return{controller:new GR,data:new Map,refCount:0}}function Ul(t){t.refCount--,t.refCount===0&&XR(kR,function(){t.controller.abort()})}function qv(t,n){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<n.length;t++){var o=n[t];a.indexOf(o)===-1&&a.push(o)}}}var Nl=null;function qR(t){var n=t.transitionTypes;return t.transitionTypes=null,n}var Ll=null,Qd=0,vs=0,_o=null;function YR(t,n){if(Ll===null){var a=Ll=[];Qd=0,vs=dm(),_o={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Qd++,n.then(Yv,Yv),n}function Yv(){if(--Qd===0&&(Nl=null,Ll!==null)){_o!==null&&(_o.status="fulfilled");var t=Ll;Ll=null,vs=0,_o=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function WR(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Wv=Ut.S;Ut.S=function(t,n){if(Fy=X(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&YR(t,n),Nl!==null)for(var a=Po;a!==null;)qv(a,Nl),a=a.next;if(a=t.types,a!==null){for(var o=Po;o!==null;)qv(o,a),o=o.next;if(vs!==0){o=Nl,o===null&&(o=Nl=[]);for(var u=0;u<a.length;u++){var f=a[u];o.indexOf(f)===-1&&o.push(f)}}}Wv!==null&&Wv(t,n)};var _s=gt(null);function Jd(){var t=_s.current;return t!==null?t:$e.pooledCache}function gu(t,n){n===null?Tt(_s,_s.current):Tt(_s,n.pool)}function Zv(){var t=Jd();return t===null?null:{parent:Mn._currentValue,pool:t}}var yo=Error(r(460)),$d=Error(r(474)),vu=Error(r(542)),_u={then:function(){}};function Kv(t){return t=t.status,t==="fulfilled"||t==="rejected"}function jv(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(di,di),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Jv(t),t===void 0&&!("reason"in n)?Error(r(600)):t;default:if(typeof n.status=="string")n.then(di,di);else{if(t=$e,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Jv(t),t}throw Ss=n,yo}}function ys(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ss=a,yo):a}}var Ss=null;function Qv(){if(Ss===null)throw Error(r(459));var t=Ss;return Ss=null,t}function Jv(t){if(t===yo||t===vu)throw Error(r(483))}var So=null,Ol=0;function yu(t){var n=Ol;return Ol+=1,So===null&&(So=[]),jv(So,t,n)}function Tr(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Su(t,n){throw n.$$typeof===V?Error(r(525)):(t=Object.prototype.toString.call(n),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function $v(t){function n(K,k){if(t){var it=K.deletions;it===null?(K.deletions=[k],K.flags|=16):it.push(k)}}function a(K,k){if(!t)return null;for(;k!==null;)n(K,k),k=k.sibling;return null}function o(K){for(var k=new Map;K!==null;)K.key===null?k.set(K.index,K):k.set(K.key,K),K=K.sibling;return k}function u(K,k){return K=Wa(K,k),K.index=0,K.sibling=null,K}function f(K,k,it){return K.index=it,t?(it=K.alternate,it!==null?(it=it.index,it<k?(K.flags|=2,k):it):(K.flags|=134217730,k)):(K.flags|=1048576,k)}function _(K){return t&&K.alternate===null&&(K.flags|=134217730),K}function b(K,k,it,_t){return k===null||k.tag!==6?(k=Xd(it,K.mode,_t),k.return=K,k):(k=u(k,it),k.return=K,k)}function O(K,k,it,_t){var te=it.type;return te===H?(K=ot(K,k,it.props.children,_t,it.key),Tr(K,it),K):k!==null&&(k.elementType===te||typeof te=="object"&&te!==null&&te.$$typeof===vt&&ys(te)===k.type)?(k=u(k,it.props),Tr(k,it),k.return=K,k):(k=cu(it.type,it.key,it.props,null,K.mode,_t),Tr(k,it),k.return=K,k)}function j(K,k,it,_t){return k===null||k.tag!==4||k.stateNode.containerInfo!==it.containerInfo||k.stateNode.implementation!==it.implementation?(k=kd(it,K.mode,_t),k.return=K,k):(k=u(k,it.children||[]),k.return=K,k)}function ot(K,k,it,_t,te){return k===null||k.tag!==7?(k=hs(it,K.mode,_t,te),k.return=K,k):(k=u(k,it),k.return=K,k)}function St(K,k,it){if(typeof k=="string"&&k!==""||typeof k=="number"||typeof k=="bigint")return k=Xd(""+k,K.mode,it),k.return=K,k;if(typeof k=="object"&&k!==null){switch(k.$$typeof){case D:return it=cu(k.type,k.key,k.props,null,K.mode,it),Tr(it,k),it.return=K,it;case C:return k=kd(k,K.mode,it),k.return=K,k;case vt:return k=ys(k),St(K,k,it)}if(Ct(k)||rt(k))return k=hs(k,K.mode,it,null),k.return=K,k;if(typeof k.then=="function")return St(K,yu(k),it);if(k.$$typeof===Q)return St(K,mu(K,k),it);Su(K,k)}return null}function W(K,k,it,_t){var te=k!==null?k.key:null;if(typeof it=="string"&&it!==""||typeof it=="number"||typeof it=="bigint")return te!==null?null:b(K,k,""+it,_t);if(typeof it=="object"&&it!==null){switch(it.$$typeof){case D:return it.key===te?O(K,k,it,_t):null;case C:return it.key===te?j(K,k,it,_t):null;case vt:return it=ys(it),W(K,k,it,_t)}if(Ct(it)||rt(it))return te!==null?null:ot(K,k,it,_t,null);if(typeof it.then=="function")return W(K,k,yu(it),_t);if(it.$$typeof===Q)return W(K,k,mu(K,it),_t);Su(K,it)}return null}function at(K,k,it,_t,te){if(typeof _t=="string"&&_t!==""||typeof _t=="number"||typeof _t=="bigint")return K=K.get(it)||null,b(k,K,""+_t,te);if(typeof _t=="object"&&_t!==null){switch(_t.$$typeof){case D:return K=K.get(_t.key===null?it:_t.key)||null,O(k,K,_t,te);case C:return K=K.get(_t.key===null?it:_t.key)||null,j(k,K,_t,te);case vt:return _t=ys(_t),at(K,k,it,_t,te)}if(Ct(_t)||rt(_t))return K=K.get(it)||null,ot(k,K,_t,te,null);if(typeof _t.then=="function")return at(K,k,it,yu(_t),te);if(_t.$$typeof===Q)return at(K,k,it,mu(k,_t),te);Su(k,_t)}return null}function Wt(K,k,it,_t){for(var te=null,Le=null,ue=k,pe=k=0,bn=null;ue!==null&&pe<it.length;pe++){ue.index>pe?(bn=ue,ue=null):bn=ue.sibling;var He=W(K,ue,it[pe],_t);if(He===null){ue===null&&(ue=bn);break}t&&ue&&He.alternate===null&&n(K,ue),k=f(He,k,pe),Le===null?te=He:Le.sibling=He,Le=He,ue=bn}if(pe===it.length)return a(K,ue),be&&Za(K,pe),te;if(ue===null){for(;pe<it.length;pe++)ue=St(K,it[pe],_t),ue!==null&&(k=f(ue,k,pe),Le===null?te=ue:Le.sibling=ue,Le=ue);return be&&Za(K,pe),te}for(ue=o(ue);pe<it.length;pe++)bn=at(ue,K,pe,it[pe],_t),bn!==null&&(t&&(He=bn.alternate,He!==null&&ue.delete(He.key===null?pe:He.key)),k=f(bn,k,pe),Le===null?te=bn:Le.sibling=bn,Le=bn);return t&&ue.forEach(function(Xr){return n(K,Xr)}),be&&Za(K,pe),te}function re(K,k,it,_t){if(it==null)throw Error(r(151));for(var te=null,Le=null,ue=k,pe=k=0,bn=null,He=it.next();ue!==null&&!He.done;pe++,He=it.next()){ue.index>pe?(bn=ue,ue=null):bn=ue.sibling;var Xr=W(K,ue,He.value,_t);if(Xr===null){ue===null&&(ue=bn);break}t&&ue&&Xr.alternate===null&&n(K,ue),k=f(Xr,k,pe),Le===null?te=Xr:Le.sibling=Xr,Le=Xr,ue=bn}if(He.done)return a(K,ue),be&&Za(K,pe),te;if(ue===null){for(;!He.done;pe++,He=it.next())He=St(K,He.value,_t),He!==null&&(k=f(He,k,pe),Le===null?te=He:Le.sibling=He,Le=He);return be&&Za(K,pe),te}for(ue=o(ue);!He.done;pe++,He=it.next())He=at(ue,K,pe,He.value,_t),He!==null&&(t&&(bn=He.alternate,bn!==null&&ue.delete(bn.key===null?pe:bn.key)),k=f(He,k,pe),Le===null?te=He:Le.sibling=He,Le=He);return t&&ue.forEach(function(RC){return n(K,RC)}),be&&Za(K,pe),te}function Se(K,k,it,_t){if(typeof it=="object"&&it!==null&&it.type===H&&it.key===null&&it.props.ref===void 0&&(it=it.props.children),typeof it=="object"&&it!==null){switch(it.$$typeof){case D:t:{for(var te=it.key;k!==null;){if(k.key===te){if(te=it.type,te===H){if(k.tag===7){a(K,k.sibling),_t=u(k,it.props.children),Tr(_t,it),_t.return=K,K=_t;break t}}else if(k.elementType===te||typeof te=="object"&&te!==null&&te.$$typeof===vt&&ys(te)===k.type){a(K,k.sibling),_t=u(k,it.props),Tr(_t,it),_t.return=K,K=_t;break t}a(K,k);break}else n(K,k);k=k.sibling}it.type===H?(_t=hs(it.props.children,K.mode,_t,it.key),Tr(_t,it),_t.return=K,K=_t):(_t=cu(it.type,it.key,it.props,null,K.mode,_t),Tr(_t,it),_t.return=K,K=_t)}return _(K);case C:t:{for(te=it.key;k!==null;){if(k.key===te)if(k.tag===4&&k.stateNode.containerInfo===it.containerInfo&&k.stateNode.implementation===it.implementation){a(K,k.sibling),_t=u(k,it.children||[]),_t.return=K,K=_t;break t}else{a(K,k);break}else n(K,k);k=k.sibling}_t=kd(it,K.mode,_t),_t.return=K,K=_t}return _(K);case vt:return it=ys(it),Se(K,k,it,_t)}if(Ct(it))return Wt(K,k,it,_t);if(rt(it)){if(te=rt(it),typeof te!="function")throw Error(r(150));return it=te.call(it),re(K,k,it,_t)}if(typeof it.then=="function")return Se(K,k,yu(it),_t);if(it.$$typeof===Q)return Se(K,k,mu(K,it),_t);Su(K,it)}return typeof it=="string"&&it!==""||typeof it=="number"||typeof it=="bigint"?(it=""+it,k!==null&&k.tag===6?(a(K,k.sibling),_t=u(k,it),_t.return=K,K=_t):(a(K,k),_t=Xd(it,K.mode,_t),_t.return=K,K=_t),_(K)):a(K,k)}return function(K,k,it,_t){try{Ol=0;var te=Se(K,k,it,_t);return So=null,te}catch(ue){if(ue===yo||ue===vu)throw ue;var Le=pi(29,ue,null,K.mode);return Le.lanes=_t,Le.return=K,Le}}}var xs=$v(!0),t_=$v(!1),br=!1;function tp(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ep(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ar(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Rr(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(Xe&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=lu(t),Iv(t,null,a),n}return ou(t,o,n,a),lu(t)}function zl(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,J(t,a)}}function np(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var _={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=_:f=f.next=_,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var ip=!1;function Pl(){if(ip){var t=_o;if(t!==null)throw t}}function Il(t,n,a,o){ip=!1;var u=t.updateQueue;br=!1;var f=u.firstBaseUpdate,_=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var O=b,j=O.next;O.next=null,_===null?f=j:_.next=j,_=O;var ot=t.alternate;ot!==null&&(ot=ot.updateQueue,b=ot.lastBaseUpdate,b!==_&&(b===null?ot.firstBaseUpdate=j:b.next=j,ot.lastBaseUpdate=O))}if(f!==null){var St=u.baseState;_=0,ot=j=O=null,b=f;do{var W=b.lane&-536870913,at=W!==b.lane;if(at?(Ne&W)===W:(o&W)===W){W!==0&&W===vs&&(ip=!0),ot!==null&&(ot=ot.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Wt=t,re=b;W=n;var Se=a;switch(re.tag){case 1:if(Wt=re.payload,typeof Wt=="function"){St=Wt.call(Se,St,W);break t}St=Wt;break t;case 3:Wt.flags=Wt.flags&-65537|128;case 0:if(Wt=re.payload,W=typeof Wt=="function"?Wt.call(Se,St,W):Wt,W==null)break t;St=P({},St,W);break t;case 2:br=!0}}W=b.callback,W!==null&&(t.flags|=64,at&&(t.flags|=8192),at=u.callbacks,at===null?u.callbacks=[W]:at.push(W))}else at={lane:W,tag:b.tag,payload:b.payload,callback:b.callback,next:null},ot===null?(j=ot=at,O=St):ot=ot.next=at,_|=W;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;at=b,b=at.next,at.next=null,u.lastBaseUpdate=at,u.shared.pending=null}}while(!0);ot===null&&(O=St),u.baseState=O,u.firstBaseUpdate=j,u.lastBaseUpdate=ot,f===null&&(u.shared.lanes=0),Or|=_,t.lanes=_,t.memoizedState=St}}function e_(t,n){if(typeof t!="function")throw Error(r(191,t));t.call(n)}function n_(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)e_(a[t],n)}var Cr=gt(null),xu=gt(0);function i_(t,n){t=er,Tt(xu,t),Tt(Cr,n),er=t|n.baseLanes}function ap(){Tt(xu,er),Tt(Cr,Cr.current)}function rp(){er=xu.current,pt(Cr),pt(xu)}var kn=gt(null),ti=null;function wr(t){var n=t.alternate;Tt(qn,qn.current&1),Tt(kn,t),ti===null&&(n===null||Cr.current!==null||n.memoizedState!==null)&&(ti=t)}function sp(t){Tt(qn,qn.current),Tt(kn,t),ti===null&&(ti=t)}function a_(t){t.tag===22?(Tt(qn,qn.current),Tt(kn,t),ti===null&&(ti=t)):Dr()}function Dr(){Tt(qn,qn.current),Tt(kn,kn.current)}function bi(t){pt(kn),ti===t&&(ti=null),pt(qn)}var qn=gt(0);function Bl(t,n){Tt(kn,kn.current),Tt(qn,n)}function op(t){pt(qn),pt(kn),ti===t&&(ti=null)}function Mu(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||wm(a)||Dm(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Qa=0,ye=null,Je=null,En=null,Eu=!1,xo=!1,Ms=!1,Tu=0,Fl=0,Mo=null,ZR=0;function gn(){throw Error(r(321))}function lp(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!Ti(t[a],n[a]))return!1;return!0}function cp(t,n,a,o,u,f){return Qa=f,ye=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Ut.H=t===null||t.memoizedState===null?V_:G_,Ms=!1,f=a(o,u),Ms=!1,xo&&(f=s_(n,a,o,u)),r_(t),f}function r_(t){Ut.H=Uu;var n=Je!==null&&Je.next!==null;if(Qa=0,En=Je=ye=null,Eu=!1,Fl=0,Mo=null,n)throw Error(r(300));t===null||Tn||(t=t.dependencies,t!==null&&pu(t)&&(Tn=!0))}function s_(t,n,a,o){ye=t;var u=0;do{if(xo&&(Mo=null),Fl=0,xo=!1,25<=u)throw Error(r(301));if(u+=1,En=Je=null,t.updateQueue!=null){var f=t.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}Ut.H=n2,f=n(a,o)}while(xo);return f}function KR(){var t=Ut.H,n=t.useState()[0];return n=typeof n.then=="function"?Hl(n):n,t=t.useState()[0],(Je!==null?Je.memoizedState:null)!==t&&(ye.flags|=1024),n}function up(){var t=Tu!==0;return Tu=0,t}function fp(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function hp(t){if(Eu){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}Eu=!1}Qa=0,En=Je=ye=null,xo=!1,Fl=Tu=0,Mo=null}function ri(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return En===null?ye.memoizedState=En=t:En=En.next=t,En}function yn(){if(Je===null){var t=ye.alternate;t=t!==null?t.memoizedState:null}else t=Je.next;var n=En===null?ye.memoizedState:En.next;if(n!==null)En=n,Je=t;else{if(t===null)throw ye.alternate===null?Error(r(467)):Error(r(310));Je=t,t={memoizedState:Je.memoizedState,baseState:Je.baseState,baseQueue:Je.baseQueue,queue:Je.queue,next:null},En===null?ye.memoizedState=En=t:En=En.next=t}return En}function bu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Hl(t){var n=Fl;return Fl+=1,Mo===null&&(Mo=[]),t=jv(Mo,t,n),n=ye,(En===null?n.memoizedState:En.next)===null&&(n=n.alternate,Ut.H=n===null||n.memoizedState===null?V_:G_),t}function Au(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Hl(t);if(t.$$typeof===lt)return;if(t.$$typeof===Q)return Xn(t)}throw Error(r(438,String(t)))}function dp(t){var n=null,a=ye.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ye.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=bu(),ye.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=ae;return n.index++,a}function Ja(t,n){return typeof n=="function"?n(t):n}function Ru(t){var n=yn();return pp(n,Je,t)}function pp(t,n,a){var o=t.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=a;var u=t.baseQueue,f=o.pending;if(f!==null){if(u!==null){var _=u.next;u.next=f.next,f.next=_}n.baseQueue=u=f,o.pending=null}if(f=t.baseState,u===null)t.memoizedState=f;else{n=u.next;var b=_=null,O=null,j=n,ot=!1;do{var St=j.lane&-536870913;if(St!==j.lane?(Ne&St)===St:(Qa&St)===St){var W=j.revertLane;if(W===0)O!==null&&(O=O.next={lane:0,revertLane:0,gesture:null,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null}),St===vs&&(ot=!0);else if((Qa&W)===W){j=j.next,W===vs&&(ot=!0);continue}else St={lane:0,revertLane:j.revertLane,gesture:null,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},O===null?(b=O=St,_=f):O=O.next=St,ye.lanes|=W,Or|=W;St=j.action,Ms&&a(f,St),f=j.hasEagerState?j.eagerState:a(f,St)}else W={lane:St,revertLane:j.revertLane,gesture:j.gesture,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},O===null?(b=O=W,_=f):O=O.next=W,ye.lanes|=St,Or|=St;j=j.next}while(j!==null&&j!==n);if(O===null?_=f:O.next=b,!Ti(f,t.memoizedState)&&(Tn=!0,ot&&(a=_o,a!==null)))throw a;t.memoizedState=f,t.baseState=_,t.baseQueue=O,o.lastRenderedState=f}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function mp(t){var n=yn(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var _=u=u.next;do f=t(f,_.action),_=_.next;while(_!==u);Ti(f,n.memoizedState)||(Tn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function o_(t,n,a){var o=ye,u=yn(),f=be;if(f){if(a===void 0)throw Error(r(407));a=a()}else a=n();var _=!Ti((Je||u).memoizedState,a);if(_&&(u.memoizedState=a,Tn=!0),u=u.queue,_p(u_.bind(null,o,u,t),[t]),t=u.getSnapshot!==n||_||En!==null&&(En.memoizedState.tag&1)!==0,Eo(t?9:8,{destroy:void 0},c_.bind(null,o,u,a,n),null),t){if(o.flags|=2048,$e===null)throw Error(r(349));f||(Qa&127)!==0||l_(o,n,a)}return a}function l_(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=ye.updateQueue,n===null?(n=bu(),ye.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function c_(t,n,a,o){n.value=a,n.getSnapshot=o,f_(n)&&h_(t)}function u_(t,n,a){return a(function(){f_(n)&&h_(t)})}function f_(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!Ti(t,a)}catch{return!0}}function h_(t){var n=fs(t,2);n!==null&&_i(n,t,2)}function gp(t){var n=ri();if(typeof t=="function"){var a=t;if(t=a(),Ms){cn(!0);try{a()}finally{cn(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ja,lastRenderedState:t},n}function d_(t,n,a,o){return t.baseState=a,pp(t,Je,typeof o=="function"?o:Ja)}function jR(t,n,a,o,u){if(Du(t))throw Error(r(485));if(t=n.action,t!==null){var f={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(_){f.listeners.push(_)}};Ut.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,p_(n,f)):(f.next=a.next,n.pending=a.next=f)}}function p_(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var f=Ut.T,_={};_.types=f!==null?f.types:null,Ut.T=_;try{var b=a(u,o),O=Ut.S;O!==null&&O(_,b),m_(t,n,b)}catch(j){vp(t,n,j)}finally{f!==null&&_.types!==null&&(f.types=_.types),Ut.T=f}}else try{f=a(u,o),m_(t,n,f)}catch(j){vp(t,n,j)}}function m_(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){g_(t,n,o)},function(o){return vp(t,n,o)}):g_(t,n,a)}function g_(t,n,a){n.status="fulfilled",n.value=a,v_(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,p_(t,a)))}function vp(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,v_(n),n=n.next;while(n!==o)}t.action=null}function v_(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function __(t,n){return n}function y_(t,n){if(be){var a=$e.formState;if(a!==null){t:{var o=ye;if(be){if(en){e:{for(var u=en,f=Vi;u.nodeType!==8;){if(!f){u=null;break e}if(u=Xi(u.nextSibling),u===null){u=null;break e}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){en=Xi(u.nextSibling),o=u.data==="F!";break t}}Mr(o)}o=!1}o&&(n=a[0])}}return a=ri(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:__,lastRenderedState:n},a.queue=o,a=B_.bind(null,ye,o),o.dispatch=a,o=gp(!1),f=Ep.bind(null,ye,!1,o.queue),o=ri(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=jR.bind(null,ye,u,f,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function S_(t){var n=yn();return x_(n,Je,t)}function x_(t,n,a){if(n=pp(t,n,__)[0],t=Ru(Ja)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Hl(n)}catch(_){throw _===yo?vu:_}else o=n;n=yn();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(ye.flags|=2048,Eo(9,{destroy:void 0},QR.bind(null,u,a),null)),[o,f,t]}function QR(t,n){t.action=n}function M_(t){var n=yn(),a=Je;if(a!==null)return x_(n,a,t);yn(),n=n.memoizedState,a=yn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function Eo(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=ye.updateQueue,n===null&&(n=bu(),ye.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function E_(){return yn().memoizedState}function Cu(t,n,a,o){var u=ri();ye.flags|=t,u.memoizedState=Eo(1|n,{destroy:void 0},a,o===void 0?null:o)}function wu(t,n,a,o){var u=yn();o=o===void 0?null:o;var f=u.memoizedState.inst;Je!==null&&o!==null&&lp(o,Je.memoizedState.deps)?u.memoizedState=Eo(n,f,a,o):(ye.flags|=t,u.memoizedState=Eo(1|n,f,a,o))}function T_(t,n){Cu(8390656,8,t,n)}function _p(t,n){wu(2048,8,t,n)}function JR(t){ye.flags|=4;var n=ye.updateQueue;if(n===null)n=bu(),ye.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function b_(t){var n=yn().memoizedState;return JR({ref:n,nextImpl:t}),function(){if((Xe&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function A_(t,n){return wu(4,2,t,n)}function R_(t,n){return wu(4,4,t,n)}function C_(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function w_(t,n,a){a=a!=null?a.concat([t]):null,wu(4,4,C_.bind(null,n,t),a)}function yp(){}function D_(t,n){var a=yn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&lp(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function U_(t,n){var a=yn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&lp(n,o[1]))return o[0];if(o=t(),Ms){cn(!0);try{t()}finally{cn(!1)}}return a.memoizedState=[o,n],o}function Sp(t,n,a){return a===void 0||(Qa&1073741824)!==0&&(Ne&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=Vy(),ye.lanes|=t,Or|=t,a)}function N_(t,n,a,o){return Ti(a,n)?a:Cr.current!==null?(t=Sp(t,a,o),Ti(t,n)||(Tn=!0),t):(Qa&106)===0||(Qa&1073741824)!==0&&(Ne&261930)===0?(Tn=!0,t.memoizedState=a):(t=Vy(),ye.lanes|=t,Or|=t,n)}function L_(t,n,a,o,u){var f=Ht.p;Ht.p=f!==0&&8>f?f:8;var _=Ut.T,b={};b.types=_!==null?_.types:null,Ut.T=b,Ep(t,!1,n,a);try{var O=u(),j=Ut.S;if(j!==null&&j(b,O),O!==null&&typeof O=="object"&&typeof O.then=="function"){var ot=WR(O,o);Vl(t,n,ot,wi(t))}else Vl(t,n,o,wi(t))}catch(St){Vl(t,n,{then:function(){},status:"rejected",reason:St},wi())}finally{Ht.p=f,_!==null&&b.types!==null&&(_.types=b.types),Ut.T=_}}function $R(){}function xp(t,n,a,o){if(t.tag!==5)throw Error(r(476));var u=O_(t).queue;L_(t,u,n,z,a===null?$R:function(){return z_(t),a(o)})}function O_(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:z,baseState:z,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ja,lastRenderedState:z},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ja,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function z_(t){var n=O_(t);n.next===null&&(n=t.alternate.memoizedState),Vl(t,n.next.queue,{},wi())}function Mp(){return Xn(Go)}function P_(){return yn().memoizedState}function I_(){return yn().memoizedState}function t2(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=wi();t=Ar(a);var o=Rr(n,t,a);o!==null&&(_i(o,n,a),zl(o,n,a)),n={cache:jd()},t.payload=n;return}n=n.return}}function e2(t,n,a){var o=wi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Du(t)?F_(n,a):(a=Vd(t,n,a,o),a!==null&&(_i(a,t,o),H_(a,n,o)))}function B_(t,n,a){var o=wi();Vl(t,n,a,o)}function Vl(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Du(t))F_(n,u);else{var f=t.alternate;if(t.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var _=n.lastRenderedState,b=f(_,a);if(u.hasEagerState=!0,u.eagerState=b,Ti(b,_))return ou(t,n,u,0),$e===null&&su(),!1}catch{}if(a=Vd(t,n,u,o),a!==null)return _i(a,t,o),H_(a,n,o),!0}return!1}function Ep(t,n,a,o){if(o={lane:2,revertLane:dm(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Du(t)){if(n)throw Error(r(479))}else n=Vd(t,a,o,2),n!==null&&_i(n,t,2)}function Du(t){var n=t.alternate;return t===ye||n!==null&&n===ye}function F_(t,n){xo=Eu=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function H_(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,J(t,a)}}var Uu={readContext:Xn,use:Au,useCallback:gn,useContext:gn,useEffect:gn,useImperativeHandle:gn,useLayoutEffect:gn,useInsertionEffect:gn,useMemo:gn,useReducer:gn,useRef:gn,useState:gn,useDebugValue:gn,useDeferredValue:gn,useTransition:gn,useSyncExternalStore:gn,useId:gn,useHostTransitionStatus:gn,useFormState:gn,useActionState:gn,useOptimistic:gn,useMemoCache:gn,useCacheRefresh:gn,useEffectEvent:gn},V_={readContext:Xn,use:Au,useCallback:function(t,n){return ri().memoizedState=[t,n===void 0?null:n],t},useContext:Xn,useEffect:T_,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Cu(4194308,4,C_.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Cu(4194308,4,t,n)},useInsertionEffect:function(t,n){Cu(4,2,t,n)},useMemo:function(t,n){var a=ri();n=n===void 0?null:n;var o=t();if(Ms){cn(!0);try{t()}finally{cn(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=ri();if(a!==void 0){var u=a(n);if(Ms){cn(!0);try{a(n)}finally{cn(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=e2.bind(null,ye,t),[o.memoizedState,t]},useRef:function(t){var n=ri();return t={current:t},n.memoizedState=t},useState:function(t){t=gp(t);var n=t.queue,a=B_.bind(null,ye,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:yp,useDeferredValue:function(t,n){var a=ri();return Sp(a,t,n)},useTransition:function(){var t=gp(!1);return t=L_.bind(null,ye,t.queue,!0,!1),ri().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=ye,u=ri();if(be){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),$e===null)throw Error(r(349));(Ne&127)!==0||l_(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,T_(u_.bind(null,o,f,t),[t]),o.flags|=2048,Eo(9,{destroy:void 0},c_.bind(null,o,f,a,n),null),a},useId:function(){var t=ri(),n=$e.identifierPrefix;if(be){var a=_a,o=va;a=(o&~(1<<32-an(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Tu++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=ZR++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Mp,useFormState:y_,useActionState:y_,useOptimistic:function(t){var n=ri();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Ep.bind(null,ye,!0,a),a.dispatch=n,[t,n]},useMemoCache:dp,useCacheRefresh:function(){return ri().memoizedState=t2.bind(null,ye)},useEffectEvent:function(t){var n=ri(),a={impl:t};return n.memoizedState=a,function(){if((Xe&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},G_={readContext:Xn,use:Au,useCallback:D_,useContext:Xn,useEffect:_p,useImperativeHandle:w_,useInsertionEffect:A_,useLayoutEffect:R_,useMemo:U_,useReducer:Ru,useRef:E_,useState:function(){return Ru(Ja)},useDebugValue:yp,useDeferredValue:function(t,n){var a=yn();return N_(a,Je.memoizedState,t,n)},useTransition:function(){var t=Ru(Ja)[0],n=yn().memoizedState;return[typeof t=="boolean"?t:Hl(t),n]},useSyncExternalStore:o_,useId:P_,useHostTransitionStatus:Mp,useFormState:S_,useActionState:S_,useOptimistic:function(t,n){var a=yn();return d_(a,Je,t,n)},useMemoCache:dp,useCacheRefresh:I_,useEffectEvent:b_},n2={readContext:Xn,use:Au,useCallback:D_,useContext:Xn,useEffect:_p,useImperativeHandle:w_,useInsertionEffect:A_,useLayoutEffect:R_,useMemo:U_,useReducer:mp,useRef:E_,useState:function(){return mp(Ja)},useDebugValue:yp,useDeferredValue:function(t,n){var a=yn();return Je===null?Sp(a,t,n):N_(a,Je.memoizedState,t,n)},useTransition:function(){var t=mp(Ja)[0],n=yn().memoizedState;return[typeof t=="boolean"?t:Hl(t),n]},useSyncExternalStore:o_,useId:P_,useHostTransitionStatus:Mp,useFormState:M_,useActionState:M_,useOptimistic:function(t,n){var a=yn();return Je!==null?d_(a,Je,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:dp,useCacheRefresh:I_,useEffectEvent:b_};function Tp(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:P({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var bp={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=wi(),u=Ar(o);u.payload=n,a!=null&&(u.callback=a),n=Rr(t,u,o),n!==null&&(_i(n,t,o),zl(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=wi(),u=Ar(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Rr(t,u,o),n!==null&&(_i(n,t,o),zl(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=wi(),o=Ar(a);o.tag=2,n!=null&&(o.callback=n),n=Rr(t,o,a),n!==null&&(_i(n,t,a),zl(n,t,a))}};function X_(t,n,a,o,u,f,_){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,f,_):n.prototype&&n.prototype.isPureReactComponent?!Rl(a,o)||!Rl(u,f):!0}function k_(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&bp.enqueueReplaceState(n,n.state,null)}function Es(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=P({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function q_(t){ru(t)}function Y_(t){console.error(t)}function W_(t){ru(t)}function Nu(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Z_(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Ap(t,n,a){return a=Ar(a),a.tag=3,a.payload={element:null},a.callback=function(){Nu(t,n)},a}function K_(t){return t=Ar(t),t.tag=3,t}function j_(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;t.payload=function(){return u(f)},t.callback=function(){Z_(n,a,o)}}var _=a.stateNode;_!==null&&typeof _.componentDidCatch=="function"&&(t.callback=function(){Z_(n,a,o),typeof u!="function"&&(zr===null?zr=new Set([this]):zr.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function i2(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&ms(n,a,u,!0),a=kn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return ti===null?$u():a.alternate===null&&vn===0&&(vn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===_u?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),um(t,o,u)),!1;case 22:return a.flags|=65536,o===_u?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),um(t,o,u)),!1}throw Error(r(435,a.tag))}return um(t,o,u),$u(),!1}if(be)return n=kn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Yd&&(t=Error(r(422),{cause:o}),Dl(Bi(t,a)))):(o!==Yd&&(n=Error(r(423),{cause:o}),Dl(Bi(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=Bi(o,a),u=Ap(t.stateNode,o,u),np(t,u),vn!==4&&(vn=2)),!1;var f=Error(r(520),{cause:o});if(f=Bi(f,a),Kl===null?Kl=[f]:Kl.push(f),vn!==4&&(vn=2),n===null)return!0;o=Bi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=Ap(a.stateNode,o,t),np(a,t),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(zr===null||!zr.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=K_(u),j_(u,t,a,o),np(a,u),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var Rp=Error(r(461)),Tn=!1;function Dn(t,n,a,o){n.child=t===null?t_(n,null,a,o):xs(n,t.child,a,o)}function Q_(t,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var _={};for(var b in o)b!=="ref"&&(_[b]=o[b])}else _=o;return gs(n),o=cp(t,n,a,_,f,u),b=up(),t!==null&&!Tn?(fp(t,n,u),$a(t,n,u)):(be&&b&&fu(n),n.flags|=1,Dn(t,n,o,u),n.child)}function J_(t,n,a,o,u){if(t===null){var f=a.type;return typeof f=="function"&&!Gd(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,$_(t,n,f,o,u)):(t=cu(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(f=t.child,!zp(t,u)){var _=f.memoizedProps;if(a=a.compare,a=a!==null?a:Rl,a(_,o)&&t.ref===n.ref)return $a(t,n,u)}return n.flags|=1,t=Wa(f,o),t.ref=n.ref,t.return=n,n.child=t}function $_(t,n,a,o,u){if(t!==null){var f=t.memoizedProps;if(Rl(f,o)&&t.ref===n.ref)if(Tn=!1,n.pendingProps=o=f,zp(t,u))(t.flags&131072)!==0&&(Tn=!0);else return n.lanes=t.lanes,$a(t,n,u)}return Cp(t,n,a,o,u)}function ty(t,n,a,o){var u=o.children,f=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return ey(t,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&gu(n,f!==null?f.cachePool:null),f!==null?i_(n,f):ap(),a_(n);else return o=n.lanes=536870912,ey(t,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(gu(n,f.cachePool),i_(n,f),Dr(),n.memoizedState=null):(t!==null&&gu(n,null),ap(),Dr());return Dn(t,n,u,a),n.child}function Gl(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function ey(t,n,a,o,u){var f=Jd();return f=f===null?null:{parent:Mn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},t!==null&&gu(n,null),ap(),a_(n),t!==null&&ms(t,n,o,!0),n.childLanes=u,null}function Lu(t,n){return n=Ou({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function ny(t,n,a){return xs(n,t.child,null,a),t=Lu(n,n.pendingProps),t.flags|=2,bi(n),n.memoizedState=null,t}function a2(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(be){if(o.mode==="hidden")return t=Lu(n,o),n.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Gl(null,t);if(sp(n),(t=en)?(t=CS(t,Vi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Sr!==null?{id:va,overflow:_a}:null,retryLane:536870912,hydrationErrors:null},a=Fv(t),a.return=n,n.child=a,zn=n,en=null)):t=null,t===null)throw Mr(n);return n.lanes=536870912,null}return Lu(n,o)}var f=t.memoizedState;if(f!==null){var _=f.dehydrated;if(sp(n),u)if(n.flags&256)n.flags&=-257,n=ny(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(r(558));else if(Tn||ms(t,n,a,!1),u=(a&t.childLanes)!==0,Tn||u){if(Cr.current===null){if(o=$e,o!==null&&(_=ct(o,a),_!==0&&_!==f.retryLane))throw f.retryLane=_,fs(t,_),_i(o,t,_),Rp;$u()}n=ny(t,n,a)}else t=f.treeContext,en=Xi(_.nextSibling),zn=n,be=!0,xr=null,Vi=!1,t!==null&&Gv(n,t),n=Lu(n,o),n.flags|=134221824;return n}return t=Wa(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function To(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Cp(t,n,a,o,u){return gs(n),a=cp(t,n,a,o,void 0,u),o=up(),t!==null&&!Tn?(fp(t,n,u),$a(t,n,u)):(be&&o&&fu(n),n.flags|=1,Dn(t,n,a,u),n.child)}function iy(t,n,a,o,u,f){return gs(n),n.updateQueue=null,a=s_(n,o,a,u),r_(t),o=up(),t!==null&&!Tn?(fp(t,n,f),$a(t,n,f)):(be&&o&&fu(n),n.flags|=1,Dn(t,n,a,f),n.child)}function ay(t,n,a,o,u){if(gs(n),n.stateNode===null){var f=po,_=a.contextType;typeof _=="object"&&_!==null&&(f=Xn(_)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=bp,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},tp(n),_=a.contextType,f.context=typeof _=="object"&&_!==null?Xn(_):po,f.state=n.memoizedState,_=a.getDerivedStateFromProps,typeof _=="function"&&(Tp(n,a,_,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(_=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),_!==f.state&&bp.enqueueReplaceState(f,f.state,null),Il(n,o,f,u),Pl(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){f=n.stateNode;var b=n.memoizedProps,O=Es(a,b);f.props=O;var j=f.context,ot=a.contextType;_=po,typeof ot=="object"&&ot!==null&&(_=Xn(ot));var St=a.getDerivedStateFromProps;ot=typeof St=="function"||typeof f.getSnapshotBeforeUpdate=="function",b=n.pendingProps!==b,ot||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(b||j!==_)&&k_(n,f,o,_),br=!1;var W=n.memoizedState;f.state=W,Il(n,o,f,u),Pl(),j=n.memoizedState,b||W!==j||br?(typeof St=="function"&&(Tp(n,a,St,o),j=n.memoizedState),(O=br||X_(n,a,O,o,W,j,_))?(ot||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=j),f.props=o,f.state=j,f.context=_,o=O):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,ep(t,n),_=n.memoizedProps,ot=Es(a,_),f.props=ot,St=n.pendingProps,W=f.context,j=a.contextType,O=po,typeof j=="object"&&j!==null&&(O=Xn(j)),b=a.getDerivedStateFromProps,(j=typeof b=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(_!==St||W!==O)&&k_(n,f,o,O),br=!1,W=n.memoizedState,f.state=W,Il(n,o,f,u),Pl();var at=n.memoizedState;_!==St||W!==at||br||t!==null&&t.dependencies!==null&&pu(t.dependencies)?(typeof b=="function"&&(Tp(n,a,b,o),at=n.memoizedState),(ot=br||X_(n,a,ot,o,W,at,O)||t!==null&&t.dependencies!==null&&pu(t.dependencies))?(j||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,at,O),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,at,O)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||_===t.memoizedProps&&W===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&W===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=at),f.props=o,f.state=at,f.context=O,o=ot):(typeof f.componentDidUpdate!="function"||_===t.memoizedProps&&W===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&W===t.memoizedState||(n.flags|=1024),o=!1)}return f=o,To(t,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,t!==null&&o?(n.child=xs(n,t.child,null,u),n.child=xs(n,null,a,u)):Dn(t,n,a,u),n.memoizedState=f.state,t=n.child):t=$a(t,n,u),t}function ry(t,n,a,o){return ds(),n.flags|=256,Dn(t,n,a,o),n.child}var wp={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Dp(t){return{baseLanes:t,cachePool:Zv()}}function Up(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=Ci),t}function sy(t,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,_;if((_=f)||(_=t!==null&&t.memoizedState===null?!1:(qn.current&2)!==0),_&&(u=!0,n.flags&=-129),_=(n.flags&32)!==0,n.flags&=-33,t===null){if(be){if(u?wr(n):Dr(),(t=en)?(t=CS(t,Vi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Sr!==null?{id:va,overflow:_a}:null,retryLane:536870912,hydrationErrors:null},a=Fv(t),a.return=n,n.child=a,zn=n,en=null)):t=null,t===null)throw Mr(n);return Dm(t)?n.lanes=32:n.lanes=536870912,null}return f=o.children,o=o.fallback,u?(Dr(),u=n.mode,f=Ou({mode:"hidden",children:f},u),o=hs(o,u,a,null),f.return=n,o.return=n,f.sibling=o,n.child=f,o=n.child,o.memoizedState=Dp(a),o.childLanes=Up(t,_,a),n.memoizedState=wp,Gl(null,o)):(wr(n),Np(n,f))}var b=t.memoizedState;if(b!==null){var O=b.dehydrated;if(O!==null)return r2(t,n,f,_,o,O,b,a)}return u?(Dr(),u=o.fallback,f=n.mode,b=t.child,O=b.sibling,o=Wa(b,{mode:"hidden",children:o.children}),o.subtreeFlags=b.subtreeFlags&1206910976,O!==null?u=Wa(O,u):(u=hs(u,f,a,null),u.flags|=2),u.return=n,o.return=n,o.sibling=u,n.child=o,Gl(null,o),o=n.child,u=t.child.memoizedState,u===null?u=Dp(a):(f=u.cachePool,f!==null?(b=Mn._currentValue,f=f.parent!==b?{parent:b,pool:b}:f):f=Zv(),u={baseLanes:u.baseLanes|a,cachePool:f}),o.memoizedState=u,o.childLanes=Up(t,_,a),n.memoizedState=wp,Gl(t.child,o)):(wr(n),a=t.child,t=a.sibling,a=Wa(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(_=n.deletions,_===null?(n.deletions=[t],n.flags|=16):_.push(t)),n.child=a,n.memoizedState=null,a)}function Np(t,n){return n=Ou({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Ou(t,n){return t=pi(22,t,null,n),t.lanes=0,t}function zu(t,n,a){return xs(n,t.child,null,a),t=Np(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function r2(t,n,a,o,u,f,_,b){if(a)return n.flags&256?(wr(n),n.flags&=-257,zu(t,n,b)):n.memoizedState!==null?(Dr(),n.child=t.child,n.flags|=128,null):(Dr(),f=u.fallback,_=n.mode,u=Ou({mode:"visible",children:u.children},_),f=hs(f,_,b,null),f.flags|=2,u.return=n,f.return=n,u.sibling=f,n.child=u,xs(n,t.child,null,b),u=n.child,u.memoizedState=Dp(b),u.childLanes=Up(t,o,b),n.memoizedState=wp,Gl(null,u));if(wr(n),Dm(f)){if(o=f.nextSibling&&f.nextSibling.dataset,o)var O=o.dgst;return o=O,o!==""&&(u=Error(r(419)),u.stack="",u.digest=o,Dl({value:u,source:null,stack:null})),zu(t,n,b)}if(Tn||ms(t,n,b,!1),o=(b&t.childLanes)!==0,Tn||o){if(Cr.current!==null)return zu(t,n,b);if(o=$e,o!==null&&(u=ct(o,b),u!==0&&u!==_.retryLane))throw _.retryLane=u,fs(t,u),_i(o,t,u),Rp;return wm(f)||$u(),zu(t,n,b)}return wm(f)?(n.flags|=192,n.child=t.child,null):(t=_.treeContext,en=Xi(f.nextSibling),zn=n,be=!0,xr=null,Vi=!1,t!==null&&Gv(n,t),n=Np(n,u.children),n.flags|=134221824,n)}function oy(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),du(t.return,n,a)}function ly(t){for(var n=null;t!==null;){var a=t.alternate;a!==null&&Mu(a)===null&&(n=t),t=t.sibling}return n}function Pu(t,n,a,o,u,f){var _=t.memoizedState;_===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(_.isBackwards=n,_.rendering=null,_.renderingStartTime=0,_.last=o,_.tail=a,_.tailMode=u,_.treeForkCount=f)}function Lp(t){var n=t.child;for(t.child=null;n!==null;){var a=n.sibling;n.sibling=t.child,t.child=n,n=a}}function Op(t,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var _=qn.current;if(n.flags&128)return Bl(n,_),null;var b=(_&2)!==0;if(b?(_=_&1|2,n.flags|=128):_&=1,Bl(n,_),u==="backwards"&&t!==null?(Lp(t),Dn(t,n,o,a),Lp(t)):Dn(t,n,o,a),o=be?wl:0,!b&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&oy(t,a,n);else if(t.tag===19)oy(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"backwards":a=ly(n.child),a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null,Lp(n)),Pu(n,!0,u,null,f,o);break;case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&Mu(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}Pu(n,!0,a,null,f,o);break;case"together":Pu(n,!1,null,null,void 0,o);break;case"independent":n.memoizedState=null;break;default:a=ly(n.child),a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Pu(n,!1,u,a,f,o)}return n.child}function cy(t,n,a){var o=n.pendingProps;return Er(n,n.type,o.value),Dn(t,n,o.children,a),n.child}function $a(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),Or|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(ms(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(r(153));if(n.child!==null){for(t=n.child,a=Wa(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=Wa(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function zp(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&pu(t)))}function s2(t,n,a){switch(n.tag){case 3:U(n,n.stateNode.containerInfo),Er(n,Mn,t.memoizedState.cache),ds();break;case 27:case 5:et(n);break;case 4:U(n,n.stateNode.containerInfo);break;case 10:Er(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,sp(n),null;break;case 13:var o=n.memoizedState;if(o!==null){if(o.dehydrated!==null)return wr(n),n.flags|=128,null;o=ms(t,n,a,!1);var u=n.child.childLanes;return o||(a&u)!==0?sy(t,n,a):(wr(n),t=$a(t,n,a),t!==null?t.sibling:null)}wr(n);break;case 19:if(n.flags&128)return Op(t,n,a);if(u=(t.flags&128)!==0,o=(a&n.childLanes)!==0,o||(ms(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return Op(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Bl(n,qn.current),o)break;return null;case 22:return n.lanes=0,ty(t,n,a,n.pendingProps);case 24:Er(n,Mn,t.memoizedState.cache)}return $a(t,n,a)}function uy(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)Tn=!0;else{if(!zp(t,a)&&(n.flags&128)===0)return Tn=!1,s2(t,n,a);Tn=(t.flags&131072)!==0}else Tn=!1,be&&(n.flags&1048576)!==0&&Vv(n,wl,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(t=ys(n.elementType),n.type=t,typeof t=="function")Gd(t)?(o=Es(t,o),n.tag=1,n=ay(null,n,t,o,a)):(n.tag=0,n=Cp(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===F){n.tag=11,n=Q_(null,n,t,o,a);break t}else if(u===xt){n.tag=14,n=J_(null,n,t,o,a);break t}else if(u===Q){n.tag=10,n.type=t,n=cy(null,n,a);break t}}throw n=Dt(t)||t,Error(r(306,n,""))}}return n;case 0:return Cp(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Es(o,n.pendingProps),ay(t,n,o,u,a);case 3:t:{if(U(n,n.stateNode.containerInfo),t===null)throw Error(r(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,ep(t,n),Il(n,o,null,a);var _=n.memoizedState;if(o=_.cache,Er(n,Mn,o),o!==f.cache&&Kd(n,[Mn],a,!0),Pl(),o=_.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:_.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=ry(t,n,o,a);break t}else if(o!==u){u=Bi(Error(r(424)),n),Dl(u),n=ry(t,n,o,a);break t}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,en=Xi(t.firstChild),zn=n,be=!0,xr=null,Vi=!0,a=t_(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling;else{if(ds(),o===u){n=$a(t,n,a);break t}Dn(t,n,o,a)}n=n.child}return n;case 26:return To(t,n),t===null?(a=zS(n.type,null,n.pendingProps,null))?n.memoizedState=a:be||(n.stateNode=pS(n.type,n.pendingProps,fe.current,n)):n.memoizedState=zS(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return et(n),t===null&&be&&(o=n.stateNode=US(n.type,n.pendingProps,fe.current),zn=n,Vi=!0,u=en,Br(n.type)?(Um=u,en=Xi(o.firstChild)):en=u),Dn(t,n,n.pendingProps.children,a),To(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&be&&((u=o=en)&&(o=tC(o,n.type,n.pendingProps,Vi),o!==null?(n.stateNode=o,zn=n,en=Xi(o.firstChild),Vi=!1,u=!0):u=!1),u||Mr(n)),et(n),u=n.type,f=n.pendingProps,_=t!==null?t.memoizedProps:null,o=f.children,Mm(u,f)?o=null:_!==null&&Mm(u,_)&&(n.flags|=32),n.memoizedState!==null&&(u=cp(t,n,KR,null,null,a),Go._currentValue=u),To(t,n),Dn(t,n,o,a),n.child;case 6:return t===null&&be&&((t=a=en)&&(a=eC(a,n.pendingProps,Vi),a!==null?(n.stateNode=a,zn=n,en=null,t=!0):t=!1),t||Mr(n)),null;case 13:return sy(t,n,a);case 4:return U(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=xs(n,null,o,a):Dn(t,n,o,a),n.child;case 11:return Q_(t,n,n.type,n.pendingProps,a);case 7:return o=n.pendingProps,To(t,n),Dn(t,n,o,a),n.child;case 8:return Dn(t,n,n.pendingProps.children,a),n.child;case 12:return Dn(t,n,n.pendingProps.children,a),n.child;case 10:return cy(t,n,a);case 9:return u=n.type._context,o=n.pendingProps.children,gs(n),u=Xn(u),o=o(u),n.flags|=1,Dn(t,n,o,a),n.child;case 14:return J_(t,n,n.type,n.pendingProps,a);case 15:return $_(t,n,n.type,n.pendingProps,a);case 19:return Op(t,n,a);case 31:return a2(t,n,a);case 22:return ty(t,n,a,n.pendingProps);case 24:return gs(n),o=Xn(Mn),t===null?(u=Jd(),u===null&&(u=$e,f=jd(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},tp(n),Er(n,Mn,u)):((t.lanes&a)!==0&&(ep(t,n),Il(n,null,null,a),Pl()),u=t.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Er(n,Mn,o)):(o=f.cache,Er(n,Mn,o),o!==u.cache&&Kd(n,[Mn],a,!0))),Dn(t,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),o=n.pendingProps,o.name!=null&&o.name!=="auto"?n.flags|=t===null?18882560:18874368:be&&fu(n),t!==null&&t.memoizedProps.name!==o.name?n.flags|=4194816:To(t,n),Dn(t,n,o.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function tr(t){t.flags|=4}function Pp(t,n,a,o,u){var f;if((f=(t.mode&32)!==0)&&(f=a===null?FS(n,o):FS(n,o)&&(o.src!==a.src||o.srcSet!==a.srcSet)),f){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(qy())t.flags|=8192;else throw Ss=_u,$d}else t.flags&=-16777217}function fy(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!HS(n))if(qy())t.flags|=8192;else throw Ss=_u,$d}function Iu(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?rs():536870912,t.lanes|=n,wo|=n)}function Xl(t,n){if(!be)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null;break;default:for(n=t.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null}}function nn(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&1206910976,o|=u.flags&1206910976,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function o2(t,n,a){var o=n.pendingProps;switch(qd(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return nn(n),null;case 1:return nn(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),ja(Mn),T(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(vo(n)?tr(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Wd())),nn(n),null;case 26:var u=n.type,f=n.memoizedState;return t===null?(tr(n),f!==null?(nn(n),fy(n,f)):(nn(n),Pp(n,u,null,o,a))):f?f!==t.memoizedState?(tr(n),nn(n),fy(n,f)):(nn(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&tr(n),nn(n),Pp(n,u,t,o,a)),null;case 27:if(dt(n),a=fe.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&tr(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return nn(n),n.subtreeFlags&=-33554433,null}t=At.current,vo(n)?Xv(n):(t=US(u,o,a),n.stateNode=t,tr(n))}return nn(n),n.subtreeFlags&=-33554433,null;case 5:if(dt(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&tr(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return nn(n),n.subtreeFlags&=-33554433,null}if(f=At.current,vo(n))Xv(n);else{var _=tc(fe.current);switch(f){case 1:f=_.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=_.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=_.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=_.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=_.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?_.createElement("select",{is:o.is}):_.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?_.createElement(u,{is:o.is}):_.createElement(u)}}f[Gt]=n,f[Jt]=o;t:for(_=n.child;_!==null;){if(_.tag===5||_.tag===6)f.appendChild(_.stateNode);else if(_.tag!==4&&_.tag!==27&&_.child!==null){_.child.return=_,_=_.child;continue}if(_===n)break t;for(;_.sibling===null;){if(_.return===null||_.return===n)break t;_=_.return}_.sibling.return=_.return,_=_.sibling}n.stateNode=f;t:switch(Wn(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&tr(n)}}return nn(n),n.subtreeFlags&=-33554433,Pp(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&tr(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(t=fe.current,vo(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=zn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[Gt]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||uS(t.nodeValue,a)),t||Mr(n,!0)}else t=tc(t).createTextNode(o),t[Gt]=n,n.stateNode=t}return nn(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=vo(n),a!==null){if(t===null){if(!o)throw Error(r(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[Gt]=n}else ds(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;nn(n),t=!1}else a=Wd(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(bi(n),n):(bi(n),null);if((n.flags&128)!==0)throw Error(r(558))}return nn(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=vo(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(r(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(r(317));u[Gt]=n}else ds(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;nn(n),u=!1}else u=Wd(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(bi(n),n):(bi(n),null)}return bi(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Iu(n,n.updateQueue),nn(n),null);case 4:return T(),t===null&&vm(n.stateNode.containerInfo),n.flags|=67108864,nn(n),null;case 10:return ja(n.type),nn(n),null;case 19:if(op(n),o=n.memoizedState,o===null)return nn(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)Xl(o,!1);else{if(vn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(f=Mu(t),f!==null){for(n.flags|=128,Xl(o,!1),t=f.updateQueue,n.updateQueue=t,Iu(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Bv(a,t),a=a.sibling;return Bl(n,qn.current&1|2),be&&Za(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&X()>Ku&&(n.flags|=128,u=!0,Xl(o,!1),n.lanes=4194304)}else{if(!u)if(t=Mu(f),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Iu(n,t),Xl(o,!0),o.tail===null&&o.tailMode!=="collapsed"&&o.tailMode!=="visible"&&!f.alternate&&!be)return nn(n),null}else 2*X()-o.renderingStartTime>Ku&&a!==536870912&&(n.flags|=128,u=!0,Xl(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(t=o.last,t!==null?t.sibling=f:n.child=f,o.last=f)}if(o.tail!==null){t=o.tail;t:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break t}a=a.sibling}a=!0}return o.rendering=t,o.tail=t.sibling,o.renderingStartTime=X(),t.sibling=null,f=qn.current,f=u?f&1|2:f&1,o.tailMode==="visible"||o.tailMode==="collapsed"||!a||be?Bl(n,f):(a=f,Tt(kn,n),Tt(qn,a),ti===null&&(ti=n)),be&&Za(n,o.treeForkCount),t}return nn(n),null;case 22:case 23:return bi(n),rp(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(nn(n),n.subtreeFlags&6&&(n.flags|=8192)):nn(n),a=n.updateQueue,a!==null&&Iu(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&pt(_s),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ja(Mn),nn(n),null;case 25:return null;case 30:return n.flags|=33554432,nn(n),null}throw Error(r(156,n.tag))}function l2(t,n){switch(qd(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return ja(Mn),T(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return dt(n),null;case 31:if(n.memoizedState!==null){if(bi(n),n.alternate===null)throw Error(r(340));ds()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(bi(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(r(340));ds()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return op(n),t=n.flags,t&65536?(n.flags=t&-65537|128,t=n.memoizedState,t!==null&&(t.rendering=null,t.tail=null),n.flags|=4,n):null;case 4:return T(),null;case 10:return ja(n.type),null;case 22:case 23:return bi(n),rp(),t!==null&&pt(_s),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return ja(Mn),null;case 25:return null;default:return null}}function hy(t,n){switch(qd(n),n.tag){case 3:ja(Mn),T();break;case 26:case 27:case 5:dt(n);break;case 4:T();break;case 31:n.memoizedState!==null&&bi(n);break;case 13:bi(n);break;case 19:op(n);break;case 10:ja(n.type);break;case 22:case 23:bi(n),rp(),t!==null&&pt(_s);break;case 24:ja(Mn)}}function kl(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var f=a.create,_=a.inst;o=f(),_.destroy=o}a=a.next}while(a!==u)}}catch(b){Ze(n,n.return,b)}}function Ur(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&t)===t){var _=o.inst,b=_.destroy;if(b!==void 0){_.destroy=void 0,u=n;var O=a,j=b;try{j()}catch(ot){Ze(u,O,ot)}}}o=o.next}while(o!==f)}}catch(ot){Ze(n,n.return,ot)}}function dy(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{n_(n,a)}catch(o){Ze(t,t.return,o)}}}function py(t,n,a){a.props=Es(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){Ze(t,n,o)}}function ya(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:var u=t.stateNode,f=qa(t.memoizedProps,u);(u.ref===null||u.ref.name!==f)&&(u.ref=xS(f)),o=u.ref;break;case 7:if(t.stateNode===null){var _=new Di(t);g(t.child,!1,J2,_,void 0,void 0),t.stateNode=_}o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(b){Ze(t,n,b)}}function Yn(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Ze(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ze(t,n,u)}else a.current=null}function Bu(t,n){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&n!==null)for(var a=0;a<n.length;a++)RS(t.stateNode,n[a])}function my(t){for(var n=t.return;n!==null&&(Bp(n)&&RS(t.stateNode,n.stateNode),!Ip(n));)n=n.return}function ql(t){for(var n=t.return;n!==null&&(Bp(n)&&$2(t.stateNode,n.stateNode),!Ip(n));)n=n.return}function Ip(t){return t.tag===5||t.tag===3||t.tag===27}function Bp(t){return t&&t.tag===7&&t.stateNode!==null}function Fp(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Ze(t,t.return,u)}}function Hp(t,n,a){try{var o=t.stateNode;O2(o,t.type,a,n),o[Jt]=n}catch(u){Ze(t,t.return,u)}}function gy(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Br(t.type)||t.tag===4}function Vp(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||gy(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Br(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Gp(t,n,a,o){var u=t.tag;if(u===5||u===6)u=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(u,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(u),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=di)),Bu(t,o),Ft=!0;else if(u!==4&&(u===27&&(Bu(t,o),o=null,Br(t.type)&&(a=t.stateNode,n=null)),t=t.child,t!==null))for(Gp(t,n,a,o),t=t.sibling;t!==null;)Gp(t,n,a,o),t=t.sibling}function Fu(t,n,a,o){var u=t.tag;if(u===5||u===6)u=t.stateNode,n?a.insertBefore(u,n):a.appendChild(u),Bu(t,o),Ft=!0;else if(u!==4&&(u===27&&(Bu(t,o),o=null,Br(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(Fu(t,n,a,o),t=t.sibling;t!==null;)Fu(t,n,a,o),t=t.sibling}function vy(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Wn(n,o,a),n[Gt]=t,n[Jt]=a}catch(f){Ze(t,t.return,f)}}var Hu=!1,Ai=null;function _y(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(Hu=!0)}var Sa=null;function yy(){var t=Sa;return Sa=null,t}var mi=0;function bo(t,n,a,o,u){return mi=0,Sy(t.child,n,a,o,u)}function Sy(t,n,a,o,u){for(var f=!1;t!==null;){if(t.tag===5){var _=t.stateNode;if(o!==null){var b=bm(_);o.push(b),b.view&&(f=!0)}else f||bm(_).view&&(f=!0);Hu=!0,yS(_,mi===0?n:n+"_"+mi,a),mi++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&u||Sy(t.child,n,a,o,u)&&(f=!0));t=t.sibling}return f}function xa(t,n){for(;t!==null;)t.tag===5?SS(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&n||xa(t.child,n)),t=t.sibling}function Vu(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(Vu(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var n=t.memoizedProps;if(n.name==null||n.name==="auto")throw Error(r(544));var a=n.name;n=Ya(n.default,n.share),n!=="none"&&(bo(t,a,n,null,!1)||xa(t.child,!1))}t=t.sibling}}function Xp(t,n){if(t.tag===30){var a=t.stateNode,o=t.memoizedProps,u=qa(o,a),f=Ya(o.default,a.paired?o.share:o.enter);f!=="none"?bo(t,u,f,null,!1)?(Vu(t),a.paired||n||Lo(t,o.onEnter)):xa(t.child,!1):Vu(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Xp(t,n),t=t.sibling;else Vu(t)}function kp(t){if(Ai!==null&&Ai.size!==0){var n=Ai;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,o=a.name;if(o!=null&&o!=="auto"){var u=n.get(o);if(u!==void 0){var f=Ya(a.default,a.share);if(f!=="none"&&(bo(t,o,f,null,!1)?(f=t.stateNode,u.paired=f,f.paired=u,Lo(t,a.onShare)):xa(t.child,!1)),n.delete(o),n.size===0)break}}}kp(t)}t=t.sibling}}}function qp(t){if(t.tag===30){var n=t.memoizedProps,a=qa(n,t.stateNode),o=Ai!==null?Ai.get(a):void 0,u=Ya(n.default,o!==void 0?n.share:n.exit);u!=="none"&&(bo(t,a,u,null,!1)?o!==void 0?(u=t.stateNode,o.paired=u,u.paired=o,Ai.delete(a),Lo(t,n.onShare)):Lo(t,n.onExit):xa(t.child,!1)),Ai!==null&&kp(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)qp(t),t=t.sibling;else Ai!==null&&kp(t)}function xy(t){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,a=qa(n,t.stateNode);n=Ya(n.default,n.update),t.flags&=-5,n!=="none"&&bo(t,a,n,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&xy(t);t=t.sibling}}function Yp(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.stateNode;n.paired!==null&&(n.paired=null,xa(t.child,!1))}Yp(t)}t=t.sibling}}function Gu(t){if(t.tag===30)t.stateNode.paired=null,xa(t.child,!1),Yp(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Gu(t),t=t.sibling;else Yp(t)}function My(t){for(t=t.child;t!==null;)t.tag===30?xa(t.child,!1):(t.subtreeFlags&33554432)!==0&&My(t),t=t.sibling}function Wp(t,n,a,o,u,f,_){for(var b=!1;n!==null;){if(n.tag===5){var O=n.stateNode;if(f!==null&&mi<f.length){var j=f[mi],ot=bm(O);(j.view||ot.view)&&(b=!0);var St;if(St=(t.flags&4)===0)if(ot.clip)St=!0;else{St=j.rect;var W=ot.rect;St=St.y!==W.y||St.x!==W.x||St.height!==W.height||St.width!==W.width}St&&(t.flags|=4),ot.abs?ot=!j.abs:(j=j.rect,ot=ot.rect,ot=j.height!==ot.height||j.width!==ot.width),ot&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&yS(O,mi===0?a:a+"_"+mi,u),b&&(t.flags&4)!==0||(Sa===null&&(Sa=[]),Sa.push(O,mi===0?o:o+"_"+mi,n.memoizedProps)),mi++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&_?t.flags|=n.flags&32:Wp(t,n.child,a,o,u,f,_)&&(b=!0));n=n.sibling}return b}function Ey(t,n){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,o=t.stateNode,u=qa(a,o),f=Ya(a.default,a.update),_;_=t.memoizedState,t.memoizedState=null,o=t;var b=t.child;mi=0,u=Wp(o,b,u,u,f,_,!1),(t.flags&4)!==0&&u&&Lo(t,a.onUpdate)}else(t.subtreeFlags&33554432)!==0&&Ey(t);t=t.sibling}}var Pn=!1,ke=!1,Ma=!1,Zp=!1,Ty=typeof WeakSet=="function"?WeakSet:Set,In=null,Ea=!1,Yl=!1,Xu=!1,Kp=!1;function c2(t,n,a){if(t=t.containerInfo,Sm=Xo,t=Cv(t),zd(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else t:{o=(o=t.ownerDocument)&&o.defaultView||window;var u=o.getSelection&&o.getSelection();if(u&&u.rangeCount!==0){o=u.anchorNode;var f=u.anchorOffset,_=u.focusNode;u=u.focusOffset;try{o.nodeType,_.nodeType}catch{o=null;break t}var b=0,O=-1,j=-1,ot=0,St=0,W=t,at=null;e:for(;;){for(var Wt;W!==o||f!==0&&W.nodeType!==3||(O=b+f),W!==_||u!==0&&W.nodeType!==3||(j=b+u),W.nodeType===3&&(b+=W.nodeValue.length),(Wt=W.firstChild)!==null;)at=W,W=Wt;for(;;){if(W===t)break e;if(at===o&&++ot===f&&(O=b),at===_&&++St===u&&(j=b),(Wt=W.nextSibling)!==null)break;W=at,at=W.parentNode}W=Wt}o=O===-1||j===-1?null:{start:O,end:j}}else o=null}o=o||{start:0,end:0}}else o=null;for(xm={focusedElem:t,selectionRange:o},Xo=!1,a=(a&335544064)===a,In=n,n=a?9270:1024;In!==null;){if(t=In,a&&(o=t.deletions,o!==null))for(f=0;f<o.length;f++)a&&qp(o[f]);if(t.alternate===null&&(t.flags&2)!==0)a&&_y(t),ku(a);else{if(t.tag===22){if(o=t.alternate,t.memoizedState!==null){o!==null&&o.memoizedState===null&&a&&qp(o),ku(a);continue}else if(o!==null&&o.memoizedState!==null){a&&_y(t),ku(a);continue}}o=t.child,(t.subtreeFlags&n)!==0&&o!==null?(o.return=t,In=o):(a&&xy(t),ku(a))}}Ai=null}function ku(t){for(;In!==null;){var n=In,a=t,o=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((u&1024)!==0&&o!==null){a=void 0,u=o.memoizedProps,o=o.memoizedState;var f=n.stateNode;try{var _=Es(n.type,u);a=f.getSnapshotBeforeUpdate(_,o),f.__reactInternalSnapshotBeforeUpdate=a}catch(b){Ze(n,n.return,b)}}break;case 3:if((u&1024)!==0){if(o=n.stateNode.containerInfo,a=o.nodeType,a===9)Cm(o);else if(a===1)switch(o.nodeName){case"HEAD":case"HTML":case"BODY":Cm(o);break;default:o.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&o!==null&&(a=qa(o.memoizedProps,o.stateNode),u=n.memoizedProps,u=Ya(u.default,u.update),u!=="none"&&bo(o,a,u,o.memoizedState=[],!0));break;default:if((u&1024)!==0)throw Error(r(163))}if(o=n.sibling,o!==null){o.return=n.return,In=o;break}In=n.return}}function by(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:Ta(t,a),o&4&&kl(5,a);break;case 1:if(Ta(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(_){Ze(a,a.return,_)}else{var u=Es(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(_){Ze(a,a.return,_)}}o&64&&dy(a),o&512&&ya(a,a.return);break;case 3:if(Ta(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{n_(t,n)}catch(_){Ze(a,a.return,_)}}break;case 27:n===null&&o&4&&vy(a);case 26:case 5:Ta(t,a),n===null&&o&4&&Fp(a),o&512&&ya(a,a.return);break;case 12:Ta(t,a);break;case 31:Ta(t,a),o&4&&wy(t,a);break;case 13:Ta(t,a),o&4&&Dy(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=x2.bind(null,a),nC(t,a))));break;case 22:if(o=a.memoizedState!==null||Pn,!o){var f=n!==null&&n.memoizedState!==null||ke;n=Pn,u=ke,Pn=o,(ke=f)&&!u?(o=2,(a.subtreeFlags&8772)!==0&&(o|=1),oa(t,a,o)):Ta(t,a),Pn=n,ke=u}break;case 30:Ta(t,a),o&512&&ya(a,a.return);break;case 7:o&512&&ya(a,a.return);default:Ta(t,a)}}function jp(t,n){for(t=t.child;t!==null;)Ay(t,n),t=t.sibling}function Ay(t,n){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(n){var o=a.style;typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"}else{var u=t.stateNode,f=t.memoizedProps.style,_=f!=null&&f.hasOwnProperty("display")?f.display:null;u.style.display=_==null||typeof _=="boolean"?"":(""+_).trim()}}catch(O){Ze(t,t.return,O)}Qp(t,n);break;case 6:try{t.stateNode.nodeValue=n?"":t.memoizedProps,Ft=!0}catch(O){Ze(t,t.return,O)}break;case 18:try{var b=t.stateNode;n?_S(b,!0):_S(t.stateNode,!1)}catch(O){Ze(t,t.return,O)}break;case 22:case 23:t.memoizedState===null&&jp(t,n);break;default:jp(t,n)}}function Qp(t,n){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var a=t,o=n;switch(a.tag){case 4:Ay(a,o);break t;case 22:a.memoizedState===null&&Qp(a,o);break t;default:Qp(a,o)}}t=t.sibling}}function Ry(t){var n=t.alternate;n!==null&&(t.alternate=null,Ry(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&oe(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var on=null,gi=!1;function ra(t,n,a){for(a=a.child;a!==null;)Cy(t,n,a),a=a.sibling}function Cy(t,n,a){if(Pe&&typeof Pe.onCommitFiberUnmount=="function")try{Pe.onCommitFiberUnmount(de,a)}catch{}switch(a.tag){case 26:ke||Yn(a,n),ra(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!ke&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:ke||Yn(a,n),ql(a);var o=on,u=gi;Br(a.type)&&(on=a.stateNode,gi=!1),ra(t,n,a),NS(a.stateNode,a.type,a.memoizedProps),on=o,gi=u;break;case 5:ke||Yn(a,n),ql(a);case 6:if(a.tag===6&&ql(a),o=on,u=gi,on=null,ra(t,n,a),on=o,gi=u,on!==null)if(gi)try{(on.nodeType===9?on.body:on.nodeName==="HTML"?on.ownerDocument.body:on).removeChild(a.stateNode),Ft=!0}catch(f){Ze(a,n,f)}else try{on.removeChild(a.stateNode),Ft=!0}catch(f){Ze(a,n,f)}break;case 18:on!==null&&(gi?(t=on,vS(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),ko(t)):vS(on,a.stateNode));break;case 4:o=on,u=gi,on=a.stateNode.containerInfo,gi=!0,ra(t,n,a),on=o,gi=u;break;case 0:case 11:case 14:case 15:Ur(2,a,n),ke||Ur(4,a,n),ra(t,n,a);break;case 1:ke||(Yn(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&py(a,n,o)),ra(t,n,a);break;case 21:ra(t,n,a);break;case 22:ke=(o=ke)||a.memoizedState!==null,ra(t,n,a),ke=o;break;case 30:Yn(a,n),ra(t,n,a);break;case 7:ke||Yn(a,n),ra(t,n,a);break;default:ra(t,n,a)}}function wy(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ko(t)}catch(a){Ze(n,n.return,a)}}}function Dy(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ko(t)}catch(a){Ze(n,n.return,a)}}function u2(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new Ty),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new Ty),n;default:throw Error(r(435,t.tag))}}function qu(t,n){var a=u2(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=M2.bind(null,t,o);o.then(u,u)}})}function si(t,n,a){var o=n.deletions;if(o!==null)for(var u=0;u<o.length;u++){var f=o[u],_=t,b=n,O=b;t:for(;O!==null;){switch(O.tag){case 27:if(Br(O.type)){on=O.stateNode,gi=!1;break t}break;case 5:on=O.stateNode,gi=!1;break t;case 3:case 4:on=O.stateNode.containerInfo,gi=!0;break t}O=O.return}if(on===null)throw Error(r(160));Cy(_,b,f),on=null,gi=!1,_=f.alternate,_!==null&&(_.return=null),f.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Uy(n,t,a),n=n.sibling}var sa=null;function Uy(t,n,a){var o=t.alternate,u=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(u&4&&(o=t.updateQueue,o=o!==null?o.events:null,o!==null))for(var f=0;f<o.length;f++){var _=o[f];_.ref.impl=_.nextImpl}si(n,t,a),oi(t),u&4&&(Ur(3,t,t.return),kl(3,t),Ur(5,t,t.return));break;case 1:si(n,t,a),oi(t),u&512&&(ke||o===null||Yn(o,o.return)),u&64&&Pn&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(f=sa,si(n,t,a),oi(t),u&512&&(ke||o===null||Yn(o,o.return)),u&4)if(u=o!==null?o.memoizedState:null,a=t.memoizedState,o===null)if(a===null)if(t.stateNode===null)if(Pn)t.stateNode=pS(t.type,t.memoizedProps,n.containerInfo,t);else{t:{n=t.type,a=t.memoizedProps,u=f.ownerDocument||f;e:switch(n){case"title":o=u.getElementsByTagName("title")[0],(!o||o[Ie]||o[Gt]||o.namespaceURI==="http://www.w3.org/2000/svg"||o.hasAttribute("itemprop"))&&(o=u.createElement(n),u.head.insertBefore(o,u.querySelector("head > title"))),Wn(o,n,a),o[Gt]=t,Fe(o),n=o;break t;case"link":if(f=BS("link","href",u).get(n+(a.href||""))){for(_=0;_<f.length;_++)if(o=f[_],o.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&o.getAttribute("rel")===(a.rel==null?null:a.rel)&&o.getAttribute("title")===(a.title==null?null:a.title)&&o.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){f.splice(_,1);break e}}o=u.createElement(n),Wn(o,n,a),u.head.appendChild(o);break;case"meta":if(f=BS("meta","content",u).get(n+(a.content||""))){for(_=0;_<f.length;_++)if(o=f[_],o.getAttribute("content")===(a.content==null?null:""+a.content)&&o.getAttribute("name")===(a.name==null?null:a.name)&&o.getAttribute("property")===(a.property==null?null:a.property)&&o.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&o.getAttribute("charset")===(a.charSet==null?null:a.charSet)){f.splice(_,1);break e}}o=u.createElement(n),Wn(o,n,a),u.head.appendChild(o);break;default:throw Error(r(468,n))}o[Gt]=t,Fe(o),n=o}t.stateNode=n}else Pn||zm(f,t.type,t.stateNode);else t.stateNode=IS(f,a,t.memoizedProps);else u!==a?(u===null?(n=o.stateNode,n===null||ke||n.parentNode.removeChild(n)):u.count--,a===null?Pn||zm(f,t.type,t.stateNode):IS(f,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Hp(t,t.memoizedProps,o.memoizedProps);break;case 27:si(n,t,a),oi(t),u&512&&(ke||o===null||Yn(o,o.return)),o!==null&&u&4&&Hp(t,t.memoizedProps,o.memoizedProps);break;case 5:if(f=Ma,Ma=!1,si(n,t,a),Ma=f,oi(t),u&512&&(ke||o===null||Yn(o,o.return)),t.flags&32){n=t.stateNode;try{ls(n,""),Ft=!0}catch(ot){Ze(t,t.return,ot)}}u&4&&t.stateNode!=null&&(n=t.memoizedProps,Hp(t,n,o!==null?o.memoizedProps:n)),u&1024&&(Zp=!0);break;case 6:if(si(n,t,a),oi(t),u&4){if(t.stateNode===null)throw Error(r(162));n=t.memoizedProps,a=t.stateNode;try{a.nodeValue=n,Ft=!0}catch(ot){Ze(t,t.return,ot)}}break;case 3:if(Ft=!1,of=null,f=sa,sa=ec(n.containerInfo),si(n,t,a),sa=f,oi(t),u&4&&o!==null&&o.memoizedState.isDehydrated)try{ko(n.containerInfo)}catch(ot){Ze(t,t.return,ot)}Zp&&(Zp=!1,Ny(t)),Ft=!1;break;case 4:u=Ma,Ma=Pn,o=Ue(),f=sa,sa=ec(t.stateNode.containerInfo),si(n,t,a),oi(t),sa=f,Ft&&Yl&&(Xu=!0),Ft=o,Ma=u;break;case 12:si(n,t,a),oi(t);break;case 31:si(n,t,a),oi(t),u&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,qu(t,n)));break;case 13:si(n,t,a),oi(t),t.child.flags&8192&&t.memoizedState!==null!=(o!==null&&o.memoizedState!==null)&&(Zu=X()),u&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,qu(t,n)));break;case 22:f=t.memoizedState!==null,_=o!==null&&o.memoizedState!==null;var b=Pn,O=ke,j=Ma;Pn=b||f,Ma=j||f,ke=O||_,si(n,t,a),ke=O,Ma=j,Pn=b,oi(t),u&8192&&(n=t.stateNode,n._visibility=f?n._visibility&-2:n._visibility|1,!f||o===null||_||Pn||ke||(n=_||ke,a=Pn,o=ke,Pn=f||Pn,ke=n,Nr(t,2),Pn=a,ke=o),!f&&Ma||jp(t,f)),u&4&&(n=t.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,qu(t,a))));break;case 19:si(n,t,a),oi(t),u&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,qu(t,n)));break;case 30:u&512&&(ke||o===null||Yn(o,o.return)),u=Ue(),f=Yl,_=(a&335544064)===a,b=t.memoizedProps,Yl=_&&Ya(b.default,b.update)!=="none",si(n,t,a),oi(t),_&&o!==null&&Ft&&(t.flags|=4),Yl=f,Ft=u;break;case 21:break;case 7:u&512&&(ke||o===null||Yn(o,o.return)),o&&o.stateNode!==null&&(o.stateNode._fragmentFiber=t);default:si(n,t,a),oi(t)}}function oi(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(gy(o)){a=o;break}o=o.return}o=null;for(var u=t.return;u!==null;){if(Bp(u)){var f=u.stateNode;o===null?o=[f]:o.push(f)}if(Ip(u))break;u=u.return}var _=o;if(a==null)throw Error(r(160));switch(a.tag){case 27:var b=a.stateNode,O=Vp(t);Fu(t,O,b,_);break;case 5:var j=a.stateNode;a.flags&32&&(ls(j,""),a.flags&=-33);var ot=Vp(t);Fu(t,ot,j,_);break;case 3:case 4:var St=a.stateNode.containerInfo,W=Vp(t);Gp(t,W,St,_);break;default:throw Error(r(161))}}catch(at){Ze(t,t.return,at)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function Ny(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;Ny(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Xo=!0,n.reset(),Xo=!1),t=t.sibling}}function Ao(t,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)Ly(n,t),n=n.sibling;else Ey(n)}function Ly(t,n){var a=t.alternate;if(a===null)Xp(t,!1);else switch(t.tag){case 3:if(Kp=Ea=!1,yy(),Ao(n,t),!Ea&&!Xu){if(t=Sa,t!==null)for(var o=0;o<t.length;o+=3){a=t[o];var u=t[o+1];SS(a,t[o+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+u+")"})}t=n.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),Kp=!0}Sa=null;break;case 5:Ao(n,t);break;case 4:o=Ea,Ea=!1,Ao(n,t),Ea&&(Xu=!0),Ea=o;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?Xp(t,!1):Ao(n,t));break;case 30:o=Ea,u=yy(),Ea=!1,Ao(n,t),Ea&&(t.flags|=4);var f=t.memoizedProps,_=t.stateNode;n=qa(f,_),_=qa(a.memoizedProps,_);var b=Ya(f.default,f.update);b==="none"?n=!1:(f=a.memoizedState,a.memoizedState=null,a=t.child,mi=0,n=Wp(t,a,n,_,b,f,!0),mi!==(f===null?0:f.length)&&(t.flags|=32)),(t.flags&4)!==0&&n?(Lo(t,t.memoizedProps.onUpdate),Sa=u):u!==null&&(u.push.apply(u,Sa),Sa=u),Ea=(t.flags&32)!==0?!0:o;break;default:Ao(n,t)}}function Ta(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)by(t,n.alternate,n),n=n.sibling}function Nr(t,n){for(t=t.child;t!==null;){var a=t,o=n;switch(a.tag){case 0:case 11:case 14:case 15:Ur(4,a,a.return),Nr(a,o);break;case 1:Yn(a,a.return);var u=a.stateNode;typeof u.componentWillUnmount=="function"&&py(a,a.return,u),Nr(a,o);break;case 27:(o&2)!==0&&NS(a.stateNode,a.type,a.memoizedProps);case 5:Yn(a,a.return),a.tag!==5&&a.tag!==27||ql(a),Nr(a,o);break;case 6:ql(a);break;case 26:Yn(a,a.return),u=a.stateNode,a.memoizedState!==null||u===null||ke||u.parentNode.removeChild(u),Nr(a,o);break;case 22:a.memoizedState===null&&Nr(a,o);break;case 30:Yn(a,a.return),Nr(a,o);break;case 7:Yn(a,a.return);default:Nr(a,o)}t=t.sibling}}function oa(t,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var o=n.alternate,u=t,f=n,_=f.flags,b=(a&1)!==0;switch(f.tag){case 0:case 11:case 15:oa(u,f,a),kl(4,f);break;case 1:if(oa(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ot){Ze(o,o.return,ot)}if(o=f,u=o.updateQueue,u!==null){var O=o.stateNode;try{var j=u.shared.hiddenCallbacks;if(j!==null)for(u.shared.hiddenCallbacks=null,u=0;u<j.length;u++)e_(j[u],O)}catch(ot){Ze(o,o.return,ot)}}b&&_&64&&dy(f),ya(f,f.return);break;case 27:(a&2)!==0&&vy(f);case 5:f.tag!==5&&f.tag!==27||my(f),oa(u,f,a),b&&o===null&&_&4&&Fp(f),ya(f,f.return);break;case 6:my(f);break;case 26:O=f.stateNode,f.memoizedState!==null||O===null||Pn||zm(ec(O.ownerDocument),f.type,O),oa(u,f,a),b&&o===null&&_&4&&Fp(f),ya(f,f.return);break;case 12:oa(u,f,a);break;case 31:oa(u,f,a),b&&_&4&&wy(u,f);break;case 13:oa(u,f,a),b&&_&4&&Dy(u,f);break;case 22:f.memoizedState===null&&oa(u,f,a),ya(f,f.return);break;case 30:oa(u,f,a),ya(f,f.return);break;case 7:ya(f,f.return);default:oa(u,f,a)}n=n.sibling}}function Jp(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Ul(a))}function $p(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Ul(t))}function Gi(t,n,a,o){var u=(a&335544064)===a;if(n.subtreeFlags&(u?10262:10256))for(n=n.child;n!==null;)Oy(t,n,a,o),n=n.sibling;else u&&My(n)}function Oy(t,n,a,o){var u=(a&335544064)===a;u&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&Gu(n);var f=n.flags;switch(n.tag){case 0:case 11:case 15:Gi(t,n,a,o),f&2048&&kl(9,n);break;case 1:Gi(t,n,a,o);break;case 3:Gi(t,n,a,o),u&&Kp&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),f&2048&&(f=null,n.alternate!==null&&(f=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==f&&(n.refCount++,f!=null&&Ul(f)));break;case 12:if(f&2048){Gi(t,n,a,o),f=n.stateNode;try{var _=n.memoizedProps,b=_.id,O=_.onPostCommit;typeof O=="function"&&O(b,n.alternate===null?"mount":"update",f.passiveEffectDuration,-0)}catch(j){Ze(n,n.return,j)}}else Gi(t,n,a,o);break;case 31:Gi(t,n,a,o);break;case 13:Gi(t,n,a,o);break;case 23:break;case 22:_=n.stateNode,b=n.alternate,n.memoizedState!==null?(u&&b!==null&&b.memoizedState===null&&Gu(b),_._visibility&2?Gi(t,n,a,o):Wl(t,n)):(u&&b!==null&&b.memoizedState!==null&&Gu(n),_._visibility&2?Gi(t,n,a,o):(_._visibility|=2,Ro(t,n,a,o,(n.subtreeFlags&10256)!==0||!1))),f&2048&&Jp(b,n);break;case 24:Gi(t,n,a,o),f&2048&&$p(n.alternate,n);break;case 30:u&&(f=n.alternate,f!==null&&(xa(f.child,!0),xa(n.child,!0))),Gi(t,n,a,o);break;default:Gi(t,n,a,o)}}function Ro(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=t,_=n,b=a,O=o,j=_.flags;switch(_.tag){case 0:case 11:case 15:Ro(f,_,b,O,u),kl(8,_);break;case 23:break;case 22:var ot=_.stateNode;_.memoizedState!==null?ot._visibility&2?Ro(f,_,b,O,u):Wl(f,_):(ot._visibility|=2,Ro(f,_,b,O,u)),u&&j&2048&&Jp(_.alternate,_);break;case 24:Ro(f,_,b,O,u),u&&j&2048&&$p(_.alternate,_);break;default:Ro(f,_,b,O,u)}n=n.sibling}}function Wl(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:Wl(a,o),u&2048&&Jp(o.alternate,o);break;case 24:Wl(a,o),u&2048&&$p(o.alternate,o);break;default:Wl(a,o)}n=n.sibling}}var Ts=8192;function bs(t,n,a){if(t.subtreeFlags&Ts)for(t=t.child;t!==null;)zy(t,n,a),t=t.sibling}function zy(t,n,a){switch(t.tag){case 26:bs(t,n,a),t.flags&Ts&&(t.memoizedState!==null?gC(a,sa,t.memoizedState,t.memoizedProps):(t=t.stateNode,(n&335544128)===n&&GS(a,t)));break;case 5:bs(t,n,a),t.flags&Ts&&(t=t.stateNode,(n&335544128)===n&&GS(a,t));break;case 3:case 4:var o=sa;sa=ec(t.stateNode.containerInfo),bs(t,n,a),sa=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=Ts,Ts=16777216,bs(t,n,a),Ts=o):bs(t,n,a));break;case 30:if((t.flags&Ts)!==0&&(o=t.memoizedProps.name,o!=null&&o!=="auto")){var u=t.stateNode;u.paired=null,Ai===null&&(Ai=new Map),Ai.set(o,u)}bs(t,n,a);break;default:bs(t,n,a)}}function Py(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Zl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];In=o,By(o,t)}Py(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Iy(t),t=t.sibling}function Iy(t){switch(t.tag){case 0:case 11:case 15:Zl(t),t.flags&2048&&Ur(9,t,t.return);break;case 3:Zl(t);break;case 12:Zl(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Yu(t)):Zl(t);break;default:Zl(t)}}function Yu(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];In=o,By(o,t)}Py(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Ur(8,n,n.return),Yu(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Yu(n));break;default:Yu(n)}t=t.sibling}}function By(t,n){for(;In!==null;){var a=In;switch(a.tag){case 0:case 11:case 15:Ur(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:Ul(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,In=o;else t:for(a=t;In!==null;){o=In;var u=o.sibling,f=o.return;if(Ry(o),o===a){In=null;break t}if(u!==null){u.return=f,In=u;break t}In=f}}}var f2={getCacheForType:function(t){var n=Xn(Mn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Xn(Mn).controller.signal}},h2=typeof WeakMap=="function"?WeakMap:Map,Xe=0,$e=null,Ce=null,Ne=0,We=0,Ri=null,Lr=!1,Co=!1,tm=!1,er=0,vn=0,Or=0,As=0,Wu=0,Ci=0,wo=0,Kl=null,vi=null,em=!1,Zu=0,Fy=0,Ku=1/0,ju=null,zr=null,dn=0,la=null,Rs=null,ba=0,nm=0,im=null,Hy=null,Do=null,Uo=null,No=null,jl=0,Qu=null;function wi(){return(Xe&2)!==0&&Ne!==0?Ne&-Ne:Ut.T!==null?dm():Pt()}function Vy(){if(Ci===0)if((Ne&536870912)===0||be){var t=Oi;Oi<<=1,(Oi&3932160)===0&&(Oi=262144),Ci=t}else Ci=536870912;return t=kn.current,t!==null&&(t.flags|=32),Ci}function Lo(t,n){if(n!=null){var a=t.stateNode,o=a.ref;o===null&&(o=a.ref=xS(qa(t.memoizedProps,a))),Uo===null&&(Uo=[]),Uo.push(n.bind(null,o))}}function _i(t,n,a){(t===$e&&(We===2||We===9)||t.cancelPendingCommit!==null)&&(Oo(t,0),Pr(t,Ne,Ci,!1)),ea(t,a),((Xe&2)===0||t!==$e)&&(t===$e&&((Xe&2)===0&&(As|=a),vn===4&&Pr(t,Ne,Ci,!1)),Aa(t))}function Gy(t,n,a){if((Xe&6)!==0)throw Error(r(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||zi(t,n),u=o?m2(t,n):rm(t,n,!0),f=o;do{if(u===0){Co&&!o&&Pr(t,n,0,!1);break}else{if(a=t.current.alternate,f&&!d2(a)){u=rm(t,n,!1),f=!1;continue}if(u===2){if(f=n,t.errorRecoveryDisabledLanes&f)var _=0;else _=t.pendingLanes&-536870913,_=_!==0?_:_&536870912?536870912:0;if(_!==0){n=_;t:{var b=t;u=Kl;var O=b.current.memoizedState.isDehydrated;if(O&&(Oo(b,_).flags|=256),_=rm(b,_,!1),_!==2&&_!==6){if(tm&&!O){b.errorRecoveryDisabledLanes|=f,As|=f,u=4;break t}f=vi,vi=u,f!==null&&(vi===null?vi=f:vi.push.apply(vi,f))}u=_}if(f=!1,u!==2)continue}}if(u===1){Oo(t,0),Pr(t,n,0,!0);break}t:{switch(o=t,f=u,f){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:Pr(o,n,Ci,!Lr);break t;case 2:vi=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(u=Zu+300-X(),10<u)){if(Pr(o,n,Ci,!Lr),$i(o,0,!0)!==0)break t;ba=n,o.timeoutHandle=Tm(Xy.bind(null,o,a,vi,ju,em,n,Ci,As,wo,Lr,f,"Throttled",-0,0),u);break t}Xy(o,a,vi,ju,em,n,Ci,As,wo,Lr,f,null,-0,0)}}break}while(!0);Aa(t)}function Xy(t,n,a,o,u,f,_,b,O,j,ot,St,W,at){t.timeoutHandle=-1;var Wt=n.subtreeFlags,re=(f&335544064)===f;if(St=null,(re||Wt&8192||(Wt&16785408)===16785408)&&(St={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:di},Ai=null,zy(n,f,St),re&&(Wt=St,re=t.containerInfo,re=(re.nodeType===9?re:re.ownerDocument).__reactViewTransition,re!=null&&(Wt.count++,Wt.waitingForViewTransition=!0,Wt=ac.bind(Wt),re.finished.then(Wt,Wt))),Wt=(f&62914560)===f?Zu-X():(f&4194048)===f?Fy-X():0,Wt=vC(St,Wt),Wt!==null)){ba=f,t.cancelPendingCommit=Wt(Qy.bind(null,t,n,f,a,o,u,_,b,O,j,ot,St,null,W,at)),Pr(t,f,_,!j);return}Qy(t,n,f,a,o,u,_,b,O,j,ot,St)}function d2(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!Ti(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Pr(t,n,a,o){n=hi(t,n),n&=~Wu,n&=~As,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var f=31-an(u),_=1<<f;o[f]=-1,u&=~_}a!==0&&R(t,a,n)}function Ju(){return(Xe&6)===0?(Ql(0),!1):!0}function am(){if(Ce!==null){if(We===0)var t=Ce.return;else t=Ce,Ka=ps=null,hp(t),So=null,Ol=0,t=Ce;for(;t!==null;)hy(t.alternate,t),t=t.return;Ce=null}}function Oo(t,n){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,I2(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ba=0,am(),$e=t,Ce=a=Wa(t.current,null),Ne=n,We=0,Ri=null,Lr=!1,Co=zi(t,n),tm=!1,wo=Ci=Wu=As=Or=vn=0,vi=Kl=null,em=!1,er=hi(t,n),su(),a}function ky(t,n){ye=null,Ut.H=Uu,n===yo||n===vu?(n=Qv(),We=3):n===$d?(n=Qv(),We=4):We=n===Rp?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Ri=n,Ce===null&&(vn=1,Nu(t,Bi(n,t.current)))}function qy(){var t=kn.current;return t===null?!0:(Ne&4194048)===Ne?ti===null:(Ne&62914560)===Ne||(Ne&536870912)!==0?t===ti:!1}function Yy(){var t=Ut.H;return Ut.H=Uu,t===null?Uu:t}function Wy(){var t=Ut.A;return Ut.A=f2,t}function $u(){vn=4,Lr||(Ne&4194048)!==Ne&&kn.current!==null||(Co=!0),(Or&134217727)===0&&(As&134217727)===0||$e===null||Pr($e,Ne,Ci,!1)}function rm(t,n,a){var o=Xe;Xe|=2;var u=Yy(),f=Wy();($e!==t||Ne!==n)&&(ju=null,Oo(t,n)),n=!1;var _=vn;t:do try{if(We!==0&&Ce!==null){var b=Ce,O=Ri;switch(We){case 8:am(),_=6;break t;case 3:case 2:case 9:case 6:kn.current===null&&(n=!0);var j=We;if(We=0,Ri=null,zo(t,b,O,j),a&&Co){_=0;break t}break;default:j=We,We=0,Ri=null,zo(t,b,O,j)}}p2(),_=vn;break}catch(ot){ky(t,ot)}while(!0);return n&&t.shellSuspendCounter++,Ka=ps=null,Xe=o,Ut.H=u,Ut.A=f,Ce===null&&($e=null,Ne=0,su()),_}function p2(){for(;Ce!==null;)Zy(Ce)}function m2(t,n){var a=Xe;Xe|=2;var o=Yy(),u=Wy();$e!==t||Ne!==n?(ju=null,Ku=X()+500,Oo(t,n)):Co=zi(t,n);t:do try{if(We!==0&&Ce!==null){n=Ce;var f=Ri;e:switch(We){case 1:We=0,Ri=null,zo(t,n,f,1);break;case 2:case 9:if(Kv(f)){We=0,Ri=null,Ky(n);break}n=function(){We!==2&&We!==9||$e!==t||(We=7),Aa(t)},f.then(n,n);break t;case 3:We=7;break t;case 4:We=5;break t;case 7:Kv(f)?(We=0,Ri=null,Ky(n)):(We=0,Ri=null,zo(t,n,f,7));break;case 5:var _=null;switch(Ce.tag){case 26:_=Ce.memoizedState;case 5:case 27:var b=Ce;if(_?HS(_):b.stateNode.complete){We=0,Ri=null;var O=b.sibling;if(O!==null)Ce=O;else{var j=b.return;j!==null?(Ce=j,tf(j)):Ce=null}break e}}We=0,Ri=null,zo(t,n,f,5);break;case 6:We=0,Ri=null,zo(t,n,f,6);break;case 8:am(),vn=6;break t;default:throw Error(r(462))}}g2();break}catch(ot){ky(t,ot)}while(!0);return Ka=ps=null,Ut.H=o,Ut.A=u,Xe=a,Ce!==null?0:($e=null,Ne=0,su(),vn)}function g2(){for(;Ce!==null&&!Yt();)Zy(Ce)}function Zy(t){var n=uy(t.alternate,t,er);t.memoizedProps=t.pendingProps,n===null?tf(t):Ce=n}function Ky(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=iy(a,n,n.pendingProps,n.type,void 0,Ne);break;case 11:n=iy(a,n,n.pendingProps,n.type.render,n.ref,Ne);break;case 5:hp(n);var o=n;o===zn&&(be?(hu(o),o.tag===5&&o.stateNode!=null&&(en=o.stateNode)):(hu(o),be=!0));default:hy(a,n),n=Ce=Bv(n,er),n=uy(a,n,er)}t.memoizedProps=t.pendingProps,n===null?tf(t):Ce=n}function zo(t,n,a,o){Ka=ps=null,hp(n),So=null,Ol=0;var u=n.return;try{if(i2(t,u,n,a,Ne)){vn=1,Nu(t,Bi(a,t.current)),Ce=null;return}}catch(f){if(u!==null)throw Ce=u,f;vn=1,Nu(t,Bi(a,t.current)),Ce=null;return}n.flags&32768?(be||o===1?t=!0:Co||(Ne&536870912)!==0?t=!1:(Lr=t=!0,(o===2||o===9||o===3||o===6)&&(o=kn.current,o!==null&&o.tag===13&&(o.flags|=16384))),jy(n,t)):tf(n)}function tf(t){var n=t;do{if((n.flags&32768)!==0){jy(n,Lr);return}t=n.return;var a=o2(n.alternate,n,er);if(a!==null){Ce=a;return}if(n=n.sibling,n!==null){Ce=n;return}Ce=n=t}while(n!==null);vn===0&&(vn=5)}function jy(t,n){do{var a=l2(t.alternate,t);if(a!==null){a.flags&=32767,Ce=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Ce=t;return}Ce=t=a}while(t!==null);vn=6,Ce=null}function Qy(t,n,a,o,u,f,_,b,O,j,ot,St){t.cancelPendingCommit=null;do ef();while(dn!==0);if((Xe&6)!==0)throw Error(r(327));if(n!==null){if(n===t.current)throw Error(r(177));t===$e&&(Ce=$e=null,Ne=0),Rs=n,la=t,ba=a,im=u,Hy=o,v2(t,n,a,_,b,O,St)}}function v2(t,n,a,o,u,f,_){var b=n.lanes|n.childLanes;if(nm=b,b|=Hd,ss(t,a,b,o,u,f),Uo=null,(a&335544064)===a?(No=qR(t),o=10262):(No=null,o=10256),(n.subtreeFlags&o)!==0||(n.flags&o)!==0?(t.callbackNode=null,t.callbackPriority=0,E2(Lt,function(){return cm(),null})):(t.callbackNode=null,t.callbackPriority=0),Hu=!1,o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=Ut.T,Ut.T=null,u=Ht.p,Ht.p=2,f=Xe,Xe|=4;try{c2(t,n,a)}finally{Xe=f,Ht.p=u,Ut.T=o}}dn=1,Hu?Do=X2(_,t.containerInfo,No,sm,om,y2,lm,cm,_2):(sm(),om(),lm())}function _2(t){if(dn!==0){var n=la.onRecoverableError;n(t,{componentStack:null})}}function y2(){dn===3&&(dn=0,Ly(Rs,la),dn=4)}function sm(){if(dn===1){dn=0;var t=la,n=Rs,a=ba,o=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||o){o=Ut.T,Ut.T=null;var u=Ht.p;Ht.p=2;var f=Xe;Xe|=4;try{Yl=Xu=!1,Uy(n,t,a),a=xm;var _=Cv(t.containerInfo),b=a.focusedElem,O=a.selectionRange;if(_!==b&&b&&b.ownerDocument&&Rv(b.ownerDocument.documentElement,b)){if(O!==null&&zd(b)){var j=O.start,ot=O.end;if(ot===void 0&&(ot=j),"selectionStart"in b)b.selectionStart=j,b.selectionEnd=Math.min(ot,b.value.length);else{var St=b.ownerDocument||document,W=St&&St.defaultView||window;if(W.getSelection){var at=W.getSelection(),Wt=b.textContent.length,re=Math.min(O.start,Wt),Se=O.end===void 0?re:Math.min(O.end,Wt);!at.extend&&re>Se&&(_=Se,Se=re,re=_);var K=Av(b,re),k=Av(b,Se);if(K&&k&&(at.rangeCount!==1||at.anchorNode!==K.node||at.anchorOffset!==K.offset||at.focusNode!==k.node||at.focusOffset!==k.offset)){var it=St.createRange();it.setStart(K.node,K.offset),at.removeAllRanges(),re>Se?(at.addRange(it),at.extend(k.node,k.offset)):(it.setEnd(k.node,k.offset),at.addRange(it))}}}}for(St=[],at=b;at=at.parentNode;)at.nodeType===1&&St.push({element:at,left:at.scrollLeft,top:at.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<St.length;b++){var _t=St[b];_t.element.scrollLeft=_t.left,_t.element.scrollTop=_t.top}}Xo=!!Sm,xm=Sm=null}finally{Xe=f,Ht.p=u,Ut.T=o}}t.current=n,dn=2}}function om(){if(dn===2){dn=0;var t=la,n=Rs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=Ut.T,Ut.T=null;var o=Ht.p;Ht.p=2;var u=Xe;Xe|=4;try{by(t,n.alternate,n)}finally{Xe=u,Ht.p=o,Ut.T=a}}dn=3}}function lm(){if(dn===4||dn===3){dn=0;var t=Do;Do=null,ge();var n=la,a=Rs,o=ba,u=Hy,f=(o&335544064)===o?10262:10256;if((a.subtreeFlags&f)!==0||(a.flags&f)!==0?dn=5:(dn=0,Rs=la=null,Jy(n,n.pendingLanes)),f=n.pendingLanes,f===0&&(zr=null),tt(o),a=a.stateNode,Pe&&typeof Pe.onCommitFiberRoot=="function")try{Pe.onCommitFiberRoot(de,a,void 0,(a.current.flags&128)===128)}catch{}if(u!==null){a=Ut.T,f=Ht.p,Ht.p=2,Ut.T=null;try{for(var _=n.onRecoverableError,b=0;b<u.length;b++){var O=u[b];_(O.value,{componentStack:O.stack})}}finally{Ut.T=a,Ht.p=f}}if(u=Uo,_=No,No=null,u!==null&&(Uo=null,_===null&&(_=[]),t!==null))for(O=0;O<u.length;O++)a=(0,u[O])(_),a!==void 0&&t.finished.finally(a);(ba&3)!==0&&ef(),Aa(n),f=n.pendingLanes,(o&261930)!==0&&(f&42)!==0?n===Qu?jl++:(jl=0,Qu=n):(jl=0,Qu=null),Ql(0)}}function Jy(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Ul(n)))}function ef(){return Do!==null&&(Do.skipTransition(),Do=null),sm(),om(),lm(),cm()}function cm(){if(dn!==5)return!1;var t=la,n=nm;nm=0;var a=tt(ba),o=Ut.T,u=Ht.p;try{Ht.p=32>a?32:a,Ut.T=null,a=im,im=null;var f=la,_=ba;if(dn=0,Rs=la=null,ba=0,(Xe&6)!==0)throw Error(r(331));var b=Xe;if(Xe|=4,Iy(f.current),Oy(f,f.current,_,a),Xe=b,Ql(0,!1),Pe&&typeof Pe.onPostCommitFiberRoot=="function")try{Pe.onPostCommitFiberRoot(de,f)}catch{}return!0}finally{Ht.p=u,Ut.T=o,Jy(t,n)}}function $y(t,n,a){n=Bi(a,n),n=Ap(t.stateNode,n,2),t=Rr(t,n,2),t!==null&&(ea(t,2),Aa(t))}function Ze(t,n,a){if(t.tag===3)$y(t,t,a);else for(;n!==null;){if(n.tag===3){$y(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(zr===null||!zr.has(o))){t=Bi(a,t),a=K_(2),o=Rr(n,a,2),o!==null&&(j_(a,o,n,t),ea(o,2),Aa(o));break}}n=n.return}}function um(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new h2;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(tm=!0,u.add(a),t=S2.bind(null,t,n,a),n.then(t,t))}function S2(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,$e===t&&(Ne&a)===a&&((vn===4||vn===3&&(Ne&62914560)===Ne&&300>X()-Zu)&&(Xe&2)===0?Oo(t,0):Wu|=a,wo===Ne&&(wo=0)),Aa(t)}function tS(t,n){n===0&&(n=rs()),t=fs(t,n),t!==null&&(ea(t,n),Aa(t))}function x2(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),tS(t,a)}function M2(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),tS(t,a)}function E2(t,n){return se(t,n)}var Po=null,Io=null,fm=!1,nf=!1,hm=!1,Ir=0;function Aa(t){t!==Io&&t.next===null&&(Io===null?Po=Io=t:Io=Io.next=t),nf=!0,fm||(fm=!0,b2())}function Ql(t,n){if(!hm&&nf){hm=!0;do for(var a=!1,o=Po;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var _=o.suspendedLanes,b=o.pingedLanes;f=(1<<31-an(42|t)+1)-1,f&=u&~(_&~b),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,aS(o,f))}else f=Ne,f=$i(o,o===$e?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||zi(o,f)||(a=!0,aS(o,f));o=o.next}while(a);hm=!1}}function T2(){eS()}function eS(){nf=fm=!1;var t=0;Ir!==0&&P2()&&(t=Ir);for(var n=X(),a=null,o=Po;o!==null;){var u=o.next,f=nS(o,n);f===0?(o.next=null,a===null?Po=u:a.next=u,u===null&&(Io=a)):(a=o,(t!==0||(f&3)!==0)&&(nf=!0)),o=u}dn!==0&&dn!==5||Ql(t),Ir!==0&&(Ir=0)}function nS(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,f=t.pendingLanes&-62914561;0<f;){var _=31-an(f),b=1<<_,O=u[_];O===-1?((b&a)===0||(b&o)!==0)&&(u[_]=ao(b,n)):O<=n&&(t.expiredLanes|=b),f&=~b}if(n=$e,a=Ne,a=$i(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(We===2||We===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&ie(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||zi(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&ie(o),tt(a)){case 2:case 8:a=Mt;break;case 32:a=Lt;break;case 268435456:a=ne;break;default:a=Lt}return o=iS.bind(null,t),a=se(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&ie(o),t.callbackPriority=2,t.callbackNode=null,2}function iS(t,n){if(dn!==0&&dn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(ef()&&t.callbackNode!==a)return null;var o=Ne;return o=$i(t,t===$e?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(Gy(t,o,n),nS(t,X()),t.callbackNode!=null&&t.callbackNode===a?iS.bind(null,t):null)}function aS(t,n){if(ef())return null;Gy(t,n,!0)}function b2(){B2(function(){(Xe&6)!==0?se(Vt,T2):eS()})}function dm(){if(Ir===0){var t=vs;t===0&&(t=Ji,Ji<<=1,(Ji&261888)===0&&(Ji=256)),Ir=t}return Ir}function rS(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:vr(t)}function A2(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=rS((u[Jt]||null).action),_=o.submitter;_&&(n=(n=_[Jt]||null)?rS(n.formAction):_.getAttribute("formAction"),n!==null&&(f=n,_=null));var b=new nu("action","action",null,o,u);t.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ir!==0){var O=new FormData(u,_);xp(a,{pending:!0,data:O,method:u.method,action:f},null,O)}}else typeof f=="function"&&(b.preventDefault(),O=new FormData(u,_),xp(a,{pending:!0,data:O,method:u.method,action:f},f,O))},currentTarget:u}]})}}for(var pm=0;pm<Fd.length;pm++){var mm=Fd[pm],R2=mm.toLowerCase(),C2=mm[0].toUpperCase()+mm.slice(1);aa(R2,"on"+C2)}aa(Uv,"onAnimationEnd"),aa(Nv,"onAnimationIteration"),aa(Lv,"onAnimationStart"),aa("dblclick","onDoubleClick"),aa("focusin","onFocus"),aa("focusout","onBlur"),aa(IR,"onTransitionRun"),aa(BR,"onTransitionStart"),aa(FR,"onTransitionCancel"),aa(Ov,"onTransitionEnd"),rn("onMouseEnter",["mouseout","mouseover"]),rn("onMouseLeave",["mouseout","mouseover"]),rn("onPointerEnter",["pointerout","pointerover"]),rn("onPointerLeave",["pointerout","pointerover"]),fn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),fn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),fn("onBeforeInput",["compositionend","keypress","textInput","paste"]),fn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),fn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),fn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Jl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),w2=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Jl));function sS(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;t:{var f=void 0;if(n)for(var _=o.length-1;0<=_;_--){var b=o[_],O=b.instance,j=b.currentTarget;if(b=b.listener,O!==f&&u.isPropagationStopped())break t;f=b,u.currentTarget=j;try{f(u)}catch(ot){ru(ot)}u.currentTarget=null,f=O}else for(_=0;_<o.length;_++){if(b=o[_],O=b.instance,j=b.currentTarget,b=b.listener,O!==f&&u.isPropagationStopped())break t;f=b,u.currentTarget=j;try{f(u)}catch(ot){ru(ot)}u.currentTarget=null,f=O}}}}function we(t,n){var a=n[le];a===void 0&&(a=n[le]=new Set);var o=t+"__bubble";a.has(o)||(oS(n,t,2,!1),a.add(o))}function gm(t,n,a){var o=0;n&&(o|=4),oS(a,t,o,n)}var af="_reactListening"+Math.random().toString(36).slice(2);function vm(t){if(!t[af]){t[af]=!0,Ye.forEach(function(a){a!=="selectionchange"&&(w2.has(a)||gm(a,!1,t),gm(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[af]||(n[af]=!0,gm("selectionchange",!1,n))}}function oS(t,n,a,o){switch(jS(n)){case 2:var u=xC;break;case 8:u=MC;break;default:u=Im}a=u.bind(null,n,a,t),u=void 0,!bd||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function _m(t,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var _=o.tag;if(_===3||_===4){var b=o.stateNode.containerInfo;if(b===u)break;if(_===4)for(_=o.return;_!==null;){var O=_.tag;if((O===3||O===4)&&_.stateNode.containerInfo===u)return;_=_.return}for(;b!==null;){if(_=Be(b),_===null)return;if(O=_.tag,O===5||O===6||O===26||O===27){o=f=_;continue t}b=b.parentNode}}o=o.return}ov(function(){var j=f,ot=Ed(a),St=[];t:{var W=zv.get(t);if(W!==void 0){var at=nu,Wt=t;switch(t){case"keypress":if(tu(a)===0)break t;case"keydown":case"keyup":at=dR;break;case"focusin":Wt="focus",at=wd;break;case"focusout":Wt="blur",at=wd;break;case"beforeblur":case"afterblur":at=wd;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":at=uv;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":at=eR;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":at=_R;break;case Uv:case Nv:case Lv:at=aR;break;case Ov:at=SR;break;case"scroll":case"scrollend":at=$A;break;case"wheel":at=MR;break;case"copy":case"cut":case"paste":at=sR;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":at=hv;break;case"submit":at=gR;break;case"toggle":case"beforetoggle":at=TR}var re=(n&4)!==0,Se=!re&&(t==="scroll"||t==="scrollend"),K=re?W!==null?W+"Capture":null:W;re=[];for(var k=j,it;k!==null;){var _t=k;if(it=_t.stateNode,_t=_t.tag,_t!==5&&_t!==26&&_t!==27||it===null||K===null||(_t=Sl(k,K),_t!=null&&re.push($l(k,_t,it))),Se)break;k=k.return}0<re.length&&(W=new at(W,Wt,null,a,ot),St.push({event:W,listeners:re}))}}if((n&7)===0){t:{if(at=t==="mouseover"||t==="pointerover",W=t==="mouseout"||t==="pointerout",at&&a!==Md&&(Wt=a.relatedTarget||a.fromElement)&&(Be(Wt)||Wt[he]))break t;(W||at)&&(Wt=ot.window===ot?ot:(at=ot.ownerDocument)?at.defaultView||at.parentWindow:window,W?(at=a.relatedTarget||a.toElement,W=j,at=at?Be(at):null,at!==null&&(Se=c(at),re=at.tag,at!==Se||re!==5&&re!==27&&re!==6)&&(at=null)):(W=null,at=j),W!==at&&(re=uv,_t="onMouseLeave",K="onMouseEnter",k="mouse",(t==="pointerout"||t==="pointerover")&&(re=hv,_t="onPointerLeave",K="onPointerEnter",k="pointer"),Se=W==null?Wt:un(W),it=at==null?Wt:un(at),Wt=new re(_t,k+"leave",W,a,ot),Wt.target=Se,Wt.relatedTarget=it,_t=null,Be(ot)===j&&(re=new re(K,k+"enter",at,a,ot),re.target=it,re.relatedTarget=Se,_t=re),Se=_t,re=W&&at?B(W,at,D2):null,W!==null&&lS(St,Wt,W,re,!1),at!==null&&Se!==null&&lS(St,Se,at,re,!0)))}t:{if(W=j?un(j):window,at=W.nodeName&&W.nodeName.toLowerCase(),at==="select"||at==="input"&&W.type==="file")var te=Sv;else if(_v(W))if(xv)te=OR;else{te=NR;var Le=UR}else at=W.nodeName,!at||at.toLowerCase()!=="input"||W.type!=="checkbox"&&W.type!=="radio"?j&&ga(j.elementType)&&(te=Sv):te=LR;if(te&&(te=te(t,j))){yv(St,te,a,ot);break t}Le&&Le(t,W,j)}switch(Le=j?un(j):window,t){case"focusin":(_v(Le)||Le.contentEditable==="true")&&(uo=Le,Pd=j,Cl=null);break;case"focusout":Cl=Pd=uo=null;break;case"mousedown":Id=!0;break;case"contextmenu":case"mouseup":case"dragend":Id=!1,wv(St,a,ot);break;case"selectionchange":if(PR)break;case"keydown":case"keyup":wv(St,a,ot)}var ue;if(Ud)t:{switch(t){case"compositionstart":var pe="onCompositionStart";break t;case"compositionend":pe="onCompositionEnd";break t;case"compositionupdate":pe="onCompositionUpdate";break t}pe=void 0}else co?gv(t,a)&&(pe="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(pe="onCompositionStart");pe&&(dv&&a.locale!=="ko"&&(co||pe!=="onCompositionStart"?pe==="onCompositionEnd"&&co&&(ue=lv()):(_r=ot,Ad="value"in _r?_r.value:_r.textContent,co=!0)),Le=rf(j,pe),0<Le.length&&(pe=new fv(pe,t,null,a,ot),St.push({event:pe,listeners:Le}),ue?pe.data=ue:(ue=vv(a),ue!==null&&(pe.data=ue)))),(ue=AR?RR(t,a):CR(t,a))&&(pe=rf(j,"onBeforeInput"),0<pe.length&&(Le=new fv("onBeforeInput","beforeinput",null,a,ot),St.push({event:Le,listeners:pe}),Le.data=ue)),A2(St,t,j,a,ot)}sS(St,n)})}function $l(t,n,a){return{instance:t,listener:n,currentTarget:a}}function rf(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=Sl(t,a),u!=null&&o.unshift($l(t,u,f)),u=Sl(t,n),u!=null&&o.push($l(t,u,f))),t.tag===3)return o;t=t.return}return[]}function D2(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function lS(t,n,a,o,u){for(var f=n._reactName,_=[];a!==null&&a!==o;){var b=a,O=b.alternate,j=b.stateNode;if(b=b.tag,O!==null&&O===o)break;b!==5&&b!==26&&b!==27||j===null||(O=j,u?(j=Sl(a,f),j!=null&&_.unshift($l(a,j,O))):u||(j=Sl(a,f),j!=null&&_.push($l(a,j,O)))),a=a.return}_.length!==0&&t.push({event:n,listeners:_})}var U2=/\r\n?/g,N2=/\u0000|\uFFFD/g;function cS(t){return(typeof t=="string"?t:""+t).replace(U2,`
`).replace(N2,"")}function uS(t,n){return n=cS(n),cS(t)===n}function Ke(t,n,a,o,u,f){switch(a){case"children":if(typeof o=="string")n==="body"||n==="textarea"&&o===""||ls(t,o);else if(typeof o=="number"||typeof o=="bigint")n!=="body"&&ls(t,""+o);else return;break;case"className":tn(t,"class",o);break;case"tabIndex":tn(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":tn(t,a,o);break;case"style":Jc(t,o,f);return;case"data":if(n!=="object"){tn(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=vr(o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Ke(t,n,"name",u.name,u,null),Ke(t,n,"formEncType",u.formEncType,u,null),Ke(t,n,"formMethod",u.formMethod,u,null),Ke(t,n,"formTarget",u.formTarget,u,null)):(Ke(t,n,"encType",u.encType,u,null),Ke(t,n,"method",u.method,u,null),Ke(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=vr(o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=di);return;case"onScroll":o!=null&&we("scroll",t);return;case"onScrollEnd":o!=null&&we("scrollend",t);return;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));f?.__html!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=vr(o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":we("beforetoggle",t),we("toggle",t),ze(t,"popover",o);break;case"xlinkActuate":$n(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":$n(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":$n(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":$n(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":$n(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":$n(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":$n(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":$n(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":$n(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":ze(t,"is",o);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=_l.get(a)||a,ze(t,a,o);else return}Ft=!0}function ym(t,n,a,o,u,f){switch(a){case"style":Jc(t,o,f);return;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));f?.__html!==a&&(t.innerHTML=a)}}break;case"children":if(typeof o=="string")ls(t,o);else if(typeof o=="number"||typeof o=="bigint")ls(t,""+o);else return;break;case"onScroll":o!=null&&we("scroll",t);return;case"onScrollEnd":o!=null&&we("scrollend",t);return;case"onClick":o!=null&&(t.onclick=di);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!mn.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),f=a.slice(2,u?a.length-7:void 0),n=t[Jt]||null,n=n!=null?n[a]:null,typeof n=="function"&&t.removeEventListener(f,n,u),typeof o=="function")){typeof n!="function"&&n!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(f,o,u);break t}Ft=!0,a in t?t[a]=o:o===!0?t.setAttribute(a,""):ze(t,a,o)}return}Ft=!0}function Wn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":we("error",t),we("load",t);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var _=a[f];if(_!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Ke(t,n,f,_,a,null)}}u&&Ke(t,n,"srcSet",a.srcSet,a,null),o&&Ke(t,n,"src",a.src,a,null);return;case"input":we("invalid",t);var b=f=_=u=null,O=null,j=null;for(o in a)if(a.hasOwnProperty(o)){var ot=a[o];if(ot!=null)switch(o){case"name":u=ot;break;case"type":_=ot;break;case"checked":O=ot;break;case"defaultChecked":j=ot;break;case"value":f=ot;break;case"defaultValue":b=ot;break;case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(r(137,n));break;default:Ke(t,n,o,ot,a,null)}}os(t,f,b,O,j,_,u,!1);return;case"select":we("invalid",t),o=_=f=null;for(u in a)if(a.hasOwnProperty(u)&&(b=a[u],b!=null))switch(u){case"value":f=b;break;case"defaultValue":_=b;break;case"multiple":o=b;default:Ke(t,n,u,b,a,null)}n=f,a=_,t.multiple=!!o,n!=null?Gn(t,!!o,n,!1):a!=null&&Gn(t,!!o,a,!0);return;case"textarea":we("invalid",t),f=u=o=null;for(_ in a)if(a.hasOwnProperty(_)&&(b=a[_],b!=null))switch(_){case"value":o=b;break;case"defaultValue":u=b;break;case"children":f=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(r(91));break;default:Ke(t,n,_,b,a,null)}Pi(t,o,u,f);return;case"option":for(O in a)a.hasOwnProperty(O)&&(o=a[O],o!=null)&&(O==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":Ke(t,n,O,o,a,null));return;case"dialog":we("beforetoggle",t),we("toggle",t),we("cancel",t),we("close",t);break;case"iframe":case"object":we("load",t);break;case"video":case"audio":for(o=0;o<Jl.length;o++)we(Jl[o],t);break;case"image":we("error",t),we("load",t);break;case"details":we("toggle",t);break;case"embed":case"source":case"link":we("error",t),we("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(j in a)if(a.hasOwnProperty(j)&&(o=a[j],o!=null))switch(j){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Ke(t,n,j,o,a,null)}return;default:if(ga(n)){for(ot in a)a.hasOwnProperty(ot)&&(o=a[ot],o!==void 0&&ym(t,n,ot,o,a,void 0));return}}for(b in a)a.hasOwnProperty(b)&&(o=a[b],o!=null&&Ke(t,n,b,o,a,null))}var L2={};function O2(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,_=null,b=null,O=null,j=null,ot=null;for(at in a){var St=a[at];if(a.hasOwnProperty(at)&&St!=null)switch(at){case"checked":break;case"value":break;case"defaultValue":O=St;default:o.hasOwnProperty(at)||Ke(t,n,at,null,o,St)}}for(var W in o){var at=o[W];if(St=a[W],o.hasOwnProperty(W)&&(at!=null||St!=null))switch(W){case"type":at!==St&&(Ft=!0),f=at;break;case"name":at!==St&&(Ft=!0),u=at;break;case"checked":at!==St&&(Ft=!0),j=at;break;case"defaultChecked":at!==St&&(Ft=!0),ot=at;break;case"value":at!==St&&(Ft=!0),_=at;break;case"defaultValue":at!==St&&(Ft=!0),b=at;break;case"children":case"dangerouslySetInnerHTML":if(at!=null)throw Error(r(137,n));break;default:at!==St&&Ke(t,n,W,at,o,St)}}hn(t,_,b,O,j,ot,f,u);return;case"select":at=_=b=W=null;for(f in a)if(O=a[f],a.hasOwnProperty(f)&&O!=null)switch(f){case"value":break;case"multiple":at=O;default:o.hasOwnProperty(f)||Ke(t,n,f,null,o,O)}for(u in o)if(f=o[u],O=a[u],o.hasOwnProperty(u)&&(f!=null||O!=null))switch(u){case"value":f!==O&&(Ft=!0),W=f;break;case"defaultValue":f!==O&&(Ft=!0),b=f;break;case"multiple":f!==O&&(Ft=!0),_=f;default:f!==O&&Ke(t,n,u,f,o,O)}n=b,a=_,o=at,W!=null?Gn(t,!!a,W,!1):!!o!=!!a&&(n!=null?Gn(t,!!a,n,!0):Gn(t,!!a,a?[]:"",!1));return;case"textarea":at=W=null;for(b in a)if(u=a[b],a.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:Ke(t,n,b,null,o,u)}for(_ in o)if(u=o[_],f=a[_],o.hasOwnProperty(_)&&(u!=null||f!=null))switch(_){case"value":u!==f&&(Ft=!0),W=u;break;case"defaultValue":u!==f&&(Ft=!0),at=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:u!==f&&Ke(t,n,_,u,o,f)}Qe(t,W,at);return;case"option":for(var Wt in a)W=a[Wt],a.hasOwnProperty(Wt)&&W!=null&&!o.hasOwnProperty(Wt)&&(Wt==="selected"?t.selected=!1:Ke(t,n,Wt,null,o,W));for(O in o)W=o[O],at=a[O],o.hasOwnProperty(O)&&W!==at&&(W!=null||at!=null)&&(O==="selected"?(W!==at&&(Ft=!0),t.selected=W&&typeof W!="function"&&typeof W!="symbol"):Ke(t,n,O,W,o,at));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var re in a)W=a[re],a.hasOwnProperty(re)&&W!=null&&!o.hasOwnProperty(re)&&Ke(t,n,re,null,o,W);for(j in o)if(W=o[j],at=a[j],o.hasOwnProperty(j)&&W!==at&&(W!=null||at!=null))switch(j){case"children":case"dangerouslySetInnerHTML":if(W!=null)throw Error(r(137,n));break;default:Ke(t,n,j,W,o,at)}return;default:if(ga(n)){for(var Se in a)W=a[Se],a.hasOwnProperty(Se)&&W!==void 0&&!o.hasOwnProperty(Se)&&ym(t,n,Se,void 0,o,W);for(ot in o)W=o[ot],at=a[ot],!o.hasOwnProperty(ot)||W===at||W===void 0&&at===void 0||ym(t,n,ot,W,o,at);return}}for(var K in a)W=a[K],a.hasOwnProperty(K)&&W!=null&&!o.hasOwnProperty(K)&&Ke(t,n,K,null,o,W);for(St in o)W=o[St],at=a[St],!o.hasOwnProperty(St)||W===at||W==null&&at==null||Ke(t,n,St,W,o,at)}function fS(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function z2(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,_=u.initiatorType,b=u.duration;if(f&&b&&fS(_)){for(_=0,b=u.responseEnd,o+=1;o<a.length;o++){var O=a[o],j=O.startTime;if(j>b)break;var ot=O.transferSize,St=O.initiatorType;ot&&fS(St)&&(O=O.responseEnd,_+=ot*(O<b?1:(b-j)/(O-j)))}if(--o,n+=8*(f+_)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Sm=null,xm=null;function tc(t){return t.nodeType===9?t:t.ownerDocument}function hS(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function dS(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function pS(t,n,a,o){return a=tc(a).createElement(t),a[Gt]=o,a[Jt]=n,Wn(a,t,n),Fe(a),a}function Mm(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Em=null;function P2(){var t=window.event;return t&&t.type==="popstate"?t===Em?!1:(Em=t,!0):(Em=null,!1)}var Tm=typeof setTimeout=="function"?setTimeout:void 0,I2=typeof clearTimeout=="function"?clearTimeout:void 0,mS=typeof Promise=="function"?Promise:void 0,gS=typeof requestAnimationFrame=="function"?requestAnimationFrame:Tm,B2=typeof queueMicrotask=="function"?queueMicrotask:typeof mS<"u"?function(t){return mS.resolve(null).then(t).catch(F2)}:Tm;function F2(t){setTimeout(function(){throw t})}function Br(t){return t==="head"}function vS(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),ko(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Nm(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Nm(a);for(var f=a.firstChild;f;){var _=f.nextSibling,b=f.nodeName;f[Ie]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=_}}else a==="body"&&Nm(t.ownerDocument.body);a=u}while(a);ko(n)}function _S(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function yS(t,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,t.style.viewTransitionName=n,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(n=t.getClientRects(),n.length===1)var o=1;else for(var u=o=0;u<n.length;u++){var f=n[u];0<f.width&&0<f.height&&o++}o===1&&(t=t.style,t.display=n.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function SS(t,n){t=t.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(n==null?t.display=t.margin="":(a=n.display,t.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?t.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],t.marginBottom=n==null||typeof n=="boolean"?"":n)))}function H2(t,n,a){return a=a.ownerDocument.defaultView,{rect:t,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function bm(t){var n=t.getBoundingClientRect(),a=getComputedStyle(t);return H2(n,a,t)}function V2(t){return t.documentElement.clientHeight}function G2(t){this.addEventListener("load",t),this.addEventListener("error",t)}function X2(t,n,a,o,u,f,_,b,O){var j=n.nodeType===9?n:n.ownerDocument;try{var ot=j.startViewTransition({update:function(){var W=j.defaultView,at=W.navigation&&W.navigation.transition,Wt=j.fonts.status;o();var re=[];if(Wt==="loaded"&&(V2(j),j.fonts.status==="loading"&&re.push(j.fonts.ready)),Wt=re.length,t!==null)for(var Se=t.suspenseyImages,K=0,k=0;k<Se.length;k++){var it=Se[k];if(!it.complete){var _t=it.getBoundingClientRect();if(0<_t.bottom&&0<_t.right&&_t.top<W.innerHeight&&_t.left<W.innerWidth){if(K+=VS(it),K>lf){re.length=Wt;break}it=new Promise(G2.bind(it)),re.push(it)}}}if(0<re.length)return W=Promise.race([Promise.all(re),new Promise(function(te){return setTimeout(te,500)})]).then(u,u),(at?Promise.allSettled([at.finished,W]):W).then(f,f);if(u(),at)return at.finished.then(f,f);f()},types:a});j.__reactViewTransition=ot;var St=[];return ot.ready.then(function(){for(var W=j.documentElement.getAnimations({subtree:!0}),at=0;at<W.length;at++){var Wt=W[at],re=Wt.effect,Se=re.pseudoElement;if(Se!=null&&Se.startsWith("::view-transition")){St.push(Wt),Wt=re.getKeyframes();for(var K=Se=void 0,k=!0,it=0;it<Wt.length;it++){var _t=Wt[it],te=_t.width;if(Se===void 0)Se=te;else if(Se!==te){k=!1;break}if(te=_t.height,K===void 0)K=te;else if(K!==te){k=!1;break}delete _t.width,delete _t.height,_t.transform==="none"&&delete _t.transform}k&&Se!==void 0&&K!==void 0&&(re.setKeyframes(Wt),k=getComputedStyle(re.target,re.pseudoElement),k.width!==Se||k.height!==K)&&(k=Wt[0],k.width=Se,k.height=K,k=Wt[Wt.length-1],k.width=Se,k.height=K,re.setKeyframes(Wt))}}_()},function(W){j.__reactViewTransition===ot&&(j.__reactViewTransition=null);try{typeof W=="object"&&W!==null&&W.name==="InvalidStateError"&&(W.message==="View transition was skipped because document visibility state is hidden."||W.message==="Skipping view transition because document visibility state has become hidden."||W.message==="Skipping view transition because viewport size changed."||W.message==="Transition was aborted because of invalid state")&&(W=null),W!==null&&O(W)}finally{o(),u(),_()}}),ot.finished.finally(function(){for(var W=0;W<St.length;W++)St[W].cancel();j.__reactViewTransition===ot&&(j.__reactViewTransition=null),b()}),ot}catch{return o(),u(),_(),null}}function Cs(t,n){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+n+")"}Cs.prototype.animate=function(t,n){return n=typeof n=="number"?{duration:n}:P({},n),n.pseudoElement=this._selector,this._scope.animate(t,n)},Cs.prototype.getAnimations=function(){for(var t=this._scope,n=this._selector,a=t.getAnimations({subtree:!0}),o=[],u=0;u<a.length;u++){var f=a[u].effect;f!==null&&f.target===t&&f.pseudoElement===n&&o.push(a[u])}return o},Cs.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function xS(t){return{name:t,group:new Cs("group",t),imagePair:new Cs("image-pair",t),old:new Cs("old",t),new:new Cs("new",t)}}function Di(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}Di.prototype.addEventListener=function(t,n,a){var o=null,u=null;if(!(a!=null&&typeof a!="boolean"&&(o=a.signal||null,o!==null&&o.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var f=this._eventListeners;if(ES(f,t,n,a)===-1){var _=this,b=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(b=function(O){_.removeEventListener(t,n,a),typeof n=="function"?n.call(this,O):n.handleEvent(O)}),o!==null&&(u=_.removeEventListener.bind(_,t,n,a),o.addEventListener("abort",u,{once:!0}),u=o.removeEventListener.bind(o,"abort",u)),o=Bo(a),f.push({type:t,listener:n,optionsOrUseCapture:a,attachedListener:b,cleanup:u}),g(this._fragmentFiber.child,!1,k2,t,b,o)}this._eventListeners=f}};function k2(t,n,a,o){return M(t).addEventListener(n,a,o),!1}Di.prototype.removeEventListener=function(t,n,a){var o=this._eventListeners;if(o!==null&&(n=ES(o,t,n,a),n!==-1)){var u=o[n];a=u.attachedListener;var f=u.cleanup;u=Bo(u.optionsOrUseCapture),g(this._fragmentFiber.child,!1,q2,t,a,u),o.splice(n,1),f!==null&&f()}};function q2(t,n,a,o){return M(t).removeEventListener(n,a,o),!1}function Bo(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function MS(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function ES(t,n,a,o){if(t.length===0)return-1;o=MS(o);for(var u=0;u<t.length;u++){var f=t[u];if(f.type===n&&f.listener===a&&MS(f.optionsOrUseCapture)===o)return u}return-1}Di.prototype.dispatchEvent=function(t){var n=y(this._fragmentFiber);if(n===null)return!0;n=M(n);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var o=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var u=0;u<a.length;u++){var f=a[u];o.addEventListener(f.type,f.attachedListener,Bo(f.optionsOrUseCapture))}if(n.appendChild(o),t=o.dispatchEvent(t),a)for(u=0;u<a.length;u++)f=a[u],o.removeEventListener(f.type,f.attachedListener,Bo(f.optionsOrUseCapture));return n.removeChild(o),t}return n.dispatchEvent(t)},Di.prototype.focus=function(t){g(this._fragmentFiber.child,!0,TS,t,void 0,void 0)};function TS(t,n){return t.tag===6?!1:(t=M(t),iC(t,n))}Di.prototype.focusLast=function(t){var n=[];g(this._fragmentFiber.child,!0,Am,n,void 0,void 0);for(var a=n.length-1;0<=a&&!TS(n[a],t);a--);};function Am(t,n){return n.push(t),!1}Di.prototype.blur=function(){var t=y(this._fragmentFiber);t!==null&&(t=M(t),t=tc(t).activeElement,t!==null&&g(this._fragmentFiber.child,!1,Y2,t,void 0,void 0))};function Y2(t,n){return t.tag===6?!1:(t=M(t),t===n||t.contains(n)?(n.blur(),!0):!1)}Di.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),g(this._fragmentFiber.child,!1,W2,t,void 0,void 0)};function W2(t,n){return t.tag===6||(t=M(t),n.observe(t)),!1}Di.prototype.unobserveUsing=function(t){var n=this._observers;if(n!==null&&n.has(t)){n.delete(t),g(this._fragmentFiber.child,!1,Z2,t,void 0,void 0);for(var a=n=0;a<ca.length;a++){var o=ca[a];o.fragmentInstance===this&&o.observer===t?t.unobserve(o.instance):ca[n++]=o}ca.length=n}};function Z2(t,n){return t.tag===6||(t=M(t),n.unobserve(t)),!1}var ca=[],Rm=!1;function K2(t,n,a){ca.push({fragmentInstance:t,observer:n,instance:a}),Rm||(Rm=!0,aC(function(){Rm=!1;var o=ca;ca=[];for(var u=0;u<o.length;u++){var f=o[u];f.observer.unobserve(f.instance)}}))}Di.prototype.getClientRects=function(){var t=[];return g(this._fragmentFiber.child,!1,j2,t,void 0,void 0),t};function j2(t,n){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),n.push.apply(n,a.getClientRects())}else t=M(t),n.push.apply(n,t.getClientRects());return!1}Di.prototype.getRootNode=function(t){var n=y(this._fragmentFiber);return n===null?this:M(n).getRootNode(t)},Di.prototype.compareDocumentPosition=function(t){var n=y(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];g(this._fragmentFiber.child,!1,Am,a,void 0,void 0);var o=M(n);if(a.length===0){if(a=o,x(this._fragmentFiber)){t:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break t}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var u=o=a.compareDocumentPosition(t);return a===t?u=Node.DOCUMENT_POSITION_CONTAINS:o&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=E(n)[1],a===null?u=Node.DOCUMENT_POSITION_PRECEDING:(t=M(a).compareDocumentPosition(t),u=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),u|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=M(a[0]),u=M(a[a.length-1]);var f=x(this._fragmentFiber)?n.parentElement:o;if(f==null)return Node.DOCUMENT_POSITION_DISCONNECTED;o=f.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,f=f.compareDocumentPosition(u)&Node.DOCUMENT_POSITION_CONTAINED_BY;var _=n.compareDocumentPosition(t),b=u.compareDocumentPosition(t),O=_&Node.DOCUMENT_POSITION_CONTAINED_BY||b&Node.DOCUMENT_POSITION_CONTAINED_BY;return b=o&&f&&_&Node.DOCUMENT_POSITION_FOLLOWING&&b&Node.DOCUMENT_POSITION_PRECEDING,n=o&&n===t||f&&u===t||O||b?Node.DOCUMENT_POSITION_CONTAINED_BY:!o&&n===t||!f&&u===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:_,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Q2(n,this._fragmentFiber,a[0],a[a.length-1],t)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Q2(t,n,a,o,u){var f=Be(u);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!f)t:{for(;f!==null;){if(f.tag===7&&(f===n||f.alternate===n)){a=!0;break t}f=f.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(f===null)return f=u.ownerDocument,u===f||u===f.documentElement||u===f.body;t:{for(f=n,n=y(n);f!==null;){if(!(f.tag!==5&&f.tag!==3&&f.tag!==27||f!==n&&f.alternate!==n)){f=!0;break t}f=f.return}f=!1}return f}return t&Node.DOCUMENT_POSITION_PRECEDING?((n=!!f)&&!(n=f===a)&&(n=B(a,f,G),n===null?n=!1:(g(n,!0,N,f,a),f=S,S=null,n=f!==null)),n):t&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!f)&&!(n=f===o)&&(n=B(o,f,G),n===null?n=!1:(g(n,!0,w,f,o),f=S,L=S=null,n=f!==null)),n):!1}function bS(t,n){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,n?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}Di.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(r(566));var n=[];g(this._fragmentFiber.child,!1,Am,n,void 0,void 0);var a=t!==!1;if(n.length===0){var o=E(this._fragmentFiber);if(o=a?o[1]||o[0]||y(this._fragmentFiber):o[0]||o[1],o===null)return;if(o.tag===6){t=M(o),bS(t,a);return}if(o=M(o),o.nodeType!==9){if(o.nodeType===11){a="host"in o?o.host:null,a!==null&&a.scrollIntoView(t);return}o.scrollIntoView(t)}}for(o=a?n.length-1:0;o!==(a?-1:n.length);){var u=n[o];u.tag===6?(u=M(u),bS(u,a)):M(u).scrollIntoView(t),o+=a?-1:1}};function J2(t,n){return t=M(t),AS(t,n),!1}function AS(t,n){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(n)}function RS(t,n){var a=n._eventListeners;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o];t.addEventListener(u.type,u.attachedListener,Bo(u.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(f){for(var _=0,b=0;b<ca.length;b++){var O=ca[b];(O.fragmentInstance!==n||O.observer!==f||O.instance!==t)&&(ca[_++]=O)}ca.length=_,f.observe(t)}),AS(t,n))}function $2(t,n){var a=n._eventListeners;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o];t.removeEventListener(u.type,u.attachedListener,Bo(u.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(f){typeof f.rootMargin=="string"?K2(n,f,t):f.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(n))}function Cm(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Cm(a),oe(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function tC(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[Ie])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(f=t.getAttribute("rel"),f==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(f!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(f=t.getAttribute("src"),(f!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===f)return t}else return t;if(t=Xi(t.nextSibling),t===null)break}return null}function eC(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Xi(t.nextSibling),t===null))return null;return t}function CS(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Xi(t.nextSibling),t===null))return null;return t}function wm(t){return t.data==="$?"||t.data==="$~"}function Dm(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function nC(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function Xi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Um=null;function wS(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Xi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function DS(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function iC(t,n){function a(){o=!0}if(t.ownerDocument.activeElement===t)return!0;var o=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,n)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return o}function aC(t){gS(function(){gS(function(n){return t(n)})})}function US(t,n,a){switch(n=tc(a),t){case"html":if(t=n.documentElement,!t)throw Error(r(452));return t;case"head":if(t=n.head,!t)throw Error(r(453));return t;case"body":if(t=n.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function NS(t,n,a){for(var o in a){var u=a[o];a.hasOwnProperty(o)&&u!=null&&Ke(t,n,o,null,L2,u)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===di&&(t.onclick=null),oe(t)}function Nm(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);oe(t)}var ki=new Map,LS=new Set;function ec(t){if(typeof t.getRootNode=="function"){var n=t.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return t.nodeType===9?t:t.ownerDocument}var nr=Ht.d;Ht.d={f:rC,r:sC,D:oC,C:lC,L:cC,m:uC,X:hC,S:fC,M:dC};function rC(){var t=nr.f(),n=Ju();return t||n}function sC(t){var n=_e(t);n!==null&&n.tag===5&&n.type==="form"?z_(n):nr.r(t)}var Fo=typeof document>"u"?null:document;function OS(t,n,a){var o=Fo;if(o&&typeof n=="string"&&n){var u=Vn(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),LS.has(u)||(LS.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Wn(n,"link",t),Fe(n),o.head.appendChild(n)))}}function oC(t){nr.D(t),OS("dns-prefetch",t,null)}function lC(t,n){nr.C(t,n),OS("preconnect",t,n)}function cC(t,n,a){nr.L(t,n,a);var o=Fo;if(o&&t&&n){var u='link[rel="preload"][as="'+Vn(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Vn(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Vn(a.imageSizes)+'"]')):u+='[href="'+Vn(t)+'"]';var f=u;switch(n){case"style":f=Ho(t);break;case"script":f=Vo(t)}if(!(ki.has(f)||(t=P({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),ki.set(f,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(nc(f))||n==="script"&&o.querySelector(ic(f))))){var _=o.createElement("link");Wn(_,"link",t),n==="style"&&(_[Oe]=!0,_.onload=_.onerror=function(){na(_)}),Fe(_),o.head.appendChild(_)}}}function uC(t,n){nr.m(t,n);var a=Fo;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Vn(o)+'"][href="'+Vn(t)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=Vo(t)}if(!ki.has(f)&&(t=P({rel:"modulepreload",href:t},n),ki.set(f,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(ic(f)))return}o=a.createElement("link"),Wn(o,"link",t),Fe(o),a.head.appendChild(o)}}}function fC(t,n,a){nr.S(t,n,a);var o=Fo;if(o&&t){var u=Hn(o).hoistableStyles,f=Ho(t);n=n||"default";var _=u.get(f);if(!_){var b={loading:0,preload:null};if(_=o.querySelector(nc(f)))b.loading=5;else{t=P({rel:"stylesheet",href:t,"data-precedence":n},a),(a=ki.get(f))&&Lm(t,a);var O=_=o.createElement("link");Fe(O),Wn(O,"link",t),O._p=new Promise(function(j,ot){O.onload=j,O.onerror=ot}),O.addEventListener("load",function(){b.loading|=1}),O.addEventListener("error",function(){b.loading|=2}),b.loading|=4,sf(_,n,o)}_={type:"stylesheet",instance:_,count:1,state:b},u.set(f,_)}}}function hC(t,n){nr.X(t,n);var a=Fo;if(a&&t){var o=Hn(a).hoistableScripts,u=Vo(t),f=o.get(u);f||(f=a.querySelector(ic(u)),f||(t=P({src:t,async:!0},n),(n=ki.get(u))&&Om(t,n),f=a.createElement("script"),Fe(f),Wn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function dC(t,n){nr.M(t,n);var a=Fo;if(a&&t){var o=Hn(a).hoistableScripts,u=Vo(t),f=o.get(u);f||(f=a.querySelector(ic(u)),f||(t=P({src:t,async:!0,type:"module"},n),(n=ki.get(u))&&Om(t,n),f=a.createElement("script"),Fe(f),Wn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function zS(t,n,a,o){var u=(u=fe.current)?ec(u):null;if(!u)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=Ho(a.href),n=Hn(u).hoistableStyles,o=n.get(a),o||(o={type:"style",instance:null,count:0,state:null},n.set(a,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Ho(a.href);var f=Hn(u).hoistableStyles,_=f.get(t);if(_||(u=u.ownerDocument||u,_={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(t,_),(f=u.querySelector(nc(t)))?f._p||(_.instance=f,_.state.loading=5):(f=ki.get(t),f||(f={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},ki.set(t,f)),pC(u,t,f,_.state))),n&&o===null)throw Error(r(528,""));return _}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=Vo(a),n=Hn(u).hoistableScripts,o=n.get(a),o||(o={type:"script",instance:null,count:0,state:null},n.set(a,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function Ho(t){return'href="'+Vn(t)+'"'}function nc(t){return'link[rel="stylesheet"]['+t+"]"}function PS(t){return P({},t,{"data-precedence":t.precedence,precedence:null})}function pC(t,n,a,o){if(n=t.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[Oe]!==!0){o.loading=1;return}}else n=t.createElement("link"),n[Oe]=!0,n.onload=n.onerror=na.bind(null,n),Wn(n,"link",a),Fe(n),t.head.appendChild(n);o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2})}function Vo(t){return'[src="'+Vn(t)+'"]'}function ic(t){return"script[async]"+t}function IS(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+Vn(a.href)+'"]');if(o)return n.instance=o,Fe(o),o;var u=P({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),Fe(o),Wn(o,"style",u),sf(o,a.precedence,t),n.instance=o;case"stylesheet":u=Ho(a.href);var f=t.querySelector(nc(u));if(f)return n.state.loading|=4,n.instance=f,Fe(f),f;o=PS(a),(u=ki.get(u))&&Lm(o,u),f=(t.ownerDocument||t).createElement("link"),Fe(f);var _=f;return _._p=new Promise(function(b,O){_.onload=b,_.onerror=O}),Wn(f,"link",o),n.state.loading|=4,sf(f,a.precedence,t),n.instance=f;case"script":return f=Vo(a.src),(u=t.querySelector(ic(f)))?(n.instance=u,Fe(u),u):(o=a,(u=ki.get(f))&&(o=P({},a),Om(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),Fe(u),Wn(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,sf(o,a.precedence,t));return n.instance}function sf(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,_=0;_<o.length;_++){var b=o[_];if(b.dataset.precedence===n)f=b;else if(f!==u)break}f?f.parentNode.insertBefore(t,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function Lm(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Om(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var of=null;function BS(t,n,a){if(of===null){var o=new Map,u=of=new Map;u.set(a,o)}else u=of,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var f=a[u];if(!(f[Ie]||f[Gt]||t==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var _=f.getAttribute(n)||"";_=t+_;var b=o.get(_);b?b.push(f):o.set(_,[f])}}return o}function zm(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function mC(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function FS(t,n){return t==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function HS(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function VS(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function GS(t,n){typeof n.decode=="function"&&(t.imgCount++,n.complete||(t.imgBytes+=VS(n),t.suspenseyImages.push(n)),t=_C.bind(t),n.decode().then(t,t))}function gC(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=Ho(o.href),f=n.querySelector(nc(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=ac.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=f,Fe(f);return}f=n.ownerDocument||n,o=PS(o),(u=ki.get(u))&&Lm(o,u),f=f.createElement("link"),Fe(f);var _=f;_._p=new Promise(function(b,O){_.onload=b,_.onerror=O}),Wn(f,"link",o),a.instance=f}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=ac.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var lf=0;function vC(t,n){return t.stylesheets&&t.count===0&&uf(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&uf(t,t.stylesheets),t.unsuspend){var f=t.unsuspend;t.unsuspend=null,f()}},6e4+n);0<t.imgBytes&&lf===0&&(lf=62500*z2());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&uf(t,t.stylesheets),t.unsuspend)){var f=t.unsuspend;t.unsuspend=null,f()}},(t.imgBytes>lf?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function XS(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)uf(t,t.stylesheets);else if(t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}}}function ac(){this.count--,XS(this)}function _C(){this.imgCount--,XS(this)}var cf=null;function uf(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,cf=new Map,n.forEach(yC,t),cf=null,ac.call(t))}function yC(t,n){if(!(n.state.loading&4)){var a=cf.get(t);if(a)var o=a.get(null);else{a=new Map,cf.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var _=u[f];(_.nodeName==="LINK"||_.getAttribute("media")!=="not all")&&(a.set(_.dataset.precedence,_),o=_)}o&&a.set(null,o)}u=n.instance,_=u.getAttribute("data-precedence"),f=a.get(_)||o,f===o&&a.set(null,u),a.set(_,u),this.count++,o=ac.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Go={$$typeof:Q,Provider:null,Consumer:null,_currentValue:z,_currentValue2:z,_threadCount:0};function SC(t,n,a,o,u,f,_,b,O){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ta(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ta(0),this.hiddenUpdates=ta(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=_,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=O,this.transitionTypes=null,this.incompleteTransitions=new Map}function kS(t,n,a,o,u,f,_,b,O,j,ot,St){return t=new SC(t,n,a,_,O,j,ot,St,b),n=1,f===!0&&(n|=24),f=pi(3,null,null,n),t.current=f,f.stateNode=t,n=jd(),n.refCount++,t.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},tp(f),t}function qS(t){return t?(t=po,t):po}function YS(t,n,a,o,u,f){u=qS(u),o.context===null?o.context=u:o.pendingContext=u,o=Ar(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=Rr(t,o,n),a!==null&&(_i(a,t,n),zl(a,t,n))}function WS(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function Pm(t,n){WS(t,n),(t=t.alternate)&&WS(t,n)}function ZS(t){if(t.tag===13||t.tag===31){var n=fs(t,67108864);n!==null&&_i(n,t,67108864),Pm(t,67108864)}}function KS(t){if(t.tag===13||t.tag===31){var n=wi();n=ut(n);var a=fs(t,n);a!==null&&_i(a,t,n),Pm(t,n)}}var Xo=!0;function xC(t,n,a,o){var u=Ut.T;Ut.T=null;var f=Ht.p;try{Ht.p=2,Im(t,n,a,o)}finally{Ht.p=f,Ut.T=u}}function MC(t,n,a,o){var u=Ut.T;Ut.T=null;var f=Ht.p;try{Ht.p=8,Im(t,n,a,o)}finally{Ht.p=f,Ut.T=u}}function Im(t,n,a,o){if(Xo){var u=Bm(o);if(u===null)_m(t,n,o,ff,a),QS(t,o);else if(TC(u,t,n,a,o))o.stopPropagation();else if(QS(t,o),n&4&&-1<EC.indexOf(t)){for(;u!==null;){var f=_e(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var _=Cn(f.pendingLanes);if(_!==0){var b=f;for(b.pendingLanes|=2,b.entangledLanes|=2;_;){var O=1<<31-an(_);b.entanglements[1]|=O,_&=~O}Aa(f),(Xe&6)===0&&(Ku=X()+500,Ql(0))}}break;case 31:case 13:b=fs(f,2),b!==null&&_i(b,f,2),Ju(),Pm(f,2)}if(f=Bm(o),f===null&&_m(t,n,o,ff,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else _m(t,n,o,null,a)}}function Bm(t){return t=Ed(t),Fm(t)}var ff=null;function Fm(t){if(ff=null,t=Be(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return ff=t,null}function jS(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(zt()){case Vt:return 2;case Mt:return 8;case Lt:case bt:return 32;case ne:return 268435456;default:return 32}default:return 32}}var Hm=!1,Fr=null,Hr=null,Vr=null,rc=new Map,sc=new Map,Gr=[],EC="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function QS(t,n){switch(t){case"focusin":case"focusout":Fr=null;break;case"dragenter":case"dragleave":Hr=null;break;case"mouseover":case"mouseout":Vr=null;break;case"pointerover":case"pointerout":rc.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":sc.delete(n.pointerId)}}function oc(t,n,a,o,u,f){return t===null||t.nativeEvent!==f?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=_e(n),n!==null&&ZS(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function TC(t,n,a,o,u){switch(n){case"focusin":return Fr=oc(Fr,t,n,a,o,u),!0;case"dragenter":return Hr=oc(Hr,t,n,a,o,u),!0;case"mouseover":return Vr=oc(Vr,t,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return rc.set(f,oc(rc.get(f)||null,t,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,sc.set(f,oc(sc.get(f)||null,t,n,a,o,u)),!0}return!1}function JS(t){var n=Be(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,kt(t.priority,function(){KS(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,kt(t.priority,function(){KS(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function hf(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=Bm(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);Md=o,a.target.dispatchEvent(o),Md=null}else return n=_e(a),n!==null&&ZS(n),t.blockedOn=a,!1;n.shift()}return!0}function $S(t,n,a){hf(t)&&a.delete(n)}function bC(){Hm=!1,Fr!==null&&hf(Fr)&&(Fr=null),Hr!==null&&hf(Hr)&&(Hr=null),Vr!==null&&hf(Vr)&&(Vr=null),rc.forEach($S),sc.forEach($S)}function df(t,n){t.blockedOn===n&&(t.blockedOn=null,Hm||(Hm=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,bC)))}var pf=null;function tx(t){pf!==t&&(pf=t,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){pf===t&&(pf=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(Fm(o||a)===null)continue;break}var f=_e(a);f!==null&&(t.splice(n,3),n-=3,xp(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function ko(t){function n(O){return df(O,t)}Fr!==null&&df(Fr,t),Hr!==null&&df(Hr,t),Vr!==null&&df(Vr,t),rc.forEach(n),sc.forEach(n);for(var a=0;a<Gr.length;a++){var o=Gr[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<Gr.length&&(a=Gr[0],a.blockedOn===null);)JS(a),a.blockedOn===null&&Gr.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],_=u[Jt]||null;if(typeof f=="function")_||tx(a);else if(_){var b=null;if(f&&f.hasAttribute("formAction")){if(u=f,_=f[Jt]||null)b=_.formAction;else if(Fm(u)!==null)continue}else b=_.action;typeof b=="function"?a[o+1]=b:(a.splice(o,3),o-=3),tx(a)}}}function ex(){function t(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(_){return u=_})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function Vm(t){this._internalRoot=t}mf.prototype.render=Vm.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,o=wi();YS(a,o,t,n,null,null)},mf.prototype.unmount=Vm.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;YS(t.current,2,null,t,null,null),Ju(),n[he]=null}};function mf(t){this._internalRoot=t}mf.prototype.unstable_scheduleHydration=function(t){if(t){var n=Pt();t={blockedOn:null,target:t,priority:n};for(var a=0;a<Gr.length&&n!==0&&n<Gr[a].priority;a++);Gr.splice(a,0,t),a===0&&JS(t)}};var nx=e.version;if(nx!=="19.3.1")throw Error(r(527,nx,"19.3.1"));Ht.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=p(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var AC={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:Ut,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var gf=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!gf.isDisabled&&gf.supportsFiber)try{de=gf.inject(AC),Pe=gf}catch{}}return qo.createRoot=function(t,n){if(!l(t))throw Error(r(299));var a=!1,o="",u=q_,f=Y_,_=W_;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(_=n.onRecoverableError)),n=kS(t,1,!1,null,null,a,o,null,u,f,_,ex),t[he]=n.current,vm(t),new Vm(n)},qo.hydrateRoot=function(t,n,a){if(!l(t))throw Error(r(299));var o=!1,u="",f=q_,_=Y_,b=W_,O=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(_=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.formState!==void 0&&(O=a.formState)),n=kS(t,1,!0,n,a??null,o,u,O,f,_,b,ex),n.context=qS(null),a=n.current,o=wi(),o=ut(o),u=Ar(o),u.callback=null,Rr(a,u,o),a=o,n.current.lanes=a,ea(n,a),Aa(n),t[he]=n.current,vm(t),new mf(n)},qo.version="19.3.1",qo}var Qm;function cx(){if(Qm)return yf.exports;Qm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),yf.exports=lx(),yf.exports}var ux=cx(),fx=Km();const Ef="180",hx=0,Jm=1,dx=2,$m=1,px=2,Ra=3,ir=0,li=1,qi=2,ar=0,Ds=1,tg=2,eg=3,ng=4,mx=5,kr=100,gx=101,vx=102,_x=103,yx=104,Sx=200,xx=201,Mx=202,Ex=203,Tf=204,bf=205,Tx=206,bx=207,Ax=208,Rx=209,Cx=210,wx=211,Dx=212,Ux=213,Nx=214,Af=0,Rf=1,Cf=2,Us=3,wf=4,Df=5,Uf=6,Nf=7,ig=0,Lx=1,Ox=2,rr=0,zx=1,Px=2,Ix=3,Bx=4,Fx=5,Hx=6,ag=7,rg=300,Ns=301,Ls=302,Lf=303,Of=304,lc=306,sr=1e3,or=1001,zf=1002,yi=1003,Vx=1004,cc=1005,Ui=1006,Pf=1007,Ca=1008,ua=1009,sg=1010,og=1011,Yo=1012,If=1013,qr=1014,wa=1015,Wo=1016,Bf=1017,Ff=1018,Zo=1020,lg=35902,cg=35899,ug=1021,fg=1022,Yi=1023,Ko=1026,jo=1027,hg=1028,Hf=1029,dg=1030,Vf=1031,Gf=1033,uc=33776,fc=33777,hc=33778,dc=33779,Xf=35840,kf=35841,qf=35842,Yf=35843,Wf=36196,Zf=37492,Kf=37496,jf=37808,Qf=37809,Jf=37810,$f=37811,th=37812,eh=37813,nh=37814,ih=37815,ah=37816,rh=37817,sh=37818,oh=37819,lh=37820,ch=37821,uh=36492,fh=36494,hh=36495,dh=36283,ph=36284,mh=36285,gh=36286,Gx=3200,Xx=3201,pg=0,kx=1,lr="",ei="srgb",Os="srgb-linear",pc="linear",je="srgb",zs=7680,mg=519,qx=512,Yx=513,Wx=514,gg=515,Zx=516,Kx=517,jx=518,Qx=519,vg=35044,_g="300 es",fa=2e3,mc=2001;class Ps{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){const r=this._listeners;if(r===void 0)return;const l=r[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const r=i[e.type];if(r!==void 0){e.target=this;const l=r.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,e);e.target=null}}}const Zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vh=Math.PI/180,_h=180/Math.PI;function Is(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Zn[s&255]+Zn[s>>8&255]+Zn[s>>16&255]+Zn[s>>24&255]+"-"+Zn[e&255]+Zn[e>>8&255]+"-"+Zn[e>>16&15|64]+Zn[e>>24&255]+"-"+Zn[i&63|128]+Zn[i>>8&255]+"-"+Zn[i>>16&255]+Zn[i>>24&255]+Zn[r&255]+Zn[r>>8&255]+Zn[r>>16&255]+Zn[r>>24&255]).toLowerCase()}function Ae(s,e,i){return Math.max(e,Math.min(i,s))}function Jx(s,e){return(s%e+e)%e}function yh(s,e,i){return(1-i)*s+i*e}function Qo(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ci(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class qt{constructor(e=0,i=0){qt.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,r=this.y,l=e.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Ae(this.x,e.x,i.x),this.y=Ae(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Ae(this.x,e,i),this.y=Ae(this.y,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ae(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(Ae(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const r=Math.cos(i),l=Math.sin(i),c=this.x-e.x,h=this.y-e.y;return this.x=c*r-h*l+e.x,this.y=c*l+h*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Da{constructor(e=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=l}static slerpFlat(e,i,r,l,c,h,d){let m=r[l+0],p=r[l+1],v=r[l+2],g=r[l+3];const y=c[h+0],x=c[h+1],E=c[h+2],A=c[h+3];if(d===0){e[i+0]=m,e[i+1]=p,e[i+2]=v,e[i+3]=g;return}if(d===1){e[i+0]=y,e[i+1]=x,e[i+2]=E,e[i+3]=A;return}if(g!==A||m!==y||p!==x||v!==E){let M=1-d;const S=m*y+p*x+v*E+g*A,L=S>=0?1:-1,N=1-S*S;if(N>Number.EPSILON){const G=Math.sqrt(N),B=Math.atan2(G,S*L);M=Math.sin(M*B)/G,d=Math.sin(d*B)/G}const w=d*L;if(m=m*M+y*w,p=p*M+x*w,v=v*M+E*w,g=g*M+A*w,M===1-d){const G=1/Math.sqrt(m*m+p*p+v*v+g*g);m*=G,p*=G,v*=G,g*=G}}e[i]=m,e[i+1]=p,e[i+2]=v,e[i+3]=g}static multiplyQuaternionsFlat(e,i,r,l,c,h){const d=r[l],m=r[l+1],p=r[l+2],v=r[l+3],g=c[h],y=c[h+1],x=c[h+2],E=c[h+3];return e[i]=d*E+v*g+m*x-p*y,e[i+1]=m*E+v*y+p*g-d*x,e[i+2]=p*E+v*x+d*y-m*g,e[i+3]=v*E-d*g-m*y-p*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,l){return this._x=e,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const r=e._x,l=e._y,c=e._z,h=e._order,d=Math.cos,m=Math.sin,p=d(r/2),v=d(l/2),g=d(c/2),y=m(r/2),x=m(l/2),E=m(c/2);switch(h){case"XYZ":this._x=y*v*g+p*x*E,this._y=p*x*g-y*v*E,this._z=p*v*E+y*x*g,this._w=p*v*g-y*x*E;break;case"YXZ":this._x=y*v*g+p*x*E,this._y=p*x*g-y*v*E,this._z=p*v*E-y*x*g,this._w=p*v*g+y*x*E;break;case"ZXY":this._x=y*v*g-p*x*E,this._y=p*x*g+y*v*E,this._z=p*v*E+y*x*g,this._w=p*v*g-y*x*E;break;case"ZYX":this._x=y*v*g-p*x*E,this._y=p*x*g+y*v*E,this._z=p*v*E-y*x*g,this._w=p*v*g+y*x*E;break;case"YZX":this._x=y*v*g+p*x*E,this._y=p*x*g+y*v*E,this._z=p*v*E-y*x*g,this._w=p*v*g-y*x*E;break;case"XZY":this._x=y*v*g-p*x*E,this._y=p*x*g-y*v*E,this._z=p*v*E+y*x*g,this._w=p*v*g+y*x*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const r=i/2,l=Math.sin(r);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,r=i[0],l=i[4],c=i[8],h=i[1],d=i[5],m=i[9],p=i[2],v=i[6],g=i[10],y=r+d+g;if(y>0){const x=.5/Math.sqrt(y+1);this._w=.25/x,this._x=(v-m)*x,this._y=(c-p)*x,this._z=(h-l)*x}else if(r>d&&r>g){const x=2*Math.sqrt(1+r-d-g);this._w=(v-m)/x,this._x=.25*x,this._y=(l+h)/x,this._z=(c+p)/x}else if(d>g){const x=2*Math.sqrt(1+d-r-g);this._w=(c-p)/x,this._x=(l+h)/x,this._y=.25*x,this._z=(m+v)/x}else{const x=2*Math.sqrt(1+g-r-d);this._w=(h-l)/x,this._x=(c+p)/x,this._y=(m+v)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ae(this.dot(e),-1,1)))}rotateTowards(e,i){const r=this.angleTo(e);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const r=e._x,l=e._y,c=e._z,h=e._w,d=i._x,m=i._y,p=i._z,v=i._w;return this._x=r*v+h*d+l*p-c*m,this._y=l*v+h*m+c*d-r*p,this._z=c*v+h*p+r*m-l*d,this._w=h*v-r*d-l*m-c*p,this._onChangeCallback(),this}slerp(e,i){if(i===0)return this;if(i===1)return this.copy(e);const r=this._x,l=this._y,c=this._z,h=this._w;let d=h*e._w+r*e._x+l*e._y+c*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=h,this._x=r,this._y=l,this._z=c,this;const m=1-d*d;if(m<=Number.EPSILON){const x=1-i;return this._w=x*h+i*this._w,this._x=x*r+i*this._x,this._y=x*l+i*this._y,this._z=x*c+i*this._z,this.normalize(),this}const p=Math.sqrt(m),v=Math.atan2(p,d),g=Math.sin((1-i)*v)/p,y=Math.sin(i*v)/p;return this._w=h*g+this._w*y,this._x=r*g+this._x*y,this._y=l*g+this._y*y,this._z=c*g+this._z*y,this._onChangeCallback(),this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),c=Math.sqrt(r);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{constructor(e=0,i=0,r=0){Y.prototype.isVector3=!0,this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(yg.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(yg.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,r=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*r+c[6]*l,this.y=c[1]*i+c[4]*r+c[7]*l,this.z=c[2]*i+c[5]*r+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,c=e.elements,h=1/(c[3]*i+c[7]*r+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*r+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*r+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*r+c[10]*l+c[14])*h,this}applyQuaternion(e){const i=this.x,r=this.y,l=this.z,c=e.x,h=e.y,d=e.z,m=e.w,p=2*(h*l-d*r),v=2*(d*i-c*l),g=2*(c*r-h*i);return this.x=i+m*p+h*g-d*v,this.y=r+m*v+d*p-c*g,this.z=l+m*g+c*v-h*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,r=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*r+c[8]*l,this.y=c[1]*i+c[5]*r+c[9]*l,this.z=c[2]*i+c[6]*r+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Ae(this.x,e.x,i.x),this.y=Ae(this.y,e.y,i.y),this.z=Ae(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Ae(this.x,e,i),this.y=Ae(this.y,e,i),this.z=Ae(this.z,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ae(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const r=e.x,l=e.y,c=e.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-c*d,this.y=c*h-r*m,this.z=r*d-l*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Sh.copy(this).projectOnVector(e),this.sub(Sh)}reflect(e){return this.sub(Sh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(Ae(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y,l=this.z-e.z;return i*i+r*r+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){const l=Math.sin(i)*e;return this.x=l*Math.sin(r),this.y=Math.cos(i)*e,this.z=l*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Sh=new Y,yg=new Da;class xe{constructor(e,i,r,l,c,h,d,m,p){xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,l,c,h,d,m,p)}set(e,i,r,l,c,h,d,m,p){const v=this.elements;return v[0]=e,v[1]=l,v[2]=d,v[3]=i,v[4]=c,v[5]=m,v[6]=r,v[7]=h,v[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,c=this.elements,h=r[0],d=r[3],m=r[6],p=r[1],v=r[4],g=r[7],y=r[2],x=r[5],E=r[8],A=l[0],M=l[3],S=l[6],L=l[1],N=l[4],w=l[7],G=l[2],B=l[5],P=l[8];return c[0]=h*A+d*L+m*G,c[3]=h*M+d*N+m*B,c[6]=h*S+d*w+m*P,c[1]=p*A+v*L+g*G,c[4]=p*M+v*N+g*B,c[7]=p*S+v*w+g*P,c[2]=y*A+x*L+E*G,c[5]=y*M+x*N+E*B,c[8]=y*S+x*w+E*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],v=e[8];return i*h*v-i*d*p-r*c*v+r*d*m+l*c*p-l*h*m}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],v=e[8],g=v*h-d*p,y=d*m-v*c,x=p*c-h*m,E=i*g+r*y+l*x;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/E;return e[0]=g*A,e[1]=(l*p-v*r)*A,e[2]=(d*r-l*h)*A,e[3]=y*A,e[4]=(v*i-l*m)*A,e[5]=(l*c-d*i)*A,e[6]=x*A,e[7]=(r*m-p*i)*A,e[8]=(h*i-r*c)*A,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,l,c,h,d){const m=Math.cos(c),p=Math.sin(c);return this.set(r*m,r*p,-r*(m*h+p*d)+h+e,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(xh.makeScale(e,i)),this}rotate(e){return this.premultiply(xh.makeRotation(-e)),this}translate(e,i){return this.premultiply(xh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const xh=new xe;function Sg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function gc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function $x(){const s=gc("canvas");return s.style.display="block",s}const xg={};function Jo(s){s in xg||(xg[s]=!0,console.warn(s))}function tM(s,e,i){return new Promise(function(r,l){function c(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:l();break;case s.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:r()}}setTimeout(c,i)})}const Mg=new xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Eg=new xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function eM(){const s={enabled:!0,workingColorSpace:Os,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===je&&(l.r=Ua(l.r),l.g=Ua(l.g),l.b=Ua(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===je&&(l.r=Bs(l.r),l.g=Bs(l.g),l.b=Bs(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===lr?pc:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Jo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Jo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Os]:{primaries:e,whitePoint:r,transfer:pc,toXYZ:Mg,fromXYZ:Eg,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:ei},outputColorSpaceConfig:{drawingBufferColorSpace:ei}},[ei]:{primaries:e,whitePoint:r,transfer:je,toXYZ:Mg,fromXYZ:Eg,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:ei}}}),s}const Ge=eM();function Ua(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Bs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Fs;class nM{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Fs===void 0&&(Fs=gc("canvas")),Fs.width=e.width,Fs.height=e.height;const l=Fs.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),r=Fs}return r.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=gc("canvas");i.width=e.width,i.height=e.height;const r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const l=r.getImageData(0,0,e.width,e.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=Ua(c[h]/255)*255;return r.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(Ua(i[r]/255)*255):i[r]=Ua(i[r]);return{data:i,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let iM=0;class Mh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:iM++}),this.uuid=Is(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):i instanceof VideoFrame?e.set(i.displayHeight,i.displayWidth,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?c.push(Eh(l[h].image)):c.push(Eh(l[h]))}else c=Eh(l);r.url=c}return i||(e.images[this.uuid]=r),r}}function Eh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?nM.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let aM=0;const Th=new Y;class Kn extends Ps{constructor(e=Kn.DEFAULT_IMAGE,i=Kn.DEFAULT_MAPPING,r=or,l=or,c=Ui,h=Ca,d=Yi,m=ua,p=Kn.DEFAULT_ANISOTROPY,v=lr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:aM++}),this.uuid=Is(),this.name="",this.source=new Mh(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Th).x}get height(){return this.source.getSize(Th).y}get depth(){return this.source.getSize(Th).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const r=e[i];if(r===void 0){console.warn(`THREE.Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Texture.setValues(): property '${i}' does not exist.`);continue}l&&r&&l.isVector2&&r.isVector2||l&&r&&l.isVector3&&r.isVector3||l&&r&&l.isMatrix3&&r.isMatrix3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case sr:e.x=e.x-Math.floor(e.x);break;case or:e.x=e.x<0?0:1;break;case zf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case sr:e.y=e.y-Math.floor(e.y);break;case or:e.y=e.y<0?0:1;break;case zf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Kn.DEFAULT_IMAGE=null,Kn.DEFAULT_MAPPING=rg,Kn.DEFAULT_ANISOTROPY=1;class pn{constructor(e=0,i=0,r=0,l=1){pn.prototype.isVector4=!0,this.x=e,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,l){return this.x=e,this.y=i,this.z=r,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,c=this.w,h=e.elements;return this.x=h[0]*i+h[4]*r+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*r+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*r+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*r+h[11]*l+h[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,l,c;const m=e.elements,p=m[0],v=m[4],g=m[8],y=m[1],x=m[5],E=m[9],A=m[2],M=m[6],S=m[10];if(Math.abs(v-y)<.01&&Math.abs(g-A)<.01&&Math.abs(E-M)<.01){if(Math.abs(v+y)<.1&&Math.abs(g+A)<.1&&Math.abs(E+M)<.1&&Math.abs(p+x+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const N=(p+1)/2,w=(x+1)/2,G=(S+1)/2,B=(v+y)/4,P=(g+A)/4,V=(E+M)/4;return N>w&&N>G?N<.01?(r=0,l=.707106781,c=.707106781):(r=Math.sqrt(N),l=B/r,c=P/r):w>G?w<.01?(r=.707106781,l=0,c=.707106781):(l=Math.sqrt(w),r=B/l,c=V/l):G<.01?(r=.707106781,l=.707106781,c=0):(c=Math.sqrt(G),r=P/c,l=V/c),this.set(r,l,c,i),this}let L=Math.sqrt((M-E)*(M-E)+(g-A)*(g-A)+(y-v)*(y-v));return Math.abs(L)<.001&&(L=1),this.x=(M-E)/L,this.y=(g-A)/L,this.z=(y-v)/L,this.w=Math.acos((p+x+S-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Ae(this.x,e.x,i.x),this.y=Ae(this.y,e.y,i.y),this.z=Ae(this.z,e.z,i.z),this.w=Ae(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Ae(this.x,e,i),this.y=Ae(this.y,e,i),this.z=Ae(this.z,e,i),this.w=Ae(this.w,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ae(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rM extends Ps{constructor(e=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ui,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=r.depth,this.scissor=new pn(0,0,e,i),this.scissorTest=!1,this.viewport=new pn(0,0,e,i);const l={width:e,height:i,depth:r.depth},c=new Kn(l);this.textures=[];const h=r.count;for(let d=0;d<h;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(e={}){const i={minFilter:Ui,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=r,this.textures[l].isArrayTexture=this.textures[l].image.depth>1;this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new Mh(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yr extends rM{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}}class Tg extends Kn{constructor(e=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=yi,this.minFilter=yi,this.wrapR=or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class sM extends Kn{constructor(e=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=yi,this.minFilter=yi,this.wrapR=or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $o{constructor(e=new Y(1/0,1/0,1/0),i=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(Wi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(Wi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const r=Wi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const c=r.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=c.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,Wi):Wi.fromBufferAttribute(c,h),Wi.applyMatrix4(e.matrixWorld),this.expandByPoint(Wi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vc.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),vc.copy(r.boundingBox)),vc.applyMatrix4(e.matrixWorld),this.union(vc)}const l=e.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wi),Wi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tl),_c.subVectors(this.max,tl),Hs.subVectors(e.a,tl),Vs.subVectors(e.b,tl),Gs.subVectors(e.c,tl),cr.subVectors(Vs,Hs),ur.subVectors(Gs,Vs),Wr.subVectors(Hs,Gs);let i=[0,-cr.z,cr.y,0,-ur.z,ur.y,0,-Wr.z,Wr.y,cr.z,0,-cr.x,ur.z,0,-ur.x,Wr.z,0,-Wr.x,-cr.y,cr.x,0,-ur.y,ur.x,0,-Wr.y,Wr.x,0];return!bh(i,Hs,Vs,Gs,_c)||(i=[1,0,0,0,1,0,0,0,1],!bh(i,Hs,Vs,Gs,_c))?!1:(yc.crossVectors(cr,ur),i=[yc.x,yc.y,yc.z],bh(i,Hs,Vs,Gs,_c))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Na[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Na[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Na[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Na[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Na[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Na[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Na[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Na[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Na),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Na=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Wi=new Y,vc=new $o,Hs=new Y,Vs=new Y,Gs=new Y,cr=new Y,ur=new Y,Wr=new Y,tl=new Y,_c=new Y,yc=new Y,Zr=new Y;function bh(s,e,i,r,l){for(let c=0,h=s.length-3;c<=h;c+=3){Zr.fromArray(s,c);const d=l.x*Math.abs(Zr.x)+l.y*Math.abs(Zr.y)+l.z*Math.abs(Zr.z),m=e.dot(Zr),p=i.dot(Zr),v=r.dot(Zr);if(Math.max(-Math.max(m,p,v),Math.min(m,p,v))>d)return!1}return!0}const oM=new $o,el=new Y,Ah=new Y;class Rh{constructor(e=new Y,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const r=this.center;i!==void 0?r.copy(i):oM.setFromPoints(e).getCenter(r);let l=0;for(let c=0,h=e.length;c<h;c++)l=Math.max(l,r.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;el.subVectors(e,this.center);const i=el.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(el,l/r),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ah.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(el.copy(e.center).add(Ah)),this.expandByPoint(el.copy(e.center).sub(Ah))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const La=new Y,Ch=new Y,Sc=new Y,fr=new Y,wh=new Y,xc=new Y,Dh=new Y;class bg{constructor(e=new Y,i=new Y(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,La)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=La.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(La.copy(this.origin).addScaledVector(this.direction,i),La.distanceToSquared(e))}distanceSqToSegment(e,i,r,l){Ch.copy(e).add(i).multiplyScalar(.5),Sc.copy(i).sub(e).normalize(),fr.copy(this.origin).sub(Ch);const c=e.distanceTo(i)*.5,h=-this.direction.dot(Sc),d=fr.dot(this.direction),m=-fr.dot(Sc),p=fr.lengthSq(),v=Math.abs(1-h*h);let g,y,x,E;if(v>0)if(g=h*m-d,y=h*d-m,E=c*v,g>=0)if(y>=-E)if(y<=E){const A=1/v;g*=A,y*=A,x=g*(g+h*y+2*d)+y*(h*g+y+2*m)+p}else y=c,g=Math.max(0,-(h*y+d)),x=-g*g+y*(y+2*m)+p;else y=-c,g=Math.max(0,-(h*y+d)),x=-g*g+y*(y+2*m)+p;else y<=-E?(g=Math.max(0,-(-h*c+d)),y=g>0?-c:Math.min(Math.max(-c,-m),c),x=-g*g+y*(y+2*m)+p):y<=E?(g=0,y=Math.min(Math.max(-c,-m),c),x=y*(y+2*m)+p):(g=Math.max(0,-(h*c+d)),y=g>0?c:Math.min(Math.max(-c,-m),c),x=-g*g+y*(y+2*m)+p);else y=h>0?-c:c,g=Math.max(0,-(h*y+d)),x=-g*g+y*(y+2*m)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,g),l&&l.copy(Ch).addScaledVector(Sc,y),x}intersectSphere(e,i){La.subVectors(e.center,this.origin);const r=La.dot(this.direction),l=La.dot(La)-r*r,c=e.radius*e.radius;if(l>c)return null;const h=Math.sqrt(c-l),d=r-h,m=r+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/i;return r>=0?r:null}intersectPlane(e,i){const r=this.distanceToPlane(e);return r===null?null:this.at(r,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let r,l,c,h,d,m;const p=1/this.direction.x,v=1/this.direction.y,g=1/this.direction.z,y=this.origin;return p>=0?(r=(e.min.x-y.x)*p,l=(e.max.x-y.x)*p):(r=(e.max.x-y.x)*p,l=(e.min.x-y.x)*p),v>=0?(c=(e.min.y-y.y)*v,h=(e.max.y-y.y)*v):(c=(e.max.y-y.y)*v,h=(e.min.y-y.y)*v),r>h||c>l||((c>r||isNaN(r))&&(r=c),(h<l||isNaN(l))&&(l=h),g>=0?(d=(e.min.z-y.z)*g,m=(e.max.z-y.z)*g):(d=(e.max.z-y.z)*g,m=(e.min.z-y.z)*g),r>m||d>l)||((d>r||r!==r)&&(r=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(e){return this.intersectBox(e,La)!==null}intersectTriangle(e,i,r,l,c){wh.subVectors(i,e),xc.subVectors(r,e),Dh.crossVectors(wh,xc);let h=this.direction.dot(Dh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;fr.subVectors(this.origin,e);const m=d*this.direction.dot(xc.crossVectors(fr,xc));if(m<0)return null;const p=d*this.direction.dot(wh.cross(fr));if(p<0||m+p>h)return null;const v=-d*fr.dot(Dh);return v<0?null:this.at(v/h,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class sn{constructor(e,i,r,l,c,h,d,m,p,v,g,y,x,E,A,M){sn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,l,c,h,d,m,p,v,g,y,x,E,A,M)}set(e,i,r,l,c,h,d,m,p,v,g,y,x,E,A,M){const S=this.elements;return S[0]=e,S[4]=i,S[8]=r,S[12]=l,S[1]=c,S[5]=h,S[9]=d,S[13]=m,S[2]=p,S[6]=v,S[10]=g,S[14]=y,S[3]=x,S[7]=E,S[11]=A,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new sn().fromArray(this.elements)}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){const i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,r=e.elements,l=1/Xs.setFromMatrixColumn(e,0).length(),c=1/Xs.setFromMatrixColumn(e,1).length(),h=1/Xs.setFromMatrixColumn(e,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*c,i[5]=r[5]*c,i[6]=r[6]*c,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,r=e.x,l=e.y,c=e.z,h=Math.cos(r),d=Math.sin(r),m=Math.cos(l),p=Math.sin(l),v=Math.cos(c),g=Math.sin(c);if(e.order==="XYZ"){const y=h*v,x=h*g,E=d*v,A=d*g;i[0]=m*v,i[4]=-m*g,i[8]=p,i[1]=x+E*p,i[5]=y-A*p,i[9]=-d*m,i[2]=A-y*p,i[6]=E+x*p,i[10]=h*m}else if(e.order==="YXZ"){const y=m*v,x=m*g,E=p*v,A=p*g;i[0]=y+A*d,i[4]=E*d-x,i[8]=h*p,i[1]=h*g,i[5]=h*v,i[9]=-d,i[2]=x*d-E,i[6]=A+y*d,i[10]=h*m}else if(e.order==="ZXY"){const y=m*v,x=m*g,E=p*v,A=p*g;i[0]=y-A*d,i[4]=-h*g,i[8]=E+x*d,i[1]=x+E*d,i[5]=h*v,i[9]=A-y*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(e.order==="ZYX"){const y=h*v,x=h*g,E=d*v,A=d*g;i[0]=m*v,i[4]=E*p-x,i[8]=y*p+A,i[1]=m*g,i[5]=A*p+y,i[9]=x*p-E,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(e.order==="YZX"){const y=h*m,x=h*p,E=d*m,A=d*p;i[0]=m*v,i[4]=A-y*g,i[8]=E*g+x,i[1]=g,i[5]=h*v,i[9]=-d*v,i[2]=-p*v,i[6]=x*g+E,i[10]=y-A*g}else if(e.order==="XZY"){const y=h*m,x=h*p,E=d*m,A=d*p;i[0]=m*v,i[4]=-g,i[8]=p*v,i[1]=y*g+A,i[5]=h*v,i[9]=x*g-E,i[2]=E*g-x,i[6]=d*v,i[10]=A*g+y}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lM,e,cM)}lookAt(e,i,r){const l=this.elements;return Si.subVectors(e,i),Si.lengthSq()===0&&(Si.z=1),Si.normalize(),hr.crossVectors(r,Si),hr.lengthSq()===0&&(Math.abs(r.z)===1?Si.x+=1e-4:Si.z+=1e-4,Si.normalize(),hr.crossVectors(r,Si)),hr.normalize(),Mc.crossVectors(Si,hr),l[0]=hr.x,l[4]=Mc.x,l[8]=Si.x,l[1]=hr.y,l[5]=Mc.y,l[9]=Si.y,l[2]=hr.z,l[6]=Mc.z,l[10]=Si.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,c=this.elements,h=r[0],d=r[4],m=r[8],p=r[12],v=r[1],g=r[5],y=r[9],x=r[13],E=r[2],A=r[6],M=r[10],S=r[14],L=r[3],N=r[7],w=r[11],G=r[15],B=l[0],P=l[4],V=l[8],D=l[12],C=l[1],H=l[5],st=l[9],ft=l[13],q=l[2],Q=l[6],F=l[10],nt=l[14],Z=l[3],xt=l[7],vt=l[11],Nt=l[15];return c[0]=h*B+d*C+m*q+p*Z,c[4]=h*P+d*H+m*Q+p*xt,c[8]=h*V+d*st+m*F+p*vt,c[12]=h*D+d*ft+m*nt+p*Nt,c[1]=v*B+g*C+y*q+x*Z,c[5]=v*P+g*H+y*Q+x*xt,c[9]=v*V+g*st+y*F+x*vt,c[13]=v*D+g*ft+y*nt+x*Nt,c[2]=E*B+A*C+M*q+S*Z,c[6]=E*P+A*H+M*Q+S*xt,c[10]=E*V+A*st+M*F+S*vt,c[14]=E*D+A*ft+M*nt+S*Nt,c[3]=L*B+N*C+w*q+G*Z,c[7]=L*P+N*H+w*Q+G*xt,c[11]=L*V+N*st+w*F+G*vt,c[15]=L*D+N*ft+w*nt+G*Nt,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[4],l=e[8],c=e[12],h=e[1],d=e[5],m=e[9],p=e[13],v=e[2],g=e[6],y=e[10],x=e[14],E=e[3],A=e[7],M=e[11],S=e[15];return E*(+c*m*g-l*p*g-c*d*y+r*p*y+l*d*x-r*m*x)+A*(+i*m*x-i*p*y+c*h*y-l*h*x+l*p*v-c*m*v)+M*(+i*p*g-i*d*x-c*h*g+r*h*x+c*d*v-r*p*v)+S*(-l*d*v-i*m*g+i*d*y+l*h*g-r*h*y+r*m*v)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=r),this}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],v=e[8],g=e[9],y=e[10],x=e[11],E=e[12],A=e[13],M=e[14],S=e[15],L=g*M*p-A*y*p+A*m*x-d*M*x-g*m*S+d*y*S,N=E*y*p-v*M*p-E*m*x+h*M*x+v*m*S-h*y*S,w=v*A*p-E*g*p+E*d*x-h*A*x-v*d*S+h*g*S,G=E*g*m-v*A*m-E*d*y+h*A*y+v*d*M-h*g*M,B=i*L+r*N+l*w+c*G;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/B;return e[0]=L*P,e[1]=(A*y*c-g*M*c-A*l*x+r*M*x+g*l*S-r*y*S)*P,e[2]=(d*M*c-A*m*c+A*l*p-r*M*p-d*l*S+r*m*S)*P,e[3]=(g*m*c-d*y*c-g*l*p+r*y*p+d*l*x-r*m*x)*P,e[4]=N*P,e[5]=(v*M*c-E*y*c+E*l*x-i*M*x-v*l*S+i*y*S)*P,e[6]=(E*m*c-h*M*c-E*l*p+i*M*p+h*l*S-i*m*S)*P,e[7]=(h*y*c-v*m*c+v*l*p-i*y*p-h*l*x+i*m*x)*P,e[8]=w*P,e[9]=(E*g*c-v*A*c-E*r*x+i*A*x+v*r*S-i*g*S)*P,e[10]=(h*A*c-E*d*c+E*r*p-i*A*p-h*r*S+i*d*S)*P,e[11]=(v*d*c-h*g*c-v*r*p+i*g*p+h*r*x-i*d*x)*P,e[12]=G*P,e[13]=(v*A*l-E*g*l+E*r*y-i*A*y-v*r*M+i*g*M)*P,e[14]=(E*d*l-h*A*l-E*r*m+i*A*m+h*r*M-i*d*M)*P,e[15]=(h*g*l-v*d*l+v*r*m-i*g*m-h*r*y+i*d*y)*P,this}scale(e){const i=this.elements,r=e.x,l=e.y,c=e.z;return i[0]*=r,i[4]*=l,i[8]*=c,i[1]*=r,i[5]*=l,i[9]*=c,i[2]*=r,i[6]*=l,i[10]*=c,i[3]*=r,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const r=Math.cos(i),l=Math.sin(i),c=1-r,h=e.x,d=e.y,m=e.z,p=c*h,v=c*d;return this.set(p*h+r,p*d-l*m,p*m+l*d,0,p*d+l*m,v*d+r,v*m-l*h,0,p*m-l*d,v*m+l*h,c*m*m+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,l,c,h){return this.set(1,r,c,0,e,1,h,0,i,l,1,0,0,0,0,1),this}compose(e,i,r){const l=this.elements,c=i._x,h=i._y,d=i._z,m=i._w,p=c+c,v=h+h,g=d+d,y=c*p,x=c*v,E=c*g,A=h*v,M=h*g,S=d*g,L=m*p,N=m*v,w=m*g,G=r.x,B=r.y,P=r.z;return l[0]=(1-(A+S))*G,l[1]=(x+w)*G,l[2]=(E-N)*G,l[3]=0,l[4]=(x-w)*B,l[5]=(1-(y+S))*B,l[6]=(M+L)*B,l[7]=0,l[8]=(E+N)*P,l[9]=(M-L)*P,l[10]=(1-(y+A))*P,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,r){const l=this.elements;let c=Xs.set(l[0],l[1],l[2]).length();const h=Xs.set(l[4],l[5],l[6]).length(),d=Xs.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),e.x=l[12],e.y=l[13],e.z=l[14],Zi.copy(this);const p=1/c,v=1/h,g=1/d;return Zi.elements[0]*=p,Zi.elements[1]*=p,Zi.elements[2]*=p,Zi.elements[4]*=v,Zi.elements[5]*=v,Zi.elements[6]*=v,Zi.elements[8]*=g,Zi.elements[9]*=g,Zi.elements[10]*=g,i.setFromRotationMatrix(Zi),r.x=c,r.y=h,r.z=d,this}makePerspective(e,i,r,l,c,h,d=fa,m=!1){const p=this.elements,v=2*c/(i-e),g=2*c/(r-l),y=(i+e)/(i-e),x=(r+l)/(r-l);let E,A;if(m)E=c/(h-c),A=h*c/(h-c);else if(d===fa)E=-(h+c)/(h-c),A=-2*h*c/(h-c);else if(d===mc)E=-h/(h-c),A=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=v,p[4]=0,p[8]=y,p[12]=0,p[1]=0,p[5]=g,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=E,p[14]=A,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,r,l,c,h,d=fa,m=!1){const p=this.elements,v=2/(i-e),g=2/(r-l),y=-(i+e)/(i-e),x=-(r+l)/(r-l);let E,A;if(m)E=1/(h-c),A=h/(h-c);else if(d===fa)E=-2/(h-c),A=-(h+c)/(h-c);else if(d===mc)E=-1/(h-c),A=-c/(h-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=v,p[4]=0,p[8]=0,p[12]=y,p[1]=0,p[5]=g,p[9]=0,p[13]=x,p[2]=0,p[6]=0,p[10]=E,p[14]=A,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}}const Xs=new Y,Zi=new sn,lM=new Y(0,0,0),cM=new Y(1,1,1),hr=new Y,Mc=new Y,Si=new Y,Ag=new sn,Rg=new Da;class ha{constructor(e=0,i=0,r=0,l=ha.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,l=this._order){return this._x=e,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){const l=e.elements,c=l[0],h=l[4],d=l[8],m=l[1],p=l[5],v=l[9],g=l[2],y=l[6],x=l[10];switch(i){case"XYZ":this._y=Math.asin(Ae(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,x),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(y,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Ae(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,x),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-g,c),this._z=0);break;case"ZXY":this._x=Math.asin(Ae(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-g,x),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Ae(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(y,x),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(Ae(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,p),this._y=Math.atan2(-g,c)):(this._x=0,this._y=Math.atan2(d,x));break;case"XZY":this._z=Math.asin(-Ae(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(y,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-v,x),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return Ag.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ag,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return Rg.setFromEuler(this),this.setFromQuaternion(Rg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ha.DEFAULT_ORDER="XYZ";class Uh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let uM=0;const Cg=new Y,ks=new Da,Oa=new sn,Ec=new Y,nl=new Y,fM=new Y,hM=new Da,wg=new Y(1,0,0),Dg=new Y(0,1,0),Ug=new Y(0,0,1),Ng={type:"added"},dM={type:"removed"},qs={type:"childadded",child:null},Nh={type:"childremoved",child:null};class jn extends Ps{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uM++}),this.uuid=Is(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jn.DEFAULT_UP.clone();const e=new Y,i=new ha,r=new Da,l=new Y(1,1,1);function c(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(c),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new sn},normalMatrix:{value:new xe}}),this.matrix=new sn,this.matrixWorld=new sn,this.matrixAutoUpdate=jn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return ks.setFromAxisAngle(e,i),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,i){return ks.setFromAxisAngle(e,i),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(wg,e)}rotateY(e){return this.rotateOnAxis(Dg,e)}rotateZ(e){return this.rotateOnAxis(Ug,e)}translateOnAxis(e,i){return Cg.copy(e).applyQuaternion(this.quaternion),this.position.add(Cg.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(wg,e)}translateY(e){return this.translateOnAxis(Dg,e)}translateZ(e){return this.translateOnAxis(Ug,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Oa.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?Ec.copy(e):Ec.set(e,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),nl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oa.lookAt(nl,Ec,this.up):Oa.lookAt(Ec,nl,this.up),this.quaternion.setFromRotationMatrix(Oa),l&&(Oa.extractRotation(l.matrixWorld),ks.setFromRotationMatrix(Oa),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ng),qs.child=e,this.dispatchEvent(qs),qs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(dM),Nh.child=e,this.dispatchEvent(Nh),Nh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Oa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Oa.multiply(e.parent.matrixWorld)),e.applyMatrix4(Oa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ng),qs.child=e,this.dispatchEvent(qs),qs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const h=this.children[r].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,e,fM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,hM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,v=m.length;p<v;p++){const g=m[p];c(e.shapes,g)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(e.materials,this.material[m]));l.material=d}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(e.animations,m))}}if(i){const d=h(e.geometries),m=h(e.materials),p=h(e.textures),v=h(e.images),g=h(e.shapes),y=h(e.skeletons),x=h(e.animations),E=h(e.nodes);d.length>0&&(r.geometries=d),m.length>0&&(r.materials=m),p.length>0&&(r.textures=p),v.length>0&&(r.images=v),g.length>0&&(r.shapes=g),y.length>0&&(r.skeletons=y),x.length>0&&(r.animations=x),E.length>0&&(r.nodes=E)}return r.object=l,r;function h(d){const m=[];for(const p in d){const v=d[p];delete v.metadata,m.push(v)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){const l=e.children[r];this.add(l.clone())}return this}}jn.DEFAULT_UP=new Y(0,1,0),jn.DEFAULT_MATRIX_AUTO_UPDATE=!0,jn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ki=new Y,za=new Y,Lh=new Y,Pa=new Y,Ys=new Y,Ws=new Y,Lg=new Y,Oh=new Y,zh=new Y,Ph=new Y,Ih=new pn,Bh=new pn,Fh=new pn;class ji{constructor(e=new Y,i=new Y,r=new Y){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,l){l.subVectors(r,i),Ki.subVectors(e,i),l.cross(Ki);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,r,l,c){Ki.subVectors(l,i),za.subVectors(r,i),Lh.subVectors(e,i);const h=Ki.dot(Ki),d=Ki.dot(za),m=Ki.dot(Lh),p=za.dot(za),v=za.dot(Lh),g=h*p-d*d;if(g===0)return c.set(0,0,0),null;const y=1/g,x=(p*m-d*v)*y,E=(h*v-d*m)*y;return c.set(1-x-E,E,x)}static containsPoint(e,i,r,l){return this.getBarycoord(e,i,r,l,Pa)===null?!1:Pa.x>=0&&Pa.y>=0&&Pa.x+Pa.y<=1}static getInterpolation(e,i,r,l,c,h,d,m){return this.getBarycoord(e,i,r,l,Pa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Pa.x),m.addScaledVector(h,Pa.y),m.addScaledVector(d,Pa.z),m)}static getInterpolatedAttribute(e,i,r,l,c,h){return Ih.setScalar(0),Bh.setScalar(0),Fh.setScalar(0),Ih.fromBufferAttribute(e,i),Bh.fromBufferAttribute(e,r),Fh.fromBufferAttribute(e,l),h.setScalar(0),h.addScaledVector(Ih,c.x),h.addScaledVector(Bh,c.y),h.addScaledVector(Fh,c.z),h}static isFrontFacing(e,i,r,l){return Ki.subVectors(r,i),za.subVectors(e,i),Ki.cross(za).dot(l)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,l){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,r,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ki.subVectors(this.c,this.b),za.subVectors(this.a,this.b),Ki.cross(za).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ji.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return ji.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,l,c){return ji.getInterpolation(e,this.a,this.b,this.c,i,r,l,c)}containsPoint(e){return ji.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ji.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const r=this.a,l=this.b,c=this.c;let h,d;Ys.subVectors(l,r),Ws.subVectors(c,r),Oh.subVectors(e,r);const m=Ys.dot(Oh),p=Ws.dot(Oh);if(m<=0&&p<=0)return i.copy(r);zh.subVectors(e,l);const v=Ys.dot(zh),g=Ws.dot(zh);if(v>=0&&g<=v)return i.copy(l);const y=m*g-v*p;if(y<=0&&m>=0&&v<=0)return h=m/(m-v),i.copy(r).addScaledVector(Ys,h);Ph.subVectors(e,c);const x=Ys.dot(Ph),E=Ws.dot(Ph);if(E>=0&&x<=E)return i.copy(c);const A=x*p-m*E;if(A<=0&&p>=0&&E<=0)return d=p/(p-E),i.copy(r).addScaledVector(Ws,d);const M=v*E-x*g;if(M<=0&&g-v>=0&&x-E>=0)return Lg.subVectors(c,l),d=(g-v)/(g-v+(x-E)),i.copy(l).addScaledVector(Lg,d);const S=1/(M+A+y);return h=A*S,d=y*S,i.copy(r).addScaledVector(Ys,h).addScaledVector(Ws,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Og={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},dr={h:0,s:0,l:0},Tc={h:0,s:0,l:0};function Hh(s,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?s+(e-s)*6*i:i<1/2?e:i<2/3?s+(e-s)*6*(2/3-i):s}class Re{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=ei){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ge.colorSpaceToWorking(this,i),this}setRGB(e,i,r,l=Ge.workingColorSpace){return this.r=e,this.g=i,this.b=r,Ge.colorSpaceToWorking(this,l),this}setHSL(e,i,r,l=Ge.workingColorSpace){if(e=Jx(e,1),i=Ae(i,0,1),r=Ae(r,0,1),i===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+i):r+i-r*i,h=2*r-c;this.r=Hh(h,c,e+1/3),this.g=Hh(h,c,e),this.b=Hh(h,c,e-1/3)}return Ge.colorSpaceToWorking(this,l),this}setStyle(e,i=ei){function r(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=ei){const r=Og[e.toLowerCase()];return r!==void 0?this.setHex(r,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ua(e.r),this.g=Ua(e.g),this.b=Ua(e.b),this}copyLinearToSRGB(e){return this.r=Bs(e.r),this.g=Bs(e.g),this.b=Bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ei){return Ge.workingToColorSpace(Qn.copy(this),e),Math.round(Ae(Qn.r*255,0,255))*65536+Math.round(Ae(Qn.g*255,0,255))*256+Math.round(Ae(Qn.b*255,0,255))}getHexString(e=ei){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Ge.workingColorSpace){Ge.workingToColorSpace(Qn.copy(this),i);const r=Qn.r,l=Qn.g,c=Qn.b,h=Math.max(r,l,c),d=Math.min(r,l,c);let m,p;const v=(d+h)/2;if(d===h)m=0,p=0;else{const g=h-d;switch(p=v<=.5?g/(h+d):g/(2-h-d),h){case r:m=(l-c)/g+(l<c?6:0);break;case l:m=(c-r)/g+2;break;case c:m=(r-l)/g+4;break}m/=6}return e.h=m,e.s=p,e.l=v,e}getRGB(e,i=Ge.workingColorSpace){return Ge.workingToColorSpace(Qn.copy(this),i),e.r=Qn.r,e.g=Qn.g,e.b=Qn.b,e}getStyle(e=ei){Ge.workingToColorSpace(Qn.copy(this),e);const i=Qn.r,r=Qn.g,l=Qn.b;return e!==ei?`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(e,i,r){return this.getHSL(dr),this.setHSL(dr.h+e,dr.s+i,dr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(dr),e.getHSL(Tc);const r=yh(dr.h,Tc.h,i),l=yh(dr.s,Tc.s,i),c=yh(dr.l,Tc.l,i);return this.setHSL(r,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,r=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*r+c[6]*l,this.g=c[1]*i+c[4]*r+c[7]*l,this.b=c[2]*i+c[5]*r+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qn=new Re;Re.NAMES=Og;let pM=0;class il extends Ps{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pM++}),this.uuid=Is(),this.name="",this.type="Material",this.blending=Ds,this.side=ir,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Tf,this.blendDst=bf,this.blendEquation=kr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=Us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zs,this.stencilZFail=zs,this.stencilZPass=zs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const r=e[i];if(r===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Ds&&(r.blending=this.blending),this.side!==ir&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Tf&&(r.blendSrc=this.blendSrc),this.blendDst!==bf&&(r.blendDst=this.blendDst),this.blendEquation!==kr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Us&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mg&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zs&&(r.stencilFail=this.stencilFail),this.stencilZFail!==zs&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==zs&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(c){const h=[];for(const d in c){const m=c[d];delete m.metadata,h.push(m)}return h}if(i){const c=l(e.textures),h=l(e.images);c.length>0&&(r.textures=c),h.length>0&&(r.images=h)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let c=0;c!==l;++c)r[c]=i[c].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Vh extends il{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ha,this.combine=ig,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Sn=new Y,bc=new qt;let mM=0;class xi{constructor(e,i,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mM++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=r,this.usage=vg,this.updateRanges=[],this.gpuType=wa,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[r+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)bc.fromBufferAttribute(this,i),bc.applyMatrix3(e),this.setXY(i,bc.x,bc.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)Sn.fromBufferAttribute(this,i),Sn.applyMatrix3(e),this.setXYZ(i,Sn.x,Sn.y,Sn.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)Sn.fromBufferAttribute(this,i),Sn.applyMatrix4(e),this.setXYZ(i,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)Sn.fromBufferAttribute(this,i),Sn.applyNormalMatrix(e),this.setXYZ(i,Sn.x,Sn.y,Sn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)Sn.fromBufferAttribute(this,i),Sn.transformDirection(e),this.setXYZ(i,Sn.x,Sn.y,Sn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=Qo(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=ci(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Qo(i,this.array)),i}setX(e,i){return this.normalized&&(i=ci(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Qo(i,this.array)),i}setY(e,i){return this.normalized&&(i=ci(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Qo(i,this.array)),i}setZ(e,i){return this.normalized&&(i=ci(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Qo(i,this.array)),i}setW(e,i){return this.normalized&&(i=ci(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=ci(i,this.array),r=ci(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,l){return e*=this.itemSize,this.normalized&&(i=ci(i,this.array),r=ci(r,this.array),l=ci(l,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this}setXYZW(e,i,r,l,c){return e*=this.itemSize,this.normalized&&(i=ci(i,this.array),r=ci(r,this.array),l=ci(l,this.array),c=ci(c,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vg&&(e.usage=this.usage),e}}class zg extends xi{constructor(e,i,r){super(new Uint16Array(e),i,r)}}class Pg extends xi{constructor(e,i,r){super(new Uint32Array(e),i,r)}}class ni extends xi{constructor(e,i,r){super(new Float32Array(e),i,r)}}let gM=0;const Ni=new sn,Gh=new jn,Zs=new Y,Mi=new $o,al=new $o,Un=new Y;class Qi extends Ps{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gM++}),this.uuid=Is(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sg(e)?Pg:zg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new xe().getNormalMatrix(e);r.applyNormalMatrix(c),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ni.makeRotationFromQuaternion(e),this.applyMatrix4(Ni),this}rotateX(e){return Ni.makeRotationX(e),this.applyMatrix4(Ni),this}rotateY(e){return Ni.makeRotationY(e),this.applyMatrix4(Ni),this}rotateZ(e){return Ni.makeRotationZ(e),this.applyMatrix4(Ni),this}translate(e,i,r){return Ni.makeTranslation(e,i,r),this.applyMatrix4(Ni),this}scale(e,i,r){return Ni.makeScale(e,i,r),this.applyMatrix4(Ni),this}lookAt(e){return Gh.lookAt(e),Gh.updateMatrix(),this.applyMatrix4(Gh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,c=e.length;l<c;l++){const h=e[l];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new ni(r,3))}else{const r=Math.min(e.length,i.count);for(let l=0;l<r;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $o);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,l=i.length;r<l;r++){const c=i[r];Mi.setFromBufferAttribute(c),this.morphTargetsRelative?(Un.addVectors(this.boundingBox.min,Mi.min),this.boundingBox.expandByPoint(Un),Un.addVectors(this.boundingBox.max,Mi.max),this.boundingBox.expandByPoint(Un)):(this.boundingBox.expandByPoint(Mi.min),this.boundingBox.expandByPoint(Mi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rh);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const r=this.boundingSphere.center;if(Mi.setFromBufferAttribute(e),i)for(let c=0,h=i.length;c<h;c++){const d=i[c];al.setFromBufferAttribute(d),this.morphTargetsRelative?(Un.addVectors(Mi.min,al.min),Mi.expandByPoint(Un),Un.addVectors(Mi.max,al.max),Mi.expandByPoint(Un)):(Mi.expandByPoint(al.min),Mi.expandByPoint(al.max))}Mi.getCenter(r);let l=0;for(let c=0,h=e.count;c<h;c++)Un.fromBufferAttribute(e,c),l=Math.max(l,r.distanceToSquared(Un));if(i)for(let c=0,h=i.length;c<h;c++){const d=i[c],m=this.morphTargetsRelative;for(let p=0,v=d.count;p<v;p++)Un.fromBufferAttribute(d,p),m&&(Zs.fromBufferAttribute(e,p),Un.add(Zs)),l=Math.max(l,r.distanceToSquared(Un))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xi(new Float32Array(4*r.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let V=0;V<r.count;V++)d[V]=new Y,m[V]=new Y;const p=new Y,v=new Y,g=new Y,y=new qt,x=new qt,E=new qt,A=new Y,M=new Y;function S(V,D,C){p.fromBufferAttribute(r,V),v.fromBufferAttribute(r,D),g.fromBufferAttribute(r,C),y.fromBufferAttribute(c,V),x.fromBufferAttribute(c,D),E.fromBufferAttribute(c,C),v.sub(p),g.sub(p),x.sub(y),E.sub(y);const H=1/(x.x*E.y-E.x*x.y);isFinite(H)&&(A.copy(v).multiplyScalar(E.y).addScaledVector(g,-x.y).multiplyScalar(H),M.copy(g).multiplyScalar(x.x).addScaledVector(v,-E.x).multiplyScalar(H),d[V].add(A),d[D].add(A),d[C].add(A),m[V].add(M),m[D].add(M),m[C].add(M))}let L=this.groups;L.length===0&&(L=[{start:0,count:e.count}]);for(let V=0,D=L.length;V<D;++V){const C=L[V],H=C.start,st=C.count;for(let ft=H,q=H+st;ft<q;ft+=3)S(e.getX(ft+0),e.getX(ft+1),e.getX(ft+2))}const N=new Y,w=new Y,G=new Y,B=new Y;function P(V){G.fromBufferAttribute(l,V),B.copy(G);const D=d[V];N.copy(D),N.sub(G.multiplyScalar(G.dot(D))).normalize(),w.crossVectors(B,D);const H=w.dot(m[V])<0?-1:1;h.setXYZW(V,N.x,N.y,N.z,H)}for(let V=0,D=L.length;V<D;++V){const C=L[V],H=C.start,st=C.count;for(let ft=H,q=H+st;ft<q;ft+=3)P(e.getX(ft+0)),P(e.getX(ft+1)),P(e.getX(ft+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new xi(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let y=0,x=r.count;y<x;y++)r.setXYZ(y,0,0,0);const l=new Y,c=new Y,h=new Y,d=new Y,m=new Y,p=new Y,v=new Y,g=new Y;if(e)for(let y=0,x=e.count;y<x;y+=3){const E=e.getX(y+0),A=e.getX(y+1),M=e.getX(y+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,A),h.fromBufferAttribute(i,M),v.subVectors(h,c),g.subVectors(l,c),v.cross(g),d.fromBufferAttribute(r,E),m.fromBufferAttribute(r,A),p.fromBufferAttribute(r,M),d.add(v),m.add(v),p.add(v),r.setXYZ(E,d.x,d.y,d.z),r.setXYZ(A,m.x,m.y,m.z),r.setXYZ(M,p.x,p.y,p.z)}else for(let y=0,x=i.count;y<x;y+=3)l.fromBufferAttribute(i,y+0),c.fromBufferAttribute(i,y+1),h.fromBufferAttribute(i,y+2),v.subVectors(h,c),g.subVectors(l,c),v.cross(g),r.setXYZ(y+0,v.x,v.y,v.z),r.setXYZ(y+1,v.x,v.y,v.z),r.setXYZ(y+2,v.x,v.y,v.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)Un.fromBufferAttribute(e,i),Un.normalize(),e.setXYZ(i,Un.x,Un.y,Un.z)}toNonIndexed(){function e(d,m){const p=d.array,v=d.itemSize,g=d.normalized,y=new p.constructor(m.length*v);let x=0,E=0;for(let A=0,M=m.length;A<M;A++){d.isInterleavedBufferAttribute?x=m[A]*d.data.stride+d.offset:x=m[A]*v;for(let S=0;S<v;S++)y[E++]=p[x++]}return new xi(y,v,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Qi,r=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=e(m,r);i.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let v=0,g=p.length;v<g;v++){const y=p[v],x=e(y,r);m.push(x)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const m in r){const p=r[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],v=[];for(let g=0,y=p.length;g<y;g++){const x=p[g];v.push(x.toJSON(e.data))}v.length>0&&(l[m]=v,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const l=e.attributes;for(const p in l){const v=l[p];this.setAttribute(p,v.clone(i))}const c=e.morphAttributes;for(const p in c){const v=[],g=c[p];for(let y=0,x=g.length;y<x;y++)v.push(g[y].clone(i));this.morphAttributes[p]=v}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let p=0,v=h.length;p<v;p++){const g=h[p];this.addGroup(g.start,g.count,g.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ig=new sn,Kr=new bg,Ac=new Rh,Bg=new Y,Rc=new Y,Cc=new Y,wc=new Y,Xh=new Y,Dc=new Y,Fg=new Y,Uc=new Y;class Fn extends jn{constructor(e=new Qi,i=new Vh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(e,i){const r=this.geometry,l=r.attributes.position,c=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(l,e);const d=this.morphTargetInfluences;if(c&&d){Dc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const v=d[m],g=c[m];v!==0&&(Xh.fromBufferAttribute(g,e),h?Dc.addScaledVector(Xh,v):Dc.addScaledVector(Xh.sub(i),v))}i.add(Dc)}return i}raycast(e,i){const r=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Ac.copy(r.boundingSphere),Ac.applyMatrix4(c),Kr.copy(e.ray).recast(e.near),!(Ac.containsPoint(Kr.origin)===!1&&(Kr.intersectSphere(Ac,Bg)===null||Kr.origin.distanceToSquared(Bg)>(e.far-e.near)**2))&&(Ig.copy(c).invert(),Kr.copy(e.ray).applyMatrix4(Ig),!(r.boundingBox!==null&&Kr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,i,Kr)))}_computeIntersections(e,i,r){let l;const c=this.geometry,h=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,v=c.attributes.uv1,g=c.attributes.normal,y=c.groups,x=c.drawRange;if(d!==null)if(Array.isArray(h))for(let E=0,A=y.length;E<A;E++){const M=y[E],S=h[M.materialIndex],L=Math.max(M.start,x.start),N=Math.min(d.count,Math.min(M.start+M.count,x.start+x.count));for(let w=L,G=N;w<G;w+=3){const B=d.getX(w),P=d.getX(w+1),V=d.getX(w+2);l=Nc(this,S,e,r,p,v,g,B,P,V),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const E=Math.max(0,x.start),A=Math.min(d.count,x.start+x.count);for(let M=E,S=A;M<S;M+=3){const L=d.getX(M),N=d.getX(M+1),w=d.getX(M+2);l=Nc(this,h,e,r,p,v,g,L,N,w),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let E=0,A=y.length;E<A;E++){const M=y[E],S=h[M.materialIndex],L=Math.max(M.start,x.start),N=Math.min(m.count,Math.min(M.start+M.count,x.start+x.count));for(let w=L,G=N;w<G;w+=3){const B=w,P=w+1,V=w+2;l=Nc(this,S,e,r,p,v,g,B,P,V),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const E=Math.max(0,x.start),A=Math.min(m.count,x.start+x.count);for(let M=E,S=A;M<S;M+=3){const L=M,N=M+1,w=M+2;l=Nc(this,h,e,r,p,v,g,L,N,w),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}}}function vM(s,e,i,r,l,c,h,d){let m;if(e.side===li?m=r.intersectTriangle(h,c,l,!0,d):m=r.intersectTriangle(l,c,h,e.side===ir,d),m===null)return null;Uc.copy(d),Uc.applyMatrix4(s.matrixWorld);const p=i.ray.origin.distanceTo(Uc);return p<i.near||p>i.far?null:{distance:p,point:Uc.clone(),object:s}}function Nc(s,e,i,r,l,c,h,d,m,p){s.getVertexPosition(d,Rc),s.getVertexPosition(m,Cc),s.getVertexPosition(p,wc);const v=vM(s,e,i,r,Rc,Cc,wc,Fg);if(v){const g=new Y;ji.getBarycoord(Fg,Rc,Cc,wc,g),l&&(v.uv=ji.getInterpolatedAttribute(l,d,m,p,g,new qt)),c&&(v.uv1=ji.getInterpolatedAttribute(c,d,m,p,g,new qt)),h&&(v.normal=ji.getInterpolatedAttribute(h,d,m,p,g,new Y),v.normal.dot(r.direction)>0&&v.normal.multiplyScalar(-1));const y={a:d,b:m,c:p,normal:new Y,materialIndex:0};ji.getNormal(Rc,Cc,wc,y.normal),v.face=y,v.barycoord=g}return v}class rl extends Qi{constructor(e=1,i=1,r=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:l,heightSegments:c,depthSegments:h};const d=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],p=[],v=[],g=[];let y=0,x=0;E("z","y","x",-1,-1,r,i,e,h,c,0),E("z","y","x",1,-1,r,i,-e,h,c,1),E("x","z","y",1,1,e,r,i,l,h,2),E("x","z","y",1,-1,e,r,-i,l,h,3),E("x","y","z",1,-1,e,i,r,l,c,4),E("x","y","z",-1,-1,e,i,-r,l,c,5),this.setIndex(m),this.setAttribute("position",new ni(p,3)),this.setAttribute("normal",new ni(v,3)),this.setAttribute("uv",new ni(g,2));function E(A,M,S,L,N,w,G,B,P,V,D){const C=w/P,H=G/V,st=w/2,ft=G/2,q=B/2,Q=P+1,F=V+1;let nt=0,Z=0;const xt=new Y;for(let vt=0;vt<F;vt++){const Nt=vt*H-ft;for(let Qt=0;Qt<Q;Qt++){const ae=Qt*C-st;xt[A]=ae*L,xt[M]=Nt*N,xt[S]=q,p.push(xt.x,xt.y,xt.z),xt[A]=0,xt[M]=0,xt[S]=B>0?1:-1,v.push(xt.x,xt.y,xt.z),g.push(Qt/P),g.push(1-vt/V),nt+=1}}for(let vt=0;vt<V;vt++)for(let Nt=0;Nt<P;Nt++){const Qt=y+Nt+Q*vt,ae=y+Nt+Q*(vt+1),I=y+(Nt+1)+Q*(vt+1),lt=y+(Nt+1)+Q*vt;m.push(Qt,ae,lt),m.push(ae,I,lt),Z+=6}d.addGroup(x,Z,D),x+=Z,y+=nt}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ks(s){const e={};for(const i in s){e[i]={};for(const r in s[i]){const l=s[i][r];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=l.clone():Array.isArray(l)?e[i][r]=l.slice():e[i][r]=l}}return e}function ii(s){const e={};for(let i=0;i<s.length;i++){const r=Ks(s[i]);for(const l in r)e[l]=r[l]}return e}function _M(s){const e=[];for(let i=0;i<s.length;i++)e.push(s[i].clone());return e}function Hg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ge.workingColorSpace}const yM={clone:Ks,merge:ii};var SM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pr extends il{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=SM,this.fragmentShader=xM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ks(e.uniforms),this.uniformsGroups=_M(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class Vg extends jn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new sn,this.projectionMatrix=new sn,this.projectionMatrixInverse=new sn,this.coordinateSystem=fa,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const mr=new Y,Gg=new qt,Xg=new qt;class Li extends Vg{constructor(e=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=_h*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vh*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _h*2*Math.atan(Math.tan(vh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,r){mr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(mr.x,mr.y).multiplyScalar(-e/mr.z),mr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(mr.x,mr.y).multiplyScalar(-e/mr.z)}getViewSize(e,i){return this.getViewBounds(e,Gg,Xg),i.subVectors(Xg,Gg)}setViewOffset(e,i,r,l,c,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(vh*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*r/p,l*=h.width/m,r*=h.height/p}const d=this.filmOffset;d!==0&&(c+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const js=-90,Qs=1;class MM extends jn{constructor(e,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Li(js,Qs,e,i);l.layers=this.layers,this.add(l);const c=new Li(js,Qs,e,i);c.layers=this.layers,this.add(c);const h=new Li(js,Qs,e,i);h.layers=this.layers,this.add(h);const d=new Li(js,Qs,e,i);d.layers=this.layers,this.add(d);const m=new Li(js,Qs,e,i);m.layers=this.layers,this.add(m);const p=new Li(js,Qs,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[r,l,c,h,d,m]=i;for(const p of i)this.remove(p);if(e===fa)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===mc)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,h,d,m,p,v]=this.children,g=e.getRenderTarget(),y=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const A=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,l),e.render(i,c),e.setRenderTarget(r,1,l),e.render(i,h),e.setRenderTarget(r,2,l),e.render(i,d),e.setRenderTarget(r,3,l),e.render(i,m),e.setRenderTarget(r,4,l),e.render(i,p),r.texture.generateMipmaps=A,e.setRenderTarget(r,5,l),e.render(i,v),e.setRenderTarget(g,y,x),e.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class kg extends Kn{constructor(e=[],i=Ns,r,l,c,h,d,m,p,v){super(e,i,r,l,c,h,d,m,p,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class EM extends Yr{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},l=[r,r,r,r,r,r];this.texture=new kg(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new rl(5,5,5),c=new pr({name:"CubemapFromEquirect",uniforms:Ks(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:li,blending:ar});c.uniforms.tEquirect.value=i;const h=new Fn(l,c),d=i.minFilter;return i.minFilter===Ca&&(i.minFilter=Ui),new MM(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i=!0,r=!0,l=!0){const c=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,r,l);e.setRenderTarget(c)}}class Js extends jn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const TM={type:"move"};class kh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Js,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Js,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Js,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let l=null,c=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){h=!0;for(const A of e.hand.values()){const M=i.getJointPose(A,r),S=this._getHandJoint(p,A);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const v=p.joints["index-finger-tip"],g=p.joints["thumb-tip"],y=v.position.distanceTo(g.position),x=.02,E=.005;p.inputState.pinching&&y>x+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&y<=x-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,r),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(e.targetRaySpace,r),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(TM)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const r=new Js;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}}class qg extends jn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ha,this.environmentIntensity=1,this.environmentRotation=new ha,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}class bM extends Kn{constructor(e=null,i=1,r=1,l,c,h,d,m,p=yi,v=yi,g,y){super(null,h,d,m,p,v,l,c,g,y),this.isDataTexture=!0,this.image={data:e,width:i,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qh=new Y,AM=new Y,RM=new xe;class jr{constructor(e=new Y(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,l){return this.normal.set(e,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){const l=qh.subVectors(r,i).cross(AM.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const r=e.delta(qh),l=this.normal.dot(r);if(l===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(e.start).addScaledVector(r,c)}intersectsLine(e){const i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const r=i||RM.getNormalMatrix(e),l=this.coplanarPoint(qh).applyMatrix4(e),c=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qr=new Rh,CM=new qt(.5,.5),Lc=new Y;class Yh{constructor(e=new jr,i=new jr,r=new jr,l=new jr,c=new jr,h=new jr){this.planes=[e,i,r,l,c,h]}set(e,i,r,l,c,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(r),d[3].copy(l),d[4].copy(c),d[5].copy(h),this}copy(e){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,i=fa,r=!1){const l=this.planes,c=e.elements,h=c[0],d=c[1],m=c[2],p=c[3],v=c[4],g=c[5],y=c[6],x=c[7],E=c[8],A=c[9],M=c[10],S=c[11],L=c[12],N=c[13],w=c[14],G=c[15];if(l[0].setComponents(p-h,x-v,S-E,G-L).normalize(),l[1].setComponents(p+h,x+v,S+E,G+L).normalize(),l[2].setComponents(p+d,x+g,S+A,G+N).normalize(),l[3].setComponents(p-d,x-g,S-A,G-N).normalize(),r)l[4].setComponents(m,y,M,w).normalize(),l[5].setComponents(p-m,x-y,S-M,G-w).normalize();else if(l[4].setComponents(p-m,x-y,S-M,G-w).normalize(),i===fa)l[5].setComponents(p+m,x+y,S+M,G+w).normalize();else if(i===mc)l[5].setComponents(m,y,M,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Qr.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qr)}intersectsSprite(e){Qr.center.set(0,0,0);const i=CM.distanceTo(e.center);return Qr.radius=.7071067811865476+i,Qr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qr)}intersectsSphere(e){const i=this.planes,r=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(r)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(Lc.x=l.normal.x>0?e.max.x:e.min.x,Lc.y=l.normal.y>0?e.max.y:e.min.y,Lc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Lc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wh extends Kn{constructor(e,i,r,l,c,h,d,m,p){super(e,i,r,l,c,h,d,m,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Yg extends Kn{constructor(e,i,r=qr,l,c,h,d=yi,m=yi,p,v=Ko,g=1){if(v!==Ko&&v!==jo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const y={width:e,height:i,depth:g};super(y,l,c,h,d,m,v,r,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Mh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Wg extends Kn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class da{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,i){const r=this.getUtoTmapping(e);return this.getPoint(r,i)}getPoints(e=5){const i=[];for(let r=0;r<=e;r++)i.push(this.getPoint(r/e));return i}getSpacedPoints(e=5){const i=[];for(let r=0;r<=e;r++)i.push(this.getPointAt(r/e));return i}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const i=[];let r,l=this.getPoint(0),c=0;i.push(0);for(let h=1;h<=e;h++)r=this.getPoint(h/e),c+=r.distanceTo(l),i.push(c),l=r;return this.cacheArcLengths=i,i}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,i=null){const r=this.getLengths();let l=0;const c=r.length;let h;i?h=i:h=e*r[c-1];let d=0,m=c-1,p;for(;d<=m;)if(l=Math.floor(d+(m-d)/2),p=r[l]-h,p<0)d=l+1;else if(p>0)m=l-1;else{m=l;break}if(l=m,r[l]===h)return l/(c-1);const v=r[l],y=r[l+1]-v,x=(h-v)/y;return(l+x)/(c-1)}getTangent(e,i){let l=e-1e-4,c=e+1e-4;l<0&&(l=0),c>1&&(c=1);const h=this.getPoint(l),d=this.getPoint(c),m=i||(h.isVector2?new qt:new Y);return m.copy(d).sub(h).normalize(),m}getTangentAt(e,i){const r=this.getUtoTmapping(e);return this.getTangent(r,i)}computeFrenetFrames(e,i=!1){const r=new Y,l=[],c=[],h=[],d=new Y,m=new sn;for(let x=0;x<=e;x++){const E=x/e;l[x]=this.getTangentAt(E,new Y)}c[0]=new Y,h[0]=new Y;let p=Number.MAX_VALUE;const v=Math.abs(l[0].x),g=Math.abs(l[0].y),y=Math.abs(l[0].z);v<=p&&(p=v,r.set(1,0,0)),g<=p&&(p=g,r.set(0,1,0)),y<=p&&r.set(0,0,1),d.crossVectors(l[0],r).normalize(),c[0].crossVectors(l[0],d),h[0].crossVectors(l[0],c[0]);for(let x=1;x<=e;x++){if(c[x]=c[x-1].clone(),h[x]=h[x-1].clone(),d.crossVectors(l[x-1],l[x]),d.length()>Number.EPSILON){d.normalize();const E=Math.acos(Ae(l[x-1].dot(l[x]),-1,1));c[x].applyMatrix4(m.makeRotationAxis(d,E))}h[x].crossVectors(l[x],c[x])}if(i===!0){let x=Math.acos(Ae(c[0].dot(c[e]),-1,1));x/=e,l[0].dot(d.crossVectors(c[0],c[e]))>0&&(x=-x);for(let E=1;E<=e;E++)c[E].applyMatrix4(m.makeRotationAxis(l[E],x*E)),h[E].crossVectors(l[E],c[E])}return{tangents:l,normals:c,binormals:h}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Zh extends da{constructor(e=0,i=0,r=1,l=1,c=0,h=Math.PI*2,d=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=i,this.xRadius=r,this.yRadius=l,this.aStartAngle=c,this.aEndAngle=h,this.aClockwise=d,this.aRotation=m}getPoint(e,i=new qt){const r=i,l=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const h=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=l;for(;c>l;)c-=l;c<Number.EPSILON&&(h?c=0:c=l),this.aClockwise===!0&&!h&&(c===l?c=-l:c=c-l);const d=this.aStartAngle+e*c;let m=this.aX+this.xRadius*Math.cos(d),p=this.aY+this.yRadius*Math.sin(d);if(this.aRotation!==0){const v=Math.cos(this.aRotation),g=Math.sin(this.aRotation),y=m-this.aX,x=p-this.aY;m=y*v-x*g+this.aX,p=y*g+x*v+this.aY}return r.set(m,p)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class wM extends Zh{constructor(e,i,r,l,c,h){super(e,i,r,r,l,c,h),this.isArcCurve=!0,this.type="ArcCurve"}}function Kh(){let s=0,e=0,i=0,r=0;function l(c,h,d,m){s=c,e=d,i=-3*c+3*h-2*d-m,r=2*c-2*h+d+m}return{initCatmullRom:function(c,h,d,m,p){l(h,d,p*(d-c),p*(m-h))},initNonuniformCatmullRom:function(c,h,d,m,p,v,g){let y=(h-c)/p-(d-c)/(p+v)+(d-h)/v,x=(d-h)/v-(m-h)/(v+g)+(m-d)/g;y*=v,x*=v,l(h,d,y,x)},calc:function(c){const h=c*c,d=h*c;return s+e*c+i*h+r*d}}}const Oc=new Y,jh=new Kh,Qh=new Kh,Jh=new Kh;class Zg extends da{constructor(e=[],i=!1,r="centripetal",l=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=i,this.curveType=r,this.tension=l}getPoint(e,i=new Y){const r=i,l=this.points,c=l.length,h=(c-(this.closed?0:1))*e;let d=Math.floor(h),m=h-d;this.closed?d+=d>0?0:(Math.floor(Math.abs(d)/c)+1)*c:m===0&&d===c-1&&(d=c-2,m=1);let p,v;this.closed||d>0?p=l[(d-1)%c]:(Oc.subVectors(l[0],l[1]).add(l[0]),p=Oc);const g=l[d%c],y=l[(d+1)%c];if(this.closed||d+2<c?v=l[(d+2)%c]:(Oc.subVectors(l[c-1],l[c-2]).add(l[c-1]),v=Oc),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let E=Math.pow(p.distanceToSquared(g),x),A=Math.pow(g.distanceToSquared(y),x),M=Math.pow(y.distanceToSquared(v),x);A<1e-4&&(A=1),E<1e-4&&(E=A),M<1e-4&&(M=A),jh.initNonuniformCatmullRom(p.x,g.x,y.x,v.x,E,A,M),Qh.initNonuniformCatmullRom(p.y,g.y,y.y,v.y,E,A,M),Jh.initNonuniformCatmullRom(p.z,g.z,y.z,v.z,E,A,M)}else this.curveType==="catmullrom"&&(jh.initCatmullRom(p.x,g.x,y.x,v.x,this.tension),Qh.initCatmullRom(p.y,g.y,y.y,v.y,this.tension),Jh.initCatmullRom(p.z,g.z,y.z,v.z,this.tension));return r.set(jh.calc(m),Qh.calc(m),Jh.calc(m)),r}copy(e){super.copy(e),this.points=[];for(let i=0,r=e.points.length;i<r;i++){const l=e.points[i];this.points.push(l.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let i=0,r=this.points.length;i<r;i++){const l=this.points[i];e.points.push(l.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let i=0,r=e.points.length;i<r;i++){const l=e.points[i];this.points.push(new Y().fromArray(l))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Kg(s,e,i,r,l){const c=(r-e)*.5,h=(l-i)*.5,d=s*s,m=s*d;return(2*i-2*r+c+h)*m+(-3*i+3*r-2*c-h)*d+c*s+i}function DM(s,e){const i=1-s;return i*i*e}function UM(s,e){return 2*(1-s)*s*e}function NM(s,e){return s*s*e}function sl(s,e,i,r){return DM(s,e)+UM(s,i)+NM(s,r)}function LM(s,e){const i=1-s;return i*i*i*e}function OM(s,e){const i=1-s;return 3*i*i*s*e}function zM(s,e){return 3*(1-s)*s*s*e}function PM(s,e){return s*s*s*e}function ol(s,e,i,r,l){return LM(s,e)+OM(s,i)+zM(s,r)+PM(s,l)}class jg extends da{constructor(e=new qt,i=new qt,r=new qt,l=new qt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=i,this.v2=r,this.v3=l}getPoint(e,i=new qt){const r=i,l=this.v0,c=this.v1,h=this.v2,d=this.v3;return r.set(ol(e,l.x,c.x,h.x,d.x),ol(e,l.y,c.y,h.y,d.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class IM extends da{constructor(e=new Y,i=new Y,r=new Y,l=new Y){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=i,this.v2=r,this.v3=l}getPoint(e,i=new Y){const r=i,l=this.v0,c=this.v1,h=this.v2,d=this.v3;return r.set(ol(e,l.x,c.x,h.x,d.x),ol(e,l.y,c.y,h.y,d.y),ol(e,l.z,c.z,h.z,d.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Qg extends da{constructor(e=new qt,i=new qt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=i}getPoint(e,i=new qt){const r=i;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,i){return this.getPoint(e,i)}getTangent(e,i=new qt){return i.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,i){return this.getTangent(e,i)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class BM extends da{constructor(e=new Y,i=new Y){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=i}getPoint(e,i=new Y){const r=i;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,i){return this.getPoint(e,i)}getTangent(e,i=new Y){return i.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,i){return this.getTangent(e,i)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jg extends da{constructor(e=new qt,i=new qt,r=new qt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=i,this.v2=r}getPoint(e,i=new qt){const r=i,l=this.v0,c=this.v1,h=this.v2;return r.set(sl(e,l.x,c.x,h.x),sl(e,l.y,c.y,h.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class FM extends da{constructor(e=new Y,i=new Y,r=new Y){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=i,this.v2=r}getPoint(e,i=new Y){const r=i,l=this.v0,c=this.v1,h=this.v2;return r.set(sl(e,l.x,c.x,h.x),sl(e,l.y,c.y,h.y),sl(e,l.z,c.z,h.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $g extends da{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,i=new qt){const r=i,l=this.points,c=(l.length-1)*e,h=Math.floor(c),d=c-h,m=l[h===0?h:h-1],p=l[h],v=l[h>l.length-2?l.length-1:h+1],g=l[h>l.length-3?l.length-1:h+2];return r.set(Kg(d,m.x,p.x,v.x,g.x),Kg(d,m.y,p.y,v.y,g.y)),r}copy(e){super.copy(e),this.points=[];for(let i=0,r=e.points.length;i<r;i++){const l=e.points[i];this.points.push(l.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let i=0,r=this.points.length;i<r;i++){const l=this.points[i];e.points.push(l.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let i=0,r=e.points.length;i<r;i++){const l=e.points[i];this.points.push(new qt().fromArray(l))}return this}}var $h=Object.freeze({__proto__:null,ArcCurve:wM,CatmullRomCurve3:Zg,CubicBezierCurve:jg,CubicBezierCurve3:IM,EllipseCurve:Zh,LineCurve:Qg,LineCurve3:BM,QuadraticBezierCurve:Jg,QuadraticBezierCurve3:FM,SplineCurve:$g});class HM extends da{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),i=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(i)){const r=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new $h[r](i,e))}return this}getPoint(e,i){const r=e*this.getLength(),l=this.getCurveLengths();let c=0;for(;c<l.length;){if(l[c]>=r){const h=l[c]-r,d=this.curves[c],m=d.getLength(),p=m===0?0:1-h/m;return d.getPointAt(p,i)}c++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let i=0;for(let r=0,l=this.curves.length;r<l;r++)i+=this.curves[r].getLength(),e.push(i);return this.cacheLengths=e,e}getSpacedPoints(e=40){const i=[];for(let r=0;r<=e;r++)i.push(this.getPoint(r/e));return this.autoClose&&i.push(i[0]),i}getPoints(e=12){const i=[];let r;for(let l=0,c=this.curves;l<c.length;l++){const h=c[l],d=h.isEllipseCurve?e*2:h.isLineCurve||h.isLineCurve3?1:h.isSplineCurve?e*h.points.length:e,m=h.getPoints(d);for(let p=0;p<m.length;p++){const v=m[p];r&&r.equals(v)||(i.push(v),r=v)}}return this.autoClose&&i.length>1&&!i[i.length-1].equals(i[0])&&i.push(i[0]),i}copy(e){super.copy(e),this.curves=[];for(let i=0,r=e.curves.length;i<r;i++){const l=e.curves[i];this.curves.push(l.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let i=0,r=this.curves.length;i<r;i++){const l=this.curves[i];e.curves.push(l.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let i=0,r=e.curves.length;i<r;i++){const l=e.curves[i];this.curves.push(new $h[l.type]().fromJSON(l))}return this}}class td extends HM{constructor(e){super(),this.type="Path",this.currentPoint=new qt,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let i=1,r=e.length;i<r;i++)this.lineTo(e[i].x,e[i].y);return this}moveTo(e,i){return this.currentPoint.set(e,i),this}lineTo(e,i){const r=new Qg(this.currentPoint.clone(),new qt(e,i));return this.curves.push(r),this.currentPoint.set(e,i),this}quadraticCurveTo(e,i,r,l){const c=new Jg(this.currentPoint.clone(),new qt(e,i),new qt(r,l));return this.curves.push(c),this.currentPoint.set(r,l),this}bezierCurveTo(e,i,r,l,c,h){const d=new jg(this.currentPoint.clone(),new qt(e,i),new qt(r,l),new qt(c,h));return this.curves.push(d),this.currentPoint.set(c,h),this}splineThru(e){const i=[this.currentPoint.clone()].concat(e),r=new $g(i);return this.curves.push(r),this.currentPoint.copy(e[e.length-1]),this}arc(e,i,r,l,c,h){const d=this.currentPoint.x,m=this.currentPoint.y;return this.absarc(e+d,i+m,r,l,c,h),this}absarc(e,i,r,l,c,h){return this.absellipse(e,i,r,r,l,c,h),this}ellipse(e,i,r,l,c,h,d,m){const p=this.currentPoint.x,v=this.currentPoint.y;return this.absellipse(e+p,i+v,r,l,c,h,d,m),this}absellipse(e,i,r,l,c,h,d,m){const p=new Zh(e,i,r,l,c,h,d,m);if(this.curves.length>0){const g=p.getPoint(0);g.equals(this.currentPoint)||this.lineTo(g.x,g.y)}this.curves.push(p);const v=p.getPoint(1);return this.currentPoint.copy(v),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class zc extends td{constructor(e){super(e),this.uuid=Is(),this.type="Shape",this.holes=[]}getPointsHoles(e){const i=[];for(let r=0,l=this.holes.length;r<l;r++)i[r]=this.holes[r].getPoints(e);return i}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let i=0,r=e.holes.length;i<r;i++){const l=e.holes[i];this.holes.push(l.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let i=0,r=this.holes.length;i<r;i++){const l=this.holes[i];e.holes.push(l.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let i=0,r=e.holes.length;i<r;i++){const l=e.holes[i];this.holes.push(new td().fromJSON(l))}return this}}function VM(s,e,i=2){const r=e&&e.length,l=r?e[0]*i:s.length;let c=t0(s,0,l,i,!0);const h=[];if(!c||c.next===c.prev)return h;let d,m,p;if(r&&(c=YM(s,e,c,i)),s.length>80*i){d=1/0,m=1/0;let v=-1/0,g=-1/0;for(let y=i;y<l;y+=i){const x=s[y],E=s[y+1];x<d&&(d=x),E<m&&(m=E),x>v&&(v=x),E>g&&(g=E)}p=Math.max(v-d,g-m),p=p!==0?32767/p:0}return ll(c,h,i,d,m,p,0),h}function t0(s,e,i,r,l){let c;if(l===iE(s,e,i,r)>0)for(let h=e;h<i;h+=r)c=a0(h/r|0,s[h],s[h+1],c);else for(let h=i-r;h>=e;h-=r)c=a0(h/r|0,s[h],s[h+1],c);return c&&$s(c,c.next)&&(fl(c),c=c.next),c}function Jr(s,e){if(!s)return s;e||(e=s);let i=s,r;do if(r=!1,!i.steiner&&($s(i,i.next)||ln(i.prev,i,i.next)===0)){if(fl(i),i=e=i.prev,i===i.next)break;r=!0}else i=i.next;while(r||i!==e);return e}function ll(s,e,i,r,l,c,h){if(!s)return;!h&&c&&QM(s,r,l,c);let d=s;for(;s.prev!==s.next;){const m=s.prev,p=s.next;if(c?XM(s,r,l,c):GM(s)){e.push(m.i,s.i,p.i),fl(s),s=p.next,d=p.next;continue}if(s=p,s===d){h?h===1?(s=kM(Jr(s),e),ll(s,e,i,r,l,c,2)):h===2&&qM(s,e,i,r,l,c):ll(Jr(s),e,i,r,l,c,1);break}}}function GM(s){const e=s.prev,i=s,r=s.next;if(ln(e,i,r)>=0)return!1;const l=e.x,c=i.x,h=r.x,d=e.y,m=i.y,p=r.y,v=Math.min(l,c,h),g=Math.min(d,m,p),y=Math.max(l,c,h),x=Math.max(d,m,p);let E=r.next;for(;E!==e;){if(E.x>=v&&E.x<=y&&E.y>=g&&E.y<=x&&cl(l,d,c,m,h,p,E.x,E.y)&&ln(E.prev,E,E.next)>=0)return!1;E=E.next}return!0}function XM(s,e,i,r){const l=s.prev,c=s,h=s.next;if(ln(l,c,h)>=0)return!1;const d=l.x,m=c.x,p=h.x,v=l.y,g=c.y,y=h.y,x=Math.min(d,m,p),E=Math.min(v,g,y),A=Math.max(d,m,p),M=Math.max(v,g,y),S=ed(x,E,e,i,r),L=ed(A,M,e,i,r);let N=s.prevZ,w=s.nextZ;for(;N&&N.z>=S&&w&&w.z<=L;){if(N.x>=x&&N.x<=A&&N.y>=E&&N.y<=M&&N!==l&&N!==h&&cl(d,v,m,g,p,y,N.x,N.y)&&ln(N.prev,N,N.next)>=0||(N=N.prevZ,w.x>=x&&w.x<=A&&w.y>=E&&w.y<=M&&w!==l&&w!==h&&cl(d,v,m,g,p,y,w.x,w.y)&&ln(w.prev,w,w.next)>=0))return!1;w=w.nextZ}for(;N&&N.z>=S;){if(N.x>=x&&N.x<=A&&N.y>=E&&N.y<=M&&N!==l&&N!==h&&cl(d,v,m,g,p,y,N.x,N.y)&&ln(N.prev,N,N.next)>=0)return!1;N=N.prevZ}for(;w&&w.z<=L;){if(w.x>=x&&w.x<=A&&w.y>=E&&w.y<=M&&w!==l&&w!==h&&cl(d,v,m,g,p,y,w.x,w.y)&&ln(w.prev,w,w.next)>=0)return!1;w=w.nextZ}return!0}function kM(s,e){let i=s;do{const r=i.prev,l=i.next.next;!$s(r,l)&&n0(r,i,i.next,l)&&ul(r,l)&&ul(l,r)&&(e.push(r.i,i.i,l.i),fl(i),fl(i.next),i=s=l),i=i.next}while(i!==s);return Jr(i)}function qM(s,e,i,r,l,c){let h=s;do{let d=h.next.next;for(;d!==h.prev;){if(h.i!==d.i&&tE(h,d)){let m=i0(h,d);h=Jr(h,h.next),m=Jr(m,m.next),ll(h,e,i,r,l,c,0),ll(m,e,i,r,l,c,0);return}d=d.next}h=h.next}while(h!==s)}function YM(s,e,i,r){const l=[];for(let c=0,h=e.length;c<h;c++){const d=e[c]*r,m=c<h-1?e[c+1]*r:s.length,p=t0(s,d,m,r,!1);p===p.next&&(p.steiner=!0),l.push($M(p))}l.sort(WM);for(let c=0;c<l.length;c++)i=ZM(l[c],i);return i}function WM(s,e){let i=s.x-e.x;if(i===0&&(i=s.y-e.y,i===0)){const r=(s.next.y-s.y)/(s.next.x-s.x),l=(e.next.y-e.y)/(e.next.x-e.x);i=r-l}return i}function ZM(s,e){const i=KM(s,e);if(!i)return e;const r=i0(i,s);return Jr(r,r.next),Jr(i,i.next)}function KM(s,e){let i=e;const r=s.x,l=s.y;let c=-1/0,h;if($s(s,i))return i;do{if($s(s,i.next))return i.next;if(l<=i.y&&l>=i.next.y&&i.next.y!==i.y){const g=i.x+(l-i.y)*(i.next.x-i.x)/(i.next.y-i.y);if(g<=r&&g>c&&(c=g,h=i.x<i.next.x?i:i.next,g===r))return h}i=i.next}while(i!==e);if(!h)return null;const d=h,m=h.x,p=h.y;let v=1/0;i=h;do{if(r>=i.x&&i.x>=m&&r!==i.x&&e0(l<p?r:c,l,m,p,l<p?c:r,l,i.x,i.y)){const g=Math.abs(l-i.y)/(r-i.x);ul(i,s)&&(g<v||g===v&&(i.x>h.x||i.x===h.x&&jM(h,i)))&&(h=i,v=g)}i=i.next}while(i!==d);return h}function jM(s,e){return ln(s.prev,s,e.prev)<0&&ln(e.next,s,s.next)<0}function QM(s,e,i,r){let l=s;do l.z===0&&(l.z=ed(l.x,l.y,e,i,r)),l.prevZ=l.prev,l.nextZ=l.next,l=l.next;while(l!==s);l.prevZ.nextZ=null,l.prevZ=null,JM(l)}function JM(s){let e,i=1;do{let r=s,l;s=null;let c=null;for(e=0;r;){e++;let h=r,d=0;for(let p=0;p<i&&(d++,h=h.nextZ,!!h);p++);let m=i;for(;d>0||m>0&&h;)d!==0&&(m===0||!h||r.z<=h.z)?(l=r,r=r.nextZ,d--):(l=h,h=h.nextZ,m--),c?c.nextZ=l:s=l,l.prevZ=c,c=l;r=h}c.nextZ=null,i*=2}while(e>1);return s}function ed(s,e,i,r,l){return s=(s-i)*l|0,e=(e-r)*l|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function $M(s){let e=s,i=s;do(e.x<i.x||e.x===i.x&&e.y<i.y)&&(i=e),e=e.next;while(e!==s);return i}function e0(s,e,i,r,l,c,h,d){return(l-h)*(e-d)>=(s-h)*(c-d)&&(s-h)*(r-d)>=(i-h)*(e-d)&&(i-h)*(c-d)>=(l-h)*(r-d)}function cl(s,e,i,r,l,c,h,d){return!(s===h&&e===d)&&e0(s,e,i,r,l,c,h,d)}function tE(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!eE(s,e)&&(ul(s,e)&&ul(e,s)&&nE(s,e)&&(ln(s.prev,s,e.prev)||ln(s,e.prev,e))||$s(s,e)&&ln(s.prev,s,s.next)>0&&ln(e.prev,e,e.next)>0)}function ln(s,e,i){return(e.y-s.y)*(i.x-e.x)-(e.x-s.x)*(i.y-e.y)}function $s(s,e){return s.x===e.x&&s.y===e.y}function n0(s,e,i,r){const l=Ic(ln(s,e,i)),c=Ic(ln(s,e,r)),h=Ic(ln(i,r,s)),d=Ic(ln(i,r,e));return!!(l!==c&&h!==d||l===0&&Pc(s,i,e)||c===0&&Pc(s,r,e)||h===0&&Pc(i,s,r)||d===0&&Pc(i,e,r))}function Pc(s,e,i){return e.x<=Math.max(s.x,i.x)&&e.x>=Math.min(s.x,i.x)&&e.y<=Math.max(s.y,i.y)&&e.y>=Math.min(s.y,i.y)}function Ic(s){return s>0?1:s<0?-1:0}function eE(s,e){let i=s;do{if(i.i!==s.i&&i.next.i!==s.i&&i.i!==e.i&&i.next.i!==e.i&&n0(i,i.next,s,e))return!0;i=i.next}while(i!==s);return!1}function ul(s,e){return ln(s.prev,s,s.next)<0?ln(s,e,s.next)>=0&&ln(s,s.prev,e)>=0:ln(s,e,s.prev)<0||ln(s,s.next,e)<0}function nE(s,e){let i=s,r=!1;const l=(s.x+e.x)/2,c=(s.y+e.y)/2;do i.y>c!=i.next.y>c&&i.next.y!==i.y&&l<(i.next.x-i.x)*(c-i.y)/(i.next.y-i.y)+i.x&&(r=!r),i=i.next;while(i!==s);return r}function i0(s,e){const i=nd(s.i,s.x,s.y),r=nd(e.i,e.x,e.y),l=s.next,c=e.prev;return s.next=e,e.prev=s,i.next=l,l.prev=i,r.next=i,i.prev=r,c.next=r,r.prev=c,r}function a0(s,e,i,r){const l=nd(s,e,i);return r?(l.next=r.next,l.prev=r,r.next.prev=l,r.next=l):(l.prev=l,l.next=l),l}function fl(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function nd(s,e,i){return{i:s,x:e,y:i,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function iE(s,e,i,r){let l=0;for(let c=e,h=i-r;c<i;c+=r)l+=(s[h]-s[c])*(s[c+1]+s[h+1]),h=c;return l}class aE{static triangulate(e,i,r=2){return VM(e,i,r)}}class Ia{static area(e){const i=e.length;let r=0;for(let l=i-1,c=0;c<i;l=c++)r+=e[l].x*e[c].y-e[c].x*e[l].y;return r*.5}static isClockWise(e){return Ia.area(e)<0}static triangulateShape(e,i){const r=[],l=[],c=[];r0(e),s0(r,e);let h=e.length;i.forEach(r0);for(let m=0;m<i.length;m++)l.push(h),h+=i[m].length,s0(r,i[m]);const d=aE.triangulate(r,l);for(let m=0;m<d.length;m+=3)c.push(d.slice(m,m+3));return c}}function r0(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function s0(s,e){for(let i=0;i<e.length;i++)s.push(e[i].x),s.push(e[i].y)}class Bc extends Qi{constructor(e=new zc([new qt(.5,.5),new qt(-.5,.5),new qt(-.5,-.5),new qt(.5,-.5)]),i={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:i},e=Array.isArray(e)?e:[e];const r=this,l=[],c=[];for(let d=0,m=e.length;d<m;d++){const p=e[d];h(p)}this.setAttribute("position",new ni(l,3)),this.setAttribute("uv",new ni(c,2)),this.computeVertexNormals();function h(d){const m=[],p=i.curveSegments!==void 0?i.curveSegments:12,v=i.steps!==void 0?i.steps:1,g=i.depth!==void 0?i.depth:1;let y=i.bevelEnabled!==void 0?i.bevelEnabled:!0,x=i.bevelThickness!==void 0?i.bevelThickness:.2,E=i.bevelSize!==void 0?i.bevelSize:x-.1,A=i.bevelOffset!==void 0?i.bevelOffset:0,M=i.bevelSegments!==void 0?i.bevelSegments:3;const S=i.extrudePath,L=i.UVGenerator!==void 0?i.UVGenerator:rE;let N,w=!1,G,B,P,V;S&&(N=S.getSpacedPoints(v),w=!0,y=!1,G=S.computeFrenetFrames(v,!1),B=new Y,P=new Y,V=new Y),y||(M=0,x=0,E=0,A=0);const D=d.extractPoints(p);let C=D.shape;const H=D.holes;if(!Ia.isClockWise(C)){C=C.reverse();for(let wt=0,yt=H.length;wt<yt;wt++){const gt=H[wt];Ia.isClockWise(gt)&&(H[wt]=gt.reverse())}}function ft(wt){const gt=10000000000000001e-36;let pt=wt[0];for(let Tt=1;Tt<=wt.length;Tt++){const At=Tt%wt.length,Bt=wt[At],fe=Bt.x-pt.x,ce=Bt.y-pt.y,U=fe*fe+ce*ce,T=Math.max(Math.abs(Bt.x),Math.abs(Bt.y),Math.abs(pt.x),Math.abs(pt.y)),et=gt*T*T;if(U<=et){wt.splice(At,1),Tt--;continue}pt=Bt}}ft(C),H.forEach(ft);const q=H.length,Q=C;for(let wt=0;wt<q;wt++){const yt=H[wt];C=C.concat(yt)}function F(wt,yt,gt){return yt||console.error("THREE.ExtrudeGeometry: vec does not exist"),wt.clone().addScaledVector(yt,gt)}const nt=C.length;function Z(wt,yt,gt){let pt,Tt,At;const Bt=wt.x-yt.x,fe=wt.y-yt.y,ce=gt.x-wt.x,U=gt.y-wt.y,T=Bt*Bt+fe*fe,et=Bt*U-fe*ce;if(Math.abs(et)>Number.EPSILON){const dt=Math.sqrt(T),Et=Math.sqrt(ce*ce+U*U),mt=yt.x-fe/dt,Zt=yt.y+Bt/dt,It=gt.x-U/Et,ee=gt.y+ce/Et,$t=((It-mt)*U-(ee-Zt)*ce)/(Bt*U-fe*ce);pt=mt+Bt*$t-wt.x,Tt=Zt+fe*$t-wt.y;const Ot=pt*pt+Tt*Tt;if(Ot<=2)return new qt(pt,Tt);At=Math.sqrt(Ot/2)}else{let dt=!1;Bt>Number.EPSILON?ce>Number.EPSILON&&(dt=!0):Bt<-Number.EPSILON?ce<-Number.EPSILON&&(dt=!0):Math.sign(fe)===Math.sign(U)&&(dt=!0),dt?(pt=-fe,Tt=Bt,At=Math.sqrt(T)):(pt=Bt,Tt=fe,At=Math.sqrt(T/2))}return new qt(pt/At,Tt/At)}const xt=[];for(let wt=0,yt=Q.length,gt=yt-1,pt=wt+1;wt<yt;wt++,gt++,pt++)gt===yt&&(gt=0),pt===yt&&(pt=0),xt[wt]=Z(Q[wt],Q[gt],Q[pt]);const vt=[];let Nt,Qt=xt.concat();for(let wt=0,yt=q;wt<yt;wt++){const gt=H[wt];Nt=[];for(let pt=0,Tt=gt.length,At=Tt-1,Bt=pt+1;pt<Tt;pt++,At++,Bt++)At===Tt&&(At=0),Bt===Tt&&(Bt=0),Nt[pt]=Z(gt[pt],gt[At],gt[Bt]);vt.push(Nt),Qt=Qt.concat(Nt)}let ae;if(M===0)ae=Ia.triangulateShape(Q,H);else{const wt=[],yt=[];for(let gt=0;gt<M;gt++){const pt=gt/M,Tt=x*Math.cos(pt*Math.PI/2),At=E*Math.sin(pt*Math.PI/2)+A;for(let Bt=0,fe=Q.length;Bt<fe;Bt++){const ce=F(Q[Bt],xt[Bt],At);Dt(ce.x,ce.y,-Tt),pt===0&&wt.push(ce)}for(let Bt=0,fe=q;Bt<fe;Bt++){const ce=H[Bt];Nt=vt[Bt];const U=[];for(let T=0,et=ce.length;T<et;T++){const dt=F(ce[T],Nt[T],At);Dt(dt.x,dt.y,-Tt),pt===0&&U.push(dt)}pt===0&&yt.push(U)}}ae=Ia.triangulateShape(wt,yt)}const I=ae.length,lt=E+A;for(let wt=0;wt<nt;wt++){const yt=y?F(C[wt],Qt[wt],lt):C[wt];w?(P.copy(G.normals[0]).multiplyScalar(yt.x),B.copy(G.binormals[0]).multiplyScalar(yt.y),V.copy(N[0]).add(P).add(B),Dt(V.x,V.y,V.z)):Dt(yt.x,yt.y,0)}for(let wt=1;wt<=v;wt++)for(let yt=0;yt<nt;yt++){const gt=y?F(C[yt],Qt[yt],lt):C[yt];w?(P.copy(G.normals[wt]).multiplyScalar(gt.x),B.copy(G.binormals[wt]).multiplyScalar(gt.y),V.copy(N[wt]).add(P).add(B),Dt(V.x,V.y,V.z)):Dt(gt.x,gt.y,g/v*wt)}for(let wt=M-1;wt>=0;wt--){const yt=wt/M,gt=x*Math.cos(yt*Math.PI/2),pt=E*Math.sin(yt*Math.PI/2)+A;for(let Tt=0,At=Q.length;Tt<At;Tt++){const Bt=F(Q[Tt],xt[Tt],pt);Dt(Bt.x,Bt.y,g+gt)}for(let Tt=0,At=H.length;Tt<At;Tt++){const Bt=H[Tt];Nt=vt[Tt];for(let fe=0,ce=Bt.length;fe<ce;fe++){const U=F(Bt[fe],Nt[fe],pt);w?Dt(U.x,U.y+N[v-1].y,N[v-1].x+gt):Dt(U.x,U.y,g+gt)}}}$(),rt();function $(){const wt=l.length/3;if(y){let yt=0,gt=nt*yt;for(let pt=0;pt<I;pt++){const Tt=ae[pt];Ct(Tt[2]+gt,Tt[1]+gt,Tt[0]+gt)}yt=v+M*2,gt=nt*yt;for(let pt=0;pt<I;pt++){const Tt=ae[pt];Ct(Tt[0]+gt,Tt[1]+gt,Tt[2]+gt)}}else{for(let yt=0;yt<I;yt++){const gt=ae[yt];Ct(gt[2],gt[1],gt[0])}for(let yt=0;yt<I;yt++){const gt=ae[yt];Ct(gt[0]+nt*v,gt[1]+nt*v,gt[2]+nt*v)}}r.addGroup(wt,l.length/3-wt,0)}function rt(){const wt=l.length/3;let yt=0;Rt(Q,yt),yt+=Q.length;for(let gt=0,pt=H.length;gt<pt;gt++){const Tt=H[gt];Rt(Tt,yt),yt+=Tt.length}r.addGroup(wt,l.length/3-wt,1)}function Rt(wt,yt){let gt=wt.length;for(;--gt>=0;){const pt=gt;let Tt=gt-1;Tt<0&&(Tt=wt.length-1);for(let At=0,Bt=v+M*2;At<Bt;At++){const fe=nt*At,ce=nt*(At+1),U=yt+pt+fe,T=yt+Tt+fe,et=yt+Tt+ce,dt=yt+pt+ce;Ut(U,T,et,dt)}}}function Dt(wt,yt,gt){m.push(wt),m.push(yt),m.push(gt)}function Ct(wt,yt,gt){Ht(wt),Ht(yt),Ht(gt);const pt=l.length/3,Tt=L.generateTopUV(r,l,pt-3,pt-2,pt-1);z(Tt[0]),z(Tt[1]),z(Tt[2])}function Ut(wt,yt,gt,pt){Ht(wt),Ht(yt),Ht(pt),Ht(yt),Ht(gt),Ht(pt);const Tt=l.length/3,At=L.generateSideWallUV(r,l,Tt-6,Tt-3,Tt-2,Tt-1);z(At[0]),z(At[1]),z(At[3]),z(At[1]),z(At[2]),z(At[3])}function Ht(wt){l.push(m[wt*3+0]),l.push(m[wt*3+1]),l.push(m[wt*3+2])}function z(wt){c.push(wt.x),c.push(wt.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),i=this.parameters.shapes,r=this.parameters.options;return sE(i,r,e)}static fromJSON(e,i){const r=[];for(let c=0,h=e.shapes.length;c<h;c++){const d=i[e.shapes[c]];r.push(d)}const l=e.options.extrudePath;return l!==void 0&&(e.options.extrudePath=new $h[l.type]().fromJSON(l)),new Bc(r,e.options)}}const rE={generateTopUV:function(s,e,i,r,l){const c=e[i*3],h=e[i*3+1],d=e[r*3],m=e[r*3+1],p=e[l*3],v=e[l*3+1];return[new qt(c,h),new qt(d,m),new qt(p,v)]},generateSideWallUV:function(s,e,i,r,l,c){const h=e[i*3],d=e[i*3+1],m=e[i*3+2],p=e[r*3],v=e[r*3+1],g=e[r*3+2],y=e[l*3],x=e[l*3+1],E=e[l*3+2],A=e[c*3],M=e[c*3+1],S=e[c*3+2];return Math.abs(d-v)<Math.abs(h-p)?[new qt(h,1-m),new qt(p,1-g),new qt(y,1-E),new qt(A,1-S)]:[new qt(d,1-m),new qt(v,1-g),new qt(x,1-E),new qt(M,1-S)]}};function sE(s,e,i){if(i.shapes=[],Array.isArray(s))for(let r=0,l=s.length;r<l;r++){const c=s[r];i.shapes.push(c.uuid)}else i.shapes.push(s.uuid);return i.options=Object.assign({},e),e.extrudePath!==void 0&&(i.options.extrudePath=e.extrudePath.toJSON()),i}class hl extends Qi{constructor(e=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:l};const c=e/2,h=i/2,d=Math.floor(r),m=Math.floor(l),p=d+1,v=m+1,g=e/d,y=i/m,x=[],E=[],A=[],M=[];for(let S=0;S<v;S++){const L=S*y-h;for(let N=0;N<p;N++){const w=N*g-c;E.push(w,-L,0),A.push(0,0,1),M.push(N/d),M.push(1-S/m)}}for(let S=0;S<m;S++)for(let L=0;L<d;L++){const N=L+p*S,w=L+p*(S+1),G=L+1+p*(S+1),B=L+1+p*S;x.push(N,w,B),x.push(w,G,B)}this.setIndex(x),this.setAttribute("position",new ni(E,3)),this.setAttribute("normal",new ni(A,3)),this.setAttribute("uv",new ni(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hl(e.width,e.height,e.widthSegments,e.heightSegments)}}class id extends Qi{constructor(e=new zc([new qt(0,.5),new qt(-.5,-.5),new qt(.5,-.5)]),i=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:i};const r=[],l=[],c=[],h=[];let d=0,m=0;if(Array.isArray(e)===!1)p(e);else for(let v=0;v<e.length;v++)p(e[v]),this.addGroup(d,m,v),d+=m,m=0;this.setIndex(r),this.setAttribute("position",new ni(l,3)),this.setAttribute("normal",new ni(c,3)),this.setAttribute("uv",new ni(h,2));function p(v){const g=l.length/3,y=v.extractPoints(i);let x=y.shape;const E=y.holes;Ia.isClockWise(x)===!1&&(x=x.reverse());for(let M=0,S=E.length;M<S;M++){const L=E[M];Ia.isClockWise(L)===!0&&(E[M]=L.reverse())}const A=Ia.triangulateShape(x,E);for(let M=0,S=E.length;M<S;M++){const L=E[M];x=x.concat(L)}for(let M=0,S=x.length;M<S;M++){const L=x[M];l.push(L.x,L.y,0),c.push(0,0,1),h.push(L.x,L.y)}for(let M=0,S=A.length;M<S;M++){const L=A[M],N=L[0]+g,w=L[1]+g,G=L[2]+g;r.push(N,w,G),m+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),i=this.parameters.shapes;return oE(i,e)}static fromJSON(e,i){const r=[];for(let l=0,c=e.shapes.length;l<c;l++){const h=i[e.shapes[l]];r.push(h)}return new id(r,e.curveSegments)}}function oE(s,e){if(e.shapes=[],Array.isArray(s))for(let i=0,r=s.length;i<r;i++){const l=s[i];e.shapes.push(l.uuid)}else e.shapes.push(s.uuid);return e}class Fc extends Qi{constructor(e=1,i=.4,r=12,l=48,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:i,radialSegments:r,tubularSegments:l,arc:c},r=Math.floor(r),l=Math.floor(l);const h=[],d=[],m=[],p=[],v=new Y,g=new Y,y=new Y;for(let x=0;x<=r;x++)for(let E=0;E<=l;E++){const A=E/l*c,M=x/r*Math.PI*2;g.x=(e+i*Math.cos(M))*Math.cos(A),g.y=(e+i*Math.cos(M))*Math.sin(A),g.z=i*Math.sin(M),d.push(g.x,g.y,g.z),v.x=e*Math.cos(A),v.y=e*Math.sin(A),y.subVectors(g,v).normalize(),m.push(y.x,y.y,y.z),p.push(E/l),p.push(x/r)}for(let x=1;x<=r;x++)for(let E=1;E<=l;E++){const A=(l+1)*x+E-1,M=(l+1)*(x-1)+E-1,S=(l+1)*(x-1)+E,L=(l+1)*x+E;h.push(A,M,L),h.push(M,S,L)}this.setIndex(h),this.setAttribute("position",new ni(d,3)),this.setAttribute("normal",new ni(m,3)),this.setAttribute("uv",new ni(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class o0 extends il{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pg,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ha,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Hc extends o0{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new qt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ae(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(i){this.ior=(1+.4*i)/(1-.4*i)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Re(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Re(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Re(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class lE extends il{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cE extends il{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class uE extends jn{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=i}dispose(){}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}const ad=new sn,l0=new Y,c0=new Y;class fE{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.mapType=ua,this.map=null,this.mapPass=null,this.matrix=new sn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yh,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new pn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera,r=this.matrix;l0.setFromMatrixPosition(e.matrixWorld),i.position.copy(l0),c0.setFromMatrixPosition(e.target.matrixWorld),i.lookAt(c0),i.updateMatrixWorld(),ad.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ad,i.coordinateSystem,i.reversedDepth),i.reversedDepth?r.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(ad)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class u0 extends Vg{constructor(e=-1,i=1,r=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=r,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,r,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=r-e,h=r+e,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,h=c+p*this.view.width,d-=v*this.view.offsetY,m=d-v*this.view.height}this.projectionMatrix.makeOrthographic(c,h,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class hE extends fE{constructor(){super(new u0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class f0 extends uE{constructor(e,i){super(e,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(jn.DEFAULT_UP),this.updateMatrix(),this.target=new jn,this.shadow=new hE}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class dE extends Li{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const h0=new sn;class pE{constructor(e,i,r=0,l=1/0){this.ray=new bg(e,i),this.near=r,this.far=l,this.camera=null,this.layers=new Uh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,i){this.ray.set(e,i)}setFromCamera(e,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(i.near+i.far)/(i.near-i.far)).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):console.error("THREE.Raycaster: Unsupported camera type: "+i.type)}setFromXRController(e){return h0.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(h0),this}intersectObject(e,i=!0,r=[]){return rd(e,this,r,i),r.sort(d0),r}intersectObjects(e,i=!0,r=[]){for(let l=0,c=e.length;l<c;l++)rd(e[l],this,r,i);return r.sort(d0),r}}function d0(s,e){return s.distance-e.distance}function rd(s,e,i,r){let l=!0;if(s.layers.test(e.layers)&&s.raycast(e,i)===!1&&(l=!1),l===!0&&r===!0){const c=s.children;for(let h=0,d=c.length;h<d;h++)rd(c[h],e,i,!0)}}function p0(s,e,i,r){const l=mE(r);switch(i){case ug:return s*e;case hg:return s*e/l.components*l.byteLength;case Hf:return s*e/l.components*l.byteLength;case dg:return s*e*2/l.components*l.byteLength;case Vf:return s*e*2/l.components*l.byteLength;case fg:return s*e*3/l.components*l.byteLength;case Yi:return s*e*4/l.components*l.byteLength;case Gf:return s*e*4/l.components*l.byteLength;case uc:case fc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case hc:case dc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case kf:case Yf:return Math.max(s,16)*Math.max(e,8)/4;case Xf:case qf:return Math.max(s,8)*Math.max(e,8)/2;case Wf:case Zf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Kf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case jf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Qf:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Jf:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case $f:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case th:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case eh:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case nh:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case ih:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case ah:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case rh:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case sh:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case oh:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case lh:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case ch:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case uh:case fh:case hh:return Math.ceil(s/4)*Math.ceil(e/4)*16;case dh:case ph:return Math.ceil(s/4)*Math.ceil(e/4)*8;case mh:case gh:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function mE(s){switch(s){case ua:case sg:return{byteLength:1,components:1};case Yo:case og:case Wo:return{byteLength:2,components:1};case Bf:case Ff:return{byteLength:2,components:4};case qr:case If:case wa:return{byteLength:4,components:1};case lg:case cg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ef}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ef);function m0(){let s=null,e=!1,i=null,r=null;function l(c,h){i(c,h),r=s.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&(r=s.requestAnimationFrame(l),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){s=c}}}function gE(s){const e=new WeakMap;function i(d,m){const p=d.array,v=d.usage,g=p.byteLength,y=s.createBuffer();s.bindBuffer(m,y),s.bufferData(m,p,v),d.onUploadCallback();let x;if(p instanceof Float32Array)x=s.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)x=s.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?x=s.HALF_FLOAT:x=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)x=s.SHORT;else if(p instanceof Uint32Array)x=s.UNSIGNED_INT;else if(p instanceof Int32Array)x=s.INT;else if(p instanceof Int8Array)x=s.BYTE;else if(p instanceof Uint8Array)x=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)x=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:y,type:x,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:g}}function r(d,m,p){const v=m.array,g=m.updateRanges;if(s.bindBuffer(p,d),g.length===0)s.bufferSubData(p,0,v);else{g.sort((x,E)=>x.start-E.start);let y=0;for(let x=1;x<g.length;x++){const E=g[y],A=g[x];A.start<=E.start+E.count+1?E.count=Math.max(E.count,A.start+A.count-E.start):(++y,g[y]=A)}g.length=y+1;for(let x=0,E=g.length;x<E;x++){const A=g[x];s.bufferSubData(p,A.start*v.BYTES_PER_ELEMENT,v,A.start,A.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=e.get(d);m&&(s.deleteBuffer(m.buffer),e.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=e.get(d);(!v||v.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:h}}var vE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_E=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,yE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,SE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ME=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,EE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,TE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,AE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,RE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,CE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,DE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,UE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,NE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,LE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,OE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,PE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,IE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,BE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,FE=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,HE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,VE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,GE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,XE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,YE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,WE="gl_FragColor = linearToOutputTexel( gl_FragColor );",ZE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,KE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,jE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,QE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,JE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$E=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,eT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,iT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,aT=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,rT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,oT=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lT=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,uT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fT=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dT=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,mT=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_T=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ST=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,MT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ET=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,TT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,AT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,RT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,CT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,DT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,UT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,NT=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,LT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,OT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,PT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,IT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,BT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,FT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,HT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,VT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,GT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,XT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,YT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,WT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ZT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,KT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,QT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,JT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,$T=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,t1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,e1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,n1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,i1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,a1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,r1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,s1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,o1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,l1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,c1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,u1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,f1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,h1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,d1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,p1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,m1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ee={alphahash_fragment:vE,alphahash_pars_fragment:_E,alphamap_fragment:yE,alphamap_pars_fragment:SE,alphatest_fragment:xE,alphatest_pars_fragment:ME,aomap_fragment:EE,aomap_pars_fragment:TE,batching_pars_vertex:bE,batching_vertex:AE,begin_vertex:RE,beginnormal_vertex:CE,bsdfs:wE,iridescence_fragment:DE,bumpmap_pars_fragment:UE,clipping_planes_fragment:NE,clipping_planes_pars_fragment:LE,clipping_planes_pars_vertex:OE,clipping_planes_vertex:zE,color_fragment:PE,color_pars_fragment:IE,color_pars_vertex:BE,color_vertex:FE,common:HE,cube_uv_reflection_fragment:VE,defaultnormal_vertex:GE,displacementmap_pars_vertex:XE,displacementmap_vertex:kE,emissivemap_fragment:qE,emissivemap_pars_fragment:YE,colorspace_fragment:WE,colorspace_pars_fragment:ZE,envmap_fragment:KE,envmap_common_pars_fragment:jE,envmap_pars_fragment:QE,envmap_pars_vertex:JE,envmap_physical_pars_fragment:cT,envmap_vertex:$E,fog_vertex:tT,fog_pars_vertex:eT,fog_fragment:nT,fog_pars_fragment:iT,gradientmap_pars_fragment:aT,lightmap_pars_fragment:rT,lights_lambert_fragment:sT,lights_lambert_pars_fragment:oT,lights_pars_begin:lT,lights_toon_fragment:uT,lights_toon_pars_fragment:fT,lights_phong_fragment:hT,lights_phong_pars_fragment:dT,lights_physical_fragment:pT,lights_physical_pars_fragment:mT,lights_fragment_begin:gT,lights_fragment_maps:vT,lights_fragment_end:_T,logdepthbuf_fragment:yT,logdepthbuf_pars_fragment:ST,logdepthbuf_pars_vertex:xT,logdepthbuf_vertex:MT,map_fragment:ET,map_pars_fragment:TT,map_particle_fragment:bT,map_particle_pars_fragment:AT,metalnessmap_fragment:RT,metalnessmap_pars_fragment:CT,morphinstance_vertex:wT,morphcolor_vertex:DT,morphnormal_vertex:UT,morphtarget_pars_vertex:NT,morphtarget_vertex:LT,normal_fragment_begin:OT,normal_fragment_maps:zT,normal_pars_fragment:PT,normal_pars_vertex:IT,normal_vertex:BT,normalmap_pars_fragment:FT,clearcoat_normal_fragment_begin:HT,clearcoat_normal_fragment_maps:VT,clearcoat_pars_fragment:GT,iridescence_pars_fragment:XT,opaque_fragment:kT,packing:qT,premultiplied_alpha_fragment:YT,project_vertex:WT,dithering_fragment:ZT,dithering_pars_fragment:KT,roughnessmap_fragment:jT,roughnessmap_pars_fragment:QT,shadowmap_pars_fragment:JT,shadowmap_pars_vertex:$T,shadowmap_vertex:t1,shadowmask_pars_fragment:e1,skinbase_vertex:n1,skinning_pars_vertex:i1,skinning_vertex:a1,skinnormal_vertex:r1,specularmap_fragment:s1,specularmap_pars_fragment:o1,tonemapping_fragment:l1,tonemapping_pars_fragment:c1,transmission_fragment:u1,transmission_pars_fragment:f1,uv_pars_fragment:h1,uv_pars_vertex:d1,uv_vertex:p1,worldpos_vertex:m1,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Kt={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new xe}},envmap:{envMap:{value:null},envMapRotation:{value:new xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new xe},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0},uvTransform:{value:new xe}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}}},pa={basic:{uniforms:ii([Kt.common,Kt.specularmap,Kt.envmap,Kt.aomap,Kt.lightmap,Kt.fog]),vertexShader:Ee.meshbasic_vert,fragmentShader:Ee.meshbasic_frag},lambert:{uniforms:ii([Kt.common,Kt.specularmap,Kt.envmap,Kt.aomap,Kt.lightmap,Kt.emissivemap,Kt.bumpmap,Kt.normalmap,Kt.displacementmap,Kt.fog,Kt.lights,{emissive:{value:new Re(0)}}]),vertexShader:Ee.meshlambert_vert,fragmentShader:Ee.meshlambert_frag},phong:{uniforms:ii([Kt.common,Kt.specularmap,Kt.envmap,Kt.aomap,Kt.lightmap,Kt.emissivemap,Kt.bumpmap,Kt.normalmap,Kt.displacementmap,Kt.fog,Kt.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30}}]),vertexShader:Ee.meshphong_vert,fragmentShader:Ee.meshphong_frag},standard:{uniforms:ii([Kt.common,Kt.envmap,Kt.aomap,Kt.lightmap,Kt.emissivemap,Kt.bumpmap,Kt.normalmap,Kt.displacementmap,Kt.roughnessmap,Kt.metalnessmap,Kt.fog,Kt.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ee.meshphysical_vert,fragmentShader:Ee.meshphysical_frag},toon:{uniforms:ii([Kt.common,Kt.aomap,Kt.lightmap,Kt.emissivemap,Kt.bumpmap,Kt.normalmap,Kt.displacementmap,Kt.gradientmap,Kt.fog,Kt.lights,{emissive:{value:new Re(0)}}]),vertexShader:Ee.meshtoon_vert,fragmentShader:Ee.meshtoon_frag},matcap:{uniforms:ii([Kt.common,Kt.bumpmap,Kt.normalmap,Kt.displacementmap,Kt.fog,{matcap:{value:null}}]),vertexShader:Ee.meshmatcap_vert,fragmentShader:Ee.meshmatcap_frag},points:{uniforms:ii([Kt.points,Kt.fog]),vertexShader:Ee.points_vert,fragmentShader:Ee.points_frag},dashed:{uniforms:ii([Kt.common,Kt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ee.linedashed_vert,fragmentShader:Ee.linedashed_frag},depth:{uniforms:ii([Kt.common,Kt.displacementmap]),vertexShader:Ee.depth_vert,fragmentShader:Ee.depth_frag},normal:{uniforms:ii([Kt.common,Kt.bumpmap,Kt.normalmap,Kt.displacementmap,{opacity:{value:1}}]),vertexShader:Ee.meshnormal_vert,fragmentShader:Ee.meshnormal_frag},sprite:{uniforms:ii([Kt.sprite,Kt.fog]),vertexShader:Ee.sprite_vert,fragmentShader:Ee.sprite_frag},background:{uniforms:{uvTransform:{value:new xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ee.background_vert,fragmentShader:Ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new xe}},vertexShader:Ee.backgroundCube_vert,fragmentShader:Ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ee.cube_vert,fragmentShader:Ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ee.equirect_vert,fragmentShader:Ee.equirect_frag},distanceRGBA:{uniforms:ii([Kt.common,Kt.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ee.distanceRGBA_vert,fragmentShader:Ee.distanceRGBA_frag},shadow:{uniforms:ii([Kt.lights,Kt.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:Ee.shadow_vert,fragmentShader:Ee.shadow_frag}};pa.physical={uniforms:ii([pa.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new xe},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new xe},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new xe},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new xe},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new xe},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new xe}}]),vertexShader:Ee.meshphysical_vert,fragmentShader:Ee.meshphysical_frag};const Vc={r:0,b:0,g:0},$r=new ha,g1=new sn;function v1(s,e,i,r,l,c,h){const d=new Re(0);let m=c===!0?0:1,p,v,g=null,y=0,x=null;function E(N){let w=N.isScene===!0?N.background:null;return w&&w.isTexture&&(w=(N.backgroundBlurriness>0?i:e).get(w)),w}function A(N){let w=!1;const G=E(N);G===null?S(d,m):G&&G.isColor&&(S(G,1),w=!0);const B=s.xr.getEnvironmentBlendMode();B==="additive"?r.buffers.color.setClear(0,0,0,1,h):B==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,h),(s.autoClear||w)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function M(N,w){const G=E(w);G&&(G.isCubeTexture||G.mapping===lc)?(v===void 0&&(v=new Fn(new rl(1,1,1),new pr({name:"BackgroundCubeMaterial",uniforms:Ks(pa.backgroundCube.uniforms),vertexShader:pa.backgroundCube.vertexShader,fragmentShader:pa.backgroundCube.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(B,P,V){this.matrixWorld.copyPosition(V.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(v)),$r.copy(w.backgroundRotation),$r.x*=-1,$r.y*=-1,$r.z*=-1,G.isCubeTexture&&G.isRenderTargetTexture===!1&&($r.y*=-1,$r.z*=-1),v.material.uniforms.envMap.value=G,v.material.uniforms.flipEnvMap.value=G.isCubeTexture&&G.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(g1.makeRotationFromEuler($r)),v.material.toneMapped=Ge.getTransfer(G.colorSpace)!==je,(g!==G||y!==G.version||x!==s.toneMapping)&&(v.material.needsUpdate=!0,g=G,y=G.version,x=s.toneMapping),v.layers.enableAll(),N.unshift(v,v.geometry,v.material,0,0,null)):G&&G.isTexture&&(p===void 0&&(p=new Fn(new hl(2,2),new pr({name:"BackgroundMaterial",uniforms:Ks(pa.background.uniforms),vertexShader:pa.background.vertexShader,fragmentShader:pa.background.fragmentShader,side:ir,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=G,p.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,p.material.toneMapped=Ge.getTransfer(G.colorSpace)!==je,G.matrixAutoUpdate===!0&&G.updateMatrix(),p.material.uniforms.uvTransform.value.copy(G.matrix),(g!==G||y!==G.version||x!==s.toneMapping)&&(p.material.needsUpdate=!0,g=G,y=G.version,x=s.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null))}function S(N,w){N.getRGB(Vc,Hg(s)),r.buffers.color.setClear(Vc.r,Vc.g,Vc.b,w,h)}function L(){v!==void 0&&(v.geometry.dispose(),v.material.dispose(),v=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(N,w=1){d.set(N),m=w,S(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(N){m=N,S(d,m)},render:A,addToRenderList:M,dispose:L}}function _1(s,e){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},l=y(null);let c=l,h=!1;function d(C,H,st,ft,q){let Q=!1;const F=g(ft,st,H);c!==F&&(c=F,p(c.object)),Q=x(C,ft,st,q),Q&&E(C,ft,st,q),q!==null&&e.update(q,s.ELEMENT_ARRAY_BUFFER),(Q||h)&&(h=!1,w(C,H,st,ft),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function m(){return s.createVertexArray()}function p(C){return s.bindVertexArray(C)}function v(C){return s.deleteVertexArray(C)}function g(C,H,st){const ft=st.wireframe===!0;let q=r[C.id];q===void 0&&(q={},r[C.id]=q);let Q=q[H.id];Q===void 0&&(Q={},q[H.id]=Q);let F=Q[ft];return F===void 0&&(F=y(m()),Q[ft]=F),F}function y(C){const H=[],st=[],ft=[];for(let q=0;q<i;q++)H[q]=0,st[q]=0,ft[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:st,attributeDivisors:ft,object:C,attributes:{},index:null}}function x(C,H,st,ft){const q=c.attributes,Q=H.attributes;let F=0;const nt=st.getAttributes();for(const Z in nt)if(nt[Z].location>=0){const vt=q[Z];let Nt=Q[Z];if(Nt===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(Nt=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(Nt=C.instanceColor)),vt===void 0||vt.attribute!==Nt||Nt&&vt.data!==Nt.data)return!0;F++}return c.attributesNum!==F||c.index!==ft}function E(C,H,st,ft){const q={},Q=H.attributes;let F=0;const nt=st.getAttributes();for(const Z in nt)if(nt[Z].location>=0){let vt=Q[Z];vt===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(vt=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(vt=C.instanceColor));const Nt={};Nt.attribute=vt,vt&&vt.data&&(Nt.data=vt.data),q[Z]=Nt,F++}c.attributes=q,c.attributesNum=F,c.index=ft}function A(){const C=c.newAttributes;for(let H=0,st=C.length;H<st;H++)C[H]=0}function M(C){S(C,0)}function S(C,H){const st=c.newAttributes,ft=c.enabledAttributes,q=c.attributeDivisors;st[C]=1,ft[C]===0&&(s.enableVertexAttribArray(C),ft[C]=1),q[C]!==H&&(s.vertexAttribDivisor(C,H),q[C]=H)}function L(){const C=c.newAttributes,H=c.enabledAttributes;for(let st=0,ft=H.length;st<ft;st++)H[st]!==C[st]&&(s.disableVertexAttribArray(st),H[st]=0)}function N(C,H,st,ft,q,Q,F){F===!0?s.vertexAttribIPointer(C,H,st,q,Q):s.vertexAttribPointer(C,H,st,ft,q,Q)}function w(C,H,st,ft){A();const q=ft.attributes,Q=st.getAttributes(),F=H.defaultAttributeValues;for(const nt in Q){const Z=Q[nt];if(Z.location>=0){let xt=q[nt];if(xt===void 0&&(nt==="instanceMatrix"&&C.instanceMatrix&&(xt=C.instanceMatrix),nt==="instanceColor"&&C.instanceColor&&(xt=C.instanceColor)),xt!==void 0){const vt=xt.normalized,Nt=xt.itemSize,Qt=e.get(xt);if(Qt===void 0)continue;const ae=Qt.buffer,I=Qt.type,lt=Qt.bytesPerElement,$=I===s.INT||I===s.UNSIGNED_INT||xt.gpuType===If;if(xt.isInterleavedBufferAttribute){const rt=xt.data,Rt=rt.stride,Dt=xt.offset;if(rt.isInstancedInterleavedBuffer){for(let Ct=0;Ct<Z.locationSize;Ct++)S(Z.location+Ct,rt.meshPerAttribute);C.isInstancedMesh!==!0&&ft._maxInstanceCount===void 0&&(ft._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Ct=0;Ct<Z.locationSize;Ct++)M(Z.location+Ct);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let Ct=0;Ct<Z.locationSize;Ct++)N(Z.location+Ct,Nt/Z.locationSize,I,vt,Rt*lt,(Dt+Nt/Z.locationSize*Ct)*lt,$)}else{if(xt.isInstancedBufferAttribute){for(let rt=0;rt<Z.locationSize;rt++)S(Z.location+rt,xt.meshPerAttribute);C.isInstancedMesh!==!0&&ft._maxInstanceCount===void 0&&(ft._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let rt=0;rt<Z.locationSize;rt++)M(Z.location+rt);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let rt=0;rt<Z.locationSize;rt++)N(Z.location+rt,Nt/Z.locationSize,I,vt,Nt*lt,Nt/Z.locationSize*rt*lt,$)}}else if(F!==void 0){const vt=F[nt];if(vt!==void 0)switch(vt.length){case 2:s.vertexAttrib2fv(Z.location,vt);break;case 3:s.vertexAttrib3fv(Z.location,vt);break;case 4:s.vertexAttrib4fv(Z.location,vt);break;default:s.vertexAttrib1fv(Z.location,vt)}}}}L()}function G(){V();for(const C in r){const H=r[C];for(const st in H){const ft=H[st];for(const q in ft)v(ft[q].object),delete ft[q];delete H[st]}delete r[C]}}function B(C){if(r[C.id]===void 0)return;const H=r[C.id];for(const st in H){const ft=H[st];for(const q in ft)v(ft[q].object),delete ft[q];delete H[st]}delete r[C.id]}function P(C){for(const H in r){const st=r[H];if(st[C.id]===void 0)continue;const ft=st[C.id];for(const q in ft)v(ft[q].object),delete ft[q];delete st[C.id]}}function V(){D(),h=!0,c!==l&&(c=l,p(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:V,resetDefaultState:D,dispose:G,releaseStatesOfGeometry:B,releaseStatesOfProgram:P,initAttributes:A,enableAttribute:M,disableUnusedAttributes:L}}function y1(s,e,i){let r;function l(p){r=p}function c(p,v){s.drawArrays(r,p,v),i.update(v,r,1)}function h(p,v,g){g!==0&&(s.drawArraysInstanced(r,p,v,g),i.update(v,r,g))}function d(p,v,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,v,0,g);let x=0;for(let E=0;E<g;E++)x+=v[E];i.update(x,r,1)}function m(p,v,g,y){if(g===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let E=0;E<p.length;E++)h(p[E],v[E],y[E]);else{x.multiDrawArraysInstancedWEBGL(r,p,0,v,0,y,0,g);let E=0;for(let A=0;A<g;A++)E+=v[A]*y[A];i.update(E,r,1)}}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function S1(s,e,i,r){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");l=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(P){return!(P!==Yi&&r.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(P){const V=P===Wo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==ua&&r.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==wa&&!V)}function m(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const v=m(p);v!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",v,"instead."),p=v);const g=i.logarithmicDepthBuffer===!0,y=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),x=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_TEXTURE_SIZE),M=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),S=s.getParameter(s.MAX_VERTEX_ATTRIBS),L=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),N=s.getParameter(s.MAX_VARYING_VECTORS),w=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),G=E>0,B=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:g,reversedDepthBuffer:y,maxTextures:x,maxVertexTextures:E,maxTextureSize:A,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:L,maxVaryings:N,maxFragmentUniforms:w,vertexTextures:G,maxSamples:B}}function x1(s){const e=this;let i=null,r=0,l=!1,c=!1;const h=new jr,d=new xe,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(g,y){const x=g.length!==0||y||r!==0||l;return l=y,r=g.length,x},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(g,y){i=v(g,y,0)},this.setState=function(g,y,x){const E=g.clippingPlanes,A=g.clipIntersection,M=g.clipShadows,S=s.get(g);if(!l||E===null||E.length===0||c&&!M)c?v(null):p();else{const L=c?0:r,N=L*4;let w=S.clippingState||null;m.value=w,w=v(E,y,N,x);for(let G=0;G!==N;++G)w[G]=i[G];S.clippingState=w,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=L}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function v(g,y,x,E){const A=g!==null?g.length:0;let M=null;if(A!==0){if(M=m.value,E!==!0||M===null){const S=x+A*4,L=y.matrixWorldInverse;d.getNormalMatrix(L),(M===null||M.length<S)&&(M=new Float32Array(S));for(let N=0,w=x;N!==A;++N,w+=4)h.copy(g[N]).applyMatrix4(L,d),h.normal.toArray(M,w),M[w+3]=h.constant}m.value=M,m.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,M}}function M1(s){let e=new WeakMap;function i(h,d){return d===Lf?h.mapping=Ns:d===Of&&(h.mapping=Ls),h}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===Lf||d===Of)if(e.has(h)){const m=e.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new EM(m.height);return p.fromEquirectangularTexture(s,h),e.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function c(){e=new WeakMap}return{get:r,dispose:c}}const to=4,g0=[.125,.215,.35,.446,.526,.582],ts=20,sd=new u0,v0=new Re;let od=null,ld=0,cd=0,ud=!1;const es=(1+Math.sqrt(5))/2,eo=1/es,_0=[new Y(-es,eo,0),new Y(es,eo,0),new Y(-eo,0,es),new Y(eo,0,es),new Y(0,es,-eo),new Y(0,es,eo),new Y(-1,1,-1),new Y(1,1,-1),new Y(-1,1,1),new Y(1,1,1)],E1=new Y;class fd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,r=.1,l=100,c={}){const{size:h=256,position:d=E1}=c;od=this._renderer.getRenderTarget(),ld=this._renderer.getActiveCubeFace(),cd=this._renderer.getActiveMipmapLevel(),ud=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,r,l,m,d),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=x0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=S0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(od,ld,cd),this._renderer.xr.enabled=ud,e.scissorTest=!1,Gc(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Ns||e.mapping===Ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),od=this._renderer.getRenderTarget(),ld=this._renderer.getActiveCubeFace(),cd=this._renderer.getActiveMipmapLevel(),ud=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Ui,minFilter:Ui,generateMipmaps:!1,type:Wo,format:Yi,colorSpace:Os,depthBuffer:!1},l=y0(e,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=y0(e,i,r);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=T1(c)),this._blurMaterial=b1(c,e,i)}return l}_compileMaterial(e){const i=new Fn(this._lodPlanes[0],e);this._renderer.compile(i,sd)}_sceneToCubeUV(e,i,r,l,c){const m=new Li(90,1,i,r),p=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],g=this._renderer,y=g.autoClear,x=g.toneMapping;g.getClearColor(v0),g.toneMapping=rr,g.autoClear=!1,g.state.buffers.depth.getReversed()&&(g.setRenderTarget(l),g.clearDepth(),g.setRenderTarget(null));const A=new Vh({name:"PMREM.Background",side:li,depthWrite:!1,depthTest:!1}),M=new Fn(new rl,A);let S=!1;const L=e.background;L?L.isColor&&(A.color.copy(L),e.background=null,S=!0):(A.color.copy(v0),S=!0);for(let N=0;N<6;N++){const w=N%3;w===0?(m.up.set(0,p[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+v[N],c.y,c.z)):w===1?(m.up.set(0,0,p[N]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+v[N],c.z)):(m.up.set(0,p[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+v[N]));const G=this._cubeSize;Gc(l,w*G,N>2?G:0,G,G),g.setRenderTarget(l),S&&g.render(M,m),g.render(e,m)}M.geometry.dispose(),M.material.dispose(),g.toneMapping=x,g.autoClear=y,e.background=L}_textureToCubeUV(e,i){const r=this._renderer,l=e.mapping===Ns||e.mapping===Ls;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=x0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=S0());const c=l?this._cubemapMaterial:this._equirectMaterial,h=new Fn(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=e;const m=this._cubeSize;Gc(i,0,0,3*m,2*m),r.setRenderTarget(i),r.render(h,sd)}_applyPMREM(e){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const h=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=_0[(l-c-1)%_0.length];this._blur(e,c-1,c,h,d)}i.autoClear=r}_blur(e,i,r,l,c){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,r,l,"latitudinal",c),this._halfBlur(h,e,r,r,l,"longitudinal",c)}_halfBlur(e,i,r,l,c,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,g=new Fn(this._lodPlanes[l],p),y=p.uniforms,x=this._sizeLods[r]-1,E=isFinite(c)?Math.PI/(2*x):2*Math.PI/(2*ts-1),A=c/E,M=isFinite(c)?1+Math.floor(v*A):ts;M>ts&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${ts}`);const S=[];let L=0;for(let P=0;P<ts;++P){const V=P/A,D=Math.exp(-V*V/2);S.push(D),P===0?L+=D:P<M&&(L+=2*D)}for(let P=0;P<S.length;P++)S[P]=S[P]/L;y.envMap.value=e.texture,y.samples.value=M,y.weights.value=S,y.latitudinal.value=h==="latitudinal",d&&(y.poleAxis.value=d);const{_lodMax:N}=this;y.dTheta.value=E,y.mipInt.value=N-r;const w=this._sizeLods[l],G=3*w*(l>N-to?l-N+to:0),B=4*(this._cubeSize-w);Gc(i,G,B,3*w,2*w),m.setRenderTarget(i),m.render(g,sd)}}function T1(s){const e=[],i=[],r=[];let l=s;const c=s-to+1+g0.length;for(let h=0;h<c;h++){const d=Math.pow(2,l);i.push(d);let m=1/d;h>s-to?m=g0[h-s+to-1]:h===0&&(m=0),r.push(m);const p=1/(d-2),v=-p,g=1+p,y=[v,v,g,v,g,g,v,v,g,g,v,g],x=6,E=6,A=3,M=2,S=1,L=new Float32Array(A*E*x),N=new Float32Array(M*E*x),w=new Float32Array(S*E*x);for(let B=0;B<x;B++){const P=B%3*2/3-1,V=B>2?0:-1,D=[P,V,0,P+2/3,V,0,P+2/3,V+1,0,P,V,0,P+2/3,V+1,0,P,V+1,0];L.set(D,A*E*B),N.set(y,M*E*B);const C=[B,B,B,B,B,B];w.set(C,S*E*B)}const G=new Qi;G.setAttribute("position",new xi(L,A)),G.setAttribute("uv",new xi(N,M)),G.setAttribute("faceIndex",new xi(w,S)),e.push(G),l>to&&l--}return{lodPlanes:e,sizeLods:i,sigmas:r}}function y0(s,e,i){const r=new Yr(s,e,i);return r.texture.mapping=lc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Gc(s,e,i,r,l){s.viewport.set(e,i,r,l),s.scissor.set(e,i,r,l)}function b1(s,e,i){const r=new Float32Array(ts),l=new Y(0,1,0);return new pr({name:"SphericalGaussianBlur",defines:{n:ts,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function S0(){return new pr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function x0(){return new pr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function hd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function A1(s){let e=new WeakMap,i=null;function r(d){if(d&&d.isTexture){const m=d.mapping,p=m===Lf||m===Of,v=m===Ns||m===Ls;if(p||v){let g=e.get(d);const y=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==y)return i===null&&(i=new fd(s)),g=p?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),g.texture;if(g!==void 0)return g.texture;{const x=d.image;return p&&x&&x.height>0||v&&x&&l(x)?(i===null&&(i=new fd(s)),g=p?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),d.addEventListener("dispose",c),g.texture):null}}}return d}function l(d){let m=0;const p=6;for(let v=0;v<p;v++)d[v]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=e.get(m);p!==void 0&&(e.delete(m),p.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function R1(s){const e={};function i(r){if(e[r]!==void 0)return e[r];let l;switch(r){case"WEBGL_depth_texture":l=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=s.getExtension(r)}return e[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&Jo("THREE.WebGLRenderer: "+r+" extension not supported."),l}}}function C1(s,e,i,r){const l={},c=new WeakMap;function h(g){const y=g.target;y.index!==null&&e.remove(y.index);for(const E in y.attributes)e.remove(y.attributes[E]);y.removeEventListener("dispose",h),delete l[y.id];const x=c.get(y);x&&(e.remove(x),c.delete(y)),r.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,i.memory.geometries--}function d(g,y){return l[y.id]===!0||(y.addEventListener("dispose",h),l[y.id]=!0,i.memory.geometries++),y}function m(g){const y=g.attributes;for(const x in y)e.update(y[x],s.ARRAY_BUFFER)}function p(g){const y=[],x=g.index,E=g.attributes.position;let A=0;if(x!==null){const L=x.array;A=x.version;for(let N=0,w=L.length;N<w;N+=3){const G=L[N+0],B=L[N+1],P=L[N+2];y.push(G,B,B,P,P,G)}}else if(E!==void 0){const L=E.array;A=E.version;for(let N=0,w=L.length/3-1;N<w;N+=3){const G=N+0,B=N+1,P=N+2;y.push(G,B,B,P,P,G)}}else return;const M=new(Sg(y)?Pg:zg)(y,1);M.version=A;const S=c.get(g);S&&e.remove(S),c.set(g,M)}function v(g){const y=c.get(g);if(y){const x=g.index;x!==null&&y.version<x.version&&p(g)}else p(g);return c.get(g)}return{get:d,update:m,getWireframeAttribute:v}}function w1(s,e,i){let r;function l(y){r=y}let c,h;function d(y){c=y.type,h=y.bytesPerElement}function m(y,x){s.drawElements(r,x,c,y*h),i.update(x,r,1)}function p(y,x,E){E!==0&&(s.drawElementsInstanced(r,x,c,y*h,E),i.update(x,r,E))}function v(y,x,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,x,0,c,y,0,E);let M=0;for(let S=0;S<E;S++)M+=x[S];i.update(M,r,1)}function g(y,x,E,A){if(E===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let S=0;S<y.length;S++)p(y[S]/h,x[S],A[S]);else{M.multiDrawElementsInstancedWEBGL(r,x,0,c,y,0,A,0,E);let S=0;for(let L=0;L<E;L++)S+=x[L]*A[L];i.update(S,r,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=v,this.renderMultiDrawInstances=g}function D1(s){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,h,d){switch(i.calls++,h){case s.TRIANGLES:i.triangles+=d*(c/3);break;case s.LINES:i.lines+=d*(c/2);break;case s.LINE_STRIP:i.lines+=d*(c-1);break;case s.LINE_LOOP:i.lines+=d*c;break;case s.POINTS:i.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:r}}function U1(s,e,i){const r=new WeakMap,l=new pn;function c(h,d,m){const p=h.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,g=v!==void 0?v.length:0;let y=r.get(d);if(y===void 0||y.count!==g){let D=function(){P.dispose(),r.delete(d),d.removeEventListener("dispose",D)};y!==void 0&&y.texture.dispose();const x=d.morphAttributes.position!==void 0,E=d.morphAttributes.normal!==void 0,A=d.morphAttributes.color!==void 0,M=d.morphAttributes.position||[],S=d.morphAttributes.normal||[],L=d.morphAttributes.color||[];let N=0;x===!0&&(N=1),E===!0&&(N=2),A===!0&&(N=3);let w=d.attributes.position.count*N,G=1;w>e.maxTextureSize&&(G=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const B=new Float32Array(w*G*4*g),P=new Tg(B,w,G,g);P.type=wa,P.needsUpdate=!0;const V=N*4;for(let C=0;C<g;C++){const H=M[C],st=S[C],ft=L[C],q=w*G*4*C;for(let Q=0;Q<H.count;Q++){const F=Q*V;x===!0&&(l.fromBufferAttribute(H,Q),B[q+F+0]=l.x,B[q+F+1]=l.y,B[q+F+2]=l.z,B[q+F+3]=0),E===!0&&(l.fromBufferAttribute(st,Q),B[q+F+4]=l.x,B[q+F+5]=l.y,B[q+F+6]=l.z,B[q+F+7]=0),A===!0&&(l.fromBufferAttribute(ft,Q),B[q+F+8]=l.x,B[q+F+9]=l.y,B[q+F+10]=l.z,B[q+F+11]=ft.itemSize===4?l.w:1)}}y={count:g,texture:P,size:new qt(w,G)},r.set(d,y),d.addEventListener("dispose",D)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(s,"morphTexture",h.morphTexture,i);else{let x=0;for(let A=0;A<p.length;A++)x+=p[A];const E=d.morphTargetsRelative?1:1-x;m.getUniforms().setValue(s,"morphTargetBaseInfluence",E),m.getUniforms().setValue(s,"morphTargetInfluences",p)}m.getUniforms().setValue(s,"morphTargetsTexture",y.texture,i),m.getUniforms().setValue(s,"morphTargetsTextureSize",y.size)}return{update:c}}function N1(s,e,i,r){let l=new WeakMap;function c(m){const p=r.render.frame,v=m.geometry,g=e.get(m,v);if(l.get(g)!==p&&(e.update(g),l.set(g,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,s.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,s.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const y=m.skeleton;l.get(y)!==p&&(y.update(),l.set(y,p))}return g}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:c,dispose:h}}const M0=new Kn,E0=new Yg(1,1),T0=new Tg,b0=new sM,A0=new kg,R0=[],C0=[],w0=new Float32Array(16),D0=new Float32Array(9),U0=new Float32Array(4);function no(s,e,i){const r=s[0];if(r<=0||r>0)return s;const l=e*i;let c=R0[l];if(c===void 0&&(c=new Float32Array(l),R0[l]=c),e!==0){r.toArray(c,0);for(let h=1,d=0;h!==e;++h)d+=i,s[h].toArray(c,d)}return c}function An(s,e){if(s.length!==e.length)return!1;for(let i=0,r=s.length;i<r;i++)if(s[i]!==e[i])return!1;return!0}function Rn(s,e){for(let i=0,r=e.length;i<r;i++)s[i]=e[i]}function Xc(s,e){let i=C0[e];i===void 0&&(i=new Int32Array(e),C0[e]=i);for(let r=0;r!==e;++r)i[r]=s.allocateTextureUnit();return i}function L1(s,e){const i=this.cache;i[0]!==e&&(s.uniform1f(this.addr,e),i[0]=e)}function O1(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(An(i,e))return;s.uniform2fv(this.addr,e),Rn(i,e)}}function z1(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(An(i,e))return;s.uniform3fv(this.addr,e),Rn(i,e)}}function P1(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(An(i,e))return;s.uniform4fv(this.addr,e),Rn(i,e)}}function I1(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(An(i,e))return;s.uniformMatrix2fv(this.addr,!1,e),Rn(i,e)}else{if(An(i,r))return;U0.set(r),s.uniformMatrix2fv(this.addr,!1,U0),Rn(i,r)}}function B1(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(An(i,e))return;s.uniformMatrix3fv(this.addr,!1,e),Rn(i,e)}else{if(An(i,r))return;D0.set(r),s.uniformMatrix3fv(this.addr,!1,D0),Rn(i,r)}}function F1(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(An(i,e))return;s.uniformMatrix4fv(this.addr,!1,e),Rn(i,e)}else{if(An(i,r))return;w0.set(r),s.uniformMatrix4fv(this.addr,!1,w0),Rn(i,r)}}function H1(s,e){const i=this.cache;i[0]!==e&&(s.uniform1i(this.addr,e),i[0]=e)}function V1(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(An(i,e))return;s.uniform2iv(this.addr,e),Rn(i,e)}}function G1(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(An(i,e))return;s.uniform3iv(this.addr,e),Rn(i,e)}}function X1(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(An(i,e))return;s.uniform4iv(this.addr,e),Rn(i,e)}}function k1(s,e){const i=this.cache;i[0]!==e&&(s.uniform1ui(this.addr,e),i[0]=e)}function q1(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(An(i,e))return;s.uniform2uiv(this.addr,e),Rn(i,e)}}function Y1(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(An(i,e))return;s.uniform3uiv(this.addr,e),Rn(i,e)}}function W1(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(An(i,e))return;s.uniform4uiv(this.addr,e),Rn(i,e)}}function Z1(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l);let c;this.type===s.SAMPLER_2D_SHADOW?(E0.compareFunction=gg,c=E0):c=M0,i.setTexture2D(e||c,l)}function K1(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(e||b0,l)}function j1(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(e||A0,l)}function Q1(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(e||T0,l)}function J1(s){switch(s){case 5126:return L1;case 35664:return O1;case 35665:return z1;case 35666:return P1;case 35674:return I1;case 35675:return B1;case 35676:return F1;case 5124:case 35670:return H1;case 35667:case 35671:return V1;case 35668:case 35672:return G1;case 35669:case 35673:return X1;case 5125:return k1;case 36294:return q1;case 36295:return Y1;case 36296:return W1;case 35678:case 36198:case 36298:case 36306:case 35682:return Z1;case 35679:case 36299:case 36307:return K1;case 35680:case 36300:case 36308:case 36293:return j1;case 36289:case 36303:case 36311:case 36292:return Q1}}function $1(s,e){s.uniform1fv(this.addr,e)}function tb(s,e){const i=no(e,this.size,2);s.uniform2fv(this.addr,i)}function eb(s,e){const i=no(e,this.size,3);s.uniform3fv(this.addr,i)}function nb(s,e){const i=no(e,this.size,4);s.uniform4fv(this.addr,i)}function ib(s,e){const i=no(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,i)}function ab(s,e){const i=no(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,i)}function rb(s,e){const i=no(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,i)}function sb(s,e){s.uniform1iv(this.addr,e)}function ob(s,e){s.uniform2iv(this.addr,e)}function lb(s,e){s.uniform3iv(this.addr,e)}function cb(s,e){s.uniform4iv(this.addr,e)}function ub(s,e){s.uniform1uiv(this.addr,e)}function fb(s,e){s.uniform2uiv(this.addr,e)}function hb(s,e){s.uniform3uiv(this.addr,e)}function db(s,e){s.uniform4uiv(this.addr,e)}function pb(s,e,i){const r=this.cache,l=e.length,c=Xc(i,l);An(r,c)||(s.uniform1iv(this.addr,c),Rn(r,c));for(let h=0;h!==l;++h)i.setTexture2D(e[h]||M0,c[h])}function mb(s,e,i){const r=this.cache,l=e.length,c=Xc(i,l);An(r,c)||(s.uniform1iv(this.addr,c),Rn(r,c));for(let h=0;h!==l;++h)i.setTexture3D(e[h]||b0,c[h])}function gb(s,e,i){const r=this.cache,l=e.length,c=Xc(i,l);An(r,c)||(s.uniform1iv(this.addr,c),Rn(r,c));for(let h=0;h!==l;++h)i.setTextureCube(e[h]||A0,c[h])}function vb(s,e,i){const r=this.cache,l=e.length,c=Xc(i,l);An(r,c)||(s.uniform1iv(this.addr,c),Rn(r,c));for(let h=0;h!==l;++h)i.setTexture2DArray(e[h]||T0,c[h])}function _b(s){switch(s){case 5126:return $1;case 35664:return tb;case 35665:return eb;case 35666:return nb;case 35674:return ib;case 35675:return ab;case 35676:return rb;case 5124:case 35670:return sb;case 35667:case 35671:return ob;case 35668:case 35672:return lb;case 35669:case 35673:return cb;case 5125:return ub;case 36294:return fb;case 36295:return hb;case 36296:return db;case 35678:case 36198:case 36298:case 36306:case 35682:return pb;case 35679:case 36299:case 36307:return mb;case 35680:case 36300:case 36308:case 36293:return gb;case 36289:case 36303:case 36311:case 36292:return vb}}class yb{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.setValue=J1(i.type)}}class Sb{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=_b(i.type)}}class xb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,r){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const d=l[c];d.setValue(e,i[d.id],r)}}}const dd=/(\w+)(\])?(\[|\.)?/g;function N0(s,e){s.seq.push(e),s.map[e.id]=e}function Mb(s,e,i){const r=s.name,l=r.length;for(dd.lastIndex=0;;){const c=dd.exec(r),h=dd.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){N0(i,p===void 0?new yb(d,s,e):new Sb(d,s,e));break}else{let g=i.map[d];g===void 0&&(g=new xb(d),N0(i,g)),i=g}}}class kc{constructor(e,i){this.seq=[],this.map={};const r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let l=0;l<r;++l){const c=e.getActiveUniform(i,l),h=e.getUniformLocation(i,c.name);Mb(c,h,this)}}setValue(e,i,r,l){const c=this.map[i];c!==void 0&&c.setValue(e,r,l)}setOptional(e,i,r){const l=i[r];l!==void 0&&this.setValue(e,r,l)}static upload(e,i,r,l){for(let c=0,h=i.length;c!==h;++c){const d=i[c],m=r[d.id];m.needsUpdate!==!1&&d.setValue(e,m.value,l)}}static seqWithValue(e,i){const r=[];for(let l=0,c=e.length;l!==c;++l){const h=e[l];h.id in i&&r.push(h)}return r}}function L0(s,e,i){const r=s.createShader(e);return s.shaderSource(r,i),s.compileShader(r),r}const Eb=37297;let Tb=0;function bb(s,e){const i=s.split(`
`),r=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let h=l;h<c;h++){const d=h+1;r.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return r.join(`
`)}const O0=new xe;function Ab(s){Ge._getMatrix(O0,Ge.workingColorSpace,s);const e=`mat3( ${O0.elements.map(i=>i.toFixed(4))} )`;switch(Ge.getTransfer(s)){case pc:return[e,"LinearTransferOETF"];case je:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function z0(s,e,i){const r=s.getShaderParameter(e,s.COMPILE_STATUS),c=(s.getShaderInfoLog(e)||"").trim();if(r&&c==="")return"";const h=/ERROR: 0:(\d+)/.exec(c);if(h){const d=parseInt(h[1]);return i.toUpperCase()+`

`+c+`

`+bb(s.getShaderSource(e),d)}else return c}function Rb(s,e){const i=Ab(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function Cb(s,e){let i;switch(e){case zx:i="Linear";break;case Px:i="Reinhard";break;case Ix:i="Cineon";break;case Bx:i="ACESFilmic";break;case Hx:i="AgX";break;case ag:i="Neutral";break;case Fx:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+s+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const qc=new Y;function wb(){Ge.getLuminanceCoefficients(qc);const s=qc.x.toFixed(4),e=qc.y.toFixed(4),i=qc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Db(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dl).join(`
`)}function Ub(s){const e=[];for(const i in s){const r=s[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function Nb(s,e){const i={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const c=s.getActiveAttrib(e,l),h=c.name;let d=1;c.type===s.FLOAT_MAT2&&(d=2),c.type===s.FLOAT_MAT3&&(d=3),c.type===s.FLOAT_MAT4&&(d=4),i[h]={type:c.type,location:s.getAttribLocation(e,h),locationSize:d}}return i}function dl(s){return s!==""}function P0(s,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function I0(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Lb=/^[ \t]*#include +<([\w\d./]+)>/gm;function pd(s){return s.replace(Lb,zb)}const Ob=new Map;function zb(s,e){let i=Ee[e];if(i===void 0){const r=Ob.get(e);if(r!==void 0)i=Ee[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return pd(i)}const Pb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function B0(s){return s.replace(Pb,Ib)}function Ib(s,e,i,r){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function F0(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Bb(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===$m?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===px?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Ra&&(e="SHADOWMAP_TYPE_VSM"),e}function Fb(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ns:case Ls:e="ENVMAP_TYPE_CUBE";break;case lc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Hb(s){let e="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===Ls&&(e="ENVMAP_MODE_REFRACTION"),e}function Vb(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case ig:e="ENVMAP_BLENDING_MULTIPLY";break;case Lx:e="ENVMAP_BLENDING_MIX";break;case Ox:e="ENVMAP_BLENDING_ADD";break}return e}function Gb(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function Xb(s,e,i,r){const l=s.getContext(),c=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=Bb(i),p=Fb(i),v=Hb(i),g=Vb(i),y=Gb(i),x=Db(i),E=Ub(c),A=l.createProgram();let M,S,L=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(dl).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(dl).join(`
`),S.length>0&&(S+=`
`)):(M=[F0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dl).join(`
`),S=[F0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+v:"",i.envMap?"#define "+g:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==rr?"#define TONE_MAPPING":"",i.toneMapping!==rr?Ee.tonemapping_pars_fragment:"",i.toneMapping!==rr?Cb("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Ee.colorspace_pars_fragment,Rb("linearToOutputTexel",i.outputColorSpace),wb(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(dl).join(`
`)),h=pd(h),h=P0(h,i),h=I0(h,i),d=pd(d),d=P0(d,i),d=I0(d,i),h=B0(h),d=B0(d),i.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,M=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",i.glslVersion===_g?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===_g?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const N=L+M+h,w=L+S+d,G=L0(l,l.VERTEX_SHADER,N),B=L0(l,l.FRAGMENT_SHADER,w);l.attachShader(A,G),l.attachShader(A,B),i.index0AttributeName!==void 0?l.bindAttribLocation(A,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(A,0,"position"),l.linkProgram(A);function P(H){if(s.debug.checkShaderErrors){const st=l.getProgramInfoLog(A)||"",ft=l.getShaderInfoLog(G)||"",q=l.getShaderInfoLog(B)||"",Q=st.trim(),F=ft.trim(),nt=q.trim();let Z=!0,xt=!0;if(l.getProgramParameter(A,l.LINK_STATUS)===!1)if(Z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(l,A,G,B);else{const vt=z0(l,G,"vertex"),Nt=z0(l,B,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(A,l.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+Q+`
`+vt+`
`+Nt)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(F===""||nt==="")&&(xt=!1);xt&&(H.diagnostics={runnable:Z,programLog:Q,vertexShader:{log:F,prefix:M},fragmentShader:{log:nt,prefix:S}})}l.deleteShader(G),l.deleteShader(B),V=new kc(l,A),D=Nb(l,A)}let V;this.getUniforms=function(){return V===void 0&&P(this),V};let D;this.getAttributes=function(){return D===void 0&&P(this),D};let C=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=l.getProgramParameter(A,Eb)),C},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(A),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=Tb++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=G,this.fragmentShader=B,this}let kb=0;class qb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,r=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(r),h=this._getShaderCacheForMaterial(e);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let r=i.get(e);return r===void 0&&(r=new Set,i.set(e,r)),r}_getShaderStage(e){const i=this.shaderCache;let r=i.get(e);return r===void 0&&(r=new Yb(e),i.set(e,r)),r}}class Yb{constructor(e){this.id=kb++,this.code=e,this.usedTimes=0}}function Wb(s,e,i,r,l,c,h){const d=new Uh,m=new qb,p=new Set,v=[],g=l.logarithmicDepthBuffer,y=l.vertexTextures;let x=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(D){return p.add(D),D===0?"uv":`uv${D}`}function M(D,C,H,st,ft){const q=st.fog,Q=ft.geometry,F=D.isMeshStandardMaterial?st.environment:null,nt=(D.isMeshStandardMaterial?i:e).get(D.envMap||F),Z=nt&&nt.mapping===lc?nt.image.height:null,xt=E[D.type];D.precision!==null&&(x=l.getMaxPrecision(D.precision),x!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",x,"instead."));const vt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Nt=vt!==void 0?vt.length:0;let Qt=0;Q.morphAttributes.position!==void 0&&(Qt=1),Q.morphAttributes.normal!==void 0&&(Qt=2),Q.morphAttributes.color!==void 0&&(Qt=3);let ae,I,lt,$;if(xt){const de=pa[xt];ae=de.vertexShader,I=de.fragmentShader}else ae=D.vertexShader,I=D.fragmentShader,m.update(D),lt=m.getVertexShaderID(D),$=m.getFragmentShaderID(D);const rt=s.getRenderTarget(),Rt=s.state.buffers.depth.getReversed(),Dt=ft.isInstancedMesh===!0,Ct=ft.isBatchedMesh===!0,Ut=!!D.map,Ht=!!D.matcap,z=!!nt,wt=!!D.aoMap,yt=!!D.lightMap,gt=!!D.bumpMap,pt=!!D.normalMap,Tt=!!D.displacementMap,At=!!D.emissiveMap,Bt=!!D.metalnessMap,fe=!!D.roughnessMap,ce=D.anisotropy>0,U=D.clearcoat>0,T=D.dispersion>0,et=D.iridescence>0,dt=D.sheen>0,Et=D.transmission>0,mt=ce&&!!D.anisotropyMap,Zt=U&&!!D.clearcoatMap,It=U&&!!D.clearcoatNormalMap,ee=U&&!!D.clearcoatRoughnessMap,$t=et&&!!D.iridescenceMap,Ot=et&&!!D.iridescenceThicknessMap,Xt=dt&&!!D.sheenColorMap,se=dt&&!!D.sheenRoughnessMap,ie=!!D.specularMap,Yt=!!D.specularColorMap,ge=!!D.specularIntensityMap,X=Et&&!!D.transmissionMap,zt=Et&&!!D.thicknessMap,Vt=!!D.gradientMap,Mt=!!D.alphaMap,Lt=D.alphaTest>0,bt=!!D.alphaHash,ne=!!D.extensions;let me=rr;D.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(me=s.toneMapping);const Me={shaderID:xt,shaderType:D.type,shaderName:D.name,vertexShader:ae,fragmentShader:I,defines:D.defines,customVertexShaderID:lt,customFragmentShaderID:$,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:x,batching:Ct,batchingColor:Ct&&ft._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&ft.instanceColor!==null,instancingMorph:Dt&&ft.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:rt===null?s.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Os,alphaToCoverage:!!D.alphaToCoverage,map:Ut,matcap:Ht,envMap:z,envMapMode:z&&nt.mapping,envMapCubeUVHeight:Z,aoMap:wt,lightMap:yt,bumpMap:gt,normalMap:pt,displacementMap:y&&Tt,emissiveMap:At,normalMapObjectSpace:pt&&D.normalMapType===kx,normalMapTangentSpace:pt&&D.normalMapType===pg,metalnessMap:Bt,roughnessMap:fe,anisotropy:ce,anisotropyMap:mt,clearcoat:U,clearcoatMap:Zt,clearcoatNormalMap:It,clearcoatRoughnessMap:ee,dispersion:T,iridescence:et,iridescenceMap:$t,iridescenceThicknessMap:Ot,sheen:dt,sheenColorMap:Xt,sheenRoughnessMap:se,specularMap:ie,specularColorMap:Yt,specularIntensityMap:ge,transmission:Et,transmissionMap:X,thicknessMap:zt,gradientMap:Vt,opaque:D.transparent===!1&&D.blending===Ds&&D.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Lt,alphaHash:bt,combine:D.combine,mapUv:Ut&&A(D.map.channel),aoMapUv:wt&&A(D.aoMap.channel),lightMapUv:yt&&A(D.lightMap.channel),bumpMapUv:gt&&A(D.bumpMap.channel),normalMapUv:pt&&A(D.normalMap.channel),displacementMapUv:Tt&&A(D.displacementMap.channel),emissiveMapUv:At&&A(D.emissiveMap.channel),metalnessMapUv:Bt&&A(D.metalnessMap.channel),roughnessMapUv:fe&&A(D.roughnessMap.channel),anisotropyMapUv:mt&&A(D.anisotropyMap.channel),clearcoatMapUv:Zt&&A(D.clearcoatMap.channel),clearcoatNormalMapUv:It&&A(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&A(D.clearcoatRoughnessMap.channel),iridescenceMapUv:$t&&A(D.iridescenceMap.channel),iridescenceThicknessMapUv:Ot&&A(D.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&A(D.sheenColorMap.channel),sheenRoughnessMapUv:se&&A(D.sheenRoughnessMap.channel),specularMapUv:ie&&A(D.specularMap.channel),specularColorMapUv:Yt&&A(D.specularColorMap.channel),specularIntensityMapUv:ge&&A(D.specularIntensityMap.channel),transmissionMapUv:X&&A(D.transmissionMap.channel),thicknessMapUv:zt&&A(D.thicknessMap.channel),alphaMapUv:Mt&&A(D.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(pt||ce),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:ft.isPoints===!0&&!!Q.attributes.uv&&(Ut||Mt),fog:!!q,useFog:D.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:D.flatShading===!0&&D.wireframe===!1,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:Rt,skinning:ft.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Nt,morphTextureStride:Qt,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:D.dithering,shadowMapEnabled:s.shadowMap.enabled&&H.length>0,shadowMapType:s.shadowMap.type,toneMapping:me,decodeVideoTexture:Ut&&D.map.isVideoTexture===!0&&Ge.getTransfer(D.map.colorSpace)===je,decodeVideoTextureEmissive:At&&D.emissiveMap.isVideoTexture===!0&&Ge.getTransfer(D.emissiveMap.colorSpace)===je,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===qi,flipSided:D.side===li,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:ne&&D.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&D.extensions.multiDraw===!0||Ct)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return Me.vertexUv1s=p.has(1),Me.vertexUv2s=p.has(2),Me.vertexUv3s=p.has(3),p.clear(),Me}function S(D){const C=[];if(D.shaderID?C.push(D.shaderID):(C.push(D.customVertexShaderID),C.push(D.customFragmentShaderID)),D.defines!==void 0)for(const H in D.defines)C.push(H),C.push(D.defines[H]);return D.isRawShaderMaterial===!1&&(L(C,D),N(C,D),C.push(s.outputColorSpace)),C.push(D.customProgramCacheKey),C.join()}function L(D,C){D.push(C.precision),D.push(C.outputColorSpace),D.push(C.envMapMode),D.push(C.envMapCubeUVHeight),D.push(C.mapUv),D.push(C.alphaMapUv),D.push(C.lightMapUv),D.push(C.aoMapUv),D.push(C.bumpMapUv),D.push(C.normalMapUv),D.push(C.displacementMapUv),D.push(C.emissiveMapUv),D.push(C.metalnessMapUv),D.push(C.roughnessMapUv),D.push(C.anisotropyMapUv),D.push(C.clearcoatMapUv),D.push(C.clearcoatNormalMapUv),D.push(C.clearcoatRoughnessMapUv),D.push(C.iridescenceMapUv),D.push(C.iridescenceThicknessMapUv),D.push(C.sheenColorMapUv),D.push(C.sheenRoughnessMapUv),D.push(C.specularMapUv),D.push(C.specularColorMapUv),D.push(C.specularIntensityMapUv),D.push(C.transmissionMapUv),D.push(C.thicknessMapUv),D.push(C.combine),D.push(C.fogExp2),D.push(C.sizeAttenuation),D.push(C.morphTargetsCount),D.push(C.morphAttributeCount),D.push(C.numDirLights),D.push(C.numPointLights),D.push(C.numSpotLights),D.push(C.numSpotLightMaps),D.push(C.numHemiLights),D.push(C.numRectAreaLights),D.push(C.numDirLightShadows),D.push(C.numPointLightShadows),D.push(C.numSpotLightShadows),D.push(C.numSpotLightShadowsWithMaps),D.push(C.numLightProbes),D.push(C.shadowMapType),D.push(C.toneMapping),D.push(C.numClippingPlanes),D.push(C.numClipIntersection),D.push(C.depthPacking)}function N(D,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),C.gradientMap&&d.enable(22),D.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reversedDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),D.push(d.mask)}function w(D){const C=E[D.type];let H;if(C){const st=pa[C];H=yM.clone(st.uniforms)}else H=D.uniforms;return H}function G(D,C){let H;for(let st=0,ft=v.length;st<ft;st++){const q=v[st];if(q.cacheKey===C){H=q,++H.usedTimes;break}}return H===void 0&&(H=new Xb(s,C,D,c),v.push(H)),H}function B(D){if(--D.usedTimes===0){const C=v.indexOf(D);v[C]=v[v.length-1],v.pop(),D.destroy()}}function P(D){m.remove(D)}function V(){m.dispose()}return{getParameters:M,getProgramCacheKey:S,getUniforms:w,acquireProgram:G,releaseProgram:B,releaseShaderCache:P,programs:v,dispose:V}}function Zb(){let s=new WeakMap;function e(h){return s.has(h)}function i(h){let d=s.get(h);return d===void 0&&(d={},s.set(h,d)),d}function r(h){s.delete(h)}function l(h,d,m){s.get(h)[d]=m}function c(){s=new WeakMap}return{has:e,get:i,remove:r,update:l,dispose:c}}function Kb(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function H0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function V0(){const s=[];let e=0;const i=[],r=[],l=[];function c(){e=0,i.length=0,r.length=0,l.length=0}function h(g,y,x,E,A,M){let S=s[e];return S===void 0?(S={id:g.id,object:g,geometry:y,material:x,groupOrder:E,renderOrder:g.renderOrder,z:A,group:M},s[e]=S):(S.id=g.id,S.object=g,S.geometry=y,S.material=x,S.groupOrder=E,S.renderOrder=g.renderOrder,S.z=A,S.group=M),e++,S}function d(g,y,x,E,A,M){const S=h(g,y,x,E,A,M);x.transmission>0?r.push(S):x.transparent===!0?l.push(S):i.push(S)}function m(g,y,x,E,A,M){const S=h(g,y,x,E,A,M);x.transmission>0?r.unshift(S):x.transparent===!0?l.unshift(S):i.unshift(S)}function p(g,y){i.length>1&&i.sort(g||Kb),r.length>1&&r.sort(y||H0),l.length>1&&l.sort(y||H0)}function v(){for(let g=e,y=s.length;g<y;g++){const x=s[g];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:i,transmissive:r,transparent:l,init:c,push:d,unshift:m,finish:v,sort:p}}function jb(){let s=new WeakMap;function e(r,l){const c=s.get(r);let h;return c===void 0?(h=new V0,s.set(r,[h])):l>=c.length?(h=new V0,c.push(h)):h=c[l],h}function i(){s=new WeakMap}return{get:e,dispose:i}}function Qb(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new Y,color:new Re};break;case"SpotLight":i={position:new Y,direction:new Y,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new Y,color:new Re,distance:0,decay:0};break;case"HemisphereLight":i={direction:new Y,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":i={color:new Re,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return s[e.id]=i,i}}}function Jb(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=i,i}}}let $b=0;function tA(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function eA(s){const e=new Qb,i=Jb(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new Y);const l=new Y,c=new sn,h=new sn;function d(p){let v=0,g=0,y=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let x=0,E=0,A=0,M=0,S=0,L=0,N=0,w=0,G=0,B=0,P=0;p.sort(tA);for(let D=0,C=p.length;D<C;D++){const H=p[D],st=H.color,ft=H.intensity,q=H.distance,Q=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)v+=st.r*ft,g+=st.g*ft,y+=st.b*ft;else if(H.isLightProbe){for(let F=0;F<9;F++)r.probe[F].addScaledVector(H.sh.coefficients[F],ft);P++}else if(H.isDirectionalLight){const F=e.get(H);if(F.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const nt=H.shadow,Z=i.get(H);Z.shadowIntensity=nt.intensity,Z.shadowBias=nt.bias,Z.shadowNormalBias=nt.normalBias,Z.shadowRadius=nt.radius,Z.shadowMapSize=nt.mapSize,r.directionalShadow[x]=Z,r.directionalShadowMap[x]=Q,r.directionalShadowMatrix[x]=H.shadow.matrix,L++}r.directional[x]=F,x++}else if(H.isSpotLight){const F=e.get(H);F.position.setFromMatrixPosition(H.matrixWorld),F.color.copy(st).multiplyScalar(ft),F.distance=q,F.coneCos=Math.cos(H.angle),F.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),F.decay=H.decay,r.spot[A]=F;const nt=H.shadow;if(H.map&&(r.spotLightMap[G]=H.map,G++,nt.updateMatrices(H),H.castShadow&&B++),r.spotLightMatrix[A]=nt.matrix,H.castShadow){const Z=i.get(H);Z.shadowIntensity=nt.intensity,Z.shadowBias=nt.bias,Z.shadowNormalBias=nt.normalBias,Z.shadowRadius=nt.radius,Z.shadowMapSize=nt.mapSize,r.spotShadow[A]=Z,r.spotShadowMap[A]=Q,w++}A++}else if(H.isRectAreaLight){const F=e.get(H);F.color.copy(st).multiplyScalar(ft),F.halfWidth.set(H.width*.5,0,0),F.halfHeight.set(0,H.height*.5,0),r.rectArea[M]=F,M++}else if(H.isPointLight){const F=e.get(H);if(F.color.copy(H.color).multiplyScalar(H.intensity),F.distance=H.distance,F.decay=H.decay,H.castShadow){const nt=H.shadow,Z=i.get(H);Z.shadowIntensity=nt.intensity,Z.shadowBias=nt.bias,Z.shadowNormalBias=nt.normalBias,Z.shadowRadius=nt.radius,Z.shadowMapSize=nt.mapSize,Z.shadowCameraNear=nt.camera.near,Z.shadowCameraFar=nt.camera.far,r.pointShadow[E]=Z,r.pointShadowMap[E]=Q,r.pointShadowMatrix[E]=H.shadow.matrix,N++}r.point[E]=F,E++}else if(H.isHemisphereLight){const F=e.get(H);F.skyColor.copy(H.color).multiplyScalar(ft),F.groundColor.copy(H.groundColor).multiplyScalar(ft),r.hemi[S]=F,S++}}M>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Kt.LTC_FLOAT_1,r.rectAreaLTC2=Kt.LTC_FLOAT_2):(r.rectAreaLTC1=Kt.LTC_HALF_1,r.rectAreaLTC2=Kt.LTC_HALF_2)),r.ambient[0]=v,r.ambient[1]=g,r.ambient[2]=y;const V=r.hash;(V.directionalLength!==x||V.pointLength!==E||V.spotLength!==A||V.rectAreaLength!==M||V.hemiLength!==S||V.numDirectionalShadows!==L||V.numPointShadows!==N||V.numSpotShadows!==w||V.numSpotMaps!==G||V.numLightProbes!==P)&&(r.directional.length=x,r.spot.length=A,r.rectArea.length=M,r.point.length=E,r.hemi.length=S,r.directionalShadow.length=L,r.directionalShadowMap.length=L,r.pointShadow.length=N,r.pointShadowMap.length=N,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=L,r.pointShadowMatrix.length=N,r.spotLightMatrix.length=w+G-B,r.spotLightMap.length=G,r.numSpotLightShadowsWithMaps=B,r.numLightProbes=P,V.directionalLength=x,V.pointLength=E,V.spotLength=A,V.rectAreaLength=M,V.hemiLength=S,V.numDirectionalShadows=L,V.numPointShadows=N,V.numSpotShadows=w,V.numSpotMaps=G,V.numLightProbes=P,r.version=$b++)}function m(p,v){let g=0,y=0,x=0,E=0,A=0;const M=v.matrixWorldInverse;for(let S=0,L=p.length;S<L;S++){const N=p[S];if(N.isDirectionalLight){const w=r.directional[g];w.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(M),g++}else if(N.isSpotLight){const w=r.spot[x];w.position.setFromMatrixPosition(N.matrixWorld),w.position.applyMatrix4(M),w.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(M),x++}else if(N.isRectAreaLight){const w=r.rectArea[E];w.position.setFromMatrixPosition(N.matrixWorld),w.position.applyMatrix4(M),h.identity(),c.copy(N.matrixWorld),c.premultiply(M),h.extractRotation(c),w.halfWidth.set(N.width*.5,0,0),w.halfHeight.set(0,N.height*.5,0),w.halfWidth.applyMatrix4(h),w.halfHeight.applyMatrix4(h),E++}else if(N.isPointLight){const w=r.point[y];w.position.setFromMatrixPosition(N.matrixWorld),w.position.applyMatrix4(M),y++}else if(N.isHemisphereLight){const w=r.hemi[A];w.direction.setFromMatrixPosition(N.matrixWorld),w.direction.transformDirection(M),A++}}}return{setup:d,setupView:m,state:r}}function G0(s){const e=new eA(s),i=[],r=[];function l(v){p.camera=v,i.length=0,r.length=0}function c(v){i.push(v)}function h(v){r.push(v)}function d(){e.setup(i)}function m(v){e.setupView(i,v)}const p={lightsArray:i,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:h}}function nA(s){let e=new WeakMap;function i(l,c=0){const h=e.get(l);let d;return h===void 0?(d=new G0(s),e.set(l,[d])):c>=h.length?(d=new G0(s),h.push(d)):d=h[c],d}function r(){e=new WeakMap}return{get:i,dispose:r}}const iA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,aA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function rA(s,e,i){let r=new Yh;const l=new qt,c=new qt,h=new pn,d=new lE({depthPacking:Xx}),m=new cE,p={},v=i.maxTextureSize,g={[ir]:li,[li]:ir,[qi]:qi},y=new pr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:iA,fragmentShader:aA}),x=y.clone();x.defines.HORIZONTAL_PASS=1;const E=new Qi;E.setAttribute("position",new xi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Fn(E,y),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$m;let S=this.type;this.render=function(B,P,V){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||B.length===0)return;const D=s.getRenderTarget(),C=s.getActiveCubeFace(),H=s.getActiveMipmapLevel(),st=s.state;st.setBlending(ar),st.buffers.depth.getReversed()===!0?st.buffers.color.setClear(0,0,0,0):st.buffers.color.setClear(1,1,1,1),st.buffers.depth.setTest(!0),st.setScissorTest(!1);const ft=S!==Ra&&this.type===Ra,q=S===Ra&&this.type!==Ra;for(let Q=0,F=B.length;Q<F;Q++){const nt=B[Q],Z=nt.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;l.copy(Z.mapSize);const xt=Z.getFrameExtents();if(l.multiply(xt),c.copy(Z.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(c.x=Math.floor(v/xt.x),l.x=c.x*xt.x,Z.mapSize.x=c.x),l.y>v&&(c.y=Math.floor(v/xt.y),l.y=c.y*xt.y,Z.mapSize.y=c.y)),Z.map===null||ft===!0||q===!0){const Nt=this.type!==Ra?{minFilter:yi,magFilter:yi}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Yr(l.x,l.y,Nt),Z.map.texture.name=nt.name+".shadowMap",Z.camera.updateProjectionMatrix()}s.setRenderTarget(Z.map),s.clear();const vt=Z.getViewportCount();for(let Nt=0;Nt<vt;Nt++){const Qt=Z.getViewport(Nt);h.set(c.x*Qt.x,c.y*Qt.y,c.x*Qt.z,c.y*Qt.w),st.viewport(h),Z.updateMatrices(nt,Nt),r=Z.getFrustum(),w(P,V,Z.camera,nt,this.type)}Z.isPointLightShadow!==!0&&this.type===Ra&&L(Z,V),Z.needsUpdate=!1}S=this.type,M.needsUpdate=!1,s.setRenderTarget(D,C,H)};function L(B,P){const V=e.update(A);y.defines.VSM_SAMPLES!==B.blurSamples&&(y.defines.VSM_SAMPLES=B.blurSamples,x.defines.VSM_SAMPLES=B.blurSamples,y.needsUpdate=!0,x.needsUpdate=!0),B.mapPass===null&&(B.mapPass=new Yr(l.x,l.y)),y.uniforms.shadow_pass.value=B.map.texture,y.uniforms.resolution.value=B.mapSize,y.uniforms.radius.value=B.radius,s.setRenderTarget(B.mapPass),s.clear(),s.renderBufferDirect(P,null,V,y,A,null),x.uniforms.shadow_pass.value=B.mapPass.texture,x.uniforms.resolution.value=B.mapSize,x.uniforms.radius.value=B.radius,s.setRenderTarget(B.map),s.clear(),s.renderBufferDirect(P,null,V,x,A,null)}function N(B,P,V,D){let C=null;const H=V.isPointLight===!0?B.customDistanceMaterial:B.customDepthMaterial;if(H!==void 0)C=H;else if(C=V.isPointLight===!0?m:d,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const st=C.uuid,ft=P.uuid;let q=p[st];q===void 0&&(q={},p[st]=q);let Q=q[ft];Q===void 0&&(Q=C.clone(),q[ft]=Q,P.addEventListener("dispose",G)),C=Q}if(C.visible=P.visible,C.wireframe=P.wireframe,D===Ra?C.side=P.shadowSide!==null?P.shadowSide:P.side:C.side=P.shadowSide!==null?P.shadowSide:g[P.side],C.alphaMap=P.alphaMap,C.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,C.map=P.map,C.clipShadows=P.clipShadows,C.clippingPlanes=P.clippingPlanes,C.clipIntersection=P.clipIntersection,C.displacementMap=P.displacementMap,C.displacementScale=P.displacementScale,C.displacementBias=P.displacementBias,C.wireframeLinewidth=P.wireframeLinewidth,C.linewidth=P.linewidth,V.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const st=s.properties.get(C);st.light=V}return C}function w(B,P,V,D,C){if(B.visible===!1)return;if(B.layers.test(P.layers)&&(B.isMesh||B.isLine||B.isPoints)&&(B.castShadow||B.receiveShadow&&C===Ra)&&(!B.frustumCulled||r.intersectsObject(B))){B.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,B.matrixWorld);const ft=e.update(B),q=B.material;if(Array.isArray(q)){const Q=ft.groups;for(let F=0,nt=Q.length;F<nt;F++){const Z=Q[F],xt=q[Z.materialIndex];if(xt&&xt.visible){const vt=N(B,xt,D,C);B.onBeforeShadow(s,B,P,V,ft,vt,Z),s.renderBufferDirect(V,null,ft,vt,B,Z),B.onAfterShadow(s,B,P,V,ft,vt,Z)}}}else if(q.visible){const Q=N(B,q,D,C);B.onBeforeShadow(s,B,P,V,ft,Q,null),s.renderBufferDirect(V,null,ft,Q,B,null),B.onAfterShadow(s,B,P,V,ft,Q,null)}}const st=B.children;for(let ft=0,q=st.length;ft<q;ft++)w(st[ft],P,V,D,C)}function G(B){B.target.removeEventListener("dispose",G);for(const V in p){const D=p[V],C=B.target.uuid;C in D&&(D[C].dispose(),delete D[C])}}}const sA={[Af]:Rf,[Cf]:Uf,[wf]:Nf,[Us]:Df,[Rf]:Af,[Uf]:Cf,[Nf]:wf,[Df]:Us};function oA(s,e){function i(){let X=!1;const zt=new pn;let Vt=null;const Mt=new pn(0,0,0,0);return{setMask:function(Lt){Vt!==Lt&&!X&&(s.colorMask(Lt,Lt,Lt,Lt),Vt=Lt)},setLocked:function(Lt){X=Lt},setClear:function(Lt,bt,ne,me,Me){Me===!0&&(Lt*=me,bt*=me,ne*=me),zt.set(Lt,bt,ne,me),Mt.equals(zt)===!1&&(s.clearColor(Lt,bt,ne,me),Mt.copy(zt))},reset:function(){X=!1,Vt=null,Mt.set(-1,0,0,0)}}}function r(){let X=!1,zt=!1,Vt=null,Mt=null,Lt=null;return{setReversed:function(bt){if(zt!==bt){const ne=e.get("EXT_clip_control");bt?ne.clipControlEXT(ne.LOWER_LEFT_EXT,ne.ZERO_TO_ONE_EXT):ne.clipControlEXT(ne.LOWER_LEFT_EXT,ne.NEGATIVE_ONE_TO_ONE_EXT),zt=bt;const me=Lt;Lt=null,this.setClear(me)}},getReversed:function(){return zt},setTest:function(bt){bt?rt(s.DEPTH_TEST):Rt(s.DEPTH_TEST)},setMask:function(bt){Vt!==bt&&!X&&(s.depthMask(bt),Vt=bt)},setFunc:function(bt){if(zt&&(bt=sA[bt]),Mt!==bt){switch(bt){case Af:s.depthFunc(s.NEVER);break;case Rf:s.depthFunc(s.ALWAYS);break;case Cf:s.depthFunc(s.LESS);break;case Us:s.depthFunc(s.LEQUAL);break;case wf:s.depthFunc(s.EQUAL);break;case Df:s.depthFunc(s.GEQUAL);break;case Uf:s.depthFunc(s.GREATER);break;case Nf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Mt=bt}},setLocked:function(bt){X=bt},setClear:function(bt){Lt!==bt&&(zt&&(bt=1-bt),s.clearDepth(bt),Lt=bt)},reset:function(){X=!1,Vt=null,Mt=null,Lt=null,zt=!1}}}function l(){let X=!1,zt=null,Vt=null,Mt=null,Lt=null,bt=null,ne=null,me=null,Me=null;return{setTest:function(de){X||(de?rt(s.STENCIL_TEST):Rt(s.STENCIL_TEST))},setMask:function(de){zt!==de&&!X&&(s.stencilMask(de),zt=de)},setFunc:function(de,Pe,cn){(Vt!==de||Mt!==Pe||Lt!==cn)&&(s.stencilFunc(de,Pe,cn),Vt=de,Mt=Pe,Lt=cn)},setOp:function(de,Pe,cn){(bt!==de||ne!==Pe||me!==cn)&&(s.stencilOp(de,Pe,cn),bt=de,ne=Pe,me=cn)},setLocked:function(de){X=de},setClear:function(de){Me!==de&&(s.clearStencil(de),Me=de)},reset:function(){X=!1,zt=null,Vt=null,Mt=null,Lt=null,bt=null,ne=null,me=null,Me=null}}}const c=new i,h=new r,d=new l,m=new WeakMap,p=new WeakMap;let v={},g={},y=new WeakMap,x=[],E=null,A=!1,M=null,S=null,L=null,N=null,w=null,G=null,B=null,P=new Re(0,0,0),V=0,D=!1,C=null,H=null,st=null,ft=null,q=null;const Q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,nt=0;const Z=s.getParameter(s.VERSION);Z.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(Z)[1]),F=nt>=1):Z.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),F=nt>=2);let xt=null,vt={};const Nt=s.getParameter(s.SCISSOR_BOX),Qt=s.getParameter(s.VIEWPORT),ae=new pn().fromArray(Nt),I=new pn().fromArray(Qt);function lt(X,zt,Vt,Mt){const Lt=new Uint8Array(4),bt=s.createTexture();s.bindTexture(X,bt),s.texParameteri(X,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(X,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ne=0;ne<Vt;ne++)X===s.TEXTURE_3D||X===s.TEXTURE_2D_ARRAY?s.texImage3D(zt,0,s.RGBA,1,1,Mt,0,s.RGBA,s.UNSIGNED_BYTE,Lt):s.texImage2D(zt+ne,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Lt);return bt}const $={};$[s.TEXTURE_2D]=lt(s.TEXTURE_2D,s.TEXTURE_2D,1),$[s.TEXTURE_CUBE_MAP]=lt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[s.TEXTURE_2D_ARRAY]=lt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),$[s.TEXTURE_3D]=lt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),d.setClear(0),rt(s.DEPTH_TEST),h.setFunc(Us),gt(!1),pt(Jm),rt(s.CULL_FACE),wt(ar);function rt(X){v[X]!==!0&&(s.enable(X),v[X]=!0)}function Rt(X){v[X]!==!1&&(s.disable(X),v[X]=!1)}function Dt(X,zt){return g[X]!==zt?(s.bindFramebuffer(X,zt),g[X]=zt,X===s.DRAW_FRAMEBUFFER&&(g[s.FRAMEBUFFER]=zt),X===s.FRAMEBUFFER&&(g[s.DRAW_FRAMEBUFFER]=zt),!0):!1}function Ct(X,zt){let Vt=x,Mt=!1;if(X){Vt=y.get(zt),Vt===void 0&&(Vt=[],y.set(zt,Vt));const Lt=X.textures;if(Vt.length!==Lt.length||Vt[0]!==s.COLOR_ATTACHMENT0){for(let bt=0,ne=Lt.length;bt<ne;bt++)Vt[bt]=s.COLOR_ATTACHMENT0+bt;Vt.length=Lt.length,Mt=!0}}else Vt[0]!==s.BACK&&(Vt[0]=s.BACK,Mt=!0);Mt&&s.drawBuffers(Vt)}function Ut(X){return E!==X?(s.useProgram(X),E=X,!0):!1}const Ht={[kr]:s.FUNC_ADD,[gx]:s.FUNC_SUBTRACT,[vx]:s.FUNC_REVERSE_SUBTRACT};Ht[_x]=s.MIN,Ht[yx]=s.MAX;const z={[Sx]:s.ZERO,[xx]:s.ONE,[Mx]:s.SRC_COLOR,[Tf]:s.SRC_ALPHA,[Cx]:s.SRC_ALPHA_SATURATE,[Ax]:s.DST_COLOR,[Tx]:s.DST_ALPHA,[Ex]:s.ONE_MINUS_SRC_COLOR,[bf]:s.ONE_MINUS_SRC_ALPHA,[Rx]:s.ONE_MINUS_DST_COLOR,[bx]:s.ONE_MINUS_DST_ALPHA,[wx]:s.CONSTANT_COLOR,[Dx]:s.ONE_MINUS_CONSTANT_COLOR,[Ux]:s.CONSTANT_ALPHA,[Nx]:s.ONE_MINUS_CONSTANT_ALPHA};function wt(X,zt,Vt,Mt,Lt,bt,ne,me,Me,de){if(X===ar){A===!0&&(Rt(s.BLEND),A=!1);return}if(A===!1&&(rt(s.BLEND),A=!0),X!==mx){if(X!==M||de!==D){if((S!==kr||w!==kr)&&(s.blendEquation(s.FUNC_ADD),S=kr,w=kr),de)switch(X){case Ds:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case tg:s.blendFunc(s.ONE,s.ONE);break;case eg:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ng:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case Ds:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case tg:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case eg:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ng:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}L=null,N=null,G=null,B=null,P.set(0,0,0),V=0,M=X,D=de}return}Lt=Lt||zt,bt=bt||Vt,ne=ne||Mt,(zt!==S||Lt!==w)&&(s.blendEquationSeparate(Ht[zt],Ht[Lt]),S=zt,w=Lt),(Vt!==L||Mt!==N||bt!==G||ne!==B)&&(s.blendFuncSeparate(z[Vt],z[Mt],z[bt],z[ne]),L=Vt,N=Mt,G=bt,B=ne),(me.equals(P)===!1||Me!==V)&&(s.blendColor(me.r,me.g,me.b,Me),P.copy(me),V=Me),M=X,D=!1}function yt(X,zt){X.side===qi?Rt(s.CULL_FACE):rt(s.CULL_FACE);let Vt=X.side===li;zt&&(Vt=!Vt),gt(Vt),X.blending===Ds&&X.transparent===!1?wt(ar):wt(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),h.setFunc(X.depthFunc),h.setTest(X.depthTest),h.setMask(X.depthWrite),c.setMask(X.colorWrite);const Mt=X.stencilWrite;d.setTest(Mt),Mt&&(d.setMask(X.stencilWriteMask),d.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),d.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),At(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?rt(s.SAMPLE_ALPHA_TO_COVERAGE):Rt(s.SAMPLE_ALPHA_TO_COVERAGE)}function gt(X){C!==X&&(X?s.frontFace(s.CW):s.frontFace(s.CCW),C=X)}function pt(X){X!==hx?(rt(s.CULL_FACE),X!==H&&(X===Jm?s.cullFace(s.BACK):X===dx?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Rt(s.CULL_FACE),H=X}function Tt(X){X!==st&&(F&&s.lineWidth(X),st=X)}function At(X,zt,Vt){X?(rt(s.POLYGON_OFFSET_FILL),(ft!==zt||q!==Vt)&&(s.polygonOffset(zt,Vt),ft=zt,q=Vt)):Rt(s.POLYGON_OFFSET_FILL)}function Bt(X){X?rt(s.SCISSOR_TEST):Rt(s.SCISSOR_TEST)}function fe(X){X===void 0&&(X=s.TEXTURE0+Q-1),xt!==X&&(s.activeTexture(X),xt=X)}function ce(X,zt,Vt){Vt===void 0&&(xt===null?Vt=s.TEXTURE0+Q-1:Vt=xt);let Mt=vt[Vt];Mt===void 0&&(Mt={type:void 0,texture:void 0},vt[Vt]=Mt),(Mt.type!==X||Mt.texture!==zt)&&(xt!==Vt&&(s.activeTexture(Vt),xt=Vt),s.bindTexture(X,zt||$[X]),Mt.type=X,Mt.texture=zt)}function U(){const X=vt[xt];X!==void 0&&X.type!==void 0&&(s.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function T(){try{s.compressedTexImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function et(){try{s.compressedTexImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function dt(){try{s.texSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Et(){try{s.texSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function mt(){try{s.compressedTexSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Zt(){try{s.compressedTexSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function It(){try{s.texStorage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ee(){try{s.texStorage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function $t(){try{s.texImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ot(){try{s.texImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Xt(X){ae.equals(X)===!1&&(s.scissor(X.x,X.y,X.z,X.w),ae.copy(X))}function se(X){I.equals(X)===!1&&(s.viewport(X.x,X.y,X.z,X.w),I.copy(X))}function ie(X,zt){let Vt=p.get(zt);Vt===void 0&&(Vt=new WeakMap,p.set(zt,Vt));let Mt=Vt.get(X);Mt===void 0&&(Mt=s.getUniformBlockIndex(zt,X.name),Vt.set(X,Mt))}function Yt(X,zt){const Mt=p.get(zt).get(X);m.get(zt)!==Mt&&(s.uniformBlockBinding(zt,Mt,X.__bindingPointIndex),m.set(zt,Mt))}function ge(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),h.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),v={},xt=null,vt={},g={},y=new WeakMap,x=[],E=null,A=!1,M=null,S=null,L=null,N=null,w=null,G=null,B=null,P=new Re(0,0,0),V=0,D=!1,C=null,H=null,st=null,ft=null,q=null,ae.set(0,0,s.canvas.width,s.canvas.height),I.set(0,0,s.canvas.width,s.canvas.height),c.reset(),h.reset(),d.reset()}return{buffers:{color:c,depth:h,stencil:d},enable:rt,disable:Rt,bindFramebuffer:Dt,drawBuffers:Ct,useProgram:Ut,setBlending:wt,setMaterial:yt,setFlipSided:gt,setCullFace:pt,setLineWidth:Tt,setPolygonOffset:At,setScissorTest:Bt,activeTexture:fe,bindTexture:ce,unbindTexture:U,compressedTexImage2D:T,compressedTexImage3D:et,texImage2D:$t,texImage3D:Ot,updateUBOMapping:ie,uniformBlockBinding:Yt,texStorage2D:It,texStorage3D:ee,texSubImage2D:dt,texSubImage3D:Et,compressedTexSubImage2D:mt,compressedTexSubImage3D:Zt,scissor:Xt,viewport:se,reset:ge}}function lA(s,e,i,r,l,c,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new qt,v=new WeakMap;let g;const y=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(U,T){return x?new OffscreenCanvas(U,T):gc("canvas")}function A(U,T,et){let dt=1;const Et=ce(U);if((Et.width>et||Et.height>et)&&(dt=et/Math.max(Et.width,Et.height)),dt<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const mt=Math.floor(dt*Et.width),Zt=Math.floor(dt*Et.height);g===void 0&&(g=E(mt,Zt));const It=T?E(mt,Zt):g;return It.width=mt,It.height=Zt,It.getContext("2d").drawImage(U,0,0,mt,Zt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Et.width+"x"+Et.height+") to ("+mt+"x"+Zt+")."),It}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Et.width+"x"+Et.height+")."),U;return U}function M(U){return U.generateMipmaps}function S(U){s.generateMipmap(U)}function L(U){return U.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?s.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function N(U,T,et,dt,Et=!1){if(U!==null){if(s[U]!==void 0)return s[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let mt=T;if(T===s.RED&&(et===s.FLOAT&&(mt=s.R32F),et===s.HALF_FLOAT&&(mt=s.R16F),et===s.UNSIGNED_BYTE&&(mt=s.R8)),T===s.RED_INTEGER&&(et===s.UNSIGNED_BYTE&&(mt=s.R8UI),et===s.UNSIGNED_SHORT&&(mt=s.R16UI),et===s.UNSIGNED_INT&&(mt=s.R32UI),et===s.BYTE&&(mt=s.R8I),et===s.SHORT&&(mt=s.R16I),et===s.INT&&(mt=s.R32I)),T===s.RG&&(et===s.FLOAT&&(mt=s.RG32F),et===s.HALF_FLOAT&&(mt=s.RG16F),et===s.UNSIGNED_BYTE&&(mt=s.RG8)),T===s.RG_INTEGER&&(et===s.UNSIGNED_BYTE&&(mt=s.RG8UI),et===s.UNSIGNED_SHORT&&(mt=s.RG16UI),et===s.UNSIGNED_INT&&(mt=s.RG32UI),et===s.BYTE&&(mt=s.RG8I),et===s.SHORT&&(mt=s.RG16I),et===s.INT&&(mt=s.RG32I)),T===s.RGB_INTEGER&&(et===s.UNSIGNED_BYTE&&(mt=s.RGB8UI),et===s.UNSIGNED_SHORT&&(mt=s.RGB16UI),et===s.UNSIGNED_INT&&(mt=s.RGB32UI),et===s.BYTE&&(mt=s.RGB8I),et===s.SHORT&&(mt=s.RGB16I),et===s.INT&&(mt=s.RGB32I)),T===s.RGBA_INTEGER&&(et===s.UNSIGNED_BYTE&&(mt=s.RGBA8UI),et===s.UNSIGNED_SHORT&&(mt=s.RGBA16UI),et===s.UNSIGNED_INT&&(mt=s.RGBA32UI),et===s.BYTE&&(mt=s.RGBA8I),et===s.SHORT&&(mt=s.RGBA16I),et===s.INT&&(mt=s.RGBA32I)),T===s.RGB&&(et===s.UNSIGNED_INT_5_9_9_9_REV&&(mt=s.RGB9_E5),et===s.UNSIGNED_INT_10F_11F_11F_REV&&(mt=s.R11F_G11F_B10F)),T===s.RGBA){const Zt=Et?pc:Ge.getTransfer(dt);et===s.FLOAT&&(mt=s.RGBA32F),et===s.HALF_FLOAT&&(mt=s.RGBA16F),et===s.UNSIGNED_BYTE&&(mt=Zt===je?s.SRGB8_ALPHA8:s.RGBA8),et===s.UNSIGNED_SHORT_4_4_4_4&&(mt=s.RGBA4),et===s.UNSIGNED_SHORT_5_5_5_1&&(mt=s.RGB5_A1)}return(mt===s.R16F||mt===s.R32F||mt===s.RG16F||mt===s.RG32F||mt===s.RGBA16F||mt===s.RGBA32F)&&e.get("EXT_color_buffer_float"),mt}function w(U,T){let et;return U?T===null||T===qr||T===Zo?et=s.DEPTH24_STENCIL8:T===wa?et=s.DEPTH32F_STENCIL8:T===Yo&&(et=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===qr||T===Zo?et=s.DEPTH_COMPONENT24:T===wa?et=s.DEPTH_COMPONENT32F:T===Yo&&(et=s.DEPTH_COMPONENT16),et}function G(U,T){return M(U)===!0||U.isFramebufferTexture&&U.minFilter!==yi&&U.minFilter!==Ui?Math.log2(Math.max(T.width,T.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?T.mipmaps.length:1}function B(U){const T=U.target;T.removeEventListener("dispose",B),V(T),T.isVideoTexture&&v.delete(T)}function P(U){const T=U.target;T.removeEventListener("dispose",P),C(T)}function V(U){const T=r.get(U);if(T.__webglInit===void 0)return;const et=U.source,dt=y.get(et);if(dt){const Et=dt[T.__cacheKey];Et.usedTimes--,Et.usedTimes===0&&D(U),Object.keys(dt).length===0&&y.delete(et)}r.remove(U)}function D(U){const T=r.get(U);s.deleteTexture(T.__webglTexture);const et=U.source,dt=y.get(et);delete dt[T.__cacheKey],h.memory.textures--}function C(U){const T=r.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),r.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++){if(Array.isArray(T.__webglFramebuffer[dt]))for(let Et=0;Et<T.__webglFramebuffer[dt].length;Et++)s.deleteFramebuffer(T.__webglFramebuffer[dt][Et]);else s.deleteFramebuffer(T.__webglFramebuffer[dt]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[dt])}else{if(Array.isArray(T.__webglFramebuffer))for(let dt=0;dt<T.__webglFramebuffer.length;dt++)s.deleteFramebuffer(T.__webglFramebuffer[dt]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let dt=0;dt<T.__webglColorRenderbuffer.length;dt++)T.__webglColorRenderbuffer[dt]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[dt]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const et=U.textures;for(let dt=0,Et=et.length;dt<Et;dt++){const mt=r.get(et[dt]);mt.__webglTexture&&(s.deleteTexture(mt.__webglTexture),h.memory.textures--),r.remove(et[dt])}r.remove(U)}let H=0;function st(){H=0}function ft(){const U=H;return U>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+l.maxTextures),H+=1,U}function q(U){const T=[];return T.push(U.wrapS),T.push(U.wrapT),T.push(U.wrapR||0),T.push(U.magFilter),T.push(U.minFilter),T.push(U.anisotropy),T.push(U.internalFormat),T.push(U.format),T.push(U.type),T.push(U.generateMipmaps),T.push(U.premultiplyAlpha),T.push(U.flipY),T.push(U.unpackAlignment),T.push(U.colorSpace),T.join()}function Q(U,T){const et=r.get(U);if(U.isVideoTexture&&Bt(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&et.__version!==U.version){const dt=U.image;if(dt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(et,U,T);return}}else U.isExternalTexture&&(et.__webglTexture=U.sourceTexture?U.sourceTexture:null);i.bindTexture(s.TEXTURE_2D,et.__webglTexture,s.TEXTURE0+T)}function F(U,T){const et=r.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&et.__version!==U.version){$(et,U,T);return}i.bindTexture(s.TEXTURE_2D_ARRAY,et.__webglTexture,s.TEXTURE0+T)}function nt(U,T){const et=r.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&et.__version!==U.version){$(et,U,T);return}i.bindTexture(s.TEXTURE_3D,et.__webglTexture,s.TEXTURE0+T)}function Z(U,T){const et=r.get(U);if(U.version>0&&et.__version!==U.version){rt(et,U,T);return}i.bindTexture(s.TEXTURE_CUBE_MAP,et.__webglTexture,s.TEXTURE0+T)}const xt={[sr]:s.REPEAT,[or]:s.CLAMP_TO_EDGE,[zf]:s.MIRRORED_REPEAT},vt={[yi]:s.NEAREST,[Vx]:s.NEAREST_MIPMAP_NEAREST,[cc]:s.NEAREST_MIPMAP_LINEAR,[Ui]:s.LINEAR,[Pf]:s.LINEAR_MIPMAP_NEAREST,[Ca]:s.LINEAR_MIPMAP_LINEAR},Nt={[qx]:s.NEVER,[Qx]:s.ALWAYS,[Yx]:s.LESS,[gg]:s.LEQUAL,[Wx]:s.EQUAL,[jx]:s.GEQUAL,[Zx]:s.GREATER,[Kx]:s.NOTEQUAL};function Qt(U,T){if(T.type===wa&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Ui||T.magFilter===Pf||T.magFilter===cc||T.magFilter===Ca||T.minFilter===Ui||T.minFilter===Pf||T.minFilter===cc||T.minFilter===Ca)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(U,s.TEXTURE_WRAP_S,xt[T.wrapS]),s.texParameteri(U,s.TEXTURE_WRAP_T,xt[T.wrapT]),(U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY)&&s.texParameteri(U,s.TEXTURE_WRAP_R,xt[T.wrapR]),s.texParameteri(U,s.TEXTURE_MAG_FILTER,vt[T.magFilter]),s.texParameteri(U,s.TEXTURE_MIN_FILTER,vt[T.minFilter]),T.compareFunction&&(s.texParameteri(U,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(U,s.TEXTURE_COMPARE_FUNC,Nt[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===yi||T.minFilter!==cc&&T.minFilter!==Ca||T.type===wa&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||r.get(T).__currentAnisotropy){const et=e.get("EXT_texture_filter_anisotropic");s.texParameterf(U,et.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),r.get(T).__currentAnisotropy=T.anisotropy}}}function ae(U,T){let et=!1;U.__webglInit===void 0&&(U.__webglInit=!0,T.addEventListener("dispose",B));const dt=T.source;let Et=y.get(dt);Et===void 0&&(Et={},y.set(dt,Et));const mt=q(T);if(mt!==U.__cacheKey){Et[mt]===void 0&&(Et[mt]={texture:s.createTexture(),usedTimes:0},h.memory.textures++,et=!0),Et[mt].usedTimes++;const Zt=Et[U.__cacheKey];Zt!==void 0&&(Et[U.__cacheKey].usedTimes--,Zt.usedTimes===0&&D(T)),U.__cacheKey=mt,U.__webglTexture=Et[mt].texture}return et}function I(U,T,et){return Math.floor(Math.floor(U/et)/T)}function lt(U,T,et,dt){const mt=U.updateRanges;if(mt.length===0)i.texSubImage2D(s.TEXTURE_2D,0,0,0,T.width,T.height,et,dt,T.data);else{mt.sort((Ot,Xt)=>Ot.start-Xt.start);let Zt=0;for(let Ot=1;Ot<mt.length;Ot++){const Xt=mt[Zt],se=mt[Ot],ie=Xt.start+Xt.count,Yt=I(se.start,T.width,4),ge=I(Xt.start,T.width,4);se.start<=ie+1&&Yt===ge&&I(se.start+se.count-1,T.width,4)===Yt?Xt.count=Math.max(Xt.count,se.start+se.count-Xt.start):(++Zt,mt[Zt]=se)}mt.length=Zt+1;const It=s.getParameter(s.UNPACK_ROW_LENGTH),ee=s.getParameter(s.UNPACK_SKIP_PIXELS),$t=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,T.width);for(let Ot=0,Xt=mt.length;Ot<Xt;Ot++){const se=mt[Ot],ie=Math.floor(se.start/4),Yt=Math.ceil(se.count/4),ge=ie%T.width,X=Math.floor(ie/T.width),zt=Yt,Vt=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,ge),s.pixelStorei(s.UNPACK_SKIP_ROWS,X),i.texSubImage2D(s.TEXTURE_2D,0,ge,X,zt,Vt,et,dt,T.data)}U.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,It),s.pixelStorei(s.UNPACK_SKIP_PIXELS,ee),s.pixelStorei(s.UNPACK_SKIP_ROWS,$t)}}function $(U,T,et){let dt=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(dt=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(dt=s.TEXTURE_3D);const Et=ae(U,T),mt=T.source;i.bindTexture(dt,U.__webglTexture,s.TEXTURE0+et);const Zt=r.get(mt);if(mt.version!==Zt.__version||Et===!0){i.activeTexture(s.TEXTURE0+et);const It=Ge.getPrimaries(Ge.workingColorSpace),ee=T.colorSpace===lr?null:Ge.getPrimaries(T.colorSpace),$t=T.colorSpace===lr||It===ee?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let Ot=A(T.image,!1,l.maxTextureSize);Ot=fe(T,Ot);const Xt=c.convert(T.format,T.colorSpace),se=c.convert(T.type);let ie=N(T.internalFormat,Xt,se,T.colorSpace,T.isVideoTexture);Qt(dt,T);let Yt;const ge=T.mipmaps,X=T.isVideoTexture!==!0,zt=Zt.__version===void 0||Et===!0,Vt=mt.dataReady,Mt=G(T,Ot);if(T.isDepthTexture)ie=w(T.format===jo,T.type),zt&&(X?i.texStorage2D(s.TEXTURE_2D,1,ie,Ot.width,Ot.height):i.texImage2D(s.TEXTURE_2D,0,ie,Ot.width,Ot.height,0,Xt,se,null));else if(T.isDataTexture)if(ge.length>0){X&&zt&&i.texStorage2D(s.TEXTURE_2D,Mt,ie,ge[0].width,ge[0].height);for(let Lt=0,bt=ge.length;Lt<bt;Lt++)Yt=ge[Lt],X?Vt&&i.texSubImage2D(s.TEXTURE_2D,Lt,0,0,Yt.width,Yt.height,Xt,se,Yt.data):i.texImage2D(s.TEXTURE_2D,Lt,ie,Yt.width,Yt.height,0,Xt,se,Yt.data);T.generateMipmaps=!1}else X?(zt&&i.texStorage2D(s.TEXTURE_2D,Mt,ie,Ot.width,Ot.height),Vt&&lt(T,Ot,Xt,se)):i.texImage2D(s.TEXTURE_2D,0,ie,Ot.width,Ot.height,0,Xt,se,Ot.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){X&&zt&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Mt,ie,ge[0].width,ge[0].height,Ot.depth);for(let Lt=0,bt=ge.length;Lt<bt;Lt++)if(Yt=ge[Lt],T.format!==Yi)if(Xt!==null)if(X){if(Vt)if(T.layerUpdates.size>0){const ne=p0(Yt.width,Yt.height,T.format,T.type);for(const me of T.layerUpdates){const Me=Yt.data.subarray(me*ne/Yt.data.BYTES_PER_ELEMENT,(me+1)*ne/Yt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Lt,0,0,me,Yt.width,Yt.height,1,Xt,Me)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Lt,0,0,0,Yt.width,Yt.height,Ot.depth,Xt,Yt.data)}else i.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Lt,ie,Yt.width,Yt.height,Ot.depth,0,Yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else X?Vt&&i.texSubImage3D(s.TEXTURE_2D_ARRAY,Lt,0,0,0,Yt.width,Yt.height,Ot.depth,Xt,se,Yt.data):i.texImage3D(s.TEXTURE_2D_ARRAY,Lt,ie,Yt.width,Yt.height,Ot.depth,0,Xt,se,Yt.data)}else{X&&zt&&i.texStorage2D(s.TEXTURE_2D,Mt,ie,ge[0].width,ge[0].height);for(let Lt=0,bt=ge.length;Lt<bt;Lt++)Yt=ge[Lt],T.format!==Yi?Xt!==null?X?Vt&&i.compressedTexSubImage2D(s.TEXTURE_2D,Lt,0,0,Yt.width,Yt.height,Xt,Yt.data):i.compressedTexImage2D(s.TEXTURE_2D,Lt,ie,Yt.width,Yt.height,0,Yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):X?Vt&&i.texSubImage2D(s.TEXTURE_2D,Lt,0,0,Yt.width,Yt.height,Xt,se,Yt.data):i.texImage2D(s.TEXTURE_2D,Lt,ie,Yt.width,Yt.height,0,Xt,se,Yt.data)}else if(T.isDataArrayTexture)if(X){if(zt&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Mt,ie,Ot.width,Ot.height,Ot.depth),Vt)if(T.layerUpdates.size>0){const Lt=p0(Ot.width,Ot.height,T.format,T.type);for(const bt of T.layerUpdates){const ne=Ot.data.subarray(bt*Lt/Ot.data.BYTES_PER_ELEMENT,(bt+1)*Lt/Ot.data.BYTES_PER_ELEMENT);i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,bt,Ot.width,Ot.height,1,Xt,se,ne)}T.clearLayerUpdates()}else i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Ot.width,Ot.height,Ot.depth,Xt,se,Ot.data)}else i.texImage3D(s.TEXTURE_2D_ARRAY,0,ie,Ot.width,Ot.height,Ot.depth,0,Xt,se,Ot.data);else if(T.isData3DTexture)X?(zt&&i.texStorage3D(s.TEXTURE_3D,Mt,ie,Ot.width,Ot.height,Ot.depth),Vt&&i.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Ot.width,Ot.height,Ot.depth,Xt,se,Ot.data)):i.texImage3D(s.TEXTURE_3D,0,ie,Ot.width,Ot.height,Ot.depth,0,Xt,se,Ot.data);else if(T.isFramebufferTexture){if(zt)if(X)i.texStorage2D(s.TEXTURE_2D,Mt,ie,Ot.width,Ot.height);else{let Lt=Ot.width,bt=Ot.height;for(let ne=0;ne<Mt;ne++)i.texImage2D(s.TEXTURE_2D,ne,ie,Lt,bt,0,Xt,se,null),Lt>>=1,bt>>=1}}else if(ge.length>0){if(X&&zt){const Lt=ce(ge[0]);i.texStorage2D(s.TEXTURE_2D,Mt,ie,Lt.width,Lt.height)}for(let Lt=0,bt=ge.length;Lt<bt;Lt++)Yt=ge[Lt],X?Vt&&i.texSubImage2D(s.TEXTURE_2D,Lt,0,0,Xt,se,Yt):i.texImage2D(s.TEXTURE_2D,Lt,ie,Xt,se,Yt);T.generateMipmaps=!1}else if(X){if(zt){const Lt=ce(Ot);i.texStorage2D(s.TEXTURE_2D,Mt,ie,Lt.width,Lt.height)}Vt&&i.texSubImage2D(s.TEXTURE_2D,0,0,0,Xt,se,Ot)}else i.texImage2D(s.TEXTURE_2D,0,ie,Xt,se,Ot);M(T)&&S(dt),Zt.__version=mt.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function rt(U,T,et){if(T.image.length!==6)return;const dt=ae(U,T),Et=T.source;i.bindTexture(s.TEXTURE_CUBE_MAP,U.__webglTexture,s.TEXTURE0+et);const mt=r.get(Et);if(Et.version!==mt.__version||dt===!0){i.activeTexture(s.TEXTURE0+et);const Zt=Ge.getPrimaries(Ge.workingColorSpace),It=T.colorSpace===lr?null:Ge.getPrimaries(T.colorSpace),ee=T.colorSpace===lr||Zt===It?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);const $t=T.isCompressedTexture||T.image[0].isCompressedTexture,Ot=T.image[0]&&T.image[0].isDataTexture,Xt=[];for(let bt=0;bt<6;bt++)!$t&&!Ot?Xt[bt]=A(T.image[bt],!0,l.maxCubemapSize):Xt[bt]=Ot?T.image[bt].image:T.image[bt],Xt[bt]=fe(T,Xt[bt]);const se=Xt[0],ie=c.convert(T.format,T.colorSpace),Yt=c.convert(T.type),ge=N(T.internalFormat,ie,Yt,T.colorSpace),X=T.isVideoTexture!==!0,zt=mt.__version===void 0||dt===!0,Vt=Et.dataReady;let Mt=G(T,se);Qt(s.TEXTURE_CUBE_MAP,T);let Lt;if($t){X&&zt&&i.texStorage2D(s.TEXTURE_CUBE_MAP,Mt,ge,se.width,se.height);for(let bt=0;bt<6;bt++){Lt=Xt[bt].mipmaps;for(let ne=0;ne<Lt.length;ne++){const me=Lt[ne];T.format!==Yi?ie!==null?X?Vt&&i.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ne,0,0,me.width,me.height,ie,me.data):i.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ne,ge,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?Vt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ne,0,0,me.width,me.height,ie,Yt,me.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ne,ge,me.width,me.height,0,ie,Yt,me.data)}}}else{if(Lt=T.mipmaps,X&&zt){Lt.length>0&&Mt++;const bt=ce(Xt[0]);i.texStorage2D(s.TEXTURE_CUBE_MAP,Mt,ge,bt.width,bt.height)}for(let bt=0;bt<6;bt++)if(Ot){X?Vt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,Xt[bt].width,Xt[bt].height,ie,Yt,Xt[bt].data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,ge,Xt[bt].width,Xt[bt].height,0,ie,Yt,Xt[bt].data);for(let ne=0;ne<Lt.length;ne++){const Me=Lt[ne].image[bt].image;X?Vt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ne+1,0,0,Me.width,Me.height,ie,Yt,Me.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ne+1,ge,Me.width,Me.height,0,ie,Yt,Me.data)}}else{X?Vt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,ie,Yt,Xt[bt]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,ge,ie,Yt,Xt[bt]);for(let ne=0;ne<Lt.length;ne++){const me=Lt[ne];X?Vt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ne+1,0,0,ie,Yt,me.image[bt]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ne+1,ge,ie,Yt,me.image[bt])}}}M(T)&&S(s.TEXTURE_CUBE_MAP),mt.__version=Et.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function Rt(U,T,et,dt,Et,mt){const Zt=c.convert(et.format,et.colorSpace),It=c.convert(et.type),ee=N(et.internalFormat,Zt,It,et.colorSpace),$t=r.get(T),Ot=r.get(et);if(Ot.__renderTarget=T,!$t.__hasExternalTextures){const Xt=Math.max(1,T.width>>mt),se=Math.max(1,T.height>>mt);Et===s.TEXTURE_3D||Et===s.TEXTURE_2D_ARRAY?i.texImage3D(Et,mt,ee,Xt,se,T.depth,0,Zt,It,null):i.texImage2D(Et,mt,ee,Xt,se,0,Zt,It,null)}i.bindFramebuffer(s.FRAMEBUFFER,U),At(T)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,dt,Et,Ot.__webglTexture,0,Tt(T)):(Et===s.TEXTURE_2D||Et>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Et<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,dt,Et,Ot.__webglTexture,mt),i.bindFramebuffer(s.FRAMEBUFFER,null)}function Dt(U,T,et){if(s.bindRenderbuffer(s.RENDERBUFFER,U),T.depthBuffer){const dt=T.depthTexture,Et=dt&&dt.isDepthTexture?dt.type:null,mt=w(T.stencilBuffer,Et),Zt=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,It=Tt(T);At(T)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,It,mt,T.width,T.height):et?s.renderbufferStorageMultisample(s.RENDERBUFFER,It,mt,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,mt,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Zt,s.RENDERBUFFER,U)}else{const dt=T.textures;for(let Et=0;Et<dt.length;Et++){const mt=dt[Et],Zt=c.convert(mt.format,mt.colorSpace),It=c.convert(mt.type),ee=N(mt.internalFormat,Zt,It,mt.colorSpace),$t=Tt(T);et&&At(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,$t,ee,T.width,T.height):At(T)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,$t,ee,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,ee,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ct(U,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(s.FRAMEBUFFER,U),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const dt=r.get(T.depthTexture);dt.__renderTarget=T,(!dt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),Q(T.depthTexture,0);const Et=dt.__webglTexture,mt=Tt(T);if(T.depthTexture.format===Ko)At(T)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Et,0,mt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Et,0);else if(T.depthTexture.format===jo)At(T)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Et,0,mt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Et,0);else throw new Error("Unknown depthTexture format")}function Ut(U){const T=r.get(U),et=U.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==U.depthTexture){const dt=U.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),dt){const Et=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,dt.removeEventListener("dispose",Et)};dt.addEventListener("dispose",Et),T.__depthDisposeCallback=Et}T.__boundDepthTexture=dt}if(U.depthTexture&&!T.__autoAllocateDepthBuffer){if(et)throw new Error("target.depthTexture not supported in Cube render targets");const dt=U.texture.mipmaps;dt&&dt.length>0?Ct(T.__webglFramebuffer[0],U):Ct(T.__webglFramebuffer,U)}else if(et){T.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(i.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[dt]),T.__webglDepthbuffer[dt]===void 0)T.__webglDepthbuffer[dt]=s.createRenderbuffer(),Dt(T.__webglDepthbuffer[dt],U,!1);else{const Et=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=T.__webglDepthbuffer[dt];s.bindRenderbuffer(s.RENDERBUFFER,mt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,mt)}}else{const dt=U.texture.mipmaps;if(dt&&dt.length>0?i.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[0]):i.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=s.createRenderbuffer(),Dt(T.__webglDepthbuffer,U,!1);else{const Et=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=T.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,mt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,mt)}}i.bindFramebuffer(s.FRAMEBUFFER,null)}function Ht(U,T,et){const dt=r.get(U);T!==void 0&&Rt(dt.__webglFramebuffer,U,U.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),et!==void 0&&Ut(U)}function z(U){const T=U.texture,et=r.get(U),dt=r.get(T);U.addEventListener("dispose",P);const Et=U.textures,mt=U.isWebGLCubeRenderTarget===!0,Zt=Et.length>1;if(Zt||(dt.__webglTexture===void 0&&(dt.__webglTexture=s.createTexture()),dt.__version=T.version,h.memory.textures++),mt){et.__webglFramebuffer=[];for(let It=0;It<6;It++)if(T.mipmaps&&T.mipmaps.length>0){et.__webglFramebuffer[It]=[];for(let ee=0;ee<T.mipmaps.length;ee++)et.__webglFramebuffer[It][ee]=s.createFramebuffer()}else et.__webglFramebuffer[It]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){et.__webglFramebuffer=[];for(let It=0;It<T.mipmaps.length;It++)et.__webglFramebuffer[It]=s.createFramebuffer()}else et.__webglFramebuffer=s.createFramebuffer();if(Zt)for(let It=0,ee=Et.length;It<ee;It++){const $t=r.get(Et[It]);$t.__webglTexture===void 0&&($t.__webglTexture=s.createTexture(),h.memory.textures++)}if(U.samples>0&&At(U)===!1){et.__webglMultisampledFramebuffer=s.createFramebuffer(),et.__webglColorRenderbuffer=[],i.bindFramebuffer(s.FRAMEBUFFER,et.__webglMultisampledFramebuffer);for(let It=0;It<Et.length;It++){const ee=Et[It];et.__webglColorRenderbuffer[It]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,et.__webglColorRenderbuffer[It]);const $t=c.convert(ee.format,ee.colorSpace),Ot=c.convert(ee.type),Xt=N(ee.internalFormat,$t,Ot,ee.colorSpace,U.isXRRenderTarget===!0),se=Tt(U);s.renderbufferStorageMultisample(s.RENDERBUFFER,se,Xt,U.width,U.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+It,s.RENDERBUFFER,et.__webglColorRenderbuffer[It])}s.bindRenderbuffer(s.RENDERBUFFER,null),U.depthBuffer&&(et.__webglDepthRenderbuffer=s.createRenderbuffer(),Dt(et.__webglDepthRenderbuffer,U,!0)),i.bindFramebuffer(s.FRAMEBUFFER,null)}}if(mt){i.bindTexture(s.TEXTURE_CUBE_MAP,dt.__webglTexture),Qt(s.TEXTURE_CUBE_MAP,T);for(let It=0;It<6;It++)if(T.mipmaps&&T.mipmaps.length>0)for(let ee=0;ee<T.mipmaps.length;ee++)Rt(et.__webglFramebuffer[It][ee],U,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+It,ee);else Rt(et.__webglFramebuffer[It],U,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+It,0);M(T)&&S(s.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Zt){for(let It=0,ee=Et.length;It<ee;It++){const $t=Et[It],Ot=r.get($t);let Xt=s.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Xt=U.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(Xt,Ot.__webglTexture),Qt(Xt,$t),Rt(et.__webglFramebuffer,U,$t,s.COLOR_ATTACHMENT0+It,Xt,0),M($t)&&S(Xt)}i.unbindTexture()}else{let It=s.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(It=U.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(It,dt.__webglTexture),Qt(It,T),T.mipmaps&&T.mipmaps.length>0)for(let ee=0;ee<T.mipmaps.length;ee++)Rt(et.__webglFramebuffer[ee],U,T,s.COLOR_ATTACHMENT0,It,ee);else Rt(et.__webglFramebuffer,U,T,s.COLOR_ATTACHMENT0,It,0);M(T)&&S(It),i.unbindTexture()}U.depthBuffer&&Ut(U)}function wt(U){const T=U.textures;for(let et=0,dt=T.length;et<dt;et++){const Et=T[et];if(M(Et)){const mt=L(U),Zt=r.get(Et).__webglTexture;i.bindTexture(mt,Zt),S(mt),i.unbindTexture()}}}const yt=[],gt=[];function pt(U){if(U.samples>0){if(At(U)===!1){const T=U.textures,et=U.width,dt=U.height;let Et=s.COLOR_BUFFER_BIT;const mt=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Zt=r.get(U),It=T.length>1;if(It)for(let $t=0;$t<T.length;$t++)i.bindFramebuffer(s.FRAMEBUFFER,Zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+$t,s.RENDERBUFFER,null),i.bindFramebuffer(s.FRAMEBUFFER,Zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+$t,s.TEXTURE_2D,null,0);i.bindFramebuffer(s.READ_FRAMEBUFFER,Zt.__webglMultisampledFramebuffer);const ee=U.texture.mipmaps;ee&&ee.length>0?i.bindFramebuffer(s.DRAW_FRAMEBUFFER,Zt.__webglFramebuffer[0]):i.bindFramebuffer(s.DRAW_FRAMEBUFFER,Zt.__webglFramebuffer);for(let $t=0;$t<T.length;$t++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(Et|=s.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(Et|=s.STENCIL_BUFFER_BIT)),It){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Zt.__webglColorRenderbuffer[$t]);const Ot=r.get(T[$t]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ot,0)}s.blitFramebuffer(0,0,et,dt,0,0,et,dt,Et,s.NEAREST),m===!0&&(yt.length=0,gt.length=0,yt.push(s.COLOR_ATTACHMENT0+$t),U.depthBuffer&&U.resolveDepthBuffer===!1&&(yt.push(mt),gt.push(mt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,gt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,yt))}if(i.bindFramebuffer(s.READ_FRAMEBUFFER,null),i.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),It)for(let $t=0;$t<T.length;$t++){i.bindFramebuffer(s.FRAMEBUFFER,Zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+$t,s.RENDERBUFFER,Zt.__webglColorRenderbuffer[$t]);const Ot=r.get(T[$t]).__webglTexture;i.bindFramebuffer(s.FRAMEBUFFER,Zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+$t,s.TEXTURE_2D,Ot,0)}i.bindFramebuffer(s.DRAW_FRAMEBUFFER,Zt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&m){const T=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[T])}}}function Tt(U){return Math.min(l.maxSamples,U.samples)}function At(U){const T=r.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Bt(U){const T=h.render.frame;v.get(U)!==T&&(v.set(U,T),U.update())}function fe(U,T){const et=U.colorSpace,dt=U.format,Et=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||et!==Os&&et!==lr&&(Ge.getTransfer(et)===je?(dt!==Yi||Et!==ua)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",et)),T}function ce(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(p.width=U.naturalWidth||U.width,p.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(p.width=U.displayWidth,p.height=U.displayHeight):(p.width=U.width,p.height=U.height),p}this.allocateTextureUnit=ft,this.resetTextureUnits=st,this.setTexture2D=Q,this.setTexture2DArray=F,this.setTexture3D=nt,this.setTextureCube=Z,this.rebindTextures=Ht,this.setupRenderTarget=z,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=pt,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=Rt,this.useMultisampledRTT=At}function cA(s,e){function i(r,l=lr){let c;const h=Ge.getTransfer(l);if(r===ua)return s.UNSIGNED_BYTE;if(r===Bf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Ff)return s.UNSIGNED_SHORT_5_5_5_1;if(r===lg)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===cg)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===sg)return s.BYTE;if(r===og)return s.SHORT;if(r===Yo)return s.UNSIGNED_SHORT;if(r===If)return s.INT;if(r===qr)return s.UNSIGNED_INT;if(r===wa)return s.FLOAT;if(r===Wo)return s.HALF_FLOAT;if(r===ug)return s.ALPHA;if(r===fg)return s.RGB;if(r===Yi)return s.RGBA;if(r===Ko)return s.DEPTH_COMPONENT;if(r===jo)return s.DEPTH_STENCIL;if(r===hg)return s.RED;if(r===Hf)return s.RED_INTEGER;if(r===dg)return s.RG;if(r===Vf)return s.RG_INTEGER;if(r===Gf)return s.RGBA_INTEGER;if(r===uc||r===fc||r===hc||r===dc)if(h===je)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(r===uc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===fc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===hc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===dc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(r===uc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===fc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===hc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===dc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Xf||r===kf||r===qf||r===Yf)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(r===Xf)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===kf)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===qf)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Yf)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Wf||r===Zf||r===Kf)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(r===Wf||r===Zf)return h===je?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(r===Kf)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===jf||r===Qf||r===Jf||r===$f||r===th||r===eh||r===nh||r===ih||r===ah||r===rh||r===sh||r===oh||r===lh||r===ch)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(r===jf)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Qf)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Jf)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===$f)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===th)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===eh)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===nh)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ih)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ah)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===rh)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===sh)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===oh)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===lh)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===ch)return h===je?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===uh||r===fh||r===hh)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(r===uh)return h===je?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===fh)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===hh)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===dh||r===ph||r===mh||r===gh)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(r===dh)return c.COMPRESSED_RED_RGTC1_EXT;if(r===ph)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===mh)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===gh)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Zo?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:i}}const uA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class hA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const r=new Wg(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,r=new pr({vertexShader:uA,fragmentShader:fA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Fn(new hl(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dA extends Ps{constructor(e,i){super();const r=this;let l=null,c=1,h=null,d="local-floor",m=1,p=null,v=null,g=null,y=null,x=null,E=null;const A=typeof XRWebGLBinding<"u",M=new hA,S={},L=i.getContextAttributes();let N=null,w=null;const G=[],B=[],P=new qt;let V=null;const D=new Li;D.viewport=new pn;const C=new Li;C.viewport=new pn;const H=[D,C],st=new dE;let ft=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let rt=G[$];return rt===void 0&&(rt=new kh,G[$]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function($){let rt=G[$];return rt===void 0&&(rt=new kh,G[$]=rt),rt.getGripSpace()},this.getHand=function($){let rt=G[$];return rt===void 0&&(rt=new kh,G[$]=rt),rt.getHandSpace()};function Q($){const rt=B.indexOf($.inputSource);if(rt===-1)return;const Rt=G[rt];Rt!==void 0&&(Rt.update($.inputSource,$.frame,p||h),Rt.dispatchEvent({type:$.type,data:$.inputSource}))}function F(){l.removeEventListener("select",Q),l.removeEventListener("selectstart",Q),l.removeEventListener("selectend",Q),l.removeEventListener("squeeze",Q),l.removeEventListener("squeezestart",Q),l.removeEventListener("squeezeend",Q),l.removeEventListener("end",F),l.removeEventListener("inputsourceschange",nt);for(let $=0;$<G.length;$++){const rt=B[$];rt!==null&&(B[$]=null,G[$].disconnect(rt))}ft=null,q=null,M.reset();for(const $ in S)delete S[$];e.setRenderTarget(N),x=null,y=null,g=null,l=null,w=null,lt.stop(),r.isPresenting=!1,e.setPixelRatio(V),e.setSize(P.width,P.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){c=$,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){d=$,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function($){p=$},this.getBaseLayer=function(){return y!==null?y:x},this.getBinding=function(){return g===null&&A&&(g=new XRWebGLBinding(l,i)),g},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function($){if(l=$,l!==null){if(N=e.getRenderTarget(),l.addEventListener("select",Q),l.addEventListener("selectstart",Q),l.addEventListener("selectend",Q),l.addEventListener("squeeze",Q),l.addEventListener("squeezestart",Q),l.addEventListener("squeezeend",Q),l.addEventListener("end",F),l.addEventListener("inputsourceschange",nt),L.xrCompatible!==!0&&await i.makeXRCompatible(),V=e.getPixelRatio(),e.getSize(P),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let Rt=null,Dt=null,Ct=null;L.depth&&(Ct=L.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Rt=L.stencil?jo:Ko,Dt=L.stencil?Zo:qr);const Ut={colorFormat:i.RGBA8,depthFormat:Ct,scaleFactor:c};g=this.getBinding(),y=g.createProjectionLayer(Ut),l.updateRenderState({layers:[y]}),e.setPixelRatio(1),e.setSize(y.textureWidth,y.textureHeight,!1),w=new Yr(y.textureWidth,y.textureHeight,{format:Yi,type:ua,depthTexture:new Yg(y.textureWidth,y.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,Rt),stencilBuffer:L.stencil,colorSpace:e.outputColorSpace,samples:L.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}else{const Rt={antialias:L.antialias,alpha:!0,depth:L.depth,stencil:L.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(l,i,Rt),l.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),w=new Yr(x.framebufferWidth,x.framebufferHeight,{format:Yi,type:ua,colorSpace:e.outputColorSpace,stencilBuffer:L.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),lt.setContext(l),lt.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function nt($){for(let rt=0;rt<$.removed.length;rt++){const Rt=$.removed[rt],Dt=B.indexOf(Rt);Dt>=0&&(B[Dt]=null,G[Dt].disconnect(Rt))}for(let rt=0;rt<$.added.length;rt++){const Rt=$.added[rt];let Dt=B.indexOf(Rt);if(Dt===-1){for(let Ut=0;Ut<G.length;Ut++)if(Ut>=B.length){B.push(Rt),Dt=Ut;break}else if(B[Ut]===null){B[Ut]=Rt,Dt=Ut;break}if(Dt===-1)break}const Ct=G[Dt];Ct&&Ct.connect(Rt)}}const Z=new Y,xt=new Y;function vt($,rt,Rt){Z.setFromMatrixPosition(rt.matrixWorld),xt.setFromMatrixPosition(Rt.matrixWorld);const Dt=Z.distanceTo(xt),Ct=rt.projectionMatrix.elements,Ut=Rt.projectionMatrix.elements,Ht=Ct[14]/(Ct[10]-1),z=Ct[14]/(Ct[10]+1),wt=(Ct[9]+1)/Ct[5],yt=(Ct[9]-1)/Ct[5],gt=(Ct[8]-1)/Ct[0],pt=(Ut[8]+1)/Ut[0],Tt=Ht*gt,At=Ht*pt,Bt=Dt/(-gt+pt),fe=Bt*-gt;if(rt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(fe),$.translateZ(Bt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ct[10]===-1)$.projectionMatrix.copy(rt.projectionMatrix),$.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const ce=Ht+Bt,U=z+Bt,T=Tt-fe,et=At+(Dt-fe),dt=wt*z/U*ce,Et=yt*z/U*ce;$.projectionMatrix.makePerspective(T,et,dt,Et,ce,U),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Nt($,rt){rt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(rt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(l===null)return;let rt=$.near,Rt=$.far;M.texture!==null&&(M.depthNear>0&&(rt=M.depthNear),M.depthFar>0&&(Rt=M.depthFar)),st.near=C.near=D.near=rt,st.far=C.far=D.far=Rt,(ft!==st.near||q!==st.far)&&(l.updateRenderState({depthNear:st.near,depthFar:st.far}),ft=st.near,q=st.far),st.layers.mask=$.layers.mask|6,D.layers.mask=st.layers.mask&3,C.layers.mask=st.layers.mask&5;const Dt=$.parent,Ct=st.cameras;Nt(st,Dt);for(let Ut=0;Ut<Ct.length;Ut++)Nt(Ct[Ut],Dt);Ct.length===2?vt(st,D,C):st.projectionMatrix.copy(D.projectionMatrix),Qt($,st,Dt)};function Qt($,rt,Rt){Rt===null?$.matrix.copy(rt.matrixWorld):($.matrix.copy(Rt.matrixWorld),$.matrix.invert(),$.matrix.multiply(rt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(rt.projectionMatrix),$.projectionMatrixInverse.copy(rt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=_h*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return st},this.getFoveation=function(){if(!(y===null&&x===null))return m},this.setFoveation=function($){m=$,y!==null&&(y.fixedFoveation=$),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=$)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(st)},this.getCameraTexture=function($){return S[$]};let ae=null;function I($,rt){if(v=rt.getViewerPose(p||h),E=rt,v!==null){const Rt=v.views;x!==null&&(e.setRenderTargetFramebuffer(w,x.framebuffer),e.setRenderTarget(w));let Dt=!1;Rt.length!==st.cameras.length&&(st.cameras.length=0,Dt=!0);for(let z=0;z<Rt.length;z++){const wt=Rt[z];let yt=null;if(x!==null)yt=x.getViewport(wt);else{const pt=g.getViewSubImage(y,wt);yt=pt.viewport,z===0&&(e.setRenderTargetTextures(w,pt.colorTexture,pt.depthStencilTexture),e.setRenderTarget(w))}let gt=H[z];gt===void 0&&(gt=new Li,gt.layers.enable(z),gt.viewport=new pn,H[z]=gt),gt.matrix.fromArray(wt.transform.matrix),gt.matrix.decompose(gt.position,gt.quaternion,gt.scale),gt.projectionMatrix.fromArray(wt.projectionMatrix),gt.projectionMatrixInverse.copy(gt.projectionMatrix).invert(),gt.viewport.set(yt.x,yt.y,yt.width,yt.height),z===0&&(st.matrix.copy(gt.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale)),Dt===!0&&st.cameras.push(gt)}const Ct=l.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&A){g=r.getBinding();const z=g.getDepthInformation(Rt[0]);z&&z.isValid&&z.texture&&M.init(z,l.renderState)}if(Ct&&Ct.includes("camera-access")&&A){e.state.unbindTexture(),g=r.getBinding();for(let z=0;z<Rt.length;z++){const wt=Rt[z].camera;if(wt){let yt=S[wt];yt||(yt=new Wg,S[wt]=yt);const gt=g.getCameraImage(wt);yt.sourceTexture=gt}}}}for(let Rt=0;Rt<G.length;Rt++){const Dt=B[Rt],Ct=G[Rt];Dt!==null&&Ct!==void 0&&Ct.update(Dt,rt,p||h)}ae&&ae($,rt),rt.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:rt}),E=null}const lt=new m0;lt.setAnimationLoop(I),this.setAnimationLoop=function($){ae=$},this.dispose=function(){}}}const ns=new ha,pA=new sn;function mA(s,e){function i(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function r(M,S){S.color.getRGB(M.fogColor.value,Hg(s)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function l(M,S,L,N,w){S.isMeshBasicMaterial||S.isMeshLambertMaterial?c(M,S):S.isMeshToonMaterial?(c(M,S),g(M,S)):S.isMeshPhongMaterial?(c(M,S),v(M,S)):S.isMeshStandardMaterial?(c(M,S),y(M,S),S.isMeshPhysicalMaterial&&x(M,S,w)):S.isMeshMatcapMaterial?(c(M,S),E(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),A(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(h(M,S),S.isLineDashedMaterial&&d(M,S)):S.isPointsMaterial?m(M,S,L,N):S.isSpriteMaterial?p(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,i(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===li&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,i(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===li&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,i(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,i(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const L=e.get(S),N=L.envMap,w=L.envMapRotation;N&&(M.envMap.value=N,ns.copy(w),ns.x*=-1,ns.y*=-1,ns.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(ns.y*=-1,ns.z*=-1),M.envMapRotation.value.setFromMatrix4(pA.makeRotationFromEuler(ns)),M.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,M.aoMapTransform))}function h(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform))}function d(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function m(M,S,L,N){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*L,M.scale.value=N*.5,S.map&&(M.map.value=S.map,i(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function p(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function v(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function g(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function y(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function x(M,S,L){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===li&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=L.texture,M.transmissionSamplerSize.value.set(L.width,L.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,M.specularIntensityMapTransform))}function E(M,S){S.matcap&&(M.matcap.value=S.matcap)}function A(M,S){const L=e.get(S).light;M.referencePosition.value.setFromMatrixPosition(L.matrixWorld),M.nearDistance.value=L.shadow.camera.near,M.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function gA(s,e,i,r){let l={},c={},h=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function m(L,N){const w=N.program;r.uniformBlockBinding(L,w)}function p(L,N){let w=l[L.id];w===void 0&&(E(L),w=v(L),l[L.id]=w,L.addEventListener("dispose",M));const G=N.program;r.updateUBOMapping(L,G);const B=e.render.frame;c[L.id]!==B&&(y(L),c[L.id]=B)}function v(L){const N=g();L.__bindingPointIndex=N;const w=s.createBuffer(),G=L.__size,B=L.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,G,B),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,N,w),w}function g(){for(let L=0;L<d;L++)if(h.indexOf(L)===-1)return h.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(L){const N=l[L.id],w=L.uniforms,G=L.__cache;s.bindBuffer(s.UNIFORM_BUFFER,N);for(let B=0,P=w.length;B<P;B++){const V=Array.isArray(w[B])?w[B]:[w[B]];for(let D=0,C=V.length;D<C;D++){const H=V[D];if(x(H,B,D,G)===!0){const st=H.__offset,ft=Array.isArray(H.value)?H.value:[H.value];let q=0;for(let Q=0;Q<ft.length;Q++){const F=ft[Q],nt=A(F);typeof F=="number"||typeof F=="boolean"?(H.__data[0]=F,s.bufferSubData(s.UNIFORM_BUFFER,st+q,H.__data)):F.isMatrix3?(H.__data[0]=F.elements[0],H.__data[1]=F.elements[1],H.__data[2]=F.elements[2],H.__data[3]=0,H.__data[4]=F.elements[3],H.__data[5]=F.elements[4],H.__data[6]=F.elements[5],H.__data[7]=0,H.__data[8]=F.elements[6],H.__data[9]=F.elements[7],H.__data[10]=F.elements[8],H.__data[11]=0):(F.toArray(H.__data,q),q+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,st,H.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function x(L,N,w,G){const B=L.value,P=N+"_"+w;if(G[P]===void 0)return typeof B=="number"||typeof B=="boolean"?G[P]=B:G[P]=B.clone(),!0;{const V=G[P];if(typeof B=="number"||typeof B=="boolean"){if(V!==B)return G[P]=B,!0}else if(V.equals(B)===!1)return V.copy(B),!0}return!1}function E(L){const N=L.uniforms;let w=0;const G=16;for(let P=0,V=N.length;P<V;P++){const D=Array.isArray(N[P])?N[P]:[N[P]];for(let C=0,H=D.length;C<H;C++){const st=D[C],ft=Array.isArray(st.value)?st.value:[st.value];for(let q=0,Q=ft.length;q<Q;q++){const F=ft[q],nt=A(F),Z=w%G,xt=Z%nt.boundary,vt=Z+xt;w+=xt,vt!==0&&G-vt<nt.storage&&(w+=G-vt),st.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),st.__offset=w,w+=nt.storage}}}const B=w%G;return B>0&&(w+=G-B),L.__size=w,L.__cache={},this}function A(L){const N={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(N.boundary=4,N.storage=4):L.isVector2?(N.boundary=8,N.storage=8):L.isVector3||L.isColor?(N.boundary=16,N.storage=12):L.isVector4?(N.boundary=16,N.storage=16):L.isMatrix3?(N.boundary=48,N.storage=48):L.isMatrix4?(N.boundary=64,N.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),N}function M(L){const N=L.target;N.removeEventListener("dispose",M);const w=h.indexOf(N.__bindingPointIndex);h.splice(w,1),s.deleteBuffer(l[N.id]),delete l[N.id],delete c[N.id]}function S(){for(const L in l)s.deleteBuffer(l[L]);h=[],l={},c={}}return{bind:m,update:p,dispose:S}}class vA{constructor(e={}){const{canvas:i=$x(),context:r=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:y=!1}=e;this.isWebGLRenderer=!0;let x;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=r.getContextAttributes().alpha}else x=h;const E=new Uint32Array(4),A=new Int32Array(4);let M=null,S=null;const L=[],N=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=rr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let G=!1;this._outputColorSpace=ei;let B=0,P=0,V=null,D=-1,C=null;const H=new pn,st=new pn;let ft=null;const q=new Re(0);let Q=0,F=i.width,nt=i.height,Z=1,xt=null,vt=null;const Nt=new pn(0,0,F,nt),Qt=new pn(0,0,F,nt);let ae=!1;const I=new Yh;let lt=!1,$=!1;const rt=new sn,Rt=new Y,Dt=new pn,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ut=!1;function Ht(){return V===null?Z:1}let z=r;function wt(R,J){return i.getContext(R,J)}try{const R={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:v,failIfMajorPerformanceCaveat:g};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Ef}`),i.addEventListener("webglcontextlost",Vt,!1),i.addEventListener("webglcontextrestored",Mt,!1),i.addEventListener("webglcontextcreationerror",Lt,!1),z===null){const J="webgl2";if(z=wt(J,R),z===null)throw wt(J)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let yt,gt,pt,Tt,At,Bt,fe,ce,U,T,et,dt,Et,mt,Zt,It,ee,$t,Ot,Xt,se,ie,Yt,ge;function X(){yt=new R1(z),yt.init(),ie=new cA(z,yt),gt=new S1(z,yt,e,ie),pt=new oA(z,yt),gt.reversedDepthBuffer&&y&&pt.buffers.depth.setReversed(!0),Tt=new D1(z),At=new Zb,Bt=new lA(z,yt,pt,At,gt,ie,Tt),fe=new M1(w),ce=new A1(w),U=new gE(z),Yt=new _1(z,U),T=new C1(z,U,Tt,Yt),et=new N1(z,T,U,Tt),Ot=new U1(z,gt,Bt),It=new x1(At),dt=new Wb(w,fe,ce,yt,gt,Yt,It),Et=new mA(w,At),mt=new jb,Zt=new nA(yt),$t=new v1(w,fe,ce,pt,et,x,m),ee=new rA(w,et,gt),ge=new gA(z,Tt,gt,pt),Xt=new y1(z,yt,Tt),se=new w1(z,yt,Tt),Tt.programs=dt.programs,w.capabilities=gt,w.extensions=yt,w.properties=At,w.renderLists=mt,w.shadowMap=ee,w.state=pt,w.info=Tt}X();const zt=new dA(w,z);this.xr=zt,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const R=yt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=yt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(R){R!==void 0&&(Z=R,this.setSize(F,nt,!1))},this.getSize=function(R){return R.set(F,nt)},this.setSize=function(R,J,ct=!0){if(zt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=R,nt=J,i.width=Math.floor(R*Z),i.height=Math.floor(J*Z),ct===!0&&(i.style.width=R+"px",i.style.height=J+"px"),this.setViewport(0,0,R,J)},this.getDrawingBufferSize=function(R){return R.set(F*Z,nt*Z).floor()},this.setDrawingBufferSize=function(R,J,ct){F=R,nt=J,Z=ct,i.width=Math.floor(R*ct),i.height=Math.floor(J*ct),this.setViewport(0,0,R,J)},this.getCurrentViewport=function(R){return R.copy(H)},this.getViewport=function(R){return R.copy(Nt)},this.setViewport=function(R,J,ct,ut){R.isVector4?Nt.set(R.x,R.y,R.z,R.w):Nt.set(R,J,ct,ut),pt.viewport(H.copy(Nt).multiplyScalar(Z).round())},this.getScissor=function(R){return R.copy(Qt)},this.setScissor=function(R,J,ct,ut){R.isVector4?Qt.set(R.x,R.y,R.z,R.w):Qt.set(R,J,ct,ut),pt.scissor(st.copy(Qt).multiplyScalar(Z).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(R){pt.setScissorTest(ae=R)},this.setOpaqueSort=function(R){xt=R},this.setTransparentSort=function(R){vt=R},this.getClearColor=function(R){return R.copy($t.getClearColor())},this.setClearColor=function(){$t.setClearColor(...arguments)},this.getClearAlpha=function(){return $t.getClearAlpha()},this.setClearAlpha=function(){$t.setClearAlpha(...arguments)},this.clear=function(R=!0,J=!0,ct=!0){let ut=0;if(R){let tt=!1;if(V!==null){const Pt=V.texture.format;tt=Pt===Gf||Pt===Vf||Pt===Hf}if(tt){const Pt=V.texture.type,kt=Pt===ua||Pt===qr||Pt===Yo||Pt===Zo||Pt===Bf||Pt===Ff,jt=$t.getClearColor(),Gt=$t.getClearAlpha(),Jt=jt.r,he=jt.g,le=jt.b;kt?(E[0]=Jt,E[1]=he,E[2]=le,E[3]=Gt,z.clearBufferuiv(z.COLOR,0,E)):(A[0]=Jt,A[1]=he,A[2]=le,A[3]=Gt,z.clearBufferiv(z.COLOR,0,A))}else ut|=z.COLOR_BUFFER_BIT}J&&(ut|=z.DEPTH_BUFFER_BIT),ct&&(ut|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(ut)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",Vt,!1),i.removeEventListener("webglcontextrestored",Mt,!1),i.removeEventListener("webglcontextcreationerror",Lt,!1),$t.dispose(),mt.dispose(),Zt.dispose(),At.dispose(),fe.dispose(),ce.dispose(),et.dispose(),Yt.dispose(),ge.dispose(),dt.dispose(),zt.dispose(),zt.removeEventListener("sessionstart",cn),zt.removeEventListener("sessionend",an),Jn.stop()};function Vt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),G=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),G=!1;const R=Tt.autoReset,J=ee.enabled,ct=ee.autoUpdate,ut=ee.needsUpdate,tt=ee.type;X(),Tt.autoReset=R,ee.enabled=J,ee.autoUpdate=ct,ee.needsUpdate=ut,ee.type=tt}function Lt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function bt(R){const J=R.target;J.removeEventListener("dispose",bt),ne(J)}function ne(R){me(R),At.remove(R)}function me(R){const J=At.get(R).programs;J!==void 0&&(J.forEach(function(ct){dt.releaseProgram(ct)}),R.isShaderMaterial&&dt.releaseShaderCache(R))}this.renderBufferDirect=function(R,J,ct,ut,tt,Pt){J===null&&(J=Ct);const kt=tt.isMesh&&tt.matrixWorld.determinant()<0,jt=hi(R,J,ct,ut,tt);pt.setMaterial(ut,kt);let Gt=ct.index,Jt=1;if(ut.wireframe===!0){if(Gt=T.getWireframeAttribute(ct),Gt===void 0)return;Jt=2}const he=ct.drawRange,le=ct.attributes.position;let Te=he.start*Jt,Ve=(he.start+he.count)*Jt;Pt!==null&&(Te=Math.max(Te,Pt.start*Jt),Ve=Math.min(Ve,(Pt.start+Pt.count)*Jt)),Gt!==null?(Te=Math.max(Te,0),Ve=Math.min(Ve,Gt.count)):le!=null&&(Te=Math.max(Te,0),Ve=Math.min(Ve,le.count));const De=Ve-Te;if(De<0||De===1/0)return;Yt.setup(tt,ut,jt,ct,Gt);let Ie,Oe=Xt;if(Gt!==null&&(Ie=U.get(Gt),Oe=se,Oe.setIndex(Ie)),tt.isMesh)ut.wireframe===!0?(pt.setLineWidth(ut.wireframeLinewidth*Ht()),Oe.setMode(z.LINES)):Oe.setMode(z.TRIANGLES);else if(tt.isLine){let oe=ut.linewidth;oe===void 0&&(oe=1),pt.setLineWidth(oe*Ht()),tt.isLineSegments?Oe.setMode(z.LINES):tt.isLineLoop?Oe.setMode(z.LINE_LOOP):Oe.setMode(z.LINE_STRIP)}else tt.isPoints?Oe.setMode(z.POINTS):tt.isSprite&&Oe.setMode(z.TRIANGLES);if(tt.isBatchedMesh)if(tt._multiDrawInstances!==null)Jo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Oe.renderMultiDrawInstances(tt._multiDrawStarts,tt._multiDrawCounts,tt._multiDrawCount,tt._multiDrawInstances);else if(yt.get("WEBGL_multi_draw"))Oe.renderMultiDraw(tt._multiDrawStarts,tt._multiDrawCounts,tt._multiDrawCount);else{const oe=tt._multiDrawStarts,Be=tt._multiDrawCounts,_e=tt._multiDrawCount,un=Gt?U.get(Gt).bytesPerElement:1,Hn=At.get(ut).currentProgram.getUniforms();for(let Fe=0;Fe<_e;Fe++)Hn.setValue(z,"_gl_DrawID",Fe),Oe.render(oe[Fe]/un,Be[Fe])}else if(tt.isInstancedMesh)Oe.renderInstances(Te,De,tt.count);else if(ct.isInstancedBufferGeometry){const oe=ct._maxInstanceCount!==void 0?ct._maxInstanceCount:1/0,Be=Math.min(ct.instanceCount,oe);Oe.renderInstances(Te,De,Be)}else Oe.render(Te,De)};function Me(R,J,ct){R.transparent===!0&&R.side===qi&&R.forceSinglePass===!1?(R.side=li,R.needsUpdate=!0,Cn(R,J,ct),R.side=ir,R.needsUpdate=!0,Cn(R,J,ct),R.side=qi):Cn(R,J,ct)}this.compile=function(R,J,ct=null){ct===null&&(ct=R),S=Zt.get(ct),S.init(J),N.push(S),ct.traverseVisible(function(tt){tt.isLight&&tt.layers.test(J.layers)&&(S.pushLight(tt),tt.castShadow&&S.pushShadow(tt))}),R!==ct&&R.traverseVisible(function(tt){tt.isLight&&tt.layers.test(J.layers)&&(S.pushLight(tt),tt.castShadow&&S.pushShadow(tt))}),S.setupLights();const ut=new Set;return R.traverse(function(tt){if(!(tt.isMesh||tt.isPoints||tt.isLine||tt.isSprite))return;const Pt=tt.material;if(Pt)if(Array.isArray(Pt))for(let kt=0;kt<Pt.length;kt++){const jt=Pt[kt];Me(jt,ct,tt),ut.add(jt)}else Me(Pt,ct,tt),ut.add(Pt)}),S=N.pop(),ut},this.compileAsync=function(R,J,ct=null){const ut=this.compile(R,J,ct);return new Promise(tt=>{function Pt(){if(ut.forEach(function(kt){At.get(kt).currentProgram.isReady()&&ut.delete(kt)}),ut.size===0){tt(R);return}setTimeout(Pt,10)}yt.get("KHR_parallel_shader_compile")!==null?Pt():setTimeout(Pt,10)})};let de=null;function Pe(R){de&&de(R)}function cn(){Jn.stop()}function an(){Jn.start()}const Jn=new m0;Jn.setAnimationLoop(Pe),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(R){de=R,zt.setAnimationLoop(R),R===null?Jn.stop():Jn.start()},zt.addEventListener("sessionstart",cn),zt.addEventListener("sessionend",an),this.render=function(R,J){if(J!==void 0&&J.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),J.parent===null&&J.matrixWorldAutoUpdate===!0&&J.updateMatrixWorld(),zt.enabled===!0&&zt.isPresenting===!0&&(zt.cameraAutoUpdate===!0&&zt.updateCamera(J),J=zt.getCamera()),R.isScene===!0&&R.onBeforeRender(w,R,J,V),S=Zt.get(R,N.length),S.init(J),N.push(S),rt.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),I.setFromProjectionMatrix(rt,fa,J.reversedDepth),$=this.localClippingEnabled,lt=It.init(this.clippingPlanes,$),M=mt.get(R,L.length),M.init(),L.push(M),zt.enabled===!0&&zt.isPresenting===!0){const Pt=w.xr.getDepthSensingMesh();Pt!==null&&Va(Pt,J,-1/0,w.sortObjects)}Va(R,J,0,w.sortObjects),M.finish(),w.sortObjects===!0&&M.sort(xt,vt),Ut=zt.enabled===!1||zt.isPresenting===!1||zt.hasDepthSensing()===!1,Ut&&$t.addToRenderList(M,R),this.info.render.frame++,lt===!0&&It.beginShadows();const ct=S.state.shadowsArray;ee.render(ct,R,J),lt===!0&&It.endShadows(),this.info.autoReset===!0&&this.info.reset();const ut=M.opaque,tt=M.transmissive;if(S.setupLights(),J.isArrayCamera){const Pt=J.cameras;if(tt.length>0)for(let kt=0,jt=Pt.length;kt<jt;kt++){const Gt=Pt[kt];Ji(ut,tt,R,Gt)}Ut&&$t.render(R);for(let kt=0,jt=Pt.length;kt<jt;kt++){const Gt=Pt[kt];ma(M,R,Gt,Gt.viewport)}}else tt.length>0&&Ji(ut,tt,R,J),Ut&&$t.render(R),ma(M,R,J);V!==null&&P===0&&(Bt.updateMultisampleRenderTarget(V),Bt.updateRenderTargetMipmap(V)),R.isScene===!0&&R.onAfterRender(w,R,J),Yt.resetDefaultState(),D=-1,C=null,N.pop(),N.length>0?(S=N[N.length-1],lt===!0&&It.setGlobalState(w.clippingPlanes,S.state.camera)):S=null,L.pop(),L.length>0?M=L[L.length-1]:M=null};function Va(R,J,ct,ut){if(R.visible===!1)return;if(R.layers.test(J.layers)){if(R.isGroup)ct=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(J);else if(R.isLight)S.pushLight(R),R.castShadow&&S.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||I.intersectsSprite(R)){ut&&Dt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(rt);const kt=et.update(R),jt=R.material;jt.visible&&M.push(R,kt,jt,ct,Dt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||I.intersectsObject(R))){const kt=et.update(R),jt=R.material;if(ut&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Dt.copy(R.boundingSphere.center)):(kt.boundingSphere===null&&kt.computeBoundingSphere(),Dt.copy(kt.boundingSphere.center)),Dt.applyMatrix4(R.matrixWorld).applyMatrix4(rt)),Array.isArray(jt)){const Gt=kt.groups;for(let Jt=0,he=Gt.length;Jt<he;Jt++){const le=Gt[Jt],Te=jt[le.materialIndex];Te&&Te.visible&&M.push(R,kt,Te,ct,Dt.z,le)}}else jt.visible&&M.push(R,kt,jt,ct,Dt.z,null)}}const Pt=R.children;for(let kt=0,jt=Pt.length;kt<jt;kt++)Va(Pt[kt],J,ct,ut)}function ma(R,J,ct,ut){const tt=R.opaque,Pt=R.transmissive,kt=R.transparent;S.setupLightsView(ct),lt===!0&&It.setGlobalState(w.clippingPlanes,ct),ut&&pt.viewport(H.copy(ut)),tt.length>0&&Oi(tt,J,ct),Pt.length>0&&Oi(Pt,J,ct),kt.length>0&&Oi(kt,J,ct),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function Ji(R,J,ct,ut){if((ct.isScene===!0?ct.overrideMaterial:null)!==null)return;S.state.transmissionRenderTarget[ut.id]===void 0&&(S.state.transmissionRenderTarget[ut.id]=new Yr(1,1,{generateMipmaps:!0,type:yt.has("EXT_color_buffer_half_float")||yt.has("EXT_color_buffer_float")?Wo:ua,minFilter:Ca,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ge.workingColorSpace}));const Pt=S.state.transmissionRenderTarget[ut.id],kt=ut.viewport||H;Pt.setSize(kt.z*w.transmissionResolutionScale,kt.w*w.transmissionResolutionScale);const jt=w.getRenderTarget(),Gt=w.getActiveCubeFace(),Jt=w.getActiveMipmapLevel();w.setRenderTarget(Pt),w.getClearColor(q),Q=w.getClearAlpha(),Q<1&&w.setClearColor(16777215,.5),w.clear(),Ut&&$t.render(ct);const he=w.toneMapping;w.toneMapping=rr;const le=ut.viewport;if(ut.viewport!==void 0&&(ut.viewport=void 0),S.setupLightsView(ut),lt===!0&&It.setGlobalState(w.clippingPlanes,ut),Oi(R,ct,ut),Bt.updateMultisampleRenderTarget(Pt),Bt.updateRenderTargetMipmap(Pt),yt.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let Ve=0,De=J.length;Ve<De;Ve++){const Ie=J[Ve],Oe=Ie.object,oe=Ie.geometry,Be=Ie.material,_e=Ie.group;if(Be.side===qi&&Oe.layers.test(ut.layers)){const un=Be.side;Be.side=li,Be.needsUpdate=!0,fi(Oe,ct,ut,oe,Be,_e),Be.side=un,Be.needsUpdate=!0,Te=!0}}Te===!0&&(Bt.updateMultisampleRenderTarget(Pt),Bt.updateRenderTargetMipmap(Pt))}w.setRenderTarget(jt,Gt,Jt),w.setClearColor(q,Q),le!==void 0&&(ut.viewport=le),w.toneMapping=he}function Oi(R,J,ct){const ut=J.isScene===!0?J.overrideMaterial:null;for(let tt=0,Pt=R.length;tt<Pt;tt++){const kt=R[tt],jt=kt.object,Gt=kt.geometry,Jt=kt.group;let he=kt.material;he.allowOverride===!0&&ut!==null&&(he=ut),jt.layers.test(ct.layers)&&fi(jt,J,ct,Gt,he,Jt)}}function fi(R,J,ct,ut,tt,Pt){R.onBeforeRender(w,J,ct,ut,tt,Pt),R.modelViewMatrix.multiplyMatrices(ct.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),tt.onBeforeRender(w,J,ct,ut,R,Pt),tt.transparent===!0&&tt.side===qi&&tt.forceSinglePass===!1?(tt.side=li,tt.needsUpdate=!0,w.renderBufferDirect(ct,J,ut,tt,R,Pt),tt.side=ir,tt.needsUpdate=!0,w.renderBufferDirect(ct,J,ut,tt,R,Pt),tt.side=qi):w.renderBufferDirect(ct,J,ut,tt,R,Pt),R.onAfterRender(w,J,ct,ut,tt,Pt)}function Cn(R,J,ct){J.isScene!==!0&&(J=Ct);const ut=At.get(R),tt=S.state.lights,Pt=S.state.shadowsArray,kt=tt.state.version,jt=dt.getParameters(R,tt.state,Pt,J,ct),Gt=dt.getProgramCacheKey(jt);let Jt=ut.programs;ut.environment=R.isMeshStandardMaterial?J.environment:null,ut.fog=J.fog,ut.envMap=(R.isMeshStandardMaterial?ce:fe).get(R.envMap||ut.environment),ut.envMapRotation=ut.environment!==null&&R.envMap===null?J.environmentRotation:R.envMapRotation,Jt===void 0&&(R.addEventListener("dispose",bt),Jt=new Map,ut.programs=Jt);let he=Jt.get(Gt);if(he!==void 0){if(ut.currentProgram===he&&ut.lightsStateVersion===kt)return zi(R,jt),he}else jt.uniforms=dt.getUniforms(R),R.onBeforeCompile(jt,w),he=dt.acquireProgram(jt,Gt),Jt.set(Gt,he),ut.uniforms=jt.uniforms;const le=ut.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(le.clippingPlanes=It.uniform),zi(R,jt),ut.needsLights=rs(R),ut.lightsStateVersion=kt,ut.needsLights&&(le.ambientLightColor.value=tt.state.ambient,le.lightProbe.value=tt.state.probe,le.directionalLights.value=tt.state.directional,le.directionalLightShadows.value=tt.state.directionalShadow,le.spotLights.value=tt.state.spot,le.spotLightShadows.value=tt.state.spotShadow,le.rectAreaLights.value=tt.state.rectArea,le.ltc_1.value=tt.state.rectAreaLTC1,le.ltc_2.value=tt.state.rectAreaLTC2,le.pointLights.value=tt.state.point,le.pointLightShadows.value=tt.state.pointShadow,le.hemisphereLights.value=tt.state.hemi,le.directionalShadowMap.value=tt.state.directionalShadowMap,le.directionalShadowMatrix.value=tt.state.directionalShadowMatrix,le.spotShadowMap.value=tt.state.spotShadowMap,le.spotLightMatrix.value=tt.state.spotLightMatrix,le.spotLightMap.value=tt.state.spotLightMap,le.pointShadowMap.value=tt.state.pointShadowMap,le.pointShadowMatrix.value=tt.state.pointShadowMatrix),ut.currentProgram=he,ut.uniformsList=null,he}function $i(R){if(R.uniformsList===null){const J=R.currentProgram.getUniforms();R.uniformsList=kc.seqWithValue(J.seq,R.uniforms)}return R.uniformsList}function zi(R,J){const ct=At.get(R);ct.outputColorSpace=J.outputColorSpace,ct.batching=J.batching,ct.batchingColor=J.batchingColor,ct.instancing=J.instancing,ct.instancingColor=J.instancingColor,ct.instancingMorph=J.instancingMorph,ct.skinning=J.skinning,ct.morphTargets=J.morphTargets,ct.morphNormals=J.morphNormals,ct.morphColors=J.morphColors,ct.morphTargetsCount=J.morphTargetsCount,ct.numClippingPlanes=J.numClippingPlanes,ct.numIntersection=J.numClipIntersection,ct.vertexAlphas=J.vertexAlphas,ct.vertexTangents=J.vertexTangents,ct.toneMapping=J.toneMapping}function hi(R,J,ct,ut,tt){J.isScene!==!0&&(J=Ct),Bt.resetTextureUnits();const Pt=J.fog,kt=ut.isMeshStandardMaterial?J.environment:null,jt=V===null?w.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Os,Gt=(ut.isMeshStandardMaterial?ce:fe).get(ut.envMap||kt),Jt=ut.vertexColors===!0&&!!ct.attributes.color&&ct.attributes.color.itemSize===4,he=!!ct.attributes.tangent&&(!!ut.normalMap||ut.anisotropy>0),le=!!ct.morphAttributes.position,Te=!!ct.morphAttributes.normal,Ve=!!ct.morphAttributes.color;let De=rr;ut.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(De=w.toneMapping);const Ie=ct.morphAttributes.position||ct.morphAttributes.normal||ct.morphAttributes.color,Oe=Ie!==void 0?Ie.length:0,oe=At.get(ut),Be=S.state.lights;if(lt===!0&&($===!0||R!==C)){const rn=R===C&&ut.id===D;It.setState(ut,R,rn)}let _e=!1;ut.version===oe.__version?(oe.needsLights&&oe.lightsStateVersion!==Be.state.version||oe.outputColorSpace!==jt||tt.isBatchedMesh&&oe.batching===!1||!tt.isBatchedMesh&&oe.batching===!0||tt.isBatchedMesh&&oe.batchingColor===!0&&tt.colorTexture===null||tt.isBatchedMesh&&oe.batchingColor===!1&&tt.colorTexture!==null||tt.isInstancedMesh&&oe.instancing===!1||!tt.isInstancedMesh&&oe.instancing===!0||tt.isSkinnedMesh&&oe.skinning===!1||!tt.isSkinnedMesh&&oe.skinning===!0||tt.isInstancedMesh&&oe.instancingColor===!0&&tt.instanceColor===null||tt.isInstancedMesh&&oe.instancingColor===!1&&tt.instanceColor!==null||tt.isInstancedMesh&&oe.instancingMorph===!0&&tt.morphTexture===null||tt.isInstancedMesh&&oe.instancingMorph===!1&&tt.morphTexture!==null||oe.envMap!==Gt||ut.fog===!0&&oe.fog!==Pt||oe.numClippingPlanes!==void 0&&(oe.numClippingPlanes!==It.numPlanes||oe.numIntersection!==It.numIntersection)||oe.vertexAlphas!==Jt||oe.vertexTangents!==he||oe.morphTargets!==le||oe.morphNormals!==Te||oe.morphColors!==Ve||oe.toneMapping!==De||oe.morphTargetsCount!==Oe)&&(_e=!0):(_e=!0,oe.__version=ut.version);let un=oe.currentProgram;_e===!0&&(un=Cn(ut,J,tt));let Hn=!1,Fe=!1,na=!1;const Ye=un.getUniforms(),mn=oe.uniforms;if(pt.useProgram(un.program)&&(Hn=!0,Fe=!0,na=!0),ut.id!==D&&(D=ut.id,Fe=!0),Hn||C!==R){pt.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Ye.setValue(z,"projectionMatrix",R.projectionMatrix),Ye.setValue(z,"viewMatrix",R.matrixWorldInverse);const wn=Ye.map.cameraPosition;wn!==void 0&&wn.setValue(z,Rt.setFromMatrixPosition(R.matrixWorld)),gt.logarithmicDepthBuffer&&Ye.setValue(z,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ut.isMeshPhongMaterial||ut.isMeshToonMaterial||ut.isMeshLambertMaterial||ut.isMeshBasicMaterial||ut.isMeshStandardMaterial||ut.isShaderMaterial)&&Ye.setValue(z,"isOrthographic",R.isOrthographicCamera===!0),C!==R&&(C=R,Fe=!0,na=!0)}if(tt.isSkinnedMesh){Ye.setOptional(z,tt,"bindMatrix"),Ye.setOptional(z,tt,"bindMatrixInverse");const rn=tt.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),Ye.setValue(z,"boneTexture",rn.boneTexture,Bt))}tt.isBatchedMesh&&(Ye.setOptional(z,tt,"batchingTexture"),Ye.setValue(z,"batchingTexture",tt._matricesTexture,Bt),Ye.setOptional(z,tt,"batchingIdTexture"),Ye.setValue(z,"batchingIdTexture",tt._indirectTexture,Bt),Ye.setOptional(z,tt,"batchingColorTexture"),tt._colorsTexture!==null&&Ye.setValue(z,"batchingColorTexture",tt._colorsTexture,Bt));const fn=ct.morphAttributes;if((fn.position!==void 0||fn.normal!==void 0||fn.color!==void 0)&&Ot.update(tt,ct,un),(Fe||oe.receiveShadow!==tt.receiveShadow)&&(oe.receiveShadow=tt.receiveShadow,Ye.setValue(z,"receiveShadow",tt.receiveShadow)),ut.isMeshGouraudMaterial&&ut.envMap!==null&&(mn.envMap.value=Gt,mn.flipEnvMap.value=Gt.isCubeTexture&&Gt.isRenderTargetTexture===!1?-1:1),ut.isMeshStandardMaterial&&ut.envMap===null&&J.environment!==null&&(mn.envMapIntensity.value=J.environmentIntensity),Fe&&(Ye.setValue(z,"toneMappingExposure",w.toneMappingExposure),oe.needsLights&&ao(mn,na),Pt&&ut.fog===!0&&Et.refreshFogUniforms(mn,Pt),Et.refreshMaterialUniforms(mn,ut,Z,nt,S.state.transmissionRenderTarget[R.id]),kc.upload(z,$i(oe),mn,Bt)),ut.isShaderMaterial&&ut.uniformsNeedUpdate===!0&&(kc.upload(z,$i(oe),mn,Bt),ut.uniformsNeedUpdate=!1),ut.isSpriteMaterial&&Ye.setValue(z,"center",tt.center),Ye.setValue(z,"modelViewMatrix",tt.modelViewMatrix),Ye.setValue(z,"normalMatrix",tt.normalMatrix),Ye.setValue(z,"modelMatrix",tt.matrixWorld),ut.isShaderMaterial||ut.isRawShaderMaterial){const rn=ut.uniformsGroups;for(let wn=0,Ga=rn.length;wn<Ga;wn++){const Ei=rn[wn];ge.update(Ei,un),ge.bind(Ei,un)}}return un}function ao(R,J){R.ambientLightColor.needsUpdate=J,R.lightProbe.needsUpdate=J,R.directionalLights.needsUpdate=J,R.directionalLightShadows.needsUpdate=J,R.pointLights.needsUpdate=J,R.pointLightShadows.needsUpdate=J,R.spotLights.needsUpdate=J,R.spotLightShadows.needsUpdate=J,R.rectAreaLights.needsUpdate=J,R.hemisphereLights.needsUpdate=J}function rs(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(R,J,ct){const ut=At.get(R);ut.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ut.__autoAllocateDepthBuffer===!1&&(ut.__useRenderToTexture=!1),At.get(R.texture).__webglTexture=J,At.get(R.depthTexture).__webglTexture=ut.__autoAllocateDepthBuffer?void 0:ct,ut.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,J){const ct=At.get(R);ct.__webglFramebuffer=J,ct.__useDefaultFramebuffer=J===void 0};const ta=z.createFramebuffer();this.setRenderTarget=function(R,J=0,ct=0){V=R,B=J,P=ct;let ut=!0,tt=null,Pt=!1,kt=!1;if(R){const Gt=At.get(R);if(Gt.__useDefaultFramebuffer!==void 0)pt.bindFramebuffer(z.FRAMEBUFFER,null),ut=!1;else if(Gt.__webglFramebuffer===void 0)Bt.setupRenderTarget(R);else if(Gt.__hasExternalTextures)Bt.rebindTextures(R,At.get(R.texture).__webglTexture,At.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const le=R.depthTexture;if(Gt.__boundDepthTexture!==le){if(le!==null&&At.has(le)&&(R.width!==le.image.width||R.height!==le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Bt.setupDepthRenderbuffer(R)}}const Jt=R.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(kt=!0);const he=At.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(he[J])?tt=he[J][ct]:tt=he[J],Pt=!0):R.samples>0&&Bt.useMultisampledRTT(R)===!1?tt=At.get(R).__webglMultisampledFramebuffer:Array.isArray(he)?tt=he[ct]:tt=he,H.copy(R.viewport),st.copy(R.scissor),ft=R.scissorTest}else H.copy(Nt).multiplyScalar(Z).floor(),st.copy(Qt).multiplyScalar(Z).floor(),ft=ae;if(ct!==0&&(tt=ta),pt.bindFramebuffer(z.FRAMEBUFFER,tt)&&ut&&pt.drawBuffers(R,tt),pt.viewport(H),pt.scissor(st),pt.setScissorTest(ft),Pt){const Gt=At.get(R.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+J,Gt.__webglTexture,ct)}else if(kt){const Gt=J;for(let Jt=0;Jt<R.textures.length;Jt++){const he=At.get(R.textures[Jt]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Jt,he.__webglTexture,ct,Gt)}}else if(R!==null&&ct!==0){const Gt=At.get(R.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Gt.__webglTexture,ct)}D=-1},this.readRenderTargetPixels=function(R,J,ct,ut,tt,Pt,kt,jt=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Gt=At.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&kt!==void 0&&(Gt=Gt[kt]),Gt){pt.bindFramebuffer(z.FRAMEBUFFER,Gt);try{const Jt=R.textures[jt],he=Jt.format,le=Jt.type;if(!gt.textureFormatReadable(he)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!gt.textureTypeReadable(le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}J>=0&&J<=R.width-ut&&ct>=0&&ct<=R.height-tt&&(R.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+jt),z.readPixels(J,ct,ut,tt,ie.convert(he),ie.convert(le),Pt))}finally{const Jt=V!==null?At.get(V).__webglFramebuffer:null;pt.bindFramebuffer(z.FRAMEBUFFER,Jt)}}},this.readRenderTargetPixelsAsync=async function(R,J,ct,ut,tt,Pt,kt,jt=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Gt=At.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&kt!==void 0&&(Gt=Gt[kt]),Gt)if(J>=0&&J<=R.width-ut&&ct>=0&&ct<=R.height-tt){pt.bindFramebuffer(z.FRAMEBUFFER,Gt);const Jt=R.textures[jt],he=Jt.format,le=Jt.type;if(!gt.textureFormatReadable(he))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!gt.textureTypeReadable(le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Te),z.bufferData(z.PIXEL_PACK_BUFFER,Pt.byteLength,z.STREAM_READ),R.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+jt),z.readPixels(J,ct,ut,tt,ie.convert(he),ie.convert(le),0);const Ve=V!==null?At.get(V).__webglFramebuffer:null;pt.bindFramebuffer(z.FRAMEBUFFER,Ve);const De=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await tM(z,De,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Te),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Pt),z.deleteBuffer(Te),z.deleteSync(De),Pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,J=null,ct=0){const ut=Math.pow(2,-ct),tt=Math.floor(R.image.width*ut),Pt=Math.floor(R.image.height*ut),kt=J!==null?J.x:0,jt=J!==null?J.y:0;Bt.setTexture2D(R,0),z.copyTexSubImage2D(z.TEXTURE_2D,ct,0,0,kt,jt,tt,Pt),pt.unbindTexture()};const ea=z.createFramebuffer(),ss=z.createFramebuffer();this.copyTextureToTexture=function(R,J,ct=null,ut=null,tt=0,Pt=null){Pt===null&&(tt!==0?(Jo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Pt=tt,tt=0):Pt=0);let kt,jt,Gt,Jt,he,le,Te,Ve,De;const Ie=R.isCompressedTexture?R.mipmaps[Pt]:R.image;if(ct!==null)kt=ct.max.x-ct.min.x,jt=ct.max.y-ct.min.y,Gt=ct.isBox3?ct.max.z-ct.min.z:1,Jt=ct.min.x,he=ct.min.y,le=ct.isBox3?ct.min.z:0;else{const fn=Math.pow(2,-tt);kt=Math.floor(Ie.width*fn),jt=Math.floor(Ie.height*fn),R.isDataArrayTexture?Gt=Ie.depth:R.isData3DTexture?Gt=Math.floor(Ie.depth*fn):Gt=1,Jt=0,he=0,le=0}ut!==null?(Te=ut.x,Ve=ut.y,De=ut.z):(Te=0,Ve=0,De=0);const Oe=ie.convert(J.format),oe=ie.convert(J.type);let Be;J.isData3DTexture?(Bt.setTexture3D(J,0),Be=z.TEXTURE_3D):J.isDataArrayTexture||J.isCompressedArrayTexture?(Bt.setTexture2DArray(J,0),Be=z.TEXTURE_2D_ARRAY):(Bt.setTexture2D(J,0),Be=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,J.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,J.unpackAlignment);const _e=z.getParameter(z.UNPACK_ROW_LENGTH),un=z.getParameter(z.UNPACK_IMAGE_HEIGHT),Hn=z.getParameter(z.UNPACK_SKIP_PIXELS),Fe=z.getParameter(z.UNPACK_SKIP_ROWS),na=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,Ie.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ie.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Jt),z.pixelStorei(z.UNPACK_SKIP_ROWS,he),z.pixelStorei(z.UNPACK_SKIP_IMAGES,le);const Ye=R.isDataArrayTexture||R.isData3DTexture,mn=J.isDataArrayTexture||J.isData3DTexture;if(R.isDepthTexture){const fn=At.get(R),rn=At.get(J),wn=At.get(fn.__renderTarget),Ga=At.get(rn.__renderTarget);pt.bindFramebuffer(z.READ_FRAMEBUFFER,wn.__webglFramebuffer),pt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Ga.__webglFramebuffer);for(let Ei=0;Ei<Gt;Ei++)Ye&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,At.get(R).__webglTexture,tt,le+Ei),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,At.get(J).__webglTexture,Pt,De+Ei)),z.blitFramebuffer(Jt,he,kt,jt,Te,Ve,kt,jt,z.DEPTH_BUFFER_BIT,z.NEAREST);pt.bindFramebuffer(z.READ_FRAMEBUFFER,null),pt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(tt!==0||R.isRenderTargetTexture||At.has(R)){const fn=At.get(R),rn=At.get(J);pt.bindFramebuffer(z.READ_FRAMEBUFFER,ea),pt.bindFramebuffer(z.DRAW_FRAMEBUFFER,ss);for(let wn=0;wn<Gt;wn++)Ye?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,fn.__webglTexture,tt,le+wn):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,fn.__webglTexture,tt),mn?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,rn.__webglTexture,Pt,De+wn):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,rn.__webglTexture,Pt),tt!==0?z.blitFramebuffer(Jt,he,kt,jt,Te,Ve,kt,jt,z.COLOR_BUFFER_BIT,z.NEAREST):mn?z.copyTexSubImage3D(Be,Pt,Te,Ve,De+wn,Jt,he,kt,jt):z.copyTexSubImage2D(Be,Pt,Te,Ve,Jt,he,kt,jt);pt.bindFramebuffer(z.READ_FRAMEBUFFER,null),pt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else mn?R.isDataTexture||R.isData3DTexture?z.texSubImage3D(Be,Pt,Te,Ve,De,kt,jt,Gt,Oe,oe,Ie.data):J.isCompressedArrayTexture?z.compressedTexSubImage3D(Be,Pt,Te,Ve,De,kt,jt,Gt,Oe,Ie.data):z.texSubImage3D(Be,Pt,Te,Ve,De,kt,jt,Gt,Oe,oe,Ie):R.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Pt,Te,Ve,kt,jt,Oe,oe,Ie.data):R.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Pt,Te,Ve,Ie.width,Ie.height,Oe,Ie.data):z.texSubImage2D(z.TEXTURE_2D,Pt,Te,Ve,kt,jt,Oe,oe,Ie);z.pixelStorei(z.UNPACK_ROW_LENGTH,_e),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,un),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Hn),z.pixelStorei(z.UNPACK_SKIP_ROWS,Fe),z.pixelStorei(z.UNPACK_SKIP_IMAGES,na),Pt===0&&J.generateMipmaps&&z.generateMipmap(Be),pt.unbindTexture()},this.initRenderTarget=function(R){At.get(R).__webglFramebuffer===void 0&&Bt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Bt.setTextureCube(R,0):R.isData3DTexture?Bt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Bt.setTexture2DArray(R,0):Bt.setTexture2D(R,0),pt.unbindTexture()},this.resetState=function(){B=0,P=0,V=null,pt.reset(),Yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Ge._getDrawingBufferColorSpace(e),i.unpackColorSpace=Ge._getUnpackColorSpace()}}function X0(s,e,i,r,l,c,h=.6){const d=Math.min(r,l)/2,m=Math.max(0,Math.min(c,d)),p=m>=d?0:Math.max(0,Math.min(h,1)),v=Math.PI/4*p,g=Math.sin(Math.PI/4*(1-p))*m*Math.SQRT2,y=m*Math.tan(v/2)*Math.cos(v),x=y*Math.tan(v);let E=(1+p)*m,A=(E-g-y-x)/3,M=2*A;if(E>d){const L=d-x-g-y;A=Math.min(A,L*5/6),M=L-A,E=d}[[e+r,i],[e+r,i+l],[e,i+l],[e,i]].forEach(([L,N],w)=>{const G=w*Math.PI/2,B=Math.round(Math.cos(G)),P=Math.round(Math.sin(G)),V=(D,C)=>[L+D*B-C*P,N+D*P+C*B];if(s[w?"lineTo":"moveTo"](...V(-E,0)),s.bezierCurveTo(...V(-E+M,0),...V(-E+M+A,0),...V(-E+M+A+y,x)),m){const D=V(-m,m);s[s.absarc?"absarc":"arc"](...D,m,-Math.PI/2+v+G,-v+G,!1)}s.bezierCurveTo(...V(0,E-M-A),...V(0,E-M),...V(0,E))}),s.closePath()}const k0='-apple-system, BlinkMacSystemFont, "PingFang SC", "Segoe UI", "Microsoft YaHei UI", sans-serif',Ba="#f4f6f8",md="#aeb5bf",_A="#3b414a",is=(s,e=0)=>Number.isFinite(Number(s))?Number(s):e,q0={N:[["#9b9da6",0],["#9b9da6",1]],R:[["#a5afc1",.03],["#e0e6f1",.25],["#bac4d5",.43],["#f1f4fa",.49],["#afbccc",.6],["#d9dfe9",.87]],SR:[["#91b6e6",.04],["#b2b7f0",.3],["#d9b5e6",.48],["#a4dbdf",.66],["#b9b0eb",.94]],SSR:[["#c9a45f",.02],["#f4d795",.25],["#dfbc79",.42],["#fff0c5",.49],["#e9b7ad",.68],["#ebc475",.96]],UR:[["#e9a1ce",0],["#baa5ee",.2],["#8dc9ee",.38],["#98dfc8",.53],["#f3d68f",.72],["#f0acaf",.87],["#db9fe3",1]]};function yA(s,e={},i,r="#ffffff",l=0){const c=s.getContext("2d");if(!c)return;c.resetTransform(),c.clearRect(0,0,s.width,s.height),c.fillStyle="#000000",c.fillRect(0,0,s.width,s.height);const h=Math.min(s.width/350,s.height/258),d=s.width/h,m=s.height/h;c.save(),c.scale(h,h),c.save();const p=document.createElement("canvas");p.width=96,p.height=96;const v=p.getContext("2d"),g=v?.createImageData(96,96);if(v&&g){for(let q=0;q<g.data.length;q+=4){const Q=Math.floor((Math.sin(q*12.9898)*43758.5453%1+1)%1*255);g.data[q]=Q,g.data[q+1]=Q,g.data[q+2]=Q,g.data[q+3]=Q>124?16:8}v.putImageData(g,0,0)}const y=v&&c.createPattern(p,"repeat");y&&(c.globalAlpha=.08,c.fillStyle=y,c.fillRect(0,0,d,m)),c.restore();const x=(q,Q=400,F=k0)=>`${Q} ${q}px ${F}`,E=(q,Q,F,nt,Z=Ba,xt=400,vt=1/0,Nt="left",Qt=k0)=>{c.font=x(nt,xt,Qt),c.fillStyle=Z,c.textAlign=Nt,c.textBaseline="alphabetic";let ae=String(q??"");if(c.measureText(ae).width>vt){for(;ae.length>1&&c.measureText(`${ae}…`).width>vt;)ae=ae.slice(0,-1);ae+="…"}return c.fillText(ae,Q,F),c.measureText(ae).width},A=(q,Q,F,nt,Z=1/0,xt="left")=>{const vt=String(q||"N").toUpperCase(),Nt=q0[vt]||q0.N;c.font=x(nt,700,'Georgia, "Times New Roman", serif'),c.textAlign=xt,c.textBaseline="alphabetic";let Qt=vt;if(c.measureText(Qt).width>Z){for(;Qt.length>1&&c.measureText(`${Qt}…`).width>Z;)Qt=Qt.slice(0,-1);Qt+="…"}const ae=c.measureText(Qt).width,I=118*Math.PI/180,lt=Math.max(ae,nt*1.4),$=Math.cos(I)*lt,rt=Math.sin(I)*lt,Rt=c.createLinearGradient(Q-$*.5,F-nt-rt*.5,Q+$*.5,F-nt+rt*.5);if(Nt.forEach(([Dt,Ct])=>Rt.addColorStop(Ct,Dt)),c.fillStyle=Rt,c.fillText(Qt,Q,F),(vt==="SSR"||vt==="UR")&&l>0){const Dt=xt==="center"?Q-ae/2:Q,Ct=Math.max(ae*1.5,nt*2),Ut=Dt-Ct+l*(ae+Ct*2),Ht=c.createLinearGradient(Ut,F-nt,Ut+Ct,F);Ht.addColorStop(0,"rgba(255,255,255,0)"),Ht.addColorStop(.42,vt==="SSR"?"rgba(255,239,197,0.04)":"rgba(250,251,255,0.02)"),Ht.addColorStop(.5,vt==="SSR"?"rgba(255,240,197,0.86)":"rgba(250,251,255,0.72)"),Ht.addColorStop(.58,vt==="SSR"?"rgba(255,239,197,0.04)":"rgba(250,251,255,0.02)"),Ht.addColorStop(1,"rgba(255,255,255,0)"),c.save(),c.globalCompositeOperation="source-atop",c.fillStyle=Ht,c.fillText(Qt,Q,F),c.restore()}return ae},M=(q,Q,F)=>{c.beginPath(),c.moveTo(q,Q),c.lineTo(q,F),c.lineWidth=.7,c.strokeStyle=_A,c.stroke()},S=d-123,L=S+50;c.beginPath(),c.moveTo(S,-1),c.lineTo(S+100,-1),c.lineTo(S+100,166),c.lineTo(L,147),c.lineTo(S,166),c.closePath();const N=c.createLinearGradient(S,0,S+100,166);N.addColorStop(0,"#343941"),N.addColorStop(.46,"#24282f"),N.addColorStop(1,"#171a20"),c.fillStyle=N,c.fill(),c.lineWidth=.8,c.strokeStyle="#4b525d",c.beginPath(),c.moveTo(S+100,-1),c.lineTo(S+100,166),c.lineTo(L,147),c.lineTo(S,166),c.stroke(),c.save(),c.beginPath(),c.moveTo(S,-1),c.lineTo(S+100,-1),c.lineTo(S+100,166),c.lineTo(L,147),c.lineTo(S,166),c.closePath(),c.clip(),c.globalAlpha=.075,c.strokeStyle="#7f8986",c.lineWidth=.55;for(let q=-180;q<220;q+=11)c.beginPath(),c.moveTo(S+q,0),c.lineTo(S+q+170,166),c.stroke();c.globalAlpha=.045,c.strokeStyle="#ffffff";for(let q=-170;q<220;q+=18)c.beginPath(),c.moveTo(S+q,0),c.lineTo(S+q+170,166),c.stroke();c.restore();const w=Math.max(0,Math.min(5,Math.round(is(e.rankStars))));for(let q=0;q<5;q++)E(q<w?"★":"☆",L-28+q*14,30,11,q<w?Ba:"#b5bbb8",500,14,"center","Arial, sans-serif");if(i){const q=48/Math.max(i.width,i.height),Q=i.width*q,F=i.height*q;c.drawImage(i,L-Q/2,40,Q,F)}E(e.rankName||"浅滩钓手",L,105,12,Ba,700,86,"center");const G=Math.max(0,Math.min(100,is(e.rankProgress)));c.lineCap="round",c.lineWidth=4,c.beginPath(),c.moveTo(L-26,118),c.lineTo(L+26,118),c.strokeStyle="#b7b7b7",c.stroke(),G>0&&(c.beginPath(),c.moveTo(L-26,118),c.lineTo(L-26+52*G/100,118),c.strokeStyle=Ba,c.stroke()),E(`${G}/100`,L,132,10,Ba,400,80,"center"),c.beginPath(),X0(c,22,32,54,54,8),c.fillStyle="#363b44",c.fill(),E(String(e.avatar||"头像").slice(0,2),49,65,19,"#ffffff",600,48,"center"),E(e.nickname||"大鱼",83,52,20,Ba,700,S-93),E(e.bio||"",83,75,10,md,400,S-93);const B=m-66,P=(B-192)*.5;E("解锁鱼种",26,123+P,10,md);const V=Math.max(1,Math.round(is(e.totalSpecies,82))),D=Math.max(0,Math.min(V,Math.round(is(e.unlocked)))),C=E(D,20,161+P,32,Ba,600,110);E(`/${V}`,23+C,161+P,14,"#aeb1b5");const H=S-63;M(H-7,130+P,164+P),E("渔获",H,140+P,10,md),E(Math.max(0,Math.round(is(e.catches))),H,161+P,14,Ba,600,54);const st=["N","R","SR","SSR","UR"],ft=(d-10)/5;st.forEach((q,Q)=>{const F=22+Q*ft;M(F,B,B+34),q==="N"?E(q,F+5,B+10,14,"#9b9da6",700,ft-8,"left",'Georgia, "Times New Roman", serif'):A(q,F+5,B+10,14,ft-8);const nt=Math.max(0,Math.round(is(e.rarities?.[q]))),Z=Math.max(1,Math.round(is(e.rarityTotals?.[q],V))),xt=E(nt,F+5,B+30,14,Ba,700);E(`/${Z}`,F+5+xt+1,B+30,10,"#aeb1b5")}),c.restore()}function Y0(s,e,i={}){const r=s.getContext("2d");if(!r||(r.resetTransform(),r.clearRect(0,0,s.width,s.height),!e))return;const l=document.createElement("canvas");l.width=Math.round(s.width*460/350),l.height=Math.round(l.width*e.height/e.width);const c=l.getContext("2d");c.drawImage(e,0,0,l.width,l.height),c.globalCompositeOperation="source-in",c.fillStyle="#ffffff",c.fillRect(0,0,l.width,l.height),r.save(),r.translate(s.width/2,s.height*.65),r.rotate(-18*Math.PI/180),r.scale(1.08,1.08),r.fillStyle=r.createPattern(l,"repeat");const h=Math.hypot(s.width,s.height);if(r.fillRect(-h,-h,h*2,h*2),r.restore(),i.excludeRankPanel){const d=Math.min(s.width/350,s.height/258),p=s.width/d-123;r.save(),r.globalCompositeOperation="destination-out",r.beginPath(),r.moveTo(p*d,-1*d),r.lineTo((p+100)*d,-1*d),r.lineTo((p+100)*d,166*d),r.lineTo((p+50)*d,147*d),r.lineTo(p*d,166*d),r.closePath(),r.fill(),r.restore()}}const SA=`
uniform sampler2D logoMask;
uniform float logoStrength;
uniform float frontLogoMode;

vec3 logoSpectrum(float t) {
  float p = fract(t) * 6.0;
  vec3 a = vec3(1.0, 0.46, 0.44);
  vec3 b = vec3(1.0, 0.92, 0.38);
  vec3 c = vec3(0.67, 1.0, 0.38);
  vec3 d = vec3(0.52, 1.0, 0.97);
  vec3 e = vec3(0.48, 0.59, 1.0);
  vec3 f = vec3(0.66, 0.52, 1.0);
  if (p < 1.0) return mix(a, b, p);
  if (p < 2.0) return mix(b, c, p - 1.0);
  if (p < 3.0) return mix(c, d, p - 2.0);
  if (p < 4.0) return mix(d, e, p - 3.0);
  if (p < 5.0) return mix(e, f, p - 4.0);
  return mix(f, a, p - 5.0);
}
`,xA=`
if (logoStrength > 0.0) {
  float mask = texture2D(logoMask, vFoilUv).a;
  float paperLuma = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
  float paper = smoothstep(0.3, 0.88, paperLuma);
  float darkCard = 1.0 - smoothstep(0.12, 0.42, paperLuma);
  mask *= mix(1.0, max(paper, darkCard * 0.008), frontLogoMode);
  vec3 view = normalize(vViewPosition);
  vec2 tilt = vec2(dot(view, vFoilX), dot(view, vFoilY));
  float tiltEnergy = smoothstep(0.24, 0.78, clamp(length(tilt) * 1.8, 0.0, 1.0));
  vec2 p = vec2(vFoilUv.x, vFoilUv.y * foilAspect);
  float diagonal = p.x + p.y;
  float bands = 0.5 + 0.5 * sin(diagonal * 48.0 + tilt.x * 13.0 - tilt.y * 18.0);
  float sweep = pow(0.5 + 0.5 * cos(diagonal * 8.0 + tilt.x * 9.0 + tilt.y * 7.0), 12.0);
  vec3 rainbow = logoSpectrum(p.y * 1.7 + p.x * 0.32 + tilt.x * 0.65 - tilt.y * 0.8);
  vec3 silver = mix(vec3(0.53), rainbow, 0.36 + sweep * 0.3);
  silver *= 0.77 + 0.3 * bands;
  silver = mix(silver, vec3(1.1), sweep * 0.7);
  float logoMix = mask * logoStrength * mix(0.42, 0.54, frontLogoMode);
  logoMix += darkCard * tiltEnergy * logoStrength * 0.08;
  outgoingLight = mix(outgoingLight, silver, clamp(logoMix, 0.0, 1.0));
}
`,W0={portrait:[1.6,2.25],landscape:[3.5,2.58]},MA={left:.27,center:.5,right:.73},Yc=.018,ui=.007,xn=4,Z0=1/.05,EA=1/960,TA=2,Fa=72,K0=24,gd=.36,vd=.095,bA=.0135,Wc=.036,pl=.15,io=1024,AA=2048,RA=3,j0={glossy:{roughness:.42,metalness:0,clearcoat:1,clearcoatRoughness:.06,foil:0,anisotropy:0},matte:{roughness:.85,metalness:0,clearcoat:0,clearcoatRoughness:.6,foil:0,anisotropy:0},holographic:{roughness:.3,metalness:0,clearcoat:1,clearcoatRoughness:.04,foil:1,anisotropy:0},metallic:{roughness:.36,metalness:.75,clearcoat:.5,clearcoatRoughness:.18,foil:0,anisotropy:.7}},Zc=[0,.07,.93,1],CA=[-.95,-.28,.28,.95],wA=9,DA=`
varying vec2 vFoilUv;
varying vec3 vFoilX;
varying vec3 vFoilY;
`,UA=`
vFoilUv = uv;
vFoilX = normalize((modelViewMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xyz);
vFoilY = normalize((modelViewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
`,NA=`
uniform float foilStrength;
uniform float foilAspect;
uniform vec3 foilKey;
uniform vec3 foilFill;
uniform vec3 foilTop;
varying vec2 vFoilUv;
varying vec3 vFoilX;
varying vec3 vFoilY;

float foilHash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float foilBump(float t, float center, float width) {
  float x = (t - center) / width;
  return max(0.0, 1.0 - x * x);
}

vec3 foilSpectrum(float t) {
  return vec3(
    foilBump(t, 0.82, 0.32) + 0.4 * foilBump(t, 0.02, 0.12),
    foilBump(t, 0.5, 0.26),
    foilBump(t, 0.18, 0.24)
  );
}

vec3 foilGrating(float u, float spacing) {
  vec3 color = vec3(0.0);
  for (int m = 1; m <= 2; m++) {
    float order = float(m);
    float t = (spacing * abs(u) / order - 0.38) / 0.32;
    color += foilSpectrum(t) / order;
  }
  return color;
}

vec3 foilShard(vec2 p) {
  vec2 base = floor(p);
  float best = 9.0;
  float edge = 9.0;
  vec2 id = base;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 cell = base + vec2(float(i), float(j));
      vec2 site = cell + vec2(foilHash(cell), foilHash(cell + 7.31)) * 0.9 + 0.05;
      float d = length(site - p);
      if (d < best) {
        edge = best;
        best = d;
        id = cell;
      } else if (d < edge) {
        edge = d;
      }
    }
  }
  return vec3(foilHash(id + 3.17), foilHash(id + 11.73), edge - best);
}
`,LA=`
if (foilStrength > 0.0) {
  vec3 foilView = normalize(vViewPosition);
  vec3 foilNormal = normalize(normal);
  vec2 foilP = vec2(vFoilUv.x, vFoilUv.y * foilAspect);
  vec3 shard = foilShard(foilP * 26.0);
  vec2 ray = foilP - vec2(-1.6, 2.6 * foilAspect);
  float angle = atan(ray.y, ray.x) + (shard.x - 0.5) * 0.16;
  vec3 grating = normalize(vFoilX * cos(angle) + vFoilY * sin(angle));
  float spacing = 1.7 * (0.95 + shard.y * 0.1);
  vec3 rainbow = foilGrating(dot(foilKey + foilView, grating), spacing);
  rainbow += 0.6 * foilGrating(dot(foilTop + foilView, grating), spacing);
  rainbow *= 0.8 + 0.2 * smoothstep(0.0, 0.04, shard.z);
  rainbow = max(rainbow - 0.35 * min(rainbow.r, min(rainbow.g, rainbow.b)), 0.0);
  vec2 grid = foilP * 64.0;
  vec2 cell = floor(grid);
  vec2 jitter = vec2(foilHash(cell + 1.7), foilHash(cell + 9.2));
  float flake = smoothstep(0.32, 0.06, length(fract(grid) - jitter * 0.6 - 0.2)) * step(0.45, foilHash(cell + 4.4));
  vec3 facet = normalize(foilNormal + (vFoilX * (jitter.x - 0.5) + vFoilY * (jitter.y - 0.5)) * 0.8);
  float glint = pow(max(dot(reflect(-foilKey, facet), foilView), 0.0), 28.0);
  glint += 0.7 * pow(max(dot(reflect(-foilTop, facet), foilView), 0.0), 28.0);
  float fine = 1.0 - smoothstep(0.35, 0.9, max(fwidth(grid.x), fwidth(grid.y)));
  vec3 sparkle = flake * glint * fine * (vec3(0.7) + foilGrating(dot(foilKey + foilView, grating) + jitter.x * 0.4, spacing));
  float ink = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
  float foil = foilStrength * (0.08 + 0.92 * smoothstep(0.04, 0.7, ink));
  float facing = clamp(dot(foilNormal, foilView), 0.0, 1.0);
  float tint = clamp(dot(rainbow, vec3(0.4)), 0.0, 1.0);
  outgoingLight = outgoingLight * (1.0 - foil * (0.3 + 0.32 * tint)) + (rainbow * 0.62 * (0.4 + 0.6 * facing) + sparkle * 1.6) * foil;
}
`,Q0={silver:{color:"#d9dce2",roughness:.16},gold:{color:"#e4b965",roughness:.2},graphite:{color:"#4d4f55",roughness:.28}},Nn=(s,e,i)=>Math.min(i,Math.max(e,s)),ml=(s,e,i)=>s+(e-s)*i,J0=s=>Math.atan2(Math.sin(s),Math.cos(s)),Kc=(s,e)=>{try{const i=document.createElement("canvas").getContext("2d");if(!i)return e;i.fillStyle="#000000",i.fillStyle=s;const r=i.fillStyle;if(r.startsWith("#")){const c=parseInt(r.slice(1),16);return[(c>>16&255)/255,(c>>8&255)/255,(c&255)/255]}const l=r.match(/[\d.]+/g);return!l||l.length<3?e:[Number(l[0])/255,Number(l[1])/255,Number(l[2])/255]}catch{return e}},OA=s=>.2126*s[0]+.7152*s[1]+.0722*s[2],gl=(s,e=1)=>`rgba(${Math.round(s[0]*255)}, ${Math.round(s[1]*255)}, ${Math.round(s[2]*255)}, ${e})`,$0=s=>{let e=s>>>0;return()=>{e=e+1831565813>>>0;let i=e;return i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296}},_d=(s,e,i,r,l,c)=>{const h=Math.max(0,Math.min(c,r/2,l/2)),d=h*.4477;s.moveTo(e+h,i),s.lineTo(e+r-h,i),s.bezierCurveTo(e+r-d,i,e+r,i+d,e+r,i+h),s.lineTo(e+r,i+l-h),s.bezierCurveTo(e+r,i+l-d,e+r-d,i+l,e+r-h,i+l),s.lineTo(e+h,i+l),s.bezierCurveTo(e+d,i+l,e,i+l-d,e,i+l-h),s.lineTo(e,i+h),s.bezierCurveTo(e,i+d,e+d,i,e+h,i)},vl=(s,e)=>{if(!e)return Promise.resolve(null);const i=s.get(e);if(i)return i;const r=new Promise(l=>{const c=new Image;String(e).startsWith("data:")||(c.crossOrigin="anonymous"),c.decoding="async",c.onload=()=>l(c),c.onerror=()=>l(null),c.src=e});return s.set(e,r),r},tv=(s,e,i,r,l=0)=>{const c=W0[s]||W0.portrait,h=Number.isFinite(Number(i))?Nn(Number(i),.8,4.5):c[0],d=Number.isFinite(Number(r))?Nn(Number(r),1,5.5):c[1],m=ml(.03,Math.min(h,d)*.2,Nn(e,0,1)),p=Math.min(h/350,d/258),v={width:40*p,height:8*p,y:d/2-14*p},g=v.y+vd*.65;return{width:h,height:d,radius:m,cornerSmoothing:l,slot:v,ringY:g,hangY:g+vd}},zA=s=>{const{width:e,height:i,radius:r,cornerSmoothing:l,slot:c}=s,h=new zc;(l?X0:_d)(h,-e/2+ui,-i/2+ui,e-ui*2,i-ui*2,Math.max(r-ui,.005),l);const m=new td;_d(m,-c.width/2-ui,c.y-c.height/2-ui,c.width+ui*2,c.height+ui*2,c.height/2+ui),h.holes.push(m);const p=new Bc(h,{depth:Yc,bevelEnabled:!0,bevelThickness:ui,bevelSize:ui,bevelSegments:5,curveSegments:24});p.translate(0,0,-Yc/2);const v=new id(h,24),g=v.getAttribute("position"),y=v.getAttribute("uv");for(let x=0;x<g.count;x++)y.setXY(x,(g.getX(x)+e/2)/e,(g.getY(x)+i/2)/i);return y.needsUpdate=!0,{body:p,face:v}},ev=s=>{const e=new zc,i=s*1.16;_d(e,-i/2+.014,-pl/2+.014,i-.028,pl-.028,.024);const r=new Bc(e,{depth:.02,bevelEnabled:!0,bevelThickness:.014,bevelSize:.014,bevelSegments:6,curveSegments:10});return r.translate(0,0,-.01),r},PA=s=>{const e=Zc.length,i=new Qi;i.setAttribute("position",new xi(new Float32Array(s*e*3),3)),i.setAttribute("normal",new xi(new Float32Array(s*e*3),3)),i.setAttribute("uv",new xi(new Float32Array(s*e*2),2));const r=[];for(let l=0;l<s-1;l++)for(let c=0;c<e-1;c++){const h=l*e+c;r.push(h,h+e,h+1,h+1,h+e,h+e+1)}return i.setIndex(r),i},IA=s=>{const e=new qg;e.background=new Re(.035,.035,.04);const i=new hl(1,1),r=[],l=(d,m,p,v=0)=>{const g=new Vh({color:new Re(d,d,d),side:qi});r.push(g);const y=new Fn(i,g);y.position.set(...m),y.scale.set(p[0],p[1],1),y.lookAt(0,0,0),y.rotateZ(v),e.add(y)};l(2.6,[0,4.5,8],[9,4]),l(6,[-5.5,.5,7],[.9,14]),l(4,[5,-.5,8],[.6,14]),l(3.5,[0,-1,9],[24,.35],Math.PI/3),l(2.5,[1,2.5,9],[24,.2],Math.PI/3),l(1.4,[0,6,-6],[12,4]),l(.5,[0,-7,1],[16,6]),l(.9,[8,0,-2],[4,10]);const c=new fd(s),h=c.fromScene(e,.035);return c.dispose(),i.dispose(),r.forEach(d=>d.dispose()),h},Ha=(s,e)=>{const i=new Wh(s);return i.colorSpace=ei,i.anisotropy=e,i.generateMipmaps=!0,i.minFilter=Ca,i.magFilter=Ui,i},BA=()=>{const e=document.createElement("canvas");e.width=128,e.height=128;const i=e.getContext("2d");if(!i)return new Wh(e);const r=$0(7),l=Float32Array.from({length:16384},()=>r()),c=(m,p)=>{let v=0;for(let g=-1;g<=1;g++)for(let y=-1;y<=1;y++)v+=l[(p+g+128)%128*128+(m+y+128)%128];return v/9*1.6},h=i.createImageData(128,128);for(let m=0;m<128;m++)for(let p=0;p<128;p++){const v=c((p-1+128)%128,m)-c((p+1)%128,m),g=c(p,(m-1+128)%128)-c(p,(m+1)%128),y=Math.hypot(v,g,1),x=(m*128+p)*4;h.data[x]=(v/y*.5+.5)*255,h.data[x+1]=(g/y*.5+.5)*255,h.data[x+2]=(1/y*.5+.5)*255,h.data[x+3]=255}i.putImageData(h,0,0);const d=new Wh(e);return d.wrapS=sr,d.wrapT=sr,d.repeat.set(5,7),d},FA=()=>{const i=$0(19),r=Float32Array.from({length:16384},()=>i()),l=m=>Math.sqrt(Math.max(0,1-4*m*m)),c=(m,p)=>{const v=(m%128+128)%128,g=(p%128+128)%128,y=v/128*8,x=g/128*8,E=Math.floor(y),A=Math.floor(x),M=y-E-.5,S=x-A-.5,L=(E+A)%2===0,N=l(M)*(.55+.45*Math.cos(S*Math.PI*(L?1:.6))),w=l(S)*(.55+.45*Math.cos(M*Math.PI*(L?.6:1)));return(L?Math.max(N,w*.7):Math.max(w,N*.7))+r[g*128+v]*.08},h=new Uint8Array(16384*4);for(let m=0;m<128;m++)for(let p=0;p<128;p++){const v=(c(p-1,m)-c(p+1,m))*1.6,g=(c(p,m-1)-c(p,m+1))*1.6,y=Math.hypot(v,g,1),x=(m*128+p)*4;h[x]=(v/y*.5+.5)*255,h[x+1]=(g/y*.5+.5)*255,h[x+2]=(1/y*.5+.5)*255,h[x+3]=255}const d=new bM(h,128,128);return d.wrapS=sr,d.wrapT=sr,d.magFilter=Ui,d.minFilter=Ca,d.generateMipmaps=!0,d.needsUpdate=!0,d},HA=(s,e,i,r,l)=>{const c=(l==="contain"?Math.min:Math.max)(i/e.width,r/e.height),h=e.width*c,d=e.height*c;s.drawImage(e,(i-h)/2,(r-d)/2,h,d)},yd=(s,e,i,r,l,c,h,d=0)=>{const m=s.getContext("2d");m&&(m.resetTransform(),m.clearRect(0,0,s.width,s.height),m.fillStyle=gl(i),m.fillRect(0,0,s.width,s.height),e&&HA(m,e,s.width,s.height,r),l&&c==="front"&&yA(s,l,h,gl(i),d))},VA=(s,e,i)=>{const l=e?Math.max(64,Math.round(e.width/e.height*192)):384;s.width=192,s.height=l;const c=s.getContext("2d");if(!c)return l/192;if(c.fillStyle=gl(i),c.fillRect(0,0,192,l),e)return c.save(),c.translate(192,0),c.rotate(Math.PI/2),c.drawImage(e,0,0,l,192),c.restore(),l/192;const h=OA(i)>.5?[0,0,0]:[1,1,1];c.fillStyle=gl(h,.05);for(let d=0;d<l;d+=4)c.fillRect(0,d,192,1);c.fillStyle=gl(h,.2);for(let d=0;d<l;d+=14)c.fillRect(192*.075,d,2,8),c.fillRect(192*.925-2,d,2,8);return l/192},GA=()=>{const s=()=>Array.from({length:xn+1},()=>new Y);return{nodes:s(),previous:s(),velocities:s(),lengths:new Float64Array(xn),impulses:new Float64Array(xn),rest:1,anchor:new Y,body:{position:new Y,previous:new Y,velocity:new Y,quaternion:new Da,previousQuaternion:new Da,angular:new Y,mass:1,inverseInertia:new Y(1,1,1),hang:new Y},grab:null,turn:0,twist:0,twistRaw:0,sensor:{tiltX:0,tiltZ:0,motionX:0,motionZ:0,targetTiltX:0,targetTiltZ:0,targetMotionX:0,targetMotionZ:0},calm:0}},qe={a:new Y,b:new Y,c:new Y,d:new Y,e:new Y,f:new Y,g:new Y,pin:new Y,q:new Da,r:new Da},Sd=(s,e,i)=>(qe.r.copy(s.quaternion).invert(),i.copy(e).applyQuaternion(qe.r),i.set(i.x*s.inverseInertia.x,i.y*s.inverseInertia.y,i.z*s.inverseInertia.z),i.applyQuaternion(s.quaternion)),nv=(s,e)=>{const{x:i,y:r,z:l,w:c}=s;s.x+=.5*(e.x*c+e.y*l-e.z*r),s.y+=.5*(e.y*c+e.z*i-e.x*l),s.z+=.5*(e.z*c+e.x*r-e.y*i),s.w+=.5*(-e.x*i-e.y*r-e.z*l),s.normalize()},iv=(s,e,i)=>{const r=qe.c.crossVectors(e,i);return 1/s.mass+r.dot(Sd(s,r,qe.d))},av=(s,e,i)=>{s.position.addScaledVector(i,1/s.mass),nv(s.quaternion,Sd(s,qe.e.crossVectors(e,i),qe.f))},XA=(s,e,i,r)=>{const{nodes:l,body:c}=s,h=l[e],d=e===0?0:Z0,m=e===xn-1,p=qe.g;let v=l[e+1];m&&(p.copy(c.hang).applyQuaternion(c.quaternion),v=qe.b.copy(c.position).add(p));const g=qe.a.subVectors(v,h),y=g.length(),x=y-s.rest;if(x<=0||y<1e-9)return;const E=g.divideScalar(y),A=m?iv(c,p,E):Z0,M=(y-s.lengths[e])/i,L=(r.hold*Math.tanh(r.stiffness*x/r.hold)+r.spring*x+r.bandDamping*Math.max(0,M))*i*i-s.impulses[e];if(L<=0)return;const N=Math.min(x/(d+A),L);s.impulses[e]+=N,d&&h.addScaledVector(E,N*d),m?av(c,p,E.multiplyScalar(-N)):v.addScaledVector(E,-N*A)},kA=(s,e,i)=>{const r=qe.g.copy(e.local).applyQuaternion(s.quaternion),l=qe.a.copy(i).sub(s.position).sub(r),c=l.length();if(c<1e-9)return;const h=l.divideScalar(c),d=c/iv(s,r,h);av(s,r,h.multiplyScalar(d))},rv=(s,e,i)=>{const{nodes:r,previous:l,velocities:c,body:h,anchor:d}=s;r[0].copy(d);for(let p=1;p<=xn;p++)r[p].copy(r[p-1]),r[p].y-=s.rest;h.quaternion.identity(),h.hang.set(0,e.hangY,0);const m=qe.a.copy(h.hang).applyQuaternion(h.quaternion);h.position.copy(r[xn]).sub(m),h.previous.copy(h.position),h.previousQuaternion.copy(h.quaternion),h.velocity.set(0,0,0),h.angular.set(0,0,0);for(let p=0;p<=xn;p++)l[p].copy(r[p]),c[p].set(0,0,0);s.lengths.fill(s.rest),s.turn=0,s.twist=0,s.twistRaw=0,s.sensor.targetTiltX=0,s.sensor.targetTiltZ=0,s.sensor.targetMotionX=0,s.sensor.targetMotionZ=0,s.sensor.tiltX=0,s.sensor.tiltZ=0,s.sensor.motionX=0,s.sensor.motionZ=0,s.calm=0},qA=(s,e,i)=>{s.rest=i/xn;const{width:r,height:l}=e,c=s.body,h=Yc+ui*2;c.mass=1,c.inverseInertia.set(12/(l*l+h*h),12/(r*r+h*h),12/(r*r+l*l)),c.hang.set(0,e.hangY,0)},YA=(s,e,i,r)=>{const l=Math.max(1,Math.ceil(e/EA-1e-6)),c=e/l,{nodes:h,previous:d,velocities:m,body:p}=s,v=i.breeze*(Math.sin(r*.53)*.7+Math.sin(r*1.31+1.7)*.3)*3,g=i.breeze*Math.sin(r*.37+.6)*2,y=s.grab,x=qe.pin,E=Math.exp(-i.nodeDrag*c),A=Math.exp(-i.linearDrag*c),M=Math.exp(-i.angularDrag*c),S=s.sensor;for(let N=0;N<l;N++){const w=1-Math.exp(-7*c);S.tiltX+=(i.mobileTiltX-S.tiltX)*w,S.tiltZ+=(i.mobileTiltZ-S.tiltZ)*w,S.motionX+=(i.mobileMotionX-S.motionX)*Math.min(1,12*c),S.motionZ+=(i.mobileMotionZ-S.motionZ)*Math.min(1,12*c);const G=S.tiltX*7+S.motionX*18,B=S.tiltZ*5+S.motionZ*14;for(let q=1;q<xn;q++){const Q=m[q];Q.y-=i.gravity*c,Q.x+=(v+G)*c,Q.z+=(g+B)*c,d[q].copy(h[q]),h[q].addScaledVector(Q,c)}p.previous.copy(p.position),p.previousQuaternion.copy(p.quaternion);const P=p.quaternion;if(y){const q=qe.q.copy(y.rotation).multiply(qe.r.copy(P).invert());q.w<0&&q.set(-q.x,-q.y,-q.z,-q.w);const Q=qe.a.set(q.x,q.y,q.z).multiplyScalar(2*i.grip);Q.addScaledVector(p.angular,-i.gripDamping),p.angular.addScaledVector(Sd(p,Q,qe.b),c)}const V=qe.a.set(0,1,0).applyQuaternion(P),D=qe.b.set(-V.x*V.z,-V.y*V.z,1-V.z*V.z);if(D.lengthSq()>.001){const q=qe.d.set(0,0,1).applyQuaternion(P),Q=Math.atan2(qe.e.crossVectors(D,q).dot(V),D.dot(q));let F=Q-s.twistRaw;F>Math.PI?F-=Math.PI*2:F<-Math.PI&&(F+=Math.PI*2),s.twist+=F,s.twistRaw=Q}if(!y){const q=p.angular.dot(V),Q=J0(s.turn-s.twist);p.angular.addScaledVector(V,(i.twist*Q-i.twistDamping*q)*c)}p.velocity.y-=i.gravity*c,p.velocity.x+=(v+G)*.35*c,p.velocity.z+=(g+B)*.35*c,p.angular.x+=S.tiltZ*.32*c,p.angular.z-=S.tiltX*.32*c,p.position.addScaledVector(p.velocity,c),nv(p.quaternion,qe.f.copy(p.angular).multiplyScalar(c)),s.impulses.fill(0),y&&x.lerpVectors(y.from,y.target,(N+1)/l);for(let q=0;q<TA;q++){for(let Q=0;Q<xn;Q++)XA(s,Q,c,i);y&&kA(p,y,x)}for(let q=1;q<xn;q++){const Q=m[q].subVectors(h[q],d[q]).divideScalar(c).multiplyScalar(E);Q.multiplyScalar(1/(1+i.nodeAir*Q.length()*c))}p.velocity.subVectors(p.position,p.previous).divideScalar(c);const C=qe.q.copy(p.previousQuaternion).invert().premultiply(p.quaternion);p.angular.set(C.x,C.y,C.z).multiplyScalar(2/c*(C.w<0?-1:1));const H=qe.a.set(0,0,1).applyQuaternion(p.quaternion),st=p.velocity.dot(H),ft=qe.b.copy(p.velocity).addScaledVector(H,-st);ft.multiplyScalar(1/(1+i.air*ft.length()*c)),p.velocity.copy(ft).addScaledVector(H,st/(1+i.broadside*Math.abs(st)*c)).multiplyScalar(A),p.angular.multiplyScalar(M/(1+i.spinAir*p.angular.length()*c)),p.velocity.lengthSq()>3600&&p.velocity.setLength(60),p.angular.lengthSq()>1600&&p.angular.setLength(40),h[xn].copy(p.hang).applyQuaternion(p.quaternion).add(p.position);for(let q=0;q<xn;q++)s.lengths[q]=h[q].distanceTo(h[q+1])}y&&y.from.copy(y.target);let L=p.velocity.lengthSq()+p.angular.lengthSq()*.3;for(let N=1;N<xn;N++)L+=m[N].lengthSq()*.05;s.calm=L<2e-4?s.calm+e:0},WA=({frontImage:s,backImage:e,frontData:i,backData:r,imageFit:l="cover",cardColor:c="#ffffff",orientation:h="portrait",finish:d="glossy",logoStrength:m=.8,cardWidth:p,cardHeight:v,cornerRadius:g=.3,cornerSmoothing:y=0,size:x=.6,anchor:E="center",strapLength:A=.5,strapImage:M,logoImage:S="/assets/yukomon-pixel-logo.svg",assetBase:L="/assets",strapColor:N="#111111",strapWidth:w=.65,metal:G="silver",gravity:B=1,damping:P=.5,elasticity:V=.5,breeze:D=.5,interactive:C=!0,intro:H=!0,enableMobileTilt:st=!1,onError:ft,className:q="",style:Q})=>{const F=ws.useRef(null),nt=ws.useRef(null),Z=ws.useRef(null);return nt.current={frontImage:s,backImage:e,frontData:i,backData:r,imageFit:l==="contain"?"contain":"cover",cardColor:c,orientation:h==="landscape"?"landscape":"portrait",finish:d,logoStrength:m,cardWidth:p,cardHeight:v,cornerRadius:g,cornerSmoothing:y,size:x,anchor:E,strapLength:A,strapImage:M,logoImage:S,assetBase:L,strapColor:N,strapWidth:w,metal:G,gravity:B,damping:P,elasticity:V,breeze:D,interactive:C,intro:H,enableMobileTilt:st},ws.useEffect(()=>{Z.current?.()}),ws.useEffect(()=>{const xt=F.current;if(!xt)return;let vt;try{vt=new vA({antialias:!0,alpha:!0,powerPreference:"high-performance"})}catch{ft?.();return}vt.setClearColor(0,0),vt.outputColorSpace=ei,vt.toneMapping=ag,vt.toneMappingExposure=1;const Nt=vt.domElement;Nt.className="lanyard-canvas",Nt.setAttribute("aria-hidden","true"),xt.appendChild(Nt);const Qt=Math.min(16,vt.capabilities.getMaxAnisotropy()),ae=new qg,I=IA(vt);ae.environment=I.texture;const lt=new Li(K0,1,.1,200),$=new f0(16777215,1.6);$.position.set(-2.5,4,6);const rt=new f0(16777215,.35);rt.position.set(3,-1,4),ae.add($,rt);const Rt=new Map,Dt={front:null,back:null,strap:null,logo:null,rank:null},Ct=document.createElement("canvas"),Ut=document.createElement("canvas"),Ht=document.createElement("canvas"),z=document.createElement("canvas"),wt=document.createElement("canvas");let yt=Ha(Ct,Qt),gt=Ha(Ut,Qt),pt=Ha(Ht,Qt),Tt=Ha(z,Qt);const At=Ha(wt,Qt);At.wrapS=or,At.wrapT=sr;const Bt=BA(),fe=FA(),ce={foilStrength:{value:0},foilAspect:{value:1.4},foilKey:{value:new Y},foilFill:{value:new Y},foilTop:{value:new Y}},U={logoMask:{value:Tt},logoStrength:{value:.28},frontLogoMode:{value:1}},T={logoMask:{value:pt},logoStrength:{value:.8},frontLogoMode:{value:0}},et={printFidelity:{value:0}},dt=(ht,Ft=null)=>{Object.assign(ht.uniforms,ce),Object.assign(ht.uniforms,Ft==="front"?U:Ft==="back"?T:et),ht.vertexShader=ht.vertexShader.replace("#include <common>",`#include <common>
${DA}`).replace("#include <project_vertex>",`#include <project_vertex>
${UA}`),ht.fragmentShader=ht.fragmentShader.replace("#include <common>",`#include <common>
${NA}
${Ft?SA:"uniform float printFidelity;"}`).replace("#include <opaque_fragment>",`${Ft?"":"outgoingLight = mix(outgoingLight, diffuseColor.rgb, printFidelity);"}
${LA}
${Ft?xA:""}
#include <opaque_fragment>`)},Et=new Hc({map:yt,normalMap:Bt,normalScale:new qt(.06,.06)}),mt=new Hc({map:gt,normalMap:Bt,normalScale:new qt(.06,.06)});Et.onBeforeCompile=ht=>dt(ht,"front"),mt.onBeforeCompile=ht=>dt(ht,"back"),Et.customProgramCacheKey=()=>"lanyard-front-logo",mt.customProgramCacheKey=()=>"lanyard-back-logo";const Zt=new Hc,It=new o0({metalness:1}),ee=new Hc({map:At,normalMap:fe,normalScale:new qt(.7,.7),roughness:.68,sheen:1,sheenRoughness:.42,sheenColor:new Re(.32,.32,.34),side:qi}),$t=new Js,Ot=new Fn(void 0,Zt),Xt=new Fn(void 0,Et),se=new Fn(void 0,mt),ie=new Fn(new Fc(vd,bA,18,72),It);ie.rotation.y=Math.PI/2-.7,$t.add(Ot,Xt,se,ie),ae.add($t);const Yt=PA(Fa),ge=new Fn(Yt,ee);ge.frustumCulled=!1,ae.add(ge);const X=new Js,zt=new Fn(ev(gd),It);zt.position.y=Wc+pl/2-.004;const Vt=new Fn(new Fc(Wc,.0105,14,40),It);X.add(zt,Vt),ae.add(X);const Mt=GA(),Lt=[],bt=new Y,ne=new Y,me=new Zg(Lt,!1,"centripetal"),Me={width:1,height:1};let de=tv("portrait",.3,1.6,2.25);const Pe={pixelRatio:1,stretch:1};let cn=io,an={},Jn=gd,Va=2,ma=0,Ji=performance.now(),Oi=0,fi=!0,Cn=!0,$i=!1,zi=!1,hi=null,ao=0,rs=0,ta=0;const ea=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,ss=()=>{if(ea)return!1;const ht=nt.current.frontData?.rarities||{};return Object.hasOwn(ht,"SSR")||Object.hasOwn(ht,"UR")},R=()=>{const ht=nt.current,Ft=Kc(ht.cardColor,[1,1,1]),Ue=cn,ze=Math.round(Ue*de.height/de.width),tn=Math.round(io*de.height/de.width);(Ct.width!==Ue||Ct.height!==ze||Ut.height!==tn)&&(Ct.width=Ue,Ct.height=ze,Ut.width=io,Ut.height=tn,Ht.width=io,Ht.height=tn,z.width=io,z.height=tn,yt.dispose(),gt.dispose(),pt.dispose(),Tt.dispose(),yt=Ha(Ct,Qt),gt=Ha(Ut,Qt),pt=Ha(Ht,Qt),Tt=Ha(z,Qt),Et.map=yt,mt.map=gt,U.logoMask.value=Tt,T.logoMask.value=pt),yd(Ct,Dt.front,Ft,ht.imageFit,ht.frontData,"front",Dt.rank),yd(Ut,Dt.back,Ft,ht.imageFit,null,"back",null),Y0(Ht,Dt.logo),Y0(z,Dt.logo,{excludeRankPanel:!0}),yt.needsUpdate=!0,gt.needsUpdate=!0,pt.needsUpdate=!0,Tt.needsUpdate=!0,De(),ct()},J=ht=>{if(!ss()||ht-rs<84)return;const Ft=nt.current,Ue=Kc(Ft.cardColor,[0,0,0]);yd(Ct,Dt.front,Ue,Ft.imageFit,Ft.frontData,"front",Dt.rank,ht%7600/7600),yt.needsUpdate=!0,rs=ht},ct=()=>{if(ta||!fi||!Cn||!ss())return;const ht=Ft=>{ta=0,!(!Cn||!fi||!ss())&&(J(Ft),ta=requestAnimationFrame(ht))};ta=requestAnimationFrame(ht)},ut=()=>{const ht=nt.current;Va=VA(wt,Dt.strap,Kc(ht.strapColor,[.07,.07,.07])),fe.repeat.set(2,2*Va),At.dispose(),At.needsUpdate=!0,De()},tt=()=>{const ht=nt.current,Ft=Me.width/Me.height;let Ue=de.height/Nn(ht.size,.15,.9);const ze=de.width/(Me.width<=420?.98:.72);Ue*Ft<ze&&(Ue=ze/Ft);const tn=Ue*Ft,$n=Me.width*de.width/tn*Pe.stretch*Pe.pixelRatio;cn=Nn(Math.ceil($n*1.25/64)*64,io,AA),lt.aspect=Ft,lt.position.set(0,0,Ue/2/Math.tan(K0*Math.PI/360)),lt.lookAt(0,0,0),lt.updateProjectionMatrix(),lt.updateMatrixWorld(),ce.foilKey.value.set(-2.5,4,6).normalize().transformDirection(lt.matrixWorldInverse),ce.foilFill.value.set(3,-1,4).normalize().transformDirection(lt.matrixWorldInverse),ce.foilTop.value.set(.5,4.5,8).normalize().transformDirection(lt.matrixWorldInverse);const _n=((MA[ht.anchor]??.5)-.5)*tn,ia=Ue/2+.2,Ln=Ue/2-Ue*ml(.04,.34,Nn(ht.strapLength,0,1))+(de.hangY-de.height/2);Mt.anchor.set(_n,ia,0),qA(Mt,de,ia-Ln),Mt.nodes[0].copy(Mt.anchor),Mt.previous[0].copy(Mt.anchor)},Pt=()=>{const ht=nt.current,Ft=`${ht.orientation}|${ht.cardWidth}|${ht.cardHeight}|${ht.cornerRadius}|${ht.cornerSmoothing}`,Ue=Ft!==an.layoutKey;if(Ue){de=tv(ht.orientation,ht.cornerRadius,ht.cardWidth,ht.cardHeight,ht.cornerSmoothing);const hn=zA(de);Ot.geometry.dispose(),Xt.geometry.dispose(),se.geometry.dispose(),Ot.geometry=hn.body,Xt.geometry=hn.face,se.geometry=hn.face.clone(),Xt.position.z=Yc/2+ui+6e-4,se.rotation.y=Math.PI,se.position.z=-.0166,ie.position.set(0,de.ringY,0),an.framingKey=""}const ze=`${Ft}|${ht.size}|${ht.anchor}|${ht.strapLength}|${Me.width}|${Me.height}|${Pe.pixelRatio}|${Pe.stretch}`;ze!==an.framingKey&&(tt(),(!$i||Ue)&&(Mt.grab=null,rv(Mt,de,!$i&&ht.intro&&!ea),$i=!0));const tn=Math.max(0,Math.min(7,Math.round(Number(ht.frontData?.rankIndex)||0))),_n=`${String(ht.assetBase||"/assets").replace(/\/$/,"")}/rank-badges/rank-${tn+1}.png`,ia=`${ht.frontImage}|${ht.backImage}|${ht.strapImage}|${ht.logoImage}|${_n}`;if(ia!==an.imageKey){const hn=++ao;Promise.all([vl(Rt,ht.frontImage),vl(Rt,ht.backImage),vl(Rt,ht.strapImage),vl(Rt,ht.logoImage),vl(Rt,_n)]).then(([os,On,Gn,Qe,Pi])=>{!Cn||hn!==ao||(Dt.front=os,Dt.back=On,Dt.strap=Gn,Dt.logo=Qe,Dt.rank=Pi,R(),ut())})}const gr=`${Ft}|${cn}|${ht.cardColor}|${ht.imageFit}|${JSON.stringify(ht.frontData)}|${JSON.stringify(ht.backData)}`;gr!==an.faceKey&&R(),ht.strapColor!==an.strapColor&&ut();const Ln=j0[ht.finish]||j0.glossy,Xa=Kc(ht.cardColor,[1,1,1]);[Et,mt].forEach(hn=>{hn.roughness=Ln.roughness,hn.metalness=Ln.metalness,hn.clearcoat=Ln.clearcoat,hn.clearcoatRoughness=Ln.clearcoatRoughness,hn.anisotropy=Ln.anisotropy}),Et.clearcoat=Ln.clearcoat*.15,Et.specularIntensity=.15,et.printFidelity.value=ht.frontData?.96:0,Et.toneMapped=!ht.frontData,ce.foilStrength.value=Ln.foil,ce.foilAspect.value=de.height/de.width;const ro=Nn(ht.logoStrength,0,1);U.logoStrength.value=ro*.78,T.logoStrength.value=ro,Zt.color.setRGB(Xa[0]*.92,Xa[1]*.92,Xa[2]*.92,ei),Zt.roughness=Math.min(Ln.roughness,.35),Zt.metalness=Ln.metalness,Zt.clearcoat=1,Zt.clearcoatRoughness=.08;const Vn=Q0[ht.metal]||Q0.silver;It.color.set(Vn.color),It.roughness=Vn.roughness,Jn=gd*Nn(ht.strapWidth,.4,2),Jn!==an.strapScale&&(zt.geometry.dispose(),zt.geometry=ev(Jn)),Nt.style.touchAction=ht.interactive?"pan-y":"auto",an={layoutKey:Ft,framingKey:ze,imageKey:ia,faceKey:gr,strapColor:ht.strapColor,strapScale:Jn},De()},kt=Array.from({length:Fa},()=>new Y),jt=Array.from({length:Fa},()=>new Y),Gt=CA.map(ht=>[Math.cos(ht),Math.sin(ht)]),Jt={tangent:new Y,toCamera:new Y,basis:new sn,up:new Y,across:new Y,facing:new Y,end:new Y},he=()=>{const ht=Mt.nodes[xn],Ft=Wc+pl+.05;let Ue=xn-1;for(;Ue>0&&Mt.nodes[Ue].distanceTo(ht)<Ft*1.1;)Ue--;const ze=Jt.up.subVectors(Mt.nodes[Ue],ht);ze.lengthSq()<1e-8&&ze.set(0,1,0).applyQuaternion(Mt.body.quaternion),ze.normalize(),bt.copy(ht).addScaledVector(ze,Ft),ne.copy(ht).addScaledVector(ze,Wc+pl*.35),Lt.length=0;for(let Qe=0;Qe<=Ue;Qe++)Lt.push(Mt.nodes[Qe]);Lt.push(bt,ne),me.updateArcLengths();for(let Qe=0;Qe<Fa;Qe++)me.getPointAt(Qe/(Fa-1),kt[Qe]);const tn=me.getLength(),$n=1-bt.distanceTo(ne)/Math.max(tn,.001),_n=Yt.getAttribute("position"),ia=Yt.getAttribute("normal"),gr=Yt.getAttribute("uv"),Ln=Zc.length,Xa=Mt.rest*xn,ro=Xa/(Jn*Va),Vn=Jn/Math.pow(Math.max(1,tn/Math.max(Xa,.001)),.35),{tangent:hn,toCamera:os,across:On,facing:Gn}=Jt;for(let Qe=0;Qe<Fa;Qe++){hn.subVectors(kt[Math.min(Fa-1,Qe+1)],kt[Math.max(0,Qe-1)]),hn.lengthSq()<1e-12&&hn.set(0,-1,0),hn.normalize(),os.subVectors(lt.position,kt[Qe]).normalize();const Pi=jt[Qe].crossVectors(os,hn);Pi.lengthSq()<1e-10&&Pi.copy(Qe>0?jt[Qe-1]:qe.a.set(1,0,0)),Pi.normalize(),Qe>0&&Pi.dot(jt[Qe-1])<0&&Pi.negate();const Qc=-Nn(J0(Mt.twist),-Math.PI*.82,Math.PI*.82)*Math.pow(Math.min(1,Qe/(Fa-1)/$n),1.3);Gn.crossVectors(hn,Pi),On.copy(Pi).multiplyScalar(Math.cos(Qc)).addScaledVector(Gn,Math.sin(Qc)),Gn.crossVectors(hn,On);const so=kt[Qe],Jc=(1-Qe/(Fa-1))*ro;for(let ga=0;ga<Ln;ga++){const _l=Qe*Ln+ga,yl=(Zc[ga]-.5)*Vn,[vr,di]=Gt[ga];_n.setXYZ(_l,so.x+On.x*yl,so.y+On.y*yl,so.z+On.z*yl),ia.setXYZ(_l,Gn.x*vr+On.x*di,Gn.y*vr+On.y*di,Gn.z*vr+On.z*di),gr.setXY(_l,Zc[ga],Jc)}}Jt.end.copy(On),_n.needsUpdate=!0,ia.needsUpdate=!0,gr.needsUpdate=!0,On.copy(Jt.end).addScaledVector(ze,-Jt.end.dot(ze)).normalize(),Gn.crossVectors(On,ze).normalize(),Jt.basis.makeBasis(On,ze,Gn),X.quaternion.setFromRotationMatrix(Jt.basis),X.position.copy(ht)},le=()=>{$t.position.copy(Mt.body.position),$t.quaternion.copy(Mt.body.quaternion),he(),vt.render(ae,lt)},Te=()=>{const ht=nt.current,Ft=40*Nn(ht.gravity,0,3),Ue=Math.max(Ft,20),ze=Nn(ht.elasticity,0,1),tn=Nn(ht.damping,0,1);return{gravity:Ft,hold:Ue*ml(2.2,5.5,ze),stiffness:Ue*10*xn,spring:Ue*ml(.1,.4,ze)*xn,bandDamping:Ue*ml(.3,.08,ze)*xn,linearDrag:.25*Math.pow(16,tn),angularDrag:.5*Math.pow(12,tn),air:.15,broadside:.5,spinAir:.03,nodeDrag:2,nodeAir:.2,twist:30,twistDamping:5,grip:40,gripDamping:6,breeze:ea?0:Nn(ht.breeze,0,1),mobileTiltX:ht.enableMobileTilt?Mt.sensor.targetTiltX:0,mobileTiltZ:ht.enableMobileTilt?Mt.sensor.targetTiltZ:0,mobileMotionX:ht.enableMobileTilt?Mt.sensor.targetMotionX:0,mobileMotionZ:ht.enableMobileTilt?Mt.sensor.targetMotionZ:0}},Ve=ht=>{if(ma=0,!Cn)return;const Ft=Math.min(1/30,Math.max(1/240,(ht-Ji)/1e3));Ji=ht,Oi+=Ft,J(ht);const Ue=Te();YA(Mt,Ft,Ue,Oi);const ze=Mt.body;Number.isFinite(ze.position.x+ze.position.y+ze.position.z+ze.quaternion.w)||(Mt.grab=null,rv(Mt,de)),le();const tn=Mt.calm>1.2&&!Mt.grab&&Ue.breeze===0;fi&&!tn&&(ma=requestAnimationFrame(Ve))},De=()=>{ma||!fi||!Cn||(Mt.calm=0,Ji=performance.now(),ma=requestAnimationFrame(Ve))},Ie=ht=>{nt.current.enableMobileTilt&&(Mt.sensor.targetTiltX=Nn(Number(ht.gamma||0)/35,-1,1),Mt.sensor.targetTiltZ=Nn(Number(ht.beta||0)/45,-1,1),De())},Oe=ht=>{if(!nt.current.enableMobileTilt)return;const Ft=ht.accelerationIncludingGravity||ht.acceleration;Ft&&(Mt.sensor.targetMotionX=Nn(Number(Ft.x||0)/9.8,-1.25,1.25),Mt.sensor.targetMotionZ=Nn(Number(Ft.y||0)/9.8,-1.25,1.25),De())};window.addEventListener("deviceorientation",Ie,{passive:!0}),window.addEventListener("devicemotion",Oe,{passive:!0});const oe=new pE,Be=new qt,_e=ht=>{const Ft=Nt.getBoundingClientRect();Be.set((ht.clientX-Ft.left)/Ft.width*2-1,-((ht.clientY-Ft.top)/Ft.height)*2+1),oe.setFromCamera(Be,lt)},un=()=>($t.updateMatrixWorld(),oe.intersectObjects([Ot,Xt,se],!1)[0]||null),Hn=ht=>{Nt.style.cursor!==ht&&(Nt.style.cursor=ht)},Fe=ht=>{const Ft=Mt.body,Ue=qe.a.set(0,1,0).applyQuaternion(Ft.quaternion),ze=Mt.turn===0?Math.PI:0;let tn=ze>Mt.turn?1:-1;if(Mt.turn===0&&Math.abs(Mt.twist)>Math.PI/2&&(tn=-1),Mt.turn===0&&Math.abs(Mt.twist)<=Math.PI/2){const $n=qe.c.subVectors(ht,lt.position).normalize();tn=qe.b.subVectors(ht,Ft.position).cross($n).dot(Ue)<0?-1:1}Mt.turn=ze,Ft.angular.addScaledVector(Ue,wA*tn)},na=ht=>{if(!nt.current.interactive||ht.button>0)return;_e(ht);const Ft=un();Ft&&(Mt.grab={local:Ft.point.clone().sub(Mt.body.position).applyQuaternion(Mt.body.quaternion.clone().invert()),rotation:Mt.body.quaternion.clone(),reach:Ft.distance,from:Ft.point.clone(),target:Ft.point.clone()},hi={x:ht.clientX,y:ht.clientY,time:performance.now(),point:Ft.point.clone()},Nt.setPointerCapture?.(ht.pointerId),Hn("grabbing"),ht.preventDefault(),De())},Ye=ht=>{if(nt.current.interactive){if(_e(ht),Mt.grab){hi&&Math.hypot(ht.clientX-hi.x,ht.clientY-hi.y)>6&&(hi=null),oe.ray.at(Mt.grab.reach,Mt.grab.target),De();return}ht.pointerType!=="touch"&&(zi=!!un(),Hn(zi?"grab":""))}},mn=ht=>{Mt.grab&&(Mt.grab=null,hi&&ht.type==="pointerup"&&performance.now()-hi.time<450&&Fe(hi.point),hi=null,Nt.releasePointerCapture?.(ht.pointerId),Hn(zi&&ht.pointerType!=="touch"?"grab":""),De())},fn=ht=>{!nt.current.interactive||ht.touches.length!==1||(_e(ht.touches[0]),un()&&ht.preventDefault())};Nt.addEventListener("pointerdown",na),Nt.addEventListener("pointermove",Ye),Nt.addEventListener("pointerup",mn),Nt.addEventListener("pointercancel",mn),Nt.addEventListener("lostpointercapture",mn),Nt.addEventListener("touchstart",fn,{passive:!1});const rn=()=>{Me.width=Math.max(1,xt.clientWidth),Me.height=Math.max(1,xt.clientHeight),Pe.pixelRatio=Math.min(window.devicePixelRatio||1,RA);let ht=1;try{const Ft=getComputedStyle(Nt).transform;Ft&&Ft!=="none"&&(ht=Math.abs(new DOMMatrixReadOnly(Ft).a)||1)}catch{ht=1}Pe.stretch=Nn(ht,1,1.5),vt.setPixelRatio(Pe.pixelRatio),vt.setSize(Me.width,Me.height,!1),Pe.stretch!==1&&vt.setDrawingBufferSize(Me.width*Pe.stretch,Me.height,Pe.pixelRatio),Pt(),le()},wn=new ResizeObserver(rn);wn.observe(xt);const Ga=new IntersectionObserver(([ht])=>{fi=ht.isIntersecting,fi&&(De(),ct())});Ga.observe(xt);const Ei=()=>{document.hidden||(De(),ct())};return document.addEventListener("visibilitychange",Ei),Z.current=Pt,rn(),()=>{Cn=!1,cancelAnimationFrame(ma),cancelAnimationFrame(ta),Z.current=null,wn.disconnect(),Ga.disconnect(),document.removeEventListener("visibilitychange",Ei),Nt.removeEventListener("pointerdown",na),Nt.removeEventListener("pointermove",Ye),Nt.removeEventListener("pointerup",mn),Nt.removeEventListener("pointercancel",mn),Nt.removeEventListener("lostpointercapture",mn),Nt.removeEventListener("touchstart",fn),window.removeEventListener("deviceorientation",Ie),window.removeEventListener("devicemotion",Oe),[Ot,Xt,se,ie,zt,Vt,ge].forEach(ht=>ht.geometry?.dispose()),[Et,mt,Zt,It,ee].forEach(ht=>ht.dispose()),[yt,gt,pt,Tt,At,Bt,fe].forEach(ht=>ht.dispose()),I.dispose(),vt.dispose(),Nt.parentNode&&Nt.parentNode.removeChild(Nt)}},[]),km.createElement("div",{ref:F,className:`lanyard ${q}`.trim(),style:Q})},as=new Map,ZA="/img",KA={frontImage:"",backImage:"",imageFit:"contain",cardColor:"#ffffff",orientation:"landscape",finish:"glossy",logoStrength:.72,cardWidth:3.5,cardHeight:2.58,cornerRadius:.31,cornerSmoothing:.6,size:.62,anchor:"center",strapLength:.5,strapColor:"#161820",strapWidth:.65,metal:"silver",gravity:1,damping:.68,elasticity:.42,breeze:0,interactive:!0,intro:!0,enableMobileTilt:!1};function jA(s={}){const e=s.assetBase||ZA;return{...KA,...s,assetBase:e,logoImage:s.logoImage||`${e}/yukomon-pixel-logo.svg`,strapImage:s.strapImage||`${e}/logo.svg`,className:`yk-app-lanyard ${s.className||""}`.trim()}}function xd(s,e){const i=jA(e);fx.flushSync(()=>s.root.render(km.createElement(WA,{...i})))}function QA(s,e={}){if(!s)return null;const i=as.get(s);if(i)return xd(i,e),i.handle;const l={root:ux.createRoot(s),handle:null};return l.handle={update(c={}){xd(l,c)},destroy(){jc(s)}},as.set(s,l),xd(l,e),l.handle}function jc(s){const e=as.get(s);e&&(e.root.unmount(),as.delete(s))}function JA(s){for(const e of as.keys())(e===s||s?.contains(e))&&jc(e)}new MutationObserver(()=>{for(const s of as.keys())s.isConnected||jc(s)}).observe(document.documentElement,{childList:!0,subtree:!0}),window.YK_LANYARD={mount:QA,destroy:jc,destroyWithin:JA,get mountedCount(){return as.size}}})();
