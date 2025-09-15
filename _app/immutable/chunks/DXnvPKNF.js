var zo=Object.defineProperty;var Go=(s,e,t)=>e in s?zo(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var ae=(s,e,t)=>Go(s,typeof e!="symbol"?e+"":e,t);/**
 * @license
 * Copyright 2010-2021 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const mp=2;const gp=2;const vp=1006;const Es="300 es";class pn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const it=[];for(let s=0;s<256;s++)it[s]=(s<16?"0":"")+s.toString(16);let Mi=1234567;const oi=Math.PI/180,ui=180/Math.PI;function Et(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(it[s&255]+it[s>>8&255]+it[s>>16&255]+it[s>>24&255]+"-"+it[e&255]+it[e>>8&255]+"-"+it[e>>16&15|64]+it[e>>24&255]+"-"+it[t&63|128]+it[t>>8&255]+"-"+it[t>>16&255]+it[t>>24&255]+it[n&255]+it[n>>8&255]+it[n>>16&255]+it[n>>24&255]).toUpperCase()}function ft(s,e,t){return Math.max(e,Math.min(t,s))}function ns(s,e){return(s%e+e)%e}function Uo(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Oo(s,e,t){return s!==e?(t-s)/(e-s):0}function li(s,e,t){return(1-t)*s+t*e}function Ho(s,e,t,n){return li(s,e,1-Math.exp(-t*n))}function ko(s,e=1){return e-Math.abs(ns(s,e*2)-e)}function Vo(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Wo(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function qo(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Xo(s,e){return s+Math.random()*(e-s)}function Yo(s){return s*(.5-Math.random())}function Zo(s){return s!==void 0&&(Mi=s%2147483647),Mi=Mi*16807%2147483647,(Mi-1)/2147483646}function jo(s){return s*oi}function Jo(s){return s*ui}function jr(s){return(s&s-1)===0&&s!==0}function Ba(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Na(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Qo(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*d,l*u,o*c);break;case"YZY":s.set(l*u,o*h,l*d,o*c);break;case"ZXZ":s.set(l*d,l*u,o*h,o*c);break;case"XZX":s.set(o*h,l*p,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*p,o*c);break;case"ZYZ":s.set(l*p,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}var tt=Object.freeze({__proto__:null,DEG2RAD:oi,RAD2DEG:ui,generateUUID:Et,clamp:ft,euclideanModulo:ns,mapLinear:Uo,inverseLerp:Oo,lerp:li,damp:Ho,pingpong:ko,smoothstep:Vo,smootherstep:Wo,randInt:qo,randFloat:Xo,randFloatSpread:Yo,seededRandom:Zo,degToRad:jo,radToDeg:Jo,isPowerOfTwo:jr,ceilPowerOfTwo:Ba,floorPowerOfTwo:Na,setQuaternionFromProperEuler:Qo});class q{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this)}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this)}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}}q.prototype.isVector2=!0;class st{constructor(){this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(e,t,n,i,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],v=i[0],x=i[3],m=i[6],g=i[1],T=i[4],S=i[7],E=i[2],_=i[5],D=i[8];return r[0]=a*v+o*g+l*E,r[3]=a*x+o*T+l*_,r[6]=a*m+o*S+l*D,r[1]=c*v+h*g+d*E,r[4]=c*x+h*T+d*_,r[7]=c*m+h*S+d*D,r[2]=u*v+f*g+p*E,r[5]=u*x+f*T+p*_,r[8]=u*m+f*S+p*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,p=t*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=d*v,e[1]=(i*c-h*n)*v,e[2]=(o*n-i*a)*v,e[3]=u*v,e[4]=(h*t-i*l)*v,e[5]=(i*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=t,n[4]*=t,n[7]*=t,this}rotate(e){const t=Math.cos(e),n=Math.sin(e),i=this.elements,r=i[0],a=i[3],o=i[6],l=i[1],c=i[4],h=i[7];return i[0]=t*r+n*l,i[3]=t*a+n*c,i[6]=t*o+n*h,i[1]=-n*r+t*l,i[4]=-n*a+t*c,i[7]=-n*o+t*h,this}translate(e,t){const n=this.elements;return n[0]+=e*n[2],n[3]+=e*n[5],n[6]+=e*n[8],n[1]+=t*n[2],n[4]+=t*n[5],n[7]+=t*n[8],this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}st.prototype.isMatrix3=!0;let vn;class Vn{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{vn===void 0&&(vn=document.createElementNS("http://www.w3.org/1999/xhtml","canvas")),vn.width=e.width,vn.height=e.height;const n=vn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=vn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}}let $o=0;class ot extends pn{constructor(e=ot.DEFAULT_IMAGE,t=ot.DEFAULT_MAPPING,n=1001,i=1001,r=1006,a=1008,o=1023,l=1009,c=1,h=3e3){super(),Object.defineProperty(this,"id",{value:$o++}),this.uuid=Et(),this.name="",this.image=e,this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new q(0,0),this.repeat=new q(1,1),this.center=new q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.version=0,this.onUpdate=null}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.image=e.image,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(this.image!==void 0){const i=this.image;if(i.uuid===void 0&&(i.uuid=Et()),!t&&e.images[i.uuid]===void 0){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(mr(i[a].image)):r.push(mr(i[a]))}else r=mr(i);e.images[i.uuid]={uuid:i.uuid,url:r}}n.image=i.uuid}return t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&this.version++}}ot.DEFAULT_IMAGE=void 0;ot.DEFAULT_MAPPING=300;ot.prototype.isTexture=!0;function mr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Vn.getDataURL(s):s.data?{data:Array.prototype.slice.call(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}class He{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],v=l[2],x=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(p-x)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(p+x)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(c+1)/2,S=(f+1)/2,E=(m+1)/2,_=(h+u)/4,D=(d+v)/4,I=(p+x)/4;return T>S&&T>E?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=_/n,r=D/n):S>E?S<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(S),n=_/i,r=I/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=D/r,i=I/r),this.set(n,i,r,t),this}let g=Math.sqrt((x-p)*(x-p)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(g)<.001&&(g=1),this.x=(x-p)/g,this.y=(d-v)/g,this.z=(u-h)/g,this.w=Math.acos((c+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}}He.prototype.isVector4=!0;class xt extends pn{constructor(e,t,n){super(),this.width=e,this.height=t,this.depth=1,this.scissor=new He(0,0,e,t),this.scissorTest=!1,this.viewport=new He(0,0,e,t),n=n||{},this.texture=new ot(void 0,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.image={},this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:1006,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null}setTexture(e){e.image={width:this.width,height:this.height,depth:this.depth},this.texture=e}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.depthTexture=e.depthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}xt.prototype.isWebGLRenderTarget=!0;class Ko extends xt{constructor(e,t,n){super(e,t,n),this.samples=4}copy(e){return super.copy.call(this,e),this.samples=e.samples,this}}Ko.prototype.isWebGLMultisampleRenderTarget=!0;class at{constructor(e=0,t=0,n=0,i=1){this._x=e,this._y=t,this._z=n,this._w=i}static slerp(e,t,n,i){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),n.slerpQuaternions(e,t,i)}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=r[a+0],f=r[a+1],p=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=p,e[t+3]=v;return}if(d!==v||l!==u||c!==f||h!==p){let x=1-o;const m=l*u+c*f+h*p+d*v,g=m>=0?1:-1,T=1-m*m;if(T>Number.EPSILON){const E=Math.sqrt(T),_=Math.atan2(E,m*g);x=Math.sin(x*_)/E,o=Math.sin(o*_)/E}const S=o*g;if(l=l*x+u*S,c=c*x+f*S,h=h*x+p*S,d=d*x+v*S,x===1-o){const E=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=E,c*=E,h*=E,d*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[a],u=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*d+l*f-c*u,e[t+1]=l*p+h*u+c*d-o*f,e[t+2]=c*p+h*f+o*u-l*d,e[t+3]=h*p-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){if(!(e&&e.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(r/2),u=l(n/2),f=l(i/2),p=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e,t){return t!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(e,t)):this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){this.copy(e).slerp(t,n)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}}at.prototype.isQuaternion=!0;class M{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(e,t)):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this)}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return e&&e.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(As.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(As.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=l*t+a*i-o*n,h=l*n+o*t-r*i,d=l*i+r*n-a*t,u=-r*t-a*n-o*i;return this.x=c*l+u*-r+h*-o-d*-a,this.y=h*l+u*-a+d*-r-c*-o,this.z=d*l+u*-o+c*-a-h*-r,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e,t){return t!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(e,t)):this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return gr.copy(this).projectOnVector(e),this.sub(gr)}reflect(e){return this.sub(gr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}}M.prototype.isVector3=!0;const gr=new M,As=new at;class yt{constructor(e=new M(1/0,1/0,1/0),t=new M(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,i=1/0,r=-1/0,a=-1/0,o=-1/0;for(let l=0,c=e.length;l<c;l+=3){const h=e[l],d=e[l+1],u=e[l+2];h<t&&(t=h),d<n&&(n=d),u<i&&(i=u),h>r&&(r=h),d>a&&(a=d),u>o&&(o=u)}return this.min.set(t,n,i),this.max.set(r,a,o),this}setFromBufferAttribute(e){let t=1/0,n=1/0,i=1/0,r=-1/0,a=-1/0,o=-1/0;for(let l=0,c=e.count;l<c;l++){const h=e.getX(l),d=e.getY(l),u=e.getZ(l);h<t&&(t=h),d<n&&(n=d),u<i&&(i=u),h>r&&(r=h),d>a&&(a=d),u>o&&(o=u)}return this.min.set(t,n,i),this.max.set(r,a,o),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e){return this.makeEmpty(),this.expandByObject(e)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return e===void 0&&(console.warn("THREE.Box3: .getCenter() target is now required"),e=new M),this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return e===void 0&&(console.warn("THREE.Box3: .getSize() target is now required"),e=new M),this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e){e.updateWorldMatrix(!1,!1);const t=e.geometry;t!==void 0&&(t.boundingBox===null&&t.computeBoundingBox(),vr.copy(t.boundingBox),vr.applyMatrix4(e.matrixWorld),this.union(vr));const n=e.children;for(let i=0,r=n.length;i<r;i++)this.expandByObject(n[i]);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t===void 0&&(console.warn("THREE.Box3: .getParameter() target is now required"),t=new M),t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Jn),wi.subVectors(this.max,Jn),xn.subVectors(e.a,Jn),_n.subVectors(e.b,Jn),yn.subVectors(e.c,Jn),kt.subVectors(_n,xn),Vt.subVectors(yn,_n),on.subVectors(xn,yn);let t=[0,-kt.z,kt.y,0,-Vt.z,Vt.y,0,-on.z,on.y,kt.z,0,-kt.x,Vt.z,0,-Vt.x,on.z,0,-on.x,-kt.y,kt.x,0,-Vt.y,Vt.x,0,-on.y,on.x,0];return!xr(t,xn,_n,yn,wi)||(t=[1,0,0,0,1,0,0,0,1],!xr(t,xn,_n,yn,wi))?!1:(bi.crossVectors(kt,Vt),t=[bi.x,bi.y,bi.z],xr(t,xn,_n,yn,wi))}clampPoint(e,t){return t===void 0&&(console.warn("THREE.Box3: .clampPoint() target is now required"),t=new M),t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return jn.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return e===void 0&&console.error("THREE.Box3: .getBoundingSphere() target is now required"),this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(zt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}yt.prototype.isBox3=!0;const zt=[new M,new M,new M,new M,new M,new M,new M,new M],jn=new M,vr=new yt,xn=new M,_n=new M,yn=new M,kt=new M,Vt=new M,on=new M,Jn=new M,wi=new M,bi=new M,ln=new M;function xr(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){ln.fromArray(s,r);const o=i.x*Math.abs(ln.x)+i.y*Math.abs(ln.y)+i.z*Math.abs(ln.z),l=e.dot(ln),c=t.dot(ln),h=n.dot(ln);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const el=new yt,Ls=new M,_r=new M,yr=new M;class Wn{constructor(e=new M,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):el.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t===void 0&&(console.warn("THREE.Sphere: .clampPoint() target is now required"),t=new M),t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return e===void 0&&(console.warn("THREE.Sphere: .getBoundingBox() target is now required"),e=new yt),this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){yr.subVectors(e,this.center);const t=yr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.add(yr.multiplyScalar(i/n)),this.radius+=i}return this}union(e){return _r.subVectors(e.center,this.center).normalize().multiplyScalar(e.radius),this.expandByPoint(Ls.copy(e.center).add(_r)),this.expandByPoint(Ls.copy(e.center).sub(_r)),this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gt=new M,Mr=new M,Si=new M,Wt=new M,wr=new M,Ti=new M,br=new M;class qn{constructor(e=new M,t=new M(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t===void 0&&(console.warn("THREE.Ray: .at() target is now required"),t=new M),t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gt)),this}closestPointToPoint(e,t){t===void 0&&(console.warn("THREE.Ray: .closestPointToPoint() target is now required"),t=new M),t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Gt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gt.copy(this.direction).multiplyScalar(t).add(this.origin),Gt.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Mr.copy(e).add(t).multiplyScalar(.5),Si.copy(t).sub(e).normalize(),Wt.copy(this.origin).sub(Mr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Si),o=Wt.dot(this.direction),l=-Wt.dot(Si),c=Wt.lengthSq(),h=Math.abs(1-a*a);let d,u,f,p;if(h>0)if(d=a*l-o,u=a*o-l,p=r*h,d>=0)if(u>=-p)if(u<=p){const v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(d).add(this.origin),i&&i.copy(Si).multiplyScalar(u).add(Mr),f}intersectSphere(e,t){Gt.subVectors(e.center,this.origin);const n=Gt.dot(this.direction),i=Gt.dot(Gt)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return o<0&&l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>i||((r>n||n!==n)&&(n=r),(a<i||i!==i)&&(i=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Gt)!==null}intersectTriangle(e,t,n,i,r){wr.subVectors(t,e),Ti.subVectors(n,e),br.crossVectors(wr,Ti);let a=this.direction.dot(br),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wt.subVectors(this.origin,e);const l=o*this.direction.dot(Ti.crossVectors(Wt,Ti));if(l<0)return null;const c=o*this.direction.dot(wr.cross(Wt));if(c<0||l+c>a)return null;const h=-o*Wt.dot(br);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(e,t,n,i,r,a,o,l,c,h,d,u,f,p,v,x){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=v,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Mn.setFromMatrixColumn(e,0).length(),r=1/Mn.setFromMatrixColumn(e,1).length(),a=1/Mn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){e&&e.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,p=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,p=c*h,v=c*d;t[0]=u+v*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,p=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,p=o*h,v=o*d;t[0]=l*h,t[4]=p*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,p=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=p*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+p,t[10]=u-v*d}else if(e.order==="XZY"){const u=a*l,f=a*c,p=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tl,e,nl)}lookAt(e,t,n){const i=this.elements;return mt.subVectors(e,t),mt.lengthSq()===0&&(mt.z=1),mt.normalize(),qt.crossVectors(n,mt),qt.lengthSq()===0&&(Math.abs(n.z)===1?mt.x+=1e-4:mt.z+=1e-4,mt.normalize(),qt.crossVectors(n,mt)),qt.normalize(),Ei.crossVectors(mt,qt),i[0]=qt.x,i[4]=Ei.x,i[8]=mt.x,i[1]=qt.y,i[5]=Ei.y,i[9]=mt.y,i[2]=qt.z,i[6]=Ei.z,i[10]=mt.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(e,t)):this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],v=n[6],x=n[10],m=n[14],g=n[3],T=n[7],S=n[11],E=n[15],_=i[0],D=i[4],I=i[8],B=i[12],G=i[1],W=i[5],N=i[9],L=i[13],P=i[2],R=i[6],A=i[10],V=i[14],j=i[3],Y=i[7],se=i[11],ne=i[15];return r[0]=a*_+o*G+l*P+c*j,r[4]=a*D+o*W+l*R+c*Y,r[8]=a*I+o*N+l*A+c*se,r[12]=a*B+o*L+l*V+c*ne,r[1]=h*_+d*G+u*P+f*j,r[5]=h*D+d*W+u*R+f*Y,r[9]=h*I+d*N+u*A+f*se,r[13]=h*B+d*L+u*V+f*ne,r[2]=p*_+v*G+x*P+m*j,r[6]=p*D+v*W+x*R+m*Y,r[10]=p*I+v*N+x*A+m*se,r[14]=p*B+v*L+x*V+m*ne,r[3]=g*_+T*G+S*P+E*j,r[7]=g*D+T*W+S*R+E*Y,r[11]=g*I+T*N+S*A+E*se,r[15]=g*B+T*L+S*V+E*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],v=e[7],x=e[11],m=e[15];return p*(+r*l*d-i*c*d-r*o*u+n*c*u+i*o*f-n*l*f)+v*(+t*l*f-t*c*u+r*a*u-i*a*f+i*c*h-r*l*h)+x*(+t*c*d-t*o*f-r*a*d+n*a*f+r*o*h-n*c*h)+m*(-i*o*h-t*l*d+t*o*u+i*a*d-n*a*u+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],v=e[13],x=e[14],m=e[15],g=d*x*c-v*u*c+v*l*f-o*x*f-d*l*m+o*u*m,T=p*u*c-h*x*c-p*l*f+a*x*f+h*l*m-a*u*m,S=h*v*c-p*d*c+p*o*f-a*v*f-h*o*m+a*d*m,E=p*d*l-h*v*l-p*o*u+a*v*u+h*o*x-a*d*x,_=t*g+n*T+i*S+r*E;if(_===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/_;return e[0]=g*D,e[1]=(v*u*r-d*x*r-v*i*f+n*x*f+d*i*m-n*u*m)*D,e[2]=(o*x*r-v*l*r+v*i*c-n*x*c-o*i*m+n*l*m)*D,e[3]=(d*l*r-o*u*r-d*i*c+n*u*c+o*i*f-n*l*f)*D,e[4]=T*D,e[5]=(h*x*r-p*u*r+p*i*f-t*x*f-h*i*m+t*u*m)*D,e[6]=(p*l*r-a*x*r-p*i*c+t*x*c+a*i*m-t*l*m)*D,e[7]=(a*u*r-h*l*r+h*i*c-t*u*c-a*i*f+t*l*f)*D,e[8]=S*D,e[9]=(p*d*r-h*v*r-p*n*f+t*v*f+h*n*m-t*d*m)*D,e[10]=(a*v*r-p*o*r+p*n*c-t*v*c-a*n*m+t*o*m)*D,e[11]=(h*o*r-a*d*r-h*n*c+t*d*c+a*n*f-t*o*f)*D,e[12]=E*D,e[13]=(h*v*i-p*d*i+p*n*u-t*v*u-h*n*x+t*d*x)*D,e[14]=(p*o*i-a*v*i-p*n*l+t*v*l+a*n*x-t*o*x)*D,e[15]=(a*d*i-h*o*i+h*n*l-t*d*l-a*n*u+t*o*u)*D,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n){return this.set(1,t,n,0,e,1,n,0,e,t,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,p=r*d,v=a*h,x=a*d,m=o*d,g=l*c,T=l*h,S=l*d,E=n.x,_=n.y,D=n.z;return i[0]=(1-(v+m))*E,i[1]=(f+S)*E,i[2]=(p-T)*E,i[3]=0,i[4]=(f-S)*_,i[5]=(1-(u+m))*_,i[6]=(x+g)*_,i[7]=0,i[8]=(p+T)*D,i[9]=(x-g)*D,i[10]=(1-(u+v))*D,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Mn.set(i[0],i[1],i[2]).length();const a=Mn.set(i[4],i[5],i[6]).length(),o=Mn.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],wt.copy(this);const c=1/r,h=1/a,d=1/o;return wt.elements[0]*=c,wt.elements[1]*=c,wt.elements[2]*=c,wt.elements[4]*=h,wt.elements[5]*=h,wt.elements[6]*=h,wt.elements[8]*=d,wt.elements[9]*=d,wt.elements[10]*=d,t.setFromRotationMatrix(wt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a){a===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const o=this.elements,l=2*r/(t-e),c=2*r/(n-i),h=(t+e)/(t-e),d=(n+i)/(n-i),u=-(a+r)/(a-r),f=-2*a*r/(a-r);return o[0]=l,o[4]=0,o[8]=h,o[12]=0,o[1]=0,o[5]=c,o[9]=d,o[13]=0,o[2]=0,o[6]=0,o[10]=u,o[14]=f,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,i,r,a){const o=this.elements,l=1/(t-e),c=1/(n-i),h=1/(a-r),d=(t+e)*l,u=(n+i)*c,f=(a+r)*h;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-d,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-u,o[2]=0,o[6]=0,o[10]=-2*h,o[14]=-f,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}de.prototype.isMatrix4=!0;const Mn=new M,wt=new de,tl=new M(0,0,0),nl=new M(1,1,1),qt=new M,Ei=new M,mt=new M,Cs=new de,Rs=new at;class mn{constructor(e=0,t=0,n=0,i=mn.DefaultOrder){this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._order=i||this._order,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t,n){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t=t||this._order,t){case"XYZ":this._y=Math.asin(ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ft(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n!==!1&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Cs.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cs,t,n)}setFromVector3(e,t){return this.set(e.x,e.y,e.z,t||this._order)}reorder(e){return Rs.setFromEuler(this),this.setFromQuaternion(Rs,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}toVector3(e){return e?e.set(this._x,this._y,this._z):new M(this._x,this._y,this._z)}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}}mn.prototype.isEuler=!0;mn.DefaultOrder="XYZ";mn.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class il{constructor(){this.mask=1}set(e){this.mask=1<<e|0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}}let rl=0;const Ps=new M,wn=new at,Ut=new de,Ai=new M,Qn=new M,sl=new M,al=new at,Ds=new M(1,0,0),Fs=new M(0,1,0),Is=new M(0,0,1),ol={type:"added"},Bs={type:"removed"};class Ie extends pn{constructor(){super(),Object.defineProperty(this,"id",{value:rl++}),this.uuid=Et(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ie.DefaultUp.clone();const e=new M,t=new mn,n=new at,i=new M(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new de},normalMatrix:{value:new st}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=Ie.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new il,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return wn.setFromAxisAngle(e,t),this.quaternion.multiply(wn),this}rotateOnWorldAxis(e,t){return wn.setFromAxisAngle(e,t),this.quaternion.premultiply(wn),this}rotateX(e){return this.rotateOnAxis(Ds,e)}rotateY(e){return this.rotateOnAxis(Fs,e)}rotateZ(e){return this.rotateOnAxis(Is,e)}translateOnAxis(e,t){return Ps.copy(e).applyQuaternion(this.quaternion),this.position.add(Ps.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ds,e)}translateY(e){return this.translateOnAxis(Fs,e)}translateZ(e){return this.translateOnAxis(Is,e)}localToWorld(e){return e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return e.applyMatrix4(Ut.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ai.copy(e):Ai.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Qn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ut.lookAt(Qn,Ai,this.up):Ut.lookAt(Ai,Qn,this.up),this.quaternion.setFromRotationMatrix(Ut),i&&(Ut.extractRotation(i.matrixWorld),wn.setFromRotationMatrix(Ut),this.quaternion.premultiply(wn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(ol)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bs)),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Bs)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),Ut.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ut.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ut),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getWorldPosition(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldPosition() target is now required"),e=new M),this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),e=new at),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qn,e,sl),e}getWorldScale(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldScale() target is now required"),e=new M),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qn,al,e),e}getWorldDirection(e){e===void 0&&(console.warn("THREE.Object3D: .getWorldDirection() target is now required"),e=new M),this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Ie.DefaultUp=new M(0,1,0);Ie.DefaultMatrixAutoUpdate=!0;Ie.prototype.isObject3D=!0;const Sr=new M,ll=new M,cl=new st;class Rt{constructor(e=new M(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Sr.subVectors(n,t).cross(ll.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t===void 0&&(console.warn("THREE.Plane: .projectPoint() target is now required"),t=new M),t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){t===void 0&&(console.warn("THREE.Plane: .intersectLine() target is now required"),t=new M);const n=e.delta(Sr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(n).multiplyScalar(r).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e===void 0&&(console.warn("THREE.Plane: .coplanarPoint() target is now required"),e=new M),e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||cl.getNormalMatrix(e),i=this.coplanarPoint(Sr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}Rt.prototype.isPlane=!0;const bt=new M,Ot=new M,Tr=new M,Ht=new M,bn=new M,Sn=new M,Ns=new M,Er=new M,Ar=new M,Lr=new M;class Ke{constructor(e=new M,t=new M,n=new M){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i===void 0&&(console.warn("THREE.Triangle: .getNormal() target is now required"),i=new M),i.subVectors(n,t),bt.subVectors(e,t),i.cross(bt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){bt.subVectors(i,t),Ot.subVectors(n,t),Tr.subVectors(e,t);const a=bt.dot(bt),o=bt.dot(Ot),l=bt.dot(Tr),c=Ot.dot(Ot),h=Ot.dot(Tr),d=a*c-o*o;if(r===void 0&&(console.warn("THREE.Triangle: .getBarycoord() target is now required"),r=new M),d===0)return r.set(-2,-1,-1);const u=1/d,f=(c*l-o*h)*u,p=(a*h-o*l)*u;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ht),Ht.x>=0&&Ht.y>=0&&Ht.x+Ht.y<=1}static getUV(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,Ht),l.set(0,0),l.addScaledVector(r,Ht.x),l.addScaledVector(a,Ht.y),l.addScaledVector(o,Ht.z),l}static isFrontFacing(e,t,n,i){return bt.subVectors(n,t),Ot.subVectors(e,t),bt.cross(Ot).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bt.subVectors(this.c,this.b),Ot.subVectors(this.a,this.b),bt.cross(Ot).length()*.5}getMidpoint(e){return e===void 0&&(console.warn("THREE.Triangle: .getMidpoint() target is now required"),e=new M),e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ke.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e===void 0&&(console.warn("THREE.Triangle: .getPlane() target is now required"),e=new Rt),e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ke.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return Ke.getUV(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Ke.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ke.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){t===void 0&&(console.warn("THREE.Triangle: .closestPointToPoint() target is now required"),t=new M);const n=this.a,i=this.b,r=this.c;let a,o;bn.subVectors(i,n),Sn.subVectors(r,n),Er.subVectors(e,n);const l=bn.dot(Er),c=Sn.dot(Er);if(l<=0&&c<=0)return t.copy(n);Ar.subVectors(e,i);const h=bn.dot(Ar),d=Sn.dot(Ar);if(h>=0&&d<=h)return t.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(bn,a);Lr.subVectors(e,r);const f=bn.dot(Lr),p=Sn.dot(Lr);if(p>=0&&f<=p)return t.copy(r);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Sn,o);const x=h*p-f*d;if(x<=0&&d-h>=0&&f-p>=0)return Ns.subVectors(r,i),o=(d-h)/(d-h+(f-p)),t.copy(i).addScaledVector(Ns,o);const m=1/(x+v+u);return a=v*m,o=u*m,t.copy(n).addScaledVector(bn,a).addScaledVector(Sn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let hl=0;function nt(){Object.defineProperty(this,"id",{value:hl++}),this.uuid=Et(),this.name="",this.type="Material",this.fog=!0,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0}nt.prototype=Object.assign(Object.create(pn.prototype),{constructor:nt,isMaterial:!0,onBuild:function(){},onBeforeCompile:function(){},customProgramCacheKey:function(){return this.onBeforeCompile.toString()},setValues:function(s){if(s!==void 0)for(const e in s){const t=s[e];if(t===void 0){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}if(e==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=t===1;continue}const n=this[e];if(n===void 0){console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");continue}n&&n.isColor?n.set(t):n&&n.isVector3&&t&&t.isVector3?n.copy(t):this[e]=t}},toJSON:function(s){const e=s===void 0||typeof s=="string";e&&(s={textures:{},images:{}});const t={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),this.color&&this.color.isColor&&(t.color=this.color.getHex()),this.roughness!==void 0&&(t.roughness=this.roughness),this.metalness!==void 0&&(t.metalness=this.metalness),this.sheen&&this.sheen.isColor&&(t.sheen=this.sheen.getHex()),this.emissive&&this.emissive.isColor&&(t.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(t.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(t.specular=this.specular.getHex()),this.shininess!==void 0&&(t.shininess=this.shininess),this.clearcoat!==void 0&&(t.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(t.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(t.clearcoatMap=this.clearcoatMap.toJSON(s).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(t.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(s).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(t.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(s).uuid,t.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.map&&this.map.isTexture&&(t.map=this.map.toJSON(s).uuid),this.matcap&&this.matcap.isTexture&&(t.matcap=this.matcap.toJSON(s).uuid),this.alphaMap&&this.alphaMap.isTexture&&(t.alphaMap=this.alphaMap.toJSON(s).uuid),this.lightMap&&this.lightMap.isTexture&&(t.lightMap=this.lightMap.toJSON(s).uuid,t.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(t.aoMap=this.aoMap.toJSON(s).uuid,t.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(t.bumpMap=this.bumpMap.toJSON(s).uuid,t.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(t.normalMap=this.normalMap.toJSON(s).uuid,t.normalMapType=this.normalMapType,t.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(t.displacementMap=this.displacementMap.toJSON(s).uuid,t.displacementScale=this.displacementScale,t.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(t.roughnessMap=this.roughnessMap.toJSON(s).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(t.metalnessMap=this.metalnessMap.toJSON(s).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(t.emissiveMap=this.emissiveMap.toJSON(s).uuid),this.specularMap&&this.specularMap.isTexture&&(t.specularMap=this.specularMap.toJSON(s).uuid),this.envMap&&this.envMap.isTexture&&(t.envMap=this.envMap.toJSON(s).uuid,this.combine!==void 0&&(t.combine=this.combine)),this.envMapIntensity!==void 0&&(t.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(t.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(t.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(t.gradientMap=this.gradientMap.toJSON(s).uuid),this.size!==void 0&&(t.size=this.size),this.shadowSide!==null&&(t.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(t.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(t.blending=this.blending),this.side!==0&&(t.side=this.side),this.vertexColors&&(t.vertexColors=!0),this.opacity<1&&(t.opacity=this.opacity),this.transparent===!0&&(t.transparent=this.transparent),t.depthFunc=this.depthFunc,t.depthTest=this.depthTest,t.depthWrite=this.depthWrite,t.colorWrite=this.colorWrite,t.stencilWrite=this.stencilWrite,t.stencilWriteMask=this.stencilWriteMask,t.stencilFunc=this.stencilFunc,t.stencilRef=this.stencilRef,t.stencilFuncMask=this.stencilFuncMask,t.stencilFail=this.stencilFail,t.stencilZFail=this.stencilZFail,t.stencilZPass=this.stencilZPass,this.rotation&&this.rotation!==0&&(t.rotation=this.rotation),this.polygonOffset===!0&&(t.polygonOffset=!0),this.polygonOffsetFactor!==0&&(t.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(t.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth&&this.linewidth!==1&&(t.linewidth=this.linewidth),this.dashSize!==void 0&&(t.dashSize=this.dashSize),this.gapSize!==void 0&&(t.gapSize=this.gapSize),this.scale!==void 0&&(t.scale=this.scale),this.dithering===!0&&(t.dithering=!0),this.alphaTest>0&&(t.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(t.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(t.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(t.wireframe=this.wireframe),this.wireframeLinewidth>1&&(t.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(t.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(t.wireframeLinejoin=this.wireframeLinejoin),this.morphTargets===!0&&(t.morphTargets=!0),this.morphNormals===!0&&(t.morphNormals=!0),this.skinning===!0&&(t.skinning=!0),this.flatShading===!0&&(t.flatShading=this.flatShading),this.visible===!1&&(t.visible=!1),this.toneMapped===!1&&(t.toneMapped=!1),JSON.stringify(this.userData)!=="{}"&&(t.userData=this.userData);function n(i){const r=[];for(const a in i){const o=i[a];delete o.metadata,r.push(o)}return r}if(e){const i=n(s.textures),r=n(s.images);i.length>0&&(t.textures=i),r.length>0&&(t.images=r)}return t},clone:function(){return new this.constructor().copy(this)},copy:function(s){this.name=s.name,this.fog=s.fog,this.blending=s.blending,this.side=s.side,this.vertexColors=s.vertexColors,this.opacity=s.opacity,this.transparent=s.transparent,this.blendSrc=s.blendSrc,this.blendDst=s.blendDst,this.blendEquation=s.blendEquation,this.blendSrcAlpha=s.blendSrcAlpha,this.blendDstAlpha=s.blendDstAlpha,this.blendEquationAlpha=s.blendEquationAlpha,this.depthFunc=s.depthFunc,this.depthTest=s.depthTest,this.depthWrite=s.depthWrite,this.stencilWriteMask=s.stencilWriteMask,this.stencilFunc=s.stencilFunc,this.stencilRef=s.stencilRef,this.stencilFuncMask=s.stencilFuncMask,this.stencilFail=s.stencilFail,this.stencilZFail=s.stencilZFail,this.stencilZPass=s.stencilZPass,this.stencilWrite=s.stencilWrite;const e=s.clippingPlanes;let t=null;if(e!==null){const n=e.length;t=new Array(n);for(let i=0;i!==n;++i)t[i]=e[i].clone()}return this.clippingPlanes=t,this.clipIntersection=s.clipIntersection,this.clipShadows=s.clipShadows,this.shadowSide=s.shadowSide,this.colorWrite=s.colorWrite,this.precision=s.precision,this.polygonOffset=s.polygonOffset,this.polygonOffsetFactor=s.polygonOffsetFactor,this.polygonOffsetUnits=s.polygonOffsetUnits,this.dithering=s.dithering,this.alphaTest=s.alphaTest,this.alphaToCoverage=s.alphaToCoverage,this.premultipliedAlpha=s.premultipliedAlpha,this.visible=s.visible,this.toneMapped=s.toneMapped,this.userData=JSON.parse(JSON.stringify(s.userData)),this},dispose:function(){this.dispatchEvent({type:"dispose"})}});Object.defineProperty(nt.prototype,"needsUpdate",{set:function(s){s===!0&&this.version++}});const za={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},St={h:0,s:0,l:0},Li={h:0,s:0,l:0};function Cr(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}function Rr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Pr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}class le{constructor(e,t,n){return t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,this}setRGB(e,t,n){return this.r=e,this.g=t,this.b=n,this}setHSL(e,t,n){if(e=ns(e,1),t=ft(t,0,1),n=ft(n,0,1),t===0)this.r=this.g=this.b=n;else{const i=n<=.5?n*(1+t):n+t-n*t,r=2*n-i;this.r=Cr(r,i,e+1/3),this.g=Cr(r,i,e),this.b=Cr(r,i,e-1/3)}return this}setStyle(e){function t(i){i!==void 0&&parseFloat(i)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let i;const r=n[1],a=n[2];switch(r){case"rgb":case"rgba":if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(i[1],10))/255,this.g=Math.min(255,parseInt(i[2],10))/255,this.b=Math.min(255,parseInt(i[3],10))/255,t(i[4]),this;if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(i[1],10))/100,this.g=Math.min(100,parseInt(i[2],10))/100,this.b=Math.min(100,parseInt(i[3],10))/100,t(i[4]),this;break;case"hsl":case"hsla":if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){const o=parseFloat(i[1])/360,l=parseInt(i[2],10)/100,c=parseInt(i[3],10)/100;return t(i[4]),this.setHSL(o,l,c)}break}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const i=n[1],r=i.length;if(r===3)return this.r=parseInt(i.charAt(0)+i.charAt(0),16)/255,this.g=parseInt(i.charAt(1)+i.charAt(1),16)/255,this.b=parseInt(i.charAt(2)+i.charAt(2),16)/255,this;if(r===6)return this.r=parseInt(i.charAt(0)+i.charAt(1),16)/255,this.g=parseInt(i.charAt(2)+i.charAt(3),16)/255,this.b=parseInt(i.charAt(4)+i.charAt(5),16)/255,this}return e&&e.length>0?this.setColorName(e):this}setColorName(e){const t=za[e.toLowerCase()];return t!==void 0?this.setHex(t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copyGammaToLinear(e,t=2){return this.r=Math.pow(e.r,t),this.g=Math.pow(e.g,t),this.b=Math.pow(e.b,t),this}copyLinearToGamma(e,t=2){const n=t>0?1/t:1;return this.r=Math.pow(e.r,n),this.g=Math.pow(e.g,n),this.b=Math.pow(e.b,n),this}convertGammaToLinear(e){return this.copyGammaToLinear(this,e),this}convertLinearToGamma(e){return this.copyLinearToGamma(this,e),this}copySRGBToLinear(e){return this.r=Rr(e.r),this.g=Rr(e.g),this.b=Rr(e.b),this}copyLinearToSRGB(e){return this.r=Pr(e.r),this.g=Pr(e.g),this.b=Pr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(){return this.r*255<<16^this.g*255<<8^this.b*255<<0}getHexString(){return("000000"+this.getHex().toString(16)).slice(-6)}getHSL(e){e===void 0&&(console.warn("THREE.Color: .getHSL() target is now required"),e={h:0,s:0,l:0});const t=this.r,n=this.g,i=this.b,r=Math.max(t,n,i),a=Math.min(t,n,i);let o,l;const c=(a+r)/2;if(a===r)o=0,l=0;else{const h=r-a;switch(l=c<=.5?h/(r+a):h/(2-r-a),r){case t:o=(n-i)/h+(n<i?6:0);break;case n:o=(i-t)/h+2;break;case i:o=(t-n)/h+4;break}o/=6}return e.h=o,e.s=l,e.l=c,e}getStyle(){return"rgb("+(this.r*255|0)+","+(this.g*255|0)+","+(this.b*255|0)+")"}offsetHSL(e,t,n){return this.getHSL(St),St.h+=e,St.s+=t,St.l+=n,this.setHSL(St.h,St.s,St.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(St),e.getHSL(Li);const n=li(St.h,Li.h,t),i=li(St.s,Li.s,t),r=li(St.l,Li.l,t);return this.setHSL(n,i,r),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),e.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}}le.NAMES=za;le.prototype.isColor=!0;le.prototype.r=1;le.prototype.g=1;le.prototype.b=1;class gi extends nt{constructor(e){super(),this.type="MeshBasicMaterial",this.color=new le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this}}gi.prototype.isMeshBasicMaterial=!0;const We=new M,Ci=new q;class je{constructor(e,t,n){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n===!0,this.usage=35044,this.updateRange={offset:0,count:-1},this.version=0,this.onUploadCallback=function(){}}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}copyColorsArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let a=e[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",i),a=new le),t[n++]=a.r,t[n++]=a.g,t[n++]=a.b}return this}copyVector2sArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let a=e[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",i),a=new q),t[n++]=a.x,t[n++]=a.y}return this}copyVector3sArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let a=e[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",i),a=new M),t[n++]=a.x,t[n++]=a.y,t[n++]=a.z}return this}copyVector4sArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let a=e[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",i),a=new He),t[n++]=a.x,t[n++]=a.y,t[n++]=a.z,t[n++]=a.w}return this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ci.fromBufferAttribute(this,t),Ci.applyMatrix3(e),this.setXY(t,Ci.x,Ci.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)We.fromBufferAttribute(this,t),We.applyMatrix3(e),this.setXYZ(t,We.x,We.y,We.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)We.x=this.getX(t),We.y=this.getY(t),We.z=this.getZ(t),We.applyMatrix4(e),this.setXYZ(t,We.x,We.y,We.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)We.x=this.getX(t),We.y=this.getY(t),We.z=this.getZ(t),We.applyNormalMatrix(e),this.setXYZ(t,We.x,We.y,We.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)We.x=this.getX(t),We.y=this.getY(t),We.z=this.getZ(t),We.transformDirection(e),this.setXYZ(t,We.x,We.y,We.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){return this.array[e*this.itemSize]}setX(e,t){return this.array[e*this.itemSize]=t,this}getY(e){return this.array[e*this.itemSize+1]}setY(e,t){return this.array[e*this.itemSize+1]=t,this}getZ(e){return this.array[e*this.itemSize+2]}setZ(e,t){return this.array[e*this.itemSize+2]=t,this}getW(e){return this.array[e*this.itemSize+3]}setW(e,t){return this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}je.prototype.isBufferAttribute=!0;class Ga extends je{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ua extends je{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ul extends je{constructor(e,t,n){super(new Uint16Array(e),t,n)}}ul.prototype.isFloat16BufferAttribute=!0;class Fe extends je{constructor(e,t,n){super(new Float32Array(e),t,n)}}function Oa(s){if(s.length===0)return-1/0;let e=s[0];for(let t=1,n=s.length;t<n;++t)s[t]>e&&(e=s[t]);return e}let dl=0;const Lt=new de,Dr=new Ie,Tn=new M,gt=new yt,$n=new yt,et=new M;class De extends pn{constructor(){super(),Object.defineProperty(this,"id",{value:dl++}),this.uuid=Et(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Oa(e)>65535?Ua:Ga)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new st().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}rotateX(e){return Lt.makeRotationX(e),this.applyMatrix4(Lt),this}rotateY(e){return Lt.makeRotationY(e),this.applyMatrix4(Lt),this}rotateZ(e){return Lt.makeRotationZ(e),this.applyMatrix4(Lt),this}translate(e,t,n){return Lt.makeTranslation(e,t,n),this.applyMatrix4(Lt),this}scale(e,t,n){return Lt.makeScale(e,t,n),this.applyMatrix4(Lt),this}lookAt(e){return Dr.lookAt(e),Dr.updateMatrix(),this.applyMatrix4(Dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Tn).negate(),this.translate(Tn.x,Tn.y,Tn.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Fe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new M(-1/0,-1/0,-1/0),new M(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];gt.setFromBufferAttribute(r),this.morphTargetsRelative?(et.addVectors(this.boundingBox.min,gt.min),this.boundingBox.expandByPoint(et),et.addVectors(this.boundingBox.max,gt.max),this.boundingBox.expandByPoint(et)):(this.boundingBox.expandByPoint(gt.min),this.boundingBox.expandByPoint(gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new M,1/0);return}if(e){const n=this.boundingSphere.center;if(gt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];$n.setFromBufferAttribute(o),this.morphTargetsRelative?(et.addVectors(gt.min,$n.min),gt.expandByPoint(et),et.addVectors(gt.max,$n.max),gt.expandByPoint(et)):(gt.expandByPoint($n.min),gt.expandByPoint($n.max))}gt.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)et.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(et));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)et.fromBufferAttribute(o,c),l&&(Tn.fromBufferAttribute(e,c),et.add(Tn)),i=Math.max(i,n.distanceToSquared(et))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeFaceNormals(){}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,r=t.normal.array,a=t.uv.array,o=i.length/3;t.tangent===void 0&&this.setAttribute("tangent",new je(new Float32Array(4*o),4));const l=t.tangent.array,c=[],h=[];for(let G=0;G<o;G++)c[G]=new M,h[G]=new M;const d=new M,u=new M,f=new M,p=new q,v=new q,x=new q,m=new M,g=new M;function T(G,W,N){d.fromArray(i,G*3),u.fromArray(i,W*3),f.fromArray(i,N*3),p.fromArray(a,G*2),v.fromArray(a,W*2),x.fromArray(a,N*2),u.sub(d),f.sub(d),v.sub(p),x.sub(p);const L=1/(v.x*x.y-x.x*v.y);isFinite(L)&&(m.copy(u).multiplyScalar(x.y).addScaledVector(f,-v.y).multiplyScalar(L),g.copy(f).multiplyScalar(v.x).addScaledVector(u,-x.x).multiplyScalar(L),c[G].add(m),c[W].add(m),c[N].add(m),h[G].add(g),h[W].add(g),h[N].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let G=0,W=S.length;G<W;++G){const N=S[G],L=N.start,P=N.count;for(let R=L,A=L+P;R<A;R+=3)T(n[R+0],n[R+1],n[R+2])}const E=new M,_=new M,D=new M,I=new M;function B(G){D.fromArray(r,G*3),I.copy(D);const W=c[G];E.copy(W),E.sub(D.multiplyScalar(D.dot(W))).normalize(),_.crossVectors(I,W);const L=_.dot(h[G])<0?-1:1;l[G*4]=E.x,l[G*4+1]=E.y,l[G*4+2]=E.z,l[G*4+3]=L}for(let G=0,W=S.length;G<W;++G){const N=S[G],L=N.start,P=N.count;for(let R=L,A=L+P;R<A;R+=3)B(n[R+0]),B(n[R+1]),B(n[R+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new je(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new M,r=new M,a=new M,o=new M,l=new M,c=new M,h=new M,d=new M;if(e)for(let u=0,f=e.count;u<f;u+=3){const p=e.getX(u+0),v=e.getX(u+1),x=e.getX(u+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,x),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,x),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(x,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(e,t){if(!(e&&e.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",e);return}t===void 0&&(t=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));const n=this.attributes;for(const i in n){if(e.attributes[i]===void 0)continue;const a=n[i].array,o=e.attributes[i],l=o.array,c=o.itemSize*t,h=Math.min(l.length,a.length-c);for(let d=0,u=c;d<h;d++,u++)a[u]=l[d]}return this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)et.fromBufferAttribute(e,t),et.normalize(),e.setXYZ(t,et.x,et.y,et.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,p=0;for(let v=0,x=l.length;v<x;v++){f=l[v]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new je(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new De,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new De().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}De.prototype.isBufferGeometry=!0;const zs=new de,En=new qn,Fr=new Wn,Xt=new M,Yt=new M,Zt=new M,Ir=new M,Br=new M,Nr=new M,Ri=new M,Pi=new M,Di=new M,Fi=new q,Ii=new q,Bi=new q,zr=new M,Ni=new M;class oe extends Ie{constructor(e=new De,t=new gi){super(),this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(r),e.ray.intersectsSphere(Fr)===!1)||(zs.copy(r).invert(),En.copy(e.ray).applyMatrix4(zs),n.boundingBox!==null&&En.intersectsBox(n.boundingBox)===!1))return;let a;if(n.isBufferGeometry){const o=n.index,l=n.attributes.position,c=n.morphAttributes.position,h=n.morphTargetsRelative,d=n.attributes.uv,u=n.attributes.uv2,f=n.groups,p=n.drawRange;if(o!==null)if(Array.isArray(i))for(let v=0,x=f.length;v<x;v++){const m=f[v],g=i[m.materialIndex],T=Math.max(m.start,p.start),S=Math.min(m.start+m.count,p.start+p.count);for(let E=T,_=S;E<_;E+=3){const D=o.getX(E),I=o.getX(E+1),B=o.getX(E+2);a=zi(this,g,e,En,l,c,h,d,u,D,I,B),a&&(a.faceIndex=Math.floor(E/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const v=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=v,g=x;m<g;m+=3){const T=o.getX(m),S=o.getX(m+1),E=o.getX(m+2);a=zi(this,i,e,En,l,c,h,d,u,T,S,E),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(i))for(let v=0,x=f.length;v<x;v++){const m=f[v],g=i[m.materialIndex],T=Math.max(m.start,p.start),S=Math.min(m.start+m.count,p.start+p.count);for(let E=T,_=S;E<_;E+=3){const D=E,I=E+1,B=E+2;a=zi(this,g,e,En,l,c,h,d,u,D,I,B),a&&(a.faceIndex=Math.floor(E/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=v,g=x;m<g;m+=3){const T=m,S=m+1,E=m+2;a=zi(this,i,e,En,l,c,h,d,u,T,S,E),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}}else n.isGeometry&&console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}oe.prototype.isMesh=!0;function fl(s,e,t,n,i,r,a,o){let l;if(e.side===1?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side!==2,o),l===null)return null;Ni.copy(o),Ni.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ni);return c<t.near||c>t.far?null:{distance:c,point:Ni.clone(),object:s}}function zi(s,e,t,n,i,r,a,o,l,c,h,d){Xt.fromBufferAttribute(i,c),Yt.fromBufferAttribute(i,h),Zt.fromBufferAttribute(i,d);const u=s.morphTargetInfluences;if(e.morphTargets&&r&&u){Ri.set(0,0,0),Pi.set(0,0,0),Di.set(0,0,0);for(let p=0,v=r.length;p<v;p++){const x=u[p],m=r[p];x!==0&&(Ir.fromBufferAttribute(m,c),Br.fromBufferAttribute(m,h),Nr.fromBufferAttribute(m,d),a?(Ri.addScaledVector(Ir,x),Pi.addScaledVector(Br,x),Di.addScaledVector(Nr,x)):(Ri.addScaledVector(Ir.sub(Xt),x),Pi.addScaledVector(Br.sub(Yt),x),Di.addScaledVector(Nr.sub(Zt),x)))}Xt.add(Ri),Yt.add(Pi),Zt.add(Di)}s.isSkinnedMesh&&e.skinning&&(s.boneTransform(c,Xt),s.boneTransform(h,Yt),s.boneTransform(d,Zt));const f=fl(s,e,t,n,Xt,Yt,Zt,zr);if(f){o&&(Fi.fromBufferAttribute(o,c),Ii.fromBufferAttribute(o,h),Bi.fromBufferAttribute(o,d),f.uv=Ke.getUV(zr,Xt,Yt,Zt,Fi,Ii,Bi,new q)),l&&(Fi.fromBufferAttribute(l,c),Ii.fromBufferAttribute(l,h),Bi.fromBufferAttribute(l,d),f.uv2=Ke.getUV(zr,Xt,Yt,Zt,Fi,Ii,Bi,new q));const p={a:c,b:h,c:d,normal:new M,materialIndex:0};Ke.getNormal(Xt,Yt,Zt,p.normal),f.face=p}return f}class Ge extends De{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Fe(c,3)),this.setAttribute("normal",new Fe(h,3)),this.setAttribute("uv",new Fe(d,2));function p(v,x,m,g,T,S,E,_,D,I,B){const G=S/D,W=E/I,N=S/2,L=E/2,P=_/2,R=D+1,A=I+1;let V=0,j=0;const Y=new M;for(let se=0;se<A;se++){const ne=se*W-L;for(let fe=0;fe<R;fe++){const me=fe*G-N;Y[v]=me*g,Y[x]=ne*T,Y[m]=P,c.push(Y.x,Y.y,Y.z),Y[v]=0,Y[x]=0,Y[m]=_>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(fe/D),d.push(1-se/I),V+=1}}for(let se=0;se<I;se++)for(let ne=0;ne<D;ne++){const fe=u+ne+R*se,me=u+ne+R*(se+1),O=u+(ne+1)+R*(se+1),Be=u+(ne+1)+R*se;l.push(fe,me,Be),l.push(me,O,Be),j+=6}o.addGroup(f,j,B),f+=j,u+=V}}}function On(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function lt(s){const e={};for(let t=0;t<s.length;t++){const n=On(s[t]);for(const i in n)e[i]=n[i]}return e}const Ki={clone:On,merge:lt};var pl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ml=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vt extends nt{constructor(e){super(),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=pl,this.fragmentShader=ml,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&(e.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(e))}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=On(e.uniforms),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.lights=e.lights,this.clipping=e.clipping,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}vt.prototype.isShaderMaterial=!0;class is extends Ie{constructor(){super(),this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){e===void 0&&(console.warn("THREE.Camera: .getWorldDirection() target is now required"),e=new M),this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}is.prototype.isCamera=!0;class pt extends is{constructor(e=50,t=1,n=.1,i=2e3){super(),this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ui*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(oi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ui*2*Math.atan(Math.tan(oi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(oi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}pt.prototype.isPerspectiveCamera=!0;const An=90,Ln=1;class rs extends Ie{constructor(e,t,n){if(super(),this.type="CubeCamera",n.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=n;const i=new pt(An,Ln,e,t);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new M(1,0,0)),this.add(i);const r=new pt(An,Ln,e,t);r.layers=this.layers,r.up.set(0,-1,0),r.lookAt(new M(-1,0,0)),this.add(r);const a=new pt(An,Ln,e,t);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(new M(0,1,0)),this.add(a);const o=new pt(An,Ln,e,t);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(new M(0,-1,0)),this.add(o);const l=new pt(An,Ln,e,t);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new M(0,0,1)),this.add(l);const c=new pt(An,Ln,e,t);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new M(0,0,-1)),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,r,a,o,l,c]=this.children,h=e.xr.enabled,d=e.getRenderTarget();e.xr.enabled=!1;const u=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,r),e.setRenderTarget(n,2),e.render(t,a),e.setRenderTarget(n,3),e.render(t,o),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=u,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(d),e.xr.enabled=h}}class sr extends ot{constructor(e,t,n,i,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:301,o=o!==void 0?o:1022,super(e,t,n,i,r,a,o,l,c,h),this._needsFlipEnvMap=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}sr.prototype.isCubeTexture=!0;class Ha extends xt{constructor(e,t,n){Number.isInteger(t)&&(console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"),t=n),super(e,e,t),t=t||{},this.texture=new sr(void 0,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006,this.texture._needsFlipEnvMap=!1}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.format=1023,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ge(5,5,5),r=new vt({name:"CubemapFromEquirect",uniforms:On(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;const a=new oe(i,r),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new rs(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}Ha.prototype.isWebGLCubeRenderTarget=!0;class ka extends ot{constructor(e,t,n,i,r,a,o,l,c,h,d,u){super(null,a,o,l,c,h,i,r,d,u),this.image={data:e||null,width:t||1,height:n||1},this.magFilter=c!==void 0?c:1003,this.minFilter=h!==void 0?h:1003,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}ka.prototype.isDataTexture=!0;const Cn=new Wn,Gi=new M;class ar{constructor(e=new Rt,t=new Rt,n=new Rt,i=new Rt,r=new Rt,a=new Rt){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],r=n[1],a=n[2],o=n[3],l=n[4],c=n[5],h=n[6],d=n[7],u=n[8],f=n[9],p=n[10],v=n[11],x=n[12],m=n[13],g=n[14],T=n[15];return t[0].setComponents(o-i,d-l,v-u,T-x).normalize(),t[1].setComponents(o+i,d+l,v+u,T+x).normalize(),t[2].setComponents(o+r,d+c,v+f,T+m).normalize(),t[3].setComponents(o-r,d-c,v-f,T-m).normalize(),t[4].setComponents(o-a,d-h,v-p,T-g).normalize(),t[5].setComponents(o+a,d+h,v+p,T+g).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Cn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Cn)}intersectsSprite(e){return Cn.center.set(0,0,0),Cn.radius=.7071067811865476,Cn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Gi.x=i.normal.x>0?e.max.x:e.min.x,Gi.y=i.normal.y>0?e.max.y:e.min.y,Gi.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Gi)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Va(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function gl(s,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const d=c.array,u=c.usage,f=s.createBuffer();s.bindBuffer(h,f),s.bufferData(h,d,u),c.onUploadCallback();let p=5126;return d instanceof Float32Array?p=5126:d instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):d instanceof Uint16Array?c.isFloat16BufferAttribute?t?p=5131:console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."):p=5123:d instanceof Int16Array?p=5122:d instanceof Uint32Array?p=5125:d instanceof Int32Array?p=5124:d instanceof Int8Array?p=5120:d instanceof Uint8Array&&(p=5121),{buffer:f,type:p,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version}}function r(c,h,d){const u=h.array,f=h.updateRange;s.bindBuffer(d,c),f.count===-1?s.bufferSubData(d,0,u):(t?s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1)}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(s.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d===void 0?n.set(c,i(c,h)):d.version<c.version&&(r(d.buffer,c,h),d.version=c.version)}return{get:a,remove:o,update:l}}class un extends De{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=e/o,u=t/l,f=[],p=[],v=[],x=[];for(let m=0;m<h;m++){const g=m*u-a;for(let T=0;T<c;T++){const S=T*d-r;p.push(S,-g,0),v.push(0,0,1),x.push(T/o),x.push(1-m/l)}}for(let m=0;m<l;m++)for(let g=0;g<o;g++){const T=g+c*m,S=g+c*(m+1),E=g+1+c*(m+1),_=g+1+c*m;f.push(T,S,_),f.push(S,E,_)}this.setIndex(f),this.setAttribute("position",new Fe(p,3)),this.setAttribute("normal",new Fe(v,3)),this.setAttribute("uv",new Fe(x,2))}}var vl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,xl=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_l=`#ifdef ALPHATEST
	if ( diffuseColor.a < ALPHATEST ) discard;
#endif`,yl=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );
	#endif
#endif`,Ml=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wl="vec3 transformed = vec3( position );",bl=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sl=`vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	return vec2( -1.04, 1.04 ) * a004 + r.zw;
}
float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
#if defined ( PHYSICALLY_CORRECT_LIGHTS )
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
#else
	if( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
		return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );
	}
	return 1.0;
#endif
}
vec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {
	float fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );
	return ( 1.0 - specularColor ) * fresnel + specularColor;
}
vec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {
	float fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );
	vec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;
	return Fr * fresnel + F0;
}
float G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	float gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	return 1.0 / ( gl * gv );
}
float G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
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
vec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( incidentLight.direction + viewDir );
	float dotNL = saturate( dot( normal, incidentLight.direction ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( G * D );
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
vec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	return specularColor * brdf.x + brdf.y;
}
void BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
	vec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	vec3 FssEss = F * brdf.x + brdf.y;
	float Ess = brdf.x + brdf.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );
	float dotNH = saturate( dot( geometry.normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
float GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {
	return ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );
}
float BlinnExponentToGGXRoughness( const in float blinnExponent ) {
	return sqrt( 2.0 / ( blinnExponent + 2.0 ) );
}
#if defined( USE_SHEEN )
float D_Charlie(float roughness, float NoH) {
	float invAlpha = 1.0 / roughness;
	float cos2h = NoH * NoH;
	float sin2h = max(1.0 - cos2h, 0.0078125);	return (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);
}
float V_Neubelt(float NoV, float NoL) {
	return saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));
}
vec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {
	vec3 N = geometry.normal;
	vec3 V = geometry.viewDir;
	vec3 H = normalize( V + L );
	float dotNH = saturate( dot( N, H ) );
	return specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );
}
#endif`,Tl=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,El=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,Al=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ll=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cl=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rl=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pl=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dl=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Fl=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Il=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement(a) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract(sin(sn) * c);
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
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
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	float distance = dot( planeNormal, point - pointOnPlane );
	return - distance * planeNormal + point;
}
float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return sign( dot( point - pointOnPlane, planeNormal ) );
}
vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Bl=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_maxMipLevel 8.0
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_maxTileSize 256.0
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
		float texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );
		vec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );
		vec2 f = fract( uv );
		uv += 0.5 - f;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		if ( mipInt < cubeUV_maxMipLevel ) {
			uv.y += 2.0 * cubeUV_maxTileSize;
		}
		uv.y += filterInt * 2.0 * cubeUV_minTileSize;
		uv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );
		uv *= texelSize;
		vec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x += texelSize;
		vec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.y += texelSize;
		vec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x -= texelSize;
		vec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		vec3 tm = mix( tl, tr, f.x );
		vec3 bm = mix( bl, br, f.x );
		return mix( tm, bm, f.y );
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );
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
#endif`,Nl=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,zl=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gl=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Ul=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	emissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ol=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hl="gl_FragColor = linearToOutputTexel( gl_FragColor );",kl=`
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
}
vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
}
vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 RGBEToLinear( in vec4 value ) {
	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}
vec4 LinearToRGBE( in vec4 value ) {
	float maxComponent = max( max( value.r, value.g ), value.b );
	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
}
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * value.a * maxRange, 1.0 );
}
vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
	M = ceil( M * 255.0 ) / 255.0;
	return vec4( value.rgb / ( M * maxRange ), M );
}
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}
vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float D = max( maxRange / maxRGB, 1.0 );
	D = clamp( floor( D ) / 255.0, 0.0, 1.0 );
	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}
const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
vec4 LinearToLogLuv( in vec4 value ) {
	vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;
	Xp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );
	vec4 vResult;
	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
	vResult.w = fract( Le );
	vResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;
	return vResult;
}
const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
vec4 LogLuvToLinear( in vec4 value ) {
	float Le = value.z * 255.0 + value.w;
	vec3 Xp_Y_XYZp;
	Xp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );
	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
	vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;
	return vec4( max( vRGB, 0.0 ), 1.0 );
}`,Vl=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifndef ENVMAP_TYPE_CUBE_UV
		envColor = envMapTexelToLinear( envColor );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Wl=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform int maxMipLevel;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ql=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Xl=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yl=`#ifdef USE_ENVMAP
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
#endif`,Zl=`#ifdef USE_FOG
	fogDepth = - mvPosition.z;
#endif`,jl=`#ifdef USE_FOG
	varying float fogDepth;
#endif`,Jl=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ql=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float fogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$l=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return texture2D( gradientMap, coord ).rgb;
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,Kl=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel= texture2D( lightMap, vUv2 );
	reflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
#endif`,ec=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tc=`vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );
		#endif
	}
	#pragma unroll_loop_end
#endif`,nc=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
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
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {
	vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	return irradiance;
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		directLight.color = directionalLight.color;
		directLight.direction = directionalLight.direction;
		directLight.visible = true;
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
	void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = pointLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		directLight.color = pointLight.color;
		directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );
		directLight.visible = ( directLight.color != vec3( 0.0 ) );
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
	void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = spotLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		float angleCos = dot( directLight.direction, spotLight.direction );
		if ( angleCos > spotLight.coneCos ) {
			float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );
			directLight.color = spotLight.color;
			directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );
			directLight.visible = true;
		} else {
			directLight.color = vec3( 0.0 );
			directLight.visible = false;
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
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {
		float dotNL = dot( geometry.normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			irradiance *= PI;
		#endif
		return irradiance;
	}
#endif`,ic=`#if defined( USE_ENVMAP )
	#ifdef ENVMAP_MODE_REFRACTION
		uniform float refractionRatio;
	#endif
	vec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {
		vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );
			#else
				vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
		#else
			vec4 envMapColor = vec4( 0.0 );
		#endif
		return PI * envMapColor.rgb * envMapIntensity;
	}
	float getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {
		float maxMIPLevelScalar = float( maxMIPLevel );
		float sigma = PI * roughness * roughness / ( 1.0 + roughness );
		float desiredMIPLevel = maxMIPLevelScalar + log2( sigma );
		return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );
	}
	vec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( -viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
		#else
			vec3 reflectVec = refract( -viewDir, normal, refractionRatio );
		#endif
		reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
		float specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );
			#else
				vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
		#endif
		return envMapColor.rgb * envMapIntensity;
	}
#endif`,rc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sc=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,ac=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,oc=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,lc=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;
material.specularRoughness = min( material.specularRoughness, 1.0 );
#ifdef REFLECTIVITY
	material.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );
#endif
#ifdef CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheen;
#endif`,cc=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float specularRoughness;
	vec3 specularColor;
#ifdef CLEARCOAT
	float clearcoat;
	float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	vec3 sheenColor;
#endif
};
#define MAXIMUM_SPECULAR_COEFFICIENT 0.16
#define DEFAULT_SPECULAR_COEFFICIENT 0.04
float clearcoatDHRApprox( const in float roughness, const in float dotNL ) {
	return DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.specularRoughness;
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
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	#ifdef CLEARCOAT
		float ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = ccDotNL * directLight.color;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			ccIrradiance *= PI;
		#endif
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
		reflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
	#else
		float clearcoatDHR = 0.0;
	#endif
	#ifdef USE_SHEEN
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(
			material.specularRoughness,
			directLight.direction,
			geometry,
			material.sheenColor
		);
	#else
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);
	#endif
	reflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef CLEARCOAT
		float ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		reflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
		float ccDotNL = ccDotNV;
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
	#else
		float clearcoatDHR = 0.0;
	#endif
	float clearcoatInv = 1.0 - clearcoatDHR;
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	BRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );
	vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );
	reflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hc=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
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
		getPointDirectLightIrradiance( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotDirectLightIrradiance( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
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
		getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,uc=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			lightMapIrradiance *= PI;
		#endif
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );
	#ifdef CLEARCOAT
		clearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );
	#endif
#endif`,dc=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,fc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mc=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,gc=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,vc=`#ifdef USE_MAP
	vec4 texelColor = texture2D( map, vUv );
	texelColor = mapTexelToLinear( texelColor );
	diffuseColor *= texelColor;
#endif`,xc=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_c=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	vec4 mapTexel = texture2D( map, uv );
	diffuseColor *= mapTexelToLinear( mapTexel );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,yc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mc=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wc=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bc=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
	objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
	objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
	objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
#endif`,Sc=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifndef USE_MORPHNORMALS
		uniform float morphTargetInfluences[ 8 ];
	#else
		uniform float morphTargetInfluences[ 4 ];
	#endif
#endif`,Tc=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	transformed += morphTarget0 * morphTargetInfluences[ 0 ];
	transformed += morphTarget1 * morphTargetInfluences[ 1 ];
	transformed += morphTarget2 * morphTargetInfluences[ 2 ];
	transformed += morphTarget3 * morphTargetInfluences[ 3 ];
	#ifndef USE_MORPHNORMALS
		transformed += morphTarget4 * morphTargetInfluences[ 4 ];
		transformed += morphTarget5 * morphTargetInfluences[ 5 ];
		transformed += morphTarget6 * morphTargetInfluences[ 6 ];
		transformed += morphTarget7 * morphTargetInfluences[ 7 ];
	#endif
#endif`,Ec=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,Ac=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( -vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lc=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,Cc=`#ifdef CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Rc=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,Pc=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,Dc=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return (( near + viewZ ) * far ) / (( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,Fc=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ic=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bc=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nc=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zc=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gc=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Uc=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
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
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
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
		return shadow;
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
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
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Oc=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Hc=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
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
#endif`,kc=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Vc=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wc=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	#ifdef BONE_TEXTURE
		uniform highp sampler2D boneTexture;
		uniform int boneTextureSize;
		mat4 getBoneMatrix( const in float i ) {
			float j = i * 4.0;
			float x = mod( j, float( boneTextureSize ) );
			float y = floor( j / float( boneTextureSize ) );
			float dx = 1.0 / float( boneTextureSize );
			float dy = 1.0 / float( boneTextureSize );
			y = dy * ( y + 0.5 );
			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
			mat4 bone = mat4( v1, v2, v3, v4 );
			return bone;
		}
	#else
		uniform mat4 boneMatrices[ MAX_BONES ];
		mat4 getBoneMatrix( const in float i ) {
			mat4 bone = boneMatrices[ int(i) ];
			return bone;
		}
	#endif
#endif`,qc=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xc=`#ifdef USE_SKINNING
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
#endif`,Yc=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zc=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jc=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jc=`#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qc=`#ifdef USE_TRANSMISSIONMAP
	totalTransmission *= texture2D( transmissionMap, vUv ).r;
#endif`,$c=`#ifdef USE_TRANSMISSIONMAP
	uniform sampler2D transmissionMap;
#endif`,Kc=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,eh=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,th=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,nh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,ih=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,rh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,sh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ah=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,oh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lh=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,ch=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hh=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,uh=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
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
}`,dh=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fh=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
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
}`,ph=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	vec4 texColor = texture2D( tEquirect, sampleUV );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,mh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gh=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vh=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xh=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
	
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_h=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <skinbase_vertex>
	#ifdef USE_ENVMAP
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,yh=`uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mh=`#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wh=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
		matcapColor = matcapTexelToLinear( matcapColor );
	#else
		vec4 matcapColor = vec4( 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bh=`#define MATCAP
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#ifndef FLAT_SHADED
		vNormal = normalize( transformedNormal );
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Sh=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Th=`#define TOON
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
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
}`,Eh=`#define PHONG
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
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
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
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ah=`#define PHONG
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
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
}`,Lh=`#define STANDARD
#ifdef PHYSICAL
	#define REFLECTIVITY
	#define CLEARCOAT
	#define TRANSMISSION
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef TRANSMISSION
	uniform float transmission;
#endif
#ifdef REFLECTIVITY
	uniform float reflectivity;
#endif
#ifdef CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#ifdef TRANSMISSION
		float totalTransmission = transmission;
	#endif
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <transmissionmap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#ifdef TRANSMISSION
		diffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );
	#endif
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ch=`#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
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
}`,Rh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <packing>
#include <uv_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
}`,Ph=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Dh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fh=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
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
}`,Ih=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Bh=`#include <common>
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <begin_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,zh=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`;const Te={alphamap_fragment:vl,alphamap_pars_fragment:xl,alphatest_fragment:_l,aomap_fragment:yl,aomap_pars_fragment:Ml,begin_vertex:wl,beginnormal_vertex:bl,bsdfs:Sl,bumpmap_pars_fragment:Tl,clipping_planes_fragment:El,clipping_planes_pars_fragment:Al,clipping_planes_pars_vertex:Ll,clipping_planes_vertex:Cl,color_fragment:Rl,color_pars_fragment:Pl,color_pars_vertex:Dl,color_vertex:Fl,common:Il,cube_uv_reflection_fragment:Bl,defaultnormal_vertex:Nl,displacementmap_pars_vertex:zl,displacementmap_vertex:Gl,emissivemap_fragment:Ul,emissivemap_pars_fragment:Ol,encodings_fragment:Hl,encodings_pars_fragment:kl,envmap_fragment:Vl,envmap_common_pars_fragment:Wl,envmap_pars_fragment:ql,envmap_pars_vertex:Xl,envmap_physical_pars_fragment:ic,envmap_vertex:Yl,fog_vertex:Zl,fog_pars_vertex:jl,fog_fragment:Jl,fog_pars_fragment:Ql,gradientmap_pars_fragment:$l,lightmap_fragment:Kl,lightmap_pars_fragment:ec,lights_lambert_vertex:tc,lights_pars_begin:nc,lights_toon_fragment:rc,lights_toon_pars_fragment:sc,lights_phong_fragment:ac,lights_phong_pars_fragment:oc,lights_physical_fragment:lc,lights_physical_pars_fragment:cc,lights_fragment_begin:hc,lights_fragment_maps:uc,lights_fragment_end:dc,logdepthbuf_fragment:fc,logdepthbuf_pars_fragment:pc,logdepthbuf_pars_vertex:mc,logdepthbuf_vertex:gc,map_fragment:vc,map_pars_fragment:xc,map_particle_fragment:_c,map_particle_pars_fragment:yc,metalnessmap_fragment:Mc,metalnessmap_pars_fragment:wc,morphnormal_vertex:bc,morphtarget_pars_vertex:Sc,morphtarget_vertex:Tc,normal_fragment_begin:Ec,normal_fragment_maps:Ac,normalmap_pars_fragment:Lc,clearcoat_normal_fragment_begin:Cc,clearcoat_normal_fragment_maps:Rc,clearcoat_pars_fragment:Pc,packing:Dc,premultiplied_alpha_fragment:Fc,project_vertex:Ic,dithering_fragment:Bc,dithering_pars_fragment:Nc,roughnessmap_fragment:zc,roughnessmap_pars_fragment:Gc,shadowmap_pars_fragment:Uc,shadowmap_pars_vertex:Oc,shadowmap_vertex:Hc,shadowmask_pars_fragment:kc,skinbase_vertex:Vc,skinning_pars_vertex:Wc,skinning_vertex:qc,skinnormal_vertex:Xc,specularmap_fragment:Yc,specularmap_pars_fragment:Zc,tonemapping_fragment:jc,tonemapping_pars_fragment:Jc,transmissionmap_fragment:Qc,transmissionmap_pars_fragment:$c,uv_pars_fragment:Kc,uv_pars_vertex:eh,uv_vertex:th,uv2_pars_fragment:nh,uv2_pars_vertex:ih,uv2_vertex:rh,worldpos_vertex:sh,background_frag:ah,background_vert:oh,cube_frag:lh,cube_vert:ch,depth_frag:hh,depth_vert:uh,distanceRGBA_frag:dh,distanceRGBA_vert:fh,equirect_frag:ph,equirect_vert:mh,linedashed_frag:gh,linedashed_vert:vh,meshbasic_frag:xh,meshbasic_vert:_h,meshlambert_frag:yh,meshlambert_vert:Mh,meshmatcap_frag:wh,meshmatcap_vert:bh,meshtoon_frag:Sh,meshtoon_vert:Th,meshphong_frag:Eh,meshphong_vert:Ah,meshphysical_frag:Lh,meshphysical_vert:Ch,normal_frag:Rh,normal_vert:Ph,points_frag:Dh,points_vert:Fh,shadow_frag:Ih,shadow_vert:Bh,sprite_frag:Nh,sprite_vert:zh},K={common:{diffuse:{value:new le(15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new st},uv2Transform:{value:new st},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98},maxMipLevel:{value:0}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new q(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new le(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},uvTransform:{value:new st}},sprite:{diffuse:{value:new le(15658734)},opacity:{value:1},center:{value:new q(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},uvTransform:{value:new st}}},Pt={basic:{uniforms:lt([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.fog]),vertexShader:Te.meshbasic_vert,fragmentShader:Te.meshbasic_frag},lambert:{uniforms:lt([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.fog,K.lights,{emissive:{value:new le(0)}}]),vertexShader:Te.meshlambert_vert,fragmentShader:Te.meshlambert_frag},phong:{uniforms:lt([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:new le(0)},specular:{value:new le(1118481)},shininess:{value:30}}]),vertexShader:Te.meshphong_vert,fragmentShader:Te.meshphong_frag},standard:{uniforms:lt([K.common,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.roughnessmap,K.metalnessmap,K.fog,K.lights,{emissive:{value:new le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Te.meshphysical_vert,fragmentShader:Te.meshphysical_frag},toon:{uniforms:lt([K.common,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.gradientmap,K.fog,K.lights,{emissive:{value:new le(0)}}]),vertexShader:Te.meshtoon_vert,fragmentShader:Te.meshtoon_frag},matcap:{uniforms:lt([K.common,K.bumpmap,K.normalmap,K.displacementmap,K.fog,{matcap:{value:null}}]),vertexShader:Te.meshmatcap_vert,fragmentShader:Te.meshmatcap_frag},points:{uniforms:lt([K.points,K.fog]),vertexShader:Te.points_vert,fragmentShader:Te.points_frag},dashed:{uniforms:lt([K.common,K.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Te.linedashed_vert,fragmentShader:Te.linedashed_frag},depth:{uniforms:lt([K.common,K.displacementmap]),vertexShader:Te.depth_vert,fragmentShader:Te.depth_frag},normal:{uniforms:lt([K.common,K.bumpmap,K.normalmap,K.displacementmap,{opacity:{value:1}}]),vertexShader:Te.normal_vert,fragmentShader:Te.normal_frag},sprite:{uniforms:lt([K.sprite,K.fog]),vertexShader:Te.sprite_vert,fragmentShader:Te.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null}},vertexShader:Te.background_vert,fragmentShader:Te.background_frag},cube:{uniforms:lt([K.envmap,{opacity:{value:1}}]),vertexShader:Te.cube_vert,fragmentShader:Te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Te.equirect_vert,fragmentShader:Te.equirect_frag},distanceRGBA:{uniforms:lt([K.common,K.displacementmap,{referencePosition:{value:new M},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Te.distanceRGBA_vert,fragmentShader:Te.distanceRGBA_frag},shadow:{uniforms:lt([K.lights,K.fog,{color:{value:new le(0)},opacity:{value:1}}]),vertexShader:Te.shadow_vert,fragmentShader:Te.shadow_frag}};Pt.physical={uniforms:lt([Pt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new q(1,1)},clearcoatNormalMap:{value:null},sheen:{value:new le(0)},transmission:{value:0},transmissionMap:{value:null}}]),vertexShader:Te.meshphysical_vert,fragmentShader:Te.meshphysical_frag};function Gh(s,e,t,n,i){const r=new le(0);let a=0,o,l,c=null,h=0,d=null;function u(p,v,x,m){let g=v.isScene===!0?v.background:null;g&&g.isTexture&&(g=e.get(g));const T=s.xr,S=T.getSession&&T.getSession();S&&S.environmentBlendMode==="additive"&&(g=null),g===null?f(r,a):g&&g.isColor&&(f(g,1),m=!0),(s.autoClear||m)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),g&&(g.isCubeTexture||g.mapping===306)?(l===void 0&&(l=new oe(new Ge(1,1,1),new vt({name:"BackgroundCubeMaterial",uniforms:On(Pt.cube.uniforms),vertexShader:Pt.cube.vertexShader,fragmentShader:Pt.cube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,_,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=g,l.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g._needsFlipEnvMap?-1:1,(c!==g||h!==g.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,c=g,h=g.version,d=s.toneMapping),p.unshift(l,l.geometry,l.material,0,0,null)):g&&g.isTexture&&(o===void 0&&(o=new oe(new un(2,2),new vt({name:"BackgroundMaterial",uniforms:On(Pt.background.uniforms),vertexShader:Pt.background.vertexShader,fragmentShader:Pt.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=g,g.matrixAutoUpdate===!0&&g.updateMatrix(),o.material.uniforms.uvTransform.value.copy(g.matrix),(c!==g||h!==g.version||d!==s.toneMapping)&&(o.material.needsUpdate=!0,c=g,h=g.version,d=s.toneMapping),p.unshift(o,o.geometry,o.material,0,0,null))}function f(p,v){t.buffers.color.setClear(p.r,p.g,p.b,v,i)}return{getClearColor:function(){return r},setClearColor:function(p,v=1){r.set(p),a=v,f(r,a)},getClearAlpha:function(){return a},setClearAlpha:function(p){a=p,f(r,a)},render:u}}function Uh(s,e,t,n){const i=s.getParameter(34921),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=v(null);let c=l;function h(L,P,R,A,V){let j=!1;if(a){const Y=p(A,R,P);c!==Y&&(c=Y,u(c.object)),j=x(A,V),j&&m(A,V)}else{const Y=P.wireframe===!0;(c.geometry!==A.id||c.program!==R.id||c.wireframe!==Y)&&(c.geometry=A.id,c.program=R.id,c.wireframe=Y,j=!0)}L.isInstancedMesh===!0&&(j=!0),V!==null&&t.update(V,34963),j&&(D(L,P,R,A),V!==null&&s.bindBuffer(34963,t.get(V).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function u(L){return n.isWebGL2?s.bindVertexArray(L):r.bindVertexArrayOES(L)}function f(L){return n.isWebGL2?s.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function p(L,P,R){const A=R.wireframe===!0;let V=o[L.id];V===void 0&&(V={},o[L.id]=V);let j=V[P.id];j===void 0&&(j={},V[P.id]=j);let Y=j[A];return Y===void 0&&(Y=v(d()),j[A]=Y),Y}function v(L){const P=[],R=[],A=[];for(let V=0;V<i;V++)P[V]=0,R[V]=0,A[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:R,attributeDivisors:A,object:L,attributes:{},index:null}}function x(L,P){const R=c.attributes,A=L.attributes;let V=0;for(const j in A){const Y=R[j],se=A[j];if(Y===void 0||Y.attribute!==se||Y.data!==se.data)return!0;V++}return c.attributesNum!==V||c.index!==P}function m(L,P){const R={},A=L.attributes;let V=0;for(const j in A){const Y=A[j],se={};se.attribute=Y,Y.data&&(se.data=Y.data),R[j]=se,V++}c.attributes=R,c.attributesNum=V,c.index=P}function g(){const L=c.newAttributes;for(let P=0,R=L.length;P<R;P++)L[P]=0}function T(L){S(L,0)}function S(L,P){const R=c.newAttributes,A=c.enabledAttributes,V=c.attributeDivisors;R[L]=1,A[L]===0&&(s.enableVertexAttribArray(L),A[L]=1),V[L]!==P&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,P),V[L]=P)}function E(){const L=c.newAttributes,P=c.enabledAttributes;for(let R=0,A=P.length;R<A;R++)P[R]!==L[R]&&(s.disableVertexAttribArray(R),P[R]=0)}function _(L,P,R,A,V,j){n.isWebGL2===!0&&(R===5124||R===5125)?s.vertexAttribIPointer(L,P,R,V,j):s.vertexAttribPointer(L,P,R,A,V,j)}function D(L,P,R,A){if(n.isWebGL2===!1&&(L.isInstancedMesh||A.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const V=A.attributes,j=R.getAttributes(),Y=P.defaultAttributeValues;for(const se in j){const ne=j[se];if(ne>=0){const fe=V[se];if(fe!==void 0){const me=fe.normalized,O=fe.itemSize,Be=t.get(fe);if(Be===void 0)continue;const Ae=Be.buffer,ye=Be.type,pe=Be.bytesPerElement;if(fe.isInterleavedBufferAttribute){const Ce=fe.data,Se=Ce.stride,Ee=fe.offset;Ce&&Ce.isInstancedInterleavedBuffer?(S(ne,Ce.meshPerAttribute),A._maxInstanceCount===void 0&&(A._maxInstanceCount=Ce.meshPerAttribute*Ce.count)):T(ne),s.bindBuffer(34962,Ae),_(ne,O,ye,me,Se*pe,Ee*pe)}else fe.isInstancedBufferAttribute?(S(ne,fe.meshPerAttribute),A._maxInstanceCount===void 0&&(A._maxInstanceCount=fe.meshPerAttribute*fe.count)):T(ne),s.bindBuffer(34962,Ae),_(ne,O,ye,me,0,0)}else if(se==="instanceMatrix"){const me=t.get(L.instanceMatrix);if(me===void 0)continue;const O=me.buffer,Be=me.type;S(ne+0,1),S(ne+1,1),S(ne+2,1),S(ne+3,1),s.bindBuffer(34962,O),s.vertexAttribPointer(ne+0,4,Be,!1,64,0),s.vertexAttribPointer(ne+1,4,Be,!1,64,16),s.vertexAttribPointer(ne+2,4,Be,!1,64,32),s.vertexAttribPointer(ne+3,4,Be,!1,64,48)}else if(se==="instanceColor"){const me=t.get(L.instanceColor);if(me===void 0)continue;const O=me.buffer,Be=me.type;S(ne,1),s.bindBuffer(34962,O),s.vertexAttribPointer(ne,3,Be,!1,12,0)}else if(Y!==void 0){const me=Y[se];if(me!==void 0)switch(me.length){case 2:s.vertexAttrib2fv(ne,me);break;case 3:s.vertexAttrib3fv(ne,me);break;case 4:s.vertexAttrib4fv(ne,me);break;default:s.vertexAttrib1fv(ne,me)}}}}E()}function I(){W();for(const L in o){const P=o[L];for(const R in P){const A=P[R];for(const V in A)f(A[V].object),delete A[V];delete P[R]}delete o[L]}}function B(L){if(o[L.id]===void 0)return;const P=o[L.id];for(const R in P){const A=P[R];for(const V in A)f(A[V].object),delete A[V];delete P[R]}delete o[L.id]}function G(L){for(const P in o){const R=o[P];if(R[L.id]===void 0)continue;const A=R[L.id];for(const V in A)f(A[V].object),delete A[V];delete R[L.id]}}function W(){N(),c!==l&&(c=l,u(c.object))}function N(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:W,resetDefaultState:N,dispose:I,releaseStatesOfGeometry:B,releaseStatesOfProgram:G,initAttributes:g,enableAttribute:T,disableUnusedAttributes:E}}function Oh(s,e,t,n){const i=n.isWebGL2;let r;function a(c){r=c}function o(c,h){s.drawArrays(r,c,h),t.update(h,r,1)}function l(c,h,d){if(d===0)return;let u,f;if(i)u=s,f="drawArraysInstanced";else if(u=e.get("ANGLE_instanced_arrays"),f="drawArraysInstancedANGLE",u===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}u[f](r,c,h,d),t.update(h,r,d)}this.setMode=a,this.render=o,this.renderInstances=l}function Hh(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const _=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(_){if(_==="highp"){if(s.getShaderPrecisionFormat(35633,36338).precision>0&&s.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";_="mediump"}return _==="mediump"&&s.getShaderPrecisionFormat(35633,36337).precision>0&&s.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&s instanceof WebGL2ComputeRenderingContext;let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=t.logarithmicDepthBuffer===!0,h=s.getParameter(34930),d=s.getParameter(35660),u=s.getParameter(3379),f=s.getParameter(34076),p=s.getParameter(34921),v=s.getParameter(36347),x=s.getParameter(36348),m=s.getParameter(36349),g=d>0,T=a||e.has("OES_texture_float"),S=g&&T,E=a?s.getParameter(36183):0;return{isWebGL2:a,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:c,maxTextures:h,maxVertexTextures:d,maxTextureSize:u,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:m,vertexTextures:g,floatFragmentTextures:T,floatVertexTextures:S,maxSamples:E}}function kh(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Rt,o=new st,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u,f){const p=d.length!==0||u||n!==0||i;return i=u,t=h(d,f,0),n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1,c()},this.setState=function(d,u,f){const p=d.clippingPlanes,v=d.clipIntersection,x=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||r&&!x)r?h(null):c();else{const g=r?0:n,T=g*4;let S=m.clippingState||null;l.value=S,S=h(p,u,T,f);for(let E=0;E!==T;++E)S[E]=t[E];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,p){const v=d!==null?d.length:0;let x=null;if(v!==0){if(x=l.value,p!==!0||x===null){const m=f+v*4,g=u.matrixWorldInverse;o.getNormalMatrix(g),(x===null||x.length<m)&&(x=new Float32Array(m));for(let T=0,S=f;T!==v;++T,S+=4)a.copy(d[T]).applyMatrix4(g,o),a.normal.toArray(x,S),x[S+3]=a.constant}l.value=x,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,x}}function Vh(s){let e=new WeakMap;function t(a,o){return o===303?a.mapping=301:o===304&&(a.mapping=302),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===303||o===304)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=s.getRenderTarget(),h=new Ha(l.height/2);return h.fromEquirectangularTexture(s,a),e.set(a,h),s.setRenderTarget(c),a.addEventListener("dispose",i),t(h.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}function Wh(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function qh(s,e,t,n){const i={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete i[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)e.update(u[p],34962);const f=d.morphAttributes;for(const p in f){const v=f[p];for(let x=0,m=v.length;x<m;x++)e.update(v[x],34962)}}function c(d){const u=[],f=d.index,p=d.attributes.position;let v=0;if(f!==null){const g=f.array;v=f.version;for(let T=0,S=g.length;T<S;T+=3){const E=g[T+0],_=g[T+1],D=g[T+2];u.push(E,_,_,D,D,E)}}else{const g=p.array;v=p.version;for(let T=0,S=g.length/3-1;T<S;T+=3){const E=T+0,_=T+1,D=T+2;u.push(E,_,_,D,D,E)}}const x=new(Oa(u)>65535?Ua:Ga)(u,1);x.version=v;const m=r.get(d);m&&e.remove(m),r.set(d,x)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Xh(s,e,t,n){const i=n.isWebGL2;let r;function a(u){r=u}let o,l;function c(u){o=u.type,l=u.bytesPerElement}function h(u,f){s.drawElements(r,f,o,u*l),t.update(f,r,1)}function d(u,f,p){if(p===0)return;let v,x;if(i)v=s,x="drawElementsInstanced";else if(v=e.get("ANGLE_instanced_arrays"),x="drawElementsInstancedANGLE",v===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}v[x](r,f,o,u*l,p),t.update(f,r,p)}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d}function Yh(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case 4:t.triangles+=o*(r/3);break;case 1:t.lines+=o*(r/2);break;case 3:t.lines+=o*(r-1);break;case 2:t.lines+=o*r;break;case 0:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Zh(s,e){return s[0]-e[0]}function jh(s,e){return Math.abs(e[1])-Math.abs(s[1])}function Jh(s){const e={},t=new Float32Array(8),n=[];for(let r=0;r<8;r++)n[r]=[r,0];function i(r,a,o,l){const c=r.morphTargetInfluences,h=c===void 0?0:c.length;let d=e[a.id];if(d===void 0){d=[];for(let x=0;x<h;x++)d[x]=[x,0];e[a.id]=d}for(let x=0;x<h;x++){const m=d[x];m[0]=x,m[1]=c[x]}d.sort(jh);for(let x=0;x<8;x++)x<h&&d[x][1]?(n[x][0]=d[x][0],n[x][1]=d[x][1]):(n[x][0]=Number.MAX_SAFE_INTEGER,n[x][1]=0);n.sort(Zh);const u=o.morphTargets&&a.morphAttributes.position,f=o.morphNormals&&a.morphAttributes.normal;let p=0;for(let x=0;x<8;x++){const m=n[x],g=m[0],T=m[1];g!==Number.MAX_SAFE_INTEGER&&T?(u&&a.getAttribute("morphTarget"+x)!==u[g]&&a.setAttribute("morphTarget"+x,u[g]),f&&a.getAttribute("morphNormal"+x)!==f[g]&&a.setAttribute("morphNormal"+x,f[g]),t[x]=T,p+=T):(u&&a.hasAttribute("morphTarget"+x)===!0&&a.deleteAttribute("morphTarget"+x),f&&a.hasAttribute("morphNormal"+x)===!0&&a.deleteAttribute("morphNormal"+x),t[x]=0)}const v=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",t)}return{update:i}}function Qh(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);return i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),d}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class Wa extends ot{constructor(e=null,t=1,n=1,i=1){super(null),this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}Wa.prototype.isDataTexture2DArray=!0;class qa extends ot{constructor(e=null,t=1,n=1,i=1){super(null),this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}qa.prototype.isDataTexture3D=!0;const Xa=new ot,$h=new Wa,Kh=new qa,Ya=new sr,Gs=[],Us=[],Os=new Float32Array(16),Hs=new Float32Array(9),ks=new Float32Array(4);function Xn(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Gs[i];if(r===void 0&&(r=new Float32Array(i),Gs[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function ut(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function ct(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Za(s,e){let t=Us[e];t===void 0&&(t=new Int32Array(e),Us[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function eu(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function tu(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;s.uniform2fv(this.addr,e),ct(t,e)}}function nu(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ut(t,e))return;s.uniform3fv(this.addr,e),ct(t,e)}}function iu(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;s.uniform4fv(this.addr,e),ct(t,e)}}function ru(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ut(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),ct(t,e)}else{if(ut(t,n))return;ks.set(n),s.uniformMatrix2fv(this.addr,!1,ks),ct(t,n)}}function su(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ut(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),ct(t,e)}else{if(ut(t,n))return;Hs.set(n),s.uniformMatrix3fv(this.addr,!1,Hs),ct(t,n)}}function au(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(ut(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),ct(t,e)}else{if(ut(t,n))return;Os.set(n),s.uniformMatrix4fv(this.addr,!1,Os),ct(t,n)}}function ou(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function lu(s,e){const t=this.cache;ut(t,e)||(s.uniform2iv(this.addr,e),ct(t,e))}function cu(s,e){const t=this.cache;ut(t,e)||(s.uniform3iv(this.addr,e),ct(t,e))}function hu(s,e){const t=this.cache;ut(t,e)||(s.uniform4iv(this.addr,e),ct(t,e))}function uu(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function du(s,e){const t=this.cache;ut(t,e)||(s.uniform2uiv(this.addr,e),ct(t,e))}function fu(s,e){const t=this.cache;ut(t,e)||(s.uniform3uiv(this.addr,e),ct(t,e))}function pu(s,e){const t=this.cache;ut(t,e)||(s.uniform4uiv(this.addr,e),ct(t,e))}function mu(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.safeSetTexture2D(e||Xa,i)}function gu(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Kh,i)}function vu(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.safeSetTextureCube(e||Ya,i)}function xu(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||$h,i)}function _u(s){switch(s){case 5126:return eu;case 35664:return tu;case 35665:return nu;case 35666:return iu;case 35674:return ru;case 35675:return su;case 35676:return au;case 5124:case 35670:return ou;case 35667:case 35671:return lu;case 35668:case 35672:return cu;case 35669:case 35673:return hu;case 5125:return uu;case 36294:return du;case 36295:return fu;case 36296:return pu;case 35678:case 36198:case 36298:case 36306:case 35682:return mu;case 35679:case 36299:case 36307:return gu;case 35680:case 36300:case 36308:case 36293:return vu;case 36289:case 36303:case 36311:case 36292:return xu}}function yu(s,e){s.uniform1fv(this.addr,e)}function Mu(s,e){const t=Xn(e,this.size,2);s.uniform2fv(this.addr,t)}function wu(s,e){const t=Xn(e,this.size,3);s.uniform3fv(this.addr,t)}function bu(s,e){const t=Xn(e,this.size,4);s.uniform4fv(this.addr,t)}function Su(s,e){const t=Xn(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Tu(s,e){const t=Xn(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Eu(s,e){const t=Xn(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Au(s,e){s.uniform1iv(this.addr,e)}function Lu(s,e){s.uniform2iv(this.addr,e)}function Cu(s,e){s.uniform3iv(this.addr,e)}function Ru(s,e){s.uniform4iv(this.addr,e)}function Pu(s,e){s.uniform1uiv(this.addr,e)}function Du(s,e){s.uniform2uiv(this.addr,e)}function Fu(s,e){s.uniform3uiv(this.addr,e)}function Iu(s,e){s.uniform4uiv(this.addr,e)}function Bu(s,e,t){const n=e.length,i=Za(t,n);s.uniform1iv(this.addr,i);for(let r=0;r!==n;++r)t.safeSetTexture2D(e[r]||Xa,i[r])}function Nu(s,e,t){const n=e.length,i=Za(t,n);s.uniform1iv(this.addr,i);for(let r=0;r!==n;++r)t.safeSetTextureCube(e[r]||Ya,i[r])}function zu(s){switch(s){case 5126:return yu;case 35664:return Mu;case 35665:return wu;case 35666:return bu;case 35674:return Su;case 35675:return Tu;case 35676:return Eu;case 5124:case 35670:return Au;case 35667:case 35671:return Lu;case 35668:case 35672:return Cu;case 35669:case 35673:return Ru;case 5125:return Pu;case 36294:return Du;case 36295:return Fu;case 36296:return Iu;case 35678:case 36198:case 36298:case 36306:case 35682:return Bu;case 35680:case 36300:case 36308:case 36293:return Nu}}function Gu(s,e,t){this.id=s,this.addr=t,this.cache=[],this.setValue=_u(e.type)}function ja(s,e,t){this.id=s,this.addr=t,this.cache=[],this.size=e.size,this.setValue=zu(e.type)}ja.prototype.updateCache=function(s){const e=this.cache;s instanceof Float32Array&&e.length!==s.length&&(this.cache=new Float32Array(s.length)),ct(e,s)};function Ja(s){this.id=s,this.seq=[],this.map={}}Ja.prototype.setValue=function(s,e,t){const n=this.seq;for(let i=0,r=n.length;i!==r;++i){const a=n[i];a.setValue(s,e[a.id],t)}};const Gr=/(\w+)(\])?(\[|\.)?/g;function Vs(s,e){s.seq.push(e),s.map[e.id]=e}function Uu(s,e,t){const n=s.name,i=n.length;for(Gr.lastIndex=0;;){const r=Gr.exec(n),a=Gr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Vs(t,c===void 0?new Gu(o,s,e):new ja(o,s,e));break}else{let d=t.map[o];d===void 0&&(d=new Ja(o),Vs(t,d)),t=d}}}function Jt(s,e){this.seq=[],this.map={};const t=s.getProgramParameter(e,35718);for(let n=0;n<t;++n){const i=s.getActiveUniform(e,n),r=s.getUniformLocation(e,i.name);Uu(i,r,this)}}Jt.prototype.setValue=function(s,e,t,n){const i=this.map[e];i!==void 0&&i.setValue(s,t,n)};Jt.prototype.setOptional=function(s,e,t){const n=e[t];n!==void 0&&this.setValue(s,t,n)};Jt.upload=function(s,e,t,n){for(let i=0,r=e.length;i!==r;++i){const a=e[i],o=t[a.id];o.needsUpdate!==!1&&a.setValue(s,o.value,n)}};Jt.seqWithValue=function(s,e){const t=[];for(let n=0,i=s.length;n!==i;++n){const r=s[n];r.id in e&&t.push(r)}return t};function Ws(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}let Ou=0;function Hu(s){const e=s.split(`
`);for(let t=0;t<e.length;t++)e[t]=t+1+": "+e[t];return e.join(`
`)}function Qa(s){switch(s){case 3e3:return["Linear","( value )"];case 3001:return["sRGB","( value )"];case 3002:return["RGBE","( value )"];case 3004:return["RGBM","( value, 7.0 )"];case 3005:return["RGBM","( value, 16.0 )"];case 3006:return["RGBD","( value, 256.0 )"];case 3007:return["Gamma","( value, float( GAMMA_FACTOR ) )"];case 3003:return["LogLuv","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",s),["Linear","( value )"]}}function qs(s,e,t){const n=s.getShaderParameter(e,35713),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=s.getShaderSource(e);return"THREE.WebGLShader: gl.getShaderInfoLog() "+t+`
`+i+Hu(r)}function Kn(s,e){const t=Qa(e);return"vec4 "+s+"( vec4 value ) { return "+t[0]+"ToLinear"+t[1]+"; }"}function ku(s,e){const t=Qa(e);return"vec4 "+s+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function Vu(s,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="OptimizedCineon";break;case 4:t="ACESFilmic";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Wu(s){return[s.extensionDerivatives||s.envMapCubeUV||s.bumpMap||s.tangentSpaceNormalMap||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ai).join(`
`)}function qu(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Xu(s,e){const t={},n=s.getProgramParameter(e,35721);for(let i=0;i<n;i++){const a=s.getActiveAttrib(e,i).name;t[a]=s.getAttribLocation(e,a)}return t}function ai(s){return s!==""}function Xs(s,e){return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ys(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Yu=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jr(s){return s.replace(Yu,Zu)}function Zu(s,e){const t=Te[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return Jr(t)}const ju=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,Ju=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zs(s){return s.replace(Ju,$a).replace(ju,Qu)}function Qu(s,e,t,n){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),$a(s,e,t,n)}function $a(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function js(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function $u(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function Ku(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:case 307:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ed(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case 302:case 307:e="ENVMAP_MODE_REFRACTION";break}return e}function td(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function nd(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=$u(t),c=Ku(t),h=ed(t),d=td(t),u=s.gammaFactor>0?s.gammaFactor:1,f=t.isWebGL2?"":Wu(t),p=qu(r),v=i.createProgram();let x,m,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=[p].filter(ai).join(`
`),x.length>0&&(x+=`
`),m=[f,p].filter(ai).join(`
`),m.length>0&&(m+=`
`)):(x=[js(t),"#define SHADER_NAME "+t.shaderName,p,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+u,"#define MAX_BONES "+t.maxBones,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.useVertexTexture?"#define BONE_TEXTURE":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ai).join(`
`),m=[f,js(t),"#define SHADER_NAME "+t.shaderName,p,t.alphaTest?"#define ALPHATEST "+t.alphaTest+(t.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+u,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.sheen?"#define USE_SHEEN":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"",(t.extensionShaderTextureLOD||t.envMap)&&t.rendererExtensionShaderTextureLod?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Te.tonemapping_pars_fragment:"",t.toneMapping!==0?Vu("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",Te.encodings_pars_fragment,t.map?Kn("mapTexelToLinear",t.mapEncoding):"",t.matcap?Kn("matcapTexelToLinear",t.matcapEncoding):"",t.envMap?Kn("envMapTexelToLinear",t.envMapEncoding):"",t.emissiveMap?Kn("emissiveMapTexelToLinear",t.emissiveMapEncoding):"",t.lightMap?Kn("lightMapTexelToLinear",t.lightMapEncoding):"",ku("linearToOutputTexel",t.outputEncoding),t.depthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ai).join(`
`)),a=Jr(a),a=Xs(a,t),a=Ys(a,t),o=Jr(o),o=Xs(o,t),o=Ys(o,t),a=Zs(a),o=Zs(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,x=["#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===Es?"":"out highp vec4 pc_fragColor;",t.glslVersion===Es?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const T=g+x+a,S=g+m+o,E=Ws(i,35633,T),_=Ws(i,35632,S);if(i.attachShader(v,E),i.attachShader(v,_),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v),s.debug.checkShaderErrors){const B=i.getProgramInfoLog(v).trim(),G=i.getShaderInfoLog(E).trim(),W=i.getShaderInfoLog(_).trim();let N=!0,L=!0;if(i.getProgramParameter(v,35714)===!1){N=!1;const P=qs(i,E,"vertex"),R=qs(i,_,"fragment");console.error("THREE.WebGLProgram: shader error: ",i.getError(),"35715",i.getProgramParameter(v,35715),"gl.getProgramInfoLog",B,P,R)}else B!==""?console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",B):(G===""||W==="")&&(L=!1);L&&(this.diagnostics={runnable:N,programLog:B,vertexShader:{log:G,prefix:x},fragmentShader:{log:W,prefix:m}})}i.deleteShader(E),i.deleteShader(_);let D;this.getUniforms=function(){return D===void 0&&(D=new Jt(i,v)),D};let I;return this.getAttributes=function(){return I===void 0&&(I=Xu(i,v)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.name=t.shaderName,this.id=Ou++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=_,this}function id(s,e,t,n,i,r){const a=[],o=n.isWebGL2,l=n.logarithmicDepthBuffer,c=n.floatVertexTextures,h=n.maxVertexUniforms,d=n.vertexTextures;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"},p=["precision","isWebGL2","supportsVertexTextures","outputEncoding","instancing","instancingColor","map","mapEncoding","matcap","matcapEncoding","envMap","envMapMode","envMapEncoding","envMapCubeUV","lightMap","lightMapEncoding","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","objectSpaceNormalMap","tangentSpaceNormalMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","vertexAlphas","vertexTangents","vertexUvs","uvsVertexOnly","fog","useFog","fogExp2","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","numDirLightShadows","numPointLightShadows","numSpotLightShadows","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering","sheen","transmissionMap"];function v(_){const I=_.skeleton.bones;if(c)return 1024;{const G=Math.floor((h-20)/4),W=Math.min(G,I.length);return W<I.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+I.length+" bones. This GPU supports "+W+"."),0):W}}function x(_){let D;return _&&_.isTexture?D=_.encoding:_&&_.isWebGLRenderTarget?(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),D=_.texture.encoding):D=3e3,D}function m(_,D,I,B,G){const W=B.fog,N=_.isMeshStandardMaterial?B.environment:null,L=e.get(_.envMap||N),P=f[_.type],R=G.isSkinnedMesh?v(G):0;_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let A,V;if(P){const se=Pt[P];A=se.vertexShader,V=se.fragmentShader}else A=_.vertexShader,V=_.fragmentShader;const j=s.getRenderTarget();return{isWebGL2:o,shaderID:P,shaderName:_.type,vertexShader:A,fragmentShader:V,defines:_.defines,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,instancing:G.isInstancedMesh===!0,instancingColor:G.isInstancedMesh===!0&&G.instanceColor!==null,supportsVertexTextures:d,outputEncoding:j!==null?x(j.texture):s.outputEncoding,map:!!_.map,mapEncoding:x(_.map),matcap:!!_.matcap,matcapEncoding:x(_.matcap),envMap:!!L,envMapMode:L&&L.mapping,envMapEncoding:x(L),envMapCubeUV:!!L&&(L.mapping===306||L.mapping===307),lightMap:!!_.lightMap,lightMapEncoding:x(_.lightMap),aoMap:!!_.aoMap,emissiveMap:!!_.emissiveMap,emissiveMapEncoding:x(_.emissiveMap),bumpMap:!!_.bumpMap,normalMap:!!_.normalMap,objectSpaceNormalMap:_.normalMapType===1,tangentSpaceNormalMap:_.normalMapType===0,clearcoatMap:!!_.clearcoatMap,clearcoatRoughnessMap:!!_.clearcoatRoughnessMap,clearcoatNormalMap:!!_.clearcoatNormalMap,displacementMap:!!_.displacementMap,roughnessMap:!!_.roughnessMap,metalnessMap:!!_.metalnessMap,specularMap:!!_.specularMap,alphaMap:!!_.alphaMap,gradientMap:!!_.gradientMap,sheen:!!_.sheen,transmissionMap:!!_.transmissionMap,combine:_.combine,vertexTangents:_.normalMap&&_.vertexTangents,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&G.geometry&&G.geometry.attributes.color&&G.geometry.attributes.color.itemSize===4,vertexUvs:!!_.map||!!_.bumpMap||!!_.normalMap||!!_.specularMap||!!_.alphaMap||!!_.emissiveMap||!!_.roughnessMap||!!_.metalnessMap||!!_.clearcoatMap||!!_.clearcoatRoughnessMap||!!_.clearcoatNormalMap||!!_.displacementMap||!!_.transmissionMap,uvsVertexOnly:!(_.map||_.bumpMap||_.normalMap||_.specularMap||_.alphaMap||_.emissiveMap||_.roughnessMap||_.metalnessMap||_.clearcoatNormalMap||_.transmissionMap)&&!!_.displacementMap,fog:!!W,useFog:_.fog,fogExp2:W&&W.isFogExp2,flatShading:!!_.flatShading,sizeAttenuation:_.sizeAttenuation,logarithmicDepthBuffer:l,skinning:_.skinning&&R>0,maxBones:R,useVertexTexture:c,morphTargets:_.morphTargets,morphNormals:_.morphNormals,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:_.toneMapped?s.toneMapping:0,physicallyCorrectLights:s.physicallyCorrectLights,premultipliedAlpha:_.premultipliedAlpha,alphaTest:_.alphaTest,doubleSided:_.side===2,flipSided:_.side===1,depthPacking:_.depthPacking!==void 0?_.depthPacking:!1,index0AttributeName:_.index0AttributeName,extensionDerivatives:_.extensions&&_.extensions.derivatives,extensionFragDepth:_.extensions&&_.extensions.fragDepth,extensionDrawBuffers:_.extensions&&_.extensions.drawBuffers,extensionShaderTextureLOD:_.extensions&&_.extensions.shaderTextureLOD,rendererExtensionFragDepth:o||t.has("EXT_frag_depth"),rendererExtensionDrawBuffers:o||t.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:o||t.has("EXT_shader_texture_lod"),customProgramCacheKey:_.customProgramCacheKey()}}function g(_){const D=[];if(_.shaderID?D.push(_.shaderID):(D.push(_.fragmentShader),D.push(_.vertexShader)),_.defines!==void 0)for(const I in _.defines)D.push(I),D.push(_.defines[I]);if(_.isRawShaderMaterial===!1){for(let I=0;I<p.length;I++)D.push(_[p[I]]);D.push(s.outputEncoding),D.push(s.gammaFactor)}return D.push(_.customProgramCacheKey),D.join()}function T(_){const D=f[_.type];let I;if(D){const B=Pt[D];I=Ki.clone(B.uniforms)}else I=_.uniforms;return I}function S(_,D){let I;for(let B=0,G=a.length;B<G;B++){const W=a[B];if(W.cacheKey===D){I=W,++I.usedTimes;break}}return I===void 0&&(I=new nd(s,D,_,i),a.push(I)),I}function E(_){if(--_.usedTimes===0){const D=a.indexOf(_);a[D]=a[a.length-1],a.pop(),_.destroy()}}return{getParameters:m,getProgramCacheKey:g,getUniforms:T,acquireProgram:S,releaseProgram:E,programs:a}}function rd(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function sd(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.program!==e.program?s.program.id-e.program.id:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function ad(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Js(s){const e=[];let t=0;const n=[],i=[],r={id:-1};function a(){t=0,n.length=0,i.length=0}function o(u,f,p,v,x,m){let g=e[t];const T=s.get(p);return g===void 0?(g={id:u.id,object:u,geometry:f,material:p,program:T.program||r,groupOrder:v,renderOrder:u.renderOrder,z:x,group:m},e[t]=g):(g.id=u.id,g.object=u,g.geometry=f,g.material=p,g.program=T.program||r,g.groupOrder=v,g.renderOrder=u.renderOrder,g.z=x,g.group=m),t++,g}function l(u,f,p,v,x,m){const g=o(u,f,p,v,x,m);(p.transparent===!0?i:n).push(g)}function c(u,f,p,v,x,m){const g=o(u,f,p,v,x,m);(p.transparent===!0?i:n).unshift(g)}function h(u,f){n.length>1&&n.sort(u||sd),i.length>1&&i.sort(f||ad)}function d(){for(let u=t,f=e.length;u<f;u++){const p=e[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.program=null,p.group=null}}return{opaque:n,transparent:i,init:a,push:l,unshift:c,finish:d,sort:h}}function od(s){let e=new WeakMap;function t(i,r){let a;return e.has(i)===!1?(a=new Js(s),e.set(i,[a])):r>=e.get(i).length?(a=new Js(s),e.get(i).push(a)):a=e.get(i)[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function ld(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new M,color:new le};break;case"SpotLight":t={position:new M,direction:new M,color:new le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new M,color:new le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new M,skyColor:new le,groundColor:new le};break;case"RectAreaLight":t={color:new le,position:new M,halfWidth:new M,halfHeight:new M};break}return s[e.id]=t,t}}}function cd(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let hd=0;function ud(s,e){return(e.castShadow?1:0)-(s.castShadow?1:0)}function dd(s,e){const t=new ld,n=cd(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let h=0;h<9;h++)i.probe.push(new M);const r=new M,a=new de,o=new de;function l(h){let d=0,u=0,f=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let p=0,v=0,x=0,m=0,g=0,T=0,S=0,E=0;h.sort(ud);for(let D=0,I=h.length;D<I;D++){const B=h[D],G=B.color,W=B.intensity,N=B.distance,L=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)d+=G.r*W,u+=G.g*W,f+=G.b*W;else if(B.isLightProbe)for(let P=0;P<9;P++)i.probe[P].addScaledVector(B.sh.coefficients[P],W);else if(B.isDirectionalLight){const P=t.get(B);if(P.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){const R=B.shadow,A=n.get(B);A.shadowBias=R.bias,A.shadowNormalBias=R.normalBias,A.shadowRadius=R.radius,A.shadowMapSize=R.mapSize,i.directionalShadow[p]=A,i.directionalShadowMap[p]=L,i.directionalShadowMatrix[p]=B.shadow.matrix,T++}i.directional[p]=P,p++}else if(B.isSpotLight){const P=t.get(B);if(P.position.setFromMatrixPosition(B.matrixWorld),P.color.copy(G).multiplyScalar(W),P.distance=N,P.coneCos=Math.cos(B.angle),P.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),P.decay=B.decay,B.castShadow){const R=B.shadow,A=n.get(B);A.shadowBias=R.bias,A.shadowNormalBias=R.normalBias,A.shadowRadius=R.radius,A.shadowMapSize=R.mapSize,i.spotShadow[x]=A,i.spotShadowMap[x]=L,i.spotShadowMatrix[x]=B.shadow.matrix,E++}i.spot[x]=P,x++}else if(B.isRectAreaLight){const P=t.get(B);P.color.copy(G).multiplyScalar(W),P.halfWidth.set(B.width*.5,0,0),P.halfHeight.set(0,B.height*.5,0),i.rectArea[m]=P,m++}else if(B.isPointLight){const P=t.get(B);if(P.color.copy(B.color).multiplyScalar(B.intensity),P.distance=B.distance,P.decay=B.decay,B.castShadow){const R=B.shadow,A=n.get(B);A.shadowBias=R.bias,A.shadowNormalBias=R.normalBias,A.shadowRadius=R.radius,A.shadowMapSize=R.mapSize,A.shadowCameraNear=R.camera.near,A.shadowCameraFar=R.camera.far,i.pointShadow[v]=A,i.pointShadowMap[v]=L,i.pointShadowMatrix[v]=B.shadow.matrix,S++}i.point[v]=P,v++}else if(B.isHemisphereLight){const P=t.get(B);P.skyColor.copy(B.color).multiplyScalar(W),P.groundColor.copy(B.groundColor).multiplyScalar(W),i.hemi[g]=P,g++}}m>0&&(e.isWebGL2||s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=K.LTC_FLOAT_1,i.rectAreaLTC2=K.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=K.LTC_HALF_1,i.rectAreaLTC2=K.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=f;const _=i.hash;(_.directionalLength!==p||_.pointLength!==v||_.spotLength!==x||_.rectAreaLength!==m||_.hemiLength!==g||_.numDirectionalShadows!==T||_.numPointShadows!==S||_.numSpotShadows!==E)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=v,i.hemi.length=g,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=S,i.spotShadowMatrix.length=E,_.directionalLength=p,_.pointLength=v,_.spotLength=x,_.rectAreaLength=m,_.hemiLength=g,_.numDirectionalShadows=T,_.numPointShadows=S,_.numSpotShadows=E,i.version=hd++)}function c(h,d){let u=0,f=0,p=0,v=0,x=0;const m=d.matrixWorldInverse;for(let g=0,T=h.length;g<T;g++){const S=h[g];if(S.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),u++}else if(S.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const E=i.rectArea[v];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),o.identity(),a.copy(S.matrixWorld),a.premultiply(m),o.extractRotation(a),E.halfWidth.set(S.width*.5,0,0),E.halfHeight.set(0,S.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),v++}else if(S.isPointLight){const E=i.point[f];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const E=i.hemi[x];E.direction.setFromMatrixPosition(S.matrixWorld),E.direction.transformDirection(m),E.direction.normalize(),x++}}}return{setup:l,setupView:c,state:i}}function Qs(s,e){const t=new dd(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function a(d){n.push(d)}function o(d){i.push(d)}function l(){t.setup(n)}function c(d){t.setupView(n,d)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function fd(s,e){let t=new WeakMap;function n(r,a=0){let o;return t.has(r)===!1?(o=new Qs(s,e),t.set(r,[o])):a>=t.get(r).length?(o=new Qs(s,e),t.get(r).push(o)):o=t.get(r)[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}class Ka extends nt{constructor(e){super(),this.type="MeshDepthMaterial",this.depthPacking=3200,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}Ka.prototype.isMeshDepthMaterial=!0;class eo extends nt{constructor(e){super(),this.type="MeshDistanceMaterial",this.referencePosition=new M,this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}eo.prototype.isMeshDistanceMaterial=!0;var pd=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	float mean = 0.0;
	float squared_mean = 0.0;
	float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );
	for ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean * HALF_SAMPLE_RATE;
	squared_mean = squared_mean * HALF_SAMPLE_RATE;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`,md=`void main() {
	gl_Position = vec4( position, 1.0 );
}`;function to(s,e,t){let n=new ar;const i=new q,r=new q,a=new He,o=[],l=[],c={},h=t.maxTextureSize,d={0:1,1:0,2:2},u=new vt({defines:{SAMPLE_RATE:2/8,HALF_SAMPLE_RATE:1/8},uniforms:{shadow_pass:{value:null},resolution:{value:new q},radius:{value:4}},vertexShader:md,fragmentShader:pd}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new De;p.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new oe(p,u),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1,this.render=function(_,D,I){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||_.length===0)return;const B=s.getRenderTarget(),G=s.getActiveCubeFace(),W=s.getActiveMipmapLevel(),N=s.state;N.setBlending(0),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);for(let L=0,P=_.length;L<P;L++){const R=_[L],A=R.shadow;if(A===void 0){console.warn("THREE.WebGLShadowMap:",R,"has no shadow.");continue}if(A.autoUpdate===!1&&A.needsUpdate===!1)continue;i.copy(A.mapSize);const V=A.getFrameExtents();if(i.multiply(V),r.copy(A.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/V.x),i.x=r.x*V.x,A.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/V.y),i.y=r.y*V.y,A.mapSize.y=r.y)),A.map===null&&!A.isPointLightShadow&&this.type===3){const Y={minFilter:1006,magFilter:1006,format:1023};A.map=new xt(i.x,i.y,Y),A.map.texture.name=R.name+".shadowMap",A.mapPass=new xt(i.x,i.y,Y),A.camera.updateProjectionMatrix()}if(A.map===null){const Y={minFilter:1003,magFilter:1003,format:1023};A.map=new xt(i.x,i.y,Y),A.map.texture.name=R.name+".shadowMap",A.camera.updateProjectionMatrix()}s.setRenderTarget(A.map),s.clear();const j=A.getViewportCount();for(let Y=0;Y<j;Y++){const se=A.getViewport(Y);a.set(r.x*se.x,r.y*se.y,r.x*se.z,r.y*se.w),N.viewport(a),A.updateMatrices(R,Y),n=A.getFrustum(),E(D,I,A.camera,R,this.type)}!A.isPointLightShadow&&this.type===3&&m(A,I),A.needsUpdate=!1}x.needsUpdate=!1,s.setRenderTarget(B,G,W)};function m(_,D){const I=e.update(v);u.uniforms.shadow_pass.value=_.map.texture,u.uniforms.resolution.value=_.mapSize,u.uniforms.radius.value=_.radius,s.setRenderTarget(_.mapPass),s.clear(),s.renderBufferDirect(D,null,I,u,v,null),f.uniforms.shadow_pass.value=_.mapPass.texture,f.uniforms.resolution.value=_.mapSize,f.uniforms.radius.value=_.radius,s.setRenderTarget(_.map),s.clear(),s.renderBufferDirect(D,null,I,f,v,null)}function g(_,D,I){const B=_<<0|D<<1|I<<2;let G=o[B];return G===void 0&&(G=new Ka({depthPacking:3201,morphTargets:_,skinning:D}),o[B]=G),G}function T(_,D,I){const B=_<<0|D<<1|I<<2;let G=l[B];return G===void 0&&(G=new eo({morphTargets:_,skinning:D}),l[B]=G),G}function S(_,D,I,B,G,W,N){let L=null,P=g,R=_.customDepthMaterial;if(B.isPointLight===!0&&(P=T,R=_.customDistanceMaterial),R===void 0){let A=!1;I.morphTargets===!0&&(A=D.morphAttributes&&D.morphAttributes.position&&D.morphAttributes.position.length>0);let V=!1;_.isSkinnedMesh===!0&&(I.skinning===!0?V=!0:console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",_));const j=_.isInstancedMesh===!0;L=P(A,V,j)}else L=R;if(s.localClippingEnabled&&I.clipShadows===!0&&I.clippingPlanes.length!==0){const A=L.uuid,V=I.uuid;let j=c[A];j===void 0&&(j={},c[A]=j);let Y=j[V];Y===void 0&&(Y=L.clone(),j[V]=Y),L=Y}return L.visible=I.visible,L.wireframe=I.wireframe,N===3?L.side=I.shadowSide!==null?I.shadowSide:I.side:L.side=I.shadowSide!==null?I.shadowSide:d[I.side],L.clipShadows=I.clipShadows,L.clippingPlanes=I.clippingPlanes,L.clipIntersection=I.clipIntersection,L.wireframeLinewidth=I.wireframeLinewidth,L.linewidth=I.linewidth,B.isPointLight===!0&&L.isMeshDistanceMaterial===!0&&(L.referencePosition.setFromMatrixPosition(B.matrixWorld),L.nearDistance=G,L.farDistance=W),L}function E(_,D,I,B,G){if(_.visible===!1)return;if(_.layers.test(D.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&G===3)&&(!_.frustumCulled||n.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,_.matrixWorld);const L=e.update(_),P=_.material;if(Array.isArray(P)){const R=L.groups;for(let A=0,V=R.length;A<V;A++){const j=R[A],Y=P[j.materialIndex];if(Y&&Y.visible){const se=S(_,L,Y,B,I.near,I.far,G);s.renderBufferDirect(I,null,L,se,_,j)}}}else if(P.visible){const R=S(_,L,P,B,I.near,I.far,G);s.renderBufferDirect(I,null,L,R,_,null)}}const N=_.children;for(let L=0,P=N.length;L<P;L++)E(N[L],D,I,B,G)}}function gd(s,e,t){const n=t.isWebGL2;function i(){let C=!1;const J=new He;let $=null;const ue=new He(0,0,0,0);return{setMask:function(X){$!==X&&!C&&(s.colorMask(X,X,X,X),$=X)},setLocked:function(X){C=X},setClear:function(X,ge,Ne,Je,nn){nn===!0&&(X*=Je,ge*=Je,Ne*=Je),J.set(X,ge,Ne,Je),ue.equals(J)===!1&&(s.clearColor(X,ge,Ne,Je),ue.copy(J))},reset:function(){C=!1,$=null,ue.set(-1,0,0,0)}}}function r(){let C=!1,J=null,$=null,ue=null;return{setTest:function(X){X?fe(2929):me(2929)},setMask:function(X){J!==X&&!C&&(s.depthMask(X),J=X)},setFunc:function(X){if($!==X){if(X)switch(X){case 0:s.depthFunc(512);break;case 1:s.depthFunc(519);break;case 2:s.depthFunc(513);break;case 3:s.depthFunc(515);break;case 4:s.depthFunc(514);break;case 5:s.depthFunc(518);break;case 6:s.depthFunc(516);break;case 7:s.depthFunc(517);break;default:s.depthFunc(515)}else s.depthFunc(515);$=X}},setLocked:function(X){C=X},setClear:function(X){ue!==X&&(s.clearDepth(X),ue=X)},reset:function(){C=!1,J=null,$=null,ue=null}}}function a(){let C=!1,J=null,$=null,ue=null,X=null,ge=null,Ne=null,Je=null,nn=null;return{setTest:function(Ye){C||(Ye?fe(2960):me(2960))},setMask:function(Ye){J!==Ye&&!C&&(s.stencilMask(Ye),J=Ye)},setFunc:function(Ye,Bt,Mt){($!==Ye||ue!==Bt||X!==Mt)&&(s.stencilFunc(Ye,Bt,Mt),$=Ye,ue=Bt,X=Mt)},setOp:function(Ye,Bt,Mt){(ge!==Ye||Ne!==Bt||Je!==Mt)&&(s.stencilOp(Ye,Bt,Mt),ge=Ye,Ne=Bt,Je=Mt)},setLocked:function(Ye){C=Ye},setClear:function(Ye){nn!==Ye&&(s.clearStencil(Ye),nn=Ye)},reset:function(){C=!1,J=null,$=null,ue=null,X=null,ge=null,Ne=null,Je=null,nn=null}}}const o=new i,l=new r,c=new a;let h={},d=null,u={},f=null,p=!1,v=null,x=null,m=null,g=null,T=null,S=null,E=null,_=!1,D=null,I=null,B=null,G=null,W=null;const N=s.getParameter(35661);let L=!1,P=0;const R=s.getParameter(7938);R.indexOf("WebGL")!==-1?(P=parseFloat(/^WebGL (\d)/.exec(R)[1]),L=P>=1):R.indexOf("OpenGL ES")!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(R)[1]),L=P>=2);let A=null,V={};const j=new He(0,0,s.canvas.width,s.canvas.height),Y=new He(0,0,s.canvas.width,s.canvas.height);function se(C,J,$){const ue=new Uint8Array(4),X=s.createTexture();s.bindTexture(C,X),s.texParameteri(C,10241,9728),s.texParameteri(C,10240,9728);for(let ge=0;ge<$;ge++)s.texImage2D(J+ge,0,6408,1,1,0,6408,5121,ue);return X}const ne={};ne[3553]=se(3553,3553,1),ne[34067]=se(34067,34069,6),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),fe(2929),l.setFunc(3),Ee(!1),Z(1),fe(2884),Ce(0);function fe(C){h[C]!==!0&&(s.enable(C),h[C]=!0)}function me(C){h[C]!==!1&&(s.disable(C),h[C]=!1)}function O(C){C!==d&&(s.bindFramebuffer(36160,C),d=C)}function Be(C,J){J===null&&d!==null&&(J=d),u[C]!==J&&(s.bindFramebuffer(C,J),u[C]=J,n&&(C===36009&&(u[36160]=J),C===36160&&(u[36009]=J)))}function Ae(C){return f!==C?(s.useProgram(C),f=C,!0):!1}const ye={100:32774,101:32778,102:32779};if(n)ye[103]=32775,ye[104]=32776;else{const C=e.get("EXT_blend_minmax");C!==null&&(ye[103]=C.MIN_EXT,ye[104]=C.MAX_EXT)}const pe={200:0,201:1,202:768,204:770,210:776,208:774,206:772,203:769,205:771,209:775,207:773};function Ce(C,J,$,ue,X,ge,Ne,Je){if(C===0){p===!0&&(me(3042),p=!1);return}if(p===!1&&(fe(3042),p=!0),C!==5){if(C!==v||Je!==_){if((x!==100||T!==100)&&(s.blendEquation(32774),x=100,T=100),Je)switch(C){case 1:s.blendFuncSeparate(1,771,1,771);break;case 2:s.blendFunc(1,1);break;case 3:s.blendFuncSeparate(0,0,769,771);break;case 4:s.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case 1:s.blendFuncSeparate(770,771,1,771);break;case 2:s.blendFunc(770,1);break;case 3:s.blendFunc(0,769);break;case 4:s.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}m=null,g=null,S=null,E=null,v=C,_=Je}return}X=X||J,ge=ge||$,Ne=Ne||ue,(J!==x||X!==T)&&(s.blendEquationSeparate(ye[J],ye[X]),x=J,T=X),($!==m||ue!==g||ge!==S||Ne!==E)&&(s.blendFuncSeparate(pe[$],pe[ue],pe[ge],pe[Ne]),m=$,g=ue,S=ge,E=Ne),v=C,_=null}function Se(C,J){C.side===2?me(2884):fe(2884);let $=C.side===1;J&&($=!$),Ee($),C.blending===1&&C.transparent===!1?Ce(0):Ce(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.premultipliedAlpha),l.setFunc(C.depthFunc),l.setTest(C.depthTest),l.setMask(C.depthWrite),o.setMask(C.colorWrite);const ue=C.stencilWrite;c.setTest(ue),ue&&(c.setMask(C.stencilWriteMask),c.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),c.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),ee(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?fe(32926):me(32926)}function Ee(C){D!==C&&(C?s.frontFace(2304):s.frontFace(2305),D=C)}function Z(C){C!==0?(fe(2884),C!==I&&(C===1?s.cullFace(1029):C===2?s.cullFace(1028):s.cullFace(1032))):me(2884),I=C}function Q(C){C!==B&&(L&&s.lineWidth(C),B=C)}function ee(C,J,$){C?(fe(32823),(G!==J||W!==$)&&(s.polygonOffset(J,$),G=J,W=$)):me(32823)}function he(C){C?fe(3089):me(3089)}function ie(C){C===void 0&&(C=33984+N-1),A!==C&&(s.activeTexture(C),A=C)}function b(C,J){A===null&&ie();let $=V[A];$===void 0&&($={type:void 0,texture:void 0},V[A]=$),($.type!==C||$.texture!==J)&&(s.bindTexture(C,J||ne[C]),$.type=C,$.texture=J)}function w(){const C=V[A];C!==void 0&&C.type!==void 0&&(s.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function H(){try{s.compressedTexImage2D.apply(s,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function k(){try{s.texImage2D.apply(s,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function re(){try{s.texImage3D.apply(s,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ce(C){j.equals(C)===!1&&(s.scissor(C.x,C.y,C.z,C.w),j.copy(C))}function Re(C){Y.equals(C)===!1&&(s.viewport(C.x,C.y,C.z,C.w),Y.copy(C))}function ve(){s.disable(3042),s.disable(2884),s.disable(2929),s.disable(32823),s.disable(3089),s.disable(2960),s.disable(32926),s.blendEquation(32774),s.blendFunc(1,0),s.blendFuncSeparate(1,0,1,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(513),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(519,0,4294967295),s.stencilOp(7680,7680,7680),s.clearStencil(0),s.cullFace(1029),s.frontFace(2305),s.polygonOffset(0,0),s.activeTexture(33984),s.bindFramebuffer(36160,null),n===!0&&(s.bindFramebuffer(36009,null),s.bindFramebuffer(36008,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},A=null,V={},d=null,u={},f=null,p=!1,v=null,x=null,m=null,g=null,T=null,S=null,E=null,_=!1,D=null,I=null,B=null,G=null,W=null,j.set(0,0,s.canvas.width,s.canvas.height),Y.set(0,0,s.canvas.width,s.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:fe,disable:me,bindFramebuffer:Be,bindXRFramebuffer:O,useProgram:Ae,setBlending:Ce,setMaterial:Se,setFlipSided:Ee,setCullFace:Z,setLineWidth:Q,setPolygonOffset:ee,setScissorTest:he,activeTexture:ie,bindTexture:b,unbindTexture:w,compressedTexImage2D:H,texImage2D:k,texImage3D:re,scissor:ce,viewport:Re,reset:ve}}function vd(s,e,t,n,i,r,a){const o=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,d=i.maxSamples,u=new WeakMap;let f,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(b,w){return p?new OffscreenCanvas(b,w):document.createElementNS("http://www.w3.org/1999/xhtml","canvas")}function x(b,w,H,k){let re=1;if((b.width>k||b.height>k)&&(re=k/Math.max(b.width,b.height)),re<1||w===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const ce=w?Na:Math.floor,Re=ce(re*b.width),ve=ce(re*b.height);f===void 0&&(f=v(Re,ve));const C=H?v(Re,ve):f;return C.width=Re,C.height=ve,C.getContext("2d").drawImage(b,0,0,Re,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+Re+"x"+ve+")."),C}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function m(b){return jr(b.width)&&jr(b.height)}function g(b){return o?!1:b.wrapS!==1001||b.wrapT!==1001||b.minFilter!==1003&&b.minFilter!==1006}function T(b,w){return b.generateMipmaps&&w&&b.minFilter!==1003&&b.minFilter!==1006}function S(b,w,H,k){s.generateMipmap(b);const re=n.get(w);re.__maxMipLevel=Math.log2(Math.max(H,k))}function E(b,w,H){if(o===!1)return w;if(b!==null){if(s[b]!==void 0)return s[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let k=w;return w===6403&&(H===5126&&(k=33326),H===5131&&(k=33325),H===5121&&(k=33321)),w===6407&&(H===5126&&(k=34837),H===5131&&(k=34843),H===5121&&(k=32849)),w===6408&&(H===5126&&(k=34836),H===5131&&(k=34842),H===5121&&(k=32856)),(k===33325||k===33326||k===34842||k===34836)&&e.get("EXT_color_buffer_float"),k}function _(b){return b===1003||b===1004||b===1005?9728:9729}function D(b){const w=b.target;w.removeEventListener("dispose",D),B(w),w.isVideoTexture&&u.delete(w),a.memory.textures--}function I(b){const w=b.target;w.removeEventListener("dispose",I),G(w),a.memory.textures--}function B(b){const w=n.get(b);w.__webglInit!==void 0&&(s.deleteTexture(w.__webglTexture),n.remove(b))}function G(b){const w=b.texture,H=n.get(b),k=n.get(w);if(b){if(k.__webglTexture!==void 0&&s.deleteTexture(k.__webglTexture),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let re=0;re<6;re++)s.deleteFramebuffer(H.__webglFramebuffer[re]),H.__webglDepthbuffer&&s.deleteRenderbuffer(H.__webglDepthbuffer[re]);else s.deleteFramebuffer(H.__webglFramebuffer),H.__webglDepthbuffer&&s.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&s.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer&&s.deleteRenderbuffer(H.__webglColorRenderbuffer),H.__webglDepthRenderbuffer&&s.deleteRenderbuffer(H.__webglDepthRenderbuffer);n.remove(w),n.remove(b)}}let W=0;function N(){W=0}function L(){const b=W;return b>=l&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+l),W+=1,b}function P(b,w){const H=n.get(b);if(b.isVideoTexture&&Z(b),b.version>0&&H.__version!==b.version){const k=b.image;if(k===void 0)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else if(k.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe(H,b,w);return}}t.activeTexture(33984+w),t.bindTexture(3553,H.__webglTexture)}function R(b,w){const H=n.get(b);if(b.version>0&&H.__version!==b.version){fe(H,b,w);return}t.activeTexture(33984+w),t.bindTexture(35866,H.__webglTexture)}function A(b,w){const H=n.get(b);if(b.version>0&&H.__version!==b.version){fe(H,b,w);return}t.activeTexture(33984+w),t.bindTexture(32879,H.__webglTexture)}function V(b,w){const H=n.get(b);if(b.version>0&&H.__version!==b.version){me(H,b,w);return}t.activeTexture(33984+w),t.bindTexture(34067,H.__webglTexture)}const j={1e3:10497,1001:33071,1002:33648},Y={1003:9728,1004:9984,1005:9986,1006:9729,1007:9985,1008:9987};function se(b,w,H){if(H?(s.texParameteri(b,10242,j[w.wrapS]),s.texParameteri(b,10243,j[w.wrapT]),(b===32879||b===35866)&&s.texParameteri(b,32882,j[w.wrapR]),s.texParameteri(b,10240,Y[w.magFilter]),s.texParameteri(b,10241,Y[w.minFilter])):(s.texParameteri(b,10242,33071),s.texParameteri(b,10243,33071),(b===32879||b===35866)&&s.texParameteri(b,32882,33071),(w.wrapS!==1001||w.wrapT!==1001)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(b,10240,_(w.magFilter)),s.texParameteri(b,10241,_(w.minFilter)),w.minFilter!==1003&&w.minFilter!==1006&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const k=e.get("EXT_texture_filter_anisotropic");if(w.type===1015&&e.has("OES_texture_float_linear")===!1||o===!1&&w.type===1016&&e.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||n.get(w).__currentAnisotropy)&&(s.texParameterf(b,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy)}}function ne(b,w){b.__webglInit===void 0&&(b.__webglInit=!0,w.addEventListener("dispose",D),b.__webglTexture=s.createTexture(),a.memory.textures++)}function fe(b,w,H){let k=3553;w.isDataTexture2DArray&&(k=35866),w.isDataTexture3D&&(k=32879),ne(b,w),t.activeTexture(33984+H),t.bindTexture(k,b.__webglTexture),s.pixelStorei(37440,w.flipY),s.pixelStorei(37441,w.premultiplyAlpha),s.pixelStorei(3317,w.unpackAlignment),s.pixelStorei(37443,0);const re=g(w)&&m(w.image)===!1,ce=x(w.image,re,!1,h),Re=m(ce)||o,ve=r.convert(w.format);let C=r.convert(w.type),J=E(w.internalFormat,ve,C);se(k,w,Re);let $;const ue=w.mipmaps;if(w.isDepthTexture)J=6402,o?w.type===1015?J=36012:w.type===1014?J=33190:w.type===1020?J=35056:J=33189:w.type===1015&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===1026&&J===6402&&w.type!==1012&&w.type!==1014&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=1012,C=r.convert(w.type)),w.format===1027&&J===6402&&(J=34041,w.type!==1020&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=1020,C=r.convert(w.type))),t.texImage2D(3553,0,J,ce.width,ce.height,0,ve,C,null);else if(w.isDataTexture)if(ue.length>0&&Re){for(let X=0,ge=ue.length;X<ge;X++)$=ue[X],t.texImage2D(3553,X,J,$.width,$.height,0,ve,C,$.data);w.generateMipmaps=!1,b.__maxMipLevel=ue.length-1}else t.texImage2D(3553,0,J,ce.width,ce.height,0,ve,C,ce.data),b.__maxMipLevel=0;else if(w.isCompressedTexture){for(let X=0,ge=ue.length;X<ge;X++)$=ue[X],w.format!==1023&&w.format!==1022?ve!==null?t.compressedTexImage2D(3553,X,J,$.width,$.height,0,$.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):t.texImage2D(3553,X,J,$.width,$.height,0,ve,C,$.data);b.__maxMipLevel=ue.length-1}else if(w.isDataTexture2DArray)t.texImage3D(35866,0,J,ce.width,ce.height,ce.depth,0,ve,C,ce.data),b.__maxMipLevel=0;else if(w.isDataTexture3D)t.texImage3D(32879,0,J,ce.width,ce.height,ce.depth,0,ve,C,ce.data),b.__maxMipLevel=0;else if(ue.length>0&&Re){for(let X=0,ge=ue.length;X<ge;X++)$=ue[X],t.texImage2D(3553,X,J,ve,C,$);w.generateMipmaps=!1,b.__maxMipLevel=ue.length-1}else t.texImage2D(3553,0,J,ve,C,ce),b.__maxMipLevel=0;T(w,Re)&&S(k,w,ce.width,ce.height),b.__version=w.version,w.onUpdate&&w.onUpdate(w)}function me(b,w,H){if(w.image.length!==6)return;ne(b,w),t.activeTexture(33984+H),t.bindTexture(34067,b.__webglTexture),s.pixelStorei(37440,w.flipY),s.pixelStorei(37441,w.premultiplyAlpha),s.pixelStorei(3317,w.unpackAlignment),s.pixelStorei(37443,0);const k=w&&(w.isCompressedTexture||w.image[0].isCompressedTexture),re=w.image[0]&&w.image[0].isDataTexture,ce=[];for(let X=0;X<6;X++)!k&&!re?ce[X]=x(w.image[X],!1,!0,c):ce[X]=re?w.image[X].image:w.image[X];const Re=ce[0],ve=m(Re)||o,C=r.convert(w.format),J=r.convert(w.type),$=E(w.internalFormat,C,J);se(34067,w,ve);let ue;if(k){for(let X=0;X<6;X++){ue=ce[X].mipmaps;for(let ge=0;ge<ue.length;ge++){const Ne=ue[ge];w.format!==1023&&w.format!==1022?C!==null?t.compressedTexImage2D(34069+X,ge,$,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):t.texImage2D(34069+X,ge,$,Ne.width,Ne.height,0,C,J,Ne.data)}}b.__maxMipLevel=ue.length-1}else{ue=w.mipmaps;for(let X=0;X<6;X++)if(re){t.texImage2D(34069+X,0,$,ce[X].width,ce[X].height,0,C,J,ce[X].data);for(let ge=0;ge<ue.length;ge++){const Je=ue[ge].image[X].image;t.texImage2D(34069+X,ge+1,$,Je.width,Je.height,0,C,J,Je.data)}}else{t.texImage2D(34069+X,0,$,C,J,ce[X]);for(let ge=0;ge<ue.length;ge++){const Ne=ue[ge];t.texImage2D(34069+X,ge+1,$,C,J,Ne.image[X])}}b.__maxMipLevel=ue.length}T(w,ve)&&S(34067,w,Re.width,Re.height),b.__version=w.version,w.onUpdate&&w.onUpdate(w)}function O(b,w,H,k){const re=w.texture,ce=r.convert(re.format),Re=r.convert(re.type),ve=E(re.internalFormat,ce,Re);k===32879||k===35866?t.texImage3D(k,0,ve,w.width,w.height,w.depth,0,ce,Re,null):t.texImage2D(k,0,ve,w.width,w.height,0,ce,Re,null),t.bindFramebuffer(36160,b),s.framebufferTexture2D(36160,H,k,n.get(re).__webglTexture,0),t.bindFramebuffer(36160,null)}function Be(b,w,H){if(s.bindRenderbuffer(36161,b),w.depthBuffer&&!w.stencilBuffer){let k=33189;if(H){const re=w.depthTexture;re&&re.isDepthTexture&&(re.type===1015?k=36012:re.type===1014&&(k=33190));const ce=Ee(w);s.renderbufferStorageMultisample(36161,ce,k,w.width,w.height)}else s.renderbufferStorage(36161,k,w.width,w.height);s.framebufferRenderbuffer(36160,36096,36161,b)}else if(w.depthBuffer&&w.stencilBuffer){if(H){const k=Ee(w);s.renderbufferStorageMultisample(36161,k,35056,w.width,w.height)}else s.renderbufferStorage(36161,34041,w.width,w.height);s.framebufferRenderbuffer(36160,33306,36161,b)}else{const k=w.texture,re=r.convert(k.format),ce=r.convert(k.type),Re=E(k.internalFormat,re,ce);if(H){const ve=Ee(w);s.renderbufferStorageMultisample(36161,ve,Re,w.width,w.height)}else s.renderbufferStorage(36161,Re,w.width,w.height)}s.bindRenderbuffer(36161,null)}function Ae(b,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,b),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),P(w.depthTexture,0);const k=n.get(w.depthTexture).__webglTexture;if(w.depthTexture.format===1026)s.framebufferTexture2D(36160,36096,3553,k,0);else if(w.depthTexture.format===1027)s.framebufferTexture2D(36160,33306,3553,k,0);else throw new Error("Unknown depthTexture format")}function ye(b){const w=n.get(b),H=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Ae(w.__webglFramebuffer,b)}else if(H){w.__webglDepthbuffer=[];for(let k=0;k<6;k++)t.bindFramebuffer(36160,w.__webglFramebuffer[k]),w.__webglDepthbuffer[k]=s.createRenderbuffer(),Be(w.__webglDepthbuffer[k],b,!1)}else t.bindFramebuffer(36160,w.__webglFramebuffer),w.__webglDepthbuffer=s.createRenderbuffer(),Be(w.__webglDepthbuffer,b,!1);t.bindFramebuffer(36160,null)}function pe(b){const w=b.texture,H=n.get(b),k=n.get(w);b.addEventListener("dispose",I),k.__webglTexture=s.createTexture(),k.__version=w.version,a.memory.textures++;const re=b.isWebGLCubeRenderTarget===!0,ce=b.isWebGLMultisampleRenderTarget===!0,Re=w.isDataTexture3D||w.isDataTexture2DArray,ve=m(b)||o;if(o&&w.format===1022&&(w.type===1015||w.type===1016)&&(w.format=1023,console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")),re){H.__webglFramebuffer=[];for(let C=0;C<6;C++)H.__webglFramebuffer[C]=s.createFramebuffer()}else if(H.__webglFramebuffer=s.createFramebuffer(),ce)if(o){H.__webglMultisampledFramebuffer=s.createFramebuffer(),H.__webglColorRenderbuffer=s.createRenderbuffer(),s.bindRenderbuffer(36161,H.__webglColorRenderbuffer);const C=r.convert(w.format),J=r.convert(w.type),$=E(w.internalFormat,C,J),ue=Ee(b);s.renderbufferStorageMultisample(36161,ue,$,b.width,b.height),t.bindFramebuffer(36160,H.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(36160,36064,36161,H.__webglColorRenderbuffer),s.bindRenderbuffer(36161,null),b.depthBuffer&&(H.__webglDepthRenderbuffer=s.createRenderbuffer(),Be(H.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(36160,null)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");if(re){t.bindTexture(34067,k.__webglTexture),se(34067,w,ve);for(let C=0;C<6;C++)O(H.__webglFramebuffer[C],b,36064,34069+C);T(w,ve)&&S(34067,w,b.width,b.height),t.bindTexture(34067,null)}else{let C=3553;Re&&(o?C=w.isDataTexture3D?32879:35866:console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.")),t.bindTexture(C,k.__webglTexture),se(C,w,ve),O(H.__webglFramebuffer,b,36064,C),T(w,ve)&&S(3553,w,b.width,b.height),t.bindTexture(3553,null)}b.depthBuffer&&ye(b)}function Ce(b){const w=b.texture,H=m(b)||o;if(T(w,H)){const k=b.isWebGLCubeRenderTarget?34067:3553,re=n.get(w).__webglTexture;t.bindTexture(k,re),S(k,w,b.width,b.height),t.bindTexture(k,null)}}function Se(b){if(b.isWebGLMultisampleRenderTarget)if(o){const w=b.width,H=b.height;let k=16384;b.depthBuffer&&(k|=256),b.stencilBuffer&&(k|=1024);const re=n.get(b);t.bindFramebuffer(36008,re.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,re.__webglFramebuffer),s.blitFramebuffer(0,0,w,H,0,0,w,H,k,9728),t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,re.__webglMultisampledFramebuffer)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")}function Ee(b){return o&&b.isWebGLMultisampleRenderTarget?Math.min(d,b.samples):0}function Z(b){const w=a.render.frame;u.get(b)!==w&&(u.set(b,w),b.update())}let Q=!1,ee=!1;function he(b,w){b&&b.isWebGLRenderTarget&&(Q===!1&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),Q=!0),b=b.texture),P(b,w)}function ie(b,w){b&&b.isWebGLCubeRenderTarget&&(ee===!1&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),ee=!0),b=b.texture),V(b,w)}this.allocateTextureUnit=L,this.resetTextureUnits=N,this.setTexture2D=P,this.setTexture2DArray=R,this.setTexture3D=A,this.setTextureCube=V,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=Se,this.safeSetTexture2D=he,this.safeSetTextureCube=ie}function xd(s,e,t){const n=t.isWebGL2;function i(r){let a;if(r===1009)return 5121;if(r===1017)return 32819;if(r===1018)return 32820;if(r===1019)return 33635;if(r===1010)return 5120;if(r===1011)return 5122;if(r===1012)return 5123;if(r===1013)return 5124;if(r===1014)return 5125;if(r===1015)return 5126;if(r===1016)return n?5131:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===1021)return 6406;if(r===1022)return 6407;if(r===1023)return 6408;if(r===1024)return 6409;if(r===1025)return 6410;if(r===1026)return 6402;if(r===1027)return 34041;if(r===1028)return 6403;if(r===1029)return 36244;if(r===1030)return 33319;if(r===1031)return 33320;if(r===1032)return 36248;if(r===1033)return 36249;if(r===33776||r===33777||r===33778||r===33779)if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===33776)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===33777)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===33778)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===33779)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===35840||r===35841||r===35842||r===35843)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===35840)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===35841)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===35842)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===35843)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===36196)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if((r===37492||r===37496)&&(a=e.get("WEBGL_compressed_texture_etc"),a!==null)){if(r===37492)return a.COMPRESSED_RGB8_ETC2;if(r===37496)return a.COMPRESSED_RGBA8_ETC2_EAC}if(r===37808||r===37809||r===37810||r===37811||r===37812||r===37813||r===37814||r===37815||r===37816||r===37817||r===37818||r===37819||r===37820||r===37821||r===37840||r===37841||r===37842||r===37843||r===37844||r===37845||r===37846||r===37847||r===37848||r===37849||r===37850||r===37851||r===37852||r===37853)return a=e.get("WEBGL_compressed_texture_astc"),a!==null?r:null;if(r===36492)return a=e.get("EXT_texture_compression_bptc"),a!==null?r:null;if(r===1020)return n?34042:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null)}return{convert:i}}class no extends pt{constructor(e=[]){super(),this.cameras=e}}no.prototype.isArrayCamera=!0;class rt extends Ie{constructor(){super(),this.type="Group"}}rt.prototype.isGroup=!0;const _d={type:"move"};class Ur{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new M,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new M),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new M,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new M),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred")if(o!==null&&(i=t.getPose(e.targetRaySpace,n),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_d))),c&&e.hand){a=!0;for(const v of e.hand.values()){const x=t.getJointPose(v,n);if(c.joints[v.jointName]===void 0){const g=new rt;g.matrixAutoUpdate=!1,g.visible=!1,c.joints[v.jointName]=g,c.add(g)}const m=c.joints[v.jointName];x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.jointRadius=x.radius),m.visible=x!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}}class yd extends pn{constructor(e,t){super();const n=this,i=e.state;let r=null,a=1,o=null,l="local-floor",c=null;const h=[],d=new Map,u=new pt;u.layers.enable(1),u.viewport=new He;const f=new pt;f.layers.enable(2),f.viewport=new He;const p=[u,f],v=new no;v.layers.enable(1),v.layers.enable(2);let x=null,m=null;this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let L=h[N];return L===void 0&&(L=new Ur,h[N]=L),L.getTargetRaySpace()},this.getControllerGrip=function(N){let L=h[N];return L===void 0&&(L=new Ur,h[N]=L),L.getGripSpace()},this.getHand=function(N){let L=h[N];return L===void 0&&(L=new Ur,h[N]=L),L.getHandSpace()};function g(N){const L=d.get(N.inputSource);L&&L.dispatchEvent({type:N.type,data:N.inputSource})}function T(){d.forEach(function(N,L){N.disconnect(L)}),d.clear(),x=null,m=null,i.bindXRFramebuffer(null),e.setRenderTarget(e.getRenderTarget()),W.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){a=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){l=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o},this.getSession=function(){return r},this.setSession=async function(N){if(r=N,r!==null){r.addEventListener("select",g),r.addEventListener("selectstart",g),r.addEventListener("selectend",g),r.addEventListener("squeeze",g),r.addEventListener("squeezestart",g),r.addEventListener("squeezeend",g),r.addEventListener("end",T),r.addEventListener("inputsourceschange",S);const L=t.getContextAttributes();L.xrCompatible!==!0&&await t.makeXRCompatible();const P={antialias:L.antialias,alpha:L.alpha,depth:L.depth,stencil:L.stencil,framebufferScaleFactor:a},R=new XRWebGLLayer(r,t,P);r.updateRenderState({baseLayer:R}),o=await r.requestReferenceSpace(l),W.setContext(r),W.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function S(N){const L=r.inputSources;for(let P=0;P<h.length;P++)d.set(L[P],h[P]);for(let P=0;P<N.removed.length;P++){const R=N.removed[P],A=d.get(R);A&&(A.dispatchEvent({type:"disconnected",data:R}),d.delete(R))}for(let P=0;P<N.added.length;P++){const R=N.added[P],A=d.get(R);A&&A.dispatchEvent({type:"connected",data:R})}}const E=new M,_=new M;function D(N,L,P){E.setFromMatrixPosition(L.matrixWorld),_.setFromMatrixPosition(P.matrixWorld);const R=E.distanceTo(_),A=L.projectionMatrix.elements,V=P.projectionMatrix.elements,j=A[14]/(A[10]-1),Y=A[14]/(A[10]+1),se=(A[9]+1)/A[5],ne=(A[9]-1)/A[5],fe=(A[8]-1)/A[0],me=(V[8]+1)/V[0],O=j*fe,Be=j*me,Ae=R/(-fe+me),ye=Ae*-fe;L.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(ye),N.translateZ(Ae),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert();const pe=j+Ae,Ce=Y+Ae,Se=O-ye,Ee=Be+(R-ye),Z=se*Y/Ce*pe,Q=ne*Y/Ce*pe;N.projectionMatrix.makePerspective(Se,Ee,Z,Q,pe,Ce)}function I(N,L){L===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(L.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.getCamera=function(N){v.near=f.near=u.near=N.near,v.far=f.far=u.far=N.far,(x!==v.near||m!==v.far)&&(r.updateRenderState({depthNear:v.near,depthFar:v.far}),x=v.near,m=v.far);const L=N.parent,P=v.cameras;I(v,L);for(let A=0;A<P.length;A++)I(P[A],L);N.matrixWorld.copy(v.matrixWorld),N.matrix.copy(v.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale);const R=N.children;for(let A=0,V=R.length;A<V;A++)R[A].updateMatrixWorld(!0);return P.length===2?D(v,u,f):v.projectionMatrix.copy(u.projectionMatrix),v};let B=null;function G(N,L){if(c=L.getViewerPose(o),c!==null){const R=c.views,A=r.renderState.baseLayer;i.bindXRFramebuffer(A.framebuffer);let V=!1;R.length!==v.cameras.length&&(v.cameras.length=0,V=!0);for(let j=0;j<R.length;j++){const Y=R[j],se=A.getViewport(Y),ne=p[j];ne.matrix.fromArray(Y.transform.matrix),ne.projectionMatrix.fromArray(Y.projectionMatrix),ne.viewport.set(se.x,se.y,se.width,se.height),j===0&&v.matrix.copy(ne.matrix),V===!0&&v.cameras.push(ne)}}const P=r.inputSources;for(let R=0;R<h.length;R++){const A=h[R],V=P[R];A.update(V,L,o)}B&&B(N,L)}const W=new Va;W.setAnimationLoop(G),this.setAnimationLoop=function(N){B=N},this.dispose=function(){}}}function Md(s){function e(m,g){m.fogColor.value.copy(g.color),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function t(m,g,T,S){g.isMeshBasicMaterial?n(m,g):g.isMeshLambertMaterial?(n(m,g),l(m,g)):g.isMeshToonMaterial?(n(m,g),h(m,g)):g.isMeshPhongMaterial?(n(m,g),c(m,g)):g.isMeshStandardMaterial?(n(m,g),g.isMeshPhysicalMaterial?u(m,g):d(m,g)):g.isMeshMatcapMaterial?(n(m,g),f(m,g)):g.isMeshDepthMaterial?(n(m,g),p(m,g)):g.isMeshDistanceMaterial?(n(m,g),v(m,g)):g.isMeshNormalMaterial?(n(m,g),x(m,g)):g.isLineBasicMaterial?(i(m,g),g.isLineDashedMaterial&&r(m,g)):g.isPointsMaterial?a(m,g,T,S):g.isSpriteMaterial?o(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function n(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map),g.alphaMap&&(m.alphaMap.value=g.alphaMap),g.specularMap&&(m.specularMap.value=g.specularMap);const T=s.get(g).envMap;if(T){m.envMap.value=T,m.flipEnvMap.value=T.isCubeTexture&&T._needsFlipEnvMap?-1:1,m.reflectivity.value=g.reflectivity,m.refractionRatio.value=g.refractionRatio;const _=s.get(T).__maxMipLevel;_!==void 0&&(m.maxMipLevel.value=_)}g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity);let S;g.map?S=g.map:g.specularMap?S=g.specularMap:g.displacementMap?S=g.displacementMap:g.normalMap?S=g.normalMap:g.bumpMap?S=g.bumpMap:g.roughnessMap?S=g.roughnessMap:g.metalnessMap?S=g.metalnessMap:g.alphaMap?S=g.alphaMap:g.emissiveMap?S=g.emissiveMap:g.clearcoatMap?S=g.clearcoatMap:g.clearcoatNormalMap?S=g.clearcoatNormalMap:g.clearcoatRoughnessMap&&(S=g.clearcoatRoughnessMap),S!==void 0&&(S.isWebGLRenderTarget&&(S=S.texture),S.matrixAutoUpdate===!0&&S.updateMatrix(),m.uvTransform.value.copy(S.matrix));let E;g.aoMap?E=g.aoMap:g.lightMap&&(E=g.lightMap),E!==void 0&&(E.isWebGLRenderTarget&&(E=E.texture),E.matrixAutoUpdate===!0&&E.updateMatrix(),m.uv2Transform.value.copy(E.matrix))}function i(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity}function r(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function a(m,g,T,S){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*T,m.scale.value=S*.5,g.map&&(m.map.value=g.map),g.alphaMap&&(m.alphaMap.value=g.alphaMap);let E;g.map?E=g.map:g.alphaMap&&(E=g.alphaMap),E!==void 0&&(E.matrixAutoUpdate===!0&&E.updateMatrix(),m.uvTransform.value.copy(E.matrix))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map),g.alphaMap&&(m.alphaMap.value=g.alphaMap);let T;g.map?T=g.map:g.alphaMap&&(T=g.alphaMap),T!==void 0&&(T.matrixAutoUpdate===!0&&T.updateMatrix(),m.uvTransform.value.copy(T.matrix))}function l(m,g){g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap)}function c(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap),g.bumpMap&&(m.bumpMap.value=g.bumpMap,m.bumpScale.value=g.bumpScale,g.side===1&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,m.normalScale.value.copy(g.normalScale),g.side===1&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias)}function h(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap),g.bumpMap&&(m.bumpMap.value=g.bumpMap,m.bumpScale.value=g.bumpScale,g.side===1&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,m.normalScale.value.copy(g.normalScale),g.side===1&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias)}function d(m,g){m.roughness.value=g.roughness,m.metalness.value=g.metalness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap),g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap),g.bumpMap&&(m.bumpMap.value=g.bumpMap,m.bumpScale.value=g.bumpScale,g.side===1&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,m.normalScale.value.copy(g.normalScale),g.side===1&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),s.get(g).envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function u(m,g){d(m,g),m.reflectivity.value=g.reflectivity,m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.sheen&&m.sheen.value.copy(g.sheen),g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap),g.clearcoatNormalMap&&(m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),m.clearcoatNormalMap.value=g.clearcoatNormalMap,g.side===1&&m.clearcoatNormalScale.value.negate()),m.transmission.value=g.transmission,g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap)}function f(m,g){g.matcap&&(m.matcap.value=g.matcap),g.bumpMap&&(m.bumpMap.value=g.bumpMap,m.bumpScale.value=g.bumpScale,g.side===1&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,m.normalScale.value.copy(g.normalScale),g.side===1&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias)}function p(m,g){g.displacementMap&&(m.displacementMap.value=g.displacementMap,m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias)}function v(m,g){g.displacementMap&&(m.displacementMap.value=g.displacementMap,m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),m.referencePosition.value.copy(g.referencePosition),m.nearDistance.value=g.nearDistance,m.farDistance.value=g.farDistance}function x(m,g){g.bumpMap&&(m.bumpMap.value=g.bumpMap,m.bumpScale.value=g.bumpScale,g.side===1&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,m.normalScale.value.copy(g.normalScale),g.side===1&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias)}return{refreshFogUniforms:e,refreshMaterialUniforms:t}}function wd(){const s=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");return s.style.display="block",s}function Ve(s){s=s||{};const e=s.canvas!==void 0?s.canvas:wd(),t=s.context!==void 0?s.context:null,n=s.alpha!==void 0?s.alpha:!1,i=s.depth!==void 0?s.depth:!0,r=s.stencil!==void 0?s.stencil:!0,a=s.antialias!==void 0?s.antialias:!1,o=s.premultipliedAlpha!==void 0?s.premultipliedAlpha:!0,l=s.preserveDrawingBuffer!==void 0?s.preserveDrawingBuffer:!1,c=s.powerPreference!==void 0?s.powerPreference:"default",h=s.failIfMajorPerformanceCaveat!==void 0?s.failIfMajorPerformanceCaveat:!1;let d=null,u=null;const f=[],p=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.outputEncoding=3e3,this.physicallyCorrectLights=!1,this.toneMapping=0,this.toneMappingExposure=1;const v=this;let x=!1,m=0,g=0,T=null,S=-1,E=null;const _=new He,D=new He;let I=null,B=e.width,G=e.height,W=1,N=null,L=null;const P=new He(0,0,B,G),R=new He(0,0,B,G);let A=!1;const V=new ar;let j=!1,Y=!1;const se=new de,ne=new M,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function me(){return T===null?W:1}let O=t;function Be(y,z){for(let F=0;F<y.length;F++){const U=y[F],te=e.getContext(U,z);if(te!==null)return te}return null}try{const y={alpha:n,depth:i,stencil:r,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:h};if(e.addEventListener("webglcontextlost",ge,!1),e.addEventListener("webglcontextrestored",Ne,!1),O===null){const z=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&z.shift(),O=Be(z,y),O===null)throw Be(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ae,ye,pe,Ce,Se,Ee,Z,Q,ee,he,ie,b,w,H,k,re,ce,Re,ve,C,J,$;function ue(){Ae=new Wh(O),ye=new Hh(O,Ae,s),Ae.init(ye),J=new xd(O,Ae,ye),pe=new gd(O,Ae,ye),Ce=new Yh,Se=new rd,Ee=new vd(O,Ae,pe,Se,ye,J,Ce),Z=new Vh(v),Q=new gl(O,ye),$=new Uh(O,Ae,Q,ye),ee=new qh(O,Q,Ce,$),he=new Qh(O,ee,Q,Ce),Re=new Jh(O),k=new kh(Se),ie=new id(v,Z,Ae,ye,$,k),b=new Md(Se),w=new od(Se),H=new fd(Ae,ye),ce=new Gh(v,Z,pe,he,o),re=new to(v,he,ye),ve=new Oh(O,Ae,Ce,ye),C=new Xh(O,Ae,Ce,ye),Ce.programs=ie.programs,v.capabilities=ye,v.extensions=Ae,v.properties=Se,v.renderLists=w,v.shadowMap=re,v.state=pe,v.info=Ce}ue();const X=new yd(v,O);this.xr=X,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const y=Ae.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ae.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(y){y!==void 0&&(W=y,this.setSize(B,G,!1))},this.getSize=function(y){return y===void 0&&(console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"),y=new q),y.set(B,G)},this.setSize=function(y,z,F){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=y,G=z,e.width=Math.floor(y*W),e.height=Math.floor(z*W),F!==!1&&(e.style.width=y+"px",e.style.height=z+"px"),this.setViewport(0,0,y,z)},this.getDrawingBufferSize=function(y){return y===void 0&&(console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"),y=new q),y.set(B*W,G*W).floor()},this.setDrawingBufferSize=function(y,z,F){B=y,G=z,W=F,e.width=Math.floor(y*F),e.height=Math.floor(z*F),this.setViewport(0,0,y,z)},this.getCurrentViewport=function(y){return y===void 0&&(console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"),y=new He),y.copy(_)},this.getViewport=function(y){return y.copy(P)},this.setViewport=function(y,z,F,U){y.isVector4?P.set(y.x,y.y,y.z,y.w):P.set(y,z,F,U),pe.viewport(_.copy(P).multiplyScalar(W).floor())},this.getScissor=function(y){return y.copy(R)},this.setScissor=function(y,z,F,U){y.isVector4?R.set(y.x,y.y,y.z,y.w):R.set(y,z,F,U),pe.scissor(D.copy(R).multiplyScalar(W).floor())},this.getScissorTest=function(){return A},this.setScissorTest=function(y){pe.setScissorTest(A=y)},this.setOpaqueSort=function(y){N=y},this.setTransparentSort=function(y){L=y},this.getClearColor=function(y){return y===void 0&&(console.warn("WebGLRenderer: .getClearColor() now requires a Color as an argument"),y=new le),y.copy(ce.getClearColor())},this.setClearColor=function(){ce.setClearColor.apply(ce,arguments)},this.getClearAlpha=function(){return ce.getClearAlpha()},this.setClearAlpha=function(){ce.setClearAlpha.apply(ce,arguments)},this.clear=function(y,z,F){let U=0;(y===void 0||y)&&(U|=16384),(z===void 0||z)&&(U|=256),(F===void 0||F)&&(U|=1024),O.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ge,!1),e.removeEventListener("webglcontextrestored",Ne,!1),w.dispose(),H.dispose(),Se.dispose(),Z.dispose(),he.dispose(),$.dispose(),X.dispose(),X.removeEventListener("sessionstart",_s),X.removeEventListener("sessionend",ys),rn.stop()};function ge(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function Ne(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const y=Ce.autoReset,z=re.enabled,F=re.autoUpdate,U=re.needsUpdate,te=re.type;ue(),Ce.autoReset=y,re.enabled=z,re.autoUpdate=F,re.needsUpdate=U,re.type=te}function Je(y){const z=y.target;z.removeEventListener("dispose",Je),nn(z)}function nn(y){Ye(y),Se.remove(y)}function Ye(y){const z=Se.get(y).programs;z!==void 0&&z.forEach(function(F){ie.releaseProgram(F)})}function Bt(y,z){y.render(function(F){v.renderBufferImmediate(F,z)})}this.renderBufferImmediate=function(y,z){$.initAttributes();const F=Se.get(y);y.hasPositions&&!F.position&&(F.position=O.createBuffer()),y.hasNormals&&!F.normal&&(F.normal=O.createBuffer()),y.hasUvs&&!F.uv&&(F.uv=O.createBuffer()),y.hasColors&&!F.color&&(F.color=O.createBuffer());const U=z.getAttributes();y.hasPositions&&(O.bindBuffer(34962,F.position),O.bufferData(34962,y.positionArray,35048),$.enableAttribute(U.position),O.vertexAttribPointer(U.position,3,5126,!1,0,0)),y.hasNormals&&(O.bindBuffer(34962,F.normal),O.bufferData(34962,y.normalArray,35048),$.enableAttribute(U.normal),O.vertexAttribPointer(U.normal,3,5126,!1,0,0)),y.hasUvs&&(O.bindBuffer(34962,F.uv),O.bufferData(34962,y.uvArray,35048),$.enableAttribute(U.uv),O.vertexAttribPointer(U.uv,2,5126,!1,0,0)),y.hasColors&&(O.bindBuffer(34962,F.color),O.bufferData(34962,y.colorArray,35048),$.enableAttribute(U.color),O.vertexAttribPointer(U.color,3,5126,!1,0,0)),$.disableUnusedAttributes(),O.drawArrays(4,0,y.count),y.count=0},this.renderBufferDirect=function(y,z,F,U,te,Le){z===null&&(z=fe);const xe=te.isMesh&&te.matrixWorld.determinant()<0,we=Ts(y,z,U,te);pe.setMaterial(U,xe);let ke=F.index;const Me=F.attributes.position;if(ke===null){if(Me===void 0||Me.count===0)return}else if(ke.count===0)return;let Pe=1;U.wireframe===!0&&(ke=ee.getWireframeAttribute(F),Pe=2),(U.morphTargets||U.morphNormals)&&Re.update(te,F,U,we),$.setup(te,U,we,F,ke);let _e,ze=ve;ke!==null&&(_e=Q.get(ke),ze=C,ze.setIndex(_e));const At=ke!==null?ke.count:Me.count,ht=F.drawRange.start*Pe,sn=F.drawRange.count*Pe,$e=Le!==null?Le.start*Pe:0,an=Le!==null?Le.count*Pe:1/0,Qe=Math.max(ht,$e),pr=Math.min(At,ht+sn,$e+an)-1,dt=Math.max(0,pr-Qe+1);if(dt!==0){if(te.isMesh)U.wireframe===!0?(pe.setLineWidth(U.wireframeLinewidth*me()),ze.setMode(1)):ze.setMode(4);else if(te.isLine){let Nt=U.linewidth;Nt===void 0&&(Nt=1),pe.setLineWidth(Nt*me()),te.isLineSegments?ze.setMode(1):te.isLineLoop?ze.setMode(2):ze.setMode(3)}else te.isPoints?ze.setMode(0):te.isSprite&&ze.setMode(4);if(te.isInstancedMesh)ze.renderInstances(Qe,dt,te.count);else if(F.isInstancedBufferGeometry){const Nt=Math.min(F.instanceCount,F._maxInstanceCount);ze.renderInstances(Qe,dt,Nt)}else ze.render(Qe,dt)}},this.compile=function(y,z){u=H.get(y),u.init(),y.traverseVisible(function(F){F.isLight&&F.layers.test(z.layers)&&(u.pushLight(F),F.castShadow&&u.pushShadow(F))}),u.setupLights(),y.traverse(function(F){const U=F.material;if(U)if(Array.isArray(U))for(let te=0;te<U.length;te++){const Le=U[te];fr(Le,y,F)}else fr(U,y,F)})};let Mt=null;function Fo(y){Mt&&Mt(y)}function _s(){rn.stop()}function ys(){rn.start()}const rn=new Va;rn.setAnimationLoop(Fo),typeof window<"u"&&rn.setContext(window),this.setAnimationLoop=function(y){Mt=y,X.setAnimationLoop(y),y===null?rn.stop():rn.start()},X.addEventListener("sessionstart",_s),X.addEventListener("sessionend",ys),this.render=function(y,z){let F,U;if(arguments[2]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."),F=arguments[2]),arguments[3]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."),U=arguments[3]),z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;y.autoUpdate===!0&&y.updateMatrixWorld(),z.parent===null&&z.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(z=X.getCamera(z)),y.isScene===!0&&y.onBeforeRender(v,y,z,F||T),u=H.get(y,p.length),u.init(),p.push(u),se.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),V.setFromProjectionMatrix(se),Y=this.localClippingEnabled,j=k.init(this.clippingPlanes,Y,z),d=w.get(y,f.length),d.init(),f.push(d),Ms(y,z,0,v.sortObjects),d.finish(),v.sortObjects===!0&&d.sort(N,L),j===!0&&k.beginShadows();const te=u.state.shadowsArray;re.render(te,y,z),u.setupLights(),u.setupLightsView(z),j===!0&&k.endShadows(),this.info.autoReset===!0&&this.info.reset(),F!==void 0&&this.setRenderTarget(F),ce.render(d,y,z,U);const Le=d.opaque,xe=d.transparent;Le.length>0&&ws(Le,y,z),xe.length>0&&ws(xe,y,z),T!==null&&(Ee.updateRenderTargetMipmap(T),Ee.updateMultisampleRenderTarget(T)),y.isScene===!0&&y.onAfterRender(v,y,z),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1),$.resetDefaultState(),S=-1,E=null,p.pop(),p.length>0?u=p[p.length-1]:u=null,f.pop(),f.length>0?d=f[f.length-1]:d=null};function Ms(y,z,F,U){if(y.visible===!1)return;if(y.layers.test(z.layers)){if(y.isGroup)F=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(z);else if(y.isLight)u.pushLight(y),y.castShadow&&u.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||V.intersectsSprite(y)){U&&ne.setFromMatrixPosition(y.matrixWorld).applyMatrix4(se);const xe=he.update(y),we=y.material;we.visible&&d.push(y,xe,we,F,ne.z,null)}}else if(y.isImmediateRenderObject)U&&ne.setFromMatrixPosition(y.matrixWorld).applyMatrix4(se),d.push(y,null,y.material,F,ne.z,null);else if((y.isMesh||y.isLine||y.isPoints)&&(y.isSkinnedMesh&&y.skeleton.frame!==Ce.render.frame&&(y.skeleton.update(),y.skeleton.frame=Ce.render.frame),!y.frustumCulled||V.intersectsObject(y))){U&&ne.setFromMatrixPosition(y.matrixWorld).applyMatrix4(se);const xe=he.update(y),we=y.material;if(Array.isArray(we)){const ke=xe.groups;for(let Me=0,Pe=ke.length;Me<Pe;Me++){const _e=ke[Me],ze=we[_e.materialIndex];ze&&ze.visible&&d.push(y,xe,ze,F,ne.z,_e)}}else we.visible&&d.push(y,xe,we,F,ne.z,null)}}const Le=y.children;for(let xe=0,we=Le.length;xe<we;xe++)Ms(Le[xe],z,F,U)}function ws(y,z,F){const U=z.isScene===!0?z.overrideMaterial:null;for(let te=0,Le=y.length;te<Le;te++){const xe=y[te],we=xe.object,ke=xe.geometry,Me=U===null?xe.material:U,Pe=xe.group;if(F.isArrayCamera){const _e=F.cameras;for(let ze=0,At=_e.length;ze<At;ze++){const ht=_e[ze];we.layers.test(ht.layers)&&(pe.viewport(_.copy(ht.viewport)),u.setupLightsView(ht),bs(we,z,ht,ke,Me,Pe))}}else bs(we,z,F,ke,Me,Pe)}}function bs(y,z,F,U,te,Le){if(y.onBeforeRender(v,z,F,U,te,Le),y.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),y.isImmediateRenderObject){const xe=Ts(F,z,te,y);pe.setMaterial(te),$.reset(),Bt(y,xe)}else v.renderBufferDirect(F,z,U,te,y,Le);y.onAfterRender(v,z,F,U,te,Le)}function fr(y,z,F){z.isScene!==!0&&(z=fe);const U=Se.get(y),te=u.state.lights,Le=u.state.shadowsArray,xe=te.state.version,we=ie.getParameters(y,te.state,Le,z,F),ke=ie.getProgramCacheKey(we);let Me=U.programs;U.environment=y.isMeshStandardMaterial?z.environment:null,U.fog=z.fog,U.envMap=Z.get(y.envMap||U.environment),Me===void 0&&(y.addEventListener("dispose",Je),Me=new Map,U.programs=Me);let Pe=Me.get(ke);if(Pe!==void 0){if(U.currentProgram===Pe&&U.lightsStateVersion===xe)return Ss(y,we),Pe}else we.uniforms=ie.getUniforms(y),y.onBuild(we,v),y.onBeforeCompile(we,v),Pe=ie.acquireProgram(we,ke),Me.set(ke,Pe),U.uniforms=we.uniforms;const _e=U.uniforms;(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(_e.clippingPlanes=k.uniform),Ss(y,we),U.needsLights=Bo(y),U.lightsStateVersion=xe,U.needsLights&&(_e.ambientLightColor.value=te.state.ambient,_e.lightProbe.value=te.state.probe,_e.directionalLights.value=te.state.directional,_e.directionalLightShadows.value=te.state.directionalShadow,_e.spotLights.value=te.state.spot,_e.spotLightShadows.value=te.state.spotShadow,_e.rectAreaLights.value=te.state.rectArea,_e.ltc_1.value=te.state.rectAreaLTC1,_e.ltc_2.value=te.state.rectAreaLTC2,_e.pointLights.value=te.state.point,_e.pointLightShadows.value=te.state.pointShadow,_e.hemisphereLights.value=te.state.hemi,_e.directionalShadowMap.value=te.state.directionalShadowMap,_e.directionalShadowMatrix.value=te.state.directionalShadowMatrix,_e.spotShadowMap.value=te.state.spotShadowMap,_e.spotShadowMatrix.value=te.state.spotShadowMatrix,_e.pointShadowMap.value=te.state.pointShadowMap,_e.pointShadowMatrix.value=te.state.pointShadowMatrix);const ze=Pe.getUniforms(),At=Jt.seqWithValue(ze.seq,_e);return U.currentProgram=Pe,U.uniformsList=At,Pe}function Ss(y,z){const F=Se.get(y);F.outputEncoding=z.outputEncoding,F.instancing=z.instancing,F.numClippingPlanes=z.numClippingPlanes,F.numIntersection=z.numClipIntersection,F.vertexAlphas=z.vertexAlphas}function Ts(y,z,F,U){z.isScene!==!0&&(z=fe),Ee.resetTextureUnits();const te=z.fog,Le=F.isMeshStandardMaterial?z.environment:null,xe=T===null?v.outputEncoding:T.texture.encoding,we=Z.get(F.envMap||Le),ke=F.vertexColors===!0&&U.geometry&&U.geometry.attributes.color&&U.geometry.attributes.color.itemSize===4,Me=Se.get(F),Pe=u.state.lights;if(j===!0&&(Y===!0||y!==E)){const Qe=y===E&&F.id===S;k.setState(F,y,Qe)}let _e=!1;F.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==Pe.state.version||Me.outputEncoding!==xe||U.isInstancedMesh&&Me.instancing===!1||!U.isInstancedMesh&&Me.instancing===!0||Me.envMap!==we||F.fog&&Me.fog!==te||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==k.numPlanes||Me.numIntersection!==k.numIntersection)||Me.vertexAlphas!==ke)&&(_e=!0):(_e=!0,Me.__version=F.version);let ze=Me.currentProgram;_e===!0&&(ze=fr(F,z,U));let At=!1,ht=!1,sn=!1;const $e=ze.getUniforms(),an=Me.uniforms;if(pe.useProgram(ze.program)&&(At=!0,ht=!0,sn=!0),F.id!==S&&(S=F.id,ht=!0),At||E!==y){if($e.setValue(O,"projectionMatrix",y.projectionMatrix),ye.logarithmicDepthBuffer&&$e.setValue(O,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),E!==y&&(E=y,ht=!0,sn=!0),F.isShaderMaterial||F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshStandardMaterial||F.envMap){const Qe=$e.map.cameraPosition;Qe!==void 0&&Qe.setValue(O,ne.setFromMatrixPosition(y.matrixWorld))}(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&$e.setValue(O,"isOrthographic",y.isOrthographicCamera===!0),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial||F.isShadowMaterial||F.skinning)&&$e.setValue(O,"viewMatrix",y.matrixWorldInverse)}if(F.skinning){$e.setOptional(O,U,"bindMatrix"),$e.setOptional(O,U,"bindMatrixInverse");const Qe=U.skeleton;if(Qe){const pr=Qe.bones;if(ye.floatVertexTextures){if(Qe.boneTexture===null){let dt=Math.sqrt(pr.length*4);dt=Ba(dt),dt=Math.max(dt,4);const Nt=new Float32Array(dt*dt*4);Nt.set(Qe.boneMatrices);const No=new ka(Nt,dt,dt,1023,1015);Qe.boneMatrices=Nt,Qe.boneTexture=No,Qe.boneTextureSize=dt}$e.setValue(O,"boneTexture",Qe.boneTexture,Ee),$e.setValue(O,"boneTextureSize",Qe.boneTextureSize)}else $e.setOptional(O,Qe,"boneMatrices")}}return(ht||Me.receiveShadow!==U.receiveShadow)&&(Me.receiveShadow=U.receiveShadow,$e.setValue(O,"receiveShadow",U.receiveShadow)),ht&&($e.setValue(O,"toneMappingExposure",v.toneMappingExposure),Me.needsLights&&Io(an,sn),te&&F.fog&&b.refreshFogUniforms(an,te),b.refreshMaterialUniforms(an,F,W,G),Jt.upload(O,Me.uniformsList,an,Ee)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Jt.upload(O,Me.uniformsList,an,Ee),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&$e.setValue(O,"center",U.center),$e.setValue(O,"modelViewMatrix",U.modelViewMatrix),$e.setValue(O,"normalMatrix",U.normalMatrix),$e.setValue(O,"modelMatrix",U.matrixWorld),ze}function Io(y,z){y.ambientLightColor.needsUpdate=z,y.lightProbe.needsUpdate=z,y.directionalLights.needsUpdate=z,y.directionalLightShadows.needsUpdate=z,y.pointLights.needsUpdate=z,y.pointLightShadows.needsUpdate=z,y.spotLights.needsUpdate=z,y.spotLightShadows.needsUpdate=z,y.rectAreaLights.needsUpdate=z,y.hemisphereLights.needsUpdate=z}function Bo(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return m},this.getActiveMipmapLevel=function(){return g},this.getRenderTarget=function(){return T},this.setRenderTarget=function(y,z=0,F=0){T=y,m=z,g=F,y&&Se.get(y).__webglFramebuffer===void 0&&Ee.setupRenderTarget(y);let U=null,te=!1,Le=!1;if(y){const xe=y.texture;(xe.isDataTexture3D||xe.isDataTexture2DArray)&&(Le=!0);const we=Se.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(U=we[z],te=!0):y.isWebGLMultisampleRenderTarget?U=Se.get(y).__webglMultisampledFramebuffer:U=we,_.copy(y.viewport),D.copy(y.scissor),I=y.scissorTest}else _.copy(P).multiplyScalar(W).floor(),D.copy(R).multiplyScalar(W).floor(),I=A;if(pe.bindFramebuffer(36160,U),pe.viewport(_),pe.scissor(D),pe.setScissorTest(I),te){const xe=Se.get(y.texture);O.framebufferTexture2D(36160,36064,34069+z,xe.__webglTexture,F)}else if(Le){const xe=Se.get(y.texture),we=z||0;O.framebufferTextureLayer(36160,36064,xe.__webglTexture,F||0,we)}},this.readRenderTargetPixels=function(y,z,F,U,te,Le,xe){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=Se.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&xe!==void 0&&(we=we[xe]),we){pe.bindFramebuffer(36160,we);try{const ke=y.texture,Me=ke.format,Pe=ke.type;if(Me!==1023&&J.convert(Me)!==O.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const _e=Pe===1016&&(Ae.has("EXT_color_buffer_half_float")||ye.isWebGL2&&Ae.has("EXT_color_buffer_float"));if(Pe!==1009&&J.convert(Pe)!==O.getParameter(35738)&&!(Pe===1015&&(ye.isWebGL2||Ae.has("OES_texture_float")||Ae.has("WEBGL_color_buffer_float")))&&!_e){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O.checkFramebufferStatus(36160)===36053?z>=0&&z<=y.width-U&&F>=0&&F<=y.height-te&&O.readPixels(z,F,U,te,J.convert(Me),J.convert(Pe),Le):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{const ke=T!==null?Se.get(T).__webglFramebuffer:null;pe.bindFramebuffer(36160,ke)}}},this.copyFramebufferToTexture=function(y,z,F=0){const U=Math.pow(2,-F),te=Math.floor(z.image.width*U),Le=Math.floor(z.image.height*U),xe=J.convert(z.format);Ee.setTexture2D(z,0),O.copyTexImage2D(3553,F,xe,y.x,y.y,te,Le,0),pe.unbindTexture()},this.copyTextureToTexture=function(y,z,F,U=0){const te=z.image.width,Le=z.image.height,xe=J.convert(F.format),we=J.convert(F.type);Ee.setTexture2D(F,0),O.pixelStorei(37440,F.flipY),O.pixelStorei(37441,F.premultiplyAlpha),O.pixelStorei(3317,F.unpackAlignment),z.isDataTexture?O.texSubImage2D(3553,U,y.x,y.y,te,Le,xe,we,z.image.data):z.isCompressedTexture?O.compressedTexSubImage2D(3553,U,y.x,y.y,z.mipmaps[0].width,z.mipmaps[0].height,xe,z.mipmaps[0].data):O.texSubImage2D(3553,U,y.x,y.y,xe,we,z.image),U===0&&F.generateMipmaps&&O.generateMipmap(3553),pe.unbindTexture()},this.copyTextureToTexture3D=function(y,z,F,U,te=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const{width:Le,height:xe,data:we}=F.image,ke=J.convert(U.format),Me=J.convert(U.type);let Pe;if(U.isDataTexture3D)Ee.setTexture3D(U,0),Pe=32879;else if(U.isDataTexture2DArray)Ee.setTexture2DArray(U,0),Pe=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(37440,U.flipY),O.pixelStorei(37441,U.premultiplyAlpha),O.pixelStorei(3317,U.unpackAlignment);const _e=O.getParameter(3314),ze=O.getParameter(32878),At=O.getParameter(3316),ht=O.getParameter(3315),sn=O.getParameter(32877);O.pixelStorei(3314,Le),O.pixelStorei(32878,xe),O.pixelStorei(3316,y.min.x),O.pixelStorei(3315,y.min.y),O.pixelStorei(32877,y.min.z),O.texSubImage3D(Pe,te,z.x,z.y,z.z,y.max.x-y.min.x+1,y.max.y-y.min.y+1,y.max.z-y.min.z+1,ke,Me,we),O.pixelStorei(3314,_e),O.pixelStorei(32878,ze),O.pixelStorei(3316,At),O.pixelStorei(3315,ht),O.pixelStorei(32877,sn),te===0&&U.generateMipmaps&&O.generateMipmap(Pe),pe.unbindTexture()},this.initTexture=function(y){Ee.setTexture2D(y,0),pe.unbindTexture()},this.resetState=function(){m=0,g=0,T=null,pe.reset(),$.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class bd extends Ve{}bd.prototype.isWebGL1Renderer=!0;class or{constructor(e,t=1,n=1e3){this.name="",this.color=new le(e),this.near=t,this.far=n}clone(){return new or(this.color,this.near,this.far)}toJSON(){return{type:"Fog",color:this.color.getHex(),near:this.near,far:this.far}}}or.prototype.isFog=!0;class io extends Ie{constructor(){super(),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.autoUpdate=e.autoUpdate,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.background!==null&&(t.object.background=this.background.toJSON(e)),this.environment!==null&&(t.object.environment=this.environment.toJSON(e)),this.fog!==null&&(t.object.fog=this.fog.toJSON()),t}}io.prototype.isScene=!0;class gn{constructor(e,t){this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=Et(),this.onUploadCallback=function(){}}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Et()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new gn(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Et()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.prototype.slice.call(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}gn.prototype.isInterleavedBuffer=!0;const Ze=new M;class di{constructor(e,t,n,i){this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i===!0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ze.x=this.getX(t),Ze.y=this.getY(t),Ze.z=this.getZ(t),Ze.applyMatrix4(e),this.setXYZ(t,Ze.x,Ze.y,Ze.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ze.x=this.getX(t),Ze.y=this.getY(t),Ze.z=this.getZ(t),Ze.applyNormalMatrix(e),this.setXYZ(t,Ze.x,Ze.y,Ze.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ze.x=this.getX(t),Ze.y=this.getY(t),Ze.z=this.getZ(t),Ze.transformDirection(e),this.setXYZ(t,Ze.x,Ze.y,Ze.z);return this}setX(e,t){return this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){return this.data.array[e*this.data.stride+this.offset]}getY(e){return this.data.array[e*this.data.stride+this.offset+1]}getZ(e){return this.data.array[e*this.data.stride+this.offset+2]}getW(e){return this.data.array[e*this.data.stride+this.offset+3]}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new je(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new di(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}di.prototype.isInterleavedBufferAttribute=!0;class ro extends nt{constructor(e){super(),this.type="SpriteMaterial",this.color=new le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this}}ro.prototype.isSpriteMaterial=!0;let Rn;const ei=new M,Pn=new M,Dn=new M,Fn=new q,ti=new q,so=new de,Ui=new M,ni=new M,Oi=new M,$s=new q,Or=new q,Ks=new q;class Sd extends Ie{constructor(e){if(super(),this.type="Sprite",Rn===void 0){Rn=new De;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new gn(t,5);Rn.setIndex([0,1,2,0,2,3]),Rn.setAttribute("position",new di(n,3,0,!1)),Rn.setAttribute("uv",new di(n,2,3,!1))}this.geometry=Rn,this.material=e!==void 0?e:new ro,this.center=new q(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pn.setFromMatrixScale(this.matrixWorld),so.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Dn.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pn.multiplyScalar(-Dn.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Hi(Ui.set(-.5,-.5,0),Dn,a,Pn,i,r),Hi(ni.set(.5,-.5,0),Dn,a,Pn,i,r),Hi(Oi.set(.5,.5,0),Dn,a,Pn,i,r),$s.set(0,0),Or.set(1,0),Ks.set(1,1);let o=e.ray.intersectTriangle(Ui,ni,Oi,!1,ei);if(o===null&&(Hi(ni.set(-.5,.5,0),Dn,a,Pn,i,r),Or.set(0,1),o=e.ray.intersectTriangle(Ui,Oi,ni,!1,ei),o===null))return;const l=e.ray.origin.distanceTo(ei);l<e.near||l>e.far||t.push({distance:l,point:ei.clone(),uv:Ke.getUV(ei,Ui,ni,Oi,$s,Or,Ks,new q),face:null,object:this})}copy(e){return super.copy(e),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}Sd.prototype.isSprite=!0;function Hi(s,e,t,n,i,r){Fn.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(ti.x=r*Fn.x-i*Fn.y,ti.y=i*Fn.x+r*Fn.y):ti.copy(Fn),s.copy(e),s.x+=ti.x,s.y+=ti.y,s.applyMatrix4(so)}const ea=new M,ta=new He,na=new He,Td=new M,ia=new de;class ao extends oe{constructor(e,t){super(e,t),this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new de,this.bindMatrixInverse=new de}copy(e){return super.copy(e),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new He,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.x=t.getX(n),e.y=t.getY(n),e.z=t.getZ(n),e.w=t.getW(n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const n=this.skeleton,i=this.geometry;ta.fromBufferAttribute(i.attributes.skinIndex,e),na.fromBufferAttribute(i.attributes.skinWeight,e),ea.fromBufferAttribute(i.attributes.position,e).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=na.getComponent(r);if(a!==0){const o=ta.getComponent(r);ia.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Td.copy(ea).applyMatrix4(ia),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}ao.prototype.isSkinnedMesh=!0;class Ed extends Ie{constructor(){super(),this.type="Bone"}}Ed.prototype.isBone=!0;const ra=new de,sa=new de,ki=[],ii=new oe;class Ad extends oe{constructor(e,t,n){super(e,t),this.instanceMatrix=new je(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1}copy(e){return super.copy(e),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ii.geometry=this.geometry,ii.material=this.material,ii.material!==void 0)for(let r=0;r<i;r++){this.getMatrixAt(r,ra),sa.multiplyMatrices(n,ra),ii.matrixWorld=sa,ii.raycast(e,ki);for(let a=0,o=ki.length;a<o;a++){const l=ki[a];l.instanceId=r,l.object=this,t.push(l)}ki.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new je(new Float32Array(this.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}Ad.prototype.isInstancedMesh=!0;class vi extends nt{constructor(e){super(),this.type="LineBasicMaterial",this.color=new le(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.morphTargets=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.morphTargets=e.morphTargets,this}}vi.prototype.isLineBasicMaterial=!0;const aa=new M,oa=new M,la=new de,Hr=new qn,Vi=new Wn;class ss extends Ie{constructor(e=new De,t=new vi){super(),this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.isBufferGeometry)if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)aa.fromBufferAttribute(t,i-1),oa.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=aa.distanceTo(oa);e.setAttribute("lineDistance",new Fe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vi.copy(n.boundingSphere),Vi.applyMatrix4(i),Vi.radius+=r,e.ray.intersectsSphere(Vi)===!1)return;la.copy(i).invert(),Hr.copy(e.ray).applyMatrix4(la);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new M,h=new M,d=new M,u=new M,f=this.isLineSegments?2:1;if(n.isBufferGeometry){const p=n.index,x=n.attributes.position;if(p!==null){const m=Math.max(0,a.start),g=Math.min(p.count,a.start+a.count);for(let T=m,S=g-1;T<S;T+=f){const E=p.getX(T),_=p.getX(T+1);if(c.fromBufferAttribute(x,E),h.fromBufferAttribute(x,_),Hr.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const I=e.ray.origin.distanceTo(u);I<e.near||I>e.far||t.push({distance:I,point:d.clone().applyMatrix4(this.matrixWorld),index:T,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,a.start),g=Math.min(x.count,a.start+a.count);for(let T=m,S=g-1;T<S;T+=f){if(c.fromBufferAttribute(x,T),h.fromBufferAttribute(x,T+1),Hr.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const _=e.ray.origin.distanceTo(u);_<e.near||_>e.far||t.push({distance:_,point:d.clone().applyMatrix4(this.matrixWorld),index:T,face:null,faceIndex:null,object:this})}}}else n.isGeometry&&console.error("THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}}ss.prototype.isLine=!0;const ca=new M,ha=new M;class as extends ss{constructor(e,t){super(e,t),this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.isBufferGeometry)if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)ca.fromBufferAttribute(t,i),ha.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ca.distanceTo(ha);e.setAttribute("lineDistance",new Fe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}}as.prototype.isLineSegments=!0;class Ld extends ss{constructor(e,t){super(e,t),this.type="LineLoop"}}Ld.prototype.isLineLoop=!0;class oo extends nt{constructor(e){super(),this.type="PointsMaterial",this.color=new le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.morphTargets=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.morphTargets=e.morphTargets,this}}oo.prototype.isPointsMaterial=!0;const ua=new de,Qr=new qn,Wi=new Wn,qi=new M;class Cd extends Ie{constructor(e=new De,t=new oo){super(),this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wi.copy(n.boundingSphere),Wi.applyMatrix4(i),Wi.radius+=r,e.ray.intersectsSphere(Wi)===!1)return;ua.copy(i).invert(),Qr.copy(e.ray).applyMatrix4(ua);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o;if(n.isBufferGeometry){const c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=u,v=f;p<v;p++){const x=c.getX(p);qi.fromBufferAttribute(d,x),da(qi,x,l,i,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=u,v=f;p<v;p++)qi.fromBufferAttribute(d,p),da(qi,p,l,i,e,t,this)}}else console.error("THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}}Cd.prototype.isPoints=!0;function da(s,e,t,n,i,r,a){const o=Qr.distanceSqToPoint(s);if(o<t){const l=new M;Qr.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Rd extends ot{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.format=o!==void 0?o:1022,this.minFilter=a!==void 0?a:1006,this.magFilter=r!==void 0?r:1006,this.generateMipmaps=!1;const h=this;function d(){h.needsUpdate=!0,e.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(d)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}Rd.prototype.isVideoTexture=!0;class Pd extends ot{constructor(e,t,n,i,r,a,o,l,c,h,d,u){super(null,a,o,l,c,h,i,r,d,u),this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}Pd.prototype.isCompressedTexture=!0;class Nn extends ot{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.needsUpdate=!0}}Nn.prototype.isCanvasTexture=!0;class Dd extends ot{constructor(e,t,n,i,r,a,o,l,c,h){if(h=h!==void 0?h:1026,h!==1026&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===1026&&(n=1012),n===void 0&&h===1027&&(n=1020),super(null,i,r,a,o,l,h,n,c),this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=l!==void 0?l:1003,this.flipY=!1,this.generateMipmaps=!1}}Dd.prototype.isDepthTexture=!0;class Gn extends De{constructor(e=1,t=1,n=1,i=8,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],u=[],f=[];let p=0;const v=[],x=n/2;let m=0;g(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new Fe(d,3)),this.setAttribute("normal",new Fe(u,3)),this.setAttribute("uv",new Fe(f,2));function g(){const S=new M,E=new M;let _=0;const D=(t-e)/n;for(let I=0;I<=r;I++){const B=[],G=I/r,W=G*(t-e)+e;for(let N=0;N<=i;N++){const L=N/i,P=L*l+o,R=Math.sin(P),A=Math.cos(P);E.x=W*R,E.y=-G*n+x,E.z=W*A,d.push(E.x,E.y,E.z),S.set(R,D,A).normalize(),u.push(S.x,S.y,S.z),f.push(L,1-G),B.push(p++)}v.push(B)}for(let I=0;I<i;I++)for(let B=0;B<r;B++){const G=v[B][I],W=v[B+1][I],N=v[B+1][I+1],L=v[B][I+1];h.push(G,W,L),h.push(W,N,L),_+=6}c.addGroup(m,_,0),m+=_}function T(S){const E=p,_=new q,D=new M;let I=0;const B=S===!0?e:t,G=S===!0?1:-1;for(let N=1;N<=i;N++)d.push(0,x*G,0),u.push(0,G,0),f.push(.5,.5),p++;const W=p;for(let N=0;N<=i;N++){const P=N/i*l+o,R=Math.cos(P),A=Math.sin(P);D.x=B*A,D.y=x*G,D.z=B*R,d.push(D.x,D.y,D.z),u.push(0,G,0),_.x=R*.5+.5,_.y=A*.5*G+.5,f.push(_.x,_.y),p++}for(let N=0;N<i;N++){const L=E+N,P=W+N;S===!0?h.push(P,P+1,L):h.push(P+1,P,L),I+=3}c.addGroup(m,I,S===!0?1:2),m+=I}}}class Fd extends Gn{constructor(e=1,t=1,n=8,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}}const Id={triangulate:function(s,e,t){t=t||2;const n=e&&e.length,i=n?e[0]*t:s.length;let r=lo(s,0,i,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,d,u,f;if(n&&(r=Ud(s,e,r,t)),s.length>80*t){o=c=s[0],l=h=s[1];for(let p=t;p<i;p+=t)d=s[p],u=s[p+1],d<o&&(o=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);f=Math.max(c-o,h-l),f=f!==0?1/f:0}return fi(r,a,t,o,l,f),a}};function lo(s,e,t,n,i){let r,a;if(i===Jd(s,e,t,n)>0)for(r=e;r<t;r+=n)a=fa(r,s[r],s[r+1],a);else for(r=t-n;r>=e;r-=n)a=fa(r,s[r],s[r+1],a);return a&&lr(a,a.next)&&(mi(a),a=a.next),a}function Kt(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(lr(t,t.next)||Xe(t.prev,t,t.next)===0)){if(mi(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function fi(s,e,t,n,i,r,a){if(!s)return;!a&&r&&Wd(s,n,i,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Nd(s,n,i,r):Bd(s)){e.push(l.i/t),e.push(s.i/t),e.push(c.i/t),mi(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=zd(Kt(s),e,t),fi(s,e,t,n,i,r,2)):a===2&&Gd(s,e,t,n,i,r):fi(Kt(s),e,t,n,i,r,1);break}}}function Bd(s){const e=s.prev,t=s,n=s.next;if(Xe(e,t,n)>=0)return!1;let i=s.next.next;for(;i!==s.prev;){if(zn(e.x,e.y,t.x,t.y,n.x,n.y,i.x,i.y)&&Xe(i.prev,i,i.next)>=0)return!1;i=i.next}return!0}function Nd(s,e,t,n){const i=s.prev,r=s,a=s.next;if(Xe(i,r,a)>=0)return!1;const o=i.x<r.x?i.x<a.x?i.x:a.x:r.x<a.x?r.x:a.x,l=i.y<r.y?i.y<a.y?i.y:a.y:r.y<a.y?r.y:a.y,c=i.x>r.x?i.x>a.x?i.x:a.x:r.x>a.x?r.x:a.x,h=i.y>r.y?i.y>a.y?i.y:a.y:r.y>a.y?r.y:a.y,d=$r(o,l,e,t,n),u=$r(c,h,e,t,n);let f=s.prevZ,p=s.nextZ;for(;f&&f.z>=d&&p&&p.z<=u;){if(f!==s.prev&&f!==s.next&&zn(i.x,i.y,r.x,r.y,a.x,a.y,f.x,f.y)&&Xe(f.prev,f,f.next)>=0||(f=f.prevZ,p!==s.prev&&p!==s.next&&zn(i.x,i.y,r.x,r.y,a.x,a.y,p.x,p.y)&&Xe(p.prev,p,p.next)>=0))return!1;p=p.nextZ}for(;f&&f.z>=d;){if(f!==s.prev&&f!==s.next&&zn(i.x,i.y,r.x,r.y,a.x,a.y,f.x,f.y)&&Xe(f.prev,f,f.next)>=0)return!1;f=f.prevZ}for(;p&&p.z<=u;){if(p!==s.prev&&p!==s.next&&zn(i.x,i.y,r.x,r.y,a.x,a.y,p.x,p.y)&&Xe(p.prev,p,p.next)>=0)return!1;p=p.nextZ}return!0}function zd(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!lr(i,r)&&co(i,n,n.next,r)&&pi(i,r)&&pi(r,i)&&(e.push(i.i/t),e.push(n.i/t),e.push(r.i/t),mi(n),mi(n.next),n=s=r),n=n.next}while(n!==s);return Kt(n)}function Gd(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Yd(a,o)){let l=ho(a,o);a=Kt(a,a.next),l=Kt(l,l.next),fi(a,e,t,n,i,r),fi(l,e,t,n,i,r);return}o=o.next}a=a.next}while(a!==s)}function Ud(s,e,t,n){const i=[];let r,a,o,l,c;for(r=0,a=e.length;r<a;r++)o=e[r]*n,l=r<a-1?e[r+1]*n:s.length,c=lo(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Xd(c));for(i.sort(Od),r=0;r<i.length;r++)Hd(i[r],t),t=Kt(t,t.next);return t}function Od(s,e){return s.x-e.x}function Hd(s,e){if(e=kd(s,e),e){const t=ho(e,s);Kt(e,e.next),Kt(t,t.next)}}function kd(s,e){let t=e;const n=s.x,i=s.y;let r=-1/0,a;do{if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r){if(r=u,u===n){if(i===t.y)return t;if(i===t.next.y)return t.next}a=t.x<t.next.x?t:t.next}}t=t.next}while(t!==e);if(!a)return null;if(n===r)return a;const o=a,l=a.x,c=a.y;let h=1/0,d;t=a;do n>=t.x&&t.x>=l&&n!==t.x&&zn(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)&&(d=Math.abs(i-t.y)/(n-t.x),pi(t,s)&&(d<h||d===h&&(t.x>a.x||t.x===a.x&&Vd(a,t)))&&(a=t,h=d)),t=t.next;while(t!==o);return a}function Vd(s,e){return Xe(s.prev,s,e.prev)<0&&Xe(e.next,s,s.next)<0}function Wd(s,e,t,n){let i=s;do i.z===null&&(i.z=$r(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,qd(i)}function qd(s){let e,t,n,i,r,a,o,l,c=1;do{for(t=s,s=null,r=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(a>1);return s}function $r(s,e,t,n,i){return s=32767*(s-t)*i,e=32767*(e-n)*i,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Xd(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function zn(s,e,t,n,i,r,a,o){return(i-a)*(e-o)-(s-a)*(r-o)>=0&&(s-a)*(n-o)-(t-a)*(e-o)>=0&&(t-a)*(r-o)-(i-a)*(n-o)>=0}function Yd(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Zd(s,e)&&(pi(s,e)&&pi(e,s)&&jd(s,e)&&(Xe(s.prev,s,e.prev)||Xe(s,e.prev,e))||lr(s,e)&&Xe(s.prev,s,s.next)>0&&Xe(e.prev,e,e.next)>0)}function Xe(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function lr(s,e){return s.x===e.x&&s.y===e.y}function co(s,e,t,n){const i=Yi(Xe(s,e,t)),r=Yi(Xe(s,e,n)),a=Yi(Xe(t,n,s)),o=Yi(Xe(t,n,e));return!!(i!==r&&a!==o||i===0&&Xi(s,t,e)||r===0&&Xi(s,n,e)||a===0&&Xi(t,s,n)||o===0&&Xi(t,e,n))}function Xi(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Yi(s){return s>0?1:s<0?-1:0}function Zd(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&co(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function pi(s,e){return Xe(s.prev,s,s.next)<0?Xe(s,e,s.next)>=0&&Xe(s,s.prev,e)>=0:Xe(s,e,s.prev)<0||Xe(s,s.next,e)<0}function jd(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function ho(s,e){const t=new Kr(s.i,s.x,s.y),n=new Kr(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function fa(s,e,t,n){const i=new Kr(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function mi(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Kr(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Jd(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Qt{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return Qt.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];pa(e),ma(n,e);let a=e.length;t.forEach(pa);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,ma(n,t[l]);const o=Id.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function pa(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function ma(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class cr extends De{constructor(e,t){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Fe(i,3)),this.setAttribute("uv",new Fe(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1;let d=t.depth!==void 0?t.depth:100,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:6,p=t.bevelSize!==void 0?t.bevelSize:f-2,v=t.bevelOffset!==void 0?t.bevelOffset:0,x=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,g=t.UVGenerator!==void 0?t.UVGenerator:Qd;t.amount!==void 0&&(console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."),d=t.amount);let T,S=!1,E,_,D,I;m&&(T=m.getSpacedPoints(h),S=!0,u=!1,E=m.computeFrenetFrames(h,!1),_=new M,D=new M,I=new M),u||(x=0,f=0,p=0,v=0);const B=o.extractPoints(c);let G=B.shape;const W=B.holes;if(!Qt.isClockWise(G)){G=G.reverse();for(let Z=0,Q=W.length;Z<Q;Z++){const ee=W[Z];Qt.isClockWise(ee)&&(W[Z]=ee.reverse())}}const L=Qt.triangulateShape(G,W),P=G;for(let Z=0,Q=W.length;Z<Q;Z++){const ee=W[Z];G=G.concat(ee)}function R(Z,Q,ee){return Q||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().multiplyScalar(ee).add(Z)}const A=G.length,V=L.length;function j(Z,Q,ee){let he,ie,b;const w=Z.x-Q.x,H=Z.y-Q.y,k=ee.x-Z.x,re=ee.y-Z.y,ce=w*w+H*H,Re=w*re-H*k;if(Math.abs(Re)>Number.EPSILON){const ve=Math.sqrt(ce),C=Math.sqrt(k*k+re*re),J=Q.x-H/ve,$=Q.y+w/ve,ue=ee.x-re/C,X=ee.y+k/C,ge=((ue-J)*re-(X-$)*k)/(w*re-H*k);he=J+w*ge-Z.x,ie=$+H*ge-Z.y;const Ne=he*he+ie*ie;if(Ne<=2)return new q(he,ie);b=Math.sqrt(Ne/2)}else{let ve=!1;w>Number.EPSILON?k>Number.EPSILON&&(ve=!0):w<-Number.EPSILON?k<-Number.EPSILON&&(ve=!0):Math.sign(H)===Math.sign(re)&&(ve=!0),ve?(he=-H,ie=w,b=Math.sqrt(ce)):(he=w,ie=H,b=Math.sqrt(ce/2))}return new q(he/b,ie/b)}const Y=[];for(let Z=0,Q=P.length,ee=Q-1,he=Z+1;Z<Q;Z++,ee++,he++)ee===Q&&(ee=0),he===Q&&(he=0),Y[Z]=j(P[Z],P[ee],P[he]);const se=[];let ne,fe=Y.concat();for(let Z=0,Q=W.length;Z<Q;Z++){const ee=W[Z];ne=[];for(let he=0,ie=ee.length,b=ie-1,w=he+1;he<ie;he++,b++,w++)b===ie&&(b=0),w===ie&&(w=0),ne[he]=j(ee[he],ee[b],ee[w]);se.push(ne),fe=fe.concat(ne)}for(let Z=0;Z<x;Z++){const Q=Z/x,ee=f*Math.cos(Q*Math.PI/2),he=p*Math.sin(Q*Math.PI/2)+v;for(let ie=0,b=P.length;ie<b;ie++){const w=R(P[ie],Y[ie],he);ye(w.x,w.y,-ee)}for(let ie=0,b=W.length;ie<b;ie++){const w=W[ie];ne=se[ie];for(let H=0,k=w.length;H<k;H++){const re=R(w[H],ne[H],he);ye(re.x,re.y,-ee)}}}const me=p+v;for(let Z=0;Z<A;Z++){const Q=u?R(G[Z],fe[Z],me):G[Z];S?(D.copy(E.normals[0]).multiplyScalar(Q.x),_.copy(E.binormals[0]).multiplyScalar(Q.y),I.copy(T[0]).add(D).add(_),ye(I.x,I.y,I.z)):ye(Q.x,Q.y,0)}for(let Z=1;Z<=h;Z++)for(let Q=0;Q<A;Q++){const ee=u?R(G[Q],fe[Q],me):G[Q];S?(D.copy(E.normals[Z]).multiplyScalar(ee.x),_.copy(E.binormals[Z]).multiplyScalar(ee.y),I.copy(T[Z]).add(D).add(_),ye(I.x,I.y,I.z)):ye(ee.x,ee.y,d/h*Z)}for(let Z=x-1;Z>=0;Z--){const Q=Z/x,ee=f*Math.cos(Q*Math.PI/2),he=p*Math.sin(Q*Math.PI/2)+v;for(let ie=0,b=P.length;ie<b;ie++){const w=R(P[ie],Y[ie],he);ye(w.x,w.y,d+ee)}for(let ie=0,b=W.length;ie<b;ie++){const w=W[ie];ne=se[ie];for(let H=0,k=w.length;H<k;H++){const re=R(w[H],ne[H],he);S?ye(re.x,re.y+T[h-1].y,T[h-1].x+ee):ye(re.x,re.y,d+ee)}}}O(),Be();function O(){const Z=i.length/3;if(u){let Q=0,ee=A*Q;for(let he=0;he<V;he++){const ie=L[he];pe(ie[2]+ee,ie[1]+ee,ie[0]+ee)}Q=h+x*2,ee=A*Q;for(let he=0;he<V;he++){const ie=L[he];pe(ie[0]+ee,ie[1]+ee,ie[2]+ee)}}else{for(let Q=0;Q<V;Q++){const ee=L[Q];pe(ee[2],ee[1],ee[0])}for(let Q=0;Q<V;Q++){const ee=L[Q];pe(ee[0]+A*h,ee[1]+A*h,ee[2]+A*h)}}n.addGroup(Z,i.length/3-Z,0)}function Be(){const Z=i.length/3;let Q=0;Ae(P,Q),Q+=P.length;for(let ee=0,he=W.length;ee<he;ee++){const ie=W[ee];Ae(ie,Q),Q+=ie.length}n.addGroup(Z,i.length/3-Z,1)}function Ae(Z,Q){let ee=Z.length;for(;--ee>=0;){const he=ee;let ie=ee-1;ie<0&&(ie=Z.length-1);for(let b=0,w=h+x*2;b<w;b++){const H=A*b,k=A*(b+1),re=Q+he+H,ce=Q+ie+H,Re=Q+ie+k,ve=Q+he+k;Ce(re,ce,Re,ve)}}}function ye(Z,Q,ee){l.push(Z),l.push(Q),l.push(ee)}function pe(Z,Q,ee){Se(Z),Se(Q),Se(ee);const he=i.length/3,ie=g.generateTopUV(n,i,he-3,he-2,he-1);Ee(ie[0]),Ee(ie[1]),Ee(ie[2])}function Ce(Z,Q,ee,he){Se(Z),Se(Q),Se(he),Se(Q),Se(ee),Se(he);const ie=i.length/3,b=g.generateSideWallUV(n,i,ie-6,ie-3,ie-2,ie-1);Ee(b[0]),Ee(b[1]),Ee(b[3]),Ee(b[1]),Ee(b[2]),Ee(b[3])}function Se(Z){i.push(l[Z*3+0]),i.push(l[Z*3+1]),i.push(l[Z*3+2])}function Ee(Z){r.push(Z.x),r.push(Z.y)}}}toJSON(){const e=De.prototype.toJSON.call(this),t=this.parameters.shapes,n=this.parameters.options;return $d(t,n,e)}}const Qd={generateTopUV:function(s,e,t,n,i){const r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new q(r,a),new q(o,l),new q(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[i*3],f=e[i*3+1],p=e[i*3+2],v=e[r*3],x=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<.01?[new q(a,1-l),new q(c,1-d),new q(u,1-p),new q(v,1-m)]:[new q(o,1-l),new q(h,1-d),new q(f,1-p),new q(x,1-m)]}};function $d(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Kd extends De{constructor(e=.5,t=1,n=8,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let d=e;const u=(t-e)/i,f=new M,p=new q;for(let v=0;v<=i;v++){for(let x=0;x<=n;x++){const m=r+x/n*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}d+=u}for(let v=0;v<i;v++){const x=v*(n+1);for(let m=0;m<n;m++){const g=m+x,T=g,S=g+n+1,E=g+n+2,_=g+1;o.push(T,S,_),o.push(S,E,_)}}this.setIndex(o),this.setAttribute("position",new Fe(l,3)),this.setAttribute("normal",new Fe(c,3)),this.setAttribute("uv",new Fe(h,2))}}class ef extends De{constructor(e,t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Fe(i,3)),this.setAttribute("normal",new Fe(r,3)),this.setAttribute("uv",new Fe(a,2));function c(h){const d=i.length/3,u=h.extractPoints(t);let f=u.shape;const p=u.holes;Qt.isClockWise(f)===!1&&(f=f.reverse());for(let x=0,m=p.length;x<m;x++){const g=p[x];Qt.isClockWise(g)===!0&&(p[x]=g.reverse())}const v=Qt.triangulateShape(f,p);for(let x=0,m=p.length;x<m;x++){const g=p[x];f=f.concat(g)}for(let x=0,m=f.length;x<m;x++){const g=f[x];i.push(g.x,g.y,0),r.push(0,0,1),a.push(g.x,g.y)}for(let x=0,m=v.length;x<m;x++){const g=v[x],T=g[0]+d,S=g[1]+d,E=g[2]+d;n.push(T,S,E),l+=3}}}toJSON(){const e=De.prototype.toJSON.call(this),t=this.parameters.shapes;return tf(t,e)}}function tf(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){const i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}class er extends De{constructor(e=1,t=8,n=6,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new M,u=new M,f=[],p=[],v=[],x=[];for(let m=0;m<=n;m++){const g=[],T=m/n;let S=0;m==0&&a==0?S=.5/t:m==n&&l==Math.PI&&(S=-.5/t);for(let E=0;E<=t;E++){const _=E/t;d.x=-e*Math.cos(i+_*r)*Math.sin(a+T*o),d.y=e*Math.cos(a+T*o),d.z=e*Math.sin(i+_*r)*Math.sin(a+T*o),p.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),x.push(_+S,1-T),g.push(c++)}h.push(g)}for(let m=0;m<n;m++)for(let g=0;g<t;g++){const T=h[m][g+1],S=h[m][g],E=h[m+1][g],_=h[m+1][g+1];(m!==0||a>0)&&f.push(T,S,_),(m!==n-1||l<Math.PI)&&f.push(S,E,_)}this.setIndex(f),this.setAttribute("position",new Fe(p,3)),this.setAttribute("normal",new Fe(v,3)),this.setAttribute("uv",new Fe(x,2))}}class nf extends nt{constructor(e){super(),this.type="ShadowMaterial",this.color=new le(0),this.transparent=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this}}nf.prototype.isShadowMaterial=!0;class hr extends vt{constructor(e){super(e),this.type="RawShaderMaterial"}}hr.prototype.isRawShaderMaterial=!0;class Ue extends nt{constructor(e){super(),this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.vertexTangents=!1,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this.vertexTangents=e.vertexTangents,this}}Ue.prototype.isMeshStandardMaterial=!0;class rf extends Ue{constructor(e){super(),this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoat=0,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new q(1,1),this.clearcoatNormalMap=null,this.reflectivity=.5,Object.defineProperty(this,"ior",{get:function(){return(1+.4*this.reflectivity)/(1-.4*this.reflectivity)},set:function(t){this.reflectivity=ft(2.5*(t-1)/(t+1),0,1)}}),this.sheen=null,this.transmission=0,this.transmissionMap=null,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.reflectivity=e.reflectivity,e.sheen?this.sheen=(this.sheen||new le).copy(e.sheen):this.sheen=null,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this}}rf.prototype.isMeshPhysicalMaterial=!0;class sf extends nt{constructor(e){super(),this.type="MeshPhongMaterial",this.color=new le(16777215),this.specular=new le(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this}}sf.prototype.isMeshPhongMaterial=!0;class af extends nt{constructor(e){super(),this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new le(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this}}af.prototype.isMeshToonMaterial=!0;class of extends nt{constructor(e){super(),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this}}of.prototype.isMeshNormalMaterial=!0;class lf extends nt{constructor(e){super(),this.type="MeshLambertMaterial",this.color=new le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this}}lf.prototype.isMeshLambertMaterial=!0;class cf extends nt{constructor(e){super(),this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new le(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this}}cf.prototype.isMeshMatcapMaterial=!0;class hf extends vi{constructor(e){super(),this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}hf.prototype.isLineDashedMaterial=!0;const qe={arraySlice:function(s,e,t){return qe.isTypedArray(s)?new s.constructor(s.subarray(e,t!==void 0?t:s.length)):s.slice(e,t)},convertArray:function(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)},isTypedArray:function(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)},getKeyframeOrder:function(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n},sortedArray:function(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i},flattenJSON:function(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)},subclip:function(s,e,t,n,i=30){const r=s.clone();r.name=e;const a=[];for(let l=0;l<r.tracks.length;++l){const c=r.tracks[l],h=c.getValueSize(),d=[],u=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*i;if(!(p<t||p>=n)){d.push(c.times[f]);for(let v=0;v<h;++v)u.push(c.values[f*h+v])}}d.length!==0&&(c.times=qe.convertArray(d,c.times.constructor),c.values=qe.convertArray(u,c.values.constructor),a.push(c))}r.tracks=a;let o=1/0;for(let l=0;l<r.tracks.length;++l)o>r.tracks[l].times[0]&&(o=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*o);return r.resetDuration(),r},makeClipAdditive:function(s,e=0,t=s,n=30){n<=0&&(n=30);const i=t.tracks.length,r=e/n;for(let a=0;a<i;++a){const o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=s.tracks.find(function(m){return m.name===o.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0;const d=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=d/3);let u=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=f/3);const p=o.times.length-1;let v;if(r<=o.times[0]){const m=h,g=d-h;v=qe.arraySlice(o.values,m,g)}else if(r>=o.times[p]){const m=p*d+h,g=m+d-h;v=qe.arraySlice(o.values,m,g)}else{const m=o.createInterpolant(),g=h,T=d-h;m.evaluate(r),v=qe.arraySlice(m.resultBuffer,g,T)}l==="quaternion"&&new at().fromArray(v).normalize().conjugate().toArray(v);const x=c.times.length;for(let m=0;m<x;++m){const g=m*f+u;if(l==="quaternion")at.multiplyQuaternionsFlat(c.values,g,v,0,c.values,g);else{const T=f-u*2;for(let S=0;S<T;++S)c.values[g+S]-=v[S]}}}return s.blendMode=2501,s}};class en{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.afterEnd_(n-1,e,r)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,i);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,i);if(i===void 0)return n=t.length,this._cachedIndex=n,this.afterEnd_(n-1,r,e)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}en.prototype.beforeStart_=en.prototype.copySampleValue_;en.prototype.afterEnd_=en.prototype.copySampleValue_;class uf extends en{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:r=e,o=2*t-n;break;case 2402:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,l=2*n-t;break;case 2402:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),v=p*p,x=v*p,m=-u*x+2*u*v-u*p,g=(1+u)*x+(-1.5-2*u)*v+(-.5+u)*p+1,T=(-1-f)*x+(1.5+f)*v+.5*p,S=f*x-f*v;for(let E=0;E!==o;++E)r[E]=m*a[h+E]+g*a[c+E]+T*a[l+E]+S*a[d+E];return r}}class uo extends en{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}}class df extends en{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class It{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=qe.convertArray(t,this.TimeBufferType),this.values=qe.convertArray(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:qe.convertArray(e.times,Array),values:qe.convertArray(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new df(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new uo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new uf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=qe.arraySlice(n,r,a),this.values=qe.arraySlice(this.values,r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&qe.isTypedArray(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=qe.arraySlice(this.times),t=qe.arraySlice(this.values),n=this.getValueSize(),i=this.getInterpolation()===2302,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const d=o*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){const v=t[d+p];if(v!==t[u+p]||v!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=qe.arraySlice(e,0,a),this.values=qe.arraySlice(t,0,a*n)):(this.times=e,this.values=t),this}clone(){const e=qe.arraySlice(this.times,0),t=qe.arraySlice(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}It.prototype.TimeBufferType=Float32Array;It.prototype.ValueBufferType=Float32Array;It.prototype.DefaultInterpolation=2301;class Yn extends It{}Yn.prototype.ValueTypeName="bool";Yn.prototype.ValueBufferType=Array;Yn.prototype.DefaultInterpolation=2300;Yn.prototype.InterpolantFactoryMethodLinear=void 0;Yn.prototype.InterpolantFactoryMethodSmooth=void 0;class fo extends It{}fo.prototype.ValueTypeName="color";class tr extends It{}tr.prototype.ValueTypeName="number";class ff extends en{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)at.slerpFlat(r,0,a,c-o,a,c,l);return r}}class xi extends It{InterpolantFactoryMethodLinear(e){return new ff(this.times,this.values,this.getValueSize(),e)}}xi.prototype.ValueTypeName="quaternion";xi.prototype.DefaultInterpolation=2301;xi.prototype.InterpolantFactoryMethodSmooth=void 0;class Zn extends It{}Zn.prototype.ValueTypeName="string";Zn.prototype.ValueBufferType=Array;Zn.prototype.DefaultInterpolation=2300;Zn.prototype.InterpolantFactoryMethodLinear=void 0;Zn.prototype.InterpolantFactoryMethodSmooth=void 0;class nr extends It{}nr.prototype.ValueTypeName="vector";class ga{constructor(e,t=-1,n,i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Et(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(mf(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(It.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=qe.getKeyframeOrder(l);l=qe.sortedArray(l,1,h),c=qe.sortedArray(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new tr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const d=h[1];let u=i[d];u||(i[d]=u=[]),u.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,u,f,p,v){if(f.length!==0){const x=[],m=[];qe.flattenJSON(f,x,m,p),x.length!==0&&v.push(new d(u,x,m))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const u=c[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let p;for(p=0;p<u.length;p++)if(u[p].morphTargets)for(let v=0;v<u[p].morphTargets.length;v++)f[u[p].morphTargets[v]]=-1;for(const v in f){const x=[],m=[];for(let g=0;g!==u[p].morphTargets.length;++g){const T=u[p];x.push(T.time),m.push(T.morphTarget===v?1:0)}i.push(new tr(".morphTargetInfluence["+v+"]",x,m))}l=f.length*a}else{const f=".bones["+t[d].name+"]";n(nr,f+".position",u,"pos",i),n(xi,f+".quaternion",u,"rot",i),n(nr,f+".scale",u,"scl",i)}}return i.length===0?null:new this(r,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function pf(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return tr;case"vector":case"vector2":case"vector3":case"vector4":return nr;case"color":return fo;case"quaternion":return xi;case"bool":case"boolean":return Yn;case"string":return Zn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function mf(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=pf(s.type);if(s.times===void 0){const t=[],n=[];qe.flattenJSON(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Hn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class gf{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null}}}const vf=new gf;class tn{constructor(e){this.manager=e!==void 0?e:vf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const Tt={};class xf extends tn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Hn.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;if(Tt[e]!==void 0){Tt[e].push({onLoad:t,onProgress:n,onError:i});return}const o=/^data:(.*?)(;base64)?,(.*)$/,l=e.match(o);let c;if(l){const h=l[1],d=!!l[2];let u=l[3];u=decodeURIComponent(u),d&&(u=atob(u));try{let f;const p=(this.responseType||"").toLowerCase();switch(p){case"arraybuffer":case"blob":const v=new Uint8Array(u.length);for(let m=0;m<u.length;m++)v[m]=u.charCodeAt(m);p==="blob"?f=new Blob([v.buffer],{type:h}):f=v.buffer;break;case"document":f=new DOMParser().parseFromString(u,h);break;case"json":f=JSON.parse(u);break;default:f=u;break}setTimeout(function(){t&&t(f),r.manager.itemEnd(e)},0)}catch(f){setTimeout(function(){i&&i(f),r.manager.itemError(e),r.manager.itemEnd(e)},0)}}else{Tt[e]=[],Tt[e].push({onLoad:t,onProgress:n,onError:i}),c=new XMLHttpRequest,c.open("GET",e,!0),c.addEventListener("load",function(h){const d=this.response,u=Tt[e];if(delete Tt[e],this.status===200||this.status===0){this.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),Hn.add(e,d);for(let f=0,p=u.length;f<p;f++){const v=u[f];v.onLoad&&v.onLoad(d)}r.manager.itemEnd(e)}else{for(let f=0,p=u.length;f<p;f++){const v=u[f];v.onError&&v.onError(h)}r.manager.itemError(e),r.manager.itemEnd(e)}},!1),c.addEventListener("progress",function(h){const d=Tt[e];for(let u=0,f=d.length;u<f;u++){const p=d[u];p.onProgress&&p.onProgress(h)}},!1),c.addEventListener("error",function(h){const d=Tt[e];delete Tt[e];for(let u=0,f=d.length;u<f;u++){const p=d[u];p.onError&&p.onError(h)}r.manager.itemError(e),r.manager.itemEnd(e)},!1),c.addEventListener("abort",function(h){const d=Tt[e];delete Tt[e];for(let u=0,f=d.length;u<f;u++){const p=d[u];p.onError&&p.onError(h)}r.manager.itemError(e),r.manager.itemEnd(e)},!1),this.responseType!==void 0&&(c.responseType=this.responseType),this.withCredentials!==void 0&&(c.withCredentials=this.withCredentials),c.overrideMimeType&&c.overrideMimeType(this.mimeType!==void 0?this.mimeType:"text/plain");for(const h in this.requestHeader)c.setRequestHeader(h,this.requestHeader[h]);c.send(null)}return r.manager.itemStart(e),c}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class po extends tn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Hn.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=document.createElementNS("http://www.w3.org/1999/xhtml","img");function l(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1),Hn.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.substr(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class _f extends tn{constructor(e){super(e)}load(e,t,n,i){const r=new sr,a=new po(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(e[c],function(h){r.images[c]=h,o++,o===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}}class yf extends tn{constructor(e){super(e)}load(e,t,n,i){const r=new ot,a=new po(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o;const l=e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0;r.format=l?1022:1023,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class _t{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],u=n[i+1]-h,f=(a-h)/u;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=t||(a.isVector2?new q:new M);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new M,i=[],r=[],a=[],o=new M,l=new de;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new M),i[f].normalize()}r[0]=new M,a[0]=new M;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(ft(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(ft(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ur extends _t{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t){const n=t||new q,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}ur.prototype.isEllipseCurve=!0;class mo extends ur{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.type="ArcCurve"}}mo.prototype.isArcCurve=!0;function os(){let s=0,e=0,t=0,n=0;function i(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,i(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const Zi=new M,kr=new os,Vr=new os,Wr=new os;class go extends _t{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new M){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Zi.subVectors(i[0],i[1]).add(i[0]),c=Zi);const d=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Zi.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Zi),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),x<1e-4&&(x=v),kr.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,v,x),Vr.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,v,x),Wr.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,v,x)}else this.curveType==="catmullrom"&&(kr.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Vr.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Wr.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(kr.calc(l),Vr.calc(l),Wr.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new M().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}go.prototype.isCatmullRomCurve3=!0;function va(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*s+t}function Mf(s,e){const t=1-s;return t*t*e}function wf(s,e){return 2*(1-s)*s*e}function bf(s,e){return s*s*e}function ci(s,e,t,n){return Mf(s,e)+wf(s,t)+bf(s,n)}function Sf(s,e){const t=1-s;return t*t*t*e}function Tf(s,e){const t=1-s;return 3*t*t*s*e}function Ef(s,e){return 3*(1-s)*s*s*e}function Af(s,e){return s*s*s*e}function hi(s,e,t,n,i){return Sf(s,e)+Tf(s,t)+Ef(s,n)+Af(s,i)}class ls extends _t{constructor(e=new q,t=new q,n=new q,i=new q){super(),this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new q){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(hi(e,i.x,r.x,a.x,o.x),hi(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}ls.prototype.isCubicBezierCurve=!0;class vo extends _t{constructor(e=new M,t=new M,n=new M,i=new M){super(),this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new M){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(hi(e,i.x,r.x,a.x,o.x),hi(e,i.y,r.y,a.y,o.y),hi(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}vo.prototype.isCubicBezierCurve3=!0;class dr extends _t{constructor(e=new q,t=new q){super(),this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new q){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t){const n=t||new q;return n.copy(this.v2).sub(this.v1).normalize(),n}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}dr.prototype.isLineCurve=!0;class Lf extends _t{constructor(e=new M,t=new M){super(),this.type="LineCurve3",this.isLineCurve3=!0,this.v1=e,this.v2=t}getPoint(e,t=new M){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class cs extends _t{constructor(e=new q,t=new q,n=new q){super(),this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new q){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(ci(e,i.x,r.x,a.x),ci(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}cs.prototype.isQuadraticBezierCurve=!0;class xo extends _t{constructor(e=new M,t=new M,n=new M){super(),this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new M){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(ci(e,i.x,r.x,a.x),ci(e,i.y,r.y,a.y),ci(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}xo.prototype.isQuadraticBezierCurve3=!0;class hs extends _t{constructor(e=[]){super(),this.type="SplineCurve",this.points=e}getPoint(e,t=new q){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(va(o,l.x,c.x,h.x,d.x),va(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new q().fromArray(i))}return this}}hs.prototype.isSplineCurve=!0;var Cf=Object.freeze({__proto__:null,ArcCurve:mo,CatmullRomCurve3:go,CubicBezierCurve:ls,CubicBezierCurve3:vo,EllipseCurve:ur,LineCurve:dr,LineCurve3:Lf,QuadraticBezierCurve:cs,QuadraticBezierCurve3:xo,SplineCurve:hs});class Rf extends _t{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new dr(t,e))}getPoint(e){const t=e*this.getLength(),n=this.getCurveLengths();let i=0;for(;i<n.length;){if(n[i]>=t){const r=n[i]-t,a=this.curves[i],o=a.getLength(),l=o===0?0:1-r/o;return a.getPointAt(l)}i++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a&&a.isEllipseCurve?e*2:a&&(a.isLineCurve||a.isLineCurve3)?1:a&&a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Cf[i.type]().fromJSON(i))}return this}}class es extends Rf{constructor(e){super(),this.type="Path",this.currentPoint=new q,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new dr(this.currentPoint.clone(),new q(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new cs(this.currentPoint.clone(),new q(e,t),new q(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){const o=new ls(this.currentPoint.clone(),new q(e,t),new q(n,i),new q(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new hs(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,a,o,l),this}absellipse(e,t,n,i,r,a,o,l){const c=new ur(e,t,n,i,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class us extends es{constructor(e){super(e),this.uuid=Et(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new es().fromJSON(i))}return this}}class Ft extends Ie{constructor(e,t=1){super(),this.type="Light",this.color=new le(e),this.intensity=t}dispose(){}copy(e){return super.copy(e),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}Ft.prototype.isLight=!0;class _o extends Ft{constructor(e,t,n){super(e,n),this.type="HemisphereLight",this.position.copy(Ie.DefaultUp),this.updateMatrix(),this.groundColor=new le(t)}copy(e){return Ft.prototype.copy.call(this,e),this.groundColor.copy(e.groundColor),this}}_o.prototype.isHemisphereLight=!0;const xa=new de,_a=new M,ya=new M;class ds{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.mapSize=new q(512,512),this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ar,this._frameExtents=new q(1,1),this._viewportCount=1,this._viewports=[new He(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;_a.setFromMatrixPosition(e.matrixWorld),t.position.copy(_a),ya.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ya),t.updateMatrixWorld(),xa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(t.projectionMatrix),n.multiply(t.matrixWorldInverse)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class yo extends ds{constructor(){super(new pt(50,1,.5,500)),this.focus=1}updateMatrices(e){const t=this.camera,n=ui*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}yo.prototype.isSpotLightShadow=!0;class Mo extends Ft{constructor(e,t,n=0,i=Math.PI/3,r=0,a=1){super(e,t),this.type="SpotLight",this.position.copy(Ie.DefaultUp),this.updateMatrix(),this.target=new Ie,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.shadow=new yo}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}Mo.prototype.isSpotLight=!0;const Ma=new de,ri=new M,qr=new M;class wo extends ds{constructor(){super(new pt(90,1,.5,500)),this._frameExtents=new q(4,2),this._viewportCount=6,this._viewports=[new He(2,1,1,1),new He(0,1,1,1),new He(3,1,1,1),new He(1,1,1,1),new He(3,0,1,1),new He(1,0,1,1)],this._cubeDirections=[new M(1,0,0),new M(-1,0,0),new M(0,0,1),new M(0,0,-1),new M(0,1,0),new M(0,-1,0)],this._cubeUps=[new M(0,1,0),new M(0,1,0),new M(0,1,0),new M(0,1,0),new M(0,0,1),new M(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ri.setFromMatrixPosition(e.matrixWorld),n.position.copy(ri),qr.copy(n.position),qr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(qr),n.updateMatrixWorld(),i.makeTranslation(-ri.x,-ri.y,-ri.z),Ma.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ma)}}wo.prototype.isPointLightShadow=!0;class ir extends Ft{constructor(e,t,n=0,i=1){super(e,t),this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new wo}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}ir.prototype.isPointLight=!0;class _i extends is{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}_i.prototype.isOrthographicCamera=!0;class bo extends ds{constructor(){super(new _i(-5,5,5,-5,.5,500))}}bo.prototype.isDirectionalLightShadow=!0;class ts extends Ft{constructor(e,t){super(e,t),this.type="DirectionalLight",this.position.copy(Ie.DefaultUp),this.updateMatrix(),this.target=new Ie,this.shadow=new bo}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}ts.prototype.isDirectionalLight=!0;class So extends Ft{constructor(e,t){super(e,t),this.type="AmbientLight"}}So.prototype.isAmbientLight=!0;class Pf extends Ft{constructor(e,t,n=10,i=10){super(e,t),this.type="RectAreaLight",this.width=n,this.height=i}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}Pf.prototype.isRectAreaLight=!0;class To{constructor(){this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new M)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,r=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScaledVector(a[1],.488603*i),t.addScaledVector(a[2],.488603*r),t.addScaledVector(a[3],.488603*n),t.addScaledVector(a[4],1.092548*(n*i)),t.addScaledVector(a[5],1.092548*(i*r)),t.addScaledVector(a[6],.315392*(3*r*r-1)),t.addScaledVector(a[7],1.092548*(n*r)),t.addScaledVector(a[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,r=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScaledVector(a[1],2*.511664*i),t.addScaledVector(a[2],2*.511664*r),t.addScaledVector(a[3],2*.511664*n),t.addScaledVector(a[4],2*.429043*n*i),t.addScaledVector(a[5],2*.429043*i*r),t.addScaledVector(a[6],.743125*r*r-.247708),t.addScaledVector(a[7],2*.429043*n*r),t.addScaledVector(a[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}}To.prototype.isSphericalHarmonics3=!0;class fs extends Ft{constructor(e=new To,t=1){super(void 0,t),this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}fs.prototype.isLightProbe=!0;class Df{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.substr(0,t+1)}}class Ff extends De{constructor(){super(),this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new this.constructor().copy(this)}toJSON(){const e=super.toJSON(this);return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}Ff.prototype.isInstancedBufferGeometry=!0;class If extends je{constructor(e,t,n,i){typeof n=="number"&&(i=n,n=!1,console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")),super(e,t,n),this.meshPerAttribute=i||1}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}If.prototype.isInstancedBufferAttribute=!0;class Bf extends tn{constructor(e){super(e),typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Hn.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){Hn.add(e,l),t&&t(l),r.manager.itemEnd(e)}).catch(function(l){i&&i(l),r.manager.itemError(e),r.manager.itemEnd(e)}),r.manager.itemStart(e)}}Bf.prototype.isImageBitmapLoader=!0;let ji;const Eo={getContext:function(){return ji===void 0&&(ji=new(window.AudioContext||window.webkitAudioContext)),ji},setContext:function(s){ji=s}};class Nf extends tn{constructor(e){super(e)}load(e,t,n,i){const r=this,a=new xf(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{const l=o.slice(0);Eo.getContext().decodeAudioData(l,function(h){t(h)})}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}}class zf extends fs{constructor(e,t,n=1){super(void 0,n);const i=new le().set(e),r=new le().set(t),a=new M(i.r,i.g,i.b),o=new M(r.r,r.g,r.b),l=Math.sqrt(Math.PI),c=l*Math.sqrt(.75);this.sh.coefficients[0].copy(a).add(o).multiplyScalar(l),this.sh.coefficients[1].copy(a).sub(o).multiplyScalar(c)}}zf.prototype.isHemisphereLightProbe=!0;class Gf extends fs{constructor(e,t=1){super(void 0,t);const n=new le().set(e);this.sh.coefficients[0].set(n.r,n.g,n.b).multiplyScalar(2*Math.sqrt(Math.PI))}}Gf.prototype.isAmbientLightProbe=!0;class Ao{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=wa(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=wa();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function wa(){return(typeof performance>"u"?Date:performance).now()}const cn=new M,ba=new at,Uf=new M,hn=new M;class Of extends Ie{constructor(){super(),this.type="AudioListener",this.context=Eo.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Ao}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(cn,ba,Uf),hn.set(0,0,-1).applyQuaternion(ba),t.positionX){const i=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(cn.x,i),t.positionY.linearRampToValueAtTime(cn.y,i),t.positionZ.linearRampToValueAtTime(cn.z,i),t.forwardX.linearRampToValueAtTime(hn.x,i),t.forwardY.linearRampToValueAtTime(hn.y,i),t.forwardZ.linearRampToValueAtTime(hn.z,i),t.upX.linearRampToValueAtTime(n.x,i),t.upY.linearRampToValueAtTime(n.y,i),t.upZ.linearRampToValueAtTime(n.z,i)}else t.setPosition(cn.x,cn.y,cn.z),t.setOrientation(hn.x,hn.y,hn.z,n.x,n.y,n.z)}}class Hf extends Ie{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source.stop(),this.source.onended=null,this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){if(this.detune=e,this.source.detune!==void 0)return this.isPlaying===!0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}class kf{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){at.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const a=this._workIndex*r;at.multiplyQuaternionsFlat(e,a,e,t,e,n),at.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){const a=1-i;for(let o=0;o!==r;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const ps="\\[\\]\\.:\\/",Vf=new RegExp("["+ps+"]","g"),ms="[^"+ps+"]",Wf="[^"+ps.replace("\\.","")+"]",qf=/((?:WC+[\/:])*)/.source.replace("WC",ms),Xf=/(WCOD+)?/.source.replace("WCOD",Wf),Yf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ms),Zf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ms),jf=new RegExp("^"+qf+Xf+Yf+Zf+"$"),Jf=["material","materials","bones"];class Qf{constructor(e,t,n){const i=n||Oe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Oe{constructor(e,t,n){this.path=t,this.parsedPath=n||Oe.parseTrackName(t),this.node=Oe.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Oe.Composite(e,t,n):new Oe(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Vf,"")}static parseTrackName(e){const t=jf.exec(e);if(!t)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Jf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(!t||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.node[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Oe.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(e.geometry.isBufferGeometry){if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}else{console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.",this);return}}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Oe.Composite=Qf;Oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Oe.prototype.GetterByBindingType=[Oe.prototype._getValue_direct,Oe.prototype._getValue_array,Oe.prototype._getValue_arrayElement,Oe.prototype._getValue_toArray];Oe.prototype.SetterByBindingTypeAndVersioning=[[Oe.prototype._setValue_direct,Oe.prototype._setValue_direct_setNeedsUpdate,Oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Oe.prototype._setValue_array,Oe.prototype._setValue_array_setNeedsUpdate,Oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Oe.prototype._setValue_arrayElement,Oe.prototype._setValue_arrayElement_setNeedsUpdate,Oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Oe.prototype._setValue_fromArray,Oe.prototype._setValue_fromArray_setNeedsUpdate,Oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class $f{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,a=r.length,o=new Array(a),l={endingStart:2400,endingEnd:2400};for(let c=0;c!==a;++c){const h=r[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=2201,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;if(l<0||n===0)return;this._startTime=null,t=n*l}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case 2501:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case 2500:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const a=n===2202;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===2200){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=2401,i.endingEnd=2401):(e?i.endingStart=this.zeroSlopeAtStart?2401:2400:i.endingStart=2402,t?i.endingEnd=this.zeroSlopeAtEnd?2401:2400:i.endingEnd=2402)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}}class Kf extends pn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==r;++d){const u=i[d],f=u.name;let p=h[f];if(p!==void 0)a[d]=p;else{if(p=a[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const v=t&&t._propertyBindings[d].binding.parsedPath;p=new kf(Oe.create(n,f,v),u.ValueTypeName,u.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[d]=p}o[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const d=o.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new uo(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let a=typeof e=="string"?ga.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=2500),l!==void 0){const d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new $f(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,r),h}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?ga.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}Kf.prototype._controlInterpolantsResultBuffer=new Float32Array(1);class ep extends gn{constructor(e,t,n=1){super(e,t),this.meshPerAttribute=n||1}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}ep.prototype.isInstancedInterleavedBuffer=!0;class tp extends Ie{constructor(e){super(),this.material=e,this.render=function(){},this.hasPositions=!1,this.hasNormals=!1,this.hasColors=!1,this.hasUvs=!1,this.positionArray=null,this.normalArray=null,this.colorArray=null,this.uvArray=null,this.count=0}}tp.prototype.isImmediateRenderObject=!0;const jt=new M,Ji=new de,Xr=new de;class np extends as{constructor(e){const t=Lo(e),n=new De,i=[],r=[],a=new le(0,0,1),o=new le(0,1,0);for(let c=0;c<t.length;c++){const h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(a.r,a.g,a.b),r.push(o.r,o.g,o.b))}n.setAttribute("position",new Fe(i,3)),n.setAttribute("color",new Fe(r,3));const l=new vi({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.type="SkeletonHelper",this.isSkeletonHelper=!0,this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Xr.copy(this.root.matrixWorld).invert();for(let r=0,a=0;r<t.length;r++){const o=t[r];o.parent&&o.parent.isBone&&(Ji.multiplyMatrices(Xr,o.matrixWorld),jt.setFromMatrixPosition(Ji),i.setXYZ(a,jt.x,jt.y,jt.z),Ji.multiplyMatrices(Xr,o.parent.matrixWorld),jt.setFromMatrixPosition(Ji),i.setXYZ(a+1,jt.x,jt.y,jt.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}}function Lo(s){const e=[];s&&s.isBone&&e.push(s);for(let t=0;t<s.children.length;t++)e.push.apply(e,Lo(s.children[t]));return e}class ip extends as{constructor(e=10,t=10,n=4473924,i=8947848){n=new le(n),i=new le(i);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let u=0,f=0,p=-o;u<=t;u++,p+=a){l.push(-o,0,p,o,0,p),l.push(p,0,-o,p,0,o);const v=u===r?n:i;v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3}const h=new De;h.setAttribute("position",new Fe(l,3)),h.setAttribute("color",new Fe(c,3));const d=new vi({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}}const rp=new Float32Array(1);new Int32Array(rp.buffer);const Un=4,$t=8,Ct=Math.pow(2,$t),Co=[.125,.215,.35,.446,.526,.582],Ro=$t-Un+1+Co.length,In=20,Dt={3e3:0,3001:1,3002:2,3004:3,3005:4,3006:5,3007:6},dn=new gi({side:1,depthWrite:!1,depthTest:!1}),sp=new oe(new Ge,dn),Yr=new _i,{_lodPlanes:si,_sizeLods:Sa,_sigmas:Qi}=lp(),Ta=new le;let Zr=null;const fn=(1+Math.sqrt(5))/2,Bn=1/fn,Ea=[new M(1,1,1),new M(-1,1,1),new M(1,1,-1),new M(-1,1,-1),new M(0,fn,Bn),new M(0,fn,-Bn),new M(Bn,0,fn),new M(-Bn,0,fn),new M(fn,Bn,0),new M(-fn,Bn,0)];function Aa(s){const e=Math.max(s.r,s.g,s.b),t=Math.min(Math.max(Math.ceil(Math.log2(e)),-128),127);return s.multiplyScalar(Math.pow(2,-t)),(t+128)/255}class ap{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._blurMaterial=cp(In),this._equirectShader=null,this._cubemapShader=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Zr=this._renderer.getRenderTarget();const r=this._allocateTargets();return this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e){return this._fromTexture(e)}fromCubemap(e){return this._fromTexture(e)}compileCubemapShader(){this._cubemapShader===null&&(this._cubemapShader=Ra(),this._compileMaterial(this._cubemapShader))}compileEquirectangularShader(){this._equirectShader===null&&(this._equirectShader=Ca(),this._compileMaterial(this._equirectShader))}dispose(){this._blurMaterial.dispose(),this._cubemapShader!==null&&this._cubemapShader.dispose(),this._equirectShader!==null&&this._equirectShader.dispose();for(let e=0;e<si.length;e++)si[e].dispose()}_cleanup(e){this._pingPongRenderTarget.dispose(),this._renderer.setRenderTarget(Zr),e.scissorTest=!1,$i(e,0,0,e.width,e.height)}_fromTexture(e){Zr=this._renderer.getRenderTarget();const t=this._allocateTargets(e);return this._textureToCubeUV(e,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(e){const t={magFilter:1003,minFilter:1003,generateMipmaps:!1,type:1009,format:1023,encoding:op(e)?e.encoding:3002,depthBuffer:!1},n=La(t);return n.depthBuffer=!e,this._pingPongRenderTarget=La(t),n}_compileMaterial(e){const t=new oe(si[0],e);this._renderer.compile(t,Yr)}_sceneToCubeUV(e,t,n,i){const o=new pt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.outputEncoding,f=h.toneMapping;h.getClearColor(Ta),h.toneMapping=0,h.outputEncoding=3e3,h.autoClear=!1;let p=!1;const v=e.background;if(v){if(v.isColor){dn.color.copy(v).convertSRGBToLinear(),e.background=null;const x=Aa(dn.color);dn.opacity=x,p=!0}}else{dn.color.copy(Ta).convertSRGBToLinear();const x=Aa(dn.color);dn.opacity=x,p=!0}for(let x=0;x<6;x++){const m=x%3;m==0?(o.up.set(0,l[x],0),o.lookAt(c[x],0,0)):m==1?(o.up.set(0,0,l[x]),o.lookAt(0,c[x],0)):(o.up.set(0,l[x],0),o.lookAt(0,0,c[x])),$i(i,m*Ct,x>2?Ct:0,Ct,Ct),h.setRenderTarget(i),p&&h.render(sp,o),h.render(e,o)}h.toneMapping=f,h.outputEncoding=u,h.autoClear=d}_textureToCubeUV(e,t){const n=this._renderer;e.isCubeTexture?this._cubemapShader==null&&(this._cubemapShader=Ra()):this._equirectShader==null&&(this._equirectShader=Ca());const i=e.isCubeTexture?this._cubemapShader:this._equirectShader,r=new oe(si[0],i),a=i.uniforms;a.envMap.value=e,e.isCubeTexture||a.texelSize.value.set(1/e.image.width,1/e.image.height),a.inputEncoding.value=Dt[e.encoding],a.outputEncoding.value=Dt[t.texture.encoding],$i(t,0,0,3*Ct,2*Ct),n.setRenderTarget(t),n.render(r,Yr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<Ro;i++){const r=Math.sqrt(Qi[i]*Qi[i]-Qi[i-1]*Qi[i-1]),a=Ea[(i-1)%Ea.length];this._blur(e,i-1,i,r,a)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new oe(si[i],c),u=c.uniforms,f=Sa[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*In-1),v=r/p,x=isFinite(r)?1+Math.floor(h*v):In;x>In&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${In}`);const m=[];let g=0;for(let _=0;_<In;++_){const D=_/v,I=Math.exp(-D*D/2);m.push(I),_==0?g+=I:_<x&&(g+=2*I)}for(let _=0;_<m.length;_++)m[_]=m[_]/g;u.envMap.value=e.texture,u.samples.value=x,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o),u.dTheta.value=p,u.mipInt.value=$t-n,u.inputEncoding.value=Dt[e.texture.encoding],u.outputEncoding.value=Dt[e.texture.encoding];const T=Sa[i],S=3*Math.max(0,Ct-2*T),E=(i===0?0:2*Ct)+2*T*(i>$t-Un?i-$t+Un:0);$i(t,S,E,3*T,2*T),l.setRenderTarget(t),l.render(d,Yr)}}function op(s){return s===void 0||s.type!==1009?!1:s.encoding===3e3||s.encoding===3001||s.encoding===3007}function lp(){const s=[],e=[],t=[];let n=$t;for(let i=0;i<Ro;i++){const r=Math.pow(2,n);e.push(r);let a=1/r;i>$t-Un?a=Co[i-$t+Un-1]:i==0&&(a=0),t.push(a);const o=1/(r-1),l=-o/2,c=1+o/2,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,p=2,v=1,x=new Float32Array(f*u*d),m=new Float32Array(p*u*d),g=new Float32Array(v*u*d);for(let S=0;S<d;S++){const E=S%3*2/3-1,_=S>2?0:-1,D=[E,_,0,E+2/3,_,0,E+2/3,_+1,0,E,_,0,E+2/3,_+1,0,E,_+1,0];x.set(D,f*u*S),m.set(h,p*u*S);const I=[S,S,S,S,S,S];g.set(I,v*u*S)}const T=new De;T.setAttribute("position",new je(x,f)),T.setAttribute("uv",new je(m,p)),T.setAttribute("faceIndex",new je(g,v)),s.push(T),n>Un&&n--}return{_lodPlanes:s,_sizeLods:e,_sigmas:t}}function La(s){const e=new xt(3*Ct,3*Ct,s);return e.texture.mapping=306,e.texture.name="PMREM.cubeUv",e.scissorTest=!0,e}function $i(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function cp(s){const e=new Float32Array(s),t=new M(0,1,0);return new hr({name:"SphericalGaussianBlur",defines:{n:s},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:e},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:t},inputEncoding:{value:Dt[3e3]},outputEncoding:{value:Dt[3e3]}},vertexShader:gs(),fragmentShader:`

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

			${vs()}

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

				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ca(){const s=new q(1,1);return new hr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null},texelSize:{value:s},inputEncoding:{value:Dt[3e3]},outputEncoding:{value:Dt[3e3]}},vertexShader:gs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform vec2 texelSize;

			${vs()}

			#include <common>

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				vec2 f = fract( uv / texelSize - 0.5 );
				uv -= f * texelSize;
				vec3 tl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.x += texelSize.x;
				vec3 tr = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.y += texelSize.y;
				vec3 br = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.x -= texelSize.x;
				vec3 bl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;

				vec3 tm = mix( tl, tr, f.x );
				vec3 bm = mix( bl, br, f.x );
				gl_FragColor.rgb = mix( tm, bm, f.y );

				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ra(){return new hr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},inputEncoding:{value:Dt[3e3]},outputEncoding:{value:Dt[3e3]}},vertexShader:gs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			${vs()}

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb = envMapTexelToLinear( textureCube( envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ) ) ).rgb;
				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function gs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 position;
		attribute vec2 uv;
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
	`}function vs(){return`

		uniform int inputEncoding;
		uniform int outputEncoding;

		#include <encodings_pars_fragment>

		vec4 inputTexelToLinear( vec4 value ) {

			if ( inputEncoding == 0 ) {

				return value;

			} else if ( inputEncoding == 1 ) {

				return sRGBToLinear( value );

			} else if ( inputEncoding == 2 ) {

				return RGBEToLinear( value );

			} else if ( inputEncoding == 3 ) {

				return RGBMToLinear( value, 7.0 );

			} else if ( inputEncoding == 4 ) {

				return RGBMToLinear( value, 16.0 );

			} else if ( inputEncoding == 5 ) {

				return RGBDToLinear( value, 256.0 );

			} else {

				return GammaToLinear( value, 2.2 );

			}

		}

		vec4 linearToOutputTexel( vec4 value ) {

			if ( outputEncoding == 0 ) {

				return value;

			} else if ( outputEncoding == 1 ) {

				return LinearTosRGB( value );

			} else if ( outputEncoding == 2 ) {

				return LinearToRGBE( value );

			} else if ( outputEncoding == 3 ) {

				return LinearToRGBM( value, 7.0 );

			} else if ( outputEncoding == 4 ) {

				return LinearToRGBM( value, 16.0 );

			} else if ( outputEncoding == 5 ) {

				return LinearToRGBD( value, 256.0 );

			} else {

				return LinearToGamma( value, 2.2 );

			}

		}

		vec4 envMapTexelToLinear( vec4 color ) {

			return inputTexelToLinear( color );

		}
	`}_t.create=function(s,e){return console.log("THREE.Curve.create() has been deprecated"),s.prototype=Object.create(_t.prototype),s.prototype.constructor=s,s.prototype.getPoint=e,s};es.prototype.fromPoints=function(s){return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."),this.setFromPoints(s)};ip.prototype.setColors=function(){console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")};np.prototype.update=function(){console.error("THREE.SkeletonHelper: update() no longer needs to be called.")};tn.prototype.extractUrlBase=function(s){return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."),Df.extractUrlBase(s)};tn.Handlers={add:function(){console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")},get:function(){console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")}};yt.prototype.center=function(s){return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),this.getCenter(s)};yt.prototype.empty=function(){return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),this.isEmpty()};yt.prototype.isIntersectionBox=function(s){return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(s)};yt.prototype.isIntersectionSphere=function(s){return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(s)};yt.prototype.size=function(s){return console.warn("THREE.Box3: .size() has been renamed to .getSize()."),this.getSize(s)};Wn.prototype.empty=function(){return console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."),this.isEmpty()};ar.prototype.setFromMatrix=function(s){return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."),this.setFromProjectionMatrix(s)};st.prototype.flattenToArrayOffset=function(s,e){return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(s,e)};st.prototype.multiplyVector3=function(s){return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),s.applyMatrix3(this)};st.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")};st.prototype.applyToBufferAttribute=function(s){return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."),s.applyMatrix3(this)};st.prototype.applyToVector3Array=function(){console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")};st.prototype.getInverse=function(s){return console.warn("THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(s).invert()};de.prototype.extractPosition=function(s){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(s)};de.prototype.flattenToArrayOffset=function(s,e){return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(s,e)};de.prototype.getPosition=function(){return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."),new M().setFromMatrixColumn(this,3)};de.prototype.setRotationFromQuaternion=function(s){return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),this.makeRotationFromQuaternion(s)};de.prototype.multiplyToArray=function(){console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")};de.prototype.multiplyVector3=function(s){return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};de.prototype.multiplyVector4=function(s){return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};de.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")};de.prototype.rotateAxis=function(s){console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),s.transformDirection(this)};de.prototype.crossVector=function(s){return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};de.prototype.translate=function(){console.error("THREE.Matrix4: .translate() has been removed.")};de.prototype.rotateX=function(){console.error("THREE.Matrix4: .rotateX() has been removed.")};de.prototype.rotateY=function(){console.error("THREE.Matrix4: .rotateY() has been removed.")};de.prototype.rotateZ=function(){console.error("THREE.Matrix4: .rotateZ() has been removed.")};de.prototype.rotateByAxis=function(){console.error("THREE.Matrix4: .rotateByAxis() has been removed.")};de.prototype.applyToBufferAttribute=function(s){return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};de.prototype.applyToVector3Array=function(){console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")};de.prototype.makeFrustum=function(s,e,t,n,i,r){return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."),this.makePerspective(s,e,n,t,i,r)};de.prototype.getInverse=function(s){return console.warn("THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(s).invert()};Rt.prototype.isIntersectionLine=function(s){return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."),this.intersectsLine(s)};at.prototype.multiplyVector3=function(s){return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),s.applyQuaternion(this)};at.prototype.inverse=function(){return console.warn("THREE.Quaternion: .inverse() has been renamed to invert()."),this.invert()};qn.prototype.isIntersectionBox=function(s){return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(s)};qn.prototype.isIntersectionPlane=function(s){return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."),this.intersectsPlane(s)};qn.prototype.isIntersectionSphere=function(s){return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(s)};Ke.prototype.area=function(){return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),this.getArea()};Ke.prototype.barycoordFromPoint=function(s,e){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),this.getBarycoord(s,e)};Ke.prototype.midpoint=function(s){return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."),this.getMidpoint(s)};Ke.prototypenormal=function(s){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),this.getNormal(s)};Ke.prototype.plane=function(s){return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."),this.getPlane(s)};Ke.barycoordFromPoint=function(s,e,t,n,i){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),Ke.getBarycoord(s,e,t,n,i)};Ke.normal=function(s,e,t,n){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),Ke.getNormal(s,e,t,n)};us.prototype.extractAllPoints=function(s){return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."),this.extractPoints(s)};us.prototype.extrude=function(s){return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."),new cr(this,s)};us.prototype.makeGeometry=function(s){return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."),new ef(this,s)};q.prototype.fromAttribute=function(s,e,t){return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(s,e,t)};q.prototype.distanceToManhattan=function(s){return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(s)};q.prototype.lengthManhattan=function(){return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};M.prototype.setEulerFromRotationMatrix=function(){console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")};M.prototype.setEulerFromQuaternion=function(){console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")};M.prototype.getPositionFromMatrix=function(s){return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),this.setFromMatrixPosition(s)};M.prototype.getScaleFromMatrix=function(s){return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),this.setFromMatrixScale(s)};M.prototype.getColumnFromMatrix=function(s,e){return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),this.setFromMatrixColumn(e,s)};M.prototype.applyProjection=function(s){return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."),this.applyMatrix4(s)};M.prototype.fromAttribute=function(s,e,t){return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(s,e,t)};M.prototype.distanceToManhattan=function(s){return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(s)};M.prototype.lengthManhattan=function(){return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};He.prototype.fromAttribute=function(s,e,t){return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(s,e,t)};He.prototype.lengthManhattan=function(){return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};Ie.prototype.getChildByName=function(s){return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),this.getObjectByName(s)};Ie.prototype.renderDepth=function(){console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")};Ie.prototype.translate=function(s,e){return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),this.translateOnAxis(e,s)};Ie.prototype.getWorldRotation=function(){console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")};Ie.prototype.applyMatrix=function(s){return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(s)};Object.defineProperties(Ie.prototype,{eulerOrder:{get:function(){return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order},set:function(s){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order=s}},useQuaternion:{get:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")}}});oe.prototype.setDrawMode=function(){console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")};Object.defineProperties(oe.prototype,{drawMode:{get:function(){return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."),0},set:function(){console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}});ao.prototype.initBones=function(){console.error("THREE.SkinnedMesh: initBones() has been removed.")};pt.prototype.setLens=function(s,e){console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."),e!==void 0&&(this.filmGauge=e),this.setFocalLength(s)};Object.defineProperties(Ft.prototype,{onlyShadow:{set:function(){console.warn("THREE.Light: .onlyShadow has been removed.")}},shadowCameraFov:{set:function(s){console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),this.shadow.camera.fov=s}},shadowCameraLeft:{set:function(s){console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."),this.shadow.camera.left=s}},shadowCameraRight:{set:function(s){console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."),this.shadow.camera.right=s}},shadowCameraTop:{set:function(s){console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."),this.shadow.camera.top=s}},shadowCameraBottom:{set:function(s){console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."),this.shadow.camera.bottom=s}},shadowCameraNear:{set:function(s){console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."),this.shadow.camera.near=s}},shadowCameraFar:{set:function(s){console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."),this.shadow.camera.far=s}},shadowCameraVisible:{set:function(){console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")}},shadowBias:{set:function(s){console.warn("THREE.Light: .shadowBias is now .shadow.bias."),this.shadow.bias=s}},shadowDarkness:{set:function(){console.warn("THREE.Light: .shadowDarkness has been removed.")}},shadowMapWidth:{set:function(s){console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."),this.shadow.mapSize.width=s}},shadowMapHeight:{set:function(s){console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."),this.shadow.mapSize.height=s}}});Object.defineProperties(je.prototype,{length:{get:function(){return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."),this.array.length}},dynamic:{get:function(){return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.usage===35048},set:function(){console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.setUsage(35048)}}});je.prototype.setDynamic=function(s){return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(s===!0?35048:35044),this};je.prototype.copyIndicesArray=function(){console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")},je.prototype.setArray=function(){console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")};De.prototype.addIndex=function(s){console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."),this.setIndex(s)};De.prototype.addAttribute=function(s,e){return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."),!(e&&e.isBufferAttribute)&&!(e&&e.isInterleavedBufferAttribute)?(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.setAttribute(s,new je(arguments[1],arguments[2]))):s==="index"?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(e),this):this.setAttribute(s,e)};De.prototype.addDrawCall=function(s,e,t){t!==void 0&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."),console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."),this.addGroup(s,e)};De.prototype.clearDrawCalls=function(){console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."),this.clearGroups()};De.prototype.computeOffsets=function(){console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")};De.prototype.removeAttribute=function(s){return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."),this.deleteAttribute(s)};De.prototype.applyMatrix=function(s){return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(s)};Object.defineProperties(De.prototype,{drawcalls:{get:function(){return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."),this.groups}},offsets:{get:function(){return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."),this.groups}}});gn.prototype.setDynamic=function(s){return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(s===!0?35048:35044),this};gn.prototype.setArray=function(){console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")};cr.prototype.getArrays=function(){console.error("THREE.ExtrudeGeometry: .getArrays() has been removed.")};cr.prototype.addShapeList=function(){console.error("THREE.ExtrudeGeometry: .addShapeList() has been removed.")};cr.prototype.addShape=function(){console.error("THREE.ExtrudeGeometry: .addShape() has been removed.")};io.prototype.dispose=function(){console.error("THREE.Scene: .dispose() has been removed.")};Object.defineProperties(nt.prototype,{wrapAround:{get:function(){console.warn("THREE.Material: .wrapAround has been removed.")},set:function(){console.warn("THREE.Material: .wrapAround has been removed.")}},overdraw:{get:function(){console.warn("THREE.Material: .overdraw has been removed.")},set:function(){console.warn("THREE.Material: .overdraw has been removed.")}},wrapRGB:{get:function(){return console.warn("THREE.Material: .wrapRGB has been removed."),new le}},shading:{get:function(){console.error("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead.")},set:function(s){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=s===1}},stencilMask:{get:function(){return console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask},set:function(s){console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask=s}}});Object.defineProperties(vt.prototype,{derivatives:{get:function(){return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives},set:function(s){console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives=s}}});Ve.prototype.clearTarget=function(s,e,t,n){console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."),this.setRenderTarget(s),this.clear(e,t,n)};Ve.prototype.animate=function(s){console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."),this.setAnimationLoop(s)};Ve.prototype.getCurrentRenderTarget=function(){return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."),this.getRenderTarget()};Ve.prototype.getMaxAnisotropy=function(){return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."),this.capabilities.getMaxAnisotropy()};Ve.prototype.getPrecision=function(){return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."),this.capabilities.precision};Ve.prototype.resetGLState=function(){return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."),this.state.reset()};Ve.prototype.supportsFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."),this.extensions.get("OES_texture_float")};Ve.prototype.supportsHalfFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."),this.extensions.get("OES_texture_half_float")};Ve.prototype.supportsStandardDerivatives=function(){return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."),this.extensions.get("OES_standard_derivatives")};Ve.prototype.supportsCompressedTextureS3TC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."),this.extensions.get("WEBGL_compressed_texture_s3tc")};Ve.prototype.supportsCompressedTexturePVRTC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."),this.extensions.get("WEBGL_compressed_texture_pvrtc")};Ve.prototype.supportsBlendMinMax=function(){return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."),this.extensions.get("EXT_blend_minmax")};Ve.prototype.supportsVertexTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."),this.capabilities.vertexTextures};Ve.prototype.supportsInstancedArrays=function(){return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."),this.extensions.get("ANGLE_instanced_arrays")};Ve.prototype.enableScissorTest=function(s){console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."),this.setScissorTest(s)};Ve.prototype.initMaterial=function(){console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")};Ve.prototype.addPrePlugin=function(){console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")};Ve.prototype.addPostPlugin=function(){console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")};Ve.prototype.updateShadowMap=function(){console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")};Ve.prototype.setFaceCulling=function(){console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")};Ve.prototype.allocTextureUnit=function(){console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")};Ve.prototype.setTexture=function(){console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")};Ve.prototype.setTexture2D=function(){console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")};Ve.prototype.setTextureCube=function(){console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")};Ve.prototype.getActiveMipMapLevel=function(){return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."),this.getActiveMipmapLevel()};Object.defineProperties(Ve.prototype,{shadowMapEnabled:{get:function(){return this.shadowMap.enabled},set:function(s){console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."),this.shadowMap.enabled=s}},shadowMapType:{get:function(){return this.shadowMap.type},set:function(s){console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."),this.shadowMap.type=s}},shadowMapCullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")}},context:{get:function(){return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."),this.getContext()}},vr:{get:function(){return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"),this.xr}},gammaInput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."),!1},set:function(){console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")}},gammaOutput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),!1},set:function(s){console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),this.outputEncoding=s===!0?3001:3e3}},toneMappingWhitePoint:{get:function(){return console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."),1},set:function(){console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.")}}});Object.defineProperties(to.prototype,{cullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")}},renderReverseSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")}},renderSingleSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")}}});Object.defineProperties(xt.prototype,{wrapS:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS},set:function(s){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS=s}},wrapT:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT},set:function(s){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT=s}},magFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter},set:function(s){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter=s}},minFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter},set:function(s){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter=s}},anisotropy:{get:function(){return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy},set:function(s){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy=s}},offset:{get:function(){return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset},set:function(s){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset=s}},repeat:{get:function(){return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat},set:function(s){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat=s}},format:{get:function(){return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format},set:function(s){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format=s}},type:{get:function(){return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type},set:function(s){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type=s}},generateMipmaps:{get:function(){return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps},set:function(s){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps=s}}});Hf.prototype.load=function(s){console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");const e=this;return new Nf().load(s,function(n){e.setBuffer(n)}),this};rs.prototype.updateCubeMap=function(s,e){return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),this.update(s,e)};rs.prototype.clear=function(s,e,t,n){return console.warn("THREE.CubeCamera: .clear() is now .renderTarget.clear()."),this.renderTarget.clear(s,e,t,n)};Vn.crossOrigin=void 0;Vn.loadTexture=function(s,e,t,n){console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");const i=new yf;i.setCrossOrigin(this.crossOrigin);const r=i.load(s,t,void 0,n);return e&&(r.mapping=e),r};Vn.loadTextureCube=function(s,e,t,n){console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");const i=new _f;i.setCrossOrigin(this.crossOrigin);const r=i.load(s,t,void 0,n);return e&&(r.mapping=e),r};Vn.loadCompressedTexture=function(){console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")};Vn.loadCompressedTextureCube=function(){console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"128"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="128");class xp{update(e){}}class _p{constructor(e){ae(this,"keys",new Set);ae(this,"keydown",e=>this.keys.add(e.code));ae(this,"keyup",e=>this.keys.delete(e.code));this.el=e,window.addEventListener("keydown",this.keydown),window.addEventListener("keyup",this.keyup)}isDown(e){return this.keys.has(e)}destroy(){window.removeEventListener("keydown",this.keydown),window.removeEventListener("keyup",this.keyup)}}var rr={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;

		}`};class yi{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}const hp=new _i(-1,1,1,-1,0,1),xs=new De;xs.setAttribute("position",new Fe([-1,3,0,-1,-1,0,3,-1,0],3));xs.setAttribute("uv",new Fe([0,2,0,0,2,0],2));class Po{constructor(e){this._mesh=new oe(xs,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,hp)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Pa extends yi{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof vt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ki.clone(e.uniforms),this.material=new vt({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Po(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}}class Da extends yi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class up extends yi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class dp{constructor(e,t){if(this.renderer=e,t===void 0){const n={minFilter:1006,magFilter:1006,format:1023},i=e.getSize(new q);this._pixelRatio=e.getPixelRatio(),this._width=i.width,this._height=i.height,t=new xt(this._width*this._pixelRatio,this._height*this._pixelRatio,n),t.texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],rr===void 0&&console.error("THREE.EffectComposer relies on CopyShader"),Pa===void 0&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new Pa(rr),this.clock=new Ao}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Da!==void 0&&(a instanceof Da?n=!0:a instanceof up&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new q);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}}new _i(-1,1,1,-1,0,1);const Do=new De;Do.setAttribute("position",new Fe([-1,3,0,-1,-1,0,3,-1,0],3));Do.setAttribute("uv",new Fe([0,2,0,0,2,0],2));class fp extends yi{constructor(e,t,n,i,r){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r!==void 0?r:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new le}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==void 0&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(e.getClearColor(this._oldClearColor),r=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor&&e.setClearColor(this._oldClearColor,r),this.overrideMaterial!==void 0&&(this.scene.overrideMaterial=a),e.autoClear=i}}const Fa={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new le(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class kn extends yi{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new q(e.x,e.y):new q(256,256),this.clearColor=new le(0,0,0);const r={minFilter:1006,magFilter:1006,format:1023};this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new xt(a,o,r),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new xt(a,o,r);f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const p=new xt(a,o,r);p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),a=Math.round(a/2),o=Math.round(o/2)}Fa===void 0&&console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");const l=Fa;this.highPassUniforms=Ki.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new vt({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader,defines:{}}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.texSize.value=new q(a,o),a=Math.round(a/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new M(1,1,1),new M(1,1,1),new M(1,1,1),new M(1,1,1),new M(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,rr===void 0&&console.error("THREE.UnrealBloomPass relies on CopyShader");const d=rr;this.copyUniforms=Ki.clone(d.uniforms),this.copyUniforms.opacity.value=1,this.materialCopy=new vt({uniforms:this.copyUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new le,this.oldClearAlpha=1,this.basic=new gi,this.fsQuad=new Po(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.texSize.value=new q(n,i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=kn.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=kn.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){return new vt({defines:{KERNEL_RADIUS:e,SIGMA:e},uniforms:{colorTexture:{value:null},texSize:{value:new q(.5,.5)},direction:{value:new q(.5,.5)}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new vt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},dirtTexture:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform sampler2D dirtTexture;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}kn.BlurDirectionX=new q(1,0);kn.BlurDirectionY=new q(0,1);class yp{constructor(e,t,n){ae(this,"composer");ae(this,"renderPass");ae(this,"bloom");ae(this,"useComposer",!0);this.scene=e,this.camera=t,this.renderer=n,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.2,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=2;try{this.renderer.outputColorSpace="srgb"}catch{try{this.renderer.outputEncoding=3001}catch{console.warn("Could not set output color space/encoding")}}try{this.composer=new dp(this.renderer),this.renderPass=new fp(this.scene,this.camera),this.composer.addPass(this.renderPass);const i=new q;this.renderer.getSize(i),this.bloom=new kn(new q(i.x,i.y),.5,1,.2),this.composer.addPass(this.bloom),this.useComposer=!0}catch(i){console.warn("Post-processing setup failed, falling back to direct rendering:",i),this.useComposer=!1}}render(){this.renderer.render(this.scene,this.camera)}updateSize(e,t){var n;try{this.useComposer&&this.composer&&(this.composer.setSize(e,t),(n=this.bloom)==null||n.setSize(e,t))}catch(i){console.warn("Post-processing resize failed:",i)}}}class Mp{constructor(e,t=new M(0,2,-4)){ae(this,"targetPos",new M);ae(this,"targetLook",new M);ae(this,"current",new M);ae(this,"baseFov",60);ae(this,"boostVisual",0);this.camera=e,this.offset=t}update(e,t){const n=new at().setFromEuler(new mn(0,t.rotation.y,0)),i=this.offset.clone().applyQuaternion(n);this.targetPos.copy(t.position).add(i),this.targetLook.copy(t.position).add(new M(0,.7,0));const r=1-Math.pow(.001,e);this.current.lerp(this.targetPos,r),this.current.lengthSq()===0&&this.current.copy(this.targetPos);const a=.03*this.boostVisual;a>0?this.camera.position.set(this.current.x+(Math.random()-.5)*a,this.current.y+(Math.random()-.5)*a*.5,this.current.z+(Math.random()-.5)*a):this.camera.position.copy(this.current),this.camera.lookAt(this.targetLook);const o=this.baseFov+6*this.boostVisual;this.camera.fov+=(o-this.camera.fov)*Math.min(1,10*e),this.camera.updateProjectionMatrix()}setBoostVisual(e){this.boostVisual=tt.clamp(e,0,1)}}class wp{constructor(e,t=2201331){ae(this,"group",new rt);ae(this,"visuals",new rt);ae(this,"velocity",new M);ae(this,"heading",0);ae(this,"steering",0);ae(this,"throttle",0);ae(this,"brake",0);ae(this,"handbrake",!1);ae(this,"boost",!1);ae(this,"boostCharge",1);ae(this,"tmp",new M);ae(this,"wheels",null);ae(this,"headlights",[]);ae(this,"brakelights",[]);ae(this,"headlightSpots",[]);ae(this,"tailLightPoints",[]);ae(this,"reverseLights",[]);ae(this,"reverseLightPoints",[]);ae(this,"prevForwardSpeed",0);this.config=e,this.group.add(this.visuals);const i=(r=>new Ue({color:r,metalness:.95,roughness:.08,envMapIntensity:2.2}))(t);this.createBodyPanels(i),this.createWindows(),this.createGrille(),this.createDetails(),this.createRealisticWheels(),this.createLightingSystem()}createBodyPanels(e){const t=new Ge(1.24,.36,2.6);t.parameters.widthSegments=3,t.parameters.heightSegments=2,t.parameters.depthSegments=4;const n=new oe(t,e);n.castShadow=!0,n.receiveShadow=!0,n.position.y=.32,this.visuals.add(n);const i=new Ge(1.1,.08,.9),r=new oe(i,e);r.position.set(0,.52,.95),r.castShadow=!0,r.receiveShadow=!0,this.visuals.add(r);const a=v=>{const x=new Ge(.04,.28,.8),m=new oe(x,e);return m.position.set(v*.64,.38,.1),m.castShadow=!0,m.receiveShadow=!0,m},o=a(-1),l=a(1);this.visuals.add(o,l);const c=e.clone(),h=(v,x)=>{const m=new Ge(.18,.22,.6),g=new oe(m,c);return g.position.set(v,.36,x),g.castShadow=!0,g.receiveShadow=!0,g};this.visuals.add(h(-.68,.9),h(.68,.9),h(-.68,-.9),h(.68,-.9));const d=new Ue({color:1710618,metalness:.3,roughness:.8}),u=new oe(new Ge(1.15,.2,.28),d);u.position.set(0,.26,1.32),u.castShadow=!0,u.receiveShadow=!0;const f=new oe(new Ge(1.12,.2,.28),d);f.position.set(0,.26,-1.32),f.castShadow=!0,f.receiveShadow=!0,this.visuals.add(u,f);const p=v=>{const x=new oe(new Ge(.08,.12,1.8),d);return x.position.set(v*.66,.22,0),x.castShadow=!0,x.receiveShadow=!0,x};this.visuals.add(p(-1),p(1))}createWindows(){const e=new Ue({color:8900331,metalness:0,roughness:0,transparent:!0,opacity:.25,envMapIntensity:3}),t=new oe(new Ge(.98,.32,1.1),e);t.position.set(0,.58,-.05),t.castShadow=!0,t.receiveShadow=!0,this.visuals.add(t);const n=new Ue({color:2763306,metalness:.8,roughness:.2}),i=r=>{const a=new oe(new Ge(.04,.35,.08),n);return a.position.set(r*.52,.58,.46),a.castShadow=!0,a};this.visuals.add(i(-1),i(1))}createGrille(){const e=new Ue({color:1710618,metalness:.7,roughness:.3}),t=new oe(new Ge(.8,.15,.05),e);t.position.set(0,.32,1.28),t.castShadow=!0,t.receiveShadow=!0,this.visuals.add(t);for(let n=0;n<6;n++){const i=new oe(new Ge(.02,.12,.02),e);i.position.set(-.3+n*.12,.32,1.3),i.castShadow=!0,this.visuals.add(i)}}createDetails(){const e=new Ue({color:13421772,metalness:.95,roughness:.05,envMapIntensity:2.5}),t=new Ue({color:2763306,metalness:.1,roughness:.9}),n=p=>{const v=new oe(new Ge(.08,.06,.1),t);v.position.set(p*.65,.55,.35);const x=new oe(new Ge(.06,.04,.02),e);return x.position.set(p*.68,.55,.35),v.castShadow=!0,x.castShadow=!0,[v,x]},[i,r]=n(-1),[a,o]=n(1);this.visuals.add(i,r,a,o);const l=p=>{const v=new oe(new Ge(.02,.03,.08),e);return v.position.set(p*.64,.4,.2),v.castShadow=!0,v};this.visuals.add(l(-1),l(1));const c=new Ue({color:16777215,metalness:0,roughness:.7}),h=new oe(new Ge(.3,.15,.02),c);h.position.set(0,.22,1.35),h.castShadow=!0;const d=new oe(new Ge(.3,.15,.02),c);d.position.set(0,.22,-1.35),d.castShadow=!0,this.visuals.add(h,d);const u=new Ue({color:1710618,metalness:.4,roughness:.6}),f=p=>{const v=new oe(new Ge(.01,.01,.25),u);return v.position.set(p*.15,.75,.3),v.castShadow=!0,v};this.visuals.add(f(-1),f(1))}createRealisticWheels(){const t=(()=>{const h=new Ue({color:1710618,roughness:.95,metalness:0}),d=document.createElement("canvas");d.width=d.height=128;const u=d.getContext("2d");u.fillStyle="#1a1a1a",u.fillRect(0,0,128,128),u.strokeStyle="#0f0f0f",u.lineWidth=2;for(let p=0;p<128;p+=8)u.beginPath(),u.moveTo(0,p),u.lineTo(128,p),u.stroke();const f=new Nn(d);return f.wrapS=f.wrapT=1e3,f.repeat.set(4,4),h.map=f,h})(),n=new Ue({color:13684944,metalness:.95,roughness:.08,envMapIntensity:2.2}),i=new Ue({color:4473924,metalness:.8,roughness:.2}),r=new Ue({color:16724787,metalness:.3,roughness:.7}),a=()=>{const h=new rt,d=new oe(new Gn(.32,.32,.2,24),t);d.rotation.z=Math.PI/2,d.castShadow=!0,d.receiveShadow=!0;const u=new oe(new Gn(.15,.15,.22,16),n);u.rotation.z=Math.PI/2,u.castShadow=!0;for(let v=0;v<5;v++){const x=v/5*Math.PI*2,m=new oe(new Ge(.02,.24,.02),n);m.position.set(Math.cos(x)*.08,Math.sin(x)*.08,0),m.rotation.z=x,m.castShadow=!0,u.add(m)}const f=new oe(new Gn(.25,.25,.02,32),i);f.rotation.z=Math.PI/2,f.position.z=-.08,f.castShadow=!0;const p=new oe(new Ge(.08,.12,.04),r);return p.position.set(0,.2,-.05),p.castShadow=!0,h.add(d,u,f,p),h},o={fl:new rt,fr:new rt,rl:new rt,rr:new rt};Object.values(o).forEach(h=>{const d=a();h.add(d)});const l=.72,c=1.25;o.fl.position.set(-l,.32,c),o.fr.position.set(l,.32,c),o.rl.position.set(-l,.32,-c),o.rr.position.set(l,.32,-c),this.visuals.add(o.fl,o.fr,o.rl,o.rr),this.wheels=o}createLightingSystem(){const e=new Ue({color:16777215,emissive:16777215,emissiveIntensity:4,metalness:.1,roughness:0,transparent:!0,opacity:.95}),t=new Ue({color:8912896,emissive:16719904,emissiveIntensity:0,metalness:0,roughness:.1,transparent:!0,opacity:.9}),n=x=>{const m=new rt,g=new oe(new er(.09,16,8),e),T=new oe(new Kd(.07,.09,16),e.clone());return T.position.z=.01,m.add(g,T),m.position.set(x*.35,.32,1.28),{group:m,lens:g}},i=n(-1),r=n(1);this.visuals.add(i.group,r.group),this.headlights=[i.lens,r.lens];const a=x=>{const m=new rt,g=new oe(new Ge(.2,.15,.03),t.clone()),T=new oe(new Ge(.08,.06,.02),new Ue({color:16746496,emissive:16746496,emissiveIntensity:0,transparent:!0,opacity:.8}));return T.position.set(x*.1,.05,.01),m.add(g,T),m.position.set(x*.38,.32,-1.28),{group:m,brake:g,turn:T}},o=a(-1),l=a(1);this.visuals.add(o.group,l.group),this.brakelights=[o.brake,l.brake];const c=new Ue({color:16777215,emissive:16777215,emissiveIntensity:0,metalness:0,roughness:.2,transparent:!0,opacity:.85}),h=x=>{const m=new oe(new Ge(.12,.08,.02),c.clone());return m.position.set(x*.15,.25,-1.29),m},d=h(-1),u=h(1);this.visuals.add(d,u),this.reverseLights=[d,u];const f=x=>{const m=new Mo(16777215,1.5,15,tt.degToRad(30),.3,1);return m.position.copy(x).add(new M(0,0,.1)),m.target.position.copy(x).add(new M(0,-.1,5)),m.castShadow=!0,m.shadow.mapSize.width=1024,m.shadow.mapSize.height=1024,this.visuals.add(m,m.target),m};this.headlightSpots=[f(i.group.position),f(r.group.position)];const p=x=>{const m=new ir(16720401,.25,5,1.5);return m.position.copy(x),this.visuals.add(m),m};this.tailLightPoints=[p(o.group.position),p(l.group.position)];const v=x=>{const m=new ir(16777215,0,5,2);return m.position.copy(x),this.visuals.add(m),m};this.reverseLightPoints=[v(d.position),v(u.position)]}setPosition(e,t,n){this.group.position.set(e,t,n)}setHeading(e){this.heading=e,this.group.rotation.y=e}setInputs({throttle:e,brake:t,steering:n,handbrake:i=!1,boost:r=!1}){this.throttle=tt.clamp(e,0,1),this.brake=tt.clamp(t,0,1),this.steering=tt.clamp(n,-1,1),this.handbrake=!!i,this.boost=!!r}getSpeed(){return this.velocity.length()}getVelocityRef(){return this.velocity}getHeading(){return this.heading}getBoostLevel(){return this.boostCharge}reset(e,t=0){this.group.position.copy(e),this.heading=t,this.group.rotation.y=t,this.velocity.set(0,0,0)}update(e){const t=this.config,n={multiplier:1.25,capacity:5,drain:.5,regen:.2};t.boost&&(n.multiplier=t.boost.multiplier??n.multiplier,n.capacity=t.boost.capacity??n.capacity,n.drain=t.boost.drain??n.drain,n.regen=t.boost.regen??n.regen);const i=this.throttle>.05&&!this.handbrake,r=this.boost&&this.boostCharge>.001&&i;r?this.boostCharge=Math.max(0,this.boostCharge-n.drain*e):this.boostCharge=Math.min(1,this.boostCharge+n.regen*e);const a=Math.min(1,this.getSpeed()/t.maxSpeed),o=tt.lerp(1,.45,a),c=this.steering*o*t.handling*(.5+.5*a);this.heading+=c*e,this.group.rotation.y=this.heading;const h=this.tmp.set(Math.sin(this.heading),0,Math.cos(this.heading)).normalize(),d=r?n.multiplier:1,u=t.acceleration*d*this.throttle,f=t.braking*this.brake,p=this.velocity.dot(h);let v=h.clone().multiplyScalar(p),x=this.velocity.clone().sub(v);if(u>0&&v.add(h.clone().multiplyScalar(u*e)),this.brake>0)if(p>.2){const A=Math.max(0,p-f*e);v.copy(h).multiplyScalar(A)}else{const A=t.acceleration*t.reverseScale*this.brake;v.add(h.clone().multiplyScalar(-A*e));const V=t.maxSpeed*t.reverseScale;-v.dot(h)>V&&v.copy(h).multiplyScalar(-V)}const m=t.lateralGrip*(this.handbrake?t.handbrakeGrip:1),g=Math.max(0,1-m*e);x.multiplyScalar(g),this.velocity.copy(v.add(x)),this.velocity.multiplyScalar(Math.max(0,1-t.drag*e));const T=this.velocity.length(),S=this.velocity.dot(h),E=t.maxSpeed*(r?n.multiplier:1);if(S>=0&&T>E)this.velocity.multiplyScalar(E/T);else if(S<0){const R=t.maxSpeed*t.reverseScale;if(Math.abs(S)>R){const A=h.clone().multiplyScalar(S),V=this.velocity.clone().sub(A),j=h.clone().multiplyScalar(-R);this.velocity.copy(j.add(V))}}this.group.position.addScaledVector(this.velocity,e);const _=(this.prevForwardSpeed-p)/Math.max(1e-6,e);if(this.prevForwardSpeed=p,this.wheels){const R=tt.degToRad(25)*this.steering;this.wheels.fl.rotation.y=R,this.wheels.fr.rotation.y=R;const A=this.tmp.set(Math.sin(this.heading),0,Math.cos(this.heading)).normalize(),V=this.velocity.dot(A),j=V/(2*Math.PI*.28)*2*Math.PI*e;for(const Be of[this.wheels.fl,this.wheels.fr,this.wheels.rl,this.wheels.rr])Be.children.forEach(Ae=>Ae.rotation.x-=j);const Y=this.velocity.clone().sub(A.clone().multiplyScalar(V)),se=(V-0)/Math.max(1e-6,e),ne=tt.clamp(-se*8e-4,-.06,.06),fe=tt.clamp(-Y.x*.02,-.1,.1);this.visuals.rotation.x+=(ne-this.visuals.rotation.x)*Math.min(1,8*e),this.visuals.rotation.z+=(fe-this.visuals.rotation.z)*Math.min(1,8*e);const me=tt.clamp(ne*.6,-.08,.08),O=tt.clamp(-ne*.6,-.08,.08);this.wheels.fl.position.y=.28+me,this.wheels.fr.position.y=.28+me,this.wheels.rl.position.y=.28+O,this.wheels.rr.position.y=.28+O}const D=.6,I=_>6,B=p<-.2,G=this.brake>.1||I||B,W=G?3.8:D;for(const R of this.brakelights){const A=R.material;A.emissiveIntensity=tt.lerp(A.emissiveIntensity,W,Math.min(1,12*e))}const N=G?1.1:.18;this.tailLightPoints.forEach(R=>R.intensity=tt.lerp(R.intensity,N,Math.min(1,10*e)));const L=p<-.4&&this.brake<.2,P=L?2:0;for(const R of this.reverseLights){const A=R.material;A.emissiveIntensity=tt.lerp(A.emissiveIntensity,P,Math.min(1,10*e))}this.reverseLightPoints.forEach(R=>R.intensity=tt.lerp(R.intensity,L?.8:0,Math.min(1,10*e)))}}const be=class be{constructor(){ae(this,"group",new rt);ae(this,"obstacles",[]);ae(this,"segments",[]);ae(this,"segmentLength",100);ae(this,"currentSegment",0);ae(this,"maxSegments",5);this.initializeSharedResources();for(let e=0;e<this.maxSegments;e++)this.generateSegment(e)}initializeSharedResources(){be.sharedConeGeometry||(be.sharedConeGeometry=new Fd(.3,.8,8),be.sharedConeMaterial=new Ue({color:16737792,roughness:.7,metalness:0}),be.sharedBarrierGeometry=new Ge(3,1.2,.4),be.sharedBarrierMaterial=new Ue({color:14737632,roughness:.8,metalness:.1}),be.sharedTrunkGeometry=new Gn(.15,.25,3,8),be.sharedTrunkMaterial=new Ue({color:4863784,roughness:.95,metalness:0}),be.sharedCrownGeometry=new er(1.5,8,6),be.sharedLeafMaterial=new Ue({color:2969622,roughness:.9,metalness:0,transparent:!0,opacity:.9}),be.sharedPoleGeometry=new Gn(.1,.1,8,8),be.sharedPoleMaterial=new Ue({color:4473924,roughness:.3,metalness:.8}),be.sharedLampGeometry=new er(.5,8,6),be.sharedLampMaterial=new Ue({color:16777164,emissive:3355409,roughness:.1,metalness:.1}))}update(e){const t=Math.floor(e/this.segmentLength);for(;t+2>this.currentSegment;)this.currentSegment++,this.generateSegment(this.currentSegment+2);this.segments.forEach((n,i)=>{if(n&&i<t-2){this.group.remove(n),n.traverse(o=>{var l,c;o instanceof oe&&((l=o.geometry)==null||l.dispose(),Array.isArray(o.material)?o.material.forEach(h=>h.dispose()):(c=o.material)==null||c.dispose())}),this.segments[i]=null;const r=i*this.segmentLength,a=(i+1)*this.segmentLength;for(let o=this.obstacles.length-1;o>=0;o--){const l=this.obstacles[o],c=(l.aabb.minZ+l.aabb.maxZ)/2;c>=r&&c<=a&&this.obstacles.splice(o,1)}}})}generateSegment(e){const t=new rt,n=e*this.segmentLength;this.createSegmentObstacles(t,n),this.segments[e]=t,this.group.add(t)}createSegmentObstacles(e,t){const n=2+Math.floor(Math.random()*2);for(let i=0;i<n;i++){const r=new oe(be.sharedConeGeometry,be.sharedConeMaterial),a=(Math.random()-.5)*18,o=t+Math.random()*this.segmentLength;r.position.set(a,.4,o),r.castShadow=!0,r.receiveShadow=!0,e.add(r),this.obstacles.push({aabb:{minX:a-.25,maxX:a+.25,minZ:o-.25,maxZ:o+.25}})}if(Math.random()<.2){const i=Math.random()<.5?-1:1,r=new oe(be.sharedBarrierGeometry,be.sharedBarrierMaterial),a=i*18,o=t+Math.random()*this.segmentLength;r.position.set(a,.6,o),r.castShadow=!0,r.receiveShadow=!0,e.add(r),this.obstacles.push({aabb:{minX:a-1.5,maxX:a+1.5,minZ:o-.2,maxZ:o+.2}})}this.addSegmentTrees(e,t),this.addSegmentLampPosts(e,t)}addSegmentTrees(e,t){const n=2+Math.floor(Math.random()*3);for(let i=0;i<n;i++){const r=new oe(be.sharedTrunkGeometry,be.sharedTrunkMaterial),a=new oe(be.sharedCrownGeometry,be.sharedLeafMaterial),o=Math.random()<.5?-1:1,l=30+Math.random()*25,c=o*l,h=t+Math.random()*this.segmentLength,d=.8+Math.random()*.4;r.position.set(c,1.5*d,h),r.scale.setScalar(d),r.castShadow=!1,r.receiveShadow=!1,a.position.set(c,3.2*d,h),a.scale.setScalar(d),a.castShadow=!1,a.receiveShadow=!1,e.add(r,a),this.obstacles.push({aabb:{minX:c-.3*d,maxX:c+.3*d,minZ:h-.3*d,maxZ:h+.3*d}})}}addSegmentLampPosts(e,t){if(Math.random()<.25){const n=1+Math.floor(Math.random()*2);for(let i=0;i<n;i++){const r=new oe(be.sharedPoleGeometry,be.sharedPoleMaterial),a=new oe(be.sharedLampGeometry,be.sharedLampMaterial),l=(Math.random()<.5?-1:1)*(12+Math.random()*3),c=t+(i+1)*(this.segmentLength/(n+1));r.position.set(l,4,c),r.castShadow=!1,r.receiveShadow=!1,a.position.set(l,7.5,c),a.castShadow=!1;const h=new ir(16777164,.3,15);h.position.set(l,7.5,c),h.castShadow=!1,e.add(r,a,h),this.obstacles.push({aabb:{minX:l-.15,maxX:l+.15,minZ:c-.15,maxZ:c+.15}})}}}};ae(be,"sharedConeGeometry"),ae(be,"sharedConeMaterial"),ae(be,"sharedBarrierGeometry"),ae(be,"sharedBarrierMaterial"),ae(be,"sharedTrunkGeometry"),ae(be,"sharedTrunkMaterial"),ae(be,"sharedCrownGeometry"),ae(be,"sharedLeafMaterial"),ae(be,"sharedPoleGeometry"),ae(be,"sharedPoleMaterial"),ae(be,"sharedLampGeometry"),ae(be,"sharedLampMaterial");let Ia=be;class bp{constructor(e){this.obstacles=e}resolve(e,t,n){let i=!1;const r=new q,a=new q((n.minX+n.maxX)*.5,(n.minZ+n.maxZ)*.5),o=new q((n.maxX-n.minX)*.5,(n.maxZ-n.minZ)*.5);for(const l of this.obstacles){const c=new q((l.aabb.minX+l.aabb.maxX)*.5,(l.aabb.minZ+l.aabb.maxZ)*.5),h=new q((l.aabb.maxX-l.aabb.minX)*.5,(l.aabb.maxZ-l.aabb.minZ)*.5),d=a.x-c.x,u=a.y-c.y,f=o.x+h.x-Math.abs(d),p=o.y+h.y-Math.abs(u);if(f>0&&p>0)if(i=!0,f<p){const v=Math.sign(d)||1;r.set(f*v,0),e.x+=r.x,a.x+=r.x,t.x*=-.2}else{const v=Math.sign(u)||1;r.set(0,p*v),e.z+=r.y,a.y+=r.y,t.z*=-.2}}return i}}class Sp{constructor(e){ae(this,"listener");ae(this,"ctx");ae(this,"engineBus");ae(this,"effectsBus");ae(this,"engineOsc");ae(this,"engineFilter");ae(this,"engineAmp");ae(this,"engineStarted",!1);ae(this,"noiseBuffer");this.camera=e,this.listener=new Of,this.camera.add(this.listener),this.ctx=this.listener.context,this.engineBus=this.ctx.createGain(),this.engineBus.gain.value=.7,this.engineBus.connect(this.listener.gain),this.effectsBus=this.ctx.createGain(),this.effectsBus.gain.value=.8,this.effectsBus.connect(this.listener.gain)}async resume(){if(this.ctx.state!=="running")try{await this.ctx.resume()}catch{}}updateFromSettings(e){this.listener.gain.gain.value=tt.clamp(e.audio.master,0,1),this.engineBus.gain.value=tt.clamp(e.audio.engine,0,1),this.effectsBus.gain.value=tt.clamp(e.audio.effects,0,1)}setEngine(e,t,n){if(this.engineStarted||this.startEngineIfNeeded(),!this.engineOsc||!this.engineFilter||!this.engineAmp)return;const i=Math.max(0,Math.min(1,n>0?t/n:0)),r=70+i*430+e*220;this.engineOsc.frequency.setTargetAtTime(r,this.ctx.currentTime,.03);const a=600+i*1800;this.engineFilter.frequency.setTargetAtTime(a,this.ctx.currentTime,.05);const o=.08+.55*(.6*e+.4*i);this.engineAmp.gain.setTargetAtTime(o,this.ctx.currentTime,.05)}playCollision(e=.5){this.noiseBuffer||(this.noiseBuffer=this.createNoiseBuffer());const t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer;const n=this.ctx.createGain(),i=this.ctx.currentTime,r=Math.max(.05,Math.min(1,e));n.gain.setValueAtTime(0,i),n.gain.linearRampToValueAtTime(.7*r,i+.01),n.gain.exponentialRampToValueAtTime(1e-4,i+.2),t.connect(n).connect(this.effectsBus),t.start(),t.stop(i+.25)}startEngineIfNeeded(){this.engineStarted||(this.engineStarted=!0,this.engineOsc=this.ctx.createOscillator(),this.engineOsc.type="sawtooth",this.engineFilter=this.ctx.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.value=1200,this.engineAmp=this.ctx.createGain(),this.engineAmp.gain.value=.001,this.engineOsc.connect(this.engineFilter).connect(this.engineAmp).connect(this.engineBus),this.engineOsc.start())}createNoiseBuffer(){const e=Math.floor(this.ctx.sampleRate*.2),t=this.ctx.createBuffer(1,e,this.ctx.sampleRate),n=t.getChannelData(0);for(let i=0;i<e;i++)n[i]=(Math.random()*2-1)*(1-i/e);return t}destroy(){var e,t,n,i;try{(e=this.engineOsc)==null||e.stop()}catch{}(t=this.engineOsc)==null||t.disconnect(),(n=this.engineFilter)==null||n.disconnect(),(i=this.engineAmp)==null||i.disconnect(),this.camera.remove(this.listener)}}class Tp{constructor(e){ae(this,"group",new rt);ae(this,"envRT");ae(this,"pmrem");ae(this,"groundSegments",[]);ae(this,"segmentSize",200);ae(this,"lastPlayerZ",0);ae(this,"skyDome");this.renderer=e}setup(e){this.createBeautifulSky(e),e.fog=new or(12637928,80,400);const t=new _o(8900331,2905392,.4),n=new So(16777215,.2),i=new ts(16775388,3);i.position.set(100,150,50),i.castShadow=!0,i.shadow.mapSize.setScalar(4096),i.shadow.camera.near=.1,i.shadow.camera.far=1e3,i.shadow.camera.left=-200,i.shadow.camera.right=200,i.shadow.camera.top=200,i.shadow.camera.bottom=-200,i.shadow.bias=-1e-4,i.shadow.radius=8;const r=new ts(8900331,.8);r.position.set(-50,100,-50),r.castShadow=!1,this.group.add(t,n,i,r),this.createGroundSegments(0),this.addRoadMarkings(),this.addProfessionalEnvironment(e)}update(e){Math.abs(e-this.lastPlayerZ)>this.segmentSize/2&&(this.updateGroundSegments(e),this.lastPlayerZ=e)}createGroundSegments(e){const t=this.createAsphaltMaterial(),n=this.createGrassMaterial();for(let i=-1;i<=1;i++){const r=e+i*this.segmentSize,a=new oe(new un(25,this.segmentSize,16,32),t);a.rotation.x=-Math.PI/2,a.position.set(0,.01,r),a.receiveShadow=!0,this.group.add(a),this.groundSegments.push(a);const o=new oe(new un(75,this.segmentSize,8,32),n);o.rotation.x=-Math.PI/2,o.position.set(-50,0,r),o.receiveShadow=!0,this.group.add(o),this.groundSegments.push(o);const l=new oe(new un(75,this.segmentSize,8,32),n);l.rotation.x=-Math.PI/2,l.position.set(50,0,r),l.receiveShadow=!0,this.group.add(l),this.groundSegments.push(l)}}updateGroundSegments(e){this.groundSegments=this.groundSegments.filter(i=>{var r,a;return Math.abs(i.position.z-e)>this.segmentSize*2?(this.group.remove(i),(r=i.geometry)==null||r.dispose(),Array.isArray(i.material)?i.material.forEach(o=>o.dispose()):(a=i.material)==null||a.dispose(),!1):!0});const t=Math.floor(e/this.segmentSize),n=[];for(let i=t-1;i<=t+2;i++){const r=i*this.segmentSize;this.groundSegments.some(o=>Math.abs(o.position.z-r)<this.segmentSize/2)||n.push(r)}n.forEach(i=>{this.createSingleGroundSegment(i)})}createSingleGroundSegment(e){const t=this.createAsphaltMaterial(),n=this.createGrassMaterial(),i=new oe(new un(25,this.segmentSize,16,32),t);i.rotation.x=-Math.PI/2,i.position.set(0,.01,e),i.receiveShadow=!0,this.group.add(i),this.groundSegments.push(i);const r=new oe(new un(75,this.segmentSize,8,32),n);r.rotation.x=-Math.PI/2,r.position.set(-50,0,e),r.receiveShadow=!0,this.group.add(r),this.groundSegments.push(r);const a=new oe(new un(75,this.segmentSize,8,32),n);a.rotation.x=-Math.PI/2,a.position.set(50,0,e),a.receiveShadow=!0,this.group.add(a),this.groundSegments.push(a)}createAsphaltMaterial(){const e=document.createElement("canvas");e.width=e.height=512;const t=e.getContext("2d");t.fillStyle="#0a0a0a",t.fillRect(0,0,512,512);for(let i=0;i<3e3;i++){const r=Math.random()*512,a=Math.random()*512,o=Math.random()*1.2+.3,l=Math.random()*25+15;t.fillStyle=`rgb(${l}, ${l}, ${l})`,t.beginPath(),t.arc(r,a,o,0,Math.PI*2),t.fill()}t.globalAlpha=.15,t.fillStyle="#050505";for(let i=0;i<100;i++){const r=Math.random()*512,a=Math.random()*512,o=Math.random()*40+15,l=Math.random()*2+.5;t.fillRect(r,a,o,l)}const n=new Nn(e);return n.wrapS=n.wrapT=1e3,n.repeat.set(2,2),n.anisotropy=8,new Ue({map:n,roughness:.85,metalness:0,envMapIntensity:.1,color:526344})}createGrassMaterial(){const e=document.createElement("canvas");e.width=e.height=256;const t=e.getContext("2d");t.fillStyle="#2d4a2d",t.fillRect(0,0,256,256);for(let i=0;i<1e3;i++){const r=Math.random()*256,a=Math.random()*256,o=Math.random()*2+.5,l=Math.random()*60+40,c=l*.6,h=l*.4;t.fillStyle=`rgb(${c}, ${l}, ${h})`,t.beginPath(),t.arc(r,a,o,0,Math.PI*2),t.fill()}const n=new Nn(e);return n.wrapS=n.wrapT=1e3,n.repeat.set(4,4),n.anisotropy=4,new Ue({map:n,roughness:.9,metalness:0,color:4872762})}addRoadMarkings(){const e=new Ue({color:16776960,roughness:.6,metalness:0,emissive:2236928});for(let n=-15;n<=15;n++){const i=new oe(new Ge(.3,.02,5),e);i.position.set(0,.02,n*10),i.receiveShadow=!0,this.group.add(i)}const t=new Ue({color:16777215,roughness:.5,metalness:0,emissive:1118481});for(let n=-15;n<=15;n++){const i=new oe(new Ge(.3,.02,8),t);i.position.set(-12,.02,n*10),i.receiveShadow=!0,this.group.add(i)}for(let n=-15;n<=15;n++){const i=new oe(new Ge(.3,.02,8),t);i.position.set(12,.02,n*10),i.receiveShadow=!0,this.group.add(i)}}createBeautifulSky(e){const t=new er(2e3,64,32),n=document.createElement("canvas");n.width=2048,n.height=1024;const i=n.getContext("2d"),r=i.createLinearGradient(0,0,0,n.height);r.addColorStop(0,"#87CEEB"),r.addColorStop(.2,"#B0E0E6"),r.addColorStop(.4,"#87CEFA"),r.addColorStop(.6,"#4682B4"),r.addColorStop(.8,"#2E4B87"),r.addColorStop(1,"#1E3A8A"),i.fillStyle=r,i.fillRect(0,0,n.width,n.height),this.addRealisticClouds(i,n.width,n.height),this.addAtmosphericSun(i,n.width,n.height),this.addAtmosphericHaze(i,n.width,n.height);const a=new Nn(n);a.wrapS=1e3,a.wrapT=1001,a.flipY=!1,a.generateMipmaps=!1,a.minFilter=1006,a.magFilter=1006;const o=new gi({map:a,side:1,depthWrite:!1,depthTest:!1,fog:!1}),l=new oe(t,o);l.name="SkyDome",l.position.set(0,0,0),l.renderOrder=-1,this.skyDome=l,e.add(l),e.background=a}addRealisticClouds(e,t,n){e.globalAlpha=.8,[{yStart:n*.05,yEnd:n*.25,size:80,density:25,opacity:.9,color:"#FFFFFF"},{yStart:n*.15,yEnd:n*.35,size:60,density:30,opacity:.7,color:"#F8F8FF"},{yStart:n*.25,yEnd:n*.45,size:40,density:35,opacity:.5,color:"#E6E6FA"}].forEach(r=>{for(let a=0;a<r.density;a++){const o=Math.random()*t,l=r.yStart+Math.random()*(r.yEnd-r.yStart),c=r.size+Math.random()*20,h=5+Math.random()*5;e.globalAlpha=r.opacity*(.7+Math.random()*.3);for(let d=0;d<h;d++){const u=o+(Math.random()-.5)*c,f=l+(Math.random()-.5)*c*.3,p=c*(.3+Math.random()*.4),v=e.createRadialGradient(u-p*.2,f-p*.2,0,u,f,p);v.addColorStop(0,r.color),v.addColorStop(.6,`${r.color}88`),v.addColorStop(1,"transparent"),e.fillStyle=v,e.beginPath(),e.arc(u,f,p,0,Math.PI*2),e.fill(),e.globalAlpha*=.4;const x=e.createRadialGradient(u+p*.2,f+p*.2,0,u,f,p*.8);x.addColorStop(0,"#D3D3D3"),x.addColorStop(.5,"#D3D3D355"),x.addColorStop(1,"transparent"),e.fillStyle=x,e.beginPath(),e.arc(u+p*.1,f+p*.1,p*.7,0,Math.PI*2),e.fill()}}}),e.globalAlpha=1}addAtmosphericSun(e,t,n){const i=t*.75,r=n*.15,a=e.createRadialGradient(i,r,0,i,r,200);a.addColorStop(0,"rgba(255, 250, 205, 0.8)"),a.addColorStop(.2,"rgba(255, 245, 180, 0.6)"),a.addColorStop(.4,"rgba(255, 220, 150, 0.4)"),a.addColorStop(.6,"rgba(255, 200, 120, 0.2)"),a.addColorStop(.8,"rgba(200, 180, 140, 0.1)"),a.addColorStop(1,"transparent"),e.fillStyle=a,e.beginPath(),e.arc(i,r,200,0,Math.PI*2),e.fill();const o=e.createRadialGradient(i,r,0,i,r,25);o.addColorStop(0,"#FFFACD"),o.addColorStop(.3,"#FFF8DC"),o.addColorStop(.7,"#FFFFE0"),o.addColorStop(1,"rgba(255, 255, 224, 0.5)"),e.fillStyle=o,e.beginPath(),e.arc(i,r,25,0,Math.PI*2),e.fill();for(let l=0;l<12;l++){const c=l/12*Math.PI*2,h=40+Math.random()*20,d=1+Math.random()*2;e.strokeStyle="rgba(255, 250, 205, 0.3)",e.lineWidth=d,e.beginPath(),e.moveTo(i+Math.cos(c)*30,r+Math.sin(c)*30),e.lineTo(i+Math.cos(c)*h,r+Math.sin(c)*h),e.stroke()}}addAtmosphericHaze(e,t,n){const i=e.createLinearGradient(0,n*.6,0,n);i.addColorStop(0,"transparent"),i.addColorStop(.3,"rgba(200, 220, 255, 0.1)"),i.addColorStop(.6,"rgba(180, 210, 255, 0.2)"),i.addColorStop(.8,"rgba(160, 200, 255, 0.3)"),i.addColorStop(1,"rgba(140, 190, 255, 0.4)"),e.fillStyle=i,e.fillRect(0,n*.6,t,n*.4),e.globalAlpha=.15,e.fillStyle="#4682B4",e.beginPath(),e.moveTo(0,n*.85);for(let r=0;r<=t;r+=20){const a=n*(.75+Math.sin(r*.01)*.1+Math.random()*.05);e.lineTo(r,a)}e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=1}addProfessionalEnvironment(e){const t=document.createElement("canvas");t.width=512,t.height=256;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,0,t.height);i.addColorStop(0,"#87CEEB"),i.addColorStop(.2,"#B0E0E6"),i.addColorStop(.5,"#4682B4"),i.addColorStop(.8,"#2E4B87"),i.addColorStop(1,"#1E3A8A"),n.fillStyle=i,n.fillRect(0,0,t.width,t.height);const r=t.width*.75,a=t.height*.15,o=n.createRadialGradient(r,a,0,r,a,40);o.addColorStop(0,"rgba(255, 250, 205, 0.8)"),o.addColorStop(.5,"rgba(255, 250, 205, 0.3)"),o.addColorStop(1,"rgba(255, 250, 205, 0)"),n.fillStyle=o,n.beginPath(),n.arc(r,a,40,0,Math.PI*2),n.fill(),n.beginPath(),n.fillStyle="#FFF8DC",n.arc(r,a,15,0,Math.PI*2),n.fill();const l=new Nn(t);l.mapping=303,this.pmrem=new ap(this.renderer),this.pmrem.compileEquirectangularShader();const c=this.pmrem.fromEquirectangular(l);this.envRT=c.texture,e.environment=c.texture}updateCSM(e){}dispose(e){var t,n,i,r,a;e.environment=null,this.skyDome&&(e.remove(this.skyDome),(t=this.skyDome.geometry)==null||t.dispose(),Array.isArray(this.skyDome.material)?this.skyDome.material.forEach(o=>o.dispose()):(n=this.skyDome.material)==null||n.dispose(),this.skyDome=void 0),this.envRT&&((r=(i=this.envRT).dispose)==null||r.call(i),this.envRT=void 0),(a=this.pmrem)==null||a.dispose()}}export{Sp as A,De as B,Ao as C,Tp as E,rt as G,_p as I,vp as L,tt as M,pt as P,at as Q,yp as R,io as S,Ia as T,M as V,Ve as W,xp as a,Mp as b,mp as c,bp as d,wp as e,Nn as f,ro as g,Sd as h,Ad as i,oe as j,je as k,oo as l,gp as m,Cd as n};
