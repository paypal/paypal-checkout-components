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
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
}({
    "./node_modules/belter/dist/belter.js": function(module, exports, __webpack_require__) {
        "undefined" != typeof self && self, factory = function() {
            return function(modules) {
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
                __webpack_require__.p = "";
                return __webpack_require__(__webpack_require__.s = "./src/index.js");
            }({
                "./node_modules/cross-domain-utils/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
                    var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
                    __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types__);
                },
                "./node_modules/cross-domain-utils/src/types.js": function(module, exports) {},
                "./node_modules/cross-domain-utils/src/utils.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                },
                "./node_modules/zalgo-promise/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
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
                    function getGlobal() {
                        var glob = void 0;
                        if ("undefined" != typeof window) glob = window; else {
                            if ("undefined" == typeof global) throw new TypeError("Can not find global");
                            glob = global;
                        }
                        var zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
                        zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
                        zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
                        zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
                        zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];
                        return zalgoGlobal;
                    }
                    var promise_ZalgoPromise = function() {
                        function ZalgoPromise(handler) {
                            var _this = this;
                            !function(instance, Constructor) {
                                if (!(instance instanceof ZalgoPromise)) throw new TypeError("Cannot call a class as a function");
                            }(this);
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
                                _this2.errorHandled || function(err) {
                                    if (-1 === getGlobal().dispatchedErrors.indexOf(err)) {
                                        getGlobal().dispatchedErrors.push(err);
                                        setTimeout(function() {
                                            throw err;
                                        }, 1);
                                        for (var j = 0; j < getGlobal().possiblyUnhandledPromiseHandlers.length; j++) getGlobal().possiblyUnhandledPromiseHandlers[j](err);
                                    }
                                }(error);
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
                                getGlobal().activeCount += 1;
                                for (var _loop = function(i) {
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
                                }, i = 0; i < handlers.length; i++) _loop(i);
                                handlers.length = 0;
                                this.dispatching = !1;
                                getGlobal().activeCount -= 1;
                                0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
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
                            if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                            return Promise.resolve(this);
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
                            for (var _loop2 = function(i) {
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
                                    0 == (count -= 1) && promise.resolve(results);
                                }, function(err) {
                                    promise.reject(err);
                                });
                            }, i = 0; i < promises.length; i++) _loop2(i);
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
                            return function(handler) {
                                getGlobal().possiblyUnhandledPromiseHandlers.push(handler);
                                return {
                                    cancel: function() {
                                        getGlobal().possiblyUnhandledPromiseHandlers.splice(getGlobal().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                                    }
                                };
                            }(handler);
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
                            getGlobal().flushPromises.push(promise);
                            0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
                            return promise;
                        };
                        ZalgoPromise.flushQueue = function() {
                            var promisesToFlush = getGlobal().flushPromises;
                            getGlobal().flushPromises = [];
                            for (var _i2 = 0, _length2 = null == promisesToFlush ? 0 : promisesToFlush.length; _i2 < _length2; _i2++) promisesToFlush[_i2].resolve();
                        };
                        return ZalgoPromise;
                    }();
                    __webpack_require__.d(__webpack_exports__, "a", function() {
                        return promise_ZalgoPromise;
                    });
                },
                "./src/device.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    __webpack_exports__.a = getUserAgent;
                    __webpack_exports__.d = function() {
                        return !!getUserAgent().match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i);
                    };
                    __webpack_exports__.s = function() {
                        var userAgent = getUserAgent();
                        return /(iPhone|iPod|iPad|Macintosh).*AppleWebKit(?!.*Safari)/i.test(userAgent) || /\bwv\b/.test(userAgent) || /Android.*Version\/(\d)\.(\d)/i.test(userAgent);
                    };
                    __webpack_exports__.r = isStandAlone;
                    __webpack_exports__.g = isFacebookWebView;
                    __webpack_exports__.h = isFirefoxIOS;
                    __webpack_exports__.e = isEdgeIOS;
                    __webpack_exports__.p = isOperaMini;
                    __webpack_exports__.b = isAndroid;
                    __webpack_exports__.m = isIos;
                    __webpack_exports__.i = isGoogleSearchApp;
                    __webpack_exports__.q = isQQBrowser;
                    __webpack_exports__.n = isIosWebview;
                    __webpack_exports__.c = isAndroidWebview;
                    __webpack_exports__.j = function() {
                        return !!window.document.documentMode || Boolean(window.navigator && window.navigator.userAgent && /Edge|MSIE/i.test(window.navigator.userAgent));
                    };
                    __webpack_exports__.k = function() {
                        var mHttp = window.document.querySelector('meta[http-equiv="X-UA-Compatible"]'), mContent = window.document.querySelector('meta[content="IE=edge"]');
                        return !(!mHttp || !mContent);
                    };
                    __webpack_exports__.f = isElectron;
                    __webpack_exports__.l = function() {
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
                    };
                    __webpack_exports__.o = isMacOsCna;
                    __webpack_exports__.t = function() {
                        var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                        return !(isIosWebview(ua) || isAndroidWebview(ua) || isOperaMini(ua) || isFirefoxIOS(ua) || isEdgeIOS(ua) || isFacebookWebView(ua) || isQQBrowser(ua) || isElectron() || isMacOsCna() || isStandAlone());
                    };
                    function getUserAgent() {
                        return window.navigator.mockUserAgent || window.navigator.userAgent;
                    }
                    function isStandAlone() {
                        return !0 === window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches;
                    }
                    function isFacebookWebView() {
                        var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                        return -1 !== ua.indexOf("FBAN") || -1 !== ua.indexOf("FBAV");
                    }
                    function isFirefoxIOS() {
                        var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                        return /FxiOS/i.test(ua);
                    }
                    function isEdgeIOS() {
                        var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                        return /EdgiOS/i.test(ua);
                    }
                    function isOperaMini() {
                        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent()).indexOf("Opera Mini") > -1;
                    }
                    function isAndroid() {
                        var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                        return /Android/.test(ua);
                    }
                    function isIos() {
                        var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                        return /iPhone|iPod|iPad/.test(ua);
                    }
                    function isGoogleSearchApp() {
                        var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                        return /\bGSA\b/.test(ua);
                    }
                    function isQQBrowser() {
                        var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                        return /QQBrowser/.test(ua);
                    }
                    function isIosWebview() {
                        var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                        return !!isIos(ua) && (!!isGoogleSearchApp(ua) || /.+AppleWebKit(?!.*Safari)/.test(ua));
                    }
                    function isAndroidWebview() {
                        var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                        return !!isAndroid(ua) && /Version\/[\d.]+/.test(ua) && !isOperaMini(ua);
                    }
                    function isElectron() {
                        return !("undefined" == typeof process || !process.versions || !process.versions.electron);
                    }
                    function isMacOsCna() {
                        var userAgent = getUserAgent();
                        return /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent);
                    }
                },
                "./src/dom.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), util = __webpack_require__("./src/util.js"), device = __webpack_require__("./src/device.js");
                    __webpack_exports__.h = isDocumentReady;
                    __webpack_exports__.q = function waitForWindowReady() {
                        return Object(util.l)(waitForWindowReady, function() {
                            return new src.a(function(resolve) {
                                isDocumentReady() && resolve();
                                window.addEventListener("load", function() {
                                    return resolve();
                                });
                            });
                        });
                    };
                    __webpack_exports__.p = waitForDocumentReady;
                    __webpack_exports__.o = function() {
                        return waitForDocumentReady.then(function() {
                            if (document.body) return document.body;
                            throw new Error("Document ready but document.body not present");
                        });
                    };
                    __webpack_exports__.k = parseQuery;
                    __webpack_exports__.d = function(name) {
                        return parseQuery(window.location.search.slice(1))[name];
                    };
                    __webpack_exports__.n = urlWillRedirectPage;
                    __webpack_exports__.b = function(url) {
                        var params = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, hasHash = url.indexOf("#") > 0, _url$split = url.split("#"), serverUrl = _url$split[0], hash = _url$split[1];
                        if (hash && !serverUrl) {
                            var _ref = [ "#" + hash, "" ];
                            serverUrl = _ref[0];
                            hash = _ref[1];
                        }
                        var _serverUrl$split = serverUrl.split("?"), originalUrl = _serverUrl$split[0], originalQueryString = _serverUrl$split[1];
                        if (originalQueryString) {
                            var originalQuery = parseQuery(originalQueryString);
                            for (var _key in originalQuery) params.hasOwnProperty(_key) || (params[_key] = originalQuery[_key]);
                        }
                        var newQueryString = Object.keys(params).filter(function(key) {
                            return key && params[key];
                        }).sort().map(function(key) {
                            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
                        }).join("&"), newUrl = originalUrl;
                        newQueryString && (newUrl = newUrl + "?" + newQueryString);
                        hasHash && (newUrl = newUrl + "#" + (hash || ""));
                        return newUrl;
                    };
                    __webpack_exports__.m = function(url) {
                        var win = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
                        return new src.a(function(resolve) {
                            win.location = url;
                            urlWillRedirectPage(url) || resolve();
                        });
                    };
                    __webpack_exports__.e = function() {
                        var meta = document.querySelector("meta[name=viewport]");
                        return !(Object(device.d)() && window.screen.width < 660 && !meta);
                    };
                    __webpack_exports__.i = function(el) {
                        return Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
                    };
                    __webpack_exports__.a = enablePerformance;
                    __webpack_exports__.c = function() {
                        return waitForDocumentReady().then(function() {
                            if (enablePerformance()) {
                                var timing = window.performance.timing;
                                return timing.connectEnd && timing.domInteractive ? timing.domInteractive - timing.connectEnd : void 0;
                            }
                        });
                    };
                    __webpack_exports__.f = function() {
                        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
                    };
                    __webpack_exports__.g = function() {
                        return "undefined" != typeof window;
                    };
                    __webpack_exports__.l = function(selector) {
                        var doc = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.document;
                        return Array.prototype.slice.call(doc.querySelectorAll(selector));
                    };
                    __webpack_exports__.j = function(element, handler) {
                        element.addEventListener("touchstart", util.t);
                        element.addEventListener("click", handler);
                        element.addEventListener("keypress", function(event) {
                            if (13 === event.keyCode) return handler(event);
                        });
                    };
                    function isDocumentReady() {
                        return Boolean(document.body) && "complete" === document.readyState;
                    }
                    function waitForDocumentReady() {
                        return Object(util.l)(waitForDocumentReady, function() {
                            return new src.a(function(resolve) {
                                if (isDocumentReady()) return resolve();
                                var interval = setInterval(function() {
                                    if (isDocumentReady()) {
                                        clearInterval(interval);
                                        return resolve();
                                    }
                                }, 10);
                            });
                        });
                    }
                    function parseQuery(queryString) {
                        return Object(util.l)(parseQuery, function() {
                            var params = {};
                            if (!queryString) return params;
                            if (-1 === queryString.indexOf("=")) return params;
                            for (var _i2 = 0, _queryString$split2 = queryString.split("&"), _length2 = null == _queryString$split2 ? 0 : _queryString$split2.length; _i2 < _length2; _i2++) {
                                var pair = _queryString$split2[_i2];
                                (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                            }
                            return params;
                        }, [ queryString ]);
                    }
                    function urlWillRedirectPage(url) {
                        return -1 === url.indexOf("#") || 0 !== url.indexOf("#") && url.split("#")[0] !== window.location.href.split("#")[0];
                    }
                    function enablePerformance() {
                        return Object(util.l)(enablePerformance, function() {
                            return Boolean(window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0);
                        });
                    }
                },
                "./src/experiment.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    __webpack_exports__.a = function(_ref) {
                        var group, name = _ref.name, _ref$sample = _ref.sample, sample = void 0 === _ref$sample ? 50 : _ref$sample, _ref$logTreatment = _ref.logTreatment, logTreatment = void 0 === _ref$logTreatment ? __WEBPACK_IMPORTED_MODULE_0__util__.t : _ref$logTreatment, _ref$logCheckpoint = _ref.logCheckpoint, logCheckpoint = void 0 === _ref$logCheckpoint ? __WEBPACK_IMPORTED_MODULE_0__util__.t : _ref$logCheckpoint, throttle = function(name) {
                            return getBelterExperimentStorage().getState(function(state) {
                                state.throttlePercentiles = state.throttlePercentiles || {};
                                state.throttlePercentiles[name] = state.throttlePercentiles[name] || Math.floor(100 * Math.random());
                                return state.throttlePercentiles[name];
                            });
                        }(name);
                        group = throttle < sample ? THROTTLE_GROUP.TEST : sample >= 50 || sample <= throttle && throttle < 2 * sample ? THROTTLE_GROUP.CONTROL : THROTTLE_GROUP.THROTTLE;
                        var treatment = name + "_" + group, started = !1, forced = !1;
                        try {
                            window.localStorage && window.localStorage.getItem(name) && (forced = !0);
                        } catch (err) {}
                        return {
                            isEnabled: function() {
                                return group === THROTTLE_GROUP.TEST || forced;
                            },
                            isDisabled: function() {
                                return group !== THROTTLE_GROUP.TEST && !forced;
                            },
                            getTreatment: function() {
                                return treatment;
                            },
                            log: function(checkpoint) {
                                var payload = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                if (!started) return this;
                                isEventUnique(name + "_" + treatment) && logTreatment({
                                    name: name,
                                    treatment: treatment
                                });
                                isEventUnique(name + "_" + treatment + "_" + checkpoint) && logCheckpoint({
                                    name: name,
                                    treatment: treatment,
                                    checkpoint: checkpoint,
                                    payload: payload
                                });
                                return this;
                            },
                            logStart: function() {
                                var payload = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                started = !0;
                                return this.log("start", payload);
                            },
                            logComplete: function() {
                                var payload = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                return this.log("complete", payload);
                            }
                        };
                    };
                    var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./src/util.js"), __WEBPACK_IMPORTED_MODULE_1__storage__ = __webpack_require__("./src/storage.js");
                    function getBelterExperimentStorage() {
                        return Object(__WEBPACK_IMPORTED_MODULE_1__storage__.a)({
                            name: "belter_experiment"
                        });
                    }
                    function isEventUnique(name) {
                        return getBelterExperimentStorage().getSessionState(function(state) {
                            state.loggedBeacons = state.loggedBeacons || [];
                            if (-1 === state.loggedBeacons.indexOf(name)) {
                                state.loggedBeacons.push(name);
                                return !0;
                            }
                            return !1;
                        });
                    }
                    var THROTTLE_GROUP = {
                        TEST: "test",
                        CONTROL: "control",
                        THROTTLE: "throttle"
                    };
                },
                "./src/global.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    __webpack_exports__.a = function(_ref) {
                        var name = _ref.name, _ref$version = _ref.version, version = void 0 === _ref$version ? "latest" : _ref$version, global = Object(__WEBPACK_IMPORTED_MODULE_0__util__.i)(), globalKey = "__" + name + "__" + version + "_global__", namespace = global[globalKey] = global[globalKey] || {};
                        return {
                            get: function(key, defValue) {
                                defValue = defValue || {};
                                return namespace[key] = namespace[key] || defValue;
                            }
                        };
                    };
                    var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./src/util.js");
                },
                "./src/http.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    __webpack_exports__.b = function(_ref) {
                        var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 0 : _ref$timeout;
                        return new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a(function(resolve, reject) {
                            if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
                            for (var normalizedHeaders = {}, _i4 = 0, _Object$keys2 = Object.keys(headers), _length4 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                                var _key2 = _Object$keys2[_i4];
                                normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
                            }
                            json ? normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/json" : (data || body) && (normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/x-www-form-urlencoded; charset=utf-8");
                            normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || "application/json";
                            for (var _i6 = 0, _length6 = null == headerBuilders ? 0 : headerBuilders.length; _i6 < _length6; _i6++) for (var builtHeaders = (0, 
                            headerBuilders[_i6])(), _i8 = 0, _Object$keys4 = Object.keys(builtHeaders), _length8 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i8 < _length8; _i8++) {
                                var _key3 = _Object$keys4[_i8];
                                normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
                            }
                            var xhr = new win.XMLHttpRequest();
                            xhr.addEventListener("load", function() {
                                var responseHeaders = function() {
                                    for (var result = {}, _i2 = 0, _rawHeaders$trim$spli2 = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").trim().split("\n"), _length2 = null == _rawHeaders$trim$spli2 ? 0 : _rawHeaders$trim$spli2.length; _i2 < _length2; _i2++) {
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
                                var res = {
                                    status: this.status,
                                    headers: responseHeaders,
                                    body: responseBody
                                };
                                return resolve(res);
                            }, !1);
                            xhr.addEventListener("error", function(evt) {
                                reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
                            }, !1);
                            xhr.open(method, url, !0);
                            for (var _key4 in normalizedHeaders) normalizedHeaders.hasOwnProperty(_key4) && xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
                            json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map(function(key) {
                                return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
                            }).join("&"));
                            xhr.timeout = timeout;
                            xhr.ontimeout = function() {
                                reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
                            };
                            xhr.send(body);
                        });
                    };
                    __webpack_exports__.a = function(method) {
                        headerBuilders.push(method);
                    };
                    var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), HEADERS = (__webpack_require__("./node_modules/cross-domain-utils/src/index.js"), 
                    {
                        CONTENT_TYPE: "content-type",
                        ACCEPT: "accept"
                    }), headerBuilders = [];
                },
                "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    Object.defineProperty(__webpack_exports__, "__esModule", {
                        value: !0
                    });
                    var __WEBPACK_IMPORTED_MODULE_0__device__ = __webpack_require__("./src/device.js");
                    __webpack_require__.d(__webpack_exports__, "getUserAgent", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.a;
                    });
                    __webpack_require__.d(__webpack_exports__, "isDevice", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.d;
                    });
                    __webpack_require__.d(__webpack_exports__, "isWebView", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.s;
                    });
                    __webpack_require__.d(__webpack_exports__, "isStandAlone", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.r;
                    });
                    __webpack_require__.d(__webpack_exports__, "isFacebookWebView", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.g;
                    });
                    __webpack_require__.d(__webpack_exports__, "isFirefoxIOS", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.h;
                    });
                    __webpack_require__.d(__webpack_exports__, "isEdgeIOS", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.e;
                    });
                    __webpack_require__.d(__webpack_exports__, "isOperaMini", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.p;
                    });
                    __webpack_require__.d(__webpack_exports__, "isAndroid", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.b;
                    });
                    __webpack_require__.d(__webpack_exports__, "isIos", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.m;
                    });
                    __webpack_require__.d(__webpack_exports__, "isGoogleSearchApp", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.i;
                    });
                    __webpack_require__.d(__webpack_exports__, "isQQBrowser", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.q;
                    });
                    __webpack_require__.d(__webpack_exports__, "isIosWebview", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.n;
                    });
                    __webpack_require__.d(__webpack_exports__, "isAndroidWebview", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.c;
                    });
                    __webpack_require__.d(__webpack_exports__, "isIE", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.j;
                    });
                    __webpack_require__.d(__webpack_exports__, "isIECompHeader", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.k;
                    });
                    __webpack_require__.d(__webpack_exports__, "isElectron", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.f;
                    });
                    __webpack_require__.d(__webpack_exports__, "isIEIntranet", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.l;
                    });
                    __webpack_require__.d(__webpack_exports__, "isMacOsCna", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.o;
                    });
                    __webpack_require__.d(__webpack_exports__, "supportsPopups", function() {
                        return __WEBPACK_IMPORTED_MODULE_0__device__.t;
                    });
                    var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__("./src/dom.js");
                    __webpack_require__.d(__webpack_exports__, "isDocumentReady", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.h;
                    });
                    __webpack_require__.d(__webpack_exports__, "waitForWindowReady", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.q;
                    });
                    __webpack_require__.d(__webpack_exports__, "waitForDocumentReady", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.p;
                    });
                    __webpack_require__.d(__webpack_exports__, "waitForDocumentBody", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.o;
                    });
                    __webpack_require__.d(__webpack_exports__, "parseQuery", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.k;
                    });
                    __webpack_require__.d(__webpack_exports__, "getQueryParam", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.d;
                    });
                    __webpack_require__.d(__webpack_exports__, "urlWillRedirectPage", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.n;
                    });
                    __webpack_require__.d(__webpack_exports__, "extendUrl", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.b;
                    });
                    __webpack_require__.d(__webpack_exports__, "redirect", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.m;
                    });
                    __webpack_require__.d(__webpack_exports__, "hasMetaViewPort", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.e;
                    });
                    __webpack_require__.d(__webpack_exports__, "isElementVisible", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.i;
                    });
                    __webpack_require__.d(__webpack_exports__, "enablePerformance", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.a;
                    });
                    __webpack_require__.d(__webpack_exports__, "getPageRenderTime", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.c;
                    });
                    __webpack_require__.d(__webpack_exports__, "htmlEncode", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.f;
                    });
                    __webpack_require__.d(__webpack_exports__, "isBrowser", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.g;
                    });
                    __webpack_require__.d(__webpack_exports__, "querySelectorAll", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.l;
                    });
                    __webpack_require__.d(__webpack_exports__, "onClick", function() {
                        return __WEBPACK_IMPORTED_MODULE_1__dom__.j;
                    });
                    var __WEBPACK_IMPORTED_MODULE_2__experiment__ = __webpack_require__("./src/experiment.js");
                    __webpack_require__.d(__webpack_exports__, "experiment", function() {
                        return __WEBPACK_IMPORTED_MODULE_2__experiment__.a;
                    });
                    var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__("./src/global.js");
                    __webpack_require__.d(__webpack_exports__, "getGlobalNameSpace", function() {
                        return __WEBPACK_IMPORTED_MODULE_3__global__.a;
                    });
                    var __WEBPACK_IMPORTED_MODULE_4__jsx__ = __webpack_require__("./src/jsx.jsx");
                    __webpack_require__.d(__webpack_exports__, "JsxHTMLNode", function() {
                        return __WEBPACK_IMPORTED_MODULE_4__jsx__.b;
                    });
                    __webpack_require__.d(__webpack_exports__, "JsxHTMLNodeContainer", function() {
                        return __WEBPACK_IMPORTED_MODULE_4__jsx__.c;
                    });
                    __webpack_require__.d(__webpack_exports__, "jsxToHTML", function() {
                        return __WEBPACK_IMPORTED_MODULE_4__jsx__.f;
                    });
                    __webpack_require__.d(__webpack_exports__, "jsxRender", function() {
                        return __WEBPACK_IMPORTED_MODULE_4__jsx__.e;
                    });
                    __webpack_require__.d(__webpack_exports__, "Fragment", function() {
                        return __WEBPACK_IMPORTED_MODULE_4__jsx__.a;
                    });
                    __webpack_require__.d(__webpack_exports__, "SVG", function() {
                        return __WEBPACK_IMPORTED_MODULE_4__jsx__.d;
                    });
                    __webpack_require__.d(__webpack_exports__, "placeholderToJSX", function() {
                        return __WEBPACK_IMPORTED_MODULE_4__jsx__.g;
                    });
                    var __WEBPACK_IMPORTED_MODULE_5__storage__ = __webpack_require__("./src/storage.js");
                    __webpack_require__.d(__webpack_exports__, "getStorage", function() {
                        return __WEBPACK_IMPORTED_MODULE_5__storage__.a;
                    });
                    var __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__("./src/util.js");
                    __webpack_require__.d(__webpack_exports__, "getGlobal", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.i;
                    });
                    __webpack_require__.d(__webpack_exports__, "memoize", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.r;
                    });
                    __webpack_require__.d(__webpack_exports__, "inlineMemoize", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.l;
                    });
                    __webpack_require__.d(__webpack_exports__, "noop", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.t;
                    });
                    __webpack_require__.d(__webpack_exports__, "once", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.v;
                    });
                    __webpack_require__.d(__webpack_exports__, "base64encode", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.c;
                    });
                    __webpack_require__.d(__webpack_exports__, "base64decode", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.b;
                    });
                    __webpack_require__.d(__webpack_exports__, "uniqueID", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.J;
                    });
                    __webpack_require__.d(__webpack_exports__, "hashStr", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.j;
                    });
                    __webpack_require__.d(__webpack_exports__, "strHashStr", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.D;
                    });
                    __webpack_require__.d(__webpack_exports__, "match", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.p;
                    });
                    __webpack_require__.d(__webpack_exports__, "eventEmitter", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.g;
                    });
                    __webpack_require__.d(__webpack_exports__, "awaitKey", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.a;
                    });
                    __webpack_require__.d(__webpack_exports__, "stringifyError", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.F;
                    });
                    __webpack_require__.d(__webpack_exports__, "stringifyErrorMessage", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.G;
                    });
                    __webpack_require__.d(__webpack_exports__, "stringify", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.E;
                    });
                    __webpack_require__.d(__webpack_exports__, "isLocalStorageEnabled", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.o;
                    });
                    __webpack_require__.d(__webpack_exports__, "domainMatches", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.e;
                    });
                    __webpack_require__.d(__webpack_exports__, "patchMethod", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.w;
                    });
                    __webpack_require__.d(__webpack_exports__, "extend", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.h;
                    });
                    __webpack_require__.d(__webpack_exports__, "values", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.K;
                    });
                    __webpack_require__.d(__webpack_exports__, "perc", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.x;
                    });
                    __webpack_require__.d(__webpack_exports__, "min", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.s;
                    });
                    __webpack_require__.d(__webpack_exports__, "max", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.q;
                    });
                    __webpack_require__.d(__webpack_exports__, "regexMap", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.z;
                    });
                    __webpack_require__.d(__webpack_exports__, "svgToBase64", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.H;
                    });
                    __webpack_require__.d(__webpack_exports__, "objFilter", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.u;
                    });
                    __webpack_require__.d(__webpack_exports__, "identity", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.k;
                    });
                    __webpack_require__.d(__webpack_exports__, "regexTokenize", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.A;
                    });
                    __webpack_require__.d(__webpack_exports__, "promiseDebounce", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.y;
                    });
                    __webpack_require__.d(__webpack_exports__, "safeInterval", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.B;
                    });
                    __webpack_require__.d(__webpack_exports__, "isInteger", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.n;
                    });
                    __webpack_require__.d(__webpack_exports__, "isFloat", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.m;
                    });
                    __webpack_require__.d(__webpack_exports__, "serializePrimitive", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.C;
                    });
                    __webpack_require__.d(__webpack_exports__, "deserializePrimitive", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.d;
                    });
                    __webpack_require__.d(__webpack_exports__, "dotify", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.f;
                    });
                    __webpack_require__.d(__webpack_exports__, "undotify", function() {
                        return __WEBPACK_IMPORTED_MODULE_6__util__.I;
                    });
                    var __WEBPACK_IMPORTED_MODULE_7__http__ = __webpack_require__("./src/http.js");
                    __webpack_require__.d(__webpack_exports__, "request", function() {
                        return __WEBPACK_IMPORTED_MODULE_7__http__.b;
                    });
                    __webpack_require__.d(__webpack_exports__, "addHeaderBuilder", function() {
                        return __WEBPACK_IMPORTED_MODULE_7__http__.a;
                    });
                    var __WEBPACK_IMPORTED_MODULE_8__types__ = __webpack_require__("./src/types.js");
                    __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__types__);
                    for (var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_8__types__) [ "getUserAgent", "isDevice", "isWebView", "isStandAlone", "isFacebookWebView", "isFirefoxIOS", "isEdgeIOS", "isOperaMini", "isAndroid", "isIos", "isGoogleSearchApp", "isQQBrowser", "isIosWebview", "isAndroidWebview", "isIE", "isIECompHeader", "isElectron", "isIEIntranet", "isMacOsCna", "supportsPopups", "isDocumentReady", "waitForWindowReady", "waitForDocumentReady", "waitForDocumentBody", "parseQuery", "getQueryParam", "urlWillRedirectPage", "extendUrl", "redirect", "hasMetaViewPort", "isElementVisible", "enablePerformance", "getPageRenderTime", "htmlEncode", "isBrowser", "querySelectorAll", "onClick", "experiment", "getGlobalNameSpace", "JsxHTMLNode", "JsxHTMLNodeContainer", "jsxToHTML", "jsxRender", "Fragment", "SVG", "placeholderToJSX", "getStorage", "getGlobal", "memoize", "inlineMemoize", "noop", "once", "base64encode", "base64decode", "uniqueID", "hashStr", "strHashStr", "match", "eventEmitter", "awaitKey", "stringifyError", "stringifyErrorMessage", "stringify", "isLocalStorageEnabled", "domainMatches", "patchMethod", "extend", "values", "perc", "min", "max", "regexMap", "svgToBase64", "objFilter", "identity", "regexTokenize", "promiseDebounce", "safeInterval", "isInteger", "isFloat", "serializePrimitive", "deserializePrimitive", "dotify", "undotify", "request", "addHeaderBuilder", "default" ].indexOf(__WEBPACK_IMPORT_KEY__) < 0 && function(key) {
                        __webpack_require__.d(__webpack_exports__, key, function() {
                            return __WEBPACK_IMPORTED_MODULE_8__types__[key];
                        });
                    }(__WEBPACK_IMPORT_KEY__);
                },
                "./src/jsx.jsx": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    __webpack_require__.d(__webpack_exports__, "b", function() {
                        return JsxHTMLNode;
                    });
                    __webpack_require__.d(__webpack_exports__, "c", function() {
                        return JsxHTMLNodeContainer;
                    });
                    __webpack_exports__.f = jsxToHTML;
                    __webpack_exports__.e = function(template, renderers) {
                        var nodes = Object(__WEBPACK_IMPORTED_MODULE_0__util__.z)(template, /\{\s*([a-z]+)(?::\s*([^} ]+))?\s*\}|([^${}]+)/g, function(match, type, value, text) {
                            if (type) {
                                if (!renderers[type]) throw new Error("Can not render type: " + type);
                                return renderers[type](value);
                            }
                            return text && text.trim() && renderers.text ? /<br>/.test(text) ? renderers.break(text) : renderers.text(text) : text;
                        });
                        return new JsxHTMLNodeContainer(nodes);
                    };
                    __webpack_exports__.a = function(props, children) {
                        return new JsxHTMLNodeContainer(children);
                    };
                    __webpack_exports__.d = function(props) {
                        var svg = props.svg, otherProps = function(obj, keys) {
                            var target = {};
                            for (var i in obj) keys.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(obj, i) && (target[i] = obj[i]);
                            return target;
                        }(props, [ "svg" ]);
                        if (!svg) throw new TypeError("Expected svg prop");
                        if ("string" != typeof svg && !(svg instanceof JsxHTMLNode)) throw new TypeError("Expected svg prop to be a string or jsx html node");
                        return jsxToHTML("img", _extends({
                            src: Object(__WEBPACK_IMPORTED_MODULE_0__util__.H)(svg.toString())
                        }, otherProps));
                    };
                    __webpack_exports__.g = function(text, placeholders) {
                        return Object(__WEBPACK_IMPORTED_MODULE_0__util__.A)(text, /(\{[a-z]+\})|([^{}]+)/g).map(function(token) {
                            var match = token.match(/^{([a-z]+)}$/);
                            return match ? placeholders[match[1]]() : placeholders.text ? placeholders.text(token) : token;
                        });
                    };
                    var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./src/util.js"), _extends = Object.assign || function(target) {
                        for (var i = 1; i < arguments.length; i++) {
                            var source = arguments[i];
                            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                        }
                        return target;
                    };
                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }
                    function htmlEncode() {
                        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
                    }
                    var JsxHTMLNode = function() {
                        function JsxHTMLNode(name, props, children) {
                            _classCallCheck(this, JsxHTMLNode);
                            this.name = name;
                            this.props = props;
                            this.children = children;
                        }
                        JsxHTMLNode.prototype.toString = function() {
                            var name = this.name, props = this.propsToString(), children = this.childrenToString();
                            return "<" + name + (props ? " " : "") + props + ">" + children + "</" + name + ">";
                        };
                        JsxHTMLNode.prototype.propsToString = function() {
                            var props = this.props;
                            return props ? Object.keys(props).filter(function(key) {
                                return "innerHTML" !== key && props && !1 !== props[key];
                            }).map(function(key) {
                                if (props) {
                                    var val = props[key];
                                    if (!0 === val) return "" + htmlEncode(key);
                                    if ("string" == typeof val) return htmlEncode(key) + '="' + htmlEncode(val) + '"';
                                }
                                return "";
                            }).filter(Boolean).join(" ") : "";
                        };
                        JsxHTMLNode.prototype.childrenToString = function() {
                            if (this.props && this.props.innerHTML) return this.props.innerHTML;
                            if (!this.children) return "";
                            var result = "";
                            !function iterate(children) {
                                for (var _i2 = 0, _length2 = null == children ? 0 : children.length; _i2 < _length2; _i2++) {
                                    var child = children[_i2];
                                    null !== child && void 0 !== child && (Array.isArray(child) ? iterate(child) : result += child instanceof JsxHTMLNode ? child.toString() : htmlEncode(child));
                                }
                            }(this.children);
                            return result;
                        };
                        return JsxHTMLNode;
                    }(), JsxHTMLNodeContainer = function(_JsxHTMLNode) {
                        !function(subClass, superClass) {
                            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                            subClass.prototype = Object.create(superClass && superClass.prototype, {
                                constructor: {
                                    value: subClass,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            });
                            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                        }(JsxHTMLNodeContainer, _JsxHTMLNode);
                        function JsxHTMLNodeContainer(children) {
                            _classCallCheck(this, JsxHTMLNodeContainer);
                            return function(self, call) {
                                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !call || "object" != typeof call && "function" != typeof call ? self : call;
                            }(this, _JsxHTMLNode.call(this, "", {}, children));
                        }
                        JsxHTMLNodeContainer.prototype.toString = function() {
                            return this.childrenToString();
                        };
                        return JsxHTMLNodeContainer;
                    }(JsxHTMLNode);
                    function jsxToHTML(element) {
                        for (var props = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
                        if ("string" == typeof element) return new JsxHTMLNode(element, props, children);
                        if ("function" == typeof element) return element(props, children);
                        throw new TypeError("Expected jsx Element to be a string or a function");
                    }
                },
                "./src/storage.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    __webpack_exports__.a = function(_ref) {
                        var name = _ref.name, _ref$version = _ref.version, version = void 0 === _ref$version ? "latest" : _ref$version, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 3e5 : _ref$lifetime, STORAGE_KEY = "__" + name + "_" + version + "_storage__", accessedStorage = void 0;
                        function getState(handler) {
                            var localStorageEnabled = Object(__WEBPACK_IMPORTED_MODULE_0__util__.o)(), storage = void 0;
                            accessedStorage && (storage = accessedStorage);
                            if (!storage && localStorageEnabled) {
                                var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                                rawStorage && (storage = JSON.parse(rawStorage));
                            }
                            storage || (storage = Object(__WEBPACK_IMPORTED_MODULE_0__util__.i)()[STORAGE_KEY]);
                            storage || (storage = {
                                id: Object(__WEBPACK_IMPORTED_MODULE_0__util__.J)()
                            });
                            storage.id || (storage.id = Object(__WEBPACK_IMPORTED_MODULE_0__util__.J)());
                            accessedStorage = storage;
                            var result = handler(storage);
                            localStorageEnabled ? window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage)) : Object(__WEBPACK_IMPORTED_MODULE_0__util__.i)()[STORAGE_KEY] = storage;
                            accessedStorage = null;
                            return result;
                        }
                        function getSession(handler) {
                            return getState(function(storage) {
                                var session = storage.__session__, now = Date.now();
                                session && now - session.created > lifetime && (session = null);
                                session || (session = {
                                    guid: Object(__WEBPACK_IMPORTED_MODULE_0__util__.J)(),
                                    created: now
                                });
                                storage.__session__ = session;
                                return handler(session);
                            });
                        }
                        return {
                            getState: getState,
                            getID: function() {
                                return getState(function(storage) {
                                    return storage.id;
                                });
                            },
                            getSessionState: function(handler) {
                                return getSession(function(session) {
                                    session.state = session.state || {};
                                    return handler(session.state);
                                });
                            },
                            getSessionID: function() {
                                return getSession(function(session) {
                                    return session.guid;
                                });
                            }
                        };
                    };
                    var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./src/util.js");
                },
                "./src/types.js": function(module, exports) {},
                "./src/util.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    __webpack_exports__.i = getGlobal;
                    __webpack_exports__.r = memoize;
                    __webpack_exports__.l = inlineMemoize;
                    __webpack_exports__.t = function() {};
                    __webpack_exports__.v = function(method) {
                        var called = !1;
                        return function() {
                            if (!called) {
                                called = !0;
                                return method.apply(this, arguments);
                            }
                        };
                    };
                    __webpack_exports__.c = base64encode;
                    __webpack_exports__.b = function(str) {
                        return window.atob(str);
                    };
                    __webpack_exports__.J = function() {
                        var chars = "0123456789abcdef";
                        return "xxxxxxxxxx".replace(/./g, function() {
                            return chars.charAt(Math.floor(Math.random() * chars.length));
                        }) + "_" + base64encode(new Date().toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
                    };
                    __webpack_exports__.j = function(str) {
                        for (var hash = 0, i = 0; i < str.length; i++) hash += str[i].charCodeAt(0) * Math.pow(i % 10 + 1, 5);
                        return Math.floor(Math.pow(Math.sqrt(hash), 5));
                    };
                    __webpack_exports__.D = function(str) {
                        for (var hash = "", i = 0; i < str.length; i++) {
                            var total = str[i].charCodeAt(0) * i;
                            str[i + 1] && (total += str[i + 1].charCodeAt(0) * (i - 1));
                            hash += String.fromCharCode(97 + Math.abs(total) % 26);
                        }
                        return hash;
                    };
                    __webpack_exports__.p = function(str, pattern) {
                        var regmatch = str.match(pattern);
                        if (regmatch) return regmatch[1];
                    };
                    __webpack_exports__.g = function() {
                        var listeners = [];
                        return {
                            listen: function(method) {
                                listeners.push(method);
                                return {
                                    cancel: function() {
                                        listeners.splice(listeners.indexOf(method), 1);
                                    }
                                };
                            },
                            once: function(method) {
                                var listener = this.listen(function() {
                                    method.apply(null, arguments);
                                    listener.cancel();
                                });
                            },
                            trigger: function() {
                                for (var _i2 = 0, _length2 = null == listeners ? 0 : listeners.length; _i2 < _length2; _i2++) listeners[_i2].apply(void 0, arguments);
                            }
                        };
                    };
                    __webpack_exports__.a = function(obj, key) {
                        return new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a(function(resolve) {
                            var value = obj[key];
                            if (value) return resolve(value);
                            delete obj[key];
                            Object.defineProperty(obj, key, {
                                configurable: !0,
                                set: function(item) {
                                    (value = item) && resolve(value);
                                },
                                get: function() {
                                    return value;
                                }
                            });
                        });
                    };
                    __webpack_exports__.F = function stringifyError(err) {
                        var level = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                        if (level >= 3) return "stringifyError stack overflow";
                        try {
                            if (!err) return "<unknown error: " + Object.prototype.toString.call(err) + ">";
                            if ("string" == typeof err) return err;
                            if (err instanceof Error) {
                                var stack = err && err.stack, message = err && err.message;
                                if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                                if (stack) return stack;
                                if (message) return message;
                            }
                            return "function" == typeof err.toString ? err.toString() : Object.prototype.toString.call(err);
                        } catch (newErr) {
                            return "Error while stringifying error: " + stringifyError(newErr, level + 1);
                        }
                    };
                    __webpack_exports__.G = function(err) {
                        var defaultMessage = "<unknown error: " + Object.prototype.toString.call(err) + ">";
                        return err ? err instanceof Error ? err.message || defaultMessage : "string" == typeof err.message && err.message || defaultMessage : defaultMessage;
                    };
                    __webpack_exports__.E = function(item) {
                        return "string" == typeof item ? item : item && "function" == typeof item.toString ? item.toString() : Object.prototype.toString.call(item);
                    };
                    __webpack_exports__.o = function isLocalStorageEnabled() {
                        return inlineMemoize(isLocalStorageEnabled, function() {
                            try {
                                if ("undefined" == typeof window) return !1;
                                if (window.localStorage) {
                                    var _value = Math.random().toString();
                                    window.localStorage.setItem("__test__localStorage__", _value);
                                    var result = window.localStorage.getItem("__test__localStorage__");
                                    window.localStorage.removeItem("__test__localStorage__");
                                    if (_value === result) return !0;
                                }
                            } catch (err) {}
                            return !1;
                        });
                    };
                    __webpack_exports__.e = function(hostname, domain) {
                        var index = (hostname = hostname.split("://")[1]).indexOf(domain);
                        return -1 !== index && hostname.slice(index) === domain;
                    };
                    __webpack_exports__.w = function(obj, name, handler) {
                        var original = obj[name];
                        obj[name] = function() {
                            var _this = this, _arguments = arguments;
                            return handler({
                                context: this,
                                args: Array.prototype.slice.call(arguments),
                                original: original,
                                callOriginal: function() {
                                    return original.apply(_this, _arguments);
                                }
                            });
                        };
                    };
                    __webpack_exports__.h = function(obj, source) {
                        if (!source) return obj;
                        if (Object.assign) return Object.assign(obj, source);
                        for (var _key2 in source) source.hasOwnProperty(_key2) && (obj[_key2] = source[_key2]);
                        return obj;
                    };
                    __webpack_exports__.K = function(obj) {
                        var result = [];
                        for (var _key3 in obj) obj.hasOwnProperty(_key3) && result.push(obj[_key3]);
                        return result;
                    };
                    __webpack_exports__.x = function(pixels, percentage) {
                        return Math.round(pixels * percentage / 100);
                    };
                    __webpack_exports__.s = function() {
                        return Math.min.apply(Math, arguments);
                    };
                    __webpack_exports__.q = function() {
                        return Math.max.apply(Math, arguments);
                    };
                    __webpack_exports__.z = function(str, regex, handler) {
                        var results = [];
                        str.replace(regex, function(item) {
                            results.push(handler ? handler.apply(null, arguments) : item);
                        });
                        return results;
                    };
                    __webpack_exports__.H = function(svg) {
                        return "data:image/svg+xml;base64," + base64encode(svg);
                    };
                    __webpack_exports__.u = function(obj) {
                        var filter = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Boolean, result = {};
                        for (var _key4 in obj) obj.hasOwnProperty(_key4) && filter(obj[_key4], _key4) && (result[_key4] = obj[_key4]);
                        return result;
                    };
                    __webpack_exports__.k = function(item) {
                        return item;
                    };
                    __webpack_exports__.A = function(text, regex) {
                        var result = [];
                        text.replace(regex, function(token) {
                            result.push(token);
                            return "";
                        });
                        return result;
                    };
                    __webpack_exports__.y = function(method) {
                        var delay = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50, promise = void 0, timeout = void 0;
                        return function() {
                            timeout && clearTimeout(timeout);
                            var localPromise = promise = promise || new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a();
                            timeout = setTimeout(function() {
                                promise = null;
                                timeout = null;
                                __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(method).then(function(result) {
                                    return localPromise.resolve(result);
                                }, function(err) {
                                    return localPromise.reject(err);
                                });
                            }, delay);
                            return localPromise;
                        };
                    };
                    __webpack_exports__.B = function(method, time) {
                        var timeout = void 0;
                        !function loop() {
                            timeout = setTimeout(function() {
                                method();
                                loop();
                            }, time);
                        }();
                        return {
                            cancel: function() {
                                clearTimeout(timeout);
                            }
                        };
                    };
                    __webpack_exports__.n = isInteger;
                    __webpack_exports__.m = isFloat;
                    __webpack_exports__.C = serializePrimitive;
                    __webpack_exports__.d = deserializePrimitive;
                    __webpack_exports__.f = function dotify(obj) {
                        var prefix = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", newobj = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        prefix = prefix ? prefix + "." : prefix;
                        for (var _key5 in obj) obj.hasOwnProperty(_key5) && void 0 !== obj[_key5] && null !== obj[_key5] && "function" != typeof obj[_key5] && (obj[_key5] && Array.isArray(obj[_key5]) && obj[_key5].length && obj[_key5].every(function(val) {
                            return "object" !== (void 0 === val ? "undefined" : _typeof(val));
                        }) ? newobj["" + prefix + _key5 + "[]"] = obj[_key5].join(",") : obj[_key5] && "object" === _typeof(obj[_key5]) ? newobj = dotify(obj[_key5], "" + prefix + _key5, newobj) : newobj["" + prefix + _key5] = serializePrimitive(obj[_key5]));
                        return newobj;
                    };
                    __webpack_exports__.I = function(obj) {
                        var result = {};
                        for (var _key6 in obj) if (obj.hasOwnProperty(_key6) && "string" == typeof obj[_key6]) {
                            var _value2 = obj[_key6];
                            if (_key6.match(/^.+\[\]$/)) {
                                _key6 = _key6.slice(0, _key6.length - 2);
                                _value2 = _value2.split(",").map(deserializePrimitive);
                            } else _value2 = deserializePrimitive(_value2);
                            for (var keyResult = result, parts = _key6.split("."), i = 0; i < parts.length; i++) {
                                var part = parts[i], isLast = i + 1 === parts.length, isIndex = !isLast && isInteger(parts[i + 1]);
                                isLast ? keyResult[part] = _value2 : keyResult = keyResult[part] = keyResult[part] || (isIndex ? [] : {});
                            }
                        }
                        return result;
                    };
                    var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                        return typeof obj;
                    } : function(obj) {
                        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                    function getGlobal() {
                        if ("undefined" != typeof window) return window;
                        if ("undefined" != typeof global) return global;
                        throw new Error("No global found");
                    }
                    function memoize(method) {
                        var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        if (method.__memoized__) return method.__memoized__;
                        var cache = {};
                        method.__memoized__ = function() {
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                            if (method.__memoized__ && method.__memoized__.__calling__) throw new Error("Can not call memoized method recursively");
                            var key = void 0;
                            try {
                                key = JSON.stringify(Array.prototype.slice.call(arguments));
                            } catch (err) {
                                throw new Error("Arguments not serializable -- can not be used to memoize");
                            }
                            var cacheTime = options.time;
                            cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime && delete cache[key];
                            var glob = getGlobal();
                            glob.__CACHE_START_TIME__ && cache[key] && cache[key].time < glob.__CACHE_START_TIME__ && delete cache[key];
                            if (cache[key]) return cache[key].value;
                            method.__memoized__.__calling__ = !0;
                            var time = Date.now(), value = method.apply(this, arguments);
                            method.__memoized__.__calling__ = !1;
                            cache[key] = {
                                time: time,
                                value: value
                            };
                            return cache[key].value;
                        };
                        method.__memoized__.reset = function() {
                            cache = {};
                        };
                        return method.__memoized__;
                    }
                    function inlineMemoize(method, logic) {
                        var args = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                        method.__memoized__ || (method.__memoized__ = memoize(logic));
                        return method.__memoized__.apply(method, args);
                    }
                    function base64encode(str) {
                        return window.btoa(str);
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
                        return "true" === value || "false" !== value && (isInteger(value) ? parseInt(value, 10) : isFloat(value) ? parseFloat(value) : value);
                    }
                }
            });
        }, module.exports = factory();
        var factory;
    },
    "./node_modules/belter/index.js": function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__("./node_modules/belter/dist/belter.js");
    },
    "./node_modules/belter/src/device.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_exports__.a = function() {
            return !!(window.navigator.mockUserAgent || window.navigator.userAgent).match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i);
        };
    },
    "./node_modules/belter/src/dom.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__("./node_modules/zalgo-promise/src/index.js");
        var util = __webpack_require__("./node_modules/belter/src/util.js"), KEY_CODES = (__webpack_require__("./node_modules/belter/src/device.js"), 
        {
            ENTER: 13
        });
        __webpack_exports__.b = function(selector) {
            var doc = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.document;
            return Array.prototype.slice.call(doc.querySelectorAll(selector));
        };
        __webpack_exports__.a = function(element, handler) {
            element.addEventListener("touchstart", util.e);
            element.addEventListener("click", handler);
            element.addEventListener("keypress", function(event) {
                if (event.keyCode === KEY_CODES.ENTER) return handler(event);
            });
        };
    },
    "./node_modules/belter/src/experiment.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__("./node_modules/belter/src/util.js"), __webpack_require__("./node_modules/belter/src/storage.js");
    },
    "./node_modules/belter/src/global.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__("./node_modules/belter/src/util.js");
    },
    "./node_modules/belter/src/http.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_exports__.a = function(_ref) {
            var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 0 : _ref$timeout;
            return new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a(function(resolve, reject) {
                if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
                for (var normalizedHeaders = {}, _i4 = 0, _Object$keys2 = Object.keys(headers), _length4 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                    var _key2 = _Object$keys2[_i4];
                    normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
                }
                json ? normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/json" : (data || body) && (normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/x-www-form-urlencoded; charset=utf-8");
                normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || "application/json";
                for (var _i6 = 0, _length6 = null == headerBuilders ? 0 : headerBuilders.length; _i6 < _length6; _i6++) for (var builtHeaders = (0, 
                headerBuilders[_i6])(), _i8 = 0, _Object$keys4 = Object.keys(builtHeaders), _length8 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i8 < _length8; _i8++) {
                    var _key3 = _Object$keys4[_i8];
                    normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
                }
                var xhr = new win.XMLHttpRequest();
                xhr.addEventListener("load", function() {
                    var responseHeaders = function() {
                        for (var result = {}, _i2 = 0, _rawHeaders$trim$spli2 = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").trim().split("\n"), _length2 = null == _rawHeaders$trim$spli2 ? 0 : _rawHeaders$trim$spli2.length; _i2 < _length2; _i2++) {
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
                    var res = {
                        status: this.status,
                        headers: responseHeaders,
                        body: responseBody
                    };
                    return resolve(res);
                }, !1);
                xhr.addEventListener("error", function(evt) {
                    reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
                }, !1);
                xhr.open(method, url, !0);
                for (var _key4 in normalizedHeaders) normalizedHeaders.hasOwnProperty(_key4) && xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
                json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map(function(key) {
                    return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
                }).join("&"));
                xhr.timeout = timeout;
                xhr.ontimeout = function() {
                    reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
                };
                xhr.send(body);
            });
        };
        var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), HEADERS = (__webpack_require__("./node_modules/cross-domain-utils/src/index.js"), 
        {
            CONTENT_TYPE: "content-type",
            ACCEPT: "accept"
        }), headerBuilders = [];
    },
    "./node_modules/belter/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__("./node_modules/belter/src/device.js");
        var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__("./node_modules/belter/src/dom.js");
        __webpack_require__.d(__webpack_exports__, "onClick", function() {
            return __WEBPACK_IMPORTED_MODULE_1__dom__.a;
        });
        __webpack_require__.d(__webpack_exports__, "querySelectorAll", function() {
            return __WEBPACK_IMPORTED_MODULE_1__dom__.b;
        });
        __webpack_require__("./node_modules/belter/src/experiment.js"), __webpack_require__("./node_modules/belter/src/global.js"), 
        __webpack_require__("./node_modules/belter/src/jsx.jsx"), __webpack_require__("./node_modules/belter/src/storage.js");
        var __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__("./node_modules/belter/src/util.js");
        __webpack_require__.d(__webpack_exports__, "memoize", function() {
            return __WEBPACK_IMPORTED_MODULE_6__util__.d;
        });
        __webpack_require__.d(__webpack_exports__, "noop", function() {
            return __WEBPACK_IMPORTED_MODULE_6__util__.e;
        });
        var __WEBPACK_IMPORTED_MODULE_7__http__ = __webpack_require__("./node_modules/belter/src/http.js");
        __webpack_require__.d(__webpack_exports__, "request", function() {
            return __WEBPACK_IMPORTED_MODULE_7__http__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_8__types__ = __webpack_require__("./node_modules/belter/src/types.js");
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__types__);
    },
    "./node_modules/belter/src/jsx.jsx": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__("./node_modules/belter/src/util.js"), Object.assign;
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function htmlEncode() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
        }
        !function(_JsxHTMLNode) {
            !function(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                });
                superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }(JsxHTMLNodeContainer, _JsxHTMLNode);
            function JsxHTMLNodeContainer(children) {
                _classCallCheck(this, JsxHTMLNodeContainer);
                return function(self, call) {
                    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !call || "object" != typeof call && "function" != typeof call ? self : call;
                }(this, _JsxHTMLNode.call(this, "", {}, children));
            }
            JsxHTMLNodeContainer.prototype.toString = function() {
                return this.childrenToString();
            };
        }(function() {
            function JsxHTMLNode(name, props, children) {
                _classCallCheck(this, JsxHTMLNode);
                this.name = name;
                this.props = props;
                this.children = children;
            }
            JsxHTMLNode.prototype.toString = function() {
                var name = this.name, props = this.propsToString(), children = this.childrenToString();
                return "<" + name + (props ? " " : "") + props + ">" + children + "</" + name + ">";
            };
            JsxHTMLNode.prototype.propsToString = function() {
                var props = this.props;
                return props ? Object.keys(props).filter(function(key) {
                    return "innerHTML" !== key && props && !1 !== props[key];
                }).map(function(key) {
                    if (props) {
                        var val = props[key];
                        if (!0 === val) return "" + htmlEncode(key);
                        if ("string" == typeof val) return htmlEncode(key) + '="' + htmlEncode(val) + '"';
                    }
                    return "";
                }).filter(Boolean).join(" ") : "";
            };
            JsxHTMLNode.prototype.childrenToString = function() {
                if (this.props && this.props.innerHTML) return this.props.innerHTML;
                if (!this.children) return "";
                var result = "";
                !function iterate(children) {
                    for (var _i2 = 0, _length2 = null == children ? 0 : children.length; _i2 < _length2; _i2++) {
                        var child = children[_i2];
                        null !== child && void 0 !== child && (Array.isArray(child) ? iterate(child) : result += child instanceof JsxHTMLNode ? child.toString() : htmlEncode(child));
                    }
                }(this.children);
                return result;
            };
            return JsxHTMLNode;
        }());
    },
    "./node_modules/belter/src/storage.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_exports__.a = function(_ref) {
            var name = _ref.name, _ref$version = _ref.version, version = void 0 === _ref$version ? "latest" : _ref$version, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 3e5 : _ref$lifetime, STORAGE_KEY = "__" + name + "_" + version + "_storage__", accessedStorage = void 0;
            function getState(handler) {
                var localStorageEnabled = Object(__WEBPACK_IMPORTED_MODULE_0__util__.c)(), storage = void 0;
                accessedStorage && (storage = accessedStorage);
                if (!storage && localStorageEnabled) {
                    var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                    rawStorage && (storage = JSON.parse(rawStorage));
                }
                storage || (storage = Object(__WEBPACK_IMPORTED_MODULE_0__util__.a)()[STORAGE_KEY]);
                storage || (storage = {
                    id: Object(__WEBPACK_IMPORTED_MODULE_0__util__.i)()
                });
                storage.id || (storage.id = Object(__WEBPACK_IMPORTED_MODULE_0__util__.i)());
                accessedStorage = storage;
                var result = handler(storage);
                localStorageEnabled ? window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage)) : Object(__WEBPACK_IMPORTED_MODULE_0__util__.a)()[STORAGE_KEY] = storage;
                accessedStorage = null;
                return result;
            }
            function getSession(handler) {
                return getState(function(storage) {
                    var session = storage.__session__, now = Date.now();
                    session && now - session.created > lifetime && (session = null);
                    session || (session = {
                        guid: Object(__WEBPACK_IMPORTED_MODULE_0__util__.i)(),
                        created: now
                    });
                    storage.__session__ = session;
                    return handler(session);
                });
            }
            return {
                getState: getState,
                getID: function() {
                    return getState(function(storage) {
                        return storage.id;
                    });
                },
                getSessionState: function(handler) {
                    return getSession(function(session) {
                        session.state = session.state || {};
                        return handler(session.state);
                    });
                },
                getSessionID: function() {
                    return getSession(function(session) {
                        return session.guid;
                    });
                }
            };
        };
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/belter/src/util.js");
    },
    "./node_modules/belter/src/types.js": function(module, exports) {},
    "./node_modules/belter/src/util.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_exports__.a = getGlobal;
        __webpack_exports__.d = memoize;
        __webpack_exports__.b = inlineMemoize;
        __webpack_exports__.e = function() {};
        __webpack_exports__.i = function() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            }) + "_" + base64encode(new Date().toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        };
        __webpack_exports__.c = function isLocalStorageEnabled() {
            return inlineMemoize(isLocalStorageEnabled, function() {
                try {
                    if ("undefined" == typeof window) return !1;
                    if (window.localStorage) {
                        var _value = Math.random().toString();
                        window.localStorage.setItem("__test__localStorage__", _value);
                        var result = window.localStorage.getItem("__test__localStorage__");
                        window.localStorage.removeItem("__test__localStorage__");
                        if (_value === result) return !0;
                    }
                } catch (err) {}
                return !1;
            });
        };
        __webpack_exports__.f = function(str, regex, handler) {
            var results = [];
            str.replace(regex, function(item) {
                results.push(handler ? handler.apply(null, arguments) : item);
            });
            return results;
        };
        __webpack_exports__.h = function(svg) {
            return "data:image/svg+xml;base64," + base64encode(svg);
        };
        __webpack_exports__.g = function(text, regex) {
            var result = [];
            text.replace(regex, function(token) {
                result.push(token);
                return "";
            });
            return result;
        };
        __webpack_require__("./node_modules/zalgo-promise/src/index.js"), "function" == typeof Symbol && Symbol.iterator;
        function getGlobal() {
            if ("undefined" != typeof window) return window;
            if ("undefined" != typeof global) return global;
            throw new Error("No global found");
        }
        function memoize(method) {
            var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (method.__memoized__) return method.__memoized__;
            var cache = {};
            method.__memoized__ = function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                if (method.__memoized__ && method.__memoized__.__calling__) throw new Error("Can not call memoized method recursively");
                var key = void 0;
                try {
                    key = JSON.stringify(Array.prototype.slice.call(arguments));
                } catch (err) {
                    throw new Error("Arguments not serializable -- can not be used to memoize");
                }
                var cacheTime = options.time;
                cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime && delete cache[key];
                var glob = getGlobal();
                glob.__CACHE_START_TIME__ && cache[key] && cache[key].time < glob.__CACHE_START_TIME__ && delete cache[key];
                if (cache[key]) return cache[key].value;
                method.__memoized__.__calling__ = !0;
                var time = Date.now(), value = method.apply(this, arguments);
                method.__memoized__.__calling__ = !1;
                cache[key] = {
                    time: time,
                    value: value
                };
                return cache[key].value;
            };
            method.__memoized__.reset = function() {
                cache = {};
            };
            return method.__memoized__;
        }
        function inlineMemoize(method, logic) {
            var args = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            method.__memoized__ || (method.__memoized__ = memoize(logic));
            return method.__memoized__.apply(method, args);
        }
        function base64encode(str) {
            return window.btoa(str);
        }
    },
    "./node_modules/cross-domain-utils/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
        var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types__);
    },
    "./node_modules/cross-domain-utils/src/types.js": function(module, exports) {},
    "./node_modules/cross-domain-utils/src/utils.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
    },
    "./node_modules/zalgo-promise/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
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
        function getGlobal() {
            var glob = void 0;
            if ("undefined" != typeof window) glob = window; else {
                if ("undefined" == typeof global) throw new TypeError("Can not find global");
                glob = global;
            }
            var zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
            zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
            zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
            zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
            zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];
            return zalgoGlobal;
        }
        var promise_ZalgoPromise = function() {
            function ZalgoPromise(handler) {
                var _this = this;
                !function(instance, Constructor) {
                    if (!(instance instanceof ZalgoPromise)) throw new TypeError("Cannot call a class as a function");
                }(this);
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
                    _this2.errorHandled || function(err) {
                        if (-1 === getGlobal().dispatchedErrors.indexOf(err)) {
                            getGlobal().dispatchedErrors.push(err);
                            setTimeout(function() {
                                throw err;
                            }, 1);
                            for (var j = 0; j < getGlobal().possiblyUnhandledPromiseHandlers.length; j++) getGlobal().possiblyUnhandledPromiseHandlers[j](err);
                        }
                    }(error);
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
                    getGlobal().activeCount += 1;
                    for (var _loop = function(i) {
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
                    }, i = 0; i < handlers.length; i++) _loop(i);
                    handlers.length = 0;
                    this.dispatching = !1;
                    getGlobal().activeCount -= 1;
                    0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
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
            ZalgoPromise.prototype.finally = function(onFinally) {
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
                if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                return Promise.resolve(this);
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
                for (var _loop2 = function(i) {
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
                        0 == (count -= 1) && promise.resolve(results);
                    }, function(err) {
                        promise.reject(err);
                    });
                }, i = 0; i < promises.length; i++) _loop2(i);
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
                return function(handler) {
                    getGlobal().possiblyUnhandledPromiseHandlers.push(handler);
                    return {
                        cancel: function() {
                            getGlobal().possiblyUnhandledPromiseHandlers.splice(getGlobal().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                        }
                    };
                }(handler);
            };
            ZalgoPromise.try = function(method, context, args) {
                if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
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
                getGlobal().flushPromises.push(promise);
                0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
                return promise;
            };
            ZalgoPromise.flushQueue = function() {
                var promisesToFlush = getGlobal().flushPromises;
                getGlobal().flushPromises = [];
                for (var _i2 = 0, _length2 = null == promisesToFlush ? 0 : promisesToFlush.length; _i2 < _length2; _i2++) promisesToFlush[_i2].resolve();
            };
            return ZalgoPromise;
        }();
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return promise_ZalgoPromise;
        });
    },
    "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var src = __webpack_require__("./node_modules/belter/src/index.js"), zalgo_promise_src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), belter = __webpack_require__("./node_modules/belter/index.js"), API_URI = {
            AUTH: "/webapps/hermes/api/auth",
            ORDER: "/webapps/hermes/api/order"
        }, HEADERS = {
            CSRF_TOKEN: "x-csrf-jwt"
        }, _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, defaultHeaders = {}, csrfToken = "";
        function callAPI(_ref) {
            var _extends2, url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, json = _ref.json, reqHeaders = _extends({}, defaultHeaders, ((_extends2 = {})[HEADERS.CSRF_TOKEN] = csrfToken, 
            _extends2));
            return Object(src.request)({
                url: url,
                method: method,
                headers: reqHeaders,
                json: json
            }).then(function(_ref2) {
                var status = _ref2.status, resHeaders = _ref2.headers, body = _ref2.body;
                csrfToken = resHeaders[HEADERS.CSRF_TOKEN];
                if ("contingency" === body.ack) throw new Error(body.contingency);
                if (status > 400) throw new Error("Api: " + url + " returned status code: " + status);
                if ("success" !== body.ack) throw new Error("Api: " + url + " returned ack: " + body.ack);
                return body.data;
            });
        }
        var persistAccessToken = Object(src.memoize)(function(accessToken) {
            defaultHeaders["x-paypal-internal-euat"] = accessToken;
            return callAPI({
                url: API_URI.AUTH
            }).then(src.noop);
        }), checkout__extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        function setupButton() {
            if (!window.paypal) throw new Error("PayPal library not loaded");
            Object(src.querySelectorAll)(".paypal-button").forEach(function(button) {
                var fundingSource = button.getAttribute("data-funding-source"), card = button.getAttribute("data-card");
                Object(src.onClick)(button, function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    window.xprops.onClick && window.xprops.onClick({
                        fundingSource: fundingSource,
                        card: card
                    });
                    !function renderCheckout() {
                        var props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, createOrder = Object(belter.memoize)(window.xprops.createOrder);
                        return window.paypal.Checkout.renderTo(window.top, checkout__extends({
                            payment: createOrder,
                            locale: window.xprops.locale,
                            commit: window.xprops.commit,
                            onError: window.xprops.onError,
                            onAuthorize: function(_ref) {
                                var orderID = _ref.orderID, payerID = _ref.payerID, actions = function(checkout, orderID) {
                                    var restartFlow = Object(belter.memoize)(function() {
                                        return checkout.close().then(function() {
                                            window.paypal.Checkout.contexts.iframe = !0;
                                            return renderCheckout({
                                                payment: function() {
                                                    return zalgo_promise_src.a.resolve(orderID);
                                                }
                                            });
                                        }).then(function() {
                                            return new zalgo_promise_src.a(belter.noop);
                                        });
                                    }), handleCaptureError = function(err) {
                                        if (err && "CC_PROCESSOR_DECLINED" === err.message) return restartFlow();
                                        if (err && "INSTRUMENT_DECLINED" === err.message) return restartFlow();
                                        throw new Error("Order could not be captured");
                                    }, orderGet = Object(belter.memoize)(function() {
                                        return function(orderID) {
                                            return callAPI({
                                                url: API_URI.ORDER + "/" + orderID
                                            });
                                        }(orderID);
                                    });
                                    return {
                                        order: {
                                            capture: Object(belter.memoize)(function() {
                                                return function(orderID) {
                                                    return callAPI({
                                                        method: "post",
                                                        url: API_URI.ORDER + "/" + orderID + "/capture"
                                                    });
                                                }(orderID).catch(handleCaptureError).finally(orderGet.reset);
                                            }),
                                            authorize: Object(belter.memoize)(function() {
                                                return function(orderID) {
                                                    return callAPI({
                                                        method: "post",
                                                        url: API_URI.ORDER + "/" + orderID + "/authorize"
                                                    });
                                                }(orderID).catch(handleCaptureError).finally(orderGet.reset);
                                            }),
                                            get: orderGet
                                        },
                                        restart: restartFlow
                                    };
                                }(this, orderID);
                                return window.xprops.onApprove({
                                    orderID: orderID,
                                    payerID: payerID
                                }, actions).catch(function(err) {
                                    return window.xchild.error(err);
                                });
                            },
                            onCancel: function(data) {
                                return zalgo_promise_src.a.try(function() {
                                    return data.orderID || createOrder();
                                }).then(function(orderID) {
                                    return window.xprops.onCancel({
                                        orderID: orderID
                                    });
                                }).catch(function(err) {
                                    return window.xchild.error(err);
                                });
                            },
                            onAuth: function(_ref2) {
                                var accessToken = _ref2.accessToken;
                                return persistAccessToken(accessToken);
                            }
                        }, props));
                    }({
                        fundingSource: fundingSource
                    });
                });
            });
        }
        __webpack_require__.d(__webpack_exports__, "setupButton", function() {
            return setupButton;
        });
    }
});
//# sourceMappingURL=smart-payment-buttons.js.map
//# sourceMappingURL=smart-payment-buttons.js.map