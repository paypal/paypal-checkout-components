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
    return __webpack_require__(__webpack_require__.s = 0);
}([ function(module, __webpack_exports__, __webpack_require__) {
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
                            throw err;
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
            return ZalgoPromise.all(Object.keys(promises).map((function(key) {
                return ZalgoPromise.resolve(promises[key]).then((function(value) {
                    result[key] = value;
                }));
            }))).then((function() {
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
        for (var _i7 = 0, _getAllChildFrames4 = function getAllChildFrames(win) {
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
        }(win); _i7 < _getAllChildFrames4.length; _i7++) {
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
    function uniqueID() {
        var chars = "0123456789abcdef";
        return "xxxxxxxxxx".replace(/./g, (function() {
            return chars.charAt(Math.floor(Math.random() * chars.length));
        })) + "_" + function(str) {
            if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            })));
            if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64");
            throw new Error("Can not find window.btoa or Buffer");
        }((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
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
    var memoizedFunctions = [];
    function memoize(method, options) {
        var _this = this;
        void 0 === options && (options = {});
        var cacheMap = new weakmap_CrossDomainSafeWeakMap;
        var memoizedFunction = function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            var cache = cacheMap.getOrSet(options.thisNamespace ? this : method, (function() {
                return {};
            }));
            var key = serializeArgs(args);
            var cacheTime = options.time;
            cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime && delete cache[key];
            if (cache[key]) return cache[key].value;
            var time = Date.now();
            var value = method.apply(this, arguments);
            cache[key] = {
                time: time,
                value: value
            };
            return cache[key].value;
        };
        memoizedFunction.reset = function() {
            cacheMap.delete(options.thisNamespace ? _this : method);
        };
        memoizedFunctions.push(memoizedFunction);
        return setFunctionName(memoizedFunction, (options.name || getFunctionName(method)) + "::memoized");
    }
    memoize.clear = function() {
        for (var _i2 = 0; _i2 < memoizedFunctions.length; _i2++) memoizedFunctions[_i2].reset();
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
    function objFilter(obj, filter) {
        void 0 === filter && (filter = Boolean);
        var result = {};
        for (var key in obj) obj.hasOwnProperty(key) && filter(obj[key], key) && (result[key] = obj[key]);
        return result;
    }
    function arrayFrom(item) {
        return [].slice.call(item);
    }
    function isDocumentReady() {
        return Boolean(document.body) && "complete" === document.readyState;
    }
    function urlEncode(str) {
        return str.replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B");
    }
    function waitForDocumentReady() {
        return inlineMemoize(waitForDocumentReady, (function() {
            return new promise_ZalgoPromise((function(resolve) {
                if (isDocumentReady()) return resolve();
                var interval = setInterval((function() {
                    if (isDocumentReady()) {
                        clearInterval(interval);
                        return resolve();
                    }
                }), 10);
            }));
        }));
    }
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
        }(_extends({}, parseQuery(originalQuery), {}, props)) : originalQuery;
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
        return "undefined" != typeof window;
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
    function PopupOpenError(message) {
        this.message = message;
    }
    PopupOpenError.prototype = Object.create(Error.prototype);
    function destroyElement(element) {
        element && element.parentNode && element.parentNode.removeChild(element);
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
    function unresolvedPromise() {
        return new promise_ZalgoPromise(src_util_noop);
    }
    function promiseNoop() {
        return promise_ZalgoPromise.resolve();
    }
    function sendBeacon(url) {
        var img = document.createElement("img");
        img.src = url;
        img.style.visibility = "hidden";
        img.style.position = "absolute";
        document.body && document.body.appendChild(img);
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
    var AUTO_FLUSH_LEVEL = [ "warn", "error" ];
    var LOG_LEVEL_PRIORITY = [ "error", "warn", "info", "debug" ];
    function httpTransport(_ref) {
        return request({
            url: _ref.url,
            method: _ref.method,
            headers: _ref.headers,
            json: _ref.json
        }).then(src_util_noop);
    }
    function extendIfDefined(target, source) {
        for (var key in source) source.hasOwnProperty(key) && source[key] && !target[key] && (target[key] = source[key]);
    }
    var _NATIVE_CHECKOUT_URI, _NATIVE_CHECKOUT_POPU;
    var ORDERS_API_URL = "/v2/checkout/orders";
    var NATIVE_CHECKOUT_URI = ((_NATIVE_CHECKOUT_URI = {}).paypal = "/smart/checkout/native", 
    _NATIVE_CHECKOUT_URI.venmo = "/smart/checkout/venmo", _NATIVE_CHECKOUT_URI);
    var NATIVE_CHECKOUT_POPUP_URI = ((_NATIVE_CHECKOUT_POPU = {}).paypal = "/smart/checkout/native/popup", 
    _NATIVE_CHECKOUT_POPU.venmo = "/smart/checkout/venmo/popup", _NATIVE_CHECKOUT_POPU);
    var CLIENT_ID_PAYEE_NO_MATCH = [ "Af3YaeRfoJGtncwLeiahT93xTYT0-wldEEaiGehhGspP333r6tADvHeVCwZPR022F4d0YQquv7Lik_PT", "AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb", "AcjM7hAZjUAqIgU0Lvzneb9-_rWs7qAEl6PoPVHtQV5PNmWBihQWsu_SglKO", "Af_pMiA6ikCtlsNB8dJW1oG1ZI7FirXbRU43rDRfq_i_iQAPbYsojeI9Q2VzZvD1u2wKEPuaokZaNWyC", "AQAZZuAP5V0b8Wzs1t3KJM3opK8ueK6Txnlm7pw6kMFHrcAdFogBw3pBmeNP-234aHAZ2BlHeijkU2Tt", "Aef8KpflK3t-pTjstogUtqzAuk1IRGHpkdBTxyTWeARwqXyuRrX5Uj-Bs6KdMwK1g8ZhitjzfJ5jh6K7", "ARcLSr40hevzVXTnnNpHochqg9lsyznO2UugwjyCpt4MPnAmxgyLGC2Ia7aufLH1jS8BhOIZBnXqhOfP", "AYiXLQVgLszolhHbiYAm2HZERgDF5BOPXG7i4m9BNsTTSdmWhVu2Np4_GqDJLrl5VA50VDAlMMpCMArb", "ARbpxmp0udlm2zBPu6bqW6PAMV-UfCTktgWFtJ0cy1rKQUUtIRffwg1A-i0wRyFg9BhbfZM3M6ci6czP", "AeHvO7dLYAlLLnkZWxCTvHgSBMoFRn-bu1Wy9kjEXZVb8wYZPRpEykxDhLQ0WjgUPQz_MeF1e1FnH4mT", "Abi2EEJv7o1v6GKAE1nNVgeNqBWLYXSiDoAKi-ADKU6uRPi_41GJEMr5rjZC8fuQxAC-MVEPYSfYsfzD", "AW9fGl1zpjGSB474VARpj8j0hyEzrwNY7WgJCtwStaVVYkiyixnX4Z3KSe9A0jPLOcKj_2B9lHon1nAR", "ARBlYB7bfFnpO5IgprEW0PqtBSZOn1Q0Jly-3r_IzMEU8sPq0fdNrk1D4JgHAitxDBxfuL6wDpDvTZgU", "AZNQsMt_Ho-GClAUCvZVuKyz-n5rRhZyEBL2yTTetPV-lTqQE2_4quG6-ADlBMZoAgnG-yccas62Hqg2" ];
    var ORDER_VALIDATION_WHITELIST = [ "AWU8hQWR5S8ynvUCz0T-tt2uRPzt7-wcIp_clASLr3KrXNdKcr_iPzgNsk4s3sOG2EzgOyqpeuL9Lt2Q", "AW2HA2wTdlPiJYixm961rEhamyefXVV4Y5CxJnRJGT_AnXVZuWnneEFnnGpDeIUZaCbpz_kwtEjFwo8x", "AU0KZbJCXg9J5OJXJxrUFMaCAkMvvrk-8khEB4vLyq76klYl5RSVGNrX4qh_aERn3Wsx5Vcn2eCPQ1fo", "AUku7YwlQ9LckQ9jBEAoDTOW_l-VyzeS2ZLNS4-kWoEI0Xh5VEFEgda7KeU3Z-bRIcZ4YzkJ6kp4CIZA", "ATyGfjcN1hYSg34FNM2QFpih-UgIKxiE6nC_HR4ifq2auBHxlzm7eFTToF0-GayrwDSNgwDmTYfPNvYD", "ARa44QaubKRAeUZRlkhqkWUAilO7IGlS6qcHJ4RmG6aaDuCAi232yOjfDwWmGJL5rdjvhaA_oHLVo3_y", "AZqSMr_O6WtkSWvp2GF526yJjSyjZsnaqvmp99w2gNJHtKfOdzpnNJiwjTd_yLjdf-wt2DUtJzFw16Bq", "AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb", "AZ27S6mY7iw1toHmoVzye1XwCiOJo_uIMYJIDpUwlTsG2rxTXW8Sl3tjUEwsS0TWGIkEq7CG1zXLLvvK", "Af8k4y06mmyTM4JxdmDUK0PJBR314Yz_nWddC13y5rHawFRREVmueGa0b-MMHl5_jvo6bMM1d7DnM2Uj", "AaRz5Xo5rOOW8Pq0ofvoKD5fb48gaPrKknItbEc1k79KH6z3aPsS5oUfu0uWj7BMuEru5_6jvhjSyvRs", "Aa5QWJGciaqznqahG4ooXiL9FNZuqEcL-vhdCMrb-jIMNAFpiG1SxW1GMcPmS5pQoxrwsOmV2KtNpk1Y", "AfzuuqC32z4_opOaPcCOgB0P112SCvGoJZi-79Yj5WGNoddoDQf7gG_mbGl3tZYJB_XsZ1dHDDgzhkH7", "AQ6b-BBBspp77ZytI3Hj0FKpACemsrXhu0Gds7ubWAoKxHCW1o7RnV76wCe4", "AfFU1v8QcnRtUY5xRwxW6nZlwGscc0dmMfVQP9Ce3mqKRvqddGBHnx62WhKVcAMPALE9aR1kPeJfy4xz", "AXjQJ2vHhgpu7DYUrE1IerCOOp9y-d8dSIMEIkc49ckjO9M04AehA8qm5jm0FIV7kO3CEtzZ8e-dp8-2", "AYJqlLYWc7pJ-z3rUJBdHicjlxRg-sQUPytyCpvgPcpB4X3rKZlrmJq6pQRUZ0Pb_LCV1cvi4CLGTA9d", "AQA6JMmn0j1yvIhc2mh0QP5HedKSpEEYQuZjHgmaIRVVlvzDWJU2twyT8OklWyz8NhVNlsKReUElO_xa", "AT-LIFIee2HjafB1SJxyxiX8Bnpv-bAEJKNNDFduENR8a7xGvcQRb_5QxxDq_nVF8L3hkBpqnyVue4vt", "AYc6HFlcGY99sz6mzMNWT10vuo6l1qwzKjlKeZ_JQuL2tkUtbKrWwNZ3pcFHZJYmFk5cXK92OodadpX2", "AZ8UUzGLndt7BWxjD-NobN8gFAarZV7PNN-XfBIM7_n3oU3roq610ytrpCtL2ikSOT_HtW8-2aq0HgTc", "AdC8njZRff48qO32BRskthX85OP6eGdW_2pwbySJl0WSa3MRPWGxddYiYf0ig9hkTu6ppWLp4uQFf7Wc", "AVm6hkTgp2kObqwkPrO0KZIHeREs426g_yaq1IPsoSz5ij0vOGGkBcmfIAB7ddrhdzFvDiE4S7FjGG46", "AdCK4t9F8PiG-Lbbpu9ot8TJmzlt6JqEjSBw0r4DuZQ-h8g6bU_RazHGajCSLfTfVtobXHH5NWq7-07H", "AefZb6HGDKO-Seg-Y-T7n8JMAahIQPYbQVoQdd8JKZmF-r8wV_BT8YvY1wq_6HJ3QpiGhH1x9wTI-Qer", "AZvPeGIweYjl7UjrBplKks_ABRUW12UVxZy4dw8bU7yVLvx5AxpP_kGy5VpnL5eiaqjeyY9bcIwp5UMs", "Ab1VkGmr1COkjo_6COidM4aQw32eggx3FrwdBLe_49nQjZvsN6NGFeKCiMfvgl1424JCAMWbDIB84nM9", "AfKPyV410xcQNtx6rx0yWBp0mmovau9eb_YyiB9uPX_lnWmXvOsdKN9HRWmEcDwcp0qzp74u_NijYth1", "Ab2xNfs6Tl9v49jUupCCg8Av_KDTVb1JKovfA92DPRDqjIWDDOmir3bx3cY4qLmgPxuhXNIIYm7K2Y3g", "AdmFNVRKWUWMj4UyEomTd0CW2hHQFcY9qB31B8PbWZYwzykfRS74Jw4vRC-5W1dScVuRwwFoeQAxFNoj", "AcMnb-pPPgZGWeK6bIi6sixOzjzSQnLBX875cg7XCwbhG9Fc6kRUiN7_qjlYHOX2FZMDDCXYC2Go65LF", "AXbYLpelIUb8i9iaFeQKXt3DlWpLyC1dc3d8WOx7fBMvPny-lHueS7DnFZnfIeOiRukpum5ejF8UdSzx", "AU6945tSYM7aVoRjvIEiFE4uLYn3WWXRAt_DbqbX0BCUDVfLdL_NB85NaJYRqkrRiU41pUwwom2E_47w", "AeLMaMHVVX61YKoNlLqoQ_1zX6MS3NBjvFZNBsrrOCgeZIeqoVwXWoVz681aMaXzSXkx2Q4CB2DzdxVV", "AU2UgmLki6ZfaDt27a7WM5J73IVi36nQva7oZGs5onuWbGyo1dqDf9ruVn-cgfjyNWYQvUzk54wOLgTh", "AaBPZpGg89TAPOa2VMaKwINvjpDh-EE7a-mZQ1vV95ZoEIz65ducH23QeIL1vPUFuuRGB2goniC9KrbB", "AbarfFDHDheK7p4Z-w7JZ8rXoPBWSALu91ZJXoRX-zGz3Y6eqFSzum4OyTxn7ZJXELy_tl1ZLimrzgyn", "AT4f7iaYeBKXSFR_e27h7F4z7h73L3-lMtH38jZh8KDQ5xp9NoTGpiz1oix4B69xiT1uFuBOI0r6_SLo", "ATWcvHcxfe1gfQ-znE_Ua6dVvX7fMRsdoBy1MmC_ApxPcG3rGZLDFoAkOmtJzrdRDFeu0EhXIAu17vJh", "AeV96uDGtI2SJMobKDHpR_IEhPD6NJG379LQHeFaCe_-GObH5rRCuP6-AWCarF2gh7dxh-si_uaWSxlu", "ASgMJnHCefNb23pO1tmCqWhvwT5D-opcT8W0TW2WeZXEnDw22r7epTCrSoNjKc8O4VlDLhP4oLEYyOHV", "AeGtpFEgJWl8EKAwx-jVRGZRy8fBYlZPG2cYL-kDJmKVv0o3tU3lOJNhzWMGjUdubmqsUtTcjyFzrsk2", "AUQRtcEq9z5DHLxjiSz3rwKgB1z-O-Df8nzNU2aKYxQbntIDV7rFiHGQrISElMo1JJR5N8sYpzqkq8Dg", "Aee7fyLlCExLFFB1Cs8eco2PsnVcNMYhj5KtFTxmmHLPGp3y2i_HyooUQtRCjKjN_445-7qjnoyR8r4w", "AfxJnj-1UN_l7r46FC27ufpCzt4ymiF7ctpexNeEH8hkQwJloFB5comni5SxflMYOkWnMXWTtVRzlbfZ", "ASCS3-SkSood0ZR2Ik8EtFZrI9MOKdEhptnQHypXbCk_z0wSICf6ElQ-ge5FACcGmtjKcV6h-xOWBqF2", "AdxKNW6Rvn2NyGD6r9N7C13nh9lKZnOJ_KaNAl0Nlj_csc_wmJnm3MgpyHOhugPhMChinj2Rfsr9mpDv", "AR5XPd0OP8aXFu_aHyBK9pP097vBH62c6afOj6sjH7KSB0CfNKZ6QIR_27rsKCZYmmCkRgjXePpTq01p", "AYb7yEHXW3_n24dkjn29InoA6dCPEDiKajhbrCwbIJTQfpGuzh8a5FS4MoyXyFsiK4vhgeWxtg6zuADW", "Afo1LVZtoaCSq5HI_naZpUMjB2C0_OiB6nNHlGaNe7jwBTunPXnbodmCr4ZTtpL3WT-4RkNG6DQFvX03", "AR67hODdVoxlUsOUT8BoHSYiOJ15WDQg90nkqwRP_14vVrEb1a3S4_caxBc-w51TV3AcMyACzYREtXrH", "AZxGGpjzsdT8yXYqFS_kp-Ai6E_7EwTJ03AoLiJj6z5TBXa6GZW5h2ZRfi5-K4Y6oLyrF8FpJpPqd5xY", "AUq0DPexx9Wb84WP3jKi9r2WH9xejePjH4KAsOdRj-q4f5PfwMZ_KpVhLvsJyo3lhpzqhOJEkqFspgGN", "AXOplj0iurFjzACM1RuuWcDRlVubsIQe7ry8SRAQg3LRVDyZbAmxOs2snzLSvNJhCtNNFANLf0cKguLe", "AUwoRlv3iZ3jt3o3hhcft_tZ5g6tvefEpjCf9YNGeH7q8p_WraleitkKfLnWIs8HLpzalgRA5AMT0BYO", "AQi-8_4bMO1BqBPldsz4FyybrZMDAeQO_uqEXfZsxgZGOrMbYl-pO7sKTnQpdsNxEgM-xa5HodTHXDQg", "AajSVnIsGJdD3fKO76SmA8HxLs9flPRpdLhp-KTM34I2ZZ12WqfLZ2S3zmbzwbwJOMi5AmS96jHXppPu", "Ady0oUeIgU24A60CEhog6THKv4rO0-58E1C6CXS3mfgBjonkj_fh6hYPP1_8qVzioVPhbX8JRbyeHV_1", "AW7mu9kZkNQnih14Ugvi7DmBpdouGHi8yv6DQHScKfz1pvNh7miD60WrQaf_sRQFbya9pln1JEhtx58F", "AejlsIlg_KjKjmLKqxJqFIAwn3ZP02emx41Z2It4IfirQ-nNgZgzWk1CU-Q1QDbYUXjWoYJZ4dq1S2pK", "AVfy3rhipHfrcpAARabvSbVcG8se_5Ye4Yez65UlXA2zNQAhFLwERbc7sFooSjc1pRkQDvpWM_-6UlQI", "AZNGPAzuZGI56_rR2d6Qt5Pg9p0EP0SlgqOLF1hJ-Jhyl7Fc4KLsW3WtUaQBsq7qEv-VcMfH3yRxckw_", "AdEIkRwwggl9QpNGdXzXlT6dPT5UcxS5G3pzdimct2fQlfv2e6JC-ZoR2wEaqy1VRSYN5zYATl04lQPJ", "AV2UhIeUzG0N23-zt7_KBQ3OhYq0ZurLSvm75NuFWl2iMtNiZr0k78AvPweLerv8DcdSENAAPy_qVHdc", "AX8Pb-sAgAFp_gHsk2dQX30ABfcvMabRjPRJ97IqRt9LWWGn6bsNiU1kYqMWBkRim_ONg1XnrOq9HycV", "AQkboqLaGeUqU-UcsupDWhGINLljqGPvy1pm6JMp1EQMcuz--sOwhOp20s0H4y1b_X6EYgUYmwl3_QbI", "AVxk36f8VzzEEbhmhFRdeWR0s6kjHJB88V3q1VCDDWO-vUHkpHDx5a3c5KBiSwrEnodgmIDyVrySo19W", "AbS9SBIomzAqKCnZgxxI922RWH4sRjcXQVkzbQoxwGh1yLU5K3NyBiIksj1qy-cgI0UTRaKEENdVA3UG", "Aeof7I__CpI_sDTMc0sabPC2AtcDFSWYTA-AuSX35LgSdK_nveXR1zNGPzWb5d-EkXP8EaHFvpTXOt_W", "AdFNiM95Vg_Xslrjr1PY-bUWGKHheQsGWo46dXPnSWfkGWhOpGqCH7SOivcQU1Bw968KwMiYIdOrC9C8", "AVQfN-d4gHcYcLlNAV5jcn17hiXLr5-yktBxwl_oviEHekLjF_VtiWEHzpc7qs8VBooeZ-9HNkIaZC8c", "AWZIhxjocZGX-AfhRrmStAUGypQjzWEQEnLV670Qui0ZdjBH2xiXlCEpnXbaHxxwV011ekhRWt6kWQzy", "AYJNkqXTB-LbDWY-geBeteUhFckZhmKUXoQm1EKrHFs_jT52-Xs9HrM4yZe19i65TLy-KTPSZrbQWL4d", "AaJdlGSlPSHCXuUsoizK7BX1gQGk-LXzvuTQuISXPz5aJf07UXhnNZBXHnZ6PBIGgPSLz_ezOW_JMWI5", "Ads-AIlYmzcupU4h7aNwYtZCoxFhsytxkGRc449oi4KTs8JxxM32te5WnObdQ63roSR6_ap_RX0o-TyU", "AezPnqbw-EqAB-3QxkcQzOTFu_BZB4p9ELEmDvBRIfNYi2MktC4OR3ls8-kfoRucnB7oQoZV_63a09RE", "ATqRzjL44zV0uvmI-I8UXaA7aGN5UgXaIYvPnXot4EhMOFhL02PqzVX5vFPJ3I7Q7ezYGDluKsYJbTlb", "AQb_uhCxkswoDV-msDRSEvBrENNqphJo-cGxMJ7nUa9hSArJhefMfdMvtVRN065kc4e2jp8rJ0X8yQrz", "AcxzPl0cMHMyjC5D4uMaQZ0oqjNEGNItIbUgeokdAXzFs9Tr2uYJEe4l76DUh4HnX0Bz3XSYR0Pnwn3q", "AbBeFZDAUYMZQ-EZMFQhx3K3_vvX2tU_45Lq6G4PrAzgP3gp6UfyaFVEg7DKo0diRDacyhcJO5Bpxij3", "AR337Je4oqSvRgX7HjX2Sv7M1VsK7Lme0WBssuEwW66bkphUUWw-JjjVvHNW4ttTdikGHraEBfD3pKcZ", "AXwYaDB1wXCQLJsQwaJhpckEFdZmuZMohfwEKH1vTm0Q5HJTw3t_Zqllc0unozCPPR19Ahlq08vNsPMw", "Af8uKf29kbmHdbkYF7rCs4cAwupeZQZ42HBlOTv8C1cPsQDleyL-KibrX2rI_qxUfPXgS-AmUcL2EkCn", "ARqhdSV3eoTacPNpD0m-xMnGuaYsbdCi8xCtAM_NKRqiZ_Kj2GcmrnpKRJOimbS4Dqg2WBlMZvM_a198", "ATdvBkuCmZU0bTUYpr6UZH43vK5293QKgxGkPSYgfr5zfib2PbHNeYI_NSuhsJkiGiQqCAMLkx4lSffx", "AZHX5-mWu26D4D6Ocw_8GxZTsvGtlFCm_clftgJLP0eixyZ0rTbVBu-T5RpTaw2JYXK1rzxIibE2wUcm", "AUYwY3jZaHqT-hh5Ogpy1WkNunjk_AWi9pjdm21kb5GFOyJUnquvZeUx1jPHLYSwS1l_pHvWudWZUocs", "AWkpAaV7rEJCfTdsnAZ11aisQ_SFD1MPCt8ZLZXRga7acQT2q3UffhOPc3ei5hoW--H3rXVTlIFnn1jM", "AbQ3QKqGPFeBWir6QK2na3JAFsMp9scbSOeRi0_15AA5q6XMi4hTRuO4Tmme6jmAi3SvRY4PTPDEqY7V", "ASD3LOuSg39EBl3Pd9PEZU6GMkA-yIJQhohSF4owo2fL2eelnrgRYQKYdbvtYI5O3IDp1Pw5iqEv5Hbe", "AVRFLjMTInsB9StyuRZltkDbN4Bhi-QiXcIeqPO6YPU7GSOLR3i8F9f6pVX38_EkmDhIpgXM-D4GnPdO", "AUoMvJA_FdhFwJEVL6Ri7YhdU2nrPQUoags0yhV22_17ZgWmfvh5Zqyyxpsba-dq-LH6w0tuIuEQJ2bp", "AfCSDNtSCNV6lzSOqF3jTnR2UHPdi225JVtSowAVEcDi6KgBYBP19qnwT14_dMcALbArsbQA1s4vVGM6", "AQUolB5X1HACW19AGVFANA1SuuJOArLYtyJ0zI2yvD1jVxgUhZbl4E-m4ry_emlAEsik3xm4gcvKKL_B", "AfWrrGm1rpmDZGvGBxD0UssB3Ru50PGNgIcaWOpAN8mFGGkgl4Othmu8kPlunsRgR8YwPerYCdtiWUVL", "ARnCYfY6j3qid5w7dQHUMtoRebesjooa-ZDvw-sgChzdIap0eGlxO5rwLQy-TwKB9FNtMvEaXjKOGatC", "AazXPDqbAnyE6iEbvPw8wYi2YpjIJkRczJUF5CiSKNoQ6rEmP6mMzwAlf_KDRzTazEUukaq2feqcYYuG", "AeDWFs5RFH33pB3skuP1M57jTWgMHSuKFMxJtkMddpYsR7SSEBanfqI1RN7LlRaQ_Jmjxb8-L_1dbIJW", "AdfXyxI-oHYghKou93lC4LRkRB0OP3-8h0L5srBeDzUYFwJ44_Jk4Vv71CKt3BlMUlGUGseBIoRFAu0F", "AaXrMQuzMiglUVTF6DWsGEXij4fOW_IQU5dZ49WvIGs-lBMiUtPW9PSVX8jQbwZZsDP10xEpAjUllgcr", "AYSLmzwkSsjQMKrDgKGmAfYjO-xr06W3-WWg0DfayGHeWu7Im7UB5eetTIHUso6d-zpcE_odqb6doeBz", "AaK4HlTbGd6DSR3mnUx7Xhc3DM5akcMdDQpqnawV1O2XkLZVuAAsHswM2PK8H2UBsddrcblhPgGV2PHL", "Aa5ceOuSFIsr-yA7Xc3p-3ZAFogzycThssblaTOUd1JpcLOUX8LUXApTe2m_QvmjAovdYcs1YujLvRtu", "AUf_Wbw9mq4zdVOg4XYC5JHrc-mGolFDwWF6ex-l7BA8lxCp7B0VKqU7BpQWlrfCxgKe5fqRL_N7Knz7", "AUH7PO7l4LubjN0ogPX2GY28oACKu296xjV1a0yRGWdd3EwfBmOyWSYO1doaZd0gx-Bx7Zao1SsY23EW", "AbH0SUlVzrLY0ldQG026EbqR0lVthG7UP5XpZGjoyTAUxyDNPvtyR67dcUSNLxOZSX2TLgNIRk5jX29D", "AeadV3OUHInuU5wL-D5zlR-luGSVIfX-nA90teNgJQGYscnG0RvVnq5eNme7pnHtcVnRCBVl4itjlG4b", "Acv9CfoOzVZ-rIwwd3xF6KK_meBjucMzn5m8LdlYHPr4sHr0u9adnH3DOlNrUA6QolpqhGEWmptO6lqi", "AeLH-VryI92PffbhsBWgsnhFBftVk8zwbupdi_LwKAQFckM6OmwTGbKWOOKfUz2LQctrtvVygNvs6iXf", "AQMYXqEHnLgLDn2Ke_4SefTHx4oL5pYbEmlp3g0D282gED7WCCFu4C6uMk8OqHdkTQIYmd63cr68_-Hq", "AT9wpTr3uD58XIjdJkQd6OOh_m9392fPJg3Oo1mSki98E3OvDqVw2U_uBZ4YltQjo3iNrn7ZlRz4JjGS", "AUqz2lilNW9t5eMx1VEwCMVSDeMHVas5zLpolzIGLDOjaJgS51Yy8fep4KKNQTUi-fj9yO7qIxSKRN23", "AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP", "AW6_nv9voVzeF2SPx2CeIWV3AYzNFDOiPOmoGtiRwQB6t58EN4ix_utEKqDHSAQUaxhYI-AtwnoQnMUL", "AXVv0WVqILDE_ALwvlqIuLMT4h_2OCQu28rZyzN6VHiB9dFlPFJpWyoZnkzUBYIbuuYwdxfNZPvNwqSJ", "AfcRKeMgHWWby7ltUUzqiTBoHmO4aVrsdNpRZVBiEZt7U56nKUGySIyNSK9m2JvCQfOGfjxI0oZKAYmS", "AQVhaTnL5pyyXwnn4D8pGfZIpSASJ3hvCfE04-2t-oZ5bxG0Br08c1v609avdfOd8M1jTGaAMZCu-MLa", "AQnAfBfkA8BoHKE63NS_bKyGpVaxxmgRfPzgxThwY_N9fTSrSITOKSSv6OTrpGHiSrA2YbLKo_KB4qeh", "Af_pMiA6ikCtlsNB8dJW1oG1ZI7FirXbRU43rDRfq_i_iQAPbYsojeI9Q2VzZvD1u2wKEPuaokZaNWyC", "Af3YaeRfoJGtncwLeiahT93xTYT0-wldEEaiGehhGspP333r6tADvHeVCwZPR022F4d0YQquv7Lik_PT", "AXg0AmHuT2a0Fg8NXx0SezjfLG9UgmLK1qE-fUfbAi6fEF1mbXWAcfp0-rlzFhWS-K_aXveJ2_h95E4x", "AdVBcUmJoUuavK3_TQkaUMV5S45EDAsY2G_GN9dw3MxbtdUeEu0Lio2nATu-cK5PUGJMqIUME4soaaDr", "AVVPnV2oTAsBDiXdmLnZxhgnVpGlYkMlByGm_SzWg_3e85tbRhD49Ix-Ucx3l0ib9BfmZykje0uV5KzK", "AfWrLXLdbApBAVcEvM7xmQwr2QhHMk6jbvAx4jDMnS4QGmkdxQ5uKDfwOV0jHyPC-0pRSisTRpB7sEby", "ARkuH9nh8MlJG8zEmVHx9jKsi8xWHR-P_1vWD8--7vsqaWl2zBO3_TAipWc6f9yMHmziI_0blQqViGFG", "AZgBvhDOw5FiH6rL1VPNaAQ68dmpMaAO-ZI0rg_QWC7of7SLT6JXSAagblw5", "Ae9ydowlZztIMFy9HbRaMTyLDltKCy1v-8Ip6J9WkU4WUyWcW_QAzUnMPLV9cxy6czPjtN21uddn9IG4", "AWWh5qDSn8fdahjjO4AJ_GmbyXjb_Qwrmk_Vtr-d6TCb6IAyPUItp6L7iyZ_KgIBxBhLLHpJF13xMhXl", "AaJ6YsPUaMOVjHH67sM0pWiAxlGU5dMNmBHMDu6IxpxX4RMxTNwHShxDabIIIoG_hezmQ_bLwBl62Zz-", "AavIU-CI9kUiQ7e76nQrNWl08jQdsCSOALmuWJ8cN2rpJwKNm9SLcWyJNErFLNNYvXjRRxVVnJW-4iRw", "ARwAdSLROuMQJ-91zD4w_-_Pe1FkBJEgTpKNw8LZKCtoRxsq5cQaQDcOW3V8QAziiIlp_xAr0iMhL5Y6", "AWpmV2CUaza_wgqCWG5df8LRAgmWyD__zhsJJHU9TOdqgZs95mvuvMRmaLPlYrRJMaVVy8Dz-Wqkmute", "AaCbDDpHWz5anhIQ_Ge_RmUqTLguwXwCrn5U50KZt7xU7tU3tH411rCyBuNYCaIV_nvgOvUNmI8YU_Df", "AfUEYT7nO4BwZQERn9Vym5TbHAG08ptiKa9gm8OARBYgoqiAJIjllRjeIMI4g294KAH1JdTnkzubt1fr", "Abu0Rwqhorsjm3yK3OVe-Cy15saxELijgiA8yWdGveJvDgevs7Nc_P-zsHg5tCJoac4mcjTVjGuJLBzA", "Ad-_JWvlIx4ED8vWip75RskfgcM1JLY3NnAKDoqDSBr9gxXVR1L5kVFZGqKHR_lIQO4gY7EFrQz7O0pj", "AZh-q5bJ1_kWDREHUN390ffVG-ubxGxHB08kvHlWETqkleYtWWhGge8z5nKzfZW7aM-U3R0YJTmbfafh", "AZymbWti-n22driaG2L7G7NOyQMZgKumqw05JTSIT8_MWMGMqsWdWR4TBo_e75oVkMViBe4zjO_DDmjI", "AdRRy5qiC2TsP3OtbkgwRzLpU8WqdAjVf18Me1BO7yRMBHK1JVHXqlr8XIIj9qagyePiG4_Z8iZIgOmm", "AXjYFXWyb4xJCErTUDiFkzL0Ulnn-bMm4fal4G-1nQXQ1ZQxp06fOuE7naKUXGkq2TZpYSiI9xXbs4eo", "AcSMCRA5xVRrJ7HOPe7HFj1GicmGAUIKujZVOYnDD9_Qiz_HYSrx3RlAtVwf", "AdZYKRBNf1xFvz6fcYRoTXlmoBg-acv-dakLzJTtaBn0cqNf5M8Z4OCHUBMv", "AU-ACu0mLYYRgiceSGEbzYcX9yA5bhil5ICbW02h2M7cbdEwiAE6akFH8NgRuCsT6dI33gzZX9zmKr3M", "Ab6M4m9Nok1o_LOQq0l1Sc1fX8aWo_Ce0Mrjm15FyXguNnWzgHOJOdWKbz384w-Ja5FsJ4IXHScGwo1E", "AaGocs2Ps2V3yhN7A_lS5SdS1mF2hxmUZ8SNBCzFHf0TUpGdkmwEomPxENzxR8_tqYKcwgB_TErnHCX6", "AWmkdE5Z_AhcR3GGOophAu_qDRHpOh22NJBB-0QjLFpWFo0aY_wx1UBwqmiG4OY-BFkS7L0gXY6gSmu8", "AVt2-Fr2w7QVb7qxDp0gHohDqZFQKYB4MgUs4KULrN4zayXnwycugMykkE1zUjYJBsglaAWFGs_U8UEt", "Ab-nG3JqVgV470TB3zmlXXMt9vZvUlOqNGVMkyu51ymtw8MESNvwkyFUbERwEU1obtLJp3g1V30v3lLQ", "AdTMvLUejL5-E65uSwBZnRjNV5JlTrGMvEQEwhMLU4dhm6cJTfgzHuYhKt5r9vfKlwNyeieq8-ZqdFGW", "AQX-OJLJe2aT67e4nouWcPdrl4Q4uqOMoC5jS0otp-vX7ZcYM_uQQQuFST6l7QKtC3Fg378Bh1c6qtXr", "ATDAHEYwG8nsvQgqf9yTWUbQ2iBfounObrJWfoeoEWoErLoaUW_rMh0i3o6uAN6XfRvU6GUnF1gRHL-P", "AURDh-fRhpncZm8Y2qxh_fj9VaUH2fTeEGvA9L3jkak1vfhISEDoWTsmYVfj2Az_4nPWaZlPwi_obgTA", "AUPF8VFKX8BsjR3ON0IDB71s2tcW_RF-q-ppFwFU81LfDUCyhPChAeATXYPeGsgLIlB9TEN_bkh-_ASb", "ATr5EshElZhaC4c0e2_ZwaSwKb0S4RKy39g-4al7OUYUezgOuKV-IQdyLesPj4axzgSldEzLbWAeVYc8", "AfPnJMClV1R-CNXdpctubgLazXxJ5cUDPeImRKZRLGqWep1N4q22hEDtfXC3R7daG0JdtOO4vNqgKs5L", "AYphQKIxbbbdGutmpobhIbo0jkFSigSIMCE-L79h71YBjzsBjP18q9RK9rgeeZ6APprQ9tWAFf2FNGRL", "AZQPVKeH0usLoAuZVvn8_jOGHCT6nP7pySllud9Dh-sbIqi7kBgDt9Xs6bCxEhCpF24x1JieEDdgn29S", "AUcaacy0l8SHnxKXCdYaZLHcrRPoj6KDxw78tHlZ6zaJ7ALqeIx_rXfkXZ8EDH1DgSfZIAw1r92NzFTu", "AXz-FTdsaLKAup3SCFE_BBHjr4vtV26NLHt-oSvcxhqjBUjMKiNM4xH4zALKTyiu9_E3laCtgbn3_Zxl", "AeDCkxuOsfL2RdE9qGK7pqNOMvjknv02TZnIBqj48N7jr9EsNuHKfvO-2Ndq62It-TtifNWdALIaly5B", "AZB6Fi32uCC1QRTPi98AR-yBdDyiYBlW2iybmv3oPv2ka8OVM41OGW3N8DICRfZg5kvyjpdgizGxNpO8", "AUdiNR8sRJIYiwA02_4UuSjRRUvGUFqaS9a-xJQPRBeJnbZKY4DRBPzc_MHkoHN3parC7iaUcSZoUNHs", "AX9Y1FE6CmttN_PzOo1rDjjnmQrgU5gTbIy29G56vnM4imILXMW_9Q-WbFw6Lqv89Au1bTETv17YZCCm", "AXw0UXVUt0zPbf8zAeuYUPH5Mk6yWbGk1GFXYrKAEveUJiC7UCmAWPacs1-ri1Q2ACUNt0fVDcxY_phQ", "AUTeu3BWbHn4Z4sH_fAF89K_WdAtUIe_EnhpGlXrEEbj4MpBwbs8VCbwCGmiOzSRqt5zu37OihWxRC6I", "AV4Y0B7PSyc6DW63gsLtgk12P02kXFcdMJSt8LiyUuiAFS60z22ZlbYNLOBaaegHENNTEFsWX7n6bPP8", "AVEjCpwSc-e9jOY8dHKoTUckaKtPo0shiwe_T2rKtxp30K4TYGRopYjsUS6Qmkj6bILd7Nt72pbMWCXe", "ATLQ9jIClPt9QFPCVGFNaODFlZWIkqGv8os6ntTK-QR1iTRbMntGtvuJNR-z06QIrsPpe5ujJrfJnw80", "ATWCV-slH_K6L9tzvdm-comm1gpQqHxji7spHcfGAARQ_NuMRRYAHR2gJ36A3okABucUuImSl1YSqnv4", "ATDgSNqwYRLEEOrMHB-5Tx-5GxRZB5WSbi68NtIvvGovxOAfSxNhv-gFulnJX9AvMrHDacpPNvnpUOrY", "AVyrz3xlA7YsPL9yRG6WTJTJ9JA36ulnYq0A-W2a7-FQHagTd-h2XEnslSKWN9GQH__VVTjcGZWlltGq", "AYrt1t_Rn_Ce-988DREp5bsPwGCoCdILPsOEb0Jap_LBWdc-E6j0AJ4jR26o-Bhu6HB9rhw_XdO4S_Kc", "Abp1F3rN8bSojLO9dhYwEaPStHml-OckvsXx7D_B_gqkbCTGhKoI6UCzN5oVTAwMb8KO1KwWg5GLz4AC", "AXY3oISYFxU1MqS5vG1QvFkMMwym6A-EDTT8DFJIq5ZWlq3OIoP5yX4wNKKmKKZ4yxTHCocYWoPAGNQX", "ARcf0pSIWH4zw6SnO-MYJCEyU9HexIQ9sYrzUE6bRsQJrP-95zmlGyhWjp2s0ZHLoG4nF2uyQPzvVcfD", "AYiXLQVgLszolhHbiYAm2HZERgDF5BOPXG7i4m9BNsTTSdmWhVu2Np4_GqDJLrl5VA50VDAlMMpCMArb", "Ac8X-wQoJRqcR7hjhnPl_0EAoxHuj7pWE8PFtBU2xsvcL94bxepJUNj0awMrs-o0uMeH1pqxZvhOwr7Z", "AQemBOgcqnwET6EUgdQZHNXRgNZ9pPFJalKsEKDL_YlfpGEUyhLBj7BRw7xWSB3iq8Q6gIxo74OSx32k", "AerUB-6mTARcvaeXjg0i99oWQxLi7WrHzFo6vAGYwEahSQ3cOOxA6iXfvxfBsEOmsfo1tfaK6pKnl4Kw", "AUiUO36J52hSCkhaMPLWedP4yIc8AzYxQf9IWwI2zxv_mEFOr4S6v8JwAmKTPztnRqzLneQ5g6D3OZDf", "AZqMhoiURMT7qtC-gKxZorl3AjLOxAqz04Y03kRFzSBnrWL5W5FEucdVk0EHc6XSZ1DD3lV1O6Ei4T7Q", "AYA1kbHZEGfgO0GQZ2AmRZc4Pt0xA_bjH_04oqwnN_eHjiaoLSR1SQ9agvNDB8og4LZEHHVK6m-r3XxT", "Adm59IrYvPigXwV8lVehwwoToY62oxUEWZue81iqw7fx2ogOvrqbCv2yKAVQaMgt-YQjfpM5mavPDWRl", "ASHRFCrZatJJD779KhJh4vReZxHyjkEjJqOcH51HiBdN0VCGPzGsY5qcsyKOanBuLdRcq6DGIxMkIzdE", "AUC9st_MCkpnFj5grSnlCNOh1ujx2NsAjMyctoMVNZy7P5p4X2suh-XKAdfP_G8G_ttwARjVP2qVh5_U", "AWD-BLYAm7ZItS5rqG2NwudODLJwEjzGPZ7mmeJMnOxYdXVrZj_JhUpgrnPoGPS5DdDS4Wc1-KjIEnkC", "AZ81OGWmwmMz4z1H8LJlowtkiZMpLGDSe5L8Mkg4vjlOX8QwhzMB_H83KpHNPOLSvCJ4W_zlhDQ8JXWX", "AbTZGAAj-YmmToFZbGY6oerdrhM2VHZAHhSj9ou2WRxX6deDa-kksuEJorQWte6VMT41vx-cORSYZLpU", "Ad4njTiG2f0fgrygZXIGwnCB3p6BflSSVDQROEQgofSJZvAgrYFQtXejNTiRYan1AWwRH1fQF9U1WcLV", "AUFWrErwbbFvjbcxeYzqEWMI5G0w_LP0B-2wm6VlyxNhcHyIdlDBMQmKI298W-EIE9Z5dNdP29EzHSY7", "AYMn26-nPadhPzVAH_RPfIXaYMOGtZgPnsSs6p_ieUsM56FipfvZn6f-h-tqe1ZsIejirYnooAYnPrpz", "Aa3vEKJmA0ZOgxcPLPvVLrdcIjNqOUXyvcJxJdE_UvJB22YJepjDX-uJmaP3i7jLiePb08pTMuSFU5by", "AezgqjuewrZjjN-whkJhUTFLg_wP-hPWJdwa0yPh_rnsJtcAwltilMGjQEJAa5lGmFKwgMEqzHmU-i0e", "AUPjnwsAZyNIPBNY1lRy_zDafMe14VrpcfeIp7zznNmd9zBPurPIP32TKV-dL1xg-dy42eZJdlk_0gDJ", "AYmOiHBgeNwOszgNnOKM1p08gdtx3K7Rkq0Iyf3oqz7inUaZZJYsXzueM_ET09hdjvkfChbbMwT9n4Z8", "AV16buDgQ4t1rLTlRLALiK4l2V-bBXbuexvxGnk3t_Tu2GUYG7tCB-tTPG5eD9Lz2juWTwUT_i7Cf4jz", "AXRILPvYUu4SLa6wG1z4n_1DsC3_sA7_asy0HYm1rCXXnRw1v9Sbe9NsGDLNjrE_8GL-eVw_YDjlTCrA", "AfKrgEQQWsMUR9wtvQmB31X0T37HEZ3g-uQmdMPt2B_cphEkyID4sYZnDGLrFe8cP6Yx-WSTqnDZ5Wgw", "ATJBc7APFn7FuVkOvl2xI4b8NfggI6Us5KrHlc7It3e6AOUSqGalL1R8LNQBoxtFzppb10lPKwAbuBUd", "AUUoVCSxi2WznYhlTPy6x7oxCOeuDZBFy0iCSrgHg8mj1JBDY3_dTkS7rhFQnaPRh7EG929pfUS7hjmD", "AXircH2zJ2lUmvEMsZw5HWbxPEYF37ZcRAgOfkjf_wVXPJCVecRES3_gEEi8uJMnw4E53Ho2gVTb41LZ", "AbOUyivVwdLJoOfhVYz9Qw0YL-rz89edlPM3S_vK041Rnz2t8hxtvmFnhIwv7CGa-mHoIl2354UvFH7g", "AcsCdakTXBXS_Y6WfsGrjw4kBjzcKsyNBdA26LiwCCo-23guumU93tkTCxg9Q6XadSuCkfbn3LURD9hf", "ARyG-7O26qHxhBX6Gv2-HzXu-F27Tu9KQAP8jJicb7Gpik5x-I4CmU486piV3iQ5Gu4qkYOWUbvBaUF7", "AbFEddN5fdmNJA2-pqMsI_ITOs_Pcl43tzzjsru0ENbtmlW1C2bLpk0oThT1qNL8tgmPHvc4es6j_B9B", "AcACdB2RGxb-23peUt2ovwfDUXBYSGbBlv2iEsMOV94YHcKqj4ATAGnWYsbddFAGWR1HtkbGo5ASw5ao", "AR_TEvkkg8-EPqsZr1iMYADrr35BE-JDN5Puwugm3NF98k8tZRQW_UiFa4u7HolQHThYxd1n05Wtxs9D", "ATvwK90V7SFihAVdjTQlIGsil9oQ1uSHT8h7GRM-ZOowkAQi9DCg6JAwFBpt6azdFFiriWT42jcvIjVe", "ASFwlXgoOm_Rpsu5f3Nj74nTgbIT_eD27oY7vLsEZ2ICOUOtBvPBYHMZnxhEKRNKmM0tCqf0-AxWUVH3", "Acn-VnbkQeJlIfc-pBgbQmyginPTAILbLKiMFrOH-LBEa62Yyc_LdEtpkd3iKtJVgtkJL59MERCBSHas", "AfySg1lo0aeg43kcf25LLQhxEbSJGU3fmgldk8sVu14EERcjca4dpHy0c9PwTo-oI-y0gUK__E20ustG", "ARp4zaq3RYAZaNLBnOE3xfpZWzDAO_oWczsJ7xcpxohLyAYz02hndRARptVRJIUc_lp7TwHvrl92U87J", "AVZDQ7ynJEI9MCy7bZeDPGMSC6xCYUBNU4QGi2lWcH01RqoIqJIL1wE8IdKRBaMC7G3aAJXDbSKuM_PT", "AWhQQuykpN_nyVKTgHZeviUEtQ6f1O9zu1Ygf_OSsyJzr1vmNxU1ouYkgMxlRHEUQKEnGJ-p6EyabmQD", "AX7oINKfpN4DK0n54Qa7cg1ba3mRas8C1e49Gq6Q1WXdenjGlJ4ym1cswCLbRFz84c8ORgxFfMBeXSPB", "AYrM6JV9iA-xCCU1xCMvA1DePbwK1L0Z35aaOK-li0DpX-5qhZmO-0cHx1UdrDYTThGsUZ6858QodAfD", "AdybeG3hNG3xDrQ0QNDw9Rbjf2KMxqoNn5vbNYhgQowqMIlsvvz1X3jOsaTWu-1TM0NnvcSsLm1bkNXA", "AWJoAvDUxeoxjN47oBS1KQCHP_lGDA2pqLXBahns6PMmMDBgHYoYmF5zZoMiOX0m_60MAux6DuqhbuhI", "AR3dGJe8zToNs2fp2XT2NTQ9NVGuGeNzzMO8Z-uuncYM-wHJ0QTclojSh_dwl42G_hRm0_S3zKMgqC9E", "AVJPoSO7nQcOwfC8mjDFlYZd0hB6uRPXn9bMaXC81YYV-g-MXziOdXFmk_nnfSrOGcqxh9mN75bVV2Ak", "AZdKwrTwEzQ8XxeoW3-dVZwvoXEb8LJVqCoM-9fjEKMa7rO93dREWhDHFx6xWu59fsDpxXidHxFpv2s6", "AfUHjf07HcSdnyIVrjKMGKrtwNcNTDi-3QEAJtkJFi-l8vWi9XbjrUbM6Hr4PbOo5leBKl2bL53dHLZi", "ARPe6sWG22KZp0YKSbebgdaDblz7a7wyex_OV7_4zSY5eOdLAtz0okSKznOwkoX0mvA6W-zPPJppY96_", "AXwCJppbQ9ykBy4P4NWNN22x8KsyKlfHdtMJCLeN0_IxS3YJGzMCTOjfmTimrQJ-i1bqkFUJcTP1eww7", "AQL96QrjY7kmWnxRgYQtKgpnyBbd5MGyF2XinDu2vhDT4sYS4nnCE5bcoogXK15Q78zHiK7lSK9i8cLY", "AYraDnKk5Rqdlm0ZPF_aYLDWlCAoBBbpROZ7hlwbassgAw3-SXHJObcFTm9Im7GfyT_YI0hgAxkZrCe-", "AcG3yUDIcfKxr_uumVTtvj5bpENO8IT6eI6oKSlgVDkrf9ZshIAh1m9TObJqdOUZz3D1Qi67-dyRWY36", "AQSgGxsMmajM4NvcuZUZ0fUzSHuuv7VPcUhUoDuN1lwT4VEgq89WO01CKxqK3vVjt7_c4h0VLPchKfsw", "AcY3PqxKJN5tvdtds5nGpzLiatwiJznJYJoWpG4scbLnfPyG6eHeDPQ65AmoEbg7ic7JPahPBZRkjSUC", "Ac6ke_AYE0zbyhhPZYMA3oaIDU0RRU4xSySelFvMVoe7aZyUk9KqC51XnTf-gkvXQ1nDBEh9zQQMFzlA", "Aea-KrjL-ubqOR6RcqaHPTFWJ4QcGfsx1t-k3hDL52ZA1GIp0YoSvW_ykkRHMiEaztr2aupN0ev26eyD", "ASZKgb3hE-0wkV9NCG6Z_KL7lTaoA896U21tg_zeVDcJqatd5uXKlzBTQV4t60TYdcObCvoaniK9C-pc", "AcbDULRdfjY7w-DS60g0-mCXwOJQNWotOZes7mlwT2VCsXyAwdvgPnAnphtPwe8kRiol5CkNnrV7ty4h", "AdKY0ce1_Cac5x9xIYMeLRXWQb08bCvEFvaOgd6FKT0EpZwxi4a0QQ9DYB8RcSda_x9hGZNNLxX5ox52", "AdtmjnhumIVf512r9eVKWUSd-FB1m50_qDGaMddykHwE_fCzuDkKl7lsWk7VmDVQT348tjSvK0xWWqxW", "Af4Q8vg0vQGDOS4CZCo3lRGuxa-0uCea8ThUMVbj_AG_va0-pwbERM6DwznoR66uASQJdR1iCqiAOlY-", "AQ30yLnZhcxW1OaYle1tKeiYOBbwusFVu9tKAQo2B2gTZoyM6qIWP1cA9aBOwUv5v7x-Zymm3ScDc62i", "AWFgO9_WbDSGn-3EoliV4Xe5tUOVjlvTxzRD--a6rnDEKWsr1DzaR01XK8DhXCu7BulgWxY-3T46GddB", "AZoLIJ_07qZVfTVNFg6zrb6X1tOgOwz49qXKAdssCOowJ4o3QFwUSOAVZY7WA9t2JO462nSvIxmg8r4c", "AaqFBIll_36pnXqDpUctsxLhL5mGC8J2odsn0pDQIBkidfb4St3J44ENAujonkUJWt8lePJ-7mSBb2gY", "AeTaeY1w5wt3je9FFRRE1t313-vcXeS5hNnoF-uYB6FVD-ChMmhhy3EvCnozTH2TnLXNldFwz16d1b44", "AT3e9Naa87eXT8mQ7OakeQCsih35N8VjJ6sLA0hP9zDcoK3fcqF0HpHa7mbfPEj2zqqJtyd8dRECKXKn", "AT9JbsWaW_r6I-pzOuZ0zs3VD2CG1AyOgDUOBnMXAno9TjPZYOiegXhjMbqUmAef5783n6yRz7nMm8mr", "AU1f7xobnegPXLuqQq2o-_nS331U2pUmWxUuFNlUd5QYLwUuItn9mok1Zh0T57FY9nE8YI47GR9vsZDS", "ASDT55P6Jdw0oYgpftSjw12L2wcl3LKRqiO8hCnx7NLqc0SfWstmVmcoLa22R-1LVKtAcexEBP60HpMd", "AVMDh4hHgdV9v5DSD2GfBRw2LCz3jF8UBDr8qG0z3pGFjWNrBh8RqH1hrzXqQZ3TdyqsPjuGAH2GvzoP", "AaghtEu2Cr3W24akci5JY2StSLCb4IhD5BrCx9K2z242JwKzxnDrsZx-va1mTUu_FIxBTFEmHDZP9MgC", "AaWFb3GC2C5C4Wmky3pQ1LNH_nmE3Vwkj-LpgDFPT-vWBNgg09MOLtWbNN4wu6fjASkk4DGpkcK1bbyG", "Abpk6sczIxGd4uShN1NF18-Uu45acQiqIHtEhblwB7fegLhVlzI5j9qmAl6kxM_vMaIAEfFFON9Go-yJ", "Ac4ulvdzyWGE2CFo5xV3nYhwkd0CrALQleV0oImj91NfzxpRc94iyPHoQzrTUTJ7WcrgSrxjc-MxbAEY", "Advgqk6L03sFnkLl6UXmlkAwozU8X4RmqlisNUrsk0RFqoldvD6W-ZXVdghbzPguZXl0ocnSLn_OwK42", "AfR9rDd35YCFWhtTa0VaTRhzYWN1d6bNd_4EkOFFEHRLDsyzKYFyzCuwX20MgTYejsUje3274eTVRQr8", "AQh2k_kNuGS1cfbJ_PlYg28uPkvk9QHGfX4Pft7xY0c15CRBUYwiir01am3hIXcHLWqG_oS3UYan9Gfh", "AXsdF0L_Fmdcza2k68VrKLskKuocgMSZkfrMwrgSuHvLeUNCPJGnIHEG4hmxbDthJ5SPvaorE2qFe7dQ", "AexgYDRBEwcfrhm1u7-LmGDxEtDZtBKQb_PITb2C6_ZolyS5BaIZgfLHeBiHc_G_vElZUqc3qz3lEsPB", "ARePeTtGtCKd_jt4pH_nQrjW56VjnNhfgJEYosgwtxafxaEJUjabpnd-Xxls40tcMp88eq31KBz5DWrA", "AUaH1R1TbCLQM8Qi1V6pCIpkQxyFHKQMoNAE_-Blr1Vhlssr-But0VSrlwk_1d5E174GmBjB0-Ulqylj", "AX_wkrO1bztO3Zk5o7xpTxd2VaQLZfCOllBu5dnWLI8IJsib7LcVV0dK9nf6byYsY5PrYlSCupx6d0uW", "AYNuKyjrY4_ptFwMXpQhowCR9V6ns35FC0cElYYZwjshMkQ3wc0iQJQciXkr2KsBJiOi3SO1nBHHu8Xa", "AaaXw7i_cFPcN1LHYIPDFjsn4qN2--nQgL413zW5s--ZMK5zXvtlGIvscQjT24axqeTasFjB7qXXcBI5", "AaErQSStIgrMS1Wt6vyVh1dI9S38ueIYroiEEfQIG6bAaLn1YSKytF7Th4utpxo9tipKSStXUlobuB5N", "AbPSFDwkxJ_Pxau-Ek8nKIMWIanP8jhAdSXX5MbFoCq_VkpAHX7DZEbfTARicVRWOVUgeUt44lu7oHF-", "AbXt5XyCzxxMhuZvBVENK_djVGwGcWsDPZHOpem3s8YFDN80wCl-6kq-vf-bt9-k0FLiJIOksYceQpFZ", "AcIpUPU8c1i0sDZ-FMYIsJuOEpeP2BTL-hmwcbcYijfZW9_esiJoBGeX0lGE8U-A5YbXCpOWuPMkQCDQ", "AeXffmIejvxgasb8c_1t1pxfj8hzaywUILZzr-TPII6nk3KrLkdnqfiQlcNjghmpaHwtBjdRAjcJkGwX", "AUXZ4u8N3OPaxj_b-RwgBRr3Efs5mqeRT1qZXWwCeXjQaQpW9GeJnfPZy6ZfUDZh0u_szXrNDjzSM5-Q", "Abd-37lTccSNiHam_-H_NZtQa0tmsjxztAbnmvy_7R8kjvuVz8QvETPLfYW5Zf0dfvWHIfmaHIALs6Qf", "AfIGckSuPS8-PLFn7rcis59G2tQOaKlqgRuUHPW3_ed_Y6JZdohTjjTpUVfvAxnKC0-zWuOLBWrpMCo2", "ARbpxmp0udlm2zBPu6bqW6PAMV-UfCTktgWFtJ0cy1rKQUUtIRffwg1A-i0wRyFg9BhbfZM3M6ci6czP", "ARGQ1kBYHQGaz6Y9_0twfc0Ityx3TUCMTucXOni6OmABeu8s9yxaCXOJRibWvKRELFp1KyYRpMJRYxzs", "ATHcOc29WISmwi5VvnVKP8LN3LFVaeWIUiX0FfsNgm1u7CIFAxB7FEZv1vJPOBu3UTbvisBO3wWECYAp", "AX5cTDOjB4CuFZeR7gWVEzVeI3cM6_j_5BZ99ZjKOtyH2hQl4Ptkun5gdXa27n5p8E_MSc5VTNcicOY8", "ARbo7WUH4Uas8uz-UpsOpRos4hAt8h-PQXVI9c9MajzrKTyB3sGwY6L8LcRpuEDq9VGAQGRgbbEU9ReS", "AWKM7WCLJ9CfunAKHctvRPmYdhwC9dGyY6EAtkSUGHVV58kxRc9clx3hPf9U0nNkWsFFzRu-Ila5Fr8A", "AX5TZNFfJqB2PmFoEKCYtd6vpDzEkanw-TIh70ZZ-h3bFsyvcjlz3BUafZDA8JsYjidNw_TmlGDMwgL-", "AQWgSfn9emdJnPEBBwwvB6N4F2AoXbDHKq3rwW4-ieEP3TRlWiApzCWpGdyNjymcxlXIAxuf8sScQWMv", "ATrCdcXIyAX6fPCjCD6UBgIJ4sNNm3SNQzJ54cO_X8f-SI9kSAhV_Z999bFb225scgZdB0lmk78-jcwb", "Aa_DG3hUsFI6iMf87VUOyRCWH28pC5ijDrFPYnG_fXUT9NccX5D5qm218rUWcXyTj65vu2FBmYxP3Zam", "Aderc8flr4FvE21kxRJaxvFyURKeUi4znzTj71EbyHNiFDm7uhagNFq3ctfig5ZAcj6vobt7C4y060d7", "AdtXhR3loNJ7B0hpup-jhP5Tt23VwLdtfHDbqW2vcJ6bIwrsvKajuMvTP7a48PFRzNsWJgqL4Ai14vNb", "AeueZ5XoPc4cPG9v2kwlk4dIeK67CE0RyIwTzKSZlYlClcxH9P1xAtpfCpE4UQuVCXxo466IUj8ALNa2", "Afc6ldERu0z1EWXp8MYi4QzHudDEAfMjL9UwCW-DYH1RTA0qSkRJWoMsu3kUp1dR4zeRAVNovSU5Gh8n", "ARjjpGuuTRVYUQ3h73A2Zl6zOglzYtuWCnPC8yZTp51sA1XlKpuj5pOmQeoYkDrPIAQTQTwteJhAaqd9", "ARTz2u_4Z9ZHcbwont1r7U7Y9cXBHMbkhTfOx67ONIMkwqDYr08vv4SIrYP7_wabZuYobR9A1AtS-C0e", "AVhCvBBwz7WcCJNWt4ShmzeXcTs-B-ydD1hdqsV1bbT6P4TvhsFxIHKAE-GO", "AVX7d1JfuB4fLeUhpG6O5JA6i6iB0sQr9IG-SAyvEN5TIo6N9otHSB4X8aaMcLOQL0R7J4XEJBQzQPIj", "AWS6hhBD7yuASYqmEX180QF5ELJGDf9vW4pOwwVg3PxA16entKKfNOxhkMoE", "AZKHl5I5X2-oWg30KETaXhj_5-CtJ2NftUT70No3-FD2MDm76KhanS_XM8OrPEA1JYc2RrhNrDYL5rbL", "AZsPWotgvxGKy-sWOcTE2xtZbHqJ15jyXWHJDVrODGF0j5ufpB-89ILdNDq8cOFA8o3YnFvC_rlUDKOq", "Adk1XwEPQMKOn-b9a0lMZ87uctEXKc7K9ZPHIfm4z8Yr3ZlWYDlAznceFFyzS0RbXfQqONuyFvZa4rto", "Af96d--L5ACQRgWAJ21VbDgbLMEW0m7SnlwtzVziKtwhkeaUVSSex-ivaMqCe5yO5ACRBzOTa57RNFfO", "ARBQw6GmaZaOMNkUUz78FN0hrNHflsmVAbXsSgQoHlOnXEzBjzqMpp4V9HH2LxVXK0t1cUCQtfijdHQ8", "ASdxwSqu8dAfiPTYWGxXF_oB1m2f5-kiEShqzrLSrq1UzI7m718X1Bh7oA6oRRaUgiCIyW8Dcfbxyj-J", "ASuksXjiG9-kzC6UT1_WQFSdcokQjFFivpw7MvzJzPLH_o7dxj5pnlCjs_u3Iu7x4xLgqTM5oJB28I_o", "AYArObyAM4DSnefp0u4QEGEgPOolT0sT5KVtC-kApU4UOhnotD55PPvts7tbdBNVPYHrJ1mDDzgDrfLt", "AZNBW_MBovzo-FQb3NoLC3TqhUOTZgcluCth-oYF4Ur4Hnk16bD0J7o1srJxd8RtRuDI1-Pf8mlAcAOZ", "AQtA-m8ydts6vPKeNcR2V9lbnUk1pBIjDA8F7d7pnnE22OdcoVKS6v2mpuicU9ETnPtD7KSgfClOW2ez", "ARiex1Obbt8VCzA3oiFddD6IM8GW_rSM-7bEQHYMEbm-Z8PKnZhnJiVZ8R2h6QnOOkRhO6qrPkacUB-6", "ARme3lHreiKJ3gYg6HThgcBTRwPTJ8AZEzVORV6N_b92yDHYyf1QNZ1bI7OPdF9Wxnk6iyQ84-5ZVj6b", "ASdzkkc3gZD4p6OQENcdTF4-BYbalbTCRZEuruTd1IcGuu3CjOFEAXX4KRtseAVv2_0VJhkegmfK066l", "ASgUH7GYLmT5OeoCIiZxCLdf_TkJWuN5xm6XyYm4UoKy2PJ9ph2kNS-jJRHEa11UfrsH90mrHCiFYneD", "AUstsy-MMWK_e92mOhtyXamPhDkjragWS2E-1N51CqQEPzLA-TmQW65ROOnE5horq0XmVGAHn3gwC9Px", "AUvtyfR1BKhuGWyI6oKu-KCJ_hr1wkh-BZTWIH8N6b6CqLc09mp1u43ZAB5Gv17wP2d2kecRhWdQMNJt", "AVZhYm14YbV6P_TNkde0MGGSxEtDncv7eL6xfh4NToEXB_vMMBETx6VjDX794rWvGhERKeb1xEXxD0Ze", "AfnCuLnoYiXnUIU-xTedeAUqQ_d_E17FiQVeNxXsDBrgHeUlDO9Di607PQWdRIep2-2wLMNk6w05BS4_", "AfVbaF5KGZuZzvs7b37iTEqatdhRly1S_uqGgAZ9H1rJixIm2Z1CNiMli4I-U5tDvF7wFR0ZGtC0sqJL", "ARnXPP5gAw_eGAXH1GVKM95kLABSvGRyCny-BkHW6UWSlmFnv5zkLskgEjuNwahxA1pBI2RRGCL1U2E7", "ASxq51TP92spfbizUkcxNEl7x84Ct717OJ0xgI3A2O_FeIH1F1jEdTBAKWZq5Ml2G3U0p3g57OQlZJOB", "AZf3sGCx2OIfGAMTGmcHDd0tt-VXYCducWtnkOnlOOUaA9gtWni3RbxZJ9U5LpJ-jsQ5YG3xX5nudMjG", "AddUoLv5JTnaAb5F2sxspDib4pni6Npi2ahl5NB0jXZMTqODYwujzQc4dGwywjbql5XBZN_-vFQNgN3X", "AfMTdM4POMezgiXfKDh3HCjxr5ztnb1N8AC60fHc23GdDCFq6DuIFhgwKG4W2-PsH9Lm3DqcuBGSIO52", "AT9nuYQxHQVOx-HSovm8DAAi3IWig_NlDrHibluNefWCzToCfar4G7DVp79FQLhVqqrdh9Ekk3KDcZoT", "AUzzFVKF6GZQDgNZH8JEUizm9sMhd-57lsAXyU6u4aFuTxU33OiutNq58_s1io0kd7epP5W6ASgcF-nF", "AVAqdF32y5UFhSWdjs7l67vcOuoQNk1KKXL5v49h14CZpW4QN7pJQDQyEXRbUBO4yylXXya9nu1LRn9Q", "AYOzl27R846B-NlpnYdfBveJ78MS5-CqTCS-kS4t2cTUwRUDkb4XsAyTLbwla1FWNdN7815pLLQOl5VJ", "AaLE7VZ5LC8sxudigS7Ekjfezc0MfHyzVW0n3AhZAJdfnim546ZwwY4iqK980R1ghPwh0lPoLyKddhS_", "AdtSQhJ6ffDtKJUwFl_ibaLaZliNOn-7E10cAVWC0MCEE2b9ptVe3bqj_M2hSLA6DTN5hPPqowKEGHxJ", "AQUSF3r4WLcs0AtHj1KxHdEEtJzQ3UdDmQ3MabfGLYcB4Chi8vgXJDL6dhxwQgtslpbgXX2A3RDMHV_z", "ASBI4ZfWKMssNADQJn-i3HMjph-s_sh7TlRQ8QJSz5TuoKhYGQRtsjXAN8bpantK0Eyd8SF7zniRcMPo", "ASIXJkiQIe-qp3P9iuC36a0xdjm57cP6nYnT3fgTxU8zALI2fLW9KwU6ZoP1oE9E7bzmG_dZOEZmEMja", "AVb8SEdeAJbnLi-QmoaBiapiRr7FbrGZksICDQgrDtCdQfSvXtmuFH0VqlzdS4sRj6R2qmNhrjJj7IzA", "AXvrPG7sDG6Zvt2o3ZnaXRK4m6Nie-KPDrChxf2_a30zFFs6eJwQ-BJgFrATt-IE9kvR5jjj757NgKSC", "AafaqFH6ta0PFlvqt02vd08h_gApCvhSt07by8A1rBga83TyFty8iVRVv-BiOEWO-8AtwyOQaNBiLMES", "AaqFeKtndmKfGYPQxXkV1ZErQylYG0OJ3MapCrQBfBojhG9heTdKKXXLMoMj7SW3ImZhNWVQ82zp2QCF", "AcecQRTPYDrLRKbub07lSrii9oCxy_gRf4AN3DBYP1qXkT7vNq_ljT_tw2FQDTtcIfOc85h4wKtfwOzn", "AcqlbM3LatHfLUfAqshlfyg33bmVs76nZl8cMQBbstVqyF2fDaiEz7qhcFZSMhA3pepiZpIiYXjW0d_F", "AcvRLo7nXCDN0fkkFDP0iocM2bSQ2ZALUxfUllf-fG55OeQjgOjkDnmjunrwZiiOsfzbSNlRQnqC8VK0", "Af5KN34nRKGpeuf-NXHG-VApLYlIxYO8Oaiid4CZVv6LIu7n4u-SWt04ChxQNn6jDZNH76kNRLXspEwS", "AQTB_zZaQzo1yd1NYCgFFox9wV7_V_BNfW2gDhcvRWpEMypkh5RCDU8z82wwkgni0d09XYJPIO6BM_GQ", "ARbuhqx-MQmTt3P2BBa3CEPakK2GupfPZuqAahytrA20seYZqlQ_bM4QHssuXkWkH0xCt0grj4QmJ6zC", "ATKIVzgAqAehDQPdPR1DAQsj-_PldhwMrxXCJCicmvthg2f4lm0df0nALpg4dEZT57QO21fLmfpln0Wj", "AVnVnDe3ACy2bgUFhKHBPbp_-fQwoe5qrgfcURR-UI3iOshoaGvNwUqxkx4SU6QR6eUt8fRCxR0U2ylp", "AVwOriXt7qS3KYOGRhP3JAOLbSM43pfk61ZVORvZTyhmQ-mvRW-zXWMS2AWUokQ14s1UQ29jpfiIumJU", "AX09zAGVFtWwrm5_JZUFfh_VKOcx953llczSMPGYsPFbFzk1QoCgeRHVnwXhR0AN718VDiJJnos2-dKm", "AXadcB5XetUTL34QyQlIiRK_UtDm4cn9_ShNmMw8FhBIh6rZQxtiQ9K8oqHsk9PQXkLQtaOzgkahWRi4", "AYRs82wfBGrz_kctFWYHBCnZd4Eof_ZLNzAeb-m7M0s4OHaD-go6vm7rpmH_hLOdMYc3DiJ80v5TPSgJ", "AacYo2k113JWY4e066cKchwdJLmyIcnYyowIloKB6o7DHdldIhH6N-pqDr7EMshGQyHrulbVbmAYmgJc", "AbJfQBbMXrRGZZSGyEqvHdRxtpr5bc5GHojFP2WWcObXlYU5zQunRwQUJ63PFMfXIv7stZDQFH1-yfJp", "AcCj4SalkPbqb47qQc5yJ1weNTvmbiea0lzR-3EDvXDZIyMsHcIpdB5BElpyrf_lAqDKOQSynZradhxY", "Ae6Vx3mw2UPZEf7QczT7tg0uUxLauuKtka_myxmlu6ShkZrdj4NBGHAvDYdaMYPXLnSxzfXmaeGkVN54", "AQPe41YXAOtjyC5dSdPbIt0gxNU8ptIDxJyb09A1BDIEeVovW_rZs-m2TehzWYAlnv_kmWgTn5VBslpL", "ASOCm7KsBwt5LUae_eeq6k1lv-ac0rcrSh3Gwk0dfEZ0_Sha3FdEDFXq0zAjXVLVBGUJGAS4KJIba165", "ASVO3qMzYivRm-QVp0B4jkB4DiiFp7kAG7s8FFYrp4KS3NNl1WQlezd_XsEE_4dXaftMYdF4KMdvh7WT", "ATCn6Ird1RIzRDVOLbUmGI5AUavRrK0XnnOmYhdghgFdhKMkZ6Zvr4C73_UH5xp5F1jCcBX9a4fiHbDf", "ATSJJDJxr9LpuVNkxYbXGvteFXCDD1tmPMDfKJ5sefBSIguK4c6dn4WfK6oCYnvbj1sVQNtuXVDaWDi9", "AUrnJiuXzmouRq2NZCcXZoDQYpP-gO4HwNiwgu7QCmlmWgx3bAY1qEI8ou343m943Ylbfmwn_5Ttye4D", "AUwcswMqaswx06CvK70TO4WUtE2Ar4DRXm-_WypzdIlVNUXotXB5fhQtlc-MftdF0GOwkDCbDHQsWl9D", "AXDJmCbAxM8PXTV5EFph8mlO6TzPnbcmQ5gNeWvCL6gbaX2qKKmXqfDC6EEppPSHq7wDSip6UvbT9eZA", "AXGOUolOr-cZ-NRP1lo5q9oolK2j4JBSAQeqYCvnuRPN-LKHIUemaEGtyXWbrMsSt6Ur-ixbO6oRZN3C", "AYD7u5dAmXH8EcBmhuWEs15anelQVxDZNhjYT2WnaZWksgB8vsnbCSmMVnyYo06IUUD9xF6LKJriPew7", "Aa5GsKmJC0UkW4un8T_6lvdXsb1fUgkfVi84AesLRWAmO_3MA7503teyZ_Uzf6xUixuyUuTkpfS5LftD", "AciW0Q7w0Ok2Ri_dvGTwJKsRcb5dAOHFJZfHf_kMC_PnP_7KnLj-OdwRPLxD7M25CRvXgp5nNJA3C2jH", "AcjM7hAZjUAqIgU0Lvzneb9-_rWs7qAEl6PoPVHtQV5PNmWBihQWsu_SglKO", "ART7rYn1IyUVDyGzxwiQSruiFD5OvkD6lkfpv3aX8UdMdmtVQWIUfkiAe_wwRepxtpJzWebA1dQYQpxE", "AS-9YzIwIgM7pFVJwG83_0cmtz-p6ErqV0diV8BDctjfX4mj-UUVi8hRwfb5pTuRi7GobwyUExMP5IYt", "AS3XJS9qJqzSoJ80MhsYv0FYMI-Tt2HtAJawgorL9yKBpjeRMaao5YtctUMlTH2i9pZ3x0gJbP9ybBEy", "ASG2hdCw4rCGvBmIjUIrZpBkDuBnuiaEryLrd8KBROyg-7FGdgcFeQ4eOVRxwIJCDZT-h2v8oqAeStxV", "AU8l__XI_fM9mqndO3EV43pfH2NvPawYNdotjsAqksFa2EnXfn3Q3ngwAIi5-Dx03TKAyliifkTfKYTU", "AUe6fpHCdjTKK_sxP7apE-6Qot1BV6xnDGg2iPQXJzMpbrQzbWebryYPkF5eBRxUYWRGwaEc3q3GpLbS", "AWCNxJ1zPs-NqO0AS6tBiGbIbHfy12-uVfhmtibM51Jv2qXJx08RqfBfWQ9oJkUaXON16zXFUfpXEgFz", "AWTCyz8bsjCppOZ4znVuzCXiq0pvGZeNWhlL-izK02ArHOlBoLVq97AtNDLhA3jQWcpuNRcab7dEB7lo", "AXZQrZVm8c3MGvovD4cNKiwBjIMMKAlhbP-wWcj67N39xDe-2ZdEdAPO7nV1bAcLM4v8iNUp0N_Mcphk", "AYmAf1wW0BWJMwUM_3lygY2_9wJeNok7DcguZ5VQZSWrk2DdnyMqBKKH_sh8T_DYJ10Jv1FTIzcBoRmV", "AZ10uBSCpZr5Stazc2Qp4kamQ7e5j1uvYugUfyqjn3_E0mPiQn7IZbfJ_5PHVQoNRwokZMCSSxEVk5gv", "AZbL__Y_-mRd5WEZYRHkxpw4PDaVGapobKAwboA1syWwSr9VdPTHos6FEWaGJvajHiJG72ZyVzNeslIO", "Aajr1vTTrL58YvDThPIsdrNP4jl_d2KahfheyZFUb6bs8Kbx3WoZCn0b5u_TnLHcOiymePb7OcYbIRvn", "Ab3Kury5vH4Nd2yDJ44vRvmuJhrCSj00bXcZ1L2MVrJ1XMjhQFDIgSFADUdytto901kBDIB_q-9kICcA", "AbB_czT7AhCglLGQDWtB6BNcW2IIhmhHaHGH89qJWNNjJHzYxIk6z5cQN3Os8nknVBXw2bdNB_m6wSxs", "AeJImnS4UyTQcDktg0Nr5RDUHEj5paDkjR35_FpWY2BANcQWwcUDTMTdcHz_6MCETc5EqLHSglfTrXha", "Af-FvbZhoCMcq70C9YwduBsM2FkmNlLnwIz4O9o_4NhQdxYwlKiRa4kUgXBJafXUdfija4n-wmmISFkW", "AfMBvZqDv9OoaMe8pn35-xOwufIhaHRkr-FgC64gh_ZanWKd3z3t__siBDz94SYWVAXfh1x5Nv03AfzZ", "AQXnKIXPG9SXvMmfD9G7yFtN3dCJjSKE8BfKaafZlzgPxGYkpb0yZhxvUbh5EYk86C7KXxPURskN12OL", "ARMyhNwHKlGvZneOKlDPtzTtMKg785buN1F8ABciuHl7HfSFYxz75e4bHhjQBzZgG7_5vjzNEGl6zMG5", "ASZNICUjJUEjOf5gXhSp9d99nd8OWF1qabSswy0xD9vOTUxeqtfdlDK102NWoG3OfgZE7DAQt97q2OKN", "AT-6KyRrMjWr8Ffr8yR10WOCVVxiMpM8Z2KL2J1YGkCKHdDCFu7c7dVtsajXH_hEu1gd0Qb_am8-crjF", "ATZjgdCbWKKq4wIsbgt_KUuWcBzRNTuoTz_JVKiXFNVkxBCNC-CYqvH4aNr7D-7uubhUtqiVsA_Etz0X", "AW3Xj48NN_K6zsH8JpAnNXlora23DOI1DhWiLFTWI3tVH6BN0PZD298BW2aizd-Z3CLISV53NynfoWkJ", "AWeM9QIuoOntrqxWoZuJHErA4790NA3MpoG5MxSFvsM9U-fVys3H_KzwLnJfL7P5jkdrVThaudOylTaU", "AWVZGksyYh40TiLsK3w_ertVJEbOJOdpyfjProgzy9-lbdtXQyHCh_G8-9iKG2DfHobdEtBPZKagnISS", "AXpt3KjQyq_WAuuHhBOJNbgz1-hJ6ViIWsujd0uQ-50tYJDB2YkcCDOP8AzsdfPZOLWWBV67TR-ZD9wO", "AYFD2Z4N3HgIqrNq78qpZRqL7JLBqaxCYQYoPqEiQC74gKn8KKFnYZ9fdzwLSC7oIGoGfVa-0KGiKKpp", "AZGnlh3ha2__TizDxGMvhmxqxXAsft0QoIFjU54D_pHJyABwEF3PR69Ol2hlGQwDZZTb9TdZ33FXi9kb", "AZy8eT5YydIKi92O9Y5V0RPuNM_uBIdAq_Keg_rIO7vlsNF9twjOqv2sQVoUnpiJ6qyb10l6SSeNoL1z", "AaoAGjTmC0H9GdbzY_qY7-LHEpXMNeO4m4gaxnGBd_2MnRCmH7u9PwYNrvUc_MPkng9MnZjoeRfuGPhe", "Aat6dgzz-AhMNM-t6f9ZLMr57DgxiehUDOsBWetFn6oSESrYdd72Q2b-SKzea3x4aHwEnbB6IpNmvhXb", "Aaz-u5JdoYyYd2scU6ITuhwKJXfBDcyAS5TWhmC5Pbs0kmvef07CfLC-arEIYXLivOI2G4zexNkz2fEc", "AbIdboZdEpyrKU4XclA-dkyGt0PlgaS1-Ffvr3xXvHbYSsYL1sGtus2vv_IYEIKfB5VeFW7s5TccmCqX", "AbN-0XBdWV1G0FEnQqVyXUklEHjiMDUIYkyk6FLO6csgUjXHtP9neRBnFaPTYM19NiTkxZxzOa-lwqYS", "AciGZEIKay92OieK_taeAIxk4gmkvZYD4V-5V_inGr5N8o4nsissrMfNKp5KF3BOWDDXE6uNmlm8poNM", "AdJvUhBNhkJ6wulv88yXQrzbU4ZiMocyZbTsv-9HW0ZDNIZc9YXP-IwNvl7_", "AdSP52hoO2-Uq_mBCuOBGgzOzerKx_NBWqcay8Iye3F7DZqSo2xTMsS_hc-sBxBq9ZeZnDJqEtAqU6Mo", "AeibaoRpUM9JPbRGAuyNa04EZWfVHI-0EuLLNMJfpU4oA8GduQ8y20G_B1LEI_6IvASe3sCqJGxEY6Jd", "AekF1vsyH-KcE0Dit28DhGv6o9KYpcTpGUrC1xmHuUG7x_HimZMMTpH3Hkiam0OXMznjo28JwwBvc2bv", "AeWuuHIpOmF5j55eDYdCoW9-rOgh9qGvlcy0aQpxXq27n3a55TL0j2XnWVDCquBjr14x4Fioqp4se4Pc", "Af7UiccMdL4x5RZZ0jGTYcaUnsgJS2ghv-iUYbUlXIn0Rxi1Hom2F-Clelfj9yoGczFxUoWcjX81vZew", "AfCxhs8W3WGn7Rv0S92CVPHXi7TWSCnRZ1U__AQhOHuw52NjJYFSGTodM5JFjZnVo01eJj8WuDAmM-qC", "AQozhXI5S4IvGDPmDJrJKcZi4c8gNDw7Gtn_cdXn78ejc4luxXJ0zCwEjWbjRuY62nfKWhc87LukhvAv", "ARbZ7RQg4eBkkdQZBwVIKQxFVCuIeOrv0sRZbMKRxNZVkx_sMbklmaAAbBnwWJy9LQs5xbgh7YfAsH18", "ARq9LAELs6Rd9zwF_cp6hoBHrxMA8OsBwvBYCsdifrZq-LU9P9VwPpUby7yqZIgfsrWHoJhWIuK9IPFp", "ASqTSIOiYASN3KYHsxmk6uO4O_cmAjk-Shl-Wx1ixHAFGjrDnv6_P_eMCshr9LdwNL5g95ly1cHqVy4z", "ASwoeikdyflPIKFAC3U34ewfFVRE5-_p6qc1TTQG9g_sHNs3RP5Sq3pE_e7V2p0VTi-nJQuIA5ApP1XH", "AUA_R6qBmczCAhGF-AGP0WbqxunumqEc6FZ8eaD1fbt2jjVmZaiu2QNeKEyC6uXx_PnbXaCOGyMocjuI", "AazPaZlGBPP6zyXwC7NgdRNNrfEgD0fNxGpohhfADfPDqHxDjRuO1vwqjEE4aKJrPJ9DaKkfuCD15IWE", "AQyNR1vnQtxPvo1wU7wS9OXY7svT_5KlFcgqkBgmEjPgy3vaZBjgReQCV0RD3n4iBh613SJeUqEC37XO", "AWum_K9KRwhlt4CGpNTHt5J-jhq4gXQdJ8jAdB3DdhsCc8SlKabUbl26C4UHsg--vKrMiCOxBb4ZixuF", "AYLmn4GCg4s8ZKrrU_5fzzwz72vDDJby44c9KbE9QYx1l4zrnFTncWPDx2AGsS65Bqo29D8rCdSBNqt9", "AROO3lVGvW116zkoEZ6KRQMg7iAhZ5ZeQ0jyxIYSJHHKflx04MCOdt-wPgJqRONhfHazb3cPYv244uf8", "ASncnAA2XqvFN3lpms6oapYFg_dh2cne5MzD5VCk3R_aL9zQIGdi6Nkjzfc0CDZy8q1BeqOWBqnaNFsA", "AQedjY9kGMi1lhC2AEl8qbYn_rTY9iS1Z99ijIH-T3RIBzkHcJ1_OEwFJkRjL1j-K3Yt9ezPuEvyjIBK", "AZZBF8oL40dzcyCcLIEi50pULlY_GyAc3nr6o5Qq87ImOU1-ZC1IoYqaJeWNT-kTt99KgtZrUFK9u-Bs", "AcRXfjC-a3HDICh_w7Yo9NEbLHW-TZThdotn2ztNlPSVUwh1rF_z6NS_iUOO1Ffl1cs56Lez9iAzzLuz", "AWlXddGW6zfufuNdkdEX2evRGOPItXHhGJleiDgJh7u2PjAFu9Ykv1mzdSB1emAdcfBf2WySEgamKr5q", "AWVPY_vj2qsiDlkk8xUifR1AGWmWPa-Kff7sc4PSNeZzSfoZqeF44xX7AyqpK9MXXNhHglzwX3okwJeD", "AXYNQHZFo1_JJkOeYsh7k3ii3OcIVDyreTAuJ7ZS0-2b5p_XWqHJ4KVGygYyn1_DGDKB0TQxnisrzAWv", "AYlEZzFdz7zw245KfQKnjjoaKlIIkmdOD8Xi7PRIx-oDcK5DKrWu4ex5zhNTioYVCAwgy5E5UZ8KWRKg", "AY2y4DTvaD_eftECds3SuKHQG8CJfmmP9zl7BrblUCl7h1svpwFBASQBNNQwDb-7EYW0QT1hFZFQUBIl", "ATJHnb_Iny4VkMc5ybUoeDS7x2CIMnFQYFTtOHfslNzYtdRJCGGrZTVM-mNdG97GU78F_UmpsKzCCIgU", "AeVgr6n0UlS9_b4u45Nlkd2mpKc6VUe9wjw2oKRrsXzIXZJ4K1q1CUaXvrTgcB5j0jb-E3fEwDD6DOEd", "AaVd3541KiAbjObfq8486KohVuhP6y_ZJWc0zY1ysMoOSeIx3OF5amcgw-BvxcMD0TNyayCQ9Agri_f_", "AUB2EIv-ZUzTepk_K4_yf6EnL3b8vX1LG1a4DaSZANNFiQ8QqPUIKej8_thsKURH8G8nbwrsrJB13bgz", "AUO4pKr0n9zirKGKfTQlOgQ8EfIDOjT24AUmKK1lGwaruTPyv3F4FbIBwzt3jqm7_m19fnu6AB5d5PNz", "AcgZye2RdQr5aPKy83TuiedDJEYoUxQuEA8ot8ELuhJ9ya0U5GSXRsqw0zqrAgPbfSi3MWvaZMdm4mG2", "AU1AoXXAQ_pZhAhZPKMBgbqIalttfnvDhGieEucHsAYfFePjb_Gq-g4pOW9YtUBxJuEBkt4IlW098XCe", "AYWZhcjTcWKK63g5TQ5dGdV2VhnBSQ4a1ZctLLpHPGW8NVI6FEOGIlprUkW7RwJ3ZSft2Yfjuv0e_GG-", "Adc6rmNeqiVf9o6lwUPHLhYwUgApqWgIcQOmiSLAKXU9lRCVs-iMgs4MOdkbvn_pRaBtOqlBG_v6nu7C", "AShG7lb-2gG6EHCP3LMZxo96dGYW23_Vu1KPeK3lWG01QcjZUarqJPbM3d7LqjFJiRMcFKNXD9gubJYC", "AV32VxQG3VgFK4XBV2fszwTZ1SI1GR3056xWzvXNuNf_unHdT1lIwtXp4x-0-nKngOKLhk8K5odXZRh7", "AZ_5b9jS3YKFPSeZ6J6YSavRS_WXD6ENRDfX_JGIL4qExwKkN45xBmLLy28tNQsQ0HkNkVKbGPqh_gGI", "AR0xZKtsgHB6nA3THJuR-ONFov1r9Hpi8mUCYYHg8YoIcd5TDQfHtbKPv-7xlMVTRmvAW2R5oZ4HPzLe", "AXyN1SOeUydASWS3ad68oxw4mAozfK6cGi1X7Wp2alKKZ3ycBKxt8lndwnATvAtAN5w-_HPm4ij39G6I", "AdUZm6mA2lFH0Zeca_2JqIUk0qyAuaFr-D1n8OjN8dD9aXsEaGAF7Sw8rF--Td32LdoLXEsdvnIFbBfz", "AccIQkAq3PaYhno7Lb7EfDChSPYVwRVSLjdG5xPGa7ryKBFVpImRM8_jc9_kGdC4PkgtlHFv6l_ET4aB", "AUP00nLYtQvAPZUR69WsZ0mZCbiy9VYXY_kT_E5ntJRulDMEFvdlc4O7NQjk05iAcwrxx5rMfRhjMo8I", "AV7dY22NFKx7_DTYq9M7cxp6NTy48StOdiwdZ3zuSN-gYxx8cobEcEMeHvoM6eYcRLFQ21t5R3bYvhZj", "AUKvgsLekmtbfmbTZadqyWaGa8DWOvMsiDaURUW02BxlXzHIBTBzxiUsLqEaHCrCdNJTB0wYV1zeU_7f", "Ae78ZfS3n0VwwsRs72OKgr5ftSyDzt1nDuNZOVkH5S_5kFWX_dEos-JxEPCtksCcF7hTESFIOl2aqFcT", "AZ0VQKlQnhFkU9Jbd96BIMPmyI_cvrRaPkWOuMoRW7UPvczAsnG-9S_mlPh4DWAZz4kd8OLbVa4w96Rs", "AVuI4Yp-EWv6x9winEG-YiVcqzwbJvmArOBXXhzAQkCGP9TgMar3ubQdRmsJxREwmSFbLlzgR-Nj0CAW" ];
    var SANDBOX_ORDER_VALIDATION_WHITELIST = [ "AcFUr3vhIePYLOXXuZzdvFL5th99W0Uygya9lqfjN3XCx-W2dGlr6A9mqiIZAHAMng1g0_haL2LitLAl", "ASmWKJfGIEy4BmvwWA3PpAX-uOdz0EYCQ89Y-oLww8LgaqqHtXEcB4dfxr88kmcp3no-efNznSFDcVjg", "AY-UBQDZ53U9-lrZ-7RGWIn-CLhVJEaZI9HsWcqqApUx_CET1nlkkNow0HpLb-y0kTUuyIA3uwbME6Dd" ];
    function getLogger() {
        return inlineMemoize(getLogger, (function() {
            return function(_ref2) {
                var url = _ref2.url, prefix = _ref2.prefix, _ref2$logLevel = _ref2.logLevel, logLevel = void 0 === _ref2$logLevel ? "warn" : _ref2$logLevel, _ref2$transport = _ref2.transport, transport = void 0 === _ref2$transport ? httpTransport : _ref2$transport, _ref2$flushInterval = _ref2.flushInterval, flushInterval = void 0 === _ref2$flushInterval ? 6e4 : _ref2$flushInterval;
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
                            var req = transport({
                                method: "POST",
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
            }({
                url: "/xoplatform/logger/api/logger"
            });
        }));
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
        var _reqHeaders;
        var accessToken = _ref3.accessToken, url = _ref3.url, _ref3$method = _ref3.method, method = void 0 === _ref3$method ? "get" : _ref3$method, json = _ref3.json;
        var reqHeaders = ((_reqHeaders = {})["x-requested-by"] = "smart-payment-buttons", 
        _reqHeaders);
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
            url: "/graphql",
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
    function getFirebaseSessionToken(sessionUID) {
        return callGraphQL({
            query: "\n            query GetFireBaseSessionToken($sessionUID: String!) {\n                firebase {\n                    auth(sessionUID: $sessionUID) {\n                        sessionToken\n                    }\n                }\n            }\n        ",
            variables: {
                sessionUID: sessionUID
            }
        }).then((function(res) {
            return res.firebase.auth.sessionToken;
        }));
    }
    function patchOrder(orderID, data, _ref5) {
        var _headers5;
        var facilitatorAccessToken = _ref5.facilitatorAccessToken, buyerAccessToken = _ref5.buyerAccessToken, partnerAttributionID = _ref5.partnerAttributionID, _ref5$forceRestAPI = _ref5.forceRestAPI, forceRestAPI = void 0 !== _ref5$forceRestAPI && _ref5$forceRestAPI;
        var patchData = Array.isArray(data) ? {
            patch: data
        } : data;
        return forceRestAPI ? callRestAPI({
            accessToken: facilitatorAccessToken,
            method: "patch",
            url: ORDERS_API_URL + "/" + orderID,
            data: patchData,
            headers: (_headers5 = {}, _headers5["paypal-partner-attribution-id"] = partnerAttributionID || "", 
            _headers5)
        }) : callSmartAPI({
            accessToken: buyerAccessToken,
            method: "post",
            url: "/smart/api/order/" + orderID + "/patch",
            json: {
                data: patchData
            }
        });
    }
    function getPayee(orderID) {
        return callSmartAPI({
            url: "/smart/api/checkout/" + orderID + "/payee"
        });
    }
    function validatePaymentMethod(_ref6) {
        var _headers6;
        var clientAccessToken = _ref6.clientAccessToken, orderID = _ref6.orderID, paymentMethodID = _ref6.paymentMethodID, enableThreeDomainSecure = _ref6.enableThreeDomainSecure, partnerAttributionID = _ref6.partnerAttributionID, buttonSessionID = _ref6.buttonSessionID;
        getLogger().info("rest_api_create_order_token");
        var headers = ((_headers6 = {}).authorization = "Bearer " + clientAccessToken, _headers6["paypal-partner-attribution-id"] = partnerAttributionID, 
        _headers6["paypal-client-metadata-id"] = buttonSessionID, _headers6);
        var paymentSource = {
            token: {
                id: paymentMethodID,
                type: "NONCE"
            }
        };
        enableThreeDomainSecure && (paymentSource.contingencies = [ "3D_SECURE" ]);
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
    var getSupplementalOrderInfo = memoize((function(orderID) {
        return callGraphQL({
            query: "\n            query GetCheckoutDetails($orderID: String!) {\n                checkoutSession(token: $orderID) {\n                    cart {\n                        intent\n                        amounts {\n                            total {\n                                currencyCode\n                            }\n                        }\n                        shippingAddress {\n                            isFullAddress\n                        }\n                    }\n                    flags {\n                        hideShipping\n                        isShippingAddressRequired\n                        isChangeShippingAddressAllowed\n                    }\n                }\n            }\n        ",
            variables: {
                orderID: orderID
            }
        });
    }));
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
                            if (payee && merchantID && merchantID.length) {
                                if (!merchantID[0]) throw new Error("Pass merchant-id=XYZ in the paypal script tag.");
                                if (payee.merchant_id && payee.merchant_id !== merchantID[0]) throw new Error('Expected payee.merchant_id to be "' + merchantID[0] + '"');
                            }
                            merchantID && (payee = _extends({}, payee, {
                                merchant_id: merchantID[0]
                            }));
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
                            getLogger().info("rest_api_create_order_id");
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
                                getLogger().track(((_getLogger$track = {}).transition_name = "process_create_order", 
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
            })).then((function(orderID) {
                var _getLogger$track;
                if (!orderID || "string" != typeof orderID) throw new Error("Expected an order id to be passed");
                if (0 === orderID.indexOf("PAY-") || 0 === orderID.indexOf("PAYID-")) throw new Error("Do not pass PAY-XXX or PAYID-XXX directly into createOrder. Pass the EC-XXX token instead");
                var duration = Date.now() - startTime;
                getLogger().track((_getLogger$track = {}, _getLogger$track.state_name = "smart_button", 
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
        }(intent) : _ref4$onApprove, partnerAttributionID = _ref4.partnerAttributionID, onError = _ref4.onError, _ref4$upgradeLSAT = _ref4.upgradeLSAT, upgradeLSAT = void 0 !== _ref4$upgradeLSAT && _ref4$upgradeLSAT;
        var facilitatorAccessToken = _ref5.facilitatorAccessToken, createOrder = _ref5.createOrder;
        if (!onApprove) throw new Error("Expected onApprove");
        return memoize((function(_ref6, _ref7) {
            var payerID = _ref6.payerID, paymentID = _ref6.paymentID, billingToken = _ref6.billingToken, subscriptionID = _ref6.subscriptionID, buyerAccessToken = _ref6.buyerAccessToken, _ref6$forceRestAPI = _ref6.forceRestAPI, forceRestAPI = void 0 === _ref6$forceRestAPI ? upgradeLSAT : _ref6$forceRestAPI;
            var restart = _ref7.restart;
            return promise_ZalgoPromise.try((function() {
                if (upgradeLSAT && buyerAccessToken) return createOrder().then((function(orderID) {
                    return function(facilitatorAccessToken, _ref2) {
                        var _headers;
                        var buyerAccessToken = _ref2.buyerAccessToken, orderID = _ref2.orderID;
                        return callGraphQL({
                            headers: (_headers = {}, _headers["x-paypal-internal-euat"] = buyerAccessToken, 
                            _headers),
                            query: "\n            mutation UpgradeFacilitatorAccessToken(\n                $orderID: String!\n                $buyerAccessToken: String!\n                $facilitatorAccessToken: String!\n            ) {\n                upgradeLowScopeAccessToken(\n                    token: $orderID\n                    buyerAccessToken: $buyerAccessToken\n                    merchantLSAT: $facilitatorAccessToken\n                )\n            }\n        ",
                            variables: {
                                facilitatorAccessToken: facilitatorAccessToken,
                                buyerAccessToken: buyerAccessToken,
                                orderID: orderID
                            }
                        }).then(src_util_noop);
                    }(facilitatorAccessToken, {
                        buyerAccessToken: buyerAccessToken,
                        orderID: orderID
                    });
                }));
            })).then((function() {
                return createOrder();
            })).then((function(orderID) {
                var _getLogger$info$track;
                getLogger().info("button_approve").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_approve", 
                _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                var data = {
                    orderID: orderID,
                    payerID: payerID,
                    paymentID: paymentID,
                    billingToken: billingToken,
                    subscriptionID: subscriptionID,
                    facilitatorAccessToken: facilitatorAccessToken
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
                                var _headers2;
                                var buyerAccessToken = _ref2.buyerAccessToken, _ref2$forceRestAPI = _ref2.forceRestAPI;
                                return void 0 !== _ref2$forceRestAPI && _ref2$forceRestAPI ? callRestAPI({
                                    accessToken: _ref2.facilitatorAccessToken,
                                    url: ORDERS_API_URL + "/" + orderID,
                                    headers: (_headers2 = {}, _headers2["paypal-partner-attribution-id"] = _ref2.partnerAttributionID || "", 
                                    _headers2)
                                }) : callSmartAPI({
                                    accessToken: buyerAccessToken,
                                    url: "/smart/api/order/" + orderID
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
                                var _headers3;
                                var buyerAccessToken = _ref3.buyerAccessToken, _ref3$forceRestAPI = _ref3.forceRestAPI;
                                return void 0 !== _ref3$forceRestAPI && _ref3$forceRestAPI ? callRestAPI({
                                    accessToken: _ref3.facilitatorAccessToken,
                                    method: "post",
                                    url: ORDERS_API_URL + "/" + orderID + "/capture",
                                    headers: (_headers3 = {}, _headers3["paypal-partner-attribution-id"] = _ref3.partnerAttributionID || "", 
                                    _headers3)
                                }) : callSmartAPI({
                                    accessToken: buyerAccessToken,
                                    method: "post",
                                    url: "/smart/api/order/" + orderID + "/capture"
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
                                var _headers4;
                                var buyerAccessToken = _ref4.buyerAccessToken, _ref4$forceRestAPI = _ref4.forceRestAPI;
                                return void 0 !== _ref4$forceRestAPI && _ref4$forceRestAPI ? callRestAPI({
                                    accessToken: _ref4.facilitatorAccessToken,
                                    method: "post",
                                    url: ORDERS_API_URL + "/" + orderID + "/authorize",
                                    headers: (_headers4 = {}, _headers4["paypal-partner-attribution-id"] = _ref4.partnerAttributionID || "", 
                                    _headers4)
                                }) : callSmartAPI({
                                    accessToken: buyerAccessToken,
                                    method: "post",
                                    url: "/smart/api/order/" + orderID + "/authorize"
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
                                getLogger().warn("redir_url_non_scheme", {
                                    url: url
                                }).flush();
                                throw new Error("Invalid redirect url: " + url + " - must be fully qualified url");
                            }
                            url.match(/^https?:\/\//) || getLogger().warn("redir_url_non_http", {
                                url: url
                            }).flush();
                            return dom_redirect(url, window.top);
                        }
                    };
                }({
                    orderID: orderID,
                    paymentID: paymentID,
                    payerID: payerID,
                    intent: intent,
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
    }
    function getOnCancel(_ref2, _ref3) {
        var _ref2$onCancel = _ref2.onCancel, onCancel = void 0 === _ref2$onCancel ? promiseNoop : _ref2$onCancel, onError = _ref2.onError;
        var createOrder = _ref3.createOrder;
        return memoize((function() {
            return createOrder().then((function(orderID) {
                var _getLogger$info$track;
                getLogger().info("button_cancel").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_cancel", 
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
                            getLogger().warn("redir_url_non_scheme", {
                                url: url
                            }).flush();
                            throw new Error("Invalid redirect url: " + url + " - must be fully qualified url");
                        }
                        url.match(/^https?:\/\//) || getLogger().warn("redir_url_non_http", {
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
        var onShippingChange = _ref2.onShippingChange, partnerAttributionID = _ref2.partnerAttributionID;
        var facilitatorAccessToken = _ref3.facilitatorAccessToken, createOrder = _ref3.createOrder;
        if (onShippingChange) return function(_ref4, actions) {
            var buyerAccessToken = _ref4.buyerAccessToken, data = function(source, excluded) {
                if (null == source) return {};
                var target = {};
                var sourceKeys = Object.keys(source);
                var key, i;
                for (i = 0; i < sourceKeys.length; i++) excluded.indexOf(key = sourceKeys[i]) >= 0 || (target[key] = source[key]);
                return target;
            }(_ref4, [ "buyerAccessToken" ]);
            return createOrder().then((function(orderID) {
                var _getLogger$info$track;
                getLogger().info("button_shipping_change").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_shipping_change", 
                _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                return onShippingChange(data, function(_ref) {
                    var orderID = _ref.orderID, facilitatorAccessToken = _ref.facilitatorAccessToken, buyerAccessToken = _ref.buyerAccessToken, partnerAttributionID = _ref.partnerAttributionID;
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
                                    partnerAttributionID: partnerAttributionID
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
                    partnerAttributionID: partnerAttributionID
                }));
            }));
        };
    }
    var props_TYPES = !0;
    function getProps(_ref) {
        var facilitatorAccessToken = _ref.facilitatorAccessToken;
        var xprops = window.xprops;
        var env = xprops.env, vault = xprops.vault, commit = xprops.commit, locale = xprops.locale, platform = xprops.platform, sessionID = xprops.sessionID, buttonSessionID = xprops.buttonSessionID, clientID = xprops.clientID, partnerAttributionID = xprops.partnerAttributionID, correlationID = xprops.correlationID, getParentDomain = xprops.getParentDomain, clientAccessToken = xprops.clientAccessToken, getPopupBridge = xprops.getPopupBridge, getPrerenderDetails = xprops.getPrerenderDetails, getPageUrl = xprops.getPageUrl, enableThreeDomainSecure = xprops.enableThreeDomainSecure, enableStandardCardFields = xprops.enableStandardCardFields, _xprops$enableNativeC = xprops.enableNativeCheckout, enableNativeCheckout = void 0 !== _xprops$enableNativeC && _xprops$enableNativeC, rememberFunding = xprops.remember, onError = xprops.onError, stageHost = xprops.stageHost, apiStageHost = xprops.apiStageHost, style = xprops.style, getParent = xprops.getParent, currency = xprops.currency, intent = xprops.intent, merchantID = xprops.merchantID, _xprops$upgradeLSAT = xprops.upgradeLSAT, upgradeLSAT = void 0 !== _xprops$upgradeLSAT && _xprops$upgradeLSAT;
        var onInit = function(_ref) {
            var onInit = _ref.onInit;
            return function() {
                var enabled = !0;
                return {
                    initPromise: promise_ZalgoPromise.try((function() {
                        if (onInit) return onInit({}, (set = function(val) {
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
            var createSubscription = _ref2.createSubscription, partnerAttributionID = _ref2.partnerAttributionID;
            var facilitatorAccessToken = _ref3.facilitatorAccessToken;
            if (createSubscription) return function() {
                return createSubscription({}, function(_ref) {
                    var facilitatorAccessToken = _ref.facilitatorAccessToken, partnerAttributionID = _ref.partnerAttributionID;
                    return {
                        subscription: {
                            create: function(data) {
                                return function(accessToken, subscriptionPayload, _ref) {
                                    var partnerAttributionID = _ref.partnerAttributionID;
                                    getLogger().info("rest_api_create_subscription_id");
                                    if (!accessToken) throw new Error("Access token not passed");
                                    if (!subscriptionPayload) throw new Error("Expected subscription payload to be passed");
                                    return request({
                                        method: "post",
                                        url: "/v1/billing/subscriptions",
                                        headers: {
                                            Authorization: "Bearer " + accessToken,
                                            "PayPal-Partner-Attribution-Id": partnerAttributionID
                                        },
                                        json: subscriptionPayload
                                    }).then((function(_ref2) {
                                        var body = _ref2.body;
                                        if (!body || !body.id) throw new Error("Create Subscription Api response error:\n\n" + JSON.stringify(body, null, 4));
                                        return body.id;
                                    }));
                                }(facilitatorAccessToken, data, {
                                    partnerAttributionID: partnerAttributionID
                                });
                            },
                            revise: function(subscriptionID, data) {
                                return function(accessToken, subscriptionID, subscriptionPayload, _ref3) {
                                    var partnerAttributionID = _ref3.partnerAttributionID;
                                    getLogger().info("rest_api_create_subscription_id");
                                    if (!accessToken) throw new Error("Access token not passed");
                                    if (!subscriptionID) throw new Error("Expected subscription id to be passed as first argument to revise subscription api");
                                    if (!subscriptionPayload) throw new Error("Expected subscription payload to be passed");
                                    return request({
                                        method: "post",
                                        url: "/v1/billing/subscriptions/" + subscriptionID + "/revise",
                                        headers: {
                                            Authorization: "Bearer " + accessToken,
                                            "PayPal-Partner-Attribution-Id": partnerAttributionID
                                        },
                                        json: subscriptionPayload
                                    }).then((function(_ref4) {
                                        var status = _ref4.status;
                                        if (200 !== status) throw new Error("Revise Subscription Api HTTP-" + status + " response: error:\n\n" + JSON.stringify(_ref4.body, null, 4));
                                        return subscriptionID;
                                    }));
                                }(facilitatorAccessToken, subscriptionID, data, {
                                    partnerAttributionID: partnerAttributionID
                                });
                            }
                        }
                    };
                }({
                    facilitatorAccessToken: facilitatorAccessToken,
                    partnerAttributionID: partnerAttributionID
                })).then((function(subscriptionID) {
                    if (!subscriptionID || "string" != typeof subscriptionID) throw new Error("Expected an subscription id to be passed to createSubscription");
                    return subscriptionID;
                }));
            };
        }({
            createSubscription: xprops.createSubscription,
            partnerAttributionID: partnerAttributionID
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
        return {
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
            correlationID: correlationID,
            merchantDomain: merchantDomain,
            platform: platform,
            currency: currency,
            intent: intent,
            getPopupBridge: getPopupBridge,
            getPrerenderDetails: getPrerenderDetails,
            getPageUrl: getPageUrl,
            rememberFunding: rememberFunding,
            getParent: getParent,
            enableThreeDomainSecure: enableThreeDomainSecure,
            enableStandardCardFields: enableStandardCardFields,
            enableNativeCheckout: enableNativeCheckout,
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
                upgradeLSAT: upgradeLSAT
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
                partnerAttributionID: partnerAttributionID
            }, {
                facilitatorAccessToken: facilitatorAccessToken,
                createOrder: createOrder
            })
        };
    }
    function getComponents() {
        var _paypal = paypal;
        return {
            Checkout: _paypal.Checkout,
            CardFields: _paypal.CardFields,
            ThreeDomainSecure: _paypal.ThreeDomainSecure
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
            buyerAccessToken: _ref3.buyerAccessToken,
            personalization: _ref3.personalization,
            facilitatorAccessToken: _ref3.facilitatorAccessToken,
            eligibility: _ref3.eligibility
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
            this.props = props;
            this.children = children;
            var onRender = props.onRender;
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
            this.props = props;
            this.children = children;
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
            if (child) if ("string" == typeof child) result.push(new node_TextNode(child)); else if (Array.isArray(child)) for (var _i8 = 0, _normalizeChildren2 = normalizeChildren(child); _i8 < _normalizeChildren2.length; _i8++) result.push(_normalizeChildren2[_i8]); else {
                if (!child || "element" !== child.type && "text" !== child.type && "component" !== child.type) throw new TypeError("Unrecognized node type: " + typeof child);
                result.push(child);
            }
        }
        return result;
    }
    var node_node = function(element, props) {
        for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
        props = props || {};
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
        init: function initCheckout(_ref6) {
            var props = _ref6.props, components = _ref6.components, serviceData = _ref6.serviceData, payment = _ref6.payment, config = _ref6.config;
            if (checkoutOpen) throw new Error("Checkout already rendered");
            var Checkout = components.Checkout;
            var sessionID = props.sessionID, buttonSessionID = props.buttonSessionID, _createOrder = props.createOrder, _onApprove = props.onApprove, _onCancel = props.onCancel, onShippingChange = props.onShippingChange, locale = props.locale, commit = props.commit, onError = props.onError, vault = props.vault, clientAccessToken = props.clientAccessToken, createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription, onClick = props.onClick, enableThreeDomainSecure = props.enableThreeDomainSecure, partnerAttributionID = props.partnerAttributionID;
            var button = payment.button, win = payment.win, fundingSource = payment.fundingSource, card = payment.card, buyerAccessToken = payment.buyerAccessToken, venmoPayloadID = payment.venmoPayloadID, buyerIntent = payment.buyerIntent, paymentMethodID = payment.paymentMethodID, idToken = payment.idToken;
            var fundingEligibility = serviceData.fundingEligibility, buyerCountry = serviceData.buyerCountry;
            var cspNonce = config.cspNonce;
            var context = (_ref5 = {
                win: win,
                isClick: payment.isClick
            }).win || _ref5.isClick && supportsPopups() ? "popup" : "iframe";
            var _ref5;
            var approved = !1;
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
            var onClose = function() {
                checkoutOpen = !1;
                if (!approved) return _onCancel();
            };
            var instance;
            var close = function() {
                checkoutOpen = !1;
                return promise_ZalgoPromise.try((function() {
                    if (instance) return instance.close();
                }));
            };
            var start = memoize((function() {
                return (instance = Checkout({
                    window: win,
                    sessionID: sessionID,
                    buttonSessionID: buttonSessionID,
                    clientAccessToken: clientAccessToken,
                    buyerAccessToken: buyerAccessToken,
                    venmoPayloadID: venmoPayloadID,
                    idToken: idToken,
                    createOrder: function() {
                        return _createOrder().then((function(orderID) {
                            return promise_ZalgoPromise.try((function() {
                                return "pay" === buyerIntent ? function(_ref4) {
                                    var orderID = _ref4.orderID, vault = _ref4.vault, clientAccessToken = _ref4.clientAccessToken, createBillingAgreement = _ref4.createBillingAgreement, createSubscription = _ref4.createSubscription, fundingSource = _ref4.fundingSource, fundingEligibility = _ref4.fundingEligibility;
                                    return promise_ZalgoPromise.try((function() {
                                        if (clientAccessToken) {
                                            return function(_ref3) {
                                                var vault = _ref3.vault, fundingSource = _ref3.fundingSource, fundingEligibility = _ref3.fundingEligibility;
                                                if (!_ref3.clientAccessToken) return !1;
                                                if (_ref3.createBillingAgreement || _ref3.createSubscription) return !1;
                                                var fundingSourceEligible = Boolean(fundingEligibility[fundingSource] && fundingEligibility[fundingSource].vaultable);
                                                if (vault && !fundingSourceEligible) throw new Error("SDK received vault=true parameter, but " + fundingSource + " is not vaultable.");
                                                return !!vault || !!fundingSourceEligible;
                                            }({
                                                vault: vault,
                                                clientAccessToken: clientAccessToken,
                                                createBillingAgreement: createBillingAgreement,
                                                createSubscription: createSubscription,
                                                fundingSource: fundingSource,
                                                fundingEligibility: fundingEligibility
                                            }) ? (_ref7 = {
                                                orderID: orderID,
                                                clientAccessToken: clientAccessToken
                                            }, callGraphQL({
                                                query: "\n            mutation EnableVault(\n                $orderID : String!\n            ) {\n                enableVault(\n                    token: $orderID\n                )\n            }\n        ",
                                                variables: {
                                                    orderID: _ref7.orderID
                                                },
                                                headers: (_headers7 = {}, _headers7["x-paypal-internal-euat"] = _ref7.clientAccessToken, 
                                                _headers7)
                                            })).catch((function(err) {
                                                if (vault) throw err;
                                            })) : void 0;
                                            var _ref7, _headers7;
                                        }
                                    }));
                                }({
                                    orderID: orderID,
                                    vault: vault,
                                    clientAccessToken: clientAccessToken,
                                    fundingEligibility: fundingEligibility,
                                    fundingSource: fundingSource,
                                    createBillingAgreement: createBillingAgreement,
                                    createSubscription: createSubscription
                                }) : "pay_with_different_funding_shipping" === buyerIntent && clientAccessToken && paymentMethodID ? validatePaymentMethod({
                                    clientAccessToken: clientAccessToken,
                                    orderID: orderID,
                                    paymentMethodID: paymentMethodID,
                                    enableThreeDomainSecure: enableThreeDomainSecure,
                                    partnerAttributionID: partnerAttributionID,
                                    buttonSessionID: buttonSessionID
                                }) : void 0;
                            })).then((function() {
                                return orderID;
                            }));
                        }));
                    },
                    onApprove: function(_ref7) {
                        var payerID = _ref7.payerID, paymentID = _ref7.paymentID, billingToken = _ref7.billingToken, subscriptionID = _ref7.subscriptionID;
                        approved = !0;
                        getLogger().info("spb_onapprove_access_token_" + (buyerAccessToken ? "present" : "not_present")).flush();
                        return close().then((function() {
                            return _onApprove({
                                payerID: payerID,
                                paymentID: paymentID,
                                billingToken: billingToken,
                                subscriptionID: subscriptionID,
                                buyerAccessToken: buyerAccessToken
                            }, {
                                restart: restart
                            }).catch(src_util_noop);
                        }));
                    },
                    onAuth: function(_ref8) {
                        var accessToken = _ref8.accessToken;
                        getLogger().info("spb_onauth_access_token_" + (accessToken || buyerAccessToken ? "present" : "not_present"));
                        accessToken && (buyerAccessToken = accessToken);
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
                    onError: onError,
                    onClose: onClose,
                    fundingSource: fundingSource,
                    card: card,
                    buyerCountry: buyerCountry,
                    locale: locale,
                    commit: commit,
                    cspNonce: cspNonce
                })).renderTo((top = getTop(window), canRenderTop && top ? top : utils_getParent() ? utils_getParent() : window), "body", context);
                var top;
            }));
            return {
                click: function() {
                    supportsPopups() && (win = win || function(_ref) {
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
                                throw new PopupOpenError("Can not open popup window - " + (err.stack || err.message));
                            }
                            if (isWindowClosed(win)) {
                                var err;
                                throw new PopupOpenError("Can not open popup window - blocked");
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
                    }));
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
    var cardFields = {
        name: "card_fields",
        setup: function() {},
        isEligible: function(_ref) {
            var props = _ref.props;
            return !props.vault && !props.onShippingChange && (!!props.enableStandardCardFields || _ref.serviceData.eligibility.cardFields);
        },
        isPaymentEligible: function(_ref2) {
            var _ref3 = _ref2.payment || {}, fundingSource = _ref3.fundingSource;
            return !(_ref3.win || fundingSource && "card" !== fundingSource);
        },
        init: function(_ref4) {
            var props = _ref4.props, components = _ref4.components, payment = _ref4.payment, serviceData = _ref4.serviceData, config = _ref4.config;
            var createOrder = props.createOrder, _onApprove = props.onApprove, onCancel = props.onCancel, locale = props.locale, commit = props.commit, onError = props.onError, sessionID = props.sessionID, buttonSessionID = props.buttonSessionID;
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
                    buyerAccessToken = _ref7.accessToken;
                },
                onCancel: onCancel,
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
            cardFieldsOpen = !0;
            var close = function() {
                !function() {
                    var buttonsContainer = card_fields_getElements().buttonsContainer;
                    querySelectorAll("[data-card]").forEach((function(el) {
                        el.style.opacity = "1";
                    }));
                    buttonsContainer.style.marginTop = "0px";
                }();
                return closeCardFields();
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
                        window.addEventListener("resize", function(method, time) {
                            void 0 === time && (time = 100);
                            var timeout;
                            return setFunctionName((function() {
                                var _arguments3 = arguments, _this4 = this;
                                clearTimeout(timeout);
                                timeout = setTimeout((function() {
                                    return method.apply(_this4, _arguments3);
                                }), time);
                            }), getFunctionName(method) + "::debounced");
                        }((function() {
                            buttonsContainer.style.transitionDuration = "0s";
                            recalculateMargin();
                        })));
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
    var vaultCapture = {
        name: "vault_capture",
        setup: function() {},
        isEligible: function(_ref) {
            return !_ref.props.onShippingChange;
        },
        isPaymentEligible: function(_ref2) {
            var _ref3 = _ref2.payment || {};
            return !_ref3.win && !!_ref3.paymentMethodID;
        },
        init: function(_ref6) {
            var props = _ref6.props, components = _ref6.components, payment = _ref6.payment, serviceData = _ref6.serviceData, config = _ref6.config;
            var createOrder = props.createOrder, onApprove = props.onApprove, clientAccessToken = props.clientAccessToken, enableThreeDomainSecure = props.enableThreeDomainSecure, buttonSessionID = props.buttonSessionID, partnerAttributionID = props.partnerAttributionID, getParent = props.getParent;
            var ThreeDomainSecure = components.ThreeDomainSecure;
            var fundingSource = payment.fundingSource, paymentMethodID = payment.paymentMethodID;
            if (!paymentMethodID) throw new Error("Payment method id required for vault capture");
            if (!clientAccessToken) throw new Error("Client access token required for vault capture");
            var restart = function() {
                return promise_ZalgoPromise.try((function() {
                    throw new Error("Vault capture restart not implemented");
                }));
            };
            var shippingRequired = function(orderID) {
                return getSupplementalOrderInfo(orderID).then((function(order) {
                    var _order$checkoutSessio = order.checkoutSession, shippingAddress = _order$checkoutSessio.cart.shippingAddress;
                    return !(!_order$checkoutSessio.flags.isShippingAddressRequired || shippingAddress && shippingAddress.isFullAddress);
                }));
            };
            return {
                start: function() {
                    return promise_ZalgoPromise.try((function() {
                        return createOrder();
                    })).then((function(orderID) {
                        return promise_ZalgoPromise.hash({
                            validate: validatePaymentMethod({
                                clientAccessToken: clientAccessToken,
                                orderID: orderID,
                                paymentMethodID: paymentMethodID,
                                enableThreeDomainSecure: enableThreeDomainSecure,
                                buttonSessionID: buttonSessionID,
                                partnerAttributionID: partnerAttributionID
                            }),
                            requireShipping: shippingRequired(orderID)
                        });
                    })).then((function(_ref7) {
                        var validate = _ref7.validate;
                        if (_ref7.requireShipping) {
                            if ("paypal" !== fundingSource) throw new Error("Shipping address requested for " + fundingSource + " payment");
                            return function() {
                                getLogger().info("web_checkout_fallback").flush();
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
                },
                close: function() {
                    return promise_ZalgoPromise.resolve();
                }
            };
        },
        spinner: !0,
        inline: !0
    };
    var walletCapture = {
        name: "wallet_capture",
        setup: function() {},
        isEligible: function(_ref) {
            var serviceData = _ref.serviceData;
            return !!serviceData.wallet && !!serviceData.buyerAccessToken && !_ref.props.onShippingChange;
        },
        isPaymentEligible: function(_ref2) {
            var payment = _ref2.payment;
            var wallet = _ref2.serviceData.wallet;
            var fundingSource = payment.fundingSource, instrumentID = payment.instrumentID;
            if ("paypal" !== fundingSource) return !1;
            if (payment.win) return !1;
            if (!wallet) return !1;
            if (!instrumentID) return !1;
            var walletFunding = wallet[fundingSource];
            if (!walletFunding) return !1;
            var instrument = walletFunding.instruments.find((function(inst) {
                return inst.instrumentID === instrumentID;
            }));
            return !!instrument && !!instrument.oneClick;
        },
        init: function(_ref3) {
            var props = _ref3.props, components = _ref3.components, payment = _ref3.payment, serviceData = _ref3.serviceData, config = _ref3.config;
            var createOrder = props.createOrder, onApprove = props.onApprove;
            var instrumentID = payment.instrumentID;
            var buyerAccessToken = serviceData.buyerAccessToken;
            if (!instrumentID) throw new Error("Instrument id required for wallet capture");
            if (!buyerAccessToken) throw new Error("Buyer access token required for wallet capture");
            var fallbackToWebCheckout = function() {
                getLogger().info("web_checkout_fallback").flush();
                return function(buyerAccessToken) {
                    return callGraphQL({
                        query: "\n            query ExchangeIDToken(\n                $buyerAccessToken: String!\n            ) {\n                identity(\n                    accessToken: $buyerAccessToken\n                ) {\n                    idToken\n                }\n            }\n        ",
                        variables: {
                            buyerAccessToken: buyerAccessToken
                        }
                    }).then((function(_ref3) {
                        return _ref3.identity.idToken;
                    }));
                }(buyerAccessToken).then((function(idToken) {
                    return checkout.init({
                        props: props,
                        components: components,
                        serviceData: serviceData,
                        payment: _extends({}, payment, {
                            idToken: idToken,
                            isClick: !1,
                            buyerIntent: "pay_with_different_funding_shipping"
                        }),
                        config: config
                    }).start();
                }));
            };
            var restart = function() {
                return fallbackToWebCheckout();
            };
            return {
                start: function() {
                    return promise_ZalgoPromise.try((function() {
                        return createOrder();
                    })).then((function(orderID) {
                        return function(orderID) {
                            return getSupplementalOrderInfo(orderID).then((function(order) {
                                var _order$checkoutSessio = order.checkoutSession, shippingAddress = _order$checkoutSessio.cart.shippingAddress;
                                return !(!_order$checkoutSessio.flags.isShippingAddressRequired || shippingAddress && shippingAddress.isFullAddress);
                            }));
                        }(orderID).then((function(requireShipping) {
                            return requireShipping ? fallbackToWebCheckout() : (_ref10 = {
                                orderID: orderID,
                                buyerAccessToken: buyerAccessToken,
                                instrumentID: instrumentID
                            }, callGraphQL({
                                query: "\n            mutation ApproveOrder(\n                $orderID : String!\n                $planID : String\n                $instrumentID : String\n            ) {\n                approvePayment(\n                    token: $orderID\n                    selectedPlanId: $planID\n                    selectedInstrumentId : $instrumentID\n                ) {\n                    buyer {\n                        userId\n                    }\n                }\n            }\n        ",
                                variables: {
                                    orderID: _ref10.orderID,
                                    planID: _ref10.planID,
                                    instrumentID: _ref10.instrumentID
                                },
                                headers: (_headers9 = {}, _headers9["x-paypal-internal-euat"] = _ref10.buyerAccessToken, 
                                _headers9)
                            }).then((function(_ref11) {
                                return {
                                    payerID: _ref11.approvePayment.buyer.userId
                                };
                            }))).then((function(_ref4) {
                                return onApprove({
                                    payerID: _ref4.payerID
                                }, {
                                    restart: restart
                                });
                            }), (function(err) {
                                getLogger().warn("approve_order_error", {
                                    err: stringifyError(err)
                                }).flush();
                                return fallbackToWebCheckout();
                            }));
                            var _ref10, _headers9;
                        }));
                    }));
                },
                close: function() {
                    return promise_ZalgoPromise.resolve();
                }
            };
        },
        spinner: !0,
        inline: !0
    };
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
                        return connectionPromise.then((function(socket) {
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
                    }));
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
                        var database = firebase.database();
                        firebase.database.INTERNAL.forceWebSockets();
                        open = !0;
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
                databasePromise.catch(src_util_noop);
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
            getLogger().error("native_socket_error", {
                err: stringifyError(err)
            });
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
    var parentPopupBridge;
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
                                redirect_uri: parentPopupBridge.nativeUrl
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
            var props = _ref5.props;
            return promise_ZalgoPromise.try((function() {
                return (0, props.getPageUrl)().then((function(pageUrl) {
                    initialPageUrl = pageUrl;
                }));
            }));
        },
        isEligible: function(_ref3) {
            var props = _ref3.props;
            var createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription, env = props.env;
            var firebaseConfig = _ref3.config.firebase;
            var eligibility = _ref3.serviceData.eligibility;
            return !("local" === env || "stage" === env || "mobile" !== props.platform || props.onShippingChange && !isNativeOptedIn({
                props: props
            }) || createBillingAgreement || createSubscription || !supportsPopups() || !firebaseConfig || !(isIos() && function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /Safari/.test(ua) && !isChrome(ua);
            }() || isAndroidChrome()) || !isNativeOptedIn({
                props: props
            }) && !eligibility.nativeCheckout.paypal && !eligibility.nativeCheckout.venmo);
        },
        isPaymentEligible: function(_ref4) {
            var payment = _ref4.payment;
            var fundingSource = payment.fundingSource;
            var eligibility = _ref4.serviceData.eligibility;
            return !(payment.win || !initialPageUrl || !isNativeOptedIn({
                props: _ref4.props
            }) && !eligibility.nativeCheckout[fundingSource]);
        },
        init: function(_ref6) {
            var props = _ref6.props, components = _ref6.components, config = _ref6.config, payment = _ref6.payment, serviceData = _ref6.serviceData;
            var createOrder = props.createOrder, onApprove = props.onApprove, onCancel = props.onCancel, onError = props.onError, commit = props.commit, getPageUrl = props.getPageUrl, buttonSessionID = props.buttonSessionID, env = props.env, stageHost = props.stageHost, apiStageHost = props.apiStageHost, onClick = props.onClick, onShippingChange = props.onShippingChange;
            var facilitatorAccessToken = serviceData.facilitatorAccessToken, sdkMeta = serviceData.sdkMeta;
            var fundingSource = payment.fundingSource;
            var version = config.version, firebaseConfig = config.firebase;
            if (!firebaseConfig) throw new Error("Can not run native flow without firebase config");
            var clean = (tasks = [], cleaned = !1, {
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
                return clean.all();
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
                clean.register((function() {
                    return instance.close();
                }));
                return instance.start();
            };
            var getNativeDomain = memoize((function() {
                return "https://www.paypal.com";
            }));
            var getNativePopupDomain = memoize((function() {
                return "sandbox" === env ? "https://www.sandbox.paypal.com" : "https://ic.paypal.com";
            }));
            var getNativeUrl = memoize((function(_temp) {
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
            var getNativePopupUrl = memoize((function() {
                return extendUrl("" + getNativePopupDomain() + NATIVE_CHECKOUT_POPUP_URI[fundingSource], {
                    query: {
                        sdkMeta: sdkMeta
                    }
                });
            }));
            var getWebCheckoutUrl = memoize((function(_ref8) {
                var orderID = _ref8.orderID;
                return extendUrl(getDomain() + "/checkoutnow", {
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
                return promise_ZalgoPromise.hash({
                    orderID: createOrder(),
                    pageUrl: getPageUrl()
                }).then((function(_ref9) {
                    var orderID = _ref9.orderID, pageUrl = _ref9.pageUrl;
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
                        pageUrl: pageUrl,
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
            var connectNative = memoize((function(_ref10) {
                var socket = getNativeSocket({
                    sessionUID: _ref10.sessionUID,
                    firebaseConfig: firebaseConfig,
                    version: version
                });
                var setNativeProps = memoize((function() {
                    return getSDKProps().then((function(sdkProps) {
                        getLogger().info("native_message_setprops").flush();
                        return socket.send("setProps", sdkProps);
                    })).then((function() {
                        var _getLogger$info$track;
                        getLogger().info("native_response_setprops").track((_getLogger$info$track = {}, 
                        _getLogger$info$track.transition_name = "native_app_switch_ack", _getLogger$info$track)).flush();
                    }));
                }));
                var closeNative = memoize((function() {
                    getLogger().info("native_message_close").flush();
                    return socket.send("close").then((function() {
                        getLogger().info("native_response_close").flush();
                        return close();
                    }));
                }));
                var getPropsListener = socket.on("getProps", (function() {
                    getLogger().info("native_message_getprops").flush();
                    return getSDKProps();
                }));
                var onShippingChangeListener = socket.on("onShippingChange", (function(_ref11) {
                    var data = _ref11.data;
                    getLogger().info("native_message_onshippingchange").flush();
                    if (onShippingChange) {
                        var resolved = !0;
                        return onShippingChange(data, {
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
                        }).then((function() {
                            return {
                                resolved: resolved
                            };
                        }));
                    }
                }));
                var onApproveListener = socket.on("onApprove", (function(_ref12) {
                    var _ref12$data = _ref12.data, payerID = _ref12$data.payerID, paymentID = _ref12$data.paymentID, billingToken = _ref12$data.billingToken;
                    approved = !0;
                    getLogger().info("native_message_onapprove").flush();
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
                }));
                var onCancelListener = socket.on("onCancel", (function() {
                    cancelled = !0;
                    getLogger().info("native_message_oncancel").flush();
                    return promise_ZalgoPromise.all([ onCancel(), close() ]).then(src_util_noop);
                }));
                var onErrorListener = socket.on("onError", (function(_ref13) {
                    var message = _ref13.data.message;
                    getLogger().info("native_message_onerror", {
                        err: message
                    }).flush();
                    return promise_ZalgoPromise.all([ onError(new Error(message)), close() ]).then(src_util_noop);
                }));
                clean.register(getPropsListener.cancel);
                clean.register(onShippingChangeListener.cancel);
                clean.register(onApproveListener.cancel);
                clean.register(onCancelListener.cancel);
                clean.register(onErrorListener.cancel);
                socket.reconnect();
                return {
                    setProps: setNativeProps,
                    close: closeNative
                };
            }));
            var detectAppSwitch = once((function(_ref14) {
                var _getLogger$info$track2;
                var sessionUID = _ref14.sessionUID;
                getLogger().info("native_detect_app_switch").track((_getLogger$info$track2 = {}, 
                _getLogger$info$track2.transition_name = "native_detect_app_switch", _getLogger$info$track2)).flush();
                return connectNative({
                    sessionUID: sessionUID
                }).setProps();
            }));
            var detectWebSwitch = once((function(fallbackWin) {
                var _getLogger$info$track3;
                getLogger().info("native_detect_web_switch").track((_getLogger$info$track3 = {}, 
                _getLogger$info$track3.transition_name = "native_detect_web_switch", _getLogger$info$track3)).flush();
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
                clean.register((function() {
                    win && !isWindowClosed(win) && win.close();
                }));
                return win;
            }));
            return {
                click: function() {
                    return promise_ZalgoPromise.try((function() {
                        var sessionUID = uniqueID();
                        return isAndroidChrome() ? function(_ref15) {
                            var sessionUID = _ref15.sessionUID;
                            var nativeWin = popup(getNativeUrl({
                                sessionUID: sessionUID
                            }));
                            var validatePromise = validate();
                            var delayPromise = promise_ZalgoPromise.delay(500);
                            var detectWebSwitchListener = listen(nativeWin, getNativeDomain(), "detectWebSwitch", (function() {
                                getLogger().info("native_post_message_detect_web_switch").flush();
                                return detectWebSwitch(nativeWin);
                            }));
                            clean.register(detectWebSwitchListener.cancel);
                            return validatePromise.then((function(valid) {
                                return valid ? createOrder().then((function() {
                                    if (didAppSwitch(nativeWin)) return detectAppSwitch({
                                        sessionUID: sessionUID
                                    });
                                    if (nativeWin) return detectWebSwitch(nativeWin);
                                    throw new Error("No window found");
                                })).catch((function(err) {
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
                        }) : function(_ref16) {
                            var sessionUID = _ref16.sessionUID;
                            var popupWin = popup(getNativePopupUrl());
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
                            clean.register((function() {
                                closeListener.cancel();
                            }));
                            var validatePromise = validate();
                            var awaitRedirectListener = listen(popupWin, getNativePopupDomain(), "awaitRedirect", (function(_ref17) {
                                var pageUrl = _ref17.data.pageUrl;
                                getLogger().info("native_post_message_await_redirect").flush();
                                return validatePromise.then((function(valid) {
                                    return valid ? createOrder().then((function() {
                                        return {
                                            redirectUrl: getNativeUrl({
                                                sessionUID: sessionUID,
                                                pageUrl: pageUrl
                                            })
                                        };
                                    })) : close().then((function() {
                                        throw new Error("Validation failed");
                                    }));
                                }));
                            }));
                            var detectAppSwitchListener = listen(popupWin, getNativePopupDomain(), "detectAppSwitch", (function() {
                                getLogger().info("native_post_message_detect_app_switch").flush();
                                return detectAppSwitch({
                                    sessionUID: sessionUID
                                });
                            }));
                            var onCompleteListener = listen(popupWin, getNativePopupDomain(), "onComplete", (function() {
                                getLogger().info("native_post_message_on_complete").flush();
                                popupWin.close();
                            }));
                            var detectWebSwitchListener = listen(popupWin, getNativeDomain(), "detectWebSwitch", (function() {
                                getLogger().info("native_post_message_detect_web_switch").flush();
                                return detectWebSwitch(popupWin);
                            }));
                            clean.register(awaitRedirectListener.cancel);
                            clean.register(detectAppSwitchListener.cancel);
                            clean.register(onCompleteListener.cancel);
                            clean.register(detectWebSwitchListener.cancel);
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
                            var _getLogger$error$trac;
                            getLogger().error("native_error", {
                                err: stringifyError(err)
                            }).track((_getLogger$error$trac = {}, _getLogger$error$trac.transition_name = "native_app_switch_ack", 
                            _getLogger$error$trac.ext_error_code = "native_error", _getLogger$error$trac.ext_error_desc = stringifyErrorMessage(err), 
                            _getLogger$error$trac)).flush();
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
                getLogger().warn("honey_postmessage_failed", {
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
                        getLogger().addTrackingBuilder((function() {
                            var _ref2;
                            return (_ref2 = {}).honey_device_id = device_id, _ref2.honey_session_id = session_id, 
                            _ref2;
                        }));
                        getLogger().info("identify_honey").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "honey_identify", 
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
    var menu_popup = {
        width: 500,
        height: 590
    };
    var smartMenu;
    function setupButton(opts) {
        if (!window.paypal) throw new Error("PayPal SDK not loaded");
        var facilitatorAccessToken = opts.facilitatorAccessToken, fundingEligibility = opts.fundingEligibility, content = opts.content, serverCSPNonce = opts.cspNonce, firebaseConfig = opts.firebaseConfig;
        var clientID = window.xprops.clientID;
        var serviceData = getServiceData({
            eligibility: opts.eligibility,
            facilitatorAccessToken: facilitatorAccessToken,
            buyerGeoCountry: opts.buyerCountry,
            serverMerchantID: opts.merchantID,
            fundingEligibility: fundingEligibility,
            personalization: opts.personalization,
            isCardFieldsExperimentEnabled: opts.isCardFieldsExperimentEnabled,
            sdkMeta: opts.sdkMeta,
            buyerAccessToken: opts.buyerAccessToken,
            wallet: opts.wallet
        });
        var merchantID = serviceData.merchantID;
        var props = getProps({
            facilitatorAccessToken: facilitatorAccessToken
        });
        var env = props.env, sessionID = props.sessionID, partnerAttributionID = props.partnerAttributionID, commit = props.commit, correlationID = props.correlationID, locale = props.locale, buttonSessionID = props.buttonSessionID, merchantDomain = props.merchantDomain, onInit = props.onInit, getPrerenderDetails = props.getPrerenderDetails, rememberFunding = props.rememberFunding, style = props.style;
        var config = getConfig({
            serverCSPNonce: serverCSPNonce,
            firebaseConfig: firebaseConfig
        });
        var version = config.version;
        var components = getComponents();
        var _onInit = onInit(), initPromise = _onInit.initPromise, isEnabled = _onInit.isEnabled;
        var paymentProcessing = !1;
        function initiatePayment(_ref) {
            var payment = _ref.payment;
            return promise_ZalgoPromise.try((function() {
                if (!paymentProcessing) {
                    props = getProps({
                        facilitatorAccessToken: facilitatorAccessToken
                    });
                    var win = payment.win;
                    var onClick = props.onClick;
                    onClick && onClick({
                        fundingSource: payment.fundingSource
                    });
                    if (isEnabled()) {
                        paymentProcessing = !0;
                        return function(_ref3) {
                            var payment = _ref3.payment, serviceData = _ref3.serviceData, config = _ref3.config, components = _ref3.components, props = _ref3.props;
                            var button = payment.button, fundingSource = payment.fundingSource;
                            return promise_ZalgoPromise.try((function() {
                                var _getLogger$info$info$;
                                var merchantID = serviceData.merchantID;
                                var clientID = props.clientID, onClick = props.onClick, createOrder = props.createOrder, env = props.env;
                                !function(personalization) {
                                    personalization && personalization.tagline && personalization.tagline.tracking && sendBeacon(personalization.tagline.tracking.click);
                                    personalization && personalization.buttonText && personalization.buttonText.tracking && sendBeacon(personalization.buttonText.tracking.click);
                                }(serviceData.personalization);
                                var _getPaymentFlow = function(_ref2) {
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
                                }({
                                    props: props,
                                    payment: payment,
                                    config: config,
                                    components: components,
                                    serviceData: serviceData
                                }), name = _getPaymentFlow.name, inline = _getPaymentFlow.inline, spinner = _getPaymentFlow.spinner;
                                var _init = (0, _getPaymentFlow.init)({
                                    props: props,
                                    config: config,
                                    serviceData: serviceData,
                                    components: components,
                                    payment: payment
                                }), _init$click = _init.click, start = _init.start, close = _init.close;
                                var clickPromise = promise_ZalgoPromise.try(void 0 === _init$click ? promiseNoop : _init$click);
                                clickPromise.catch(src_util_noop);
                                getLogger().info("button_click").info("pay_flow_" + name).track((_getLogger$info$info$ = {}, 
                                _getLogger$info$info$.transition_name = "process_button_click", _getLogger$info$info$.selected_payment_method = fundingSource, 
                                _getLogger$info$info$.payment_flow = name, _getLogger$info$info$)).flush();
                                return promise_ZalgoPromise.hash({
                                    valid: !onClick || onClick({
                                        fundingSource: fundingSource
                                    })
                                }).then((function(_ref4) {
                                    if (_ref4.valid) {
                                        spinner && enableLoadingSpinner(button);
                                        createOrder().then((function(orderID) {
                                            return callGraphQL({
                                                query: "\n            mutation UpdateClientConfig(\n                $orderID : String!,\n                $fundingSource : ButtonFundingSourceType!,\n                $integrationArtifact : IntegrationArtifactType!,\n                $userExperienceFlow : UserExperienceFlowType!,\n                $productFlow : ProductFlowType!\n            ) {\n                updateClientConfig(\n                    token: $orderID,\n                    fundingSource: $fundingSource,\n                    integrationArtifact: $integrationArtifact,\n                    userExperienceFlow: $userExperienceFlow,\n                    productFlow: $productFlow\n                )\n            }\n        ",
                                                variables: {
                                                    orderID: (_ref9 = {
                                                        orderID: (_ref = {
                                                            orderID: orderID,
                                                            fundingSource: fundingSource,
                                                            inline: inline
                                                        }).orderID,
                                                        fundingSource: _ref.fundingSource,
                                                        integrationArtifact: "PAYPAL_JS_SDK",
                                                        userExperienceFlow: void 0 !== (_ref$inline = _ref.inline) && _ref$inline ? "INLINE" : "INCONTEXT",
                                                        productFlow: "SMART_PAYMENT_BUTTONS"
                                                    }).orderID,
                                                    fundingSource: _ref9.fundingSource,
                                                    integrationArtifact: _ref9.integrationArtifact,
                                                    userExperienceFlow: _ref9.userExperienceFlow,
                                                    productFlow: _ref9.productFlow
                                                }
                                            }).then(src_util_noop);
                                            var _ref, _ref$inline, _ref9;
                                        })).catch((function(err) {
                                            return getLogger().error("update_client_config_error", {
                                                err: stringifyError(err)
                                            });
                                        }));
                                        var expectedIntent = props.intent, expectedCurrency = props.currency;
                                        return promise_ZalgoPromise.try(start).then((function() {
                                            return createOrder();
                                        })).then((function(orderID) {
                                            return function(orderID, _ref2) {
                                                var env = _ref2.env, clientID = _ref2.clientID, merchantID = _ref2.merchantID, expectedCurrency = _ref2.expectedCurrency, expectedIntent = _ref2.expectedIntent;
                                                return promise_ZalgoPromise.hash({
                                                    order: getSupplementalOrderInfo(orderID),
                                                    payee: getPayee(orderID)
                                                }).then((function(_ref3) {
                                                    var payee = _ref3.payee;
                                                    var cart = _ref3.order.checkoutSession.cart;
                                                    var intent = "sale" === cart.intent.toLowerCase() ? "capture" : cart.intent.toLowerCase();
                                                    var currency = cart.amounts && cart.amounts.total.currencyCode;
                                                    if (intent !== expectedIntent) throw new Error("Expected intent from order api call to be " + expectedIntent + ", got " + intent + ". Please ensure you are passing intent=" + intent + " to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/");
                                                    if (currency && currency !== expectedCurrency) throw new Error("Expected currency from order api call to be " + expectedCurrency + ", got " + currency + ". Please ensure you are passing currency=" + currency + " to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/");
                                                    var payeeMerchantID = payee && payee.merchant && payee.merchant.id;
                                                    var actualMerchantID = merchantID && merchantID.length && merchantID[0];
                                                    if (!actualMerchantID) throw new Error("Could not determine correct merchant id");
                                                    if (!payeeMerchantID) throw new Error("No payee found in transaction. Expected " + actualMerchantID);
                                                    payeeMerchantID !== actualMerchantID && clientID && -1 === CLIENT_ID_PAYEE_NO_MATCH.indexOf(clientID) && getLogger().info("client_id_payee_no_match").flush();
                                                    var xpropMerchantID = window.xprops.merchantID && window.xprops.merchantID[0];
                                                    if (xpropMerchantID && payeeMerchantID !== xpropMerchantID) throw new Error("Payee passed in transaction does not match expected merchant id: " + xpropMerchantID);
                                                })).catch((function(err) {
                                                    var _getLogger$warn$warn$;
                                                    var isSandbox = "sandbox" === env;
                                                    var isWhitelisted = isSandbox ? clientID && -1 !== SANDBOX_ORDER_VALIDATION_WHITELIST.indexOf(clientID) : clientID && -1 !== ORDER_VALIDATION_WHITELIST.indexOf(clientID);
                                                    getLogger().warn((isSandbox ? "sandbox_" : "") + "order_validation_error" + (isWhitelisted ? "_whitelist" : ""), {
                                                        err: stringifyError(err)
                                                    }).warn((isSandbox ? "sandbox_" : "") + "order_validation_error" + (isWhitelisted ? "_whitelist" : "") + "_" + (clientID || "unknown"), {
                                                        err: stringifyError(err)
                                                    }).track((_getLogger$warn$warn$ = {}, _getLogger$warn$warn$.transition_name = "process_order_validate", 
                                                    _getLogger$warn$warn$.context_type = "EC-Token", _getLogger$warn$warn$.token = orderID, 
                                                    _getLogger$warn$warn$.context_id = orderID, _getLogger$warn$warn$.integration_issue = stringifyErrorMessage(err), 
                                                    _getLogger$warn$warn$.whitelist = isWhitelisted ? "true" : "false", _getLogger$warn$warn$)).flush();
                                                    if (!isWhitelisted) throw err;
                                                }));
                                            }(orderID, {
                                                env: env,
                                                clientID: clientID,
                                                merchantID: merchantID,
                                                expectedCurrency: expectedCurrency,
                                                expectedIntent: expectedIntent
                                            });
                                        })).then((function() {
                                            return clickPromise;
                                        })).catch((function(err) {
                                            return promise_ZalgoPromise.all([ close(), promise_ZalgoPromise.reject(err) ]);
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
                            props: props
                        }).finally((function() {
                            paymentProcessing = !1;
                        }));
                    }
                    win && win.close();
                }
            })).catch((function(err) {
                var _getLogger$info$track;
                getLogger().info("smart_buttons_payment_error", {
                    err: stringifyError(err)
                }).track(((_getLogger$info$track = {}).ext_error_code = "smart_buttons_payment_error", 
                _getLogger$info$track.ext_error_desc = stringifyErrorMessage(err), _getLogger$info$track));
                throw err;
            }));
        }
        querySelectorAll("[ data-funding-source ]").forEach((function(button) {
            var _getSelectedFunding = function(button) {
                var fundingSource = button.getAttribute("data-funding-source");
                var paymentMethodID = button.getAttribute("data-payment-method-id");
                var instrumentID = button.getAttribute("data-instrument-id");
                return {
                    fundingSource: fundingSource,
                    card: button.getAttribute("data-card"),
                    paymentMethodID: paymentMethodID,
                    instrumentID: instrumentID
                };
            }(button);
            var payment = {
                button: button,
                fundingSource: _getSelectedFunding.fundingSource,
                card: _getSelectedFunding.card,
                paymentMethodID: _getSelectedFunding.paymentMethodID,
                instrumentID: _getSelectedFunding.instrumentID,
                isClick: !0,
                buyerIntent: "pay"
            };
            !function(el) {
                el.addEventListener("mousedown", (function() {
                    el.classList.add("paypal-button-clicked");
                }));
                el.addEventListener("hover", (function(event) {
                    if (el.classList.contains("paypal-button-clicked")) {
                        event.preventDefault();
                        el.blur();
                        el.classList.remove("paypal-button-clicked");
                    }
                }));
            }(button);
            !function(_ref) {
                var props = _ref.props, payment = _ref.payment, content = _ref.content, initiatePayment = _ref.initiatePayment;
                var clientID = props.clientID, clientAccessToken = props.clientAccessToken;
                var button = payment.button, fundingSource = payment.fundingSource, paymentMethodID = payment.paymentMethodID;
                var menuToggle = button.querySelector("[data-menu]");
                var buttonParent = button.parentElement;
                if (clientID && buttonParent && menuToggle && paymentMethodID && clientAccessToken) {
                    smartMenu = smartMenu || function(_ref) {
                        var clientID = _ref.clientID;
                        var Menu = paypal.Menu;
                        if (!Menu) throw new Error("Menu component not found");
                        var _Menu = Menu({
                            clientID: clientID
                        }), renderTo = _Menu.renderTo, updateProps = _Menu.updateProps, show = _Menu.show, hide = _Menu.hide;
                        var render = memoize((function() {
                            return renderTo(window.xprops.getParent(), "#smart-menu");
                        }));
                        hide();
                        render();
                        return {
                            display: function(_ref2) {
                                var choices = _ref2.choices, verticalOffset = _ref2.verticalOffset, _onChoose = _ref2.onChoose;
                                return render().then((function() {
                                    return updateProps({
                                        verticalOffset: verticalOffset,
                                        choices: choices,
                                        onChoose: function(_ref3) {
                                            var id = _ref3.id, win = _ref3.win;
                                            hide();
                                            return _onChoose({
                                                id: id,
                                                win: win
                                            });
                                        }
                                    });
                                })).then((function() {
                                    return show();
                                }));
                            }
                        };
                    }({
                        clientID: clientID
                    });
                    dom_onClick(menuToggle, (function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        var choices = "paypal" === fundingSource ? [ {
                            id: "SELECT_FUNDING_SHIPPING",
                            label: content.chooseCardOrShipping,
                            popup: menu_popup
                        }, {
                            id: "CHANGE_ACCOUNT",
                            label: content.useDifferentAccount,
                            popup: menu_popup
                        } ] : [ {
                            id: "DELETE_VAULT",
                            label: content.deleteVaultedCard
                        } ];
                        var verticalOffset = button.getBoundingClientRect().bottom;
                        var loadingTimeout = setTimeout((function() {
                            return enableLoadingSpinner(button);
                        }), 50);
                        smartMenu.display({
                            choices: choices,
                            verticalOffset: verticalOffset,
                            onChoose: function(_ref2) {
                                var id = _ref2.id, win = _ref2.win;
                                if ("CHANGE_ACCOUNT" === id) return initiatePayment({
                                    payment: _extends({}, payment, {
                                        win: win,
                                        buyerIntent: "pay_with_different_account"
                                    })
                                });
                                if ("DELETE_VAULT" === id) {
                                    if (!clientAccessToken || !paymentMethodID) throw new Error("Can not delete vault without client access token and payment method id");
                                    enableLoadingSpinner(button);
                                    return (_ref8 = {
                                        paymentMethodID: paymentMethodID,
                                        clientAccessToken: clientAccessToken
                                    }, callGraphQL({
                                        query: "\n            mutation DeleteVault(\n                $paymentMethodID : String!\n            ) {\n                deleteVault(\n                    paymentMethodID: $paymentMethodID\n                )\n            }\n        ",
                                        variables: {
                                            paymentMethodID: _ref8.paymentMethodID
                                        },
                                        headers: (_headers8 = {}, _headers8["x-paypal-internal-euat"] = _ref8.clientAccessToken, 
                                        _headers8)
                                    })).then((function() {
                                        disableLoadingSpinner(button);
                                        destroyElement(button);
                                        if (0 === buttonParent.querySelectorAll("[data-payment-method-id]").length) {
                                            var payInstantlyHeader = buttonParent.querySelector(".paypal-vault-header");
                                            payInstantlyHeader && destroyElement(payInstantlyHeader);
                                        }
                                    }));
                                }
                                if ("SELECT_FUNDING_SHIPPING" === id) {
                                    if (!clientAccessToken || !paymentMethodID) throw new Error("Can not change funding or shipping without client access token and payment method id");
                                    return initiatePayment({
                                        payment: _extends({}, payment, {
                                            win: win,
                                            buyerIntent: "pay_with_different_funding_shipping"
                                        })
                                    });
                                }
                                var _ref8, _headers8;
                            }
                        }).then((function() {
                            clearTimeout(loadingTimeout);
                            disableLoadingSpinner(button);
                        }));
                    }));
                }
            }({
                props: props,
                payment: payment,
                content: content,
                initiatePayment: initiatePayment
            });
            dom_onClick(button, (function(event) {
                event.preventDefault();
                event.stopPropagation();
                var payPromise = initiatePayment({
                    payment: payment
                });
                button.payPromise = payPromise;
            }));
        }));
        var setupPrerenderTask = initPromise.then((function() {
            return promise_ZalgoPromise.hash({
                prerenderDetails: getPrerenderDetails(),
                initPromise: initPromise
            }).then((function(_ref2) {
                var prerenderDetails = _ref2.prerenderDetails;
                if (prerenderDetails) {
                    var win = prerenderDetails.win, fundingSource = prerenderDetails.fundingSource, card = prerenderDetails.card;
                    var button = document.querySelector("[data-funding-source=" + fundingSource + "]");
                    if (!button) throw new Error("Can not find button element");
                    var payPromise = initiatePayment({
                        payment: {
                            win: win,
                            button: button,
                            fundingSource: fundingSource,
                            card: card,
                            buyerIntent: "pay"
                        }
                    });
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
            var env = _ref.env, sessionID = _ref.sessionID, buttonSessionID = _ref.buttonSessionID, clientID = _ref.clientID, partnerAttributionID = _ref.partnerAttributionID, commit = _ref.commit, correlationID = _ref.correlationID, locale = _ref.locale, merchantID = _ref.merchantID, merchantDomain = _ref.merchantDomain, version = _ref.version, style = _ref.style;
            var logger = getLogger();
            !function(_ref) {
                var env = _ref.env, sessionID = _ref.sessionID, clientID = _ref.clientID, partnerAttributionID = _ref.partnerAttributionID, commit = _ref.commit, correlationID = _ref.correlationID, locale = _ref.locale, merchantID = _ref.merchantID, merchantDomain = _ref.merchantDomain, version = _ref.version;
                var logger = getLogger();
                logger.addPayloadBuilder((function() {
                    return {
                        referer: window.location.host,
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
                    _ref2.user_action = commit ? "commit" : "continue", _ref2.context_correlation_id = correlationID, 
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
                correlationID: correlationID,
                locale: locale,
                merchantID: merchantID,
                merchantDomain: merchantDomain,
                version: version
            });
            logger.addPayloadBuilder((function() {
                return {
                    buttonSessionID: buttonSessionID
                };
            }));
            logger.addTrackingBuilder((function() {
                var _ref2;
                return (_ref2 = {}).state_name = "smart_button", _ref2.context_type = "button_session_id", 
                _ref2.context_id = buttonSessionID, _ref2.state_name = "smart_button", _ref2.button_session_id = buttonSessionID, 
                _ref2.button_version = "2.0.234", _ref2;
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
            return waitForDocumentReady().then((function() {
                var performance = getPerformance();
                if (performance) {
                    var timing = performance.timing;
                    return timing.connectEnd && timing.domInteractive ? timing.domInteractive - timing.connectEnd : void 0;
                }
            })).then((function(pageRenderTime) {
                var _logger$track;
                var fundingSources = [].slice.call(document.querySelectorAll("[data-funding-source]")).map((function(el) {
                    return el.getAttribute("data-funding-source");
                }));
                var layout = style.layout, color = style.color, shape = style.shape, label = style.label, _style$tagline = style.tagline, tagline = void 0 === _style$tagline || _style$tagline;
                logger.info("button_render_color_" + color);
                logger.info("button_render_shape_" + shape);
                logger.info("button_render_label_" + label);
                logger.info("button_render_layout_" + layout);
                logger.info("button_render_tagline_" + tagline.toString());
                logger.track(((_logger$track = {}).transition_name = "process_button_load", _logger$track.eligible_payment_methods = fundingSources.join(":"), 
                _logger$track.eligible_payment_count = fundingSources.length.toString(), _logger$track.page_load_time = pageRenderTime ? pageRenderTime.toString() : "", 
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
            correlationID: correlationID,
            locale: locale,
            merchantID: merchantID,
            buttonSessionID: buttonSessionID,
            merchantDomain: merchantDomain
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
        return promise_ZalgoPromise.hash({
            initPromise: initPromise,
            facilitatorAccessToken: facilitatorAccessToken,
            setupButtonLogsTask: setupButtonLogsTask,
            setupPrerenderTask: setupPrerenderTask,
            setupRememberTask: setupRememberTask,
            setupPaymentFlowsTask: setupPaymentFlowsTask
        }).then(src_util_noop);
    }
} ]);