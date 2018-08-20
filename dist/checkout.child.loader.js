!function(e, a) {
    for (var i in a) e[i] = a[i];
}(window, function(modules) {
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
    __webpack_require__.p = "https://www.paypalobjects.com/api/";
    return __webpack_require__(__webpack_require__.s = "./src/loader/index.js");
}({
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
        };
        !function(xports) {
            for (var namespaces = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], childnamespaces = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], _i2 = 0, _length2 = null == namespaces ? 0 : namespaces.length; _i2 < _length2; _i2++) {
                var name = namespaces[_i2], namespace = window[name];
                if (namespace) for (var _i4 = 0, _length4 = null == childnamespaces ? 0 : childnamespaces.length; _i4 < _length4; _i4++) {
                    var _extends2, childname = childnamespaces[_i4], childnamespace = xports[childname];
                    namespace[childname] && (childnamespace = _extends({}, namespace[childname], childnamespace));
                    xports = _extends({}, namespace, xports, ((_extends2 = {})[childname] = childnamespace, 
                    _extends2));
                }
            }
            for (var _i6 = 0, _length6 = null == namespaces ? 0 : namespaces.length; _i6 < _length6; _i6++) {
                var _name = namespaces[_i6];
                window[_name] = xports;
            }
        }(__webpack_require__("./src/loader/interface.js"), [ "paypal" ]);
    },
    "./src/loader/interface.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
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
        };
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
            for (var _i2 = 0, _Object$keys2 = Object.keys(attrs), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                var attr = _Object$keys2[_i2];
                script.setAttribute(attr, attrs[attr]);
            }
            container.appendChild(script);
        }
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, integrationResponder = function() {
            var callbacks = [], loaded = !1, err = void 0, res = void 0;
            function flush() {
                if (loaded) for (;callbacks.length; ) callbacks.shift()(err, res);
            }
            return {
                respond: function(error, result) {
                    loaded = !0;
                    err = error;
                    res = result;
                    flush();
                },
                listen: function(callback) {
                    callbacks.push(callback);
                    flush();
                }
            };
        }();
        function onLoadCheckoutIntegration(callback) {
            return integrationResponder.listen(callback);
        }
        function getIntegrationURLs() {
            return {
                latest: function() {
                    if (!isCheckoutXComponent()) return !1;
                    var version = getVersion();
                    return Boolean(version === config.major_version || version === config.latest_version);
                }(),
                major: config.checkoutjs_url.replace("{version}", ""),
                minor: config.checkoutjs_url.replace("{version}", "." + getVersion())
            };
        }
        function getIntegrationProps() {
            var props = _extends({}, config.script_props), query = function() {
                var queryString = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.search, params = {};
                queryString && 0 === queryString.indexOf("?") && (queryString = queryString.slice(1));
                if (!queryString) return params;
                if (-1 === queryString.indexOf("=")) throw new Error("Can not parse query string params: " + queryString);
                for (var _i4 = 0, _queryString$split2 = queryString.split("&"), _length4 = null == _queryString$split2 ? 0 : _queryString$split2.length; _i4 < _length4; _i4++) {
                    var pair = _queryString$split2[_i4];
                    (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                }
                return params;
            }();
            query.env && (props["data-env"] = query.env);
            query.stage && (props["data-stage"] = query.stage);
            return props;
        }
        !function(callback) {
            if (!isCheckoutXComponent()) return callback(null, null);
            var urls = getIntegrationURLs(), props = getIntegrationProps();
            loadScript(urls.latest ? urls.major : urls.minor, config.xchild_global, props, function(err, result) {
                return err && !urls.latest ? loadScript(urls.major + "?t=" + Date.now(), config.xchild_global, props, callback) : callback(err, result);
            });
        }(function(err, result) {
            err && function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                var message = args.join(" ");
                window.console && window.console.warn ? window.console.warn(message) : window.console && window.console.log && window.console.log(message);
            }("Failed to load checkout.js", function stringifyError(err) {
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
            }(err));
            if (err || result) return integrationResponder.respond(err, result);
        });
        __webpack_require__.d(__webpack_exports__, "onLoadCheckoutIntegration", function() {
            return onLoadCheckoutIntegration;
        });
        __webpack_require__.d(__webpack_exports__, "isCheckoutXComponent", function() {
            return isCheckoutXComponent;
        });
    }
}));
//# sourceMappingURL=checkout.child.loader.js.map