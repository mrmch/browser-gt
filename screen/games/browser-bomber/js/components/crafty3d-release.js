var tQueryLoop=function(a){this._world=a;this._hooks=[];this._lastTime=null;this._world&&this.hookOnRender(function(){this._world.render()}.bind(this))};tQueryLoop.prototype.destroy=function(){this.stop();if(tQuery.loop===this){tQuery.loop=null}};tQueryLoop.prototype.start=function(){if(this._timerId){this.stop()}this._timerId=requestAnimationFrame(this._onAnimationFrame.bind(this));return this};tQueryLoop.prototype.stop=function(){cancelAnimationFrame(this._timerId);this._timerId=null;return this};tQueryLoop.prototype._onAnimationFrame=function(f){this._timerId=requestAnimationFrame(this._onAnimationFrame.bind(this));var e=f/1000;if(!this._lastTime){this._lastTime=e-1/60}var a=e-this._lastTime;this._lastTime=e;for(var c=0;c<=this._hooks.length;c++){if(this._hooks[c]===undefined){continue}var d=this._hooks[c].slice(0);for(var b=0;b<d.length;b++){d[b](a,e)}}};tQueryLoop.prototype.PRE_RENDER=20;tQueryLoop.prototype.ON_RENDER=50;tQueryLoop.prototype.POST_RENDER=80;tQueryLoop.prototype.hook=function(a,b){if(typeof a==="function"){b=a;a=this.PRE_RENDER}this._hooks[a]=this._hooks[a]||[];console.assert(this._hooks[a].indexOf(b)===-1);this._hooks[a].push(b);return this};tQueryLoop.prototype.unhook=function(b,c){if(typeof b==="function"){c=b;b=this.PRE_RENDER}var a=this._hooks[b].indexOf(c);console.assert(a!==-1);this._hooks[b].splice(a,1);this._hooks[b].length===0&&delete this._hooks[b];return this};tQueryLoop.prototype.hookPreRender=function(a){return this.hook(this.PRE_RENDER,a)};tQueryLoop.prototype.hookOnRender=function(a){return this.hook(this.ON_RENDER,a)};tQueryLoop.prototype.hookPostRender=function(a){return this.hook(this.POST_RENDER,a)};tQueryLoop.prototype.unhookPreRender=function(a){return this.unhook(this.PRE_RENDER,a)};tQueryLoop.prototype.unhookOnRender=function(a){return this.unhook(this.ON_RENDER,a)};tQueryLoop.prototype.unhookPostRender=function(a){return this.unhook(this.POST_RENDER,a)};Crafty.c("3D",{object3D:null,inScene:false,init:function(){Crafty.DrawManager.total3D++;this.bind("Remove",function(){Crafty.THREE.total3D--;if(this.inScene===true){Crafty.THREE.scene.remove(this.object3D)}})},object3DAssign:function(a){this.object3D=a;if(this.inScene===false){Crafty.THREE.scene.add(this.object3D);this.inScene=true}if(Crafty.support.setter){this.__defineSetter__("x",function(c){this.object3D.position.x=c;this.attr("_x",c)});this.__defineSetter__("y",function(c){this.object3D.position.y=c;this.attr("_y",c)});this.__defineSetter__("z",function(c){this.object3D.position.z=c;this.attr("_z",c)});this.__defineGetter__("x",function(){return this.object3D.position.x});this.__defineGetter__("y",function(){return this.object3D.position.y});this.__defineGetter__("z",function(){return this.object3D.position.z});this.__defineSetter__("scaleX",function(c){this.object3D.scale.x=c;this.attr("_scaleX",c)});this.__defineSetter__("scaleY",function(c){this.object3D.scale.y=c;this.attr("_scaleY",c)});this.__defineSetter__("scaleZ",function(c){this.object3D.scale.z=c;this.attr("_scaleZ",c)});this.__defineGetter__("scaleX",function(){return this.object3D.scale.x});this.__defineGetter__("scaleY",function(){return this.object3D.scale.y});this.__defineGetter__("scaleZ",function(){return this.object3D.scale.z});this.__defineSetter__("rotX",function(c){this.object3D.rotation.x=c;this.attr("_rotX",c)});this.__defineSetter__("rotY",function(c){this.object3D.rotation.y=c;this.attr("_rotY",c)});this.__defineSetter__("rotZ",function(c){this.object3D.rotation.z=c;this.attr("_rotZ",c)});this.__defineGetter__("rotX",function(){return this.object3D.rotation.x=v;this.attr("_rotX",v)});this.__defineGetter__("rotY",function(){return this.object3D.rotation.y=v;this.attr("_rotY",v)});this.__defineGetter__("rotZ",function(){return this.object3D.rotation.z=v;this.attr("_rotZ",v)})}else{if(Crafty.support.defineProperty){Object.defineProperty(this,"x",{set:function(c){this.object3D.position.x=c;this.attr("_x",c)},get:function(){return this.object3D.position.x},configurable:true});Object.defineProperty(this,"y",{set:function(c){this.object3D.position.y=c;this.attr("_y",c)},get:function(){return this.object3D.position.y},configurable:true});Object.defineProperty(this,"z",{set:function(c){this.object3D.position.z=c;this.attr("_z",c)},get:function(){return this.object3D.position.z},configurable:true});Object.defineProperty(this,"scaleX",{set:function(c){this.object3D.scale.x=c;this.attr("_scaleX",c)},get:function(){return this.object3D.rotation.x},configurable:true});Object.defineProperty(this,"scaleY",{set:function(c){this.object3D.scale.y=c;this.attr("_scaleY",c)},get:function(){return this.object3D.rotation.y},configurable:true});Object.defineProperty(this,"scaleZ",{set:function(c){this.object3D.scale.z=c;this.attr("_scaleZ",c)},get:function(){return this.object3D.rotation.z},configurable:true});Object.defineProperty(this,"rotX",{set:function(c){this.object3D.rotation.x=c;this.attr("_rotX",c)},get:function(){return this.object3D.scale.x},configurable:true});Object.defineProperty(this,"rotY",{set:function(c){this.object3D.rotation.y=c;this.attr("_rotY",c)},get:function(){return this.object3D.scale.y},configurable:true});Object.defineProperty(this,"rotZ",{set:function(c){this.object3D.rotation.z=c;this.attr("_rotZ",c)},get:function(){return this.object3D.scale.z},configurable:true})}else{}}var b=this;this.object3D.click=function(c){b.trigger("RaycastClick",c)};this.object3D.mouseover=function(){b.trigger("RaycastMouseOver")};this.object3D.mouseout=function(){b.trigger("RaycastMouseOut")};this.object3D.mousemove=function(c){b.trigger("RaycastMouseMove",c)}}});Crafty.extend({THREE:{renderer:null,camera:null,scene:null,projector:null,loop:null,rayEnabled:false,rayVect:null,mouseOverObj:null,rayConstant:true,screenClearColor:"#FFF",screenNoContextMenu:true,camIsOrtho:false,camFOV:40,camNearDist:1,camFarDist:10000,_xhr:{},_loaderInstances:{},_getLoaderInstance:function(a){if(typeof this._loaderInstances[a]!=="undefined"){return this._loaderInstances[a]}switch(a){case"js":case"json":this._loaderInstances[a]=new THREE.JSONLoader();break;default:throw new Error("unknown model format requested: "+a);break}return this._loaderInstances[a]},_makeMeshComponent:function(b,a,c){Crafty.c(b,{meshUrl:a,init:function(){var d=Crafty.assets[this.meshUrl];this.requires("3D");this.object3DAssign(new THREE.Mesh(d.geometry,d.material))}})},init:function(a){for(key in a){this[key]=a[key]}if(typeof Crafty.viewport==="undefined"){throw new Error("crafty.init must be called to set up the viewport before Crafty.THREE.init is called")}this.renderer=new THREE.WebGLRenderer({antialias:true});this.renderer.setSize(Crafty.viewport.width,Crafty.viewport.height);this.renderer.setClearColor(this.screenClearColor);Crafty.stage.inner.appendChild(this.renderer.domElement);this.canvas=this.renderer.domElement;this.scene=new THREE.Scene();var b=(this.camIsOrtho===true)?THREE.OrthographicCamera:THREE.PerspectiveCamera;this.camAspect=Crafty.viewport.width/Crafty.viewport.height;this.camera=new b(this.camFov,this.camAspect,this.camNearDist,this.camFarDist);this.scene.add(this.camera);this.projector=new THREE.Projector();this.loop=new tQueryLoop(this);this.rayVect=new THREE.Vector3((1/Crafty.viewport.width)*2-1,-(1/Crafty.viewport.height)*2+1,0.5);Crafty.addEvent(this,this.renderer.domElement,"mousemove",this.rayVectUpdate);Crafty.addEvent(this,this.renderer.domElement,"mouseup",function(c){this.mouseRaycast("click",c)});if(this.screenNoContextMenu===true){this.ctxListen=function(c){c.preventDefault();return false};Crafty.addEvent(this,this.renderer.domElement,"contextmenu",this.ctxListen)}Crafty.DrawManager.total3D=0;Crafty.DrawManager.draw=function(){};this.loop.start();return this},mouseRaycast:function(g,c){if(typeof g==="undefined"){g="click"}if(this.rayEnabled!==true){return}var a=this.projector.pickingRay(this.rayVect.clone(),this.camera),b=a.intersectObjects(this.scene.children),e;if(b.length<1){if(g==="mouseover"){this._mouseOverSetObj(null)}return}var f;for(var d=0;d<b.length;d++){f=b[d];if(f.object.raycastHide===true){continue}if(typeof f!=="undefined"){e=f}}if(typeof e==="undefined"){return}if(g==="click"){if(typeof e.object.click!=="undefined"){e.object.click({point:e.point,event:c})}return}else{if(g==="mouseover"){if(e.object==this.mouseOverObj){if(typeof e.object.mousemove!=="undefined"){e.object.mousemove(e.point)}return}this._mouseOverSetObj(e.object)}}},_mouseOverSetObj:function(a){if(this.mouseOverObj===null&&a===null){return}if(this.mouseOverObj!==null&&typeof this.mouseOverObj.mouseout!=="undefined"){this.mouseOverObj.mouseout()}this.mouseOverObj=a;if(this.mouseOverObj===null){return}if(typeof this.mouseOverObj.mouseover!=="undefined"){this.mouseOverObj.mouseover()}},rayVectUpdate:function(a){this.rayVect.x=((a.pageX-this.renderer.domElement.offsetLeft)/Crafty.viewport.width)*2-1;this.rayVect.y=-((a.pageY-this.renderer.domElement.offsetTop)/Crafty.viewport.height)*2+1},render:function(){var a=Crafty.THREE;if(this.rayConstant===true){this.mouseRaycast("mouseover")}if(a.renderer!==null){a.renderer.render(a.scene,a.camera)}},load:function(f,e,c,i){var j=f.length,g=0,d=this,a,k,b,h;for(dataIdx=0;dataIdx<j;dataIdx++){a=f[dataIdx];k=a.slice(a.lastIndexOf(".")+1).toLowerCase();b=a.slice(0,a.lastIndexOf("/"));this._xhr[a]=new XMLHttpRequest();h=this._xhr[a];h.onreadystatechange=function(){var l=this,o;if(this.readyState===4){g++;if(this.status!==200&&this.status!==0){if(i){i.call(this,{loaded:g,total:j,percent:(g/j*100),error:"HTTP Error: "+this.status})}return}try{o=JSON.parse(this.responseText);d._getLoaderInstance(this.refExt).createModel(o,function(p){Crafty.assets[l.refUrl]=new THREE.Mesh(p,new THREE.MeshFaceMaterial());d._makeMeshComponent(l.refUrl.slice(l.refBase.length+1),l.refUrl,Crafty.assets[l.refUrl])},this.refBase)}catch(n){if(i){i.call(this,{loaded:g,total:j,percent:(g/j*100),error:n})}return}if(g>=j){for(var m in d._xhr){delete (d._xhr[m])}e()}else{if(c){c.call(this,{loaded:g,total:j,percent:(g/j*100)})}}}};h.refUrl=a;h.refExt=k;h.refBase=b;h.open("GET",a,true);h.send(null)}}}});