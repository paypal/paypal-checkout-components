window["spb"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/preact/dist/preact.module.js
var n,l,preact_module_u,preact_module_t,preact_module_i,preact_module_r={},f=[],o=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function e(n,l){for(var u in l)n[u]=l[u];return n}function c(n){var l=n.parentNode;l&&l.removeChild(n)}function s(n,l,u){var t,i,r,f,o=arguments;if(l=e({},l),arguments.length>3)for(u=[u],t=3;t<arguments.length;t++)u.push(o[t]);if(null!=u&&(l.children=u),null!=n&&null!=n.defaultProps)for(i in n.defaultProps)void 0===l[i]&&(l[i]=n.defaultProps[i]);return f=l.key,null!=(r=l.ref)&&delete l.ref,null!=f&&delete l.key,a(n,l,f,r)}function a(l,u,t,i){var r={type:l,props:u,key:t,ref:i,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return n.vnode&&n.vnode(r),r}function h(){return{}}function v(n){return n.children}function p(n){if(null==n||"boolean"==typeof n)return null;if("string"==typeof n||"number"==typeof n)return a(null,n,null,null);if(null!=n.__e||null!=n.__c){var l=a(n.type,n.props,n.key,null);return l.__e=n.__e,l}return n}function y(n,l){this.props=n,this.context=l}function d(n,l){if(null==l)return n.__p?d(n.__p,n.__p.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?d(n):null}function m(n){var l,u;if(null!=(n=n.__p)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return m(n)}}function w(t){!t.__d&&(t.__d=!0)&&1===l.push(t)&&(n.debounceRendering||preact_module_u)(g)}function g(){var n;for(l.sort(function(n,l){return l.__v.__b-n.__v.__b});n=l.pop();)n.__d&&n.forceUpdate(!1)}function k(n,l,u,t,i,o,e,s,a){var h,v,y,m,w,g,k,b,x=l.__k||_(l.props.children,l.__k=[],p,!0),C=u&&u.__k||f,P=C.length;for(s==preact_module_r&&(s=null!=o?o[0]:P?d(u,0):null),v=0;v<x.length;v++)if(null!=(h=x[v]=p(x[v]))){if(h.__p=l,h.__b=l.__b+1,null===(m=C[v])||m&&h.key==m.key&&h.type===m.type)C[v]=void 0;else for(y=0;y<P;y++){if((m=C[y])&&h.key==m.key&&h.type===m.type){C[y]=void 0;break}m=null}if(w=N(n,h,m=m||preact_module_r,t,i,o,e,null,s,a),(y=h.ref)&&m.ref!=y&&(b||(b=[])).push(y,h.__c||w,h),null!=w){if(null==k&&(k=w),null!=h.l)w=h.l,h.l=null;else if(o==m||w!=s||null==w.parentNode)n:if(null==s||s.parentNode!==n)n.appendChild(w);else{for(g=s,y=0;(g=g.nextSibling)&&y<P;y+=2)if(g==w)break n;n.insertBefore(w,s)}s=w.nextSibling,"function"==typeof l.type&&(l.l=w)}}if(l.__e=k,null!=o&&"function"!=typeof l.type)for(v=o.length;v--;)null!=o[v]&&c(o[v]);for(v=P;v--;)null!=C[v]&&z(C[v],C[v]);if(b)for(v=0;v<b.length;v++)j(b[v],b[++v],b[++v])}function _(n,l,u,t){if(null==l&&(l=[]),null==n||"boolean"==typeof n)t&&l.push(null);else if(Array.isArray(n))for(var i=0;i<n.length;i++)_(n[i],l,u,t);else l.push(u?u(n):n);return l}function b(n,l,u,t,i){var r;for(r in u)r in l||C(n,r,null,u[r],t);for(r in l)i&&"function"!=typeof l[r]||"value"===r||"checked"===r||u[r]===l[r]||C(n,r,l[r],u[r],t)}function x(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]="number"==typeof u&&!1===o.test(l)?u+"px":u}function C(n,l,u,t,i){var r,f,o,e,c;if("key"===(l=i?"className"===l?"class":l:"class"===l?"className":l)||"children"===l);else if("style"===l)if(r=n.style,"string"==typeof u)r.cssText=u;else{if("string"==typeof t&&(r.cssText="",t=null),t)for(f in t)u&&f in u||x(r,f,"");if(u)for(o in u)t&&u[o]===t[o]||x(r,o,u[o])}else if("o"===l[0]&&"n"===l[1])e=l!==(l=l.replace(/Capture$/,"")),c=l.toLowerCase(),l=(c in n?c:l).slice(2),u?(t||n.addEventListener(l,P,e),(n.u||(n.u={}))[l]=u):n.removeEventListener(l,P,e);else if("list"!==l&&"tagName"!==l&&!i&&l in n)if(n.length&&"value"==l)for(l=n.length;l--;)n.options[l].selected=n.options[l].value==u;else n[l]=null==u?"":u;else"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/^xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u?n.removeAttribute(l):n.setAttribute(l,u))}function P(l){return this.u[l.type](n.event?n.event(l):l)}function N(l,u,t,i,r,f,o,c,s,a){var h,d,m,w,g,b,x,C,P,N,T=u.type;if(void 0!==u.constructor)return null;(h=n.__b)&&h(u);try{n:if("function"==typeof T){if(C=u.props,P=(h=T.contextType)&&i[h.__c],N=h?P?P.props.value:h.__p:i,t.__c?x=(d=u.__c=t.__c).__p=d.__E:(T.prototype&&T.prototype.render?u.__c=d=new T(C,N):(u.__c=d=new y(C,N),d.constructor=T,d.render=A),P&&P.sub(d),d.props=C,d.state||(d.state={}),d.context=N,d.__n=i,m=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=T.getDerivedStateFromProps&&e(d.__s==d.state?d.__s=e({},d.__s):d.__s,T.getDerivedStateFromProps(C,d.__s)),m)null==T.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&o.push(d);else{if(null==T.getDerivedStateFromProps&&null==c&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(C,N),!c&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(C,d.__s,N)){d.props=C,d.state=d.__s,d.__d=!1,d.__v=u,u.__e=t.__e,u.__k=t.__k;break n}null!=d.componentWillUpdate&&d.componentWillUpdate(C,d.__s,N)}for(w=d.props,g=d.state,d.context=N,d.props=C,d.state=d.__s,(h=n.__r)&&h(u),d.__d=!1,d.__v=u,d.__P=l,_(null!=(h=d.render(d.props,d.state,d.context))&&h.type==v&&null==h.key?h.props.children:h,u.__k=[],p,!0),null!=d.getChildContext&&(i=e(e({},i),d.getChildContext())),m||null==d.getSnapshotBeforeUpdate||(b=d.getSnapshotBeforeUpdate(w,g)),k(l,u,t,i,r,f,o,s,a),d.base=u.__e;h=d.__h.pop();)h.call(d);m||null==w||null==d.componentDidUpdate||d.componentDidUpdate(w,g,b),x&&(d.__E=d.__p=null)}else u.__e=$(t.__e,u,t,i,r,f,o,a);(h=n.diffed)&&h(u)}catch(l){n.__e(l,u,t)}return u.__e}function T(l,u){for(var t;t=l.pop();)try{t.componentDidMount()}catch(l){n.__e(l,t.__v)}n.__c&&n.__c(u)}function $(n,l,u,t,i,o,e,c){var s,a,h,v,p=u.props,y=l.props;if(i="svg"===l.type||i,null==n&&null!=o)for(s=0;s<o.length;s++)if(null!=(a=o[s])&&(null===l.type?3===a.nodeType:a.localName===l.type)){n=a,o[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(y);n=i?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type),o=null}return null===l.type?p!==y&&(n.data=y):l!==u&&(null!=o&&(o=f.slice.call(n.childNodes)),h=(p=u.props||preact_module_r).dangerouslySetInnerHTML,v=y.dangerouslySetInnerHTML,c||(v||h)&&(v&&h&&v.__html==h.__html||(n.innerHTML=v&&v.__html||"")),b(n,y,p,i,c),v||k(n,l,u,t,"foreignObject"!==l.type&&i,o,e,preact_module_r,c),c||("value"in y&&void 0!==y.value&&y.value!==n.value&&(n.value=null==y.value?"":y.value),"checked"in y&&void 0!==y.checked&&y.checked!==n.checked&&(n.checked=y.checked))),n}function j(l,u,t){try{"function"==typeof l?l(u):l.current=u}catch(l){n.__e(l,t)}}function z(l,u,t){var i,r,f;if(n.unmount&&n.unmount(l),(i=l.ref)&&j(i,null,u),t||"function"==typeof l.type||(t=null!=(r=l.__e)),l.__e=l.l=null,null!=(i=l.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(l){n.__e(l,u)}i.base=i.__P=null}if(i=l.__k)for(f=0;f<i.length;f++)i[f]&&z(i[f],u,t);null!=r&&c(r)}function A(n,l,u){return this.constructor(n,u)}function D(l,u,i){var o,e,c;n.__p&&n.__p(l,u),e=(o=i===preact_module_t)?null:i&&i.__k||u.__k,l=s(v,null,[l]),c=[],N(u,o?u.__k=l:(i||u).__k=l,e||preact_module_r,preact_module_r,void 0!==u.ownerSVGElement,i&&!o?[i]:e?null:f.slice.call(u.childNodes),c,!1,i||preact_module_r,o),T(c,l)}function H(n,l){D(n,l,preact_module_t)}function I(n,l){return l=e(e({},n.props),l),arguments.length>2&&(l.children=f.slice.call(arguments,2)),a(n.type,l,l.key||n.key,l.ref||n.ref)}function L(n){var l={},u={__c:"__cC"+preact_module_i++,__p:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var t,i=this;return this.getChildContext||(t=[],this.getChildContext=function(){return l[u.__c]=i,l},this.shouldComponentUpdate=function(n){t.some(function(l){l.__P&&(l.context=n.value,w(l))})},this.sub=function(n){t.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){t.splice(t.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Consumer.contextType=u,u}n={},y.prototype.setState=function(n,l){var u=this.__s!==this.state&&this.__s||(this.__s=e({},this.state));("function"!=typeof n||(n=n(u,this.props)))&&e(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),w(this))},y.prototype.forceUpdate=function(n){var l,u,t,i=this.__v,r=this.__v.__e,f=this.__P;f&&(l=!1!==n,u=[],t=N(f,i,e({},i),this.__n,void 0!==f.ownerSVGElement,null,u,l,null==r?d(i):r),T(u,i),t!=r&&m(i)),n&&n()},y.prototype.render=v,l=[],preact_module_u="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,n.__e=function(n,l,u){for(var t;l=l.__p;)if((t=l.__c)&&!t.__p)try{if(t.constructor&&null!=t.constructor.getDerivedStateFromError)t.setState(t.constructor.getDerivedStateFromError(n));else{if(null==t.componentDidCatch)continue;t.componentDidCatch(n)}return w(t.__E=t)}catch(l){n=l}throw n},preact_module_t=preact_module_r,preact_module_i=0;
//# sourceMappingURL=preact.module.js.map

// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/utils.js
function utils_isPromise(item) {
  try {
    if (!item) {
      return false;
    }

    if (typeof Promise !== 'undefined' && item instanceof Promise) {
      return true;
    }

    if (typeof window !== 'undefined' && typeof window.Window === 'function' && item instanceof window.Window) {
      return false;
    }

    if (typeof window !== 'undefined' && typeof window.constructor === 'function' && item instanceof window.constructor) {
      return false;
    }

    var _toString = {}.toString;

    if (_toString) {
      var name = _toString.call(item);

      if (name === '[object Window]' || name === '[object global]' || name === '[object DOMWindow]') {
        return false;
      }
    }

    if (typeof item.then === 'function') {
      return true;
    }
  } catch (err) {
    return false;
  }

  return false;
}
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/exceptions.js
var dispatchedErrors = [];
var possiblyUnhandledPromiseHandlers = [];
function dispatchPossiblyUnhandledError(err, promise) {
  if (dispatchedErrors.indexOf(err) !== -1) {
    return;
  }

  dispatchedErrors.push(err);
  setTimeout(function () {
    if (false) {}

    throw err;
  }, 1);

  for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) {
    // $FlowFixMe
    possiblyUnhandledPromiseHandlers[j](err, promise);
  }
}
function exceptions_onPossiblyUnhandledException(handler) {
  possiblyUnhandledPromiseHandlers.push(handler);
  return {
    cancel: function cancel() {
      possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
    }
  };
}
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/flush.js
var activeCount = 0;
var flushPromise;

function flushActive() {
  if (!activeCount && flushPromise) {
    var promise = flushPromise;
    flushPromise = null;
    promise.resolve();
  }
}

function startActive() {
  activeCount += 1;
}
function endActive() {
  activeCount -= 1;
  flushActive();
}
function awaitActive(Zalgo) {
  // eslint-disable-line no-undef
  var promise = flushPromise = flushPromise || new Zalgo();
  flushActive();
  return promise;
}
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/promise.js



var promise_ZalgoPromise =
/*#__PURE__*/
function () {
  function ZalgoPromise(handler) {
    var _this = this;

    this.resolved = void 0;
    this.rejected = void 0;
    this.errorHandled = void 0;
    this.value = void 0;
    this.error = void 0;
    this.handlers = void 0;
    this.dispatching = void 0;
    this.stack = void 0;
    this.resolved = false;
    this.rejected = false;
    this.errorHandled = false;
    this.handlers = [];

    if (handler) {
      var _result;

      var _error;

      var resolved = false;
      var rejected = false;
      var isAsync = false;
      startActive();

      try {
        handler(function (res) {
          if (isAsync) {
            _this.resolve(res);
          } else {
            resolved = true;
            _result = res;
          }
        }, function (err) {
          if (isAsync) {
            _this.reject(err);
          } else {
            rejected = true;
            _error = err;
          }
        });
      } catch (err) {
        endActive();
        this.reject(err);
        return;
      }

      endActive();
      isAsync = true;

      if (resolved) {
        // $FlowFixMe
        this.resolve(_result);
      } else if (rejected) {
        this.reject(_error);
      }
    }

    if (false) {}
  }

  var _proto = ZalgoPromise.prototype;

  _proto.resolve = function resolve(result) {
    if (this.resolved || this.rejected) {
      return this;
    }

    if (utils_isPromise(result)) {
      throw new Error('Can not resolve promise with another promise');
    }

    this.resolved = true;
    this.value = result;
    this.dispatch();
    return this;
  };

  _proto.reject = function reject(error) {
    var _this2 = this;

    if (this.resolved || this.rejected) {
      return this;
    }

    if (utils_isPromise(error)) {
      throw new Error('Can not reject promise with another promise');
    }

    if (!error) {
      // $FlowFixMe
      var _err = error && typeof error.toString === 'function' ? error.toString() : Object.prototype.toString.call(error);

      error = new Error("Expected reject to be called with Error, got " + _err);
    }

    this.rejected = true;
    this.error = error;

    if (!this.errorHandled) {
      setTimeout(function () {
        if (!_this2.errorHandled) {
          dispatchPossiblyUnhandledError(error, _this2);
        }
      }, 1);
    }

    this.dispatch();
    return this;
  };

  _proto.asyncReject = function asyncReject(error) {
    this.errorHandled = true;
    this.reject(error);
    return this;
  };

  _proto.dispatch = function dispatch() {
    var dispatching = this.dispatching,
        resolved = this.resolved,
        rejected = this.rejected,
        handlers = this.handlers;

    if (dispatching) {
      return;
    }

    if (!resolved && !rejected) {
      return;
    }

    this.dispatching = true;
    startActive();

    var chain = function chain(firstPromise, secondPromise) {
      return firstPromise.then(function (res) {
        secondPromise.resolve(res);
      }, function (err) {
        secondPromise.reject(err);
      });
    };

    for (var i = 0; i < handlers.length; i++) {
      var _handlers$i = handlers[i],
          onSuccess = _handlers$i.onSuccess,
          onError = _handlers$i.onError,
          promise = _handlers$i.promise;

      var _result2 = void 0;

      if (resolved) {
        try {
          _result2 = onSuccess ? onSuccess(this.value) : this.value;
        } catch (err) {
          promise.reject(err);
          continue;
        }
      } else if (rejected) {
        if (!onError) {
          promise.reject(this.error);
          continue;
        }

        try {
          _result2 = onError(this.error);
        } catch (err) {
          promise.reject(err);
          continue;
        }
      }

      if (_result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected)) {
        if (_result2.resolved) {
          promise.resolve(_result2.value);
        } else {
          promise.reject(_result2.error);
        }

        _result2.errorHandled = true;
      } else if (utils_isPromise(_result2)) {
        if (_result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected)) {
          if (_result2.resolved) {
            promise.resolve(_result2.value);
          } else {
            promise.reject(_result2.error);
          }
        } else {
          // $FlowFixMe
          chain(_result2, promise);
        }
      } else {
        promise.resolve(_result2);
      }
    }

    handlers.length = 0;
    this.dispatching = false;
    endActive();
  };

  _proto.then = function then(onSuccess, onError) {
    if (onSuccess && typeof onSuccess !== 'function' && !onSuccess.call) {
      throw new Error('Promise.then expected a function for success handler');
    }

    if (onError && typeof onError !== 'function' && !onError.call) {
      throw new Error('Promise.then expected a function for error handler');
    }

    var promise = new ZalgoPromise();
    this.handlers.push({
      promise: promise,
      onSuccess: onSuccess,
      onError: onError
    });
    this.errorHandled = true;
    this.dispatch();
    return promise;
  };

  _proto.catch = function _catch(onError) {
    return this.then(undefined, onError);
  };

  _proto.finally = function _finally(onFinally) {
    if (onFinally && typeof onFinally !== 'function' && !onFinally.call) {
      throw new Error('Promise.finally expected a function');
    }

    return this.then(function (result) {
      return ZalgoPromise.try(onFinally).then(function () {
        return result;
      });
    }, function (err) {
      return ZalgoPromise.try(onFinally).then(function () {
        throw err;
      });
    });
  };

  _proto.timeout = function timeout(time, err) {
    var _this3 = this;

    if (this.resolved || this.rejected) {
      return this;
    }

    var timeout = setTimeout(function () {
      if (_this3.resolved || _this3.rejected) {
        return;
      }

      _this3.reject(err || new Error("Promise timed out after " + time + "ms"));
    }, time);
    return this.then(function (result) {
      clearTimeout(timeout);
      return result;
    });
  } // $FlowFixMe
  ;

  _proto.toPromise = function toPromise() {
    // $FlowFixMe
    if (typeof Promise === 'undefined') {
      throw new TypeError("Could not find Promise");
    } // $FlowFixMe


    return Promise.resolve(this); // eslint-disable-line compat/compat
  };

  ZalgoPromise.resolve = function resolve(value) {
    if (value instanceof ZalgoPromise) {
      return value;
    }

    if (utils_isPromise(value)) {
      // $FlowFixMe
      return new ZalgoPromise(function (resolve, reject) {
        return value.then(resolve, reject);
      });
    }

    return new ZalgoPromise().resolve(value);
  };

  ZalgoPromise.reject = function reject(error) {
    return new ZalgoPromise().reject(error);
  };

  ZalgoPromise.asyncReject = function asyncReject(error) {
    return new ZalgoPromise().asyncReject(error);
  };

  ZalgoPromise.all = function all(promises) {
    // eslint-disable-line no-undef
    var promise = new ZalgoPromise();
    var count = promises.length;
    var results = [];

    if (!count) {
      promise.resolve(results);
      return promise;
    }

    var chain = function chain(i, firstPromise, secondPromise) {
      return firstPromise.then(function (res) {
        results[i] = res;
        count -= 1;

        if (count === 0) {
          promise.resolve(results);
        }
      }, function (err) {
        secondPromise.reject(err);
      });
    };

    for (var i = 0; i < promises.length; i++) {
      var prom = promises[i];

      if (prom instanceof ZalgoPromise) {
        if (prom.resolved) {
          results[i] = prom.value;
          count -= 1;
          continue;
        }
      } else if (!utils_isPromise(prom)) {
        results[i] = prom;
        count -= 1;
        continue;
      }

      chain(i, ZalgoPromise.resolve(prom), promise);
    }

    if (count === 0) {
      promise.resolve(results);
    }

    return promise;
  };

  ZalgoPromise.hash = function hash(promises) {
    // eslint-disable-line no-undef
    var result = {};
    return ZalgoPromise.all(Object.keys(promises).map(function (key) {
      return ZalgoPromise.resolve(promises[key]).then(function (value) {
        result[key] = value;
      });
    })).then(function () {
      return result;
    });
  };

  ZalgoPromise.map = function map(items, method) {
    // $FlowFixMe
    return ZalgoPromise.all(items.map(method));
  };

  ZalgoPromise.onPossiblyUnhandledException = function onPossiblyUnhandledException(handler) {
    return exceptions_onPossiblyUnhandledException(handler);
  };

  ZalgoPromise.try = function _try(method, context, args) {
    if (method && typeof method !== 'function' && !method.call) {
      throw new Error('Promise.try expected a function');
    }

    var result;
    startActive();

    try {
      // $FlowFixMe
      result = method.apply(context, args || []);
    } catch (err) {
      endActive();
      return ZalgoPromise.reject(err);
    }

    endActive();
    return ZalgoPromise.resolve(result);
  };

  ZalgoPromise.delay = function delay(_delay) {
    return new ZalgoPromise(function (resolve) {
      setTimeout(resolve, _delay);
    });
  };

  ZalgoPromise.isPromise = function isPromise(value) {
    if (value && value instanceof ZalgoPromise) {
      return true;
    }

    return utils_isPromise(value);
  };

  ZalgoPromise.flush = function flush() {
    return awaitActive(ZalgoPromise);
  };

  return ZalgoPromise;
}();
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/index.js

