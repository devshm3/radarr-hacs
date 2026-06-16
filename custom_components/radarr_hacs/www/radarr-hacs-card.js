function e(e,t,i,r){var o,s=arguments.length,a=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(a=(s<3?o(a):s>3?o(t,i,a):o(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let s=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new s(i,e,r)},n=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,v=globalThis,_=v.trustedTypes,f=_?_.emptyScript:"",g=v.reactiveElementPolyfillSupport,m=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!d(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&l(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const s=r?.call(this);o?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),o=t.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=r;const s=o.fromAttribute(t,e.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){if(void 0!==e){const s=this.constructor;if(!1===r&&(o=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??y)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==o||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[m("elementProperties")]=new Map,x[m("finalized")]=new Map,g?.({ReactiveElement:x}),(v.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,A=e=>e,M=w.trustedTypes,S=M?M.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,T=`<${C}>`,P=document,D=()=>P.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,q=Array.isArray,F="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,U=/>/g,N=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,H=/"/g,B=/^(?:script|style|textarea|title)$/i,L=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),j=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Q=new WeakMap,G=P.createTreeWalker(P,129);function W(e,t){if(!q(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,r=[];let o,s=2===t?"<svg>":3===t?"<math>":"",a=O;for(let t=0;t<i;t++){const i=e[t];let n,d,l=-1,c=0;for(;c<i.length&&(a.lastIndex=c,d=a.exec(i),null!==d);)c=a.lastIndex,a===O?"!--"===d[1]?a=R:void 0!==d[1]?a=U:void 0!==d[2]?(B.test(d[2])&&(o=RegExp("</"+d[2],"g")),a=N):void 0!==d[3]&&(a=N):a===N?">"===d[0]?(a=o??O,l=-1):void 0===d[1]?l=-2:(l=a.lastIndex-d[2].length,n=d[1],a=void 0===d[3]?N:'"'===d[3]?H:I):a===H||a===I?a=N:a===R||a===U?a=O:(a=N,o=void 0);const h=a===N&&e[t+1].startsWith("/>")?" ":"";s+=a===O?i+T:l>=0?(r.push(n),i.slice(0,l)+k+i.slice(l)+E+h):i+E+(-2===l?t:h)}return[W(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class J{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,s=0;const a=e.length-1,n=this.parts,[d,l]=Y(e,t);if(this.el=J.createElement(d,i),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=G.nextNode())&&n.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(k)){const t=l[s++],i=r.getAttribute(e).split(E),a=/([.?@])?(.*)/.exec(t);n.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?te:"?"===a[1]?ie:"@"===a[1]?re:ee}),r.removeAttribute(e)}else e.startsWith(E)&&(n.push({type:6,index:o}),r.removeAttribute(e));if(B.test(r.tagName)){const e=r.textContent.split(E),t=e.length-1;if(t>0){r.textContent=M?M.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],D()),G.nextNode(),n.push({type:2,index:++o});r.append(e[t],D())}}}else if(8===r.nodeType)if(r.data===C)n.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(E,e+1));)n.push({type:7,index:o}),e+=E.length-1}o++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function K(e,t,i=e,r){if(t===j)return t;let o=void 0!==r?i._$Co?.[r]:i._$Cl;const s=z(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(e),o._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(t=K(e,o._$AS(e,t.values),o,r)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??P).importNode(t,!0);G.currentNode=r;let o=G.nextNode(),s=0,a=0,n=i[0];for(;void 0!==n;){if(s===n.index){let t;2===n.type?t=new X(o,o.nextSibling,this,e):1===n.type?t=new n.ctor(o,n.name,n.strings,this,e):6===n.type&&(t=new oe(o,this,e)),this._$AV.push(t),n=i[++a]}s!==n?.index&&(o=G.nextNode(),s++)}return G.currentNode=P,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),z(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>q(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new Z(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Q.get(e.strings);return void 0===t&&Q.set(e.strings,t=new J(e)),t}k(e){q(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new X(this.O(D()),this.O(D()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,r){const o=this.strings;let s=!1;if(void 0===o)e=K(this,e,t,0),s=!z(e)||e!==this._$AH&&e!==j,s&&(this._$AH=e);else{const r=e;let a,n;for(e=o[0],a=0;a<o.length-1;a++)n=K(this,r[i+a],t,a),n===j&&(n=this._$AH[a]),s||=!z(n)||n!==this._$AH[a],n===V?e=V:e!==V&&(e+=(n??"")+o[a+1]),this._$AH[a]=n}s&&!r&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class re extends ee{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??V)===j)return;const i=this._$AH,r=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==V&&(i===V||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}}const se=w.litHtmlPolyfillSupport;se?.(J,X),(w.litHtmlVersions??=[]).push("3.3.3");const ae=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ne extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let o=r._$litPart$;if(void 0===o){const e=i?.renderBefore??null;r._$litPart$=o=new X(t.insertBefore(D(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}ne._$litElement$=!0,ne.finalized=!0,ae.litElementHydrateSupport?.({LitElement:ne});const de=ae.litElementPolyfillSupport;de?.({LitElement:ne}),(ae.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ce={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},he=(e=ce,t,i)=>{const{kind:r,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,o,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const o=this[r];t.call(this,i),this.requestUpdate(r,o,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ue(e){return pe({...e,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */async function ve(e,t,i={}){const r={type:"radarr_hacs/get_movies",entry_id:t};i.filter&&"all"!==i.filter&&(r.filter=i.filter),i.sort&&(r.sort=i.sort),i.search&&(r.search=i.search);return(await e.connection.sendMessagePromise(r)).movies}async function _e(e,t){return e.connection.sendMessagePromise({type:"radarr_hacs/get_config",entry_id:t})}let fe=class extends ne{constructor(){super(...arguments),this._entries=[],this._entriesLoaded=!1}setConfig(e){this._config={...e},this.requestUpdate()}updated(e){e.has("hass")&&this.hass&&!this._entriesLoaded&&(this._entriesLoaded=!0,this._loadEntries())}async _loadEntries(){var e;try{const t=await this.hass.connection.sendMessagePromise({type:"config_entries/get",domain:ge});this._entries=t.filter(e=>e.domain===ge),1!==this._entries.length||(null===(e=this._config)||void 0===e?void 0:e.entry_id)||this._fire({entry_id:this._entries[0].entry_id})}catch{this._entries=[]}}render(){var e,t,i,r;if(!this._config)return L``;const o=this._config;return L`
      <div class="form">
        <div class="field">
          <label>Radarr Instance</label>
          ${this._entries.length>0?L`
            <select @change=${e=>this._fire({entry_id:e.target.value})}>
              <option value="" ?selected=${!o.entry_id}>Select…</option>
              ${this._entries.map(e=>L`
                <option value=${e.entry_id} ?selected=${o.entry_id===e.entry_id}>
                  ${e.title}
                </option>
              `)}
            </select>
          `:L`
            <input .value=${null!==(e=o.entry_id)&&void 0!==e?e:""} @change=${this._str("entry_id")}
              placeholder="Loading instances…" />
          `}
        </div>
        <div class="field">
          <label>Card Title (default: "Radarr")</label>
          <input .value=${null!==(t=o.card_title)&&void 0!==t?t:""} @change=${this._str("card_title")} />
        </div>
        <div class="field">
          <label>Appearance</label>
          <select @change=${this._str("appearance")}>
            ${["glass","material"].map(e=>{var t;return L`
              <option value=${e} ?selected=${(null!==(t=o.appearance)&&void 0!==t?t:"glass")===e}>
                ${"glass"===e?"Glass (default)":"Material You"}
              </option>
            `})}
          </select>
        </div>
        <div class="field">
          <label>Columns (2–8, default: 4)</label>
          <input type="number" min="2" max="8"
            .value=${String(null!==(i=o.columns)&&void 0!==i?i:4)}
            @change=${e=>this._fire({columns:Number(e.target.value)})} />
        </div>
        <div class="field">
          <label>Preview size — movies shown before "View all" (default: 25)</label>
          <select @change=${e=>this._fire({page_size:Number(e.target.value)})}>
            ${[10,15,25,50].map(e=>{var t;return L`
              <option value=${e} ?selected=${(null!==(t=o.page_size)&&void 0!==t?t:25)===e}>${e} movies</option>
            `})}
          </select>
        </div>
        <div class="field">
          <label>Default Sort</label>
          <select @change=${this._str("default_sort")}>
            ${["added","title","year","status"].map(e=>{var t;return L`
              <option value=${e} ?selected=${(null!==(t=o.default_sort)&&void 0!==t?t:"added")===e}>${e}</option>
            `})}
          </select>
        </div>
        <div class="field">
          <label>Default Filter</label>
          <select @change=${this._str("default_filter")}>
            ${["all","available","missing","downloading"].map(e=>{var t;return L`
              <option value=${e} ?selected=${(null!==(t=o.default_filter)&&void 0!==t?t:"all")===e}>${e}</option>
            `})}
          </select>
        </div>
        <div class="field">
          <label>Poster Border Radius in px (default: 8)</label>
          <input type="number" min="0" max="24"
            .value=${String(null!==(r=o.poster_radius)&&void 0!==r?r:8)}
            @change=${e=>this._fire({poster_radius:Number(e.target.value)})} />
        </div>
        <div class="field-row">
          <input type="checkbox"
            ?checked=${!1!==o.show_status_badges}
            @change=${e=>this._fire({show_status_badges:e.target.checked})} />
          <label>Show status badges on posters</label>
        </div>
        <div class="field-row">
          <input type="checkbox"
            ?checked=${!1!==o.show_filter_counts}
            @change=${e=>this._fire({show_filter_counts:e.target.checked})} />
          <label>Show movie counts on filter tabs</label>
        </div>
        <div class="field-row">
          <input type="checkbox"
            ?checked=${!1!==o.show_quality}
            @change=${e=>this._fire({show_quality:e.target.checked})} />
          <label>Show quality profile in movie detail</label>
        </div>
        <div class="field-row">
          <input type="checkbox"
            ?checked=${!1!==o.show_file_info}
            @change=${e=>this._fire({show_file_info:e.target.checked})} />
          <label>Show file info (size &amp; codec) in movie detail</label>
        </div>
        <div class="field-row">
          <input type="checkbox"
            ?checked=${!1!==o.show_refresh_button}
            @change=${e=>this._fire({show_refresh_button:e.target.checked})} />
          <label>Show refresh button in header</label>
        </div>
      </div>
    `}_str(e){return t=>this._fire({[e]:t.target.value})}_fire(e){this._config={...this._config,...e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0})),this.requestUpdate()}};fe.styles=a`
    .form { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
    .field { display: flex; flex-direction: column; gap: 4px; }
    .field-row { display: flex; align-items: center; gap: 8px; }
    label { color: var(--secondary-text-color); font-size: 0.85rem; }
    input:not([type=checkbox]), select {
      background: var(--card-background-color, #1c1c1e);
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      border-radius: 6px;
      color: var(--primary-text-color);
      padding: 6px 10px;
      width: 100%;
      box-sizing: border-box;
    }
  `,e([pe({attribute:!1})],fe.prototype,"hass",void 0),e([ue()],fe.prototype,"_entries",void 0),fe=e([le("radarr-hacs-card-editor")],fe);const ge="radarr_hacs",me=[{key:"all",label:"All"},{key:"available",label:"Available"},{key:"missing",label:"Missing"},{key:"unmonitored",label:"Unmonitored"},{key:"downloading",label:"Downloading"}];let be=class extends ne{constructor(){super(...arguments),this.activeFilter="all"}render(){return L`${me.map(e=>L`
      <button
        class=${e.key===this.activeFilter?"active":""}
        @click=${()=>this._select(e.key)}
      >${e.label}${null!=this.counts&&null!=this.counts[e.key]?L` <span class="count">${this.counts[e.key]}</span>`:""}</button>
    `)}`}_select(e){this.dispatchEvent(new CustomEvent("filter-change",{detail:e,bubbles:!0,composed:!0}))}};be.styles=a`
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 10px 16px;
    }
    button {
      background: var(--rc-chip-bg, rgba(255, 255, 255, 0.05));
      border: 1px solid var(--rc-outline, rgba(255, 255, 255, 0.09));
      border-radius: var(--rc-chip-radius, 20px);
      color: var(--rc-text-secondary, var(--secondary-text-color));
      cursor: pointer;
      font-size: 0.82rem;
      letter-spacing: 0.02em;
      padding: 4px 14px;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    button.active::before { content: var(--rc-chip-check, ""); }
    button:hover {
      background: color-mix(in srgb, var(--rc-text, #fff) 8%, transparent);
      color: var(--rc-text, var(--primary-text-color));
    }
    button.active {
      background: var(--rc-accent-container, var(--primary-color));
      border-color: var(--rc-accent-container, var(--primary-color));
      color: var(--rc-on-accent, var(--text-primary-color, #fff));
      font-weight: 600;
    }
    .count {
      background: color-mix(in srgb, var(--rc-text, #fff) 15%, transparent);
      border-radius: 10px;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 1px 6px;
    }
    button.active .count {
      background: color-mix(in srgb, var(--rc-on-accent, #000) 22%, transparent);
    }
  `,e([pe()],be.prototype,"activeFilter",void 0),e([pe({attribute:!1})],be.prototype,"counts",void 0),be=e([le("radarr-filter-chips")],be);let ye=class extends ne{constructor(){super(...arguments),this.selected=!1,this.showBadge=!0,this.radius=8}get _poster(){var e,t,i,r;return null!==(r=null===(i=null===(t=null===(e=this.movie)||void 0===e?void 0:e.images)||void 0===t?void 0:t.find(e=>"poster"===e.coverType))||void 0===i?void 0:i.remoteUrl)&&void 0!==r?r:""}get _downloadPct(){var e;const t=null===(e=this.movie)||void 0===e?void 0:e.queueItem;return t&&0!==t.size?Math.round(100*(1-t.sizeleft/t.size)):0}render(){const e=function(e){return e.hasFile?"available":e.monitored?"missing":"unmonitored"}(this.movie);return L`
      <div
        class="wrap ${this.selected?"selected":""}"
        style="--r:${this.radius}px"
        @click=${()=>this.dispatchEvent(new CustomEvent("poster-click",{detail:this.movie,bubbles:!0,composed:!0}))}
      >
        ${this._poster?L`<img src=${this._poster} alt=${this.movie.title} loading="lazy"
              @error=${e=>e.target.style.display="none"} />`:L`<div class="placeholder">
              <span>${this.movie.title}</span>
              ${this.movie.year?L`<span>(${this.movie.year})</span>`:V}
            </div>`}
        ${this.showBadge&&!1!==this.movie.inLibrary?L`
          <span class="badge ${e}">${e}</span>
        `:""}
        ${this.movie.queueItem?L`
          <div class="progress-bar">
            <div class="progress-fill" style="width:${this._downloadPct}%"></div>
          </div>
        `:V}
      </div>
    `}};ye.styles=a`
    :host { display: block; cursor: pointer; }
    .wrap {
      aspect-ratio: 2 / 3;
      border: 2px solid transparent;
      border-radius: var(--r, 8px);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      position: relative;
      transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s;
    }
    .wrap:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
      transform: scale(1.025);
    }
    .wrap.selected {
      border-color: var(--rc-accent, var(--primary-color));
      box-shadow: 0 0 0 2px var(--rc-accent, var(--primary-color)), 0 6px 20px rgba(0, 0, 0, 0.35);
    }
    img {
      background: var(--rc-surface-container, rgba(255, 255, 255, 0.04));
      display: block;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
    .placeholder {
      align-items: center;
      background: var(--rc-surface-container, rgba(255, 255, 255, 0.04));
      color: var(--rc-text-secondary, var(--secondary-text-color));
      display: flex;
      flex-direction: column;
      font-size: 0.72rem;
      gap: 4px;
      height: 100%;
      justify-content: center;
      padding: 8px;
      text-align: center;
    }
    .badge {
      border-radius: 10px;
      bottom: 6px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.4);
      font-size: 0.62rem;
      font-weight: 700;
      left: 6px;
      letter-spacing: 0.05em;
      padding: 2px 7px;
      position: absolute;
      text-transform: uppercase;
    }
    .badge.available    { background: #43a047; color: #fff; }
    .badge.missing      { background: #f57c00; color: #fff; }
    .badge.unmonitored  { background: #757575; color: #fff; }
    .progress-bar {
      background: rgba(0,0,0,0.4);
      bottom: 0;
      height: 4px;
      left: 0;
      position: absolute;
      right: 0;
    }
    .progress-fill {
      background: var(--primary-color);
      height: 100%;
      transition: width 1s linear;
    }
  `,e([pe({attribute:!1})],ye.prototype,"movie",void 0),e([pe({type:Boolean})],ye.prototype,"selected",void 0),e([pe({type:Boolean})],ye.prototype,"showBadge",void 0),e([pe({type:Number})],ye.prototype,"radius",void 0),ye=e([le("radarr-movie-poster")],ye);let $e=class extends ne{constructor(){super(...arguments),this.open=!1,this.qualityProfiles=[],this.rootFolders=[],this.showQuality=!0,this.showFileInfo=!0,this._monitored=!0,this._adding=!1,this._confirmDelete=!1,this._searchQueued=!1}get _poster(){var e,t,i,r;return null!==(r=null===(i=null===(t=null===(e=this.movie)||void 0===e?void 0:e.images)||void 0===t?void 0:t.find(e=>"poster"===e.coverType))||void 0===i?void 0:i.remoteUrl)&&void 0!==r?r:""}get _rating(){var e,t,i,r,o;const s=null!==(i=null===(t=null===(e=this.movie)||void 0===e?void 0:e.ratings)||void 0===t?void 0:t.tmdb)&&void 0!==i?i:null===(o=null===(r=this.movie)||void 0===r?void 0:r.ratings)||void 0===o?void 0:o.imdb;return s?`★ ${s.value.toFixed(1)}`:""}get _showAddForm(){var e;return!1===(null===(e=this.movie)||void 0===e?void 0:e.inLibrary)}get _downloadPct(){var e;const t=null===(e=this.movie)||void 0===e?void 0:e.queueItem;return t&&0!==t.size?Math.round(100*(1-t.sizeleft/t.size)):0}_formatTimeLeft(e){if(!e)return"";const t=e.split(":").map(Number);if(3!==t.length)return e;const[i,r]=t;return i>0?`${i}h ${r}m left`:r>0?`${r}m left`:"< 1m left"}get _qualityProfileName(){var e,t;if(this.showQuality&&(null===(e=this.movie)||void 0===e?void 0:e.qualityProfileId))return null===(t=this.qualityProfiles.find(e=>e.id===this.movie.qualityProfileId))||void 0===t?void 0:t.name}get _fileInfoStr(){var e,t,i;if(!this.showFileInfo||!(null===(e=this.movie)||void 0===e?void 0:e.movieFile))return;const{quality:r,size:o}=this.movie.movieFile;return[null!==(i=null===(t=null==r?void 0:r.quality)||void 0===t?void 0:t.name)&&void 0!==i?i:"",o>1e9?`${(o/1e9).toFixed(1)} GB`:`${Math.round(o/1e6)} MB`].filter(Boolean).join(" · ")}updated(e){e.has("movie")&&(this._profileId=void 0,this._folder=void 0,this._monitored=!0,this._adding=!1,this._addError=void 0,this._confirmDelete=!1,this._searchQueued=!1)}render(){var e,t;if(!this.movie)return L``;const i=this.movie;return L`
      <div class="panel">
        <div class="poster">
          ${this._poster?L`<img src=${this._poster} alt=${i.title} />`:L`
              <div class="poster-placeholder">
                <span>${i.title}</span>
                ${i.year?L`<span>(${i.year})</span>`:V}
              </div>
            `}
        </div>
        <div>
          <h2>${i.title}${i.year?L` <span style="font-weight:400;opacity:.7">(${i.year})</span>`:""}</h2>
          <div class="meta">
            ${[i.runtime?`${i.runtime} min`:"",null===(e=i.genres)||void 0===e?void 0:e.slice(0,3).join(", "),null!==(t=i.studio)&&void 0!==t?t:"",this._rating].filter(Boolean).join(" · ")}
          </div>
          ${this._qualityProfileName?L`
            <div class="info-row"><strong>Quality:</strong> ${this._qualityProfileName}</div>
          `:V}
          ${this._fileInfoStr?L`
            <div class="info-row"><strong>File:</strong> ${this._fileInfoStr}</div>
          `:V}
          ${i.overview?L`<div class="overview">${i.overview}</div>`:""}

          ${this._showAddForm?L`
            <div class="actions">
              <span style="color:var(--secondary-text-color);font-size:.85rem">Not in library</span>
            </div>
          `:L`
            <div class="actions">
              <button
                class=${i.monitored?"monitored-on":"monitored-off"}
                @click=${this._toggleMonitored}
              >${i.monitored?"● Monitored":"○ Unmonitored"}</button>

              ${i.monitored&&!i.hasFile?L`
                <button
                  class=${this._searchQueued?"success":""}
                  ?disabled=${this._searchQueued}
                  @click=${this._searchNow}
                >${this._searchQueued?"✓ Search queued":"Search now"}</button>
              `:V}

              ${this._confirmDelete?L`
                <button class="danger" @click=${this._deleteMovie}>Confirm delete</button>
                <button @click=${()=>{this._confirmDelete=!1}}>Cancel</button>
              `:L`
                <button class="danger" @click=${()=>{this._confirmDelete=!0}}>Delete</button>
              `}
            </div>
          `}
        </div>

        ${this.movie.queueItem?L`
          <div class="download-progress">
            <div class="progress-header">
              <span class="progress-label">Downloading${this.movie.queueItem.protocol?` · ${this.movie.queueItem.protocol}`:""}</span>
              <span class="progress-time">${this._formatTimeLeft(this.movie.queueItem.timeleft)}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${this._downloadPct}%"></div>
            </div>
            <div class="progress-pct">${this._downloadPct}%</div>
          </div>
        `:V}

        ${this._showAddForm?L`
          <div class="add-form">
            <div class="form-row">
              <label>Quality Profile</label>
              <select @change=${e=>this._profileId=Number(e.target.value)}>
                <option value="">Select…</option>
                ${this.qualityProfiles.map(e=>L`<option value=${e.id}>${e.name}</option>`)}
              </select>
            </div>
            <div class="form-row">
              <label>Root Folder</label>
              <select @change=${e=>this._folder=e.target.value}>
                <option value="">Select…</option>
                ${this.rootFolders.map(e=>L`<option value=${e.path}>${e.path}</option>`)}
              </select>
            </div>
            <div class="form-row">
              <label>Monitored</label>
              <input type="checkbox" ?checked=${this._monitored}
                @change=${e=>this._monitored=e.target.checked} />
            </div>
            ${this._addError?L`<div class="add-error">${this._addError}</div>`:""}
            <button
              class="primary"
              ?disabled=${this._adding||!this._profileId||!this._folder}
              @click=${this._addMovie}
            >${this._adding?"Adding…":"+ Add to Radarr"}</button>
          </div>
        `:""}
      </div>
    `}_toggleMonitored(){this.dispatchEvent(new CustomEvent("toggle-monitored",{detail:{movie:this.movie,monitored:!this.movie.monitored},bubbles:!0,composed:!0}))}_searchNow(){this._searchQueued=!0,this.dispatchEvent(new CustomEvent("search-now",{detail:this.movie,bubbles:!0,composed:!0}))}_deleteMovie(){this._confirmDelete=!1,this.dispatchEvent(new CustomEvent("delete-movie",{detail:this.movie,bubbles:!0,composed:!0}))}_addMovie(){this._profileId&&this._folder&&(this._adding=!0,this._addError=void 0,this.dispatchEvent(new CustomEvent("add-movie",{detail:{movie:this.movie,qualityProfileId:this._profileId,rootFolder:this._folder,monitored:this._monitored},bubbles:!0,composed:!0})))}addComplete(e){this._adding=!1,e&&(this._addError=e)}};$e.styles=a`
    :host {
      display: block;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, opacity 0.2s ease;
    }
    :host([open]) { max-height: 1200px; opacity: 1; }

    .panel {
      background: var(--rc-surface-container, rgba(255, 255, 255, 0.04));
      border: 1px solid var(--rc-outline, rgba(255, 255, 255, 0.08));
      border-radius: var(--rc-radius, 12px);
      display: grid;
      gap: 16px;
      grid-template-columns: auto 1fr;
      margin: 0 8px 8px;
      padding: 16px;
    }
    .poster img {
      border-radius: 8px;
      display: block;
      width: 120px;
    }
    .poster-placeholder {
      align-items: center;
      aspect-ratio: 2 / 3;
      background: var(--rc-surface-container, rgba(255,255,255,0.05));
      border-radius: 8px;
      color: var(--secondary-text-color);
      display: flex;
      flex-direction: column;
      font-size: 0.75rem;
      gap: 4px;
      justify-content: center;
      padding: 8px;
      text-align: center;
      width: 120px;
    }
    h2 { font-size: 1.15rem; margin: 0 0 4px; color: var(--rc-text, var(--primary-text-color)); }
    .meta { color: var(--rc-text-secondary, var(--secondary-text-color)); font-size: 0.82rem; line-height: 1.6; }
    .info-row { color: var(--rc-text-secondary, var(--secondary-text-color)); font-size: 0.8rem; margin-top: 4px; }
    .info-row strong { color: var(--rc-text, var(--primary-text-color)); }
    .overview { font-size: 0.88rem; line-height: 1.55; margin-top: 8px; color: var(--rc-text, var(--primary-text-color)); }
    .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }

    button {
      background: var(--rc-surface-container, rgba(255, 255, 255, 0.07));
      border: 1px solid var(--rc-outline, rgba(255, 255, 255, 0.12));
      border-radius: var(--rc-control-radius, 8px);
      color: var(--rc-text, var(--primary-text-color));
      cursor: pointer;
      font-size: 0.84rem;
      padding: 6px 14px;
      transition: background 0.15s;
    }
    button:hover { background: color-mix(in srgb, var(--rc-text, #fff) 12%, transparent); }
    button.primary {
      background: var(--rc-accent-container, var(--primary-color));
      border-color: var(--rc-accent-container, var(--primary-color));
      color: var(--rc-on-accent, var(--text-primary-color, #fff));
    }
    button.primary:disabled { opacity: 0.5; cursor: default; }
    button.primary:hover:not(:disabled) { filter: brightness(1.1); }
    button.danger { border-color: #f44336; color: #f44336; }
    button.danger:hover { background: rgba(244,67,54,0.12); }
    button.monitored-on  { border-color: #43a047; color: #43a047; }
    button.monitored-off { border-color: #757575; color: #9e9e9e; }
    button.success { border-color: #43a047; color: #43a047; }

    .add-form { grid-column: 1 / -1; }
    .form-row {
      align-items: center;
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
    .form-row label { font-size: 0.84rem; min-width: 120px; }
    select {
      background: var(--rc-surface-container, rgba(255, 255, 255, 0.06));
      border: 1px solid var(--rc-outline, rgba(255, 255, 255, 0.1));
      border-radius: var(--rc-control-radius, 6px);
      color: var(--rc-text, var(--primary-text-color));
      flex: 1;
      padding: 6px 10px;
    }
    .add-error { color: var(--error-color, #f44336); font-size: 0.8rem; margin-bottom: 8px; }
    .download-progress {
      grid-column: 1 / -1;
      margin-top: 4px;
    }
    .progress-header {
      align-items: center;
      display: flex;
      font-size: 0.8rem;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .progress-label { color: var(--rc-text-secondary, var(--secondary-text-color)); }
    .progress-time { color: var(--rc-text, var(--primary-text-color)); font-weight: 500; }
    .progress-track {
      background: color-mix(in srgb, var(--rc-text, #fff) 8%, transparent);
      border-radius: 4px;
      height: 6px;
      overflow: hidden;
    }
    .progress-fill {
      background: var(--rc-accent, var(--primary-color));
      border-radius: 4px;
      height: 100%;
      transition: width 1s linear;
    }
    .progress-pct {
      color: var(--rc-text-secondary, var(--secondary-text-color));
      font-size: 0.75rem;
      margin-top: 4px;
      text-align: right;
    }
  `,e([pe({type:Boolean,reflect:!0})],$e.prototype,"open",void 0),e([pe({attribute:!1})],$e.prototype,"movie",void 0),e([pe({attribute:!1})],$e.prototype,"qualityProfiles",void 0),e([pe({attribute:!1})],$e.prototype,"rootFolders",void 0),e([pe({type:Boolean})],$e.prototype,"showQuality",void 0),e([pe({type:Boolean})],$e.prototype,"showFileInfo",void 0),e([ue()],$e.prototype,"_profileId",void 0),e([ue()],$e.prototype,"_folder",void 0),e([ue()],$e.prototype,"_monitored",void 0),e([ue()],$e.prototype,"_adding",void 0),e([ue()],$e.prototype,"_addError",void 0),e([ue()],$e.prototype,"_confirmDelete",void 0),e([ue()],$e.prototype,"_searchQueued",void 0),$e=e([le("radarr-movie-detail")],$e);const xe="radarr_hacs";let we=class extends ne{constructor(){super(...arguments),this._movies=[],this._filteredMovies=[],this._qualityProfiles=[],this._rootFolders=[],this._dialogOpen=!1,this._addMode=!1,this._activeFilter="all",this._searchTerm="",this._tmdbForced=!1,this._isTmdbView=!1,this._loading=!1,this._initialised=!1,this._searchGen=0}static getConfigElement(){return document.createElement("radarr-hacs-card-editor")}static async getStubConfig(e){var t;try{const i=(await e.connection.sendMessagePromise({type:"config_entries/get",domain:xe})).find(e=>e.domain===xe);return{entry_id:null!==(t=null==i?void 0:i.entry_id)&&void 0!==t?t:""}}catch{return{entry_id:""}}}setConfig(e){var t;if(!e.entry_id)throw new Error("entry_id is required");this._config={columns:4,default_sort:"added",default_filter:"all",show_status_badges:!0,poster_radius:8,page_size:25,show_quality:!0,show_file_info:!0,show_filter_counts:!0,show_refresh_button:!0,...e},this._activeFilter=null!==(t=this._config.default_filter)&&void 0!==t?t:"all"}updated(e){var t,i,r,o,s,a;if(e.has("hass")||e.has("_config")){this.setAttribute("data-appearance",null!==(i=null===(t=this._config)||void 0===t?void 0:t.appearance)&&void 0!==i?i:"glass");const e=null!==(s=null===(o=null===(r=this.hass)||void 0===r?void 0:r.themes)||void 0===o?void 0:o.darkMode)&&void 0!==s?s:window.matchMedia("(prefers-color-scheme: dark)").matches;this.toggleAttribute("data-dark",!!e)}e.has("hass")&&this.hass&&this._config&&!this._initialised&&(this._initialised=!0,this._loadData()),e.has("_dialogOpen")&&this._dialogOpen&&(null===(a=this._dialog)||void 0===a||a.showModal())}get _pageSize(){var e,t;return null!==(t=null===(e=this._config)||void 0===e?void 0:e.page_size)&&void 0!==t?t:25}get _displayMovies(){return this._pageSize>0?this._filteredMovies.slice(0,this._pageSize):this._filteredMovies}get _hasMore(){return this._pageSize>0&&this._filteredMovies.length>this._pageSize}get _filterCounts(){const e=this._movies;return{all:e.length,available:e.filter(e=>e.hasFile).length,missing:e.filter(e=>!e.hasFile&&e.monitored).length,unmonitored:e.filter(e=>!e.hasFile&&!e.monitored).length,downloading:e.filter(e=>e.inQueue).length}}disconnectedCallback(){super.disconnectedCallback(),this._queueTimer&&(clearInterval(this._queueTimer),this._queueTimer=void 0)}async _loadData(e=!1){var t,i,r,o;const s=e?null===(t=this._selectedMovie)||void 0===t?void 0:t.id:void 0,a=e?null===(i=this._dialogSelectedMovie)||void 0===i?void 0:i.id:void 0;this._loading=!e,this._error=void 0;try{const[e,t]=await Promise.all([ve(this.hass,this._config.entry_id,{filter:"all"!==this._activeFilter?this._activeFilter:void 0,sort:this._config.default_sort}),_e(this.hass,this._config.entry_id)]);this._movies=e,this._qualityProfiles=t.quality_profiles,this._rootFolders=t.root_folders,this._addMode||this._isTmdbView||(this._filteredMovies=e,null!=s&&(this._selectedMovie=null!==(r=e.find(e=>e.id===s))&&void 0!==r?r:this._selectedMovie),null!=a&&(this._dialogSelectedMovie=null!==(o=e.find(e=>e.id===a))&&void 0!==o?o:this._dialogSelectedMovie));const i=e.some(e=>e.inQueue);i&&!this._queueTimer?this._queueTimer=setInterval(()=>this._loadData(!0),15e3):!i&&this._queueTimer&&(clearInterval(this._queueTimer),this._queueTimer=void 0)}catch(e){this._error=`Could not connect to Radarr: ${e}`}finally{this._loading=!1}}_onSearchInput(e){if(this._searchTerm=e.target.value,this._searchGen++,clearTimeout(this._debounceTimer),this._addMode)return void(this._searchTerm?this._debounceTimer=setTimeout(()=>this._tmdbSearch(),300):this._filteredMovies=[]);this._tmdbForced=!1,this._isTmdbView=!1;const t=this._searchTerm.toLowerCase();t?(this._filteredMovies=this._movies.filter(e=>e.title.toLowerCase().includes(t)||String(e.year).includes(t)),0===this._filteredMovies.length&&(this._debounceTimer=setTimeout(()=>this._tmdbSearch(),400))):this._filteredMovies=this._movies}_forceSearchTmdb(){this._tmdbForced=!0,this._searchGen++,clearTimeout(this._debounceTimer),this._tmdbSearch()}async _tmdbSearch(){if(!this._searchTerm)return;const e=this._searchGen;try{const t=await async function(e,t,i){return(await e.connection.sendMessagePromise({type:"radarr_hacs/search_movies",entry_id:t,term:i})).results.map(e=>{var t,i;const r=(null!==(t=e.id)&&void 0!==t?t:0)>0;return{...e,inLibrary:r,id:r?e.id:-(null!==(i=e.tmdbId)&&void 0!==i?i:0)}})}(this.hass,this._config.entry_id,this._searchTerm);this._searchGen===e&&(this._filteredMovies=t,this._isTmdbView=!0)}catch(e){}}_enterAddMode(){this._addMode=!0,this._searchTerm="",this._filteredMovies=[],this._selectedMovie=void 0,this.updateComplete.then(()=>{var e,t;null===(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".search"))||void 0===t||t.focus()})}_exitAddMode(){this._addMode=!1,this._isTmdbView=!1,this._searchTerm="",this._selectedMovie=void 0,this._filteredMovies=this._movies}async _onFilterChange(e){this._activeFilter=e,this._selectedMovie=void 0,this._dialogSelectedMovie=void 0,this._isTmdbView=!1,this._addMode&&this._exitAddMode();try{this._movies=await ve(this.hass,this._config.entry_id,{filter:"all"!==e?e:void 0,sort:this._config.default_sort}),this._filteredMovies=this._movies}catch(e){this._error=String(e)}}_onPosterClick(e){var t;this._selectedMovie=(null===(t=this._selectedMovie)||void 0===t?void 0:t.id)===e.id?void 0:e}_onDialogPosterClick(e){var t;this._dialogSelectedMovie=(null===(t=this._dialogSelectedMovie)||void 0===t?void 0:t.id)===e.id?void 0:e}async _onAddMovie(e,t,i,r){try{return await async function(e,t,i,r,o,s=!0){await e.callService("radarr_hacs","add_movie",{entry_id:t,tmdb_id:i.tmdbId,title:i.title,year:i.year,quality_profile_id:r,root_folder:o,monitored:s})}(this.hass,this._config.entry_id,e,t,i,r),this._selectedMovie=void 0,this._dialogSelectedMovie=void 0,this._addMode&&this._exitAddMode(),void await this._loadData()}catch(e){return String(e)}}async _onDeleteMovie(e){try{await async function(e,t,i,r=!1){await e.callService("radarr_hacs","delete_movie",{entry_id:t,movie_id:i,delete_files:r})}(this.hass,this._config.entry_id,e.id),this._selectedMovie=void 0,this._dialogSelectedMovie=void 0}catch(e){this._error=`Delete failed: ${e}`}finally{await this._loadData()}}async _onToggleMonitored(e){var t,i;const{movie:r,monitored:o}=e.detail;try{await async function(e,t,i,r){await e.callService("radarr_hacs","toggle_monitored",{entry_id:t,movie_id:i,monitored:r})}(this.hass,this._config.entry_id,r.id,o),await this._loadData(),(null===(t=this._selectedMovie)||void 0===t?void 0:t.id)===r.id&&(this._selectedMovie=this._filteredMovies.find(e=>e.id===r.id)),(null===(i=this._dialogSelectedMovie)||void 0===i?void 0:i.id)===r.id&&(this._dialogSelectedMovie=this._filteredMovies.find(e=>e.id===r.id))}catch(e){this._error=`Could not update monitored: ${e}`}}async _onSearchNow(e){const t=e.detail;try{await async function(e,t,i){await e.callService("radarr_hacs","trigger_search",{entry_id:t,movie_id:i})}(this.hass,this._config.entry_id,t.id)}catch(e){this._error=`Search failed: ${e}`}}async _onAddMovieEvent(e){const{movie:t,qualityProfileId:i,rootFolder:r,monitored:o}=e.detail,s=e.target,a=await this._onAddMovie(t,i,r,o);s.addComplete(a)}async _onDeleteMovieEvent(e){await this._onDeleteMovie(e.detail)}_onDialogSearchAgain(e){this._dialogSelectedMovie=void 0,this._tmdbForced=!1;const t=e.detail;this._searchTerm=t.title;const i=t.title.toLowerCase();this._filteredMovies=this._movies.filter(e=>e.title.toLowerCase().includes(i)),0===this._filteredMovies.length&&setTimeout(()=>this._tmdbSearch(),400)}_openDialog(){this._dialogOpen=!0}_onDialogClose(){this._dialogOpen=!1,this._dialogSelectedMovie=void 0}_renderGrid(e,t,i,r,o,s,a,n){var d,l;if(!e.length)return L`<div class="empty">${this._addMode&&this._searchTerm?"No results on TMDB":"No movies found"}</div>`;const c=null!==(l=null===(d=this._config)||void 0===d?void 0:d.columns)&&void 0!==l?l:4,h=null!=t?e.findIndex(e=>e.id===t.id):-1,p=h>=0?Math.min(Math.floor(h/c)*c+c-1,e.length-1):-1;return L`
      <div class="grid" style="grid-template-columns:repeat(${c},1fr)">
        ${e.map((e,d)=>{var l,c,h,u,v;return L`
          <radarr-movie-poster
            .movie=${e}
            ?selected=${e.id===(null==t?void 0:t.id)}
            .showBadge=${!1!==(null===(l=this._config)||void 0===l?void 0:l.show_status_badges)}
            .radius=${null!==(h=null===(c=this._config)||void 0===c?void 0:c.poster_radius)&&void 0!==h?h:8}
            @poster-click=${()=>i(e)}
          ></radarr-movie-poster>
          ${d===p?L`
            <div class="inline-detail">
              <radarr-movie-detail
                open
                .movie=${t}
                .qualityProfiles=${this._qualityProfiles}
                .rootFolders=${this._rootFolders}
                .showQuality=${!1!==(null===(u=this._config)||void 0===u?void 0:u.show_quality)}
                .showFileInfo=${!1!==(null===(v=this._config)||void 0===v?void 0:v.show_file_info)}
                @add-movie=${r}
                @delete-movie=${o}
                @toggle-monitored=${s}
                @search-now=${a}
                ${n?L``:""}
              ></radarr-movie-detail>
            </div>
          `:V}
        `})}
      </div>
    `}render(){var e;if(!this._config)return L``;const t=null!==(e=this._config.card_title)&&void 0!==e?e:"Radarr",i=!1!==this._config.show_filter_counts;return L`
      <ha-card>
      <div class="header">
        ${this._addMode?L`
          <button class="icon-btn" @click=${this._exitAddMode}>← Back</button>
          <input
            class="search"
            type="search"
            placeholder="Search TMDB to add a movie…"
            .value=${this._searchTerm}
            @input=${this._onSearchInput}
          />
        `:L`
          <span class="title">${t}</span>
          <input
            class="search"
            type="search"
            placeholder="Search library…"
            .value=${this._searchTerm}
            @input=${this._onSearchInput}
          />
          <button class="icon-btn add-btn" @click=${this._enterAddMode}>+ Add</button>
          ${!1!==this._config.show_refresh_button?L`
            <button class="icon-btn" @click=${()=>this._loadData()} title="Refresh">↻</button>
          `:V}
        `}
      </div>

      ${this._addMode?V:L`
        <radarr-filter-chips
          .activeFilter=${this._activeFilter}
          .counts=${i?this._filterCounts:void 0}
          @filter-change=${e=>this._onFilterChange(e.detail)}
        ></radarr-filter-chips>
      `}

      ${this._loading?L`<div class="state-msg">Loading…</div>`:""}

      ${this._error?L`
        <div class="state-msg error-msg">
          ${this._error}
          <br/>
          <button class="retry" @click=${()=>{this._error=void 0,this._loadData()}}>Retry</button>
        </div>
      `:""}

      ${this._loading||this._error?"":L`
        ${this._addMode&&!this._searchTerm?L`
          <div class="state-msg">Type a movie name to search TMDB</div>
        `:this._renderGrid(this._addMode?this._filteredMovies:this._displayMovies,this._selectedMovie,e=>this._onPosterClick(e),this._onAddMovieEvent,this._onDeleteMovieEvent,this._onToggleMonitored,this._onSearchNow)}
        ${!this._addMode&&this._hasMore?L`
          <button class="view-all" @click=${this._openDialog}>
            View all ${this._filteredMovies.length} movies →
          </button>
        `:""}
        ${!this._addMode&&this._searchTerm&&this._filteredMovies.length>0&&!this._tmdbForced?L`
          <div style="padding:4px 16px 8px;text-align:right">
            <a style="color:var(--primary-color);font-size:.82rem;opacity:.85;text-decoration:none"
              href="#" @click=${e=>{e.preventDefault(),this._forceSearchTmdb()}}
            >Search TMDB →</a>
          </div>
        `:""}
      `}
      </ha-card>

      <dialog @close=${this._onDialogClose}>
        ${this._dialogOpen?L`
          <div class="dialog-header">
            <span class="title">${t}</span>
            <input
              class="search"
              type="search"
              placeholder="Search library…"
              .value=${this._searchTerm}
              @input=${this._onSearchInput}
            />
            <button class="icon-btn" @click=${()=>{var e;return null===(e=this._dialog)||void 0===e?void 0:e.close()}}>✕</button>
          </div>
          <radarr-filter-chips
            .activeFilter=${this._activeFilter}
            .counts=${i?this._filterCounts:void 0}
            @filter-change=${e=>this._onFilterChange(e.detail)}
          ></radarr-filter-chips>
          ${this._renderGrid(this._filteredMovies,this._dialogSelectedMovie,e=>this._onDialogPosterClick(e),this._onAddMovieEvent,this._onDeleteMovieEvent,this._onToggleMonitored,this._onSearchNow,this._onDialogSearchAgain)}
          ${this._searchTerm&&this._filteredMovies.length>0&&!this._tmdbForced?L`
            <div style="padding:4px 16px 8px;text-align:right">
              <a style="color:var(--primary-color);font-size:.82rem;opacity:.85;text-decoration:none"
                href="#" @click=${e=>{e.preventDefault(),this._forceSearchTmdb()}}
              >Search TMDB →</a>
            </div>
          `:""}
        `:""}
      </dialog>
    `}};we.styles=a`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      /* ---- Glass tokens (default appearance, theme-adaptive) ---- */
      --rc-text: var(--primary-text-color);
      --rc-text-secondary: var(--secondary-text-color);
      --rc-surface: var(--ha-card-background, var(--card-background-color));
      /* derives from --rc-text (defined above) so overlays adapt to light/dark */
      --rc-surface-container: color-mix(in srgb, var(--rc-text) 8%, transparent);
      --rc-outline: var(--divider-color, color-mix(in srgb, var(--rc-text) 12%, transparent));
      --rc-accent: var(--primary-color);
      --rc-accent-container: var(--primary-color);
      --rc-on-accent: var(--text-primary-color, #fff);
      --rc-radius: var(--ha-card-border-radius, 12px);
      --rc-control-radius: 8px;
      --rc-chip-radius: 20px;
      --rc-chip-bg: var(--rc-surface-container);
      --rc-chip-check: "";
    }
    /* ---- Material You — light scheme ---- */
    :host([data-appearance="material"]) {
      --rc-text: #1c1b1a;
      --rc-text-secondary: #5f5b55;
      --rc-surface: color-mix(in srgb, var(--primary-color) 5%, #ffffff);
      --rc-surface-container: color-mix(in srgb, var(--primary-color) 8%, #ffffff);
      --rc-outline: color-mix(in srgb, var(--primary-color) 15%, #b5ada5);
      --rc-accent: var(--primary-color);
      --rc-accent-container: color-mix(in srgb, var(--primary-color) 22%, #ffffff);
      --rc-on-accent: color-mix(in srgb, var(--primary-color) 75%, #000000);
      --rc-radius: 24px;
      --rc-control-radius: 20px;
      --rc-chip-radius: 8px;
      --rc-chip-bg: transparent;
      --rc-chip-check: "✓ ";
    }
    /* ---- Material You — dark scheme overrides ---- */
    :host([data-appearance="material"][data-dark]) {
      --rc-accent: var(--primary-color);
      --rc-text: #ece5df;
      --rc-text-secondary: #cbc3bb;
      --rc-surface: color-mix(in srgb, var(--primary-color) 6%, #1a1715);
      --rc-surface-container: color-mix(in srgb, var(--primary-color) 10%, #262220);
      --rc-outline: color-mix(in srgb, var(--primary-color) 15%, #4a443d);
      --rc-accent-container: color-mix(in srgb, var(--primary-color) 30%, #000000);
      --rc-on-accent: color-mix(in srgb, var(--primary-color) 60%, #ffffff);
    }
    ha-card {
      overflow: hidden;
      padding: 0;
    }
    /* Material paints its own solid surface; Glass keeps the theme ha-card surface */
    :host([data-appearance="material"]) ha-card {
      background: var(--rc-surface);
      border-radius: var(--rc-radius);
      color: var(--rc-text);
    }
    .header {
      align-items: center;
      background: transparent;
      border-bottom: 1px solid var(--rc-outline);
      display: flex;
      gap: 8px;
      padding: 12px 16px;
    }
    .title {
      color: var(--rc-text);
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      white-space: nowrap;
    }
    .search {
      background: var(--rc-surface-container);
      border: 1px solid var(--rc-outline);
      border-radius: var(--rc-control-radius);
      color: var(--rc-text);
      flex: 1;
      font-size: 0.88rem;
      outline: none;
      padding: 7px 13px;
      transition: border-color 0.15s;
    }
    .search::placeholder { color: var(--rc-text-secondary); opacity: 0.7; }
    .search:focus { border-color: var(--rc-accent); }
    .icon-btn {
      background: var(--rc-surface-container);
      border: 1px solid var(--rc-outline);
      border-radius: var(--rc-control-radius);
      color: var(--rc-text);
      cursor: pointer;
      flex-shrink: 0;
      font-size: 1rem;
      line-height: 1;
      padding: 6px 10px;
      transition: background 0.15s;
      white-space: nowrap;
    }
    .icon-btn:hover { background: color-mix(in srgb, var(--rc-text) 14%, transparent); }
    .icon-btn.add-btn {
      background: var(--rc-accent-container);
      border-color: var(--rc-accent-container);
      color: var(--rc-on-accent);
    }
    .icon-btn.add-btn:hover { filter: brightness(1.05); }
    .state-msg {
      color: var(--rc-text-secondary);
      padding: 40px 24px;
      text-align: center;
    }
    .error-msg { color: var(--error-color, #f44336); }
    .retry {
      background: var(--rc-surface-container);
      border: 1px solid var(--rc-outline);
      border-radius: var(--rc-control-radius);
      color: var(--rc-text);
      cursor: pointer;
      display: inline-block;
      margin-top: 10px;
      padding: 6px 16px;
      transition: background 0.15s;
    }
    .retry:hover { background: color-mix(in srgb, var(--rc-text) 12%, transparent); }
    .grid { display: grid; gap: 8px; padding: 8px; }
    .empty { color: var(--rc-text-secondary); padding: 32px; text-align: center; }
    .inline-detail {
      animation: slideDown 0.2s ease-out;
      grid-column: 1 / -1;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .view-all {
      background: var(--rc-surface-container);
      border: 1px solid var(--rc-outline);
      border-radius: var(--rc-control-radius);
      box-sizing: border-box;
      color: var(--rc-accent);
      cursor: pointer;
      display: block;
      font-size: 0.88rem;
      margin: 0 8px 12px;
      padding: 10px;
      text-align: center;
      transition: background 0.15s;
      width: calc(100% - 16px);
    }
    .view-all:hover { background: color-mix(in srgb, var(--rc-text) 9%, transparent); }
    dialog {
      background: var(--card-background-color, #1c1c1e);
      border: none;
      box-sizing: border-box;
      height: 100dvh;
      inset: 0;
      margin: 0;
      max-height: 100%;
      max-width: 100%;
      overflow-y: auto;
      padding: 0;
      position: fixed;
      width: 100%;
    }
    :host([data-appearance="material"]) dialog {
      background: var(--rc-surface);
      color: var(--rc-text);
    }
    dialog::backdrop { background: rgba(0, 0, 0, 0.6); }
    .dialog-header {
      align-items: center;
      background: var(--rc-surface-container);
      border-bottom: 1px solid var(--rc-outline);
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `,e([pe({attribute:!1})],we.prototype,"hass",void 0),e([ue()],we.prototype,"_config",void 0),e([ue()],we.prototype,"_movies",void 0),e([ue()],we.prototype,"_filteredMovies",void 0),e([ue()],we.prototype,"_qualityProfiles",void 0),e([ue()],we.prototype,"_rootFolders",void 0),e([ue()],we.prototype,"_selectedMovie",void 0),e([ue()],we.prototype,"_dialogSelectedMovie",void 0),e([ue()],we.prototype,"_dialogOpen",void 0),e([ue()],we.prototype,"_addMode",void 0),e([ue()],we.prototype,"_activeFilter",void 0),e([ue()],we.prototype,"_searchTerm",void 0),e([ue()],we.prototype,"_tmdbForced",void 0),e([ue()],we.prototype,"_isTmdbView",void 0),e([ue()],we.prototype,"_loading",void 0),e([ue()],we.prototype,"_error",void 0),e([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(e){return(t,i,r)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}("dialog")],we.prototype,"_dialog",void 0),we=e([le("radarr-hacs-card")],we),window.customCards=window.customCards||[],window.customCards.push({type:"radarr-hacs-card",name:"Radarr Card",description:"Browse and manage your Radarr movie library",preview:!1,documentationURL:"https://github.com/devshm3/radarr-card"}),console.info("%c RADARR-CARD %c 0.1.3 ","background:#f5a623;color:#1a1a1a;font-weight:700","background:#333;color:#fff");export{we as RadarrHacsCard};
