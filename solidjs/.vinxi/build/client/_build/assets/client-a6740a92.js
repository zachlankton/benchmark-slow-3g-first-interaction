const u={context:void 0,registry:void 0};function j(e){u.context=e}function oe(){return{...u.context,id:`${u.context.id}${u.context.count++}-`,count:0}}const ue=(e,n)=>e===n,_={equals:ue};let m=null,fe=te;const w=1,$=2,X={owned:null,cleanups:null,context:null,owner:null};var c=null;let B=null,ce=null,h=null,g=null,y=null,T=0;function ae(e,n){const t=h,s=c,i=e.length===0,l=n===void 0?s:n,o=i?X:{owned:null,cleanups:null,context:l?l.context:null,owner:l},r=i?e:()=>e(()=>E(()=>R(o)));c=o,h=null;try{return S(r,!0)}finally{h=t,c=s}}function K(e,n){n=n?Object.assign({},_,n):_;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},s=i=>(typeof i=="function"&&(i=i(t.value)),J(t,i));return[Q.bind(t),s]}function O(e,n,t){const s=q(e,n,!1,w);P(s)}function de(e,n,t){t=t?Object.assign({},_,t):_;const s=q(e,n,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=t.equals||void 0,P(s),Q.bind(s)}function E(e){if(h===null)return e();const n=h;h=null;try{return e()}finally{h=n}}function he(e){return c===null||(c.cleanups===null?c.cleanups=[e]:c.cleanups.push(e)),e}function ge(e,n){m||(m=Symbol("error")),c=q(void 0,void 0,!0),c.context={...c.context,[m]:[n]};try{return e()}catch(t){N(t)}finally{c=c.owner}}function Q(){if(this.sources&&this.state)if(this.state===w)P(this);else{const e=g;g=null,S(()=>A(this),!1),g=e}if(h){const e=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(e)):(h.sources=[this],h.sourceSlots=[e]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function J(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&S(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],o=B&&B.running;o&&B.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?g.push(l):y.push(l),l.observers&&ne(l)),o||(l.state=w)}if(g.length>1e6)throw g=[],new Error},!1)),n}function P(e){if(!e.fn)return;R(e);const n=T;pe(e,e.value,n)}function pe(e,n,t){let s;const i=c,l=h;h=c=e;try{s=e.fn(n)}catch(o){return e.pure&&(e.state=w,e.owned&&e.owned.forEach(R),e.owned=null),e.updatedAt=t+1,N(o)}finally{h=l,c=i}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?J(e,s):e.value=s,e.updatedAt=t)}function q(e,n,t,s=w,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:c,context:c?c.context:null,pure:t};return c===null||c!==X&&(c.owned?c.owned.push(l):c.owned=[l]),l}function ee(e){if(e.state===0)return;if(e.state===$)return A(e);if(e.suspense&&E(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<T);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===w)P(e);else if(e.state===$){const s=g;g=null,S(()=>A(e,n[0]),!1),g=s}}function S(e,n){if(g)return e();let t=!1;n||(g=[]),y?t=!0:y=[],T++;try{const s=e();return ye(t),s}catch(s){t||(y=null),g=null,N(s)}}function ye(e){if(g&&(te(g),g=null),e)return;const n=y;y=null,n.length&&S(()=>fe(n),!1)}function te(e){for(let n=0;n<e.length;n++)ee(e[n])}function A(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const s=e.sources[t];if(s.sources){const i=s.state;i===w?s!==n&&(!s.updatedAt||s.updatedAt<T)&&ee(s):i===$&&A(s,n)}}}function ne(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=$,t.pure?g.push(t):y.push(t),t.observers&&ne(t))}}function R(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),i=t.observers;if(i&&i.length){const l=i.pop(),o=t.observerSlots.pop();s<i.length&&(l.sourceSlots[o]=s,i[s]=l,t.observerSlots[s]=o)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)R(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0}function we(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function M(e,n,t){try{for(const s of n)s(e)}catch(s){N(s,t&&t.owner||null)}}function N(e,n=c){const t=m&&n&&n.context&&n.context[m],s=we(e);if(!t)throw s;y?y.push({fn(){M(s,t,n)},state:w}):M(s,t,n)}let se=!1;function be(){se=!0}function b(e,n){if(se&&u.context){const t=u.context;j(oe());const s=E(()=>e(n||{}));return j(t),s}return E(()=>e(n||{}))}let v;function xe(e){let n;u.context&&u.load&&(n=u.load(u.context.id+u.context.count));const[t,s]=K(n,void 0);return v||(v=new Set),v.add(s),he(()=>v.delete(s)),de(()=>{let i;if(i=t()){const l=e.fallback;return typeof l=="function"&&l.length?E(()=>l(i,()=>s())):l}return ge(()=>e.children,s)},void 0,void 0)}function Ee(e,n,t){let s=t.length,i=n.length,l=s,o=0,r=0,a=n[i-1].nextSibling,f=null;for(;o<i||r<l;){if(n[o]===t[r]){o++,r++;continue}for(;n[i-1]===t[l-1];)i--,l--;if(i===o){const d=l<s?r?t[r-1].nextSibling:t[l-r]:a;for(;r<l;)e.insertBefore(t[r++],d)}else if(l===r)for(;o<i;)(!f||!f.has(n[o]))&&n[o].remove(),o++;else if(n[o]===t[l-1]&&t[r]===n[i-1]){const d=n[--i].nextSibling;e.insertBefore(t[r++],n[o++].nextSibling),e.insertBefore(t[--l],d),n[i]=t[l]}else{if(!f){f=new Map;let p=r;for(;p<l;)f.set(t[p],p++)}const d=f.get(n[o]);if(d!=null)if(r<d&&d<l){let p=o,I=1,D;for(;++p<i&&p<l&&!((D=f.get(n[p]))==null||D!==d+I);)I++;if(I>d-r){const re=n[o];for(;r<d;)e.insertBefore(t[r++],re)}else e.replaceChild(t[r++],n[o++])}else o++;else n[o++].remove()}}}const V="_$DX_DELEGATE";function me(e,n,t,s={}){let i;return ae(l=>{i=l,n===document?e():ie(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{i(),n.textContent=""}}function Se(e,n,t){let s;const i=()=>{const o=document.createElement("template");return o.innerHTML=e,t?o.content.firstChild.firstChild:o.content.firstChild},l=n?()=>E(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return l.cloneNode=l,l}function ve(e,n=window.document){const t=n[V]||(n[V]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];t.has(l)||(t.add(l),n.addEventListener(l,le))}}function ie(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return C(e,n,s,t);O(i=>C(e,n(),i,t),s)}function _e(e,n,t={}){u.completed=globalThis._$HY.completed,u.events=globalThis._$HY.events,u.load=i=>globalThis._$HY.r[i],u.has=i=>i in globalThis._$HY.r,u.gather=i=>Y(n,i),u.registry=new Map,u.context={id:t.renderId||"",count:0},Y(n,t.renderId);const s=me(e,n,[...n.childNodes],t);return u.context=null,s}function $e(e){let n,t;return!u.context||!(n=u.registry.get(t=Ce()))?e():(u.completed&&u.completed.add(n),u.registry.delete(t),n)}function Ae(){u.events&&!u.events.queued&&(queueMicrotask(()=>{const{completed:e,events:n}=u;for(n.queued=!1;n.length;){const[t,s]=n[0];if(!e.has(t))return;le(s),n.shift()}}),u.events.queued=!0)}function le(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),u.registry&&!u.done&&(u.done=_$HY.done=!0);t;){const s=t[n];if(s&&!t.disabled){const i=t[`${n}Data`];if(i!==void 0?s.call(t,i,e):s.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function C(e,n,t,s,i){if(u.context){!t&&(t=[...e.childNodes]);let r=[];for(let a=0;a<t.length;a++){const f=t[a];f.nodeType===8&&f.data.slice(0,2)==="!$"?f.remove():r.push(f)}t=r}for(;typeof t=="function";)t=t();if(n===t)return t;const l=typeof n,o=s!==void 0;if(e=o&&t[0]&&t[0].parentNode||e,l==="string"||l==="number"){if(u.context)return t;if(l==="number"&&(n=n.toString()),o){let r=t[0];r&&r.nodeType===3?r.data!==n&&(r.data=n):r=document.createTextNode(n),t=x(e,t,s,r)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n}else if(n==null||l==="boolean"){if(u.context)return t;t=x(e,t,s)}else{if(l==="function")return O(()=>{let r=n();for(;typeof r=="function";)r=r();t=C(e,r,t,s)}),()=>t;if(Array.isArray(n)){const r=[],a=t&&Array.isArray(t);if(k(r,n,t,i))return O(()=>t=C(e,r,t,s,!0)),()=>t;if(u.context){if(!r.length)return t;if(s===void 0)return[...e.childNodes];let f=r[0],d=[f];for(;(f=f.nextSibling)!==s;)d.push(f);return t=d}if(r.length===0){if(t=x(e,t,s),o)return t}else a?t.length===0?W(e,r,s):Ee(e,t,r):(t&&x(e),W(e,r));t=r}else if(n.nodeType){if(u.context&&n.parentNode)return t=o?[n]:n;if(Array.isArray(t)){if(o)return t=x(e,t,s,n);x(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function k(e,n,t,s){let i=!1;for(let l=0,o=n.length;l<o;l++){let r=n[l],a=t&&t[l],f;if(!(r==null||r===!0||r===!1))if((f=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))i=k(e,r,a)||i;else if(f==="function")if(s){for(;typeof r=="function";)r=r();i=k(e,Array.isArray(r)?r:[r],Array.isArray(a)?a:[a])||i}else e.push(r),i=!0;else{const d=String(r);a&&a.nodeType===3&&a.data===d?e.push(a):e.push(document.createTextNode(d))}}return i}function W(e,n,t=null){for(let s=0,i=n.length;s<i;s++)e.insertBefore(n[s],t)}function x(e,n,t,s){if(t===void 0)return e.textContent="";const i=s||document.createTextNode("");if(n.length){let l=!1;for(let o=n.length-1;o>=0;o--){const r=n[o];if(i!==r){const a=r.parentNode===e;!l&&!o?a?e.replaceChild(i,r):e.insertBefore(i,t):a&&r.remove()}else l=!0}}else e.insertBefore(i,t);return[i]}function Y(e,n){const t=e.querySelectorAll("*[data-hk]");for(let s=0;s<t.length;s++){const i=t[s],l=i.getAttribute("data-hk");(!n||l.startsWith(n))&&!u.registry.has(l)&&u.registry.set(l,i)}}function Ce(){const e=u.context;return`${e.id}${e.count++}`}const Te=(...e)=>(be(),_e(...e)),Pe="modulepreload",Re=function(e){return"/_build/"+e},F={},G=function(n,t,s){if(!t||t.length===0)return n();const i=document.getElementsByTagName("link");return Promise.all(t.map(l=>{if(l=Re(l),l in F)return;F[l]=!0;const o=l.endsWith(".css"),r=o?'[rel="stylesheet"]':"";if(!!s)for(let d=i.length-1;d>=0;d--){const p=i[d];if(p.href===l&&(!o||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${r}`))return;const f=document.createElement("link");if(f.rel=o?"stylesheet":Pe,o||(f.as="script",f.crossOrigin=""),f.href=l,document.head.appendChild(f),o)return new Promise((d,p)=>{f.addEventListener("load",d),f.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})})).then(()=>n()).catch(l=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=l,window.dispatchEvent(o),!o.defaultPrevented)throw l})},H="Invariant Violation",{setPrototypeOf:Ne=function(e,n){return e.__proto__=n,e}}=Object;class U extends Error{framesToPop=1;name=H;constructor(n=H){super(typeof n=="number"?`${H}: ${n} (see https://github.com/apollographql/invariant-packages)`:n),Ne(this,U.prototype)}}function L(e,n){if(!e)throw new U(n)}const Ie=/^[A-Za-z]:\//;function Be(e=""){return e&&e.replace(/\\/g,"/").replace(Ie,n=>n.toUpperCase())}const He=/^[/\\]{2}/,Le=/^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/,Oe=/^[A-Za-z]:$/,ke=function(e){if(e.length===0)return".";e=Be(e);const n=e.match(He),t=Z(e),s=e[e.length-1]==="/";return e=Ue(e,!t),e.length===0?t?"/":s?"./":".":(s&&(e+="/"),Oe.test(e)&&(e+="/"),n?t?`//${e}`:`//./${e}`:t&&!Z(e)?`/${e}`:e)},qe=function(...e){if(e.length===0)return".";let n;for(const t of e)t&&t.length>0&&(n===void 0?n=t:n+=`/${t}`);return n===void 0?".":ke(n.replace(/\/\/+/g,"/"))};function Ue(e,n){let t="",s=0,i=-1,l=0,o=null;for(let r=0;r<=e.length;++r){if(r<e.length)o=e[r];else{if(o==="/")break;o="/"}if(o==="/"){if(!(i===r-1||l===1))if(l===2){if(t.length<2||s!==2||t[t.length-1]!=="."||t[t.length-2]!=="."){if(t.length>2){const a=t.lastIndexOf("/");a===-1?(t="",s=0):(t=t.slice(0,a),s=t.length-1-t.lastIndexOf("/")),i=r,l=0;continue}else if(t.length>0){t="",s=0,i=r,l=0;continue}}n&&(t+=t.length>0?"/..":"..",s=2)}else t.length>0?t+=`/${e.slice(i+1,r)}`:t=e.slice(i+1,r),s=r-i-1;i=r,l=0}else o==="."&&l!==-1?++l:l=-1}return t}const Z=function(e){return Le.test(e)};function De(e){return`virtual:${e}`}function je(e){return e.handler?.endsWith(".html")?e.handler:`#vinxi/handler/${e.name}`}const Me=new Proxy({},{get(e,n){return L(typeof n=="string","Bundler name should be a string"),{handler:De(je({name:n})),chunks:new Proxy({},{get(t,s){L(typeof s=="string","Chunk expected");let i=qe("/_build",s+".js");return{import(){return G(()=>import(i),[])},output:{path:i}}}}),inputs:new Proxy({},{get(t,s){L(typeof s=="string","Input must be string");let i=window.manifest[s].output;return{async import(){return G(()=>import(i),[])},async assets(){return window.manifest[s].assets},output:{path:i}}}})}}});globalThis.MANIFEST=Me;var Ve=Se("<main><h1>Hello world!</h1><button id=test-inc class=increment>Clicks: <span id=test-value></span></button><p>Visit <a href=https://start.solidjs.com target=_blank>start.solidjs.com</a> to learn how to build SolidStart apps.");function We(){const[e,n]=K(0);return(()=>{var t=$e(Ve),s=t.firstChild,i=s.nextSibling,l=i.firstChild,o=l.nextSibling;return i.$$click=()=>n(e()+1),ie(o,e),Ae(),t})()}ve(["click"]);function Ye(e){return null}function Fe(e){return b(xe,{get fallback(){return b(Ye,{code:500})},get children(){return e.children}})}function Ge(e,n){return Te(e,n)}function z(e){return e.children}function Ze(){return b(z,{get children(){return b(z,{get children(){return b(Fe,{get children(){return b(We,{})}})}})}})}Ge(()=>b(Ze,{}),document.getElementById("app"));const ze=void 0;export{ze as default};
