(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define("checkoutComponents", [], factory); else if (typeof exports === "object") exports["checkoutComponents"] = factory(); else root["checkoutComponents"] = factory();
})(this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = "";
        return __webpack_require__(0);
    }([ /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _checkout = __webpack_require__(/*! ./checkout */ 1);
        Object.keys(_checkout).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _checkout[key];
                }
            });
        });
        var _button = __webpack_require__(/*! ./button */ 55);
        Object.keys(_button).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _button[key];
                }
            });
        });
    }, /*!*************************!*\
  !*** ./src/checkout.js ***!
  \*************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.PayPalCheckout = undefined;
        var _extends = Object.assign || function(target) {
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
        var _src = __webpack_require__(/*! xcomponent/src */ 2);
        var _src2 = _interopRequireDefault(_src);
        var _props = __webpack_require__(/*! ./props */ 54);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var PayPalCheckout = exports.PayPalCheckout = _src2["default"].create({
            tag: "paypal-checkout",
            defaultEnv: "production",
            envUrls: {
                local: "http://localhost.paypal.com:8000/webapps/hermes?ul=0",
                production: "https://wwww.paypal.com/checkoutnow?ul=0"
            },
            props: _extends({}, _props.props),
            dimensions: {
                width: 450,
                height: 535
            }
        });
    }, /*!***********************************!*\
  !*** ./~/xcomponent/src/index.js ***!
  \***********************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.create = create;
        var _error = __webpack_require__(/*! ./error */ 3);
        Object.keys(_error).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _error[key];
                }
            });
        });
        var _src = __webpack_require__(/*! post-robot/src */ 4);
        var _src2 = _interopRequireDefault(_src);
        var _component = __webpack_require__(/*! ./component */ 31);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function create(options) {
            return new _component.Component(options);
        }
        module.exports.postRobot = _src2["default"];
        exports["default"] = module.exports;
    }, /*!***********************************!*\
  !*** ./~/xcomponent/src/error.js ***!
  \***********************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.PopupOpenError = PopupOpenError;
        exports.IntegrationError = IntegrationError;
        function PopupOpenError(message) {
            this.message = message;
        }
        PopupOpenError.prototype = Object.create(Error.prototype);
        function IntegrationError(message) {
            this.message = message;
        }
        IntegrationError.prototype = Object.create(Error.prototype);
    }, /*!***********************************!*\
  !*** ./~/post-robot/src/index.js ***!
  \***********************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.Promise = undefined;
        var _interface = __webpack_require__(/*! ./interface */ 5);
        Object.keys(_interface).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _interface[key];
                }
            });
        });
        var _lib = __webpack_require__(/*! ./lib */ 16);
        Object.defineProperty(exports, "Promise", {
            enumerable: true,
            get: function get() {
                return _lib.Promise;
            }
        });
        var _conf = __webpack_require__(/*! ./conf */ 7);
        var _drivers = __webpack_require__(/*! ./drivers */ 14);
        var _compat = __webpack_require__(/*! ./compat */ 20);
        function init() {
            (0, _compat.registerGlobals)();
            _lib.util.debug("ID", (0, _conf.getWindowID)());
            _lib.util.listen(window, "message", _drivers.messageListener);
            _lib.childWindows.register((0, _conf.getWindowID)(), window, _lib.util.getType());
            (0, _lib.propagate)((0, _conf.getWindowID)());
        }
        init();
        exports["default"] = module.exports;
    }, /*!*********************************************!*\
  !*** ./~/post-robot/src/interface/index.js ***!
  \*********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.util = exports.openBridge = exports.reset = exports.parent = undefined;
        var _client = __webpack_require__(/*! ./client */ 6);
        Object.keys(_client).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _client[key];
                }
            });
        });
        var _server = __webpack_require__(/*! ./server */ 28);
        Object.keys(_server).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _server[key];
                }
            });
        });
        var _proxy = __webpack_require__(/*! ./proxy */ 29);
        Object.keys(_proxy).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _proxy[key];
                }
            });
        });
        var _config = __webpack_require__(/*! ./config */ 30);
        Object.keys(_config).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _config[key];
                }
            });
        });
        var _drivers = __webpack_require__(/*! ../drivers */ 14);
        Object.defineProperty(exports, "reset", {
            enumerable: true,
            get: function get() {
                return _drivers.resetListeners;
            }
        });
        var _bridge = __webpack_require__(/*! ../compat/bridge */ 21);
        Object.defineProperty(exports, "openBridge", {
            enumerable: true,
            get: function get() {
                return _bridge.openBridge;
            }
        });
        var _util = __webpack_require__(/*! ../lib/util */ 11);
        Object.defineProperty(exports, "util", {
            enumerable: true,
            get: function get() {
                return _util.util;
            }
        });
        var parent = exports.parent = _util.util.getParent();
    }, /*!**********************************************!*\
  !*** ./~/post-robot/src/interface/client.js ***!
  \**********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.request = request;
        exports.send = send;
        exports.sendToParent = sendToParent;
        var _conf = __webpack_require__(/*! ../conf */ 7);
        var _drivers = __webpack_require__(/*! ../drivers */ 14);
        var _lib = __webpack_require__(/*! ../lib */ 16);
        function request(options) {
            return _lib.promise.nodeify(new _lib.promise.Promise(function(resolve, reject) {
                if (!options.name) {
                    throw new Error("Expected options.name");
                }
                if (!options.window) {
                    throw new Error("Expected options.window");
                }
                if (_conf.CONFIG.MOCK_MODE) {
                    options.window = window;
                } else if (typeof options.window === "string") {
                    var el = document.getElementById(options.window);
                    if (!el) {
                        throw new Error("Expected options.window " + options.window + " to be a valid element id");
                    }
                    if (el.tagName.toLowerCase() !== "iframe") {
                        throw new Error("Expected options.window " + options.window + " to be an iframe");
                    }
                    options.window = el.contentWindow;
                    if (!options.window) {
                        throw new Error("Expected options.window");
                    }
                }
                var hash = options.name + "_" + _lib.util.uniqueID();
                _drivers.listeners.response[hash] = options;
                if (options.window.closed) {
                    throw new Error("Target window is closed");
                }
                if (options.timeout) {
                    setTimeout(function() {
                        return reject(new Error("Post message response timed out after " + options.timeout + " ms"));
                    }, options.timeout);
                }
                options.respond = function(err, result) {
                    return err ? reject(err) : resolve(result);
                };
                (0, _drivers.sendMessage)(options.window, {
                    hash: hash,
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                    name: options.name,
                    data: options.data
                }, options.domain || "*")["catch"](reject);
                setTimeout(function() {
                    if (!options.ack) {
                        return reject(new Error("No ack for postMessage " + options.name + " in " + _conf.CONFIG.ACK_TIMEOUT + "ms"));
                    }
                }, _conf.CONFIG.ACK_TIMEOUT);
            }), options.callback);
        }
        function send(window, name, data, options, callback) {
            if (!callback) {
                if (!options && data instanceof Function) {
                    callback = data;
                    options = {};
                    data = {};
                } else if (options instanceof Function) {
                    callback = options;
                    options = {};
                }
            }
            options = options || {};
            options.window = window;
            options.name = name;
            options.data = data;
            options.callback = callback;
            return request(options);
        }
        function sendToParent(name, data, options, callback) {
            var window = _lib.util.getParent();
            if (!window) {
                throw new Error("Window does not have a parent");
            }
            return send(_lib.util.getParent(), name, data, options, callback);
        }
    }, /*!****************************************!*\
  !*** ./~/post-robot/src/conf/index.js ***!
  \****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _config = __webpack_require__(/*! ./config */ 8);
        Object.keys(_config).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _config[key];
                }
            });
        });
        var _constants = __webpack_require__(/*! ./constants */ 9);
        Object.keys(_constants).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _constants[key];
                }
            });
        });
        var _id = __webpack_require__(/*! ./id */ 10);
        Object.keys(_id).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _id[key];
                }
            });
        });
    }, /*!*****************************************!*\
  !*** ./~/post-robot/src/conf/config.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.CONFIG = undefined;
        var _ALLOWED_POST_MESSAGE;
        var _constants = __webpack_require__(/*! ./constants */ 9);
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        var CONFIG = exports.CONFIG = {
            ALLOW_POSTMESSAGE_POPUP: true,
            DEBUG: false,
            ACK_TIMEOUT: 1e3,
            LOG_TO_PAGE: false,
            MOCK_MODE: false,
            ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, true), 
            _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_GLOBAL_METHOD, true), 
            _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_UP_THROUGH_BRIDGE, true), 
            _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_DOWN_THROUGH_BRIDGE, true), 
            _ALLOWED_POST_MESSAGE)
        };
    }, /*!********************************************!*\
  !*** ./~/post-robot/src/conf/constants.js ***!
  \********************************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var CONSTANTS = exports.CONSTANTS = {
            POST_MESSAGE_TYPE: {
                REQUEST: "postrobot_message_request",
                RESPONSE: "postrobot_message_response",
                ACK: "postrobot_message_ack"
            },
            POST_MESSAGE_ACK: {
                SUCCESS: "success",
                ERROR: "error"
            },
            POST_MESSAGE_NAMES: {
                IDENTIFY: "postrobot_identify",
                METHOD: "postrobot_method"
            },
            WINDOW_TYPES: {
                FULLPAGE: "fullpage",
                POPUP: "popup",
                IFRAME: "iframe"
            },
            WINDOW_PROPS: {
                POSTROBOT: "__postRobot__"
            },
            SERIALIZATION_TYPES: {
                METHOD: "postrobot_method"
            },
            SEND_STRATEGIES: {
                POST_MESSAGE: "postrobot_post_message",
                POST_MESSAGE_GLOBAL_METHOD: "postrobot_post_message_global_method",
                POST_MESSAGE_UP_THROUGH_BRIDGE: "postrobot_post_message_up_through_bridge",
                POST_MESSAGE_DOWN_THROUGH_BRIDGE: "postrobot_post_message_down_through_bridge"
            }
        };
    }, /*!*************************************!*\
  !*** ./~/post-robot/src/conf/id.js ***!
  \*************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.getWindowID = undefined;
        var _util = __webpack_require__(/*! ../lib/util */ 11);
        var getWindowID = exports.getWindowID = _util.util.memoize(function() {
            return window.name || _util.util.uniqueID();
        });
    }, /*!**************************************!*\
  !*** ./~/post-robot/src/lib/util.js ***!
  \**************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.util = undefined;
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
        };
        var _conf = __webpack_require__(/*! ../conf */ 7);
        var _promise = __webpack_require__(/*! ./promise */ 12);
        var util = exports.util = {
            isPopup: function isPopup() {
                return Boolean(window.opener);
            },
            isIframe: function isIframe() {
                return Boolean(window.parent && window !== window.parent);
            },
            isFullpage: function isFullpage() {
                return Boolean(!util.isIframe() && !util.isPopup());
            },
            windowReady: new _promise.promise.Promise(function(resolve, reject) {
                if (document.readyState === "complete") {
                    return resolve();
                }
                window.addEventListener("load", resolve);
            }),
            getType: function getType() {
                if (util.isPopup()) {
                    return _conf.CONSTANTS.WINDOW_TYPES.POPUP;
                }
                if (util.isIframe()) {
                    return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
                }
                return _conf.CONSTANTS.WINDOW_TYPES.FULLPAGE;
            },
            once: function once(method) {
                if (!method) {
                    return method;
                }
                var called = false;
                return function onceWrapper() {
                    if (!called) {
                        called = true;
                        return method.apply(this, arguments);
                    }
                };
            },
            getParent: function getParent() {
                if (util.isPopup()) {
                    return window.opener;
                }
                if (util.isIframe()) {
                    return window.parent;
                }
            },
            eachParent: function eachParent(method, includeSelf) {
                var win = window;
                if (includeSelf) {
                    method(window);
                }
                while (true) {
                    var parent = win.opener || win.parent;
                    if (win === parent) {
                        return;
                    }
                    win = parent;
                    method(win);
                }
            },
            eachFrame: function eachFrame(win, method) {
                for (var i = 0; i < win.frames.length; i++) {
                    var frame = void 0;
                    try {
                        frame = win.frames[i];
                    } catch (err) {
                        continue;
                    }
                    if (frame !== window) {
                        method(frame);
                    }
                }
            },
            noop: function noop() {},
            getDomain: function getDomain() {
                return window.location.host;
            },
            clearLogs: function clearLogs() {
                if (window.console && window.console.clear) {
                    window.console.clear();
                }
                if (_conf.CONFIG.LOG_TO_PAGE) {
                    var container = document.getElementById("postRobotLogs");
                    if (container) {
                        container.parentNode.removeChild(container);
                    }
                }
            },
            writeToPage: function writeToPage(level, args) {
                setTimeout(function() {
                    var container = document.getElementById("postRobotLogs");
                    if (!container) {
                        container = document.createElement("div");
                        container.id = "postRobotLogs";
                        container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;";
                        document.body.appendChild(container);
                    }
                    var el = document.createElement("div");
                    var date = new Date().toString().split(" ")[4];
                    var payload = util.map(args, function(item) {
                        if (typeof item === "string") {
                            return item;
                        }
                        if (!item) {
                            return toString.call(item);
                        }
                        var json = void 0;
                        try {
                            json = JSON.stringify(item, 0, 2);
                        } catch (e) {
                            json = "[object]";
                        }
                        return "\n\n" + json + "\n\n";
                    }).join(" ");
                    var msg = date + " " + level + " " + payload;
                    el.innerHTML = msg;
                    var color = {
                        log: "#ddd",
                        warn: "orange",
                        error: "red",
                        info: "blue",
                        debug: "#aaa"
                    }[level];
                    el.style.cssText = "margin-top: 10px; color: " + color + ";";
                    if (!container.childNodes.length) {
                        container.appendChild(el);
                    } else {
                        container.insertBefore(el, container.childNodes[0]);
                    }
                });
            },
            logLevel: function logLevel(level, args) {
                args = Array.prototype.slice.call(args);
                args.unshift(util.getDomain());
                args.unshift(util.getType().toLowerCase());
                args.unshift("[post-robot]");
                if (_conf.CONFIG.LOG_TO_PAGE) {
                    util.writeToPage(level, args);
                }
                if (!window.console) {
                    return;
                }
                if (!window.console[level]) {
                    level = "log";
                }
                if (!window.console[level]) {
                    return;
                }
                window.console[level].apply(window.console, args);
            },
            log: function log() {
                util.logLevel("info", arguments);
            },
            debug: function debug() {
                if (_conf.CONFIG.DEBUG) {
                    util.logLevel("debug", arguments);
                }
            },
            debugError: function debugError() {
                if (_conf.CONFIG.DEBUG) {
                    util.logLevel("error", arguments);
                }
            },
            safeHasProp: function safeHasProp(obj, name) {
                try {
                    if (obj[name]) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (err) {
                    return false;
                }
            },
            warn: function warn() {
                util.logLevel("warn", arguments);
            },
            error: function error() {
                util.logLevel("error", arguments);
            },
            listen: function listen(win, event, handler) {
                if (win.addEventListener) {
                    win.addEventListener(event, handler);
                } else {
                    win.attachEvent("on" + event, handler);
                }
                return {
                    cancel: function cancel() {
                        if (win.removeEventListener) {
                            win.removeEventListener(event, handler);
                        } else {
                            win.detachEvent("on" + event, handler);
                        }
                    }
                };
            },
            apply: function apply(method, context, args) {
                if (method.apply instanceof Function) {
                    return method.apply(context, args);
                }
                return method(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
            },
            find: function find(collection, method, def) {
                if (!collection) {
                    return def;
                }
                for (var i = 0; i < collection.length; i++) {
                    if (method(collection[i])) {
                        return collection[i];
                    }
                }
                return def;
            },
            map: function map(collection, method) {
                var results = [];
                for (var i = 0; i < collection.length; i++) {
                    results.push(method(collection[i]));
                }
                return results;
            },
            some: function some(collection, method) {
                method = method || Boolean;
                for (var i = 0; i < collection.length; i++) {
                    if (method(collection[i])) {
                        return true;
                    }
                }
                return false;
            },
            keys: function keys(mapping) {
                var result = [];
                for (var key in mapping) {
                    if (mapping.hasOwnProperty(key)) {
                        result.push(key);
                    }
                }
                return result;
            },
            values: function values(mapping) {
                var result = [];
                for (var key in mapping) {
                    if (mapping.hasOwnProperty(key)) {
                        result.push(mapping[key]);
                    }
                }
                return result;
            },
            getByValue: function getByValue(mapping, value) {
                for (var key in mapping) {
                    if (mapping.hasOwnProperty(key) && mapping[key] === value) {
                        return key;
                    }
                }
            },
            uniqueID: function uniqueID() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            },
            isFrameOwnedBy: function isFrameOwnedBy(win, frame) {
                try {
                    if (frame.parent === win) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (err) {
                    try {
                        for (var i = 0; i < win.frames.length; i++) {
                            if (win.frames[i] === frame) {
                                return true;
                            }
                        }
                    } catch (err2) {
                        return false;
                    }
                }
                return false;
            },
            memoize: function memoize(method) {
                var results = {};
                return function memoized() {
                    var args = JSON.stringify(Array.prototype.slice.call(arguments));
                    if (!results.hasOwnProperty(args)) {
                        results[args] = method.apply(this, arguments);
                    }
                    return results[args];
                };
            },
            extend: function extend(obj, source) {
                if (!source) {
                    return obj;
                }
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        obj[key] = source[key];
                    }
                }
                return obj;
            },
            each: function each(obj, callback) {
                if (obj instanceof Array) {
                    for (var i = 0; i < obj.length; i++) {
                        callback(obj[i], i);
                    }
                } else if (obj instanceof Object && !(obj instanceof Function)) {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            callback(obj[key], key);
                        }
                    }
                }
            },
            replaceObject: function replaceObject(obj, callback) {
                var newobj = obj instanceof Array ? [] : {};
                util.each(obj, function(item, key) {
                    var result = callback(item);
                    if (result !== undefined) {
                        newobj[key] = result;
                    } else if ((typeof item === "undefined" ? "undefined" : _typeof(item)) === "object" && item !== null) {
                        newobj[key] = util.replaceObject(item, callback);
                    } else {
                        newobj[key] = item;
                    }
                });
                return newobj;
            }
        };
    }, /*!*****************************************!*\
  !*** ./~/post-robot/src/lib/promise.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.promise = exports.Promise = undefined;
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);
        var Promise = exports.Promise = _promise.SyncPromise;
        var promise = exports.promise = {
            Promise: Promise,
            run: function run(method) {
                return Promise.resolve().then(method);
            },
            method: function method(_method) {
                return function promiseWrapper() {
                    var _this = this, _arguments = arguments;
                    return Promise.resolve().then(function() {
                        return _method.apply(_this, _arguments);
                    });
                };
            },
            nodeify: function nodeify(prom, callback) {
                if (!callback) {
                    return prom;
                }
                prom.then(function(result) {
                    callback(null, result);
                }, function(err) {
                    callback(err);
                });
            },
            deNodeify: function deNodeify(method) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }
                return new Promise(function(resolve, reject) {
                    try {
                        if (args.length < method.length) {
                            return method.apply(undefined, args.concat([ function(err, result) {
                                return err ? reject(err) : resolve(result);
                            } ]));
                        }
                        return promise.run(function() {
                            return method.apply(undefined, args);
                        }).then(resolve, reject);
                    } catch (err) {
                        return reject(err);
                    }
                });
            },
            map: function map(items, method) {
                var results = [];
                var _loop = function _loop(i) {
                    results.push(promise.run(function() {
                        return method(items[i]);
                    }));
                };
                for (var i = 0; i < items.length; i++) {
                    _loop(i);
                }
                return Promise.all(results);
            }
        };
    }, /*!*********************************************!*\
  !*** ./~/sync-browser-mocks/src/promise.js ***!
  \*********************************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.patchPromise = patchPromise;
        function trycatch(method, successHandler, errorHandler) {
            var isCalled = false;
            var isSuccess = false;
            var isError = false;
            var err, res;
            function flush() {
                if (isCalled) {
                    if (isError) {
                        return errorHandler(err);
                    } else if (isSuccess) {
                        return successHandler(res);
                    }
                }
            }
            try {
                method(function(result) {
                    res = result;
                    isSuccess = true;
                    flush();
                }, function(error) {
                    err = error;
                    isError = true;
                    flush();
                });
            } catch (error) {
                return errorHandler(error);
            }
            isCalled = true;
            flush();
        }
        var SyncPromise = exports.SyncPromise = function SyncPromise(handler) {
            this.resolved = false;
            this.rejected = false;
            this.handlers = [];
            if (!handler) {
                return;
            }
            var self = this;
            trycatch(handler, function(res) {
                return self.resolve(res);
            }, function(err) {
                return self.reject(err);
            });
        };
        SyncPromise.resolve = function SyncPromiseResolve(value) {
            if (value && value.then) {
                return value;
            }
            return new SyncPromise().resolve(value);
        };
        SyncPromise.reject = function SyncPromiseResolve(error) {
            return new SyncPromise().reject(error);
        };
        SyncPromise.prototype.resolve = function(result) {
            if (this.resolved || this.rejected) {
                return this;
            }
            if (result && result.then) {
                throw new Error("Can not resolve promise with another promise");
            }
            this.resolved = true;
            this.value = result;
            this.dispatch();
            return this;
        };
        SyncPromise.prototype.reject = function(error) {
            if (this.resolved || this.rejected) {
                return this;
            }
            if (error && error.then) {
                throw new Error("Can not reject promise with another promise");
            }
            this.rejected = true;
            this.value = error;
            this.dispatch();
            return this;
        };
        SyncPromise.prototype.dispatch = function() {
            if (!this.resolved && !this.rejected) {
                return;
            }
            while (this.handlers.length) {
                var handler = this.handlers.shift();
                var result, error;
                try {
                    if (this.resolved) {
                        result = handler.onSuccess ? handler.onSuccess(this.value) : this.value;
                    } else {
                        if (handler.onError) {
                            result = handler.onError(this.value);
                        } else {
                            error = this.value;
                        }
                    }
                } catch (err) {
                    error = err;
                }
                if (result === this) {
                    throw new Error("Can not return a promise from the the same promise");
                }
                if (error) {
                    handler.promise.reject(error);
                } else if (result && result.then) {
                    result.then(function(res) {
                        handler.promise.resolve(res);
                    }, function(err) {
                        handler.promise.reject(err);
                    });
                } else {
                    handler.promise.resolve(result);
                }
            }
        };
        SyncPromise.prototype.then = function(onSuccess, onError) {
            var promise = new SyncPromise();
            this.handlers.push({
                promise: promise,
                onSuccess: onSuccess,
                onError: onError
            });
            this.dispatch();
            return promise;
        };
        SyncPromise.prototype["catch"] = function(onError) {
            return this.then(null, onError);
        };
        SyncPromise.prototype.done = function(successHandler, errorHandler) {
            this.then(successHandler, errorHandler || function(err) {
                console.error(err.stack || err.toString());
            });
        };
        SyncPromise.all = function(promises) {
            var promise = new SyncPromise();
            var count = promises.length;
            var results = [];
            for (var i = 0; i < promises.length; i++) {
                promises[i].then(function(result) {
                    results[i] = result;
                    count -= 1;
                    if (count === 0) {
                        promise.resolve(results);
                    }
                }, function(err) {
                    promise.reject(err);
                });
            }
            return promise;
        };
        function patchPromise() {
            window.Promise = SyncPromise;
        }
    }, /*!*******************************************!*\
  !*** ./~/post-robot/src/drivers/index.js ***!
  \*******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _receive = __webpack_require__(/*! ./receive */ 15);
        Object.keys(_receive).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _receive[key];
                }
            });
        });
        var _send = __webpack_require__(/*! ./send */ 24);
        Object.keys(_send).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _send[key];
                }
            });
        });
        var _listeners = __webpack_require__(/*! ./listeners */ 26);
        Object.keys(_listeners).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _listeners[key];
                }
            });
        });
    }, /*!***************************************************!*\
  !*** ./~/post-robot/src/drivers/receive/index.js ***!
  \***************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.receiveMessage = receiveMessage;
        exports.messageListener = messageListener;
        var _conf = __webpack_require__(/*! ../../conf */ 7);
        var _lib = __webpack_require__(/*! ../../lib */ 16);
        var _compat = __webpack_require__(/*! ../../compat */ 20);
        var _send = __webpack_require__(/*! ../send */ 24);
        var _listeners = __webpack_require__(/*! ../listeners */ 26);
        var _types = __webpack_require__(/*! ./types */ 27);
        var receivedMessages = [];
        function parseMessage(message) {
            try {
                message = JSON.parse(message);
            } catch (err) {
                return;
            }
            if (!message.type) {
                return;
            }
            if (!_types.RECEIVE_MESSAGE_TYPES[message.type]) {
                return;
            }
            return message;
        }
        function getProxy(source, message) {
            if (_conf.CONFIG.MOCK_MODE) {
                return;
            }
            if (!message) {
                return;
            }
            var listener = (0, _listeners.getRequestListener)(message.name, source);
            if (message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST && message.name && listener && listener.proxy === false) {
                return;
            }
            var isResponseOrAck = (message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK) && _listeners.listeners.response[message.hash];
            if (!isResponseOrAck) {
                for (var i = 0; i < _listeners.listeners.proxies.length; i++) {
                    var proxy = _listeners.listeners.proxies[i];
                    if (source === proxy.from) {
                        return proxy.to;
                    }
                }
            }
            if (message.target === "parent.opener") {
                var win = void 0;
                try {
                    win = window.parent.opener;
                } catch (err) {
                    throw new Error("Can not get window.parent.opener to proxy to");
                }
                if (!win) {
                    throw new Error("Can not get window.parent.opener to proxy to");
                }
                return win;
            }
            if (message.target && message.target !== (0, _conf.getWindowID)()) {
                var _win = _lib.childWindows.getWindowById(message.target);
                if (!_win) {
                    throw new Error("Unable to find window to proxy message to: " + message.target);
                }
                return _win;
            }
        }
        function receiveMessage(event) {
            var source = event.source;
            var origin = event.origin;
            var data = event.data;
            var message = parseMessage(data);
            if (!message) {
                return;
            }
            if (receivedMessages.indexOf(message.id) === -1) {
                receivedMessages.push(message.id);
            } else {
                return;
            }
            _lib.childWindows.register(message.source, source, message.windowType);
            var proxyWindow = getProxy(source, message);
            if (proxyWindow) {
                delete message.target;
                return (0, _send.sendMessage)(proxyWindow, message, "*", true);
            }
            _lib.util.debug("#receive", message.type, message.name, message);
            if (_conf.CONFIG.MOCK_MODE) {
                return _types.RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
            }
            if (message.data) {
                message.data = (0, _lib.deserializeMethods)(source, message.data);
            }
            _types.RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
        }
        function messageListener(event) {
            event = {
                source: event.source || event.sourceElement,
                origin: event.origin || event.originalEvent.origin,
                data: event.data
            };
            try {
                (0, _compat.emulateIERestrictions)(event.source, window);
            } catch (err) {
                console.error(err.stack || err.toString());
                return;
            }
            receiveMessage(event);
        }
    }, /*!***************************************!*\
  !*** ./~/post-robot/src/lib/index.js ***!
  \***************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _promise = __webpack_require__(/*! ./promise */ 12);
        Object.keys(_promise).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _promise[key];
                }
            });
        });
        var _util = __webpack_require__(/*! ./util */ 11);
        Object.keys(_util).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _util[key];
                }
            });
        });
        var _windows = __webpack_require__(/*! ./windows */ 17);
        Object.keys(_windows).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _windows[key];
                }
            });
        });
        var _methods = __webpack_require__(/*! ./methods */ 18);
        Object.keys(_methods).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _methods[key];
                }
            });
        });
        var _tick = __webpack_require__(/*! ./tick */ 19);
        Object.keys(_tick).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _tick[key];
                }
            });
        });
    }, /*!*****************************************!*\
  !*** ./~/post-robot/src/lib/windows.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.childWindows = undefined;
        exports.isSameDomain = isSameDomain;
        exports.propagate = propagate;
        var _conf = __webpack_require__(/*! ../conf */ 7);
        var _util = __webpack_require__(/*! ./util */ 11);
        var _interface = __webpack_require__(/*! ../interface */ 5);
        var domainMatches = [];
        function isSameDomain(win) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = domainMatches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _match = _step.value;
                    if (_match.win === win) {
                        return _match.match;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            var windowDomain = window.location.protocol + "//" + window.location.host;
            var match = false;
            try {
                if (win.location.protocol && win.location.host) {
                    var otherDomain = win.location.protocol + "//" + win.location.host;
                    if (otherDomain === windowDomain) {
                        match = true;
                    }
                }
            } catch (err) {}
            domainMatches.push({
                win: win,
                match: match
            });
            return match;
        }
        var windows = [];
        function getMap(key, value) {
            return _util.util.find(windows, function(map) {
                return map[key] === value;
            }, {});
        }
        var childWindows = exports.childWindows = {
            getWindowId: function getWindowId(win) {
                return getMap("win", win).id;
            },
            getWindowById: function getWindowById(id) {
                return getMap("id", id).win;
            },
            getWindowType: function getWindowType(win) {
                var map = getMap("win", win);
                if (map && map.type) {
                    return map.type;
                }
                if (_util.util.safeHasProp(win, "parent") && win.parent !== win) {
                    return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
                }
                if (_util.util.safeHasProp(win, "opener")) {
                    return _conf.CONSTANTS.WINDOW_TYPES.POPUP;
                }
                var isFrame = _util.util.some(windows, function(childWin) {
                    return _util.util.isFrameOwnedBy(childWin.win, win);
                });
                if (isFrame) {
                    return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
                }
                return;
            },
            register: function register(id, win, type) {
                var existing = _util.util.find(windows, function(map) {
                    return map.id === id && map.win === win;
                });
                if (existing) {
                    return;
                }
                _util.util.debug("Registering window:", type, id, win);
                windows.push({
                    id: id,
                    win: win,
                    type: type
                });
            },
            isEqual: function isEqual(win1, win2) {
                if (win1 === win2) {
                    return true;
                }
                var id1 = this.getWindowId(win1);
                var id2 = this.getWindowId(win2);
                if (id1 && id2 && id1 === id2) {
                    return true;
                }
                return false;
            }
        };
        var openWindow = window.open;
        window.open = function(url, name, x, y) {
            if (!name) {
                name = _util.util.uniqueID();
                arguments[1] = name;
            }
            var win = _util.util.apply(openWindow, this, arguments);
            childWindows.register(name, win, _conf.CONSTANTS.WINDOW_TYPES.POPUP);
            return win;
        };
        function propagate(id) {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, function(source, data, callback) {
                return {
                    id: id
                };
            });
            var registered = [];
            function register(win, identifier) {
                if (!win || win === window || registered.indexOf(win) !== -1) {
                    return;
                }
                _util.util.debug("propagating to", identifier, win);
                registered.push(win);
                if (isSameDomain(win) && _util.util.safeHasProp(win, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
                    win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].registerSelf(id, window, _util.util.getType());
                } else {
                    _util.util.windowReady.then(function() {
                        (0, _interface.send)(win, _conf.CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, {
                            id: id,
                            type: _util.util.getType()
                        }).then(function(data) {
                            childWindows.register(data.id, win, data.type);
                        }, function(err) {
                            _util.util.debugError("Error sending identify:", err.stack || err.toString());
                        });
                    });
                }
            }
            _util.util.eachParent(function(parent) {
                register(parent, "parent");
                _util.util.eachFrame(parent, function(frame) {
                    register(frame, "frame");
                });
            }, true);
        }
    }, /*!*****************************************!*\
  !*** ./~/post-robot/src/lib/methods.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.listenForMethods = undefined;
        exports.serializeMethod = serializeMethod;
        exports.serializeMethods = serializeMethods;
        exports.deserializeMethod = deserializeMethod;
        exports.deserializeMethods = deserializeMethods;
        var _conf = __webpack_require__(/*! ../conf */ 7);
        var _util = __webpack_require__(/*! ./util */ 11);
        var _interface = __webpack_require__(/*! ../interface */ 5);
        var methods = {};
        var listenForMethods = exports.listenForMethods = _util.util.once(function() {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, function(source, data) {
                if (!methods[data.id]) {
                    throw new Error("Could not find method with id: " + data.id);
                }
                if (methods[data.id].win !== source) {
                    throw new Error("Method window does not match");
                }
                return methods[data.id].method.apply(null, data.args);
            });
        });
        function isSerializedMethod(item) {
            return item instanceof Object && item.__type__ === _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD && item.__id__;
        }
        function serializeMethod(destination, method) {
            var id = _util.util.uniqueID();
            methods[id] = {
                win: destination,
                method: method
            };
            return {
                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
                __id__: id
            };
        }
        function serializeMethods(destination, obj) {
            listenForMethods();
            return _util.util.replaceObject({
                obj: obj
            }, function(item) {
                if (item instanceof Function) {
                    return serializeMethod(destination, item);
                } else if (isSerializedMethod(item)) {
                    throw new Error("Attempting to serialize already serialized method");
                }
            }).obj;
        }
        function deserializeMethod(source, obj) {
            return function() {
                var args = Array.prototype.slice.call(arguments);
                return (0, _interface.send)(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                    id: obj.__id__,
                    args: args
                });
            };
        }
        function deserializeMethods(source, obj) {
            return _util.util.replaceObject({
                obj: obj
            }, function(item) {
                if (isSerializedMethod(item)) {
                    return deserializeMethod(source, item);
                }
            }).obj;
        }
    }, /*!**************************************!*\
  !*** ./~/post-robot/src/lib/tick.js ***!
  \**************************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.nextTick = nextTick;
        var queue = [];
        window.addEventListener("message", function(event) {
            if (event.data === "__nextTick") {
                queue.shift().call();
            }
        });
        function nextTick(method) {
            queue.push(method);
            window.postMessage("__nextTick", "*");
        }
    }, /*!******************************************!*\
  !*** ./~/post-robot/src/compat/index.js ***!
  \******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _bridge = __webpack_require__(/*! ./bridge */ 21);
        Object.keys(_bridge).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _bridge[key];
                }
            });
        });
        var _global = __webpack_require__(/*! ./global */ 22);
        Object.keys(_global).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _global[key];
                }
            });
        });
        var _ie = __webpack_require__(/*! ./ie */ 23);
        Object.keys(_ie).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _ie[key];
                }
            });
        });
    }, /*!*******************************************!*\
  !*** ./~/post-robot/src/compat/bridge.js ***!
  \*******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.openBridge = undefined;
        exports.getBridge = getBridge;
        exports.getBridgeFor = getBridgeFor;
        var _conf = __webpack_require__(/*! ../conf */ 7);
        var _lib = __webpack_require__(/*! ../lib */ 16);
        var bridge = void 0;
        var openBridge = exports.openBridge = _lib.util.memoize(function(url) {
            if (bridge) {
                throw new Error("Only one bridge supported");
            }
            var documentReady = new _lib.promise.Promise(function(resolve) {
                if (window.document.body) {
                    return resolve(window.document);
                }
                window.document.addEventListener("DOMContentLoaded", function(event) {
                    return resolve(window.document);
                });
            });
            bridge = documentReady.then(function(document) {
                _lib.util.debug("Opening bridge:", url);
                var iframe = document.createElement("iframe");
                iframe.setAttribute("id", "postRobotBridge");
                iframe.setAttribute("style", "margin: 0; padding: 0; border: 0px none; overflow: hidden;");
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("border", "0");
                iframe.setAttribute("scrolling", "no");
                iframe.setAttribute("allowTransparency", "true");
                iframe.setAttribute("tabindex", "-1");
                iframe.setAttribute("hidden", "true");
                iframe.setAttribute("title", "");
                iframe.setAttribute("role", "presentation");
                iframe.src = url;
                document.body.appendChild(iframe);
                return new _lib.promise.Promise(function(resolve, reject) {
                    iframe.onload = function() {
                        return resolve(iframe);
                    };
                    iframe.onerror = reject;
                });
            });
            return bridge;
        });
        function getBridge() {
            return bridge;
        }
        function getBridgeFor(win) {
            try {
                if (!win || !win.frames || !win.frames.length) {
                    return;
                }
                for (var i = 0; i < win.frames.length; i++) {
                    try {
                        var frame = win.frames[i];
                        if (frame && frame !== window && (0, _lib.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                            return frame;
                        }
                    } catch (err) {
                        continue;
                    }
                }
            } catch (err) {
                return;
            }
        }
    }, /*!*******************************************!*\
  !*** ./~/post-robot/src/compat/global.js ***!
  \*******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.registerGlobals = registerGlobals;
        var _conf = __webpack_require__(/*! ../conf */ 7);
        var _lib = __webpack_require__(/*! ../lib */ 16);
        var _drivers = __webpack_require__(/*! ../drivers */ 14);
        function registerGlobals() {
            if (window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                throw new Error("Attempting to load postRobot twice on the same window");
            }
            window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = {
                registerSelf: function registerSelf(id, win, type) {
                    _lib.childWindows.register(id, win, type);
                },
                postMessage: _lib.promise.method(function(event) {
                    (0, _drivers.receiveMessage)(event);
                }),
                postMessageParent: _lib.promise.method(function(source, message, domain) {
                    if (window.parent && window.parent !== window) {
                        window.parent.postMessage(message, domain);
                    } else {
                        throw new Error("Can not find parent to post message to");
                    }
                })
            };
        }
    }, /*!***************************************!*\
  !*** ./~/post-robot/src/compat/ie.js ***!
  \***************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.emulateIERestrictions = emulateIERestrictions;
        var _conf = __webpack_require__(/*! ../conf */ 7);
        var _lib = __webpack_require__(/*! ../lib */ 16);
        function emulateIERestrictions(sourceWindow, targetWindow) {
            if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) {
                var isIframeMessagingParent = _lib.childWindows.getWindowType(sourceWindow) === _conf.CONSTANTS.WINDOW_TYPES.IFRAME && _lib.util.isFrameOwnedBy(targetWindow, sourceWindow);
                var isParentMessagingIframe = _lib.childWindows.getWindowType(targetWindow) === _conf.CONSTANTS.WINDOW_TYPES.IFRAME && _lib.util.isFrameOwnedBy(sourceWindow, targetWindow);
                if (!isIframeMessagingParent && !isParentMessagingIframe) {
                    if (sourceWindow === window) {
                        throw new Error("Can not send post messages to another window (disabled by config to emulate IE)");
                    } else {
                        throw new Error("Can not receive post messages sent from another window (disabled by config to emulate IE)");
                    }
                }
            }
        }
    }, /*!************************************************!*\
  !*** ./~/post-robot/src/drivers/send/index.js ***!
  \************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.sendMessage = undefined;
        var _conf = __webpack_require__(/*! ../../conf */ 7);
        var _lib = __webpack_require__(/*! ../../lib */ 16);
        var _strategies = __webpack_require__(/*! ./strategies */ 25);
        var sendMessage = exports.sendMessage = _lib.promise.method(function(win, message, domain, isProxy) {
            message.id = message.id || _lib.util.uniqueID();
            message.source = (0, _conf.getWindowID)();
            message.originalSource = message.originalSource || (0, _conf.getWindowID)();
            message.windowType = _lib.util.getType();
            message.originalWindowType = message.originalWindowType || _lib.util.getType();
            message.data = (0, _lib.serializeMethods)(win, message.data);
            if (!message.target) {
                message.target = _lib.childWindows.getWindowId(win);
            }
            _lib.util.debug(isProxy ? "#proxy" : "#send", message.type, message.name, message);
            if (_conf.CONFIG.MOCK_MODE) {
                delete message.target;
                return window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
                    origin: window.location.protocol + "//" + window.location.host,
                    source: window,
                    data: JSON.stringify(message)
                });
            }
            if (win === window) {
                throw new Error("Attemping to send message to self");
            }
            if (win.closed) {
                throw new Error("Window is closed");
            }
            _lib.util.debug("Running send message strategies", message);
            return _lib.util.windowReady.then(function() {
                return _lib.promise.map(_lib.util.keys(_strategies.SEND_MESSAGE_STRATEGIES), function(strategyName) {
                    return _lib.promise.run(function() {
                        if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
                            throw new Error("Strategy disallowed: " + strategyName);
                        }
                        return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, message, domain);
                    }).then(function() {
                        _lib.util.debug(strategyName, "success");
                        return true;
                    }, function(err) {
                        _lib.util.debugError(strategyName, "error\n\n", err.stack || err.toString());
                        return false;
                    });
                }).then(function(results) {
                    if (!_lib.util.some(results)) {
                        throw new Error("No post-message strategy succeeded");
                    }
                });
            });
        });
    }, /*!*****************************************************!*\
  !*** ./~/post-robot/src/drivers/send/strategies.js ***!
  \*****************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.SEND_MESSAGE_STRATEGIES = undefined;
        var _SEND_MESSAGE_STRATEG;
        var _conf = __webpack_require__(/*! ../../conf */ 7);
        var _lib = __webpack_require__(/*! ../../lib */ 16);
        var _compat = __webpack_require__(/*! ../../compat */ 20);
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        var SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = (_SEND_MESSAGE_STRATEG = {}, 
        _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, _lib.promise.method(function(win, message, domain) {
            (0, _compat.emulateIERestrictions)(window, win);
            return win.postMessage(JSON.stringify(message, 0, 2), domain);
        })), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_GLOBAL_METHOD, _lib.promise.method(function(win, message, domain) {
            if (domain !== "*") {
                var winDomain = void 0;
                try {
                    winDomain = win.location.protocol + "//" + win.location.host;
                } catch (err) {}
                if (!winDomain) {
                    throw new Error("Can post post through global method - domain set to " + domain + ", but we can not verify the domain of the target window");
                }
                if (winDomain !== domain) {
                    throw new Error("Can post post through global method - domain " + domain + " does not match target window domain " + winDomain);
                }
            }
            if (!(0, _lib.isSameDomain)(win)) {
                throw new Error("window is a different domain");
            }
            if (!_lib.util.safeHasProp(win, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
                throw new Error("postRobot not found on window");
            }
            (0, _lib.nextTick)(function() {
                win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
                    origin: window.location.protocol + "//" + window.location.host,
                    source: window,
                    data: JSON.stringify(message)
                });
            });
        })), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_UP_THROUGH_BRIDGE, _lib.promise.method(function(win, message, domain) {
            var frame = (0, _compat.getBridgeFor)(win);
            if (!frame) {
                throw new Error("No bridge available in window");
            }
            if (!(0, _lib.isSameDomain)(frame)) {
                throw new Error("Bridge is different domain");
            }
            if (!_lib.util.safeHasProp(frame, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
                throw new Error("postRobot not installed in bridge");
            }
            return frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessageParent(window, JSON.stringify(message, 0, 2), domain);
        })), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_DOWN_THROUGH_BRIDGE, _lib.promise.method(function(win, message, domain) {
            var bridge = (0, _compat.getBridge)();
            if (!bridge) {
                throw new Error("Bridge not initialized");
            }
            if (win === bridge.contentWindow) {
                throw new Error("Message target is bridge");
            }
            if (!message.target) {
                if (win === window.opener) {
                    message.target = "parent.opener";
                } else {
                    throw new Error("Can not post message down through bridge without target");
                }
            }
            return bridge.then(function(iframe) {
                iframe.contentWindow.postMessage(JSON.stringify(message, 0, 2), domain);
            });
        })), _SEND_MESSAGE_STRATEG);
    }, /*!***********************************************!*\
  !*** ./~/post-robot/src/drivers/listeners.js ***!
  \***********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.listeners = undefined;
        exports.resetListeners = resetListeners;
        exports.getRequestListener = getRequestListener;
        exports.removeRequestListener = removeRequestListener;
        exports.addRequestListener = addRequestListener;
        var _lib = __webpack_require__(/*! ../lib */ 16);
        var listeners = exports.listeners = void 0;
        function resetListeners() {
            exports.listeners = listeners = {
                request: [],
                response: {},
                proxies: []
            };
        }
        function getRequestListener(name, win) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = listeners.request[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var requestListener = _step.value;
                    if (requestListener.name !== name) {
                        continue;
                    }
                    if (!requestListener.win) {
                        return requestListener.options;
                    }
                    if (win && _lib.childWindows.isEqual(win, requestListener.win)) {
                        return requestListener.options;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        function removeRequestListener(options) {
            var listener = void 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;
            try {
                for (var _iterator2 = listeners.request[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var requestListener = _step2.value;
                    if (requestListener.options === options) {
                        listener = requestListener;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                        _iterator2["return"]();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
            if (listener) {
                listeners.request.splice(listeners.request.indexOf(listener), 1);
            }
        }
        function addRequestListener(name, win, options, override) {
            var listener = getRequestListener(name, win);
            if (listener) {
                if (override) {
                    removeRequestListener(listener);
                } else {
                    throw new Error("Request listener already exists for " + name);
                }
            }
            listeners.request.push({
                name: name,
                win: win,
                options: options
            });
        }
        resetListeners();
    }, /*!***************************************************!*\
  !*** ./~/post-robot/src/drivers/receive/types.js ***!
  \***************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.RECEIVE_MESSAGE_TYPES = undefined;
        var _RECEIVE_MESSAGE_TYPE;
        var _extends = Object.assign || function(target) {
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
        var _conf = __webpack_require__(/*! ../../conf */ 7);
        var _lib = __webpack_require__(/*! ../../lib */ 16);
        var _send = __webpack_require__(/*! ../send */ 24);
        var _listeners = __webpack_require__(/*! ../listeners */ 26);
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        var RECEIVE_MESSAGE_TYPES = exports.RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, 
        _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK, function(source, message, origin) {
            var options = _listeners.listeners.response[message.hash];
            if (!options) {
                throw new Error("No handler found for post message ack for message: " + message.name + " in " + window.location.href);
            }
            options.ack = true;
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function(source, message, origin) {
            var options = (0, _listeners.getRequestListener)(message.name, source);
            function respond(data) {
                return (0, _send.sendMessage)(source, _extends({
                    target: message.originalSource ? message.originalSource : _lib.childWindows.getWindowId(source),
                    hash: message.hash,
                    name: message.name
                }, data), "*")["catch"](function(err) {
                    if (options && options.handleError) {
                        return options.handleError(err);
                    }
                    throw err;
                });
            }
            return _lib.promise.run(function() {
                return respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
                });
            }).then(function() {
                if (!options) {
                    throw new Error("No postmessage request handler for " + message.name + " in " + window.location.href);
                }
                if (options.window && source && options.window !== source) {
                    return;
                }
                if (options.domain) {
                    var match = typeof options.domain === "string" && origin === options.domain || options.domain instanceof RegExp && origin.match(options.domain);
                    if (!match) {
                        throw new Error("Message origin " + origin + " does not match domain " + options.domain);
                    }
                }
                return _lib.promise.deNodeify(options.handler, source, message.data);
            }).then(function(data) {
                return respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                    data: data
                });
            }, function(err) {
                return respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
                    error: err.stack ? err.message + "\n" + err.stack : err.toString()
                });
            });
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function(source, message, origin) {
            var options = _listeners.listeners.response[message.hash];
            if (!options) {
                throw new Error("No response handler found for post message response " + message.name + " in " + window.location.href);
            }
            delete _listeners.listeners.response[message.hash];
            if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) {
                return options.respond(new Error(message.error));
            } else if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
                return options.respond(null, message.data || message.response);
            }
        }), _RECEIVE_MESSAGE_TYPE);
    }, /*!**********************************************!*\
  !*** ./~/post-robot/src/interface/server.js ***!
  \**********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.listen = listen;
        exports.on = on;
        exports.once = once;
        var _conf = __webpack_require__(/*! ../conf */ 7);
        var _lib = __webpack_require__(/*! ../lib */ 16);
        var _drivers = __webpack_require__(/*! ../drivers */ 14);
        function listen(options) {
            if (!options.name) {
                throw new Error("Expected options.name");
            }
            options.handler = options.handler || _lib.util.noop;
            options.errorHandler = options.errorHandler || function(err) {
                throw err;
            };
            if (options.once) {
                (function() {
                    var handler = options.handler;
                    options.handler = _lib.util.once(function() {
                        (0, _drivers.removeRequestListener)(options);
                        return handler.apply(this, arguments);
                    });
                })();
            }
            var override = options.override || _conf.CONFIG.MOCK_MODE;
            (0, _drivers.addRequestListener)(options.name, options.window, options, override);
            options.handleError = function(err) {
                options.errorHandler(err);
            };
            if (options.window && options.errorOnClose) {
                (function() {
                    var interval = setInterval(function() {
                        if (options.window.closed) {
                            clearInterval(interval);
                            options.handleError(new Error("Post message target window is closed"));
                        }
                    }, 50);
                })();
            }
            return {
                cancel: function cancel() {
                    (0, _drivers.removeRequestListener)(options);
                }
            };
        }
        function on(name, options, handler, errorHandler) {
            if (options instanceof Function) {
                errorHandler = handler;
                handler = options;
                options = {};
            }
            options.name = name;
            options.handler = handler || options.handler;
            options.errorHandler = errorHandler || options.errorHandler;
            return listen(options);
        }
        function once(name, options, handler, errorHandler) {
            if (options instanceof Function) {
                errorHandler = handler;
                handler = options;
                options = {};
            }
            options.name = name;
            options.handler = handler || options.handler;
            options.errorHandler = errorHandler || options.errorHandler;
            options.once = true;
            var prom = new _lib.promise.Promise(function(resolve, reject) {
                options.handler = options.handler || resolve;
                options.errorHandler = options.errorHandler || reject;
            });
            var listener = listen(options);
            _lib.util.extend(prom, listener);
            return prom;
        }
    }, /*!*********************************************!*\
  !*** ./~/post-robot/src/interface/proxy.js ***!
  \*********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.proxy = proxy;
        exports.unproxy = unproxy;
        var _drivers = __webpack_require__(/*! ../drivers */ 14);
        function proxy(window1, window2) {
            _drivers.listeners.proxies.push({
                from: window1,
                to: window2
            });
            _drivers.listeners.proxies.push({
                from: window2,
                to: window1
            });
        }
        function unproxy(window1, window2) {
            var toRemove = [];
            for (var i = 0; i < _drivers.listeners.proxies.length; i++) {
                var prox = _drivers.listeners.proxies[i];
                if (prox.to === window1 && prox.from === window2 || prox.to === window2 && prox.from === window1) {
                    toRemove.push(prox);
                }
            }
            for (var _i = 0; _i < toRemove.length; _i++) {
                _drivers.listeners.proxies.splice(_drivers.listeners.proxies.indexOf(toRemove[_i]), 1);
            }
        }
    }, /*!**********************************************!*\
  !*** ./~/post-robot/src/interface/config.js ***!
  \**********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.CONSTANTS = exports.CONFIG = undefined;
        exports.enableMockMode = enableMockMode;
        exports.disableMockMode = disableMockMode;
        var _conf = __webpack_require__(/*! ../conf */ 7);
        Object.defineProperty(exports, "CONFIG", {
            enumerable: true,
            get: function get() {
                return _conf.CONFIG;
            }
        });
        Object.defineProperty(exports, "CONSTANTS", {
            enumerable: true,
            get: function get() {
                return _conf.CONSTANTS;
            }
        });
        function enableMockMode() {
            _conf.CONFIG.MOCK_MODE = true;
        }
        function disableMockMode() {
            _conf.CONFIG.MOCK_MODE = false;
        }
    }, /*!*********************************************!*\
  !*** ./~/xcomponent/src/component/index.js ***!
  \*********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _component = __webpack_require__(/*! ./component */ 32);
        Object.keys(_component).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _component[key];
                }
            });
        });
        var _parent = __webpack_require__(/*! ./parent */ 42);
        Object.keys(_parent).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _parent[key];
                }
            });
        });
        var _child = __webpack_require__(/*! ./child */ 33);
        Object.keys(_child).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _child[key];
                }
            });
        });
    }, /*!*************************************************!*\
  !*** ./~/xcomponent/src/component/component.js ***!
  \*************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.Component = exports.components = undefined;
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
        };
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _child = __webpack_require__(/*! ./child */ 33);
        var _parent = __webpack_require__(/*! ./parent */ 42);
        var _props = __webpack_require__(/*! ./props */ 43);
        var _lib = __webpack_require__(/*! ../lib */ 35);
        var _constants = __webpack_require__(/*! ../constants */ 41);
        var _parent2 = __webpack_require__(/*! ../templates/parent.css */ 44);
        var _parent3 = _interopRequireDefault(_parent2);
        var _overlay = __webpack_require__(/*! ../templates/overlay.htm */ 45);
        var _overlay2 = _interopRequireDefault(_overlay);
        var _overlay3 = __webpack_require__(/*! ../templates/overlay.css */ 46);
        var _overlay4 = _interopRequireDefault(_overlay3);
        var _component = __webpack_require__(/*! ../templates/component.htm */ 47);
        var _component2 = _interopRequireDefault(_component);
        var _component3 = __webpack_require__(/*! ../templates/component.css */ 48);
        var _component4 = _interopRequireDefault(_component3);
        var _drivers = __webpack_require__(/*! ../drivers */ 49);
        var drivers = _interopRequireWildcard(_drivers);
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                }
                newObj["default"] = obj;
                return newObj;
            }
        }
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var components = exports.components = {};
        var Component = exports.Component = function() {
            function Component() {
                var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                _classCallCheck(this, Component);
                this.validate(options);
                this.tag = options.tag;
                this.props = (0, _lib.extend)(options.props || {}, _props.internalProps);
                this.dimensions = options.dimensions;
                this.defaultEnv = options.defaultEnv;
                this.envUrls = options.envUrls || {};
                this.url = options.url || options.envUrls[options.defaultEnv];
                this.contexts = options.contexts || {};
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
                try {
                    for (var _iterator = _constants.CONTEXT_TYPES_LIST[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var context = _step.value;
                        this.contexts[context] = this.contexts[context] === undefined ? true : Boolean(this.contexts[context]);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                this.defaultContext = options.defaultContext;
                this.singleton = options.singleton;
                this.parentStyle = (0, _lib.scanForJavascript)(options.parentStyle) || _parent3["default"];
                this.overlayTemplate = (0, _lib.scanForJavascript)(options.overlayTemplate) || _overlay2["default"];
                this.overlayStyle = (0, _lib.scanForJavascript)(options.overlayStyle) || _overlay4["default"];
                this.componentTemplate = (0, _lib.scanForJavascript)(options.componentTemplate) || _component2["default"];
                this.componentStyle = (0, _lib.scanForJavascript)(options.componentStyle) || _component4["default"];
                components[this.tag] = this;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;
                try {
                    for (var _iterator2 = Object.keys(drivers)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var driverName = _step2.value;
                        var driver = drivers[driverName];
                        if (driver.isActive()) {
                            driver.register(this);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                            _iterator2["return"]();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            _createClass(Component, [ {
                key: "parent",
                value: function parent(options) {
                    return new _parent.ParentComponent(this, options);
                }
            }, {
                key: "child",
                value: function child(options) {
                    return new _child.ChildComponent(this, options);
                }
            }, {
                key: "attach",
                value: function attach(options) {
                    var component = this.child(options);
                    component.init();
                    return component;
                }
            }, {
                key: "init",
                value: function init(props) {
                    return new _parent.ParentComponent(this, {
                        props: props
                    });
                }
            }, {
                key: "getByTag",
                value: function getByTag(tag) {
                    return components[tag];
                }
            }, {
                key: "validate",
                value: function validate(options) {
                    if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) {
                        throw new Error("Invalid options.tag: " + options.tag);
                    }
                    if (!options.dimensions || !(_typeof(options.dimensions) === "object")) {
                        throw new Error("[" + options.tag + "] Expected options.dimensions to be an object");
                    }
                    if (typeof options.dimensions.width !== "number") {
                        throw new Error("[" + options.tag + "] Expected options.dimensions.width to be a number");
                    }
                    if (typeof options.dimensions.height !== "number") {
                        throw new Error("[" + options.tag + "] Expected options.dimensions.height to be a number");
                    }
                    if (options.props && !(_typeof(options.props) === "object")) {
                        throw new Error("[" + options.tag + "] Expected options.props to be an object");
                    }
                    if (options.props) {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;
                        try {
                            for (var _iterator3 = Object.keys(options.props)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var key = _step3.value;
                                var prop = options.props[key];
                                if (_props.internalProps.hasOwnProperty(key)) {
                                    throw new Error("[" + options.tag + "] Reserved prop name: " + key);
                                }
                                if (!prop || !((typeof prop === "undefined" ? "undefined" : _typeof(prop)) === "object")) {
                                    throw new Error("[" + options.tag + "] Expected options.props." + key + " to be an object");
                                }
                                if (!prop.type) {
                                    throw new Error("[" + options.tag + "] Expected prop.type");
                                }
                                if (_constants.PROP_TYPES_LIST.indexOf(prop.type) === -1) {
                                    throw new Error("[" + options.tag + "] Expected prop.type to be one of " + _constants.PROP_TYPES_LIST.join(", "));
                                }
                                if (prop.required && prop.def) {
                                    throw new Error("[" + options.tag + "] Required prop can not have a default value");
                                }
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                                    _iterator3["return"]();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    }
                    if (options.contexts) {
                        var anyEnabled = false;
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;
                        try {
                            for (var _iterator4 = Object.keys(options.contexts)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var context = _step4.value;
                                if (_constants.CONTEXT_TYPES_LIST.indexOf(context) === -1) {
                                    throw new Error("[" + options.tag + "] Unsupported context type: " + context);
                                }
                                if (options.contexts[context] || options.contexts[context] === undefined) {
                                    anyEnabled = true;
                                }
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                                    _iterator4["return"]();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                        if (!anyEnabled) {
                            throw new Error("[" + options.tag + "] No context type is enabled");
                        }
                    }
                    if (options.defaultContext) {
                        if (_constants.CONTEXT_TYPES_LIST.indexOf(options.defaultContext) === -1) {
                            throw new Error("[" + options.tag + "] Unsupported context type: " + options.defaultContext);
                        }
                        if (options.contexts && !options.contexts[options.defaultContext]) {
                            throw new Error("[" + options.tag + "] Disallowed default context type: " + options.defaultContext);
                        }
                    }
                    if (options.envUrls) {
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;
                        try {
                            for (var _iterator5 = Object.keys(options.envUrls)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var env = _step5.value;
                                if (!options.envUrls[env]) {
                                    throw new Error("[" + options.tag + "] No url specified for env: " + env);
                                }
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
                                    _iterator5["return"]();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }
                    }
                    if (options.defaultEnv && !options.envUrls) {
                        throw new Error("[" + options.tag + "] options.envUrls must be set if passing in a defaultEnv");
                    }
                    if (options.defaultEnv && !options.envUrls[options.defaultEnv]) {
                        throw new Error("[" + options.tag + "] Invalid default env: " + options.defaultEnv);
                    }
                    if (!options.url || !(typeof options.url === "string")) {
                        if (!options.defaultEnv || typeof options.defaultEnv !== "string") {
                            if (options.envUrls) {
                                throw new Error("[" + options.tag + "] Expected options.defaultEnv to be a string");
                            } else {
                                throw new Error("[" + options.tag + "] Expected options.url to be a string");
                            }
                        }
                    }
                }
            } ]);
            return Component;
        }();
    }, /*!*********************************************!*\
  !*** ./~/xcomponent/src/component/child.js ***!
  \*********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.ChildComponent = undefined;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _src = __webpack_require__(/*! post-robot/src */ 4);
        var _src2 = _interopRequireDefault(_src);
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);
        var _base = __webpack_require__(/*! ./base */ 34);
        var _util = __webpack_require__(/*! ./util */ 40);
        var _lib = __webpack_require__(/*! ../lib */ 35);
        var _constants = __webpack_require__(/*! ../constants */ 41);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var ChildComponent = exports.ChildComponent = function(_BaseComponent) {
            _inherits(ChildComponent, _BaseComponent);
            function ChildComponent(component) {
                var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                _classCallCheck(this, ChildComponent);
                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChildComponent).call(this, component, options));
                _this.component = component;
                _this.validate(options);
                _this.onEnter = _this.tryCatch(options.onEnter || _lib.noop);
                _this.onClose = _this.tryCatch(options.onClose || _lib.noop);
                _this.onError = _this.tryCatch(options.onError || function(err) {
                    throw err;
                });
                _this.onProps = _this.tryCatch(options.onProps || _lib.noop, false);
                _this.props = options.defaultProps || {};
                _this.standalone = options.standalone;
                try {
                    _this.setWindows();
                } catch (err) {
                    if (_this.standalone) {
                        return _possibleConstructorReturn(_this);
                    }
                    throw err;
                }
                return _this;
            }
            _createClass(ChildComponent, [ {
                key: "init",
                value: function init() {
                    var _this2 = this;
                    if (this.standalone && !this.parentComponentWindow) {
                        return _promise.SyncPromise.resolve();
                    }
                    this.listen(this.parentComponentWindow);
                    if (this.parentWindow !== this.parentComponentWindow) {
                        this.listen(this.parentWindow);
                    }
                    return this.sendToParentComponent(_constants.CONSTANTS.POST_MESSAGE.INIT).then(function(data) {
                        _this2.context = data.context;
                        (0, _lib.extend)(_this2.props, data.props);
                        _this2.onEnter.call(_this2);
                        _this2.onProps.call(_this2);
                    })["catch"](function(err) {
                        return _this2.onError(err);
                    });
                }
            }, {
                key: "sendToParentComponent",
                value: function sendToParentComponent(name, data) {
                    return _src2["default"].send(this.parentComponentWindow, name, data);
                }
            }, {
                key: "setWindows",
                value: function setWindows() {
                    if (window.__activeXComponent__) {
                        throw new Error("[" + this.component.tag + "] Can not attach multiple components to the same window");
                    }
                    window.__activeXComponent__ = this;
                    this.parentWindow = (0, _lib.getParentWindow)();
                    if (!this.parentWindow) {
                        throw new Error("[" + this.component.tag + "] Can not find parent window");
                    }
                    var winProps = (0, _util.parseWindowName)(window.name);
                    if (!winProps) {
                        throw new Error("[" + this.component.tag + "] Window has not been rendered by xcomponent - can not attach here");
                    }
                    if (winProps.sibling) {
                        this.parentComponentWindow = this.parentWindow.frames[winProps.parent];
                    } else {
                        this.parentComponentWindow = this.parentWindow;
                    }
                    this.watchForClose();
                }
            }, {
                key: "watchForClose",
                value: function watchForClose() {
                    var _this3 = this;
                    (0, _lib.onCloseWindow)(this.parentWindow, function() {
                        _this3.onClose(new Error("[" + _this3.component.tag + "] parent window was closed"));
                        if (_this3.context === _constants.CONSTANTS.CONTEXT.POPUP) {
                            window.close();
                        }
                    });
                    if (this.parentComponentWindow && this.parentComponentWindow !== this.parentWindow) {
                        (0, _lib.onCloseWindow)(this.parentComponentWindow, function() {
                            _this3.close(new Error("[" + _this3.component.tag + "] parent component window was closed"));
                        });
                    }
                }
            }, {
                key: "validate",
                value: function validate(options) {}
            }, {
                key: "listeners",
                value: function listeners() {
                    var _ref;
                    return _ref = {}, _defineProperty(_ref, _constants.CONSTANTS.POST_MESSAGE.PROPS, function(source, data) {
                        (0, _lib.extend)(this.props, data.props);
                        this.onProps.call(this);
                    }), _defineProperty(_ref, _constants.CONSTANTS.POST_MESSAGE.CLOSE, function(source, data) {
                        if (source !== this.parentWindow) {
                            _src2["default"].sendToParent(_constants.CONSTANTS.POST_MESSAGE.CLOSE);
                            return;
                        }
                        this.onClose.call(this);
                    }), _ref;
                }
            }, {
                key: "close",
                value: function close(err) {
                    this.onClose.call(this, err);
                    return _src2["default"].sendToParent(_constants.CONSTANTS.POST_MESSAGE.CLOSE);
                }
            }, {
                key: "focus",
                value: function focus() {
                    window.focus();
                }
            }, {
                key: "resize",
                value: function resize(width, height) {
                    window.resizeTo(width, height);
                }
            }, {
                key: "redirectParent",
                value: function redirectParent(url) {}
            }, {
                key: "breakOut",
                value: function breakOut() {
                    this.redirectParent(window.location.href);
                }
            }, {
                key: "error",
                value: function error(err) {
                    return this.sendToParentComponent(_constants.CONSTANTS.POST_MESSAGE.ERROR, {
                        error: err.stack ? err.message + "\n" + err.stack : err.toString()
                    });
                }
            } ]);
            return ChildComponent;
        }(_base.BaseComponent);
    }, /*!********************************************!*\
  !*** ./~/xcomponent/src/component/base.js ***!
  \********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.BaseComponent = undefined;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _src = __webpack_require__(/*! post-robot/src */ 4);
        var _src2 = _interopRequireDefault(_src);
        var _lib = __webpack_require__(/*! ../lib */ 35);
        var _error = __webpack_require__(/*! ../error */ 3);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var BaseComponent = exports.BaseComponent = function() {
            function BaseComponent() {
                _classCallCheck(this, BaseComponent);
            }
            _createClass(BaseComponent, [ {
                key: "registerForCleanup",
                value: function registerForCleanup(task) {
                    this.cleanupTasks = this.cleanupTasks || [];
                    this.cleanupTasks.push(task);
                    return this;
                }
            }, {
                key: "cleanup",
                value: function cleanup() {
                    if (this.cleanupTasks) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;
                        try {
                            for (var _iterator = this.cleanupTasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var task = _step.value;
                                task();
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator["return"]) {
                                    _iterator["return"]();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                        this.cleanupTasks = [];
                    }
                }
            }, {
                key: "setForCleanup",
                value: function setForCleanup(key, value) {
                    var _this = this;
                    this[key] = value;
                    this.registerForCleanup(function() {
                        delete _this[key];
                    });
                }
            }, {
                key: "tryCatch",
                value: function tryCatch(method, doOnce) {
                    var self = this;
                    var errored = false;
                    var wrapper = function wrapper() {
                        if (errored) {
                            return;
                        }
                        try {
                            return method.apply(this, arguments);
                        } catch (err) {
                            errored = true;
                            if (err instanceof _error.IntegrationError) {
                                return self.error(err);
                            }
                            return self.error(new Error("[" + this.component.tag + "] Child lifecycle method threw an error"));
                        }
                    };
                    if (doOnce !== false) {
                        wrapper = (0, _lib.once)(wrapper);
                    }
                    return wrapper;
                }
            }, {
                key: "listen",
                value: function listen(win) {
                    var _this2 = this;
                    if (!win) {
                        throw new Error("[" + this.component.tag + "] window to listen to not set");
                    }
                    if (!this.listeners) {
                        return;
                    }
                    var listeners = this.listeners();
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
                    try {
                        var _loop = function _loop() {
                            var listenerName = _step2.value;
                            var listener = _src2["default"].on(listenerName, {
                                window: win,
                                errorHandler: function errorHandler(err) {
                                    return _this2.error(err);
                                }
                            }, function(source, data) {
                                return listeners[listenerName].call(_this2, source, data);
                            });
                            _this2.registerForCleanup(function() {
                                listener.cancel();
                            });
                        };
                        for (var _iterator2 = Object.keys(listeners)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            _loop();
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                _iterator2["return"]();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            }, {
                key: "validateProps",
                value: function validateProps(props) {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;
                    try {
                        for (var _iterator3 = Object.keys(props)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var key = _step3.value;
                            if (!this.component.props.hasOwnProperty(key)) {
                                throw new Error("[" + this.component.tag + "] Invalid prop: " + key);
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                                _iterator3["return"]();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;
                    try {
                        for (var _iterator4 = Object.keys(this.component.props)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var _key = _step4.value;
                            var prop = this.component.props[_key];
                            var value = props[_key];
                            var hasProp = props.hasOwnProperty(_key) && value !== null && value !== undefined && value !== "";
                            if (!hasProp) {
                                if (prop.required !== false && !prop.hasOwnProperty("def")) {
                                    throw new Error("[" + this.component.tag + "] Prop is required: " + _key);
                                }
                                continue;
                            }
                            if (prop.type === "function") {
                                if (!(value instanceof Function)) {
                                    throw new Error("[" + this.component.tag + "] Prop is not of type function: " + _key);
                                }
                            } else if (prop.type === "string") {
                                if (typeof value !== "string") {
                                    throw new Error("[" + this.component.tag + "] Prop is not of type string: " + _key);
                                }
                            } else if (prop.type === "object") {
                                try {
                                    JSON.stringify(value);
                                } catch (err) {
                                    throw new Error("[" + this.component.tag + "] Unable to serialize prop: " + _key);
                                }
                            } else if (prop.type === "number") {
                                if (isNaN(parseInt(value, 10))) {
                                    throw new Error("[" + this.component.tag + "] Prop is not a number: " + _key);
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                                _iterator4["return"]();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                }
            } ]);
            return BaseComponent;
        }();
    }, /*!***************************************!*\
  !*** ./~/xcomponent/src/lib/index.js ***!
  \***************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _dom = __webpack_require__(/*! ./dom */ 36);
        Object.keys(_dom).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _dom[key];
                }
            });
        });
        var _fn = __webpack_require__(/*! ./fn */ 37);
        Object.keys(_fn).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _fn[key];
                }
            });
        });
        var _promise = __webpack_require__(/*! ./promise */ 39);
        Object.keys(_promise).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _promise[key];
                }
            });
        });
        var _util = __webpack_require__(/*! ./util */ 38);
        Object.keys(_util).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _util[key];
                }
            });
        });
    }, /*!*************************************!*\
  !*** ./~/xcomponent/src/lib/dom.js ***!
  \*************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.getElement = getElement;
        exports.popup = popup;
        exports.iframe = iframe;
        exports.onCloseWindow = onCloseWindow;
        exports.addEventListener = addEventListener;
        exports.getParentWindow = getParentWindow;
        exports.getParentNode = getParentNode;
        exports.scanForJavascript = scanForJavascript;
        exports.createElement = createElement;
        exports.createStyleSheet = createStyleSheet;
        var _fn = __webpack_require__(/*! ./fn */ 37);
        var _util = __webpack_require__(/*! ./util */ 38);
        function getElement(id) {
            if (id instanceof window.Element) {
                return id;
            }
            if (typeof id === "string") {
                var element = document.getElementById(id);
                if (element) {
                    return element;
                }
                if (document.querySelector) {
                    return document.querySelector(id);
                }
            }
        }
        function popup(url, options) {
            var win = window.open(url, options.name, Object.keys(options).map(function(key) {
                if (!options[key]) {
                    return;
                }
                return key + "=" + options[key];
            }).filter(Boolean).join(", "), true);
            return win;
        }
        function iframe(container, url, options) {
            container = getElement(container);
            var frame = document.createElement("iframe");
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = Object.keys(options)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;
                    frame[key] = options[key];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            frame.style.backgroundColor = "transparent";
            frame.frameBorder = "0";
            frame.allowTransparency = "true";
            container.appendChild(frame);
            return frame;
        }
        function onCloseWindow(win, callback) {
            callback = (0, _fn.once)(callback);
            var interval = void 0;
            function checkWindowClosed() {
                if (!win || win.closed || typeof win.closed === "undefined") {
                    clearInterval(interval);
                    callback();
                }
            }
            interval = setInterval(checkWindowClosed, 50);
            var timeout = setTimeout(checkWindowClosed);
            var close = win.close;
            try {
                win.close = function() {
                    close.apply(this, arguments);
                    setTimeout(checkWindowClosed);
                };
            } catch (err) {}
            return {
                cancel: function cancel() {
                    clearTimeout(timeout);
                    clearInterval(interval);
                    try {
                        win.close = close;
                    } catch (err) {}
                }
            };
        }
        function addEventListener(obj, event, handler) {
            obj.addEventListener(event, handler);
            return {
                cancel: function cancel() {
                    obj.removeEventListener(event, handler);
                }
            };
        }
        function getParentWindow() {
            if (window.opener) {
                return window.opener;
            }
            if (window.parent && window.parent !== window) {
                return window.parent;
            }
        }
        function getParentNode(el, tag) {
            tag = tag.toLowerCase();
            while (el.parentNode) {
                el = el.parentNode;
                if (el.tagName.toLowerCase() === tag) {
                    return el;
                }
            }
        }
        function scanForJavascript(str) {
            if (!str) {
                return str;
            }
            if (str.match(/<script|on\w+\s*=|javascript:|expression\s*\(|eval\(|new\s*Function/)) {
                throw new Error("HTML contains potential javascript: " + str);
            }
            return str;
        }
        function createElement() {
            var tag = arguments.length <= 0 || arguments[0] === undefined ? "div" : arguments[0];
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var container = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
            var element = document.createElement(tag);
            if (options.style) {
                (0, _util.extend)(element.style, options.style);
            }
            if (options.html) {
                element.innerHTML = options.html;
            }
            if (options["class"]) {
                element.className = options["class"].join(" ");
            }
            if (options.attributes) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;
                try {
                    for (var _iterator2 = Object.keys(options.attributes)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var key = _step2.value;
                        element.setAttribute(key, options.attributes[key]);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                            _iterator2["return"]();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            if (options.styleSheet) {
                if (element.styleSheet) {
                    element.styleSheet.cssText = options.styleSheet;
                } else {
                    element.appendChild(document.createTextNode(options.styleSheet));
                }
            }
            if (container) {
                container.appendChild(element);
            }
            return element;
        }
        function createStyleSheet(styleSheet, container) {
            return createElement("style", {
                styleSheet: styleSheet,
                attributes: {
                    type: "text/css"
                }
            }, container);
        }
    }, /*!************************************!*\
  !*** ./~/xcomponent/src/lib/fn.js ***!
  \************************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.noop = noop;
        exports.once = once;
        exports.memoize = memoize;
        function noop() {}
        function once(method) {
            var called = false;
            return function() {
                if (!called) {
                    called = true;
                    return method.apply(this, arguments);
                }
            };
        }
        function memoize(method) {
            var called = false;
            var result = void 0;
            return function() {
                if (!called) {
                    called = true;
                    result = method.apply(this, arguments);
                }
                return result;
            };
        }
    }, /*!**************************************!*\
  !*** ./~/xcomponent/src/lib/util.js ***!
  \**************************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.urlEncode = urlEncode;
        exports.camelToDasherize = camelToDasherize;
        exports.dasherizeToCamel = dasherizeToCamel;
        exports.extend = extend;
        exports.values = values;
        exports.uniqueID = uniqueID;
        exports.b64encode = b64encode;
        exports.b64decode = b64decode;
        exports.stringifyWithFunctions = stringifyWithFunctions;
        function urlEncode(str) {
            return str.replace(/\?/g, "%3F").replace(/\&/g, "%26");
        }
        function camelToDasherize(string) {
            return string.replace(/([A-Z])/g, function(g) {
                return "-" + g.toLowerCase();
            });
        }
        function dasherizeToCamel(string) {
            return string.replace(/-([a-z])/g, function(g) {
                return g[1].toUpperCase();
            });
        }
        function extend(obj, source) {
            if (!source) {
                return obj;
            }
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    obj[key] = source[key];
                }
            }
            return obj;
        }
        function values(obj) {
            var results = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    results.push(obj[key]);
                }
            }
            return results;
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            });
        }
        function b64encode(str) {
            return window.btoa(str).replace(/[=]/g, "_");
        }
        function b64decode(str) {
            return window.atob(str.replace(/[_]/g, "="));
        }
        function stringifyWithFunctions(obj) {
            return JSON.stringify(obj, function(key, val) {
                if (typeof val === "function") {
                    return val.toString();
                }
                return val;
            });
        }
    }, /*!*****************************************!*\
  !*** ./~/xcomponent/src/lib/promise.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.denodeify = denodeify;
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);
        function denodeify(method) {
            return function() {
                var self = this;
                var args = Array.prototype.slice.call(arguments);
                if (args.length >= method.length) {
                    return _promise.SyncPromise.resolve(method.apply(self, args));
                }
                return new _promise.SyncPromise(function(resolve, reject) {
                    args.push(function denodeifyCallback(err, result) {
                        if (err && !(err instanceof Error)) {
                            throw new Error("Passed non-Error object in callback: [ " + err + " ] -- callbacks should either be called with callback(new Error(...)) or callback(null, result).");
                        }
                        return err ? reject(err) : resolve(result);
                    });
                    return method.apply(self, args);
                });
            };
        }
    }, /*!********************************************!*\
  !*** ./~/xcomponent/src/component/util.js ***!
  \********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.buildChildWindowName = buildChildWindowName;
        exports.parseWindowName = parseWindowName;
        var _lib = __webpack_require__(/*! ../lib */ 35);
        var _constants = __webpack_require__(/*! ../constants */ 41);
        function buildChildWindowName() {
            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            return (0, _lib.b64encode)(JSON.stringify((0, _lib.extend)({
                type: _constants.CONSTANTS.XCOMPONENT
            }, props)));
        }
        function parseWindowName(name) {
            var winProps = void 0;
            try {
                winProps = JSON.parse((0, _lib.b64decode)(name));
            } catch (err) {
                return;
            }
            if (!winProps || winProps.type !== _constants.CONSTANTS.XCOMPONENT) {
                return;
            }
            return winProps;
        }
    }, /*!***************************************!*\
  !*** ./~/xcomponent/src/constants.js ***!
  \***************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.MAX_Z_INDEX = exports.CONTEXT_TYPES_LIST = exports.CONTEXT_TYPES = exports.PROP_TYPES_LIST = exports.PROP_TYPES = exports.CONSTANTS = undefined;
        var _lib = __webpack_require__(/*! ./lib */ 35);
        var CONSTANTS = exports.CONSTANTS = {
            XCOMPONENT: "xcomponent",
            CONTEXT: {
                IFRAME: "xcomponent_context_iframe",
                POPUP: "xcomponent_context_popup"
            },
            POST_MESSAGE: {
                INIT: "xcomponent_init",
                PROPS: "xcomponent_props",
                PROP_CALLBACK: "xcomponent_prop_callback",
                CLOSE: "xcomponent_close",
                REDIRECT: "xcomponent_redirect",
                RESIZE: "xcomponent_resize",
                RENDER: "xcomponent_render",
                ERROR: "xcomponent_error"
            }
        };
        var PROP_TYPES = exports.PROP_TYPES = {
            STRING: "string",
            OBJECT: "object",
            FUNCTION: "function",
            BOOLEAN: "boolean",
            NUMBER: "number"
        };
        var PROP_TYPES_LIST = exports.PROP_TYPES_LIST = (0, _lib.values)(PROP_TYPES);
        var CONTEXT_TYPES = exports.CONTEXT_TYPES = {
            IFRAME: "iframe",
            LIGHTBOX: "lightbox",
            POPUP: "popup"
        };
        var CONTEXT_TYPES_LIST = exports.CONTEXT_TYPES_LIST = (0, _lib.values)(CONTEXT_TYPES);
        var MAX_Z_INDEX = exports.MAX_Z_INDEX = 2147483647;
    }, /*!**********************************************!*\
  !*** ./~/xcomponent/src/component/parent.js ***!
  \**********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.ParentComponent = undefined;
        var _extends = Object.assign || function(target) {
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
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
        };
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _RENDER_DRIVERS;
        var _src = __webpack_require__(/*! post-robot/src */ 4);
        var _src2 = _interopRequireDefault(_src);
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);
        var _base = __webpack_require__(/*! ./base */ 34);
        var _util = __webpack_require__(/*! ./util */ 40);
        var _lib = __webpack_require__(/*! ../lib */ 35);
        var _constants = __webpack_require__(/*! ../constants */ 41);
        var _error = __webpack_require__(/*! ../error */ 3);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        var activeComponents = [];
        var RENDER_DRIVERS = (_RENDER_DRIVERS = {}, _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.IFRAME, {
            overlay: false,
            open: function open(element) {
                var _this = this;
                this.iframe = (0, _lib.iframe)(element, null, {
                    name: this.childWindowName,
                    width: this.component.dimensions.width,
                    height: this.component.dimensions.height
                });
                this.registerForCleanup(function() {
                    if (_this.iframe) {
                        try {
                            _this.iframe.contentWindow.close();
                        } catch (err) {}
                        _this.iframe.parentNode.removeChild(_this.iframe);
                        delete _this.iframe;
                    }
                });
                this.setForCleanup("context", _constants.CONSTANTS.CONTEXT.IFRAME);
                this.setForCleanup("window", this.iframe.contentWindow);
                this.watchForClose();
                return this;
            },
            renderToParent: function renderToParent(element) {}
        }), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.POPUP, {
            overlay: true,
            open: function open() {
                var _this2 = this;
                var pos = this.getPosition();
                this.popup = (0, _lib.popup)("about:blank", {
                    name: this.childWindowName,
                    width: this.component.dimensions.width,
                    height: this.component.dimensions.height,
                    top: pos.y,
                    left: pos.x
                });
                this.registerForCleanup(function() {
                    if (_this2.popup) {
                        _this2.popup.close();
                        delete _this2.popup;
                    }
                });
                if (!this.popup || this.popup.closed || typeof this.popup.closed === "undefined") {
                    var err = new _error.PopupOpenError("[" + this.component.tag + "] Can not open popup window - blocked");
                    throw err;
                }
                this.setForCleanup("context", _constants.CONSTANTS.CONTEXT.POPUP);
                this.setForCleanup("window", this.popup);
                this.watchForClose();
                return this;
            },
            renderToParent: function renderToParent() {
                this.open(null, _constants.CONTEXT_TYPES.POPUP);
            }
        }), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.LIGHTBOX, {
            overlay: true,
            open: function open() {
                this.open(document.body, _constants.CONTEXT_TYPES.IFRAME);
                var pos = this.getPosition();
                this.iframe.style.zIndex = _constants.MAX_Z_INDEX;
                this.iframe.style.position = "absolute";
                this.iframe.style.left = pos.x;
                this.iframe.style.top = pos.y;
                this.iframe.style.borderRadius = "10px";
                return this;
            },
            renderToParent: function renderToParent() {}
        }), _RENDER_DRIVERS);
        var ParentComponent = exports.ParentComponent = function(_BaseComponent) {
            _inherits(ParentComponent, _BaseComponent);
            function ParentComponent(component) {
                var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                _classCallCheck(this, ParentComponent);
                var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ParentComponent).call(this, component, options));
                _this3.component = component;
                _this3.id = (0, _lib.uniqueID)();
                if (component.singleton && activeComponents.some(function(comp) {
                    return comp.component === component;
                })) {
                    throw new Error(component.tag + " is a singleton, and an only be instantiated once");
                }
                activeComponents.push(_this3);
                _this3.validate(options);
                _this3.parentWindow = (0, _lib.getParentWindow)();
                _this3.setProps(options.props || {});
                _this3.childWindowName = options.childWindowName || (0, _util.buildChildWindowName)({
                    parent: window.name,
                    id: _this3.id
                });
                _this3.screenWidth = options.screenWidth || window.outerWidth;
                _this3.screenHeight = options.screenHeight || window.outerHeight;
                _this3.createParentStyle();
                _this3.onInit = new _promise.SyncPromise();
                return _this3;
            }
            _createClass(ParentComponent, [ {
                key: "setProps",
                value: function setProps(props) {
                    this.props = this.normalizeProps(props);
                    this.url = this.buildUrl();
                }
            }, {
                key: "buildUrl",
                value: function buildUrl() {
                    var url = void 0;
                    if (this.props.url) {
                        url = this.props.url;
                    } else if (this.props.env) {
                        url = this.component.envUrls[this.props.env];
                    } else {
                        url = this.component.url;
                    }
                    var queryString = this.propsToQuery(this.props);
                    if (queryString) {
                        url = "" + url + (url.indexOf("?") === -1 ? "?" : "&") + queryString;
                    }
                    return url;
                }
            }, {
                key: "updateProps",
                value: function updateProps(props) {
                    var _this4 = this;
                    return this.onInit.then(function() {
                        var oldProps = (0, _lib.stringifyWithFunctions)(_this4.props);
                        var newProps = {};
                        (0, _lib.extend)(newProps, _this4.props);
                        (0, _lib.extend)(newProps, props);
                        _this4.setProps(newProps);
                        if (_this4.window && oldProps !== (0, _lib.stringifyWithFunctions)(_this4.props)) {
                            return _src2["default"].send(_this4.window, _constants.CONSTANTS.POST_MESSAGE.PROPS, {
                                props: _this4.props
                            });
                        }
                    });
                }
            }, {
                key: "validate",
                value: function validate(options) {}
            }, {
                key: "normalizeProps",
                value: function normalizeProps(props) {
                    this.validateProps(props);
                    props = props || {};
                    var result = {};
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = Object.keys(this.component.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var key = _step.value;
                            result[key] = this.normalizeProp(props, key);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator["return"]) {
                                _iterator["return"]();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    return result;
                }
            }, {
                key: "normalizeProp",
                value: function normalizeProp(props, key) {
                    var prop = this.component.props[key];
                    var value = props[key];
                    var hasProp = props.hasOwnProperty(key) && value !== null && value !== undefined && value !== "";
                    if (!hasProp && prop.def) {
                        value = prop.def instanceof Function && prop.type !== "function" ? prop.def() : prop.def;
                    } else if (!hasProp && prop.defaultProp) {
                        value = this.normalizeProp(props, prop.defaultProp);
                    }
                    if (prop.type === "boolean") {
                        return Boolean(value);
                    } else if (prop.type === "function") {
                        if (!value) {
                            if (!value && prop.noop) {
                                value = _lib.noop;
                            }
                        } else {
                            if (prop.denodeify) {
                                value = (0, _lib.denodeify)(value);
                            }
                            if (prop.once) {
                                value = (0, _lib.once)(value);
                            }
                            if (prop.memoize) {
                                value = (0, _lib.memoize)(value);
                            }
                        }
                        return value;
                    } else if (prop.type === "string") {
                        return value || "";
                    } else if (prop.type === "object") {
                        return JSON.stringify(value);
                    } else if (prop.type === "number") {
                        return parseInt(value || 0, 10);
                    }
                }
            }, {
                key: "propsToQuery",
                value: function propsToQuery(props) {
                    return Object.keys(props).map(function(key) {
                        var value = props[key];
                        if (!value) {
                            return "";
                        }
                        var result = void 0;
                        if (typeof value === "boolean") {
                            result = "1";
                        } else if (typeof value === "string") {
                            result = value.toString();
                        } else if (typeof value === "function") {
                            return;
                        } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
                            result = JSON.stringify(value);
                        } else if (typeof value === "number") {
                            result = value.toString();
                        }
                        return (0, _lib.urlEncode)(key) + "=" + (0, _lib.urlEncode)(result);
                    }).filter(Boolean).join("&");
                }
            }, {
                key: "getPosition",
                value: function getPosition() {
                    var pos = {};
                    var dimensions = this.component.dimensions;
                    if (typeof dimensions.x === "number") {
                        pos.x = dimensions.x;
                    } else {
                        var width = this.screenWidth;
                        if (width <= dimensions.width) {
                            pos.x = 0;
                        } else {
                            pos.x = Math.floor(width / 2 - dimensions.width / 2);
                        }
                    }
                    if (typeof dimensions.y === "number") {
                        pos.y = dimensions.y;
                    } else {
                        var height = this.screenHeight;
                        if (height <= dimensions.height) {
                            pos.y = 0;
                        } else {
                            pos.y = Math.floor(height / 2 - dimensions.height / 2);
                        }
                    }
                    return pos;
                }
            }, {
                key: "getRenderContext",
                value: function getRenderContext(el) {
                    if (el) {
                        if (!this.component.contexts[_constants.CONTEXT_TYPES.IFRAME]) {
                            throw new Error("[" + this.component.tag + "] Iframe context not allowed");
                        }
                        return _constants.CONTEXT_TYPES.IFRAME;
                    }
                    if (this.component.defaultContext) {
                        if (this.component.defaultContext === _constants.CONTEXT_TYPES.LIGHTBOX) {
                            return _constants.CONTEXT_TYPES.LIGHTBOX;
                        }
                        if (this.component.defaultContext === _constants.CONTEXT_TYPES.POPUP) {
                            return _constants.CONTEXT_TYPES.POPUP;
                        }
                    }
                    if (this.component.contexts[_constants.CONTEXT_TYPES.LIGHTBOX]) {
                        return _constants.CONTEXT_TYPES.LIGHTBOX;
                    }
                    if (this.component.contexts[_constants.CONTEXT_TYPES.POPUP]) {
                        return _constants.CONTEXT_TYPES.POPUP;
                    }
                    throw new Error("[" + this.component.tag + "] No context options available for render");
                }
            }, {
                key: "render",
                value: function render(element, context) {
                    if (this.window) {
                        throw new Error("[" + this.component.tag + "] Can not render: component is already rendered");
                    }
                    if (context && !this.component.contexts[context]) {
                        throw new Error("Invalid context: " + context);
                    }
                    context = context || this.getRenderContext(element);
                    this.open(element, context);
                    this.listen(this.window);
                    this.loadUrl(this.url);
                    this.runTimeout();
                    if (RENDER_DRIVERS[context].overlay) {
                        this.createOverlayTemplate();
                    }
                    return this;
                }
            }, {
                key: "open",
                value: function open(element, context) {
                    if (this.window) {
                        throw new Error("[" + this.component.tag + "] Can not open: component is already rendered");
                    }
                    RENDER_DRIVERS[context].open.call(this, element);
                    this.createComponentTemplate();
                }
            }, {
                key: "renderToParent",
                value: function renderToParent(element, context) {
                    var _this5 = this;
                    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                    if (this.window) {
                        throw new Error("[" + this.component.tag + "] Component is already rendered");
                    }
                    if (context && !this.component.contexts[context]) {
                        throw new Error("Invalid context: " + context);
                    }
                    context = context || this.getRenderContext(element);
                    if (!this.parentWindow) {
                        throw new Error("[" + this.component.tag + "] Can not render to parent - no parent exists");
                    }
                    if (!window.name) {
                        throw new Error("[" + this.component.tag + "] Can not render to parent - not in a child component window");
                    }
                    this.childWindowName = (0, _util.buildChildWindowName)({
                        id: this.id,
                        parent: window.name,
                        sibling: true
                    });
                    RENDER_DRIVERS[context].renderToParent.call(this, element);
                    return _src2["default"].sendToParent(_constants.CONSTANTS.POST_MESSAGE.RENDER, _extends({}, options, {
                        tag: this.component.tag,
                        context: context,
                        element: element,
                        options: {
                            props: this.props,
                            childWindowName: this.childWindowName,
                            screenWidth: this.screenWidth,
                            screenHeight: this.screenHeight
                        }
                    })).then(function(data) {
                        if (!_this5.window) {
                            _this5.setForCleanup("window", _this5.parentWindow.frames[_this5.childWindowName]);
                        }
                        _this5.listen(_this5.window);
                        return _this5;
                    });
                }
            }, {
                key: "renderIframe",
                value: function renderIframe(element) {
                    if (!element) {
                        throw new Error("[" + this.component.tag + "] Must specify element to render iframe");
                    }
                    return this.render(element, _constants.CONTEXT_TYPES.IFRAME);
                }
            }, {
                key: "renderIframeToParent",
                value: function renderIframeToParent(element) {
                    if (!element) {
                        throw new Error("[" + this.component.tag + "] Must specify element to render iframe to parent");
                    }
                    return this.renderToParent(element, _constants.CONTEXT_TYPES.IFRAME);
                }
            }, {
                key: "renderLightbox",
                value: function renderLightbox() {
                    return this.render(null, _constants.CONTEXT_TYPES.LIGHTBOX);
                }
            }, {
                key: "renderLightboxToParent",
                value: function renderLightboxToParent() {
                    return this.renderToParent(null, _constants.CONTEXT_TYPES.LIGHTBOX);
                }
            }, {
                key: "renderPopup",
                value: function renderPopup() {
                    return this.render(null, _constants.CONTEXT_TYPES.POPUP);
                }
            }, {
                key: "renderPopupToParent",
                value: function renderPopupToParent() {
                    return this.renderToParent(null, _constants.CONTEXT_TYPES.POPUP);
                }
            }, {
                key: "watchForClose",
                value: function watchForClose() {
                    var _this6 = this;
                    var closeWindowListener = (0, _lib.onCloseWindow)(this.window, function() {
                        _this6.props.onClose(new Error("[" + _this6.component.tag + "] " + _this6.context + " was closed"));
                        _this6.destroy();
                    });
                    var unloadListener = (0, _lib.addEventListener)(window, "beforeunload", function() {
                        if (_this6.popup) {
                            _this6.popup.close();
                        }
                    });
                    this.registerForCleanup(function() {
                        closeWindowListener.cancel();
                        unloadListener.cancel();
                    });
                }
            }, {
                key: "loadUrl",
                value: function loadUrl(url) {
                    if (this.popup) {
                        this.popup.location = url;
                    } else if (this.iframe) {
                        this.iframe.src = url;
                    }
                }
            }, {
                key: "hijackButton",
                value: function hijackButton(element) {
                    var _this7 = this;
                    var context = arguments.length <= 1 || arguments[1] === undefined ? _constants.CONTEXT_TYPES.LIGHTBOX : arguments[1];
                    var el = (0, _lib.getElement)(element);
                    if (!el) {
                        throw new Error("[" + this.component.tag + "] Can not find element: " + element);
                    }
                    var isButton = el.tagName.toLowerCase() === "button" || el.tagName.toLowerCase() === "input" && el.type === "submit";
                    var targetElement = isButton ? (0, _lib.getParentNode)(el, "form") : el;
                    el.addEventListener("click", function(event) {
                        if (_this7.window) {
                            event.preventDefault();
                            throw new Error("[" + _this7.component.tag + "] Component is already rendered");
                        }
                        _this7.renderHijack(targetElement, context);
                    });
                    return this;
                }
            }, {
                key: "renderHijack",
                value: function renderHijack(el) {
                    var context = arguments.length <= 1 || arguments[1] === undefined ? _constants.CONTEXT_TYPES.LIGHTBOX : arguments[1];
                    if (this.window) {
                        throw new Error("[" + this.component.tag + "] Component is already rendered");
                    }
                    el.target = this.childWindowName;
                    this.open(null, context);
                    this.listen(this.window);
                    this.runTimeout();
                    if (RENDER_DRIVERS[context].overlay) {
                        this.createOverlayTemplate();
                    }
                }
            }, {
                key: "hijackButtonToPopup",
                value: function hijackButtonToPopup(element) {
                    return this.hijackButton(element, _constants.CONTEXT_TYPES.POPUP);
                }
            }, {
                key: "hijackButtonToLightbox",
                value: function hijackButtonToLightbox(element) {
                    return this.hijackButton(element, _constants.CONTEXT_TYPES.LIGHTBOX);
                }
            }, {
                key: "hijackSubmitParentForm",
                value: function hijackSubmitParentForm() {
                    return this.renderToParent(null, _constants.CONTEXT_TYPES.POPUP, {
                        hijackSubmitParentForm: true
                    });
                }
            }, {
                key: "runTimeout",
                value: function runTimeout() {
                    var _this8 = this;
                    if (this.props.timeout) {
                        setTimeout(function() {
                            _this8.onInit.reject()["catch"](function() {
                                var err = new Error("[" + this.component.tag + "] Loading component " + this.component.tag + " at " + this.url + " timed out after " + this.props.timeout + " milliseconds");
                                this.props.onTimeout(err);
                                this.destroy();
                            });
                        }, this.props.timeout);
                    }
                }
            }, {
                key: "listeners",
                value: function listeners() {
                    var _ref;
                    return _ref = {}, _defineProperty(_ref, _constants.CONSTANTS.POST_MESSAGE.INIT, function(source, data) {
                        this.props.onEnter();
                        this.onInit.resolve();
                        return {
                            context: this.context,
                            props: this.props
                        };
                    }), _defineProperty(_ref, _constants.CONSTANTS.POST_MESSAGE.CLOSE, function(source, data) {
                        this.close();
                    }), _defineProperty(_ref, _constants.CONSTANTS.POST_MESSAGE.RESIZE, function(source, data) {
                        if (this.context === _constants.CONSTANTS.CONTEXT.POPUP) {
                            throw new Error("[" + this.component.tag + "] Can not resize popup from parent");
                        }
                        return this.resize(data.width, data.height);
                    }), _defineProperty(_ref, _constants.CONSTANTS.POST_MESSAGE.RENDER, function(source, data) {
                        var component = this.component.getByTag(data.tag);
                        var instance = component.parent(data.options);
                        if (data.hijackSubmitParentForm) {
                            var form = (0, _lib.getParentNode)(this.iframe, "form");
                            instance.renderHijack(form, data.context);
                            form.submit();
                        } else {
                            instance.render(data.element, data.context);
                        }
                    }), _defineProperty(_ref, _constants.CONSTANTS.POST_MESSAGE.ERROR, function(source, data) {
                        this.error(new Error(data.error));
                    }), _ref;
                }
            }, {
                key: "close",
                value: function close() {
                    var _this9 = this;
                    return _src2["default"].send(this.window, _constants.CONSTANTS.POST_MESSAGE.CLOSE, {}, {
                        timeout: 500
                    })["catch"](function(err) {
                        console.warn("Error sending close message to child", err.stack || err.toString());
                    }).then(function() {
                        _this9.destroy();
                    });
                }
            }, {
                key: "focus",
                value: function focus() {
                    if (this.popup) {
                        this.popup.focus();
                    }
                    return this;
                }
            }, {
                key: "resize",
                value: function resize(height, width) {
                    var _this10 = this;
                    return _promise.SyncPromise.resolve().then(function() {
                        if (_this10.context === _constants.CONSTANTS.CONTEXT.POPUP) {
                            return _src2["default"].send(_this10.popup, _constants.CONSTANTS.POST_MESSAGE.RESIZE, {
                                height: height,
                                width: width
                            });
                        } else if (_this10.context === _constants.CONSTANTS.CONTEXT.IFRAME) {
                            _this10.iframe.height = height;
                            _this10.iframe.width = width;
                        }
                    });
                }
            }, {
                key: "createParentStyle",
                value: function createParentStyle() {
                    this.overlayStyle = (0, _lib.createStyleSheet)(this.component.parentStyle, document.body);
                }
            }, {
                key: "createComponentTemplate",
                value: function createComponentTemplate() {
                    (0, _lib.createElement)("body", {
                        html: this.component.componentTemplate,
                        "class": [ "xcomponent-component" ]
                    }, this.window.document.body);
                    (0, _lib.createStyleSheet)(this.component.componentStyle, this.window.document.body);
                }
            }, {
                key: "createOverlayTemplate",
                value: function createOverlayTemplate() {
                    var _this11 = this;
                    this.overlay = (0, _lib.createElement)("div", {
                        html: this.component.overlayTemplate,
                        "class": [ "xcomponent-overlay", "xcomponent-" + this.context ],
                        style: {
                            zIndex: _constants.MAX_Z_INDEX - 1
                        }
                    }, document.body);
                    this.overlayStyle = (0, _lib.createStyleSheet)(this.component.overlayStyle, document.body);
                    this.overlay.addEventListener("click", function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        _this11.focus();
                    });
                    Array.prototype.slice.call(this.overlay.getElementsByClassName("xcomponent-close")).forEach(function(el) {
                        el.addEventListener("click", function(event) {
                            event.preventDefault();
                            event.stopPropagation();
                            _this11.close();
                        });
                    });
                    this.registerForCleanup(function() {
                        document.body.removeChild(_this11.overlay);
                        document.body.removeChild(_this11.overlayStyle);
                    });
                }
            }, {
                key: "destroy",
                value: function destroy() {
                    this.cleanup();
                }
            }, {
                key: "error",
                value: function error(err) {
                    this.props.onError(err);
                    this.destroy();
                }
            } ]);
            return ParentComponent;
        }(_base.BaseComponent);
    }, /*!*********************************************!*\
  !*** ./~/xcomponent/src/component/props.js ***!
  \*********************************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var internalProps = exports.internalProps = {
            url: {
                type: "string",
                required: false
            },
            env: {
                type: "string",
                required: false
            },
            timeout: {
                type: "number",
                required: false
            },
            onEnter: {
                type: "function",
                required: false,
                noop: true
            },
            onClose: {
                type: "function",
                required: false,
                noop: true,
                once: true,
                defaultProp: "onError"
            },
            onTimeout: {
                type: "function",
                required: false,
                noop: true,
                once: true,
                defaultProp: "onError"
            },
            onError: {
                type: "function",
                required: false,
                def: function def(err) {
                    console.error(err.message, "\n", err.stack || err.toString());
                },
                once: true
            }
        };
    }, /*!***********************************************!*\
  !*** ./~/xcomponent/src/templates/parent.css ***!
  \***********************************************/
    function(module, exports) {
        module.exports = "";
    }, /*!************************************************!*\
  !*** ./~/xcomponent/src/templates/overlay.htm ***!
  \************************************************/
    function(module, exports) {
        module.exports = '<a href="#xcomponent-close" class="xcomponent-close"></a>';
    }, /*!************************************************!*\
  !*** ./~/xcomponent/src/templates/overlay.css ***!
  \************************************************/
    function(module, exports) {
        module.exports = ".xcomponent-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.8);\n}\n\n.xcomponent-overlay.xcomponent-popup {\n    cursor: pointer;\n}\n\n.xcomponent-close {\n    position: absolute;\n    right: 16px;\n    top: 16px;\n    width: 16px;\n    height: 16px;\n    opacity: 0.6;\n}\n\n.xcomponent-close:hover {\n    opacity: 1;\n}\n\n.xcomponent-close:before, .xcomponent-close:after {\n    position: absolute;\n    left: 8px;\n    content: ' ';\n    height: 16px;\n    width: 2px;\n    background-color: white;\n}\n\n.xcomponent-close:before {\n    transform: rotate(45deg);\n}\n\n.xcomponent-close:after {\n    transform: rotate(-45deg);\n}\n";
    }, /*!**************************************************!*\
  !*** ./~/xcomponent/src/templates/component.htm ***!
  \**************************************************/
    function(module, exports) {
        module.exports = "";
    }, /*!**************************************************!*\
  !*** ./~/xcomponent/src/templates/component.css ***!
  \**************************************************/
    function(module, exports) {
        module.exports = "";
    }, /*!*******************************************!*\
  !*** ./~/xcomponent/src/drivers/index.js ***!
  \*******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _script = __webpack_require__(/*! ./script */ 50);
        Object.keys(_script).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _script[key];
                }
            });
        });
        var _react = __webpack_require__(/*! ./react */ 51);
        Object.keys(_react).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _react[key];
                }
            });
        });
        var _angular = __webpack_require__(/*! ./angular */ 52);
        Object.keys(_angular).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _angular[key];
                }
            });
        });
        var _ember = __webpack_require__(/*! ./ember */ 53);
        Object.keys(_ember).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _ember[key];
                }
            });
        });
    }, /*!********************************************!*\
  !*** ./~/xcomponent/src/drivers/script.js ***!
  \********************************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var htmlComponent = exports.htmlComponent = {
            isActive: function isActive() {
                return true;
            },
            register: function register(component) {
                function render(element) {
                    if (!element || !element.tagName || element.tagName.toLowerCase() !== "script") {
                        return;
                    }
                    if (!element.attributes.type || element.attributes.type.value !== "application/x-component") {
                        return;
                    }
                    if (!element.attributes["data-component"] || element.attributes["data-component"].value !== component.tag) {
                        return;
                    }
                    var props;
                    eval("props = " + element.innerText);
                    var container = document.createElement("div");
                    element.parentNode.replaceChild(container, element);
                    component.init(props).render(container);
                }
                function scan() {
                    var scriptTags = Array.prototype.slice.call(document.getElementsByTagName("script"));
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = scriptTags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var element = _step.value;
                            render(element);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator["return"]) {
                                _iterator["return"]();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                scan();
                document.addEventListener("DOMContentLoaded", scan);
                window.addEventListener("load", scan);
                document.addEventListener("DOMNodeInserted", function(event) {
                    render(event.target);
                });
            }
        };
    }, /*!*******************************************!*\
  !*** ./~/xcomponent/src/drivers/react.js ***!
  \*******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.react = undefined;
        var _lib = __webpack_require__(/*! ../lib */ 35);
        var react = exports.react = {
            isActive: function isActive() {
                return Boolean(window.React);
            },
            register: function register(component) {
                component.react = window.React.createClass({
                    render: function render() {
                        return window.React.createElement("div", null);
                    },
                    componentDidMount: function componentDidMount() {
                        var parent = component.init((0, _lib.extend)({}, this.props));
                        this.setState({
                            parent: parent
                        });
                        parent.renderIframe(window.ReactDOM.findDOMNode(this));
                    },
                    componentDidUpdate: function componentDidUpdate() {
                        if (this.state && this.state.parent) {
                            this.state.parent.updateProps((0, _lib.extend)({}, this.props));
                        }
                    }
                });
            }
        };
    }, /*!*********************************************!*\
  !*** ./~/xcomponent/src/drivers/angular.js ***!
  \*********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.angular = undefined;
        var _lib = __webpack_require__(/*! ../lib */ 35);
        var angular = exports.angular = {
            isActive: function isActive() {
                return Boolean(window.angular);
            },
            register: function register(component) {
                var register = (0, _lib.once)(function(moduleName) {
                    window.angular.module(moduleName).directive((0, _lib.dasherizeToCamel)(component.tag), function() {
                        var scope = {};
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;
                        try {
                            for (var _iterator = Object.keys(component.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var key = _step.value;
                                var prop = component.props[key];
                                if (prop.type === "function" || prop.type === "object") {
                                    scope[key] = "=";
                                } else if (prop.type === "string" || prop.type === "boolean" || prop.type === "number") {
                                    scope[key] = "@";
                                } else {
                                    throw new Error("Unrecognized prop type: " + prop.type);
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator["return"]) {
                                    _iterator["return"]();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                        return {
                            scope: scope,
                            controller: function controller($scope, $element) {
                                function getProps() {
                                    var instanceProps = {};
                                    var _iteratorNormalCompletion2 = true;
                                    var _didIteratorError2 = false;
                                    var _iteratorError2 = undefined;
                                    try {
                                        for (var _iterator2 = Object.keys(scope)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                            var key = _step2.value;
                                            instanceProps[key] = $scope[key];
                                        }
                                    } catch (err) {
                                        _didIteratorError2 = true;
                                        _iteratorError2 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                                _iterator2["return"]();
                                            }
                                        } finally {
                                            if (_didIteratorError2) {
                                                throw _iteratorError2;
                                            }
                                        }
                                    }
                                    return instanceProps;
                                }
                                var parent = component.init(getProps());
                                parent.render($element[0]);
                                $scope.$watch(function() {
                                    parent.updateProps(getProps());
                                });
                            }
                        };
                    });
                });
                var bootstrap = window.angular.bootstrap;
                window.angular.bootstrap = function(el, modules) {
                    register(modules[0]);
                    return bootstrap.apply(this, arguments);
                };
                var module = window.angular.module;
                window.angular.module = function(moduleName) {
                    var result = module.apply(this, arguments);
                    register(moduleName);
                    return result;
                };
            }
        };
    }, /*!*******************************************!*\
  !*** ./~/xcomponent/src/drivers/ember.js ***!
  \*******************************************/
    function(module, exports) {
        "use strict";
    }, /*!**********************!*\
  !*** ./src/props.js ***!
  \**********************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var props = exports.props = {
            token: {
                type: "string",
                required: false
            },
            getToken: {
                type: "function",
                required: false,
                denodeify: true
            },
            onPaymentAuthorize: {
                type: "function",
                required: false
            },
            onPaymentComplete: {
                type: "function",
                required: false
            }
        };
    }, /*!***********************!*\
  !*** ./src/button.js ***!
  \***********************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.PayPalButton = undefined;
        var _extends = Object.assign || function(target) {
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
        var _src = __webpack_require__(/*! xcomponent/src */ 2);
        var _src2 = _interopRequireDefault(_src);
        var _props = __webpack_require__(/*! ./props */ 54);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var PayPalButton = exports.PayPalButton = _src2["default"].create({
            tag: "paypal-button",
            defaultEnv: "production",
            envUrls: {
                local: "http://todo",
                production: "https://todo"
            },
            props: _extends({}, _props.props, {
                submitForm: {
                    type: "boolean",
                    def: false
                }
            }),
            dimensions: {
                width: 100,
                height: 50
            }
        });
    } ]);
});