// CONCATENATED MODULE: ./node_modules/belter/src/device.js
function getUserAgent() {
  return window.navigator.mockUserAgent || window.navigator.userAgent;
}
function isDevice(userAgent) {
  if (userAgent === void 0) {
    userAgent = getUserAgent();
  }

  if (userAgent.match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i)) {
    return true;
  }

  return false;
}
function isWebView() {
  var userAgent = getUserAgent();
  return /(iPhone|iPod|iPad|Macintosh).*AppleWebKit(?!.*Safari)/i.test(userAgent) || /\bwv\b/.test(userAgent) || /Android.*Version\/(\d)\.(\d)/i.test(userAgent);
}
function isStandAlone() {
  return window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
}
function isFacebookWebView(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return ua.indexOf('FBAN') !== -1 || ua.indexOf('FBAV') !== -1;
}
function isFirefoxIOS(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /FxiOS/i.test(ua);
}
function isEdgeIOS(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /EdgiOS/i.test(ua);
}
function isOperaMini(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return ua.indexOf('Opera Mini') > -1;
}
function isAndroid(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /Android/.test(ua);
}
function isIos(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /iPhone|iPod|iPad/.test(ua);
}
function isGoogleSearchApp(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /\bGSA\b/.test(ua);
}
function isQQBrowser(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /QQBrowser/.test(ua);
}
function isIosWebview(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  if (isIos(ua)) {
    if (isGoogleSearchApp(ua)) {
      return true;
    }

    return /.+AppleWebKit(?!.*Safari)/.test(ua);
  }

  return false;
}
function isAndroidWebview(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  if (isAndroid(ua)) {
    return /Version\/[\d.]+/.test(ua) && !isOperaMini(ua);
  }

  return false;
}
function device_isIE() {
  if (window.document.documentMode) {
    return true;
  }

  return Boolean(window.navigator && window.navigator.userAgent && /Edge|MSIE|rv:11/i.test(window.navigator.userAgent));
}
function isIECompHeader() {
  var mHttp = window.document.querySelector('meta[http-equiv="X-UA-Compatible"]');
  var mContent = window.document.querySelector('meta[content="IE=edge"]');

  if (mHttp && mContent) {
    return true;
  }

  return false;
}
function isElectron() {
  if (typeof process !== 'undefined' && process.versions && process.versions.electron) {
    return true;
  }

  return false;
}
function isIEIntranet() {
  // This status check only works for older versions of IE with document.documentMode set
  if (window.document.documentMode) {
    try {
      var status = window.status;
      window.status = 'testIntranetMode';

      if (window.status === 'testIntranetMode') {
        window.status = status;
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  return false;
}
function isMacOsCna() {
  var userAgent = getUserAgent();
  return /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent);
}
function supportsPopups(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return !(isIosWebview(ua) || isAndroidWebview(ua) || isOperaMini(ua) || isFirefoxIOS(ua) || isEdgeIOS(ua) || isFacebookWebView(ua) || isQQBrowser(ua) || isElectron() || isMacOsCna() || isStandAlone());
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/util.js
function isRegex(item) {
  return Object.prototype.toString.call(item) === '[object RegExp]';
} // eslint-disable-next-line no-unused-vars

function noop() {// pass
}
// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/constants.js
var PROTOCOL = {
  MOCK: 'mock:',
  FILE: 'file:',
  ABOUT: 'about:'
};
var WILDCARD = '*';
var WINDOW_TYPE = {
  IFRAME: 'iframe',
  POPUP: 'popup'
};
// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/utils.js
/* eslint max-lines: 0 */


var IE_WIN_ACCESS_ERROR = 'Call was rejected by callee.\r\n';
function isFileProtocol(win) {
  if (win === void 0) {
    win = window;
  }

  return win.location.protocol === PROTOCOL.FILE;
}
function isAboutProtocol(win) {
  if (win === void 0) {
    win = window;
  }

  return win.location.protocol === PROTOCOL.ABOUT;
}
function getParent(win) {
  if (win === void 0) {
    win = window;
  }

  if (!win) {
    return;
  }

  try {
    if (win.parent && win.parent !== win) {
      return win.parent;
    }
  } catch (err) {// pass
  }
}
function getOpener(win) {
  if (win === void 0) {
    win = window;
  }

  if (!win) {
    return;
  } // Make sure we're not actually an iframe which has had window.open() called on us


  if (getParent(win)) {
    return;
  }

  try {
    return win.opener;
  } catch (err) {// pass
  }
}
function canReadFromWindow(win) {
  try {
    // $FlowFixMe
    noop(win && win.location && win.location.href);
    return true;
  } catch (err) {// pass
  }

  return false;
}
function getActualDomain(win) {
  if (win === void 0) {
    win = window;
  }

  var location = win.location;

  if (!location) {
    throw new Error("Can not read window location");
  }

  var protocol = location.protocol;

  if (!protocol) {
    throw new Error("Can not read window protocol");
  }

  if (protocol === PROTOCOL.FILE) {
    return PROTOCOL.FILE + "//";
  }

  if (protocol === PROTOCOL.ABOUT) {
    var parent = getParent(win);

    if (parent && canReadFromWindow(parent)) {
      // $FlowFixMe
      return getActualDomain(parent);
    }

    return PROTOCOL.ABOUT + "//";
  }

  var host = location.host;

  if (!host) {
    throw new Error("Can not read window host");
  }

  return protocol + "//" + host;
}
function getDomain(win) {
  if (win === void 0) {
    win = window;
  }

  var domain = getActualDomain(win);

  if (domain && win.mockDomain && win.mockDomain.indexOf(PROTOCOL.MOCK) === 0) {
    return win.mockDomain;
  }

  return domain;
}
function isBlankDomain(win) {
  try {
    // $FlowFixMe
    if (!win.location.href) {
      return true;
    }

    if (win.location.href === 'about:blank') {
      return true;
    }
  } catch (err) {// pass
  }

  return false;
}
function isActuallySameDomain(win) {
  try {
    if (win === window) {
      return true;
    }
  } catch (err) {// pass
  }

  try {
    var desc = Object.getOwnPropertyDescriptor(win, 'location');

    if (desc && desc.enumerable === false) {
      return false;
    }
  } catch (err) {// pass
  }

  try {
    // $FlowFixMe
    if (isAboutProtocol(win) && canReadFromWindow(win)) {
      return true;
    }
  } catch (err) {// pass
  }

  try {
    // $FlowFixMe
    if (getActualDomain(win) === getActualDomain(window)) {
      return true;
    }
  } catch (err) {// pass
  }

  return false;
}
function isSameDomain(win) {
  if (!isActuallySameDomain(win)) {
    return false;
  }

  try {
    if (win === window) {
      return true;
    } // $FlowFixMe


    if (isAboutProtocol(win) && canReadFromWindow(win)) {
      return true;
    } // $FlowFixMe


    if (getDomain(window) === getDomain(win)) {
      return true;
    }
  } catch (err) {// pass
  }

  return false;
}
function assertSameDomain(win) {
  if (!isSameDomain(win)) {
    throw new Error("Expected window to be same domain");
  } // $FlowFixMe


  return win;
}
function getParents(win) {
  var result = [];

  try {
    while (win.parent !== win) {
      result.push(win.parent);
      win = win.parent;
    }
  } catch (err) {// pass
  }

  return result;
}
function isAncestorParent(parent, child) {
  if (!parent || !child) {
    return false;
  }

  var childParent = getParent(child);

  if (childParent) {
    return childParent === parent;
  }

  if (getParents(child).indexOf(parent) !== -1) {
    return true;
  }

  return false;
}
function getFrames(win) {
  var result = [];
  var frames;

  try {
    frames = win.frames;
  } catch (err) {
    frames = win;
  }

  var len;

  try {
    len = frames.length;
  } catch (err) {// pass
  }

  if (len === 0) {
    return result;
  }

  if (len) {
    for (var i = 0; i < len; i++) {
      var frame = void 0;

      try {
        frame = frames[i];
      } catch (err) {
        continue;
      }

      result.push(frame);
    }

    return result;
  }

  for (var _i = 0; _i < 100; _i++) {
    var _frame = void 0;

    try {
      _frame = frames[_i];
    } catch (err) {
      return result;
    }

    if (!_frame) {
      return result;
    }

    result.push(_frame);
  }

  return result;
}
function getAllChildFrames(win) {
  var result = [];

  for (var _i3 = 0, _getFrames2 = getFrames(win); _i3 < _getFrames2.length; _i3++) {
    var frame = _getFrames2[_i3];
    result.push(frame);

    for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame); _i5 < _getAllChildFrames2.length; _i5++) {
      var childFrame = _getAllChildFrames2[_i5];
      result.push(childFrame);
    }
  }

  return result;
}
function getTop(win) {
  if (win === void 0) {
    win = window;
  }

  try {
    if (win.top) {
      return win.top;
    }
  } catch (err) {// pass
  }

  if (getParent(win) === win) {
    return win;
  }

  try {
    if (isAncestorParent(window, win) && window.top) {
      return window.top;
    }
  } catch (err) {// pass
  }

  try {
    if (isAncestorParent(win, window) && window.top) {
      return window.top;
    }
  } catch (err) {// pass
  }

  for (var _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win); _i7 < _getAllChildFrames4.length; _i7++) {
    var frame = _getAllChildFrames4[_i7];

    try {
      if (frame.top) {
        return frame.top;
      }
    } catch (err) {// pass
    }

    if (getParent(frame) === frame) {
      return frame;
    }
  }
}
function getNextOpener(win) {
  if (win === void 0) {
    win = window;
  }

  return getOpener(getTop(win) || win);
}
function getUltimateTop(win) {
  if (win === void 0) {
    win = window;
  }

  var opener = getNextOpener(win);

  if (opener) {
    return getUltimateTop(opener);
  }

  return top;
}
function getAllFramesInWindow(win) {
  var top = getTop(win);

  if (!top) {
    throw new Error("Can not determine top window");
  }

  return [].concat(getAllChildFrames(top), [top]);
}
function getAllWindows(win) {
  if (win === void 0) {
    win = window;
  }

  var frames = getAllFramesInWindow(win);
  var opener = getNextOpener(win);

  if (opener) {
    return [].concat(getAllWindows(opener), frames);
  } else {
    return frames;
  }
}
function isTop(win) {
  return win === getTop(win);
}
function isFrameWindowClosed(frame) {
  if (!frame.contentWindow) {
    return true;
  }

  if (!frame.parentNode) {
    return true;
  }

  var doc = frame.ownerDocument;

  if (doc && doc.documentElement && !doc.documentElement.contains(frame)) {
    return true;
  }

  return false;
}

function safeIndexOf(collection, item) {
  for (var i = 0; i < collection.length; i++) {
    try {
      if (collection[i] === item) {
        return i;
      }
    } catch (err) {// pass
    }
  }

  return -1;
}

var iframeWindows = [];
var iframeFrames = [];
function isWindowClosed(win, allowMock) {
  if (allowMock === void 0) {
    allowMock = true;
  }

  try {
    if (win === window) {
      return false;
    }
  } catch (err) {
    return true;
  }

  try {
    if (!win) {
      return true;
    }
  } catch (err) {
    return true;
  }

  try {
    if (win.closed) {
      return true;
    }
  } catch (err) {
    // I love you so much IE
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return false;
    }

    return true;
  }

  if (allowMock && isSameDomain(win)) {
    try {
      // $FlowFixMe
      if (win.mockclosed) {
        return true;
      }
    } catch (err) {// pass
    }
  } // Mobile safari


  try {
    if (!win.parent || !win.top) {
      return true;
    }
  } catch (err) {} // pass
  // Yes, this actually happens in IE. win === win errors out when the window
  // is from an iframe, and the iframe was removed from the page.


  try {
    noop(win === win); // eslint-disable-line no-self-compare
  } catch (err) {
    return true;
  } // IE orphaned frame


  var iframeIndex = safeIndexOf(iframeWindows, win);

  if (iframeIndex !== -1) {
    var frame = iframeFrames[iframeIndex];

    if (frame && isFrameWindowClosed(frame)) {
      return true;
    }
  }

  return false;
}

function cleanIframes() {
  for (var i = 0; i < iframeWindows.length; i++) {
    var closed = false;

    try {
      closed = iframeWindows[i].closed;
    } catch (err) {// pass
    }

    if (closed) {
      iframeFrames.splice(i, 1);
      iframeWindows.splice(i, 1);
    }
  }
}

function linkFrameWindow(frame) {
  cleanIframes();

  if (frame && frame.contentWindow) {
    try {
      iframeWindows.push(frame.contentWindow);
      iframeFrames.push(frame);
    } catch (err) {// pass
    }
  }
}
function utils_getUserAgent(win) {
  win = win || window;
  return win.navigator.mockUserAgent || win.navigator.userAgent;
}
function getFrameByName(win, name) {
  var winFrames = getFrames(win);

  for (var _i9 = 0; _i9 < winFrames.length; _i9++) {
    var childFrame = winFrames[_i9];

    try {
      // $FlowFixMe
      if (isSameDomain(childFrame) && childFrame.name === name && winFrames.indexOf(childFrame) !== -1) {
        return childFrame;
      }
    } catch (err) {// pass
    }
  }

  try {
    // $FlowFixMe
    if (winFrames.indexOf(win.frames[name]) !== -1) {
      // $FlowFixMe
      return win.frames[name];
    }
  } catch (err) {// pass
  }

  try {
    if (winFrames.indexOf(win[name]) !== -1) {
      return win[name];
    }
  } catch (err) {// pass
  }
}
function findChildFrameByName(win, name) {
  var frame = getFrameByName(win, name);

  if (frame) {
    return frame;
  }

  for (var _i11 = 0, _getFrames4 = getFrames(win); _i11 < _getFrames4.length; _i11++) {
    var childFrame = _getFrames4[_i11];
    var namedFrame = findChildFrameByName(childFrame, name);

    if (namedFrame) {
      return namedFrame;
    }
  }
}
function findFrameByName(win, name) {
  var frame;
  frame = getFrameByName(win, name);

  if (frame) {
    return frame;
  }

  var top = getTop(win) || win;
  return findChildFrameByName(top, name);
}
function isParent(win, frame) {
  var frameParent = getParent(frame);

  if (frameParent) {
    return frameParent === win;
  }

  for (var _i13 = 0, _getFrames6 = getFrames(win); _i13 < _getFrames6.length; _i13++) {
    var childFrame = _getFrames6[_i13];

    if (childFrame === frame) {
      return true;
    }
  }

  return false;
}
function isOpener(parent, child) {
  return parent === getOpener(child);
}
function getAncestor(win) {
  if (win === void 0) {
    win = window;
  }

  win = win || window;
  var opener = getOpener(win);

  if (opener) {
    return opener;
  }

  var parent = getParent(win);

  if (parent) {
    return parent;
  }
}
function getAncestors(win) {
  var results = [];
  var ancestor = win;

  while (ancestor) {
    ancestor = getAncestor(ancestor);

    if (ancestor) {
      results.push(ancestor);
    }
  }

  return results;
}
function isAncestor(parent, child) {
  var actualParent = getAncestor(child);

  if (actualParent) {
    if (actualParent === parent) {
      return true;
    }

    return false;
  }

  if (child === parent) {
    return false;
  }

  if (getTop(child) === child) {
    return false;
  }

  for (var _i15 = 0, _getFrames8 = getFrames(parent); _i15 < _getFrames8.length; _i15++) {
    var frame = _getFrames8[_i15];

    if (frame === child) {
      return true;
    }
  }

  return false;
}
function isPopup(win) {
  if (win === void 0) {
    win = window;
  }

  return Boolean(getOpener(win));
}
function isIframe(win) {
  if (win === void 0) {
    win = window;
  }

  return Boolean(getParent(win));
}
function isFullpage(win) {
  if (win === void 0) {
    win = window;
  }

  return Boolean(!isIframe(win) && !isPopup(win));
}

function anyMatch(collection1, collection2) {
  for (var _i17 = 0; _i17 < collection1.length; _i17++) {
    var item1 = collection1[_i17];

    for (var _i19 = 0; _i19 < collection2.length; _i19++) {
      var item2 = collection2[_i19];

      if (item1 === item2) {
        return true;
      }
    }
  }

  return false;
}

