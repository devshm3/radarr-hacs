function t(t,e,i,r){var s,o=arguments.length,a=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(a=(o<3?s(a):o>3?s(e,i,a):s(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new o(i,t,r)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,v=globalThis,_=v.trustedTypes,f=_?_.emptyScript:"",g=v.reactiveElementPolyfillSupport,m=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&d(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...c(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=r;const o=s.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const o=this.constructor;if(!1===r&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[m("elementProperties")]=new Map,x[m("finalized")]=new Map,g?.({ReactiveElement:x}),(v.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,w=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+M,k=`<${P}>`,T=document,R=()=>T.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,N="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,F=/>/g,I=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,B=/"/g,q=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,J=T.createTreeWalker(T,129);function K(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,r=[];let s,o=2===e?"<svg>":3===e?"<math>":"",a=H;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===H?"!--"===l[1]?a=D:void 0!==l[1]?a=F:void 0!==l[2]?(q.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=I):void 0!==l[3]&&(a=I):a===I?">"===l[0]?(a=s??H,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?I:'"'===l[3]?B:z):a===B||a===z?a=I:a===D||a===F?a=H:(a=I,s=void 0);const c=a===I&&t[e+1].startsWith("/>")?" ":"";o+=a===H?i+k:d>=0?(r.push(n),i.slice(0,d)+C+i.slice(d)+M+c):i+M+(-2===d?e:c)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Q{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,o=0;const a=t.length-1,n=this.parts,[l,d]=Z(t,e);if(this.el=Q.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=J.nextNode())&&n.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=d[o++],i=r.getAttribute(t).split(M),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?et:"?"===a[1]?it:"@"===a[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(M)&&(n.push({type:6,index:s}),r.removeAttribute(t));if(q.test(r.tagName)){const t=r.textContent.split(M),e=t.length-1;if(e>0){r.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],R()),J.nextNode(),n.push({type:2,index:++s});r.append(t[e],R())}}}else if(8===r.nodeType)if(r.data===P)n.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(M,t+1));)n.push({type:7,index:s}),t+=M.length-1}s++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,r){if(e===L)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=G(t,s._$AS(t,e.values),s,r)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??T).importNode(e,!0);J.currentNode=r;let s=J.nextNode(),o=0,a=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Y(s,s.nextSibling,this,t):1===n.type?e=new n.ctor(s,n.name,n.strings,this,t):6===n.type&&(e=new st(s,this,t)),this._$AV.push(e),n=i[++a]}o!==n?.index&&(s=J.nextNode(),o++)}return J.currentNode=T,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),U(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new X(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Q(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new Y(this.O(R()),this.O(R()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,r){const s=this.strings;let o=!1;if(void 0===s)t=G(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==L,o&&(this._$AH=t);else{const r=t;let a,n;for(t=s[0],a=0;a<s.length-1;a++)n=G(this,r[i+a],e,a),n===L&&(n=this._$AH[a]),o||=!U(n)||n!==this._$AH[a],n===W?t=W:t!==W&&(t+=(n??"")+s[a+1]),this._$AH[a]=n}o&&!r&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class rt extends tt{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??W)===L)return;const i=this._$AH,r=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==W&&(i===W||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot=A.litHtmlPolyfillSupport;ot?.(Q,Y),(A.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new Y(e.insertBefore(R(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}nt._$litElement$=!0,nt.finalized=!0,at.litElementHydrateSupport?.({LitElement:nt});const lt=at.litElementPolyfillSupport;lt?.({LitElement:nt}),(at.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},ct=(t=ht,e,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return pt({...t,state:!0,attribute:!1})}async function vt(t,e,i={}){const r={type:"radarr_hacs/get_movies",entry_id:e};i.filter&&"all"!==i.filter&&(r.filter=i.filter),i.sort&&(r.sort=i.sort),i.search&&(r.search=i.search);return(await t.connection.sendMessagePromise(r)).movies}async function _t(t,e){return t.connection.sendMessagePromise({type:"radarr_hacs/get_config",entry_id:e})}let ft=class extends nt{setConfig(t){this._config={...t},this.requestUpdate()}render(){var t,e,i,r;if(!this._config)return j``;const s=this._config;return j`
      <div class="form">
        <div class="field">
          <label>Entry ID (required — find in Settings → Devices & Services → Radarr HACS → ⋮ → Integration ID)</label>
          <input .value=${null!==(t=s.entry_id)&&void 0!==t?t:""} @change=${this._str("entry_id")} />
        </div>
        <div class="field">
          <label>Card Title (default: "Radarr")</label>
          <input .value=${null!==(e=s.card_title)&&void 0!==e?e:""} @change=${this._str("card_title")} />
        </div>
        <div class="field">
          <label>Columns (2–8, default: 4)</label>
          <input type="number" min="2" max="8"
            .value=${String(null!==(i=s.columns)&&void 0!==i?i:4)}
            @change=${t=>this._fire({columns:Number(t.target.value)})} />
        </div>
        <div class="field">
          <label>Default Sort</label>
          <select @change=${this._str("default_sort")}>
            ${["added","title","year","status"].map(t=>{var e;return j`
              <option value=${t} ?selected=${(null!==(e=s.default_sort)&&void 0!==e?e:"added")===t}>${t}</option>
            `})}
          </select>
        </div>
        <div class="field">
          <label>Default Filter</label>
          <select @change=${this._str("default_filter")}>
            ${["all","available","missing","downloading"].map(t=>{var e;return j`
              <option value=${t} ?selected=${(null!==(e=s.default_filter)&&void 0!==e?e:"all")===t}>${t}</option>
            `})}
          </select>
        </div>
        <div class="field">
          <label>Poster Border Radius in px (default: 8)</label>
          <input type="number" min="0" max="24"
            .value=${String(null!==(r=s.poster_radius)&&void 0!==r?r:8)}
            @change=${t=>this._fire({poster_radius:Number(t.target.value)})} />
        </div>
        <div class="field-row">
          <input type="checkbox"
            ?checked=${!1!==s.show_status_badges}
            @change=${t=>this._fire({show_status_badges:t.target.checked})} />
          <label>Show Status Badges</label>
        </div>
      </div>
    `}_str(t){return e=>this._fire({[t]:e.target.value})}_fire(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0})),this.requestUpdate()}};ft.styles=a`
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
  `,t([pt({attribute:!1})],ft.prototype,"hass",void 0),ft=t([dt("radarr-hacs-card-editor")],ft);const gt=[{key:"all",label:"All"},{key:"available",label:"Available"},{key:"missing",label:"Missing"},{key:"downloading",label:"Downloading"}];let mt=class extends nt{constructor(){super(...arguments),this.activeFilter="all"}render(){return j`${gt.map(t=>j`
      <button
        class=${t.key===this.activeFilter?"active":""}
        @click=${()=>this._select(t.key)}
      >${t.label}</button>
    `)}`}_select(t){this.dispatchEvent(new CustomEvent("filter-change",{detail:t,bubbles:!0,composed:!0}))}};mt.styles=a`
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 8px 16px;
    }
    button {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 0.85rem;
      padding: 4px 14px;
      transition: background 0.15s, border-color 0.15s;
    }
    button:hover { background: rgba(255, 255, 255, 0.1); }
    button.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
  `,t([pt()],mt.prototype,"activeFilter",void 0),mt=t([dt("radarr-filter-chips")],mt);let yt=class extends nt{constructor(){super(...arguments),this.selected=!1,this.showBadge=!0,this.radius=8}get _poster(){var t,e,i,r;return null!==(r=null===(i=null===(e=null===(t=this.movie)||void 0===t?void 0:t.images)||void 0===e?void 0:e.find(t=>"poster"===t.coverType))||void 0===i?void 0:i.remoteUrl)&&void 0!==r?r:""}render(){const t=function(t){return t.hasFile?"available":!t.hasFile&&t.isAvailable?"downloading":"missing"}(this.movie);return j`
      <div
        class="wrap ${this.selected?"selected":""}"
        style="--r:${this.radius}px"
        @click=${()=>this.dispatchEvent(new CustomEvent("poster-click",{detail:this.movie,bubbles:!0,composed:!0}))}
      >
        <img
          src=${this._poster}
          alt=${this.movie.title}
          loading="lazy"
          @error=${t=>t.target.style.visibility="hidden"}
        />
        ${this.showBadge&&!1!==this.movie.inLibrary?j`
          <span class="badge ${t}">${t}</span>
        `:""}
      </div>
    `}};yt.styles=a`
    :host { display: block; cursor: pointer; }
    .wrap {
      aspect-ratio: 2 / 3;
      border: 2px solid transparent;
      border-radius: var(--r, 8px);
      overflow: hidden;
      position: relative;
      transition: border-color 0.15s, transform 0.15s;
    }
    .wrap:hover { transform: scale(1.02); }
    .wrap.selected { border-color: var(--primary-color); }
    img {
      background: rgba(255, 255, 255, 0.04);
      display: block;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
    .badge {
      border-radius: 10px;
      bottom: 6px;
      font-size: 0.65rem;
      font-weight: 700;
      left: 6px;
      letter-spacing: 0.04em;
      padding: 2px 8px;
      position: absolute;
      text-transform: uppercase;
    }
    .badge.available  { background: #4caf50; color: #fff; }
    .badge.missing    { background: #9e9e9e; color: #fff; }
    .badge.downloading { background: #ff9800; color: #fff; }
  `,t([pt({attribute:!1})],yt.prototype,"movie",void 0),t([pt({type:Boolean})],yt.prototype,"selected",void 0),t([pt({type:Boolean})],yt.prototype,"showBadge",void 0),t([pt({type:Number})],yt.prototype,"radius",void 0),yt=t([dt("radarr-movie-poster")],yt);let $t=class extends nt{constructor(){super(...arguments),this.movies=[],this.columns=4,this.showBadges=!0,this.posterRadius=8}render(){return this.movies.length?j`
      <div class="grid" style="grid-template-columns:repeat(${this.columns},1fr)">
        ${this.movies.map(t=>j`
          <radarr-movie-poster
            .movie=${t}
            ?selected=${t.id===this.selectedMovieId}
            ?showBadge=${this.showBadges}
            .radius=${this.posterRadius}
          ></radarr-movie-poster>
        `)}
      </div>
    `:j`<div class="empty">No movies found</div>`}};$t.styles=a`
    :host { display: block; padding: 8px; }
    .grid { display: grid; gap: 8px; }
    .empty {
      color: var(--secondary-text-color);
      padding: 32px;
      text-align: center;
    }
  `,t([pt({attribute:!1})],$t.prototype,"movies",void 0),t([pt({type:Number})],$t.prototype,"columns",void 0),t([pt({type:Number})],$t.prototype,"selectedMovieId",void 0),t([pt({type:Boolean})],$t.prototype,"showBadges",void 0),t([pt({type:Number})],$t.prototype,"posterRadius",void 0),$t=t([dt("radarr-movie-grid")],$t);let bt=class extends nt{constructor(){super(...arguments),this.open=!1,this.qualityProfiles=[],this.rootFolders=[],this._monitored=!0,this._adding=!1}get _poster(){var t,e,i,r;return null!==(r=null===(i=null===(e=null===(t=this.movie)||void 0===t?void 0:t.images)||void 0===e?void 0:e.find(t=>"poster"===t.coverType))||void 0===i?void 0:i.remoteUrl)&&void 0!==r?r:""}get _rating(){var t,e,i,r,s;const o=null!==(i=null===(e=null===(t=this.movie)||void 0===t?void 0:t.ratings)||void 0===e?void 0:e.tmdb)&&void 0!==i?i:null===(s=null===(r=this.movie)||void 0===r?void 0:r.ratings)||void 0===s?void 0:s.imdb;return o?`★ ${o.value.toFixed(1)}`:""}get _showAddForm(){var t;return!1===(null===(t=this.movie)||void 0===t?void 0:t.inLibrary)}updated(t){t.has("movie")&&(this._profileId=void 0,this._folder=void 0,this._monitored=!0,this._adding=!1,this._addError=void 0)}render(){var t,e;if(!this.movie)return j``;const i=this.movie;return j`
      <div class="panel">
        <div class="poster">
          ${this._poster?j`<img src=${this._poster} alt=${i.title} />`:W}
        </div>
        <div>
          <h2>${i.title}${i.year?j` <span style="font-weight:400;opacity:.7">(${i.year})</span>`:""}</h2>
          <div class="meta">
            ${[i.runtime?`${i.runtime} min`:"",null===(t=i.genres)||void 0===t?void 0:t.slice(0,3).join(", "),null!==(e=i.studio)&&void 0!==e?e:"",this._rating].filter(Boolean).join(" · ")}
          </div>
          ${i.overview?j`<div class="overview">${i.overview}</div>`:""}
          <div class="actions">
            ${this._showAddForm?j`
              <span style="color:var(--secondary-text-color);font-size:.85rem">Not in library</span>
            `:j`
              <button @click=${this._searchAgain}>Search Again</button>
              <button class="danger" @click=${this._deleteMovie}>Delete from Radarr</button>
            `}
          </div>
        </div>

        ${this._showAddForm?j`
          <div class="add-form">
            <div class="form-row">
              <label>Quality Profile</label>
              <select @change=${t=>this._profileId=Number(t.target.value)}>
                <option value="">Select…</option>
                ${this.qualityProfiles.map(t=>j`<option value=${t.id}>${t.name}</option>`)}
              </select>
            </div>
            <div class="form-row">
              <label>Root Folder</label>
              <select @change=${t=>this._folder=t.target.value}>
                <option value="">Select…</option>
                ${this.rootFolders.map(t=>j`<option value=${t.path}>${t.path}</option>`)}
              </select>
            </div>
            <div class="form-row">
              <label>Monitored</label>
              <input type="checkbox" ?checked=${this._monitored}
                @change=${t=>this._monitored=t.target.checked} />
            </div>
            ${this._addError?j`<div class="add-error">${this._addError}</div>`:""}
            <button
              class="primary"
              ?disabled=${this._adding||!this._profileId||!this._folder}
              @click=${this._addMovie}
            >${this._adding?"Adding…":"+ Add to Radarr"}</button>
          </div>
        `:""}
      </div>
    `}_searchAgain(){this.dispatchEvent(new CustomEvent("search-again",{detail:this.movie,bubbles:!0,composed:!0}))}_deleteMovie(){this.dispatchEvent(new CustomEvent("delete-movie",{detail:this.movie,bubbles:!0,composed:!0}))}_addMovie(){this._profileId&&this._folder&&(this._adding=!0,this._addError=void 0,this.dispatchEvent(new CustomEvent("add-movie",{detail:{movie:this.movie,qualityProfileId:this._profileId,rootFolder:this._folder,monitored:this._monitored},bubbles:!0,composed:!0})))}addComplete(t){this._adding=!1,t&&(this._addError=t)}};bt.styles=a`
    :host {
      display: block;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, opacity 0.2s ease;
    }
    :host([open]) { max-height: 1000px; opacity: 1; }

    .panel {
      backdrop-filter: blur(8px);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
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
    h2 { font-size: 1.15rem; margin: 0 0 4px; }
    .meta { color: var(--secondary-text-color); font-size: 0.82rem; line-height: 1.6; }
    .overview { font-size: 0.88rem; line-height: 1.55; margin-top: 8px; }
    .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }

    button {
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 0.84rem;
      padding: 6px 14px;
      transition: background 0.15s;
    }
    button:hover { background: rgba(255, 255, 255, 0.12); }
    button.primary {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    button.primary:disabled { opacity: 0.5; cursor: default; }
    button.danger { border-color: #f44336; color: #f44336; }

    .add-form { grid-column: 1 / -1; }
    .form-row {
      align-items: center;
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
    .form-row label { font-size: 0.84rem; min-width: 120px; }
    select {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: var(--primary-text-color);
      flex: 1;
      padding: 6px 10px;
    }
    .add-error { color: var(--error-color, #f44336); font-size: 0.8rem; margin-bottom: 8px; }
  `,t([pt({type:Boolean,reflect:!0})],bt.prototype,"open",void 0),t([pt({attribute:!1})],bt.prototype,"movie",void 0),t([pt({attribute:!1})],bt.prototype,"qualityProfiles",void 0),t([pt({attribute:!1})],bt.prototype,"rootFolders",void 0),t([ut()],bt.prototype,"_profileId",void 0),t([ut()],bt.prototype,"_folder",void 0),t([ut()],bt.prototype,"_monitored",void 0),t([ut()],bt.prototype,"_adding",void 0),t([ut()],bt.prototype,"_addError",void 0),bt=t([dt("radarr-movie-detail")],bt);let xt=class extends nt{constructor(){super(...arguments),this._movies=[],this._filteredMovies=[],this._qualityProfiles=[],this._rootFolders=[],this._activeFilter="all",this._searchTerm="",this._loading=!1,this._initialised=!1}static getConfigElement(){return document.createElement("radarr-hacs-card-editor")}static getStubConfig(){return{entry_id:""}}setConfig(t){var e;if(!t.entry_id)throw new Error("entry_id is required");this._config={columns:4,default_sort:"added",default_filter:"all",show_status_badges:!0,poster_radius:8,...t},this._activeFilter=null!==(e=this._config.default_filter)&&void 0!==e?e:"all"}updated(t){t.has("hass")&&this.hass&&this._config&&!this._initialised&&(this._initialised=!0,this._loadData())}async _loadData(){this._loading=!0,this._error=void 0;try{const[t,e]=await Promise.all([vt(this.hass,this._config.entry_id,{filter:"all"!==this._activeFilter?this._activeFilter:void 0,sort:this._config.default_sort}),_t(this.hass,this._config.entry_id)]);this._movies=t,this._filteredMovies=t,this._qualityProfiles=e.quality_profiles,this._rootFolders=e.root_folders}catch(t){this._error=`Could not connect to Radarr: ${t}`}finally{this._loading=!1}}_onSearchInput(t){this._searchTerm=t.target.value,clearTimeout(this._debounceTimer);const e=this._searchTerm.toLowerCase();e?(this._filteredMovies=this._movies.filter(t=>t.title.toLowerCase().includes(e)||String(t.year).includes(e)),0===this._filteredMovies.length&&(this._debounceTimer=setTimeout(()=>this._tmdbSearch(),400))):this._filteredMovies=this._movies}async _tmdbSearch(){if(this._searchTerm)try{this._filteredMovies=await async function(t,e,i){return(await t.connection.sendMessagePromise({type:"radarr_hacs/search_movies",entry_id:e,term:i})).results.map(t=>{var e;return{...t,inLibrary:(null!==(e=t.id)&&void 0!==e?e:0)>0}})}(this.hass,this._config.entry_id,this._searchTerm)}catch(t){}}async _onFilterChange(t){this._activeFilter=t,this._selectedMovie=void 0;try{this._movies=await vt(this.hass,this._config.entry_id,{filter:"all"!==t?t:void 0,sort:this._config.default_sort}),this._filteredMovies=this._movies}catch(t){this._error=String(t)}}_onPosterClick(t){var e;this._selectedMovie=(null===(e=this._selectedMovie)||void 0===e?void 0:e.id)===t.id?void 0:t}async _onAddMovie(t,e,i,r){try{return await async function(t,e,i,r,s,o=!0){await t.callService("radarr_hacs","add_movie",{entry_id:e,tmdb_id:i.tmdbId,title:i.title,year:i.year,quality_profile_id:r,root_folder:s,monitored:o})}(this.hass,this._config.entry_id,t,e,i,r),this._selectedMovie=void 0,void await this._loadData()}catch(t){return String(t)}}async _onDeleteMovie(t){try{await async function(t,e,i,r=!1){await t.callService("radarr_hacs","delete_movie",{entry_id:e,movie_id:i,delete_files:r})}(this.hass,this._config.entry_id,t.id),this._selectedMovie=void 0,await this._loadData()}catch(t){this._error=`Delete failed: ${t}`}}async _onAddMovieEvent(t){var e;const{movie:i,qualityProfileId:r,rootFolder:s,monitored:o}=t.detail,a=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("radarr-movie-detail"),n=await this._onAddMovie(i,r,s,o);null==a||a.addComplete(n)}async _onDeleteMovieEvent(t){await this._onDeleteMovie(t.detail)}_onSearchAgain(t){const e=t.detail;this._searchTerm=e.title;const i=e.title.toLowerCase();this._filteredMovies=this._movies.filter(t=>t.title.toLowerCase().includes(i)),0===this._filteredMovies.length&&setTimeout(()=>this._tmdbSearch(),400)}render(){var t,e,i,r;if(!this._config)return j``;const s=null!==(t=this._config.card_title)&&void 0!==t?t:"Radarr";return j`
      <div class="header">
        <span class="title">${s}</span>
        <input
          class="search"
          type="search"
          placeholder="Search library or TMDB…"
          .value=${this._searchTerm}
          @input=${this._onSearchInput}
        />
      </div>

      <radarr-filter-chips
        .activeFilter=${this._activeFilter}
        @filter-change=${t=>this._onFilterChange(t.detail)}
      ></radarr-filter-chips>

      ${this._loading?j`<div class="state-msg">Loading…</div>`:""}

      ${this._error?j`
        <div class="state-msg error-msg">
          ${this._error}
          <br/>
          <button class="retry" @click=${()=>this._loadData()}>Retry</button>
        </div>
      `:""}

      ${this._loading||this._error?"":j`
        <radarr-movie-grid
          .movies=${this._filteredMovies}
          .columns=${null!==(e=this._config.columns)&&void 0!==e?e:4}
          .selectedMovieId=${null===(i=this._selectedMovie)||void 0===i?void 0:i.id}
          .showBadges=${!1!==this._config.show_status_badges}
          .posterRadius=${null!==(r=this._config.poster_radius)&&void 0!==r?r:8}
          @poster-click=${t=>this._onPosterClick(t.detail)}
        ></radarr-movie-grid>
        <radarr-movie-detail
          ?open=${!!this._selectedMovie}
          .movie=${this._selectedMovie}
          .qualityProfiles=${this._qualityProfiles}
          .rootFolders=${this._rootFolders}
          @add-movie=${this._onAddMovieEvent}
          @delete-movie=${this._onDeleteMovieEvent}
          @search-again=${this._onSearchAgain}
        ></radarr-movie-detail>
      `}
    `}};xt.styles=a`
    :host {
      display: block;
      background: var(--card-background-color);
      border-radius: 12px;
      overflow: hidden;
    }
    .header {
      align-items: center;
      backdrop-filter: blur(16px);
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      display: flex;
      gap: 12px;
      padding: 12px 16px;
    }
    .title { font-size: 1.1rem; font-weight: 600; white-space: nowrap; }
    .search {
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: var(--primary-text-color);
      flex: 1;
      font-size: 0.9rem;
      outline: none;
      padding: 6px 12px;
    }
    .search:focus { border-color: var(--primary-color); }
    .state-msg {
      color: var(--secondary-text-color);
      padding: 32px;
      text-align: center;
    }
    .error-msg { color: var(--error-color, #f44336); }
    .retry {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px;
      color: var(--primary-text-color);
      cursor: pointer;
      margin-top: 8px;
      padding: 6px 14px;
    }
  `,t([pt({attribute:!1})],xt.prototype,"hass",void 0),t([ut()],xt.prototype,"_config",void 0),t([ut()],xt.prototype,"_movies",void 0),t([ut()],xt.prototype,"_filteredMovies",void 0),t([ut()],xt.prototype,"_qualityProfiles",void 0),t([ut()],xt.prototype,"_rootFolders",void 0),t([ut()],xt.prototype,"_selectedMovie",void 0),t([ut()],xt.prototype,"_activeFilter",void 0),t([ut()],xt.prototype,"_searchTerm",void 0),t([ut()],xt.prototype,"_loading",void 0),t([ut()],xt.prototype,"_error",void 0),xt=t([dt("radarr-hacs-card")],xt),window.customCards=window.customCards||[],window.customCards.push({type:"radarr-hacs-card",name:"Radarr HACS Card",description:"Browse and manage your Radarr movie library",preview:!1});export{xt as RadarrHacsCard};
