var DotGenerator=pc.createScript("dotGenerator");DotGenerator.attributes.add("dotData",{type:"asset",assetType:"json"}),DotGenerator.attributes.add("dotParent",{type:"entity"}),DotGenerator.attributes.add("dot",{type:"entity"}),DotGenerator.attributes.add("scale",{type:"number"}),DotGenerator.prototype.initialize=function(){var t=this.dotData.resource,e=this.parseDotData(t);this.createDots(e);this.app.graphicsDevice.maxPixelRatio=Math.min(window.devicePixelRatio,2)},DotGenerator.prototype.update=function(t){},DotGenerator.prototype.parseDotData=function(t){for(var e=[],o=t.nodes,a=0;a<o.length;a++){var r=o[a];e.push(r)}return e},DotGenerator.prototype.createDots=function(t){for(var e=0;e<t.length;e++){var o=this.dot.clone();o.enabled=!0,o.setLocalPosition(t[e].position[0],t[e].position[1],t[e].position[2]),o.setLocalEulerAngles(t[e].rotation[0]+90,t[e].rotation[1],t[e].rotation[2]),o.setLocalScale(this.scale,this.scale,this.scale),this.dotParent.addChild(o)}};var OrbitCamera=pc.createScript("orbitCamera");OrbitCamera.attributes.add("distanceMax",{type:"number",default:0,title:"Distance Max",description:"Setting this at 0 will give an infinite distance limit"}),OrbitCamera.attributes.add("distanceMin",{type:"number",default:0,title:"Distance Min"}),OrbitCamera.attributes.add("pitchAngleMax",{type:"number",default:90,title:"Pitch Angle Max (degrees)"}),OrbitCamera.attributes.add("pitchAngleMin",{type:"number",default:-90,title:"Pitch Angle Min (degrees)"}),OrbitCamera.attributes.add("inertiaFactor",{type:"number",default:0,title:"Inertia Factor",description:"Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive."}),OrbitCamera.attributes.add("focusEntity",{type:"entity",title:"Focus Entity",description:"Entity for the camera to focus on. If blank, then the camera will use the whole scene"}),OrbitCamera.attributes.add("frameOnStart",{type:"boolean",default:!0,title:"Frame on Start",description:'Frames the entity or scene at the start of the application."'}),OrbitCamera.attributes.add("duration",{type:"number",default:5,title:"Duration (Secs)"}),this.hasZoomed=!1,Object.defineProperty(OrbitCamera.prototype,"distance",{get:function(){return this._targetDistance},set:function(t){this._targetDistance=this._clampDistance(t)}}),Object.defineProperty(OrbitCamera.prototype,"pitch",{get:function(){return this._targetPitch},set:function(t){this._targetPitch=this._clampPitchAngle(t)}}),Object.defineProperty(OrbitCamera.prototype,"yaw",{get:function(){return this._targetYaw},set:function(t){this._targetYaw=t;var i=(this._targetYaw-this._yaw)%360;this._targetYaw=i>180?this._yaw-(360-i):i<-180?this._yaw+(360+i):this._yaw+i}}),Object.defineProperty(OrbitCamera.prototype,"pivotPoint",{get:function(){return this._pivotPoint},set:function(t){this._pivotPoint.copy(t)}}),OrbitCamera.prototype.focus=function(t){this._buildAabb(t,0);var i=this._modelsAabb.halfExtents,e=Math.max(i.x,Math.max(i.y,i.z));e/=Math.tan(.5*this.entity.camera.fov*pc.math.DEG_TO_RAD),e*=2,this.distance=e,this._removeInertia(),this._pivotPoint.copy(this._modelsAabb.center)},OrbitCamera.distanceBetween=new pc.Vec3,OrbitCamera.prototype.resetAndLookAtPoint=function(t,i){this.pivotPoint.copy(i),this.entity.setPosition(t),this.entity.lookAt(i);var e=OrbitCamera.distanceBetween;e.sub2(i,t),this.distance=e.length(),this.pivotPoint.copy(i);var a=this.entity.getRotation();this.yaw=this._calcYaw(a),this.pitch=this._calcPitch(a,this.yaw),this._removeInertia(),this._updatePosition()},OrbitCamera.prototype.resetAndLookAtEntity=function(t,i){this._buildAabb(i,0),this.resetAndLookAtPoint(t,this._modelsAabb.center)},OrbitCamera.prototype.reset=function(t,i,e){this.pitch=i,this.yaw=t,this.distance=e,this._removeInertia()},OrbitCamera.prototype.initializeOrbit=function(){var t=this,i=function(){t._checkAspectRatio()};window.addEventListener("resize",i,!1),this._checkAspectRatio(),this._modelsAabb=new pc.BoundingBox,this._buildAabb(this.focusEntity||this.app.root,0),this.entity.lookAt(this._modelsAabb.center),this._pivotPoint=new pc.Vec3,this._pivotPoint.copy(this._modelsAabb.center);var e=this.entity.getRotation();if(this._yaw=this._calcYaw(e),this._pitch=this._clampPitchAngle(this._calcPitch(e,this._yaw)),this.entity.setLocalEulerAngles(this._pitch,this._yaw,0),this._distance=0,this._targetYaw=this._yaw,this._targetPitch=this._pitch,this.frameOnStart)this.focus(this.focusEntity||this.app.root);else{var a=new pc.Vec3;a.sub2(this.entity.getPosition(),this._pivotPoint),this._distance=this._clampDistance(a.length())}this._targetDistance=this._distance,this.on("attr:distanceMin",function(t,i){this._targetDistance=this._clampDistance(this._distance)}),this.on("attr:distanceMax",function(t,i){this._targetDistance=this._clampDistance(this._distance)}),this.on("attr:pitchAngleMin",function(t,i){this._targetPitch=this._clampPitchAngle(this._pitch)}),this.on("attr:pitchAngleMax",function(t,i){this._targetPitch=this._clampPitchAngle(this._pitch)}),this.on("attr:focusEntity",function(t,i){this.frameOnStart?this.focus(t||this.app.root):this.resetAndLookAtEntity(this.entity.getPosition(),t||this.app.root)}),this.on("attr:frameOnStart",function(t,i){t&&this.focus(this.focusEntity||this.app.root)}),this.on("destroy",function(){window.removeEventListener("resize",i,!1)})},OrbitCamera.prototype.initialize=function(){this.time=0,this.zoomTween()},OrbitCamera.prototype.update=function(t){if(this.hasZoomed){var i=0===this.inertiaFactor?1:Math.min(t/this.inertiaFactor,1);this._distance=pc.math.lerp(this._distance,this._targetDistance,i),this._yaw=pc.math.lerp(this._yaw,this._targetYaw,i),this._pitch=pc.math.lerp(this._pitch,this._targetPitch,i),this._updatePosition()}},OrbitCamera.prototype._updatePosition=function(){this.entity.setLocalPosition(0,0,0),this.entity.setLocalEulerAngles(this._pitch,this._yaw,0);var t=this.entity.getPosition();t.copy(this.entity.forward),t.scale(-this._distance),t.add(this.pivotPoint),this.entity.setPosition(t)},OrbitCamera.prototype._removeInertia=function(){this._yaw=this._targetYaw,this._pitch=this._targetPitch,this._distance=this._targetDistance},OrbitCamera.prototype._checkAspectRatio=function(){var t=this.app.graphicsDevice.height,i=this.app.graphicsDevice.width;this.entity.camera.horizontalFov=t>i},OrbitCamera.prototype._buildAabb=function(t,i){var e=0;if(t.model){var a=t.model.meshInstances;for(e=0;e<a.length;e++)0===i?this._modelsAabb.copy(a[e].aabb):this._modelsAabb.add(a[e].aabb),i+=1}for(e=0;e<t.children.length;++e)i+=this._buildAabb(t.children[e],i);return i},OrbitCamera.prototype._calcYaw=function(t){var i=new pc.Vec3;return t.transformVector(pc.Vec3.FORWARD,i),Math.atan2(-i.x,-i.z)*pc.math.RAD_TO_DEG},OrbitCamera.prototype._clampDistance=function(t){return this.distanceMax>0?pc.math.clamp(t,this.distanceMin,this.distanceMax):Math.max(t,this.distanceMin)},OrbitCamera.prototype._clampPitchAngle=function(t){return pc.math.clamp(t,-this.pitchAngleMax,-this.pitchAngleMin)},OrbitCamera.quatWithoutYaw=new pc.Quat,OrbitCamera.yawOffset=new pc.Quat,OrbitCamera.prototype._calcPitch=function(t,i){var e=OrbitCamera.quatWithoutYaw,a=OrbitCamera.yawOffset;a.setFromEulerAngles(0,-i,0),e.mul2(a,t);var n=new pc.Vec3;return e.transformVector(pc.Vec3.FORWARD,n),Math.atan2(n.y,-n.z)*pc.math.RAD_TO_DEG},OrbitCamera.prototype.zoomTween=function(){var t=this,i=(this.entity.getPosition(),{from:0,to:500}),e=this.app.tween(i).to({from:500},1.5,pc.SineInOut);e.on("update",function(){var t=new pc.Vec3(0,0,i.from);this.entity.setLocalPosition(t)}.bind(this)),e.on("complete",function(){t.hasZoomed=!0,t.initializeOrbit()}),e.start()};var PickerRaycast=pc.createScript("pickerRaycast");PickerRaycast.attributes.add("projectCard",{type:"entity"}),PickerRaycast.attributes.add("canvas",{type:"entity"}),this.isShowing=!1,PickerRaycast.prototype.initialize=function(){this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onSelect,this);if(this.app.touch)this.app.touch.on(pc.EVENT_TOUCHEND,this.onSelect,this)},PickerRaycast.prototype.onSelect=function(t){var i=this.entity.camera.screenToWorld(t.x,t.y,this.entity.camera.nearClip),e=this.entity.camera.screenToWorld(t.x,t.y,this.entity.camera.farClip),a=this.app.systems.rigidbody.raycastFirst(i,e);if(a&&a.entity.tags.has("x")){if(this.isShowing)return;this.isShowing=!0;var s=a.entity,r=new pc.Vec3;this.entity.camera.worldToScreen(s.getPosition(),r);var c=new pc.Vec3(r.x-this.canvas.screen.resolution.x/this.app.graphicsDevice.maxPixelRatio*.5,r.y-this.canvas.screen.resolution.y/this.app.graphicsDevice.maxPixelRatio*.5,0);s.parent.parent.script.point.showCard(c)}else this.projectCard.script.projectCard.reset(),this.isShowing=!1};pc.extend(pc,function(){var t=function(t){this._app=t,this._tweens=[],this._add=[]};t.prototype={add:function(t){return this._add.push(t),t},update:function(t){for(var i=0,e=this._tweens.length;i<e;)this._tweens[i].update(t)?i++:(this._tweens.splice(i,1),e--);this._add.length&&(this._tweens=this._tweens.concat(this._add),this._add.length=0)}};var i=function(t,i,e){pc.events.attach(this),this.manager=i,e&&(this.entity=null),this.time=0,this.complete=!1,this.playing=!1,this.stopped=!0,this.pending=!1,this.target=t,this.duration=0,this._currentDelay=0,this.timeScale=1,this._reverse=!1,this._delay=0,this._yoyo=!1,this._count=0,this._numRepeats=0,this._repeatDelay=0,this._from=!1,this._slerp=!1,this._fromQuat=new pc.Quat,this._toQuat=new pc.Quat,this._quat=new pc.Quat,this.easing=pc.EASE_LINEAR,this._sv={},this._ev={}};i.prototype={to:function(t,i,e,s,n,r){return t instanceof pc.Vec3?this._properties={x:t.x,y:t.y,z:t.z}:t instanceof pc.Color?(this._properties={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(this._properties.a=t.a)):this._properties=t,this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this},from:function(t,i,e,s,n,r){return t instanceof pc.Vec3?this._properties={x:t.x,y:t.y,z:t.z}:t instanceof pc.Color?(this._properties={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(this._properties.a=t.a)):this._properties=t,this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this._from=!0,this},rotate:function(t,i,e,s,n,r){return t instanceof pc.Quat?this._properties={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Vec3?this._properties={x:t.x,y:t.y,z:t.z}:t instanceof pc.Color?(this._properties={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(this._properties.a=t.a)):this._properties=t,this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this._slerp=!0,this},start:function(){if(this.playing=!0,this.complete=!1,this.stopped=!1,this._count=0,this.pending=this._delay>0,this._reverse&&!this.pending?this.time=this.duration:this.time=0,this._from){for(var t in this._properties)this._sv[t]=this._properties[t],this._ev[t]=this.target[t];if(this._slerp){this._toQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z);var i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,s=void 0!==this._properties.z?this._properties.z:this.target.z;this._fromQuat.setFromEulerAngles(i,e,s)}}else{for(var t in this._properties)this._sv[t]=this.target[t],this._ev[t]=this._properties[t];if(this._slerp){this._fromQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z);i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,s=void 0!==this._properties.z?this._properties.z:this.target.z;this._toQuat.setFromEulerAngles(i,e,s)}}return this._currentDelay=this._delay,this.manager.add(this),this},pause:function(){this.playing=!1},resume:function(){this.playing=!0},stop:function(){this.playing=!1,this.stopped=!0},delay:function(t){return this._delay=t,this.pending=!0,this},repeat:function(t,i){return this._count=0,this._numRepeats=t,this._repeatDelay=i||0,this},loop:function(t){return t?(this._count=0,this._numRepeats=1/0):this._numRepeats=0,this},yoyo:function(t){return this._yoyo=t,this},reverse:function(){return this._reverse=!this._reverse,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1]._chained=arguments[t]:this._chained=arguments[t];return this},update:function(t){if(this.stopped)return!1;if(!this.playing)return!0;if(!this._reverse||this.pending?this.time+=t*this.timeScale:this.time-=t*this.timeScale,this.pending){if(!(this.time>this._currentDelay))return!0;this._reverse?this.time=this.duration-(this.time-this._currentDelay):this.time=this.time-this._currentDelay,this.pending=!1}var i=0;(!this._reverse&&this.time>this.duration||this._reverse&&this.time<0)&&(this._count++,this.complete=!0,this.playing=!1,this._reverse?(i=this.duration-this.time,this.time=0):(i=this.time-this.duration,this.time=this.duration));var e,s,n=this.time/this.duration,r=this.easing(n);for(var h in this._properties)e=this._sv[h],s=this._ev[h],this.target[h]=e+(s-e)*r;if(this._slerp&&this._quat.slerp(this._fromQuat,this._toQuat,r),this.entity&&(this.entity._dirtify(!0),this.element&&this.entity.element&&(this.entity.element[this.element]=this.target),this._slerp&&this.entity.setLocalRotation(this._quat)),this.fire("update",t),this.complete){var a=this._repeat(i);return a?this.fire("loop"):(this.fire("complete",i),this._chained&&this._chained.start()),a}return!0},_repeat:function(t){if(this._count<this._numRepeats){if(this._reverse?this.time=this.duration-t:this.time=t,this.complete=!1,this.playing=!0,this._currentDelay=this._repeatDelay,this.pending=!0,this._yoyo){for(var i in this._properties)tmp=this._sv[i],this._sv[i]=this._ev[i],this._ev[i]=tmp;this._slerp&&(this._quat.copy(this._fromQuat),this._fromQuat.copy(this._toQuat),this._toQuat.copy(this._quat))}return!0}return!1}};var e=function(t){return 1-s(1-t)},s=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375};return{TweenManager:t,Tween:i,Linear:function(t){return t},QuadraticIn:function(t){return t*t},QuadraticOut:function(t){return t*(2-t)},QuadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},CubicIn:function(t){return t*t*t},CubicOut:function(t){return--t*t*t+1},CubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},QuarticIn:function(t){return t*t*t*t},QuarticOut:function(t){return 1- --t*t*t*t},QuarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},QuinticIn:function(t){return t*t*t*t*t},QuinticOut:function(t){return--t*t*t*t*t+1},QuinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},SineIn:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},SineOut:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},SineInOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))},ExponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},ExponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},CircularIn:function(t){return 1-Math.sqrt(1-t*t)},CircularOut:function(t){return Math.sqrt(1- --t*t)},CircularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*(2.70158*t-1.70158)},BackOut:function(t){return--t*t*(2.70158*t+1.70158)+1},BackInOut:function(t){var i=2.5949095;return(t*=2)<1?t*t*((i+1)*t-i)*.5:.5*((t-=2)*t*((i+1)*t+i)+2)},BounceIn:e,BounceOut:s,BounceInOut:function(t){return t<.5?.5*e(2*t):.5*s(2*t-1)+.5},ElasticIn:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),-e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4))},ElasticOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin((t-i)*(2*Math.PI)/.4)+1)},ElasticInOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*-.5:e*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*.5+1)}}}()),function(){var t=pc.Application.getApplication();t&&(t._tweenManager=new pc.TweenManager(t),t.on("update",function(i){t._tweenManager.update(i)}),pc.Application.prototype.tween=function(t){return new pc.Tween(t,this._tweenManager)},pc.Entity.prototype.tween=function(t,i){var e=this._app.tween(t);return e.entity=this,this.on("destroy",function(){e.stop()}),i&&i.element&&(e.element=element),e})}();var MouseInput=pc.createScript("mouseInput");MouseInput.attributes.add("orbitSensitivity",{type:"number",default:.3,title:"Orbit Sensitivity",description:"How fast the camera moves around the orbit. Higher is faster"}),MouseInput.attributes.add("distanceSensitivity",{type:"number",default:.15,title:"Distance Sensitivity",description:"How fast the camera moves in and out. Higher is faster"}),MouseInput.prototype.initialize=function(){if(this.orbitCamera=this.entity.script.orbitCamera,this.orbitCamera){var t=this,o=function(o){t.onMouseOut(o)};this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this),this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.on(pc.EVENT_MOUSEWHEEL,this.onMouseWheel,this),window.addEventListener("mouseout",o,!1),this.on("destroy",function(){this.app.mouse.off(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.off(pc.EVENT_MOUSEUP,this.onMouseUp,this),this.app.mouse.off(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.off(pc.EVENT_MOUSEWHEEL,this.onMouseWheel,this),window.removeEventListener("mouseout",o,!1)})}this.app.mouse.disableContextMenu(),this.lookButtonDown=!1,this.panButtonDown=!1,this.lastPoint=new pc.Vec2},MouseInput.fromWorldPoint=new pc.Vec3,MouseInput.toWorldPoint=new pc.Vec3,MouseInput.worldDiff=new pc.Vec3,MouseInput.prototype.pan=function(t){var o=MouseInput.fromWorldPoint,e=MouseInput.toWorldPoint,i=MouseInput.worldDiff,s=this.entity.camera,n=this.orbitCamera.distance;s.screenToWorld(t.x,t.y,n,o),s.screenToWorld(this.lastPoint.x,this.lastPoint.y,n,e),i.sub2(e,o),this.orbitCamera.pivotPoint.add(i)},MouseInput.prototype.onMouseDown=function(t){switch(t.button){case pc.MOUSEBUTTON_LEFT:this.lookButtonDown=!0;break;case pc.MOUSEBUTTON_MIDDLE:case pc.MOUSEBUTTON_RIGHT:}},MouseInput.prototype.onMouseUp=function(t){switch(t.button){case pc.MOUSEBUTTON_LEFT:this.lookButtonDown=!1;break;case pc.MOUSEBUTTON_MIDDLE:case pc.MOUSEBUTTON_RIGHT:this.panButtonDown=!1}},MouseInput.prototype.onMouseMove=function(t){pc.app.mouse;this.lookButtonDown?(this.orbitCamera.pitch-=t.dy*this.orbitSensitivity,this.orbitCamera.yaw-=t.dx*this.orbitSensitivity):this.panButtonDown&&this.pan(t),this.lastPoint.set(t.x,t.y)},MouseInput.prototype.onMouseWheel=function(t){this.orbitCamera.distance-=t.wheel*this.distanceSensitivity*(.1*this.orbitCamera.distance),t.event.preventDefault()},MouseInput.prototype.onMouseOut=function(t){this.lookButtonDown=!1,this.panButtonDown=!1};var TouchInput=pc.createScript("touchInput");TouchInput.attributes.add("orbitSensitivity",{type:"number",default:.4,title:"Orbit Sensitivity",description:"How fast the camera moves around the orbit. Higher is faster"}),TouchInput.attributes.add("distanceSensitivity",{type:"number",default:.2,title:"Distance Sensitivity",description:"How fast the camera moves in and out. Higher is faster"}),TouchInput.prototype.initialize=function(){this.orbitCamera=this.entity.script.orbitCamera,this.lastTouchPoint=new pc.Vec2,this.lastPinchMidPoint=new pc.Vec2,this.lastPinchDistance=0,this.orbitCamera&&this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHSTART,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHEND,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHCANCEL,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),this.on("destroy",function(){this.app.touch.off(pc.EVENT_TOUCHSTART,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHEND,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHCANCEL,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHMOVE,this.onTouchMove,this)}))},TouchInput.prototype.getPinchDistance=function(t,i){var o=t.x-i.x,n=t.y-i.y;return Math.sqrt(o*o+n*n)},TouchInput.prototype.calcMidPoint=function(t,i,o){o.set(i.x-t.x,i.y-t.y),o.scale(.5),o.x+=t.x,o.y+=t.y},TouchInput.prototype.onTouchStartEndCancel=function(t){var i=t.touches;1==i.length?this.lastTouchPoint.set(i[0].x,i[0].y):2==i.length&&(this.lastPinchDistance=this.getPinchDistance(i[0],i[1]),this.calcMidPoint(i[0],i[1],this.lastPinchMidPoint))},TouchInput.fromWorldPoint=new pc.Vec3,TouchInput.toWorldPoint=new pc.Vec3,TouchInput.worldDiff=new pc.Vec3,TouchInput.prototype.pan=function(t){var i=TouchInput.fromWorldPoint,o=TouchInput.toWorldPoint,n=TouchInput.worldDiff,h=this.entity.camera,c=this.orbitCamera.distance;h.screenToWorld(t.x,t.y,c,i),h.screenToWorld(this.lastPinchMidPoint.x,this.lastPinchMidPoint.y,c,o),n.sub2(o,i),this.orbitCamera.pivotPoint.add(n)},TouchInput.pinchMidPoint=new pc.Vec2,TouchInput.prototype.onTouchMove=function(t){TouchInput.pinchMidPoint;var i=t.touches;if(1==i.length){var o=i[0];this.orbitCamera.pitch-=(o.y-this.lastTouchPoint.y)*this.orbitSensitivity,this.orbitCamera.yaw-=(o.x-this.lastTouchPoint.x)*this.orbitSensitivity,this.lastTouchPoint.set(o.x,o.y)}};var Billboard=pc.createScript("billboard");Billboard.prototype.initialize=function(){this.camera=this.app.root.findByName("Camera")},Billboard.prototype.update=function(t){this.entity.setRotation(this.camera.getRotation())};var Rotate=pc.createScript("rotate");Rotate.attributes.add("speed",{type:"number",default:.5,title:"Rotate Speed"}),Rotate.prototype.initialize=function(){},Rotate.prototype.update=function(t){this.entity.rotate(0,1*this.speed,0)};var DataVisualizer=pc.createScript("dataVisualizer");DataVisualizer.attributes.add("projectsJSON",{type:"asset",assetType:"json"}),DataVisualizer.attributes.add("countriesJSON",{type:"asset",assetType:"json"}),DataVisualizer.attributes.add("point",{type:"entity"}),DataVisualizer.attributes.add("pointParent",{type:"entity"}),DataVisualizer.attributes.add("radius",{type:"number"}),DataVisualizer.prototype.initialize=function(){var t=this.projectsJSON.resource,a=this.countriesJSON.resource;this.countries=this.parseCountryData(a);this.projects=this.parseProjectData(t),this.createPoints(this.projects)},DataVisualizer.prototype.update=function(t){},DataVisualizer.prototype.createPoints=function(t){for(var a=0;a<t.length;a++){var e=this.point.clone();e.name="point"+a,e.enabled=!0,e.script.point.set(t[a]),e.setLocalPosition(this.geoToWorldGlobePosition(t[a].projectLatLong)),e.lookAt(0,0,0,0,1,0),this.pointParent.addChild(e)}},DataVisualizer.prototype.geoToWorldGlobePosition=function(t){var a=this.radius*Math.cos(Math.radians(t.x))*Math.cos(Math.radians(t.y)),e=this.radius*Math.sin(Math.radians(t.x)),i=this.radius*Math.cos(Math.radians(t.x))*Math.sin(Math.radians(t.y));return new pc.Vec3(a,e,i)},Math.radians=function(t){return t*Math.PI/180},DataVisualizer.prototype.parseCountryData=function(t){var a=[],e=Object.keys(t);for(var i in e){var r=Object.keys(t)[i],o={code:r,latitude:t[r][0],longitude:t[r][1]};a.push(o)}return a},DataVisualizer.prototype.getCountryCoords=function(t){for(var a,e=this.countries,i=0;i<e.length;i++)if(e[i].code==t)return a=new pc.Vec2(e[i].latitude,e[i].longitude);return a},DataVisualizer.prototype.parseProjectData=function(t){for(var a=[],e=t.projects,i=0;i<e.length;i++){var r={title:e[i].data.title,projectLocation:e[i].data.projectLocation,projectLatLong:this.getCountryCoords(e[i].data.projectLocation.toLowerCase()),ownerName:e[i].data.ownerName,claimsSuccuessful:e[i].data.claimStats.currentSuccessful,requiredClaims:e[i].data.requiredClaims};a.push(r)}return a};var project,name,Point=pc.createScript("point");Point.attributes.add("projectCard",{type:"entity"}),Point.attributes.add("earth",{type:"entity"}),Point.prototype.initialize=function(t){},Point.prototype.update=function(t){},Point.prototype.set=function(t){this.project=t,name=t.title},Point.prototype.showCard=function(t){this.earth.script.rotate.speed=0,this.projectCard.script.projectCard.set(this.project),this.projectCard.setLocalPosition(t.x,-t.y,t.z),this.projectCard.enabled=!0};var ProjectCard=pc.createScript("projectCard");ProjectCard.attributes.add("name",{type:"entity"}),ProjectCard.attributes.add("ownerTitle",{type:"entity"}),ProjectCard.attributes.add("owner",{type:"entity"}),ProjectCard.attributes.add("locationTitle",{type:"entity"}),ProjectCard.attributes.add("location",{type:"entity"}),ProjectCard.attributes.add("totalClaimsTitle",{type:"entity"}),ProjectCard.attributes.add("totalClaims",{type:"entity"}),ProjectCard.attributes.add("successfulClaimsTitle",{type:"entity"}),ProjectCard.attributes.add("successfulClaims",{type:"entity"}),ProjectCard.attributes.add("bar",{type:"entity"}),ProjectCard.attributes.add("barBase",{type:"entity"}),ProjectCard.attributes.add("cardBase",{type:"entity"}),ProjectCard.attributes.add("earth",{type:"entity"}),ProjectCard.prototype.initialize=function(t){},ProjectCard.prototype.update=function(t){},ProjectCard.prototype.set=function(t){this.name.element.text=t.title,this.owner.element.text=t.ownerName,this.location.element.text=t.projectLocation,this.requiredClaims=t.requiredClaims,this.claimsSuccuessful=t.claimsSuccuessful,this.barSize=t.claimsSuccuessful/t.requiredClaims*336,this.animateBar(),this.animateTotal(),this.animateSuccessful(),this.scaleIn(),this.fadeIn(this.name),this.fadeIn(this.ownerTitle),this.fadeIn(this.owner),this.fadeIn(this.locationTitle),this.fadeIn(this.location),this.fadeIn(this.successfulClaimsTitle),this.fadeIn(this.successfulClaims),this.fadeIn(this.totalClaimsTitle),this.fadeIn(this.totalClaims),this.fadeIn(this.barBase),this.fadeIn(this.bar),this.fadeIn(this.cardBase)},ProjectCard.prototype.reset=function(){this.earth.script.rotate.speed=.2,this.entity.enabled=!1,this.name.element.text="",this.owner.element.text="",this.location.element.text="",this.totalClaims.element.text="0",this.successfulClaims.element.text="0",this.bar.element.width=0,this.entity.setLocalScale(pc.Vec3.ZERO)},this.tween&&this.tween.stop(),ProjectCard.prototype.scaleIn=function(){this.tween&&this.tween.stop(),this.entity.tween(this.entity.getLocalScale()).to(new pc.Vec3(1,1,1),.5,pc.SineInOut).start()},ProjectCard.prototype.fadeIn=function(t){this.tween&&this.tween.stop();var e={from:0,to:1},i=this.app.tween(e).to({from:1},.5,pc.Linear);i.on("update",function(){t.element.opacity=e.from}.bind(this)),i.start()},ProjectCard.prototype.animateBar=function(){this.tween&&this.tween.stop();var t=this.barSize,e={from:0,to:t},i=this.app.tween(e).to({from:t},.5,pc.Linear).delay(.7);i.on("update",function(){this.bar.element.width=e.from}.bind(this)),i.start()},ProjectCard.prototype.animateTotal=function(){this.tween&&this.tween.stop();var t=this.requiredClaims,e={from:0,to:t},i=this.app.tween(e).to({from:t},.5,pc.Linear).delay(.7);i.on("update",function(){this.totalClaims.element.text=Math.floor(e.from)}.bind(this)),i.start()},ProjectCard.prototype.animateSuccessful=function(){this.tween&&this.tween.stop();var t=this.claimsSuccuessful,e={from:0,to:t},i=this.app.tween(e).to({from:t},.5,pc.Linear).delay(.7);i.on("update",function(){this.successfulClaims.element.text=Math.floor(e.from)}.bind(this)),i.start()};