function getDistanceFromTop(win) {
  if (win === void 0) {
    win = window;
  }

  var distance = 0;
  var parent = win;

  while (parent) {
    parent = getParent(parent);

    if (parent) {
      distance += 1;
    }
  }

  return distance;
}
function getNthParent(win, n) {
  if (n === void 0) {
    n = 1;
  }

  var parent = win;

  for (var i = 0; i < n; i++) {
    if (!parent) {
      return;
    }

    parent = getParent(parent);
  }

  return parent;
}
function getNthParentFromTop(win, n) {
  if (n === void 0) {
    n = 1;
  }

  return getNthParent(win, getDistanceFromTop(win) - n);
}
function isSameTopWindow(win1, win2) {
  var top1 = getTop(win1) || win1;
  var top2 = getTop(win2) || win2;

  try {
    if (top1 && top2) {
      if (top1 === top2) {
        return true;
      }

      return false;
    }
  } catch (err) {// pass
  }

  var allFrames1 = getAllFramesInWindow(win1);
  var allFrames2 = getAllFramesInWindow(win2);

  if (anyMatch(allFrames1, allFrames2)) {
    return true;
  }

  var opener1 = getOpener(top1);
  var opener2 = getOpener(top2);

  if (opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2)) {
    return false;
  }

  if (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1)) {
    return false;
  }

  return false;
}
function matchDomain(pattern, origin) {
  if (typeof pattern === 'string') {
    if (typeof origin === 'string') {
      return pattern === WILDCARD || origin === pattern;
    }

    if (isRegex(origin)) {
      return false;
    }

    if (Array.isArray(origin)) {
      return false;
    }
  }

  if (isRegex(pattern)) {
    if (isRegex(origin)) {
      return pattern.toString() === origin.toString();
    }

    if (Array.isArray(origin)) {
      return false;
    } // $FlowFixMe


    return Boolean(origin.match(pattern));
  }

  if (Array.isArray(pattern)) {
    if (Array.isArray(origin)) {
      return JSON.stringify(pattern) === JSON.stringify(origin);
    }

    if (isRegex(origin)) {
      return false;
    }

    return pattern.some(function (subpattern) {
      return matchDomain(subpattern, origin);
    });
  }

  return false;
}
function stringifyDomainPattern(pattern) {
  if (Array.isArray(pattern)) {
    return "(" + pattern.join(' | ') + ")";
  } else if (isRegex(pattern)) {
    return "RegExp(" + pattern.toString();
  } else {
    return pattern.toString();
  }
}
function getDomainFromUrl(url) {
  var domain;

  if (url.match(/^(https?|mock|file):\/\//)) {
    domain = url;
  } else {
    return getDomain();
  }

  domain = domain.split('/').slice(0, 3).join('/');
  return domain;
}
function onCloseWindow(win, callback, delay, maxtime) {
  if (delay === void 0) {
    delay = 1000;
  }

  if (maxtime === void 0) {
    maxtime = Infinity;
  }

  var timeout;

  var check = function check() {
    if (isWindowClosed(win)) {
      if (timeout) {
        clearTimeout(timeout);
      }

      return callback();
    }

    if (maxtime <= 0) {
      clearTimeout(timeout);
    } else {
      maxtime -= delay;
      timeout = setTimeout(check, delay);
    }
  };

  check();
  return {
    cancel: function cancel() {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  };
} // eslint-disable-next-line complexity

function isWindow(obj) {
  try {
    if (obj === window) {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (Object.prototype.toString.call(obj) === '[object Window]') {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (window.Window && obj instanceof window.Window) {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (obj && obj.self === obj) {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (obj && obj.parent === obj) {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (obj && obj.top === obj) {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (noop(obj === obj) === '__unlikely_value__') {
      // eslint-disable-line no-self-compare
      return false;
    }
  } catch (err) {
    return true;
  }

  try {
    if (obj && obj.__cross_domain_utils_window_check__ === '__unlikely_value__') {
      return false;
    }
  } catch (err) {
    return true;
  }

  return false;
}
function isBrowser() {
  return typeof window !== 'undefined' && typeof window.location !== 'undefined';
}
function isCurrentDomain(domain) {
  if (!isBrowser()) {
    return false;
  }

  return getDomain() === domain;
}
function isMockDomain(domain) {
  return domain.indexOf(PROTOCOL.MOCK) === 0;
}
function normalizeMockUrl(url) {
  if (!isMockDomain(getDomainFromUrl(url))) {
    return url;
  }

  if (true) {
    throw new Error("Mock urls not supported out of test mode");
  }

  return url.replace(/^mock:\/\/[^/]+/, getActualDomain(window));
}
function closeWindow(win) {
  try {
    win.close();
  } catch (err) {// pass
  }
}
// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/types.js
// export something to force webpack to see this as an ES module
var TYPES = true;
// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/index.js



// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/native.js
function hasNativeWeakMap() {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  if (typeof Object.freeze === 'undefined') {
    return false;
  }

  try {
    var testWeakMap = new WeakMap();
    var testKey = {};
    var testValue = '__testvalue__';
    Object.freeze(testKey);
    testWeakMap.set(testKey, testValue);

    if (testWeakMap.get(testKey) === testValue) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}
// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/util.js
function util_safeIndexOf(collection, item) {
  for (var i = 0; i < collection.length; i++) {
    try {
      if (collection[i] === item) {
        return i;
      }
    } catch (err) {// pass
    }
  }

  return -1;
} // eslint-disable-next-line no-unused-vars

function util_noop() {// pass
}
// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/weakmap.js



var weakmap_CrossDomainSafeWeakMap =
/*#__PURE__*/
function () {
  function CrossDomainSafeWeakMap() {
    this.name = void 0;
    this.weakmap = void 0;
    this.keys = void 0;
    this.values = void 0;
    // eslint-disable-next-line no-bitwise
    this.name = "__weakmap_" + (Math.random() * 1e9 >>> 0) + "__";

    if (hasNativeWeakMap()) {
      try {
        this.weakmap = new WeakMap();
      } catch (err) {// pass
      }
    }

    this.keys = [];
    this.values = [];
  }

  var _proto = CrossDomainSafeWeakMap.prototype;

  _proto._cleanupClosedWindows = function _cleanupClosedWindows() {
    var weakmap = this.weakmap;
    var keys = this.keys;

    for (var i = 0; i < keys.length; i++) {
      var value = keys[i];

      if (isWindow(value) && isWindowClosed(value)) {
        if (weakmap) {
          try {
            weakmap.delete(value);
          } catch (err) {// pass
          }
        }

        keys.splice(i, 1);
        this.values.splice(i, 1);
        i -= 1;
      }
    }
  };

  _proto.isSafeToReadWrite = function isSafeToReadWrite(key) {
    if (isWindow(key)) {
      return false;
    }

    try {
      util_noop(key && key.self);
      util_noop(key && key[this.name]);
    } catch (err) {
      return false;
    }

    return true;
  };

  _proto.set = function set(key, value) {
    if (!key) {
      throw new Error("WeakMap expected key");
    }

    var weakmap = this.weakmap;

    if (weakmap) {
      try {
        weakmap.set(key, value);
      } catch (err) {
        delete this.weakmap;
      }
    }

    if (this.isSafeToReadWrite(key)) {
      try {
        var name = this.name;
        var entry = key[name];

        if (entry && entry[0] === key) {
          entry[1] = value;
        } else {
          Object.defineProperty(key, name, {
            value: [key, value],
            writable: true
          });
        }

        return;
      } catch (err) {// pass
      }
    }

    this._cleanupClosedWindows();

    var keys = this.keys;
    var values = this.values;
    var index = util_safeIndexOf(keys, key);

    if (index === -1) {
      keys.push(key);
      values.push(value);
    } else {
      values[index] = value;
    }
  };

  _proto.get = function get(key) {
    if (!key) {
      throw new Error("WeakMap expected key");
    }

    var weakmap = this.weakmap;

    if (weakmap) {
      try {
        if (weakmap.has(key)) {
          return weakmap.get(key);
        }
      } catch (err) {
        delete this.weakmap;
      }
    }

    if (this.isSafeToReadWrite(key)) {
      try {
        var entry = key[this.name];

        if (entry && entry[0] === key) {
          return entry[1];
        }

        return;
      } catch (err) {// pass
      }
    }

    this._cleanupClosedWindows();

    var keys = this.keys;
    var index = util_safeIndexOf(keys, key);

    if (index === -1) {
      return;
    }

    return this.values[index];
  };

  _proto.delete = function _delete(key) {
    if (!key) {
      throw new Error("WeakMap expected key");
    }

    var weakmap = this.weakmap;

    if (weakmap) {
      try {
        weakmap.delete(key);
      } catch (err) {
        delete this.weakmap;
      }
    }

    if (this.isSafeToReadWrite(key)) {
      try {
        var entry = key[this.name];

        if (entry && entry[0] === key) {
          entry[0] = entry[1] = undefined;
        }
      } catch (err) {// pass
      }
    }

    this._cleanupClosedWindows();

    var keys = this.keys;
    var index = util_safeIndexOf(keys, key);

    if (index !== -1) {
      keys.splice(index, 1);
      this.values.splice(index, 1);
    }
  };

  _proto.has = function has(key) {
    if (!key) {
      throw new Error("WeakMap expected key");
    }

    var weakmap = this.weakmap;

    if (weakmap) {
      try {
        if (weakmap.has(key)) {
          return true;
        }
      } catch (err) {
        delete this.weakmap;
      }
    }

    if (this.isSafeToReadWrite(key)) {
      try {
        var entry = key[this.name];

        if (entry && entry[0] === key) {
          return true;
        }

        return false;
      } catch (err) {// pass
      }
    }

    this._cleanupClosedWindows();

    var index = util_safeIndexOf(this.keys, key);
    return index !== -1;
  };

  _proto.getOrSet = function getOrSet(key, getter) {
    if (this.has(key)) {
      // $FlowFixMe
      return this.get(key);
    }

    var value = getter();
    this.set(key, value);
    return value;
  };

  return CrossDomainSafeWeakMap;
}();
// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/index.js

// CONCATENATED MODULE: ./node_modules/belter/src/util.js
/* eslint max-lines: 0 */


function getFunctionName(fn) {
  return fn.name || fn.__name__ || fn.displayName || 'anonymous';
}
function setFunctionName(fn, name) {
  try {
    delete fn.name;
    fn.name = name;
  } catch (err) {// pass
  }

  fn.__name__ = fn.displayName = name;
  return fn;
}
function base64encode(str) {
  if (typeof btoa === 'function') {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (m, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf8').toString('base64');
  }

  throw new Error("Can not find window.btoa or Buffer");
}
function base64decode(str) {
  if (typeof atob === 'function') {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
      // eslint-disable-next-line prefer-template
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString('utf8');
  }

  throw new Error("Can not find window.atob or Buffer");
}
function uniqueID() {
  var chars = '0123456789abcdef';
  var randomID = 'xxxxxxxxxx'.replace(/./g, function () {
    return chars.charAt(Math.floor(Math.random() * chars.length));
  });
  var timeID = base64encode(new Date().toISOString().slice(11, 19).replace('T', '.')).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return randomID + "_" + timeID;
}
function getGlobal() {
  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error("No global found");
}
var objectIDs;
function getObjectID(obj) {
  objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap();

  if (obj === null || obj === undefined || typeof obj !== 'object' && typeof obj !== 'function') {
    throw new Error("Invalid object");
  }

  var uid = objectIDs.get(obj);

  if (!uid) {
    uid = typeof obj + ":" + uniqueID();
    objectIDs.set(obj, uid);
  }

  return uid;
}

function serializeArgs(args) {
  try {
    return JSON.stringify(Array.prototype.slice.call(args), function (subkey, val) {
      if (typeof val === 'function') {
        return "memoize[" + getObjectID(val) + "]";
      }

      return val;
    });
  } catch (err) {
    throw new Error("Arguments not serializable -- can not be used to memoize");
  }
}

function memoize(method, options) {
  var _this = this;

  if (options === void 0) {
    options = {};
  }

  var cacheMap = new weakmap_CrossDomainSafeWeakMap(); // $FlowFixMe

  var memoizedFunction = function memoizedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var cache = cacheMap.getOrSet(options.thisNamespace ? this : method, function () {
      return {};
    });
    var key = serializeArgs(args);
    var cacheTime = options.time;

    if (cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime) {
      delete cache[key];
    }

    if (cache[key]) {
      return cache[key].value;
    }

    var time = Date.now();
    var value = method.apply(this, arguments);
    cache[key] = {
      time: time,
      value: value
    };
    return cache[key].value;
  };

  memoizedFunction.reset = function () {
    cacheMap.delete(options.thisNamespace ? _this : method);
  };

  return setFunctionName(memoizedFunction, getFunctionName(method) + "::memoized");
} // eslint-disable-next-line flowtype/no-weak-types

function memoizePromise(method) {
  var cache = {}; // eslint-disable-next-line flowtype/no-weak-types

  function memoizedPromiseFunction() {
    var _this2 = this,
        _arguments = arguments;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var key = serializeArgs(args);

    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }

    cache[key] = promise_ZalgoPromise.try(function () {
      return method.apply(_this2, _arguments);
    }).finally(function () {
      delete cache[key];
    });
    return cache[key];
  }

  memoizedPromiseFunction.reset = function () {
    cache = {};
  };

  return setFunctionName(memoizedPromiseFunction, getFunctionName(method) + "::promiseMemoized");
} // eslint-disable-next-line flowtype/no-weak-types

function promisify(method, options) {
  if (options === void 0) {
    options = {};
  }

  function promisifiedFunction() {
    return promise_ZalgoPromise.try(method, this, arguments);
  }

  if (options.name) {
    promisifiedFunction.displayName = options.name + ":promisified";
  }

  return setFunctionName(promisifiedFunction, getFunctionName(method) + "::promisified");
} // eslint-disable-next-line flowtype/no-weak-types

function inlineMemoize(method, logic, args) {
  if (args === void 0) {
    args = [];
  }

  // $FlowFixMe
  var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {};
  var key = serializeArgs(args);

  if (cache.hasOwnProperty(key)) {
    return cache[key];
  }

  var result = cache[key] = logic.apply(void 0, args);
  return result;
} // eslint-disable-next-line no-unused-vars

function src_util_noop() {// pass
}
function once(method) {
  var called = false;

  var onceFunction = function onceFunction() {
    if (!called) {
      called = true;
      return method.apply(this, arguments);
    }
  };

  return setFunctionName(onceFunction, getFunctionName(method) + "::once");
}
function hashStr(str) {
  var hash = 0;

  for (var i = 0; i < str.length; i++) {
    hash += str[i].charCodeAt(0) * Math.pow(i % 10 + 1, 5);
  }

  return Math.floor(Math.pow(Math.sqrt(hash), 5));
}
function strHashStr(str) {
  var hash = '';

  for (var i = 0; i < str.length; i++) {
    var total = str[i].charCodeAt(0) * i;

    if (str[i + 1]) {
      total += str[i + 1].charCodeAt(0) * (i - 1);
    }

    hash += String.fromCharCode(97 + Math.abs(total) % 26);
  }

  return hash;
}
function match(str, pattern) {
  var regmatch = str.match(pattern);

  if (regmatch) {
    return regmatch[1];
  }
}
function awaitKey(obj, key) {
  return new promise_ZalgoPromise(function (resolve) {
    var value = obj[key];

    if (value) {
      return resolve(value);
    }

    delete obj[key];
    Object.defineProperty(obj, key, {
      configurable: true,
      set: function set(item) {
        value = item;

        if (value) {
          resolve(value);
        }
      },
      get: function get() {
        return value;
      }
    });
  });
}
function stringifyError(err, level) {
  if (level === void 0) {
    level = 1;
  }

  if (level >= 3) {
    return 'stringifyError stack overflow';
  }

  try {
    if (!err) {
      return "<unknown error: " + Object.prototype.toString.call(err) + ">";
    }

    if (typeof err === 'string') {
      return err;
    }

    if (err instanceof Error) {
      var stack = err && err.stack;
      var message = err && err.message;

      if (stack && message) {
        if (stack.indexOf(message) !== -1) {
          return stack;
        } else {
          return message + "\n" + stack;
        }
      } else if (stack) {
        return stack;
      } else if (message) {
        return message;
      }
    }

    if (err && err.toString && typeof err.toString === 'function') {
      // $FlowFixMe
      return err.toString();
    }

    return Object.prototype.toString.call(err);
  } catch (newErr) {
    // eslint-disable-line unicorn/catch-error-name
    return "Error while stringifying error: " + stringifyError(newErr, level + 1);
  }
}
function stringifyErrorMessage(err) {
  var defaultMessage = "<unknown error: " + Object.prototype.toString.call(err) + ">";

  if (!err) {
    return defaultMessage;
  }

  if (err instanceof Error) {
    return err.message || defaultMessage;
  }

  if (typeof err.message === 'string') {
    return err.message || defaultMessage;
  }

  return defaultMessage;
}
function stringify(item) {
  if (typeof item === 'string') {
    return item;
  }

  if (item && item.toString && typeof item.toString === 'function') {
    // $FlowFixMe
    return item.toString();
  }

  return Object.prototype.toString.call(item);
}
function domainMatches(hostname, domain) {
  hostname = hostname.split('://')[1];
  var index = hostname.indexOf(domain);
  return index !== -1 && hostname.slice(index) === domain;
}
function patchMethod(obj, name, handler) {
  var original = obj[name];

  obj[name] = function patchedMethod() {
    var _this3 = this,
        _arguments2 = arguments;

    return handler({
      context: this,
      args: Array.prototype.slice.call(arguments),
      original: original,
      callOriginal: function callOriginal() {
        return original.apply(_this3, _arguments2);
      }
    });
  };
}
function extend(obj, source) {
  if (!source) {
    return obj;
  }

  if (Object.assign) {
    return Object.assign(obj, source);
  }

  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      obj[key] = source[key];
    }
  }

  return obj;
}
function util_values(obj) {
  var result = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push(obj[key]);
    }
  }

  return result;
}
function perc(pixels, percentage) {
  return Math.round(pixels * percentage / 100);
}
function min() {
  return Math.min.apply(Math, arguments);
}
function max() {
  return Math.max.apply(Math, arguments);
}
function regexMap(str, regexp, handler) {
  var results = []; // $FlowFixMe

  str.replace(regexp, function regexMapMatcher(item) {
    results.push(handler ? handler.apply(null, arguments) : item);
  }); // $FlowFixMe

  return results;
}
function svgToBase64(svg) {
  return "data:image/svg+xml;base64," + base64encode(svg);
}
function objFilter(obj, filter) {
  if (filter === void 0) {
    filter = Boolean;
  }

  var result = {};

  for (var key in obj) {
    if (!obj.hasOwnProperty(key) || !filter(obj[key], key)) {
      continue;
    }

    result[key] = obj[key];
  }

  return result;
}
function identity(item) {
  return item;
}
function regexTokenize(text, regexp) {
  var result = [];
  text.replace(regexp, function (token) {
    result.push(token);
    return '';
  });
  return result;
}
function promiseDebounce(method, delay) {
  if (delay === void 0) {
    delay = 50;
  }

  var promise;
  var timeout;

  var promiseDebounced = function promiseDebounced() {
    if (timeout) {
      clearTimeout(timeout);
    }

    var localPromise = promise = promise || new promise_ZalgoPromise();
    timeout = setTimeout(function () {
      promise = null;
      timeout = null;
      promise_ZalgoPromise.try(method).then(function (result) {
        localPromise.resolve(result);
      }, function (err) {
        localPromise.reject(err);
      });
    }, delay);
    return localPromise;
  };

  return setFunctionName(promiseDebounced, getFunctionName(method) + "::promiseDebounced");
}
function safeInterval(method, time) {
  var timeout;

  function loop() {
    timeout = setTimeout(function () {
      method();
      loop();
    }, time);
  }

  loop();
  return {
    cancel: function cancel() {
      clearTimeout(timeout);
    }
  };
}
function isInteger(str) {
  return Boolean(str.match(/^[0-9]+$/));
}
function isFloat(str) {
  return Boolean(str.match(/^[0-9]+\.[0-9]+$/));
}
function serializePrimitive(value) {
  return value.toString();
}
function deserializePrimitive(value) {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else if (isInteger(value)) {
    return parseInt(value, 10);
  } else if (isFloat(value)) {
    return parseFloat(value);
  } else {
    return value;
  }
}
function dotify(obj, prefix, newobj) {
  if (prefix === void 0) {
    prefix = '';
  }

  if (newobj === void 0) {
    newobj = {};
  }

  prefix = prefix ? prefix + "." : prefix;

  for (var key in obj) {
    if (!obj.hasOwnProperty(key) || obj[key] === undefined || obj[key] === null || typeof obj[key] === 'function') {
      continue;
    } else if (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(function (val) {
      return typeof val !== 'object';
    })) {
      newobj["" + prefix + key + "[]"] = obj[key].join(',');
    } else if (obj[key] && typeof obj[key] === 'object') {
      newobj = dotify(obj[key], "" + prefix + key, newobj);
    } else {
      newobj["" + prefix + key] = serializePrimitive(obj[key]);
    }
  }

  return newobj;
}
function undotify(obj) {
  var result = {};

  for (var key in obj) {
    if (!obj.hasOwnProperty(key) || typeof obj[key] !== 'string') {
      continue;
    }

    var value = obj[key];

    if (key.match(/^.+\[\]$/)) {
      key = key.slice(0, key.length - 2);
      value = value.split(',').map(deserializePrimitive);
    } else {
      value = deserializePrimitive(value);
    }

    var keyResult = result;
    var parts = key.split('.');

    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var isLast = i + 1 === parts.length;
      var isIndex = !isLast && isInteger(parts[i + 1]);

      if (part === 'constructor' || part === 'prototype' || part === '__proto__') {
        throw new Error("Disallowed key: " + part);
      }

      if (isLast) {
        // $FlowFixMe
        keyResult[part] = value;
      } else {
        // $FlowFixMe
        keyResult = keyResult[part] = keyResult[part] || (isIndex ? [] : {});
      }
    }
  }

  return result;
}
function eventEmitter() {
  var triggered = {};
  var handlers = {};
  return {
    on: function on(eventName, handler) {
      var handlerList = handlers[eventName] = handlers[eventName] || [];
      handlerList.push(handler);
      var cancelled = false;
      return {
        cancel: function cancel() {
          if (!cancelled) {
            cancelled = true;
            handlerList.splice(handlerList.indexOf(handler), 1);
          }
        }
      };
    },
    once: function once(eventName, handler) {
      var listener = this.on(eventName, function () {
        listener.cancel();
        handler();
      });
      return listener;
    },
    trigger: function trigger(eventName) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var handlerList = handlers[eventName];
      var promises = [];

      if (handlerList) {
        var _loop = function _loop(_i2) {
          var handler = handlerList[_i2];
          promises.push(promise_ZalgoPromise.try(function () {
            return handler.apply(void 0, args);
          }));
        };

        for (var _i2 = 0; _i2 < handlerList.length; _i2++) {
          _loop(_i2);
        }
      }

      return promise_ZalgoPromise.all(promises).then(src_util_noop);
    },
    triggerOnce: function triggerOnce(eventName) {
      if (triggered[eventName]) {
        return promise_ZalgoPromise.resolve();
      }

      triggered[eventName] = true;

      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      return this.trigger.apply(this, [eventName].concat(args));
    }
  };
}
function camelToDasherize(string) {
  return string.replace(/([A-Z])/g, function (g) {
    return "-" + g.toLowerCase();
  });
}
function dasherizeToCamel(string) {
  return string.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function util_get(item, path, def) {
  if (!path) {
    return def;
  }

  var pathParts = path.split('.'); // Loop through each section of our key path

  for (var i = 0; i < pathParts.length; i++) {
    // If we have an object, we can get the key
    if (typeof item === 'object' && item !== null) {
      item = item[pathParts[i]]; // Otherwise, we should return the default (undefined if not provided)
    } else {
      return def;
    }
  } // If our final result is undefined, we should return the default


  return item === undefined ? def : item;
}
function safeTimeout(method, time) {
  var interval = safeInterval(function () {
    time -= 100;

    if (time <= 0) {
      interval.cancel();
      method();
    }
  }, 100);
}
function defineLazyProp(obj, key, getter) {
  if (Array.isArray(obj)) {
    if (typeof key !== 'number') {
      throw new TypeError("Array key must be number");
    }
  } else if (typeof obj === 'object' && obj !== null) {
    if (typeof key !== 'string') {
      throw new TypeError("Object key must be string");
    }
  }

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function get() {
      // $FlowFixMe
      delete obj[key];
      var value = getter(); // $FlowFixMe

      obj[key] = value;
      return value;
    },
    set: function set(value) {
      // $FlowFixMe
      delete obj[key]; // $FlowFixMe

      obj[key] = value;
    }
  });
}
function arrayFrom(item) {
  // eslint-disable-line no-undef
  return Array.prototype.slice.call(item);
}
function isObject(item) {
  return typeof item === 'object' && item !== null;
}
function isObjectObject(obj) {
  return isObject(obj) && Object.prototype.toString.call(obj) === '[object Object]';
}
function isPlainObject(obj) {
  if (!isObjectObject(obj)) {
    return false;
  } // $FlowFixMe


  var constructor = obj.constructor;

  if (typeof constructor !== 'function') {
    return false;
  }

  var prototype = constructor.prototype;

  if (!isObjectObject(prototype)) {
    return false;
  }

  if (!prototype.hasOwnProperty('isPrototypeOf')) {
    return false;
  }

  return true;
}
function replaceObject(item, replacer, fullKey) {
  if (fullKey === void 0) {
    fullKey = '';
  }

  if (Array.isArray(item)) {
    var length = item.length;
    var result = [];

    var _loop2 = function _loop2(i) {
      defineLazyProp(result, i, function () {
        var itemKey = fullKey ? fullKey + "." + i : "" + i;
        var el = item[i];
        var child = replacer(el, i, itemKey);

        if (isPlainObject(child) || Array.isArray(child)) {
          // $FlowFixMe
          child = replaceObject(child, replacer, itemKey);
        }

        return child;
      });
    };

    for (var i = 0; i < length; i++) {
      _loop2(i);
    } // $FlowFixMe


    return result;
  } else if (isPlainObject(item)) {
    var _result = {};

    var _loop3 = function _loop3(key) {
      if (!item.hasOwnProperty(key)) {
        return "continue";
      }

      defineLazyProp(_result, key, function () {
        var itemKey = fullKey ? fullKey + "." + key : "" + key; // $FlowFixMe

        var el = item[key];
        var child = replacer(el, key, itemKey);

        if (isPlainObject(child) || Array.isArray(child)) {
          // $FlowFixMe
          child = replaceObject(child, replacer, itemKey);
        }

        return child;
      });
    };

    for (var key in item) {
      var _ret = _loop3(key);

      if (_ret === "continue") continue;
    } // $FlowFixMe


    return _result;
  } else {
    throw new Error("Pass an object or array");
  }
}
function copyProp(source, target, name, def) {
  if (source.hasOwnProperty(name)) {
    var descriptor = Object.getOwnPropertyDescriptor(source, name); // $FlowFixMe

    Object.defineProperty(target, name, descriptor);
  } else {
    target[name] = def;
  }
}
function regex(pattern, string, start) {
  if (start === void 0) {
    start = 0;
  }

  if (typeof pattern === 'string') {
    // eslint-disable-next-line security/detect-non-literal-regexp
    pattern = new RegExp(pattern);
  }

  var result = string.slice(start).match(pattern);

  if (!result) {
    return;
  } // $FlowFixMe


  var index = result.index;
  var regmatch = result[0];
  return {
    text: regmatch,
    groups: result.slice(1),
    start: start + index,
    end: start + index + regmatch.length,
    length: regmatch.length,
    replace: function replace(text) {
      if (!regmatch) {
        return '';
      }

      return "" + regmatch.slice(0, start + index) + text + regmatch.slice(index + regmatch.length);
    }
  };
}
function regexAll(pattern, string) {
  var matches = [];
  var start = 0; // eslint-disable-next-line no-constant-condition

  while (true) {
    var regmatch = regex(pattern, string, start);

    if (!regmatch) {
      break;
    }

    matches.push(regmatch);
    start = match.end;
  }

  return matches;
}
function isDefined(value) {
  return value !== null && value !== undefined;
}
function cycle(method) {
  return promise_ZalgoPromise.try(method).then(function () {
    return cycle(method);
  });
}
function debounce(method, time) {
  if (time === void 0) {
    time = 100;
  }

  var timeout;

  var debounceWrapper = function debounceWrapper() {
    var _this4 = this,
        _arguments3 = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return method.apply(_this4, _arguments3);
    }, time);
  };

  return setFunctionName(debounceWrapper, getFunctionName(method) + "::debounced");
}
function util_isRegex(item) {
  return Object.prototype.toString.call(item) === '[object RegExp]';
}
// eslint-disable-next-line flowtype/no-weak-types
var util_weakMapMemoize = function weakMapMemoize(method) {
  var weakmap = new weakmap_CrossDomainSafeWeakMap(); // eslint-disable-next-line flowtype/no-weak-types

  return function weakmapMemoized(arg) {
    var _this5 = this;

    return weakmap.getOrSet(arg, function () {
      return method.call(_this5, arg);
    });
  };
};
// eslint-disable-next-line flowtype/no-weak-types
var util_weakMapMemoizePromise = function weakMapMemoizePromise(method) {
  var weakmap = new weakmap_CrossDomainSafeWeakMap(); // eslint-disable-next-line flowtype/no-weak-types

  return function weakmapMemoizedPromise(arg) {
    var _this6 = this;

    return weakmap.getOrSet(arg, function () {
      return method.call(_this6, arg).finally(function () {
        weakmap.delete(arg);
      });
    });
  };
};
function getOrSet(obj, key, getter) {
  if (obj.hasOwnProperty(key)) {
    return obj[key];
  }

  var val = getter();
  obj[key] = val;
  return val;
}
function cleanup(obj) {
  var tasks = [];
  var cleaned = false;
  return {
    set: function set(name, item) {
      if (!cleaned) {
        obj[name] = item;
        this.register(function () {
          delete obj[name];
        });
      }

      return item;
    },
    register: function register(method) {
      if (cleaned) {
        method();
      } else {
        tasks.push(once(method));
      }
    },
    all: function all() {
      var results = [];
      cleaned = true;

      while (tasks.length) {
        var task = tasks.pop();
        results.push(task());
      }

      return promise_ZalgoPromise.all(results).then(src_util_noop);
    }
  };
}
function tryCatch(fn) {
  var result;
  var error;

  try {
    result = fn();
  } catch (err) {
    error = err;
  } // $FlowFixMe


  return {
    result: result,
    error: error
  };
}
function removeFromArray(arr, item) {
  var index = arr.indexOf(item);

  if (index !== -1) {
    arr.splice(index, 1);
  }
}
function assertExists(name, thing) {
  if (thing === null || typeof thing === 'undefined') {
    throw new Error("Expected " + name + " to be present");
  }

  return thing;
}
function unique(arr) {
  var result = {};

  for (var _i4 = 0; _i4 < arr.length; _i4++) {
    var item = arr[_i4];
    // eslint-disable-next-line const-immutable/no-mutation
    result[item] = true;
  }

  return Object.keys(result);
}
// CONCATENATED MODULE: ./node_modules/belter/src/constants.js
var KEY_CODES = {
  ENTER: 13
};
// CONCATENATED MODULE: ./node_modules/belter/src/dom.js


