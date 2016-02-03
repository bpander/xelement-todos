/*!
 * routie - a tiny hash router
 * v0.3.2
 * http://projects.jga.me/routie
 * copyright Greg Allen 2013
 * MIT License
*/

!function(){var t,e,i,n,r,o,a,s,h,c,l,u,d,p,f;!function(t){var e=[],i={},n="routie",r=t[n],o=function(t,e){this.name=e,this.path=t,this.keys=[],this.fns=[],this.params={},this.regex=a(this.path,this.keys,!1,!1)};o.prototype.addHandler=function(t){this.fns.push(t)},o.prototype.removeHandler=function(t){for(var e=0,i=this.fns.length;i>e;e++){var n=this.fns[e];if(t==n)return void this.fns.splice(e,1)}},o.prototype.run=function(t){for(var e=0,i=this.fns.length;i>e;e++)this.fns[e].apply(this,t)},o.prototype.match=function(t,e){var i=this.regex.exec(t);if(!i)return!1;for(var n=1,r=i.length;r>n;++n){var o=this.keys[n-1],a="string"==typeof i[n]?decodeURIComponent(i[n]):i[n];o&&(this.params[o.name]=a),e.push(a)}return!0},o.prototype.toURL=function(t){var e=this.path;for(var i in t)e=e.replace("/:"+i,"/"+t[i]);if(e=e.replace(/\/:.*\?/g,"/").replace(/\?/g,""),-1!=e.indexOf(":"))throw new Error("missing parameters for url: "+e);return e};var a=function(t,e,i,n){return t instanceof RegExp?t:(t instanceof Array&&(t="("+t.join("|")+")"),t=t.concat(n?"":"/?").replace(/\/\(/g,"(?:/").replace(/\+/g,"__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,function(t,i,n,r,o,a){return e.push({name:r,optional:!!a}),i=i||"",""+(a?"":i)+"(?:"+(a?i:"")+(n||"")+(o||n&&"([^/.]+?)"||"([^/]+?)")+")"+(a||"")}).replace(/([\/.])/g,"\\$1").replace(/__plus__/g,"(.+)").replace(/\*/g,"(.*)"),new RegExp("^"+t+"$",i?"":"i"))},s=function(t,n){var r=t.split(" "),a=2==r.length?r[0]:null;t=2==r.length?r[1]:r[0],i[t]||(i[t]=new o(t,a),e.push(i[t])),i[t].addHandler(n)},h=function(t,e){if("function"==typeof e)s(t,e),h.reload();else if("object"==typeof t){for(var i in t)s(i,t[i]);h.reload()}else"undefined"==typeof e&&h.navigate(t)};h.lookup=function(t,i){for(var n=0,r=e.length;r>n;n++){var o=e[n];if(o.name==t)return o.toURL(i)}},h.remove=function(t,e){var n=i[t];n&&n.removeHandler(e)},h.removeAll=function(){i={},e=[]},h.navigate=function(t,e){e=e||{};var i=e.silent||!1;i&&p(),setTimeout(function(){window.location.hash=t,i&&setTimeout(function(){d()},1)},1)},h.noConflict=function(){return t[n]=r,h};var c=function(){return window.location.hash.substring(1)},l=function(t,e){var i=[];return e.match(t,i)?(e.run(i),!0):!1},u=h.reload=function(){for(var t=c(),i=0,n=e.length;n>i;i++){var r=e[i];if(l(t,r))return}},d=function(){t.addEventListener?t.addEventListener("hashchange",u,!1):t.attachEvent("onhashchange",u)},p=function(){t.removeEventListener?t.removeEventListener("hashchange",u):t.detachEvent("onhashchange",u)};d(),t[n]=h}(window),t=void 0,function(t,i){e=function(){return"function"==typeof i?i():i}()}(this,function(){var t,e,i,n,r,o;return t=function(){function t(t,e,i){this.target=t,this.type=e,this.handler=i,this.isEnabled=!1}return t.prototype.enable=function(){if(this.isEnabled!==!0){if(this.target instanceof EventTarget)this.target.addEventListener(this.type,this.handler);else if(this.target instanceof NodeList)for(var t=this.target.length;--t>-1;)this.target[t].addEventListener(this.type,this.handler);this.isEnabled=!0}},t.prototype.disable=function(){if(this.target instanceof EventTarget)this.target.removeEventListener(this.type,this.handler);else if(this.target instanceof NodeList)for(var t=this.target.length;--t>-1;)this.target[t].removeEventListener(this.type,this.handler);this.isEnabled=!1},t}(),e=function(){function t(t){this.attrDef=null,this.element=null,this.mqls=[],this.listener=Function.prototype,this.set(t)}return t.prototype.set=function(t){var e;for(e in t)t.hasOwnProperty(e)&&this.hasOwnProperty(e)&&(this[e]=t[e])},t.prototype.update=function(){if(this.mqls.forEach(function(t){t.removeListener(this.listener)},this),this.mqls=[],document.contains(this.element)!==!1){var t=this.attrDef.getPropertyName(),e=this.attrDef.parseResponsiveAttribute(this.element[t]),i=e.unmatched;this.listener=function(){var t=this.element[this.attrDef.getEvaluatedPropertyName()];t!==i&&(this.attrDef.mediaChangedCallback.call(this.element,i,t),i=t)}.bind(this),this.mqls=e.breakpoints.map(function(t){var e=window.matchMedia(t.mediaQuery);return e.matches&&(i=t.value),e.addListener(this.listener),e},this)}},t}(),i=function(t,e){var i={customAttributes:[],createdCallback:function(){this.bindings=[],this.mediaDefs=this.customAttributes.filter(function(t){return t.responsive===!0}).map(function(t){return new e({element:this,attrDef:t})},this)},attachedCallback:function(){this.mediaDefs.forEach(function(t){t.update()})},detachedCallback:function(){this.mediaDefs.forEach(function(t){t.update()})},attributeChangedCallback:function(t,e,i){var n=this.customAttributes.find(function(e){return e.name===t});if(void 0!==n){n.changedCallback.call(this,e,i);var r=this.mediaDefs.find(function(t){return t.attrDef===n});if(void 0!==r&&document.contains(this)!==!1){r.update();var o=null===e?""+n["default"]:e,a=n.evaluateResponsiveAttribute(o),s=this[n.getEvaluatedPropertyName()];a!==s&&n.mediaChangedCallback.call(this,a,s)}}},getComponent:function(t,e){var i=t.prototype.selector;return void 0!==e&&(i+='[data-tag="'+e+'"]'),this.querySelector(i)},getComponents:function(t,e){var i=t.prototype.selector;return void 0!==e&&(i+='[data-tag="'+e+'"]'),n(this.querySelectorAll(i))},findWithTag:function(t){return this.querySelector('[data-tag="'+t+'"]')},findAllWithTag:function(t){return n(this.querySelectorAll('[data-tag="'+t+'"]'))},createBinding:function(e,i,n){var r=new t(e,i,n.bind(this));return this.bindings.push(r),r},enable:function(){var t,e=this.bindings.length;for(t=0;e>t;t++)this.bindings[t].enable()},disable:function(){var t,e=this.bindings.length;for(t=0;e>t;t++)this.bindings[t].disable()},trigger:function(t,e){var i=new CustomEvent(t,{detail:e,bubbles:!0});return this.dispatchEvent(i)}},n=function(t){for(var e=t.length,i=new Array(e),n=0;e>n;n++)i[n]=t[n];return i};return i}(t,e),n=function(){var t={};return t.toCamelCase=function(t){return t.replace(/(\-[a-z])/g,function(t){return t.toUpperCase().replace("-","")})},t.capitalize=function(t){return t.replace(/./,function(t){return t.toUpperCase()})},t}(),r=function(t){function e(t,e){this.name=t,this.type=null,this["default"]=null,this.responsive=!1,this.mediaChangedCallback=Function.prototype,this.changedCallback=Function.prototype,this.set(e)}return e.prototype.set=function(t){var e;for(e in t)t.hasOwnProperty(e)&&this.hasOwnProperty(e)&&(this[e]=t[e])},e.prototype.getPropertyName=function(){return t.toCamelCase(this.name)},e.prototype.getEvaluatedPropertyName=function(){return"current"+t.capitalize(this.getPropertyName())},e.prototype.parseResponsiveAttribute=function(t){if(null===t)return{unmatched:null,breakpoints:[]};var e=t.split(",").map(function(t){return t.trim()}),i=e.pop();return this.type===Number&&(i=+i),{unmatched:i,breakpoints:e.map(function(t){var e=t.split(/\s(?=[^\s]*$)/),i=e[0],n=e[1];return this.type===Number&&(n=+n),{mediaQuery:i,value:n}},this)}},e.prototype.evaluateResponsiveAttribute=function(t){var e=this.parseResponsiveAttribute(t);return e.breakpoints.reduce(function(t,e){return window.matchMedia(e.mediaQuery).matches?e.value:t},e.unmatched)},e.prototype.addToPrototype=function(t){var e=this,i=this.getPropertyName();Object.defineProperty(t,i,{get:function(){var t=this.getAttribute(e.name);switch(e.type){case Number:if(e.responsive!==!0){if(null===t||""===t.trim()||isNaN(+t)){if(null===e["default"])return null;t=e["default"]}return+t}case String:if(null===t){if(null===e["default"])return null;t=e["default"]+""}return t;case Boolean:return null!==t}},set:function(t){switch(e.type){case Number:if(e.responsive!==!0){if(isNaN(+t))break;this.setAttribute(e.name,t);break}case String:this.setAttribute(e.name,t);break;case Boolean:t?this.setAttribute(e.name,""):this.removeAttribute(e.name)}}}),e.responsive===!0&&Object.defineProperty(t,this.getEvaluatedPropertyName(),{get:function(){return e.evaluateResponsiveAttribute(this[i])}})},e}(n),o=function(t,e){function i(){}i.attribute=function(t,i){return new e(t,i)},i.define=function(e,i){var n=HTMLElement,r=Object.assign(Object.create(n.prototype),t),a=Object.create(r);return Object.defineProperty(a,"selector",{value:e}),i(a,r),o(e,{prototype:a})},i.extend=function(){return"string"==typeof arguments[0]?n.apply(this,arguments):r.apply(this,arguments)};var n=function(e,i,n){var r=document.createElement(e).constructor,a=Object.assign(Object.create(r.prototype),t),s=Object.create(a);return Object.defineProperty(s,"selector",{value:e+'[is="'+i+'"]'}),n(s,a),o(i,{prototype:s,"extends":e})},r=function(t,e,i){var n,r={},a=t.prototype.selector.split("["),s=a.length>1;s?(r["extends"]=a[0],n=r["extends"]+'[is="'+e+'"]'):n=e;var h=t.prototype,c=Object.create(h);return Object.defineProperty(c,"selector",{value:n}),i(c,h),r.prototype=c,o(e,r)},o=function(t,e){var i=e.prototype;return i.customAttributes.forEach(function(t){t.addToPrototype(i)}),document.registerElement(t,e)};return i.setTag=function(t,e){t.dataset.tag=e},i.getTag=function(t){return t.dataset.tag},i}(i,r)}),i=function(t){var i=e;return i.define("x-stateful-element",function(t,e){var n="state",r=function(t){return new Function(n,"return "+t+";")};t.customAttributes=[i.attribute("props-attr",{type:String,"default":"data-props"})],t.createdCallback=function(){e.createdCallback.call(this),this.pieces=Array.prototype.map.call(this.querySelectorAll("["+this.propsAttr+"]")||[],function(t){return{element:t,template:r(t.getAttribute(this.propsAttr))}},this),this.state={}},t.setState=function(t){var e,i,n,r,o,a,s;for(Object.assign(this.state,t),r=0,o=this.pieces.length;o>r;r++){e=this.pieces[r],n=e.template(this.state);for(i in n)n.hasOwnProperty(i)&&(a=e.element[i],s=n[i],a!==s&&(e.element[i]=n[i]))}}})}({}),n=function(t){var n=e,r=i;return n.extend(r,"x-nav",function(t,e){t.createdCallback=function(){e.createdCallback.call(this),this.state={selected:"selected",page:""}}})}({});var g;!function(){"use strict";function t(t){return t.match(l)}function e(t){return t.match(c)}function i(t){for(var e,i=new RegExp(c),n=[];e=i.exec(t);)n.push(e[1]);return n}function n(t,e,n){var r=e.match(u)[1];t[r]||(t[r]={});var o,a,s,h,c=t[r],l=i(e),d=l.length;for(o=0;d>o;o++)a=l[o],s=d===o+1,s?(h=c[a],h?(Array.isArray(h)||(c[a]=[h]),c[a].push(n)):c[a]=n):(c[a]=c[a]||{},c=c[a]);c=n}function r(i,r,o){var a=t(r);if(a&&(r=r.replace(l,"")),r in i){var s=i[r];Array.isArray(s)||(i[r]=[s]),i[r].push(o)}else e(r)?n(i,r,o):i[r]=a?[o]:o;return i}function o(t,e,i){return i=i.replace(/(\r)?\n/g,"\r\n"),i=encodeURIComponent(i),i=i.replace(/%20/g,"+"),t+(t?"&":"")+encodeURIComponent(e)+"="+i}function a(t,e){"object"!=typeof e?e={hash:!!e}:void 0===e.hash&&(e.hash=!0);var i,n,a,c,l,u,d,p,f=e.hash?{}:"",g=e.serializer||(e.hash?r:o),m=t.elements||[],v=Object.create(null);for(i=0;i<m.length;++i)if(a=m[i],(e.disabled||!a.disabled)&&a.name&&h.test(a.nodeName)&&!s.test(a.type)){if(c=a.name,l=a.value,"checkbox"!==a.type&&"radio"!==a.type||a.checked||(l=void 0),e.empty){if("checkbox"!==a.type||a.checked||(l=""),"radio"===a.type&&(v[a.name]||a.checked?a.checked&&(v[a.name]=!0):v[a.name]=!1),!l&&"radio"===a.type)continue}else if(!l)continue;if("select-multiple"!==a.type)f=g(f,c,l);else{for(l=[],d=a.options,p=!1,n=0;n<d.length;++n)u=d[n],u.selected&&(p=!0,f=g(f,c,u.value));!p&&e.empty&&(f=g(f,c,""))}}if(e.empty)for(c in v)v[c]||(f=g(f,c,""));return f}var s=/^(?:submit|button|image|reset|file)$/i,h=/^(?:input|select|textarea|keygen)/i,c=/\[(.+?)\]/g,l=/\[\]$/,u=/^(.+?)\[/;void 0===g?window.formSerialize=a:g.exports=a}(),r=window.formSerialize,o=function(t){var i=e,n=r;return i.extend("form","x-form",function(t,e){t.EVENT={CUSTOM_SUBMIT:"x-form.customsubmit"},t.createdCallback=function(){e.createdCallback.call(this),this.createBinding(this,"submit",t.handleSubmit),this.enable()},t.handleSubmit=function(t){t.preventDefault();for(var e,i=this.elements.length,r=!0;void 0!==(e=this.elements[--i]);)e.checkValidity()===!1&&(r=!1);r&&this.trigger(this.EVENT.CUSTOM_SUBMIT,{request:n(this,{hash:!0})})}})}({}),a=function(t){var i=e;return i.extend("ul","x-list",function(t,e){t.createdCallback=function(){e.createdCallback.call(this),this.elements=[]},t.add=function(t){var e=document.createElement("li");e.appendChild(t),this.appendChild(e),this.elements.push(t)},t.remove=function(t){var e=this.elements.indexOf(t);-1!==e&&(this.removeChild(this.children[e]),this.elements.splice(e,1))},t.empty=function(){this.elements.splice(0,this.elements.length),this.innerHTML=""}})}({}),s=function(t){var n=e,r=i;return n.extend(r,"x-todo",function(t,e){t.customAttributes=[n.attribute("editing-class",{type:String,"default":"editing"})],t.EVENT={STATUS_CHANGE:"x-todo.complete",TEXT_CHANGE:"x-todo.textchange",REMOVE:"x-todo.remove"},t.createdCallback=function(){e.createdCallback.call(this),this.state={complete:!1,text:""},this.checkbox=this.findWithTag("x-todo.checkbox"),this.editField=this.findWithTag("x-todo.editField"),this.label=this.findWithTag("x-todo.label"),this.blurBinding=this.createBinding(this.editField,"blur",t.handleEditFieldBlur),this.createBinding(this.editField,"keyup",t.handleEditFieldBlur),this.createBinding(this.checkbox,"change",t.handleCheckboxChange),this.createBinding(this.label,"dblclick",t.handleLabelDblClick),this.createBinding(this.findWithTag("x-todo.removalButton"),"click",t.handleRemovalButtonClick),this.enable()},t.handleCheckboxChange=function(t){this.trigger(this.EVENT.STATUS_CHANGE,{complete:t.target.checked})},t.handleRemovalButtonClick=function(){this.trigger(this.EVENT.REMOVE)},t.handleLabelDblClick=function(){this.parentElement.classList.add(this.editingClass),this.editField.value=this.label.textContent,this.editField.select()},t.handleEditFieldBlur=function(t){if("keyup"===t.type){if(27===t.keyCode)return this.blurBinding.disable(),this.parentElement.classList.remove(this.editingClass),void setTimeout(function(){this.blurBinding.enable()}.bind(this),10);if(13!==t.keyCode)return}return""===this.editField.value.trim()?(this.blurBinding.disable(),void this.trigger(this.EVENT.REMOVE)):(this.parentElement.classList.remove(this.editingClass),this.label.textContent=this.editField.value,void this.trigger(this.EVENT.TEXT_CHANGE,{text:this.editField.value}))}})}({}),h=function(t){function e(t){this.guid=t||e.generateGUID(),this.props={}}var i=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)};return e.generateGUID=function(){return i()+i()+"-"+i()+"-"+i()+"-"+i()+"-"+i()+i()+i()},e.prototype.set=function(t){var e,i=this.props;for(e in t)t.hasOwnProperty(e)&&i.hasOwnProperty(e)&&(i[e]=t[e]);return this},e}({}),c=function(t){function e(t){i.call(this,t),this.props.text="",this.props.complete=!1}var i=h;return e.prototype=Object.create(i.prototype),e.prototype.constructor=e,e}({}),l=function(t){function e(){this.localModels=[]}var i=c;return e.prototype.fetch=function(){var t=JSON.parse(localStorage.getItem("TodoRepository"))||[];return this.localModels=t.map(function(t){return new i(t.guid).set(t.props)}),this.localModels},e.prototype.push=function(t){localStorage.setItem("TodoRepository",JSON.stringify(t)),this.localModels=t},e.prototype.create=function(t){var e=this.fetch(),n=(new i).set(t);return e.push(n),this.push(e),n},e.prototype.update=function(t,e){var i=this.fetch(),n=i.find(function(e){return e.guid===t});return void 0===n?void console.warn('No model with guid "'+t+'" found'):(n.set(e),void this.push(i))},e.prototype["delete"]=function(t){if("string"==typeof t)return this["delete"]([t]);var e=this.fetch();t.forEach(function(t){for(var i,n=e.length;void 0!==(i=e[--n]);)if(i.guid===t){e.splice(n,1);break}},this),this.push(e)},e.prototype.deleteWhere=function(t){for(var e,i,n=this.fetch(),r=[],o=n.length;void 0!==(e=n[--o]);)for(i in t)t.hasOwnProperty(i)&&e.props[i]===t[i]&&r.push(n.splice(o,1)[0]);return this.push(n),r},e}({}),u=function(t){var n=e,r=o,h=a,c=i,u=s,d=l;return n.extend(c,"x-todo-list",function(t,e){t.createdCallback=function(){e.createdCallback.call(this),this.state={totalCount:0,completedCount:0},this.filter={},this.todoTemplate=this.findWithTag("x-todo-list.todoTemplate"),this.checkAllBox=this.findWithTag("TodosDispatcher:checkAllBox"),this.clearCompletedButton=this.findWithTag("TodosDispatcher:clearCompletedButton"),this.xform=this.getComponent(r,"x-todo-list.xform"),this.xlist=this.getComponent(h,"x-todo-list.xlist"),this.xtodos=[],this.todoRepository=new d,this.createBinding(this.checkAllBox,"change",t.handleCheckAllChange),this.createBinding(this.clearCompletedButton,"click",t.handleClearCompletedClick),this.createBinding(this.xform,this.xform.EVENT.CUSTOM_SUBMIT,t.handleSubmit),this.createBinding(this,u.prototype.EVENT.STATUS_CHANGE,t.handleTodoStatusChange),this.createBinding(this,u.prototype.EVENT.TEXT_CHANGE,t.handleTodoTextChange),this.createBinding(this,u.prototype.EVENT.REMOVE,t.handleTodoRemove),this.enable();var i=this.todoRepository.fetch();Array.prototype.push.apply(this.xtodos,i.map(function(t){return this.createTodoFromModel(t)},this)),this.updateUI()},t.createTodoFromModel=function(t){var e=document.importNode(this.todoTemplate.content,!0),i=e.querySelector(u.prototype.selector);return n.setTag(i,t.guid),i.setState(t.props),i},t.add=function(t){var e=this.filter,i=Object.keys(e),r=this.todoRepository.localModels.filter(function(t){return i.every(function(i){return t.props[i]===e[i]})}),o=r.map(function(t){return t.guid});t.forEach(function(t){var e=n.getTag(t),i=o.indexOf(e)>-1;this.xtodos.push(t),i&&this.xlist.add(t)},this)},t.remove=function(t){t.forEach(function(t){var e=this.xtodos.indexOf(t);e>-1&&this.xtodos.splice(e,1),this.xlist.remove(t)},this)},t.setFilter=function(t){this.filter=t,this.updateList()},t.updateList=function(){this.xlist.empty(),this.add(this.xtodos.splice(0,this.xtodos.length))},t.updateUI=function(){var t=this.todoRepository.localModels,e=t.length;this.setState({totalCount:e,completedCount:t.filter(function(t){return t.props.complete}).length})},t.handleSubmit=function(t){var e=this.todoRepository.create(t.detail.request);this.xtodos.push(this.createTodoFromModel(e)),this.xform.reset(),this.updateList(),this.updateUI()},t.handleTodoStatusChange=function(t){var e=n.getTag(t.target);this.todoRepository.update(e,{complete:t.target.checkbox.checked}),this.updateList(),this.updateUI()},t.handleTodoTextChange=function(t){var e=n.getTag(t.target);this.todoRepository.update(e,{text:t.detail.text})},t.handleTodoRemove=function(t){this.todoRepository["delete"](n.getTag(t.target)),this.remove([t.target]),this.updateUI()},t.handleCheckAllChange=function(t){var e=t.target.checked;this.xtodos.forEach(function(t){var i=n.getTag(t);t.setState({complete:e}),this.todoRepository.update(i,{complete:e})},this),this.updateList(),this.updateUI()},t.handleClearCompletedClick=function(){var t=this.todoRepository.deleteWhere({complete:!0});t.forEach(function(t){this.remove([this.xtodos.find(function(e){return n.getTag(e)===t.guid})])},this),this.updateUI()}})}({}),d=function(t){var i=window.routie,r=e,o=n,a=u;return r.extend("html","x-app",function(t,e){t.createdCallback=function(){e.createdCallback.call(this),this.todoList=this.getComponent(a,"app.todoList"),this.nav=this.getComponent(o,"app.nav"),this.registerRoutes()},t.registerRoutes=function(){var t=this;i({"":function(){t.todoList.setFilter({}),t.nav.setState({page:this.path})},"/active":function(){t.todoList.setFilter({complete:!1}),t.nav.setState({page:this.path})},"/completed":function(){t.todoList.setFilter({complete:!0}),t.nav.setState({page:this.path})}})}})}({}),p={App:d,XForm:o,XList:a,XNav:n,XTodo:s,XTodoList:u},f=void 0}();