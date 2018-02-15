!function(e, a) {
    for (var i in a) e[i] = a[i];
}(window, function(modules) {
    function getPromiseShim() {
        return __webpack_require__("./node_modules/zalgo-promise/src/index.js").ZalgoPromise;
    }
    function Promise(resolver) {
        return new (getPromiseShim())(resolver);
    }
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
    Promise.resolve = function(val) {
        return getPromiseShim().resolve(val);
    };
    Promise.reject = function(err) {
        return getPromiseShim().reject(err);
    };
    Promise.all = function(promises) {
        return getPromiseShim().all(promises);
    };
    var installedModules = {};
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter
        });
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
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "https://www.paypalobjects.com/api/";
    return __webpack_require__(__webpack_require__.s = 0);
}({
    "./node_modules/zalgo-promise/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function utils_isPromise(item) {
            try {
                if (!item) return !1;
                if (window.Promise && item instanceof window.Promise) return !0;
                if (window.Window && item instanceof window.Window) return !1;
                if (window.constructor && item instanceof window.constructor) return !1;
                if (utils_toString) {
                    var name = utils_toString.call(item);
                    if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                }
                if ("function" == typeof item.then) return !0;
            } catch (err) {
                return !1;
            }
            return !1;
        }
        function dispatchPossiblyUnhandledError(err) {
            if (-1 === dispatchedErrors.indexOf(err)) {
                dispatchedErrors.push(err);
                setTimeout(function() {
                    throw err;
                }, 1);
                for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err);
            }
        }
        function exceptions_onPossiblyUnhandledException(handler) {
            possiblyUnhandledPromiseHandlers.push(handler);
            return {
                cancel: function() {
                    possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                }
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var utils_toString = {}.toString, possiblyUnhandledPromiseHandlers = [], dispatchedErrors = [], global = window.__zalgopromise__ = window.__zalgopromise__ || {
            flushPromises: [],
            activeCount: 0
        }, promise_ZalgoPromise = function() {
            function ZalgoPromise(handler) {
                var _this = this;
                _classCallCheck(this, ZalgoPromise);
                this.resolved = !1;
                this.rejected = !1;
                this.errorHandled = !1;
                this.handlers = [];
                if (handler) {
                    var _result = void 0, _error = void 0, resolved = !1, rejected = !1, isAsync = !1;
                    try {
                        handler(function(res) {
                            if (isAsync) _this.resolve(res); else {
                                resolved = !0;
                                _result = res;
                            }
                        }, function(err) {
                            if (isAsync) _this.reject(err); else {
                                rejected = !0;
                                _error = err;
                            }
                        });
                    } catch (err) {
                        this.reject(err);
                        return;
                    }
                    isAsync = !0;
                    resolved ? this.resolve(_result) : rejected && this.reject(_error);
                }
            }
            ZalgoPromise.prototype.resolve = function(result) {
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                this.resolved = !0;
                this.value = result;
                this.dispatch();
                return this;
            };
            ZalgoPromise.prototype.reject = function(error) {
                var _this2 = this;
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                if (!error) {
                    var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                    error = new Error("Expected reject to be called with Error, got " + _err);
                }
                this.rejected = !0;
                this.error = error;
                this.errorHandled || setTimeout(function() {
                    _this2.errorHandled || dispatchPossiblyUnhandledError(error);
                }, 1);
                this.dispatch();
                return this;
            };
            ZalgoPromise.prototype.asyncReject = function(error) {
                this.errorHandled = !0;
                this.reject(error);
            };
            ZalgoPromise.prototype.dispatch = function() {
                var _this3 = this, dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                if (!dispatching && (resolved || rejected)) {
                    this.dispatching = !0;
                    global.activeCount += 1;
                    for (var i = 0; i < handlers.length; i++) {
                        (function(i) {
                            var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                            if (resolved) try {
                                result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                            } catch (err) {
                                promise.reject(err);
                                return "continue";
                            } else if (rejected) {
                                if (!onError) {
                                    promise.reject(_this3.error);
                                    return "continue";
                                }
                                try {
                                    result = onError(_this3.error);
                                } catch (err) {
                                    promise.reject(err);
                                    return "continue";
                                }
                            }
                            if (result instanceof ZalgoPromise && (result.resolved || result.rejected)) {
                                result.resolved ? promise.resolve(result.value) : promise.reject(result.error);
                                result.errorHandled = !0;
                            } else utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                                promise.resolve(res);
                            }, function(err) {
                                promise.reject(err);
                            }) : promise.resolve(result);
                        })(i);
                    }
                    handlers.length = 0;
                    this.dispatching = !1;
                    global.activeCount -= 1;
                    0 === global.activeCount && ZalgoPromise.flushQueue();
                }
            };
            ZalgoPromise.prototype.then = function(onSuccess, onError) {
                if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                var promise = new ZalgoPromise();
                this.handlers.push({
                    promise: promise,
                    onSuccess: onSuccess,
                    onError: onError
                });
                this.errorHandled = !0;
                this.dispatch();
                return promise;
            };
            ZalgoPromise.prototype.catch = function(onError) {
                return this.then(void 0, onError);
            };
            ZalgoPromise.prototype.finally = function(handler) {
                return this.then(function(result) {
                    return ZalgoPromise.try(handler).then(function() {
                        return result;
                    });
                }, function(err) {
                    return ZalgoPromise.try(handler).then(function() {
                        throw err;
                    });
                });
            };
            ZalgoPromise.prototype.timeout = function(time, err) {
                var _this4 = this;
                if (this.resolved || this.rejected) return this;
                var timeout = setTimeout(function() {
                    _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                }, time);
                return this.then(function(result) {
                    clearTimeout(timeout);
                    return result;
                });
            };
            ZalgoPromise.prototype.toPromise = function() {
                if (!window.Promise) throw new Error("Could not find window.Promise");
                return window.Promise.resolve(this);
            };
            ZalgoPromise.resolve = function(value) {
                return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                    return value.then(resolve, reject);
                }) : new ZalgoPromise().resolve(value);
            };
            ZalgoPromise.reject = function(error) {
                return new ZalgoPromise().reject(error);
            };
            ZalgoPromise.all = function(promises) {
                var promise = new ZalgoPromise(), count = promises.length, results = [];
                if (!count) {
                    promise.resolve(results);
                    return promise;
                }
                for (var i = 0; i < promises.length; i++) {
                    (function(i) {
                        var prom = promises[i];
                        if (prom instanceof ZalgoPromise) {
                            if (prom.resolved) {
                                results[i] = prom.value;
                                count -= 1;
                                return "continue";
                            }
                        } else if (!utils_isPromise(prom)) {
                            results[i] = prom;
                            count -= 1;
                            return "continue";
                        }
                        ZalgoPromise.resolve(prom).then(function(result) {
                            results[i] = result;
                            count -= 1;
                            0 === count && promise.resolve(results);
                        }, function(err) {
                            promise.reject(err);
                        });
                    })(i);
                }
                0 === count && promise.resolve(results);
                return promise;
            };
            ZalgoPromise.hash = function(promises) {
                var result = {};
                return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                    return ZalgoPromise.resolve(promises[key]).then(function(value) {
                        result[key] = value;
                    });
                })).then(function() {
                    return result;
                });
            };
            ZalgoPromise.map = function(items, method) {
                return ZalgoPromise.all(items.map(method));
            };
            ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                return exceptions_onPossiblyUnhandledException(handler);
            };
            ZalgoPromise.try = function(method, context, args) {
                var result = void 0;
                try {
                    result = method.apply(context, args || []);
                } catch (err) {
                    return ZalgoPromise.reject(err);
                }
                return ZalgoPromise.resolve(result);
            };
            ZalgoPromise.delay = function(_delay) {
                return new ZalgoPromise(function(resolve) {
                    setTimeout(resolve, _delay);
                });
            };
            ZalgoPromise.isPromise = function(value) {
                return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
            };
            ZalgoPromise.flush = function() {
                var promise = new ZalgoPromise();
                global.flushPromises.push(promise);
                0 === global.activeCount && ZalgoPromise.flushQueue();
                return promise;
            };
            ZalgoPromise.flushQueue = function() {
                var promisesToFlush = global.flushPromises;
                global.flushPromises = [];
                for (var _iterator = promisesToFlush, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }
                    _ref.resolve();
                }
            };
            return ZalgoPromise;
        }();
        __webpack_require__.d(__webpack_exports__, "ZalgoPromise", function() {
            return promise_ZalgoPromise;
        });
    },
    "./src/loader/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _interface = __webpack_require__("./src/loader/interface.js");
        !function(xports) {
            for (var namespaces = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], childnamespaces = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], _iterator = namespaces, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var name = _ref, namespace = window[name];
                if (namespace) for (var _iterator3 = childnamespaces, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _extends2, _ref3;
                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref3 = _i3.value;
                    }
                    var childname = _ref3, childnamespace = xports[childname];
                    namespace[childname] && (childnamespace = _extends({}, namespace[childname], childnamespace));
                    xports = _extends({}, namespace, xports, (_extends2 = {}, _extends2[childname] = childnamespace, 
                    _extends2));
                }
            }
            for (var _iterator2 = namespaces, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }
                var _name = _ref2;
                window[_name] = xports;
            }
        }(_interface, [ "paypal" ]);
    },
    "./src/loader/interface.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isCheckoutXComponent() {
            if (window.name) {
                var seg = window.name.split(config.name_separator);
                if (seg[0] === config.xcomponent && seg[1] === config.ppcheckout) return !0;
            }
            return !1;
        }
        function getVersion() {
            if (!isCheckoutXComponent()) throw new Error("Can not get version for non-xcomponent");
            return window.name.split(config.name_separator)[2].replace(/_/g, ".");
        }
        function isLatest() {
            if (!isCheckoutXComponent()) return !1;
            var version = getVersion();
            return Boolean(version === config.major_version || version === config.latest_version);
        }
        function loadScript(url, prop, attrs, callback) {
            if (window[prop]) return callback(null, window[prop]);
            var container = document.body || document.head;
            if (!container) return callback(new Error("Can not find container to insert script into"));
            var script = document.createElement("script");
            script.src = url;
            script.onload = function() {
                return window[prop] ? callback(null, window[prop]) : callback(new Error("Expected " + prop + " to be present on window"));
            };
            script.onerror = function(err) {
                return callback(err);
            };
            for (var _iterator = Object.keys(attrs), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var attr = _ref;
                script.setAttribute(attr, attrs[attr]);
            }
            container.appendChild(script);
        }
        function warn() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            var message = args.join(" ");
            window.console && window.console.warn ? window.console.warn(message) : window.console && window.console.log && window.console.log(message);
        }
        function parseQuery() {
            var queryString = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.search, params = {};
            queryString && 0 === queryString.indexOf("?") && (queryString = queryString.slice(1));
            if (!queryString) return params;
            if (-1 === queryString.indexOf("=")) throw new Error("Can not parse query string params: " + queryString);
            for (var _iterator2 = queryString.split("&"), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }
                var pair = _ref2;
                pair = pair.split("=");
                pair[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
            }
            return params;
        }
        function onLoadCheckoutIntegration(callback) {
            return integrationResponder.listen(callback);
        }
        function getIntegrationURLs() {
            return {
                latest: isLatest(),
                major: config.checkoutjs_url.replace("{version}", ""),
                minor: config.checkoutjs_url.replace("{version}", "." + getVersion())
            };
        }
        function getIntegrationProps() {
            var props = _extends({}, config.script_props), query = parseQuery();
            query.env && (props["data-env"] = query.env);
            query.stage && (props["data-stage"] = query.stage);
            return props;
        }
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var config = {
            checkoutjs_url: "https://www.paypalobjects.com/api/checkout{version}.js",
            major_version: "4",
            latest_version: "latest",
            xcomponent: "xcomponent",
            ppcheckout: "ppcheckout",
            xchild_global: "xchild",
            name_separator: "__",
            script_props: {
                "data-paypal-checkout": "",
                "data-no-bridge": "",
                "data-state": "ppxo_checkout"
            }
        }, _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, integrationResponder = function() {
            function flush() {
                if (loaded) for (;callbacks.length; ) callbacks.shift()(err, res);
            }
            function respond(error, result) {
                loaded = !0;
                err = error;
                res = result;
                flush();
            }
            function listen(callback) {
                callbacks.push(callback);
                flush();
            }
            var callbacks = [], loaded = !1, err = void 0, res = void 0;
            return {
                respond: respond,
                listen: listen
            };
        }();
        !function(callback) {
            if (!isCheckoutXComponent()) return callback(null, null);
            var urls = getIntegrationURLs(), props = getIntegrationProps();
            loadScript(urls.latest ? urls.major : urls.minor, config.xchild_global, props, function(err, result) {
                return err && !urls.latest ? loadScript(urls.major + "?t=" + Date.now(), config.xchild_global, props, callback) : callback(err, result);
            });
        }(function(err, result) {
            err && warn("Failed to load checkout.js", err.stack || err.toString());
            if (err || result) return integrationResponder.respond(err, result);
        });
        __webpack_require__.d(__webpack_exports__, "onLoadCheckoutIntegration", function() {
            return onLoadCheckoutIntegration;
        });
        __webpack_require__.d(__webpack_exports__, "isCheckoutXComponent", function() {
            return isCheckoutXComponent;
        });
    },
    0: function(module, exports, __webpack_require__) {
        __webpack_require__("./node_modules/zalgo-promise/src/index.js");
        module.exports = __webpack_require__("./src/loader/index.js");
    }
}));
//# sourceMappingURL=checkout.child.loader.js.map