/* eslint max-lines: off */






function isDocumentReady() {
  return Boolean(document.body) && document.readyState === 'complete';
}
function urlEncode(str) {
  return str.replace(/\?/g, '%3F').replace(/&/g, '%26').replace(/#/g, '%23').replace(/\+/g, '%2B');
}
function waitForWindowReady() {
  return inlineMemoize(waitForWindowReady, function () {
    return new promise_ZalgoPromise(function (resolve) {
      if (isDocumentReady()) {
        resolve();
      }

      window.addEventListener('load', function () {
        return resolve();
      });
    });
  });
}
function waitForDocumentReady() {
  return inlineMemoize(waitForDocumentReady, function () {
    return new promise_ZalgoPromise(function (resolve) {
      if (isDocumentReady()) {
        return resolve();
      }

      var interval = setInterval(function () {
        if (isDocumentReady()) {
          clearInterval(interval);
          return resolve();
        }
      }, 10);
    });
  });
}
function waitForDocumentBody() {
  return waitForDocumentReady().then(function () {
    if (document.body) {
      return document.body;
    }

    throw new Error('Document ready but document.body not present');
  });
}
function parseQuery(queryString) {
  return inlineMemoize(parseQuery, function () {
    var params = {};

    if (!queryString) {
      return params;
    }

    if (queryString.indexOf('=') === -1) {
      return params;
    }

    for (var _i2 = 0, _queryString$split2 = queryString.split('&'); _i2 < _queryString$split2.length; _i2++) {
      var pair = _queryString$split2[_i2];
      pair = pair.split('=');

      if (pair[0] && pair[1]) {
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
    }

    return params;
  }, [queryString]);
}
function getQueryParam(name) {
  return parseQuery(window.location.search.slice(1))[name];
}
function urlWillRedirectPage(url) {
  if (url.indexOf('#') === -1) {
    return true;
  }

  if (url.indexOf('#') === 0) {
    return false;
  }

  if (url.split('#')[0] === window.location.href.split('#')[0]) {
    return false;
  }

  return true;
}
function formatQuery(obj) {
  if (obj === void 0) {
    obj = {};
  }

  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'string';
  }).map(function (key) {
    return urlEncode(key) + "=" + urlEncode(obj[key]);
  }).join('&');
}
function extendQuery(originalQuery, props) {
  if (props === void 0) {
    props = {};
  }

  if (!props || !Object.keys(props).length) {
    return originalQuery;
  }

  return formatQuery(_extends({}, parseQuery(originalQuery), {}, props));
}
function extendUrl(url, options) {
  if (options === void 0) {
    options = {};
  }

  var query = options.query || {};
  var hash = options.hash || {};
  var originalUrl;
  var originalQuery;
  var originalHash;

  var _url$split = url.split('#');

  originalUrl = _url$split[0];
  originalHash = _url$split[1];

  var _originalUrl$split = originalUrl.split('?');

  originalUrl = _originalUrl$split[0];
  originalQuery = _originalUrl$split[1];
  var queryString = extendQuery(originalQuery, query);
  var hashString = extendQuery(originalHash, hash);

  if (queryString) {
    originalUrl = originalUrl + "?" + queryString;
  }

  if (hashString) {
    originalUrl = originalUrl + "#" + hashString;
  }

  return originalUrl;
}
function redirect(url, win) {
  if (win === void 0) {
    win = window;
  }

  return new promise_ZalgoPromise(function (resolve) {
    win.location = url;

    if (!urlWillRedirectPage(url)) {
      resolve();
    }
  });
}
function hasMetaViewPort() {
  var meta = document.querySelector('meta[name=viewport]');

  if (isDevice() && window.screen.width < 660 && !meta) {
    return false;
  }

  return true;
}
function isElementVisible(el) {
  return Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}
function enablePerformance() {
  return inlineMemoize(enablePerformance, function () {
    /* eslint-disable compat/compat */
    return Boolean(window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1000 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0);
    /* eslint-enable compat/compat */
  });
}
function getPageRenderTime() {
  return waitForDocumentReady().then(function () {
    if (!enablePerformance()) {
      return;
    }

    var timing = window.performance.timing;

    if (timing.connectEnd && timing.domInteractive) {
      return timing.domInteractive - timing.connectEnd;
    }
  });
}
function htmlEncode(html) {
  if (html === void 0) {
    html = '';
  }

  return html.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\//g, '&#x2F;');
}
function dom_isBrowser() {
  return typeof window !== 'undefined';
}
function querySelectorAll(selector, doc) {
  if (doc === void 0) {
    doc = window.document;
  }

  return Array.prototype.slice.call(doc.querySelectorAll(selector));
}
function onClick(element, handler) {
  element.addEventListener('touchstart', src_util_noop);
  element.addEventListener('click', handler);
  element.addEventListener('keypress', function (event) {
    // $FlowFixMe
    if (event.keyCode === KEY_CODES.ENTER) {
      return handler(event);
    }
  });
}
function getScript(_ref) {
  var _ref$host = _ref.host,
      host = _ref$host === void 0 ? window.location.host : _ref$host,
      path = _ref.path;
  return inlineMemoize(getScript, function () {
    var url = "" + host + path;
    var scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));

    for (var _i4 = 0; _i4 < scripts.length; _i4++) {
      var script = scripts[_i4];

      if (!script.src) {
        continue;
      }

      var src = script.src.replace(/^https?:\/\//, '').split('?')[0];

      if (src === url) {
        return script;
      }
    }
  }, [path]);
}
function isLocalStorageEnabled() {
  return inlineMemoize(isLocalStorageEnabled, function () {
    try {
      if (typeof window === 'undefined') {
        return false;
      }

      if (window.localStorage) {
        var value = Math.random().toString();
        window.localStorage.setItem('__test__localStorage__', value);
        var result = window.localStorage.getItem('__test__localStorage__');
        window.localStorage.removeItem('__test__localStorage__');

        if (value === result) {
          return true;
        }
      }
    } catch (err) {// pass
    }

    return false;
  });
}
function getBrowserLocales() {
  var nav = window.navigator;
  var locales = nav.languages ? Array.prototype.slice.apply(nav.languages) : [];

  if (nav.language) {
    locales.push(nav.language);
  }

  if (nav.userLanguage) {
    locales.push(nav.userLanguage);
  }

  return locales.map(function (locale) {
    if (locale && locale.match(/^[a-z]{2}[-_][A-Z]{2}$/)) {
      var _locale$split = locale.split(/[-_]/),
          lang = _locale$split[0],
          country = _locale$split[1];

      return {
        country: country,
        lang: lang
      };
    }

    if (locale && locale.match(/^[a-z]{2}$/)) {
      return {
        lang: locale
      };
    }

    return null;
  }).filter(Boolean);
}
function appendChild(container, child) {
  container.appendChild(child);
}
function isElement(element) {
  if (element instanceof window.Element) {
    return true;
  }

  if (element !== null && typeof element === 'object' && element.nodeType === 1 && typeof element.style === 'object' && typeof element.ownerDocument === 'object') {
    return true;
  }

  return false;
}
function getElementSafe(id, doc) {
  if (doc === void 0) {
    doc = document;
  }

  if (isElement(id)) {
    // $FlowFixMe
    return id;
  }

  if (typeof id === 'string') {
    return doc.querySelector(id);
  }
}
function getElement(id, doc) {
  if (doc === void 0) {
    doc = document;
  }

  var element = getElementSafe(id, doc);

  if (element) {
    return element;
  }

  throw new Error("Can not find element: " + stringify(id));
}
function elementReady(id) {
  return new promise_ZalgoPromise(function (resolve, reject) {
    var name = stringify(id);
    var el = getElementSafe(id);

    if (el) {
      return resolve(el);
    }

    if (isDocumentReady()) {
      return reject(new Error("Document is ready and element " + name + " does not exist"));
    }

    var interval = setInterval(function () {
      el = getElementSafe(id);

      if (el) {
        clearInterval(interval);
        return resolve(el);
      }

      if (isDocumentReady()) {
        clearInterval(interval);
        return reject(new Error("Document is ready and element " + name + " does not exist"));
      }
    }, 10);
  });
}
function PopupOpenError(message) {
  this.message = message;
}
PopupOpenError.prototype = Object.create(Error.prototype);
function popup(url, options) {
  // $FlowFixMe
  options = options || {};
  var _options = options,
      width = _options.width,
      height = _options.height;
  var top = 0;
  var left = 0;

  if (width) {
    if (window.outerWidth) {
      left = Math.round((window.outerWidth - width) / 2) + window.screenX;
    } else if (window.screen.width) {
      left = Math.round((window.screen.width - width) / 2);
    }
  }

  if (height) {
    if (window.outerHeight) {
      top = Math.round((window.outerHeight - height) / 2) + window.screenY;
    } else if (window.screen.height) {
      top = Math.round((window.screen.height - height) / 2);
    }
  }

  if (width && height) {
    options = _extends({
      top: top,
      left: left,
      width: width,
      height: height,
      status: 1,
      toolbar: 0,
      menubar: 0,
      resizable: 1,
      scrollbars: 1
    }, options);
  }

  var name = options.name || '';
  delete options.name; // eslint-disable-next-line array-callback-return

  var params = Object.keys(options).map(function (key) {
    // $FlowFixMe
    if (options[key] !== null && options[key] !== undefined) {
      return key + "=" + stringify(options[key]);
    }
  }).filter(Boolean).join(',');
  var win;

  try {
    win = window.open(url, name, params, true);
  } catch (err) {
    throw new PopupOpenError("Can not open popup window - " + (err.stack || err.message));
  }

  if (isWindowClosed(win)) {
    var err = new PopupOpenError("Can not open popup window - blocked");
    throw err;
  }

  window.addEventListener('unload', function () {
    return win.close();
  });
  return win;
}
function writeToWindow(win, html) {
  try {
    win.document.open();
    win.document.write(html);
    win.document.close();
  } catch (err) {
    try {
      win.location = "javascript: document.open(); document.write(" + JSON.stringify(html) + "); document.close();";
    } catch (err2) {// pass
    }
  }
}
function writeElementToWindow(win, el) {
  var tag = el.tagName.toLowerCase();

  if (tag !== 'html') {
    throw new Error("Expected element to be html, got " + tag);
  }

  var documentElement = win.document.documentElement;

  for (var _i6 = 0, _arrayFrom2 = arrayFrom(documentElement.children); _i6 < _arrayFrom2.length; _i6++) {
    var child = _arrayFrom2[_i6];
    documentElement.removeChild(child);
  }

  for (var _i8 = 0, _arrayFrom4 = arrayFrom(el.children); _i8 < _arrayFrom4.length; _i8++) {
    var _child = _arrayFrom4[_i8];
    documentElement.appendChild(_child);
  }
}
function setStyle(el, styleText, doc) {
  if (doc === void 0) {
    doc = window.document;
  }

  // $FlowFixMe
  if (el.styleSheet) {
    // $FlowFixMe
    el.styleSheet.cssText = styleText;
  } else {
    el.appendChild(doc.createTextNode(styleText));
  }
}
var awaitFrameLoadPromises;
function awaitFrameLoad(frame) {
  awaitFrameLoadPromises = awaitFrameLoadPromises || new weakmap_CrossDomainSafeWeakMap();

  if (awaitFrameLoadPromises.has(frame)) {
    var _promise = awaitFrameLoadPromises.get(frame);

    if (_promise) {
      return _promise;
    }
  }

  var promise = new promise_ZalgoPromise(function (resolve, reject) {
    frame.addEventListener('load', function () {
      linkFrameWindow(frame);
      resolve(frame);
    });
    frame.addEventListener('error', function (err) {
      if (frame.contentWindow) {
        resolve(frame);
      } else {
        reject(err);
      }
    });
  });
  awaitFrameLoadPromises.set(frame, promise);
  return promise;
}
function awaitFrameWindow(frame) {
  return awaitFrameLoad(frame).then(function (loadedFrame) {
    if (!loadedFrame.contentWindow) {
      throw new Error("Could not find window in iframe");
    }

    return loadedFrame.contentWindow;
  });
}
function createElement(tag, options, container) {
  if (tag === void 0) {
    tag = 'div';
  }

  if (options === void 0) {
    options = {};
  }

  tag = tag.toLowerCase();
  var element = document.createElement(tag);

  if (options.style) {
    extend(element.style, options.style);
  }

  if (options.class) {
    element.className = options.class.join(' ');
  }

  if (options.id) {
    element.setAttribute('id', options.id);
  }

  if (options.attributes) {
    for (var _i10 = 0, _Object$keys2 = Object.keys(options.attributes); _i10 < _Object$keys2.length; _i10++) {
      var key = _Object$keys2[_i10];
      element.setAttribute(key, options.attributes[key]);
    }
  }

  if (options.styleSheet) {
    setStyle(element, options.styleSheet);
  }

  if (container) {
    appendChild(container, element);
  }

  if (options.html) {
    if (tag === 'iframe') {
      // $FlowFixMe
      if (!container || !element.contentWindow) {
        throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
      } // $FlowFixMe


      writeToWindow(element.contentWindow, options.html);
    } else {
      element.innerHTML = options.html;
    }
  }

  return element;
}
function iframe(options, container) {
  if (options === void 0) {
    options = {};
  }

  var attributes = options.attributes || {};
  var style = options.style || {};
  var frame = createElement('iframe', {
    attributes: _extends({
      allowTransparency: 'true'
    }, attributes),
    style: _extends({
      backgroundColor: 'transparent',
      border: 'none'
    }, style),
    html: options.html,
    class: options.class
  });
  var isIE = window.navigator.userAgent.match(/MSIE|Edge/i);

  if (!frame.hasAttribute('id')) {
    frame.setAttribute('id', uniqueID());
  } // $FlowFixMe


  awaitFrameLoad(frame);

  if (container) {
    var el = getElement(container);
    el.appendChild(frame);
  }

  if (options.url || isIE) {
    frame.setAttribute('src', options.url || 'about:blank');
  } // $FlowFixMe


  return frame;
}
function addEventListener(obj, event, handler) {
  obj.addEventListener(event, handler);
  return {
    cancel: function cancel() {
      obj.removeEventListener(event, handler);
    }
  };
}
function bindEvents(element, eventNames, handler) {
  handler = once(handler);

  for (var _i12 = 0; _i12 < eventNames.length; _i12++) {
    var eventName = eventNames[_i12];
    element.addEventListener(eventName, handler);
  }

  return {
    cancel: once(function () {
      for (var _i14 = 0; _i14 < eventNames.length; _i14++) {
        var _eventName = eventNames[_i14];
        element.removeEventListener(_eventName, handler);
      }
    })
  };
}
var VENDOR_PREFIXES = ['webkit', 'moz', 'ms', 'o'];
function setVendorCSS(element, name, value) {
  // $FlowFixMe
  element.style[name] = value;
  var capitalizedName = capitalizeFirstLetter(name);

  for (var _i16 = 0; _i16 < VENDOR_PREFIXES.length; _i16++) {
    var prefix = VENDOR_PREFIXES[_i16];
    // $FlowFixMe
    element.style["" + prefix + capitalizedName] = value;
  }
}
var ANIMATION_START_EVENTS = ['animationstart', 'webkitAnimationStart', 'oAnimationStart', 'MSAnimationStart'];
var ANIMATION_END_EVENTS = ['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd'];
function animate(element, name, clean, timeout) {
  if (timeout === void 0) {
    timeout = 1000;
  }

  return new promise_ZalgoPromise(function (resolve, reject) {
    var el = getElement(element);

    if (!el) {
      return resolve();
    }

    var hasStarted = false;
    var startTimeout;
    var endTimeout;
    var startEvent;
    var endEvent;

    function cleanUp() {
      clearTimeout(startTimeout);
      clearTimeout(endTimeout);
      startEvent.cancel();
      endEvent.cancel();
    }

    startEvent = bindEvents(el, ANIMATION_START_EVENTS, function (event) {
      // $FlowFixMe
      if (event.target !== el || event.animationName !== name) {
        return;
      }

      clearTimeout(startTimeout);
      event.stopPropagation();
      startEvent.cancel();
      hasStarted = true;
      endTimeout = setTimeout(function () {
        cleanUp();
        resolve();
      }, timeout);
    });
    endEvent = bindEvents(el, ANIMATION_END_EVENTS, function (event) {
      // $FlowFixMe
      if (event.target !== el || event.animationName !== name) {
        return;
      }

      cleanUp(); // $FlowFixMe

      if (typeof event.animationName === 'string' && event.animationName !== name) {
        return reject("Expected animation name to be " + name + ", found " + event.animationName);
      }

      return resolve();
    });
    setVendorCSS(el, 'animationName', name);
    startTimeout = setTimeout(function () {
      if (!hasStarted) {
        cleanUp();
        return resolve();
      }
    }, 200);

    if (clean) {
      clean(cleanUp);
    }
  });
}
var STYLE = {
  DISPLAY: {
    NONE: 'none',
    BLOCK: 'block'
  },
  VISIBILITY: {
    VISIBLE: 'visible',
    HIDDEN: 'hidden'
  },
  IMPORTANT: 'important'
};
function makeElementVisible(element) {
  element.style.setProperty('visibility', '');
}
function makeElementInvisible(element) {
  element.style.setProperty('visibility', STYLE.VISIBILITY.HIDDEN, STYLE.IMPORTANT);
}
function showElement(element) {
  element.style.setProperty('display', '');
}
function hideElement(element) {
  element.style.setProperty('display', STYLE.DISPLAY.NONE, STYLE.IMPORTANT);
}
function destroyElement(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}
function showAndAnimate(element, name, clean) {
  var animation = animate(element, name, clean);
  showElement(element);
  return animation;
}
function animateAndHide(element, name, clean) {
  return animate(element, name, clean).then(function () {
    hideElement(element);
  });
}
function addClass(element, name) {
  element.classList.add(name);
}
function removeClass(element, name) {
  element.classList.remove(name);
}
function isElementClosed(el) {
  if (!el || !el.parentNode) {
    return true;
  }

  return false;
}
function watchElementForClose(element, handler) {
  handler = once(handler);
  var interval;

  if (isElementClosed(element)) {
    handler();
  } else {
    interval = safeInterval(function () {
      if (isElementClosed(element)) {
        interval.cancel();
        handler();
      }
    }, 50);
  }

  return {
    cancel: function cancel() {
      if (interval) {
        interval.cancel();
      }
    }
  };
}
function fixScripts(el, doc) {
  if (doc === void 0) {
    doc = window.document;
  }

  for (var _i18 = 0, _querySelectorAll2 = querySelectorAll('script', el); _i18 < _querySelectorAll2.length; _i18++) {
    var script = _querySelectorAll2[_i18];
    var parentNode = script.parentNode;

    if (!parentNode) {
      continue;
    }

    var newScript = doc.createElement('script');
    newScript.text = script.textContent;
    parentNode.replaceChild(newScript, script);
  }
}
function onResize(el, handler, _temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      _ref2$width = _ref2.width,
      width = _ref2$width === void 0 ? true : _ref2$width,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? true : _ref2$height,
      _ref2$interval = _ref2.interval,
      interval = _ref2$interval === void 0 ? 100 : _ref2$interval,
      _ref2$win = _ref2.win,
      win = _ref2$win === void 0 ? window : _ref2$win;

  var currentWidth = el.offsetWidth;
  var currentHeight = el.offsetHeight;
  handler({
    width: currentWidth,
    height: currentHeight
  });

  var check = function check() {
    var newWidth = el.offsetWidth;
    var newHeight = el.offsetHeight;

    if (width && newWidth !== currentWidth || height && newHeight !== currentHeight) {
      handler({
        width: newWidth,
        height: newHeight
      });
    }

    currentWidth = newWidth;
    currentHeight = newHeight;
  };

  var observer;
  var timeout;

  if (typeof win.ResizeObserver !== 'undefined') {
    observer = new win.ResizeObserver(check);
    observer.observe(el);
  } else if (typeof win.MutationObserver !== 'undefined') {
    observer = new win.MutationObserver(check);
    observer.observe(el, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: false
    });
    win.addEventListener('resize', check);
  } else {
    var loop = function loop() {
      check();
      timeout = setTimeout(loop, interval);
    };

    loop();
  }

  return {
    cancel: function cancel() {
      observer.disconnect();
      window.removeEventListener('resize', check);
      clearTimeout(timeout);
    }
  };
}
function getResourceLoadTime(url) {
  if (!enablePerformance()) {
    return;
  }

  if (!window.performance || typeof window.performance.getEntries !== 'function') {
    return;
  }

  var entries = window.performance.getEntries();

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];

    if (entry && entry.name && entry.name.indexOf(url) === 0 && typeof entry.duration === 'number') {
      return Math.floor(entry.duration);
    }
  }
}
// CONCATENATED MODULE: ./node_modules/belter/src/storage.js


