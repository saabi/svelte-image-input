function y(){}function H(t,n){for(const e in n)t[e]=n[e];return t}function q(t){return t()}function P(){return Object.create(null)}function x(t){t.forEach(q)}function j(t){return typeof t=="function"}function st(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let $;function ot(t,n){return $||($=document.createElement("a")),$.href=n,t===$.href}function I(t){return Object.keys(t).length===0}function G(t,...n){if(t==null)return y;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function at(t,n,e){t.$$.on_destroy.push(G(n,e))}function ft(t,n,e,i){if(t){const r=B(t,n,e,i);return t[0](r)}}function B(t,n,e,i){return t[1]&&i?H(e.ctx.slice(),t[1](i(n))):e.ctx}function dt(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(n.dirty.length,r.length);for(let s=0;s<c;s+=1)o[s]=n.dirty[s]|r[s];return o}return n.dirty|r}return n.dirty}function _t(t,n,e,i,r,o){if(r){const c=B(n,e,i,o);t.p(c,r)}}function ht(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function mt(t){return t??""}function pt(t){return t&&j(t.destroy)?t.destroy:y}let v=!1;function J(){v=!0}function K(){v=!1}function Q(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function R(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const u=[];for(let l=0;l<n.length;l++){const f=n[l];f.claim_order!==void 0&&u.push(f)}n=u}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let u=0;u<n.length;u++){const l=n[u].claim_order,f=(r>0&&n[e[r]].claim_order<=l?r+1:Q(1,r,b=>n[e[b]].claim_order,l))-1;i[u]=e[f]+1;const a=f+1;e[a]=u,r=Math.max(a,r)}const o=[],c=[];let s=n.length-1;for(let u=e[r]+1;u!=0;u=i[u-1]){for(o.push(n[u-1]);s>=u;s--)c.push(n[s]);s--}for(;s>=0;s--)c.push(n[s]);o.reverse(),c.sort((u,l)=>u.claim_order-l.claim_order);for(let u=0,l=0;u<c.length;u++){for(;l<o.length&&c[u].claim_order>=o[l].claim_order;)l++;const f=l<o.length?o[l]:null;t.insertBefore(c[u],f)}}function W(t,n){if(v){for(R(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function yt(t,n,e){v&&!e?W(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function U(t){t.parentNode&&t.parentNode.removeChild(t)}function V(t){return document.createElement(t)}function C(t){return document.createTextNode(t)}function gt(){return C(" ")}function xt(){return C("")}function bt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function $t(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function Et(t){return t===""?null:+t}function X(t){return Array.from(t.childNodes)}function Y(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function L(t,n,e,i,r=!1){Y(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(n(s)){const u=e(s);return u===void 0?t.splice(c,1):t[c]=u,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(n(s)){const u=e(s);return u===void 0?t.splice(c,1):t[c]=u,r?u===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function Z(t,n,e,i){return L(t,r=>r.nodeName===n,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];e[s.name]||o.push(s.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(n))}function vt(t,n,e){return Z(t,n,e,V)}function tt(t,n){return L(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>C(n),!0)}function wt(t){return tt(t," ")}function Nt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function At(t,n){t.value=n??""}function St(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function nt(t,n,{bubbles:e=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,i,n),r}function jt(t,n){return new t(n)}let g;function p(t){g=t}function k(){if(!g)throw new Error("Function called outside component initialization");return g}function Ct(t){k().$$.on_mount.push(t)}function kt(t){k().$$.after_update.push(t)}function Mt(){const t=k();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const o=nt(n,e,{cancelable:i});return r.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}const h=[],T=[];let m=[];const N=[],D=Promise.resolve();let A=!1;function z(){A||(A=!0,D.then(F))}function Ot(){return z(),D}function S(t){m.push(t)}function Pt(t){N.push(t)}const w=new Set;let _=0;function F(){if(_!==0)return;const t=g;do{try{for(;_<h.length;){const n=h[_];_++,p(n),et(n.$$)}}catch(n){throw h.length=0,_=0,n}for(p(null),h.length=0,_=0;T.length;)T.pop()();for(let n=0;n<m.length;n+=1){const e=m[n];w.has(e)||(w.add(e),e())}m.length=0}while(h.length);for(;N.length;)N.pop()();A=!1,w.clear(),p(t)}function et(t){if(t.fragment!==null){t.update(),x(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(S)}}function it(t){const n=[],e=[];m.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),m=n}const E=new Set;let d;function Tt(){d={r:0,c:[],p:d}}function qt(){d.r||x(d.c),d=d.p}function rt(t,n){t&&t.i&&(E.delete(t),t.i(n))}function Bt(t,n,e,i){if(t&&t.o){if(E.has(t))return;E.add(t),d.c.push(()=>{E.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function Lt(t,n,e){const i=t.$$.props[n];i!==void 0&&(t.$$.bound[i]=e,e(t.$$.ctx[i]))}function Dt(t){t&&t.c()}function zt(t,n){t&&t.l(n)}function ct(t,n,e,i){const{fragment:r,after_update:o}=t.$$;r&&r.m(n,e),i||S(()=>{const c=t.$$.on_mount.map(q).filter(j);t.$$.on_destroy?t.$$.on_destroy.push(...c):x(c),t.$$.on_mount=[]}),o.forEach(S)}function ut(t,n){const e=t.$$;e.fragment!==null&&(it(e.after_update),x(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function lt(t,n){t.$$.dirty[0]===-1&&(h.push(t),z(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Ft(t,n,e,i,r,o,c,s=[-1]){const u=g;p(t);const l=t.$$={fragment:null,ctx:[],props:o,update:y,not_equal:r,bound:P(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(u?u.$$.context:[])),callbacks:P(),dirty:s,skip_bound:!1,root:n.target||u.$$.root};c&&c(l.root);let f=!1;if(l.ctx=e?e(t,n.props||{},(a,b,...M)=>{const O=M.length?M[0]:b;return l.ctx&&r(l.ctx[a],l.ctx[a]=O)&&(!l.skip_bound&&l.bound[a]&&l.bound[a](O),f&&lt(t,a)),b}):[],l.update(),f=!0,x(l.before_update),l.fragment=i?i(l.ctx):!1,n.target){if(n.hydrate){J();const a=X(n.target);l.fragment&&l.fragment.l(a),a.forEach(U)}else l.fragment&&l.fragment.c();n.intro&&rt(t.$$.fragment),ct(t,n.target,n.anchor,n.customElement),K(),F()}p(u)}class Ht{$destroy(){ut(this,1),this.$destroy=y}$on(n,e){if(!j(e))return y;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!I(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{ct as A,ut as B,ft as C,_t as D,ht as E,dt as F,W as G,y as H,at as I,mt as J,pt as K,bt as L,x as M,Mt as N,Lt as O,Pt as P,At as Q,ot as R,Ht as S,Et as T,gt as a,yt as b,wt as c,Bt as d,xt as e,qt as f,rt as g,U as h,Ft as i,kt as j,V as k,vt as l,X as m,$t as n,Ct as o,St as p,C as q,tt as r,st as s,Ot as t,Nt as u,Tt as v,T as w,jt as x,Dt as y,zt as z};
