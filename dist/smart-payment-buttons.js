window.spb = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = !0;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    };
    __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        });
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    };
    __webpack_require__.t = function(value, mode) {
        1 & mode && (value = __webpack_require__(value));
        if (8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        });
        if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return {}.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = "./src/button/index.js");
}({
    "./src/button/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "setupButton", (function() {
            return setupButton;
        }));
        __webpack_require__.d(__webpack_exports__, "TYPES", (function() {
            return props_TYPES;
        }));
        __webpack_require__.d(__webpack_exports__, "getProps", (function() {
            return getProps;
        }));
        __webpack_require__.d(__webpack_exports__, "getComponents", (function() {
            return getComponents;
        }));
        __webpack_require__.d(__webpack_exports__, "getConfig", (function() {
            return getConfig;
        }));
        __webpack_require__.d(__webpack_exports__, "getServiceData", (function() {
            return getServiceData;
        }));
        function getUserAgent() {
            return window.navigator.mockUserAgent || window.navigator.userAgent;
        }
        function isOperaMini(ua) {
            void 0 === ua && (ua = getUserAgent());
            return ua.indexOf("Opera Mini") > -1;
        }
        function isAndroid(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /Android/.test(ua);
        }
        function isIos(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /iPhone|iPod|iPad/.test(ua);
        }
        function supportsPopups(ua) {
            void 0 === ua && (ua = getUserAgent());
            return !(function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return !!isIos(ua) && (!!function(ua) {
                    void 0 === ua && (ua = getUserAgent());
                    return /\bGSA\b/.test(ua);
                }(ua) || /.+AppleWebKit(?!.*Safari)/.test(ua));
            }(ua) || function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return !!isAndroid(ua) && /Version\/[\d.]+/.test(ua) && !isOperaMini(ua);
            }(ua) || isOperaMini(ua) || function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /FxiOS/i.test(ua);
            }(ua) || function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /EdgiOS/i.test(ua);
            }(ua) || function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return -1 !== ua.indexOf("FBAN") || -1 !== ua.indexOf("FBAV");
            }(ua) || function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /QQBrowser/.test(ua);
            }(ua) || "undefined" != typeof process && process.versions && process.versions.electron || (userAgent = getUserAgent(), 
            /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent)) || !0 === window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches);
            var userAgent;
        }
        function isChrome(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /Chrome|Chromium|CriOS/.test(ua);
        }
        function _inheritsLoose(subClass, superClass) {
            subClass.prototype = Object.create(superClass.prototype);
            subClass.prototype.constructor = subClass;
            subClass.__proto__ = superClass;
        }
        function _extends() {
            return (_extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) ({}).hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }).apply(this, arguments);
        }
        function utils_isPromise(item) {
            try {
                if (!item) return !1;
                if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                if ("undefined" != typeof window && "function" == typeof window.Window && item instanceof window.Window) return !1;
                if ("undefined" != typeof window && "function" == typeof window.constructor && item instanceof window.constructor) return !1;
                var _toString = {}.toString;
                if (_toString) {
                    var name = _toString.call(item);
                    if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                }
                if ("function" == typeof item.then) return !0;
            } catch (err) {
                return !1;
            }
            return !1;
        }
        var dispatchedErrors = [];
        var possiblyUnhandledPromiseHandlers = [];
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
        var promise_ZalgoPromise = function() {
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
                this.resolved = !1;
                this.rejected = !1;
                this.errorHandled = !1;
                this.handlers = [];
                if (handler) {
                    var _result;
                    var _error;
                    var resolved = !1;
                    var rejected = !1;
                    var isAsync = !1;
                    startActive();
                    try {
                        handler((function(res) {
                            if (isAsync) _this.resolve(res); else {
                                resolved = !0;
                                _result = res;
                            }
                        }), (function(err) {
                            if (isAsync) _this.reject(err); else {
                                rejected = !0;
                                _error = err;
                            }
                        }));
                    } catch (err) {
                        endActive();
                        this.reject(err);
                        return;
                    }
                    endActive();
                    isAsync = !0;
                    resolved ? this.resolve(_result) : rejected && this.reject(_error);
                }
                try {
                    throw new Error("ZalgoPromise");
                } catch (err) {
                    this.stack = err.stack;
                }
            }
            var _proto = ZalgoPromise.prototype;
            _proto.resolve = function(result) {
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                this.resolved = !0;
                this.value = result;
                this.dispatch();
                return this;
            };
            _proto.reject = function(error) {
                var _this2 = this;
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                if (!error) {
                    var _err = error && "function" == typeof error.toString ? error.toString() : {}.toString.call(error);
                    error = new Error("Expected reject to be called with Error, got " + _err);
                }
                this.rejected = !0;
                this.error = error;
                this.errorHandled || setTimeout((function() {
                    _this2.errorHandled || function(err, promise) {
                        if (-1 === dispatchedErrors.indexOf(err)) {
                            dispatchedErrors.push(err);
                            setTimeout((function() {
                                throw new Error((err.stack || err.toString()) + "\n\nFrom promise:\n\n" + promise.stack);
                            }), 1);
                            for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                        }
                    }(error, _this2);
                }), 1);
                this.dispatch();
                return this;
            };
            _proto.asyncReject = function(error) {
                this.errorHandled = !0;
                this.reject(error);
                return this;
            };
            _proto.dispatch = function() {
                var resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                if (!this.dispatching && (resolved || rejected)) {
                    this.dispatching = !0;
                    startActive();
                    var chain = function(firstPromise, secondPromise) {
                        return firstPromise.then((function(res) {
                            secondPromise.resolve(res);
                        }), (function(err) {
                            secondPromise.reject(err);
                        }));
                    };
                    for (var i = 0; i < handlers.length; i++) {
                        var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise;
                        var _result2 = void 0;
                        if (resolved) try {
                            _result2 = onSuccess ? onSuccess(this.value) : this.value;
                        } catch (err) {
                            promise.reject(err);
                            continue;
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
                            _result2.resolved ? promise.resolve(_result2.value) : promise.reject(_result2.error);
                            _result2.errorHandled = !0;
                        } else utils_isPromise(_result2) ? _result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected) ? _result2.resolved ? promise.resolve(_result2.value) : promise.reject(_result2.error) : chain(_result2, promise) : promise.resolve(_result2);
                    }
                    handlers.length = 0;
                    this.dispatching = !1;
                    endActive();
                }
            };
            _proto.then = function(onSuccess, onError) {
                if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                var promise = new ZalgoPromise;
                this.handlers.push({
                    promise: promise,
                    onSuccess: onSuccess,
                    onError: onError
                });
                this.errorHandled = !0;
                this.dispatch();
                return promise;
            };
            _proto.catch = function(onError) {
                return this.then(void 0, onError);
            };
            _proto.finally = function(onFinally) {
                if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                return this.then((function(result) {
                    return ZalgoPromise.try(onFinally).then((function() {
                        return result;
                    }));
                }), (function(err) {
                    return ZalgoPromise.try(onFinally).then((function() {
                        throw err;
                    }));
                }));
            };
            _proto.timeout = function(time, err) {
                var _this3 = this;
                if (this.resolved || this.rejected) return this;
                var timeout = setTimeout((function() {
                    _this3.resolved || _this3.rejected || _this3.reject(err || new Error("Promise timed out after " + time + "ms"));
                }), time);
                return this.then((function(result) {
                    clearTimeout(timeout);
                    return result;
                }));
            };
            _proto.toPromise = function() {
                if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                return Promise.resolve(this);
            };
            ZalgoPromise.resolve = function(value) {
                return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise((function(resolve, reject) {
                    return value.then(resolve, reject);
                })) : (new ZalgoPromise).resolve(value);
            };
            ZalgoPromise.reject = function(error) {
                return (new ZalgoPromise).reject(error);
            };
            ZalgoPromise.asyncReject = function(error) {
                return (new ZalgoPromise).asyncReject(error);
            };
            ZalgoPromise.all = function(promises) {
                var promise = new ZalgoPromise;
                var count = promises.length;
                var results = [];
                if (!count) {
                    promise.resolve(results);
                    return promise;
                }
                var chain = function(i, firstPromise, secondPromise) {
                    return firstPromise.then((function(res) {
                        results[i] = res;
                        0 == (count -= 1) && promise.resolve(results);
                    }), (function(err) {
                        secondPromise.reject(err);
                    }));
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
                0 === count && promise.resolve(results);
                return promise;
            };
            ZalgoPromise.hash = function(promises) {
                var result = {};
                var awaitPromises = [];
                var _loop = function(key) {
                    if (promises.hasOwnProperty(key)) {
                        var value = promises[key];
                        utils_isPromise(value) ? awaitPromises.push(value.then((function(res) {
                            result[key] = res;
                        }))) : result[key] = value;
                    }
                };
                for (var key in promises) _loop(key);
                return ZalgoPromise.all(awaitPromises).then((function() {
                    return result;
                }));
            };
            ZalgoPromise.map = function(items, method) {
                return ZalgoPromise.all(items.map(method));
            };
            ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                return function(handler) {
                    possiblyUnhandledPromiseHandlers.push(handler);
                    return {
                        cancel: function() {
                            possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                        }
                    };
                }(handler);
            };
            ZalgoPromise.try = function(method, context, args) {
                if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                var result;
                startActive();
                try {
                    result = method.apply(context, args || []);
                } catch (err) {
                    endActive();
                    return ZalgoPromise.reject(err);
                }
                endActive();
                return ZalgoPromise.resolve(result);
            };
            ZalgoPromise.delay = function(_delay) {
                return new ZalgoPromise((function(resolve) {
                    setTimeout(resolve, _delay);
                }));
            };
            ZalgoPromise.isPromise = function(value) {
                return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
            };
            ZalgoPromise.flush = function() {
                return function(Zalgo) {
                    var promise = flushPromise = flushPromise || new Zalgo;
                    flushActive();
                    return promise;
                }(ZalgoPromise);
            };
            return ZalgoPromise;
        }();
        var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
        function isAboutProtocol(win) {
            void 0 === win && (win = window);
            return "about:" === win.location.protocol;
        }
        function utils_getParent(win) {
            void 0 === win && (win = window);
            if (win) try {
                if (win.parent && win.parent !== win) return win.parent;
            } catch (err) {}
        }
        function canReadFromWindow(win) {
            try {
                return !0;
            } catch (err) {}
            return !1;
        }
        function getActualDomain(win) {
            void 0 === win && (win = window);
            var location = win.location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if ("file:" === protocol) return "file://";
            if ("about:" === protocol) {
                var parent = utils_getParent(win);
                return parent && canReadFromWindow() ? getActualDomain(parent) : "about://";
            }
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function getDomain(win) {
            void 0 === win && (win = window);
            var domain = getActualDomain(win);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf("mock:") ? win.mockDomain : domain;
        }
        function isSameDomain(win) {
            if (!function(win) {
                try {
                    if (win === window) return !0;
                } catch (err) {}
                try {
                    var desc = Object.getOwnPropertyDescriptor(win, "location");
                    if (desc && !1 === desc.enumerable) return !1;
                } catch (err) {}
                try {
                    if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                } catch (err) {}
                try {
                    if (getActualDomain(win) === getActualDomain(window)) return !0;
                } catch (err) {}
                return !1;
            }(win)) return !1;
            try {
                if (win === window) return !0;
                if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                if (getDomain(window) === getDomain(win)) return !0;
            } catch (err) {}
            return !1;
        }
        function isAncestorParent(parent, child) {
            if (!parent || !child) return !1;
            var childParent = utils_getParent(child);
            return childParent ? childParent === parent : -1 !== function(win) {
                var result = [];
                try {
                    for (;win.parent !== win; ) {
                        result.push(win.parent);
                        win = win.parent;
                    }
                } catch (err) {}
                return result;
            }(child).indexOf(parent);
        }
        function getAllChildFrames(win) {
            var result = [];
            for (var _i3 = 0, _getFrames2 = function(win) {
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
                } catch (err) {}
                if (0 === len) return result;
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
                    if (!_frame) return result;
                    result.push(_frame);
                }
                return result;
            }(win); _i3 < _getFrames2.length; _i3++) {
                var frame = _getFrames2[_i3];
                result.push(frame);
                for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame); _i5 < _getAllChildFrames2.length; _i5++) result.push(_getAllChildFrames2[_i5]);
            }
            return result;
        }
        function getTop(win) {
            void 0 === win && (win = window);
            try {
                if (win.top) return win.top;
            } catch (err) {}
            if (utils_getParent(win) === win) return win;
            try {
                if (isAncestorParent(window, win) && window.top) return window.top;
            } catch (err) {}
            try {
                if (isAncestorParent(win, window) && window.top) return window.top;
            } catch (err) {}
            for (var _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win); _i7 < _getAllChildFrames4.length; _i7++) {
                var frame = _getAllChildFrames4[_i7];
                try {
                    if (frame.top) return frame.top;
                } catch (err) {}
                if (utils_getParent(frame) === frame) return frame;
            }
        }
        var iframeWindows = [];
        var iframeFrames = [];
        function isWindowClosed(win, allowMock) {
            void 0 === allowMock && (allowMock = !0);
            try {
                if (win === window) return !1;
            } catch (err) {
                return !0;
            }
            try {
                if (!win) return !0;
            } catch (err) {
                return !0;
            }
            try {
                if (win.closed) return !0;
            } catch (err) {
                return !err || err.message !== IE_WIN_ACCESS_ERROR;
            }
            if (allowMock && isSameDomain(win)) try {
                if (win.mockclosed) return !0;
            } catch (err) {}
            try {
                if (!win.parent || !win.top) return !0;
            } catch (err) {}
            var iframeIndex = function(collection, item) {
                for (var i = 0; i < collection.length; i++) try {
                    if (collection[i] === item) return i;
                } catch (err) {}
                return -1;
            }(iframeWindows, win);
            if (-1 !== iframeIndex) {
                var frame = iframeFrames[iframeIndex];
                if (frame && function(frame) {
                    if (!frame.contentWindow) return !0;
                    if (!frame.parentNode) return !0;
                    var doc = frame.ownerDocument;
                    if (doc && doc.documentElement && !doc.documentElement.contains(frame)) {
                        var parent = frame;
                        for (;parent.parentNode && parent.parentNode !== parent; ) parent = parent.parentNode;
                        if (!parent.host || !doc.documentElement.contains(parent.host)) return !0;
                    }
                    return !1;
                }(frame)) return !0;
            }
            return !1;
        }
        function isWindow(obj) {
            try {
                if (obj === window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if ("[object Window]" === {}.toString.call(obj)) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (window.Window && obj instanceof window.Window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.self === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.parent === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.top === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && "__unlikely_value__" === obj.__cross_domain_utils_window_check__) return !1;
            } catch (err) {
                return !0;
            }
            try {
                if ("postMessage" in obj && "self" in obj && "location" in obj) return !0;
            } catch (err) {}
            return !1;
        }
        function util_safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }
        var weakmap_CrossDomainSafeWeakMap = function() {
            function CrossDomainSafeWeakMap() {
                this.name = void 0;
                this.weakmap = void 0;
                this.keys = void 0;
                this.values = void 0;
                this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__";
                if (function() {
                    if ("undefined" == typeof WeakMap) return !1;
                    if (void 0 === Object.freeze) return !1;
                    try {
                        var testWeakMap = new WeakMap;
                        var testKey = {};
                        Object.freeze(testKey);
                        testWeakMap.set(testKey, "__testvalue__");
                        return "__testvalue__" === testWeakMap.get(testKey);
                    } catch (err) {
                        return !1;
                    }
                }()) try {
                    this.weakmap = new WeakMap;
                } catch (err) {}
                this.keys = [];
                this.values = [];
            }
            var _proto = CrossDomainSafeWeakMap.prototype;
            _proto._cleanupClosedWindows = function() {
                var weakmap = this.weakmap;
                var keys = this.keys;
                for (var i = 0; i < keys.length; i++) {
                    var value = keys[i];
                    if (isWindow(value) && isWindowClosed(value)) {
                        if (weakmap) try {
                            weakmap.delete(value);
                        } catch (err) {}
                        keys.splice(i, 1);
                        this.values.splice(i, 1);
                        i -= 1;
                    }
                }
            };
            _proto.isSafeToReadWrite = function(key) {
                return !isWindow(key);
            };
            _proto.set = function(key, value) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    weakmap.set(key, value);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var name = this.name;
                    var entry = key[name];
                    entry && entry[0] === key ? entry[1] = value : Object.defineProperty(key, name, {
                        value: [ key, value ],
                        writable: !0
                    });
                    return;
                } catch (err) {}
                this._cleanupClosedWindows();
                var keys = this.keys;
                var values = this.values;
                var index = util_safeIndexOf(keys, key);
                if (-1 === index) {
                    keys.push(key);
                    values.push(value);
                } else values[index] = value;
            };
            _proto.get = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    if (weakmap.has(key)) return weakmap.get(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var entry = key[this.name];
                    return entry && entry[0] === key ? entry[1] : void 0;
                } catch (err) {}
                this._cleanupClosedWindows();
                var index = util_safeIndexOf(this.keys, key);
                if (-1 !== index) return this.values[index];
            };
            _proto.delete = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    weakmap.delete(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var entry = key[this.name];
                    entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                } catch (err) {}
                this._cleanupClosedWindows();
                var keys = this.keys;
                var index = util_safeIndexOf(keys, key);
                if (-1 !== index) {
                    keys.splice(index, 1);
                    this.values.splice(index, 1);
                }
            };
            _proto.has = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    if (weakmap.has(key)) return !0;
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var entry = key[this.name];
                    return !(!entry || entry[0] !== key);
                } catch (err) {}
                this._cleanupClosedWindows();
                return -1 !== util_safeIndexOf(this.keys, key);
            };
            _proto.getOrSet = function(key, getter) {
                if (this.has(key)) return this.get(key);
                var value = getter();
                this.set(key, value);
                return value;
            };
            return CrossDomainSafeWeakMap;
        }();
        function _getPrototypeOf(o) {
            return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
                return o.__proto__ || Object.getPrototypeOf(o);
            })(o);
        }
        function _setPrototypeOf(o, p) {
            return (_setPrototypeOf = Object.setPrototypeOf || function(o, p) {
                o.__proto__ = p;
                return o;
            })(o, p);
        }
        function _isNativeReflectConstruct() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                Date.prototype.toString.call(Reflect.construct(Date, [], (function() {})));
                return !0;
            } catch (e) {
                return !1;
            }
        }
        function construct_construct(Parent, args, Class) {
            return (construct_construct = _isNativeReflectConstruct() ? Reflect.construct : function(Parent, args, Class) {
                var a = [ null ];
                a.push.apply(a, args);
                var instance = new (Function.bind.apply(Parent, a));
                Class && _setPrototypeOf(instance, Class.prototype);
                return instance;
            }).apply(null, arguments);
        }
        function wrapNativeSuper_wrapNativeSuper(Class) {
            var _cache = "function" == typeof Map ? new Map : void 0;
            return (wrapNativeSuper_wrapNativeSuper = function(Class) {
                if (null === Class || !(fn = Class, -1 !== Function.toString.call(fn).indexOf("[native code]"))) return Class;
                var fn;
                if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== _cache) {
                    if (_cache.has(Class)) return _cache.get(Class);
                    _cache.set(Class, Wrapper);
                }
                function Wrapper() {
                    return construct_construct(Class, arguments, _getPrototypeOf(this).constructor);
                }
                Wrapper.prototype = Object.create(Class.prototype, {
                    constructor: {
                        value: Wrapper,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                });
                return _setPrototypeOf(Wrapper, Class);
            })(Class);
        }
        function getFunctionName(fn) {
            return fn.name || fn.__name__ || fn.displayName || "anonymous";
        }
        function setFunctionName(fn, name) {
            try {
                delete fn.name;
                fn.name = name;
            } catch (err) {}
            fn.__name__ = fn.displayName = name;
            return fn;
        }
        function base64encode(str) {
            if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            })));
            if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64");
            throw new Error("Can not find window.btoa or Buffer");
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, (function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            })) + "_" + base64encode((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        }
        function getGlobal() {
            if ("undefined" != typeof window) return window;
            if ("undefined" != typeof window) return window;
            if ("undefined" != typeof global) return global;
            throw new Error("No global found");
        }
        var objectIDs;
        function serializeArgs(args) {
            try {
                return JSON.stringify([].slice.call(args), (function(subkey, val) {
                    return "function" == typeof val ? "memoize[" + function(obj) {
                        objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap;
                        if (null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                        var uid = objectIDs.get(obj);
                        if (!uid) {
                            uid = typeof obj + ":" + uniqueID();
                            objectIDs.set(obj, uid);
                        }
                        return uid;
                    }(val) + "]" : val;
                }));
            } catch (err) {
                throw new Error("Arguments not serializable -- can not be used to memoize");
            }
        }
        function getEmptyObject() {
            return {};
        }
        var memoizeGlobalIndex = 0;
        var memoizeGlobalIndexValidFrom = 0;
        function memoize(method, options) {
            void 0 === options && (options = {});
            var _options$thisNamespac = options.thisNamespace, thisNamespace = void 0 !== _options$thisNamespac && _options$thisNamespac, cacheTime = options.time;
            var simpleCache;
            var thisCache;
            var memoizeIndex = memoizeGlobalIndex;
            memoizeGlobalIndex += 1;
            var memoizedFunction = function() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                if (memoizeIndex < memoizeGlobalIndexValidFrom) {
                    simpleCache = null;
                    thisCache = null;
                    memoizeIndex = memoizeGlobalIndex;
                    memoizeGlobalIndex += 1;
                }
                var cache;
                cache = thisNamespace ? (thisCache = thisCache || new weakmap_CrossDomainSafeWeakMap).getOrSet(this, getEmptyObject) : simpleCache = simpleCache || {};
                var cacheKey = serializeArgs(args);
                var cacheResult = cache[cacheKey];
                if (cacheResult && cacheTime && Date.now() - cacheResult.time < cacheTime) {
                    delete cache[cacheKey];
                    cacheResult = null;
                }
                if (cacheResult) return cacheResult.value;
                var time = Date.now();
                var value = method.apply(this, arguments);
                cache[cacheKey] = {
                    time: time,
                    value: value
                };
                return value;
            };
            memoizedFunction.reset = function() {
                simpleCache = null;
                thisCache = null;
            };
            return setFunctionName(memoizedFunction, (options.name || getFunctionName(method)) + "::memoized");
        }
        memoize.clear = function() {
            memoizeGlobalIndexValidFrom = memoizeGlobalIndex;
        };
        function inlineMemoize(method, logic, args) {
            void 0 === args && (args = []);
            var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {};
            var key = serializeArgs(args);
            return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
        }
        function src_util_noop() {}
        function once(method) {
            var called = !1;
            return setFunctionName((function() {
                if (!called) {
                    called = !0;
                    return method.apply(this, arguments);
                }
            }), getFunctionName(method) + "::once");
        }
        function stringifyError(err, level) {
            void 0 === level && (level = 1);
            if (level >= 3) return "stringifyError stack overflow";
            try {
                if (!err) return "<unknown error: " + {}.toString.call(err) + ">";
                if ("string" == typeof err) return err;
                if (err instanceof Error) {
                    var stack = err && err.stack;
                    var message = err && err.message;
                    if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                    if (stack) return stack;
                    if (message) return message;
                }
                return err && err.toString && "function" == typeof err.toString ? err.toString() : {}.toString.call(err);
            } catch (newErr) {
                return "Error while stringifying error: " + stringifyError(newErr, level + 1);
            }
        }
        function stringifyErrorMessage(err) {
            var defaultMessage = "<unknown error: " + {}.toString.call(err) + ">";
            return err ? err instanceof Error ? err.message || defaultMessage : "string" == typeof err.message && err.message || defaultMessage : defaultMessage;
        }
        memoize((function(obj) {
            if (Object.values) return Object.values(obj);
            var result = [];
            for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
            return result;
        }));
        function objFilter(obj, filter) {
            void 0 === filter && (filter = Boolean);
            var result = {};
            for (var key in obj) obj.hasOwnProperty(key) && filter(obj[key], key) && (result[key] = obj[key]);
            return result;
        }
        function arrayFrom(item) {
            return [].slice.call(item);
        }
        var util_ExtendableError = function(_Error) {
            _inheritsLoose(ExtendableError, _Error);
            function ExtendableError(message) {
                var _this6;
                (_this6 = _Error.call(this, message) || this).name = _this6.constructor.name;
                "function" == typeof Error.captureStackTrace ? Error.captureStackTrace(function(self) {
                    if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return self;
                }(_this6), _this6.constructor) : _this6.stack = new Error(message).stack;
                return _this6;
            }
            return ExtendableError;
        }(wrapNativeSuper_wrapNativeSuper(Error));
        function isDocumentReady() {
            return Boolean(document.body) && "complete" === document.readyState;
        }
        function isDocumentInteractive() {
            return Boolean(document.body) && "interactive" === document.readyState;
        }
        function urlEncode(str) {
            return str.replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B");
        }
        var waitForDocumentReady = memoize((function() {
            return new promise_ZalgoPromise((function(resolve) {
                if (isDocumentReady() || isDocumentInteractive()) return resolve();
                var interval = setInterval((function() {
                    if (isDocumentReady() || isDocumentInteractive()) {
                        clearInterval(interval);
                        return resolve();
                    }
                }), 10);
            }));
        }));
        function parseQuery(queryString) {
            return inlineMemoize(parseQuery, (function() {
                var params = {};
                if (!queryString) return params;
                if (-1 === queryString.indexOf("=")) return params;
                for (var _i2 = 0, _queryString$split2 = queryString.split("&"); _i2 < _queryString$split2.length; _i2++) {
                    var pair = _queryString$split2[_i2];
                    (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                }
                return params;
            }), [ queryString ]);
        }
        function extendQuery(originalQuery, props) {
            void 0 === props && (props = {});
            return props && Object.keys(props).length ? function(obj) {
                void 0 === obj && (obj = {});
                return Object.keys(obj).filter((function(key) {
                    return "string" == typeof obj[key];
                })).map((function(key) {
                    return urlEncode(key) + "=" + urlEncode(obj[key]);
                })).join("&");
            }(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
        }
        function extendUrl(url, options) {
            var query = options.query || {};
            var hash = options.hash || {};
            var originalUrl;
            var originalHash;
            var _url$split = url.split("#");
            originalHash = _url$split[1];
            var _originalUrl$split = (originalUrl = _url$split[0]).split("?");
            originalUrl = _originalUrl$split[0];
            var queryString = extendQuery(_originalUrl$split[1], query);
            var hashString = extendQuery(originalHash, hash);
            queryString && (originalUrl = originalUrl + "?" + queryString);
            hashString && (originalUrl = originalUrl + "#" + hashString);
            return originalUrl;
        }
        function dom_redirect(url, win) {
            void 0 === win && (win = window);
            return new promise_ZalgoPromise((function(resolve) {
                win.location = url;
                (function(url) {
                    return -1 === url.indexOf("#") || 0 !== url.indexOf("#") && url.split("#")[0] !== window.location.href.split("#")[0];
                })(url) || resolve();
            }));
        }
        function getPerformance() {
            return inlineMemoize(getPerformance, (function() {
                var performance = window.performance;
                if (performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0) return performance;
            }));
        }
        function dom_isBrowser() {
            return "undefined" != typeof window && void 0 !== window.location;
        }
        function querySelectorAll(selector, doc) {
            void 0 === doc && (doc = window.document);
            return [].slice.call(doc.querySelectorAll(selector));
        }
        function dom_onClick(element, handler) {
            element.addEventListener("touchstart", src_util_noop);
            element.addEventListener("click", handler);
            element.addEventListener("keypress", (function(event) {
                if (13 === event.keyCode || 32 === event.keyCode) return handler(event);
            }));
        }
        function isLocalStorageEnabled() {
            return inlineMemoize(isLocalStorageEnabled, (function() {
                try {
                    if ("undefined" == typeof window) return !1;
                    if (window.localStorage) {
                        var value = Math.random().toString();
                        window.localStorage.setItem("__test__localStorage__", value);
                        var result = window.localStorage.getItem("__test__localStorage__");
                        window.localStorage.removeItem("__test__localStorage__");
                        if (value === result) return !0;
                    }
                } catch (err) {}
                return !1;
            }));
        }
        var dom_PopupOpenError = function(_ExtendableError) {
            _inheritsLoose(PopupOpenError, _ExtendableError);
            function PopupOpenError() {
                return _ExtendableError.apply(this, arguments) || this;
            }
            return PopupOpenError;
        }(util_ExtendableError);
        var currentScript = "undefined" != typeof document ? document.currentScript : null;
        var getCurrentScript = memoize((function() {
            if (currentScript) return currentScript;
            if (currentScript = function() {
                try {
                    var stack = function() {
                        try {
                            throw new Error("_");
                        } catch (err) {
                            return err.stack || "";
                        }
                    }();
                    var stackDetails = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(stack);
                    var scriptLocation = stackDetails && stackDetails[1];
                    if (!scriptLocation) return;
                    for (var _i22 = 0, _Array$prototype$slic2 = [].slice.call(document.getElementsByTagName("script")).reverse(); _i22 < _Array$prototype$slic2.length; _i22++) {
                        var script = _Array$prototype$slic2[_i22];
                        if (script.src && script.src === scriptLocation) return script;
                    }
                } catch (err) {}
            }()) return currentScript;
            throw new Error("Can not determine current script");
        }));
        var currentUID = uniqueID();
        memoize((function() {
            var script;
            try {
                script = getCurrentScript();
            } catch (err) {
                return currentUID;
            }
            var uid = script.getAttribute("data-uid");
            if (uid && "string" == typeof uid) return uid;
            if ((uid = script.getAttribute("data-uid-auto")) && "string" == typeof uid) return uid;
            uid = uniqueID();
            script.setAttribute("data-uid-auto", uid);
            return uid;
        }));
        function getStorage(_ref) {
            var name = _ref.name, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 12e5 : _ref$lifetime;
            return inlineMemoize(getStorage, (function() {
                var STORAGE_KEY = "__" + name + "_storage__";
                var accessedStorage;
                function getState(handler) {
                    var localStorageEnabled = isLocalStorageEnabled();
                    var storage;
                    accessedStorage && (storage = accessedStorage);
                    if (!storage && localStorageEnabled) {
                        var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                        rawStorage && (storage = JSON.parse(rawStorage));
                    }
                    storage || (storage = getGlobal()[STORAGE_KEY]);
                    storage || (storage = {
                        id: uniqueID()
                    });
                    storage.id || (storage.id = uniqueID());
                    accessedStorage = storage;
                    var result = handler(storage);
                    localStorageEnabled ? window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage)) : getGlobal()[STORAGE_KEY] = storage;
                    accessedStorage = null;
                    return result;
                }
                function getSession(handler) {
                    return getState((function(storage) {
                        var session = storage.__session__;
                        var now = Date.now();
                        session && now - session.created > lifetime && (session = null);
                        session || (session = {
                            guid: uniqueID(),
                            created: now
                        });
                        storage.__session__ = session;
                        return handler(session);
                    }));
                }
                return {
                    getState: getState,
                    getID: function() {
                        return getState((function(storage) {
                            return storage.id;
                        }));
                    },
                    getSessionState: function(handler) {
                        return getSession((function(session) {
                            session.state = session.state || {};
                            return handler(session.state);
                        }));
                    },
                    getSessionID: function() {
                        return getSession((function(session) {
                            return session.guid;
                        }));
                    }
                };
            }), [ {
                name: name,
                lifetime: lifetime
            } ]);
        }
        function getBelterExperimentStorage() {
            return getStorage({
                name: "belter_experiment"
            });
        }
        function isEventUnique(name) {
            return getBelterExperimentStorage().getSessionState((function(state) {
                state.loggedBeacons = state.loggedBeacons || [];
                if (-1 === state.loggedBeacons.indexOf(name)) {
                    state.loggedBeacons.push(name);
                    return !0;
                }
                return !1;
            }));
        }
        var http_headerBuilders = [];
        function request(_ref) {
            var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 0 : _ref$timeout;
            return new promise_ZalgoPromise((function(resolve, reject) {
                if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
                var normalizedHeaders = {};
                for (var _i4 = 0, _Object$keys2 = Object.keys(headers); _i4 < _Object$keys2.length; _i4++) {
                    var _key2 = _Object$keys2[_i4];
                    normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
                }
                json ? normalizedHeaders["content-type"] = normalizedHeaders["content-type"] || "application/json" : (data || body) && (normalizedHeaders["content-type"] = normalizedHeaders["content-type"] || "application/x-www-form-urlencoded; charset=utf-8");
                normalizedHeaders.accept = normalizedHeaders.accept || "application/json";
                for (var _i6 = 0; _i6 < http_headerBuilders.length; _i6++) {
                    var builtHeaders = (0, http_headerBuilders[_i6])();
                    for (var _i8 = 0, _Object$keys4 = Object.keys(builtHeaders); _i8 < _Object$keys4.length; _i8++) {
                        var _key3 = _Object$keys4[_i8];
                        normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
                    }
                }
                var xhr = new win.XMLHttpRequest;
                xhr.addEventListener("load", (function() {
                    var responseHeaders = function(rawHeaders) {
                        void 0 === rawHeaders && (rawHeaders = "");
                        var result = {};
                        for (var _i2 = 0, _rawHeaders$trim$spli2 = rawHeaders.trim().split("\n"); _i2 < _rawHeaders$trim$spli2.length; _i2++) {
                            var _line$split = _rawHeaders$trim$spli2[_i2].split(":"), _key = _line$split[0], values = _line$split.slice(1);
                            result[_key.toLowerCase()] = values.join(":").trim();
                        }
                        return result;
                    }(this.getAllResponseHeaders());
                    if (!this.status) return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code."));
                    var contentType = responseHeaders["content-type"];
                    var isJSON = contentType && (0 === contentType.indexOf("application/json") || 0 === contentType.indexOf("text/json"));
                    var responseBody = this.responseText;
                    try {
                        responseBody = JSON.parse(responseBody);
                    } catch (err) {
                        if (isJSON) return reject(new Error("Invalid json: " + this.responseText + "."));
                    }
                    return resolve({
                        status: this.status,
                        headers: responseHeaders,
                        body: responseBody
                    });
                }), !1);
                xhr.addEventListener("error", (function(evt) {
                    reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
                }), !1);
                xhr.open(method, url, !0);
                for (var _key4 in normalizedHeaders) normalizedHeaders.hasOwnProperty(_key4) && xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
                json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map((function(key) {
                    return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
                })).join("&"));
                xhr.timeout = timeout;
                xhr.ontimeout = function() {
                    reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
                };
                xhr.send(body);
            }));
        }
        var VAULT = {
            TRUE: !0,
            FALSE: !1
        };
        var AUTO_FLUSH_LEVEL = [ "warn", "error" ];
        var LOG_LEVEL_PRIORITY = [ "error", "warn", "info", "debug" ];
        function httpTransport(_ref) {
            var url = _ref.url, method = _ref.method, headers = _ref.headers, json = _ref.json, _ref$enableSendBeacon = _ref.enableSendBeacon, enableSendBeacon = void 0 !== _ref$enableSendBeacon && _ref$enableSendBeacon;
            var hasHeaders = headers && Object.keys(headers).length;
            return window && window.navigator.sendBeacon && !hasHeaders && enableSendBeacon && window.Blob ? new promise_ZalgoPromise((function(resolve) {
                var blob = new Blob([ JSON.stringify(json) ], {
                    type: "application/json"
                });
                resolve(window.navigator.sendBeacon(url, blob));
            })) : request({
                url: url,
                method: method,
                headers: headers,
                json: json
            }).then(src_util_noop);
        }
        function extendIfDefined(target, source) {
            for (var key in source) source.hasOwnProperty(key) && source[key] && !target[key] && (target[key] = source[key]);
        }
        function Logger(_ref2) {
            var url = _ref2.url, prefix = _ref2.prefix, _ref2$logLevel = _ref2.logLevel, logLevel = void 0 === _ref2$logLevel ? "debug" : _ref2$logLevel, _ref2$transport = _ref2.transport, transport = void 0 === _ref2$transport ? httpTransport : _ref2$transport, _ref2$flushInterval = _ref2.flushInterval, flushInterval = void 0 === _ref2$flushInterval ? 6e4 : _ref2$flushInterval, _ref2$enableSendBeaco = _ref2.enableSendBeacon, enableSendBeacon = void 0 !== _ref2$enableSendBeaco && _ref2$enableSendBeaco;
            var events = [];
            var tracking = [];
            var payloadBuilders = [];
            var metaBuilders = [];
            var trackingBuilders = [];
            var headerBuilders = [];
            function print(level, event, payload) {
                if (dom_isBrowser() && window.console && window.console.log && !(LOG_LEVEL_PRIORITY.indexOf(level) > LOG_LEVEL_PRIORITY.indexOf(logLevel))) {
                    var args = [ event ];
                    args.push(payload);
                    (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                    try {
                        window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                    } catch (err) {}
                }
            }
            function immediateFlush() {
                return promise_ZalgoPromise.try((function() {
                    if (dom_isBrowser() && "file:" !== window.location.protocol && (events.length || tracking.length)) {
                        var meta = {};
                        for (var _i2 = 0; _i2 < metaBuilders.length; _i2++) extendIfDefined(meta, (0, metaBuilders[_i2])(meta));
                        var headers = {};
                        for (var _i4 = 0; _i4 < headerBuilders.length; _i4++) extendIfDefined(headers, (0, 
                        headerBuilders[_i4])(headers));
                        var res = transport({
                            method: "POST",
                            url: url,
                            headers: headers,
                            json: {
                                events: events,
                                meta: meta,
                                tracking: tracking
                            },
                            enableSendBeacon: enableSendBeacon
                        });
                        events = [];
                        tracking = [];
                        return res.then(src_util_noop);
                    }
                }));
            }
            var flush = function(method, delay) {
                void 0 === delay && (delay = 50);
                var promise;
                var timeout;
                return setFunctionName((function() {
                    timeout && clearTimeout(timeout);
                    var localPromise = promise = promise || new promise_ZalgoPromise;
                    timeout = setTimeout((function() {
                        promise = null;
                        timeout = null;
                        promise_ZalgoPromise.try(method).then((function(result) {
                            localPromise.resolve(result);
                        }), (function(err) {
                            localPromise.reject(err);
                        }));
                    }), delay);
                    return localPromise;
                }), getFunctionName(method) + "::promiseDebounced");
            }(immediateFlush);
            function log(level, event, payload) {
                void 0 === payload && (payload = {});
                if (!dom_isBrowser()) return logger;
                prefix && (event = prefix + "_" + event);
                var logPayload = _extends({}, objFilter(payload), {
                    timestamp: Date.now().toString()
                });
                for (var _i6 = 0; _i6 < payloadBuilders.length; _i6++) extendIfDefined(logPayload, (0, 
                payloadBuilders[_i6])(logPayload));
                !function(level, event, payload) {
                    events.push({
                        level: level,
                        event: event,
                        payload: payload
                    });
                    -1 !== AUTO_FLUSH_LEVEL.indexOf(level) && flush();
                }(level, event, logPayload);
                print(level, event, logPayload);
                return logger;
            }
            function addBuilder(builders, builder) {
                builders.push(builder);
                return logger;
            }
            dom_isBrowser() && (method = flush, time = flushInterval, function loop() {
                setTimeout((function() {
                    method();
                    loop();
                }), time);
            }());
            var method, time;
            if ("object" == typeof window) {
                window.addEventListener("beforeunload", (function() {
                    immediateFlush();
                }));
                window.addEventListener("unload", (function() {
                    immediateFlush();
                }));
            }
            var logger = {
                debug: function(event, payload) {
                    return log("debug", event, payload);
                },
                info: function(event, payload) {
                    return log("info", event, payload);
                },
                warn: function(event, payload) {
                    return log("warn", event, payload);
                },
                error: function(event, payload) {
                    return log("error", event, payload);
                },
                track: function(payload) {
                    void 0 === payload && (payload = {});
                    if (!dom_isBrowser()) return logger;
                    var trackingPayload = objFilter(payload);
                    for (var _i8 = 0; _i8 < trackingBuilders.length; _i8++) extendIfDefined(trackingPayload, (0, 
                    trackingBuilders[_i8])(trackingPayload));
                    print("debug", "track", trackingPayload);
                    tracking.push(trackingPayload);
                    return logger;
                },
                flush: flush,
                immediateFlush: immediateFlush,
                addPayloadBuilder: function(builder) {
                    return addBuilder(payloadBuilders, builder);
                },
                addMetaBuilder: function(builder) {
                    return addBuilder(metaBuilders, builder);
                },
                addTrackingBuilder: function(builder) {
                    return addBuilder(trackingBuilders, builder);
                },
                addHeaderBuilder: function(builder) {
                    return addBuilder(headerBuilders, builder);
                },
                setTransport: function(newTransport) {
                    transport = newTransport;
                    return logger;
                }
            };
            return logger;
        }
        var _NATIVE_CHECKOUT_URI, _NATIVE_CHECKOUT_POPU, _FUNDING_SKIP_LOGIN;
        var ORDERS_API_URL = "/v2/checkout/orders";
        var NATIVE_CHECKOUT_URI = ((_NATIVE_CHECKOUT_URI = {}).paypal = "/smart/checkout/native", 
        _NATIVE_CHECKOUT_URI.venmo = "/smart/checkout/venmo", _NATIVE_CHECKOUT_URI);
        var NATIVE_CHECKOUT_POPUP_URI = ((_NATIVE_CHECKOUT_POPU = {}).paypal = "/smart/checkout/native/popup", 
        _NATIVE_CHECKOUT_POPU.venmo = "/smart/checkout/venmo/popup", _NATIVE_CHECKOUT_POPU);
        var FUNDING_SKIP_LOGIN = ((_FUNDING_SKIP_LOGIN = {}).paylater = "paypal", _FUNDING_SKIP_LOGIN.credit = "paypal", 
        _FUNDING_SKIP_LOGIN);
        var ORDER_VALIDATION_WHITELIST = [ "AWU8hQWR5S8ynvUCz0T-tt2uRPzt7-wcIp_clASLr3KrXNdKcr_iPzgNsk4s3sOG2EzgOyqpeuL9Lt2Q", "AW2HA2wTdlPiJYixm961rEhamyefXVV4Y5CxJnRJGT_AnXVZuWnneEFnnGpDeIUZaCbpz_kwtEjFwo8x", "AU0KZbJCXg9J5OJXJxrUFMaCAkMvvrk-8khEB4vLyq76klYl5RSVGNrX4qh_aERn3Wsx5Vcn2eCPQ1fo", "AUku7YwlQ9LckQ9jBEAoDTOW_l-VyzeS2ZLNS4-kWoEI0Xh5VEFEgda7KeU3Z-bRIcZ4YzkJ6kp4CIZA", "ATyGfjcN1hYSg34FNM2QFpih-UgIKxiE6nC_HR4ifq2auBHxlzm7eFTToF0-GayrwDSNgwDmTYfPNvYD", "ARa44QaubKRAeUZRlkhqkWUAilO7IGlS6qcHJ4RmG6aaDuCAi232yOjfDwWmGJL5rdjvhaA_oHLVo3_y", "AZqSMr_O6WtkSWvp2GF526yJjSyjZsnaqvmp99w2gNJHtKfOdzpnNJiwjTd_yLjdf-wt2DUtJzFw16Bq", "AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb", "AZ27S6mY7iw1toHmoVzye1XwCiOJo_uIMYJIDpUwlTsG2rxTXW8Sl3tjUEwsS0TWGIkEq7CG1zXLLvvK", "Af8k4y06mmyTM4JxdmDUK0PJBR314Yz_nWddC13y5rHawFRREVmueGa0b-MMHl5_jvo6bMM1d7DnM2Uj", "AaRz5Xo5rOOW8Pq0ofvoKD5fb48gaPrKknItbEc1k79KH6z3aPsS5oUfu0uWj7BMuEru5_6jvhjSyvRs", "Aa5QWJGciaqznqahG4ooXiL9FNZuqEcL-vhdCMrb-jIMNAFpiG1SxW1GMcPmS5pQoxrwsOmV2KtNpk1Y", "AfzuuqC32z4_opOaPcCOgB0P112SCvGoJZi-79Yj5WGNoddoDQf7gG_mbGl3tZYJB_XsZ1dHDDgzhkH7", "AQ6b-BBBspp77ZytI3Hj0FKpACemsrXhu0Gds7ubWAoKxHCW1o7RnV76wCe4", "AfFU1v8QcnRtUY5xRwxW6nZlwGscc0dmMfVQP9Ce3mqKRvqddGBHnx62WhKVcAMPALE9aR1kPeJfy4xz", "AXjQJ2vHhgpu7DYUrE1IerCOOp9y-d8dSIMEIkc49ckjO9M04AehA8qm5jm0FIV7kO3CEtzZ8e-dp8-2", "AYJqlLYWc7pJ-z3rUJBdHicjlxRg-sQUPytyCpvgPcpB4X3rKZlrmJq6pQRUZ0Pb_LCV1cvi4CLGTA9d", "AQA6JMmn0j1yvIhc2mh0QP5HedKSpEEYQuZjHgmaIRVVlvzDWJU2twyT8OklWyz8NhVNlsKReUElO_xa", "AT-LIFIee2HjafB1SJxyxiX8Bnpv-bAEJKNNDFduENR8a7xGvcQRb_5QxxDq_nVF8L3hkBpqnyVue4vt", "AYc6HFlcGY99sz6mzMNWT10vuo6l1qwzKjlKeZ_JQuL2tkUtbKrWwNZ3pcFHZJYmFk5cXK92OodadpX2", "AZ8UUzGLndt7BWxjD-NobN8gFAarZV7PNN-XfBIM7_n3oU3roq610ytrpCtL2ikSOT_HtW8-2aq0HgTc", "AdC8njZRff48qO32BRskthX85OP6eGdW_2pwbySJl0WSa3MRPWGxddYiYf0ig9hkTu6ppWLp4uQFf7Wc", "AVm6hkTgp2kObqwkPrO0KZIHeREs426g_yaq1IPsoSz5ij0vOGGkBcmfIAB7ddrhdzFvDiE4S7FjGG46", "AdCK4t9F8PiG-Lbbpu9ot8TJmzlt6JqEjSBw0r4DuZQ-h8g6bU_RazHGajCSLfTfVtobXHH5NWq7-07H", "AefZb6HGDKO-Seg-Y-T7n8JMAahIQPYbQVoQdd8JKZmF-r8wV_BT8YvY1wq_6HJ3QpiGhH1x9wTI-Qer", "AZvPeGIweYjl7UjrBplKks_ABRUW12UVxZy4dw8bU7yVLvx5AxpP_kGy5VpnL5eiaqjeyY9bcIwp5UMs", "Ab1VkGmr1COkjo_6COidM4aQw32eggx3FrwdBLe_49nQjZvsN6NGFeKCiMfvgl1424JCAMWbDIB84nM9", "AfKPyV410xcQNtx6rx0yWBp0mmovau9eb_YyiB9uPX_lnWmXvOsdKN9HRWmEcDwcp0qzp74u_NijYth1", "Ab2xNfs6Tl9v49jUupCCg8Av_KDTVb1JKovfA92DPRDqjIWDDOmir3bx3cY4qLmgPxuhXNIIYm7K2Y3g", "AdmFNVRKWUWMj4UyEomTd0CW2hHQFcY9qB31B8PbWZYwzykfRS74Jw4vRC-5W1dScVuRwwFoeQAxFNoj", "AcMnb-pPPgZGWeK6bIi6sixOzjzSQnLBX875cg7XCwbhG9Fc6kRUiN7_qjlYHOX2FZMDDCXYC2Go65LF", "AXbYLpelIUb8i9iaFeQKXt3DlWpLyC1dc3d8WOx7fBMvPny-lHueS7DnFZnfIeOiRukpum5ejF8UdSzx", "AU6945tSYM7aVoRjvIEiFE4uLYn3WWXRAt_DbqbX0BCUDVfLdL_NB85NaJYRqkrRiU41pUwwom2E_47w", "AeLMaMHVVX61YKoNlLqoQ_1zX6MS3NBjvFZNBsrrOCgeZIeqoVwXWoVz681aMaXzSXkx2Q4CB2DzdxVV", "AU2UgmLki6ZfaDt27a7WM5J73IVi36nQva7oZGs5onuWbGyo1dqDf9ruVn-cgfjyNWYQvUzk54wOLgTh", "AaBPZpGg89TAPOa2VMaKwINvjpDh-EE7a-mZQ1vV95ZoEIz65ducH23QeIL1vPUFuuRGB2goniC9KrbB", "AbarfFDHDheK7p4Z-w7JZ8rXoPBWSALu91ZJXoRX-zGz3Y6eqFSzum4OyTxn7ZJXELy_tl1ZLimrzgyn", "AT4f7iaYeBKXSFR_e27h7F4z7h73L3-lMtH38jZh8KDQ5xp9NoTGpiz1oix4B69xiT1uFuBOI0r6_SLo", "ATWcvHcxfe1gfQ-znE_Ua6dVvX7fMRsdoBy1MmC_ApxPcG3rGZLDFoAkOmtJzrdRDFeu0EhXIAu17vJh", "AeV96uDGtI2SJMobKDHpR_IEhPD6NJG379LQHeFaCe_-GObH5rRCuP6-AWCarF2gh7dxh-si_uaWSxlu", "ASgMJnHCefNb23pO1tmCqWhvwT5D-opcT8W0TW2WeZXEnDw22r7epTCrSoNjKc8O4VlDLhP4oLEYyOHV", "AeGtpFEgJWl8EKAwx-jVRGZRy8fBYlZPG2cYL-kDJmKVv0o3tU3lOJNhzWMGjUdubmqsUtTcjyFzrsk2", "AUQRtcEq9z5DHLxjiSz3rwKgB1z-O-Df8nzNU2aKYxQbntIDV7rFiHGQrISElMo1JJR5N8sYpzqkq8Dg", "Aee7fyLlCExLFFB1Cs8eco2PsnVcNMYhj5KtFTxmmHLPGp3y2i_HyooUQtRCjKjN_445-7qjnoyR8r4w", "AfxJnj-1UN_l7r46FC27ufpCzt4ymiF7ctpexNeEH8hkQwJloFB5comni5SxflMYOkWnMXWTtVRzlbfZ", "ASCS3-SkSood0ZR2Ik8EtFZrI9MOKdEhptnQHypXbCk_z0wSICf6ElQ-ge5FACcGmtjKcV6h-xOWBqF2", "AdxKNW6Rvn2NyGD6r9N7C13nh9lKZnOJ_KaNAl0Nlj_csc_wmJnm3MgpyHOhugPhMChinj2Rfsr9mpDv", "AR5XPd0OP8aXFu_aHyBK9pP097vBH62c6afOj6sjH7KSB0CfNKZ6QIR_27rsKCZYmmCkRgjXePpTq01p", "AYb7yEHXW3_n24dkjn29InoA6dCPEDiKajhbrCwbIJTQfpGuzh8a5FS4MoyXyFsiK4vhgeWxtg6zuADW", "Afo1LVZtoaCSq5HI_naZpUMjB2C0_OiB6nNHlGaNe7jwBTunPXnbodmCr4ZTtpL3WT-4RkNG6DQFvX03", "AR67hODdVoxlUsOUT8BoHSYiOJ15WDQg90nkqwRP_14vVrEb1a3S4_caxBc-w51TV3AcMyACzYREtXrH", "AZxGGpjzsdT8yXYqFS_kp-Ai6E_7EwTJ03AoLiJj6z5TBXa6GZW5h2ZRfi5-K4Y6oLyrF8FpJpPqd5xY", "AUq0DPexx9Wb84WP3jKi9r2WH9xejePjH4KAsOdRj-q4f5PfwMZ_KpVhLvsJyo3lhpzqhOJEkqFspgGN", "AXOplj0iurFjzACM1RuuWcDRlVubsIQe7ry8SRAQg3LRVDyZbAmxOs2snzLSvNJhCtNNFANLf0cKguLe", "AUwoRlv3iZ3jt3o3hhcft_tZ5g6tvefEpjCf9YNGeH7q8p_WraleitkKfLnWIs8HLpzalgRA5AMT0BYO", "AQi-8_4bMO1BqBPldsz4FyybrZMDAeQO_uqEXfZsxgZGOrMbYl-pO7sKTnQpdsNxEgM-xa5HodTHXDQg", "AajSVnIsGJdD3fKO76SmA8HxLs9flPRpdLhp-KTM34I2ZZ12WqfLZ2S3zmbzwbwJOMi5AmS96jHXppPu", "Ady0oUeIgU24A60CEhog6THKv4rO0-58E1C6CXS3mfgBjonkj_fh6hYPP1_8qVzioVPhbX8JRbyeHV_1", "AW7mu9kZkNQnih14Ugvi7DmBpdouGHi8yv6DQHScKfz1pvNh7miD60WrQaf_sRQFbya9pln1JEhtx58F", "AejlsIlg_KjKjmLKqxJqFIAwn3ZP02emx41Z2It4IfirQ-nNgZgzWk1CU-Q1QDbYUXjWoYJZ4dq1S2pK", "AVfy3rhipHfrcpAARabvSbVcG8se_5Ye4Yez65UlXA2zNQAhFLwERbc7sFooSjc1pRkQDvpWM_-6UlQI", "AZNGPAzuZGI56_rR2d6Qt5Pg9p0EP0SlgqOLF1hJ-Jhyl7Fc4KLsW3WtUaQBsq7qEv-VcMfH3yRxckw_", "AdEIkRwwggl9QpNGdXzXlT6dPT5UcxS5G3pzdimct2fQlfv2e6JC-ZoR2wEaqy1VRSYN5zYATl04lQPJ", "AV2UhIeUzG0N23-zt7_KBQ3OhYq0ZurLSvm75NuFWl2iMtNiZr0k78AvPweLerv8DcdSENAAPy_qVHdc", "AX8Pb-sAgAFp_gHsk2dQX30ABfcvMabRjPRJ97IqRt9LWWGn6bsNiU1kYqMWBkRim_ONg1XnrOq9HycV", "AQkboqLaGeUqU-UcsupDWhGINLljqGPvy1pm6JMp1EQMcuz--sOwhOp20s0H4y1b_X6EYgUYmwl3_QbI", "AVxk36f8VzzEEbhmhFRdeWR0s6kjHJB88V3q1VCDDWO-vUHkpHDx5a3c5KBiSwrEnodgmIDyVrySo19W", "AbS9SBIomzAqKCnZgxxI922RWH4sRjcXQVkzbQoxwGh1yLU5K3NyBiIksj1qy-cgI0UTRaKEENdVA3UG", "Aeof7I__CpI_sDTMc0sabPC2AtcDFSWYTA-AuSX35LgSdK_nveXR1zNGPzWb5d-EkXP8EaHFvpTXOt_W", "AdFNiM95Vg_Xslrjr1PY-bUWGKHheQsGWo46dXPnSWfkGWhOpGqCH7SOivcQU1Bw968KwMiYIdOrC9C8", "AVQfN-d4gHcYcLlNAV5jcn17hiXLr5-yktBxwl_oviEHekLjF_VtiWEHzpc7qs8VBooeZ-9HNkIaZC8c", "AWZIhxjocZGX-AfhRrmStAUGypQjzWEQEnLV670Qui0ZdjBH2xiXlCEpnXbaHxxwV011ekhRWt6kWQzy", "AYJNkqXTB-LbDWY-geBeteUhFckZhmKUXoQm1EKrHFs_jT52-Xs9HrM4yZe19i65TLy-KTPSZrbQWL4d", "AaJdlGSlPSHCXuUsoizK7BX1gQGk-LXzvuTQuISXPz5aJf07UXhnNZBXHnZ6PBIGgPSLz_ezOW_JMWI5", "Ads-AIlYmzcupU4h7aNwYtZCoxFhsytxkGRc449oi4KTs8JxxM32te5WnObdQ63roSR6_ap_RX0o-TyU", "AezPnqbw-EqAB-3QxkcQzOTFu_BZB4p9ELEmDvBRIfNYi2MktC4OR3ls8-kfoRucnB7oQoZV_63a09RE", "ATqRzjL44zV0uvmI-I8UXaA7aGN5UgXaIYvPnXot4EhMOFhL02PqzVX5vFPJ3I7Q7ezYGDluKsYJbTlb", "AQb_uhCxkswoDV-msDRSEvBrENNqphJo-cGxMJ7nUa9hSArJhefMfdMvtVRN065kc4e2jp8rJ0X8yQrz", "AcxzPl0cMHMyjC5D4uMaQZ0oqjNEGNItIbUgeokdAXzFs9Tr2uYJEe4l76DUh4HnX0Bz3XSYR0Pnwn3q", "AbBeFZDAUYMZQ-EZMFQhx3K3_vvX2tU_45Lq6G4PrAzgP3gp6UfyaFVEg7DKo0diRDacyhcJO5Bpxij3", "AR337Je4oqSvRgX7HjX2Sv7M1VsK7Lme0WBssuEwW66bkphUUWw-JjjVvHNW4ttTdikGHraEBfD3pKcZ", "AXwYaDB1wXCQLJsQwaJhpckEFdZmuZMohfwEKH1vTm0Q5HJTw3t_Zqllc0unozCPPR19Ahlq08vNsPMw", "Af8uKf29kbmHdbkYF7rCs4cAwupeZQZ42HBlOTv8C1cPsQDleyL-KibrX2rI_qxUfPXgS-AmUcL2EkCn", "ARqhdSV3eoTacPNpD0m-xMnGuaYsbdCi8xCtAM_NKRqiZ_Kj2GcmrnpKRJOimbS4Dqg2WBlMZvM_a198", "ATdvBkuCmZU0bTUYpr6UZH43vK5293QKgxGkPSYgfr5zfib2PbHNeYI_NSuhsJkiGiQqCAMLkx4lSffx", "AZHX5-mWu26D4D6Ocw_8GxZTsvGtlFCm_clftgJLP0eixyZ0rTbVBu-T5RpTaw2JYXK1rzxIibE2wUcm", "AUYwY3jZaHqT-hh5Ogpy1WkNunjk_AWi9pjdm21kb5GFOyJUnquvZeUx1jPHLYSwS1l_pHvWudWZUocs", "AWkpAaV7rEJCfTdsnAZ11aisQ_SFD1MPCt8ZLZXRga7acQT2q3UffhOPc3ei5hoW--H3rXVTlIFnn1jM", "AbQ3QKqGPFeBWir6QK2na3JAFsMp9scbSOeRi0_15AA5q6XMi4hTRuO4Tmme6jmAi3SvRY4PTPDEqY7V", "ASD3LOuSg39EBl3Pd9PEZU6GMkA-yIJQhohSF4owo2fL2eelnrgRYQKYdbvtYI5O3IDp1Pw5iqEv5Hbe", "AVRFLjMTInsB9StyuRZltkDbN4Bhi-QiXcIeqPO6YPU7GSOLR3i8F9f6pVX38_EkmDhIpgXM-D4GnPdO", "AUoMvJA_FdhFwJEVL6Ri7YhdU2nrPQUoags0yhV22_17ZgWmfvh5Zqyyxpsba-dq-LH6w0tuIuEQJ2bp", "AfCSDNtSCNV6lzSOqF3jTnR2UHPdi225JVtSowAVEcDi6KgBYBP19qnwT14_dMcALbArsbQA1s4vVGM6", "AQUolB5X1HACW19AGVFANA1SuuJOArLYtyJ0zI2yvD1jVxgUhZbl4E-m4ry_emlAEsik3xm4gcvKKL_B", "AfWrrGm1rpmDZGvGBxD0UssB3Ru50PGNgIcaWOpAN8mFGGkgl4Othmu8kPlunsRgR8YwPerYCdtiWUVL", "ARnCYfY6j3qid5w7dQHUMtoRebesjooa-ZDvw-sgChzdIap0eGlxO5rwLQy-TwKB9FNtMvEaXjKOGatC", "AazXPDqbAnyE6iEbvPw8wYi2YpjIJkRczJUF5CiSKNoQ6rEmP6mMzwAlf_KDRzTazEUukaq2feqcYYuG", "AeDWFs5RFH33pB3skuP1M57jTWgMHSuKFMxJtkMddpYsR7SSEBanfqI1RN7LlRaQ_Jmjxb8-L_1dbIJW", "AdfXyxI-oHYghKou93lC4LRkRB0OP3-8h0L5srBeDzUYFwJ44_Jk4Vv71CKt3BlMUlGUGseBIoRFAu0F", "AaXrMQuzMiglUVTF6DWsGEXij4fOW_IQU5dZ49WvIGs-lBMiUtPW9PSVX8jQbwZZsDP10xEpAjUllgcr", "AYSLmzwkSsjQMKrDgKGmAfYjO-xr06W3-WWg0DfayGHeWu7Im7UB5eetTIHUso6d-zpcE_odqb6doeBz", "AaK4HlTbGd6DSR3mnUx7Xhc3DM5akcMdDQpqnawV1O2XkLZVuAAsHswM2PK8H2UBsddrcblhPgGV2PHL", "Aa5ceOuSFIsr-yA7Xc3p-3ZAFogzycThssblaTOUd1JpcLOUX8LUXApTe2m_QvmjAovdYcs1YujLvRtu", "AUf_Wbw9mq4zdVOg4XYC5JHrc-mGolFDwWF6ex-l7BA8lxCp7B0VKqU7BpQWlrfCxgKe5fqRL_N7Knz7", "AUH7PO7l4LubjN0ogPX2GY28oACKu296xjV1a0yRGWdd3EwfBmOyWSYO1doaZd0gx-Bx7Zao1SsY23EW", "AbH0SUlVzrLY0ldQG026EbqR0lVthG7UP5XpZGjoyTAUxyDNPvtyR67dcUSNLxOZSX2TLgNIRk5jX29D", "AeadV3OUHInuU5wL-D5zlR-luGSVIfX-nA90teNgJQGYscnG0RvVnq5eNme7pnHtcVnRCBVl4itjlG4b", "Acv9CfoOzVZ-rIwwd3xF6KK_meBjucMzn5m8LdlYHPr4sHr0u9adnH3DOlNrUA6QolpqhGEWmptO6lqi", "AeLH-VryI92PffbhsBWgsnhFBftVk8zwbupdi_LwKAQFckM6OmwTGbKWOOKfUz2LQctrtvVygNvs6iXf", "AQMYXqEHnLgLDn2Ke_4SefTHx4oL5pYbEmlp3g0D282gED7WCCFu4C6uMk8OqHdkTQIYmd63cr68_-Hq", "AT9wpTr3uD58XIjdJkQd6OOh_m9392fPJg3Oo1mSki98E3OvDqVw2U_uBZ4YltQjo3iNrn7ZlRz4JjGS", "AUqz2lilNW9t5eMx1VEwCMVSDeMHVas5zLpolzIGLDOjaJgS51Yy8fep4KKNQTUi-fj9yO7qIxSKRN23", "AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP", "AW6_nv9voVzeF2SPx2CeIWV3AYzNFDOiPOmoGtiRwQB6t58EN4ix_utEKqDHSAQUaxhYI-AtwnoQnMUL", "AXVv0WVqILDE_ALwvlqIuLMT4h_2OCQu28rZyzN6VHiB9dFlPFJpWyoZnkzUBYIbuuYwdxfNZPvNwqSJ", "AfcRKeMgHWWby7ltUUzqiTBoHmO4aVrsdNpRZVBiEZt7U56nKUGySIyNSK9m2JvCQfOGfjxI0oZKAYmS", "AQVhaTnL5pyyXwnn4D8pGfZIpSASJ3hvCfE04-2t-oZ5bxG0Br08c1v609avdfOd8M1jTGaAMZCu-MLa", "AQnAfBfkA8BoHKE63NS_bKyGpVaxxmgRfPzgxThwY_N9fTSrSITOKSSv6OTrpGHiSrA2YbLKo_KB4qeh", "Af_pMiA6ikCtlsNB8dJW1oG1ZI7FirXbRU43rDRfq_i_iQAPbYsojeI9Q2VzZvD1u2wKEPuaokZaNWyC", "Af3YaeRfoJGtncwLeiahT93xTYT0-wldEEaiGehhGspP333r6tADvHeVCwZPR022F4d0YQquv7Lik_PT", "AXg0AmHuT2a0Fg8NXx0SezjfLG9UgmLK1qE-fUfbAi6fEF1mbXWAcfp0-rlzFhWS-K_aXveJ2_h95E4x", "AdVBcUmJoUuavK3_TQkaUMV5S45EDAsY2G_GN9dw3MxbtdUeEu0Lio2nATu-cK5PUGJMqIUME4soaaDr", "AVVPnV2oTAsBDiXdmLnZxhgnVpGlYkMlByGm_SzWg_3e85tbRhD49Ix-Ucx3l0ib9BfmZykje0uV5KzK", "AfWrLXLdbApBAVcEvM7xmQwr2QhHMk6jbvAx4jDMnS4QGmkdxQ5uKDfwOV0jHyPC-0pRSisTRpB7sEby", "ARkuH9nh8MlJG8zEmVHx9jKsi8xWHR-P_1vWD8--7vsqaWl2zBO3_TAipWc6f9yMHmziI_0blQqViGFG", "AZgBvhDOw5FiH6rL1VPNaAQ68dmpMaAO-ZI0rg_QWC7of7SLT6JXSAagblw5", "Ae9ydowlZztIMFy9HbRaMTyLDltKCy1v-8Ip6J9WkU4WUyWcW_QAzUnMPLV9cxy6czPjtN21uddn9IG4", "AWWh5qDSn8fdahjjO4AJ_GmbyXjb_Qwrmk_Vtr-d6TCb6IAyPUItp6L7iyZ_KgIBxBhLLHpJF13xMhXl", "AaJ6YsPUaMOVjHH67sM0pWiAxlGU5dMNmBHMDu6IxpxX4RMxTNwHShxDabIIIoG_hezmQ_bLwBl62Zz-", "AavIU-CI9kUiQ7e76nQrNWl08jQdsCSOALmuWJ8cN2rpJwKNm9SLcWyJNErFLNNYvXjRRxVVnJW-4iRw", "ARwAdSLROuMQJ-91zD4w_-_Pe1FkBJEgTpKNw8LZKCtoRxsq5cQaQDcOW3V8QAziiIlp_xAr0iMhL5Y6", "AWpmV2CUaza_wgqCWG5df8LRAgmWyD__zhsJJHU9TOdqgZs95mvuvMRmaLPlYrRJMaVVy8Dz-Wqkmute", "AaCbDDpHWz5anhIQ_Ge_RmUqTLguwXwCrn5U50KZt7xU7tU3tH411rCyBuNYCaIV_nvgOvUNmI8YU_Df", "AfUEYT7nO4BwZQERn9Vym5TbHAG08ptiKa9gm8OARBYgoqiAJIjllRjeIMI4g294KAH1JdTnkzubt1fr", "Abu0Rwqhorsjm3yK3OVe-Cy15saxELijgiA8yWdGveJvDgevs7Nc_P-zsHg5tCJoac4mcjTVjGuJLBzA", "Ad-_JWvlIx4ED8vWip75RskfgcM1JLY3NnAKDoqDSBr9gxXVR1L5kVFZGqKHR_lIQO4gY7EFrQz7O0pj", "AZh-q5bJ1_kWDREHUN390ffVG-ubxGxHB08kvHlWETqkleYtWWhGge8z5nKzfZW7aM-U3R0YJTmbfafh", "AZymbWti-n22driaG2L7G7NOyQMZgKumqw05JTSIT8_MWMGMqsWdWR4TBo_e75oVkMViBe4zjO_DDmjI", "AdRRy5qiC2TsP3OtbkgwRzLpU8WqdAjVf18Me1BO7yRMBHK1JVHXqlr8XIIj9qagyePiG4_Z8iZIgOmm", "AXjYFXWyb4xJCErTUDiFkzL0Ulnn-bMm4fal4G-1nQXQ1ZQxp06fOuE7naKUXGkq2TZpYSiI9xXbs4eo", "AcSMCRA5xVRrJ7HOPe7HFj1GicmGAUIKujZVOYnDD9_Qiz_HYSrx3RlAtVwf", "AdZYKRBNf1xFvz6fcYRoTXlmoBg-acv-dakLzJTtaBn0cqNf5M8Z4OCHUBMv", "AU-ACu0mLYYRgiceSGEbzYcX9yA5bhil5ICbW02h2M7cbdEwiAE6akFH8NgRuCsT6dI33gzZX9zmKr3M", "Ab6M4m9Nok1o_LOQq0l1Sc1fX8aWo_Ce0Mrjm15FyXguNnWzgHOJOdWKbz384w-Ja5FsJ4IXHScGwo1E", "AaGocs2Ps2V3yhN7A_lS5SdS1mF2hxmUZ8SNBCzFHf0TUpGdkmwEomPxENzxR8_tqYKcwgB_TErnHCX6", "AWmkdE5Z_AhcR3GGOophAu_qDRHpOh22NJBB-0QjLFpWFo0aY_wx1UBwqmiG4OY-BFkS7L0gXY6gSmu8", "AVt2-Fr2w7QVb7qxDp0gHohDqZFQKYB4MgUs4KULrN4zayXnwycugMykkE1zUjYJBsglaAWFGs_U8UEt", "Ab-nG3JqVgV470TB3zmlXXMt9vZvUlOqNGVMkyu51ymtw8MESNvwkyFUbERwEU1obtLJp3g1V30v3lLQ", "AdTMvLUejL5-E65uSwBZnRjNV5JlTrGMvEQEwhMLU4dhm6cJTfgzHuYhKt5r9vfKlwNyeieq8-ZqdFGW", "AQX-OJLJe2aT67e4nouWcPdrl4Q4uqOMoC5jS0otp-vX7ZcYM_uQQQuFST6l7QKtC3Fg378Bh1c6qtXr", "ATDAHEYwG8nsvQgqf9yTWUbQ2iBfounObrJWfoeoEWoErLoaUW_rMh0i3o6uAN6XfRvU6GUnF1gRHL-P", "AURDh-fRhpncZm8Y2qxh_fj9VaUH2fTeEGvA9L3jkak1vfhISEDoWTsmYVfj2Az_4nPWaZlPwi_obgTA", "AUPF8VFKX8BsjR3ON0IDB71s2tcW_RF-q-ppFwFU81LfDUCyhPChAeATXYPeGsgLIlB9TEN_bkh-_ASb", "ATr5EshElZhaC4c0e2_ZwaSwKb0S4RKy39g-4al7OUYUezgOuKV-IQdyLesPj4axzgSldEzLbWAeVYc8", "AfPnJMClV1R-CNXdpctubgLazXxJ5cUDPeImRKZRLGqWep1N4q22hEDtfXC3R7daG0JdtOO4vNqgKs5L", "AYphQKIxbbbdGutmpobhIbo0jkFSigSIMCE-L79h71YBjzsBjP18q9RK9rgeeZ6APprQ9tWAFf2FNGRL", "AZQPVKeH0usLoAuZVvn8_jOGHCT6nP7pySllud9Dh-sbIqi7kBgDt9Xs6bCxEhCpF24x1JieEDdgn29S", "AUcaacy0l8SHnxKXCdYaZLHcrRPoj6KDxw78tHlZ6zaJ7ALqeIx_rXfkXZ8EDH1DgSfZIAw1r92NzFTu", "AXz-FTdsaLKAup3SCFE_BBHjr4vtV26NLHt-oSvcxhqjBUjMKiNM4xH4zALKTyiu9_E3laCtgbn3_Zxl", "AeDCkxuOsfL2RdE9qGK7pqNOMvjknv02TZnIBqj48N7jr9EsNuHKfvO-2Ndq62It-TtifNWdALIaly5B", "AZB6Fi32uCC1QRTPi98AR-yBdDyiYBlW2iybmv3oPv2ka8OVM41OGW3N8DICRfZg5kvyjpdgizGxNpO8", "AUdiNR8sRJIYiwA02_4UuSjRRUvGUFqaS9a-xJQPRBeJnbZKY4DRBPzc_MHkoHN3parC7iaUcSZoUNHs", "AX9Y1FE6CmttN_PzOo1rDjjnmQrgU5gTbIy29G56vnM4imILXMW_9Q-WbFw6Lqv89Au1bTETv17YZCCm", "AXw0UXVUt0zPbf8zAeuYUPH5Mk6yWbGk1GFXYrKAEveUJiC7UCmAWPacs1-ri1Q2ACUNt0fVDcxY_phQ", "AUTeu3BWbHn4Z4sH_fAF89K_WdAtUIe_EnhpGlXrEEbj4MpBwbs8VCbwCGmiOzSRqt5zu37OihWxRC6I", "AV4Y0B7PSyc6DW63gsLtgk12P02kXFcdMJSt8LiyUuiAFS60z22ZlbYNLOBaaegHENNTEFsWX7n6bPP8", "AVEjCpwSc-e9jOY8dHKoTUckaKtPo0shiwe_T2rKtxp30K4TYGRopYjsUS6Qmkj6bILd7Nt72pbMWCXe", "ATLQ9jIClPt9QFPCVGFNaODFlZWIkqGv8os6ntTK-QR1iTRbMntGtvuJNR-z06QIrsPpe5ujJrfJnw80", "ATWCV-slH_K6L9tzvdm-comm1gpQqHxji7spHcfGAARQ_NuMRRYAHR2gJ36A3okABucUuImSl1YSqnv4", "ATDgSNqwYRLEEOrMHB-5Tx-5GxRZB5WSbi68NtIvvGovxOAfSxNhv-gFulnJX9AvMrHDacpPNvnpUOrY", "AVyrz3xlA7YsPL9yRG6WTJTJ9JA36ulnYq0A-W2a7-FQHagTd-h2XEnslSKWN9GQH__VVTjcGZWlltGq", "AYrt1t_Rn_Ce-988DREp5bsPwGCoCdILPsOEb0Jap_LBWdc-E6j0AJ4jR26o-Bhu6HB9rhw_XdO4S_Kc", "Abp1F3rN8bSojLO9dhYwEaPStHml-OckvsXx7D_B_gqkbCTGhKoI6UCzN5oVTAwMb8KO1KwWg5GLz4AC", "AXY3oISYFxU1MqS5vG1QvFkMMwym6A-EDTT8DFJIq5ZWlq3OIoP5yX4wNKKmKKZ4yxTHCocYWoPAGNQX", "ARcf0pSIWH4zw6SnO-MYJCEyU9HexIQ9sYrzUE6bRsQJrP-95zmlGyhWjp2s0ZHLoG4nF2uyQPzvVcfD", "AYiXLQVgLszolhHbiYAm2HZERgDF5BOPXG7i4m9BNsTTSdmWhVu2Np4_GqDJLrl5VA50VDAlMMpCMArb", "Ac8X-wQoJRqcR7hjhnPl_0EAoxHuj7pWE8PFtBU2xsvcL94bxepJUNj0awMrs-o0uMeH1pqxZvhOwr7Z", "AQemBOgcqnwET6EUgdQZHNXRgNZ9pPFJalKsEKDL_YlfpGEUyhLBj7BRw7xWSB3iq8Q6gIxo74OSx32k", "AerUB-6mTARcvaeXjg0i99oWQxLi7WrHzFo6vAGYwEahSQ3cOOxA6iXfvxfBsEOmsfo1tfaK6pKnl4Kw", "AUiUO36J52hSCkhaMPLWedP4yIc8AzYxQf9IWwI2zxv_mEFOr4S6v8JwAmKTPztnRqzLneQ5g6D3OZDf", "AZqMhoiURMT7qtC-gKxZorl3AjLOxAqz04Y03kRFzSBnrWL5W5FEucdVk0EHc6XSZ1DD3lV1O6Ei4T7Q", "AYA1kbHZEGfgO0GQZ2AmRZc4Pt0xA_bjH_04oqwnN_eHjiaoLSR1SQ9agvNDB8og4LZEHHVK6m-r3XxT", "Adm59IrYvPigXwV8lVehwwoToY62oxUEWZue81iqw7fx2ogOvrqbCv2yKAVQaMgt-YQjfpM5mavPDWRl", "ASHRFCrZatJJD779KhJh4vReZxHyjkEjJqOcH51HiBdN0VCGPzGsY5qcsyKOanBuLdRcq6DGIxMkIzdE", "AUC9st_MCkpnFj5grSnlCNOh1ujx2NsAjMyctoMVNZy7P5p4X2suh-XKAdfP_G8G_ttwARjVP2qVh5_U", "AWD-BLYAm7ZItS5rqG2NwudODLJwEjzGPZ7mmeJMnOxYdXVrZj_JhUpgrnPoGPS5DdDS4Wc1-KjIEnkC", "AZ81OGWmwmMz4z1H8LJlowtkiZMpLGDSe5L8Mkg4vjlOX8QwhzMB_H83KpHNPOLSvCJ4W_zlhDQ8JXWX", "AbTZGAAj-YmmToFZbGY6oerdrhM2VHZAHhSj9ou2WRxX6deDa-kksuEJorQWte6VMT41vx-cORSYZLpU", "Ad4njTiG2f0fgrygZXIGwnCB3p6BflSSVDQROEQgofSJZvAgrYFQtXejNTiRYan1AWwRH1fQF9U1WcLV", "AUFWrErwbbFvjbcxeYzqEWMI5G0w_LP0B-2wm6VlyxNhcHyIdlDBMQmKI298W-EIE9Z5dNdP29EzHSY7", "AYMn26-nPadhPzVAH_RPfIXaYMOGtZgPnsSs6p_ieUsM56FipfvZn6f-h-tqe1ZsIejirYnooAYnPrpz", "Aa3vEKJmA0ZOgxcPLPvVLrdcIjNqOUXyvcJxJdE_UvJB22YJepjDX-uJmaP3i7jLiePb08pTMuSFU5by", "AezgqjuewrZjjN-whkJhUTFLg_wP-hPWJdwa0yPh_rnsJtcAwltilMGjQEJAa5lGmFKwgMEqzHmU-i0e", "AUPjnwsAZyNIPBNY1lRy_zDafMe14VrpcfeIp7zznNmd9zBPurPIP32TKV-dL1xg-dy42eZJdlk_0gDJ", "AYmOiHBgeNwOszgNnOKM1p08gdtx3K7Rkq0Iyf3oqz7inUaZZJYsXzueM_ET09hdjvkfChbbMwT9n4Z8", "AV16buDgQ4t1rLTlRLALiK4l2V-bBXbuexvxGnk3t_Tu2GUYG7tCB-tTPG5eD9Lz2juWTwUT_i7Cf4jz", "AXRILPvYUu4SLa6wG1z4n_1DsC3_sA7_asy0HYm1rCXXnRw1v9Sbe9NsGDLNjrE_8GL-eVw_YDjlTCrA", "AfKrgEQQWsMUR9wtvQmB31X0T37HEZ3g-uQmdMPt2B_cphEkyID4sYZnDGLrFe8cP6Yx-WSTqnDZ5Wgw", "ATJBc7APFn7FuVkOvl2xI4b8NfggI6Us5KrHlc7It3e6AOUSqGalL1R8LNQBoxtFzppb10lPKwAbuBUd", "AUUoVCSxi2WznYhlTPy6x7oxCOeuDZBFy0iCSrgHg8mj1JBDY3_dTkS7rhFQnaPRh7EG929pfUS7hjmD", "AXircH2zJ2lUmvEMsZw5HWbxPEYF37ZcRAgOfkjf_wVXPJCVecRES3_gEEi8uJMnw4E53Ho2gVTb41LZ", "AbOUyivVwdLJoOfhVYz9Qw0YL-rz89edlPM3S_vK041Rnz2t8hxtvmFnhIwv7CGa-mHoIl2354UvFH7g", "AcsCdakTXBXS_Y6WfsGrjw4kBjzcKsyNBdA26LiwCCo-23guumU93tkTCxg9Q6XadSuCkfbn3LURD9hf", "ARyG-7O26qHxhBX6Gv2-HzXu-F27Tu9KQAP8jJicb7Gpik5x-I4CmU486piV3iQ5Gu4qkYOWUbvBaUF7", "AbFEddN5fdmNJA2-pqMsI_ITOs_Pcl43tzzjsru0ENbtmlW1C2bLpk0oThT1qNL8tgmPHvc4es6j_B9B", "AcACdB2RGxb-23peUt2ovwfDUXBYSGbBlv2iEsMOV94YHcKqj4ATAGnWYsbddFAGWR1HtkbGo5ASw5ao", "AR_TEvkkg8-EPqsZr1iMYADrr35BE-JDN5Puwugm3NF98k8tZRQW_UiFa4u7HolQHThYxd1n05Wtxs9D", "ATvwK90V7SFihAVdjTQlIGsil9oQ1uSHT8h7GRM-ZOowkAQi9DCg6JAwFBpt6azdFFiriWT42jcvIjVe", "ASFwlXgoOm_Rpsu5f3Nj74nTgbIT_eD27oY7vLsEZ2ICOUOtBvPBYHMZnxhEKRNKmM0tCqf0-AxWUVH3", "Acn-VnbkQeJlIfc-pBgbQmyginPTAILbLKiMFrOH-LBEa62Yyc_LdEtpkd3iKtJVgtkJL59MERCBSHas", "AfySg1lo0aeg43kcf25LLQhxEbSJGU3fmgldk8sVu14EERcjca4dpHy0c9PwTo-oI-y0gUK__E20ustG", "ARp4zaq3RYAZaNLBnOE3xfpZWzDAO_oWczsJ7xcpxohLyAYz02hndRARptVRJIUc_lp7TwHvrl92U87J", "AVZDQ7ynJEI9MCy7bZeDPGMSC6xCYUBNU4QGi2lWcH01RqoIqJIL1wE8IdKRBaMC7G3aAJXDbSKuM_PT", "AWhQQuykpN_nyVKTgHZeviUEtQ6f1O9zu1Ygf_OSsyJzr1vmNxU1ouYkgMxlRHEUQKEnGJ-p6EyabmQD", "AX7oINKfpN4DK0n54Qa7cg1ba3mRas8C1e49Gq6Q1WXdenjGlJ4ym1cswCLbRFz84c8ORgxFfMBeXSPB", "AYrM6JV9iA-xCCU1xCMvA1DePbwK1L0Z35aaOK-li0DpX-5qhZmO-0cHx1UdrDYTThGsUZ6858QodAfD", "AdybeG3hNG3xDrQ0QNDw9Rbjf2KMxqoNn5vbNYhgQowqMIlsvvz1X3jOsaTWu-1TM0NnvcSsLm1bkNXA", "AWJoAvDUxeoxjN47oBS1KQCHP_lGDA2pqLXBahns6PMmMDBgHYoYmF5zZoMiOX0m_60MAux6DuqhbuhI", "AR3dGJe8zToNs2fp2XT2NTQ9NVGuGeNzzMO8Z-uuncYM-wHJ0QTclojSh_dwl42G_hRm0_S3zKMgqC9E", "AVJPoSO7nQcOwfC8mjDFlYZd0hB6uRPXn9bMaXC81YYV-g-MXziOdXFmk_nnfSrOGcqxh9mN75bVV2Ak", "AZdKwrTwEzQ8XxeoW3-dVZwvoXEb8LJVqCoM-9fjEKMa7rO93dREWhDHFx6xWu59fsDpxXidHxFpv2s6", "AfUHjf07HcSdnyIVrjKMGKrtwNcNTDi-3QEAJtkJFi-l8vWi9XbjrUbM6Hr4PbOo5leBKl2bL53dHLZi", "ARPe6sWG22KZp0YKSbebgdaDblz7a7wyex_OV7_4zSY5eOdLAtz0okSKznOwkoX0mvA6W-zPPJppY96_", "AXwCJppbQ9ykBy4P4NWNN22x8KsyKlfHdtMJCLeN0_IxS3YJGzMCTOjfmTimrQJ-i1bqkFUJcTP1eww7", "AQL96QrjY7kmWnxRgYQtKgpnyBbd5MGyF2XinDu2vhDT4sYS4nnCE5bcoogXK15Q78zHiK7lSK9i8cLY", "AYraDnKk5Rqdlm0ZPF_aYLDWlCAoBBbpROZ7hlwbassgAw3-SXHJObcFTm9Im7GfyT_YI0hgAxkZrCe-", "AcG3yUDIcfKxr_uumVTtvj5bpENO8IT6eI6oKSlgVDkrf9ZshIAh1m9TObJqdOUZz3D1Qi67-dyRWY36", "AQSgGxsMmajM4NvcuZUZ0fUzSHuuv7VPcUhUoDuN1lwT4VEgq89WO01CKxqK3vVjt7_c4h0VLPchKfsw", "AcY3PqxKJN5tvdtds5nGpzLiatwiJznJYJoWpG4scbLnfPyG6eHeDPQ65AmoEbg7ic7JPahPBZRkjSUC", "Ac6ke_AYE0zbyhhPZYMA3oaIDU0RRU4xSySelFvMVoe7aZyUk9KqC51XnTf-gkvXQ1nDBEh9zQQMFzlA", "Aea-KrjL-ubqOR6RcqaHPTFWJ4QcGfsx1t-k3hDL52ZA1GIp0YoSvW_ykkRHMiEaztr2aupN0ev26eyD", "ASZKgb3hE-0wkV9NCG6Z_KL7lTaoA896U21tg_zeVDcJqatd5uXKlzBTQV4t60TYdcObCvoaniK9C-pc", "AcbDULRdfjY7w-DS60g0-mCXwOJQNWotOZes7mlwT2VCsXyAwdvgPnAnphtPwe8kRiol5CkNnrV7ty4h", "AdKY0ce1_Cac5x9xIYMeLRXWQb08bCvEFvaOgd6FKT0EpZwxi4a0QQ9DYB8RcSda_x9hGZNNLxX5ox52", "AdtmjnhumIVf512r9eVKWUSd-FB1m50_qDGaMddykHwE_fCzuDkKl7lsWk7VmDVQT348tjSvK0xWWqxW", "Af4Q8vg0vQGDOS4CZCo3lRGuxa-0uCea8ThUMVbj_AG_va0-pwbERM6DwznoR66uASQJdR1iCqiAOlY-", "AQ30yLnZhcxW1OaYle1tKeiYOBbwusFVu9tKAQo2B2gTZoyM6qIWP1cA9aBOwUv5v7x-Zymm3ScDc62i", "AWFgO9_WbDSGn-3EoliV4Xe5tUOVjlvTxzRD--a6rnDEKWsr1DzaR01XK8DhXCu7BulgWxY-3T46GddB", "AZoLIJ_07qZVfTVNFg6zrb6X1tOgOwz49qXKAdssCOowJ4o3QFwUSOAVZY7WA9t2JO462nSvIxmg8r4c", "AaqFBIll_36pnXqDpUctsxLhL5mGC8J2odsn0pDQIBkidfb4St3J44ENAujonkUJWt8lePJ-7mSBb2gY", "AeTaeY1w5wt3je9FFRRE1t313-vcXeS5hNnoF-uYB6FVD-ChMmhhy3EvCnozTH2TnLXNldFwz16d1b44", "AT3e9Naa87eXT8mQ7OakeQCsih35N8VjJ6sLA0hP9zDcoK3fcqF0HpHa7mbfPEj2zqqJtyd8dRECKXKn", "AT9JbsWaW_r6I-pzOuZ0zs3VD2CG1AyOgDUOBnMXAno9TjPZYOiegXhjMbqUmAef5783n6yRz7nMm8mr", "AU1f7xobnegPXLuqQq2o-_nS331U2pUmWxUuFNlUd5QYLwUuItn9mok1Zh0T57FY9nE8YI47GR9vsZDS", "ASDT55P6Jdw0oYgpftSjw12L2wcl3LKRqiO8hCnx7NLqc0SfWstmVmcoLa22R-1LVKtAcexEBP60HpMd", "AVMDh4hHgdV9v5DSD2GfBRw2LCz3jF8UBDr8qG0z3pGFjWNrBh8RqH1hrzXqQZ3TdyqsPjuGAH2GvzoP", "AaghtEu2Cr3W24akci5JY2StSLCb4IhD5BrCx9K2z242JwKzxnDrsZx-va1mTUu_FIxBTFEmHDZP9MgC", "AaWFb3GC2C5C4Wmky3pQ1LNH_nmE3Vwkj-LpgDFPT-vWBNgg09MOLtWbNN4wu6fjASkk4DGpkcK1bbyG", "Abpk6sczIxGd4uShN1NF18-Uu45acQiqIHtEhblwB7fegLhVlzI5j9qmAl6kxM_vMaIAEfFFON9Go-yJ", "Ac4ulvdzyWGE2CFo5xV3nYhwkd0CrALQleV0oImj91NfzxpRc94iyPHoQzrTUTJ7WcrgSrxjc-MxbAEY", "Advgqk6L03sFnkLl6UXmlkAwozU8X4RmqlisNUrsk0RFqoldvD6W-ZXVdghbzPguZXl0ocnSLn_OwK42", "AfR9rDd35YCFWhtTa0VaTRhzYWN1d6bNd_4EkOFFEHRLDsyzKYFyzCuwX20MgTYejsUje3274eTVRQr8", "AQh2k_kNuGS1cfbJ_PlYg28uPkvk9QHGfX4Pft7xY0c15CRBUYwiir01am3hIXcHLWqG_oS3UYan9Gfh", "AXsdF0L_Fmdcza2k68VrKLskKuocgMSZkfrMwrgSuHvLeUNCPJGnIHEG4hmxbDthJ5SPvaorE2qFe7dQ", "AexgYDRBEwcfrhm1u7-LmGDxEtDZtBKQb_PITb2C6_ZolyS5BaIZgfLHeBiHc_G_vElZUqc3qz3lEsPB", "ARePeTtGtCKd_jt4pH_nQrjW56VjnNhfgJEYosgwtxafxaEJUjabpnd-Xxls40tcMp88eq31KBz5DWrA", "AUaH1R1TbCLQM8Qi1V6pCIpkQxyFHKQMoNAE_-Blr1Vhlssr-But0VSrlwk_1d5E174GmBjB0-Ulqylj", "AX_wkrO1bztO3Zk5o7xpTxd2VaQLZfCOllBu5dnWLI8IJsib7LcVV0dK9nf6byYsY5PrYlSCupx6d0uW", "AYNuKyjrY4_ptFwMXpQhowCR9V6ns35FC0cElYYZwjshMkQ3wc0iQJQciXkr2KsBJiOi3SO1nBHHu8Xa", "AaaXw7i_cFPcN1LHYIPDFjsn4qN2--nQgL413zW5s--ZMK5zXvtlGIvscQjT24axqeTasFjB7qXXcBI5", "AaErQSStIgrMS1Wt6vyVh1dI9S38ueIYroiEEfQIG6bAaLn1YSKytF7Th4utpxo9tipKSStXUlobuB5N", "AbPSFDwkxJ_Pxau-Ek8nKIMWIanP8jhAdSXX5MbFoCq_VkpAHX7DZEbfTARicVRWOVUgeUt44lu7oHF-", "AbXt5XyCzxxMhuZvBVENK_djVGwGcWsDPZHOpem3s8YFDN80wCl-6kq-vf-bt9-k0FLiJIOksYceQpFZ", "AcIpUPU8c1i0sDZ-FMYIsJuOEpeP2BTL-hmwcbcYijfZW9_esiJoBGeX0lGE8U-A5YbXCpOWuPMkQCDQ", "AeXffmIejvxgasb8c_1t1pxfj8hzaywUILZzr-TPII6nk3KrLkdnqfiQlcNjghmpaHwtBjdRAjcJkGwX", "AUXZ4u8N3OPaxj_b-RwgBRr3Efs5mqeRT1qZXWwCeXjQaQpW9GeJnfPZy6ZfUDZh0u_szXrNDjzSM5-Q", "Abd-37lTccSNiHam_-H_NZtQa0tmsjxztAbnmvy_7R8kjvuVz8QvETPLfYW5Zf0dfvWHIfmaHIALs6Qf", "AfIGckSuPS8-PLFn7rcis59G2tQOaKlqgRuUHPW3_ed_Y6JZdohTjjTpUVfvAxnKC0-zWuOLBWrpMCo2", "ARbpxmp0udlm2zBPu6bqW6PAMV-UfCTktgWFtJ0cy1rKQUUtIRffwg1A-i0wRyFg9BhbfZM3M6ci6czP", "ARGQ1kBYHQGaz6Y9_0twfc0Ityx3TUCMTucXOni6OmABeu8s9yxaCXOJRibWvKRELFp1KyYRpMJRYxzs", "ATHcOc29WISmwi5VvnVKP8LN3LFVaeWIUiX0FfsNgm1u7CIFAxB7FEZv1vJPOBu3UTbvisBO3wWECYAp", "AX5cTDOjB4CuFZeR7gWVEzVeI3cM6_j_5BZ99ZjKOtyH2hQl4Ptkun5gdXa27n5p8E_MSc5VTNcicOY8", "ARbo7WUH4Uas8uz-UpsOpRos4hAt8h-PQXVI9c9MajzrKTyB3sGwY6L8LcRpuEDq9VGAQGRgbbEU9ReS", "AWKM7WCLJ9CfunAKHctvRPmYdhwC9dGyY6EAtkSUGHVV58kxRc9clx3hPf9U0nNkWsFFzRu-Ila5Fr8A", "AX5TZNFfJqB2PmFoEKCYtd6vpDzEkanw-TIh70ZZ-h3bFsyvcjlz3BUafZDA8JsYjidNw_TmlGDMwgL-", "AQWgSfn9emdJnPEBBwwvB6N4F2AoXbDHKq3rwW4-ieEP3TRlWiApzCWpGdyNjymcxlXIAxuf8sScQWMv", "ATrCdcXIyAX6fPCjCD6UBgIJ4sNNm3SNQzJ54cO_X8f-SI9kSAhV_Z999bFb225scgZdB0lmk78-jcwb", "Aa_DG3hUsFI6iMf87VUOyRCWH28pC5ijDrFPYnG_fXUT9NccX5D5qm218rUWcXyTj65vu2FBmYxP3Zam", "Aderc8flr4FvE21kxRJaxvFyURKeUi4znzTj71EbyHNiFDm7uhagNFq3ctfig5ZAcj6vobt7C4y060d7", "AdtXhR3loNJ7B0hpup-jhP5Tt23VwLdtfHDbqW2vcJ6bIwrsvKajuMvTP7a48PFRzNsWJgqL4Ai14vNb", "AeueZ5XoPc4cPG9v2kwlk4dIeK67CE0RyIwTzKSZlYlClcxH9P1xAtpfCpE4UQuVCXxo466IUj8ALNa2", "Afc6ldERu0z1EWXp8MYi4QzHudDEAfMjL9UwCW-DYH1RTA0qSkRJWoMsu3kUp1dR4zeRAVNovSU5Gh8n", "ARjjpGuuTRVYUQ3h73A2Zl6zOglzYtuWCnPC8yZTp51sA1XlKpuj5pOmQeoYkDrPIAQTQTwteJhAaqd9", "ARTz2u_4Z9ZHcbwont1r7U7Y9cXBHMbkhTfOx67ONIMkwqDYr08vv4SIrYP7_wabZuYobR9A1AtS-C0e", "AVhCvBBwz7WcCJNWt4ShmzeXcTs-B-ydD1hdqsV1bbT6P4TvhsFxIHKAE-GO", "AVX7d1JfuB4fLeUhpG6O5JA6i6iB0sQr9IG-SAyvEN5TIo6N9otHSB4X8aaMcLOQL0R7J4XEJBQzQPIj", "AWS6hhBD7yuASYqmEX180QF5ELJGDf9vW4pOwwVg3PxA16entKKfNOxhkMoE", "AZKHl5I5X2-oWg30KETaXhj_5-CtJ2NftUT70No3-FD2MDm76KhanS_XM8OrPEA1JYc2RrhNrDYL5rbL", "AZsPWotgvxGKy-sWOcTE2xtZbHqJ15jyXWHJDVrODGF0j5ufpB-89ILdNDq8cOFA8o3YnFvC_rlUDKOq", "Adk1XwEPQMKOn-b9a0lMZ87uctEXKc7K9ZPHIfm4z8Yr3ZlWYDlAznceFFyzS0RbXfQqONuyFvZa4rto", "Af96d--L5ACQRgWAJ21VbDgbLMEW0m7SnlwtzVziKtwhkeaUVSSex-ivaMqCe5yO5ACRBzOTa57RNFfO", "ARBQw6GmaZaOMNkUUz78FN0hrNHflsmVAbXsSgQoHlOnXEzBjzqMpp4V9HH2LxVXK0t1cUCQtfijdHQ8", "ASdxwSqu8dAfiPTYWGxXF_oB1m2f5-kiEShqzrLSrq1UzI7m718X1Bh7oA6oRRaUgiCIyW8Dcfbxyj-J", "ASuksXjiG9-kzC6UT1_WQFSdcokQjFFivpw7MvzJzPLH_o7dxj5pnlCjs_u3Iu7x4xLgqTM5oJB28I_o", "AYArObyAM4DSnefp0u4QEGEgPOolT0sT5KVtC-kApU4UOhnotD55PPvts7tbdBNVPYHrJ1mDDzgDrfLt", "AZNBW_MBovzo-FQb3NoLC3TqhUOTZgcluCth-oYF4Ur4Hnk16bD0J7o1srJxd8RtRuDI1-Pf8mlAcAOZ", "AQtA-m8ydts6vPKeNcR2V9lbnUk1pBIjDA8F7d7pnnE22OdcoVKS6v2mpuicU9ETnPtD7KSgfClOW2ez", "ARiex1Obbt8VCzA3oiFddD6IM8GW_rSM-7bEQHYMEbm-Z8PKnZhnJiVZ8R2h6QnOOkRhO6qrPkacUB-6", "ARme3lHreiKJ3gYg6HThgcBTRwPTJ8AZEzVORV6N_b92yDHYyf1QNZ1bI7OPdF9Wxnk6iyQ84-5ZVj6b", "ASdzkkc3gZD4p6OQENcdTF4-BYbalbTCRZEuruTd1IcGuu3CjOFEAXX4KRtseAVv2_0VJhkegmfK066l", "ASgUH7GYLmT5OeoCIiZxCLdf_TkJWuN5xm6XyYm4UoKy2PJ9ph2kNS-jJRHEa11UfrsH90mrHCiFYneD", "AUstsy-MMWK_e92mOhtyXamPhDkjragWS2E-1N51CqQEPzLA-TmQW65ROOnE5horq0XmVGAHn3gwC9Px", "AUvtyfR1BKhuGWyI6oKu-KCJ_hr1wkh-BZTWIH8N6b6CqLc09mp1u43ZAB5Gv17wP2d2kecRhWdQMNJt", "AVZhYm14YbV6P_TNkde0MGGSxEtDncv7eL6xfh4NToEXB_vMMBETx6VjDX794rWvGhERKeb1xEXxD0Ze", "AfnCuLnoYiXnUIU-xTedeAUqQ_d_E17FiQVeNxXsDBrgHeUlDO9Di607PQWdRIep2-2wLMNk6w05BS4_", "AfVbaF5KGZuZzvs7b37iTEqatdhRly1S_uqGgAZ9H1rJixIm2Z1CNiMli4I-U5tDvF7wFR0ZGtC0sqJL", "ARnXPP5gAw_eGAXH1GVKM95kLABSvGRyCny-BkHW6UWSlmFnv5zkLskgEjuNwahxA1pBI2RRGCL1U2E7", "ASxq51TP92spfbizUkcxNEl7x84Ct717OJ0xgI3A2O_FeIH1F1jEdTBAKWZq5Ml2G3U0p3g57OQlZJOB", "AZf3sGCx2OIfGAMTGmcHDd0tt-VXYCducWtnkOnlOOUaA9gtWni3RbxZJ9U5LpJ-jsQ5YG3xX5nudMjG", "AddUoLv5JTnaAb5F2sxspDib4pni6Npi2ahl5NB0jXZMTqODYwujzQc4dGwywjbql5XBZN_-vFQNgN3X", "AfMTdM4POMezgiXfKDh3HCjxr5ztnb1N8AC60fHc23GdDCFq6DuIFhgwKG4W2-PsH9Lm3DqcuBGSIO52", "AT9nuYQxHQVOx-HSovm8DAAi3IWig_NlDrHibluNefWCzToCfar4G7DVp79FQLhVqqrdh9Ekk3KDcZoT", "AUzzFVKF6GZQDgNZH8JEUizm9sMhd-57lsAXyU6u4aFuTxU33OiutNq58_s1io0kd7epP5W6ASgcF-nF", "AVAqdF32y5UFhSWdjs7l67vcOuoQNk1KKXL5v49h14CZpW4QN7pJQDQyEXRbUBO4yylXXya9nu1LRn9Q", "AYOzl27R846B-NlpnYdfBveJ78MS5-CqTCS-kS4t2cTUwRUDkb4XsAyTLbwla1FWNdN7815pLLQOl5VJ", "AaLE7VZ5LC8sxudigS7Ekjfezc0MfHyzVW0n3AhZAJdfnim546ZwwY4iqK980R1ghPwh0lPoLyKddhS_", "AdtSQhJ6ffDtKJUwFl_ibaLaZliNOn-7E10cAVWC0MCEE2b9ptVe3bqj_M2hSLA6DTN5hPPqowKEGHxJ", "AQUSF3r4WLcs0AtHj1KxHdEEtJzQ3UdDmQ3MabfGLYcB4Chi8vgXJDL6dhxwQgtslpbgXX2A3RDMHV_z", "ASBI4ZfWKMssNADQJn-i3HMjph-s_sh7TlRQ8QJSz5TuoKhYGQRtsjXAN8bpantK0Eyd8SF7zniRcMPo", "ASIXJkiQIe-qp3P9iuC36a0xdjm57cP6nYnT3fgTxU8zALI2fLW9KwU6ZoP1oE9E7bzmG_dZOEZmEMja", "AVb8SEdeAJbnLi-QmoaBiapiRr7FbrGZksICDQgrDtCdQfSvXtmuFH0VqlzdS4sRj6R2qmNhrjJj7IzA", "AXvrPG7sDG6Zvt2o3ZnaXRK4m6Nie-KPDrChxf2_a30zFFs6eJwQ-BJgFrATt-IE9kvR5jjj757NgKSC", "AafaqFH6ta0PFlvqt02vd08h_gApCvhSt07by8A1rBga83TyFty8iVRVv-BiOEWO-8AtwyOQaNBiLMES", "AaqFeKtndmKfGYPQxXkV1ZErQylYG0OJ3MapCrQBfBojhG9heTdKKXXLMoMj7SW3ImZhNWVQ82zp2QCF", "AcecQRTPYDrLRKbub07lSrii9oCxy_gRf4AN3DBYP1qXkT7vNq_ljT_tw2FQDTtcIfOc85h4wKtfwOzn", "AcqlbM3LatHfLUfAqshlfyg33bmVs76nZl8cMQBbstVqyF2fDaiEz7qhcFZSMhA3pepiZpIiYXjW0d_F", "AcvRLo7nXCDN0fkkFDP0iocM2bSQ2ZALUxfUllf-fG55OeQjgOjkDnmjunrwZiiOsfzbSNlRQnqC8VK0", "Af5KN34nRKGpeuf-NXHG-VApLYlIxYO8Oaiid4CZVv6LIu7n4u-SWt04ChxQNn6jDZNH76kNRLXspEwS", "AQTB_zZaQzo1yd1NYCgFFox9wV7_V_BNfW2gDhcvRWpEMypkh5RCDU8z82wwkgni0d09XYJPIO6BM_GQ", "ARbuhqx-MQmTt3P2BBa3CEPakK2GupfPZuqAahytrA20seYZqlQ_bM4QHssuXkWkH0xCt0grj4QmJ6zC", "ATKIVzgAqAehDQPdPR1DAQsj-_PldhwMrxXCJCicmvthg2f4lm0df0nALpg4dEZT57QO21fLmfpln0Wj", "AVnVnDe3ACy2bgUFhKHBPbp_-fQwoe5qrgfcURR-UI3iOshoaGvNwUqxkx4SU6QR6eUt8fRCxR0U2ylp", "AVwOriXt7qS3KYOGRhP3JAOLbSM43pfk61ZVORvZTyhmQ-mvRW-zXWMS2AWUokQ14s1UQ29jpfiIumJU", "AX09zAGVFtWwrm5_JZUFfh_VKOcx953llczSMPGYsPFbFzk1QoCgeRHVnwXhR0AN718VDiJJnos2-dKm", "AXadcB5XetUTL34QyQlIiRK_UtDm4cn9_ShNmMw8FhBIh6rZQxtiQ9K8oqHsk9PQXkLQtaOzgkahWRi4", "AYRs82wfBGrz_kctFWYHBCnZd4Eof_ZLNzAeb-m7M0s4OHaD-go6vm7rpmH_hLOdMYc3DiJ80v5TPSgJ", "AacYo2k113JWY4e066cKchwdJLmyIcnYyowIloKB6o7DHdldIhH6N-pqDr7EMshGQyHrulbVbmAYmgJc", "AbJfQBbMXrRGZZSGyEqvHdRxtpr5bc5GHojFP2WWcObXlYU5zQunRwQUJ63PFMfXIv7stZDQFH1-yfJp", "AcCj4SalkPbqb47qQc5yJ1weNTvmbiea0lzR-3EDvXDZIyMsHcIpdB5BElpyrf_lAqDKOQSynZradhxY", "Ae6Vx3mw2UPZEf7QczT7tg0uUxLauuKtka_myxmlu6ShkZrdj4NBGHAvDYdaMYPXLnSxzfXmaeGkVN54", "AQPe41YXAOtjyC5dSdPbIt0gxNU8ptIDxJyb09A1BDIEeVovW_rZs-m2TehzWYAlnv_kmWgTn5VBslpL", "ASOCm7KsBwt5LUae_eeq6k1lv-ac0rcrSh3Gwk0dfEZ0_Sha3FdEDFXq0zAjXVLVBGUJGAS4KJIba165", "ASVO3qMzYivRm-QVp0B4jkB4DiiFp7kAG7s8FFYrp4KS3NNl1WQlezd_XsEE_4dXaftMYdF4KMdvh7WT", "ATCn6Ird1RIzRDVOLbUmGI5AUavRrK0XnnOmYhdghgFdhKMkZ6Zvr4C73_UH5xp5F1jCcBX9a4fiHbDf", "ATSJJDJxr9LpuVNkxYbXGvteFXCDD1tmPMDfKJ5sefBSIguK4c6dn4WfK6oCYnvbj1sVQNtuXVDaWDi9", "AUrnJiuXzmouRq2NZCcXZoDQYpP-gO4HwNiwgu7QCmlmWgx3bAY1qEI8ou343m943Ylbfmwn_5Ttye4D", "AUwcswMqaswx06CvK70TO4WUtE2Ar4DRXm-_WypzdIlVNUXotXB5fhQtlc-MftdF0GOwkDCbDHQsWl9D", "AXDJmCbAxM8PXTV5EFph8mlO6TzPnbcmQ5gNeWvCL6gbaX2qKKmXqfDC6EEppPSHq7wDSip6UvbT9eZA", "AXGOUolOr-cZ-NRP1lo5q9oolK2j4JBSAQeqYCvnuRPN-LKHIUemaEGtyXWbrMsSt6Ur-ixbO6oRZN3C", "AYD7u5dAmXH8EcBmhuWEs15anelQVxDZNhjYT2WnaZWksgB8vsnbCSmMVnyYo06IUUD9xF6LKJriPew7", "Aa5GsKmJC0UkW4un8T_6lvdXsb1fUgkfVi84AesLRWAmO_3MA7503teyZ_Uzf6xUixuyUuTkpfS5LftD", "AciW0Q7w0Ok2Ri_dvGTwJKsRcb5dAOHFJZfHf_kMC_PnP_7KnLj-OdwRPLxD7M25CRvXgp5nNJA3C2jH", "AcjM7hAZjUAqIgU0Lvzneb9-_rWs7qAEl6PoPVHtQV5PNmWBihQWsu_SglKO", "ART7rYn1IyUVDyGzxwiQSruiFD5OvkD6lkfpv3aX8UdMdmtVQWIUfkiAe_wwRepxtpJzWebA1dQYQpxE", "AS-9YzIwIgM7pFVJwG83_0cmtz-p6ErqV0diV8BDctjfX4mj-UUVi8hRwfb5pTuRi7GobwyUExMP5IYt", "AS3XJS9qJqzSoJ80MhsYv0FYMI-Tt2HtAJawgorL9yKBpjeRMaao5YtctUMlTH2i9pZ3x0gJbP9ybBEy", "ASG2hdCw4rCGvBmIjUIrZpBkDuBnuiaEryLrd8KBROyg-7FGdgcFeQ4eOVRxwIJCDZT-h2v8oqAeStxV", "AU8l__XI_fM9mqndO3EV43pfH2NvPawYNdotjsAqksFa2EnXfn3Q3ngwAIi5-Dx03TKAyliifkTfKYTU", "AUe6fpHCdjTKK_sxP7apE-6Qot1BV6xnDGg2iPQXJzMpbrQzbWebryYPkF5eBRxUYWRGwaEc3q3GpLbS", "AWCNxJ1zPs-NqO0AS6tBiGbIbHfy12-uVfhmtibM51Jv2qXJx08RqfBfWQ9oJkUaXON16zXFUfpXEgFz", "AWTCyz8bsjCppOZ4znVuzCXiq0pvGZeNWhlL-izK02ArHOlBoLVq97AtNDLhA3jQWcpuNRcab7dEB7lo", "AXZQrZVm8c3MGvovD4cNKiwBjIMMKAlhbP-wWcj67N39xDe-2ZdEdAPO7nV1bAcLM4v8iNUp0N_Mcphk", "AYmAf1wW0BWJMwUM_3lygY2_9wJeNok7DcguZ5VQZSWrk2DdnyMqBKKH_sh8T_DYJ10Jv1FTIzcBoRmV", "AZ10uBSCpZr5Stazc2Qp4kamQ7e5j1uvYugUfyqjn3_E0mPiQn7IZbfJ_5PHVQoNRwokZMCSSxEVk5gv", "AZbL__Y_-mRd5WEZYRHkxpw4PDaVGapobKAwboA1syWwSr9VdPTHos6FEWaGJvajHiJG72ZyVzNeslIO", "Aajr1vTTrL58YvDThPIsdrNP4jl_d2KahfheyZFUb6bs8Kbx3WoZCn0b5u_TnLHcOiymePb7OcYbIRvn", "Ab3Kury5vH4Nd2yDJ44vRvmuJhrCSj00bXcZ1L2MVrJ1XMjhQFDIgSFADUdytto901kBDIB_q-9kICcA", "AbB_czT7AhCglLGQDWtB6BNcW2IIhmhHaHGH89qJWNNjJHzYxIk6z5cQN3Os8nknVBXw2bdNB_m6wSxs", "AeJImnS4UyTQcDktg0Nr5RDUHEj5paDkjR35_FpWY2BANcQWwcUDTMTdcHz_6MCETc5EqLHSglfTrXha", "Af-FvbZhoCMcq70C9YwduBsM2FkmNlLnwIz4O9o_4NhQdxYwlKiRa4kUgXBJafXUdfija4n-wmmISFkW", "AfMBvZqDv9OoaMe8pn35-xOwufIhaHRkr-FgC64gh_ZanWKd3z3t__siBDz94SYWVAXfh1x5Nv03AfzZ", "AQXnKIXPG9SXvMmfD9G7yFtN3dCJjSKE8BfKaafZlzgPxGYkpb0yZhxvUbh5EYk86C7KXxPURskN12OL", "ARMyhNwHKlGvZneOKlDPtzTtMKg785buN1F8ABciuHl7HfSFYxz75e4bHhjQBzZgG7_5vjzNEGl6zMG5", "ASZNICUjJUEjOf5gXhSp9d99nd8OWF1qabSswy0xD9vOTUxeqtfdlDK102NWoG3OfgZE7DAQt97q2OKN", "AT-6KyRrMjWr8Ffr8yR10WOCVVxiMpM8Z2KL2J1YGkCKHdDCFu7c7dVtsajXH_hEu1gd0Qb_am8-crjF", "ATZjgdCbWKKq4wIsbgt_KUuWcBzRNTuoTz_JVKiXFNVkxBCNC-CYqvH4aNr7D-7uubhUtqiVsA_Etz0X", "AW3Xj48NN_K6zsH8JpAnNXlora23DOI1DhWiLFTWI3tVH6BN0PZD298BW2aizd-Z3CLISV53NynfoWkJ", "AWeM9QIuoOntrqxWoZuJHErA4790NA3MpoG5MxSFvsM9U-fVys3H_KzwLnJfL7P5jkdrVThaudOylTaU", "AWVZGksyYh40TiLsK3w_ertVJEbOJOdpyfjProgzy9-lbdtXQyHCh_G8-9iKG2DfHobdEtBPZKagnISS", "AXpt3KjQyq_WAuuHhBOJNbgz1-hJ6ViIWsujd0uQ-50tYJDB2YkcCDOP8AzsdfPZOLWWBV67TR-ZD9wO", "AYFD2Z4N3HgIqrNq78qpZRqL7JLBqaxCYQYoPqEiQC74gKn8KKFnYZ9fdzwLSC7oIGoGfVa-0KGiKKpp", "AZGnlh3ha2__TizDxGMvhmxqxXAsft0QoIFjU54D_pHJyABwEF3PR69Ol2hlGQwDZZTb9TdZ33FXi9kb", "AZy8eT5YydIKi92O9Y5V0RPuNM_uBIdAq_Keg_rIO7vlsNF9twjOqv2sQVoUnpiJ6qyb10l6SSeNoL1z", "AaoAGjTmC0H9GdbzY_qY7-LHEpXMNeO4m4gaxnGBd_2MnRCmH7u9PwYNrvUc_MPkng9MnZjoeRfuGPhe", "Aat6dgzz-AhMNM-t6f9ZLMr57DgxiehUDOsBWetFn6oSESrYdd72Q2b-SKzea3x4aHwEnbB6IpNmvhXb", "Aaz-u5JdoYyYd2scU6ITuhwKJXfBDcyAS5TWhmC5Pbs0kmvef07CfLC-arEIYXLivOI2G4zexNkz2fEc", "AbIdboZdEpyrKU4XclA-dkyGt0PlgaS1-Ffvr3xXvHbYSsYL1sGtus2vv_IYEIKfB5VeFW7s5TccmCqX", "AbN-0XBdWV1G0FEnQqVyXUklEHjiMDUIYkyk6FLO6csgUjXHtP9neRBnFaPTYM19NiTkxZxzOa-lwqYS", "AciGZEIKay92OieK_taeAIxk4gmkvZYD4V-5V_inGr5N8o4nsissrMfNKp5KF3BOWDDXE6uNmlm8poNM", "AdJvUhBNhkJ6wulv88yXQrzbU4ZiMocyZbTsv-9HW0ZDNIZc9YXP-IwNvl7_", "AdSP52hoO2-Uq_mBCuOBGgzOzerKx_NBWqcay8Iye3F7DZqSo2xTMsS_hc-sBxBq9ZeZnDJqEtAqU6Mo", "AeibaoRpUM9JPbRGAuyNa04EZWfVHI-0EuLLNMJfpU4oA8GduQ8y20G_B1LEI_6IvASe3sCqJGxEY6Jd", "AekF1vsyH-KcE0Dit28DhGv6o9KYpcTpGUrC1xmHuUG7x_HimZMMTpH3Hkiam0OXMznjo28JwwBvc2bv", "AeWuuHIpOmF5j55eDYdCoW9-rOgh9qGvlcy0aQpxXq27n3a55TL0j2XnWVDCquBjr14x4Fioqp4se4Pc", "Af7UiccMdL4x5RZZ0jGTYcaUnsgJS2ghv-iUYbUlXIn0Rxi1Hom2F-Clelfj9yoGczFxUoWcjX81vZew", "AfCxhs8W3WGn7Rv0S92CVPHXi7TWSCnRZ1U__AQhOHuw52NjJYFSGTodM5JFjZnVo01eJj8WuDAmM-qC", "AQozhXI5S4IvGDPmDJrJKcZi4c8gNDw7Gtn_cdXn78ejc4luxXJ0zCwEjWbjRuY62nfKWhc87LukhvAv", "ARbZ7RQg4eBkkdQZBwVIKQxFVCuIeOrv0sRZbMKRxNZVkx_sMbklmaAAbBnwWJy9LQs5xbgh7YfAsH18", "ARq9LAELs6Rd9zwF_cp6hoBHrxMA8OsBwvBYCsdifrZq-LU9P9VwPpUby7yqZIgfsrWHoJhWIuK9IPFp", "ASqTSIOiYASN3KYHsxmk6uO4O_cmAjk-Shl-Wx1ixHAFGjrDnv6_P_eMCshr9LdwNL5g95ly1cHqVy4z", "ASwoeikdyflPIKFAC3U34ewfFVRE5-_p6qc1TTQG9g_sHNs3RP5Sq3pE_e7V2p0VTi-nJQuIA5ApP1XH", "AUA_R6qBmczCAhGF-AGP0WbqxunumqEc6FZ8eaD1fbt2jjVmZaiu2QNeKEyC6uXx_PnbXaCOGyMocjuI", "AazPaZlGBPP6zyXwC7NgdRNNrfEgD0fNxGpohhfADfPDqHxDjRuO1vwqjEE4aKJrPJ9DaKkfuCD15IWE", "AQyNR1vnQtxPvo1wU7wS9OXY7svT_5KlFcgqkBgmEjPgy3vaZBjgReQCV0RD3n4iBh613SJeUqEC37XO", "AWum_K9KRwhlt4CGpNTHt5J-jhq4gXQdJ8jAdB3DdhsCc8SlKabUbl26C4UHsg--vKrMiCOxBb4ZixuF", "AYLmn4GCg4s8ZKrrU_5fzzwz72vDDJby44c9KbE9QYx1l4zrnFTncWPDx2AGsS65Bqo29D8rCdSBNqt9", "AROO3lVGvW116zkoEZ6KRQMg7iAhZ5ZeQ0jyxIYSJHHKflx04MCOdt-wPgJqRONhfHazb3cPYv244uf8", "ASncnAA2XqvFN3lpms6oapYFg_dh2cne5MzD5VCk3R_aL9zQIGdi6Nkjzfc0CDZy8q1BeqOWBqnaNFsA", "AQedjY9kGMi1lhC2AEl8qbYn_rTY9iS1Z99ijIH-T3RIBzkHcJ1_OEwFJkRjL1j-K3Yt9ezPuEvyjIBK", "AZZBF8oL40dzcyCcLIEi50pULlY_GyAc3nr6o5Qq87ImOU1-ZC1IoYqaJeWNT-kTt99KgtZrUFK9u-Bs", "AcRXfjC-a3HDICh_w7Yo9NEbLHW-TZThdotn2ztNlPSVUwh1rF_z6NS_iUOO1Ffl1cs56Lez9iAzzLuz", "AWlXddGW6zfufuNdkdEX2evRGOPItXHhGJleiDgJh7u2PjAFu9Ykv1mzdSB1emAdcfBf2WySEgamKr5q", "AWVPY_vj2qsiDlkk8xUifR1AGWmWPa-Kff7sc4PSNeZzSfoZqeF44xX7AyqpK9MXXNhHglzwX3okwJeD", "AXYNQHZFo1_JJkOeYsh7k3ii3OcIVDyreTAuJ7ZS0-2b5p_XWqHJ4KVGygYyn1_DGDKB0TQxnisrzAWv", "AYlEZzFdz7zw245KfQKnjjoaKlIIkmdOD8Xi7PRIx-oDcK5DKrWu4ex5zhNTioYVCAwgy5E5UZ8KWRKg", "AY2y4DTvaD_eftECds3SuKHQG8CJfmmP9zl7BrblUCl7h1svpwFBASQBNNQwDb-7EYW0QT1hFZFQUBIl", "ATJHnb_Iny4VkMc5ybUoeDS7x2CIMnFQYFTtOHfslNzYtdRJCGGrZTVM-mNdG97GU78F_UmpsKzCCIgU", "AeVgr6n0UlS9_b4u45Nlkd2mpKc6VUe9wjw2oKRrsXzIXZJ4K1q1CUaXvrTgcB5j0jb-E3fEwDD6DOEd", "AaVd3541KiAbjObfq8486KohVuhP6y_ZJWc0zY1ysMoOSeIx3OF5amcgw-BvxcMD0TNyayCQ9Agri_f_", "AUB2EIv-ZUzTepk_K4_yf6EnL3b8vX1LG1a4DaSZANNFiQ8QqPUIKej8_thsKURH8G8nbwrsrJB13bgz", "AUO4pKr0n9zirKGKfTQlOgQ8EfIDOjT24AUmKK1lGwaruTPyv3F4FbIBwzt3jqm7_m19fnu6AB5d5PNz", "AcgZye2RdQr5aPKy83TuiedDJEYoUxQuEA8ot8ELuhJ9ya0U5GSXRsqw0zqrAgPbfSi3MWvaZMdm4mG2", "AU1AoXXAQ_pZhAhZPKMBgbqIalttfnvDhGieEucHsAYfFePjb_Gq-g4pOW9YtUBxJuEBkt4IlW098XCe", "AYWZhcjTcWKK63g5TQ5dGdV2VhnBSQ4a1ZctLLpHPGW8NVI6FEOGIlprUkW7RwJ3ZSft2Yfjuv0e_GG-", "Adc6rmNeqiVf9o6lwUPHLhYwUgApqWgIcQOmiSLAKXU9lRCVs-iMgs4MOdkbvn_pRaBtOqlBG_v6nu7C", "AShG7lb-2gG6EHCP3LMZxo96dGYW23_Vu1KPeK3lWG01QcjZUarqJPbM3d7LqjFJiRMcFKNXD9gubJYC", "AV32VxQG3VgFK4XBV2fszwTZ1SI1GR3056xWzvXNuNf_unHdT1lIwtXp4x-0-nKngOKLhk8K5odXZRh7", "AZ_5b9jS3YKFPSeZ6J6YSavRS_WXD6ENRDfX_JGIL4qExwKkN45xBmLLy28tNQsQ0HkNkVKbGPqh_gGI", "AR0xZKtsgHB6nA3THJuR-ONFov1r9Hpi8mUCYYHg8YoIcd5TDQfHtbKPv-7xlMVTRmvAW2R5oZ4HPzLe", "AXyN1SOeUydASWS3ad68oxw4mAozfK6cGi1X7Wp2alKKZ3ycBKxt8lndwnATvAtAN5w-_HPm4ij39G6I", "AdUZm6mA2lFH0Zeca_2JqIUk0qyAuaFr-D1n8OjN8dD9aXsEaGAF7Sw8rF--Td32LdoLXEsdvnIFbBfz", "AccIQkAq3PaYhno7Lb7EfDChSPYVwRVSLjdG5xPGa7ryKBFVpImRM8_jc9_kGdC4PkgtlHFv6l_ET4aB", "AUP00nLYtQvAPZUR69WsZ0mZCbiy9VYXY_kT_E5ntJRulDMEFvdlc4O7NQjk05iAcwrxx5rMfRhjMo8I", "AV7dY22NFKx7_DTYq9M7cxp6NTy48StOdiwdZ3zuSN-gYxx8cobEcEMeHvoM6eYcRLFQ21t5R3bYvhZj", "AUKvgsLekmtbfmbTZadqyWaGa8DWOvMsiDaURUW02BxlXzHIBTBzxiUsLqEaHCrCdNJTB0wYV1zeU_7f", "Ae78ZfS3n0VwwsRs72OKgr5ftSyDzt1nDuNZOVkH5S_5kFWX_dEos-JxEPCtksCcF7hTESFIOl2aqFcT", "AZ0VQKlQnhFkU9Jbd96BIMPmyI_cvrRaPkWOuMoRW7UPvczAsnG-9S_mlPh4DWAZz4kd8OLbVa4w96Rs", "AVuI4Yp-EWv6x9winEG-YiVcqzwbJvmArOBXXhzAQkCGP9TgMar3ubQdRmsJxREwmSFbLlzgR-Nj0CAW", "AVprADxNJhFQNlRSRMfFt2jbD3tErjYUa7oe0gHfy6hoCREK_1pYEkp0_zwNwSmFMDLKATKdCOBn_Wfv", "AasxOtHMRE4YYG9yuhj-b7AXliaTL0RX8A8Gxby5PKwqQarRhRWbh-52Me5-q02Y_i8_u5Chr2-FeLZL", "Ae5TI7LcDvUcz2kn__X38Xzsxbxhm1vZxeyDVMxxEq4g6WlAs7WojPbvEfkKA0xMn98tumiSLvVKLDBs", "AQKieExqN7l0BH2tRVHqwKqmO1OMheTGbSOFa88DntLF1X1gSBulgivXX3EtrgMta4EDSOSaefHF9XeU", "AczvgJdJSXtSxPO58fyvUXsQcLdfIGerTZJ7llbZksgOb3z160wVtPoGoJlwjGDx1x4a42JMqe0C3Mdq" ];
        var SANDBOX_ORDER_VALIDATION_WHITELIST = [ "AcFUr3vhIePYLOXXuZzdvFL5th99W0Uygya9lqfjN3XCx-W2dGlr6A9mqiIZAHAMng1g0_haL2LitLAl", "ASmWKJfGIEy4BmvwWA3PpAX-uOdz0EYCQ89Y-oLww8LgaqqHtXEcB4dfxr88kmcp3no-efNznSFDcVjg", "AY-UBQDZ53U9-lrZ-7RGWIn-CLhVJEaZI9HsWcqqApUx_CET1nlkkNow0HpLb-y0kTUuyIA3uwbME6Dd" ];
        function logger_getLogger() {
            return inlineMemoize(logger_getLogger, (function() {
                return Logger({
                    url: "/xoplatform/logger/api/logger"
                });
            }));
        }
        function unresolvedPromise() {
            return new promise_ZalgoPromise(src_util_noop);
        }
        function promiseNoop() {
            return promise_ZalgoPromise.resolve();
        }
        function loadScript(url) {
            return new promise_ZalgoPromise((function(resolve, reject) {
                var container = document.body || document.head;
                if (!container) return reject(new Error("Can not find container for script: " + url));
                var script = document.createElement("script");
                script.setAttribute("src", url);
                script.addEventListener("load", (function() {
                    return resolve(script);
                }));
                script.addEventListener("error", (function(err) {
                    return reject(err);
                }));
                container.appendChild(script);
            }));
        }
        function isEmailAddress(str) {
            return Boolean(str.match(/^.+@.+\..+$/));
        }
        function getNonce() {
            var nonce = "";
            document.body && (nonce = document.body.getAttribute("data-nonce") || "");
            return nonce;
        }
        function callRestAPI(_ref) {
            var _extends2;
            var accessToken = _ref.accessToken, method = _ref.method, url = _ref.url, data = _ref.data, headers = _ref.headers;
            if (!accessToken) throw new Error("No access token passed to " + url);
            var requestHeaders = _extends(((_extends2 = {}).authorization = "Bearer " + accessToken, 
            _extends2["content-type"] = "application/json", _extends2), headers);
            return request({
                method: method,
                url: url,
                headers: requestHeaders,
                json: data
            }).then((function(_ref2) {
                var status = _ref2.status, body = _ref2.body;
                if (status >= 300) throw new Error(url + " returned status: " + status + " (Corr ID: " + _ref2.headers["paypal-debug-id"] + ")");
                return body;
            }));
        }
        function callSmartAPI(_ref3) {
            var accessToken = _ref3.accessToken, url = _ref3.url, _ref3$method = _ref3.method, method = void 0 === _ref3$method ? "get" : _ref3$method, _ref3$headers = _ref3.headers, reqHeaders = void 0 === _ref3$headers ? {} : _ref3$headers, json = _ref3.json;
            reqHeaders["x-requested-by"] = "smart-payment-buttons";
            accessToken && (reqHeaders["x-paypal-internal-euat"] = accessToken);
            return request({
                url: url,
                method: method,
                headers: reqHeaders,
                json: json
            }).then((function(_ref4) {
                var status = _ref4.status, body = _ref4.body, headers = _ref4.headers;
                if ("contingency" === body.ack) {
                    var err = new Error(body.contingency);
                    err.data = body.data;
                    throw err;
                }
                if (status > 400) throw new Error("Api: " + url + " returned status code: " + status + " (Corr ID: " + headers["paypal-debug-id"] + ")");
                if ("success" !== body.ack) throw new Error("Api: " + url + " returned ack: " + body.ack + " (Corr ID: " + headers["paypal-debug-id"] + ")");
                return body.data;
            }));
        }
        function callGraphQL(_ref5) {
            var _ref5$variables = _ref5.variables, _ref5$headers = _ref5.headers;
            return request({
                url: "/graphql?" + _ref5.name,
                method: "POST",
                json: {
                    query: _ref5.query,
                    variables: void 0 === _ref5$variables ? {} : _ref5$variables
                },
                headers: _extends({
                    "x-app-name": "smart-payment-buttons"
                }, void 0 === _ref5$headers ? {} : _ref5$headers)
            }).then((function(_ref6) {
                var status = _ref6.status, body = _ref6.body;
                var errors = body.errors || [];
                if (errors.length) {
                    var message = errors[0].message || JSON.stringify(errors[0]);
                    throw new Error(message);
                }
                if (200 !== status) throw new Error("/graphql returned status " + status);
                return body.data;
            }));
        }
        function auth_createAccessToken(clientID, _temp) {
            var targetSubject = (void 0 === _temp ? {} : _temp).targetSubject;
            return inlineMemoize(auth_createAccessToken, (function() {
                logger_getLogger().info("rest_api_create_access_token");
                var basicAuth = base64encode((clientID || "") + ":");
                var data = {
                    grant_type: "client_credentials"
                };
                targetSubject && (data.target_subject = targetSubject);
                return request({
                    method: "post",
                    url: "/v1/oauth2/token",
                    headers: {
                        Authorization: "Basic " + basicAuth
                    },
                    data: data
                }).then((function(_ref2) {
                    var body = _ref2.body;
                    if (body && "invalid_client" === body.error) throw new Error("Auth Api invalid client id: " + (clientID || "") + ":\n\n" + JSON.stringify(body, null, 4));
                    if (!body || !body.access_token) throw new Error("Auth Api response error:\n\n" + JSON.stringify(body, null, 4));
                    return body.access_token;
                }));
            }), [ clientID, targetSubject ]);
        }
        function getFirebaseSessionToken(sessionUID) {
            return callGraphQL({
                name: "GetFireBaseSessionToken",
                query: "\n            query GetFireBaseSessionToken($sessionUID: String!) {\n                firebase {\n                    auth(sessionUID: $sessionUID) {\n                        sessionToken\n                    }\n                }\n            }\n        ",
                variables: {
                    sessionUID: sessionUID
                }
            }).then((function(res) {
                return res.firebase.auth.sessionToken;
            }));
        }
        function patchOrder(orderID, data, _ref5) {
            var _headers8, _headers9;
            var buyerAccessToken = _ref5.buyerAccessToken, _ref5$forceRestAPI = _ref5.forceRestAPI;
            return void 0 !== _ref5$forceRestAPI && _ref5$forceRestAPI ? callRestAPI({
                accessToken: _ref5.facilitatorAccessToken,
                method: "patch",
                url: ORDERS_API_URL + "/" + orderID,
                data: data,
                headers: (_headers8 = {}, _headers8["paypal-partner-attribution-id"] = _ref5.partnerAttributionID || "", 
                _headers8)
            }) : callSmartAPI({
                accessToken: buyerAccessToken,
                method: "post",
                url: "/smart/api/order/" + orderID + "/patch",
                json: {
                    data: Array.isArray(data) ? {
                        patch: data
                    } : data
                },
                headers: (_headers9 = {}, _headers9["paypal-client-context"] = orderID, _headers9)
            });
        }
        function validatePaymentMethod(_ref6) {
            var _headers10;
            var accessToken = _ref6.accessToken, orderID = _ref6.orderID, paymentMethodID = _ref6.paymentMethodID, enableThreeDomainSecure = _ref6.enableThreeDomainSecure, partnerAttributionID = _ref6.partnerAttributionID, clientMetadataID = _ref6.clientMetadataID, installmentPlan = _ref6.installmentPlan;
            logger_getLogger().info("rest_api_create_order_token");
            var headers = ((_headers10 = {}).authorization = "Bearer " + accessToken, _headers10["paypal-partner-attribution-id"] = partnerAttributionID, 
            _headers10["paypal-client-metadata-id"] = clientMetadataID, _headers10["x-app-name"] = "smart-payment-buttons", 
            _headers10["x-app-version"] = "2.0.341", _headers10);
            var paymentSource = {
                token: {
                    id: paymentMethodID,
                    type: "NONCE"
                }
            };
            enableThreeDomainSecure && (paymentSource.contingencies = [ "3D_SECURE" ]);
            installmentPlan && (paymentSource.token.attributes = {
                installments: {
                    term: installmentPlan.term,
                    interval_duration: installmentPlan.interval_duration
                }
            });
            return request({
                method: "post",
                url: ORDERS_API_URL + "/" + orderID + "/validate-payment-method",
                headers: headers,
                json: {
                    payment_source: paymentSource
                }
            });
        }
        function billingTokenToOrderID(billingToken) {
            return callSmartAPI({
                method: "post",
                url: "/smart/api/payment/" + billingToken + "/ectoken"
            }).then((function(data) {
                return data.token;
            }));
        }
        function subscriptionIdToCartId(subscriptionID) {
            return callSmartAPI({
                method: "post",
                url: "/smart/api/billagmt/subscriptions/" + subscriptionID + "/cartid"
            }).then((function(data) {
                return data.token;
            }));
        }
        function oneClickApproveOrder(_ref12) {
            var _headers15;
            var orderID = _ref12.orderID, clientMetadataID = _ref12.clientMetadataID;
            return callGraphQL({
                name: "OneClickApproveOrder",
                query: "\n            mutation OneClickApproveOrder(\n                $orderID : String!\n                $instrumentType : String!\n                $instrumentID : String!\n            ) {\n                oneClickPayment(\n                    token: $orderID\n                    selectedInstrumentType : $instrumentType\n                    selectedInstrumentId : $instrumentID\n                ) {\n                    userId\n                }\n            }\n        ",
                variables: {
                    orderID: orderID,
                    instrumentType: _ref12.instrumentType,
                    instrumentID: _ref12.instrumentID
                },
                headers: (_headers15 = {}, _headers15["x-paypal-internal-euat"] = _ref12.buyerAccessToken, 
                _headers15["paypal-client-context"] = orderID, _headers15["paypal-client-metadata-id"] = clientMetadataID || orderID, 
                _headers15)
            }).then((function(_ref13) {
                return {
                    payerID: _ref13.oneClickPayment.userId
                };
            }));
        }
        var getSupplementalOrderInfo = memoize((function(orderID) {
            var _headers16;
            return callGraphQL({
                name: "GetCheckoutDetails",
                query: "\n            query GetCheckoutDetails($orderID: String!) {\n                checkoutSession(token: $orderID) {\n                    cart {\n                        billingType\n                        intent\n                        paymentId\n                        billingToken\n                        amounts {\n                            total {\n                                currencyValue\n                                currencyCode\n                                currencyFormatSymbolISOCurrency\n                                currencyValue\n                            }\n                        }\n                    }\n                    flags {\n                        isChangeShippingAddressAllowed\n                    }\n                    payees {\n                        merchantId\n                        email {\n                            stringValue\n                        }\n                    }\n                }\n            }\n        ",
                variables: {
                    orderID: orderID
                },
                headers: (_headers16 = {}, _headers16["paypal-client-context"] = orderID, _headers16)
            });
        }));
        function updateButtonClientConfig(_ref14) {
            var _ref14$inline = _ref14.inline;
            return callGraphQL({
                name: "UpdateClientConfig",
                query: "\n            mutation UpdateClientConfig(\n                $orderID : String!,\n                $fundingSource : ButtonFundingSourceType!,\n                $integrationArtifact : IntegrationArtifactType!,\n                $userExperienceFlow : UserExperienceFlowType!,\n                $productFlow : ProductFlowType!\n            ) {\n                updateClientConfig(\n                    token: $orderID,\n                    fundingSource: $fundingSource,\n                    integrationArtifact: $integrationArtifact,\n                    userExperienceFlow: $userExperienceFlow,\n                    productFlow: $productFlow\n                )\n            }\n        ",
                variables: {
                    orderID: orderID = (_ref9 = {
                        orderID: _ref14.orderID,
                        fundingSource: _ref14.fundingSource,
                        integrationArtifact: "PAYPAL_JS_SDK",
                        userExperienceFlow: void 0 !== _ref14$inline && _ref14$inline ? "INLINE" : "INCONTEXT",
                        productFlow: "SMART_PAYMENT_BUTTONS"
                    }).orderID,
                    fundingSource: _ref9.fundingSource,
                    integrationArtifact: _ref9.integrationArtifact,
                    userExperienceFlow: _ref9.userExperienceFlow,
                    productFlow: _ref9.productFlow
                },
                headers: (_headers13 = {}, _headers13["paypal-client-context"] = orderID, _headers13)
            }).then(src_util_noop);
            var _ref9, _headers13, orderID;
        }
        function createRequest(accessToken, subscriptionPayload, partnerAttributionID) {
            return request({
                method: "post",
                url: "/v1/billing/subscriptions",
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "PayPal-Partner-Attribution-Id": partnerAttributionID || ""
                },
                json: subscriptionPayload
            }).then((function(_ref) {
                var body = _ref.body;
                if (!body || !body.id) throw new Error("Create Subscription Api response error:\n\n" + JSON.stringify(body, null, 4));
                return body.id;
            }));
        }
        function reviseRequest(accessToken, subscriptionID, subscriptionPayload, partnerAttributionID) {
            return request({
                method: "post",
                url: "/v1/billing/subscriptions/" + subscriptionID + "/revise",
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "PayPal-Partner-Attribution-Id": partnerAttributionID || ""
                },
                json: subscriptionPayload
            }).then((function(_ref3) {
                var status = _ref3.status;
                if (200 !== status) throw new Error("Revise Subscription Api HTTP-" + status + " response: error:\n\n" + JSON.stringify(_ref3.body, null, 4));
                return subscriptionID;
            }));
        }
        var loadFirebaseSDK = memoize((function(config) {
            return promise_ZalgoPromise.try((function() {
                if (!window.firebase || !window.firebase.auth || !window.firebase.database) return loadScript("https://www.paypalobjects.com/checkout/js/lib/firebase-app.js").then((function() {
                    return promise_ZalgoPromise.all([ loadScript("https://www.paypalobjects.com/checkout/js/lib/firebase-auth.js"), loadScript("https://www.paypalobjects.com/checkout/js/lib/firebase-database.js") ]);
                }));
            })).then((function() {
                var firebase = window.firebase;
                if (!firebase) throw new Error("Firebase failed to load");
                firebase.initializeApp(config);
                return firebase;
            }));
        }));
        var _FRAUDNET_URL;
        var FRAUDNET_URL = ((_FRAUDNET_URL = {}).local = "https://www.stage2d0107.stage.paypal.com/FDRegression/fb.js", 
        _FRAUDNET_URL.stage = "https://www.stage2d0107.stage.paypal.com/FDRegression/fb.js", 
        _FRAUDNET_URL.sandbox = "https://c.paypal.com/da/r/fb.js", _FRAUDNET_URL.production = "https://c.paypal.com/da/r/fb.js", 
        _FRAUDNET_URL.test = "https://c.paypal.com/da/r/fb.js", _FRAUDNET_URL);
        var loadFraudnet = memoize((function(_ref) {
            var env = _ref.env, clientMetadataID = _ref.clientMetadataID, cspNonce = _ref.cspNonce, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 1e3 : _ref$timeout;
            return new promise_ZalgoPromise((function(resolve) {
                var config = {
                    f: clientMetadataID,
                    s: "SMART_PAYMENT_BUTTONS",
                    cb1: "fnCallback"
                };
                "sandbox" === env && (config.sandbox = !0);
                var configScript = document.createElement("script");
                configScript.setAttribute("nonce", cspNonce || "");
                configScript.setAttribute("type", "application/json");
                configScript.setAttribute("id", "fconfig");
                configScript.setAttribute("fncls", "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99");
                configScript.textContent = JSON.stringify(config);
                var fraudnetScript = document.createElement("script");
                fraudnetScript.setAttribute("nonce", cspNonce || "");
                fraudnetScript.setAttribute("src", FRAUDNET_URL[env]);
                fraudnetScript.addEventListener("error", (function() {
                    return resolve();
                }));
                window.fnCallback = resolve;
                setTimeout(resolve, timeout);
                var body = function() {
                    var body = document.body;
                    if (!body) throw new Error("Document body not found");
                    return body;
                }();
                body.appendChild(configScript);
                body.appendChild(fraudnetScript);
            }));
        }));
        var getSmartWallet = memoize((function(_ref) {
            var clientID = _ref.clientID, merchantID = _ref.merchantID, currency = _ref.currency, _ref$amount = _ref.amount, amount = void 0 === _ref$amount ? "0.00" : _ref$amount, clientMetadataID = _ref.clientMetadataID, userIDToken = _ref.userIDToken, _ref$vetted = _ref.vetted, vetted = void 0 === _ref$vetted || _ref$vetted;
            return loadFraudnet({
                env: _ref.env,
                clientMetadataID: clientMetadataID,
                cspNonce: _ref.cspNonce
            }).catch(src_util_noop).then((function() {
                var _headers;
                return callGraphQL({
                    name: "GetSmartWallet",
                    query: "\n            query GetSmartWallet(\n                $clientID: String!\n                $merchantID: [String!]\n                $currency: String\n                $amount: String\n                $userIDToken: String\n                $vetted: Boolean\n            ) {\n                smartWallet(\n                    clientId: $clientID\n                    merchantId: $merchantID\n                    currency: $currency\n                    amount: $amount\n                    userIdToken: $userIDToken\n                    vetted: $vetted\n                ) {\n                    paypal {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                            accessToken\n                        }\n                    }\n                    credit {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                            accessToken\n                        }\n                    }\n                    card {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                        }\n                    }\n                }\n            }\n        ",
                    variables: {
                        clientID: clientID,
                        merchantID: merchantID,
                        currency: currency,
                        amount: amount,
                        userIDToken: userIDToken,
                        vetted: vetted
                    },
                    headers: (_headers = {}, _headers["paypal-client-metadata-id"] = clientMetadataID, 
                    _headers)
                }).then((function(_ref2) {
                    return _ref2.smartWallet;
                }));
            }));
        }));
        function getNativeEligibility(_ref2) {
            var buttonSessionID = _ref2.buttonSessionID, cookies = _ref2.cookies;
            return callGraphQL({
                name: "GetNativeEligibility",
                query: "\n            query GetNativeEligibility(\n                $vault : Boolean,\n                $shippingCallbackEnabled : Boolean,\n                $merchantID : String,\n                $clientID : String,\n                $buyerCountry : String,\n                $currency : String,\n                $userAgent : String,\n                $buttonSessionID : String,\n                $cookies : String\n            ) {\n                mobileSDKEligibility(\n                    vault: $vault,\n                    shippingCallbackEnabled: $shippingCallbackEnabled,\n                    merchantID: $merchantID,\n                    facilitatorClientID: $clientID,\n                    buyerCountry: $buyerCountry,\n                    currency: $currency,\n                    userAgent: $userAgent,\n                    buttonSessionID: $buttonSessionID,\n                    cookies: $cookies\n                ) {\n                    paypal {\n                        eligibility\n                        ineligibilityReason\n                    }\n                    venmo {\n                        eligibility\n                        ineligibilityReason\n                    }\n                }\n            }\n        ",
                variables: {
                    vault: _ref2.vault,
                    shippingCallbackEnabled: _ref2.shippingCallbackEnabled,
                    merchantID: _ref2.merchantID,
                    clientID: _ref2.clientID,
                    buyerCountry: _ref2.buyerCountry,
                    currency: _ref2.currency,
                    userAgent: getUserAgent(),
                    buttonSessionID: buttonSessionID,
                    cookies: cookies
                }
            }).then((function(gqlResult) {
                if (!gqlResult || !gqlResult.mobileSDKEligibility) throw new Error("GraphQL GetNativeEligibility returned no mobileSDKEligibility object");
                return gqlResult.mobileSDKEligibility;
            }));
        }
        function getCreateOrder(_ref4, _ref5) {
            var createOrder = _ref4.createOrder, currency = _ref4.currency;
            var createBillingAgreement = _ref5.createBillingAgreement, createSubscription = _ref5.createSubscription;
            var data = {};
            var actions = function(_ref3) {
                var facilitatorAccessToken = _ref3.facilitatorAccessToken, intent = _ref3.intent, currency = _ref3.currency, merchantID = _ref3.merchantID, partnerAttributionID = _ref3.partnerAttributionID;
                var order = function(_ref) {
                    var facilitatorAccessToken = _ref.facilitatorAccessToken, intent = _ref.intent, currency = _ref.currency, merchantID = _ref.merchantID, partnerAttributionID = _ref.partnerAttributionID;
                    return {
                        create: function(data) {
                            var order = _extends({}, data);
                            if (order.intent && order.intent.toLowerCase() !== intent) throw new Error("Unexpected intent: " + order.intent + " passed to order.create. Please ensure you are passing /sdk/js?intent=" + order.intent.toLowerCase() + " in the paypal script tag.");
                            (order = _extends({}, order, {
                                intent: intent.toUpperCase()
                            })).purchase_units = order.purchase_units.map((function(unit) {
                                if (unit.amount.currency_code && unit.amount.currency_code !== currency) throw new Error("Unexpected currency: " + unit.amount.currency_code + " passed to order.create. Please ensure you are passing /sdk/js?currency=" + unit.amount.currency_code + " in the paypal script tag.");
                                var payee = unit.payee;
                                if (merchantID && 1 === merchantID.length && merchantID[0]) {
                                    var payeeID = merchantID[0];
                                    payee = isEmailAddress(payeeID) ? _extends({}, payee, {
                                        email_address: payeeID
                                    }) : _extends({}, payee, {
                                        merchant_id: payeeID
                                    });
                                }
                                return _extends({}, unit, {
                                    payee: payee,
                                    amount: _extends({}, unit.amount, {
                                        currency_code: currency
                                    })
                                });
                            }));
                            order.application_context = order.application_context || {};
                            return function(order, _ref) {
                                var _headers;
                                var facilitatorAccessToken = _ref.facilitatorAccessToken, partnerAttributionID = _ref.partnerAttributionID;
                                logger_getLogger().info("rest_api_create_order_id");
                                return callRestAPI({
                                    accessToken: facilitatorAccessToken,
                                    method: "post",
                                    url: "" + ORDERS_API_URL,
                                    data: order,
                                    headers: (_headers = {}, _headers["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                    _headers)
                                }).then((function(body) {
                                    var _getLogger$track;
                                    var orderID = body && body.id;
                                    if (!orderID) throw new Error("Order Api response error:\n\n" + JSON.stringify(body, null, 4));
                                    logger_getLogger().track(((_getLogger$track = {}).transition_name = "process_create_order", 
                                    _getLogger$track.context_type = "EC-Token", _getLogger$track.token = orderID, _getLogger$track.context_id = orderID, 
                                    _getLogger$track));
                                    return orderID;
                                }));
                            }(order, {
                                facilitatorAccessToken: facilitatorAccessToken,
                                partnerAttributionID: partnerAttributionID,
                                forceRestAPI: !1
                            });
                        }
                    };
                }({
                    facilitatorAccessToken: facilitatorAccessToken,
                    intent: intent,
                    currency: currency,
                    merchantID: merchantID,
                    partnerAttributionID: partnerAttributionID
                });
                !function(_ref2) {
                    var facilitatorAccessToken = _ref2.facilitatorAccessToken, intent = _ref2.intent, currency = _ref2.currency, merchantID = _ref2.merchantID, partnerAttributionID = _ref2.partnerAttributionID;
                }({
                    facilitatorAccessToken: facilitatorAccessToken,
                    intent: intent,
                    currency: currency,
                    merchantID: merchantID,
                    partnerAttributionID: partnerAttributionID
                });
                return {
                    order: order,
                    payment: null
                };
            }({
                facilitatorAccessToken: _ref5.facilitatorAccessToken,
                intent: _ref4.intent,
                currency: currency,
                merchantID: _ref4.merchantID,
                partnerAttributionID: _ref4.partnerAttributionID
            });
            return memoize((function() {
                var queryOrderID = parseQuery(window.location.search.slice(1)).orderID;
                if (queryOrderID) return promise_ZalgoPromise.resolve(queryOrderID);
                var startTime = Date.now();
                return promise_ZalgoPromise.try((function() {
                    return createBillingAgreement ? createBillingAgreement().then(billingTokenToOrderID) : createSubscription ? createSubscription().then(subscriptionIdToCartId) : createOrder ? createOrder(data, actions) : actions.order.create({
                        purchase_units: [ {
                            amount: {
                                currency_code: currency,
                                value: "0.01"
                            }
                        } ]
                    });
                })).catch((function(err) {
                    logger_getLogger().error("create_order_error", {
                        err: stringifyError(err)
                    });
                    throw err;
                })).then((function(orderID) {
                    var _getLogger$track;
                    if (!orderID || "string" != typeof orderID) throw new Error("Expected an order id to be passed");
                    if (0 === orderID.indexOf("PAY-") || 0 === orderID.indexOf("PAYID-")) throw new Error("Do not pass PAY-XXX or PAYID-XXX directly into createOrder. Pass the EC-XXX token instead");
                    var duration = Date.now() - startTime;
                    logger_getLogger().track((_getLogger$track = {}, _getLogger$track.state_name = "smart_button", 
                    _getLogger$track.transition_name = "process_receive_order", _getLogger$track.context_type = "EC-Token", 
                    _getLogger$track.context_id = orderID, _getLogger$track.token = orderID, _getLogger$track.response_duration = duration.toString(), 
                    _getLogger$track)).flush();
                    return orderID;
                }));
            }));
        }
        function getOnApprove(_ref4, _ref5) {
            var intent = _ref4.intent, _ref4$onApprove = _ref4.onApprove, onApprove = void 0 === _ref4$onApprove ? function(intent) {
                return function(data, actions) {
                    if ("capture" === intent) return actions.order.capture().then(src_util_noop);
                    if ("authorize" === intent) return actions.order.authorize().then(src_util_noop);
                    throw new Error("Unsupported intent for auto-capture: " + intent);
                };
            }(intent) : _ref4$onApprove, partnerAttributionID = _ref4.partnerAttributionID, onError = _ref4.onError, clientAccessToken = _ref4.clientAccessToken, vault = _ref4.vault, _ref4$upgradeLSAT = _ref4.upgradeLSAT, upgradeLSAT = void 0 !== _ref4$upgradeLSAT && _ref4$upgradeLSAT;
            var facilitatorAccessToken = _ref5.facilitatorAccessToken, createOrder = _ref5.createOrder;
            if (!onApprove) throw new Error("Expected onApprove");
            return memoize((function(_ref6, _ref7) {
                var payerID = _ref6.payerID, paymentID = _ref6.paymentID, billingToken = _ref6.billingToken, subscriptionID = _ref6.subscriptionID, buyerAccessToken = _ref6.buyerAccessToken, authCode = _ref6.authCode, _ref6$forceRestAPI = _ref6.forceRestAPI, forceRestAPI = void 0 === _ref6$forceRestAPI ? upgradeLSAT : _ref6$forceRestAPI;
                var restart = _ref7.restart;
                return promise_ZalgoPromise.try((function() {
                    return createOrder();
                })).then((function(orderID) {
                    var _getLogger$info$track;
                    logger_getLogger().info("button_approve").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_approve", 
                    _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                    _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                    billingToken || subscriptionID || clientAccessToken || vault || payerID || logger_getLogger().error("onapprove_payerid_not_present", {
                        orderID: orderID
                    }).flush();
                    return getSupplementalOrderInfo(orderID).then((function(supplementalData) {
                        var data = {
                            orderID: orderID,
                            payerID: payerID,
                            paymentID: paymentID = paymentID || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.paymentId,
                            billingToken: billingToken = billingToken || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.billingToken,
                            subscriptionID: subscriptionID,
                            facilitatorAccessToken: facilitatorAccessToken,
                            authCode: authCode
                        };
                        var actions = function(_ref3) {
                            var intent = _ref3.intent, orderID = _ref3.orderID, paymentID = _ref3.paymentID, payerID = _ref3.payerID, restart = _ref3.restart, subscriptionID = _ref3.subscriptionID, facilitatorAccessToken = _ref3.facilitatorAccessToken, buyerAccessToken = _ref3.buyerAccessToken, partnerAttributionID = _ref3.partnerAttributionID, forceRestAPI = _ref3.forceRestAPI;
                            var getSubscriptionApi = memoize((function() {
                                if (!subscriptionID) throw new Error("No subscription ID present");
                                return function(subscriptionID, _ref6) {
                                    return callSmartAPI({
                                        accessToken: _ref6.buyerAccessToken,
                                        url: "/smart/api/billagmt/subscriptions/" + subscriptionID
                                    });
                                }(subscriptionID, {
                                    buyerAccessToken: buyerAccessToken
                                });
                            }));
                            var activateSubscriptionApi = memoize((function() {
                                if (!subscriptionID) throw new Error("No subscription ID present");
                                return function(subscriptionID, _ref5) {
                                    return callSmartAPI({
                                        accessToken: _ref5.buyerAccessToken,
                                        method: "post",
                                        url: "/smart/api/billagmt/subscriptions/" + subscriptionID + "/activate"
                                    });
                                }(subscriptionID, {
                                    buyerAccessToken: buyerAccessToken
                                });
                            }));
                            var order = function(_ref) {
                                var intent = _ref.intent, orderID = _ref.orderID, restart = _ref.restart, facilitatorAccessToken = _ref.facilitatorAccessToken, buyerAccessToken = _ref.buyerAccessToken, partnerAttributionID = _ref.partnerAttributionID, forceRestAPI = _ref.forceRestAPI;
                                var handleProcessorError = function(err) {
                                    if (err && err.data && err.data.details && err.data.details.some((function(detail) {
                                        return "INSTRUMENT_DECLINED" === detail.issue || "PAYER_ACTION_REQUIRED" === detail.issue;
                                    }))) return restart().then(unresolvedPromise);
                                    throw new Error("Order could not be captured");
                                };
                                var get = memoize((function() {
                                    return function(orderID, _ref2) {
                                        var _headers2, _headers3;
                                        var buyerAccessToken = _ref2.buyerAccessToken, _ref2$forceRestAPI = _ref2.forceRestAPI;
                                        return void 0 !== _ref2$forceRestAPI && _ref2$forceRestAPI ? callRestAPI({
                                            accessToken: _ref2.facilitatorAccessToken,
                                            url: ORDERS_API_URL + "/" + orderID,
                                            headers: (_headers2 = {}, _headers2["paypal-partner-attribution-id"] = _ref2.partnerAttributionID || "", 
                                            _headers2)
                                        }) : callSmartAPI({
                                            accessToken: buyerAccessToken,
                                            url: "/smart/api/order/" + orderID,
                                            headers: (_headers3 = {}, _headers3["paypal-client-context"] = orderID, _headers3)
                                        });
                                    }(orderID, {
                                        facilitatorAccessToken: facilitatorAccessToken,
                                        buyerAccessToken: buyerAccessToken,
                                        partnerAttributionID: partnerAttributionID,
                                        forceRestAPI: forceRestAPI
                                    });
                                }));
                                var capture = memoize((function() {
                                    if ("capture" !== intent) throw new Error("Use intent=capture to use client-side capture");
                                    return function(orderID, _ref3) {
                                        var _headers4, _headers5;
                                        var buyerAccessToken = _ref3.buyerAccessToken, _ref3$forceRestAPI = _ref3.forceRestAPI;
                                        return void 0 !== _ref3$forceRestAPI && _ref3$forceRestAPI ? callRestAPI({
                                            accessToken: _ref3.facilitatorAccessToken,
                                            method: "post",
                                            url: ORDERS_API_URL + "/" + orderID + "/capture",
                                            headers: (_headers4 = {}, _headers4["paypal-partner-attribution-id"] = _ref3.partnerAttributionID || "", 
                                            _headers4)
                                        }) : callSmartAPI({
                                            accessToken: buyerAccessToken,
                                            method: "post",
                                            url: "/smart/api/order/" + orderID + "/capture",
                                            headers: (_headers5 = {}, _headers5["paypal-client-context"] = orderID, _headers5)
                                        });
                                    }(orderID, {
                                        facilitatorAccessToken: facilitatorAccessToken,
                                        buyerAccessToken: buyerAccessToken,
                                        partnerAttributionID: partnerAttributionID,
                                        forceRestAPI: forceRestAPI
                                    }).finally(get.reset).finally(capture.reset).catch(handleProcessorError);
                                }));
                                var authorize = memoize((function() {
                                    if ("authorize" !== intent) throw new Error("Use intent=authorize to use client-side authorize");
                                    return function(orderID, _ref4) {
                                        var _headers6, _headers7;
                                        var buyerAccessToken = _ref4.buyerAccessToken, _ref4$forceRestAPI = _ref4.forceRestAPI;
                                        return void 0 !== _ref4$forceRestAPI && _ref4$forceRestAPI ? callRestAPI({
                                            accessToken: _ref4.facilitatorAccessToken,
                                            method: "post",
                                            url: ORDERS_API_URL + "/" + orderID + "/authorize",
                                            headers: (_headers6 = {}, _headers6["paypal-partner-attribution-id"] = _ref4.partnerAttributionID || "", 
                                            _headers6)
                                        }) : callSmartAPI({
                                            accessToken: buyerAccessToken,
                                            method: "post",
                                            url: "/smart/api/order/" + orderID + "/authorize",
                                            headers: (_headers7 = {}, _headers7["paypal-client-context"] = orderID, _headers7)
                                        });
                                    }(orderID, {
                                        facilitatorAccessToken: facilitatorAccessToken,
                                        buyerAccessToken: buyerAccessToken,
                                        partnerAttributionID: partnerAttributionID,
                                        forceRestAPI: forceRestAPI
                                    }).finally(get.reset).finally(authorize.reset).catch(handleProcessorError);
                                }));
                                return {
                                    capture: capture,
                                    authorize: authorize,
                                    patch: function(data) {
                                        void 0 === data && (data = {});
                                        return patchOrder(orderID, data, {
                                            facilitatorAccessToken: facilitatorAccessToken,
                                            buyerAccessToken: buyerAccessToken,
                                            partnerAttributionID: partnerAttributionID,
                                            forceRestAPI: forceRestAPI
                                        }).catch((function() {
                                            throw new Error("Order could not be patched");
                                        }));
                                    },
                                    get: get
                                };
                            }({
                                intent: intent,
                                orderID: orderID,
                                paymentID: paymentID,
                                payerID: payerID,
                                subscriptionID: subscriptionID,
                                restart: restart,
                                facilitatorAccessToken: facilitatorAccessToken,
                                buyerAccessToken: buyerAccessToken,
                                partnerAttributionID: partnerAttributionID,
                                forceRestAPI: forceRestAPI
                            });
                            !function(_ref2) {
                                var intent = _ref2.intent, paymentID = _ref2.paymentID, payerID = _ref2.payerID, restart = _ref2.restart, facilitatorAccessToken = _ref2.facilitatorAccessToken, buyerAccessToken = _ref2.buyerAccessToken, partnerAttributionID = _ref2.partnerAttributionID;
                                if (paymentID) {
                                    var handleProcessorError = function(err) {
                                        if (err && err.data && err.data.details && err.data.details.some((function(detail) {
                                            return "INSTRUMENT_DECLINED" === detail.issue || "PAYER_ACTION_REQUIRED" === detail.issue;
                                        }))) return restart().then(unresolvedPromise);
                                        throw new Error("Order could not be captured");
                                    };
                                    var get = memoize((function() {
                                        return function(paymentID, _ref4) {
                                            var _headers2;
                                            return callRestAPI({
                                                accessToken: _ref4.facilitatorAccessToken,
                                                url: "/v1/payments/payment/" + paymentID,
                                                headers: (_headers2 = {}, _headers2["paypal-partner-attribution-id"] = _ref4.partnerAttributionID || "", 
                                                _headers2)
                                            });
                                        }(paymentID, {
                                            facilitatorAccessToken: facilitatorAccessToken,
                                            buyerAccessToken: buyerAccessToken,
                                            partnerAttributionID: partnerAttributionID
                                        });
                                    }));
                                    var execute = memoize((function() {
                                        if (!payerID) throw new Error("payerID required for payment execute");
                                        if ("capture" !== intent) throw new Error("Use intent=capture to use client-side capture");
                                        return function(paymentID, payerID, _ref5) {
                                            var _headers3;
                                            return callRestAPI({
                                                accessToken: _ref5.facilitatorAccessToken,
                                                method: "post",
                                                url: "/v1/payments/payment/" + paymentID + "/execute",
                                                headers: (_headers3 = {}, _headers3["paypal-partner-attribution-id"] = _ref5.partnerAttributionID || "", 
                                                _headers3),
                                                data: {
                                                    payer_id: payerID
                                                }
                                            });
                                        }(paymentID, payerID, {
                                            facilitatorAccessToken: facilitatorAccessToken,
                                            buyerAccessToken: buyerAccessToken,
                                            partnerAttributionID: partnerAttributionID
                                        }).finally(get.reset).finally(execute.reset).catch(handleProcessorError);
                                    }));
                                }
                            }({
                                intent: intent,
                                orderID: orderID,
                                paymentID: paymentID,
                                payerID: payerID,
                                subscriptionID: subscriptionID,
                                restart: restart,
                                facilitatorAccessToken: facilitatorAccessToken,
                                buyerAccessToken: buyerAccessToken,
                                partnerAttributionID: partnerAttributionID,
                                forceRestAPI: forceRestAPI
                            });
                            return {
                                order: order,
                                payment: null,
                                subscription: {
                                    get: getSubscriptionApi,
                                    activate: activateSubscriptionApi
                                },
                                restart: restart,
                                redirect: function(url) {
                                    if (!url) throw new Error("Expected redirect url");
                                    if (-1 === url.indexOf("://")) {
                                        logger_getLogger().warn("redir_url_non_scheme", {
                                            url: url
                                        }).flush();
                                        throw new Error("Invalid redirect url: " + url + " - must be fully qualified url");
                                    }
                                    url.match(/^https?:\/\//) || logger_getLogger().warn("redir_url_non_http", {
                                        url: url
                                    }).flush();
                                    return dom_redirect(url, window.top);
                                }
                            };
                        }({
                            orderID: orderID,
                            paymentID: paymentID,
                            payerID: payerID,
                            intent: intent = intent || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.intent,
                            restart: restart,
                            subscriptionID: subscriptionID,
                            facilitatorAccessToken: facilitatorAccessToken,
                            buyerAccessToken: buyerAccessToken,
                            partnerAttributionID: partnerAttributionID,
                            forceRestAPI: forceRestAPI
                        });
                        return onApprove(data, actions).catch((function(err) {
                            return promise_ZalgoPromise.try((function() {
                                return onError(err);
                            })).then((function() {
                                throw err;
                            }));
                        }));
                    }));
                }));
            }));
        }
        function getOnCancel(_ref2, _ref3) {
            var _ref2$onCancel = _ref2.onCancel, onCancel = void 0 === _ref2$onCancel ? promiseNoop : _ref2$onCancel, onError = _ref2.onError;
            var createOrder = _ref3.createOrder;
            return memoize((function() {
                return createOrder().then((function(orderID) {
                    var _getLogger$info$track;
                    logger_getLogger().info("button_cancel").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_cancel", 
                    _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                    _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                    return onCancel({
                        orderID: {
                            orderID: orderID
                        }.orderID
                    }, {
                        redirect: function(url) {
                            if (!url) throw new Error("Expected redirect url");
                            if (-1 === url.indexOf("://")) {
                                logger_getLogger().warn("redir_url_non_scheme", {
                                    url: url
                                }).flush();
                                throw new Error("Invalid redirect url: " + url + " - must be fully qualified url");
                            }
                            url.match(/^https?:\/\//) || logger_getLogger().warn("redir_url_non_http", {
                                url: url
                            }).flush();
                            return dom_redirect(url, window.top);
                        }
                    });
                })).catch((function(err) {
                    return onError(err);
                }));
            }));
        }
        function getOnShippingChange(_ref2, _ref3) {
            var onShippingChange = _ref2.onShippingChange, partnerAttributionID = _ref2.partnerAttributionID, _ref2$upgradeLSAT = _ref2.upgradeLSAT, upgradeLSAT = void 0 !== _ref2$upgradeLSAT && _ref2$upgradeLSAT;
            var facilitatorAccessToken = _ref3.facilitatorAccessToken, createOrder = _ref3.createOrder;
            if (onShippingChange) return function(_ref4, actions) {
                var buyerAccessToken = _ref4.buyerAccessToken, _ref4$forceRestAPI = _ref4.forceRestAPI, forceRestAPI = void 0 === _ref4$forceRestAPI ? upgradeLSAT : _ref4$forceRestAPI, data = function(source, excluded) {
                    if (null == source) return {};
                    var target = {};
                    var sourceKeys = Object.keys(source);
                    var key, i;
                    for (i = 0; i < sourceKeys.length; i++) excluded.indexOf(key = sourceKeys[i]) >= 0 || (target[key] = source[key]);
                    return target;
                }(_ref4, [ "buyerAccessToken", "forceRestAPI" ]);
                return createOrder().then((function(orderID) {
                    var _getLogger$info$track;
                    logger_getLogger().info("button_shipping_change").track((_getLogger$info$track = {}, 
                    _getLogger$info$track.transition_name = "process_checkout_shipping_change", _getLogger$info$track.context_type = "EC-Token", 
                    _getLogger$info$track.token = orderID, _getLogger$info$track.context_id = orderID, 
                    _getLogger$info$track)).flush();
                    return onShippingChange(data, function(_ref) {
                        var orderID = _ref.orderID, facilitatorAccessToken = _ref.facilitatorAccessToken, buyerAccessToken = _ref.buyerAccessToken, partnerAttributionID = _ref.partnerAttributionID, forceRestAPI = _ref.forceRestAPI;
                        return {
                            resolve: function() {
                                return promise_ZalgoPromise.resolve();
                            },
                            reject: _ref.actions.reject || function() {
                                throw new Error("Missing reject action callback");
                            },
                            order: {
                                patch: function(data) {
                                    void 0 === data && (data = {});
                                    return patchOrder(orderID, data, {
                                        facilitatorAccessToken: facilitatorAccessToken,
                                        buyerAccessToken: buyerAccessToken,
                                        partnerAttributionID: partnerAttributionID,
                                        forceRestAPI: forceRestAPI
                                    }).catch((function() {
                                        throw new Error("Order could not be patched");
                                    }));
                                }
                            }
                        };
                    }({
                        orderID: orderID,
                        facilitatorAccessToken: facilitatorAccessToken,
                        buyerAccessToken: buyerAccessToken,
                        actions: actions,
                        partnerAttributionID: partnerAttributionID,
                        forceRestAPI: forceRestAPI
                    }));
                }));
            };
        }
        function getOnAuth(_ref) {
            var facilitatorAccessToken = _ref.facilitatorAccessToken, createOrder = _ref.createOrder, upgradeLSAT = _ref.upgradeLSAT;
            return function(_ref2) {
                var accessToken = _ref2.accessToken;
                logger_getLogger().info("spb_onauth_access_token_" + (accessToken ? "present" : "not_present"));
                return promise_ZalgoPromise.try((function() {
                    if (accessToken) return upgradeLSAT ? createOrder().then((function(orderID) {
                        return function(facilitatorAccessToken, _ref3) {
                            var _headers;
                            var buyerAccessToken = _ref3.buyerAccessToken, orderID = _ref3.orderID;
                            return callGraphQL({
                                name: "UpgradeFacilitatorAccessToken",
                                headers: (_headers = {}, _headers["x-paypal-internal-euat"] = buyerAccessToken, 
                                _headers["paypal-client-context"] = orderID, _headers),
                                query: "\n            mutation UpgradeFacilitatorAccessToken(\n                $orderID: String!\n                $buyerAccessToken: String!\n                $facilitatorAccessToken: String!\n            ) {\n                upgradeLowScopeAccessToken(\n                    token: $orderID\n                    buyerAccessToken: $buyerAccessToken\n                    merchantLSAT: $facilitatorAccessToken\n                )\n            }\n        ",
                                variables: {
                                    facilitatorAccessToken: facilitatorAccessToken,
                                    buyerAccessToken: buyerAccessToken,
                                    orderID: orderID
                                }
                            }).then(src_util_noop);
                        }(facilitatorAccessToken, {
                            buyerAccessToken: accessToken,
                            orderID: orderID
                        });
                    })).then((function() {
                        logger_getLogger().info("upgrade_lsat_success");
                        return accessToken;
                    })).catch((function(err) {
                        logger_getLogger().warn("upgrade_lsat_failure", {
                            error: stringifyError(err)
                        });
                        return accessToken;
                    })) : accessToken;
                }));
            };
        }
        var props_TYPES = !0;
        function getProps(_ref) {
            var facilitatorAccessToken = _ref.facilitatorAccessToken;
            var xprops = window.xprops;
            var upgradeLSATExperiment = (name = "UPGRADE_LSAT_EXPERIMENT", logger = logger_getLogger(), 
            function(_ref) {
                var name = _ref.name, _ref$sample = _ref.sample, sample = void 0 === _ref$sample ? 50 : _ref$sample, _ref$logTreatment = _ref.logTreatment, logTreatment = void 0 === _ref$logTreatment ? src_util_noop : _ref$logTreatment, _ref$logCheckpoint = _ref.logCheckpoint, logCheckpoint = void 0 === _ref$logCheckpoint ? src_util_noop : _ref$logCheckpoint;
                var throttle = function(name) {
                    return getBelterExperimentStorage().getState((function(state) {
                        state.throttlePercentiles = state.throttlePercentiles || {};
                        state.throttlePercentiles[name] = state.throttlePercentiles[name] || Math.floor(100 * Math.random());
                        return state.throttlePercentiles[name];
                    }));
                }(name);
                var group;
                var treatment = name + "_" + (group = throttle < sample ? "test" : sample >= 50 || sample <= throttle && throttle < 2 * sample ? "control" : "throttle");
                var started = !1;
                var forced = !1;
                try {
                    window.localStorage && window.localStorage.getItem(name) && (forced = !0);
                } catch (err) {}
                return {
                    isEnabled: function() {
                        return "test" === group || forced;
                    },
                    isDisabled: function() {
                        return "test" !== group && !forced;
                    },
                    getTreatment: function() {
                        return treatment;
                    },
                    log: function(checkpoint, payload) {
                        void 0 === payload && (payload = {});
                        if (!started) return this;
                        isEventUnique(name + "_" + treatment + "_" + JSON.stringify(payload)) && logTreatment({
                            name: name,
                            treatment: treatment,
                            payload: payload
                        });
                        isEventUnique(name + "_" + treatment + "_" + checkpoint + "_" + JSON.stringify(payload)) && logCheckpoint({
                            name: name,
                            treatment: treatment,
                            checkpoint: checkpoint,
                            payload: payload
                        });
                        return this;
                    },
                    logStart: function(payload) {
                        void 0 === payload && (payload = {});
                        started = !0;
                        return this.log("start", payload);
                    },
                    logComplete: function(payload) {
                        void 0 === payload && (payload = {});
                        return this.log("complete", payload);
                    }
                };
            }({
                name: name,
                sample: 1,
                logTreatment: function(_ref) {
                    var _extends2;
                    var treatment = _ref.treatment, payload = _ref.payload;
                    var fullPayload = _extends(((_extends2 = {}).state_name = "PXP_CHECK", _extends2.transition_name = "process_pxp_check", 
                    _extends2.pxp_exp_id = name, _extends2.pxp_trtmnt_id = treatment, _extends2), payload);
                    logger.track(fullPayload);
                    logger.flush();
                },
                logCheckpoint: function(_ref2) {
                    logger.info(name + "_" + _ref2.treatment + "_" + _ref2.checkpoint, _ref2.payload);
                    logger.flush();
                }
            }));
            var name, logger;
            var uid = xprops.uid, env = xprops.env, vault = xprops.vault, commit = xprops.commit, locale = xprops.locale, platform = xprops.platform, sessionID = xprops.sessionID, buttonSessionID = xprops.buttonSessionID, clientID = xprops.clientID, partnerAttributionID = xprops.partnerAttributionID, clientMetadataID = xprops.clientMetadataID, _xprops$sdkCorrelatio = xprops.sdkCorrelationID, sdkCorrelationID = void 0 === _xprops$sdkCorrelatio ? xprops.correlationID : _xprops$sdkCorrelatio, getParentDomain = xprops.getParentDomain, clientAccessToken = xprops.clientAccessToken, getPopupBridge = xprops.getPopupBridge, getPrerenderDetails = xprops.getPrerenderDetails, getPageUrl = xprops.getPageUrl, enableThreeDomainSecure = xprops.enableThreeDomainSecure, enableVaultInstallments = xprops.enableVaultInstallments, _xprops$enableNativeC = xprops.enableNativeCheckout, enableNativeCheckout = void 0 !== _xprops$enableNativeC && _xprops$enableNativeC, rememberFunding = xprops.remember, stageHost = xprops.stageHost, apiStageHost = xprops.apiStageHost, style = xprops.style, getParent = xprops.getParent, fundingSource = xprops.fundingSource, currency = xprops.currency, connect = xprops.connect, intent = xprops.intent, merchantID = xprops.merchantID, _xprops$upgradeLSAT = xprops.upgradeLSAT, upgradeLSAT = void 0 === _xprops$upgradeLSAT ? upgradeLSATExperiment.isEnabled() : _xprops$upgradeLSAT, amount = xprops.amount, userIDToken = xprops.userIDToken, enableFunding = xprops.enableFunding, disableFunding = xprops.disableFunding, disableCard = xprops.disableCard, _xprops$getQueriedEli = xprops.getQueriedEligibleFunding, getQueriedEligibleFunding = void 0 === _xprops$getQueriedEli ? function() {
                return promise_ZalgoPromise.resolve([]);
            } : _xprops$getQueriedEli;
            var onInit = function(_ref) {
                var onInit = _ref.onInit;
                return function(data) {
                    var enabled = !0;
                    return {
                        initPromise: promise_ZalgoPromise.try((function() {
                            if (onInit) return onInit(data, (set = function(val) {
                                enabled = val;
                            }, {
                                enable: function() {
                                    return promise_ZalgoPromise.try((function() {
                                        return set(!0);
                                    }));
                                },
                                disable: function() {
                                    return promise_ZalgoPromise.try((function() {
                                        return set(!1);
                                    }));
                                }
                            }));
                            var set;
                        })),
                        isEnabled: function() {
                            return enabled;
                        }
                    };
                };
            }({
                onInit: xprops.onInit
            });
            var merchantDomain = "function" == typeof getParentDomain ? getParentDomain() : "unknown";
            var onClick = function(_ref2) {
                var onClick = _ref2.onClick;
                if (onClick) return memoize((function(_ref3) {
                    return onClick((_ref = {
                        fundingSource: _ref3.fundingSource
                    }, {
                        fundingSource: _ref.fundingSource
                    }), {
                        resolve: function() {
                            return promise_ZalgoPromise.try((function() {
                                return !0;
                            }));
                        },
                        reject: function() {
                            return promise_ZalgoPromise.try((function() {
                                return !1;
                            }));
                        }
                    }).then((function(valid) {
                        return !1 !== valid;
                    }));
                    var _ref;
                }));
            }({
                onClick: xprops.onClick
            });
            if (xprops.createBillingAgreement) {
                if (xprops.createOrder) throw new Error("Do not pass both createBillingAgreement and createOrder");
                if (!xprops.vault) throw new Error("Must pass vault=true to sdk to use createBillingAgreement");
            }
            if (xprops.createSubscription) {
                if (xprops.createOrder) throw new Error("Do not pass both createSubscription and createOrder");
                if (xprops.createOrder) throw new Error("Do not pass both createSubscription and createBillingAgreement");
                if (!xprops.vault) throw new Error("Must pass vault=true to sdk to use createSubscription");
            }
            if ("tokenize" === intent) {
                if (!xprops.createBillingAgreement) throw new Error("Must pass createBillingAgreement with intent=tokenize");
                if (xprops.createOrder || xprops.createSubscription) throw new Error("Must not pass createOrder or createSubscription with intent=tokenize");
            }
            if ("subscription" === intent) {
                if (!xprops.createSubscription) throw new Error("Must pass createSubscription with intent=subscription");
                if (xprops.createOrder || xprops.createBillingAgreement) throw new Error("Must not pass createOrder or createBillingAgreement with intent=tokenize");
            }
            var createBillingAgreement = function(_ref) {
                var createBillingAgreement = _ref.createBillingAgreement;
                if (createBillingAgreement) return function() {
                    return createBillingAgreement({}, {}).then((function(billingToken) {
                        if (!billingToken || "string" != typeof billingToken) throw new Error("Expected a billing token to be passed to createBillingAgreement");
                        return billingToken;
                    }));
                };
            }({
                createBillingAgreement: xprops.createBillingAgreement
            });
            var createSubscription = function(_ref2, _ref3) {
                var createSubscription = _ref2.createSubscription, partnerAttributionID = _ref2.partnerAttributionID, merchantID = _ref2.merchantID, clientID = _ref2.clientID;
                var facilitatorAccessToken = _ref3.facilitatorAccessToken;
                if (createSubscription) {
                    if (merchantID && merchantID[0]) {
                        logger_getLogger().info("src_props_subscriptions_recreate_access_token_cache");
                        auth_createAccessToken(clientID, {
                            targetSubject: merchantID[0]
                        });
                    }
                    return function() {
                        return createSubscription({}, function(_ref) {
                            var facilitatorAccessToken = _ref.facilitatorAccessToken, partnerAttributionID = _ref.partnerAttributionID, merchantID = _ref.merchantID, clientID = _ref.clientID;
                            return {
                                subscription: {
                                    create: function(data) {
                                        return function(accessToken, subscriptionPayload, _ref2) {
                                            var partnerAttributionID = _ref2.partnerAttributionID, merchantID = _ref2.merchantID, clientID = _ref2.clientID;
                                            logger_getLogger().info("rest_api_create_subscription_id");
                                            if (!subscriptionPayload) throw new Error("Expected subscription payload to be passed");
                                            if (merchantID && merchantID[0]) {
                                                logger_getLogger().info("rest_api_subscriptions_recreate_access_token");
                                                return auth_createAccessToken(clientID, {
                                                    targetSubject: merchantID[0]
                                                }).then((function(thirdPartyAccessToken) {
                                                    return createRequest(thirdPartyAccessToken, subscriptionPayload, partnerAttributionID);
                                                }));
                                            }
                                            if (!accessToken) throw new Error("Access token not passed");
                                            return createRequest(accessToken, subscriptionPayload, partnerAttributionID);
                                        }(facilitatorAccessToken, data, {
                                            partnerAttributionID: partnerAttributionID,
                                            merchantID: merchantID,
                                            clientID: clientID
                                        });
                                    },
                                    revise: function(subscriptionID, data) {
                                        return function(accessToken, subscriptionID, subscriptionPayload, _ref4) {
                                            var partnerAttributionID = _ref4.partnerAttributionID, merchantID = _ref4.merchantID, clientID = _ref4.clientID;
                                            logger_getLogger().info("rest_api_create_subscription_id");
                                            if (!subscriptionID) throw new Error("Expected subscription id to be passed as first argument to revise subscription api");
                                            if (!subscriptionPayload) throw new Error("Expected subscription payload to be passed");
                                            if (merchantID && merchantID[0]) {
                                                logger_getLogger().info("rest_api_subscriptions_recreate_access_token");
                                                return auth_createAccessToken(clientID, {
                                                    targetSubject: merchantID[0]
                                                }).then((function(thirdPartyAccessToken) {
                                                    return reviseRequest(thirdPartyAccessToken, subscriptionID, subscriptionPayload, partnerAttributionID);
                                                }));
                                            }
                                            if (!accessToken) throw new Error("Access token not passed");
                                            return reviseRequest(accessToken, subscriptionID, subscriptionPayload, partnerAttributionID);
                                        }(facilitatorAccessToken, subscriptionID, data, {
                                            partnerAttributionID: partnerAttributionID,
                                            merchantID: merchantID,
                                            clientID: clientID
                                        });
                                    }
                                }
                            };
                        }({
                            facilitatorAccessToken: facilitatorAccessToken,
                            partnerAttributionID: partnerAttributionID,
                            merchantID: merchantID,
                            clientID: clientID
                        })).then((function(subscriptionID) {
                            if (!subscriptionID || "string" != typeof subscriptionID) throw new Error("Expected an subscription id to be passed to createSubscription");
                            return subscriptionID;
                        }));
                    };
                }
            }({
                createSubscription: xprops.createSubscription,
                partnerAttributionID: partnerAttributionID,
                merchantID: merchantID,
                clientID: clientID
            }, {
                facilitatorAccessToken: facilitatorAccessToken
            });
            var createOrder = getCreateOrder({
                createOrder: xprops.createOrder,
                currency: currency,
                intent: intent,
                merchantID: merchantID,
                partnerAttributionID: partnerAttributionID
            }, {
                facilitatorAccessToken: facilitatorAccessToken,
                createBillingAgreement: createBillingAgreement,
                createSubscription: createSubscription
            });
            var onError = function(_ref) {
                var onError = _ref.onError;
                var onErrorHandler = onError ? (handler = onError, seenErrors = [], seenStringifiedErrors = {}, 
                function(err) {
                    if (-1 === seenErrors.indexOf(err)) {
                        seenErrors.push(err);
                        var stringifiedError = stringifyError(err);
                        if (!seenStringifiedErrors[stringifiedError]) {
                            seenStringifiedErrors[stringifiedError] = !0;
                            return handler(err);
                        }
                    }
                }) : src_util_noop;
                var handler, seenErrors, seenStringifiedErrors;
                return function(err) {
                    return promise_ZalgoPromise.try((function() {
                        return onErrorHandler(err);
                    }));
                };
            }({
                onError: xprops.onError
            });
            return {
                uid: uid,
                env: env,
                style: style,
                vault: vault,
                commit: commit,
                clientAccessToken: clientAccessToken,
                locale: locale,
                sessionID: sessionID,
                buttonSessionID: buttonSessionID,
                clientID: clientID,
                partnerAttributionID: partnerAttributionID,
                clientMetadataID: clientMetadataID,
                sdkCorrelationID: sdkCorrelationID,
                merchantDomain: merchantDomain,
                platform: platform,
                currency: currency,
                intent: intent,
                getPopupBridge: getPopupBridge,
                getPrerenderDetails: getPrerenderDetails,
                getPageUrl: getPageUrl,
                rememberFunding: rememberFunding,
                getParent: getParent,
                connect: connect,
                fundingSource: fundingSource,
                enableFunding: enableFunding,
                disableFunding: disableFunding,
                disableCard: disableCard,
                getQueriedEligibleFunding: getQueriedEligibleFunding,
                amount: amount,
                userIDToken: userIDToken,
                enableThreeDomainSecure: enableThreeDomainSecure,
                enableNativeCheckout: enableNativeCheckout,
                enableVaultInstallments: enableVaultInstallments,
                onClick: onClick,
                onInit: onInit,
                onError: onError,
                stageHost: stageHost,
                apiStageHost: apiStageHost,
                createOrder: createOrder,
                createBillingAgreement: createBillingAgreement,
                createSubscription: createSubscription,
                onApprove: getOnApprove({
                    onApprove: xprops.onApprove,
                    intent: intent,
                    onError: onError,
                    partnerAttributionID: partnerAttributionID,
                    upgradeLSAT: upgradeLSAT,
                    clientAccessToken: clientAccessToken,
                    vault: vault
                }, {
                    facilitatorAccessToken: facilitatorAccessToken,
                    createOrder: createOrder
                }),
                onCancel: getOnCancel({
                    onCancel: xprops.onCancel,
                    onError: onError
                }, {
                    createOrder: createOrder
                }),
                onShippingChange: getOnShippingChange({
                    onShippingChange: xprops.onShippingChange,
                    partnerAttributionID: partnerAttributionID,
                    upgradeLSAT: upgradeLSAT
                }, {
                    facilitatorAccessToken: facilitatorAccessToken,
                    createOrder: createOrder
                }),
                onAuth: getOnAuth({
                    facilitatorAccessToken: facilitatorAccessToken,
                    createOrder: createOrder,
                    upgradeLSAT: upgradeLSAT
                }),
                standaloneFundingSource: fundingSource
            };
        }
        function getComponents() {
            var _paypal = paypal;
            return {
                Checkout: _paypal.Checkout,
                CardFields: _paypal.CardFields,
                ThreeDomainSecure: _paypal.ThreeDomainSecure,
                Menu: _paypal.Menu,
                Installments: _paypal.Installments
            };
        }
        function getConfig(_ref2) {
            var firebaseConfig = _ref2.firebaseConfig;
            var cspNonce = _ref2.serverCSPNonce || getNonce();
            return {
                version: paypal.version,
                cspNonce: cspNonce,
                firebase: firebaseConfig
            };
        }
        function getServiceData(_ref3) {
            return {
                merchantID: _ref3.serverMerchantID,
                buyerCountry: _ref3.buyerGeoCountry || "US",
                fundingEligibility: _ref3.fundingEligibility,
                wallet: _ref3.wallet,
                sdkMeta: _ref3.sdkMeta,
                content: _ref3.content,
                buyerAccessToken: _ref3.buyerAccessToken,
                facilitatorAccessToken: _ref3.facilitatorAccessToken,
                eligibility: _ref3.eligibility,
                cookies: _ref3.cookies
            };
        }
        function enableLoadingSpinner(button) {
            button.classList.add("paypal-button-loading");
        }
        function disableLoadingSpinner(button) {
            button.classList.remove("paypal-button-loading");
        }
        function _renderChildren(children, renderer) {
            var result = [];
            for (var _i2 = 0; _i2 < children.length; _i2++) {
                var renderedChild = children[_i2].render(renderer);
                if (renderedChild) if (Array.isArray(renderedChild)) for (var _i4 = 0; _i4 < renderedChild.length; _i4++) {
                    var subchild = renderedChild[_i4];
                    subchild && result.push(subchild);
                } else result.push(renderedChild);
            }
            return result;
        }
        var node_ElementNode = function() {
            function ElementNode(name, props, children) {
                this.type = "element";
                this.name = void 0;
                this.props = void 0;
                this.children = void 0;
                this.onRender = void 0;
                this.name = name;
                this.props = props || {};
                this.children = children;
                var onRender = this.props.onRender;
                if ("function" == typeof onRender) {
                    this.onRender = onRender;
                    delete props.onRender;
                }
            }
            var _proto = ElementNode.prototype;
            _proto.render = function(renderer) {
                var el = renderer(this);
                this.onRender && this.onRender(el);
                return el;
            };
            _proto.renderChildren = function(renderer) {
                return _renderChildren(this.children, renderer);
            };
            return ElementNode;
        }();
        var node_FragmentNode = function() {
            function FragmentNode(children) {
                this.type = "fragment";
                this.children = void 0;
                this.children = children;
            }
            FragmentNode.prototype.render = function(renderer) {
                return _renderChildren(this.children, renderer);
            };
            return FragmentNode;
        }();
        var node_TextNode = function() {
            function TextNode(text) {
                this.type = "text";
                this.text = void 0;
                this.text = text;
            }
            TextNode.prototype.render = function(renderer) {
                return renderer(this);
            };
            return TextNode;
        }();
        var node_ComponentNode = function() {
            function ComponentNode(component, props, children) {
                this.type = "component";
                this.component = void 0;
                this.props = void 0;
                this.children = void 0;
                this.component = component;
                this.props = props || {};
                this.children = children;
                this.props.children = children;
            }
            var _proto4 = ComponentNode.prototype;
            _proto4.renderComponent = function(renderer) {
                var child = function(child) {
                    var children = normalizeChildren(Array.isArray(child) ? child : [ child ]);
                    return 1 === children.length ? children[0] : children.length > 1 ? new node_FragmentNode(children) : void 0;
                }(this.component(this.props, this.children));
                if (child) return child.render(renderer);
            };
            _proto4.render = function(renderer) {
                return renderer(this);
            };
            _proto4.renderChildren = function(renderer) {
                return _renderChildren(this.children, renderer);
            };
            return ComponentNode;
        }();
        function normalizeChildren(children) {
            var result = [];
            for (var _i6 = 0; _i6 < children.length; _i6++) {
                var child = children[_i6];
                if (child) if ("string" == typeof child || "number" == typeof child) result.push(new node_TextNode(child.toString())); else {
                    if ("boolean" == typeof child) continue;
                    if (Array.isArray(child)) for (var _i8 = 0, _normalizeChildren2 = normalizeChildren(child); _i8 < _normalizeChildren2.length; _i8++) result.push(_normalizeChildren2[_i8]); else {
                        if (!child || "element" !== child.type && "text" !== child.type && "component" !== child.type) throw new TypeError("Unrecognized node type: " + typeof child);
                        result.push(child);
                    }
                }
            }
            return result;
        }
        var node_node = function(element, props) {
            for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
            children = normalizeChildren(children);
            if ("string" == typeof element) return new node_ElementNode(element, props, children);
            if ("function" == typeof element) return new node_ComponentNode(element, props, children);
            throw new TypeError("Expected jsx element to be a string or a function");
        };
        var _ADD_CHILDREN;
        var ADD_CHILDREN = ((_ADD_CHILDREN = {}).iframe = function(el, node) {
            var firstChild = node.children[0];
            if (1 !== node.children.length || !firstChild || "element" !== firstChild.type || "html" !== firstChild.name) throw new Error("Expected only single html element node as child of iframe element");
            el.addEventListener("load", (function() {
                var win = el.contentWindow;
                if (!win) throw new Error("Expected frame to have contentWindow");
                var doc = win.document;
                var docElement = doc.documentElement;
                for (;docElement.children && docElement.children.length; ) docElement.removeChild(docElement.children[0]);
                var child = firstChild.render(dom({
                    doc: doc
                }));
                for (;child.children.length; ) docElement.appendChild(child.children[0]);
            }));
        }, _ADD_CHILDREN.script = function(el, node) {
            var firstChild = node.children[0];
            if (1 !== node.children.length || !firstChild || "text" !== firstChild.type) throw new Error("Expected only single text node as child of script element");
            el.text = firstChild.text;
        }, _ADD_CHILDREN.default = function(el, node, renderer) {
            for (var _i6 = 0, _node$renderChildren2 = node.renderChildren(renderer); _i6 < _node$renderChildren2.length; _i6++) el.appendChild(_node$renderChildren2[_i6]);
        }, _ADD_CHILDREN);
        function dom(opts) {
            void 0 === opts && (opts = {});
            var _opts$doc = opts.doc, doc = void 0 === _opts$doc ? document : _opts$doc;
            return function domRenderer(node) {
                if ("component" === node.type) return node.renderComponent(domRenderer);
                if ("text" === node.type) return function(doc, node) {
                    return doc.createTextNode(node.text);
                }(doc, node);
                if ("element" === node.type) {
                    var el = function(doc, node) {
                        return node.props.el ? node.props.el : doc.createElement(node.name);
                    }(doc, node);
                    !function(el, node) {
                        var props = node.props;
                        for (var _i4 = 0, _Object$keys2 = Object.keys(props); _i4 < _Object$keys2.length; _i4++) {
                            var prop = _Object$keys2[_i4];
                            var val = props[prop];
                            null != val && "el" !== prop && "innerHTML" !== prop && (prop.match(/^on[A-Z][a-z]/) && "function" == typeof val ? el.addEventListener(prop.slice(2).toLowerCase(), val) : "string" == typeof val || "number" == typeof val ? el.setAttribute(prop, val.toString()) : "boolean" == typeof val && !0 === val && el.setAttribute(prop, ""));
                        }
                        "iframe" !== el.tagName.toLowerCase() || props.id || el.setAttribute("id", "jsx-iframe-" + "xxxxxxxxxx".replace(/./g, (function() {
                            return "0123456789abcdef".charAt(Math.floor(Math.random() * "0123456789abcdef".length));
                        })));
                    }(el, node);
                    !function(el, node, doc, renderer) {
                        if (node.props.hasOwnProperty("innerHTML")) {
                            if (node.children.length) throw new Error("Expected no children to be passed when innerHTML prop is set");
                            var html = node.props.innerHTML;
                            if ("string" != typeof html) throw new TypeError("innerHTML prop must be string");
                            if ("script" === node.name) el.text = html; else {
                                el.innerHTML = html;
                                !function(el, doc) {
                                    void 0 === doc && (doc = window.document);
                                    for (var _i2 = 0, _el$querySelectorAll2 = el.querySelectorAll("script"); _i2 < _el$querySelectorAll2.length; _i2++) {
                                        var script = _el$querySelectorAll2[_i2];
                                        var parentNode = script.parentNode;
                                        if (parentNode) {
                                            var newScript = doc.createElement("script");
                                            newScript.text = script.textContent;
                                            parentNode.replaceChild(newScript, script);
                                        }
                                    }
                                }(el, doc);
                            }
                        } else (ADD_CHILDREN[node.name] || ADD_CHILDREN.default)(el, node, renderer);
                    }(el, node, doc, domRenderer);
                    return el;
                }
                throw new TypeError("Unhandleable node");
            };
        }
        function SpinnerPage(_ref, children) {
            var nonce = _ref.nonce;
            return node_node("html", null, node_node("head", null, node_node("title", null, "PayPal"), node_node("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            })), node_node("body", null, node_node("div", {
                class: "preloader spinner"
            }, node_node("style", {
                nonce: nonce,
                innerHTML: "\n\n    body {\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        position: fixed;\n        top: 0;\n        left: 0;\n        margin: 0;\n    }\n\n    .spinner {\n        height: 100%;\n        width: 100%;\n        position: absolute;\n        z-index: 10\n    }\n\n    .spinner .spinWrap {\n        width: 200px;\n        height: 100px;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin-left: -100px;\n        margin-top: -50px\n    }\n\n    .spinner .loader,\n    .spinner .spinnerImage {\n        height: 100px;\n        width: 100px;\n        position: absolute;\n        top: 0;\n        left: 50%;\n        opacity: 1;\n        filter: alpha(opacity=100)\n    }\n\n    .spinner .spinnerImage {\n        margin: 28px 0 0 -25px;\n        background: url(https://www.paypalobjects.com/images/checkout/hermes/icon_ot_spin_lock_skinny.png) no-repeat\n    }\n\n    .spinner .loader {\n        margin: 0 0 0 -55px;\n        background-color: transparent;\n        animation: rotation .7s infinite linear;\n        border-left: 5px solid #cbcbca;\n        border-right: 5px solid #cbcbca;\n        border-bottom: 5px solid #cbcbca;\n        border-top: 5px solid #2380be;\n        border-radius: 100%\n    }\n\n    @keyframes rotation {\n        from {\n            transform: rotate(0deg)\n        }\n        to {\n            transform: rotate(359deg)\n        }\n    }\n"
            }), node_node("div", {
                class: "spinWrap"
            }, node_node("p", {
                class: "spinnerImage"
            }), node_node("p", {
                class: "loader"
            }))), children));
        }
        var checkoutOpen = !1;
        var canRenderTop = !1;
        var checkout = {
            name: "checkout",
            setup: function(_ref) {
                var Checkout = _ref.components.Checkout;
                checkoutOpen = !1;
                var _ref2 = [ utils_getParent(window), getTop(window) ], parent = _ref2[0], top = _ref2[1];
                var tasks = {};
                top && parent && parent !== top && (tasks.canRenderTo = Checkout.canRenderTo(top).then((function(result) {
                    canRenderTop = result;
                })));
                return promise_ZalgoPromise.hash(tasks).then(src_util_noop);
            },
            isEligible: function() {
                return !0;
            },
            isPaymentEligible: function() {
                return !0;
            },
            init: function initCheckout(_ref8) {
                var props = _ref8.props, components = _ref8.components, serviceData = _ref8.serviceData, payment = _ref8.payment, config = _ref8.config;
                if (checkoutOpen) throw new Error("Checkout already rendered");
                var Checkout = components.Checkout;
                var sessionID = props.sessionID, buttonSessionID = props.buttonSessionID, _createOrder = props.createOrder, _onApprove = props.onApprove, _onCancel = props.onCancel, onShippingChange = props.onShippingChange, locale = props.locale, commit = props.commit, onError = props.onError, vault = props.vault, clientAccessToken = props.clientAccessToken, createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription, onClick = props.onClick, amount = props.amount, clientID = props.clientID, connect = props.connect, cmid = props.clientMetadataID, _onAuth = props.onAuth, userIDToken = props.userIDToken, env = props.env, currency = props.currency, intent = props.intent, disableFunding = props.disableFunding, disableCard = props.disableCard, enableFunding = props.enableFunding, standaloneFundingSource = props.standaloneFundingSource;
                var button = payment.button, win = payment.win, fundingSource = payment.fundingSource, card = payment.card, _payment$buyerAccessT = payment.buyerAccessToken, buyerAccessToken = void 0 === _payment$buyerAccessT ? serviceData.buyerAccessToken : _payment$buyerAccessT, venmoPayloadID = payment.venmoPayloadID, buyerIntent = payment.buyerIntent;
                var fundingEligibility = serviceData.fundingEligibility, buyerCountry = serviceData.buyerCountry, sdkMeta = serviceData.sdkMeta, merchantID = serviceData.merchantID;
                var cspNonce = config.cspNonce;
                var context = (_ref7 = {
                    win: win,
                    isClick: payment.isClick
                }).win || _ref7.isClick && supportsPopups() ? "popup" : "iframe";
                var _ref7;
                var connectEligible = function(_ref3) {
                    var fundingSource = _ref3.fundingSource;
                    return !(!_ref3.connect || _ref3.vault || "paypal" !== fundingSource && "credit" !== fundingSource || _ref3.createBillingAgreement || _ref3.createSubscription);
                }({
                    connect: connect,
                    createBillingAgreement: createBillingAgreement,
                    createSubscription: createSubscription,
                    vault: vault,
                    fundingSource: fundingSource
                });
                var approved = !1;
                var forceClosed = !1;
                var instance;
                var close = function() {
                    checkoutOpen = !1;
                    return promise_ZalgoPromise.try((function() {
                        if (instance) {
                            forceClosed = !0;
                            return instance.close();
                        }
                    }));
                };
                var start = memoize((function() {
                    return (instance = Checkout({
                        window: win,
                        sessionID: sessionID,
                        buttonSessionID: buttonSessionID,
                        clientAccessToken: clientAccessToken,
                        venmoPayloadID: venmoPayloadID,
                        createAuthCode: function() {
                            return promise_ZalgoPromise.try((function() {
                                var fundingSkipLogin = FUNDING_SKIP_LOGIN[fundingSource];
                                return payment.createAccessToken ? payment.createAccessToken() : buyerAccessToken || (clientID && userIDToken && fundingSkipLogin ? getSmartWallet({
                                    clientID: clientID,
                                    merchantID: merchantID,
                                    currency: currency,
                                    amount: amount,
                                    clientMetadataID: cmid || sessionID,
                                    userIDToken: userIDToken,
                                    env: env,
                                    cspNonce: cspNonce
                                }).then((function(wallet) {
                                    var walletInstruments = wallet[fundingSkipLogin] && wallet[fundingSkipLogin].instruments;
                                    if (walletInstruments) for (var _i2 = 0; _i2 < walletInstruments.length; _i2++) {
                                        var instrument = walletInstruments[_i2];
                                        if (instrument.accessToken) return instrument.accessToken;
                                    }
                                })) : void 0);
                            })).then((function(accessToken) {
                                if (accessToken && ("pay" === buyerIntent || "pay_with_different_funding_shipping" === buyerIntent)) return function(buyerAccessToken) {
                                    return callGraphQL({
                                        name: "ExchangeAuthCode",
                                        query: "\n            query ExchangeAuthCode(\n                $buyerAccessToken: String!\n            ) {\n                auth(\n                    accessToken: $buyerAccessToken\n                ) {\n                    authCode\n                }\n            }\n        ",
                                        variables: {
                                            buyerAccessToken: buyerAccessToken
                                        }
                                    }).then((function(_ref4) {
                                        return _ref4.auth.authCode;
                                    }));
                                }(accessToken);
                            })).catch((function(err) {
                                logger_getLogger().warn("exchange_access_token_auth_code_error", {
                                    err: stringifyError(err)
                                });
                            }));
                        },
                        getConnectURL: connect && connectEligible ? function(_ref9) {
                            var payerID = _ref9.payerID;
                            if (!clientID) throw new Error("Expected clientID");
                            return _createOrder().then((function(orderID) {
                                return (_ref5 = {
                                    orderID: orderID,
                                    payerID: payerID,
                                    clientID: clientID,
                                    fundingSource: fundingSource,
                                    connect: connect
                                }, callGraphQL({
                                    name: "GetConnectURL",
                                    query: "\n            query GetConnectURL(\n                $clientID: String!\n                $orderID: String!\n                $scopes: [String]!\n                $fundingSource: String\n                $payerID: String\n            ) {\n                auth(\n                    clientId: $clientID\n                ) {\n                    connectUrl(\n                        token: $orderID\n                        scopes: $scopes\n                        fundingSource: $fundingSource\n                        payerId: $payerID\n                    ) {\n                        href\n                    }\n                }\n            }\n        ",
                                    variables: {
                                        clientID: _ref5.clientID,
                                        orderID: _ref5.orderID,
                                        payerID: _ref5.payerID,
                                        scopes: _ref5.connect.scopes,
                                        fundingSource: _ref5.fundingSource
                                    }
                                }).then((function(_ref6) {
                                    return _ref6.auth.connectUrl.href;
                                }))).then((function(connectURL) {
                                    var _getLogger$info$track;
                                    logger_getLogger().info("connect_redirect", {
                                        connectURL: connectURL
                                    }).track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_connect_redirect", 
                                    _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                                    _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                                    return extendUrl(connectURL, {
                                        query: {
                                            sdkMeta: sdkMeta
                                        }
                                    });
                                })).catch((function(err) {
                                    logger_getLogger().error("connect_redirect_error", {
                                        err: stringifyError(err)
                                    });
                                    throw err;
                                }));
                                var _ref5;
                            }));
                        } : null,
                        createOrder: function() {
                            return _createOrder().then((function(orderID) {
                                return promise_ZalgoPromise.try((function() {
                                    if (clientID && "pay" === buyerIntent) return function(_ref6) {
                                        var orderID = _ref6.orderID, vault = _ref6.vault, clientAccessToken = _ref6.clientAccessToken, createBillingAgreement = _ref6.createBillingAgreement, createSubscription = _ref6.createSubscription, fundingSource = _ref6.fundingSource, clientID = _ref6.clientID, merchantID = _ref6.merchantID, buyerCountry = _ref6.buyerCountry, currency = _ref6.currency, commit = _ref6.commit, intent = _ref6.intent, disableFunding = _ref6.disableFunding, disableCard = _ref6.disableCard;
                                        return promise_ZalgoPromise.try((function() {
                                            return function(_ref5) {
                                                var vault = _ref5.vault, clientAccessToken = _ref5.clientAccessToken, createBillingAgreement = _ref5.createBillingAgreement, createSubscription = _ref5.createSubscription, fundingSource = _ref5.fundingSource, clientID = _ref5.clientID, merchantID = _ref5.merchantID, buyerCountry = _ref5.buyerCountry, currency = _ref5.currency, commit = _ref5.commit, intent = _ref5.intent, disableFunding = _ref5.disableFunding, disableCard = _ref5.disableCard;
                                                return promise_ZalgoPromise.try((function() {
                                                    return !!clientAccessToken && !createBillingAgreement && !createSubscription && (!!vault || function(_ref4) {
                                                        var accessToken = _ref4.accessToken, fundingSource = _ref4.fundingSource, clientID = _ref4.clientID, merchantID = _ref4.merchantID, buyerCountry = _ref4.buyerCountry, currency = _ref4.currency, commit = _ref4.commit, vault = _ref4.vault, intent = _ref4.intent, disableFunding = _ref4.disableFunding, disableCard = _ref4.disableCard;
                                                        return promise_ZalgoPromise.try((function() {
                                                            return "paypal" === fundingSource && function(query, _ref) {
                                                                var _headers;
                                                                var accessToken = _ref.accessToken, intent = _ref.intent, disableFunding = _ref.disableFunding, disableCard = _ref.disableCard;
                                                                return callGraphQL({
                                                                    name: "GetFundingEligibility",
                                                                    query: "\n            query GetFundingEligibility(\n                $clientID:String,\n                $merchantID:[ String ],\n                $buyerCountry:CountryCodes,\n                $currency:SupportedCountryCurrencies,\n                $intent:FundingEligibilityIntent,\n                $commit:Boolean,\n                $vault:Boolean,\n                $disableFunding:[ SupportedPaymentMethodsType ],\n                $disableCard:[ SupportedCardsType ]\n            ) {\n            fundingEligibility(\n                clientId: $clientID,\n                buyerCountry: $buyerCountry,\n                currency: $currency,\n                intent: $intent,\n                commit: $commit,\n                vault: $vault,\n                disableFunding: $disableFunding,\n                disableCard: $disableCard,\n                merchantId: $merchantID\n            ) {\n                " + query + "\n            }\n          }\n        ",
                                                                    variables: {
                                                                        clientID: _ref.clientID,
                                                                        merchantID: _ref.merchantID,
                                                                        buyerCountry: _ref.buyerCountry,
                                                                        currency: _ref.currency,
                                                                        commit: _ref.commit,
                                                                        vault: _ref.vault,
                                                                        intent: intent ? intent.toUpperCase() : intent,
                                                                        disableFunding: disableFunding ? disableFunding.map((function(f) {
                                                                            return f && f.toUpperCase();
                                                                        })) : disableFunding,
                                                                        disableCard: disableCard ? disableCard.map((function(f) {
                                                                            return f && f.toUpperCase();
                                                                        })) : disableCard
                                                                    },
                                                                    headers: (_headers = {}, _headers["x-paypal-internal-euat"] = accessToken || "", 
                                                                    _headers)
                                                                }).then((function(gqlResult) {
                                                                    if (!gqlResult || !gqlResult.fundingEligibility) throw new Error("GraphQL fundingEligibility returned no fundingEligibility object");
                                                                    return gqlResult && gqlResult.fundingEligibility;
                                                                }));
                                                            }("\n                " + fundingSource + " {\n                    vaultable\n                }\n            ", {
                                                                accessToken: accessToken,
                                                                clientID: clientID,
                                                                merchantID: merchantID,
                                                                buyerCountry: buyerCountry,
                                                                currency: currency,
                                                                commit: commit,
                                                                vault: vault,
                                                                intent: intent,
                                                                disableFunding: disableFunding,
                                                                disableCard: disableCard
                                                            }).then((function(newFundingEligibility) {
                                                                return !(!newFundingEligibility[fundingSource] || !newFundingEligibility[fundingSource].vaultable);
                                                            }));
                                                        }));
                                                    }({
                                                        accessToken: clientAccessToken,
                                                        fundingSource: fundingSource,
                                                        clientID: clientID,
                                                        merchantID: merchantID,
                                                        buyerCountry: buyerCountry,
                                                        currency: currency,
                                                        commit: commit,
                                                        vault: vault,
                                                        intent: intent,
                                                        disableFunding: disableFunding,
                                                        disableCard: disableCard
                                                    }).catch((function(err) {
                                                        logger_getLogger().warn("funding_vaultable_error", {
                                                            err: stringifyError(err)
                                                        });
                                                        return !1;
                                                    })));
                                                }));
                                            }({
                                                vault: vault,
                                                clientAccessToken: clientAccessToken,
                                                createBillingAgreement: createBillingAgreement,
                                                createSubscription: createSubscription,
                                                fundingSource: fundingSource,
                                                clientID: clientID,
                                                merchantID: merchantID,
                                                buyerCountry: buyerCountry,
                                                currency: currency,
                                                commit: commit,
                                                intent: intent,
                                                disableFunding: disableFunding,
                                                disableCard: disableCard
                                            });
                                        })).then((function(eligible) {
                                            if (eligible && clientAccessToken) return function(_ref7) {
                                                var _headers11;
                                                var orderID = _ref7.orderID;
                                                return callGraphQL({
                                                    name: "EnableVault",
                                                    query: "\n            mutation EnableVault(\n                $orderID : String!\n            ) {\n                enableVault(\n                    token: $orderID\n                )\n            }\n        ",
                                                    variables: {
                                                        orderID: orderID
                                                    },
                                                    headers: (_headers11 = {}, _headers11["x-paypal-internal-euat"] = _ref7.clientAccessToken, 
                                                    _headers11["paypal-client-context"] = orderID, _headers11)
                                                });
                                            }({
                                                orderID: orderID,
                                                clientAccessToken: clientAccessToken
                                            }).catch((function(err) {
                                                if (vault) throw err;
                                            }));
                                        }));
                                    }({
                                        orderID: orderID,
                                        vault: vault,
                                        clientAccessToken: clientAccessToken,
                                        fundingEligibility: fundingEligibility,
                                        fundingSource: fundingSource,
                                        createBillingAgreement: createBillingAgreement,
                                        createSubscription: createSubscription,
                                        clientID: clientID,
                                        merchantID: merchantID,
                                        buyerCountry: buyerCountry,
                                        currency: currency,
                                        commit: commit,
                                        intent: intent,
                                        disableFunding: disableFunding,
                                        disableCard: disableCard
                                    });
                                })).then((function() {
                                    return orderID;
                                }));
                            }));
                        },
                        onApprove: function(_ref10) {
                            var payerID = _ref10.payerID, paymentID = _ref10.paymentID, billingToken = _ref10.billingToken, subscriptionID = _ref10.subscriptionID, authCode = _ref10.authCode;
                            approved = !0;
                            logger_getLogger().info("spb_onapprove_access_token_" + (buyerAccessToken ? "present" : "not_present")).flush();
                            return close().then((function() {
                                return _onApprove({
                                    payerID: payerID,
                                    paymentID: paymentID,
                                    billingToken: billingToken,
                                    subscriptionID: subscriptionID,
                                    buyerAccessToken: buyerAccessToken,
                                    authCode: authCode
                                }, {
                                    restart: restart
                                }).catch(src_util_noop);
                            }));
                        },
                        onAuth: function(_ref11) {
                            return _onAuth({
                                accessToken: _ref11.accessToken || buyerAccessToken
                            }).then((function(token) {
                                buyerAccessToken = token;
                            }));
                        },
                        onCancel: function() {
                            return close().then((function() {
                                return _onCancel();
                            }));
                        },
                        onShippingChange: onShippingChange ? function(data, actions) {
                            return onShippingChange(_extends({
                                buyerAccessToken: buyerAccessToken
                            }, data), actions);
                        } : null,
                        onClose: function() {
                            checkoutOpen = !1;
                            if (!forceClosed && !approved) return _onCancel();
                        },
                        onError: onError,
                        fundingSource: fundingSource,
                        card: card,
                        buyerCountry: buyerCountry,
                        locale: locale,
                        commit: commit,
                        cspNonce: cspNonce,
                        clientMetadataID: cmid,
                        enableFunding: enableFunding,
                        standaloneFundingSource: standaloneFundingSource
                    })).renderTo((top = getTop(window), canRenderTop && top ? top : utils_getParent() ? utils_getParent() : window), "body", context).catch((function(err) {
                        if (checkoutOpen) throw err;
                    }));
                    var top;
                }));
                var restart = memoize((function() {
                    return initCheckout({
                        props: props,
                        components: components,
                        serviceData: serviceData,
                        config: config,
                        payment: {
                            button: button,
                            fundingSource: fundingSource,
                            card: card,
                            buyerIntent: buyerIntent,
                            isClick: !1
                        }
                    }).start().finally(unresolvedPromise);
                }));
                return {
                    click: function() {
                        if (!win && supportsPopups()) try {
                            win = function(_ref) {
                                var win = function(win) {
                                    if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
                                    return win;
                                }(function(url, options) {
                                    var width = (options = options || {}).width, height = options.height;
                                    var top = 0;
                                    var left = 0;
                                    width && (window.outerWidth ? left = Math.round((window.outerWidth - width) / 2) + window.screenX : window.screen.width && (left = Math.round((window.screen.width - width) / 2)));
                                    height && (window.outerHeight ? top = Math.round((window.outerHeight - height) / 2) + window.screenY : window.screen.height && (top = Math.round((window.screen.height - height) / 2)));
                                    width && height && (options = _extends({
                                        top: top,
                                        left: left,
                                        width: width,
                                        height: height,
                                        status: 1,
                                        toolbar: 0,
                                        menubar: 0,
                                        resizable: 1,
                                        scrollbars: 1
                                    }, options));
                                    var name = options.name || "";
                                    delete options.name;
                                    var params = Object.keys(options).map((function(key) {
                                        if (null != options[key]) return key + "=" + ("string" == typeof (item = options[key]) ? item : item && item.toString && "function" == typeof item.toString ? item.toString() : {}.toString.call(item));
                                        var item;
                                    })).filter(Boolean).join(",");
                                    var win;
                                    try {
                                        win = window.open("", name, params, !0);
                                    } catch (err) {
                                        throw new dom_PopupOpenError("Can not open popup window - " + (err.stack || err.message));
                                    }
                                    if (isWindowClosed(win)) {
                                        var err;
                                        throw new dom_PopupOpenError("Can not open popup window - blocked");
                                    }
                                    window.addEventListener("unload", (function() {
                                        return win.close();
                                    }));
                                    return win;
                                }(0, {
                                    width: _ref.width,
                                    height: _ref.height
                                }));
                                var doc = win.document;
                                !function(win, el) {
                                    var tag = el.tagName.toLowerCase();
                                    if ("html" !== tag) throw new Error("Expected element to be html, got " + tag);
                                    var documentElement = win.document.documentElement;
                                    for (var _i6 = 0, _arrayFrom2 = arrayFrom(documentElement.children); _i6 < _arrayFrom2.length; _i6++) documentElement.removeChild(_arrayFrom2[_i6]);
                                    for (var _i8 = 0, _arrayFrom4 = arrayFrom(el.children); _i8 < _arrayFrom4.length; _i8++) documentElement.appendChild(_arrayFrom4[_i8]);
                                }(win, node_node(SpinnerPage, {
                                    nonce: getNonce()
                                }).render(dom({
                                    doc: doc
                                })));
                                return win;
                            }({
                                width: 500,
                                height: 590
                            });
                        } catch (err) {
                            logger_getLogger().warn("popup_open_error_iframe_fallback", {
                                err: stringifyError(err)
                            });
                            if (!(err instanceof dom_PopupOpenError)) throw err;
                            context = "iframe";
                        }
                        if (onClick) return promise_ZalgoPromise.try((function() {
                            return !onClick || onClick({
                                fundingSource: fundingSource
                            });
                        })).then((function(valid) {
                            win && !valid && win.close();
                        }));
                        start();
                    },
                    start: start,
                    close: close
                };
            },
            updateFlowClientConfig: function(_ref12) {
                var orderID = _ref12.orderID, payment = _ref12.payment;
                return promise_ZalgoPromise.try((function() {
                    var buyerIntent = payment.buyerIntent;
                    var updateClientConfigPromise = updateButtonClientConfig({
                        fundingSource: payment.fundingSource,
                        orderID: orderID,
                        inline: !1
                    });
                    if ("pay_with_different_funding_shipping" === buyerIntent) return updateClientConfigPromise;
                }));
            }
        };
        var cardFieldsOpen = !1;
        function highlightCard(card) {
            card && querySelectorAll("[data-card]").forEach((function(el) {
                el.style.opacity = el.getAttribute("data-card") === card ? "1" : "0.1";
            }));
        }
        var card_fields_getElements = function() {
            var buttonsContainer = document.querySelector("#buttons-container");
            var cardButtonsContainer = document.querySelector('[data-funding-source="card"]');
            var cardFieldsContainer = document.querySelector("#card-fields-container");
            if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) throw new Error("Did not find card fields elements");
            return {
                buttonsContainer: buttonsContainer,
                cardButtonsContainer: cardButtonsContainer,
                cardFieldsContainer: cardFieldsContainer
            };
        };
        var resizeListener;
        var cardFields = {
            name: "card_fields",
            setup: function() {},
            isEligible: function(_ref) {
                var props = _ref.props;
                return !props.vault && !props.onShippingChange && _ref.serviceData.eligibility.cardFields;
            },
            isPaymentEligible: function(_ref2) {
                var _ref3 = _ref2.payment || {}, fundingSource = _ref3.fundingSource;
                return !(_ref3.win || fundingSource && "card" !== fundingSource);
            },
            init: function(_ref4) {
                var props = _ref4.props, components = _ref4.components, payment = _ref4.payment, serviceData = _ref4.serviceData, config = _ref4.config;
                var createOrder = props.createOrder, _onApprove = props.onApprove, _onCancel = props.onCancel, locale = props.locale, commit = props.commit, onError = props.onError, sessionID = props.sessionID, buttonSessionID = props.buttonSessionID, _onAuth = props.onAuth;
                var CardFields = components.CardFields;
                var fundingSource = payment.fundingSource, card = payment.card;
                var cspNonce = config.cspNonce;
                var buyerCountry = serviceData.buyerCountry;
                if (cardFieldsOpen) {
                    highlightCard(card);
                    return {
                        start: promiseNoop,
                        close: promiseNoop
                    };
                }
                var restart = memoize((function() {
                    return checkout.init({
                        props: props,
                        components: components,
                        payment: _extends({}, payment, {
                            isClick: !1
                        }),
                        serviceData: serviceData,
                        config: config
                    }).start().finally(unresolvedPromise);
                }));
                var buyerAccessToken;
                var _CardFields = CardFields({
                    createOrder: createOrder,
                    fundingSource: fundingSource,
                    card: card,
                    onApprove: function(_ref6) {
                        var payerID = _ref6.payerID, paymentID = _ref6.paymentID, billingToken = _ref6.billingToken;
                        return close().then((function() {
                            return _onApprove({
                                payerID: payerID,
                                paymentID: paymentID,
                                billingToken: billingToken,
                                buyerAccessToken: buyerAccessToken
                            }, {
                                restart: restart
                            }).catch(src_util_noop);
                        }));
                    },
                    onAuth: function(_ref7) {
                        return _onAuth({
                            accessToken: _ref7.accessToken || buyerAccessToken
                        }).then((function(token) {
                            buyerAccessToken = token;
                        }));
                    },
                    onCancel: function() {
                        return close().then((function() {
                            return _onCancel();
                        }));
                    },
                    onError: onError,
                    onClose: function() {
                        cardFieldsOpen = !1;
                    },
                    onCardTypeChange: function(_ref5) {
                        highlightCard(_ref5.card);
                    },
                    sessionID: sessionID,
                    buttonSessionID: buttonSessionID,
                    buyerCountry: buyerCountry,
                    locale: locale,
                    commit: commit,
                    cspNonce: cspNonce
                }), render = _CardFields.render, closeCardFields = _CardFields.close;
                var close = function() {
                    !function() {
                        var buttonsContainer = card_fields_getElements().buttonsContainer;
                        querySelectorAll("[data-card]").forEach((function(el) {
                            el.style.opacity = "1";
                        }));
                        window.removeEventListener("resize", resizeListener);
                        buttonsContainer.style.removeProperty("transition-duration");
                        buttonsContainer.style.removeProperty("margin-top");
                    }();
                    return closeCardFields().then((function() {
                        cardFieldsOpen = !1;
                    }));
                };
                return {
                    start: function() {
                        cardFieldsOpen = !0;
                        var renderPromise = render("#card-fields-container");
                        !function() {
                            var _getElements = card_fields_getElements(), buttonsContainer = _getElements.buttonsContainer, cardButtonsContainer = _getElements.cardButtonsContainer, cardFieldsContainer = _getElements.cardFieldsContainer;
                            if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) throw new Error("Required elements not found");
                            cardFieldsContainer.style.minHeight = "0px";
                            cardFieldsContainer.style.display = "block";
                            var recalculateMargin = function() {
                                buttonsContainer.style.marginTop = buttonsContainer.offsetTop - cardButtonsContainer.offsetTop + "px";
                            };
                            resizeListener = function(method, time) {
                                void 0 === time && (time = 100);
                                var timeout;
                                return setFunctionName((function() {
                                    var _arguments3 = arguments, _this3 = this;
                                    clearTimeout(timeout);
                                    timeout = setTimeout((function() {
                                        return method.apply(_this3, _arguments3);
                                    }), time);
                                }), getFunctionName(method) + "::debounced");
                            }((function() {
                                buttonsContainer.style.transitionDuration = "0s";
                                recalculateMargin();
                            }));
                            window.addEventListener("resize", resizeListener);
                            recalculateMargin();
                        }();
                        highlightCard(card);
                        return renderPromise;
                    },
                    close: close
                };
            },
            inline: !0
        };
        function lib_logger_getLogger() {
            return inlineMemoize(lib_logger_getLogger, (function() {
                return Logger({
                    url: "/xoplatform/logger/api/logger"
                });
            }));
        }
        var POPUP_OPTIONS = {
            width: 500,
            height: 590
        };
        var vaultCapture = {
            name: "vault_capture",
            setup: function() {},
            isEligible: function(_ref) {
                return !_ref.props.onShippingChange;
            },
            isPaymentEligible: function(_ref2) {
                var payment = _ref2.payment;
                return !(payment.win || !payment.paymentMethodID || window.innerWidth < 250 && "paypal" === payment.fundingSource);
            },
            init: function(_ref6) {
                var props = _ref6.props, components = _ref6.components, payment = _ref6.payment, serviceData = _ref6.serviceData, config = _ref6.config;
                var createOrder = props.createOrder, onApprove = props.onApprove, enableThreeDomainSecure = props.enableThreeDomainSecure, partnerAttributionID = props.partnerAttributionID, getParent = props.getParent, clientID = props.clientID;
                var ThreeDomainSecure = components.ThreeDomainSecure, Installments = components.Installments;
                var fundingSource = payment.fundingSource, paymentMethodID = payment.paymentMethodID, button = payment.button;
                var buyerCountry = serviceData.buyerCountry;
                var clientMetadataID = props.clientMetadataID || props.sessionID;
                var accessToken = props.userIDToken ? serviceData.facilitatorAccessToken : props.clientAccessToken;
                if (!paymentMethodID) throw new Error("Payment method id required for vault capture");
                if (!accessToken) throw new Error("Client access token required for vault capture");
                var restart = function() {
                    return promise_ZalgoPromise.try((function() {
                        throw new Error("Vault capture restart not implemented");
                    }));
                };
                var shippingRequired = function(orderID) {
                    return getSupplementalOrderInfo(orderID).then((function(order) {
                        return !!order.checkoutSession.flags.isChangeShippingAddressAllowed;
                    }));
                };
                var startPaymentFlow = function(orderID, installmentPlan) {
                    return promise_ZalgoPromise.hash({
                        validate: validatePaymentMethod({
                            accessToken: accessToken,
                            orderID: orderID,
                            paymentMethodID: paymentMethodID,
                            enableThreeDomainSecure: enableThreeDomainSecure,
                            clientMetadataID: clientMetadataID,
                            partnerAttributionID: partnerAttributionID,
                            installmentPlan: installmentPlan
                        }),
                        requireShipping: shippingRequired(orderID)
                    }).then((function(_ref7) {
                        var validate = _ref7.validate;
                        if (_ref7.requireShipping) {
                            if ("paypal" !== fundingSource) throw new Error("Shipping address requested for " + fundingSource + " payment");
                            return function() {
                                logger_getLogger().info("web_checkout_fallback").flush();
                                return checkout.init({
                                    props: props,
                                    components: components,
                                    serviceData: serviceData,
                                    payment: _extends({}, payment, {
                                        isClick: !1,
                                        buyerIntent: "pay_with_different_funding_shipping"
                                    }),
                                    config: config
                                }).start();
                            }();
                        }
                        return function(_ref5) {
                            var ThreeDomainSecure = _ref5.ThreeDomainSecure, status = _ref5.status, body = _ref5.body, createOrder = _ref5.createOrder, getParent = _ref5.getParent;
                            return promise_ZalgoPromise.try((function() {
                                if (422 === status && body.links && body.links.some((function(link) {
                                    return "3ds-contingency-resolution" === link.rel;
                                }))) return function(_ref4) {
                                    var ThreeDomainSecure = _ref4.ThreeDomainSecure, createOrder = _ref4.createOrder, getParent = _ref4.getParent;
                                    var promise = new promise_ZalgoPromise;
                                    var instance = ThreeDomainSecure({
                                        createOrder: createOrder,
                                        onSuccess: function() {
                                            return promise.resolve();
                                        },
                                        onCancel: function() {
                                            return promise.reject(new Error("3DS cancelled"));
                                        },
                                        onError: function(err) {
                                            return promise.reject(err);
                                        }
                                    });
                                    return instance.renderTo(getParent(), "body").then((function() {
                                        return promise;
                                    })).finally(instance.close);
                                }({
                                    ThreeDomainSecure: ThreeDomainSecure,
                                    createOrder: createOrder,
                                    getParent: getParent
                                });
                                if (200 !== status) throw new Error("Validate payment failed with status: " + status);
                            }));
                        }({
                            ThreeDomainSecure: ThreeDomainSecure,
                            status: validate.status,
                            body: validate.body,
                            createOrder: createOrder,
                            getParent: getParent
                        }).then((function() {
                            return onApprove({}, {
                                restart: restart
                            });
                        }));
                    }));
                };
                return {
                    start: function() {
                        return createOrder().then((function(orderID) {
                            var _getLogger$info$track;
                            var installmentsEligible = (fundingEligibility = (_ref3 = {
                                props: props,
                                serviceData: serviceData
                            }).serviceData.fundingEligibility, !!(_ref3.props.enableVaultInstallments && fundingEligibility.card && fundingEligibility.card.installments));
                            var _ref3, fundingEligibility;
                            logger_getLogger().info(installmentsEligible ? "vault_merchant_installments_eligible" : "vault_merchant_installments_ineligible").track((_getLogger$info$track = {}, 
                            _getLogger$info$track.transition_name = installmentsEligible ? "installments_eligible" : "installments_ineligible", 
                            _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                            _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                            return clientID && installmentsEligible ? getSupplementalOrderInfo(orderID).then((function(order) {
                                return function(_ref) {
                                    var clientID = _ref.clientID, Installments = _ref.Installments, button = _ref.button, orderID = _ref.orderID, cartAmount = _ref.cartAmount, _onPay = _ref.onPay, _ref$getLogger = _ref.getLogger, getLogger = void 0 === _ref$getLogger ? lib_logger_getLogger : _ref$getLogger;
                                    return function(_ref) {
                                        var _headers;
                                        return function(_ref) {
                                            var _ref$variables = _ref.variables, _ref$headers = _ref.headers;
                                            return request({
                                                url: "/graphql?" + _ref.name,
                                                method: "POST",
                                                json: {
                                                    query: _ref.query,
                                                    variables: void 0 === _ref$variables ? {} : _ref$variables
                                                },
                                                headers: _extends({
                                                    "x-app-name": "smart-payment-buttons"
                                                }, void 0 === _ref$headers ? {} : _ref$headers)
                                            }).then((function(_ref2) {
                                                var status = _ref2.status, body = _ref2.body;
                                                var errors = body.errors || [];
                                                if (errors.length) {
                                                    var message = errors[0].message || JSON.stringify(errors[0]);
                                                    throw new Error(message);
                                                }
                                                if (200 !== status) throw new Error("/graphql returned status " + status);
                                                return body.data;
                                            }));
                                        }({
                                            name: "getInstallmentsForVaultedToken",
                                            query: "\n            query getInstallmentsForVaultedToken(\n                $vaultedToken: String!\n                $token: String!\n            ) {\n                getInstallmentsForVaultedToken(\n                    vaultedToken: $vaultedToken\n                    token: $token\n                ) {\n                    discount {\n                        amount {\n                            currencyCode\n                            currencyFormatSymbolISOCurrency\n                            currencyValue\n                        }\n                        percentage\n                    }\n                    monthlyPayment {\n                        currencyCode\n                        currencyFormatSymbolISOCurrency\n                        currencyValue\n                    }\n                    totalCost {\n                        currencyCode\n                        currencyFormatSymbolISOCurrency\n                        currencyValue\n                    }\n                    term\n                    intervalDuration\n                }\n            }\n        ",
                                            variables: {
                                                vaultedToken: _ref.vaultedToken,
                                                token: _ref.token
                                            },
                                            headers: (_headers = {}, _headers["x-paypal-internal-euat"] = _ref.buyerAccessToken, 
                                            _headers)
                                        });
                                    }({
                                        vaultedToken: _ref.paymentMethodID,
                                        token: orderID,
                                        buyerAccessToken: _ref.accessToken
                                    }).then((function(installmentsResponse) {
                                        if (installmentsResponse && installmentsResponse.getInstallmentsForVaultedToken) {
                                            var _getLogger$info$track;
                                            var installmentsData = installmentsResponse.getInstallmentsForVaultedToken;
                                            getLogger().info("installments_loaded").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "installments_load", 
                                            _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                                            _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                                            if (installmentsData.length > 1 || installmentsData[0] && installmentsData[0].discount) {
                                                var _getLogger$info$track5;
                                                var options = installmentsData.map((function(info) {
                                                    return _extends({
                                                        term: info.term,
                                                        intervalDuration: info.intervalDuration
                                                    }, info.discount && {
                                                        percent: info.discount.percentage
                                                    }, {
                                                        amount: info.monthlyPayment.currencyFormatSymbolISOCurrency,
                                                        totalAmount: info.totalCost.currencyFormatSymbolISOCurrency,
                                                        onSelect: function(option) {
                                                            var _getLogger$info$track2;
                                                            getLogger().info("installment_option_selected_" + option.term + "x").track((_getLogger$info$track2 = {}, 
                                                            _getLogger$info$track2.transition_name = "installment_select", _getLogger$info$track2.context_type = "EC-Token", 
                                                            _getLogger$info$track2.token = orderID, _getLogger$info$track2.context_id = orderID, 
                                                            _getLogger$info$track2)).flush();
                                                        }
                                                    });
                                                }));
                                                var data = {
                                                    cartAmount: cartAmount,
                                                    onPay: function(selectedInstallment) {
                                                        var _getLogger$info$track3;
                                                        !function(button) {
                                                            button.classList.add("paypal-button-loading");
                                                        }(button);
                                                        getLogger().info("installments_pay_button_clicked_" + (selectedInstallment ? selectedInstallment.term : "") + "x").track((_getLogger$info$track3 = {}, 
                                                        _getLogger$info$track3.transition_name = "installments_pay", _getLogger$info$track3.context_type = "EC-Token", 
                                                        _getLogger$info$track3.token = orderID, _getLogger$info$track3.context_id = orderID, 
                                                        _getLogger$info$track3)).flush();
                                                        var installmentPlan = null;
                                                        selectedInstallment && (installmentPlan = {
                                                            term: selectedInstallment.term,
                                                            interval_duration: selectedInstallment.intervalDuration
                                                        });
                                                        return promise_ZalgoPromise.try((function() {
                                                            return _onPay(orderID, installmentPlan);
                                                        })).finally((function() {
                                                            !function(button) {
                                                                button.classList.remove("paypal-button-loading");
                                                            }(button);
                                                        }));
                                                    },
                                                    onClose: function() {
                                                        var _getLogger$info$track4;
                                                        getLogger().info("installments_modal_close").track((_getLogger$info$track4 = {}, 
                                                        _getLogger$info$track4.transition_name = "installments_close", _getLogger$info$track4.context_type = "EC-Token", 
                                                        _getLogger$info$track4.token = orderID, _getLogger$info$track4.context_id = orderID, 
                                                        _getLogger$info$track4)).flush();
                                                    },
                                                    options: options,
                                                    orderID: orderID
                                                };
                                                getLogger().info("initiate_installments_modal").track((_getLogger$info$track5 = {}, 
                                                _getLogger$info$track5.transition_name = "installments_load_modal", _getLogger$info$track5.context_type = "EC-Token", 
                                                _getLogger$info$track5.token = orderID, _getLogger$info$track5.context_id = orderID, 
                                                _getLogger$info$track5)).flush();
                                                return function(_ref) {
                                                    var clientID = _ref.clientID, Installments = _ref.Installments, data = _ref.data;
                                                    if (!clientID) throw new Error("Can not render installments without client id");
                                                    var _Installments = Installments({
                                                        clientID: clientID
                                                    }), renderTo = _Installments.renderTo, updateProps = _Installments.updateProps, show = _Installments.show, close = _Installments.close;
                                                    var render = memoize((function() {
                                                        return renderTo(window.xprops.getParent(), "#installments-modal");
                                                    }));
                                                    render();
                                                    return render().then((function() {
                                                        return updateProps({
                                                            clientID: clientID,
                                                            data: data,
                                                            close: close
                                                        });
                                                    })).then((function() {
                                                        return show();
                                                    }));
                                                }({
                                                    clientID: clientID,
                                                    Installments: Installments,
                                                    data: data
                                                });
                                            }
                                            return _onPay(orderID);
                                        }
                                        throw new Error("Installments fetch returns null");
                                    })).catch((function(err) {
                                        return promise_ZalgoPromise.try((function() {
                                            var _getLogger$error$trac;
                                            getLogger().error("installment_fetch_error", {
                                                err: stringifyError(err)
                                            }).track((_getLogger$error$trac = {}, _getLogger$error$trac.transition_name = "installments_error", 
                                            _getLogger$error$trac.context_type = "EC-Token", _getLogger$error$trac.token = orderID, 
                                            _getLogger$error$trac.context_id = orderID, _getLogger$error$trac.err = stringifyError(err), 
                                            _getLogger$error$trac)).flush();
                                            return _onPay(orderID);
                                        }));
                                    }));
                                }({
                                    clientID: clientID,
                                    Installments: Installments,
                                    paymentMethodID: paymentMethodID,
                                    button: button,
                                    buyerCountry: buyerCountry,
                                    orderID: orderID,
                                    accessToken: accessToken,
                                    cartAmount: order.checkoutSession.cart.amounts.total.currencyFormatSymbolISOCurrency,
                                    onPay: startPaymentFlow,
                                    getLogger: logger_getLogger
                                });
                            })) : startPaymentFlow(orderID);
                        }));
                    },
                    close: function() {
                        return promise_ZalgoPromise.resolve();
                    }
                };
            },
            setupMenu: function(_ref8) {
                var props = _ref8.props, payment = _ref8.payment, serviceData = _ref8.serviceData, components = _ref8.components, config = _ref8.config;
                var clientAccessToken = props.clientAccessToken, createOrder = props.createOrder, enableThreeDomainSecure = props.enableThreeDomainSecure, partnerAttributionID = props.partnerAttributionID, sessionID = props.sessionID, clientMetadataID = props.clientMetadataID, userIDToken = props.userIDToken;
                var fundingSource = payment.fundingSource, paymentMethodID = payment.paymentMethodID, button = payment.button;
                var content = serviceData.content, facilitatorAccessToken = serviceData.facilitatorAccessToken;
                if (!clientAccessToken || !paymentMethodID) throw new Error("Client access token and payment method id required");
                var updateMenuClientConfig = function() {
                    return promise_ZalgoPromise.try((function() {
                        return createOrder();
                    })).then((function(orderID) {
                        return updateButtonClientConfig({
                            fundingSource: fundingSource,
                            orderID: orderID,
                            inline: !1
                        });
                    }));
                };
                var loadCheckout = function(_ref9) {
                    return checkout.init({
                        props: props,
                        components: components,
                        serviceData: serviceData,
                        config: config,
                        payment: _ref9.payment
                    }).start();
                };
                if ("paypal" === fundingSource) return [ {
                    label: content.payWithDifferentMethod,
                    popup: POPUP_OPTIONS,
                    onSelect: function(_ref10) {
                        var _getLogger$info$track2;
                        var win = _ref10.win;
                        logger_getLogger().info("click_choose_funding").track((_getLogger$info$track2 = {}, 
                        _getLogger$info$track2.transition_name = "process_click_pay_with_different_payment_method", 
                        _getLogger$info$track2)).flush();
                        return promise_ZalgoPromise.try((function() {
                            return updateMenuClientConfig();
                        })).then((function() {
                            return accessToken = userIDToken ? facilitatorAccessToken : clientAccessToken, promise_ZalgoPromise.try((function() {
                                return createOrder();
                            })).then((function(orderID) {
                                return validatePaymentMethod({
                                    accessToken: accessToken,
                                    orderID: orderID,
                                    paymentMethodID: paymentMethodID,
                                    enableThreeDomainSecure: enableThreeDomainSecure,
                                    partnerAttributionID: partnerAttributionID,
                                    clientMetadataID: clientMetadataID || sessionID
                                });
                            }));
                            var accessToken;
                        })).then((function() {
                            return loadCheckout({
                                payment: _extends({}, payment, {
                                    win: win,
                                    buyerIntent: "pay_with_different_funding_shipping"
                                })
                            });
                        }));
                    }
                }, {
                    label: content.payWithDifferentAccount,
                    popup: POPUP_OPTIONS,
                    onSelect: function(_ref11) {
                        var _getLogger$info$track3;
                        var win = _ref11.win;
                        logger_getLogger().info("click_choose_account").track((_getLogger$info$track3 = {}, 
                        _getLogger$info$track3.transition_name = "process_click_pay_with_different_account", 
                        _getLogger$info$track3)).flush();
                        return promise_ZalgoPromise.try((function() {
                            return updateMenuClientConfig();
                        })).then((function() {
                            return loadCheckout({
                                payment: _extends({}, payment, {
                                    win: win,
                                    buyerIntent: "pay_with_different_account"
                                })
                            });
                        }));
                    }
                } ];
                if ("card" === fundingSource) return [ {
                    label: content.deleteVaultedCard,
                    spinner: !0,
                    onSelect: function() {
                        var _getLogger$info$track4;
                        var element = button.parentElement || button;
                        logger_getLogger().info("click_unlink_account").track((_getLogger$info$track4 = {}, 
                        _getLogger$info$track4.transition_name = "process_click_unlink_account", _getLogger$info$track4)).flush();
                        return function(_ref8) {
                            var _headers12;
                            return callGraphQL({
                                name: "DeleteVault",
                                query: "\n            mutation DeleteVault(\n                $paymentMethodID : String!\n            ) {\n                deleteVault(\n                    paymentMethodID: $paymentMethodID\n                )\n            }\n        ",
                                variables: {
                                    paymentMethodID: _ref8.paymentMethodID
                                },
                                headers: (_headers12 = {}, _headers12["x-paypal-internal-euat"] = _ref8.clientAccessToken, 
                                _headers12)
                            });
                        }({
                            paymentMethodID: paymentMethodID,
                            clientAccessToken: clientAccessToken
                        }).then((function() {
                            !function(element) {
                                element && element.parentNode && element.parentNode.removeChild(element);
                            }(element);
                        }));
                    }
                } ];
                throw new Error("Can not render menu for " + fundingSource);
            },
            updateFlowClientConfig: function(_ref12) {
                return updateButtonClientConfig({
                    fundingSource: _ref12.payment.fundingSource,
                    orderID: _ref12.orderID,
                    inline: !0
                });
            },
            spinner: !0,
            inline: !0
        };
        var smartWalletPromise;
        var smartWalletErrored = !1;
        function getInstrument(wallet, fundingSource, instrumentID) {
            var walletFunding = wallet[fundingSource];
            if (!walletFunding) throw new Error("Wallet has no " + fundingSource);
            var instrument;
            for (var _i2 = 0, _walletFunding$instru2 = walletFunding.instruments; _i2 < _walletFunding$instru2.length; _i2++) {
                var inst = _walletFunding$instru2[_i2];
                inst.instrumentID === instrumentID && (instrument = inst);
            }
            if (!instrument) throw new Error("Can not find instrument with id " + instrumentID);
            return instrument;
        }
        var wallet_capture_POPUP_OPTIONS = {
            width: 500,
            height: 590
        };
        var walletCapture = {
            name: "wallet_capture",
            setup: function(_ref2) {
                var props = _ref2.props, serviceData = _ref2.serviceData;
                var clientID = props.clientID, userIDToken = props.userIDToken;
                var wallet = serviceData.wallet;
                clientID && userIDToken ? smartWalletPromise = getSmartWallet({
                    clientID: clientID,
                    merchantID: serviceData.merchantID,
                    currency: props.currency,
                    amount: props.amount,
                    clientMetadataID: props.clientMetadataID || props.sessionID,
                    userIDToken: userIDToken,
                    env: props.env,
                    cspNonce: _ref2.config.cspNonce
                }).catch((function(err) {
                    logger_getLogger().warn("load_smart_wallet_error", {
                        err: stringifyError(err)
                    });
                    smartWalletErrored = !0;
                    throw err;
                })) : wallet && (smartWalletPromise = promise_ZalgoPromise.resolve(wallet));
            },
            isEligible: function(_ref) {
                return !!_ref.serviceData.wallet && !_ref.props.onShippingChange;
            },
            isPaymentEligible: function(_ref3) {
                var payment = _ref3.payment;
                var wallet = _ref3.serviceData.wallet;
                var fundingSource = payment.fundingSource, instrumentID = payment.instrumentID;
                if (payment.win) return !1;
                if (!wallet) return !1;
                if (!instrumentID) return !1;
                if (smartWalletErrored) return !1;
                try {
                    getInstrument(wallet, fundingSource, instrumentID);
                } catch (err) {
                    return !1;
                }
                return !!smartWalletPromise;
            },
            init: function(_ref4) {
                var props = _ref4.props, components = _ref4.components, payment = _ref4.payment, serviceData = _ref4.serviceData, config = _ref4.config;
                var createOrder = props.createOrder, onApprove = props.onApprove, clientMetadataID = props.clientMetadataID, vault = props.vault;
                var fundingSource = payment.fundingSource, instrumentID = payment.instrumentID;
                var wallet = serviceData.wallet;
                if (!wallet || !smartWalletPromise) throw new Error("No smart wallet found");
                if (!instrumentID) throw new Error("Instrument id required for wallet capture");
                var instrument = getInstrument(wallet, fundingSource, instrumentID);
                var createAccessToken = function() {
                    return smartWalletPromise ? smartWalletPromise.then((function(smartWallet) {
                        var smartInstrument = getInstrument(smartWallet, fundingSource, instrumentID);
                        if (!smartInstrument) throw new Error("Instrument not found");
                        if (!smartInstrument.accessToken) throw new Error("Instrument access token not found");
                        return smartInstrument.accessToken;
                    })) : promise_ZalgoPromise.resolve();
                };
                var getWebCheckoutFallback = function() {
                    return checkout.init({
                        props: props,
                        components: components,
                        serviceData: serviceData,
                        payment: _extends({}, payment, {
                            createAccessToken: createAccessToken,
                            isClick: !1,
                            buyerIntent: "pay_with_different_funding_shipping",
                            fundingSource: instrument && "credit" === instrument.type ? "credit" : fundingSource
                        }),
                        config: config
                    });
                };
                var fallbackToWebCheckout = function() {
                    logger_getLogger().info("web_checkout_fallback").flush();
                    return getWebCheckoutFallback().start();
                };
                if (!instrument.oneClick || smartWalletErrored || vault) return getWebCheckoutFallback();
                var restart = function() {
                    return fallbackToWebCheckout();
                };
                var shippingRequired = function(orderID) {
                    return getSupplementalOrderInfo(orderID).then((function(order) {
                        return !!order.checkoutSession.flags.isChangeShippingAddressAllowed;
                    }));
                };
                return {
                    start: function() {
                        return promise_ZalgoPromise.hash({
                            orderID: createOrder(),
                            smartWallet: smartWalletPromise
                        }).then((function(_ref5) {
                            var orderID = _ref5.orderID;
                            var buyerAccessToken = getInstrument(_ref5.smartWallet, fundingSource, instrumentID).accessToken;
                            if (!buyerAccessToken) throw new Error("No access token available for instrument");
                            var instrumentType = instrument.type;
                            if (!instrumentType) throw new Error("Instrument has no type");
                            return promise_ZalgoPromise.hash({
                                requireShipping: shippingRequired(orderID),
                                orderApproval: oneClickApproveOrder({
                                    orderID: orderID,
                                    instrumentType: instrumentType,
                                    buyerAccessToken: buyerAccessToken,
                                    instrumentID: instrumentID,
                                    clientMetadataID: clientMetadataID
                                })
                            }).then((function(_ref6) {
                                var orderApproval = _ref6.orderApproval;
                                return _ref6.requireShipping ? fallbackToWebCheckout() : onApprove({
                                    payerID: orderApproval.payerID
                                }, {
                                    restart: restart
                                });
                            }));
                        })).catch((function(err) {
                            logger_getLogger().warn("approve_order_error", {
                                err: stringifyError(err)
                            }).flush();
                            return fallbackToWebCheckout();
                        }));
                    },
                    close: function() {
                        return promise_ZalgoPromise.resolve();
                    }
                };
            },
            setupMenu: function(_ref7) {
                var props = _ref7.props, payment = _ref7.payment, serviceData = _ref7.serviceData, components = _ref7.components, config = _ref7.config;
                var createOrder = props.createOrder;
                var fundingSource = payment.fundingSource, instrumentID = payment.instrumentID;
                var wallet = serviceData.wallet, content = serviceData.content;
                if (!wallet) throw new Error("Can not render wallet menu without wallet");
                if (!instrumentID) throw new Error("Can not render wallet menu without instrumentID");
                var instrument = getInstrument(wallet, fundingSource, instrumentID);
                if (!instrument) throw new Error("Can not render wallet menu without instrument");
                var loadCheckout = function(_ref8) {
                    return checkout.init({
                        props: props,
                        components: components,
                        serviceData: serviceData,
                        config: config,
                        payment: _ref8.payment
                    }).start();
                };
                var newFundingSource = "credit" === instrument.type ? "credit" : fundingSource;
                if ("paypal" === fundingSource || "credit" === fundingSource) return [ {
                    label: content.payWithDifferentMethod,
                    popup: wallet_capture_POPUP_OPTIONS,
                    onSelect: function(_ref9) {
                        var _getLogger$info$track;
                        var win = _ref9.win;
                        logger_getLogger().info("click_choose_funding").track((_getLogger$info$track = {}, 
                        _getLogger$info$track.transition_name = "process_click_pay_with_different_payment_method", 
                        _getLogger$info$track)).flush();
                        return promise_ZalgoPromise.try((function() {
                            return promise_ZalgoPromise.try((function() {
                                return createOrder();
                            })).then((function(orderID) {
                                return updateButtonClientConfig({
                                    fundingSource: fundingSource,
                                    orderID: orderID,
                                    inline: !1
                                });
                            }));
                        })).then((function() {
                            return loadCheckout({
                                payment: _extends({}, payment, {
                                    win: win,
                                    buyerIntent: "pay_with_different_funding_shipping",
                                    fundingSource: newFundingSource,
                                    createAccessToken: function() {
                                        return smartWalletPromise.then((function(smartWallet) {
                                            var smartInstrument = getInstrument(smartWallet, fundingSource, instrumentID);
                                            if (!smartInstrument) throw new Error("Instrument not found");
                                            if (!smartInstrument.accessToken) throw new Error("Instrument access token not found");
                                            return smartInstrument.accessToken;
                                        }));
                                    }
                                })
                            });
                        }));
                    }
                }, {
                    label: content.payWithDifferentAccount,
                    popup: wallet_capture_POPUP_OPTIONS,
                    onSelect: function(_ref10) {
                        var _getLogger$info$track2;
                        var win = _ref10.win;
                        logger_getLogger().info("click_choose_account").track((_getLogger$info$track2 = {}, 
                        _getLogger$info$track2.transition_name = "process_click_pay_with_different_account", 
                        _getLogger$info$track2)).flush();
                        return loadCheckout({
                            payment: _extends({}, payment, {
                                win: win,
                                buyerIntent: "pay_with_different_account",
                                fundingSource: newFundingSource
                            })
                        });
                    }
                } ];
                throw new Error("Can not render menu for " + fundingSource);
            },
            updateFlowClientConfig: function(_ref11) {
                return updateButtonClientConfig({
                    fundingSource: _ref11.payment.fundingSource,
                    orderID: _ref11.orderID,
                    inline: !0
                });
            },
            spinner: !0,
            inline: !0
        };
        var native_clean;
        var getNativeSocket = memoize((function(_ref) {
            var nativeSocket = (config = (_ref9 = {
                sessionUID: _ref.sessionUID,
                sourceApp: "paypal_smart_payment_buttons",
                sourceAppVersion: _ref.version,
                targetApp: "paypal_native_checkout",
                config: _ref.firebaseConfig
            }).config, function(_ref) {
                var sessionUID = _ref.sessionUID, driver = _ref.driver, sourceApp = _ref.sourceApp, sourceAppVersion = _ref.sourceAppVersion, targetApp = _ref.targetApp, _ref$retry = _ref.retry, retry = void 0 === _ref$retry || _ref$retry;
                var receivedMessages = {};
                var responseListeners = {};
                var activeRequests = [];
                var requestListeners = {};
                var errorListeners = [];
                var sendMessage = function(socket, data) {
                    var messageUID = uniqueID();
                    receivedMessages[messageUID] = !0;
                    var message = _extends({
                        session_uid: sessionUID,
                        message_uid: messageUID,
                        source_app: sourceApp,
                        source_app_version: sourceAppVersion,
                        target_app: targetApp
                    }, data);
                    socket.send(JSON.stringify(message));
                };
                var sendResponse = function(socket, _ref2) {
                    var messageName = _ref2.messageName, responseStatus = _ref2.responseStatus, responseData = _ref2.responseData, requestUID = _ref2.requestUID;
                    if (socket.isOpen()) return sendMessage(socket, {
                        request_uid: requestUID,
                        message_name: messageName,
                        message_status: responseStatus,
                        message_type: "response",
                        message_data: responseData
                    });
                };
                var closed = !1;
                var retryDelay;
                var socketPromise;
                var retryPromise;
                var init = function init() {
                    (socketPromise = promise_ZalgoPromise.try((function() {
                        if (retryDelay) return retryPromise = promise_ZalgoPromise.delay(retryDelay);
                    })).then((function() {
                        retryPromise = null;
                        var instance = driver();
                        var connectionPromise = new promise_ZalgoPromise((function(resolve, reject) {
                            instance.onOpen((function() {
                                closed = !1;
                                retryDelay = 0;
                                resolve(instance);
                            }));
                            instance.onClose((function(err) {
                                closed = !0;
                                reject(err || new Error("socket closed"));
                                if (retry) {
                                    retry && (retryDelay = retryDelay ? 2 * retryDelay : 1);
                                    init();
                                }
                            }));
                            instance.onError((function(err) {
                                reject(err);
                                for (var _i2 = 0, _errorListeners2 = errorListeners; _i2 < _errorListeners2.length; _i2++) (0, 
                                _errorListeners2[_i2])(err);
                            }));
                        }));
                        instance.onMessage((function(rawMessage) {
                            connectionPromise.then((function(socket) {
                                return function(socket, rawData) {
                                    var parsedData;
                                    try {
                                        parsedData = JSON.parse(rawData);
                                    } catch (err) {
                                        throw new Error("Could not parse socket message: " + rawData);
                                    }
                                    if (!parsedData) throw new Error("No data passed from socket message");
                                    var messageSessionUID = parsedData.session_uid, requestUID = parsedData.request_uid, messageUID = parsedData.message_uid, messageName = parsedData.message_name, messageType = parsedData.message_type, messageData = parsedData.message_data, responseStatus = parsedData.message_status;
                                    requestUID = requestUID || parsedData.request_id;
                                    if (!messageUID || !receivedMessages[messageUID]) {
                                        if (!(messageUID && requestUID && messageName && messageType && parsedData.target_app)) throw new Error("Incomplete message: " + rawData);
                                        receivedMessages[messageUID] = !0;
                                        if ("request" === messageType) return function(socket, _ref3) {
                                            var messageSessionUID = _ref3.messageSessionUID, requestUID = _ref3.requestUID, messageName = _ref3.messageName, messageData = _ref3.messageData;
                                            var activeRequest = new promise_ZalgoPromise;
                                            activeRequests.push(activeRequest);
                                            return promise_ZalgoPromise.try((function() {
                                                var requestListener = requestListeners[messageName];
                                                if (!requestListener) throw new Error("No listener found for name: " + messageName);
                                                var handler = requestListener.handler;
                                                if (requestListener.requireSessionUID && messageSessionUID !== sessionUID) throw new Error("Incorrect sessionUID: " + (messageSessionUID || "undefined"));
                                                return handler({
                                                    data: messageData
                                                });
                                            })).then((function(res) {
                                                sendResponse(socket, {
                                                    responseStatus: "success",
                                                    responseData: res,
                                                    messageName: messageName,
                                                    requestUID: requestUID
                                                });
                                            }), (function(err) {
                                                sendResponse(socket, {
                                                    responseStatus: "error",
                                                    responseData: {
                                                        message: err && err.message ? err.message : "Unknown error"
                                                    },
                                                    messageName: messageName,
                                                    messageSessionUID: messageSessionUID,
                                                    requestUID: requestUID
                                                });
                                            })).finally((function() {
                                                activeRequest.resolve();
                                                activeRequests.splice(activeRequests.indexOf(activeRequest), 1);
                                            }));
                                        }(socket, {
                                            messageSessionUID: messageSessionUID,
                                            requestUID: requestUID,
                                            messageName: messageName,
                                            messageData: messageData
                                        });
                                        if ("response" === messageType) return function(_ref4) {
                                            var requestUID = _ref4.requestUID, messageSessionUID = _ref4.messageSessionUID, responseStatus = _ref4.responseStatus, messageData = _ref4.messageData;
                                            var _ref5 = responseListeners[requestUID] || {}, listenerPromise = _ref5.listenerPromise, requireSessionUID = _ref5.requireSessionUID;
                                            if (!listenerPromise) throw new Error("Could not find response listener for " + _ref4.messageName + " with id: " + requestUID);
                                            if (requireSessionUID && messageSessionUID !== sessionUID) throw new Error("Incorrect sessionUID: " + (messageSessionUID || "undefined"));
                                            delete responseListeners[requestUID];
                                            if ("success" === responseStatus) listenerPromise.resolve({
                                                data: messageData
                                            }); else {
                                                if ("error" !== responseStatus) throw new Error("Can not handle response status: " + (status || "undefined"));
                                                listenerPromise.reject(new Error(messageData.message));
                                            }
                                        }({
                                            messageName: messageName,
                                            requestUID: requestUID,
                                            messageSessionUID: messageSessionUID,
                                            responseStatus: responseStatus,
                                            messageData: messageData
                                        });
                                        throw new Error("Unhandleable message type: " + messageType);
                                    }
                                }(socket, rawMessage);
                            }));
                        }));
                        return connectionPromise;
                    }))).catch(src_util_noop);
                };
                init();
                return {
                    on: function(name, handler, _temp) {
                        var _ref6$requireSessionU = (void 0 === _temp ? {} : _temp).requireSessionUID, requireSessionUID = void 0 === _ref6$requireSessionU || _ref6$requireSessionU;
                        if (requestListeners[name]) throw new Error("Listener already registered for name: " + name);
                        requestListeners[name] = {
                            handler: handler,
                            requireSessionUID: requireSessionUID
                        };
                        return {
                            cancel: function() {
                                delete requestListeners[name];
                            }
                        };
                    },
                    send: function(messageName, messageData, _temp2) {
                        var _ref7 = void 0 === _temp2 ? {} : _temp2, _ref7$requireSessionU = _ref7.requireSessionUID, requireSessionUID = void 0 === _ref7$requireSessionU || _ref7$requireSessionU, _ref7$timeout = _ref7.timeout, timeout = void 0 === _ref7$timeout ? 0 : _ref7$timeout;
                        return socketPromise.then((function(socket) {
                            var requestUID = uniqueID();
                            var listenerPromise = new promise_ZalgoPromise;
                            responseListeners[requestUID] = {
                                listenerPromise: listenerPromise,
                                requireSessionUID: requireSessionUID
                            };
                            sendMessage(socket, {
                                request_uid: requestUID,
                                message_name: messageName,
                                message_type: "request",
                                message_data: messageData
                            });
                            timeout && setTimeout((function() {
                                listenerPromise.reject(new Error("Timeoued out waiting for " + messageName + " response after " + timeout + "ms"));
                            }), timeout);
                            return listenerPromise;
                        }));
                    },
                    onError: function(handler) {
                        errorListeners.push(handler);
                    },
                    reconnect: function() {
                        return promise_ZalgoPromise.try((function() {
                            if (!closed) return socketPromise;
                            if (retryPromise) {
                                retryPromise.resolve();
                                return socketPromise;
                            }
                            retryDelay = 0;
                            return init();
                        })).then(src_util_noop);
                    },
                    close: function() {
                        retry = !1;
                        requestListeners = {};
                        errorListeners = [];
                        for (var _i4 = 0, _Object$keys2 = Object.keys(responseListeners); _i4 < _Object$keys2.length; _i4++) responseListeners[_Object$keys2[_i4]].listenerPromise.asyncReject(new Error("Socket closed"));
                        promise_ZalgoPromise.all(activeRequests).then((function() {
                            return socketPromise.then((function(socket) {
                                return socket.close();
                            }), src_util_noop);
                        }));
                    }
                };
            }({
                sessionUID: sessionUID = _ref9.sessionUID,
                driver: function() {
                    var open = !1;
                    var onMessageHandlers = [];
                    var onErrorHandlers = [];
                    var onCloseHandlers = [];
                    var onOpenHandlers = [];
                    var error = function(err) {
                        for (var _i6 = 0; _i6 < onErrorHandlers.length; _i6++) (0, onErrorHandlers[_i6])(err);
                    };
                    var databasePromise = promise_ZalgoPromise.hash({
                        firebase: loadFirebaseSDK(config),
                        sessionToken: getFirebaseSessionToken(sessionUID)
                    }).then((function(_ref10) {
                        var firebase = _ref10.firebase, sessionToken = _ref10.sessionToken;
                        return firebase.auth().signInWithCustomToken(sessionToken).then((function() {
                            var _getLogger$info$track;
                            var database = firebase.database();
                            firebase.database.INTERNAL.forceWebSockets();
                            open = !0;
                            logger_getLogger().info("firebase_connection_opened").track((_getLogger$info$track = {}, 
                            _getLogger$info$track.state_name = "smart_button", _getLogger$info$track.transition_name = "firebase_connection_opened", 
                            _getLogger$info$track)).flush();
                            for (var _i8 = 0; _i8 < onOpenHandlers.length; _i8++) (0, onOpenHandlers[_i8])();
                            database.ref("users/" + sessionUID + "/messages").on("value", (function(res) {
                                var messages = res.val() || {};
                                for (var _i10 = 0, _Object$keys4 = Object.keys(messages); _i10 < _Object$keys4.length; _i10++) {
                                    var message = messages[_Object$keys4[_i10]];
                                    for (var _i12 = 0; _i12 < onMessageHandlers.length; _i12++) (0, onMessageHandlers[_i12])(message);
                                }
                            }), (function(err) {
                                error(err);
                            }));
                            database.goOnline();
                            return database;
                        }));
                    }));
                    databasePromise.catch((function(err) {
                        var _getLogger$info$track2;
                        logger_getLogger().info("firebase_connection_errored", {
                            err: stringifyError(err)
                        }).track((_getLogger$info$track2 = {}, _getLogger$info$track2.state_name = "smart_button", 
                        _getLogger$info$track2.transition_name = "firebase_connection_errored", _getLogger$info$track2.int_error_desc = stringifyError(err), 
                        _getLogger$info$track2)).flush();
                    }));
                    return {
                        send: function(data) {
                            databasePromise.then((function(database) {
                                return database.ref("users/" + sessionUID + "/messages/" + uniqueID()).set(data);
                            })).catch(error);
                        },
                        close: function() {
                            databasePromise.then((function(database) {
                                database.goOffline();
                            }));
                        },
                        onMessage: function(handler) {
                            onMessageHandlers.push(handler);
                        },
                        onError: function(handler) {
                            onErrorHandlers.push(handler);
                        },
                        onOpen: function(handler) {
                            open ? handler() : onOpenHandlers.push(handler);
                        },
                        onClose: function(handler) {
                            onCloseHandlers.push(handler);
                        },
                        isOpen: function() {
                            return open;
                        }
                    };
                },
                sourceApp: _ref9.sourceApp,
                sourceAppVersion: _ref9.sourceAppVersion,
                targetApp: _ref9.targetApp
            }));
            var _ref9, sessionUID, config;
            nativeSocket.onError((function(err) {
                var _getLogger$error$trac;
                logger_getLogger().error("native_socket_error", {
                    err: stringifyError(err)
                }).track((_getLogger$error$trac = {}, _getLogger$error$trac.state_name = "smart_button", 
                _getLogger$error$trac.transition_name = "native_app_switch_ack", _getLogger$error$trac.int_error_desc = "[Native Socket Error] " + stringifyError(err), 
                _getLogger$error$trac)).flush();
            }));
            return nativeSocket;
        }));
        function isAndroidChrome() {
            return isAndroid() && isChrome();
        }
        function didAppSwitch(popupWin) {
            return !popupWin || isWindowClosed(popupWin);
        }
        function isNativeOptedIn(_ref2) {
            if (_ref2.props.enableNativeCheckout) return !0;
            try {
                if (window.localStorage.getItem("__native_checkout__")) return !0;
            } catch (err) {}
            return !1;
        }
        var initialPageUrl;
        var nativeEligibility;
        var parentPopupBridge;
        function isValidMerchantIDs(merchantIDs, payees) {
            if (merchantIDs.length !== payees.length) return !1;
            var merchantEmails = [];
            var merchantIds = [];
            merchantIDs.forEach((function(id) {
                isEmailAddress(id) ? merchantEmails.push(id.toLowerCase()) : merchantIds.push(id);
            }));
            var foundEmail = merchantEmails.every((function(email) {
                return payees.some((function(payee) {
                    return email === (payee.email && payee.email.stringValue && payee.email.stringValue.toLowerCase());
                }));
            }));
            var foundMerchantId = merchantIds.every((function(id) {
                return payees.some((function(payee) {
                    return id === payee.merchantId;
                }));
            }));
            return !(!foundEmail || !foundMerchantId) && payees.every((function(payee) {
                return merchantIds.indexOf(payee.merchantId) > -1 || merchantEmails.indexOf(payee.email && payee.email.stringValue && payee.email.stringValue.toLowerCase()) > -1;
            }));
        }
        function triggerIntegrationError(_ref) {
            var _getLogger$warn$track;
            var error = _ref.error, _ref$message = _ref.message, message = void 0 === _ref$message ? error : _ref$message, clientID = _ref.clientID, orderID = _ref.orderID, _ref$loggerPayload = _ref.loggerPayload, loggerPayload = void 0 === _ref$loggerPayload ? {} : _ref$loggerPayload, _ref$throwError = _ref.throwError, throwError = void 0 === _ref$throwError || _ref$throwError;
            var isWhitelisted = "sandbox" === _ref.env ? clientID && -1 !== SANDBOX_ORDER_VALIDATION_WHITELIST.indexOf(clientID) : clientID && -1 !== ORDER_VALIDATION_WHITELIST.indexOf(clientID);
            var shouldThrow = throwError && !isWhitelisted;
            logger_getLogger().warn(error, loggerPayload).track((_getLogger$warn$track = {}, 
            _getLogger$warn$track.transition_name = "process_order_validate", _getLogger$warn$track.context_type = "EC-Token", 
            _getLogger$warn$track.token = orderID, _getLogger$warn$track.context_id = orderID, 
            _getLogger$warn$track.integration_issue = error, _getLogger$warn$track.whitelist = shouldThrow ? "false" : "true", 
            _getLogger$warn$track.ext_error_desc = message, _getLogger$warn$track)).flush();
            if (shouldThrow) {
                console.error(message);
                throw new Error(message);
            }
            console.warn(message);
        }
        var VALIDATE_INTENTS = [ "capture", "authorize", "order" ];
        var menu_menu;
        function renderButtonSmartMenu(_ref) {
            var containerUID = _ref.containerUID;
            if (menu_menu) return menu_menu;
            (menu_menu = (0, _ref.Menu)({
                clientID: _ref.clientID
            })).hide();
            menu_menu.renderTo(window.xprops.getParent(), "#" + containerUID + " #smart-menu");
            return menu_menu;
        }
        var PAYMENT_FLOWS = [ vaultCapture, walletCapture, cardFields, {
            name: "popup_bridge",
            setup: function(_ref) {
                var props = _ref.props;
                return promise_ZalgoPromise.try((function() {
                    var getPopupBridge = props.getPopupBridge;
                    if (getPopupBridge) return getPopupBridge().then((function(bridge) {
                        parentPopupBridge = bridge;
                    }));
                }));
            },
            isEligible: function(_ref2) {
                return !_ref2.props.onShippingChange;
            },
            isPaymentEligible: function(_ref3) {
                return !_ref3.payment.win && !!parentPopupBridge;
            },
            init: function(_ref4) {
                var props = _ref4.props;
                var createOrder = props.createOrder, onApprove = props.onApprove, onCancel = props.onCancel, commit = props.commit;
                var fundingSource = _ref4.payment.fundingSource;
                return {
                    start: function start() {
                        return createOrder().then((function(orderID) {
                            if (!parentPopupBridge) throw new Error("Popup bridge required");
                            var url = extendUrl(getDomain() + "/checkoutnow", {
                                query: {
                                    fundingSource: fundingSource,
                                    token: orderID,
                                    useraction: commit ? "commit" : "continue",
                                    redirect_uri: parentPopupBridge.nativeUrl,
                                    native_xo: "1"
                                }
                            });
                            return parentPopupBridge.start(url);
                        })).then((function(_ref5) {
                            var opType = _ref5.opType, payerID = _ref5.PayerID, paymentID = _ref5.paymentId, billingToken = _ref5.ba_token;
                            if ("payment" === opType) {
                                if (!payerID && !billingToken) throw new Error("Expected payerID to be passed");
                                return onApprove({
                                    payerID: payerID,
                                    paymentID: paymentID,
                                    billingToken: billingToken
                                }, {
                                    restart: start
                                });
                            }
                            if ("cancel" === opType) return onCancel();
                            throw new Error("Unhandleable opType: " + opType);
                        }));
                    },
                    close: promiseNoop
                };
            },
            spinner: !0
        }, {
            name: "native",
            setup: function(_ref5) {
                var props = _ref5.props, serviceData = _ref5.serviceData;
                return promise_ZalgoPromise.try((function() {
                    var getPageUrl = props.getPageUrl, clientID = props.clientID, currency = props.currency, platform = props.platform, vault = props.vault, buttonSessionID = props.buttonSessionID;
                    var merchantID = serviceData.merchantID, buyerCountry = serviceData.buyerCountry, cookies = serviceData.cookies;
                    var shippingCallbackEnabled = Boolean(props.onShippingChange);
                    return promise_ZalgoPromise.all([ getNativeEligibility({
                        vault: vault,
                        platform: platform,
                        shippingCallbackEnabled: shippingCallbackEnabled,
                        merchantID: merchantID[0],
                        clientID: clientID,
                        buyerCountry: buyerCountry,
                        currency: currency,
                        buttonSessionID: buttonSessionID,
                        cookies: cookies
                    }).then((function(result) {
                        nativeEligibility = result;
                    })), getPageUrl().then((function(pageUrl) {
                        initialPageUrl = pageUrl;
                    })) ]);
                })).then(src_util_noop);
            },
            isEligible: function(_ref3) {
                var props = _ref3.props;
                var createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription, env = props.env;
                var firebaseConfig = _ref3.config.firebase;
                var merchantID = _ref3.serviceData.merchantID;
                return !("mobile" !== props.platform || props.onShippingChange && !isNativeOptedIn({
                    props: props
                }) || createBillingAgreement || createSubscription || !supportsPopups() || !firebaseConfig || !(isIos() && function(ua) {
                    void 0 === ua && (ua = getUserAgent());
                    return /Safari/.test(ua) && !isChrome(ua);
                }() || isAndroidChrome()) || !isNativeOptedIn({
                    props: props
                }) && ("local" === env || "stage" === env || merchantID.length > 1));
            },
            isPaymentEligible: function(_ref4) {
                var payment = _ref4.payment;
                var fundingSource = payment.fundingSource;
                var eligibility = _ref4.serviceData.eligibility;
                return !(payment.win || !initialPageUrl || !NATIVE_CHECKOUT_URI[fundingSource] || !isNativeOptedIn({
                    props: _ref4.props
                }) && (!eligibility.nativeCheckout || !eligibility.nativeCheckout[fundingSource]) && !(nativeEligibility && nativeEligibility[fundingSource] && nativeEligibility[fundingSource].eligibility));
            },
            init: function(_ref6) {
                var props = _ref6.props, components = _ref6.components, config = _ref6.config, payment = _ref6.payment, serviceData = _ref6.serviceData;
                var createOrder = props.createOrder, onApprove = props.onApprove, onCancel = props.onCancel, onError = props.onError, commit = props.commit, buttonSessionID = props.buttonSessionID, env = props.env, stageHost = props.stageHost, apiStageHost = props.apiStageHost, onClick = props.onClick, onShippingChange = props.onShippingChange;
                var facilitatorAccessToken = serviceData.facilitatorAccessToken, sdkMeta = serviceData.sdkMeta;
                var fundingSource = payment.fundingSource;
                var version = config.version, firebaseConfig = config.firebase;
                if (!firebaseConfig) throw new Error("Can not run native flow without firebase config");
                native_clean && native_clean.all();
                native_clean = (tasks = [], cleaned = !1, {
                    set: function(name, item) {
                        if (!cleaned) {
                            (void 0)[name] = item;
                            this.register((function() {
                                delete (void 0)[name];
                            }));
                        }
                        return item;
                    },
                    register: function(method) {
                        cleaned ? method() : tasks.push(once(method));
                    },
                    all: function() {
                        var results = [];
                        cleaned = !0;
                        for (;tasks.length; ) {
                            var task = tasks.shift();
                            results.push(task());
                        }
                        return promise_ZalgoPromise.all(results).then(src_util_noop);
                    }
                });
                var tasks, cleaned;
                var approved = !1;
                var cancelled = !1;
                var didFallback = !1;
                var close = memoize((function() {
                    return native_clean.all();
                }));
                var listen = function(popupWin, domain, event, handler) {
                    return paypal.postRobot.once(event, {
                        window: popupWin,
                        domain: domain
                    }, handler);
                };
                var fallbackToWebCheckout = function(fallbackWin) {
                    didFallback = !0;
                    var checkoutPayment = _extends({}, payment, {
                        win: fallbackWin,
                        isClick: !1
                    });
                    var instance = checkout.init({
                        props: props,
                        components: components,
                        payment: checkoutPayment,
                        config: config,
                        serviceData: serviceData
                    });
                    native_clean.register((function() {
                        return instance.close();
                    }));
                    return instance.start();
                };
                var getNativeDomain = memoize((function() {
                    return "sandbox" === env && window.xprops && window.xprops.useCorrectNativeSandboxDomain ? "https://www.sandbox.paypal.com" : "https://www.paypal.com";
                }));
                var getNativePopupDomain = memoize((function() {
                    return "sandbox" === env && window.xprops && window.xprops.useCorrectNativeSandboxDomain ? "https://history.paypal.com" : "sandbox" === env ? "https://www.sandbox.paypal.com" : "https://history.paypal.com";
                }));
                var getNativeUrlForAndroid = memoize((function(_temp) {
                    var _ref7 = void 0 === _temp ? {} : _temp, _ref7$pageUrl = _ref7.pageUrl, pageUrl = void 0 === _ref7$pageUrl ? initialPageUrl : _ref7$pageUrl, sessionUID = _ref7.sessionUID;
                    return extendUrl("" + getNativeDomain() + NATIVE_CHECKOUT_URI[fundingSource], {
                        query: {
                            sdkMeta: sdkMeta,
                            sessionUID: sessionUID,
                            buttonSessionID: buttonSessionID,
                            pageUrl: pageUrl
                        }
                    });
                }));
                var getNativeUrl = memoize((function(_ref8) {
                    var sessionUID = _ref8.sessionUID, _ref8$pageUrl = _ref8.pageUrl, pageUrl = void 0 === _ref8$pageUrl ? initialPageUrl : _ref8$pageUrl, sdkProps = _ref8.sdkProps;
                    return extendUrl("" + getNativeDomain() + NATIVE_CHECKOUT_URI[fundingSource], {
                        query: {
                            sdkMeta: sdkMeta,
                            sessionUID: sessionUID,
                            orderID: sdkProps ? sdkProps.orderID : "",
                            facilitatorAccessToken: facilitatorAccessToken,
                            pageUrl: pageUrl,
                            commit: String(commit),
                            webCheckoutUrl: sdkProps ? sdkProps.webCheckoutUrl : "",
                            userAgent: sdkProps ? sdkProps.userAgent : "",
                            buttonSessionID: buttonSessionID,
                            env: env,
                            stageHost: stageHost || "",
                            apiStageHost: apiStageHost || "",
                            forceEligible: String(sdkProps ? sdkProps.forceEligible : "false")
                        }
                    });
                }));
                var getNativePopupUrl = memoize((function(_ref9) {
                    var sessionUID = _ref9.sessionUID;
                    var parentDomain = getDomain();
                    return extendUrl("" + getNativePopupDomain() + NATIVE_CHECKOUT_POPUP_URI[fundingSource], {
                        query: {
                            sdkMeta: sdkMeta,
                            sessionUID: sessionUID,
                            buttonSessionID: buttonSessionID,
                            parentDomain: parentDomain
                        }
                    });
                }));
                var getWebCheckoutUrl = memoize((function(_ref10) {
                    var orderID = _ref10.orderID;
                    return extendUrl(getNativeDomain() + "/checkoutnow", {
                        query: {
                            fundingSource: fundingSource,
                            facilitatorAccessToken: facilitatorAccessToken,
                            token: orderID,
                            useraction: commit ? "commit" : "continue",
                            native_xo: "1"
                        }
                    });
                }));
                var getSDKProps = memoize((function() {
                    return createOrder().then((function(orderID) {
                        var userAgent = getUserAgent();
                        var webCheckoutUrl = getWebCheckoutUrl({
                            orderID: orderID
                        });
                        var forceEligible = isNativeOptedIn({
                            props: props
                        });
                        return {
                            orderID: orderID,
                            facilitatorAccessToken: facilitatorAccessToken,
                            pageUrl: "",
                            commit: commit,
                            webCheckoutUrl: webCheckoutUrl,
                            userAgent: userAgent,
                            buttonSessionID: buttonSessionID,
                            env: env,
                            stageHost: stageHost,
                            apiStageHost: apiStageHost,
                            forceEligible: forceEligible
                        };
                    }));
                }));
                var onApproveCallback = function(_ref11) {
                    var _getLogger$info$track2;
                    var _ref11$data = _ref11.data, payerID = _ref11$data.payerID, paymentID = _ref11$data.paymentID, billingToken = _ref11$data.billingToken;
                    approved = !0;
                    logger_getLogger().info("native_message_onapprove", {
                        payerID: payerID,
                        paymentID: paymentID,
                        billingToken: billingToken
                    }).track((_getLogger$info$track2 = {}, _getLogger$info$track2.transition_name = "process_popup_closed", 
                    _getLogger$info$track2)).flush();
                    return promise_ZalgoPromise.all([ onApprove({
                        payerID: payerID,
                        paymentID: paymentID,
                        billingToken: billingToken,
                        forceRestAPI: !0
                    }, {
                        restart: function() {
                            return fallbackToWebCheckout();
                        }
                    }), close() ]).then(src_util_noop);
                };
                var onCancelCallback = function() {
                    cancelled = !0;
                    logger_getLogger().info("native_message_oncancel").flush();
                    return promise_ZalgoPromise.all([ onCancel(), close() ]).then(src_util_noop);
                };
                var onErrorCallback = function(_ref12) {
                    var message = _ref12.data.message;
                    logger_getLogger().info("native_message_onerror", {
                        err: message
                    }).flush();
                    return promise_ZalgoPromise.all([ onError(new Error(message)), close() ]).then(src_util_noop);
                };
                var onShippingChangeCallback = function(_ref13) {
                    var data = _ref13.data;
                    logger_getLogger().info("native_message_onshippingchange").flush();
                    if (onShippingChange) {
                        var resolved = !0;
                        var actions = {
                            resolve: function() {
                                return promise_ZalgoPromise.try((function() {
                                    resolved = !0;
                                }));
                            },
                            reject: function() {
                                return promise_ZalgoPromise.try((function() {
                                    resolved = !1;
                                }));
                            }
                        };
                        return onShippingChange(_extends({}, data, {
                            forceRestAPI: !0
                        }), actions).then((function() {
                            return {
                                resolved: resolved
                            };
                        }));
                    }
                };
                var connectNative = memoize((function(_ref14) {
                    var socket = getNativeSocket({
                        sessionUID: _ref14.sessionUID,
                        firebaseConfig: firebaseConfig,
                        version: version
                    });
                    var setNativeProps = memoize((function() {
                        return getSDKProps().then((function(sdkProps) {
                            logger_getLogger().info("native_message_setprops").flush();
                            !function(props) {
                                var _getLogger$info$track;
                                var sanitizedProps = _extends({}, props, {
                                    facilitatorAccessToken: props.facilitatorAccessToken ? "********************" : ""
                                });
                                logger_getLogger().info("native_setprops_request", sanitizedProps).track((_getLogger$info$track = {}, 
                                _getLogger$info$track.transition_name = "process_set_props_attempt", _getLogger$info$track)).flush();
                            }(sdkProps);
                            return socket.send("setProps", sdkProps);
                        })).then((function() {
                            var _getLogger$info$track3;
                            logger_getLogger().info("native_response_setprops").track((_getLogger$info$track3 = {}, 
                            _getLogger$info$track3.state_name = "smart_button", _getLogger$info$track3.transition_name = "native_app_switch_ack", 
                            _getLogger$info$track3)).flush();
                        })).catch((function(err) {
                            var _getLogger$info$track4;
                            logger_getLogger().info("native_response_setprops_error").track((_getLogger$info$track4 = {}, 
                            _getLogger$info$track4.state_name = "smart_button", _getLogger$info$track4.int_error_desc = stringifyError(err), 
                            _getLogger$info$track4)).flush();
                        }));
                    }));
                    var closeNative = memoize((function() {
                        logger_getLogger().info("native_message_close").flush();
                        return socket.send("close").then((function() {
                            logger_getLogger().info("native_response_close").flush();
                            return close();
                        }));
                    }));
                    var getPropsListener = socket.on("getProps", (function() {
                        logger_getLogger().info("native_message_getprops").flush();
                        return getSDKProps();
                    }));
                    var onShippingChangeListener = socket.on("onShippingChange", onShippingChangeCallback);
                    var onApproveListener = socket.on("onApprove", onApproveCallback);
                    var onCancelListener = socket.on("onCancel", onCancelCallback);
                    var onErrorListener = socket.on("onError", onErrorCallback);
                    native_clean.register(getPropsListener.cancel);
                    native_clean.register(onShippingChangeListener.cancel);
                    native_clean.register(onApproveListener.cancel);
                    native_clean.register(onCancelListener.cancel);
                    native_clean.register(onErrorListener.cancel);
                    socket.reconnect();
                    return {
                        setProps: setNativeProps,
                        close: closeNative
                    };
                }));
                var detectAppSwitch = once((function(_ref15) {
                    var _getLogger$info$track5;
                    var sessionUID = _ref15.sessionUID;
                    logger_getLogger().info("native_detect_app_switch").track((_getLogger$info$track5 = {}, 
                    _getLogger$info$track5.transition_name = "native_detect_app_switch", _getLogger$info$track5)).flush();
                    return connectNative({
                        sessionUID: sessionUID
                    }).setProps();
                }));
                var detectWebSwitch = once((function(fallbackWin) {
                    var _getLogger$info$track6;
                    logger_getLogger().info("native_detect_web_switch").track((_getLogger$info$track6 = {}, 
                    _getLogger$info$track6.transition_name = "native_detect_web_switch", _getLogger$info$track6)).flush();
                    return fallbackToWebCheckout(fallbackWin);
                }));
                var validate = memoize((function() {
                    return promise_ZalgoPromise.try((function() {
                        return !onClick || onClick({
                            fundingSource: fundingSource
                        });
                    }));
                }));
                var popup = memoize((function(url) {
                    var win = window.open(url);
                    native_clean.register((function() {
                        win && !isWindowClosed(win) && win.close();
                    }));
                    return win;
                }));
                return {
                    click: function() {
                        return promise_ZalgoPromise.try((function() {
                            var sessionUID = uniqueID();
                            return isAndroidChrome() ? function(_ref16) {
                                var _getLogger$info$info$, _getLogger$info$info$2;
                                var sessionUID = _ref16.sessionUID;
                                var nativeUrl = getNativeUrlForAndroid({
                                    sessionUID: sessionUID
                                });
                                var nativeWin = popup(nativeUrl);
                                window.addEventListener("pagehide", (function() {
                                    nativeWin.close();
                                }));
                                logger_getLogger().info("native_attempt_appswitch_popup_shown", {
                                    url: nativeUrl
                                }).info("native_attempt_appswitch_url_popup", {
                                    url: nativeUrl
                                }).track((_getLogger$info$info$ = {}, _getLogger$info$info$.state_name = "smart_button", 
                                _getLogger$info$info$.transition_name = "popup_shown", _getLogger$info$info$)).track((_getLogger$info$info$2 = {}, 
                                _getLogger$info$info$2.state_name = "smart_button", _getLogger$info$info$2.transition_name = "app_switch_attempted", 
                                _getLogger$info$info$2)).flush();
                                var validatePromise = validate();
                                var delayPromise = promise_ZalgoPromise.delay(500);
                                return validatePromise.then((function(valid) {
                                    return valid ? createOrder().then((function() {
                                        if (didAppSwitch(nativeWin)) return detectAppSwitch({
                                            sessionUID: sessionUID
                                        });
                                        if (nativeWin) return detectWebSwitch(nativeWin);
                                        throw new Error("No window found");
                                    })).catch((function(err) {
                                        var _getLogger$info$track7;
                                        logger_getLogger().info("native_attempt_appswitch_url_popup_errored", {
                                            url: nativeUrl
                                        }).track((_getLogger$info$track7 = {}, _getLogger$info$track7.state_name = "smart_button", 
                                        _getLogger$info$track7.transition_name = "app_switch_attempted_errored", _getLogger$info$track7.int_error_desc = stringifyError(err), 
                                        _getLogger$info$track7)).flush();
                                        return connectNative({
                                            sessionUID: sessionUID
                                        }).close().then((function() {
                                            throw err;
                                        }));
                                    })) : delayPromise.then((function() {
                                        if (didAppSwitch(nativeWin)) return connectNative({
                                            sessionUID: sessionUID
                                        }).close();
                                    })).then((function() {
                                        return close();
                                    }));
                                }));
                            }({
                                sessionUID: sessionUID
                            }) : function(_ref17) {
                                var _getLogger$info$track8;
                                var sessionUID = _ref17.sessionUID;
                                var popupWin = popup(getNativePopupUrl({
                                    sessionUID: sessionUID
                                }));
                                window.addEventListener("pagehide", (function() {
                                    popupWin.close();
                                }));
                                logger_getLogger().info("native_attempt_appswitch_popup_shown").track((_getLogger$info$track8 = {}, 
                                _getLogger$info$track8.state_name = "smart_button", _getLogger$info$track8.transition_name = "popup_shown", 
                                _getLogger$info$track8)).flush();
                                var closeListener = function(win, callback, delay, maxtime) {
                                    void 0 === delay && (delay = 1e3);
                                    void 0 === maxtime && (maxtime = 1 / 0);
                                    var timeout;
                                    !function check() {
                                        if (isWindowClosed(win)) {
                                            timeout && clearTimeout(timeout);
                                            return promise_ZalgoPromise.delay(1e3).then((function() {
                                                if (!approved && !cancelled && !didFallback) return promise_ZalgoPromise.all([ onCancel(), close() ]);
                                            })).then(src_util_noop);
                                        }
                                        if (maxtime <= 0) clearTimeout(timeout); else {
                                            maxtime -= delay;
                                            timeout = setTimeout(check, delay);
                                        }
                                    }();
                                    return {
                                        cancel: function() {
                                            timeout && clearTimeout(timeout);
                                        }
                                    };
                                }(popupWin, 0, 500);
                                native_clean.register((function() {
                                    closeListener.cancel();
                                }));
                                var validatePromise = validate();
                                var awaitRedirectListener = listen(popupWin, getNativePopupDomain(), "awaitRedirect", (function(_ref18) {
                                    var pageUrl = _ref18.data.pageUrl;
                                    logger_getLogger().info("native_post_message_await_redirect").flush();
                                    return validatePromise.then((function(valid) {
                                        return valid ? getSDKProps().then((function(sdkProps) {
                                            var _getLogger$info$track9;
                                            var nativeUrl = getNativeUrl({
                                                sessionUID: sessionUID,
                                                pageUrl: pageUrl,
                                                sdkProps: sdkProps
                                            });
                                            logger_getLogger().info("native_attempt_appswitch_url_popup", {
                                                url: nativeUrl
                                            }).track((_getLogger$info$track9 = {}, _getLogger$info$track9.state_name = "smart_button", 
                                            _getLogger$info$track9.transition_name = "app_switch_attempted", _getLogger$info$track9.info_msg = nativeUrl, 
                                            _getLogger$info$track9)).flush();
                                            return {
                                                redirectUrl: nativeUrl
                                            };
                                        })).catch((function(err) {
                                            var _getLogger$info$track10;
                                            logger_getLogger().info("native_attempt_appswitch_url_popup_errored").track((_getLogger$info$track10 = {}, 
                                            _getLogger$info$track10.state_name = "smart_button", _getLogger$info$track10.transition_name = "app_switch_attempted_errored", 
                                            _getLogger$info$track10.int_error_desc = stringifyError(err), _getLogger$info$track10)).flush();
                                            return connectNative({
                                                sessionUID: sessionUID
                                            }).close().then((function() {
                                                throw err;
                                            }));
                                        })) : close().then((function() {
                                            throw new Error("Validation failed");
                                        }));
                                    }));
                                }));
                                var detectAppSwitchListener = listen(popupWin, getNativePopupDomain(), "detectAppSwitch", (function() {
                                    logger_getLogger().info("native_post_message_detect_app_switch").flush();
                                    return detectAppSwitch({
                                        sessionUID: sessionUID
                                    });
                                }));
                                var onApproveListener = listen(popupWin, getNativePopupDomain(), "onApprove", (function(data) {
                                    onApproveCallback(data);
                                    popupWin.close();
                                }));
                                var onCancelListener = listen(popupWin, getNativePopupDomain(), "onCancel", (function() {
                                    onCancelCallback();
                                    popupWin.close();
                                }));
                                var onCompleteListener = listen(popupWin, getNativePopupDomain(), "onComplete", (function() {
                                    logger_getLogger().info("native_post_message_on_complete").flush();
                                    popupWin.close();
                                }));
                                var onErrorListener = listen(popupWin, getNativePopupDomain(), "onError", (function(data) {
                                    onErrorCallback(data);
                                    popupWin.close();
                                }));
                                var detectWebSwitchListener = listen(popupWin, getNativeDomain(), "detectWebSwitch", (function() {
                                    logger_getLogger().info("native_post_message_detect_web_switch").flush();
                                    return detectWebSwitch(popupWin);
                                }));
                                native_clean.register(awaitRedirectListener.cancel);
                                native_clean.register(detectAppSwitchListener.cancel);
                                native_clean.register(onApproveListener.cancel);
                                native_clean.register(onCancelListener.cancel);
                                native_clean.register(onCompleteListener.cancel);
                                native_clean.register(onErrorListener.cancel);
                                native_clean.register(detectWebSwitchListener.cancel);
                                return awaitRedirectListener.then((function() {
                                    return promises = [ detectAppSwitchListener, detectWebSwitchListener ], new promise_ZalgoPromise((function(resolve, reject) {
                                        for (var _i2 = 0; _i2 < promises.length; _i2++) promises[_i2].then(resolve, reject);
                                    }));
                                    var promises;
                                }));
                            }({
                                sessionUID: sessionUID
                            });
                        })).catch((function(err) {
                            return close().then((function() {
                                var _getLogger$error$trac2;
                                logger_getLogger().error("native_error", {
                                    err: stringifyError(err)
                                }).track((_getLogger$error$trac2 = {}, _getLogger$error$trac2.transition_name = "native_app_switch_ack", 
                                _getLogger$error$trac2.ext_error_code = "native_error", _getLogger$error$trac2.ext_error_desc = stringifyErrorMessage(err), 
                                _getLogger$error$trac2)).flush();
                                throw err;
                            }));
                        }));
                    },
                    start: promiseNoop,
                    close: close
                };
            },
            spinner: !0
        }, checkout, {
            name: "honey",
            setup: function() {
                try {
                    window.top.postMessage(JSON.stringify({
                        message_source: "smart_payment_buttons",
                        message_name: "identify_extension"
                    }), "*");
                } catch (err) {
                    logger_getLogger().warn("honey_postmessage_failed", {
                        err: stringifyError(err)
                    });
                }
                window.addEventListener("message", (function(_ref) {
                    var data = _ref.data;
                    try {
                        data = JSON.parse(data);
                    } catch (err) {
                        return;
                    }
                    if (data) {
                        var message_data = data.message_data;
                        if ("honey_extension" === data.message_source && "identify_extension" === data.message_name) {
                            var _getLogger$info$track;
                            var device_id = message_data.device_id, session_id = message_data.session_id;
                            logger_getLogger().addTrackingBuilder((function() {
                                var _ref2;
                                return (_ref2 = {}).honey_device_id = device_id, _ref2.honey_session_id = session_id, 
                                _ref2;
                            }));
                            logger_getLogger().info("identify_honey").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "honey_identify", 
                            _getLogger$info$track)).flush();
                        }
                    }
                }));
            },
            isEligible: function() {
                return !0;
            },
            isPaymentEligible: function() {
                return !1;
            },
            init: function() {
                throw new Error("Not Implemented");
            },
            inline: !0
        } ];
        function getPaymentFlow(_ref2) {
            var props = _ref2.props, payment = _ref2.payment, config = _ref2.config, serviceData = _ref2.serviceData;
            for (var _i2 = 0; _i2 < PAYMENT_FLOWS.length; _i2++) {
                var flow = PAYMENT_FLOWS[_i2];
                if (flow.isEligible({
                    props: props,
                    config: config,
                    serviceData: serviceData
                }) && flow.isPaymentEligible({
                    props: props,
                    payment: payment,
                    config: config,
                    serviceData: serviceData
                })) return flow;
            }
            throw new Error("Could not find eligible payment flow");
        }
        try {
            if (!window.paypal) {
                var button_script = [].slice.call(document.querySelectorAll("script")).find((function(el) {
                    return el.getAttribute("data-namespace");
                }));
                button_script && (window.paypal = window[button_script.getAttribute("data-namespace")]);
            }
        } catch (err) {}
        function setupButton(opts) {
            if (!window.paypal) throw new Error("PayPal SDK not loaded");
            var facilitatorAccessToken = opts.facilitatorAccessToken, fundingEligibility = opts.fundingEligibility, serverCSPNonce = opts.cspNonce, firebaseConfig = opts.firebaseConfig, _opts$correlationID = opts.correlationID, buttonCorrelationID = void 0 === _opts$correlationID ? "" : _opts$correlationID;
            var clientID = window.xprops.clientID;
            var serviceData = getServiceData({
                eligibility: opts.eligibility,
                facilitatorAccessToken: facilitatorAccessToken,
                buyerGeoCountry: opts.buyerCountry,
                serverMerchantID: opts.merchantID,
                fundingEligibility: fundingEligibility,
                cookies: opts.cookies,
                sdkMeta: opts.sdkMeta,
                buyerAccessToken: opts.buyerAccessToken,
                wallet: opts.wallet,
                content: opts.content
            });
            var merchantID = serviceData.merchantID;
            var props = getProps({
                facilitatorAccessToken: facilitatorAccessToken
            });
            var env = props.env, sessionID = props.sessionID, partnerAttributionID = props.partnerAttributionID, commit = props.commit, sdkCorrelationID = props.sdkCorrelationID, locale = props.locale, buttonSessionID = props.buttonSessionID, merchantDomain = props.merchantDomain, onInit = props.onInit, getPrerenderDetails = props.getPrerenderDetails, rememberFunding = props.rememberFunding, getQueriedEligibleFunding = props.getQueriedEligibleFunding, style = props.style, fundingSource = props.fundingSource, intent = props.intent, createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription;
            var config = getConfig({
                serverCSPNonce: serverCSPNonce,
                firebaseConfig: firebaseConfig
            });
            var version = config.version;
            var components = getComponents();
            var _onInit = onInit({
                correlationID: buttonCorrelationID
            }), initPromise = _onInit.initPromise, isEnabled = _onInit.isEnabled;
            var paymentProcessing = !1;
            function initiatePayment(_ref) {
                var payment = _ref.payment, paymentProps = _ref.props;
                return promise_ZalgoPromise.try((function() {
                    if (!paymentProcessing) {
                        var win = payment.win, paymentFundingSource = payment.fundingSource;
                        var onClick = paymentProps.onClick;
                        var smartFields = function(fundingSource) {
                            try {
                                for (var _i2 = 0, _getAllFramesInWindow2 = function(win) {
                                    var top = getTop(win);
                                    if (!top) throw new Error("Can not determine top window");
                                    var result = [].concat(getAllChildFrames(top), [ top ]);
                                    -1 === result.indexOf(win) && (result = [].concat(result, [ win ], getAllChildFrames(win)));
                                    return result;
                                }(window); _i2 < _getAllFramesInWindow2.length; _i2++) {
                                    var win = _getAllFramesInWindow2[_i2];
                                    if (isSameDomain(win) && win.exports && "smart-fields" === win.exports.name && win.exports.fundingSource === fundingSource) return win.exports;
                                }
                            } catch (err) {}
                        }(paymentFundingSource);
                        if (!smartFields || smartFields.isValid()) {
                            onClick && onClick({
                                fundingSource: paymentFundingSource
                            });
                            if (isEnabled()) {
                                paymentProcessing = !0;
                                return function(_ref3) {
                                    var payment = _ref3.payment, serviceData = _ref3.serviceData, config = _ref3.config, components = _ref3.components, props = _ref3.props, smartFields = _ref3.smartFields;
                                    var button = payment.button, fundingSource = payment.fundingSource, instrumentType = payment.instrumentType;
                                    return promise_ZalgoPromise.try((function() {
                                        var _getLogger$info$info$;
                                        var merchantID = serviceData.merchantID;
                                        var clientID = props.clientID, onClick = props.onClick, createOrder = props.createOrder, env = props.env, vault = props.vault;
                                        var _getPaymentFlow = getPaymentFlow({
                                            props: props,
                                            payment: payment,
                                            config: config,
                                            components: components,
                                            serviceData: serviceData
                                        }), name = _getPaymentFlow.name, inline = _getPaymentFlow.inline, spinner = _getPaymentFlow.spinner, updateFlowClientConfig = _getPaymentFlow.updateFlowClientConfig;
                                        var _init = (0, _getPaymentFlow.init)({
                                            props: props,
                                            config: config,
                                            serviceData: serviceData,
                                            components: components,
                                            payment: payment
                                        }), _init$click = _init.click, start = _init.start, close = _init.close;
                                        var clickPromise = promise_ZalgoPromise.try(void 0 === _init$click ? promiseNoop : _init$click);
                                        clickPromise.catch(src_util_noop);
                                        logger_getLogger().info("button_click").info("button_click_pay_flow_" + name).info("button_click_fundingsource_" + fundingSource).info("button_click_instrument_" + (instrumentType || "default")).track((_getLogger$info$info$ = {}, 
                                        _getLogger$info$info$.transition_name = "process_button_click", _getLogger$info$info$.selected_payment_method = fundingSource, 
                                        _getLogger$info$info$.chosen_fi_type = instrumentType, _getLogger$info$info$.payment_flow = name, 
                                        _getLogger$info$info$)).flush();
                                        return promise_ZalgoPromise.hash({
                                            valid: !onClick || onClick({
                                                fundingSource: fundingSource
                                            })
                                        }).then((function(_ref4) {
                                            if (_ref4.valid) {
                                                spinner && enableLoadingSpinner(button);
                                                var updateClientConfigPromise = createOrder().then((function(orderID) {
                                                    if (updateFlowClientConfig) return updateFlowClientConfig({
                                                        orderID: orderID,
                                                        payment: payment
                                                    });
                                                    updateButtonClientConfig({
                                                        orderID: orderID,
                                                        fundingSource: fundingSource,
                                                        inline: inline
                                                    }).catch((function(err) {
                                                        logger_getLogger().error("update_client_config_error", {
                                                            err: stringifyError(err)
                                                        });
                                                    }));
                                                })).catch(src_util_noop);
                                                var intent = props.intent, currency = props.currency;
                                                var startPromise = promise_ZalgoPromise.try((function() {
                                                    return updateClientConfigPromise;
                                                })).then((function() {
                                                    return start();
                                                }));
                                                var validateOrderPromise = createOrder().then((function(orderID) {
                                                    return function(orderID, _ref3) {
                                                        var env = _ref3.env, clientID = _ref3.clientID, merchantID = _ref3.merchantID, currency = _ref3.currency, intent = _ref3.intent, vault = _ref3.vault;
                                                        var logger = logger_getLogger();
                                                        return getSupplementalOrderInfo(orderID).then((function(order) {
                                                            var cart = order.checkoutSession.cart;
                                                            var cartIntent = "sale" === cart.intent.toLowerCase() ? "capture" : cart.intent.toLowerCase();
                                                            var cartCurrency = cart.amounts && cart.amounts.total.currencyCode;
                                                            var cartAmount = cart.amounts && cart.amounts.total.currencyValue;
                                                            var cartBillingType = cart.billingType;
                                                            cartIntent !== intent && -1 !== VALIDATE_INTENTS.indexOf(intent) && triggerIntegrationError({
                                                                error: "smart_button_validation_error_incorrect_intent",
                                                                message: "Expected intent from order api call to be " + intent + ", got " + cartIntent + ". Please ensure you are passing intent=" + cartIntent + " to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/",
                                                                loggerPayload: {
                                                                    cartIntent: cartIntent,
                                                                    intent: intent
                                                                },
                                                                env: env,
                                                                clientID: clientID,
                                                                orderID: orderID
                                                            });
                                                            cartCurrency && cartCurrency !== currency && triggerIntegrationError({
                                                                error: "smart_button_validation_error_incorrect_currency",
                                                                message: "Expected currency from order api call to be " + currency + ", got " + cartCurrency + ". Please ensure you are passing currency=" + cartCurrency + " to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/",
                                                                loggerPayload: {
                                                                    cartCurrency: cartCurrency,
                                                                    currency: currency
                                                                },
                                                                env: env,
                                                                clientID: clientID,
                                                                orderID: orderID
                                                            });
                                                            merchantID && 0 !== merchantID.length || triggerIntegrationError({
                                                                error: "smart_button_validation_error_no_merchant_id",
                                                                message: "Could not determine correct merchant id",
                                                                env: env,
                                                                clientID: clientID,
                                                                orderID: orderID
                                                            });
                                                            cartBillingType && !vault && triggerIntegrationError({
                                                                error: "smart_button_validation_error_billing_" + (cartAmount ? "with" : "without") + "_purchase_no_vault",
                                                                message: "Expected vault=" + VAULT.TRUE.toString() + " for a billing transaction",
                                                                env: env,
                                                                clientID: clientID,
                                                                orderID: orderID,
                                                                loggerPayload: {
                                                                    cartBillingType: cartBillingType,
                                                                    vault: vault
                                                                },
                                                                throwError: !1
                                                            });
                                                            !vault || cartBillingType || window.xprops.createBillingAgreement || window.xprops.createSubscription || window.xprops.clientAccessToken || window.xprops.userIDToken || triggerIntegrationError({
                                                                error: "smart_button_validation_error_vault_passed_not_needed",
                                                                message: "Expected vault=" + VAULT.FALSE.toString() + " for a non-billing, non-subscription transaction",
                                                                env: env,
                                                                clientID: clientID,
                                                                orderID: orderID,
                                                                loggerPayload: {
                                                                    vault: vault,
                                                                    cartBillingType: cartBillingType
                                                                },
                                                                throwError: !1
                                                            });
                                                            cartBillingType && !cartAmount && "tokenize" !== intent && triggerIntegrationError({
                                                                error: "smart_button_validation_error_billing_without_purchase_intent_tokenize_not_passed",
                                                                message: "Expected intent=tokenize for a billing-without-purchase transaction",
                                                                env: env,
                                                                clientID: clientID,
                                                                orderID: orderID,
                                                                loggerPayload: {
                                                                    vault: vault,
                                                                    cartBillingType: cartBillingType,
                                                                    cartAmount: cartAmount
                                                                },
                                                                throwError: !1
                                                            });
                                                            var payees = order.checkoutSession.payees;
                                                            if (!payees) return triggerIntegrationError({
                                                                error: "smart_button_validation_error_supplemental_order_missing_payees",
                                                                env: env,
                                                                clientID: clientID,
                                                                orderID: orderID,
                                                                throwError: !1
                                                            });
                                                            if (!payees.length) return triggerIntegrationError({
                                                                error: "smart_button_validation_error_supplemental_order_no_payees",
                                                                env: env,
                                                                clientID: clientID,
                                                                orderID: orderID,
                                                                throwError: !1
                                                            });
                                                            var dict = {};
                                                            var uniquePayees = [];
                                                            for (var _i2 = 0; _i2 < payees.length; _i2++) {
                                                                var payee = payees[_i2];
                                                                if (!(payee.merchantId || payee.email && payee.email.stringValue)) return triggerIntegrationError({
                                                                    error: "smart_button_validation_error_supplemental_order_missing_values",
                                                                    env: env,
                                                                    clientID: clientID,
                                                                    orderID: orderID,
                                                                    loggerPayload: {
                                                                        payees: JSON.stringify(payees)
                                                                    },
                                                                    throwError: !1
                                                                });
                                                                if (payee.merchantId) {
                                                                    if (!dict[payee.merchantId]) {
                                                                        dict[payee.merchantId] = 1;
                                                                        uniquePayees.push(payee);
                                                                    }
                                                                } else if (payee.email && payee.email.stringValue && !dict[payee.email.stringValue]) {
                                                                    dict[payee.email.stringValue] = 1;
                                                                    uniquePayees.push(payee);
                                                                }
                                                            }
                                                            var payeesStr = uniquePayees.map((function(payee) {
                                                                if (payee.merchantId) return payee.merchantId;
                                                                if (payee.email && payee.email.stringValue) return payee.email.stringValue;
                                                                triggerIntegrationError({
                                                                    error: "smart_button_validation_error_invalid_payee_state",
                                                                    message: "Invalid payee state: " + JSON.stringify(uniquePayees),
                                                                    loggerPayload: {
                                                                        uniquePayees: JSON.stringify(uniquePayees)
                                                                    },
                                                                    env: env,
                                                                    clientID: clientID,
                                                                    orderID: orderID
                                                                });
                                                                throw new Error("Payees Incorrect");
                                                            })).join(",");
                                                            var xpropMerchantID = window.xprops.merchantID;
                                                            if (xpropMerchantID && xpropMerchantID.length) isValidMerchantIDs(xpropMerchantID, uniquePayees) || triggerIntegrationError(1 === uniquePayees.length ? {
                                                                error: "smart_button_validation_error_payee_no_match",
                                                                message: "Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing merchant-id=" + payeesStr + " or merchant-id=" + (uniquePayees[0] && uniquePayees[0].email && uniquePayees[0].email.stringValue ? uniquePayees[0].email.stringValue : "payee@merchant.com") + " to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/",
                                                                env: env,
                                                                clientID: clientID,
                                                                orderID: orderID
                                                            } : {
                                                                error: "smart_button_validation_error_payee_no_match",
                                                                message: 'Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing merchant-id=* to the sdk url and data-merchant-id="' + payeesStr + '" in the sdk script tag. https://developer.paypal.com/docs/checkout/reference/customize-sdk/',
                                                                env: env,
                                                                clientID: clientID,
                                                                orderID: orderID
                                                            }); else if (!isValidMerchantIDs(merchantID, uniquePayees)) {
                                                                logger.warn("smart_button_validation_error_derived_payee_transaction_mismatch", {
                                                                    payees: JSON.stringify(uniquePayees),
                                                                    merchantID: JSON.stringify(merchantID)
                                                                });
                                                                if (1 === uniquePayees.length) {
                                                                    "sandbox" === env && logger.warn("smart_button_validation_error_derived_payee_transaction_mismatch_sandbox", {
                                                                        payees: JSON.stringify(payees),
                                                                        merchantID: JSON.stringify(merchantID)
                                                                    });
                                                                    triggerIntegrationError({
                                                                        error: "smart_button_validation_error_payee_no_match",
                                                                        message: "Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing merchant-id=" + payeesStr + " or merchant-id=" + (uniquePayees[0] && uniquePayees[0].email && uniquePayees[0].email.stringValue ? uniquePayees[0].email.stringValue : "payee@merchant.com") + " to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/",
                                                                        env: env,
                                                                        clientID: clientID,
                                                                        orderID: orderID,
                                                                        throwError: !1
                                                                    });
                                                                } else triggerIntegrationError({
                                                                    error: "smart_button_validation_error_payee_no_match",
                                                                    message: 'Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing merchant-id=* to the sdk url and data-merchant-id="' + payeesStr + '" in the sdk script tag. https://developer.paypal.com/docs/checkout/reference/customize-sdk/',
                                                                    env: env,
                                                                    clientID: clientID,
                                                                    orderID: orderID
                                                                });
                                                            }
                                                        }));
                                                    }(orderID, {
                                                        env: env,
                                                        clientID: clientID,
                                                        merchantID: merchantID,
                                                        intent: intent,
                                                        currency: currency,
                                                        vault: vault
                                                    });
                                                }));
                                                var confirmOrderPromise = smartFields && smartFields.confirm && createOrder().then(smartFields.confirm);
                                                return promise_ZalgoPromise.all([ clickPromise, startPromise, validateOrderPromise, confirmOrderPromise ]).catch((function(err) {
                                                    return promise_ZalgoPromise.try(close).then((function() {
                                                        throw err;
                                                    }));
                                                })).then(src_util_noop);
                                            }
                                        }));
                                    })).finally((function() {
                                        disableLoadingSpinner(button);
                                    }));
                                }({
                                    payment: payment,
                                    config: config,
                                    serviceData: serviceData,
                                    components: components,
                                    props: paymentProps,
                                    smartFields: smartFields
                                }).finally((function() {
                                    paymentProcessing = !1;
                                }));
                            }
                            win && win.close();
                        } else win && win.close();
                    }
                })).catch((function(err) {
                    var _getLogger$info$track;
                    logger_getLogger().info("smart_buttons_payment_error", {
                        err: stringifyError(err)
                    }).track(((_getLogger$info$track = {}).ext_error_code = "smart_buttons_payment_error", 
                    _getLogger$info$track.ext_error_desc = stringifyErrorMessage(err), _getLogger$info$track));
                    throw err;
                }));
            }
            menu_menu = null;
            querySelectorAll("[ data-funding-source ]").forEach((function(button) {
                var menuToggle = function(button) {
                    var menu = button.querySelector("[data-menu]");
                    if (menu) return menu;
                    var parent = button.parentNode;
                    parent && (menu = parent.querySelector("[data-menu]"));
                    return menu || void 0;
                }(button);
                var _getSelectedFunding = function(button) {
                    var fundingSource = button.getAttribute("data-funding-source");
                    var paymentMethodID = button.getAttribute("data-payment-method-id");
                    var instrumentID = button.getAttribute("data-instrument-id");
                    var instrumentType = button.getAttribute("data-instrument-type");
                    return {
                        fundingSource: fundingSource,
                        card: button.getAttribute("data-card"),
                        paymentMethodID: paymentMethodID,
                        instrumentID: instrumentID,
                        instrumentType: instrumentType
                    };
                }(button);
                var payment = {
                    button: button,
                    menuToggle: menuToggle,
                    fundingSource: _getSelectedFunding.fundingSource,
                    card: _getSelectedFunding.card,
                    paymentMethodID: _getSelectedFunding.paymentMethodID,
                    instrumentID: _getSelectedFunding.instrumentID,
                    instrumentType: _getSelectedFunding.instrumentType,
                    isClick: !0,
                    buyerIntent: "pay"
                };
                onFocus = function onFocus(event) {
                    el.removeEventListener("focus", onFocus);
                    event.preventDefault();
                    el.blur();
                    return !1;
                }, (el = button).addEventListener("mousedown", (function() {
                    el.addEventListener("focus", onFocus);
                    setTimeout((function() {
                        el.removeEventListener("focus", onFocus);
                    }), 1);
                }));
                var el, onFocus;
                dom_onClick(button, (function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var paymentProps = getProps({
                        facilitatorAccessToken: facilitatorAccessToken
                    });
                    var payPromise = initiatePayment({
                        payment: payment,
                        props: paymentProps
                    });
                    var onError = paymentProps.onError;
                    payPromise.catch((function(err) {
                        logger_getLogger().error("click_initiate_payment_reject", {
                            err: stringifyError(err)
                        }).flush();
                        onError(err);
                    }));
                    button.payPromise = payPromise;
                }));
                if (menuToggle) {
                    !function(_ref2) {
                        var props = _ref2.props;
                        var clientID = props.clientID;
                        clientID && renderButtonSmartMenu({
                            containerUID: props.uid,
                            clientID: clientID,
                            Menu: _ref2.components.Menu
                        });
                    }({
                        props: props,
                        components: components
                    });
                    dom_onClick(menuToggle, (function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        var menuPromise = function(_ref2) {
                            var payment = _ref2.payment;
                            return promise_ZalgoPromise.try((function() {
                                if (!paymentProcessing) return isEnabled() ? function(_ref5) {
                                    var payment = _ref5.payment, serviceData = _ref5.serviceData, config = _ref5.config, components = _ref5.components, props = _ref5.props;
                                    return promise_ZalgoPromise.try((function() {
                                        var _getLogger$info$info$2;
                                        var fundingSource = payment.fundingSource, button = payment.button;
                                        var _getPaymentFlow2 = getPaymentFlow({
                                            props: props,
                                            payment: payment,
                                            config: config,
                                            components: components,
                                            serviceData: serviceData
                                        }), name = _getPaymentFlow2.name, setupMenu = _getPaymentFlow2.setupMenu;
                                        if (!setupMenu) throw new Error(name + " does not support menu");
                                        logger_getLogger().info("menu_click").info("pay_flow_" + name).track((_getLogger$info$info$2 = {}, 
                                        _getLogger$info$info$2.transition_name = "process_menu_click", _getLogger$info$info$2.selected_payment_method = fundingSource, 
                                        _getLogger$info$info$2.payment_flow = name, _getLogger$info$info$2)).flush();
                                        var choices = setupMenu({
                                            props: props,
                                            payment: payment,
                                            serviceData: serviceData,
                                            components: components,
                                            config: config
                                        }).map((function(choice) {
                                            return _extends({}, choice, {
                                                onSelect: function() {
                                                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                                                    choice.spinner && enableLoadingSpinner(button);
                                                    return promise_ZalgoPromise.try((function() {
                                                        return choice.onSelect.apply(choice, args);
                                                    })).then((function() {
                                                        choice.spinner && disableLoadingSpinner(button);
                                                    }));
                                                }
                                            });
                                        }));
                                        return function(_ref3) {
                                            var props = _ref3.props, payment = _ref3.payment, choices = _ref3.choices;
                                            var clientID = props.clientID, containerUID = props.uid;
                                            var button = payment.button, menuToggle = payment.menuToggle;
                                            var Menu = _ref3.components.Menu;
                                            if (!clientID) throw new Error("Can not render menu without client id");
                                            var smartMenu = menu_menu || renderButtonSmartMenu({
                                                containerUID: containerUID,
                                                clientID: clientID,
                                                Menu: Menu
                                            });
                                            menu_menu = smartMenu;
                                            var loadingTimeout = setTimeout((function() {
                                                return enableLoadingSpinner(button);
                                            }), 50);
                                            var updateProps = function() {
                                                return smartMenu.updateProps({
                                                    clientID: clientID,
                                                    choices: choices,
                                                    verticalOffset: button.getBoundingClientRect().bottom,
                                                    onFocusFail: onFocusFail,
                                                    onBlur: onBlur
                                                });
                                            };
                                            window.addEventListener("resize", updateProps);
                                            var onBlur = function() {
                                                smartMenu.hide();
                                                window.removeEventListener("resize", updateProps);
                                            };
                                            var onFocusFail = function() {
                                                menuToggle && menuToggle.addEventListener("blur", (function blur() {
                                                    menuToggle.removeEventListener("blur", blur);
                                                    onBlur();
                                                }));
                                            };
                                            return updateProps().then((function() {
                                                return smartMenu.show();
                                            })).then((function() {
                                                disableLoadingSpinner(button);
                                            })).finally((function() {
                                                clearTimeout(loadingTimeout);
                                            }));
                                        }({
                                            props: props,
                                            payment: payment,
                                            components: components,
                                            choices: choices
                                        });
                                    }));
                                }({
                                    payment: payment,
                                    config: config,
                                    serviceData: serviceData,
                                    components: components,
                                    props: props
                                }) : void 0;
                            })).catch((function(err) {
                                var _getLogger$info$track2;
                                logger_getLogger().info("smart_buttons_payment_error", {
                                    err: stringifyError(err)
                                }).track(((_getLogger$info$track2 = {}).ext_error_code = "smart_buttons_payment_error", 
                                _getLogger$info$track2.ext_error_desc = stringifyErrorMessage(err), _getLogger$info$track2));
                                throw err;
                            }));
                        }({
                            payment: payment
                        });
                        button.menuPromise = menuPromise;
                    }));
                }
            }));
            var setupPrerenderTask = initPromise.then((function() {
                return promise_ZalgoPromise.hash({
                    prerenderDetails: getPrerenderDetails(),
                    initPromise: initPromise
                }).then((function(_ref3) {
                    var prerenderDetails = _ref3.prerenderDetails;
                    if (prerenderDetails) {
                        var win = prerenderDetails.win, paymentFundingSource = prerenderDetails.fundingSource, card = prerenderDetails.card;
                        var button = document.querySelector("[data-funding-source=" + paymentFundingSource + "]");
                        if (!button) throw new Error("Can not find button element");
                        var paymentProps = getProps({
                            facilitatorAccessToken: facilitatorAccessToken
                        });
                        var payPromise = initiatePayment({
                            payment: {
                                win: win,
                                button: button,
                                fundingSource: paymentFundingSource,
                                card: card,
                                buyerIntent: "pay"
                            },
                            props: paymentProps
                        });
                        var onError = paymentProps.onError;
                        payPromise.catch((function(err) {
                            logger_getLogger().error("prerender_initiate_payment_reject", {
                                err: stringifyError(err)
                            }).flush();
                            onError(err);
                        }));
                        button.payPromise = payPromise;
                    }
                }));
            }));
            var setupRememberTask = function(_ref) {
                var rememberFunding = _ref.rememberFunding, fundingEligibility = _ref.fundingEligibility;
                return promise_ZalgoPromise.try((function() {
                    if (fundingEligibility && fundingEligibility.venmo && fundingEligibility.venmo.eligible) return rememberFunding([ "venmo" ]);
                }));
            }({
                rememberFunding: rememberFunding,
                fundingEligibility: fundingEligibility
            });
            var setupButtonLogsTask = function(_ref) {
                var env = _ref.env, sessionID = _ref.sessionID, buttonSessionID = _ref.buttonSessionID, clientID = _ref.clientID, partnerAttributionID = _ref.partnerAttributionID, commit = _ref.commit, sdkCorrelationID = _ref.sdkCorrelationID, buttonCorrelationID = _ref.buttonCorrelationID, locale = _ref.locale, merchantID = _ref.merchantID, merchantDomain = _ref.merchantDomain, version = _ref.version, style = _ref.style, fundingSource = _ref.fundingSource, getQueriedEligibleFunding = _ref.getQueriedEligibleFunding;
                var logger = logger_getLogger();
                !function(_ref) {
                    var env = _ref.env, sessionID = _ref.sessionID, clientID = _ref.clientID, partnerAttributionID = _ref.partnerAttributionID, commit = _ref.commit, sdkCorrelationID = _ref.sdkCorrelationID, locale = _ref.locale, merchantID = _ref.merchantID, merchantDomain = _ref.merchantDomain, version = _ref.version;
                    var logger = logger_getLogger();
                    logger.addPayloadBuilder((function() {
                        return {
                            referer: window.location.host,
                            sdkCorrelationID: sdkCorrelationID,
                            sessionID: sessionID,
                            env: env
                        };
                    }));
                    logger.addTrackingBuilder((function() {
                        var _ref2;
                        var lang = locale.lang, country = locale.country;
                        return (_ref2 = {}).feed_name = "payments_sdk", _ref2.serverside_data_source = "checkout", 
                        _ref2.client_id = clientID, _ref2.seller_id = merchantID[0], _ref2.page_session_id = sessionID, 
                        _ref2.referer_url = window.location.host, _ref2.merchant_domain = merchantDomain, 
                        _ref2.locale = lang + "_" + country, _ref2.integration_identifier = clientID, _ref2.bn_code = partnerAttributionID, 
                        _ref2.sdk_name = "payments_sdk", _ref2.sdk_version = version, _ref2.user_agent = window.navigator && window.navigator.userAgent, 
                        _ref2.user_action = commit ? "commit" : "continue", _ref2.context_correlation_id = sdkCorrelationID, 
                        _ref2;
                    }));
                    promise_ZalgoPromise.onPossiblyUnhandledException((function(err) {
                        var _logger$track;
                        logger.track(((_logger$track = {}).ext_error_code = "payments_sdk_error", _logger$track.ext_error_desc = stringifyErrorMessage(err), 
                        _logger$track));
                        logger.error("unhandled_error", {
                            err: stringifyError(err)
                        });
                        logger.flush().catch(src_util_noop);
                    }));
                }({
                    env: env,
                    sessionID: sessionID,
                    clientID: clientID,
                    partnerAttributionID: partnerAttributionID,
                    commit: commit,
                    sdkCorrelationID: sdkCorrelationID,
                    locale: locale,
                    merchantID: merchantID,
                    merchantDomain: merchantDomain,
                    version: version
                });
                logger.addPayloadBuilder((function() {
                    return {
                        buttonSessionID: buttonSessionID,
                        buttonCorrelationID: buttonCorrelationID
                    };
                }));
                logger.addTrackingBuilder((function() {
                    var _ref2;
                    return (_ref2 = {}).state_name = "smart_button", _ref2.context_type = "button_session_id", 
                    _ref2.context_id = buttonSessionID, _ref2.state_name = "smart_button", _ref2.button_session_id = buttonSessionID, 
                    _ref2.button_version = "2.0.341", _ref2.button_correlation_id = buttonCorrelationID, 
                    _ref2;
                }));
                (function() {
                    if (window.document.documentMode) try {
                        var status = window.status;
                        window.status = "testIntranetMode";
                        if ("testIntranetMode" === window.status) {
                            window.status = status;
                            return !0;
                        }
                        return !1;
                    } catch (err) {
                        return !1;
                    }
                    return !1;
                })() && logger.warn("button_child_intranet_mode");
                return promise_ZalgoPromise.hash({
                    pageRenderTime: waitForDocumentReady().then((function() {
                        var performance = getPerformance();
                        if (performance) {
                            var timing = performance.timing;
                            return timing.connectEnd && timing.domInteractive ? timing.domInteractive - timing.connectEnd : void 0;
                        }
                    })),
                    queriedEligibleFunding: getQueriedEligibleFunding()
                }).then((function(_ref3) {
                    var _logger$track;
                    var pageRenderTime = _ref3.pageRenderTime, queriedEligibleFunding = _ref3.queriedEligibleFunding;
                    var fundingSources = querySelectorAll("[data-funding-source]").map((function(el) {
                        return el.getAttribute("data-funding-source");
                    })).filter(Boolean);
                    var walletInstruments = querySelectorAll("[data-instrument-type]").map((function(el) {
                        return el.getAttribute("data-instrument-type");
                    })).filter(Boolean);
                    var payNow = querySelectorAll("[data-funding-source]").map((function(el) {
                        return el.getAttribute("data-pay-now");
                    })).some(Boolean);
                    var layout = style.layout, color = style.color, shape = style.shape, label = style.label, _style$tagline = style.tagline, tagline = void 0 === _style$tagline || _style$tagline;
                    logger.info("button_render");
                    logger.info("button_render_template_version_" + (document.body && document.body.getAttribute("data-render-version") || "unknown").replace(/[^a-zA-Z0-9]+/g, "_"));
                    logger.info("button_render_client_version_" + (document.body && document.body.getAttribute("data-client-version") || "unknown").replace(/[^a-zA-Z0-9]+/g, "_"));
                    logger.info("button_render_color_" + color);
                    logger.info("button_render_shape_" + shape);
                    logger.info("button_render_label_" + label);
                    logger.info("button_render_layout_" + layout);
                    logger.info("button_render_tagline_" + tagline.toString());
                    logger.info("button_render_funding_count_" + fundingSources.length);
                    logger.info("button_render_wallet_instrument_count_" + walletInstruments.length);
                    for (var _i2 = 0; _i2 < walletInstruments.length; _i2++) logger.info("button_render_wallet_instrument_" + walletInstruments[_i2]);
                    logger.track(((_logger$track = {}).transition_name = "process_button_load", _logger$track.eligible_payment_methods = fundingSources.join(":"), 
                    _logger$track.fi_list = walletInstruments.join(":"), _logger$track.merchant_selected_funding_source = fundingSource, 
                    _logger$track.eligible_payment_count = fundingSources.length.toString(), _logger$track.page_load_time = pageRenderTime ? pageRenderTime.toString() : "", 
                    _logger$track.potential_payment_methods = queriedEligibleFunding.join(":"), _logger$track.pay_now = payNow.toString(), 
                    _logger$track.button_layout = layout, _logger$track.button_color = color, _logger$track.button_size = "responsive", 
                    _logger$track.button_shape = shape, _logger$track.button_label = label, _logger$track.button_width = window.innerWidth, 
                    _logger$track.button_type = "iframe", _logger$track.button_tagline_enabled = tagline ? "1" : "0", 
                    _logger$track));
                    logger.flush();
                }));
            }({
                style: style,
                env: env,
                version: version,
                sessionID: sessionID,
                clientID: clientID,
                partnerAttributionID: partnerAttributionID,
                commit: commit,
                sdkCorrelationID: sdkCorrelationID,
                buttonCorrelationID: buttonCorrelationID,
                locale: locale,
                merchantID: merchantID,
                buttonSessionID: buttonSessionID,
                merchantDomain: merchantDomain,
                fundingSource: fundingSource,
                getQueriedEligibleFunding: getQueriedEligibleFunding
            });
            var setupPaymentFlowsTask = function(_ref) {
                var props = _ref.props, config = _ref.config, serviceData = _ref.serviceData, components = _ref.components;
                return promise_ZalgoPromise.all(PAYMENT_FLOWS.map((function(flow) {
                    return flow.isEligible({
                        props: props,
                        config: config,
                        serviceData: serviceData
                    }) ? flow.setup({
                        props: props,
                        config: config,
                        serviceData: serviceData,
                        components: components
                    }) : null;
                }))).then(src_util_noop);
            }({
                props: props,
                config: config,
                serviceData: serviceData,
                components: components
            });
            var validatePropsTask = setupButtonLogsTask.then((function() {
                return function(_ref2) {
                    var env = _ref2.env, clientID = _ref2.clientID, intent = _ref2.intent, createBillingAgreement = _ref2.createBillingAgreement, createSubscription = _ref2.createSubscription;
                    var logger = logger_getLogger();
                    createBillingAgreement && "tokenize" !== intent && triggerIntegrationError({
                        error: "smart_button_validation_error_expected_intent_tokenize",
                        message: "Expected intent=tokenize to be passed to SDK with createBillingAgreement, but got intent=" + intent,
                        env: env,
                        clientID: clientID,
                        loggerPayload: {
                            intent: intent
                        },
                        throwError: !1
                    });
                    createSubscription && "subscription" !== intent && triggerIntegrationError({
                        error: "smart_button_validation_error_expected_intent_subscription",
                        message: "Expected intent=subscription to be passed to SDK with createSubscription, but got intent=" + intent,
                        env: env,
                        clientID: clientID,
                        loggerPayload: {
                            intent: intent
                        },
                        throwError: !1
                    });
                    logger.flush();
                }({
                    env: env,
                    clientID: clientID,
                    intent: intent,
                    createBillingAgreement: createBillingAgreement,
                    createSubscription: createSubscription
                });
            }));
            return promise_ZalgoPromise.hash({
                initPromise: initPromise,
                facilitatorAccessToken: facilitatorAccessToken,
                setupButtonLogsTask: setupButtonLogsTask,
                setupPrerenderTask: setupPrerenderTask,
                setupRememberTask: setupRememberTask,
                setupPaymentFlowsTask: setupPaymentFlowsTask,
                validatePropsTask: validatePropsTask
            }).then(src_util_noop);
        }
    }
});