module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/buttons/template/componentTemplate.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/Base64/base64.js":
/***/ (function(module, exports, __webpack_require__) {

;(function () {

  var object =  true ? exports : typeof self != 'undefined' ? self : // #8: web workers
  $.global; // #31: ExtendScript

  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error();
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  object.btoa || (object.btoa = function (input) {
    var str = String(input);
    for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars, output = '';
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
      charCode = str.charCodeAt(idx += 3 / 4);
      if (charCode > 0xFF) {
        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      block = block << 8 | charCode;
    }
    return output;
  });

  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  object.atob || (object.atob = function (input) {
    var str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
    if (str.length % 4 == 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
    // and if not first of each 4 characters,
    // convert the first 8 bits to one ascii character
    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  });
})();

/***/ }),

/***/ "./node_modules/belter/src/css.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isPerc */
/* unused harmony export isPx */
/* unused harmony export toNum */
/* unused harmony export toPx */
/* unused harmony export toCSS */
/* unused harmony export percOf */
/* unused harmony export normalizeDimension */
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
        throw new Error('Could not match css value from ' + val);
    }

    return parseInt(match[1], 10);
}

function toPx(val) {
    return toNum(val) + 'px';
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
        throw new Error('Can not normalize dimension: ' + dim);
    }
}

/***/ }),

/***/ "./node_modules/belter/src/decorators.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export memoized */
/* unused harmony export promise */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/belter/src/util.js");


function memoized(target, name, descriptor) {
    descriptor.value = Object(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* memoize */])(descriptor.value, { name: name, thisNamespace: true });
}

function promise(target, name, descriptor) {
    descriptor.value = Object(__WEBPACK_IMPORTED_MODULE_0__util__["m" /* promisify */])(descriptor.value, { name: name });
}

/***/ }),

/***/ "./node_modules/belter/src/device.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getUserAgent */
/* harmony export (immutable) */ __webpack_exports__["a"] = isDevice;
/* unused harmony export isWebView */
/* unused harmony export isStandAlone */
/* unused harmony export isFacebookWebView */
/* unused harmony export isFirefoxIOS */
/* unused harmony export isEdgeIOS */
/* unused harmony export isOperaMini */
/* unused harmony export isAndroid */
/* unused harmony export isIos */
/* unused harmony export isGoogleSearchApp */
/* unused harmony export isQQBrowser */
/* unused harmony export isIosWebview */
/* unused harmony export isAndroidWebview */
/* unused harmony export isIE */
/* unused harmony export isIECompHeader */
/* unused harmony export isElectron */
/* unused harmony export isIEIntranet */
/* unused harmony export isMacOsCna */
/* unused harmony export supportsPopups */
function getUserAgent() {
    return window.navigator.mockUserAgent || window.navigator.userAgent;
}

function isDevice() {
    var userAgent = getUserAgent();
    if (userAgent.match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i)) {
        return true;
    }

    return false;
}

function isWebView() {
    var userAgent = getUserAgent();
    return (/(iPhone|iPod|iPad|Macintosh).*AppleWebKit(?!.*Safari)/i.test(userAgent) || /\bwv\b/.test(userAgent) || /Android.*Version\/(\d)\.(\d)/i.test(userAgent)
    );
}

function isStandAlone() {
    return window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
}

function isFacebookWebView() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserAgent();

    return ua.indexOf('FBAN') !== -1 || ua.indexOf('FBAV') !== -1;
}

function isFirefoxIOS() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserAgent();

    return (/FxiOS/i.test(ua)
    );
}

function isEdgeIOS() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserAgent();

    return (/EdgiOS/i.test(ua)
    );
}

function isOperaMini() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserAgent();

    return ua.indexOf('Opera Mini') > -1;
}

function isAndroid() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserAgent();

    return (/Android/.test(ua)
    );
}

function isIos() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserAgent();

    return (/iPhone|iPod|iPad/.test(ua)
    );
}

function isGoogleSearchApp() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserAgent();

    return (/\bGSA\b/.test(ua)
    );
}

function isQQBrowser() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserAgent();

    return (/QQBrowser/.test(ua)
    );
}

function isIosWebview() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserAgent();

    if (isIos(ua)) {
        if (isGoogleSearchApp(ua)) {
            return true;
        }
        return (/.+AppleWebKit(?!.*Safari)/.test(ua)
        );
    }
    return false;
}

function isAndroidWebview() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserAgent();

    if (isAndroid(ua)) {
        return (/Version\/[\d.]+/.test(ua) && !isOperaMini(ua)
        );
    }
    return false;
}

function isIE() {

    if (window.document.documentMode) {
        return true;
    }

    return Boolean(window.navigator && window.navigator.userAgent && /Edge|MSIE/i.test(window.navigator.userAgent));
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
    return (/Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent)
    );
}

function supportsPopups() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserAgent();

    return !(isIosWebview(ua) || isAndroidWebview(ua) || isOperaMini(ua) || isFirefoxIOS(ua) || isEdgeIOS(ua) || isFacebookWebView(ua) || isQQBrowser(ua) || isElectron() || isMacOsCna() || isStandAlone());
}

/***/ }),

/***/ "./node_modules/belter/src/dom.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/zalgo-promise/src/index.js + 4 modules
var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js");

// EXTERNAL MODULE: ./node_modules/cross-domain-utils/src/index.js
var cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");

// EXTERNAL MODULE: ./node_modules/cross-domain-safe-weakmap/src/index.js + 4 modules
var cross_domain_safe_weakmap_src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js");

// EXTERNAL MODULE: ./node_modules/belter/src/util.js
var util = __webpack_require__("./node_modules/belter/src/util.js");

// EXTERNAL MODULE: ./node_modules/belter/src/device.js
var device = __webpack_require__("./node_modules/belter/src/device.js");

// CONCATENATED MODULE: ./node_modules/belter/src/constants.js
var KEY_CODES = {
    ENTER: 13
};
// CONCATENATED MODULE: ./node_modules/belter/src/dom.js
/* unused harmony export isDocumentReady */
/* unused harmony export urlEncode */
/* unused harmony export waitForWindowReady */
/* unused harmony export waitForDocumentReady */
/* unused harmony export waitForDocumentBody */
/* unused harmony export parseQuery */
/* unused harmony export getQueryParam */
/* unused harmony export urlWillRedirectPage */
/* unused harmony export formatQuery */
/* unused harmony export extendQuery */
/* unused harmony export extendUrl */
/* unused harmony export redirect */
/* unused harmony export hasMetaViewPort */
/* unused harmony export isElementVisible */
/* unused harmony export enablePerformance */
/* unused harmony export getPageRenderTime */
/* unused harmony export htmlEncode */
/* harmony export (immutable) */ __webpack_exports__["e"] = isBrowser;
/* unused harmony export querySelectorAll */
/* unused harmony export onClick */
/* harmony export (immutable) */ __webpack_exports__["d"] = getScript;
/* harmony export (immutable) */ __webpack_exports__["f"] = isLocalStorageEnabled;
/* harmony export (immutable) */ __webpack_exports__["c"] = getBrowserLocales;
/* harmony export (immutable) */ __webpack_exports__["a"] = appendChild;
/* unused harmony export isElement */
/* unused harmony export getElementSafe */
/* unused harmony export getElement */
/* unused harmony export elementReady */
/* unused harmony export PopupOpenError */
/* unused harmony export popup */
/* harmony export (immutable) */ __webpack_exports__["i"] = writeToWindow;
/* harmony export (immutable) */ __webpack_exports__["h"] = writeElementToWindow;
/* harmony export (immutable) */ __webpack_exports__["g"] = setStyle;
/* unused harmony export awaitFrameLoad */
/* unused harmony export awaitFrameWindow */
/* unused harmony export createElement */
/* unused harmony export iframe */
/* unused harmony export addEventListener */
/* unused harmony export elementStoppedMoving */
/* unused harmony export getCurrentDimensions */
/* unused harmony export setOverflow */
/* unused harmony export trackDimensions */
/* unused harmony export onDimensionsChange */
/* unused harmony export dimensionsMatchViewport */
/* unused harmony export bindEvents */
/* unused harmony export setVendorCSS */
/* unused harmony export animate */
/* unused harmony export makeElementVisible */
/* unused harmony export makeElementInvisible */
/* unused harmony export showElement */
/* unused harmony export hideElement */
/* unused harmony export destroyElement */
/* unused harmony export showAndAnimate */
/* unused harmony export animateAndHide */
/* unused harmony export addClass */
/* unused harmony export removeClass */
/* unused harmony export isElementClosed */
/* unused harmony export watchElementForClose */
/* harmony export (immutable) */ __webpack_exports__["b"] = fixScripts;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint max-lines: off */










function isDocumentReady() {
    return Boolean(document.body) && document.readyState === 'complete';
}

function urlEncode(str) {
    return str.replace(/\?/g, '%3F').replace(/&/g, '%26').replace(/#/g, '%23').replace(/\+/g, '%2B');
}

function waitForWindowReady() {
    return Object(util["e" /* inlineMemoize */])(waitForWindowReady, function () {
        return new src["a" /* ZalgoPromise */](function (resolve) {
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
    return Object(util["e" /* inlineMemoize */])(waitForDocumentReady, function () {
        return new src["a" /* ZalgoPromise */](function (resolve) {

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
    return waitForDocumentReady.then(function () {
        if (document.body) {
            return document.body;
        }

        throw new Error('Document ready but document.body not present');
    });
}

function parseQuery(queryString) {
    return Object(util["e" /* inlineMemoize */])(parseQuery, function () {
        var params = {};

        if (!queryString) {
            return params;
        }

        if (queryString.indexOf('=') === -1) {
            return params;
        }

        for (var _i2 = 0, _queryString$split2 = queryString.split('&'), _length2 = _queryString$split2 == null ? 0 : _queryString$split2.length; _i2 < _length2; _i2++) {
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

function formatQuery() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    return Object.keys(obj).filter(function (key) {
        return typeof obj[key] === 'string';
    }).map(function (key) {
        return urlEncode(key) + '=' + urlEncode(obj[key]);
    }).join('&');
}

function extendQuery(originalQuery) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (!props || !Object.keys(props).length) {
        return originalQuery;
    }

    return formatQuery(_extends({}, parseQuery(originalQuery), props));
}

function extendUrl(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var query = options.query || {};
    var hash = options.hash || {};

    var originalUrl = void 0;
    var originalQuery = void 0;
    var originalHash = void 0;

    var _url$split = url.split('#');

    originalUrl = _url$split[0];
    originalHash = _url$split[1];

    var _originalUrl$split = originalUrl.split('?');

    originalUrl = _originalUrl$split[0];
    originalQuery = _originalUrl$split[1];


    var queryString = extendQuery(originalQuery, query);
    var hashString = extendQuery(originalHash, hash);

    if (queryString) {
        originalUrl = originalUrl + '?' + queryString;
    }

    if (hashString) {
        originalUrl = originalUrl + '#' + hashString;
    }

    return originalUrl;
}

function redirect(url) {
    var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

    return new src["a" /* ZalgoPromise */](function (resolve) {
        win.location = url;
        if (!urlWillRedirectPage(url)) {
            resolve();
        }
    });
}

function hasMetaViewPort() {
    var meta = document.querySelector('meta[name=viewport]');

    if (Object(device["a" /* isDevice */])() && window.screen.width < 660 && !meta) {
        return false;
    }

    return true;
}

function isElementVisible(el) {
    return Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

function enablePerformance() {
    return Object(util["e" /* inlineMemoize */])(enablePerformance, function () {
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

function htmlEncode() {
    var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return html.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\//g, '&#x2F;');
}

function isBrowser() {
    return typeof window !== 'undefined';
}

function querySelectorAll(selector) {
    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.document;

    return Array.prototype.slice.call(doc.querySelectorAll(selector));
}

function onClick(element, handler) {
    element.addEventListener('touchstart', util["h" /* noop */]);
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
        host = _ref$host === undefined ? window.location.host : _ref$host,
        path = _ref.path;

    return Object(util["e" /* inlineMemoize */])(getScript, function () {

        var url = '' + host + path;
        var scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));

        for (var _i4 = 0, _length4 = scripts == null ? 0 : scripts.length; _i4 < _length4; _i4++) {
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
    return Object(util["e" /* inlineMemoize */])(isLocalStorageEnabled, function () {
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
        } catch (err) {
            // pass
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
                _lang = _locale$split[0],
                _country = _locale$split[1];

            return { country: _country, lang: _lang };
        }

        if (locale && locale.match(/^[a-z]{2}$/)) {
            return { lang: locale };
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

    if (element !== null && (typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element.nodeType === 1 && _typeof(element.style) === 'object' && _typeof(element.ownerDocument) === 'object') {
        return true;
    }

    return false;
}

function getElementSafe(id) {

    if (isElement(id)) {
        // $FlowFixMe
        return id;
    }

    if (typeof id === 'string') {
        var element = document.getElementById(id);

        if (element) {
            return element;
        }

        if (document.querySelector) {
            element = document.querySelector(id);
        }

        if (element) {
            return element;
        }
    }
}

function getElement(id) {

    var element = getElementSafe(id);

    if (element) {
        return element;
    }

    throw new Error('Can not find element: ' + Object(util["q" /* stringify */])(id));
}

function elementReady(id) {
    return new src["a" /* ZalgoPromise */](function (resolve, reject) {

        var name = Object(util["q" /* stringify */])(id);
        var el = getElementSafe(id);

        if (el) {
            return resolve(el);
        }

        if (isDocumentReady()) {
            return reject(new Error('Document is ready and element ' + name + ' does not exist'));
        }

        var interval = setInterval(function () {

            el = getElementSafe(id);

            if (el) {
                clearInterval(interval);
                return resolve(el);
            }

            if (isDocumentReady()) {
                clearInterval(interval);
                return reject(new Error('Document is ready and element ' + name + ' does not exist'));
            }
        }, 10);
    });
}

function PopupOpenError(message) {
    this.message = message;
}

PopupOpenError.prototype = Object.create(Error.prototype);

function popup(url, options) {

    // eslint-disable-next-line array-callback-return
    var params = Object.keys(options).map(function (key) {
        if (options[key]) {
            return key + '=' + Object(util["q" /* stringify */])(options[key]);
        }
    }).filter(Boolean).join(',');

    var win = void 0;

    try {
        win = window.open(url, options.name, params, true);
    } catch (err) {
        throw new PopupOpenError('Can not open popup window - ' + (err.stack || err.message));
    }

    if (Object(cross_domain_utils_src["isWindowClosed"])(win)) {
        var err = new PopupOpenError('Can not open popup window - blocked');
        throw err;
    }

    return win;
}

function writeToWindow(win, html) {
    try {
        win.document.open();
        win.document.write(html);
        win.document.close();
    } catch (err) {
        try {
            win.location = 'javascript: document.open(); document.write(' + JSON.stringify(html) + '); document.close();';
        } catch (err2) {
            // pass
        }
    }
}

function writeElementToWindow(win, el) {

    var tag = el.tagName.toLowerCase();

    if (tag !== 'html') {
        throw new Error('Expected element to be html, got ' + tag);
    }

    var documentElement = win.document.documentElement;

    while (documentElement.children && documentElement.children.length) {
        documentElement.removeChild(documentElement.children[0]);
    }

    while (el.children.length) {
        documentElement.appendChild(el.children[0]);
    }
}

function setStyle(el, styleText) {
    var doc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.document;

    // $FlowFixMe
    if (el.styleSheet) {
        // $FlowFixMe
        el.styleSheet.cssText = styleText;
    } else {
        el.appendChild(doc.createTextNode(styleText));
    }
}

var awaitFrameLoadPromises = void 0;

function awaitFrameLoad(frame) {
    awaitFrameLoadPromises = awaitFrameLoadPromises || new cross_domain_safe_weakmap_src["a" /* WeakMap */]();

    if (awaitFrameLoadPromises.has(frame)) {
        var _promise = awaitFrameLoadPromises.get(frame);
        if (_promise) {
            return _promise;
        }
    }

    var promise = new src["a" /* ZalgoPromise */](function (resolve, reject) {
        frame.addEventListener('load', function () {
            Object(cross_domain_utils_src["linkFrameWindow"])(frame);
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

    if (frame.contentWindow) {
        return src["a" /* ZalgoPromise */].resolve(frame.contentWindow);
    }

    return awaitFrameLoad(frame).then(function (loadedFrame) {

        if (!loadedFrame.contentWindow) {
            throw new Error('Could not find window in iframe');
        }

        return loadedFrame.contentWindow;
    });
}

function createElement() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var container = arguments[2];


    tag = tag.toLowerCase();
    var element = document.createElement(tag);

    if (options.style) {
        Object(util["c" /* extend */])(element.style, options.style);
    }

    if (options['class']) {
        element.className = options['class'].join(' ');
    }

    if (options.attributes) {
        for (var _i6 = 0, _Object$keys2 = Object.keys(options.attributes), _length6 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i6 < _length6; _i6++) {
            var key = _Object$keys2[_i6];
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
                throw new Error('Iframe html can not be written unless container provided and iframe in DOM');
            }

            // $FlowFixMe
            writeToWindow(element.contentWindow, options.html);
        } else {
            element.innerHTML = options.html;
        }
    }

    return element;
}

function iframe() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var container = arguments[1];


    var el = getElement(container);

    var attributes = options.attributes || {};
    var style = options.style || {};

    var frame = createElement('iframe', {
        attributes: _extends({
            frameBorder: '0',
            allowTransparency: 'true'
        }, attributes),
        style: _extends({
            backgroundColor: 'transparent'
        }, style),
        html: options.html,
        'class': options['class']
    });

    // $FlowFixMe
    awaitFrameLoad(frame);

    el.appendChild(frame);

    if (options.url || window.navigator.userAgent.match(/MSIE|Edge/i)) {
        frame.setAttribute('src', options.url || 'about:blank');
    }

    // $FlowFixMe
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

function elementStoppedMoving(element) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;

    return new src["a" /* ZalgoPromise */](function (resolve, reject) {
        var el = getElement(element);

        var start = el.getBoundingClientRect();

        var interval = void 0;
        var timer = void 0;

        interval = setInterval(function () {
            var end = el.getBoundingClientRect();

            if (start.top === end.top && start.bottom === end.bottom && start.left === end.left && start.right === end.right && start.width === end.width && start.height === end.height) {
                clearTimeout(timer);
                clearInterval(interval);
                return resolve();
            }

            start = end;
        }, 50);

        timer = setTimeout(function () {
            clearInterval(interval);
            reject(new Error('Timed out waiting for element to stop animating after ' + timeout + 'ms'));
        }, timeout);
    });
}

function getCurrentDimensions(el) {
    return {
        width: el.offsetWidth,
        height: el.offsetHeight
    };
}

function setOverflow(el) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
    var _el$style = el.style,
        overflow = _el$style.overflow,
        overflowX = _el$style.overflowX,
        overflowY = _el$style.overflowY;


    el.style.overflow = el.style.overflowX = el.style.overflowY = value;

    return {
        reset: function reset() {
            el.style.overflow = overflow;
            el.style.overflowX = overflowX;
            el.style.overflowY = overflowY;
        }
    };
}

function dimensionsDiff(one, two, _ref2) {
    var _ref2$width = _ref2.width,
        width = _ref2$width === undefined ? true : _ref2$width,
        _ref2$height = _ref2.height,
        height = _ref2$height === undefined ? true : _ref2$height,
        _ref2$threshold = _ref2.threshold,
        threshold = _ref2$threshold === undefined ? 0 : _ref2$threshold;


    if (width && Math.abs(one.width - two.width) > threshold) {
        return true;
    }

    if (height && Math.abs(one.height - two.height) > threshold) {
        return true;
    }

    return false;
}

function trackDimensions(el, _ref3) {
    var _ref3$width = _ref3.width,
        width = _ref3$width === undefined ? true : _ref3$width,
        _ref3$height = _ref3.height,
        height = _ref3$height === undefined ? true : _ref3$height,
        _ref3$threshold = _ref3.threshold,
        threshold = _ref3$threshold === undefined ? 0 : _ref3$threshold;


    var currentDimensions = getCurrentDimensions(el);

    return {
        check: function check() {
            var newDimensions = getCurrentDimensions(el);

            return {
                changed: dimensionsDiff(currentDimensions, newDimensions, { width: width, height: height, threshold: threshold }),
                dimensions: newDimensions
            };
        },
        reset: function reset() {
            currentDimensions = getCurrentDimensions(el);
        }
    };
}

function onDimensionsChange(el, _ref4) {
    var _ref4$width = _ref4.width,
        width = _ref4$width === undefined ? true : _ref4$width,
        _ref4$height = _ref4.height,
        height = _ref4$height === undefined ? true : _ref4$height,
        _ref4$delay = _ref4.delay,
        delay = _ref4$delay === undefined ? 50 : _ref4$delay,
        _ref4$threshold = _ref4.threshold,
        threshold = _ref4$threshold === undefined ? 0 : _ref4$threshold;


    return new src["a" /* ZalgoPromise */](function (resolve) {

        var tracker = trackDimensions(el, { width: width, height: height, threshold: threshold });

        var interval = void 0;

        var resolver = Object(util["b" /* debounce */])(function (dimensions) {
            clearInterval(interval);
            return resolve(dimensions);
        }, delay * 4);

        interval = setInterval(function () {
            var _tracker$check = tracker.check(),
                changed = _tracker$check.changed,
                dimensions = _tracker$check.dimensions;

            if (changed) {
                tracker.reset();
                return resolver(dimensions);
            }
        }, delay);

        function onWindowResize() {
            var _tracker$check2 = tracker.check(),
                changed = _tracker$check2.changed,
                dimensions = _tracker$check2.dimensions;

            if (changed) {
                tracker.reset();
                window.removeEventListener('resize', onWindowResize);
                resolver(dimensions);
            }
        }

        window.addEventListener('resize', onWindowResize);
    });
}

function dimensionsMatchViewport(el, _ref5) {
    var width = _ref5.width,
        height = _ref5.height;


    var dimensions = getCurrentDimensions(el);

    if (width && dimensions.width !== window.innerWidth) {
        return false;
    }

    if (height && dimensions.height !== window.innerHeight) {
        return false;
    }

    return true;
}

function bindEvents(element, eventNames, handler) {

    handler = Object(util["j" /* once */])(handler);

    for (var _i8 = 0, _length8 = eventNames == null ? 0 : eventNames.length; _i8 < _length8; _i8++) {
        var eventName = eventNames[_i8];
        element.addEventListener(eventName, handler);
    }

    return {
        cancel: Object(util["j" /* once */])(function () {
            for (var _i10 = 0, _length10 = eventNames == null ? 0 : eventNames.length; _i10 < _length10; _i10++) {
                var _eventName = eventNames[_i10];
                element.removeEventListener(_eventName, handler);
            }
        })
    };
}

var VENDOR_PREFIXES = ['webkit', 'moz', 'ms', 'o'];

function setVendorCSS(element, name, value) {

    // $FlowFixMe
    element.style[name] = value;

    var capitalizedName = Object(util["a" /* capitalizeFirstLetter */])(name);

    for (var _i12 = 0, _length12 = VENDOR_PREFIXES == null ? 0 : VENDOR_PREFIXES.length; _i12 < _length12; _i12++) {
        var prefix = VENDOR_PREFIXES[_i12];
        // $FlowFixMe
        element.style['' + prefix + capitalizedName] = value;
    }
}

function isValidAnimation(element, name) {

    var CSSRule = window.CSSRule;

    var KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.MOZ_KEYFRAMES_RULE || CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE;

    var stylesheets = element.ownerDocument.styleSheets;

    try {
        for (var i = 0; i < stylesheets.length; i++) {

            // $FlowFixMe
            var cssRules = stylesheets[i].cssRules;

            if (!cssRules) {
                continue;
            }

            for (var j = 0; j < cssRules.length; j++) {

                var cssRule = cssRules[j];

                if (!cssRule) {
                    continue;
                }

                if (cssRule.type === KEYFRAMES_RULE && cssRule.name === name) {
                    return true;
                }
            }
        }
    } catch (err) {

        return false;
    }

    return false;
}

var ANIMATION_START_EVENTS = ['animationstart', 'webkitAnimationStart', 'oAnimationStart', 'MSAnimationStart'];
var ANIMATION_END_EVENTS = ['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd'];

function animate(element, name, clean) {
    var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

    return new src["a" /* ZalgoPromise */](function (resolve, reject) {

        var el = getElement(element);

        if (!el || !isValidAnimation(el, name)) {
            return resolve();
        }

        var hasStarted = false;

        var startTimeout = void 0;
        var endTimeout = void 0;
        var startEvent = void 0;
        var endEvent = void 0;

        function cleanUp() {
            setVendorCSS(el, 'animationName', '');
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

            cleanUp();

            // $FlowFixMe
            if (typeof event.animationName === 'string' && event.animationName !== name) {
                return reject('Expected animation name to be ' + name + ', found ' + event.animationName);
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
    if (element.parentNode) {
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
    if (element.classList) {
        element.classList.add(name);
    } else if (element.className.split(/\s+/).indexOf(name) === -1) {
        element.className += ' ' + name;
    }
}

function removeClass(element, name) {
    if (element.classList) {
        element.classList.remove(name);
    } else if (element.className.split(/\s+/).indexOf(name) !== -1) {
        element.className = element.className.replace(name, '');
    }
}

function isElementClosed(el) {
    if (!el || !el.parentNode) {
        return true;
    }
    return false;
}

function watchElementForClose(element, handler) {
    handler = Object(util["j" /* once */])(handler);

    var interval = void 0;

    if (isElementClosed(element)) {
        handler();
    } else {
        interval = Object(util["p" /* safeInterval */])(function () {
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

function fixScripts(el) {
    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.document;

    for (var _i14 = 0, _querySelectorAll2 = querySelectorAll('script', el), _length14 = _querySelectorAll2 == null ? 0 : _querySelectorAll2.length; _i14 < _length14; _i14++) {
        var script = _querySelectorAll2[_i14];
        var parentNode = script.parentNode;

        if (!parentNode) {
            continue;
        }

        var newScript = doc.createElement('script');
        newScript.text = script.textContent;
        parentNode.replaceChild(newScript, script);
    }
}

/***/ }),

/***/ "./node_modules/belter/src/experiment.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export experiment */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/belter/src/util.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage__ = __webpack_require__("./node_modules/belter/src/storage.js");



function getBelterExperimentStorage() {
    return Object(__WEBPACK_IMPORTED_MODULE_1__storage__["a" /* getStorage */])({ name: 'belter_experiment' });
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
        sample = _ref$sample === undefined ? 50 : _ref$sample,
        _ref$logTreatment = _ref.logTreatment,
        logTreatment = _ref$logTreatment === undefined ? __WEBPACK_IMPORTED_MODULE_0__util__["h" /* noop */] : _ref$logTreatment,
        _ref$logCheckpoint = _ref.logCheckpoint,
        logCheckpoint = _ref$logCheckpoint === undefined ? __WEBPACK_IMPORTED_MODULE_0__util__["h" /* noop */] : _ref$logCheckpoint;


    var throttle = getThrottlePercentile(name);

    var group = void 0;

    if (throttle < sample) {
        group = THROTTLE_GROUP.TEST;
    } else if (sample >= 50 || sample <= throttle && throttle < sample * 2) {
        group = THROTTLE_GROUP.CONTROL;
    } else {
        group = THROTTLE_GROUP.THROTTLE;
    }

    var treatment = name + '_' + group;

    var started = false;
    var forced = false;

    try {
        if (window.localStorage && window.localStorage.getItem(name)) {
            forced = true;
        }
    } catch (err) {
        // pass
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
        log: function log(checkpoint) {
            var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (!started) {
                return this;
            }

            if (isEventUnique(name + '_' + treatment)) {
                logTreatment({ name: name, treatment: treatment });
            }

            if (isEventUnique(name + '_' + treatment + '_' + checkpoint)) {
                logCheckpoint({ name: name, treatment: treatment, checkpoint: checkpoint, payload: payload });
            }

            return this;
        },
        logStart: function logStart() {
            var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            started = true;
            return this.log('start', payload);
        },
        logComplete: function logComplete() {
            var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return this.log('complete', payload);
        }
    };
}

/***/ }),

/***/ "./node_modules/belter/src/global.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getGlobalNameSpace */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/belter/src/util.js");


function getGlobalNameSpace(_ref) {
    var name = _ref.name,
        _ref$version = _ref.version,
        version = _ref$version === undefined ? 'latest' : _ref$version;


    var global = Object(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* getGlobal */])();
    var globalKey = '__' + name + '__' + version + '_global__';

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

/***/ }),

/***/ "./node_modules/belter/src/http.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = request;
/* unused harmony export addHeaderBuilder */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__("./node_modules/zalgo-promise/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");



var HEADERS = {
    CONTENT_TYPE: 'content-type',
    ACCEPT: 'accept'
};

var headerBuilders = [];

function parseHeaders() {
    var rawHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var result = {};

    for (var _i2 = 0, _rawHeaders$trim$spli2 = rawHeaders.trim().split('\n'), _length2 = _rawHeaders$trim$spli2 == null ? 0 : _rawHeaders$trim$spli2.length; _i2 < _length2; _i2++) {
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
        method = _ref$method === undefined ? 'get' : _ref$method,
        _ref$headers = _ref.headers,
        headers = _ref$headers === undefined ? {} : _ref$headers,
        json = _ref.json,
        data = _ref.data,
        body = _ref.body,
        _ref$win = _ref.win,
        win = _ref$win === undefined ? window : _ref$win,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

    return new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__["a" /* ZalgoPromise */](function (resolve, reject) {

        if (json && data || json && body || data && json) {
            throw new Error('Only options.json or options.data or options.body should be passed');
        }

        var normalizedHeaders = {};

        for (var _i4 = 0, _Object$keys2 = Object.keys(headers), _length4 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
            var _key2 = _Object$keys2[_i4];
            normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
        }

        if (json) {
            normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || 'application/json';
        } else if (data || body) {
            normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || 'application/x-www-form-urlencoded; charset=utf-8';
        }

        normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || 'application/json';

        for (var _i6 = 0, _length6 = headerBuilders == null ? 0 : headerBuilders.length; _i6 < _length6; _i6++) {
            var headerBuilder = headerBuilders[_i6];
            var builtHeaders = headerBuilder();

            for (var _i8 = 0, _Object$keys4 = Object.keys(builtHeaders), _length8 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i8 < _length8; _i8++) {
                var _key3 = _Object$keys4[_i8];
                normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
            }
        }

        var xhr = new win.XMLHttpRequest();

        xhr.addEventListener('load', function xhrLoad() {

            var responseHeaders = parseHeaders(this.getAllResponseHeaders());

            if (!this.status) {
                return reject(new Error('Request to ' + method.toLowerCase() + ' ' + url + ' failed: no response status code.'));
            }

            var contentType = responseHeaders['content-type'];
            var isJSON = contentType && (contentType.indexOf('application/json') === 0 || contentType.indexOf('text/json') === 0);
            var responseBody = this.responseText;

            try {
                responseBody = JSON.parse(responseBody);
            } catch (err) {
                if (isJSON) {
                    return reject(new Error('Invalid json: ' + this.responseText + '.'));
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
            reject(new Error('Request to ' + method.toLowerCase() + ' ' + url + ' failed: ' + evt.toString() + '.'));
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
                return encodeURIComponent(key) + '=' + (data ? encodeURIComponent(data[key]) : '');
            }).join('&');
        }

        xhr.timeout = timeout;
        xhr.ontimeout = function xhrTimeout() {
            reject(new Error('Request to ' + method.toLowerCase() + ' ' + url + ' has timed out'));
        };

        xhr.send(body);
    });
}

function addHeaderBuilder(method) {
    headerBuilders.push(method);
}

/***/ }),

/***/ "./node_modules/belter/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__device__ = __webpack_require__("./node_modules/belter/src/device.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__("./node_modules/belter/src/dom.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "getBrowserLocales", function() { return __WEBPACK_IMPORTED_MODULE_1__dom__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "getScript", function() { return __WEBPACK_IMPORTED_MODULE_1__dom__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "isBrowser", function() { return __WEBPACK_IMPORTED_MODULE_1__dom__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__experiment__ = __webpack_require__("./node_modules/belter/src/experiment.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__("./node_modules/belter/src/global.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__jsx__ = __webpack_require__("./node_modules/belter/src/jsx.jsx");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return __WEBPACK_IMPORTED_MODULE_4__jsx__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SVG", function() { return __WEBPACK_IMPORTED_MODULE_4__jsx__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "jsxToHTML", function() { return __WEBPACK_IMPORTED_MODULE_4__jsx__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "placeholderToJSX", function() { return __WEBPACK_IMPORTED_MODULE_4__jsx__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage__ = __webpack_require__("./node_modules/belter/src/storage.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "getStorage", function() { return __WEBPACK_IMPORTED_MODULE_5__storage__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__("./node_modules/belter/src/util.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "inlineMemoize", function() { return __WEBPACK_IMPORTED_MODULE_6__util__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "max", function() { return __WEBPACK_IMPORTED_MODULE_6__util__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return __WEBPACK_IMPORTED_MODULE_6__util__["h"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "objFilter", function() { return __WEBPACK_IMPORTED_MODULE_6__util__["i"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "perc", function() { return __WEBPACK_IMPORTED_MODULE_6__util__["k"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "promiseDebounce", function() { return __WEBPACK_IMPORTED_MODULE_6__util__["l"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "safeInterval", function() { return __WEBPACK_IMPORTED_MODULE_6__util__["p"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "stringifyError", function() { return __WEBPACK_IMPORTED_MODULE_6__util__["r"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "stringifyErrorMessage", function() { return __WEBPACK_IMPORTED_MODULE_6__util__["s"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "uniqueID", function() { return __WEBPACK_IMPORTED_MODULE_6__util__["u"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "values", function() { return __WEBPACK_IMPORTED_MODULE_6__util__["v"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__http__ = __webpack_require__("./node_modules/belter/src/http.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "request", function() { return __WEBPACK_IMPORTED_MODULE_7__http__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__types__ = __webpack_require__("./node_modules/belter/src/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__types__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__decorators__ = __webpack_require__("./node_modules/belter/src/decorators.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__css__ = __webpack_require__("./node_modules/belter/src/css.js");
/* unused harmony namespace reexport */












/***/ }),

/***/ "./node_modules/belter/src/jsx.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export JsxHTMLNode */
/* unused harmony export JsxHTMLNodeContainer */
/* harmony export (immutable) */ __webpack_exports__["c"] = jsxToHTML;
/* unused harmony export jsxRender */
/* harmony export (immutable) */ __webpack_exports__["a"] = Fragment;
/* harmony export (immutable) */ __webpack_exports__["b"] = SVG;
/* harmony export (immutable) */ __webpack_exports__["d"] = placeholderToJSX;
/* unused harmony export jsxDom */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/belter/src/util.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__("./node_modules/belter/src/dom.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* @jsx jsxToHTML */




var JSX_EVENTS = {
    onClick: 'click'
};

// eslint-disable-next-line no-use-before-define


function htmlEncode() {
    var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return html.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\//g, '&#x2F;');
}

var JsxHTMLNode = function () {
    function JsxHTMLNode(name, props, children) {
        _classCallCheck(this, JsxHTMLNode);

        this.name = name;
        this.props = props;
        this.children = children;
    }

    JsxHTMLNode.prototype.toString = function toString() {
        var name = this.name;
        var props = this.propsToString();
        var children = this.childrenToString();

        return '<' + name + (props ? ' ' : '') + props + '>' + children + '</' + name + '>';
    };

    JsxHTMLNode.prototype.propsToString = function propsToString() {
        var props = this.props;

        if (!props) {
            return '';
        }

        return Object.keys(props).filter(function (key) {
            return key !== 'innerHTML' && props && props[key] !== false;
        }).map(function (key) {
            if (props) {
                var val = props[key];

                if (val === true) {
                    return '' + htmlEncode(key);
                }

                if (typeof val === 'string') {
                    return htmlEncode(key) + '="' + htmlEncode(val) + '"';
                }
            }
            return '';
        }).filter(Boolean).join(' ');
    };

    JsxHTMLNode.prototype.childrenToString = function childrenToString() {

        if (this.props && this.props.innerHTML) {
            return this.props.innerHTML;
        }

        if (!this.children) {
            return '';
        }

        var result = '';

        function iterate(children) {
            for (var _i2 = 0, _length2 = children == null ? 0 : children.length; _i2 < _length2; _i2++) {
                var child = children[_i2];

                if (child === null || child === undefined) {
                    continue;
                }

                if (Array.isArray(child)) {
                    iterate(child);
                } else if (child instanceof JsxHTMLNode) {
                    result += child.toString();
                } else {
                    result += htmlEncode(child);
                }
            }
        }

        iterate(this.children);

        return result;
    };

    return JsxHTMLNode;
}();

var JsxHTMLNodeContainer = function (_JsxHTMLNode) {
    _inherits(JsxHTMLNodeContainer, _JsxHTMLNode);

    function JsxHTMLNodeContainer(children) {
        _classCallCheck(this, JsxHTMLNodeContainer);

        return _possibleConstructorReturn(this, _JsxHTMLNode.call(this, '', {}, children));
    }

    JsxHTMLNodeContainer.prototype.toString = function toString() {
        return this.childrenToString();
    };

    return JsxHTMLNodeContainer;
}(JsxHTMLNode);

function jsxToHTML(element) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    if (typeof element === 'string') {
        return new JsxHTMLNode(element, props, children);
    }

    if (typeof element === 'function') {
        return element(props, children);
    }

    throw new TypeError('Expected jsx Element to be a string or a function');
}

function jsxRender(template, renderers) {

    // eslint-disable-next-line security/detect-unsafe-regex
    var nodes = Object(__WEBPACK_IMPORTED_MODULE_0__util__["n" /* regexMap */])(template, /\{\s*([a-z]+)(?::\s*([^} ]+))?\s*\}|([^${}]+)/g, function (match, type, value, text) {
        if (type) {
            if (!renderers[type]) {
                throw new Error('Can not render type: ' + type);
            }

            return renderers[type](value);
        } else if (text && text.trim()) {

            if (!renderers.text) {
                return text;
            }

            if (/<br>/.test(text)) {
                return renderers['break'](text);
            } else {
                return renderers.text(text);
            }
        } else {
            return text;
        }
    });

    return new JsxHTMLNodeContainer(nodes);
}

function Fragment(props, children) {
    return new JsxHTMLNodeContainer(children);
}

function SVG(props) {
    var svg = props.svg,
        otherProps = _objectWithoutProperties(props, ['svg']);

    if (!svg) {
        throw new TypeError('Expected svg prop');
    }

    if (typeof svg !== 'string' && !(svg instanceof JsxHTMLNode)) {
        throw new TypeError('Expected svg prop to be a string or jsx html node');
    }

    return jsxToHTML('img', _extends({ src: Object(__WEBPACK_IMPORTED_MODULE_0__util__["t" /* svgToBase64 */])(svg.toString()) }, otherProps));
}

function placeholderToJSX(text, placeholders) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__util__["o" /* regexTokenize */])(text, /(\{[a-z]+\})|([^{}]+)/g).map(function (token) {
        var match = token.match(/^{([a-z]+)}$/);
        if (match) {
            return placeholders[match[1]]();
        } else if (placeholders.text) {
            return placeholders.text(token);
        } else {
            return token;
        }
    });
}

function jsxDom(element, props) {
    for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        children[_key2 - 2] = arguments[_key2];
    }

    if (typeof element === 'function') {
        return element(props, children);
    }

    var name = element.toLowerCase();

    var doc = this && this.createElement ? this : window.document;

    var el = doc.createElement(name);

    for (var prop in props) {
        if (prop in JSX_EVENTS) {
            el.addEventListener(JSX_EVENTS[prop], props[prop]);
        } else if (prop === 'innerHTML') {
            el.innerHTML = props[prop];
            Object(__WEBPACK_IMPORTED_MODULE_1__dom__["b" /* fixScripts */])(el, doc);
        } else {
            el.setAttribute(prop, props[prop]);
        }
    }

    var content = children[0],
        remaining = children.slice(1);


    if (name === 'style') {

        if (typeof content !== 'string') {
            throw new TypeError('Expected ' + name + ' tag content to be string, got ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)));
        }

        if (remaining.length) {
            throw new Error('Expected only text content for ' + name + ' tag');
        }

        Object(__WEBPACK_IMPORTED_MODULE_1__dom__["g" /* setStyle */])(el, content, doc);
    } else if (name === 'iframe') {

        if (remaining.length) {
            throw new Error('Expected only single child node for iframe');
        }

        el.addEventListener('load', function () {
            var win = el.contentWindow;

            if (!win) {
                throw new Error('Expected frame to have contentWindow');
            }

            if (typeof content === 'string') {
                Object(__WEBPACK_IMPORTED_MODULE_1__dom__["i" /* writeToWindow */])(win, content);
            } else {
                Object(__WEBPACK_IMPORTED_MODULE_1__dom__["h" /* writeElementToWindow */])(win, content);
            }
        });
    } else if (name === 'script') {

        if (typeof content !== 'string') {
            throw new TypeError('Expected ' + name + ' tag content to be string, got ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)));
        }

        if (remaining.length) {
            throw new Error('Expected only text content for ' + name + ' tag');
        }

        el.text = content;
    } else {
        for (var i = 0; i < children.length; i++) {
            if (typeof children[i] === 'string') {
                var textNode = doc.createTextNode(children[i]);
                Object(__WEBPACK_IMPORTED_MODULE_1__dom__["a" /* appendChild */])(el, textNode);
            } else {
                Object(__WEBPACK_IMPORTED_MODULE_1__dom__["a" /* appendChild */])(el, children[i]);
            }
        }
    }

    return el;
}

/***/ }),

/***/ "./node_modules/belter/src/storage.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getStorage;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/belter/src/util.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__("./node_modules/belter/src/dom.js");



function getStorage(_ref) {
    var name = _ref.name,
        _ref$version = _ref.version,
        version = _ref$version === undefined ? 'latest' : _ref$version,
        _ref$lifetime = _ref.lifetime,
        lifetime = _ref$lifetime === undefined ? 5 * 60 * 1000 : _ref$lifetime;

    return Object(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* inlineMemoize */])(getStorage, function () {
        var STORAGE_KEY = '__' + name + '_' + version + '_storage__';

        var accessedStorage = void 0;

        function getState(handler) {

            var localStorageEnabled = Object(__WEBPACK_IMPORTED_MODULE_1__dom__["f" /* isLocalStorageEnabled */])();
            var storage = void 0;

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
                storage = Object(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* getGlobal */])()[STORAGE_KEY];
            }

            if (!storage) {
                storage = {
                    id: Object(__WEBPACK_IMPORTED_MODULE_0__util__["u" /* uniqueID */])()
                };
            }

            if (!storage.id) {
                storage.id = Object(__WEBPACK_IMPORTED_MODULE_0__util__["u" /* uniqueID */])();
            }

            accessedStorage = storage;

            var result = handler(storage);

            if (localStorageEnabled) {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
            } else {
                Object(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* getGlobal */])()[STORAGE_KEY] = storage;
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
                        guid: Object(__WEBPACK_IMPORTED_MODULE_0__util__["u" /* uniqueID */])(),
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
    }, [{ name: name, version: version, lifetime: lifetime }]);
}

/***/ }),

/***/ "./node_modules/belter/src/types.js":
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/belter/src/util.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export base64encode */
/* unused harmony export base64decode */
/* harmony export (immutable) */ __webpack_exports__["u"] = uniqueID;
/* harmony export (immutable) */ __webpack_exports__["d"] = getGlobal;
/* unused harmony export getObjectID */
/* harmony export (immutable) */ __webpack_exports__["g"] = memoize;
/* harmony export (immutable) */ __webpack_exports__["m"] = promisify;
/* harmony export (immutable) */ __webpack_exports__["e"] = inlineMemoize;
/* harmony export (immutable) */ __webpack_exports__["h"] = noop;
/* harmony export (immutable) */ __webpack_exports__["j"] = once;
/* unused harmony export hashStr */
/* unused harmony export strHashStr */
/* unused harmony export match */
/* unused harmony export awaitKey */
/* harmony export (immutable) */ __webpack_exports__["r"] = stringifyError;
/* harmony export (immutable) */ __webpack_exports__["s"] = stringifyErrorMessage;
/* harmony export (immutable) */ __webpack_exports__["q"] = stringify;
/* unused harmony export domainMatches */
/* unused harmony export patchMethod */
/* harmony export (immutable) */ __webpack_exports__["c"] = extend;
/* harmony export (immutable) */ __webpack_exports__["v"] = values;
/* harmony export (immutable) */ __webpack_exports__["k"] = perc;
/* unused harmony export min */
/* harmony export (immutable) */ __webpack_exports__["f"] = max;
/* harmony export (immutable) */ __webpack_exports__["n"] = regexMap;
/* harmony export (immutable) */ __webpack_exports__["t"] = svgToBase64;
/* harmony export (immutable) */ __webpack_exports__["i"] = objFilter;
/* unused harmony export identity */
/* harmony export (immutable) */ __webpack_exports__["o"] = regexTokenize;
/* harmony export (immutable) */ __webpack_exports__["l"] = promiseDebounce;
/* harmony export (immutable) */ __webpack_exports__["p"] = safeInterval;
/* unused harmony export isInteger */
/* unused harmony export isFloat */
/* unused harmony export serializePrimitive */
/* unused harmony export deserializePrimitive */
/* unused harmony export dotify */
/* unused harmony export undotify */
/* unused harmony export eventEmitter */
/* unused harmony export camelToDasherize */
/* unused harmony export dasherizeToCamel */
/* harmony export (immutable) */ __webpack_exports__["a"] = capitalizeFirstLetter;
/* unused harmony export get */
/* unused harmony export safeTimeout */
/* unused harmony export defineLazyProp */
/* unused harmony export isObject */
/* unused harmony export isObjectObject */
/* unused harmony export isPlainObject */
/* unused harmony export replaceObject */
/* unused harmony export copyProp */
/* unused harmony export regex */
/* unused harmony export regexAll */
/* unused harmony export isDefined */
/* unused harmony export cycle */
/* harmony export (immutable) */ __webpack_exports__["b"] = debounce;
/* unused harmony export isRegex */
/* unused harmony export weakMapMemoize */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__("./node_modules/zalgo-promise/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__ = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint max-lines: 0 */




function base64encode(str) {
    if (true) {
        return __webpack_require__("./node_modules/Base64/base64.js").btoa(str);
    }
    return window.btoa(str);
}

function base64decode(str) {
    if (true) {
        return __webpack_require__("./node_modules/Base64/base64.js").atob(str);
    }
    return window.atob(str);
}

function uniqueID() {

    var chars = '0123456789abcdef';

    var randomID = 'xxxxxxxxxx'.replace(/./g, function () {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });

    var timeID = base64encode(new Date().toISOString().slice(11, 19).replace('T', '.')).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    return randomID + '_' + timeID;
}

function getGlobal() {
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('No global found');
}

var objectIDs = void 0;

function getObjectID(obj) {

    objectIDs = objectIDs || new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__["a" /* WeakMap */]();

    if (obj === null || obj === undefined || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && typeof obj !== 'function') {
        throw new Error('Invalid object');
    }

    var uid = objectIDs.get(obj);

    if (!uid) {
        uid = (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) + ':' + uniqueID();
        objectIDs.set(obj, uid);
    }

    return uid;
}

function serializeArgs(args) {
    try {
        return JSON.stringify(Array.prototype.slice.call(args), function (subkey, val) {
            if (typeof val === 'function') {
                return 'memoize[' + getObjectID(val) + ']';
            }
            return val;
        });
    } catch (err) {
        throw new Error('Arguments not serializable -- can not be used to memoize');
    }
}

// eslint-disable-next-line flowtype/no-weak-types
function memoize(method) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var cacheMap = new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__["a" /* WeakMap */]();

    // eslint-disable-next-line flowtype/no-weak-types
    function memoizedFunction() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
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

        memoizedFunction.__calling__ = true;

        var time = Date.now();
        var value = method.apply(this, arguments);

        memoizedFunction.__calling__ = false;

        cache[key] = { time: time, value: value };

        return cache[key].value;
    }

    memoizedFunction.reset = function () {
        cacheMap['delete'](options.thisNamespace ? _this : method);
    };

    if (options.name) {
        memoizedFunction.displayName = options.name + ':memoized';
    }

    return memoizedFunction;
}

// eslint-disable-next-line flowtype/no-weak-types
function promisify(method) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    function promisifiedFunction() {
        return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__["a" /* ZalgoPromise */]['try'](method, this, arguments);
    }

    if (options.name) {
        promisifiedFunction.displayName = options.name + ':promisified';
    }

    return promisifiedFunction;
}

// eslint-disable-next-line flowtype/no-weak-types
function inlineMemoize(method, logic) {
    var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {};
    var key = serializeArgs(args);

    if (cache.hasOwnProperty(key)) {
        return cache[key];
    }

    var result = cache[key] = logic.apply(undefined, args);
    return result;
}

// eslint-disable-next-line no-unused-vars
function noop() {
    // pass
}

function once(method) {
    var called = false;

    return function onceFunction() {
        if (!called) {
            called = true;
            return method.apply(this, arguments);
        }
    };
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
    return new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__["a" /* ZalgoPromise */](function (resolve) {

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

function stringifyError(err) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;


    if (level >= 3) {
        return 'stringifyError stack overflow';
    }

    try {
        if (!err) {
            return '<unknown error: ' + Object.prototype.toString.call(err) + '>';
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
                    return message + '\n' + stack;
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
        return 'Error while stringifying error: ' + stringifyError(newErr, level + 1);
    }
}

function stringifyErrorMessage(err) {

    var defaultMessage = '<unknown error: ' + Object.prototype.toString.call(err) + '>';

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

    if (item && typeof item.toString === 'function') {
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
        var _this2 = this,
            _arguments = arguments;

        return handler({
            context: this,
            args: Array.prototype.slice.call(arguments),
            original: original,
            callOriginal: function callOriginal() {
                return original.apply(_this2, _arguments);
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

function values(obj) {
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
    var results = [];

    // $FlowFixMe
    str.replace(regexp, function regexMapMatcher(item) {
        results.push(handler ? handler.apply(null, arguments) : item);
    });

    // $FlowFixMe
    return results;
}

function svgToBase64(svg) {
    return 'data:image/svg+xml;base64,' + base64encode(svg);
}

function objFilter(obj) {
    var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Boolean;

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

function promiseDebounce(method) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;


    var promise = void 0;
    var timeout = void 0;

    return function promiseDebouncedMethod() {
        if (timeout) {
            clearTimeout(timeout);
        }

        var localPromise = promise = promise || new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__["a" /* ZalgoPromise */]();

        timeout = setTimeout(function () {
            promise = null;
            timeout = null;

            __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__["a" /* ZalgoPromise */]['try'](method).then(function (result) {
                localPromise.resolve(result);
            }, function (err) {
                localPromise.reject(err);
            });
        }, delay);

        return localPromise;
    };
}

function safeInterval(method, time) {

    var timeout = void 0;

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

function dotify(obj) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var newobj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    prefix = prefix ? prefix + '.' : prefix;
    for (var key in obj) {
        if (!obj.hasOwnProperty(key) || obj[key] === undefined || obj[key] === null || typeof obj[key] === 'function') {
            continue;
        } else if (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(function (val) {
            return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object';
        })) {
            newobj['' + prefix + key + '[]'] = obj[key].join(',');
        } else if (obj[key] && _typeof(obj[key]) === 'object') {
            newobj = dotify(obj[key], '' + prefix + key, newobj);
        } else {
            newobj['' + prefix + key] = serializePrimitive(obj[key]);
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

            var handlerList = handlers[eventName];

            if (handlerList) {
                for (var _i2 = 0, _length2 = handlerList == null ? 0 : handlerList.length; _i2 < _length2; _i2++) {
                    var _handler = handlerList[_i2];
                    _handler();
                }
            }
        },
        triggerOnce: function triggerOnce(eventName) {

            if (triggered[eventName]) {
                return;
            }

            triggered[eventName] = true;
            this.trigger(eventName);
        }
    };
}

function camelToDasherize(string) {
    return string.replace(/([A-Z])/g, function (g) {
        return '-' + g.toLowerCase();
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

function get(item, path, def) {

    if (!path) {
        return def;
    }

    var pathParts = path.split('.');

    // Loop through each section of our key path

    for (var i = 0; i < pathParts.length; i++) {

        // If we have an object, we can get the key
        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null) {
            item = item[pathParts[i]];

            // Otherwise, we should return the default (undefined if not provided)
        } else {
            return def;
        }
    }

    // If our final result is undefined, we should return the default

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
            throw new TypeError('Array key must be number');
        }
    } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
        if (typeof key !== 'string') {
            throw new TypeError('Object key must be string');
        }
    }

    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get: function get() {
            // $FlowFixMe
            delete obj[key];
            var value = getter();
            // $FlowFixMe
            obj[key] = value;
            return value;
        },
        set: function set(value) {
            // $FlowFixMe
            delete obj[key];
            // $FlowFixMe
            obj[key] = value;
        }
    });
}

function isObject(item) {
    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null;
}

function isObjectObject(obj) {
    return isObject(obj) && Object.prototype.toString.call(obj) === '[object Object]';
}

function isPlainObject(obj) {
    if (!isObjectObject(obj)) {
        return false;
    }

    // $FlowFixMe
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

function replaceObject(item, replacer) {
    var fullKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';


    if (Array.isArray(item)) {
        var _length3 = item.length;
        var result = [];

        var _loop = function _loop(i) {

            defineLazyProp(result, i, function () {
                var itemKey = fullKey ? fullKey + '.' + i : '' + i;
                var el = item[i];

                var child = replacer(el, i, itemKey);

                if (isPlainObject(child) || Array.isArray(child)) {
                    // $FlowFixMe
                    child = replaceObject(child, replacer, itemKey);
                }

                return child;
            });
        };

        for (var i = 0; i < _length3; i++) {
            _loop(i);
        }

        // $FlowFixMe
        return result;
    } else if (isPlainObject(item)) {
        var _result = {};

        var _loop2 = function _loop2(key) {
            if (!item.hasOwnProperty(key)) {
                return 'continue';
            }

            defineLazyProp(_result, key, function () {
                var itemKey = fullKey ? fullKey + '.' + key : '' + key;
                // $FlowFixMe
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
            var _ret2 = _loop2(key);

            if (_ret2 === 'continue') continue;
        }

        // $FlowFixMe
        return _result;
    } else {
        throw new Error('Pass an object or array');
    }
}

function copyProp(source, target, name, def) {
    if (source.hasOwnProperty(name)) {
        var descriptor = Object.getOwnPropertyDescriptor(source, name);
        // $FlowFixMe
        Object.defineProperty(target, name, descriptor);
    } else {
        target[name] = def;
    }
}

function regex(pattern, string) {
    var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


    if (typeof pattern === 'string') {
        // eslint-disable-next-line security/detect-non-literal-regexp
        pattern = new RegExp(pattern);
    }

    var result = string.slice(start).match(pattern);

    if (!result) {
        return;
    }

    // $FlowFixMe
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

            return '' + regmatch.slice(0, start + index) + text + regmatch.slice(index + regmatch.length);
        }
    };
}

function regexAll(pattern, string) {

    var matches = [];
    var start = 0;

    // eslint-disable-next-line no-constant-condition
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
    return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__["a" /* ZalgoPromise */]['try'](method).then(function () {
        return cycle(method);
    });
}

function debounce(method) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;


    var timeout = void 0;

    return function debounceWrapper() {
        var _this3 = this,
            _arguments2 = arguments;

        clearTimeout(timeout);

        timeout = setTimeout(function () {
            return method.apply(_this3, _arguments2);
        }, time);
    };
}

function isRegex(item) {
    return Object.prototype.toString.call(item) === '[object RegExp]';
}

// eslint-disable-next-line flowtype/no-weak-types
var weakMapMemoize = function weakMapMemoize(method) {

    var weakmap = new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__["a" /* WeakMap */]();

    // eslint-disable-next-line flowtype/no-weak-types
    return function weakmapMemoized(arg) {
        var result = weakmap.get(arg);

        if (typeof result !== 'undefined') {
            return result;
        }

        result = method.call(this, arg);

        if (typeof result !== 'undefined') {
            weakmap.set(arg, result);
        }

        return result;
    };
};

/***/ }),

/***/ "./node_modules/cross-domain-safe-weakmap/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var interface_namespaceObject = {};
__webpack_require__.d(interface_namespaceObject, "WeakMap", function() { return weakmap_CrossDomainSafeWeakMap; });

// EXTERNAL MODULE: ./node_modules/cross-domain-utils/src/index.js
var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");

// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/native.js
function hasNativeWeakMap() {

    if (!window.WeakMap) {
        return false;
    }

    if (!window.Object.freeze) {
        return false;
    }

    try {

        var testWeakMap = new window.WeakMap();
        var testKey = {};
        var testValue = '__testvalue__';

        window.Object.freeze(testKey);

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
function safeIndexOf(collection, item) {
    for (var i = 0; i < collection.length; i++) {

        try {
            if (collection[i] === item) {
                return i;
            }
        } catch (err) {
            // pass
        }
    }

    return -1;
}

// eslint-disable-next-line no-unused-vars
function noop() {
    // pass
}
// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/weakmap.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var defineProperty = Object.defineProperty;
var counter = Date.now() % 1e9;

var weakmap_CrossDomainSafeWeakMap = function () {
    function CrossDomainSafeWeakMap() {
        _classCallCheck(this, CrossDomainSafeWeakMap);

        counter += 1;

        // eslint-disable-next-line no-bitwise
        this.name = '__weakmap_' + (Math.random() * 1e9 >>> 0) + '__' + counter;

        if (hasNativeWeakMap()) {
            try {
                this.weakmap = new window.WeakMap();
            } catch (err) {
                // pass
            }
        }

        this.keys = [];
        this.values = [];
    }

    CrossDomainSafeWeakMap.prototype._cleanupClosedWindows = function _cleanupClosedWindows() {

        var weakmap = this.weakmap;
        var keys = this.keys;

        for (var i = 0; i < keys.length; i++) {
            var value = keys[i];

            if (Object(src["isWindow"])(value) && Object(src["isWindowClosed"])(value)) {

                if (weakmap) {
                    try {
                        weakmap['delete'](value);
                    } catch (err) {
                        // pass
                    }
                }

                keys.splice(i, 1);
                this.values.splice(i, 1);

                i -= 1;
            }
        }
    };

    CrossDomainSafeWeakMap.prototype.isSafeToReadWrite = function isSafeToReadWrite(key) {

        if (Object(src["isWindow"])(key)) {
            return false;
        }

        try {
            noop(key && key.self);
            noop(key && key[this.name]);
        } catch (err) {
            return false;
        }

        return true;
    };

    CrossDomainSafeWeakMap.prototype.set = function set(key, value) {

        if (!key) {
            throw new Error('WeakMap expected key');
        }

        var weakmap = this.weakmap;

        if (weakmap) {
            try {
                weakmap.set(key, value);
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (!this.isSafeToReadWrite(key)) {

            this._cleanupClosedWindows();

            var keys = this.keys;
            var values = this.values;
            var index = safeIndexOf(keys, key);

            if (index === -1) {
                keys.push(key);
                values.push(value);
            } else {
                values[index] = value;
            }
        } else {

            var name = this.name;
            var entry = key[name];

            if (entry && entry[0] === key) {
                entry[1] = value;
            } else {
                defineProperty(key, name, {
                    value: [key, value],
                    writable: true
                });
            }
        }
    };

    CrossDomainSafeWeakMap.prototype.get = function get(key) {

        if (!key) {
            throw new Error('WeakMap expected key');
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

        if (!this.isSafeToReadWrite(key)) {

            this._cleanupClosedWindows();

            var keys = this.keys;
            var index = safeIndexOf(keys, key);

            if (index === -1) {
                return;
            }

            return this.values[index];
        } else {

            var entry = key[this.name];

            if (entry && entry[0] === key) {
                return entry[1];
            }
        }
    };

    CrossDomainSafeWeakMap.prototype['delete'] = function _delete(key) {

        if (!key) {
            throw new Error('WeakMap expected key');
        }

        var weakmap = this.weakmap;

        if (weakmap) {
            try {
                weakmap['delete'](key);
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (!this.isSafeToReadWrite(key)) {

            this._cleanupClosedWindows();

            var keys = this.keys;
            var index = safeIndexOf(keys, key);

            if (index !== -1) {
                keys.splice(index, 1);
                this.values.splice(index, 1);
            }
        } else {

            var entry = key[this.name];

            if (entry && entry[0] === key) {
                entry[0] = entry[1] = undefined;
            }
        }
    };

    CrossDomainSafeWeakMap.prototype.has = function has(key) {

        if (!key) {
            throw new Error('WeakMap expected key');
        }

        var weakmap = this.weakmap;

        if (weakmap) {
            try {
                return weakmap.has(key);
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (!this.isSafeToReadWrite(key)) {

            this._cleanupClosedWindows();

            var index = safeIndexOf(this.keys, key);
            return index !== -1;
        } else {

            var entry = key[this.name];

            if (entry && entry[0] === key) {
                return true;
            }

            return false;
        }
    };

    CrossDomainSafeWeakMap.prototype.getOrSet = function getOrSet(key, getter) {
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
// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/interface.js

// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return weakmap_CrossDomainSafeWeakMap; });


// eslint-disable-next-line import/no-namespace



/* harmony default export */ var cross_domain_safe_weakmap_src = (interface_namespaceObject);

/***/ }),

/***/ "./node_modules/cross-domain-utils/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "isCurrentDomain", function() { return __WEBPACK_IMPORTED_MODULE_0__utils__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "isWindow", function() { return __WEBPACK_IMPORTED_MODULE_0__utils__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "isWindowClosed", function() { return __WEBPACK_IMPORTED_MODULE_0__utils__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "linkFrameWindow", function() { return __WEBPACK_IMPORTED_MODULE_0__utils__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types__);
/* unused harmony namespace reexport */



/***/ }),

/***/ "./node_modules/cross-domain-utils/src/types.js":
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/cross-domain-utils/src/utils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/util.js
function isRegex(item) {
    return Object.prototype.toString.call(item) === '[object RegExp]';
}

// eslint-disable-next-line no-unused-vars
function noop() {
    // pass
}
// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/utils.js
/* unused harmony export isFileProtocol */
/* unused harmony export isAboutProtocol */
/* unused harmony export getParent */
/* unused harmony export getOpener */
/* unused harmony export canReadFromWindow */
/* unused harmony export getActualDomain */
/* unused harmony export getDomain */
/* unused harmony export isBlankDomain */
/* unused harmony export isActuallySameDomain */
/* unused harmony export isSameDomain */
/* unused harmony export getParents */
/* unused harmony export isAncestorParent */
/* unused harmony export getFrames */
/* unused harmony export getAllChildFrames */
/* unused harmony export getTop */
/* unused harmony export getAllFramesInWindow */
/* unused harmony export isTop */
/* unused harmony export isFrameWindowClosed */
/* harmony export (immutable) */ __webpack_exports__["c"] = isWindowClosed;
/* harmony export (immutable) */ __webpack_exports__["d"] = linkFrameWindow;
/* unused harmony export getUserAgent */
/* unused harmony export getFrameByName */
/* unused harmony export findChildFrameByName */
/* unused harmony export findFrameByName */
/* unused harmony export isParent */
/* unused harmony export isOpener */
/* unused harmony export getAncestor */
/* unused harmony export getAncestors */
/* unused harmony export isAncestor */
/* unused harmony export isPopup */
/* unused harmony export isIframe */
/* unused harmony export isFullpage */
/* unused harmony export getDistanceFromTop */
/* unused harmony export getNthParent */
/* unused harmony export getNthParentFromTop */
/* unused harmony export isSameTopWindow */
/* unused harmony export matchDomain */
/* unused harmony export stringifyDomainPattern */
/* unused harmony export getDomainFromUrl */
/* unused harmony export onCloseWindow */
/* harmony export (immutable) */ __webpack_exports__["b"] = isWindow;
/* unused harmony export isBrowser */
/* harmony export (immutable) */ __webpack_exports__["a"] = isCurrentDomain;

/* eslint max-lines: 0 */




var CONSTANTS = {
    MOCK_PROTOCOL: 'mock:',
    FILE_PROTOCOL: 'file:',
    ABOUT_PROTOCOL: 'about:',
    WILDCARD: '*'
};

var IE_WIN_ACCESS_ERROR = 'Call was rejected by callee.\r\n';

function isFileProtocol() {
    var win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

    return win.location.protocol === CONSTANTS.FILE_PROTOCOL;
}

function isAboutProtocol() {
    var win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

    return win.location.protocol === CONSTANTS.ABOUT_PROTOCOL;
}

function getParent(win) {

    if (!win) {
        return;
    }

    try {
        if (win.parent && win.parent !== win) {
            return win.parent;
        }
    } catch (err) {
        // pass
    }
}

function getOpener(win) {

    if (!win) {
        return;
    }

    // Make sure we're not actually an iframe which has had window.open() called on us
    if (getParent(win)) {
        return;
    }

    try {
        return win.opener;
    } catch (err) {
        // pass
    }
}

function canReadFromWindow(win) {
    try {
        // $FlowFixMe
        noop(win && win.location && win.location.href);
        return true;
    } catch (err) {
        // pass
    }

    return false;
}

function getActualDomain(win) {

    win = win || window;

    var location = win.location;

    if (!location) {
        throw new Error('Can not read window location');
    }

    var protocol = location.protocol;

    if (!protocol) {
        throw new Error('Can not read window protocol');
    }

    if (protocol === CONSTANTS.FILE_PROTOCOL) {
        return CONSTANTS.FILE_PROTOCOL + '//';
    }

    if (protocol === CONSTANTS.ABOUT_PROTOCOL) {

        var parent = getParent(win);
        if (parent && canReadFromWindow(parent)) {
            // $FlowFixMe
            return getActualDomain(parent);
        }

        return CONSTANTS.ABOUT_PROTOCOL + '//';
    }

    var host = location.host;

    if (!host) {
        throw new Error('Can not read window host');
    }

    return protocol + '//' + host;
}

function getDomain(win) {

    win = win || window;

    var domain = getActualDomain(win);

    if (domain && win.mockDomain && win.mockDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) === 0) {
        return win.mockDomain;
    }

    return domain;
}

function isBlankDomain(win) {
    try {
        if (!win.location.href) {
            return true;
        }

        if (win.location.href === 'about:blank') {
            return true;
        }
    } catch (err) {
        // pass
    }

    return false;
}

function isActuallySameDomain(win) {

    try {
        if (win === window) {
            return true;
        }
    } catch (err) {
        // pass
    }

    try {
        var desc = Object.getOwnPropertyDescriptor(win, 'location');

        if (desc && desc.enumerable === false) {
            return false;
        }
    } catch (err) {
        // pass
    }

    try {
        // $FlowFixMe
        if (isAboutProtocol(win) && canReadFromWindow(win)) {
            return true;
        }
    } catch (err) {
        // pass
    }

    try {
        // $FlowFixMe
        if (getActualDomain(win) === getActualDomain(window)) {
            return true;
        }
    } catch (err) {
        // pass
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
        }

        // $FlowFixMe
        if (isAboutProtocol(win) && canReadFromWindow(win)) {
            return true;
        }

        // $FlowFixMe
        if (getDomain(window) === getDomain(win)) {
            return true;
        }
    } catch (err) {
        // pass
    }

    return false;
}

function getParents(win) {

    var result = [];

    try {

        while (win.parent !== win) {
            result.push(win.parent);
            win = win.parent;
        }
    } catch (err) {
        // pass
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

    var frames = void 0;

    try {
        frames = win.frames;
    } catch (err) {
        frames = win;
    }

    var len = void 0;

    try {
        len = frames.length;
    } catch (err) {
        // pass
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

    for (var _i3 = 0, _getFrames2 = getFrames(win), _length2 = _getFrames2 == null ? 0 : _getFrames2.length; _i3 < _length2; _i3++) {
        var frame = _getFrames2[_i3];
        result.push(frame);

        for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame), _length4 = _getAllChildFrames2 == null ? 0 : _getAllChildFrames2.length; _i5 < _length4; _i5++) {
            var childFrame = _getAllChildFrames2[_i5];
            result.push(childFrame);
        }
    }

    return result;
}

function getTop(win) {

    if (!win) {
        return;
    }

    try {
        if (win.top) {
            return win.top;
        }
    } catch (err) {
        // pass
    }

    if (getParent(win) === win) {
        return win;
    }

    try {
        if (isAncestorParent(window, win) && window.top) {
            return window.top;
        }
    } catch (err) {
        // pass
    }

    try {
        if (isAncestorParent(win, window) && window.top) {
            return window.top;
        }
    } catch (err) {
        // pass
    }

    for (var _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win), _length6 = _getAllChildFrames4 == null ? 0 : _getAllChildFrames4.length; _i7 < _length6; _i7++) {
        var frame = _getAllChildFrames4[_i7];
        try {
            if (frame.top) {
                return frame.top;
            }
        } catch (err) {
            // pass
        }

        if (getParent(frame) === frame) {
            return frame;
        }
    }
}

function getAllFramesInWindow(win) {
    var top = getTop(win);

    if (!top) {
        throw new Error('Can not determine top window');
    }

    return [].concat(getAllChildFrames(top), [top]);
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

    if (doc && doc.body && !doc.body.contains(frame)) {
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
        } catch (err) {
            // pass
        }
    }

    return -1;
}

var iframeWindows = [];
var iframeFrames = [];

function isWindowClosed(win) {
    var allowMock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


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
        } catch (err) {
            // pass
        }
    }

    // Mobile safari

    try {
        if (!win.parent || !win.top) {
            return true;
        }
    } catch (err) {}
    // pass


    // Yes, this actually happens in IE. win === win errors out when the window
    // is from an iframe, and the iframe was removed from the page.

    try {
        noop(win === win); // eslint-disable-line no-self-compare
    } catch (err) {
        return true;
    }

    // IE orphaned frame

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

    for (var i = 0; i < iframeFrames.length; i++) {
        if (isFrameWindowClosed(iframeFrames[i])) {
            iframeFrames.splice(i, 1);
            iframeWindows.splice(i, 1);
        }
    }

    for (var _i8 = 0; _i8 < iframeWindows.length; _i8++) {
        if (isWindowClosed(iframeWindows[_i8])) {
            iframeFrames.splice(_i8, 1);
            iframeWindows.splice(_i8, 1);
        }
    }
}

function linkFrameWindow(frame) {

    cleanIframes();

    if (frame && frame.contentWindow) {
        try {
            iframeWindows.push(frame.contentWindow);
            iframeFrames.push(frame);
        } catch (err) {
            // pass
        }
    }
}

function getUserAgent(win) {
    win = win || window;
    return win.navigator.mockUserAgent || win.navigator.userAgent;
}

function getFrameByName(win, name) {

    var winFrames = getFrames(win);

    for (var _i10 = 0, _length8 = winFrames == null ? 0 : winFrames.length; _i10 < _length8; _i10++) {
        var childFrame = winFrames[_i10];
        try {
            // $FlowFixMe
            if (isSameDomain(childFrame) && childFrame.name === name && winFrames.indexOf(childFrame) !== -1) {
                return childFrame;
            }
        } catch (err) {
            // pass
        }
    }

    try {
        // $FlowFixMe
        if (winFrames.indexOf(win.frames[name]) !== -1) {
            // $FlowFixMe
            return win.frames[name];
        }
    } catch (err) {
        // pass
    }

    try {
        if (winFrames.indexOf(win[name]) !== -1) {
            return win[name];
        }
    } catch (err) {
        // pass
    }
}

function findChildFrameByName(win, name) {

    var frame = getFrameByName(win, name);

    if (frame) {
        return frame;
    }

    for (var _i12 = 0, _getFrames4 = getFrames(win), _length10 = _getFrames4 == null ? 0 : _getFrames4.length; _i12 < _length10; _i12++) {
        var childFrame = _getFrames4[_i12];
        var namedFrame = findChildFrameByName(childFrame, name);

        if (namedFrame) {
            return namedFrame;
        }
    }
}

function findFrameByName(win, name) {

    var frame = void 0;

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

    for (var _i14 = 0, _getFrames6 = getFrames(win), _length12 = _getFrames6 == null ? 0 : _getFrames6.length; _i14 < _length12; _i14++) {
        var childFrame = _getFrames6[_i14];
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

    for (var _i16 = 0, _getFrames8 = getFrames(parent), _length14 = _getFrames8 == null ? 0 : _getFrames8.length; _i16 < _length14; _i16++) {
        var frame = _getFrames8[_i16];
        if (frame === child) {
            return true;
        }
    }

    return false;
}

function isPopup() {
    return Boolean(getOpener(window));
}

function isIframe() {
    return Boolean(getParent(window));
}

function isFullpage() {
    return Boolean(!isIframe() && !isPopup());
}

function anyMatch(collection1, collection2) {
    for (var _i18 = 0, _length16 = collection1 == null ? 0 : collection1.length; _i18 < _length16; _i18++) {
        var item1 = collection1[_i18];
        for (var _i20 = 0, _length18 = collection2 == null ? 0 : collection2.length; _i20 < _length18; _i20++) {
            var item2 = collection2[_i20];
            if (item1 === item2) {
                return true;
            }
        }
    }

    return false;
}

function getDistanceFromTop() {
    var win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

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

function getNthParent(win) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var parent = win;

    for (var i = 0; i < n; i++) {
        if (!parent) {
            return;
        }

        parent = getParent(parent);
    }

    return parent;
}

function getNthParentFromTop(win) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

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
    } catch (err) {
        // pass
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
            return pattern === CONSTANTS.WILDCARD || origin === pattern;
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
        }

        // $FlowFixMe
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
        return '(' + pattern.join(' | ') + ')';
    } else if (isRegex(pattern)) {
        return 'RegExp(' + pattern.toString();
    } else {
        return pattern.toString();
    }
}

function getDomainFromUrl(url) {

    var domain = void 0;

    if (url.match(/^(https?|mock|file):\/\//)) {
        domain = url;
    } else {
        return getDomain();
    }

    domain = domain.split('/').slice(0, 3).join('/');

    return domain;
}

function onCloseWindow(win, callback) {
    var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
    var maxtime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Infinity;


    var timeout = void 0;

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
}

// eslint-disable-next-line complexity
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
        noop(obj === obj); // eslint-disable-line no-self-compare
    } catch (err) {
        return true;
    }

    try {
        noop(obj && obj.__cross_domain_utils_window_check__);
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

/***/ }),

/***/ "./node_modules/paypal-braintree-web-client/src/config.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getPayPalDomain */
/* unused harmony export getPayPalAPIDomain */
/* unused harmony export getPayPalLoggerDomain */
/* harmony export (immutable) */ __webpack_exports__["b"] = buildPayPalUrl;
/* harmony export (immutable) */ __webpack_exports__["a"] = buildPayPalAPIUrl;
/* harmony export (immutable) */ __webpack_exports__["c"] = getPayPalLoggerUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globals__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/globals.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__script__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/script.js");





function getPayPalDomain() {
    return {
        local: 'http://localhost.paypal.com:' + Object(__WEBPACK_IMPORTED_MODULE_1__globals__["i" /* getPort */])(),
        stage: 'https://' + Object(__WEBPACK_IMPORTED_MODULE_2__script__["c" /* getStageHost */])(),
        sandbox: 'https://www.sandbox.paypal.com',
        paypal: 'https://www.paypal.com',
        test: 'mock://www.paypal.com'
    }["production"];
}

function getPayPalAPIDomain() {
    return {
        local: 'https://' + Object(__WEBPACK_IMPORTED_MODULE_2__script__["a" /* getAPIStageHost */])() + ':12326',
        stage: 'https://' + Object(__WEBPACK_IMPORTED_MODULE_2__script__["a" /* getAPIStageHost */])() + ':12326',
        sandbox: 'https://cors.api.sandbox.paypal.com',
        paypal: 'https://www.cors.api.paypal.com',
        test: 'mock://api.paypal.com'
    }["production"];
}

function getPayPalLoggerDomain() {
    return {
        local: 'https://' + Object(__WEBPACK_IMPORTED_MODULE_2__script__["c" /* getStageHost */])(),
        stage: getPayPalDomain(),
        sandbox: getPayPalDomain(),
        paypal: getPayPalDomain(),
        test: getPayPalDomain()
    }["production"];
}

function buildPayPalUrl() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return  false ? '' + getActualDomain() + path : '' + getPayPalDomain() + path;
}

function buildPayPalAPIUrl() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var paypalAPIDomain = Object(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__["isCurrentDomain"])(getPayPalDomain()) ? getPayPalDomain() : getPayPalAPIDomain();

    return  false ? '' + getActualDomain() + path : '' + paypalAPIDomain + path;
}

var URI = {
    LOGGER: '/xoplatform/logger/api/logger'
};

function getPayPalLoggerUrl() {
    return buildPayPalUrl(URI.LOGGER);
}

/***/ }),

/***/ "./node_modules/paypal-braintree-web-client/src/constants.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ENV */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SDK_SETTINGS; });
/* unused harmony export COUNTRY */
/* unused harmony export LANG */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COUNTRY_LANGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FPTI_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FPTI_DATA_SOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FPTI_FEED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FPTI_SDK_NAME; });
/* unused harmony export INTENT */
/* unused harmony export COMMIT */
/* unused harmony export VAULT */
/* unused harmony export CURRENCY */
var _COUNTRY_LANGS;

/* eslint max-lines: 0 */

var ENV = {
    LOCAL: 'local',
    STAGE: 'stage',
    SANDBOX: 'sandbox',
    PRODUCTION: 'production',
    TEST: 'test',
    DEMO: 'demo'
};

var SDK_SETTINGS = {
    CLIENT_TOKEN: 'data-client-token',
    PARTNER_ATTRIBUTION_ID: 'data-partner-attribution-id',
    STAGE_HOST: 'data-stage-host',
    API_STAGE_HOST: 'data-api-stage-host'
};

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

var COUNTRY_LANGS = (_COUNTRY_LANGS = {}, _COUNTRY_LANGS[COUNTRY.AD] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AE] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR], _COUNTRY_LANGS[COUNTRY.AG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AI] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AL] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.AM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AN] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AO] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AR] = [LANG.ES, LANG.EN], _COUNTRY_LANGS[COUNTRY.AT] = [LANG.DE, LANG.EN], _COUNTRY_LANGS[COUNTRY.AU] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.AW] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BA] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.BB] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BE] = [LANG.EN, LANG.NL, LANG.FR], _COUNTRY_LANGS[COUNTRY.BF] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BG] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.BH] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BI] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BJ] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BN] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.BO] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BR] = [LANG.PT, LANG.EN], _COUNTRY_LANGS[COUNTRY.BS] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BT] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.BW] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BY] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.BZ] = [LANG.EN, LANG.ES, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CA] = [LANG.EN, LANG.FR], _COUNTRY_LANGS[COUNTRY.CD] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CH] = [LANG.DE, LANG.FR, LANG.EN], _COUNTRY_LANGS[COUNTRY.CI] = [LANG.FR, LANG.EN], _COUNTRY_LANGS[COUNTRY.CK] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CL] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CM] = [LANG.FR, LANG.EN], _COUNTRY_LANGS[COUNTRY.CN] = [LANG.ZH], _COUNTRY_LANGS[COUNTRY.CO] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CR] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CV] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CY] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.CZ] = [LANG.CS, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.DE] = [LANG.DE, LANG.EN], _COUNTRY_LANGS[COUNTRY.DJ] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.DK] = [LANG.DA, LANG.EN], _COUNTRY_LANGS[COUNTRY.DM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.DO] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.DZ] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.EC] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.EE] = [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.EG] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ER] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ES] = [LANG.ES, LANG.EN], _COUNTRY_LANGS[COUNTRY.ET] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.FI] = [LANG.FI, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.FJ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.FK] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.FM] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.FO] = [LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.FR] = [LANG.FR, LANG.EN], _COUNTRY_LANGS[COUNTRY.GA] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GB] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.GD] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GE] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GF] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GI] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GL] = [LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GN] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GP] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GR] = [LANG.EL, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GT] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GW] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GY] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.HK] = [LANG.EN, LANG.ZH], _COUNTRY_LANGS[COUNTRY.HN] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.HR] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.HU] = [LANG.HU, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ID] = [LANG.ID, LANG.EN], _COUNTRY_LANGS[COUNTRY.IE] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.IL] = [LANG.HE, LANG.EN], _COUNTRY_LANGS[COUNTRY.IN] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.IS] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.IT] = [LANG.IT, LANG.EN], _COUNTRY_LANGS[COUNTRY.JM] = [LANG.EN, LANG.ES, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.JO] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.JP] = [LANG.JA, LANG.EN], _COUNTRY_LANGS[COUNTRY.KE] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KH] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.KI] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KM] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KN] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KR] = [LANG.KO, LANG.EN], _COUNTRY_LANGS[COUNTRY.KW] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KY] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LA] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.LC] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LI] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LK] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.LS] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LT] = [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LU] = [LANG.EN, LANG.DE, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LV] = [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MA] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MC] = [LANG.FR, LANG.EN], _COUNTRY_LANGS[COUNTRY.MD] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.ME] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.MG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MH] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MK] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.ML] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MN] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.MQ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MR] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MS] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MT] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.MU] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MV] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.MW] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MX] = [LANG.ES, LANG.EN], _COUNTRY_LANGS[COUNTRY.MY] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.MZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NA] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NC] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NE] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NF] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NG] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.NI] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NL] = [LANG.NL, LANG.EN], _COUNTRY_LANGS[COUNTRY.NO] = [LANG.NO, LANG.EN], _COUNTRY_LANGS[COUNTRY.NP] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.NR] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NU] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.OM] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PA] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PE] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PF] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PH] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.PL] = [LANG.PL, LANG.EN], _COUNTRY_LANGS[COUNTRY.PM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PN] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PT] = [LANG.PT, LANG.EN], _COUNTRY_LANGS[COUNTRY.PW] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PY] = [LANG.ES, LANG.EN], _COUNTRY_LANGS[COUNTRY.QA] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR], _COUNTRY_LANGS[COUNTRY.RE] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.RO] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.RS] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.RU] = [LANG.RU, LANG.EN], _COUNTRY_LANGS[COUNTRY.RW] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SA] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SB] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SC] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SE] = [LANG.SV, LANG.EN], _COUNTRY_LANGS[COUNTRY.SG] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.SH] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SI] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SJ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SK] = [LANG.SK, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SL] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SN] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SO] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SR] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ST] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SV] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TC] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TD] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TG] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TH] = [LANG.TH, LANG.EN], _COUNTRY_LANGS[COUNTRY.TJ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TN] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TO] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.TR] = [LANG.TR, LANG.EN], _COUNTRY_LANGS[COUNTRY.TT] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TV] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TW] = [LANG.ZH, LANG.EN], _COUNTRY_LANGS[COUNTRY.TZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.UA] = [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.UG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.US] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.UY] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.VA] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.VC] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.VE] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.VG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.VN] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.VU] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.WF] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.WS] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.YE] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.YT] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ZA] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ZM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ZW] = [LANG.EN], _COUNTRY_LANGS);

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
    USER_AGENT: 'user_agent'
};

var FPTI_DATA_SOURCE = {
    PAYMENTS_SDK: 'payments_sdk'
};

var FPTI_FEED = {
    PAYMENTS_SDK: 'payments_sdk'
};

var FPTI_SDK_NAME = {
    PAYMENTS_SDK: 'payments_sdk'
};

var INTENT = {
    CAPTURE: 'capture',
    AUTH: 'auth',
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

/***/ }),

/***/ "./node_modules/paypal-braintree-web-client/src/globals.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = getHost;
/* unused harmony export getHostName */
/* harmony export (immutable) */ __webpack_exports__["i"] = getPort;
/* harmony export (immutable) */ __webpack_exports__["h"] = getPath;
/* harmony export (immutable) */ __webpack_exports__["d"] = getEnv;
/* harmony export (immutable) */ __webpack_exports__["a"] = getClientID;
/* harmony export (immutable) */ __webpack_exports__["g"] = getMerchantID;
/* harmony export (immutable) */ __webpack_exports__["b"] = getCountry;
/* harmony export (immutable) */ __webpack_exports__["f"] = getLang;
/* unused harmony export getLocale */
/* harmony export (immutable) */ __webpack_exports__["c"] = getDefaultStageHost;
/* unused harmony export getIntent */
/* unused harmony export getCommit */
/* unused harmony export getVault */
/* unused harmony export getCurrency */
/* harmony export (immutable) */ __webpack_exports__["j"] = getVersion;
/* unused harmony export getCorrelationID */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/constants.js");




function getHost() {
    return __HOST__;
}

function getHostName() {
    return __HOSTNAME__;
}

function getPort() {
    return __PORT__;
}

function getPath() {
    return __PATH__;
}

function getEnv() {
    return "production";
}

function getClientID() {
    return __CLIENT_ID__;
}

function getMerchantID() {
    return __MERCHANT_ID__;
}

function getCountry() {
    return __LOCALE_COUNTRY__;
}

function getLang() {
    if (typeof __LOCALE_LANG__ !== 'undefined') {
        return __LOCALE_LANG__;
    }

    for (var _i2 = 0, _getBrowserLocales2 = Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["getBrowserLocales"])(), _length2 = _getBrowserLocales2 == null ? 0 : _getBrowserLocales2.length; _i2 < _length2; _i2++) {
        var _ref2 = _getBrowserLocales2[_i2];
        var country = _ref2.country,
            lang = _ref2.lang;

        if (country && country === __LOCALE_COUNTRY__ && __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* COUNTRY_LANGS */][__LOCALE_COUNTRY__].indexOf(lang) !== -1) {
            // $FlowFixMe
            return lang;
        }
    }

    return __DEFAULT_LANG__;
}

function getLocale() {
    return {
        lang: getLang(),
        country: getCountry()
    };
}

function getDefaultStageHost() {
    return __STAGE_HOST__;
}

function getIntent() {
    return __INTENT__;
}

function getCommit() {
    return __COMMIT__;
}

function getVault() {
    return __VAULT__;
}

function getCurrency() {
    return __CURRENCY__;
}

function getVersion() {
    return __VERSION__;
}

function getCorrelationID() {
    return __CORRELATION_ID__;
}

/***/ }),

/***/ "./node_modules/paypal-braintree-web-client/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/constants.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/config.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "buildPayPalAPIUrl", function() { return __WEBPACK_IMPORTED_MODULE_1__config__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "buildPayPalUrl", function() { return __WEBPACK_IMPORTED_MODULE_1__config__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logger__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/logger.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__types__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__types__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__globals__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/globals.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__script__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/script.js");
/* unused harmony namespace reexport */







/***/ }),

/***/ "./node_modules/paypal-braintree-web-client/src/logger.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/zalgo-promise/src/index.js + 4 modules
var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js");

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var belter_src = __webpack_require__("./node_modules/belter/src/index.js");

// CONCATENATED MODULE: ./node_modules/beaver-logger/src/constants.js
var LOG_LEVEL = {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
};
// CONCATENATED MODULE: ./node_modules/beaver-logger/src/config.js


var AUTO_FLUSH_LEVEL = [LOG_LEVEL.WARN, LOG_LEVEL.ERROR];

var LOG_LEVEL_PRIORITY = [LOG_LEVEL.ERROR, LOG_LEVEL.WARN, LOG_LEVEL.INFO, LOG_LEVEL.DEBUG];

var FLUSH_INTERVAL = 60 * 1000;

var DEFAULT_LOG_LEVEL = LOG_LEVEL.WARN;
// CONCATENATED MODULE: ./node_modules/beaver-logger/src/logger.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







function httpTransport(_ref) {
    var url = _ref.url,
        method = _ref.method,
        headers = _ref.headers,
        json = _ref.json;

    return Object(belter_src["request"])({ url: url, method: method, headers: headers, json: json }).then(belter_src["noop"]);
}

function extendIfDefined(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key) && source[key]) {
            target[key] = source[key];
        }
    }
}

function Logger(_ref2) {
    var url = _ref2.url,
        prefix = _ref2.prefix,
        _ref2$logLevel = _ref2.logLevel,
        logLevel = _ref2$logLevel === undefined ? DEFAULT_LOG_LEVEL : _ref2$logLevel,
        _ref2$transport = _ref2.transport,
        transport = _ref2$transport === undefined ? httpTransport : _ref2$transport,
        _ref2$flushInterval = _ref2.flushInterval,
        flushInterval = _ref2$flushInterval === undefined ? FLUSH_INTERVAL : _ref2$flushInterval;


    var events = [];
    var tracking = [];

    var payloadBuilders = [];
    var metaBuilders = [];
    var trackingBuilders = [];
    var headerBuilders = [];

    function print(level, event, payload) {

        if (!Object(belter_src["isBrowser"])() || !window.console || !window.console.log) {
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
        } catch (err) {
            // pass
        }
    }

    function immediateFlush() {
        return src["a" /* ZalgoPromise */]['try'](function () {
            if (!Object(belter_src["isBrowser"])()) {
                return;
            }

            if (!events.length && !tracking.length) {
                return;
            }

            var meta = {};

            for (var _i2 = 0, _length2 = metaBuilders == null ? 0 : metaBuilders.length; _i2 < _length2; _i2++) {
                var builder = metaBuilders[_i2];
                extendIfDefined(meta, builder(meta));
            }

            var headers = {};

            for (var _i4 = 0, _length4 = headerBuilders == null ? 0 : headerBuilders.length; _i4 < _length4; _i4++) {
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

            return req.then(belter_src["noop"]);
        });
    }

    var flush = Object(belter_src["promiseDebounce"])(immediateFlush);

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

    function log(level, event) {
        var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


        if (!Object(belter_src["isBrowser"])()) {
            return;
        }

        if (prefix) {
            event = prefix + '_' + event;
        }

        var logPayload = _extends({}, Object(belter_src["objFilter"])(payload), {
            timestamp: Date.now().toString()
        });

        for (var _i6 = 0, _length6 = payloadBuilders == null ? 0 : payloadBuilders.length; _i6 < _length6; _i6++) {
            var builder = payloadBuilders[_i6];
            extendIfDefined(logPayload, builder(logPayload));
        }

        enqueue(level, event, logPayload);
        print(level, event, logPayload);
    }

    function addPayloadBuilder(builder) {
        payloadBuilders.push(builder);
    }

    function addMetaBuilder(builder) {
        metaBuilders.push(builder);
    }

    function addTrackingBuilder(builder) {
        trackingBuilders.push(builder);
    }

    function addHeaderBuilder(builder) {
        headerBuilders.push(builder);
    }

    function debug(event, payload) {
        log(LOG_LEVEL.DEBUG, event, payload);
    }

    function info(event, payload) {
        log(LOG_LEVEL.INFO, event, payload);
    }

    function warn(event, payload) {
        log(LOG_LEVEL.WARN, event, payload);
    }

    function error(event, payload) {
        log(LOG_LEVEL.ERROR, event, payload);
    }

    function track() {
        var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (!Object(belter_src["isBrowser"])()) {
            return;
        }

        var trackingPayload = Object(belter_src["objFilter"])(payload);

        for (var _i8 = 0, _length8 = trackingBuilders == null ? 0 : trackingBuilders.length; _i8 < _length8; _i8++) {
            var builder = trackingBuilders[_i8];
            extendIfDefined(trackingPayload, builder(trackingPayload));
        }

        print(LOG_LEVEL.DEBUG, 'track', trackingPayload);
        tracking.push(trackingPayload);
    }

    function setTransport(newTransport) {
        transport = newTransport;
    }

    if (Object(belter_src["isBrowser"])()) {
        Object(belter_src["safeInterval"])(flush, flushInterval);
    }

    return {
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
}
// CONCATENATED MODULE: ./node_modules/beaver-logger/src/index.js


// EXTERNAL MODULE: ./node_modules/paypal-braintree-web-client/src/config.js
var config = __webpack_require__("./node_modules/paypal-braintree-web-client/src/config.js");

// EXTERNAL MODULE: ./node_modules/paypal-braintree-web-client/src/constants.js
var constants = __webpack_require__("./node_modules/paypal-braintree-web-client/src/constants.js");

// EXTERNAL MODULE: ./node_modules/paypal-braintree-web-client/src/globals.js
var globals = __webpack_require__("./node_modules/paypal-braintree-web-client/src/globals.js");

// EXTERNAL MODULE: ./node_modules/paypal-braintree-web-client/src/script.js
var script = __webpack_require__("./node_modules/paypal-braintree-web-client/src/script.js");

// CONCATENATED MODULE: ./node_modules/paypal-braintree-web-client/src/logger.js
/* unused harmony export getLogger */
/* unused harmony export getPaymentsSDKStorage */
/* unused harmony export getSessionID */
/* unused harmony export setupLogger */









function getLogger() {
    return Object(belter_src["inlineMemoize"])(getLogger, function () {
        return Logger({
            url: Object(config["c" /* getPayPalLoggerUrl */])()
        });
    });
}

function getPaymentsSDKStorage() {
    return Object(belter_src["getStorage"])({ name: 'paypal_payments_sdk' });
}

function getSessionID() {
    return getPaymentsSDKStorage().getSessionID();
}

function setupLogger() {
    var logger = getLogger();

    logger.addPayloadBuilder(function () {
        return {
            referer: window.location.host,
            uid: getSessionID(),
            env: Object(globals["d" /* getEnv */])()
        };
    });

    logger.addTrackingBuilder(function () {
        var _ref;

        return _ref = {}, _ref[constants["d" /* FPTI_KEY */].FEED] = constants["c" /* FPTI_FEED */].PAYMENTS_SDK, _ref[constants["d" /* FPTI_KEY */].DATA_SOURCE] = constants["b" /* FPTI_DATA_SOURCE */].PAYMENTS_SDK, _ref[constants["d" /* FPTI_KEY */].CLIENT_ID] = Object(globals["a" /* getClientID */])(), _ref[constants["d" /* FPTI_KEY */].SELLER_ID] = Object(globals["g" /* getMerchantID */])(), _ref[constants["d" /* FPTI_KEY */].SESSION_UID] = getSessionID(), _ref[constants["d" /* FPTI_KEY */].REFERER] = window.location.host, _ref[constants["d" /* FPTI_KEY */].LOCALE] = Object(globals["f" /* getLang */])() + '_' + Object(globals["b" /* getCountry */])(), _ref[constants["d" /* FPTI_KEY */].BUYER_COUNTRY] = Object(globals["b" /* getCountry */])(), _ref[constants["d" /* FPTI_KEY */].INTEGRATION_IDENTIFIER] = Object(globals["a" /* getClientID */])(), _ref[constants["d" /* FPTI_KEY */].PARTNER_ATTRIBUTION_ID] = Object(script["b" /* getPartnerAttributionID */])(), _ref[constants["d" /* FPTI_KEY */].SDK_NAME] = constants["e" /* FPTI_SDK_NAME */].PAYMENTS_SDK, _ref[constants["d" /* FPTI_KEY */].SDK_VERSION] = Object(globals["j" /* getVersion */])(), _ref[constants["d" /* FPTI_KEY */].USER_AGENT] = window.navigator && window.navigator.userAgent, _ref;
    });

    src["a" /* ZalgoPromise */].onPossiblyUnhandledException(function (err) {
        var _logger$track;

        logger.track((_logger$track = {}, _logger$track[constants["d" /* FPTI_KEY */].ERROR_CODE] = 'checkoutjs_error', _logger$track[constants["d" /* FPTI_KEY */].ERROR_DESC] = Object(belter_src["stringifyErrorMessage"])(err), _logger$track));

        logger.error('unhandled_error', {
            stack: Object(belter_src["stringifyError"])(err),
            errtype: {}.toString.call(err)
        });

        // eslint-disable-next-line promise/no-promise-in-callback
        logger.flush()['catch'](belter_src["noop"]);
    });
}

/***/ }),

/***/ "./node_modules/paypal-braintree-web-client/src/script.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getSDKScript */
/* unused harmony export getSDKSettings */
/* unused harmony export getClientToken */
/* harmony export (immutable) */ __webpack_exports__["b"] = getPartnerAttributionID;
/* harmony export (immutable) */ __webpack_exports__["c"] = getStageHost;
/* harmony export (immutable) */ __webpack_exports__["a"] = getAPIStageHost;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/constants.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globals__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/globals.js");





function getSDKScript() {
    return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["inlineMemoize"])(getSDKScript, function () {
        var _host$path = { host: Object(__WEBPACK_IMPORTED_MODULE_2__globals__["e" /* getHost */])(), path: Object(__WEBPACK_IMPORTED_MODULE_2__globals__["h" /* getPath */])() },
            host = _host$path.host,
            path = _host$path.path;

        var script = Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["getScript"])({ host: host, path: path });

        if (!script) {
            throw new Error('PayPal Payments SDK script not present on page! Excected to find <script src="https://' + host + path + '">');
        }

        return script;
    });
}

function getSDKSettings() {
    return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["inlineMemoize"])(getSDKSettings, function () {
        var sdkScript = getSDKScript();

        return {
            clientToken: sdkScript.getAttribute(__WEBPACK_IMPORTED_MODULE_1__constants__["f" /* SDK_SETTINGS */].CLIENT_TOKEN),
            partnerAttributionID: sdkScript.getAttribute(__WEBPACK_IMPORTED_MODULE_1__constants__["f" /* SDK_SETTINGS */].PARTNER_ATTRIBUTION_ID),
            stageHost: sdkScript.getAttribute(__WEBPACK_IMPORTED_MODULE_1__constants__["f" /* SDK_SETTINGS */].STAGE_HOST),
            apiStageHost: sdkScript.getAttribute(__WEBPACK_IMPORTED_MODULE_1__constants__["f" /* SDK_SETTINGS */].API_STAGE_HOST)
        };
    });
}

function getClientToken() {
    var _getSDKSettings = getSDKSettings(),
        clientToken = _getSDKSettings.clientToken;

    if (!clientToken) {
        throw new Error('Expected data-client-token="xyz" to be passed with client token, to ' + getSDKScript().outerHTML);
    }

    return clientToken;
}

function getPartnerAttributionID() {
    return getSDKSettings().partnerAttributionID;
}

function getStageHost() {
    return getSDKSettings().stageHost || Object(__WEBPACK_IMPORTED_MODULE_2__globals__["c" /* getDefaultStageHost */])();
}

function getAPIStageHost() {
    return getSDKSettings().apiStageHost || getStageHost();
}

/***/ }),

/***/ "./node_modules/paypal-braintree-web-client/src/types.js":
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/paypal-sdk-constants/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/paypal-sdk-constants/src/locale.js
var _COUNTRY_LANGS;

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

var COUNTRY_LANGS = (_COUNTRY_LANGS = {}, _COUNTRY_LANGS[COUNTRY.AD] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AE] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR], _COUNTRY_LANGS[COUNTRY.AG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AI] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AL] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.AM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AN] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AO] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AR] = [LANG.ES, LANG.EN], _COUNTRY_LANGS[COUNTRY.AT] = [LANG.DE, LANG.EN], _COUNTRY_LANGS[COUNTRY.AU] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.AW] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.AZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BA] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.BB] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BE] = [LANG.EN, LANG.NL, LANG.FR], _COUNTRY_LANGS[COUNTRY.BF] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BG] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.BH] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BI] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BJ] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BN] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.BO] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BR] = [LANG.PT, LANG.EN], _COUNTRY_LANGS[COUNTRY.BS] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BT] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.BW] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.BY] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.BZ] = [LANG.EN, LANG.ES, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CA] = [LANG.EN, LANG.FR], _COUNTRY_LANGS[COUNTRY.CD] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CH] = [LANG.DE, LANG.FR, LANG.EN], _COUNTRY_LANGS[COUNTRY.CI] = [LANG.FR, LANG.EN], _COUNTRY_LANGS[COUNTRY.CK] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CL] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CM] = [LANG.FR, LANG.EN], _COUNTRY_LANGS[COUNTRY.CN] = [LANG.ZH], _COUNTRY_LANGS[COUNTRY.CO] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CR] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CV] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.CY] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.CZ] = [LANG.CS, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.DE] = [LANG.DE, LANG.EN], _COUNTRY_LANGS[COUNTRY.DJ] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.DK] = [LANG.DA, LANG.EN], _COUNTRY_LANGS[COUNTRY.DM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.DO] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.DZ] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.EC] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.EE] = [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.EG] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ER] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ES] = [LANG.ES, LANG.EN], _COUNTRY_LANGS[COUNTRY.ET] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.FI] = [LANG.FI, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.FJ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.FK] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.FM] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.FO] = [LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.FR] = [LANG.FR, LANG.EN], _COUNTRY_LANGS[COUNTRY.GA] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GB] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.GD] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GE] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GF] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GI] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GL] = [LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GN] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GP] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GR] = [LANG.EL, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GT] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GW] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.GY] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.HK] = [LANG.EN, LANG.ZH], _COUNTRY_LANGS[COUNTRY.HN] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.HR] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.HU] = [LANG.HU, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ID] = [LANG.ID, LANG.EN], _COUNTRY_LANGS[COUNTRY.IE] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.IL] = [LANG.HE, LANG.EN], _COUNTRY_LANGS[COUNTRY.IN] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.IS] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.IT] = [LANG.IT, LANG.EN], _COUNTRY_LANGS[COUNTRY.JM] = [LANG.EN, LANG.ES, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.JO] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.JP] = [LANG.JA, LANG.EN], _COUNTRY_LANGS[COUNTRY.KE] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KH] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.KI] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KM] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KN] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KR] = [LANG.KO, LANG.EN], _COUNTRY_LANGS[COUNTRY.KW] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KY] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.KZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LA] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.LC] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LI] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LK] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.LS] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LT] = [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LU] = [LANG.EN, LANG.DE, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.LV] = [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MA] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MC] = [LANG.FR, LANG.EN], _COUNTRY_LANGS[COUNTRY.MD] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.ME] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.MG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MH] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MK] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.ML] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MN] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.MQ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MR] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MS] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MT] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.MU] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MV] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.MW] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.MX] = [LANG.ES, LANG.EN], _COUNTRY_LANGS[COUNTRY.MY] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.MZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NA] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NC] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NE] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NF] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NG] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.NI] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NL] = [LANG.NL, LANG.EN], _COUNTRY_LANGS[COUNTRY.NO] = [LANG.NO, LANG.EN], _COUNTRY_LANGS[COUNTRY.NP] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.NR] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NU] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.NZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.OM] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PA] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PE] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PF] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PH] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.PL] = [LANG.PL, LANG.EN], _COUNTRY_LANGS[COUNTRY.PM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PN] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PT] = [LANG.PT, LANG.EN], _COUNTRY_LANGS[COUNTRY.PW] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.PY] = [LANG.ES, LANG.EN], _COUNTRY_LANGS[COUNTRY.QA] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR], _COUNTRY_LANGS[COUNTRY.RE] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.RO] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.RS] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.RU] = [LANG.RU, LANG.EN], _COUNTRY_LANGS[COUNTRY.RW] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SA] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SB] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SC] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SE] = [LANG.SV, LANG.EN], _COUNTRY_LANGS[COUNTRY.SG] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.SH] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SI] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SJ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SK] = [LANG.SK, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SL] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SN] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SO] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SR] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ST] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SV] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.SZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TC] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TD] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TG] = [LANG.FR, LANG.EN, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TH] = [LANG.TH, LANG.EN], _COUNTRY_LANGS[COUNTRY.TJ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TN] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TO] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.TR] = [LANG.TR, LANG.EN], _COUNTRY_LANGS[COUNTRY.TT] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TV] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.TW] = [LANG.ZH, LANG.EN], _COUNTRY_LANGS[COUNTRY.TZ] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.UA] = [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.UG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.US] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.UY] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.VA] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.VC] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.VE] = [LANG.ES, LANG.EN, LANG.FR, LANG.ZH], _COUNTRY_LANGS[COUNTRY.VG] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.VN] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.VU] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.WF] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.WS] = [LANG.EN], _COUNTRY_LANGS[COUNTRY.YE] = [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.YT] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ZA] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ZM] = [LANG.EN, LANG.FR, LANG.ES, LANG.ZH], _COUNTRY_LANGS[COUNTRY.ZW] = [LANG.EN], _COUNTRY_LANGS);
// CONCATENATED MODULE: ./node_modules/paypal-sdk-constants/src/params.js
var SDK_SETTINGS = {
    CLIENT_TOKEN: 'data-client-token',
    PARTNER_ATTRIBUTION_ID: 'data-partner-attribution-id',
    STAGE_HOST: 'data-stage-host',
    API_STAGE_HOST: 'data-api-stage-host'
};

var SDK_QUERY = {
    CLIENT_ID: 'client-id'
};

var SDK_QUERY_KEYS = {
    COMPONENTS: 'components',

    ENV: 'env',
    DEBUG: 'debug',
    CACHEBUST: 'cachebust',

    CLIENT_ID: 'client-id',
    MERCHANT_ID: 'merchant-id',

    LOCALE_COUNTRY: 'locale-country',
    LOCALE_LANG: 'locale-lang',

    ORDER_CURRENCY: 'order-currency',
    ORDER_INTENT: 'order-intent',
    ORDER_COMMIT: 'order-commit',
    ORDER_VAULT: 'order-vault'
};
// CONCATENATED MODULE: ./node_modules/paypal-sdk-constants/src/env.js
var ENV = {
    LOCAL: 'local',
    STAGE: 'stage',
    SANDBOX: 'sandbox',
    PRODUCTION: 'production',
    TEST: 'test'
};
// CONCATENATED MODULE: ./node_modules/paypal-sdk-constants/src/fpti.js
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
    USER_AGENT: 'user_agent'
};

var FPTI_DATA_SOURCE = {
    PAYMENTS_SDK: 'payments_sdk'
};

var FPTI_FEED = {
    PAYMENTS_SDK: 'payments_sdk'
};

var FPTI_SDK_NAME = {
    PAYMENTS_SDK: 'payments_sdk'
};
// CONCATENATED MODULE: ./node_modules/paypal-sdk-constants/src/order.js
var INTENT = {
    CAPTURE: 'capture',
    AUTH: 'auth',
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
// CONCATENATED MODULE: ./node_modules/paypal-sdk-constants/src/platform.js
var PLATFORM = {
    DESKTOP: 'desktop',
    MOBILE: 'mobile'
};
// CONCATENATED MODULE: ./node_modules/paypal-sdk-constants/src/funding.js
var FUNDING = {
    PAYPAL: 'paypal',
    VENMO: 'venmo',
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
    ZIMPLER: 'zimpler',
    WECHATPAY: 'wechatpay'
};

var CARD = {
    VISA: 'visa',
    MASTERCARD: 'mastercard',
    AMEX: 'amex',
    DISCOVER: 'discover',
    HIPER: 'hiper',
    ELO: 'elo',
    JCB: 'jcb'
};
// CONCATENATED MODULE: ./node_modules/paypal-sdk-constants/src/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "c", function() { return COUNTRY; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "h", function() { return LANG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "d", function() { return COUNTRY_LANGS; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return SDK_SETTINGS; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return SDK_QUERY; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return SDK_QUERY_KEYS; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "e", function() { return ENV; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return FPTI_KEY; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return FPTI_DATA_SOURCE; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return FPTI_FEED; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return FPTI_SDK_NAME; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "g", function() { return INTENT; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return COMMIT; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "j", function() { return VAULT; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return CURRENCY; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "i", function() { return PLATFORM; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "f", function() { return FUNDING; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return CARD; });








/***/ }),

/***/ "./node_modules/zalgo-promise/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/utils.js
function utils_isPromise(item) {
    try {
        if (!item) {
            return false;
        }

        if (typeof Promise !== 'undefined' && item instanceof Promise) {
            return true;
        }

        if (typeof window !== 'undefined' && window.Window && item instanceof window.Window) {
            return false;
        }

        if (typeof window !== 'undefined' && window.constructor && item instanceof window.constructor) {
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
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/global.js
function getGlobal() {

    var glob = void 0;

    if (typeof window !== 'undefined') {
        glob = window;
    } else if (typeof global !== 'undefined') {
        glob = global;
    } else {
        throw new TypeError('Can not find global');
    }

    var zalgoGlobal = global.__zalgopromise__ = global.__zalgopromise__ || {};
    zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
    zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
    zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
    zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];

    return zalgoGlobal;
}
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/exceptions.js



function dispatchPossiblyUnhandledError(err, promise) {

    if (getGlobal().dispatchedErrors.indexOf(err) !== -1) {
        return;
    }

    getGlobal().dispatchedErrors.push(err);

    setTimeout(function () {
        if (false) {
            // $FlowFixMe
            throw new Error((err.stack || err.toString()) + '\n\nFrom promise:\n\n' + promise.stack);
        }

        throw err;
    }, 1);

    for (var j = 0; j < getGlobal().possiblyUnhandledPromiseHandlers.length; j++) {
        getGlobal().possiblyUnhandledPromiseHandlers[j](err, promise);
    }
}

function exceptions_onPossiblyUnhandledException(handler) {
    getGlobal().possiblyUnhandledPromiseHandlers.push(handler);

    return {
        cancel: function cancel() {
            getGlobal().possiblyUnhandledPromiseHandlers.splice(getGlobal().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
        }
    };
}
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/promise.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var promise_ZalgoPromise = function () {
    function ZalgoPromise(handler) {
        var _this = this;

        _classCallCheck(this, ZalgoPromise);

        this.resolved = false;
        this.rejected = false;
        this.errorHandled = false;

        this.handlers = [];

        if (handler) {

            var _result = void 0;
            var _error = void 0;
            var resolved = false;
            var rejected = false;
            var isAsync = false;

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
                this.reject(err);
                return;
            }

            isAsync = true;

            if (resolved) {
                // $FlowFixMe
                this.resolve(_result);
            } else if (rejected) {
                this.reject(_error);
            }
        }

        if (false) {
            try {
                throw new Error('ZalgoPromise');
            } catch (err) {
                this.stack = err.stack;
            }
        }
    }

    ZalgoPromise.prototype.resolve = function resolve(result) {
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

    ZalgoPromise.prototype.reject = function reject(error) {
        var _this2 = this;

        if (this.resolved || this.rejected) {
            return this;
        }

        if (utils_isPromise(error)) {
            throw new Error('Can not reject promise with another promise');
        }

        if (!error) {
            var _err = error && typeof error.toString === 'function' ? error.toString() : Object.prototype.toString.call(error);
            error = new Error('Expected reject to be called with Error, got ' + _err);
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

    ZalgoPromise.prototype.asyncReject = function asyncReject(error) {
        this.errorHandled = true;
        this.reject(error);
    };

    // eslint-disable-next-line complexity


    ZalgoPromise.prototype.dispatch = function dispatch() {
        var _this3 = this;

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
        getGlobal().activeCount += 1;

        var _loop = function _loop(i) {
            var _handlers$i = handlers[i],
                onSuccess = _handlers$i.onSuccess,
                onError = _handlers$i.onError,
                promise = _handlers$i.promise;


            var result = void 0;

            if (resolved) {

                try {
                    result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                } catch (err) {
                    promise.reject(err);
                    return 'continue';
                }
            } else if (rejected) {

                if (!onError) {
                    promise.reject(_this3.error);
                    return 'continue';
                }

                try {
                    result = onError(_this3.error);
                } catch (err) {
                    promise.reject(err);
                    return 'continue';
                }
            }

            if (result instanceof ZalgoPromise && (result.resolved || result.rejected)) {

                if (result.resolved) {
                    promise.resolve(result.value);
                } else {
                    promise.reject(result.error);
                }

                result.errorHandled = true;
            } else if (utils_isPromise(result)) {

                if (result instanceof ZalgoPromise && (result.resolved || result.rejected)) {
                    if (result.resolved) {
                        promise.resolve(result.value);
                    } else {
                        promise.reject(result.error);
                    }
                } else {
                    // $FlowFixMe
                    result.then(function (res) {
                        promise.resolve(res);
                    }, function (err) {
                        promise.reject(err);
                    });
                }
            } else {

                promise.resolve(result);
            }
        };

        for (var i = 0; i < handlers.length; i++) {
            var _ret = _loop(i);

            if (_ret === 'continue') continue;
        }

        handlers.length = 0;
        this.dispatching = false;
        getGlobal().activeCount -= 1;

        if (getGlobal().activeCount === 0) {
            ZalgoPromise.flushQueue();
        }
    };

    ZalgoPromise.prototype.then = function then(onSuccess, onError) {

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

    ZalgoPromise.prototype['catch'] = function _catch(onError) {
        return this.then(undefined, onError);
    };

    ZalgoPromise.prototype['finally'] = function _finally(onFinally) {

        if (onFinally && typeof onFinally !== 'function' && !onFinally.call) {
            throw new Error('Promise.finally expected a function');
        }

        return this.then(function (result) {
            return ZalgoPromise['try'](onFinally).then(function () {
                return result;
            });
        }, function (err) {
            return ZalgoPromise['try'](onFinally).then(function () {
                throw err;
            });
        });
    };

    ZalgoPromise.prototype.timeout = function timeout(time, err) {
        var _this4 = this;

        if (this.resolved || this.rejected) {
            return this;
        }

        var timeout = setTimeout(function () {

            if (_this4.resolved || _this4.rejected) {
                return;
            }

            _this4.reject(err || new Error('Promise timed out after ' + time + 'ms'));
        }, time);

        return this.then(function (result) {
            clearTimeout(timeout);
            return result;
        });
    };

    // $FlowFixMe


    ZalgoPromise.prototype.toPromise = function toPromise() {
        // $FlowFixMe
        if (typeof Promise === 'undefined') {
            throw new TypeError('Could not find Promise');
        }
        // $FlowFixMe
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

    ZalgoPromise.all = function all(promises) {
        // eslint-disable-line no-undef

        var promise = new ZalgoPromise();
        var count = promises.length;
        var results = [];

        if (!count) {
            promise.resolve(results);
            return promise;
        }

        var _loop2 = function _loop2(i) {
            var prom = promises[i];

            if (prom instanceof ZalgoPromise) {
                if (prom.resolved) {
                    results[i] = prom.value;
                    count -= 1;
                    return 'continue';
                }
            } else if (!utils_isPromise(prom)) {
                results[i] = prom;
                count -= 1;
                return 'continue';
            }

            ZalgoPromise.resolve(prom).then(function (result) {
                results[i] = result;
                count -= 1;
                if (count === 0) {
                    promise.resolve(results);
                }
            }, function (err) {
                promise.reject(err);
            });
        };

        for (var i = 0; i < promises.length; i++) {
            var _ret2 = _loop2(i);

            if (_ret2 === 'continue') continue;
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

    ZalgoPromise['try'] = function _try(method, context, args) {

        if (method && typeof method !== 'function' && !method.call) {
            throw new Error('Promise.try expected a function');
        }

        var result = void 0;

        try {
            // $FlowFixMe
            result = method.apply(context, args || []);
        } catch (err) {
            return ZalgoPromise.reject(err);
        }

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
        var promise = new ZalgoPromise();
        getGlobal().flushPromises.push(promise);

        if (getGlobal().activeCount === 0) {
            ZalgoPromise.flushQueue();
        }

        return promise;
    };

    ZalgoPromise.flushQueue = function flushQueue() {
        var promisesToFlush = getGlobal().flushPromises;
        getGlobal().flushPromises = [];

        for (var _i2 = 0, _length2 = promisesToFlush == null ? 0 : promisesToFlush.length; _i2 < _length2; _i2++) {
            var _promise = promisesToFlush[_i2];
            _promise.resolve();
        }
    };

    return ZalgoPromise;
}();


// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return promise_ZalgoPromise; });


/***/ }),

/***/ "./src/buttons/template/componentTemplate.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/paypal-braintree-web-client/src/index.js
var src = __webpack_require__("./node_modules/paypal-braintree-web-client/src/index.js");

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var belter_src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var paypal_sdk_constants_src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/config.js
var _FUNDING_CONFIG;





var FUNDING_PRIORITY = [paypal_sdk_constants_src["f" /* FUNDING */].PAYPAL, paypal_sdk_constants_src["f" /* FUNDING */].VENMO, paypal_sdk_constants_src["f" /* FUNDING */].CREDIT, paypal_sdk_constants_src["f" /* FUNDING */].IDEAL, paypal_sdk_constants_src["f" /* FUNDING */].SEPA, paypal_sdk_constants_src["f" /* FUNDING */].BANCONTACT, paypal_sdk_constants_src["f" /* FUNDING */].GIROPAY, paypal_sdk_constants_src["f" /* FUNDING */].EPS, paypal_sdk_constants_src["f" /* FUNDING */].SOFORT, paypal_sdk_constants_src["f" /* FUNDING */].MYBANK, paypal_sdk_constants_src["f" /* FUNDING */].P24, paypal_sdk_constants_src["f" /* FUNDING */].ZIMPLER, paypal_sdk_constants_src["f" /* FUNDING */].WECHATPAY, paypal_sdk_constants_src["f" /* FUNDING */].CARD];

var FUNDING_CONFIG = (_FUNDING_CONFIG = {}, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].PAYPAL] =  true ? __webpack_require__("./src/funding/paypal/index.js").PAYPAL_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].VENMO] =  true ? __webpack_require__("./src/funding/venmo/index.js").VENMO_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].CREDIT] =  true ? __webpack_require__("./src/funding/credit/index.js").CREDIT_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].CARD] =  true ? __webpack_require__("./src/funding/card/index.js").CARD_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].IDEAL] =  true ? __webpack_require__("./src/funding/ideal/index.js").IDEAL_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].SEPA] =  true ? __webpack_require__("./src/funding/sepa/index.js").SEPA_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].BANCONTACT] =  true ? __webpack_require__("./src/funding/bancontact/index.js").BANCONTACT_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].GIROPAY] =  true ? __webpack_require__("./src/funding/giropay/index.js").GIROPAY_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].SOFORT] =  true ? __webpack_require__("./src/funding/sofort/index.js").SOFORT_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].EPS] =  true ? __webpack_require__("./src/funding/eps/index.js").EPS_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].MYBANK] =  true ? __webpack_require__("./src/funding/mybank/index.js").MYBANK_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].P24] =  true ? __webpack_require__("./src/funding/p24/index.js").P24_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].ZIMPLER] =  true ? __webpack_require__("./src/funding/zimpler/index.js").ZIMPLER_CONFIG : null, _FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].WECHATPAY] =  true ? __webpack_require__("./src/funding/wechatpay/index.js").WECHATPAY_CONFIG : null, _FUNDING_CONFIG);
// CONCATENATED MODULE: ./src/funding/funding.js







function isFundingEligible(source, _ref) {
    var layout = _ref.layout,
        platform = _ref.platform,
        remembered = _ref.remembered,
        fundingEligibility = _ref.fundingEligibility;


    if (!fundingEligibility[source].eligible) {
        return false;
    }

    var fundingConfig = FUNDING_CONFIG[source];

    if (!fundingConfig) {
        throw new Error('Can not find funding config for ' + source);
    }

    if (fundingConfig.layouts && fundingConfig.layouts.indexOf(layout) === -1) {
        return false;
    }

    if (fundingConfig.platforms && fundingConfig.platforms.indexOf(platform) === -1) {
        return false;
    }

    if (fundingConfig.rememberedOnly && remembered && remembered.indexOf(source) === -1) {
        return false;
    }

    return true;
}

function determineEligibleFunding(_ref2) {
    var style = _ref2.style,
        platform = _ref2.platform,
        remembered = _ref2.remembered,
        fundingEligibility = _ref2.fundingEligibility;
    var layout = style.layout;


    var eligibleFunding = FUNDING_PRIORITY.filter(function (source) {
        return isFundingEligible(source, { layout: layout, platform: platform, remembered: remembered, fundingEligibility: fundingEligibility });
    });

    if (layout === constants["d" /* BUTTON_LAYOUT */].HORIZONTAL) {
        eligibleFunding = eligibleFunding.slice(0, 2);
    }

    return eligibleFunding;
}
// CONCATENATED MODULE: ./src/funding/index.js


// CONCATENATED MODULE: ./src/buttons/config.js
var _MINIMUM_SIZE, _MAXIMUM_SIZE, _BUTTON_SIZE_STYLE;

/* eslint no-template-curly-in-string: off, max-lines: off */



var MINIMUM_SIZE = (_MINIMUM_SIZE = {}, _MINIMUM_SIZE[constants["d" /* BUTTON_LAYOUT */].HORIZONTAL] = constants["h" /* BUTTON_SIZE */].SMALL, _MINIMUM_SIZE[constants["d" /* BUTTON_LAYOUT */].VERTICAL] = constants["h" /* BUTTON_SIZE */].MEDIUM, _MINIMUM_SIZE);

var MAXIMUM_SIZE = (_MAXIMUM_SIZE = {}, _MAXIMUM_SIZE[constants["d" /* BUTTON_LAYOUT */].HORIZONTAL] = constants["h" /* BUTTON_SIZE */].HUGE, _MAXIMUM_SIZE[constants["d" /* BUTTON_LAYOUT */].VERTICAL] = constants["h" /* BUTTON_SIZE */].HUGE, _MAXIMUM_SIZE);

var BUTTON_RELATIVE_STYLE = {
    TAGLINE: 50,
    VERTICAL_MARGIN: 30
};

var BUTTON_SIZE_STYLE = (_BUTTON_SIZE_STYLE = {}, _BUTTON_SIZE_STYLE[constants["h" /* BUTTON_SIZE */].TINY] = {
    defaultWidth: 75,
    defaultHeight: 25,
    minWidth: 75,
    maxWidth: 150,
    minHeight: 25,
    maxHeight: 30,
    allowFunding: true,
    allowTagline: false
}, _BUTTON_SIZE_STYLE[constants["h" /* BUTTON_SIZE */].SMALL] = {
    defaultWidth: 150,
    defaultHeight: 25,
    minWidth: 150,
    maxWidth: 200,
    minHeight: 25,
    maxHeight: 55,
    allowFunding: true,
    allowTagline: true
}, _BUTTON_SIZE_STYLE[constants["h" /* BUTTON_SIZE */].MEDIUM] = {
    defaultWidth: 250,
    defaultHeight: 35,
    minWidth: 200,
    maxWidth: 300,
    minHeight: 35,
    maxHeight: 55,
    allowFunding: true,
    allowTagline: true
}, _BUTTON_SIZE_STYLE[constants["h" /* BUTTON_SIZE */].LARGE] = {
    defaultWidth: 350,
    defaultHeight: 45,
    minWidth: 300,
    maxWidth: 500,
    minHeight: 30,
    maxHeight: 55,
    allowFunding: true,
    allowTagline: true
}, _BUTTON_SIZE_STYLE[constants["h" /* BUTTON_SIZE */].HUGE] = {
    defaultWidth: 500,
    defaultHeight: 55,
    minWidth: 500,
    maxWidth: 750,
    minHeight: 40,
    maxHeight: 55,
    allowFunding: true,
    allowTagline: true
}, _BUTTON_SIZE_STYLE);
// CONCATENATED MODULE: ./src/buttons/props.js









var DEFAULT_STYLE = {
    LABEL: constants["c" /* BUTTON_LABEL */].PAYPAL,
    LAYOUT: constants["d" /* BUTTON_LAYOUT */].VERTICAL,
    COLOR: constants["b" /* BUTTON_COLOR */].GOLD,
    SHAPE: constants["g" /* BUTTON_SHAPE */].RECT
};

var DEFAULT_PROPS = {
    LOCALE: {
        country: paypal_sdk_constants_src["c" /* COUNTRY */].US,
        lang: paypal_sdk_constants_src["h" /* LANG */].EN
    },
    COMMIT: paypal_sdk_constants_src["b" /* COMMIT */].TRUE,
    VAULT: paypal_sdk_constants_src["j" /* VAULT */].FALSE,
    INTENT: paypal_sdk_constants_src["g" /* INTENT */].CAPTURE,
    ENV: paypal_sdk_constants_src["e" /* ENV */].PRODUCTION,
    PLATFORM: paypal_sdk_constants_src["i" /* PLATFORM */].DESKTOP
};

function normalizeButtonStyle(style, _ref) {
    var locale = _ref.locale;


    if (!style) {
        throw new Error('Expected props.style to be set');
    }

    var country = locale.country;
    var _style$label = style.label,
        label = _style$label === undefined ? DEFAULT_STYLE.LABEL : _style$label,
        _style$layout = style.layout,
        layout = _style$layout === undefined ? DEFAULT_STYLE.LAYOUT : _style$layout,
        _style$color = style.color,
        color = _style$color === undefined ? DEFAULT_STYLE.COLOR : _style$color,
        _style$shape = style.shape,
        shape = _style$shape === undefined ? DEFAULT_STYLE.SHAPE : _style$shape,
        _style$tagline = style.tagline,
        tagline = _style$tagline === undefined ? layout === constants["d" /* BUTTON_LAYOUT */].HORIZONTAL : _style$tagline,
        height = style.height,
        period = style.period;


    var funding = Object.keys(FUNDING_CONFIG).find(function (name) {
        return FUNDING_CONFIG[name] && FUNDING_CONFIG[name].labels[label];
    });

    if (!funding) {
        throw new Error('Invalid button label: ' + label);
    }

    var fundingConfig = FUNDING_CONFIG[funding];

    if (!fundingConfig) {
        throw new Error('Can not find funding config for ' + funding);
    }

    var labelConfig = fundingConfig.labels[label];

    if (!labelConfig) {
        throw new Error('Can not find label config for ' + label);
    }

    if (!labelConfig.allowPrimary) {
        throw new Error('Label ' + label + ' can not be used as primary button label');
    }

    if (color && labelConfig.colors.indexOf(color) === -1) {
        throw new Error('Unexpected style.color for ' + label + ' button: ' + color + ', expected ' + labelConfig.colors.join(', '));
    }

    if (shape && labelConfig.shapes.indexOf(shape) === -1) {
        throw new Error('Unexpected style.shape for ' + label + ' button: ' + shape + ', expected ' + labelConfig.shapes.join(', '));
    }

    if (labelConfig.allowedCountries && labelConfig.allowedCountries.indexOf(country) === -1) {
        throw new Error('Label ' + label + ' invalid for country ' + country);
    }

    if (period && labelConfig.allowedPeriods && labelConfig.allowedPeriods[country].indexOf(period) === -1) {
        throw new Error('Period ' + period + ' invalid for country ' + country);
    }

    if (height !== undefined) {
        if (typeof height !== 'number') {
            throw new TypeError('Expected style.height to be a number, got: ' + height);
        }

        var _ref2 = [BUTTON_SIZE_STYLE[constants["h" /* BUTTON_SIZE */].SMALL].minHeight, BUTTON_SIZE_STYLE[constants["h" /* BUTTON_SIZE */].HUGE].maxHeight],
            minHeight = _ref2[0],
            maxHeight = _ref2[1];


        if (height < minHeight || height > maxHeight) {
            throw new Error('Expected style.height to be between ' + minHeight + 'px and ' + maxHeight + 'px - got ' + height + 'px');
        }
    }

    if (layout === constants["d" /* BUTTON_LAYOUT */].VERTICAL) {
        if (tagline) {
            throw new Error('style.tagline is not allowed for ' + constants["d" /* BUTTON_LAYOUT */].VERTICAL + ' layout');
        }
    }

    return { label: label, layout: layout, color: color, shape: shape, tagline: tagline, height: height, period: period };
}

var COUNTRIES = Object(belter_src["values"])(paypal_sdk_constants_src["c" /* COUNTRY */]);
var FUNDING_SOURCES = Object(belter_src["values"])(paypal_sdk_constants_src["f" /* FUNDING */]);
var ENVS = Object(belter_src["values"])(paypal_sdk_constants_src["e" /* ENV */]);
var PLATFORMS = Object(belter_src["values"])(paypal_sdk_constants_src["i" /* PLATFORM */]);

function normalizeButtonProps(props) {

    if (!props) {
        throw new Error('Expected props');
    }

    var clientID = props.clientID,
        _props$style = props.style,
        style = _props$style === undefined ? {} : _props$style,
        _props$remembered = props.remembered,
        remembered = _props$remembered === undefined ? [] : _props$remembered,
        _props$locale = props.locale,
        locale = _props$locale === undefined ? DEFAULT_PROPS.LOCALE : _props$locale,
        _props$env = props.env,
        env = _props$env === undefined ? DEFAULT_PROPS.ENV : _props$env,
        _props$platform = props.platform,
        platform = _props$platform === undefined ? DEFAULT_PROPS.PLATFORM : _props$platform,
        _props$commit = props.commit,
        commit = _props$commit === undefined ? DEFAULT_PROPS.COMMIT : _props$commit,
        fundingEligibility = props.fundingEligibility,
        _props$sessionID = props.sessionID,
        sessionID = _props$sessionID === undefined ? Object(belter_src["uniqueID"])() : _props$sessionID,
        _props$buttonSessionI = props.buttonSessionID,
        buttonSessionID = _props$buttonSessionI === undefined ? Object(belter_src["uniqueID"])() : _props$buttonSessionI,
        _props$nonce = props.nonce,
        nonce = _props$nonce === undefined ? '' : _props$nonce;
    var country = locale.country,
        lang = locale.lang;


    if (!country || COUNTRIES.indexOf(country) === -1) {
        throw new Error('Expected valid country, got ' + (country || 'undefined'));
    }

    if (!lang || paypal_sdk_constants_src["d" /* COUNTRY_LANGS */][country].indexOf(lang) === -1) {
        throw new Error('Expected valid lang, got ' + (lang || 'undefined'));
    }

    if (remembered.find(function (source) {
        return FUNDING_SOURCES.indexOf(source) === -1;
    })) {
        throw new Error('Expected valid funding sources, got ' + JSON.stringify(remembered));
    }

    if (ENVS.indexOf(env) === -1) {
        throw new Error('Expected valid env, got ' + (env || 'undefined'));
    }

    if (!fundingEligibility) {
        throw new Error('Expected fundingEligibility');
    }

    if (PLATFORMS.indexOf(platform) === -1) {
        throw new Error('Expected valid platform, got ' + (platform || 'undefined'));
    }

    style = normalizeButtonStyle(style, { locale: locale });

    return { clientID: clientID, style: style, locale: locale, remembered: remembered, env: env, fundingEligibility: fundingEligibility, platform: platform, buttonSessionID: buttonSessionID, commit: commit, sessionID: sessionID, nonce: nonce };
}
// CONCATENATED MODULE: ./src/buttons/template/componentStyle/page.js
var pageStyle = "\n    html, body {\n        padding: 0;\n        margin: 0;\n        width: 100%;\n        overflow: hidden;\n        text-align: center;\n    }\n\n    * {\n        touch-callout: none;\n        user-select: none;\n        cursor: default;\n    }\n";
// CONCATENATED MODULE: ./src/buttons/template/componentStyle/button.js




var buttonStyle = '\n\n    .' + constants["j" /* CLASS */].CONTAINER + ' {\n        display: block;\n        white-space: nowrap;\n        margin: 0;\n        background: 0;\n        border: 0;\n        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n        text-transform: none;\n        font-weight: 500;R\n        font-smoothing: antialiased;\n        z-index: 0;\n        font-size: 0;\n        width: 100%;\n        box-sizing: border-box;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + ':not(.' + constants["j" /* CLASS */].CARD + ') {\n        border: 1px solid transparent;\n        border-radius: 0 3px 3px 0;\n        position: relative;\n        width: 100%;\n        box-sizing: border-box;\n        border: none;\n        vertical-align: top;\n        cursor: pointer;\n        outline: none;\n        overflow: hidden;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].COLOR + '-' + constants["b" /* BUTTON_COLOR */].TRANSPARENT + ' {\n        cursor: auto;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + ' * {\n        cursor: pointer;\n    }\n\n    .' + constants["j" /* CLASS */].CONTAINER + '.' + constants["j" /* CLASS */].ENV + '-' + paypal_sdk_constants_src["e" /* ENV */].TEST + ' .' + constants["j" /* CLASS */].TEXT + ' {\n        font-family: Arial !important;\n        background: rgba(0, 0, 0, 0.5) !important;\n        color: transparent  !important;\n        text-shadow: none  !important;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + ':hover {\n        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].COLOR + '-' + constants["b" /* BUTTON_COLOR */].GOLD + ':hover,\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].COLOR + '-' + constants["b" /* BUTTON_COLOR */].SILVER + ':hover {\n        box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.05);\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].COLOR + '-' + constants["b" /* BUTTON_COLOR */].TRANSPARENT + ':hover {\n        box-shadow: none;\n    }\n\n    .' + constants["j" /* CLASS */].CARD + ', .' + constants["j" /* CLASS */].CARD + ' * {\n        cursor: pointer;\n    }\n\n    .' + constants["j" /* CLASS */].CARD + ':hover {\n        filter: brightness(1.2);\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + ':focus {\n        box-shadow: -1px -1px 18px 1px rgba(0, 0, 0, 0.25) inset;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].COLOR + '-' + constants["b" /* BUTTON_COLOR */].TRANSPARENT + ':focus {\n        box-shadow: none;\n    }\n\n    .' + constants["j" /* CLASS */].LOGO + ' {\n        padding: 0;\n        display: inline-block;\n        background: none;\n        border: none;\n        width: auto;\n    }\n\n    .' + constants["j" /* CLASS */].TEXT + ' {\n        display: inline-block;\n        white-space: pre-wrap;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + ' .' + constants["j" /* CLASS */].LOGO + ',\n    .' + constants["j" /* CLASS */].BUTTON + ' .' + constants["j" /* CLASS */].TEXT + ' {\n        vertical-align: top;\n        position: relative;\n        top: 50%;\n        transform: translateY(-50%);\n        text-align: left;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + ' .' + constants["j" /* CLASS */].TEXT + ' {\n        visibility: hidden;\n    }\n\n    .' + constants["j" /* CLASS */].TAGLINE + ' {\n        max-width: 100%;\n        font-weight: normal;\n        display: block;\n        text-align: center;\n        width: auto;\n        visibility: hidden;\n    }\n\n    .' + constants["j" /* CLASS */].SEPARATOR + ' {\n        height: 80%;\n        border-left: 1px solid rgba(0, 0, 0, 0.15);\n        margin: 0 8px;\n        display: inline-block;\n        position: relative;\n        top: 10%;\n    }\n';
// CONCATENATED MODULE: ./src/buttons/template/componentStyle/layout.js


var layoutStyle = '\n\n    .' + constants["j" /* CLASS */].CONTAINER + '.' + constants["j" /* CLASS */].LAYOUT + '-' + constants["d" /* BUTTON_LAYOUT */].VERTICAL + ' .' + constants["j" /* CLASS */].TAGLINE + ' {\n        display: none;\n    }\n';
// CONCATENATED MODULE: ./src/buttons/template/componentStyle/labels.js



var labelStyle = '\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].LABEL + '-' + constants["c" /* BUTTON_LABEL */].CARD + ' {\n        border-radius: 0 !important;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].LABEL + '-' + constants["c" /* BUTTON_LABEL */].CREDIT + ' .' + constants["j" /* CLASS */].TEXT + ' {\n        display: none !important;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].LAYOUT + '-' + constants["d" /* BUTTON_LAYOUT */].HORIZONTAL + '.' + constants["j" /* CLASS */].NUMBER + '-' + constants["f" /* BUTTON_NUMBER */].MULTIPLE + '.' + constants["j" /* CLASS */].LABEL + '-' + constants["c" /* BUTTON_LABEL */].CREDIT + ' .' + constants["j" /* CLASS */].LOGO + '.' + constants["j" /* CLASS */].LOGO + '-' + constants["e" /* BUTTON_LOGO */].PAYPAL + ' {\n        display: none;\n    }\n\n    @media only screen and (max-width : ' + BUTTON_SIZE_STYLE[constants["h" /* BUTTON_SIZE */].SMALL].minWidth + 'px) {\n\n        .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].LABEL + '-' + constants["c" /* BUTTON_LABEL */].CREDIT + ' .' + constants["j" /* CLASS */].LOGO + '.' + constants["j" /* CLASS */].LOGO + '-' + constants["e" /* BUTTON_LOGO */].PAYPAL + ' {\n            display: none;\n        }\n    }\n\n    @media only screen and (min-width : ' + BUTTON_SIZE_STYLE[constants["h" /* BUTTON_SIZE */].SMALL].minWidth + 'px) {\n\n        .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].LABEL + '-' + constants["c" /* BUTTON_LABEL */].CREDIT + ' .' + constants["j" /* CLASS */].LOGO + '.' + constants["j" /* CLASS */].LOGO + '-' + constants["e" /* BUTTON_LOGO */].PAYPAL + ' {\n            display: inline-block;\n        }\n    }\n';
// CONCATENATED MODULE: ./src/buttons/template/componentStyle/responsive.js





var DUAL_BUTTON_MIN_RATIO = 2.8;

function buttonResponsiveStyle(_ref) {
    var height = _ref.height,
        _ref$cardNumber = _ref.cardNumber,
        cardNumber = _ref$cardNumber === undefined ? 4 : _ref$cardNumber;


    return Object.keys(BUTTON_SIZE_STYLE).map(function (size) {

        var style = BUTTON_SIZE_STYLE[size];
        var buttonHeight = height || style.defaultHeight;
        var minDualWidth = Math.round(buttonHeight * DUAL_BUTTON_MIN_RATIO * 2);

        return '\n\n            @media only screen and (min-width: ' + style.minWidth + 'px) {\n\n                .' + constants["j" /* CLASS */].CONTAINER + ' {\n                    min-width: ' + style.minWidth + 'px;\n                    max-width: ' + style.maxWidth + 'px;\n                    font-size: ' + Object(belter_src["max"])(Object(belter_src["perc"])(buttonHeight, 32), 10) + 'px;\n                }\n\n                .' + constants["j" /* CLASS */].BUTTON + ':not(.' + constants["j" /* CLASS */].CARD + ') {\n                    height: ' + buttonHeight + 'px;\n                    min-height: ' + (height || style.minHeight) + 'px;\n                    max-height: ' + (height || style.maxHeight) + 'px;\n                }\n\n                .' + constants["j" /* CLASS */].LOGO + ' {\n                    height: ' + (Object(belter_src["perc"])(buttonHeight, 35) + 5) + 'px;\n                    max-height: ' + Object(belter_src["perc"])(buttonHeight, 60) + 'px;\n                    min-height: ' + Object(belter_src["perc"])(buttonHeight, 40) + 'px;\n                }\n                \n                .' + constants["j" /* CLASS */].LOGO + '.' + constants["j" /* CLASS */].LOGO + '-' + constants["c" /* BUTTON_LABEL */].EPS + ',\n                .' + constants["j" /* CLASS */].LOGO + '.' + constants["j" /* CLASS */].LOGO + '-' + constants["c" /* BUTTON_LABEL */].MYBANK + ' {\n                    height: ' + (Object(belter_src["perc"])(buttonHeight, 50) + 5) + 'px;\n                    max-height: ' + Object(belter_src["perc"])(buttonHeight, 70) + 'px;\n                    min-height: ' + Object(belter_src["perc"])(buttonHeight, 40) + 'px;\n                }\n\n                .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].SHAPE + '-' + constants["g" /* BUTTON_SHAPE */].PILL + ':not(' + constants["j" /* CLASS */].LABEL + '-' + constants["j" /* CLASS */].CARD + ') {\n                    border-radius: ' + Math.ceil(buttonHeight / 2) + 'px;\n                }\n\n                .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].SHAPE + '-' + constants["g" /* BUTTON_SHAPE */].RECT + ' {\n                    border-radius: 4px;\n                }\n\n                .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].LAYOUT + '-' + constants["d" /* BUTTON_LAYOUT */].VERTICAL + ' {\n                    margin-bottom: ' + Object(belter_src["perc"])(buttonHeight, BUTTON_RELATIVE_STYLE.VERTICAL_MARGIN) + 'px;\n                }\n\n                .' + constants["j" /* CLASS */].SEPARATOR + ' {\n                    margin: 0 ' + Object(belter_src["perc"])(buttonHeight, 5) + 'px;\n                }\n\n                .' + constants["j" /* CLASS */].TAGLINE + ' {\n                    height: ' + Object(belter_src["perc"])(buttonHeight, BUTTON_RELATIVE_STYLE.TAGLINE) + 'px;\n                    line-height: ' + Object(belter_src["perc"])(buttonHeight, BUTTON_RELATIVE_STYLE.TAGLINE) + 'px;\n                }\n\n                .' + constants["j" /* CLASS */].CARD + ' {\n                    display: inline-block;\n                }\n\n                .' + constants["j" /* CLASS */].BUTTON + ' .' + constants["j" /* CLASS */].CARD + ' {\n                    width: ' + (90 / cardNumber).toFixed(2) + '%;\n                    max-width: ' + Object(belter_src["perc"])(buttonHeight, 160) + 'px;\n                    margin-top: 0;\n                    margin-left: ' + (5 / cardNumber).toFixed(2) + '%;\n                    margin-right: ' + (5 / cardNumber).toFixed(2) + '%;\n                }\n\n                .' + constants["j" /* CLASS */].BUTTON + ' .' + constants["j" /* CLASS */].CARD + ' img {\n                    width: 100%;\n                }\n            }\n\n            @media only screen and (min-width: ' + style.minWidth + 'px) and (max-width: ' + minDualWidth + 'px) {\n\n                .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].LAYOUT + '-' + constants["d" /* BUTTON_LAYOUT */].HORIZONTAL + '.' + constants["j" /* CLASS */].NUMBER + '-' + constants["f" /* BUTTON_NUMBER */].MULTIPLE + '.' + constants["j" /* CLASS */].NUMBER + '-0 {\n                    width: 100%;\n                    margin-right: 0;\n                }\n\n                .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].LAYOUT + '-' + constants["d" /* BUTTON_LAYOUT */].HORIZONTAL + '.' + constants["j" /* CLASS */].NUMBER + '-' + constants["f" /* BUTTON_NUMBER */].MULTIPLE + '.' + constants["j" /* CLASS */].NUMBER + '-1 {\n                    display: none;\n                }\n\n                .' + constants["j" /* CLASS */].CONTAINER + '.' + constants["j" /* CLASS */].LAYOUT + '-' + constants["d" /* BUTTON_LAYOUT */].HORIZONTAL + '.' + constants["j" /* CLASS */].NUMBER + '-' + constants["f" /* BUTTON_NUMBER */].MULTIPLE + ' .' + constants["j" /* CLASS */].TAGLINE + ' {\n                    display: none;\n                }\n            }\n\n            @media only screen and (min-width: ' + Object(belter_src["max"])(style.minWidth, minDualWidth) + 'px) {\n\n                .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].LAYOUT + '-' + constants["d" /* BUTTON_LAYOUT */].HORIZONTAL + '.' + constants["j" /* CLASS */].NUMBER + '-' + constants["f" /* BUTTON_NUMBER */].MULTIPLE + '.' + constants["j" /* CLASS */].NUMBER + '-0 {\n                    display: inline-block;\n                    width: calc(50% - 2px);\n                    margin-right: 4px;\n                }\n\n                .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].LAYOUT + '-' + constants["d" /* BUTTON_LAYOUT */].HORIZONTAL + '.' + constants["j" /* CLASS */].NUMBER + '-' + constants["f" /* BUTTON_NUMBER */].MULTIPLE + '.' + constants["j" /* CLASS */].NUMBER + '-1 {\n                    display: inline-block;\n                    width: calc(50% - 2px);\n                }\n\n                .' + constants["j" /* CLASS */].CONTAINER + '.' + constants["j" /* CLASS */].LAYOUT + '-' + constants["d" /* BUTTON_LAYOUT */].HORIZONTAL + '.' + constants["j" /* CLASS */].NUMBER + '-' + constants["f" /* BUTTON_NUMBER */].MULTIPLE + ' .' + constants["j" /* CLASS */].TAGLINE + ' {\n                    display: block;\n                }\n            }\n        ';
    }).join('\n');
}
// CONCATENATED MODULE: ./src/buttons/template/componentStyle/color.js


var buttonColorStyle = '\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].COLOR + '-' + constants["b" /* BUTTON_COLOR */].GOLD + ' {\n        background: #ffc439;\n        color: #111;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].COLOR + '-' + constants["b" /* BUTTON_COLOR */].BLUE + ' {\n        background: #009cde;\n        color: #fff;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].COLOR + '-' + constants["b" /* BUTTON_COLOR */].SILVER + ' {\n        background: #eee;\n        color: #111;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].COLOR + '-' + constants["b" /* BUTTON_COLOR */].DARKBLUE + ' {\n        background: #003087;\n        color: #fff;\n    }\n\n    .' + constants["j" /* CLASS */].BUTTON + '.' + constants["j" /* CLASS */].COLOR + '-' + constants["b" /* BUTTON_COLOR */].TRANSPARENT + ' {\n        background: transparent;\n        color: #111;\n    }\n';
// CONCATENATED MODULE: ./src/buttons/template/componentStyle/base.js







function componentStyle(_ref) {
    var height = _ref.height,
        cardNumber = _ref.cardNumber;

    return '\n        ' + pageStyle + '\n        ' + buttonStyle + '\n        ' + buttonColorStyle + '\n        ' + layoutStyle + '\n        ' + labelStyle + '\n        ' + buttonResponsiveStyle({ height: height, cardNumber: cardNumber }) + '\n    ';
}
// CONCATENATED MODULE: ./src/buttons/template/componentStyle/index.js

// CONCATENATED MODULE: ./src/buttons/template/componentScript.js
function getComponentScript() {

    /* istanbul ignore next */
    return function () {

        var STYLE = {
            BLOCK: 'block',
            INLINE_BLOCK: 'inline-block',
            NONE: 'none',
            VISIBLE: 'visible',
            HIDDEN: 'hidden'
        };

        function loop(method, delay, instances) {
            setTimeout(function () {
                method();
                instances -= 1;
                if (instances) {
                    loop(method, delay, instances);
                }
            }, delay);
        }

        function getElements(selector, parent) {
            parent = parent || document;
            return Array.prototype.slice.call(parent.querySelectorAll(selector));
        }

        function showElement(el) {
            var displayType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : STYLE.INLINE_BLOCK;

            el.style.display = displayType;
        }

        function hideElement(el) {
            el.style.display = STYLE.NONE;
        }

        function makeElementVisible(el) {
            el.style.visibility = STYLE.VISIBLE;
        }

        function makeElementInvisible(el) {
            el.style.visibility = STYLE.HIDDEN;
        }

        function hasDimensions(el) {
            var rect = el.getBoundingClientRect();
            return Boolean(rect.height && rect.width);
        }

        function isHidden(el) {
            var computedStyle = window.getComputedStyle(el);
            return !computedStyle || computedStyle.display === STYLE.NONE;
        }

        function displayedElementsHaveDimensions(elements) {
            return elements.every(function (el) {
                return hasDimensions(el) || isHidden(el);
            });
        }

        function onDisplay(elements, method) {
            if (displayedElementsHaveDimensions(elements)) {
                method();
                return;
            }

            var interval = setInterval(function () {
                if (displayedElementsHaveDimensions(elements)) {
                    clearInterval(interval);
                    method();
                }
            }, 5);
        }

        function isOverflowing(el) {

            if (el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight) {
                return true;
            }

            var parent = el.parentNode;

            if (!parent) {
                return false;
            }

            var e = el.getBoundingClientRect();
            // $FlowFixMe
            var p = parent.getBoundingClientRect();

            if (e.top < p.top || e.left < p.left || e.right > p.right || e.bottom > p.bottom) {
                return true;
            }

            if (e.left < 0 || e.top < 0 || e.left + e.width > window.innerWidth || e.top + e.height > window.innerHeight) {
                return true;
            }

            return false;
        }

        var images = getElements('.{ CLASS.BUTTON } .{ CLASS.LOGO }');
        var text = getElements('.{ CLASS.BUTTON } .{ CLASS.TEXT }');
        var tagline = getElements('.{ CLASS.TAGLINE }');
        var optionals = getElements('.{ CLASS.BUTTON }-label-credit .{ CLASS.BUTTON }-logo-paypal');

        function toggleOptionals() {

            if (tagline.some(isOverflowing)) {
                tagline.forEach(makeElementInvisible);
            } else {
                tagline.forEach(makeElementVisible);
            }

            text.forEach(function (el) {
                return showElement(el);
            });
            optionals.forEach(function (el) {
                return showElement(el);
            });

            if (images.some(isOverflowing) || text.some(isOverflowing)) {
                text.forEach(hideElement);
                optionals.forEach(hideElement);
            } else {
                text.forEach(makeElementVisible);
                optionals.forEach(function (el) {
                    return showElement(el);
                });
            }
        }

        toggleOptionals();

        onDisplay(images, function () {
            images.forEach(makeElementVisible);
            toggleOptionals();

            document.addEventListener('DOMContentLoaded', toggleOptionals);
            window.addEventListener('load', toggleOptionals);
            window.addEventListener('resize', toggleOptionals);
            loop(toggleOptionals, 10, 10);
        });
    };
}
// CONCATENATED MODULE: ./src/buttons/template/componentTemplate.jsx
/* harmony export (immutable) */ __webpack_exports__["Buttons"] = Buttons;
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DEFAULT_PROPS", function() { return DEFAULT_PROPS; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */


 // eslint-disable-line no-unused-vars











function getCommonClasses(_ref) {
    var style = _ref.style,
        multiple = _ref.multiple,
        env = _ref.env;
    var layout = style.layout,
        shape = style.shape;


    return [constants["j" /* CLASS */].LAYOUT + '-' + layout, constants["j" /* CLASS */].SHAPE + '-' + shape, constants["j" /* CLASS */].NUMBER + '-' + (multiple ? constants["f" /* BUTTON_NUMBER */].MULTIPLE : constants["f" /* BUTTON_NUMBER */].SINGLE), constants["j" /* CLASS */].ENV + '-' + env].join(' ');
}

function getButtonClasses(_ref2) {
    var label = _ref2.label,
        color = _ref2.color,
        logoColor = _ref2.logoColor;


    return [constants["j" /* CLASS */].LABEL + '-' + label, constants["j" /* CLASS */].COLOR + '-' + color, constants["j" /* CLASS */].LOGO_COLOR + '-' + logoColor].join(' ');
}

function determineLabel(_ref3) {
    var source = _ref3.source,
        style = _ref3.style;


    var fundingConfig = FUNDING_CONFIG[source];

    if (!fundingConfig) {
        throw new Error('Can not find config for ' + source);
    }

    var labelsConfig = fundingConfig.labels;
    var label = style.label;


    if (labelsConfig[label]) {
        return label;
    }

    if (fundingConfig.defaultLabel) {
        return fundingConfig.defaultLabel;
    }

    throw new Error('Could not determine label for ' + source);
}

function Button(_ref4) {
    var _ref5;

    var source = _ref4.source,
        style = _ref4.style,
        multiple = _ref4.multiple,
        locale = _ref4.locale,
        env = _ref4.env,
        fundingEligibility = _ref4.fundingEligibility,
        i = _ref4.i,
        nonce = _ref4.nonce;
    var color = style.color,
        period = style.period;


    var buttonLabel = determineLabel({ source: source, style: style });

    var fundingConfig = FUNDING_CONFIG[source];

    if (!fundingConfig) {
        throw new Error('Can not find funding config for ' + source);
    }

    var labelConfig = fundingConfig.labels[buttonLabel];

    if (!labelConfig) {
        throw new Error('Can not find label config for ' + buttonLabel);
    }

    var secondaryColors = labelConfig.secondaryColors;

    if (multiple && i > 0) {
        color = secondaryColors[color];
    }

    var logoColors = labelConfig.logoColors;
    var logoColor = logoColors[color];

    var Label = labelConfig.Label;


    return Object(belter_src["jsxToHTML"])(
        'div',
        _extends({}, (_ref5 = {}, _ref5[constants["a" /* ATTRIBUTE */].FUNDING_SOURCE] = source, _ref5[constants["a" /* ATTRIBUTE */].BUTTON] = true, _ref5), {
            'class': constants["j" /* CLASS */].BUTTON + ' ' + constants["j" /* CLASS */].NUMBER + '-' + i + ' ' + getCommonClasses({ style: style, multiple: multiple, env: env }) + ' ' + getButtonClasses({ label: buttonLabel, color: color, logoColor: logoColor }),
            role: 'button',
            'aria-label': source,
            tabindex: '0' }),
        Object(belter_src["jsxToHTML"])(Label, {
            nonce: nonce,
            locale: locale,
            color: color,
            logoColor: logoColor,
            period: period,
            fundingEligibility: fundingEligibility
        })
    );
}

function TagLine(_ref6) {
    var source = _ref6.source,
        style = _ref6.style,
        locale = _ref6.locale,
        multiple = _ref6.multiple;
    var tagline = style.tagline,
        label = style.label,
        color = style.color;


    if (!tagline) {
        return;
    }

    var fundingConfig = FUNDING_CONFIG[source];

    if (!fundingConfig) {
        throw new Error('Can not get config for ' + source);
    }

    var labelConfig = fundingConfig.labels[label];

    if (!labelConfig) {
        throw new Error('Can not find label config for ' + label);
    }

    var tagColors = labelConfig.tagLineColors;
    var tagColor = tagColors[color];

    var Tag = labelConfig.Tag;


    if (!Tag) {
        return;
    }

    return Object(belter_src["jsxToHTML"])(
        'div',
        { 'class': constants["j" /* CLASS */].TAGLINE + ' ' + constants["j" /* CLASS */].TAGLINE_COLOR + '-' + tagColor },
        Object(belter_src["jsxToHTML"])(Tag, { locale: locale, multiple: multiple })
    );
}

function Script(_ref7) {
    var nonce = _ref7.nonce;

    var script = getComponentScript().toString();

    script = script.replace(/\{\s*CLASS\.([A-Z0-9_]+)\s*\}/g, function (match, name) {
        return constants["j" /* CLASS */][name];
    });

    return Object(belter_src["jsxToHTML"])('script', {
        nonce: nonce,
        innerHTML: '(' + script + ')();'
    });
}

function Style(_ref8) {
    var style = _ref8.style,
        cardNumber = _ref8.cardNumber,
        nonce = _ref8.nonce;
    var height = style.height;


    return Object(belter_src["jsxToHTML"])('style', {
        nonce: nonce,
        innerHTML: componentStyle({ height: height, cardNumber: cardNumber })
    });
}

function getCardNumber(locale) {
    var cardConfig = FUNDING_CONFIG[paypal_sdk_constants_src["f" /* FUNDING */].CARD];
    var vendors = cardConfig && cardConfig.vendors;
    var maxCards = 4;

    if (cardConfig && cardConfig.maxCards && cardConfig.maxCards[locale.country]) {
        maxCards = cardConfig.maxCards[locale.country];
    }

    if (vendors) {
        var numCards = Object.keys(vendors).length;
        return Math.min(numCards, maxCards);
    } else {
        return maxCards;
    }
}

function Buttons(props) {
    var _normalizeButtonProps = normalizeButtonProps(props),
        style = _normalizeButtonProps.style,
        locale = _normalizeButtonProps.locale,
        remembered = _normalizeButtonProps.remembered,
        env = _normalizeButtonProps.env,
        fundingEligibility = _normalizeButtonProps.fundingEligibility,
        platform = _normalizeButtonProps.platform,
        nonce = _normalizeButtonProps.nonce;

    var sources = determineEligibleFunding({ style: style, remembered: remembered, platform: platform, fundingEligibility: fundingEligibility });
    var multiple = sources.length > 1;

    if (!sources.length) {
        throw new Error('No eligible funding sources found to render buttons:\n\n' + JSON.stringify(fundingEligibility, null, 4));
    }

    return Object(belter_src["jsxToHTML"])(
        'div',
        { 'class': constants["j" /* CLASS */].CONTAINER + ' ' + getCommonClasses({ style: style, multiple: multiple, env: env }) },
        Object(belter_src["jsxToHTML"])(Style, {
            nonce: nonce,
            style: style,
            cardNumber: getCardNumber(locale)
        }),
        sources.map(function (source, i) {
            return Object(belter_src["jsxToHTML"])(Button, {
                i: i,
                style: style,
                source: source,
                multiple: multiple,
                env: env,
                locale: locale,
                nonce: nonce,
                fundingEligibility: fundingEligibility
            });
        }),
        Object(belter_src["jsxToHTML"])(TagLine, {
            source: sources[0],
            style: style,
            locale: locale,
            multiple: multiple,
            env: env
        }),
        Object(belter_src["jsxToHTML"])(Script, {
            nonce: nonce
        })
    );
}

/***/ }),

/***/ "./src/config/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/paypal-braintree-web-client/src/index.js
var src = __webpack_require__("./node_modules/paypal-braintree-web-client/src/index.js");

// CONCATENATED MODULE: ./src/config/config.js


var SESSION_LIFETIME = 5 * 60 * 1000;

var SUPPORTED_BROWSERS = {
    msie: '11',
    firefox: '30',
    chrome: '27',
    safari: '7',
    opera: '16',
    msedge: '12',
    samsungBrowser: '2.1',
    silk: '59.3',
    ucbrowser: '10.0.0.488',
    vivaldi: '1.91'
};

var URI =  false ? {
    CHECKOUT: '/base/test/windows/checkout/index.htm?checkouturl=true',
    ALTPAY: '/base/test/windows/checkout/index.htm?checkouturl=true',
    GUEST: '/base/test/windows/checkout/index.htm?guesturl=true',
    BUTTON: '/base/test/windows/button/index.htm',
    CARD: '/base/test/windows/card-fields/index.htm',
    META: '/base/test/windows/component-meta/index.htm',
    AUTH: '/v1/oauth2/token',
    ORDER: '/v2/checkout/orders'
} : {
    CHECKOUT: {
        local: '/webapps/hermes?ul=0',
        stage: '/webapps/hermes',
        sandbox: '/checkoutnow',
        production: '/checkoutnow'
    }["production"],

    ALTPAY: '/latinumcheckout',
    GUEST: '/webapps/xoonboarding',
    BUTTON: '/sdk/js/smart-buttons',
    CARD: '/webapps/hermes/card-fields',
    META: '/webapps/hermes/component-meta',
    AUTH: '/v1/oauth2/token',
    ORDER: '/v2/checkout/orders'
};

function getPayPalUrl() {
    return Object(src["buildPayPalUrl"])();
}

function getCheckoutUrl() {
    return Object(src["buildPayPalUrl"])(URI.CHECKOUT);
}

function getButtonUrl() {
    return Object(src["buildPayPalUrl"])(URI.BUTTON);
}

function getGuestUrl() {
    return Object(src["buildPayPalUrl"])(URI.GUEST);
}

function getCardUrl() {
    return Object(src["buildPayPalUrl"])(URI.CARD);
}

function getMetaUrl() {
    return Object(src["buildPayPalUrl"])(URI.META);
}

function getAltPayUrl() {
    return Object(src["buildPayPalUrl"])(URI.ALTPAY);
}

function getAuthAPIUrl() {
    return Object(src["buildPayPalAPIUrl"])(URI.AUTH);
}

function getOrderAPIUrl() {
    return Object(src["buildPayPalAPIUrl"])(URI.ORDER);
}
// CONCATENATED MODULE: ./src/config/index.js
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return SESSION_LIFETIME; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return SUPPORTED_BROWSERS; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return getPayPalUrl; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return getCheckoutUrl; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return getButtonUrl; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "c", function() { return getGuestUrl; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return getCardUrl; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return getMetaUrl; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return getAltPayUrl; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return getAuthAPIUrl; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return getOrderAPIUrl; });


/***/ }),

/***/ "./src/constants/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/constants/button.js
var BUTTON_LABEL = {
    PAYPAL: 'paypal',
    CHECKOUT: 'checkout',
    PAY: 'pay',
    CREDIT: 'credit',
    CARD: 'card',
    INSTALLMENT: 'installment',
    VENMO: 'venmo',
    IDEAL: 'ideal',
    SEPA: 'sepa',
    BANCONTACT: 'bancontact',
    GIROPAY: 'giropay',
    SOFORT: 'sofort',
    EPS: 'eps',
    MYBANK: 'mybank',
    P24: 'p24',
    ZIMPLER: 'zimpler',
    WECHATPAY: 'wechatpay'
};

var BUTTON_COLOR = {
    GOLD: 'gold',
    BLUE: 'blue',
    SILVER: 'silver',
    DARKBLUE: 'darkblue',
    TRANSPARENT: 'transparent'
};

var LOGO_COLOR = {
    BLUE: 'blue',
    BLACK: 'black',
    WHITE: 'white',
    ANY: 'any'
};

var BUTTON_SIZE = {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    HUGE: 'huge',
    RESPONSIVE: 'responsive'
};

var BUTTON_TAGLINE_COLOR = {
    BLACK: 'black',
    BLUE: 'blue'
};

var BUTTON_SHAPE = {
    PILL: 'pill',
    RECT: 'rect'
};

var BUTTON_LAYOUT = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
};

var BUTTON_NUMBER = {
    SINGLE: 'single',
    MULTIPLE: 'multiple'
};

var BUTTON_LOGO = {
    PP: 'pp',
    PAYPAL: 'paypal',
    VENMO: 'venmo',
    CREDIT: 'credit',
    IDEAL: 'ideal',
    ELV: 'elv',
    SEPA: 'sepa',
    BANCONTACT: 'bancontact',
    GIROPAY: 'giropay',
    SOFORT: 'sofort',
    EPS: 'eps',
    MYBANK: 'mybank',
    P24: 'p24',
    ZIMPLER: 'zimpler',
    WECHATPAY: 'wechatpay'
};
// CONCATENATED MODULE: ./src/constants/fpti.js
var FPTI_BUTTON_TYPE = {
    IFRAME: 'iframe'
};

var FPTI_CONTEXT_TYPE = {
    BUTTON_SESSION_ID: 'button_session_id',
    ORDER_ID: 'EC-Token'
};

var FPTI_STATE = {
    LOAD: 'checkoutjs_load',
    BUTTON: 'checkoutjs_button',
    CHECKOUT: 'checkoutjs_checkout',
    PPTM: 'checkoutjs_pptm',
    PXP: 'PXP_CHECK'
};

var FPTI_TRANSITION = {
    SCRIPT_LOAD: 'process_script_load',

    BUTTON_RENDER: 'process_button_render',
    BUTTON_LOAD: 'process_button_load',
    BUTTON_CLICK: 'process_button_click',

    CREATE_ORDER: 'process_create_order',
    RECIEVE_ORDER: 'process_recieve_order',

    CHECKOUT_INIT: 'process_checkout_init',
    CHECKOUT_AUTHORIZE: 'process_checkout_authorize',
    CHECKOUT_CANCEL: 'process_checkout_cancel',
    CHECKOUT_ERROR: 'process_checkout_error',

    EXTERNAL_EXPERIMENT: 'process_external_experiment',
    EXTERNAL_EXPERIMENT_COMPLETE: 'process_external_experiment_complete',

    PPTM_LOAD: 'process_pptm_load',
    PPTM_LOADED: 'process_pptm_loaded',

    PXP: 'process_pxp_check'
};
// CONCATENATED MODULE: ./src/constants/misc.js
var LOG_LEVEL = {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
};

var ATTRIBUTE = {
    BUTTON: 'data-button',
    FUNDING_SOURCE: 'data-funding-source',
    CARD: 'data-card'
};

var DEFAULT = 'default';
// CONCATENATED MODULE: ./src/constants/class.js
var CLASS = {
    CONTAINER: 'paypal-button-container',
    BUTTON: 'paypal-button',

    LABEL: 'paypal-button-label',
    COLOR: 'paypal-button-color',
    LOGO_COLOR: 'paypal-button-logo-color',
    SHAPE: 'paypal-button-shape',
    LAYOUT: 'paypal-button-layout',
    NUMBER: 'paypal-button-number',
    ENV: 'paypal-button-env',

    TAGLINE: 'paypal-button-tagline',
    TAGLINE_COLOR: 'paypal-button-tagline-color',

    TEXT: 'paypal-button-text',
    LOGO: 'paypal-button-logo',
    CARD: 'paypal-button-card',

    SEPARATOR: 'paypal-separator'
};
// CONCATENATED MODULE: ./src/constants/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "c", function() { return BUTTON_LABEL; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return BUTTON_COLOR; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "k", function() { return LOGO_COLOR; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "h", function() { return BUTTON_SIZE; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "i", function() { return BUTTON_TAGLINE_COLOR; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "g", function() { return BUTTON_SHAPE; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "d", function() { return BUTTON_LAYOUT; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "f", function() { return BUTTON_NUMBER; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "e", function() { return BUTTON_LOGO; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return FPTI_BUTTON_TYPE; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return FPTI_CONTEXT_TYPE; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return FPTI_STATE; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return FPTI_TRANSITION; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return LOG_LEVEL; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return ATTRIBUTE; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return DEFAULT; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "j", function() { return CLASS; });





/***/ }),

/***/ "./src/funding/bancontact/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/bancontact/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function BancontactLogo(_ref) {
    var logoColor = _ref.logoColor,
        nonce = _ref.nonce;


    return Object(src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].BANCONTACT,
        logoColor: logoColor,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { version: '1.1', id: 'Layer_1', x: '0px', y: '0px', width: '226px', height: '32px', viewBox: '36.09922790527344 36.68461608886719 226 32', style: 'enable-background:new 0 0 476.9 123.4;', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])(
                    'g',
                    { transform: 'matrix(0.557769, 0, 0, 0.557769, 15.684875, 18.15871)' },
                    Object(src["jsxToHTML"])('path', { fill: '#005498', d: 'M147.6,50.2h-5.8h-26.9h-5.8l-3.9,4.4L92.5,68.9l0,0l-3.9,4.4h-6H56.2h-5.8l3.9-4.5l1.8-2.1l3.9-4.5h-5.8h-7.6 h-4.2c-3.2,0-5.8,2.7-5.8,6l0,0v11.5v1.1c0,3.3,2.6,6,5.8,6H44h61.1h4.4c3.2,0,7.6-2,9.7-4.4l10.2-11.6L147.6,50.2z' }),
                    Object(src["jsxToHTML"])('path', { fill: '#FFD800', d: 'M155.3,36.8c3.2,0,5.8,2.7,5.8,6v12.6c0,3.3-2.6,6-5.8,6h-3.2h-8.5h-5.8l3.9-4.4l0,0l1.9-2.2l3.9-4.4h-38.6 L88.3,73.6H50l27.5-31.1l1-1.2c2.2-2.4,6.5-4.4,9.7-4.4h1.4h65.7V36.8z' }),
                    Object(src["jsxToHTML"])('path', { fill: '#005498', d: 'M 440.7 85.6 L 440.7 81.8 C 440.7 81.3 440.4 81 439.7 81 L 437.3 81 C 436.6 81 436.1 80.9 436 80.6 C 435.8 80.3 435.8 79.7 435.8 78.7 L 435.8 64.7 L 439.7 64.7 C 440 64.7 440.2 64.6 440.4 64.4 C 440.6 64.2 440.7 64 440.7 63.7 L 440.7 59.8 C 440.7 59.5 440.6 59.3 440.4 59.1 C 440.2 58.9 440 58.8 439.7 58.8 L 435.8 58.8 L 435.8 53.8 C 435.8 53.5 435.7 53.3 435.6 53.2 C 435.4 53.1 435.2 53 435 53 L 434.9 53 L 429.1 54 C 428.8 54.1 428.6 54.2 428.4 54.3 C 428.2 54.5 428.1 54.7 428.1 54.9 L 428.1 58.8 L 424.2 58.8 C 423.9 58.8 423.7 58.9 423.5 59.1 C 423.3 59.3 423.2 59.5 423.2 59.8 L 423.2 63 C 423.2 63.3 423.3 63.5 423.5 63.6 C 423.7 63.8 423.9 63.9 424.2 64 L 428.1 64.6 L 428.1 78.6 C 428.1 80.3 428.3 81.7 428.6 82.8 C 429 83.9 429.5 84.7 430.1 85.3 C 430.8 85.9 431.6 86.3 432.6 86.5 C 433.6 86.7 434.8 86.8 436.1 86.8 C 436.8 86.8 437.4 86.8 438 86.7 C 438.5 86.6 439.2 86.5 439.9 86.4 C 440.4 86.4 440.7 86.1 440.7 85.6 M 419.9 85.1 L 419.9 80.8 C 419.9 80.5 419.8 80.3 419.6 80.2 C 419.4 80.1 419.2 80 418.9 80 L 418.8 80 C 417.9 80.1 417 80.2 416.2 80.2 C 415.4 80.3 414.3 80.3 412.9 80.3 C 412.4 80.3 411.8 80.2 411.4 80 C 410.9 79.8 410.5 79.5 410.1 79.1 C 409.7 78.7 409.5 78.1 409.3 77.4 C 409.1 76.7 409 75.8 409 74.7 L 409 70.7 C 409 69.6 409.1 68.7 409.3 68 C 409.5 67.3 409.8 66.7 410.1 66.3 C 410.5 65.9 410.9 65.6 411.4 65.4 C 411.9 65.2 412.4 65.1 412.9 65.1 C 414.3 65.1 415.4 65.1 416.2 65.2 C 417 65.3 417.9 65.3 418.8 65.4 L 418.9 65.4 C 419.2 65.4 419.4 65.3 419.6 65.2 C 419.8 65.1 419.9 64.9 419.9 64.6 L 419.9 60.3 C 419.9 59.9 419.8 59.7 419.7 59.6 C 419.5 59.5 419.3 59.3 418.9 59.2 C 418.2 59 417.3 58.9 416.3 58.7 C 415.2 58.5 414 58.5 412.5 58.5 C 409.1 58.5 406.4 59.5 404.3 61.6 C 402.3 63.7 401.2 66.7 401.2 70.7 L 401.2 74.7 C 401.2 78.6 402.2 81.7 404.3 83.8 C 406.3 85.9 409.1 86.9 412.5 86.9 C 413.9 86.9 415.2 86.8 416.3 86.7 C 417.4 86.5 418.3 86.4 418.9 86.2 C 419.3 86.1 419.5 86 419.7 85.8 C 419.8 85.7 419.9 85.4 419.9 85.1 M 388.6 80 C 388 80.3 387.4 80.5 386.7 80.7 C 386 80.9 385.3 81 384.6 81 C 383.6 81 382.8 80.9 382.3 80.6 C 381.8 80.3 381.6 79.7 381.6 78.6 L 381.6 78.2 C 381.6 77.6 381.7 77.1 381.8 76.7 C 381.9 76.3 382.2 75.9 382.5 75.6 C 382.8 75.3 383.3 75.1 383.8 74.9 C 384.3 74.8 385 74.7 385.9 74.7 L 388.6 74.7 L 388.6 80 L 388.6 80 Z M 396.2 68.3 C 396.2 66.5 395.9 65 395.4 63.8 C 394.9 62.6 394.1 61.6 393.2 60.8 C 392.2 60 391.1 59.4 389.7 59.1 C 388.3 58.7 386.7 58.5 385 58.5 C 383.4 58.5 381.8 58.6 380.3 58.8 C 378.8 59 377.6 59.2 376.7 59.5 C 376.1 59.7 375.8 60 375.8 60.6 L 375.8 64.5 C 375.8 64.8 375.9 65 376 65.2 C 376.2 65.3 376.4 65.4 376.6 65.4 L 376.8 65.4 C 377.2 65.4 377.7 65.3 378.2 65.3 C 378.8 65.3 379.4 65.2 380.2 65.2 C 380.9 65.2 381.7 65.1 382.5 65.1 C 383.3 65.1 384.1 65.1 384.8 65.1 C 385.9 65.1 386.8 65.3 387.4 65.7 C 388 66.1 388.4 67 388.4 68.4 L 388.4 70.1 L 385.8 70.1 C 381.7 70.1 378.6 70.7 376.8 72 C 375 73.3 374 75.4 374 78.2 L 374 78.6 C 374 80.2 374.2 81.5 374.7 82.5 C 375.2 83.6 375.8 84.4 376.6 85.1 C 377.4 85.7 378.2 86.2 379.2 86.5 C 380.2 86.8 381.2 86.9 382.3 86.9 C 383.7 86.9 385 86.7 386 86.3 C 387 85.9 388 85.4 389 84.7 L 389 85.5 C 389 85.8 389.1 86 389.3 86.2 C 389.5 86.4 389.7 86.5 390 86.5 L 395.4 86.5 C 395.7 86.5 395.9 86.4 396.1 86.2 C 396.3 86 396.4 85.8 396.4 85.5 L 396.4 68.3 L 396.2 68.3 Z M 370.5 85.6 L 370.5 81.8 C 370.5 81.3 370.2 81 369.5 81 L 367.1 81 C 366.4 81 365.9 80.9 365.8 80.6 C 365.6 80.3 365.6 79.7 365.6 78.7 L 365.6 64.7 L 369.5 64.7 C 369.8 64.7 370 64.6 370.2 64.4 C 370.4 64.2 370.5 64 370.5 63.7 L 370.5 59.8 C 370.5 59.5 370.4 59.3 370.2 59.1 C 370 58.9 369.8 58.8 369.5 58.8 L 365.6 58.8 L 365.6 53.8 C 365.6 53.5 365.5 53.3 365.4 53.2 C 365.2 53.1 365 53 364.8 53 L 364.7 53 L 358.9 54 C 358.6 54.1 358.4 54.2 358.2 54.3 C 358 54.5 357.9 54.7 357.9 54.9 L 357.9 58.8 L 354 58.8 C 353.7 58.8 353.5 58.9 353.3 59.1 C 353.1 59.3 353 59.5 353 59.8 L 353 63 C 353 63.3 353.1 63.5 353.3 63.6 C 353.5 63.8 353.7 63.9 354 64 L 357.9 64.6 L 357.9 78.6 C 357.9 80.3 358.1 81.7 358.4 82.8 C 358.8 83.9 359.3 84.7 359.9 85.3 C 360.6 85.9 361.4 86.3 362.4 86.5 C 363.4 86.7 364.6 86.8 365.9 86.8 C 366.6 86.8 367.2 86.8 367.8 86.7 C 368.3 86.6 369 86.5 369.7 86.4 C 370.2 86.4 370.5 86.1 370.5 85.6 M 349.5 85.5 L 349.5 69.5 C 349.5 68 349.4 66.6 349.1 65.2 C 348.9 63.9 348.4 62.7 347.8 61.7 C 347.2 60.7 346.3 59.9 345.2 59.4 C 344.1 58.8 342.7 58.5 340.9 58.5 C 339.4 58.5 338 58.7 336.8 59.1 C 335.6 59.5 334.4 60.1 333 61.1 L 333 59.8 C 333 59.5 332.9 59.3 332.7 59.1 C 332.5 58.9 332.3 58.8 332 58.8 L 326.6 58.8 C 326.3 58.8 326.1 58.9 325.9 59.1 C 325.7 59.3 325.6 59.5 325.6 59.8 L 325.6 85.4 C 325.6 85.7 325.7 85.9 325.9 86.1 C 326.1 86.3 326.3 86.4 326.6 86.4 L 332.4 86.4 C 332.7 86.4 332.9 86.3 333.1 86.1 C 333.3 85.9 333.4 85.7 333.4 85.4 L 333.4 66.5 C 334.2 66.1 335 65.7 335.8 65.4 C 336.5 65.1 337.3 65 338 65 C 338.7 65 339.3 65.1 339.8 65.2 C 340.3 65.3 340.6 65.6 340.9 65.9 C 341.2 66.3 341.3 66.7 341.4 67.3 C 341.5 67.9 341.5 68.6 341.5 69.4 L 341.5 85.4 C 341.5 85.7 341.6 85.9 341.8 86.1 C 342 86.3 342.2 86.4 342.5 86.4 L 348.3 86.4 C 348.6 86.4 348.8 86.3 349 86.1 C 349.4 85.9 349.5 85.7 349.5 85.5 M 313.1 74.4 C 313.1 78.3 311.7 80.3 308.8 80.3 C 307.4 80.3 306.3 79.8 305.6 78.8 C 304.9 77.8 304.5 76.3 304.5 74.4 L 304.5 71 C 304.5 69 304.9 67.6 305.6 66.6 C 306.3 65.6 307.4 65.1 308.8 65.1 C 311.6 65.1 313.1 67.1 313.1 71 L 313.1 74.4 Z M 320.9 71 C 320.9 69.1 320.6 67.3 320.1 65.8 C 319.6 64.3 318.8 63 317.8 61.9 C 316.8 60.8 315.5 60 314 59.4 C 312.5 58.8 310.8 58.5 308.8 58.5 C 306.8 58.5 305.1 58.8 303.6 59.4 C 302.1 60 300.8 60.8 299.8 61.9 C 298.8 63 298 64.3 297.5 65.8 C 297 67.3 296.7 69.1 296.7 71 L 296.7 74.4 C 296.7 76.3 297 78.1 297.5 79.6 C 298 81.1 298.8 82.4 299.8 83.5 C 300.8 84.6 302.1 85.4 303.6 86 C 305.1 86.6 306.8 86.9 308.8 86.9 C 310.8 86.9 312.5 86.6 314 86 C 315.5 85.4 316.8 84.6 317.8 83.5 C 318.8 82.4 319.6 81.1 320.1 79.6 C 320.6 78.1 320.9 76.3 320.9 74.4 L 320.9 71 Z M 294.1 85.1 L 294.1 80.8 C 294.1 80.5 294 80.3 293.8 80.2 C 293.6 80.1 293.4 80 293.1 80 L 293 80 C 292.1 80.1 291.2 80.2 290.4 80.2 C 289.6 80.2 288.5 80.3 287.1 80.3 C 286.6 80.3 286 80.2 285.6 80 C 285.1 79.8 284.7 79.5 284.3 79.1 C 283.9 78.7 283.7 78.1 283.5 77.4 C 283.3 76.7 283.2 75.8 283.2 74.7 L 283.2 70.7 C 283.2 69.6 283.3 68.7 283.5 68 C 283.7 67.3 284 66.7 284.3 66.3 C 284.7 65.9 285.1 65.6 285.6 65.4 C 286.1 65.2 286.6 65.1 287.1 65.1 C 288.5 65.1 289.6 65.1 290.4 65.2 C 291.2 65.3 292.1 65.3 293 65.4 L 293.1 65.4 C 293.4 65.4 293.6 65.3 293.8 65.2 C 294 65.1 294.1 64.9 294.1 64.6 L 294.1 60.3 C 294.1 59.9 294 59.7 293.9 59.6 C 293.7 59.5 293.5 59.3 293.1 59.2 C 292.4 59 291.6 58.9 290.5 58.7 C 289.4 58.5 288.2 58.5 286.7 58.5 C 283.3 58.5 280.6 59.5 278.5 61.6 C 276.5 63.7 275.4 66.7 275.4 70.7 L 275.4 74.7 C 275.4 78.6 276.4 81.7 278.5 83.8 C 280.5 85.9 283.3 86.9 286.7 86.9 C 288.1 86.9 289.4 86.8 290.5 86.7 C 291.6 86.5 292.4 86.4 293.1 86.2 C 293.5 86.1 293.7 86 293.9 85.8 C 294 85.7 294.1 85.4 294.1 85.1 M 270.4 85.5 L 270.4 69.5 C 270.4 68 270.3 66.6 270 65.2 C 269.7 63.8 269.3 62.7 268.7 61.7 C 268.1 60.7 267.2 59.9 266.1 59.4 C 265 58.8 263.6 58.5 261.8 58.5 C 260.3 58.5 258.9 58.7 257.7 59.1 C 256.5 59.5 255.3 60.1 253.9 61.1 L 253.9 59.8 C 253.9 59.5 253.8 59.3 253.6 59.1 C 253.4 58.9 253.2 58.8 252.9 58.8 L 247.5 58.8 C 247.2 58.8 247 58.9 246.8 59.1 C 246.6 59.3 246.5 59.5 246.5 59.8 L 246.5 85.4 C 246.5 85.7 246.6 85.9 246.8 86.1 C 247 86.3 247.2 86.4 247.5 86.4 L 253.3 86.4 C 253.6 86.4 253.8 86.3 254 86.1 C 254.2 85.9 254.3 85.7 254.3 85.4 L 254.3 66.5 C 255.1 66.1 255.9 65.7 256.7 65.4 C 257.4 65.1 258.2 65 258.9 65 C 259.6 65 260.2 65.1 260.7 65.2 C 261.2 65.3 261.5 65.6 261.8 65.9 C 262.1 66.3 262.2 66.7 262.3 67.3 C 262.4 67.9 262.4 68.6 262.4 69.4 L 262.4 85.4 C 262.4 85.7 262.5 85.9 262.7 86.1 C 262.9 86.3 263.1 86.4 263.4 86.4 L 269.2 86.4 C 269.5 86.4 269.7 86.3 269.9 86.1 C 270.3 85.9 270.4 85.7 270.4 85.5 M 233.3 80 C 232.7 80.3 232.1 80.5 231.4 80.7 C 230.7 80.9 230 81 229.3 81 C 228.3 81 227.5 80.9 227 80.6 C 226.5 80.3 226.3 79.7 226.3 78.6 L 226.3 78.2 C 226.3 77.6 226.4 77.1 226.5 76.7 C 226.6 76.3 226.9 75.9 227.2 75.6 C 227.5 75.3 228 75.1 228.5 74.9 C 229 74.8 229.7 74.7 230.6 74.7 L 233.3 74.7 L 233.3 80 L 233.3 80 Z M 241 68.3 C 241 66.5 240.7 65 240.2 63.8 C 239.7 62.6 238.9 61.6 238 60.8 C 237 60 235.9 59.4 234.5 59.1 C 233.1 58.7 231.5 58.5 229.8 58.5 C 228.2 58.5 226.6 58.6 225.1 58.8 C 223.6 59 222.4 59.2 221.5 59.5 C 220.9 59.7 220.6 60 220.6 60.6 L 220.6 64.5 C 220.6 64.8 220.7 65 220.8 65.2 C 221 65.3 221.2 65.4 221.4 65.4 L 221.6 65.4 C 222 65.4 222.5 65.3 223 65.3 C 223.6 65.3 224.2 65.2 225 65.2 C 225.7 65.2 226.5 65.1 227.3 65.1 C 228.1 65.1 228.9 65.1 229.6 65.1 C 230.7 65.1 231.6 65.3 232.2 65.7 C 232.8 66.1 233.2 67 233.2 68.4 L 233.2 70.1 L 230.6 70.1 C 226.5 70.1 223.4 70.7 221.6 72 C 219.8 73.3 218.8 75.4 218.8 78.2 L 218.8 78.6 C 218.8 80.2 219 81.5 219.5 82.5 C 220 83.6 220.6 84.4 221.4 85.1 C 222.2 85.7 223 86.2 224 86.5 C 225 86.8 226 86.9 227.1 86.9 C 228.5 86.9 229.8 86.7 230.8 86.3 C 231.8 85.9 232.8 85.4 233.8 84.7 L 233.8 85.5 C 233.8 85.8 233.9 86 234.1 86.2 C 234.3 86.4 234.5 86.5 234.8 86.5 L 240.2 86.5 C 240.5 86.5 240.7 86.4 240.9 86.2 C 241.1 86 241.2 85.8 241.2 85.5 L 241.2 68.3 L 241 68.3 Z M 206.6 75.9 C 206.6 77.2 206.1 78.3 205.2 79 C 204.3 79.7 202.5 80.1 200.1 80.1 L 199.3 80.1 C 198.9 80.1 198.5 80.1 198.1 80.1 C 197.7 80.1 197.3 80.1 196.9 80.1 L 196.1 80.1 L 196.1 71.1 L 201.5 71.1 C 203.4 71.1 204.8 71.5 205.5 72.4 C 206.2 73.3 206.6 74.3 206.6 75.4 L 206.6 75.9 Z M 206.4 61.6 C 206.4 62.1 206.3 62.6 206.2 63.1 C 206 63.6 205.8 64 205.4 64.3 C 205 64.6 204.5 64.9 203.9 65.1 C 203.3 65.3 202.5 65.4 201.5 65.4 L 196.1 65.4 L 196.1 57.1 C 196.3 57.1 196.5 57.1 196.8 57.1 C 197.1 57.1 197.5 57.1 197.9 57.1 L 199 57.1 L 199.8 57.1 C 202.3 57.1 204 57.4 205 58 C 206 58.6 206.5 59.6 206.5 60.9 L 206.5 61.6 L 206.4 61.6 Z M 214.6 75.4 C 214.6 73.7 214.2 72.3 213.4 71.1 C 212.6 69.9 211.6 68.9 210.3 68.3 C 211.6 67.7 212.6 66.7 213.3 65.5 C 214 64.2 214.4 62.8 214.4 61.3 L 214.4 60.4 C 214.4 58.5 214 56.9 213.3 55.6 C 212.6 54.3 211.5 53.3 210.2 52.5 C 208.9 51.7 207.3 51.2 205.4 50.8 C 203.5 50.5 201.5 50.3 199.2 50.3 C 198.4 50.3 197.6 50.3 196.8 50.3 C 196 50.3 195.2 50.4 194.4 50.4 C 193.6 50.4 192.9 50.5 192.2 50.6 C 191.5 50.7 191 50.7 190.6 50.8 C 189.7 51 189 51.3 188.6 51.7 C 188.2 52.1 188 52.9 188 54 L 188 83.3 C 188 84.4 188.2 85.1 188.6 85.6 C 189 86 189.7 86.3 190.6 86.5 C 191.1 86.6 191.7 86.7 192.3 86.7 C 193 86.8 193.7 86.8 194.5 86.9 C 195.3 86.9 196.1 87 196.9 87 C 197.7 87 198.6 87 199.4 87 C 201.5 87 203.5 86.8 205.3 86.5 C 207.1 86.2 208.7 85.6 210.1 84.8 C 211.5 84 212.5 82.9 213.4 81.5 C 214.2 80.1 214.6 78.3 214.6 76.2 L 214.6 75.4 L 214.6 75.4 Z' })
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/bancontact/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars







var BANCONTACT_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["a" /* getAltPayUrl */],

    defaultLabel: constants["c" /* BUTTON_LABEL */].BANCONTACT,

    layouts: [constants["d" /* BUTTON_LAYOUT */].VERTICAL],

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].BANCONTACT] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: BancontactLogo,

        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].SILVER],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["k" /* LOGO_COLOR */].BLACK, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors),

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/bancontact/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "BANCONTACT_CONFIG", function() { return BANCONTACT_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "BancontactLogo", function() { return BancontactLogo; });



/***/ }),

/***/ "./src/funding/card/amex/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var paypal_sdk_constants_src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./src/funding/card/common.jsx
var common = __webpack_require__("./src/funding/card/common.jsx");

// CONCATENATED MODULE: ./src/funding/card/amex/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function AmexLogo(_ref) {
    var nonce = _ref.nonce;


    return Object(src["jsxToHTML"])(common["a" /* SVGCardLogo */], {
        nonce: nonce,
        name: paypal_sdk_constants_src["a" /* CARD */].AMEX,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '40', height: '24', viewBox: '0 0 40 24', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])('path', { d: 'M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z', style: 'fill: rgb(20, 119, 190);' }),
                Object(src["jsxToHTML"])('path', { d: 'M6.26 12.32h2.313L7.415 9.66M27.353 9.977h-3.738v1.23h3.666v1.384h-3.675v1.385h3.821v1.005c.623-.77 1.33-1.466 2.025-2.235l.707-.77c-.934-1.004-1.87-2.08-2.804-3.075v1.077z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M38.25 7h-5.605l-1.328 1.4L30.072 7H16.984l-1.017 2.416L14.877 7h-9.58L1.25 16.5h4.826l.623-1.556h1.4l.623 1.556H29.99l1.327-1.483 1.328 1.483h5.605l-4.36-4.667L38.25 7zm-17.685 8.1h-1.557V9.883L16.673 15.1h-1.33L13.01 9.883l-.084 5.217H9.73l-.623-1.556h-3.27L5.132 15.1H3.42l2.884-6.772h2.42l2.645 6.233V8.33h2.646l2.107 4.51 1.868-4.51h2.575V15.1zm14.727 0h-2.024l-2.024-2.26-2.023 2.26H22.06V8.328H29.53l1.795 2.177 2.024-2.177h2.025L32.26 11.75l3.032 3.35z', style: 'fill: rgb(255, 255, 255);' })
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/card/amex/config.js


var AMEX_CONFIG = {
    Logo: AmexLogo
};
// CONCATENATED MODULE: ./src/funding/card/amex/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "AMEX_CONFIG", function() { return AMEX_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "AmexLogo", function() { return AmexLogo; });



/***/ }),

/***/ "./src/funding/card/common.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = SVGCardLogo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/constants/index.js");

/* eslint no-template-curly-in-string: off, max-lines: off */
/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars



function SVGCardLogo(_ref) {
    var render = _ref.render,
        name = _ref.name,
        nonce = _ref.nonce;

    return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])(__WEBPACK_IMPORTED_MODULE_0_belter_src__["SVG"], {
        nonce: nonce,
        svg: render(),
        alt: name,
        'class': __WEBPACK_IMPORTED_MODULE_1__constants__["j" /* CLASS */].CARD + ' ' + __WEBPACK_IMPORTED_MODULE_1__constants__["j" /* CLASS */].CARD + '-' + name + ' ' + __WEBPACK_IMPORTED_MODULE_1__constants__["j" /* CLASS */].BUTTON
    });
}

/***/ }),

/***/ "./src/funding/card/discover/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var paypal_sdk_constants_src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./src/funding/card/common.jsx
var common = __webpack_require__("./src/funding/card/common.jsx");

// CONCATENATED MODULE: ./src/funding/card/discover/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function DiscoverLogo(_ref) {
    var nonce = _ref.nonce;

    return Object(src["jsxToHTML"])(common["a" /* SVGCardLogo */], {
        nonce: nonce,
        name: paypal_sdk_constants_src["a" /* CARD */].DISCOVER,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '40', height: '24', viewBox: '0 0 40 24', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])('path', { d: 'M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z', style: 'fill: rgb(17, 49, 82);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 5.498 13.349 C 5.16 13.654 4.722 13.787 4.028 13.787 L 3.738 13.787 L 3.738 10.141 L 4.028 10.141 C 4.722 10.141 5.143 10.265 5.498 10.587 C 5.868 10.917 6.093 11.431 6.093 11.959 C 6.093 12.489 5.869 13.019 5.498 13.349 Z M 4.243 9.206 L 2.666 9.206 L 2.666 14.721 L 4.236 14.721 C 5.069 14.721 5.671 14.524 6.199 14.084 C 6.829 13.564 7.199 12.779 7.199 11.968 C 7.199 10.34 5.985 9.206 4.243 9.206 Z M 7.696 14.721 L 8.77 14.721 L 8.77 9.207 L 7.696 9.207 M 11.393 11.323 C 10.748 11.083 10.559 10.926 10.559 10.628 C 10.559 10.281 10.897 10.018 11.359 10.018 C 11.681 10.018 11.946 10.15 12.226 10.464 L 12.788 9.727 C 12.326 9.322 11.773 9.115 11.17 9.115 C 10.195 9.115 9.452 9.793 9.452 10.695 C 9.452 11.455 9.798 11.845 10.807 12.208 C 11.227 12.356 11.442 12.455 11.55 12.522 C 11.765 12.662 11.872 12.862 11.872 13.092 C 11.872 13.54 11.518 13.872 11.038 13.872 C 10.528 13.872 10.114 13.614 9.868 13.136 L 9.173 13.806 C 9.668 14.532 10.263 14.856 11.08 14.856 C 12.196 14.856 12.98 14.111 12.98 13.044 C 12.98 12.168 12.617 11.771 11.395 11.324 Z M 13.316 11.968 C 13.316 13.588 14.586 14.845 16.223 14.845 C 16.685 14.845 17.081 14.755 17.57 14.525 L 17.57 13.258 C 17.14 13.688 16.76 13.862 16.273 13.862 C 15.191 13.862 14.423 13.077 14.423 11.962 C 14.423 10.902 15.215 10.067 16.223 10.067 C 16.735 10.067 17.123 10.25 17.57 10.687 L 17.57 9.421 C 17.098 9.181 16.71 9.081 16.248 9.081 C 14.621 9.081 13.316 10.364 13.316 11.968 Z M 26.088 12.911 L 24.62 9.206 L 23.446 9.206 L 25.783 14.862 L 26.361 14.862 L 28.741 9.207 L 27.576 9.207 M 29.226 14.721 L 32.272 14.721 L 32.272 13.787 L 30.299 13.787 L 30.299 12.299 L 32.199 12.299 L 32.199 11.365 L 30.299 11.365 L 30.299 10.141 L 32.272 10.141 L 32.272 9.206 L 29.226 9.206 M 34.373 11.745 L 34.059 11.745 L 34.059 10.075 L 34.389 10.075 C 35.059 10.075 35.423 10.355 35.423 10.893 C 35.423 11.447 35.059 11.745 34.373 11.745 Z M 36.528 10.835 C 36.528 9.802 35.818 9.207 34.578 9.207 L 32.986 9.207 L 32.986 14.721 L 34.059 14.721 L 34.059 12.506 L 34.199 12.506 L 35.686 14.721 L 37.006 14.721 L 35.273 12.398 C 36.083 12.233 36.528 11.678 36.528 10.835 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])(
                    'g',
                    { id: 'MarkingBase_1_', transform: 'matrix(0.089776, 0, 0, 0.089776, 2.192296, 5.72498)' },
                    Object(src["jsxToHTML"])(
                        'linearGradient',
                        { id: 'SVGID_1_', gradientUnits: 'userSpaceOnUse', x1: '224.3917', y1: '44.1731', x2: '201.33', y2: '80.2807', gradientTransform: 'matrix(1 0 0 -1 0 141.7323)' },
                        Object(src["jsxToHTML"])('stop', { offset: '0', style: 'stop-color:#F89F21' }),
                        Object(src["jsxToHTML"])('stop', { offset: '0.2502', style: 'stop-color:#F79A23' }),
                        Object(src["jsxToHTML"])('stop', { offset: '0.5331', style: 'stop-color:#F78E22' }),
                        Object(src["jsxToHTML"])('stop', { offset: '0.6196', style: 'stop-color:#F68721' }),
                        Object(src["jsxToHTML"])('stop', { offset: '0.7232', style: 'stop-color:#F48220' }),
                        Object(src["jsxToHTML"])('stop', { offset: '1', style: 'stop-color:#F27623' })
                    ),
                    Object(src["jsxToHTML"])('circle', { fill: 'url(#SVGID_1_)', cx: '207.343', cy: '70.866', r: '33.307' }),
                    Object(src["jsxToHTML"])(
                        'linearGradient',
                        { id: 'SVGID_2_', gradientUnits: 'userSpaceOnUse', x1: '220.7487', y1: '44.664', x2: '187.0436', y2: '110.5426', gradientTransform: 'matrix(1 0 0 -1 0 141.7323)' },
                        Object(src["jsxToHTML"])('stop', { offset: '0', style: 'stop-color:#F68721;stop-opacity:0' }),
                        Object(src["jsxToHTML"])('stop', { offset: '0.3587', style: 'stop-color:#E27027;stop-opacity:0.2704' }),
                        Object(src["jsxToHTML"])('stop', { offset: '0.703', style: 'stop-color:#D4612C;stop-opacity:0.5299' }),
                        Object(src["jsxToHTML"])('stop', { offset: '0.9816', style: 'stop-color:#D15D2D;stop-opacity:0.74' })
                    ),
                    Object(src["jsxToHTML"])('circle', { opacity: '0.65', fill: 'url(#SVGID_2_)', cx: '207.343', cy: '70.866', r: '33.307' })
                ),
                Object(src["jsxToHTML"])(
                    'g',
                    { id: 'Orange_1_', 'enable-background': 'new    ', transform: 'matrix(0.469224, 0, 0, 0.469224, 13.785085, 6.199149)' },
                    Object(src["jsxToHTML"])(
                        'g',
                        { id: 'Orange' },
                        Object(src["jsxToHTML"])(
                            'g',
                            null,
                            Object(src["jsxToHTML"])('path', { d: 'M13,38c20.1,0,40,0,40,0c1.7,0,3-1.3,3-3V18C56,18,51.2,31.8,13,38z', style: 'fill: rgb(255, 129, 38);' })
                        )
                    )
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/card/discover/config.js


var DISCOVER_CONFIG = {
    Logo: DiscoverLogo
};
// CONCATENATED MODULE: ./src/funding/card/discover/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DISCOVER_CONFIG", function() { return DISCOVER_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DiscoverLogo", function() { return DiscoverLogo; });



/***/ }),

/***/ "./src/funding/card/elo/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var paypal_sdk_constants_src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./src/funding/card/common.jsx
var common = __webpack_require__("./src/funding/card/common.jsx");

// CONCATENATED MODULE: ./src/funding/card/elo/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function EloLogo(_ref) {
    var nonce = _ref.nonce;

    return Object(src["jsxToHTML"])(common["a" /* SVGCardLogo */], {
        nonce: nonce,
        name: paypal_sdk_constants_src["a" /* CARD */].ELO,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '40', height: '24', viewBox: '0 0 40 24', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])('path', { d: 'M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z', style: 'fill: rgb(21, 21, 21);' }),
                Object(src["jsxToHTML"])('path', { 'class': 'st0', d: 'M 9.229 8.55 C 9.592 8.431 9.977 8.365 10.382 8.365 C 12.14 8.365 13.602 9.613 13.939 11.268 L 16.427 10.762 C 15.855 7.946 13.365 5.824 10.379 5.824 C 9.693 5.824 9.037 5.935 8.42 6.142 L 9.229 8.55 Z', style: 'fill: rgb(255, 205, 5);' }),
                Object(src["jsxToHTML"])('path', { 'class': 'st1', d: 'M 6.292 16.616 L 7.973 14.716 C 7.221 14.052 6.749 13.08 6.749 11.999 C 6.749 10.917 7.221 9.945 7.973 9.279 L 6.292 7.38 C 5.015 8.51 4.209 10.16 4.209 11.999 C 4.209 13.836 5.019 15.488 6.292 16.616', style: 'fill: rgb(0, 164, 224);' }),
                Object(src["jsxToHTML"])('path', { 'class': 'st2', d: 'M 13.939 12.723 C 13.602 14.379 12.136 15.626 10.382 15.626 C 9.977 15.626 9.592 15.562 9.229 15.442 L 8.422 17.849 C 9.039 18.055 9.698 18.167 10.382 18.167 C 13.365 18.167 15.855 16.05 16.427 13.235 L 13.939 12.723 Z', style: 'fill: rgb(239, 66, 35);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 18.603 14.794 C 18.521 14.663 18.412 14.453 18.343 14.296 C 17.948 13.381 17.932 12.434 18.264 11.526 C 18.631 10.527 19.33 9.765 20.233 9.378 C 21.366 8.889 22.626 8.986 23.713 9.632 C 24.406 10.028 24.897 10.641 25.269 11.506 C 25.319 11.615 25.358 11.737 25.398 11.835 L 18.603 14.794 Z M 20.87 10.845 C 20.066 11.194 19.65 11.949 19.734 12.834 L 23.151 11.363 C 22.565 10.675 21.802 10.444 20.87 10.845 Z M 23.578 14.044 C 23.578 14.044 23.578 14.044 23.578 14.044 L 23.508 13.998 C 23.302 14.331 22.985 14.595 22.584 14.768 C 21.82 15.1 21.113 15.014 20.602 14.569 L 20.559 14.643 C 20.559 14.643 20.559 14.643 20.559 14.643 L 19.688 15.936 C 19.905 16.088 20.134 16.213 20.376 16.315 C 21.333 16.712 22.311 16.693 23.279 16.273 C 23.978 15.971 24.527 15.509 24.9 14.924 L 23.578 14.044 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 27.77 7.466 L 27.77 14.673 L 28.891 15.13 L 28.254 16.614 L 27.018 16.1 C 26.742 15.979 26.552 15.797 26.409 15.588 C 26.272 15.377 26.171 15.085 26.171 14.698 L 26.171 7.466 L 27.77 7.466 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])(
                    'g',
                    { transform: 'matrix(0.037801, 0, 0, 0.037801, 1.0913, 0.089785)' },
                    Object(src["jsxToHTML"])('path', { d: 'M782.7,337.2c0-16.2,7.2-30.8,18.5-40.7l-30.4-33.9c-20.6,18.2-33.6,44.9-33.6,74.6c0,29.7,12.9,56.4,33.6,74.7l30.4-34 C789.8,367.9,782.6,353.4,782.7,337.2z', style: 'fill: rgb(255, 255, 255);' }),
                    Object(src["jsxToHTML"])('path', { d: 'M836.7,391.4c-6,0-11.8-1-17.1-2.8L805,431.7c9.9,3.3,20.6,5.1,31.6,5.2c48.2,0,88.4-34.1,97.7-79.6l-44.7-9.1 C884.6,372.9,862.8,391.4,836.7,391.4z', style: 'fill: rgb(255, 255, 255);' }),
                    Object(src["jsxToHTML"])('path', { d: 'M836.8,237.6c-11,0-21.7,1.8-31.6,5.1l14.4,43.2c5.4-1.8,11.2-2.8,17.1-2.8c26.2,0,48,18.6,53,43.3l44.7-9.1 C925.2,272,885,237.7,836.8,237.6z', style: 'fill: rgb(255, 255, 255);' })
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/card/elo/config.js


var ELO_CONFIG = {
    Logo: EloLogo
};
// CONCATENATED MODULE: ./src/funding/card/elo/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ELO_CONFIG", function() { return ELO_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "EloLogo", function() { return EloLogo; });



/***/ }),

/***/ "./src/funding/card/hiper/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var paypal_sdk_constants_src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./src/funding/card/common.jsx
var common = __webpack_require__("./src/funding/card/common.jsx");

// CONCATENATED MODULE: ./src/funding/card/hiper/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function HiperLogo(_ref) {
    var nonce = _ref.nonce;

    return Object(src["jsxToHTML"])(common["a" /* SVGCardLogo */], {
        nonce: nonce,
        name: paypal_sdk_constants_src["a" /* CARD */].HIPER,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '40', height: '24', viewBox: '0 0 40 24', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])('path', { d: 'M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z', style: 'fill: rgb(243, 97, 24);' }),
                Object(src["jsxToHTML"])('path', { id: 'path16', style: 'fill: rgb(255, 255, 255); fill-opacity: 1; fill-rule: nonzero; stroke: none;', d: 'M 3.206 6.45 L 3.206 16.929 L 5.586 16.929 L 5.586 12.545 L 9.489 12.545 L 9.489 16.929 L 11.853 16.929 L 11.853 6.45 L 9.489 6.45 L 9.489 10.477 L 5.586 10.477 L 5.586 6.45 L 3.206 6.45' }),
                Object(src["jsxToHTML"])('path', { id: 'path18', style: 'fill: rgb(255, 255, 255); fill-opacity: 1; fill-rule: nonzero; stroke: none;', d: 'M 32.319 13.882 C 32.351 13.71 32.397 13.353 32.397 12.949 C 32.397 11.068 31.464 9.155 29.008 9.155 C 26.364 9.155 25.167 11.285 25.167 13.213 C 25.167 15.592 26.644 17.085 29.225 17.085 C 30.251 17.085 31.2 16.929 31.977 16.618 L 31.666 15.017 C 31.029 15.219 30.376 15.328 29.567 15.328 C 28.463 15.328 27.499 14.861 27.422 13.882 Z M 27.406 12.265 C 27.468 11.628 27.873 10.725 28.868 10.725 C 29.956 10.725 30.205 11.689 30.205 12.265 L 27.406 12.265' }),
                Object(src["jsxToHTML"])('path', { id: 'path20', style: 'fill: rgb(255, 255, 255); fill-opacity: 1; fill-rule: nonzero; stroke: none;', d: 'M 33.155 16.929 L 35.519 16.929 L 35.519 13.073 C 35.519 12.887 35.533 12.7 35.565 12.545 C 35.72 11.814 36.31 11.348 37.182 11.348 C 37.446 11.348 37.648 11.378 37.819 11.41 L 37.819 9.186 C 37.648 9.155 37.539 9.155 37.321 9.155 C 36.591 9.155 35.658 9.621 35.269 10.725 L 35.207 10.725 L 35.129 9.326 L 33.092 9.326 C 33.123 9.979 33.155 10.709 33.155 11.829 L 33.155 16.929' }),
                Object(src["jsxToHTML"])('path', { id: 'path22', style: 'fill: rgb(254, 234, 1); fill-opacity: 1; fill-rule: evenodd; stroke: none;', d: 'M 14.256 6.028 C 14.927 6.028 15.472 6.572 15.472 7.243 C 15.472 7.914 14.927 8.458 14.256 8.458 C 13.585 8.458 13.041 7.914 13.041 7.243 C 13.041 6.572 13.585 6.028 14.256 6.028' }),
                Object(src["jsxToHTML"])('path', { id: 'path24', style: 'fill: rgb(255, 255, 255); fill-opacity: 1; fill-rule: evenodd; stroke: none;', d: 'M 19.247 15.159 L 20.433 15.159 C 21.624 15.159 22.163 14.395 22.163 13.6 C 22.163 12.805 22.106 11.006 20.633 11.006 C 18.943 11.006 19.218 13.238 19.224 14.408 C 19.226 14.658 19.24 14.908 19.247 15.159 Z M 13.041 9.315 L 15.472 9.315 L 15.472 13.6 C 15.472 14.395 15.912 15.157 16.887 15.159 C 16.894 13.229 16.886 11.243 16.822 9.315 L 18.852 9.315 C 18.896 9.687 18.936 10.059 18.973 10.432 C 19.932 8.514 22.954 8.937 23.971 10.555 C 25.022 12.228 25.379 17.017 20.433 17.017 L 19.282 17.017 C 19.293 17.988 19.295 18.963 19.295 19.936 L 16.865 19.936 C 16.865 19.001 16.871 18.022 16.878 17.016 C 14.252 17.007 13.041 15.339 13.041 13.6 L 13.041 9.315' })
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/card/hiper/config.js


var HIPER_CONFIG = {
    Logo: HiperLogo
};
// CONCATENATED MODULE: ./src/funding/card/hiper/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "HIPER_CONFIG", function() { return HIPER_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "HiperLogo", function() { return HiperLogo; });



/***/ }),

/***/ "./src/funding/card/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var paypal_sdk_constants_src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/card/config.jsx
var _logoColors, _secondaryColors, _labels, _vendors, _maxCards;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars






var CARD_PRIORITY = [paypal_sdk_constants_src["a" /* CARD */].VISA, paypal_sdk_constants_src["a" /* CARD */].MASTERCARD, paypal_sdk_constants_src["a" /* CARD */].AMEX, paypal_sdk_constants_src["a" /* CARD */].DISCOVER, paypal_sdk_constants_src["a" /* CARD */].HIPER, paypal_sdk_constants_src["a" /* CARD */].ELO, paypal_sdk_constants_src["a" /* CARD */].JCB];

var CARD_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["c" /* getGuestUrl */],

    layouts: [constants["d" /* BUTTON_LAYOUT */].VERTICAL],

    defaultLabel: constants["c" /* BUTTON_LABEL */].CARD,

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].CARD] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {
        Label: function Label(_ref) {
            var fundingEligibility = _ref.fundingEligibility,
                locale = _ref.locale,
                nonce = _ref.nonce;

            var maxCards = 4;

            if (CARD_CONFIG.maxCards && CARD_CONFIG.maxCards[locale.country]) {
                maxCards = CARD_CONFIG.maxCards[locale.country];
            }

            return CARD_PRIORITY.map(function (name) {

                if (!fundingEligibility[paypal_sdk_constants_src["f" /* FUNDING */].CARD].vendors[name].eligible) {
                    return null;
                }

                var vendorConfig = CARD_CONFIG.vendors && CARD_CONFIG.vendors[name];

                if (!vendorConfig) {
                    return null;
                }

                var Logo = vendorConfig.Logo;


                return Object(src["jsxToHTML"])(Logo, {
                    nonce: nonce
                });
            }).filter(Boolean).slice(0, maxCards);
        },


        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].TRANSPARENT],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].TRANSPARENT] = constants["k" /* LOGO_COLOR */].BLACK, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].TRANSPARENT, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].TRANSPARENT, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].TRANSPARENT, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].TRANSPARENT, _secondaryColors),

        allowPrimary: false
    }), _labels),

    vendors: (_vendors = {}, _vendors[paypal_sdk_constants_src["a" /* CARD */].VISA] =  true ? __webpack_require__("./src/funding/card/visa/index.js").VISA_CONFIG : null, _vendors[paypal_sdk_constants_src["a" /* CARD */].AMEX] =  true ? __webpack_require__("./src/funding/card/amex/index.js").AMEX_CONFIG : null, _vendors[paypal_sdk_constants_src["a" /* CARD */].MASTERCARD] =  true ? __webpack_require__("./src/funding/card/mastercard/index.js").MASTERCARD_CONFIG : null, _vendors[paypal_sdk_constants_src["a" /* CARD */].DISCOVER] =  true ? __webpack_require__("./src/funding/card/discover/index.js").DISCOVER_CONFIG : null, _vendors[paypal_sdk_constants_src["a" /* CARD */].JCB] =  true ? __webpack_require__("./src/funding/card/jcb/index.js").JCB_CONFIG : null, _vendors[paypal_sdk_constants_src["a" /* CARD */].ELO] =  true ? __webpack_require__("./src/funding/card/elo/index.js").ELO_CONFIG : null, _vendors[paypal_sdk_constants_src["a" /* CARD */].HIPER] =  true ? __webpack_require__("./src/funding/card/hiper/index.js").HIPER_CONFIG : null, _vendors),

    maxCards: (_maxCards = {}, _maxCards[paypal_sdk_constants_src["c" /* COUNTRY */].BR] = 5, _maxCards)
});
// CONCATENATED MODULE: ./src/funding/card/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CARD_CONFIG", function() { return CARD_CONFIG; });


/***/ }),

/***/ "./src/funding/card/jcb/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var paypal_sdk_constants_src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./src/funding/card/common.jsx
var common = __webpack_require__("./src/funding/card/common.jsx");

// CONCATENATED MODULE: ./src/funding/card/jcb/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function JcbLogo(_ref) {
    var nonce = _ref.nonce;

    return Object(src["jsxToHTML"])(common["a" /* SVGCardLogo */], {
        nonce: nonce,
        name: paypal_sdk_constants_src["a" /* CARD */].JCB,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '40', height: '24', viewBox: '0 0 40 24', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])(
                    'defs',
                    null,
                    Object(src["jsxToHTML"])(
                        'pattern',
                        { id: 'pattern-0', x: '0', y: '0', width: '20', height: '20', patternUnits: 'userSpaceOnUse', viewBox: '0 0 100 100' },
                        Object(src["jsxToHTML"])('path', { d: 'M 0 0 L 50 0 L 50 100 L 0 100 Z', style: 'fill: black;' })
                    )
                ),
                Object(src["jsxToHTML"])('path', { d: 'M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z', style: 'fill: rgb(255, 255, 255); stroke: rgb(233, 234, 231);' }),
                Object(src["jsxToHTML"])(
                    'g',
                    { transform: 'matrix(0.100306, 0, 0, 0.100306, 4.733743, 10.105099)', id: 'g6321' },
                    Object(src["jsxToHTML"])(
                        'g',
                        { transform: 'matrix(1.8215159,0,0,1.8215159,-8.5437653,-109.83667)', id: 'g6323' },
                        Object(src["jsxToHTML"])('path', { style: 'fill:#ffffff', id: 'path6325', d: 'm 174,108.3 c 0,14 -11.4,25.4 -25.4,25.4 l -138.2,0 0,-100.6 c 0,-14 11.4,-25.4 25.4,-25.4 l 138.2,0 0,100.6 z', 'class': 'st0' }),
                        Object(src["jsxToHTML"])(
                            'g',
                            { id: 'g6327' },
                            Object(src["jsxToHTML"])(
                                'linearGradient',
                                { gradientTransform: 'matrix(1.125,0,0,1.125,-11.9755,-13.8615)', y2: '81.398598', x2: '157.3299', y1: '81.398598', x1: '117.3856', gradientUnits: 'userSpaceOnUse', id: 'SVGID_1_' },
                                Object(src["jsxToHTML"])('stop', { id: 'stop6330', style: 'stop-color:#007940', offset: '0' }),
                                Object(src["jsxToHTML"])('stop', { id: 'stop6332', style: 'stop-color:#00873F', offset: '0.2285' }),
                                Object(src["jsxToHTML"])('stop', { id: 'stop6334', style: 'stop-color:#40A737', offset: '0.7433' }),
                                Object(src["jsxToHTML"])('stop', { id: 'stop6336', style: 'stop-color:#5CB531', offset: '1' })
                            ),
                            Object(src["jsxToHTML"])('path', { style: 'fill:url(#SVGID_1_)', id: 'path6338', d: 'm 129,82.5 10.5,0 c 0.3,0 1,-0.1 1.3,-0.1 2,-0.4 3.7,-2.2 3.7,-4.7 0,-2.4 -1.7,-4.2 -3.7,-4.7 -0.3,-0.1 -0.9,-0.1 -1.3,-0.1 l -10.5,0 0,9.6 z', 'class': 'st1' }),
                            Object(src["jsxToHTML"])(
                                'linearGradient',
                                { gradientTransform: 'matrix(1.125,0,0,1.125,-11.9755,-13.8615)', y2: '75.171402', x2: '157.3318', y1: '75.171402', x1: '117.3844', gradientUnits: 'userSpaceOnUse', id: 'SVGID_2_' },
                                Object(src["jsxToHTML"])('stop', { id: 'stop6341', style: 'stop-color:#007940', offset: '0' }),
                                Object(src["jsxToHTML"])('stop', { id: 'stop6343', style: 'stop-color:#00873F', offset: '0.2285' }),
                                Object(src["jsxToHTML"])('stop', { id: 'stop6345', style: 'stop-color:#40A737', offset: '0.7433' }),
                                Object(src["jsxToHTML"])('stop', { id: 'stop6347', style: 'stop-color:#5CB531', offset: '1' })
                            ),
                            Object(src["jsxToHTML"])('path', { style: 'fill:url(#SVGID_2_)', id: 'path6349', d: 'm 138.3,16.2 c -10,0 -18.2,8.1 -18.2,18.2 l 0,18.9 25.7,0 c 0.6,0 1.3,0 1.8,0.1 5.8,0.3 10.1,3.3 10.1,8.5 0,4.1 -2.9,7.6 -8.3,8.3 l 0,0.2 c 5.9,0.4 10.4,3.7 10.4,8.8 0,5.5 -5,9.1 -11.6,9.1 l -28.2,0 0,37 26.7,0 c 10,0 18.2,-8.1 18.2,-18.2 l 0,-90.9 -26.6,0 z', 'class': 'st2' }),
                            Object(src["jsxToHTML"])(
                                'linearGradient',
                                { gradientTransform: 'matrix(1.125,0,0,1.125,-11.9755,-13.8615)', y2: '68.399101', x2: '157.33051', y1: '68.399101', x1: '117.3846', gradientUnits: 'userSpaceOnUse', id: 'SVGID_3_' },
                                Object(src["jsxToHTML"])('stop', { id: 'stop6352', style: 'stop-color:#007940', offset: '0' }),
                                Object(src["jsxToHTML"])('stop', { id: 'stop6354', style: 'stop-color:#00873F', offset: '0.2285' }),
                                Object(src["jsxToHTML"])('stop', { id: 'stop6356', style: 'stop-color:#40A737', offset: '0.7433' }),
                                Object(src["jsxToHTML"])('stop', { id: 'stop6358', style: 'stop-color:#5CB531', offset: '1' })
                            ),
                            Object(src["jsxToHTML"])('path', { style: 'fill:url(#SVGID_3_)', id: 'path6360', d: 'm 143.2,63.1 c 0,-2.4 -1.7,-4 -3.7,-4.3 -0.2,0 -0.7,-0.1 -1,-0.1 l -9.5,0 0,8.8 9.5,0 c 0.3,0 0.9,0 1,-0.1 2,-0.3 3.7,-1.9 3.7,-4.3 z', 'class': 'st3' })
                        ),
                        Object(src["jsxToHTML"])(
                            'linearGradient',
                            { gradientTransform: 'matrix(1.125,0,0,1.125,-11.9755,-13.8615)', y2: '75.171402', x2: '68.522102', y1: '75.171402', x1: '27.9594', gradientUnits: 'userSpaceOnUse', id: 'SVGID_4_' },
                            Object(src["jsxToHTML"])('stop', { id: 'stop6363', style: 'stop-color:#1F286F', offset: '0' }),
                            Object(src["jsxToHTML"])('stop', { id: 'stop6365', style: 'stop-color:#004E94', offset: '0.4751' }),
                            Object(src["jsxToHTML"])('stop', { id: 'stop6367', style: 'stop-color:#0066B1', offset: '0.8261' }),
                            Object(src["jsxToHTML"])('stop', { id: 'stop6369', style: 'stop-color:#006FBC', offset: '1' })
                        ),
                        Object(src["jsxToHTML"])('path', { style: 'fill:url(#SVGID_4_)', id: 'path6371', d: 'm 37.7,16.2 c -10,0 -18.2,8.1 -18.2,18.2 l 0,44.9 c 5.1,2.5 10.4,4.1 15.7,4.1 6.3,0 9.7,-3.8 9.7,-9 l 0,-21.2 15.6,0 0,21.1 c 0,8.2 -5.1,14.9 -22.4,14.9 -10.5,0 -18.7,-2.3 -18.7,-2.3 l 0,38.3 26.7,0 c 10,0 18.2,-8.1 18.2,-18.2 l 0,-90.8 -26.6,0 z', 'class': 'st4' }),
                        Object(src["jsxToHTML"])(
                            'linearGradient',
                            { gradientTransform: 'matrix(1.125,0,0,1.125,-11.9755,-13.8615)', y2: '75.171402', x2: '111.8553', y1: '75.171402', x1: '72.459503', gradientUnits: 'userSpaceOnUse', id: 'SVGID_5_' },
                            Object(src["jsxToHTML"])('stop', { id: 'stop6374', style: 'stop-color:#6C2C2F', offset: '0' }),
                            Object(src["jsxToHTML"])('stop', { id: 'stop6376', style: 'stop-color:#882730', offset: '0.1735' }),
                            Object(src["jsxToHTML"])('stop', { id: 'stop6378', style: 'stop-color:#BE1833', offset: '0.5731' }),
                            Object(src["jsxToHTML"])('stop', { id: 'stop6380', style: 'stop-color:#DC0436', offset: '0.8585' }),
                            Object(src["jsxToHTML"])('stop', { id: 'stop6382', style: 'stop-color:#E60039', offset: '1' })
                        ),
                        Object(src["jsxToHTML"])('path', { style: 'fill:url(#SVGID_5_)', id: 'path6384', d: 'm 88,16.2 c -10,0 -18.2,8.1 -18.2,18.2 l 0,23.8 c 4.6,-3.9 12.6,-6.4 25.5,-5.8 6.9,0.3 14.3,2.2 14.3,2.2 l 0,7.7 c -3.7,-1.9 -8.1,-3.6 -13.8,-4 -9.8,-0.7 -15.7,4.1 -15.7,12.5 0,8.5 5.9,13.3 15.7,12.5 5.7,-0.4 10.1,-2.2 13.8,-4 l 0,7.7 c 0,0 -7.3,1.9 -14.3,2.2 -12.9,0.6 -20.9,-1.9 -25.5,-5.8 l 0,42 26.7,0 c 10,0 18.2,-8.1 18.2,-18.2 l 0,-91 -26.7,0 z', 'class': 'st5' })
                    ),
                    Object(src["jsxToHTML"])('g', { id: 'g6386' })
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/card/jcb/config.js


var JCB_CONFIG = {
    Logo: JcbLogo
};
// CONCATENATED MODULE: ./src/funding/card/jcb/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "JCB_CONFIG", function() { return JCB_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "JcbLogo", function() { return JcbLogo; });



/***/ }),

/***/ "./src/funding/card/mastercard/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var paypal_sdk_constants_src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./src/funding/card/common.jsx
var common = __webpack_require__("./src/funding/card/common.jsx");

// CONCATENATED MODULE: ./src/funding/card/mastercard/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function MastercardLogo(_ref) {
    var nonce = _ref.nonce;

    return Object(src["jsxToHTML"])(common["a" /* SVGCardLogo */], {
        nonce: nonce,
        name: paypal_sdk_constants_src["a" /* CARD */].MASTERCARD,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '40', height: '24', viewBox: '0 0 40 24', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])('path', { d: 'M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z', style: 'fill: rgb(62, 57, 57);' }),
                Object(src["jsxToHTML"])('path', { style: 'fill: rgb(255, 95, 0);', d: 'M 22.205 3.901 L 15.688 3.901 L 15.688 15.589 L 22.205 15.589' }),
                Object(src["jsxToHTML"])('path', { d: 'M 16.1 9.747 C 16.1 7.371 17.218 5.265 18.935 3.901 C 17.67 2.912 16.078 2.312 14.342 2.312 C 10.223 2.312 6.892 5.636 6.892 9.746 C 6.892 13.853 10.223 17.178 14.342 17.178 C 16.078 17.178 17.67 16.58 18.935 15.588 C 17.216 14.246 16.099 12.119 16.099 9.745 Z', style: 'fill: rgb(235, 0, 27);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 30.996 9.747 C 30.996 13.854 27.663 17.179 23.547 17.179 C 21.81 17.179 20.216 16.581 18.954 15.589 C 20.691 14.227 21.788 12.12 21.788 9.746 C 21.788 7.37 20.671 5.264 18.954 3.9 C 20.216 2.911 21.81 2.311 23.547 2.311 C 27.663 2.311 30.996 5.657 30.996 9.745 Z', style: 'fill: rgb(247, 158, 27);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 7.167 22.481 L 7.167 20.43 C 7.167 19.641 6.685 19.127 5.857 19.127 C 5.443 19.127 4.993 19.262 4.683 19.71 C 4.44 19.332 4.096 19.127 3.579 19.127 C 3.233 19.127 2.888 19.23 2.612 19.607 L 2.612 19.197 L 1.886 19.197 L 1.886 22.481 L 2.612 22.481 L 2.612 20.668 C 2.612 20.086 2.921 19.812 3.406 19.812 C 3.888 19.812 4.131 20.121 4.131 20.669 L 4.131 22.481 L 4.856 22.481 L 4.856 20.668 C 4.856 20.086 5.204 19.812 5.651 19.812 C 6.137 19.812 6.377 20.121 6.377 20.669 L 6.377 22.481 L 7.171 22.481 Z M 17.909 19.197 L 16.734 19.197 L 16.734 18.204 L 16.007 18.204 L 16.007 19.197 L 15.352 19.197 L 15.352 19.845 L 16.007 19.845 L 16.007 21.351 C 16.007 22.106 16.319 22.551 17.146 22.551 C 17.459 22.551 17.804 22.449 18.044 22.309 L 17.839 21.695 C 17.632 21.831 17.389 21.867 17.216 21.867 C 16.872 21.867 16.734 21.66 16.734 21.319 L 16.734 19.847 L 17.909 19.847 L 17.909 19.198 Z M 24.053 19.127 C 23.639 19.127 23.364 19.332 23.191 19.607 L 23.191 19.197 L 22.465 19.197 L 22.465 22.481 L 23.191 22.481 L 23.191 20.633 C 23.191 20.086 23.434 19.777 23.882 19.777 C 24.018 19.777 24.192 19.812 24.33 19.847 L 24.538 19.162 C 24.401 19.127 24.192 19.127 24.052 19.127 Z M 14.765 19.469 C 14.42 19.229 13.937 19.127 13.418 19.127 C 12.588 19.127 12.036 19.538 12.036 20.188 C 12.036 20.736 12.453 21.044 13.175 21.146 L 13.524 21.181 C 13.903 21.249 14.108 21.351 14.108 21.523 C 14.108 21.765 13.832 21.934 13.35 21.934 C 12.864 21.934 12.484 21.764 12.244 21.592 L 11.898 22.139 C 12.278 22.411 12.794 22.549 13.313 22.549 C 14.28 22.549 14.831 22.105 14.831 21.488 C 14.831 20.908 14.383 20.599 13.692 20.496 L 13.348 20.462 C 13.037 20.428 12.795 20.36 12.795 20.155 C 12.795 19.914 13.038 19.777 13.418 19.777 C 13.83 19.777 14.245 19.949 14.453 20.052 L 14.764 19.469 Z M 34.033 19.127 C 33.618 19.127 33.342 19.332 33.171 19.607 L 33.171 19.197 L 32.445 19.197 L 32.445 22.481 L 33.171 22.481 L 33.171 20.633 C 33.171 20.086 33.414 19.777 33.862 19.777 C 33.998 19.777 34.17 19.812 34.307 19.847 L 34.515 19.162 C 34.38 19.127 34.172 19.127 34.033 19.127 Z M 24.779 20.838 C 24.779 21.834 25.47 22.551 26.54 22.551 C 27.025 22.551 27.369 22.449 27.715 22.173 L 27.369 21.593 C 27.092 21.798 26.816 21.901 26.504 21.901 C 25.919 21.901 25.505 21.49 25.505 20.84 C 25.505 20.226 25.919 19.813 26.507 19.78 C 26.816 19.78 27.092 19.883 27.369 20.089 L 27.715 19.507 C 27.369 19.233 27.024 19.13 26.54 19.13 C 25.47 19.13 24.779 19.85 24.779 20.841 Z M 31.478 20.838 L 31.478 19.198 L 30.75 19.198 L 30.75 19.608 C 30.51 19.3 30.165 19.128 29.717 19.128 C 28.784 19.128 28.058 19.848 28.058 20.84 C 28.058 21.835 28.784 22.552 29.716 22.552 C 30.197 22.552 30.543 22.382 30.748 22.074 L 30.748 22.484 L 31.477 22.484 L 31.477 20.84 Z M 28.818 20.838 C 28.818 20.259 29.196 19.779 29.819 19.779 C 30.406 19.779 30.821 20.224 30.821 20.84 C 30.821 21.424 30.406 21.902 29.819 21.902 C 29.196 21.869 28.818 21.424 28.818 20.841 Z M 20.148 19.128 C 19.183 19.128 18.494 19.813 18.494 20.84 C 18.494 21.869 19.183 22.552 20.185 22.552 C 20.671 22.552 21.154 22.417 21.533 22.108 L 21.188 21.595 C 20.914 21.799 20.565 21.937 20.222 21.937 C 19.772 21.937 19.323 21.732 19.219 21.149 L 21.671 21.149 L 21.671 20.878 C 21.705 19.815 21.083 19.13 20.15 19.13 Z M 20.148 19.748 C 20.6 19.748 20.911 20.019 20.98 20.532 L 19.253 20.532 C 19.321 20.087 19.633 19.748 20.148 19.748 Z M 38.141 20.84 L 38.141 17.898 L 37.412 17.898 L 37.412 19.61 C 37.173 19.302 36.828 19.13 36.38 19.13 C 35.446 19.13 34.721 19.85 34.721 20.841 C 34.721 21.837 35.446 22.554 36.379 22.554 C 36.861 22.554 37.206 22.383 37.41 22.076 L 37.41 22.486 L 38.14 22.486 L 38.14 20.841 Z M 35.481 20.84 C 35.481 20.261 35.861 19.78 36.484 19.78 C 37.069 19.78 37.486 20.226 37.486 20.841 C 37.486 21.426 37.069 21.904 36.484 21.904 C 35.861 21.87 35.481 21.426 35.481 20.843 Z M 11.237 20.84 L 11.237 19.2 L 10.515 19.2 L 10.515 19.61 C 10.272 19.302 9.928 19.13 9.478 19.13 C 8.545 19.13 7.82 19.85 7.82 20.841 C 7.82 21.837 8.545 22.554 9.477 22.554 C 9.96 22.554 10.304 22.383 10.512 22.076 L 10.512 22.486 L 11.236 22.486 L 11.236 20.841 Z M 8.546 20.84 C 8.546 20.261 8.926 19.78 9.548 19.78 C 10.134 19.78 10.55 20.226 10.55 20.841 C 10.55 21.426 10.134 21.904 9.548 21.904 C 8.926 21.87 8.546 21.426 8.546 20.843 Z', style: 'fill: rgb(255, 255, 255);' })
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/card/mastercard/config.js


var MASTERCARD_CONFIG = {
    Logo: MastercardLogo
};
// CONCATENATED MODULE: ./src/funding/card/mastercard/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MASTERCARD_CONFIG", function() { return MASTERCARD_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MastercardLogo", function() { return MastercardLogo; });



/***/ }),

/***/ "./src/funding/card/visa/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var paypal_sdk_constants_src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./src/funding/card/common.jsx
var common = __webpack_require__("./src/funding/card/common.jsx");

// CONCATENATED MODULE: ./src/funding/card/visa/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function VisaLogo(_ref) {
    var nonce = _ref.nonce;

    return Object(src["jsxToHTML"])(common["a" /* SVGCardLogo */], {
        nonce: nonce,
        name: paypal_sdk_constants_src["a" /* CARD */].VISA,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '40', height: '24', viewBox: '0 0 40 24', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])('path', { d: 'M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z', style: 'fill: rgb(33, 86, 154);' }),
                Object(src["jsxToHTML"])('path', { d: 'M19.596 7.885l-2.11 9.478H14.93l2.11-9.478h2.554zm10.743 6.12l1.343-3.56.773 3.56H30.34zm2.85 3.358h2.36l-2.063-9.478H31.31c-.492 0-.905.274-1.088.695l-3.832 8.783h2.682l.532-1.415h3.276l.31 1.415zm-6.667-3.094c.01-2.502-3.6-2.64-3.577-3.76.008-.338.345-.7 1.083-.793.365-.045 1.373-.08 2.517.425l.448-2.01c-.615-.214-1.405-.42-2.39-.42-2.523 0-4.3 1.288-4.313 3.133-.016 1.364 1.268 2.125 2.234 2.58.996.464 1.33.762 1.325 1.177-.006.636-.793.918-1.526.928-1.285.02-2.03-.333-2.623-.6l-.462 2.08c.598.262 1.7.49 2.84.502 2.682 0 4.437-1.273 4.445-3.243zM15.948 7.884l-4.138 9.478h-2.7L7.076 9.8c-.123-.466-.23-.637-.606-.834-.615-.32-1.63-.62-2.52-.806l.06-.275h4.345c.554 0 1.052.354 1.178.966l1.076 5.486 2.655-6.45h2.683z', style: 'fill: rgb(255, 255, 255);' })
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/card/visa/config.js


var VISA_CONFIG = {
    Logo: VisaLogo
};
// CONCATENATED MODULE: ./src/funding/card/visa/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "VISA_CONFIG", function() { return VISA_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "VisaLogo", function() { return VisaLogo; });



/***/ }),

/***/ "./src/funding/common.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT_FUNDING_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEFAULT_LABEL_CONFIG; });
/* harmony export (immutable) */ __webpack_exports__["c"] = SVGLogo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_paypal_braintree_web_client_src__ = __webpack_require__("./node_modules/paypal-braintree-web-client/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_paypal_sdk_constants_src__ = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__("./src/constants/index.js");
var _logoColors, _tagLineColors, _secondaryColors;

/* eslint no-template-curly-in-string: off, max-lines: off */
/* @jsx jsxToHTML */


 // eslint-disable-line no-unused-vars




var DEFAULT_FUNDING_CONFIG = {

    layouts: [__WEBPACK_IMPORTED_MODULE_3__constants__["d" /* BUTTON_LAYOUT */].HORIZONTAL, __WEBPACK_IMPORTED_MODULE_3__constants__["d" /* BUTTON_LAYOUT */].VERTICAL],

    platforms: [__WEBPACK_IMPORTED_MODULE_2_paypal_sdk_constants_src__["i" /* PLATFORM */].DESKTOP, __WEBPACK_IMPORTED_MODULE_2_paypal_sdk_constants_src__["i" /* PLATFORM */].MOBILE]
};

var DEFAULT_LABEL_CONFIG = {

    colors: [__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].GOLD, __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].BLUE, __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].SILVER],

    shapes: [__WEBPACK_IMPORTED_MODULE_3__constants__["g" /* BUTTON_SHAPE */].PILL, __WEBPACK_IMPORTED_MODULE_3__constants__["g" /* BUTTON_SHAPE */].RECT],

    logoColors: (_logoColors = {}, _logoColors[__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].GOLD] = __WEBPACK_IMPORTED_MODULE_3__constants__["k" /* LOGO_COLOR */].BLUE, _logoColors[__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].SILVER] = __WEBPACK_IMPORTED_MODULE_3__constants__["k" /* LOGO_COLOR */].BLUE, _logoColors[__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].BLUE] = __WEBPACK_IMPORTED_MODULE_3__constants__["k" /* LOGO_COLOR */].WHITE, _logoColors),

    tagLineColors: (_tagLineColors = {}, _tagLineColors[__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].GOLD] = __WEBPACK_IMPORTED_MODULE_3__constants__["i" /* BUTTON_TAGLINE_COLOR */].BLUE, _tagLineColors[__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].SILVER] = __WEBPACK_IMPORTED_MODULE_3__constants__["i" /* BUTTON_TAGLINE_COLOR */].BLUE, _tagLineColors[__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].BLUE] = __WEBPACK_IMPORTED_MODULE_3__constants__["i" /* BUTTON_TAGLINE_COLOR */].BLUE, _tagLineColors[__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].DARKBLUE] = __WEBPACK_IMPORTED_MODULE_3__constants__["i" /* BUTTON_TAGLINE_COLOR */].BLUE, _tagLineColors),

    secondaryColors: (_secondaryColors = {}, _secondaryColors[__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].GOLD] = __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].BLUE, _secondaryColors[__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].SILVER] = __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].BLUE, _secondaryColors[__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].BLUE] = __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[__WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].DARKBLUE] = __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* BUTTON_COLOR */].SILVER, _secondaryColors)
};

function SVGLogo(_ref) {
    var render = _ref.render,
        name = _ref.name,
        logoColor = _ref.logoColor,
        nonce = _ref.nonce;

    return Object(__WEBPACK_IMPORTED_MODULE_1_belter_src__["jsxToHTML"])(__WEBPACK_IMPORTED_MODULE_1_belter_src__["SVG"], {
        svg: render(),
        alt: name,
        nonce: nonce,
        'class': __WEBPACK_IMPORTED_MODULE_3__constants__["j" /* CLASS */].LOGO + ' ' + __WEBPACK_IMPORTED_MODULE_3__constants__["j" /* CLASS */].LOGO + '-' + name + ' ' + (logoColor ? __WEBPACK_IMPORTED_MODULE_3__constants__["j" /* CLASS */].LOGO_COLOR + '-' + logoColor : '')
    });
}

/***/ }),

/***/ "./src/funding/credit/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var belter_src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/paypal/logo.jsx
var logo = __webpack_require__("./src/funding/paypal/logo.jsx");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/credit/logo.jsx
var _CREDIT_LOGO_COLORS;

/* @jsx jsxToHTML */


 // eslint-disable-line no-unused-vars




var CREDIT_LOGO_COLORS = (_CREDIT_LOGO_COLORS = {}, _CREDIT_LOGO_COLORS[constants["k" /* LOGO_COLOR */].WHITE] = {
    primary: '#ffffff',
    secondary: '#ffffff'
}, _CREDIT_LOGO_COLORS);

function CreditLogo(_ref) {
    var logoColor = _ref.logoColor,
        locale = _ref.locale,
        nonce = _ref.nonce;


    if (!CREDIT_LOGO_COLORS[logoColor]) {
        throw new Error('No ' + logoColor + ' credit logo available');
    }

    var _ref2 = locale || {},
        country = _ref2.country;

    var primary = CREDIT_LOGO_COLORS[logoColor].primary;


    return Object(belter_src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].CREDIT,
        logoColor: logoColor,
        render: function render() {
            switch (country) {
                case src["c" /* COUNTRY */].DE:
                    return Object(belter_src["jsxToHTML"])(
                        'svg',
                        { width: '135', height: '32', viewBox: '0 0 135 32', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                        Object(belter_src["jsxToHTML"])(
                            'g',
                            { transform: 'matrix(1.3333333,0,0,-1.3333333,10,40)', fill: primary },
                            Object(belter_src["jsxToHTML"])(
                                'g',
                                { transform: 'matrix(0.17016911,0,0,0.17819595,39.327112,22.053803)' },
                                Object(belter_src["jsxToHTML"])('path', { d: 'm 0,0 -1.35,-8.619 c -0.146,-0.929 -0.946,-1.613 -1.886,-1.613 h -40.935 c -0.922,0 -1.445,1.057 -0.884,1.79 l 29.853,39.007 h -19.237 c -0.683,0 -1.205,0.611 -1.099,1.286 l 1.35,8.619 c 0.145,0.929 0.945,1.613 1.885,1.613 H 7.112 c 0.922,0 1.444,-1.055 0.886,-1.788 L -21.724,1.286 H -1.1 C -0.416,1.286 0.106,0.675 0,0 m 203.3312,42.0833 c 0.684,0 1.206,-0.611 1.1,-1.287 l -4.446,-28.132 c -1.041,-6.73 -2.359,-13.391 -8.395,-18.456 -5.065,-4.302 -12.143,-5.828 -18.248,-5.828 -6.106,0 -12.767,1.526 -16.444,5.828 -4.371,5.065 -3.608,11.726 -2.567,18.456 l 4.394,27.808 c 0.146,0.928 0.946,1.611 1.885,1.611 h 10.668 c 0.683,0 1.205,-0.61 1.1,-1.285 l -4.101,-26.261 c -1.11,-6.799 -1.804,-14.223 6.938,-14.223 8.743,0 10.408,7.424 11.518,14.223 l 4.05,25.932 c 0.145,0.929 0.945,1.614 1.885,1.614 z m -361.2517,-52.3157 h -10.665 c -0.685,0 -1.207,0.611 -1.1,1.287 l 6.249,39.511 h -9.939 c -0.684,0 -1.206,0.61 -1.1,1.285 l 1.35,8.619 c 0.146,0.929 0.946,1.614 1.886,1.614 h 33.145 c 0.684,0 1.206,-0.611 1.1,-1.286 l -1.35,-8.619 c -0.145,-0.929 -0.945,-1.613 -1.885,-1.613 h -9.608 l -6.198,-39.188 c -0.147,-0.927 -0.946,-1.61 -1.885,-1.61 m -98.5277,28.8638 h 1.318 c 4.441,0 9.549,0.837 10.477,6.522 0.929,5.688 -2.034,6.505 -6.779,6.522 h -1.927 c -0.58,0 -1.075,-0.422 -1.166,-0.995 z m 23.345,-28.864 h -13.977 c -0.594,0 -1.136,0.341 -1.393,0.878 l -9.224,19.244 h -0.139 l -2.985,-18.819 c -0.119,-0.75 -0.766,-1.303 -1.526,-1.303 h -10.977 c -0.684,0 -1.206,0.611 -1.1,1.287 l 7.848,49.725 c 0.119,0.751 0.766,1.304 1.526,1.304 h 19.009 c 10.339,0 17.416,-4.926 15.681,-16.097 -1.179,-7.216 -6.175,-13.461 -13.807,-14.779 l 12.015,-19.748 c 0.451,-0.742 -0.083,-1.692 -0.951,-1.692 m 445.918,52.3159 h 11.349 c 0.385,0 0.743,-0.199 0.946,-0.526 l 19.517,-31.46 h 0.139 l 4.81,30.376 c 0.147,0.927 0.946,1.61 1.885,1.61 h 10.667 c 0.684,0 1.206,-0.611 1.099,-1.287 l -7.799,-49.418 c -0.147,-0.927 -0.946,-1.611 -1.886,-1.611 h -11.347 c -0.386,0 -0.744,0.2 -0.947,0.528 l -19.517,31.528 h -0.139 l -4.811,-30.445 c -0.146,-0.928 -0.946,-1.611 -1.885,-1.611 h -10.666 c -0.684,0 -1.206,0.611 -1.1,1.287 l 7.8,49.418 c 0.146,0.928 0.946,1.611 1.885,1.611 m -304.5422,0 h 11.349 c 0.385,0 0.743,-0.199 0.946,-0.526 l 19.517,-31.46 h 0.139 l 4.81,30.376 c 0.147,0.927 0.946,1.61 1.885,1.61 h 10.667 c 0.684,0 1.206,-0.611 1.099,-1.287 l -7.799,-49.418 c -0.147,-0.927 -0.946,-1.611 -1.886,-1.611 h -11.347 c -0.386,0 -0.744,0.2 -0.947,0.528 l -19.517,31.528 h -0.139 l -4.811,-30.445 c -0.146,-0.928 -0.946,-1.611 -1.885,-1.611 h -10.666 c -0.684,0 -1.206,0.611 -1.1,1.287 l 7.8,49.418 c 0.146,0.928 0.946,1.611 1.885,1.611 M 131.156,1.2855 h 15.004 c 0.684,0 1.206,-0.61 1.1,-1.286 l -1.35,-8.619 c -0.145,-0.928 -0.945,-1.613 -1.885,-1.613 h -26.969 c -0.685,0 -1.207,0.611 -1.1,1.287 l 7.799,49.418 c 0.147,0.927 0.946,1.611 1.885,1.611 h 10.666 c 0.684,0 1.206,-0.612 1.099,-1.287 z m -33.5321,20.607 2.937,18.58 c 0.147,0.928 0.946,1.611 1.885,1.611 h 10.666 c 0.684,0 1.206,-0.611 1.1,-1.287 l -7.8,-49.418 c -0.146,-0.927 -0.946,-1.611 -1.885,-1.611 h -10.664 c -0.685,0 -1.207,0.612 -1.1,1.288 l 3.196,20.152 h -19.636 l -3.145,-19.83 c -0.147,-0.927 -0.946,-1.61 -1.885,-1.61 h -10.666 c -0.685,0 -1.207,0.611 -1.1,1.287 l 7.799,49.418 c 0.147,0.928 0.946,1.611 1.885,1.611 h 10.666 c 0.684,0 1.206,-0.611 1.099,-1.287 l -2.988,-18.904 z m 221.8207,-2.9142 c 0.699,0 1.224,-0.638 1.094,-1.325 -1.342,-7.069 -3.07,-13.21 -8.427,-19.351 -6.245,-7.147 -14.432,-10.269 -23.175,-10.269 -16.444,0 -26.088,11.171 -23.521,27.615 2.706,16.999 15.958,28.17 32.819,28.17 10.373,0 17.776,-4.519 20.966,-13.617 0.198,-0.566 -0.087,-1.189 -0.644,-1.409 l -11.599,-4.569 c -0.598,-0.236 -1.275,0.081 -1.466,0.694 -1.354,4.349 -4.637,7.175 -9.686,7.175 -8.95,0 -14.987,-8.535 -16.236,-16.514 -1.318,-8.118 2.29,-16.374 11.24,-16.374 5.898,0 10.894,3.053 12.351,9.089 h -9.793 c -0.686,0 -1.209,0.614 -1.099,1.292 l 1.373,8.458 c 0.088,0.539 0.553,0.935 1.099,0.935 z m -438.1464,9.9777 -1.132,-7.133 h 14.032 c 0.684,0 1.206,-0.61 1.1,-1.285 l -1.35,-8.619 c -0.145,-0.929 -0.945,-1.613 -1.885,-1.613 h -12.076 c -0.937,0 -1.735,-0.68 -1.884,-1.605 l -1.198,-7.415 h 14.865 c 0.684,0 1.206,-0.611 1.1,-1.286 l -1.35,-8.619 c -0.145,-0.929 -0.945,-1.613 -1.885,-1.613 h -26.831 c -0.684,0 -1.206,0.611 -1.099,1.286 l 7.799,49.418 c 0.146,0.928 0.946,1.611 1.885,1.611 h 26.834 c 0.683,0 1.206,-0.61 1.1,-1.285 l -1.35,-8.619 c -0.146,-0.929 -0.946,-1.614 -1.886,-1.614 h -12.904 c -0.939,0 -1.738,-0.682 -1.885,-1.609 M 34.135,25.9168 H 33.996 L 25.739,9.2648 h 11.31 z m -13.807,-27.06 -4.747,-8.518 c -0.197,-0.353 -0.569,-0.571 -0.973,-0.571 H 2.701 c -0.844,0 -1.381,0.902 -0.979,1.644 l 27.171,50.089 c 0.194,0.359 0.57,0.583 0.978,0.583 h 13.29 c 0.523,0 0.976,-0.365 1.088,-0.876 L 55.21,-8.8812 c 0.152,-0.694 -0.377,-1.351 -1.088,-1.351 H 41.905 c -0.525,0 -0.979,0.367 -1.089,0.88 l -1.755,8.209 z m -216.5493,27.06 h -0.139 l -8.257,-16.652 h 11.31 z m -13.807,-27.06 -4.747,-8.518 c -0.197,-0.353 -0.569,-0.571 -0.973,-0.571 h -11.907 c -0.844,0 -1.381,0.902 -0.979,1.644 l 27.171,50.089 c 0.194,0.359 0.57,0.583 0.978,0.583 h 13.29 c 0.523,0 0.976,-0.365 1.088,-0.876 l 10.961,-50.089 c 0.152,-0.694 -0.377,-1.351 -1.088,-1.351 h -12.217 c -0.525,0 -0.979,0.367 -1.089,0.88 l -1.755,8.209 z m 517.9793,-39.4791 -6.146,-39.098 c -0.119,-0.757 0.467,-1.442 1.233,-1.442 h 6.181 c 1.024,0 1.896,0.745 2.055,1.756 l 6.06,38.396 c 0.119,0.757 -0.466,1.442 -1.233,1.442 h -6.917 c -0.614,0 -1.138,-0.447 -1.233,-1.054 m -77.0618,-12.7966 h -7.207 c -0.689,0 -1.334,-0.342 -1.721,-0.912 l -9.942,-14.642 -4.213,14.07 c -0.263,0.88 -1.073,1.484 -1.993,1.484 h -7.084 c -0.856,0 -1.457,-0.842 -1.182,-1.651 l 7.936,-23.294 -7.464,-10.531 c -0.586,-0.827 0.005,-1.97 1.018,-1.97 h 7.2 c 0.683,0 1.322,0.334 1.71,0.895 l 23.968,34.591 c 0.574,0.828 -0.019,1.96 -1.026,1.96 m 58.6183,-13.956 c -0.693,-4.097 -3.945,-6.847 -8.093,-6.847 -2.08,0 -3.744,0.669 -4.815,1.935 -1.06,1.256 -1.46,3.045 -1.123,5.037 0.645,4.06 3.95,6.899 8.035,6.899 2.036,0 3.689,-0.675 4.78,-1.954 1.099,-1.287 1.53,-3.088 1.216,-5.07 m 9.992,13.956 h -7.169 c -0.615,0 -1.138,-0.447 -1.234,-1.054 l -0.315,-2.004 -0.501,0.726 c -1.553,2.254 -5.014,3.007 -8.469,3.007 -7.922,0 -14.689,-6.003 -16.006,-14.422 -0.685,-4.201 0.288,-8.215 2.669,-11.016 2.189,-2.574 5.311,-3.646 9.031,-3.646 6.385,0 9.927,4.102 9.927,4.102 l -0.321,-1.993 c -0.12,-0.758 0.466,-1.443 1.233,-1.443 h 6.457 c 1.024,0 1.896,0.744 2.055,1.756 l 3.876,24.545 c 0.12,0.757 -0.466,1.442 -1.233,1.442 m -116.7913,-13.956 c -0.693,-4.097 -3.945,-6.847 -8.093,-6.847 -2.08,0 -3.744,0.669 -4.815,1.935 -1.06,1.256 -1.46,3.045 -1.123,5.037 0.645,4.06 3.95,6.899 8.035,6.899 2.036,0 3.689,-0.675 4.78,-1.954 1.099,-1.287 1.531,-3.088 1.216,-5.07 m 9.992,13.956 h -7.169 c -0.615,0 -1.138,-0.447 -1.233,-1.054 l -0.316,-2.004 -0.501,0.726 c -1.553,2.254 -5.014,3.007 -8.469,3.007 -7.921,0 -14.689,-6.003 -16.006,-14.422 -0.685,-4.201 0.288,-8.215 2.669,-11.016 2.189,-2.574 5.311,-3.646 9.031,-3.646 6.385,0 9.927,4.102 9.927,4.102 l -0.321,-1.993 c -0.12,-0.758 0.466,-1.443 1.233,-1.443 h 6.457 c 1.024,0 1.896,0.744 2.055,1.756 l 3.876,24.545 c 0.12,0.757 -0.466,1.442 -1.233,1.442 m -43.0269,-0.172 c -0.818,-5.375 -4.924,-5.375 -8.894,-5.375 h -2.259 l 1.585,10.035 c 0.096,0.607 0.618,1.054 1.233,1.054 h 1.035 c 2.703,0 5.256,0 6.572,-1.54 0.787,-0.922 1.026,-2.287 0.728,-4.174 m -1.728,14.023 h -14.974 c -1.024,0 -1.896,-0.745 -2.055,-1.756 l -6.055,-38.396 c -0.119,-0.757 0.466,-1.442 1.233,-1.442 h 7.149 c 1.024,0 1.896,0.745 2.055,1.756 l 1.634,10.358 c 0.16,1.012 1.031,1.757 2.055,1.757 h 4.739 c 9.863,0 15.555,4.773 17.043,14.233 0.669,4.138 0.027,7.389 -1.911,9.665 -2.129,2.502 -5.904,3.825 -10.913,3.825 m 108.5272,-14.023 c -0.818,-5.375 -4.923,-5.375 -8.894,-5.375 h -2.259 l 1.585,10.035 c 0.096,0.607 0.619,1.054 1.233,1.054 h 1.035 c 2.703,0 5.256,0 6.572,-1.54 0.787,-0.922 1.026,-2.287 0.728,-4.174 m -1.728,14.023 h -14.974 c -1.024,0 -1.896,-0.745 -2.055,-1.756 l -6.055,-38.396 c -0.119,-0.757 0.466,-1.442 1.233,-1.442 h 7.683 c 0.717,0 1.327,0.521 1.438,1.229 l 1.717,10.885 c 0.16,1.012 1.031,1.757 2.055,1.757 h 4.739 c 9.863,0 15.555,4.773 17.043,14.233 0.669,4.138 0.027,7.389 -1.911,9.665 -2.129,2.502 -5.903,3.825 -10.913,3.825 m -161.6161,-40.475 -4.55,18.557 h 3.561 l 3.442,-14.442 7.914,14.442 h 3.798 l -15.748,-27.656 h -3.758 z M 82.525,-65.6994 c -0.989,1.121 -2.328,1.681 -4.016,1.681 -1.319,0 -2.546,-0.356 -3.679,-1.068 -1.135,-0.712 -2.045,-1.701 -2.731,-2.967 -0.686,-1.267 -1.028,-2.691 -1.028,-4.274 0,-1.767 0.5,-3.205 1.503,-4.313 1.002,-1.107 2.242,-1.661 3.719,-1.661 1.346,0 2.612,0.369 3.799,1.108 1.187,0.738 2.136,1.746 2.848,3.026 0.713,1.28 1.069,2.672 1.069,4.175 0,1.74 -0.495,3.171 -1.484,4.293 m -8.527,12.206 -1.661,-10.604 c 0.791,0.976 1.806,1.761 3.047,2.354 1.239,0.594 2.65,0.891 4.233,0.891 1.529,0 2.908,-0.376 4.135,-1.128 1.226,-0.752 2.182,-1.787 2.868,-3.106 0.686,-1.319 1.029,-2.809 1.029,-4.472 0,-2.162 -0.515,-4.153 -1.543,-5.974 -1.029,-1.819 -2.388,-3.264 -4.075,-4.332 -1.689,-1.068 -3.469,-1.602 -5.342,-1.602 -1.635,0 -2.981,0.329 -4.036,0.988 -1.055,0.659 -1.912,1.623 -2.571,2.889 l -0.515,-3.205 h -3.403 l 4.313,27.301 z M 39.4576,-76.5416 c 0.976,-1.121 2.308,-1.681 3.996,-1.681 1.319,0 2.552,0.356 3.699,1.069 1.148,0.712 2.064,1.701 2.751,2.967 0.685,1.266 1.028,2.691 1.028,4.273 0,1.767 -0.501,3.198 -1.503,4.293 -1.003,1.095 -2.256,1.642 -3.759,1.642 -1.32,0 -2.572,-0.37 -3.759,-1.108 -1.187,-0.738 -2.136,-1.741 -2.849,-3.007 -0.712,-1.266 -1.068,-2.651 -1.068,-4.155 0,-1.741 0.488,-3.171 1.464,-4.293 m 9.892,-4.253 0.474,2.968 c -0.844,-1.108 -1.899,-1.986 -3.165,-2.631 -1.266,-0.647 -2.704,-0.969 -4.313,-0.969 -1.53,0 -2.902,0.369 -4.115,1.107 -1.214,0.738 -2.163,1.767 -2.848,3.086 -0.687,1.319 -1.029,2.823 -1.029,4.51 0,2.111 0.507,4.083 1.523,5.916 1.016,1.833 2.347,3.29 3.996,4.372 1.648,1.081 3.357,1.622 5.124,1.622 3.297,0 5.553,-1.279 6.766,-3.837 l 1.781,11.157 h 3.521 l -4.313,-27.301 z m -28.8284,15.3321 c -1.253,-1.094 -2.104,-2.421 -2.552,-3.976 h 11.474 c 0.026,0.21 0.04,0.501 0.04,0.87 0,1.478 -0.395,2.638 -1.187,3.482 -0.792,0.844 -1.913,1.266 -3.363,1.266 -1.688,0 -3.159,-0.548 -4.412,-1.642 m 10.406,2.454 c 1.306,-1.439 1.958,-3.305 1.958,-5.6 0,-0.764 -0.039,-1.397 -0.118,-1.899 -0.079,-0.501 -0.212,-1.095 -0.396,-1.78 h -14.877 c -0.079,-1.979 0.435,-3.502 1.543,-4.57 1.108,-1.068 2.612,-1.602 4.511,-1.602 1.319,0 2.519,0.164 3.601,0.494 1.081,0.33 2.149,0.824 3.205,1.484 l -0.476,-2.968 c -2.031,-1.371 -4.431,-2.057 -7.201,-2.057 -1.82,0 -3.396,0.39 -4.728,1.167 -1.332,0.777 -2.348,1.854 -3.046,3.225 -0.699,1.371 -1.049,2.914 -1.049,4.629 0,1.688 0.422,3.435 1.266,5.243 0.845,1.806 2.124,3.323 3.839,4.55 1.714,1.226 3.824,1.84 6.33,1.84 2.453,0 4.333,-0.719 5.638,-2.156 m -18.0138,-1.4448 c -1.556,0 -2.875,-0.561 -3.956,-1.681 -1.082,-1.122 -1.794,-2.751 -2.137,-4.888 l -1.543,-9.772 h -3.522 l 3.047,19.308 h 3.403 l -0.515,-3.283 c 1.583,2.268 3.483,3.402 5.698,3.402 0.554,0 1.068,-0.039 1.543,-0.119 l -0.475,-3.086 c -0.474,0.079 -0.989,0.119 -1.543,0.119 m -24.5657,-1.0092 c -1.253,-1.094 -2.104,-2.421 -2.552,-3.976 h 11.474 c 0.026,0.21 0.04,0.501 0.04,0.87 0,1.478 -0.396,2.638 -1.187,3.482 -0.792,0.844 -1.913,1.266 -3.363,1.266 -1.689,0 -3.159,-0.548 -4.412,-1.642 m 10.406,2.454 c 1.305,-1.439 1.958,-3.305 1.958,-5.6 0,-0.764 -0.039,-1.397 -0.118,-1.899 -0.079,-0.501 -0.212,-1.095 -0.396,-1.78 h -14.877 c -0.079,-1.979 0.435,-3.502 1.543,-4.57 1.108,-1.068 2.612,-1.602 4.511,-1.602 1.319,0 2.519,0.164 3.601,0.494 1.081,0.33 2.149,0.824 3.204,1.484 l -0.475,-2.968 c -2.031,-1.371 -4.431,-2.057 -7.201,-2.057 -1.82,0 -3.396,0.39 -4.728,1.167 -1.332,0.777 -2.348,1.854 -3.046,3.225 -0.699,1.371 -1.049,2.914 -1.049,4.629 0,1.688 0.422,3.435 1.266,5.243 0.844,1.806 2.124,3.323 3.838,4.55 1.715,1.226 3.824,1.84 6.331,1.84 2.453,0 4.333,-0.719 5.638,-2.156 m -24.4869,-17.7856 h -3.561 l -2.057,14.837 -6.766,-14.837 h -3.522 l -2.77,19.308 h 3.522 l 1.741,-15.193 6.805,15.193 h 3.324 l 2.017,-15.154 6.529,15.154 h 3.6 z M -59.063,-65.225 c -1.201,-0.778 -2.124,-1.807 -2.77,-3.086 -0.647,-1.28 -0.969,-2.619 -0.969,-4.017 0,-1.741 0.494,-3.171 1.484,-4.292 0.988,-1.122 2.261,-1.682 3.817,-1.682 1.53,0 2.889,0.402 4.076,1.207 1.187,0.805 2.11,1.852 2.769,3.146 0.659,1.292 0.99,2.637 0.99,4.035 0,1.715 -0.495,3.12 -1.484,4.215 -0.989,1.093 -2.262,1.641 -3.818,1.641 -1.53,0 -2.896,-0.389 -4.095,-1.167 M -50.28,-62 c 1.332,-0.766 2.368,-1.827 3.106,-3.185 0.738,-1.359 1.108,-2.896 1.108,-4.61 0,-1.952 -0.482,-3.825 -1.444,-5.618 -0.963,-1.794 -2.321,-3.251 -4.075,-4.372 -1.755,-1.122 -3.766,-1.682 -6.034,-1.682 -1.688,0 -3.199,0.383 -4.531,1.148 -1.331,0.764 -2.374,1.833 -3.125,3.205 -0.752,1.37 -1.128,2.914 -1.128,4.628 0,1.979 0.481,3.859 1.444,5.639 0.963,1.781 2.321,3.224 4.076,4.332 1.753,1.108 3.764,1.663 6.033,1.663 1.715,0 3.238,-0.383 4.57,-1.148 m -20.7559,4.1545 c -0.897,0.87 -2.255,1.305 -4.075,1.305 h -4.471 l -1.82,-11.513 h 4.668 c 2.401,0 4.175,0.639 5.322,1.919 1.148,1.279 1.721,2.894 1.721,4.847 0,1.424 -0.448,2.571 -1.345,3.442 m 3.027,2.373 c 1.464,-1.318 2.196,-3.112 2.196,-5.38 0,-3.113 -0.944,-5.599 -2.829,-7.459 -1.887,-1.859 -4.715,-2.789 -8.487,-2.789 h -4.748 l -1.543,-9.694 h -3.759 l 4.313,27.301 h 8.309 c 2.901,0 5.084,-0.66 6.548,-1.979' })
                            )
                        )
                    );
                default:
                    return Object(belter_src["jsxToHTML"])(
                        'svg',
                        { width: '100', height: '32', viewBox: '0 0 95 32', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                        Object(belter_src["jsxToHTML"])('path', { fill: primary, d: 'M 52.732 6.347 C 52.83 5.963 53.122 5.675 53.512 5.675 L 60.626 5.675 C 66.571 5.675 70.664 10.187 69.69 15.851 C 68.813 21.515 63.16 25.931 57.313 25.931 L 50.004 25.931 C 49.711 25.931 49.516 25.739 49.614 25.451 L 52.732 6.347 Z M 55.753 21.515 L 57.02 21.515 C 60.236 21.515 63.355 19.787 64.037 15.851 C 64.622 12.203 62.478 10.187 58.97 10.187 L 57.995 10.187 C 57.8 10.187 57.605 10.283 57.605 10.475 L 55.753 21.515 Z' }),
                        Object(belter_src["jsxToHTML"])('path', { fill: primary, d: 'M 43.571 10.763 L 43.084 13.547 L 48.737 13.547 C 49.029 13.547 49.224 13.739 49.224 14.027 L 48.639 17.387 C 48.542 17.771 48.249 17.963 47.859 17.963 L 42.987 17.963 C 42.597 17.963 42.304 18.251 42.207 18.635 L 41.72 21.515 L 47.762 21.515 C 48.054 21.515 48.249 21.707 48.152 21.995 L 47.665 25.355 C 47.567 25.643 47.275 25.931 46.885 25.931 L 36.067 25.931 C 35.775 25.931 35.58 25.643 35.58 25.451 L 38.699 6.347 C 38.796 5.963 39.186 5.675 39.478 5.675 L 50.393 5.675 C 50.588 5.675 50.881 5.963 50.783 6.155 L 50.296 9.515 C 50.198 9.899 49.906 10.091 49.516 10.091 L 44.254 10.091 C 43.864 10.187 43.571 10.379 43.571 10.763 Z' }),
                        Object(belter_src["jsxToHTML"])('path', { fill: primary, d: 'M 74.563 25.931 L 70.274 25.931 C 69.982 25.931 69.787 25.739 69.787 25.451 L 73.003 6.347 C 73.003 5.963 73.393 5.675 73.685 5.675 L 78.071 5.675 C 78.266 5.675 78.558 5.963 78.461 6.251 L 75.342 25.355 C 75.245 25.643 74.952 25.931 74.563 25.931 Z' }),
                        Object(belter_src["jsxToHTML"])('path', { fill: primary, d: 'M 34.118 25.931 L 28.466 25.931 C 28.173 25.931 27.978 25.835 27.881 25.643 L 24.178 18.155 L 24.08 18.155 L 22.911 25.451 C 22.813 25.739 22.618 25.931 22.326 25.931 L 17.843 25.931 C 17.551 25.931 17.356 25.739 17.453 25.451 L 20.572 6.251 C 20.669 5.963 20.864 5.675 21.156 5.675 L 28.855 5.675 C 33.046 5.675 35.97 7.595 35.288 11.915 C 34.8 14.699 32.754 17.195 29.635 17.675 L 34.508 25.355 C 34.703 25.547 34.411 25.931 34.118 25.931 Z M 24.665 14.795 L 25.152 14.795 C 27.004 14.795 29.05 14.411 29.44 12.203 C 29.83 10.091 28.661 9.707 26.711 9.707 L 25.932 9.707 C 25.639 9.707 25.445 9.899 25.445 10.091 L 24.665 14.795 Z' }),
                        Object(belter_src["jsxToHTML"])('path', { fill: primary, d: 'M 86.16 25.931 L 81.872 25.931 C 81.579 25.931 81.384 25.739 81.482 25.451 L 83.918 10.187 L 79.923 10.187 C 79.63 10.187 79.435 9.899 79.533 9.611 L 80.02 6.347 C 80.118 5.963 80.41 5.675 80.8 5.675 L 94.249 5.675 C 94.444 5.675 94.736 5.963 94.639 6.251 L 94.054 9.515 C 94.054 9.899 93.761 10.187 93.372 10.187 L 89.473 10.187 L 86.939 25.355 C 86.939 25.643 86.647 25.931 86.16 25.931 Z' }),
                        Object(belter_src["jsxToHTML"])('path', { fill: primary, d: 'M 17.648 11.435 C 17.648 11.819 17.161 12.011 16.868 11.723 C 15.894 10.763 14.529 10.283 13.068 10.283 C 9.657 10.283 7.025 12.779 6.441 15.851 C 5.953 19.019 7.902 21.323 11.313 21.323 C 12.678 21.323 14.237 20.843 15.407 19.979 C 15.796 19.787 16.284 20.075 16.186 20.459 L 15.407 25.067 C 15.309 25.355 15.114 25.547 14.822 25.643 C 13.165 26.123 11.898 26.507 10.339 26.507 C 1.178 26.507 -0.284 19.019 0.203 15.851 C 1.47 6.923 9.072 4.907 13.652 5.195 C 15.114 5.195 16.479 5.387 17.745 5.867 C 18.233 6.059 18.428 6.443 18.33 6.923 L 17.648 11.435 Z' })
                    );

            }
        }
    });
}
// CONCATENATED MODULE: ./src/funding/credit/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */


 // eslint-disable-line no-unused-vars








var CREDIT_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["b" /* getCheckoutUrl */],

    defaultLabel: constants["c" /* BUTTON_LABEL */].CREDIT,

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].CREDIT] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: function Label(_ref) {
            var locale = _ref.locale,
                logoColor = _ref.logoColor;

            if (locale.country === src["c" /* COUNTRY */].DE) {
                return Object(belter_src["jsxToHTML"])(CreditLogo, { logoColor: logoColor });
            }

            return Object(belter_src["jsxToHTML"])(
                belter_src["Fragment"],
                null,
                Object(belter_src["jsxToHTML"])(logo["a" /* PPLogo */], { logoColor: logoColor }),
                ' ',
                Object(belter_src["jsxToHTML"])(logo["b" /* PayPalLogo */], { logoColor: logoColor }),
                ' ',
                Object(belter_src["jsxToHTML"])(CreditLogo, { logoColor: logoColor })
            );
        },

        colors: [constants["b" /* BUTTON_COLOR */].DARKBLUE],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["k" /* LOGO_COLOR */].WHITE, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].DARKBLUE, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].DARKBLUE, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].DARKBLUE, _secondaryColors),

        defaultColor: constants["b" /* BUTTON_COLOR */].DARKBLUE,

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/credit/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CREDIT_CONFIG", function() { return CREDIT_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CreditLogo", function() { return CreditLogo; });



/***/ }),

/***/ "./src/funding/eps/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/eps/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function EpsLogo(_ref) {
    var logoColor = _ref.logoColor,
        nonce = _ref.nonce;

    return Object(src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].EPS,
        logoColor: logoColor,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '52px', height: '32px', viewBox: '0 0 52 32', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])(
                    'title',
                    null,
                    'Page 1'
                ),
                Object(src["jsxToHTML"])(
                    'desc',
                    null,
                    'Created with Sketch.'
                ),
                Object(src["jsxToHTML"])(
                    'defs',
                    null,
                    Object(src["jsxToHTML"])('polygon', { id: 'path-1', points: '0 0.0330469345 12.6787834 0.0330469345 12.6787834 12.7180364 0 12.7180364' }),
                    Object(src["jsxToHTML"])('polygon', { id: 'path-3', points: '0.0103575649 0.00128879493 1.81575683 0.00128879493 1.81575683 2.2832981 0.0103575649 2.2832981' })
                ),
                Object(src["jsxToHTML"])(
                    'g',
                    { id: 'Page-1', stroke: 'none', 'stroke-width': '1', fill: 'none', 'fill-rule': 'evenodd', transform: 'matrix(1.333759, 0, 0, 1.333759, 0.000008, -0.000005)' },
                    Object(src["jsxToHTML"])(
                        'g',
                        { id: 'SPB_&_AltPay_NewAssets', transform: 'translate(-100.000000, -159.000000)' },
                        Object(src["jsxToHTML"])(
                            'g',
                            { id: 'Page-1', transform: 'translate(100.000000, 159.000000)' },
                            Object(src["jsxToHTML"])('path', { d: 'M30.5812744,12.0000152 L27.4748661,12.0000152 C27.129394,12.0000152 26.8482796,11.7245987 26.8482796,11.3798207 C26.8482796,11.0350427 27.129394,10.7315163 27.4748661,10.7315163 L32.2041612,10.7315163 L32.2041612,8.39747822 L27.4748661,8.39747822 C25.824238,8.39747822 24.4812484,9.74381226 24.4812484,11.3911357 C24.4812484,13.0384592 25.824238,14.3847932 27.4748661,14.3847932 L30.5390793,14.3847932 C30.8846021,14.3847932 31.1657165,14.6590934 31.1657165,15.0038715 C31.1657165,15.3486495 30.8846021,15.6025522 30.5390793,15.6025522 L23.9683147,15.6025522 C23.4104473,16.6680913 22.8679974,17.5814106 21.7668179,18.0380702 L30.5812744,18.0380702 C32.2041612,18.0146791 33.5316827,16.6405903 33.5316827,15.0078292 C33.5316827,13.3751696 32.2041612,12.0234063 30.5812744,12.0000152', id: 'Fill-1', fill: '#71706F' }),
                            Object(src["jsxToHTML"])('path', { d: 'M18.6731848,15.6025522 L16.2795788,15.6025522 L16.2795788,13.1992034 C16.2795788,11.8562182 17.3483005,10.7635839 18.6731848,10.7635839 C19.9980691,10.7635839 21.0759195,11.8562182 21.0759195,13.1992034 C21.0759195,14.5422393 19.9980691,15.6025522 18.6731848,15.6025522 M18.6731848,8.39747822 C16.0403551,8.39747822 13.8959637,10.5557023 13.8959637,13.2076262 L13.8959637,13.3091061 L13.8959637,23.2135459 L16.2795788,23.2135459 L16.2795788,18.0380702 L18.6682147,18.0380702 C21.3010951,18.0380702 23.4379299,15.8511273 23.4379299,13.1992034 C23.4379299,10.5472795 21.3060651,8.39747822 18.6731848,8.39747822', id: 'Fill-3', fill: '#71706F' }),
                            Object(src["jsxToHTML"])(
                                'g',
                                { id: 'Group-7', transform: 'translate(0.000000, 6.842233)' },
                                Object(src["jsxToHTML"])(
                                    'mask',
                                    { id: 'mask-2', fill: 'white' },
                                    Object(src["jsxToHTML"])('polygon', { id: '', points: '0 0.0330469345 12.6787834 0.0330469345 12.6787834 12.7180364 0 12.7180364', transform: 'matrix(1, 0, 0, 1, 0, 0)' })
                                ),
                                Object(src["jsxToHTML"])('g', { id: 'Clip-6' }),
                                Object(src["jsxToHTML"])('path', { d: 'M6.34967672,11.1958376 C4.09589259,11.1958376 2.20112146,9.58905539 1.68833992,7.48994334 C1.68833992,7.48994334 1.54020078,6.7959222 1.54020078,6.3389074 C1.54020078,5.8818926 1.68042835,5.18071712 1.68042835,5.18071712 C2.19686138,3.08678055 4.08935033,1.52754165 6.33943225,1.52754165 C8.98580286,1.52754165 11.1573269,3.67982918 11.1573269,6.32744017 L11.1573269,7.49182072 L4.12642315,7.49182072 C4.54162861,8.30366004 5.38137113,8.76031966 6.34967672,8.76031966 L12.6701111,8.76031966 L12.6787834,1.89423932 C12.6787834,0.870560677 11.8417287,0.0330469345 10.8185493,0.0330469345 L1.86031521,0.0330469345 C0.837135761,0.0330469345 -2.02860858e-05,0.845190698 -2.02860858e-05,1.86886934 L-2.02860858e-05,10.831474 C-2.02860858e-05,11.8551526 0.837135761,12.7180364 1.86031521,12.7180364 L10.8185493,12.7180364 C11.7367482,12.7180364 12.5027001,12.0584169 12.6506871,11.1958376 L6.34967672,11.1958376 Z', id: 'Fill-5', fill: '#C8036F', mask: 'url(#mask-2)' })
                            ),
                            Object(src["jsxToHTML"])('path', { d: 'M6.33943732,10.6481099 C5.37483394,10.6481099 4.53595358,11.238926 4.11907451,12.0000254 L8.55990156,12.0000254 C8.1430225,11.238926 7.30419285,10.6481099 6.33943732,10.6481099', id: 'Fill-8', fill: '#C8036F' }),
                            Object(src["jsxToHTML"])('path', { d: 'M10.396619,3.96072558 C10.396619,1.77327526 8.57959428,1.52219873e-05 6.33823537,1.52219873e-05 C4.134,1.52219873e-05 2.34126788,1.71527949 2.28238752,3.85259873 C2.28142393,3.86163044 2.28218466,3.87040846 2.28218466,3.87969387 L2.28218466,5.0699518 C2.28218466,5.21232812 2.39806892,5.35308076 2.54392588,5.35308076 L4.03703251,5.35308076 C4.18288947,5.35308076 4.31079324,5.21232812 4.31079324,5.0699518 L4.31079324,3.96072558 C4.31079324,2.86839577 5.22011704,1.97968541 6.33940182,1.97968541 C7.45868661,1.97968541 8.3680104,2.86839577 8.3680104,3.96072558 L8.3680104,5.0699518 C8.3680104,5.21232812 8.486329,5.35308076 8.63218596,5.35308076 L10.1253433,5.35308076 C10.2712003,5.35308076 10.396619,5.21232812 10.396619,5.0699518 L10.396619,3.96072558 Z', id: 'Fill-10', fill: '#C8036F' }),
                            Object(src["jsxToHTML"])('path', { d: 'M20.7598572,20.7474063 C20.7598572,20.8523366 20.8407987,20.9002858 20.9277753,20.9002858 C21.0206856,20.9002858 21.1436192,20.8253429 21.1436192,20.687381 C21.1436192,20.5884888 21.0716036,20.5345015 20.9907129,20.5345015 C20.8827909,20.5345015 20.7598572,20.6034063 20.7598572,20.7474063 Z M20.0403098,20.7504 C20.0403098,20.8523366 20.1183098,20.9002858 20.2022434,20.9002858 C20.3071732,20.9002858 20.4211303,20.8253429 20.4211303,20.6843873 C20.4211303,20.5854444 20.3550991,20.5345015 20.2681732,20.5345015 C20.160302,20.5345015 20.0403098,20.6034063 20.0403098,20.7504 Z M21.3474437,21.133233 L21.1315997,22.3559645 C21.0236778,22.9739772 20.6189196,23.2570047 20.0702824,23.2570047 C19.6056296,23.2570047 19.2458559,22.9539856 19.3508364,22.3569793 L19.5666296,21.133233 L19.8994736,21.133233 L19.6835282,22.3559645 C19.6175984,22.7370723 19.7885087,22.9540364 20.1122746,22.9540364 C20.4450679,22.9540364 20.7298845,22.7559983 20.7988065,22.3569793 L21.0146505,21.133233 L21.3474437,21.133233 Z', id: 'Fill-12', fill: '#71706F' }),
                            Object(src["jsxToHTML"])('path', { d: 'M21.9179189,22.5590867 C21.9059501,22.8050233 22.0647901,22.9639915 22.2956458,22.9639915 C22.5864468,22.9639915 22.8682205,22.7389598 22.8862244,22.3971247 C22.898244,22.1481438 22.736361,22.0011501 22.511439,22.0011501 C22.2236302,22.0011501 21.9358213,22.2321691 21.9179189,22.5590867 Z M22.1517667,21.1331924 L22.0018525,21.9781142 C22.1307199,21.8042283 22.388556,21.7122368 22.5684429,21.7122368 C22.9401854,21.7122368 23.1980216,21.9302156 23.1980216,22.3350698 C23.1980216,22.9079746 22.7992479,23.2524989 22.2896614,23.2524989 C22.0917706,23.2524989 21.9238525,23.178926 21.8219657,22.9930148 L21.7650125,23.2135307 L21.4741607,23.2135307 L21.8429111,21.1331924 L22.1517667,21.1331924 Z', id: 'Fill-14', fill: '#71706F' }),
                            Object(src["jsxToHTML"])('path', { d: 'M24.7516112,22.3509666 C24.7755995,22.0972668 24.6256853,21.994011 24.3768257,21.994011 C24.1520559,21.994011 23.9451886,22.0972668 23.8551691,22.3509666 L24.7516112,22.3509666 Z M23.804251,22.6046664 C23.7922315,22.8076262 23.9511222,22.9733429 24.2209779,22.9733429 C24.3708921,22.9733429 24.5686814,22.9146875 24.6766034,22.812751 L24.8445215,23.006882 C24.6616931,23.1747298 24.3918375,23.2582985 24.1640247,23.2582985 C23.7383212,23.2582985 23.4894616,23.0032288 23.4894616,22.6132922 C23.4894616,22.0943746 23.8971612,21.7076854 24.4188179,21.7076854 C24.895541,21.7076854 25.1653459,21.9957869 25.0034629,22.6046664 L23.804251,22.6046664 Z', id: 'Fill-16', fill: '#71706F' }),
                            Object(src["jsxToHTML"])('path', { d: 'M25.8283814,21.7420871 L25.8133697,21.9376896 C25.9573502,21.7485311 26.131202,21.7099687 26.290042,21.7099687 C26.4339718,21.7099687 26.5628391,21.7610638 26.6318118,21.8360068 L26.4459913,22.1059941 C26.3800108,22.0461717 26.314081,22.0161844 26.2001239,22.0161844 C25.9872215,22.0161844 25.7774633,22.1438968 25.729436,22.4168778 L25.5885999,23.2135459 L25.2797442,23.2135459 L25.5405726,21.7420871 L25.8283814,21.7420871 Z', id: 'Fill-18', fill: '#71706F' }),
                            Object(src["jsxToHTML"])('polygon', { id: 'Fill-20', fill: '#71706F', points: '28.1192941 21.7420871 28.275142 22.9057573 28.8387909 21.7420871 29.1835529 21.7420871 28.4100952 23.2135459 28.0473293 23.2135459 27.900458 22.2428397 27.6635672 22.7250723 27.4057818 23.2135459 27.0460081 23.2135459 26.7851797 21.7420871 27.1329847 21.7420871 27.285891 22.9057573 27.8524307 21.7420871' }),
                            Object(src["jsxToHTML"])('path', { d: 'M30.5274503,22.3509666 C30.5513879,22.0972668 30.4015244,21.994011 30.1526649,21.994011 C29.9278951,21.994011 29.7210277,22.0972668 29.6310082,22.3509666 L30.5274503,22.3509666 Z M29.5800901,22.6046664 C29.5680706,22.8076262 29.7269614,22.9733429 29.996817,22.9733429 C30.1467312,22.9733429 30.3445205,22.9146875 30.4524425,22.812751 L30.6203606,23.006882 C30.4375322,23.1747298 30.1676766,23.2582985 29.9398638,23.2582985 C29.5141603,23.2582985 29.2653008,23.0032288 29.2653008,22.6132922 C29.2653008,22.0943746 29.6730004,21.7076854 30.1946571,21.7076854 C30.6713801,21.7076854 30.941185,21.9957869 30.7793021,22.6046664 L29.5800901,22.6046664 Z', id: 'Fill-22', fill: '#71706F' }),
                            Object(src["jsxToHTML"])('path', { d: 'M31.3524449,21.3412364 C31.3524449,21.4461666 31.4304449,21.5003569 31.5144293,21.5003569 C31.63432,21.5003569 31.7452342,21.4222173 31.7452342,21.2753759 C31.7452342,21.1762808 31.6702264,21.119249 31.5892849,21.119249 C31.4783707,21.119249 31.3524449,21.1913505 31.3524449,21.3412364 Z M31.625242,21.742082 L31.3645151,23.2135408 L31.0556594,23.2135408 L31.3164878,21.742082 L31.625242,21.742082 Z', id: 'Fill-24', fill: '#71706F' }),
                            Object(src["jsxToHTML"])('path', { d: 'M32.9955925,22.1060753 C32.8996393,21.9981006 32.7767563,21.9681133 32.629885,21.9681133 C32.4259085,21.9681133 32.2820801,22.0371704 32.2820801,22.1661006 C32.2820801,22.2740753 32.398928,22.3191831 32.5728811,22.3341006 C32.8426861,22.3580499 33.1874481,22.4481133 33.1154832,22.8290182 C33.0645651,23.1049421 32.7887251,23.266904 32.4049631,23.266904 C32.1651815,23.266904 31.9342752,23.2129167 31.7784273,22.9939738 L31.9792596,22.7750309 C32.0901737,22.9279104 32.2850723,22.9909801 32.4589241,22.9939738 C32.6057953,22.9939738 32.7797485,22.9399865 32.806729,22.8020245 C32.8337095,22.6700499 32.7167602,22.619107 32.5009163,22.5979992 C32.2490645,22.5739992 31.9733259,22.481145 31.9733259,22.202126 C31.9733259,21.833145 32.3719475,21.7042148 32.6718265,21.7042148 C32.8996393,21.7042148 33.0675573,21.7551577 33.2055027,21.9022021 L32.9955925,22.1060753 Z', id: 'Fill-26', fill: '#71706F' }),
                            Object(src["jsxToHTML"])('path', { d: 'M33.9703034,21.7420871 L33.8294672,22.534493 C33.7844828,22.7865184 33.8984399,22.9606579 34.1562254,22.9606579 C34.3990498,22.9606579 34.6059172,22.7593725 34.6478079,22.5134359 L34.7827104,21.7420871 L35.0915153,21.7420871 L34.8307884,23.2135459 L34.5519562,23.2135459 L34.5729016,23.0003366 C34.3990498,23.1652922 34.2280888,23.2430765 34.0213229,23.2430765 C33.658557,23.2430765 33.442713,22.982882 33.5206116,22.5361167 L33.6615492,21.7420871 L33.9703034,21.7420871 Z', id: 'Fill-28', fill: '#71706F' }),
                            Object(src["jsxToHTML"])('path', { d: 'M36.4472345,23.2135459 L36.588172,22.4259603 C36.633055,22.1709412 36.5462813,22.0020279 36.2644061,22.0020279 C36.0185895,22.0020279 35.8116207,22.199863 35.7697299,22.4428059 L35.6348274,23.2135459 L35.3260225,23.2135459 L35.5869016,21.7420871 L35.8686246,21.7420871 L35.8476792,21.957123 C36.0185895,21.7981548 36.1953827,21.7197615 36.3872384,21.7197615 C36.7470121,21.7197615 36.9809614,21.9701632 36.9000199,22.4231696 L36.7590823,23.2135459 L36.4472345,23.2135459 Z', id: 'Fill-30', fill: '#71706F' }),
                            Object(src["jsxToHTML"])(
                                'g',
                                { id: 'Group-34', transform: 'translate(37.174252, 21.709040)' },
                                Object(src["jsxToHTML"])(
                                    'mask',
                                    { id: 'mask-4', fill: 'white' },
                                    Object(src["jsxToHTML"])('polygon', { id: '', points: '0.0103575649 0.00128879493 1.81575683 0.00128879493 1.81575683 2.2832981 0.0103575649 2.2832981', transform: 'matrix(1, 0, 0, 1, 0, 0)' })
                                ),
                                Object(src["jsxToHTML"])('g', { id: 'Clip-33' }),
                                Object(src["jsxToHTML"])('path', { d: 'M0.406639662,0.85909852 C0.406639662,1.11092093 0.571514824,1.26400338 0.808507022,1.26400338 C1.44691014,1.26400338 1.61787113,0.2832 0.979214434,0.2832 C0.676444603,0.2832 0.406639662,0.508028753 0.406639662,0.85909852 Z M0.319663069,1.70747061 C0.298717685,1.91043044 0.45456554,1.9925277 0.715495319,1.9925277 C0.943358778,1.9925277 1.18922614,1.86522114 1.24617932,1.54134799 L1.291113,1.288663 C1.15621053,1.4776186 0.910343173,1.55220634 0.72756554,1.55220634 C0.349686476,1.55220634 0.085916645,1.32717463 0.085916645,0.91912389 C0.085916645,0.337339535 0.517553836,0.00128879493 1.00619493,0.00128879493 C1.21316372,0.00128879493 1.39903498,0.099572093 1.46501547,0.267572093 L1.51598427,0.0330520085 L1.8157619,0.0330520085 L1.55787503,1.54824863 C1.46202328,2.1092296 1.04524564,2.28331839 0.664526528,2.28331839 C0.208748895,2.28331839 -0.0429507152,2.06265032 0.0198854356,1.70747061 L0.319663069,1.70747061 Z', id: 'Fill-32', fill: '#71706F', mask: 'url(#mask-4)' })
                            )
                        )
                    )
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/eps/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars







var EPS_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["a" /* getAltPayUrl */],

    defaultLabel: constants["c" /* BUTTON_LABEL */].EPS,

    layouts: [constants["d" /* BUTTON_LAYOUT */].VERTICAL],

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].EPS] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: EpsLogo,

        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].SILVER],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["k" /* LOGO_COLOR */].BLACK, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors),

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/eps/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "EPS_CONFIG", function() { return EPS_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "EpsLogo", function() { return EpsLogo; });



/***/ }),

/***/ "./src/funding/giropay/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/giropay/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function GiropayLogo(_ref) {
    var logoColor = _ref.logoColor,
        nonce = _ref.nonce;


    return Object(src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].GIROPAY,
        logoColor: logoColor,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '75px', height: '32px', viewBox: '0 0 75 32', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])(
                    'title',
                    null,
                    'logo giropay'
                ),
                Object(src["jsxToHTML"])(
                    'desc',
                    null,
                    'Created with Sketch.'
                ),
                Object(src["jsxToHTML"])(
                    'defs',
                    null,
                    Object(src["jsxToHTML"])('polygon', { id: 'path-1', points: '0 0.017902439 46.0918699 0.017902439 46.0918699 19.8373984 0 19.8373984' }),
                    Object(src["jsxToHTML"])('polygon', { id: 'path-3', points: '0 19.9821138 46.0918699 19.9821138 46.0918699 0.162601626 0 0.162601626' })
                ),
                Object(src["jsxToHTML"])(
                    'g',
                    { id: 'SPB_&_AltPay_NewAssets', stroke: 'none', 'stroke-width': '1', fill: 'none', 'fill-rule': 'evenodd', transform: 'matrix(1.614571, 0, 0, 1.614571, -161.457123, -256.816772)' },
                    Object(src["jsxToHTML"])(
                        'g',
                        { id: 'logo-giropay', transform: 'translate(100.000000, 159.000000)' },
                        Object(src["jsxToHTML"])(
                            'g',
                            { id: 'Group-3', transform: 'translate(0.000000, 0.144715)' },
                            Object(src["jsxToHTML"])(
                                'mask',
                                { id: 'mask-2', fill: 'white' },
                                Object(src["jsxToHTML"])('polygon', { id: '', points: '0 0.017902439 46.0918699 0.017902439 46.0918699 19.8373984 0 19.8373984', transform: 'matrix(1, 0, 0, 1, 0, 0)' })
                            ),
                            Object(src["jsxToHTML"])('g', { id: 'Clip-2' }),
                            Object(src["jsxToHTML"])('path', { d: 'M0,3.5735122 C0,1.60977236 1.5998374,0.017902439 3.57349593,0.017902439 L42.5182114,0.017902439 C44.4918699,0.017902439 46.0918699,1.60977236 46.0918699,3.5735122 L46.0918699,16.2818049 C46.0918699,18.2455447 44.4918699,19.8374146 42.5182114,19.8374146 L3.57349593,19.8374146 C1.5998374,19.8374146 0,18.2455447 0,16.2818049 L0,3.5735122 Z', id: 'Fill-1', fill: '#003A7D', mask: 'url(#mask-2)' })
                        ),
                        Object(src["jsxToHTML"])('path', { d: 'M1.46738211,3.84021138 L1.46738211,16.3065528 C1.46738211,17.5338699 2.46738211,18.5288293 3.70087805,18.5288293 L24.1036423,18.5288293 L24.1036423,1.61793496 L3.70087805,1.61793496 C2.46738211,1.61793496 1.46738211,2.61289431 1.46738211,3.84021138', id: 'Fill-4', fill: '#FFFFFF' }),
                        Object(src["jsxToHTML"])('path', { d: 'M5.67102439,10.0205528 C5.67102439,9.34152846 6.00582114,8.77730081 6.64663415,8.77730081 C7.42126829,8.77730081 7.74630894,9.39892683 7.74630894,9.95356098 C7.74630894,10.7187642 7.25866667,11.235187 6.64663415,11.235187 C6.13004878,11.235187 5.67102439,10.795187 5.67102439,10.0205528 Z M9.41053659,7.57226016 L7.8515122,7.57226016 L7.8515122,8.47112195 L7.8324878,8.47112195 C7.46907317,7.85908943 6.87606504,7.45746341 6.13964228,7.45746341 C4.59021138,7.45746341 3.8921626,8.56689431 3.8921626,10.0491707 C3.8921626,11.5221789 4.74321951,12.5550244 6.11102439,12.5550244 C6.79964228,12.5550244 7.37346341,12.2872195 7.78468293,11.7038049 L7.80370732,11.7038049 L7.80370732,11.9716098 C7.80370732,12.9472195 7.26826016,13.4158374 6.27362602,13.4158374 C5.55622764,13.4158374 5.11622764,13.2628293 4.59021138,13.0046179 L4.50419512,14.3626667 C4.90582114,14.5060813 5.58500813,14.6782764 6.40744715,14.6782764 C8.41590244,14.6782764 9.41053659,14.0182764 9.41053659,11.9716098 L9.41053659,7.57226016 Z', id: 'Fill-6', fill: '#ED1C24' }),
                        Object(src["jsxToHTML"])(
                            'mask',
                            { id: 'mask-4', fill: 'white' },
                            Object(src["jsxToHTML"])('polygon', { id: '', points: '0 19.9821138 46.0918699 19.9821138 46.0918699 0.162601626 0 0.162601626', transform: 'matrix(1, 0, 0, 1, 0, 0)' })
                        ),
                        Object(src["jsxToHTML"])('g', { id: 'Clip-9' }),
                        Object(src["jsxToHTML"])('path', { d: 'M10.5985366,6.75918699 L12.32,6.75918699 L12.32,5.49674797 L10.5985366,5.49674797 L10.5985366,6.75918699 Z M10.598374,12.5549593 L12.3198374,12.5549593 L12.3198374,7.57219512 L10.598374,7.57219512 L10.598374,12.5549593 Z', id: 'Fill-8', fill: '#ED1C24', mask: 'url(#mask-4)' }),
                        Object(src["jsxToHTML"])('path', { d: 'M17.1133333,7.51479675 C16.9411382,7.48617886 16.7307317,7.45739837 16.5299187,7.45739837 C15.7839024,7.45739837 15.3534959,7.85918699 15.0570732,8.4904065 L15.0380488,8.4904065 L15.0380488,7.57219512 L13.4694309,7.57219512 L13.4694309,12.5549593 L15.1910569,12.5549593 L15.1910569,10.4508943 C15.1910569,9.47544715 15.6404878,8.89203252 16.4439024,8.89203252 C16.6447154,8.89203252 16.835935,8.89203252 17.0273171,8.94943089 L17.1133333,7.51479675 Z', id: 'Fill-10', fill: '#ED1C24', mask: 'url(#mask-4)' }),
                        Object(src["jsxToHTML"])('path', { d: 'M20.0773496,11.4647154 C19.2835285,11.4647154 18.9583252,10.804878 18.9583252,10.0682927 C18.9583252,9.32243902 19.2835285,8.66243902 20.0773496,8.66243902 C20.8711707,8.66243902 21.196374,9.32243902 21.196374,10.0682927 C21.196374,10.804878 20.8711707,11.4647154 20.0773496,11.4647154 M20.0773496,12.6697561 C21.7223902,12.6697561 22.9752358,11.7133333 22.9752358,10.0682927 C22.9752358,8.41382114 21.7223902,7.45739837 20.0773496,7.45739837 C18.4323089,7.45739837 17.1794634,8.41382114 17.1794634,10.0682927 C17.1794634,11.7133333 18.4323089,12.6697561 20.0773496,12.6697561', id: 'Fill-11', fill: '#ED1C24', mask: 'url(#mask-4)' }),
                        Object(src["jsxToHTML"])('path', { d: 'M29.3757073,10.0110244 C29.3757073,10.8048455 28.9836748,11.3500488 28.3332683,11.3500488 C27.7594472,11.3500488 27.2812358,10.8048455 27.2812358,10.0780163 C27.2812358,9.332 27.7020488,8.77720325 28.3332683,8.77720325 C29.0026992,8.77720325 29.3757073,9.35102439 29.3757073,10.0110244 Z M25.5597724,14.5633821 L27.2812358,14.5633821 L27.2812358,11.856878 L27.3002602,11.856878 C27.6254634,12.4498862 28.2758699,12.6697236 28.8783089,12.6697236 C30.360748,12.6697236 31.1545691,11.4456585 31.1545691,9.97265041 C31.1545691,8.76777236 30.399122,7.45736585 29.0218862,7.45736585 C28.2376585,7.45736585 27.5106667,7.77297561 27.166439,8.47118699 L27.147252,8.47118699 L27.147252,7.5721626 L25.5597724,7.5721626 L25.5597724,14.5633821 Z', id: 'Fill-12', fill: '#FFFFFF', mask: 'url(#mask-4)' }),
                        Object(src["jsxToHTML"])('path', { d: 'M33.505252,10.9769919 C33.505252,10.4987805 33.9642764,10.3169919 34.5476911,10.3169919 C34.8059024,10.3169919 35.0546829,10.3361789 35.2745203,10.3457724 C35.2745203,10.929187 34.8633008,11.5221951 34.2128943,11.5221951 C33.8112683,11.5221951 33.505252,11.3212195 33.505252,10.9769919 Z M36.9769593,12.5550407 C36.900374,12.1628455 36.8813496,11.770813 36.8813496,11.3786179 L36.8813496,9.52317073 C36.8813496,8.00252033 35.7815122,7.45747967 34.5094797,7.45747967 C33.7730569,7.45747967 33.1322439,7.56268293 32.5202114,7.81130081 L32.5488293,8.97813008 C33.0270407,8.7103252 33.5816748,8.60512195 34.1364715,8.60512195 C34.7580976,8.60512195 35.2650894,8.78674797 35.2745203,9.46577236 C35.0546829,9.42756098 34.7485041,9.39894309 34.4711057,9.39894309 C33.5530569,9.39894309 31.8984228,9.58056911 31.8984228,11.1013821 C31.8984228,12.1820325 32.7784228,12.6698374 33.7634634,12.6698374 C34.4711057,12.6698374 34.9493171,12.392439 35.3415122,11.770813 L35.3606992,11.770813 C35.3606992,12.0290244 35.3893171,12.2872358 35.3989106,12.5550407 L36.9769593,12.5550407 Z', id: 'Fill-13', fill: '#FFFFFF', mask: 'url(#mask-4)' }),
                        Object(src["jsxToHTML"])('path', { d: 'M37.750748,14.5634634 C38.1045691,14.6398862 38.4583902,14.6782602 38.8218049,14.6782602 C40.3998537,14.6782602 40.7728618,13.463626 41.2606667,12.2107805 L43.0873333,7.5722439 L41.3658699,7.5722439 L40.3426179,10.8239512 L40.3234309,10.8239512 L39.2522114,7.5722439 L37.3967642,7.5722439 L39.414813,12.6698049 C39.2904228,13.1098049 38.9653821,13.3584228 38.5445691,13.3584228 C38.3053821,13.3584228 38.0949756,13.3296423 37.8655447,13.2532195 L37.750748,14.5634634 Z', id: 'Fill-14', fill: '#FFFFFF', mask: 'url(#mask-4)' })
                    )
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/giropay/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars







var GIROPAY_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["a" /* getAltPayUrl */],

    defaultLabel: constants["c" /* BUTTON_LABEL */].GIROPAY,

    layouts: [constants["d" /* BUTTON_LAYOUT */].VERTICAL],

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].GIROPAY] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: GiropayLogo,

        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].SILVER],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["k" /* LOGO_COLOR */].BLACK, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors),

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/giropay/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "GIROPAY_CONFIG", function() { return GIROPAY_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "GiropayLogo", function() { return GiropayLogo; });



/***/ }),

/***/ "./src/funding/ideal/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/ideal/logo.jsx


/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function IdealLogo(_ref) {
    var nonce = _ref.nonce;

    return Object(src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].IDEAL,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '38', height: '32', viewBox: '0 0 38 32', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])('polygon', { id: 'Fill-1', fill: '#000000', points: '4.47 27.632 10.452 27.632 10.452 17.982 4.47 17.982' }),
                Object(src["jsxToHTML"])(
                    'g',
                    { id: 'Group-9', transform: 'matrix(0.952642, 0, 0, 0.930979, 0.31993, 0.181113)' },
                    Object(src["jsxToHTML"])('path', { d: 'M11.1102604,13.937999 C11.1102604,15.8893766 9.51859887,17.4723289 7.55546104,17.4723289 C5.59238806,17.4723289 4.00066169,15.8893766 4.00066169,13.937999 C4.00066169,11.9865569 5.59238806,10.4043136 7.55546104,10.4043136 C9.51859887,10.4043136 11.1102604,11.9865569 11.1102604,13.937999', id: 'Fill-2', fill: '#000000' }),
                    Object(src["jsxToHTML"])(
                        'g',
                        { id: 'Group-6' },
                        Object(src["jsxToHTML"])(
                            'mask',
                            { id: 'mask-2', fill: 'white' },
                            Object(src["jsxToHTML"])('polygon', { id: '', points: '39.1898554 33.9678282 0 33.9678282 0 0.001572704 39.1898554 0.001572704', transform: 'matrix(1, 0, 0, 1, 0, 0)' })
                        ),
                        Object(src["jsxToHTML"])('g', { id: 'Clip-5' }),
                        Object(src["jsxToHTML"])('path', { d: 'M22.1049929,2.25750057 C26.4717361,2.25750057 30.1110886,3.433548 32.6296578,5.65853743 C35.476843,8.17370364 36.9204068,11.9843525 36.9204068,16.9847134 C36.9204068,26.8945533 32.0742264,31.7119261 22.1049929,31.7119261 L2.26942909,31.7119261 L2.26942909,2.25750057 L22.1049929,2.25750057 Z M22.531325,0.001572704 L-1.9452416e-05,0.001572704 L-1.9452416e-05,33.967854 L22.531325,33.967854 L22.531325,33.9614085 C27.4529808,33.8947619 31.3518934,32.6793969 34.1187402,30.3394196 C37.4837488,27.4935988 39.1898554,23.0003706 39.1898554,16.9847134 C39.1898554,14.1090499 38.7410881,11.5297509 37.8560681,9.31836144 C37.0093692,7.2028812 35.758125,5.40419768 34.13722,3.97219912 C31.2823834,1.45020067 27.2749912,0.0865245021 22.531325,0.00904949351 L22.531325,0.001572704 Z', id: 'Fill-4', fill: '#000000', mask: 'url(#mask-2)' })
                    ),
                    Object(src["jsxToHTML"])('path', { d: 'M21.4851352,29.4975138 L13.5194356,29.4975138 L13.5194356,5.00387361 L21.4851352,5.00387361 L21.1636516,5.00387361 C27.8067813,5.00387361 34.8779291,7.60998594 34.8779291,17.282889 C34.8779291,27.5088167 27.8067813,29.4975138 21.1636516,29.4975138 L21.4851352,29.4975138 Z', id: 'Fill-7', fill: '#CD0067' })
                ),
                Object(src["jsxToHTML"])(
                    'g',
                    { id: 'Group-30', transform: 'matrix(0.952642, 0, 0, 0.930979, 11.685725, 10.562208)', fill: '#FFFFFF' },
                    Object(src["jsxToHTML"])('path', { d: 'M1.41115607,1.17495169 L1.41115607,5.07048794 L2.30681015,5.07048794 C2.64178075,5.07048794 2.88357428,5.05173151 3.03219074,5.0142831 C3.2267149,4.96613516 3.38810511,4.88459948 3.51649106,4.76961161 C3.64474732,4.65455929 3.749531,4.46538363 3.83058274,4.20189125 C3.91163447,3.93846333 3.95216034,3.57944852 3.95216034,3.12471792 C3.95216034,2.67005177 3.91163447,2.3210275 3.83058274,2.07764511 C3.749531,1.83426272 3.63605858,1.64437805 3.49016546,1.5079911 C3.34420749,1.37160414 3.15915018,1.27930447 2.93492866,1.23109207 C2.76737852,1.19370812 2.43915142,1.17495169 1.95018252,1.17495169 L1.41115607,1.17495169 Z M0.215675421,0.175897919 L2.40271056,0.175897919 C2.89589415,0.175897919 3.27190935,0.213410777 3.53069132,0.288436492 C3.878306,0.390275522 4.17612249,0.571265392 4.42407595,0.831212737 C4.67202941,1.09116008 4.86065301,1.40950373 4.99001157,1.78598587 C5.11937014,2.16253246 5.18408185,2.62686687 5.18408185,3.1789891 C5.18408185,3.66407805 5.12345515,4.08213371 5.00220176,4.433285 C4.85397434,4.86210466 4.6423969,5.20919527 4.36753426,5.47449239 C4.15997698,5.67552779 3.87966767,5.832347 3.52660632,5.94488558 C3.26244251,6.02796818 2.90938115,6.06954171 2.46742226,6.06954171 L0.215675421,6.06954171 L0.215675421,0.175897919 Z', id: 'Fill-10' }),
                    Object(src["jsxToHTML"])('path', { d: 'M2.40271056,0.337035624 C2.87825729,0.337035624 3.24247136,0.372743739 3.48523751,0.443128689 C3.80302515,0.536201827 4.07944398,0.704171771 4.30645367,0.942075479 C4.53702965,1.18384649 4.7154083,1.48530291 4.83666169,1.83813003 C4.95966581,2.19611355 5.02197838,2.64723467 5.02197838,3.1789891 C5.02197838,3.64390361 4.96375081,4.04829479 4.84885188,4.38094747 C4.70970226,4.78359837 4.50973142,5.11264156 4.25458057,5.35892443 C4.06589213,5.54165459 3.80438682,5.68712971 3.47713234,5.79148248 C3.23060538,5.86895749 2.89070683,5.908404 2.46742226,5.908404 L0.377778888,5.908404 L0.377778888,0.337035624 L2.40271056,0.337035624 Z M0.0535719538,0.0147602138 L0.0535719538,6.23067941 L2.46742226,6.23067941 C2.92390562,6.23067941 3.2967436,6.18614095 3.57549672,6.09848204 C3.95157676,5.97866004 4.25594223,5.80759625 4.48061764,5.58993144 C4.77246872,5.30819828 4.9996081,4.93661473 5.15548679,4.48562252 C5.28205718,4.11919538 5.34618531,3.67954727 5.34618531,3.1789891 C5.34618531,2.61178438 5.27797217,2.12559969 5.1434263,1.73390616 C5.00706486,1.33699177 4.80456521,0.995959927 4.54169823,0.720349996 C4.27494076,0.440679396 3.9502151,0.243317935 3.57646934,0.133873205 C3.29992083,0.0536910833 2.91612466,0.0147602138 2.40271056,0.0147602138 L0.0535719538,0.0147602138 Z', id: 'Fill-12' }),
                    Object(src["jsxToHTML"])('path', { d: 'M1.9501501,1.33608939 C2.54124418,1.33608939 2.79263424,1.36451409 2.899428,1.38836247 C3.09466542,1.43032272 3.25566658,1.50998921 3.37905974,1.6253638 C3.50439814,1.74254314 3.60457808,1.91180219 3.6766817,2.12824235 C3.75189771,2.35415741 3.79002445,2.68945275 3.79002445,3.12471792 C3.79002445,3.56127219 3.75150867,3.90784717 3.67551456,4.15477459 C3.60360546,4.38861762 3.51354078,4.55523401 3.40791416,4.64991853 C3.30014777,4.74647224 3.16054427,4.81647046 2.99299412,4.85797953 C2.85754047,4.89207627 2.62683481,4.90935023 2.30677773,4.90935023 L1.57329196,4.90935023 L1.57329196,1.33608939 L1.9501501,1.33608939 Z M1.24902018,1.01381398 L1.24902018,5.23162564 L2.30677773,5.23162564 C2.65860709,5.23162564 2.90889484,5.21158011 3.07203577,5.17052222 C3.29100514,5.1163155 3.47729444,5.02163098 3.62500312,4.88924025 C3.77699133,4.7529822 3.89493781,4.54356764 3.98558607,4.24900792 C4.07214932,3.96766148 4.11423138,3.59988078 4.11423138,3.12471792 C4.11423138,2.64833041 4.07176027,2.2893156 3.98441893,2.02698342 C3.89519718,1.75904364 3.76622766,1.54492386 3.60120633,1.39061839 C3.43423976,1.23450819 3.22162485,1.12789948 2.96919733,1.0736283 C2.78932733,1.03347278 2.45558871,1.01381398 1.9501501,1.01381398 L1.24902018,1.01381398 Z', id: 'Fill-14' }),
                    Object(src["jsxToHTML"])('polygon', { id: 'Fill-16', points: '6.53678989 6.06950948 6.53678989 0.175865691 10.9257088 0.175865691 10.9257088 1.17491946 7.73227054 1.17491946 7.73227054 2.48013487 10.702849 2.48013487 10.702849 3.47918864 7.73227054 3.47918864 7.73227054 5.07045571 11.0391813 5.07045571 11.0391813 6.06950948' }),
                    Object(src["jsxToHTML"])('path', { d: 'M10.7636378,0.337035624 L10.7636378,1.01381398 L7.57019949,1.01381398 L7.57019949,2.64130481 L10.5407779,2.64130481 L10.5407779,3.31808317 L7.57019949,3.31808317 L7.57019949,5.23162564 L10.8771102,5.23162564 L10.8771102,5.908404 L6.69892578,5.908404 L6.69892578,0.337035624 L10.7636378,0.337035624 Z M6.37471884,0.0147602138 L6.37471884,6.23067941 L11.2013172,6.23067941 L11.2013172,4.90935023 L7.89440643,4.90935023 L7.89440643,3.64035858 L10.8649849,3.64035858 L10.8649849,2.3190294 L7.89440643,2.3190294 L7.89440643,1.33608939 L11.0878447,1.33608939 L11.0878447,0.0147602138 L6.37471884,0.0147602138 Z', id: 'Fill-18' }),
                    Object(src["jsxToHTML"])('path', { d: 'M15.5303032,3.73301276 L14.7130424,1.54959685 L13.9121864,3.73301276 L15.5303032,3.73301276 Z M17.7341971,6.06950948 L16.431793,6.06950948 L15.9144884,4.73206653 L13.5458326,4.73206653 L13.055113,6.06950948 L11.7849999,6.06950948 L14.0890089,0.175865691 L15.363207,0.175865691 L17.7341971,6.06950948 Z', id: 'Fill-20' }),
                    Object(src["jsxToHTML"])('path', { d: 'M15.2534629,0.337035624 C15.3291976,0.525244463 17.332991,5.50626875 17.4947703,5.908404 L16.5431581,5.908404 C16.4751395,5.73244163 16.0257887,4.57096105 16.0257887,4.57096105 L13.4323926,4.57096105 C13.4323926,4.57096105 13.0075518,5.72876769 12.9417378,5.908404 L12.0218979,5.908404 C12.1781008,5.50884695 14.1252876,0.527951577 14.1999201,0.337035624 L15.2534629,0.337035624 Z M13.9780328,0.0147602138 L11.5481019,6.23067941 L13.168553,6.23067941 C13.168553,6.23067941 13.5933289,5.07280832 13.6592077,4.89323646 L15.8031882,4.89323646 C15.871142,5.06913438 16.3204928,6.23067941 16.3204928,6.23067941 L17.9736239,6.23067941 L15.472951,0.0147602138 L13.9780328,0.0147602138 Z', id: 'Fill-22' }),
                    Object(src["jsxToHTML"])('path', { d: 'M14.7145337,2.01579402 C14.8921991,2.49044124 15.1926093,3.29290701 15.2970039,3.57186861 L14.1437998,3.57186861 C14.2457305,3.2940672 14.5401752,2.49134361 14.7145337,2.01579402 L14.7145337,2.01579402 Z M13.680573,3.89414402 L15.7636025,3.89414402 L14.7114862,1.0833868 L13.680573,3.89414402 Z', id: 'Fill-24' }),
                    Object(src["jsxToHTML"])('polygon', { id: 'Fill-26', points: '18.7343171 6.06950948 18.7343171 0.224207003 19.9297978 0.224207003 19.9297978 5.07045571 22.9084814 5.07045571 22.9084814 6.06950948' }),
                    Object(src["jsxToHTML"])('path', { d: 'M19.7677267,0.385376935 L19.7677267,5.23162564 L22.7464104,5.23162564 L22.7464104,5.908404 L18.8963882,5.908404 L18.8963882,0.385376935 L19.7677267,0.385376935 Z M18.5722461,0.0631015253 L18.5722461,6.23067941 L23.0706173,6.23067941 L23.0706173,4.90935023 L20.0919337,4.90935023 L20.0919337,0.0631015253 L18.5722461,0.0631015253 Z', id: 'Fill-28' })
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/ideal/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars







var IDEAL_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["a" /* getAltPayUrl */],

    defaultLabel: constants["c" /* BUTTON_LABEL */].IDEAL,

    layouts: [constants["d" /* BUTTON_LAYOUT */].VERTICAL],

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].IDEAL] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: IdealLogo,

        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].SILVER],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["k" /* LOGO_COLOR */].BLACK, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors),

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/ideal/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "IDEAL_CONFIG", function() { return IDEAL_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "IdealLogo", function() { return IdealLogo; });



/***/ }),

/***/ "./src/funding/mybank/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/mybank/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function MybankLogo(_ref) {
    var logoColor = _ref.logoColor,
        nonce = _ref.nonce;


    return Object(src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].MYBANK,
        logoColor: logoColor,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '58px', height: '32px', viewBox: '0 0 58 32', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])(
                    'title',
                    null,
                    'MyBank'
                ),
                Object(src["jsxToHTML"])(
                    'desc',
                    null,
                    'Created with Sketch.'
                ),
                Object(src["jsxToHTML"])(
                    'defs',
                    null,
                    Object(src["jsxToHTML"])('polygon', { id: 'path-1', points: '3.086436e-05 0.00960615385 42.6159033 0.00960615385 42.6159033 24 3.086436e-05 24' })
                ),
                Object(src["jsxToHTML"])(
                    'g',
                    { id: 'Page-1', stroke: 'none', 'stroke-width': '1', fill: 'none', 'fill-rule': 'evenodd', transform: 'matrix(1.333867, 0, 0, 1.333867, -0.00001, -0.00321)' },
                    Object(src["jsxToHTML"])(
                        'g',
                        { id: 'SPB_&_AltPay_NewAssets', transform: 'translate(-100.000000, -159.000000)' },
                        Object(src["jsxToHTML"])(
                            'g',
                            { id: 'MyBank', transform: 'translate(100.000000, 159.000000)' },
                            Object(src["jsxToHTML"])('path', { d: 'M29.010016,14.6206556 C29.010016,14.6206556 27.947442,14.8389924 27.9585564,14.0777038 C27.9698571,13.3164773 29.8942008,13.3619719 30.0914038,13.4236258 C30.0914038,13.4236258 30.1519432,14.2874637 29.010016,14.6206556 M29.3297879,9.81836571 C27.677716,9.80301439 26.9053582,10.753926 26.9053582,10.753926 C26.4037199,11.2864986 26.7253546,12.0076376 27.2173686,12.0597202 C27.924406,12.1345501 27.9170171,11.5413802 29.0022546,11.2784811 C29.9542434,11.0477763 29.9954723,11.9305703 29.9954723,11.9305703 C25.9352386,11.8295126 26.1290887,15.239929 27.5113104,15.9642377 C28.8367183,16.658714 30.0756326,15.7825701 30.0756326,15.7825701 C30.0756326,15.7825701 30.1222013,16.2545455 30.777951,16.2545455 C31.5283904,16.2545455 31.5272727,15.5049412 31.5272727,15.5049412 L31.5242302,12.1853897 C31.4748674,9.75671183 29.3297879,9.81836571 29.3297879,9.81836571', id: 'Fill-1', fill: '#1A4B67' }),
                            Object(src["jsxToHTML"])('path', { d: 'M42.4169651,14.9132636 L40.766254,12.4266353 L41.9794586,11.2784792 C41.9794586,11.2784792 42.5394372,10.7597112 42.0797024,10.2455911 C41.5701862,9.67606803 40.9629029,10.2382165 40.9629029,10.2382165 L39.4383789,11.6556411 L39.4383789,8.81056644 C39.4383789,8.40291433 39.1083605,8.07272727 38.7011934,8.07272727 C38.2936547,8.07272727 37.9636364,8.40291433 37.9636364,8.81056644 L37.9636364,15.5050966 C37.9636364,15.9126248 38.2936547,16.2429358 38.7011934,16.2429358 C39.1083605,16.2429358 39.4383789,15.9126248 39.4383789,15.5050966 L39.4383789,13.7227806 L39.7172538,13.4440304 L41.2106953,15.7865117 C41.2106953,15.7865117 41.697426,16.5998328 42.4143027,16.0821803 C42.9532914,15.6931198 42.4169651,14.9132636 42.4169651,14.9132636', id: 'Fill-3', fill: '#1A4B67' }),
                            Object(src["jsxToHTML"])('path', { d: 'M37.0887651,12.0920353 C37.0887651,9.6760941 35.0962232,9.33568291 33.7411943,10.1020724 C33.7401529,10.1029393 33.7389278,10.1056016 33.7382539,10.1063446 C33.6363205,9.81249385 33.362313,9.6 33.0365425,9.6 C32.6248269,9.6 32.2909091,9.93768691 32.2909091,10.3541303 L32.2909091,15.3913243 C32.2909091,15.8078915 32.6248269,16.1454545 33.0365425,16.1454545 C33.4485644,16.1454545 33.7826048,15.8078915 33.7826048,15.3913243 L33.7723134,11.9929705 C33.7723134,11.9929705 33.9532086,11.7752139 34.2436332,11.5669922 C34.9412403,11.0671487 35.6063806,11.2374162 35.6063806,12.0917257 L35.6234716,15.4035835 C35.6234716,15.8135877 35.9518762,16.1454545 36.3573435,16.1454545 C36.7625045,16.1454545 37.0909091,15.8135877 37.0909091,15.4035835 L37.0887651,12.0920353 Z', id: 'Fill-5', fill: '#1A4B67' }),
                            Object(src["jsxToHTML"])('path', { d: 'M15.5613016,16.2862697 C15.7330634,15.9971851 15.762994,15.7935853 15.762994,15.7935853 L14.0695172,11.3349218 C14.0695172,11.3349218 13.7622674,10.4721348 14.4393994,10.2166114 C15.1567468,9.94557914 15.4157136,10.6357839 15.4696009,10.7805123 C15.5234881,10.9252407 16.5395249,13.6504516 16.5395249,13.6504516 L17.5177483,10.7867779 C17.5177483,10.7867779 17.7979621,9.89638514 18.5815138,10.2138818 C19.2290232,10.4764773 18.8964002,11.3498103 18.8964002,11.3498103 C18.8964002,11.3498103 17.8952671,14.3335844 17.0561037,16.4983684 C16.5548597,17.7916804 16.1267792,17.9191009 15.6376676,18.0403799 C14.9830758,18.2027884 13.7454545,18.1223286 13.7454545,17.30247 C13.7454545,16.655814 14.4027561,16.615491 14.6992284,16.6251065 C14.7151175,16.6254167 15.3279543,16.6788911 15.5613016,16.2862697', id: 'Fill-7', fill: '#00C0EE' }),
                            Object(src["jsxToHTML"])('path', { d: 'M11.5669215,8.85710249 L10.0137262,13.1590392 L8.3203761,8.88327934 C8.3203761,8.88327934 8.06948196,8.07272727 7.36345596,8.07272727 C6.54545455,8.07272727 6.57202708,8.72317872 6.55361169,8.88327934 C6.53525811,9.04350403 6.55361169,15.569481 6.55361169,15.569481 C6.55361169,15.569481 6.54545455,16.2545455 7.29591229,16.2545455 C8.06280792,16.2545455 8.02603896,15.56334 8.03209502,15.56334 C8.03821288,15.56334 8.03209502,12.1182301 8.03209502,12.1182301 L9.27754342,15.56334 C9.27754342,15.56334 9.46151186,16.2407127 10.0381976,16.2283686 C10.6148833,16.2161486 10.7804982,15.56334 10.7804982,15.56334 L11.823501,12.1244331 L11.823501,15.56334 C11.823501,15.56334 11.823501,16.2545455 12.5780991,16.2545455 C13.3081022,16.2545455 13.3081022,15.56334 13.3081022,15.56334 L13.3090909,8.88948239 C13.3090909,8.88948239 13.3090909,8.07272727 12.5166733,8.07663519 C11.8595284,8.07973672 11.609932,8.71207526 11.5669215,8.85710249 C11.5619778,8.8740368 11.5596913,8.88327934 11.5596913,8.88327934', id: 'Fill-9', fill: '#00C0EE' }),
                            Object(src["jsxToHTML"])(
                                'g',
                                { id: 'Group-13' },
                                Object(src["jsxToHTML"])(
                                    'mask',
                                    { id: 'mask-2', fill: 'white' },
                                    Object(src["jsxToHTML"])('polygon', { id: '', points: '3.086436e-05 0.00960615385 42.6159033 0.00960615385 42.6159033 24 3.086436e-05 24', transform: 'matrix(1, 0, 0, 1, 0, 0)' })
                                ),
                                Object(src["jsxToHTML"])('g', { id: 'Clip-12' }),
                                Object(src["jsxToHTML"])('path', { d: 'M42.6159341,18.6971754 L29.5208652,18.6971754 L19.9057529,18.6956369 L19.9124196,18.7062215 C18.0119775,20.9263446 15.1892466,22.3382831 12.0318843,22.3382831 C6.30740974,22.3382831 1.66682976,17.7116369 1.66682976,12.0048677 C1.66682976,6.29803692 6.30740974,1.67182154 12.0318843,1.67182154 C15.2027652,1.67182154 18.0390147,3.09182154 19.9398272,5.32819077 L22.0210727,5.32819077 C19.8613082,2.12277538 16.1963507,0.00960615385 12.0318843,0.00960615385 C5.38703452,0.00960615385 3.086436e-05,5.38012923 3.086436e-05,12.0048677 C3.086436e-05,18.6296062 5.38703452,24.0000062 12.0318843,24.0000062 C15.5178286,24.0000062 18.6504994,22.5164985 20.846622,20.1542215 L41.6296327,20.1336062 L42.6159341,18.6971754 Z', id: 'Fill-11', fill: '#00C0EE', mask: 'url(#mask-2)' })
                            ),
                            Object(src["jsxToHTML"])('path', { d: 'M23.5642714,14.6942333 L21.476941,14.6942333 L21.476941,12.703212 L23.5642714,12.703212 C24.0691167,12.729228 24.5593003,12.986305 24.5593003,13.698846 C24.5593003,14.4306215 24.1135333,14.6942333 23.5642714,14.6942333 Z M21.476941,9.5856756 L23.4225205,9.5856756 C23.8122278,9.59572442 24.2213404,9.80372869 24.2213404,10.3852036 C24.2213404,10.9910915 23.8636056,11.1846082 23.4225205,11.1846082 L21.476941,11.1846082 L21.476941,9.5856756 Z M25.2086687,11.7878453 C25.2484033,11.7332241 25.7477042,11.3284357 25.7082776,10.252103 C25.6287468,8.0729285 23.7375637,8.09777311 23.3189641,8.08507338 C22.644646,8.06479081 22.2387368,8.0729285 21.0010496,8.08507338 C19.9559983,8.09543044 19.9636372,9.0459372 19.9636372,9.0459372 L19.9636364,16.1454545 L23.4862807,16.1454545 C25.3714882,16.1454545 26.0727273,15.1069128 26.0727273,13.6549518 C26.0727273,12.1940516 25.2086687,11.7878453 25.2086687,11.7878453 Z', id: 'Fill-14', fill: '#1A4B67' })
                        )
                    )
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/mybank/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars







var MYBANK_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["a" /* getAltPayUrl */],

    defaultLabel: constants["c" /* BUTTON_LABEL */].MYBANK,

    layouts: [constants["d" /* BUTTON_LAYOUT */].VERTICAL],

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].MYBANK] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: MybankLogo,

        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].SILVER],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["k" /* LOGO_COLOR */].BLACK, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors),

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/mybank/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MYBANK_CONFIG", function() { return MYBANK_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MybankLogo", function() { return MybankLogo; });



/***/ }),

/***/ "./src/funding/p24/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/p24/logo.jsx
var _P24_LOGO_COLORS;

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




var P24_LOGO_COLORS = (_P24_LOGO_COLORS = {}, _P24_LOGO_COLORS[constants["k" /* LOGO_COLOR */].BLACK] = {
    primary: '#d03238',
    secondary: '#b3b1b1'
}, _P24_LOGO_COLORS);

function P24Logo(_ref) {
    var logoColor = _ref.logoColor,
        nonce = _ref.nonce;


    if (!P24_LOGO_COLORS[logoColor]) {
        throw new Error('No ' + logoColor + ' zimpler logo available');
    }

    var _P24_LOGO_COLORS$logo = P24_LOGO_COLORS[logoColor],
        primary = _P24_LOGO_COLORS$logo.primary,
        secondary = _P24_LOGO_COLORS$logo.secondary;


    return Object(src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].P24,
        logoColor: logoColor,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { xmlns: 'http://www.w3.org/2000/svg', version: '1.1', viewBox: '0 0 100 32', height: '32', width: '100', preserveAspectRatio: 'xMinYMin meet' },
                Object(src["jsxToHTML"])(
                    'g',
                    { transform: 'matrix(1.2953205,0,0,1.4482638,-127.73674,-229.48747)' },
                    Object(src["jsxToHTML"])(
                        'g',
                        { transform: 'translate(99,159)' },
                        Object(src["jsxToHTML"])('path', { transform: 'matrix(0.77200971,0,0,0.69048194,-0.38599675,-0.54304623)', d: 'M 34.123047 14.666016 L 32.416016 14.667969 L 30.496094 27.771484 L 32.208984 27.773438 L 34.123047 14.666016 z M 2.4082031 14.669922 L 0.5 27.771484 L 2.2753906 27.773438 L 2.9785156 22.916016 L 6.421875 22.933594 C 6.421875 22.933594 7.7610468 22.994689 8.7128906 22.419922 C 9.6646511 21.844634 9.9179688 20.537109 9.9179688 20.537109 C 9.9179688 20.537109 10.021944 20.051453 10.107422 19.458984 C 10.201364 18.808401 10.297704 18.027313 10.347656 17.611328 C 10.369589 17.428799 10.382812 17.316406 10.382812 17.316406 C 10.382812 17.316406 10.406035 17.181738 10.408203 16.972656 C 10.411247 16.680039 10.373345 16.24144 10.173828 15.824219 C 10.107822 15.686199 10.023752 15.551336 9.9179688 15.423828 C 9.7749921 15.251532 9.573657 15.118146 9.3457031 15.015625 C 9.1093266 14.909344 8.8444066 14.836083 8.5878906 14.785156 C 8.2611582 14.720236 7.9481918 14.691729 7.7226562 14.679688 C 7.5151753 14.668598 7.3808594 14.669922 7.3808594 14.669922 L 4.5292969 14.669922 L 2.4082031 14.669922 z M 3.9023438 16.636719 L 6.5097656 16.644531 C 6.5097656 16.644531 6.6871684 16.640189 6.9335938 16.644531 C 7.2136679 16.6496 7.5842469 16.667097 7.8886719 16.712891 C 8.149399 16.752066 8.3620627 16.811675 8.4277344 16.90625 C 8.5143382 17.03109 8.5484972 17.190294 8.5605469 17.335938 C 8.5776425 17.542977 8.5477921 17.723762 8.546875 17.736328 C 8.5451652 17.758038 8.3882592 18.81021 8.1777344 20.056641 C 8.0971356 20.533644 7.7783765 20.790093 7.4101562 20.878906 C 6.8022654 21.025453 6.1484375 21 6.1484375 21 L 3.2695312 20.990234 L 3.9023438 16.636719 z M 27.246094 18.195312 C 26.565902 18.205016 26.253806 18.2403 26 18.302734 C 26 18.302734 24.790129 18.501565 24.103516 19.472656 C 23.416902 20.4437 23.212891 22.568359 23.212891 22.568359 C 23.212891 22.568359 22.804576 24.916796 22.923828 25.699219 C 23.042829 26.481642 23.256401 27.206424 24.033203 27.546875 C 24.810173 27.88723 25.46875 27.873047 25.46875 27.873047 C 25.46875 27.873047 26.853325 27.996517 27.896484 27.714844 C 28.939685 27.433792 29.490234 26.595703 29.490234 26.595703 C 29.490234 26.595703 29.735609 26.235379 29.912109 25.804688 C 30.088777 25.374043 30.140682 25.073949 30.148438 25.037109 L 30.257812 24.53125 L 28.484375 24.533203 C 28.484375 24.533203 28.385914 25.868868 27.429688 25.992188 C 26.473716 26.115218 25.960314 26.068498 25.775391 26.060547 C 25.593178 26.052871 24.567122 26.102566 24.650391 25.125 C 24.650808 25.111821 24.651179 25.091912 24.652344 25.064453 C 24.69996 23.94948 24.808594 23.660156 24.808594 23.660156 L 30.375 23.642578 L 30.613281 22.072266 C 30.883598 20.286624 30.683916 18.929319 29.257812 18.398438 C 28.779056 18.220288 27.947801 18.185366 27.246094 18.195312 z M 37.748047 18.197266 C 37.067855 18.206824 36.755758 18.242238 36.501953 18.304688 C 36.501953 18.304688 35.292082 18.503803 34.605469 19.474609 C 33.918854 20.445938 33.714844 22.570313 33.714844 22.570312 C 33.714844 22.570312 33.306572 24.918749 33.425781 25.701172 C 33.545028 26.483643 33.758145 27.207998 34.535156 27.548828 C 35.311959 27.889232 35.970703 27.875 35.970703 27.875 C 35.970703 27.875 37.355488 27.998135 38.398438 27.716797 C 39.441597 27.435412 39.992187 26.597656 39.992188 26.597656 C 39.992188 26.597656 40.237604 26.237189 40.414062 25.806641 C 40.590771 25.376138 40.642384 25.077855 40.650391 25.041016 L 40.759766 24.533203 L 38.986328 24.535156 C 38.986328 24.535156 38.887867 25.871106 37.931641 25.994141 C 36.975669 26.117315 36.462059 26.072303 36.277344 26.064453 C 36.095172 26.056777 35.06916 26.104467 35.152344 25.126953 C 35.152802 25.113774 35.153175 25.093967 35.154297 25.066406 C 35.201874 23.951433 35.310547 23.662109 35.310547 23.662109 L 40.876953 23.644531 L 41.115234 22.076172 C 41.385759 20.290531 41.185607 18.931462 39.759766 18.400391 C 39.280716 18.222193 38.449796 18.187223 37.748047 18.197266 z M 46.277344 18.304688 L 43.757812 24.96875 L 43.179688 18.316406 L 41.541016 18.318359 L 42.371094 27.773438 L 44.355469 27.765625 L 46.90625 21.148438 L 47.486328 27.765625 L 49.505859 27.765625 L 53.117188 18.316406 L 51.417969 18.318359 L 48.898438 24.996094 L 48.300781 18.3125 L 46.277344 18.304688 z M 11.253906 18.310547 L 9.7929688 27.720703 L 11.617188 27.720703 L 12.427734 22.507812 C 12.596271 21.449811 13.285209 20.144531 14.638672 20.144531 L 15.582031 20.140625 L 15.865234 18.310547 L 14.873047 18.310547 C 14.184891 18.310547 13.533952 18.621542 12.978516 18.96875 L 13.076172 18.310547 L 11.253906 18.310547 z M 23.574219 18.310547 L 17.048828 18.320312 L 16.789062 20.167969 L 20.960938 20.167969 L 15.732422 25.884766 L 15.451172 27.771484 L 22.191406 27.769531 L 22.457031 25.939453 L 17.880859 25.951172 L 23.335938 20.005859 L 23.574219 18.310547 z M 59.283203 18.3125 L 56.183594 25.228516 L 55.087891 18.320312 L 53.347656 18.316406 L 54.962891 27.882812 L 54.755859 28.283203 C 54.755859 28.283203 54.42297 29.081956 54.011719 29.267578 C 53.600426 29.452827 52.910156 29.304688 52.910156 29.304688 L 52.650391 31.068359 L 53.066406 31.152344 C 53.459811 31.231491 53.623329 31.198848 54.033203 31.152344 C 54.443329 31.10608 54.748768 30.903232 55.25 30.449219 C 55.751441 29.99568 56.560547 28.207031 56.560547 28.207031 L 61.027344 18.330078 L 59.283203 18.3125 z M 37.816406 20.023438 C 38.153219 20.022293 38.536406 20.045829 38.880859 20.126953 C 39.109271 20.180351 39.326106 20.327316 39.382812 20.544922 C 39.516491 21.058003 39.375 21.841797 39.375 21.841797 L 35.558594 21.835938 L 35.710938 21.144531 C 35.710938 21.144531 35.842858 20.605552 36.107422 20.375 C 36.372026 20.144305 36.710486 20.103629 37.029297 20.068359 C 37.188702 20.050872 37.479594 20.024582 37.816406 20.023438 z M 27.330078 20.027344 C 27.666911 20.026207 28.050203 20.04988 28.394531 20.130859 C 28.623194 20.184445 28.839945 20.329507 28.896484 20.546875 C 29.030121 21.059954 28.886719 21.84375 28.886719 21.84375 L 25.072266 21.839844 L 25.224609 21.148438 C 25.224609 21.148438 25.35653 20.607886 25.621094 20.376953 C 25.885906 20.146258 26.224367 20.107486 26.542969 20.072266 C 26.702373 20.054561 26.993245 20.028481 27.330078 20.027344 z ', fill: primary }),
                        Object(src["jsxToHTML"])('path', { d: 'm 18.656138,16.774358 c -0.0046,0.0239 -0.0083,0.04735 -0.01154,0.07058 -0.0065,0.118231 0.01306,-0.07708 0.01154,-0.07058', fill: primary }),
                        Object(src["jsxToHTML"])('path', { d: 'm 26.763669,16.775893 c -0.0046,0.02391 -0.0083,0.04743 -0.01154,0.07066 -0.0065,0.118089 0.01306,-0.07731 0.01154,-0.07066', fill: primary }),
                        Object(src["jsxToHTML"])('path', { transform: 'matrix(0.77200971,0,0,0.69048194,-0.38599675,-0.54304623)', d: 'M 51.226562 0.78710938 C 50.728893 0.78574323 50.439453 0.79296875 50.439453 0.79296875 L 48.318359 5.6542969 C 48.318359 5.6542969 49.531198 5.9719517 51.199219 6.5273438 C 54.144731 7.5791572 56.515625 9.2929688 56.515625 9.2929688 L 66.666016 3.234375 C 66.745656 3.1868271 63.084253 2.0998969 59.082031 1.3945312 C 56.08052 0.86568549 52.71957 0.7912078 51.226562 0.78710938 z M 47.589844 0.90820312 C 47.589844 0.90820313 43.781742 1.1966088 40.910156 1.8066406 C 38.038322 2.4166724 34.904297 3.3691406 34.904297 3.3691406 L 35.34375 6.2011719 C 35.34375 6.2011719 37.385444 5.5830734 39.835938 5.25 C 42.979007 4.7627651 46.330078 5.2851562 46.330078 5.2851562 L 47.589844 0.90820312 z M 32.949219 4.0429688 C 32.949219 4.0429687 31.321834 4.6211203 28.267578 6.0117188 C 25.213321 7.4021267 22.914062 8.8925781 22.914062 8.8925781 L 25.453125 10.84375 C 25.453125 10.84375 27.099522 9.6851386 28.839844 8.8378906 C 30.525001 7.9290065 33.464844 6.8066406 33.464844 6.8066406 L 32.949219 4.0429688 z M 71.046875 5.0175781 L 58.333984 10.615234 L 60.566406 12.546875 L 78.900391 12.546875 C 78.900391 12.546875 78.861436 11.867776 78.373047 10.908203 C 78.067288 10.306786 77.515959 9.6724399 76.935547 9.0117188 C 76.724772 8.771647 75.878829 8.0196942 75.248047 7.5527344 C 73.629269 6.3552786 72.725403 5.8908131 71.046875 5.0175781 z M 20.621094 10.361328 C 20.621094 10.361328 18.007768 12.208509 16.898438 13.080078 C 15.819753 13.883157 13.6875 15.744141 13.6875 15.744141 L 19.160156 15.744141 C 19.160156 15.744141 20.387652 14.611026 21.257812 13.884766 C 22.127974 13.158363 23.712891 12.011719 23.712891 12.011719 L 20.621094 10.361328 z M 66.779297 14.519531 C 65.231195 14.543948 64.467235 14.626145 63.683594 14.955078 C 62.899953 15.283726 62.446574 15.882838 62.158203 16.728516 C 61.840059 17.527168 61.65625 19.259766 61.65625 19.259766 L 63.453125 19.261719 L 63.560547 18.464844 C 63.560547 18.464844 63.753461 17.029388 64.181641 16.751953 C 64.31878 16.663088 64.538495 16.579747 64.792969 16.529297 C 65.262594 16.436347 65.860733 16.425312 66.345703 16.445312 C 67.093861 16.476103 67.374266 16.483376 68.134766 16.582031 C 68.895557 16.68089 68.701172 17.517578 68.701172 17.517578 L 68.552734 18.767578 C 68.552734 18.767578 68.488006 19.327955 68.3125 19.677734 C 68.157306 19.987057 67.733373 20.195678 67.488281 20.287109 C 66.896194 20.507571 64.871094 21.095703 64.871094 21.095703 L 63.275391 21.619141 C 63.275391 21.619141 62.297563 21.944394 61.748047 22.636719 C 61.19878 23.329281 60.983257 24.116118 60.908203 24.527344 C 60.833113 24.938283 60.412109 27.769531 60.412109 27.769531 L 69.009766 27.773438 L 69.296875 25.810547 L 62.496094 25.820312 L 62.619141 25.021484 C 62.619141 25.021484 62.697988 24.196554 62.990234 23.927734 C 63.082461 23.842591 63.127078 23.730658 63.669922 23.509766 C 63.993778 23.377829 65.103516 23.039062 65.103516 23.039062 L 67.669922 22.240234 C 67.669922 22.240234 69.069743 21.828553 69.621094 20.957031 C 70.172403 20.085747 70.384766 18.416016 70.384766 18.416016 C 70.384766 18.416016 70.533003 16.793571 70.419922 16.285156 C 70.307099 15.776804 69.886071 15.166455 69.375 14.90625 C 68.863719 14.646045 68.327565 14.495353 66.779297 14.519531 z ', fill: secondary }),
                        Object(src["jsxToHTML"])(
                            'g',
                            { transform: 'translate(53.596306,9.56338)' },
                            Object(src["jsxToHTML"])('path', { d: 'M 4.7408782,5.7106164 1.839113,5.7061141 5.3711256,1.8647573 Z M 6.112171,5.7095319 7.0417209,0.01876197 5.3948175,0.01774319 0.26289873,5.6444944 0.02981113,7.0693723 4.5178982,7.0688465 4.1894639,9.0682502 l 1.376733,0.00181 0.3251187,-2.001047 1.2714396,0.00269 0.2297076,-1.3639812 z', fill: secondary })
                        )
                    )
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/p24/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars







var P24_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["a" /* getAltPayUrl */],

    layouts: [constants["d" /* BUTTON_LAYOUT */].VERTICAL],

    defaultLabel: constants["c" /* BUTTON_LABEL */].P24,

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].P24] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: P24Logo,

        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].SILVER],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["k" /* LOGO_COLOR */].BLACK, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors),

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/p24/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "P24_CONFIG", function() { return P24_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "P24Logo", function() { return P24Logo; });



/***/ }),

/***/ "./src/funding/paypal/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var belter_src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// EXTERNAL MODULE: ./src/funding/paypal/logo.jsx
var logo = __webpack_require__("./src/funding/paypal/logo.jsx");

// CONCATENATED MODULE: ./src/funding/paypal/content.js

/* eslint max-lines: 0 */



var componentContent = {
    en: {
        checkout: '{pp} {paypal} Checkout',
        safer_tag: 'The safer, easier way to pay',
        pay: 'Pay with {paypal}',
        installment: '{pp} {paypal}  Interest free{br}  payments',
        installment_period: '{pp} {paypal}  Pay up to {period}x{br}  without interest',
        dual_tag: 'Two easy ways to pay'
    },
    fr: {
        checkout: '{pp} {paypal} Payer',
        safer_tag: 'Votre réflexe sécurité pour payer en ligne',
        pay: 'Payer avec {paypal}'
    },
    es: {
        checkout: '{pp} {paypal} Pagar',
        safer_tag: 'La forma rápida y segura de pagar',
        pay: 'Pagar con {paypal}',
        installment: '{pp} {paypal}  Pagos en{br}  mensualidades',
        installment_period: '{pp} {paypal}  Pague hasta{br}  {period}x sin interés'
    },
    zh: {
        checkout: '{pp} {paypal} 結帳',
        safer_tag: '更安全、更便捷的付款方式',
        pay: '用{paypal}付款'
    },
    ar: {
        checkout: 'السداد بواسطة {pp} {paypal}',
        safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
        pay: 'دفع بواسطة {paypal}'
    },
    de: {
        checkout: 'Direkt zu {pp} {paypal}',
        safer_tag: 'Überall schnell und sicher bezahlen',
        pay: 'Mit {paypal} zahlen'
    },
    nl: {
        checkout: '{pp} {paypal} Betalen',
        safer_tag: 'De veiligere en snellere manier om te betalen',
        pay: 'Betalen met {paypal}'
    },
    pt: {
        checkout: '{pp} {paypal} Checkout',
        safer_tag: 'A maneira fácil e segura de pagar',
        pay: 'Pague com {paypal}',
        installment: '{pp} {paypal}  Pagamentos{br}  parcelados',
        installment_period: '{pp} {paypal}  Pague em até{br}  {period}x sem juros'
    },
    cs: {
        checkout: 'Zaplatit přes {pp} {paypal}',
        safer_tag: 'Jednodušší a bezpečnější způsob placení',
        pay: 'Zaplatit přes {logo: paypal}'
    },
    da: {
        checkout: '{pp} {paypal} Betal',
        safer_tag: 'Betal nemt og sikkert',
        pay: 'Betal med {paypal}'
    },
    ru: {
        checkout: '{pp} {paypal} Оформить покупку',
        safer_tag: 'Более безопасный и простой способ оплаты',
        pay: 'Оплатить через {paypal}'
    },
    fi: {
        checkout: '{pp} {paypal}-maksu',
        safer_tag: 'Turvallisempi ja helpompi maksutapa',
        pay: '{paypal}-maksu'
    },
    el: {
        checkout: 'Ολοκλήρωση αγοράς μέσω {pp} {paypal}',
        safer_tag: 'Ο ασφαλέστερος και ευκολότερος τρόπος πληρωμής',
        pay: 'Πληρωμή μέσω {paypal}'
    },
    hu: {
        checkout: '{pp} {paypal}-fizetés',
        safer_tag: 'Biztonságosabb, könnyebb fizetési mód',
        pay: '{paypal}-fizetés'
    },
    id: {
        checkout: '{pp} {paypal} Checkout',
        safer_tag: 'Cara yang lebih mudah dan aman untuk membayar',
        pay: 'Bayar dengan {paypal}'
    },
    he: {
        checkout: '{pp} {paypal} שלם',
        safer_tag: '.הדרך הקלה והבטוחה יותר לשלם',
        pay: 'שלם באמצעות {paypal}‏'
    },
    it: {
        checkout: '{pp} {paypal} Paga adesso',
        safer_tag: 'Il modo rapido e sicuro per pagare',
        pay: 'Paga con {paypal}'
    },
    ja: {
        checkout: '{pp} {paypal}で支払う',
        safer_tag: 'より安全・簡単にお支払い',
        pay: '{paypal}で支払う'
    },
    ko: {
        checkout: '{pp} {paypal} 체크 아웃',
        safer_tag: '더 안전하고 빠른 결제 방법',
        pay: '{paypal}로 지불하기'
    },
    no: {
        checkout: '{pp} {paypal} Betal',
        safer_tag: 'En trygg og enkel betalingsmetode',
        pay: 'Betal med {paypal}'
    },
    pl: {
        checkout: '{pp} {paypal} Do kasy',
        safer_tag: 'Płać wygodnie i bezpiecznie',
        pay: 'Zapłać z {paypal}'
    },
    sv: {
        checkout: '{pp} {paypal} Betala',
        safer_tag: 'Ett tryggt och smidigt sätt att betala',
        pay: 'Betala med {paypal}'
    },
    sk: {
        checkout: 'Zaplatiť cez {pp} {paypal}',
        safer_tag: 'Jednoduchší a bezpečnejší spôsob platby',
        pay: 'Zaplatiť cez {logo: paypal}'
    },
    th: {
        checkout: '{pp} {paypal} ชำระเงิน',
        safer_tag: 'วิธีชำระเงินที่ปลอดภัยและง่ายกว่า',
        pay: 'ชำระเงินด้วย {paypal}'
    },
    tr: {
        checkout: '{pp} {paypal} ile Satın Alın',
        safer_tag: 'Ödeme yapmanın daha güvenli ve kolay yolu',
        pay: '{paypal} ile Öde'
    }
};
// CONCATENATED MODULE: ./src/funding/paypal/labels.jsx

/* @jsx jsxToHTML */
/* eslint max-lines: 0 */


 // eslint-disable-line no-unused-vars






function contentToJSX(key, locale) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        logoColor = _ref.logoColor,
        _period = _ref.period;

    var lang = locale.lang;

    var text = componentContent[lang][key];

    return Object(belter_src["placeholderToJSX"])(text, {
        text: function text(token) {
            return Object(belter_src["jsxToHTML"])(
                'span',
                { 'class': constants["j" /* CLASS */].TEXT },
                token
            );
        },
        pp: function pp() {
            return Object(belter_src["jsxToHTML"])(logo["a" /* PPLogo */], { logoColor: logoColor });
        },
        paypal: function paypal() {
            return Object(belter_src["jsxToHTML"])(logo["b" /* PayPalLogo */], { logoColor: logoColor });
        },
        br: function br() {
            return Object(belter_src["jsxToHTML"])('br', null);
        },
        period: function period() {
            return _period ? _period.toString() : '';
        }
    });
}

function Checkout(_ref2) {
    var locale = _ref2.locale,
        logoColor = _ref2.logoColor;

    return contentToJSX('checkout', locale, { logoColor: logoColor });
}

function Pay(_ref3) {
    var locale = _ref3.locale,
        logoColor = _ref3.logoColor;

    return contentToJSX('pay', locale, { logoColor: logoColor });
}

function Installment(_ref4) {
    var locale = _ref4.locale,
        logoColor = _ref4.logoColor,
        period = _ref4.period;

    return contentToJSX(period ? 'installment_period' : 'installment', locale, { logoColor: logoColor, period: period });
}

function SaferTag(_ref5) {
    var locale = _ref5.locale;

    return contentToJSX('safer_tag', locale);
}

function DualTag(_ref6) {
    var locale = _ref6.locale;
    var lang = locale.lang;


    return componentContent[lang].dual_tag ? contentToJSX('dual_tag', locale) : contentToJSX('safer_tag', locale);
}
// CONCATENATED MODULE: ./src/funding/paypal/config.jsx
var _allowedPeriods, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */


 // eslint-disable-line no-unused-vars








var PAYPAL_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["b" /* getCheckoutUrl */],

    defaultLabel: constants["c" /* BUTTON_LABEL */].PAYPAL,

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].PAYPAL] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        defaultColor: constants["b" /* BUTTON_COLOR */].GOLD,

        Label: function Label(_ref) {
            var logoColor = _ref.logoColor;

            return Object(belter_src["jsxToHTML"])(
                belter_src["Fragment"],
                null,
                Object(belter_src["jsxToHTML"])(logo["a" /* PPLogo */], { logoColor: logoColor }),
                ' ',
                Object(belter_src["jsxToHTML"])(logo["b" /* PayPalLogo */], { logoColor: logoColor })
            );
        },


        Tag: function Tag(_ref2) {
            var multiple = _ref2.multiple,
                locale = _ref2.locale;

            return multiple ? Object(belter_src["jsxToHTML"])(DualTag, { locale: locale }) : Object(belter_src["jsxToHTML"])(SaferTag, { locale: locale });
        },

        allowPrimary: true
    }), _labels[constants["c" /* BUTTON_LABEL */].CHECKOUT] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        defaultColor: constants["b" /* BUTTON_COLOR */].GOLD,

        Label: function Label(_ref3) {
            var locale = _ref3.locale,
                logoColor = _ref3.logoColor;

            return Object(belter_src["jsxToHTML"])(Checkout, { locale: locale, logoColor: logoColor });
        },

        Tag: function Tag(_ref4) {
            var multiple = _ref4.multiple,
                locale = _ref4.locale;

            return multiple ? Object(belter_src["jsxToHTML"])(DualTag, { locale: locale }) : Object(belter_src["jsxToHTML"])(SaferTag, { locale: locale });
        },

        allowPrimary: true
    }), _labels[constants["c" /* BUTTON_LABEL */].PAY] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        defaultColor: constants["b" /* BUTTON_COLOR */].GOLD,

        Label: function Label(_ref5) {
            var locale = _ref5.locale,
                logoColor = _ref5.logoColor;

            return Object(belter_src["jsxToHTML"])(Pay, { locale: locale, logoColor: logoColor });
        },

        Tag: function Tag(_ref6) {
            var multiple = _ref6.multiple,
                locale = _ref6.locale;

            return multiple ? Object(belter_src["jsxToHTML"])(DualTag, { locale: locale }) : Object(belter_src["jsxToHTML"])(SaferTag, { locale: locale });
        },

        allowPrimary: true
    }), _labels[constants["c" /* BUTTON_LABEL */].INSTALLMENT] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        defaultColor: constants["b" /* BUTTON_COLOR */].GOLD,

        allowedCountries: [src["c" /* COUNTRY */].BR, src["c" /* COUNTRY */].MX],

        allowedPeriods: (_allowedPeriods = {}, _allowedPeriods[src["c" /* COUNTRY */].BR] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], _allowedPeriods[src["c" /* COUNTRY */].MX] = [3, 6, 9, 12], _allowedPeriods),

        Label: function Label(_ref7) {
            var locale = _ref7.locale,
                logoColor = _ref7.logoColor,
                period = _ref7.period;

            return Object(belter_src["jsxToHTML"])(Installment, { locale: locale, logoColor: logoColor, period: period });
        },

        Tag: function Tag(_ref8) {
            var multiple = _ref8.multiple,
                locale = _ref8.locale;

            return multiple ? Object(belter_src["jsxToHTML"])(DualTag, { locale: locale }) : Object(belter_src["jsxToHTML"])(SaferTag, { locale: locale });
        },

        allowPrimary: true
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/paypal/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PAYPAL_CONFIG", function() { return PAYPAL_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PayPalLogo", function() { return logo["b" /* PayPalLogo */]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PPLogo", function() { return logo["a" /* PPLogo */]; });



/***/ }),

/***/ "./src/funding/paypal/logo.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = PayPalLogo;
/* harmony export (immutable) */ __webpack_exports__["a"] = PPLogo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/constants/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common__ = __webpack_require__("./src/funding/common.jsx");
var _PAYPAL_LOGO_COLORS;

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




var PAYPAL_LOGO_COLORS = (_PAYPAL_LOGO_COLORS = {}, _PAYPAL_LOGO_COLORS[__WEBPACK_IMPORTED_MODULE_1__constants__["k" /* LOGO_COLOR */].BLUE] = {
    primary: '#003087',
    secondary: '#009cde'
}, _PAYPAL_LOGO_COLORS[__WEBPACK_IMPORTED_MODULE_1__constants__["k" /* LOGO_COLOR */].WHITE] = {
    primary: '#ffffff',
    secondary: '#ffffff'
}, _PAYPAL_LOGO_COLORS[__WEBPACK_IMPORTED_MODULE_1__constants__["k" /* LOGO_COLOR */].BLACK] = {
    primary: '#333030',
    secondary: '#636363'
}, _PAYPAL_LOGO_COLORS);

function PayPalLogo(_ref) {
    var logoColor = _ref.logoColor,
        nonce = _ref.nonce;


    if (!PAYPAL_LOGO_COLORS.hasOwnProperty(logoColor)) {
        throw new Error('No ' + logoColor + ' paypal logo available');
    }

    var _PAYPAL_LOGO_COLORS$l = PAYPAL_LOGO_COLORS[logoColor],
        primary = _PAYPAL_LOGO_COLORS$l.primary,
        secondary = _PAYPAL_LOGO_COLORS$l.secondary;


    return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])(__WEBPACK_IMPORTED_MODULE_2__common__["c" /* SVGLogo */], {
        nonce: nonce,
        name: __WEBPACK_IMPORTED_MODULE_1__constants__["e" /* BUTTON_LOGO */].PAYPAL,
        logoColor: logoColor,
        render: function render() {
            return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])(
                'svg',
                { width: '100', height: '32', viewBox: '0 0 100 32', xmlns: 'http://www.w3.org/2000/svg', preserveAspectRatio: 'xMinYMin meet' },
                Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: primary, d: 'M 12 4.917 L 4.2 4.917 C 3.7 4.917 3.2 5.317 3.1 5.817 L 0 25.817 C -0.1 26.217 0.2 26.517 0.6 26.517 L 4.3 26.517 C 4.8 26.517 5.3 26.117 5.4 25.617 L 6.2 20.217 C 6.3 19.717 6.7 19.317 7.3 19.317 L 9.8 19.317 C 14.9 19.317 17.9 16.817 18.7 11.917 C 19 9.817 18.7 8.117 17.7 6.917 C 16.6 5.617 14.6 4.917 12 4.917 Z M 12.9 12.217 C 12.5 15.017 10.3 15.017 8.3 15.017 L 7.1 15.017 L 7.9 9.817 C 7.9 9.517 8.2 9.317 8.5 9.317 L 9 9.317 C 10.4 9.317 11.7 9.317 12.4 10.117 C 12.9 10.517 13.1 11.217 12.9 12.217 Z' }),
                Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: primary, d: 'M 35.2 12.117 L 31.5 12.117 C 31.2 12.117 30.9 12.317 30.9 12.617 L 30.7 13.617 L 30.4 13.217 C 29.6 12.017 27.8 11.617 26 11.617 C 21.9 11.617 18.4 14.717 17.7 19.117 C 17.3 21.317 17.8 23.417 19.1 24.817 C 20.2 26.117 21.9 26.717 23.8 26.717 C 27.1 26.717 29 24.617 29 24.617 L 28.8 25.617 C 28.7 26.017 29 26.417 29.4 26.417 L 32.8 26.417 C 33.3 26.417 33.8 26.017 33.9 25.517 L 35.9 12.717 C 36 12.517 35.6 12.117 35.2 12.117 Z M 30.1 19.317 C 29.7 21.417 28.1 22.917 25.9 22.917 C 24.8 22.917 24 22.617 23.4 21.917 C 22.8 21.217 22.6 20.317 22.8 19.317 C 23.1 17.217 24.9 15.717 27 15.717 C 28.1 15.717 28.9 16.117 29.5 16.717 C 30 17.417 30.2 18.317 30.1 19.317 Z' }),
                Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: primary, d: 'M 55.1 12.117 L 51.4 12.117 C 51 12.117 50.7 12.317 50.5 12.617 L 45.3 20.217 L 43.1 12.917 C 43 12.417 42.5 12.117 42.1 12.117 L 38.4 12.117 C 38 12.117 37.6 12.517 37.8 13.017 L 41.9 25.117 L 38 30.517 C 37.7 30.917 38 31.517 38.5 31.517 L 42.2 31.517 C 42.6 31.517 42.9 31.317 43.1 31.017 L 55.6 13.017 C 55.9 12.717 55.6 12.117 55.1 12.117 Z' }),
                Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: secondary, d: 'M 67.5 4.917 L 59.7 4.917 C 59.2 4.917 58.7 5.317 58.6 5.817 L 55.5 25.717 C 55.4 26.117 55.7 26.417 56.1 26.417 L 60.1 26.417 C 60.5 26.417 60.8 26.117 60.8 25.817 L 61.7 20.117 C 61.8 19.617 62.2 19.217 62.8 19.217 L 65.3 19.217 C 70.4 19.217 73.4 16.717 74.2 11.817 C 74.5 9.717 74.2 8.017 73.2 6.817 C 72 5.617 70.1 4.917 67.5 4.917 Z M 68.4 12.217 C 68 15.017 65.8 15.017 63.8 15.017 L 62.6 15.017 L 63.4 9.817 C 63.4 9.517 63.7 9.317 64 9.317 L 64.5 9.317 C 65.9 9.317 67.2 9.317 67.9 10.117 C 68.4 10.517 68.5 11.217 68.4 12.217 Z' }),
                Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: secondary, d: 'M 90.7 12.117 L 87 12.117 C 86.7 12.117 86.4 12.317 86.4 12.617 L 86.2 13.617 L 85.9 13.217 C 85.1 12.017 83.3 11.617 81.5 11.617 C 77.4 11.617 73.9 14.717 73.2 19.117 C 72.8 21.317 73.3 23.417 74.6 24.817 C 75.7 26.117 77.4 26.717 79.3 26.717 C 82.6 26.717 84.5 24.617 84.5 24.617 L 84.3 25.617 C 84.2 26.017 84.5 26.417 84.9 26.417 L 88.3 26.417 C 88.8 26.417 89.3 26.017 89.4 25.517 L 91.4 12.717 C 91.4 12.517 91.1 12.117 90.7 12.117 Z M 85.5 19.317 C 85.1 21.417 83.5 22.917 81.3 22.917 C 80.2 22.917 79.4 22.617 78.8 21.917 C 78.2 21.217 78 20.317 78.2 19.317 C 78.5 17.217 80.3 15.717 82.4 15.717 C 83.5 15.717 84.3 16.117 84.9 16.717 C 85.5 17.417 85.7 18.317 85.5 19.317 Z' }),
                Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: secondary, d: 'M 95.1 5.417 L 91.9 25.717 C 91.8 26.117 92.1 26.417 92.5 26.417 L 95.7 26.417 C 96.2 26.417 96.7 26.017 96.8 25.517 L 100 5.617 C 100.1 5.217 99.8 4.917 99.4 4.917 L 95.8 4.917 C 95.4 4.917 95.2 5.117 95.1 5.417 Z' })
            );
        }
    });
}

function PPLogo(_ref2) {
    var logoColor = _ref2.logoColor,
        nonce = _ref2.nonce;


    return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])(__WEBPACK_IMPORTED_MODULE_2__common__["c" /* SVGLogo */], {
        nonce: nonce,
        name: __WEBPACK_IMPORTED_MODULE_1__constants__["e" /* BUTTON_LOGO */].PP,
        logoColor: logoColor,
        render: function render() {
            if (logoColor === __WEBPACK_IMPORTED_MODULE_1__constants__["k" /* LOGO_COLOR */].BLUE) {
                return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])(
                    'svg',
                    { width: '24', height: '32', viewBox: '0 0 24 32', xmlns: 'http://www.w3.org/2000/svg', preserveAspectRatio: 'xMinYMin meet' },
                    Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#009cde', d: 'M 20.905 9.5 C 21.185 7.4 20.905 6 19.782 4.7 C 18.564 3.3 16.411 2.6 13.697 2.6 L 5.739 2.6 C 5.271 2.6 4.71 3.1 4.615 3.6 L 1.339 25.8 C 1.339 26.2 1.62 26.7 2.088 26.7 L 6.956 26.7 L 6.675 28.9 C 6.581 29.3 6.862 29.6 7.236 29.6 L 11.356 29.6 C 11.825 29.6 12.292 29.3 12.386 28.8 L 12.386 28.5 L 13.228 23.3 L 13.228 23.1 C 13.322 22.6 13.79 22.2 14.258 22.2 L 14.821 22.2 C 18.845 22.2 21.935 20.5 22.871 15.5 C 23.339 13.4 23.153 11.7 22.029 10.5 C 21.748 10.1 21.279 9.8 20.905 9.5 L 20.905 9.5' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#012169', d: 'M 20.905 9.5 C 21.185 7.4 20.905 6 19.782 4.7 C 18.564 3.3 16.411 2.6 13.697 2.6 L 5.739 2.6 C 5.271 2.6 4.71 3.1 4.615 3.6 L 1.339 25.8 C 1.339 26.2 1.62 26.7 2.088 26.7 L 6.956 26.7 L 8.267 18.4 L 8.173 18.7 C 8.267 18.1 8.735 17.7 9.296 17.7 L 11.636 17.7 C 16.224 17.7 19.782 15.7 20.905 10.1 C 20.812 9.8 20.905 9.7 20.905 9.5' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#003087', d: 'M 9.485 9.5 C 9.577 9.2 9.765 8.9 10.046 8.7 C 10.232 8.7 10.326 8.6 10.513 8.6 L 16.692 8.6 C 17.442 8.6 18.189 8.7 18.753 8.8 C 18.939 8.8 19.127 8.8 19.314 8.9 C 19.501 9 19.688 9 19.782 9.1 C 19.875 9.1 19.968 9.1 20.063 9.1 C 20.343 9.2 20.624 9.4 20.905 9.5 C 21.185 7.4 20.905 6 19.782 4.6 C 18.658 3.2 16.506 2.6 13.79 2.6 L 5.739 2.6 C 5.271 2.6 4.71 3 4.615 3.6 L 1.339 25.8 C 1.339 26.2 1.62 26.7 2.088 26.7 L 6.956 26.7 L 8.267 18.4 L 9.485 9.5 Z' })
                );
            }

            if (logoColor === __WEBPACK_IMPORTED_MODULE_1__constants__["k" /* LOGO_COLOR */].WHITE) {
                return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])(
                    'svg',
                    { width: '24', height: '32', viewBox: '0 0 24 32', xmlns: 'http://www.w3.org/2000/svg', preserveAspectRatio: 'xMinYMin meet' },
                    Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#ffffff', opacity: '0.7', d: 'M 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.548 C 18.361 3.148 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 2.948 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 6.378 28.938 C 6.285 29.238 6.659 29.638 6.94 29.638 L 11.153 29.638 C 11.621 29.638 11.995 29.238 12.089 28.739 L 12.182 28.539 L 12.931 23.341 L 13.025 23.041 C 13.119 22.441 13.493 22.141 13.961 22.141 L 14.616 22.141 C 18.642 22.141 21.731 20.342 22.668 15.443 C 23.042 13.344 22.855 11.545 21.825 10.345 C 21.451 10.046 21.076 9.646 20.702 9.446 L 20.702 9.446' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#ffffff', opacity: '0.7', d: 'M 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.548 C 18.361 3.148 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 2.948 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 7.97 18.342 L 7.876 18.642 C 8.063 18.043 8.438 17.643 9.093 17.643 L 11.433 17.643 C 16.021 17.643 19.578 15.643 20.608 9.946 C 20.608 9.746 20.608 9.546 20.702 9.446' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#ffffff', d: 'M 9.28 9.446 C 9.28 9.146 9.468 8.846 9.842 8.646 C 9.936 8.646 10.123 8.546 10.216 8.546 L 16.489 8.546 C 17.238 8.546 17.893 8.646 18.548 8.746 C 18.736 8.746 18.829 8.746 19.11 8.846 C 19.204 8.946 19.391 8.946 19.578 9.046 C 19.672 9.046 19.672 9.046 19.859 9.146 C 20.14 9.246 20.421 9.346 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.648 C 18.361 3.248 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 3.048 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 7.97 18.342 L 9.28 9.446 Z' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])(
                        'g',
                        { transform: 'matrix(0.497737, 0, 0, 0.52612, 1.10144, 0.638654)', opacity: '0.2' },
                        Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#231f20', d: 'M39.3 16.7c0.9 0.5 1.7 1.1 2.3 1.8 1 1.1 1.6 2.5 1.9 4.1 0.3-3.2-0.2-5.8-1.9-7.8-0.6-0.7-1.3-1.2-2.1-1.7C39.5 14.2 39.5 15.4 39.3 16.7z' }),
                        Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#231f20', d: 'M0.4 45.2L6.7 5.6C6.8 4.5 7.8 3.7 8.9 3.7h16c5.5 0 9.8 1.2 12.2 3.9 1.2 1.4 1.9 3 2.2 4.8 0.4-3.6-0.2-6.1-2.2-8.4C34.7 1.2 30.4 0 24.9 0H8.9c-1.1 0-2.1 0.8-2.3 1.9L0 44.1C0 44.5 0.1 44.9 0.4 45.2z' }),
                        Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#231f20', d: 'M10.7 49.4l-0.1 0.6c-0.1 0.4 0.1 0.8 0.4 1.1l0.3-1.7H10.7z' })
                    )
                );
            }

            if (logoColor === __WEBPACK_IMPORTED_MODULE_1__constants__["k" /* LOGO_COLOR */].BLACK) {
                return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])(
                    'svg',
                    { width: '24', height: '32', viewBox: '0 0 24 32', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                    Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { opacity: '0.7', d: 'M 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.548 C 18.361 3.148 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 2.948 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 6.378 28.938 C 6.285 29.238 6.659 29.638 6.94 29.638 L 11.153 29.638 C 11.621 29.638 11.995 29.238 12.089 28.739 L 12.182 28.539 L 12.931 23.341 L 13.025 23.041 C 13.119 22.441 13.493 22.141 13.961 22.141 L 14.616 22.141 C 18.642 22.141 21.731 20.342 22.668 15.443 C 23.042 13.344 22.855 11.545 21.825 10.345 C 21.451 10.046 21.076 9.646 20.702 9.446 L 20.702 9.446', style: 'fill: rgb(99, 99, 99);' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { opacity: '0.7', d: 'M 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.548 C 18.361 3.148 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 2.948 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 7.97 18.342 L 7.876 18.642 C 8.063 18.043 8.438 17.643 9.093 17.643 L 11.433 17.643 C 16.021 17.643 19.578 15.643 20.608 9.946 C 20.608 9.746 20.608 9.546 20.702 9.446' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { d: 'M 9.28 9.446 C 9.28 9.146 9.468 8.846 9.842 8.646 C 9.936 8.646 10.123 8.546 10.216 8.546 L 16.489 8.546 C 17.238 8.546 17.893 8.646 18.548 8.746 C 18.736 8.746 18.829 8.746 19.11 8.846 C 19.204 8.946 19.391 8.946 19.578 9.046 C 19.672 9.046 19.672 9.046 19.859 9.146 C 20.14 9.246 20.421 9.346 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.648 C 18.361 3.248 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 3.048 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 7.97 18.342 L 9.28 9.446 Z', style: 'fill: rgb(51, 48, 48);' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])(
                        'g',
                        { transform: 'matrix(0.497737, 0, 0, 0.52612, 1.10144, 0.638654)', opacity: '0.2' },
                        Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#231f20', d: 'M39.3 16.7c0.9 0.5 1.7 1.1 2.3 1.8 1 1.1 1.6 2.5 1.9 4.1 0.3-3.2-0.2-5.8-1.9-7.8-0.6-0.7-1.3-1.2-2.1-1.7C39.5 14.2 39.5 15.4 39.3 16.7z' }),
                        Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#231f20', d: 'M0.4 45.2L6.7 5.6C6.8 4.5 7.8 3.7 8.9 3.7h16c5.5 0 9.8 1.2 12.2 3.9 1.2 1.4 1.9 3 2.2 4.8 0.4-3.6-0.2-6.1-2.2-8.4C34.7 1.2 30.4 0 24.9 0H8.9c-1.1 0-2.1 0.8-2.3 1.9L0 44.1C0 44.5 0.1 44.9 0.4 45.2z' }),
                        Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__["jsxToHTML"])('path', { fill: '#231f20', d: 'M10.7 49.4l-0.1 0.6c-0.1 0.4 0.1 0.8 0.4 1.1l0.3-1.7H10.7z' })
                    )
                );
            }

            throw new Error('No ' + logoColor + ' paypal logo available');
        }
    });
}

/***/ }),

/***/ "./src/funding/sepa/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/sepa/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function SepaLogo(_ref) {
    var logoColor = _ref.logoColor,
        nonce = _ref.nonce;


    return Object(src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].SEPA,
        logoColor: logoColor,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '100', height: '32', viewBox: '0 0 100 32', preserveAspectRatio: 'xMinYMin meet', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])('path', { d: 'M 39.871 18.772 C 37.78 18.772 35.843 18.278 34.272 17.425 L 34.81 13.935 C 36.409 14.769 38.051 15.263 39.826 15.263 C 41.809 15.263 42.661 14.544 42.661 13.284 C 42.661 10.45 34.34 11.641 34.34 5.59 C 34.34 2.53 36.319 0.055 40.885 0.055 C 42.639 0.055 44.549 0.416 45.946 0.999 L 45.474 4.395 C 43.989 3.926 42.481 3.633 41.108 3.633 C 38.86 3.633 38.275 4.395 38.275 5.364 C 38.275 8.175 46.598 6.895 46.598 13.013 C 46.576 16.569 44.101 18.772 39.871 18.772 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 62.233 14.881 L 62.233 18.413 L 49.951 18.413 L 49.951 0.345 L 62.233 0.345 L 62.233 3.946 L 54.022 3.946 L 54.022 7.549 L 60.705 7.549 L 60.705 10.787 L 54.022 10.787 L 54.022 14.905 L 62.233 14.905 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 72.313 12.565 L 69.905 12.565 L 69.905 18.437 L 65.834 18.437 L 65.834 0.345 L 72.313 0.345 C 77.328 0.345 79.376 2.328 79.376 6.534 C 79.376 10.361 77.355 12.565 72.313 12.565 Z M 72.313 3.766 L 69.905 3.766 L 69.905 9.302 L 72.313 9.302 C 74.314 9.302 75.194 8.808 75.194 6.534 C 75.194 4.352 74.428 3.766 72.313 3.766 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 91.797 14.924 L 85.246 14.924 L 84.234 18.437 L 79.939 18.437 L 86.193 0.345 L 91.031 0.345 L 97.352 18.437 L 92.808 18.437 L 91.797 14.924 Z M 88.04 5.318 L 86.238 11.506 L 90.85 11.506 L 89.118 5.318 L 88.645 3.408 L 88.578 3.408 L 88.04 5.318 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 39.736 30.157 L 39.692 31.867 L 34.382 31.867 L 34.382 23.475 L 36.299 23.475 L 36.299 30.157 L 39.736 30.157 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 44.798 31.215 L 44.778 31.215 C 44.371 31.71 43.722 31.977 42.931 31.977 C 41.648 31.977 40.818 31.257 40.818 29.727 C 40.818 28.468 41.695 27.613 43.222 27.613 C 43.722 27.613 44.168 27.68 44.527 27.796 L 44.527 27.411 C 44.527 26.736 44.168 26.421 43.244 26.421 C 42.505 26.421 42.007 26.534 41.382 26.782 L 41.245 25.387 C 41.919 25.095 42.707 24.936 43.563 24.936 C 45.563 24.936 46.263 25.792 46.263 27.658 L 46.263 31.867 L 44.933 31.867 L 44.798 31.215 Z M 44.549 28.966 C 44.393 28.896 44.056 28.828 43.583 28.828 C 42.819 28.828 42.46 29.12 42.46 29.727 C 42.46 30.38 42.842 30.63 43.427 30.63 C 44.012 30.63 44.549 30.271 44.549 29.842 L 44.549 28.966 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 50.02 32.002 C 49.21 32.002 48.466 31.842 47.883 31.529 L 48.062 30.088 C 48.625 30.405 49.41 30.561 49.996 30.561 C 50.693 30.561 50.986 30.29 50.986 29.887 C 50.986 28.807 47.84 29.436 47.84 27.051 C 47.84 25.838 48.667 24.959 50.403 24.959 C 51.075 24.959 51.752 25.095 52.336 25.32 L 52.201 26.736 C 51.64 26.512 50.897 26.396 50.381 26.396 C 49.816 26.396 49.503 26.625 49.503 26.961 C 49.503 27.995 52.603 27.366 52.603 29.707 C 52.603 31.101 51.862 32.002 50.02 32.002 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 56.026 26.375 L 56.026 29.842 C 56.026 30.36 56.295 30.582 56.836 30.582 C 57.014 30.582 57.239 30.561 57.374 30.514 L 57.464 31.776 C 57.239 31.888 56.789 31.956 56.295 31.956 C 54.946 31.956 54.27 31.169 54.27 29.887 L 54.27 26.352 L 53.506 26.352 L 53.506 25.095 L 54.337 25.095 L 54.631 23.562 L 56.002 23.451 L 56.002 25.116 L 57.51 25.116 L 57.51 26.421 L 56.026 26.421 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 60.885 32.002 C 60.073 32.002 59.331 31.842 58.748 31.529 L 58.929 30.088 C 59.49 30.405 60.275 30.561 60.862 30.561 C 61.561 30.561 61.851 30.29 61.851 29.887 C 61.851 28.807 58.702 29.436 58.702 27.051 C 58.702 25.838 59.534 24.959 61.269 24.959 C 61.943 24.959 62.615 25.095 63.203 25.32 L 63.069 26.736 C 62.505 26.512 61.764 26.396 61.246 26.396 C 60.681 26.396 60.367 26.625 60.367 26.961 C 60.367 27.995 63.47 27.366 63.47 29.707 C 63.47 31.101 62.729 32.002 60.885 32.002 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 69.365 26.736 C 69.028 26.625 68.603 26.534 68.22 26.534 C 66.958 26.534 66.53 27.051 66.53 28.49 C 66.53 29.954 67.116 30.514 68.174 30.514 C 68.623 30.514 69.05 30.425 69.41 30.271 L 69.525 31.616 C 69.119 31.867 68.511 32.002 67.792 32.002 C 65.787 32.002 64.732 30.854 64.732 28.49 C 64.732 26.242 65.653 24.981 67.835 24.981 C 68.397 24.981 69.05 25.095 69.479 25.276 L 69.365 26.736 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 75.078 31.867 L 75.078 27.546 C 75.078 26.849 74.743 26.491 74.001 26.491 C 73.508 26.491 73.055 26.714 72.855 27.008 L 72.855 31.867 L 71.122 31.867 L 71.122 23.16 L 72.855 23.069 L 72.855 24.622 L 72.83 25.52 L 72.855 25.545 C 73.348 25.116 73.979 24.959 74.541 24.959 C 75.98 24.959 76.812 25.926 76.812 27.546 L 76.812 31.867 L 75.078 31.867 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 78.658 31.867 L 78.658 25.139 L 80.052 25.072 L 80.21 26.199 L 80.231 26.199 C 80.66 25.387 81.313 24.981 82.098 24.981 C 82.39 24.981 82.663 25.028 82.84 25.072 L 82.731 26.782 C 82.528 26.714 82.257 26.667 81.985 26.667 C 81.088 26.667 80.413 27.321 80.413 28.468 L 80.413 31.867 L 78.658 31.867 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 85.382 24.35 C 84.708 24.35 84.395 24.172 84.395 23.609 C 84.395 23.136 84.708 22.867 85.382 22.867 C 86.058 22.867 86.375 23.113 86.375 23.609 C 86.354 24.105 86.058 24.35 85.382 24.35 Z M 84.484 31.867 L 84.484 25.139 L 86.259 25.072 L 86.259 31.888 L 84.484 31.888 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 88.757 31.867 L 88.757 26.375 L 87.902 26.375 L 87.902 25.095 L 88.757 25.095 L 88.757 24.798 C 88.757 23.79 89.454 22.935 91.076 22.935 C 91.459 22.935 91.885 22.979 92.178 23.069 L 92.063 24.195 C 91.863 24.147 91.636 24.126 91.411 24.126 C 90.738 24.126 90.466 24.399 90.466 24.825 L 90.466 25.072 L 91.907 25.072 L 91.907 26.352 L 90.466 26.352 L 90.466 31.842 L 88.757 31.842 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 95.486 26.375 L 95.486 29.842 C 95.486 30.36 95.754 30.582 96.296 30.582 C 96.473 30.582 96.698 30.561 96.834 30.514 L 96.924 31.776 C 96.698 31.888 96.249 31.956 95.754 31.956 C 94.406 31.956 93.729 31.169 93.729 29.887 L 93.729 26.352 L 92.965 26.352 L 92.965 25.095 L 93.798 25.095 L 94.09 23.562 L 95.461 23.451 L 95.461 25.116 L 96.969 25.116 L 96.969 26.421 L 95.486 26.421 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])('path', { d: 'M 20.357 8.826 L 15.368 5.081 L 10.379 1.334 C 10.033 1.074 9.54 1.146 9.281 1.493 L 4.883 7.322 C 4.811 7.409 4.768 7.51 4.754 7.624 C 4.68 7.93 4.782 8.248 5.043 8.45 L 8.022 10.677 L 12.042 13.698 L 15.021 15.926 C 15.281 16.13 15.629 16.13 15.888 15.97 C 15.991 15.912 16.062 15.854 16.136 15.752 L 20.531 9.91 C 20.763 9.578 20.706 9.087 20.357 8.826 Z M 10.047 1.769 L 13.012 3.995 L 13.012 3.995 L 15.021 5.5 L 17.046 7.017 L 17.046 7.017 L 20.025 9.245 C 20.142 9.332 20.156 9.491 20.082 9.607 L 19.374 10.591 L 16.005 8.058 L 12.36 5.326 L 8.976 2.809 L 9.684 1.826 C 9.772 1.709 9.931 1.682 10.047 1.769 Z M 15.673 15.463 C 15.629 15.507 15.585 15.536 15.528 15.55 C 15.469 15.564 15.398 15.55 15.339 15.507 L 12.345 13.265 L 8.34 10.257 L 5.361 8.001 C 5.302 7.958 5.275 7.9 5.259 7.842 C 5.259 7.785 5.259 7.726 5.302 7.669 L 6.113 6.585 C 6.113 6.585 7.009 5.427 7.791 4.386 L 11.16 6.917 L 14.804 9.65 L 18.173 12.181 C 17.393 13.222 16.496 14.379 16.496 14.379 L 15.673 15.463 Z', style: 'fill: rgb(255, 255, 255);' }),
                Object(src["jsxToHTML"])(
                    'g',
                    { transform: 'matrix(0.144619, 0, 0, 0.144619, -7.250457, -3.988513)' },
                    Object(src["jsxToHTML"])('path', { d: 'M197.1,150.4l52-69.6l5.3-7c0,0,0.1-0.2,0.2-0.2c0.4-0.5,0.3-1.2-0.2-1.6l-14.7-10.7 c-0.5-0.4-1.2-0.2-1.6,0.3c-0.1,0.1-0.2,0.2-0.2,0.2l-2,2.5l-64.3,86l-70.8,0l-26.5,87.4h177.1l-25-87.4L197.1,150.4z M79.1,234.3 l24.2-80.5l65.7,0l-5.7,7.6l-8.1,11.3l-0.9,1.7l-0.9,1.9l-0.9,2.2l-0.9,2.3l-0.9,2.5l-0.9,2.5l-0.8,2.5l-0.8,2.4l-0.7,2.3 l-0.7,2.1l-0.6,1.9l-0.4,1.6l-0.3,1.2l-0.3,0.7c0,0-0.1,0.2-0.2,0.4c-0.2,0.2-1.2,1.1-2,0.5c-0.8-0.6-0.7-2.6-0.6-3.6 c0.2-3,0.5-6,0.7-8.9c0.1-1-1.2-1.6-2-1.2c-3.6,2.1-5.8,4.6-7.8,7.5c0.2-0.7,0.4-1.4,0.6-2c0.8-3.1,2-6.2,2.5-9.4 c0.3-1.8-0.2-3.9-2.3-4.3c-2.4-0.4-3.9,2.1-5.1,3.7c-3.5,5-5.6,11.2-9.9,15.5c-1.6,1.6-3.5,2.8-5.8,2.1c-2.7-0.8-3.8,2.4,1,2.9 c4.7,0.4,8.3-4.6,10.4-8.1c1.6-2.5,2.9-5.2,4.5-7.8c0.7-1.2,1.5-2.4,2.3-3.6c0.4-0.5,1-1.8,1.7-2c0.8-0.2,0.6,0.3,0.6,0.9 c-0.1,1.5-0.7,3-1.1,4.5c-0.4,1.6-0.9,3.2-1.3,4.7c-0.9,3.4-1.8,6.8-2.8,10.1c-0.4,1.5,1.6,2.2,2.5,1c3.4-4.8,5.1-8.9,9.2-12.1 c-0.1,1.1-0.2,2.1-0.3,3.2c-0.1,1.7-0.5,3.6-0.4,5.3c0.2,2.9,2.4,4.8,5.1,3.6c1.4-0.7,2.4-1.7,2.4-1.7l0.2-0.1l0.6-0.4l1-0.7 l1.4-1l1.6-1.2l1.7-1.2l2.1-1.4l2.1-1.5l2.1-1.5l2.1-1.5l2-1.5l1.9-1.4l1.8-1.4l1.5-1.2l1.2-1.1l1-0.9l0-0.1l0,0l6.5-7.6 l16.6-22.1l29.4,0l22.9,80.5H79.1z', style: 'fill: rgb(255, 255, 255);' }),
                    Object(src["jsxToHTML"])('path', { d: 'M261.1,77.1l-1.9-1.5c-0.4-0.3-0.9-0.2-1.2,0.2l-24.7,32.9c-0.3,0.4-0.2,0.9,0.2,1.2l1.9,1.5 c0.4,0.3,0.9,0.2,1.2-0.2l24.7-32.9C261.5,77.9,261.5,77.4,261.1,77.1z', style: 'fill: rgb(255, 255, 255);' }),
                    Object(src["jsxToHTML"])('polygon', { points: '161.7,217.2 210.9,217.2 209.9,213.3 161.7,213.3 113.6,213.3 112.5,217.2 \t\t', style: 'fill: rgb(255, 255, 255);' })
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/sepa/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars







var SEPA_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["c" /* getGuestUrl */],

    layouts: [constants["d" /* BUTTON_LAYOUT */].VERTICAL],

    defaultLabel: constants["c" /* BUTTON_LABEL */].SEPA,

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].SEPA] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: SepaLogo,

        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].SILVER],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["k" /* LOGO_COLOR */].BLACK, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors),

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/sepa/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SEPA_CONFIG", function() { return SEPA_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SepaLogo", function() { return SepaLogo; });



/***/ }),

/***/ "./src/funding/sofort/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/sofort/logo.jsx

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




function SofortLogo(_ref) {
    var logoColor = _ref.logoColor,
        nonce = _ref.nonce;


    return Object(src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].SOFORT,
        logoColor: logoColor,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                {
                    version: '1.1', id: 'Layer_1', width: '100', height: '32', xmlns: 'http://www.w3.org/2000/svg', xlink: 'http://www.w3.org/1999/xlink',
                    viewBox: '0 0 452.9 101.1', style: 'enable-background:new 0 0 452.9 101.1;', space: 'preserve'
                },
                Object(src["jsxToHTML"])('path', { d: 'M79.7,0H57.4c0,18.3-8.4,35-23,46l-8.8,6.6l34.2,46.6h28.1L56.4,56.3C71.3,41.5,79.7,21.5,79.7,0z' }),
                Object(src["jsxToHTML"])('rect', { width: '22.8', height: '99.2' }),
                Object(src["jsxToHTML"])('rect', { x: '94.5', width: '21.5', height: '99.2' }),
                Object(src["jsxToHTML"])('path', { d: 'M304.6,28.7c-8.2,0-16,2.5-21.2,9.6v-7.7H263v68.6h20.7v-36c0-10.4,7-15.5,15.4-15.5c9,0,14.2,5.4,14.2,15.4v36.2h20.5V55.6 C333.8,39.6,321.1,28.7,304.6,28.7z' }),
                Object(src["jsxToHTML"])('path', { d: 'M181,30.6V35c-5.8-4-12.8-6.3-20.4-6.3c-20,0-36.2,16.2-36.2,36.2s16.2,36.2,36.2,36.2c7.6,0,14.6-2.3,20.4-6.3v4.4h20.5 V30.6H181z M162.3,82.5c-10.3,0-18.6-7.9-18.6-17.6s8.3-17.6,18.6-17.6c10.3,0,18.6,7.9,18.6,17.6S172.6,82.5,162.3,82.5z' }),
                Object(src["jsxToHTML"])('path', { d: 'M233.3,39.5v-8.9h-21v68.6h21.1v-32c0-10.8,11.7-16.6,19.8-16.6c0.1,0,0.2,0,0.2,0v-20C245.1,30.6,237.4,34.2,233.3,39.5z' }),
                Object(src["jsxToHTML"])('path', { d: 'M397.6,30.6V35c-5.8-4-12.8-6.3-20.4-6.3c-20,0-36.2,16.2-36.2,36.2s16.2,36.2,36.2,36.2c7.6,0,14.6-2.3,20.4-6.3v4.4h20.5 V30.6H397.6z M378.9,82.5c-10.3,0-18.6-7.9-18.6-17.6s8.3-17.6,18.6-17.6c10.3,0,18.6,7.9,18.6,17.6 C397.6,74.6,389.2,82.5,378.9,82.5z' }),
                Object(src["jsxToHTML"])(
                    'g',
                    null,
                    Object(src["jsxToHTML"])('path', { d: 'M434,32.6c0-1-0.7-1.6-1.8-1.6h-1.9v5.2h0.9v-1.9h1l0.8,1.9h1l-0.9-2.1C433.7,33.8,434,33.3,434,32.6z M432.2,33.4h-1v-1.6 h1c0.6,0,0.9,0.3,0.9,0.8S432.9,33.4,432.2,33.4z' }),
                    Object(src["jsxToHTML"])('path', { d: 'M431.9,28.8c-2.7,0-4.9,2.2-4.9,4.9c0.1,2.7,2.2,4.9,4.9,4.9s4.9-2.2,4.9-4.9C436.8,31,434.6,28.8,431.9,28.8z M431.9,37.7 c-2.2,0-3.9-1.8-3.9-4c0-2.2,1.8-4,3.9-4c2.2,0,3.9,1.8,3.9,4C435.8,35.9,434,37.7,431.9,37.7z' })
                ),
                Object(src["jsxToHTML"])('path', { d: 'M440,74.9c-7.1,0-12.9,5.8-12.9,12.9c0,7.1,5.8,12.9,12.9,12.9c7.1,0,12.9-5.8,12.9-12.9C452.9,80.6,447.1,74.9,440,74.9z' })
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/sofort/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars







var SOFORT_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["a" /* getAltPayUrl */],

    layouts: [constants["d" /* BUTTON_LAYOUT */].VERTICAL],

    defaultLabel: constants["c" /* BUTTON_LABEL */].SOFORT,

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].SOFORT] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: SofortLogo,

        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].SILVER],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["k" /* LOGO_COLOR */].BLACK, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors),

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/sofort/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SOFORT_CONFIG", function() { return SOFORT_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SofortLogo", function() { return SofortLogo; });



/***/ }),

/***/ "./src/funding/venmo/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./node_modules/paypal-sdk-constants/src/index.js + 7 modules
var paypal_sdk_constants_src = __webpack_require__("./node_modules/paypal-sdk-constants/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/venmo/logo.jsx
var _VENMO_LOGO_COLORS;

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




var VENMO_LOGO_COLORS = (_VENMO_LOGO_COLORS = {}, _VENMO_LOGO_COLORS[constants["k" /* LOGO_COLOR */].BLUE] = {
    primary: '#3D93CE'
}, _VENMO_LOGO_COLORS[constants["k" /* LOGO_COLOR */].WHITE] = {
    primary: '#ffffff'
}, _VENMO_LOGO_COLORS);

function VenmoLogo(_ref) {
    var logoColor = _ref.logoColor,
        nonce = _ref.nonce;


    if (!VENMO_LOGO_COLORS[logoColor]) {
        throw new Error('No ' + logoColor + ' venmo logo available');
    }

    var primary = VENMO_LOGO_COLORS[logoColor].primary;


    return Object(src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].VENMO,
        logoColor: logoColor,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '101', height: '32', viewBox: '0 0 101 32', xmlns: 'http://www.w3.org/2000/svg', preserveAspectRatio: 'xMinYMin meet' },
                Object(src["jsxToHTML"])(
                    'g',
                    { id: 'Page-1', stroke: 'none', 'stroke-width': '1', fill: 'none', 'fill-rule': 'evenodd' },
                    Object(src["jsxToHTML"])(
                        'g',
                        { id: 'Blue', fill: primary },
                        Object(src["jsxToHTML"])(
                            'g',
                            { id: 'Logo', transform: 'translate(0.000000, 6.000000)' },
                            Object(src["jsxToHTML"])('path', { d: 'M16.6660484,0.18 C17.3466626,1.3390991 17.6535069,2.53297297 17.6535069,4.04108108 C17.6535069,8.85117117 13.671346,15.0998198 10.439346,19.4875676 L3.05725952,19.4875676 L0.0966314879,1.23315315 L6.56045675,0.60036036 L8.12578201,13.5895495 C9.58835986,11.1326126 11.3932543,7.27153153 11.3932543,4.6390991 C11.3932543,3.1981982 11.1538599,2.21675676 10.7797405,1.40864865 L16.6660484,0.18 Z M24.9071592,11.6938739 C24.9071592,13.8367568 26.062718,14.6774775 27.5946678,14.6774775 C29.2629152,14.6774775 30.860218,14.2571171 32.9363097,13.1691892 L32.154346,18.6445045 C30.6915934,19.3814414 28.4119291,19.8731532 26.1991903,19.8731532 C20.5863512,19.8731532 18.5775346,16.3632432 18.5775346,11.9753153 C18.5775346,6.28810811 21.8451817,0.249369369 28.5819516,0.249369369 C32.2909931,0.249369369 34.3649879,2.39207207 34.3649879,5.37567568 C34.3653374,10.1855856 28.3783789,11.6590991 24.9071592,11.6938739 Z M25.0434567,8.2181982 C26.2329152,8.2181982 29.2274429,7.65711712 29.2274429,5.90216216 C29.2274429,5.05945946 28.6495761,4.6390991 27.9686125,4.6390991 C26.7772318,4.6390991 25.2138287,6.11225225 25.0434567,8.2181982 Z M53.0187093,4.4636036 C53.0187093,5.16558559 52.9154377,6.18378378 52.8126903,6.84918919 L50.8730709,19.4873874 L44.5790934,19.4873874 L46.3483408,7.90216216 C46.381891,7.58792793 46.4849879,6.95531532 46.4849879,6.60432432 C46.4849879,5.76162162 45.9743962,5.55135135 45.3605329,5.55135135 C44.5451938,5.55135135 43.7279325,5.93711712 43.1836159,6.21873874 L41.1768962,19.4875676 L34.8474464,19.4875676 L37.7390519,0.565945946 L43.2171661,0.565945946 L43.2865381,2.07621622 C44.5789187,1.19873874 46.2807163,0.24972973 48.6952803,0.24972973 C51.8942543,0.249369369 53.0187093,1.93495495 53.0187093,4.4636036 Z M71.7037093,2.32072072 C73.5063322,0.988108108 75.2084792,0.249369369 77.5554187,0.249369369 C80.7872439,0.249369369 81.9113495,1.93495495 81.9113495,4.4636036 C81.9113495,5.16558559 81.8084273,6.18378378 81.7056799,6.84918919 L79.7683322,19.4873874 L73.4726073,19.4873874 L75.2755796,7.6572973 C75.3087803,7.34108108 75.3785017,6.95531532 75.3785017,6.71063063 C75.3785017,5.7618018 74.8677353,5.55135135 74.2540467,5.55135135 C73.4722578,5.55135135 72.6908183,5.90234234 72.1106799,6.21873874 L70.1043097,19.4875676 L63.8101574,19.4875676 L65.6131298,7.65747748 C65.6463304,7.34126126 65.713955,6.9554955 65.713955,6.71081081 C65.713955,5.76198198 65.2030138,5.55153153 64.5914221,5.55153153 C63.7743356,5.55153153 62.9588218,5.9372973 62.4145052,6.21891892 L60.4062128,19.4877477 L54.0788599,19.4877477 L56.9701159,0.566126126 L62.3813045,0.566126126 L62.551327,2.14576577 C63.8101574,1.1990991 65.5105571,0.25009009 67.7900467,0.25009009 C69.7637405,0.249369369 71.0559464,1.12702703 71.7037093,2.32072072 Z M83.55059,11.7998198 C83.55059,5.83279279 86.6120433,0.249369369 93.6558322,0.249369369 C98.9633997,0.249369369 100.903543,3.47981982 100.903543,7.93873874 C100.903543,13.8365766 97.8751159,19.9443243 90.6614792,19.9443243 C85.3196626,19.9443243 83.55059,16.3281081 83.55059,11.7998198 Z M94.4374464,7.83279279 C94.4374464,6.28810811 94.0628028,5.23495495 92.9409689,5.23495495 C90.4570329,5.23495495 89.9469654,9.76306306 89.9469654,12.0794595 C89.9469654,13.8367568 90.4238322,14.9243243 91.5453166,14.9243243 C93.8931298,14.9243243 94.4374464,10.149009 94.4374464,7.83279279 Z' })
                        )
                    )
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/venmo/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars








var VENMO_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["b" /* getCheckoutUrl */],

    defaultLabel: constants["c" /* BUTTON_LABEL */].VENMO,

    platforms: [paypal_sdk_constants_src["i" /* PLATFORM */].MOBILE],

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].VENMO] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: VenmoLogo,

        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].BLUE, constants["b" /* BUTTON_COLOR */].SILVER],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["k" /* LOGO_COLOR */].WHITE, _logoColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["k" /* LOGO_COLOR */].BLUE, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].BLUE, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].BLUE, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors),

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/venmo/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "VENMO_CONFIG", function() { return VENMO_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "VenmoLogo", function() { return VenmoLogo; });



/***/ }),

/***/ "./src/funding/wechatpay/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/wechatpay/logo.jsx
var _WECHATPAY_LOGO_COLOR;

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




var WECHATPAY_LOGO_COLORS = (_WECHATPAY_LOGO_COLOR = {}, _WECHATPAY_LOGO_COLOR[constants["k" /* LOGO_COLOR */].BLACK] = {
    primary: '#1AAD19',
    secondary: '#4D4D4D'
}, _WECHATPAY_LOGO_COLOR);

function WechatpayLogo(_ref) {
    var logoColor = _ref.logoColor,
        nonce = _ref.nonce;


    if (!WECHATPAY_LOGO_COLORS[logoColor]) {
        throw new Error('No ' + logoColor + ' wechatpay logo available');
    }

    var _WECHATPAY_LOGO_COLOR2 = WECHATPAY_LOGO_COLORS[logoColor],
        primary = _WECHATPAY_LOGO_COLOR2.primary,
        secondary = _WECHATPAY_LOGO_COLOR2.secondary;


    return Object(src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].WECHATPAY,
        logoColor: logoColor,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '81px', height: '15px', viewBox: '0 0 81 15', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                Object(src["jsxToHTML"])(
                    'g',
                    { stroke: 'none', 'stroke-width': '1', fill: 'none', 'fill-rule': 'evenodd' },
                    Object(src["jsxToHTML"])(
                        'g',
                        { transform: 'translate(-100.000000, -159.000000)' },
                        Object(src["jsxToHTML"])(
                            'g',
                            { transform: 'translate(100.000000, 159.000000)' },
                            Object(src["jsxToHTML"])('path', { d: 'M6.14570881,9.41936066 C6.06938663,9.45772131 5.98346261,9.48009836 5.89212219,9.48009836 C5.68112827,9.48009836 5.49746261,9.36378689 5.40095198,9.19214754 L5.36402188,9.1114918 L3.82600669,5.74042623 C3.80926505,5.70354098 3.79892462,5.66222951 3.79892462,5.62190164 C3.79892462,5.4664918 3.92497933,5.34059016 4.08057812,5.34059016 C4.14385167,5.34059016 4.20220122,5.3612459 4.24922553,5.39640984 L6.06421641,6.68714754 C6.19691854,6.77370492 6.35522553,6.82460656 6.52559635,6.82460656 C6.6272772,6.82460656 6.72428024,6.80567213 6.81438967,6.77272131 L15.3506571,2.97821311 C13.8205204,1.17698361 11.3006571,9.83606557e-05 8.4489155,9.83606557e-05 C3.78267538,9.83606557e-05 4.92401216e-05,3.14837705 4.92401216e-05,7.03239344 C4.92401216e-05,9.15157377 1.13823465,11.0587869 2.91924985,12.3480492 C3.0622924,12.4498525 3.15584863,12.6173115 3.15584863,12.8061639 C3.15584863,12.868623 3.1425538,12.925918 3.12605836,12.9854262 C2.98400061,13.5155902 2.75601884,14.3644426 2.74543222,14.4040328 C2.72770578,14.4706721 2.70013131,14.5400164 2.70013131,14.6096066 C2.70013131,14.7650164 2.82618602,14.890918 2.9817848,14.890918 C3.04284255,14.890918 3.09282128,14.8682951 3.1445234,14.838541 L4.99422857,13.7720656 C5.13333191,13.6916557 5.28055988,13.6422295 5.44280608,13.6422295 C5.52922249,13.6422295 5.6124383,13.6552623 5.69122249,13.6793607 C6.55415562,13.9272295 7.48504012,14.0651803 8.4489155,14.0651803 C13.1151556,14.0651803 16.898028,10.9164098 16.898028,7.03239344 C16.898028,5.856 16.5491617,4.74821311 15.9356298,3.77370492 L6.20750517,9.38370492 L6.14570881,9.41936066 Z', fill: primary }),
                            Object(src["jsxToHTML"])('path', { d: 'M29.5311474,7.78413934 C29.4695973,8.00446721 29.4090319,8.21864754 29.3499438,8.42741803 C29.1195,9.24086066 28.9178617,9.9529918 28.7610319,10.6688115 C28.6071565,9.81012295 28.3429833,8.80143443 28.0625608,7.75807377 L26.7178131,2.69422131 L26.0208191,2.69422131 L24.5423845,7.79594262 C24.2043511,8.89659836 23.9096489,9.88020492 23.7515881,10.6766803 C23.601652,9.98348361 23.388196,9.1429918 23.1634149,8.2575 L21.7290502,2.69422131 L20.9618891,2.69422131 L23.3652994,11.7837295 L24.0485061,11.7837295 L25.5941535,6.57528689 C25.9632082,5.35881148 26.2020228,4.52004098 26.3514666,3.76856557 C26.4819529,4.57340164 26.6959012,5.42446721 27.009807,6.57331967 L28.3676033,11.7837295 L29.0643511,11.7837295 L31.7917614,2.69422131 L31.0236155,2.69422131 L29.5311474,7.78413934 Z', fill: secondary }),
                            Object(src["jsxToHTML"])('path', { d: 'M34.628214,5.77482787 C35.1580377,5.77482787 35.5859343,5.93638525 35.9000863,6.25507377 C36.4119374,6.77368033 36.4798888,7.54482787 36.481366,7.90384426 L32.5428948,7.90384426 C32.6832292,6.90769672 33.3071015,5.77482787 34.628214,5.77482787 Z M36.5818158,10.9372869 C36.2093143,11.109418 35.7368553,11.2616311 34.8950954,11.2616311 C33.3940103,11.2616311 32.5266456,10.2630246 32.5089191,8.51958197 L37.220214,8.51958197 L37.2295696,8.47679508 C37.2576365,8.35089344 37.2576365,8.2542541 37.2576365,8.07843443 C37.2576365,7.83695902 37.2236608,6.99228689 36.7878857,6.2602377 C36.3425088,5.51195902 35.6428067,5.13277869 34.7082292,5.13277869 C32.9520802,5.13277869 31.7722869,6.54671311 31.7722869,8.65163115 C31.7722869,10.6048279 32.9949191,11.9172049 34.814834,11.9172049 C35.9744389,11.9172049 36.6283477,11.6233525 36.8558371,11.4972049 L36.8935058,11.4763033 L36.5818158,10.9372869 Z', fill: secondary }),
                            Object(src["jsxToHTML"])('path', { d: 'M42.8043392,11.2616066 C40.4580474,11.2616066 39.057166,9.7827541 39.057166,7.30578689 C39.057166,4.73709836 40.4979319,3.20340984 42.9111903,3.20340984 C43.5806097,3.20340984 44.2094061,3.32931148 44.6939289,3.55677049 L45.0334395,2.96955738 L45.0051264,2.95406557 C44.831555,2.85865574 44.1660748,2.54783607 42.8978954,2.54783607 C40.1362632,2.54783607 38.2808954,4.45455738 38.2808954,7.2925082 C38.2808954,10.7058689 40.6028134,11.9171803 42.5908833,11.9171803 C43.7216827,11.9171803 44.5991416,11.6801311 45.0432875,11.4583279 L45.077017,11.4413607 L44.751786,10.8787377 C44.2308255,11.1184918 43.5099502,11.2616066 42.8043392,11.2616066', fill: secondary }),
                            Object(src["jsxToHTML"])('path', { d: 'M49.1547392,5.13265574 C48.6780948,5.13265574 48.2204079,5.26445902 47.8336267,5.51281967 C47.5150432,5.69478689 47.2255112,5.98347541 47.0216571,6.31839344 L47.0216571,2.5477377 L46.2719763,2.5477377 L46.2719763,11.7838033 L47.0216571,11.7838033 L47.0216571,7.82527869 C47.0216571,7.56634426 47.033721,7.39888525 47.0984717,7.20413115 C47.3929277,6.37814754 48.1669824,5.8015082 48.981414,5.8015082 C50.4657574,5.8015082 50.6875842,7.14462295 50.6875842,7.94527869 L50.6875842,11.7838033 L51.437265,11.7838033 L51.437265,7.87863934 C51.437265,5.26519672 49.5358578,5.13265574 49.1547392,5.13265574', fill: secondary }),
                            Object(src["jsxToHTML"])('path', { d: 'M61.0768805,11.2239836 C60.9456556,11.2517705 60.7622362,11.2748852 60.5106191,11.2748852 C59.9106283,11.2748852 59.6314368,10.873082 59.6314368,10.010459 L59.6314368,5.90808197 L61.4589839,5.90808197 L61.4589839,5.27906557 L59.6314368,5.27906557 L59.6314368,3.8425082 L58.8815097,3.8425082 L58.8815097,5.27906557 L57.8011815,5.27906557 L57.8011815,5.90808197 L58.8815097,5.90808197 L58.8815097,9.89070492 C58.8815097,10.6298852 59.0169201,11.1428361 59.2936495,11.4566066 C59.5366495,11.7666885 59.9295857,11.930459 60.4303578,11.930459 C60.7880872,11.930459 61.0960842,11.8751311 61.346224,11.7659508 L61.3811845,11.750459 L61.0768805,11.2239836 Z', fill: secondary }),
                            Object(src["jsxToHTML"])('path', { d: 'M68.8747432,5.2672377 C68.8747432,6.62977869 67.9564149,7.4110082 66.3548799,7.4110082 C66.0161079,7.4110082 65.5899347,7.3972377 65.2622416,7.29297541 L65.2622416,3.36617213 C65.4183328,3.33518852 65.8238252,3.27002459 66.4747796,3.27002459 C67.9999924,3.27002459 68.8747432,3.99789344 68.8747432,5.2672377 M66.5016155,2.62772951 C65.8550927,2.62772951 65.2009377,2.6862541 64.5576155,2.80182787 L64.5125608,2.80994262 L64.5125608,11.783877 L65.2622416,11.783877 L65.2622416,7.96354918 C65.5552204,8.03756557 65.8809438,8.05305738 66.3014544,8.05305738 C67.4544119,8.05305738 68.4072082,7.69158197 68.9830714,7.0360082 C69.4146611,6.56338525 69.6241778,5.96289344 69.6241778,5.20059836 C69.6241778,4.46018852 69.3784696,3.83830328 68.9141353,3.40281148 C68.3926824,2.8957623 67.5583085,2.62772951 66.5016155,2.62772951', fill: secondary }),
                            Object(src["jsxToHTML"])('path', { d: 'M79.9828222,5.27906557 L78.4091079,9.45791803 C78.2636033,9.83537705 78.1402568,10.2032459 78.03119,10.528082 C78.0050927,10.6060328 77.979734,10.6812787 77.9553602,10.753082 C77.8268435,10.3370164 77.6687827,9.87644262 77.5235243,9.49701639 L75.8427128,5.3132459 L75.8289255,5.27906557 L75.0307432,5.27906557 L77.4356307,11.2832459 C77.4984119,11.4401311 77.5114605,11.5109508 77.5114605,11.5426721 C77.5114605,11.6011967 77.4848708,11.6789016 77.4358769,11.8013607 C77.1103997,12.5732459 76.6822568,13.0945574 76.3811535,13.3952951 C75.9648283,13.7961148 75.5120653,14.0024262 75.2791596,14.0897213 L75.2348435,14.1061967 L75.5795243,14.7025082 C75.7501413,14.6378361 76.1772994,14.4507049 76.6551748,14.0486557 C77.4873328,13.3232459 78.0198647,12.2048852 78.8308495,10.1240656 L80.7819894,5.27906557 L79.9828222,5.27906557 Z', fill: secondary }),
                            Object(src["jsxToHTML"])('path', { d: 'M56.4250185,9.67738525 C56.4250185,9.77279508 56.4139395,9.91394262 56.3610064,10.0462377 C56.1564137,10.6467295 55.5650398,11.2882869 54.518441,11.2882869 C53.9531644,11.2882869 53.2926082,10.9536148 53.2926082,10.0103361 C53.2926082,9.60804098 53.4260489,9.27459836 53.6889912,9.01935246 C54.1434775,8.57820492 54.981052,8.35517213 56.1815261,8.35517213 C56.2610489,8.35517213 56.3422951,8.35615574 56.4250185,8.35812295 L56.4250185,9.67738525 Z M57.2672708,11.720582 C57.1857784,11.2186967 57.1744532,10.698123 57.1744532,10.2102541 L57.1744532,7.7055 C57.1744532,6.02230328 56.3898119,5.13263115 54.9054684,5.13263115 C54.2370337,5.13263115 53.5225596,5.34017213 52.9947055,5.68787705 L52.9917511,5.68984426 L53.297286,6.21804098 C53.7170581,5.93279508 54.2614076,5.77492623 54.8392404,5.77492623 C54.8468726,5.77492623 54.8545049,5.77468033 54.8621371,5.77468033 C55.3363195,5.77468033 55.70759,5.90451639 55.9663468,6.1607459 C56.2748362,6.46615574 56.4250185,6.93681148 56.4250185,7.59902459 L56.4250185,7.71705738 C54.8549973,7.70427049 53.7414319,8.02492623 53.1015565,8.65787705 C52.713052,9.04172951 52.5163377,9.53254918 52.5163377,10.1170574 C52.5163377,10.9905 53.1219912,11.930582 54.4519669,11.930582 C55.4200277,11.930582 56.1258848,11.4289426 56.4902617,10.9295164 L56.5769243,11.7837787 L57.2776112,11.7837787 L57.2672708,11.720582 Z', fill: secondary }),
                            Object(src["jsxToHTML"])('path', { d: 'M73.6282614,9.67738525 C73.6282614,9.77279508 73.6174286,9.91369672 73.5644954,10.0462377 C73.3596565,10.6467295 72.7682827,11.2882869 71.7219301,11.2882869 C71.1564073,11.2882869 70.4958511,10.9536148 70.4958511,10.0103361 C70.4958511,9.60804098 70.6292918,9.27459836 70.892234,9.01935246 C71.3467204,8.57820492 72.1842948,8.35517213 73.384769,8.35517213 C73.4642918,8.35517213 73.545538,8.35615574 73.6282614,8.35812295 L73.6282614,9.67738525 Z M74.4705137,11.720582 C74.3892675,11.2184508 74.3779422,10.697877 74.3779422,10.2102541 L74.3779422,7.7055 C74.3779422,6.02230328 73.5933009,5.13263115 72.1087112,5.13263115 C71.4708055,5.13263115 70.7930152,5.32320492 70.2732857,5.64263115 L70.5775897,6.16886066 C70.9857903,5.91509016 71.4991185,5.77492623 72.0427295,5.77492623 C72.0506079,5.77492623 72.0579939,5.77468033 72.0656261,5.77468033 C72.5395623,5.77468033 72.9108328,5.90451639 73.1695897,6.1605 C73.4783252,6.46615574 73.6282614,6.93681148 73.6282614,7.59902459 L73.6282614,7.71705738 C72.0646413,7.70427049 70.9446748,8.02492623 70.3047994,8.65787705 C69.9162948,9.04172951 69.7195805,9.53254918 69.7195805,10.1170574 C69.7195805,10.9905 70.325234,11.930582 71.6552097,11.930582 C72.6232705,11.930582 73.3291277,11.4291885 73.6935046,10.9295164 L73.7801672,11.7837787 L74.4808541,11.7837787 L74.4705137,11.720582 Z', fill: secondary })
                        )
                    )
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/wechatpay/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars







var WECHATPAY_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["a" /* getAltPayUrl */],

    defaultLabel: constants["c" /* BUTTON_LABEL */].WECHATPAY,

    layouts: [constants["d" /* BUTTON_LAYOUT */].VERTICAL],

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].WECHATPAY] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: WechatpayLogo,

        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].SILVER],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["k" /* LOGO_COLOR */].BLACK, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors),

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/wechatpay/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "WECHATPAY_CONFIG", function() { return WECHATPAY_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "WechatpayLogo", function() { return WechatpayLogo; });



/***/ }),

/***/ "./src/funding/zimpler/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/belter/src/index.js
var src = __webpack_require__("./node_modules/belter/src/index.js");

// EXTERNAL MODULE: ./src/config/index.js + 1 modules
var config = __webpack_require__("./src/config/index.js");

// EXTERNAL MODULE: ./src/constants/index.js + 4 modules
var constants = __webpack_require__("./src/constants/index.js");

// EXTERNAL MODULE: ./src/funding/common.jsx
var common = __webpack_require__("./src/funding/common.jsx");

// CONCATENATED MODULE: ./src/funding/zimpler/logo.jsx
var _ZIMPLER_LOGO_COLORS;

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars




var ZIMPLER_LOGO_COLORS = (_ZIMPLER_LOGO_COLORS = {}, _ZIMPLER_LOGO_COLORS[constants["k" /* LOGO_COLOR */].BLACK] = {
    primary: '#00A599'
}, _ZIMPLER_LOGO_COLORS);

function ZimplerLogo(_ref) {
    var logoColor = _ref.logoColor,
        nonce = _ref.nonce;


    if (!ZIMPLER_LOGO_COLORS[logoColor]) {
        throw new Error('No ' + logoColor + ' zimpler logo available');
    }

    var primary = ZIMPLER_LOGO_COLORS[logoColor].primary;


    return Object(src["jsxToHTML"])(common["c" /* SVGLogo */], {
        nonce: nonce,
        name: constants["e" /* BUTTON_LOGO */].ZIMPLER,
        logoColor: logoColor,
        render: function render() {
            return Object(src["jsxToHTML"])(
                'svg',
                { width: '127', height: '32', viewBox: '0 0 127 32', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', preserveAspectRatio: 'xMinYMin meet' },
                Object(src["jsxToHTML"])(
                    'g',
                    { transform: 'matrix(2.2546708,0,0,2.0580615,0.70028058,1.3242473)', fill: primary },
                    Object(src["jsxToHTML"])('path', { d: 'm 44.363387,6.5973104 c 0.2184,-1.0706901 1.091377,-1.9895312 2.0692,-1.9895312 0.550355,0 0.9492,0.4072031 0.806711,0.8621302 L 44.211564,7.544662 c 0.05693,-0.5305417 0.151823,-0.9473516 0.151823,-0.9473516 z m -14.0476,2.5296797 0.474755,-2.719026 c 0.208756,-0.6442735 0.968178,-1.5064037 1.755911,-1.5538178 0.303645,-0.018904 0.664534,-0.00961 1.006134,0.2652709 0.294311,0.3315885 0.446133,0.8243229 0.446133,1.4400859 0,1.9421172 -0.9492,3.287375 -2.2876,3.287375 -0.664222,-0.0093 -1.186267,-0.3504922 -1.395333,-0.719888 z M 55.857698,2.8454016 c -1.138978,-0.056711 -2.6292,1.3359609 -2.6292,1.3359609 l -0.474756,-1.184112 h -1.300133 l -0.626578,3.543349 c -0.04729,0.2460573 -0.1708,0.4642239 -0.370222,0.615763 l -1.717956,1.3452578 c 0,0 -0.702177,0.5401484 -1.68,1.1652083 -0.445822,0.2181667 -0.806711,0.3126849 -1.176933,0.3126849 -0.787733,0 -1.281156,-0.3030781 -1.508889,-0.8243229 -0.03827,-0.094518 -0.06658,-0.1989531 -0.0952,-0.2934713 l 4.404089,-2.975 C 49.317831,5.441399 49.308498,4.8352427 49.222942,4.5318547 48.938276,3.5845031 48.083964,2.873912 46.669964,2.873912 c -2.638844,0 -4.451688,2.2455052 -4.451688,5.438362 0,0.2178567 0.0096,0.4261067 0.03795,0.6250599 l -1.252844,0.8813437 c -0.246711,0.1515391 -0.597956,0.2841744 -0.816356,0.2841744 -0.379555,0 -0.541022,-0.2937812 -0.417511,-0.9284478 L 41.40192,0.04115417 39.361342,0.02225052 38.544987,4.5699719 c -0.03796,0.1893463 -0.1232,0.3693958 -0.256045,0.5113281 l -2.249644,2.3685338 c 0.05693,-0.3882994 0.08555,-0.8051093 0.08555,-1.2408229 0,-1.9235234 -0.892266,-3.3443958 -2.391822,-3.3443958 -1.452267,0 -2.534311,1.2219193 -2.534311,1.2219193 L 30.629076,2.9972505 H 29.34792 L 28.645431,7.0048234 C 28.616809,7.184563 28.540898,7.3457088 28.417698,7.4783443 L 27.10792,9.0225552 C 26.747031,9.4111646 26.367476,9.8942922 26.177698,9.903899 25.835787,9.96061 25.683964,9.837581 25.797831,9.2026047 l 0.522045,-2.8990755 c 0.408177,-2.2926094 -0.294,-3.4485209 -2.268312,-3.4485209 -1.176933,0 -2.562622,1.3170573 -2.562622,1.3170573 -0.294311,-0.8624401 -1.015778,-1.3170573 -2.107155,-1.3170573 -1.195911,0 -2.487023,1.3926719 -2.487023,1.3926719 L 16.363387,3.0065474 H 15.062942 L 14.39872,6.7962635 C 14.370098,6.976313 14.294187,7.1374588 14.170987,7.2700943 L 12.680764,9.032162 c -0.360888,0.3886094 -0.740444,0.871737 -0.930222,0.8810338 -0.3416,0.057021 -0.493733,-0.066318 -0.379555,-0.7009843 L 12.50032,3.0065474 h -2.059556 l -0.332266,1.8286953 c -0.0476,0.2367604 -0.1518224,0.464224 -0.3132891,0.6439635 L 6.7864533,8.9469406 C 6.0080533,9.7805604 5.0305422,9.903899 4.83112,9.9131958 H 2.7049867 L 7.5362311,4.4562401 7.7829422,2.978037 H 1.5756533 L 1.2813422,4.6362896 H 4.8880533 L 0.22792,10.093245 -1.2444444e-4,11.637456 c 0,0 4.36613334444,0.01921 4.44204444444,0 1.2814667,0 2.4204444,-1.127401 2.8759111,-1.591625 L 9.6433867,7.3079016 9.2258756,9.6101177 c -0.266,1.4967973 0.3129777,2.2073883 1.5471554,2.1791873 0.759111,-0.01921 1.281156,-0.521245 1.8032,-1.04218 l 1.404667,-1.6390385 -0.465111,2.6431015 h 2.059866 l 0.9016,-5.182388 c 0.113867,-0.6442734 0.939556,-1.7335573 1.803511,-1.7335573 0.911245,0 1.347734,0.4450104 1.138978,1.6672396 l -0.920889,5.2394087 h 2.040889 l 0.987156,-5.5709973 c 0.05693,-0.3693958 0.721155,-1.4115755 1.642044,-1.4115755 0.958534,0 1.271822,0.5209349 1.063067,1.7431641 l -0.569645,3.0980286 c -0.265688,1.4971071 0.313289,2.2076981 1.547156,2.1791871 0.759422,-0.0189 1.281467,-0.520934 1.803511,-1.042179 l 1.214889,-1.4211825 -0.427156,2.4348515 -0.493733,2.813854 h 2.059867 l 0.664222,-3.827523 c 0.284667,0.360099 0.683511,0.65388 1.176933,0.805419 0.113867,0.03781 0.227734,0.06632 0.351245,0.08522 1.328755,0.06632 2.515333,-0.577955 3.568755,-1.676846 l 0.0096,-0.00961 2.989778,-3.0887317 -0.484089,2.7004323 c -0.265689,1.4967974 0.303644,2.1788774 1.547155,2.1884844 0.806711,0 1.556489,-0.397906 2.344222,-0.928448 l 1.044089,-0.748708 c 0.01898,0.03812 0.03796,0.08553 0.05693,0.123338 0.474755,0.918842 1.348044,1.525308 2.638844,1.534915 h 0.0093 c 1.357378,0 2.686134,-1.279251 3.454889,-1.8190892 0.199423,-0.1422422 0.939867,-0.7391016 1.736934,-1.383375 L 49.906371,11.73228 h 2.059556 L 52.86792,6.5498963 c 0.113867,-0.6442734 0.939556,-1.7338671 1.8032,-1.7338671 0.332267,0 0.597956,0.057021 0.797378,0.1896562 z' }),
                    Object(src["jsxToHTML"])(
                        'g',
                        { transform: 'translate(10.577778,-0.309896)' },
                        Object(src["jsxToHTML"])('path', { d: 'm 1.0778133,2.4638268 c 0.6835111,0 1.3287556,-0.5401484 1.4332889,-1.2033255 C 2.6153244,0.59732422 2.1502133,0.05748568 1.4670133,0.04787891 c -0.68351108,0 -1.32875552,0.54014843 -1.43328886,1.20332549 -0.11386666,0.672474 0.35124445,1.2126224 1.04408886,1.2126224' })
                    )
                )
            );
        }
    });
}
// CONCATENATED MODULE: ./src/funding/zimpler/config.jsx
var _logoColors, _secondaryColors, _labels;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* @jsx jsxToHTML */

 // eslint-disable-line no-unused-vars







var ZIMPLER_CONFIG = _extends({}, common["a" /* DEFAULT_FUNDING_CONFIG */], {

    url: config["a" /* getAltPayUrl */],

    defaultLabel: constants["c" /* BUTTON_LABEL */].ZIMPLER,

    layouts: [constants["d" /* BUTTON_LAYOUT */].VERTICAL],

    labels: (_labels = {}, _labels[constants["c" /* BUTTON_LABEL */].ZIMPLER] = _extends({}, common["b" /* DEFAULT_LABEL_CONFIG */], {

        Label: ZimplerLogo,

        defaultColor: constants["b" /* BUTTON_COLOR */].SILVER,

        colors: [constants["b" /* BUTTON_COLOR */].SILVER],

        logoColors: (_logoColors = {}, _logoColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["k" /* LOGO_COLOR */].BLACK, _logoColors),

        secondaryColors: (_secondaryColors = {}, _secondaryColors[constants["b" /* BUTTON_COLOR */].GOLD] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].BLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].SILVER] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors[constants["b" /* BUTTON_COLOR */].DARKBLUE] = constants["b" /* BUTTON_COLOR */].SILVER, _secondaryColors),

        allowPrimary: false
    }), _labels)
});
// CONCATENATED MODULE: ./src/funding/zimpler/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ZIMPLER_CONFIG", function() { return ZIMPLER_CONFIG; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ZimplerLogo", function() { return ZimplerLogo; });



/***/ })

/******/ });