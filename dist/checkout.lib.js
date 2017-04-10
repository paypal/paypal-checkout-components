!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("paypal", [], factory) : "object" == typeof exports ? exports.paypal = factory() : root.paypal = factory();
}(this, function() {
    return function(modules) {
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
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.i = function(value) {
            return value;
        }, __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = "./src/index.js");
    }({
        "./node_modules/Base64/base64.js": function(module, exports, __webpack_require__) {
            !function() {
                function InvalidCharacterError(message) {
                    this.message = message;
                }
                var object = exports, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                InvalidCharacterError.prototype = new Error(), InvalidCharacterError.prototype.name = "InvalidCharacterError", 
                object.btoa || (object.btoa = function(input) {
                    for (var block, charCode, str = String(input), idx = 0, map = chars, output = ""; str.charAt(0 | idx) || (map = "=", 
                    idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
                        if ((charCode = str.charCodeAt(idx += .75)) > 255) throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                        block = block << 8 | charCode;
                    }
                    return output;
                }), object.atob || (object.atob = function(input) {
                    var str = String(input).replace(/=+$/, "");
                    if (str.length % 4 == 1) throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
                    for (var bs, buffer, bc = 0, idx = 0, output = ""; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? 64 * bs + buffer : buffer, 
                    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) buffer = chars.indexOf(buffer);
                    return output;
                });
            }();
        },
        "./node_modules/beaver-logger/client/builders.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
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
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return payloadBuilders;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return metaBuilders;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return trackingBuilders;
            }), __webpack_require__.d(__webpack_exports__, "d", function() {
                return headerBuilders;
            }), __webpack_exports__.e = addPayloadBuilder, __webpack_exports__.f = addMetaBuilder, 
            __webpack_exports__.g = addTrackingBuilder, __webpack_exports__.h = addHeaderBuilder;
            var payloadBuilders = [], metaBuilders = [], trackingBuilders = [], headerBuilders = [];
        },
        "./node_modules/beaver-logger/client/config.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return config;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return logLevels;
            });
            var config = {
                uri: "",
                prefix: "",
                initial_state_name: "init",
                flushInterval: 6e5,
                debounceInterval: 10,
                sizeLimit: 300,
                silent: !1,
                heartbeat: !0,
                heartbeatConsoleLog: !0,
                heartbeatInterval: 5e3,
                heartbeatTooBusy: !1,
                heartbeatTooBusyThreshold: 1e4,
                logLevel: "debug",
                autoLog: [ "warn", "error" ],
                logUnload: !0,
                logUnloadSync: !1,
                logPerformance: !0
            }, logLevels = [ "error", "warn", "info", "debug" ];
        },
        "./node_modules/beaver-logger/client/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__("./node_modules/beaver-logger/client/interface.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.flush;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.logLevels;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.info;
            }), __webpack_require__.d(__webpack_exports__, "d", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.warn;
            }), __webpack_require__.d(__webpack_exports__, "e", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.error;
            }), __webpack_require__.d(__webpack_exports__, "f", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.addPayloadBuilder;
            }), __webpack_require__.d(__webpack_exports__, "g", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.addMetaBuilder;
            }), __webpack_require__.d(__webpack_exports__, "h", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.init;
            }), __webpack_require__.d(__webpack_exports__, "i", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.config;
            }), __webpack_require__.d(__webpack_exports__, "j", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.debug;
            }), __webpack_require__.d(__webpack_exports__, "k", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.prefix;
            });
        },
        "./node_modules/beaver-logger/client/init.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function init(conf) {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__.d)(__WEBPACK_IMPORTED_MODULE_0__config__.a, conf || {}), 
                !initiated) {
                    if (initiated = !0, __WEBPACK_IMPORTED_MODULE_0__config__.a.logPerformance && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__performance__.c)(), 
                    __WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeat && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__performance__.d)(), 
                    __WEBPACK_IMPORTED_MODULE_0__config__.a.logUnload) {
                        var async = !__WEBPACK_IMPORTED_MODULE_0__config__.a.logUnloadSync;
                        window.addEventListener("beforeunload", function() {
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__logger__.i)("window_beforeunload"), 
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__logger__.d)(async);
                        }), window.addEventListener("unload", function() {
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__logger__.i)("window_unload"), 
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__logger__.d)(async);
                        });
                    }
                    __WEBPACK_IMPORTED_MODULE_0__config__.a.flushInterval && setInterval(__WEBPACK_IMPORTED_MODULE_3__logger__.e, __WEBPACK_IMPORTED_MODULE_0__config__.a.flushInterval), 
                    window.beaverLogQueue && (window.beaverLogQueue.forEach(function(payload) {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__logger__.f)(payload.level, payload.event, payload);
                    }), delete window.beaverLogQueue);
                }
            }
            var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./node_modules/beaver-logger/client/config.js"), __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__("./node_modules/beaver-logger/client/util.js"), __WEBPACK_IMPORTED_MODULE_2__performance__ = __webpack_require__("./node_modules/beaver-logger/client/performance.js"), __WEBPACK_IMPORTED_MODULE_3__logger__ = __webpack_require__("./node_modules/beaver-logger/client/logger.js");
            __webpack_exports__.a = init;
            var initiated = !1;
        },
        "./node_modules/beaver-logger/client/interface.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__("./node_modules/beaver-logger/client/logger.js");
            __webpack_require__.d(__webpack_exports__, "buffer", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.a;
            }), __webpack_require__.d(__webpack_exports__, "tracking", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.b;
            }), __webpack_require__.d(__webpack_exports__, "print", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.c;
            }), __webpack_require__.d(__webpack_exports__, "immediateFlush", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.d;
            }), __webpack_require__.d(__webpack_exports__, "flush", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.e;
            }), __webpack_require__.d(__webpack_exports__, "log", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.f;
            }), __webpack_require__.d(__webpack_exports__, "prefix", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.g;
            }), __webpack_require__.d(__webpack_exports__, "debug", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.h;
            }), __webpack_require__.d(__webpack_exports__, "info", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.i;
            }), __webpack_require__.d(__webpack_exports__, "warn", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.j;
            }), __webpack_require__.d(__webpack_exports__, "error", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.k;
            }), __webpack_require__.d(__webpack_exports__, "track", function() {
                return __WEBPACK_IMPORTED_MODULE_0__logger__.l;
            });
            var __WEBPACK_IMPORTED_MODULE_1__init__ = __webpack_require__("./node_modules/beaver-logger/client/init.js");
            __webpack_require__.d(__webpack_exports__, "init", function() {
                return __WEBPACK_IMPORTED_MODULE_1__init__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_2__transitions__ = __webpack_require__("./node_modules/beaver-logger/client/transitions.js");
            __webpack_require__.d(__webpack_exports__, "startTransition", function() {
                return __WEBPACK_IMPORTED_MODULE_2__transitions__.a;
            }), __webpack_require__.d(__webpack_exports__, "endTransition", function() {
                return __WEBPACK_IMPORTED_MODULE_2__transitions__.b;
            }), __webpack_require__.d(__webpack_exports__, "transition", function() {
                return __WEBPACK_IMPORTED_MODULE_2__transitions__.c;
            });
            var __WEBPACK_IMPORTED_MODULE_3__builders__ = __webpack_require__("./node_modules/beaver-logger/client/builders.js");
            __webpack_require__.d(__webpack_exports__, "payloadBuilders", function() {
                return __WEBPACK_IMPORTED_MODULE_3__builders__.a;
            }), __webpack_require__.d(__webpack_exports__, "metaBuilders", function() {
                return __WEBPACK_IMPORTED_MODULE_3__builders__.b;
            }), __webpack_require__.d(__webpack_exports__, "trackingBuilders", function() {
                return __WEBPACK_IMPORTED_MODULE_3__builders__.c;
            }), __webpack_require__.d(__webpack_exports__, "headerBuilders", function() {
                return __WEBPACK_IMPORTED_MODULE_3__builders__.d;
            }), __webpack_require__.d(__webpack_exports__, "addPayloadBuilder", function() {
                return __WEBPACK_IMPORTED_MODULE_3__builders__.e;
            }), __webpack_require__.d(__webpack_exports__, "addMetaBuilder", function() {
                return __WEBPACK_IMPORTED_MODULE_3__builders__.f;
            }), __webpack_require__.d(__webpack_exports__, "addTrackingBuilder", function() {
                return __WEBPACK_IMPORTED_MODULE_3__builders__.g;
            }), __webpack_require__.d(__webpack_exports__, "addHeaderBuilder", function() {
                return __WEBPACK_IMPORTED_MODULE_3__builders__.h;
            });
            var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__("./node_modules/beaver-logger/client/config.js");
            __webpack_require__.d(__webpack_exports__, "config", function() {
                return __WEBPACK_IMPORTED_MODULE_4__config__.a;
            }), __webpack_require__.d(__webpack_exports__, "logLevels", function() {
                return __WEBPACK_IMPORTED_MODULE_4__config__.b;
            });
        },
        "./node_modules/beaver-logger/client/logger.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function print(level, event, payload) {
                if (!loaded) return setTimeout(function() {
                    return print(level, event, payload);
                }, 1);
                if (window.console && window.console.log) {
                    var logLevel = window.LOG_LEVEL || __WEBPACK_IMPORTED_MODULE_2__config__.a.logLevel;
                    if (!(__WEBPACK_IMPORTED_MODULE_2__config__.b.indexOf(level) > __WEBPACK_IMPORTED_MODULE_2__config__.b.indexOf(logLevel))) {
                        payload = payload || {};
                        var args = [ event ];
                        args.push(payload), (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                        try {
                            window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                        } catch (err) {}
                    }
                }
            }
            function immediateFlush() {
                var async = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                if (__WEBPACK_IMPORTED_MODULE_2__config__.a.uri) {
                    var hasBuffer = buffer.length, hasTracking = Object.keys(tracking).length;
                    if (hasBuffer || hasTracking) {
                        hasTracking && print("info", "tracking", tracking);
                        for (var meta = {}, _iterator = __WEBPACK_IMPORTED_MODULE_1__builders__.b, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if (_i = _iterator.next(), _i.done) break;
                                _ref = _i.value;
                            }
                            var builder = _ref;
                            try {
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.d)(meta, builder(), !1);
                            } catch (err) {
                                console.error("Error in custom meta builder:", err.stack || err.toString());
                            }
                        }
                        for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_1__builders__.c, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                            var _ref2;
                            if (_isArray2) {
                                if (_i2 >= _iterator2.length) break;
                                _ref2 = _iterator2[_i2++];
                            } else {
                                if (_i2 = _iterator2.next(), _i2.done) break;
                                _ref2 = _i2.value;
                            }
                            var _builder = _ref2;
                            try {
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.d)(tracking, _builder(), !1);
                            } catch (err) {
                                console.error("Error in custom tracking builder:", err.stack || err.toString());
                            }
                        }
                        for (var headers = {}, _iterator3 = __WEBPACK_IMPORTED_MODULE_1__builders__.d, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                            var _ref3;
                            if (_isArray3) {
                                if (_i3 >= _iterator3.length) break;
                                _ref3 = _iterator3[_i3++];
                            } else {
                                if (_i3 = _iterator3.next(), _i3.done) break;
                                _ref3 = _i3.value;
                            }
                            var _builder2 = _ref3;
                            try {
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.d)(headers, _builder2(), !1);
                            } catch (err) {
                                console.error("Error in custom header builder:", err.stack || err.toString());
                            }
                        }
                        var events = buffer, req = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.e)("post", __WEBPACK_IMPORTED_MODULE_2__config__.a.uri, headers, {
                            events: events,
                            meta: meta,
                            tracking: tracking
                        }, async);
                        return buffer = [], tracking = {}, req;
                    }
                }
            }
            function enqueue(level, event, payload) {
                buffer.push({
                    level: level,
                    event: event,
                    payload: payload
                }), __WEBPACK_IMPORTED_MODULE_2__config__.a.autoLog.indexOf(level) > -1 && _flush();
            }
            function log(level, event, payload) {
                __WEBPACK_IMPORTED_MODULE_2__config__.a.prefix && (event = __WEBPACK_IMPORTED_MODULE_2__config__.a.prefix + "_" + event), 
                payload = payload || {}, "string" == typeof payload ? payload = {
                    message: payload
                } : payload instanceof Error && (payload = {
                    error: payload.stack || payload.toString()
                }), payload.timestamp = Date.now();
                for (var _iterator4 = __WEBPACK_IMPORTED_MODULE_1__builders__.a, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref4;
                    if (_isArray4) {
                        if (_i4 >= _iterator4.length) break;
                        _ref4 = _iterator4[_i4++];
                    } else {
                        if (_i4 = _iterator4.next(), _i4.done) break;
                        _ref4 = _i4.value;
                    }
                    var builder = _ref4;
                    try {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.d)(payload, builder(), !1);
                    } catch (err) {
                        console.error("Error in custom payload builder:", err.stack || err.toString());
                    }
                }
                __WEBPACK_IMPORTED_MODULE_2__config__.a.silent || print(level, event, payload), 
                buffer.length === __WEBPACK_IMPORTED_MODULE_2__config__.a.sizeLimit ? enqueue("info", "logger_max_buffer_length") : buffer.length < __WEBPACK_IMPORTED_MODULE_2__config__.a.sizeLimit && enqueue(level, event, payload);
            }
            function prefix(name) {
                return {
                    debug: function(event, payload) {
                        return log("debug", name + "_" + event, payload);
                    },
                    info: function(event, payload) {
                        return log("info", name + "_" + event, payload);
                    },
                    warn: function(event, payload) {
                        return log("warn", name + "_" + event, payload);
                    },
                    error: function(event, payload) {
                        return log("error", name + "_" + event, payload);
                    },
                    flush: function() {
                        return _flush();
                    }
                };
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
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.d)(tracking, payload || {}, !1);
            }
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/beaver-logger/client/util.js"), __WEBPACK_IMPORTED_MODULE_1__builders__ = __webpack_require__("./node_modules/beaver-logger/client/builders.js"), __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__("./node_modules/beaver-logger/client/config.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return buffer;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return tracking;
            }), __webpack_exports__.c = print, __webpack_exports__.d = immediateFlush, __webpack_require__.d(__webpack_exports__, "e", function() {
                return _flush;
            }), __webpack_exports__.f = log, __webpack_exports__.g = prefix, __webpack_exports__.h = debug, 
            __webpack_exports__.i = info, __webpack_exports__.j = warn, __webpack_exports__.k = error, 
            __webpack_exports__.l = track;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, buffer = [], tracking = {};
            Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
                console[method] = this.bind(console[method], console);
            }, Function.prototype.call);
            var loaded = !1;
            setTimeout(function() {
                loaded = !0;
            }, 1);
            var _flush = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.f)(immediateFlush, __WEBPACK_IMPORTED_MODULE_2__config__.a.debounceInterval);
        },
        "./node_modules/beaver-logger/client/performance.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function now() {
                return enablePerformance ? performance.now() : Date.now();
            }
            function timer(startTime) {
                return startTime = void 0 !== startTime ? startTime : now(), {
                    startTime: startTime,
                    elapsed: function() {
                        return parseInt(now() - startTime, 10);
                    },
                    reset: function() {
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
            function initHeartBeat() {
                var heartBeatTimer = timer(), heartbeatCount = 0;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.b)(function() {
                    if (!(__WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatMaxThreshold && heartbeatCount > __WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatMaxThreshold)) {
                        heartbeatCount += 1;
                        var elapsed = heartBeatTimer.elapsed(), lag = elapsed - __WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatInterval, heartbeatPayload = {
                            count: heartbeatCount,
                            elapsed: elapsed
                        };
                        __WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatTooBusy && (heartbeatPayload.lag = lag, 
                        lag >= __WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatTooBusyThreshold && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.i)("toobusy", heartbeatPayload, {
                            noConsole: !__WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatConsoleLog
                        })), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.i)("heartbeat", heartbeatPayload, {
                            noConsole: !__WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatConsoleLog
                        });
                    }
                }, __WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatInterval);
            }
            function initPerformance() {
                if (!enablePerformance) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.i)("no_performance_data");
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__builders__.e)(function() {
                    var payload = {};
                    return payload.client_elapsed = clientTimer.elapsed(), enablePerformance && (payload.req_elapsed = reqTimer.elapsed()), 
                    payload;
                }), __WEBPACK_IMPORTED_MODULE_3__util__.c.then(function() {
                    var keys = [ "connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart" ], timing = {};
                    keys.forEach(function(key) {
                        timing[key] = parseInt(window.performance.timing[key], 10) || 0;
                    });
                    var offset = timing.connectEnd - timing.navigationStart;
                    timing.connectEnd && Object.keys(timing).forEach(function(name) {
                        var time = timing[name];
                        time && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.i)("timing_" + name, {
                            client_elapsed: parseInt(time - timing.connectEnd - (clientTimer.startTime - offset), 10),
                            req_elapsed: parseInt(time - timing.connectEnd, 10)
                        });
                    }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.i)("timing", timing), 
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.i)("memory", window.performance.memory), 
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.i)("navigation", window.performance.navigation), 
                    window.performance.getEntries && window.performance.getEntries().forEach(function(resource) {
                        [ "link", "script", "img", "css" ].indexOf(resource.initiatorType) > -1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.i)(resource.initiatorType, resource);
                    });
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./node_modules/beaver-logger/client/config.js"), __WEBPACK_IMPORTED_MODULE_1__logger__ = __webpack_require__("./node_modules/beaver-logger/client/logger.js"), __WEBPACK_IMPORTED_MODULE_2__builders__ = __webpack_require__("./node_modules/beaver-logger/client/builders.js"), __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__("./node_modules/beaver-logger/client/util.js");
            __webpack_exports__.a = now, __webpack_exports__.b = reqStartElapsed, __webpack_exports__.d = initHeartBeat, 
            __webpack_exports__.c = initPerformance;
            var enablePerformance = window && window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0, clientTimer = timer(), reqTimer = timer(reqStartElapsed());
        },
        "./node_modules/beaver-logger/client/transitions.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function startTransition() {
                startTime = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__performance__.a)();
            }
            function endTransition(toState) {
                startTime = startTime || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__performance__.b)();
                var currentTime = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__performance__.a)(), elapsedTime = void 0;
                void 0 !== startTime && (elapsedTime = parseInt(currentTime - startTime, 0));
                var transitionName = "transition_" + currentState + "_to_" + toState;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.i)(transitionName, {
                    duration: elapsedTime
                }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.l)({
                    transition: transitionName,
                    transition_time: elapsedTime
                }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.d)(), startTime = currentTime, 
                currentState = toState, pageID = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.a)();
            }
            function transition(toState) {
                startTransition(), endTransition(toState);
            }
            var __WEBPACK_IMPORTED_MODULE_0__performance__ = __webpack_require__("./node_modules/beaver-logger/client/performance.js"), __WEBPACK_IMPORTED_MODULE_1__logger__ = __webpack_require__("./node_modules/beaver-logger/client/logger.js"), __WEBPACK_IMPORTED_MODULE_2__builders__ = __webpack_require__("./node_modules/beaver-logger/client/builders.js"), __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__("./node_modules/beaver-logger/client/util.js"), __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__("./node_modules/beaver-logger/client/config.js");
            __webpack_exports__.a = startTransition, __webpack_exports__.b = endTransition, 
            __webpack_exports__.c = transition;
            var windowID = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.a)(), pageID = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.a)(), currentState = __WEBPACK_IMPORTED_MODULE_4__config__.a.initial_state_name, startTime = void 0;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__builders__.e)(function() {
                return {
                    windowID: windowID,
                    pageID: pageID
                };
            }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__builders__.f)(function() {
                return {
                    state: "ui_" + currentState
                };
            });
        },
        "./node_modules/beaver-logger/client/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function extend(dest, src) {
                var over = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                dest = dest || {}, src = src || {};
                for (var i in src) src.hasOwnProperty(i) && (!over && dest.hasOwnProperty(i) || (dest[i] = src[i]));
                return dest;
            }
            function isSameProtocol(url) {
                return window.location.protocol === url.split("/")[0];
            }
            function isSameDomain(url) {
                var match = url.match(/https?:\/\/[^\/]+/);
                return !match || match[0] === window.location.protocol + "//" + window.location.host;
            }
            function ajax(method, url) {
                var headers = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, data = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, async = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
                return new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(function(resolve) {
                    var XRequest = window.XMLHttpRequest || window.ActiveXObject;
                    if (window.XDomainRequest && !isSameDomain(url)) {
                        if (!isSameProtocol(url)) return resolve();
                        XRequest = window.XDomainRequest;
                    }
                    var req = new XRequest("MSXML2.XMLHTTP.3.0");
                    req.open(method.toUpperCase(), url, async), req.setRequestHeader("X-Requested-With", "XMLHttpRequest"), 
                    req.setRequestHeader("Content-type", "application/json");
                    for (var headerName in headers) headers.hasOwnProperty(headerName) && req.setRequestHeader(headerName, headers[headerName]);
                    req.onreadystatechange = function() {
                        req.readyState > 3 && resolve();
                    }, req.send(JSON.stringify(data).replace(/&/g, "%26"));
                });
            }
            function promiseDebounce(method, interval) {
                var debounce = {};
                return function() {
                    var args = arguments;
                    return debounce.timeout && (clearTimeout(debounce.timeout), delete debounce.timeout), 
                    debounce.timeout = setTimeout(function() {
                        var resolver = debounce.resolver, rejector = debounce.rejector;
                        return delete debounce.promise, delete debounce.resolver, delete debounce.rejector, 
                        delete debounce.timeout, __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.resolve().then(function() {
                            return method.apply(null, args);
                        }).then(resolver, rejector);
                    }, interval), debounce.promise = debounce.promise || new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(function(resolver, rejector) {
                        debounce.resolver = resolver, debounce.rejector = rejector;
                    }), debounce.promise;
                };
            }
            function safeInterval(method, time) {
                function loop() {
                    timeout = setTimeout(function() {
                        method(), loop();
                    }, time);
                }
                var timeout = void 0;
                return loop(), {
                    cancel: function() {
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
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js");
            __webpack_exports__.d = extend, __webpack_exports__.e = ajax, __webpack_exports__.f = promiseDebounce, 
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return windowReady;
            }), __webpack_exports__.b = safeInterval, __webpack_exports__.a = uniqueID;
            var windowReady = new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(function(resolve) {
                "complete" === document.readyState && resolve(), window.addEventListener("load", resolve);
            });
        },
        "./node_modules/d/auto-bind.js": function(module, exports, __webpack_require__) {
            "use strict";
            var define, copy = __webpack_require__("./node_modules/es5-ext/object/copy.js"), normalizeOptions = __webpack_require__("./node_modules/es5-ext/object/normalize-options.js"), ensureCallable = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js"), map = __webpack_require__("./node_modules/es5-ext/object/map.js"), callable = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js"), validValue = __webpack_require__("./node_modules/es5-ext/object/valid-value.js"), bind = Function.prototype.bind, defineProperty = Object.defineProperty, hasOwnProperty = Object.prototype.hasOwnProperty;
            define = function(name, desc, options) {
                var dgs, value = validValue(desc) && callable(desc.value);
                return dgs = copy(desc), delete dgs.writable, delete dgs.value, dgs.get = function() {
                    return !options.overwriteDefinition && hasOwnProperty.call(this, name) ? value : (desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this), 
                    defineProperty(this, name, desc), this[name]);
                }, dgs;
            }, module.exports = function(props) {
                var options = normalizeOptions(arguments[1]);
                return null != options.resolveContext && ensureCallable(options.resolveContext), 
                map(props, function(desc, name) {
                    return define(name, desc, options);
                });
            };
        },
        "./node_modules/d/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            var d, assign = __webpack_require__("./node_modules/es5-ext/object/assign/index.js"), normalizeOpts = __webpack_require__("./node_modules/es5-ext/object/normalize-options.js"), isCallable = __webpack_require__("./node_modules/es5-ext/object/is-callable.js"), contains = __webpack_require__("./node_modules/es5-ext/string/#/contains/index.js");
            d = module.exports = function(dscr, value) {
                var c, e, w, options, desc;
                return arguments.length < 2 || "string" != typeof dscr ? (options = value, value = dscr, 
                dscr = null) : options = arguments[2], null == dscr ? (c = w = !0, e = !1) : (c = contains.call(dscr, "c"), 
                e = contains.call(dscr, "e"), w = contains.call(dscr, "w")), desc = {
                    value: value,
                    configurable: c,
                    enumerable: e,
                    writable: w
                }, options ? assign(normalizeOpts(options), desc) : desc;
            }, d.gs = function(dscr, get, set) {
                var c, e, options, desc;
                return "string" != typeof dscr ? (options = set, set = get, get = dscr, dscr = null) : options = arguments[3], 
                null == get ? get = void 0 : isCallable(get) ? null == set ? set = void 0 : isCallable(set) || (options = set, 
                set = void 0) : (options = get, get = set = void 0), null == dscr ? (c = !0, e = !1) : (c = contains.call(dscr, "c"), 
                e = contains.call(dscr, "e")), desc = {
                    get: get,
                    set: set,
                    configurable: c,
                    enumerable: e
                }, options ? assign(normalizeOpts(options), desc) : desc;
            };
        },
        "./node_modules/es5-ext/array/#/clear.js": function(module, exports, __webpack_require__) {
            "use strict";
            var value = __webpack_require__("./node_modules/es5-ext/object/valid-value.js");
            module.exports = function() {
                return value(this).length = 0, this;
            };
        },
        "./node_modules/es5-ext/object/_iterate.js": function(module, exports, __webpack_require__) {
            "use strict";
            var callable = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js"), value = __webpack_require__("./node_modules/es5-ext/object/valid-value.js"), bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys, propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
            module.exports = function(method, defVal) {
                return function(obj, cb) {
                    var list, thisArg = arguments[2], compareFn = arguments[3];
                    return obj = Object(value(obj)), callable(cb), list = keys(obj), compareFn && list.sort("function" == typeof compareFn ? bind.call(compareFn, obj) : void 0), 
                    "function" != typeof method && (method = list[method]), call.call(method, list, function(key, index) {
                        return propertyIsEnumerable.call(obj, key) ? call.call(cb, thisArg, obj[key], key, obj, index) : defVal;
                    });
                };
            };
        },
        "./node_modules/es5-ext/object/assign/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = __webpack_require__("./node_modules/es5-ext/object/assign/is-implemented.js")() ? Object.assign : __webpack_require__("./node_modules/es5-ext/object/assign/shim.js");
        },
        "./node_modules/es5-ext/object/assign/is-implemented.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = function() {
                var obj, assign = Object.assign;
                return "function" == typeof assign && (obj = {
                    foo: "raz"
                }, assign(obj, {
                    bar: "dwa"
                }, {
                    trzy: "trzy"
                }), obj.foo + obj.bar + obj.trzy === "razdwatrzy");
            };
        },
        "./node_modules/es5-ext/object/assign/shim.js": function(module, exports, __webpack_require__) {
            "use strict";
            var keys = __webpack_require__("./node_modules/es5-ext/object/keys/index.js"), value = __webpack_require__("./node_modules/es5-ext/object/valid-value.js"), max = Math.max;
            module.exports = function(dest, src) {
                var error, i, assign, l = max(arguments.length, 2);
                for (dest = Object(value(dest)), assign = function(key) {
                    try {
                        dest[key] = src[key];
                    } catch (e) {
                        error || (error = e);
                    }
                }, i = 1; i < l; ++i) src = arguments[i], keys(src).forEach(assign);
                if (void 0 !== error) throw error;
                return dest;
            };
        },
        "./node_modules/es5-ext/object/copy.js": function(module, exports, __webpack_require__) {
            "use strict";
            var assign = __webpack_require__("./node_modules/es5-ext/object/assign/index.js"), value = __webpack_require__("./node_modules/es5-ext/object/valid-value.js");
            module.exports = function(obj) {
                var copy = Object(value(obj));
                return copy !== obj ? copy : assign({}, obj);
            };
        },
        "./node_modules/es5-ext/object/create.js": function(module, exports, __webpack_require__) {
            "use strict";
            var shim, create = Object.create;
            __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/is-implemented.js")() || (shim = __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/shim.js")), 
            module.exports = function() {
                var nullObject, props, desc;
                return shim ? 1 !== shim.level ? create : (nullObject = {}, props = {}, desc = {
                    configurable: !1,
                    enumerable: !1,
                    writable: !0,
                    value: void 0
                }, Object.getOwnPropertyNames(Object.prototype).forEach(function(name) {
                    if ("__proto__" === name) return void (props[name] = {
                        configurable: !0,
                        enumerable: !1,
                        writable: !0,
                        value: void 0
                    });
                    props[name] = desc;
                }), Object.defineProperties(nullObject, props), Object.defineProperty(shim, "nullPolyfill", {
                    configurable: !1,
                    enumerable: !1,
                    writable: !1,
                    value: nullObject
                }), function(prototype, props) {
                    return create(null === prototype ? nullObject : prototype, props);
                }) : create;
            }();
        },
        "./node_modules/es5-ext/object/for-each.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = __webpack_require__("./node_modules/es5-ext/object/_iterate.js")("forEach");
        },
        "./node_modules/es5-ext/object/is-callable.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = function(obj) {
                return "function" == typeof obj;
            };
        },
        "./node_modules/es5-ext/object/is-object.js": function(module, exports, __webpack_require__) {
            "use strict";
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, map = {
                function: !0,
                object: !0
            };
            module.exports = function(x) {
                return null != x && map[void 0 === x ? "undefined" : _typeof(x)] || !1;
            };
        },
        "./node_modules/es5-ext/object/keys/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = __webpack_require__("./node_modules/es5-ext/object/keys/is-implemented.js")() ? Object.keys : __webpack_require__("./node_modules/es5-ext/object/keys/shim.js");
        },
        "./node_modules/es5-ext/object/keys/is-implemented.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = function() {
                try {
                    return Object.keys("primitive"), !0;
                } catch (e) {
                    return !1;
                }
            };
        },
        "./node_modules/es5-ext/object/keys/shim.js": function(module, exports, __webpack_require__) {
            "use strict";
            var keys = Object.keys;
            module.exports = function(object) {
                return keys(null == object ? object : Object(object));
            };
        },
        "./node_modules/es5-ext/object/map.js": function(module, exports, __webpack_require__) {
            "use strict";
            var callable = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js"), forEach = __webpack_require__("./node_modules/es5-ext/object/for-each.js"), call = Function.prototype.call;
            module.exports = function(obj, cb) {
                var o = {}, thisArg = arguments[2];
                return callable(cb), forEach(obj, function(value, key, obj, index) {
                    o[key] = call.call(cb, thisArg, value, key, obj, index);
                }), o;
            };
        },
        "./node_modules/es5-ext/object/normalize-options.js": function(module, exports, __webpack_require__) {
            "use strict";
            var forEach = Array.prototype.forEach, create = Object.create, process = function(src, obj) {
                var key;
                for (key in src) obj[key] = src[key];
            };
            module.exports = function(options) {
                var result = create(null);
                return forEach.call(arguments, function(options) {
                    null != options && process(Object(options), result);
                }), result;
            };
        },
        "./node_modules/es5-ext/object/set-prototype-of/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/is-implemented.js")() ? Object.setPrototypeOf : __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/shim.js");
        },
        "./node_modules/es5-ext/object/set-prototype-of/is-implemented.js": function(module, exports, __webpack_require__) {
            "use strict";
            var create = Object.create, getPrototypeOf = Object.getPrototypeOf, x = {};
            module.exports = function() {
                var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
                return "function" == typeof setPrototypeOf && getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
            };
        },
        "./node_modules/es5-ext/object/set-prototype-of/shim.js": function(module, exports, __webpack_require__) {
            "use strict";
            var validate, isObject = __webpack_require__("./node_modules/es5-ext/object/is-object.js"), value = __webpack_require__("./node_modules/es5-ext/object/valid-value.js"), isPrototypeOf = Object.prototype.isPrototypeOf, defineProperty = Object.defineProperty, nullDesc = {
                configurable: !0,
                enumerable: !1,
                writable: !0,
                value: void 0
            };
            validate = function(obj, prototype) {
                if (value(obj), null === prototype || isObject(prototype)) return obj;
                throw new TypeError("Prototype must be null or an object");
            }, module.exports = function(status) {
                var fn, set;
                return status ? (2 === status.level ? status.set ? (set = status.set, fn = function(obj, prototype) {
                    return set.call(validate(obj, prototype), prototype), obj;
                }) : fn = function(obj, prototype) {
                    return validate(obj, prototype).__proto__ = prototype, obj;
                } : fn = function self(obj, prototype) {
                    var isNullBase;
                    return validate(obj, prototype), isNullBase = isPrototypeOf.call(self.nullPolyfill, obj), 
                    isNullBase && delete self.nullPolyfill.__proto__, null === prototype && (prototype = self.nullPolyfill), 
                    obj.__proto__ = prototype, isNullBase && defineProperty(self.nullPolyfill, "__proto__", nullDesc), 
                    obj;
                }, Object.defineProperty(fn, "level", {
                    configurable: !1,
                    enumerable: !1,
                    writable: !1,
                    value: status.level
                })) : null;
            }(function() {
                var set, x = Object.create(null), y = {}, desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");
                if (desc) {
                    try {
                        set = desc.set, set.call(x, y);
                    } catch (ignore) {}
                    if (Object.getPrototypeOf(x) === y) return {
                        set: set,
                        level: 2
                    };
                }
                return x.__proto__ = y, Object.getPrototypeOf(x) === y ? {
                    level: 2
                } : (x = {}, x.__proto__ = y, Object.getPrototypeOf(x) === y && {
                    level: 1
                });
            }()), __webpack_require__("./node_modules/es5-ext/object/create.js");
        },
        "./node_modules/es5-ext/object/valid-callable.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = function(fn) {
                if ("function" != typeof fn) throw new TypeError(fn + " is not a function");
                return fn;
            };
        },
        "./node_modules/es5-ext/object/valid-value.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = function(value) {
                if (null == value) throw new TypeError("Cannot use null or undefined");
                return value;
            };
        },
        "./node_modules/es5-ext/string/#/contains/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = __webpack_require__("./node_modules/es5-ext/string/#/contains/is-implemented.js")() ? String.prototype.contains : __webpack_require__("./node_modules/es5-ext/string/#/contains/shim.js");
        },
        "./node_modules/es5-ext/string/#/contains/is-implemented.js": function(module, exports, __webpack_require__) {
            "use strict";
            var str = "razdwatrzy";
            module.exports = function() {
                return "function" == typeof str.contains && (str.contains("dwa") === !0 && str.contains("foo") === !1);
            };
        },
        "./node_modules/es5-ext/string/#/contains/shim.js": function(module, exports, __webpack_require__) {
            "use strict";
            var indexOf = String.prototype.indexOf;
            module.exports = function(searchString) {
                return indexOf.call(this, searchString, arguments[1]) > -1;
            };
        },
        "./node_modules/es6-iterator/array.js": function(module, exports, __webpack_require__) {
            "use strict";
            var ArrayIterator, setPrototypeOf = __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/index.js"), contains = __webpack_require__("./node_modules/es5-ext/string/#/contains/index.js"), d = __webpack_require__("./node_modules/d/index.js"), Iterator = __webpack_require__("./node_modules/es6-iterator/index.js"), defineProperty = Object.defineProperty;
            ArrayIterator = module.exports = function(arr, kind) {
                if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
                Iterator.call(this, arr), kind = kind ? contains.call(kind, "key+value") ? "key+value" : contains.call(kind, "key") ? "key" : "value" : "value", 
                defineProperty(this, "__kind__", d("", kind));
            }, setPrototypeOf && setPrototypeOf(ArrayIterator, Iterator), ArrayIterator.prototype = Object.create(Iterator.prototype, {
                constructor: d(ArrayIterator),
                _resolve: d(function(i) {
                    return "value" === this.__kind__ ? this.__list__[i] : "key+value" === this.__kind__ ? [ i, this.__list__[i] ] : i;
                }),
                toString: d(function() {
                    return "[object Array Iterator]";
                })
            });
        },
        "./node_modules/es6-iterator/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            var _Iterator, clear = __webpack_require__("./node_modules/es5-ext/array/#/clear.js"), assign = __webpack_require__("./node_modules/es5-ext/object/assign/index.js"), callable = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js"), value = __webpack_require__("./node_modules/es5-ext/object/valid-value.js"), d = __webpack_require__("./node_modules/d/index.js"), autoBind = __webpack_require__("./node_modules/d/auto-bind.js"), _Symbol = __webpack_require__("./node_modules/es6-symbol/index.js"), defineProperty = Object.defineProperty, defineProperties = Object.defineProperties;
            module.exports = _Iterator = function(list, context) {
                if (!(this instanceof _Iterator)) return new _Iterator(list, context);
                defineProperties(this, {
                    __list__: d("w", value(list)),
                    __context__: d("w", context),
                    __nextIndex__: d("w", 0)
                }), context && (callable(context.on), context.on("_add", this._onAdd), context.on("_delete", this._onDelete), 
                context.on("_clear", this._onClear));
            }, defineProperties(_Iterator.prototype, assign({
                constructor: d(_Iterator),
                _next: d(function() {
                    var i;
                    if (this.__list__) return this.__redo__ && void 0 !== (i = this.__redo__.shift()) ? i : this.__nextIndex__ < this.__list__.length ? this.__nextIndex__++ : void this._unBind();
                }),
                next: d(function() {
                    return this._createResult(this._next());
                }),
                _createResult: d(function(i) {
                    return void 0 === i ? {
                        done: !0,
                        value: void 0
                    } : {
                        done: !1,
                        value: this._resolve(i)
                    };
                }),
                _resolve: d(function(i) {
                    return this.__list__[i];
                }),
                _unBind: d(function() {
                    this.__list__ = null, delete this.__redo__, this.__context__ && (this.__context__.off("_add", this._onAdd), 
                    this.__context__.off("_delete", this._onDelete), this.__context__.off("_clear", this._onClear), 
                    this.__context__ = null);
                }),
                toString: d(function() {
                    return "[object Iterator]";
                })
            }, autoBind({
                _onAdd: d(function(index) {
                    if (!(index >= this.__nextIndex__)) {
                        if (++this.__nextIndex__, !this.__redo__) return void defineProperty(this, "__redo__", d("c", [ index ]));
                        this.__redo__.forEach(function(redo, i) {
                            redo >= index && (this.__redo__[i] = ++redo);
                        }, this), this.__redo__.push(index);
                    }
                }),
                _onDelete: d(function(index) {
                    var i;
                    index >= this.__nextIndex__ || (--this.__nextIndex__, this.__redo__ && (i = this.__redo__.indexOf(index), 
                    i !== -1 && this.__redo__.splice(i, 1), this.__redo__.forEach(function(redo, i) {
                        redo > index && (this.__redo__[i] = --redo);
                    }, this)));
                }),
                _onClear: d(function() {
                    this.__redo__ && clear.call(this.__redo__), this.__nextIndex__ = 0;
                })
            }))), defineProperty(_Iterator.prototype, _Symbol.iterator, d(function() {
                return this;
            })), defineProperty(_Iterator.prototype, _Symbol.toStringTag, d("", "Iterator"));
        },
        "./node_modules/es6-symbol/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = __webpack_require__("./node_modules/es6-symbol/is-implemented.js")() ? Symbol : __webpack_require__("./node_modules/es6-symbol/polyfill.js");
        },
        "./node_modules/es6-symbol/is-implemented.js": function(module, exports, __webpack_require__) {
            "use strict";
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, validTypes = {
                object: !0,
                symbol: !0
            };
            module.exports = function() {
                var symbol;
                if ("function" != typeof Symbol) return !1;
                symbol = Symbol("test symbol");
                try {
                    String(symbol);
                } catch (e) {
                    return !1;
                }
                return !!validTypes[_typeof(Symbol.iterator)] && (!!validTypes[_typeof(Symbol.toPrimitive)] && !!validTypes[_typeof(Symbol.toStringTag)]);
            };
        },
        "./node_modules/es6-symbol/is-symbol.js": function(module, exports, __webpack_require__) {
            "use strict";
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            module.exports = function(x) {
                return !!x && ("symbol" === (void 0 === x ? "undefined" : _typeof(x)) || !!x.constructor && ("Symbol" === x.constructor.name && "Symbol" === x[x.constructor.toStringTag]));
            };
        },
        "./node_modules/es6-symbol/polyfill.js": function(module, exports, __webpack_require__) {
            "use strict";
            var NativeSymbol, SymbolPolyfill, HiddenSymbol, isNativeSafe, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, d = __webpack_require__("./node_modules/d/index.js"), validateSymbol = __webpack_require__("./node_modules/es6-symbol/validate-symbol.js"), create = Object.create, defineProperties = Object.defineProperties, defineProperty = Object.defineProperty, objPrototype = Object.prototype, globalSymbols = create(null);
            if ("function" == typeof Symbol) {
                NativeSymbol = Symbol;
                try {
                    String(NativeSymbol()), isNativeSafe = !0;
                } catch (ignore) {}
            }
            var generateName = function() {
                var created = create(null);
                return function(desc) {
                    for (var name, ie11BugWorkaround, postfix = 0; created[desc + (postfix || "")]; ) ++postfix;
                    return desc += postfix || "", created[desc] = !0, name = "@@" + desc, defineProperty(objPrototype, name, d.gs(null, function(value) {
                        ie11BugWorkaround || (ie11BugWorkaround = !0, defineProperty(this, name, d(value)), 
                        ie11BugWorkaround = !1);
                    })), name;
                };
            }();
            HiddenSymbol = function(description) {
                if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");
                return SymbolPolyfill(description);
            }, module.exports = SymbolPolyfill = function _Symbol2(description) {
                var symbol;
                if (this instanceof _Symbol2) throw new TypeError("Symbol is not a constructor");
                return isNativeSafe ? NativeSymbol(description) : (symbol = create(HiddenSymbol.prototype), 
                description = void 0 === description ? "" : String(description), defineProperties(symbol, {
                    __description__: d("", description),
                    __name__: d("", generateName(description))
                }));
            }, defineProperties(SymbolPolyfill, {
                for: d(function(key) {
                    return globalSymbols[key] ? globalSymbols[key] : globalSymbols[key] = SymbolPolyfill(String(key));
                }),
                keyFor: d(function(s) {
                    var key;
                    validateSymbol(s);
                    for (key in globalSymbols) if (globalSymbols[key] === s) return key;
                }),
                hasInstance: d("", NativeSymbol && NativeSymbol.hasInstance || SymbolPolyfill("hasInstance")),
                isConcatSpreadable: d("", NativeSymbol && NativeSymbol.isConcatSpreadable || SymbolPolyfill("isConcatSpreadable")),
                iterator: d("", NativeSymbol && NativeSymbol.iterator || SymbolPolyfill("iterator")),
                match: d("", NativeSymbol && NativeSymbol.match || SymbolPolyfill("match")),
                replace: d("", NativeSymbol && NativeSymbol.replace || SymbolPolyfill("replace")),
                search: d("", NativeSymbol && NativeSymbol.search || SymbolPolyfill("search")),
                species: d("", NativeSymbol && NativeSymbol.species || SymbolPolyfill("species")),
                split: d("", NativeSymbol && NativeSymbol.split || SymbolPolyfill("split")),
                toPrimitive: d("", NativeSymbol && NativeSymbol.toPrimitive || SymbolPolyfill("toPrimitive")),
                toStringTag: d("", NativeSymbol && NativeSymbol.toStringTag || SymbolPolyfill("toStringTag")),
                unscopables: d("", NativeSymbol && NativeSymbol.unscopables || SymbolPolyfill("unscopables"))
            }), defineProperties(HiddenSymbol.prototype, {
                constructor: d(SymbolPolyfill),
                toString: d("", function() {
                    return this.__name__;
                })
            }), defineProperties(SymbolPolyfill.prototype, {
                toString: d(function() {
                    return "Symbol (" + validateSymbol(this).__description__ + ")";
                }),
                valueOf: d(function() {
                    return validateSymbol(this);
                })
            }), defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d("", function() {
                var symbol = validateSymbol(this);
                return "symbol" === (void 0 === symbol ? "undefined" : _typeof(symbol)) ? symbol : symbol.toString();
            })), defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol")), 
            defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag, d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])), 
            defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive, d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));
        },
        "./node_modules/es6-symbol/validate-symbol.js": function(module, exports, __webpack_require__) {
            "use strict";
            var isSymbol = __webpack_require__("./node_modules/es6-symbol/is-symbol.js");
            module.exports = function(value) {
                if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
                return value;
            };
        },
        "./node_modules/hi-base32/src/base32.js": function(module, exports, __webpack_require__) {
            (function(global) {
                !function(root, undefined) {
                    "use strict";
                    var NODE_JS = void 0 !== module;
                    NODE_JS && (root = global);
                    var BASE32_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split(""), BASE32_DECODE_CHAR = {
                        A: 0,
                        B: 1,
                        C: 2,
                        D: 3,
                        E: 4,
                        F: 5,
                        G: 6,
                        H: 7,
                        I: 8,
                        J: 9,
                        K: 10,
                        L: 11,
                        M: 12,
                        N: 13,
                        O: 14,
                        P: 15,
                        Q: 16,
                        R: 17,
                        S: 18,
                        T: 19,
                        U: 20,
                        V: 21,
                        W: 22,
                        X: 23,
                        Y: 24,
                        Z: 25,
                        "2": 26,
                        "3": 27,
                        "4": 28,
                        "5": 29,
                        "6": 30,
                        "7": 31
                    }, blocks = [ 0, 0, 0, 0, 0, 0, 0, 0 ], toUtf8String = function(bytes) {
                        for (var b, c, str = "", length = bytes.length, i = 0, followingChars = 0; i < length; ) if ((b = bytes[i++]) <= 127) str += String.fromCharCode(b); else {
                            if (b > 191 && b <= 223) c = 31 & b, followingChars = 1; else if (b <= 239) c = 15 & b, 
                            followingChars = 2; else {
                                if (!(b <= 247)) throw "not a UTF-8 string";
                                c = 7 & b, followingChars = 3;
                            }
                            for (var j = 0; j < followingChars; ++j) {
                                if ((b = bytes[i++]) < 128 || b > 191) throw "not a UTF-8 string";
                                c <<= 6, c += 63 & b;
                            }
                            if (c >= 55296 && c <= 57343) throw "not a UTF-8 string";
                            if (c > 1114111) throw "not a UTF-8 string";
                            c <= 65535 ? str += String.fromCharCode(c) : (c -= 65536, str += String.fromCharCode(55296 + (c >> 10)), 
                            str += String.fromCharCode(56320 + (1023 & c)));
                        }
                        return str;
                    }, decodeAsBytes = function(base32Str) {
                        base32Str = base32Str.replace(/=/g, "");
                        for (var v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = base32Str.length, i = 0, count = length >> 3 << 3; i < count; ) v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], bytes[index++] = 255 & (v1 << 3 | v2 >>> 2), 
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4), bytes[index++] = 255 & (v4 << 4 | v5 >>> 1), 
                        bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3), bytes[index++] = 255 & (v7 << 5 | v8);
                        var remain = length - count;
                        return 2 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2)) : 4 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], bytes[index++] = 255 & (v1 << 3 | v2 >>> 2), 
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) : 5 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2), bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4), 
                        bytes[index++] = 255 & (v4 << 4 | v5 >>> 1)) : 7 == remain && (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2), bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4), 
                        bytes[index++] = 255 & (v4 << 4 | v5 >>> 1), bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3)), 
                        bytes;
                    }, encodeAscii = function(str) {
                        for (var v1, v2, v3, v4, v5, base32Str = "", length = str.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) v1 = str.charCodeAt(i++), 
                        v2 = str.charCodeAt(i++), v3 = str.charCodeAt(i++), v4 = str.charCodeAt(i++), v5 = str.charCodeAt(i++), 
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                        var remain = length - count;
                        return 1 == remain ? (v1 = str.charCodeAt(i), base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======") : 2 == remain ? (v1 = str.charCodeAt(i++), 
                        v2 = str.charCodeAt(i), base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====") : 3 == remain ? (v1 = str.charCodeAt(i++), 
                        v2 = str.charCodeAt(i++), v3 = str.charCodeAt(i), base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===") : 4 == remain && (v1 = str.charCodeAt(i++), 
                        v2 = str.charCodeAt(i++), v3 = str.charCodeAt(i++), v4 = str.charCodeAt(i), base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "="), 
                        base32Str;
                    }, encodeUtf8 = function(str) {
                        var v1, v2, v3, v4, v5, code, i, end = !1, base32Str = "", index = 0, start = 0, bytes = 0, length = str.length;
                        do {
                            for (blocks[0] = blocks[5], blocks[1] = blocks[6], blocks[2] = blocks[7], i = start; index < length && i < 5; ++index) code = str.charCodeAt(index), 
                            code < 128 ? blocks[i++] = code : code < 2048 ? (blocks[i++] = 192 | code >> 6, 
                            blocks[i++] = 128 | 63 & code) : code < 55296 || code >= 57344 ? (blocks[i++] = 224 | code >> 12, 
                            blocks[i++] = 128 | code >> 6 & 63, blocks[i++] = 128 | 63 & code) : (code = 65536 + ((1023 & code) << 10 | 1023 & str.charCodeAt(++index)), 
                            blocks[i++] = 240 | code >> 18, blocks[i++] = 128 | code >> 12 & 63, blocks[i++] = 128 | code >> 6 & 63, 
                            blocks[i++] = 128 | 63 & code);
                            bytes += i - start, start = i - 5, index == length && ++index, index > length && i < 6 && (end = !0), 
                            v1 = blocks[0], i > 4 ? (v2 = blocks[1], v3 = blocks[2], v4 = blocks[3], v5 = blocks[4], 
                            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5]) : 1 == i ? base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======" : 2 == i ? (v2 = blocks[1], 
                            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====") : 3 == i ? (v2 = blocks[1], 
                            v3 = blocks[2], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===") : 4 == i && (v2 = blocks[1], 
                            v3 = blocks[2], v4 = blocks[3], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=");
                        } while (!end);
                        return base32Str;
                    }, encodeBytes = function(bytes) {
                        for (var v1, v2, v3, v4, v5, base32Str = "", length = bytes.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) v1 = bytes[i++], 
                        v2 = bytes[i++], v3 = bytes[i++], v4 = bytes[i++], v5 = bytes[i++], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                        var remain = length - count;
                        return 1 == remain ? (v1 = bytes[i], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======") : 2 == remain ? (v1 = bytes[i++], 
                        v2 = bytes[i], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====") : 3 == remain ? (v1 = bytes[i++], 
                        v2 = bytes[i++], v3 = bytes[i], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===") : 4 == remain && (v1 = bytes[i++], 
                        v2 = bytes[i++], v3 = bytes[i++], v4 = bytes[i], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "="), 
                        base32Str;
                    }, encode = function(input, asciiOnly) {
                        var notString = "string" != typeof input;
                        return notString && input.constructor == ArrayBuffer && (input = new Uint8Array(input)), 
                        notString ? encodeBytes(input) : asciiOnly ? encodeAscii(input) : encodeUtf8(input);
                    }, decode = function(base32Str, asciiOnly) {
                        if (!asciiOnly) return toUtf8String(decodeAsBytes(base32Str));
                        var v1, v2, v3, v4, v5, v6, v7, v8, str = "", length = base32Str.indexOf("=");
                        length == -1 && (length = base32Str.length);
                        for (var i = 0, count = length >> 3 << 3; i < count; ) v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3)) + String.fromCharCode(255 & (v7 << 5 | v8));
                        var remain = length - count;
                        return 2 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2))) : 4 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4))) : 5 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1))) : 7 == remain && (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3))), 
                        str;
                    };
                    decode.asBytes = decodeAsBytes;
                    var exports = {
                        encode: encode,
                        decode: decode
                    };
                    root.HI_BASE32_TEST && (exports.toUtf8String = toUtf8String), !root.HI_BASE32_TEST && NODE_JS ? module.exports = exports : root && (root.base32 = exports);
                }(this);
            }).call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"));
        },
        "./node_modules/post-robot/src/bridge/bridge.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__("./node_modules/post-robot/src/global.js"), __WEBPACK_IMPORTED_MODULE_3__interface__ = __webpack_require__("./node_modules/post-robot/src/interface.js");
            __WEBPACK_IMPORTED_MODULE_2__global__.a.openTunnelToParent = function(_ref) {
                var name = _ref.name, source = _ref.source, canary = _ref.canary, _sendMessage = _ref.sendMessage, remoteWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.q)(window);
                if (!remoteWindow) throw new Error("No parent window found to open tunnel to");
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__interface__.send)(remoteWindow, __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                    name: name,
                    sendMessage: function() {
                        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.p)(source)) {
                            try {
                                canary();
                            } catch (err) {
                                return;
                            }
                            _sendMessage.apply(this, arguments);
                        }
                    }
                }, {
                    domain: "*"
                });
            };
        },
        "./node_modules/post-robot/src/bridge/child.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function getRemoteBridgeForWindow(win) {
                return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(function() {
                    for (var _iterator = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.t)(win), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        var _frame = _ref;
                        try {
                            if (_frame && _frame !== window && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.k)(_frame) && _frame[__WEBPACK_IMPORTED_MODULE_1__conf__.a.WINDOW_PROPS.POSTROBOT]) return _frame;
                        } catch (err) {
                            continue;
                        }
                    }
                    try {
                        var frame = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.g)(win, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common__.g)(__WEBPACK_IMPORTED_MODULE_2__lib__.e.getDomain()));
                        if (!frame) return;
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.k)(frame) && frame[__WEBPACK_IMPORTED_MODULE_1__conf__.a.WINDOW_PROPS.POSTROBOT] ? frame : new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(function(resolve) {
                            var interval = void 0;
                            interval = setInterval(function() {
                                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.k)(frame) && frame[__WEBPACK_IMPORTED_MODULE_1__conf__.a.WINDOW_PROPS.POSTROBOT]) return clearInterval(interval), 
                                clearTimeout(void 0), resolve(frame);
                                setTimeout(function() {
                                    return clearInterval(interval), resolve();
                                }, 2e3);
                            }, 100);
                        });
                    } catch (err) {
                        return;
                    }
                });
            }
            function openTunnelToOpener() {
                return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(function() {
                    var opener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.u)(window);
                    if (opener && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common__.b)({
                        win: opener
                    })) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common__.i)(opener), 
                    getRemoteBridgeForWindow(opener).then(function(bridge) {
                        return bridge ? window.name ? bridge[__WEBPACK_IMPORTED_MODULE_1__conf__.a.WINDOW_PROPS.POSTROBOT].openTunnelToParent({
                            name: window.name,
                            source: window,
                            canary: function() {},
                            sendMessage: function(message) {
                                window && !window.closed && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__drivers__.b)({
                                    data: message,
                                    origin: this.origin,
                                    source: this.source
                                });
                            }
                        }).then(function(_ref2) {
                            var source = _ref2.source, origin = _ref2.origin, data = _ref2.data;
                            if (source !== opener) throw new Error("Source does not match opener");
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common__.f)(source, origin, data.sendMessage);
                        }).catch(function(err) {
                            throw __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common__.k)(opener, err), 
                            err;
                        }) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common__.k)(opener, new Error("Can not register with opener: window does not have a name")) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common__.k)(opener, new Error("Can not register with opener: no bridge found in opener"));
                    });
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_1__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_3__drivers__ = __webpack_require__("./node_modules/post-robot/src/drivers/index.js"), __WEBPACK_IMPORTED_MODULE_4__common__ = __webpack_require__("./node_modules/post-robot/src/bridge/common.js");
            __webpack_exports__.a = openTunnelToOpener;
        },
        "./node_modules/post-robot/src/bridge/common.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function needsBridgeForBrowser() {
                return !!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.i)(window).match(/MSIE|trident|edge/i) || !__WEBPACK_IMPORTED_MODULE_0__conf__.b.ALLOW_POSTMESSAGE_POPUP;
            }
            function needsBridgeForWin(win) {
                return (!win || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.j)(window, win)) && (!win || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.k)(win));
            }
            function needsBridgeForDomain(domain) {
                return !domain || __WEBPACK_IMPORTED_MODULE_1__lib__.e.getDomain() !== __WEBPACK_IMPORTED_MODULE_1__lib__.e.getDomainFromUrl(domain);
            }
            function needsBridge(_ref) {
                var win = _ref.win, domain = _ref.domain;
                return needsBridgeForBrowser() && needsBridgeForWin(win) && needsBridgeForDomain(domain);
            }
            function getBridgeName(domain) {
                domain = domain || __WEBPACK_IMPORTED_MODULE_1__lib__.e.getDomainFromUrl(domain);
                var sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, "_");
                return __WEBPACK_IMPORTED_MODULE_0__conf__.a.BRIDGE_NAME_PREFIX + "_" + sanitizedDomain;
            }
            function isBridge() {
                return window.name && window.name === getBridgeName(__WEBPACK_IMPORTED_MODULE_1__lib__.e.getDomain());
            }
            function registerRemoteWindow(win) {
                var sendMessagePromise = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : __WEBPACK_IMPORTED_MODULE_0__conf__.b.BRIDGE_TIMEOUT, 
                new __WEBPACK_IMPORTED_MODULE_1__lib__.f.Promise());
                __WEBPACK_IMPORTED_MODULE_2__global__.a.clean.push(__WEBPACK_IMPORTED_MODULE_2__global__.a.remoteWindows, {
                    win: win,
                    sendMessagePromise: sendMessagePromise
                });
            }
            function findRemoteWindow(win) {
                for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_2__global__.a.remoteWindows.length; i++) if (__WEBPACK_IMPORTED_MODULE_2__global__.a.remoteWindows[i].win === win) return __WEBPACK_IMPORTED_MODULE_2__global__.a.remoteWindows[i];
            }
            function registerRemoteSendMessage(win, domain, sendMessage) {
                var remoteWindow = findRemoteWindow(win);
                if (!remoteWindow) throw new Error("Window not found to register sendMessage to");
                var sendMessageWrapper = function(remoteWin, message, remoteDomain) {
                    if (remoteWin !== win) throw new Error("Remote window does not match window");
                    if ("*" !== remoteDomain && remoteDomain !== domain) throw new Error("Remote domain " + remoteDomain + " does not match domain " + domain);
                    sendMessage(message);
                };
                remoteWindow.sendMessagePromise.resolve(sendMessageWrapper), remoteWindow.sendMessagePromise = __WEBPACK_IMPORTED_MODULE_1__lib__.f.Promise.resolve(sendMessageWrapper);
            }
            function rejectRemoteSendMessage(win, err) {
                var remoteWindow = findRemoteWindow(win);
                if (!remoteWindow) throw new Error("Window not found on which to reject sendMessage");
                remoteWindow.sendMessagePromise.asyncReject(err);
            }
            function sendBridgeMessage(win, message, domain) {
                var messagingChild = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.l)(window, win), messagingParent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.l)(win, window);
                if (!messagingChild && !messagingParent) throw new Error("Can only send messages to and from parent and popup windows");
                var remoteWindow = findRemoteWindow(win);
                if (!remoteWindow) throw new Error("Window not found to send message to");
                return remoteWindow.sendMessagePromise.then(function(sendMessage) {
                    return sendMessage(win, message, domain);
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__("./node_modules/post-robot/src/global.js"), __WEBPACK_IMPORTED_MODULE_3__drivers__ = __webpack_require__("./node_modules/post-robot/src/drivers/index.js");
            __webpack_exports__.c = needsBridgeForBrowser, __webpack_exports__.d = needsBridgeForWin, 
            __webpack_exports__.e = needsBridgeForDomain, __webpack_exports__.b = needsBridge, 
            __webpack_exports__.g = getBridgeName, __webpack_exports__.a = isBridge, __webpack_require__.d(__webpack_exports__, "h", function() {
                return documentBodyReady;
            }), __webpack_exports__.i = registerRemoteWindow, __webpack_exports__.f = registerRemoteSendMessage, 
            __webpack_exports__.k = rejectRemoteSendMessage, __webpack_exports__.j = sendBridgeMessage;
            var documentBodyReady = new __WEBPACK_IMPORTED_MODULE_1__lib__.f.Promise(function(resolve) {
                if (window.document && window.document.body) return resolve(window.document.body);
                var interval = setInterval(function() {
                    if (window.document && window.document.body) return clearInterval(interval), resolve(window.document.body);
                }, 10);
            });
            __WEBPACK_IMPORTED_MODULE_2__global__.a.remoteWindows = __WEBPACK_IMPORTED_MODULE_2__global__.a.remoteWindows || [], 
            __WEBPACK_IMPORTED_MODULE_2__global__.a.receiveMessage = function(event) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__drivers__.b)(event);
            };
        },
        "./node_modules/post-robot/src/bridge/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__bridge__ = __webpack_require__("./node_modules/post-robot/src/bridge/bridge.js");
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__bridge__, "openTunnelToOpener") && __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__bridge__.openTunnelToOpener;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__bridge__, "openBridge") && __webpack_require__.d(__webpack_exports__, "openBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__bridge__.openBridge;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__bridge__, "linkUrl") && __webpack_require__.d(__webpack_exports__, "linkUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_0__bridge__.linkUrl;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__bridge__, "isBridge") && __webpack_require__.d(__webpack_exports__, "isBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__bridge__.isBridge;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__bridge__, "needsBridge") && __webpack_require__.d(__webpack_exports__, "needsBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__bridge__.needsBridge;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__bridge__, "needsBridgeForBrowser") && __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", function() {
                return __WEBPACK_IMPORTED_MODULE_0__bridge__.needsBridgeForBrowser;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__bridge__, "needsBridgeForWin") && __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", function() {
                return __WEBPACK_IMPORTED_MODULE_0__bridge__.needsBridgeForWin;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__bridge__, "needsBridgeForDomain") && __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__bridge__.needsBridgeForDomain;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__bridge__, "destroyBridges") && __webpack_require__.d(__webpack_exports__, "destroyBridges", function() {
                return __WEBPACK_IMPORTED_MODULE_0__bridge__.destroyBridges;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__bridge__, "sendBridgeMessage") && __webpack_require__.d(__webpack_exports__, "sendBridgeMessage", function() {
                return __WEBPACK_IMPORTED_MODULE_0__bridge__.sendBridgeMessage;
            });
            var __WEBPACK_IMPORTED_MODULE_1__child__ = __webpack_require__("./node_modules/post-robot/src/bridge/child.js");
            __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_1__child__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_2__common__ = __webpack_require__("./node_modules/post-robot/src/bridge/common.js");
            __webpack_require__.d(__webpack_exports__, "isBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_2__common__.a;
            }), __webpack_require__.d(__webpack_exports__, "needsBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_2__common__.b;
            }), __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", function() {
                return __WEBPACK_IMPORTED_MODULE_2__common__.c;
            }), __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", function() {
                return __WEBPACK_IMPORTED_MODULE_2__common__.d;
            }), __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_2__common__.e;
            }), __webpack_require__.d(__webpack_exports__, "sendBridgeMessage", function() {
                return __WEBPACK_IMPORTED_MODULE_2__common__.j;
            });
            var __WEBPACK_IMPORTED_MODULE_3__parent__ = __webpack_require__("./node_modules/post-robot/src/bridge/parent.js");
            __webpack_require__.d(__webpack_exports__, "openBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_3__parent__.a;
            }), __webpack_require__.d(__webpack_exports__, "linkUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_3__parent__.b;
            }), __webpack_require__.d(__webpack_exports__, "destroyBridges", function() {
                return __WEBPACK_IMPORTED_MODULE_3__parent__.c;
            });
        },
        "./node_modules/post-robot/src/bridge/parent.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function listenForRegister(source, domain) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__interface__.on)(__WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                    source: source,
                    domain: domain
                }, function(_ref) {
                    var origin = _ref.origin, data = _ref.data;
                    if (origin !== domain) throw new Error("Domain " + domain + " does not match origin " + origin);
                    if (!data.name) throw new Error("Register window expected to be passed window name");
                    if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                    var winDetails = __WEBPACK_IMPORTED_MODULE_2__global__.a.popupWindows[data.name];
                    if (!winDetails) throw new Error("Window with name " + data.name + " does not exist, or was not opened by this window");
                    if (!winDetails.domain) throw new Error("We do not have a registered domain for window " + data.name);
                    if (winDetails.domain !== origin) throw new Error("Message origin " + origin + " does not matched registered window origin " + winDetails.domain);
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__common__.f)(winDetails.win, domain, data.sendMessage), 
                    {
                        sendMessage: function(message) {
                            window && !window.closed && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__drivers__.b)({
                                data: message,
                                origin: winDetails.domain,
                                source: winDetails.win
                            });
                        }
                    };
                });
            }
            function openBridgeFrame(name, url) {
                __WEBPACK_IMPORTED_MODULE_1__lib__.d.debug("Opening bridge:", name, url);
                var iframe = document.createElement("iframe");
                return iframe.setAttribute("name", name), iframe.setAttribute("id", name), iframe.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), 
                iframe.setAttribute("frameborder", "0"), iframe.setAttribute("border", "0"), iframe.setAttribute("scrolling", "no"), 
                iframe.setAttribute("allowTransparency", "true"), iframe.setAttribute("tabindex", "-1"), 
                iframe.setAttribute("hidden", "true"), iframe.setAttribute("title", ""), iframe.setAttribute("role", "presentation"), 
                iframe.src = url, iframe;
            }
            function openBridge(url, domain) {
                return domain = domain || __WEBPACK_IMPORTED_MODULE_1__lib__.e.getDomainFromUrl(url), 
                __WEBPACK_IMPORTED_MODULE_2__global__.a.bridges[domain] ? __WEBPACK_IMPORTED_MODULE_2__global__.a.bridges[domain] : __WEBPACK_IMPORTED_MODULE_2__global__.a.clean.setItem(__WEBPACK_IMPORTED_MODULE_2__global__.a.bridges, domain, __WEBPACK_IMPORTED_MODULE_1__lib__.f.run(function() {
                    if (__WEBPACK_IMPORTED_MODULE_1__lib__.e.getDomain() === domain) throw new Error("Can not open bridge on the same domain as current domain: " + domain);
                    var name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__common__.g)(domain);
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.g)(window, name)) throw new Error("Frame with name " + name + " already exists on page");
                    var iframe = openBridgeFrame(name, url);
                    return __WEBPACK_IMPORTED_MODULE_5__common__.h.then(function(body) {
                        return new __WEBPACK_IMPORTED_MODULE_1__lib__.f.Promise(function(resolve, reject) {
                            setTimeout(resolve, 1);
                        }).then(function() {
                            body.appendChild(iframe), __WEBPACK_IMPORTED_MODULE_2__global__.a.clean.register("bridgeFrames", function() {
                                body.removeChild(iframe), delete __WEBPACK_IMPORTED_MODULE_2__global__.a.bridges[domain];
                            });
                            var bridge = iframe.contentWindow;
                            return listenForRegister(bridge, domain), new __WEBPACK_IMPORTED_MODULE_1__lib__.f.Promise(function(resolve, reject) {
                                iframe.onload = resolve, iframe.onerror = reject;
                            }).then(function() {
                                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.h)(bridge, __WEBPACK_IMPORTED_MODULE_0__conf__.b.BRIDGE_TIMEOUT, "Bridge " + url);
                            }).then(function() {
                                return bridge;
                            });
                        });
                    });
                }));
            }
            function destroyBridges() {
                return __WEBPACK_IMPORTED_MODULE_2__global__.a.clean.run("bridgeFrames");
            }
            function linkUrl(win, url) {
                for (var _iterator = Object.keys(__WEBPACK_IMPORTED_MODULE_2__global__.a.popupWindows), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref2 = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref2 = _i.value;
                    }
                    var name = _ref2, winOptions = __WEBPACK_IMPORTED_MODULE_2__global__.a.popupWindows[name];
                    if (winOptions.win === win) {
                        winOptions.domain = __WEBPACK_IMPORTED_MODULE_1__lib__.e.getDomainFromUrl(url), 
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__common__.i)(win);
                        break;
                    }
                }
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__("./node_modules/post-robot/src/global.js"), __WEBPACK_IMPORTED_MODULE_3__interface__ = __webpack_require__("./node_modules/post-robot/src/interface.js"), __WEBPACK_IMPORTED_MODULE_4__drivers__ = __webpack_require__("./node_modules/post-robot/src/drivers/index.js"), __WEBPACK_IMPORTED_MODULE_5__common__ = __webpack_require__("./node_modules/post-robot/src/bridge/common.js");
            __webpack_exports__.a = openBridge, __webpack_exports__.c = destroyBridges, __webpack_exports__.b = linkUrl;
            var _slicedToArray = function() {
                function sliceIterator(arr, i) {
                    var _arr = [], _n = !0, _d = !1, _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                        !i || _arr.length !== i); _n = !0) ;
                    } catch (err) {
                        _d = !0, _e = err;
                    } finally {
                        try {
                            !_n && _i.return && _i.return();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function(arr, i) {
                    if (Array.isArray(arr)) return arr;
                    if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
            }();
            __WEBPACK_IMPORTED_MODULE_2__global__.a.bridges = __WEBPACK_IMPORTED_MODULE_2__global__.a.bridges || {}, 
            __WEBPACK_IMPORTED_MODULE_2__global__.a.popupWindows = __WEBPACK_IMPORTED_MODULE_2__global__.a.popupWindows || {};
            var windowOpen = window.open;
            window.open = function(url, name, options, last) {
                var domain = url;
                if (url && 0 === url.indexOf(__WEBPACK_IMPORTED_MODULE_0__conf__.a.MOCK_PROTOCOL)) {
                    var _url$split = url.split("|"), _url$split2 = _slicedToArray(_url$split, 2);
                    domain = _url$split2[0], url = _url$split2[1];
                }
                domain && (domain = __WEBPACK_IMPORTED_MODULE_1__lib__.e.getDomainFromUrl(domain));
                var win = windowOpen.call(this, url, name, options, last);
                return url && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__common__.i)(win), 
                name && __WEBPACK_IMPORTED_MODULE_2__global__.a.clean.setItem(__WEBPACK_IMPORTED_MODULE_2__global__.a.popupWindows, name, {
                    win: win,
                    domain: domain
                }), win;
            };
        },
        "./node_modules/post-robot/src/compat/ie.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function emulateIERestrictions(sourceWindow, targetWindow) {
                if (!__WEBPACK_IMPORTED_MODULE_0__conf__.b.ALLOW_POSTMESSAGE_POPUP && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.j)(sourceWindow, targetWindow) === !1) throw new Error("Can not send and receive post messages between two different windows (disabled to emulate IE)");
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js");
            __webpack_exports__.a = emulateIERestrictions;
        },
        "./node_modules/post-robot/src/compat/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__ie__ = __webpack_require__("./node_modules/post-robot/src/compat/ie.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_0__ie__.a;
            });
        },
        "./node_modules/post-robot/src/conf/config.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _defineProperty(obj, key, value) {
                return key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./node_modules/post-robot/src/conf/constants.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return CONFIG;
            });
            var _ALLOWED_POST_MESSAGE, CONFIG = {
                ALLOW_POSTMESSAGE_POPUP: !0,
                LOG_LEVEL: "info",
                BRIDGE_TIMEOUT: 5e3,
                ACK_TIMEOUT: 1e3,
                LOG_TO_PAGE: !1,
                MOCK_MODE: !1,
                ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.POST_MESSAGE, !0), 
                _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.BRIDGE, !0), 
                _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.GLOBAL, !0), 
                _ALLOWED_POST_MESSAGE)
            };
            0 === window.location.href.indexOf(__WEBPACK_IMPORTED_MODULE_0__constants__.a.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
        },
        "./node_modules/post-robot/src/conf/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return CONSTANTS;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return POST_MESSAGE_NAMES_LIST;
            });
            var CONSTANTS = {
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
                    METHOD: "postrobot_method",
                    READY: "postrobot_ready",
                    OPEN_TUNNEL: "postrobot_open_tunnel"
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
                    METHOD: "postrobot_method",
                    ERROR: "postrobot_error"
                },
                SEND_STRATEGIES: {
                    POST_MESSAGE: "postrobot_post_message",
                    BRIDGE: "postrobot_bridge",
                    GLOBAL: "postrobot_global"
                },
                MOCK_PROTOCOL: "mock:",
                FILE_PROTOCOL: "file:",
                BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
                POSTROBOT_PROXY: "__postrobot_proxy__"
            }, POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function(key) {
                return CONSTANTS.POST_MESSAGE_NAMES[key];
            });
        },
        "./node_modules/post-robot/src/conf/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./node_modules/post-robot/src/conf/config.js");
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_0__config__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./node_modules/post-robot/src/conf/constants.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.a;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.b;
            });
        },
        "./node_modules/post-robot/src/drivers/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__receive__ = __webpack_require__("./node_modules/post-robot/src/drivers/receive/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_0__receive__.a;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_0__receive__.b;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_0__receive__.c;
            });
            var __WEBPACK_IMPORTED_MODULE_1__send__ = __webpack_require__("./node_modules/post-robot/src/drivers/send/index.js");
            __webpack_require__.d(__webpack_exports__, "f", function() {
                return __WEBPACK_IMPORTED_MODULE_1__send__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_2__listeners__ = __webpack_require__("./node_modules/post-robot/src/drivers/listeners.js");
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return __WEBPACK_IMPORTED_MODULE_2__listeners__.c;
            }), __webpack_require__.d(__webpack_exports__, "e", function() {
                return __WEBPACK_IMPORTED_MODULE_2__listeners__.d;
            });
        },
        "./node_modules/post-robot/src/drivers/listeners.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isRegex(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            }
            function matchDomain(domain, origin) {
                return "string" == typeof domain ? !isRegex(origin) && (!Array.isArray(origin) && ("*" === domain || origin === domain)) : isRegex(domain) ? isRegex(origin) ? domain.toString() === origin.toString() : !Array.isArray(origin) && origin.match(domain) : !!Array.isArray(domain) && (!isRegex(origin) && (Array.isArray(origin) ? JSON.stringify(domain) === JSON.stringify(origin) : domain.indexOf(origin) !== -1));
            }
            function getRequestListener(name, win, domain) {
                for (var result = {}, _iterator = __WEBPACK_IMPORTED_MODULE_0__global__.a.listeners.request, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var requestListener = _ref;
                    if (requestListener.name === name) {
                        var specifiedWin = requestListener.win && "*" !== requestListener.win, specifiedDomain = requestListener.domain && "*" !== requestListener.domain, matchedWin = specifiedWin && requestListener.win === win, matchedDomain = specifiedDomain && matchDomain(requestListener.domain, domain);
                        specifiedWin && specifiedDomain ? matchedWin && matchedDomain && (result.all = result.all || requestListener.options) : specifiedDomain ? matchedDomain && (result.domain = result.domain || requestListener.options) : specifiedWin ? matchedWin && (result.win = result.win || requestListener.options) : result.name = result.name || requestListener.options;
                    }
                }
                return result.all || result.domain || result.win || result.name;
            }
            function removeRequestListener(options) {
                for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0__global__.a.listeners.request, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        if (_i2 = _iterator2.next(), _i2.done) break;
                        _ref2 = _i2.value;
                    }
                    var listener = _ref2;
                    listener.options === options && __WEBPACK_IMPORTED_MODULE_0__global__.a.listeners.request.splice(__WEBPACK_IMPORTED_MODULE_0__global__.a.listeners.request.indexOf(listener), 1);
                }
            }
            function addRequestListener(name, win, domain, options, override) {
                var listener = getRequestListener(name, win, domain);
                if (listener) {
                    if (!override) {
                        if (win) throw new Error("Request listener already exists for " + name + " on domain " + domain + " for specified window: " + (listener.win === win));
                        throw new Error("Request listener already exists for " + name + " on domain " + domain);
                    }
                    removeRequestListener(listener);
                }
                __WEBPACK_IMPORTED_MODULE_0__global__.a.clean.push(__WEBPACK_IMPORTED_MODULE_0__global__.a.listeners.request, {
                    name: name,
                    win: win,
                    domain: domain,
                    options: options
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/post-robot/src/global.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return listeners;
            }), __webpack_exports__.b = getRequestListener, __webpack_exports__.c = removeRequestListener, 
            __webpack_exports__.d = addRequestListener, __WEBPACK_IMPORTED_MODULE_0__global__.a.listeners = __WEBPACK_IMPORTED_MODULE_0__global__.a.listeners || {
                request: [],
                response: []
            };
            var listeners = __WEBPACK_IMPORTED_MODULE_0__global__.a.listeners;
        },
        "./node_modules/post-robot/src/drivers/receive/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function parseMessage(message) {
                try {
                    message = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.r)(message);
                } catch (err) {
                    return;
                }
                if (message && (message = message[__WEBPACK_IMPORTED_MODULE_0__conf__.a.WINDOW_PROPS.POSTROBOT]) && message.type && __WEBPACK_IMPORTED_MODULE_4__types__.a[message.type]) return message;
            }
            function receiveMessage(event) {
                if (!window || window.closed) throw new Error("Message recieved in closed window");
                try {
                    if (!event.source) return;
                } catch (err) {
                    return;
                }
                var source = event.source, origin = event.origin, data = event.data, message = parseMessage(data);
                if (message && (0 !== message.sourceDomain.indexOf(__WEBPACK_IMPORTED_MODULE_0__conf__.a.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(__WEBPACK_IMPORTED_MODULE_0__conf__.a.FILE_PROTOCOL) || (origin = message.sourceDomain), 
                __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages.indexOf(message.id) === -1)) {
                    __WEBPACK_IMPORTED_MODULE_3__global__.a.clean.push(__WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages, message.id);
                    var level = void 0;
                    if (level = __WEBPACK_IMPORTED_MODULE_0__conf__.c.indexOf(message.name) !== -1 || message.type === __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                    __WEBPACK_IMPORTED_MODULE_1__lib__.d.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]), 
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.p)(source)) return __WEBPACK_IMPORTED_MODULE_1__lib__.d.debug("Source window is closed - can not send " + message.type + " " + message.name);
                    message.data && (message.data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.s)(source, origin, message.data)), 
                    __WEBPACK_IMPORTED_MODULE_4__types__.a[message.type](source, origin, message);
                }
            }
            function messageListener(event) {
                try {
                    event.source;
                } catch (err) {
                    return;
                }
                event = {
                    source: event.source || event.sourceElement,
                    origin: event.origin || event.originalEvent.origin,
                    data: event.data
                };
                try {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__compat__.a)(event.source, window);
                } catch (err) {
                    return;
                }
                receiveMessage(event);
            }
            function listenForMessages() {
                var listener = __WEBPACK_IMPORTED_MODULE_1__lib__.e.listen(window, "message", messageListener);
                __WEBPACK_IMPORTED_MODULE_3__global__.a.clean.register("listener", function() {
                    listener.cancel();
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_2__compat__ = __webpack_require__("./node_modules/post-robot/src/compat/index.js"), __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__("./node_modules/post-robot/src/global.js"), __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__("./node_modules/post-robot/src/drivers/receive/types.js");
            __webpack_exports__.b = receiveMessage, __webpack_exports__.c = messageListener, 
            __webpack_exports__.a = listenForMessages, __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages = __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages || [];
        },
        "./node_modules/post-robot/src/drivers/receive/types.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _defineProperty(obj, key, value) {
                return key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            function matchDomain(domain, origin) {
                return "string" == typeof domain ? "*" === domain || origin === domain : "[object RegExp]" === Object.prototype.toString.call(domain) ? origin.match(domain) : !!Array.isArray(domain) && domain.indexOf(origin) !== -1;
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_2__send__ = __webpack_require__("./node_modules/post-robot/src/drivers/send/index.js"), __WEBPACK_IMPORTED_MODULE_3__listeners__ = __webpack_require__("./node_modules/post-robot/src/drivers/listeners.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return RECEIVE_MESSAGE_TYPES;
            });
            var _RECEIVE_MESSAGE_TYPE, _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_TYPE.ACK, function(source, origin, message) {
                var options = __WEBPACK_IMPORTED_MODULE_3__listeners__.a.response[message.hash];
                if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain);
                options.ack = !0;
            }), _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_TYPE.REQUEST, function(source, origin, message) {
                function respond(data) {
                    return message.fireAndForget || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.p)(source) ? __WEBPACK_IMPORTED_MODULE_1__lib__.f.Promise.resolve() : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__send__.a)(source, _extends({
                        target: message.originalSource,
                        hash: message.hash,
                        name: message.name
                    }, data), origin);
                }
                var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__listeners__.b)(message.name, source, origin);
                return __WEBPACK_IMPORTED_MODULE_1__lib__.f.Promise.all([ respond({
                    type: __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_TYPE.ACK
                }), __WEBPACK_IMPORTED_MODULE_1__lib__.f.run(function() {
                    if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!matchDomain(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain);
                    var data = message.data;
                    return __WEBPACK_IMPORTED_MODULE_1__lib__.f.deNodeify(options.handler, {
                        source: source,
                        origin: origin,
                        data: data
                    });
                }).then(function(data) {
                    return respond({
                        type: __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_TYPE.RESPONSE,
                        ack: __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_ACK.SUCCESS,
                        data: data
                    });
                }, function(err) {
                    return respond({
                        type: __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_TYPE.RESPONSE,
                        ack: __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_ACK.ERROR,
                        error: err.stack ? err.message + "\n" + err.stack : err.toString()
                    });
                }) ]).catch(function(err) {
                    if (options && options.handleError) return options.handleError(err);
                    __WEBPACK_IMPORTED_MODULE_1__lib__.d.error(err.stack || err.toString());
                });
            }), _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_TYPE.RESPONSE, function(source, origin, message) {
                var options = __WEBPACK_IMPORTED_MODULE_3__listeners__.a.response[message.hash];
                if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + options.domain);
                if (delete __WEBPACK_IMPORTED_MODULE_3__listeners__.a.response[message.hash], message.ack === __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_ACK.ERROR) return options.respond(new Error(message.error));
                if (message.ack === __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_ACK.SUCCESS) {
                    var data = message.data || message.response;
                    return options.respond(null, {
                        source: source,
                        origin: origin,
                        data: data
                    });
                }
            }), _RECEIVE_MESSAGE_TYPE);
        },
        "./node_modules/post-robot/src/drivers/send/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _defineProperty(obj, key, value) {
                return key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            function buildMessage(win, message) {
                var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = __WEBPACK_IMPORTED_MODULE_1__lib__.e.uniqueID(), type = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.m)();
                return _extends({}, message, options, {
                    sourceDomain: __WEBPACK_IMPORTED_MODULE_1__lib__.e.getDomain(window),
                    id: message.id || id,
                    windowType: type
                });
            }
            function sendMessage(win, message, domain) {
                return __WEBPACK_IMPORTED_MODULE_1__lib__.f.run(function() {
                    message = buildMessage(win, message, {
                        data: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.n)(win, domain, message.data),
                        domain: domain
                    });
                    var level = void 0;
                    if (level = __WEBPACK_IMPORTED_MODULE_0__conf__.c.indexOf(message.name) !== -1 || message.type === __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                    __WEBPACK_IMPORTED_MODULE_1__lib__.d.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || "*", "\n\n", message ]), 
                    __WEBPACK_IMPORTED_MODULE_0__conf__.b.MOCK_MODE) return delete message.target, window[__WEBPACK_IMPORTED_MODULE_0__conf__.a.WINDOW_PROPS.POSTROBOT].postMessage({
                        origin: __WEBPACK_IMPORTED_MODULE_1__lib__.e.getDomain(window),
                        source: window,
                        data: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.o)(message, 0, 2)
                    });
                    if (win === window) throw new Error("Attemping to send message to self");
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.p)(win)) throw new Error("Window is closed");
                    __WEBPACK_IMPORTED_MODULE_1__lib__.d.debug("Running send message strategies", message);
                    var messages = [], serializedMessage = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.o)(_defineProperty({}, __WEBPACK_IMPORTED_MODULE_0__conf__.a.WINDOW_PROPS.POSTROBOT, message), 0, 2);
                    return __WEBPACK_IMPORTED_MODULE_1__lib__.f.map(Object.keys(__WEBPACK_IMPORTED_MODULE_2__strategies__.a), function(strategyName) {
                        return __WEBPACK_IMPORTED_MODULE_1__lib__.f.run(function() {
                            if (!__WEBPACK_IMPORTED_MODULE_0__conf__.b.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                            return __WEBPACK_IMPORTED_MODULE_2__strategies__.a[strategyName](win, serializedMessage, domain);
                        }).then(function() {
                            return messages.push(strategyName + ": success"), !0;
                        }, function(err) {
                            return messages.push(strategyName + ": " + (err.stack || err.toString()) + "\n"), 
                            !1;
                        });
                    }).then(function(results) {
                        var success = __WEBPACK_IMPORTED_MODULE_1__lib__.e.some(results), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                        if (__WEBPACK_IMPORTED_MODULE_1__lib__.d.debug(status), !success) throw new Error(status);
                    });
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_2__strategies__ = __webpack_require__("./node_modules/post-robot/src/drivers/send/strategies.js");
            __webpack_exports__.a = sendMessage;
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
        },
        "./node_modules/post-robot/src/drivers/send/strategies.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _defineProperty(obj, key, value) {
                return key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_2__compat__ = __webpack_require__("./node_modules/post-robot/src/compat/index.js"), __WEBPACK_IMPORTED_MODULE_3__bridge__ = __webpack_require__("./node_modules/post-robot/src/bridge/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return SEND_MESSAGE_STRATEGIES;
            });
            var _SEND_MESSAGE_STRATEG, SEND_MESSAGE_STRATEGIES = (_SEND_MESSAGE_STRATEG = {}, 
            _defineProperty(_SEND_MESSAGE_STRATEG, __WEBPACK_IMPORTED_MODULE_0__conf__.a.SEND_STRATEGIES.POST_MESSAGE, function(win, serializedMessage, domain) {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__compat__.a)(window, win), 
                domain && 0 === domain.indexOf(__WEBPACK_IMPORTED_MODULE_0__conf__.a.MOCK_PROTOCOL)) try {
                    domain = win.location.protocol + "//" + win.location.host;
                } catch (err) {
                    throw new Error("Attempting to send messsage to mock domain " + domain + ", but window is actually cross-domain");
                }
                return domain && 0 === domain.indexOf(__WEBPACK_IMPORTED_MODULE_0__conf__.a.FILE_PROTOCOL) && (domain = "*"), 
                win.postMessage(serializedMessage, domain);
            }), _defineProperty(_SEND_MESSAGE_STRATEG, __WEBPACK_IMPORTED_MODULE_0__conf__.a.SEND_STRATEGIES.BRIDGE, function(win, serializedMessage, domain) {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.k)(win)) throw new Error("Post message through bridge disabled between same domain windows");
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.j)(window, win) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__bridge__.sendBridgeMessage)(win, serializedMessage, domain);
            }), _defineProperty(_SEND_MESSAGE_STRATEG, __WEBPACK_IMPORTED_MODULE_0__conf__.a.SEND_STRATEGIES.GLOBAL, function(win, serializedMessage, domain) {
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.k)(win)) throw new Error("Post message through global disabled between different domain windows");
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.j)(window, win) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
                var foreignGlobal = win[__WEBPACK_IMPORTED_MODULE_0__conf__.a.WINDOW_PROPS.POSTROBOT];
                if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
                return foreignGlobal.receiveMessage({
                    source: window,
                    origin: domain,
                    data: serializedMessage
                });
            }), _SEND_MESSAGE_STRATEG);
        },
        "./node_modules/post-robot/src/global.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib_cleanup__ = __webpack_require__("./node_modules/post-robot/src/lib/cleanup.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return global;
            });
            var global = window[__WEBPACK_IMPORTED_MODULE_0__conf__.a.WINDOW_PROPS.POSTROBOT] = window[__WEBPACK_IMPORTED_MODULE_0__conf__.a.WINDOW_PROPS.POSTROBOT] || {};
            global.clean = global.clean || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_cleanup__.a)(global), 
            global.registerSelf = function() {};
        },
        "./node_modules/post-robot/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__("./node_modules/post-robot/src/interface.js");
            __webpack_require__.d(__webpack_exports__, "init", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.init;
            }), __webpack_require__.d(__webpack_exports__, "reset", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.reset;
            }), __webpack_require__.d(__webpack_exports__, "Promise", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.Promise;
            }), __webpack_require__.d(__webpack_exports__, "parent", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.parent;
            }), __webpack_require__.d(__webpack_exports__, "openBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.openBridge;
            }), __webpack_require__.d(__webpack_exports__, "linkUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.linkUrl;
            }), __webpack_require__.d(__webpack_exports__, "isBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.isBridge;
            }), __webpack_require__.d(__webpack_exports__, "needsBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.needsBridge;
            }), __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.needsBridgeForBrowser;
            }), __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.needsBridgeForWin;
            }), __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.needsBridgeForDomain;
            }), __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.openTunnelToOpener;
            }), __webpack_require__.d(__webpack_exports__, "destroyBridges", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.destroyBridges;
            }), __webpack_require__.d(__webpack_exports__, "util", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.util;
            }), __webpack_require__.d(__webpack_exports__, "winutil", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.winutil;
            }), __webpack_require__.d(__webpack_exports__, "send", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.send;
            }), __webpack_require__.d(__webpack_exports__, "request", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.request;
            }), __webpack_require__.d(__webpack_exports__, "sendToParent", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.sendToParent;
            }), __webpack_require__.d(__webpack_exports__, "client", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.client;
            }), __webpack_require__.d(__webpack_exports__, "on", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.on;
            }), __webpack_require__.d(__webpack_exports__, "listen", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.listen;
            }), __webpack_require__.d(__webpack_exports__, "once", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.once;
            }), __webpack_require__.d(__webpack_exports__, "listener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.listener;
            }), __webpack_require__.d(__webpack_exports__, "enableMockMode", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.enableMockMode;
            }), __webpack_require__.d(__webpack_exports__, "disableMockMode", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.disableMockMode;
            }), __webpack_require__.d(__webpack_exports__, "CONFIG", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.CONFIG;
            }), __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.CONSTANTS;
            }), __webpack_require__.d(__webpack_exports__, "disable", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.disable;
            }), __webpack_exports__.default = __WEBPACK_IMPORTED_MODULE_0__interface__;
        },
        "./node_modules/post-robot/src/interface.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function init() {
                __WEBPACK_IMPORTED_MODULE_2__global__.a.initialized || (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__drivers__.a)(), 
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__bridge__.openTunnelToOpener)(), 
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.a)(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.b)()), 
                __WEBPACK_IMPORTED_MODULE_2__global__.a.initialized = !0;
            }
            function reset() {
                return __WEBPACK_IMPORTED_MODULE_2__global__.a.clean.all().then(function() {
                    return __WEBPACK_IMPORTED_MODULE_2__global__.a.initialized = !1, init();
                });
            }
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_1__drivers__ = __webpack_require__("./node_modules/post-robot/src/drivers/index.js"), __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__("./node_modules/post-robot/src/global.js"), __WEBPACK_IMPORTED_MODULE_3__bridge__ = __webpack_require__("./node_modules/post-robot/src/bridge/index.js"), __WEBPACK_IMPORTED_MODULE_4__public__ = __webpack_require__("./node_modules/post-robot/src/public/index.js");
            __webpack_require__.d(__webpack_exports__, "parent", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.a;
            }), __webpack_require__.d(__webpack_exports__, "openBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.b;
            }), __webpack_require__.d(__webpack_exports__, "linkUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.c;
            }), __webpack_require__.d(__webpack_exports__, "isBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.d;
            }), __webpack_require__.d(__webpack_exports__, "needsBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.e;
            }), __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.f;
            }), __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.g;
            }), __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.h;
            }), __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.i;
            }), __webpack_require__.d(__webpack_exports__, "destroyBridges", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.j;
            }), __webpack_require__.d(__webpack_exports__, "util", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.k;
            }), __webpack_require__.d(__webpack_exports__, "winutil", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.l;
            }), __webpack_require__.d(__webpack_exports__, "send", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.m;
            }), __webpack_require__.d(__webpack_exports__, "request", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.n;
            }), __webpack_require__.d(__webpack_exports__, "sendToParent", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.o;
            }), __webpack_require__.d(__webpack_exports__, "client", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.p;
            }), __webpack_require__.d(__webpack_exports__, "on", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.q;
            }), __webpack_require__.d(__webpack_exports__, "listen", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.r;
            }), __webpack_require__.d(__webpack_exports__, "once", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.s;
            }), __webpack_require__.d(__webpack_exports__, "listener", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.t;
            }), __webpack_require__.d(__webpack_exports__, "enableMockMode", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.u;
            }), __webpack_require__.d(__webpack_exports__, "disableMockMode", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.v;
            }), __webpack_require__.d(__webpack_exports__, "CONFIG", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.w;
            }), __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.x;
            }), __webpack_require__.d(__webpack_exports__, "disable", function() {
                return __WEBPACK_IMPORTED_MODULE_4__public__.y;
            }), __webpack_require__.d(__webpack_exports__, "Promise", function() {
                return __WEBPACK_IMPORTED_MODULE_0__lib__.c;
            }), __webpack_exports__.init = init, __webpack_exports__.reset = reset, init();
        },
        "./node_modules/post-robot/src/lib/cleanup.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function cleanup(obj) {
                var tasks = [];
                return {
                    getters: {
                        array: function() {
                            return [];
                        },
                        object: function() {
                            return {};
                        }
                    },
                    set: function(name, item) {
                        return obj[name] = item, this.register(function() {
                            delete obj[name];
                        }), item;
                    },
                    push: function(collection, item) {
                        return collection.push(item), this.register(function() {
                            var index = collection.indexOf(item);
                            index !== -1 && collection.splice(index, 1);
                        }), item;
                    },
                    setItem: function(mapping, key, item) {
                        return mapping[key] = item, this.register(function() {
                            delete mapping[key];
                        }), item;
                    },
                    register: function(name, method) {
                        method || (method = name, name = void 0), tasks.push({
                            complete: !1,
                            name: name,
                            run: function() {
                                if (!this.complete) return this.complete = !0, method();
                            }
                        });
                    },
                    hasTasks: function() {
                        return Boolean(tasks.filter(function(item) {
                            return !item.complete;
                        }).length);
                    },
                    all: function() {
                        for (var results = []; tasks.length; ) results.push(tasks.pop().run());
                        return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.all(results).then(function() {});
                    },
                    run: function(name) {
                        for (var results = [], toClean = [], _iterator = tasks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if (_i = _iterator.next(), _i.done) break;
                                _ref = _i.value;
                            }
                            var item = _ref;
                            item.name === name && (toClean.push(item), results.push(item.run()));
                        }
                        for (var _iterator2 = toClean, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                            var _ref2;
                            if (_isArray2) {
                                if (_i2 >= _iterator2.length) break;
                                _ref2 = _iterator2[_i2++];
                            } else {
                                if (_i2 = _iterator2.next(), _i2.done) break;
                                _ref2 = _i2.value;
                            }
                            var _item = _ref2;
                            tasks.splice(tasks.indexOf(_item), 1);
                        }
                        return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.all(results).then(function() {});
                    }
                };
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js");
            __webpack_exports__.a = cleanup;
        },
        "./node_modules/post-robot/src/lib/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__promise__ = __webpack_require__("./node_modules/post-robot/src/lib/promise.js");
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_0__promise__.a;
            }), __webpack_require__.d(__webpack_exports__, "f", function() {
                return __WEBPACK_IMPORTED_MODULE_0__promise__.b;
            });
            var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__("./node_modules/post-robot/src/lib/util.js");
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return __WEBPACK_IMPORTED_MODULE_1__util__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_2__log__ = __webpack_require__("./node_modules/post-robot/src/lib/log.js");
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return __WEBPACK_IMPORTED_MODULE_2__log__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_3__windows__ = __webpack_require__("./node_modules/post-robot/src/lib/windows.js");
            __webpack_require__.d(__webpack_exports__, "g", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.getFrameByName;
            }), __webpack_require__.d(__webpack_exports__, "i", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.getUserAgent;
            }), __webpack_require__.d(__webpack_exports__, "j", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.isSameTopWindow;
            }), __webpack_require__.d(__webpack_exports__, "k", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.isSameDomain;
            }), __webpack_require__.d(__webpack_exports__, "l", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.isOpener;
            }), __webpack_require__.d(__webpack_exports__, "m", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.getWindowType;
            }), __webpack_require__.d(__webpack_exports__, "o", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.jsonStringify;
            }), __webpack_require__.d(__webpack_exports__, "p", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.isWindowClosed;
            }), __webpack_require__.d(__webpack_exports__, "q", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.getParent;
            }), __webpack_require__.d(__webpack_exports__, "r", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.jsonParse;
            }), __webpack_require__.d(__webpack_exports__, "t", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.getFrames;
            }), __webpack_require__.d(__webpack_exports__, "u", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.getOpener;
            }), __webpack_require__.d(__webpack_exports__, "v", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.isAncestor;
            }), __webpack_require__.d(__webpack_exports__, "w", function() {
                return __WEBPACK_IMPORTED_MODULE_3__windows__.getAncestor;
            });
            var __WEBPACK_IMPORTED_MODULE_4__methods__ = __webpack_require__("./node_modules/post-robot/src/lib/methods.js");
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_4__methods__.a;
            }), __webpack_require__.d(__webpack_exports__, "n", function() {
                return __WEBPACK_IMPORTED_MODULE_4__methods__.b;
            }), __webpack_require__.d(__webpack_exports__, "s", function() {
                return __WEBPACK_IMPORTED_MODULE_4__methods__.c;
            });
            var __WEBPACK_IMPORTED_MODULE_6__ready__ = (__webpack_require__("./node_modules/post-robot/src/lib/tick.js"), 
            __webpack_require__("./node_modules/post-robot/src/lib/ready.js"));
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_6__ready__.a;
            }), __webpack_require__.d(__webpack_exports__, "h", function() {
                return __WEBPACK_IMPORTED_MODULE_6__ready__.b;
            });
            __webpack_require__("./node_modules/post-robot/src/lib/cleanup.js");
        },
        "./node_modules/post-robot/src/lib/log.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/post-robot/src/lib/util.js"), __WEBPACK_IMPORTED_MODULE_1__windows__ = __webpack_require__("./node_modules/post-robot/src/lib/windows.js"), __WEBPACK_IMPORTED_MODULE_2__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return log;
            });
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, LOG_LEVELS = [ "debug", "info", "warn", "error" ];
            Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
                console[method] = this.bind(console[method], console);
            }, Function.prototype.call);
            var log = {
                clearLogs: function() {
                    if (window.console && window.console.clear && window.console.clear(), __WEBPACK_IMPORTED_MODULE_2__conf__.b.LOG_TO_PAGE) {
                        var container = document.getElementById("postRobotLogs");
                        container && container.parentNode.removeChild(container);
                    }
                },
                writeToPage: function(level, args) {
                    setTimeout(function() {
                        var container = document.getElementById("postRobotLogs");
                        container || (container = document.createElement("div"), container.id = "postRobotLogs", 
                        container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;", 
                        document.body.appendChild(container));
                        var el = document.createElement("div"), date = new Date().toString().split(" ")[4], payload = __WEBPACK_IMPORTED_MODULE_0__util__.a.map(args, function(item) {
                            if ("string" == typeof item) return item;
                            if (!item) return Object.prototype.toString.call(item);
                            var json = void 0;
                            try {
                                json = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__windows__.jsonStringify)(item, 0, 2);
                            } catch (e) {
                                json = "[object]";
                            }
                            return "\n\n" + json + "\n\n";
                        }).join(" "), msg = date + " " + level + " " + payload;
                        el.innerHTML = msg;
                        var color = {
                            log: "#ddd",
                            warn: "orange",
                            error: "red",
                            info: "blue",
                            debug: "#aaa"
                        }[level];
                        el.style.cssText = "margin-top: 10px; color: " + color + ";", container.childNodes.length ? container.insertBefore(el, container.childNodes[0]) : container.appendChild(el);
                    });
                },
                logLevel: function(level, args) {
                    setTimeout(function() {
                        try {
                            if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(__WEBPACK_IMPORTED_MODULE_2__conf__.b.LOG_LEVEL)) return;
                            if (args = Array.prototype.slice.call(args), args.unshift("" + window.location.host + window.location.pathname), 
                            args.unshift("::"), args.unshift("" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__windows__.getWindowType)().toLowerCase()), 
                            args.unshift("[post-robot]"), __WEBPACK_IMPORTED_MODULE_2__conf__.b.LOG_TO_PAGE && log.writeToPage(level, args), 
                            !window.console) return;
                            if (window.console[level] || (level = "log"), !window.console[level]) return;
                            window.console[level].apply(window.console, args);
                        } catch (err) {}
                    }, 1);
                },
                debug: function() {
                    log.logLevel("debug", arguments);
                },
                info: function() {
                    log.logLevel("info", arguments);
                },
                warn: function() {
                    log.logLevel("warn", arguments);
                },
                error: function() {
                    log.logLevel("error", arguments);
                }
            };
        },
        "./node_modules/post-robot/src/lib/methods.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isSerialized(item, type) {
                return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && item.__type__ === type;
            }
            function serializeMethod(destination, domain, method, name) {
                var id = __WEBPACK_IMPORTED_MODULE_1__util__.a.uniqueID();
                return __WEBPACK_IMPORTED_MODULE_5__global__.a.clean.setItem(__WEBPACK_IMPORTED_MODULE_5__global__.a.methods, id, {
                    destination: destination,
                    domain: domain,
                    method: method
                }), {
                    __type__: __WEBPACK_IMPORTED_MODULE_0__conf__.a.SERIALIZATION_TYPES.METHOD,
                    __id__: id,
                    __name__: name
                };
            }
            function serializeError(err) {
                return {
                    __type__: __WEBPACK_IMPORTED_MODULE_0__conf__.a.SERIALIZATION_TYPES.ERROR,
                    __message__: err.stack || err.message || err.toString()
                };
            }
            function serializeMethods(destination, domain, obj) {
                return __WEBPACK_IMPORTED_MODULE_1__util__.a.replaceObject({
                    obj: obj
                }, function(item, key) {
                    return "function" == typeof item ? serializeMethod(destination, domain, item, key) : item instanceof Error ? serializeError(item) : void 0;
                }).obj;
            }
            function deserializeMethod(source, origin, obj) {
                function wrapper() {
                    var args = Array.prototype.slice.call(arguments);
                    return __WEBPACK_IMPORTED_MODULE_3__log__.a.debug("Call foreign method", obj.__name__, args), 
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__interface__.send)(source, __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_NAMES.METHOD, {
                        id: obj.__id__,
                        name: obj.__name__,
                        args: args
                    }, {
                        domain: origin
                    }).then(function(_ref2) {
                        var data = _ref2.data;
                        return __WEBPACK_IMPORTED_MODULE_3__log__.a.debug("Got foreign method result", obj.__name__, data.result), 
                        data.result;
                    }, function(err) {
                        throw __WEBPACK_IMPORTED_MODULE_3__log__.a.debug("Got foreign method error", err.stack || err.toString()), 
                        err;
                    });
                }
                return wrapper.__name__ = obj.__name__, wrapper.source = source, wrapper.origin = origin, 
                wrapper;
            }
            function deserializeError(source, origin, obj) {
                return new Error(obj.__message__);
            }
            function deserializeMethods(source, origin, obj) {
                return __WEBPACK_IMPORTED_MODULE_1__util__.a.replaceObject({
                    obj: obj
                }, function(item, key) {
                    return isSerialized(item, __WEBPACK_IMPORTED_MODULE_0__conf__.a.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_0__conf__.a.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : void 0;
                }).obj;
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__("./node_modules/post-robot/src/lib/util.js"), __WEBPACK_IMPORTED_MODULE_2__interface__ = __webpack_require__("./node_modules/post-robot/src/interface.js"), __WEBPACK_IMPORTED_MODULE_3__log__ = __webpack_require__("./node_modules/post-robot/src/lib/log.js"), __WEBPACK_IMPORTED_MODULE_4__promise__ = __webpack_require__("./node_modules/post-robot/src/lib/promise.js"), __WEBPACK_IMPORTED_MODULE_5__global__ = __webpack_require__("./node_modules/post-robot/src/global.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return listenForMethods;
            }), __webpack_exports__.b = serializeMethods, __webpack_exports__.c = deserializeMethods;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            __WEBPACK_IMPORTED_MODULE_5__global__.a.methods = __WEBPACK_IMPORTED_MODULE_5__global__.a.methods || {};
            var listenForMethods = __WEBPACK_IMPORTED_MODULE_1__util__.a.once(function() {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__interface__.on)(__WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_NAMES.METHOD, {
                    window: "*",
                    origin: "*"
                }, function(_ref) {
                    var source = _ref.source, origin = _ref.origin, data = _ref.data, meth = __WEBPACK_IMPORTED_MODULE_5__global__.a.methods[data.id];
                    if (!meth) throw new Error("Could not find method with id: " + data.id);
                    if (meth.destination !== source) throw new Error("Method window does not match");
                    if (meth.domain && "*" !== meth.domain && origin !== meth.domain) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                    return __WEBPACK_IMPORTED_MODULE_3__log__.a.debug("Call local method", data.name, data.args), 
                    __WEBPACK_IMPORTED_MODULE_4__promise__.b.run(function() {
                        return meth.method.apply({
                            source: source,
                            origin: origin,
                            data: data
                        }, data.args);
                    }).then(function(result) {
                        return {
                            result: result,
                            id: data.id,
                            name: data.name
                        };
                    });
                });
            });
        },
        "./node_modules/post-robot/src/lib/promise.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_1__tick__ = __webpack_require__("./node_modules/post-robot/src/lib/tick.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return Promise;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return promise;
            });
            var Promise = __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a, promise = {
                Promise: Promise,
                run: function(method) {
                    return Promise.resolve().then(method);
                },
                nextTick: function(method) {
                    return new Promise(function(resolve, reject) {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__tick__.a)(function() {
                            return promise.run(method).then(resolve, reject);
                        });
                    });
                },
                method: function(_method) {
                    return function() {
                        var _this = this, _arguments = arguments;
                        return Promise.resolve().then(function() {
                            return _method.apply(_this, _arguments);
                        });
                    };
                },
                nodeify: function(prom, callback) {
                    if (!callback) return prom;
                    prom.then(function(result) {
                        callback(null, result);
                    }, function(err) {
                        callback(err);
                    });
                },
                deNodeify: function(method) {
                    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
                    return new Promise(function(resolve, reject) {
                        try {
                            return args.length < method.length ? method.apply(void 0, args.concat([ function(err, result) {
                                return err ? reject(err) : resolve(result);
                            } ])) : promise.run(function() {
                                return method.apply(void 0, args);
                            }).then(resolve, reject);
                        } catch (err) {
                            return reject(err);
                        }
                    });
                },
                map: function(items, method) {
                    for (var results = [], i = 0; i < items.length; i++) !function(i) {
                        results.push(promise.run(function() {
                            return method(items[i]);
                        }));
                    }(i);
                    return Promise.all(results);
                }
            };
        },
        "./node_modules/post-robot/src/lib/ready.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function initOnReady() {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__interface__.on)(__WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_NAMES.READY, {
                    window: "*",
                    domain: "*"
                }, function(event) {
                    for (var _iterator = __WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        var item = _ref;
                        if (item.win === event.source) return void item.promise.resolve(event);
                    }
                    __WEBPACK_IMPORTED_MODULE_5__global__.a.clean.push(__WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises, {
                        win: event.source,
                        promise: new __WEBPACK_IMPORTED_MODULE_4_sync_browser_mocks_src_promise__.a().resolve(event)
                    });
                });
                var parent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__windows__.getAncestor)();
                parent && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__interface__.send)(parent, __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_NAMES.READY, {}, {
                    domain: "*"
                }).catch(function(err) {
                    __WEBPACK_IMPORTED_MODULE_3__log__.a.debug(err.stack || err.toString());
                });
            }
            function onWindowReady(win) {
                for (var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", _iterator2 = __WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        if (_i2 = _iterator2.next(), _i2.done) break;
                        _ref2 = _i2.value;
                    }
                    var item = _ref2;
                    if (item.win === win) return item.promise;
                }
                var promise = new __WEBPACK_IMPORTED_MODULE_4_sync_browser_mocks_src_promise__.a();
                return __WEBPACK_IMPORTED_MODULE_5__global__.a.clean.push(__WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises, {
                    win: win,
                    promise: promise
                }), setTimeout(function() {
                    return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
                }, timeout), promise;
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__windows__ = __webpack_require__("./node_modules/post-robot/src/lib/windows.js"), __WEBPACK_IMPORTED_MODULE_2__interface__ = __webpack_require__("./node_modules/post-robot/src/interface.js"), __WEBPACK_IMPORTED_MODULE_3__log__ = __webpack_require__("./node_modules/post-robot/src/lib/log.js"), __WEBPACK_IMPORTED_MODULE_4_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_5__global__ = __webpack_require__("./node_modules/post-robot/src/global.js");
            __webpack_exports__.a = initOnReady, __webpack_exports__.b = onWindowReady, __WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises = __WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises || [];
        },
        "./node_modules/post-robot/src/lib/tick.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function nextTick(method) {
                queue.push(method), window.postMessage(tickMessageName, "*");
            }
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/post-robot/src/lib/util.js");
            __webpack_exports__.a = nextTick;
            var tickMessageName = "__nextTick__postRobot__" + __WEBPACK_IMPORTED_MODULE_0__util__.a.uniqueID(), queue = [];
            window.addEventListener("message", function(event) {
                if (event.data === tickMessageName) {
                    queue.shift().call();
                }
            });
        },
        "./node_modules/post-robot/src/lib/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return util;
            });
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, util = {
                once: function(method) {
                    if (!method) return method;
                    var called = !1;
                    return function() {
                        if (!called) return called = !0, method.apply(this, arguments);
                    };
                },
                noop: function() {},
                safeHasProp: function(obj, name) {
                    try {
                        return !!obj[name];
                    } catch (err) {
                        return !1;
                    }
                },
                safeGetProp: function(obj, name) {
                    try {
                        return obj[name];
                    } catch (err) {
                        return;
                    }
                },
                listen: function(win, event, handler) {
                    return win.addEventListener ? win.addEventListener(event, handler) : win.attachEvent("on" + event, handler), 
                    {
                        cancel: function() {
                            win.removeEventListener ? win.removeEventListener(event, handler) : win.detachEvent("on" + event, handler);
                        }
                    };
                },
                apply: function(method, context, args) {
                    return "function" == typeof method.apply ? method.apply(context, args) : method(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
                },
                find: function(collection, method, def) {
                    if (!collection) return def;
                    for (var i = 0; i < collection.length; i++) if (method(collection[i])) return collection[i];
                    return def;
                },
                map: function(collection, method) {
                    for (var results = [], i = 0; i < collection.length; i++) results.push(method(collection[i]));
                    return results;
                },
                some: function(collection, method) {
                    method = method || Boolean;
                    for (var i = 0; i < collection.length; i++) if (method(collection[i])) return !0;
                    return !1;
                },
                keys: function(mapping) {
                    var result = [];
                    for (var key in mapping) mapping.hasOwnProperty(key) && result.push(key);
                    return result;
                },
                values: function(mapping) {
                    var result = [];
                    for (var key in mapping) mapping.hasOwnProperty(key) && result.push(mapping[key]);
                    return result;
                },
                getByValue: function(mapping, value) {
                    for (var key in mapping) if (mapping.hasOwnProperty(key) && mapping[key] === value) return key;
                },
                uniqueID: function() {
                    var chars = "0123456789abcdef";
                    return "xxxxxxxxxx".replace(/./g, function() {
                        return chars.charAt(Math.floor(Math.random() * chars.length));
                    });
                },
                memoize: function(method) {
                    var results = {};
                    return function() {
                        var args = JSON.stringify(Array.prototype.slice.call(arguments));
                        return results.hasOwnProperty(args) || (results[args] = method.apply(this, arguments)), 
                        results[args];
                    };
                },
                extend: function(obj, source) {
                    if (!source) return obj;
                    for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
                    return obj;
                },
                each: function(obj, callback) {
                    if (Array.isArray(obj)) for (var i = 0; i < obj.length; i++) callback(obj[i], i); else if ("object" === (void 0 === obj ? "undefined" : _typeof(obj)) && null !== obj) for (var key in obj) obj.hasOwnProperty(key) && callback(obj[key], key);
                },
                replaceObject: function(obj, callback) {
                    var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
                    var newobj = Array.isArray(obj) ? [] : {};
                    return util.each(obj, function(item, key) {
                        var result = callback(item, key);
                        void 0 !== result ? newobj[key] = result : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item ? newobj[key] = util.replaceObject(item, callback, depth + 1) : newobj[key] = item;
                    }), newobj;
                },
                safeInterval: function(method, time) {
                    function runInterval() {
                        timeout = setTimeout(runInterval, time), method.call();
                    }
                    var timeout = void 0;
                    return timeout = setTimeout(runInterval, time), {
                        cancel: function() {
                            clearTimeout(timeout);
                        }
                    };
                },
                intervalTimeout: function(time, interval, method) {
                    var safeInterval = util.safeInterval(function() {
                        time -= interval, time = time <= 0 ? 0 : time, 0 === time && safeInterval.cancel(), 
                        method(time);
                    }, interval);
                    return safeInterval;
                },
                getDomain: function(win) {
                    if (win = win || window, win.mockDomain && 0 === win.mockDomain.indexOf(__WEBPACK_IMPORTED_MODULE_0__conf__.a.MOCK_PROTOCOL)) return win.mockDomain;
                    if (!win.location.protocol) throw new Error("Can not read window protocol");
                    if (win.location.protocol === __WEBPACK_IMPORTED_MODULE_0__conf__.a.FILE_PROTOCOL) return win.location.protocol + "//" + win.location.host;
                    if (!win.location.host) throw new Error("Can not read window host");
                    return win.location.protocol + "//" + win.location.host;
                },
                getDomainFromUrl: function(url) {
                    var domain = void 0;
                    return url.match(/^(https?|mock|file):\/\//) ? (domain = url, domain = domain.split("/").slice(0, 3).join("/")) : this.getDomain();
                },
                safeGet: function(obj, prop) {
                    var result = void 0;
                    try {
                        result = obj[prop];
                    } catch (err) {}
                    return result;
                }
            };
        },
        "./node_modules/post-robot/src/lib/windows.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isSameDomain(win) {
                for (var _iterator = __WEBPACK_IMPORTED_MODULE_1__global__.a.domainMatches, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var _match = _ref;
                    if (_match.win === win) return _match.match;
                }
                var match = void 0;
                try {
                    match = __WEBPACK_IMPORTED_MODULE_0__util__.a.getDomain(window) === __WEBPACK_IMPORTED_MODULE_0__util__.a.getDomain(win);
                } catch (err) {
                    match = !1;
                }
                return __WEBPACK_IMPORTED_MODULE_1__global__.a.clean.push(__WEBPACK_IMPORTED_MODULE_1__global__.a.domainMatches, {
                    win: win,
                    match: match
                }), domainMatchTimeout || (domainMatchTimeout = setTimeout(function() {
                    __WEBPACK_IMPORTED_MODULE_1__global__.a.domainMatches = [], domainMatchTimeout = null;
                }, 1)), match;
            }
            function getOpener(win) {
                if (win) try {
                    return win.opener;
                } catch (err) {
                    return;
                }
            }
            function getParent(win) {
                if (win) try {
                    if (win.parent && win.parent !== win) return win.parent;
                } catch (err) {
                    return;
                }
            }
            function getParents(win) {
                var result = [];
                try {
                    for (;win.parent !== win; ) result.push(win.parent), win = win.parent;
                } catch (err) {}
                return result;
            }
            function isAncestorParent(parent, child) {
                if (!parent || !child) return !1;
                var childParent = getParent(child);
                return childParent ? childParent === parent : getParents(child).indexOf(parent) !== -1;
            }
            function getFrames(win) {
                var result = [], frames = void 0;
                try {
                    frames = win.frames;
                } catch (err) {
                    frames = win;
                }
                var len = void 0;
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
                for (var _i2 = 0; _i2 < 100; _i2++) {
                    var _frame = void 0;
                    try {
                        _frame = frames[_i2];
                    } catch (err) {
                        return result;
                    }
                    if (!_frame) return result;
                    result.push(_frame);
                }
                return result;
            }
            function getAllChildFrames(win) {
                for (var result = [], _iterator2 = getFrames(win), _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i3 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i3++];
                    } else {
                        if (_i3 = _iterator2.next(), _i3.done) break;
                        _ref2 = _i3.value;
                    }
                    var frame = _ref2;
                    result.push(frame);
                    for (var _iterator3 = getAllChildFrames(frame), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray3) {
                            if (_i4 >= _iterator3.length) break;
                            _ref3 = _iterator3[_i4++];
                        } else {
                            if (_i4 = _iterator3.next(), _i4.done) break;
                            _ref3 = _i4.value;
                        }
                        var childFrame = _ref3;
                        result.push(childFrame);
                    }
                }
                return result;
            }
            function getAllFramesInWindow(win) {
                var result = getAllChildFrames(win);
                result.push(win);
                for (var _iterator4 = getParents(win), _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref4;
                    if (_isArray4) {
                        if (_i5 >= _iterator4.length) break;
                        _ref4 = _iterator4[_i5++];
                    } else {
                        if (_i5 = _iterator4.next(), _i5.done) break;
                        _ref4 = _i5.value;
                    }
                    var parent = _ref4;
                    result.push(parent);
                    for (var _iterator5 = getFrames(parent), _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                        var _ref5;
                        if (_isArray5) {
                            if (_i6 >= _iterator5.length) break;
                            _ref5 = _iterator5[_i6++];
                        } else {
                            if (_i6 = _iterator5.next(), _i6.done) break;
                            _ref5 = _i6.value;
                        }
                        var frame = _ref5;
                        result.indexOf(frame) === -1 && result.push(frame);
                    }
                }
                return result;
            }
            function getTop(win) {
                if (win) {
                    try {
                        if (win.top) return win.top;
                    } catch (err) {}
                    if (getParent(win) === win) return win;
                    try {
                        if (isAncestorParent(window, win)) return window.top;
                    } catch (err) {}
                    try {
                        if (isAncestorParent(win, window)) return window.top;
                    } catch (err) {}
                    for (var _iterator6 = getAllChildFrames(win), _isArray6 = Array.isArray(_iterator6), _i7 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator](); ;) {
                        var _ref6;
                        if (_isArray6) {
                            if (_i7 >= _iterator6.length) break;
                            _ref6 = _iterator6[_i7++];
                        } else {
                            if (_i7 = _iterator6.next(), _i7.done) break;
                            _ref6 = _i7.value;
                        }
                        var frame = _ref6;
                        try {
                            if (frame.top) return frame.top;
                        } catch (err) {}
                        if (getParent(frame) === frame) return frame;
                    }
                }
            }
            function isWindowClosed(win) {
                var allowMock = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
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
                    return !err || "Call was rejected by callee.\r\n" !== err.message;
                }
                return !!(allowMock && isSameDomain(win) && __WEBPACK_IMPORTED_MODULE_0__util__.a.safeGet(win, "mockclosed"));
            }
            function getUserAgent(win) {
                return win = win || window, win.navigator.mockUserAgent || win.navigator.userAgent;
            }
            function getFrameByName(win, name) {
                for (var winFrames = getFrames(win), _iterator7 = winFrames, _isArray7 = Array.isArray(_iterator7), _i8 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                    var _ref7;
                    if (_isArray7) {
                        if (_i8 >= _iterator7.length) break;
                        _ref7 = _iterator7[_i8++];
                    } else {
                        if (_i8 = _iterator7.next(), _i8.done) break;
                        _ref7 = _i8.value;
                    }
                    var childFrame = _ref7;
                    try {
                        if (isSameDomain(childFrame) && childFrame.name === name && winFrames.indexOf(childFrame) !== -1) return childFrame;
                    } catch (err) {}
                }
                try {
                    if (winFrames.indexOf(win.frames[name]) !== -1) return win.frames[name];
                } catch (err) {}
                try {
                    if (winFrames.indexOf(win[name]) !== -1) return win[name];
                } catch (err) {}
            }
            function findChildFrameByName(win, name) {
                var frame = getFrameByName(win, name);
                if (frame) return frame;
                for (var _iterator8 = getFrames(win), _isArray8 = Array.isArray(_iterator8), _i9 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator](); ;) {
                    var _ref8;
                    if (_isArray8) {
                        if (_i9 >= _iterator8.length) break;
                        _ref8 = _iterator8[_i9++];
                    } else {
                        if (_i9 = _iterator8.next(), _i9.done) break;
                        _ref8 = _i9.value;
                    }
                    var childFrame = _ref8, namedFrame = findChildFrameByName(childFrame, name);
                    if (namedFrame) return namedFrame;
                }
            }
            function findFrameByName(win, name) {
                var frame = void 0;
                return frame = getFrameByName(win, name), frame ? frame : findChildFrameByName(getTop(win), name);
            }
            function isParent(win, frame) {
                var frameParent = getParent(frame);
                if (frameParent) return frameParent === win;
                for (var _iterator9 = getFrames(win), _isArray9 = Array.isArray(_iterator9), _i10 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator](); ;) {
                    var _ref9;
                    if (_isArray9) {
                        if (_i10 >= _iterator9.length) break;
                        _ref9 = _iterator9[_i10++];
                    } else {
                        if (_i10 = _iterator9.next(), _i10.done) break;
                        _ref9 = _i10.value;
                    }
                    if (_ref9 === frame) return !0;
                }
                return !1;
            }
            function isOpener(parent, child) {
                return parent === getOpener(child);
            }
            function getAncestor(win) {
                win = win || window;
                var opener = getOpener(win);
                if (opener) return opener;
                var parent = getParent(win);
                return parent ? parent : void 0;
            }
            function getAncestors(win) {
                for (var results = [], ancestor = win; ancestor; ) (ancestor = getAncestor(ancestor)) && results.push(ancestor);
                return results;
            }
            function isAncestor(parent, child) {
                var actualParent = getAncestor(child);
                if (actualParent) return actualParent === parent;
                if (child === parent) return !1;
                if (getTop(child) === child) return !1;
                for (var _iterator10 = getFrames(parent), _isArray10 = Array.isArray(_iterator10), _i11 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator](); ;) {
                    var _ref10;
                    if (_isArray10) {
                        if (_i11 >= _iterator10.length) break;
                        _ref10 = _iterator10[_i11++];
                    } else {
                        if (_i11 = _iterator10.next(), _i11.done) break;
                        _ref10 = _i11.value;
                    }
                    if (_ref10 === child) return !0;
                }
                return !1;
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
            function getWindowType() {
                return isPopup() ? __WEBPACK_IMPORTED_MODULE_2__conf__.a.WINDOW_TYPES.POPUP : isIframe() ? __WEBPACK_IMPORTED_MODULE_2__conf__.a.WINDOW_TYPES.IFRAME : __WEBPACK_IMPORTED_MODULE_2__conf__.a.WINDOW_TYPES.FULLPAGE;
            }
            function anyMatch(collection1, collection2) {
                for (var _iterator11 = collection1, _isArray11 = Array.isArray(_iterator11), _i12 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator](); ;) {
                    var _ref11;
                    if (_isArray11) {
                        if (_i12 >= _iterator11.length) break;
                        _ref11 = _iterator11[_i12++];
                    } else {
                        if (_i12 = _iterator11.next(), _i12.done) break;
                        _ref11 = _i12.value;
                    }
                    for (var item1 = _ref11, _iterator12 = collection2, _isArray12 = Array.isArray(_iterator12), _i13 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator](); ;) {
                        var _ref12;
                        if (_isArray12) {
                            if (_i13 >= _iterator12.length) break;
                            _ref12 = _iterator12[_i13++];
                        } else {
                            if (_i13 = _iterator12.next(), _i13.done) break;
                            _ref12 = _i13.value;
                        }
                        if (item1 === _ref12) return !0;
                    }
                }
            }
            function isSameTopWindow(win1, win2) {
                var top1 = getTop(win1), top2 = getTop(win2);
                try {
                    if (top1 && top2) return top1 === top2;
                } catch (err) {}
                var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
                if (anyMatch(allFrames1, allFrames2)) return !0;
                var opener1 = getOpener(top1), opener2 = getOpener(top2);
                return (!opener1 || !anyMatch(getAllFramesInWindow(opener1), allFrames2)) && ((!opener2 || !anyMatch(getAllFramesInWindow(opener2), allFrames1)) && void 0);
            }
            function jsonStringify() {
                var objectToJSON = void 0, arrayToJSON = void 0;
                try {
                    if ("{}" !== JSON.stringify({}) && (objectToJSON = Object.prototype.toJSON, delete Object.prototype.toJSON), 
                    "{}" !== JSON.stringify({})) throw new Error("Can not correctly serialize JSON objects");
                    if ("[]" !== JSON.stringify([]) && (arrayToJSON = Array.prototype.toJSON, delete Array.prototype.toJSON), 
                    "[]" !== JSON.stringify([])) throw new Error("Can not correctly serialize JSON objects");
                } catch (err) {
                    throw new Error("Can not repair JSON.stringify: " + err.message);
                }
                var result = JSON.stringify.apply(this, arguments);
                try {
                    objectToJSON && (Object.prototype.toJSON = objectToJSON), arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
                } catch (err) {
                    throw new Error("Can not repair JSON.stringify: " + err.message);
                }
                return result;
            }
            function jsonParse() {
                return JSON.parse.apply(this, arguments);
            }
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/post-robot/src/lib/util.js"), __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__("./node_modules/post-robot/src/global.js"), __WEBPACK_IMPORTED_MODULE_2__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
            __webpack_exports__.isSameDomain = isSameDomain, __webpack_exports__.getOpener = getOpener, 
            __webpack_exports__.getParent = getParent, __webpack_exports__.getParents = getParents, 
            __webpack_exports__.isAncestorParent = isAncestorParent, __webpack_exports__.getFrames = getFrames, 
            __webpack_exports__.getAllChildFrames = getAllChildFrames, __webpack_exports__.getAllFramesInWindow = getAllFramesInWindow, 
            __webpack_exports__.getTop = getTop, __webpack_exports__.isWindowClosed = isWindowClosed, 
            __webpack_exports__.getUserAgent = getUserAgent, __webpack_exports__.getFrameByName = getFrameByName, 
            __webpack_exports__.findChildFrameByName = findChildFrameByName, __webpack_exports__.findFrameByName = findFrameByName, 
            __webpack_exports__.isParent = isParent, __webpack_exports__.isOpener = isOpener, 
            __webpack_exports__.getAncestor = getAncestor, __webpack_exports__.getAncestors = getAncestors, 
            __webpack_exports__.isAncestor = isAncestor, __webpack_exports__.isPopup = isPopup, 
            __webpack_exports__.isIframe = isIframe, __webpack_exports__.isFullpage = isFullpage, 
            __webpack_exports__.getWindowType = getWindowType, __webpack_exports__.isSameTopWindow = isSameTopWindow, 
            __webpack_exports__.jsonStringify = jsonStringify, __webpack_exports__.jsonParse = jsonParse, 
            __WEBPACK_IMPORTED_MODULE_1__global__.a.domainMatches = __WEBPACK_IMPORTED_MODULE_1__global__.a.domainMatches || [];
            var domainMatchTimeout = void 0;
        },
        "./node_modules/post-robot/src/public/client.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function request(options) {
                return __WEBPACK_IMPORTED_MODULE_3__lib__.f.nodeify(new __WEBPACK_IMPORTED_MODULE_3__lib__.f.Promise(function(resolve, reject) {
                    if (!options.name) throw new Error("Expected options.name");
                    if (__WEBPACK_IMPORTED_MODULE_0__conf__.b.MOCK_MODE) options.window = window; else if ("string" == typeof options.window) {
                        var el = document.getElementById(options.window);
                        if (!el) throw new Error("Expected options.window " + options.window + " to be a valid element id");
                        if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + options.window + " to be an iframe");
                        if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        options.window = el.contentWindow;
                    } else if (options.window instanceof HTMLElement) {
                        if ("iframe" !== options.window.tagName.toLowerCase()) throw new Error("Expected options.window " + options.window + " to be an iframe");
                        if (!options.window.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        options.window = options.window.contentWindow;
                    }
                    if (!options.window) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                    options.domain = options.domain || "*";
                    var hash = options.name + "_" + __WEBPACK_IMPORTED_MODULE_3__lib__.e.uniqueID();
                    if (__WEBPACK_IMPORTED_MODULE_2__global__.a.clean.setItem(__WEBPACK_IMPORTED_MODULE_2__global__.a.listeners.response, hash, options), 
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.p)(options.window)) throw new Error("Target window is closed");
                    var hasResult = !1;
                    return options.respond = function(err, result) {
                        return err || (hasResult = !0), err ? reject(err) : resolve(result);
                    }, __WEBPACK_IMPORTED_MODULE_3__lib__.f.run(function() {
                        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.v)(window, options.window)) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.h)(options.window);
                    }).then(function() {
                        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__drivers__.f)(options.window, {
                            hash: hash,
                            type: __WEBPACK_IMPORTED_MODULE_0__conf__.a.POST_MESSAGE_TYPE.REQUEST,
                            name: options.name,
                            data: options.data,
                            fireAndForget: options.fireAndForget
                        }, options.domain).catch(reject), options.fireAndForget) return resolve();
                        var ackTimeout = __WEBPACK_IMPORTED_MODULE_3__lib__.e.intervalTimeout(__WEBPACK_IMPORTED_MODULE_0__conf__.b.ACK_TIMEOUT, 100, function(remaining) {
                            return options.ack || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.p)(options.window) ? ackTimeout.cancel() : remaining ? void 0 : reject(new Error("No ack for postMessage " + options.name + " in " + __WEBPACK_IMPORTED_MODULE_0__conf__.b.ACK_TIMEOUT + "ms"));
                        });
                        if (options.timeout) var timeout = __WEBPACK_IMPORTED_MODULE_3__lib__.e.intervalTimeout(options.timeout, 100, function(remaining) {
                            return hasResult || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.p)(options.window) ? timeout.cancel() : remaining ? void 0 : reject(new Error("Post message response timed out after " + options.timeout + " ms"));
                        }, options.timeout);
                    }).catch(reject);
                }), options.callback);
            }
            function _send(window, name, data, options, callback) {
                return callback || (options || "function" != typeof data ? "function" == typeof options && (callback = options, 
                options = {}) : (callback = data, options = {}, data = {})), options = options || {}, 
                options.window = window, options.name = name, options.data = data, options.callback = callback, 
                request(options);
            }
            function sendToParent(name, data, options, callback) {
                var win = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.w)();
                return win ? _send(win, name, data, options, callback) : new __WEBPACK_IMPORTED_MODULE_3__lib__.f.Promise(function(resolve, reject) {
                    return reject(new Error("Window does not have a parent"));
                });
            }
            function client() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!options.window) throw new Error("Expected options.window");
                return {
                    send: function(name, data, callback) {
                        return _send(options.window, name, data, options, callback);
                    }
                };
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__drivers__ = __webpack_require__("./node_modules/post-robot/src/drivers/index.js"), __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__("./node_modules/post-robot/src/global.js"), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return _send;
            }), __webpack_exports__.b = request, __webpack_exports__.c = sendToParent, __webpack_exports__.d = client;
        },
        "./node_modules/post-robot/src/public/config.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function enableMockMode() {
                __WEBPACK_IMPORTED_MODULE_0__conf__.b.MOCK_MODE = !0;
            }
            function disableMockMode() {
                __WEBPACK_IMPORTED_MODULE_0__conf__.b.MOCK_MODE = !1;
            }
            function disable() {
                delete window[__WEBPACK_IMPORTED_MODULE_0__conf__.a.WINDOW_PROPS.POSTROBOT], window.removeEventListener("message", __WEBPACK_IMPORTED_MODULE_1__drivers__.c);
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__drivers__ = __webpack_require__("./node_modules/post-robot/src/drivers/index.js");
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_0__conf__.b;
            }), __webpack_require__.d(__webpack_exports__, "d", function() {
                return __WEBPACK_IMPORTED_MODULE_0__conf__.a;
            }), __webpack_exports__.a = enableMockMode, __webpack_exports__.b = disableMockMode, 
            __webpack_exports__.e = disable;
        },
        "./node_modules/post-robot/src/public/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__lib_windows__ = __webpack_require__("./node_modules/post-robot/src/lib/windows.js"), __WEBPACK_IMPORTED_MODULE_1__client__ = __webpack_require__("./node_modules/post-robot/src/public/client.js");
            __webpack_require__.d(__webpack_exports__, "m", function() {
                return __WEBPACK_IMPORTED_MODULE_1__client__.a;
            }), __webpack_require__.d(__webpack_exports__, "n", function() {
                return __WEBPACK_IMPORTED_MODULE_1__client__.b;
            }), __webpack_require__.d(__webpack_exports__, "o", function() {
                return __WEBPACK_IMPORTED_MODULE_1__client__.c;
            }), __webpack_require__.d(__webpack_exports__, "p", function() {
                return __WEBPACK_IMPORTED_MODULE_1__client__.d;
            });
            var __WEBPACK_IMPORTED_MODULE_2__server__ = __webpack_require__("./node_modules/post-robot/src/public/server.js");
            __webpack_require__.d(__webpack_exports__, "q", function() {
                return __WEBPACK_IMPORTED_MODULE_2__server__.a;
            }), __webpack_require__.d(__webpack_exports__, "r", function() {
                return __WEBPACK_IMPORTED_MODULE_2__server__.b;
            }), __webpack_require__.d(__webpack_exports__, "s", function() {
                return __WEBPACK_IMPORTED_MODULE_2__server__.c;
            }), __webpack_require__.d(__webpack_exports__, "t", function() {
                return __WEBPACK_IMPORTED_MODULE_2__server__.d;
            });
            var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__("./node_modules/post-robot/src/public/config.js");
            __webpack_require__.d(__webpack_exports__, "u", function() {
                return __WEBPACK_IMPORTED_MODULE_3__config__.a;
            }), __webpack_require__.d(__webpack_exports__, "v", function() {
                return __WEBPACK_IMPORTED_MODULE_3__config__.b;
            }), __webpack_require__.d(__webpack_exports__, "w", function() {
                return __WEBPACK_IMPORTED_MODULE_3__config__.c;
            }), __webpack_require__.d(__webpack_exports__, "x", function() {
                return __WEBPACK_IMPORTED_MODULE_3__config__.d;
            }), __webpack_require__.d(__webpack_exports__, "y", function() {
                return __WEBPACK_IMPORTED_MODULE_3__config__.e;
            });
            var __WEBPACK_IMPORTED_MODULE_4__bridge__ = __webpack_require__("./node_modules/post-robot/src/bridge/index.js");
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__bridge__, "openBridge") && __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_4__bridge__.openBridge;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__bridge__, "linkUrl") && __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_4__bridge__.linkUrl;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__bridge__, "isBridge") && __webpack_require__.d(__webpack_exports__, "d", function() {
                return __WEBPACK_IMPORTED_MODULE_4__bridge__.isBridge;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__bridge__, "needsBridge") && __webpack_require__.d(__webpack_exports__, "e", function() {
                return __WEBPACK_IMPORTED_MODULE_4__bridge__.needsBridge;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__bridge__, "needsBridgeForBrowser") && __webpack_require__.d(__webpack_exports__, "f", function() {
                return __WEBPACK_IMPORTED_MODULE_4__bridge__.needsBridgeForBrowser;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__bridge__, "needsBridgeForWin") && __webpack_require__.d(__webpack_exports__, "g", function() {
                return __WEBPACK_IMPORTED_MODULE_4__bridge__.needsBridgeForWin;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__bridge__, "needsBridgeForDomain") && __webpack_require__.d(__webpack_exports__, "h", function() {
                return __WEBPACK_IMPORTED_MODULE_4__bridge__.needsBridgeForDomain;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__bridge__, "openTunnelToOpener") && __webpack_require__.d(__webpack_exports__, "i", function() {
                return __WEBPACK_IMPORTED_MODULE_4__bridge__.openTunnelToOpener;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__bridge__, "destroyBridges") && __webpack_require__.d(__webpack_exports__, "j", function() {
                return __WEBPACK_IMPORTED_MODULE_4__bridge__.destroyBridges;
            });
            var __WEBPACK_IMPORTED_MODULE_5__lib_util__ = __webpack_require__("./node_modules/post-robot/src/lib/util.js");
            __webpack_require__.d(__webpack_exports__, "k", function() {
                return __WEBPACK_IMPORTED_MODULE_5__lib_util__.a;
            }), __webpack_require__.d(__webpack_exports__, "a", function() {
                return parent;
            }), __webpack_require__.d(__webpack_exports__, "l", function() {
                return winutil;
            });
            var parent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_windows__.getAncestor)(), winutil = __WEBPACK_IMPORTED_MODULE_0__lib_windows__;
        },
        "./node_modules/post-robot/src/public/server.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function listen(options) {
                if (!options.name) throw new Error("Expected options.name");
                if (options.handler = options.handler || __WEBPACK_IMPORTED_MODULE_1__lib__.e.noop, 
                options.errorHandler = options.errorHandler || function(err) {
                    throw err;
                }, options.once) {
                    var handler = options.handler;
                    options.handler = __WEBPACK_IMPORTED_MODULE_1__lib__.e.once(function() {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__drivers__.d)(options), 
                        handler.apply(this, arguments);
                    });
                }
                var override = options.override || __WEBPACK_IMPORTED_MODULE_0__conf__.b.MOCK_MODE;
                if (options.source && (options.window = options.source), options.domain = options.domain || "*", 
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__drivers__.e)(options.name, options.window, options.domain, options, override), 
                options.handleError = function(err) {
                    options.errorHandler(err);
                }, options.window && options.errorOnClose) var interval = __WEBPACK_IMPORTED_MODULE_1__lib__.e.safeInterval(function() {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.p)(options.window) && (interval.cancel(), 
                    options.handleError(new Error("Post message target window is closed")));
                }, 50);
                return {
                    cancel: function() {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__drivers__.d)(options);
                    }
                };
            }
            function _on(name, options, handler, errorHandler) {
                return "function" == typeof options && (errorHandler = handler, handler = options, 
                options = {}), options = options || {}, options.name = name, options.handler = handler || options.handler, 
                options.errorHandler = errorHandler || options.errorHandler, listen(options);
            }
            function once(name, options, handler, errorHandler) {
                "function" == typeof options && (errorHandler = handler, handler = options, options = {}), 
                options = options || {}, options.name = name, options.handler = handler || options.handler, 
                options.errorHandler = errorHandler || options.errorHandler, options.once = !0;
                var prom = new __WEBPACK_IMPORTED_MODULE_1__lib__.f.Promise(function(resolve, reject) {
                    options.handler = options.handler || function(event) {
                        return resolve(event);
                    }, options.errorHandler = options.errorHandler || reject;
                }), myListener = listen(options);
                return __WEBPACK_IMPORTED_MODULE_1__lib__.e.extend(prom, myListener), prom;
            }
            function listener() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return {
                    on: function(name, handler, errorHandler) {
                        return _on(name, options, handler, errorHandler);
                    }
                };
            }
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_2__drivers__ = __webpack_require__("./node_modules/post-robot/src/drivers/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return _on;
            }), __webpack_exports__.b = listen, __webpack_exports__.c = once, __webpack_exports__.d = listener;
        },
        "./node_modules/sync-browser-mocks/src/promise.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function trycatch(method, successHandler, errorHandler) {
                function flush() {
                    if (isCalled) {
                        if (isError) return errorHandler(err);
                        if (isSuccess) return successHandler(res);
                    }
                }
                var isCalled = !1, isSuccess = !1, isError = !1, err = void 0, res = void 0;
                try {
                    method(function(result) {
                        res = result, isSuccess = !0, flush();
                    }, function(error) {
                        err = error, isError = !0, flush();
                    });
                } catch (error) {
                    return errorHandler(error);
                }
                isCalled = !0, flush();
            }
            function addPossiblyUnhandledPromise(promise) {
                possiblyUnhandledPromises.push(promise), possiblyUnhandledPromiseTimeout = possiblyUnhandledPromiseTimeout || setTimeout(flushPossiblyUnhandledPromises, 1);
            }
            function flushPossiblyUnhandledPromises() {
                possiblyUnhandledPromiseTimeout = null;
                var promises = possiblyUnhandledPromises;
                possiblyUnhandledPromises = [];
                for (var i = 0; i < promises.length; i++) {
                    (function(i) {
                        var promise = promises[i];
                        if (promise.silentReject) return "continue";
                        promise.handlers.push({
                            onError: function(err) {
                                promise.silentReject || dispatchError(err);
                            }
                        }), promise.dispatch();
                    })(i);
                }
            }
            function dispatchError(err) {
                if (dispatchedErrors.indexOf(err) === -1) {
                    dispatchedErrors.push(err), setTimeout(function() {
                        throw err;
                    }, 1);
                    for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err);
                }
            }
            function isPromise(item) {
                try {
                    if (!item) return !1;
                    if (window.Window && item instanceof window.Window) return !1;
                    if (window.constructor && item instanceof window.constructor) return !1;
                    if (toString) {
                        var name = toString.call(item);
                        if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                    }
                    if (item && item.then instanceof Function) return !0;
                } catch (err) {
                    return !1;
                }
                return !1;
            }
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return SyncPromise;
            });
            var possiblyUnhandledPromiseHandlers = [], possiblyUnhandledPromises = [], possiblyUnhandledPromiseTimeout = void 0, dispatchedErrors = [], toString = {}.toString, SyncPromise = function(handler) {
                if (this.resolved = !1, this.rejected = !1, this.silentReject = !1, this.handlers = [], 
                addPossiblyUnhandledPromise(this), handler) {
                    var self = this;
                    trycatch(handler, function(res) {
                        return self.resolve(res);
                    }, function(err) {
                        return self.reject(err);
                    });
                }
            };
            SyncPromise.resolve = function(value) {
                return isPromise(value) ? value : new SyncPromise().resolve(value);
            }, SyncPromise.reject = function(error) {
                return new SyncPromise().reject(error);
            }, SyncPromise.prototype.resolve = function(result) {
                if (this.resolved || this.rejected) return this;
                if (isPromise(result)) throw new Error("Can not resolve promise with another promise");
                return this.resolved = !0, this.value = result, this.dispatch(), this;
            }, SyncPromise.prototype.reject = function(error) {
                if (this.resolved || this.rejected) return this;
                if (isPromise(error)) throw new Error("Can not reject promise with another promise");
                return this.rejected = !0, this.value = error, this.dispatch(), this;
            }, SyncPromise.prototype.asyncReject = function(error) {
                this.silentReject = !0, this.reject(error);
            }, SyncPromise.prototype.dispatch = function() {
                var _this = this;
                if (this.resolved || this.rejected) for (;this.handlers.length; ) {
                    (function() {
                        var handler = _this.handlers.shift(), result = void 0, error = void 0;
                        try {
                            _this.resolved ? result = handler.onSuccess ? handler.onSuccess(_this.value) : _this.value : _this.rejected && (handler.onError ? result = handler.onError(_this.value) : error = _this.value);
                        } catch (err) {
                            error = err;
                        }
                        if (result === _this) throw new Error("Can not return a promise from the the then handler of the same promise");
                        if (!handler.promise) return "continue";
                        error ? handler.promise.reject(error) : isPromise(result) ? result.then(function(res) {
                            handler.promise.resolve(res);
                        }, function(err) {
                            handler.promise.reject(err);
                        }) : handler.promise.resolve(result);
                    })();
                }
            }, SyncPromise.prototype.then = function(onSuccess, onError) {
                if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                var promise = new SyncPromise(null, this);
                return this.handlers.push({
                    promise: promise,
                    onSuccess: onSuccess,
                    onError: onError
                }), this.silentReject = !0, this.dispatch(), promise;
            }, SyncPromise.prototype.catch = function(onError) {
                return this.then(null, onError);
            }, SyncPromise.prototype.finally = function(handler) {
                return this.then(function(result) {
                    return SyncPromise.try(handler).then(function() {
                        return result;
                    });
                }, function(err) {
                    return SyncPromise.try(handler).then(function() {
                        throw err;
                    });
                });
            }, SyncPromise.all = function(promises) {
                for (var promise = new SyncPromise(), count = promises.length, results = [], i = 0; i < promises.length; i++) !function(i) {
                    (isPromise(promises[i]) ? promises[i] : SyncPromise.resolve(promises[i])).then(function(result) {
                        results[i] = result, 0 == (count -= 1) && promise.resolve(results);
                    }, function(err) {
                        promise.reject(err);
                    });
                }(i);
                return count || promise.resolve(results), promise;
            }, SyncPromise.onPossiblyUnhandledException = function(handler) {
                possiblyUnhandledPromiseHandlers.push(handler);
            }, SyncPromise.try = function(method) {
                return SyncPromise.resolve().then(method);
            }, SyncPromise.delay = function(delay) {
                return new SyncPromise(function(resolve) {
                    setTimeout(resolve, delay);
                });
            }, SyncPromise.hash = function(obj) {
                var results = {}, promises = [];
                for (var key in obj) !function(key) {
                    obj.hasOwnProperty(key) && promises.push(SyncPromise.resolve(obj[key]).then(function(result) {
                        results[key] = result;
                    }));
                }(key);
                return SyncPromise.all(promises).then(function() {
                    return results;
                });
            }, SyncPromise.promisifyCall = function() {
                var args = Array.prototype.slice.call(arguments), method = args.shift();
                if ("function" != typeof method) throw new Error("Expected promisifyCall to be called with a function");
                return new SyncPromise(function(resolve, reject) {
                    return args.push(function(err, result) {
                        return err ? reject(err) : resolve(result);
                    }), method.apply(null, args);
                });
            };
        },
        "./node_modules/webpack/buildin/global.js": function(module, exports) {
            var g, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            g = function() {
                return this;
            }();
            try {
                g = g || Function("return this")() || (0, eval)("this");
            } catch (e) {
                "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) && (g = window);
            }
            module.exports = g;
        },
        "./node_modules/xcomponent/src/component/base.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function cleanup(obj) {
                var tasks = [];
                return {
                    set: function(name, item) {
                        return obj[name] = item, this.register(function() {
                            delete obj[name];
                        }), item;
                    },
                    register: function(name, method) {
                        method || (method = name, name = void 0), tasks.push({
                            complete: !1,
                            name: name,
                            run: function() {
                                if (!this.complete) return this.complete = !0, method();
                            }
                        });
                    },
                    hasTasks: function() {
                        return Boolean(tasks.filter(function(item) {
                            return !item.complete;
                        }).length);
                    },
                    all: function() {
                        for (var results = []; tasks.length; ) results.push(tasks.pop().run());
                        return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.all(results).then(function() {});
                    },
                    run: function(name) {
                        for (var results = [], _iterator = tasks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if (_i = _iterator.next(), _i.done) break;
                                _ref = _i.value;
                            }
                            var item = _ref;
                            item.name === name && results.push(item.run());
                        }
                        return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.all(results).then(function() {});
                    }
                };
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_1_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return BaseComponent;
            });
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), BaseComponent = function() {
                function BaseComponent() {
                    _classCallCheck(this, BaseComponent), this.clean = cleanup(this);
                }
                return _createClass(BaseComponent, [ {
                    key: "addProp",
                    value: function(options, name, def) {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.m)(options, this, name, def);
                    }
                }, {
                    key: "tryCatch",
                    value: function(method, doOnce) {
                        var self = this, errored = !1, wrapper = function() {
                            if (!errored) try {
                                return method.apply(this, arguments);
                            } catch (err) {
                                return errored = !0, self.error(err);
                            }
                        };
                        return doOnce !== !1 && (wrapper = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.n)(wrapper)), 
                        wrapper;
                    }
                }, {
                    key: "listen",
                    value: function(win, domain) {
                        var _this = this;
                        if (!win) throw new Error("[" + this.component.tag + "] window to listen to not set");
                        if (!domain) throw new Error("Must pass domain to listen to");
                        if (this.listeners) for (var listeners = this.listeners(), _iterator2 = Object.keys(listeners), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                            var _ref2, _ret = function() {
                                if (_isArray2) {
                                    if (_i2 >= _iterator2.length) return "break";
                                    _ref2 = _iterator2[_i2++];
                                } else {
                                    if (_i2 = _iterator2.next(), _i2.done) return "break";
                                    _ref2 = _i2.value;
                                }
                                var listenerName = _ref2, name = listenerName.replace(/^xcomponent_/, ""), listener = __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.on(listenerName, {
                                    window: win,
                                    domain: domain,
                                    errorHandler: function(err) {
                                        return _this.error(err);
                                    }
                                }, function(_ref3) {
                                    var source = _ref3.source, data = _ref3.data;
                                    return _this.component.log("listener_" + name), listeners[listenerName].call(_this, source, data);
                                }), errorListener = __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.on(listenerName, {
                                    window: win,
                                    errorHandler: function(err) {
                                        return _this.error(err);
                                    }
                                }, function(_ref4) {
                                    var origin = _ref4.origin;
                                    _ref4.data;
                                    _this.component.logError("unexpected_listener_" + name, {
                                        origin: origin,
                                        domain: domain
                                    }), _this.error(new Error("Unexpected " + name + " message from domain " + origin + " -- expected message from " + domain));
                                });
                                _this.clean.register(function() {
                                    listener.cancel(), errorListener.cancel();
                                });
                            }();
                            if ("break" === _ret) break;
                        }
                    }
                } ]), BaseComponent;
            }();
        },
        "./node_modules/xcomponent/src/component/child/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            var __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_1_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_3__base__ = __webpack_require__("./node_modules/xcomponent/src/component/base.js"), __WEBPACK_IMPORTED_MODULE_4__window__ = __webpack_require__("./node_modules/xcomponent/src/component/window.js"), __WEBPACK_IMPORTED_MODULE_5__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__("./node_modules/xcomponent/src/constants.js"), __WEBPACK_IMPORTED_MODULE_7__props__ = __webpack_require__("./node_modules/xcomponent/src/component/child/props.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return ChildComponent;
            });
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), ChildComponent = function(_BaseComponent) {
                function ChildComponent(component) {
                    _classCallCheck(this, ChildComponent);
                    var _this = _possibleConstructorReturn(this, (ChildComponent.__proto__ || Object.getPrototypeOf(ChildComponent)).call(this, component));
                    return _this.component = component, _this.sendLogsToOpener(), _this.component.log("construct_child"), 
                    _this.onPropHandlers = [], _this.setProps(_this.getInitialProps(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.a)()), 
                    _this.component.log("init_child"), _this.setWindows(), _this.onInit = _this.sendToParent(__WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.INIT, {
                        exports: _this.exports()
                    }).then(function(_ref) {
                        var origin = _ref.origin, data = _ref.data;
                        return _this.context = data.context, window.xprops = _this.props = {}, _this.setProps(data.props, origin), 
                        _this.watchForResize(), _this;
                    }).catch(function(err) {
                        throw _this.error(err), err;
                    }), _this;
                }
                return _inherits(ChildComponent, _BaseComponent), _createClass(ChildComponent, [ {
                    key: "init",
                    value: function() {
                        return this.onInit;
                    }
                }, {
                    key: "onProps",
                    value: function(handler) {
                        this.onPropHandlers.push(handler);
                    }
                }, {
                    key: "getParentComponentWindow",
                    value: function() {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.b)();
                    }
                }, {
                    key: "getParentRenderWindow",
                    value: function() {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.c)();
                    }
                }, {
                    key: "getInitialProps",
                    value: function() {
                        var componentMeta = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.d)(), self = this;
                        if (componentMeta) {
                            var props = componentMeta.props;
                            if (props.type === __WEBPACK_IMPORTED_MODULE_6__constants__.INITIAL_PROPS.RAW) props = props.value; else {
                                if (props.type !== __WEBPACK_IMPORTED_MODULE_6__constants__.INITIAL_PROPS.UID) throw new Error("Unrecognized props type: " + props.type);
                                var parentComponentWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.b)();
                                if (!__WEBPACK_IMPORTED_MODULE_1_post_robot_src__.winutil.isSameDomain(parentComponentWindow)) throw new Error("Parent component window is on a different domain - expected " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.b)() + " - can not retrieve props");
                                props = parentComponentWindow.__xcomponent__.props[componentMeta.uid];
                            }
                            if (!props) throw new Error("Initial props not found");
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.c)(props, function(value, key, fullKey) {
                                if (value && "__function__" === value.__type__) return function() {
                                    var _this2 = this, _arguments = arguments;
                                    return self.onInit.then(function() {
                                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.d)(self.props, fullKey).apply(_this2, _arguments);
                                    });
                                };
                            });
                        }
                    }
                }, {
                    key: "setProps",
                    value: function() {
                        var props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, origin = arguments[1], required = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        window.xprops = this.props = this.props || {}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.e)(this.props, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__props__.a)(this.component, props, origin, required));
                        for (var _iterator = this.onPropHandlers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref2;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref2 = _iterator[_i++];
                            } else {
                                if (_i = _iterator.next(), _i.done) break;
                                _ref2 = _i.value;
                            }
                            _ref2.call(this, this.props);
                        }
                    }
                }, {
                    key: "sendToParent",
                    value: function(name, data) {
                        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.b)()) throw new Error("Can not find parent component window to message");
                        return this.component.log("send_to_parent_" + name), __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.send(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.b)(), name, data, {
                            domain: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.a)()
                        });
                    }
                }, {
                    key: "setWindows",
                    value: function() {
                        if (window.__activeXComponent__) throw new Error("[" + this.component.tag + "] Can not attach multiple components to the same window");
                        if (window.__activeXComponent__ = this, !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.b)()) throw new Error("[" + this.component.tag + "] Can not find parent window");
                        var componentMeta = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.d)();
                        if (componentMeta.tag !== this.component.tag) throw new Error("[" + this.component.tag + "] Parent is " + componentMeta.tag + " - can not attach " + this.component.tag);
                        this.watchForClose();
                    }
                }, {
                    key: "sendLogsToOpener",
                    value: function() {
                        try {
                            var opener = __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.winutil.getOpener(window);
                            if (!opener || !window.console) return;
                            _loop2: for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.winutil.getAllFramesInWindow(opener), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                                var _ref3, _ret = function() {
                                    if (_isArray2) {
                                        if (_i2 >= _iterator2.length) return "break";
                                        _ref3 = _iterator2[_i2++];
                                    } else {
                                        if (_i2 = _iterator2.next(), _i2.done) return "break";
                                        _ref3 = _i2.value;
                                    }
                                    var frame = _ref3;
                                    if (!__WEBPACK_IMPORTED_MODULE_1_post_robot_src__.winutil.isSameDomain(frame) || !frame.console || frame === window) return "continue";
                                    for (var _arr = [ "log", "debug", "info", "warn", "error" ], _i3 = 0; _i3 < _arr.length; _i3++) {
                                        (function() {
                                            var level = _arr[_i3], original = window.console[level];
                                            if (!original) return "continue";
                                            try {
                                                window.console[level] = function() {
                                                    try {
                                                        return frame.console[level].apply(frame.console, arguments);
                                                    } catch (err3) {}
                                                    return original.apply(this, arguments);
                                                };
                                            } catch (err2) {}
                                        })();
                                    }
                                    return {
                                        v: void 0
                                    };
                                }();
                                switch (_ret) {
                                  case "break":
                                    break _loop2;

                                  case "continue":
                                    continue;

                                  default:
                                    if ("object" === (void 0 === _ret ? "undefined" : _typeof(_ret))) return _ret.v;
                                }
                            }
                        } catch (err) {}
                    }
                }, {
                    key: "watchForClose",
                    value: function() {
                        var _this3 = this;
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.f)(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.b)(), function() {
                            if (_this3.component.log("parent_window_closed"), _this3.context === __WEBPACK_IMPORTED_MODULE_6__constants__.CONTEXT_TYPES.POPUP) return _this3.destroy();
                        });
                    }
                }, {
                    key: "autoResize",
                    value: function autoResize() {
                        var width = !1, height = !1, autoResize = this.component.autoResize;
                        return "object" === (void 0 === autoResize ? "undefined" : _typeof(autoResize)) ? (width = Boolean(autoResize.width), 
                        height = Boolean(autoResize.height)) : autoResize && (width = !0, height = !0), 
                        {
                            width: width,
                            height: height
                        };
                    }
                }, {
                    key: "watchForResize",
                    value: function() {
                        var _this4 = this, _autoResize = this.autoResize(), width = _autoResize.width, height = _autoResize.height;
                        if ((width || height) && this.component.dimensions && this.context !== __WEBPACK_IMPORTED_MODULE_6__constants__.CONTEXT_TYPES.POPUP) {
                            var el = document.documentElement;
                            return window.navigator.userAgent.match(/MSIE (9|10)\./) && (el = document.body), 
                            __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.g)(el, {
                                    width: width,
                                    height: height
                                })) return _this4.resizeToElement(el, {
                                    width: width,
                                    height: height
                                });
                            }).then(function() {
                                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.h)(function() {
                                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.i)(el, {
                                        width: width,
                                        height: height
                                    }).then(function(dimensions) {
                                        return _this4.resizeToElement(el, {
                                            width: width,
                                            height: height
                                        });
                                    });
                                });
                            });
                        }
                    }
                }, {
                    key: "exports",
                    value: function() {
                        var self = this;
                        return {
                            updateProps: function(props) {
                                return self.setProps(props, this.origin, !1);
                            },
                            close: function() {
                                return self.destroy();
                            }
                        };
                    }
                }, {
                    key: "resize",
                    value: function(width, height) {
                        var _this5 = this;
                        return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.resolve().then(function() {
                            if (_this5.component.log("resize", {
                                width: width,
                                height: height
                            }), _this5.context !== __WEBPACK_IMPORTED_MODULE_6__constants__.CONTEXT_TYPES.POPUP) return _this5.sendToParent(__WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.RESIZE, {
                                width: width,
                                height: height
                            });
                        });
                    }
                }, {
                    key: "resizeToElement",
                    value: function(el, _ref4) {
                        var _this6 = this, width = _ref4.width, height = _ref4.height, history = [];
                        return function resize() {
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                for (var tracker = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.j)(el, {
                                    width: width,
                                    height: height
                                }), _tracker$check = tracker.check(), dimensions = _tracker$check.dimensions, _iterator3 = history, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                                    var _ref5;
                                    if (_isArray3) {
                                        if (_i4 >= _iterator3.length) break;
                                        _ref5 = _iterator3[_i4++];
                                    } else {
                                        if (_i4 = _iterator3.next(), _i4.done) break;
                                        _ref5 = _i4.value;
                                    }
                                    var size = _ref5, widthMatch = !width || size.width === dimensions.width, heightMatch = !height || size.height === dimensions.height;
                                    if (widthMatch && heightMatch) return;
                                }
                                return history.push({
                                    width: dimensions.width,
                                    height: dimensions.height
                                }), _this6.resize(width ? dimensions.width : null, height ? dimensions.height : null).then(function() {
                                    if (tracker.check().changed) return resize();
                                });
                            });
                        }();
                    }
                }, {
                    key: "hide",
                    value: function() {
                        return this.sendToParent(__WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.HIDE);
                    }
                }, {
                    key: "show",
                    value: function() {
                        return this.sendToParent(__WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.SHOW);
                    }
                }, {
                    key: "userClose",
                    value: function() {
                        return this.close(__WEBPACK_IMPORTED_MODULE_6__constants__.CLOSE_REASONS.USER_CLOSED);
                    }
                }, {
                    key: "close",
                    value: function() {
                        var reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : __WEBPACK_IMPORTED_MODULE_6__constants__.CLOSE_REASONS.CHILD_CALL;
                        this.component.log("close_child"), this.sendToParent(__WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.CLOSE, {
                            reason: reason
                        }, {
                            fireAndForget: !0
                        });
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.a().then(function() {
                            window.close();
                        });
                    }
                }, {
                    key: "focus",
                    value: function() {
                        this.component.log("focus"), window.focus();
                    }
                }, {
                    key: "error",
                    value: function(err) {
                        return this.component.logError("error", {
                            error: err.stack || err.toString()
                        }), this.sendToParent(__WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.ERROR, {
                            error: err.stack || err.toString()
                        });
                    }
                } ]), ChildComponent;
            }(__WEBPACK_IMPORTED_MODULE_3__base__.a);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.e)() && window.console && function() {
                var logLevels = __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.b;
                _loop5: for (var _iterator4 = logLevels, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref6, _ret4 = function() {
                        if (_isArray4) {
                            if (_i5 >= _iterator4.length) return "break";
                            _ref6 = _iterator4[_i5++];
                        } else {
                            if (_i5 = _iterator4.next(), _i5.done) return "break";
                            _ref6 = _i5.value;
                        }
                        var level = _ref6;
                        try {
                            var _original = window.console[level];
                            if (!_original || !_original.apply) return "continue";
                            window.console[level] = function() {
                                try {
                                    var logLevel = window.LOG_LEVEL;
                                    if (!logLevel || logLevels.indexOf(logLevel) === -1) return _original.apply(this, arguments);
                                    if (logLevels.indexOf(level) > logLevels.indexOf(logLevel)) return;
                                    return _original.apply(this, arguments);
                                } catch (err2) {}
                            }, "info" === level && (window.console.log = window.console[level]);
                        } catch (err) {}
                    }();
                    switch (_ret4) {
                      case "break":
                        break _loop5;

                      case "continue":
                        continue;
                    }
                }
            }();
        },
        "./node_modules/xcomponent/src/component/child/props.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function normalizeChildProps(component, props, origin) {
                var required = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], result = {};
                _loop2: for (var _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref, _ret = function() {
                        if (_isArray) {
                            if (_i >= _iterator.length) return "break";
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) return "break";
                            _ref = _i.value;
                        }
                        var key = _ref;
                        if (!props.hasOwnProperty(key) && !required) return "continue";
                        var prop = component.props[key], value = props[key];
                        if ("function" == typeof prop.childDef) if (value) {
                            if (prop.getter) {
                                var val = value;
                                value = function() {
                                    return val.apply(this, arguments).then(function(res) {
                                        return res ? res : prop.childDef.call();
                                    });
                                };
                            }
                        } else value = prop.getter ? function() {
                            return Promise.resolve(prop.childDef.call());
                        } : prop.childDef.call();
                        value && prop.sameDomain && origin !== __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.b)(window) && (value = null), 
                        result[key] = value, prop.alias && !result[prop.alias] && (result[prop.alias] = value);
                    }();
                    switch (_ret) {
                      case "break":
                        break _loop2;

                      case "continue":
                        continue;
                    }
                }
                return result;
            }
            var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js");
            __webpack_exports__.a = normalizeChildProps;
        },
        "./node_modules/xcomponent/src/component/component/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            function getByTag(tag) {
                return components[tag];
            }
            var __WEBPACK_IMPORTED_MODULE_0_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_3__base__ = __webpack_require__("./node_modules/xcomponent/src/component/base.js"), __WEBPACK_IMPORTED_MODULE_4__child__ = __webpack_require__("./node_modules/xcomponent/src/component/child/index.js"), __WEBPACK_IMPORTED_MODULE_5__parent__ = __webpack_require__("./node_modules/xcomponent/src/component/parent/index.js"), __WEBPACK_IMPORTED_MODULE_6__delegate__ = __webpack_require__("./node_modules/xcomponent/src/component/delegate/index.js"), __WEBPACK_IMPORTED_MODULE_7__props__ = __webpack_require__("./node_modules/xcomponent/src/component/component/props.js"), __WEBPACK_IMPORTED_MODULE_8__window__ = __webpack_require__("./node_modules/xcomponent/src/component/window.js"), __WEBPACK_IMPORTED_MODULE_9__constants__ = __webpack_require__("./node_modules/xcomponent/src/constants.js"), __WEBPACK_IMPORTED_MODULE_10__parent_drivers__ = __webpack_require__("./node_modules/xcomponent/src/component/parent/drivers.js"), __WEBPACK_IMPORTED_MODULE_11__validate__ = __webpack_require__("./node_modules/xcomponent/src/component/component/validate.js"), __WEBPACK_IMPORTED_MODULE_12__templates_parent_htm__ = __webpack_require__("./node_modules/xcomponent/src/component/component/templates/parent.htm"), __WEBPACK_IMPORTED_MODULE_12__templates_parent_htm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__templates_parent_htm__), __WEBPACK_IMPORTED_MODULE_13__templates_component_htm__ = __webpack_require__("./node_modules/xcomponent/src/component/component/templates/component.htm"), __WEBPACK_IMPORTED_MODULE_13__templates_component_htm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__templates_component_htm__), __WEBPACK_IMPORTED_MODULE_14__drivers__ = __webpack_require__("./node_modules/xcomponent/src/drivers/index.js"), __WEBPACK_IMPORTED_MODULE_15__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return Component;
            }), __webpack_exports__.b = getByTag;
            for (var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, _createClass = (function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }()), components = {}, Component = function(_BaseComponent) {
                function Component() {
                    var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    _classCallCheck(this, Component);
                    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, options));
                    _this.validate(options), _this.addProp(options, "tag"), _this.addProp(options, "name", _this.tag.replace(/-/g, "_")), 
                    _this.props = _extends({}, __WEBPACK_IMPORTED_MODULE_7__props__.a, options.props), 
                    _this.addProp(options, "dimensions"), _this.addProp(options, "scrolling"), _this.addProp(options, "version", "latest"), 
                    _this.addProp(options, "defaultEnv"), _this.addProp(options, "envUrls"), _this.addProp(options, "buildUrl"), 
                    _this.addProp(options, "bridgeUrl"), _this.addProp(options, "bridgeUrls"), _this.addProp(options, "bridgeDomain"), 
                    _this.addProp(options, "bridgeDomains"), _this.addProp(options, "url"), _this.addProp(options, "contexts", {});
                    for (var _iterator = __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES_LIST, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        var context = _ref;
                        _this.contexts[context] = void 0 === _this.contexts[context] || Boolean(_this.contexts[context]);
                    }
                    return _this.addProp(options, "defaultContext"), _this.addProp(options, "singleton"), 
                    _this.addProp(options, "autoResize", !1), _this.addProp(options, "parentTemplate", __WEBPACK_IMPORTED_MODULE_12__templates_parent_htm___default.a), 
                    _this.addProp(options, "componentTemplate", __WEBPACK_IMPORTED_MODULE_13__templates_component_htm___default.a), 
                    _this.addProp(options, "validateProps"), _this.addProp(options, "domain"), _this.addProp(options, "domains"), 
                    _this.addProp(options, "remoteRenderDomain"), components[_this.tag] = _this, _this.registerDrivers(), 
                    _this.registerChild(), _this.listenDelegate(), _this;
                }
                return _inherits(Component, _BaseComponent), _createClass(Component, [ {
                    key: "registerDrivers",
                    value: function() {
                        for (var _iterator2 = Object.keys(__WEBPACK_IMPORTED_MODULE_14__drivers__), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                            var _ref2;
                            if (_isArray2) {
                                if (_i2 >= _iterator2.length) break;
                                _ref2 = _iterator2[_i2++];
                            } else {
                                if (_i2 = _iterator2.next(), _i2.done) break;
                                _ref2 = _i2.value;
                            }
                            var driverName = _ref2, driver = __WEBPACK_IMPORTED_MODULE_14__drivers__[driverName];
                            driver.isActive() && driver.register(this);
                        }
                    }
                }, {
                    key: "registerChild",
                    value: function() {
                        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__window__.e)()) {
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__window__.d)().tag === this.tag && (window.xchild = new __WEBPACK_IMPORTED_MODULE_4__child__.a(this), 
                            window.xprops = window.xchild.props);
                        }
                    }
                }, {
                    key: "listenDelegate",
                    value: function() {
                        var _this2 = this;
                        this.remoteRenderDomain && __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.on(__WEBPACK_IMPORTED_MODULE_9__constants__.POST_MESSAGE.DELEGATE + "_" + this.name, {
                            domain: this.remoteRenderDomain
                        }, function(_ref3) {
                            var source = _ref3.source, data = _ref3.data, delegate = _this2.delegate(source, data.options);
                            return {
                                overrides: delegate.getOverrides(data.context),
                                destroy: function() {
                                    return delegate.destroy();
                                }
                            };
                        });
                    }
                }, {
                    key: "isXComponent",
                    value: function() {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__window__.e)();
                    }
                }, {
                    key: "isChild",
                    value: function() {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__window__.e)() && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__window__.d)().tag === this.tag;
                    }
                }, {
                    key: "parent",
                    value: function(options) {
                        return new __WEBPACK_IMPORTED_MODULE_5__parent__.b(this, null, options);
                    }
                }, {
                    key: "child",
                    value: function(options) {
                        if (!window.xchild) throw new Error("Child not instantiated");
                        return window.xchild.component, options && options.onEnter && options.onEnter.call(window.xchild), 
                        window.xchild;
                    }
                }, {
                    key: "attach",
                    value: function(options) {
                        return this.child(options);
                    }
                }, {
                    key: "init",
                    value: function(props, context, element) {
                        return context = this.getRenderContext(element, context), new __WEBPACK_IMPORTED_MODULE_5__parent__.b(this, context, {
                            props: props
                        });
                    }
                }, {
                    key: "delegate",
                    value: function(source) {
                        var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return new __WEBPACK_IMPORTED_MODULE_6__delegate__.a(this, source, options);
                    }
                }, {
                    key: "getRenderContext",
                    value: function(element, context) {
                        var tag = this.tag, defaultContext = this.defaultContext, contexts = this.contexts;
                        if (element) {
                            if (context && !__WEBPACK_IMPORTED_MODULE_10__parent_drivers__.a[context].requiresElement) throw new Error("[" + tag + "] " + context + " context can not be rendered into element");
                            context = __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.IFRAME;
                        }
                        if (context) {
                            if (!contexts[context]) throw new Error("[" + tag + "] " + context + " context not allowed by component");
                            if (__WEBPACK_IMPORTED_MODULE_10__parent_drivers__.a[context].requiresElement && !element) throw new Error("[" + tag + "] Must specify element to render to iframe");
                            return context;
                        }
                        if (defaultContext) return defaultContext;
                        for (var _arr = [ __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.LIGHTBOX, __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.POPUP ], _i3 = 0; _i3 < _arr.length; _i3++) {
                            var renderContext = _arr[_i3];
                            if (contexts[renderContext]) return renderContext;
                        }
                        throw new Error("[" + tag + "] No context options available for render");
                    }
                }, {
                    key: "render",
                    value: function(props, element, context) {
                        var _this3 = this;
                        return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                            return context = _this3.getRenderContext(element, context), new __WEBPACK_IMPORTED_MODULE_5__parent__.b(_this3, context, {
                                props: props
                            }).render(element);
                        });
                    }
                }, {
                    key: "renderTo",
                    value: function(win, props, element, context) {
                        var _this4 = this;
                        return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                            return context = _this4.getRenderContext(element, context), new __WEBPACK_IMPORTED_MODULE_5__parent__.b(_this4, context, {
                                props: props
                            }).renderTo(win, element);
                        });
                    }
                }, {
                    key: "getByTag",
                    value: function(tag) {
                        return components[tag];
                    }
                }, {
                    key: "validate",
                    value: function(options) {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__validate__.a)(options);
                    }
                }, {
                    key: "log",
                    value: function(event) {
                        var payload = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.c("xc_" + this.name + "_" + event, payload);
                    }
                }, {
                    key: "logWarning",
                    value: function(event, payload) {
                        __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.d("xc_" + this.name + "_" + event, payload);
                    }
                }, {
                    key: "logError",
                    value: function(event, payload) {
                        __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.e("xc_" + this.name + "_" + event, payload);
                    }
                } ]), Component;
            }(__WEBPACK_IMPORTED_MODULE_3__base__.a), _iterator3 = __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES_LIST, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                var _ref4;
                if ("break" === function() {
                    if (_isArray3) {
                        if (_i4 >= _iterator3.length) return "break";
                        _ref4 = _iterator3[_i4++];
                    } else {
                        if (_i4 = _iterator3.next(), _i4.done) return "break";
                        _ref4 = _i4.value;
                    }
                    var context = _ref4, contextName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__lib__.M)(context);
                    Component.prototype["render" + contextName] = function(props, element) {
                        return this.render(props, element, context);
                    }, Component.prototype["render" + contextName + "To"] = function(win, props, element) {
                        return this.renderTo(win, props, element, context);
                    };
                }()) break;
            }
        },
        "./node_modules/xcomponent/src/component/component/props.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return internalProps;
            });
            var internalProps = {
                uid: {
                    type: "string",
                    def: function() {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.k)();
                    },
                    queryParam: !0
                },
                url: {
                    type: "string",
                    required: !1,
                    promise: !0,
                    sendToChild: !1
                },
                env: {
                    type: "string",
                    required: !1,
                    queryParam: !0,
                    def: function() {
                        return this.defaultEnv;
                    }
                },
                version: {
                    type: "string",
                    required: !1,
                    queryParam: !0
                },
                dimensions: {
                    type: "object",
                    required: !1
                },
                timeout: {
                    type: "number",
                    required: !1
                },
                onDisplay: {
                    type: "function",
                    required: !1,
                    noop: !0,
                    promisify: !0
                },
                onEnter: {
                    type: "function",
                    required: !1,
                    noop: !0,
                    promisify: !0
                },
                onClose: {
                    type: "function",
                    required: !1,
                    noop: !0,
                    once: !0,
                    promisify: !0
                },
                onTimeout: {
                    type: "function",
                    required: !1,
                    memoize: !0,
                    promisify: !0,
                    def: function() {
                        return function(err) {
                            return this.props.onError(err);
                        };
                    }
                },
                onError: {
                    type: "function",
                    required: !1,
                    promisify: !0,
                    def: function() {
                        return function() {};
                    },
                    once: !0
                }
            };
        },
        "./node_modules/xcomponent/src/component/component/templates/component.htm": function(module, exports) {
            module.exports = "";
        },
        "./node_modules/xcomponent/src/component/component/templates/parent.htm": function(module, exports) {
            module.exports = '<div class="{CLASS.XCOMPONENT}-overlay {CLASS.FOCUS}">\n    <a href="#{CLASS.CLOSE}" class="{CLASS.CLOSE}"></a>\n\n    <div class="{CLASS.ELEMENT}"></div>\n</div>\n\n<style>\n    #{id} .{CLASS.XCOMPONENT}-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.8);\n    }\n\n    #{id}.{CLASS.POPUP} .{CLASS.XCOMPONENT}-overlay {\n        cursor: pointer;\n    }\n\n    #{id}.{CLASS.LIGHTBOX} .{CLASS.ELEMENT} {\n        box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.4);\n        position: fixed;\n\n        top: 50%;\n        left: 50%;\n\n        transform: translate3d(-50%, -50%, 0);\n        -webkit-transform: translate3d(-50%, -50%, 0);\n        -moz-transform: translate3d(-50%, -50%, 0);\n        -o-transform: translate3d(-50%, -50%, 0);\n        -ms-transform: translate3d(-50%, -50%, 0);\n    }\n\n    #{id}.{CLASS.LIGHTBOX} iframe {\n        height: 100%;\n        width: 100%;\n    }\n\n    #{id} .{CLASS.CLOSE} {\n        position: absolute;\n        right: 16px;\n        top: 16px;\n        width: 16px;\n        height: 16px;\n        opacity: 0.6;\n    }\n\n    #{id} .{CLASS.CLOSE}:hover {\n        opacity: 1;\n    }\n\n    #{id} .{CLASS.CLOSE}:before, .{CLASS.CLOSE}:after {\n        position: absolute;\n        left: 8px;\n        content: \' \';\n        height: 16px;\n        width: 2px;\n        background-color: white;\n    }\n\n    #{id} .{CLASS.CLOSE}:before {\n        transform: rotate(45deg);\n    }\n\n    #{id} .{CLASS.CLOSE}:after {\n        transform: rotate(-45deg);\n    }\n</style>';
        },
        "./node_modules/xcomponent/src/component/component/validate.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function validateProps(options) {
                if (options.props && "object" !== _typeof(options.props)) throw new Error("[" + options.tag + "] Expected options.props to be an object");
                if (options.props) for (var _iterator = Object.keys(options.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var key = _ref, prop = options.props[key];
                    if (!prop || "object" !== (void 0 === prop ? "undefined" : _typeof(prop))) throw new Error("[" + options.tag + "] Expected options.props." + key + " to be an object");
                    if (!prop.type) throw new Error("[" + options.tag + "] Expected prop.type");
                    if (__WEBPACK_IMPORTED_MODULE_0__constants__.PROP_TYPES_LIST.indexOf(prop.type) === -1) throw new Error("[" + options.tag + "] Expected prop.type to be one of " + __WEBPACK_IMPORTED_MODULE_0__constants__.PROP_TYPES_LIST.join(", "));
                    if (prop.required && prop.def) throw new Error("[" + options.tag + "] Required prop can not have a default value");
                }
            }
            function validate(options) {
                if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) throw new Error("Invalid options.tag: " + options.tag);
                if (validateProps(options), options.dimensions) {
                    if ("number" != typeof options.dimensions.width && "string" != typeof options.dimensions.width) throw new Error("[" + options.tag + "] Expected options.dimensions.width to be a number or string");
                    if ("number" != typeof options.dimensions.height && "string" != typeof options.dimensions.height) throw new Error("[" + options.tag + "] Expected options.dimensions.height to be a number or string");
                }
                if (options.contexts) {
                    for (var anyEnabled = !1, _iterator2 = Object.keys(options.contexts), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            if (_i2 = _iterator2.next(), _i2.done) break;
                            _ref2 = _i2.value;
                        }
                        var context = _ref2;
                        if (__WEBPACK_IMPORTED_MODULE_0__constants__.CONTEXT_TYPES_LIST.indexOf(context) === -1) throw new Error("[" + options.tag + "] Unsupported context type: " + context);
                        (options.contexts[context] || void 0 === options.contexts[context]) && (anyEnabled = !0);
                    }
                    if (!anyEnabled) throw new Error("[" + options.tag + "] No context type is enabled");
                    if (options.contexts.iframe !== !1 && !options.dimensions) throw new Error("[" + options.tag + "] dimesions.width and dimensions.height required for rendering to iframe");
                }
                if (options.defaultContext) {
                    if (__WEBPACK_IMPORTED_MODULE_0__constants__.CONTEXT_TYPES_LIST.indexOf(options.defaultContext) === -1) throw new Error("[" + options.tag + "] Unsupported context type: " + options.defaultContext);
                    if (options.contexts && !options.contexts[options.defaultContext]) throw new Error("[" + options.tag + "] Disallowed default context type: " + options.defaultContext);
                }
                if (options.envUrls) for (var _iterator3 = Object.keys(options.envUrls), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        if (_i3 = _iterator3.next(), _i3.done) break;
                        _ref3 = _i3.value;
                    }
                    var env = _ref3;
                    if (!options.envUrls[env]) throw new Error("[" + options.tag + "] No url specified for env: " + env);
                }
                if (options.defaultEnv && !options.envUrls) throw new Error("[" + options.tag + "] options.envUrls must be set if passing in a defaultEnv");
                if (options.defaultEnv && !options.envUrls[options.defaultEnv]) throw new Error("[" + options.tag + "] Invalid default env: " + options.defaultEnv);
                if (!(options.url && "string" == typeof options.url || options.buildUrl || options.defaultEnv && "string" == typeof options.defaultEnv)) throw options.envUrls ? new Error("[" + options.tag + "] Expected options.defaultEnv to be a string") : new Error("[" + options.tag + "] Expected options.url to be a string");
            }
            var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./node_modules/xcomponent/src/constants.js");
            __webpack_exports__.a = validate;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        },
        "./node_modules/xcomponent/src/component/delegate/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__("./node_modules/xcomponent/src/component/base.js"), __WEBPACK_IMPORTED_MODULE_1__parent__ = __webpack_require__("./node_modules/xcomponent/src/component/parent/index.js"), __WEBPACK_IMPORTED_MODULE_2__parent_drivers__ = __webpack_require__("./node_modules/xcomponent/src/component/parent/drivers.js"), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return DelegateComponent;
            });
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), DelegateComponent = function(_BaseComponent) {
                function DelegateComponent(component, source) {
                    var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    _classCallCheck(this, DelegateComponent);
                    var _this = _possibleConstructorReturn(this, (DelegateComponent.__proto__ || Object.getPrototypeOf(DelegateComponent)).call(this, component, options));
                    _this.component = component, _this.source = source, _this.context = options.context, 
                    _this.props = options.props, _this.props = {
                        uid: options.props.uid,
                        dimensions: options.props.dimensions,
                        onClose: options.props.onClose,
                        onDisplay: options.props.onDisplay
                    }, _this.focus = options.overrides.focus, _this.userClose = options.overrides.userClose, 
                    _this.getDomain = options.overrides.getDomain, _this.getParentTemplate = options.overrides.getParentTemplate, 
                    _this.getComponentTemplate = options.overrides.getComponentTemplate;
                    for (var renderToParentOverrides = __WEBPACK_IMPORTED_MODULE_2__parent_drivers__.a[options.context].renderToParentOverrides, _iterator = Object.keys(renderToParentOverrides), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        var key = _ref;
                        _this[key] = __WEBPACK_IMPORTED_MODULE_1__parent__.b.prototype[key];
                    }
                    return _this.childWindowName = options.childWindowName, __WEBPACK_IMPORTED_MODULE_1__parent__.b.prototype.registerActiveComponent.call(_this), 
                    _this.watchForClose(), _this;
                }
                return _inherits(DelegateComponent, _BaseComponent), _createClass(DelegateComponent, [ {
                    key: "watchForClose",
                    value: function() {
                        var _this2 = this, closeListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.f)(this.source, function() {
                            return _this2.destroy();
                        });
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.s)(window, "beforeunload", closeListener.cancel);
                    }
                }, {
                    key: "getOverrides",
                    value: function(context) {
                        for (var renderToParentOverrides = __WEBPACK_IMPORTED_MODULE_2__parent_drivers__.a[context].renderToParentOverrides, overrides = {}, self = this, _iterator2 = Object.keys(renderToParentOverrides), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                            var _ref2;
                            if ("break" === function() {
                                if (_isArray2) {
                                    if (_i2 >= _iterator2.length) return "break";
                                    _ref2 = _iterator2[_i2++];
                                } else {
                                    if (_i2 = _iterator2.next(), _i2.done) return "break";
                                    _ref2 = _i2.value;
                                }
                                var key = _ref2;
                                overrides[key] = function() {
                                    return __WEBPACK_IMPORTED_MODULE_1__parent__.b.prototype[key].apply(self, arguments);
                                };
                            }()) break;
                        }
                        return overrides;
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        return this.clean.all();
                    }
                }, {
                    key: "driver",
                    get: function() {
                        if (!this.context) throw new Error("Context not set");
                        return __WEBPACK_IMPORTED_MODULE_2__parent_drivers__.a[this.context];
                    }
                } ]), DelegateComponent;
            }(__WEBPACK_IMPORTED_MODULE_0__base__.a);
        },
        "./node_modules/xcomponent/src/component/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__("./node_modules/xcomponent/src/component/component/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_0__component__.a;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_0__component__.b;
            });
            var __WEBPACK_IMPORTED_MODULE_1__parent__ = __webpack_require__("./node_modules/xcomponent/src/component/parent/index.js");
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_1__parent__.a;
            });
            __webpack_require__("./node_modules/xcomponent/src/component/child/index.js");
        },
        "./node_modules/xcomponent/src/component/parent/drivers.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _defineProperty(obj, key, value) {
                return key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            var __WEBPACK_IMPORTED_MODULE_0_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__("./node_modules/xcomponent/src/constants.js"), __WEBPACK_IMPORTED_MODULE_3__window__ = __webpack_require__("./node_modules/xcomponent/src/component/window.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return RENDER_DRIVERS;
            });
            var _RENDER_DRIVERS, RENDER_DRIVERS = (_RENDER_DRIVERS = {}, _defineProperty(_RENDER_DRIVERS, __WEBPACK_IMPORTED_MODULE_2__constants__.CONTEXT_TYPES.IFRAME, {
                requiresElement: !0,
                renderedIntoParentTemplate: !0,
                destroyOnUnload: !1,
                allowResize: !0,
                openOnClick: !1,
                errorOnCloseDuringInit: !0,
                open: function(element) {
                    var _this = this;
                    if (!element) throw new Error("[" + this.component.tag + "] Must specify element to render to iframe");
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.z)(element)) throw new Error("[" + this.component.tag + "] Can not find element " + element);
                    this.iframe = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.A)(null, {
                        name: this.childWindowName,
                        scrolling: this.component.scrolling === !1 ? "no" : "yes"
                    }, this.elementTemplate || element), this.elementTemplate = this.elementTemplate || this.iframe, 
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.C)(this.elementTemplate);
                    var dimensions = this.props.dimensions || this.component.dimensions || {};
                    this.resize(dimensions.width, dimensions.height), this.restyle(), this.window = this.iframe.contentWindow, 
                    this.clean.register("destroyWindow", function() {
                        _this.window.close(), delete _this.window, _this.iframe && (_this.iframe.parentNode && _this.iframe.parentNode.removeChild(_this.iframe), 
                        delete _this.iframe);
                    });
                },
                renderToParentOverrides: {
                    openContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    destroyComponent: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    destroyContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    cancelContainerEvents: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    createComponentTemplate: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    elementReady: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    showContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    showComponent: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    hideContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    hideComponent: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    hide: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    show: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    resize: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    restyle: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    loadUrl: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    hijackSubmit: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    open: function(original, override) {
                        return function() {
                            var _this2 = this;
                            return override.apply(this, arguments).then(function() {
                                if (_this2.window = __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.winutil.findFrameByName(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__window__.b)(), _this2.childWindowName), 
                                !_this2.window) throw new Error("Unable to find parent component iframe window");
                            });
                        };
                    }
                },
                resize: function(width, height) {
                    width && (this.iframe.style.width = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.E)(width)), 
                    height && (this.iframe.style.height = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.E)(height));
                },
                hide: function() {
                    this.iframe.style.display = "none";
                },
                show: function() {
                    this.iframe.style.display = "block";
                },
                restyle: function() {
                    this.iframe.style.backgroundColor = "transparent";
                },
                loadUrl: function(url) {
                    this.iframe.src = url;
                }
            }), _defineProperty(_RENDER_DRIVERS, __WEBPACK_IMPORTED_MODULE_2__constants__.CONTEXT_TYPES.POPUP, {
                focusable: !0,
                requiresElement: !1,
                renderedIntoParentTemplate: !1,
                destroyOnUnload: !0,
                allowResize: !1,
                openOnClick: !0,
                errorOnCloseDuringInit: !1,
                open: function() {
                    var _this3 = this, _ref = this.props.dimensions || this.component.dimensions || {}, width = _ref.width, height = _ref.height, x = _ref.x, y = _ref.y;
                    width = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.F)(width) ? parseInt(window.innerWidth * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.G)(width) / 100, 10) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.G)(width), 
                    height = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.F)(height) ? parseInt(window.innerHeight * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.G)(height) / 100, 10) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.G)(height);
                    var pos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__window__.g)({
                        width: width,
                        height: height,
                        x: x,
                        y: y
                    });
                    this.window = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.H)("", {
                        name: this.childWindowName,
                        width: width,
                        height: height,
                        top: pos.y,
                        left: pos.x,
                        location: 1,
                        status: 1,
                        toolbar: 0,
                        menubar: 0,
                        resizable: 1,
                        scrollbars: 1
                    }), this.clean.register("destroyWindow", function() {
                        _this3.window && (_this3.window.close(), delete _this3.window);
                    }), this.resize(width, height);
                },
                resize: function(width, height) {},
                hide: function() {
                    throw new Error("Can not hide popup");
                },
                show: function() {
                    throw new Error("Can not show popup");
                },
                restyle: function() {},
                renderToParentOverrides: {
                    openContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    destroyContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    elementReady: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    showContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    showComponent: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    hideContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    hideComponent: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    hide: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    show: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    cancelContainerEvents: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    open: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_ORIGINAL,
                    loadUrl: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_ORIGINAL,
                    createComponentTemplate: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_ORIGINAL,
                    destroyComponent: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_ORIGINAL,
                    resize: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_ORIGINAL,
                    restyle: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_ORIGINAL
                },
                loadUrl: function(url) {
                    this.window.location = url;
                }
            }), _defineProperty(_RENDER_DRIVERS, __WEBPACK_IMPORTED_MODULE_2__constants__.CONTEXT_TYPES.LIGHTBOX, {
                requiresElement: !1,
                renderedIntoParentTemplate: !0,
                destroyOnUnload: !1,
                allowResize: !0,
                openOnClick: !1,
                errorOnCloseDuringInit: !0,
                renderToParentOverrides: {
                    openContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    destroyComponent: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    destroyContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    createComponentTemplate: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    elementReady: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    showContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    showComponent: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    hideContainer: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    hideComponent: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    hide: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    show: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    resize: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    restyle: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    loadUrl: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    cancelContainerEvents: __WEBPACK_IMPORTED_MODULE_2__constants__.DELEGATE.CALL_DELEGATE,
                    open: function(original, override) {
                        return function() {
                            var _this4 = this;
                            return override.apply(this, arguments).then(function() {
                                if (_this4.window = __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.winutil.findFrameByName(_this4.delegateWindow, _this4.childWindowName), 
                                !_this4.window) throw new Error("Unable to find parent component iframe window");
                            });
                        };
                    }
                },
                open: function() {
                    var element = this.parentTemplate.getElementsByClassName(__WEBPACK_IMPORTED_MODULE_2__constants__.CLASS_NAMES.ELEMENT)[0] || document.body;
                    return RENDER_DRIVERS[__WEBPACK_IMPORTED_MODULE_2__constants__.CONTEXT_TYPES.IFRAME].open.call(this, element);
                },
                resize: function(width, height) {
                    var container = this.parentTemplate.getElementsByClassName(__WEBPACK_IMPORTED_MODULE_2__constants__.CLASS_NAMES.ELEMENT)[0] || this.iframe;
                    width && (container.style.width = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.E)(width)), 
                    height && (container.style.height = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.E)(height));
                },
                hide: function() {
                    this.iframe.style.display = "none";
                },
                show: function() {
                    this.iframe.style.display = "block";
                },
                restyle: function() {},
                loadUrl: function(url) {
                    this.iframe.src = url;
                }
            }), _RENDER_DRIVERS);
        },
        "./node_modules/xcomponent/src/component/parent/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            (function(global) {
                function _defineProperty(obj, key, value) {
                    return key in obj ? Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : obj[key] = value, obj;
                }
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                function _possibleConstructorReturn(self, call) {
                    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !call || "object" != typeof call && "function" != typeof call ? self : call;
                }
                function _inherits(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                }
                function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
                    var desc = {};
                    return Object.keys(descriptor).forEach(function(key) {
                        desc[key] = descriptor[key];
                    }), desc.enumerable = !!desc.enumerable, desc.configurable = !!desc.configurable, 
                    ("value" in desc || desc.initializer) && (desc.writable = !0), desc = decorators.slice().reverse().reduce(function(desc, decorator) {
                        return decorator(target, property, desc) || desc;
                    }, desc), context && void 0 !== desc.initializer && (desc.value = desc.initializer ? desc.initializer.call(context) : void 0, 
                    desc.initializer = void 0), void 0 === desc.initializer && (Object.defineProperty(target, property, desc), 
                    desc = null), desc;
                }
                function memoize(target, name, descriptor) {
                    var method = descriptor.value;
                    descriptor.value = function() {
                        return this.__memoized__ = this.__memoized__ || {}, this.__memoized__.hasOwnProperty(name) || (this.__memoized__[name] = method.apply(this, arguments)), 
                        this.__memoized__[name];
                    };
                }
                function promise(target, name, descriptor) {
                    var method = descriptor.value;
                    descriptor.value = function() {
                        var _this = this, _arguments = arguments;
                        return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                            return method.apply(_this, _arguments);
                        });
                    };
                }
                function destroyAll() {
                    for (var results = []; activeComponents.length; ) results.push(activeComponents[0].destroy());
                    return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.all(results);
                }
                var __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_1_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_3__base__ = __webpack_require__("./node_modules/xcomponent/src/component/base.js"), __WEBPACK_IMPORTED_MODULE_4__window__ = __webpack_require__("./node_modules/xcomponent/src/component/window.js"), __WEBPACK_IMPORTED_MODULE_5__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__("./node_modules/xcomponent/src/constants.js"), __WEBPACK_IMPORTED_MODULE_7__drivers__ = __webpack_require__("./node_modules/xcomponent/src/component/parent/drivers.js"), __WEBPACK_IMPORTED_MODULE_8__validate__ = __webpack_require__("./node_modules/xcomponent/src/component/parent/validate.js"), __WEBPACK_IMPORTED_MODULE_9__props__ = __webpack_require__("./node_modules/xcomponent/src/component/parent/props.js"), __WEBPACK_IMPORTED_MODULE_10__component_templates_parent_htm__ = __webpack_require__("./node_modules/xcomponent/src/component/component/templates/parent.htm"), __WEBPACK_IMPORTED_MODULE_10__component_templates_parent_htm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__component_templates_parent_htm__);
                __webpack_require__.d(__webpack_exports__, "b", function() {
                    return ParentComponent;
                }), __webpack_exports__.a = destroyAll;
                var _class, _slicedToArray = function() {
                    function sliceIterator(arr, i) {
                        var _arr = [], _n = !0, _d = !1, _e = void 0;
                        try {
                            for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                            !i || _arr.length !== i); _n = !0) ;
                        } catch (err) {
                            _d = !0, _e = err;
                        } finally {
                            try {
                                !_n && _i.return && _i.return();
                            } finally {
                                if (_d) throw _e;
                            }
                        }
                        return _arr;
                    }
                    return function(arr, i) {
                        if (Array.isArray(arr)) return arr;
                        if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    };
                }(), _extends = Object.assign || function(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                    }
                    return target;
                }, _createClass = function() {
                    function defineProperties(target, props) {
                        for (var i = 0; i < props.length; i++) {
                            var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                        }
                    }
                    return function(Constructor, protoProps, staticProps) {
                        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                        Constructor;
                    };
                }(), activeComponents = [], global = window[__WEBPACK_IMPORTED_MODULE_6__constants__.__XCOMPONENT__] = window[__WEBPACK_IMPORTED_MODULE_6__constants__.__XCOMPONENT__] || {};
                global.props = global.props || {}, global.windows = global.windows || {};
                var ParentComponent = (_class = function(_BaseComponent) {
                    function ParentComponent(component, context) {
                        var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        _classCallCheck(this, ParentComponent);
                        var _this2 = _possibleConstructorReturn(this, (ParentComponent.__proto__ || Object.getPrototypeOf(ParentComponent)).call(this, component, options));
                        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__validate__.a)(component, options), 
                        _this2.rawProps = _extends({}, options.props || {}), _this2.component = component, 
                        _this2.context = context, _this2.setProps(options.props || {}), _this2.childWindowName = _this2.buildChildWindowName({
                            renderTo: window
                        }), component.singleton && activeComponents.some(function(comp) {
                            return comp.component === component;
                        })) throw new Error(component.tag + " is a singleton, and an only be instantiated once");
                        return _this2.registerActiveComponent(), _this2.component.log("construct_parent"), 
                        _this2.onInit = new __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a(), 
                        _this2.clean.register(function() {
                            _this2.onInit = new __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a();
                        }), _this2.onInit.catch(function(err) {
                            return _this2.error(err);
                        }), _this2;
                    }
                    return _inherits(ParentComponent, _BaseComponent), _createClass(ParentComponent, [ {
                        key: "registerActiveComponent",
                        value: function() {
                            var _this3 = this;
                            activeComponents.push(this), this.clean.register(function() {
                                activeComponents.splice(activeComponents.indexOf(_this3), 1);
                            });
                        }
                    }, {
                        key: "buildChildWindowName",
                        value: function() {
                            var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$renderTo = _ref.renderTo, renderTo = void 0 === _ref$renderTo ? window : _ref$renderTo, _ref$secureProps = _ref.secureProps, secureProps = void 0 !== _ref$secureProps && _ref$secureProps, sameWindow = renderTo === window, isLightbox = this.context === __WEBPACK_IMPORTED_MODULE_6__constants__.CONTEXT_TYPES.LIGHTBOX, uid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.k)(), tag = this.component.tag, sProps = this.getSerializedPropsForChild(), defaultParent = isLightbox ? __WEBPACK_IMPORTED_MODULE_6__constants__.WINDOW_REFERENCES.PARENT_PARENT : __WEBPACK_IMPORTED_MODULE_6__constants__.WINDOW_REFERENCES.DIRECT_PARENT, parent = sameWindow ? defaultParent : window.name, renderParent = sameWindow ? defaultParent : __WEBPACK_IMPORTED_MODULE_6__constants__.WINDOW_REFERENCES.PARENT_UID, props = secureProps ? {
                                type: __WEBPACK_IMPORTED_MODULE_6__constants__.INITIAL_PROPS.UID
                            } : {
                                type: __WEBPACK_IMPORTED_MODULE_6__constants__.INITIAL_PROPS.RAW,
                                value: sProps
                            };
                            return props.type === __WEBPACK_IMPORTED_MODULE_6__constants__.INITIAL_PROPS.UID && (global.props[uid] = sProps), 
                            renderParent === __WEBPACK_IMPORTED_MODULE_6__constants__.WINDOW_REFERENCES.PARENT_UID && (global.windows[uid] = renderTo), 
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.f)(this.component.name, this.component.version, {
                                uid: uid,
                                tag: tag,
                                parent: parent,
                                renderParent: renderParent,
                                props: props
                            });
                        }
                    }, {
                        key: "sendToParent",
                        value: function(name, data) {
                            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.b)()) throw new Error("Can not find parent component window to message");
                            return this.component.log("send_to_parent_" + name), __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.send(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.b)(), name, data, {
                                domain: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.a)()
                            });
                        }
                    }, {
                        key: "setProps",
                        value: function() {
                            var props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, required = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                            this.props = this.props || {}, props.version = this.component.version, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__validate__.b)(this.component, props, required), 
                            this.component.validateProps && this.component.validateProps(this.component, props, required), 
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.e)(this.props, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__props__.a)(this.component, this, props, required));
                        }
                    }, {
                        key: "buildUrl",
                        value: function() {
                            var _this4 = this;
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.hash({
                                url: this.props.url,
                                query: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__props__.b)(this.component.props, this.props)
                            }).then(function(_ref2) {
                                var url = _ref2.url, query = _ref2.query;
                                return url && !_this4.getValidDomain(url) ? url : __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                    return url ? url : _this4.props.env && _this4.component.envUrls ? _this4.component.envUrls[_this4.props.env] : _this4.component.defaultEnv && _this4.component.envUrls ? _this4.component.envUrls[_this4.component.defaultEnv] : _this4.component.buildUrl ? _this4.component.buildUrl(_this4, _this4.props) : _this4.component.url;
                                }).then(function(finalUrl) {
                                    return query[__WEBPACK_IMPORTED_MODULE_6__constants__.XCOMPONENT] = "1", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.o)(finalUrl, {
                                        query: query
                                    });
                                });
                            });
                        }
                    }, {
                        key: "getValidDomain",
                        value: function(url) {
                            if (url) {
                                var domain = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.p)(url);
                                if (this.component.domain && domain === this.component.domain) return domain;
                                if (this.component.domains) for (var _iterator = Object.keys(this.component.domains), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                                    var _ref3;
                                    if (_isArray) {
                                        if (_i >= _iterator.length) break;
                                        _ref3 = _iterator[_i++];
                                    } else {
                                        if (_i = _iterator.next(), _i.done) break;
                                        _ref3 = _i.value;
                                    }
                                    var env = _ref3;
                                    if ("test" !== env && domain === this.component.domains[env]) return domain;
                                }
                            }
                        }
                    }, {
                        key: "getDomain",
                        value: function() {
                            var _this5 = this;
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                return _this5.props.url;
                            }).then(function(url) {
                                var domain = _this5.getValidDomain(url);
                                if (domain) return domain;
                                if (_this5.component.domain) return _this5.component.domain;
                                if (_this5.component.domains && _this5.props.env && _this5.component.domains[_this5.props.env]) return _this5.component.domains[_this5.props.env];
                                if (_this5.component.envUrls && _this5.props.env && _this5.component.envUrls[_this5.props.env]) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.p)(_this5.component.envUrls[_this5.props.env]);
                                if (_this5.component.envUrls && _this5.component.defaultEnv && _this5.component.envUrls[_this5.component.defaultEnv]) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.p)(_this5.component.envUrls[_this5.component.defaultEnv]);
                                if (_this5.component.buildUrl) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.p)(_this5.component.buildUrl(_this5));
                                if (_this5.component.url) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.p)(_this5.component.url);
                                throw new Error("Can not determine domain for component");
                            });
                        }
                    }, {
                        key: "getBridgeDomain",
                        value: function(url) {
                            var _this6 = this;
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                if (_this6.component.bridgeDomain) return _this6.component.bridgeDomain;
                                if (_this6.component.bridgeDomains && _this6.props.env && _this6.component.bridgeDomains[_this6.props.env]) return _this6.component.bridgeDomains[_this6.props.env];
                                if (url) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.p)(url);
                                throw new Error("Can not determine domain for bridge");
                            });
                        }
                    }, {
                        key: "getPropsForChild",
                        value: function() {
                            for (var result = {}, _iterator2 = Object.keys(this.props), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                                var _ref4;
                                if (_isArray2) {
                                    if (_i2 >= _iterator2.length) break;
                                    _ref4 = _iterator2[_i2++];
                                } else {
                                    if (_i2 = _iterator2.next(), _i2.done) break;
                                    _ref4 = _i2.value;
                                }
                                var key = _ref4;
                                this.component.props[key].sendToChild !== !1 && (result[key] = this.props[key]);
                            }
                            return result;
                        }
                    }, {
                        key: "getSerializedPropsForChild",
                        value: function() {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.c)(this.getPropsForChild(), function(value, key, fullKey) {
                                if (value instanceof Function) return {
                                    __type__: "__function__"
                                };
                            });
                        }
                    }, {
                        key: "updateProps",
                        value: function() {
                            for (var _this7 = this, props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, changed = !1, _iterator3 = Object.keys(props), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                                var _ref5;
                                if (_isArray3) {
                                    if (_i3 >= _iterator3.length) break;
                                    _ref5 = _iterator3[_i3++];
                                } else {
                                    if (_i3 = _iterator3.next(), _i3.done) break;
                                    _ref5 = _i3.value;
                                }
                                var key = _ref5;
                                if (props[key] !== this.rawProps[key]) {
                                    changed = !0;
                                    break;
                                }
                            }
                            if (changed) return this.rawProps = _extends({}, this.rawProps, props), this.setProps(props, !1), 
                            this.propUpdater ? this.propUpdater : (this.propUpdater = this.onInit.then(function() {
                                return delete _this7.propUpdater, _this7.childExports.updateProps(_this7.getPropsForChild());
                            }), this.propUpdater);
                        }
                    }, {
                        key: "openBridge",
                        value: function() {
                            var _this8 = this, bridgeUrl = this.component.bridgeUrl;
                            if (!bridgeUrl && this.component.bridgeUrls && this.props.env && (bridgeUrl = this.component.bridgeUrls[this.props.env]), 
                            bridgeUrl) return this.getBridgeDomain(bridgeUrl).then(function(bridgeDomain) {
                                if (__WEBPACK_IMPORTED_MODULE_1_post_robot_src__.needsBridge({
                                    window: _this8.window,
                                    domain: bridgeDomain
                                })) return __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.openBridge(bridgeUrl, bridgeDomain);
                            });
                        }
                    }, {
                        key: "open",
                        value: function(element) {
                            this.component.log("open_" + this.context, {
                                element: element,
                                windowName: this.childWindowName
                            }), this.driver.open.call(this, element);
                        }
                    }, {
                        key: "elementReady",
                        value: function(element) {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.q)(element).then(__WEBPACK_IMPORTED_MODULE_5__lib__.r);
                        }
                    }, {
                        key: "render",
                        value: function(element) {
                            var _this9 = this, loadUrl = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                            return this.tryInit(function() {
                                _this9.component.log("render_" + _this9.context, {
                                    context: _this9.context,
                                    element: element,
                                    loadUrl: loadUrl
                                });
                                var tasks = {
                                    getDomain: _this9.getDomain()
                                };
                                return tasks.elementReady = __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                    if (element) return _this9.elementReady(element);
                                }), tasks.openContainer = tasks.elementReady.then(function() {
                                    return _this9.openContainer(element);
                                }), _this9.driver.openOnClick ? tasks.open = _this9.open(element, _this9.context) : tasks.open = __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.all([ tasks.openContainer, tasks.elementReady ]).then(function() {
                                    return _this9.open(element, _this9.context);
                                }), tasks.openBridge = tasks.open.then(function() {
                                    return _this9.openBridge(_this9.context);
                                }), tasks.showContainer = tasks.openContainer.then(function() {
                                    return _this9.showContainer();
                                }), tasks.createComponentTemplate = tasks.open.then(function() {
                                    return _this9.createComponentTemplate();
                                }), tasks.showComponent = tasks.createComponentTemplate.then(function() {
                                    return _this9.showComponent();
                                }), tasks.linkDomain = __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.all([ tasks.getDomain, tasks.open ]).then(function(_ref6) {
                                    var _ref7 = _slicedToArray(_ref6, 1), domain = _ref7[0];
                                    return __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.linkUrl(_this9.window, domain);
                                }), tasks.listen = __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.all([ tasks.getDomain, tasks.open ]).then(function(_ref8) {
                                    var _ref9 = _slicedToArray(_ref8, 1), domain = _ref9[0];
                                    _this9.listen(_this9.window, domain);
                                }), tasks.watchForClose = tasks.open.then(function() {
                                    return _this9.watchForClose();
                                }), loadUrl && (tasks.buildUrl = _this9.buildUrl(), tasks.loadUrl = __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.all([ tasks.buildUrl, tasks.linkDomain, tasks.listen, tasks.openBridge, tasks.createComponentTemplate ]).then(function(_ref10) {
                                    var _ref11 = _slicedToArray(_ref10, 1), url = _ref11[0];
                                    return _this9.loadUrl(url);
                                }), tasks.runTimeout = tasks.loadUrl.then(function() {
                                    return _this9.runTimeout();
                                })), __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.hash(tasks);
                            });
                        }
                    }, {
                        key: "validateRenderToParent",
                        value: function(element) {
                            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.b)()) throw new Error("[" + this.component.tag + "] Can not render to parent - no parent exists");
                            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__window__.e)()) throw new Error("[" + this.component.tag + "] Can not render to parent - not in a child component window");
                        }
                    }, {
                        key: "delegate",
                        value: function delegate(win) {
                            var _this10 = this;
                            this.delegateWindow = win, this.component.log("delegate_" + this.context), this.childWindowName = this.buildChildWindowName({
                                renderTo: win,
                                secureProps: !0
                            });
                            var delegate = __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.send(win, __WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.DELEGATE + "_" + this.component.name, {
                                context: this.context,
                                options: {
                                    context: this.context,
                                    childWindowName: this.childWindowName,
                                    props: {
                                        uid: this.props.uid,
                                        dimensions: this.props.dimensions,
                                        onClose: this.props.onClose,
                                        onDisplay: this.props.onDisplay
                                    },
                                    overrides: {
                                        focus: function() {
                                            return _this10.focus();
                                        },
                                        userClose: function() {
                                            return _this10.userClose();
                                        },
                                        getDomain: function() {
                                            return _this10.getDomain();
                                        },
                                        getParentTemplate: function() {
                                            return _this10.getParentTemplate();
                                        },
                                        getComponentTemplate: function() {
                                            return _this10.getComponentTemplate();
                                        }
                                    }
                                }
                            }).then(function(_ref12) {
                                var data = _ref12.data;
                                return _this10.clean.register(data.destroy), data;
                            }).catch(function(err) {
                                throw new Error("Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n" + err.stack);
                            }), overrides = this.driver.renderToParentOverrides;
                            _loop2: for (var _iterator4 = Object.keys(overrides), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                                var _ref13, _ret = function() {
                                    if (_isArray4) {
                                        if (_i4 >= _iterator4.length) return "break";
                                        _ref13 = _iterator4[_i4++];
                                    } else {
                                        if (_i4 = _iterator4.next(), _i4.done) return "break";
                                        _ref13 = _i4.value;
                                    }
                                    var key = _ref13, val = overrides[key];
                                    if (val === __WEBPACK_IMPORTED_MODULE_6__constants__.DELEGATE.CALL_ORIGINAL) return "continue";
                                    var original = _this10[key];
                                    _this10[key] = function() {
                                        var _this11 = this, _arguments2 = arguments;
                                        return delegate.then(function(data) {
                                            var override = data.overrides[key];
                                            if (val === __WEBPACK_IMPORTED_MODULE_6__constants__.DELEGATE.CALL_DELEGATE) return override.apply(_this11, _arguments2);
                                            if (val instanceof Function) return val(original, override).apply(_this11, _arguments2);
                                            throw new Error("Expected delgate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method");
                                        });
                                    };
                                }();
                                switch (_ret) {
                                  case "break":
                                    break _loop2;

                                  case "continue":
                                    continue;
                                }
                            }
                        }
                    }, {
                        key: "renderTo",
                        value: function(win, element, context) {
                            var _this12 = this;
                            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                            return this.tryInit(function() {
                                return _this12.context = _this12.context || _this12.component.getRenderContext(element, context), 
                                _this12.validateRenderToParent(element, _this12.context), _this12.component.log("render_" + _this12.context + "_to_win", {
                                    element: element,
                                    context: _this12.context
                                }), _this12.delegate(win, _this12.context), _this12.render(element, _this12.context);
                            });
                        }
                    }, {
                        key: "watchForClose",
                        value: function() {
                            var _this13 = this, closeWindowListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.f)(this.window, function() {
                                return _this13.component.log("detect_close_child"), _this13.driver.errorOnCloseDuringInit && _this13.onInit.reject(new Error("Detected close during init")), 
                                __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                    return _this13.props.onClose(__WEBPACK_IMPORTED_MODULE_6__constants__.CLOSE_REASONS.CLOSE_DETECTED);
                                }).finally(function() {
                                    return _this13.destroy();
                                });
                            });
                            this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
                            var unloadWindowListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.s)(window, "beforeunload", function() {
                                if (_this13.component.log("navigate_away"), __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.a(), 
                                closeWindowListener.cancel(), _this13.driver.destroyOnUnload) return _this13.destroyComponent();
                            });
                            this.clean.register("destroyUnloadWindowListener", unloadWindowListener.cancel);
                        }
                    }, {
                        key: "loadUrl",
                        value: function(url) {
                            return this.component.log("load_url"), window.location.href.split("#")[0] === url.split("#")[0] && (url = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.o)(url, {
                                query: _defineProperty({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.k)(), "1")
                            })), this.driver.loadUrl.call(this, url);
                        }
                    }, {
                        key: "hijack",
                        value: function(targetElement) {
                            targetElement.target = this.childWindowName;
                        }
                    }, {
                        key: "runTimeout",
                        value: function() {
                            var _this14 = this;
                            this.props.timeout && (this.timeout = setTimeout(function() {
                                _this14.component.log("timed_out", {
                                    timeout: _this14.props.timeout
                                });
                                var error = new Error("[" + _this14.component.tag + "] Loading component " + _this14.component.tag + " timed out after " + _this14.props.timeout + " milliseconds");
                                _this14.onInit.reject(error), _this14.props.onTimeout(error);
                            }, this.props.timeout), this.clean.register(function() {
                                clearTimeout(_this14.timeout), delete _this14.timeout;
                            }));
                        }
                    }, {
                        key: "listeners",
                        value: function() {
                            var _ref14;
                            return _ref14 = {}, _defineProperty(_ref14, __WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.INIT, function(source, data) {
                                var _this15 = this;
                                return this.childExports = data.exports, this.onInit.resolve(this), this.timeout && clearTimeout(this.timeout), 
                                this.props.onEnter().then(function() {
                                    return __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.a(), {
                                        props: _this15.getPropsForChild(),
                                        context: _this15.context
                                    };
                                });
                            }), _defineProperty(_ref14, __WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.CLOSE, function(source, data) {
                                this.close(data.reason);
                            }), _defineProperty(_ref14, __WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.RESIZE, function(source, data) {
                                if (this.driver.allowResize && this.component.autoResize) return this.resize(data.width, data.height);
                            }), _defineProperty(_ref14, __WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.HIDE, function(source, data) {
                                this.hide();
                            }), _defineProperty(_ref14, __WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.SHOW, function(source, data) {
                                this.show();
                            }), _defineProperty(_ref14, __WEBPACK_IMPORTED_MODULE_6__constants__.POST_MESSAGE.ERROR, function(source, data) {
                                this.error(new Error(data.error));
                            }), _ref14;
                        }
                    }, {
                        key: "resize",
                        value: function(width, height) {
                            if (this.component.log("resize", {
                                height: height,
                                width: width
                            }), this.driver.resize.call(this, width, height), this.elementTemplate || this.iframe) {
                                var overflow = void 0;
                                return this.elementTemplate && (overflow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.t)(this.elementTemplate, "hidden")), 
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.u)(this.elementTemplate || this.iframe).then(function() {
                                    overflow && overflow.reset();
                                });
                            }
                        }
                    }, {
                        key: "restyle",
                        value: function() {
                            return this.driver.restyle.call(this);
                        }
                    }, {
                        key: "hide",
                        value: function() {
                            return this.parentTemplate && (this.parentTemplate.style.display = "none"), this.parentTemplateFrame && (this.parentTemplateFrame.style.display = "none"), 
                            this.driver.hide.call(this);
                        }
                    }, {
                        key: "show",
                        value: function() {
                            return this.parentTemplate && (this.parentTemplate.style.display = "block"), this.parentTemplateFrame && (this.parentTemplateFrame.style.display = "block"), 
                            this.driver.show.call(this);
                        }
                    }, {
                        key: "userClose",
                        value: function() {
                            return this.close(__WEBPACK_IMPORTED_MODULE_6__constants__.CLOSE_REASONS.USER_CLOSED);
                        }
                    }, {
                        key: "close",
                        value: function() {
                            var _this16 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : __WEBPACK_IMPORTED_MODULE_6__constants__.CLOSE_REASONS.PARENT_CALL;
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                return _this16.component.log("close", {
                                    reason: reason
                                }), _this16.props.onClose(reason);
                            }).then(function() {
                                return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.all([ _this16.closeComponent(), _this16.closeContainer() ]);
                            }).then(function() {
                                return _this16.destroy();
                            });
                        }
                    }, {
                        key: "closeContainer",
                        value: function() {
                            var _this17 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : __WEBPACK_IMPORTED_MODULE_6__constants__.CLOSE_REASONS.PARENT_CALL;
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                return _this17.props.onClose(reason);
                            }).then(function() {
                                return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.all([ _this17.closeComponent(reason), _this17.hideContainer() ]);
                            }).then(function() {
                                return _this17.destroyContainer();
                            });
                        }
                    }, {
                        key: "destroyContainer",
                        value: function() {
                            this.clean.run("destroyContainerEvents"), this.clean.run("destroyParentTemplate");
                        }
                    }, {
                        key: "closeComponent",
                        value: function() {
                            var _this18 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : __WEBPACK_IMPORTED_MODULE_6__constants__.CLOSE_REASONS.PARENT_CALL;
                            this.clean.run("destroyCloseWindowListener"), this.clean.run("destroyUnloadWindowListener");
                            var win = this.window;
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                return _this18.cancelContainerEvents();
                            }).then(function() {
                                return _this18.props.onClose(reason);
                            }).then(function() {
                                return _this18.hideComponent();
                            }).then(function() {
                                return _this18.destroyComponent();
                            }).then(function() {
                                _this18.childExports && _this18.context === __WEBPACK_IMPORTED_MODULE_6__constants__.CONTEXT_TYPES.POPUP && !__WEBPACK_IMPORTED_MODULE_1_post_robot_src__.winutil.isWindowClosed(win) && _this18.childExports.close().catch(__WEBPACK_IMPORTED_MODULE_5__lib__.r);
                            });
                        }
                    }, {
                        key: "destroyComponent",
                        value: function() {
                            this.clean.run("destroyCloseWindowListener"), this.clean.run("destroyContainerEvents"), 
                            this.clean.run("destroyWindow");
                        }
                    }, {
                        key: "showContainer",
                        value: function() {
                            if (this.parentTemplate) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.v)(this.parentTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.SHOW_CONTAINER), 
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.w)(this.parentTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.ANIMATION_NAMES.SHOW_CONTAINER);
                        }
                    }, {
                        key: "showComponent",
                        value: function() {
                            var _this19 = this;
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                if (_this19.props.onDisplay) return _this19.props.onDisplay();
                            }).then(function() {
                                _this19.elementTemplate && (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.v)(_this19.elementTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.SHOW_COMPONENT), 
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.w)(_this19.elementTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.ANIMATION_NAMES.SHOW_COMPONENT));
                            });
                        }
                    }, {
                        key: "hideContainer",
                        value: function() {
                            if (this.parentTemplate) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.v)(this.parentTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.HIDE_CONTAINER), 
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.v)(this.parentTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.LOADING), 
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.x)(this.parentTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.ANIMATION_NAMES.HIDE_CONTAINER);
                        }
                    }, {
                        key: "hideComponent",
                        value: function() {
                            if (this.parentTemplate && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.v)(this.parentTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.LOADING), 
                            this.elementTemplate) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.v)(this.elementTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.HIDE_COMPONENT), 
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.x)(this.elementTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.ANIMATION_NAMES.HIDE_COMPONENT);
                        }
                    }, {
                        key: "focus",
                        value: function() {
                            if (!this.window) throw new Error("No window to focus");
                            this.component.log("focus"), this.window.focus();
                        }
                    }, {
                        key: "getComponentTemplate",
                        value: function() {
                            return this.component.componentTemplate;
                        }
                    }, {
                        key: "createComponentTemplate",
                        value: function() {
                            var _this20 = this;
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                return _this20.getComponentTemplate();
                            }).then(function(componentTemplate) {
                                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.y)(componentTemplate, {
                                    id: __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.XCOMPONENT + "-" + _this20.props.uid,
                                    props: _this20.props,
                                    CLASS: __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES,
                                    ANIMATION: __WEBPACK_IMPORTED_MODULE_6__constants__.ANIMATION_NAMES
                                });
                            }).then(function(html) {
                                try {
                                    _this20.window.document.open(), _this20.window.document.write(html), _this20.window.document.close();
                                } catch (err) {
                                    try {
                                        _this20.window.location = "javascript: document.open(); document.write(" + JSON.stringify(html) + "); document.close();";
                                    } catch (err2) {}
                                }
                            });
                        }
                    }, {
                        key: "getParentTemplate",
                        value: function() {
                            return this.component.parentTemplate;
                        }
                    }, {
                        key: "openContainer",
                        value: function(element) {
                            var _this21 = this;
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                return _this21.getParentTemplate();
                            }).then(function(parentTemplate) {
                                if (parentTemplate !== __WEBPACK_IMPORTED_MODULE_10__component_templates_parent_htm___default.a || _this21.context !== __WEBPACK_IMPORTED_MODULE_6__constants__.CONTEXT_TYPES.IFRAME) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.y)(parentTemplate, {
                                    id: __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.XCOMPONENT + "-" + _this21.props.uid,
                                    props: _this21.props,
                                    CLASS: __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES,
                                    ANIMATION: __WEBPACK_IMPORTED_MODULE_6__constants__.ANIMATION_NAMES
                                }).then(function(html) {
                                    var el = void 0;
                                    if (element) {
                                        if (!(el = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.z)(element))) throw new Error("Could not find element: " + element);
                                    } else _this21.parentTemplateFrame = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.A)(null, {
                                        name: "__lightbox_container__" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.k)() + "__",
                                        scrolling: "no"
                                    }, document.body), _this21.parentTemplateFrame.style.display = "block", _this21.parentTemplateFrame.style.position = "fixed", 
                                    _this21.parentTemplateFrame.style.top = "0", _this21.parentTemplateFrame.style.left = "0", 
                                    _this21.parentTemplateFrame.style.width = "100%", _this21.parentTemplateFrame.style.height = "100%", 
                                    _this21.parentTemplateFrame.style.zIndex = "2147483647", _this21.parentTemplateFrame.contentWindow.document.open(), 
                                    _this21.parentTemplateFrame.contentWindow.document.write("<body></body>"), _this21.parentTemplateFrame.contentWindow.document.close(), 
                                    el = _this21.parentTemplateFrame.contentWindow.document.body;
                                    if (_this21.parentTemplate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.B)("div", {
                                        html: html,
                                        attributes: {
                                            id: __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.XCOMPONENT + "-" + _this21.props.uid
                                        },
                                        class: [ __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.XCOMPONENT, __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.XCOMPONENT + "-" + _this21.context ]
                                    }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.C)(_this21.parentTemplate), 
                                    el.appendChild(_this21.parentTemplate), _this21.driver.renderedIntoParentTemplate) {
                                        if (_this21.elementTemplate = _this21.parentTemplate.getElementsByClassName(__WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.ELEMENT)[0], 
                                        !_this21.elementTemplate) throw new Error("Could not find element to render component into");
                                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.C)(_this21.elementTemplate);
                                    }
                                    var eventHandlers = [];
                                    _this21.driver.focusable && eventHandlers.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.D)(_this21.parentTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.FOCUS, __WEBPACK_IMPORTED_MODULE_6__constants__.EVENT_NAMES.CLICK, function(event) {
                                        return _this21.focus();
                                    })), eventHandlers.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.D)(_this21.parentTemplate, __WEBPACK_IMPORTED_MODULE_6__constants__.CLASS_NAMES.CLOSE, __WEBPACK_IMPORTED_MODULE_6__constants__.EVENT_NAMES.CLICK, function(event) {
                                        return _this21.userClose();
                                    })), _this21.clean.register("destroyContainerEvents", function() {
                                        for (var _iterator5 = eventHandlers, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                                            var _ref15;
                                            if (_isArray5) {
                                                if (_i5 >= _iterator5.length) break;
                                                _ref15 = _iterator5[_i5++];
                                            } else {
                                                if (_i5 = _iterator5.next(), _i5.done) break;
                                                _ref15 = _i5.value;
                                            }
                                            _ref15.cancel();
                                        }
                                    }), _this21.clean.register("destroyParentTemplate", function() {
                                        _this21.parentTemplateFrame && _this21.parentTemplateFrame.parentNode.removeChild(_this21.parentTemplateFrame), 
                                        _this21.parentTemplate && _this21.parentTemplate.parentNode.removeChild(_this21.parentTemplate), 
                                        delete _this21.parentTemplateFrame, delete _this21.parentTemplate;
                                    });
                                });
                            });
                        }
                    }, {
                        key: "cancelContainerEvents",
                        value: function() {
                            this.clean.run("destroyContainerEvents");
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            var _this22 = this;
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                if (_this22.clean.hasTasks()) return _this22.component.log("destroy"), __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.a(), 
                                _this22.clean.all();
                            });
                        }
                    }, {
                        key: "tryInit",
                        value: function(method) {
                            var _this23 = this;
                            return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(method).catch(function(err) {
                                throw _this23.onInit.reject(err), err;
                            }).then(function() {
                                return _this23.onInit;
                            });
                        }
                    }, {
                        key: "error",
                        value: function(err) {
                            var _this24 = this;
                            if (this.handledErrors = this.handledErrors || [], this.handledErrors.indexOf(err) === -1) return this.handledErrors.push(err), 
                            __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.try(function() {
                                return _this24.component.logError("error", {
                                    error: err.stack || err.toString()
                                }), _this24.onInit.reject(err), _this24.props.onError(err);
                            }).then(function() {
                                return _this24.destroy();
                            }).catch(function(err2) {
                                throw new Error("An error was encountered while handling error:\n\n " + err.stack + "\n\n" + err2.stack);
                            }).then(function() {
                                throw err;
                            });
                        }
                    }, {
                        key: "driver",
                        get: function() {
                            if (!this.context) throw new Error("Context not set");
                            return __WEBPACK_IMPORTED_MODULE_7__drivers__.a[this.context];
                        }
                    } ]), ParentComponent;
                }(__WEBPACK_IMPORTED_MODULE_3__base__.a), _applyDecoratedDescriptor(_class.prototype, "getDomain", [ promise ], Object.getOwnPropertyDescriptor(_class.prototype, "getDomain"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "getBridgeDomain", [ promise ], Object.getOwnPropertyDescriptor(_class.prototype, "getBridgeDomain"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "updateProps", [ promise ], Object.getOwnPropertyDescriptor(_class.prototype, "updateProps"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "openBridge", [ promise ], Object.getOwnPropertyDescriptor(_class.prototype, "openBridge"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "open", [ memoize, promise ], Object.getOwnPropertyDescriptor(_class.prototype, "open"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "render", [ promise ], Object.getOwnPropertyDescriptor(_class.prototype, "render"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "loadUrl", [ promise ], Object.getOwnPropertyDescriptor(_class.prototype, "loadUrl"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "resize", [ promise ], Object.getOwnPropertyDescriptor(_class.prototype, "resize"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "close", [ memoize ], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "closeContainer", [ memoize ], Object.getOwnPropertyDescriptor(_class.prototype, "closeContainer"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "destroyContainer", [ memoize, promise ], Object.getOwnPropertyDescriptor(_class.prototype, "destroyContainer"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "closeComponent", [ memoize ], Object.getOwnPropertyDescriptor(_class.prototype, "closeComponent"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "showContainer", [ memoize, promise ], Object.getOwnPropertyDescriptor(_class.prototype, "showContainer"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "showComponent", [ memoize, promise ], Object.getOwnPropertyDescriptor(_class.prototype, "showComponent"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "hideContainer", [ memoize, promise ], Object.getOwnPropertyDescriptor(_class.prototype, "hideContainer"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "hideComponent", [ memoize, promise ], Object.getOwnPropertyDescriptor(_class.prototype, "hideComponent"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "getComponentTemplate", [ promise ], Object.getOwnPropertyDescriptor(_class.prototype, "getComponentTemplate"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "createComponentTemplate", [ memoize, promise ], Object.getOwnPropertyDescriptor(_class.prototype, "createComponentTemplate"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "getParentTemplate", [ promise ], Object.getOwnPropertyDescriptor(_class.prototype, "getParentTemplate"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "openContainer", [ memoize, promise ], Object.getOwnPropertyDescriptor(_class.prototype, "openContainer"), _class.prototype), 
                _applyDecoratedDescriptor(_class.prototype, "error", [ promise ], Object.getOwnPropertyDescriptor(_class.prototype, "error"), _class.prototype), 
                _class);
            }).call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js"));
        },
        "./node_modules/xcomponent/src/component/parent/props.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function normalizeProp(component, instance, props, key, value) {
                var prop = component.props[key];
                if (!(props.hasOwnProperty(key) && null !== value && void 0 !== value && "" !== value) && prop.def && (value = prop.def instanceof Function ? prop.def.call(component, props) : prop.def), 
                !value && prop.alias && props[prop.alias] && (value = props[prop.alias]), prop.decorate && (value = prop.decorate(value)), 
                prop.value && (value = prop.value), prop.getter) {
                    if (!value) return;
                    if (value instanceof Function) value = value.bind(instance); else {
                        var val = value;
                        value = function() {
                            return val || __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.resolve(val);
                        };
                    }
                    value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.I)(value, {
                        name: key,
                        timeout: prop.timeout
                    });
                    var _value = value;
                    if (value = function() {
                        return component.log("call_getter_" + key), _value.apply(this, arguments).then(function(result) {
                            return component.log("return_getter_" + key), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__validate__.c)(prop, key, result, props), 
                            result;
                        });
                    }, prop.memoize) {
                        var _val = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.l)(value);
                        value = function() {
                            return _val();
                        };
                    }
                    return value;
                }
                if ("boolean" === prop.type) value = Boolean(value); else if ("function" === prop.type) if (value) {
                    value = value.bind(instance), prop.denodeify && (value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.J)(value)), 
                    prop.promisify && (value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.K)(value));
                    var original = value;
                    value = function() {
                        return component.log("call_prop_" + key), original.apply(this, arguments);
                    }, prop.once && (value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.n)(value)), 
                    prop.memoize && (value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.l)(value));
                } else !value && prop.noop && (value = __WEBPACK_IMPORTED_MODULE_2__lib__.r, prop.denodeify && (value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.J)(value)), 
                prop.promisify && (value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.K)(value))); else "string" === prop.type || "object" === prop.type || "number" === prop.type && void 0 !== value && (value = parseInt(value, 10));
                return value;
            }
            function normalizeProps(component, instance, props) {
                var required = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                props = props || {};
                for (var result = {}, _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var key = _ref;
                    (required || props.hasOwnProperty(key)) && (result[key] = normalizeProp(component, instance, props, key, props[key]));
                }
                return result;
            }
            function propsToQuery(propsDef, props) {
                var params = {};
                return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.all(Object.keys(props).map(function(key) {
                    var prop = propsDef[key], queryParam = key;
                    return "string" == typeof prop.queryParam && (queryParam = prop.queryParam), __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.resolve().then(function() {
                        var value = props[key];
                        if (value && prop.queryParam) return prop.getter ? value.call().then(function(result) {
                            return result;
                        }) : value;
                    }).then(function(value) {
                        if (value) {
                            "function" == typeof prop.queryParam && (queryParam = prop.queryParam(value));
                            var result = void 0;
                            if ("boolean" == typeof value) result = "1"; else if ("string" == typeof value) result = value.toString(); else {
                                if ("function" == typeof value) return;
                                if ("object" === (void 0 === value ? "undefined" : _typeof(value))) {
                                    if ("json" !== prop.serialization) {
                                        result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.L)(value, key);
                                        for (var dotkey in result) params[dotkey] = result[dotkey];
                                        return;
                                    }
                                    result = JSON.stringify(value);
                                } else "number" == typeof value && (result = value.toString());
                            }
                            params[queryParam] = result;
                        }
                    });
                })).then(function() {
                    return params;
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_1__validate__ = __webpack_require__("./node_modules/xcomponent/src/component/parent/validate.js"), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js");
            __webpack_exports__.a = normalizeProps, __webpack_exports__.b = propsToQuery;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        },
        "./node_modules/xcomponent/src/component/parent/validate.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function validateProp(prop, key, value, props) {
                var required = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
                if (null !== value && void 0 !== value && "" !== value) {
                    if (!value.then || !prop.promise) {
                        if ("function" === prop.type) {
                            if (!(value instanceof Function)) throw new Error("Prop is not of type function: " + key);
                        } else if ("string" === prop.type) {
                            if (!("string" == typeof value || prop.getter && (value instanceof Function || value && value.then))) throw new Error("Prop is not of type string: " + key);
                        } else if ("object" === prop.type) try {
                            JSON.stringify(value);
                        } catch (err) {
                            throw new Error("Unable to serialize prop: " + key);
                        } else if ("number" === prop.type && isNaN(parseInt(value, 10))) throw new Error("Prop is not a number: " + key);
                        "function" == typeof prop.validate && prop.validate(value, props);
                    }
                } else if (required && prop.required !== !1 && !prop.hasOwnProperty("def")) throw new Error("Prop is required: " + key);
            }
            function validateProps(component, props) {
                var required = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                props = props || {};
                for (var _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var key = _ref, prop = component.props[key];
                    if (prop.alias && props.hasOwnProperty(prop.alias)) {
                        var value = props[prop.alias];
                        delete props[prop.alias], props[key] || (props[key] = value);
                    }
                }
                for (var _iterator2 = Object.keys(props), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        if (_i2 = _iterator2.next(), _i2.done) break;
                        _ref2 = _i2.value;
                    }
                    var _key = _ref2;
                    if (!component.props.hasOwnProperty(_key)) throw new Error("[" + component.tag + "] Invalid prop: " + _key);
                }
                for (var _iterator3 = Object.keys(component.props), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        if (_i3 = _iterator3.next(), _i3.done) break;
                        _ref3 = _i3.value;
                    }
                    var _key2 = _ref3;
                    validateProp(component.props[_key2], _key2, props[_key2], props, required);
                }
            }
            function validate(component, options) {
                var props = options.props || {};
                if (props.env && component.envUrls && !component.envUrls[props.env]) throw new Error("Invalid env: " + props.env);
            }
            __webpack_exports__.c = validateProp, __webpack_exports__.b = validateProps, __webpack_exports__.a = validate;
        },
        "./node_modules/xcomponent/src/component/window.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function normalize(str) {
                return str && str.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, "").replace(/[^a-z0-9A-Z]+/g, "_");
            }
            function buildChildWindowName(name, version) {
                var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                options.id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.k)(), options.domain = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.b)(window);
                var encodedName = normalize(name), encodedVersion = normalize(version), encodedOptions = __WEBPACK_IMPORTED_MODULE_1_hi_base32___default.a.encode(JSON.stringify(options)).replace(/\=/g, "").toLowerCase();
                if (!encodedName) throw new Error("Invalid name: " + name + " - must contain alphanumeric characters");
                if (!encodedVersion) throw new Error("Invalid version: " + version + " - must contain alphanumeric characters");
                return [ __WEBPACK_IMPORTED_MODULE_3__constants__.XCOMPONENT, encodedName, encodedVersion, encodedOptions ].join("__");
            }
            function getParentDomain() {
                return getComponentMeta().domain;
            }
            function getPosition(options) {
                var left = void 0, top = void 0, width = options.width, height = options.height;
                return window.outerWidth ? (left = Math.round((window.outerWidth - width) / 2) + window.screenX, 
                top = Math.round((window.outerHeight - height) / 2) + window.screenY) : window.screen.width && (left = Math.round((window.screen.width - width) / 2), 
                top = Math.round((window.screen.height - height) / 2)), {
                    x: left,
                    y: top
                };
            }
            var __WEBPACK_IMPORTED_MODULE_0_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_1_hi_base32__ = __webpack_require__("./node_modules/hi-base32/src/base32.js"), __WEBPACK_IMPORTED_MODULE_1_hi_base32___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hi_base32__), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__("./node_modules/xcomponent/src/constants.js");
            __webpack_exports__.f = buildChildWindowName, __webpack_require__.d(__webpack_exports__, "d", function() {
                return getComponentMeta;
            }), __webpack_exports__.a = getParentDomain, __webpack_require__.d(__webpack_exports__, "e", function() {
                return isXComponentWindow;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return getParentComponentWindow;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return getParentRenderWindow;
            }), __webpack_exports__.g = getPosition;
            var _slicedToArray = function() {
                function sliceIterator(arr, i) {
                    var _arr = [], _n = !0, _d = !1, _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                        !i || _arr.length !== i); _n = !0) ;
                    } catch (err) {
                        _d = !0, _e = err;
                    } finally {
                        try {
                            !_n && _i.return && _i.return();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function(arr, i) {
                    if (Array.isArray(arr)) return arr;
                    if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
            }(), getComponentMeta = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.l)(function() {
                if (window.name) {
                    var _window$name$split = window.name.split("__"), _window$name$split2 = _slicedToArray(_window$name$split, 4), xcomp = _window$name$split2[0], name = _window$name$split2[1], version = _window$name$split2[2], encodedOptions = _window$name$split2[3];
                    if (xcomp === __WEBPACK_IMPORTED_MODULE_3__constants__.XCOMPONENT) {
                        var componentMeta = void 0;
                        try {
                            componentMeta = JSON.parse(__WEBPACK_IMPORTED_MODULE_1_hi_base32___default.a.decode(encodedOptions.toUpperCase()));
                        } catch (err) {
                            return;
                        }
                        return componentMeta.name = name, componentMeta.version = version.replace(/_/g, "."), 
                        componentMeta;
                    }
                }
            }), isXComponentWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.l)(function() {
                return Boolean(getComponentMeta());
            }), getParentComponentWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.l)(function() {
                var componentMeta = getComponentMeta();
                if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by xcomponent");
                var parentWindow = __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.winutil.getAncestor(window);
                if (!parentWindow) throw new Error("Can not find parent window");
                if (componentMeta.parent === __WEBPACK_IMPORTED_MODULE_3__constants__.WINDOW_REFERENCES.DIRECT_PARENT) return parentWindow;
                if (componentMeta.parent === __WEBPACK_IMPORTED_MODULE_3__constants__.WINDOW_REFERENCES.PARENT_PARENT) {
                    if (!(parentWindow = __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.winutil.getAncestor(parentWindow))) throw new Error("Can not find parent component window");
                    return parentWindow;
                }
                var parentFrame = __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.winutil.findFrameByName(parentWindow, componentMeta.parent);
                if (!parentFrame) throw new Error("Can not find frame with name: " + componentMeta.parent);
                return parentFrame;
            }), getParentRenderWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.l)(function() {
                var componentMeta = getComponentMeta();
                if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by xcomponent");
                var parentWindow = __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.winutil.getAncestor(window);
                if (!parentWindow) throw new Error("Can not find parent window");
                if (componentMeta.renderParent === __WEBPACK_IMPORTED_MODULE_3__constants__.WINDOW_REFERENCES.DIRECT_PARENT) return parentWindow;
                if (componentMeta.renderParent === __WEBPACK_IMPORTED_MODULE_3__constants__.WINDOW_REFERENCES.PARENT_PARENT) {
                    if (!(parentWindow = __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.winutil.getAncestor(parentWindow))) throw new Error("Can not find parent render window");
                    return parentWindow;
                }
                if (componentMeta.renderParent === __WEBPACK_IMPORTED_MODULE_3__constants__.WINDOW_REFERENCES.PARENT_UID) {
                    if (!(parentWindow = getParentComponentWindow()[__WEBPACK_IMPORTED_MODULE_3__constants__.__XCOMPONENT__].windows[componentMeta.uid])) throw new Error("Can not find parent render window");
                    return parentWindow;
                }
                throw new Error("Unrecognized renderParent reference: " + componentMeta.renderParent);
            });
        },
        "./node_modules/xcomponent/src/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js");
            __webpack_require__.d(__webpack_exports__, "XCOMPONENT", function() {
                return XCOMPONENT;
            }), __webpack_require__.d(__webpack_exports__, "__XCOMPONENT__", function() {
                return __XCOMPONENT__;
            }), __webpack_require__.d(__webpack_exports__, "POST_MESSAGE", function() {
                return POST_MESSAGE;
            }), __webpack_require__.d(__webpack_exports__, "PROP_TYPES", function() {
                return PROP_TYPES;
            }), __webpack_require__.d(__webpack_exports__, "INITIAL_PROPS", function() {
                return INITIAL_PROPS;
            }), __webpack_require__.d(__webpack_exports__, "WINDOW_REFERENCES", function() {
                return WINDOW_REFERENCES;
            }), __webpack_require__.d(__webpack_exports__, "PROP_TYPES_LIST", function() {
                return PROP_TYPES_LIST;
            }), __webpack_require__.d(__webpack_exports__, "CONTEXT_TYPES", function() {
                return CONTEXT_TYPES;
            }), __webpack_require__.d(__webpack_exports__, "CLASS_NAMES", function() {
                return CLASS_NAMES;
            }), __webpack_require__.d(__webpack_exports__, "ANIMATION_NAMES", function() {
                return ANIMATION_NAMES;
            }), __webpack_require__.d(__webpack_exports__, "EVENT_NAMES", function() {
                return EVENT_NAMES;
            }), __webpack_require__.d(__webpack_exports__, "CLOSE_REASONS", function() {
                return CLOSE_REASONS;
            }), __webpack_require__.d(__webpack_exports__, "CONTEXT_TYPES_LIST", function() {
                return CONTEXT_TYPES_LIST;
            }), __webpack_require__.d(__webpack_exports__, "DELEGATE", function() {
                return DELEGATE;
            });
            var XCOMPONENT = "xcomponent", __XCOMPONENT__ = "__" + XCOMPONENT + "__", POST_MESSAGE = {
                INIT: XCOMPONENT + "_init",
                PROPS: XCOMPONENT + "_props",
                PROP_CALLBACK: XCOMPONENT + "_prop_callback",
                CLOSE: XCOMPONENT + "_close",
                REDIRECT: XCOMPONENT + "_redirect",
                RESIZE: XCOMPONENT + "_resize",
                DELEGATE: XCOMPONENT + "_delegate",
                ERROR: XCOMPONENT + "_error",
                HIDE: XCOMPONENT + "_hide",
                SHOW: XCOMPONENT + "_show"
            }, PROP_TYPES = {
                STRING: "string",
                OBJECT: "object",
                FUNCTION: "function",
                BOOLEAN: "boolean",
                NUMBER: "number"
            }, INITIAL_PROPS = {
                RAW: "raw",
                UID: "uid"
            }, WINDOW_REFERENCES = {
                DIRECT_PARENT: "__direct_parent__",
                PARENT_PARENT: "__parent_parent__",
                PARENT_UID: "__parent_uid__"
            }, PROP_TYPES_LIST = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.a)(PROP_TYPES), CONTEXT_TYPES = {
                IFRAME: "iframe",
                LIGHTBOX: "lightbox",
                POPUP: "popup"
            }, CLASS_NAMES = {
                XCOMPONENT: "" + XCOMPONENT,
                COMPONENT: XCOMPONENT + "-component",
                CLOSE: XCOMPONENT + "-close",
                FOCUS: XCOMPONENT + "-focus",
                ELEMENT: XCOMPONENT + "-element",
                IFRAME: XCOMPONENT + "-iframe",
                LIGHTBOX: XCOMPONENT + "-lightbox",
                POPUP: XCOMPONENT + "-popup",
                LOADING: XCOMPONENT + "-loading",
                SHOW_CONTAINER: XCOMPONENT + "-show-container",
                SHOW_COMPONENT: XCOMPONENT + "-show-component",
                HIDE_CONTAINER: XCOMPONENT + "-hide-container",
                HIDE_COMPONENT: XCOMPONENT + "-hide-component"
            }, ANIMATION_NAMES = {
                SHOW_CONTAINER: XCOMPONENT + "-show-container",
                SHOW_COMPONENT: XCOMPONENT + "-show-component",
                HIDE_CONTAINER: XCOMPONENT + "-hide-container",
                HIDE_COMPONENT: XCOMPONENT + "-hide-component"
            }, EVENT_NAMES = {
                CLICK: "click"
            }, CLOSE_REASONS = {
                PARENT_CALL: "parent_call",
                CHILD_CALL: "child_call",
                CLOSE_DETECTED: "close_detected",
                USER_CLOSED: "user_closed",
                PARENT_CLOSE_DETECTED: "parent_close_detected"
            }, CONTEXT_TYPES_LIST = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.a)(CONTEXT_TYPES), DELEGATE = {
                CALL_ORIGINAL: "call_original",
                CALL_DELEGATE: "call_delegate"
            };
        },
        "./node_modules/xcomponent/src/drivers/angular.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return angular;
            });
            var angular = {
                isActive: function() {
                    return Boolean(window.angular);
                },
                register: function(component) {
                    window.angular.module(component.tag, []).directive(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.N)(component.tag), function() {
                        for (var scope = {}, _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if (_i = _iterator.next(), _i.done) break;
                                _ref = _i.value;
                            }
                            scope[_ref] = "=";
                        }
                        return {
                            scope: scope,
                            restrict: "E",
                            controller: function($scope, $element) {
                                function getProps() {
                                    for (var instanceProps = {}, _iterator2 = Object.keys(scope), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                                        var _ref2;
                                        if (_isArray2) {
                                            if (_i2 >= _iterator2.length) break;
                                            _ref2 = _iterator2[_i2++];
                                        } else {
                                            if (_i2 = _iterator2.next(), _i2.done) break;
                                            _ref2 = _i2.value;
                                        }
                                        var key = _ref2;
                                        instanceProps[key] = $scope[key];
                                    }
                                    return instanceProps;
                                }
                                component.log("instantiate_angular_component");
                                var parent = component.init(getProps(), null, $element[0]);
                                parent.render($element[0]), $scope.$watch(function() {
                                    parent.updateProps(getProps());
                                });
                            }
                        };
                    });
                }
            };
        },
        "./node_modules/xcomponent/src/drivers/ember.js": function(module, exports) {},
        "./node_modules/xcomponent/src/drivers/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__script__ = __webpack_require__("./node_modules/xcomponent/src/drivers/script.js");
            __webpack_require__.d(__webpack_exports__, "htmlComponent", function() {
                return __WEBPACK_IMPORTED_MODULE_0__script__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_1__react__ = __webpack_require__("./node_modules/xcomponent/src/drivers/react.js");
            __webpack_require__.d(__webpack_exports__, "react", function() {
                return __WEBPACK_IMPORTED_MODULE_1__react__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_2__angular__ = __webpack_require__("./node_modules/xcomponent/src/drivers/angular.js");
            __webpack_require__.d(__webpack_exports__, "angular", function() {
                return __WEBPACK_IMPORTED_MODULE_2__angular__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_3__ember__ = __webpack_require__("./node_modules/xcomponent/src/drivers/ember.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ember__);
            for (var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_3__ember__) [ "htmlComponent", "react", "angular", "default" ].indexOf(__WEBPACK_IMPORT_KEY__) < 0 && function(key) {
                __webpack_require__.d(__webpack_exports__, key, function() {
                    return __WEBPACK_IMPORTED_MODULE_3__ember__[key];
                });
            }(__WEBPACK_IMPORT_KEY__);
        },
        "./node_modules/xcomponent/src/drivers/react.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return react;
            });
            var react = {
                isActive: function() {
                    return Boolean(window.React);
                },
                register: function(component) {
                    component.react = window.React.createClass({
                        render: function() {
                            return window.React.createElement("div", null);
                        },
                        componentDidMount: function() {
                            component.log("instantiate_react_component");
                            var el = window.ReactDOM.findDOMNode(this), parent = component.init(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.e)({}, this.props), null, el);
                            this.setState({
                                parent: parent
                            }), parent.render(el);
                        },
                        componentDidUpdate: function() {
                            this.state && this.state.parent && this.state.parent.updateProps(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.e)({}, this.props));
                        }
                    });
                }
            };
        },
        "./node_modules/xcomponent/src/drivers/script.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return htmlComponent;
            });
            var htmlComponent = {
                isActive: function() {
                    return !0;
                },
                register: function register(component) {
                    function render(element) {
                        if (element && element.tagName && "script" === element.tagName.toLowerCase() && element.attributes.type && "application/x-component" === element.attributes.type.value && element.attributes["data-component"] && element.attributes["data-component"].value === component.tag) {
                            component.log("instantiate_script_component");
                            var props = eval("(" + element.innerText + ")"), container = document.createElement("div");
                            element.parentNode.replaceChild(container, element), component.render(props, container);
                        }
                    }
                    function scan() {
                        for (var scriptTags = Array.prototype.slice.call(document.getElementsByTagName("script")), _iterator = scriptTags, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if (_i = _iterator.next(), _i.done) break;
                                _ref = _i.value;
                            }
                            render(_ref);
                        }
                    }
                    scan(), document.addEventListener("DOMContentLoaded", scan), window.addEventListener("load", scan), 
                    document.addEventListener("DOMNodeInserted", function(event) {
                        render(event.target);
                    });
                }
            };
        },
        "./node_modules/xcomponent/src/error.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function PopupOpenError(message) {
                this.message = message;
            }
            function IntegrationError(message) {
                this.message = message;
            }
            __webpack_exports__.a = PopupOpenError, __webpack_exports__.b = IntegrationError, 
            PopupOpenError.prototype = Object.create(Error.prototype), IntegrationError.prototype = Object.create(Error.prototype);
        },
        "./node_modules/xcomponent/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__("./node_modules/xcomponent/src/interface.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.PopupOpenError;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.destroyAll;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.create;
            }), __webpack_require__.d(__webpack_exports__, "d", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.CONSTANTS;
            });
        },
        "./node_modules/xcomponent/src/interface.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function create(options) {
                return new __WEBPACK_IMPORTED_MODULE_1__component__.a(options);
            }
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__("./node_modules/xcomponent/src/component/index.js");
            __webpack_require__.d(__webpack_exports__, "getByTag", function() {
                return __WEBPACK_IMPORTED_MODULE_1__component__.b;
            }), __webpack_require__.d(__webpack_exports__, "destroyAll", function() {
                return __WEBPACK_IMPORTED_MODULE_1__component__.c;
            });
            var __WEBPACK_IMPORTED_MODULE_2__error__ = __webpack_require__("./node_modules/xcomponent/src/error.js");
            __webpack_require__.d(__webpack_exports__, "PopupOpenError", function() {
                return __WEBPACK_IMPORTED_MODULE_2__error__.a;
            }), __webpack_require__.d(__webpack_exports__, "IntegrationError", function() {
                return __WEBPACK_IMPORTED_MODULE_2__error__.b;
            });
            var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__("./node_modules/xcomponent/src/constants.js");
            __webpack_exports__.create = create, __webpack_require__.d(__webpack_exports__, "postRobot", function() {
                return postRobot;
            }), __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
                return CONSTANTS;
            });
            var postRobot = __WEBPACK_IMPORTED_MODULE_0_post_robot_src__, CONSTANTS = __WEBPACK_IMPORTED_MODULE_3__constants__;
        },
        "./node_modules/xcomponent/src/lib/css.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isPerc(str) {
                return "string" == typeof str && /^[0-9]+%$/.test(str);
            }
            function isNum(num) {
                return "number" == typeof num;
            }
            function toNum(str) {
                return isNum(str) ? str : parseInt(str.match(/^([0-9]+)(px|%)$/)[1], 10);
            }
            function toPx(num) {
                return toNum(num) + "px";
            }
            function toCSS(num) {
                return isPerc(num) ? num : toPx(num);
            }
            __webpack_exports__.b = isPerc, __webpack_exports__.c = toNum, __webpack_exports__.a = toCSS;
        },
        "./node_modules/xcomponent/src/lib/dom.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isElement(element) {
                return element instanceof window.Element || "object" === (void 0 === element ? "undefined" : _typeof(element)) && 1 === element.nodeType && "object" === _typeof(element.style) && "object" === _typeof(element.ownerDocument);
            }
            function getElement(id) {
                if (isElement(id)) return id;
                if ("string" == typeof id) {
                    var element = document.getElementById(id);
                    if (element) return element;
                    if (document.querySelector) return document.querySelector(id);
                }
            }
            function elementReady(id) {
                return new __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a(function(resolve, reject) {
                    var el = getElement(id);
                    if (el) return resolve(el);
                    if ("complete" === window.document.readyState) return reject(new Error("Document is ready and element " + id + " does not exist"));
                    var interval = setInterval(function() {
                        return el = getElement(id), el ? (clearInterval(interval), resolve(el)) : "complete" === window.document.readyState ? (clearInterval(interval), 
                        reject(new Error("Document is ready and element " + id + " does not exist"))) : void 0;
                    }, 10);
                });
            }
            function popup(url, options) {
                var params = Object.keys(options).map(function(key) {
                    if (options[key]) return key + "=" + options[key];
                }).filter(Boolean).join(","), win = window.open(url, options.name, params, !0);
                if (__WEBPACK_IMPORTED_MODULE_0_post_robot_src__.winutil.isWindowClosed(win)) {
                    throw new __WEBPACK_IMPORTED_MODULE_4__error__.a("Can not open popup window - blocked");
                }
                return win;
            }
            function iframe(url, options, container) {
                container = getElement(container);
                for (var frame = document.createElement("iframe"), _iterator = Object.keys(options), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var key = _ref;
                    frame[key] = options[key];
                }
                return frame.frameBorder = "0", frame.allowTransparency = "true", container && container.appendChild(frame), 
                frame;
            }
            function onCloseWindow(win, callback) {
                callback = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fn__.a)(callback);
                var interval = void 0, checkWindowClosed = function() {
                    if (__WEBPACK_IMPORTED_MODULE_0_post_robot_src__.winutil.isWindowClosed(win, !1)) return clearInterval(interval), 
                    callback();
                };
                return interval = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.c)(checkWindowClosed, 50), 
                checkWindowClosed(), {
                    cancel: function() {
                        interval.cancel(), callback = __WEBPACK_IMPORTED_MODULE_2__fn__.b;
                    }
                };
            }
            function addEventListener(obj, event, handler) {
                return obj.addEventListener(event, handler), {
                    cancel: function() {
                        obj.removeEventListener(event, handler);
                    }
                };
            }
            function createElement() {
                var tag = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div", options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, element = (arguments.length > 2 && void 0 !== arguments[2] && arguments[2], 
                document.createElement(tag));
                if (options.style && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.d)(element.style, options.style), 
                options.html && (element.innerHTML = options.html), options.class && (element.className = options.class.join(" ")), 
                options.attributes) for (var _iterator2 = Object.keys(options.attributes), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        if (_i2 = _iterator2.next(), _i2.done) break;
                        _ref2 = _i2.value;
                    }
                    var key = _ref2;
                    element.setAttribute(key, options.attributes[key]);
                }
                return options.styleSheet && (element.styleSheet ? element.styleSheet.cssText = options.styleSheet : element.appendChild(document.createTextNode(options.styleSheet))), 
                element;
            }
            function addEventToClass(element, className, eventName, handler) {
                for (var handlers = [], _iterator3 = Array.prototype.slice.call(element.getElementsByClassName(className)), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        if (_i3 = _iterator3.next(), _i3.done) break;
                        _ref3 = _i3.value;
                    }
                    var el = _ref3, eventHandler = function(event) {
                        event.preventDefault(), event.stopPropagation(), handler();
                    };
                    handlers.push({
                        el: el,
                        eventHandler: eventHandler
                    }), el.addEventListener(eventName, eventHandler);
                }
                return {
                    cancel: function() {
                        for (var _iterator4 = handlers, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                            var _ref5;
                            if (_isArray4) {
                                if (_i4 >= _iterator4.length) break;
                                _ref5 = _iterator4[_i4++];
                            } else {
                                if (_i4 = _iterator4.next(), _i4.done) break;
                                _ref5 = _i4.value;
                            }
                            var _ref6 = _ref5, el = _ref6.el, eventHandler = _ref6.eventHandler;
                            el.removeEventListener(eventName, eventHandler);
                        }
                    }
                };
            }
            function template(html, context) {
                return __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a.try(function() {
                    return "function" == typeof html ? html(context || {}) : html.replace(/\{([\w_\.]+)\}/g, function(variable) {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.e)(context, variable.slice(1, variable.length - 1), "");
                    });
                }).then(function(result) {
                    if ("string" != typeof result) throw new Error("Expected template to return string, got " + (void 0 === result ? "undefined" : _typeof(result)));
                    return result;
                });
            }
            function getDomain(win) {
                return win = win || window, win.mockDomain && 0 === win.mockDomain.indexOf("mock://") ? win.mockDomain : win.location.protocol + "//" + win.location.host;
            }
            function getDomainFromUrl(url) {
                var domain = void 0;
                return url.match(/^(https?|mock|file):\/\//) ? (domain = url, domain = domain.split("/").slice(0, 3).join("/")) : getDomain(window);
            }
            function formatQuery() {
                var obj = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return Object.keys(obj).filter(function(key) {
                    return "string" == typeof obj[key];
                }).map(function(key) {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.f)(key) + "=" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.f)(obj[key]);
                }).join("&");
            }
            function extendQuery(originalQuery) {
                var props = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return props && Object.keys(props).length ? formatQuery(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
            }
            function extendUrl(url) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, query = options.query || {}, hash = options.hash || {}, originalUrl = void 0, originalQuery = void 0, originalHash = void 0, _url$split = url.split("#"), _url$split2 = _slicedToArray(_url$split, 2);
                originalUrl = _url$split2[0], originalHash = _url$split2[1];
                var _originalUrl$split = originalUrl.split("?"), _originalUrl$split2 = _slicedToArray(_originalUrl$split, 2);
                originalUrl = _originalUrl$split2[0], originalQuery = _originalUrl$split2[1];
                var queryString = extendQuery(originalQuery, query), hashString = extendQuery(originalHash, hash);
                return queryString && (originalUrl = originalUrl + "?" + queryString), hashString && (originalUrl = originalUrl + "#" + hashString), 
                originalUrl;
            }
            function elementStoppedMoving(element) {
                var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3;
                return new __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a(function(resolve, reject) {
                    element = getElement(element);
                    var start = element.getBoundingClientRect(), interval = void 0, timer = void 0;
                    interval = setInterval(function() {
                        var end = element.getBoundingClientRect();
                        if (start.top === end.top && start.bottom === end.bottom && start.left === end.left && start.right === end.right && start.width === end.width && start.height === end.height) return clearTimeout(timer), 
                        clearInterval(interval), resolve();
                        start = end;
                    }, 50), timer = setTimeout(function() {
                        clearInterval(interval), reject(new Error("Timed out waiting for element to stop animating after " + timeout + "ms"));
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
                var value = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "auto", _el$style = el.style, overflow = _el$style.overflow, overflowX = _el$style.overflowX, overflowY = _el$style.overflowY;
                return el.style.overflow = el.style.overflowX = el.overflowY = value, {
                    reset: function() {
                        el.style.overflow = overflow, el.style.overflowX = overflowX, el.style.overflowY = overflowY;
                    }
                };
            }
            function dimensionsDiff(one, two, _ref9) {
                var _ref9$width = _ref9.width, width = void 0 === _ref9$width || _ref9$width, _ref9$height = _ref9.height, height = void 0 === _ref9$height || _ref9$height, _ref9$threshold = _ref9.threshold, threshold = void 0 === _ref9$threshold ? 0 : _ref9$threshold;
                return !!(width && Math.abs(one.width - two.width) > threshold) || !!(height && Math.abs(one.height - two.height) > threshold);
            }
            function trackDimensions(el, _ref10) {
                var _ref10$width = _ref10.width, width = void 0 === _ref10$width || _ref10$width, _ref10$height = _ref10.height, height = void 0 === _ref10$height || _ref10$height, _ref10$threshold = _ref10.threshold, threshold = void 0 === _ref10$threshold ? 0 : _ref10$threshold, currentDimensions = getCurrentDimensions(el);
                return {
                    check: function() {
                        var newDimensions = getCurrentDimensions(el);
                        return {
                            changed: dimensionsDiff(currentDimensions, newDimensions, {
                                width: width,
                                height: height,
                                threshold: threshold
                            }),
                            dimensions: newDimensions
                        };
                    },
                    reset: function() {
                        currentDimensions = getCurrentDimensions(el);
                    }
                };
            }
            function onDimensionsChange(el, _ref11) {
                var _ref11$width = _ref11.width, width = void 0 === _ref11$width || _ref11$width, _ref11$height = _ref11.height, height = void 0 === _ref11$height || _ref11$height, _ref11$delay = _ref11.delay, delay = void 0 === _ref11$delay ? 50 : _ref11$delay, _ref11$threshold = _ref11.threshold, threshold = void 0 === _ref11$threshold ? 0 : _ref11$threshold;
                return new __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a(function(resolve) {
                    var tracker = trackDimensions(el, {
                        width: width,
                        height: height,
                        threshold: threshold
                    }), interval = void 0, resolver = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fn__.d)(function(dimensions) {
                        return clearInterval(interval), resolve(dimensions);
                    }, 4 * delay);
                    interval = setInterval(function() {
                        var _tracker$check = tracker.check(), changed = _tracker$check.changed, dimensions = _tracker$check.dimensions;
                        if (changed) return tracker.reset(), resolver(dimensions);
                    }, delay);
                });
            }
            function dimensionsMatchViewport(el, _ref12) {
                var width = _ref12.width, height = _ref12.height, dimensions = getCurrentDimensions(el);
                return (!width || dimensions.width === window.innerWidth) && (!height || dimensions.height === window.innerHeight);
            }
            function bindEvents(element, eventNames, handler) {
                handler = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fn__.a)(handler);
                for (var _iterator7 = eventNames, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                    var _ref13;
                    if (_isArray7) {
                        if (_i7 >= _iterator7.length) break;
                        _ref13 = _iterator7[_i7++];
                    } else {
                        if (_i7 = _iterator7.next(), _i7.done) break;
                        _ref13 = _i7.value;
                    }
                    var eventName = _ref13;
                    element.addEventListener(eventName, handler);
                }
                return {
                    cancel: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fn__.a)(function() {
                        for (var _iterator8 = eventNames, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator](); ;) {
                            var _ref14;
                            if (_isArray8) {
                                if (_i8 >= _iterator8.length) break;
                                _ref14 = _iterator8[_i8++];
                            } else {
                                if (_i8 = _iterator8.next(), _i8.done) break;
                                _ref14 = _i8.value;
                            }
                            var eventName = _ref14;
                            element.removeEventListener(eventName, handler);
                        }
                    })
                };
            }
            function setVendorCSS(element, name, value) {
                element.style[name] = value;
                for (var capitalizedName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.g)(name), _iterator9 = VENDOR_PREFIXES, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator](); ;) {
                    var _ref15;
                    if (_isArray9) {
                        if (_i9 >= _iterator9.length) break;
                        _ref15 = _iterator9[_i9++];
                    } else {
                        if (_i9 = _iterator9.next(), _i9.done) break;
                        _ref15 = _i9.value;
                    }
                    var prefix = _ref15;
                    element.style["" + prefix + capitalizedName] = value;
                }
            }
            function isValidAnimation(element, name) {
                var stylesheets = element.ownerDocument.styleSheets;
                try {
                    for (var i = 0; i < stylesheets.length; i++) {
                        var cssRules = stylesheets[i].cssRules;
                        if (cssRules) for (var j = 0; j < cssRules.length; j++) {
                            var cssRule = cssRules[j];
                            if (cssRule && (cssRule.type === KEYFRAMES_RULE && cssRule.name === name)) return !0;
                        }
                    }
                } catch (err) {
                    return !1;
                }
                return !1;
            }
            function animate(element, name) {
                var timeout = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3;
                return new __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a(function(resolve, reject) {
                    if (!(element = getElement(element)) || !isValidAnimation(element, name)) return resolve();
                    var hasStarted = !1, timer = void 0, startEvent = bindEvents(element, ANIMATION_START_EVENTS, function(event) {
                        event.target === element && event.animationName === name && (event.stopPropagation(), 
                        startEvent.cancel(), hasStarted = !0, timer = setTimeout(function() {
                            resolve();
                        }, timeout));
                    }), endEvent = bindEvents(element, ANIMATION_END_EVENTS, function(event) {
                        if (event.target === element && event.animationName === name) return event.stopPropagation(), 
                        startEvent.cancel(), endEvent.cancel(), event.animationName !== name ? reject("Expected animation name to be " + name + ", found " + event.animationName) : (clearTimeout(timer), 
                        setVendorCSS(element, "animationName", "none"), resolve());
                    });
                    setVendorCSS(element, "animationName", name), setTimeout(function() {
                        setTimeout(function() {
                            if (!hasStarted) return startEvent.cancel(), endEvent.cancel(), resolve();
                        }, 200);
                    }, 200);
                });
            }
            function showElement(element) {
                element.style.display = STYLE.DISPLAY.BLOCK;
            }
            function hideElement(element) {
                element.style.display = STYLE.DISPLAY.NONE;
            }
            function showAndAnimate(element, name) {
                var animation = animate(element, name);
                return showElement(element), animation;
            }
            function animateAndHide(element, name) {
                return animate(element, name).then(function() {
                    hideElement(element);
                });
            }
            function addClass(element, name) {
                element.classList ? element.classList.add(name) : element.className.split(/\s+/).indexOf(name) === -1 && (element.className += " " + name);
            }
            var __WEBPACK_IMPORTED_MODULE_0_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_2__fn__ = __webpack_require__("./node_modules/xcomponent/src/lib/fn.js"), __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__("./node_modules/xcomponent/src/lib/util.js"), __WEBPACK_IMPORTED_MODULE_4__error__ = __webpack_require__("./node_modules/xcomponent/src/error.js");
            __webpack_exports__.p = getElement, __webpack_exports__.h = elementReady, __webpack_exports__.u = popup, 
            __webpack_exports__.q = iframe, __webpack_exports__.b = onCloseWindow, __webpack_exports__.i = addEventListener, 
            __webpack_exports__.r = createElement, __webpack_exports__.t = addEventToClass, 
            __webpack_exports__.o = template, __webpack_exports__.a = getDomain, __webpack_exports__.g = getDomainFromUrl, 
            __webpack_exports__.f = extendUrl, __webpack_exports__.k = elementStoppedMoving, 
            __webpack_exports__.j = setOverflow, __webpack_exports__.e = trackDimensions, __webpack_exports__.d = onDimensionsChange, 
            __webpack_exports__.c = dimensionsMatchViewport, __webpack_exports__.s = hideElement, 
            __webpack_exports__.m = showAndAnimate, __webpack_exports__.n = animateAndHide, 
            __webpack_exports__.l = addClass;
            var _slicedToArray = function() {
                function sliceIterator(arr, i) {
                    var _arr = [], _n = !0, _d = !1, _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                        !i || _arr.length !== i); _n = !0) ;
                    } catch (err) {
                        _d = !0, _e = err;
                    } finally {
                        try {
                            !_n && _i.return && _i.return();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function(arr, i) {
                    if (Array.isArray(arr)) return arr;
                    if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
            }(), _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, parseQuery = (new __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a(function(resolve) {
                if ("complete" === window.document.readyState) return resolve(window.document);
                var interval = setInterval(function() {
                    if ("complete" === window.document.readyState) return clearInterval(interval), resolve(window.document);
                }, 10);
            }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fn__.c)(function(queryString) {
                var params = {};
                if (!queryString) return params;
                if (queryString.indexOf("=") === -1) throw new Error("Can not parse query string params: " + queryString);
                for (var _iterator5 = queryString.split("&"), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                    var _ref7;
                    if (_isArray5) {
                        if (_i5 >= _iterator5.length) break;
                        _ref7 = _iterator5[_i5++];
                    } else {
                        if (_i5 = _iterator5.next(), _i5.done) break;
                        _ref7 = _i5.value;
                    }
                    var pair = _ref7;
                    pair = pair.split("="), pair[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                }
                return params;
            })), VENDOR_PREFIXES = [ "webkit", "moz", "ms", "o" ], CSSRule = window.CSSRule, KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.MOZ_KEYFRAMES_RULE || CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE, ANIMATION_START_EVENTS = [ "animationstart", "webkitAnimationStart", "oAnimationStart", "MSAnimationStart" ], ANIMATION_END_EVENTS = [ "animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd" ], STYLE = {
                VISIBILITY: {
                    VISIBLE: "visible",
                    HIDDEN: "hidden"
                },
                DISPLAY: {
                    NONE: "none",
                    BLOCK: "block"
                }
            };
        },
        "./node_modules/xcomponent/src/lib/fn.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function noop() {}
            function once(method) {
                var called = !1;
                return function() {
                    if (!called) return called = !0, method.apply(this, arguments);
                };
            }
            function memoize(method) {
                var results = {};
                return function() {
                    var cacheKey = void 0;
                    try {
                        cacheKey = JSON.stringify(Array.prototype.slice.call(arguments), function(key, val) {
                            return "function" == typeof val ? "xcomponent:memoize[" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)(val) + "]" : val;
                        });
                    } catch (err) {
                        throw new Error("Arguments not serializable -- can not be used to memoize");
                    }
                    return results.hasOwnProperty(cacheKey) || (results[cacheKey] = method.apply(this, arguments)), 
                    results[cacheKey];
                };
            }
            function debounce(method) {
                var time = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100, timeout = void 0;
                return function() {
                    var _this = this, _arguments = arguments;
                    clearTimeout(timeout), timeout = setTimeout(function() {
                        return method.apply(_this, _arguments);
                    }, time);
                };
            }
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/xcomponent/src/lib/util.js");
            __webpack_exports__.b = noop, __webpack_exports__.a = once, __webpack_exports__.c = memoize, 
            __webpack_exports__.d = debounce;
        },
        "./node_modules/xcomponent/src/lib/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__("./node_modules/xcomponent/src/lib/dom.js");
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.a;
            }), __webpack_require__.d(__webpack_exports__, "f", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.b;
            }), __webpack_require__.d(__webpack_exports__, "g", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.c;
            }), __webpack_require__.d(__webpack_exports__, "i", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.d;
            }), __webpack_require__.d(__webpack_exports__, "j", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.e;
            }), __webpack_require__.d(__webpack_exports__, "o", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.f;
            }), __webpack_require__.d(__webpack_exports__, "p", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.g;
            }), __webpack_require__.d(__webpack_exports__, "q", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.h;
            }), __webpack_require__.d(__webpack_exports__, "s", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.i;
            }), __webpack_require__.d(__webpack_exports__, "t", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.j;
            }), __webpack_require__.d(__webpack_exports__, "u", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.k;
            }), __webpack_require__.d(__webpack_exports__, "v", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.l;
            }), __webpack_require__.d(__webpack_exports__, "w", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.m;
            }), __webpack_require__.d(__webpack_exports__, "x", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.n;
            }), __webpack_require__.d(__webpack_exports__, "y", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.o;
            }), __webpack_require__.d(__webpack_exports__, "z", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.p;
            }), __webpack_require__.d(__webpack_exports__, "A", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.q;
            }), __webpack_require__.d(__webpack_exports__, "B", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.r;
            }), __webpack_require__.d(__webpack_exports__, "C", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.s;
            }), __webpack_require__.d(__webpack_exports__, "D", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.t;
            }), __webpack_require__.d(__webpack_exports__, "H", function() {
                return __WEBPACK_IMPORTED_MODULE_0__dom__.u;
            });
            var __WEBPACK_IMPORTED_MODULE_1__fn__ = __webpack_require__("./node_modules/xcomponent/src/lib/fn.js");
            __webpack_require__.d(__webpack_exports__, "l", function() {
                return __WEBPACK_IMPORTED_MODULE_1__fn__.c;
            }), __webpack_require__.d(__webpack_exports__, "n", function() {
                return __WEBPACK_IMPORTED_MODULE_1__fn__.a;
            }), __webpack_require__.d(__webpack_exports__, "r", function() {
                return __WEBPACK_IMPORTED_MODULE_1__fn__.b;
            });
            var __WEBPACK_IMPORTED_MODULE_2__promise__ = __webpack_require__("./node_modules/xcomponent/src/lib/promise.js");
            __webpack_require__.d(__webpack_exports__, "h", function() {
                return __WEBPACK_IMPORTED_MODULE_2__promise__.a;
            }), __webpack_require__.d(__webpack_exports__, "I", function() {
                return __WEBPACK_IMPORTED_MODULE_2__promise__.b;
            }), __webpack_require__.d(__webpack_exports__, "J", function() {
                return __WEBPACK_IMPORTED_MODULE_2__promise__.c;
            }), __webpack_require__.d(__webpack_exports__, "K", function() {
                return __WEBPACK_IMPORTED_MODULE_2__promise__.d;
            });
            var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__("./node_modules/xcomponent/src/lib/util.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_3__util__.a;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_3__util__.h;
            }), __webpack_require__.d(__webpack_exports__, "d", function() {
                return __WEBPACK_IMPORTED_MODULE_3__util__.e;
            }), __webpack_require__.d(__webpack_exports__, "e", function() {
                return __WEBPACK_IMPORTED_MODULE_3__util__.d;
            }), __webpack_require__.d(__webpack_exports__, "k", function() {
                return __WEBPACK_IMPORTED_MODULE_3__util__.i;
            }), __webpack_require__.d(__webpack_exports__, "m", function() {
                return __WEBPACK_IMPORTED_MODULE_3__util__.j;
            }), __webpack_require__.d(__webpack_exports__, "L", function() {
                return __WEBPACK_IMPORTED_MODULE_3__util__.k;
            }), __webpack_require__.d(__webpack_exports__, "M", function() {
                return __WEBPACK_IMPORTED_MODULE_3__util__.g;
            }), __webpack_require__.d(__webpack_exports__, "N", function() {
                return __WEBPACK_IMPORTED_MODULE_3__util__.l;
            });
            var __WEBPACK_IMPORTED_MODULE_4__css__ = __webpack_require__("./node_modules/xcomponent/src/lib/css.js");
            __webpack_require__.d(__webpack_exports__, "E", function() {
                return __WEBPACK_IMPORTED_MODULE_4__css__.a;
            }), __webpack_require__.d(__webpack_exports__, "F", function() {
                return __WEBPACK_IMPORTED_MODULE_4__css__.b;
            }), __webpack_require__.d(__webpack_exports__, "G", function() {
                return __WEBPACK_IMPORTED_MODULE_4__css__.c;
            });
        },
        "./node_modules/xcomponent/src/lib/promise.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function denodeify(method) {
                return function() {
                    var self = this, args = Array.prototype.slice.call(arguments);
                    return args.length >= method.length ? __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.resolve(method.apply(self, args)) : new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(function(resolve, reject) {
                        return args.push(function(err, result) {
                            if (err && !(err instanceof Error)) throw new Error("Passed non-Error object in callback: [ " + err + " ] -- callbacks should either be called with callback(new Error(...)) or callback(null, result).");
                            return err ? reject(err) : resolve(result);
                        }), method.apply(self, args);
                    });
                };
            }
            function promisify(method) {
                var prom = __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.resolve();
                return function() {
                    var _this = this, _arguments = arguments;
                    return prom.then(function() {
                        return method.apply(_this, _arguments);
                    });
                };
            }
            function getter(method) {
                var _ref = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, _ref$name = _ref.name, name = void 0 === _ref$name ? "property" : _ref$name, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 1e4 : _ref$timeout;
                return function() {
                    var _this2 = this;
                    return new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(function(resolve, reject) {
                        var result = method.call(_this2, resolve, reject);
                        return result && "function" == typeof result.then ? result.then(resolve, reject) : void 0 !== result ? resolve(result) : void setTimeout(function() {
                            reject("Timed out waiting " + timeout + "ms for " + name + " getter");
                        }, timeout);
                    });
                };
            }
            function cycle(method) {
                return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(method).then(function() {
                    return cycle(method);
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js");
            __webpack_exports__.c = denodeify, __webpack_exports__.d = promisify, __webpack_exports__.b = getter, 
            __webpack_exports__.a = cycle;
        },
        "./node_modules/xcomponent/src/lib/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function urlEncode(str) {
                return str.replace(/\?/g, "%3F").replace(/\&/g, "%26").replace(/#/g, "%23");
            }
            function dasherizeToCamel(string) {
                return string.replace(/-([a-z])/g, function(g) {
                    return g[1].toUpperCase();
                });
            }
            function extend(obj, source) {
                if (!source) return obj;
                for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
                return obj;
            }
            function values(obj) {
                var results = [];
                for (var key in obj) obj.hasOwnProperty(key) && results.push(obj[key]);
                return results;
            }
            function uniqueID() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            }
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            }
            function get(item, path, def) {
                if (!path) return def;
                path = path.split(".");
                for (var i = 0; i < path.length; i++) {
                    if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item) return def;
                    item = item[path[i]];
                }
                return void 0 === item ? def : item;
            }
            function safeInterval(method, time) {
                function runInterval() {
                    timeout = setTimeout(runInterval, time), method.call();
                }
                var timeout = void 0;
                return timeout = setTimeout(runInterval, time), {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            }
            function each(item, callback) {
                if (item) if (item instanceof Array) for (var len = item.length, i = 0; i < len; i++) callback(item[i], i); else if ("object" === (void 0 === item ? "undefined" : _typeof(item))) for (var keys = Object.keys(item), _len = keys.length, _i = 0; _i < _len; _i++) {
                    var key = keys[_i];
                    callback(item[key], key);
                }
            }
            function replaceObject(obj, callback) {
                var parentKey = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", newobj = obj instanceof Array ? [] : {};
                return each(obj, function(item, key) {
                    var fullKey = parentKey ? parentKey + "." + key : key, result = callback(item, key, fullKey);
                    void 0 !== result ? newobj[key] = result : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item ? newobj[key] = replaceObject(item, callback, fullKey) : newobj[key] = item;
                }), newobj;
            }
            function copyProp(source, target, name, def) {
                if (source.hasOwnProperty(name)) {
                    var descriptor = Object.getOwnPropertyDescriptor(source, name);
                    Object.defineProperty(target, name, descriptor);
                } else target[name] = def;
            }
            function dotify(obj) {
                var prefix = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", newobj = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                prefix = prefix ? prefix + "." : prefix;
                for (var key in obj) void 0 !== obj[key] && null !== obj[key] && (obj[key] && "object" === _typeof(obj[key]) ? newobj = dotify(obj[key], "" + prefix + key, newobj) : newobj["" + prefix + key] = obj[key].toString());
                return newobj;
            }
            function WeakMap() {
                this.id = "__weakmap_" + uniqueID() + "__";
            }
            function getObjectID(obj) {
                if (null === obj || void 0 === obj || "object" !== (void 0 === obj ? "undefined" : _typeof(obj)) && "function" != typeof obj) throw new Error("Invalid object");
                var uid = objectIDs.get(obj);
                return uid || (uid = (void 0 === obj ? "undefined" : _typeof(obj)) + ":" + uniqueID(), 
                objectIDs.set(obj, uid)), uid;
            }
            __webpack_exports__.f = urlEncode, __webpack_exports__.l = dasherizeToCamel, __webpack_exports__.d = extend, 
            __webpack_exports__.a = values, __webpack_exports__.i = uniqueID, __webpack_exports__.g = capitalizeFirstLetter, 
            __webpack_exports__.e = get, __webpack_exports__.c = safeInterval, __webpack_exports__.h = replaceObject, 
            __webpack_exports__.j = copyProp, __webpack_exports__.k = dotify, __webpack_exports__.b = getObjectID;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            WeakMap.prototype = {
                set: function(item, value) {
                    if (null === item || void 0 === item || "object" !== (void 0 === item ? "undefined" : _typeof(item)) && "function" != typeof item) throw new Error("Invalid key for WeakMap");
                    var entry = item[this.id];
                    entry && entry[0] === item ? entry[1] = value : Object.defineProperty(item, this.id, {
                        value: [ item, value ],
                        writable: !0
                    });
                },
                get: function(item) {
                    var entry = item[this.id];
                    if (entry && entry[0] === item) return entry[1];
                },
                delete: function(item) {
                    var entry = item[this.id];
                    entry && entry[0] === item && (entry[0] = entry[1] = void 0);
                },
                has: function(item) {
                    var entry = item[this.id];
                    return entry && entry[0] === item;
                }
            };
            var objectIDs = new WeakMap();
        },
        "./src/api/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__rest__ = __webpack_require__("./src/api/rest.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_0__rest__.a;
            });
        },
        "./src/api/rest.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function createCheckoutToken(env, client, paymentDetails, experienceDetails) {
                if (__WEBPACK_IMPORTED_MODULE_3_beaver_logger_client__.c("rest_api_create_checkout_token"), 
                env = env || __WEBPACK_IMPORTED_MODULE_4__config__.a.env, !client[env]) throw new Error("Client ID not found for env: " + env);
                return proxyRest.createCheckoutToken && !proxyRest.createCheckoutToken.source.closed ? proxyRest.createCheckoutToken(env, client, paymentDetails, experienceDetails) : (paymentDetails = _extends({}, paymentDetails), 
                paymentDetails.intent = paymentDetails.intent || "sale", paymentDetails.redirect_urls = paymentDetails.redirect_urls || {}, 
                paymentDetails.redirect_urls.return_url = paymentDetails.redirect_urls.return_url || window.location.protocol + "//" + window.location.host, 
                paymentDetails.redirect_urls.cancel_url = paymentDetails.redirect_urls.cancel_url || window.location.protocol + "//" + window.location.host, 
                paymentDetails.payer = paymentDetails.payer || {}, paymentDetails.payer.payment_method = paymentDetails.payer.payment_method || "paypal", 
                createAccessToken(env, client).then(function(accessToken) {
                    return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(function() {
                        if (experienceDetails) return createExperienceProfile(env, client, experienceDetails);
                    }).then(function(experienceID) {
                        return experienceID && (paymentDetails.experience_profile_id = experienceID), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.a)({
                            method: "post",
                            url: __WEBPACK_IMPORTED_MODULE_4__config__.a.paymentApiUrls[env],
                            headers: {
                                Authorization: "Bearer " + accessToken
                            },
                            json: paymentDetails
                        });
                    });
                }).then(function(res) {
                    if (res && res.id) return res.id;
                    throw new Error("Payment Api response error:\n\n" + JSON.stringify(res, null, 4));
                }));
            }
            function createBillingToken(env, client, billingDetails, experienceDetails) {
                if (__WEBPACK_IMPORTED_MODULE_3_beaver_logger_client__.c("rest_api_create_billing_token"), 
                env = env || __WEBPACK_IMPORTED_MODULE_4__config__.a.env, !client[env]) throw new Error("Client ID not found for env: " + env);
                return proxyRest.createBillingToken && !proxyRest.createBillingToken.source.closed ? proxyRest.createBillingToken(env, client, billingDetails, experienceDetails) : (billingDetails = _extends({}, billingDetails), 
                billingDetails.plan = billingDetails.plan || {}, billingDetails.plan.merchant_preferences = billingDetails.plan.merchant_preferences || {}, 
                billingDetails.plan.merchant_preferences.return_url = billingDetails.plan.merchant_preferences.return_url || window.location.protocol + "//" + window.location.host, 
                billingDetails.plan.merchant_preferences.cancel_url = billingDetails.plan.merchant_preferences.cancel_url || window.location.protocol + "//" + window.location.host, 
                billingDetails.payer = billingDetails.payer || {}, billingDetails.payer.payment_method = billingDetails.payer.payment_method || "paypal", 
                createAccessToken(env, client).then(function(accessToken) {
                    return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(function() {
                        if (experienceDetails) return createExperienceProfile(env, client, experienceDetails);
                    }).then(function(experienceID) {
                        return experienceID && (billingDetails.experience_profile_id = experienceID), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.a)({
                            method: "post",
                            url: __WEBPACK_IMPORTED_MODULE_4__config__.a.billingApiUrls[env],
                            headers: {
                                Authorization: "Bearer " + accessToken
                            },
                            json: billingDetails
                        });
                    });
                }).then(function(res) {
                    if (res && res.token_id) return res.token_id;
                    throw new Error("Billing Api response error:\n\n" + JSON.stringify(res, null, 4));
                }));
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_1_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_2_Base64__ = __webpack_require__("./node_modules/Base64/base64.js"), __WEBPACK_IMPORTED_MODULE_3_beaver_logger_client__ = (__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_Base64__), 
            __webpack_require__("./node_modules/beaver-logger/client/index.js")), __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__("./src/config/index.js"), __WEBPACK_IMPORTED_MODULE_5__lib__ = __webpack_require__("./src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_6__components__ = __webpack_require__("./src/components/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return rest;
            });
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, proxyRest = {}, createAccessToken = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.z)(function(env, client) {
                __WEBPACK_IMPORTED_MODULE_3_beaver_logger_client__.c("rest_api_create_access_token"), 
                env = env || __WEBPACK_IMPORTED_MODULE_4__config__.a.env;
                var clientID = client[env];
                if (!clientID) throw new Error("Client ID not found for env: " + env);
                if (proxyRest.createAccessToken && !proxyRest.createAccessToken.source.closed) return proxyRest.createAccessToken(env, client);
                var basicAuth = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_Base64__.btoa)(clientID + ":");
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.a)({
                    method: "post",
                    url: __WEBPACK_IMPORTED_MODULE_4__config__.a.authApiUrls[env],
                    headers: {
                        Authorization: "Basic " + basicAuth
                    },
                    data: {
                        grant_type: "client_credentials"
                    }
                }).then(function(res) {
                    if (res && "invalid_client" === res.error) throw new Error("Auth Api invalid " + env + " client id: " + clientID + ":\n\n" + JSON.stringify(res, null, 4));
                    if (!res || !res.access_token) throw new Error("Auth Api response error:\n\n" + JSON.stringify(res, null, 4));
                    return res.access_token;
                });
            }, {
                time: 6e5
            }), createExperienceProfile = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.z)(function(env, client) {
                var experienceDetails = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                if (__WEBPACK_IMPORTED_MODULE_3_beaver_logger_client__.c("rest_api_create_experience_profile"), 
                env = env || __WEBPACK_IMPORTED_MODULE_4__config__.a.env, !client[env]) throw new Error("Client ID not found for env: " + env);
                return proxyRest.createExperienceProfile && !proxyRest.createExperienceProfile.source.closed ? proxyRest.createExperienceProfile(env, client, experienceDetails) : (experienceDetails.temporary = !0, 
                experienceDetails.name = experienceDetails.name ? experienceDetails.name + "_" + Math.random().toString() : Math.random().toString(), 
                createAccessToken(env, client).then(function(accessToken) {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.a)({
                        method: "post",
                        url: __WEBPACK_IMPORTED_MODULE_4__config__.a.experienceApiUrls[env],
                        headers: {
                            Authorization: "Bearer " + accessToken
                        },
                        json: experienceDetails
                    });
                }).then(function(res) {
                    if (res && res.error) throw new Error(res.error);
                    if (!res.id) throw new Error("No id in experience profile response:\n\n" + JSON.stringify(res, null, 4));
                    return res.id;
                }));
            }, {
                time: 6e5
            }), rest = {
                payment: {
                    create: createCheckoutToken
                },
                billingAgreement: {
                    create: createBillingToken
                },
                experience: {
                    create: createExperienceProfile
                }
            };
            __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.isBridge() || __WEBPACK_IMPORTED_MODULE_6__components__.a.isChild() ? __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.sendToParent("proxy_rest", {
                createAccessToken: createAccessToken,
                createExperienceProfile: createExperienceProfile,
                createCheckoutToken: createCheckoutToken,
                createBillingToken: createBillingToken
            }).catch(function() {}) : __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.on("proxy_rest", {
                domain: __WEBPACK_IMPORTED_MODULE_4__config__.a.paypal_domain_regex
            }, function(_ref) {
                proxyRest = _ref.data;
            });
        },
        "./src/compat/fallback.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function match(str, pattern) {
                var regmatch = str.match(pattern);
                if (regmatch) return regmatch[1];
            }
            var __WEBPACK_IMPORTED_MODULE_0_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__("./src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__("./src/config/index.js"), onAuthorize = void 0;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.d)() && __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.on("onLegacyPaymentAuthorize", {
                window: window.parent
            }, function(_ref) {
                onAuthorize = _ref.data.method;
            }), window.onLegacyPaymentAuthorize = function(method) {
                return onAuthorize = method, __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a.try(function() {
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.d)()) return __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.openBridge(__WEBPACK_IMPORTED_MODULE_3__config__.a.postBridgeUrl, __WEBPACK_IMPORTED_MODULE_3__config__.a.postBridgeDomain).then(function(postBridge) {
                        return __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.send(postBridge, "onLegacyPaymentAuthorize", {
                            method: method
                        }, {
                            domain: __WEBPACK_IMPORTED_MODULE_3__config__.a.paypalDomain
                        }).then(__WEBPACK_IMPORTED_MODULE_2__lib__.q);
                    });
                });
            }, window.watchForLegacyFallback = function(win) {
                var interval = setInterval(function() {
                    try {
                        if (!(win.document.body.innerHTML.indexOf("merchantpaymentweb") !== -1 || win.document.body.innerHTML.indexOf("wapapp") !== -1) || win.ppxoWatching || win.closed) return;
                        win.ppxoWatching = !0;
                        var send = win.XMLHttpRequest.prototype.send;
                        win.XMLHttpRequest.prototype.send = function() {
                            function listener() {
                                if (self.readyState === self.DONE && 200 === self.status && self.responseText) try {
                                    var response = JSON.parse(self.responseText.replace("while (1);", ""));
                                    if ("redirect" === response.type && response.url && onAuthorize) {
                                        var url = response.url;
                                        clearInterval(interval), win.close(), onAuthorize({
                                            returnUrl: url,
                                            paymentToken: match(url, /token=((EC-)?[A-Z0-9]+)/),
                                            billingToken: match(url, /ba_token=((BA-)?[A-Z0-9]+)/),
                                            payerID: match(url, /PayerID=([A-Z0-9]+)/),
                                            paymentID: match(url, /paymentId=((PAY-)?[A-Z0-9]+)/)
                                        }), onAuthorize = null, win.PAYPAL && win.PAYPAL.Checkout && win.PAYPAL.Checkout.XhrResponse && win.PAYPAL.Checkout.XhrResponse.RESPONSE_TYPES && Object.defineProperty(win.PAYPAL.Checkout.XhrResponse.RESPONSE_TYPES, "Redirect", {
                                            value: Math.random().toString()
                                        }), win.mob && win.mob.Xhr && win.mob.Xhr.prototype._xhrOnReady && (win.mob.Xhr.prototype._xhrOnReady = __WEBPACK_IMPORTED_MODULE_2__lib__.q);
                                    }
                                } catch (err) {
                                    return;
                                }
                                if (onload) return onload.apply(this, arguments);
                            }
                            if (this._patched) return send.apply(this, arguments);
                            this._patched = !0;
                            var self = this, onload = this.onload;
                            if (this.onload !== listener) try {
                                delete this.onload, this.onload = listener, Object.defineProperty(this, "onload", {
                                    get: function() {
                                        return listener;
                                    },
                                    set: function(handler) {
                                        onload = handler;
                                    }
                                });
                            } catch (err) {}
                            return send.apply(this, arguments);
                        };
                    } catch (err) {}
                }, 100);
            }, window.onLegacyFallback = window.watchForLegacyFallback;
        },
        "./src/compat/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__postBridge__ = __webpack_require__("./src/compat/postBridge.js");
            __webpack_require__.d(__webpack_exports__, "setupPostBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__postBridge__.a;
            });
            __webpack_require__("./src/compat/fallback.js"), __webpack_require__("./src/compat/polyfill.js");
        },
        "./src/compat/polyfill.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0_es6_symbol_polyfill__ = __webpack_require__("./node_modules/es6-symbol/polyfill.js"), __WEBPACK_IMPORTED_MODULE_0_es6_symbol_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_es6_symbol_polyfill__), __WEBPACK_IMPORTED_MODULE_1_es6_iterator_array__ = __webpack_require__("./node_modules/es6-iterator/array.js"), __WEBPACK_IMPORTED_MODULE_1_es6_iterator_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_es6_iterator_array__), __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js");
            window.Symbol || (window.Symbol = __WEBPACK_IMPORTED_MODULE_0_es6_symbol_polyfill___default.a), 
            Array.prototype[__WEBPACK_IMPORTED_MODULE_0_es6_symbol_polyfill___default.a.iterator] || (Array.prototype[__WEBPACK_IMPORTED_MODULE_0_es6_symbol_polyfill___default.a.iterator] = function() {
                return new __WEBPACK_IMPORTED_MODULE_1_es6_iterator_array___default.a(this);
            }), window.Symbol = __WEBPACK_IMPORTED_MODULE_0_es6_symbol_polyfill___default.a, 
            window.Promise || (window.Promise = __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a);
        },
        "./src/compat/postBridge.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function setupPostBridge(env) {
                return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(function() {
                    var postBridgeUrl = __WEBPACK_IMPORTED_MODULE_4__config__.a.postBridgeUrls[env], postBridgeDomain = __WEBPACK_IMPORTED_MODULE_4__config__.a.paypalDomains[env];
                    return __WEBPACK_IMPORTED_MODULE_2_post_robot_src__.needsBridgeForDomain(postBridgeDomain) ? (__WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.j("setup_post_bridge", {
                        env: env
                    }), __WEBPACK_IMPORTED_MODULE_2_post_robot_src__.openBridge(postBridgeUrl, postBridgeDomain).catch(function(err) {
                        if (__WEBPACK_IMPORTED_MODULE_2_post_robot_src__.needsBridge({
                            domain: postBridgeDomain
                        })) throw err;
                        __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.j("open_post_bridge_transient_failure");
                    })) : __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.j("post_bridge_not_required", {
                        env: env
                    });
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_2_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__("./src/components/index.js"), __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__("./src/config/index.js");
            __webpack_exports__.a = setupPostBridge, __WEBPACK_IMPORTED_MODULE_2_post_robot_src__.on("meta", function(_ref) {
                var data = (_ref.source, _ref.data);
                data.iframeEligible && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__components__.c)(), 
                __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.c(data.iframeEligible ? "lightbox_eligible_" + data.iframeEligibleReason : "lightbox_ineligible_" + data.iframeEligibleReason), 
                __WEBPACK_IMPORTED_MODULE_4__config__.a.locales[data.locale.country] && !__WEBPACK_IMPORTED_MODULE_4__config__.a.customCountry && (__WEBPACK_IMPORTED_MODULE_4__config__.a.locale.country = data.locale.country, 
                __WEBPACK_IMPORTED_MODULE_4__config__.a.locales[data.locale.country].indexOf(data.locale.lang) !== -1 ? __WEBPACK_IMPORTED_MODULE_4__config__.a.locale.lang = data.locale.lang : __WEBPACK_IMPORTED_MODULE_4__config__.a.locale.lang = __WEBPACK_IMPORTED_MODULE_4__config__.a.locales[data.locale.country][0]);
            });
        },
        "./src/components/button/component.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_1_xcomponent_src__ = __webpack_require__("./node_modules/xcomponent/src/index.js"), __WEBPACK_IMPORTED_MODULE_2_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_3__checkout__ = __webpack_require__("./src/components/checkout/index.js"), __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__("./src/config/index.js"), __WEBPACK_IMPORTED_MODULE_5__lib__ = __webpack_require__("./src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_6__checkout_popupBridge__ = __webpack_require__("./src/components/checkout/popupBridge.js"), __WEBPACK_IMPORTED_MODULE_7__parentTemplate__ = __webpack_require__("./src/components/button/parentTemplate.js"), __WEBPACK_IMPORTED_MODULE_8__componentTemplate__ = __webpack_require__("./src/components/button/componentTemplate.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return Button;
            });
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, Button = __WEBPACK_IMPORTED_MODULE_1_xcomponent_src__.c({
                tag: "paypal-button",
                name: "ppbutton",
                buildUrl: function(instance) {
                    var env = instance.props.env || __WEBPACK_IMPORTED_MODULE_4__config__.a.env;
                    return __WEBPACK_IMPORTED_MODULE_4__config__.a.buttonUrls[env];
                },
                contexts: {
                    iframe: !0,
                    lightbox: !1,
                    popup: !1
                },
                scrolling: !1,
                parentTemplate: __WEBPACK_IMPORTED_MODULE_7__parentTemplate__.a,
                componentTemplate: __WEBPACK_IMPORTED_MODULE_8__componentTemplate__.a,
                get version() {
                    return __WEBPACK_IMPORTED_MODULE_4__config__.a.ppobjects ? "4" : "4.0.54";
                },
                get domains() {
                    return __WEBPACK_IMPORTED_MODULE_4__config__.a.paypalDomains;
                },
                props: {
                    env: {
                        type: "string",
                        required: !1,
                        queryParam: !0,
                        def: function() {
                            return __WEBPACK_IMPORTED_MODULE_4__config__.a.env;
                        },
                        validate: function(env) {
                            if (!__WEBPACK_IMPORTED_MODULE_4__config__.a.paypalUrls[env]) throw new Error("Invalid env: " + env);
                        }
                    },
                    client: {
                        type: "object",
                        required: !1,
                        def: function() {
                            return {};
                        },
                        sendToChild: !1,
                        validate: function(client, props) {
                            var env = props.env || __WEBPACK_IMPORTED_MODULE_4__config__.a.env;
                            if (!client[env]) throw new Error("Client ID not found for env: " + env);
                            if (client[env].match(/^(.)\1+$/)) throw new Error("Invalid client ID: " + client[env]);
                        }
                    },
                    stage: {
                        type: "string",
                        required: !1,
                        queryParam: !0,
                        def: function(props) {
                            var env = props.env || __WEBPACK_IMPORTED_MODULE_4__config__.a.env;
                            if (env === __WEBPACK_IMPORTED_MODULE_4__config__.b.STAGE || env === __WEBPACK_IMPORTED_MODULE_4__config__.b.LOCAL) return __WEBPACK_IMPORTED_MODULE_4__config__.a.stage;
                        }
                    },
                    payment: {
                        type: "string",
                        required: !0,
                        getter: !0,
                        memoize: !1,
                        timeout: 1e4,
                        alias: "billingAgreement"
                    },
                    commit: {
                        type: "boolean",
                        required: !1
                    },
                    onAuth: {
                        type: "function",
                        required: !1,
                        decorate: function(original) {
                            return function() {
                                this.onAuth = this.onAuth || new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(), 
                                this.onAuth.resolve();
                            };
                        }
                    },
                    onRemembered: {
                        type: "function",
                        required: !1,
                        decorate: function(original) {
                            return function() {
                                this.onAuth = this.onAuth || new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(), 
                                this.onAuth.resolve();
                            };
                        }
                    },
                    onDisplay: {
                        type: "function",
                        required: !1,
                        decorate: function(original) {
                            return function() {
                                var _this = this, _arguments = arguments;
                                return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(function() {
                                    if (_this.onAuth = _this.onAuth || new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(), 
                                    _this.props.displayTo === __WEBPACK_IMPORTED_MODULE_4__config__.c.REMEMBERED) return _this.onAuth;
                                }).then(function() {
                                    if (original) return original.apply(_this, _arguments);
                                });
                            };
                        }
                    },
                    onAuthorize: {
                        type: "function",
                        required: !0,
                        decorate: function(original) {
                            if (original) return function(data, actions) {
                                var redirect = function(win, url) {
                                    return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.all([ __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.f)(win || window.top, url || data.returnUrl), actions.close() ]);
                                };
                                return original.call(this, data, _extends({}, actions, {
                                    redirect: redirect
                                }));
                            };
                        }
                    },
                    onCancel: {
                        type: "function",
                        required: !1,
                        noop: !0,
                        decorate: function(original) {
                            if (original) return function(data, actions) {
                                var redirect = function(win, url) {
                                    return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.all([ __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.f)(win || window.top, url || data.cancelUrl), actions.close() ]);
                                };
                                return original.call(this, data, _extends({}, actions, {
                                    redirect: redirect
                                }));
                            };
                        }
                    },
                    onClick: {
                        type: "function",
                        required: !1
                    },
                    dimensions: {
                        type: "object",
                        required: !1,
                        def: function(props) {
                            return {
                                tiny: {
                                    width: "80px",
                                    height: "22px"
                                },
                                small: {
                                    width: "148px",
                                    height: "42px"
                                },
                                medium: {
                                    width: "230px",
                                    height: "48px"
                                },
                                large: {
                                    width: "380px",
                                    height: "60px"
                                },
                                responsive: {
                                    width: "100%",
                                    height: "48px"
                                }
                            }[props.style && props.style.size || "small"];
                        }
                    },
                    locale: {
                        type: "string",
                        required: !1,
                        queryParam: "locale.x"
                    },
                    style: {
                        type: "object",
                        required: !1,
                        queryParam: !0,
                        alias: "buttonStyle",
                        def: function() {
                            return {
                                color: "gold",
                                shape: "pill",
                                size: "small",
                                label: "checkout"
                            };
                        },
                        validate: function(style) {
                            if (style.size && __WEBPACK_IMPORTED_MODULE_4__config__.a.buttonStyles.size.indexOf(style.size) === -1) throw new Error("Invalid button size: " + style.size);
                            if (style.label && __WEBPACK_IMPORTED_MODULE_4__config__.a.buttonStyles.label.indexOf(style.label) === -1) throw new Error("Invalid button label: " + style.label);
                            if ("credit" === style.label && "tiny" === style.size) throw new Error("Invalid " + style.label + " button size: " + style.size);
                            if ("credit" === style.label && style.color) throw new Error("Custom colors for " + style.label + " button are not supported");
                        }
                    },
                    displayTo: {
                        type: "string",
                        required: !1,
                        def: function() {
                            return __WEBPACK_IMPORTED_MODULE_4__config__.c.ALL;
                        }
                    },
                    disableLightbox: {
                        type: "boolean",
                        required: !1,
                        def: function() {
                            return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.h)();
                        }
                    },
                    logLevel: {
                        type: "string",
                        required: !1,
                        get value() {
                            return __WEBPACK_IMPORTED_MODULE_4__config__.a.logLevel;
                        }
                    },
                    popupBridge: {
                        type: "object",
                        required: !1,
                        get value() {
                            return {
                                open: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__checkout_popupBridge__.a)(),
                                awaitOpener: __WEBPACK_IMPORTED_MODULE_6__checkout_popupBridge__.b
                            };
                        }
                    },
                    test: {
                        type: "object",
                        required: !1,
                        def: function() {
                            return {
                                action: "checkout"
                            };
                        }
                    }
                },
                autoResize: {
                    height: !0,
                    width: !1
                },
                dimensions: {
                    width: "148px",
                    height: "48px"
                }
            });
            Button.isChild() && ((__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.c)() || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.m)()) && (__WEBPACK_IMPORTED_MODULE_2_beaver_logger_client__.c("force_enable_iframe_webview"), 
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__checkout__.b)({
                force: !0,
                time: 18e5
            })), window.xprops.logLevel && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.i)(window.xprops.logLevel), 
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__checkout_popupBridge__.b)());
        },
        "./src/components/button/componentTemplate.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return componentTemplate;
            });
            var componentTemplate = function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return '\n    \n    <style>\n        html, body {\n            width: 100%;\n            height: 100%;\n            overflow: hidden;\n            position: fixed;\n            top: 0;\n            left: 0;\n            margin: 0;\n            text-align: center;\n        }\n        .spinner {\n            height: 60vmin;\n            width: 60vmin;\n            margin-top: 20vmin;\n            display: inline-block;\n            z-index: 10;\n        }\n        .spinner .loader {\n            height: 100%;\n            width: 100%;\n    \n            box-sizing: border-box;\n    \n            border-width: 10vmin;\n            border-style: solid;\n            border-color: rgba(0, 0, 0, .2);\n            border-top-color: rgba(33, 128, 192, 0.8);\n            border-radius: 100%;\n    \n            -webkit-animation: rotation .7s infinite linear;\n            -moz-animation: rotation .7s infinite linear;\n            -o-animation: rotation .7s infinite linear;\n            animation: rotation .7s infinite linear;\n    \n        }\n    \n        @-webkit-keyframes rotation {\n            from {\n                -webkit-transform: rotate(0deg)\n            }\n            to {\n                -webkit-transform: rotate(359deg)\n            }\n        }\n        @-moz-keyframes rotation {\n            from {\n                -moz-transform: rotate(0deg)\n            }\n            to {\n                -moz-transform: rotate(359deg)\n            }\n        }\n        @-o-keyframes rotation {\n            from {\n                -o-transform: rotate(0deg)\n            }\n            to {\n                -o-transform: rotate(359deg)\n            }\n        }\n        @keyframes rotation {\n            from {\n                transform: rotate(0deg)\n            }\n            to {\n                transform: rotate(359deg)\n            }\n        }\n    </style>\n    \n    <div class="spinner">\n        <div id="loader" class="loader"></div>\n    </div>\n        \n';
            };
        },
        "./src/components/button/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__("./src/components/button/component.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_0__component__.a;
            });
        },
        "./src/components/button/parentTemplate.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return parentTemplate;
            });
            var parentTemplate = function() {
                var ctx = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return '\n\n    <style>\n        .paypal-button-parent {\n            font-size: 0;\n        }\n        \n        .paypal-button-parent.paypal-button-parent-label-checkout {\n            min-width: 80px;\n        }\n        \n        .paypal-button-parent.paypal-button-parent-label-credit {\n            min-width: 148px;\n        }\n    </style>\n\n    <div class="paypal-button-parent paypal-button-parent-label-' + (ctx.props.style && ctx.props.style.label || "checkout") + " " + ctx.CLASS.ELEMENT + '"></div>\n    \n';
            };
        },
        "./src/components/checkout/component.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function addHeader(name, value) {
                if (window.$Api) return window.$Api.addHeader ? window.$Api.addHeader(name, value) : void 0;
            }
            function allowCheckoutIframe() {
                return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__lib__.g)() && !!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__lib__.h)();
            }
            function enableCheckoutIframe() {
                var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$force = _ref.force, force = void 0 !== _ref$force && _ref$force, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 3e5 : _ref$timeout;
                (force || allowCheckoutIframe()) && (Checkout.contexts.lightbox = !0, Checkout.contexts.iframe = !0, 
                enableCheckoutIframeTimeout && clearTimeout(enableCheckoutIframeTimeout), enableCheckoutIframeTimeout = setTimeout(function() {
                    Checkout.contexts.lightbox = !1, Checkout.contexts.iframe = !1;
                }, timeout));
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_2_xcomponent_src__ = __webpack_require__("./node_modules/xcomponent/src/index.js"), __WEBPACK_IMPORTED_MODULE_3__parentTemplate__ = __webpack_require__("./src/components/checkout/parentTemplate.js"), __WEBPACK_IMPORTED_MODULE_4__componentTemplate__ = __webpack_require__("./src/components/checkout/componentTemplate.js"), __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__("./src/components/checkout/util.js"), __WEBPACK_IMPORTED_MODULE_6__popupBridge__ = __webpack_require__("./src/components/checkout/popupBridge.js"), __WEBPACK_IMPORTED_MODULE_7__lib__ = __webpack_require__("./src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_8__config__ = __webpack_require__("./src/config/index.js"), __WEBPACK_IMPORTED_MODULE_9__content_json__ = __webpack_require__("./src/components/checkout/content.json"), __WEBPACK_IMPORTED_MODULE_9__content_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__content_json__);
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return Checkout;
            }), __webpack_exports__.b = enableCheckoutIframe;
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, content = JSON.parse(__WEBPACK_IMPORTED_MODULE_9__content_json___default.a), Checkout = __WEBPACK_IMPORTED_MODULE_2_xcomponent_src__.c({
                tag: "paypal-checkout",
                name: "ppcheckout",
                buildUrl: function(instance, props) {
                    var env = instance.props.env || __WEBPACK_IMPORTED_MODULE_8__config__.a.env;
                    return props.payment().then(function(token) {
                        if (!token) throw new Error("Expected payment id or token to be passed, got " + token);
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__.a)(env, token);
                    });
                },
                remoteRenderDomain: __WEBPACK_IMPORTED_MODULE_8__config__.a.paypal_domain_regex,
                get bridgeUrls() {
                    return __WEBPACK_IMPORTED_MODULE_8__config__.a.postBridgeUrls;
                },
                get bridgeDomains() {
                    return __WEBPACK_IMPORTED_MODULE_8__config__.a.paypalDomains;
                },
                contexts: {
                    iframe: !1,
                    lightbox: !1,
                    popup: !0
                },
                get version() {
                    return __WEBPACK_IMPORTED_MODULE_8__config__.a.ppobjects ? "4" : "4.0.54";
                },
                get domains() {
                    return __WEBPACK_IMPORTED_MODULE_8__config__.a.paypalDomains;
                },
                componentTemplate: __WEBPACK_IMPORTED_MODULE_4__componentTemplate__.a,
                parentTemplate: function() {
                    var ctx = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return ctx.content = content[__WEBPACK_IMPORTED_MODULE_8__config__.a.locale.country][__WEBPACK_IMPORTED_MODULE_8__config__.a.locale.lang], 
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__parentTemplate__.a)(ctx);
                },
                props: {
                    env: {
                        type: "string",
                        required: !1,
                        queryParam: !0,
                        def: function() {
                            return __WEBPACK_IMPORTED_MODULE_8__config__.a.env;
                        },
                        validate: function(env) {
                            if (!__WEBPACK_IMPORTED_MODULE_8__config__.a.paypalUrls[env]) throw new Error("Invalid env: " + env);
                        }
                    },
                    stage: {
                        type: "string",
                        required: !1,
                        queryParam: !0,
                        def: function(props) {
                            var env = props.env || __WEBPACK_IMPORTED_MODULE_8__config__.a.env;
                            if (env === __WEBPACK_IMPORTED_MODULE_8__config__.b.STAGE || env === __WEBPACK_IMPORTED_MODULE_8__config__.b.LOCAL) return __WEBPACK_IMPORTED_MODULE_8__config__.a.stage;
                        }
                    },
                    locale: {
                        type: "string",
                        required: !1,
                        queryParam: "locale.x"
                    },
                    client: {
                        type: "object",
                        required: !1,
                        def: function() {
                            return {};
                        },
                        sendToChild: !1,
                        validate: function(client, props) {
                            var env = props.env || __WEBPACK_IMPORTED_MODULE_8__config__.a.env;
                            if (!client[env]) throw new Error("Client ID not found for env: " + env);
                            if (client[env].match(/^(.)\1+$/)) throw new Error("Invalid client ID: " + client[env]);
                        }
                    },
                    payment: {
                        type: "string",
                        required: !1,
                        getter: !0,
                        memoize: !0,
                        timeout: 1e4,
                        queryParam: function() {
                            var value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__.b)(value);
                        },
                        childDef: function() {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__lib__.e)("token");
                        },
                        alias: "billingAgreement"
                    },
                    commit: {
                        type: "boolean",
                        required: !1
                    },
                    onAuthorize: {
                        type: "function",
                        required: !0,
                        once: !0,
                        decorate: function(original) {
                            if (original) return function(data) {
                                var _this = this, actions = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, close = function() {
                                    return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(function() {
                                        if (actions.close) return actions.close();
                                    }).then(function() {
                                        return _this.closeComponent();
                                    });
                                }, redirect = function(win, url) {
                                    return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.all([ __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__lib__.f)(win || window.top, url || data.returnUrl), close() ]);
                                };
                                return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(function() {
                                    try {
                                        var isButton = window.location.href.indexOf("/webapps/hermes/button") !== -1, isGuest = _this.window.location.href.indexOf("/webapps/xoonboarding") !== -1;
                                        if (isButton && isGuest) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__lib__.a)({
                                            win: _this.window,
                                            method: "get",
                                            url: "/webapps/hermes/api/auth"
                                        }).then(function(result) {
                                            result && result.data && result.data.access_token && addHeader("x-paypal-internal-euat", result.data.access_token);
                                        }).catch(function(err2) {});
                                    } catch (err) {}
                                }).then(function() {
                                    return original.call(_this, data, _extends({}, actions, {
                                        close: close,
                                        redirect: redirect
                                    }));
                                }).finally(function() {
                                    return _this.close();
                                });
                            };
                        }
                    },
                    onAuth: {
                        type: "function",
                        required: !1,
                        sameDomain: !0
                    },
                    onCancel: {
                        type: "function",
                        required: !1,
                        once: !0,
                        noop: !0,
                        decorate: function(original) {
                            if (original) return function(data) {
                                var _this2 = this, actions = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, close = function() {
                                    return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(function() {
                                        if (actions.close) return actions.close();
                                    }).then(function() {
                                        return _this2.closeComponent();
                                    });
                                }, redirect = function(win, url) {
                                    return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.all([ __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__lib__.f)(win || window.top, url || data.cancelUrl), close() ]);
                                };
                                return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(function() {
                                    return original.call(_this2, data, _extends({}, actions, {
                                        close: close,
                                        redirect: redirect
                                    }));
                                }).finally(function() {
                                    _this2.close();
                                });
                            };
                        }
                    },
                    init: {
                        type: "function",
                        required: !1,
                        once: !0,
                        decorate: function(original) {
                            return function(data) {
                                if (this.paymentToken = data.paymentToken, this.cancelUrl = data.cancelUrl, original) return original.apply(this, arguments);
                            };
                        }
                    },
                    onClose: {
                        type: "function",
                        required: !1,
                        once: !0,
                        promisify: !0,
                        def: function() {
                            return function(reason) {
                                var CLOSE_REASONS = __WEBPACK_IMPORTED_MODULE_2_xcomponent_src__.d.CLOSE_REASONS;
                                if (this.props.onCancel && [ CLOSE_REASONS.CLOSE_DETECTED, CLOSE_REASONS.USER_CLOSED ].indexOf(reason) !== -1) {
                                    if (this.paymentToken && this.cancelUrl) return __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.c("close_trigger_cancel"), 
                                    this.props.onCancel({
                                        paymentToken: this.paymentToken,
                                        cancelUrl: this.cancelUrl
                                    });
                                    __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.d("close_no_token_cancelurl");
                                }
                            };
                        }
                    },
                    onError: {
                        type: "function",
                        required: !1,
                        promisify: !0,
                        noop: !0,
                        once: !0
                    },
                    fallback: {
                        type: "function",
                        required: !1,
                        once: !0,
                        def: function() {
                            return function(url) {
                                return __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.d("fallback", {
                                    url: url
                                }), window.onLegacyPaymentAuthorize(this.props.onAuthorize);
                            };
                        }
                    },
                    logLevel: {
                        type: "string",
                        required: !1,
                        get value() {
                            return __WEBPACK_IMPORTED_MODULE_8__config__.a.logLevel;
                        }
                    },
                    popupBridge: {
                        type: "object",
                        required: !1,
                        get value() {
                            return {
                                open: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__popupBridge__.a)(),
                                awaitOpener: __WEBPACK_IMPORTED_MODULE_6__popupBridge__.b
                            };
                        }
                    },
                    test: {
                        type: "object",
                        required: !1,
                        def: function() {
                            return {
                                action: "checkout"
                            };
                        }
                    }
                },
                autoResize: {
                    width: !1,
                    height: !0
                },
                get dimensions() {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__lib__.g)() ? {
                        width: "100%",
                        height: "100%"
                    } : this.contexts.lightbox ? {
                        width: "450px",
                        height: "300px"
                    } : {
                        width: "450px",
                        height: "535px"
                    };
                }
            });
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__popupBridge__.c)(Checkout);
            var enableCheckoutIframeTimeout = void 0;
            Checkout.isChild() && (window.xprops.logLevel && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__lib__.i)(window.xprops.logLevel), 
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__popupBridge__.b)());
        },
        "./src/components/checkout/componentTemplate.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return componentTemplate;
            });
            var componentTemplate = function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return '\n\n    <!DOCTYPE html>\n    \n    <head>\n        <meta name="viewport" content="width=device-width, initial-scale=1">\n    \n        <title>PayPal</title>\n    \n        <style>\n            body {\n                width: 100%;\n                height: 100%;\n                overflow: hidden;\n                position: fixed;\n                top: 0;\n                left: 0;\n                margin: 0;\n            }\n    \n            .spinner {\n                height: 100%;\n                width: 100%;\n                position: absolute;\n                z-index: 10\n            }\n    \n            .spinner .spinWrap {\n                width: 200px;\n                height: 100px;\n                position: absolute;\n                top: 50%;\n                left: 50%;\n                margin-left: -100px;\n                margin-top: -50px\n            }\n    \n            .spinner .loader,\n            .spinner .spinnerImage {\n                height: 100px;\n                width: 100px;\n                position: absolute;\n                top: 0;\n                left: 50%;\n                opacity: 1;\n                filter: alpha(opacity=100)\n            }\n    \n            .spinner .spinnerImage {\n                margin: 28px 0 0 -25px;\n                background: url(https://www.paypalobjects.com/images/checkout/hermes/icon_ot_spin_lock_skinny.png) no-repeat\n            }\n    \n            .spinner .loader {\n                margin: 0 0 0 -55px;\n                background-color: transparent;\n                -webkit-animation: rotation .7s infinite linear;\n                -moz-animation: rotation .7s infinite linear;\n                -o-animation: rotation .7s infinite linear;\n                animation: rotation .7s infinite linear;\n                border-left: 5px solid #cbcbca;\n                border-right: 5px solid #cbcbca;\n                border-bottom: 5px solid #cbcbca;\n                border-top: 5px solid #2380be;\n                border-radius: 100%\n            }\n    \n            @-webkit-keyframes rotation {\n                from {\n                    -webkit-transform: rotate(0deg)\n                }\n                to {\n                    -webkit-transform: rotate(359deg)\n                }\n            }\n            @-moz-keyframes rotation {\n                from {\n                    -moz-transform: rotate(0deg)\n                }\n                to {\n                    -moz-transform: rotate(359deg)\n                }\n            }\n            @-o-keyframes rotation {\n                from {\n                    -o-transform: rotate(0deg)\n                }\n                to {\n                    -o-transform: rotate(359deg)\n                }\n            }\n            @keyframes rotation {\n                from {\n                    transform: rotate(0deg)\n                }\n                to {\n                    transform: rotate(359deg)\n                }\n            }\n        </style>\n    \n    </head>\n    \n    <body>\n        <div id="preloaderSpinner" class="preloader spinner">\n            <div class="spinWrap">\n                <p class="spinnerImage"></p>\n                <p class="loader"></p>\n            </div>\n        </div>\n    </body>\n\n';
            };
        },
        "./src/components/checkout/content.json": function(module, exports) {
            module.exports = '\n{\n    "AT": {\n        "de": {\n            "windowMessage": "Sie sehen das sichere Browserfenster von PayPal nicht?  k\\u00F6nnen Sie es wieder \\u00F6ffnen und Ihren Einkauf abschlie\\u00DFen.",\n            "continue": "Weiter"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "ZW": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "ZM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "ZA": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "YT": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "YE": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        }\n    },\n    "WS": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "WF": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "VU": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "VG": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "VE": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "VC": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "VA": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "UY": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "UG": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "TZ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "TV": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "TT": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "TO": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "TN": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        }\n    },\n    "TM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "TJ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "TG": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "TD": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "TC": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "SZ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "SV": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "ST": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "SR": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "SO": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "SN": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "SM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "SL": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "SJ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "SH": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "SC": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "SB": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "SA": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        }\n    },\n    "RW": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "RS": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "RE": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "QA": {\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        },\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "PY": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "PW": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "PN": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "PM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "PG": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "PF": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "PE": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "PA": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "OM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        }\n    },\n    "NU": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "NR": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "NP": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "NI": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "NG": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "NF": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "NE": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "NC": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "NA": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MZ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MW": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MV": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "MU": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MT": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MS": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "MR": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MQ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MN": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "ML": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "MK": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MH": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "MG": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "ME": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MD": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MC": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "MA": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        }\n    },\n    "LS": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "LK": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "LI": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "LC": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "LA": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "KZ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "KY": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "KW": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        }\n    },\n    "KN": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "KM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "KI": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "KH": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "KG": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "KE": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "JO": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        }\n    },\n    "JM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "IS": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "HR": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "HN": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "GY": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "GW": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "GT": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "GP": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "GN": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "GM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "GL": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "da": {\n            "windowMessage": "Kan du ikke se PayPals sikre browser? Vi hj\\u00E6lper dig med at genstarte vinduet, s\\u00E5 du kan betale.",\n            "continue": "Forts\\u00E6t"\n        }\n    },\n    "GI": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "GF": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "GE": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "GD": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "GA": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "FO": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "da": {\n            "windowMessage": "Kan du ikke se PayPals sikre browser? Vi hj\\u00E6lper dig med at genstarte vinduet, s\\u00E5 du kan betale.",\n            "continue": "Forts\\u00E6t"\n        }\n    },\n    "FM": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "FK": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "FJ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "ET": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "ER": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "EG": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        }\n    },\n    "EC": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "DZ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        }\n    },\n    "DO": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "DM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "DJ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "CY": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "CV": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "CR": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "CO": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "CM": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "CL": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "CK": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "CI": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "CG": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "CD": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "BZ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "BY": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "BW": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "BT": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "BS": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "BO": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "BN": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "BM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "BJ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "BI": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "BH": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        }\n    },\n    "BG": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "BF": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        }\n    },\n    "BB": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "BA": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "AZ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "AW": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "AO": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "AN": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "AM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "AL": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "AI": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "AG": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "AE": {\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        },\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "AD": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "CN": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u4ED8\\u6B3E\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        }\n    },\n    "GB": {\n        "fr": {\n            "windowMessage": "Vous ne voyez pas le navigateur s\\u00E9curis\\u00E9 PayPal\\u00A0? Nous allons vous aider \\u00E0 relancer la fen\\u00EAtre pour effectuer votre achat.\\u00A0 ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\'ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "AR": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        }\n    },\n    "US": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "VN": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.  ",\n            "continue": "Continue"\n        }\n    },\n    "UA": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "ru": {\n            "windowMessage": "\\u041D\\u0435 \\u043E\\u0442\\u043E\\u0431\\u0440\\u0430\\u0436\\u0430\\u0435\\u0442\\u0441\\u044F \\u0431\\u0435\\u0437\\u043E\\u043F\\u0430\\u0441\\u043D\\u0430\\u044F \\u0441\\u0442\\u0440\\u0430\\u043D\\u0438\\u0446\\u0430 PayPal \\u0432 \\u0431\\u0440\\u0430\\u0443\\u0437\\u0435\\u0440\\u0435? \\u041C\\u044B \\u043F\\u043E\\u043C\\u043E\\u0436\\u0435\\u043C \\u0432\\u0430\\u043C \\u043F\\u043E\\u0432\\u0442\\u043E\\u0440\\u043D\\u043E \\u0437\\u0430\\u0433\\u0440\\u0443\\u0437\\u0438\\u0442\\u044C \\u043E\\u043A\\u043D\\u043E, \\u0447\\u0442\\u043E\\u0431\\u044B \\u0437\\u0430\\u0432\\u0435\\u0440\\u0448\\u0438\\u0442\\u044C \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0443.\\u00A0 ",\n            "continue": "\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "TW": {\n        "zh": {\n            "windowMessage": "\\u770B\\u4E0D\\u5230\\u5B89\\u5168\\u9023\\u7DDA\\u7684 PayPal \\u700F\\u89BD\\u5668\\uFF1F\\u6211\\u5011\\u5C07\\u6703\\u91CD\\u65B0\\u555F\\u52D5\\u8996\\u7A97\\u4EE5\\u5B8C\\u6210\\u4ED8\\u6B3E\\u3002\\u00A0 ",\n            "continue": "\\u7E7C\\u7E8C"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "TR": {\n        "tr": {\n            "windowMessage": "G\\u00FCvenli PayPal taray\\u0131c\\u0131s\\u0131n\\u0131 g\\u00F6rm\\u00FCyor musunuz? Al\\u0131\\u015Fveri\\u015Finizi tamamlamak i\\u00E7in pencereyi yeniden ba\\u015Flatman\\u0131za yard\\u0131mc\\u0131 olaca\\u011F\\u0131z.\\u00A0 ",\n            "continue": "Devam"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "TH": {\n        "th": {\n            "windowMessage": "\\u0E16\\u0E49\\u0E32\\u0E04\\u0E38\\u0E13\\u0E44\\u0E21\\u0E48\\u0E40\\u0E2B\\u0E47\\u0E19\\u0E40\\u0E1A\\u0E23\\u0E32\\u0E27\\u0E4C\\u0E40\\u0E0B\\u0E2D\\u0E23\\u0E4C\\u0E17\\u0E35\\u0E48\\u0E21\\u0E35\\u0E23\\u0E30\\u0E1A\\u0E1A\\u0E04\\u0E27\\u0E32\\u0E21\\u0E1B\\u0E25\\u0E2D\\u0E14\\u0E20\\u0E31\\u0E22\\u0E02\\u0E2D\\u0E07 PayPal \\u0E40\\u0E23\\u0E32\\u0E08\\u0E30\\u0E0A\\u0E48\\u0E27\\u0E22\\u0E04\\u0E38\\u0E13\\u0E40\\u0E1B\\u0E34\\u0E14\\u0E2B\\u0E19\\u0E49\\u0E32\\u0E15\\u0E48\\u0E32\\u0E07\\u0E2D\\u0E35\\u0E01\\u0E04\\u0E23\\u0E31\\u0E49\\u0E07\\u0E40\\u0E1E\\u0E37\\u0E48\\u0E2D\\u0E0A\\u0E33\\u0E23\\u0E30\\u0E40\\u0E07\\u0E34\\u0E19\\u0E43\\u0E2B\\u0E49\\u0E40\\u0E23\\u0E35\\u0E22\\u0E1A\\u0E23\\u0E49\\u0E2D\\u0E22 ",\n            "continue": "\\u0E14\\u0E33\\u0E40\\u0E19\\u0E34\\u0E19\\u0E01\\u0E32\\u0E23\\u0E15\\u0E48\\u0E2D"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "SK": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "SI": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "SG": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "SE": {\n        "sv": {\n            "windowMessage": "Ser du inte den s\\u00E4kra PayPal-webbl\\u00E4saren? Vi hj\\u00E4lper dig att starta om f\\u00F6nstret f\\u00F6r att slutf\\u00F6ra ditt k\\u00F6p. ",\n            "continue": "Forts\\u00E4tt"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "RU": {\n        "ru": {\n            "windowMessage": "\\u041D\\u0435 \\u043E\\u0442\\u043E\\u0431\\u0440\\u0430\\u0436\\u0430\\u0435\\u0442\\u0441\\u044F \\u0431\\u0435\\u0437\\u043E\\u043F\\u0430\\u0441\\u043D\\u0430\\u044F \\u0441\\u0442\\u0440\\u0430\\u043D\\u0438\\u0446\\u0430 PayPal \\u0432 \\u0431\\u0440\\u0430\\u0443\\u0437\\u0435\\u0440\\u0435? \\u041C\\u044B \\u043F\\u043E\\u043C\\u043E\\u0436\\u0435\\u043C \\u0432\\u0430\\u043C \\u043F\\u043E\\u0432\\u0442\\u043E\\u0440\\u043D\\u043E \\u0437\\u0430\\u0433\\u0440\\u0443\\u0437\\u0438\\u0442\\u044C \\u043E\\u043A\\u043D\\u043E, \\u0447\\u0442\\u043E\\u0431\\u044B \\u0437\\u0430\\u0432\\u0435\\u0440\\u0448\\u0438\\u0442\\u044C \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0443.",\n            "continue": "\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "RO": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "PT": {\n        "pt": {\n            "windowMessage": "N\\u00E3o v\\u00EA a indica\\u00E7\\u00E3o de sess\\u00E3o segura PayPal no browser? Vamos ajudar a reabrir a janela para que possa concluir a sua compra.",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "PL": {\n        "pl": {\n            "windowMessage": "Nie widzisz bezpiecznej przegl\\u0105darki PayPal? Pomo\\u017Cemy Ci ponownie uruchomi\\u0107 to okno w celu dokonania zakupu.\\u00A0 ",\n            "continue": "Kontynuuj"\n        },\n        "en": {\n            "windowMessage": "You don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "PH": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "NZ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u4ED8\\u6B3E\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 relancer la fen\\u00EAtre pour effectuer votre paiement.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Le ayudaremos a abrir de nuevo la ventana para completar su pago.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "NO": {\n        "no": {\n            "windowMessage": "Ser du ikke den sikre PayPal-nettleseren? Vi hjelper deg med \\u00E5 starte vinduet p\\u00E5 nytt s\\u00E5 du kan fullf\\u00F8re kj\\u00F8pet.\\u00A0 ",\n            "continue": "Fortsett"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "NL": {\n        "nl": {\n            "windowMessage": "Ziet u geen beveiligde PayPal-browser? We helpen u het venster opnieuw te openen om uw aankoop te voltooien.\\u00A0 ",\n            "continue": "Doorgaan"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MY": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "MX": {\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "LV": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "ru": {\n            "windowMessage": "\\u041D\\u0435 \\u043E\\u0442\\u043E\\u0431\\u0440\\u0430\\u0436\\u0430\\u0435\\u0442\\u0441\\u044F \\u0431\\u0435\\u0437\\u043E\\u043F\\u0430\\u0441\\u043D\\u0430\\u044F \\u0441\\u0442\\u0440\\u0430\\u043D\\u0438\\u0446\\u0430 PayPal \\u0432 \\u0431\\u0440\\u0430\\u0443\\u0437\\u0435\\u0440\\u0435? \\u041C\\u044B \\u043F\\u043E\\u043C\\u043E\\u0436\\u0435\\u043C \\u0432\\u0430\\u043C \\u043F\\u043E\\u0432\\u0442\\u043E\\u0440\\u043D\\u043E \\u0437\\u0430\\u0433\\u0440\\u0443\\u0437\\u0438\\u0442\\u044C \\u043E\\u043A\\u043D\\u043E, \\u0447\\u0442\\u043E\\u0431\\u044B \\u0437\\u0430\\u0432\\u0435\\u0440\\u0448\\u0438\\u0442\\u044C \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0443.\\u00A0 ",\n            "continue": "\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "LU": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "de": {\n            "windowMessage": "Das PayPal-Fenster wird nicht angezeigt?  k\\u00F6nnen Sie es wieder \\u00F6ffnen und Ihren Einkauf abschlie\\u00DFen.",\n            "continue": "Weiter"\n        }\n    },\n    "LT": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "ru": {\n            "windowMessage": "\\u041D\\u0435 \\u043E\\u0442\\u043E\\u0431\\u0440\\u0430\\u0436\\u0430\\u0435\\u0442\\u0441\\u044F \\u0431\\u0435\\u0437\\u043E\\u043F\\u0430\\u0441\\u043D\\u0430\\u044F \\u0441\\u0442\\u0440\\u0430\\u043D\\u0438\\u0446\\u0430 PayPal \\u0432 \\u0431\\u0440\\u0430\\u0443\\u0437\\u0435\\u0440\\u0435? \\u041C\\u044B \\u043F\\u043E\\u043C\\u043E\\u0436\\u0435\\u043C \\u0432\\u0430\\u043C \\u043F\\u043E\\u0432\\u0442\\u043E\\u0440\\u043D\\u043E \\u0437\\u0430\\u0433\\u0440\\u0443\\u0437\\u0438\\u0442\\u044C \\u043E\\u043A\\u043D\\u043E, \\u0447\\u0442\\u043E\\u0431\\u044B \\u0437\\u0430\\u0432\\u0435\\u0440\\u0448\\u0438\\u0442\\u044C \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0443.\\u00A0 ",\n            "continue": "\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "KR": {\n        "ko": {\n            "windowMessage": "\\uBCF4\\uC548 PayPal \\uBE0C\\uB77C\\uC6B0\\uC800\\uAC00 \\uBCF4\\uC774\\uC9C0 \\uC54A\\uC73C\\uC2E0\\uAC00\\uC694? \\uCC3D\\uC744 \\uB2E4\\uC2DC \\uC2E4\\uD589\\uD558\\uC5EC \\uACB0\\uC81C\\uB97C \\uC644\\uB8CC\\uD560 \\uC218 \\uC788\\uB3C4\\uB85D \\uB3C4\\uC640\\uB4DC\\uB9AC\\uACA0\\uC2B5\\uB2C8\\uB2E4.\\u00A0 ",\n            "continue": "\\uACC4\\uC18D"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "JP": {\n        "ja": {\n            "windowMessage": "\\u30BB\\u30AD\\u30E5\\u30A2\\u306A\\u30D6\\u30E9\\u30A6\\u30B6\\u304C\\u8868\\u793A\\u3055\\u308C\\u306A\\u3044\\u5834\\u5408\\u306F\\u3001\\u30A6\\u30A3\\u30F3\\u30C9\\u30A6\\u3092\\u518D\\u8D77\\u52D5\\u3057\\u3066\\u3001\\u652F\\u6255\\u3044\\u3092\\u5B8C\\u4E86\\u3067\\u304D\\u308B\\u3088\\u3046\\u304A\\u624B\\u4F1D\\u3044\\u3044\\u305F\\u3057\\u307E\\u3059\\u3002",\n            "continue": "\\u7D9A\\u884C"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.  ",\n            "continue": "Continue"\n        }\n    },\n    "IT": {\n        "it": {\n            "windowMessage": "Non vedi la pagina sicura di PayPal? Ti aiuteremo a riaprire la finestra per completare l\'acquisto.\\u00A0 ",\n            "continue": "Continua"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "IN": {\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "IL": {\n        "he": {\n            "windowMessage": "\\u05DC\\u05D0 \\u05E8\\u05D5\\u05D0\\u05D4 \\u05D0\\u05EA \\u05D3\\u05E4\\u05D3\\u05E4\\u05DF PayPal \\u05D4\\u05DE\\u05D0\\u05D5\\u05D1\\u05D8\\u05D7? \\u05E0\\u05E2\\u05D6\\u05D5\\u05E8 \\u05DC\\u05DA \\u05DC\\u05E4\\u05EA\\u05D5\\u05D7 \\u05DE\\u05D7\\u05D3\\u05E9 \\u05D0\\u05EA \\u05D4\\u05D7\\u05DC\\u05D5\\u05DF \\u05DB\\u05D3\\u05D9 \\u05DC\\u05D4\\u05E9\\u05DC\\u05D9\\u05DD \\u05D0\\u05EA \\u05D4\\u05E7\\u05E0\\u05D9\\u05D9\\u05D4 \\u05E9\\u05DC\\u05DA.\\u00A0 ",\n            "continue": "\\u05D4\\u05DE\\u05E9\\u05DA"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "IE": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "HU": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "ID": {\n        "id": {\n            "windowMessage": "Browser PayPal yang aman tidak terlihat? Kami akan membantu menampilkan ulang jendela untuk menyelesaikan pembayaran Anda.\\u00A0 ",\n            "continue": "Lanjutkan"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "HK": {\n        "zh": {\n            "windowMessage": "\\u770B\\u4E0D\\u5230\\u5B89\\u5168\\u7684 PayPal \\u700F\\u89BD\\u5668\\u8996\\u7A97\\uFF1F\\u6211\\u5011\\u6703\\u52A9\\u4F60\\u91CD\\u65B0\\u958B\\u555F\\u8996\\u7A97\\uFF0C\\u4EE5\\u5B8C\\u6210\\u4ED8\\u6B3E\\u3002",\n            "continue": "\\u7E7C\\u7E8C"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "GROUP-LATAM": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u770B\\u5230PayPal\\u4ED8\\u6B3E\\u9875\\u9762\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo puede ver la p\\u00E1gina de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the PayPal payment page? We\\u2019ll help you re-launch the window to complete your purchase.",\n            "continue": "Continue"\n        }\n    },\n    "GROUP-EMEA": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "ru": {\n            "windowMessage": "\\u041D\\u0435 \\u043E\\u0442\\u043E\\u0431\\u0440\\u0430\\u0436\\u0430\\u0435\\u0442\\u0441\\u044F \\u0431\\u0435\\u0437\\u043E\\u043F\\u0430\\u0441\\u043D\\u0430\\u044F \\u0441\\u0442\\u0440\\u0430\\u043D\\u0438\\u0446\\u0430 PayPal \\u0432 \\u0431\\u0440\\u0430\\u0443\\u0437\\u0435\\u0440\\u0435? \\u041C\\u044B \\u043F\\u043E\\u043C\\u043E\\u0436\\u0435\\u043C \\u0432\\u0430\\u043C \\u043F\\u043E\\u0432\\u0442\\u043E\\u0440\\u043D\\u043E \\u0437\\u0430\\u0433\\u0440\\u0443\\u0437\\u0438\\u0442\\u044C \\u043E\\u043A\\u043D\\u043E, \\u0447\\u0442\\u043E\\u0431\\u044B \\u0437\\u0430\\u0432\\u0435\\u0440\\u0448\\u0438\\u0442\\u044C \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0443.\\u00A0 ",\n            "continue": "\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C"\n        },\n        "pt": {\n            "windowMessage": "N\\u00E3o v\\u00EA a indica\\u00E7\\u00E3o de sess\\u00E3o segura PayPal no browser? Vamos ajudar a reabrir a janela para que possa concluir a sua compra.",\n            "continue": "Continuar"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "de": {\n            "windowMessage": "Sie sehen das sichere Browserfenster von PayPal nicht?  k\\u00F6nnen Sie es wieder \\u00F6ffnen und Ihren Einkauf abschlie\\u00DFen.",\n            "continue": "Weiter"\n        },\n        "da": {\n            "windowMessage": "Kan du ikke se PayPals sikre browser? Vi hj\\u00E6lper dig med at genstarte vinduet, s\\u00E5 du kan betale.",\n            "continue": "Forts\\u00E6t"\n        },\n        "ar": {\n            "windowMessage": "\\u0644\\u0627 \\u062A\\u0631\\u0649 \\u0645\\u062A\\u0635\\u0641\\u062D PayPal \\u0627\\u0644\\u0622\\u0645\\u0646\\u061F \\u0633\\u0646\\u0633\\u0627\\u0639\\u062F\\u0643 \\u0641\\u064A \\u0625\\u0639\\u0627\\u062F\\u0629 \\u0641\\u062A\\u062D \\u0627\\u0644\\u0646\\u0627\\u0641\\u0630\\u0629 \\u0644\\u0627\\u0633\\u062A\\u0643\\u0645\\u0627\\u0644 \\u0645\\u0634\\u062A\\u0631\\u064A\\u0627\\u062A\\u0643. \\u00A0 ",\n            "continue": "\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629"\n        }\n    },\n    "GROUP-APAC": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "ko": {\n            "windowMessage": "\\uBCF4\\uC548 PayPal \\uBE0C\\uB77C\\uC6B0\\uC800\\uAC00 \\uBCF4\\uC774\\uC9C0 \\uC54A\\uC73C\\uC2E0\\uAC00\\uC694? \\uCC3D\\uC744 \\uB2E4\\uC2DC \\uC2E4\\uD589\\uD558\\uC5EC \\uAD6C\\uB9E4\\uB97C \\uC644\\uB8CC\\uD560 \\uC218 \\uC788\\uB3C4\\uB85D \\uB3C4\\uC640\\uB4DC\\uB9AC\\uACA0\\uC2B5\\uB2C8\\uB2E4. ",\n            "continue": "\\uACC4\\uC18D"\n        },\n        "id": {\n            "windowMessage": "Browser PayPal yang aman tidak terlihat? Kami akan membantu menampilkan ulang jendela untuk menyelesaikan pembelian Anda. ",\n            "continue": "Lanjutkan"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat. ",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\\u2019t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.  ",\n            "continue": "Continue"\n        }\n    },\n    "GR": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "FR": {\n        "fr": {\n            "windowMessage": "Vous ne voyez pas le navigateur s\\u00E9curis\\u00E9 PayPal\\u00A0? Nous allons vous aider \\u00E0 relancer la fen\\u00EAtre pour effectuer votre achat.\\u00A0 ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "ES": {\n        "es": {\n            "windowMessage": "\\u00BFNo ve el s\\u00EDmbolo de navegaci\\u00F3n segura de PayPal? Le ayudaremos a abrir de nuevo la ventana para completar la compra. ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "FI": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "EE": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "ru": {\n            "windowMessage": "\\u041D\\u0435 \\u043E\\u0442\\u043E\\u0431\\u0440\\u0430\\u0436\\u0430\\u0435\\u0442\\u0441\\u044F \\u0431\\u0435\\u0437\\u043E\\u043F\\u0430\\u0441\\u043D\\u0430\\u044F \\u0441\\u0442\\u0440\\u0430\\u043D\\u0438\\u0446\\u0430 PayPal \\u0432 \\u0431\\u0440\\u0430\\u0443\\u0437\\u0435\\u0440\\u0435? \\u041C\\u044B \\u043F\\u043E\\u043C\\u043E\\u0436\\u0435\\u043C \\u0432\\u0430\\u043C \\u043F\\u043E\\u0432\\u0442\\u043E\\u0440\\u043D\\u043E \\u0437\\u0430\\u0433\\u0440\\u0443\\u0437\\u0438\\u0442\\u044C \\u043E\\u043A\\u043D\\u043E, \\u0447\\u0442\\u043E\\u0431\\u044B \\u0437\\u0430\\u0432\\u0435\\u0440\\u0448\\u0438\\u0442\\u044C \\u043F\\u043E\\u043A\\u0443\\u043F\\u043A\\u0443.\\u00A0 ",\n            "continue": "\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "DK": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "da": {\n            "windowMessage": "Kan du ikke se PayPals sikre browser? Vi hj\\u00E6lper dig med at genstarte vinduet, s\\u00E5 du kan betale.",\n            "continue": "Forts\\u00E6t"\n        }\n    },\n    "CZ": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u8D2D\\u7269\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "fr": {\n            "windowMessage": "Le navigateur s\\u00E9curis\\u00E9 de PayPal n\'appara\\u00EEt pas\\u00A0? Nous allons vous aider \\u00E0 rouvrir la fen\\u00EAtre pour finaliser votre achat.",\n            "continue": "Continuer"\n        },\n        "es": {\n            "windowMessage": "\\u00BFNo ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "DE": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "de": {\n            "windowMessage": "Sie sehen das sichere Browserfenster von PayPal nicht?  k\\u00F6nnen Sie es wieder \\u00F6ffnen und Ihren Einkauf abschlie\\u00DFen.",\n            "continue": "Weiter"\n        }\n    },\n    "CH": {\n        "fr": {\n            "windowMessage": "Vous ne voyez pas le navigateur s\\u00E9curis\\u00E9 PayPal\\u00A0? Nous allons vous aider \\u00E0 relancer la fen\\u00EAtre pour effectuer votre achat.\\u00A0 ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        },\n        "de": {\n            "windowMessage": "Sie sehen das sichere Browserfenster von PayPal nicht?  k\\u00F6nnen Sie es wieder \\u00F6ffnen und Ihren Einkauf abschlie\\u00DFen.",\n            "continue": "Weiter"\n        }\n    },\n    "CA": {\n        "fr": {\n            "windowMessage": "Vous ne voyez pas le navigateur s\\u00E9curis\\u00E9 de PayPal\\u00A0? Nous vous aiderons \\u00E0 relancer la fen\\u00EAtre afin d\'effectuer votre achat.\\u00A0 ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you relaunch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "C2": {\n        "zh": {\n            "windowMessage": "\\u6CA1\\u6709\\u627E\\u5230\\u5B89\\u5168\\u7684PayPal\\u6D4F\\u89C8\\u5668\\uFF1F\\u6211\\u4EEC\\u5C06\\u5E2E\\u52A9\\u60A8\\u91CD\\u542F\\u7A97\\u53E3\\u4EE5\\u5B8C\\u6210\\u4ED8\\u6B3E\\u3002\\u00A0 ",\n            "continue": "\\u7EE7\\u7EED"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your payment.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "BE": {\n        "nl": {\n            "windowMessage": "Ziet u de beveiligde PayPal-browser niet? We helpen u het venster opnieuw te openen om uw aankoop te voltooien.\\u00A0 ",\n            "continue": "Doorgaan"\n        },\n        "fr": {\n            "windowMessage": "Vous ne voyez pas le navigateur s\\u00E9curis\\u00E9 PayPal\\u00A0? Nous allons vous aider \\u00E0 relancer la fen\\u00EAtre pour effectuer votre achat.\\u00A0 ",\n            "continue": "Continuer"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "BR": {\n        "pt": {\n            "windowMessage": "N\\u00E3o est\\u00E1 vendo o navegador seguro do PayPal? Ajudaremos voc\\u00EA a reabrir a janela para concluir a compra.\\u00A0 ",\n            "continue": "Continuar"\n        },\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\\u2019ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    },\n    "AU": {\n        "en": {\n            "windowMessage": "Don\'t see the secure PayPal browser? We\'ll help you re-launch the window to complete your purchase.\\u00A0 ",\n            "continue": "Continue"\n        }\n    }\n}\n';
        },
        "./src/components/checkout/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__("./src/components/checkout/component.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_0__component__.a;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_0__component__.b;
            });
        },
        "./src/components/checkout/parentTemplate.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return parentTemplate;
            });
            var parentTemplate = function() {
                var ctx = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return '\n    \n    <div class="paypal-checkout-overlay ' + ctx.CLASS.FOCUS + '">\n        <a href="#' + ctx.CLASS.CLOSE + '" class="' + ctx.CLASS.CLOSE + '"></a>\n        <div class="paypal-checkout-modal">\n            <div class="paypal-checkout-logo"></div>\n            <div class="paypal-checkout-message">\n                ' + ctx.content.windowMessage + '\n            </div>\n            <div class="paypal-checkout-continue">\n                <a href="#' + ctx.CLASS.FOCUS + '" class="' + ctx.CLASS.FOCUS + '">' + ctx.content.continue + '</a>\n            </div>\n            <div class="paypal-checkout-loading">\n                <div class="paypal-spinner"></div>\n            </div>\n        </div>\n    \n        <div class="' + ctx.CLASS.ELEMENT + ' paypal-checkout-lightbox-element"></div>\n    </div>\n    \n    <style>\n    \n        #' + ctx.id + "." + ctx.CLASS.POPUP + ", #" + ctx.id + "." + ctx.CLASS.LIGHTBOX + " {\n            position: fixed;\n            z-index: 2147483647;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n    \n            -webkit-animation-duration: 1s;\n            animation-duration: 1s;\n    \n            animation-fill-mode:forwards;\n            animation-iteration-count: 1;\n    \n            -webkit-animation-fill-mode:forwards;\n            -webkit-animation-iteration-count: 1;\n        }\n    \n        #" + ctx.id + " .paypal-checkout-overlay {\n    \n            position: absolute;\n    \n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n    \n            background-color: black;\n    \n            background-color: rgba(0, 0, 0, 0.8);\n    \n            background: -webkit-radial-gradient(50% 50%, ellipse closest-corner, rgba(0,0,0,0.6) 1%, rgba(0,0,0,0.8) 100%);\n            background: -moz-radial-gradient(50% 50%, ellipse closest-corner, rgba(0,0,0,0.6) 1%, rgba(0,0,0,0.8) 100%);\n            background: -ms-radial-gradient(50% 50%, ellipse closest-corner, rgba(0,0,0,0.6) 1%, rgba(0,0,0,0.8) 100%);\n            background: radial-gradient(50% 50%, ellipse closest-corner, rgba(0,0,0,0.6) 1%, rgba(0,0,0,0.8) 100%);\n    \n            -webkit-transform: translate3d(0, 0, 0);\n            -moz-transform: translate3d(0, 0, 0);\n            -ms-transform: translate3d(0, 0, 0);\n            -o-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n        }\n    \n        #" + ctx.id + "." + ctx.CLASS.POPUP + " .paypal-checkout-overlay {\n            cursor: pointer;\n        }\n    \n        #" + ctx.id + "." + ctx.CLASS.POPUP + " .paypal-checkout-overlay {\n            cursor: pointer;\n        }\n    \n        #" + ctx.id + ' .paypal-checkout-overlay .paypal-checkout-modal {\n            font-family: "HelveticaNeue", "HelveticaNeue-Light", "Helvetica Neue Light", helvetica, arial, sans-serif;\n            font-size: 14px;\n            text-align: center;\n            color: #fff;\n            -webkit-box-sizing: border-box;\n            -moz-box-sizing: border-box;\n            -ms-box-sizing: border-box;\n            box-sizing: border-box;\n            width: 350px;\n            top: 50%;\n            left: 50%;\n            position: fixed;\n            margin-left: -165px;\n            margin-top: -80px;\n            cursor: pointer;\n            text-align: center;\n        }\n    \n        #' + ctx.id + "." + ctx.CLASS.LOADING + " .paypal-checkout-message, #" + ctx.id + "." + ctx.CLASS.LOADING + " .paypal-checkout-continue {\n            display: none;\n        }\n    \n        .paypal-checkout-loading {\n            display: none;\n        }\n    \n        #" + ctx.id + "." + ctx.CLASS.LOADING + " .paypal-checkout-loading {\n            display: block;\n        }\n    \n        #" + ctx.id + ' .paypal-checkout-overlay .paypal-checkout-modal .paypal-checkout-logo {\n            background: url("https://www.paypalobjects.com/images/checkout/incontext/incontext_mask_sprite.png") no-repeat -18px -16px;\n            width: 132px;\n            height: 36px;\n            cursor: pointer;\n            margin-bottom: 30px;\n            display: inline-block;\n        }\n    \n        @media only screen and (-webkit-min-device-pixel-ratio: 2), not all, not all, only screen and (min-resolution: 2dppx), only screen and (min-resolution: 192dpi) {\n            #' + ctx.id + ' .paypal-checkout-overlay .paypal-checkout-modal .paypal-checkout-logo {\n                background-image: url("https://www.paypalobjects.com/images/checkout/incontext/incontext_mask_sprite_2x.png");\n                background-size: 200px 200px;\n            }\n        }\n    \n        #' + ctx.id + " .paypal-checkout-overlay .paypal-checkout-modal .paypal-checkout-message {\n            font-size: 15px;\n            line-height: 1.5;\n            padding: 10px 0;\n        }\n    \n        #" + ctx.id + "." + ctx.CLASS.LIGHTBOX + " .paypal-checkout-message, #" + ctx.id + "." + ctx.CLASS.LIGHTBOX + " .paypal-checkout-continue {\n            display: none;\n        }\n    \n        #" + ctx.id + " .paypal-checkout-overlay .paypal-checkout-modal .paypal-checkout-continue {\n            font-size: 15px;\n            line-height: 1.35;\n            padding: 10px 0;\n            text-decoration: underline;\n            font-weight: bold;\n        }\n    \n        #" + ctx.id + " ." + ctx.CLASS.CLOSE + " {\n            position: absolute;\n            right: 16px;\n            top: 16px;\n            width: 16px;\n            height: 16px;\n            opacity: 0.6;\n        }\n    \n        #" + ctx.id + "." + ctx.CLASS.LOADING + " ." + ctx.CLASS.CLOSE + " {\n            display: none;\n        }\n    \n        #" + ctx.id + " ." + ctx.CLASS.CLOSE + ":hover {\n            opacity: 1;\n        }\n    \n        #" + ctx.id + " ." + ctx.CLASS.CLOSE + ":before, ." + ctx.CLASS.CLOSE + ":after {\n            position: absolute;\n            left: 8px;\n            content: ' ';\n            height: 16px;\n            width: 2px;\n            background-color: white;\n        }\n    \n        #" + ctx.id + " ." + ctx.CLASS.CLOSE + ":before {\n            transform: rotate(45deg);\n            -webkit-transform: rotate(45deg);\n            -moz-transform: rotate(45deg);\n            -o-transform: rotate(45deg);\n            -ms-transform: rotate(45deg);\n        }\n    \n        #" + ctx.id + " ." + ctx.CLASS.CLOSE + ":after {\n            transform: rotate(-45deg);\n            -webkit-transform: rotate(-45deg);\n            -moz-transform: rotate(-45deg);\n            -o-transform: rotate(-45deg);\n            -ms-transform: rotate(-45deg);\n        }\n    \n        #" + ctx.id + " a {\n            color: white;\n        }\n    \n        #" + ctx.id + " .paypal-checkout-lightbox-element {\n            display: none;\n        }\n    \n        #" + ctx.id + "." + ctx.CLASS.LIGHTBOX + " .paypal-checkout-lightbox-element {\n    \n            display: block;\n    \n            -webkit-transition: all 0.6s ease;\n            -moz-transition: all 0.6s ease;\n            -ms-transition: all 0.6s ease;\n            -o-transition: all 0.6 ease;\n            transition: all 0.6s ease;\n    \n            -webkit-animation-duration: 1s;\n            animation-duration: 1s;\n            -webkit-animation-fill-mode: both;\n            animation-fill-mode: both;\n    \n            position: fixed;\n    \n            top: 50%;\n            left: 50%;\n    \n            transform: translate3d(-50%, -50%, 0);\n            -webkit-transform: translate3d(-50%, -50%, 0);\n            -moz-transform: translate3d(-50%, -50%, 0);\n            -o-transform: translate3d(-50%, -50%, 0);\n            -ms-transform: translate3d(-50%, -50%, 0);\n    \n            max-height: calc(100% - 20px);\n            max-height: -webkit-calc(100% - 20px);\n            max-height: -moz-calc(100% - 20px);\n            max-height: -o-calc(100% - 20px);\n            max-height: -ms-calc(100% - 20px);\n    \n            max-width: calc(100% - 20px);\n            max-width: -webkit-calc(100% - 20px);\n            max-width: -moz-calc(100% - 20px);\n            max-width: -o-calc(100% - 20px);\n            max-width: -ms-calc(100% - 20px);\n    \n            width: 450px;\n            height: 535px;\n    \n            min-width: 450px;\n    \n            background-color: white;\n            border-radius: 10px;\n    \n            overflow: auto;\n            -webkit-overflow-scrolling:touch;\n    \n        }\n    \n        @media screen and (max-width: 450px) {\n    \n            #" + ctx.id + "." + ctx.CLASS.LIGHTBOX + " .paypal-checkout-lightbox-element {\n                min-width: calc(100% - 20px);\n                min-width: -webkit-calc(100% - 20px);\n                min-width: -moz-calc(100% - 20px);\n                min-width: -o-calc(100% - 20px);\n                min-width: -ms-calc(100% - 20px);\n            }\n        }\n    \n        @media screen and (min-width: 490px) {\n    \n            #" + ctx.id + "." + ctx.CLASS.LIGHTBOX + " .paypal-checkout-lightbox-element {\n                max-width: 450px;\n                max-width: 450px;\n                max-width: 450px;\n                max-width: 450px;\n    \n                max-width: 450px;\n            }\n        }\n    \n        #" + ctx.id + "." + ctx.CLASS.LIGHTBOX + " .paypal-checkout-lightbox-element iframe {\n    \n            width: 100%;\n            height: 100%;\n        }\n    \n    \n        /*!\n         * animate.css -http://daneden.me/animate\n         * Version - 3.5.1\n         * Licensed under the MIT license - http://opensource.org/licenses/MIT\n         *\n         * Copyright (c) 2016 Daniel Eden\n         */\n    \n        @-webkit-keyframes " + ctx.ANIMATION.SHOW_COMPONENT + " {\n            from, 60%, 75%, 90%, to {\n                -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n                animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n            }\n    \n            from {\n                opacity: 0;\n                -webkit-transform: translate3d(0, 3000px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, 3000px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            60% {\n                opacity: 1;\n                -webkit-transform: translate3d(0, -20px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, -20px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            75% {\n                -webkit-transform: translate3d(0, 10px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, 10px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            90% {\n                -webkit-transform: translate3d(0, -5px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, -5px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            to {\n                -webkit-transform: translate3d(0, 0, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, 0, 0) translate3d(-50%, -50%, 0);\n            }\n        }\n    \n        @keyframes " + ctx.ANIMATION.SHOW_COMPONENT + " {\n            from, 60%, 75%, 90%, to {\n                -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n                animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n            }\n    \n            from {\n                display: block;\n                opacity: 0;\n                -webkit-transform: translate3d(0, 3000px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, 3000px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            60% {\n                opacity: 1;\n                -webkit-transform: translate3d(0, -20px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, -20px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            75% {\n                -webkit-transform: translate3d(0, 10px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, 10px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            90% {\n                -webkit-transform: translate3d(0, -5px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, -5px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            to {\n                -webkit-transform: translate3d(0, 0, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, 0, 0) translate3d(-50%, -50%, 0);\n            }\n        }\n    \n        @-webkit-keyframes " + ctx.ANIMATION.HIDE_COMPONENT + " {\n            20% {\n                -webkit-transform: translate3d(0, 10px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, 10px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            40%, 45% {\n                opacity: 1;\n                -webkit-transform: translate3d(0, -20px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, -20px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            to {\n                opacity: 0;\n                -webkit-transform: translate3d(0, 2000px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, 2000px, 0) translate3d(-50%, -50%, 0);\n            }\n        }\n    \n        @keyframes " + ctx.ANIMATION.HIDE_COMPONENT + " {\n            20% {\n                -webkit-transform: translate3d(0, 10px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, 10px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            40%, 45% {\n                opacity: 1;\n                -webkit-transform: translate3d(0, -20px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, -20px, 0) translate3d(-50%, -50%, 0);\n            }\n    \n            to {\n                opacity: 0;\n                -webkit-transform: translate3d(0, 2000px, 0) translate3d(-50%, -50%, 0);\n                transform: translate3d(0, 2000px, 0) translate3d(-50%, -50%, 0);\n            }\n        }\n    \n        @-webkit-keyframes " + ctx.ANIMATION.SHOW_CONTAINER + " {\n            from {\n                opacity: 0;\n            }\n    \n            to {\n                opacity: 1;\n            }\n        }\n    \n        @keyframes " + ctx.ANIMATION.SHOW_CONTAINER + " {\n            from {\n                opacity: 0;\n            }\n    \n            to {\n                opacity: 1;\n            }\n        }\n    \n        @-webkit-keyframes " + ctx.ANIMATION.HIDE_CONTAINER + " {\n            from {\n                opacity: 1;\n            }\n    \n            50% {\n                opacity: 1;\n            }\n    \n            to {\n                opacity: 0;\n            }\n        }\n    \n        @keyframes " + ctx.ANIMATION.HIDE_CONTAINER + " {\n            from {\n                opacity: 1;\n            }\n    \n            50% {\n                opacity: 1;\n            }\n    \n            to {\n                opacity: 0;\n            }\n        }\n    \n    \n    \n        .paypal-spinner {\n            height: 30px;\n            width: 30px;\n            display: inline-block;\n            box-sizing: content-box;\n            opacity: 1;\n            filter: alpha(opacity=100);\n            -webkit-animation: rotation .7s infinite linear;\n            -moz-animation: rotation .7s infinite linear;\n            -o-animation: rotation .7s infinite linear;\n            animation: rotation .7s infinite linear;\n            border-left: 8px solid rgba(0, 0, 0, .2);\n            border-right: 8px solid rgba(0, 0, 0, .2);\n            border-bottom: 8px solid rgba(0, 0, 0, .2);\n            border-top: 8px solid #fff;\n            border-radius: 100%\n        }\n    \n        @-webkit-keyframes rotation {\n            from {\n                -webkit-transform: rotate(0deg)\n            }\n            to {\n                -webkit-transform: rotate(359deg)\n            }\n        }\n        @-moz-keyframes rotation {\n            from {\n                -moz-transform: rotate(0deg)\n            }\n            to {\n                -moz-transform: rotate(359deg)\n            }\n        }\n        @-o-keyframes rotation {\n            from {\n                -o-transform: rotate(0deg)\n            }\n            to {\n                -o-transform: rotate(359deg)\n            }\n        }\n        @keyframes rotation {\n            from {\n                transform: rotate(0deg)\n            }\n            to {\n                transform: rotate(359deg)\n            }\n        }\n    </style>\n    \n    <!--[if IE 9 ]>\n        <style>\n            #" + ctx.id + "." + ctx.CLASS.LIGHTBOX + " .paypal-checkout-lightbox-element {\n    \n                transform: none;\n                -ms-transform: none;\n    \n                transform: translateX(-50%) translateY(-50%);\n                -ms-transform:  translateX(-50%) translateY(-50%);\n            }\n        </style>\n    <![endif]-->\n\n";
            };
        },
        "./src/components/checkout/popupBridge.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _defineProperty(obj, key, value) {
                return key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            function ternary(condition, truthyResult, falsyResult) {
                return __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a.resolve(condition).then(function(result) {
                    return result ? truthyResult : falsyResult;
                });
            }
            function getPopupBridgeOpener() {
                var popupBridge = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.popupBridge;
                return popupBridge ? (popupBridge.opener = popupBridge.opener || function(url, callback) {
                    if (!popupBridge) throw new Error("Popup Bridge not available");
                    popupBridge.onComplete = callback, popupBridge.open(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.j)(url, {
                        redirect_uri: popupBridge.getReturnUrlPrefix()
                    }));
                }, popupBridge.opener) : window.xprops && window.xprops.popupBridge && window.xprops.popupBridge.open ? window.xprops.popupBridge.open : void 0;
            }
            function awaitPopupBridgeOpener() {
                return window.xprops && window.xprops.popupBridge ? window.xprops.popupBridge.awaitOpener().then(function(opener) {
                    return window.popupBridge = window.popupBridge || {}, window.popupBridge.opener = opener, 
                    opener;
                }) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.k)(window, "popupBridge").then(function(popupBridge) {
                    return getPopupBridgeOpener(popupBridge);
                });
            }
            function renderThroughPopupBridge(props, openBridge) {
                return __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a.try(function() {
                    if (!props.payment && !props.url) throw new Error("Expected props.payment or props.url to be passed");
                    if (!props.onAuthorize) throw new Error("Expected props.onAuthorize to be passed");
                    if (props.env && !__WEBPACK_IMPORTED_MODULE_5__config__.a.checkoutUrls[props.env]) throw new Error("Invalid props.env: " + props.env);
                    var env = props.env = props.env || __WEBPACK_IMPORTED_MODULE_5__config__.a.env, getPayment = "function" == typeof props.payment ? props.payment.bind({
                        props: props
                    }) : function() {
                        return props.payment;
                    }, payment = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_xcomponent_src_lib__.l)(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_xcomponent_src_lib__.I)(getPayment)), onAuthorize = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_xcomponent_src_lib__.n)(props.onAuthorize), onCancel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_xcomponent_src_lib__.n)(props.onCancel || __WEBPACK_IMPORTED_MODULE_0_xcomponent_src_lib__.r);
                    return ternary(props.url, props.url, payment().then(function(token) {
                        if (token) {
                            var _extendUrl;
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.j)(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.a)(env, token), (_extendUrl = {}, 
                            _defineProperty(_extendUrl, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.b)(token), token), 
                            _defineProperty(_extendUrl, "useraction", props.commit ? "commit" : ""), _defineProperty(_extendUrl, "native_xo", "1"), 
                            _extendUrl));
                        }
                    })).then(function(url) {
                        return new __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a(function(resolve, reject) {
                            openBridge(url, function(err, payload) {
                                if (err) return reject(err);
                                if (!payload) return reject(new Error("No payload passed in popupBridge.onComplete"));
                                var query = payload.queryItems, data = {
                                    paymentToken: query.token,
                                    billingToken: query.billingToken,
                                    paymentID: query.paymentId,
                                    payerID: query.payerID
                                }, actions = {
                                    close: function() {}
                                };
                                if ("payment" === query.opType) data.returnUrl = query.redirect_uri, actions.redirect = function() {
                                    var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window, redirectUrl = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : data.returnUrl;
                                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.f)(win, redirectUrl);
                                }, onAuthorize(data, actions), resolve(); else {
                                    if ("cancel" !== query.opType) return reject(new Error("Did not find opType in popup bridge returned query params"));
                                    data.cancelUrl = query.redirect_uri, actions.redirect = function() {
                                        var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window, redirectUrl = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : data.cancelUrl;
                                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.f)(win, redirectUrl);
                                    }, onCancel(data, actions), resolve();
                                }
                            });
                        });
                    });
                });
            }
            function setupPopupBridgeProxy(Checkout) {
                function doRender(props, original) {
                    var openBridge = getPopupBridgeOpener();
                    return openBridge ? renderThroughPopupBridge(props, openBridge).catch(function(err) {
                        return __WEBPACK_IMPORTED_MODULE_2_beaver_logger_client__.e("popup_bridge_error", {
                            err: err.stack || err.toString()
                        }), original();
                    }) : original();
                }
                var render = Checkout.render;
                Checkout.render = function(props) {
                    var _this = this, _arguments = arguments;
                    return doRender(props, function() {
                        return render.apply(_this, _arguments);
                    });
                };
                var renderTo = Checkout.renderTo;
                Checkout.renderTo = function(win, props) {
                    var _this2 = this, _arguments2 = arguments;
                    return doRender(props, function() {
                        return renderTo.apply(_this2, _arguments2);
                    });
                };
                var init = Checkout.init;
                Checkout.init = function(props) {
                    var instance = init.apply(this, arguments), _render = instance.render;
                    instance.render = function() {
                        var _this3 = this, _arguments3 = arguments;
                        return doRender(props, function() {
                            return _render.apply(_this3, _arguments3);
                        });
                    };
                    var _renderTo = instance.renderTo;
                    return instance.renderTo = function() {
                        var _this4 = this, _arguments4 = arguments;
                        return doRender(props, function() {
                            return _renderTo.apply(_this4, _arguments4);
                        });
                    }, instance;
                };
            }
            var __WEBPACK_IMPORTED_MODULE_0_xcomponent_src_lib__ = __webpack_require__("./node_modules/xcomponent/src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_2_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__("./src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__("./src/components/checkout/util.js"), __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__("./src/config/index.js");
            __webpack_exports__.a = getPopupBridgeOpener, __webpack_exports__.b = awaitPopupBridgeOpener, 
            __webpack_exports__.c = setupPopupBridgeProxy;
        },
        "./src/components/checkout/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function determineParameterFromToken(token) {
                return 0 === token.indexOf("BA-") ? "ba_token" : "token";
            }
            function determineUrlFromToken(env, token) {
                return 0 === token.indexOf("BA-") ? (__WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.c("url_billing"), 
                __WEBPACK_IMPORTED_MODULE_2__config__.a.billingUrls[env]) : 0 === token.indexOf("PAY-") ? (__WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.c("url_payment"), 
                __WEBPACK_IMPORTED_MODULE_2__config__.a.checkoutUrls[env]) : 0 === token.indexOf("EC-") ? (__WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.c("url_checkout"), 
                __WEBPACK_IMPORTED_MODULE_2__config__.a.checkoutUrls[env]) : (__WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.c("url_default"), 
                __WEBPACK_IMPORTED_MODULE_2__config__.a.checkoutUrls[env]);
            }
            var __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_2__config__ = (__webpack_require__("./src/lib/index.js"), 
            __webpack_require__("./src/config/index.js"));
            __webpack_exports__.b = determineParameterFromToken, __webpack_exports__.a = determineUrlFromToken;
        },
        "./src/components/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__button__ = __webpack_require__("./src/components/button/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_0__button__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_1__checkout__ = __webpack_require__("./src/components/checkout/index.js");
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_1__checkout__.a;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_1__checkout__.b;
            });
        },
        "./src/config/config.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _defineProperty(obj, key, value) {
                return key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./src/config/constants.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return config;
            });
            var _checkoutUris, _billingUris, _buttonUris, _postBridgeUris, _legacyCheckoutUris, _buttonJSUrls, config = {
                scriptUrl: "//www.paypalobjects.com/api/checkout.lib.js",
                legacyScriptUrl: "//www.paypalobjects.com/api/checkout.js",
                paypal_domain_regex: /^(https?|mock):\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/,
                version: "4.0.54",
                ppobjects: !1,
                cors: !0,
                env: __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION,
                state: "paypal_xcomponent",
                locale: {
                    country: "US",
                    lang: "en"
                },
                stage: "msmaster",
                logLevel: "info",
                buttonStyles: {
                    size: [ "tiny", "small", "medium", "large", "responsive" ],
                    label: [ "checkout", "credit" ]
                },
                throttles: {
                    v4_mobile_device: 1e3
                },
                customCountry: !1,
                SUPPORTED_AGENTS: {
                    Chrome: 27,
                    IE: 9,
                    MSIE: 9,
                    Firefox: 30,
                    Safari: 5.1,
                    Opera: 23
                },
                _apiStage: "",
                get apiStage() {
                    return config._apiStage || config.stage;
                },
                set apiStage(value) {
                    config._apiStage = value;
                },
                get paypalUrls() {
                    var _ref;
                    return _ref = {}, _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "http://localhost.paypal.com:8000"), 
                    _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "https://www." + config.stage + ".qa.paypal.com"), 
                    _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "https://www.sandbox.paypal.com"), 
                    _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "https://www.paypal.com"), 
                    _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, window.location.protocol + "//" + window.location.host), 
                    _ref;
                },
                get paypalDomains() {
                    var _ref2;
                    return _ref2 = {}, _defineProperty(_ref2, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "http://localhost.paypal.com:8000"), 
                    _defineProperty(_ref2, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "https://www." + config.stage + ".qa.paypal.com"), 
                    _defineProperty(_ref2, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "https://www.sandbox.paypal.com"), 
                    _defineProperty(_ref2, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "https://www.paypal.com"), 
                    _defineProperty(_ref2, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "mock://www.paypal.com"), 
                    _ref2;
                },
                get wwwApiUrls() {
                    var _ref3;
                    return _ref3 = {}, _defineProperty(_ref3, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "https://www." + config.stage + ".qa.paypal.com"), 
                    _defineProperty(_ref3, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "https://www." + config.stage + ".qa.paypal.com"), 
                    _defineProperty(_ref3, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "https://www.sandbox.paypal.com"), 
                    _defineProperty(_ref3, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "https://www.paypal.com"), 
                    _defineProperty(_ref3, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, window.location.protocol + "//" + window.location.host), 
                    _ref3;
                },
                get corsApiUrls() {
                    var _ref4;
                    return _ref4 = {}, _defineProperty(_ref4, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "https://" + config.apiStage + ".qa.paypal.com:11888"), 
                    _defineProperty(_ref4, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "https://" + config.apiStage + ".qa.paypal.com:11888"), 
                    _defineProperty(_ref4, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "https://cors.api.sandbox.paypal.com"), 
                    _defineProperty(_ref4, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "https://cors.api.paypal.com"), 
                    _defineProperty(_ref4, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, window.location.protocol + "//" + window.location.host), 
                    _ref4;
                },
                get apiUrls() {
                    var _ref5, domain = window.location.protocol + "//" + window.location.host, corsApiUrls = config.corsApiUrls, wwwApiUrls = config.wwwApiUrls;
                    return _ref5 = {}, _defineProperty(_ref5, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, domain === wwwApiUrls.local ? wwwApiUrls.local : corsApiUrls.local), 
                    _defineProperty(_ref5, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, domain === wwwApiUrls.stage ? wwwApiUrls.stage : corsApiUrls.stage), 
                    _defineProperty(_ref5, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, domain === wwwApiUrls.sandbox ? wwwApiUrls.sandbox : corsApiUrls.sandbox), 
                    _defineProperty(_ref5, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, domain === wwwApiUrls.production ? wwwApiUrls.production : corsApiUrls.production), 
                    _defineProperty(_ref5, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, domain === wwwApiUrls.test ? wwwApiUrls.test : corsApiUrls.test), 
                    _ref5;
                },
                checkoutUris: (_checkoutUris = {}, _defineProperty(_checkoutUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "/webapps/hermes?ul=0"), 
                _defineProperty(_checkoutUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "/webapps/hermes"), 
                _defineProperty(_checkoutUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "/checkoutnow"), 
                _defineProperty(_checkoutUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "/checkoutnow"), 
                _defineProperty(_checkoutUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "/base/test/windows/checkout/index.htm?checkouturl=true"), 
                _checkoutUris),
                billingUris: (_billingUris = {}, _defineProperty(_billingUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "/webapps/hermes/agreements?ul=0"), 
                _defineProperty(_billingUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "/webapps/hermes/agreements"), 
                _defineProperty(_billingUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "/agreements/approve"), 
                _defineProperty(_billingUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "/agreements/approve"), 
                _defineProperty(_billingUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "/base/test/windows/checkout/index.htm?billingurl=true"), 
                _billingUris),
                buttonUris: (_buttonUris = {}, _defineProperty(_buttonUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "/webapps/hermes/button"), 
                _defineProperty(_buttonUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "/webapps/hermes/button"), 
                _defineProperty(_buttonUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "/webapps/hermes/button"), 
                _defineProperty(_buttonUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "/webapps/hermes/button"), 
                _defineProperty(_buttonUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "/base/test/windows/button/index.htm"), 
                _buttonUris),
                postBridgeUris: (_postBridgeUris = {}, _defineProperty(_postBridgeUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "/webapps/hermes/component-meta"), 
                _defineProperty(_postBridgeUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "/webapps/hermes/component-meta"), 
                _defineProperty(_postBridgeUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "/webapps/hermes/component-meta"), 
                _defineProperty(_postBridgeUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "/webapps/hermes/component-meta"), 
                _defineProperty(_postBridgeUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "/base/test/windows/component-meta/index.htm"), 
                _postBridgeUris),
                legacyCheckoutUris: (_legacyCheckoutUris = {}, _defineProperty(_legacyCheckoutUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true"), 
                _defineProperty(_legacyCheckoutUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true"), 
                _defineProperty(_legacyCheckoutUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true"), 
                _defineProperty(_legacyCheckoutUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true"), 
                _defineProperty(_legacyCheckoutUris, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "#fallback"), 
                _legacyCheckoutUris),
                buttonJSUrls: (_buttonJSUrls = {}, _defineProperty(_buttonJSUrls, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "https://www.paypalobjects.com/api/button.js"), 
                _defineProperty(_buttonJSUrls, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "https://www.paypalobjects.com/api/button.js"), 
                _defineProperty(_buttonJSUrls, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "https://www.paypalobjects.com/api/button.js"), 
                _defineProperty(_buttonJSUrls, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "https://www.paypalobjects.com/api/button.js"), 
                _defineProperty(_buttonJSUrls, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "/base/test/lib/button.js"), 
                _buttonJSUrls),
                get buttonJSUrl() {
                    return config.buttonJSUrls[config.env];
                },
                loggerUri: "/webapps/hermes/api/logger",
                get postBridgeUri() {
                    return config.postBridgeUris[config.env] + "?xcomponent=1&version=" + (config.ppobjects ? "4" : "4.0.54");
                },
                paymentStandardUri: "/webapps/xorouter?cmd=_s-xclick",
                authApiUri: "/v1/oauth2/token",
                paymentApiUri: "/v1/payments/payment",
                billingApiUri: "/v1/billing-agreements/agreement-tokens",
                experienceApiUri: "/v1/payment-experience/web-profiles",
                get checkoutUrls() {
                    var _ref6, paypalUrls = config.paypalUrls;
                    return _ref6 = {}, _defineProperty(_ref6, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "" + paypalUrls.local + config.checkoutUris.local), 
                    _defineProperty(_ref6, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "" + paypalUrls.stage + config.checkoutUris.stage), 
                    _defineProperty(_ref6, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "" + paypalUrls.sandbox + config.checkoutUris.sandbox), 
                    _defineProperty(_ref6, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "" + paypalUrls.production + config.checkoutUris.production), 
                    _defineProperty(_ref6, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "" + paypalUrls.test + config.checkoutUris.test), 
                    _ref6;
                },
                get billingUrls() {
                    var _ref7, paypalUrls = config.paypalUrls;
                    return _ref7 = {}, _defineProperty(_ref7, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "" + paypalUrls.local + config.billingUris.local), 
                    _defineProperty(_ref7, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "" + paypalUrls.stage + config.billingUris.stage), 
                    _defineProperty(_ref7, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "" + paypalUrls.sandbox + config.billingUris.sandbox), 
                    _defineProperty(_ref7, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "" + paypalUrls.production + config.billingUris.production), 
                    _defineProperty(_ref7, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "" + paypalUrls.test + config.billingUris.test), 
                    _ref7;
                },
                get buttonUrls() {
                    var _ref8, paypalUrls = config.paypalUrls;
                    return _ref8 = {}, _defineProperty(_ref8, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "" + paypalUrls.local + config.buttonUris.local), 
                    _defineProperty(_ref8, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "" + paypalUrls.stage + config.buttonUris.stage), 
                    _defineProperty(_ref8, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "" + paypalUrls.sandbox + config.buttonUris.sandbox), 
                    _defineProperty(_ref8, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "" + paypalUrls.production + config.buttonUris.production), 
                    _defineProperty(_ref8, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "" + paypalUrls.test + config.buttonUris.test), 
                    _ref8;
                },
                get paymentsStandardUrls() {
                    var _ref9, paypalUrls = config.paypalUrls;
                    return _ref9 = {}, _defineProperty(_ref9, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "" + paypalUrls.local + config.paymentStandardUri), 
                    _defineProperty(_ref9, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "" + paypalUrls.stage + config.paymentStandardUri), 
                    _defineProperty(_ref9, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "" + paypalUrls.sandbox + config.paymentStandardUri), 
                    _defineProperty(_ref9, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "" + paypalUrls.production + config.paymentStandardUri), 
                    _defineProperty(_ref9, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "" + paypalUrls.test + config.paymentStandardUri), 
                    _ref9;
                },
                get postBridgeUrls() {
                    var _ref10, paypalUrls = config.paypalUrls;
                    return _ref10 = {}, _defineProperty(_ref10, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "" + paypalUrls.local + config.postBridgeUri + "&env=local"), 
                    _defineProperty(_ref10, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "" + paypalUrls.stage + config.postBridgeUri + "&env=stage&stage=" + config.stage), 
                    _defineProperty(_ref10, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "" + paypalUrls.sandbox + config.postBridgeUri + "&env=sandbox"), 
                    _defineProperty(_ref10, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "" + paypalUrls.production + config.postBridgeUri + "&env=production"), 
                    _defineProperty(_ref10, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "" + paypalUrls.test + config.postBridgeUri + "&env=test"), 
                    _ref10;
                },
                get legacyCheckoutUrls() {
                    var _ref11, paypalUrls = config.paypalUrls;
                    return _ref11 = {}, _defineProperty(_ref11, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "" + paypalUrls.stage + config.legacyCheckoutUris.local), 
                    _defineProperty(_ref11, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "" + paypalUrls.stage + config.legacyCheckoutUris.stage), 
                    _defineProperty(_ref11, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "" + paypalUrls.sandbox + config.legacyCheckoutUris.sandbox), 
                    _defineProperty(_ref11, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "" + paypalUrls.production + config.legacyCheckoutUris.production), 
                    _defineProperty(_ref11, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "" + paypalUrls.test + config.legacyCheckoutUris.test), 
                    _ref11;
                },
                get authApiUrls() {
                    var _ref12, apiUrls = config.apiUrls, authApiUri = config.authApiUri;
                    return _ref12 = {}, _defineProperty(_ref12, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "" + apiUrls.local + authApiUri), 
                    _defineProperty(_ref12, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "" + apiUrls.stage + authApiUri), 
                    _defineProperty(_ref12, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "" + apiUrls.sandbox + authApiUri), 
                    _defineProperty(_ref12, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "" + apiUrls.production + authApiUri), 
                    _defineProperty(_ref12, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "" + apiUrls.test + authApiUri), 
                    _ref12;
                },
                get paymentApiUrls() {
                    var _ref13, apiUrls = config.apiUrls, paymentApiUri = config.paymentApiUri;
                    return _ref13 = {}, _defineProperty(_ref13, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "" + apiUrls.local + paymentApiUri), 
                    _defineProperty(_ref13, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "" + apiUrls.stage + paymentApiUri), 
                    _defineProperty(_ref13, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "" + apiUrls.sandbox + paymentApiUri), 
                    _defineProperty(_ref13, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "" + apiUrls.production + paymentApiUri), 
                    _defineProperty(_ref13, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "" + apiUrls.test + paymentApiUri), 
                    _ref13;
                },
                get billingApiUrls() {
                    var _ref14, apiUrls = config.apiUrls, billingApiUri = config.billingApiUri;
                    return _ref14 = {}, _defineProperty(_ref14, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "" + apiUrls.local + billingApiUri), 
                    _defineProperty(_ref14, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "" + apiUrls.stage + billingApiUri), 
                    _defineProperty(_ref14, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "" + apiUrls.sandbox + billingApiUri), 
                    _defineProperty(_ref14, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "" + apiUrls.production + billingApiUri), 
                    _defineProperty(_ref14, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "" + apiUrls.test + billingApiUri), 
                    _ref14;
                },
                get experienceApiUrls() {
                    var _ref15, apiUrls = config.apiUrls, experienceApiUri = config.experienceApiUri;
                    return _ref15 = {}, _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_0__constants__.a.LOCAL, "" + apiUrls.local + experienceApiUri), 
                    _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_0__constants__.a.STAGE, "" + apiUrls.stage + experienceApiUri), 
                    _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SANDBOX, "" + apiUrls.sandbox + experienceApiUri), 
                    _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_0__constants__.a.PRODUCTION, "" + apiUrls.production + experienceApiUri), 
                    _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_0__constants__.a.TEST, "" + apiUrls.test + experienceApiUri), 
                    _ref15;
                },
                _paypalUrl: "",
                get paypalUrl() {
                    return this._paypalUrl || config.paypalUrls[config.env];
                },
                set paypalUrl(value) {
                    this._paypalUrl = value;
                },
                get paypalDomain() {
                    return config.paypalDomains[config.env];
                },
                get corsApiUrl() {
                    return config.corsApiUrls[config.env];
                },
                get wwwApiUrl() {
                    return config.wwwApiUrls[config.env];
                },
                get apiUrl() {
                    var domain = window.location.protocol + "//" + window.location.host, corsApiUrl = config.corsApiUrl, wwwApiUrl = config.wwwApiUrl;
                    return domain === wwwApiUrl ? wwwApiUrl : corsApiUrl;
                },
                get checkoutUrl() {
                    return "" + config.paypalUrl + config.checkoutUris[config.env];
                },
                get billingUrl() {
                    return "" + config.paypalUrl + config.billingUris[config.env];
                },
                get buttonUrl() {
                    return "" + config.paypalUrl + config.buttonUris[config.env];
                },
                get legacyCheckoutUrl() {
                    return config.legacyCheckoutUrls[config.env];
                },
                get postBridgeUrl() {
                    return "" + config.paypalUrl + config.postBridgeUri + "&env=" + config.env;
                },
                get postBridgeDomain() {
                    return "" + config.paypalDomain;
                },
                get loggerUrl() {
                    return "" + config.paypalUrl + config.loggerUri;
                },
                get authApiUrl() {
                    return "" + config.apiUrl + config.authApiUri;
                },
                get paymentApiUrl() {
                    return "" + config.apiUrl + config.paymentApiUri;
                },
                get billingApiUrl() {
                    return "" + config.apiUrl + config.billingApiUri;
                },
                get experienceApiUrl() {
                    return "" + config.apiUrl + config.experienceApiUri;
                },
                locales: {
                    AD: [ "zh", "es", "fr", "en" ],
                    AE: [ "ar", "zh", "es", "fr", "en" ],
                    AG: [ "zh", "es", "fr", "en" ],
                    AI: [ "zh", "es", "fr", "en" ],
                    AL: [ "en" ],
                    AM: [ "zh", "es", "fr", "en" ],
                    AN: [ "zh", "es", "fr", "en" ],
                    AO: [ "zh", "es", "fr", "en" ],
                    AR: [ "en", "es" ],
                    AT: [ "de", "en" ],
                    AU: [ "en" ],
                    AW: [ "zh", "es", "fr", "en" ],
                    AZ: [ "zh", "es", "fr", "en" ],
                    BA: [ "en" ],
                    BB: [ "zh", "es", "fr", "en" ],
                    BE: [ "nl", "fr", "en" ],
                    BF: [ "zh", "es", "en", "fr" ],
                    BG: [ "en" ],
                    BH: [ "zh", "es", "fr", "en", "ar" ],
                    BI: [ "zh", "es", "en", "fr" ],
                    BJ: [ "zh", "es", "en", "fr" ],
                    BM: [ "zh", "es", "fr", "en" ],
                    BN: [ "en" ],
                    BO: [ "zh", "fr", "en", "es" ],
                    BR: [ "pt", "en" ],
                    BS: [ "zh", "es", "fr", "en" ],
                    BT: [ "en" ],
                    BW: [ "zh", "es", "fr", "en" ],
                    BY: [ "en" ],
                    BZ: [ "zh", "fr", "en", "es" ],
                    C2: [ "zh", "en" ],
                    CA: [ "fr", "en" ],
                    CD: [ "zh", "es", "en", "fr" ],
                    CG: [ "zh", "es", "fr", "en" ],
                    CH: [ "fr", "en", "de" ],
                    CI: [ "en", "fr" ],
                    CK: [ "zh", "es", "fr", "en" ],
                    CL: [ "zh", "fr", "en", "es" ],
                    CM: [ "en", "fr" ],
                    CN: [ "zh" ],
                    CO: [ "zh", "fr", "en", "es" ],
                    CR: [ "zh", "fr", "en", "es" ],
                    CV: [ "zh", "es", "fr", "en" ],
                    CY: [ "en" ],
                    CZ: [ "zh", "fr", "es", "en" ],
                    DE: [ "en", "de" ],
                    DJ: [ "zh", "es", "en", "fr" ],
                    DK: [ "en", "da" ],
                    DM: [ "zh", "es", "fr", "en" ],
                    DO: [ "zh", "fr", "en", "es" ],
                    DZ: [ "zh", "es", "fr", "en", "ar" ],
                    EC: [ "zh", "fr", "en", "es" ],
                    EE: [ "zh", "ru", "fr", "es", "en" ],
                    EG: [ "zh", "es", "fr", "en", "ar" ],
                    ER: [ "zh", "es", "fr", "en" ],
                    ES: [ "es", "en" ],
                    ET: [ "zh", "es", "fr", "en" ],
                    FI: [ "zh", "fr", "es", "en" ],
                    FJ: [ "zh", "es", "fr", "en" ],
                    FK: [ "zh", "es", "fr", "en" ],
                    FM: [ "en" ],
                    FO: [ "zh", "es", "fr", "en", "da" ],
                    FR: [ "fr", "en" ],
                    GA: [ "zh", "es", "en", "fr" ],
                    GB: [ "fr", "en" ],
                    GD: [ "zh", "es", "fr", "en" ],
                    GE: [ "zh", "es", "fr", "en" ],
                    GF: [ "zh", "es", "fr", "en" ],
                    GI: [ "zh", "es", "fr", "en" ],
                    GL: [ "zh", "es", "fr", "en", "da" ],
                    GM: [ "zh", "es", "fr", "en" ],
                    GN: [ "zh", "es", "en", "fr" ],
                    GP: [ "zh", "es", "fr", "en" ],
                    GR: [ "zh", "fr", "es", "en" ],
                    GT: [ "zh", "fr", "en", "es" ],
                    GW: [ "zh", "es", "fr", "en" ],
                    GY: [ "zh", "es", "fr", "en" ],
                    HK: [ "zh", "en" ],
                    HN: [ "zh", "fr", "en", "es" ],
                    HR: [ "en" ],
                    HU: [ "zh", "fr", "es", "en" ],
                    ID: [ "id", "en" ],
                    IE: [ "zh", "fr", "es", "en" ],
                    IL: [ "he", "en" ],
                    IN: [ "en" ],
                    IS: [ "en" ],
                    IT: [ "it", "en" ],
                    JM: [ "zh", "fr", "en", "es" ],
                    JO: [ "zh", "es", "fr", "en", "ar" ],
                    JP: [ "ja", "en" ],
                    KE: [ "zh", "es", "fr", "en" ],
                    KG: [ "zh", "es", "fr", "en" ],
                    KH: [ "en" ],
                    KI: [ "zh", "es", "fr", "en" ],
                    KM: [ "zh", "es", "en", "fr" ],
                    KN: [ "zh", "es", "fr", "en" ],
                    KR: [ "ko", "en" ],
                    KW: [ "zh", "es", "fr", "en", "ar" ],
                    KY: [ "zh", "es", "fr", "en" ],
                    KZ: [ "zh", "es", "fr", "en" ],
                    LA: [ "en" ],
                    LC: [ "zh", "es", "fr", "en" ],
                    LI: [ "zh", "es", "fr", "en" ],
                    LK: [ "en" ],
                    LS: [ "zh", "es", "fr", "en" ],
                    LT: [ "zh", "ru", "fr", "es", "en" ],
                    LU: [ "zh", "fr", "es", "en", "de" ],
                    LV: [ "zh", "ru", "fr", "es", "en" ],
                    MA: [ "zh", "es", "fr", "en", "ar" ],
                    MC: [ "en", "fr" ],
                    MD: [ "en" ],
                    ME: [ "en" ],
                    MG: [ "zh", "es", "fr", "en" ],
                    MH: [ "zh", "es", "fr", "en" ],
                    MK: [ "en" ],
                    ML: [ "zh", "es", "en", "fr" ],
                    MN: [ "en" ],
                    MQ: [ "zh", "es", "fr", "en" ],
                    MR: [ "zh", "es", "fr", "en" ],
                    MS: [ "zh", "es", "fr", "en" ],
                    MT: [ "en" ],
                    MU: [ "zh", "es", "fr", "en" ],
                    MV: [ "en" ],
                    MW: [ "zh", "es", "fr", "en" ],
                    MX: [ "es", "en" ],
                    MY: [ "en" ],
                    MZ: [ "zh", "es", "fr", "en" ],
                    NA: [ "zh", "es", "fr", "en" ],
                    NC: [ "zh", "es", "fr", "en" ],
                    NE: [ "zh", "es", "en", "fr" ],
                    NF: [ "zh", "es", "fr", "en" ],
                    NG: [ "en" ],
                    NI: [ "zh", "fr", "en", "es" ],
                    NL: [ "nl", "en" ],
                    NO: [ "no", "en" ],
                    NP: [ "en" ],
                    NR: [ "zh", "es", "fr", "en" ],
                    NU: [ "zh", "es", "fr", "en" ],
                    NZ: [ "zh", "fr", "es", "en" ],
                    OM: [ "zh", "es", "fr", "en", "ar" ],
                    PA: [ "zh", "fr", "en", "es" ],
                    PE: [ "zh", "fr", "en", "es" ],
                    PF: [ "zh", "es", "fr", "en" ],
                    PG: [ "zh", "es", "fr", "en" ],
                    PH: [ "en" ],
                    PL: [ "pl", "en" ],
                    PM: [ "zh", "es", "fr", "en" ],
                    PN: [ "zh", "es", "fr", "en" ],
                    PT: [ "pt", "en" ],
                    PW: [ "zh", "es", "fr", "en" ],
                    PY: [ "en", "es" ],
                    QA: [ "ar", "zh", "es", "fr", "en" ],
                    RE: [ "zh", "es", "fr", "en" ],
                    RO: [ "zh", "fr", "es", "en" ],
                    RS: [ "zh", "es", "fr", "en" ],
                    RU: [ "ru", "en" ],
                    RW: [ "zh", "es", "en", "fr" ],
                    SA: [ "zh", "es", "fr", "en", "ar" ],
                    SB: [ "zh", "es", "fr", "en" ],
                    SC: [ "zh", "es", "en", "fr" ],
                    SE: [ "sv", "en" ],
                    SG: [ "en" ],
                    SH: [ "zh", "es", "fr", "en" ],
                    SI: [ "zh", "fr", "es", "en" ],
                    SJ: [ "zh", "es", "fr", "en" ],
                    SK: [ "zh", "fr", "es", "en" ],
                    SL: [ "zh", "es", "fr", "en" ],
                    SM: [ "zh", "es", "fr", "en" ],
                    SN: [ "zh", "es", "en", "fr" ],
                    SO: [ "zh", "es", "fr", "en" ],
                    SR: [ "zh", "es", "fr", "en" ],
                    ST: [ "zh", "es", "fr", "en" ],
                    SV: [ "zh", "fr", "en", "es" ],
                    SZ: [ "zh", "es", "fr", "en" ],
                    TC: [ "zh", "es", "fr", "en" ],
                    TD: [ "zh", "es", "en", "fr" ],
                    TG: [ "zh", "es", "en", "fr" ],
                    TH: [ "th", "en" ],
                    TJ: [ "zh", "es", "fr", "en" ],
                    TM: [ "zh", "es", "fr", "en" ],
                    TN: [ "zh", "es", "fr", "en", "ar" ],
                    TO: [ "en" ],
                    TR: [ "tr", "en" ],
                    TT: [ "zh", "es", "fr", "en" ],
                    TV: [ "zh", "es", "fr", "en" ],
                    TW: [ "zh", "en" ],
                    TZ: [ "zh", "es", "fr", "en" ],
                    UA: [ "zh", "ru", "fr", "es", "en" ],
                    UG: [ "zh", "es", "fr", "en" ],
                    US: [ "zh", "fr", "es", "en" ],
                    UY: [ "zh", "fr", "en", "es" ],
                    VA: [ "zh", "es", "fr", "en" ],
                    VC: [ "zh", "es", "fr", "en" ],
                    VE: [ "zh", "fr", "en", "es" ],
                    VG: [ "zh", "es", "fr", "en" ],
                    VN: [ "en" ],
                    VU: [ "zh", "es", "fr", "en" ],
                    WF: [ "zh", "es", "fr", "en" ],
                    WS: [ "en" ],
                    YE: [ "zh", "es", "fr", "en", "ar" ],
                    YT: [ "zh", "es", "fr", "en" ],
                    ZA: [ "zh", "es", "fr", "en" ],
                    ZM: [ "zh", "es", "fr", "en" ],
                    ZW: [ "en" ]
                }
            };
        },
        "./src/config/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return ENV;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return USERS;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return LOG_LEVEL;
            });
            var ENV = {
                LOCAL: "local",
                STAGE: "stage",
                SANDBOX: "sandbox",
                PRODUCTION: "production",
                TEST: "test"
            }, USERS = {
                ALL: "all",
                REMEMBERED: "remembered"
            }, LOG_LEVEL = {
                DEBUG: "debug",
                INFO: "info",
                WARN: "warn",
                ERROR: "error"
            };
        },
        "./src/config/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./src/config/config.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_0__config__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/config/constants.js");
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.a;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.b;
            }), __webpack_require__.d(__webpack_exports__, "d", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.c;
            });
        },
        "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__("./src/interface.js");
            __webpack_require__.d(__webpack_exports__, "postRobot", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.postRobot;
            }), __webpack_require__.d(__webpack_exports__, "PopupOpenError", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.PopupOpenError;
            }), __webpack_require__.d(__webpack_exports__, "Promise", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.Promise;
            }), __webpack_require__.d(__webpack_exports__, "rest", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.rest;
            }), __webpack_require__.d(__webpack_exports__, "Button", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.Button;
            }), __webpack_require__.d(__webpack_exports__, "checkout", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.checkout;
            }), __webpack_require__.d(__webpack_exports__, "apps", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.apps;
            }), __webpack_require__.d(__webpack_exports__, "setup", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.setup;
            }), __webpack_require__.d(__webpack_exports__, "config", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.config;
            }), __webpack_require__.d(__webpack_exports__, "ENV", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.ENV;
            }), __webpack_require__.d(__webpack_exports__, "USERS", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.USERS;
            }), __webpack_require__.d(__webpack_exports__, "request", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.request;
            }), __webpack_require__.d(__webpack_exports__, "isEligible", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.isEligible;
            }), __webpack_require__.d(__webpack_exports__, "isWebView", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.isWebView;
            }), __webpack_require__.d(__webpack_exports__, "onPossiblyUnhandledException", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.onPossiblyUnhandledException;
            }), __webpack_require__.d(__webpack_exports__, "version", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.version;
            }), __webpack_require__.d(__webpack_exports__, "Checkout", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.Checkout;
            }), __webpack_require__.d(__webpack_exports__, "PayPalCheckout", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.PayPalCheckout;
            }), __webpack_require__.d(__webpack_exports__, "destroyAll", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.destroyAll;
            }), __webpack_exports__.default = __WEBPACK_IMPORTED_MODULE_0__interface__;
        },
        "./src/interface.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_1_xcomponent_src__ = __webpack_require__("./node_modules/xcomponent/src/index.js");
            __webpack_require__.d(__webpack_exports__, "PopupOpenError", function() {
                return __WEBPACK_IMPORTED_MODULE_1_xcomponent_src__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js");
            __webpack_require__.d(__webpack_exports__, "Promise", function() {
                return __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__("./src/api/index.js");
            __webpack_require__.d(__webpack_exports__, "rest", function() {
                return __WEBPACK_IMPORTED_MODULE_3__api__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_4__components__ = __webpack_require__("./src/components/index.js");
            __webpack_require__.d(__webpack_exports__, "Button", function() {
                return __WEBPACK_IMPORTED_MODULE_4__components__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_5__legacy__ = __webpack_require__("./src/legacy/index.js");
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__legacy__, "checkout") && __webpack_require__.d(__webpack_exports__, "checkout", function() {
                return __WEBPACK_IMPORTED_MODULE_5__legacy__.checkout;
            }), __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__legacy__, "apps") && __webpack_require__.d(__webpack_exports__, "apps", function() {
                return __WEBPACK_IMPORTED_MODULE_5__legacy__.apps;
            });
            var __WEBPACK_IMPORTED_MODULE_6__setup__ = __webpack_require__("./src/setup.js");
            __webpack_require__.d(__webpack_exports__, "setup", function() {
                return __WEBPACK_IMPORTED_MODULE_6__setup__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_7__config__ = __webpack_require__("./src/config/index.js");
            __webpack_require__.d(__webpack_exports__, "config", function() {
                return __WEBPACK_IMPORTED_MODULE_7__config__.a;
            }), __webpack_require__.d(__webpack_exports__, "ENV", function() {
                return __WEBPACK_IMPORTED_MODULE_7__config__.b;
            }), __webpack_require__.d(__webpack_exports__, "USERS", function() {
                return __WEBPACK_IMPORTED_MODULE_7__config__.c;
            });
            var __WEBPACK_IMPORTED_MODULE_8__lib__ = __webpack_require__("./src/lib/index.js");
            __webpack_require__.d(__webpack_exports__, "request", function() {
                return __WEBPACK_IMPORTED_MODULE_8__lib__.a;
            }), __webpack_require__.d(__webpack_exports__, "isEligible", function() {
                return __WEBPACK_IMPORTED_MODULE_8__lib__.b;
            }), __webpack_require__.d(__webpack_exports__, "isWebView", function() {
                return __WEBPACK_IMPORTED_MODULE_8__lib__.c;
            }), __webpack_require__.d(__webpack_exports__, "postRobot", function() {
                return postRobot;
            }), __webpack_require__.d(__webpack_exports__, "onPossiblyUnhandledException", function() {
                return onPossiblyUnhandledException;
            }), __webpack_require__.d(__webpack_exports__, "version", function() {
                return version;
            }), __webpack_require__.d(__webpack_exports__, "Checkout", function() {
                return Checkout;
            }), __webpack_require__.d(__webpack_exports__, "PayPalCheckout", function() {
                return PayPalCheckout;
            }), __webpack_require__.d(__webpack_exports__, "destroyAll", function() {
                return destroyAll;
            });
            var postRobot = __WEBPACK_IMPORTED_MODULE_0_post_robot_src__, onPossiblyUnhandledException = __WEBPACK_IMPORTED_MODULE_2_sync_browser_mocks_src_promise__.a.onPossiblyUnhandledException, version = "4.0.54", Checkout = void 0, PayPalCheckout = void 0, destroyAll = void 0;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__lib__.d)() && (Checkout = __WEBPACK_IMPORTED_MODULE_4__components__.b, 
            PayPalCheckout = __WEBPACK_IMPORTED_MODULE_4__components__.b, destroyAll = __WEBPACK_IMPORTED_MODULE_1_xcomponent_src__.b);
        },
        "./src/legacy/button.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function renderButton(id, container, options, label) {
                if (options.locale) {
                    var _normalizeLocale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__common__.a)(options.locale), country = _normalizeLocale.country, lang = _normalizeLocale.lang;
                    options.locale = lang + "_" + country;
                }
                var lc = options.locale || __WEBPACK_IMPORTED_MODULE_2__config__.a.locale.lang + "_" + __WEBPACK_IMPORTED_MODULE_2__config__.a.locale.country, color = options.color || "gold", shape = options.shape || "pill", size = options.size || "small";
                label = label || "checkout", $logger.debug("render_button_lc_" + lc), $logger.debug("render_button_color_" + color), 
                $logger.debug("render_button_shape_" + shape), $logger.debug("render_button_size_" + size), 
                $logger.debug("render_button_label_" + label);
                var el = window.paypal.button.create(id, {
                    lc: lc,
                    color: color,
                    shape: shape,
                    size: size
                }, {
                    type: "button",
                    label: label
                }).el;
                container.appendChild(el);
                try {
                    var visible = Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
                    $logger.info("in_page_button_" + (visible ? "visible" : "not_visible"));
                } catch (err) {}
                return el.childNodes[0];
            }
            function renderButtons(id, options) {
                return loadButtonJS().then(function() {
                    var buttons = [];
                    if (options.buttons instanceof Array) {
                        if (options.container) for (var _iterator = options.buttons, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if (_i = _iterator.next(), _i.done) break;
                                _ref = _i.value;
                            }
                            var button = _ref;
                            button.container && button.container !== options.container && $logger.warn("mismatched_container_and_button_passed", {
                                options: options.container,
                                button: button.container
                            });
                        }
                        _loop2: for (var _iterator2 = options.buttons, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                            var _ref2, _ret = function() {
                                if (_isArray2) {
                                    if (_i2 >= _iterator2.length) return "break";
                                    _ref2 = _iterator2[_i2++];
                                } else {
                                    if (_i2 = _iterator2.next(), _i2.done) return "break";
                                    _ref2 = _i2.value;
                                }
                                var button = _ref2;
                                if (button) if (button.click = button.click || options.click, button.condition = button.condition || options.condition, 
                                button.button) {
                                    var buttonEl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.B)(button.button);
                                    if (!buttonEl) return $logger.warn("button_custom_element_not_found", {
                                        button: button.button
                                    }), "continue";
                                    buttons.push({
                                        container: buttonEl,
                                        button: buttonEl,
                                        click: button.click,
                                        condition: button.condition
                                    });
                                } else if (button.container && 0 !== button.container.length) {
                                    var buttonContainerElements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.x)(button.container);
                                    buttonContainerElements.length ? buttonContainerElements.forEach(function(container) {
                                        container.tagName && "a" === container.tagName.toLowerCase() && $logger.warn("container_a_tag");
                                        var buttonEl = renderButton(id, container, button, button.type);
                                        buttons.push({
                                            container: container,
                                            button: buttonEl,
                                            click: button.click,
                                            condition: button.condition
                                        });
                                    }) : $logger.warn("button_container_not_found", {
                                        container: JSON.stringify(button.container)
                                    });
                                } else $logger.warn("button_container_not_passed", {
                                    button: JSON.stringify(button)
                                });
                            }();
                            switch (_ret) {
                              case "break":
                                break _loop2;

                              case "continue":
                                continue;
                            }
                        }
                    } else if (options.container && 0 !== options.container.length) {
                        var labels = void 0;
                        labels = "string" == typeof options.type ? [ options.type ] : options.type instanceof Array ? options.type : [];
                        var containerElements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.x)(options.container);
                        containerElements.length ? containerElements.forEach(function(container, i) {
                            container.tagName && "a" === container.tagName.toLowerCase() && $logger.warn("container_a_tag");
                            var buttonEl = renderButton(id, container, options, labels[i]);
                            buttons.push({
                                container: container,
                                button: buttonEl,
                                click: options.click,
                                condition: options.condition
                            });
                        }) : $logger.warn("button_container_not_found", {
                            container: JSON.stringify(options.container)
                        });
                    }
                    return buttons;
                });
            }
            function getHijackTargetElement(button) {
                var form = button.form;
                if (form) return $logger.debug("target_element_button_form"), form;
                var tagName = button.tagName && button.tagName.toLowerCase();
                if ("a" === tagName) return $logger.debug("target_element_link"), button;
                var parentElement = button.parentElement, parentTagName = parentElement && parentElement.tagName && parentElement.tagName.toLowerCase();
                if (("img" === tagName || "button" === tagName) && "a" === parentTagName) return $logger.debug("target_element_parent_link"), 
                parentElement;
                var grandparentElement = parentElement && parentElement.parentElement, grandparentTagName = grandparentElement && grandparentElement.tagName && grandparentElement.tagName.toLowerCase();
                return "button" === tagName && "a" === grandparentTagName ? ($logger.debug("target_element_grandparent_link"), 
                button.parentElement && button.parentElement.parentElement) : void 0;
            }
            var __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_2__config__ = (__webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), 
            __webpack_require__("./src/config/index.js")), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__("./src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__("./src/legacy/constants.js"), __WEBPACK_IMPORTED_MODULE_5__common__ = __webpack_require__("./src/legacy/common.js");
            __webpack_exports__.b = renderButtons, __webpack_exports__.a = getHijackTargetElement;
            var $logger = __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.k(__WEBPACK_IMPORTED_MODULE_4__constants__.a), loadButtonJS = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.z)(function() {
                return $logger.debug("buttonjs_load"), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.A)(__WEBPACK_IMPORTED_MODULE_2__config__.a.buttonJSUrl).catch(function(err) {
                    return $logger.info("buttonjs_load_error_retry", {
                        error: err.stack || err.toString()
                    }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.A)(__WEBPACK_IMPORTED_MODULE_2__config__.a.buttonJSUrl);
                }).then(function(result) {
                    return $logger.debug("buttonjs_load_success"), result;
                }).catch(function(err) {
                    throw $logger.error("buttonjs_load_error", {
                        error: err.stack || err.toString()
                    }), err;
                });
            });
        },
        "./src/legacy/common.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function normalizeLocale(locale) {
                var _locale$split = locale.split("_"), _locale$split2 = _slicedToArray(_locale$split, 2), lang = _locale$split2[0], country = _locale$split2[1];
                return country || (__WEBPACK_IMPORTED_MODULE_1__config__.a.locales[lang] ? (country = lang, 
                lang = null) : country = DEFAULT_COUNTRY), __WEBPACK_IMPORTED_MODULE_1__config__.a.locales[country] || ($logger.warn("invalid_user_country", {
                    country: country
                }), country = DEFAULT_COUNTRY), lang || (lang = DEFAULT_LANG), __WEBPACK_IMPORTED_MODULE_1__config__.a.locales[country].indexOf(lang) === -1 && ($logger.warn("invalid_user_lang", {
                    lang: lang
                }), lang = __WEBPACK_IMPORTED_MODULE_1__config__.a.locales[country].indexOf(DEFAULT_LANG) !== -1 ? DEFAULT_LANG : __WEBPACK_IMPORTED_MODULE_1__config__.a.locales[country][0]), 
                {
                    country: country,
                    lang: lang
                };
            }
            var __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__("./src/config/index.js"), __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__("./src/legacy/constants.js");
            __webpack_exports__.a = normalizeLocale;
            var _slicedToArray = function() {
                function sliceIterator(arr, i) {
                    var _arr = [], _n = !0, _d = !1, _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                        !i || _arr.length !== i); _n = !0) ;
                    } catch (err) {
                        _d = !0, _e = err;
                    } finally {
                        try {
                            !_n && _i.return && _i.return();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function(arr, i) {
                    if (Array.isArray(arr)) return arr;
                    if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
            }(), $logger = __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.k(__WEBPACK_IMPORTED_MODULE_2__constants__.a), DEFAULT_COUNTRY = "US", DEFAULT_LANG = "en";
        },
        "./src/legacy/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return LOG_PREFIX;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return ATTRIBUTES;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return CLASSES;
            });
            var LOG_PREFIX = "paypal_legacy", ATTRIBUTES = {
                BUTTON: "data-paypal-button",
                MERCHANT_ID: "data-paypal-id",
                ENV: "data-env",
                SANDBOX: "data-sandbox"
            }, CLASSES = {
                HIDDEN_BUTTON: "paypal-button-hidden"
            };
        },
        "./src/legacy/eligibility.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isUnsupportedIE() {
                return Boolean(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.C)().match(/MSIE (5|6|7|8)\./i));
            }
            function isLegacyEligible() {
                var currentAgent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.E)();
                return !("object" === (void 0 === currentAgent ? "undefined" : _typeof(currentAgent)) && 2 === currentAgent.length && parseFloat(currentAgent[1]) < __WEBPACK_IMPORTED_MODULE_0__config__.a.SUPPORTED_AGENTS[currentAgent[0]]) && (!(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.c)() || isUnsupportedIE() || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.y)()) && (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.g)() || (throttle.logStart(), 
                throttle.isEnabled())));
            }
            var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./src/config/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_2__listener__ = __webpack_require__("./src/legacy/listener.js");
            __webpack_exports__.a = isLegacyEligible;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, throttle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.D)("v4_mobile_device", __WEBPACK_IMPORTED_MODULE_0__config__.a.throttles.v4_mobile_device);
            !function() {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.g)()) {
                    __WEBPACK_IMPORTED_MODULE_2__listener__.a.once(function(token) {
                        throttle.log("authorize", {
                            fltk: token
                        });
                    });
                    var token = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.F)();
                    token && throttle.logComplete({
                        fltk: token
                    });
                }
            }();
        },
        "./src/legacy/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_2__interface__ = (__webpack_require__("./src/legacy/button.js"), 
            __webpack_require__("./src/legacy/constants.js"), __webpack_require__("./src/legacy/interface.js"));
            __webpack_require__.d(__webpack_exports__, "checkout", function() {
                return __WEBPACK_IMPORTED_MODULE_2__interface__.a;
            }), __webpack_require__.d(__webpack_exports__, "apps", function() {
                return __WEBPACK_IMPORTED_MODULE_2__interface__.b;
            });
            __webpack_require__("./src/legacy/ready.js");
        },
        "./src/legacy/interface.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function reset() {
                $logger.debug("reset"), checkout.initXO = initXO, checkout.startFlow = startFlow, 
                checkout.closeFlow = closeFlow;
            }
            function matchUrlAndPaymentToken(item) {
                if (!item || !item.trim()) throw $logger.error("startflow_no_url_or_token", {
                    item: item
                }), new Error("startflow_no_url_or_token");
                var paymentToken = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util__.a)(item), url = paymentToken && item === paymentToken ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.j)(__WEBPACK_IMPORTED_MODULE_4__config__.a.checkoutUrl, {
                    token: paymentToken
                }) : item;
                return url && !url.match(/^https?:\/\/|^\//) && ($logger.warn("startflow_relative_url", {
                    url: url
                }), 0 === url.toLowerCase().indexOf("ec-") && paymentToken && (url = "" + __WEBPACK_IMPORTED_MODULE_4__config__.a.checkoutUrl + url)), 
                url && paymentToken ? url.indexOf(".paypal.com") !== -1 ? $logger.debug("startflow_paypalurl_with_token", {
                    item: item
                }) : $logger.debug("startflow_url_with_token", {
                    item: item
                }) : url ? $logger.debug("startflow_url_with_no_token", {
                    item: item
                }) : paymentToken && $logger.debug("startflow_with_token", {
                    item: item
                }), {
                    paymentToken: paymentToken,
                    url: url
                };
            }
            function checkUrlAgainstEnv(url) {
                for (var paypalUrls = __WEBPACK_IMPORTED_MODULE_4__config__.a.paypalUrls, _iterator = Object.keys(paypalUrls), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var env = _ref, paypalUrl = paypalUrls[env];
                    if (env !== __WEBPACK_IMPORTED_MODULE_4__config__.b.TEST && (env !== __WEBPACK_IMPORTED_MODULE_4__config__.a.env && (0 === url.indexOf(paypalUrl) || 0 === url.indexOf(paypalUrl.replace("//www.", "//"))))) throw $logger.warn("mismatched_env_startflow_url", {
                        env: __WEBPACK_IMPORTED_MODULE_4__config__.a.env,
                        url: url
                    }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util__.b)(url), new Error(url + " is not a " + __WEBPACK_IMPORTED_MODULE_4__config__.a.env + " url");
                }
            }
            function awaitPaymentTokenAndUrl() {
                var paymentTokenAndUrl = new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(function(resolve, reject) {
                    checkout.initXO = function() {
                        $logger.warn("gettoken_initxo");
                    }, checkout.startFlow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.t)(function(item, opts) {
                        $logger.debug("gettoken_startflow", {
                            item: item
                        });
                        var _matchUrlAndPaymentTo = matchUrlAndPaymentToken(item), url = _matchUrlAndPaymentTo.url, paymentToken = _matchUrlAndPaymentTo.paymentToken;
                        return checkUrlAgainstEnv(url), resolve({
                            url: url,
                            paymentToken: paymentToken
                        });
                    });
                });
                return {
                    url: paymentTokenAndUrl.then(function(result) {
                        return result.url;
                    }),
                    paymentToken: paymentTokenAndUrl.then(function(result) {
                        return result.paymentToken;
                    })
                };
            }
            function initPayPalCheckout() {
                var props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                $logger.info("init_checkout"), paypalCheckoutInited && $logger.warn("multiple_init_paypal_checkout"), 
                closeFlowCalled && $logger.debug("init_after_closeflow"), paypalCheckoutInited = !0, 
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.u)("flow_start");
                var paypalCheckout = __WEBPACK_IMPORTED_MODULE_2__components__.b.init(_extends({
                    uid: window.pp_uid,
                    onAuthorize: function(data, actions) {
                        return $logger.info("payment_authorized"), __WEBPACK_IMPORTED_MODULE_11__listener__.a.trigger(data.paymentToken), 
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util__.c)(data.returnUrl), actions.redirect(window);
                    },
                    onCancel: function(data, actions) {
                        return $logger.info("payment_canceled"), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util__.c)(data.cancelUrl), 
                        actions.redirect(window);
                    },
                    fallback: function(url) {
                        return $logger.error("fallback_handler", {
                            url: url
                        }), this.destroy(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util__.b)(url);
                    }
                }, props));
                return checkout.closeFlow = function(closeUrl) {
                    if ($logger.warn("closeflow"), closeFlowCalled = !0, reset(), paypalCheckout.destroy(), 
                    closeUrl) return $logger.warn("closeflow_with_url", {
                        closeUrl: closeUrl
                    }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util__.b)(closeUrl);
                }, paypalCheckout;
            }
            function renderPayPalCheckout() {
                var props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, hijackTarget = arguments[1], urlProp = __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.resolve(props.url), paymentToken = new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(function(resolve) {
                    props.init = function(data) {
                        resolve(data.paymentToken);
                    };
                }), errorHandler = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.t)(function(err) {
                    $logger.error("component_error", {
                        error: err.stack || err.toString()
                    }), hijackTarget && ($logger.warn("render_error_hijack_revert_target"), hijackTarget.removeAttribute("target")), 
                    urlProp.then(function(url) {
                        return $logger.warn("render_error_redirect_using_url"), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util__.b)(url);
                    }), paymentToken.then(function(token) {
                        return __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.d("render_error_redirect_using_token"), 
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util__.b)(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.j)(__WEBPACK_IMPORTED_MODULE_4__config__.a.checkoutUrl, {
                            token: token
                        }));
                    });
                });
                props.onError = errorHandler;
                var paypalCheckout = void 0;
                hijackTarget ? (delete props.url, paypalCheckout = initPayPalCheckout(props), paypalCheckout.hijack(hijackTarget), 
                paypalCheckout.runTimeout(), urlProp.then(function(url) {
                    $logger.warn("hijack_then_url_passed"), paypalCheckout.loadUrl(url);
                })) : paypalCheckout = initPayPalCheckout(props);
                var render = paypalCheckout.render(null, !hijackTarget);
                return checkout.win = paypalCheckout.window, render.catch(errorHandler);
            }
            function handleClick(clickHandler, event) {
                $logger.debug("button_click_handler");
                try {
                    clickHandler.call(null, event);
                } catch (err) {
                    $logger.error("click_handler_error", {
                        error: err.stack || err.toString()
                    });
                }
            }
            function handleClickHijack(element) {
                var targetElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__button__.a)(element);
                if (!targetElement) return $logger.error("target_element_not_found");
                $logger.info("init_paypal_checkout_hijack");
                var _awaitPaymentTokenAnd = awaitPaymentTokenAndUrl(), url = _awaitPaymentTokenAnd.url, paymentToken = _awaitPaymentTokenAnd.paymentToken, token = void 0;
                paymentToken.then(function(result) {
                    token = result;
                }), renderPayPalCheckout({
                    url: url,
                    payment: function() {
                        return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.resolve(token);
                    }
                }, targetElement);
            }
            function listenClick(container, button, clickHandler, condition) {
                var element = "a" === container.tagName.toLowerCase() ? container : button;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.u)("flow_listenclick");
                var isClick = clickHandler instanceof Function;
                if (element.hasAttribute("data-paypal-click-listener")) return $logger.warn("button_already_has_paypal_click_listener");
                element.setAttribute("data-paypal-click-listener", ""), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__button__.a)(element) && isClick && $logger.info("button_link_or_form"), 
                element.addEventListener("click", function(event) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.u)("flow_buttonclick");
                    var eligible = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__eligibility__.a)();
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.v)() ? ($logger.debug("click_popups_supported"), 
                    eligible || $logger.debug("click_popups_supported_but_ineligible")) : ($logger.debug("click_popups_not_supported"), 
                    eligible && $logger.debug("click_popups_not_supported_but_eligible")), !isClick && !eligible) return $logger.debug("ineligible_listenclick");
                    if ($logger.info("button_click"), condition instanceof Function) {
                        if (!condition.call()) return $logger.info("button_click_condition_disabled");
                        $logger.info("button_click_condition_enabled");
                    }
                    return isClick ? handleClick(clickHandler, event) : handleClickHijack(element);
                });
            }
            function setup(id) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.u)("flow_setup"), id = id || "merchant", 
                $logger.info("setup", {
                    id: id,
                    env: options.environment,
                    options: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.w)(options)
                }), setupCalled && $logger.debug("setup_called_multiple_times"), setupCalled = !0, 
                options.environment && ("live" === options.environment && (options.environment = __WEBPACK_IMPORTED_MODULE_4__config__.b.PRODUCTION), 
                __WEBPACK_IMPORTED_MODULE_4__config__.a.paypalUrls[options.environment] ? __WEBPACK_IMPORTED_MODULE_4__config__.a.env = options.environment : (options.environment = __WEBPACK_IMPORTED_MODULE_4__config__.a.env, 
                $logger.warn("invalid_env", {
                    badenv: options.environment
                }))), options.locale && (__WEBPACK_IMPORTED_MODULE_4__config__.a.locale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__common__.a)(options.locale), 
                __WEBPACK_IMPORTED_MODULE_4__config__.a.customCountry = !0), options.buttons && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.x)(options.buttons).length && (options.button = options.buttons, 
                delete options.buttons), options.button && 0 !== options.button.length) {
                    options.container && ($logger.warn("button_and_container_passed", {
                        button: options.button,
                        container: options.container
                    }), Array.isArray(options.button) ? options.button = options.button.concat(options.container) : options.button = [ options.button ].concat(options.container), 
                    delete options.container);
                    var buttonElements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.x)(options.button);
                    buttonElements.length ? buttonElements.forEach(function(el) {
                        $logger.info("listen_click_custom_button"), listenClick(el, el, options.click, options.condition);
                    }) : $logger.warn("button_element_not_found", {
                        element: JSON.stringify(options.button)
                    });
                }
                return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.all([ __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.y)() ? null : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__compat__.setupPostBridge)(__WEBPACK_IMPORTED_MODULE_4__config__.a.env), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__button__.b)(id, options).then(function(buttons) {
                    buttons.forEach(function(button) {
                        $logger.info("listen_click_paypal_button"), listenClick(button.container, button.button, button.click, button.condition);
                    });
                }) ]);
            }
            function initXO() {
                if ($logger.debug("initxo"), !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__eligibility__.a)()) return $logger.debug("ineligible_initxo");
                var _awaitPaymentTokenAnd2 = awaitPaymentTokenAndUrl(), url = _awaitPaymentTokenAnd2.url, paymentToken = _awaitPaymentTokenAnd2.paymentToken;
                $logger.info("init_paypal_checkout_initxo"), renderPayPalCheckout({
                    url: url,
                    payment: paymentToken
                });
            }
            function startFlow(item) {
                $logger.debug("startflow", {
                    item: item
                });
                var _matchUrlAndPaymentTo2 = matchUrlAndPaymentToken(item), paymentToken = _matchUrlAndPaymentTo2.paymentToken, url = _matchUrlAndPaymentTo2.url;
                if (checkUrlAgainstEnv(url), !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__eligibility__.a)()) return $logger.debug("ineligible_startflow_global", {
                    url: url
                }), void __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util__.b)(url);
                $logger.info("init_paypal_checkout_startflow"), renderPayPalCheckout({
                    url: url,
                    payment: paymentToken
                });
            }
            function closeFlow(closeUrl) {
                if ($logger.warn("closeflow_not_opened"), closeUrl) return $logger.warn("closeflow_with_url", {
                    closeUrl: closeUrl
                }), void __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util__.b)(closeUrl);
                console.warn("Checkout is not open, can not be closed");
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_2__components__ = __webpack_require__("./src/components/index.js"), __WEBPACK_IMPORTED_MODULE_3__eligibility__ = __webpack_require__("./src/legacy/eligibility.js"), __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__("./src/config/index.js"), __WEBPACK_IMPORTED_MODULE_5__compat__ = __webpack_require__("./src/compat/index.js"), __WEBPACK_IMPORTED_MODULE_6__lib__ = __webpack_require__("./src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__("./src/legacy/constants.js"), __WEBPACK_IMPORTED_MODULE_8__button__ = __webpack_require__("./src/legacy/button.js"), __WEBPACK_IMPORTED_MODULE_9__common__ = __webpack_require__("./src/legacy/common.js"), __WEBPACK_IMPORTED_MODULE_10__util__ = __webpack_require__("./src/legacy/util.js"), __WEBPACK_IMPORTED_MODULE_11__listener__ = __webpack_require__("./src/legacy/listener.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return checkout;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return apps;
            }), __webpack_exports__.c = setup;
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, $logger = __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.k(__WEBPACK_IMPORTED_MODULE_7__constants__.a), checkout = {}, apps = {
                checkout: checkout,
                Checkout: checkout
            };
            checkout.reset = reset, Object.defineProperty(checkout, "urlPrefix", {
                get: function() {
                    return __WEBPACK_IMPORTED_MODULE_4__config__.a.checkoutUrl + (__WEBPACK_IMPORTED_MODULE_4__config__.a.checkoutUrl.indexOf("?") === -1 ? "?" : "&") + "token=";
                }
            }), window.xchild && !window.paypalCheckout && (window.paypalCheckout = window.xchild);
            var paypalCheckoutInited = !1, closeFlowCalled = !1, setupCalled = !1;
            checkout.setup = setup, checkout.initXO = initXO, checkout.startFlow = startFlow, 
            checkout.closeFlow = closeFlow;
        },
        "./src/legacy/listener.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./src/lib/index.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return onAuthorizeListener;
            });
            var onAuthorizeListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.H)();
        },
        "./src/legacy/ready.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function invokeReady(method) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.r)(function() {
                    $logger.debug("paypal_checkout_ready"), setTimeout(function() {
                        window.paypal || $logger.error("paypal_checkout_ready_no_window_paypal"), method();
                    }, 1);
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__("./src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__("./src/config/index.js"), __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__("./src/legacy/constants.js"), __WEBPACK_IMPORTED_MODULE_4__interface__ = __webpack_require__("./src/legacy/interface.js"), $logger = __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.k(__WEBPACK_IMPORTED_MODULE_3__constants__.a);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.s)(window, "paypalCheckoutReady", function(method) {
                if ("function" == typeof method) {
                    var oneTimeReady = function() {
                        if (!method.called) return method.called = !0, method.apply(this, arguments);
                    };
                    return invokeReady(oneTimeReady), oneTimeReady;
                }
            }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.r)(function() {
                var buttons = Array.prototype.slice.call(document.querySelectorAll("[" + __WEBPACK_IMPORTED_MODULE_3__constants__.b.BUTTON + "]"));
                if (buttons && buttons.length) {
                    $logger.debug("data_paypal_button", {
                        number: buttons.length
                    });
                    for (var _iterator = buttons, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        var button = _ref, id = button.getAttribute(__WEBPACK_IMPORTED_MODULE_3__constants__.b.MERCHANT_ID), environment = void 0;
                        button.hasAttribute(__WEBPACK_IMPORTED_MODULE_3__constants__.b.ENV) ? environment = button.getAttribute(__WEBPACK_IMPORTED_MODULE_3__constants__.b.ENV) : button.hasAttribute(__WEBPACK_IMPORTED_MODULE_3__constants__.b.SANDBOX) && (environment = __WEBPACK_IMPORTED_MODULE_2__config__.b.SANDBOX), 
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__interface__.c)(id, {
                            environment: environment,
                            button: button
                        });
                    }
                }
                Array.prototype.slice.call(document.getElementsByClassName(__WEBPACK_IMPORTED_MODULE_3__constants__.c.HIDDEN_BUTTON)).forEach(function(el) {
                    el.className = el.className.replace(__WEBPACK_IMPORTED_MODULE_3__constants__.c.HIDDEN_BUTTON, "");
                });
            });
        },
        "./src/legacy/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function logRedirect(location) {
                redirected && $logger.warn("multiple_redirects"), redirected = !0, location && (location.match(/PayerID=/) || location.match(/ba_token=/)) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.u)("flow_complete"), 
                $logger.flush();
            }
            function redirect(url) {
                return __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a.try(function() {
                    if (!url) throw new Error("Redirect url undefined");
                    return __WEBPACK_IMPORTED_MODULE_2__config__.a.env === __WEBPACK_IMPORTED_MODULE_2__config__.b.TEST && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.G)(url) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.f)(window, "#fullpageRedirect?url=" + url) : (logRedirect(url), 
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.f)(window, url));
                });
            }
            function parseToken(token) {
                if (token) {
                    if (token = decodeURIComponent(decodeURIComponent(token)), token.match(/^(EC-)?[A-Z0-9]{17}$/)) return token;
                    var match = token.match(/token=((EC-)?[A-Z0-9]{17})/);
                    return match ? match[1] : (match = token.match(/(EC-[A-Z0-9]{17})/), match ? match[1] : void 0);
                }
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__("./src/config/index.js"), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__("./src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__("./src/legacy/constants.js");
            __webpack_exports__.c = logRedirect, __webpack_exports__.b = redirect, __webpack_exports__.a = parseToken;
            var $logger = __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.k(__WEBPACK_IMPORTED_MODULE_4__constants__.a), redirected = !1;
        },
        "./src/lib/beacon.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function beacon(event) {
                var payload = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                try {
                    payload.event = "ppxo_" + event, payload.version = "4.0.54", payload.host = window.location.host, 
                    payload.uid = window.pp_uid;
                    var query = [];
                    for (var key in payload) payload.hasOwnProperty(key) && query.push(encodeURIComponent(key) + "=" + encodeURIComponent(payload[key]));
                    query = query.join("&");
                    new window.Image().src = BEACON_URL + "?" + query, setTimeout(function() {
                        __WEBPACK_IMPORTED_MODULE_0__config__.a.logLevel === __WEBPACK_IMPORTED_MODULE_0__config__.d.DEBUG && window.console && window.console.log && window.console.log("*", event, payload);
                    }, 1);
                } catch (err) {}
            }
            function checkpoint(name) {
                var payload = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                try {
                    var version = "4.0.54".replace(/[^0-9]+/g, "_"), checkpointName = version + "_" + name, logged = loggedCheckpoints.indexOf(checkpointName) !== -1;
                    return loggedCheckpoints.push(checkpointName), logged && (checkpointName += "_dupe"), 
                    beacon(checkpointName, payload);
                } catch (err) {}
            }
            function buildPayload() {
                return {
                    v: "checkout.js.4.0.54",
                    t: Date.now(),
                    g: new Date().getTimezoneOffset(),
                    flnm: "ec:hermes:",
                    shir: "main_ec_hermes_",
                    pgrp: "main:ec:hermes::incontext-merchant",
                    page: "main:ec:hermes::incontext-merchant",
                    vers: "member:hermes:",
                    qual: "incontext",
                    tmpl: "merchant:incontext"
                };
            }
            function fpti() {
                var payload = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, query = [];
                payload = _extends({}, buildPayload(), payload);
                for (var key in payload) payload.hasOwnProperty(key) && query.push(encodeURIComponent(key) + "=" + encodeURIComponent(payload[key]));
                query = query.join("&");
                try {
                    new window.Image().src = FPTI_URL + "?" + query;
                } catch (err) {}
            }
            var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./src/config/index.js");
            __webpack_exports__.c = beacon, __webpack_exports__.a = checkpoint, __webpack_exports__.b = fpti;
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, BEACON_URL = "https://www.paypal.com/webapps/hermes/api/logger", loggedCheckpoints = [], FPTI_URL = "https://t.paypal.com/ts";
        },
        "./src/lib/device.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function getUserAgent() {
                return window.navigator.mockUserAgent || window.navigator.userAgent;
            }
            function isDevice() {
                return !!getUserAgent().match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i);
            }
            function isWebView() {
                var userAgent = getUserAgent();
                return /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent) || /\bwv\b/.test(userAgent) || /Android.*Version\/(\d)\.(\d)/i.test(userAgent);
            }
            function getAgent(agent) {
                var ua = getUserAgent(), tem = void 0, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                return /trident/i.test(M[1]) ? (tem = /\brv[ :]+(\d+)/g.exec(ua) || [], [ "IE", tem[1] || "" ]) : "Chrome" === M[1] && (tem = ua.match(/\bOPR\/(\d+)/)) ? [ "Opera", tem[1] ] : (M = M[2] ? [ M[1], M[2] ] : [ window.navigator.appName, window.navigator.appVersion, "-?" ], 
                (tem = ua.match(/version\/(\d+(\.\d{1,2}))/i)) && M.splice(1, 1, tem[1]), M);
            }
            function isFirefoxMobile() {
                var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                return /FxiOS/i.test(ua);
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
            function isIosWebview() {
                var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                return !!isIos(ua) && (!!isGoogleSearchApp(ua) || /.+AppleWebKit(?!.*Safari)/.test(ua));
            }
            function isAndroidWebview() {
                var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                return !!isAndroid(ua) && (/Version\/[\d\.]+/.test(ua) && !isOperaMini(ua));
            }
            function isIE() {
                return Boolean(window.document.documentMode);
            }
            function isIEIntranet() {
                if (!isIE()) return !1;
                try {
                    var status = window.status;
                    return window.status = "testIntranetMode", "testIntranetMode" === window.status && (window.status = status, 
                    !0);
                } catch (err) {
                    return !1;
                }
            }
            function supportsPopups() {
                var ua = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : getUserAgent();
                return !(isIosWebview(ua) || isAndroidWebview(ua) || isOperaMini(ua));
            }
            __webpack_exports__.g = getUserAgent, __webpack_exports__.b = isDevice, __webpack_exports__.a = isWebView, 
            __webpack_exports__.d = getAgent, __webpack_exports__.e = isFirefoxMobile, __webpack_exports__.c = isIEIntranet, 
            __webpack_exports__.f = supportsPopups;
        },
        "./src/lib/dom.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isDocumentReady() {
                return Boolean(document.body) && "complete" === document.readyState;
            }
            function loadScript(src) {
                var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                return documentBody.then(function(body) {
                    return new __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a(function(resolve, reject) {
                        var script = document.createElement("script");
                        script.onload = function() {
                            resolve();
                        }, script.onreadystatechange = function() {
                            "complete" !== this.readyState && "loaded" !== this.readyState || resolve();
                        };
                        var scriptLoadError = new Error("script_loading_error");
                        script.onerror = function(event) {
                            return reject(scriptLoadError);
                        }, timeout && setTimeout(function() {
                            return reject(new Error("script_loading_timed_out"));
                        }, timeout), script.setAttribute("src", src), body.appendChild(script);
                    });
                });
            }
            function getElement(item) {
                if (item) {
                    if (item instanceof HTMLElement) return item;
                    if ("string" == typeof item) {
                        if (document.querySelector) {
                            var result = document.querySelector(item);
                            if (result) return result;
                        }
                        return document.getElementById(item);
                    }
                }
            }
            function getElements(collection) {
                if (!collection) return [];
                if (collection instanceof HTMLElement || "string" == typeof collection) {
                    var element = getElement(collection);
                    return element ? [ element ] : [];
                }
                if (Array.isArray(collection) || collection instanceof NodeList || collection instanceof HTMLCollection) {
                    for (var result = [], i = 0; i < collection.length; i++) {
                        var el = getElement(collection[i]);
                        el && result.push(el);
                    }
                    return result;
                }
                return [];
            }
            function onDocumentReady(method) {
                return documentReady.then(method);
            }
            function getQueryParam(name) {
                return parseQuery(window.location.search.slice(1))[name];
            }
            function urlWillRedirectPage(url) {
                return url.indexOf("#") === -1 || 0 !== url.indexOf("#") && url.split("#")[0] !== window.location.href.split("#")[0];
            }
            function extendUrl(url) {
                var params = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, hasHash = url.indexOf("#") > 0, _url$split = url.split("#"), _url$split2 = _slicedToArray(_url$split, 2), serverUrl = _url$split2[0], hash = _url$split2[1];
                if (hash && !serverUrl) {
                    var _ref2 = [ "#" + hash, "" ];
                    serverUrl = _ref2[0], hash = _ref2[1];
                }
                var _serverUrl$split = serverUrl.split("?"), _serverUrl$split2 = _slicedToArray(_serverUrl$split, 2), originalUrl = _serverUrl$split2[0], originalQueryString = _serverUrl$split2[1];
                if (originalQueryString) {
                    var originalQuery = parseQuery(originalQueryString);
                    for (var _key in originalQuery) params.hasOwnProperty(_key) || (params[_key] = originalQuery[_key]);
                }
                var newQueryString = Object.keys(params).sort().map(function(key) {
                    if (key && params[key]) return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
                }).filter(Boolean).join("&"), newUrl = originalUrl;
                return newQueryString && (newUrl = newUrl + "?" + newQueryString), hasHash && (newUrl = newUrl + "#" + (hash || "")), 
                newUrl;
            }
            function redirect() {
                var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window, url = arguments[1];
                return new __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a(function(resolve) {
                    __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.c("redirect", {
                        url: url
                    }), setTimeout(function() {
                        win.location = url, urlWillRedirectPage(url) || resolve();
                    }, 1);
                });
            }
            function hasMetaViewPort() {
                var meta = document.querySelector("meta[name=viewport]");
                return !(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__device__.b)() && window.screen.width < 660 && !meta);
            }
            var __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__("./src/lib/util.js"), __WEBPACK_IMPORTED_MODULE_3__device__ = __webpack_require__("./src/lib/device.js");
            __webpack_exports__.g = loadScript, __webpack_exports__.h = getElement, __webpack_exports__.f = getElements, 
            __webpack_exports__.e = onDocumentReady, __webpack_exports__.a = getQueryParam, 
            __webpack_exports__.i = urlWillRedirectPage, __webpack_exports__.d = extendUrl, 
            __webpack_exports__.b = redirect, __webpack_exports__.c = hasMetaViewPort;
            var _slicedToArray = function() {
                function sliceIterator(arr, i) {
                    var _arr = [], _n = !0, _d = !1, _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                        !i || _arr.length !== i); _n = !0) ;
                    } catch (err) {
                        _d = !0, _e = err;
                    } finally {
                        try {
                            !_n && _i.return && _i.return();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function(arr, i) {
                    if (Array.isArray(arr)) return arr;
                    if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
            }(), documentReady = new __WEBPACK_IMPORTED_MODULE_1_sync_browser_mocks_src_promise__.a(function(resolve) {
                if (isDocumentReady()) return resolve();
                var interval = setInterval(function() {
                    if (isDocumentReady()) return clearInterval(interval), resolve();
                }, 10);
            }), documentBody = documentReady.then(function() {
                return document.body;
            }), parseQuery = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.e)(function(queryString) {
                var params = {};
                if (!queryString) return params;
                if (queryString.indexOf("=") === -1) throw new Error("Can not parse query string params: " + queryString);
                for (var _iterator = queryString.split("&"), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var pair = _ref;
                    pair = pair.split("="), pair[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                }
                return params;
            });
        },
        "./src/lib/eligibility.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isEligible() {
                var currentAgent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__device__.d)();
                return !("object" === (void 0 === currentAgent ? "undefined" : _typeof(currentAgent)) && 2 === currentAgent.length && parseFloat(currentAgent[1]) < __WEBPACK_IMPORTED_MODULE_1__config__.a.SUPPORTED_AGENTS[currentAgent[0]]) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__device__.a)();
            }
            var __WEBPACK_IMPORTED_MODULE_0__device__ = __webpack_require__("./src/lib/device.js"), __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__("./src/config/index.js");
            __webpack_exports__.a = isEligible;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        },
        "./src/lib/errors.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function warn(err) {
                if (window.console) {
                    if (window.console.warn) return window.console.warn(err);
                    if (window.console.log) return window.console.log(err);
                }
            }
            function checkForCommonErrors() {
                "[]" !== JSON.stringify([]) && (warn(Array.prototype.toJSON ? "Custom Array.prototype.toJSON is causing incorrect json serialization of arrays. This is likely to cause issues. Probable cause is Prototype.js" : "JSON.stringify is doing incorrect serialization of arrays. This is likely to cause issues."), 
                __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.d("json_stringify_array_broken")), 
                "{}" !== JSON.stringify({}) && (warn("JSON.stringify is doing incorrect serialization of objects. This is likely to cause issues."), 
                __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.d("json_stringify_object_broken")), 
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__device__.c)() && __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.d("ie_intranet_mode");
            }
            var __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_1__device__ = __webpack_require__("./src/lib/device.js");
            __webpack_exports__.a = checkForCommonErrors;
        },
        "./src/lib/http.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function request(_ref) {
                var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win;
                return new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(function(resolve, reject) {
                    if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
                    for (var normalizedHeaders = {}, _iterator = Object.keys(headers), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref2 = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref2 = _i.value;
                        }
                        var _key2 = _ref2;
                        normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
                    }
                    json ? normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/json" : (data || body) && (normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/x-www-form-urlencoded; charset=utf-8"), 
                    normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || "application/json";
                    for (var _iterator2 = headerBuilders, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref3 = _iterator2[_i2++];
                        } else {
                            if (_i2 = _iterator2.next(), _i2.done) break;
                            _ref3 = _i2.value;
                        }
                        for (var headerBuilder = _ref3, builtHeaders = headerBuilder(), _iterator3 = Object.keys(builtHeaders), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                            var _ref4;
                            if (_isArray3) {
                                if (_i3 >= _iterator3.length) break;
                                _ref4 = _iterator3[_i3++];
                            } else {
                                if (_i3 = _iterator3.next(), _i3.done) break;
                                _ref4 = _i3.value;
                            }
                            var _key3 = _ref4;
                            normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
                        }
                    }
                    var xhr = new win.XMLHttpRequest();
                    xhr.addEventListener("load", function() {
                        if (!this.status || this.status >= 400) return reject(this);
                        var result = void 0;
                        try {
                            result = JSON.parse(this.responseText);
                        } catch (err) {
                            return reject(err);
                        }
                        return resolve(result);
                    }, !1), xhr.addEventListener("error", function(evt) {
                        reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString()));
                    }, !1), xhr.open(method, url, !0);
                    for (var _key in normalizedHeaders) xhr.setRequestHeader(_key, normalizedHeaders[_key]);
                    json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map(function(key) {
                        return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
                    }).join("&")), xhr.send(body);
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js");
            __webpack_exports__.a = request;
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, HEADERS = {
                CONTENT_TYPE: "content-type",
                ACCEPT: "accept"
            }, headerBuilders = [];
            request.get = function(url) {
                return request(_extends({
                    method: "get",
                    url: url
                }, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}));
            }, request.post = function(url, data) {
                return request(_extends({
                    method: "post",
                    url: url,
                    data: data
                }, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}));
            }, request.addHeaderBuilder = function(method) {
                headerBuilders.push(method);
            };
        },
        "./src/lib/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__device__ = __webpack_require__("./src/lib/device.js");
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return __WEBPACK_IMPORTED_MODULE_0__device__.a;
            }), __webpack_require__.d(__webpack_exports__, "g", function() {
                return __WEBPACK_IMPORTED_MODULE_0__device__.b;
            }), __webpack_require__.d(__webpack_exports__, "m", function() {
                return __WEBPACK_IMPORTED_MODULE_0__device__.e;
            }), __webpack_require__.d(__webpack_exports__, "v", function() {
                return __WEBPACK_IMPORTED_MODULE_0__device__.f;
            }), __webpack_require__.d(__webpack_exports__, "y", function() {
                return __WEBPACK_IMPORTED_MODULE_0__device__.c;
            }), __webpack_require__.d(__webpack_exports__, "C", function() {
                return __WEBPACK_IMPORTED_MODULE_0__device__.g;
            }), __webpack_require__.d(__webpack_exports__, "E", function() {
                return __WEBPACK_IMPORTED_MODULE_0__device__.d;
            });
            var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__("./src/lib/util.js");
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return __WEBPACK_IMPORTED_MODULE_1__util__.a;
            }), __webpack_require__.d(__webpack_exports__, "k", function() {
                return __WEBPACK_IMPORTED_MODULE_1__util__.f;
            }), __webpack_require__.d(__webpack_exports__, "l", function() {
                return __WEBPACK_IMPORTED_MODULE_1__util__.d;
            }), __webpack_require__.d(__webpack_exports__, "q", function() {
                return __WEBPACK_IMPORTED_MODULE_1__util__.g;
            }), __webpack_require__.d(__webpack_exports__, "s", function() {
                return __WEBPACK_IMPORTED_MODULE_1__util__.h;
            }), __webpack_require__.d(__webpack_exports__, "t", function() {
                return __WEBPACK_IMPORTED_MODULE_1__util__.i;
            }), __webpack_require__.d(__webpack_exports__, "w", function() {
                return __WEBPACK_IMPORTED_MODULE_1__util__.j;
            }), __webpack_require__.d(__webpack_exports__, "z", function() {
                return __WEBPACK_IMPORTED_MODULE_1__util__.e;
            }), __webpack_require__.d(__webpack_exports__, "H", function() {
                return __WEBPACK_IMPORTED_MODULE_1__util__.k;
            });
            var __WEBPACK_IMPORTED_MODULE_2__logger__ = __webpack_require__("./src/lib/logger.js");
            __webpack_require__.d(__webpack_exports__, "i", function() {
                return __WEBPACK_IMPORTED_MODULE_2__logger__.a;
            }), __webpack_require__.d(__webpack_exports__, "n", function() {
                return __WEBPACK_IMPORTED_MODULE_2__logger__.b;
            });
            var __WEBPACK_IMPORTED_MODULE_3__eligibility__ = __webpack_require__("./src/lib/eligibility.js");
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return __WEBPACK_IMPORTED_MODULE_3__eligibility__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_4__errors__ = __webpack_require__("./src/lib/errors.js");
            __webpack_require__.d(__webpack_exports__, "p", function() {
                return __WEBPACK_IMPORTED_MODULE_4__errors__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_5__dom__ = __webpack_require__("./src/lib/dom.js");
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return __WEBPACK_IMPORTED_MODULE_5__dom__.a;
            }), __webpack_require__.d(__webpack_exports__, "f", function() {
                return __WEBPACK_IMPORTED_MODULE_5__dom__.b;
            }), __webpack_require__.d(__webpack_exports__, "h", function() {
                return __WEBPACK_IMPORTED_MODULE_5__dom__.c;
            }), __webpack_require__.d(__webpack_exports__, "j", function() {
                return __WEBPACK_IMPORTED_MODULE_5__dom__.d;
            }), __webpack_require__.d(__webpack_exports__, "r", function() {
                return __WEBPACK_IMPORTED_MODULE_5__dom__.e;
            }), __webpack_require__.d(__webpack_exports__, "x", function() {
                return __WEBPACK_IMPORTED_MODULE_5__dom__.f;
            }), __webpack_require__.d(__webpack_exports__, "A", function() {
                return __WEBPACK_IMPORTED_MODULE_5__dom__.g;
            }), __webpack_require__.d(__webpack_exports__, "B", function() {
                return __WEBPACK_IMPORTED_MODULE_5__dom__.h;
            }), __webpack_require__.d(__webpack_exports__, "G", function() {
                return __WEBPACK_IMPORTED_MODULE_5__dom__.i;
            });
            var __WEBPACK_IMPORTED_MODULE_6__http__ = __webpack_require__("./src/lib/http.js");
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return __WEBPACK_IMPORTED_MODULE_6__http__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_7__beacon__ = __webpack_require__("./src/lib/beacon.js");
            __webpack_require__.d(__webpack_exports__, "o", function() {
                return __WEBPACK_IMPORTED_MODULE_7__beacon__.c;
            }), __webpack_require__.d(__webpack_exports__, "u", function() {
                return __WEBPACK_IMPORTED_MODULE_7__beacon__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_8__throttle__ = __webpack_require__("./src/lib/throttle.js");
            __webpack_require__.d(__webpack_exports__, "D", function() {
                return __WEBPACK_IMPORTED_MODULE_8__throttle__.a;
            }), __webpack_require__.d(__webpack_exports__, "F", function() {
                return __WEBPACK_IMPORTED_MODULE_8__throttle__.b;
            });
            __webpack_require__("./src/lib/namespace.js");
        },
        "./src/lib/logger.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function initLogger() {
                __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.f(function() {
                    return {
                        host: window.location.host,
                        path: window.location.pathname,
                        env: __WEBPACK_IMPORTED_MODULE_2__config__.a.env,
                        country: __WEBPACK_IMPORTED_MODULE_2__config__.a.locale.country,
                        lang: __WEBPACK_IMPORTED_MODULE_2__config__.a.locale.lang,
                        uid: window.pp_uid,
                        ver: "4.0.54"
                    };
                }), __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.g(function() {
                    return {
                        state: __WEBPACK_IMPORTED_MODULE_2__config__.a.state
                    };
                }), __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.h({
                    uri: __WEBPACK_IMPORTED_MODULE_2__config__.a.loggerUrl,
                    heartbeat: !1,
                    logPerformance: !1,
                    prefix: "ppxo"
                });
            }
            function setLogLevel(logLevel) {
                if (__WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.b.indexOf(logLevel) === -1) throw new Error("Invalid logLevel: " + logLevel);
                __WEBPACK_IMPORTED_MODULE_2__config__.a.logLevel = logLevel, __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.i.logLevel = logLevel, 
                __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.CONFIG.LOG_LEVEL = logLevel, window.LOG_LEVEL = logLevel;
            }
            var __WEBPACK_IMPORTED_MODULE_0_post_robot_src__ = __webpack_require__("./node_modules/post-robot/src/index.js"), __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__("./src/config/index.js");
            __webpack_exports__.b = initLogger, __webpack_exports__.a = setLogLevel;
        },
        "./src/lib/namespace.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.assign;
        },
        "./src/lib/throttle.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function getUID(name, uid) {
                if (!uid) if (uids[name]) uid = uids[name]; else try {
                    window.sessionStorage && (uid = window.sessionStorage.getItem("__throttle_uid_" + name + "__"));
                } catch (err) {}
                uid || (uid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__.b)()), uids[name] = uid;
                try {
                    window.sessionStorage && window.sessionStorage.setItem("__throttle_uid_" + name + "__", uid);
                } catch (err) {}
                return uid;
            }
            function getThrottle(name, sample, id) {
                var uid = getUID(name, id), throttle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__.c)(name + "_" + uid) % 1e4, group = void 0;
                group = throttle < sample ? "test" : sample >= 5e3 || sample <= throttle && throttle < 2 * sample ? "control" : "throttle";
                var treatment = name + "_" + group, logged = {};
                return {
                    isEnabled: function() {
                        return "test" === group;
                    },
                    isDisabled: function() {
                        return "test" !== group;
                    },
                    getTreatment: function() {
                        return treatment;
                    },
                    log: function(checkpointName) {
                        var payload = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, event = treatment + "_" + checkpointName;
                        return logged[checkpointName] || (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__beacon__.a)(event, _extends({}, payload, {
                            expuid: uid
                        })), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__beacon__.b)(_extends({}, payload, {
                            expuid: uid,
                            eligibility_reason: event
                        })), logged[checkpointName] = !0), this;
                    },
                    logStart: function() {
                        var payload = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        return this.log("start", payload);
                    },
                    logComplete: function() {
                        var payload = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        return this.log("complete", payload);
                    }
                };
            }
            function getReturnToken() {
                var token = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__.d)(window.location.href, /token=((EC-)?[A-Z0-9]+)/), payer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__.d)(window.location.href, /PayerID=([A-Z0-9]+)/);
                if (token && payer) return token;
            }
            var __WEBPACK_IMPORTED_MODULE_0__beacon__ = __webpack_require__("./src/lib/beacon.js"), __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__("./src/lib/util.js");
            __webpack_exports__.a = getThrottle, __webpack_exports__.b = getReturnToken;
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, uids = {};
        },
        "./src/lib/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isPayPalDomain() {
                return Boolean((window.location.protocol + "//" + window.location.host).match(__WEBPACK_IMPORTED_MODULE_1__config__.a.paypal_domain_regex)) || "mock://www.paypal.com" === window.mockDomain;
            }
            function noop() {}
            function once(method) {
                var called = !1;
                return function() {
                    if (!called) return called = !0, method.apply(this, arguments);
                };
            }
            function uniqueID() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            }
            function hashStr(str) {
                var hash = 0;
                if (0 === str.length) return hash;
                for (var i = 0; i < str.length; i++) {
                    hash = (hash << 5) - hash + str.charCodeAt(i), hash |= 0;
                }
                return Math.abs(hash);
            }
            function match(str, pattern) {
                var regmatch = str.match(pattern);
                if (regmatch) return regmatch[1];
            }
            function safeJSON(item) {
                return JSON.stringify(item, function(key, val) {
                    if ("function" == typeof val) return "<" + (void 0 === val ? "undefined" : _typeof(val)) + ">";
                    try {
                        JSON.stringify(val);
                    } catch (err) {
                        return "<" + (void 0 === val ? "undefined" : _typeof(val)) + ">";
                    }
                    return val;
                });
            }
            function eventEmitter() {
                var listeners = [];
                return {
                    listen: function(method) {
                        return listeners.push(method), {
                            cancel: function() {
                                listeners.splice(listeners.indexOf(method), 1);
                            }
                        };
                    },
                    once: function(method) {
                        var listener = this.listen(function() {
                            method.apply(null, arguments), listener.cancel();
                        });
                    },
                    trigger: function() {
                        for (var _iterator = listeners, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if (_i = _iterator.next(), _i.done) break;
                                _ref = _i.value;
                            }
                            _ref.apply(null, arguments);
                        }
                    }
                };
            }
            function onKey(obj, key, callback) {
                if (obj) {
                    var value = obj[key];
                    value && (value = callback(value) || value);
                    try {
                        delete obj[key], Object.defineProperty(obj, key, {
                            configurable: !0,
                            set: function(item) {
                                (value = item) && (value = callback(value) || value);
                            },
                            get: function() {
                                return value;
                            }
                        });
                    } catch (err) {}
                }
            }
            function awaitKey(obj, key) {
                return new __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__.a(function(resolve) {
                    return onKey(obj, key, resolve);
                });
            }
            var __WEBPACK_IMPORTED_MODULE_0_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js"), __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__("./src/config/index.js");
            __webpack_exports__.a = isPayPalDomain, __webpack_require__.d(__webpack_exports__, "e", function() {
                return memoize;
            }), __webpack_exports__.g = noop, __webpack_exports__.i = once, __webpack_exports__.b = uniqueID, 
            __webpack_exports__.c = hashStr, __webpack_exports__.d = match, __webpack_exports__.j = safeJSON, 
            __webpack_exports__.k = eventEmitter, __webpack_exports__.h = onKey, __webpack_exports__.f = awaitKey;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, memoize = function(method) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, cache = {};
                return function() {
                    var key = void 0;
                    try {
                        key = JSON.stringify(arguments);
                    } catch (err) {
                        throw new Error("Arguments not serializable -- can not be used to memoize");
                    }
                    return cache.hasOwnProperty(key) ? cache[key] : (cache[key] = method.apply(this, arguments), 
                    options.time && setTimeout(function() {
                        delete cache[key];
                    }, options.time), cache[key]);
                };
            };
        },
        "./src/setup.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function domainToEnv(domain) {
                for (var _iterator = Object.keys(__WEBPACK_IMPORTED_MODULE_1__config__.a.paypalUrls), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var _env = _ref;
                    if (__WEBPACK_IMPORTED_MODULE_1__config__.a.paypalUrls[_env] === domain) return _env;
                }
            }
            function setDomainEnv(domain) {
                var currentDomainEnv = domainToEnv(domain);
                currentDomainEnv && "test" !== currentDomainEnv && (__WEBPACK_IMPORTED_MODULE_1__config__.a.env = currentDomainEnv);
            }
            function setup() {
                var _ref3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, env = _ref3.env, stage = _ref3.stage, apiStage = _ref3.apiStage, paypalUrl = _ref3.paypalUrl, state = _ref3.state, ppobjects = _ref3.ppobjects, lightbox = _ref3.lightbox, postBridge = _ref3.postBridge, logLevel = _ref3.logLevel;
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.p)(), env) {
                    if (!__WEBPACK_IMPORTED_MODULE_1__config__.a.paypalUrls[env]) throw new Error("Invalid env: " + env);
                    delete __WEBPACK_IMPORTED_MODULE_1__config__.a.env, __WEBPACK_IMPORTED_MODULE_1__config__.a.env = env;
                }
                stage && (delete __WEBPACK_IMPORTED_MODULE_1__config__.a.stage, __WEBPACK_IMPORTED_MODULE_1__config__.a.stage = stage, 
                env || (delete __WEBPACK_IMPORTED_MODULE_1__config__.a.env, __WEBPACK_IMPORTED_MODULE_1__config__.a.env = __WEBPACK_IMPORTED_MODULE_1__config__.b.STAGE)), 
                apiStage && (delete __WEBPACK_IMPORTED_MODULE_1__config__.a.apiStage, __WEBPACK_IMPORTED_MODULE_1__config__.a.apiStage = apiStage), 
                paypalUrl && (delete __WEBPACK_IMPORTED_MODULE_1__config__.a.paypalUrl, __WEBPACK_IMPORTED_MODULE_1__config__.a.paypalUrl = paypalUrl, 
                setDomainEnv(__WEBPACK_IMPORTED_MODULE_1__config__.a.paypalUrl)), state && (delete __WEBPACK_IMPORTED_MODULE_1__config__.a.state, 
                __WEBPACK_IMPORTED_MODULE_1__config__.a.state = state), ppobjects && (__WEBPACK_IMPORTED_MODULE_1__config__.a.ppobjects = !0), 
                lightbox && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__components__.c)(), 
                postBridge && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__compat__.setupPostBridge)(__WEBPACK_IMPORTED_MODULE_1__config__.a.env), 
                logLevel && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.i)(logLevel), 
                __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.c("setup_" + __WEBPACK_IMPORTED_MODULE_1__config__.a.env), 
                __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.j("current_protocol_" + currentProtocol);
            }
            var __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__ = __webpack_require__("./node_modules/beaver-logger/client/index.js"), __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__("./src/config/index.js"), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__("./src/lib/index.js"), __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__("./src/components/index.js"), __WEBPACK_IMPORTED_MODULE_4__compat__ = __webpack_require__("./src/compat/index.js"), __WEBPACK_IMPORTED_MODULE_5_sync_browser_mocks_src_promise__ = __webpack_require__("./node_modules/sync-browser-mocks/src/promise.js");
            __webpack_exports__.a = setup, setDomainEnv(window.location.protocol + "//" + window.location.host), 
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.n)(), __WEBPACK_IMPORTED_MODULE_5_sync_browser_mocks_src_promise__.a.onPossiblyUnhandledException(function(err) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.o)("unhandled_error", {
                    message: err ? err.toString() : "undefined",
                    stack: err.stack || err.toString(),
                    errtype: {}.toString.call(err)
                });
            });
            var currentScript = function() {
                for (var scripts = Array.prototype.slice.call(document.getElementsByTagName("script")), _iterator2 = scripts, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        if (_i2 = _iterator2.next(), _i2.done) break;
                        _ref2 = _i2.value;
                    }
                    var script = _ref2;
                    if (script.src && script.src.replace(/^https?:/, "").split("?")[0] === __WEBPACK_IMPORTED_MODULE_1__config__.a.scriptUrl || script.hasAttribute("data-paypal-checkout")) return script;
                    if (script.src && script.src.indexOf("paypal.checkout.v4.js") !== -1) return script;
                }
                document.currentScript && __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.j("current_script_not_recognized", {
                    src: document.currentScript.src
                });
            }(), currentProtocol = window.location.protocol.split(":")[0];
            if (currentScript) {
                setup({
                    env: currentScript.getAttribute("data-env"),
                    stage: currentScript.getAttribute("data-stage"),
                    apiStage: currentScript.getAttribute("data-api-stage"),
                    paypalUrl: currentScript.getAttribute("data-paypal-url"),
                    state: currentScript.getAttribute("data-state"),
                    lightbox: currentScript.hasAttribute("data-enable-lightbox"),
                    postBridge: currentScript.hasAttribute("data-enable-bridge"),
                    logLevel: currentScript.getAttribute("data-log-level"),
                    ppobjects: !0
                });
                var scriptProtocol = currentScript.src.split(":")[0];
                __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.j("current_script_protocol_" + scriptProtocol), 
                __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.j("current_script_" + (currentProtocol === scriptProtocol ? "match" : "mismatch") + "_protocol");
            } else __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.j("no_current_script"), 
            document.currentScript && __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.j("current_script_not_recognized", {
                src: document.currentScript.src
            });
        }
    });
});
//# sourceMappingURL=checkout.lib.js.map