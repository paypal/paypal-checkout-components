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
    var SDK_QUERY_KEYS = ((_COUNTRY_LANGS = {}).AD = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.AE = [ "en", "fr", "es", "zh", "ar" ], 
    _COUNTRY_LANGS.AG = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.AI = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.AL = [ "en" ], _COUNTRY_LANGS.AM = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.AN = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.AO = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.AR = [ "es", "en" ], 
    _COUNTRY_LANGS.AT = [ "de", "en" ], _COUNTRY_LANGS.AU = [ "en" ], _COUNTRY_LANGS.AW = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.AZ = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.BA = [ "en" ], _COUNTRY_LANGS.BB = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.BE = [ "en", "nl", "fr" ], _COUNTRY_LANGS.BF = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS.BG = [ "en" ], _COUNTRY_LANGS.BH = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.BI = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS.BJ = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS.BM = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.BN = [ "en" ], _COUNTRY_LANGS.BO = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS.BR = [ "pt", "en" ], _COUNTRY_LANGS.BS = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.BT = [ "en" ], _COUNTRY_LANGS.BW = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.BY = [ "en" ], 
    _COUNTRY_LANGS.BZ = [ "en", "es", "fr", "zh" ], _COUNTRY_LANGS.CA = [ "en", "fr" ], 
    _COUNTRY_LANGS.CD = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS.CG = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.CH = [ "de", "fr", "en" ], _COUNTRY_LANGS.CI = [ "fr", "en" ], _COUNTRY_LANGS.CK = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.CL = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS.CM = [ "fr", "en" ], 
    _COUNTRY_LANGS.CN = [ "zh" ], _COUNTRY_LANGS.CO = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS.CR = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS.CV = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.CY = [ "en" ], _COUNTRY_LANGS.CZ = [ "cs", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.DE = [ "de", "en" ], _COUNTRY_LANGS.DJ = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS.DK = [ "da", "en" ], _COUNTRY_LANGS.DM = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.DO = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS.DZ = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.EC = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS.EE = [ "en", "ru", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.EG = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS.ER = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.ES = [ "es", "en" ], _COUNTRY_LANGS.ET = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.FI = [ "fi", "en", "fr", "es", "zh" ], _COUNTRY_LANGS.FJ = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.FK = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.FM = [ "en" ], _COUNTRY_LANGS.FO = [ "da", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.FR = [ "fr", "en" ], _COUNTRY_LANGS.GA = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS.GB = [ "en" ], _COUNTRY_LANGS.GD = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.GE = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.GF = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.GI = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.GL = [ "da", "en", "fr", "es", "zh" ], _COUNTRY_LANGS.GM = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.GN = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS.GP = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.GR = [ "el", "en", "fr", "es", "zh" ], _COUNTRY_LANGS.GT = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS.GW = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.GY = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.HK = [ "en", "zh" ], _COUNTRY_LANGS.HN = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS.HR = [ "en" ], _COUNTRY_LANGS.HU = [ "hu", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.ID = [ "id", "en" ], _COUNTRY_LANGS.IE = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.IL = [ "he", "en" ], _COUNTRY_LANGS.IN = [ "en" ], _COUNTRY_LANGS.IS = [ "en" ], 
    _COUNTRY_LANGS.IT = [ "it", "en" ], _COUNTRY_LANGS.JM = [ "en", "es", "fr", "zh" ], 
    _COUNTRY_LANGS.JO = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS.JP = [ "ja", "en" ], 
    _COUNTRY_LANGS.KE = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.KG = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.KH = [ "en" ], _COUNTRY_LANGS.KI = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.KM = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS.KN = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.KR = [ "ko", "en" ], 
    _COUNTRY_LANGS.KW = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS.KY = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.KZ = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.LA = [ "en" ], _COUNTRY_LANGS.LC = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.LI = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.LK = [ "en" ], _COUNTRY_LANGS.LS = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.LT = [ "en", "ru", "fr", "es", "zh" ], _COUNTRY_LANGS.LU = [ "en", "de", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.LV = [ "en", "ru", "fr", "es", "zh" ], _COUNTRY_LANGS.MA = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.MC = [ "fr", "en" ], _COUNTRY_LANGS.MD = [ "en" ], _COUNTRY_LANGS.ME = [ "en" ], 
    _COUNTRY_LANGS.MG = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.MH = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.MK = [ "en" ], _COUNTRY_LANGS.ML = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS.MN = [ "en" ], 
    _COUNTRY_LANGS.MQ = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.MR = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.MS = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.MT = [ "en" ], _COUNTRY_LANGS.MU = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.MV = [ "en" ], _COUNTRY_LANGS.MW = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.MX = [ "es", "en" ], 
    _COUNTRY_LANGS.MY = [ "en" ], _COUNTRY_LANGS.MZ = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.NA = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.NC = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.NE = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS.NF = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.NG = [ "en" ], _COUNTRY_LANGS.NI = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS.NL = [ "nl", "en" ], _COUNTRY_LANGS.NO = [ "no", "en" ], _COUNTRY_LANGS.NP = [ "en" ], 
    _COUNTRY_LANGS.NR = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.NU = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.NZ = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.OM = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.PA = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS.PE = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS.PF = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.PG = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.PH = [ "en" ], _COUNTRY_LANGS.PL = [ "pl", "en" ], _COUNTRY_LANGS.PM = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.PN = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.PT = [ "pt", "en" ], 
    _COUNTRY_LANGS.PW = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.PY = [ "es", "en" ], 
    _COUNTRY_LANGS.QA = [ "en", "fr", "es", "zh", "ar" ], _COUNTRY_LANGS.RE = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.RO = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.RS = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.RU = [ "ru", "en" ], _COUNTRY_LANGS.RW = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS.SA = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS.SB = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.SC = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS.SE = [ "sv", "en" ], 
    _COUNTRY_LANGS.SG = [ "en" ], _COUNTRY_LANGS.SH = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.SI = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.SJ = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.SK = [ "sk", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.SL = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.SM = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.SN = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS.SO = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.SR = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.ST = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.SV = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS.SZ = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.TC = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.TD = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS.TG = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS.TH = [ "th", "en" ], 
    _COUNTRY_LANGS.TJ = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.TM = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.TN = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS.TO = [ "en" ], 
    _COUNTRY_LANGS.TR = [ "tr", "en" ], _COUNTRY_LANGS.TT = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.TV = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.TW = [ "zh", "en" ], 
    _COUNTRY_LANGS.TZ = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.UA = [ "en", "ru", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.UG = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.US = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.UY = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS.VA = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.VC = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.VE = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS.VG = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.VN = [ "en" ], _COUNTRY_LANGS.VU = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.WF = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.WS = [ "en" ], _COUNTRY_LANGS.YE = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.YT = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.ZA = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS.ZM = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS.ZW = [ "en" ], {
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
    }, SMART_BUTTONS = "smart_buttons", SMART_PAYMENT_BUTTONS = "smart-payment-buttons", constants_HEADERS = {
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
    }, ORDER_ID_PATTERN = /^(EC-)?[A-Z0-9]+$/, ERROR_URL = "https://www.paypal.com/checkoutnow/error", defaultHeaders = {}, csrfToken = "";
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
    function validateOrder(orderID) {
        if (!orderID.match(ORDER_ID_PATTERN)) throw new Error(orderID + " does not match pattern for order-id, ec-token or cart-id");
        return (query = '\n        checkout {\n            checkoutSession(token : "' + orderID + '") {\n                cart {\n                    intent\n                    returnUrl {\n                        href\n                    }\n                    cancelUrl {\n                        href\n                    }\n                    amounts {\n                        total {\n                            currencyCode\n                        }\n                    }\n                }\n            }\n        }\n    ', 
        request({
            url: API_URI.GRAPHQL,
            method: "POST",
            json: {
                query: "\n                query {\n                    " + query + "\n                }\n            "
            }
        }).then(function(_ref3) {
            var body = _ref3.body, errors = (body.errors || []).filter(function(error) {
                return "ACCOUNT_CANNOT_BE_FETCHED" !== error.message;
            });
            if (errors.length) {
                var message = errors[0].message || JSON.stringify(errors[0]);
                throw new Error(message);
            }
            return body;
        })).then(function(res) {
            var cart = res.data.checkout.checkoutSession.cart, intent = "sale" === cart.intent.toLowerCase() ? INTENT.CAPTURE : cart.intent.toLowerCase(), currency = cart.amounts && cart.amounts.total.currencyCode, returnUrl = cart.returnUrl && cart.returnUrl.href, cancelUrl = cart.cancelUrl && cart.cancelUrl.href, expectedIntent = window.xprops.intent, expectedCurrency = window.xprops.currency;
            if (intent !== expectedIntent) throw new Error("Expected intent from order api call to be " + expectedIntent + ", got " + intent + ". Please ensure you are passing " + SDK_QUERY_KEYS.INTENT + "=" + intent + " to the sdk");
            if (currency && currency !== expectedCurrency) throw new Error("Expected currency from order api call to be " + expectedCurrency + ", got " + currency + ". Please ensure you are passing " + SDK_QUERY_KEYS.CURRENCY + "=" + currency + " to the sdk");
            if (returnUrl && 0 !== returnUrl.indexOf(ERROR_URL)) throw new Error('Expected return url to be either blank, or "' + ERROR_URL + '". Return url is forbidden for smart payment button integration.');
            if (cancelUrl && 0 !== cancelUrl.indexOf(ERROR_URL)) throw new Error('Expected cancel url to be either blank, or "' + ERROR_URL + '". Cancel url is forbidden for smart payment button integration.');
        });
        var query;
    }
    var checkoutOpen = !1, canRenderTop = !1;
    function getDefaultContext() {
        return void 0 === ua && (ua = getUserAgent()), function(ua) {
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
        /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent)) || !0 === window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches ? CONTEXT.IFRAME : CONTEXT.POPUP;
        var ua, userAgent;
    }
    function renderCheckout(props, context, validationPromise) {
        if (void 0 === context && (context = getDefaultContext()), void 0 === validationPromise && (validationPromise = promise_ZalgoPromise.resolve(!0)), 
        checkoutOpen) throw new Error("Checkout already rendered");
        var top, createOrder = function(props, validationPromise) {
            return void 0 === props && (props = {}), memoize(function() {
                return validationPromise.then(function(valid) {
                    if (valid) {
                        if (props.createOrder) return props.createOrder();
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
                    }
                    return new promise_ZalgoPromise(src_util_noop);
                });
            });
        }(props, validationPromise), fundingSource = props.fundingSource, approved = !1, onCancel = function() {
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
        }, onClose = onCancel, onShippingChange = window.xprops.onShippingChange && function(data, actions) {
            return window.xprops.onShippingChange(data, _extends({}, actions, (orderID = data.orderID, 
            {
                order: {
                    patch: function(data) {
                        return void 0 === data && (data = []), patchOrder(orderID, data).catch(function() {
                            throw new Error("Order could not be patched");
                        });
                    }
                }
            })));
            var orderID;
        }, nonce = function() {
            var nonce = "";
            return document.body && (nonce = document.body.getAttribute("data-nonce") || ""), 
            nonce;
        }(), _window$xprops = window.xprops, instance = window.paypal.Checkout(_extends({}, props, {
            createOrder: createOrder,
            onApprove: function(_ref2) {
                var orderID = _ref2.orderID, payerID = _ref2.payerID, paymentID = _ref2.paymentID, billingToken = _ref2.billingToken;
                approved = !0;
                var actions = function(checkout, orderID, fundingSource) {
                    var restart = memoize(function() {
                        return checkout.close().then(function() {
                            return renderCheckout({
                                fundingSource: fundingSource,
                                createOrder: function() {
                                    return promise_ZalgoPromise.resolve(orderID);
                                }
                            }, "iframe");
                        }).catch(src_util_noop).then(function() {
                            return new promise_ZalgoPromise(src_util_noop);
                        });
                    }), handleProcessorError = function(err) {
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
                    }), capture = memoize(function() {
                        if (window.xprops.intent !== INTENT.CAPTURE) throw new Error("Use " + SDK_QUERY_KEYS.INTENT + "=" + INTENT.CAPTURE + " to use client-side capture");
                        return function(orderID) {
                            return callAPI({
                                method: "post",
                                url: API_URI.ORDER + "/" + orderID + "/capture"
                            });
                        }(orderID).catch(handleProcessorError).finally(get.reset);
                    }), authorize = memoize(function() {
                        return function(orderID) {
                            return callAPI({
                                method: "post",
                                url: API_URI.ORDER + "/" + orderID + "/authorize"
                            });
                        }(orderID).catch(handleProcessorError).finally(get.reset);
                    });
                    return {
                        restart: restart,
                        order: {
                            capture: capture,
                            authorize: authorize,
                            patch: function(data) {
                                return void 0 === data && (data = []), patchOrder(orderID, data).catch(function() {
                                    throw new Error("Order could not be patched");
                                });
                            },
                            get: get
                        }
                    };
                }(instance, orderID, fundingSource);
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
            onClose: onClose,
            onShippingChange: onShippingChange,
            locale: _window$xprops.locale,
            commit: _window$xprops.commit,
            nonce: nonce
        }));
        return createOrder().then(validateOrder).catch(function(err) {
            return promise_ZalgoPromise.all([ instance.close(), instance.onError(err) ]);
        }), validationPromise.then(function(valid) {
            valid || instance.close();
        }), instance.renderTo((top = getTop(window), canRenderTop && top ? top : window.xprops.getParent()), TARGET_ELEMENT.BODY, context);
    }
    function onClickAndValidate(_ref) {
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
    }
    function setupButton(fundingEligibility) {
        var buttonEnabled = !0;
        if (!window.paypal) throw new Error("PayPal library not loaded");
        var doc, tasks = {};
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
                event.preventDefault(), event.stopPropagation();
                var validationPromise = onClickAndValidate({
                    fundingSource: fundingSource,
                    card: card
                });
                buttonEnabled && renderCheckout({
                    fundingSource: fundingSource,
                    card: card
                }, getDefaultContext(), validationPromise).catch(src_util_noop);
            }, (element = button).addEventListener("touchstart", src_util_noop), element.addEventListener("click", handler), 
            element.addEventListener("keypress", function(event) {
                if (event.keyCode === KEY_CODES.ENTER) return handler(event);
            });
        }), tasks.getAuth = getAuth().then(src_util_noop), tasks.prerender = tasks.onInit.then(function() {
            return window.xprops.getPrerenderDetails().then(function(prerenderDetails) {
                if (prerenderDetails) {
                    var win = prerenderDetails.win, order = prerenderDetails.order, fundingSource = prerenderDetails.fundingSource, card = prerenderDetails.card, validationPromise = onClickAndValidate({
                        fundingSource: fundingSource,
                        card: card
                    });
                    if (!buttonEnabled) return win.close();
                    renderCheckout({
                        window: win,
                        createOrder: order ? function() {
                            return order;
                        } : null,
                        fundingSource: fundingSource,
                        card: card
                    }, getDefaultContext(), validationPromise).catch(src_util_noop);
                }
            });
        }), tasks.remember = promise_ZalgoPromise.try(function() {
            if (fundingEligibility && fundingEligibility.venmo.eligible) return window.xprops.remember([ FUNDING.VENMO ]);
        }), tasks.setupCheckout = function() {
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