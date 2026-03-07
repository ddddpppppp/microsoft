var Pr=Object.defineProperty;var Or=(e,t,i)=>t in e?Pr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var R=(e,t,i)=>Or(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ai=globalThis,Uo=Ai.ShadowRoot&&(Ai.ShadyCSS===void 0||Ai.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,No=Symbol(),ss=new WeakMap;let Gs=class{constructor(t,i,o){if(this._$cssResult$=!0,o!==No)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(Uo&&t===void 0){const o=i!==void 0&&i.length===1;o&&(t=ss.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&ss.set(i,t))}return t}toString(){return this.cssText}};const Rr=e=>new Gs(typeof e=="string"?e:e+"",void 0,No),k=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((o,s,r)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1],e[0]);return new Gs(i,e,No)},Mr=(e,t)=>{if(Uo)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const o=document.createElement("style"),s=Ai.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=i.cssText,e.appendChild(o)}},rs=Uo?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const o of t.cssRules)i+=o.cssText;return Rr(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Fr,defineProperty:Br,getOwnPropertyDescriptor:Vr,getOwnPropertyNames:Hr,getOwnPropertySymbols:Ur,getPrototypeOf:Nr}=Object,ae=globalThis,as=ae.trustedTypes,jr=as?as.emptyScript:"",Ki=ae.reactiveElementPolyfillSupport,Ye=(e,t)=>e,Le={toAttribute(e,t){switch(t){case Boolean:e=e?jr:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},jo=(e,t)=>!Fr(e,t),ns={attribute:!0,type:String,converter:Le,reflect:!1,useDefault:!1,hasChanged:jo};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),ae.litPropertyMetadata??(ae.litPropertyMetadata=new WeakMap);let Se=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=ns){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,i);s!==void 0&&Br(this.prototype,t,s)}}static getPropertyDescriptor(t,i,o){const{get:s,set:r}=Vr(this.prototype,t)??{get(){return this[i]},set(n){this[i]=n}};return{get:s,set(n){const l=s==null?void 0:s.call(this);r==null||r.call(this,n),this.requestUpdate(t,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ns}static _$Ei(){if(this.hasOwnProperty(Ye("elementProperties")))return;const t=Nr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Ye("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ye("properties"))){const i=this.properties,o=[...Hr(i),...Ur(i)];for(const s of o)this.createProperty(s,i[s])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[o,s]of i)this.elementProperties.set(o,s)}this._$Eh=new Map;for(const[i,o]of this.elementProperties){const s=this._$Eu(i,o);s!==void 0&&this._$Eh.set(s,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const s of o)i.unshift(rs(s))}else t!==void 0&&i.push(rs(t));return i}static _$Eu(t,i){const o=i.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(i=>i(this))}addController(t){var i;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)==null||i.call(t))}removeController(t){var i;(i=this._$EO)==null||i.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const o of i.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Mr(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(i=>{var o;return(o=i.hostConnected)==null?void 0:o.call(i)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(i=>{var o;return(o=i.hostDisconnected)==null?void 0:o.call(i)})}attributeChangedCallback(t,i,o){this._$AK(t,o)}_$ET(t,i){var r;const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(s!==void 0&&o.reflect===!0){const n=(((r=o.converter)==null?void 0:r.toAttribute)!==void 0?o.converter:Le).toAttribute(i,o.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,i){var r,n;const o=this.constructor,s=o._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const l=o.getPropertyOptions(s),d=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:Le;this._$Em=s;const h=d.fromAttribute(i,l.type);this[s]=h??((n=this._$Ej)==null?void 0:n.get(s))??h,this._$Em=null}}requestUpdate(t,i,o,s=!1,r){var n;if(t!==void 0){const l=this.constructor;if(s===!1&&(r=this[t]),o??(o=l.getPropertyOptions(t)),!((o.hasChanged??jo)(r,i)||o.useDefault&&o.reflect&&r===((n=this._$Ej)==null?void 0:n.get(t))&&!this.hasAttribute(l._$Eu(t,o))))return;this.C(t,i,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:o,reflect:s,wrapped:r},n){o&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??i??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(i=void 0),this._$AL.set(t,i)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,n]of s){const{wrapped:l}=n,d=this[r];l!==!0||this._$AL.has(r)||d===void 0||this.C(r,void 0,n,d)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(o=this._$EO)==null||o.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(i)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(i)}willUpdate(t){}_$AE(t){var i;(i=this._$EO)==null||i.forEach(o=>{var s;return(s=o.hostUpdated)==null?void 0:s.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}};Se.elementStyles=[],Se.shadowRootOptions={mode:"open"},Se[Ye("elementProperties")]=new Map,Se[Ye("finalized")]=new Map,Ki==null||Ki({ReactiveElement:Se}),(ae.reactiveElementVersions??(ae.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ze=globalThis,ls=e=>e,Ii=Ze.trustedTypes,cs=Ii?Ii.createPolicy("lit-html",{createHTML:e=>e}):void 0,Xs="$lit$",se=`lit$${Math.random().toFixed(9).slice(2)}$`,Ys="?"+se,Wr=`<${Ys}>`,ve=document,ri=()=>ve.createComment(""),ai=e=>e===null||typeof e!="object"&&typeof e!="function",Wo=Array.isArray,qr=e=>Wo(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Gi=`[ 	
\f\r]`,Ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ds=/-->/g,ps=/>/g,he=RegExp(`>|${Gi}(?:([^\\s"'>=/]+)(${Gi}*=${Gi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),hs=/'/g,us=/"/g,Zs=/^(?:script|style|textarea|title)$/i,Kr=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),p=Kr(1),Ct=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),fs=new WeakMap,ge=ve.createTreeWalker(ve,129);function Qs(e,t){if(!Wo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return cs!==void 0?cs.createHTML(t):t}const Gr=(e,t)=>{const i=e.length-1,o=[];let s,r=t===2?"<svg>":t===3?"<math>":"",n=Ne;for(let l=0;l<i;l++){const d=e[l];let h,g,u=-1,f=0;for(;f<d.length&&(n.lastIndex=f,g=n.exec(d),g!==null);)f=n.lastIndex,n===Ne?g[1]==="!--"?n=ds:g[1]!==void 0?n=ps:g[2]!==void 0?(Zs.test(g[2])&&(s=RegExp("</"+g[2],"g")),n=he):g[3]!==void 0&&(n=he):n===he?g[0]===">"?(n=s??Ne,u=-1):g[1]===void 0?u=-2:(u=n.lastIndex-g[2].length,h=g[1],n=g[3]===void 0?he:g[3]==='"'?us:hs):n===us||n===hs?n=he:n===ds||n===ps?n=Ne:(n=he,s=void 0);const m=n===he&&e[l+1].startsWith("/>")?" ":"";r+=n===Ne?d+Wr:u>=0?(o.push(h),d.slice(0,u)+Xs+d.slice(u)+se+m):d+se+(u===-2?l:m)}return[Qs(e,r+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]};class ni{constructor({strings:t,_$litType$:i},o){let s;this.parts=[];let r=0,n=0;const l=t.length-1,d=this.parts,[h,g]=Gr(t,i);if(this.el=ni.createElement(h,o),ge.currentNode=this.el.content,i===2||i===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=ge.nextNode())!==null&&d.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(Xs)){const f=g[n++],m=s.getAttribute(u).split(se),b=/([.?@])?(.*)/.exec(f);d.push({type:1,index:r,name:b[2],strings:m,ctor:b[1]==="."?Yr:b[1]==="?"?Zr:b[1]==="@"?Qr:Fi}),s.removeAttribute(u)}else u.startsWith(se)&&(d.push({type:6,index:r}),s.removeAttribute(u));if(Zs.test(s.tagName)){const u=s.textContent.split(se),f=u.length-1;if(f>0){s.textContent=Ii?Ii.emptyScript:"";for(let m=0;m<f;m++)s.append(u[m],ri()),ge.nextNode(),d.push({type:2,index:++r});s.append(u[f],ri())}}}else if(s.nodeType===8)if(s.data===Ys)d.push({type:2,index:r});else{let u=-1;for(;(u=s.data.indexOf(se,u+1))!==-1;)d.push({type:7,index:r}),u+=se.length-1}r++}}static createElement(t,i){const o=ve.createElement("template");return o.innerHTML=t,o}}function Pe(e,t,i=e,o){var n,l;if(t===Ct)return t;let s=o!==void 0?(n=i._$Co)==null?void 0:n[o]:i._$Cl;const r=ai(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,i,o)),o!==void 0?(i._$Co??(i._$Co=[]))[o]=s:i._$Cl=s),s!==void 0&&(t=Pe(e,s._$AS(e,t.values),s,o)),t}class Xr{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:o}=this._$AD,s=((t==null?void 0:t.creationScope)??ve).importNode(i,!0);ge.currentNode=s;let r=ge.nextNode(),n=0,l=0,d=o[0];for(;d!==void 0;){if(n===d.index){let h;d.type===2?h=new di(r,r.nextSibling,this,t):d.type===1?h=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(h=new Jr(r,this,t)),this._$AV.push(h),d=o[++l]}n!==(d==null?void 0:d.index)&&(r=ge.nextNode(),n++)}return ge.currentNode=ve,s}p(t){let i=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,i),i+=o.strings.length-2):o._$AI(t[i])),i++}}class di{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,i,o,s){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=o,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Pe(this,t,i),ai(t)?t===X||t==null||t===""?(this._$AH!==X&&this._$AR(),this._$AH=X):t!==this._$AH&&t!==Ct&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):qr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==X&&ai(this._$AH)?this._$AA.nextSibling.data=t:this.T(ve.createTextNode(t)),this._$AH=t}$(t){var r;const{values:i,_$litType$:o}=t,s=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=ni.createElement(Qs(o.h,o.h[0]),this.options)),o);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(i);else{const n=new Xr(s,this),l=n.u(this.options);n.p(i),this.T(l),this._$AH=n}}_$AC(t){let i=fs.get(t.strings);return i===void 0&&fs.set(t.strings,i=new ni(t)),i}k(t){Wo(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let o,s=0;for(const r of t)s===i.length?i.push(o=new di(this.O(ri()),this.O(ri()),this,this.options)):o=i[s],o._$AI(r),s++;s<i.length&&(this._$AR(o&&o._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,i);t!==this._$AB;){const s=ls(t).nextSibling;ls(t).remove(),t=s}}setConnected(t){var i;this._$AM===void 0&&(this._$Cv=t,(i=this._$AP)==null||i.call(this,t))}}let Fi=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,o,s,r){this.type=1,this._$AH=X,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=r,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=X}_$AI(t,i=this,o,s){const r=this.strings;let n=!1;if(r===void 0)t=Pe(this,t,i,0),n=!ai(t)||t!==this._$AH&&t!==Ct,n&&(this._$AH=t);else{const l=t;let d,h;for(t=r[0],d=0;d<r.length-1;d++)h=Pe(this,l[o+d],i,d),h===Ct&&(h=this._$AH[d]),n||(n=!ai(h)||h!==this._$AH[d]),h===X?t=X:t!==X&&(t+=(h??"")+r[d+1]),this._$AH[d]=h}n&&!s&&this.j(t)}j(t){t===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};class Yr extends Fi{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===X?void 0:t}}class Zr extends Fi{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==X)}}class Qr extends Fi{constructor(t,i,o,s,r){super(t,i,o,s,r),this.type=5}_$AI(t,i=this){if((t=Pe(this,t,i,0)??X)===Ct)return;const o=this._$AH,s=t===X&&o!==X||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,r=t!==X&&(o===X||s);s&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,t):this._$AH.handleEvent(t)}}class Jr{constructor(t,i,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Pe(this,t)}}const Xi=Ze.litHtmlPolyfillSupport;Xi==null||Xi(ni,di),(Ze.litHtmlVersions??(Ze.litHtmlVersions=[])).push("3.3.2");const ta=(e,t,i)=>{const o=(i==null?void 0:i.renderBefore)??t;let s=o._$litPart$;if(s===void 0){const r=(i==null?void 0:i.renderBefore)??null;o._$litPart$=s=new di(t.insertBefore(ri(),r),r,void 0,i??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const be=globalThis;let G=class extends Se{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const t=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=t.firstChild),t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ta(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Ct}};var Ks;G._$litElement$=!0,G.finalized=!0,(Ks=be.litElementHydrateSupport)==null||Ks.call(be,{LitElement:G});const Yi=be.litElementPolyfillSupport;Yi==null||Yi({LitElement:G});(be.litElementVersions??(be.litElementVersions=[])).push("4.2.2");var Js=Object.defineProperty,ea=Object.defineProperties,ia=Object.getOwnPropertyDescriptor,oa=Object.getOwnPropertyDescriptors,gs=Object.getOwnPropertySymbols,sa=Object.prototype.hasOwnProperty,ra=Object.prototype.propertyIsEnumerable,Zi=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),qo=e=>{throw TypeError(e)},ms=(e,t,i)=>t in e?Js(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,ee=(e,t)=>{for(var i in t||(t={}))sa.call(t,i)&&ms(e,i,t[i]);if(gs)for(var i of gs(t))ra.call(t,i)&&ms(e,i,t[i]);return e},pi=(e,t)=>ea(e,oa(t)),a=(e,t,i,o)=>{for(var s=o>1?void 0:o?ia(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(s=(o?n(t,i,s):n(s))||s);return o&&s&&Js(t,i,s),s},tr=(e,t,i)=>t.has(e)||qo("Cannot "+i),aa=(e,t,i)=>(tr(e,t,"read from private field"),t.get(e)),na=(e,t,i)=>t.has(e)?qo("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),la=(e,t,i,o)=>(tr(e,t,"write to private field"),t.set(e,i),i),ca=function(e,t){this[0]=e,this[1]=t},da=e=>{var t=e[Zi("asyncIterator")],i=!1,o,s={};return t==null?(t=e[Zi("iterator")](),o=r=>s[r]=n=>t[r](n)):(t=t.call(e),o=r=>s[r]=n=>{if(i){if(i=!1,r==="throw")throw n;return n}return i=!0,{done:!1,value:new ca(new Promise(l=>{var d=t[r](n);d instanceof Object||qo("Object expected"),l(d)}),1)}}),s[Zi("iterator")]=()=>s,o("next"),"throw"in t?o("throw"):s.throw=r=>{throw r},"return"in t&&o("return"),s},je=new WeakMap,We=new WeakMap,qe=new WeakMap,Qi=new WeakSet,wi=new WeakMap,ie=class{constructor(e,t){this.handleFormData=i=>{const o=this.options.disabled(this.host),s=this.options.name(this.host),r=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!o&&!n&&typeof s=="string"&&s.length>0&&typeof r<"u"&&(Array.isArray(r)?r.forEach(l=>{i.formData.append(s,l.toString())}):i.formData.append(s,r.toString()))},this.handleFormSubmit=i=>{var o;const s=this.options.disabled(this.host),r=this.options.reportValidity;this.form&&!this.form.noValidate&&((o=je.get(this.form))==null||o.forEach(n=>{this.setUserInteracted(n,!0)})),this.form&&!this.form.noValidate&&!s&&!r(this.host)&&(i.preventDefault(),i.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),wi.set(this.host,[])},this.handleInteraction=i=>{const o=wi.get(this.host);o.includes(i.type)||o.push(i.type),o.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const i=this.form.querySelectorAll("*");for(const o of i)if(typeof o.checkValidity=="function"&&!o.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const i=this.form.querySelectorAll("*");for(const o of i)if(typeof o.reportValidity=="function"&&!o.reportValidity())return!1}return!0},(this.host=e).addController(this),this.options=ee({form:i=>{const o=i.form;if(o){const r=i.getRootNode().querySelector(`#${o}`);if(r)return r}return i.closest("form")},name:i=>i.name,value:i=>i.value,defaultValue:i=>i.defaultValue,disabled:i=>{var o;return(o=i.disabled)!=null?o:!1},reportValidity:i=>typeof i.reportValidity=="function"?i.reportValidity():!0,checkValidity:i=>typeof i.checkValidity=="function"?i.checkValidity():!0,setValue:(i,o)=>i.value=o,assumeInteractionOn:["sl-input"]},t)}hostConnected(){const e=this.options.form(this.host);e&&this.attachForm(e),wi.set(this.host,[]),this.options.assumeInteractionOn.forEach(t=>{this.host.addEventListener(t,this.handleInteraction)})}hostDisconnected(){this.detachForm(),wi.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction)})}hostUpdated(){const e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(e){e?(this.form=e,je.has(this.form)?je.get(this.form).add(this.host):je.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),We.has(this.form)||(We.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),qe.has(this.form)||(qe.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const e=je.get(this.form);e&&(e.delete(this.host),e.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),We.has(this.form)&&(this.form.reportValidity=We.get(this.form),We.delete(this.form)),qe.has(this.form)&&(this.form.checkValidity=qe.get(this.form),qe.delete(this.form)),this.form=void 0))}setUserInteracted(e,t){t?Qi.add(e):Qi.delete(e),e.requestUpdate()}doAction(e,t){if(this.form){const i=document.createElement("button");i.type=e,i.style.position="absolute",i.style.width="0",i.style.height="0",i.style.clipPath="inset(50%)",i.style.overflow="hidden",i.style.whiteSpace="nowrap",t&&(i.name=t.name,i.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(o=>{t.hasAttribute(o)&&i.setAttribute(o,t.getAttribute(o))})),this.form.append(i),i.click(),i.remove()}}getForm(){var e;return(e=this.form)!=null?e:null}reset(e){this.doAction("reset",e)}submit(e){this.doAction("submit",e)}setValidity(e){const t=this.host,i=!!Qi.has(t),o=!!t.required;t.toggleAttribute("data-required",o),t.toggleAttribute("data-optional",!o),t.toggleAttribute("data-invalid",!e),t.toggleAttribute("data-valid",e),t.toggleAttribute("data-user-invalid",!e&&i),t.toggleAttribute("data-user-valid",e&&i)}updateValidity(){const e=this.host;this.setValidity(e.validity.valid)}emitInvalidEvent(e){const t=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});e||t.preventDefault(),this.host.dispatchEvent(t)||e==null||e.preventDefault()}},Bi=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),pa=Object.freeze(pi(ee({},Bi),{valid:!1,valueMissing:!0})),ha=Object.freeze(pi(ee({},Bi),{valid:!1,customError:!0})),ua=k`
  :host {
    display: block;
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(sl-icon) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    color: var(--sl-color-neutral-700);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  .tree-item__checkbox {
    pointer-events: none;
  }

  .tree-item__expand-button,
  .tree-item__checkbox,
  .tree-item__label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-dense);
    letter-spacing: var(--sl-letter-spacing-normal);
  }

  .tree-item__checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .tree-item__indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .tree-item__expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-x-small);
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    cursor: pointer;
  }

  .tree-item__expand-button {
    transition: var(--sl-transition-medium) rotate ease;
  }

  .tree-item--expanded .tree-item__expand-button {
    rotate: 90deg;
  }

  .tree-item--expanded.tree-item--rtl .tree-item__expand-button {
    rotate: -90deg;
  }

  .tree-item--expanded slot[name='expand-icon'],
  .tree-item:not(.tree-item--expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item--has-expand-button) .tree-item__expand-icon-slot {
    display: none;
  }

  .tree-item__expand-button--visible {
    cursor: pointer;
  }

  .tree-item__item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  .tree-item--disabled .tree-item__item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .tree-item__item {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
    background-color: var(--sl-color-neutral-100);
    border-inline-start-color: var(--sl-color-primary-600);
  }

  :host(:not([aria-disabled='true'])) .tree-item__expand-button {
    color: var(--sl-color-neutral-600);
  }

  .tree-item__label {
    display: flex;
    align-items: center;
    transition: var(--sl-transition-fast) color;
  }

  .tree-item__children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--sl-spacing-medium)));
  }

  /* Indentation lines */
  .tree-item__children {
    position: relative;
  }

  .tree-item__children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    left: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  .tree-item--rtl .tree-item__children::before {
    left: auto;
    right: 1em;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
      outline: dashed 1px SelectedItem;
    }
  }
`,fa=k`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`,Re=(e="value")=>(t,i)=>{const o=t.constructor,s=o.prototype.attributeChangedCallback;o.prototype.attributeChangedCallback=function(r,n,l){var d;const h=o.getPropertyOptions(e),g=typeof h.attribute=="string"?h.attribute:e;if(r===g){const u=h.converter||Le,m=(typeof u=="function"?u:(d=u==null?void 0:u.fromAttribute)!=null?d:Le.fromAttribute)(l,h.type);this[e]!==m&&(this[i]=m)}s.call(this,r,n,l)}},we=k`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,yt=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=i=>{const o=i.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===e.ELEMENT_NODE){const t=e;if(t.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return this.host.querySelector(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};function ga(e){if(!e)return"";const t=e.assignedNodes({flatten:!0});let i="";return[...t].forEach(o=>{o.nodeType===Node.TEXT_NODE&&(i+=o.textContent)}),i}var lo="";function bs(e){lo=e}function ma(e=""){if(!lo){const t=[...document.getElementsByTagName("script")],i=t.find(o=>o.hasAttribute("data-shoelace"));if(i)bs(i.getAttribute("data-shoelace"));else{const o=t.find(r=>/shoelace(\.min)?\.js($|\?)/.test(r.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(r.src));let s="";o&&(s=o.getAttribute("src")),bs(s.split("/").slice(0,-1).join("/"))}}return lo.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")}var ba={name:"default",resolver:e=>ma(`assets/icons/${e}.svg`)},va=ba,vs={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},xa={name:"system",resolver:e=>e in vs?`data:image/svg+xml,${encodeURIComponent(vs[e])}`:""},ya=xa,wa=[va,ya],co=[];function _a(e){co.push(e)}function ka(e){co=co.filter(t=>t!==e)}function xs(e){return wa.find(t=>t.name===e)}var $a=k`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function _(e,t){const i=ee({waitUntilFirstUpdate:!1},t);return(o,s)=>{const{update:r}=o,n=Array.isArray(e)?e:[e];o.update=function(l){n.forEach(d=>{const h=d;if(l.has(h)){const g=l.get(h),u=this[h];g!==u&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[s](g,u)}}),r.call(this,l)}}}var P=k`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ca={attribute:!0,type:String,converter:Le,reflect:!1,hasChanged:jo},za=(e=Ca,t,i)=>{const{kind:o,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),o==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),o==="accessor"){const{name:n}=i;return{set(l){const d=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,d,e,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,e,l),l}}}if(o==="setter"){const{name:n}=i;return function(l){const d=this[n];t.call(this,l),this.requestUpdate(n,d,e,!0,l)}}throw Error("Unsupported decorator location: "+o)};function c(e){return(t,i)=>typeof i=="object"?za(e,t,i):((o,s,r)=>{const n=s.hasOwnProperty(r);return s.constructor.createProperty(r,o),n?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function D(e){return c({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function hi(e){return(t,i)=>{const o=typeof t=="function"?t:t[i];Object.assign(o,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const er=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $(e,t){return(i,o,s)=>{const r=n=>{var l;return((l=n.renderRoot)==null?void 0:l.querySelector(e))??null};return er(i,o,{get(){return r(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Sa(e){return(t,i)=>er(t,i,{async get(){var o;return await this.updateComplete,((o=this.renderRoot)==null?void 0:o.querySelector(e))??null}})}var Ei,A=class extends G{constructor(){super(),na(this,Ei,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([e,t])=>{this.constructor.define(e,t)})}emit(e,t){const i=new CustomEvent(e,ee({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(i),i}static define(e,t=this,i={}){const o=customElements.get(e);if(!o){try{customElements.define(e,t,i)}catch{customElements.define(e,class extends t{},i)}return}let s=" (unknown version)",r=s;"version"in t&&t.version&&(s=" v"+t.version),"version"in o&&o.version&&(r=" v"+o.version),!(s&&r&&s===r)&&console.warn(`Attempted to register <${e}>${s}, but <${e}>${r} has already been registered.`)}attributeChangedCallback(e,t,i){aa(this,Ei)||(this.constructor.elementProperties.forEach((o,s)=>{o.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s])}),la(this,Ei,!0)),super.attributeChangedCallback(e,t,i)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,i)=>{e.has(i)&&this[i]==null&&(this[i]=t)})}};Ei=new WeakMap;A.version="2.20.1";A.dependencies={};a([c()],A.prototype,"dir",2);a([c()],A.prototype,"lang",2);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Aa=(e,t)=>(e==null?void 0:e._$litType$)!==void 0,ir=e=>e.strings===void 0,Ea={},Ta=(e,t=Ea)=>e._$AH=t;var Ke=Symbol(),_i=Symbol(),Ji,to=new Map,K=class extends A{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(e,t){var i;let o;if(t!=null&&t.spriteSheet)return this.svg=p`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,this.svg;try{if(o=await fetch(e,{mode:"cors"}),!o.ok)return o.status===410?Ke:_i}catch{return _i}try{const s=document.createElement("div");s.innerHTML=await o.text();const r=s.firstElementChild;if(((i=r==null?void 0:r.tagName)==null?void 0:i.toLowerCase())!=="svg")return Ke;Ji||(Ji=new DOMParser);const l=Ji.parseFromString(r.outerHTML,"text/html").body.querySelector("svg");return l?(l.part.add("svg"),document.adoptNode(l)):Ke}catch{return Ke}}connectedCallback(){super.connectedCallback(),_a(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),ka(this)}getIconSource(){const e=xs(this.library);return this.name&&e?{url:e.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var e;const{url:t,fromLibrary:i}=this.getIconSource(),o=i?xs(this.library):void 0;if(!t){this.svg=null;return}let s=to.get(t);if(s||(s=this.resolveIcon(t,o),to.set(t,s)),!this.initialRender)return;const r=await s;if(r===_i&&to.delete(t),t===this.getIconSource().url){if(Aa(r)){if(this.svg=r,o){await this.updateComplete;const n=this.shadowRoot.querySelector("[part='svg']");typeof o.mutator=="function"&&n&&o.mutator(n)}return}switch(r){case _i:case Ke:this.svg=null,this.emit("sl-error");break;default:this.svg=r.cloneNode(!0),(e=o==null?void 0:o.mutator)==null||e.call(o,this.svg),this.emit("sl-load")}}}render(){return this.svg}};K.styles=[P,$a];a([D()],K.prototype,"svg",2);a([c({reflect:!0})],K.prototype,"name",2);a([c()],K.prototype,"src",2);a([c()],K.prototype,"label",2);a([c({reflect:!0})],K.prototype,"library",2);a([_("label")],K.prototype,"handleLabelChange",1);a([_(["name","src","library"])],K.prototype,"setIcon",1);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},ui=e=>(...t)=>({_$litDirective$:e,values:t});let fi=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,o){this._$Ct=t,this._$AM=i,this._$Ci=o}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=ui(class extends fi{constructor(e){var t;if(super(e),e.type!==qt.ATTRIBUTE||e.name!=="class"||((t=e.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var o,s;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in t)t[r]&&!((o=this.nt)!=null&&o.has(r))&&this.st.add(r);return this.render(t)}const i=e.element.classList;for(const r of this.st)r in t||(i.remove(r),this.st.delete(r));for(const r in t){const n=!!t[r];n===this.st.has(r)||(s=this.nt)!=null&&s.has(r)||(n?(i.add(r),this.st.add(r)):(i.remove(r),this.st.delete(r)))}return Ct}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=e=>e??X;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xe=ui(class extends fi{constructor(e){if(super(e),e.type!==qt.PROPERTY&&e.type!==qt.ATTRIBUTE&&e.type!==qt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ir(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ct||t===X)return t;const i=e.element,o=e.name;if(e.type===qt.PROPERTY){if(t===i[o])return Ct}else if(e.type===qt.BOOLEAN_ATTRIBUTE){if(!!t===i.hasAttribute(o))return Ct}else if(e.type===qt.ATTRIBUTE&&i.getAttribute(o)===t+"")return Ct;return Ta(e),t}});var nt=class extends A{constructor(){super(...arguments),this.formControlController=new ie(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t}),this.hasSlotController=new yt(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("help-text"),t=this.helpText?!0:!!e;return p`
      <div
        class=${L({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":t})}
      >
        <label
          part="base"
          class=${L({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${S(this.value)}
            .indeterminate=${xe(this.indeterminate)}
            .checked=${xe(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
            class="checkbox__control"
          >
            ${this.checked?p`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?p`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${t?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};nt.styles=[P,we,fa];nt.dependencies={"sl-icon":K};a([$('input[type="checkbox"]')],nt.prototype,"input",2);a([D()],nt.prototype,"hasFocus",2);a([c()],nt.prototype,"title",2);a([c()],nt.prototype,"name",2);a([c()],nt.prototype,"value",2);a([c({reflect:!0})],nt.prototype,"size",2);a([c({type:Boolean,reflect:!0})],nt.prototype,"disabled",2);a([c({type:Boolean,reflect:!0})],nt.prototype,"checked",2);a([c({type:Boolean,reflect:!0})],nt.prototype,"indeterminate",2);a([Re("checked")],nt.prototype,"defaultChecked",2);a([c({reflect:!0})],nt.prototype,"form",2);a([c({type:Boolean,reflect:!0})],nt.prototype,"required",2);a([c({attribute:"help-text"})],nt.prototype,"helpText",2);a([_("disabled",{waitUntilFirstUpdate:!0})],nt.prototype,"handleDisabledChange",1);a([_(["checked","indeterminate"],{waitUntilFirstUpdate:!0})],nt.prototype,"handleStateChange",1);var Ia=k`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;const po=new Set,Ae=new Map;let fe,Ko="ltr",Go="en";const or=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(or){const e=new MutationObserver(rr);Ko=document.documentElement.dir||"ltr",Go=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function sr(...e){e.map(t=>{const i=t.$code.toLowerCase();Ae.has(i)?Ae.set(i,Object.assign(Object.assign({},Ae.get(i)),t)):Ae.set(i,t),fe||(fe=t)}),rr()}function rr(){or&&(Ko=document.documentElement.dir||"ltr",Go=document.documentElement.lang||navigator.language),[...po.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}let Da=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){po.add(this.host)}hostDisconnected(){po.delete(this.host)}dir(){return`${this.host.dir||Ko}`.toLowerCase()}lang(){return`${this.host.lang||Go}`.toLowerCase()}getTranslationData(t){var i,o;const s=new Intl.Locale(t.replace(/_/g,"-")),r=s==null?void 0:s.language.toLowerCase(),n=(o=(i=s==null?void 0:s.region)===null||i===void 0?void 0:i.toLowerCase())!==null&&o!==void 0?o:"",l=Ae.get(`${r}-${n}`),d=Ae.get(r);return{locale:s,language:r,region:n,primary:l,secondary:d}}exists(t,i){var o;const{primary:s,secondary:r}=this.getTranslationData((o=i.lang)!==null&&o!==void 0?o:this.lang());return i=Object.assign({includeFallback:!1},i),!!(s&&s[t]||r&&r[t]||i.includeFallback&&fe&&fe[t])}term(t,...i){const{primary:o,secondary:s}=this.getTranslationData(this.lang());let r;if(o&&o[t])r=o[t];else if(s&&s[t])r=s[t];else if(fe&&fe[t])r=fe[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof r=="function"?r(...i):r}date(t,i){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),i).format(t)}number(t,i){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),i).format(t)}relativeTime(t,i,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,i)}};var ar={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};sr(ar);var La=ar,U=class extends Da{};sr(La);var gi=class extends A{constructor(){super(...arguments),this.localize=new U(this)}render(){return p`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};gi.styles=[P,Ia];var nr=new Map,Pa=new WeakMap;function Oa(e){return e??{keyframes:[],options:{duration:0}}}function ys(e,t){return t.toLowerCase()==="rtl"?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function j(e,t){nr.set(e,Oa(t))}function Y(e,t,i){const o=Pa.get(e);if(o!=null&&o[t])return ys(o[t],i.dir);const s=nr.get(t);return s?ys(s,i.dir):{keyframes:[],options:{duration:0}}}function J(e,t,i){return new Promise(o=>{if((i==null?void 0:i.duration)===1/0)throw new Error("Promise-based animations must be finite.");const s=e.animate(t,pi(ee({},i),{duration:ho()?0:i.duration}));s.addEventListener("cancel",o,{once:!0}),s.addEventListener("finish",o,{once:!0})})}function ws(e){return e=e.toString().toLowerCase(),e.indexOf("ms")>-1?parseFloat(e):e.indexOf("s")>-1?parseFloat(e)*1e3:parseFloat(e)}function ho(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function rt(e){return Promise.all(e.getAnimations().map(t=>new Promise(i=>{t.cancel(),requestAnimationFrame(i)})))}function Di(e,t){return e.map(i=>pi(ee({},i),{height:i.height==="auto"?`${t}px`:i.height}))}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _s(e,t,i){return e?t(e):i==null?void 0:i(e)}var tt=class uo extends A{constructor(){super(...arguments),this.localize=new U(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(t){return t instanceof Element&&t.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.emit("sl-collapse"),await rt(this.childrenContainer);const{keyframes:t,options:i}=Y(this,"tree-item.collapse",{dir:this.localize.dir()});await J(this.childrenContainer,Di(t,this.childrenContainer.scrollHeight),i),this.childrenContainer.hidden=!0,this.emit("sl-after-collapse")}isNestedItem(){const t=this.parentElement;return!!t&&uo.isTreeItem(t)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(t){t.has("selected")&&!t.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.emit("sl-expand"),await rt(this.childrenContainer),this.childrenContainer.hidden=!1;const{keyframes:t,options:i}=Y(this,"tree-item.expand",{dir:this.localize.dir()});await J(this.childrenContainer,Di(t,this.childrenContainer.scrollHeight),i),this.childrenContainer.style.height="auto",this.emit("sl-after-expand")}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.emit("sl-lazy-change")}getChildrenItems({includeDisabled:t=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(i=>uo.isTreeItem(i)&&(t||!i.disabled)):[]}render(){const t=this.localize.dir()==="rtl",i=!this.loading&&(!this.isLeaf||this.lazy);return p`
      <div
        part="base"
        class="${L({"tree-item":!0,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":i,"tree-item--rtl":this.localize.dir()==="rtl"})}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled?"item--disabled":""}
            ${this.expanded?"item--expanded":""}
            ${this.indeterminate?"item--indeterminate":""}
            ${this.selected?"item--selected":""}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${L({"tree-item__expand-button":!0,"tree-item__expand-button--visible":i})}
            aria-hidden="true"
          >
            ${_s(this.loading,()=>p` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${_s(this.selectable,()=>p`
              <sl-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    control--checked:checkbox__control--checked,
                    control--indeterminate:checkbox__control--indeterminate,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="tree-item__checkbox"
                ?disabled="${this.disabled}"
                ?checked="${xe(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></sl-checkbox>
            `)}

          <slot class="tree-item__label" part="label"></slot>
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};tt.styles=[P,ua];tt.dependencies={"sl-checkbox":nt,"sl-icon":K,"sl-spinner":gi};a([D()],tt.prototype,"indeterminate",2);a([D()],tt.prototype,"isLeaf",2);a([D()],tt.prototype,"loading",2);a([D()],tt.prototype,"selectable",2);a([c({type:Boolean,reflect:!0})],tt.prototype,"expanded",2);a([c({type:Boolean,reflect:!0})],tt.prototype,"selected",2);a([c({type:Boolean,reflect:!0})],tt.prototype,"disabled",2);a([c({type:Boolean,reflect:!0})],tt.prototype,"lazy",2);a([$("slot:not([name])")],tt.prototype,"defaultSlot",2);a([$("slot[name=children]")],tt.prototype,"childrenSlot",2);a([$(".tree-item__item")],tt.prototype,"itemElement",2);a([$(".tree-item__children")],tt.prototype,"childrenContainer",2);a([$(".tree-item__expand-button slot")],tt.prototype,"expandButtonSlot",2);a([_("loading",{waitUntilFirstUpdate:!0})],tt.prototype,"handleLoadingChange",1);a([_("disabled")],tt.prototype,"handleDisabledChange",1);a([_("selected")],tt.prototype,"handleSelectedChange",1);a([_("expanded",{waitUntilFirstUpdate:!0})],tt.prototype,"handleExpandedChange",1);a([_("expanded",{waitUntilFirstUpdate:!0})],tt.prototype,"handleExpandAnimation",1);a([_("lazy",{waitUntilFirstUpdate:!0})],tt.prototype,"handleLazyChange",1);var Qe=tt;j("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});j("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});Qe.define("sl-tree-item");var Ra=k`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,Ma=k`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const ne=Math.min,$t=Math.max,Li=Math.round,ki=Math.floor,Kt=e=>({x:e,y:e}),Fa={left:"right",right:"left",bottom:"top",top:"bottom"},Ba={start:"end",end:"start"};function fo(e,t,i){return $t(e,ne(t,i))}function Me(e,t){return typeof e=="function"?e(t):e}function le(e){return e.split("-")[0]}function Fe(e){return e.split("-")[1]}function lr(e){return e==="x"?"y":"x"}function Xo(e){return e==="y"?"height":"width"}const Va=new Set(["top","bottom"]);function te(e){return Va.has(le(e))?"y":"x"}function Yo(e){return lr(te(e))}function Ha(e,t,i){i===void 0&&(i=!1);const o=Fe(e),s=Yo(e),r=Xo(s);let n=s==="x"?o===(i?"end":"start")?"right":"left":o==="start"?"bottom":"top";return t.reference[r]>t.floating[r]&&(n=Pi(n)),[n,Pi(n)]}function Ua(e){const t=Pi(e);return[go(e),t,go(t)]}function go(e){return e.replace(/start|end/g,t=>Ba[t])}const ks=["left","right"],$s=["right","left"],Na=["top","bottom"],ja=["bottom","top"];function Wa(e,t,i){switch(e){case"top":case"bottom":return i?t?$s:ks:t?ks:$s;case"left":case"right":return t?Na:ja;default:return[]}}function qa(e,t,i,o){const s=Fe(e);let r=Wa(le(e),i==="start",o);return s&&(r=r.map(n=>n+"-"+s),t&&(r=r.concat(r.map(go)))),r}function Pi(e){return e.replace(/left|right|bottom|top/g,t=>Fa[t])}function Ka(e){return{top:0,right:0,bottom:0,left:0,...e}}function cr(e){return typeof e!="number"?Ka(e):{top:e,right:e,bottom:e,left:e}}function Oi(e){const{x:t,y:i,width:o,height:s}=e;return{width:o,height:s,top:i,left:t,right:t+o,bottom:i+s,x:t,y:i}}function Cs(e,t,i){let{reference:o,floating:s}=e;const r=te(t),n=Yo(t),l=Xo(n),d=le(t),h=r==="y",g=o.x+o.width/2-s.width/2,u=o.y+o.height/2-s.height/2,f=o[l]/2-s[l]/2;let m;switch(d){case"top":m={x:g,y:o.y-s.height};break;case"bottom":m={x:g,y:o.y+o.height};break;case"right":m={x:o.x+o.width,y:u};break;case"left":m={x:o.x-s.width,y:u};break;default:m={x:o.x,y:o.y}}switch(Fe(t)){case"start":m[n]-=f*(i&&h?-1:1);break;case"end":m[n]+=f*(i&&h?-1:1);break}return m}async function Ga(e,t){var i;t===void 0&&(t={});const{x:o,y:s,platform:r,rects:n,elements:l,strategy:d}=e,{boundary:h="clippingAncestors",rootBoundary:g="viewport",elementContext:u="floating",altBoundary:f=!1,padding:m=0}=Me(t,e),b=cr(m),z=l[f?u==="floating"?"reference":"floating":u],T=Oi(await r.getClippingRect({element:(i=await(r.isElement==null?void 0:r.isElement(z)))==null||i?z:z.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(l.floating)),boundary:h,rootBoundary:g,strategy:d})),y=u==="floating"?{x:o,y:s,width:n.floating.width,height:n.floating.height}:n.reference,C=await(r.getOffsetParent==null?void 0:r.getOffsetParent(l.floating)),v=await(r.isElement==null?void 0:r.isElement(C))?await(r.getScale==null?void 0:r.getScale(C))||{x:1,y:1}:{x:1,y:1},w=Oi(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:y,offsetParent:C,strategy:d}):y);return{top:(T.top-w.top+b.top)/v.y,bottom:(w.bottom-T.bottom+b.bottom)/v.y,left:(T.left-w.left+b.left)/v.x,right:(w.right-T.right+b.right)/v.x}}const Xa=async(e,t,i)=>{const{placement:o="bottom",strategy:s="absolute",middleware:r=[],platform:n}=i,l=r.filter(Boolean),d=await(n.isRTL==null?void 0:n.isRTL(t));let h=await n.getElementRects({reference:e,floating:t,strategy:s}),{x:g,y:u}=Cs(h,o,d),f=o,m={},b=0;for(let z=0;z<l.length;z++){var x;const{name:T,fn:y}=l[z],{x:C,y:v,data:w,reset:E}=await y({x:g,y:u,initialPlacement:o,placement:f,strategy:s,middlewareData:m,rects:h,platform:{...n,detectOverflow:(x=n.detectOverflow)!=null?x:Ga},elements:{reference:e,floating:t}});g=C??g,u=v??u,m={...m,[T]:{...m[T],...w}},E&&b<=50&&(b++,typeof E=="object"&&(E.placement&&(f=E.placement),E.rects&&(h=E.rects===!0?await n.getElementRects({reference:e,floating:t,strategy:s}):E.rects),{x:g,y:u}=Cs(h,f,d)),z=-1)}return{x:g,y:u,placement:f,strategy:s,middlewareData:m}},Ya=e=>({name:"arrow",options:e,async fn(t){const{x:i,y:o,placement:s,rects:r,platform:n,elements:l,middlewareData:d}=t,{element:h,padding:g=0}=Me(e,t)||{};if(h==null)return{};const u=cr(g),f={x:i,y:o},m=Yo(s),b=Xo(m),x=await n.getDimensions(h),z=m==="y",T=z?"top":"left",y=z?"bottom":"right",C=z?"clientHeight":"clientWidth",v=r.reference[b]+r.reference[m]-f[m]-r.floating[b],w=f[m]-r.reference[m],E=await(n.getOffsetParent==null?void 0:n.getOffsetParent(h));let M=E?E[C]:0;(!M||!await(n.isElement==null?void 0:n.isElement(E)))&&(M=l.floating[C]||r.floating[b]);const B=v/2-w/2,O=M/2-x[b]/2-1,I=ne(u[T],O),at=ne(u[y],O),it=I,mt=M-x[b]-at,ot=M/2-x[b]/2+B,Dt=fo(it,ot,mt),Wt=!d.arrow&&Fe(s)!=null&&ot!==Dt&&r.reference[b]/2-(ot<it?I:at)-x[b]/2<0,Ot=Wt?ot<it?ot-it:ot-mt:0;return{[m]:f[m]+Ot,data:{[m]:Dt,centerOffset:ot-Dt-Ot,...Wt&&{alignmentOffset:Ot}},reset:Wt}}}),Za=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var i,o;const{placement:s,middlewareData:r,rects:n,initialPlacement:l,platform:d,elements:h}=t,{mainAxis:g=!0,crossAxis:u=!0,fallbackPlacements:f,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:x=!0,...z}=Me(e,t);if((i=r.arrow)!=null&&i.alignmentOffset)return{};const T=le(s),y=te(l),C=le(l)===l,v=await(d.isRTL==null?void 0:d.isRTL(h.floating)),w=f||(C||!x?[Pi(l)]:Ua(l)),E=b!=="none";!f&&E&&w.push(...qa(l,x,b,v));const M=[l,...w],B=await d.detectOverflow(t,z),O=[];let I=((o=r.flip)==null?void 0:o.overflows)||[];if(g&&O.push(B[T]),u){const ot=Ha(s,n,v);O.push(B[ot[0]],B[ot[1]])}if(I=[...I,{placement:s,overflows:O}],!O.every(ot=>ot<=0)){var at,it;const ot=(((at=r.flip)==null?void 0:at.index)||0)+1,Dt=M[ot];if(Dt&&(!(u==="alignment"?y!==te(Dt):!1)||I.every(Rt=>te(Rt.placement)===y?Rt.overflows[0]>0:!0)))return{data:{index:ot,overflows:I},reset:{placement:Dt}};let Wt=(it=I.filter(Ot=>Ot.overflows[0]<=0).sort((Ot,Rt)=>Ot.overflows[1]-Rt.overflows[1])[0])==null?void 0:it.placement;if(!Wt)switch(m){case"bestFit":{var mt;const Ot=(mt=I.filter(Rt=>{if(E){const oe=te(Rt.placement);return oe===y||oe==="y"}return!0}).map(Rt=>[Rt.placement,Rt.overflows.filter(oe=>oe>0).reduce((oe,Lr)=>oe+Lr,0)]).sort((Rt,oe)=>Rt[1]-oe[1])[0])==null?void 0:mt[0];Ot&&(Wt=Ot);break}case"initialPlacement":Wt=l;break}if(s!==Wt)return{reset:{placement:Wt}}}return{}}}},Qa=new Set(["left","top"]);async function Ja(e,t){const{placement:i,platform:o,elements:s}=e,r=await(o.isRTL==null?void 0:o.isRTL(s.floating)),n=le(i),l=Fe(i),d=te(i)==="y",h=Qa.has(n)?-1:1,g=r&&d?-1:1,u=Me(t,e);let{mainAxis:f,crossAxis:m,alignmentAxis:b}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return l&&typeof b=="number"&&(m=l==="end"?b*-1:b),d?{x:m*g,y:f*h}:{x:f*h,y:m*g}}const tn=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var i,o;const{x:s,y:r,placement:n,middlewareData:l}=t,d=await Ja(t,e);return n===((i=l.offset)==null?void 0:i.placement)&&(o=l.arrow)!=null&&o.alignmentOffset?{}:{x:s+d.x,y:r+d.y,data:{...d,placement:n}}}}},en=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:i,y:o,placement:s,platform:r}=t,{mainAxis:n=!0,crossAxis:l=!1,limiter:d={fn:T=>{let{x:y,y:C}=T;return{x:y,y:C}}},...h}=Me(e,t),g={x:i,y:o},u=await r.detectOverflow(t,h),f=te(le(s)),m=lr(f);let b=g[m],x=g[f];if(n){const T=m==="y"?"top":"left",y=m==="y"?"bottom":"right",C=b+u[T],v=b-u[y];b=fo(C,b,v)}if(l){const T=f==="y"?"top":"left",y=f==="y"?"bottom":"right",C=x+u[T],v=x-u[y];x=fo(C,x,v)}const z=d.fn({...t,[m]:b,[f]:x});return{...z,data:{x:z.x-i,y:z.y-o,enabled:{[m]:n,[f]:l}}}}}},on=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var i,o;const{placement:s,rects:r,platform:n,elements:l}=t,{apply:d=()=>{},...h}=Me(e,t),g=await n.detectOverflow(t,h),u=le(s),f=Fe(s),m=te(s)==="y",{width:b,height:x}=r.floating;let z,T;u==="top"||u==="bottom"?(z=u,T=f===(await(n.isRTL==null?void 0:n.isRTL(l.floating))?"start":"end")?"left":"right"):(T=u,z=f==="end"?"top":"bottom");const y=x-g.top-g.bottom,C=b-g.left-g.right,v=ne(x-g[z],y),w=ne(b-g[T],C),E=!t.middlewareData.shift;let M=v,B=w;if((i=t.middlewareData.shift)!=null&&i.enabled.x&&(B=C),(o=t.middlewareData.shift)!=null&&o.enabled.y&&(M=y),E&&!f){const I=$t(g.left,0),at=$t(g.right,0),it=$t(g.top,0),mt=$t(g.bottom,0);m?B=b-2*(I!==0||at!==0?I+at:$t(g.left,g.right)):M=x-2*(it!==0||mt!==0?it+mt:$t(g.top,g.bottom))}await d({...t,availableWidth:B,availableHeight:M});const O=await n.getDimensions(l.floating);return b!==O.width||x!==O.height?{reset:{rects:!0}}:{}}}};function Vi(){return typeof window<"u"}function Be(e){return dr(e)?(e.nodeName||"").toLowerCase():"#document"}function zt(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Xt(e){var t;return(t=(dr(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function dr(e){return Vi()?e instanceof Node||e instanceof zt(e).Node:!1}function Mt(e){return Vi()?e instanceof Element||e instanceof zt(e).Element:!1}function Gt(e){return Vi()?e instanceof HTMLElement||e instanceof zt(e).HTMLElement:!1}function zs(e){return!Vi()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof zt(e).ShadowRoot}const sn=new Set(["inline","contents"]);function mi(e){const{overflow:t,overflowX:i,overflowY:o,display:s}=Ft(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+i)&&!sn.has(s)}const rn=new Set(["table","td","th"]);function an(e){return rn.has(Be(e))}const nn=[":popover-open",":modal"];function Hi(e){return nn.some(t=>{try{return e.matches(t)}catch{return!1}})}const ln=["transform","translate","scale","rotate","perspective"],cn=["transform","translate","scale","rotate","perspective","filter"],dn=["paint","layout","strict","content"];function Ui(e){const t=Zo(),i=Mt(e)?Ft(e):e;return ln.some(o=>i[o]?i[o]!=="none":!1)||(i.containerType?i.containerType!=="normal":!1)||!t&&(i.backdropFilter?i.backdropFilter!=="none":!1)||!t&&(i.filter?i.filter!=="none":!1)||cn.some(o=>(i.willChange||"").includes(o))||dn.some(o=>(i.contain||"").includes(o))}function pn(e){let t=ce(e);for(;Gt(t)&&!Oe(t);){if(Ui(t))return t;if(Hi(t))return null;t=ce(t)}return null}function Zo(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const hn=new Set(["html","body","#document"]);function Oe(e){return hn.has(Be(e))}function Ft(e){return zt(e).getComputedStyle(e)}function Ni(e){return Mt(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function ce(e){if(Be(e)==="html")return e;const t=e.assignedSlot||e.parentNode||zs(e)&&e.host||Xt(e);return zs(t)?t.host:t}function pr(e){const t=ce(e);return Oe(t)?e.ownerDocument?e.ownerDocument.body:e.body:Gt(t)&&mi(t)?t:pr(t)}function li(e,t,i){var o;t===void 0&&(t=[]),i===void 0&&(i=!0);const s=pr(e),r=s===((o=e.ownerDocument)==null?void 0:o.body),n=zt(s);if(r){const l=mo(n);return t.concat(n,n.visualViewport||[],mi(s)?s:[],l&&i?li(l):[])}return t.concat(s,li(s,[],i))}function mo(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function hr(e){const t=Ft(e);let i=parseFloat(t.width)||0,o=parseFloat(t.height)||0;const s=Gt(e),r=s?e.offsetWidth:i,n=s?e.offsetHeight:o,l=Li(i)!==r||Li(o)!==n;return l&&(i=r,o=n),{width:i,height:o,$:l}}function Qo(e){return Mt(e)?e:e.contextElement}function De(e){const t=Qo(e);if(!Gt(t))return Kt(1);const i=t.getBoundingClientRect(),{width:o,height:s,$:r}=hr(t);let n=(r?Li(i.width):i.width)/o,l=(r?Li(i.height):i.height)/s;return(!n||!Number.isFinite(n))&&(n=1),(!l||!Number.isFinite(l))&&(l=1),{x:n,y:l}}const un=Kt(0);function ur(e){const t=zt(e);return!Zo()||!t.visualViewport?un:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function fn(e,t,i){return t===void 0&&(t=!1),!i||t&&i!==zt(e)?!1:t}function ye(e,t,i,o){t===void 0&&(t=!1),i===void 0&&(i=!1);const s=e.getBoundingClientRect(),r=Qo(e);let n=Kt(1);t&&(o?Mt(o)&&(n=De(o)):n=De(e));const l=fn(r,i,o)?ur(r):Kt(0);let d=(s.left+l.x)/n.x,h=(s.top+l.y)/n.y,g=s.width/n.x,u=s.height/n.y;if(r){const f=zt(r),m=o&&Mt(o)?zt(o):o;let b=f,x=mo(b);for(;x&&o&&m!==b;){const z=De(x),T=x.getBoundingClientRect(),y=Ft(x),C=T.left+(x.clientLeft+parseFloat(y.paddingLeft))*z.x,v=T.top+(x.clientTop+parseFloat(y.paddingTop))*z.y;d*=z.x,h*=z.y,g*=z.x,u*=z.y,d+=C,h+=v,b=zt(x),x=mo(b)}}return Oi({width:g,height:u,x:d,y:h})}function ji(e,t){const i=Ni(e).scrollLeft;return t?t.left+i:ye(Xt(e)).left+i}function fr(e,t){const i=e.getBoundingClientRect(),o=i.left+t.scrollLeft-ji(e,i),s=i.top+t.scrollTop;return{x:o,y:s}}function gn(e){let{elements:t,rect:i,offsetParent:o,strategy:s}=e;const r=s==="fixed",n=Xt(o),l=t?Hi(t.floating):!1;if(o===n||l&&r)return i;let d={scrollLeft:0,scrollTop:0},h=Kt(1);const g=Kt(0),u=Gt(o);if((u||!u&&!r)&&((Be(o)!=="body"||mi(n))&&(d=Ni(o)),Gt(o))){const m=ye(o);h=De(o),g.x=m.x+o.clientLeft,g.y=m.y+o.clientTop}const f=n&&!u&&!r?fr(n,d):Kt(0);return{width:i.width*h.x,height:i.height*h.y,x:i.x*h.x-d.scrollLeft*h.x+g.x+f.x,y:i.y*h.y-d.scrollTop*h.y+g.y+f.y}}function mn(e){return Array.from(e.getClientRects())}function bn(e){const t=Xt(e),i=Ni(e),o=e.ownerDocument.body,s=$t(t.scrollWidth,t.clientWidth,o.scrollWidth,o.clientWidth),r=$t(t.scrollHeight,t.clientHeight,o.scrollHeight,o.clientHeight);let n=-i.scrollLeft+ji(e);const l=-i.scrollTop;return Ft(o).direction==="rtl"&&(n+=$t(t.clientWidth,o.clientWidth)-s),{width:s,height:r,x:n,y:l}}const Ss=25;function vn(e,t){const i=zt(e),o=Xt(e),s=i.visualViewport;let r=o.clientWidth,n=o.clientHeight,l=0,d=0;if(s){r=s.width,n=s.height;const g=Zo();(!g||g&&t==="fixed")&&(l=s.offsetLeft,d=s.offsetTop)}const h=ji(o);if(h<=0){const g=o.ownerDocument,u=g.body,f=getComputedStyle(u),m=g.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,b=Math.abs(o.clientWidth-u.clientWidth-m);b<=Ss&&(r-=b)}else h<=Ss&&(r+=h);return{width:r,height:n,x:l,y:d}}const xn=new Set(["absolute","fixed"]);function yn(e,t){const i=ye(e,!0,t==="fixed"),o=i.top+e.clientTop,s=i.left+e.clientLeft,r=Gt(e)?De(e):Kt(1),n=e.clientWidth*r.x,l=e.clientHeight*r.y,d=s*r.x,h=o*r.y;return{width:n,height:l,x:d,y:h}}function As(e,t,i){let o;if(t==="viewport")o=vn(e,i);else if(t==="document")o=bn(Xt(e));else if(Mt(t))o=yn(t,i);else{const s=ur(e);o={x:t.x-s.x,y:t.y-s.y,width:t.width,height:t.height}}return Oi(o)}function gr(e,t){const i=ce(e);return i===t||!Mt(i)||Oe(i)?!1:Ft(i).position==="fixed"||gr(i,t)}function wn(e,t){const i=t.get(e);if(i)return i;let o=li(e,[],!1).filter(l=>Mt(l)&&Be(l)!=="body"),s=null;const r=Ft(e).position==="fixed";let n=r?ce(e):e;for(;Mt(n)&&!Oe(n);){const l=Ft(n),d=Ui(n);!d&&l.position==="fixed"&&(s=null),(r?!d&&!s:!d&&l.position==="static"&&!!s&&xn.has(s.position)||mi(n)&&!d&&gr(e,n))?o=o.filter(g=>g!==n):s=l,n=ce(n)}return t.set(e,o),o}function _n(e){let{element:t,boundary:i,rootBoundary:o,strategy:s}=e;const n=[...i==="clippingAncestors"?Hi(t)?[]:wn(t,this._c):[].concat(i),o],l=n[0],d=n.reduce((h,g)=>{const u=As(t,g,s);return h.top=$t(u.top,h.top),h.right=ne(u.right,h.right),h.bottom=ne(u.bottom,h.bottom),h.left=$t(u.left,h.left),h},As(t,l,s));return{width:d.right-d.left,height:d.bottom-d.top,x:d.left,y:d.top}}function kn(e){const{width:t,height:i}=hr(e);return{width:t,height:i}}function $n(e,t,i){const o=Gt(t),s=Xt(t),r=i==="fixed",n=ye(e,!0,r,t);let l={scrollLeft:0,scrollTop:0};const d=Kt(0);function h(){d.x=ji(s)}if(o||!o&&!r)if((Be(t)!=="body"||mi(s))&&(l=Ni(t)),o){const m=ye(t,!0,r,t);d.x=m.x+t.clientLeft,d.y=m.y+t.clientTop}else s&&h();r&&!o&&s&&h();const g=s&&!o&&!r?fr(s,l):Kt(0),u=n.left+l.scrollLeft-d.x-g.x,f=n.top+l.scrollTop-d.y-g.y;return{x:u,y:f,width:n.width,height:n.height}}function eo(e){return Ft(e).position==="static"}function Es(e,t){if(!Gt(e)||Ft(e).position==="fixed")return null;if(t)return t(e);let i=e.offsetParent;return Xt(e)===i&&(i=i.ownerDocument.body),i}function mr(e,t){const i=zt(e);if(Hi(e))return i;if(!Gt(e)){let s=ce(e);for(;s&&!Oe(s);){if(Mt(s)&&!eo(s))return s;s=ce(s)}return i}let o=Es(e,t);for(;o&&an(o)&&eo(o);)o=Es(o,t);return o&&Oe(o)&&eo(o)&&!Ui(o)?i:o||pn(e)||i}const Cn=async function(e){const t=this.getOffsetParent||mr,i=this.getDimensions,o=await i(e.floating);return{reference:$n(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function zn(e){return Ft(e).direction==="rtl"}const Ti={convertOffsetParentRelativeRectToViewportRelativeRect:gn,getDocumentElement:Xt,getClippingRect:_n,getOffsetParent:mr,getElementRects:Cn,getClientRects:mn,getDimensions:kn,getScale:De,isElement:Mt,isRTL:zn};function br(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Sn(e,t){let i=null,o;const s=Xt(e);function r(){var l;clearTimeout(o),(l=i)==null||l.disconnect(),i=null}function n(l,d){l===void 0&&(l=!1),d===void 0&&(d=1),r();const h=e.getBoundingClientRect(),{left:g,top:u,width:f,height:m}=h;if(l||t(),!f||!m)return;const b=ki(u),x=ki(s.clientWidth-(g+f)),z=ki(s.clientHeight-(u+m)),T=ki(g),C={rootMargin:-b+"px "+-x+"px "+-z+"px "+-T+"px",threshold:$t(0,ne(1,d))||1};let v=!0;function w(E){const M=E[0].intersectionRatio;if(M!==d){if(!v)return n();M?n(!1,M):o=setTimeout(()=>{n(!1,1e-7)},1e3)}M===1&&!br(h,e.getBoundingClientRect())&&n(),v=!1}try{i=new IntersectionObserver(w,{...C,root:s.ownerDocument})}catch{i=new IntersectionObserver(w,C)}i.observe(e)}return n(!0),r}function An(e,t,i,o){o===void 0&&(o={});const{ancestorScroll:s=!0,ancestorResize:r=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:d=!1}=o,h=Qo(e),g=s||r?[...h?li(h):[],...li(t)]:[];g.forEach(T=>{s&&T.addEventListener("scroll",i,{passive:!0}),r&&T.addEventListener("resize",i)});const u=h&&l?Sn(h,i):null;let f=-1,m=null;n&&(m=new ResizeObserver(T=>{let[y]=T;y&&y.target===h&&m&&(m.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var C;(C=m)==null||C.observe(t)})),i()}),h&&!d&&m.observe(h),m.observe(t));let b,x=d?ye(e):null;d&&z();function z(){const T=ye(e);x&&!br(x,T)&&i(),x=T,b=requestAnimationFrame(z)}return i(),()=>{var T;g.forEach(y=>{s&&y.removeEventListener("scroll",i),r&&y.removeEventListener("resize",i)}),u==null||u(),(T=m)==null||T.disconnect(),m=null,d&&cancelAnimationFrame(b)}}const En=tn,Tn=en,In=Za,Ts=on,Dn=Ya,Ln=(e,t,i)=>{const o=new Map,s={platform:Ti,...i},r={...s.platform,_c:o};return Xa(e,t,{...s,platform:r})};function Pn(e){return On(e)}function io(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function On(e){for(let t=e;t;t=io(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=io(e);t;t=io(t)){if(!(t instanceof Element))continue;const i=getComputedStyle(t);if(i.display!=="contents"&&(i.position!=="static"||Ui(i)||t.tagName==="BODY"))return t}return null}function Rn(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e.contextElement instanceof Element:!0)}var W=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom");let o=0,s=0,r=0,n=0,l=0,d=0,h=0,g=0;i?e.top<t.top?(o=e.left,s=e.bottom,r=e.right,n=e.bottom,l=t.left,d=t.top,h=t.right,g=t.top):(o=t.left,s=t.bottom,r=t.right,n=t.bottom,l=e.left,d=e.top,h=e.right,g=e.top):e.left<t.left?(o=e.right,s=e.top,r=t.left,n=t.top,l=e.right,d=e.bottom,h=t.left,g=t.bottom):(o=t.right,s=t.top,r=e.left,n=e.top,l=t.right,d=t.bottom,h=e.left,g=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${r}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${g}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||Rn(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=An(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl)return;const e=[En({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(Ts({apply:({rects:i})=>{const o=this.sync==="width"||this.sync==="both",s=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${i.reference.width}px`:"",this.popup.style.height=s?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&e.push(In({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(Tn({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?e.push(Ts({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(Dn({element:this.arrowEl,padding:this.arrowPadding}));const t=this.strategy==="absolute"?i=>Ti.getOffsetParent(i,Pn):Ti.getOffsetParent;Ln(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.strategy,platform:pi(ee({},Ti),{getOffsetParent:t})}).then(({x:i,y:o,middlewareData:s,placement:r})=>{const n=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${i}px`,top:`${o}px`}),this.arrow){const d=s.arrow.x,h=s.arrow.y;let g="",u="",f="",m="";if(this.arrowPlacement==="start"){const b=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";g=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",u=n?b:"",m=n?"":b}else if(this.arrowPlacement==="end"){const b=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";u=n?"":b,m=n?b:"",f=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(m=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":"",g=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(m=typeof d=="number"?`${d}px`:"",g=typeof h=="number"?`${h}px`:"");Object.assign(this.arrowEl.style,{top:g,right:u,bottom:f,left:m,[l]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return p`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${L({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${L({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?p`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};W.styles=[P,Ma];a([$(".popup")],W.prototype,"popup",2);a([$(".popup__arrow")],W.prototype,"arrowEl",2);a([c()],W.prototype,"anchor",2);a([c({type:Boolean,reflect:!0})],W.prototype,"active",2);a([c({reflect:!0})],W.prototype,"placement",2);a([c({reflect:!0})],W.prototype,"strategy",2);a([c({type:Number})],W.prototype,"distance",2);a([c({type:Number})],W.prototype,"skidding",2);a([c({type:Boolean})],W.prototype,"arrow",2);a([c({attribute:"arrow-placement"})],W.prototype,"arrowPlacement",2);a([c({attribute:"arrow-padding",type:Number})],W.prototype,"arrowPadding",2);a([c({type:Boolean})],W.prototype,"flip",2);a([c({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(t=>t.trim()).filter(t=>t!==""),toAttribute:e=>e.join(" ")}})],W.prototype,"flipFallbackPlacements",2);a([c({attribute:"flip-fallback-strategy"})],W.prototype,"flipFallbackStrategy",2);a([c({type:Object})],W.prototype,"flipBoundary",2);a([c({attribute:"flip-padding",type:Number})],W.prototype,"flipPadding",2);a([c({type:Boolean})],W.prototype,"shift",2);a([c({type:Object})],W.prototype,"shiftBoundary",2);a([c({attribute:"shift-padding",type:Number})],W.prototype,"shiftPadding",2);a([c({attribute:"auto-size"})],W.prototype,"autoSize",2);a([c()],W.prototype,"sync",2);a([c({type:Object})],W.prototype,"autoSizeBoundary",2);a([c({attribute:"auto-size-padding",type:Number})],W.prototype,"autoSizePadding",2);a([c({attribute:"hover-bridge",type:Boolean})],W.prototype,"hoverBridge",2);function xt(e,t){return new Promise(i=>{function o(s){s.target===e&&(e.removeEventListener(t,o),i())}e.addEventListener(t,o)})}var ct=class extends A{constructor(){super(),this.localize=new U(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{e.key==="Escape"&&(e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const e=ws(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const e=ws(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),e)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}async handleOpenChange(){var e,t;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await rt(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:i,options:o}=Y(this,"tooltip.show",{dir:this.localize.dir()});await J(this.popup.popup,i,o),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await rt(this.body);const{keyframes:i,options:o}=Y(this,"tooltip.hide",{dir:this.localize.dir()});await J(this.popup.popup,i,o),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,xt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,xt(this,"sl-after-hide")}render(){return p`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${L({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};ct.styles=[P,Ra];ct.dependencies={"sl-popup":W};a([$("slot:not([name])")],ct.prototype,"defaultSlot",2);a([$(".tooltip__body")],ct.prototype,"body",2);a([$("sl-popup")],ct.prototype,"popup",2);a([c()],ct.prototype,"content",2);a([c()],ct.prototype,"placement",2);a([c({type:Boolean,reflect:!0})],ct.prototype,"disabled",2);a([c({type:Number})],ct.prototype,"distance",2);a([c({type:Boolean,reflect:!0})],ct.prototype,"open",2);a([c({type:Number})],ct.prototype,"skidding",2);a([c()],ct.prototype,"trigger",2);a([c({type:Boolean})],ct.prototype,"hoist",2);a([_("open",{waitUntilFirstUpdate:!0})],ct.prototype,"handleOpenChange",1);a([_(["content","distance","hoist","placement","skidding"])],ct.prototype,"handleOptionsChange",1);a([_("disabled")],ct.prototype,"handleDisabledChange",1);j("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});j("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});ct.define("sl-tooltip");var Mn=k`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--sl-color-neutral-200);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--sl-spacing-large);

    display: block;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`;function st(e,t,i){const o=s=>Object.is(s,-0)?0:s;return e<t?o(t):e>i?o(i):o(e)}function Is(e,t=!1){function i(r){const n=r.getChildrenItems({includeDisabled:!1});if(n.length){const l=n.every(h=>h.selected),d=n.every(h=>!h.selected&&!h.indeterminate);r.selected=l,r.indeterminate=!l&&!d}}function o(r){const n=r.parentElement;Qe.isTreeItem(n)&&(i(n),o(n))}function s(r){for(const n of r.getChildrenItems())n.selected=t?r.selected||n.selected:!n.disabled&&r.selected,s(n);t&&i(r)}s(e),o(e)}var _e=class extends A{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new U(this),this.initTreeItem=e=>{e.selectable=this.selection==="multiple",["expand","collapse"].filter(t=>!!this.querySelector(`[slot="${t}-icon"]`)).forEach(t=>{const i=e.querySelector(`[slot="${t}-icon"]`),o=this.getExpandButtonIcon(t);o&&(i===null?e.append(o):i.hasAttribute("data-default")&&i.replaceWith(o))})},this.handleTreeChanged=e=>{for(const t of e){const i=[...t.addedNodes].filter(Qe.isTreeItem),o=[...t.removedNodes].filter(Qe.isTreeItem);i.forEach(this.initTreeItem),this.lastFocusedItem&&o.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=e=>{const t=e.relatedTarget;(!t||!this.contains(t))&&(this.tabIndex=0)},this.handleFocusIn=e=>{const t=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),Qe.isTreeItem(t)&&!t.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=t,this.tabIndex=-1,t.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect()}getExpandButtonIcon(e){const i=(e==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(i){const o=i.cloneNode(!0);return[o,...o.querySelectorAll("[id]")].forEach(s=>s.removeAttribute("id")),o.setAttribute("data-default",""),o.slot=`${e}-icon`,o}return null}selectItem(e){const t=[...this.selectedItems];if(this.selection==="multiple")e.selected=!e.selected,e.lazy&&(e.expanded=!0),Is(e);else if(this.selection==="single"||e.isLeaf){const o=this.getAllTreeItems();for(const s of o)s.selected=s===e}else this.selection==="leaf"&&(e.expanded=!e.expanded);const i=this.selectedItems;(t.length!==i.length||i.some(o=>!t.includes(o)))&&Promise.all(i.map(o=>o.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:i}})})}getAllTreeItems(){return[...this.querySelectorAll("sl-tree-item")]}focusItem(e){e==null||e.focus()}handleKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(e.key)||e.composedPath().some(s=>{var r;return["input","textarea"].includes((r=s==null?void 0:s.tagName)==null?void 0:r.toLowerCase())}))return;const t=this.getFocusableItems(),i=this.localize.dir()==="ltr",o=this.localize.dir()==="rtl";if(t.length>0){e.preventDefault();const s=t.findIndex(d=>d.matches(":focus")),r=t[s],n=d=>{const h=t[st(d,0,t.length-1)];this.focusItem(h)},l=d=>{r.expanded=d};e.key==="ArrowDown"?n(s+1):e.key==="ArrowUp"?n(s-1):i&&e.key==="ArrowRight"||o&&e.key==="ArrowLeft"?!r||r.disabled||r.expanded||r.isLeaf&&!r.lazy?n(s+1):l(!0):i&&e.key==="ArrowLeft"||o&&e.key==="ArrowRight"?!r||r.disabled||r.isLeaf||!r.expanded?n(s-1):l(!1):e.key==="Home"?n(0):e.key==="End"?n(t.length-1):(e.key==="Enter"||e.key===" ")&&(r.disabled||this.selectItem(r))}}handleClick(e){const t=e.target,i=t.closest("sl-tree-item"),o=e.composedPath().some(s=>{var r;return(r=s==null?void 0:s.classList)==null?void 0:r.contains("tree-item__expand-button")});!i||i.disabled||t!==this.clickTarget||(o?i.expanded=!i.expanded:this.selectItem(i))}handleMouseDown(e){this.clickTarget=e.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){const e=this.selection==="multiple",t=this.getAllTreeItems();this.setAttribute("aria-multiselectable",e?"true":"false");for(const i of t)i.selectable=e;e&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(i=>Is(i,!0)))}get selectedItems(){const e=this.getAllTreeItems(),t=i=>i.selected;return e.filter(t)}getFocusableItems(){const e=this.getAllTreeItems(),t=new Set;return e.filter(i=>{var o;if(i.disabled)return!1;const s=(o=i.parentElement)==null?void 0:o.closest("[role=treeitem]");return s&&(!s.expanded||s.loading||t.has(s))&&t.add(i),!t.has(i)})}render(){return p`
      <div
        part="base"
        class="tree"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span hidden aria-hidden="true"><slot name="expand-icon"></slot></span>
        <span hidden aria-hidden="true"><slot name="collapse-icon"></slot></span>
      </div>
    `}};_e.styles=[P,Mn];a([$("slot:not([name])")],_e.prototype,"defaultSlot",2);a([$("slot[name=expand-icon]")],_e.prototype,"expandedIconSlot",2);a([$("slot[name=collapse-icon]")],_e.prototype,"collapsedIconSlot",2);a([c()],_e.prototype,"selection",2);a([_("selection")],_e.prototype,"handleSelectionChange",1);_e.define("sl-tree");var Fn=k`
  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`,Jo=class extends A{render(){return p` <slot></slot> `}};Jo.styles=[P,Fn];Jo.define("sl-visually-hidden");var Bn=k`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`,Vn=0,bi=class extends A{constructor(){super(...arguments),this.attrId=++Vn,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return p`
      <slot
        part="base"
        class=${L({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};bi.styles=[P,Bn];a([c({reflect:!0})],bi.prototype,"name",2);a([c({type:Boolean,reflect:!0})],bi.prototype,"active",2);a([_("active")],bi.prototype,"handleActiveChange",1);bi.define("sl-tab-panel");var Hn=k`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,Un=k`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vr=Symbol.for(""),Nn=e=>{if((e==null?void 0:e.r)===vr)return e==null?void 0:e._$litStatic$},Ri=(e,...t)=>({_$litStatic$:t.reduce((i,o,s)=>i+(r=>{if(r._$litStatic$!==void 0)return r._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${r}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+e[s+1],e[0]),r:vr}),Ds=new Map,jn=e=>(t,...i)=>{const o=i.length;let s,r;const n=[],l=[];let d,h=0,g=!1;for(;h<o;){for(d=t[h];h<o&&(r=i[h],(s=Nn(r))!==void 0);)d+=s+t[++h],g=!0;h!==o&&l.push(r),n.push(d),h++}if(h===o&&n.push(t[o]),g){const u=n.join("$$lit$$");(t=Ds.get(u))===void 0&&(n.raw=n,Ds.set(u,t=n)),i=l}return e(t,...i)},Je=jn(p);var lt=class extends A{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}render(){const e=!!this.href,t=e?Ri`a`:Ri`button`;return Je`
      <${t}
        part="base"
        class=${L({"icon-button":!0,"icon-button--disabled":!e&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${S(e?void 0:this.disabled)}
        type=${S(e?void 0:"button")}
        href=${S(e?this.href:void 0)}
        target=${S(e?this.target:void 0)}
        download=${S(e?this.download:void 0)}
        rel=${S(e&&this.target?"noreferrer noopener":void 0)}
        role=${S(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${S(this.name)}
          library=${S(this.library)}
          src=${S(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${t}>
    `}};lt.styles=[P,Un];lt.dependencies={"sl-icon":K};a([$(".icon-button")],lt.prototype,"button",2);a([D()],lt.prototype,"hasFocus",2);a([c()],lt.prototype,"name",2);a([c()],lt.prototype,"library",2);a([c()],lt.prototype,"src",2);a([c()],lt.prototype,"href",2);a([c()],lt.prototype,"target",2);a([c()],lt.prototype,"download",2);a([c()],lt.prototype,"label",2);a([c({type:Boolean,reflect:!0})],lt.prototype,"disabled",2);var de=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return p`
      <span
        part="base"
        class=${L({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?p`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};de.styles=[P,Hn];de.dependencies={"sl-icon-button":lt};a([c({reflect:!0})],de.prototype,"variant",2);a([c({reflect:!0})],de.prototype,"size",2);a([c({type:Boolean,reflect:!0})],de.prototype,"pill",2);a([c({type:Boolean})],de.prototype,"removable",2);de.define("sl-tag");var Wn=k`
  :host {
    display: block;
  }

  .textarea {
    display: grid;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control,
  .textarea__size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .textarea__size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`,N=class extends A{constructor(){super(...arguments),this.formControlController=new ie(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new yt(this,"help-text","label"),this.hasFocus=!1,this.title="",this.name="",this.value="",this.size="medium",this.filled=!1,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.form="",this.required=!1,this.spellcheck=!0,this.defaultValue=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)})}firstUpdated(){this.formControlController.updateValidity()}disconnectedCallback(){var e;super.disconnectedCallback(),this.input&&((e=this.resizeObserver)==null||e.unobserve(this.input))}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=""}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleRowsChange(){this.setTextareaHeight()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(e){if(e){typeof e.top=="number"&&(this.input.scrollTop=e.top),typeof e.left=="number"&&(this.input.scrollLeft=e.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,t,i="none"){this.input.setSelectionRange(e,t,i)}setRangeText(e,t,i,o="preserve"){const s=t??this.input.selectionStart,r=i??this.input.selectionEnd;this.input.setRangeText(e,s,r,o),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight())}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),i=this.label?!0:!!e,o=this.helpText?!0:!!t;return p`
      <div
        part="form-control"
        class=${L({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${L({textarea:!0,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${S(this.name)}
              .value=${xe(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${S(this.placeholder)}
              rows=${S(this.rows)}
              minlength=${S(this.minlength)}
              maxlength=${S(this.maxlength)}
              autocapitalize=${S(this.autocapitalize)}
              autocorrect=${S(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${S(this.spellcheck)}
              enterkeyhint=${S(this.enterkeyhint)}
              inputmode=${S(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
            <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
            <div part="textarea-adjuster" class="textarea__size-adjuster" ?hidden=${this.resize!=="auto"}></div>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};N.styles=[P,we,Wn];a([$(".textarea__control")],N.prototype,"input",2);a([$(".textarea__size-adjuster")],N.prototype,"sizeAdjuster",2);a([D()],N.prototype,"hasFocus",2);a([c()],N.prototype,"title",2);a([c()],N.prototype,"name",2);a([c()],N.prototype,"value",2);a([c({reflect:!0})],N.prototype,"size",2);a([c({type:Boolean,reflect:!0})],N.prototype,"filled",2);a([c()],N.prototype,"label",2);a([c({attribute:"help-text"})],N.prototype,"helpText",2);a([c()],N.prototype,"placeholder",2);a([c({type:Number})],N.prototype,"rows",2);a([c()],N.prototype,"resize",2);a([c({type:Boolean,reflect:!0})],N.prototype,"disabled",2);a([c({type:Boolean,reflect:!0})],N.prototype,"readonly",2);a([c({reflect:!0})],N.prototype,"form",2);a([c({type:Boolean,reflect:!0})],N.prototype,"required",2);a([c({type:Number})],N.prototype,"minlength",2);a([c({type:Number})],N.prototype,"maxlength",2);a([c()],N.prototype,"autocapitalize",2);a([c()],N.prototype,"autocorrect",2);a([c()],N.prototype,"autocomplete",2);a([c({type:Boolean})],N.prototype,"autofocus",2);a([c()],N.prototype,"enterkeyhint",2);a([c({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],N.prototype,"spellcheck",2);a([c()],N.prototype,"inputmode",2);a([Re()],N.prototype,"defaultValue",2);a([_("disabled",{waitUntilFirstUpdate:!0})],N.prototype,"handleDisabledChange",1);a([_("rows",{waitUntilFirstUpdate:!0})],N.prototype,"handleRowsChange",1);a([_("value",{waitUntilFirstUpdate:!0})],N.prototype,"handleValueChange",1);N.define("sl-textarea");var qn=k`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) {
    color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`,Kn=0,Bt=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.attrId=++Kn,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(e){e.stopPropagation(),this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id.length>0?this.id:this.componentId,p`
      <div
        part="base"
        class=${L({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?p`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};Bt.styles=[P,qn];Bt.dependencies={"sl-icon-button":lt};a([$(".tab")],Bt.prototype,"tab",2);a([c({reflect:!0})],Bt.prototype,"panel",2);a([c({type:Boolean,reflect:!0})],Bt.prototype,"active",2);a([c({type:Boolean,reflect:!0})],Bt.prototype,"closable",2);a([c({type:Boolean,reflect:!0})],Bt.prototype,"disabled",2);a([c({type:Number,reflect:!0})],Bt.prototype,"tabIndex",2);a([_("active")],Bt.prototype,"handleActiveChange",1);a([_("disabled")],Bt.prototype,"handleDisabledChange",1);Bt.define("sl-tab");var Gn=k`
  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group--has-scroll-controls .tab-group__scroll-button--start--hidden,
  .tab-group--has-scroll-controls .tab-group__scroll-button--end--hidden {
    visibility: hidden;
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,Xn=k`
  :host {
    display: contents;
  }
`,vi=class extends A{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>{this.emit("sl-resize",{detail:{entries:e}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){const e=this.shadowRoot.querySelector("slot");if(e!==null){const t=e.assignedElements({flatten:!0});this.observedElements.forEach(i=>this.resizeObserver.unobserve(i)),this.observedElements=[],t.forEach(i=>{this.resizeObserver.observe(i),this.observedElements.push(i)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return p` <slot @slotchange=${this.handleSlotChange}></slot> `}};vi.styles=[P,Xn];a([c({type:Boolean,reflect:!0})],vi.prototype,"disabled",2);a([_("disabled",{waitUntilFirstUpdate:!0})],vi.prototype,"handleDisabledChange",1);function Yn(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}var bo=new Set;function Zn(){const e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}function Qn(){const e=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(e)||!e?0:e}function ti(e){if(bo.add(e),!document.documentElement.classList.contains("sl-scroll-lock")){const t=Zn()+Qn();let i=getComputedStyle(document.documentElement).scrollbarGutter;(!i||i==="auto")&&(i="stable"),t<2&&(i=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",i),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${t}px`)}}function ei(e){bo.delete(e),bo.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}function vo(e,t,i="vertical",o="smooth"){const s=Yn(e,t),r=s.top+t.scrollTop,n=s.left+t.scrollLeft,l=t.scrollLeft,d=t.scrollLeft+t.offsetWidth,h=t.scrollTop,g=t.scrollTop+t.offsetHeight;(i==="horizontal"||i==="both")&&(n<l?t.scrollTo({left:n,behavior:o}):n+e.clientWidth>d&&t.scrollTo({left:n-t.offsetWidth+e.clientWidth,behavior:o})),(i==="vertical"||i==="both")&&(r<h?t.scrollTo({top:r,behavior:o}):r+e.clientHeight>g&&t.scrollTo({top:r-t.offsetHeight+e.clientHeight,behavior:o}))}var ut=class extends A{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new U(this),this.hasScrollControls=!1,this.shouldHideScrollStartButton=!1,this.shouldHideScrollEndButton=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1,this.fixedScrollControls=!1,this.scrollOffset=1}connectedCallback(){const e=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(t=>{const i=t.filter(({target:o})=>{if(o===this)return!0;if(o.closest("sl-tab-group")!==this)return!1;const s=o.tagName.toLowerCase();return s==="sl-tab"||s==="sl-tab-panel"});if(i.length!==0){if(i.some(o=>!["aria-labelledby","aria-controls"].includes(o.attributeName))&&setTimeout(()=>this.setAriaLabels()),i.some(o=>o.attributeName==="disabled"))this.syncTabsAndPanels();else if(i.some(o=>o.attributeName==="active")){const s=i.filter(r=>r.attributeName==="active"&&r.target.tagName.toLowerCase()==="sl-tab").map(r=>r.target).find(r=>r.active);s&&this.setActiveTab(s)}}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,attributeFilter:["active","disabled","name","panel"],childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),e.then(()=>{new IntersectionObserver((i,o)=>{var s;i[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((s=this.getActiveTab())!=null?s:this.tabs[0],{emitEvents:!1}),o.unobserve(i[0].target))}).observe(this.tabGroup)})})}disconnectedCallback(){var e,t;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect(),this.nav&&((t=this.resizeObserver)==null||t.unobserve(this.nav))}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return[...this.body.assignedElements()].filter(e=>e.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){const i=e.target.closest("sl-tab");(i==null?void 0:i.closest("sl-tab-group"))===this&&i!==null&&this.setActiveTab(i,{scrollBehavior:"smooth"})}handleKeyDown(e){const i=e.target.closest("sl-tab");if((i==null?void 0:i.closest("sl-tab-group"))===this&&(["Enter"," "].includes(e.key)&&i!==null&&(this.setActiveTab(i,{scrollBehavior:"smooth"}),e.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key))){const s=this.tabs.find(l=>l.matches(":focus")),r=this.localize.dir()==="rtl";let n=null;if((s==null?void 0:s.tagName.toLowerCase())==="sl-tab"){if(e.key==="Home")n=this.focusableTabs[0];else if(e.key==="End")n=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&e.key===(r?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&e.key==="ArrowUp"){const l=this.tabs.findIndex(d=>d===s);n=this.findNextFocusableTab(l,"backward")}else if(["top","bottom"].includes(this.placement)&&e.key===(r?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&e.key==="ArrowDown"){const l=this.tabs.findIndex(d=>d===s);n=this.findNextFocusableTab(l,"forward")}if(!n)return;n.tabIndex=0,n.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(n,{scrollBehavior:"smooth"}):this.tabs.forEach(l=>{l.tabIndex=l===n?0:-1}),["top","bottom"].includes(this.placement)&&vo(n,this.nav,"horizontal"),e.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(e,t){if(t=ee({emitEvents:!0,scrollBehavior:"auto"},t),e!==this.activeTab&&!e.disabled){const i=this.activeTab;this.activeTab=e,this.tabs.forEach(o=>{o.active=o===this.activeTab,o.tabIndex=o===this.activeTab?0:-1}),this.panels.forEach(o=>{var s;return o.active=o.name===((s=this.activeTab)==null?void 0:s.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&vo(this.activeTab,this.nav,"horizontal",t.scrollBehavior),t.emitEvents&&(i&&this.emit("sl-tab-hide",{detail:{name:i.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(e=>{const t=this.panels.find(i=>i.name===e.panel);t&&(e.setAttribute("aria-controls",t.getAttribute("id")),t.setAttribute("aria-labelledby",e.getAttribute("id")))})}repositionIndicator(){const e=this.getActiveTab();if(!e)return;const t=e.clientWidth,i=e.clientHeight,o=this.localize.dir()==="rtl",s=this.getAllTabs(),n=s.slice(0,s.indexOf(e)).reduce((l,d)=>({left:l.left+d.clientWidth,top:l.top+d.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${t}px`,this.indicator.style.height="auto",this.indicator.style.translate=o?`${-1*n.left}px`:`${n.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${i}px`,this.indicator.style.translate=`0 ${n.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(e=>!e.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls())}findNextFocusableTab(e,t){let i=null;const o=t==="forward"?1:-1;let s=e+o;for(;e<this.tabs.length;){if(i=this.tabs[s]||null,i===null){t==="forward"?i=this.focusableTabs[0]:i=this.focusableTabs[this.focusableTabs.length-1];break}if(!i.disabled)break;s+=o}return i}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd())}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()==="rtl"?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons()}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(e){const t=this.tabs.find(i=>i.panel===e);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}render(){const e=this.localize.dir()==="rtl";return p`
      <div
        part="base"
        class=${L({"tab-group":!0,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?p`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${L({"tab-group__scroll-button":!0,"tab-group__scroll-button--start":!0,"tab-group__scroll-button--start--hidden":this.shouldHideScrollStartButton})}
                  name=${e?"chevron-right":"chevron-left"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav" @scrollend=${this.updateScrollButtons}>
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <sl-resize-observer @sl-resize=${this.syncIndicator}>
                <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
              </sl-resize-observer>
            </div>
          </div>

          ${this.hasScrollControls?p`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${L({"tab-group__scroll-button":!0,"tab-group__scroll-button--end":!0,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
                  name=${e?"chevron-left":"chevron-right"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};ut.styles=[P,Gn];ut.dependencies={"sl-icon-button":lt,"sl-resize-observer":vi};a([$(".tab-group")],ut.prototype,"tabGroup",2);a([$(".tab-group__body")],ut.prototype,"body",2);a([$(".tab-group__nav")],ut.prototype,"nav",2);a([$(".tab-group__indicator")],ut.prototype,"indicator",2);a([D()],ut.prototype,"hasScrollControls",2);a([D()],ut.prototype,"shouldHideScrollStartButton",2);a([D()],ut.prototype,"shouldHideScrollEndButton",2);a([c()],ut.prototype,"placement",2);a([c()],ut.prototype,"activation",2);a([c({attribute:"no-scroll-controls",type:Boolean})],ut.prototype,"noScrollControls",2);a([c({attribute:"fixed-scroll-controls",type:Boolean})],ut.prototype,"fixedScrollControls",2);a([hi({passive:!0})],ut.prototype,"updateScrollButtons",1);a([_("noScrollControls",{waitUntilFirstUpdate:!0})],ut.prototype,"updateScrollControls",1);a([_("placement",{waitUntilFirstUpdate:!0})],ut.prototype,"syncIndicator",1);ut.define("sl-tab-group");var Jn=k`
  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`,ts=class extends A{constructor(){super(...arguments),this.effect="none"}render(){return p`
      <div
        part="base"
        class=${L({skeleton:!0,"skeleton--pulse":this.effect==="pulse","skeleton--sheen":this.effect==="sheen"})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};ts.styles=[P,Jn];a([c()],ts.prototype,"effect",2);ts.define("sl-skeleton");var tl=k`
  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }

  @media (forced-colors: active) {
    .divider {
      outline: solid 1px transparent;
    }
  }
`;function ii(e,t){function i(s){const r=e.getBoundingClientRect(),n=e.ownerDocument.defaultView,l=r.left+n.scrollX,d=r.top+n.scrollY,h=s.pageX-l,g=s.pageY-d;t!=null&&t.onMove&&t.onMove(h,g)}function o(){document.removeEventListener("pointermove",i),document.removeEventListener("pointerup",o),t!=null&&t.onStop&&t.onStop()}document.addEventListener("pointermove",i,{passive:!0}),document.addEventListener("pointerup",o),(t==null?void 0:t.initialEvent)instanceof PointerEvent&&i(t.initialEvent)}var Ls=()=>null,St=class extends A{constructor(){super(...arguments),this.isCollapsed=!1,this.localize=new U(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=!1,this.disabled=!1,this.snapValue="",this.snapFunction=Ls,this.snapThreshold=12}toSnapFunction(e){const t=e.split(" ");return({pos:i,size:o,snapThreshold:s,isRtl:r,vertical:n})=>{let l=i,d=Number.POSITIVE_INFINITY;return t.forEach(h=>{let g;if(h.startsWith("repeat(")){const f=e.substring(7,e.length-1),m=f.endsWith("%"),b=Number.parseFloat(f),x=m?o*(b/100):b;g=Math.round((r&&!n?o-i:i)/x)*x}else h.endsWith("%")?g=o*(Number.parseFloat(h)/100):g=Number.parseFloat(h);r&&!n&&(g=o-g);const u=Math.abs(i-g);u<=s&&u<d&&(l=g,d=u)}),l}}set snap(e){this.snapValue=e??"",e?this.snapFunction=typeof e=="string"?this.toSnapFunction(e):e:this.snapFunction=Ls}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>this.handleResize(e)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.resizeObserver)==null||e.unobserve(this)}detectSize(){const{width:e,height:t}=this.getBoundingClientRect();this.size=this.vertical?t:e}percentageToPixels(e){return this.size*(e/100)}pixelsToPercentage(e){return e/this.size*100}handleDrag(e){const t=this.localize.dir()==="rtl";this.disabled||(e.cancelable&&e.preventDefault(),ii(this,{onMove:(i,o)=>{var s;let r=this.vertical?o:i;this.primary==="end"&&(r=this.size-r),r=(s=this.snapFunction({pos:r,size:this.size,snapThreshold:this.snapThreshold,isRtl:t,vertical:this.vertical}))!=null?s:r,this.position=st(this.pixelsToPercentage(r),0,100)},initialEvent:e}))}handleKeyDown(e){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(e.key)){let t=this.position;const i=(e.shiftKey?10:1)*(this.primary==="end"?-1:1);if(e.preventDefault(),(e.key==="ArrowLeft"&&!this.vertical||e.key==="ArrowUp"&&this.vertical)&&(t-=i),(e.key==="ArrowRight"&&!this.vertical||e.key==="ArrowDown"&&this.vertical)&&(t+=i),e.key==="Home"&&(t=this.primary==="end"?100:0),e.key==="End"&&(t=this.primary==="end"?0:100),e.key==="Enter")if(this.isCollapsed)t=this.positionBeforeCollapsing,this.isCollapsed=!1;else{const o=this.position;t=0,requestAnimationFrame(()=>{this.isCollapsed=!0,this.positionBeforeCollapsing=o})}this.position=st(t,0,100)}}handleResize(e){const{width:t,height:i}=e[0].contentRect;this.size=this.vertical?i:t,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=!1,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition")}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){const e=this.vertical?"gridTemplateRows":"gridTemplateColumns",t=this.vertical?"gridTemplateColumns":"gridTemplateRows",i=this.localize.dir()==="rtl",o=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,s="auto";return this.primary==="end"?i&&!this.vertical?this.style[e]=`${o} var(--divider-width) ${s}`:this.style[e]=`${s} var(--divider-width) ${o}`:i&&!this.vertical?this.style[e]=`${s} var(--divider-width) ${o}`:this.style[e]=`${o} var(--divider-width) ${s}`,this.style[t]="",p`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${S(this.disabled?void 0:"0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};St.styles=[P,tl];a([$(".divider")],St.prototype,"divider",2);a([c({type:Number,reflect:!0})],St.prototype,"position",2);a([c({attribute:"position-in-pixels",type:Number})],St.prototype,"positionInPixels",2);a([c({type:Boolean,reflect:!0})],St.prototype,"vertical",2);a([c({type:Boolean,reflect:!0})],St.prototype,"disabled",2);a([c()],St.prototype,"primary",2);a([c({reflect:!0})],St.prototype,"snap",1);a([c({type:Number,attribute:"snap-threshold"})],St.prototype,"snapThreshold",2);a([_("position")],St.prototype,"handlePositionChange",1);a([_("positionInPixels")],St.prototype,"handlePositionInPixelsChange",1);a([_("vertical")],St.prototype,"handleVerticalChange",1);St.define("sl-split-panel");var el=k`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`,bt=class extends A{constructor(){super(...arguments),this.formControlController=new ie(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t}),this.hasSlotController=new yt(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(e){e.key==="ArrowLeft"&&(e.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),e.key==="ArrowRight"&&(e.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("help-text"),t=this.helpText?!0:!!e;return p`
      <div
        class=${L({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":t})}
      >
        <label
          part="base"
          class=${L({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${S(this.value)}
            .checked=${xe(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${t?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};bt.styles=[P,we,el];a([$('input[type="checkbox"]')],bt.prototype,"input",2);a([D()],bt.prototype,"hasFocus",2);a([c()],bt.prototype,"title",2);a([c()],bt.prototype,"name",2);a([c()],bt.prototype,"value",2);a([c({reflect:!0})],bt.prototype,"size",2);a([c({type:Boolean,reflect:!0})],bt.prototype,"disabled",2);a([c({type:Boolean,reflect:!0})],bt.prototype,"checked",2);a([Re("checked")],bt.prototype,"defaultChecked",2);a([c({reflect:!0})],bt.prototype,"form",2);a([c({type:Boolean,reflect:!0})],bt.prototype,"required",2);a([c({attribute:"help-text"})],bt.prototype,"helpText",2);a([_("checked",{waitUntilFirstUpdate:!0})],bt.prototype,"handleCheckedChange",1);a([_("disabled",{waitUntilFirstUpdate:!0})],bt.prototype,"handleDisabledChange",1);bt.define("sl-switch");vi.define("sl-resize-observer");var il=k`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let xo=class extends fi{constructor(t){if(super(t),this.it=X,t.type!==qt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===X||t==null)return this._t=void 0,this.it=t;if(t===Ct)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}};xo.directiveName="unsafeHTML",xo.resultType=1;const oi=ui(xo);var V=class extends A{constructor(){super(...arguments),this.formControlController=new ie(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new yt(this,"help-text","label"),this.localize=new U(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=!1,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1,this.getTag=e=>p`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${t=>this.handleTagRemove(t,e)}
      >
        ${e.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=e=>{const t=e.composedPath();this&&!t.includes(this)&&this.hide()},this.handleDocumentKeyDown=e=>{const t=e.target,i=t.closest(".select__clear")!==null,o=t.closest("sl-icon-button")!==null;if(!(i||o)){if(e.key==="Escape"&&this.open&&!this.closeWatcher&&(e.preventDefault(),e.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),e.key==="Enter"||e.key===" "&&this.typeToSelectString===""){if(e.preventDefault(),e.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(e.key)){const s=this.getAllOptions(),r=s.indexOf(this.currentOption);let n=Math.max(0,r);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;e.key==="ArrowDown"?(n=r+1,n>s.length-1&&(n=0)):e.key==="ArrowUp"?(n=r-1,n<0&&(n=s.length-1)):e.key==="Home"?n=0:e.key==="End"&&(n=s.length-1),this.setCurrentOption(s[n])}if(e.key&&e.key.length===1||e.key==="Backspace"){const s=this.getAllOptions();if(e.metaKey||e.ctrlKey||e.altKey)return;if(!this.open){if(e.key==="Backspace")return;this.show()}e.stopPropagation(),e.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),e.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase();for(const r of s)if(r.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(r);break}}}},this.handleDocumentMouseDown=e=>{const t=e.composedPath();this&&!t.includes(this)&&this.hide()}}get value(){return this._value}set value(e){this.multiple?e=Array.isArray(e)?e:e.split(" "):e=Array.isArray(e)?e.join(" "):e,this._value!==e&&(this.valueHasChanged=!0,this._value=e)}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange()}),this.open=!1}addOpenListeners(){var e;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:!0}))})}removeOpenListeners(){var e;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(e=this.closeWatcher)==null||e.destroy()}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(e){const i=e.composedPath().some(o=>o instanceof Element&&o.tagName.toLowerCase()==="sl-icon-button");this.disabled||i||(e.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(e){e.key!=="Tab"&&(e.stopPropagation(),this.handleDocumentKeyDown(e))}handleClearClick(e){e.stopPropagation(),this.valueHasChanged=!0,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")}))}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault()}handleOptionClick(e){const i=e.target.closest("sl-option"),o=this.value;i&&!i.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(i):this.setSelectedOptions(i),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.value!==o&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());const e=this.getAllOptions(),t=this.valueHasChanged?this.value:this.defaultValue,i=Array.isArray(t)?t:[t],o=[];e.forEach(s=>o.push(s.value)),this.setSelectedOptions(e.filter(s=>i.includes(s.value)))}handleTagRemove(e,t){e.stopPropagation(),this.valueHasChanged=!0,this.disabled||(this.toggleOptionSelection(t,!1),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(e){this.getAllOptions().forEach(i=>{i.current=!1,i.tabIndex=-1}),e&&(this.currentOption=e,e.current=!0,e.tabIndex=0,e.focus())}setSelectedOptions(e){const t=this.getAllOptions(),i=Array.isArray(e)?e:[e];t.forEach(o=>o.selected=!1),i.length&&i.forEach(o=>o.selected=!0),this.selectionChanged()}toggleOptionSelection(e,t){t===!0||t===!1?e.selected=t:e.selected=!e.selected,this.selectionChanged()}selectionChanged(){var e,t,i;const o=this.getAllOptions();this.selectedOptions=o.filter(r=>r.selected);const s=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(r=>r.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const r=this.selectedOptions[0];this.value=(e=r==null?void 0:r.value)!=null?e:"",this.displayLabel=(i=(t=r==null?void 0:r.getTextLabel)==null?void 0:t.call(r))!=null?i:""}this.valueHasChanged=s,this.updateComplete.then(()=>{this.formControlController.updateValidity()})}get tags(){return this.selectedOptions.map((e,t)=>{if(t<this.maxOptionsVisible||this.maxOptionsVisible<=0){const i=this.getTag(e,t);return p`<div @sl-remove=${o=>this.handleTagRemove(o,e)}>
          ${typeof i=="string"?oi(i):i}
        </div>`}else if(t===this.maxOptionsVisible)return p`<sl-tag size=${this.size}>+${this.selectedOptions.length-t}</sl-tag>`;return p``})}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),e==="value"){const o=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=o}}handleValueChange(){if(!this.valueHasChanged){const i=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=i}const e=this.getAllOptions(),t=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(e.filter(i=>t.includes(i.value)))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await rt(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)});const{keyframes:e,options:t}=Y(this,"select.show",{dir:this.localize.dir()});await J(this.popup.popup,e,t),this.currentOption&&vo(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await rt(this);const{keyframes:e,options:t}=Y(this,"select.hide",{dir:this.localize.dir()});await J(this.popup.popup,e,t),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,xt(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,xt(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(e){this.valueInput.setCustomValidity(e),this.formControlController.updateValidity()}focus(e){this.displayInput.focus(e)}blur(){this.displayInput.blur()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),i=this.label?!0:!!e,o=this.helpText?!0:!!t,s=this.clearable&&!this.disabled&&this.value.length>0,r=this.placeholder&&this.value&&this.value.length<=0;return p`
      <div
        part="form-control"
        class=${L({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":o})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${i?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${L({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":r,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?p`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${s?p`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};V.styles=[P,we,il];V.dependencies={"sl-icon":K,"sl-popup":W,"sl-tag":de};a([$(".select")],V.prototype,"popup",2);a([$(".select__combobox")],V.prototype,"combobox",2);a([$(".select__display-input")],V.prototype,"displayInput",2);a([$(".select__value-input")],V.prototype,"valueInput",2);a([$(".select__listbox")],V.prototype,"listbox",2);a([D()],V.prototype,"hasFocus",2);a([D()],V.prototype,"displayLabel",2);a([D()],V.prototype,"currentOption",2);a([D()],V.prototype,"selectedOptions",2);a([D()],V.prototype,"valueHasChanged",2);a([c()],V.prototype,"name",2);a([D()],V.prototype,"value",1);a([c({attribute:"value"})],V.prototype,"defaultValue",2);a([c({reflect:!0})],V.prototype,"size",2);a([c()],V.prototype,"placeholder",2);a([c({type:Boolean,reflect:!0})],V.prototype,"multiple",2);a([c({attribute:"max-options-visible",type:Number})],V.prototype,"maxOptionsVisible",2);a([c({type:Boolean,reflect:!0})],V.prototype,"disabled",2);a([c({type:Boolean})],V.prototype,"clearable",2);a([c({type:Boolean,reflect:!0})],V.prototype,"open",2);a([c({type:Boolean})],V.prototype,"hoist",2);a([c({type:Boolean,reflect:!0})],V.prototype,"filled",2);a([c({type:Boolean,reflect:!0})],V.prototype,"pill",2);a([c()],V.prototype,"label",2);a([c({reflect:!0})],V.prototype,"placement",2);a([c({attribute:"help-text"})],V.prototype,"helpText",2);a([c({reflect:!0})],V.prototype,"form",2);a([c({type:Boolean,reflect:!0})],V.prototype,"required",2);a([c()],V.prototype,"getTag",2);a([_("disabled",{waitUntilFirstUpdate:!0})],V.prototype,"handleDisabledChange",1);a([_(["defaultValue","value"],{waitUntilFirstUpdate:!0})],V.prototype,"handleValueChange",1);a([_("open",{waitUntilFirstUpdate:!0})],V.prototype,"handleOpenChange",1);j("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});j("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});V.define("sl-select");gi.define("sl-spinner");var ol=k`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`,Z=class extends A{constructor(){super(...arguments),this.formControlController=new ie(this),this.hasSlotController=new yt(this,"help-text","label"),this.localize=new U(this),this.hasFocus=!1,this.hasTooltip=!1,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=e=>e.toString(),this.form="",this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.resizeObserver)==null||e.unobserve(this.input)}handleChange(){this.emit("sl-change")}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,this.emit("sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncProgress(e){this.input.style.setProperty("--percent",`${e*100}%`)}syncTooltip(e){if(this.output!==null){const t=this.input.offsetWidth,i=this.output.offsetWidth,o=getComputedStyle(this.input).getPropertyValue("--thumb-size"),s=this.localize.dir()==="rtl",r=t*e;if(s){const n=`${t-r}px + ${e} * ${o}`;this.output.style.translate=`calc((${n} - ${i/2}px - ${o} / 2))`}else{const n=`${r}px - ${e} * ${o}`;this.output.style.translate=`calc(${n} - ${i/2}px + ${o} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){const e=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(e),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(e))}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}focus(e){this.input.focus(e)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),i=this.label?!0:!!e,o=this.helpText?!0:!!t;return p`
      <div
        part="form-control"
        class=${L({"form-control":!0,"form-control--medium":!0,"form-control--has-label":i,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${L({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":this.localize.dir()==="rtl","range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${S(this.name)}
              ?disabled=${this.disabled}
              min=${S(this.min)}
              max=${S(this.max)}
              step=${S(this.step)}
              .value=${xe(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?p`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter=="function"?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Z.styles=[P,we,ol];a([$(".range__control")],Z.prototype,"input",2);a([$(".range__tooltip")],Z.prototype,"output",2);a([D()],Z.prototype,"hasFocus",2);a([D()],Z.prototype,"hasTooltip",2);a([c()],Z.prototype,"title",2);a([c()],Z.prototype,"name",2);a([c({type:Number})],Z.prototype,"value",2);a([c()],Z.prototype,"label",2);a([c({attribute:"help-text"})],Z.prototype,"helpText",2);a([c({type:Boolean,reflect:!0})],Z.prototype,"disabled",2);a([c({type:Number})],Z.prototype,"min",2);a([c({type:Number})],Z.prototype,"max",2);a([c({type:Number})],Z.prototype,"step",2);a([c()],Z.prototype,"tooltip",2);a([c({attribute:!1})],Z.prototype,"tooltipFormatter",2);a([c({reflect:!0})],Z.prototype,"form",2);a([Re()],Z.prototype,"defaultValue",2);a([hi({passive:!0})],Z.prototype,"handleThumbDragStart",1);a([_("value",{waitUntilFirstUpdate:!0})],Z.prototype,"handleValueChange",1);a([_("disabled",{waitUntilFirstUpdate:!0})],Z.prototype,"handleDisabledChange",1);a([_("hasTooltip",{waitUntilFirstUpdate:!0})],Z.prototype,"syncRange",1);Z.define("sl-range");var sl=k`
  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbol--active,
  .rating__partial--filled {
    color: var(--symbol-color-active);
  }

  .rating__partial-symbol-container {
    position: relative;
  }

  .rating__partial--filled {
    position: absolute;
    top: var(--symbol-spacing);
    left: var(--symbol-spacing);
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) scale;
    pointer-events: none;
  }

  .rating__symbol--hover {
    scale: 1.2;
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    scale: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    .rating__symbol--active {
      color: SelectedItem;
    }
  }
`;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xr="important",rl=" !"+xr,wt=ui(class extends fi{constructor(e){var t;if(super(e),e.type!==qt.ATTRIBUTE||e.name!=="style"||((t=e.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const o=e[i];return o==null?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(e,[t]){const{style:i}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const o of this.ft)t[o]==null&&(this.ft.delete(o),o.includes("-")?i.removeProperty(o):i[o]=null);for(const o in t){const s=t[o];if(s!=null){this.ft.add(o);const r=typeof s=="string"&&s.endsWith(rl);o.includes("-")||r?i.setProperty(o,r?s.slice(0,-11):s,r?xr:""):i[o]=s}}return Ct}});var vt=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.hoverValue=0,this.isHovering=!1,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>'}getValueFromMousePosition(e){return this.getValueFromXCoordinate(e.clientX)}getValueFromTouchPosition(e){return this.getValueFromXCoordinate(e.touches[0].clientX)}getValueFromXCoordinate(e){const t=this.localize.dir()==="rtl",{left:i,right:o,width:s}=this.rating.getBoundingClientRect(),r=t?this.roundToPrecision((o-e)/s*this.max,this.precision):this.roundToPrecision((e-i)/s*this.max,this.precision);return st(r,0,this.max)}handleClick(e){this.disabled||(this.setValue(this.getValueFromMousePosition(e)),this.emit("sl-change"))}setValue(e){this.disabled||this.readonly||(this.value=e===this.value?0:e,this.isHovering=!1)}handleKeyDown(e){const t=this.localize.dir()==="ltr",i=this.localize.dir()==="rtl",o=this.value;if(!(this.disabled||this.readonly)){if(e.key==="ArrowDown"||t&&e.key==="ArrowLeft"||i&&e.key==="ArrowRight"){const s=e.shiftKey?1:this.precision;this.value=Math.max(0,this.value-s),e.preventDefault()}if(e.key==="ArrowUp"||t&&e.key==="ArrowRight"||i&&e.key==="ArrowLeft"){const s=e.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+s),e.preventDefault()}e.key==="Home"&&(this.value=0,e.preventDefault()),e.key==="End"&&(this.value=this.max,e.preventDefault()),this.value!==o&&this.emit("sl-change")}}handleMouseEnter(e){this.isHovering=!0,this.hoverValue=this.getValueFromMousePosition(e)}handleMouseMove(e){this.hoverValue=this.getValueFromMousePosition(e)}handleMouseLeave(){this.isHovering=!1}handleTouchStart(e){this.isHovering=!0,this.hoverValue=this.getValueFromTouchPosition(e),e.preventDefault()}handleTouchMove(e){this.hoverValue=this.getValueFromTouchPosition(e)}handleTouchEnd(e){this.isHovering=!1,this.setValue(this.hoverValue),this.emit("sl-change"),e.preventDefault()}roundToPrecision(e,t=.5){const i=1/t;return Math.ceil(e*i)/i}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}})}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}})}focus(e){this.rating.focus(e)}blur(){this.rating.blur()}render(){const e=this.localize.dir()==="rtl",t=Array.from(Array(this.max).keys());let i=0;return this.disabled||this.readonly?i=this.value:i=this.isHovering?this.hoverValue:this.value,p`
      <div
        part="base"
        class=${L({rating:!0,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":e})}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled||this.readonly?"-1":"0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols">
          ${t.map(o=>i>o&&i<o+1?p`
                <span
                  class=${L({rating__symbol:!0,"rating__partial-symbol-container":!0,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===o+1})}
                  role="presentation"
                >
                  <div
                    style=${wt({clipPath:e?`inset(0 ${(i-o)*100}% 0 0)`:`inset(0 0 0 ${(i-o)*100}%)`})}
                  >
                    ${oi(this.getSymbol(o+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${wt({clipPath:e?`inset(0 0 0 ${100-(i-o)*100}%)`:`inset(0 ${100-(i-o)*100}% 0 0)`})}
                  >
                    ${oi(this.getSymbol(o+1))}
                  </div>
                </span>
              `:p`
              <span
                class=${L({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===o+1,"rating__symbol--active":i>=o+1})}
                role="presentation"
              >
                ${oi(this.getSymbol(o+1))}
              </span>
            `)}
        </span>
      </div>
    `}};vt.styles=[P,sl];vt.dependencies={"sl-icon":K};a([$(".rating")],vt.prototype,"rating",2);a([D()],vt.prototype,"hoverValue",2);a([D()],vt.prototype,"isHovering",2);a([c()],vt.prototype,"label",2);a([c({type:Number})],vt.prototype,"value",2);a([c({type:Number})],vt.prototype,"max",2);a([c({type:Number})],vt.prototype,"precision",2);a([c({type:Boolean,reflect:!0})],vt.prototype,"readonly",2);a([c({type:Boolean,reflect:!0})],vt.prototype,"disabled",2);a([c()],vt.prototype,"getSymbol",2);a([hi({passive:!0})],vt.prototype,"handleTouchMove",1);a([_("hoverValue")],vt.prototype,"handleHoverValueChange",1);a([_("isHovering")],vt.prototype,"handleIsHoveringChange",1);vt.define("sl-rating");var al=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],ke=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.isoTime="",this.relativeTime="",this.date=new Date,this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){const e=new Date,t=new Date(this.date);if(isNaN(t.getMilliseconds()))return this.relativeTime="",this.isoTime="","";const i=t.getTime()-e.getTime(),{unit:o,value:s}=al.find(r=>Math.abs(i)<r.max);if(this.isoTime=t.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(i/s),o,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let r;o==="minute"?r=$i("second"):o==="hour"?r=$i("minute"):o==="day"?r=$i("hour"):r=$i("day"),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),r)}return p` <time datetime=${this.isoTime}>${this.relativeTime}</time> `}};a([D()],ke.prototype,"isoTime",2);a([D()],ke.prototype,"relativeTime",2);a([c()],ke.prototype,"date",2);a([c()],ke.prototype,"format",2);a([c()],ke.prototype,"numeric",2);a([c({type:Boolean})],ke.prototype,"sync",2);function $i(e){const i={second:1e3,minute:6e4,hour:36e5,day:864e5}[e];return i-Date.now()%i}ke.define("sl-relative-time");var yr=k`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,nl=k`
  ${yr}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`,Vt=class extends A{constructor(){super(...arguments),this.hasSlotController=new yt(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.checked=!1,this.disabled=!1,this.size="medium",this.pill=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleClick(e){if(this.disabled){e.preventDefault(),e.stopPropagation();return}this.checked=!0}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){return Je`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${L({button:!0,"button--default":!0,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${S(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};Vt.styles=[P,nl];a([$(".button")],Vt.prototype,"input",2);a([$(".hidden-input")],Vt.prototype,"hiddenInput",2);a([D()],Vt.prototype,"hasFocus",2);a([c({type:Boolean,reflect:!0})],Vt.prototype,"checked",2);a([c()],Vt.prototype,"value",2);a([c({type:Boolean,reflect:!0})],Vt.prototype,"disabled",2);a([c({reflect:!0})],Vt.prototype,"size",2);a([c({type:Boolean,reflect:!0})],Vt.prototype,"pill",2);a([_("disabled",{waitUntilFirstUpdate:!0})],Vt.prototype,"handleDisabledChange",1);Vt.define("sl-radio-button");var ll=k`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`,cl=k`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,$e=class extends A{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(e){const t=Ge(e.target);t==null||t.toggleAttribute("data-sl-button-group__button--focus",!0)}handleBlur(e){const t=Ge(e.target);t==null||t.toggleAttribute("data-sl-button-group__button--focus",!1)}handleMouseOver(e){const t=Ge(e.target);t==null||t.toggleAttribute("data-sl-button-group__button--hover",!0)}handleMouseOut(e){const t=Ge(e.target);t==null||t.toggleAttribute("data-sl-button-group__button--hover",!1)}handleSlotChange(){const e=[...this.defaultSlot.assignedElements({flatten:!0})];e.forEach(t=>{const i=e.indexOf(t),o=Ge(t);o&&(o.toggleAttribute("data-sl-button-group__button",!0),o.toggleAttribute("data-sl-button-group__button--first",i===0),o.toggleAttribute("data-sl-button-group__button--inner",i>0&&i<e.length-1),o.toggleAttribute("data-sl-button-group__button--last",i===e.length-1),o.toggleAttribute("data-sl-button-group__button--radio",o.tagName.toLowerCase()==="sl-radio-button"))})}render(){return p`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};$e.styles=[P,cl];a([$("slot")],$e.prototype,"defaultSlot",2);a([D()],$e.prototype,"disableRole",2);a([c()],$e.prototype,"label",2);function Ge(e){var t;const i="sl-button, sl-radio-button";return(t=e.closest(i))!=null?t:e.querySelector(i)}var ft=class extends A{constructor(){super(...arguments),this.formControlController=new ie(this),this.hasSlotController=new yt(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=!1,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=!1}get validity(){const e=this.required&&!this.value;return this.customValidityMessage!==""?ha:e?pa:Bi}get validationMessage(){const e=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:e?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(e){const t=e.target.closest("sl-radio, sl-radio-button"),i=this.getAllRadios(),o=this.value;!t||t.disabled||(this.value=t.value,i.forEach(s=>s.checked=s===t),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")))}handleKeyDown(e){var t;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key))return;const i=this.getAllRadios().filter(l=>!l.disabled),o=(t=i.find(l=>l.checked))!=null?t:i[0],s=e.key===" "?0:["ArrowUp","ArrowLeft"].includes(e.key)?-1:1,r=this.value;let n=i.indexOf(o)+s;n<0&&(n=i.length-1),n>i.length-1&&(n=0),this.getAllRadios().forEach(l=>{l.checked=!1,this.hasButtonGroup||l.setAttribute("tabindex","-1")}),this.value=i[n].value,i[n].checked=!0,this.hasButtonGroup?i[n].shadowRoot.querySelector("button").focus():(i[n].setAttribute("tabindex","0"),i[n].focus()),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")),e.preventDefault()}handleLabelClick(){this.focus()}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}async syncRadioElements(){var e,t;const i=this.getAllRadios();if(await Promise.all(i.map(async o=>{await o.updateComplete,o.checked=o.value===this.value,o.size=this.size})),this.hasButtonGroup=i.some(o=>o.tagName.toLowerCase()==="sl-radio-button"),i.length>0&&!i.some(o=>o.checked))if(this.hasButtonGroup){const o=(e=i[0].shadowRoot)==null?void 0:e.querySelector("button");o&&o.setAttribute("tabindex","0")}else i[0].setAttribute("tabindex","0");if(this.hasButtonGroup){const o=(t=this.shadowRoot)==null?void 0:t.querySelector("sl-button-group");o&&(o.disableRole=!0)}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios())}updateCheckedRadio(){this.getAllRadios().forEach(t=>t.checked=t.value===this.value),this.formControlController.setValidity(this.validity.valid)}handleSizeChange(){this.syncRadios()}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){const e=this.required&&!this.value,t=this.customValidityMessage!=="";return e||t?(this.formControlController.emitInvalidEvent(),!1):!0}getForm(){return this.formControlController.getForm()}reportValidity(){const e=this.validity.valid;return this.errorMessage=this.customValidityMessage||e?"":this.validationInput.validationMessage,this.formControlController.setValidity(e),this.validationInput.hidden=!0,clearTimeout(this.validationTimeout),e||(this.validationInput.hidden=!1,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=!0,1e4)),e}setCustomValidity(e=""){this.customValidityMessage=e,this.errorMessage=e,this.validationInput.setCustomValidity(e),this.formControlController.updateValidity()}focus(e){const t=this.getAllRadios(),i=t.find(r=>r.checked),o=t.find(r=>!r.disabled),s=i||o;s&&s.focus(e)}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),i=this.label?!0:!!e,o=this.helpText?!0:!!t,s=p`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return p`
      <fieldset
        part="form-control"
        class=${L({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":!0,"form-control--has-label":i,"form-control--has-help-text":o})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${i?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?p`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${s}
                </sl-button-group>
              `:s}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};ft.styles=[P,we,ll];ft.dependencies={"sl-button-group":$e};a([$("slot:not([name])")],ft.prototype,"defaultSlot",2);a([$(".radio-group__validation-input")],ft.prototype,"validationInput",2);a([D()],ft.prototype,"hasButtonGroup",2);a([D()],ft.prototype,"errorMessage",2);a([D()],ft.prototype,"defaultValue",2);a([c()],ft.prototype,"label",2);a([c({attribute:"help-text"})],ft.prototype,"helpText",2);a([c()],ft.prototype,"name",2);a([c({reflect:!0})],ft.prototype,"value",2);a([c({reflect:!0})],ft.prototype,"size",2);a([c({reflect:!0})],ft.prototype,"form",2);a([c({type:Boolean,reflect:!0})],ft.prototype,"required",2);a([_("size",{waitUntilFirstUpdate:!0})],ft.prototype,"handleSizeChange",1);a([_("value")],ft.prototype,"handleValueChange",1);ft.define("sl-radio-group");var dl=k`
  :host {
    --size: 128px;
    --track-width: 4px;
    --track-color: var(--sl-color-neutral-200);
    --indicator-width: var(--track-width);
    --indicator-color: var(--sl-color-primary-600);
    --indicator-transition-duration: 0.35s;

    display: inline-flex;
  }

  .progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .progress-ring__image {
    width: var(--size);
    height: var(--size);
    rotate: -90deg;
    transform-origin: 50% 50%;
  }

  .progress-ring__track,
  .progress-ring__indicator {
    --radius: calc(var(--size) / 2 - max(var(--track-width), var(--indicator-width)) * 0.5);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    fill: none;
    r: var(--radius);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
  }

  .progress-ring__track {
    stroke: var(--track-color);
    stroke-width: var(--track-width);
  }

  .progress-ring__indicator {
    stroke: var(--indicator-color);
    stroke-width: var(--indicator-width);
    stroke-linecap: round;
    transition-property: stroke-dashoffset;
    transition-duration: var(--indicator-transition-duration);
    stroke-dasharray: var(--circumference) var(--circumference);
    stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));
  }

  .progress-ring__label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
  }
`,Ve=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.value=0,this.label=""}updated(e){if(super.updated(e),e.has("value")){const t=parseFloat(getComputedStyle(this.indicator).getPropertyValue("r")),i=2*Math.PI*t,o=i-this.value/100*i;this.indicatorOffset=`${o}px`}}render(){return p`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style="--percentage: ${this.value/100}"
      >
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle class="progress-ring__indicator" style="stroke-dashoffset: ${this.indicatorOffset}"></circle>
        </svg>

        <slot id="label" part="label" class="progress-ring__label"></slot>
      </div>
    `}};Ve.styles=[P,dl];a([$(".progress-ring__indicator")],Ve.prototype,"indicator",2);a([D()],Ve.prototype,"indicatorOffset",2);a([c({type:Number,reflect:!0})],Ve.prototype,"value",2);a([c()],Ve.prototype,"label",2);Ve.define("sl-progress-ring");var pl=k`
  :host {
    display: inline-block;
  }
`;let wr=null;class _r{}_r.render=function(e,t){wr(e,t)};self.QrCreator=_r;(function(e){function t(l,d,h,g){var u={},f=e(h,d);f.u(l),f.J(),g=g||0;var m=f.h(),b=f.h()+2*g;return u.text=l,u.level=d,u.version=h,u.O=b,u.a=function(x,z){return x-=g,z-=g,0>x||x>=m||0>z||z>=m?!1:f.a(x,z)},u}function i(l,d,h,g,u,f,m,b,x,z){function T(y,C,v,w,E,M,B){y?(l.lineTo(C+M,v+B),l.arcTo(C,v,w,E,f)):l.lineTo(C,v)}m?l.moveTo(d+f,h):l.moveTo(d,h),T(b,g,h,g,u,-f,0),T(x,g,u,d,u,0,-f),T(z,d,u,d,h,f,0),T(m,d,h,g,h,0,f)}function o(l,d,h,g,u,f,m,b,x,z){function T(y,C,v,w){l.moveTo(y+v,C),l.lineTo(y,C),l.lineTo(y,C+w),l.arcTo(y,C,y+v,C,f)}m&&T(d,h,f,f),b&&T(g,h,-f,f),x&&T(g,u,-f,-f),z&&T(d,u,f,-f)}function s(l,d){var h=d.fill;if(typeof h=="string")l.fillStyle=h;else{var g=h.type,u=h.colorStops;if(h=h.position.map(m=>Math.round(m*d.size)),g==="linear-gradient")var f=l.createLinearGradient.apply(l,h);else if(g==="radial-gradient")f=l.createRadialGradient.apply(l,h);else throw Error("Unsupported fill");u.forEach(([m,b])=>{f.addColorStop(m,b)}),l.fillStyle=f}}function r(l,d){t:{var h=d.text,g=d.v,u=d.N,f=d.K,m=d.P;for(u=Math.max(1,u||1),f=Math.min(40,f||40);u<=f;u+=1)try{var b=t(h,g,u,m);break t}catch{}b=void 0}if(!b)return null;for(h=l.getContext("2d"),d.background&&(h.fillStyle=d.background,h.fillRect(d.left,d.top,d.size,d.size)),g=b.O,f=d.size/g,h.beginPath(),m=0;m<g;m+=1)for(u=0;u<g;u+=1){var x=h,z=d.left+u*f,T=d.top+m*f,y=m,C=u,v=b.a,w=z+f,E=T+f,M=y-1,B=y+1,O=C-1,I=C+1,at=Math.floor(Math.min(.5,Math.max(0,d.R))*f),it=v(y,C),mt=v(M,O),ot=v(M,C);M=v(M,I);var Dt=v(y,I);I=v(B,I),C=v(B,C),B=v(B,O),y=v(y,O),z=Math.round(z),T=Math.round(T),w=Math.round(w),E=Math.round(E),it?i(x,z,T,w,E,at,!ot&&!y,!ot&&!Dt,!C&&!Dt,!C&&!y):o(x,z,T,w,E,at,ot&&y&&mt,ot&&Dt&&M,C&&Dt&&I,C&&y&&B)}return s(h,d),h.fill(),l}var n={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};wr=function(l,d){var h={};Object.assign(h,n,l),h.N=h.minVersion,h.K=h.maxVersion,h.v=h.ecLevel,h.left=h.left,h.top=h.top,h.size=h.size,h.fill=h.fill,h.background=h.background,h.text=h.text,h.R=h.radius,h.P=h.quiet,d instanceof HTMLCanvasElement?((d.width!==h.size||d.height!==h.size)&&(d.width=h.size,d.height=h.size),d.getContext("2d").clearRect(0,0,d.width,d.height),r(d,h)):(l=document.createElement("canvas"),l.width=h.size,l.height=h.size,h=r(l,h),d.appendChild(h))}})(function(){function e(d){var h=i.s(d);return{S:function(){return 4},b:function(){return h.length},write:function(g){for(var u=0;u<h.length;u+=1)g.put(h[u],8)}}}function t(){var d=[],h=0,g={B:function(){return d},c:function(u){return(d[Math.floor(u/8)]>>>7-u%8&1)==1},put:function(u,f){for(var m=0;m<f;m+=1)g.m((u>>>f-m-1&1)==1)},f:function(){return h},m:function(u){var f=Math.floor(h/8);d.length<=f&&d.push(0),u&&(d[f]|=128>>>h%8),h+=1}};return g}function i(d,h){function g(y,C){for(var v=-1;7>=v;v+=1)if(!(-1>=y+v||b<=y+v))for(var w=-1;7>=w;w+=1)-1>=C+w||b<=C+w||(m[y+v][C+w]=0<=v&&6>=v&&(w==0||w==6)||0<=w&&6>=w&&(v==0||v==6)||2<=v&&4>=v&&2<=w&&4>=w)}function u(y,C){for(var v=b=4*d+17,w=Array(v),E=0;E<v;E+=1){w[E]=Array(v);for(var M=0;M<v;M+=1)w[E][M]=null}for(m=w,g(0,0),g(b-7,0),g(0,b-7),v=r.G(d),w=0;w<v.length;w+=1)for(E=0;E<v.length;E+=1){M=v[w];var B=v[E];if(m[M][B]==null)for(var O=-2;2>=O;O+=1)for(var I=-2;2>=I;I+=1)m[M+O][B+I]=O==-2||O==2||I==-2||I==2||O==0&&I==0}for(v=8;v<b-8;v+=1)m[v][6]==null&&(m[v][6]=v%2==0);for(v=8;v<b-8;v+=1)m[6][v]==null&&(m[6][v]=v%2==0);for(v=r.w(f<<3|C),w=0;15>w;w+=1)E=!y&&(v>>w&1)==1,m[6>w?w:8>w?w+1:b-15+w][8]=E,m[8][8>w?b-w-1:9>w?15-w:14-w]=E;if(m[b-8][8]=!y,7<=d){for(v=r.A(d),w=0;18>w;w+=1)E=!y&&(v>>w&1)==1,m[Math.floor(w/3)][w%3+b-8-3]=E;for(w=0;18>w;w+=1)E=!y&&(v>>w&1)==1,m[w%3+b-8-3][Math.floor(w/3)]=E}if(x==null){for(y=l.I(d,f),v=t(),w=0;w<z.length;w+=1)E=z[w],v.put(4,4),v.put(E.b(),r.f(4,d)),E.write(v);for(w=E=0;w<y.length;w+=1)E+=y[w].j;if(v.f()>8*E)throw Error("code length overflow. ("+v.f()+">"+8*E+")");for(v.f()+4<=8*E&&v.put(0,4);v.f()%8!=0;)v.m(!1);for(;!(v.f()>=8*E)&&(v.put(236,8),!(v.f()>=8*E));)v.put(17,8);var at=0;for(E=w=0,M=Array(y.length),B=Array(y.length),O=0;O<y.length;O+=1){var it=y[O].j,mt=y[O].o-it;for(w=Math.max(w,it),E=Math.max(E,mt),M[O]=Array(it),I=0;I<M[O].length;I+=1)M[O][I]=255&v.B()[I+at];for(at+=it,I=r.C(mt),it=o(M[O],I.b()-1).l(I),B[O]=Array(I.b()-1),I=0;I<B[O].length;I+=1)mt=I+it.b()-B[O].length,B[O][I]=0<=mt?it.c(mt):0}for(I=v=0;I<y.length;I+=1)v+=y[I].o;for(v=Array(v),I=at=0;I<w;I+=1)for(O=0;O<y.length;O+=1)I<M[O].length&&(v[at]=M[O][I],at+=1);for(I=0;I<E;I+=1)for(O=0;O<y.length;O+=1)I<B[O].length&&(v[at]=B[O][I],at+=1);x=v}for(y=x,v=-1,w=b-1,E=7,M=0,C=r.F(C),B=b-1;0<B;B-=2)for(B==6&&--B;;){for(O=0;2>O;O+=1)m[w][B-O]==null&&(I=!1,M<y.length&&(I=(y[M]>>>E&1)==1),C(w,B-O)&&(I=!I),m[w][B-O]=I,--E,E==-1&&(M+=1,E=7));if(w+=v,0>w||b<=w){w-=v,v=-v;break}}}var f=s[h],m=null,b=0,x=null,z=[],T={u:function(y){y=e(y),z.push(y),x=null},a:function(y,C){if(0>y||b<=y||0>C||b<=C)throw Error(y+","+C);return m[y][C]},h:function(){return b},J:function(){for(var y=0,C=0,v=0;8>v;v+=1){u(!0,v);var w=r.D(T);(v==0||y>w)&&(y=w,C=v)}u(!1,C)}};return T}function o(d,h){if(typeof d.length>"u")throw Error(d.length+"/"+h);var g=function(){for(var f=0;f<d.length&&d[f]==0;)f+=1;for(var m=Array(d.length-f+h),b=0;b<d.length-f;b+=1)m[b]=d[b+f];return m}(),u={c:function(f){return g[f]},b:function(){return g.length},multiply:function(f){for(var m=Array(u.b()+f.b()-1),b=0;b<u.b();b+=1)for(var x=0;x<f.b();x+=1)m[b+x]^=n.i(n.g(u.c(b))+n.g(f.c(x)));return o(m,0)},l:function(f){if(0>u.b()-f.b())return u;for(var m=n.g(u.c(0))-n.g(f.c(0)),b=Array(u.b()),x=0;x<u.b();x+=1)b[x]=u.c(x);for(x=0;x<f.b();x+=1)b[x]^=n.i(n.g(f.c(x))+m);return o(b,0).l(f)}};return u}i.s=function(d){for(var h=[],g=0;g<d.length;g++){var u=d.charCodeAt(g);128>u?h.push(u):2048>u?h.push(192|u>>6,128|u&63):55296>u||57344<=u?h.push(224|u>>12,128|u>>6&63,128|u&63):(g++,u=65536+((u&1023)<<10|d.charCodeAt(g)&1023),h.push(240|u>>18,128|u>>12&63,128|u>>6&63,128|u&63))}return h};var s={L:1,M:0,Q:3,H:2},r=function(){function d(u){for(var f=0;u!=0;)f+=1,u>>>=1;return f}var h=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],g={w:function(u){for(var f=u<<10;0<=d(f)-d(1335);)f^=1335<<d(f)-d(1335);return(u<<10|f)^21522},A:function(u){for(var f=u<<12;0<=d(f)-d(7973);)f^=7973<<d(f)-d(7973);return u<<12|f},G:function(u){return h[u-1]},F:function(u){switch(u){case 0:return function(f,m){return(f+m)%2==0};case 1:return function(f){return f%2==0};case 2:return function(f,m){return m%3==0};case 3:return function(f,m){return(f+m)%3==0};case 4:return function(f,m){return(Math.floor(f/2)+Math.floor(m/3))%2==0};case 5:return function(f,m){return f*m%2+f*m%3==0};case 6:return function(f,m){return(f*m%2+f*m%3)%2==0};case 7:return function(f,m){return(f*m%3+(f+m)%2)%2==0};default:throw Error("bad maskPattern:"+u)}},C:function(u){for(var f=o([1],0),m=0;m<u;m+=1)f=f.multiply(o([1,n.i(m)],0));return f},f:function(u,f){if(u!=4||1>f||40<f)throw Error("mode: "+u+"; type: "+f);return 10>f?8:16},D:function(u){for(var f=u.h(),m=0,b=0;b<f;b+=1)for(var x=0;x<f;x+=1){for(var z=0,T=u.a(b,x),y=-1;1>=y;y+=1)if(!(0>b+y||f<=b+y))for(var C=-1;1>=C;C+=1)0>x+C||f<=x+C||(y!=0||C!=0)&&T==u.a(b+y,x+C)&&(z+=1);5<z&&(m+=3+z-5)}for(b=0;b<f-1;b+=1)for(x=0;x<f-1;x+=1)z=0,u.a(b,x)&&(z+=1),u.a(b+1,x)&&(z+=1),u.a(b,x+1)&&(z+=1),u.a(b+1,x+1)&&(z+=1),(z==0||z==4)&&(m+=3);for(b=0;b<f;b+=1)for(x=0;x<f-6;x+=1)u.a(b,x)&&!u.a(b,x+1)&&u.a(b,x+2)&&u.a(b,x+3)&&u.a(b,x+4)&&!u.a(b,x+5)&&u.a(b,x+6)&&(m+=40);for(x=0;x<f;x+=1)for(b=0;b<f-6;b+=1)u.a(b,x)&&!u.a(b+1,x)&&u.a(b+2,x)&&u.a(b+3,x)&&u.a(b+4,x)&&!u.a(b+5,x)&&u.a(b+6,x)&&(m+=40);for(x=z=0;x<f;x+=1)for(b=0;b<f;b+=1)u.a(b,x)&&(z+=1);return m+=Math.abs(100*z/f/f-50)/5*10}};return g}(),n=function(){for(var d=Array(256),h=Array(256),g=0;8>g;g+=1)d[g]=1<<g;for(g=8;256>g;g+=1)d[g]=d[g-4]^d[g-5]^d[g-6]^d[g-8];for(g=0;255>g;g+=1)h[d[g]]=g;return{g:function(u){if(1>u)throw Error("glog("+u+")");return h[u]},i:function(u){for(;0>u;)u+=255;for(;256<=u;)u-=255;return d[u]}}}(),l=function(){function d(u,f){switch(f){case s.L:return h[4*(u-1)];case s.M:return h[4*(u-1)+1];case s.Q:return h[4*(u-1)+2];case s.H:return h[4*(u-1)+3]}}var h=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],g={I:function(u,f){var m=d(u,f);if(typeof m>"u")throw Error("bad rs block @ typeNumber:"+u+"/errorCorrectLevel:"+f);u=m.length/3,f=[];for(var b=0;b<u;b+=1)for(var x=m[3*b],z=m[3*b+1],T=m[3*b+2],y=0;y<x;y+=1){var C=T,v={};v.o=z,v.j=C,f.push(v)}return f}};return g}();return i}());const hl=QrCreator;var Ht=class extends A{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H"}firstUpdated(){this.generate()}generate(){this.hasUpdated&&hl.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas)}render(){var e;return p`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((e=this.label)==null?void 0:e.length)>0?this.label:this.value}
        style=${wt({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};Ht.styles=[P,pl];a([$("canvas")],Ht.prototype,"canvas",2);a([c()],Ht.prototype,"value",2);a([c()],Ht.prototype,"label",2);a([c({type:Number})],Ht.prototype,"size",2);a([c()],Ht.prototype,"fill",2);a([c()],Ht.prototype,"background",2);a([c({type:Number})],Ht.prototype,"radius",2);a([c({attribute:"error-correction"})],Ht.prototype,"errorCorrection",2);a([_(["background","errorCorrection","fill","radius","size","value"])],Ht.prototype,"generate",1);Ht.define("sl-qr-code");var ul=k`
  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: 0px;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`,Yt=class extends A{constructor(){super(),this.checked=!1,this.hasFocus=!1,this.size="medium",this.disabled=!1,this.handleBlur=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.handleClick=()=>{this.disabled||(this.checked=!0)},this.handleFocus=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return p`
      <span
        part="base"
        class=${L({radio:!0,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?p` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};Yt.styles=[P,ul];Yt.dependencies={"sl-icon":K};a([D()],Yt.prototype,"checked",2);a([D()],Yt.prototype,"hasFocus",2);a([c()],Yt.prototype,"value",2);a([c({reflect:!0})],Yt.prototype,"size",2);a([c({type:Boolean,reflect:!0})],Yt.prototype,"disabled",2);a([_("checked")],Yt.prototype,"handleCheckedChange",1);a([_("disabled",{waitUntilFirstUpdate:!0})],Yt.prototype,"handleDisabledChange",1);Yt.define("sl-radio");var fl=k`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,Pt=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.isInitialized=!1,this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{const e=this.closest("sl-select");e&&e.handleDefaultSlotChange()}):this.isInitialized=!0}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"))}getTextLabel(){const e=this.childNodes;let t="";return[...e].forEach(i=>{i.nodeType===Node.ELEMENT_NODE&&(i.hasAttribute("slot")||(t+=i.textContent)),i.nodeType===Node.TEXT_NODE&&(t+=i.textContent)}),t.trim()}render(){return p`
      <div
        part="base"
        class=${L({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};Pt.styles=[P,fl];Pt.dependencies={"sl-icon":K};a([$(".option__label")],Pt.prototype,"defaultSlot",2);a([D()],Pt.prototype,"current",2);a([D()],Pt.prototype,"selected",2);a([D()],Pt.prototype,"hasHover",2);a([c({reflect:!0})],Pt.prototype,"value",2);a([c({type:Boolean,reflect:!0})],Pt.prototype,"disabled",2);a([_("disabled")],Pt.prototype,"handleDisabledChange",1);a([_("selected")],Pt.prototype,"handleSelectedChange",1);a([_("value")],Pt.prototype,"handleValueChange",1);Pt.define("sl-option");W.define("sl-popup");var gl=k`
  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition:
      400ms width,
      400ms background-color;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  .progress-bar--indeterminate.progress-bar--rtl .progress-bar__indicator {
    animation-name: indeterminate-rtl;
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--sl-color-neutral-0);
    }

    .progress-bar__indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }

  @keyframes indeterminate-rtl {
    0% {
      right: -50%;
      width: 50%;
    }
    75%,
    100% {
      right: 100%;
      width: 50%;
    }
  }
`,xi=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.value=0,this.indeterminate=!1,this.label=""}render(){return p`
      <div
        part="base"
        class=${L({"progress-bar":!0,"progress-bar--indeterminate":this.indeterminate,"progress-bar--rtl":this.localize.dir()==="rtl"})}
        role="progressbar"
        title=${S(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${wt({width:`${this.value}%`})}>
          ${this.indeterminate?"":p` <slot part="label" class="progress-bar__label"></slot> `}
        </div>
      </div>
    `}};xi.styles=[P,gl];a([c({type:Number,reflect:!0})],xi.prototype,"value",2);a([c({type:Boolean,reflect:!0})],xi.prototype,"indeterminate",2);a([c()],xi.prototype,"label",2);xi.define("sl-progress-bar");var ml=k`
  :host {
    display: block;
  }

  .menu-label {
    display: inline-block;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    user-select: none;
    -webkit-user-select: none;
  }
`,kr=class extends A{render(){return p` <slot part="base" class="menu-label"></slot> `}};kr.styles=[P,ml];kr.define("sl-menu-label");var bl=k`
  :host {
    display: contents;
  }
`,Zt=class extends A{constructor(){super(...arguments),this.attrOldValue=!1,this.charData=!1,this.charDataOldValue=!1,this.childList=!1,this.disabled=!1,this.handleMutation=e=>{this.emit("sl-mutation",{detail:{mutationList:e}})}}connectedCallback(){super.connectedCallback(),this.mutationObserver=new MutationObserver(this.handleMutation),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}startObserver(){const e=typeof this.attr=="string"&&this.attr.length>0,t=e&&this.attr!=="*"?this.attr.split(" "):void 0;try{this.mutationObserver.observe(this,{subtree:!0,childList:this.childList,attributes:e,attributeFilter:t,attributeOldValue:this.attrOldValue,characterData:this.charData,characterDataOldValue:this.charDataOldValue})}catch{}}stopObserver(){this.mutationObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleChange(){this.stopObserver(),this.startObserver()}render(){return p` <slot></slot> `}};Zt.styles=[P,bl];a([c({reflect:!0})],Zt.prototype,"attr",2);a([c({attribute:"attr-old-value",type:Boolean,reflect:!0})],Zt.prototype,"attrOldValue",2);a([c({attribute:"char-data",type:Boolean,reflect:!0})],Zt.prototype,"charData",2);a([c({attribute:"char-data-old-value",type:Boolean,reflect:!0})],Zt.prototype,"charDataOldValue",2);a([c({attribute:"child-list",type:Boolean,reflect:!0})],Zt.prototype,"childList",2);a([c({type:Boolean,reflect:!0})],Zt.prototype,"disabled",2);a([_("disabled")],Zt.prototype,"handleDisabledChange",1);a([_("attr",{waitUntilFirstUpdate:!0}),_("attr-old-value",{waitUntilFirstUpdate:!0}),_("char-data",{waitUntilFirstUpdate:!0}),_("char-data-old-value",{waitUntilFirstUpdate:!0}),_("childList",{waitUntilFirstUpdate:!0})],Zt.prototype,"handleChange",1);Zt.define("sl-mutation-observer");var vl=k`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,F=class extends A{constructor(){super(...arguments),this.formControlController=new ie(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new yt(this,"help-text","label"),this.localize=new U(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var e;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((e=this.input)==null?void 0:e.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(e){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=e,this.value=this.__dateInput.value}get valueAsNumber(){var e;return this.__numberInput.value=this.value,((e=this.input)==null?void 0:e.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(e){this.__numberInput.valueAsNumber=e,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(e){e.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleKeyDown(e){const t=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key==="Enter"&&!t&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,i="none"){this.input.setSelectionRange(e,t,i)}setRangeText(e,t,i,o="preserve"){const s=t??this.input.selectionStart,r=i??this.input.selectionEnd;this.input.setRangeText(e,s,r,o),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),i=this.label?!0:!!e,o=this.helpText?!0:!!t,r=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return p`
      <div
        part="form-control"
        class=${L({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${L({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${S(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${S(this.placeholder)}
              minlength=${S(this.minlength)}
              maxlength=${S(this.maxlength)}
              min=${S(this.min)}
              max=${S(this.max)}
              step=${S(this.step)}
              .value=${xe(this.value)}
              autocapitalize=${S(this.autocapitalize)}
              autocomplete=${S(this.autocomplete)}
              autocorrect=${S(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${S(this.pattern)}
              enterkeyhint=${S(this.enterkeyhint)}
              inputmode=${S(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${r?p`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?p`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?p`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:p`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};F.styles=[P,we,vl];F.dependencies={"sl-icon":K};a([$(".input__control")],F.prototype,"input",2);a([D()],F.prototype,"hasFocus",2);a([c()],F.prototype,"title",2);a([c({reflect:!0})],F.prototype,"type",2);a([c()],F.prototype,"name",2);a([c()],F.prototype,"value",2);a([Re()],F.prototype,"defaultValue",2);a([c({reflect:!0})],F.prototype,"size",2);a([c({type:Boolean,reflect:!0})],F.prototype,"filled",2);a([c({type:Boolean,reflect:!0})],F.prototype,"pill",2);a([c()],F.prototype,"label",2);a([c({attribute:"help-text"})],F.prototype,"helpText",2);a([c({type:Boolean})],F.prototype,"clearable",2);a([c({type:Boolean,reflect:!0})],F.prototype,"disabled",2);a([c()],F.prototype,"placeholder",2);a([c({type:Boolean,reflect:!0})],F.prototype,"readonly",2);a([c({attribute:"password-toggle",type:Boolean})],F.prototype,"passwordToggle",2);a([c({attribute:"password-visible",type:Boolean})],F.prototype,"passwordVisible",2);a([c({attribute:"no-spin-buttons",type:Boolean})],F.prototype,"noSpinButtons",2);a([c({reflect:!0})],F.prototype,"form",2);a([c({type:Boolean,reflect:!0})],F.prototype,"required",2);a([c()],F.prototype,"pattern",2);a([c({type:Number})],F.prototype,"minlength",2);a([c({type:Number})],F.prototype,"maxlength",2);a([c()],F.prototype,"min",2);a([c()],F.prototype,"max",2);a([c()],F.prototype,"step",2);a([c()],F.prototype,"autocapitalize",2);a([c()],F.prototype,"autocorrect",2);a([c()],F.prototype,"autocomplete",2);a([c({type:Boolean})],F.prototype,"autofocus",2);a([c()],F.prototype,"enterkeyhint",2);a([c({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],F.prototype,"spellcheck",2);a([c()],F.prototype,"inputmode",2);a([_("disabled",{waitUntilFirstUpdate:!0})],F.prototype,"handleDisabledChange",1);a([_("step",{waitUntilFirstUpdate:!0})],F.prototype,"handleStepChange",1);a([_("value",{waitUntilFirstUpdate:!0})],F.prototype,"handleValueChange",1);F.define("sl-input");var xl=k`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,es=class extends A{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(e){const t=["menuitem","menuitemcheckbox"],i=e.composedPath(),o=i.find(l=>{var d;return t.includes(((d=l==null?void 0:l.getAttribute)==null?void 0:d.call(l,"role"))||"")});if(!o||i.find(l=>{var d;return((d=l==null?void 0:l.getAttribute)==null?void 0:d.call(l,"role"))==="menu"})!==this)return;const n=o;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}})}handleKeyDown(e){if(e.key==="Enter"||e.key===" "){const t=this.getCurrentItem();e.preventDefault(),e.stopPropagation(),t==null||t.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){const t=this.getAllItems(),i=this.getCurrentItem();let o=i?t.indexOf(i):0;t.length>0&&(e.preventDefault(),e.stopPropagation(),e.key==="ArrowDown"?o++:e.key==="ArrowUp"?o--:e.key==="Home"?o=0:e.key==="End"&&(o=t.length-1),o<0&&(o=t.length-1),o>t.length-1&&(o=0),this.setCurrentItem(t[o]),t[o].focus())}}handleMouseDown(e){const t=e.target;this.isMenuItem(t)&&this.setCurrentItem(t)}handleSlotChange(){const e=this.getAllItems();e.length>0&&this.setCurrentItem(e[0])}isMenuItem(e){var t;return e.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((t=e.getAttribute("role"))!=null?t:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>!(e.inert||!this.isMenuItem(e)))}getCurrentItem(){return this.getAllItems().find(e=>e.getAttribute("tabindex")==="0")}setCurrentItem(e){this.getAllItems().forEach(i=>{i.setAttribute("tabindex",i===e?"0":"-1")})}render(){return p`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};es.styles=[P,xl];a([$("slot")],es.prototype,"defaultSlot",2);es.define("sl-menu");var yl=k`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const si=(e,t)=>{var o;const i=e._$AN;if(i===void 0)return!1;for(const s of i)(o=s._$AO)==null||o.call(s,t,!1),si(s,t);return!0},Mi=e=>{let t,i;do{if((t=e._$AM)===void 0)break;i=t._$AN,i.delete(e),e=t}while((i==null?void 0:i.size)===0)},$r=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(i===void 0)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),kl(t)}};function wl(e){this._$AN!==void 0?(Mi(this),this._$AM=e,$r(this)):this._$AM=e}function _l(e,t=!1,i=0){const o=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(o))for(let r=i;r<o.length;r++)si(o[r],!1),Mi(o[r]);else o!=null&&(si(o,!1),Mi(o));else si(this,e)}const kl=e=>{e.type==qt.CHILD&&(e._$AP??(e._$AP=_l),e._$AQ??(e._$AQ=wl))};class $l extends fi{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,o){super._$AT(t,i,o),$r(this),this.isConnected=t._$AU}_$AO(t,i=!0){var o,s;t!==this.isConnected&&(this.isConnected=t,t?(o=this.reconnected)==null||o.call(this):(s=this.disconnected)==null||s.call(this)),i&&(si(this,t),Mi(this))}setValue(t){if(ir(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Cl=()=>new zl;class zl{}const oo=new WeakMap,Sl=ui(class extends $l{render(e){return X}update(e,[t]){var o;const i=t!==this.G;return i&&this.G!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=t,this.ht=(o=e.options)==null?void 0:o.host,this.rt(this.ct=e.element)),X}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let i=oo.get(t);i===void 0&&(i=new WeakMap,oo.set(t,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=oo.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var Al=class{constructor(e,t){this.popupRef=Cl(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=i=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${i.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${i.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=i=>{switch(i.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":i.target!==this.host&&(i.preventDefault(),i.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(i);break}},this.handleClick=i=>{var o;i.target===this.host?(i.preventDefault(),i.stopPropagation()):i.target instanceof Element&&(i.target.tagName==="sl-menu-item"||(o=i.target.role)!=null&&o.startsWith("menuitem"))&&this.disableSubmenu()},this.handleFocusOut=i=>{i.relatedTarget&&i.relatedTarget instanceof Element&&this.host.contains(i.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=i=>{i.stopPropagation()},this.handlePopupReposition=()=>{const i=this.host.renderRoot.querySelector("slot[name='submenu']"),o=i==null?void 0:i.assignedElements({flatten:!0}).filter(h=>h.localName==="sl-menu")[0],s=getComputedStyle(this.host).direction==="rtl";if(!o)return;const{left:r,top:n,width:l,height:d}=o.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${s?r+l:r}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${s?r+l:r}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+d}px`)},(this.host=e).addController(this),this.hasSlotController=t}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(e){const t=this.host.renderRoot.querySelector("slot[name='submenu']");if(!t){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let i=null;for(const o of t.assignedElements())if(i=o.querySelectorAll("sl-menu-item, [role^='menuitem']"),i.length!==0)break;if(!(!i||i.length===0)){i[0].setAttribute("tabindex","0");for(let o=1;o!==i.length;++o)i[o].setAttribute("tabindex","-1");this.popupRef.value&&(e.preventDefault(),e.stopPropagation(),this.popupRef.value.active?i[0]instanceof HTMLElement&&i[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{i[0]instanceof HTMLElement&&i[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(e){this.popupRef.value&&this.popupRef.value.active!==e&&(this.popupRef.value.active=e,this.host.requestUpdate())}enableSubmenu(e=!0){e?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var e;if(!((e=this.host.parentElement)!=null&&e.computedStyleMap))return;const t=this.host.parentElement.computedStyleMap(),o=["padding-top","border-top-width","margin-top"].reduce((s,r)=>{var n;const l=(n=t.get(r))!=null?n:new CSSUnitValue(0,"px"),h=(l instanceof CSSUnitValue?l:new CSSUnitValue(0,"px")).to("px");return s-h.value},0);this.skidding=o}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){const e=getComputedStyle(this.host).direction==="rtl";return this.isConnected?p`
      <sl-popup
        ${Sl(this.popupRef)}
        placement=${e?"left-start":"right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:p` <slot name="submenu" hidden></slot> `}},At=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new yt(this,"submenu"),this.submenuController=new Al(this,this.hasSlotController),this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleMouseOver=e=>{this.focus(),e.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const e=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=e;return}e!==this.cachedTextLabel&&(this.cachedTextLabel=e,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return ga(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const e=this.localize.dir()==="rtl",t=this.submenuController.isExpanded();return p`
      <div
        id="anchor"
        part="base"
        class=${L({"menu-item":!0,"menu-item--rtl":e,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":t})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!t}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${e?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?p` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};At.styles=[P,yl];At.dependencies={"sl-icon":K,"sl-popup":W,"sl-spinner":gi};a([$("slot:not([name])")],At.prototype,"defaultSlot",2);a([$(".menu-item")],At.prototype,"menuItem",2);a([c()],At.prototype,"type",2);a([c({type:Boolean,reflect:!0})],At.prototype,"checked",2);a([c()],At.prototype,"value",2);a([c({type:Boolean,reflect:!0})],At.prototype,"loading",2);a([c({type:Boolean,reflect:!0})],At.prototype,"disabled",2);a([_("checked")],At.prototype,"handleCheckedChange",1);a([_("disabled")],At.prototype,"handleDisabledChange",1);a([_("type")],At.prototype,"handleTypeChange",1);At.define("sl-menu-item");var El=k`
  :host {
    --divider-width: 2px;
    --handle-size: 2.5rem;

    display: inline-block;
    position: relative;
  }

  .image-comparer {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .image-comparer__before,
  .image-comparer__after {
    display: block;
    pointer-events: none;
  }

  .image-comparer__before::slotted(img),
  .image-comparer__after::slotted(img),
  .image-comparer__before::slotted(svg),
  .image-comparer__after::slotted(svg) {
    display: block;
    max-width: 100% !important;
    height: auto;
  }

  .image-comparer__after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .image-comparer__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: var(--sl-color-neutral-0);
    translate: calc(var(--divider-width) / -2);
    cursor: ew-resize;
  }

  .image-comparer__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - (var(--handle-size) / 2));
    width: var(--handle-size);
    height: var(--handle-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: var(--sl-border-radius-circle);
    font-size: calc(var(--handle-size) * 0.5);
    color: var(--sl-color-neutral-700);
    cursor: inherit;
    z-index: 10;
  }

  .image-comparer__handle:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`,Ce=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.position=50}handleDrag(e){const{width:t}=this.base.getBoundingClientRect(),i=this.localize.dir()==="rtl";e.preventDefault(),ii(this.base,{onMove:o=>{this.position=parseFloat(st(o/t*100,0,100).toFixed(2)),i&&(this.position=100-this.position)},initialEvent:e})}handleKeyDown(e){const t=this.localize.dir()==="ltr",i=this.localize.dir()==="rtl";if(["ArrowLeft","ArrowRight","Home","End"].includes(e.key)){const o=e.shiftKey?10:1;let s=this.position;e.preventDefault(),(t&&e.key==="ArrowLeft"||i&&e.key==="ArrowRight")&&(s-=o),(t&&e.key==="ArrowRight"||i&&e.key==="ArrowLeft")&&(s+=o),e.key==="Home"&&(s=0),e.key==="End"&&(s=100),s=st(s,0,100),this.position=s}}handlePositionChange(){this.emit("sl-change")}render(){const e=this.localize.dir()==="rtl";return p`
      <div
        part="base"
        id="image-comparer"
        class=${L({"image-comparer":!0,"image-comparer--rtl":e})}
        @keydown=${this.handleKeyDown}
      >
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${wt({clipPath:e?`inset(0 0 0 ${100-this.position}%)`:`inset(0 ${100-this.position}% 0 0)`})}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${wt({left:e?`${100-this.position}%`:`${this.position}%`})}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <slot name="handle">
              <sl-icon library="system" name="grip-vertical"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `}};Ce.styles=[P,El];Ce.scopedElement={"sl-icon":K};a([$(".image-comparer")],Ce.prototype,"base",2);a([$(".image-comparer__handle")],Ce.prototype,"handle",2);a([c({type:Number,reflect:!0})],Ce.prototype,"position",2);a([_("position",{waitUntilFirstUpdate:!0})],Ce.prototype,"handlePositionChange",1);Ce.define("sl-image-comparer");var Tl=k`
  :host {
    display: block;
  }
`,so=new Map;function Il(e,t="cors"){const i=so.get(e);if(i!==void 0)return Promise.resolve(i);const o=fetch(e,{mode:t}).then(async s=>{const r={ok:s.ok,status:s.status,html:await s.text()};return so.set(e,r),r});return so.set(e,o),o}var He=class extends A{constructor(){super(...arguments),this.mode="cors",this.allowScripts=!1}executeScript(e){const t=document.createElement("script");[...e.attributes].forEach(i=>t.setAttribute(i.name,i.value)),t.textContent=e.textContent,e.parentNode.replaceChild(t,e)}async handleSrcChange(){try{const e=this.src,t=await Il(e,this.mode);if(e!==this.src)return;if(!t.ok){this.emit("sl-error",{detail:{status:t.status}});return}this.innerHTML=t.html,this.allowScripts&&[...this.querySelectorAll("script")].forEach(i=>this.executeScript(i)),this.emit("sl-load")}catch{this.emit("sl-error",{detail:{status:-1}})}}render(){return p`<slot></slot>`}};He.styles=[P,Tl];a([c()],He.prototype,"src",2);a([c()],He.prototype,"mode",2);a([c({attribute:"allow-scripts",type:Boolean})],He.prototype,"allowScripts",2);a([_("src")],He.prototype,"handleSrcChange",1);He.define("sl-include");K.define("sl-icon");lt.define("sl-icon-button");var Wi=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";const e=["","kilo","mega","giga","tera"],t=["","kilo","mega","giga","tera","peta"],i=this.unit==="bit"?e:t,o=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),i.length-1)),s=i[o]+this.unit,r=parseFloat((this.value/Math.pow(1e3,o)).toPrecision(3));return this.localize.number(r,{style:"unit",unit:s,unitDisplay:this.display})}};a([c({type:Number})],Wi.prototype,"value",2);a([c()],Wi.prototype,"unit",2);a([c()],Wi.prototype,"display",2);Wi.define("sl-format-bytes");var Et=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.date=new Date,this.hourFormat="auto"}render(){const e=new Date(this.date),t=this.hourFormat==="auto"?void 0:this.hourFormat==="12";if(!isNaN(e.getMilliseconds()))return p`
      <time datetime=${e.toISOString()}>
        ${this.localize.date(e,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:t})}
      </time>
    `}};a([c()],Et.prototype,"date",2);a([c()],Et.prototype,"weekday",2);a([c()],Et.prototype,"era",2);a([c()],Et.prototype,"year",2);a([c()],Et.prototype,"month",2);a([c()],Et.prototype,"day",2);a([c()],Et.prototype,"hour",2);a([c()],Et.prototype,"minute",2);a([c()],Et.prototype,"second",2);a([c({attribute:"time-zone-name"})],Et.prototype,"timeZoneName",2);a([c({attribute:"time-zone"})],Et.prototype,"timeZone",2);a([c({attribute:"hour-format"})],Et.prototype,"hourFormat",2);Et.define("sl-format-date");var Ut=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.value=0,this.type="decimal",this.noGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.noGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};a([c({type:Number})],Ut.prototype,"value",2);a([c()],Ut.prototype,"type",2);a([c({attribute:"no-grouping",type:Boolean})],Ut.prototype,"noGrouping",2);a([c()],Ut.prototype,"currency",2);a([c({attribute:"currency-display"})],Ut.prototype,"currencyDisplay",2);a([c({attribute:"minimum-integer-digits",type:Number})],Ut.prototype,"minimumIntegerDigits",2);a([c({attribute:"minimum-fraction-digits",type:Number})],Ut.prototype,"minimumFractionDigits",2);a([c({attribute:"maximum-fraction-digits",type:Number})],Ut.prototype,"maximumFractionDigits",2);a([c({attribute:"minimum-significant-digits",type:Number})],Ut.prototype,"minimumSignificantDigits",2);a([c({attribute:"maximum-significant-digits",type:Number})],Ut.prototype,"maximumSignificantDigits",2);Ut.define("sl-format-number");var Dl=k`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,qi=class extends A{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};qi.styles=[P,Dl];a([c({type:Boolean,reflect:!0})],qi.prototype,"vertical",2);a([_("vertical")],qi.prototype,"handleVerticalChange",1);qi.define("sl-divider");var Ll=k`
  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .drawer__header-actions sl-icon-button,
  .drawer__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .drawer__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;function*is(e=document.activeElement){e!=null&&(yield e,"shadowRoot"in e&&e.shadowRoot&&e.shadowRoot.mode!=="closed"&&(yield*da(is(e.shadowRoot.activeElement))))}function Cr(){return[...is()].pop()}var Ps=new WeakMap;function zr(e){let t=Ps.get(e);return t||(t=window.getComputedStyle(e,null),Ps.set(e,t)),t}function Pl(e){if(typeof e.checkVisibility=="function")return e.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const t=zr(e);return t.visibility!=="hidden"&&t.display!=="none"}function Ol(e){const t=zr(e),{overflowY:i,overflowX:o}=t;return i==="scroll"||o==="scroll"?!0:i!=="auto"||o!=="auto"?!1:e.scrollHeight>e.clientHeight&&i==="auto"||e.scrollWidth>e.clientWidth&&o==="auto"}function Rl(e){const t=e.tagName.toLowerCase(),i=Number(e.getAttribute("tabindex"));if(e.hasAttribute("tabindex")&&(isNaN(i)||i<=-1)||e.hasAttribute("disabled")||e.closest("[inert]"))return!1;if(t==="input"&&e.getAttribute("type")==="radio"){const r=e.getRootNode(),n=`input[type='radio'][name="${e.getAttribute("name")}"]`,l=r.querySelector(`${n}:checked`);return l?l===e:r.querySelector(n)===e}return Pl(e)?(t==="audio"||t==="video")&&e.hasAttribute("controls")||e.hasAttribute("tabindex")||e.hasAttribute("contenteditable")&&e.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(t)?!0:Ol(e):!1}function Ml(e){var t,i;const o=yo(e),s=(t=o[0])!=null?t:null,r=(i=o[o.length-1])!=null?i:null;return{start:s,end:r}}function Fl(e,t){var i;return((i=e.getRootNode({composed:!0}))==null?void 0:i.host)!==t}function yo(e){const t=new WeakMap,i=[];function o(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]")||t.has(s))return;t.set(s,!0),!i.includes(s)&&Rl(s)&&i.push(s),s instanceof HTMLSlotElement&&Fl(s,e)&&s.assignedElements({flatten:!0}).forEach(r=>{o(r)}),s.shadowRoot!==null&&s.shadowRoot.mode==="open"&&o(s.shadowRoot)}for(const r of s.children)o(r)}return o(e),i.sort((s,r)=>{const n=Number(s.getAttribute("tabindex"))||0;return(Number(r.getAttribute("tabindex"))||0)-n})}var Xe=[],Sr=class{constructor(e){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=t=>{var i;if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const o=Cr();if(this.previousFocus=o,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const s=yo(this.element);let r=s.findIndex(l=>l===o);this.previousFocus=this.currentFocus;const n=this.tabDirection==="forward"?1:-1;for(;;){r+n>=s.length?r=0:r+n<0?r=s.length-1:r+=n,this.previousFocus=this.currentFocus;const l=s[r];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||l&&this.possiblyHasTabbableChildren(l))return;t.preventDefault(),this.currentFocus=l,(i=this.currentFocus)==null||i.focus({preventScroll:!1});const d=[...is()];if(d.includes(this.currentFocus)||!d.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){Xe.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){Xe=Xe.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return Xe[Xe.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=yo(this.element);if(!this.element.matches(":focus-within")){const t=e[0],i=e[e.length-1],o=this.tabDirection==="forward"?t:i;typeof(o==null?void 0:o.focus)=="function"&&(this.currentFocus=o,o.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}},os=e=>{var t;const{activeElement:i}=document;i&&e.contains(i)&&((t=document.activeElement)==null||t.blur())};function Os(e){return e.charAt(0).toUpperCase()+e.slice(1)}var Tt=class extends A{constructor(){super(...arguments),this.hasSlotController=new yt(this,"footer"),this.localize=new U(this),this.modal=new Sr(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1,this.handleDocumentKeyDown=e=>{this.contained||e.key==="Escape"&&this.modal.isActive()&&this.open&&(e.stopImmediatePropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.drawer.hidden=!this.open,this.open&&(this.addOpenListeners(),this.contained||(this.modal.activate(),ti(this)))}disconnectedCallback(){super.disconnectedCallback(),ei(this),this.removeOpenListeners()}requestClose(e){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:e}}).defaultPrevented){const i=Y(this,"drawer.denyClose",{dir:this.localize.dir()});J(this.panel,i.keyframes,i.options);return}this.hide()}addOpenListeners(){var e;"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.contained||(this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard"))):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var e;document.removeEventListener("keydown",this.handleDocumentKeyDown),(e=this.closeWatcher)==null||e.destroy()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),ti(this));const e=this.querySelector("[autofocus]");e&&e.removeAttribute("autofocus"),await Promise.all([rt(this.drawer),rt(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(e?e.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),e&&e.setAttribute("autofocus","")});const t=Y(this,`drawer.show${Os(this.placement)}`,{dir:this.localize.dir()}),i=Y(this,"drawer.overlay.show",{dir:this.localize.dir()});await Promise.all([J(this.panel,t.keyframes,t.options),J(this.overlay,i.keyframes,i.options)]),this.emit("sl-after-show")}else{os(this),this.emit("sl-hide"),this.removeOpenListeners(),this.contained||(this.modal.deactivate(),ei(this)),await Promise.all([rt(this.drawer),rt(this.overlay)]);const e=Y(this,`drawer.hide${Os(this.placement)}`,{dir:this.localize.dir()}),t=Y(this,"drawer.overlay.hide",{dir:this.localize.dir()});await Promise.all([J(this.overlay,t.keyframes,t.options).then(()=>{this.overlay.hidden=!0}),J(this.panel,e.keyframes,e.options).then(()=>{this.panel.hidden=!0})]),this.drawer.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1;const i=this.originalTrigger;typeof(i==null?void 0:i.focus)=="function"&&setTimeout(()=>i.focus()),this.emit("sl-after-hide")}}handleNoModalChange(){this.open&&!this.contained&&(this.modal.activate(),ti(this)),this.open&&this.contained&&(this.modal.deactivate(),ei(this))}async show(){if(!this.open)return this.open=!0,xt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,xt(this,"sl-after-hide")}render(){return p`
      <div
        part="base"
        class=${L({drawer:!0,"drawer--open":this.open,"drawer--top":this.placement==="top","drawer--end":this.placement==="end","drawer--bottom":this.placement==="bottom","drawer--start":this.placement==="start","drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":this.localize.dir()==="rtl","drawer--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${S(this.noHeader?this.label:void 0)}
          aria-labelledby=${S(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":p`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="drawer__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="drawer__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click=${()=>this.requestClose("close-button")}
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="drawer__body"></slot>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Tt.styles=[P,Ll];Tt.dependencies={"sl-icon-button":lt};a([$(".drawer")],Tt.prototype,"drawer",2);a([$(".drawer__panel")],Tt.prototype,"panel",2);a([$(".drawer__overlay")],Tt.prototype,"overlay",2);a([c({type:Boolean,reflect:!0})],Tt.prototype,"open",2);a([c({reflect:!0})],Tt.prototype,"label",2);a([c({reflect:!0})],Tt.prototype,"placement",2);a([c({type:Boolean,reflect:!0})],Tt.prototype,"contained",2);a([c({attribute:"no-header",type:Boolean,reflect:!0})],Tt.prototype,"noHeader",2);a([_("open",{waitUntilFirstUpdate:!0})],Tt.prototype,"handleOpenChange",1);a([_("contained",{waitUntilFirstUpdate:!0})],Tt.prototype,"handleNoModalChange",1);j("drawer.showTop",{keyframes:[{opacity:0,translate:"0 -100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});j("drawer.hideTop",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 -100%"}],options:{duration:250,easing:"ease"}});j("drawer.showEnd",{keyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});j("drawer.hideEnd",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],options:{duration:250,easing:"ease"}});j("drawer.showBottom",{keyframes:[{opacity:0,translate:"0 100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});j("drawer.hideBottom",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 100%"}],options:{duration:250,easing:"ease"}});j("drawer.showStart",{keyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});j("drawer.hideStart",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],options:{duration:250,easing:"ease"}});j("drawer.denyClose",{keyframes:[{scale:1},{scale:1.01},{scale:1}],options:{duration:250}});j("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});j("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});Tt.define("sl-drawer");var Bl=k`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,gt=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=e=>{this.open&&e.key==="Escape"&&(e.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=e=>{var t;if(e.key==="Escape"&&this.open&&!this.closeWatcher){e.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(e.key==="Tab"){if(this.open&&((t=document.activeElement)==null?void 0:t.tagName.toLowerCase())==="sl-menu-item"){e.preventDefault(),this.hide(),this.focusOnTrigger();return}const i=(o,s)=>{if(!o)return null;const r=o.closest(s);if(r)return r;const n=o.getRootNode();return n instanceof ShadowRoot?i(n.host,s):null};setTimeout(()=>{var o;const s=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?Cr():document.activeElement;(!this.containingElement||i(s,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=e=>{const t=e.composedPath();this.containingElement&&!t.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=e=>{const t=e.target;!this.stayOpenOnSelect&&t.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const e=this.trigger.assignedElements({flatten:!0})[0];typeof(e==null?void 0:e.focus)=="function"&&e.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(e=>e.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(e){if([" ","Enter"].includes(e.key)){e.preventDefault(),this.handleTriggerClick();return}const t=this.getMenu();if(t){const i=t.getAllItems(),o=i[0],s=i[i.length-1];["ArrowDown","ArrowUp","Home","End"].includes(e.key)&&(e.preventDefault(),this.open||(this.show(),await this.updateComplete),i.length>0&&this.updateComplete.then(()=>{(e.key==="ArrowDown"||e.key==="Home")&&(t.setCurrentItem(o),o.focus()),(e.key==="ArrowUp"||e.key==="End")&&(t.setCurrentItem(s),s.focus())}))}}handleTriggerKeyUp(e){e.key===" "&&e.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.assignedElements({flatten:!0}).find(o=>Ml(o).start);let i;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":i=t.button;break;default:i=t}i.setAttribute("aria-haspopup","true"),i.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,xt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,xt(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var e;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var e;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(e=this.closeWatcher)==null||e.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await rt(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:e,options:t}=Y(this,"dropdown.show",{dir:this.localize.dir()});await J(this.popup.popup,e,t),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await rt(this);const{keyframes:e,options:t}=Y(this,"dropdown.hide",{dir:this.localize.dir()});await J(this.popup.popup,e,t),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return p`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${S(this.sync?this.sync:void 0)}
        class=${L({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};gt.styles=[P,Bl];gt.dependencies={"sl-popup":W};a([$(".dropdown")],gt.prototype,"popup",2);a([$(".dropdown__trigger")],gt.prototype,"trigger",2);a([$(".dropdown__panel")],gt.prototype,"panel",2);a([c({type:Boolean,reflect:!0})],gt.prototype,"open",2);a([c({reflect:!0})],gt.prototype,"placement",2);a([c({type:Boolean,reflect:!0})],gt.prototype,"disabled",2);a([c({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],gt.prototype,"stayOpenOnSelect",2);a([c({attribute:!1})],gt.prototype,"containingElement",2);a([c({type:Number})],gt.prototype,"distance",2);a([c({type:Number})],gt.prototype,"skidding",2);a([c({type:Boolean})],gt.prototype,"hoist",2);a([c({reflect:!0})],gt.prototype,"sync",2);a([_("open",{waitUntilFirstUpdate:!0})],gt.prototype,"handleOpenChange",1);j("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});j("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});gt.define("sl-dropdown");var Vl=k`
  :host {
    --error-color: var(--sl-color-danger-600);
    --success-color: var(--sl-color-success-600);

    display: inline-block;
  }

  .copy-button__button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
  }

  .copy-button--success .copy-button__button {
    color: var(--success-color);
  }

  .copy-button--error .copy-button__button {
    color: var(--error-color);
  }

  .copy-button__button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .copy-button__button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }
`,dt=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=!1}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let e=this.value;if(this.from){const t=this.getRootNode(),i=this.from.includes("."),o=this.from.includes("[")&&this.from.includes("]");let s=this.from,r="";i?[s,r]=this.from.trim().split("."):o&&([s,r]=this.from.trim().replace(/\]$/,"").split("["));const n="getElementById"in t?t.getElementById(s):null;n?o?e=n.getAttribute(r)||"":i?e=n[r]||"":e=n.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(!e)this.showStatus("error"),this.emit("sl-error");else try{await navigator.clipboard.writeText(e),this.showStatus("success"),this.emit("sl-copy",{detail:{value:e}})}catch{this.showStatus("error"),this.emit("sl-error")}}async showStatus(e){const t=this.copyLabel||this.localize.term("copy"),i=this.successLabel||this.localize.term("copied"),o=this.errorLabel||this.localize.term("error"),s=e==="success"?this.successIcon:this.errorIcon,r=Y(this,"copy.in",{dir:"ltr"}),n=Y(this,"copy.out",{dir:"ltr"});this.tooltip.content=e==="success"?i:o,await this.copyIcon.animate(n.keyframes,n.options).finished,this.copyIcon.hidden=!0,this.status=e,s.hidden=!1,await s.animate(r.keyframes,r.options).finished,setTimeout(async()=>{await s.animate(n.keyframes,n.options).finished,s.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await this.copyIcon.animate(r.keyframes,r.options).finished,this.tooltip.content=t,this.isCopying=!1},this.feedbackDuration)}render(){const e=this.copyLabel||this.localize.term("copy");return p`
      <sl-tooltip
        class=${L({"copy-button":!0,"copy-button--success":this.status==="success","copy-button--error":this.status==="error"})}
        content=${e}
        placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        exportparts="
          base:tooltip__base,
          base__popup:tooltip__base__popup,
          base__arrow:tooltip__base__arrow,
          body:tooltip__body
        "
      >
        <button
          class="copy-button__button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.handleCopy}
        >
          <slot part="copy-icon" name="copy-icon">
            <sl-icon library="system" name="copy"></sl-icon>
          </slot>
          <slot part="success-icon" name="success-icon" hidden>
            <sl-icon library="system" name="check"></sl-icon>
          </slot>
          <slot part="error-icon" name="error-icon" hidden>
            <sl-icon library="system" name="x-lg"></sl-icon>
          </slot>
        </button>
      </sl-tooltip>
    `}};dt.styles=[P,Vl];dt.dependencies={"sl-icon":K,"sl-tooltip":ct};a([$('slot[name="copy-icon"]')],dt.prototype,"copyIcon",2);a([$('slot[name="success-icon"]')],dt.prototype,"successIcon",2);a([$('slot[name="error-icon"]')],dt.prototype,"errorIcon",2);a([$("sl-tooltip")],dt.prototype,"tooltip",2);a([D()],dt.prototype,"isCopying",2);a([D()],dt.prototype,"status",2);a([c()],dt.prototype,"value",2);a([c()],dt.prototype,"from",2);a([c({type:Boolean,reflect:!0})],dt.prototype,"disabled",2);a([c({attribute:"copy-label"})],dt.prototype,"copyLabel",2);a([c({attribute:"success-label"})],dt.prototype,"successLabel",2);a([c({attribute:"error-label"})],dt.prototype,"errorLabel",2);a([c({attribute:"feedback-duration",type:Number})],dt.prototype,"feedbackDuration",2);a([c({attribute:"tooltip-placement"})],dt.prototype,"tooltipPlacement",2);a([c({type:Boolean})],dt.prototype,"hoist",2);j("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}});j("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}});dt.define("sl-copy-button");var Hl=k`
  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`,Nt=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.open=!1,this.disabled=!1}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(e=>{for(const t of e)t.type==="attributes"&&t.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.detailsObserver)==null||e.disconnect()}handleSummaryClick(e){e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.open?this.hide():this.show()),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&(e.preventDefault(),this.hide()),(e.key==="ArrowDown"||e.key==="ArrowRight")&&(e.preventDefault(),this.show())}async handleOpenChange(){if(this.open){if(this.details.open=!0,this.emit("sl-show",{cancelable:!0}).defaultPrevented){this.open=!1,this.details.open=!1;return}await rt(this.body);const{keyframes:t,options:i}=Y(this,"details.show",{dir:this.localize.dir()});await J(this.body,Di(t,this.body.scrollHeight),i),this.body.style.height="auto",this.emit("sl-after-show")}else{if(this.emit("sl-hide",{cancelable:!0}).defaultPrevented){this.details.open=!0,this.open=!0;return}await rt(this.body);const{keyframes:t,options:i}=Y(this,"details.hide",{dir:this.localize.dir()});await J(this.body,Di(t,this.body.scrollHeight),i),this.body.style.height="auto",this.details.open=!1,this.emit("sl-after-hide")}}async show(){if(!(this.open||this.disabled))return this.open=!0,xt(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,xt(this,"sl-after-hide")}render(){const e=this.localize.dir()==="rtl";return p`
      <details
        part="base"
        class=${L({details:!0,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":e})}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `}};Nt.styles=[P,Hl];Nt.dependencies={"sl-icon":K};a([$(".details")],Nt.prototype,"details",2);a([$(".details__header")],Nt.prototype,"header",2);a([$(".details__body")],Nt.prototype,"body",2);a([$(".details__expand-icon-slot")],Nt.prototype,"expandIconSlot",2);a([c({type:Boolean,reflect:!0})],Nt.prototype,"open",2);a([c()],Nt.prototype,"summary",2);a([c({type:Boolean,reflect:!0})],Nt.prototype,"disabled",2);a([_("open",{waitUntilFirstUpdate:!0})],Nt.prototype,"handleOpenChange",1);j("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});j("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});Nt.define("sl-details");var Ul=k`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,Qt=class extends A{constructor(){super(...arguments),this.hasSlotController=new yt(this,"footer"),this.localize=new U(this),this.modal=new Sr(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.modal.isActive()&&this.open&&(e.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),ti(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),ei(this),this.removeOpenListeners()}requestClose(e){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:e}}).defaultPrevented){const i=Y(this,"dialog.denyClose",{dir:this.localize.dir()});J(this.panel,i.keyframes,i.options);return}this.hide()}addOpenListeners(){var e;"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var e;(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),ti(this);const e=this.querySelector("[autofocus]");e&&e.removeAttribute("autofocus"),await Promise.all([rt(this.dialog),rt(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(e?e.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),e&&e.setAttribute("autofocus","")});const t=Y(this,"dialog.show",{dir:this.localize.dir()}),i=Y(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([J(this.panel,t.keyframes,t.options),J(this.overlay,i.keyframes,i.options)]),this.emit("sl-after-show")}else{os(this),this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([rt(this.dialog),rt(this.overlay)]);const e=Y(this,"dialog.hide",{dir:this.localize.dir()}),t=Y(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([J(this.overlay,t.keyframes,t.options).then(()=>{this.overlay.hidden=!0}),J(this.panel,e.keyframes,e.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,ei(this);const i=this.originalTrigger;typeof(i==null?void 0:i.focus)=="function"&&setTimeout(()=>i.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,xt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,xt(this,"sl-after-hide")}render(){return p`
      <div
        part="base"
        class=${L({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${S(this.noHeader?this.label:void 0)}
          aria-labelledby=${S(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":p`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Qt.styles=[P,Ul];Qt.dependencies={"sl-icon-button":lt};a([$(".dialog")],Qt.prototype,"dialog",2);a([$(".dialog__panel")],Qt.prototype,"panel",2);a([$(".dialog__overlay")],Qt.prototype,"overlay",2);a([c({type:Boolean,reflect:!0})],Qt.prototype,"open",2);a([c({reflect:!0})],Qt.prototype,"label",2);a([c({attribute:"no-header",type:Boolean,reflect:!0})],Qt.prototype,"noHeader",2);a([_("open",{waitUntilFirstUpdate:!0})],Qt.prototype,"handleOpenChange",1);j("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});j("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});j("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});j("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});j("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});Qt.define("sl-dialog");nt.define("sl-checkbox");var Nl=k`
  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
    -webkit-user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: var(--sl-transition-fast) scale;
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-border-radius-circle);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position:
      0 0,
      0 0,
      -5px -5px,
      5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow:
      inset 0 0 0 2px var(--sl-input-border-color),
      inset 0 0 0 4px var(--sl-color-neutral-0);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,q=class extends A{constructor(){super(...arguments),this.formControlController=new ie(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new yt(this,"[default]","prefix","suffix"),this.localize=new U(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:Bi}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(e){this.isButton()&&(this.button.setCustomValidity(e),this.formControlController.updateValidity())}render(){const e=this.isLink(),t=e?Ri`a`:Ri`button`;return Je`
      <${t}
        part="base"
        class=${L({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${S(e?void 0:this.disabled)}
        type=${S(e?void 0:this.type)}
        title=${this.title}
        name=${S(e?void 0:this.name)}
        value=${S(e?void 0:this.value)}
        href=${S(e&&!this.disabled?this.href:void 0)}
        target=${S(e?this.target:void 0)}
        download=${S(e?this.download:void 0)}
        rel=${S(e?this.rel:void 0)}
        role=${S(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?Je` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?Je`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${t}>
    `}};q.styles=[P,yr];q.dependencies={"sl-icon":K,"sl-spinner":gi};a([$(".button")],q.prototype,"button",2);a([D()],q.prototype,"hasFocus",2);a([D()],q.prototype,"invalid",2);a([c()],q.prototype,"title",2);a([c({reflect:!0})],q.prototype,"variant",2);a([c({reflect:!0})],q.prototype,"size",2);a([c({type:Boolean,reflect:!0})],q.prototype,"caret",2);a([c({type:Boolean,reflect:!0})],q.prototype,"disabled",2);a([c({type:Boolean,reflect:!0})],q.prototype,"loading",2);a([c({type:Boolean,reflect:!0})],q.prototype,"outline",2);a([c({type:Boolean,reflect:!0})],q.prototype,"pill",2);a([c({type:Boolean,reflect:!0})],q.prototype,"circle",2);a([c()],q.prototype,"type",2);a([c()],q.prototype,"name",2);a([c()],q.prototype,"value",2);a([c()],q.prototype,"href",2);a([c()],q.prototype,"target",2);a([c()],q.prototype,"rel",2);a([c()],q.prototype,"download",2);a([c()],q.prototype,"form",2);a([c({attribute:"formaction"})],q.prototype,"formAction",2);a([c({attribute:"formenctype"})],q.prototype,"formEnctype",2);a([c({attribute:"formmethod"})],q.prototype,"formMethod",2);a([c({attribute:"formnovalidate",type:Boolean})],q.prototype,"formNoValidate",2);a([c({attribute:"formtarget"})],q.prototype,"formTarget",2);a([_("disabled",{waitUntilFirstUpdate:!0})],q.prototype,"handleDisabledChange",1);function ht(e,t){jl(e)&&(e="100%");const i=Wl(e);return e=t===360?e:Math.min(t,Math.max(0,parseFloat(e))),i&&(e=parseInt(String(e*t),10)/100),Math.abs(e-t)<1e-6?1:(t===360?e=(e<0?e%t+t:e%t)/parseFloat(String(t)):e=e%t/parseFloat(String(t)),e)}function Ci(e){return Math.min(1,Math.max(0,e))}function jl(e){return typeof e=="string"&&e.indexOf(".")!==-1&&parseFloat(e)===1}function Wl(e){return typeof e=="string"&&e.indexOf("%")!==-1}function Ar(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function zi(e){return Number(e)<=1?`${Number(e)*100}%`:e}function me(e){return e.length===1?"0"+e:String(e)}function ql(e,t,i){return{r:ht(e,255)*255,g:ht(t,255)*255,b:ht(i,255)*255}}function Rs(e,t,i){e=ht(e,255),t=ht(t,255),i=ht(i,255);const o=Math.max(e,t,i),s=Math.min(e,t,i);let r=0,n=0;const l=(o+s)/2;if(o===s)n=0,r=0;else{const d=o-s;switch(n=l>.5?d/(2-o-s):d/(o+s),o){case e:r=(t-i)/d+(t<i?6:0);break;case t:r=(i-e)/d+2;break;case i:r=(e-t)/d+4;break}r/=6}return{h:r,s:n,l}}function ro(e,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?e+(t-e)*(6*i):i<1/2?t:i<2/3?e+(t-e)*(2/3-i)*6:e}function Kl(e,t,i){let o,s,r;if(e=ht(e,360),t=ht(t,100),i=ht(i,100),t===0)s=i,r=i,o=i;else{const n=i<.5?i*(1+t):i+t-i*t,l=2*i-n;o=ro(l,n,e+1/3),s=ro(l,n,e),r=ro(l,n,e-1/3)}return{r:o*255,g:s*255,b:r*255}}function Ms(e,t,i){e=ht(e,255),t=ht(t,255),i=ht(i,255);const o=Math.max(e,t,i),s=Math.min(e,t,i);let r=0;const n=o,l=o-s,d=o===0?0:l/o;if(o===s)r=0;else{switch(o){case e:r=(t-i)/l+(t<i?6:0);break;case t:r=(i-e)/l+2;break;case i:r=(e-t)/l+4;break}r/=6}return{h:r,s:d,v:n}}function Gl(e,t,i){e=ht(e,360)*6,t=ht(t,100),i=ht(i,100);const o=Math.floor(e),s=e-o,r=i*(1-t),n=i*(1-s*t),l=i*(1-(1-s)*t),d=o%6,h=[i,n,r,r,l,i][d],g=[l,i,i,n,r,r][d],u=[r,r,l,i,i,n][d];return{r:h*255,g:g*255,b:u*255}}function Fs(e,t,i,o){const s=[me(Math.round(e).toString(16)),me(Math.round(t).toString(16)),me(Math.round(i).toString(16))];return o&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0):s.join("")}function Xl(e,t,i,o,s){const r=[me(Math.round(e).toString(16)),me(Math.round(t).toString(16)),me(Math.round(i).toString(16)),me(Zl(o))];return s&&r[0].startsWith(r[0].charAt(1))&&r[1].startsWith(r[1].charAt(1))&&r[2].startsWith(r[2].charAt(1))&&r[3].startsWith(r[3].charAt(1))?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0)+r[3].charAt(0):r.join("")}function Yl(e,t,i,o){const s=e/100,r=t/100,n=i/100,l=o/100,d=255*(1-s)*(1-l),h=255*(1-r)*(1-l),g=255*(1-n)*(1-l);return{r:d,g:h,b:g}}function Bs(e,t,i){let o=1-e/255,s=1-t/255,r=1-i/255,n=Math.min(o,s,r);return n===1?(o=0,s=0,r=0):(o=(o-n)/(1-n)*100,s=(s-n)/(1-n)*100,r=(r-n)/(1-n)*100),n*=100,{c:Math.round(o),m:Math.round(s),y:Math.round(r),k:Math.round(n)}}function Zl(e){return Math.round(parseFloat(e)*255).toString(16)}function Vs(e){return kt(e)/255}function kt(e){return parseInt(e,16)}function Ql(e){return{r:e>>16,g:(e&65280)>>8,b:e&255}}const wo={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function Jl(e){let t={r:0,g:0,b:0},i=1,o=null,s=null,r=null,n=!1,l=!1;return typeof e=="string"&&(e=ic(e)),typeof e=="object"&&(_t(e.r)&&_t(e.g)&&_t(e.b)?(t=ql(e.r,e.g,e.b),n=!0,l=String(e.r).substr(-1)==="%"?"prgb":"rgb"):_t(e.h)&&_t(e.s)&&_t(e.v)?(o=zi(e.s),s=zi(e.v),t=Gl(e.h,o,s),n=!0,l="hsv"):_t(e.h)&&_t(e.s)&&_t(e.l)?(o=zi(e.s),r=zi(e.l),t=Kl(e.h,o,r),n=!0,l="hsl"):_t(e.c)&&_t(e.m)&&_t(e.y)&&_t(e.k)&&(t=Yl(e.c,e.m,e.y,e.k),n=!0,l="cmyk"),Object.prototype.hasOwnProperty.call(e,"a")&&(i=e.a)),i=Ar(i),{ok:n,format:e.format||l,r:Math.min(255,Math.max(t.r,0)),g:Math.min(255,Math.max(t.g,0)),b:Math.min(255,Math.max(t.b,0)),a:i}}const tc="[-\\+]?\\d+%?",ec="[-\\+]?\\d*\\.\\d+%?",re="(?:"+ec+")|(?:"+tc+")",ao="[\\s|\\(]+("+re+")[,|\\s]+("+re+")[,|\\s]+("+re+")\\s*\\)?",Si="[\\s|\\(]+("+re+")[,|\\s]+("+re+")[,|\\s]+("+re+")[,|\\s]+("+re+")\\s*\\)?",Lt={CSS_UNIT:new RegExp(re),rgb:new RegExp("rgb"+ao),rgba:new RegExp("rgba"+Si),hsl:new RegExp("hsl"+ao),hsla:new RegExp("hsla"+Si),hsv:new RegExp("hsv"+ao),hsva:new RegExp("hsva"+Si),cmyk:new RegExp("cmyk"+Si),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function ic(e){if(e=e.trim().toLowerCase(),e.length===0)return!1;let t=!1;if(wo[e])e=wo[e],t=!0;else if(e==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let i=Lt.rgb.exec(e);return i?{r:i[1],g:i[2],b:i[3]}:(i=Lt.rgba.exec(e),i?{r:i[1],g:i[2],b:i[3],a:i[4]}:(i=Lt.hsl.exec(e),i?{h:i[1],s:i[2],l:i[3]}:(i=Lt.hsla.exec(e),i?{h:i[1],s:i[2],l:i[3],a:i[4]}:(i=Lt.hsv.exec(e),i?{h:i[1],s:i[2],v:i[3]}:(i=Lt.hsva.exec(e),i?{h:i[1],s:i[2],v:i[3],a:i[4]}:(i=Lt.cmyk.exec(e),i?{c:i[1],m:i[2],y:i[3],k:i[4]}:(i=Lt.hex8.exec(e),i?{r:kt(i[1]),g:kt(i[2]),b:kt(i[3]),a:Vs(i[4]),format:t?"name":"hex8"}:(i=Lt.hex6.exec(e),i?{r:kt(i[1]),g:kt(i[2]),b:kt(i[3]),format:t?"name":"hex"}:(i=Lt.hex4.exec(e),i?{r:kt(i[1]+i[1]),g:kt(i[2]+i[2]),b:kt(i[3]+i[3]),a:Vs(i[4]+i[4]),format:t?"name":"hex8"}:(i=Lt.hex3.exec(e),i?{r:kt(i[1]+i[1]),g:kt(i[2]+i[2]),b:kt(i[3]+i[3]),format:t?"name":"hex"}:!1))))))))))}function _t(e){return typeof e=="number"?!Number.isNaN(e):Lt.CSS_UNIT.test(e)}class Q{constructor(t="",i={}){if(t instanceof Q)return t;typeof t=="number"&&(t=Ql(t)),this.originalInput=t;const o=Jl(t);this.originalInput=t,this.r=o.r,this.g=o.g,this.b=o.b,this.a=o.a,this.roundA=Math.round(100*this.a)/100,this.format=i.format??o.format,this.gradientType=i.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=o.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const t=this.toRgb();return(t.r*299+t.g*587+t.b*114)/1e3}getLuminance(){const t=this.toRgb();let i,o,s;const r=t.r/255,n=t.g/255,l=t.b/255;return r<=.03928?i=r/12.92:i=Math.pow((r+.055)/1.055,2.4),n<=.03928?o=n/12.92:o=Math.pow((n+.055)/1.055,2.4),l<=.03928?s=l/12.92:s=Math.pow((l+.055)/1.055,2.4),.2126*i+.7152*o+.0722*s}getAlpha(){return this.a}setAlpha(t){return this.a=Ar(t),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:t}=this.toHsl();return t===0}toHsv(){const t=Ms(this.r,this.g,this.b);return{h:t.h*360,s:t.s,v:t.v,a:this.a}}toHsvString(){const t=Ms(this.r,this.g,this.b),i=Math.round(t.h*360),o=Math.round(t.s*100),s=Math.round(t.v*100);return this.a===1?`hsv(${i}, ${o}%, ${s}%)`:`hsva(${i}, ${o}%, ${s}%, ${this.roundA})`}toHsl(){const t=Rs(this.r,this.g,this.b);return{h:t.h*360,s:t.s,l:t.l,a:this.a}}toHslString(){const t=Rs(this.r,this.g,this.b),i=Math.round(t.h*360),o=Math.round(t.s*100),s=Math.round(t.l*100);return this.a===1?`hsl(${i}, ${o}%, ${s}%)`:`hsla(${i}, ${o}%, ${s}%, ${this.roundA})`}toHex(t=!1){return Fs(this.r,this.g,this.b,t)}toHexString(t=!1){return"#"+this.toHex(t)}toHex8(t=!1){return Xl(this.r,this.g,this.b,this.a,t)}toHex8String(t=!1){return"#"+this.toHex8(t)}toHexShortString(t=!1){return this.a===1?this.toHexString(t):this.toHex8String(t)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const t=Math.round(this.r),i=Math.round(this.g),o=Math.round(this.b);return this.a===1?`rgb(${t}, ${i}, ${o})`:`rgba(${t}, ${i}, ${o}, ${this.roundA})`}toPercentageRgb(){const t=i=>`${Math.round(ht(i,255)*100)}%`;return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}}toPercentageRgbString(){const t=i=>Math.round(ht(i,255)*100);return this.a===1?`rgb(${t(this.r)}%, ${t(this.g)}%, ${t(this.b)}%)`:`rgba(${t(this.r)}%, ${t(this.g)}%, ${t(this.b)}%, ${this.roundA})`}toCmyk(){return{...Bs(this.r,this.g,this.b)}}toCmykString(){const{c:t,m:i,y:o,k:s}=Bs(this.r,this.g,this.b);return`cmyk(${t}, ${i}, ${o}, ${s})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;const t="#"+Fs(this.r,this.g,this.b,!1);for(const[i,o]of Object.entries(wo))if(t===o)return i;return!1}toString(t){const i=!!t;t=t??this.format;let o=!1;const s=this.a<1&&this.a>=0;return!i&&s&&(t.startsWith("hex")||t==="name")?t==="name"&&this.a===0?this.toName():this.toRgbString():(t==="rgb"&&(o=this.toRgbString()),t==="prgb"&&(o=this.toPercentageRgbString()),(t==="hex"||t==="hex6")&&(o=this.toHexString()),t==="hex3"&&(o=this.toHexString(!0)),t==="hex4"&&(o=this.toHex8String(!0)),t==="hex8"&&(o=this.toHex8String()),t==="name"&&(o=this.toName()),t==="hsl"&&(o=this.toHslString()),t==="hsv"&&(o=this.toHsvString()),t==="cmyk"&&(o=this.toCmykString()),o||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new Q(this.toString())}lighten(t=10){const i=this.toHsl();return i.l+=t/100,i.l=Ci(i.l),new Q(i)}brighten(t=10){const i=this.toRgb();return i.r=Math.max(0,Math.min(255,i.r-Math.round(255*-(t/100)))),i.g=Math.max(0,Math.min(255,i.g-Math.round(255*-(t/100)))),i.b=Math.max(0,Math.min(255,i.b-Math.round(255*-(t/100)))),new Q(i)}darken(t=10){const i=this.toHsl();return i.l-=t/100,i.l=Ci(i.l),new Q(i)}tint(t=10){return this.mix("white",t)}shade(t=10){return this.mix("black",t)}desaturate(t=10){const i=this.toHsl();return i.s-=t/100,i.s=Ci(i.s),new Q(i)}saturate(t=10){const i=this.toHsl();return i.s+=t/100,i.s=Ci(i.s),new Q(i)}greyscale(){return this.desaturate(100)}spin(t){const i=this.toHsl(),o=(i.h+t)%360;return i.h=o<0?360+o:o,new Q(i)}mix(t,i=50){const o=this.toRgb(),s=new Q(t).toRgb(),r=i/100,n={r:(s.r-o.r)*r+o.r,g:(s.g-o.g)*r+o.g,b:(s.b-o.b)*r+o.b,a:(s.a-o.a)*r+o.a};return new Q(n)}analogous(t=6,i=30){const o=this.toHsl(),s=360/i,r=[this];for(o.h=(o.h-(s*t>>1)+720)%360;--t;)o.h=(o.h+s)%360,r.push(new Q(o));return r}complement(){const t=this.toHsl();return t.h=(t.h+180)%360,new Q(t)}monochromatic(t=6){const i=this.toHsv(),{h:o}=i,{s}=i;let{v:r}=i;const n=[],l=1/t;for(;t--;)n.push(new Q({h:o,s,v:r})),r=(r+l)%1;return n}splitcomplement(){const t=this.toHsl(),{h:i}=t;return[this,new Q({h:(i+72)%360,s:t.s,l:t.l}),new Q({h:(i+216)%360,s:t.s,l:t.l})]}onBackground(t){const i=this.toRgb(),o=new Q(t).toRgb(),s=i.a+o.a*(1-i.a);return new Q({r:(i.r*i.a+o.r*o.a*(1-i.a))/s,g:(i.g*i.a+o.g*o.a*(1-i.a))/s,b:(i.b*i.a+o.b*o.a*(1-i.a))/s,a:s})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(t){const i=this.toHsl(),{h:o}=i,s=[this],r=360/t;for(let n=1;n<t;n++)s.push(new Q({h:(o+n*r)%360,s:i.s,l:i.l}));return s}equals(t){const i=new Q(t);return this.format==="cmyk"||i.format==="cmyk"?this.toCmykString()===i.toCmykString():this.toRgbString()===i.toRgbString()}}var Hs="EyeDropper"in window,H=class extends A{constructor(){super(),this.formControlController=new ie(this),this.isSafeValue=!1,this.localize=new U(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!1,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=!1,this.size="medium",this.noFormatToggle=!1,this.name="",this.disabled=!1,this.hoist=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.form="",this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.handleFocusOut=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity()})}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")})}handleFormatToggle(){const e=["hex","rgb","hsl","hsv"],t=(e.indexOf(this.format)+1)%e.length;this.format=e[t],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input")}handleAlphaDrag(e){const t=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),i=t.querySelector(".color-picker__slider-handle"),{width:o}=t.getBoundingClientRect();let s=this.value,r=this.value;i.focus(),e.preventDefault(),ii(t,{onMove:n=>{this.alpha=st(n/o*100,0,100),this.syncValues(),this.value!==r&&(r=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==s&&(s=this.value,this.emit("sl-change"))},initialEvent:e})}handleHueDrag(e){const t=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),i=t.querySelector(".color-picker__slider-handle"),{width:o}=t.getBoundingClientRect();let s=this.value,r=this.value;i.focus(),e.preventDefault(),ii(t,{onMove:n=>{this.hue=st(n/o*360,0,360),this.syncValues(),this.value!==r&&(r=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==s&&(s=this.value,this.emit("sl-change"))},initialEvent:e})}handleGridDrag(e){const t=this.shadowRoot.querySelector(".color-picker__grid"),i=t.querySelector(".color-picker__grid-handle"),{width:o,height:s}=t.getBoundingClientRect();let r=this.value,n=this.value;i.focus(),e.preventDefault(),this.isDraggingGridHandle=!0,ii(t,{onMove:(l,d)=>{this.saturation=st(l/o*100,0,100),this.brightness=st(100-d/s*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==r&&(r=this.value,this.emit("sl-change"))},initialEvent:e})}handleAlphaKeyDown(e){const t=e.shiftKey?10:1,i=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.alpha=st(this.alpha-t,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.alpha=st(this.alpha+t,0,100),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.alpha=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.alpha=100,this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleHueKeyDown(e){const t=e.shiftKey?10:1,i=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.hue=st(this.hue-t,0,360),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.hue=st(this.hue+t,0,360),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.hue=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.hue=360,this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleGridKeyDown(e){const t=e.shiftKey?10:1,i=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.saturation=st(this.saturation-t,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.saturation=st(this.saturation+t,0,100),this.syncValues()),e.key==="ArrowUp"&&(e.preventDefault(),this.brightness=st(this.brightness+t,0,100),this.syncValues()),e.key==="ArrowDown"&&(e.preventDefault(),this.brightness=st(this.brightness-t,0,100),this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputChange(e){const t=e.target,i=this.value;e.stopPropagation(),this.input.value?(this.setColor(t.value),t.value=this.value):this.value="",this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputInput(e){this.formControlController.updateValidity(),e.stopPropagation()}handleInputKeyDown(e){if(e.key==="Enter"){const t=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==t&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0}}handleInputInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleTouchMove(e){e.preventDefault()}parseColor(e){const t=new Q(e);if(!t.isValid)return null;const i=t.toHsl(),o={h:i.h,s:i.s*100,l:i.l*100,a:i.a},s=t.toRgb(),r=t.toHexString(),n=t.toHex8String(),l=t.toHsv(),d={h:l.h,s:l.s*100,v:l.v*100,a:l.a};return{hsl:{h:o.h,s:o.s,l:o.l,string:this.setLetterCase(`hsl(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%)`)},hsla:{h:o.h,s:o.s,l:o.l,a:o.a,string:this.setLetterCase(`hsla(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%, ${o.a.toFixed(2).toString()})`)},hsv:{h:d.h,s:d.s,v:d.v,string:this.setLetterCase(`hsv(${Math.round(d.h)}, ${Math.round(d.s)}%, ${Math.round(d.v)}%)`)},hsva:{h:d.h,s:d.s,v:d.v,a:d.a,string:this.setLetterCase(`hsva(${Math.round(d.h)}, ${Math.round(d.s)}%, ${Math.round(d.v)}%, ${d.a.toFixed(2).toString()})`)},rgb:{r:s.r,g:s.g,b:s.b,string:this.setLetterCase(`rgb(${Math.round(s.r)}, ${Math.round(s.g)}, ${Math.round(s.b)})`)},rgba:{r:s.r,g:s.g,b:s.b,a:s.a,string:this.setLetterCase(`rgba(${Math.round(s.r)}, ${Math.round(s.g)}, ${Math.round(s.b)}, ${s.a.toFixed(2).toString()})`)},hex:this.setLetterCase(r),hexa:this.setLetterCase(n)}}setColor(e){const t=this.parseColor(e);return t===null?!1:(this.hue=t.hsva.h,this.saturation=t.hsva.s,this.brightness=t.hsva.v,this.alpha=this.opacity?t.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(e){return typeof e!="string"?"":this.uppercase?e.toUpperCase():e.toLowerCase()}async syncValues(){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);e!==null&&(this.format==="hsl"?this.inputValue=this.opacity?e.hsla.string:e.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?e.rgba.string:e.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?e.hsva.string:e.hsv.string:this.inputValue=this.opacity?e.hexa:e.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){if(!Hs)return;new EyeDropper().open().then(t=>{const i=this.value;this.setColor(t.sRGBHex),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}).catch(()=>{})}selectSwatch(e){const t=this.value;this.disabled||(this.setColor(e),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input")))}getHexString(e,t,i,o=100){const s=new Q(`hsva(${e}, ${t}%, ${i}%, ${o/100})`);return s.isValid?s.toHex8String():""}stopNestedEventPropagation(e){e.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(e,t){if(this.isEmpty=!t,t||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const i=this.parseColor(t);i!==null?(this.inputValue=this.value,this.hue=i.hsva.h,this.saturation=i.hsva.s,this.brightness=i.hsva.v,this.alpha=i.hsva.a*100,this.syncValues()):this.inputValue=e??""}}focus(e){this.inline?this.base.focus(e):this.trigger.focus(e)}blur(){var e;const t=this.inline?this.base:this.trigger;this.hasFocus&&(t.focus({preventScroll:!0}),t.blur()),(e=this.dropdown)!=null&&e.open&&this.dropdown.hide()}getFormattedValue(e="hex"){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(t===null)return"";switch(e){case"hex":return t.hex;case"hexa":return t.hexa;case"rgb":return t.rgb.string;case"rgba":return t.rgba.string;case"hsl":return t.hsl.string;case"hsla":return t.hsla.string;case"hsv":return t.hsv.string;case"hsva":return t.hsva.string;default:return""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return!this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:!0}),this.disabled||this.formControlController.emitInvalidEvent(),!1):this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.saturation,t=100-this.brightness,i=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(s=>s.trim()!==""),o=p`
      <div
        part="base"
        class=${L({"color-picker":!0,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?p`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${wt({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${L({"color-picker__grid-handle":!0,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${wt({top:`${t}%`,left:`${e}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${S(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="color-picker__slider-handle"
                style=${wt({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${S(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?p`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${wt({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${wt({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${S(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${wt({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
            @sl-invalid=${this.handleInputInvalid}
            @sl-blur=${this.stopNestedEventPropagation}
            @sl-focus=${this.stopNestedEventPropagation}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":p`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${Hs?p`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${i.length>0?p`
              <div part="swatches" class="color-picker__swatches">
                ${i.map(s=>{const r=this.parseColor(s);return r?p`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${S(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${s}
                      @click=${()=>this.selectSwatch(s)}
                      @keydown=${n=>!this.disabled&&n.key==="Enter"&&this.setColor(r.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${wt({backgroundColor:r.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${s}"`,this),"")})}
              </div>
            `:""}
      </div>
    `;return this.inline?o:p`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containingElement=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${L({"color-dropdown__trigger":!0,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":!0})}
          style=${wt({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${o}
      </sl-dropdown>
    `}};H.styles=[P,Nl];H.dependencies={"sl-button-group":$e,"sl-button":q,"sl-dropdown":gt,"sl-icon":K,"sl-input":F,"sl-visually-hidden":Jo};a([$('[part~="base"]')],H.prototype,"base",2);a([$('[part~="input"]')],H.prototype,"input",2);a([$(".color-dropdown")],H.prototype,"dropdown",2);a([$('[part~="preview"]')],H.prototype,"previewButton",2);a([$('[part~="trigger"]')],H.prototype,"trigger",2);a([D()],H.prototype,"hasFocus",2);a([D()],H.prototype,"isDraggingGridHandle",2);a([D()],H.prototype,"isEmpty",2);a([D()],H.prototype,"inputValue",2);a([D()],H.prototype,"hue",2);a([D()],H.prototype,"saturation",2);a([D()],H.prototype,"brightness",2);a([D()],H.prototype,"alpha",2);a([c()],H.prototype,"value",2);a([Re()],H.prototype,"defaultValue",2);a([c()],H.prototype,"label",2);a([c()],H.prototype,"format",2);a([c({type:Boolean,reflect:!0})],H.prototype,"inline",2);a([c({reflect:!0})],H.prototype,"size",2);a([c({attribute:"no-format-toggle",type:Boolean})],H.prototype,"noFormatToggle",2);a([c()],H.prototype,"name",2);a([c({type:Boolean,reflect:!0})],H.prototype,"disabled",2);a([c({type:Boolean})],H.prototype,"hoist",2);a([c({type:Boolean})],H.prototype,"opacity",2);a([c({type:Boolean})],H.prototype,"uppercase",2);a([c()],H.prototype,"swatches",2);a([c({reflect:!0})],H.prototype,"form",2);a([c({type:Boolean,reflect:!0})],H.prototype,"required",2);a([hi({passive:!1})],H.prototype,"handleTouchMove",1);a([_("format",{waitUntilFirstUpdate:!0})],H.prototype,"handleFormatChange",1);a([_("opacity",{waitUntilFirstUpdate:!0})],H.prototype,"handleOpacityChange",1);a([_("value")],H.prototype,"handleValueChange",1);H.define("sl-color-picker");var oc=k`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,Er=class extends A{constructor(){super(...arguments),this.hasSlotController=new yt(this,"footer","header","image")}render(){return p`
      <div
        part="base"
        class=${L({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};Er.styles=[P,oc];Er.define("sl-card");var sc=class{constructor(e,t){this.timerId=0,this.activeInteractions=0,this.paused=!1,this.stopped=!0,this.pause=()=>{this.activeInteractions++||(this.paused=!0,this.host.requestUpdate())},this.resume=()=>{--this.activeInteractions||(this.paused=!1,this.host.requestUpdate())},e.addController(this),this.host=e,this.tickCallback=t}hostConnected(){this.host.addEventListener("mouseenter",this.pause),this.host.addEventListener("mouseleave",this.resume),this.host.addEventListener("focusin",this.pause),this.host.addEventListener("focusout",this.resume),this.host.addEventListener("touchstart",this.pause,{passive:!0}),this.host.addEventListener("touchend",this.resume)}hostDisconnected(){this.stop(),this.host.removeEventListener("mouseenter",this.pause),this.host.removeEventListener("mouseleave",this.resume),this.host.removeEventListener("focusin",this.pause),this.host.removeEventListener("focusout",this.resume),this.host.removeEventListener("touchstart",this.pause),this.host.removeEventListener("touchend",this.resume)}start(e){this.stop(),this.stopped=!1,this.timerId=window.setInterval(()=>{this.paused||this.tickCallback()},e)}stop(){clearInterval(this.timerId),this.stopped=!0,this.host.requestUpdate()}},rc=k`
  :host {
    --slide-gap: var(--sl-spacing-medium, 1rem);
    --aspect-ratio: 16 / 9;
    --scroll-hint: 0px;

    display: flex;
  }

  .carousel {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
      '. slides .'
      '. pagination .';
    gap: var(--sl-spacing-medium);
    align-items: center;
    min-height: 100%;
    min-width: 100%;
    position: relative;
  }

  .carousel__pagination {
    grid-area: pagination;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sl-spacing-small);
  }

  .carousel__slides {
    grid-area: slides;

    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-items: center;
    overflow: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    aspect-ratio: calc(var(--aspect-ratio) * var(--slides-per-page));
    border-radius: var(--sl-border-radius-small);

    --slide-size: calc((100% - (var(--slides-per-page) - 1) * var(--slide-gap)) / var(--slides-per-page));
  }

  @media (prefers-reduced-motion) {
    :where(.carousel__slides) {
      scroll-behavior: auto;
    }
  }

  .carousel__slides--horizontal {
    grid-auto-flow: column;
    grid-auto-columns: var(--slide-size);
    grid-auto-rows: 100%;
    column-gap: var(--slide-gap);
    scroll-snap-type: x mandatory;
    scroll-padding-inline: var(--scroll-hint);
    padding-inline: var(--scroll-hint);
    overflow-y: hidden;
  }

  .carousel__slides--vertical {
    grid-auto-flow: row;
    grid-auto-columns: 100%;
    grid-auto-rows: var(--slide-size);
    row-gap: var(--slide-gap);
    scroll-snap-type: y mandatory;
    scroll-padding-block: var(--scroll-hint);
    padding-block: var(--scroll-hint);
    overflow-x: hidden;
  }

  .carousel__slides--dragging {
  }

  :host([vertical]) ::slotted(sl-carousel-item) {
    height: 100%;
  }

  .carousel__slides::-webkit-scrollbar {
    display: none;
  }

  .carousel__navigation {
    grid-area: navigation;
    display: contents;
    font-size: var(--sl-font-size-x-large);
  }

  .carousel__navigation-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-small);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    appearance: none;
  }

  .carousel__navigation-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .carousel__navigation-button--disabled::part(base) {
    pointer-events: none;
  }

  .carousel__navigation-button--previous {
    grid-column: 1;
    grid-row: 1;
  }

  .carousel__navigation-button--next {
    grid-column: 3;
    grid-row: 1;
  }

  .carousel__pagination-item {
    display: block;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: var(--sl-border-radius-circle);
    width: var(--sl-spacing-small);
    height: var(--sl-spacing-small);
    background-color: var(--sl-color-neutral-300);
    padding: 0;
    margin: 0;
  }

  .carousel__pagination-item--active {
    background-color: var(--sl-color-neutral-700);
    transform: scale(1.2);
  }

  /* Focus styles */
  .carousel__slides:focus-visible,
  .carousel__navigation-button:focus-visible,
  .carousel__pagination-item:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*ac(e,t){if(e!==void 0){let i=0;for(const o of e)yield t(o,i++)}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*nc(e,t,i=1){const o=t===void 0?0:e;t??(t=e);for(let s=o;i>0?s<t:t<s;s+=i)yield s}var et=class extends A{constructor(){super(...arguments),this.loop=!1,this.navigation=!1,this.pagination=!1,this.autoplay=!1,this.autoplayInterval=3e3,this.slidesPerPage=1,this.slidesPerMove=1,this.orientation="horizontal",this.mouseDragging=!1,this.activeSlide=0,this.scrolling=!1,this.dragging=!1,this.autoplayController=new sc(this,()=>this.next()),this.dragStartPosition=[-1,-1],this.localize=new U(this),this.pendingSlideChange=!1,this.handleMouseDrag=e=>{this.dragging||(this.scrollContainer.style.setProperty("scroll-snap-type","none"),this.dragging=!0,this.dragStartPosition=[e.clientX,e.clientY]),this.scrollContainer.scrollBy({left:-e.movementX,top:-e.movementY,behavior:"instant"})},this.handleMouseDragEnd=()=>{const e=this.scrollContainer;document.removeEventListener("pointermove",this.handleMouseDrag,{capture:!0});const t=e.scrollLeft,i=e.scrollTop;e.style.removeProperty("scroll-snap-type"),e.style.setProperty("overflow","hidden");const o=e.scrollLeft,s=e.scrollTop;e.style.removeProperty("overflow"),e.style.setProperty("scroll-snap-type","none"),e.scrollTo({left:t,top:i,behavior:"instant"}),requestAnimationFrame(async()=>{(t!==o||i!==s)&&(e.scrollTo({left:o,top:s,behavior:ho()?"auto":"smooth"}),await xt(e,"scrollend")),e.style.removeProperty("scroll-snap-type"),this.dragging=!1,this.dragStartPosition=[-1,-1],this.handleScrollEnd()})},this.handleSlotChange=e=>{e.some(i=>[...i.addedNodes,...i.removedNodes].some(o=>this.isCarouselItem(o)&&!o.hasAttribute("data-clone")))&&this.initializeSlides(),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","region"),this.setAttribute("aria-label",this.localize.term("carousel"))}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect()}firstUpdated(){this.initializeSlides(),this.mutationObserver=new MutationObserver(this.handleSlotChange),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}willUpdate(e){(e.has("slidesPerMove")||e.has("slidesPerPage"))&&(this.slidesPerMove=Math.min(this.slidesPerMove,this.slidesPerPage))}getPageCount(){const e=this.getSlides().length,{slidesPerPage:t,slidesPerMove:i,loop:o}=this,s=o?e/i:(e-t)/i+1;return Math.ceil(s)}getCurrentPage(){return Math.ceil(this.activeSlide/this.slidesPerMove)}canScrollNext(){return this.loop||this.getCurrentPage()<this.getPageCount()-1}canScrollPrev(){return this.loop||this.getCurrentPage()>0}getSlides({excludeClones:e=!0}={}){return[...this.children].filter(t=>this.isCarouselItem(t)&&(!e||!t.hasAttribute("data-clone")))}handleClick(e){if(this.dragging&&this.dragStartPosition[0]>0&&this.dragStartPosition[1]>0){const t=Math.abs(this.dragStartPosition[0]-e.clientX),i=Math.abs(this.dragStartPosition[1]-e.clientY);Math.sqrt(t*t+i*i)>=10&&e.preventDefault()}}handleKeyDown(e){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)){const t=e.target,i=this.localize.dir()==="rtl",o=t.closest('[part~="pagination-item"]')!==null,s=e.key==="ArrowDown"||!i&&e.key==="ArrowRight"||i&&e.key==="ArrowLeft",r=e.key==="ArrowUp"||!i&&e.key==="ArrowLeft"||i&&e.key==="ArrowRight";e.preventDefault(),r&&this.previous(),s&&this.next(),e.key==="Home"&&this.goToSlide(0),e.key==="End"&&this.goToSlide(this.getSlides().length-1),o&&this.updateComplete.then(()=>{var n;const l=(n=this.shadowRoot)==null?void 0:n.querySelector('[part~="pagination-item--active"]');l&&l.focus()})}}handleMouseDragStart(e){this.mouseDragging&&e.button===0&&(e.preventDefault(),document.addEventListener("pointermove",this.handleMouseDrag,{capture:!0,passive:!0}),document.addEventListener("pointerup",this.handleMouseDragEnd,{capture:!0,once:!0}))}handleScroll(){this.scrolling=!0,this.pendingSlideChange||this.synchronizeSlides()}synchronizeSlides(){const e=new IntersectionObserver(t=>{e.disconnect();for(const l of t){const d=l.target;d.toggleAttribute("inert",!l.isIntersecting),d.classList.toggle("--in-view",l.isIntersecting),d.setAttribute("aria-hidden",l.isIntersecting?"false":"true")}const i=t.find(l=>l.isIntersecting);if(!i)return;const o=this.getSlides({excludeClones:!1}),s=this.getSlides().length,r=o.indexOf(i.target),n=this.loop?r-this.slidesPerPage:r;if(this.activeSlide=(Math.ceil(n/this.slidesPerMove)*this.slidesPerMove+s)%s,!this.scrolling&&this.loop&&i.target.hasAttribute("data-clone")){const l=Number(i.target.getAttribute("data-clone"));this.goToSlide(l,"instant")}},{root:this.scrollContainer,threshold:.6});this.getSlides({excludeClones:!1}).forEach(t=>{e.observe(t)})}handleScrollEnd(){!this.scrolling||this.dragging||(this.scrolling=!1,this.pendingSlideChange=!1,this.synchronizeSlides())}isCarouselItem(e){return e instanceof Element&&e.tagName.toLowerCase()==="sl-carousel-item"}initializeSlides(){this.getSlides({excludeClones:!1}).forEach((e,t)=>{e.classList.remove("--in-view"),e.classList.remove("--is-active"),e.setAttribute("role","group"),e.setAttribute("aria-label",this.localize.term("slideNum",t+1)),this.pagination&&(e.setAttribute("id",`slide-${t+1}`),e.setAttribute("role","tabpanel"),e.removeAttribute("aria-label"),e.setAttribute("aria-labelledby",`tab-${t+1}`)),e.hasAttribute("data-clone")&&e.remove()}),this.updateSlidesSnap(),this.loop&&this.createClones(),this.goToSlide(this.activeSlide,"auto"),this.synchronizeSlides()}createClones(){const e=this.getSlides(),t=this.slidesPerPage,i=e.slice(-t),o=e.slice(0,t);i.reverse().forEach((s,r)=>{const n=s.cloneNode(!0);n.setAttribute("data-clone",String(e.length-r-1)),this.prepend(n)}),o.forEach((s,r)=>{const n=s.cloneNode(!0);n.setAttribute("data-clone",String(r)),this.append(n)})}handleSlideChange(){const e=this.getSlides();e.forEach((t,i)=>{t.classList.toggle("--is-active",i===this.activeSlide)}),this.hasUpdated&&this.emit("sl-slide-change",{detail:{index:this.activeSlide,slide:e[this.activeSlide]}})}updateSlidesSnap(){const e=this.getSlides(),t=this.slidesPerMove;e.forEach((i,o)=>{(o+t)%t===0?i.style.removeProperty("scroll-snap-align"):i.style.setProperty("scroll-snap-align","none")})}handleAutoplayChange(){this.autoplayController.stop(),this.autoplay&&this.autoplayController.start(this.autoplayInterval)}previous(e="smooth"){this.goToSlide(this.activeSlide-this.slidesPerMove,e)}next(e="smooth"){this.goToSlide(this.activeSlide+this.slidesPerMove,e)}goToSlide(e,t="smooth"){const{slidesPerPage:i,loop:o}=this,s=this.getSlides(),r=this.getSlides({excludeClones:!1});if(!s.length)return;const n=o?(e+s.length)%s.length:st(e,0,s.length-i);this.activeSlide=n;const l=this.localize.dir()==="rtl",d=st(e+(o?i:0)+(l?i-1:0),0,r.length-1),h=r[d];this.scrollToSlide(h,ho()?"auto":t)}scrollToSlide(e,t="smooth"){this.pendingSlideChange=!0,window.requestAnimationFrame(()=>{if(!this.scrollContainer)return;const i=this.scrollContainer,o=i.getBoundingClientRect(),s=e.getBoundingClientRect(),r=s.left-o.left,n=s.top-o.top;r||n?(this.pendingSlideChange=!0,i.scrollTo({left:r+i.scrollLeft,top:n+i.scrollTop,behavior:t})):this.pendingSlideChange=!1})}render(){const{slidesPerMove:e,scrolling:t}=this,i=this.getPageCount(),o=this.getCurrentPage(),s=this.canScrollPrev(),r=this.canScrollNext(),n=this.localize.dir()==="ltr";return p`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${L({carousel__slides:!0,"carousel__slides--horizontal":this.orientation==="horizontal","carousel__slides--vertical":this.orientation==="vertical","carousel__slides--dragging":this.dragging})}"
          style="--slides-per-page: ${this.slidesPerPage};"
          aria-busy="${t?"true":"false"}"
          aria-atomic="true"
          tabindex="0"
          @keydown=${this.handleKeyDown}
          @mousedown="${this.handleMouseDragStart}"
          @scroll="${this.handleScroll}"
          @scrollend=${this.handleScrollEnd}
          @click=${this.handleClick}
        >
          <slot></slot>
        </div>

        ${this.navigation?p`
              <div part="navigation" class="carousel__navigation">
                <button
                  part="navigation-button navigation-button--previous"
                  class="${L({"carousel__navigation-button":!0,"carousel__navigation-button--previous":!0,"carousel__navigation-button--disabled":!s})}"
                  aria-label="${this.localize.term("previousSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${s?"false":"true"}"
                  @click=${s?()=>this.previous():null}
                >
                  <slot name="previous-icon">
                    <sl-icon library="system" name="${n?"chevron-left":"chevron-right"}"></sl-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button--next"
                  class=${L({"carousel__navigation-button":!0,"carousel__navigation-button--next":!0,"carousel__navigation-button--disabled":!r})}
                  aria-label="${this.localize.term("nextSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${r?"false":"true"}"
                  @click=${r?()=>this.next():null}
                >
                  <slot name="next-icon">
                    <sl-icon library="system" name="${n?"chevron-right":"chevron-left"}"></sl-icon>
                  </slot>
                </button>
              </div>
            `:""}
        ${this.pagination?p`
              <div part="pagination" role="tablist" class="carousel__pagination">
                ${ac(nc(i),l=>{const d=l===o;return p`
                    <button
                      part="pagination-item ${d?"pagination-item--active":""}"
                      class="${L({"carousel__pagination-item":!0,"carousel__pagination-item--active":d})}"
                      role="tab"
                      id="tab-${l+1}"
                      aria-controls="slide-${l+1}"
                      aria-selected="${d?"true":"false"}"
                      aria-label="${d?this.localize.term("slideNum",l+1):this.localize.term("goToSlide",l+1,i)}"
                      tabindex=${d?"0":"-1"}
                      @click=${()=>this.goToSlide(l*e)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `})}
              </div>
            `:""}
      </div>
    `}};et.styles=[P,rc];et.dependencies={"sl-icon":K};a([c({type:Boolean,reflect:!0})],et.prototype,"loop",2);a([c({type:Boolean,reflect:!0})],et.prototype,"navigation",2);a([c({type:Boolean,reflect:!0})],et.prototype,"pagination",2);a([c({type:Boolean,reflect:!0})],et.prototype,"autoplay",2);a([c({type:Number,attribute:"autoplay-interval"})],et.prototype,"autoplayInterval",2);a([c({type:Number,attribute:"slides-per-page"})],et.prototype,"slidesPerPage",2);a([c({type:Number,attribute:"slides-per-move"})],et.prototype,"slidesPerMove",2);a([c()],et.prototype,"orientation",2);a([c({type:Boolean,reflect:!0,attribute:"mouse-dragging"})],et.prototype,"mouseDragging",2);a([$(".carousel__slides")],et.prototype,"scrollContainer",2);a([$(".carousel__pagination")],et.prototype,"paginationContainer",2);a([D()],et.prototype,"activeSlide",2);a([D()],et.prototype,"scrolling",2);a([D()],et.prototype,"dragging",2);a([hi({passive:!0})],et.prototype,"handleScroll",1);a([_("loop",{waitUntilFirstUpdate:!0}),_("slidesPerPage",{waitUntilFirstUpdate:!0})],et.prototype,"initializeSlides",1);a([_("activeSlide")],et.prototype,"handleSlideChange",1);a([_("slidesPerMove")],et.prototype,"updateSlidesSnap",1);a([_("autoplay")],et.prototype,"handleAutoplayChange",1);et.define("sl-carousel");var lc=(e,t)=>{let i=0;return function(...o){window.clearTimeout(i),i=window.setTimeout(()=>{e.call(this,...o)},t)}},Us=(e,t,i)=>{const o=e[t];e[t]=function(...s){o.call(this,...s),i.call(this,o,...s)}};(()=>{if(typeof window>"u")return;if(!("onscrollend"in window)){const t=new Set,i=new WeakMap,o=r=>{for(const n of r.changedTouches)t.add(n.identifier)},s=r=>{for(const n of r.changedTouches)t.delete(n.identifier)};document.addEventListener("touchstart",o,!0),document.addEventListener("touchend",s,!0),document.addEventListener("touchcancel",s,!0),Us(EventTarget.prototype,"addEventListener",function(r,n){if(n!=="scrollend")return;const l=lc(()=>{t.size?l():this.dispatchEvent(new Event("scrollend"))},100);r.call(this,"scroll",l,{passive:!0}),i.set(this,l)}),Us(EventTarget.prototype,"removeEventListener",function(r,n){if(n!=="scrollend")return;const l=i.get(this);l&&r.call(this,"scroll",l,{passive:!0})})}})();var cc=k`
  :host {
    --aspect-ratio: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    aspect-ratio: var(--aspect-ratio);
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  ::slotted(img) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`,Tr=class extends A{connectedCallback(){super.connectedCallback()}render(){return p` <slot></slot> `}};Tr.styles=[P,cc];Tr.define("sl-carousel-item");var dc=k`
  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-600);
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--sl-color-primary-600);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: var(--sl-color-primary-500);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--sl-color-primary-600);
  }

  .breadcrumb-item__label:focus {
    outline: none;
  }

  .breadcrumb-item__label:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
    -webkit-user-select: none;
  }
`,pe=class extends A{constructor(){super(...arguments),this.hasSlotController=new yt(this,"prefix","suffix"),this.renderType="button",this.rel="noreferrer noopener"}setRenderType(){const e=this.defaultSlot.assignedElements({flatten:!0}).filter(t=>t.tagName.toLowerCase()==="sl-dropdown").length>0;if(this.href){this.renderType="link";return}if(e){this.renderType="dropdown";return}this.renderType="button"}hrefChanged(){this.setRenderType()}handleSlotChange(){this.setRenderType()}render(){return p`
      <div
        part="base"
        class=${L({"breadcrumb-item":!0,"breadcrumb-item--has-prefix":this.hasSlotController.test("prefix"),"breadcrumb-item--has-suffix":this.hasSlotController.test("suffix")})}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${this.renderType==="link"?p`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${S(this.target?this.target:void 0)}"
                rel=${S(this.target?this.rel:void 0)}
              >
                <slot @slotchange=${this.handleSlotChange}></slot>
              </a>
            `:""}
        ${this.renderType==="button"?p`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </button>
            `:""}
        ${this.renderType==="dropdown"?p`
              <div part="label" class="breadcrumb-item__label breadcrumb-item__label--drop-down">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>
            `:""}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `}};pe.styles=[P,dc];a([$("slot:not([name])")],pe.prototype,"defaultSlot",2);a([D()],pe.prototype,"renderType",2);a([c()],pe.prototype,"href",2);a([c()],pe.prototype,"target",2);a([c()],pe.prototype,"rel",2);a([_("href",{waitUntilFirstUpdate:!0})],pe.prototype,"hrefChanged",1);pe.define("sl-breadcrumb-item");$e.define("sl-button-group");var pc=k`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,Jt=class extends A{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.emit("sl-error")}render(){const e=p`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${this.handleImageLoadError}"
      />
    `;let t=p``;return this.initials?t=p`<div part="initials" class="avatar__initials">${this.initials}</div>`:t=p`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,p`
      <div
        part="base"
        class=${L({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?e:t}
      </div>
    `}};Jt.styles=[P,pc];Jt.dependencies={"sl-icon":K};a([D()],Jt.prototype,"hasError",2);a([c()],Jt.prototype,"image",2);a([c()],Jt.prototype,"label",2);a([c()],Jt.prototype,"initials",2);a([c()],Jt.prototype,"loading",2);a([c({reflect:!0})],Jt.prototype,"shape",2);a([_("image")],Jt.prototype,"handleImageChange",1);Jt.define("sl-avatar");var hc=k`
  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`,Ue=class extends A{constructor(){super(...arguments),this.localize=new U(this),this.separatorDir=this.localize.dir(),this.label=""}getSeparator(){const t=this.separatorSlot.assignedElements({flatten:!0})[0].cloneNode(!0);return[t,...t.querySelectorAll("[id]")].forEach(i=>i.removeAttribute("id")),t.setAttribute("data-default",""),t.slot="separator",t}handleSlotChange(){const e=[...this.defaultSlot.assignedElements({flatten:!0})].filter(t=>t.tagName.toLowerCase()==="sl-breadcrumb-item");e.forEach((t,i)=>{const o=t.querySelector('[slot="separator"]');o===null?t.append(this.getSeparator()):o.hasAttribute("data-default")&&o.replaceWith(this.getSeparator()),i===e.length-1?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")})}render(){return this.separatorDir!==this.localize.dir()&&(this.separatorDir=this.localize.dir(),this.updateComplete.then(()=>this.handleSlotChange())),p`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <sl-icon name=${this.localize.dir()==="rtl"?"chevron-left":"chevron-right"} library="system"></sl-icon>
        </slot>
      </span>
    `}};Ue.styles=[P,hc];Ue.dependencies={"sl-icon":K};a([$("slot")],Ue.prototype,"defaultSlot",2);a([$('slot[name="separator"]')],Ue.prototype,"separatorSlot",2);a([c()],Ue.prototype,"label",2);Ue.define("sl-breadcrumb");q.define("sl-button");var uc=k`
  :host {
    --control-box-size: 3rem;
    --icon-size: calc(var(--control-box-size) * 0.625);

    display: inline-flex;
    position: relative;
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  img[aria-hidden='true'] {
    display: none;
  }

  .animated-image__control-box {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(50% - var(--control-box-size) / 2);
    right: calc(50% - var(--control-box-size) / 2);
    width: var(--control-box-size);
    height: var(--control-box-size);
    font-size: var(--icon-size);
    background: none;
    border: solid 2px currentColor;
    background-color: rgb(0 0 0 /50%);
    border-radius: var(--sl-border-radius-circle);
    color: white;
    pointer-events: none;
    transition: var(--sl-transition-fast) opacity;
  }

  :host([play]:hover) .animated-image__control-box {
    opacity: 1;
  }

  :host([play]:not(:hover)) .animated-image__control-box {
    opacity: 0;
  }

  :host([play]) slot[name='play-icon'],
  :host(:not([play])) slot[name='pause-icon'] {
    display: none;
  }
`,jt=class extends A{constructor(){super(...arguments),this.isLoaded=!1}handleClick(){this.play=!this.play}handleLoad(){const e=document.createElement("canvas"),{width:t,height:i}=this.animatedImage;e.width=t,e.height=i,e.getContext("2d").drawImage(this.animatedImage,0,0,t,i),this.frozenFrame=e.toDataURL("image/gif"),this.isLoaded||(this.emit("sl-load"),this.isLoaded=!0)}handleError(){this.emit("sl-error")}handlePlayChange(){this.play&&(this.animatedImage.src="",this.animatedImage.src=this.src)}handleSrcChange(){this.isLoaded=!1}render(){return p`
      <div class="animated-image">
        <img
          class="animated-image__animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play?"false":"true"}
          @click=${this.handleClick}
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded?p`
              <img
                class="animated-image__frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play?"true":"false"}
                @click=${this.handleClick}
              />

              <div part="control-box" class="animated-image__control-box">
                <slot name="play-icon"><sl-icon name="play-fill" library="system"></sl-icon></slot>
                <slot name="pause-icon"><sl-icon name="pause-fill" library="system"></sl-icon></slot>
              </div>
            `:""}
      </div>
    `}};jt.styles=[P,uc];jt.dependencies={"sl-icon":K};a([$(".animated-image__animated")],jt.prototype,"animatedImage",2);a([D()],jt.prototype,"frozenFrame",2);a([D()],jt.prototype,"isLoaded",2);a([c()],jt.prototype,"src",2);a([c()],jt.prototype,"alt",2);a([c({type:Boolean,reflect:!0})],jt.prototype,"play",2);a([_("play",{waitUntilFirstUpdate:!0})],jt.prototype,"handlePlayChange",1);a([_("src")],jt.prototype,"handleSrcChange",1);jt.define("sl-animated-image");var fc=k`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,yi=class extends A{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return p`
      <span
        part="base"
        class=${L({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};yi.styles=[P,fc];a([c({reflect:!0})],yi.prototype,"variant",2);a([c({type:Boolean,reflect:!0})],yi.prototype,"pill",2);a([c({type:Boolean,reflect:!0})],yi.prototype,"pulse",2);yi.define("sl-badge");var gc=k`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
    overflow: hidden;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--has-countdown {
    border-bottom: none;
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    margin-inline-end: var(--sl-spacing-medium);
    align-self: center;
  }

  .alert__countdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(var(--sl-panel-border-width) * 3);
    background-color: var(--sl-panel-border-color);
    display: flex;
  }

  .alert__countdown--ltr {
    justify-content: flex-end;
  }

  .alert__countdown .alert__countdown-elapsed {
    height: 100%;
    width: 0;
  }

  .alert--primary .alert__countdown-elapsed {
    background-color: var(--sl-color-primary-600);
  }

  .alert--success .alert__countdown-elapsed {
    background-color: var(--sl-color-success-600);
  }

  .alert--neutral .alert__countdown-elapsed {
    background-color: var(--sl-color-neutral-600);
  }

  .alert--warning .alert__countdown-elapsed {
    background-color: var(--sl-color-warning-600);
  }

  .alert--danger .alert__countdown-elapsed {
    background-color: var(--sl-color-danger-600);
  }

  .alert__timer {
    display: none;
  }
`,It=class ue extends A{constructor(){super(...arguments),this.hasSlotController=new yt(this,"icon","suffix"),this.localize=new U(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0,this.remainingTime=this.duration}static get toastStack(){return this.currentToastStack||(this.currentToastStack=Object.assign(document.createElement("div"),{className:"sl-toast-stack"})),this.currentToastStack}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){this.handleCountdownChange(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration),this.remainingTime=this.duration,this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100))}pauseAutoHide(){var t;(t=this.countdownAnimation)==null||t.pause(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval)}resumeAutoHide(){var t;this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.remainingTime),this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100),(t=this.countdownAnimation)==null||t.play())}handleCountdownChange(){if(this.open&&this.duration<1/0&&this.countdown){const{countdownElement:t}=this,i="100%",o="0";this.countdownAnimation=t.animate([{width:i},{width:o}],{duration:this.duration,easing:"linear"})}}handleCloseClick(){this.hide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await rt(this.base),this.base.hidden=!1;const{keyframes:t,options:i}=Y(this,"alert.show",{dir:this.localize.dir()});await J(this.base,t,i),this.emit("sl-after-show")}else{os(this),this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),await rt(this.base);const{keyframes:t,options:i}=Y(this,"alert.hide",{dir:this.localize.dir()});await J(this.base,t,i),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,xt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,xt(this,"sl-after-hide")}async toast(){return new Promise(t=>{this.handleCountdownChange(),ue.toastStack.parentElement===null&&document.body.append(ue.toastStack),ue.toastStack.appendChild(this),requestAnimationFrame(()=>{this.clientWidth,this.show()}),this.addEventListener("sl-after-hide",()=>{ue.toastStack.removeChild(this),t(),ue.toastStack.querySelector("sl-alert")===null&&ue.toastStack.remove()},{once:!0})})}render(){return p`
      <div
        part="base"
        class=${L({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-countdown":!!this.countdown,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":this.variant==="primary","alert--success":this.variant==="success","alert--neutral":this.variant==="neutral","alert--warning":this.variant==="warning","alert--danger":this.variant==="danger"})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?p`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}

        <div role="timer" class="alert__timer">${this.remainingTime}</div>

        ${this.countdown?p`
              <div
                class=${L({alert__countdown:!0,"alert__countdown--ltr":this.countdown==="ltr"})}
              >
                <div class="alert__countdown-elapsed"></div>
              </div>
            `:""}
      </div>
    `}};It.styles=[P,gc];It.dependencies={"sl-icon-button":lt};a([$('[part~="base"]')],It.prototype,"base",2);a([$(".alert__countdown-elapsed")],It.prototype,"countdownElement",2);a([c({type:Boolean,reflect:!0})],It.prototype,"open",2);a([c({type:Boolean,reflect:!0})],It.prototype,"closable",2);a([c({reflect:!0})],It.prototype,"variant",2);a([c({type:Number})],It.prototype,"duration",2);a([c({type:String,reflect:!0})],It.prototype,"countdown",2);a([D()],It.prototype,"remainingTime",2);a([_("open",{waitUntilFirstUpdate:!0})],It.prototype,"handleOpenChange",1);a([_("duration")],It.prototype,"handleDurationChange",1);var mc=It;j("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});j("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});mc.define("sl-alert");const bc=[{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.4,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.43,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.53,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.7,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -15px, 0) scaleY(1.05)"},{offset:.8,"transition-timing-function":"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0) scaleY(0.95)"},{offset:.9,transform:"translate3d(0, -4px, 0) scaleY(1.02)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"}],vc=[{offset:0,opacity:"1"},{offset:.25,opacity:"0"},{offset:.5,opacity:"1"},{offset:.75,opacity:"0"},{offset:1,opacity:"1"}],xc=[{offset:0,transform:"translateX(0)"},{offset:.065,transform:"translateX(-6px) rotateY(-9deg)"},{offset:.185,transform:"translateX(5px) rotateY(7deg)"},{offset:.315,transform:"translateX(-3px) rotateY(-5deg)"},{offset:.435,transform:"translateX(2px) rotateY(3deg)"},{offset:.5,transform:"translateX(0)"}],yc=[{offset:0,transform:"scale(1)"},{offset:.14,transform:"scale(1.3)"},{offset:.28,transform:"scale(1)"},{offset:.42,transform:"scale(1.3)"},{offset:.7,transform:"scale(1)"}],wc=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.111,transform:"translate3d(0, 0, 0)"},{offset:.222,transform:"skewX(-12.5deg) skewY(-12.5deg)"},{offset:.33299999999999996,transform:"skewX(6.25deg) skewY(6.25deg)"},{offset:.444,transform:"skewX(-3.125deg) skewY(-3.125deg)"},{offset:.555,transform:"skewX(1.5625deg) skewY(1.5625deg)"},{offset:.6659999999999999,transform:"skewX(-0.78125deg) skewY(-0.78125deg)"},{offset:.777,transform:"skewX(0.390625deg) skewY(0.390625deg)"},{offset:.888,transform:"skewX(-0.1953125deg) skewY(-0.1953125deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],_c=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.5,transform:"scale3d(1.05, 1.05, 1.05)"},{offset:1,transform:"scale3d(1, 1, 1)"}],kc=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.3,transform:"scale3d(1.25, 0.75, 1)"},{offset:.4,transform:"scale3d(0.75, 1.25, 1)"},{offset:.5,transform:"scale3d(1.15, 0.85, 1)"},{offset:.65,transform:"scale3d(0.95, 1.05, 1)"},{offset:.75,transform:"scale3d(1.05, 0.95, 1)"},{offset:1,transform:"scale3d(1, 1, 1)"}],$c=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Cc=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],zc=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(0, -10px, 0)"},{offset:.2,transform:"translate3d(0, 10px, 0)"},{offset:.3,transform:"translate3d(0, -10px, 0)"},{offset:.4,transform:"translate3d(0, 10px, 0)"},{offset:.5,transform:"translate3d(0, -10px, 0)"},{offset:.6,transform:"translate3d(0, 10px, 0)"},{offset:.7,transform:"translate3d(0, -10px, 0)"},{offset:.8,transform:"translate3d(0, 10px, 0)"},{offset:.9,transform:"translate3d(0, -10px, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Sc=[{offset:.2,transform:"rotate3d(0, 0, 1, 15deg)"},{offset:.4,transform:"rotate3d(0, 0, 1, -10deg)"},{offset:.6,transform:"rotate3d(0, 0, 1, 5deg)"},{offset:.8,transform:"rotate3d(0, 0, 1, -5deg)"},{offset:1,transform:"rotate3d(0, 0, 1, 0deg)"}],Ac=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.1,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.2,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.3,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.4,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.5,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.6,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.7,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.8,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.9,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:1,transform:"scale3d(1, 1, 1)"}],Ec=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.15,transform:"translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)"},{offset:.3,transform:"translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)"},{offset:.45,transform:"translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)"},{offset:.6,transform:"translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)"},{offset:.75,transform:"translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Tc=[{offset:0,transform:"translateY(-1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],Ic=[{offset:0,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],Dc=[{offset:0,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],Lc=[{offset:0,transform:"translateY(1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],Pc=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(700px) scale(0.7)",opacity:"0.7"}],Oc=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"}],Rc=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"}],Mc=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(-700px) scale(0.7)",opacity:"0.7"}],Fc=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.2,transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.4,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.4,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"scale3d(1.03, 1.03, 1.03)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.8,transform:"scale3d(0.97, 0.97, 0.97)"},{offset:.8,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,opacity:"1",transform:"scale3d(1, 1, 1)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Bc=[{offset:0,opacity:"0",transform:"translate3d(0, -3000px, 0) scaleY(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, 25px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, -10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, 5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Vc=[{offset:0,opacity:"0",transform:"translate3d(-3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(-10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Hc=[{offset:0,opacity:"0",transform:"translate3d(3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(-25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(-5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Uc=[{offset:0,opacity:"0",transform:"translate3d(0, 3000px, 0) scaleY(5)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, 10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, -5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Nc=[{offset:.2,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.5,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.55,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:1,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"}],jc=[{offset:.2,transform:"translate3d(0, 10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0) scaleY(3)"}],Wc=[{offset:.2,opacity:"1",transform:"translate3d(20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0) scaleX(2)"}],qc=[{offset:.2,opacity:"1",transform:"translate3d(-20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0) scaleX(2)"}],Kc=[{offset:.2,transform:"translate3d(0, -10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0) scaleY(3)"}],Gc=[{offset:0,opacity:"0"},{offset:1,opacity:"1"}],Xc=[{offset:0,opacity:"0",transform:"translate3d(-100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Yc=[{offset:0,opacity:"0",transform:"translate3d(100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Zc=[{offset:0,opacity:"0",transform:"translate3d(0, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Qc=[{offset:0,opacity:"0",transform:"translate3d(0, -2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Jc=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],td=[{offset:0,opacity:"0",transform:"translate3d(-2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],ed=[{offset:0,opacity:"0",transform:"translate3d(100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],id=[{offset:0,opacity:"0",transform:"translate3d(2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],od=[{offset:0,opacity:"0",transform:"translate3d(-100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],sd=[{offset:0,opacity:"0",transform:"translate3d(100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],rd=[{offset:0,opacity:"0",transform:"translate3d(0, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],ad=[{offset:0,opacity:"0",transform:"translate3d(0, 2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],nd=[{offset:0,opacity:"1"},{offset:1,opacity:"0"}],ld=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, 100%, 0)"}],cd=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, 100%, 0)"}],dd=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 100%, 0)"}],pd=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0)"}],hd=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-100%, 0, 0)"}],ud=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0)"}],fd=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0)"}],gd=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0)"}],md=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, -100%, 0)"}],bd=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, -100%, 0)"}],vd=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -100%, 0)"}],xd=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0)"}],yd=[{offset:0,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",easing:"ease-out"},{offset:.4,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -190deg)`,easing:"ease-out"},{offset:.5,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -170deg)`,easing:"ease-in"},{offset:.8,transform:`perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
      rotate3d(0, 1, 0, 0deg)`,easing:"ease-in"},{offset:1,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",easing:"ease-in"}],wd=[{offset:0,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(1, 0, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(1, 0, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],_d=[{offset:0,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(0, 1, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(0, 1, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(0, 1, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],kd=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",opacity:"0"}],$d=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(0, 1, 0, -15deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",opacity:"0"}],Cd=[{offset:0,transform:"translate3d(-100%, 0, 0) skewX(30deg)",opacity:"0"},{offset:.6,transform:"skewX(-20deg)",opacity:"1"},{offset:.8,transform:"skewX(5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],zd=[{offset:0,transform:"translate3d(100%, 0, 0) skewX(-30deg)",opacity:"0"},{offset:.6,transform:"skewX(20deg)",opacity:"1"},{offset:.8,transform:"skewX(-5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Sd=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(-100%, 0, 0) skewX(-30deg)",opacity:"0"}],Ad=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(100%, 0, 0) skewX(30deg)",opacity:"0"}],Ed=[{offset:0,transform:"rotate3d(0, 0, 1, -200deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Td=[{offset:0,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Id=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Dd=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Ld=[{offset:0,transform:"rotate3d(0, 0, 1, -90deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Pd=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 200deg)",opacity:"0"}],Od=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"}],Rd=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],Md=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],Fd=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 90deg)",opacity:"0"}],Bd=[{offset:0,transform:"translate3d(0, -100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Vd=[{offset:0,transform:"translate3d(-100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Hd=[{offset:0,transform:"translate3d(100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Ud=[{offset:0,transform:"translate3d(0, 100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Nd=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, 100%, 0)"}],jd=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(-100%, 0, 0)"}],Wd=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(100%, 0, 0)"}],qd=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, -100%, 0)"}],Kd=[{offset:0,easing:"ease-in-out"},{offset:.2,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.4,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:.6,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.8,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:1,transform:"translate3d(0, 700px, 0)",opacity:"0"}],Gd=[{offset:0,opacity:"0",transform:"scale(0.1) rotate(30deg)","transform-origin":"center bottom"},{offset:.5,transform:"rotate(-10deg)"},{offset:.7,transform:"rotate(3deg)"},{offset:1,opacity:"1",transform:"scale(1)"}],Xd=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Yd=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)"}],Zd=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:.5,opacity:"1"}],Qd=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Jd=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],tp=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],ep=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],ip=[{offset:0,opacity:"1"},{offset:.5,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:1,opacity:"0"}],op=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],sp=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(-2000px, 0, 0)"}],rp=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(2000px, 0, 0)"}],ap=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Ir={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInSine:"cubic-bezier(0.47, 0, 0.745, 0.715)",easeOutSine:"cubic-bezier(0.39, 0.575, 0.565, 1)",easeInOutSine:"cubic-bezier(0.445, 0.05, 0.55, 0.95)",easeInQuad:"cubic-bezier(0.55, 0.085, 0.68, 0.53)",easeOutQuad:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",easeInOutQuad:"cubic-bezier(0.455, 0.03, 0.515, 0.955)",easeInCubic:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",easeOutCubic:"cubic-bezier(0.215, 0.61, 0.355, 1)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1)",easeInQuart:"cubic-bezier(0.895, 0.03, 0.685, 0.22)",easeOutQuart:"cubic-bezier(0.165, 0.84, 0.44, 1)",easeInOutQuart:"cubic-bezier(0.77, 0, 0.175, 1)",easeInQuint:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",easeOutQuint:"cubic-bezier(0.23, 1, 0.32, 1)",easeInOutQuint:"cubic-bezier(0.86, 0, 0.07, 1)",easeInExpo:"cubic-bezier(0.95, 0.05, 0.795, 0.035)",easeOutExpo:"cubic-bezier(0.19, 1, 0.22, 1)",easeInOutExpo:"cubic-bezier(1, 0, 0, 1)",easeInCirc:"cubic-bezier(0.6, 0.04, 0.98, 0.335)",easeOutCirc:"cubic-bezier(0.075, 0.82, 0.165, 1)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.15, 0.86)",easeInBack:"cubic-bezier(0.6, -0.28, 0.735, 0.045)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",easeInOutBack:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},np=Object.freeze(Object.defineProperty({__proto__:null,backInDown:Tc,backInLeft:Ic,backInRight:Dc,backInUp:Lc,backOutDown:Pc,backOutLeft:Oc,backOutRight:Rc,backOutUp:Mc,bounce:bc,bounceIn:Fc,bounceInDown:Bc,bounceInLeft:Vc,bounceInRight:Hc,bounceInUp:Uc,bounceOut:Nc,bounceOutDown:jc,bounceOutLeft:Wc,bounceOutRight:qc,bounceOutUp:Kc,easings:Ir,fadeIn:Gc,fadeInBottomLeft:Xc,fadeInBottomRight:Yc,fadeInDown:Zc,fadeInDownBig:Qc,fadeInLeft:Jc,fadeInLeftBig:td,fadeInRight:ed,fadeInRightBig:id,fadeInTopLeft:od,fadeInTopRight:sd,fadeInUp:rd,fadeInUpBig:ad,fadeOut:nd,fadeOutBottomLeft:ld,fadeOutBottomRight:cd,fadeOutDown:dd,fadeOutDownBig:pd,fadeOutLeft:hd,fadeOutLeftBig:ud,fadeOutRight:fd,fadeOutRightBig:gd,fadeOutTopLeft:md,fadeOutTopRight:bd,fadeOutUp:vd,fadeOutUpBig:xd,flash:vc,flip:yd,flipInX:wd,flipInY:_d,flipOutX:kd,flipOutY:$d,headShake:xc,heartBeat:yc,hinge:Kd,jackInTheBox:Gd,jello:wc,lightSpeedInLeft:Cd,lightSpeedInRight:zd,lightSpeedOutLeft:Sd,lightSpeedOutRight:Ad,pulse:_c,rollIn:Xd,rollOut:Yd,rotateIn:Ed,rotateInDownLeft:Td,rotateInDownRight:Id,rotateInUpLeft:Dd,rotateInUpRight:Ld,rotateOut:Pd,rotateOutDownLeft:Od,rotateOutDownRight:Rd,rotateOutUpLeft:Md,rotateOutUpRight:Fd,rubberBand:kc,shake:$c,shakeX:Cc,shakeY:zc,slideInDown:Bd,slideInLeft:Vd,slideInRight:Hd,slideInUp:Ud,slideOutDown:Nd,slideOutLeft:jd,slideOutRight:Wd,slideOutUp:qd,swing:Sc,tada:Ac,wobble:Ec,zoomIn:Zd,zoomInDown:Qd,zoomInLeft:Jd,zoomInRight:tp,zoomInUp:ep,zoomOut:ip,zoomOutDown:op,zoomOutLeft:sp,zoomOutRight:rp,zoomOutUp:ap},Symbol.toStringTag,{value:"Module"}));var lp=k`
  :host {
    display: contents;
  }
`,pt=class extends A{constructor(){super(...arguments),this.hasStarted=!1,this.name="none",this.play=!1,this.delay=0,this.direction="normal",this.duration=1e3,this.easing="linear",this.endDelay=0,this.fill="auto",this.iterations=1/0,this.iterationStart=0,this.playbackRate=1,this.handleAnimationFinish=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-finish")},this.handleAnimationCancel=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-cancel")}}get currentTime(){var e,t;return(t=(e=this.animation)==null?void 0:e.currentTime)!=null?t:0}set currentTime(e){this.animation&&(this.animation.currentTime=e)}connectedCallback(){super.connectedCallback(),this.createAnimation()}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){var e,t;const i=(e=Ir[this.easing])!=null?e:this.easing,o=(t=this.keyframes)!=null?t:np[this.name],r=(await this.defaultSlot).assignedElements()[0];return!r||!o?!1:(this.destroyAnimation(),this.animation=r.animate(o,{delay:this.delay,direction:this.direction,duration:this.duration,easing:i,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener("cancel",this.handleAnimationCancel),this.animation.addEventListener("finish",this.handleAnimationFinish),this.play?(this.hasStarted=!0,this.emit("sl-start")):this.animation.pause(),!0)}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener("cancel",this.handleAnimationCancel),this.animation.removeEventListener("finish",this.handleAnimationFinish),this.hasStarted=!1)}handleAnimationChange(){this.hasUpdated&&this.createAnimation()}handlePlayChange(){return this.animation?(this.play&&!this.hasStarted&&(this.hasStarted=!0,this.emit("sl-start")),this.play?this.animation.play():this.animation.pause(),!0):!1}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}cancel(){var e;(e=this.animation)==null||e.cancel()}finish(){var e;(e=this.animation)==null||e.finish()}render(){return p` <slot @slotchange=${this.handleSlotChange}></slot> `}};pt.styles=[P,lp];a([Sa("slot")],pt.prototype,"defaultSlot",2);a([c()],pt.prototype,"name",2);a([c({type:Boolean,reflect:!0})],pt.prototype,"play",2);a([c({type:Number})],pt.prototype,"delay",2);a([c()],pt.prototype,"direction",2);a([c({type:Number})],pt.prototype,"duration",2);a([c()],pt.prototype,"easing",2);a([c({attribute:"end-delay",type:Number})],pt.prototype,"endDelay",2);a([c()],pt.prototype,"fill",2);a([c({type:Number})],pt.prototype,"iterations",2);a([c({attribute:"iteration-start",type:Number})],pt.prototype,"iterationStart",2);a([c({attribute:!1})],pt.prototype,"keyframes",2);a([c({attribute:"playback-rate",type:Number})],pt.prototype,"playbackRate",2);a([_(["name","delay","direction","duration","easing","endDelay","fill","iterations","iterationsStart","keyframes"])],pt.prototype,"handleAnimationChange",1);a([_("play")],pt.prototype,"handlePlayChange",1);a([_("playbackRate")],pt.prototype,"handlePlaybackRateChange",1);pt.define("sl-animation");class _o extends G{constructor(){super(),this.currentRoute="home",this._searchResults=[],this._searchOpen=!1,this._searchLoading=!1,this._searchTimer=null,this._menuOpen=!1,this._searchExpanded=!1,this._handleDocClick=this._handleDocClick.bind(this)}_isActive(t){return t==="articles"&&(this.currentRoute==="articles"||this.currentRoute==="article-detail")||this.currentRoute===t?"active":""}firstUpdated(){this._updateIndicator()}updated(t){t.has("currentRoute")&&this._updateIndicator()}_updateIndicator(){requestAnimationFrame(()=>{var d;const t=(d=this.shadowRoot)==null?void 0:d.querySelector(".nav-tabs"),i=t==null?void 0:t.querySelector("a.active"),o=t==null?void 0:t.querySelector(".nav-tabs-indicator");if(!t||!i||!o)return;const s=t.getBoundingClientRect(),r=i.getBoundingClientRect(),n=20,l=20;o.style.left=`${r.left-s.left+n}px`,o.style.width=`${r.width-n-l}px`})}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._handleDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleDocClick)}_handleDocClick(t){t.composedPath().includes(this)||(this._searchOpen=!1,this._menuOpen=!1,this._searchExpanded=!1)}_toggleMenu(){this._menuOpen=!this._menuOpen}_openSearch(){this._searchExpanded=!0,this._searchOpen=!0,requestAnimationFrame(()=>{var i;const t=(i=this.shadowRoot)==null?void 0:i.querySelector(".search-box");t&&t.focus()})}_onSearchInput(t){const i=t.target.value.trim();if(clearTimeout(this._searchTimer),i.length<1){this._searchOpen=!1,this._searchResults=[];return}this._searchLoading=!0,this._searchOpen=!0,this._searchTimer=setTimeout(()=>this._doSearch(i),250)}async _doSearch(t){try{const i=await fetch(`/api/search?q=${encodeURIComponent(t)}`);if(!i.ok){this._searchResults=[];return}const o=await i.json();this._searchResults=o.results||[]}catch{this._searchResults=[]}finally{this._searchLoading=!1}}_onSearchFocus(t){t.target.value.trim()&&this._searchResults.length&&(this._searchOpen=!0)}_onSearchKeydown(t){t.key==="Escape"&&(this._searchOpen=!1,this._searchExpanded=!1,t.target.blur())}_getResultHref(t){return t.is_own_product&&t.custom_url?t.custom_url:t.original_url?t.original_url:t.ms_id?"/detail/"+t.ms_id:"#"}_isResultInternal(t){return!!(t.is_own_product&&t.custom_url)}_onResultClick(t,i){var s;this._searchOpen=!1;const o=this._getResultHref(i);this._isResultInternal(i)&&(t.preventDefault(),(s=window.msApp)==null||s.navigate(o))}render(){return p`
      <header>
        <nav>
          <div class="home-logo-link">
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Microsoft">
              <img class="msft-logo" src="/assets/icons/microsoft-logo-dark-1.png" alt="Microsoft" />
            </a>
            <a href="/" data-nav aria-label="Microsoft Store">
              <img class="store-logo" src="/assets/icons/microsoft-logo-dark-2.png" alt="Store" />
            </a>
          </div>

          <div class="header-actions">
          <button type="button" class="menu-toggle" aria-label="打开菜单" @click=${this._toggleMenu} aria-expanded=${this._menuOpen}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>

          <div class="search-area ${this._searchExpanded?"expanded":""}">
            <button type="button" class="search-trigger" aria-label="搜索" @click=${this._openSearch}>
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 3a5.5 5.5 0 014.383 8.823l4.147 4.147a.75.75 0 01-1.06 1.06l-4.147-4.147A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z" fill="currentColor"/>
              </svg>
            </button>
            <div class="search-inline ${this._searchExpanded?"expanded":""}">
              <svg class="search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 3a5.5 5.5 0 014.383 8.823l4.147 4.147a.75.75 0 01-1.06 1.06l-4.147-4.147A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z" fill="currentColor"/>
              </svg>
              <input type="text" class="search-box" placeholder="搜索应用、游戏等"
                @input=${this._onSearchInput}
                @focus=${this._onSearchFocus}
                @keydown=${this._onSearchKeydown}
              />
              ${this._searchOpen?p`
                <div class="search-dropdown">
                  ${this._searchLoading?p`
                    <div class="sr-loading"><span class="sr-loading-spinner"></span>搜索中...</div>
                  `:this._searchResults.length===0?p`
                    <div class="sr-empty">未找到相关结果</div>
                  `:this._searchResults.map(t=>{const i=this._getResultHref(t),o=this._isResultInternal(t),s=t.local_icon||t.icon_url||"";return p`
                      <a class="search-result-item"
                        href=${i}
                        rel=${o?"":"nofollow noopener"}
                        target=${o?"":"_blank"}
                        @click=${r=>this._onResultClick(r,t)}
                      >
                        <img class="sr-icon" src=${s} alt="" loading="lazy" />
                        <div class="sr-info">
                          <div class="sr-title">${t.title}</div>
                          <div class="sr-meta">${t.category||t.product_type}${t.rating>0?` · ${t.rating}`:""}</div>
                        </div>
                        <span class="sr-price">${t.price||"免费"}</span>
                      </a>
                    `})}
                </div>
              `:""}
            </div>
          </div>

          <div class="right-elements">
            <a href="https://apps.microsoft.com/apppack" target="_blank" class="multi-app-btn" rel="nofollow noopener">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 1h6v6H1V1zm1 1v4h4V2H2zm7-1h6v6H9V1zm1 1v4h4V2h-4zM1 9h6v6H1V9zm1 1v4h4v-4H2zm7-1h6v6H9V9zm1 1v4h4v-4h-4z"/>
              </svg>
              <span class="label">多应用安装</span>
            </a>
            <a href="https://login.live.com/" target="_blank" class="sign-in-btn" rel="nofollow noopener">
              <span class="sign-text">登录</span>
            </a>
            <a href="https://login.live.com/" target="_blank" class="user-btn" title="登录" aria-label="登录" rel="nofollow noopener">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a4 4 0 110 8 4 4 0 010-8zm0 1.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.25 16.5a5.75 5.75 0 0111.5 0 .75.75 0 01-1.5 0 4.25 4.25 0 00-8.5 0 .75.75 0 01-1.5 0z"/>
              </svg>
            </a>
          </div>
          </div>

          <div class="nav-tabs ${this._menuOpen?"open":""}">
            <a href="/" data-nav class=${this._isActive("home")} @click=${()=>{this._menuOpen=!1}}>主页</a>
            <a href="/apps" data-nav class=${this._isActive("apps")} @click=${()=>{this._menuOpen=!1}}>应用</a>
            <a href="/games" data-nav class=${this._isActive("games")} @click=${()=>{this._menuOpen=!1}}>游戏</a>
            <a href="/articles" data-nav class=${this._isActive("articles")} @click=${()=>{this._menuOpen=!1}}>资讯</a>
            <a href="/about" data-nav class=${this._isActive("about")} @click=${()=>{this._menuOpen=!1}}>关于</a>
            <div class="nav-tabs-indicator"></div>
          </div>
        </nav>
      </header>
    `}}R(_o,"properties",{currentRoute:{type:String},_searchResults:{state:!0},_searchOpen:{state:!0},_searchLoading:{state:!0},_menuOpen:{type:Boolean,state:!0},_searchExpanded:{type:Boolean,state:!0}}),R(_o,"styles",k`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      background-color: var(--theme-header-background-color, #fff);
      overflow-x: hidden;
      overflow-y: visible;
    }
    header {
      background-color: var(--theme-header-background-color, #fff);
      width: 100%;
      max-width: 100%;
      border-bottom: 1px solid rgba(0,0,0,0.06);
      overflow-x: hidden;
      overflow-y: visible;
    }
    header.sticky {
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    nav {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 0 auto;
      padding: 0 38px;
      box-sizing: border-box;
      min-width: 0;
      overflow-x: hidden;
    }
    .home-logo-link { order: 1; }
    .nav-tabs { order: 2; }
    .search-area { order: 3; }
    .right-elements { order: 4; }
    @media (max-width: 900px) {
      nav { padding: 0 24px; }
      .nav-tabs { order: 3; }
      .search-area { order: 2; }
    }
    @media (max-width: 600px) {
      nav { padding: 0 0 0 16px; max-width: 100%; }
    }

    .home-logo-link {
      display: flex;
      padding: 16px 0;
      flex-shrink: 0;
      align-items: center;
    }
    .home-logo-link a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
    }
    .msft-logo {
      width: 120px;
      height: 36px;
      display: block;
    }
    .store-logo {
      width: 54px;
      height: 36px;
      display: block;
    }

    .nav-tabs {
      display: flex;
      align-items: center;
      align-self: center;
      position: relative;
      gap: 0;
    }
    .nav-tabs-indicator {
      position: absolute;
      bottom: -8px;
      height: 2px;
      background: var(--theme-primary-element-color, #005FB8);
      border-radius: 1px;
      transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }
    .nav-tabs a {
      position: relative;
      padding: 4px 20px;
      font-size: var(--sl-font-size-small, 0.875rem);
      font-weight: 600;
      color: var(--ms-text-secondary, #616161);
      cursor: pointer;
      white-space: nowrap;
      transition: color 0.15s;
      line-height: 1.5;
      text-decoration: none;
      font-family: var(--header-font);
    }
    .nav-tabs a:hover {
      color: var(--theme-primary-element-color, #005FB8);
    }
    .nav-tabs a.active {
      color: hsl(210 100% 22%);
    }

    .search-area {
      flex: 1;
      display: flex;
      align-self: center;
      justify-content: center;
      min-width: 0;
      width: 600px;
      max-width: 100%;
      margin: 0 28px;
      position: relative;
    }
    .search-inline {
      display: flex;
      position: relative;
      flex: 1;
      min-width: 0;
      width: 100%;
    }
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      color: #616161;
      pointer-events: none;
    }
    .search-box {
      width: 100%;
      background: #f5f5f5;
      border: 1px solid #d1d1d1;
      border-radius: 4px;
      padding: 6px 14px 6px 36px;
      color: var(--theme-font-color, #131316);
      font-size: 14px;
      font-family: var(--header-font);
      outline: none;
      transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
      line-height: 1.4;
    }
    .search-box:focus {
      border-color: var(--theme-primary-element-color, #005FB8);
      background: #fff;
      box-shadow: 0 0 0 1px var(--theme-primary-element-color, #005FB8);
    }
    .search-box::placeholder {
      color: #868686;
      font-size: 14px;
    }

    .search-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0,0,0,.12);
      z-index: 100;
      max-height: 420px;
      overflow-y: auto;
    }
    .search-result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      text-decoration: none;
      color: inherit;
      transition: background .12s;
      cursor: pointer;
    }
    .search-result-item:hover { background: #f5f5f5; }
    .search-result-item:first-child { border-radius: 8px 8px 0 0; }
    .search-result-item:last-child { border-radius: 0 0 8px 8px; }
    .sr-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
      background: #f5f5f5;
    }
    .sr-info { flex: 1; min-width: 0; }
    .sr-title {
      font-size: 13px;
      font-weight: 500;
      color: #131316;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }
    .sr-meta {
      font-size: 11.5px;
      color: #767676;
      line-height: 1.3;
      margin-top: 1px;
    }
    .sr-price {
      font-size: 12px;
      color: #0067b8;
      font-weight: 500;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .sr-empty, .sr-loading {
      padding: 20px 16px;
      text-align: center;
      color: #767676;
      font-size: 13px;
    }
    .sr-loading-spinner {
      display: inline-block;
      width: 16px; height: 16px;
      border: 2px solid #e5e5e5;
      border-top-color: #0067b8;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      margin-right: 6px;
      vertical-align: middle;
    }

    .right-elements {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      min-width: 0;
      margin-left: auto;
    }
    .header-actions {
      display: contents;
    }
    .menu-toggle {
      display: none;
      width: 40px;
      height: 40px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      color: #424242;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .menu-toggle:hover { background: #f0f0f0; color: #1a1a1a; }
    .menu-toggle:focus-visible { outline: 2px solid var(--theme-primary-element-color, #005FB8); outline-offset: 2px; }
    .menu-toggle svg { width: 22px; height: 22px; }

    .search-trigger {
      display: none;
      width: 40px;
      height: 40px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      color: #424242;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .search-trigger:hover { background: #f0f0f0; color: #1a1a1a; }
    .search-trigger:focus-visible { outline: 2px solid var(--theme-primary-element-color, #005FB8); outline-offset: 2px; }
    .search-trigger svg { width: 20px; height: 20px; }
    .multi-app-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0 14px;
      height: 32px;
      border-radius: 24px;
      background-color: rgb(228, 241, 255);
      color: var(--theme-primary-element-color, #005FB8);
      font-size: 12px;
      font-weight: 400;
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      transition: border 0.2s ease-out;
      font-family: var(--header-font);
    }
    .multi-app-btn:hover {
      border: 1px solid rgb(0, 95, 184);
    }
    .multi-app-btn svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
    .sign-in-btn {
      display: inline-flex;
      align-items: center;
      font-size: 13px;
      color: var(--ms-text-secondary, #616161);
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px 8px;
      border-radius: 4px;
      white-space: nowrap;
      text-decoration: none;
      transition: color 0.15s;
      font-family: var(--header-font);
    }
    .sign-in-btn:hover {
      color: var(--theme-font-color);
    }
    .user-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: none;
      border: none;
      cursor: pointer;
      transition: background 0.12s;
      padding: 0;
    }
    .user-btn:hover {
      background: #f5f5f5;
    }
    .user-btn svg {
      width: 20px;
      height: 20px;
      color: #424242;
    }

    @media (max-width: 1200px) {
      .multi-app-btn .label { display: none; }
      .multi-app-btn {
        width: 44px;
        min-width: 44px;
        height: 44px;
        border-radius: 50%;
        padding: 0;
        justify-content: center;
        aspect-ratio: 1/1;
      }
      .search-area { max-width: 400px; margin: 0 16px; }
    }
    @media (max-width: 900px) {
      nav { flex-wrap: wrap; min-height: 96px; }
      .nav-tabs { order: 3; width: 100%; justify-content: center; padding-bottom: 8px; }
      .search-area { order: 2; flex: 0 1 auto; width: 100%; max-width: 360px; }
    }
    @media (max-width: 600px) {
      nav {
        flex-wrap: wrap;
        align-content: flex-start;
        gap: 0;
        padding: 0 8px 0 16px;
        max-width: 100%;
        min-height: 0;
        align-items: center;
      }
      :host header { position: relative; }
      .home-logo-link {
        padding: 12px 4px 12px 0;
        min-height: 44px;
        order: 1;
        flex-shrink: 1;
        min-width: 0;
        align-items: center;
      }
      .header-actions {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 2px;
        order: 2;
        margin-left: auto;
        min-width: 0;
        flex-shrink: 0;
        padding-right: 0;
      }
      .menu-toggle { display: flex; flex-shrink: 0; }
      .search-area {
        margin: 0;
        flex: 0 0 auto;
        width: auto;
        max-width: none;
      }
      .right-elements { margin-left: 0; gap: 2px; margin-right: 0; padding-right: 0; flex-shrink: 0; }
      .search-area.expanded {
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        margin: 0;
        padding: 10px 16px 12px;
        background: #fff;
        border-bottom: 1px solid rgba(0,0,0,0.06);
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        z-index: 99;
        width: 100%;
        box-sizing: border-box;
      }
      .search-area.expanded .search-inline.expanded { display: flex; }
      .search-trigger { display: flex; }
      .search-area .search-inline { display: none; }
      .search-area .search-inline.expanded {
        display: flex;
        width: 100%;
        padding: 0;
        box-sizing: border-box;
      }
      .search-area.expanded .search-trigger { display: none; }
      .multi-app-btn, .sign-in-btn, .user-btn {
        width: 36px;
        min-width: 36px;
        height: 36px;
        padding: 0;
        justify-content: center;
        transition: background-color 0.2s ease, color 0.2s ease;
      }
      .multi-app-btn {
        background: none;
        color: #424242;
      }
      .multi-app-btn:hover {
        background: #f0f0f0;
        color: #1a1a1a;
        border-color: transparent;
      }
      .sign-in-btn .sign-text { display: none; }
      .sign-in-btn:hover, .user-btn:hover { color: #1a1a1a; }
      .sign-in-btn, .user-btn { min-width: 36px; min-height: 36px; }
      .user-btn svg { width: 18px; height: 18px; }
      .menu-toggle, .search-trigger {
        width: 36px;
        min-width: 36px;
        height: 36px;
      }
      .menu-toggle svg { width: 20px; height: 20px; }
      .search-trigger svg { width: 18px; height: 18px; }
      .nav-tabs {
        order: 5;
        width: 100%;
        min-width: 0;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0;
        padding: 8px 0 0;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: max-height 0.25s ease, opacity 0.2s ease;
      }
      .nav-tabs.open {
        max-height: 280px;
        opacity: 1;
      }
      .nav-tabs a {
        padding: 10px 12px;
        font-size: var(--sl-font-size-x-small, 0.75rem);
        min-height: 44px;
        display: inline-flex;
        align-items: center;
        width: 100%;
        justify-content: center;
        box-sizing: border-box;
      }
      .nav-tabs-indicator { display: none; }
      .msft-logo { width: 84px; height: 26px; }
      .store-logo { width: 38px; height: 26px; }
      .search-inline .search-box { min-width: 0; width: 100%; box-sizing: border-box; }
      .sign-in-btn .sign-text { display: none; }
      .sign-in-btn, .user-btn { min-width: 40px; min-height: 40px; }
      .user-btn svg { width: 20px; height: 20px; }
    }
  `);customElements.define("ms-header",_o);class ko extends G{constructor(){super(),this._expanded=new Set}_toggle(t){const i=new Set(this._expanded);i.has(t)?i.delete(t):i.add(t),this._expanded=i}_renderCol(t,i,o){const s=this._expanded.has(t);return p`
      <div class="footer-col">
        <div class="footer-col-header" @click=${()=>this._toggle(t)}>
          <h3>${i}</h3>
          <button class="footer-col-toggle ${s?"open":""}" aria-label="${s?"收起":"展开"} ${i}" tabindex="-1">
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="footer-col-links ${s?"open":""}">
          ${o}
        </div>
      </div>
    `}render(){return p`
      <footer>
        <div class="footer-content">
          <div class="footer-columns">
            ${this._renderCol(0,"新增功能",p`
              <a href="https://blogs.windows.com/windowsexperience/2022/09/20/more-content-and-new-developer-opportunities-in-the-microsoft-store/" target="_blank" rel="nofollow noopener">Microsoft Store 中的更多内容</a>
              <a href="/apps" data-nav>应用</a>
              <a href="/games" data-nav>游戏</a>
              <a href="https://apps.microsoft.com/apppack" target="_blank" rel="nofollow noopener">多应用安装</a>
              <a href="https://blogs.windows.com/" target="_blank" rel="nofollow noopener">Windows 体验博客</a>
            `)}
            ${this._renderCol(1,"Microsoft Store",p`
              <a href="https://account.microsoft.com/" target="_blank" rel="nofollow noopener">Microsoft 帐户</a>
              <a href="https://go.microsoft.com/fwlink/?linkid=2139749" target="_blank" rel="nofollow noopener">Microsoft Store 支持</a>
              <a href="https://go.microsoft.com/fwlink/p/?LinkID=824764&clcid=0x409" target="_blank" rel="nofollow noopener">返回</a>
              <a href="https://www.microsoft.com/store/b/payment-financing-options?icid=footer_financing_vcc" target="_blank" rel="nofollow noopener">灵活的付款方式</a>
              <a href="https://learn.microsoft.com/windows/apps/publish/store-policies-and-code-of-conduct" target="_blank" rel="nofollow noopener">策略和行为准则</a>
              <a href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank" rel="nofollow noopener">获取 Microsoft Store 应用</a>
            `)}
            ${this._renderCol(2,"适用于开发人员",p`
              <a href="https://developer.microsoft.com/microsoft-store" target="_blank" rel="nofollow noopener">发布应用</a>
              <a href="https://apps.microsoft.com/store/app-badge/" target="_blank" rel="nofollow noopener">生成应用徽章</a>
              <a href="https://www.pwabuilder.com/" target="_blank" rel="nofollow noopener">PWABuilder</a>
            `)}
            ${this._renderCol(3,"Windows",p`
              <a href="https://careers.microsoft.com/" target="_blank" rel="nofollow noopener">职业</a>
              <a href="https://www.microsoft.com/about" target="_blank" rel="nofollow noopener">关于 Microsoft</a>
              <a href="https://news.microsoft.com/" target="_blank" rel="nofollow noopener">公司新闻</a>
              <a href="https://www.microsoft.com/investor/default.aspx" target="_blank" rel="nofollow noopener">投资者</a>
              <a href="https://www.microsoft.com/diversity/" target="_blank" rel="nofollow noopener">多样性和包容性</a>
              <a href="https://www.microsoft.com/accessibility" target="_blank" rel="nofollow noopener">辅助功能</a>
              <a href="https://www.microsoft.com/sustainability/" target="_blank" rel="nofollow noopener">可持续性</a>
            `)}
          </div>
          <div class="footer-bottom">
            <button class="locale-btn">中文（中国）</button>
            <a href="https://aka.ms/yourcaliforniaprivacychoices" target="_blank" rel="nofollow noopener">你的隐私选择</a>
            <a href="https://support.microsoft.com/contactus" target="_blank" rel="nofollow noopener">联系 Microsoft</a>
            <a href="/sitemap.xml">网站地图</a>
            <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="nofollow noopener">隐私</a>
            <a href="https://www.microsoft.com/legal/terms-of-use" target="_blank" rel="nofollow noopener">使用条款</a>
            <a href="https://www.microsoft.com/legal/intellectualproperty/trademarks" target="_blank" rel="nofollow noopener">商标</a>
            <a href="https://www.microsoft.com/legal/compliance/devices-safety-and-eco" target="_blank" rel="nofollow noopener">安全与生态</a>
            <a href="https://www.microsoft.com/legal/compliance/recycling" target="_blank" rel="nofollow noopener">回收</a>
            <a href="https://choice.microsoft.com/" target="_blank" rel="nofollow noopener">关于我们的广告</a>
            <span>&copy; Microsoft 2024</span>
          </div>
        </div>
      </footer>
    `}}R(ko,"properties",{_expanded:{state:!0}}),R(ko,"styles",k`
    :host {
      display: block;
      width: 100%;
      min-width: 0;
      background: #f2f2f2;
      margin-top: 48px;
    }
    .footer-content {
      width: 100%;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 0 auto;
      padding: 36px 38px 16px;
      box-sizing: border-box;
      min-width: 0;
    }
    .footer-columns {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      margin-bottom: 32px;
    }
    .footer-col-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 12px;
    }
    .footer-col h3 {
      font-size: 13px;
      font-weight: 600;
      margin: 0;
      color: #1a1a1a;
    }
    .footer-col-toggle {
      display: none;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      color: #616161;
      line-height: 1;
      width: 20px;
      height: 20px;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .footer-col-toggle svg {
      width: 14px;
      height: 14px;
      transition: transform 0.2s ease;
    }
    .footer-col-toggle.open svg {
      transform: rotate(180deg);
    }
    .footer-col-links {
      display: flex;
      flex-direction: column;
    }
    .footer-col a {
      display: block;
      font-size: 12px;
      color: #616161;
      padding: 3px 0;
      text-decoration: none;
    }
    .footer-col a:hover {
      color: #1a1a1a;
      text-decoration: underline;
    }
    .footer-bottom {
      border-top: 1px solid #d6d6d6;
      padding-top: 12px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
    }
    .footer-bottom a, .footer-bottom span {
      font-size: 11px;
      color: #616161;
      text-decoration: none;
    }
    .footer-bottom a:hover {
      color: #1a1a1a;
      text-decoration: underline;
    }
    .locale-btn {
      background: none;
      border: 1px solid #b3b3b3;
      color: #616161;
      padding: 3px 10px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 11px;
      transition: border-color 0.12s;
    }
    .locale-btn:hover {
      border-color: #767676;
      color: #1a1a1a;
    }

    @media (max-width: 900px) {
      .footer-content { padding: 28px 24px 16px; }
      .footer-columns { grid-template-columns: repeat(2, 1fr); gap: 24px; }
    }

    @media (max-width: 600px) {
      :host { margin-top: 32px; }
      .footer-content { padding: 0 0 12px; }
      .footer-columns {
        grid-template-columns: 1fr;
        gap: 0;
        margin-bottom: 0;
        border-top: 1px solid #d6d6d6;
      }
      .footer-col {
        border-bottom: 1px solid #d6d6d6;
      }
      .footer-col-header {
        margin: 0;
        padding: 14px 16px;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .footer-col h3 {
        font-size: 13px;
        color: #1a1a1a;
      }
      .footer-col-toggle {
        display: flex;
      }
      .footer-col-links {
        overflow: hidden;
        max-height: 0;
        transition: max-height 0.25s ease, padding 0.25s ease;
        padding: 0 16px;
      }
      .footer-col-links.open {
        max-height: 400px;
        padding: 0 16px 12px;
      }
      .footer-col a {
        font-size: 13px;
        padding: 0;
        min-height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ebebeb;
        color: #444;
      }
      .footer-col a:last-child { border-bottom: none; }
      .footer-bottom {
        flex-wrap: wrap;
        gap: 0;
        padding: 16px 16px 12px;
        row-gap: 0;
      }
      .footer-bottom a, .footer-bottom span {
        font-size: 12px;
        min-height: 36px;
        display: flex;
        align-items: center;
        padding-right: 12px;
      }
      .locale-btn {
        min-height: 36px;
        padding: 6px 14px;
        font-size: 12px;
        margin-bottom: 8px;
        width: 100%;
        text-align: left;
      }
    }

    @media (max-width: 420px) {
      .footer-bottom { padding: 12px 12px 10px; }
    }
  `);customElements.define("ms-footer",ko);const Ns=new Map;async function ci(e,t=5*60*1e3){const i=Ns.get(e);if(i&&Date.now()-i.ts<t)return i.data;const s=await(await fetch(e)).json();return Ns.set(e,{data:s,ts:Date.now()}),s}function js(e,t){let i=document.querySelector(`meta[name="${e}"]`);t?(i||(i=document.createElement("meta"),i.setAttribute("name",e),document.head.appendChild(i)),i.setAttribute("content",t)):i&&i.remove()}function ze({title:e,keywords:t,description:i}){e&&(document.title=e),js("keywords",t||""),js("description",i||"")}class $o extends G{constructor(){super(),this.src="",this.alt="",this.width="",this.height="",this.radius="0",this.objectFit="cover",this.eager=!1,this._loaded=!1,this._inView=!1,this._error=!1,this._observer=null}_checkInView(){var o;const t=this.getBoundingClientRect(),i=300;t.top<window.innerHeight+i&&t.bottom>-i&&(this._inView=!0,(o=this._observer)==null||o.disconnect(),this._observer=null)}connectedCallback(){if(super.connectedCallback(),this.eager){this._inView=!0;return}requestAnimationFrame(()=>{this._inView||this._checkInView()}),this._observer=new IntersectionObserver(t=>{var i;t[0].isIntersecting&&(this._inView=!0,(i=this._observer)==null||i.disconnect())},{rootMargin:"200px",threshold:.01}),this._observer.observe(this)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._observer)==null||t.disconnect()}_onLoad(){this._loaded=!0}_onError(){this._error=!0,this._loaded=!0}updated(t){t.has("src")&&(this._loaded=!1,this._error=!1)}render(){const t=`
      width: ${this.width||"100%"};
      height: ${this.height||"100%"};
      border-radius: ${this.radius};
    `,i=`
      object-fit: ${this.objectFit};
      border-radius: ${this.radius};
    `;return this.style.cssText=t,p`
      <div class="skeleton ${this._loaded?"hidden":""}" style="border-radius: ${this.radius}"></div>
      ${this._inView&&this.src?p`
        <img
          src=${this.src}
          alt=${this.alt}
          class=${this._loaded?"visible":""}
          style=${i}
          @load=${this._onLoad}
          @error=${this._onError}
        />
      `:""}
    `}}R($o,"properties",{src:{type:String},alt:{type:String},width:{type:String},height:{type:String},radius:{type:String},objectFit:{type:String,attribute:"object-fit"},eager:{type:Boolean},_loaded:{type:Boolean,state:!0},_inView:{type:Boolean,state:!0},_error:{type:Boolean,state:!0}}),R($o,"styles",k`
    :host {
      display: inline-block;
      position: relative;
      overflow: hidden;
      line-height: 0;
    }
    .skeleton {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
      z-index: 1;
      transition: opacity 0.3s ease;
    }
    .skeleton.hidden {
      opacity: 0;
      pointer-events: none;
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.35s ease;
    }
    img.visible {
      opacity: 1;
    }
  `);customElements.define("ms-lazy-img",$o);const Ws=[{title:"Microsoft 365",subtitle:"管理每日工作的應用程式",button_text:"获取",badge_text:"",gradient:"linear-gradient(135deg, #1a1a4e 0%, #2d2d8a 40%, #4a4ac7 100%)",link_url:"/detail/microsoft-365"},{title:"Xbox Game Pass",subtitle:"新作上市當天即可暢玩",button_text:"获取",badge_text:"Game Pass",gradient:"linear-gradient(135deg, #0b3d0b 0%, #1a5c1a 40%, #2d7a2d 100%)",link_url:"/detail/xbox-game-pass"},{title:"Minecraft: Java & Bedrock Edition",subtitle:"立即遊戲",button_text:"获取",badge_text:"Game Pass Premium",gradient:"linear-gradient(135deg, #3d2b1f 0%, #6b4423 40%, #8b6914 100%)",link_url:"/detail/minecraft"},{title:"精选应用合集",subtitle:"发现最受欢迎的应用和游戏",button_text:"全部显示",badge_text:"",gradient:"linear-gradient(135deg, #1b2838 0%, #2a475e 40%, #3d6b8e 100%)",link_url:"/apps"},{title:"Copilot",subtitle:"你的日常 AI 助手",button_text:"获取",badge_text:"免费",gradient:"linear-gradient(135deg, #2b1055 0%, #4a2c82 40%, #7b5ea7 100%)",link_url:"/detail/copilot"}],qs=[{title:"Overwatch® 2",subtitle:"立即透過 Xbox Game Pass 購買或玩遊戲",badge_text:"Game Pass",gradient:"linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",link_url:"#"},{title:"社交網路應用程式",subtitle:"聯繫和學習",gradient:"linear-gradient(135deg, #2d3436, #636e72)",link_url:"/apps"}];class Co extends G{constructor(){super(),this.banners=Ws,this.sideCards=qs,this._activeIndex=0,this._autoplayTimer=null,this._pauseTimeout=null}connectedCallback(){super.connectedCallback(),this._startAutoplay()}disconnectedCallback(){super.disconnectedCallback(),this._stopAutoplay(),clearTimeout(this._pauseTimeout)}get _slides(){var t;return(t=this.banners)!=null&&t.length?this.banners:Ws}get _cards(){var t;return(t=this.sideCards)!=null&&t.length?this.sideCards:qs}_startAutoplay(){this._stopAutoplay(),this._autoplayTimer=setInterval(()=>this._next(),6e3)}_stopAutoplay(){this._autoplayTimer&&(clearInterval(this._autoplayTimer),this._autoplayTimer=null)}_restartAutoplayDelayed(){this._stopAutoplay(),clearTimeout(this._pauseTimeout),this._pauseTimeout=setTimeout(()=>this._startAutoplay(),1e4)}_next(){this._activeIndex=(this._activeIndex+1)%this._slides.length}_prev(){this._activeIndex=(this._activeIndex-1+this._slides.length)%this._slides.length}_goTo(t){t!==this._activeIndex&&(this._activeIndex=t,this._restartAutoplayDelayed())}_onArrowClick(t){t==="next"?this._next():this._prev(),this._restartAutoplayDelayed()}_onBannerClick(t){t.link_url&&this.dispatchEvent(new CustomEvent("banner-click",{detail:t,bubbles:!0,composed:!0}))}_renderSlide(t,i){const o=i===this._activeIndex,s=t.image_url||t.local_image,r=t.local_image||t.image_url;return p`
      <div class="slide ${o?"active":""}" @click=${()=>this._onBannerClick(t)}>
        <div class="slide-bg">
          ${s?p`<ms-lazy-img eager src=${r} alt="" width="100%" height="100%" radius="0"></ms-lazy-img>`:p`<div class="gradient-fill" style="background: ${t.gradient||"linear-gradient(135deg, #1b2838, #2a475e)"}"></div>`}
        </div>
        <div class="slide-content">
          ${t.badge_text?p`<span class="badge">${t.badge_text}</span>`:""}
          <h2 class="title">${t.title}</h2>
          <p class="subtitle">${t.subtitle}</p>
          <button class="cta-btn" @click=${n=>{n.stopPropagation(),this._onBannerClick(t)}}>
            ${t.button_text||"获取"}
          </button>
        </div>
      </div>
    `}_renderSideCard(t){var s,r,n;if(t.type==="split"&&t.left&&t.right)return this._renderSplitCard(t.left,t.right);const i=t.image_url||t.local_image,o=t.local_image||t.image_url;return p`
      <a class="side-card" href=${t.link_url||"#"} ?data-nav=${(s=t.link_url)==null?void 0:s.startsWith("/")}
        rel=${(r=t.link_url)!=null&&r.startsWith("/")?"":"nofollow noopener"} ?target=${(n=t.link_url)!=null&&n.startsWith("/")?"":"_blank"}>
        <div class="side-card-bg">
          ${i?p`<ms-lazy-img eager src=${o} alt="" width="100%" height="100%" radius="0"></ms-lazy-img>`:p`<div class="gradient-fill" style="background: ${t.gradient||"linear-gradient(135deg, #2d3436, #636e72)"}"></div>`}
        </div>
        <div class="side-card-overlay"></div>
        <div class="side-card-content">
          ${t.badge_text?p`<span class="side-card-badge">${t.badge_text}</span>`:""}
          <div class="side-card-title">${t.title}</div>
          ${t.subtitle?p`<div class="side-card-subtitle">${t.subtitle}</div>`:""}
        </div>
      </a>
    `}_renderSplitCard(t,i){const o=s=>{const r=s.image_url||s.local_image,n=s.local_image||s.image_url,l=s.link_url||"#";return p`
        <a class="side-card-half" href=${l} ?data-nav=${l.startsWith("/")}
          rel=${l.startsWith("/")?"":"nofollow noopener"} ?target=${l.startsWith("/")?"":"_blank"}>
          <div class="side-card-bg">
            ${r?p`<ms-lazy-img eager src=${n} alt="" width="100%" height="100%" radius="0"></ms-lazy-img>`:p`<div class="gradient-fill" style="background: ${s.gradient||"linear-gradient(135deg, #2d3436, #636e72)"}"></div>`}
          </div>
          <div class="side-card-overlay"></div>
          <div class="side-card-content">
            ${s.badge_text?p`<span class="side-card-badge">${s.badge_text}</span>`:""}
            <div class="side-card-title">${s.title}</div>
            ${s.subtitle?p`<div class="side-card-subtitle">${s.subtitle}</div>`:""}
          </div>
        </a>
      `};return p`
      <div class="side-card side-card-split">
        ${o(t)}
        ${o(i)}
      </div>
    `}render(){const t=this._slides,i=this._cards;return p`
      <div class="hero-layout">
        <div class="carousel-wrapper">
          <div class="carousel"
            @mouseenter=${()=>this._stopAutoplay()}
            @mouseleave=${()=>this._startAutoplay()}>
            <div class="slides">
              ${t.map((o,s)=>this._renderSlide(o,s))}
            </div>
            <button class="arrow left" @click=${()=>this._onArrowClick("prev")} aria-label="上一张">
              <svg viewBox="0 0 16 16"><polyline points="10 3 5 8 10 13"/></svg>
            </button>
            <button class="arrow right" @click=${()=>this._onArrowClick("next")} aria-label="下一张">
              <svg viewBox="0 0 16 16"><polyline points="6 3 11 8 6 13"/></svg>
            </button>
          </div>
        </div>
        <div class="side-cards">
          ${i.map(o=>this._renderSideCard(o))}
        </div>
        <div class="dots-row">
          <div class="dots">
            ${t.map((o,s)=>p`
              <button class="dot ${s===this._activeIndex?"active":""}" @click=${()=>this._goTo(s)} aria-label="第 ${s+1} 张"></button>
            `)}
          </div>
        </div>
      </div>
    `}}R(Co,"properties",{banners:{type:Array},sideCards:{type:Array},_activeIndex:{type:Number,state:!0}}),R(Co,"styles",k`
    :host {
      display: block;
      padding: 12px 0 0;
      user-select: none;
    }
    .hero-layout {
      display: grid;
      grid-template-columns: 60fr 40fr;
      grid-template-rows: 340px auto;
      gap: 12px 12px;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 0 auto;
      padding: 0 38px;
      box-sizing: border-box;
    }
    .carousel-wrapper {
      grid-column: 1;
      grid-row: 1;
      min-height: 0;
    }
    .hero-layout .side-cards {
      grid-column: 2;
      grid-row: 1;
      height: 340px;
    }
    .hero-layout .dots-row {
      grid-column: 1;
      grid-row: 2;
    }

    /* Main carousel */
    .carousel {
      position: relative;
      width: 100%;
      height: 340px;
      border-radius: 8px;
      overflow: hidden;
    }
    .slides {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .slide {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-end;
      padding: 0 48px 44px;
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
      z-index: 0;
    }
    .slide.active {
      opacity: 1;
      pointer-events: auto;
      z-index: 1;
    }
    .slide-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    .slide-bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .slide-bg .gradient-fill {
      width: 100%;
      height: 100%;
    }
    .slide-content {
      position: relative;
      z-index: 1;
      max-width: 420px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      color: #fff;
      background: #107c10;
      padding: 2px 8px;
      border-radius: 3px;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      margin-bottom: 4px;
      width: fit-content;
    }
    .title {
      font-size: 26px;
      font-weight: 700;
      color: #fff;
      line-height: 1.2;
      margin: 0;
      text-shadow: 0 1px 3px rgba(0,0,0,0.25);
    }
    .subtitle {
      font-size: 13px;
      color: rgba(255,255,255,0.88);
      line-height: 1.4;
      margin: 2px 0 10px;
    }
    .cta-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      padding: 6px 20px;
      border-radius: 4px;
      border: none;
      background: rgba(255,255,255,0.92);
      color: #131316;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
    }
    .cta-btn:hover { background: #fff; }

    /* Arrows */
    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: rgba(0,0,0,0.4);
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s, background 0.15s;
      backdrop-filter: blur(4px);
    }
    .carousel:hover .arrow { opacity: 1; }
    .arrow:hover { background: rgba(0,0,0,0.6); }
    .arrow.left { left: 10px; }
    .arrow.right { right: 10px; }
    .arrow svg {
      width: 12px; height: 12px;
      fill: none; stroke: #fff;
      stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
    }

    /* Dots - 独立一行，仅在左列下方 */
    .dots-row {
      padding-top: 10px;
      padding-bottom: 2px;
    }
    .dots {
      display: flex;
      justify-content: center;
      gap: 6px;
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      border: none;
      background: #c8c8c8;
      cursor: pointer;
      padding: 0;
      transition: background 0.2s, transform 0.2s;
    }
    .dot:hover { background: #999; }
    .dot.active { background: #333; }

    /* Side cards - 与左侧轮播同高 340px */
    .side-cards {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 0;
    }
    .side-card {
      flex: 1;
      min-height: 0;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: box-shadow 0.2s;
      min-height: 0;
    }
    .side-card:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    }
    .side-card-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    .side-card-bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .side-card-bg .gradient-fill {
      width: 100%;
      height: 100%;
    }
    .side-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
      z-index: 1;
    }
    .side-card-content {
      position: relative;
      z-index: 2;
      padding: 14px 16px;
    }
    .side-card-badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      background: #107c10;
      padding: 2px 6px;
      border-radius: 3px;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .side-card-title {
      font-size: 15px;
      font-weight: 700;
      color: #fff;
      line-height: 1.25;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }
    .side-card-subtitle {
      font-size: 12px;
      color: rgba(255,255,255,0.8);
      margin-top: 2px;
      line-height: 1.3;
    }

    /* Split card: one card, two halves (e.g. 社交 | CyberSafe) */
    .side-card.side-card-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
    }
    .side-card-half {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: 0;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      overflow: hidden;
    }
    .side-card-half:hover { opacity: 0.98; }
    .side-card-half .side-card-bg { position: absolute; inset: 0; z-index: 0; }
    .side-card-half .side-card-bg img { width: 100%; height: 100%; object-fit: cover; }
    .side-card-half .side-card-bg .gradient-fill { width: 100%; height: 100%; }
    .side-card-half .side-card-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
      z-index: 1;
    }
    .side-card-half .side-card-content {
      position: relative;
      z-index: 2;
      padding: 12px 14px;
    }
    .side-card-half .side-card-badge { margin-bottom: 2px; }
    .side-card-half .side-card-title { font-size: 14px; }
    .side-card-half .side-card-subtitle { font-size: 11px; margin-top: 0; }

    @media (max-width: 900px) {
      .hero-layout {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        padding: 0 24px;
      }
      .carousel-wrapper { grid-column: 1; grid-row: 1; min-width: 0; }
      .hero-layout .side-cards { grid-column: 1; grid-row: 2; height: auto; flex-direction: row; flex-wrap: wrap; gap: 8px; min-width: 0; }
      .hero-layout .dots-row { grid-column: 1; grid-row: 3; }
      .side-card { min-height: 150px; min-width: 0; flex: 1 1 200px; }
      .side-card.side-card-split { min-width: 0; flex: 1 1 200px; }
    }
    @media (max-width: 600px) {
      :host { padding: 8px 0 0; }
      .hero-layout { padding: 0 16px; grid-template-rows: 200px auto auto; gap: 8px; min-width: 0; }
      .carousel-wrapper { min-width: 0; }
      .carousel { height: 200px; border-radius: 12px; }
      .slide { padding: 0 14px 20px; }
      .slide-content { max-width: 100%; }
      .title { font-size: 17px; line-height: 1.3; }
      .subtitle { font-size: 12px; }
      .side-cards { flex-direction: column; flex-wrap: nowrap; gap: 6px; }
      .side-card { min-height: 90px; min-width: 0; width: 100%; flex: none; border-radius: 10px; }
      .side-card.side-card-split { width: 100%; grid-template-columns: 1fr 1fr; border-radius: 10px; }
      .arrow { width: 36px; height: 36px; min-width: 36px; min-height: 36px; }
    }
    @media (max-width: 420px) {
      .hero-layout { padding: 0 12px; grid-template-rows: 180px auto auto; gap: 6px; }
      .carousel { height: 180px; }
      .title { font-size: 16px; }
      .slide { padding: 0 12px 16px; }
      .side-card { min-height: 80px; }
    }
  `);customElements.define("ms-hero-carousel",Co);class zo extends G{constructor(){super(),this.value=0}render(){const t=Math.max(0,Math.min(5,this.value||0)),i=t/5*100;return p`
      <span class="stars">
        <span class="stars-empty">★★★★★</span>
        <span class="stars-filled" style="width: ${i}%">★★★★★</span>
      </span>
      ${t>0?p`<span class="value">${t.toFixed(1)}</span>`:""}
    `}}R(zo,"properties",{value:{type:Number}}),R(zo,"styles",k`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .stars {
      display: inline-flex;
      align-items: center;
      position: relative;
      line-height: 1;
    }
    .stars-empty,
    .stars-filled {
      display: inline-flex;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    .stars-empty { color: #d1d1d1; }
    .stars-filled {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      white-space: nowrap;
      color: #FFB900;
    }
    .value {
      font-size: 11px;
      color: #616161;
      margin-left: 1px;
      line-height: 1;
    }
  `);customElements.define("ms-rating",zo);class So extends G{constructor(){super(),this.product={}}_getHref(){const t=this.product;return t?t.is_own_product&&t.custom_url?t.custom_url:t.original_url?t.original_url:t.product_id||t.ms_id||t.id?"/detail/"+(t.product_id||t.ms_id||t.id):"#":"#"}_onClick(t){var o;const i=this._getHref();i.startsWith("/")&&(t.preventDefault(),(o=window.msApp)==null||o.navigate(i))}_getIconSrc(){const t=this.product;return t.local_icon?t.local_icon:t.icon_url?t.icon_url:""}_renderPrice(){const t=this.product;if(!t)return"";if(t.price_type==="free"||t.price==="免费"||t.price==="Free"||t.price==="免费下载")return p`<span class="price-free">免费下载</span>`;if(t.price_type==="owned")return p`<span class="owned-badge">已拥有</span>`;if(t.discount_percent&&t.original_price){const i=t.price||t.original_price;return p`
        <span class="price-original">${t.original_price}</span>
        <span class="price-discounted">${i}</span>
        <span class="discount-badge">-${t.discount_percent}%</span>
      `}return t.price?p`<span class="price-value">${t.price}</span>`:p`<span class="price-free">免费下载</span>`}render(){const t=this.product||{};return p`
      <a class="card" href=${this._getHref()} @click=${this._onClick}
        rel=${this._getHref().startsWith("/")?"":"nofollow noopener"}
        target=${this._getHref().startsWith("/")?"":"_blank"}
        style="text-decoration:none;color:inherit;display:block;">
        <div class="icon-wrapper">
          <ms-lazy-img src=${this._getIconSrc()} alt=${t.title||""} width="68px" height="68px" radius="6px"></ms-lazy-img>
          ${t.has_gamepass?p`<span class="gamepass-badge">Game Pass</span>`:""}
        </div>
        <div class="title">${t.title||""}</div>
        <div class="rating-row">
          <ms-rating .value=${t.rating||0}></ms-rating>
        </div>
        <div class="category">${t.category||""}</div>
        <div class="price-area">
          ${this._renderPrice()}
        </div>
      </a>
    `}}R(So,"properties",{product:{type:Object}}),R(So,"styles",k`
    :host {
      display: block;
      width: 148px;
      flex-shrink: 0;
    }
    .card {
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: background 0.12s ease;
      background: transparent;
    }
    .card:hover {
      background: rgba(0, 0, 0, 0.04);
    }
    .icon-wrapper {
      position: relative;
      width: 68px;
      height: 68px;
      margin-bottom: 8px;
    }
    ms-lazy-img {
      display: block;
    }
    .gamepass-badge {
      position: absolute;
      top: -3px;
      left: -3px;
      background: #107c10;
      color: #fff;
      font-size: 8px;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 3px;
      line-height: 1.2;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      line-height: 1.3;
      margin-bottom: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      font-weight: 400;
    }
    .rating-row { margin-bottom: 3px; }
    .category {
      font-size: 12px;
      color: #616161;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price-area {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }
    .price-free {
      font-size: 12px;
      color: #0e7a0d;
      font-weight: 600;
    }
    .price-value {
      font-size: 12px;
      color: #1a1a1a;
      font-weight: 600;
    }
    .price-original {
      font-size: 11px;
      color: #767676;
      text-decoration: line-through;
    }
    .price-discounted {
      font-size: 12px;
      color: #1a1a1a;
      font-weight: 600;
    }
    .discount-badge {
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      background: #c42b1c;
      padding: 1px 4px;
      border-radius: 2px;
      line-height: 1.2;
    }
    .owned-badge {
      font-size: 12px;
      color: #0067b8;
      font-weight: 500;
    }

    @media (max-width: 600px) {
      :host { min-width: 0; width: 50%; box-sizing: border-box; }
      .card { min-height: 44px; }
    }
  `);customElements.define("ms-product-card",So);class Ao extends G{constructor(){super(),this.product={}}_getIconSrc(){const t=this.product;return t&&(t.local_icon||t.icon_url)||""}_getHref(){const t=this.product;return t?t.is_own_product&&t.custom_url?t.custom_url:t.original_url?t.original_url:t.product_id||t.ms_id||t.id?"/detail/"+(t.product_id||t.ms_id||t.id):"#":"#"}_renderPrice(){const t=this.product;if(!t)return"";if(t.price_type==="free"||t.price==="免费"||t.price==="Free"||t.price==="免费下载")return p`<span class="price-free">免费下载</span>`;if(t.price_type==="owned")return p`<span class="price-value" style="color:#0067b8;">已拥有</span>`;if(t.discount_percent&&t.original_price){const i=t.price||t.original_price;return p`
        <span class="price-original">${t.original_price}</span>
        <span class="price-discounted">${i}</span>
        <span class="discount-badge">-${t.discount_percent}%</span>
      `}return t.price?p`<span class="price-value">${t.price}</span>`:p`<span class="price-free">免费下载</span>`}_onClick(t){var o;const i=this._getHref();i.startsWith("/")&&(t.preventDefault(),(o=window.msApp)==null||o.navigate(i))}render(){const t=this.product||{},i=this._getIconSrc(),o=this._getHref(),s=o.startsWith("/");return p`
      <a class="product product-wide-details" href=${o} ?data-nav=${s} @click=${this._onClick}
        rel=${s?"":"nofollow noopener"} ?target=${s?"":"_blank"}>
        <div class="container">
          <div class="image-wrap">
            <div class="blur">
              ${i?p`<div class="gradual-blur" style="background-image:url('${i}')"></div>`:p`<div class="gradual-blur fallback"></div>`}
            </div>
            <div class="product-image-wrap">
              ${i?p`<ms-lazy-img class="product-image" src=${i} alt="" width="80px" height="80px" radius="12px"></ms-lazy-img>`:""}
            </div>
          </div>
          <div class="details no-review">
            <div class="details-title">
              <p class="title text-ellipsis" title=${t.title||""}>${t.title||""}</p>
            </div>
            <div class="subtitle">
              <ms-rating .value=${t.rating||0}></ms-rating>
              ${t.category?p`<span class="categories"><span class="text-ellipsis">${t.category}</span></span>`:""}
            </div>
            ${t.description?p`<div class="desc">${t.description}</div>`:""}
            <div class="price-row">${this._renderPrice()}</div>
          </div>
        </div>
      </a>
    `}}R(Ao,"properties",{product:{type:Object}}),R(Ao,"styles",k`
    :host {
      display: block;
      min-width: 320px;
      width: 320px;
      flex-shrink: 0;
    }
    /* 与商店 wide-details 一致：product product-wide-details */
    a.product.product-wide-details {
      display: flex;
      flex-direction: row;
      text-decoration: none;
      color: inherit;
      background: #fff;
      border: 1px solid hsl(240 5.9% 90%);
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.2s ease;
      overflow: hidden;
      min-height: 140px;
    }
    a.product.product-wide-details:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    .container {
      display: flex;
      flex-direction: row;
      flex: 1;
      min-width: 0;
    }

    /* 左：image-wrap = blur + product-image-wrap (与商店一致) */
    .image-wrap {
      width: 120px;
      min-width: 120px;
      min-height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }
    .image-wrap .blur {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }
    .image-wrap .gradual-blur {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      filter: blur(20px);
      opacity: 0.5;
    }
    .image-wrap .gradual-blur.fallback {
      filter: none;
      opacity: 1;
      background: #f0f0f0;
    }
    .product-image-wrap {
      position: relative;
      z-index: 1;
    }
    .product-image {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      object-fit: cover;
      display: block;
      background: rgba(255,255,255,0.3);
    }

    /* 右：details (与商店 .details.no-review 一致) */
    .details {
      flex: 1;
      min-width: 0;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .details-title { margin: 0; }
    .text-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .details .title {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 0;
    }
    .subtitle {
      font-size: 12px;
      color: #616161;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .details .desc {
      font-size: 12px;
      color: #616161;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      min-height: 0;
      margin: 0;
    }
    .price-row {
      margin-top: auto;
      padding-top: 4px;
    }
    .price-free { font-size: 12px; color: #0e7a0d; font-weight: 600; }
    .price-value { font-size: 12px; color: #1a1a1a; font-weight: 600; }
    .price-original { font-size: 11px; color: #767676; text-decoration: line-through; }
    .price-discounted { font-size: 12px; color: #1a1a1a; font-weight: 600; }
    .discount-badge {
      font-size: 9px; font-weight: 700; color: #fff;
      background: #c42b1c; padding: 1px 4px; border-radius: 2px; line-height: 1.2;
    }

    @media (max-width: 600px) {
      :host { min-width: 0; width: 100%; max-width: 100%; }
      a.product.product-wide-details { flex-direction: column; min-height: auto; }
      .container { flex-direction: column; }
      .image-wrap { width: 100%; min-width: 0; min-height: 120px; }
      .details { padding: 12px 14px; }
    }
  `);customElements.define("ms-product-hero",Ao);class Eo extends G{constructor(){super(),this.product={}}_firstScreenshotUrl(){const t=this.product;if(!t||!t.screenshots)return"";try{const i=typeof t.screenshots=="string"?JSON.parse(t.screenshots):t.screenshots;let o=[];return Array.isArray(i)?o=i:i&&Array.isArray(i.items)&&(o=i.items),o[0]?typeof o[0]=="string"?o[0]:o[0].url||"":""}catch{return""}}_getCoverSrc(){const t=this.product;if(!t)return"";if(t.cover_url)return t.cover_url;const i=this._firstScreenshotUrl();return i||t.local_icon||t.icon_url||""}_getHref(){const t=this.product;return t?t.is_own_product&&t.custom_url?t.custom_url:t.original_url?t.original_url:t.product_id||t.ms_id||t.id?"/detail/"+(t.product_id||t.ms_id||t.id):"#":"#"}_renderPrice(){const t=this.product;if(!t)return"";if(t.price_type==="free"||t.price==="免费"||t.price==="Free"||t.price==="免费下载")return p`<span class="price-free">免费下载</span>`;if(t.price_type==="owned")return p`<span class="price-value" style="color:#0067b8;">已拥有</span>`;if(t.discount_percent&&t.original_price){const i=t.price||t.original_price;return p`
        <span class="price-original">${t.original_price}</span>
        <span class="price-discounted">${i}</span>
      `}return t.price?p`<span class="price-value">${t.price}</span>`:p`<span class="price-free">免费下载</span>`}_onClick(t){var o;const i=this._getHref();i.startsWith("/")&&(t.preventDefault(),(o=window.msApp)==null||o.navigate(i))}render(){const t=this.product||{},i=this._getCoverSrc(),o=this._getHref(),s=o.startsWith("/"),r=parseFloat(t.rating)||0;return p`
      <a class="card" href=${o} ?data-nav=${s} @click=${this._onClick}
        rel=${s?"":"nofollow noopener"} ?target=${s?"":"_blank"}>
        <div class="cover-wrap">
          ${i?p`<ms-lazy-img class="cover-img" src=${i} alt="" width="100%" height="100%" radius="0" style="position:absolute;inset:0;"></ms-lazy-img>`:""}
          <div class="badges">
            <div class="badge-left">
              ${t.has_gamepass?p`<span class="gamepass-badge">Game Pass</span>`:""}
            </div>
            ${t.discount_percent?p`<span class="discount-badge">-${t.discount_percent}%</span>`:""}
          </div>
          <div class="overlay">
            <div class="title">${t.title||""}</div>
            <div class="meta">
              ${r>0?p`
                <ms-rating .value=${r}></ms-rating>
                <span class="rating-text">${r.toFixed(1)}</span>
              `:""}
            </div>
            <div class="price-row">${this._renderPrice()}</div>
          </div>
        </div>
      </a>
    `}}R(Eo,"properties",{product:{type:Object}}),R(Eo,"styles",k`
    :host {
      display: block;
      width: 180px;
      flex-shrink: 0;
    }
    a.card {
      display: block;
      text-decoration: none;
      color: inherit;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      transition: transform 0.2s ease;
    }
    a.card:hover {
      transform: scale(1.02);
    }

    .cover-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 2/3;
      overflow: hidden;
      border-radius: 12px;
      background: #1a1a1a;
    }
    .cover-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* 顶部徽章 */
    .badges {
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      z-index: 3;
      pointer-events: none;
    }
    .badge-left {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .gamepass-badge {
      background: #107c10;
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .discount-badge {
      background: #d13438;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 4px;
    }

    /* 底部渐变遮罩 + 信息 */
    .overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 60px 12px 12px;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
      z-index: 2;
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 6px;
      text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }
    .meta {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
    }
    .rating-text {
      font-size: 12px;
      color: rgba(255,255,255,0.85);
    }
    .price-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .price-free {
      font-size: 12px;
      color: #7fba00;
      font-weight: 600;
    }
    .price-value {
      font-size: 12px;
      color: #fff;
      font-weight: 500;
    }
    .price-original {
      font-size: 11px;
      color: rgba(255,255,255,0.6);
      text-decoration: line-through;
    }
    .price-discounted {
      font-size: 12px;
      color: #fff;
      font-weight: 600;
    }

    @media (max-width: 600px) {
      :host { min-width: 0; width: 150px; }
    }
  `);customElements.define("ms-product-tall-card",Eo);class To extends G{constructor(){super(),this.product={}}_firstScreenshotUrl(){const t=this.product;if(!t||!t.screenshots)return"";try{const i=typeof t.screenshots=="string"?JSON.parse(t.screenshots):t.screenshots;let o=[];return Array.isArray(i)?o=i:i&&Array.isArray(i.items)&&(o=i.items),o[0]?typeof o[0]=="string"?o[0]:o[0].url||"":""}catch{return""}}_getBackgroundImage(){const t=this.product;if(!t)return"";if(t.social_card_image)return t.social_card_image;if(t.cover_url)return t.cover_url;const i=this._firstScreenshotUrl();return i||t.local_icon||t.icon_url||""}_getIcon(){const t=this.product;return t&&(t.local_icon||t.icon_url)||""}_getHref(){const t=this.product;return t?t.is_own_product&&t.custom_url?t.custom_url:t.original_url?t.original_url:t.product_id||t.ms_id||t.id?"/detail/"+(t.product_id||t.ms_id||t.id):"#":"#"}_onClick(t){var o;const i=this._getHref();i.startsWith("/")&&(t.preventDefault(),(o=window.msApp)==null||o.navigate(i))}render(){const t=this.product||{},i=this._getBackgroundImage(),o=this._getIcon(),s=this._getHref(),r=s.startsWith("/");return p`
      <a class="card" href=${s} ?data-nav=${r} @click=${this._onClick}
        rel=${r?"":"nofollow noopener"} ?target=${r?"":"_blank"}>
        <div class="screenshot-wrap">
          ${i?p`<ms-lazy-img src=${i} alt="" width="100%" height="100%" radius="0"></ms-lazy-img>`:""}
        </div>
        <div class="info">
          ${o?p`<ms-lazy-img class="logo" src=${o} alt="" width="40px" height="40px" radius="10px"></ms-lazy-img>`:""}
          <div class="title-wrap">
            <h3 class="title">${t.title||""}</h3>
          </div>
        </div>
      </a>
    `}}R(To,"properties",{product:{type:Object}}),R(To,"styles",k`
    :host {
      display: block;
      min-width: 260px;
      width: 260px;
      flex-shrink: 0;
    }
    a.card {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: inherit;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.2s ease;
      overflow: visible;
      height: 320px;
    }
    a.card:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    }

    /* 上：背景图约 70% */
    .screenshot-wrap {
      position: relative;
      width: 100%;
      flex: 0 0 70%;
      background: #e8e8e8;
      overflow: hidden;
      border-radius: 12px 12px 0 0;
    }
    .screenshot-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* 下：白底弧线区约 30%，仅小图标 + 标题 */
    .info {
      flex: 0 0 30%;
      min-height: 0;
      background: #fff;
      border-radius: 24px 24px 0 0;
      margin-top: -20px;
      position: relative;
      z-index: 1;
      padding: 14px 16px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 -1px 0 0 rgba(0,0,0,0.04);
    }
    .logo {
      width: 40px;
      height: 40px;
      min-width: 40px;
      border-radius: 10px;
      object-fit: cover;
      background: #f0f0f0;
    }
    .title-wrap {
      min-width: 0;
      flex: 1;
    }
    .title {
      font-size: 15px;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 0;
    }

    @media (max-width: 600px) {
      :host { min-width: 0; width: 100%; max-width: 100%; }
      a.card { height: 280px; }
    }
  `);customElements.define("ms-product-social-card",To);const Ee=class Ee extends G{constructor(){super(),this.title="",this.viewAllUrl="",this.products=[],this.variant="default",this.sectionType="",this._showLeftArrow=!1,this._showRightArrow=!0,this._pageIndex=0}static get PAGE_SIZE_TWO_COL(){return 6}updated(t){super.updated(t),t.has("variant")&&this.classList.toggle("variant-two-col",this.variant==="twoColGrid"),this.variant==="twoColGrid"&&t.has("products")&&(this._pageIndex=0)}firstUpdated(){this.classList.toggle("variant-two-col",this.variant==="twoColGrid"),this._updateArrows()}_getScrollContainer(){return this.renderRoot.querySelector(".scroll-container")}_updateArrows(){const t=this._getScrollContainer();t&&(this._showLeftArrow=t.scrollLeft>10,this._showRightArrow=t.scrollLeft<t.scrollWidth-t.clientWidth-10)}_scroll(t){if(this.variant==="twoColGrid"){const s=Math.max(1,Math.ceil((this.products||[]).length/Ee.PAGE_SIZE_TWO_COL));t==="left"&&this._pageIndex>0?this._pageIndex=this._pageIndex-1:t==="right"&&this._pageIndex<s-1&&(this._pageIndex=this._pageIndex+1);return}const i=this._getScrollContainer();if(!i)return;const o=i.clientWidth*.75;i.scrollBy({left:t==="left"?-o:o,behavior:"smooth"}),setTimeout(()=>this._updateArrows(),350)}_onScroll(){this._updateArrows()}_renderCard(t){return this.variant==="hero"?p`<ms-product-hero .product=${t}></ms-product-hero>`:this.variant==="tall"?p`<ms-product-tall-card .product=${t}></ms-product-tall-card>`:this.variant==="social"?p`<ms-product-social-card .product=${t}></ms-product-social-card>`:p`<ms-product-card .product=${t}></ms-product-card>`}_renderPriceRow(t){if(!t)return"";if(t.price_type==="free"||t.price==="免费"||t.price==="Free"||t.price==="免费下载")return p`<span class="product-row-price product-row-price-free">免费下载</span>`;if(t.price_type==="owned")return p`<span class="product-row-price" style="color: #0067b8;">已拥有</span>`;if(t.discount_percent&&t.original_price){const i=t.price||t.original_price;return p`
        <span class="product-row-price-original">${t.original_price}</span>
        <span class="product-row-price">${i}</span>
      `}return t.price?p`<span class="product-row-price">${t.price}</span>`:p`<span class="product-row-price product-row-price-free">免费下载</span>`}_renderRowItem(t){const i=t||{},o=i.local_icon||i.icon_url||"",s=i.is_own_product&&i.custom_url?i.custom_url:i.original_url||"#",r=s.startsWith("/");return p`
      <a class="product-row" href=${s} ?data-nav=${r}
        rel=${r?"":"nofollow noopener"} ?target=${r?"":"_blank"}>
        <div class="product-row-icon-wrap">
          <ms-lazy-img src=${o} alt=${i.title||""} width="80px" height="80px" radius="8px"></ms-lazy-img>
          ${i.has_gamepass?p`<span class="gamepass-badge">Game Pass</span>`:""}
        </div>
        <div class="product-row-info">
          <div class="product-row-title">${i.title||""}</div>
          <div class="product-row-meta">
            <ms-rating .value=${i.rating||0}></ms-rating>
            <span>${i.category||""}</span>
          </div>
          <div class="product-row-meta">${this._renderPriceRow(i)}</div>
        </div>
      </a>
    `}_renderHeader(t,i,o){const s=t?!i:!this._showLeftArrow,r=t?!o:!this._showRightArrow;return p`
      <div class="section-header">
        <div class="section-title-area">
          <a class="section-title-link collection-title" href=${this.viewAllUrl||"#"} data-nav>
            <h2 class="section-title">${this.title}</h2>
            <span class="title-chevron">&#8250;</span>
          </a>
        </div>
        <div class="header-right">
          <div class="nav-arrows">
            <button class="scroll-btn" ?disabled=${s} @click=${()=>this._scroll("left")} aria-label="向左滚动">
              <svg viewBox="0 0 16 16"><polyline points="10 3 5 8 10 13"/></svg>
            </button>
            <button class="scroll-btn" ?disabled=${r} @click=${()=>this._scroll("right")} aria-label="向右滚动">
              <svg viewBox="0 0 16 16"><polyline points="6 3 11 8 6 13"/></svg>
            </button>
          </div>
        </div>
      </div>
    `}render(){const t=this.variant==="twoColGrid",i=this.products||[],o=Ee.PAGE_SIZE_TWO_COL,s=t?Math.max(1,Math.ceil(i.length/o)):1,r=t?i.slice(this._pageIndex*o,(this._pageIndex+1)*o):i,n=t&&this._pageIndex>0,l=t&&this._pageIndex<s-1;return t?p`
        <div class="section">
          <div class="two-col-card">
            ${this._renderHeader(!0,n,l)}
            <div class="two-col-divider"></div>
            <div class="two-col-grid">${r.map(d=>this._renderRowItem(d))}</div>
          </div>
        </div>
      `:p`
      <div class="section">
        ${this._renderHeader(!1,this._showLeftArrow,this._showRightArrow)}
        <div class="scroll-wrapper">
          <div class="scroll-container" @scroll=${this._onScroll}>
            ${i.map(d=>this._renderCard(d))}
          </div>
        </div>
      </div>
    `}};R(Ee,"properties",{title:{type:String},viewAllUrl:{type:String},products:{type:Array},variant:{type:String},sectionType:{type:String},_showLeftArrow:{type:Boolean,state:!0},_showRightArrow:{type:Boolean,state:!0},_pageIndex:{type:Number,state:!0}}),R(Ee,"styles",k`
    :host {
      display: block;
      box-sizing: border-box;
    }
    .section { margin-bottom: 32px; }

    /* Section header */
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding: 0;
    }
    .section-title-area {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #1a1a1a;
      margin: 0;
    }
    .title-chevron {
      font-size: 12px;
      color: #1a1a1a;
      margin-left: 2px;
      cursor: pointer;
    }
    .section-title-link {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      padding: 4px 8px;
      margin: -4px -8px;
      border-radius: 8px;
      transition: background-color 0.2s ease;
    }
    .section-title-link.collection-title:hover {
      background-color: #e8ebeb;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .view-all-link {
      font-size: 13px;
      font-weight: 600;
      color: #0067b8;
      text-decoration: none;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .view-all-link:hover { text-decoration: underline; }

    /* Nav arrows */
    .nav-arrows {
      display: flex;
      gap: 6px;
    }
    .scroll-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #d1d1d1;
      background: #fff;
      color: #424242;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.12s, border-color 0.12s;
      padding: 0;
    }
    .scroll-btn:hover {
      background: #f5f5f5;
      border-color: #999;
    }
    .scroll-btn:disabled {
      opacity: 0.3;
      cursor: default;
    }
    .scroll-btn svg {
      width: 12px;
      height: 12px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Scroll container */
    .scroll-wrapper { position: relative; }
    .scroll-container {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 8px;
      margin: -8px;
    }
    .scroll-container::-webkit-scrollbar { display: none; }

    /* Card wrapper for twoColGrid variant (.component styling) */
    .two-col-card {
      border: 1px solid hsl(240 5.9% 90%);
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.7);
      padding: 36px;
      box-sizing: border-box;
    }
    .two-col-divider {
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      opacity: 0.7;
      width: 92%;
      margin: 6px auto 16px;
    }
    /* 双列网格：与官网一致，每栏 2 列 x 3 行，item 横向（图标左 + 信息右） */
    .two-col-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0 16px;
      padding: 0;
    }
    .product-row {
      display: flex;
      align-items: center;
      gap: 0;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: background 0.12s;
      min-height: 64px;
      box-sizing: border-box;
    }
    .product-row:hover {
      background: rgba(0, 0, 0, 0.04);
    }
    .product-row-icon-wrap {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      margin-right: 16px;
      position: relative;
    }
    .product-row-icon {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      object-fit: cover;
      display: block;
      background: #f0f0f0;
    }
    .product-row .gamepass-badge {
      position: absolute;
      top: -2px;
      left: -2px;
      background: #107c10;
      color: #fff;
      font-size: 8px;
      font-weight: 700;
      padding: 2px 4px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.2px;
    }
    .product-row-info {
      flex: 1;
      min-width: 0;
      display: grid;
      gap: 4px 0;
      align-content: start;
    }
    .product-row-title {
      font-size: 13px;
      color: #1a1a1a;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-weight: 400;
    }
    .product-row-meta {
      font-size: 12px;
      color: #616161;
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }
    .product-row-price {
      font-size: 12px;
      font-weight: 600;
      color: #1a1a1a;
    }
    .product-row-price-free {
      color: #0e7a0d;
    }
    .product-row-price-original {
      font-size: 11px;
      color: #767676;
      text-decoration: line-through;
      font-weight: 400;
    }

    @media (max-width: 600px) {
      .section-header { margin-bottom: 8px; }
      .section-title { font-size: 18px; }
      .view-all-link { font-size: 12px; }
      .nav-arrows { display: none; }
      .scroll-container { padding: 6px 0; -webkit-overflow-scrolling: touch; }
      .scroll-btn { display: none; }
      .two-col-card { padding: 16px 14px; }
      .two-col-grid { grid-template-columns: 1fr; gap: 10px; }
    }
    @media (max-width: 420px) {
      .section-title { font-size: 16px; }
      .two-col-card { padding: 14px 12px; }
    }
  `);let Io=Ee;customElements.define("ms-collection-row",Io);class Do extends G{constructor(){super(),this.title="",this.viewAllUrl="",this.products=[],this._showLeftArrow=!1,this._showRightArrow=!0}firstUpdated(){this._updateArrows();const t=this._getScrollContainer();t&&t.addEventListener("scroll",this._onScrollBound=()=>this._updateArrows())}disconnectedCallback(){super.disconnectedCallback();const t=this._getScrollContainer();t&&this._onScrollBound&&t.removeEventListener("scroll",this._onScrollBound)}_getScrollContainer(){var t;return(t=this.renderRoot)==null?void 0:t.querySelector(".scroll-container")}_updateArrows(){const t=this._getScrollContainer();t&&(this._showLeftArrow=t.scrollLeft>10,this._showRightArrow=t.scrollLeft<t.scrollWidth-t.clientWidth-10)}_scroll(t){const i=this._getScrollContainer();if(!i)return;const o=i.clientWidth*.75;i.scrollBy({left:t==="left"?-o:o,behavior:"smooth"}),setTimeout(()=>this._updateArrows(),350)}_onScroll(){this._updateArrows()}_renderStars(t=0){const i=Math.floor(t),o=[];for(let s=0;s<5;s++)o.push(p`<span class="star ${s<i?"":"empty"}">★</span>`);return o}_renderPrice(t){if(t.price_type==="free"||t.price===0||t.price==="0"||t.price==="Free")return p`<span class="price-free">免费下载</span>`;const i=[];return t.discount&&t.original_price?(i.push(p`<span class="price-original">${t.original_price}</span>`),i.push(p`<span class="price-current">${t.price}</span>`)):t.price&&i.push(p`<span class="price-current">${t.price}</span>`),i}_renderBadges(t){const i=[];return t.has_gamepass&&i.push(p`<span class="badge badge-gamepass">Game Pass</span>`),t.discount&&i.push(p`<span class="badge badge-discount">-${t.discount}%</span>`),i}_onItemClick(t,i){var o;i.preventDefault(),t.product_id&&((o=window.msApp)==null||o.navigate("/detail/"+t.product_id))}render(){const t=(this.products||[]).slice(0,12);return p`
      <div class="section">
        <div class="section-header">
          <div class="section-title-area">
            <a class="section-title-link" href=${this.viewAllUrl||"#"} data-nav>
              <h2 class="section-title">${this.title}</h2>
              <span class="title-chevron">&#8250;</span>
            </a>
          </div>
          <a class="view-all-link" href=${this.viewAllUrl||"#"} data-nav>查看全部 &#8250;</a>
        </div>
        <div class="scroll-wrapper">
          <button class="scroll-btn left ${this._showLeftArrow?"visible":""}" @click=${()=>this._scroll("left")} aria-label="向左滚动">&#8249;</button>
          <div class="scroll-container" @scroll=${this._onScroll}>
            ${t.map(i=>{const o=i.icon_url||i.image_url||"";return p`
              <a class="card" href=${i.product_id?"/detail/"+i.product_id:"#"} data-nav
                @click=${s=>this._onItemClick(i,s)}>
                <div class="card-top">
                  ${o?p`
                    <div class="card-icon-bg" style="background-image: url('${o}')"></div>
                  `:""}
                  <ms-lazy-img class="card-icon" src=${o||""} alt=${i.title||i.name||""} width="84px" height="84px" radius="12px" style="position:relative;z-index:1;"></ms-lazy-img>
                </div>
                <div class="card-bottom">
                  <span class="card-title">${i.title||i.name}</span>
                  <div class="item-meta">
                    ${i.rating?p`
                      <span class="item-rating">
                        <span class="stars">${this._renderStars(i.rating)}</span>
                        ${i.rating_count?p`<span class="rating-count">${i.rating_count}</span>`:""}
                      </span>
                    `:""}
                    ${this._renderBadges(i)}
                  </div>
                  <div class="item-price">${this._renderPrice(i)}</div>
                </div>
              </a>
            `})}
          </div>
          <button class="scroll-btn right ${this._showRightArrow?"visible":""}" @click=${()=>this._scroll("right")} aria-label="向右滚动">&#8250;</button>
        </div>
      </div>
    `}}R(Do,"properties",{title:{type:String},viewAllUrl:{type:String},products:{type:Array},_showLeftArrow:{type:Boolean,state:!0},_showRightArrow:{type:Boolean,state:!0}}),R(Do,"styles",k`
    :host {
      display: block;
      box-sizing: border-box;
    }
    .section { margin-bottom: 32px; }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .section-title-area {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .section-title-link {
      display: flex;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }
    .section-title-link:hover .section-title {
      text-decoration: underline;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #1a1a1a;
      margin: 0;
    }
    .title-chevron {
      font-size: 18px;
      color: #1a1a1a;
      margin-left: 2px;
    }
    .view-all-link {
      font-size: 13px;
      font-weight: 600;
      color: #0067b8;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .view-all-link:hover { text-decoration: underline; }

    .scroll-wrapper { position: relative; }
    .scroll-container {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px 0 8px;
    }
    .scroll-container::-webkit-scrollbar { display: none; }
    .scroll-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid #d1d1d1;
      background: #fff;
      color: #424242;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.2s, background 0.12s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .scroll-btn:hover { background: #f5f5f5; }
    .scroll-wrapper:hover .scroll-btn.visible { opacity: 1; }
    .scroll-btn.left { left: -4px; }
    .scroll-btn.right { right: -4px; }

    .card {
      flex-shrink: 0;
      min-width: 160px;
      width: 160px;
      display: flex;
      flex-direction: column;
      border: 1px solid hsl(240 5.9% 90%);
      border-radius: 8px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.06);
      background: rgba(255,255,255,0.7);
      padding: 16px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .card-top {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 120px;
      margin: -16px -16px 12px -16px;
      padding: 24px 16px;
      border-radius: 8px 8px 0 0;
      overflow: hidden;
    }
    .card-icon-bg {
      position: absolute;
      inset: -20px;
      background-size: 120%;
      background-position: center;
      background-repeat: no-repeat;
      filter: blur(24px);
      opacity: 0.6;
    }
    .card-icon {
      width: 84px;
      height: 84px;
      border-radius: 12px;
      object-fit: cover;
      position: relative;
      z-index: 1;
    }
    .card-bottom {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .card-title {
      font-size: 13px;
      font-weight: 400;
      color: #1a1a1a;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .item-meta {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }
    .item-rating {
      display: flex;
      align-items: center;
      gap: 1px;
    }
    .stars { display: flex; gap: 0; }
    .star { font-size: 9px; color: #FFB900; }
    .star.empty { color: #d1d1d1; }
    .rating-count { font-size: 10px; color: #616161; margin-left: 2px; }
    .item-price { font-size: 12px; color: #616161; white-space: nowrap; }
    .price-original { text-decoration: line-through; color: #767676; font-size: 11px; margin-right: 4px; }
    .price-current { color: #1a1a1a; }
    .price-free { color: #0e7a0d; }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      font-size: 9px;
      padding: 1px 5px;
      border-radius: 2px;
      font-weight: 700;
      white-space: nowrap;
    }
    .badge-gamepass { background: #107c10; color: #fff; }
    .badge-discount { background: #c42b1c; color: #fff; }

    @media (max-width: 600px) {
      :host { padding: 0; }
      .card { min-width: 130px; width: 130px; }
      .card-top img { width: 72px; height: 72px; border-radius: 10px; }
      .card-title { font-size: 12px; }
      .scroll-btn { display: none; }
    }
    @media (max-width: 420px) {
      .card { min-width: 120px; width: 120px; }
      .card-top img { width: 64px; height: 64px; }
    }
  `);customElements.define("ms-collection-grid",Do);class Lo extends G{constructor(){super(),this.title="Collections",this.viewAllUrl="",this.cards=[],this._showLeftArrow=!1,this._showRightArrow=!0}firstUpdated(){this._updateArrows()}_getScrollContainer(){return this.renderRoot.querySelector(".scroll-container")}_updateArrows(){const t=this._getScrollContainer();t&&(this._showLeftArrow=t.scrollLeft>10,this._showRightArrow=t.scrollLeft<t.scrollWidth-t.clientWidth-10)}_scroll(t){const i=this._getScrollContainer();if(!i)return;const o=i.clientWidth*.75;i.scrollBy({left:t==="left"?-o:o,behavior:"smooth"}),setTimeout(()=>this._updateArrows(),350)}_onScroll(){this._updateArrows()}_getGradientClass(t){return`card-gradient-${t%6}`}render(){return p`
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">${this.title}</h2>
        </div>
        <div class="scroll-wrapper">
          <button class="scroll-btn left ${this._showLeftArrow?"visible":""}" @click=${()=>this._scroll("left")} aria-label="向左滚动">&#8249;</button>
          <div class="scroll-container" @scroll=${this._onScroll}>
            ${(this.cards||[]).map((t,i)=>p`
              <a class="card" href=${t.link_url||"#"} ?data-nav=${!(t.link_url||"").startsWith("http")}
                rel=${(t.link_url||"").startsWith("http")?"nofollow noopener":""} ?target=${(t.link_url||"").startsWith("http")?"_blank":""}>
                ${t.image_url?p`<ms-lazy-img class="card-bg" src=${t.image_url} alt="" width="100%" height="100%" radius="0" style="position:absolute;inset:0;z-index:1;"></ms-lazy-img>`:""}
                <div class="card-gradient ${this._getGradientClass(i)}"></div>
                <div class="card-content">
                  <div class="card-name">${t.name}</div>
                  ${t.subtitle?p`<div class="card-subtitle">${t.subtitle}</div>`:""}
                </div>
              </a>
            `)}
          </div>
          <button class="scroll-btn right ${this._showRightArrow?"visible":""}" @click=${()=>this._scroll("right")} aria-label="向右滚动">&#8250;</button>
        </div>
      </div>
    `}}R(Lo,"properties",{title:{type:String},viewAllUrl:{type:String},cards:{type:Array},_showLeftArrow:{type:Boolean,state:!0},_showRightArrow:{type:Boolean,state:!0}}),R(Lo,"styles",k`
    :host {
      display: block;
      box-sizing: border-box;
    }
    .section { margin-bottom: 32px; }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #1a1a1a;
      margin: 0;
    }
    .scroll-wrapper { position: relative; }
    .scroll-container {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px 0 8px;
    }
    .scroll-container::-webkit-scrollbar { display: none; }
    .scroll-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid #d1d1d1;
      background: #fff;
      color: #424242;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.2s, background 0.12s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .scroll-btn:hover { background: #f5f5f5; }
    .scroll-wrapper:hover .scroll-btn.visible { opacity: 1; }
    .scroll-btn.left { left: -4px; }
    .scroll-btn.right { right: -4px; }
    .card {
      flex-shrink: 0;
      width: 340px;
      height: 240px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      text-decoration: none;
      color: inherit;
      transition: box-shadow 0.2s;
    }
    .card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
    .card-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      z-index: 1;
    }
    .card-gradient {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    .card-gradient-0 { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); }
    .card-gradient-1 { background: linear-gradient(135deg, #2d1b4e 0%, #1a0a2e 50%, #0d0221 100%); }
    .card-gradient-2 { background: linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%); }
    .card-gradient-3 { background: linear-gradient(135deg, #5c4d7d 0%, #3d2c5e 50%, #2d1b4e 100%); }
    .card-gradient-4 { background: linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%); }
    .card-gradient-5 { background: linear-gradient(135deg, #3d0a0a 0%, #6b2d2d 50%, #8b3a3a 100%); }
    .card-content {
      position: relative;
      z-index: 2;
      padding: 12px 14px;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
    }
    .card-name {
      font-size: 13px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #fff;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-subtitle {
      font-size: 11px;
      color: rgba(255,255,255,0.75);
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 600px) {
      :host { padding: 0; }
      .card { width: 180px; height: 110px; min-width: 160px; border-radius: 10px; }
      .card-content { padding: 10px 12px; }
      .card-name { font-size: 12px; }
      .card-subtitle { font-size: 10px; }
      .scroll-btn { display: none; }
    }
    @media (max-width: 420px) {
      .card { width: 160px; height: 100px; min-width: 140px; }
    }
  `);customElements.define("ms-collection-cards",Lo);class Po extends G{constructor(){super(),this.data=null,this.loading=!0}connectedCallback(){super.connectedCallback(),this._loadData()}async _loadData(){if(this.data){this.loading=!1,this._applySeo();return}try{this.data=await ci("/api/home")}catch(t){console.error("Failed to load home data:",t)}this.loading=!1,this._applySeo()}_applySeo(){var i;if(!((i=this.data)!=null&&i.seo))return;const t=this.data.seo;ze({title:t.title,keywords:t.keywords,description:t.description})}_prepareProducts(t){return(t.products||[]).map(i=>({...i,icon_url:i.local_icon||i.icon_url||"",product_id:i.ms_id||i.id}))}_isTallGameSection(t){const i=(t.name||"").trim(),o=(t.slug||"").toLowerCase();return i==="最畅销的游戏"||i==="全新值得注目的電腦遊戲"||o==="top-grossing"||o==="new-pc-games"||o.includes("topgrossing")||o.includes("new-pc")}_renderCollection(t){const i=this._prepareProducts(t);if(t.section_type==="grid"&&this._isTallGameSection(t))return p`
        <ms-collection-row
          .title=${t.name}
          .viewAllUrl=${t.view_all_url||""}
          .products=${i}
          variant="tall"
        ></ms-collection-row>
      `;switch(t.section_type){case"horizontal_scroll":return p`
          <ms-collection-row
            .title=${t.name}
            .viewAllUrl=${t.view_all_url||""}
            .products=${i}
            variant="default"
          ></ms-collection-row>
        `;case"grid":return p`
          <ms-collection-grid
            .title=${t.name}
            .viewAllUrl=${t.view_all_url||""}
            .products=${i}
          ></ms-collection-grid>
        `;case"hero_cards":{const o=t.name==="社交網路應用程式"||(t.slug||"").toLowerCase().includes("social");return p`
          <ms-collection-row
            .title=${t.name}
            .viewAllUrl=${t.view_all_url||""}
            .products=${i}
            variant=${o?"social":"hero"}
          ></ms-collection-row>
        `}case"collection_cards":return"";default:return p`
          <ms-collection-row
            .title=${t.name}
            .viewAllUrl=${t.view_all_url||""}
            .products=${i}
          ></ms-collection-row>
        `}}_buildHeroSideCards(t){return t!=null&&t.length?t.length>=3?[t[0],{type:"split",left:t[1],right:t[2]}]:t.slice(0,2):[]}_getCollectionCards(){var i;return(i=this.data)!=null&&i.collections?this.data.collections.filter(o=>o.section_type==="collection_cards"&&o.slug!=="collections"&&o.display_order>10).map(o=>({name:o.name,subtitle:"",link_url:o.view_all_url||"#",image_url:o.hero_image||""})):[]}render(){if(this.loading)return p`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;if(!this.data)return p`<div class="loading">加载失败，请刷新重试</div>`;const t=this.data.heroBanners||[],i=this.data.featuredBanners||[],o=this._buildHeroSideCards(i),s=(this.data.collections||[]).filter(h=>h.section_type!=="collection_cards").sort((h,g)=>h.display_order-g.display_order),r=this._getCollectionCards(),n=s.find(h=>h.slug==="trending-games"||h.name==="热门游戏"),l=s.find(h=>h.slug==="trending-apps"||h.name==="新潮应用"),d=s.filter(h=>h!==n&&h!==l&&h.slug!=="creative-apps");return p`
      <ms-hero-carousel .banners=${t} .sideCards=${o}></ms-hero-carousel>

      <div class="section-spacer"></div>

      ${n||l?p`
        <div class="two-column-wrap">
          <div class="two-column">
            ${n?p`
            <ms-collection-row
              .title=${n.name}
              .viewAllUrl=${n.view_all_url||""}
              .products=${this._prepareProducts(n)}
              variant="twoColGrid"
            ></ms-collection-row>
          `:""}
          ${l?p`
            <ms-collection-row
              .title=${l.name}
              .viewAllUrl=${l.view_all_url||""}
              .products=${this._prepareProducts(l)}
              variant="twoColGrid"
            ></ms-collection-row>
          `:""}
          </div>
        </div>
      `:""}

      <div class="product-collections-wrap">
        ${d.map(h=>this._renderCollection(h))}
        ${r.length>0?p`
          <ms-collection-cards title="Collections" .cards=${r}></ms-collection-cards>
        `:""}
      </div>
    `}}R(Po,"properties",{data:{type:Object},loading:{type:Boolean}}),R(Po,"styles",k`
    :host {
      display: block;
      padding-bottom: 48px;
      background: transparent;
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    :host * {
      box-sizing: border-box;
    }
    .loading {
      text-align: center;
      padding: 200px 0;
      color: #767676;
      font-size: 16px;
    }
    .loading-spinner {
      display: inline-block;
      width: 32px; height: 32px;
      border: 3px solid #e5e5e5;
      border-top-color: #0067b8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .section-spacer { height: 48px; }
    .two-column-wrap {
      width: 100%;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 0 auto;
      padding: 0 38px;
      background: transparent;
      box-sizing: border-box;
      min-width: 0;
    }
    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .two-column ms-collection-row {
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }
    .product-collections-wrap {
      display: flex;
      flex-direction: column;
      gap: 48px;
      width: 100%;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 48px auto 0;
      padding: 0 38px;
      box-sizing: border-box;
      min-width: 0;
    }
    @media (max-width: 900px) {
      .section-spacer { height: 36px; }
      .two-column-wrap { padding: 0 24px; }
      .two-column { grid-template-columns: 1fr; gap: 0; }
      .product-collections-wrap {
        margin: 32px auto 0;
        padding: 0 24px;
        gap: 32px;
      }
    }
    @media (max-width: 600px) {
      :host { padding-bottom: 24px; }
      .section-spacer { height: 20px; }
      .two-column-wrap { padding: 0 16px; }
      .product-collections-wrap {
        margin: 20px auto 0;
        padding: 0 16px;
        gap: 20px;
      }
    }
    @media (max-width: 420px) {
      .two-column-wrap { padding: 0 12px; }
      .product-collections-wrap {
        padding: 0 12px;
        gap: 16px;
      }
      .section-spacer { height: 16px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .loading-spinner {
        animation: none;
      }
    }
  `);customElements.define("home-page",Po);class Oo extends G{constructor(){super(),this.banners=[]}render(){return p`
      <div class="section">
        <div class="banner-row">
          ${(this.banners||[]).map(t=>{var i,o,s;return p`
            <a class="banner-card" href=${t.link_url||"#"} ?data-nav=${!((i=t.link_url)!=null&&i.startsWith("http"))}
              rel=${(o=t.link_url)!=null&&o.startsWith("http")?"nofollow noopener":""} ?target=${(s=t.link_url)!=null&&s.startsWith("http")?"_blank":""}>
              ${t.image_url||t.local_image?p`<div class="banner-bg" style="background-image: url('${t.local_image||t.image_url}')"></div>`:""}
              <div class="banner-overlay"></div>
              <div class="banner-content">
                ${t.badge_text?p`<span class="banner-badge">${t.badge_text}</span>`:""}
                <h3 class="banner-title">${t.title}</h3>
                ${t.subtitle?p`<p class="banner-subtitle">${t.subtitle}</p>`:""}
              </div>
            </a>
          `})}
        </div>
      </div>
    `}}R(Oo,"properties",{banners:{type:Array}}),R(Oo,"styles",k`
    :host {
      display: block;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 0 auto;
      padding: 0 38px;
      box-sizing: border-box;
    }
    .section { margin-bottom: 28px; }
    .banner-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .banner-card {
      position: relative;
      height: 156px;
      border-radius: 8px;
      overflow: hidden;
      background: #f3f3f3;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      transition: box-shadow 0.2s;
    }
    .banner-card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
    .banner-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
    }
    .banner-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.02) 100%);
    }
    .banner-content {
      position: relative;
      z-index: 1;
      padding: 16px 20px;
    }
    .banner-badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      background: #107c10;
      padding: 2px 6px;
      border-radius: 3px;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .banner-title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 3px;
      line-height: 1.25;
    }
    .banner-subtitle {
      font-size: 13px;
      color: rgba(255,255,255,0.8);
      margin: 0;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    @media (max-width: 900px) {
      .banner-row { grid-template-columns: 1fr; }
      .banner-card { height: 140px; }
    }
    @media (max-width: 600px) {
      :host { padding: 0 16px; }
      .banner-card { height: 120px; }
      .banner-content { padding: 12px 14px; }
      .banner-title { font-size: 14px; }
    }
  `);customElements.define("ms-featured-row",Oo);const Te=class Te extends G{constructor(){super(),this.data=null,this.homeData=null,this.loading=!0}connectedCallback(){super.connectedCallback(),this._loadData()}async _loadData(){if(this.data){this.loading=!1,this._applySeo();return}try{const[t,i]=await Promise.all([ci("/api/apps"),ci("/api/home")]);this.data=t,this.homeData=i}catch(t){console.error("Failed to load apps data:",t)}this.loading=!1,this._applySeo()}_applySeo(){var i;if(!((i=this.data)!=null&&i.seo))return;const t=this.data.seo;ze({title:t.title,keywords:t.keywords,description:t.description})}_prepareProducts(t){return(t.products||[]).map(i=>({...i,icon_url:i.local_icon||i.icon_url||"",product_id:i.ms_id||i.id}))}_isAppPackBanner(t){const i=(t.title||"").trim(),o=(t.subtitle||"").trim();return/多应用|安装介绍|一次选择并安装/.test(i+o)}_buildHeroSideCards(t){if(!(t!=null&&t.length))return[];const i=t.filter(s=>!this._isAppPackBanner(s)),o=i.length>=2?i:t;return o.length>=3?[o[0],{type:"split",left:o[1],right:o[2]}]:o.slice(0,2)}_getAppCollections(){var s,r;const t=[...((s=this.data)==null?void 0:s.collections)||[],...((r=this.homeData)==null?void 0:r.collections)||[]],i=new Set,o=[];for(const n of t){if(i.has(n.id)||(i.add(n.id),n.section_type==="collection_cards"))continue;const l=(n.products||[]).filter(d=>d.product_type==="app");l.length>0&&o.push({...n,products:l})}return o.sort((n,l)=>(n.display_order||0)-(l.display_order||0))}_getCollectionCards(){var s,r;const t=[...((s=this.data)==null?void 0:s.collections)||[],...((r=this.homeData)==null?void 0:r.collections)||[]],i=new Set(["creative-apps-collection","social-networking-collection","best-entertainment-apps","get-started","productivity-apps-collection","personalization-apps","widgets"]),o=t.filter(n=>n.section_type==="collection_cards"&&n.slug!=="collections"&&i.has(n.slug)).sort((n,l)=>(n.display_order||0)-(l.display_order||0)).map(n=>({name:n.name,subtitle:"",link_url:n.view_all_url||"#",image_url:n.hero_image||""}));return o.length===0?t.filter(n=>n.section_type==="collection_cards"&&n.slug!=="collections"&&n.display_order>10).sort((n,l)=>(n.display_order||0)-(l.display_order||0)).map(n=>({name:n.name,subtitle:"",link_url:n.view_all_url||"#",image_url:n.hero_image||""})):o}_isSocialSection(t){const i=(t.name||"").trim(),o=(t.slug||"").toLowerCase();return i==="社交網路應用程式"||o.includes("social")}_renderCollection(t){const i=this._prepareProducts(t);return t.section_type==="grid"?p`
        <ms-collection-grid
          .title=${t.name}
          .viewAllUrl=${t.view_all_url||""}
          .products=${i}
        ></ms-collection-grid>
      `:this._isSocialSection(t)?p`
        <ms-collection-row
          .title=${t.name}
          .viewAllUrl=${t.view_all_url||""}
          .products=${i}
          variant="social"
        ></ms-collection-row>
      `:t.section_type==="hero_cards"?p`
        <ms-collection-row
          .title=${t.name}
          .viewAllUrl=${t.view_all_url||""}
          .products=${i}
          variant="hero"
        ></ms-collection-row>
      `:p`
      <ms-collection-row
        .title=${t.name}
        .viewAllUrl=${t.view_all_url||""}
        .products=${i}
        variant="default"
      ></ms-collection-row>
    `}_renderTopFreeItem(t){const i=t.local_icon||t.icon_url||"",o=t.is_own_product&&t.custom_url?t.custom_url:t.original_url||"#",s=o.startsWith("/");return p`
      <a class="topfree-item" href=${o} ?data-nav=${s}
        rel=${s?"":"nofollow noopener"}
        target=${s?"_self":"_blank"}>
        <ms-lazy-img class="topfree-item-icon" src=${i} alt=${t.title||""} width="64px" height="64px" radius="12px"></ms-lazy-img>
        <div class="topfree-item-info">
          <div class="topfree-item-name">${t.title||""}</div>
          <div class="topfree-item-meta">
            <ms-rating .value=${t.rating||0}></ms-rating>
            <span>${t.category||""}</span>
          </div>
          <div class="topfree-item-price">免费下载</div>
        </div>
      </a>
    `}_renderTopFreeSection(t){const i=this._prepareProducts(t).slice(0,4),o=t.view_all_url||"#",s=Te._apppackIcons;return p`
      <div class="topfree-section">
        <div class="topfree-header">
          <div class="topfree-title-area">
            <a class="topfree-title-link" href=${o} data-nav>
              <h2 class="topfree-title">${t.name||"必备免费应用"}</h2>
              <span class="topfree-chevron">&#8250;</span>
            </a>
          </div>
        </div>
        <div class="dual-collection-layout">
          <div class="slot-left">
            <div class="topfree-grid">
              ${i.map(r=>this._renderTopFreeItem(r))}
            </div>
          </div>
          <div class="slot-right">
            <div class="apppack-banner" from-page="Apps">
              <a href="https://apps.microsoft.com/apppack" target="_blank" rel="nofollow noopener">
                <div class="apppack-text">
                  <span class="promo-title">多应用安装介绍</span>
                  <span class="promo-sub">一次选择并安装多个应用</span>
                </div>
                <div class="apppack-icons-area">
                  <div class="apppack-icons-scatter">
                    ${s.slice(0,7).map(r=>p`
                      <img class="apppack-icon" src=${r} alt="" loading="lazy" />
                    `)}
                  </div>
                  <div class="apppack-bottom">
                    <span class="apppack-selected-text">3 apps selected</span>
                    <span class="apppack-install-btn">Install</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    `}render(){var d,h,g,u;if(this.loading)return p`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;const t=((d=this.data)==null?void 0:d.heroBanners)||((h=this.homeData)==null?void 0:h.heroBanners)||[],i=((g=this.data)==null?void 0:g.featuredBanners)||((u=this.homeData)==null?void 0:u.featuredBanners)||[],o=this._buildHeroSideCards(i),s=this._getAppCollections(),r=this._getCollectionCards(),n=s[0]||null,l=n?s.slice(1):s;return p`
      ${t.length>0?p`
        <ms-hero-carousel .banners=${t} .sideCards=${o}></ms-hero-carousel>
      `:""}

      <div class="product-collections-wrap">
        ${n?this._renderTopFreeSection(n):""}
        ${l.map(f=>this._renderCollection(f))}
        ${r.length>0?p`
          <ms-collection-cards title="Collections" .cards=${r}></ms-collection-cards>
        `:""}
      </div>
    `}};R(Te,"properties",{data:{type:Object},homeData:{type:Object},loading:{type:Boolean}}),R(Te,"styles",k`
    :host {
      display: block;
      padding-bottom: 48px;
      background: transparent;
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;
    }
    .loading {
      text-align: center;
      padding: 120px 0;
      color: #767676;
      font-size: 16px;
    }
    .loading-spinner {
      display: inline-block;
      width: 32px; height: 32px;
      border: 3px solid #e5e5e5;
      border-top-color: #0067b8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .section-spacer { height: 48px; }
    .product-collections-wrap {
      display: flex;
      flex-direction: column;
      gap: 48px;
      width: 100%;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 48px auto 0;
      padding: 0 38px;
      box-sizing: border-box;
      min-width: 0;
      contain: layout style;
    }

    /* === dual-collection-layout: flex 50/50 with 12px gap === */
    .dual-collection-layout {
      display: flex;
      gap: 12px;
    }
    .dual-collection-layout .slot-left {
      flex: 1;
      min-width: 0;
    }
    .dual-collection-layout .slot-right {
      flex: 1;
      min-width: 0;
    }

    /* === Top Free section header === */
    .topfree-section { margin-bottom: 0; }
    .topfree-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .topfree-title-area {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .topfree-title-link {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      padding: 4px 8px;
      margin: -4px -8px;
      border-radius: 8px;
      transition: background-color 0.2s ease;
    }
    .topfree-title-link:hover { background-color: #e8ebeb; }
    .topfree-title {
      font-size: 20px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #1a1a1a;
      margin: 0;
    }
    .topfree-chevron {
      font-size: 12px;
      color: #1a1a1a;
      margin-left: 2px;
    }

    /* === 2x2 product grid (left slot) - each item is a separate white card === */
    .topfree-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .topfree-item {
      display: flex;
      align-items: center;
      gap: 0;
      padding: 12px 16px;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: background 0.15s, box-shadow 0.15s;
      min-height: 72px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid hsl(240 5.9% 90%);
    }
    .topfree-item:hover { 
      background: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .topfree-item-icon {
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      border-radius: 12px;
      object-fit: cover;
      background: #f5f5f5;
      margin-right: 12px;
    }
    .topfree-item-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .topfree-item-name {
      font-size: 13px;
      font-weight: 400;
      color: #1a1a1a;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .topfree-item-meta {
      font-size: 12px;
      color: #616161;
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      overflow: hidden;
    }
    .topfree-item-meta span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    .topfree-item-meta ms-rating {
      flex-shrink: 0;
    }
    .topfree-item-price {
      font-size: 12px;
      font-weight: 600;
      color: #0e7a0d;
    }

    /* === Apppack banner (right slot) === */
    .apppack-banner {
      display: flex;
      height: 100%;
      border-radius: 8px;
      overflow: hidden;
      background: linear-gradient(242.09deg, rgb(136, 196, 230) -8.22%, rgb(96, 201, 185) 98.66%);
    }
    .apppack-banner a {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 24px 32px;
      width: 100%;
      color: #fff;
      text-decoration: none;
      box-sizing: border-box;
      gap: 16px;
    }
    .apppack-text {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .apppack-banner .promo-title {
      font-size: 20px;
      font-weight: 600;
      color: rgb(255, 255, 255);
      margin: 0;
      line-height: 1.3;
    }
    .apppack-banner .promo-sub {
      font-size: 14px;
      color: rgb(255, 255, 255);
      margin: 4px 0 0;
      line-height: 1.4;
      opacity: 0.9;
    }
    .apppack-icons-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .apppack-icons-scatter {
      position: relative;
      width: 180px;
      height: 100px;
    }
    .apppack-icons-scatter .apppack-icon {
      position: absolute;
      border-radius: 10px;
      object-fit: cover;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18);
      background: #fff;
    }
    .apppack-icons-scatter .apppack-icon:nth-child(1) { width: 52px; height: 52px; top: 0; left: 72px; z-index: 7; }
    .apppack-icons-scatter .apppack-icon:nth-child(2) { width: 40px; height: 40px; top: 8px; left: 130px; z-index: 6; }
    .apppack-icons-scatter .apppack-icon:nth-child(3) { width: 36px; height: 36px; top: 2px; left: 28px; z-index: 5; }
    .apppack-icons-scatter .apppack-icon:nth-child(4) { width: 44px; height: 44px; top: 50px; left: 0; z-index: 4; }
    .apppack-icons-scatter .apppack-icon:nth-child(5) { width: 48px; height: 48px; top: 48px; left: 52px; z-index: 3; }
    .apppack-icons-scatter .apppack-icon:nth-child(6) { width: 38px; height: 38px; top: 56px; left: 108px; z-index: 2; }
    .apppack-icons-scatter .apppack-icon:nth-child(7) { width: 34px; height: 34px; top: 38px; left: 148px; z-index: 1; }
    .apppack-bottom {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 2px;
    }
    .apppack-selected-text {
      font-size: 12px;
      color: rgba(255,255,255,0.85);
      white-space: nowrap;
    }
    .apppack-install-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 16px;
      border-radius: 4px;
      background: #fff;
      color: #0067b8;
      font-size: 13px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      text-decoration: none;
      line-height: 1.4;
    }

    @media (max-width: 1200px) {
      .dual-collection-layout { flex-direction: column; }
      .apppack-banner a { padding: 20px 24px; }
    }
    @media (max-width: 900px) {
      .product-collections-wrap { margin: 32px 0 0; padding: 0 20px; gap: 28px; }
      .topfree-grid { grid-template-columns: 1fr; gap: 8px; }
      .topfree-item { padding: 12px 16px; min-height: 72px; }
      .topfree-item-icon { width: 56px; height: 56px; margin-right: 12px; }
      .apppack-icons-scatter { width: 140px; height: 80px; }
      .apppack-icons-scatter .apppack-icon:nth-child(1) { width: 44px; height: 44px; left: 56px; }
      .apppack-icons-scatter .apppack-icon:nth-child(2) { width: 32px; height: 32px; left: 106px; }
      .apppack-icons-scatter .apppack-icon:nth-child(3) { width: 30px; height: 30px; left: 18px; }
      .apppack-icons-scatter .apppack-icon:nth-child(4) { width: 36px; height: 36px; top: 44px; left: 0; }
      .apppack-icons-scatter .apppack-icon:nth-child(5) { width: 40px; height: 40px; top: 40px; left: 44px; }
      .apppack-icons-scatter .apppack-icon:nth-child(6) { width: 32px; height: 32px; top: 48px; left: 90px; }
      .apppack-icons-scatter .apppack-icon:nth-child(7) { width: 28px; height: 28px; top: 34px; left: 126px; }
    }
    @media (max-width: 600px) {
      :host { padding-bottom: 24px; }
      .loading { padding: 80px 0; }
      .product-collections-wrap { margin: 20px 0 0; padding: 0 14px; gap: 20px; }
      .topfree-title { font-size: 17px; }
      .topfree-item-name { font-size: 13px; }
      .apppack-banner a { padding: 16px 20px; flex-direction: column; align-items: flex-start; gap: 12px; }
      .apppack-banner .promo-title { font-size: 17px; }
      .apppack-banner .promo-sub { font-size: 13px; margin-top: 2px; }
      .apppack-icons-area { align-self: stretch; flex-direction: row; justify-content: space-between; align-items: center; gap: 8px; }
      .apppack-icons-scatter { width: 120px; height: 68px; flex-shrink: 0; }
      .apppack-icons-scatter .apppack-icon:nth-child(1) { width: 38px; height: 38px; top: 0; left: 44px; }
      .apppack-icons-scatter .apppack-icon:nth-child(2) { width: 28px; height: 28px; top: 6px; left: 88px; }
      .apppack-icons-scatter .apppack-icon:nth-child(3) { width: 26px; height: 26px; top: 2px; left: 10px; }
      .apppack-icons-scatter .apppack-icon:nth-child(4) { width: 32px; height: 32px; top: 36px; left: 0; }
      .apppack-icons-scatter .apppack-icon:nth-child(5) { width: 34px; height: 34px; top: 34px; left: 38px; }
      .apppack-icons-scatter .apppack-icon:nth-child(6) { width: 28px; height: 28px; top: 40px; left: 78px; }
      .apppack-icons-scatter .apppack-icon:nth-child(7) { display: none; }
      .apppack-bottom { flex-direction: column; align-items: flex-start; gap: 6px; margin-top: 0; }
      .apppack-install-btn { padding: 6px 20px; font-size: 13px; border-radius: 4px; }
    }
    @media (max-width: 400px) {
      .product-collections-wrap { padding: 0 10px; gap: 16px; }
      .apppack-icons-scatter { display: none; }
      .apppack-icons-area { flex-direction: column; align-items: flex-start; }
    }
  `),R(Te,"_apppackIcons",["/assets/images/apppack/sketchbook.png","/assets/images/apppack/acrobat.png","/assets/images/apppack/hulu.png","/assets/images/apppack/clipchamp.png","/assets/images/apppack/whatsapp.png","/assets/images/apppack/concepts.png","/assets/images/apppack/ibispaint.png"]);let Ro=Te;customElements.define("apps-page",Ro);const Ie=class Ie extends G{constructor(){super(),this.data=null,this.homeData=null,this.loading=!0}connectedCallback(){super.connectedCallback(),this._loadData()}async _loadData(){if(this.data){this.loading=!1,this._applySeo();return}try{const[t,i]=await Promise.all([ci("/api/games"),ci("/api/home")]);this.data=t,this.homeData=i}catch(t){console.error("Failed to load games data:",t)}this.loading=!1,this._applySeo()}_applySeo(){var i;if(!((i=this.data)!=null&&i.seo))return;const t=this.data.seo;ze({title:t.title,keywords:t.keywords,description:t.description})}_prepareProducts(t){return(t.products||[]).map(i=>({...i,icon_url:i.local_icon||i.icon_url||"",product_id:i.ms_id||i.id}))}_buildHeroSideCards(t){return t!=null&&t.length?t.length>=3?[t[0],{type:"split",left:t[1],right:t[2]}]:t.slice(0,2):[]}_getGameCollections(){var s,r;const t=[...((s=this.data)==null?void 0:s.collections)||[],...((r=this.homeData)==null?void 0:r.collections)||[]],i=new Set,o=[];for(const n of t){if(i.has(n.id)||(i.add(n.id),n.section_type==="collection_cards"))continue;const l=(n.products||[]).filter(d=>d.product_type==="game");l.length>0&&o.push({...n,products:l})}return o.sort((n,l)=>(n.display_order||0)-(l.display_order||0))}_getCollectionCards(){var s,r;const t=[...((s=this.data)==null?void 0:s.collections)||[],...((r=this.homeData)==null?void 0:r.collections)||[]],i=new Set(["xbox-play-anywhere","racing-games","kids-games","free-games"]),o=t.filter(n=>n.section_type==="collection_cards"&&n.slug!=="collections"&&i.has(n.slug)).sort((n,l)=>(n.display_order||0)-(l.display_order||0)).map(n=>({name:n.name,subtitle:"",link_url:n.view_all_url||"#",image_url:n.hero_image||""}));return o.length===0?t.filter(n=>n.section_type==="collection_cards"&&n.slug!=="collections"&&n.display_order>10).sort((n,l)=>(n.display_order||0)-(l.display_order||0)).map(n=>({name:n.name,subtitle:"",link_url:n.view_all_url||"#",image_url:n.hero_image||""})):o}_isTallGameSection(t){const i=(t.name||"").trim(),o=(t.slug||"").toLowerCase();return i==="最畅销的游戏"||i==="全新值得注目的電腦遊戲"||o==="top-grossing"||o==="new-pc-games"||o.includes("topgrossing")||o.includes("top-grossing")||o.includes("new-notable")||o.includes("new-pc")}_renderCollection(t){const i=this._prepareProducts(t);return t.section_type==="grid"&&this._isTallGameSection(t)?p`
        <ms-collection-row
          .title=${t.name}
          .viewAllUrl=${t.view_all_url||""}
          .products=${i}
          variant="tall"
        ></ms-collection-row>
      `:t.section_type==="grid"?p`
        <ms-collection-grid
          .title=${t.name}
          .viewAllUrl=${t.view_all_url||""}
          .products=${i}
        ></ms-collection-grid>
      `:p`
      <ms-collection-row
        .title=${t.name}
        .viewAllUrl=${t.view_all_url||""}
        .products=${i}
        variant=${t.section_type==="hero_cards"?"hero":"default"}
      ></ms-collection-row>
    `}_renderTopGamesItem(t){const i=t.local_icon||t.icon_url||"",o=t.is_own_product&&t.custom_url?t.custom_url:t.original_url||"#",s=o.startsWith("/"),r=t.price_type==="free"||t.price==="免费"||t.price==="Free"||t.price==="免费下载",n=r?"免费下载":t.price||"";return p`
      <a class="topgames-item" href=${o} ?data-nav=${s}
        rel=${s?"":"nofollow noopener"} ?target=${s?"":"_blank"}>
        <ms-lazy-img class="topgames-item-icon" src=${i} alt=${t.title||""} width="64px" height="64px" radius="8px"></ms-lazy-img>
        <div class="topgames-item-info">
          <div class="topgames-item-name">${t.title||""}</div>
          <div class="topgames-item-meta">
            <ms-rating .value=${t.rating||0}></ms-rating>
            <span>${t.category||""}</span>
          </div>
          <div class="topgames-item-price ${r?"free":""}">${n}</div>
        </div>
      </a>
    `}_renderTopGamesSection(t){const i=this._prepareProducts(t).slice(0,4),o=t.view_all_url||"#",s=Ie._gamepackIcons;return p`
      <div class="topgames-section">
        <div class="topgames-header">
          <div class="topgames-title-area">
            <a class="topgames-title-link" href=${o} data-nav>
              <h2 class="topgames-title">${t.name||"热门游戏"}</h2>
              <span class="topgames-chevron">&#8250;</span>
            </a>
          </div>
        </div>
        <div class="dual-collection-layout">
          <div class="slot-left">
            <div class="topgames-grid">
              ${i.map(r=>this._renderTopGamesItem(r))}
            </div>
          </div>
          <div class="slot-right">
            <div class="gamepass-banner">
              <a href="https://www.xbox.com/xbox-game-pass" target="_blank" rel="nofollow noopener">
                <div class="gamepass-text">
                  <div class="promo-badge">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    GAME PASS
                  </div>
                  <span class="promo-title">Xbox Game Pass</span>
                  <span class="promo-sub">畅玩数百款高品质游戏</span>
                </div>
                <div class="gamepass-icons-area">
                  <div class="gamepass-icons-scatter">
                    ${s.slice(0,7).map(r=>p`
                      <img class="gamepass-icon" src=${r} alt="" loading="lazy" />
                    `)}
                  </div>
                  <div class="gamepass-bottom">
                    <span class="gamepass-selected-text">100+ games</span>
                    <span class="gamepass-join-btn">Join now</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    `}render(){var d,h,g,u;if(this.loading)return p`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;const t=((d=this.data)==null?void 0:d.heroBanners)||((h=this.homeData)==null?void 0:h.heroBanners)||[],i=((g=this.data)==null?void 0:g.featuredBanners)||((u=this.homeData)==null?void 0:u.featuredBanners)||[],o=this._buildHeroSideCards(i),s=this._getGameCollections(),r=this._getCollectionCards(),n=s[0]||null,l=n?s.slice(1):s;return p`
      ${t.length>0?p`
        <ms-hero-carousel .banners=${t} .sideCards=${o}></ms-hero-carousel>
        <div class="section-spacer"></div>
      `:""}

      <div class="product-collections-wrap">
        ${n?this._renderTopGamesSection(n):""}
        ${l.map(f=>this._renderCollection(f))}
        ${r.length>0?p`
          <ms-collection-cards title="Collections" .cards=${r}></ms-collection-cards>
        `:""}
      </div>
    `}};R(Ie,"properties",{data:{type:Object},homeData:{type:Object},loading:{type:Boolean}}),R(Ie,"styles",k`
    :host {
      display: block;
      padding-bottom: 48px;
      background: transparent;
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    .loading {
      text-align: center;
      padding: 200px 0;
      color: #767676;
      font-size: 16px;
    }
    .loading-spinner {
      display: inline-block;
      width: 32px; height: 32px;
      border: 3px solid #e5e5e5;
      border-top-color: #0067b8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .section-spacer { height: 48px; }
    .product-collections-wrap {
      display: flex;
      flex-direction: column;
      gap: 48px;
      width: 100%;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 48px auto 0;
      padding: 0 38px;
      box-sizing: border-box;
      min-width: 0;
    }

    /* === dual-collection-layout: flex 50/50 with 12px gap === */
    .dual-collection-layout {
      display: flex;
      gap: 12px;
    }
    .dual-collection-layout .slot-left {
      flex: 1;
      min-width: 0;
    }
    .dual-collection-layout .slot-right {
      flex: 1;
      min-width: 0;
    }

    /* === Top Games section header === */
    .topgames-section { margin-bottom: 0; }
    .topgames-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .topgames-title-area {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .topgames-title-link {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      padding: 4px 8px;
      margin: -4px -8px;
      border-radius: 8px;
      transition: background-color 0.2s ease;
    }
    .topgames-title-link:hover { background-color: #e8ebeb; }
    .topgames-title {
      font-size: 20px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #1a1a1a;
      margin: 0;
    }
    .topgames-chevron {
      font-size: 12px;
      color: #1a1a1a;
      margin-left: 2px;
    }

    /* === 2x2 product grid - each item is a separate white card === */
    .topgames-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .topgames-item {
      display: flex;
      align-items: center;
      gap: 0;
      padding: 12px 16px;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: background 0.15s, box-shadow 0.15s;
      min-height: 72px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid hsl(240 5.9% 90%);
    }
    .topgames-item:hover { 
      background: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .topgames-item-icon {
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      border-radius: 8px;
      object-fit: cover;
      background: #f5f5f5;
      margin-right: 12px;
    }
    .topgames-item-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .topgames-item-name {
      font-size: 13px;
      font-weight: 400;
      color: #1a1a1a;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .topgames-item-meta {
      font-size: 12px;
      color: #616161;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .topgames-item-price {
      font-size: 12px;
      font-weight: 600;
      color: #1a1a1a;
    }
    .topgames-item-price.free {
      color: #0e7a0d;
    }

    /* === Game Pass banner (right slot) === */
    .gamepass-banner {
      display: flex;
      height: 100%;
      border-radius: 8px;
      overflow: hidden;
      background: linear-gradient(135deg, #107c10 0%, #0b5c0b 100%);
    }
    .gamepass-banner a {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 24px 32px;
      width: 100%;
      color: #fff;
      text-decoration: none;
      box-sizing: border-box;
      gap: 16px;
    }
    .gamepass-text {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .gamepass-banner .promo-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .gamepass-banner .promo-badge svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
    .gamepass-banner .promo-title {
      font-size: 20px;
      font-weight: 600;
      color: rgb(255, 255, 255);
      margin: 0;
      line-height: 1.3;
    }
    .gamepass-banner .promo-sub {
      font-size: 14px;
      color: rgb(255, 255, 255);
      margin: 4px 0 0;
      line-height: 1.4;
      opacity: 0.9;
    }
    .gamepass-icons-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .gamepass-icons-scatter {
      position: relative;
      width: 180px;
      height: 100px;
    }
    .gamepass-icons-scatter .gamepass-icon {
      position: absolute;
      border-radius: 10px;
      object-fit: cover;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      background: #fff;
    }
    .gamepass-icons-scatter .gamepass-icon:nth-child(1) { width: 52px; height: 52px; top: 0; left: 72px; z-index: 7; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(2) { width: 40px; height: 40px; top: 8px; left: 130px; z-index: 6; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(3) { width: 36px; height: 36px; top: 2px; left: 28px; z-index: 5; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(4) { width: 44px; height: 44px; top: 50px; left: 0; z-index: 4; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(5) { width: 48px; height: 48px; top: 48px; left: 52px; z-index: 3; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(6) { width: 38px; height: 38px; top: 56px; left: 108px; z-index: 2; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(7) { width: 34px; height: 34px; top: 38px; left: 148px; z-index: 1; }
    .gamepass-bottom {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 2px;
    }
    .gamepass-selected-text {
      font-size: 12px;
      color: rgba(255,255,255,0.85);
      white-space: nowrap;
    }
    .gamepass-join-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 16px;
      border-radius: 4px;
      background: #fff;
      color: #107c10;
      font-size: 13px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      text-decoration: none;
      line-height: 1.4;
    }

    @media (max-width: 1200px) {
      .dual-collection-layout { flex-direction: column; }
      .gamepass-banner a { padding: 20px 24px; }
    }
    @media (max-width: 900px) {
      .product-collections-wrap { margin: 32px 24px 0; padding: 0 24px; gap: 32px; }
      .topgames-grid { grid-template-columns: 1fr; }
      .gamepass-icons-scatter { width: 140px; height: 80px; }
    }
    @media (max-width: 600px) {
      .product-collections-wrap { margin: 24px 16px 0; padding: 0 16px; gap: 24px; }
      .gamepass-banner a { padding: 16px; flex-direction: column; text-align: center; }
      .gamepass-icons-area { align-self: center; }
      :host { padding-bottom: 24px; }
    }
  `),R(Ie,"_gamepackIcons",["/assets/images/gamepack/minecraft.png","/assets/images/gamepack/gta5.png","/assets/images/gamepack/forza5.png","/assets/images/gamepack/mcdungeons.png","/assets/images/gamepack/flightsim.png","/assets/images/gamepack/forza5premium.png","/assets/images/gamepack/mcdeluxe.png"]);let Mo=Ie;customElements.define("games-page",Mo);class Dr extends G{connectedCallback(){super.connectedCallback(),this._applySeo()}async _applySeo(){try{const t=await fetch("/api/about");if(t.ok){const i=await t.json();i!=null&&i.seo&&ze({title:i.seo.title,keywords:i.seo.keywords,description:i.seo.description})}}catch{}}render(){return p`
      <div class="hero">
        <div class="hero-content">
          <h1 class="hero-title">你想要的一切，尽在其中</h1>
          <a class="hero-btn" href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank" rel="nofollow noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M7.5 1H1v6.5h6.5V1zM8.5 1v6.5H15V1H8.5zM1 8.5V15h6.5V8.5H1zM8.5 8.5V15H15V8.5H8.5z"/>
            </svg>
            打开 Microsoft Store 应用
          </a>
          <p class="hero-sub">
            如果设备上没有 Microsoft Store 应用，<a href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank" rel="nofollow noopener noreferrer">单击此处</a>立即下载。
          </p>
        </div>
        <div class="hero-visual">
          <div class="hero-visual-inner">
            <img src="/assets/images/about-store-hero.jpg" alt="Microsoft Store 应用" />
          </div>
        </div>
      </div>

      <div class="icon-carousel">
        <div class="icon-row">
          <div class="icon-item" style="background: linear-gradient(135deg, #E1306C, #F77737);"></div>
          <div class="icon-item" style="background: linear-gradient(135deg, #25D366, #128C7E);"></div>
          <div class="icon-item" style="background: linear-gradient(135deg, #00F2EA, #FF0050);"></div>
          <div class="icon-item" style="background: linear-gradient(135deg, #5865F2, #7289DA);"></div>
          <div class="icon-item" style="background: linear-gradient(135deg, #FF0000, #CC0000);"></div>
          <div class="icon-item" style="background: linear-gradient(135deg, #1DA1F2, #0d8bd9);"></div>
        </div>
        <h2 class="carousel-title">适用于工作和娱乐的应用和游戏</h2>
        <p class="carousel-desc">
          找到你喜爱的应用。放松心情，释放你的创造力和生产力。
        </p>
        <p class="carousel-note">设备上没有 Microsoft Store 应用?</p>
        <a class="carousel-btn" href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank" rel="nofollow noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1v10l4-4-4-4V1zM3 2v12h10V2H3z"/>
          </svg>
          下载 Microsoft Store 应用
        </a>
      </div>

      <div class="panels">
        <div class="panel panel-discover">
          <div class="panel-content">
            <h2 class="panel-title">发现</h2>
            <p class="panel-desc">
              在心仪的流媒体应用中收看剧集，用创意软件创作数字艺术，或借助强大的效率工具完成工作
            </p>
            <a class="panel-btn" href="/apps" data-nav>探索应用</a>
          </div>
          <div class="panel-visual">
            <img src="/assets/images/about-discover-decoration.png" alt="发现应用" />
          </div>
        </div>

        <div class="panel panel-gaming">
          <div class="panel-visual">
            <img src="/assets/images/about-desktop-gaming.webp" alt="桌面游戏" />
          </div>
          <div class="panel-content">
            <h2 class="panel-title">桌面游戏</h2>
            <p class="panel-desc">
              游玩来自获奖独立游戏开发者及 AAA 发行商的 PC 游戏
            </p>
            <a class="panel-btn" href="/games" data-nav>探索游戏</a>
          </div>
        </div>
      </div>

      <div class="footnotes">
        <p class="footnote"><sup>[+]</sup>模拟画面。功能和应用可用性可能根据地区变化。应用、游戏及其它内容或订阅需分别购买；免费应用可能包含广告或应用内购买。</p>
        <p class="footnote"><sup>[1]</sup>仅适用于所选区域。 <a href="https://www.microsoft.com/servicesagreement/" target="_blank" rel="nofollow noopener noreferrer">使用条款</a></p>
        <p class="footnote"><sup>[2]</sup>仅适用于所选区域。</p>
        <p class="footnote"><sup>[3]</sup>安全付款方式依赖于所选内容和应用。</p>
        <p class="footnote"><sup>[4]</sup>在 Store 中上架但由开发者自行分发的应用由开发者自行负责更新。</p>
      </div>
    `}}R(Dr,"styles",k`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      padding-bottom: 60px;
      color: #131316;
      background: #fff;
      overflow-x: hidden;
      box-sizing: border-box;
    }

    /* Hero section - two-column layout */
    .hero {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 40px 60px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: -20%;
      right: -10%;
      width: 70%;
      height: 140%;
      background: radial-gradient(ellipse 60% 50% at 70% 30%, rgba(255, 105, 135, 0.35) 0%, transparent 60%),
        radial-gradient(ellipse 50% 60% at 80% 60%, rgba(255, 165, 0, 0.25) 0%, transparent 55%),
        radial-gradient(ellipse 55% 45% at 60% 80%, rgba(100, 149, 237, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse 40% 50% at 90% 20%, rgba(147, 112, 219, 0.2) 0%, transparent 45%);
      pointer-events: none;
      z-index: 0;
    }
    .hero-content {
      position: relative;
      z-index: 1;
    }
    .hero-title {
      font-size: 46px;
      font-weight: 700;
      margin: 0 0 24px;
      line-height: 1.2;
      background: linear-gradient(180deg, #0078D4 0%, #005FB8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      border-radius: 4px;
      background: #0078D4;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s;
    }
    .hero-btn:hover {
      background: #006cbd;
    }
    .hero-btn svg {
      flex-shrink: 0;
    }
    .hero-sub {
      margin-top: 20px;
      font-size: 14px;
      color: #616161;
    }
    .hero-sub a {
      color: #0078D4;
      text-decoration: none;
    }
    .hero-sub a:hover {
      text-decoration: underline;
    }
    .hero-visual {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .hero-visual-inner {
      position: relative;
      width: 100%;
      max-width: 480px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
    }
    .hero-visual-inner img {
      width: 100%;
      height: auto;
      min-height: 280px;
      object-fit: cover;
      display: block;
      border-radius: 12px;
    }

    /* Icon carousel section */
    .icon-carousel {
      max-width: 1200px;
      margin: 0 auto;
      padding: 64px 40px;
      text-align: center;
    }
    .icon-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .icon-item {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .carousel-title {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 16px;
      color: #131316;
    }
    .carousel-desc {
      font-size: 15px;
      color: #616161;
      line-height: 1.7;
      margin: 0 0 24px;
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }
    .carousel-note {
      font-size: 13px;
      color: #767676;
      margin: 0 0 20px;
    }
    .carousel-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      border-radius: 4px;
      background: #0078D4;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s;
    }
    .carousel-btn:hover {
      background: #006cbd;
    }

    /* Full-width feature panels */
    .panels {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 40px 40px;
    }
    .panel {
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
      min-height: 320px;
    }
    .panel-discover {
      background: linear-gradient(135deg, #6B4EAA 0%, #4A7FD4 50%, #3B6BB5 100%);
      padding: 48px 56px;
    }
    .panel-gaming {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      padding: 48px 56px;
    }
    .panel-content {
      color: #fff;
    }
    .panel-title {
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 16px;
      color: #fff;
    }
    .panel-desc {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.7;
      margin: 0 0 24px;
    }
    .panel-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      border-radius: 4px;
      background: #fff;
      color: #0078D4;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s, color 0.15s;
    }
    .panel-btn:hover {
      background: #f0f0f0;
      color: #006cbd;
    }
    .panel-visual {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .panel-visual img {
      max-width: 100%;
      max-height: 280px;
      object-fit: contain;
      border-radius: 8px;
    }
    .panel-gaming .panel-visual {
      justify-content: flex-start;
    }
    .panel-gaming .panel-visual img {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    /* Footnotes */
    .footnotes {
      max-width: 1200px;
      margin: 40px auto 0;
      padding: 0 40px;
      border-top: 1px solid #e5e5e5;
      padding-top: 24px;
    }
    .footnote {
      font-size: 12px;
      color: #767676;
      line-height: 1.6;
      margin-bottom: 8px;
    }
    .footnote a {
      color: #0078D4;
      text-decoration: none;
    }
    .footnote a:hover {
      text-decoration: underline;
    }
    .footnote sup {
      font-size: 10px;
      margin-right: 4px;
    }

    @media (max-width: 900px) {
      .hero {
        grid-template-columns: 1fr;
        padding: 48px 24px 40px;
        text-align: center;
      }
      .hero::before {
        top: -10%;
        right: -30%;
        width: 100%;
        height: 80%;
      }
      .hero-visual {
        justify-content: center;
      }
      .hero-title {
        font-size: 36px;
      }
      .icon-carousel {
        padding: 48px 24px;
      }
      .panels {
        padding: 0 24px 24px;
      }
      .panel {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 32px 24px;
        text-align: center;
      }
      .panel-gaming .panel-visual {
        justify-content: center;
        order: -1;
      }
      .footnotes {
        padding: 0 24px;
      }
    }
    @media (max-width: 600px) {
      .hero { padding: 32px 16px 28px; }
      .hero-title { font-size: 28px; }
      .hero-btn { padding: 10px 20px; font-size: 13px; }
      .hero-visual-inner { max-width: 100%; }
      .icon-carousel { padding: 32px 16px; }
      .carousel-title { font-size: 20px; }
      .panels { padding: 0 16px 16px; }
      .panel { padding: 24px 16px; gap: 20px; }
      .panel-title { font-size: 22px; }
      .footnotes { padding: 0 16px; }
      .footnote { font-size: 12px; }
    }
  `);customElements.define("about-page",Dr);class Fo extends G{constructor(){super(),this.productId="",this.customUrl="",this.data=null,this.relatedProducts=[],this.loading=!0,this.descriptionExpanded=!1,this.reviewData=null,this.reviewsExpanded=!1}connectedCallback(){super.connectedCallback(),this._loadData()}updated(t){(t.has("productId")&&this.productId||t.has("customUrl")&&this.customUrl)&&this._loadData()}_scrollScreenshots(t){const i=this.shadowRoot.querySelector(".screenshots-row");if(!i)return;const o=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,s=Math.max(240,Math.round(i.clientWidth*.85));i.scrollBy({left:t*s,behavior:o?"auto":"smooth"})}_toggleDescription(){this.descriptionExpanded=!this.descriptionExpanded}_onScreenshotsScroll(){const t=this.shadowRoot.querySelector(".screenshots-row");if(!t)return;const i=this.shadowRoot.querySelector(".screenshots-nav.prev"),o=this.shadowRoot.querySelector(".screenshots-nav.next");if(i&&i.classList.toggle("hidden",t.scrollLeft<=0),o){const s=t.scrollWidth-t.clientWidth;o.classList.toggle("hidden",t.scrollLeft>=s-5)}}firstUpdated(){super.firstUpdated&&super.firstUpdated(),setTimeout(()=>this._onScreenshotsScroll(),100)}async _loadData(){if(!this.productId&&!this.customUrl){this.loading=!1;return}this.loading=!0;try{let t;this.customUrl?t=`/api/product-by-url?url=${encodeURIComponent(this.customUrl)}`:t=`/api/product/${this.productId}`;const i=await fetch(t);if(i.ok){const o=await i.json();this.data=o,o.id&&(this._loadRelatedProducts(o.id),this._loadReviews(o.id))}else this.data=null}catch(t){console.error("Failed to load product:",t),this.data=null}this.loading=!1,this.data&&this._updatePageMeta()}_updatePageMeta(){const t=this.data;ze({title:t.custom_title||t.title||"Microsoft Store",keywords:t.custom_keywords||"",description:t.custom_description||t.description||""})}async _loadRelatedProducts(t){try{const i=await fetch(`/api/product/${t}/related`);i.ok&&(this.relatedProducts=await i.json())}catch(i){console.error("Failed to load related products:",i)}}async _loadReviews(t){try{const i=await fetch(`/api/product/${t}/reviews`);i.ok&&(this.reviewData=await i.json())}catch(i){console.error("Failed to load reviews:",i)}}_toggleReviews(){this.reviewsExpanded=!this.reviewsExpanded}_onDownloadClick(t){if(!this.data)return;const o=`/api/product/${this.data.ms_id||this.data.id}/download-click`;navigator.sendBeacon?navigator.sendBeacon(o):fetch(o,{method:"POST",keepalive:!0}).catch(()=>{})}_getDownloadUrl(){return this.data?this.data.custom_download_url?this.data.custom_download_url:this.data.ms_id?`https://get.microsoft.com/installer/download/${this.data.ms_id}?hl=zh-cn&gl=hk`:this.data.original_url?this.data.original_url:`https://apps.microsoft.com/detail/${this.data.ms_id}?hl=zh-CN&gl=HK`:"#"}_getMsStoreUrl(){return this.data?`https://apps.microsoft.com/detail/${this.data.ms_id}?hl=zh-CN&gl=HK`:"#"}_normalizeScreenshotMeta(t,i=""){const o={logoAlt:(i||"").trim(),items:[]};if(!t)return o;let s=t;if(typeof t=="string")try{s=JSON.parse(t||"[]")}catch{s=[]}let r=[];return Array.isArray(s)?r=s:s&&Array.isArray(s.items)&&(r=s.items,typeof s.logo_alt=="string"&&s.logo_alt.trim()&&(o.logoAlt=s.logo_alt.trim())),o.items=r.map(n=>{if(typeof n=="string"){const l=n.trim();return l?{url:l,alt:""}:null}if(n&&typeof n=="object"){const l=String(n.url||"").trim();return l?{url:l,alt:String(n.alt||"").trim()}:null}return null}).filter(Boolean),o}_renderPrice(){const t=this.data;return t?t.price_type==="free"||!t.price?p`<span class="price-free">免费</span>`:t.price_type==="discount"&&t.original_price?p`
        <span class="price-original">${t.original_price}</span>
        <span class="price-paid">${t.price}</span>
        ${t.discount_percent?p`<span class="discount-badge">${t.discount_percent}</span>`:""}
      `:p`<span class="price-paid">${t.price}</span>`:""}_getRelatedProductUrl(t){return t.is_own_product&&t.custom_url?t.custom_url:`https://apps.microsoft.com/detail/${t.related_ms_id}?hl=zh-CN&gl=HK`}_renderReviews(){if(!this.reviewData||!this.reviewData.reviews||this.reviewData.reviews.length===0)return"";const{reviews:t,avg_rating:i,total_count:o,distribution:s}=this.reviewData,r=s&&typeof s=="object"?s:{},n=p`<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;return p`
      <div class="reviews-section">
        <div class="reviews-header">
          <h3>评分和评价</h3>
        </div>
        <div class="reviews-summary">
          <div class="reviews-score">
            <div class="big-number">${i}</div>
            <div class="total-count">${o} 个评级</div>
          </div>
          <div class="reviews-bars">
            ${[5,4,3,2,1].map(l=>{const d=Number(r[l]??r[String(l)]??0),h=o>0?d/o*100:0;return p`
                <div class="bar-row">
                  <div class="bar-label">${l}${n}</div>
                  <div class="bar-track"><div class="bar-fill" style="width:${h}%"></div></div>
                  <span class="bar-count">${d}</span>
                </div>
              `})}
          </div>
        </div>
        <div class="reviews-list-wrapper">
          <div class="reviews-list ${this.reviewsExpanded?"expanded":""}">
            ${t.map(l=>{const d=Math.min(5,Math.max(0,Math.round(Number(l.rating)||0)));return p`
              <div class="review-item">
                <div class="review-top">
                  <span class="review-rating">${l.rating} ${Array.from({length:d},()=>n)}</span>
                  <span class="review-title">${l.title}</span>
                </div>
                <div class="review-content">${l.content}</div>
                <div class="review-meta">
                  <span class="review-author">${l.author_name}</span>
                  <span>${l.created_at?l.created_at.split(" ")[0]:""}</span>
                  <span class="review-helpful">
                    <span><svg viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg> ${l.helpful_count||0}</span>
                    <span><svg viewBox="0 0 24 24"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/></svg> ${l.unhelpful_count||0}</span>
                  </span>
                </div>
              </div>
            `})}
          </div>
          ${t.length>2?p`
            <button type="button" class="reviews-toggle ${this.reviewsExpanded?"expanded":""}" @click=${this._toggleReviews}>
              ${this.reviewsExpanded?"收起":"阅读更多信息"}
              <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
            </button>
          `:""}
        </div>
      </div>
    `}_renderRelatedProducts(){return!this.relatedProducts||this.relatedProducts.length===0?"":p`
      <div class="related-section">
        <div class="related-header">
          <h3>发现更多</h3>
        </div>
        <div class="related-grid">
          ${this.relatedProducts.map(t=>{const i=this._getRelatedProductUrl(t),o=t.is_own_product&&t.custom_url;return p`
              <a class="related-card" href=${i} ?data-nav=${o}
                ?target=${o?"":"_blank"} rel=${o?"":"nofollow noopener"}>
                <img class="related-icon" src=${t.related_icon_url||""} alt=${t.related_title} loading="lazy" />
                <div class="related-title">${t.related_title}</div>
                <div class="related-meta">
                  ${t.related_rating?p`<span>${t.related_rating}</span>`:""}
                </div>
                <div class="related-category">${t.related_category}</div>
                <div class="related-price">${t.related_price||"免费下载"}</div>
              </a>
            `})}
        </div>
      </div>
    `}render(){if(this.loading)return p`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;if(!this.data||this.data.error)return p`
        <div class="not-found">
          <h2>未找到产品</h2>
          <p>该产品不存在或已下架。</p>
          <a href="/" data-nav>返回首页</a>
        </div>
      `;const t=this.data,i=t.local_icon||t.icon_url||"",o=t.title,s=this._normalizeScreenshotMeta(t.screenshots,o),r=s.items,n=s.logoAlt||o;return p`
      <div class="detail-container">
        <div class="detail-header">
          <img class="product-icon" src=${i} alt=${n} />
          <div class="header-info">
            <h1 class="product-title">${o}</h1>
            ${t.developer?p`
              <div class="product-developer">
                <a href="https://apps.microsoft.com/search/publisher?name=${encodeURIComponent(t.developer)}&hl=zh-CN&gl=HK" target="_blank" rel="nofollow noopener">${t.developer}</a>
              </div>
            `:""}
            ${t.category?p`<div class="product-category">${t.category}</div>`:""}
            ${t.rating?p`
              <div class="rating-row">
                <ms-rating .value=${parseFloat(t.rating)}></ms-rating>
                <span class="rating-value">${t.rating}</span>
                ${t.rating_count?p`<span class="rating-count">${t.rating_count} 个评级</span>`:""}
              </div>
            `:""}
            <div class="action-row">
              <a class="get-btn" href=${this._getDownloadUrl()} target="_blank" rel="nofollow noopener" @click=${this._onDownloadClick}>
                ${t.price_type==="free"||!t.price?"下载":"获取"}
              </a>
              ${t.has_gamepass?p`<span class="gamepass-badge">Game Pass</span>`:""}
            </div>
            ${t.age_rating?p`
              <div class="age-rating">
                ${t.age_rating_icon?p`<img class="age-rating-icon" src=${t.age_rating_icon} alt=${t.age_rating} />`:""}
                <span class="age-rating-text">${t.age_rating}</span>
              </div>
            `:""}
          </div>
        </div>

        ${r.length>0?p`
          <div class="screenshots">
            <h3>屏幕截图</h3>
            <div class="screenshots-container">
              <button type="button" class="screenshots-nav prev" aria-label="查看上一张截图" @click=${this._scrollScreenshots.bind(this,-1)}>
                <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
              </button>
              <div class="screenshots-row" @scroll=${this._onScreenshotsScroll}>
                ${r.map(l=>p`<img class="screenshot-img" src=${l.url} alt=${l.alt||o} loading="lazy" />`)}
              </div>
              <button type="button" class="screenshots-nav next" aria-label="查看下一张截图" @click=${this._scrollScreenshots.bind(this,1)}>
                <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
              </button>
            </div>
          </div>
        `:""}

        <div class="detail-body">
          <div class="main-content">
            <div class="section">
              <h3>说明</h3>
              <div class="description-wrapper">
                <div class="description-text ${this.descriptionExpanded?"expanded":""}">${t.description||"暂无描述信息。"}</div>
                <button type="button" class="description-toggle ${this.descriptionExpanded?"expanded":""}" @click=${this._toggleDescription}>
                  ${this.descriptionExpanded?"收起":"展开更多"}
                  <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
                </button>
              </div>
            </div>

            ${t.whats_new?p`
              <div class="section">
                <h3>此版本中的新增功能</h3>
                <div class="whats-new">
                  <div class="whats-new-text">${t.whats_new}</div>
                </div>
              </div>
            `:""}
          </div>

          <div class="sidebar">
            <div class="info-card">
              <h4>其他信息</h4>
              ${t.developer?p`
                <div class="info-row">
                  <span class="info-label">发布者</span>
                  <span class="info-value">${t.developer}</span>
                </div>
              `:""}
              ${t.last_update?p`
                <div class="info-row">
                  <span class="info-label">上次更新日期</span>
                  <span class="info-value">${t.last_update}</span>
                </div>
              `:""}
              ${t.release_date?p`
                <div class="info-row">
                  <span class="info-label">发布日期</span>
                  <span class="info-value">${t.release_date}</span>
                </div>
              `:""}
              ${t.app_size?p`
                <div class="info-row">
                  <span class="info-label">近似大小</span>
                  <span class="info-value">${t.app_size}</span>
                </div>
              `:""}
              ${t.category?p`
                <div class="info-row">
                  <span class="info-label">类别</span>
                  <span class="info-value">${t.category}</span>
                </div>
              `:""}
              <div class="info-row">
                <span class="info-label">类型</span>
                <span class="info-value">${t.product_type==="game"?"游戏":"应用"}</span>
              </div>
              ${t.supported_languages?p`
                <div class="info-row">
                  <span class="info-label">支持的语言</span>
                  <span class="info-value">${t.supported_languages}</span>
                </div>
              `:""}
            </div>

            <div class="info-card">
              <h4>发行商信息</h4>
              ${t.publisher_support?p`
                <div class="info-row">
                  <a class="info-link" href=${t.publisher_support} target="_blank" rel="nofollow noopener">支持</a>
                </div>
              `:""}
              ${t.publisher_website?p`
                <div class="info-row">
                  <a class="info-link" href=${t.publisher_website} target="_blank" rel="nofollow noopener">网站</a>
                </div>
              `:""}
              ${t.privacy_policy_url?p`
                <div class="info-row">
                  <a class="info-link" href=${t.privacy_policy_url} target="_blank" rel="nofollow noopener">隐私政策</a>
                </div>
              `:""}
              <div class="info-row">
                <a class="info-link" href=${this._getMsStoreUrl()} target="_blank" rel="nofollow noopener">在 Microsoft Store 中查看 ›</a>
              </div>
            </div>
          </div>
        </div>

        ${this._renderReviews()}

        ${this._renderRelatedProducts()}
      </div>
    `}}R(Fo,"properties",{productId:{type:String},customUrl:{type:String},data:{type:Object},relatedProducts:{type:Array},loading:{type:Boolean},descriptionExpanded:{type:Boolean},reviewData:{type:Object},reviewsExpanded:{type:Boolean}}),R(Fo,"styles",k`
    :host {
      display: block;
      padding-bottom: 60px;
      background: #fff;
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    :host * {
      box-sizing: border-box;
    }
    img {
      max-width: 100%;
    }

    .loading {
      text-align: center;
      padding: 200px 0;
      color: #767676;
      font-size: 16px;
    }
    .loading-spinner {
      display: inline-block;
      width: 32px; height: 32px;
      border: 3px solid #e5e5e5;
      border-top-color: #0067b8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .not-found {
      text-align: center;
      padding: 200px 0;
      color: #767676;
    }
    .not-found h2 { color: #131316; margin-bottom: 16px; }
    .not-found a {
      color: #0067b8;
      text-decoration: none;
    }
    .not-found a:hover { text-decoration: underline; }

    .detail-container {
      max-width: 1200px;
      width: 100%;
      min-width: 0;
      margin: 0 auto;
      padding: 32px 40px;
      box-sizing: border-box;
    }

    .detail-header {
      display: flex;
      align-items: flex-start;
      gap: 32px;
      margin-bottom: 40px;
    }
    .product-icon {
      width: 128px;
      height: 128px;
      border-radius: 16px;
      object-fit: cover;
      flex-shrink: 0;
      background: #f3f3f3;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    }
    .header-info {
      flex: 1;
      min-width: 0;
    }
    .product-title {
      font-size: 28px;
      font-weight: 700;
      color: #131316;
      margin: 0 0 8px;
      line-height: 1.2;
    }
    .product-developer {
      font-size: 14px;
      color: #0067b8;
      margin-bottom: 8px;
    }
    .product-developer a {
      color: inherit;
      text-decoration: none;
      overflow-wrap: anywhere;
    }
    .product-developer a:hover { text-decoration: underline; }
    .product-category {
      font-size: 13px;
      color: #616161;
      margin-bottom: 12px;
    }
    .rating-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 16px;
    }
    .rating-value {
      font-size: 14px;
      color: #616161;
    }
    .rating-count {
      font-size: 13px;
      color: #767676;
    }

    .action-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 12px;
    }
    .get-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: 10px 40px;
      border-radius: 6px;
      border: none;
      background: #0067b8;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
      text-decoration: none;
    }
    .get-btn:hover { background: #005a9e; }
    .get-btn:active { background: #004c87; }
    .store-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: 10px 20px;
      border-radius: 6px;
      border: 1px solid #0067b8;
      background: transparent;
      color: #0067b8;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      text-decoration: none;
    }
    .store-btn:hover { background: #f0f6fc; }

    .price-display {
      font-size: 18px;
      font-weight: 600;
    }
    .price-free { color: #0e7a0d; }
    .price-paid { color: #131316; }
    .price-original {
      text-decoration: line-through;
      color: #767676;
      font-size: 14px;
      margin-right: 8px;
    }
    .discount-badge {
      background: #c42b1c;
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 4px;
      margin-left: 8px;
    }
    .gamepass-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      align-self: center;
      background: #107c10;
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 4px;
    }

    .age-rating {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }
    .age-rating-icon {
      width: 32px;
      height: 32px;
    }
    .age-rating-text {
      font-size: 13px;
      color: #616161;
    }

    .detail-body {
      display: grid;
      grid-template-columns: 2fr 1fr;
      align-items: start;
      gap: 48px;
      min-width: 0;
    }

    .main-content { min-width: 0; }

    .section {
      margin-bottom: 32px;
      min-width: 0;
    }
    .section h3 {
      font-size: 18px;
      font-weight: 600;
      color: #131316;
      margin: 0 0 12px;
    }
    .description-wrapper {
      position: relative;
      min-width: 0;
    }
    .description-text {
      position: relative;
      font-size: 14px;
      color: #616161;
      line-height: 1.8;
      white-space: pre-wrap;
      word-break: break-word;
      max-height: 120px;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    .description-text.expanded {
      max-height: none;
    }
    .description-text:not(.expanded)::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: linear-gradient(transparent, #fff);
      pointer-events: none;
    }
    .description-toggle {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-height: 40px;
      margin-top: 8px;
      padding: 0;
      border: none;
      background: none;
      color: #0067b8;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s;
    }
    .description-toggle:hover {
      color: #005a9e;
      text-decoration: underline;
    }
    .description-toggle svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
      transition: transform 0.2s;
    }
    .description-toggle.expanded svg {
      transform: rotate(180deg);
    }

    .screenshots {
      margin-bottom: 32px;
      position: relative;
    }
    .screenshots h3 {
      font-size: 18px;
      font-weight: 600;
      color: #131316;
      margin: 0 0 12px;
    }
    .screenshots-container {
      position: relative;
      isolation: isolate;
    }
    .screenshots-row {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding: 8px 0;
      min-width: 0;
      scroll-snap-type: x proximity;
      scroll-padding-inline: 4px;
    }
    .screenshots-row::-webkit-scrollbar {
      display: none;
    }
    .screenshot-img {
      height: 220px;
      width: 300px;
      border-radius: 8px;
      object-fit: contain;
      flex-shrink: 0;
      scroll-snap-align: start;
      background: #f3f3f3;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .screenshots-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.95);
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: all 0.2s;
    }
    .screenshots-nav:hover {
      background: #fff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .screenshots-nav:active {
      transform: translateY(-50%) scale(0.95);
    }
    .screenshots-nav.prev {
      left: -20px;
    }
    .screenshots-nav.next {
      right: -20px;
    }
    .screenshots-nav svg {
      width: 20px;
      height: 20px;
      fill: #333;
    }
    .screenshots-nav.hidden {
      opacity: 0;
      pointer-events: none;
    }
    .screenshots-nav:focus-visible,
    .get-btn:focus-visible,
    .store-btn:focus-visible,
    .description-toggle:focus-visible,
    .reviews-toggle:focus-visible,
    .info-link:focus-visible,
    .related-card:focus-visible,
    .product-developer a:focus-visible,
    .not-found a:focus-visible {
      outline: 3px solid rgba(0, 103, 184, 0.28);
      outline-offset: 3px;
    }

    .whats-new {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 16px;
    }
    .whats-new-text {
      font-size: 14px;
      color: #616161;
      line-height: 1.6;
      white-space: pre-wrap;
    }

    /* Reviews section */
    .reviews-section {
      margin-top: 32px;
      border-top: 1px solid #e5e5e5;
      padding-top: 24px;
    }
    .reviews-header h3 {
      font-size: 18px;
      font-weight: 600;
      color: #131316;
      margin: 0 0 20px;
    }
    .reviews-summary {
      display: flex;
      gap: 32px;
      margin-bottom: 24px;
      align-items: flex-start;
      min-width: 0;
      width: 100%;
    }
    .reviews-score {
      text-align: center;
      min-width: 100px;
    }
    .reviews-score .big-number {
      font-size: 48px;
      font-weight: 700;
      color: #131316;
      line-height: 1;
    }
    .reviews-score .total-count {
      font-size: 13px;
      color: #767676;
      margin-top: 4px;
    }
    .reviews-bars {
      flex: 1;
      width: 100%;
      max-width: 300px;
      min-width: 0;
    }
    .bar-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
      font-size: 13px;
      color: #767676;
    }
    .bar-label {
      width: 28px;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 2px;
    }
    .bar-label svg {
      width: 12px;
      height: 12px;
      fill: #e67700;
    }
    .bar-track {
      flex: 1;
      min-width: 0;
      height: 8px;
      background: #eee;
      border-radius: 4px;
      overflow: hidden;
    }
    .bar-count {
      width: 24px;
      text-align: right;
      font-size: 12px;
      color: #999;
    }
    .bar-fill {
      height: 100%;
      background: #e67700;
      border-radius: 4px;
      transition: width 0.3s;
    }
    .reviews-list-wrapper {
      position: relative;
    }
    .reviews-list {
      max-height: 400px;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    .reviews-list.expanded {
      max-height: none;
    }
    .reviews-list:not(.expanded)::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(transparent, #fff);
      pointer-events: none;
    }
    .review-item {
      border-bottom: 1px solid #f0f0f0;
      padding: 16px 0;
    }
    .review-item:last-child {
      border-bottom: none;
    }
    .review-top {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 6px;
    }
    .review-rating {
      font-size: 14px;
      font-weight: 600;
      color: #e67700;
    }
    .review-rating svg {
      width: 14px;
      height: 14px;
      fill: #e67700;
      vertical-align: -2px;
    }
    .review-title {
      font-size: 14px;
      font-weight: 600;
      color: #131316;
      overflow-wrap: anywhere;
    }
    .review-content {
      font-size: 14px;
      color: #444;
      line-height: 1.6;
      margin: 6px 0;
    }
    .review-meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 12px;
      color: #999;
    }
    .review-author {
      color: #767676;
    }
    .review-helpful {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .review-helpful span {
      display: flex;
      align-items: center;
      gap: 3px;
    }
    .review-helpful svg {
      width: 14px;
      height: 14px;
      fill: #999;
    }
    .reviews-toggle {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-height: 40px;
      margin-top: 12px;
      padding: 0;
      border: none;
      background: none;
      color: #0067b8;
      font-size: 14px;
      cursor: pointer;
    }
    .reviews-toggle:hover {
      text-decoration: underline;
    }
    .reviews-toggle svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
      transition: transform 0.2s;
    }
    .reviews-toggle.expanded svg {
      transform: rotate(180deg);
    }

    .sidebar { min-width: 0; }
    .info-card {
      background: #f3f3f3;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .info-card h4 {
      font-size: 14px;
      font-weight: 600;
      color: #131316;
      margin: 0 0 12px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      padding: 6px 0;
      font-size: 13px;
      border-bottom: 1px solid #e5e5e5;
    }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #767676; }
    .info-value { color: #131316; text-align: right; max-width: 60%; overflow-wrap: anywhere; }
    .info-link {
      color: #0078d4;
      text-decoration: none;
      font-size: 13px;
      overflow-wrap: anywhere;
    }
    .info-link:hover { text-decoration: underline; }

    .related-section {
      margin-top: 48px;
      padding-top: 32px;
      border-top: 1px solid #e5e5e5;
    }
    .related-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .related-header h3 {
      font-size: 20px;
      font-weight: 600;
      color: #131316;
      margin: 0;
    }
    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
    }
    .related-card {
      display: flex;
      flex-direction: column;
      min-width: 0;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #ececec;
      background: #f9f9f9;
      text-decoration: none;
      transition: all 0.2s;
    }
    .related-icon {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      object-fit: cover;
      margin-bottom: 12px;
      background: #e5e5e5;
    }
    .related-title {
      font-size: 14px;
      font-weight: 600;
      color: #131316;
      margin-bottom: 4px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-word;
    }
    .related-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #767676;
      margin-bottom: 4px;
    }
    .related-category {
      font-size: 12px;
      color: #767676;
      word-break: break-word;
    }
    .related-price {
      font-size: 13px;
      color: #0e7a0d;
      font-weight: 500;
    }

    @media (max-width: 1200px) and (min-width: 601px) {
      .related-grid {
        display: flex;
        gap: 14px;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: 6px;
        scroll-snap-type: x proximity;
        scrollbar-width: thin;
      }
      .related-card {
        flex: 0 0 188px;
        scroll-snap-align: start;
      }
    }

    @media (hover: hover) {
      .screenshot-img:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      }
      .related-card:hover {
        background: #f0f0f0;
        transform: translateY(-2px);
      }
    }

    @media (max-width: 900px) {
      .detail-container { padding: 28px 24px; }
      .detail-header {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        gap: 24px;
        margin-bottom: 32px;
      }
      .product-icon {
        width: 112px;
        height: 112px;
      }
      .detail-body { grid-template-columns: 1fr; gap: 32px; }
      .action-row { justify-content: flex-start; }
      .screenshots-nav.prev { left: 8px; }
      .screenshots-nav.next { right: 8px; }
      .reviews-summary { gap: 24px; }
      .related-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .detail-container {
        padding: 16px 14px 28px;
        background: #f8f9fa;
      }
      .detail-header {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 16px;
        margin-bottom: 20px;
        padding: 18px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.06);
      }
      .product-icon {
        width: 96px;
        height: 96px;
        border-radius: 16px;
      }
      .header-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .product-title {
        font-size: 22px;
        line-height: 1.25;
        word-break: break-word;
      }
      .product-developer { font-size: 13px; }
      .product-category { font-size: 12px; margin-bottom: 8px; }
      .rating-row { gap: 8px; margin-bottom: 12px; }
      .action-row {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
        width: 100%;
        margin-bottom: 10px;
      }
      .get-btn {
        width: 100%;
        min-height: 48px;
        justify-content: center;
        padding: 12px 20px;
        font-size: 15px;
        font-weight: 600;
        border-radius: 10px;
      }
      .gamepass-badge {
        align-self: flex-start;
        padding: 5px 10px;
      }
      .age-rating {
        margin-top: 10px;
        gap: 6px;
      }
      .age-rating-icon { width: 28px; height: 28px; }
      .section {
        margin-bottom: 20px;
        padding: 18px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.06);
      }
      .section h3 { font-size: 17px; margin-bottom: 10px; }
      .screenshots {
        padding: 18px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.06);
      }
      .screenshots h3 { font-size: 17px; margin-bottom: 10px; }
      .screenshots-row { padding: 4px 0 8px; gap: 10px; }
      .screenshot-img {
        width: min(280px, calc(100vw - 72px));
        height: auto;
        aspect-ratio: 16 / 10;
        border-radius: 8px;
      }
      .screenshots-nav { display: none; }
      .whats-new { padding: 14px; border-radius: 8px; }
      .whats-new-text { font-size: 14px; }
      .reviews-section {
        margin-top: 20px;
        padding: 18px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.06);
      }
      .reviews-header h3 { font-size: 17px; margin-bottom: 14px; }
      .reviews-summary { flex-direction: column; gap: 16px; margin-bottom: 20px; }
      .reviews-score {
        text-align: left;
        min-width: 0;
      }
      .reviews-score .big-number { font-size: 40px; }
      .reviews-score .total-count { font-size: 12px; }
      .reviews-bars {
        max-width: none;
        width: 100%;
      }
      .bar-row {
        display: grid;
        grid-template-columns: 32px minmax(0, 1fr) 28px;
        align-items: center;
        font-size: 12px;
      }
      .bar-label {
        width: auto;
      }
      .bar-count {
        width: auto;
      }
      .reviews-list { max-height: 320px; }
      .review-item { padding: 12px 0; }
      .review-title, .review-content { font-size: 13px; }
      .review-meta { font-size: 11px; gap: 10px 12px; }
      .info-card {
        padding: 18px;
        margin-bottom: 14px;
        border-radius: 12px;
      }
      .info-card h4 { font-size: 14px; margin-bottom: 12px; }
      .info-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        padding: 8px 0;
        font-size: 13px;
      }
      .info-value { text-align: left; max-width: none; }
      .related-section {
        margin-top: 20px;
        padding: 18px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.06);
      }
      .related-header {
        margin-bottom: 14px;
      }
      .related-header h3 { font-size: 17px; }
      .related-grid { grid-template-columns: 1fr; gap: 14px; }
      .related-card {
        padding: 14px;
        border-radius: 12px;
      }
      .related-icon { width: 60px; height: 60px; margin-bottom: 12px; border-radius: 12px; }
      .related-title { font-size: 14px; }
      .related-meta, .related-category, .related-price { font-size: 12px; }
    }
    @media (max-width: 420px) {
      .detail-container {
        padding: 12px 12px 24px;
      }
      .detail-header {
        grid-template-columns: 1fr;
      }
      .product-icon {
        width: 88px;
        height: 88px;
      }
      .product-title {
        font-size: 20px;
      }
      .screenshot-img {
        width: calc(100vw - 52px);
      }
      .reviews-score .big-number {
        font-size: 36px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .loading-spinner,
      .description-text,
      .description-toggle svg,
      .screenshots-row,
      .screenshot-img,
      .screenshots-nav,
      .bar-fill,
      .reviews-list,
      .reviews-toggle svg,
      .related-card,
      .get-btn,
      .store-btn {
        animation: none;
        transition: none;
        scroll-behavior: auto;
      }
    }
  `);customElements.define("detail-page",Fo);class Bo extends G{constructor(){super(),this.data=null,this.loading=!0,this.currentPage=1,this.currentCategory=""}connectedCallback(){super.connectedCallback(),this._loadData()}updated(t){t.has("currentPage")&&this._loadData()}async _loadData(){var t;this.loading=!0;try{const i=new URLSearchParams;i.set("page",this.currentPage),this.currentCategory&&i.set("category",this.currentCategory);const o=await fetch(`/api/articles?${i}`);if(this.data=await o.json(),(t=this.data)!=null&&t.seo){const s=this.data.seo;ze({title:s.title,keywords:s.keywords,description:s.description})}}catch(i){console.error("Failed to load articles:",i)}this.loading=!1}_navigate(t){window.msApp?window.msApp.navigate(`/article/${t}`):window.location.href=`/article/${t}`}_changeCategory(t){this.currentCategory=t,this.currentPage=1,window.msApp&&window.msApp.navigate("/articles"),this._loadData()}_goToPage(t){t<1||(window.msApp?window.msApp.navigate(t===1?"/articles":"/articles/"+t):window.location.href=t===1?"/articles":"/articles/"+t,this.scrollIntoView({behavior:"smooth"}))}_formatDate(t){if(!t)return"";const i=new Date(t),s=Math.floor((new Date-i)/864e5);return s===0?"今天":s===1?"昨天":s<7?`${s}天前`:i.toLocaleDateString("zh-CN")}_renderPageNumbers(t,i){const o=[],r=Math.max(2,t-2),n=Math.min(i-1,t+2);o.push(1),r>2&&o.push("...");for(let l=r;l<=n;l++)o.push(l);return n<i-1&&o.push("..."),i>1&&o.push(i),o.map((l,d)=>{if(l==="...")return p`<span class="page-ellipsis" key="ellipsis-${d}">...</span>`;const h=l===1?"/articles":`/articles/${l}`;return p`<a class="page-btn page-link ${l===t?"active":""}" href="${h}" data-nav>${l}</a>`})}_renderArticleCard(t){return p`
      <a class="article-card" @click=${i=>{i.preventDefault(),this._navigate(t.slug)}}>
        ${t.cover_image?p`<img class="article-cover" src="${t.cover_image}" alt="${t.title}" loading="lazy">`:p`<div class="article-cover placeholder"><svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H14a1 1 0 01-1-1V3.5zM8 12h8v1.5H8V12zm0 4h5v1.5H8V16z"/></svg></div>`}
        <div class="article-body">
          <div class="article-meta">
            ${t.category?p`<span class="cat">${t.category}</span>`:""}
            <span>${this._formatDate(t.created_at)}</span>
            ${t.author?p`<span>${t.author}</span>`:""}
          </div>
          <h3>${t.title}</h3>
          <div class="summary">${t.summary||""}</div>
          <div class="article-footer">
            <span><svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 4.5C5.813 4.5 2.257 7.473 1.088 9.667a.75.75 0 000 .666C2.257 12.527 5.813 15.5 10 15.5s7.743-2.973 8.912-5.167a.75.75 0 000-.666C17.743 7.473 14.187 4.5 10 4.5zM10 13a3 3 0 110-6 3 3 0 010 6z"/></svg>${t.views||0} 阅读</span>
          </div>
        </div>
      </a>
    `}render(){if(this.loading)return p`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;if(!this.data)return p`<div class="loading">加载失败，请刷新重试</div>`;const{articles:t,pagination:i,categories:o,recommended:s}=this.data;return p`
      <div class="page-banner">
        <div class="inner">
          <h1>资讯中心</h1>
          <p>发现最新技术资讯、使用教程和行业动态</p>
        </div>
      </div>

      <div class="container">
        <div class="main-content">
          ${o&&o.length>0?p`
            <div class="categories">
              <button class="cat-tag ${this.currentCategory?"":"active"}"
                @click=${()=>this._changeCategory("")}>全部</button>
              ${o.map(r=>p`
                <button class="cat-tag ${this.currentCategory===r.category?"active":""}"
                  @click=${()=>this._changeCategory(r.category)}>
                  ${r.category} (${r.count})
                </button>
              `)}
            </div>
          `:""}

          <div class="article-list">
            ${t&&t.length>0?t.map(r=>this._renderArticleCard(r)):p`<div class="loading" style="padding:60px 0">暂无资讯</div>`}
          </div>

          ${i&&i.total_pages>1?p`
            <div class="pagination">
              <button class="page-btn" ?disabled=${i.page<=1}
                @click=${()=>this._goToPage(i.page-1)}>上一页</button>
              ${this._renderPageNumbers(i.page,i.total_pages)}
              <button class="page-btn" ?disabled=${i.page>=i.total_pages}
                @click=${()=>this._goToPage(i.page+1)}>下一页</button>
            </div>
          `:""}
        </div>

        <div class="sidebar">
          ${s&&s.length>0?p`
            <div class="sidebar-card">
              <h4>推荐阅读</h4>
              <div>
                ${s.map(r=>p`
                  <a class="rec-cover-item" @click=${n=>{n.preventDefault(),this._navigate(r.slug)}}>
                    ${r.cover_image?p`<img src="${r.cover_image}" alt="${r.title}" loading="lazy">`:""}
                    <div>
                      <div class="rec-text">${r.title}</div>
                      <div class="rec-meta">${this._formatDate(r.created_at)}</div>
                    </div>
                  </a>
                `)}
              </div>
            </div>
          `:""}

          ${o&&o.length>0?p`
            <div class="sidebar-card">
              <h4>文章分类</h4>
              <ul class="rec-list">
                ${o.map(r=>p`
                  <li>
                    <a href="javascript:void(0)" @click=${()=>this._changeCategory(r.category)}>
                      ${r.category}
                      <span style="float:right;color:#999">${r.count}</span>
                    </a>
                  </li>
                `)}
              </ul>
            </div>
          `:""}
        </div>
      </div>
    `}}R(Bo,"properties",{data:{type:Object},loading:{type:Boolean},currentPage:{type:Number},currentCategory:{type:String}}),R(Bo,"styles",k`
    :host {
      display: block;
      padding-bottom: 64px;
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    .loading {
      text-align: center; padding: 120px 0;
      color: #767676; font-size: 16px;
    }
    .loading-spinner {
      display: inline-block; width: 32px; height: 32px;
      border: 3px solid #e5e5e5; border-top-color: #0067b8;
      border-radius: 50%; animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .page-banner {
      background: linear-gradient(135deg, #0078d4 0%, #004578 100%);
      color: #fff; padding: 48px 0 40px; margin-bottom: 40px;
    }
    .page-banner .inner {
      max-width: 1200px; margin: 0 auto; padding: 0 24px;
    }
    .page-banner h1 { font-size: 32px; font-weight: 700; margin: 0 0 8px; }
    .page-banner p { font-size: 15px; opacity: 0.85; margin: 0; }

    .container {
      max-width: 1200px; margin: 0 auto; padding: 0 24px;
      display: grid; grid-template-columns: 1fr 320px; gap: 40px;
    }

    .categories {
      display: flex; gap: 8px; margin-bottom: 28px; flex-wrap: wrap;
      min-width: 0;
    }
    .cat-tag {
      display: inline-block; padding: 6px 16px; border-radius: 20px;
      font-size: 13px; font-weight: 500; cursor: pointer;
      background: #f0f0f0; color: #333; border: none;
      transition: all 0.2s; font-family: inherit;
    }
    .cat-tag:hover { background: #e0e0e0; }
    .cat-tag.active {
      background: #0078d4; color: #fff;
    }

    .article-list { display: flex; flex-direction: column; gap: 24px; }
    .article-card {
      display: flex; gap: 20px; background: #fff;
      border-radius: 12px; overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      transition: box-shadow 0.25s, transform 0.25s;
      cursor: pointer; text-decoration: none; color: inherit;
    }
    .article-card:hover {
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      transform: translateY(-2px);
    }
    .article-cover {
      width: 260px; min-height: 180px; flex-shrink: 0;
      object-fit: cover; background: #f0f0f0;
    }
    .article-cover.placeholder {
      display: flex; align-items: center; justify-content: center;
      color: #bbb; font-size: 40px; background: linear-gradient(135deg, #e8f4fd, #f0f0f0);
    }
    .article-body { padding: 20px 20px 20px 0; flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .article-meta {
      display: flex; align-items: center; gap: 12px;
      font-size: 12px; color: #999; margin-bottom: 10px;
    }
    .article-meta .cat {
      background: #e8f4fd; color: #0078d4; padding: 2px 10px;
      border-radius: 10px; font-weight: 500;
    }
    .article-body h3 {
      font-size: 18px; font-weight: 600; margin: 0 0 10px;
      color: #1a1a1a; line-height: 1.4;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .article-body .summary {
      font-size: 14px; color: #666; line-height: 1.6; flex: 1;
      display: -webkit-box; -webkit-line-clamp: 3;
      -webkit-box-orient: vertical; overflow: hidden;
      word-break: break-word;
    }
    .article-footer {
      display: flex; align-items: center; gap: 16px;
      font-size: 12px; color: #999; margin-top: 12px;
    }
    .article-footer span { display: flex; align-items: center; gap: 4px; }
    .meta-icon { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.55; }

    .sidebar { display: flex; flex-direction: column; gap: 24px; }
    .sidebar-card {
      background: #fff; border-radius: 12px; padding: 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .sidebar-card h4 {
      font-size: 16px; font-weight: 600; margin: 0 0 16px;
      padding-bottom: 12px; border-bottom: 2px solid #0078d4;
      color: #1a1a1a;
    }
    .rec-list { list-style: none; padding: 0; margin: 0; }
    .rec-list li { padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
    .rec-list li:last-child { border: none; }
    .rec-list a {
      text-decoration: none; color: #333; font-size: 14px;
      line-height: 1.5; display: block; transition: color 0.2s;
    }
    .rec-list a:hover { color: #0078d4; }
    .rec-list .rec-meta { font-size: 12px; color: #999; margin-top: 4px; }

    .rec-cover-item {
      display: flex; gap: 12px; padding: 10px 0;
      border-bottom: 1px solid #f0f0f0; text-decoration: none; color: inherit;
    }
    .rec-cover-item:last-child { border: none; }
    .rec-cover-item img {
      width: 80px; height: 56px; object-fit: cover;
      border-radius: 6px; flex-shrink: 0;
    }
    .rec-cover-item .rec-text {
      font-size: 14px; color: #333; line-height: 1.4;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .rec-cover-item:hover .rec-text { color: #0078d4; }

    .pagination {
      display: flex; justify-content: center; align-items: center; gap: 6px;
      margin-top: 32px; flex-wrap: wrap;
    }
    .page-btn {
      padding: 8px 14px; border-radius: 8px; border: 1px solid #ddd;
      background: #fff; color: #333; cursor: pointer; font-size: 14px;
      transition: all 0.2s; font-family: inherit; min-width: 40px; text-align: center;
    }
    .page-ellipsis {
      padding: 8px 4px; color: #999; font-size: 14px;
    }
    .page-btn:hover { border-color: #0078d4; color: #0078d4; }
    .page-btn.active {
      background: #0078d4; color: #fff; border-color: #0078d4;
    }
    .page-btn:disabled { opacity: 0.5; cursor: default; }
    .page-btn.page-link {
      text-decoration: none; display: inline-block; box-sizing: border-box;
    }

    @media (max-width: 900px) {
      .container { grid-template-columns: 1fr; gap: 32px; }
      .article-card { flex-direction: column; }
      .article-cover { width: 100%; min-height: 200px; }
      .article-body { padding: 16px; }
    }
    @media (max-width: 600px) {
      .page-banner h1 { font-size: 24px; }
      .page-banner { padding: 32px 0 24px; margin-bottom: 24px; }
      .page-banner .inner { padding: 0 16px; max-width: 100%; }
      .container { padding: 0 16px; gap: 24px; max-width: 100%; min-width: 0; }
      .categories { overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 4px; }
      .cat-tag { flex-shrink: 0; }
      .article-cover { min-height: 160px; }
      .article-body h3 { font-size: 16px; }
      .pagination { margin-top: 24px; }
      .page-btn { min-width: 44px; min-height: 44px; }
    }
  `);customElements.define("articles-page",Bo);class Vo extends G{constructor(){super(),this.slug="",this.data=null,this.loading=!0}updated(t){t.has("slug")&&this.slug&&this._loadData()}async _loadData(){this.loading=!0;try{const t=await fetch(`/api/article/${encodeURIComponent(this.slug)}`);t.ok?this.data=await t.json():this.data=null}catch(t){console.error("Failed to load article:",t),this.data=null}this.loading=!1,this.data&&this.data.article&&this._updatePageMeta()}_updatePageMeta(){const t=this.data.article;ze({title:t.title||"资讯详情",keywords:t.keywords||"",description:t.meta_description||""})}_navigate(t){window.msApp?window.msApp.navigate(`/article/${t}`):window.location.href=`/article/${t}`}_goBack(){window.msApp?window.msApp.navigate("/articles"):window.location.href="/articles"}_formatDate(t){return t?new Date(t).toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric"}):""}render(){if(this.loading)return p`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;if(!this.data||!this.data.article)return p`<div class="loading">文章不存在或已被删除</div>`;const{article:t,related:i,popular:o}=this.data;return p`
      <div class="container">
        <div class="main-content">
          <div class="breadcrumb">
            <a href="/articles" data-nav>资讯中心</a>
            ${t.category?p` &gt; <a href="javascript:void(0)" @click=${()=>this._goBack()}>${t.category}</a>`:""}
            &gt; <span>${t.title}</span>
          </div>

          <div class="article-header">
            <h1>${t.title}</h1>
            <div class="article-meta">
              ${t.category?p`<span class="cat">${t.category}</span>`:""}
              ${t.author?p`<span><svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a4 4 0 110 8 4 4 0 010-8zm0 1.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.25 16.5a5.75 5.75 0 0111.5 0 .75.75 0 01-1.5 0 4.25 4.25 0 00-8.5 0 .75.75 0 01-1.5 0z"/></svg>${t.author_url?p`<a href="${t.author_url}" class="author-link">${t.author}</a>`:t.author}</span>`:""}
              <span><svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M7 2a1 1 0 011 1v1h4V3a1 1 0 112 0v1h1.5A2.5 2.5 0 0118 6.5v9a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 15.5v-9A2.5 2.5 0 014.5 4H6V3a1 1 0 011-1zm-2.5 6v7.5a1 1 0 001 1h9a1 1 0 001-1V8h-11z"/></svg>${this._formatDate(t.created_at)}</span>
              <span><svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 4.5C5.813 4.5 2.257 7.473 1.088 9.667a.75.75 0 000 .666C2.257 12.527 5.813 15.5 10 15.5s7.743-2.973 8.912-5.167a.75.75 0 000-.666C17.743 7.473 14.187 4.5 10 4.5zM10 13a3 3 0 110-6 3 3 0 010 6z"/></svg>${t.views||0} 阅读</span>
            </div>
          </div>

          ${t.cover_image?p`
            <img class="cover-img" src="${t.cover_image}" alt="${t.title}">
          `:""}

          <div class="article-content">
            ${oi(t.content||"")}
          </div>

          ${t.keywords?p`
            <div class="article-tags">
              ${t.keywords.split(",").map(s=>s.trim()).filter(Boolean).map(s=>p`
                <span class="tag">${s}</span>
              `)}
            </div>
          `:""}

          <button class="back-link" @click=${this._goBack}>← 返回资讯列表</button>
        </div>

        <div class="sidebar">
          ${i&&i.length>0?p`
            <div class="sidebar-card">
              <h4>相关推荐</h4>
              ${i.map(s=>p`
                <a class="related-item" @click=${r=>{r.preventDefault(),this._navigate(s.slug)}}>
                  ${s.cover_image?p`<img src="${s.cover_image}" alt="${s.title}" loading="lazy">`:""}
                  <div>
                    <div class="r-title">${s.title}</div>
                    <div class="r-date">${this._formatDate(s.created_at)}</div>
                  </div>
                </a>
              `)}
            </div>
          `:""}

          ${o&&o.length>0?p`
            <div class="sidebar-card">
              <h4>热门文章</h4>
              ${o.map((s,r)=>p`
                <a class="popular-item" @click=${n=>{n.preventDefault(),this._navigate(s.slug)}}>
                  <span class="popular-num">${r+1}</span>
                  <div class="p-title">${s.title}</div>
                </a>
              `)}
            </div>
          `:""}
        </div>
      </div>
    `}}R(Vo,"properties",{slug:{type:String},data:{type:Object},loading:{type:Boolean}}),R(Vo,"styles",k`
    :host {
      display: block;
      padding-bottom: 64px;
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    .loading {
      text-align: center; padding: 120px 0;
      color: #767676; font-size: 16px;
    }
    .loading-spinner {
      display: inline-block; width: 32px; height: 32px;
      border: 3px solid #e5e5e5; border-top-color: #0067b8;
      border-radius: 50%; animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .container {
      max-width: 1200px;
      width: 100%;
      min-width: 0;
      margin: 0 auto;
      padding: 40px 24px;
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 40px;
      box-sizing: border-box;
    }
    .main-content { min-width: 0; }

    .breadcrumb {
      font-size: 13px;
      color: #999;
      margin-bottom: 16px;
      word-break: break-word;
      overflow-wrap: break-word;
    }
    .breadcrumb a {
      color: #0078d4; text-decoration: none;
    }
    .breadcrumb a:hover { text-decoration: underline; }

    .article-header { margin-bottom: 28px; }
    .article-header h1 {
      font-size: 28px; font-weight: 700; line-height: 1.4;
      color: #1a1a1a; margin: 0 0 16px;
    }
    .article-meta {
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
      font-size: 13px; color: #999;
    }
    .article-meta .cat {
      background: #e8f4fd; color: #0078d4; padding: 3px 12px;
      border-radius: 12px; font-weight: 500; font-size: 12px;
    }
    .article-meta span { display: flex; align-items: center; gap: 4px; }
    .meta-icon { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.6; }
    .author-link { color: #0078d4; text-decoration: none; }
    .author-link:hover { text-decoration: underline; }

    .cover-img {
      width: 100%; border-radius: 12px; margin-bottom: 28px;
      max-height: 400px; object-fit: cover;
    }

    .article-content {
      font-size: 16px; line-height: 1.8; color: #333;
    }
    .article-content h2,
    .article-content h3 {
      margin: 28px 0 14px; color: #1a1a1a; font-weight: 600;
    }
    .article-content h2 { font-size: 22px; }
    .article-content h3 { font-size: 18px; }
    .article-content p { margin: 0 0 16px; }
    .article-content img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 16px 0;
      display: block;
    }
    .article-content a { color: #0078d4; }
    .article-content blockquote {
      border-left: 4px solid #0078d4;
      padding: 12px 20px; margin: 16px 0;
      background: #f8f9fa; border-radius: 0 8px 8px 0;
      color: #555;
    }
    .article-content ul, .article-content ol {
      padding-left: 24px; margin: 12px 0;
    }
    .article-content li { margin-bottom: 8px; }
    .article-content pre {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 14px;
      max-width: 100%;
      box-sizing: border-box;
    }
    .article-content code {
      background: #f0f0f0; padding: 2px 6px;
      border-radius: 4px; font-size: 14px;
    }
    .article-content pre code {
      background: none; padding: 0;
    }

    .article-tags {
      display: flex; gap: 8px; flex-wrap: wrap;
      margin-top: 32px; padding-top: 24px;
      border-top: 1px solid #eee;
    }
    .tag {
      padding: 4px 14px; background: #f0f0f0;
      border-radius: 14px; font-size: 13px; color: #666;
    }

    .sidebar { display: flex; flex-direction: column; gap: 24px; }
    .sidebar-card {
      background: #fff; border-radius: 12px; padding: 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .sidebar-card h4 {
      font-size: 16px; font-weight: 600; margin: 0 0 16px;
      padding-bottom: 12px; border-bottom: 2px solid #0078d4;
      color: #1a1a1a;
    }

    .related-item {
      display: flex; gap: 12px; padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      text-decoration: none; color: inherit; cursor: pointer;
    }
    .related-item:last-child { border: none; }
    .related-item img {
      width: 80px; height: 56px; object-fit: cover;
      border-radius: 6px; flex-shrink: 0;
    }
    .related-item .r-title {
      font-size: 14px; color: #333; line-height: 1.4;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .related-item .r-date { font-size: 12px; color: #999; margin-top: 4px; }
    .related-item:hover .r-title { color: #0078d4; }

    .popular-item {
      display: flex; gap: 12px; padding: 10px 0; align-items: flex-start;
      border-bottom: 1px solid #f0f0f0;
      text-decoration: none; color: inherit; cursor: pointer;
    }
    .popular-item:last-child { border: none; }
    .popular-num {
      font-size: 20px; font-weight: 700; color: #ddd;
      width: 28px; text-align: center; flex-shrink: 0; line-height: 1.2;
    }
    .popular-item:nth-child(1) .popular-num,
    .popular-item:nth-child(2) .popular-num,
    .popular-item:nth-child(3) .popular-num { color: #0078d4; }
    .popular-item .p-title {
      font-size: 14px; color: #333; line-height: 1.4;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .popular-item:hover .p-title { color: #0078d4; }

    .back-link {
      display: inline-flex; align-items: center; gap: 6px;
      margin-top: 32px; padding: 10px 24px; border-radius: 8px;
      background: #f0f0f0; color: #333; text-decoration: none;
      font-size: 14px; transition: background 0.2s; cursor: pointer;
      border: none; font-family: inherit;
    }
    .back-link:hover { background: #e0e0e0; }

    @media (max-width: 900px) {
      .container { grid-template-columns: 1fr; gap: 32px; padding: 32px 24px; }
      .sidebar { order: 2; min-width: 0; }
    }
    @media (max-width: 600px) {
      .container { padding: 24px 16px; gap: 24px; }
      .article-header h1 { font-size: 22px; line-height: 1.35; }
      .article-meta { gap: 10px; font-size: 12px; }
      .article-meta .cat { padding: 2px 10px; font-size: 11px; }
      .cover-img { max-height: 220px; margin-bottom: 20px; }
      .article-content { font-size: 15px; line-height: 1.75; }
      .article-content h2 { font-size: 20px; margin: 24px 0 12px; }
      .article-content h3 { font-size: 17px; margin: 20px 0 10px; }
      .article-content blockquote { padding: 10px 16px; margin: 12px 0; }
      .article-content pre { padding: 12px; font-size: 13px; }
      .article-tags { margin-top: 24px; padding-top: 20px; gap: 6px; }
      .tag { padding: 3px 12px; font-size: 12px; }
      .sidebar-card { padding: 16px; }
      .sidebar-card h4 { font-size: 15px; margin-bottom: 12px; padding-bottom: 10px; }
      .related-item { gap: 10px; padding: 8px 0; }
      .related-item img { width: 72px; height: 50px; }
      .related-item .r-title { font-size: 13px; }
      .popular-item { padding: 8px 0; }
      .popular-num { font-size: 18px; width: 24px; }
      .popular-item .p-title { font-size: 13px; }
      .back-link { display: flex; justify-content: center; width: 100%; margin-top: 24px; padding: 12px 20px; box-sizing: border-box; }
    }
  `);customElements.define("article-detail-page",Vo);const no=new Set(["home","apps","games","about","articles"]);class Ho extends G{constructor(){super(),this.currentRoute="home",this.routeParams={},this._transitioning=!1,this._activatedRoutes=new Set,this._handleRoute(),window.addEventListener("popstate",()=>this._handleRoute())}_handleRoute(){const t=window.location.pathname;if(t==="/"||t==="/home")this.currentRoute="home",this.routeParams={};else if(t==="/apps")this.currentRoute="apps",this.routeParams={};else if(t==="/games")this.currentRoute="games",this.routeParams={};else if(t==="/about")this.currentRoute="about",this.routeParams={};else if(t==="/articles")this.currentRoute="articles",this.routeParams={page:1};else{const i=t.match(/^\/articles\/(\d+)$/);i?(this.currentRoute="articles",this.routeParams={page:parseInt(i[1],10)}):t.startsWith("/article/")?(this.currentRoute="article-detail",this.routeParams={slug:t.split("/article/")[1]}):t.startsWith("/detail/")?(this.currentRoute="detail",this.routeParams={id:t.split("/detail/")[1]}):t==="/desk.html"?(this.currentRoute="detail",this.routeParams={id:"xpdlt6q62bfqkz"}):(this.currentRoute="custom-product",this.routeParams={customUrl:t})}no.has(this.currentRoute)&&this._activatedRoutes.add(this.currentRoute)}navigate(t){const i=this.currentRoute;window.history.pushState({},"",t),this._handleRoute(),this.currentRoute!==i&&window.scrollTo({top:0,behavior:"smooth"})}connectedCallback(){super.connectedCallback(),window.msApp=this,document.addEventListener("click",t=>{const o=t.composedPath().find(s=>s instanceof HTMLAnchorElement&&s.hasAttribute("data-nav"));o&&(t.preventDefault(),this.navigate(o.getAttribute("href")))})}_isActive(t){return this.currentRoute===t}_shouldRender(t){return this._activatedRoutes.has(t)}_renderDynamicPage(){if(no.has(this.currentRoute))return"";switch(this.currentRoute){case"article-detail":return p`<article-detail-page .slug=${this.routeParams.slug}></article-detail-page>`;case"detail":return p`<detail-page .productId=${this.routeParams.id}></detail-page>`;case"custom-product":return p`<detail-page .customUrl=${this.routeParams.customUrl}></detail-page>`;default:return""}}render(){return p`
      <ms-header .currentRoute=${this.currentRoute}></ms-header>
      <main>
        <div class="page-slot ${this._isActive("home")?"active":""}">${this._shouldRender("home")?p`<home-page></home-page>`:""}</div>
        <div class="page-slot ${this._isActive("apps")?"active":""}">${this._shouldRender("apps")?p`<apps-page></apps-page>`:""}</div>
        <div class="page-slot ${this._isActive("games")?"active":""}">${this._shouldRender("games")?p`<games-page></games-page>`:""}</div>
        <div class="page-slot ${this._isActive("about")?"active":""}">${this._shouldRender("about")?p`<about-page></about-page>`:""}</div>
        <div class="page-slot ${this._isActive("articles")?"active":""}">${this._shouldRender("articles")?p`<articles-page .currentPage=${this.routeParams.page??1}></articles-page>`:""}</div>
        <div class="page-slot ${no.has(this.currentRoute)?"":"active"}">${this._renderDynamicPage()}</div>
      </main>
      <ms-footer></ms-footer>
    `}}R(Ho,"properties",{currentRoute:{type:String},routeParams:{type:Object},_transitioning:{type:Boolean,state:!0}}),R(Ho,"styles",k`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      min-height: 100vh;
      background: var(--ms-page-bg);
      overflow-x: hidden;
      box-sizing: border-box;
    }
    main {
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    .page-slot {
      display: none;
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    .page-slot.active {
      display: block;
    }
  `);customElements.define("ms-app",Ho);
