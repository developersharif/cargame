import"./Bzak7iHL.js";import"./BAWEk33w.js";import{b as Q,h as w,a as F,A as S,X as se,c as le,H as ie,d as X,s as H,f as R,m as k,ag as fe,ah as oe,i as W,k as ue,j as de,ai as ve,g as Z,M as ce,P as Y,aj as $,ak as _e,al as he,l as V,p as j,am as me,an as ge,ao as B,ap as q,aq as pe,ar as Ee,as as we,at as Ne,O as ee,au as Te,E as Ae,av as be,aw as xe,ax as ke,ay as Ce,a6 as ye,az as Ie,t as G,a9 as Me,aa as Se,ab as Re,u as U,B as M,ac as De,n as Oe,o as He,aA as We,aB as ze}from"./CLtiFm-Q.js";import{s as Be}from"./OnIyTPbP.js";import{a as J}from"./Blh6K_Xk.js";import{i as Pe}from"./V_1rYtVp.js";import{l as K,p as y}from"./rTWVmEA1.js";function Fe(l,r){return r}function Le(l,r,e){for(var i=l.items,d=[],_=r.length,f=0;f<_;f++)Ee(r[f].e,d,!0);var v=_>0&&d.length===0&&e!==null;if(v){var o=e.parentNode;we(o),o.append(e),i.clear(),x(l,r[0].prev,r[_-1].next)}Ne(d,()=>{for(var u=0;u<_;u++){var h=r[u];v||(i.delete(h.k),x(l,h.prev,h.next)),q(h.e,!v)}})}function Ve(l,r,e,i,d,_=null){var f=l,v={flags:r,items:new Map,first:null};w&&F();var o=null,u=!1,h=new Map,g=se(()=>{var t=e();return _e(t)?t:t==null?[]:$(t)}),a,p;function n(){qe(p,a,v,h,f,d,r,i,e),_!==null&&(a.length===0?o?V(o):o=W(()=>_(f)):o!==null&&j(o,()=>{o=null}))}Q(()=>{p??(p=ee),a=S(g);var t=a.length;if(u&&t===0)return;u=t===0;let m=!1;if(w){var b=le(f)===ie;b!==(t===0)&&(f=X(),H(f),R(!1),m=!0)}if(w){for(var N=null,s,c=0;c<t;c++){if(k.nodeType===fe&&k.data===oe){f=k,m=!0,R(!1);break}var E=a[c],T=i(E,c);s=L(k,v,N,null,E,T,c,d,r,e),v.items.set(T,s),N=s}t>0&&H(X())}if(w)t===0&&_&&(o=W(()=>_(f)));else if(ue()){var D=new Set,C=de;for(c=0;c<t;c+=1){E=a[c],T=i(E,c);var A=v.items.get(T)??h.get(T);A?ae(A,E,c):(s=L(null,v,null,null,E,T,c,d,r,e,!0),h.set(T,s)),D.add(T)}for(const[O,I]of v.items)D.has(O)||C.skipped_effects.add(I.e);C.add_callback(n)}else n();m&&R(!0),S(g)}),w&&(f=k)}function qe(l,r,e,i,d,_,f,v,o){var u=r.length,h=e.items,g=e.first,a=g,p,n=null,t=[],m=[],b,N,s,c;for(c=0;c<u;c+=1){if(b=r[c],N=v(b,c),s=h.get(N),s===void 0){var E=i.get(N);if(E!==void 0){i.delete(N),h.set(N,E);var T=n?n.next:a;x(e,n,E),x(e,E,T),P(E,T,d),n=E}else{var D=a?a.e.nodes_start:d;n=L(D,e,n,n===null?e.first:n.next,b,N,c,_,f,o)}h.set(N,n),t=[],m=[],a=n.next;continue}if(ae(s,b,c),(s.e.f&B)!==0&&V(s.e),s!==a){if(p!==void 0&&p.has(s)){if(t.length<m.length){var C=m[0],A;n=C.prev;var O=t[0],I=t[t.length-1];for(A=0;A<t.length;A+=1)P(t[A],C,d);for(A=0;A<m.length;A+=1)p.delete(m[A]);x(e,O.prev,I.next),x(e,n,O),x(e,I,C),a=C,n=I,c-=1,t=[],m=[]}else p.delete(s),P(s,a,d),x(e,s.prev,s.next),x(e,s,n===null?e.first:n.next),x(e,n,s),n=s;continue}for(t=[],m=[];a!==null&&a.k!==N;)(a.e.f&B)===0&&(p??(p=new Set)).add(a),m.push(a),a=a.next;if(a===null)continue;s=a}t.push(s),n=s,a=s.next}if(a!==null||p!==void 0){for(var z=p===void 0?[]:$(p);a!==null;)(a.e.f&B)===0&&z.push(a),a=a.next;var re=z.length;if(re>0){var te=null;Le(e,z,te)}}l.first=e.first&&e.first.e,l.last=n&&n.e;for(var ne of i.values())q(ne.e);i.clear()}function ae(l,r,e,i){ve(l.v,r),l.i=e}function L(l,r,e,i,d,_,f,v,o,u,h){var g=(o&me)!==0,a=(o&ge)===0,p=g?a?ce(d,!1,!1):Y(d):d,n=(o&he)===0?f:Y(f),t={i:n,v:p,k:_,a:null,e:null,prev:e,next:i};try{if(l===null){var m=document.createDocumentFragment();m.append(l=Z())}return t.e=W(()=>v(l,p,n,u),w),t.e.prev=e&&e.e,t.e.next=i&&i.e,e===null?h||(r.first=t):(e.next=t,e.e.next=t.e),i!==null&&(i.prev=t,i.e.prev=t.e),t}finally{}}function P(l,r,e){for(var i=l.next?l.next.e.nodes_start:e,d=r?r.e.nodes_start:e,_=l.e.nodes_start;_!==null&&_!==i;){var f=pe(_);d.before(_),_=f}}function x(l,r,e){r===null?l.first=e:(r.next=e,r.e.next=e&&e.e),e!==null&&(e.prev=r,e.e.prev=r&&r.e)}function Xe(l,r,e,i,d,_){let f=w;w&&F();var v,o,u=null;w&&k.nodeType===Te&&(u=k,F());var h=w?k:l,g;Q(()=>{const a=r()||null;var p=be;a!==v&&(g&&(a===null?j(g,()=>{g=null,o=null}):a===o?V(g):q(g)),a&&a!==o&&(g=W(()=>{if(u=w?u:document.createElementNS(p,a),xe(u,u),i){w&&ke(a)&&u.append(document.createComment(""));var n=w?Ce(u):u.appendChild(Z());w&&(n===null?R(!1):H(n)),i(u,n)}ee.nodes_end=u,h.before(u)})),v=a,v&&(o=v))},Ae),f&&(R(!0),H(h))}/**
 * @license lucide-svelte v0.544.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2023 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const Ye={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Ge=Ie("<svg><!><!></svg>");function ea(l,r){const e=K(r,["children","$$slots","$$events","$$legacy"]),i=K(e,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);ye(r,!1);let d=y(r,"name",8,void 0),_=y(r,"color",8,"currentColor"),f=y(r,"size",8,24),v=y(r,"strokeWidth",8,2),o=y(r,"absoluteStrokeWidth",8,!1),u=y(r,"iconNode",24,()=>[]);const h=(...n)=>n.filter((t,m,b)=>!!t&&b.indexOf(t)===m).join(" ");Pe();var g=Ge();J(g,(n,t)=>({...Ye,...i,width:f(),height:f(),stroke:_(),"stroke-width":n,class:t}),[()=>(M(o()),M(v()),M(f()),U(()=>o()?Number(v())*24/Number(f()):v())),()=>(M(d()),M(e),U(()=>h("lucide-icon","lucide",d()?`lucide-${d()}`:"",e.class)))]);var a=Re(g);Ve(a,1,u,Fe,(n,t)=>{var m=We(()=>ze(S(t),2));let b=()=>S(m)[0],N=()=>S(m)[1];var s=Oe(),c=He(s);Xe(c,b,!0,(E,T)=>{J(E,()=>({...N()}))}),G(n,s)});var p=Se(a);Be(p,r,"default",{}),De(g),G(l,g),Me()}export{ea as I,Ve as e,Fe as i};
