function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,v=_.trustedTypes,f=v?v.emptyScript:"",g=_.reactiveElementPolyfillSupport,m=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[m("elementProperties")]=new Map,A[m("finalized")]=new Map,g?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,x=t=>t,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+P,k=`<${M}>`,T=document,U=()=>T.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,N="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,B=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,F=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,J=T.createTreeWalker(T,129);function K(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===H?"!--"===l[1]?n=D:void 0!==l[1]?n=B:void 0!==l[2]?(F.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=z):void 0!==l[3]&&(n=z):n===z?">"===l[0]?(n=r??H,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?z:'"'===l[3]?j:I):n===j||n===I?n=z:n===D||n===B?n=H:(n=z,r=void 0);const h=n===z&&t[e+1].startsWith("/>")?" ":"";o+=n===H?i+k:d>=0?(s.push(a),i.slice(0,d)+C+i.slice(d)+P+h):i+P+(-2===d?e:h)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,d]=Z(t,e);if(this.el=G.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=d[o++],i=s.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(F.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),J.nextNode(),a.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===M)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)a.push({type:7,index:r}),t+=P.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===q)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=R(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);J.currentNode=s;let r=J.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Y(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=J.nextNode(),o++)}return J.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),R(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new G(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Y(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,e,0),o=!R(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Q(this,s[i+n],e,n),a===q&&(a=this._$AH[n]),o||=!R(a)||a!==this._$AH[n],a===W?t=W:t!==W&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===q)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(G,Y),(w.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Y(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},ht=(t=ct,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return pt({...t,state:!0,attribute:!1})}async function _t(t,e,i={}){const s={type:"radarr_hacs/get_movies",entry_id:e};i.filter&&"all"!==i.filter&&(s.filter=i.filter),i.sort&&(s.sort=i.sort),i.search&&(s.search=i.search);return(await t.connection.sendMessagePromise(s)).movies}async function vt(t,e){return t.connection.sendMessagePromise({type:"radarr_hacs/get_config",entry_id:e})}let ft=class extends at{setConfig(t){this._config={...t},this.requestUpdate()}render(){var t,e,i,s;if(!this._config)return L``;const r=this._config;return L`
      <div class="form">
        <div class="field">
          <label>Entry ID (required — find in Settings → Devices & Services → Radarr HACS → ⋮ → Integration ID)</label>
          <input .value=${null!==(t=r.entry_id)&&void 0!==t?t:""} @change=${this._str("entry_id")} />
        </div>
        <div class="field">
          <label>Card Title (default: "Radarr")</label>
          <input .value=${null!==(e=r.card_title)&&void 0!==e?e:""} @change=${this._str("card_title")} />
        </div>
        <div class="field">
          <label>Columns (2–8, default: 4)</label>
          <input type="number" min="2" max="8"
            .value=${String(null!==(i=r.columns)&&void 0!==i?i:4)}
            @change=${t=>this._fire({columns:Number(t.target.value)})} />
        </div>
        <div class="field">
          <label>Default Sort</label>
          <select @change=${this._str("default_sort")}>
            ${["added","title","year","status"].map(t=>{var e;return L`
              <option value=${t} ?selected=${(null!==(e=r.default_sort)&&void 0!==e?e:"added")===t}>${t}</option>
            `})}
          </select>
        </div>
        <div class="field">
          <label>Default Filter</label>
          <select @change=${this._str("default_filter")}>
            ${["all","available","missing","downloading"].map(t=>{var e;return L`
              <option value=${t} ?selected=${(null!==(e=r.default_filter)&&void 0!==e?e:"all")===t}>${t}</option>
            `})}
          </select>
        </div>
        <div class="field">
          <label>Poster Border Radius in px (default: 8)</label>
          <input type="number" min="0" max="24"
            .value=${String(null!==(s=r.poster_radius)&&void 0!==s?s:8)}
            @change=${t=>this._fire({poster_radius:Number(t.target.value)})} />
        </div>
        <div class="field-row">
          <input type="checkbox"
            ?checked=${!1!==r.show_status_badges}
            @change=${t=>this._fire({show_status_badges:t.target.checked})} />
          <label>Show Status Badges</label>
        </div>
      </div>
    `}_str(t){return e=>this._fire({[t]:e.target.value})}_fire(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0})),this.requestUpdate()}};ft.styles=n`
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
  `,t([pt({attribute:!1})],ft.prototype,"hass",void 0),ft=t([dt("radarr-hacs-card-editor")],ft);const gt=[{key:"all",label:"All"},{key:"available",label:"Available"},{key:"missing",label:"Missing"},{key:"downloading",label:"Downloading"}];let mt=class extends at{constructor(){super(...arguments),this.activeFilter="all"}render(){return L`${gt.map(t=>L`
      <button
        class=${t.key===this.activeFilter?"active":""}
        @click=${()=>this._select(t.key)}
      >${t.label}</button>
    `)}`}_select(t){this.dispatchEvent(new CustomEvent("filter-change",{detail:t,bubbles:!0,composed:!0}))}};mt.styles=n`
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
  `,t([pt()],mt.prototype,"activeFilter",void 0),mt=t([dt("radarr-filter-chips")],mt);let yt=class extends at{constructor(){super(...arguments),this.selected=!1,this.showBadge=!0,this.radius=8}get _poster(){var t,e,i,s;return null!==(s=null===(i=null===(e=null===(t=this.movie)||void 0===t?void 0:t.images)||void 0===e?void 0:e.find(t=>"poster"===t.coverType))||void 0===i?void 0:i.remoteUrl)&&void 0!==s?s:""}render(){const t=function(t){return t.hasFile?"available":!t.hasFile&&t.isAvailable?"downloading":"missing"}(this.movie);return L`
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
        ${this.showBadge&&!1!==this.movie.inLibrary?L`
          <span class="badge ${t}">${t}</span>
        `:""}
      </div>
    `}};yt.styles=n`
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
  `,t([pt({attribute:!1})],yt.prototype,"movie",void 0),t([pt({type:Boolean})],yt.prototype,"selected",void 0),t([pt({type:Boolean})],yt.prototype,"showBadge",void 0),t([pt({type:Number})],yt.prototype,"radius",void 0),yt=t([dt("radarr-movie-poster")],yt);let $t=class extends at{constructor(){super(...arguments),this.movies=[],this.columns=4,this.showBadges=!0,this.posterRadius=8}render(){return this.movies.length?L`
      <div class="grid" style="grid-template-columns:repeat(${this.columns},1fr)">
        ${this.movies.map(t=>L`
          <radarr-movie-poster
            .movie=${t}
            ?selected=${t.id===this.selectedMovieId}
            ?showBadge=${this.showBadges}
            .radius=${this.posterRadius}
          ></radarr-movie-poster>
        `)}
      </div>
    `:L`<div class="empty">No movies found</div>`}};$t.styles=n`
    :host { display: block; padding: 8px; }
    .grid { display: grid; gap: 8px; }
    .empty {
      color: var(--secondary-text-color);
      padding: 32px;
      text-align: center;
    }
  `,t([pt({attribute:!1})],$t.prototype,"movies",void 0),t([pt({type:Number})],$t.prototype,"columns",void 0),t([pt({type:Number})],$t.prototype,"selectedMovieId",void 0),t([pt({type:Boolean})],$t.prototype,"showBadges",void 0),t([pt({type:Number})],$t.prototype,"posterRadius",void 0),$t=t([dt("radarr-movie-grid")],$t);let bt=class extends at{constructor(){super(...arguments),this._movies=[],this._filteredMovies=[],this._qualityProfiles=[],this._rootFolders=[],this._activeFilter="all",this._searchTerm="",this._loading=!1,this._initialised=!1}static getConfigElement(){return document.createElement("radarr-hacs-card-editor")}static getStubConfig(){return{entry_id:""}}setConfig(t){var e;if(!t.entry_id)throw new Error("entry_id is required");this._config={columns:4,default_sort:"added",default_filter:"all",show_status_badges:!0,poster_radius:8,...t},this._activeFilter=null!==(e=this._config.default_filter)&&void 0!==e?e:"all"}updated(t){t.has("hass")&&this.hass&&this._config&&!this._initialised&&(this._initialised=!0,this._loadData())}async _loadData(){this._loading=!0,this._error=void 0;try{const[t,e]=await Promise.all([_t(this.hass,this._config.entry_id,{filter:"all"!==this._activeFilter?this._activeFilter:void 0,sort:this._config.default_sort}),vt(this.hass,this._config.entry_id)]);this._movies=t,this._filteredMovies=t,this._qualityProfiles=e.quality_profiles,this._rootFolders=e.root_folders}catch(t){this._error=`Could not connect to Radarr: ${t}`}finally{this._loading=!1}}_onSearchInput(t){this._searchTerm=t.target.value,clearTimeout(this._debounceTimer);const e=this._searchTerm.toLowerCase();e?(this._filteredMovies=this._movies.filter(t=>t.title.toLowerCase().includes(e)||String(t.year).includes(e)),0===this._filteredMovies.length&&(this._debounceTimer=setTimeout(()=>this._tmdbSearch(),400))):this._filteredMovies=this._movies}async _tmdbSearch(){if(this._searchTerm)try{this._filteredMovies=await async function(t,e,i){return(await t.connection.sendMessagePromise({type:"radarr_hacs/search_movies",entry_id:e,term:i})).results.map(t=>{var e;return{...t,inLibrary:(null!==(e=t.id)&&void 0!==e?e:0)>0}})}(this.hass,this._config.entry_id,this._searchTerm)}catch(t){}}async _onFilterChange(t){this._activeFilter=t,this._selectedMovie=void 0;try{this._movies=await _t(this.hass,this._config.entry_id,{filter:"all"!==t?t:void 0,sort:this._config.default_sort}),this._filteredMovies=this._movies}catch(t){this._error=String(t)}}_onPosterClick(t){var e;this._selectedMovie=(null===(e=this._selectedMovie)||void 0===e?void 0:e.id)===t.id?void 0:t}async _onAddMovie(t,e,i,s){try{return await async function(t,e,i,s,r,o=!0){await t.callService("radarr_hacs","add_movie",{entry_id:e,tmdb_id:i.tmdbId,title:i.title,year:i.year,quality_profile_id:s,root_folder:r,monitored:o})}(this.hass,this._config.entry_id,t,e,i,s),this._selectedMovie=void 0,void await this._loadData()}catch(t){return String(t)}}async _onDeleteMovie(t){try{await async function(t,e,i,s=!1){await t.callService("radarr_hacs","delete_movie",{entry_id:e,movie_id:i,delete_files:s})}(this.hass,this._config.entry_id,t.id),this._selectedMovie=void 0,await this._loadData()}catch(t){this._error=`Delete failed: ${t}`}}render(){var t,e,i,s;if(!this._config)return L``;const r=null!==(t=this._config.card_title)&&void 0!==t?t:"Radarr";return L`
      <div class="header">
        <span class="title">${r}</span>
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

      ${this._loading?L`<div class="state-msg">Loading…</div>`:""}

      ${this._error?L`
        <div class="state-msg error-msg">
          ${this._error}
          <br/>
          <button class="retry" @click=${()=>this._loadData()}>Retry</button>
        </div>
      `:""}

      ${this._loading||this._error?"":L`
        <radarr-movie-grid
          .movies=${this._filteredMovies}
          .columns=${null!==(e=this._config.columns)&&void 0!==e?e:4}
          .selectedMovieId=${null===(i=this._selectedMovie)||void 0===i?void 0:i.id}
          .showBadges=${!1!==this._config.show_status_badges}
          .posterRadius=${null!==(s=this._config.poster_radius)&&void 0!==s?s:8}
          @poster-click=${t=>this._onPosterClick(t.detail)}
        ></radarr-movie-grid>
      `}
    `}};bt.styles=n`
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
  `,t([pt({attribute:!1})],bt.prototype,"hass",void 0),t([ut()],bt.prototype,"_config",void 0),t([ut()],bt.prototype,"_movies",void 0),t([ut()],bt.prototype,"_filteredMovies",void 0),t([ut()],bt.prototype,"_qualityProfiles",void 0),t([ut()],bt.prototype,"_rootFolders",void 0),t([ut()],bt.prototype,"_selectedMovie",void 0),t([ut()],bt.prototype,"_activeFilter",void 0),t([ut()],bt.prototype,"_searchTerm",void 0),t([ut()],bt.prototype,"_loading",void 0),t([ut()],bt.prototype,"_error",void 0),bt=t([dt("radarr-hacs-card")],bt),window.customCards=window.customCards||[],window.customCards.push({type:"radarr-hacs-card",name:"Radarr HACS Card",description:"Browse and manage your Radarr movie library",preview:!1});export{bt as RadarrHacsCard};
