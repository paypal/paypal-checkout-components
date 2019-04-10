window.spb = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return {}.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var interface_namespaceObject = {};
    function getUserAgent() {
        return window.navigator.mockUserAgent || window.navigator.userAgent;
    }
    function isOperaMini(ua) {
        return void 0 === ua && (ua = getUserAgent()), ua.indexOf("Opera Mini") > -1;
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
            if ("undefined" != typeof window && window.Window && item instanceof window.Window) return !1;
            if ("undefined" != typeof window && window.constructor && item instanceof window.constructor) return !1;
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
    __webpack_require__.r(interface_namespaceObject), __webpack_require__.d(interface_namespaceObject, "WeakMap", function() {
        return weakmap_CrossDomainSafeWeakMap;
    });
    var flushPromise, dispatchedErrors = [], possiblyUnhandledPromiseHandlers = [], activeCount = 0;
    function flushActive() {
        if (!activeCount && flushPromise) {
            var promise = flushPromise;
            flushPromise = null, promise.resolve();
        }
    }
    function startActive() {
        activeCount += 1;
    }
    function endActive() {
        activeCount -= 1, flushActive();
    }
    var promise_ZalgoPromise = function() {
        function ZalgoPromise(handler) {
            var _this = this;
            if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, 
            this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, 
            this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, 
            this.handlers = [], handler) {
                var _result, _error, resolved = !1, rejected = !1, isAsync = !1;
                startActive();
                try {
                    handler(function(res) {
                        isAsync ? _this.resolve(res) : (resolved = !0, _result = res);
                    }, function(err) {
                        isAsync ? _this.reject(err) : (rejected = !0, _error = err);
                    });
                } catch (err) {
                    return endActive(), void this.reject(err);
                }
                endActive(), isAsync = !0, resolved ? this.resolve(_result) : rejected && this.reject(_error);
            }
        }
        var _proto = ZalgoPromise.prototype;
        return _proto.resolve = function(result) {
            if (this.resolved || this.rejected) return this;
            if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
            return this.resolved = !0, this.value = result, this.dispatch(), this;
        }, _proto.reject = function(error) {
            var _this2 = this;
            if (this.resolved || this.rejected) return this;
            if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
            if (!error) {
                var _err = error && "function" == typeof error.toString ? error.toString() : {}.toString.call(error);
                error = new Error("Expected reject to be called with Error, got " + _err);
            }
            return this.rejected = !0, this.error = error, this.errorHandled || setTimeout(function() {
                _this2.errorHandled || function(err, promise) {
                    if (-1 === dispatchedErrors.indexOf(err)) {
                        dispatchedErrors.push(err), setTimeout(function() {
                            throw err;
                        }, 1);
                        for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                    }
                }(error, _this2);
            }, 1), this.dispatch(), this;
        }, _proto.asyncReject = function(error) {
            return this.errorHandled = !0, this.reject(error), this;
        }, _proto.dispatch = function() {
            var _this3 = this, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
            if (!this.dispatching && (resolved || rejected)) {
                this.dispatching = !0, startActive();
                for (var _loop = function(i) {
                    var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                    if (resolved) try {
                        result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                    } catch (err) {
                        return promise.reject(err), "continue";
                    } else if (rejected) {
                        if (!onError) return promise.reject(_this3.error), "continue";
                        try {
                            result = onError(_this3.error);
                        } catch (err) {
                            return promise.reject(err), "continue";
                        }
                    }
                    result instanceof ZalgoPromise && (result.resolved || result.rejected) ? (result.resolved ? promise.resolve(result.value) : promise.reject(result.error), 
                    result.errorHandled = !0) : utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                        promise.resolve(res);
                    }, function(err) {
                        promise.reject(err);
                    }) : promise.resolve(result);
                }, i = 0; i < handlers.length; i++) _loop(i);
                handlers.length = 0, this.dispatching = !1, endActive();
            }
        }, _proto.then = function(onSuccess, onError) {
            if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
            if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
            var promise = new ZalgoPromise();
            return this.handlers.push({
                promise: promise,
                onSuccess: onSuccess,
                onError: onError
            }), this.errorHandled = !0, this.dispatch(), promise;
        }, _proto.catch = function(onError) {
            return this.then(void 0, onError);
        }, _proto.finally = function(onFinally) {
            if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
            return this.then(function(result) {
                return ZalgoPromise.try(onFinally).then(function() {
                    return result;
                });
            }, function(err) {
                return ZalgoPromise.try(onFinally).then(function() {
                    throw err;
                });
            });
        }, _proto.timeout = function(time, err) {
            var _this4 = this;
            if (this.resolved || this.rejected) return this;
            var timeout = setTimeout(function() {
                _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
            }, time);
            return this.then(function(result) {
                return clearTimeout(timeout), result;
            });
        }, _proto.toPromise = function() {
            if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
            return Promise.resolve(this);
        }, ZalgoPromise.resolve = function(value) {
            return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                return value.then(resolve, reject);
            }) : new ZalgoPromise().resolve(value);
        }, ZalgoPromise.reject = function(error) {
            return new ZalgoPromise().reject(error);
        }, ZalgoPromise.asyncReject = function(error) {
            return new ZalgoPromise().asyncReject(error);
        }, ZalgoPromise.all = function(promises) {
            var promise = new ZalgoPromise(), count = promises.length, results = [];
            if (!count) return promise.resolve(results), promise;
            for (var _loop2 = function(i) {
                var prom = promises[i];
                if (prom instanceof ZalgoPromise) {
                    if (prom.resolved) return results[i] = prom.value, count -= 1, "continue";
                } else if (!utils_isPromise(prom)) return results[i] = prom, count -= 1, "continue";
                ZalgoPromise.resolve(prom).then(function(result) {
                    results[i] = result, 0 == (count -= 1) && promise.resolve(results);
                }, function(err) {
                    promise.reject(err);
                });
            }, i = 0; i < promises.length; i++) _loop2(i);
            return 0 === count && promise.resolve(results), promise;
        }, ZalgoPromise.hash = function(promises) {
            var result = {};
            return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                return ZalgoPromise.resolve(promises[key]).then(function(value) {
                    result[key] = value;
                });
            })).then(function() {
                return result;
            });
        }, ZalgoPromise.map = function(items, method) {
            return ZalgoPromise.all(items.map(method));
        }, ZalgoPromise.onPossiblyUnhandledException = function(handler) {
            return function(handler) {
                return possiblyUnhandledPromiseHandlers.push(handler), {
                    cancel: function() {
                        possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                    }
                };
            }(handler);
        }, ZalgoPromise.try = function(method, context, args) {
            if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
            var result;
            startActive();
            try {
                result = method.apply(context, args || []);
            } catch (err) {
                return endActive(), ZalgoPromise.reject(err);
            }
            return endActive(), ZalgoPromise.resolve(result);
        }, ZalgoPromise.delay = function(_delay) {
            return new ZalgoPromise(function(resolve) {
                setTimeout(resolve, _delay);
            });
        }, ZalgoPromise.isPromise = function(value) {
            return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
        }, ZalgoPromise.flush = function() {
            return promise = flushPromise = flushPromise || new ZalgoPromise(), flushActive(), 
            promise;
            var promise;
        }, ZalgoPromise;
    }(), PROTOCOL = {
        MOCK: "mock:",
        FILE: "file:",
        ABOUT: "about:"
    }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
    function isAboutProtocol(win) {
        return void 0 === win && (win = window), win.location.protocol === PROTOCOL.ABOUT;
    }
    function getParent(win) {
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
        var location = (win = win || window).location;
        if (!location) throw new Error("Can not read window location");
        var protocol = location.protocol;
        if (!protocol) throw new Error("Can not read window protocol");
        if (protocol === PROTOCOL.FILE) return PROTOCOL.FILE + "//";
        if (protocol === PROTOCOL.ABOUT) {
            var parent = getParent(win);
            return parent && canReadFromWindow() ? getActualDomain(parent) : PROTOCOL.ABOUT + "//";
        }
        var host = location.host;
        if (!host) throw new Error("Can not read window host");
        return protocol + "//" + host;
    }
    function getDomain(win) {
        var domain = getActualDomain(win = win || window);
        return domain && win.mockDomain && 0 === win.mockDomain.indexOf(PROTOCOL.MOCK) ? win.mockDomain : domain;
    }
    function isAncestorParent(parent, child) {
        if (!parent || !child) return !1;
        var childParent = getParent(child);
        return childParent ? childParent === parent : -1 !== function(win) {
            var result = [];
            try {
                for (;win.parent !== win; ) result.push(win.parent), win = win.parent;
            } catch (err) {}
            return result;
        }(child).indexOf(parent);
    }
    function getTop(win) {
        if (win) {
            try {
                if (win.top) return win.top;
            } catch (err) {}
            if (getParent(win) === win) return win;
            try {
                if (isAncestorParent(window, win) && window.top) return window.top;
            } catch (err) {}
            try {
                if (isAncestorParent(win, window) && window.top) return window.top;
            } catch (err) {}
            for (var _i7 = 0, _getAllChildFrames4 = function getAllChildFrames(win) {
                for (var result = [], _i3 = 0, _getFrames2 = function(win) {
                    var frames, len, result = [];
                    try {
                        frames = win.frames;
                    } catch (err) {
                        frames = win;
                    }
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
                if (getParent(frame) === frame) return frame;
            }
        }
    }
    var iframeWindows = [], iframeFrames = [];
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
        if (allowMock && function(win) {
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
        }(win)) try {
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
                return !(!doc || !doc.documentElement || doc.documentElement.contains(frame));
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
        return !1;
    }
    function util_safeIndexOf(collection, item) {
        for (var i = 0; i < collection.length; i++) try {
            if (collection[i] === item) return i;
        } catch (err) {}
        return -1;
    }
    var objectIDs, defineProperty = Object.defineProperty, counter = Date.now() % 1e9, weakmap_CrossDomainSafeWeakMap = function() {
        function CrossDomainSafeWeakMap() {
            if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, 
            counter += 1, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter, 
            function() {
                if ("undefined" == typeof WeakMap) return !1;
                if (void 0 === Object.freeze) return !1;
                try {
                    var testWeakMap = new WeakMap(), testKey = {};
                    return Object.freeze(testKey), testWeakMap.set(testKey, "__testvalue__"), "__testvalue__" === testWeakMap.get(testKey);
                } catch (err) {
                    return !1;
                }
            }()) try {
                this.weakmap = new WeakMap();
            } catch (err) {}
            this.keys = [], this.values = [];
        }
        var _proto = CrossDomainSafeWeakMap.prototype;
        return _proto._cleanupClosedWindows = function() {
            for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                var value = keys[i];
                if (isWindow(value) && isWindowClosed(value)) {
                    if (weakmap) try {
                        weakmap.delete(value);
                    } catch (err) {}
                    keys.splice(i, 1), this.values.splice(i, 1), i -= 1;
                }
            }
        }, _proto.isSafeToReadWrite = function(key) {
            return !isWindow(key);
        }, _proto.set = function(key, value) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                weakmap.set(key, value);
            } catch (err) {
                delete this.weakmap;
            }
            if (this.isSafeToReadWrite(key)) {
                var name = this.name, entry = key[name];
                entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                    value: [ key, value ],
                    writable: !0
                });
            } else {
                this._cleanupClosedWindows();
                var keys = this.keys, values = this.values, index = util_safeIndexOf(keys, key);
                -1 === index ? (keys.push(key), values.push(value)) : values[index] = value;
            }
        }, _proto.get = function(key) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                if (weakmap.has(key)) return weakmap.get(key);
            } catch (err) {
                delete this.weakmap;
            }
            if (!this.isSafeToReadWrite(key)) {
                this._cleanupClosedWindows();
                var index = util_safeIndexOf(this.keys, key);
                if (-1 === index) return;
                return this.values[index];
            }
            var entry = key[this.name];
            if (entry && entry[0] === key) return entry[1];
        }, _proto.delete = function(key) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                weakmap.delete(key);
            } catch (err) {
                delete this.weakmap;
            }
            if (this.isSafeToReadWrite(key)) {
                var entry = key[this.name];
                entry && entry[0] === key && (entry[0] = entry[1] = void 0);
            } else {
                this._cleanupClosedWindows();
                var keys = this.keys, index = util_safeIndexOf(keys, key);
                -1 !== index && (keys.splice(index, 1), this.values.splice(index, 1));
            }
        }, _proto.has = function(key) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                if (weakmap.has(key)) return !0;
            } catch (err) {
                delete this.weakmap;
            }
            if (this.isSafeToReadWrite(key)) {
                var entry = key[this.name];
                return !(!entry || entry[0] !== key);
            }
            return this._cleanupClosedWindows(), -1 !== util_safeIndexOf(this.keys, key);
        }, _proto.getOrSet = function(key, getter) {
            if (this.has(key)) return this.get(key);
            var value = getter();
            return this.set(key, value), value;
        }, CrossDomainSafeWeakMap;
    }();
    function memoize(method, options) {
        var _this = this;
        void 0 === options && (options = {});
        var cacheMap = new weakmap_CrossDomainSafeWeakMap();
        function memoizedFunction() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            var cache = cacheMap.getOrSet(options.thisNamespace ? this : method, function() {
                return {};
            }), key = function(args) {
                try {
                    return JSON.stringify([].slice.call(args), function(subkey, val) {
                        return "function" == typeof val ? "memoize[" + function(obj) {
                            if (objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap(), null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                            var chars, uid = objectIDs.get(obj);
                            return uid || (uid = typeof obj + ":" + (chars = "0123456789abcdef", "xxxxxxxxxx".replace(/./g, function() {
                                return chars.charAt(Math.floor(Math.random() * chars.length));
                            }) + "_" + function(str) {
                                if ("function" == typeof btoa) return btoa(str);
                                if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64");
                                throw new Error("Can not find window.btoa or Buffer");
                            }(new Date().toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase()), 
                            objectIDs.set(obj, uid)), uid;
                        }(val) + "]" : val;
                    });
                } catch (err) {
                    throw new Error("Arguments not serializable -- can not be used to memoize");
                }
            }(args), cacheTime = options.time;
            if (cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime && delete cache[key], 
            cache[key]) return cache[key].value;
            var time = Date.now(), value = method.apply(this, arguments);
            return cache[key] = {
                time: time,
                value: value
            }, cache[key].value;
        }
        return memoizedFunction.reset = function() {
            cacheMap.delete(options.thisNamespace ? _this : method);
        }, options.name && (memoizedFunction.displayName = options.name + ":memoized"), 
        memoizedFunction;
    }
    function src_util_noop() {}
    var KEY_CODES = {
        ENTER: 13
    };
    Object.create(Error.prototype);
    var _COUNTRY_LANGS, HEADERS = {
        CONTENT_TYPE: "content-type",
        ACCEPT: "accept"
    }, headerBuilders = [];
    function request(_ref) {
        var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 0 : _ref$timeout;
        return new promise_ZalgoPromise(function(resolve, reject) {
            if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
            for (var normalizedHeaders = {}, _i4 = 0, _Object$keys2 = Object.keys(headers); _i4 < _Object$keys2.length; _i4++) {
                var _key2 = _Object$keys2[_i4];
                normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
            }
            json ? normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/json" : (data || body) && (normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/x-www-form-urlencoded; charset=utf-8"), 
            normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || "application/json";
            for (var _i6 = 0; _i6 < headerBuilders.length; _i6++) for (var builtHeaders = (0, 
            headerBuilders[_i6])(), _i8 = 0, _Object$keys4 = Object.keys(builtHeaders); _i8 < _Object$keys4.length; _i8++) {
                var _key3 = _Object$keys4[_i8];
                normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
            }
            var xhr = new win.XMLHttpRequest();
            for (var _key4 in xhr.addEventListener("load", function() {
                var responseHeaders = function(rawHeaders) {
                    void 0 === rawHeaders && (rawHeaders = "");
                    for (var result = {}, _i2 = 0, _rawHeaders$trim$spli2 = rawHeaders.trim().split("\n"); _i2 < _rawHeaders$trim$spli2.length; _i2++) {
                        var _line$split = _rawHeaders$trim$spli2[_i2].split(":"), _key = _line$split[0], values = _line$split.slice(1);
                        result[_key.toLowerCase()] = values.join(":").trim();
                    }
                    return result;
                }(this.getAllResponseHeaders());
                if (!this.status) return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code."));
                var contentType = responseHeaders["content-type"], isJSON = contentType && (0 === contentType.indexOf("application/json") || 0 === contentType.indexOf("text/json")), responseBody = this.responseText;
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
            }, !1), xhr.addEventListener("error", function(evt) {
                reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
            }, !1), xhr.open(method, url, !0), normalizedHeaders) normalizedHeaders.hasOwnProperty(_key4) && xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
            json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map(function(key) {
                return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
            }).join("&")), xhr.timeout = timeout, xhr.ontimeout = function() {
                reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
            }, xhr.send(body);
        });
    }
    var COUNTRY = {
        AD: "AD",
        AE: "AE",
        AG: "AG",
        AI: "AI",
        AL: "AL",
        AM: "AM",
        AN: "AN",
        AO: "AO",
        AR: "AR",
        AT: "AT",
        AU: "AU",
        AW: "AW",
        AZ: "AZ",
        BA: "BA",
        BB: "BB",
        BE: "BE",
        BF: "BF",
        BG: "BG",
        BH: "BH",
        BI: "BI",
        BJ: "BJ",
        BM: "BM",
        BN: "BN",
        BO: "BO",
        BR: "BR",
        BS: "BS",
        BT: "BT",
        BW: "BW",
        BY: "BY",
        BZ: "BZ",
        CA: "CA",
        CD: "CD",
        CG: "CG",
        CH: "CH",
        CI: "CI",
        CK: "CK",
        CL: "CL",
        CM: "CM",
        CN: "CN",
        CO: "CO",
        CR: "CR",
        CV: "CV",
        CY: "CY",
        CZ: "CZ",
        DE: "DE",
        DJ: "DJ",
        DK: "DK",
        DM: "DM",
        DO: "DO",
        DZ: "DZ",
        EC: "EC",
        EE: "EE",
        EG: "EG",
        ER: "ER",
        ES: "ES",
        ET: "ET",
        FI: "FI",
        FJ: "FJ",
        FK: "FK",
        FM: "FM",
        FO: "FO",
        FR: "FR",
        GA: "GA",
        GB: "GB",
        GD: "GD",
        GE: "GE",
        GF: "GF",
        GI: "GI",
        GL: "GL",
        GM: "GM",
        GN: "GN",
        GP: "GP",
        GR: "GR",
        GT: "GT",
        GW: "GW",
        GY: "GY",
        HK: "HK",
        HN: "HN",
        HR: "HR",
        HU: "HU",
        ID: "ID",
        IE: "IE",
        IL: "IL",
        IN: "IN",
        IS: "IS",
        IT: "IT",
        JM: "JM",
        JO: "JO",
        JP: "JP",
        KE: "KE",
        KG: "KG",
        KH: "KH",
        KI: "KI",
        KM: "KM",
        KN: "KN",
        KR: "KR",
        KW: "KW",
        KY: "KY",
        KZ: "KZ",
        LA: "LA",
        LC: "LC",
        LI: "LI",
        LK: "LK",
        LS: "LS",
        LT: "LT",
        LU: "LU",
        LV: "LV",
        MA: "MA",
        MC: "MC",
        MD: "MD",
        ME: "ME",
        MG: "MG",
        MH: "MH",
        MK: "MK",
        ML: "ML",
        MN: "MN",
        MQ: "MQ",
        MR: "MR",
        MS: "MS",
        MT: "MT",
        MU: "MU",
        MV: "MV",
        MW: "MW",
        MX: "MX",
        MY: "MY",
        MZ: "MZ",
        NA: "NA",
        NC: "NC",
        NE: "NE",
        NF: "NF",
        NG: "NG",
        NI: "NI",
        NL: "NL",
        NO: "NO",
        NP: "NP",
        NR: "NR",
        NU: "NU",
        NZ: "NZ",
        OM: "OM",
        PA: "PA",
        PE: "PE",
        PF: "PF",
        PG: "PG",
        PH: "PH",
        PL: "PL",
        PM: "PM",
        PN: "PN",
        PT: "PT",
        PW: "PW",
        PY: "PY",
        QA: "QA",
        RE: "RE",
        RO: "RO",
        RS: "RS",
        RU: "RU",
        RW: "RW",
        SA: "SA",
        SB: "SB",
        SC: "SC",
        SE: "SE",
        SG: "SG",
        SH: "SH",
        SI: "SI",
        SJ: "SJ",
        SK: "SK",
        SL: "SL",
        SM: "SM",
        SN: "SN",
        SO: "SO",
        SR: "SR",
        ST: "ST",
        SV: "SV",
        SZ: "SZ",
        TC: "TC",
        TD: "TD",
        TG: "TG",
        TH: "TH",
        TJ: "TJ",
        TM: "TM",
        TN: "TN",
        TO: "TO",
        TR: "TR",
        TT: "TT",
        TV: "TV",
        TW: "TW",
        TZ: "TZ",
        UA: "UA",
        UG: "UG",
        US: "US",
        UY: "UY",
        VA: "VA",
        VC: "VC",
        VE: "VE",
        VG: "VG",
        VN: "VN",
        VU: "VU",
        WF: "WF",
        WS: "WS",
        YE: "YE",
        YT: "YT",
        ZA: "ZA",
        ZM: "ZM",
        ZW: "ZW"
    }, SDK_QUERY_KEYS = ((_COUNTRY_LANGS = {})[COUNTRY.AD] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.AE] = [ "en", "fr", "es", "zh", "ar" ], _COUNTRY_LANGS[COUNTRY.AG] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.AI] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.AL] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.AM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.AN] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.AO] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.AR] = [ "es", "en" ], 
    _COUNTRY_LANGS[COUNTRY.AT] = [ "de", "en" ], _COUNTRY_LANGS[COUNTRY.AU] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.AW] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.AZ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.BA] = [ "en" ], _COUNTRY_LANGS[COUNTRY.BB] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.BE] = [ "en", "nl", "fr" ], _COUNTRY_LANGS[COUNTRY.BF] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.BG] = [ "en" ], _COUNTRY_LANGS[COUNTRY.BH] = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.BI] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.BJ] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.BM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.BN] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.BO] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.BR] = [ "pt", "en" ], 
    _COUNTRY_LANGS[COUNTRY.BS] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.BT] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.BW] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.BY] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.BZ] = [ "en", "es", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.CA] = [ "en", "fr" ], 
    _COUNTRY_LANGS[COUNTRY.CD] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.CG] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.CH] = [ "de", "fr", "en" ], _COUNTRY_LANGS[COUNTRY.CI] = [ "fr", "en" ], 
    _COUNTRY_LANGS[COUNTRY.CK] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.CL] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.CM] = [ "fr", "en" ], _COUNTRY_LANGS[COUNTRY.CN] = [ "zh" ], 
    _COUNTRY_LANGS[COUNTRY.CO] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.CR] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.CV] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.CY] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.CZ] = [ "cs", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.DE] = [ "de", "en" ], 
    _COUNTRY_LANGS[COUNTRY.DJ] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.DK] = [ "da", "en" ], 
    _COUNTRY_LANGS[COUNTRY.DM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.DO] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.DZ] = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.EC] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.EE] = [ "en", "ru", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.EG] = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.ER] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.ES] = [ "es", "en" ], 
    _COUNTRY_LANGS[COUNTRY.ET] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.FI] = [ "fi", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.FJ] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.FK] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.FM] = [ "en" ], _COUNTRY_LANGS[COUNTRY.FO] = [ "da", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.FR] = [ "fr", "en" ], _COUNTRY_LANGS[COUNTRY.GA] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GB] = [ "en" ], _COUNTRY_LANGS[COUNTRY.GD] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GE] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.GF] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GI] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.GL] = [ "da", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.GN] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GP] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.GR] = [ "el", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GT] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.GW] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GY] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.HK] = [ "en", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.HN] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.HR] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.HU] = [ "hu", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.ID] = [ "id", "en" ], 
    _COUNTRY_LANGS[COUNTRY.IE] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.IL] = [ "he", "en" ], 
    _COUNTRY_LANGS[COUNTRY.IN] = [ "en" ], _COUNTRY_LANGS[COUNTRY.IS] = [ "en" ], _COUNTRY_LANGS[COUNTRY.IT] = [ "it", "en" ], 
    _COUNTRY_LANGS[COUNTRY.JM] = [ "en", "es", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.JO] = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.JP] = [ "ja", "en" ], _COUNTRY_LANGS[COUNTRY.KE] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.KG] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.KH] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.KI] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.KM] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.KN] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.KR] = [ "ko", "en" ], 
    _COUNTRY_LANGS[COUNTRY.KW] = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.KY] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.KZ] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.LA] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.LC] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.LI] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.LK] = [ "en" ], _COUNTRY_LANGS[COUNTRY.LS] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.LT] = [ "en", "ru", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.LU] = [ "en", "de", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.LV] = [ "en", "ru", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MA] = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.MC] = [ "fr", "en" ], _COUNTRY_LANGS[COUNTRY.MD] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.ME] = [ "en" ], _COUNTRY_LANGS[COUNTRY.MG] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.MH] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MK] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.ML] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MN] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.MQ] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MR] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.MS] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MT] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.MU] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MV] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.MW] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MX] = [ "es", "en" ], 
    _COUNTRY_LANGS[COUNTRY.MY] = [ "en" ], _COUNTRY_LANGS[COUNTRY.MZ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.NA] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.NC] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.NE] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.NF] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.NG] = [ "en" ], _COUNTRY_LANGS[COUNTRY.NI] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.NL] = [ "nl", "en" ], _COUNTRY_LANGS[COUNTRY.NO] = [ "no", "en" ], 
    _COUNTRY_LANGS[COUNTRY.NP] = [ "en" ], _COUNTRY_LANGS[COUNTRY.NR] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.NU] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.NZ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.OM] = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.PA] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.PE] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.PF] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.PG] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.PH] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.PL] = [ "pl", "en" ], _COUNTRY_LANGS[COUNTRY.PM] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.PN] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.PT] = [ "pt", "en" ], 
    _COUNTRY_LANGS[COUNTRY.PW] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.PY] = [ "es", "en" ], 
    _COUNTRY_LANGS[COUNTRY.QA] = [ "en", "fr", "es", "zh", "ar" ], _COUNTRY_LANGS[COUNTRY.RE] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.RO] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.RS] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.RU] = [ "ru", "en" ], _COUNTRY_LANGS[COUNTRY.RW] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SA] = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SB] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SC] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SE] = [ "sv", "en" ], 
    _COUNTRY_LANGS[COUNTRY.SG] = [ "en" ], _COUNTRY_LANGS[COUNTRY.SH] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SI] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SJ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SK] = [ "sk", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SL] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SN] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SO] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SR] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.ST] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SV] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SZ] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.TC] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.TD] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.TG] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.TH] = [ "th", "en" ], _COUNTRY_LANGS[COUNTRY.TJ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.TM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.TN] = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.TO] = [ "en" ], _COUNTRY_LANGS[COUNTRY.TR] = [ "tr", "en" ], 
    _COUNTRY_LANGS[COUNTRY.TT] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.TV] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.TW] = [ "zh", "en" ], _COUNTRY_LANGS[COUNTRY.TZ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.UA] = [ "en", "ru", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.UG] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.US] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.UY] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.VA] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.VC] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.VE] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.VG] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.VN] = [ "en" ], _COUNTRY_LANGS[COUNTRY.VU] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.WF] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.WS] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.YE] = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.YT] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.ZA] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.ZM] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.ZW] = [ "en" ], {
        COMPONENTS: "components",
        ENV: "env",
        DEBUG: "debug",
        CACHEBUST: "cachebust",
        CLIENT_ID: "client-id",
        MERCHANT_ID: "merchant-id",
        LOCALE: "locale",
        CURRENCY: "currency",
        INTENT: "intent",
        COMMIT: "commit",
        VAULT: "vault",
        BUYER_COUNTRY: "buyer-country",
        DISABLE_FUNDING: "disable-funding",
        DISABLE_CARD: "disable-card",
        LOCALE_COUNTRY: "locale-country",
        LOCALE_LANG: "locale-lang",
        FRAMEWORK: "framework",
        INTEGRATION_DATE: "integration-date",
        ORDER_CURRENCY: "order-currency",
        ORDER_INTENT: "order-intent",
        ORDER_COMMIT: "order-commit",
        ORDER_VAULT: "order-vault"
    }), INTENT = {
        CAPTURE: "capture",
        AUTHORIZE: "authorize",
        ORDER: "order"
    }, FUNDING = {
        PAYPAL: "paypal",
        VENMO: "venmo",
        CREDIT: "credit",
        CARD: "card",
        IDEAL: "ideal",
        SEPA: "sepa",
        BANCONTACT: "bancontact",
        GIROPAY: "giropay",
        SOFORT: "sofort",
        EPS: "eps",
        MYBANK: "mybank",
        P24: "p24",
        ZIMPLER: "zimpler",
        WECHATPAY: "wechatpay"
    }, API_URI = {
        AUTH: "/smart/api/auth",
        CHECKOUT: "/smart/api/checkout",
        ORDER: "/smart/api/order",
        PAYMENT: "/smart/api/payment",
        GRAPHQL: "/graphql"
    }, INLINE_GUEST_ENABLED = !1, CLIENT_CONFIG_ENABLED = Boolean(window.xprops && window.xprops.updateClientConfiguration), SMART_BUTTONS = "smart_buttons", SMART_PAYMENT_BUTTONS = "smart-payment-buttons", constants_HEADERS = {
        CSRF_TOKEN: "x-csrf-jwt",
        SOURCE: "x-source",
        REQUESTED_BY: "x-requested-by"
    }, ORDER_API_ERROR = {
        INSTRUMENT_DECLINED: "INSTRUMENT_DECLINED"
    }, CONTEXT = {
        IFRAME: "iframe",
        POPUP: "popup"
    }, TARGET_ELEMENT = {
        BODY: "body"
    }, ERROR_URL = "https://www.paypal.com/checkoutnow/error", ORDER_ID_PATTERN = /^(EC-)?[A-Z0-9]+$/, INTEGRATION_ARTIFACT = {
        PAYPAL_JS_SDK: "PAYPAL_JS_SDK"
    }, USER_EXPERIENCE_FLOW = {
        INCONTEXT: "INCONTEXT",
        INLINE: "INLINE"
    }, PRODUCT_FLOW = {
        SMART_PAYMENT_BUTTONS: "SMART_PAYMENT_BUTTONS"
    }, defaultHeaders = {}, csrfToken = "";
    function callAPI(_ref) {
        var _extends2, url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, json = _ref.json, reqHeaders = _extends({}, defaultHeaders, ((_extends2 = {})[constants_HEADERS.CSRF_TOKEN] = csrfToken, 
        _extends2[constants_HEADERS.SOURCE] = SMART_BUTTONS, _extends2[constants_HEADERS.REQUESTED_BY] = SMART_PAYMENT_BUTTONS, 
        _extends2));
        return request({
            url: url,
            method: method,
            headers: reqHeaders,
            json: json
        }).then(function(_ref2) {
            var status = _ref2.status, body = _ref2.body;
            if (csrfToken = _ref2.headers[constants_HEADERS.CSRF_TOKEN], "contingency" === body.ack) {
                var err = new Error(body.contingency);
                throw err.data = body.data, err;
            }
            if (status > 400) throw new Error("Api: " + url + " returned status code: " + status);
            if ("success" !== body.ack) throw new Error("Api: " + url + " returned ack: " + body.ack);
            return body.data;
        });
    }
    function callGraphQL(query, variables) {
        return request({
            url: API_URI.GRAPHQL,
            method: "POST",
            json: {
                query: query,
                variables: variables
            }
        }).then(function(_ref3) {
            var status = _ref3.status, body = _ref3.body, errors = (body.errors || []).filter(function(error) {
                return "ACCOUNT_CANNOT_BE_FETCHED" !== error.message;
            });
            if (errors.length) {
                var message = errors[0].message || JSON.stringify(errors[0]);
                throw new Error(message);
            }
            if (200 !== status) throw new Error(API_URI.GRAPHQL + " returned status " + status);
            return body;
        });
    }
    function getAuth() {
        return callAPI({
            url: API_URI.AUTH
        });
    }
    function patchOrder(orderID, patch) {
        return callAPI({
            method: "post",
            url: API_URI.ORDER + "/" + orderID + "/patch",
            json: {
                data: {
                    patch: patch
                }
            }
        });
    }
    var persistAccessToken = memoize(function(accessToken) {
        return defaultHeaders["x-paypal-internal-euat"] = accessToken, getAuth().then(src_util_noop);
    });
    function getNonce() {
        var nonce = "";
        return document.body && (nonce = document.body.getAttribute("data-nonce") || ""), 
        nonce;
    }
    function buildShippingChangeActions(orderID) {
        return {
            order: {
                patch: function(data) {
                    return void 0 === data && (data = []), patchOrder(orderID, data).catch(function() {
                        throw new Error("Order could not be patched");
                    });
                }
            }
        };
    }
    function buildApproveActions(orderID, fundingSource, restart) {
        var handleProcessorError = function(err) {
            if (err && err.data && err.data.details && err.data.details.some(function(detail) {
                return detail.issue === ORDER_API_ERROR.INSTRUMENT_DECLINED;
            })) return restart();
            throw new Error("Order could not be captured");
        }, get = memoize(function() {
            return function(orderID) {
                return callAPI({
                    url: API_URI.ORDER + "/" + orderID
                });
            }(orderID);
        });
        return {
            order: {
                capture: memoize(function() {
                    if (window.xprops.intent !== INTENT.CAPTURE) throw new Error("Use " + SDK_QUERY_KEYS.INTENT + "=" + INTENT.CAPTURE + " to use client-side capture");
                    return function(orderID) {
                        return callAPI({
                            method: "post",
                            url: API_URI.ORDER + "/" + orderID + "/capture"
                        });
                    }(orderID).catch(handleProcessorError).finally(get.reset);
                }),
                authorize: memoize(function() {
                    return function(orderID) {
                        return callAPI({
                            method: "post",
                            url: API_URI.ORDER + "/" + orderID + "/authorize"
                        });
                    }(orderID).catch(handleProcessorError).finally(get.reset);
                }),
                patch: function(data) {
                    return void 0 === data && (data = []), patchOrder(orderID, data).catch(function() {
                        throw new Error("Order could not be patched");
                    });
                },
                get: get
            }
        };
    }
    function validateOrder(orderID) {
        if (!orderID.match(ORDER_ID_PATTERN)) throw new Error(orderID + " does not match pattern for order-id, ec-token or cart-id");
        return callGraphQL("\n        query GetCheckoutDetails($orderID: String!) {\n            checkoutSession(token: $orderID) {\n                cart {\n                    intent\n                    returnUrl {\n                        href\n                    }\n                    cancelUrl {\n                        href\n                    }\n                    amounts {\n                        total {\n                            currencyCode\n                        }\n                    }\n                }\n            }\n        }\n    ", {
            orderID: orderID
        }).then(function(res) {
            var cart = res.data.checkoutSession.cart, intent = "sale" === cart.intent.toLowerCase() ? INTENT.CAPTURE : cart.intent.toLowerCase(), currency = cart.amounts && cart.amounts.total.currencyCode, returnUrl = cart.returnUrl && cart.returnUrl.href, cancelUrl = cart.cancelUrl && cart.cancelUrl.href, expectedIntent = window.xprops.intent, expectedCurrency = window.xprops.currency;
            if (intent !== expectedIntent) throw new Error("Expected intent from order api call to be " + expectedIntent + ", got " + intent + ". Please ensure you are passing " + SDK_QUERY_KEYS.INTENT + "=" + intent + " to the sdk");
            if (currency && currency !== expectedCurrency) throw new Error("Expected currency from order api call to be " + expectedCurrency + ", got " + currency + ". Please ensure you are passing " + SDK_QUERY_KEYS.CURRENCY + "=" + currency + " to the sdk");
            if (function(orderID) {
                return Boolean(orderID.match(/^[A-Z0-9]{17}$/));
            }(orderID)) {
                if (returnUrl && 0 !== returnUrl.indexOf(ERROR_URL)) throw new Error("Return url is forbidden for smart payment button integration.");
                if (cancelUrl && 0 !== cancelUrl.indexOf(ERROR_URL)) throw new Error("Cancel url is forbidden for smart payment button integration.");
            }
        });
    }
    var checkoutOpen = !1, canRenderTop = !1;
    function initCheckout(props) {
        if (checkoutOpen) throw new Error("Checkout already rendered");
        var createOrder = props.createOrder, fundingSource = props.fundingSource, _props$validationProm = props.validationPromise, validationPromise = void 0 === _props$validationProm ? promise_ZalgoPromise.resolve(!0) : _props$validationProm, buyerCountry = props.buyerCountry, restart = memoize(function() {
            return promise_ZalgoPromise.try(function() {
                return instance.close();
            }).then(function() {
                return initCheckout({
                    fundingSource: fundingSource,
                    createOrder: createOrder,
                    buyerCountry: buyerCountry
                }).render(CONTEXT.IFRAME);
            }).catch(src_util_noop).then(function() {
                return new promise_ZalgoPromise(src_util_noop);
            });
        }), approved = !1, onCancel = function() {
            return promise_ZalgoPromise.try(function() {
                return !approved && validationPromise;
            }).then(function(valid) {
                if (valid) return createOrder().then(function(orderID) {
                    return window.xprops.onCancel({
                        orderID: orderID
                    });
                }).catch(function(err) {
                    return window.xprops.onError(err);
                });
            });
        }, onShippingChange = window.xprops.onShippingChange && function(data, actions) {
            return window.xprops.onShippingChange(data, _extends({}, actions, buildShippingChangeActions(data.orderID)));
        }, nonce = getNonce(), _window$xprops = window.xprops, instance = window.paypal.Checkout(_extends({}, props, {
            onApprove: function(_ref2) {
                var orderID = _ref2.orderID, payerID = _ref2.payerID, paymentID = _ref2.paymentID, billingToken = _ref2.billingToken;
                approved = !0;
                var actions = _extends({
                    restart: restart
                }, buildApproveActions(orderID, 0, restart));
                return window.xprops.onApprove({
                    orderID: orderID,
                    payerID: payerID,
                    paymentID: paymentID,
                    billingToken: billingToken
                }, actions).catch(function(err) {
                    return window.xprops.onError(err);
                });
            },
            onCancel: onCancel,
            onError: _window$xprops.onError,
            onAuth: function(_ref3) {
                return persistAccessToken(_ref3.accessToken);
            },
            onClose: function() {
                return checkoutOpen = !1, onCancel();
            },
            onShippingChange: onShippingChange,
            buyerCountry: buyerCountry,
            locale: _window$xprops.locale,
            commit: _window$xprops.commit,
            nonce: nonce
        }));
        return {
            instance: instance,
            render: function(context) {
                return void 0 === context && (void 0 === ua && (ua = getUserAgent()), context = function(ua) {
                    return void 0 === ua && (ua = getUserAgent()), !!function(ua) {
                        return void 0 === ua && (ua = getUserAgent()), /iPhone|iPod|iPad/.test(ua);
                    }(ua) && (!!function(ua) {
                        return void 0 === ua && (ua = getUserAgent()), /\bGSA\b/.test(ua);
                    }(ua) || /.+AppleWebKit(?!.*Safari)/.test(ua));
                }(ua) || function(ua) {
                    return void 0 === ua && (ua = getUserAgent()), !!function(ua) {
                        return void 0 === ua && (ua = getUserAgent()), /Android/.test(ua);
                    }(ua) && /Version\/[\d.]+/.test(ua) && !isOperaMini(ua);
                }(ua) || isOperaMini(ua) || function(ua) {
                    return void 0 === ua && (ua = getUserAgent()), /FxiOS/i.test(ua);
                }(ua) || function(ua) {
                    return void 0 === ua && (ua = getUserAgent()), /EdgiOS/i.test(ua);
                }(ua) || function(ua) {
                    return void 0 === ua && (ua = getUserAgent()), -1 !== ua.indexOf("FBAN") || -1 !== ua.indexOf("FBAV");
                }(ua) || function(ua) {
                    return void 0 === ua && (ua = getUserAgent()), /QQBrowser/.test(ua);
                }(ua) || "undefined" != typeof process && process.versions && process.versions.electron || (userAgent = getUserAgent(), 
                /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent)) || !0 === window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches ? CONTEXT.IFRAME : CONTEXT.POPUP), 
                checkoutOpen = !0, instance.renderTo((top = getTop(window), canRenderTop && top ? top : window.xprops.getParent()), TARGET_ELEMENT.BODY, context);
                var ua, userAgent, top;
            }
        };
    }
    var cardFieldsOpen = !1, card_fields_openCardFields = function() {
        var buttonsContainer = document.querySelector("#buttons-container"), cardButtonsContainer = document.querySelector('[data-funding-source="' + FUNDING.CARD + '"]'), cardFieldsContainer = document.querySelector("#card-fields-container");
        if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) throw new Error("Required elements not found");
        cardFieldsContainer.style.display = "block";
        var recalculateMargin = function() {
            buttonsContainer.style.marginTop = -(buttonsContainer.offsetHeight - cardButtonsContainer.offsetHeight) + "px";
        };
        window.addEventListener("resize", function() {
            buttonsContainer.style.transitionDuration = "0s", recalculateMargin();
        }), recalculateMargin();
    };
    function setupButton(fundingEligibility) {
        if (!window.paypal) throw new Error("PayPal library not loaded");
        var buyerCountry = window.xprops.buyerCountry || fundingEligibility.buyerCountry || COUNTRY.US;
        fundingEligibility.fundingEligibility && (fundingEligibility = fundingEligibility.fundingEligibility);
        var doc, buttonEnabled = !0, start = function(_ref2) {
            var win = _ref2.win, fundingSource = _ref2.fundingSource, card = _ref2.card, validationPromise = function(_ref) {
                var fundingSource = _ref.fundingSource, card = _ref.card, valid = !0;
                return promise_ZalgoPromise.try(function() {
                    if (window.xprops.onClick) return window.xprops.onClick({
                        fundingSource: fundingSource,
                        card: card
                    }, {
                        resolve: function() {
                            return promise_ZalgoPromise.try(function() {
                                valid = !0;
                            });
                        },
                        reject: function() {
                            return promise_ZalgoPromise.try(function() {
                                valid = !1;
                            });
                        }
                    });
                }).then(function() {
                    return valid;
                });
            }({
                fundingSource: fundingSource,
                card: card
            });
            if (!buttonEnabled) return win ? win.close() : void 0;
            var orderPromise = validationPromise.then(function(valid) {
                return valid ? function() {
                    if (window.xprops.createBillingAgreement) return window.xprops.createBillingAgreement().then(function(billingToken) {
                        return function(billingToken) {
                            return callAPI({
                                method: "post",
                                url: API_URI.PAYMENT + "/" + billingToken + "/ectoken"
                            }).then(function(data) {
                                return data.token;
                            });
                        }(billingToken);
                    });
                    if (window.xprops.createOrder) return window.xprops.createOrder();
                    throw new Error("No mechanism to create order");
                }() : new promise_ZalgoPromise(src_util_noop);
            }).then(function(orderID) {
                return promise_ZalgoPromise.try(function() {
                    var _ref2, _window$xprops = window.xprops, clientAccessToken = _window$xprops.clientAccessToken;
                    if (_window$xprops.vault && clientAccessToken) return callGraphQL("\n        mutation EnableVault(\n            $orderID : String!,\n            $clientAccessToken : String!\n        ) {\n            enableVault(\n                token: $orderID,\n                clientAccessToken: $clientAccessToken\n            )\n        }\n    ", {
                        orderID: (_ref2 = {
                            orderID: orderID,
                            clientAccessToken: clientAccessToken
                        }).orderID,
                        clientAccessToken: _ref2.clientAccessToken
                    });
                }).then(function() {
                    return orderID;
                });
            }), isInlineGuest = fundingSource === FUNDING.CARD && INLINE_GUEST_ENABLED, createOrder = function() {
                return orderPromise;
            }, _ref3 = isInlineGuest ? function(props) {
                if (cardFieldsOpen) throw new Error("Checkout already rendered");
                var createOrder = props.createOrder, fundingSource = props.fundingSource, buyerCountry = props.buyerCountry, restart = memoize(function() {
                    return promise_ZalgoPromise.try(function() {
                        return instance.close();
                    }).then(function() {
                        return initCheckout({
                            fundingSource: fundingSource,
                            createOrder: createOrder,
                            buyerCountry: buyerCountry
                        }).render(CONTEXT.IFRAME);
                    }).catch(src_util_noop).then(function() {
                        return new promise_ZalgoPromise(src_util_noop);
                    });
                }), approved = !1, onCancel = function() {
                    return promise_ZalgoPromise.try(function() {
                        if (!approved) return createOrder().then(function(orderID) {
                            return window.xprops.onCancel({
                                orderID: orderID
                            });
                        }).catch(function(err) {
                            return window.xprops.onError(err);
                        });
                    });
                }, onShippingChange = window.xprops.onShippingChange && function(data, actions) {
                    return window.xprops.onShippingChange(data, _extends({}, actions, buildShippingChangeActions(data.orderID)));
                }, nonce = getNonce(), _window$xprops = window.xprops, locale = _window$xprops.locale, commit = _window$xprops.commit, onError = _window$xprops.onError, instance = window.paypal.CardFields(_extends({}, props, {
                    cspNonce: getNonce(),
                    createOrder: createOrder,
                    onApprove: function(_ref) {
                        var orderID = _ref.orderID, payerID = _ref.payerID, paymentID = _ref.paymentID, billingToken = _ref.billingToken;
                        approved = !0;
                        var actions = buildApproveActions(orderID, 0, restart);
                        return window.xprops.onApprove({
                            orderID: orderID,
                            payerID: payerID,
                            paymentID: paymentID,
                            billingToken: billingToken
                        }, actions).catch(function(err) {
                            return window.xprops.onError(err);
                        });
                    },
                    onCancel: onCancel,
                    onError: onError,
                    onAuth: function(_ref2) {
                        return persistAccessToken(_ref2.accessToken);
                    },
                    onClose: function() {
                        return cardFieldsOpen = !1, onCancel();
                    },
                    onShippingChange: onShippingChange,
                    buyerCountry: buyerCountry,
                    locale: locale,
                    commit: commit,
                    nonce: nonce
                }));
                return {
                    instance: instance,
                    render: function() {
                        cardFieldsOpen = !0;
                        var renderPromise = instance.render("#card-fields-container");
                        return card_fields_openCardFields(), renderPromise;
                    }
                };
            }({
                createOrder: createOrder,
                fundingSource: fundingSource,
                card: card,
                buyerCountry: buyerCountry
            }) : initCheckout({
                window: win,
                createOrder: createOrder,
                fundingSource: fundingSource,
                card: card,
                validationPromise: validationPromise,
                buyerCountry: buyerCountry
            }), instance = _ref3.instance, render = _ref3.render;
            return CLIENT_CONFIG_ENABLED && createOrder().then(function(orderID) {
                var _ref;
                callGraphQL("\n        mutation UpdateClientConfig(\n            $orderID : String!,\n            $fundingSource : ButtonFundingSourceType!,\n            $integrationArtifact : IntegrationArtifactType!,\n            $userExperienceFlow : UserExperienceFlowType!,\n            $productFlow : ProductFlowType!\n        ) {\n            updateClientConfig(\n                token: $orderID,\n                fundingSource: $fundingSource,\n                integrationArtifact: $integrationArtifact,\n                userExperienceFlow: $userExperienceFlow,\n                productFlow: $productFlow\n            )\n        }\n    ", {
                    orderID: (_ref = {
                        orderID: orderID,
                        fundingSource: fundingSource,
                        integrationArtifact: INTEGRATION_ARTIFACT.PAYPAL_JS_SDK,
                        userExperienceFlow: isInlineGuest ? USER_EXPERIENCE_FLOW.INLINE : USER_EXPERIENCE_FLOW.INCONTEXT,
                        productFlow: PRODUCT_FLOW.SMART_PAYMENT_BUTTONS
                    }).orderID,
                    fundingSource: _ref.fundingSource,
                    integrationArtifact: _ref.integrationArtifact,
                    userExperienceFlow: _ref.userExperienceFlow,
                    productFlow: _ref.productFlow
                });
            }), promise_ZalgoPromise.try(function() {
                return isInlineGuest ? validationPromise.then(function(valid) {
                    if (valid) return render();
                }) : promise_ZalgoPromise.all([ render(), validationPromise.then(function(valid) {
                    if (!valid) return instance.close();
                }) ]);
            }).then(function() {
                return validationPromise.then(function(valid) {
                    if (valid) return createOrder().then(validateOrder);
                });
            }).catch(function(err) {
                return promise_ZalgoPromise.all([ instance.close(), instance.onError(err) ]);
            });
        }, tasks = {};
        return tasks.onInit = promise_ZalgoPromise.try(function() {
            if (window.xprops.onInit) return window.xprops.onInit({}, {
                enable: function() {
                    return promise_ZalgoPromise.try(function() {
                        buttonEnabled = !0;
                    });
                },
                disable: function() {
                    return promise_ZalgoPromise.try(function() {
                        buttonEnabled = !1;
                    });
                }
            });
        }), (".paypal-button", void 0 === doc && (doc = window.document), [].slice.call(doc.querySelectorAll(".paypal-button"))).forEach(function(button) {
            var element, handler, _getSelectedFunding = function(button) {
                return {
                    fundingSource: button.getAttribute("data-funding-source"),
                    card: button.getAttribute("data-card")
                };
            }(button), fundingSource = _getSelectedFunding.fundingSource, card = _getSelectedFunding.card;
            handler = function(event) {
                event.preventDefault(), event.stopPropagation(), start({
                    fundingSource: fundingSource,
                    card: card
                });
            }, (element = button).addEventListener("touchstart", src_util_noop), element.addEventListener("click", handler), 
            element.addEventListener("keypress", function(event) {
                if (event.keyCode === KEY_CODES.ENTER) return handler(event);
            });
        }), tasks.getAuth = getAuth().then(src_util_noop), tasks.prerender = tasks.onInit.then(function() {
            return window.xprops.getPrerenderDetails().then(function(prerenderDetails) {
                if (prerenderDetails) return start({
                    win: prerenderDetails.win,
                    fundingSource: prerenderDetails.fundingSource,
                    card: prerenderDetails.card
                });
            });
        }), tasks.remember = promise_ZalgoPromise.try(function() {
            if (fundingEligibility && fundingEligibility.venmo && fundingEligibility.venmo.eligible) return window.xprops.remember([ FUNDING.VENMO ]);
        }), tasks.setupCheckout = function() {
            checkoutOpen = !1;
            var _ref = [ getParent(window), getTop(window) ], parent = _ref[0], top = _ref[1], tasks = {};
            return top && parent && parent !== top && (tasks.canRenderTo = window.paypal.Checkout.canRenderTo(top).then(function(result) {
                canRenderTop = result;
            })), promise_ZalgoPromise.hash(tasks).then(src_util_noop);
        }(), promise_ZalgoPromise.hash(tasks).then(src_util_noop);
    }
    __webpack_require__.d(__webpack_exports__, "setupButton", function() {
        return setupButton;
    });
} ]);
//# sourceMappingURL=smart-payment-buttons.js.map