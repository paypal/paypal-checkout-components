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
        var _components = __webpack_require__(/*! ./components */ 1);
        Object.keys(_components).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _components[key];
                }
            });
        });
        var _legacy = __webpack_require__(/*! ./legacy */ 72);
        Object.keys(_legacy).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _legacy[key];
                }
            });
        });
    }, /*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _button = __webpack_require__(/*! ./button */ 2);
        Object.keys(_button).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _button[key];
                }
            });
        });
        var _checkout = __webpack_require__(/*! ./checkout */ 69);
        Object.keys(_checkout).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _checkout[key];
                }
            });
        });
    }, /*!****************************************!*\
  !*** ./src/components/button/index.js ***!
  \****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _component = __webpack_require__(/*! ./component */ 3);
        Object.keys(_component).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _component[key];
                }
            });
        });
    }, /*!********************************************!*\
  !*** ./src/components/button/component.js ***!
  \********************************************/
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
        var _src = __webpack_require__(/*! xcomponent/src */ 4);
        var _src2 = _interopRequireDefault(_src);
        var _props = __webpack_require__(/*! ../props */ 68);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var PayPalButton = exports.PayPalButton = _src2["default"].create({
            tag: "paypal-button",
            name: "ppbtn",
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
    }, /*!***********************************!*\
  !*** ./~/xcomponent/src/index.js ***!
  \***********************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.create = create;
        var _error = __webpack_require__(/*! ./error */ 5);
        Object.keys(_error).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _error[key];
                }
            });
        });
        var _src = __webpack_require__(/*! post-robot/src */ 6);
        var _src2 = _interopRequireDefault(_src);
        var _component = __webpack_require__(/*! ./component */ 33);
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
        var _interface = __webpack_require__(/*! ./interface */ 7);
        Object.keys(_interface).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _interface[key];
                }
            });
        });
        var _lib = __webpack_require__(/*! ./lib */ 18);
        Object.defineProperty(exports, "Promise", {
            enumerable: true,
            get: function get() {
                return _lib.Promise;
            }
        });
        var _conf = __webpack_require__(/*! ./conf */ 9);
        var _drivers = __webpack_require__(/*! ./drivers */ 16);
        var _compat = __webpack_require__(/*! ./compat */ 22);
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
        var _client = __webpack_require__(/*! ./client */ 8);
        Object.keys(_client).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _client[key];
                }
            });
        });
        var _server = __webpack_require__(/*! ./server */ 30);
        Object.keys(_server).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _server[key];
                }
            });
        });
        var _proxy = __webpack_require__(/*! ./proxy */ 31);
        Object.keys(_proxy).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _proxy[key];
                }
            });
        });
        var _config = __webpack_require__(/*! ./config */ 32);
        Object.keys(_config).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _config[key];
                }
            });
        });
        var _drivers = __webpack_require__(/*! ../drivers */ 16);
        Object.defineProperty(exports, "reset", {
            enumerable: true,
            get: function get() {
                return _drivers.resetListeners;
            }
        });
        var _bridge = __webpack_require__(/*! ../compat/bridge */ 23);
        Object.defineProperty(exports, "openBridge", {
            enumerable: true,
            get: function get() {
                return _bridge.openBridge;
            }
        });
        var _util = __webpack_require__(/*! ../lib/util */ 13);
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
        var _conf = __webpack_require__(/*! ../conf */ 9);
        var _drivers = __webpack_require__(/*! ../drivers */ 16);
        var _lib = __webpack_require__(/*! ../lib */ 18);
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
        var _config = __webpack_require__(/*! ./config */ 10);
        Object.keys(_config).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _config[key];
                }
            });
        });
        var _constants = __webpack_require__(/*! ./constants */ 11);
        Object.keys(_constants).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _constants[key];
                }
            });
        });
        var _id = __webpack_require__(/*! ./id */ 12);
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
        var _constants = __webpack_require__(/*! ./constants */ 11);
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
        var _util = __webpack_require__(/*! ../lib/util */ 13);
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
        var _conf = __webpack_require__(/*! ../conf */ 9);
        var _promise = __webpack_require__(/*! ./promise */ 14);
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
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 15);
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
        var _receive = __webpack_require__(/*! ./receive */ 17);
        Object.keys(_receive).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _receive[key];
                }
            });
        });
        var _send = __webpack_require__(/*! ./send */ 26);
        Object.keys(_send).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _send[key];
                }
            });
        });
        var _listeners = __webpack_require__(/*! ./listeners */ 28);
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
        var _conf = __webpack_require__(/*! ../../conf */ 9);
        var _lib = __webpack_require__(/*! ../../lib */ 18);
        var _compat = __webpack_require__(/*! ../../compat */ 22);
        var _send = __webpack_require__(/*! ../send */ 26);
        var _listeners = __webpack_require__(/*! ../listeners */ 28);
        var _types = __webpack_require__(/*! ./types */ 29);
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
        var _promise = __webpack_require__(/*! ./promise */ 14);
        Object.keys(_promise).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _promise[key];
                }
            });
        });
        var _util = __webpack_require__(/*! ./util */ 13);
        Object.keys(_util).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _util[key];
                }
            });
        });
        var _windows = __webpack_require__(/*! ./windows */ 19);
        Object.keys(_windows).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _windows[key];
                }
            });
        });
        var _methods = __webpack_require__(/*! ./methods */ 20);
        Object.keys(_methods).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _methods[key];
                }
            });
        });
        var _tick = __webpack_require__(/*! ./tick */ 21);
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
        var _conf = __webpack_require__(/*! ../conf */ 9);
        var _util = __webpack_require__(/*! ./util */ 13);
        var _interface = __webpack_require__(/*! ../interface */ 7);
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
        var _conf = __webpack_require__(/*! ../conf */ 9);
        var _util = __webpack_require__(/*! ./util */ 13);
        var _interface = __webpack_require__(/*! ../interface */ 7);
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
        var _bridge = __webpack_require__(/*! ./bridge */ 23);
        Object.keys(_bridge).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _bridge[key];
                }
            });
        });
        var _global = __webpack_require__(/*! ./global */ 24);
        Object.keys(_global).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _global[key];
                }
            });
        });
        var _ie = __webpack_require__(/*! ./ie */ 25);
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
        var _conf = __webpack_require__(/*! ../conf */ 9);
        var _lib = __webpack_require__(/*! ../lib */ 18);
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
        var _conf = __webpack_require__(/*! ../conf */ 9);
        var _lib = __webpack_require__(/*! ../lib */ 18);
        var _drivers = __webpack_require__(/*! ../drivers */ 16);
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
        var _conf = __webpack_require__(/*! ../conf */ 9);
        var _lib = __webpack_require__(/*! ../lib */ 18);
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
        var _conf = __webpack_require__(/*! ../../conf */ 9);
        var _lib = __webpack_require__(/*! ../../lib */ 18);
        var _strategies = __webpack_require__(/*! ./strategies */ 27);
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
                console.error("window is closed");
                console.error(message);
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
        var _conf = __webpack_require__(/*! ../../conf */ 9);
        var _lib = __webpack_require__(/*! ../../lib */ 18);
        var _compat = __webpack_require__(/*! ../../compat */ 22);
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
        var _lib = __webpack_require__(/*! ../lib */ 18);
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
        var _conf = __webpack_require__(/*! ../../conf */ 9);
        var _lib = __webpack_require__(/*! ../../lib */ 18);
        var _send = __webpack_require__(/*! ../send */ 26);
        var _listeners = __webpack_require__(/*! ../listeners */ 28);
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
                }, data), "*");
            }
            return respond({
                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
            }).then(function() {
                return _lib.promise.run(function() {
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
            })["catch"](function(err) {
                if (options && options.handleError) {
                    return options.handleError(err);
                } else {
                    console.error(err.stack || err.toString());
                }
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
        var _conf = __webpack_require__(/*! ../conf */ 9);
        var _lib = __webpack_require__(/*! ../lib */ 18);
        var _drivers = __webpack_require__(/*! ../drivers */ 16);
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
        var _drivers = __webpack_require__(/*! ../drivers */ 16);
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
        var _conf = __webpack_require__(/*! ../conf */ 9);
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
        var _component = __webpack_require__(/*! ./component */ 34);
        Object.keys(_component).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _component[key];
                }
            });
        });
        var _parent = __webpack_require__(/*! ./parent */ 55);
        Object.keys(_parent).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _parent[key];
                }
            });
        });
        var _child = __webpack_require__(/*! ./child */ 45);
        Object.keys(_child).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _child[key];
                }
            });
        });
    }, /*!*******************************************************!*\
  !*** ./~/xcomponent/src/component/component/index.js ***!
  \*******************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.Component = exports.components = undefined;
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
        var _client = __webpack_require__(/*! beaver-logger/client */ 35);
        var _client2 = _interopRequireDefault(_client);
        var _child = __webpack_require__(/*! ../child */ 45);
        var _parent = __webpack_require__(/*! ../parent */ 55);
        var _props = __webpack_require__(/*! ./props */ 59);
        var _constants = __webpack_require__(/*! ../../constants */ 53);
        var _validate2 = __webpack_require__(/*! ./validate */ 60);
        var _parent2 = __webpack_require__(/*! ./templates/parent.htm */ 61);
        var _parent3 = _interopRequireDefault(_parent2);
        var _component = __webpack_require__(/*! ./templates/component.htm */ 62);
        var _component2 = _interopRequireDefault(_component);
        var _drivers = __webpack_require__(/*! ../../drivers */ 63);
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
                if (options.dimensions) {
                    if (typeof options.dimensions.width !== "number") {
                        throw new Error("[" + options.tag + "] Expected options.dimensions.width to be a number");
                    }
                    if (typeof options.dimensions.height !== "number") {
                        throw new Error("[" + options.tag + "] Expected options.dimensions.height to be a number");
                    }
                }
                this.tag = options.tag;
                this.name = options.name || options.tag.replace(/-/g, "_");
                this.props = _extends({}, options.props, _props.internalProps);
                this.dimensions = options.dimensions || {};
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
                this.parentTemplate = options.parentTemplate || _parent3["default"];
                this.componentTemplate = options.componentTemplate || _component2["default"];
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
                    return (0, _validate2.validate)(options);
                }
            }, {
                key: "log",
                value: function log(event, payload) {
                    _client2["default"].info("xc_" + this.name + "_" + event, payload);
                }
            }, {
                key: "logWarning",
                value: function logWarning(event, payload) {
                    _client2["default"].warn("xc_" + this.name + "_" + event, payload);
                }
            }, {
                key: "logError",
                value: function logError(event, payload) {
                    _client2["default"].error("xc_" + this.name + "_" + event, payload);
                }
            } ]);
            return Component;
        }();
    }, /*!*****************************************!*\
  !*** ./~/beaver-logger/client/index.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _logger = __webpack_require__(/*! ./logger */ 36);
        Object.keys(_logger).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _logger[key];
                }
            });
        });
        var _init = __webpack_require__(/*! ./init */ 42);
        Object.keys(_init).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _init[key];
                }
            });
        });
        var _transitions = __webpack_require__(/*! ./transitions */ 44);
        Object.keys(_transitions).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _transitions[key];
                }
            });
        });
        var _builders = __webpack_require__(/*! ./builders */ 40);
        Object.keys(_builders).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _builders[key];
                }
            });
        });
        exports["default"] = module.exports;
    }, /*!******************************************!*\
  !*** ./~/beaver-logger/client/logger.js ***!
  \******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.flush = exports.tracking = exports.buffer = undefined;
        exports.print = print;
        exports.immediateFlush = immediateFlush;
        exports.log = log;
        exports.debug = debug;
        exports.info = info;
        exports.warn = warn;
        exports.error = error;
        exports.track = track;
        var _util = __webpack_require__(/*! ./util */ 37);
        var _builders = __webpack_require__(/*! ./builders */ 40);
        var _config = __webpack_require__(/*! ./config */ 41);
        var buffer = exports.buffer = [];
        var tracking = exports.tracking = {};
        function print(level, event, payload) {
            if (!window.console || !window.console.log) {
                return;
            }
            payload = payload || {};
            var args = [ event ];
            args.push(payload);
            if (payload.error || payload.warning) {
                args.push("\n\n", payload.error || payload.warning);
            }
            (window.console[level] || window.console.log).apply(window.console, args);
        }
        function immediateFlush() {
            var async = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
            if (!_config.config.uri) {
                return;
            }
            var hasBuffer = buffer.length;
            var hasTracking = Object.keys(tracking).length;
            if (!hasBuffer && !hasTracking) {
                return;
            }
            if (hasTracking) {
                print("info", "tracking", tracking);
            }
            var meta = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = _builders.metaBuilders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var builder = _step.value;
                    try {
                        (0, _util.extend)(meta, builder(), false);
                    } catch (err) {
                        console.error("Error in custom meta builder:", err.stack || err.toString());
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
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;
            try {
                for (var _iterator2 = _builders.trackingBuilders[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _builder = _step2.value;
                    try {
                        (0, _util.extend)(tracking, _builder(), false);
                    } catch (err) {
                        console.error("Error in custom tracking builder:", err.stack || err.toString());
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
            var headers = {};
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;
            try {
                for (var _iterator3 = _builders.headerBuilders[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _builder2 = _step3.value;
                    try {
                        (0, _util.extend)(headers, _builder2(), false);
                    } catch (err) {
                        console.error("Error in custom header builder:", err.stack || err.toString());
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
            var events = buffer;
            var req = (0, _util.ajax)("post", _config.config.uri, headers, {
                events: events,
                meta: meta,
                tracking: tracking
            }, async);
            exports.buffer = buffer = [];
            exports.tracking = tracking = {};
            return req;
        }
        var flush = exports.flush = (0, _util.promiseDebounce)(immediateFlush, _config.config.debounceInterval);
        function enqueue(level, event, payload) {
            buffer.push({
                level: level,
                event: event,
                payload: payload
            });
            if (_config.config.autoLog.indexOf(level) > -1) {
                flush();
            }
        }
        function log(level, event, payload) {
            payload = payload || {};
            if (typeof payload === "string") {
                payload = {
                    message: payload
                };
            } else if (payload instanceof Error) {
                payload = {
                    error: payload.stack || payload.toString()
                };
            }
            payload.timestamp = Date.now();
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;
            try {
                for (var _iterator4 = _builders.payloadBuilders[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var builder = _step4.value;
                    try {
                        (0, _util.extend)(payload, builder(), false);
                    } catch (err) {
                        console.error("Error in custom payload builder:", err.stack || err.toString());
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
            print(level, event, payload);
            if (buffer.length === _config.config.sizeLimit) {
                enqueue("info", "logger_max_buffer_length");
            } else if (buffer.length < _config.config.sizeLimit) {
                enqueue(level, event, payload);
            }
        }
        function debug(event, payload) {
            return log("debug", event, payload);
        }
        function info(event, payload) {
            return log("info", event, payload);
        }
        function warn(event, payload) {
            return log("warn", event, payload);
        }
        function error(event, payload) {
            return log("error", event, payload);
        }
        function track(payload) {
            (0, _util.extend)(tracking, payload || {}, false);
        }
    }, /*!****************************************!*\
  !*** ./~/beaver-logger/client/util.js ***!
  \****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.windowReady = undefined;
        exports.extend = extend;
        exports.isSameDomain = isSameDomain;
        exports.ajax = ajax;
        exports.promiseDebounce = promiseDebounce;
        exports.safeInterval = safeInterval;
        exports.uniqueID = uniqueID;
        var _es6PromiseMin = __webpack_require__(/*! es6-promise-min */ 38);
        function extend(dest, src) {
            var over = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
            dest = dest || {};
            src = src || {};
            for (var i in src) {
                if (src.hasOwnProperty(i)) {
                    if (over || !dest.hasOwnProperty(i)) {
                        dest[i] = src[i];
                    }
                }
            }
            return dest;
        }
        function isSameDomain(url) {
            var match = url.match(/https?:\/\/[^\/]+/);
            if (!match) {
                return true;
            }
            return match[0] === window.location.protocol + "//" + window.location.host;
        }
        function ajax(method, url) {
            var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            var data = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
            var async = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
            return new _es6PromiseMin.Promise(function(resolve) {
                var XRequest = window.XMLHttpRequest || window.ActiveXObject;
                if (window.XDomainRequest && !isSameDomain(url)) {
                    XRequest = window.XDomainRequest;
                }
                var req = new XRequest("MSXML2.XMLHTTP.3.0");
                req.open(method.toUpperCase(), url, async);
                req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                req.setRequestHeader("Content-type", "application/json");
                for (var headerName in headers) {
                    if (headers.hasOwnProperty(headerName)) {
                        req.setRequestHeader(headerName, headers[headerName]);
                    }
                }
                req.onreadystatechange = function() {
                    if (req.readyState > 3) {
                        resolve();
                    }
                };
                req.send(JSON.stringify(data).replace(/&/g, "%26"));
            });
        }
        function promiseDebounce(method, interval) {
            var debounce = {};
            return function() {
                var args = arguments;
                if (debounce.timeout) {
                    clearTimeout(debounce.timeout);
                    delete debounce.timeout;
                }
                debounce.timeout = setTimeout(function() {
                    var resolver = debounce.resolver;
                    var rejector = debounce.rejector;
                    delete debounce.promise;
                    delete debounce.resolver;
                    delete debounce.rejector;
                    delete debounce.timeout;
                    return _es6PromiseMin.Promise.resolve().then(function() {
                        return method.apply(null, args);
                    }).then(resolver, rejector);
                }, interval);
                debounce.promise = debounce.promise || new _es6PromiseMin.Promise(function(resolver, rejector) {
                    debounce.resolver = resolver;
                    debounce.rejector = rejector;
                });
                return debounce.promise;
            };
        }
        var windowReady = exports.windowReady = new _es6PromiseMin.Promise(function(resolve) {
            if (document.readyState === "complete") {
                resolve();
            }
            window.addEventListener("load", resolve);
        });
        function safeInterval(method, time) {
            var timeout = void 0;
            function loop() {
                timeout = setTimeout(function() {
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
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            });
        }
    }, /*!***************************************************!*\
  !*** ./~/es6-promise-min/dist/es6-promise.min.js ***!
  \***************************************************/
    function(module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        (function(process, global) {
            "use strict";
            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };
            /*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.0.1
	 */
            (function() {
                function r(a, b) {
                    n[l] = a;
                    n[l + 1] = b;
                    l += 2;
                    2 === l && A();
                }
                function s(a) {
                    return "function" === typeof a;
                }
                function F() {
                    return function() {
                        process.nextTick(t);
                    };
                }
                function G() {
                    var a = 0, b = new B(t), c = document.createTextNode("");
                    b.observe(c, {
                        characterData: !0
                    });
                    return function() {
                        c.data = a = ++a % 2;
                    };
                }
                function H() {
                    var a = new MessageChannel();
                    a.port1.onmessage = t;
                    return function() {
                        a.port2.postMessage(0);
                    };
                }
                function I() {
                    return function() {
                        setTimeout(t, 1);
                    };
                }
                function t() {
                    for (var a = 0; a < l; a += 2) {
                        (0, n[a])(n[a + 1]), n[a] = void 0, n[a + 1] = void 0;
                    }
                    l = 0;
                }
                function p() {}
                function J(a, b, c, d) {
                    try {
                        a.call(b, c, d);
                    } catch (e) {
                        return e;
                    }
                }
                function K(a, b, c) {
                    r(function(a) {
                        var e = !1, f = J(c, b, function(c) {
                            e || (e = !0, b !== c ? q(a, c) : m(a, c));
                        }, function(b) {
                            e || (e = !0, g(a, b));
                        });
                        !e && f && (e = !0, g(a, f));
                    }, a);
                }
                function L(a, b) {
                    1 === b.a ? m(a, b.b) : 2 === a.a ? g(a, b.b) : u(b, void 0, function(b) {
                        q(a, b);
                    }, function(b) {
                        g(a, b);
                    });
                }
                function q(a, b) {
                    if (a === b) g(a, new TypeError("You cannot resolve a promise with itself")); else if ("function" === typeof b || "object" === (typeof b === "undefined" ? "undefined" : _typeof(b)) && null !== b) {
                        if (b.constructor === a.constructor) L(a, b); else {
                            var c;
                            try {
                                c = b.then;
                            } catch (d) {
                                v.error = d, c = v;
                            }
                            c === v ? g(a, v.error) : void 0 === c ? m(a, b) : s(c) ? K(a, b, c) : m(a, b);
                        }
                    } else m(a, b);
                }
                function M(a) {
                    a.f && a.f(a.b);
                    x(a);
                }
                function m(a, b) {
                    void 0 === a.a && (a.b = b, a.a = 1, 0 !== a.e.length && r(x, a));
                }
                function g(a, b) {
                    void 0 === a.a && (a.a = 2, a.b = b, r(M, a));
                }
                function u(a, b, c, d) {
                    var e = a.e, f = e.length;
                    a.f = null;
                    e[f] = b;
                    e[f + 1] = c;
                    e[f + 2] = d;
                    0 === f && a.a && r(x, a);
                }
                function x(a) {
                    var b = a.e, c = a.a;
                    if (0 !== b.length) {
                        for (var d, e, f = a.b, g = 0; g < b.length; g += 3) {
                            d = b[g], e = b[g + c], d ? C(c, d, e, f) : e(f);
                        }
                        a.e.length = 0;
                    }
                }
                function D() {
                    this.error = null;
                }
                function C(a, b, c, d) {
                    var e = s(c), f, k, h, l;
                    if (e) {
                        try {
                            f = c(d);
                        } catch (n) {
                            y.error = n, f = y;
                        }
                        f === y ? (l = !0, k = f.error, f = null) : h = !0;
                        if (b === f) {
                            g(b, new TypeError("A promises callback cannot return that same promise."));
                            return;
                        }
                    } else f = d, h = !0;
                    void 0 === b.a && (e && h ? q(b, f) : l ? g(b, k) : 1 === a ? m(b, f) : 2 === a && g(b, f));
                }
                function N(a, b) {
                    try {
                        b(function(b) {
                            q(a, b);
                        }, function(b) {
                            g(a, b);
                        });
                    } catch (c) {
                        g(a, c);
                    }
                }
                function k(a, b, c, d) {
                    this.n = a;
                    this.c = new a(p, d);
                    this.i = c;
                    this.o(b) ? (this.m = b, this.d = this.length = b.length, this.l(), 0 === this.length ? m(this.c, this.b) : (this.length = this.length || 0, 
                    this.k(), 0 === this.d && m(this.c, this.b))) : g(this.c, this.p());
                }
                function h(a) {
                    O++;
                    this.b = this.a = void 0;
                    this.e = [];
                    if (p !== a) {
                        if (!s(a)) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                        if (!(this instanceof h)) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                        N(this, a);
                    }
                }
                var E = Array.isArray ? Array.isArray : function(a) {
                    return "[object Array]" === Object.prototype.toString.call(a);
                }, l = 0, w = "undefined" !== typeof window ? window : {}, B = w.MutationObserver || w.WebKitMutationObserver, w = "undefined" !== typeof Uint8ClampedArray && "undefined" !== typeof importScripts && "undefined" !== typeof MessageChannel, n = Array(1e3), A;
                A = "undefined" !== typeof process && "[object process]" === {}.toString.call(process) ? F() : B ? G() : w ? H() : I();
                var v = new D(), y = new D();
                k.prototype.o = function(a) {
                    return E(a);
                };
                k.prototype.p = function() {
                    return Error("Array Methods must be provided an Array");
                };
                k.prototype.l = function() {
                    this.b = Array(this.length);
                };
                k.prototype.k = function() {
                    for (var a = this.length, b = this.c, c = this.m, d = 0; void 0 === b.a && d < a; d++) {
                        this.j(c[d], d);
                    }
                };
                k.prototype.j = function(a, b) {
                    var c = this.n;
                    "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a ? a.constructor === c && void 0 !== a.a ? (a.f = null, 
                    this.g(a.a, b, a.b)) : this.q(c.resolve(a), b) : (this.d--, this.b[b] = this.h(a));
                };
                k.prototype.g = function(a, b, c) {
                    var d = this.c;
                    void 0 === d.a && (this.d--, this.i && 2 === a ? g(d, c) : this.b[b] = this.h(c));
                    0 === this.d && m(d, this.b);
                };
                k.prototype.h = function(a) {
                    return a;
                };
                k.prototype.q = function(a, b) {
                    var c = this;
                    u(a, void 0, function(a) {
                        c.g(1, b, a);
                    }, function(a) {
                        c.g(2, b, a);
                    });
                };
                var O = 0;
                h.all = function(a, b) {
                    return new k(this, a, !0, b).c;
                };
                h.race = function(a, b) {
                    function c(a) {
                        q(e, a);
                    }
                    function d(a) {
                        g(e, a);
                    }
                    var e = new this(p, b);
                    if (!E(a)) return g(e, new TypeError("You must pass an array to race.")), e;
                    for (var f = a.length, h = 0; void 0 === e.a && h < f; h++) {
                        u(this.resolve(a[h]), void 0, c, d);
                    }
                    return e;
                };
                h.resolve = function(a, b) {
                    if (a && "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && a.constructor === this) return a;
                    var c = new this(p, b);
                    q(c, a);
                    return c;
                };
                h.reject = function(a, b) {
                    var c = new this(p, b);
                    g(c, a);
                    return c;
                };
                h.prototype = {
                    constructor: h,
                    then: function then(a, b) {
                        var c = this.a;
                        if (1 === c && !a || 2 === c && !b) return this;
                        var d = new this.constructor(p), e = this.b;
                        if (c) {
                            var f = arguments[c - 1];
                            r(function() {
                                C(c, d, f, e);
                            });
                        } else u(this, d, a, b);
                        return d;
                    },
                    "catch": function _catch(a) {
                        return this.then(null, a);
                    }
                };
                var z = {
                    Promise: h,
                    polyfill: function polyfill() {
                        var a;
                        a = "undefined" !== typeof global ? global : "undefined" !== typeof window && window.document ? window : self;
                        "Promise" in a && "resolve" in a.Promise && "reject" in a.Promise && "all" in a.Promise && "race" in a.Promise && function() {
                            var b;
                            new a.Promise(function(a) {
                                b = a;
                            });
                            return s(b);
                        }() || (a.Promise = h);
                    }
                };
                true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                    return z;
                }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" !== typeof module && module.exports ? module.exports = z : "undefined" !== typeof this && (this.ES6Promise = z);
            }).call(undefined);
        }).call(exports, __webpack_require__(/*! ./~/process/browser.js */ 39), function() {
            return this;
        }());
    }, /*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
    function(module, exports) {
        "use strict";
        var process = module.exports = {};
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }
        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = setTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            clearTimeout(timeout);
        }
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                setTimeout(drainQueue, 0);
            }
        };
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.binding = function(name) {
            throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
            return "/";
        };
        process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
            return 0;
        };
    }, /*!********************************************!*\
  !*** ./~/beaver-logger/client/builders.js ***!
  \********************************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.addPayloadBuilder = addPayloadBuilder;
        exports.addMetaBuilder = addMetaBuilder;
        exports.addTrackingBuilder = addTrackingBuilder;
        exports.addHeaderBuilder = addHeaderBuilder;
        var payloadBuilders = exports.payloadBuilders = [];
        var metaBuilders = exports.metaBuilders = [];
        var trackingBuilders = exports.trackingBuilders = [];
        var headerBuilders = exports.headerBuilders = [];
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
    }, /*!******************************************!*\
  !*** ./~/beaver-logger/client/config.js ***!
  \******************************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var config = exports.config = {
            uri: "",
            initial_state_name: "init",
            flushInterval: 10 * 60 * 1e3,
            debounceInterval: 10,
            sizeLimit: 300,
            heartbeat: true,
            heartbeatConsoleLog: true,
            heartbeatInterval: 5e3,
            hearbeatMaxThreshold: 50,
            heartbeatTooBusyThreshold: 1e4,
            autoLog: [ "warn", "error" ],
            logUnload: true,
            logUnloadSync: false,
            logPerformance: true
        };
    }, /*!****************************************!*\
  !*** ./~/beaver-logger/client/init.js ***!
  \****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.init = init;
        var _config = __webpack_require__(/*! ./config */ 41);
        var _util = __webpack_require__(/*! ./util */ 37);
        var _performance = __webpack_require__(/*! ./performance */ 43);
        var _logger = __webpack_require__(/*! ./logger */ 36);
        var initiated = false;
        function init(conf) {
            (0, _util.extend)(_config.config, conf || {});
            if (initiated) {
                return;
            }
            initiated = true;
            if (_config.config.logPerformance) {
                (0, _performance.initPerformance)();
            }
            if (_config.config.heartbeat) {
                (0, _performance.initHeartBeat)();
            }
            if (_config.config.logUnload) {
                (function() {
                    var async = !_config.config.logUnloadSync;
                    window.addEventListener("beforeunload", function() {
                        (0, _logger.info)("window_beforeunload");
                        (0, _logger.immediateFlush)(async);
                    });
                    window.addEventListener("unload", function() {
                        (0, _logger.info)("window_unload");
                        (0, _logger.immediateFlush)(async);
                    });
                })();
            }
            if (_config.config.flushInterval) {
                setInterval(_logger.flush, _config.config.flushInterval);
            }
            if (window.beaverLogQueue) {
                window.beaverLogQueue.forEach(function(payload) {
                    (0, _logger.log)(payload.level, payload.event, payload);
                });
                delete window.beaverLogQueue;
            }
        }
    }, /*!***********************************************!*\
  !*** ./~/beaver-logger/client/performance.js ***!
  \***********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.reqTimer = exports.clientTimer = undefined;
        exports.now = now;
        exports.reqStartElapsed = reqStartElapsed;
        exports.initHeartBeat = initHeartBeat;
        exports.initPerformance = initPerformance;
        var _config = __webpack_require__(/*! ./config */ 41);
        var _logger = __webpack_require__(/*! ./logger */ 36);
        var _builders = __webpack_require__(/*! ./builders */ 40);
        var _util = __webpack_require__(/*! ./util */ 37);
        var enablePerformance = window && window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0;
        function now() {
            if (enablePerformance) {
                return performance.now();
            } else {
                return Date.now();
            }
        }
        function timer(startTime) {
            startTime = startTime !== undefined ? startTime : now();
            return {
                startTime: startTime,
                elapsed: function elapsed() {
                    return parseInt(now() - startTime, 10);
                },
                reset: function reset() {
                    startTime = now();
                }
            };
        }
        function reqStartElapsed() {
            if (enablePerformance) {
                var timing = window.performance.timing;
                return parseInt(timing.connectEnd - timing.navigationStart, 10);
            }
        }
        var clientTimer = exports.clientTimer = timer();
        var reqTimer = exports.reqTimer = timer(reqStartElapsed());
        function initHeartBeat() {
            var heartBeatTimer = timer();
            var heartbeatCount = 0;
            (0, _util.safeInterval)(function() {
                if (!_logger.buffer.length || _logger.buffer[_logger.buffer.length - 1].event !== "heartbeat") {
                    heartbeatCount = 0;
                }
                if (!_logger.buffer.length || heartbeatCount > _config.config.hearbeatMaxThreshold) {
                    return;
                }
                heartbeatCount += 1;
                var elapsed = heartBeatTimer.elapsed();
                var lag = elapsed - _config.config.heartbeatInterval;
                if (lag >= _config.config.heartbeatTooBusyThreshold) {
                    (0, _logger.info)("toobusy", {
                        count: heartbeatCount,
                        elapsed: elapsed,
                        lag: lag
                    }, {
                        noConsole: !_config.config.heartbeatConsoleLog
                    });
                }
                (0, _logger.info)("heartbeat", {
                    count: heartbeatCount,
                    elapsed: elapsed,
                    lag: lag
                }, {
                    noConsole: !_config.config.heartbeatConsoleLog
                });
            }, _config.config.heartbeatInterval);
        }
        function initPerformance() {
            if (!enablePerformance) {
                return (0, _logger.info)("no_performance_data");
            }
            (0, _builders.addPayloadBuilder)(function() {
                var payload = {};
                payload.client_elapsed = clientTimer.elapsed();
                if (enablePerformance) {
                    payload.req_elapsed = reqTimer.elapsed();
                }
                return payload;
            });
            _util.windowReady.then(function() {
                var keys = [ "connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart" ];
                var timing = {};
                keys.forEach(function(key) {
                    timing[key] = parseInt(window.performance.timing[key], 10) || 0;
                });
                var offset = timing.connectEnd - timing.navigationStart;
                if (timing.connectEnd) {
                    Object.keys(timing).forEach(function(name) {
                        var time = timing[name];
                        if (time) {
                            (0, _logger.info)("timing_" + name, {
                                client_elapsed: parseInt(time - timing.connectEnd - (clientTimer.startTime - offset), 10),
                                req_elapsed: parseInt(time - timing.connectEnd, 10)
                            });
                        }
                    });
                }
                (0, _logger.info)("timing", timing);
                (0, _logger.info)("memory", window.performance.memory);
                (0, _logger.info)("navigation", window.performance.navigation);
                if (window.performance.getEntries) {
                    window.performance.getEntries().forEach(function(resource) {
                        if ([ "link", "script", "img", "css" ].indexOf(resource.initiatorType) > -1) {
                            (0, _logger.info)(resource.initiatorType, resource);
                        }
                    });
                }
            });
        }
    }, /*!***********************************************!*\
  !*** ./~/beaver-logger/client/transitions.js ***!
  \***********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.startTransition = startTransition;
        exports.endTransition = endTransition;
        exports.transition = transition;
        var _performance = __webpack_require__(/*! ./performance */ 43);
        var _logger = __webpack_require__(/*! ./logger */ 36);
        var _builders = __webpack_require__(/*! ./builders */ 40);
        var _util = __webpack_require__(/*! ./util */ 37);
        var _config = __webpack_require__(/*! ./config */ 41);
        var windowID = (0, _util.uniqueID)();
        var pageID = (0, _util.uniqueID)();
        var currentState = _config.config.initial_state_name;
        var startTime = void 0;
        function startTransition() {
            startTime = (0, _performance.now)();
        }
        function endTransition(toState) {
            startTime = startTime || (0, _performance.reqStartElapsed)();
            var currentTime = (0, _performance.now)();
            var elapsedTime = void 0;
            if (startTime !== undefined) {
                elapsedTime = parseInt(currentTime - startTime, 0);
            }
            var transitionName = "transition_" + currentState + "_to_" + toState;
            (0, _logger.info)(transitionName, {
                duration: elapsedTime
            });
            (0, _logger.track)({
                transition: transitionName,
                transition_time: elapsedTime
            });
            (0, _logger.immediateFlush)();
            startTime = currentTime;
            currentState = toState;
            pageID = (0, _util.uniqueID)();
        }
        function transition(toState) {
            startTransition();
            endTransition(toState);
        }
        (0, _builders.addPayloadBuilder)(function() {
            return {
                windowID: windowID,
                pageID: pageID
            };
        });
        (0, _builders.addMetaBuilder)(function() {
            return {
                state: "ui_" + currentState
            };
        });
    }, /*!***************************************************!*\
  !*** ./~/xcomponent/src/component/child/index.js ***!
  \***************************************************/
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
        var _src = __webpack_require__(/*! post-robot/src */ 6);
        var _src2 = _interopRequireDefault(_src);
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 15);
        var _base = __webpack_require__(/*! ../base */ 46);
        var _window = __webpack_require__(/*! ../window */ 52);
        var _lib = __webpack_require__(/*! ../../lib */ 47);
        var _constants = __webpack_require__(/*! ../../constants */ 53);
        var _error = __webpack_require__(/*! ../../error */ 5);
        var _props = __webpack_require__(/*! ../props */ 54);
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
                _this.component.log("construct_child");
                _this.validate(options);
                _this.onEnter = _this.tryCatch(options.onEnter || _lib.noop);
                _this.onClose = _this.tryCatch(options.onClose || _lib.noop);
                _this.onProps = _this.tryCatch(options.onProps || _lib.noop, false);
                _this.onError = _this.tryCatch(options.onError || function(err) {
                    throw err;
                });
                _this.props = (0, _props.normalizeProps)(_this.component, _this, options.defaultProps || {});
                _this.standalone = options.standalone;
                return _this;
            }
            _createClass(ChildComponent, [ {
                key: "init",
                value: function init() {
                    var _this2 = this;
                    this.component.log("init_child");
                    try {
                        this.setWindows();
                    } catch (err) {
                        if (this.standalone) {
                            this.component.log("child_standalone");
                            return;
                        }
                        throw err;
                    }
                    if (this.standalone && !(0, _window.getParentComponentWindow)()) {
                        return _promise.SyncPromise.resolve();
                    }
                    this.listen((0, _window.getParentComponentWindow)());
                    if ((0, _lib.getParentWindow)() !== (0, _window.getParentComponentWindow)()) {
                        this.listen((0, _lib.getParentWindow)());
                    }
                    return this.sendToParentComponent(_constants.POST_MESSAGE.INIT).then(function(data) {
                        _this2.context = data.context;
                        (0, _lib.extend)(_this2.props, data.props);
                        _this2.onEnter.call(_this2);
                        _this2.onProps.call(_this2);
                    })["catch"](function(err) {
                        return _this2.onError(err);
                    });
                }
            }, {
                key: "sendToParent",
                value: function sendToParent(name, data) {
                    this.component.log("send_to_parent_" + name);
                    return _src2["default"].send((0, _lib.getParentWindow)(), name, data);
                }
            }, {
                key: "sendToParentComponent",
                value: function sendToParentComponent(name, data) {
                    this.component.log("send_to_parent_component_" + name);
                    return _src2["default"].send((0, _window.getParentComponentWindow)(), name, data);
                }
            }, {
                key: "setWindows",
                value: function setWindows() {
                    if (window.__activeXComponent__) {
                        throw new Error("[" + this.component.tag + "] Can not attach multiple components to the same window");
                    }
                    window.__activeXComponent__ = this;
                    if (!(0, _lib.getParentWindow)()) {
                        throw new Error("[" + this.component.tag + "] Can not find parent window");
                    }
                    if (!(0, _window.getParentComponentWindow)()) {
                        throw new Error("[" + this.component.tag + "] Can not find parent component window");
                    }
                    var winProps = (0, _window.parseWindowName)(window.name);
                    var tag = winProps.tag;
                    this.component.log("child_win_props", winProps);
                    if (tag !== this.component.tag) {
                        throw new Error("[" + this.component.tag + "] Parent is " + tag + " - can not attach " + this.component.tag);
                    }
                    this.watchForClose();
                }
            }, {
                key: "watchForClose",
                value: function watchForClose() {
                    var _this3 = this;
                    (0, _lib.onCloseWindow)(_lib.getParentWindow, function() {
                        _this3.component.log("parent_window_closed");
                        _this3.onClose(new Error("[" + _this3.component.tag + "] parent window was closed"));
                        if (_this3.context === _constants.CONTEXT_TYPES.POPUP) {
                            window.close();
                        }
                    });
                    if ((0, _window.getParentComponentWindow)() && (0, _window.getParentComponentWindow)() !== (0, 
                    _lib.getParentWindow)()) {
                        (0, _lib.onCloseWindow)(_window.getParentComponentWindow, function() {
                            _this3.component.log("parent_component_window_closed");
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
                    return _ref = {}, _defineProperty(_ref, _constants.POST_MESSAGE.PROPS, function(source, data) {
                        (0, _lib.extend)(this.props, data.props);
                        this.onProps.call(this);
                    }), _defineProperty(_ref, _constants.POST_MESSAGE.CLOSE, function(source, data) {
                        var _this4 = this;
                        if (source === (0, _lib.getParentWindow)()) {
                            this.onClose.call(this);
                        } else {
                            this.sendToParent(_constants.POST_MESSAGE.CLOSE)["catch"](function(err) {
                                return _this4.onError(err);
                            });
                        }
                    }), _ref;
                }
            }, {
                key: "resize",
                value: function resize(width, height) {
                    var _this5 = this;
                    return _promise.SyncPromise.resolve().then(function() {
                        _this5.component.log("resize", {
                            width: width,
                            height: height
                        });
                        if (_this5.context === _constants.CONTEXT_TYPES.POPUP) {
                            return window.resizeTo(width, height);
                        }
                        return _this5.sendToParent(_constants.POST_MESSAGE.RESIZE, {
                            width: width,
                            height: height
                        });
                    });
                }
            }, {
                key: "close",
                value: function close(err) {
                    this.component.log("close_child");
                    this.onClose.call(this, err);
                    return this.sendToParent(_constants.POST_MESSAGE.CLOSE);
                }
            }, {
                key: "focus",
                value: function focus() {
                    this.component.log("focus");
                    window.focus();
                }
            }, {
                key: "error",
                value: function error(err) {
                    this.component.log("error", {
                        error: err.stack || err.toString()
                    });
                    if (!(err instanceof _error.IntegrationError)) {
                        console.error(err.stack);
                        err = new Error("[" + this.component.tag + "] Child lifecycle method threw an error");
                    }
                    return this.sendToParentComponent(_constants.POST_MESSAGE.ERROR, {
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
        var _src = __webpack_require__(/*! post-robot/src */ 6);
        var _src2 = _interopRequireDefault(_src);
        var _lib = __webpack_require__(/*! ../lib */ 47);
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
                    while (this.cleanupTasks && this.cleanupTasks.length) {
                        var task = this.cleanupTasks.pop();
                        task();
                    }
                }
            }, {
                key: "hasCleanupTasks",
                value: function hasCleanupTasks() {
                    return Boolean(this.cleanupTasks.length);
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
                            return self.error(err);
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
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        var _loop = function _loop() {
                            var listenerName = _step.value;
                            var listener = _src2["default"].on(listenerName, {
                                window: win,
                                errorHandler: function errorHandler(err) {
                                    return _this2.error(err);
                                }
                            }, function(source, data) {
                                _this2.component.log("listener_" + listenerName.replace(/^xcomponent_/, ""));
                                return listeners[listenerName].call(_this2, source, data);
                            });
                            _this2.registerForCleanup(function() {
                                listener.cancel();
                            });
                        };
                        for (var _iterator = Object.keys(listeners)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            _loop();
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
        var _dom = __webpack_require__(/*! ./dom */ 48);
        Object.keys(_dom).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _dom[key];
                }
            });
        });
        var _fn = __webpack_require__(/*! ./fn */ 49);
        Object.keys(_fn).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _fn[key];
                }
            });
        });
        var _promise = __webpack_require__(/*! ./promise */ 51);
        Object.keys(_promise).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _promise[key];
                }
            });
        });
        var _util = __webpack_require__(/*! ./util */ 50);
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
        exports.isWindowClosed = isWindowClosed;
        exports.onCloseWindow = onCloseWindow;
        exports.addEventListener = addEventListener;
        exports.getParentWindow = getParentWindow;
        exports.getParentNode = getParentNode;
        exports.scanForJavascript = scanForJavascript;
        exports.createElement = createElement;
        exports.hijackButton = hijackButton;
        exports.addEventToClass = addEventToClass;
        exports.template = template;
        var _fn = __webpack_require__(/*! ./fn */ 49);
        var _util = __webpack_require__(/*! ./util */ 50);
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
            }).filter(Boolean).join(","), true);
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
        function isWindowClosed(win) {
            return !win || win.closed || typeof win.closed === "undefined" || (0, _util.safeGet)(win, "mockclosed");
        }
        function onCloseWindow(win, callback) {
            callback = (0, _fn.once)(callback);
            var isFunction = win instanceof Function;
            var interval = void 0;
            var checkWindowClosed = function checkWindowClosed() {
                var myWin = void 0;
                try {
                    myWin = isFunction ? win() : win;
                } catch (err) {}
                if (isWindowClosed(myWin)) {
                    clearInterval(interval);
                    return callback();
                }
            };
            interval = setInterval(checkWindowClosed, 50);
            (0, _util.nextTick)(checkWindowClosed);
            var close = win.close;
            try {
                win.close = function() {
                    close.apply(this, arguments);
                    (0, _util.nextTick)(checkWindowClosed);
                };
            } catch (err) {}
            return {
                cancel: function cancel() {
                    clearInterval(interval);
                    callback = _fn.noop;
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
        function getParentWindow(win) {
            win = win || window;
            if (win.opener) {
                return win.opener;
            }
            if (win.parent && win.parent !== win) {
                return win.parent;
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
        function hijackButton(element, callback) {
            var el = getElement(element);
            if (!el) {
                throw new Error("Can not find element: " + element);
            }
            var isButton = el.tagName.toLowerCase() === "button" || el.tagName.toLowerCase() === "input" && el.type === "submit";
            var targetElement = isButton ? getParentNode(el, "form") : el;
            el.addEventListener("click", function(event) {
                callback(event, targetElement);
            });
        }
        function addEventToClass(element, className, eventName, handler) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;
            try {
                for (var _iterator3 = Array.prototype.slice.call(element.getElementsByClassName(className))[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var el = _step3.value;
                    el.addEventListener(eventName, function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        handler();
                    });
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
        function template(html, context) {
            return html.replace(/\{([\w_\.]+)\}/g, function(variable) {
                return (0, _util.get)(context, variable.slice(1, variable.length - 1), "");
            });
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
            var results = {};
            return function() {
                var args = void 0;
                try {
                    args = JSON.stringify(arguments);
                } catch (err) {
                    throw new Error("Arguments not serializable -- can not be used to memoize");
                }
                if (!results.hasOwnProperty(args)) {
                    results[args] = method.apply(this, arguments);
                }
                return results[args];
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
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
        };
        exports.urlEncode = urlEncode;
        exports.camelToDasherize = camelToDasherize;
        exports.dasherizeToCamel = dasherizeToCamel;
        exports.extend = extend;
        exports.values = values;
        exports.uniqueID = uniqueID;
        exports.b64encode = b64encode;
        exports.b64decode = b64decode;
        exports.stringifyWithFunctions = stringifyWithFunctions;
        exports.nextTick = nextTick;
        exports.safeGet = safeGet;
        exports.capitalizeFirstLetter = capitalizeFirstLetter;
        exports.get = get;
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
        var tickMessageName = "__nextTick__" + uniqueID();
        var queue = [];
        window.addEventListener("message", function(event) {
            if (event.data === tickMessageName) {
                queue.shift().call();
            }
        });
        function nextTick(method) {
            queue.push(method);
            window.postMessage(tickMessageName, "*");
        }
        function safeGet(obj, prop) {
            var result = void 0;
            try {
                result = obj[prop];
            } catch (err) {}
            return result;
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        function get(item, path, def) {
            if (!path) {
                return def;
            }
            path = path.split(".");
            for (var i = 0; i < path.length; i++) {
                if ((typeof item === "undefined" ? "undefined" : _typeof(item)) === "object" && item !== null) {
                    item = item[path[i]];
                } else {
                    return def;
                }
            }
            return item === undefined ? def : item;
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
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 15);
        function denodeify(method) {
            return function() {
                var self = this;
                var args = Array.prototype.slice.call(arguments);
                if (args.length >= method.length) {
                    return _promise.SyncPromise.resolve(method.apply(self, args));
                }
                return new _promise.SyncPromise(function(resolve, reject) {
                    args.push(function(err, result) {
                        if (err && !(err instanceof Error)) {
                            throw new Error("Passed non-Error object in callback: [ " + err + " ] -- callbacks should either be called with callback(new Error(...)) or callback(null, result).");
                        }
                        return err ? reject(err) : resolve(result);
                    });
                    return method.apply(self, args);
                });
            };
        }
    }, /*!**********************************************!*\
  !*** ./~/xcomponent/src/component/window.js ***!
  \**********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.getParentComponentWindow = exports.parseWindowName = undefined;
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
        exports.buildChildWindowName = buildChildWindowName;
        exports.getPosition = getPosition;
        var _lib = __webpack_require__(/*! ../lib */ 47);
        var _constants = __webpack_require__(/*! ../constants */ 53);
        function buildChildWindowName() {
            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            return (0, _lib.b64encode)(JSON.stringify(_extends({}, props, {
                type: _constants.XCOMPONENT
            })));
        }
        var parseWindowName = exports.parseWindowName = (0, _lib.memoize)(function(name) {
            var winProps = void 0;
            try {
                winProps = JSON.parse((0, _lib.b64decode)(name));
            } catch (err) {
                return;
            }
            if (!winProps || winProps.type !== _constants.XCOMPONENT) {
                return;
            }
            return winProps;
        });
        var getParentComponentWindow = exports.getParentComponentWindow = (0, _lib.memoize)(function() {
            var winProps = parseWindowName(window.name);
            if (!winProps) {
                throw new Error("Window has not been rendered by xcomponent - can not attach here");
            }
            if (winProps.sibling) {
                return (0, _lib.getParentWindow)().frames[winProps.parent];
            } else {
                return (0, _lib.getParentWindow)();
            }
        });
        function getPosition(options) {
            var pos = {};
            if (typeof options.x === "number") {
                pos.x = options.x;
            } else {
                var width = window.outerWidth;
                if (width <= options.width) {
                    pos.x = 0;
                } else {
                    pos.x = Math.floor(width / 2 - options.width / 2);
                }
            }
            if (typeof options.y === "number") {
                pos.y = options.y;
            } else {
                var height = window.outerHeight;
                if (height <= options.height) {
                    pos.y = 0;
                } else {
                    pos.y = Math.floor(height / 2 - options.height / 2);
                }
            }
            return pos;
        }
    }, /*!***************************************!*\
  !*** ./~/xcomponent/src/constants.js ***!
  \***************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.MAX_Z_INDEX = exports.CONTEXT_TYPES_LIST = exports.EVENT_NAMES = exports.CLASS_NAMES = exports.CONTEXT_TYPES = exports.PROP_TYPES_LIST = exports.PROP_TYPES = exports.POST_MESSAGE = exports.XCOMPONENT = undefined;
        var _lib = __webpack_require__(/*! ./lib */ 47);
        var XCOMPONENT = exports.XCOMPONENT = "xcomponent";
        var POST_MESSAGE = exports.POST_MESSAGE = {
            INIT: XCOMPONENT + "_init",
            PROPS: XCOMPONENT + "_props",
            PROP_CALLBACK: XCOMPONENT + "_prop_callback",
            CLOSE: XCOMPONENT + "_close",
            REDIRECT: XCOMPONENT + "_redirect",
            RESIZE: XCOMPONENT + "_resize",
            RENDER: XCOMPONENT + "_render",
            ERROR: XCOMPONENT + "_error"
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
        var CLASS_NAMES = exports.CLASS_NAMES = {
            XCOMPONENT: "" + XCOMPONENT,
            COMPONENT: XCOMPONENT + "-component",
            CLOSE: XCOMPONENT + "-close",
            FOCUS: XCOMPONENT + "-focus",
            OVERLAY: XCOMPONENT + "-overlay",
            ELEMENT: XCOMPONENT + "-element"
        };
        var EVENT_NAMES = exports.EVENT_NAMES = {
            CLICK: "click"
        };
        var CONTEXT_TYPES_LIST = exports.CONTEXT_TYPES_LIST = (0, _lib.values)(CONTEXT_TYPES);
        var MAX_Z_INDEX = exports.MAX_Z_INDEX = 2147483647;
    }, /*!*********************************************!*\
  !*** ./~/xcomponent/src/component/props.js ***!
  \*********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.normalizeProp = normalizeProp;
        exports.normalizeProps = normalizeProps;
        var _lib = __webpack_require__(/*! ../lib */ 47);
        function normalizeProp(component, instance, props, key) {
            var prop = component.props[key];
            var value = props[key];
            var hasProp = props.hasOwnProperty(key) && value !== null && value !== undefined && value !== "";
            if (!hasProp && prop.def) {
                value = prop.def instanceof Function && prop.type !== "function" ? prop.def() : prop.def;
            }
            if (prop.type === "boolean") {
                return Boolean(value);
            } else if (prop.type === "function") {
                if (!value) {
                    if (!value && prop.noop) {
                        value = _lib.noop;
                    }
                } else {
                    (function() {
                        if (prop.denodeify) {
                            value = (0, _lib.denodeify)(value);
                        }
                        var original = value;
                        value = function value() {
                            component.log("call_prop_" + key);
                            return original.apply(this, arguments);
                        };
                        if (prop.once) {
                            value = (0, _lib.once)(value);
                        }
                        if (prop.memoize) {
                            value = (0, _lib.memoize)(value);
                        }
                        value = value.bind(instance);
                    })();
                }
                return value;
            } else if (prop.type === "string") {
                return value || "";
            } else if (prop.type === "object") {
                return value;
            } else if (prop.type === "number") {
                return parseInt(value || 0, 10);
            }
        }
        function normalizeProps(component, instance, props) {
            props = props || {};
            var result = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = Object.keys(component.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;
                    result[key] = normalizeProp(component, instance, props, key);
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
    }, /*!****************************************************!*\
  !*** ./~/xcomponent/src/component/parent/index.js ***!
  \****************************************************/
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
        var _client = __webpack_require__(/*! beaver-logger/client */ 35);
        var _client2 = _interopRequireDefault(_client);
        var _src = __webpack_require__(/*! post-robot/src */ 6);
        var _src2 = _interopRequireDefault(_src);
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 15);
        var _base = __webpack_require__(/*! ../base */ 46);
        var _window = __webpack_require__(/*! ../window */ 52);
        var _lib = __webpack_require__(/*! ../../lib */ 47);
        var _constants = __webpack_require__(/*! ../../constants */ 53);
        var _drivers = __webpack_require__(/*! ./drivers */ 56);
        var _validate = __webpack_require__(/*! ./validate */ 57);
        var _props = __webpack_require__(/*! ./props */ 58);
        var _props2 = __webpack_require__(/*! ../props */ 54);
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
        var activeComponents = [];
        var ParentComponent = exports.ParentComponent = function(_BaseComponent) {
            _inherits(ParentComponent, _BaseComponent);
            function ParentComponent(component) {
                var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                _classCallCheck(this, ParentComponent);
                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ParentComponent).call(this, component, options));
                (0, _validate.validate)(component, options);
                _this.component = component;
                _this.component.log("construct_parent");
                _this.id = (0, _lib.uniqueID)();
                if (component.singleton && activeComponents.some(function(comp) {
                    return comp.component === component;
                })) {
                    throw new Error(component.tag + " is a singleton, and an only be instantiated once");
                }
                activeComponents.push(_this);
                _this.registerForCleanup(function() {
                    activeComponents.splice(activeComponents.indexOf(_this), 1);
                });
                _this.setProps(options.props || {});
                _this.childWindowName = options.childWindowName || (0, _window.buildChildWindowName)({
                    parent: window.name,
                    id: _this.id,
                    tag: _this.component.tag
                });
                _this.onInit = new _promise.SyncPromise();
                return _this;
            }
            _createClass(ParentComponent, [ {
                key: "setProps",
                value: function setProps(props) {
                    var _this2 = this;
                    (0, _validate.validateProps)(this.component, props);
                    this.props = (0, _props2.normalizeProps)(this.component, this, props);
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        var _loop = function _loop() {
                            var key = _step.value;
                            var value = _this2.props[key];
                            if (value) {
                                var prop = _this2.component.props[key];
                                if (prop.precall) {
                                    (function() {
                                        var result = value.call();
                                        _this2.props[key] = function() {
                                            return result;
                                        };
                                    })();
                                }
                                if (prop.autoClose) {
                                    (function() {
                                        var self = _this2;
                                        _this2.props[key] = function() {
                                            self.component.log("autoclose", {
                                                prop: key
                                            });
                                            self.close();
                                            return value.apply(this, arguments);
                                        };
                                    })();
                                }
                            }
                        };
                        for (var _iterator = Object.keys(this.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            _loop();
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
                    var queryString = (0, _props.propsToQuery)(this.component.props, this.props);
                    if (queryString) {
                        url = "" + url + (url.indexOf("?") === -1 ? "?" : "&") + queryString;
                    }
                    return url;
                }
            }, {
                key: "updateProps",
                value: function updateProps(props) {
                    var _this3 = this;
                    return this.onInit.then(function() {
                        (0, _validate.validateProps)(_this3.component, props);
                        var oldProps = (0, _lib.stringifyWithFunctions)(_this3.props);
                        var newProps = _extends({}, _this3.props, props);
                        _this3.setProps(newProps);
                        if (oldProps !== (0, _lib.stringifyWithFunctions)(_this3.props)) {
                            _this3.component.log("parent_update_props");
                            return _src2["default"].send(_this3.window, _constants.POST_MESSAGE.PROPS, {
                                props: _this3.props
                            });
                        }
                    });
                }
            }, {
                key: "getRenderContext",
                value: function getRenderContext(el, context) {
                    if (el) {
                        if (context && context !== _constants.CONTEXT_TYPES.IFRAME) {
                            throw new Error("[" + this.component.tag + "] " + context + " context can not be rendered into element");
                        }
                        context = _constants.CONTEXT_TYPES.IFRAME;
                    }
                    if (context) {
                        if (!this.component.contexts[context]) {
                            throw new Error("[" + this.component.tag + "] " + context + " context not allowed by component");
                        }
                        return context;
                    }
                    if (this.component.defaultContext) {
                        return this.component.defaultContext;
                    }
                    var _arr = [ _constants.CONTEXT_TYPES.LIGHTBOX, _constants.CONTEXT_TYPES.POPUP ];
                    for (var _i = 0; _i < _arr.length; _i++) {
                        var renderContext = _arr[_i];
                        if (this.component.contexts[renderContext]) {
                            return renderContext;
                        }
                    }
                    throw new Error("[" + this.component.tag + "] No context options available for render");
                }
            }, {
                key: "validateRender",
                value: function validateRender(context) {
                    if (this.window) {
                        throw new Error("[" + this.component.tag + "] Can not render: component is already rendered");
                    }
                    if (context && !this.component.contexts[context]) {
                        throw new Error("Invalid context: " + context);
                    }
                }
            }, {
                key: "render",
                value: function render(element, context) {
                    var _this4 = this;
                    return _promise.SyncPromise.resolve().then(function() {
                        _this4.validateRender(context);
                        context = _this4.getRenderContext(element, context);
                        _this4.component.log("render_" + context, {
                            context: context,
                            element: element
                        });
                        if (_drivers.RENDER_DRIVERS[context].render) {
                            _drivers.RENDER_DRIVERS[context].render.call(_this4, element);
                        }
                        _this4.setForCleanup("context", context);
                        if (_drivers.RENDER_DRIVERS[context].overlay) {
                            _this4.createParentTemplate();
                        }
                        _this4.open(element, context);
                        _this4.listen(_this4.window);
                        _this4.loadUrl(_this4.buildUrl());
                        _this4.runTimeout();
                        _this4.watchForClose();
                        return _this4.onInit;
                    });
                }
            }, {
                key: "open",
                value: function open(element, context) {
                    context = this.getRenderContext(element, context);
                    this.component.log("open_" + context, {
                        element: element
                    });
                    _drivers.RENDER_DRIVERS[context].open.call(this, element);
                    this.watchForClose();
                    this.createComponentTemplate();
                }
            }, {
                key: "renderToParent",
                value: function renderToParent(element, context) {
                    var _this5 = this;
                    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                    return _promise.SyncPromise.resolve().then(function() {
                        _this5.validateRender(context);
                        context = _this5.getRenderContext(element, context);
                        if (!(0, _lib.getParentWindow)()) {
                            throw new Error("[" + _this5.component.tag + "] Can not render to parent - no parent exists");
                        }
                        if (!window.name) {
                            throw new Error("[" + _this5.component.tag + "] Can not render to parent - not in a child component window");
                        }
                        _this5.component.log("render_" + context + "_to_parent", {
                            element: element,
                            context: context
                        });
                        _this5.childWindowName = (0, _window.buildChildWindowName)({
                            id: _this5.id,
                            parent: window.name,
                            sibling: true,
                            tag: _this5.component.tag
                        });
                        _this5.setForCleanup("context", context);
                        if (_drivers.RENDER_DRIVERS[context].renderToParent) {
                            _drivers.RENDER_DRIVERS[context].renderToParent.call(_this5, element);
                        }
                        return _src2["default"].sendToParent(_constants.POST_MESSAGE.RENDER, _extends({}, options, {
                            tag: _this5.component.tag,
                            context: context,
                            element: element,
                            options: {
                                props: _this5.props,
                                childWindowName: _this5.childWindowName
                            }
                        })).then(function(data) {
                            if (!_this5.window) {
                                _this5.setForCleanup("window", (0, _lib.getParentWindow)().frames[_this5.childWindowName]);
                            }
                            _this5.listen(_this5.window);
                            _this5.watchForClose();
                            return _this5.onInit;
                        });
                    });
                }
            }, {
                key: "watchForClose",
                value: function watchForClose() {
                    var _this6 = this;
                    var closeWindowListener = (0, _lib.onCloseWindow)(this.window, function() {
                        _this6.component.log("detect_close_child");
                        _this6.props.onClose();
                        _this6.destroy();
                    });
                    var unloadListener = (0, _lib.addEventListener)(window, "beforeunload", function() {
                        _this6.component.log("navigate_away");
                        _client2["default"].flush();
                        _this6.destroy();
                    });
                    this.registerForCleanup(function() {
                        closeWindowListener.cancel();
                        unloadListener.cancel();
                    });
                }
            }, {
                key: "loadUrl",
                value: function loadUrl(url) {
                    this.component.log("load_url");
                    return _drivers.RENDER_DRIVERS[this.context].loadUrl.call(this, url);
                }
            }, {
                key: "hijackButton",
                value: function hijackButton(button, element, context) {
                    var _this7 = this;
                    context = this.getRenderContext(element, context);
                    this.component.log("hijack_button", {
                        element: element,
                        context: context
                    });
                    (0, _lib.hijackButton)(button, function(event, targetElement) {
                        if (_this7.window) {
                            event.preventDefault();
                            throw new Error("[" + _this7.component.tag + "] Component is already rendered");
                        }
                        _this7.renderHijack(targetElement, element, context);
                    });
                    return this;
                }
            }, {
                key: "renderHijack",
                value: function renderHijack(targetElement, element, context) {
                    var _this8 = this;
                    context = this.getRenderContext(element, context);
                    this.component.log("render_hijack_" + context);
                    return _promise.SyncPromise.resolve().then(function() {
                        _this8.validateRender(context);
                        _this8.setForCleanup("context", context);
                        targetElement.target = _this8.childWindowName;
                        if (_drivers.RENDER_DRIVERS[context].overlay) {
                            _this8.createParentTemplate();
                        }
                        _this8.open(null, context);
                        _this8.listen(_this8.window);
                        _this8.runTimeout();
                        return _this8.onInit;
                    });
                }
            }, {
                key: "hijackSubmitParentForm",
                value: function hijackSubmitParentForm() {
                    this.component.log("hijack_submit_parent_form");
                    return this.renderToParent(null, _constants.CONTEXT_TYPES.POPUP, {
                        hijackSubmitParentForm: true
                    });
                }
            }, {
                key: "runTimeout",
                value: function runTimeout() {
                    var _this9 = this;
                    if (this.props.timeout) {
                        setTimeout(function() {
                            var error = new Error("[" + _this9.component.tag + "] Loading component " + _this9.component.tag + " timed out after " + _this9.props.timeout + " milliseconds");
                            _this9.onInit.reject(error)["catch"](function(err) {
                                _this9.component.log("timed_out", {
                                    timeout: _this9.props.timeout
                                });
                                _this9.props.onTimeout(err);
                                _this9.destroy();
                            });
                        }, this.props.timeout);
                    }
                }
            }, {
                key: "listeners",
                value: function listeners() {
                    var _ref;
                    return _ref = {}, _defineProperty(_ref, _constants.POST_MESSAGE.INIT, function(source, data) {
                        this.props.onEnter();
                        this.onInit.resolve(this);
                        return {
                            context: this.context,
                            props: this.props
                        };
                    }), _defineProperty(_ref, _constants.POST_MESSAGE.CLOSE, function(source, data) {
                        this.close();
                    }), _defineProperty(_ref, _constants.POST_MESSAGE.RENDER, function(source, data) {
                        var component = this.component.getByTag(data.tag);
                        var instance = component.parent(data.options);
                        if (data.hijackSubmitParentForm) {
                            var form = (0, _lib.getParentNode)(this.iframe, "form");
                            instance.renderHijack(form, data.element, data.context);
                            form.submit();
                        } else {
                            instance.render(data.element, data.context);
                        }
                    }), _defineProperty(_ref, _constants.POST_MESSAGE.RESIZE, function(source, data) {
                        if (this.context === _constants.CONTEXT_TYPES.POPUP) {
                            return;
                        }
                        return this.resize(data.width, data.height);
                    }), _defineProperty(_ref, _constants.POST_MESSAGE.ERROR, function(source, data) {
                        this.error(new Error(data.error));
                    }), _ref;
                }
            }, {
                key: "resize",
                value: function resize(height, width) {
                    this.component.log("resize", {
                        height: height,
                        width: width
                    });
                    if (this.iframe) {
                        this.iframe.height = height;
                        this.iframe.width = width;
                    }
                }
            }, {
                key: "close",
                value: function close() {
                    var _this10 = this;
                    return _promise.SyncPromise.resolve().then(function() {
                        if ((0, _lib.isWindowClosed)(_this10.window)) {
                            return _this10.props.onClose();
                        }
                        if (_this10.closePromise) {
                            return _this10.closePromise;
                        }
                        _this10.component.log("close");
                        _this10.props.onClose();
                        var closePromise = _src2["default"].send(_this10.window, _constants.POST_MESSAGE.CLOSE)["catch"](function(err) {
                            console.warn("Error sending message to child", err.stack || err.toString());
                        }).then(function() {
                            _this10.destroy();
                        });
                        _this10.setForCleanup("closePromise", closePromise);
                        return _this10.closePromise;
                    });
                }
            }, {
                key: "focus",
                value: function focus() {
                    this.component.log("focus");
                    if (this.window) {
                        this.window.focus();
                    }
                    return this;
                }
            }, {
                key: "createComponentTemplate",
                value: function createComponentTemplate() {
                    (0, _lib.createElement)("body", {
                        html: (0, _lib.template)(this.component.componentTemplate, {
                            id: _constants.CLASS_NAMES.XCOMPONENT + "-" + this.id,
                            CLASS: _constants.CLASS_NAMES
                        }),
                        "class": [ _constants.CLASS_NAMES.XCOMPONENT ]
                    }, this.window.document.body);
                }
            }, {
                key: "createParentTemplate",
                value: function createParentTemplate() {
                    var _this11 = this;
                    this.parentTemplate = (0, _lib.createElement)("div", {
                        html: (0, _lib.template)(this.component.parentTemplate, {
                            id: _constants.CLASS_NAMES.XCOMPONENT + "-" + this.id,
                            CLASS: _constants.CLASS_NAMES
                        }),
                        attributes: {
                            id: _constants.CLASS_NAMES.XCOMPONENT + "-" + this.id
                        },
                        "class": [ _constants.CLASS_NAMES.XCOMPONENT, _constants.CLASS_NAMES.XCOMPONENT + "-" + this.context ],
                        style: {
                            zIndex: _constants.MAX_Z_INDEX - 1
                        }
                    }, document.body);
                    (0, _lib.addEventToClass)(this.parentTemplate, _constants.CLASS_NAMES.FOCUS, _constants.EVENT_NAMES.CLICK, function(event) {
                        return _this11.focus();
                    });
                    (0, _lib.addEventToClass)(this.parentTemplate, _constants.CLASS_NAMES.CLOSE, _constants.EVENT_NAMES.CLICK, function(event) {
                        return _this11.close();
                    });
                    this.registerForCleanup(function() {
                        document.body.removeChild(_this11.parentTemplate);
                        delete _this11.parentTemplate;
                    });
                }
            }, {
                key: "destroy",
                value: function destroy() {
                    if (this.hasCleanupTasks()) {
                        this.component.log("destroy");
                        this.cleanup();
                    }
                }
            }, {
                key: "error",
                value: function error(err) {
                    this.component.logError("error", {
                        error: err.stack || err.toString()
                    });
                    this.onInit.reject(err);
                    this.props.onError(err);
                    this.destroy();
                }
            } ]);
            return ParentComponent;
        }(_base.BaseComponent);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;
        try {
            var _loop2 = function _loop2() {
                var context = _step2.value;
                var contextName = (0, _lib.capitalizeFirstLetter)(context);
                ParentComponent.prototype["render" + contextName] = function(element) {
                    return this.render(element, context);
                };
                ParentComponent.prototype["render" + contextName + "ToParent"] = function(element) {
                    return this.renderToParent(element, context);
                };
                ParentComponent.prototype["hijackButtonTo" + contextName] = function(button, element) {
                    return this.hijackButton(button, element, context);
                };
            };
            for (var _iterator2 = _constants.CONTEXT_TYPES_LIST[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                _loop2();
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
    }, /*!******************************************************!*\
  !*** ./~/xcomponent/src/component/parent/drivers.js ***!
  \******************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.RENDER_DRIVERS = undefined;
        var _RENDER_DRIVERS;
        var _error = __webpack_require__(/*! ../../error */ 5);
        var _lib = __webpack_require__(/*! ../../lib */ 47);
        var _constants = __webpack_require__(/*! ../../constants */ 53);
        var _window = __webpack_require__(/*! ../window */ 52);
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
        var RENDER_DRIVERS = exports.RENDER_DRIVERS = (_RENDER_DRIVERS = {}, _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.IFRAME, {
            overlay: false,
            render: function render(element) {
                if (!element) {
                    throw new Error("[" + this.component.tag + "] Must specify element to render to iframe");
                }
            },
            open: function open(element) {
                var _this = this;
                if (!element) {
                    throw new Error("[" + this.component.tag + "] Must specify element to render to iframe");
                }
                this.iframe = (0, _lib.iframe)(element, null, {
                    name: this.childWindowName,
                    width: this.component.dimensions.width,
                    height: this.component.dimensions.height
                });
                this.window = this.iframe.contentWindow;
                this.registerForCleanup(function() {
                    _this.window.close();
                    delete _this.window;
                    if (_this.iframe) {
                        if (_this.iframe.parentNode) {
                            _this.iframe.parentNode.removeChild(_this.iframe);
                        }
                        delete _this.iframe;
                    }
                });
                return this;
            },
            renderToParent: function renderToParent(element) {
                if (!element) {
                    throw new Error("[" + this.component.tag + "] Must specify element to render to iframe");
                }
            },
            loadUrl: function loadUrl(url) {
                this.iframe.src = url;
            }
        }), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.POPUP, {
            overlay: true,
            open: function open() {
                var _this2 = this;
                var dimensions = this.component.dimensions || {};
                var pos = (0, _window.getPosition)({
                    x: dimensions.x,
                    y: dimensions.y,
                    width: dimensions.width,
                    height: dimensions.height
                });
                this.window = (0, _lib.popup)("about:blank", {
                    name: this.childWindowName,
                    width: this.component.dimensions.width,
                    height: this.component.dimensions.height,
                    top: pos.y,
                    left: pos.x
                });
                this.registerForCleanup(function() {
                    if (_this2.window) {
                        _this2.window.close();
                        delete _this2.window;
                    }
                });
                if ((0, _lib.isWindowClosed)(this.window)) {
                    var err = new _error.PopupOpenError("[" + this.component.tag + "] Can not open popup window - blocked");
                    throw err;
                }
                return this;
            },
            renderToParent: function renderToParent() {
                this.open(null, _constants.CONTEXT_TYPES.POPUP);
            },
            loadUrl: function loadUrl(url) {
                this.window.location = url;
            }
        }), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.LIGHTBOX, {
            overlay: true,
            open: function open() {
                var element = this.parentTemplate.getElementsByClassName(_constants.CLASS_NAMES.ELEMENT)[0] || document.body;
                RENDER_DRIVERS[_constants.CONTEXT_TYPES.IFRAME].open.call(this, element);
                var dimensions = this.component.dimensions || {};
                var pos = (0, _window.getPosition)({
                    x: dimensions.x,
                    y: dimensions.y,
                    width: dimensions.width,
                    height: dimensions.height
                });
                this.iframe.style.zIndex = _constants.MAX_Z_INDEX;
                this.iframe.style.position = "absolute";
                this.iframe.style.left = pos.x;
                this.iframe.style.top = pos.y;
                this.iframe.style.borderRadius = "10px";
                if (!this.component.dimensions.width && !this.component.dimensions.height) {
                    this.iframe.style.left = 0;
                    this.iframe.style.top = 0;
                    this.iframe.style.borderRadius = "0px";
                    this.iframe.height = "100%";
                    this.iframe.width = "100%";
                    this.iframe.style.position = "fixed";
                }
                return this;
            },
            loadUrl: function loadUrl(url) {
                this.iframe.src = url;
            }
        }), _RENDER_DRIVERS);
    }, /*!*******************************************************!*\
  !*** ./~/xcomponent/src/component/parent/validate.js ***!
  \*******************************************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.validateProps = validateProps;
        exports.validate = validate;
        function validateProps(component, props) {
            props = props || {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = Object.keys(props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;
                    if (!component.props.hasOwnProperty(key)) {
                        throw new Error("[" + component.tag + "] Invalid prop: " + key);
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
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;
            try {
                for (var _iterator2 = Object.keys(component.props)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _key = _step2.value;
                    var prop = component.props[_key];
                    var value = props[_key];
                    var hasProp = props.hasOwnProperty(_key) && value !== null && value !== undefined && value !== "";
                    if (!hasProp) {
                        if (prop.required !== false && !prop.hasOwnProperty("def")) {
                            throw new Error("[" + component.tag + "] Prop is required: " + _key);
                        }
                        continue;
                    }
                    if (prop.type === "function") {
                        if (!(value instanceof Function)) {
                            throw new Error("[" + component.tag + "] Prop is not of type function: " + _key);
                        }
                    } else if (prop.type === "string") {
                        if (typeof value !== "string") {
                            throw new Error("[" + component.tag + "] Prop is not of type string: " + _key);
                        }
                    } else if (prop.type === "object") {
                        try {
                            JSON.stringify(value);
                        } catch (err) {
                            throw new Error("[" + component.tag + "] Unable to serialize prop: " + _key);
                        }
                    } else if (prop.type === "number") {
                        if (isNaN(parseInt(value, 10))) {
                            throw new Error("[" + component.tag + "] Prop is not a number: " + _key);
                        }
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
        function validate(component, options) {}
    }, /*!****************************************************!*\
  !*** ./~/xcomponent/src/component/parent/props.js ***!
  \****************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
        };
        exports.propsToQuery = propsToQuery;
        var _lib = __webpack_require__(/*! ../../lib */ 47);
        function propsToQuery(propsDef, props) {
            return Object.keys(props).map(function(key) {
                var value = props[key];
                if (!value) {
                    return;
                }
                if (propsDef[key].queryParam === false) {
                    return;
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
    }, /*!*******************************************************!*\
  !*** ./~/xcomponent/src/component/component/props.js ***!
  \*******************************************************/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var internalProps = exports.internalProps = {
            url: {
                type: "string",
                required: false,
                queryParam: false
            },
            env: {
                type: "string",
                required: false
            },
            timeout: {
                type: "number",
                required: false,
                queryParam: false,
                autoClose: true
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
                once: true
            },
            onTimeout: {
                type: "function",
                required: false,
                once: true,
                autoClose: true,
                def: function def(err) {
                    return this.props.onError(err);
                }
            },
            onError: {
                type: "function",
                required: false,
                autoClose: true,
                def: function def(err) {
                    console.error(err.message, "\n", err.stack || err.toString());
                },
                once: true
            }
        };
    }, /*!**********************************************************!*\
  !*** ./~/xcomponent/src/component/component/validate.js ***!
  \**********************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
        };
        exports.validate = validate;
        var _props = __webpack_require__(/*! ./props */ 59);
        var _constants = __webpack_require__(/*! ../../constants */ 53);
        function validateProps(options) {
            if (options.props && !(_typeof(options.props) === "object")) {
                throw new Error("[" + options.tag + "] Expected options.props to be an object");
            }
            if (options.props) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
                try {
                    for (var _iterator = Object.keys(options.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var key = _step.value;
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
        }
        function validate(options) {
            if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) {
                throw new Error("Invalid options.tag: " + options.tag);
            }
            validateProps(options);
            if (options.contexts) {
                var anyEnabled = false;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;
                try {
                    for (var _iterator2 = Object.keys(options.contexts)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var context = _step2.value;
                        if (_constants.CONTEXT_TYPES_LIST.indexOf(context) === -1) {
                            throw new Error("[" + options.tag + "] Unsupported context type: " + context);
                        }
                        if (options.contexts[context] || options.contexts[context] === undefined) {
                            anyEnabled = true;
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
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;
                try {
                    for (var _iterator3 = Object.keys(options.envUrls)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var env = _step3.value;
                        if (!options.envUrls[env]) {
                            throw new Error("[" + options.tag + "] No url specified for env: " + env);
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
    }, /*!*******************************************************************!*\
  !*** ./~/xcomponent/src/component/component/templates/parent.htm ***!
  \*******************************************************************/
    function(module, exports) {
        module.exports = '<div class="{CLASS.OVERLAY} {CLASS.FOCUS}">\n    <a href="#{CLASS.CLOSE}" class="{CLASS.CLOSE}"></a>\n\n    <div class="{CLASS.ELEMENT}"></div>\n</div>\n\n<style>\n    #{id}.{CLASS.XCOMPONENT} {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.OVERLAY} {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.8);\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.OVERLAY}.xcomponent-popup {\n        cursor: pointer;\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.CLOSE} {\n        position: absolute;\n        right: 16px;\n        top: 16px;\n        width: 16px;\n        height: 16px;\n        opacity: 0.6;\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.CLOSE}:hover {\n        opacity: 1;\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.CLOSE}:before, .{CLASS.CLOSE}:after {\n        position: absolute;\n        left: 8px;\n        content: \' \';\n        height: 16px;\n        width: 2px;\n        background-color: white;\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.CLOSE}:before {\n        transform: rotate(45deg);\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.CLOSE}:after {\n        transform: rotate(-45deg);\n    }\n</style>';
    }, /*!**********************************************************************!*\
  !*** ./~/xcomponent/src/component/component/templates/component.htm ***!
  \**********************************************************************/
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
        var _script = __webpack_require__(/*! ./script */ 64);
        Object.keys(_script).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _script[key];
                }
            });
        });
        var _react = __webpack_require__(/*! ./react */ 65);
        Object.keys(_react).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _react[key];
                }
            });
        });
        var _angular = __webpack_require__(/*! ./angular */ 66);
        Object.keys(_angular).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _angular[key];
                }
            });
        });
        var _ember = __webpack_require__(/*! ./ember */ 67);
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
                    component.log("instantiate_script_component");
                    var props = void 0;
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
        var _lib = __webpack_require__(/*! ../lib */ 47);
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
                        component.log("instantiate_react_component");
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
        var _lib = __webpack_require__(/*! ../lib */ 47);
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
                                component.log("instantiate_angular_component");
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
    }, /*!*********************************!*\
  !*** ./src/components/props.js ***!
  \*********************************/
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
                denodeify: true,
                precall: true
            },
            onPaymentAuthorize: {
                type: "function",
                required: false,
                once: true,
                autoClose: true
            },
            onPaymentComplete: {
                type: "function",
                required: false,
                once: true,
                autoClose: true
            },
            onCancel: {
                type: "function",
                required: false,
                once: true,
                autoClose: true
            }
        };
    }, /*!******************************************!*\
  !*** ./src/components/checkout/index.js ***!
  \******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _component = __webpack_require__(/*! ./component */ 70);
        Object.keys(_component).forEach(function(key) {
            if (key === "default") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _component[key];
                }
            });
        });
    }, /*!**********************************************!*\
  !*** ./src/components/checkout/component.js ***!
  \**********************************************/
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
        var _src = __webpack_require__(/*! xcomponent/src */ 4);
        var _src2 = _interopRequireDefault(_src);
        var _props = __webpack_require__(/*! ../props */ 68);
        var _parentTemplate = __webpack_require__(/*! ./parentTemplate.htm */ 71);
        var _parentTemplate2 = _interopRequireDefault(_parentTemplate);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        var PayPalCheckout = exports.PayPalCheckout = _src2["default"].create({
            tag: "paypal-checkout",
            name: "ppxo",
            defaultEnv: "production",
            envUrls: {
                local: "http://localhost.paypal.com:8000/webapps/hermes",
                production: "https://www.paypal.com/checkoutnow",
                demo: "./checkout.htm"
            },
            contexts: {
                iframe: false,
                lightbox: false,
                popup: true
            },
            parentTemplate: _parentTemplate2["default"],
            props: _extends({}, _props.props),
            dimensions: {
                width: 450,
                height: 535
            }
        });
    }, /*!****************************************************!*\
  !*** ./src/components/checkout/parentTemplate.htm ***!
  \****************************************************/
    function(module, exports) {
        module.exports = '\n<div class="xcomponent-overlay xcomponent-focus">\n    <a href="#xcomponent-close" class="xcomponent-close"></a>\n    <div class="ppmodal">\n        <div class="pplogo">\n        </div>\n        <div class="ppmsg" >\n            Don\'t see the secure PayPal browser? We\'ll help you re-launch the window to complete your purchase.\n        </div>\n        <div class="continueLink">\n            <a href="#" class="xcomponent-focus">Continue</a>\n        </div>\n    </div>\n</div>\n\n<style>\n\n    .xcomponent-overlay {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.8);\n    }\n\n    .xcomponent-overlay.xcomponent-popup {\n        cursor: pointer;\n    }\n\n    .xcomponent-overlay .ppmodal {\n        font-family: "HelveticaNeue", "HelveticaNeue-Light", "Helvetica Neue Light", helvetica, arial, sans-serif;\n        font-size: 14px;\n        text-align: center;\n        color: #fff;\n        z-index: 1000000002;\n        -webkit-box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        -ms-box-sizing: border-box;\n        box-sizing: border-box;\n        width: 350px;\n        top: 50%;\n        left: 50%;\n        position: fixed;\n        margin-left: -165px;\n        margin-top: -80px;\n        cursor: pointer;\n    }\n\n    .xcomponent-overlay .ppmodal .pplogo {\n        background: url("https://www.paypalobjects.com/images/checkout/incontext/incontext_mask_sprite.png") no-repeat -18px -16px;\n        width: 132px;\n        height: 36px;\n        cursor: pointer;\n        margin: 26px 0 0 109px;\n        margin-bottom: 30px;\n    }\n\n    .xcomponent-overlay .ppmodal .ppmsg{\n        font-size: 15px;\n        line-height: 1.35;\n        padding: 25px 0;\n    }\n\n    .xcomponent-overlay .ppmodal .continueLink{\n        font-size: 15px;\n        line-height: 1.35;\n        padding: 10px 0;\n    }\n\n    .xcomponent-close {\n        position: absolute;\n        right: 16px;\n        top: 16px;\n        width: 16px;\n        height: 16px;\n        opacity: 0.6;\n    }\n\n    .xcomponent-close:hover {\n        opacity: 1;\n    }\n\n    .xcomponent-close:before, .xcomponent-close:after {\n        position: absolute;\n        left: 8px;\n        content: \' \';\n        height: 16px;\n        width: 2px;\n        background-color: white;\n    }\n\n    .xcomponent-close:before {\n        transform: rotate(45deg);\n    }\n\n    .xcomponent-close:after {\n        transform: rotate(-45deg);\n    }\n\n    a{\n\n        color: white;\n    }\n\n</style>';
    }, /*!*****************************!*\
  !*** ./src/legacy/index.js ***!
  \*****************************/
    function(module, exports, __webpack_require__) {
        "use strict";
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
        var _components = __webpack_require__(/*! ../components */ 1);
        var component;
        var config = {
            env: "production"
        };
        function matchToken(token) {
            if (!token) {
                return;
            }
            if (token.match(/^(EC-)?[A-Z0-9]{17}$/)) {
                return token;
            }
            var match = token.match(/token=((EC-)?[A-Z0-9]{17})$/);
            if (match) {
                return match[1];
            }
        }
        function getToken(callback) {
            function cb() {
                window.paypal.checkout.initXO = initXO;
                window.paypal.checkout.startFlow = startFlow;
                window.paypal.checkout.closeFlow = closeFlow;
                callback.apply(this, arguments);
            }
            window.paypal.checkout.initXO = function() {};
            window.paypal.checkout.startFlow = function(token) {
                cb(null, matchToken(token));
            };
            window.paypal.checkout.closeFlow = function() {
                cb(new Error("Close Flow Called"));
                component.close();
            };
        }
        function drawButton(container) {
            var button = document.createElement("button");
            button.innerText = "PayPal Checkout";
            document.getElementById(container).appendChild(button);
            return button;
        }
        function initPayPalCheckout() {
            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            component = _components.PayPalCheckout.init(_extends({
                env: config.env,
                onPaymentAuthorize: function onPaymentAuthorize(_ref) {
                    var returnUrl = _ref.returnUrl;
                    var token = _ref.token;
                    var payerID = _ref.payerID;
                    window.location = returnUrl + "?token=" + token + "&payerID=" + payerID;
                },
                onCancel: function onCancel(_ref2) {
                    var cancelUrl = _ref2.cancelUrl;
                    var token = _ref2.token;
                    window.location = cancelUrl + "?token=" + token;
                }
            }, props));
            return component;
        }
        function setup(id, options) {
            options = options || {};
            config.env = options.environment;
            if (options.container) {
                var button = drawButton(options.container);
                if (options.click) {
                    button.addEventListener("click", function(event) {
                        event.preventDefault();
                        initPayPalCheckout({
                            env: options.environment,
                            getToken: getToken
                        }).render();
                        options.click.call();
                    });
                } else {
                    initPayPalCheckout({
                        env: options.environment
                    }).hijackButton(button);
                }
            }
        }
        function initXO() {
            initPayPalCheckout({
                getToken: getToken
            }).render();
        }
        function startFlow(token) {
            initPayPalCheckout({
                token: matchToken(token)
            }).render();
        }
        function closeFlow() {
            component.close();
        }
        var documentLoaded = document.readyState === "complete" || document.readyState === "loaded";
        function onDocumentReady(method) {
            if (documentLoaded) {
                return method();
            }
            return document.addEventListener("DOMContentLoaded", function(event) {
                documentLoaded = true;
                return method();
            });
        }
        if (window.paypalCheckoutReady instanceof Function) {
            onDocumentReady(window.paypalCheckoutReady);
        }
        onDocumentReady(function() {
            var buttons = document.querySelectorAll("[data-paypal-button]");
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var button = _step.value;
                    var env = button.attributes["data-env"] && button.attributes["data-env"].value;
                    if (!env && button.attributes["data-sandbox"]) {
                        env = "sandbox";
                    }
                    initPayPalCheckout({
                        env: env
                    }).hijackButton(button);
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
        });
        window.paypal = window.paypal || {};
        window.paypal.checkout = window.paypal.checkout || {};
        window.paypal.checkout.setup = setup;
        window.paypal.checkout.initXO = initXO;
        window.paypal.checkout.startFlow = startFlow;
    } ]);
});