var DEFAULT_SESSION_STORAGE = 20 * 60 * 1000;
function getStorage(_ref) {
  var name = _ref.name,
      _ref$lifetime = _ref.lifetime,
      lifetime = _ref$lifetime === void 0 ? DEFAULT_SESSION_STORAGE : _ref$lifetime;
  return inlineMemoize(getStorage, function () {
    var STORAGE_KEY = "__" + name + "_storage__";
    var accessedStorage;

    function getState(handler) {
      var localStorageEnabled = isLocalStorageEnabled();
      var storage;

      if (accessedStorage) {
        storage = accessedStorage;
      }

      if (!storage && localStorageEnabled) {
        var rawStorage = window.localStorage.getItem(STORAGE_KEY);

        if (rawStorage) {
          storage = JSON.parse(rawStorage);
        }
      }

      if (!storage) {
        storage = getGlobal()[STORAGE_KEY];
      }

      if (!storage) {
        storage = {
          id: uniqueID()
        };
      }

      if (!storage.id) {
        storage.id = uniqueID();
      }

      accessedStorage = storage;
      var result = handler(storage);

      if (localStorageEnabled) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
      } else {
        getGlobal()[STORAGE_KEY] = storage;
      }

      accessedStorage = null;
      return result;
    }

    function getID() {
      return getState(function (storage) {
        return storage.id;
      });
    }

    function getSession(handler) {
      return getState(function (storage) {
        var session = storage.__session__;
        var now = Date.now();

        if (session && now - session.created > lifetime) {
          session = null;
        }

        if (!session) {
          session = {
            guid: uniqueID(),
            created: now
          };
        }

        storage.__session__ = session;
        return handler(session);
      });
    }

    function getSessionState(handler) {
      return getSession(function (session) {
        session.state = session.state || {};
        return handler(session.state);
      });
    }

    function getSessionID() {
      return getSession(function (session) {
        return session.guid;
      });
    }

    return {
      getState: getState,
      getID: getID,
      getSessionState: getSessionState,
      getSessionID: getSessionID
    };
  }, [{
    name: name,
    lifetime: lifetime
  }]);
}
// CONCATENATED MODULE: ./node_modules/belter/src/experiment.js



function getBelterExperimentStorage() {
  return getStorage({
    name: 'belter_experiment'
  });
}

function isEventUnique(name) {
  return getBelterExperimentStorage().getSessionState(function (state) {
    state.loggedBeacons = state.loggedBeacons || [];

    if (state.loggedBeacons.indexOf(name) === -1) {
      state.loggedBeacons.push(name);
      return true;
    }

    return false;
  });
}

function getThrottlePercentile(name) {
  return getBelterExperimentStorage().getState(function (state) {
    state.throttlePercentiles = state.throttlePercentiles || {};
    state.throttlePercentiles[name] = state.throttlePercentiles[name] || Math.floor(Math.random() * 100);
    return state.throttlePercentiles[name];
  });
}

var THROTTLE_GROUP = {
  TEST: 'test',
  CONTROL: 'control',
  THROTTLE: 'throttle'
};
function experiment(_ref) {
  var name = _ref.name,
      _ref$sample = _ref.sample,
      sample = _ref$sample === void 0 ? 50 : _ref$sample,
      _ref$logTreatment = _ref.logTreatment,
      logTreatment = _ref$logTreatment === void 0 ? src_util_noop : _ref$logTreatment,
      _ref$logCheckpoint = _ref.logCheckpoint,
      logCheckpoint = _ref$logCheckpoint === void 0 ? src_util_noop : _ref$logCheckpoint;
  var throttle = getThrottlePercentile(name);
  var group;

  if (throttle < sample) {
    group = THROTTLE_GROUP.TEST;
  } else if (sample >= 50 || sample <= throttle && throttle < sample * 2) {
    group = THROTTLE_GROUP.CONTROL;
  } else {
    group = THROTTLE_GROUP.THROTTLE;
  }

  var treatment = name + "_" + group;
  var started = false;
  var forced = false;

  try {
    if (window.localStorage && window.localStorage.getItem(name)) {
      forced = true;
    }
  } catch (err) {// pass
  }

  return {
    isEnabled: function isEnabled() {
      return group === THROTTLE_GROUP.TEST || forced;
    },
    isDisabled: function isDisabled() {
      return group !== THROTTLE_GROUP.TEST && !forced;
    },
    getTreatment: function getTreatment() {
      return treatment;
    },
    log: function log(checkpoint, payload) {
      if (payload === void 0) {
        payload = {};
      }

      if (!started) {
        return this;
      }

      if (isEventUnique(name + "_" + treatment)) {
        logTreatment({
          name: name,
          treatment: treatment
        });
      }

      if (isEventUnique(name + "_" + treatment + "_" + checkpoint)) {
        logCheckpoint({
          name: name,
          treatment: treatment,
          checkpoint: checkpoint,
          payload: payload
        });
      }

      return this;
    },
    logStart: function logStart(payload) {
      if (payload === void 0) {
        payload = {};
      }

      started = true;
      return this.log("start", payload);
    },
    logComplete: function logComplete(payload) {
      if (payload === void 0) {
        payload = {};
      }

      return this.log("complete", payload);
    }
  };
}
// CONCATENATED MODULE: ./node_modules/belter/src/global.js

function getGlobalNameSpace(_ref) {
  var name = _ref.name,
      _ref$version = _ref.version,
      version = _ref$version === void 0 ? 'latest' : _ref$version;
  var global = getGlobal();
  var globalKey = "__" + name + "__" + version + "_global__";
  var namespace = global[globalKey] = global[globalKey] || {};
  return {
    get: function get(key, defValue) {
      // $FlowFixMe
      defValue = defValue || {};
      var item = namespace[key] = namespace[key] || defValue;
      return item;
    }
  };
}
// CONCATENATED MODULE: ./node_modules/belter/src/http.js

var HEADERS = {
  CONTENT_TYPE: 'content-type',
  ACCEPT: 'accept'
};
var http_headerBuilders = [];

function parseHeaders(rawHeaders) {
  if (rawHeaders === void 0) {
    rawHeaders = '';
  }

  var result = {};

  for (var _i2 = 0, _rawHeaders$trim$spli2 = rawHeaders.trim().split('\n'); _i2 < _rawHeaders$trim$spli2.length; _i2++) {
    var line = _rawHeaders$trim$spli2[_i2];

    var _line$split = line.split(':'),
        _key = _line$split[0],
        values = _line$split.slice(1);

    result[_key.toLowerCase()] = values.join(':').trim();
  }

  return result;
}

function request(_ref) {
  var url = _ref.url,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'get' : _ref$method,
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers,
      json = _ref.json,
      data = _ref.data,
      body = _ref.body,
      _ref$win = _ref.win,
      win = _ref$win === void 0 ? window : _ref$win,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
  return new promise_ZalgoPromise(function (resolve, reject) {
    if (json && data || json && body || data && json) {
      throw new Error("Only options.json or options.data or options.body should be passed");
    }

    var normalizedHeaders = {};

    for (var _i4 = 0, _Object$keys2 = Object.keys(headers); _i4 < _Object$keys2.length; _i4++) {
      var _key2 = _Object$keys2[_i4];
      normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
    }

    if (json) {
      normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || 'application/json';
    } else if (data || body) {
      normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || 'application/x-www-form-urlencoded; charset=utf-8';
    }

    normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || 'application/json';

    for (var _i6 = 0; _i6 < http_headerBuilders.length; _i6++) {
      var headerBuilder = http_headerBuilders[_i6];
      var builtHeaders = headerBuilder();

      for (var _i8 = 0, _Object$keys4 = Object.keys(builtHeaders); _i8 < _Object$keys4.length; _i8++) {
        var _key3 = _Object$keys4[_i8];
        normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
      }
    }

    var xhr = new win.XMLHttpRequest();
    xhr.addEventListener('load', function xhrLoad() {
      var responseHeaders = parseHeaders(this.getAllResponseHeaders());

      if (!this.status) {
        return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code."));
      }

      var contentType = responseHeaders['content-type'];
      var isJSON = contentType && (contentType.indexOf('application/json') === 0 || contentType.indexOf('text/json') === 0);
      var responseBody = this.responseText;

      try {
        responseBody = JSON.parse(responseBody);
      } catch (err) {
        if (isJSON) {
          return reject(new Error("Invalid json: " + this.responseText + "."));
        }
      }

      var res = {
        status: this.status,
        headers: responseHeaders,
        body: responseBody
      };
      return resolve(res);
    }, false);
    xhr.addEventListener('error', function (evt) {
      reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
    }, false);
    xhr.open(method, url, true);

    for (var _key4 in normalizedHeaders) {
      if (normalizedHeaders.hasOwnProperty(_key4)) {
        xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
      }
    }

    if (json) {
      body = JSON.stringify(json);
    } else if (data) {
      body = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : '');
      }).join('&');
    }

    xhr.timeout = timeout;

    xhr.ontimeout = function xhrTimeout() {
      reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
    };

    xhr.send(body);
  });
}
function http_addHeaderBuilder(method) {
  http_headerBuilders.push(method);
}
// CONCATENATED MODULE: ./node_modules/belter/src/types.js
// export something to force webpack to see this as an ES module
var types_TYPES = true;
// CONCATENATED MODULE: ./node_modules/belter/src/decorators.js

function memoized(target, name, descriptor) {
  descriptor.value = memoize(descriptor.value, {
    name: name,
    thisNamespace: true
  });
}
function decorators_promise(target, name, descriptor) {
  descriptor.value = promisify(descriptor.value, {
    name: name
  });
}
// CONCATENATED MODULE: ./node_modules/belter/src/css.js
function isPerc(str) {
  return typeof str === 'string' && /^[0-9]+%$/.test(str);
}
function isPx(str) {
  return typeof str === 'string' && /^[0-9]+px$/.test(str);
}
function toNum(val) {
  if (typeof val === 'number') {
    return val;
  }

  var match = val.match(/^([0-9]+)(px|%)$/);

  if (!match) {
    throw new Error("Could not match css value from " + val);
  }

  return parseInt(match[1], 10);
}
function toPx(val) {
  return toNum(val) + "px";
}
function toCSS(val) {
  if (typeof val === 'number') {
    return toPx(val);
  }

  return isPerc(val) ? val : toPx(val);
}
function percOf(num, perc) {
  return parseInt(num * toNum(perc) / 100, 10);
}
function normalizeDimension(dim, max) {
  if (typeof dim === 'number') {
    return dim;
  } else if (isPerc(dim)) {
    return percOf(max, dim);
  } else if (isPx(dim)) {
    return toNum(dim);
  } else {
    throw new Error("Can not normalize dimension: " + dim);
  }
}
// CONCATENATED MODULE: ./node_modules/belter/src/test.js


function wrapPromise(method, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 5000 : _ref$timeout;

  var expected = [];
  var promises = [];
  var timer = setTimeout(function () {
    if (expected) {
      promises.push(promise_ZalgoPromise.asyncReject(new Error("Expected " + expected[0] + " to be called")));
    }
  }, timeout);

  var expect = function expect(name, fn) {
    if (fn === void 0) {
      fn = src_util_noop;
    }

    expected.push(name); // $FlowFixMe

    return function expectWrapper() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      removeFromArray(expected, name); // $FlowFixMe

      var _tryCatch = tryCatch(function () {
        var _fn;

        return (_fn = fn).call.apply(_fn, [_this].concat(args));
      }),
          result = _tryCatch.result,
          error = _tryCatch.error;

      if (error) {
        promises.push(promise_ZalgoPromise.asyncReject(error));
        throw error;
      }

      promises.push(promise_ZalgoPromise.resolve(result));
      return result;
    };
  };

  var avoid = function avoid(name, fn) {
    if (fn === void 0) {
      fn = src_util_noop;
    }

    // $FlowFixMe
    return function avoidWrapper() {
      var _fn2;

      promises.push(promise_ZalgoPromise.asyncReject(new Error("Expected " + name + " to not be called"))); // $FlowFixMe

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return (_fn2 = fn).call.apply(_fn2, [this].concat(args));
    };
  };

  var expectError = function expectError(name, fn) {
    if (fn === void 0) {
      fn = src_util_noop;
    }

    expected.push(name); // $FlowFixMe

    return function expectErrorWrapper() {
      var _this2 = this;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      removeFromArray(expected, name); // $FlowFixMe

      var _tryCatch2 = tryCatch(function () {
        var _fn3;

        return (_fn3 = fn).call.apply(_fn3, [_this2].concat(args));
      }),
          result = _tryCatch2.result,
          error = _tryCatch2.error;

      if (error) {
        throw error;
      }

      promises.push(promise_ZalgoPromise.resolve(result).then(function () {
        throw new Error("Expected " + name + " to throw an error");
      }, src_util_noop));
      return result;
    };
  };

  promises.push(promise_ZalgoPromise.try(function () {
    return method({
      expect: expect,
      avoid: avoid,
      expectError: expectError,
      error: avoid
    });
  }));

  var drain = function drain() {
    return promise_ZalgoPromise.try(function () {
      if (promises.length) {
        return promises.pop();
      }
    }).then(function () {
      if (promises.length) {
        return drain();
      }

      if (expected.length) {
        return promise_ZalgoPromise.delay(10).then(drain);
      }
    });
  };

  return drain().then(function () {
    clearTimeout(timer);
  });
}
// CONCATENATED MODULE: ./node_modules/belter/src/index.js











