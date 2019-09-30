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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _extends; });
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(0);

// CONCATENATED MODULE: ./src/loader/config.js
var config = {
  checkoutjs_url: 'https://www.paypalobjects.com/api/checkout{version}.js',
  major_version: '4',
  latest_version: 'latest',
  xcomponent: 'xcomponent',
  ppcheckout: 'ppcheckout',
  xchild_global: 'xchild',
  name_separator: '__',
  script_props: {
    'data-paypal-checkout': '',
    'data-no-bridge': '',
    'data-state': 'ppxo_checkout'
  }
};
// CONCATENATED MODULE: ./src/loader/responder.js
function responder() {
  var callbacks = [];
  var loaded = false;
  var err;
  var res;

  function flush() {
    if (loaded) {
      while (callbacks.length) {
        callbacks.shift()(err, res);
      }
    }
  }

  function respond(error, result) {
    loaded = true;
    err = error;
    res = result;
    flush();
  }

  function listen(callback) {
    callbacks.push(callback);
    flush();
  }

  return {
    respond: respond,
    listen: listen
  };
}
// CONCATENATED MODULE: ./src/loader/component.js

function isCheckoutXComponent() {
  if (window.name) {
    var seg = window.name.split(config.name_separator);

    if (seg[0] === config.xcomponent && seg[1] === config.ppcheckout) {
      return true;
    }
  }

  return false;
}
function getVersion() {
  if (!isCheckoutXComponent()) {
    throw new Error("Can not get version for non-zoid-component");
  }

  return window.name.split(config.name_separator)[2].replace(/_/g, '.');
}
function isLatest() {
  if (!isCheckoutXComponent()) {
    return false;
  }

  var version = getVersion();
  return Boolean(version === config.major_version || version === config.latest_version);
}
// CONCATENATED MODULE: ./src/loader/util.js
function loadScript(url, prop, attrs, callback) {
  if (window[prop]) {
    return callback(null, window[prop]);
  }

  var container = document.body || document.head;

  if (!container) {
    return callback(new Error("Can not find container to insert script into"));
  }

  var script = document.createElement('script');
  script.src = url;
  script.addEventListener('load', function () {
    if (!window[prop]) {
      return callback(new Error("Expected " + prop + " to be present on window"));
    }

    return callback(null, window[prop]);
  }); // $FlowFixMe

  script.addEventListener('error', function (err) {
    return callback(err);
  });

  for (var _i2 = 0, _Object$keys2 = Object.keys(attrs); _i2 < _Object$keys2.length; _i2++) {
    var attr = _Object$keys2[_i2];
    script.setAttribute(attr, attrs[attr]);
  }

  container.appendChild(script);
}
function warn() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var message = args.join(' ');

  if (window.console && window.console.warn) {
    window.console.warn(message);
  } else if (window.console && window.console.log) {
    window.console.log(message);
  }
}
function parseQuery(queryString) {
  if (queryString === void 0) {
    queryString = window.location.search;
  }

  var params = {};

  if (queryString && queryString.indexOf('?') === 0) {
    queryString = queryString.slice(1);
  }

  if (!queryString) {
    return params;
  }

  if (queryString.indexOf('=') === -1) {
    throw new Error("Can not parse query string params: " + queryString);
  }

  for (var _i4 = 0, _queryString$split2 = queryString.split('&'); _i4 < _queryString$split2.length; _i4++) {
    var pair = _queryString$split2[_i4];
    pair = pair.split('=');

    if (pair[0] && pair[1]) {
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
  }

  return params;
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

    if (typeof err.toString === 'function') {
      return err.toString();
    }

    return Object.prototype.toString.call(err);
  } catch (newErr) {
    // eslint-disable-line unicorn/catch-error-name
    return "Error while stringifying error: " + stringifyError(newErr, level + 1);
  }
}
// CONCATENATED MODULE: ./src/loader/load.js





var integrationResponder = responder();
function onLoadCheckoutIntegration(callback) {
  return integrationResponder.listen(callback);
}

function getIntegrationURLs() {
  return {
    latest: isLatest(),
    major: config.checkoutjs_url.replace('{version}', ''),
    minor: config.checkoutjs_url.replace('{version}', "." + getVersion())
  };
}

function getIntegrationProps() {
  var props = Object(esm_extends["a" /* default */])({}, config.script_props);

  var query = parseQuery();

  if (query.env) {
    props['data-env'] = query.env;
  }

  if (query.stage) {
    props['data-stage'] = query.stage;
  }

  return props;
}

function loadCheckoutIntegration(callback) {
  if (!isCheckoutXComponent()) {
    return callback(null, null);
  }

  var urls = getIntegrationURLs();
  var props = getIntegrationProps();
  loadScript(urls.latest ? urls.major : urls.minor, config.xchild_global, props, function (err, result) {
    if (err && !urls.latest) {
      return loadScript(urls.major + "?t=" + Date.now(), config.xchild_global, props, callback);
    }

    return callback(err, result);
  });
}

loadCheckoutIntegration(function (err, result) {
  if (err) {
    warn('Failed to load checkout.js', stringifyError(err));
  }

  if (err || result) {
    return integrationResponder.respond(err, result);
  }
});
// CONCATENATED MODULE: ./src/loader/interface.js
/* concated harmony reexport onLoadCheckoutIntegration */__webpack_require__.d(__webpack_exports__, "onLoadCheckoutIntegration", function() { return onLoadCheckoutIntegration; });
/* concated harmony reexport isCheckoutXComponent */__webpack_require__.d(__webpack_exports__, "isCheckoutXComponent", function() { return isCheckoutXComponent; });



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(0);

// CONCATENATED MODULE: ./src/lib/namespace.js

function extendNamespace(xports, namespaces, childnamespaces) {
  if (namespaces === void 0) {
    namespaces = [];
  }

  if (childnamespaces === void 0) {
    childnamespaces = [];
  }

  for (var _i2 = 0, _namespaces2 = namespaces; _i2 < _namespaces2.length; _i2++) {
    var name = _namespaces2[_i2];
    var namespace = window[name];

    if (!namespace) {
      continue;
    }

    for (var _i4 = 0, _childnamespaces2 = childnamespaces; _i4 < _childnamespaces2.length; _i4++) {
      var _extends2;

      var childname = _childnamespaces2[_i4];
      var childnamespace = xports[childname];

      if (namespace[childname]) {
        childnamespace = Object(esm_extends["a" /* default */])({}, namespace[childname], {}, childnamespace);
      }

      xports = Object(esm_extends["a" /* default */])({}, namespace, {}, xports, (_extends2 = {}, _extends2[childname] = childnamespace, _extends2));
    }
  }

  for (var _i6 = 0, _namespaces4 = namespaces; _i6 < _namespaces4.length; _i6++) {
    var _name = _namespaces4[_i6];
    window[_name] = xports;
  }

  return xports;
}
// CONCATENATED MODULE: ./src/loader/index.js


var _interface = __webpack_require__(1); // eslint-disable-line import/no-commonjs


extendNamespace(_interface, ['paypal']);

/***/ })
/******/ ]);
//# sourceMappingURL=checkout.child.loader.js.map