// CONCATENATED MODULE: ./src/constants.js
var SMART_PAYMENT_BUTTONS = 'smart-payment-buttons';
var constants_HEADERS = {
  AUTHORIZATION: 'authorization',
  CONTENT_TYPE: 'content-type',
  ACCESS_TOKEN: 'x-paypal-internal-euat',
  CSRF_TOKEN: 'x-csrf-jwt',
  SOURCE: 'x-source',
  REQUESTED_BY: 'x-requested-by',
  PARTNER_ATTRIBUTION_ID: 'paypal-partner-attribution-id',
  CLIENT_METADATA_ID: 'paypal-client-metadata-id',
  PAYPAL_DEBUG_ID: 'paypal-debug-id'
};
var DATA_ATTRIBUTES = {
  FUNDING_SOURCE: 'data-funding-source',
  CARD: 'data-card',
  PAYMENT_METHOD_ID: 'data-payment-method-id'
};
var CLASS = {
  LOADING: 'paypal-button-loading',
  CLICKED: 'paypal-button-clicked'
};
var ORDER_API_ERROR = {
  INSTRUMENT_DECLINED: 'INSTRUMENT_DECLINED',
  PAYER_ACTION_REQUIRED: 'PAYER_ACTION_REQUIRED'
};
var CONTEXT = {
  IFRAME: 'iframe',
  POPUP: 'popup'
};
var TARGET_ELEMENT = {
  BODY: 'body'
};
var INTEGRATION_ARTIFACT = {
  PAYPAL_JS_SDK: 'PAYPAL_JS_SDK'
};
var USER_EXPERIENCE_FLOW = {
  INCONTEXT: 'INCONTEXT',
  INLINE: 'INLINE'
};
var DOM_EVENT = {
  MOUSEDOWN: 'mousedown',
  HOVER: 'hover'
};
var PRODUCT_FLOW = {
  SMART_PAYMENT_BUTTONS: 'SMART_PAYMENT_BUTTONS'
};
var FPTI_CONTEXT_TYPE = {
  BUTTON_SESSION_ID: 'button_session_id',
  ORDER_ID: 'EC-Token',
  PAYMENT_ID: 'Pay-ID'
};
var FPTI_STATE = {
  BUTTON: 'smart_button'
};
var FPTI_TRANSITION = {
  BUTTON_LOAD: 'process_button_load',
  BUTTON_CLICK: 'process_button_click',
  CREATE_ORDER: 'process_create_order',
  RECEIVE_ORDER: 'process_receive_order',
  CREATE_PAYMENT: 'process_create_payment',
  CHECKOUT_SHIPPING_CHANGE: 'process_checkout_shipping_change',
  CHECKOUT_AUTHORIZE: 'process_checkout_authorize',
  CHECKOUT_CANCEL: 'process_checkout_cancel'
};
var FPTI_BUTTON_TYPE = {
  IFRAME: 'iframe'
};
var FTPI_BUTTON_KEY = {
  BUTTON_LAYOUT: 'button_layout',
  BUTTON_COLOR: 'button_color',
  BUTTON_SIZE: 'button_size',
  BUTTON_SHAPE: 'button_shape',
  BUTTON_LABEL: 'button_label',
  BUTTON_WIDTH: 'button_width',
  BUTTON_TYPE: 'button_type',
  BUTTON_TAGLINE_ENABLED: 'button_tagline_enabled'
};
var USER_ACTION = {
  COMMIT: 'commit',
  CONTINUE: 'continue'
};
// CONCATENATED MODULE: ./src/lib/util.js



function unresolvedPromise() {
  return new promise_ZalgoPromise(src_util_noop);
}
function promiseNoop() {
  // eslint-disable-line no-unused-vars
  return promise_ZalgoPromise.resolve();
}
function getBody() {
  var body = document.body;

  if (!body) {
    throw new Error("Document body not found");
  }

  return body;
}
function sendBeacon(url) {
  var img = document.createElement('img');
  img.src = url;
  img.style.visibility = 'hidden';
  img.style.position = 'absolute';

  if (document.body) {
    document.body.appendChild(img);
  }
}
function fixClickFocus(el) {
  el.addEventListener(DOM_EVENT.MOUSEDOWN, function () {
    el.classList.add(CLASS.CLICKED);
  });
  el.addEventListener(DOM_EVENT.HOVER, function (event) {
    if (el.classList.contains(CLASS.CLICKED)) {
      event.preventDefault();
      el.blur();
      el.classList.remove(CLASS.CLICKED);
    }
  });
}
function sleep(time) {
  return new promise_ZalgoPromise(function (resolve) {
    setTimeout(resolve, time);
  });
}
function redirectTop(url) {
  if (false) {} else {
    window.top.location = url;
  }
}
function loadScript(url) {
  return new promise_ZalgoPromise(function (resolve, reject) {
    var container = document.body || document.head;

    if (!container) {
      return reject(new Error("Can not find container for script: " + url));
    }

    var script = document.createElement('script');
    script.setAttribute('src', url);
    script.addEventListener('load', function () {
      return resolve(script);
    }); // $FlowFixMe

    script.addEventListener('error', function (err) {
      return reject(err);
    });
    container.appendChild(script);
  });
}
// CONCATENATED MODULE: ./node_modules/beaver-logger/src/constants.js
var LOG_LEVEL = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};
var constants_PROTOCOL = {
  FILE: 'file:'
};
// CONCATENATED MODULE: ./node_modules/beaver-logger/src/config.js

var AUTO_FLUSH_LEVEL = [LOG_LEVEL.WARN, LOG_LEVEL.ERROR];
var LOG_LEVEL_PRIORITY = [LOG_LEVEL.ERROR, LOG_LEVEL.WARN, LOG_LEVEL.INFO, LOG_LEVEL.DEBUG];
var FLUSH_INTERVAL = 60 * 1000;
var DEFAULT_LOG_LEVEL = LOG_LEVEL.WARN;
// CONCATENATED MODULE: ./node_modules/beaver-logger/src/logger.js






function httpTransport(_ref) {
  var url = _ref.url,
      method = _ref.method,
      headers = _ref.headers,
      json = _ref.json;
  return request({
    url: url,
    method: method,
    headers: headers,
    json: json
  }).then(src_util_noop);
}

function extendIfDefined(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key) && source[key] && !target[key]) {
      target[key] = source[key];
    }
  }
}

function Logger(_ref2) {
  var url = _ref2.url,
      prefix = _ref2.prefix,
      _ref2$logLevel = _ref2.logLevel,
      logLevel = _ref2$logLevel === void 0 ? DEFAULT_LOG_LEVEL : _ref2$logLevel,
      _ref2$transport = _ref2.transport,
      transport = _ref2$transport === void 0 ? httpTransport : _ref2$transport,
      _ref2$flushInterval = _ref2.flushInterval,
      flushInterval = _ref2$flushInterval === void 0 ? FLUSH_INTERVAL : _ref2$flushInterval;
  var events = [];
  var tracking = [];
  var payloadBuilders = [];
  var metaBuilders = [];
  var trackingBuilders = [];
  var headerBuilders = [];

  function print(level, event, payload) {
    if (!dom_isBrowser() || !window.console || !window.console.log) {
      return;
    }

    var consoleLogLevel = logLevel;

    if (window.LOG_LEVEL && LOG_LEVEL_PRIORITY.indexOf(window.LOG_LEVEL) !== -1) {
      consoleLogLevel = window.LOG_LEVEL;
    }

    if (LOG_LEVEL_PRIORITY.indexOf(level) > LOG_LEVEL_PRIORITY.indexOf(consoleLogLevel)) {
      return;
    }

    var args = [event];
    args.push(payload);

    if (payload.error || payload.warning) {
      args.push('\n\n', payload.error || payload.warning);
    }

    try {
      if (window.console[level] && window.console[level].apply) {
        window.console[level].apply(window.console, args);
      } else if (window.console.log && window.console.log.apply) {
        window.console.log.apply(window.console, args);
      }
    } catch (err) {// pass
    }
  }

  function immediateFlush() {
    return promise_ZalgoPromise.try(function () {
      if (!dom_isBrowser() || window.location.protocol === constants_PROTOCOL.FILE) {
        return;
      }

      if (!events.length && !tracking.length) {
        return;
      }

      var meta = {};

      for (var _i2 = 0; _i2 < metaBuilders.length; _i2++) {
        var builder = metaBuilders[_i2];
        extendIfDefined(meta, builder(meta));
      }

      var headers = {};

      for (var _i4 = 0; _i4 < headerBuilders.length; _i4++) {
        var _builder = headerBuilders[_i4];
        extendIfDefined(headers, _builder(headers));
      }

      var req = transport({
        method: 'POST',
        url: url,
        headers: headers,
        json: {
          events: events,
          meta: meta,
          tracking: tracking
        }
      });
      events = [];
      tracking = [];
      return req.then(src_util_noop);
    });
  }

  var flush = promiseDebounce(immediateFlush);

  function enqueue(level, event, payload) {
    events.push({
      level: level,
      event: event,
      payload: payload
    });

    if (AUTO_FLUSH_LEVEL.indexOf(level) !== -1) {
      flush();
    }
  }

  function log(level, event, payload) {
    if (payload === void 0) {
      payload = {};
    }

    if (!dom_isBrowser()) {
      return logger; // eslint-disable-line no-use-before-define
    }

    if (prefix) {
      event = prefix + "_" + event;
    }

    var logPayload = _extends({}, objFilter(payload), {
      timestamp: Date.now().toString()
    });

    for (var _i6 = 0; _i6 < payloadBuilders.length; _i6++) {
      var builder = payloadBuilders[_i6];
      extendIfDefined(logPayload, builder(logPayload));
    }

    enqueue(level, event, logPayload);
    print(level, event, logPayload);
    return logger; // eslint-disable-line no-use-before-define
  }

  function addBuilder(builders, builder) {
    builders.push(builder);
    return logger; // eslint-disable-line no-use-before-define
  }

  function addPayloadBuilder(builder) {
    return addBuilder(payloadBuilders, builder);
  }

  function addMetaBuilder(builder) {
    return addBuilder(metaBuilders, builder);
  }

  function addTrackingBuilder(builder) {
    return addBuilder(trackingBuilders, builder);
  }

  function addHeaderBuilder(builder) {
    return addBuilder(headerBuilders, builder);
  }

  function debug(event, payload) {
    return log(LOG_LEVEL.DEBUG, event, payload);
  }

  function info(event, payload) {
    return log(LOG_LEVEL.INFO, event, payload);
  }

  function warn(event, payload) {
    return log(LOG_LEVEL.WARN, event, payload);
  }

  function error(event, payload) {
    return log(LOG_LEVEL.ERROR, event, payload);
  }

  function track(payload) {
    if (payload === void 0) {
      payload = {};
    }

    if (!dom_isBrowser()) {
      return logger; // eslint-disable-line no-use-before-define
    }

    var trackingPayload = objFilter(payload);

    for (var _i8 = 0; _i8 < trackingBuilders.length; _i8++) {
      var builder = trackingBuilders[_i8];
      extendIfDefined(trackingPayload, builder(trackingPayload));
    }

    print(LOG_LEVEL.DEBUG, 'track', trackingPayload);
    tracking.push(trackingPayload);
    return logger; // eslint-disable-line no-use-before-define
  }

  function setTransport(newTransport) {
    transport = newTransport;
    return logger; // eslint-disable-line no-use-before-define
  }

  if (dom_isBrowser()) {
    safeInterval(flush, flushInterval);
  }

  var logger = {
    debug: debug,
    info: info,
    warn: warn,
    error: error,
    track: track,
    flush: flush,
    immediateFlush: immediateFlush,
    addPayloadBuilder: addPayloadBuilder,
    addMetaBuilder: addMetaBuilder,
    addTrackingBuilder: addTrackingBuilder,
    addHeaderBuilder: addHeaderBuilder,
    setTransport: setTransport
  };
  return logger;
}
// CONCATENATED MODULE: ./node_modules/beaver-logger/src/index.js


// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/locale.js
/* eslint max-lines: 0 */
var COUNTRY = {
  AD: 'AD',
  AE: 'AE',
  AG: 'AG',
  AI: 'AI',
  AL: 'AL',
  AM: 'AM',
  AN: 'AN',
  AO: 'AO',
  AR: 'AR',
  AT: 'AT',
  AU: 'AU',
  AW: 'AW',
  AZ: 'AZ',
  BA: 'BA',
  BB: 'BB',
  BE: 'BE',
  BF: 'BF',
  BG: 'BG',
  BH: 'BH',
  BI: 'BI',
  BJ: 'BJ',
  BM: 'BM',
  BN: 'BN',
  BO: 'BO',
  BR: 'BR',
  BS: 'BS',
  BT: 'BT',
  BW: 'BW',
  BY: 'BY',
  BZ: 'BZ',
  CA: 'CA',
  CD: 'CD',
  CG: 'CG',
  CH: 'CH',
  CI: 'CI',
  CK: 'CK',
  CL: 'CL',
  CM: 'CM',
  CN: 'CN',
  CO: 'CO',
  CR: 'CR',
  CV: 'CV',
  CY: 'CY',
  CZ: 'CZ',
  DE: 'DE',
  DJ: 'DJ',
  DK: 'DK',
  DM: 'DM',
  DO: 'DO',
  DZ: 'DZ',
  EC: 'EC',
  EE: 'EE',
  EG: 'EG',
  ER: 'ER',
  ES: 'ES',
  ET: 'ET',
  FI: 'FI',
  FJ: 'FJ',
  FK: 'FK',
  FM: 'FM',
  FO: 'FO',
  FR: 'FR',
  GA: 'GA',
  GB: 'GB',
  GD: 'GD',
  GE: 'GE',
  GF: 'GF',
  GI: 'GI',
  GL: 'GL',
  GM: 'GM',
  GN: 'GN',
  GP: 'GP',
  GR: 'GR',
  GT: 'GT',
  GW: 'GW',
  GY: 'GY',
  HK: 'HK',
  HN: 'HN',
  HR: 'HR',
  HU: 'HU',
  ID: 'ID',
  IE: 'IE',
  IL: 'IL',
  IN: 'IN',
  IS: 'IS',
  IT: 'IT',
  JM: 'JM',
  JO: 'JO',
  JP: 'JP',
  KE: 'KE',
  KG: 'KG',
  KH: 'KH',
  KI: 'KI',
  KM: 'KM',
  KN: 'KN',
  KR: 'KR',
  KW: 'KW',
  KY: 'KY',
  KZ: 'KZ',
  LA: 'LA',
  LC: 'LC',
  LI: 'LI',
  LK: 'LK',
  LS: 'LS',
  LT: 'LT',
  LU: 'LU',
  LV: 'LV',
  MA: 'MA',
  MC: 'MC',
  MD: 'MD',
  ME: 'ME',
  MG: 'MG',
  MH: 'MH',
  MK: 'MK',
  ML: 'ML',
  MN: 'MN',
  MQ: 'MQ',
  MR: 'MR',
  MS: 'MS',
  MT: 'MT',
  MU: 'MU',
  MV: 'MV',
  MW: 'MW',
  MX: 'MX',
  MY: 'MY',
  MZ: 'MZ',
  NA: 'NA',
  NC: 'NC',
  NE: 'NE',
  NF: 'NF',
  NG: 'NG',
  NI: 'NI',
  NL: 'NL',
  NO: 'NO',
  NP: 'NP',
  NR: 'NR',
  NU: 'NU',
  NZ: 'NZ',
  OM: 'OM',
  PA: 'PA',
  PE: 'PE',
  PF: 'PF',
  PG: 'PG',
  PH: 'PH',
  PL: 'PL',
  PM: 'PM',
  PN: 'PN',
  PT: 'PT',
  PW: 'PW',
  PY: 'PY',
  QA: 'QA',
  RE: 'RE',
  RO: 'RO',
  RS: 'RS',
  RU: 'RU',
  RW: 'RW',
  SA: 'SA',
  SB: 'SB',
  SC: 'SC',
  SE: 'SE',
  SG: 'SG',
  SH: 'SH',
  SI: 'SI',
  SJ: 'SJ',
  SK: 'SK',
  SL: 'SL',
  SM: 'SM',
  SN: 'SN',
  SO: 'SO',
  SR: 'SR',
  ST: 'ST',
  SV: 'SV',
  SZ: 'SZ',
  TC: 'TC',
  TD: 'TD',
  TG: 'TG',
  TH: 'TH',
  TJ: 'TJ',
  TM: 'TM',
  TN: 'TN',
  TO: 'TO',
  TR: 'TR',
  TT: 'TT',
  TV: 'TV',
  TW: 'TW',
  TZ: 'TZ',
  UA: 'UA',
  UG: 'UG',
  US: 'US',
  UY: 'UY',
  VA: 'VA',
  VC: 'VC',
  VE: 'VE',
  VG: 'VG',
  VN: 'VN',
  VU: 'VU',
  WF: 'WF',
  WS: 'WS',
  YE: 'YE',
  YT: 'YT',
  ZA: 'ZA',
  ZM: 'ZM',
  ZW: 'ZW'
};
var LANG = {
  AR: 'ar',
  CS: 'cs',
  DA: 'da',
  DE: 'de',
  EL: 'el',
  EN: 'en',
  ES: 'es',
  FI: 'fi',
  FR: 'fr',
  HE: 'he',
  HU: 'hu',
  ID: 'id',
  IT: 'it',
  JA: 'ja',
  KO: 'ko',
  NL: 'nl',
  NO: 'no',
  PL: 'pl',
  PT: 'pt',
  RU: 'ru',
  SK: 'sk',
  SV: 'sv',
  TH: 'th',
  TR: 'tr',
  ZH: 'zh'
};
var COUNTRY_LANGS = {
  AD: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AE: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR],
  AG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AI: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AL: [LANG.EN],
  AM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AN: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AO: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AR: [LANG.ES, LANG.EN],
  AT: [LANG.DE, LANG.EN],
  AU: [LANG.EN],
  AW: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BA: [LANG.EN],
  BB: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BE: [LANG.EN, LANG.NL, LANG.FR],
  BF: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  BG: [LANG.EN],
  BH: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BI: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  BJ: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  BM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BN: [LANG.EN],
  BO: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  BR: [LANG.PT, LANG.EN],
  BS: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BT: [LANG.EN],
  BW: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BY: [LANG.EN],
  BZ: [LANG.EN, LANG.ES, LANG.FR, LANG.ZH],
  CA: [LANG.EN, LANG.FR],
  CD: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  CG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  CH: [LANG.DE, LANG.FR, LANG.EN],
  CI: [LANG.FR, LANG.EN],
  CK: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  CL: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  CM: [LANG.FR, LANG.EN],
  CN: [LANG.ZH],
  CO: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  CR: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  CV: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  CY: [LANG.EN],
  CZ: [LANG.CS, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  DE: [LANG.DE, LANG.EN],
  DJ: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  DK: [LANG.DA, LANG.EN],
  DM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  DO: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  DZ: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  EC: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  EE: [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH],
  EG: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ER: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ES: [LANG.ES, LANG.EN],
  ET: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  FI: [LANG.FI, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  FJ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  FK: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  FM: [LANG.EN],
  FO: [LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  FR: [LANG.FR, LANG.EN],
  GA: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  GB: [LANG.EN],
  GD: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GE: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GF: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GI: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GL: [LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GN: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  GP: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GR: [LANG.EL, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GT: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  GW: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GY: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  HK: [LANG.EN, LANG.ZH],
  HN: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  HR: [LANG.EN],
  HU: [LANG.HU, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ID: [LANG.ID, LANG.EN],
  IE: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  IL: [LANG.HE, LANG.EN],
  IN: [LANG.EN],
  IS: [LANG.EN],
  IT: [LANG.IT, LANG.EN],
  JM: [LANG.EN, LANG.ES, LANG.FR, LANG.ZH],
  JO: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  JP: [LANG.JA, LANG.EN],
  KE: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KH: [LANG.EN],
  KI: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KM: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  KN: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KR: [LANG.KO, LANG.EN],
  KW: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KY: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  LA: [LANG.EN],
  LC: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  LI: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  LK: [LANG.EN],
  LS: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  LT: [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH],
  LU: [LANG.EN, LANG.DE, LANG.FR, LANG.ES, LANG.ZH],
  LV: [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH],
  MA: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MC: [LANG.FR, LANG.EN],
  MD: [LANG.EN],
  ME: [LANG.EN],
  MG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MH: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MK: [LANG.EN],
  ML: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  MN: [LANG.EN],
  MQ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MR: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MS: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MT: [LANG.EN],
  MU: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MV: [LANG.EN],
  MW: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MX: [LANG.ES, LANG.EN],
  MY: [LANG.EN],
  MZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NA: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NC: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NE: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  NF: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NG: [LANG.EN],
  NI: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  NL: [LANG.NL, LANG.EN],
  NO: [LANG.NO, LANG.EN],
  NP: [LANG.EN],
  NR: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NU: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  OM: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PA: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  PE: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  PF: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PH: [LANG.EN],
  PL: [LANG.PL, LANG.EN],
  PM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PN: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PT: [LANG.PT, LANG.EN],
  PW: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PY: [LANG.ES, LANG.EN],
  QA: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR],
  RE: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  RO: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  RS: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  RU: [LANG.RU, LANG.EN],
  RW: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  SA: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SB: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SC: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  SE: [LANG.SV, LANG.EN],
  SG: [LANG.EN],
  SH: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SI: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SJ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SK: [LANG.SK, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SL: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SN: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  SO: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SR: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ST: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SV: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  SZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TC: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TD: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  TG: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  TH: [LANG.TH, LANG.EN],
  TJ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TN: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TO: [LANG.EN],
  TR: [LANG.TR, LANG.EN],
  TT: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TV: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TW: [LANG.ZH, LANG.EN],
  TZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  UA: [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH],
  UG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  US: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  UY: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  VA: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  VC: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  VE: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  VG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  VN: [LANG.EN],
  VU: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  WF: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  WS: [LANG.EN],
  YE: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  YT: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ZA: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ZM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ZW: [LANG.EN]
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/params.js
var SDK_PATH = '/sdk/js';
var SDK_SETTINGS = {
  NAMESPACE: 'data-namespace',
  CLIENT_TOKEN: 'data-client-token',
  PARTNER_ATTRIBUTION_ID: 'data-partner-attribution-id',
  STAGE_HOST: 'data-stage-host',
  API_STAGE_HOST: 'data-api-stage-host',
  CSP_NONCE: 'data-csp-nonce',
  ENABLE_3DS: 'data-enable-3ds'
};
var SDK_QUERY_KEYS = {
  COMPONENTS: 'components',
  ENV: 'env',
  DEBUG: 'debug',
  CACHEBUST: 'cachebust',
  CLIENT_ID: 'client-id',
  MERCHANT_ID: 'merchant-id',
  MERCHANT_EMAIL_HASH: 'merchant-email-hash',
  LOCALE: 'locale',
  CURRENCY: 'currency',
  INTENT: 'intent',
  COMMIT: 'commit',
  VAULT: 'vault',
  BUYER_COUNTRY: 'buyer-country',
  DISABLE_FUNDING: 'disable-funding',
  DISABLE_CARD: 'disable-card',
  LOCALE_COUNTRY: 'locale-country',
  LOCALE_LANG: 'locale-lang',
  FRAMEWORK: 'framework',
  INTEGRATION_DATE: 'integration-date',
  ORDER_CURRENCY: 'order-currency',
  ORDER_INTENT: 'order-intent',
  ORDER_COMMIT: 'order-commit',
  ORDER_VAULT: 'order-vault'
};
var COMPONENTS = {
  BUTTONS: 'buttons',
  HOSTED_FIELDS: 'hosted-fields'
};
var FRAMEWORK = {
  ANGULARJS: 'angularjs',
  ANGULAR: 'angular',
  REACT: 'react',
  VUE: 'vue'
};
var DEBUG = {
  TRUE: true,
  FALSE: false
};
var QUERY_BOOL = {
  TRUE: 'true',
  FALSE: 'false'
};
var UNKNOWN = 'unknown';
var params_PROTOCOL = {
  HTTP: 'http',
  HTTPS: 'https'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/env.js
var ENV = {
  LOCAL: 'local',
  STAGE: 'stage',
  SANDBOX: 'sandbox',
  PRODUCTION: 'production',
  TEST: 'test'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/fpti.js
var FPTI_KEY = {
  FEED: 'feed_name',
  STATE: 'state_name',
  TRANSITION: 'transition_name',
  BUTTON_TYPE: 'button_type',
  SESSION_UID: 'page_session_id',
  BUTTON_SESSION_UID: 'button_session_id',
  TOKEN: 'token',
  CONTEXT_ID: 'context_id',
  CONTEXT_TYPE: 'context_type',
  REFERER: 'referer_url',
  MERCHANT_DOMAIN: 'merchant_domain',
  PAY_ID: 'pay_id',
  SELLER_ID: 'seller_id',
  CLIENT_ID: 'client_id',
  DATA_SOURCE: 'serverside_data_source',
  BUTTON_SOURCE: 'button_source',
  ERROR_CODE: 'ext_error_code',
  ERROR_DESC: 'ext_error_desc',
  PAGE_LOAD_TIME: 'page_load_time',
  EXPERIMENT_NAME: 'pxp_exp_id',
  TREATMENT_NAME: 'pxp_trtmnt_id',
  TRANSITION_TIME: 'transition_time',
  FUNDING_LIST: 'eligible_payment_methods',
  FUNDING_COUNT: 'eligible_payment_count',
  CHOSEN_FUNDING: 'selected_payment_method',
  BUTTON_LAYOUT: 'button_layout',
  VERSION: 'checkoutjs_version',
  LOCALE: 'locale',
  BUYER_COUNTRY: 'buyer_cntry',
  INTEGRATION_IDENTIFIER: 'integration_identifier',
  PARTNER_ATTRIBUTION_ID: 'bn_code',
  SDK_NAME: 'sdk_name',
  SDK_VERSION: 'sdk_version',
  USER_AGENT: 'user_agent',
  USER_ACTION: 'user_action',
  CONTEXT_CORRID: 'context_correlation_id',
  SDK_CACHE: 'sdk_cache',
  SDK_LOAD_TIME: 'sdk_load_time',
  IS_VAULT: 'is_vault',
  DISABLE_FUNDING: 'disable_funding',
  DISABLE_CARD: 'disable_card',
  RESPONSE_DURATION: 'response_duration'
};
var FPTI_USER_ACTION = {
  COMMIT: 'commit',
  CONTINUE: 'continue'
};
var FPTI_DATA_SOURCE = {
  PAYMENTS_SDK: 'checkout'
};
var FPTI_FEED = {
  PAYMENTS_SDK: 'payments_sdk'
};
var FPTI_SDK_NAME = {
  PAYMENTS_SDK: 'payments_sdk'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/order.js
var INTENT = {
  CAPTURE: 'capture',
  AUTHORIZE: 'authorize',
  ORDER: 'order'
};
var COMMIT = {
  TRUE: true,
  FALSE: false
};
var VAULT = {
  TRUE: true,
  FALSE: false
};
var CURRENCY = {
  AUD: 'AUD',
  BRL: 'BRL',
  CAD: 'CAD',
  CZK: 'CZK',
  DKK: 'DKK',
  EUR: 'EUR',
  HKD: 'HKD',
  HUF: 'HUF',
  INR: 'INR',
  ILS: 'ILS',
  JPY: 'JPY',
  MUR: 'MUR',
  MYR: 'MYR',
  MXN: 'MXN',
  TWD: 'TWD',
  NZD: 'NZD',
  NOK: 'NOK',
  PHP: 'PHP',
  PLN: 'PLN',
  GBP: 'GBP',
  RUB: 'RUB',
  SGD: 'SGD',
  SEK: 'SEK',
  CHF: 'CHF',
  THB: 'THB',
  USD: 'USD'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/platform.js
var PLATFORM = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/funding.js
var FUNDING = {
  PAYPAL: 'paypal',
  VENMO: 'venmo',
  ITAU: 'itau',
  CREDIT: 'credit',
  CARD: 'card',
  IDEAL: 'ideal',
  SEPA: 'sepa',
  BANCONTACT: 'bancontact',
  GIROPAY: 'giropay',
  SOFORT: 'sofort',
  EPS: 'eps',
  MYBANK: 'mybank',
  P24: 'p24',
  VERKKOPANKKI: 'verkkopankki',
  PAYU: 'payu',
  BLIK: 'blik',
  TRUSTLY: 'trustly',
  ZIMPLER: 'zimpler',
  MAXIMA: 'maxima',
  OXXO: 'oxxo',
  BOLETO: 'boleto',
  WECHATPAY: 'wechatpay'
};
var CARD = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  AMEX: 'amex',
  DISCOVER: 'discover',
  HIPER: 'hiper',
  ELO: 'elo',
  JCB: 'jcb',
  CUP: 'cup'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/defaults.js



var DEFAULT_COUNTRY = COUNTRY.US;
var DEFAULT_CURRENCY = CURRENCY.USD;
var DEFAULT_INTENT = INTENT.CAPTURE;
var DEFAULT_COMMIT = COMMIT.TRUE;
var DEFAULT_SALE_COMMIT = COMMIT.TRUE;
var DEFAULT_NONSALE_COMMIT = COMMIT.TRUE;
var DEFAULT_VAULT = VAULT.FALSE;
var DEFAULT_COMPONENTS = COMPONENTS.BUTTONS;
var DEFAULT_DEBUG = DEBUG.FALSE;
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/index.js








// CONCATENATED MODULE: ./src/config.js
var LOGGER_URL = '/xoplatform/logger/api/logger';
var AUTH_API_URL = '/v1/oauth2/token';
var ORDERS_API_URL = '/v2/checkout/orders';
var PAYMENTS_API_URL = '/v1/payments/payment';
var CREATE_SUBSCRIPTIONS_API_URL = '/v1/billing/subscriptions';
var VALIDATE_PAYMENT_METHOD_API = 'validate-payment-method';
var BASE_SMART_API_URL = '/smart/api';
var SMART_API_URI = {
  AUTH: BASE_SMART_API_URL + "/auth",
  CHECKOUT: BASE_SMART_API_URL + "/checkout",
  ORDER: BASE_SMART_API_URL + "/order",
  PAYMENT: BASE_SMART_API_URL + "/payment",
  SUBSCRIPTION: BASE_SMART_API_URL + "/billagmt/subscriptions"
};
var GRAPHQL_URI = '/graphql';
var EXPERIENCE_URI = {
  CHECKOUT: '/checkoutnow',
  NATIVE_CHECKOUT: '/smart/checkout/native'
};
var NATIVE_DETECTION_URL = 'http://127.0.0.1:8765/hello';
var CLIENT_ID_PAYEE_NO_MATCH = ['Af3YaeRfoJGtncwLeiahT93xTYT0-wldEEaiGehhGspP333r6tADvHeVCwZPR022F4d0YQquv7Lik_PT', 'AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb', 'AcjM7hAZjUAqIgU0Lvzneb9-_rWs7qAEl6PoPVHtQV5PNmWBihQWsu_SglKO', 'Af_pMiA6ikCtlsNB8dJW1oG1ZI7FirXbRU43rDRfq_i_iQAPbYsojeI9Q2VzZvD1u2wKEPuaokZaNWyC', 'AQAZZuAP5V0b8Wzs1t3KJM3opK8ueK6Txnlm7pw6kMFHrcAdFogBw3pBmeNP-234aHAZ2BlHeijkU2Tt', 'Aef8KpflK3t-pTjstogUtqzAuk1IRGHpkdBTxyTWeARwqXyuRrX5Uj-Bs6KdMwK1g8ZhitjzfJ5jh6K7', 'ARcLSr40hevzVXTnnNpHochqg9lsyznO2UugwjyCpt4MPnAmxgyLGC2Ia7aufLH1jS8BhOIZBnXqhOfP', 'AYiXLQVgLszolhHbiYAm2HZERgDF5BOPXG7i4m9BNsTTSdmWhVu2Np4_GqDJLrl5VA50VDAlMMpCMArb', 'ARbpxmp0udlm2zBPu6bqW6PAMV-UfCTktgWFtJ0cy1rKQUUtIRffwg1A-i0wRyFg9BhbfZM3M6ci6czP', 'AeHvO7dLYAlLLnkZWxCTvHgSBMoFRn-bu1Wy9kjEXZVb8wYZPRpEykxDhLQ0WjgUPQz_MeF1e1FnH4mT', 'Abi2EEJv7o1v6GKAE1nNVgeNqBWLYXSiDoAKi-ADKU6uRPi_41GJEMr5rjZC8fuQxAC-MVEPYSfYsfzD', 'AW9fGl1zpjGSB474VARpj8j0hyEzrwNY7WgJCtwStaVVYkiyixnX4Z3KSe9A0jPLOcKj_2B9lHon1nAR', 'ARBlYB7bfFnpO5IgprEW0PqtBSZOn1Q0Jly-3r_IzMEU8sPq0fdNrk1D4JgHAitxDBxfuL6wDpDvTZgU', 'AZNQsMt_Ho-GClAUCvZVuKyz-n5rRhZyEBL2yTTetPV-lTqQE2_4quG6-ADlBMZoAgnG-yccas62Hqg2'];
var FIREBASE_SCRIPTS = {
  APP: 'https://www.paypalobjects.com/checkout/js/lib/firebase-app.js',
  AUTH: 'https://www.paypalobjects.com/checkout/js/lib/firebase-auth.js',
  DATABASE: 'https://www.paypalobjects.com/checkout/js/lib/firebase-database.js'
};
var ENABLE_PAYMENT_API = false;
// CONCATENATED MODULE: ./src/lib/logger.js






function getLogger() {
  return inlineMemoize(getLogger, function () {
    return Logger({
      url: LOGGER_URL
    });
  });
}
function setupLogger(_ref) {
  var env = _ref.env,
      sessionID = _ref.sessionID,
      buttonSessionID = _ref.buttonSessionID,
      clientID = _ref.clientID,
      partnerAttributionID = _ref.partnerAttributionID,
      commit = _ref.commit,
      correlationID = _ref.correlationID,
      locale = _ref.locale,
      merchantID = _ref.merchantID,
      merchantDomain = _ref.merchantDomain,
      version = _ref.version;
  var logger = getLogger();
  logger.addPayloadBuilder(function () {
    return {
      referer: window.location.host,
      uid: sessionID,
      env: env
    };
  });
  logger.addTrackingBuilder(function () {
    var _ref2;

    var lang = locale.lang,
        country = locale.country;
    return _ref2 = {}, _ref2[FPTI_KEY.CONTEXT_TYPE] = FPTI_CONTEXT_TYPE.BUTTON_SESSION_ID, _ref2[FPTI_KEY.CONTEXT_ID] = buttonSessionID, _ref2[FPTI_KEY.STATE] = FPTI_STATE.BUTTON, _ref2[FPTI_KEY.FEED] = FPTI_FEED.PAYMENTS_SDK, _ref2[FPTI_KEY.DATA_SOURCE] = FPTI_DATA_SOURCE.PAYMENTS_SDK, _ref2[FPTI_KEY.CLIENT_ID] = clientID, _ref2[FPTI_KEY.SELLER_ID] = merchantID[0], _ref2[FPTI_KEY.SESSION_UID] = sessionID, _ref2[FPTI_KEY.REFERER] = window.location.host, _ref2[FPTI_KEY.MERCHANT_DOMAIN] = merchantDomain, _ref2[FPTI_KEY.LOCALE] = lang + "_" + country, _ref2[FPTI_KEY.INTEGRATION_IDENTIFIER] = clientID, _ref2[FPTI_KEY.PARTNER_ATTRIBUTION_ID] = partnerAttributionID, _ref2[FPTI_KEY.SDK_NAME] = FPTI_SDK_NAME.PAYMENTS_SDK, _ref2[FPTI_KEY.SDK_VERSION] = version, _ref2[FPTI_KEY.USER_AGENT] = window.navigator && window.navigator.userAgent, _ref2[FPTI_KEY.USER_ACTION] = commit ? FPTI_USER_ACTION.COMMIT : FPTI_USER_ACTION.CONTINUE, _ref2[FPTI_KEY.CONTEXT_CORRID] = correlationID, _ref2;
  });
  promise_ZalgoPromise.onPossiblyUnhandledException(function (err) {
    var _logger$track;

    logger.track((_logger$track = {}, _logger$track[FPTI_KEY.ERROR_CODE] = 'payments_sdk_error', _logger$track[FPTI_KEY.ERROR_DESC] = stringifyErrorMessage(err), _logger$track));
    logger.error('unhandled_error', {
      err: stringifyError(err)
    }); // eslint-disable-next-line promise/no-promise-in-callback

    logger.flush().catch(src_util_noop);
  });
}
// CONCATENATED MODULE: ./src/lib/index.js


// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/constants.js
var NODE_TYPE = {
  ELEMENT: 'element',
  TEXT: 'text',
  COMPONENT: 'component',
  FRAGMENT: 'fragment'
};
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/node.js


function _renderChildren(children, renderer) {
  // eslint-disable-line no-use-before-define
  var result = [];

  for (var _i2 = 0; _i2 < children.length; _i2++) {
    var child = children[_i2];
    var renderedChild = child.render(renderer);

    if (!renderedChild) {
      continue;
    } else if (Array.isArray(renderedChild)) {
      for (var _i4 = 0; _i4 < renderedChild.length; _i4++) {
        var subchild = renderedChild[_i4];

        if (subchild) {
          result.push(subchild);
        }
      }
    } else {
      result.push(renderedChild);
    }
  }

  return result;
}

var node_ElementNode =
/*#__PURE__*/
function () {
  // eslint-disable-line no-use-before-define
  // eslint-disable-line no-undef
  function ElementNode(name, props, children) {
    this.type = NODE_TYPE.ELEMENT;
    this.name = void 0;
    this.props = void 0;
    this.children = void 0;
    this.onRender = void 0;
    // eslint-disable-line no-use-before-define
    this.name = name;
    this.props = props;
    this.children = children;
    var onRender = props.onRender;

    if (typeof onRender === 'function') {
      this.onRender = onRender;
      delete props.onRender;
    }
  }

  var _proto = ElementNode.prototype;

  _proto.render = function render(renderer) {
    var el = renderer(this);

    if (this.onRender) {
      this.onRender(el);
    }

    return el;
  };

  _proto.renderChildren = function renderChildren(renderer) {
    return _renderChildren(this.children, renderer);
  };

  return ElementNode;
}();
var node_FragmentNode =
/*#__PURE__*/
function () {
  // eslint-disable-line no-use-before-define
  function FragmentNode(children) {
    this.type = NODE_TYPE.FRAGMENT;
    this.children = void 0;
    // eslint-disable-line no-use-before-define
    this.children = children;
  }

  var _proto2 = FragmentNode.prototype;

  _proto2.render = function render(renderer) {
    return _renderChildren(this.children, renderer);
  };

  return FragmentNode;
}();
var node_TextNode =
/*#__PURE__*/
function () {
  function TextNode(text) {
    this.type = NODE_TYPE.TEXT;
    this.text = void 0;
    this.text = text;
  }

  var _proto3 = TextNode.prototype;

  _proto3.render = function render(renderer) {
    return renderer(this);
  };

  return TextNode;
}();
var node_ComponentNode =
/*#__PURE__*/
function () {
  function ComponentNode(component, props, children) {
    this.type = NODE_TYPE.COMPONENT;
    this.component = void 0;
    this.props = void 0;
    this.children = void 0;
    this.component = component;
    this.props = props;
    this.children = children;
  }

  var _proto4 = ComponentNode.prototype;

  _proto4.renderComponent = function renderComponent(renderer) {
    // $FlowFixMe
    var props = this.props;
    var child = normalizeChild(this.component(props, this.children)); // eslint-disable-line no-use-before-define

    if (child) {
      return child.render(renderer);
    }
  };

  _proto4.render = function render(renderer) {
    return renderer(this);
  };

  _proto4.renderChildren = function renderChildren(renderer) {
    return _renderChildren(this.children, renderer);
  };

  return ComponentNode;
}();

function normalizeChildren(children) {
  var result = [];

  for (var _i6 = 0; _i6 < children.length; _i6++) {
    var child = children[_i6];

    if (!child) {
      continue;
    } else if (typeof child === 'string') {
      result.push(new node_TextNode(child));
    } else if (Array.isArray(child)) {
      for (var _i8 = 0, _normalizeChildren2 = normalizeChildren(child); _i8 < _normalizeChildren2.length; _i8++) {
        var subchild = _normalizeChildren2[_i8];
        result.push(subchild);
      }
    } else if (child && (child.type === NODE_TYPE.ELEMENT || child.type === NODE_TYPE.TEXT || child.type === NODE_TYPE.COMPONENT)) {
      result.push(child);
    } else {
      throw new TypeError("Unrecognized node type: " + typeof child);
    }
  }

  return result;
}

function normalizeChild(child) {
  var children = normalizeChildren(Array.isArray(child) ? child : [child]);

  if (children.length === 1) {
    return children[0];
  } else if (children.length > 1) {
    return new node_FragmentNode(children);
  }
}

var node_node = function node(element, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // $FlowFixMe
  props = props || {};
  children = normalizeChildren(children);

  if (typeof element === 'string') {
    // $FlowFixMe
    return new node_ElementNode(element, props, children);
  }

  if (typeof element === 'function') {
    // $FlowFixMe
    return new node_ComponentNode(element, props, children);
  }

  throw new TypeError("Expected jsx element to be a string or a function");
};
var Fragment = function Fragment(props, children) {
  if (props && Object.keys(props).length) {
    throw new Error("Do not pass props to Fragment");
  }

  return children;
};
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/util.js
var ALPHA_CHARS = '0123456789abcdef';
function util_uniqueID() {
  return 'xxxxxxxxxx'.replace(/./g, function () {
    return ALPHA_CHARS.charAt(Math.floor(Math.random() * ALPHA_CHARS.length));
  });
}
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/renderers/dom.js
var _ADD_CHILDREN;




var ELEMENT_TAG = {
  HTML: 'html',
  IFRAME: 'iframe',
  SCRIPT: 'script',
  NODE: 'node',
  DEFAULT: 'default'
};
var ELEMENT_PROP = {
  ID: 'id',
  INNER_HTML: 'innerHTML',
  EL: 'el'
};

function dom_fixScripts(el, doc) {
  if (doc === void 0) {
    doc = window.document;
  }

  for (var _i2 = 0, _el$querySelectorAll2 = el.querySelectorAll('script'); _i2 < _el$querySelectorAll2.length; _i2++) {
    var script = _el$querySelectorAll2[_i2];
    var parentNode = script.parentNode;

    if (!parentNode) {
      continue;
    }

    var newScript = doc.createElement('script'); // $FlowFixMe

    newScript.text = script.textContent;
    parentNode.replaceChild(newScript, script);
  }
}

function dom_createElement(doc, node) {
  if (node.props[ELEMENT_PROP.EL]) {
    // $FlowFixMe
    return node.props[ELEMENT_PROP.EL];
  }

  return doc.createElement(node.name);
}

function createTextElement(doc, node) {
  return doc.createTextNode(node.text);
}

function addProps(el, node) {
  var props = node.props;

  for (var _i4 = 0, _Object$keys2 = Object.keys(props); _i4 < _Object$keys2.length; _i4++) {
    var prop = _Object$keys2[_i4];
    var val = props[prop];

    if (val === null || typeof val === 'undefined' || prop === ELEMENT_PROP.EL || prop === ELEMENT_PROP.INNER_HTML) {
      continue;
    }

    if (prop.match(/^on[A-Z][a-z]/) && typeof val === 'function') {
      el.addEventListener(prop.slice(2).toLowerCase(), val);
    } else if (typeof val === 'string' || typeof val === 'number') {
      el.setAttribute(prop, val.toString());
    } else if (typeof val === 'boolean') {
      if (val === true) {
        el.setAttribute(prop, '');
      }
    }
  }

  if (el.tagName.toLowerCase() === ELEMENT_TAG.IFRAME && !props.id) {
    el.setAttribute(ELEMENT_PROP.ID, "jsx-iframe-" + util_uniqueID());
  }
}

var ADD_CHILDREN = (_ADD_CHILDREN = {}, _ADD_CHILDREN[ELEMENT_TAG.IFRAME] = function (el, node) {
  var firstChild = node.children[0];

  if (node.children.length !== 1 || !(firstChild && firstChild.type === NODE_TYPE.ELEMENT) || firstChild.name !== ELEMENT_TAG.HTML) {
    throw new Error("Expected only single html element node as child of " + ELEMENT_TAG.IFRAME + " element");
  }

  el.addEventListener('load', function () {
    // $FlowFixMe
    var win = el.contentWindow;

    if (!win) {
      throw new Error("Expected frame to have contentWindow");
    }

    var doc = win.document;
    var docElement = doc.documentElement;

    while (docElement.children && docElement.children.length) {
      docElement.removeChild(docElement.children[0]);
    } // eslint-disable-next-line no-use-before-define


    var child = firstChild.render(dom({
      doc: doc
    }));

    while (child.children.length) {
      docElement.appendChild(child.children[0]);
    }
  });
}, _ADD_CHILDREN[ELEMENT_TAG.SCRIPT] = function (el, node) {
  var firstChild = node.children[0];

  if (node.children.length !== 1 || !(firstChild && firstChild.type === NODE_TYPE.TEXT)) {
    throw new Error("Expected only single text node as child of " + ELEMENT_TAG.SCRIPT + " element");
  } // $FlowFixMe


  el.text = firstChild.text;
}, _ADD_CHILDREN[ELEMENT_TAG.DEFAULT] = function (el, node, renderer) {
  for (var _i6 = 0, _node$renderChildren2 = node.renderChildren(renderer); _i6 < _node$renderChildren2.length; _i6++) {
    var child = _node$renderChildren2[_i6];
    el.appendChild(child);
  }
}, _ADD_CHILDREN);

function addChildren(el, node, doc, renderer) {
  if (node.props.hasOwnProperty(ELEMENT_PROP.INNER_HTML)) {
    if (node.children.length) {
      throw new Error("Expected no children to be passed when " + ELEMENT_PROP.INNER_HTML + " prop is set");
    }

    var html = node.props[ELEMENT_PROP.INNER_HTML];

    if (typeof html !== 'string') {
      throw new TypeError(ELEMENT_PROP.INNER_HTML + " prop must be string");
    }

    if (node.name === ELEMENT_TAG.SCRIPT) {
      // $FlowFixMe
      el.text = html;
    } else {
      el.innerHTML = html;
      dom_fixScripts(el, doc);
    }
  } else {
    var addChildrenToElement = ADD_CHILDREN[node.name] || ADD_CHILDREN[ELEMENT_TAG.DEFAULT];
    addChildrenToElement(el, node, renderer);
  }
}

function dom(opts) {
  if (opts === void 0) {
    opts = {};
  }

  var _opts = opts,
      _opts$doc = _opts.doc,
      doc = _opts$doc === void 0 ? document : _opts$doc;

  var domRenderer = function domRenderer(node) {
    if (node.type === NODE_TYPE.COMPONENT) {
      return node.renderComponent(domRenderer);
    }

    if (node.type === NODE_TYPE.TEXT) {
      // $FlowFixMe
      return createTextElement(doc, node);
    }

    if (node.type === NODE_TYPE.ELEMENT) {
      var el = dom_createElement(doc, node);
      addProps(el, node);
      addChildren(el, node, doc, domRenderer); // $FlowFixMe

      return el;
    }

    throw new TypeError("Unhandleable node");
  };

  return domRenderer;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/renderers/react.js


// eslint-disable-line import/no-unresolved



function mapReactProps(props) {
  var innerHTML = props.innerHTML,
      remainingProps = _objectWithoutPropertiesLoose(props, ["innerHTML"]);

  var dangerouslySetInnerHTML = innerHTML ? {
    __html: innerHTML
  } : null;
  return _extends({
    dangerouslySetInnerHTML: dangerouslySetInnerHTML
  }, remainingProps);
}

function react(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      React = _ref.React;

  if (!React) {
    throw new Error("Must pass React library to react renderer");
  }

  var reactRenderer = function reactRenderer(node) {
    if (node.type === NODE_TYPE.COMPONENT) {
      return React.createElement.apply(React, [function () {
        return node.renderComponent(reactRenderer) || null;
      }, node.props].concat(node.renderChildren(reactRenderer)));
    }

    if (node.type === NODE_TYPE.ELEMENT) {
      return React.createElement.apply(React, [node.name, mapReactProps(node.props)].concat(node.renderChildren(reactRenderer)));
    }

    if (node.type === NODE_TYPE.TEXT) {
      return node.text;
    }

    throw new TypeError("Unhandleable node");
  };

  return reactRenderer;
}
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/renderers/html.js


var html_ELEMENT_PROP = {
  INNER_HTML: 'innerHTML'
};
var SELF_CLOSING_TAGS = {
  br: true
};

function html_htmlEncode(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\//g, '&#x2F;');
}

function propsToHTML(props) {
  var keys = Object.keys(props).filter(function (key) {
    var val = props[key];

    if (key === html_ELEMENT_PROP.INNER_HTML) {
      return false;
    }

    if (!val) {
      return false;
    }

    if (typeof val === 'string' || typeof val === 'number' || val === true) {
      return true;
    }

    return false;
  });

  if (!keys.length) {
    return '';
  }

  var pairs = keys.map(function (key) {
    var val = props[key];

    if (val === true) {
      return "" + html_htmlEncode(key);
    }

    if (typeof val !== 'string' && typeof val !== 'number') {
      throw new TypeError("Unexpected prop type: " + typeof val);
    }

    return html_htmlEncode(key) + "=\"" + html_htmlEncode(val.toString()) + "\"";
  });
  return " " + pairs.join(' ');
}

function html() {
  var htmlRenderer = function htmlRenderer(node) {
    if (node.type === NODE_TYPE.COMPONENT) {
      return [].concat(node.renderComponent(htmlRenderer)).join('');
    }

    if (node.type === NODE_TYPE.ELEMENT) {
      var renderedProps = propsToHTML(node.props);

      if (SELF_CLOSING_TAGS[node.name]) {
        return "<" + node.name + renderedProps + " />";
      } else {
        var renderedChildren = typeof node.props[html_ELEMENT_PROP.INNER_HTML] === 'string' ? node.props[html_ELEMENT_PROP.INNER_HTML] : node.renderChildren(htmlRenderer).join('');
        return "<" + node.name + renderedProps + ">" + renderedChildren + "</" + node.name + ">";
      }
    }

    if (node.type === NODE_TYPE.TEXT) {
      return html_htmlEncode(node.text);
    }

    throw new TypeError("Unhandleable node: " + node.type);
  };

  return htmlRenderer;
}
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/renderers/index.js



// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/index.js



// CONCATENATED MODULE: ./node_modules/@paypal/common-components/src/ui/spinnerPage.jsx
/** @jsx node */

var spinnerStyle = "\n\n    body {\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        position: fixed;\n        top: 0;\n        left: 0;\n        margin: 0;\n    }\n\n    .spinner {\n        height: 100%;\n        width: 100%;\n        position: absolute;\n        z-index: 10\n    }\n\n    .spinner .spinWrap {\n        width: 200px;\n        height: 100px;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin-left: -100px;\n        margin-top: -50px\n    }\n\n    .spinner .loader,\n    .spinner .spinnerImage {\n        height: 100px;\n        width: 100px;\n        position: absolute;\n        top: 0;\n        left: 50%;\n        opacity: 1;\n        filter: alpha(opacity=100)\n    }\n\n    .spinner .spinnerImage {\n        margin: 28px 0 0 -25px;\n        background: url(https://www.paypalobjects.com/images/checkout/hermes/icon_ot_spin_lock_skinny.png) no-repeat\n    }\n\n    .spinner .loader {\n        margin: 0 0 0 -55px;\n        background-color: transparent;\n        animation: rotation .7s infinite linear;\n        border-left: 5px solid #cbcbca;\n        border-right: 5px solid #cbcbca;\n        border-bottom: 5px solid #cbcbca;\n        border-top: 5px solid #2380be;\n        border-radius: 100%\n    }\n\n    @keyframes rotation {\n        from {\n            transform: rotate(0deg)\n        }\n        to {\n            transform: rotate(359deg)\n        }\n    }\n";
function SpinnerPage(_ref) {
  var nonce = _ref.nonce;
  return node_node("html", null, node_node("head", null, node_node("title", null, "PayPal"), node_node("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  })), node_node("body", null, node_node("div", {
    class: "preloader spinner"
  }, node_node("style", {
    nonce: nonce,
    innerHTML: spinnerStyle
  }), node_node("div", {
    class: "spinWrap"
  }, node_node("p", {
    class: "spinnerImage"
  }), node_node("p", {
    class: "loader"
  })))));
}
// CONCATENATED MODULE: ./node_modules/@paypal/common-components/src/ui/index.js

// CONCATENATED MODULE: ./src/button/dom.js



function getButtons() {
  return querySelectorAll("[ " + DATA_ATTRIBUTES.FUNDING_SOURCE + " ]");
}
function getSelectedFunding(button) {
  var fundingSource = button.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
  var paymentMethodID = button.getAttribute(DATA_ATTRIBUTES.PAYMENT_METHOD_ID);
  var card = button.getAttribute(DATA_ATTRIBUTES.CARD); // $FlowFixMe

  return {
    fundingSource: fundingSource,
    card: card,
    paymentMethodID: paymentMethodID
  };
}
function enableLoadingSpinner(button) {
  button.classList.add(CLASS.LOADING);
}
function disableLoadingSpinner(button) {
  button.classList.remove(CLASS.LOADING);
}
function getNonce() {
  var nonce = '';

  if (document.body) {
    nonce = document.body.getAttribute('data-nonce') || '';
  }

  return nonce;
}
// CONCATENATED MODULE: ./src/ui/popup.jsx
/** @jsx node */





function openPopup(_ref) {
  var width = _ref.width,
      height = _ref.height;
  var win = assertSameDomain(popup('', {
    width: width,
    height: height
  }));
  var doc = win.document;
  var spinner = node_node(SpinnerPage, {
    nonce: getNonce()
  }).render(dom({
    doc: doc
  }));
  writeElementToWindow(win, spinner);
  return win;
}
// CONCATENATED MODULE: ./src/ui/index.js

// CONCATENATED MODULE: ./node_modules/preact/hooks/dist/hooks.module.js
var hooks_module_t,hooks_module_r,hooks_module_u=[],hooks_module_i=n.__r;n.__r=function(n){hooks_module_i&&hooks_module_i(n),hooks_module_t=0,(hooks_module_r=n.__c).__H&&(hooks_module_r.__H.t=hooks_module_w(hooks_module_r.__H.t))};var hooks_module_o=n.diffed;n.diffed=function(n){hooks_module_o&&hooks_module_o(n);var t=n.__c;if(t){var r=t.__H;r&&(r.u=hooks_module_w(r.u))}};var hooks_module_f=n.unmount;function hooks_module_c(t){n.__h&&n.__h(hooks_module_r);var u=hooks_module_r.__H||(hooks_module_r.__H={i:[],t:[],u:[]});return t>=u.i.length&&u.i.push({}),u.i[t]}function hooks_module_e(n){return hooks_module_a(q,n)}function hooks_module_a(n,u,i){var o=hooks_module_c(hooks_module_t++);return o.__c||(o.__c=hooks_module_r,o.o=[i?i(u):q(null,u),function(t){var r=n(o.o[0],t);o.o[0]!==r&&(o.o[0]=r,o.__c.setState({}))}]),o.o}function hooks_module_v(n,u){var i=hooks_module_c(hooks_module_t++);F(i.v,u)&&(i.o=n,i.v=u,hooks_module_r.__H.t.push(i),hooks_module_(hooks_module_r))}function hooks_module_m(n,u){var i=hooks_module_c(hooks_module_t++);F(i.v,u)&&(i.o=n,i.v=u,hooks_module_r.__H.u.push(i))}function hooks_module_p(n){return hooks_module_s(function(){return{current:n}},[])}function hooks_module_l(n,r,u){var i=hooks_module_c(hooks_module_t++);F(i.v,u)&&(i.v=u,n&&(n.current=r()))}function hooks_module_s(n,r){var u=hooks_module_c(hooks_module_t++);return F(u.v,r)?(u.v=r,u.m=n,u.o=n()):u.o}function hooks_module_d(n,t){return hooks_module_s(function(){return n},t)}function hooks_module_y(n){var u=hooks_module_r.context[n.__c];if(!u)return n.__p;var i=hooks_module_c(hooks_module_t++);return null==i.o&&(i.o=!0,u.sub(hooks_module_r)),u.props.value}function hooks_module_T(t,r){n.useDebugValue&&n.useDebugValue(r?r(t):t)}n.unmount=function(n){hooks_module_f&&hooks_module_f(n);var t=n.__c;if(t){var r=t.__H;r&&r.i.forEach(function(n){return n.p&&n.p()})}};var hooks_module_=function(){};function hooks_module_g(){hooks_module_u.some(function(n){n.l=!1,n.__P&&(n.__H.t=hooks_module_w(n.__H.t))}),hooks_module_u=[]}function hooks_module_w(n){return n.forEach(hooks_module_A),n.forEach(E),[]}function hooks_module_A(n){n.p&&n.p()}function E(n){var t=n.o();"function"==typeof t&&(n.p=t)}function F(n,t){return!n||t.some(function(t,r){return t!==n[r]})}function q(n,t){return"function"==typeof t?t(n):t}"undefined"!=typeof window&&(hooks_module_=function(t){!t.l&&(t.l=!0)&&1===hooks_module_u.push(t)&&(n.requestAnimationFrame||function(n){var t=function(){clearTimeout(r),cancelAnimationFrame(u),setTimeout(n)},r=setTimeout(t,100),u=requestAnimationFrame(t)})(hooks_module_g)});
//# sourceMappingURL=hooks.module.js.map

// CONCATENATED MODULE: ./src/menu/hooks.js


function useXProps() {
  var _useState = hooks_module_e(window.xprops),
      xprops = _useState[0],
      setXProps = _useState[1];

  hooks_module_v(function () {
    return xprops.onProps(function (newProps) {
      setXProps(_extends({}, newProps));
    });
  }, []);
  return _extends({}, xprops);
}
function useAutoFocus() {
  var ref = hooks_module_p();
  hooks_module_v(function () {
    ref.current.focus();
  });
  return ref;
}
// CONCATENATED MODULE: ./src/menu/menu.jsx
/** @jsx h */



function Menu(_ref) {
  var choices = _ref.choices,
      onChoose = _ref.onChoose,
      onBlur = _ref.onBlur,
      cspNonce = _ref.cspNonce,
      verticalOffset = _ref.verticalOffset;
  var autoFocus = useAutoFocus();

  var selectChoice = function selectChoice(choice) {
    var win;

    if (choice.popup) {
      win = openPopup({
        width: choice.popup.width,
        height: choice.popup.height
      });
    }

    return onChoose({
      id: choice.id,
      win: win
    });
  };

  return s(v, null, s("style", {
    nonce: cspNonce
  }, "\n                    .menu {\n                        width: 100%;\n                        z-index: 5000;\n                        background: white;\n                        border-radius: 3px;\n                        font-family: Helvetica, sans-serif;\n                        font-size: 14px;\n                        letter-spacing: 0.5px;\n                        box-shadow: 0px 0px 3px 1px rgba(222,222,222,1);\n                        outline-style: none;\n                        user-select: none;\n                        text-align: center;\n                        margin-top: " + verticalOffset + "px;\n                    }\n                    \n                    .menu-item {\n                        border-top: 2px solid rgba(230, 230, 230, 0.5);;\n                        padding: 14px 18px;\n                        color: #0070ba;\n                        cursor: pointer;\n                    }\n                    \n                    .menu-item:first-child {\n                        border-top: none;\n                    }\n                    \n                    .menu-item:hover {\n                        background: #fcfcfc;\n                        text-decoration: underline;\n                    }\n                "), s("div", {
    class: "menu",
    tabIndex: "0",
    onBlur: onBlur,
    ref: autoFocus
  }, choices.map(function (choice) {
    return s("div", {
      class: "menu-item",
      onClick: function onClick() {
        return selectChoice(choice);
      }
    }, choice.label);
  })));
}
// CONCATENATED MODULE: ./src/menu/page.jsx
/** @jsx h */





function Page(_ref) {
  var cspNonce = _ref.cspNonce;

  var _useXProps = useXProps(),
      choices = _useXProps.choices,
      onChoose = _useXProps.onChoose,
      verticalOffset = _useXProps.verticalOffset,
      hide = _useXProps.hide;

  if (!choices) {
    return null;
  }

  var onBlur = function onBlur() {
    hide();
  };

  return s(v, null, s("style", {
    nonce: cspNonce
  }, "\n                    * {\n                        box-sizing: border-box;\n                    }\n\n                    html, body {\n                        margin: 0;\n                        padding: 0;\n                    }\n\n                    body {\n                        padding: 5px 20px;\n                        display: inline-block;\n                        width: 100%;\n                    }\n                "), s(Menu, {
    choices: choices,
    onChoose: onChoose,
    onBlur: onBlur,
    cspNonce: cspNonce,
    verticalOffset: verticalOffset
  }));
}

function setupMenu(_ref2) {
  var cspNonce = _ref2.cspNonce;
  D(s(Page, {
    cspNonce: cspNonce
  }), getBody());
}
// CONCATENATED MODULE: ./src/menu/index.js
/* concated harmony reexport setupMenu */__webpack_require__.d(__webpack_exports__, "setupMenu", function() { return setupMenu; });


/***/ })
/******/ ]);
//# sourceMappingURL=smart-menu.js.map