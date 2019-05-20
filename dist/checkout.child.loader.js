!function(modules) {
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
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
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
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 2);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    function _extends() {
        return (_extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) ({}).hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }).apply(this, arguments);
    }
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return _extends;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var esm_extends = __webpack_require__(0), config = {
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
        if (!isCheckoutXComponent()) throw new Error("Can not get version for non-zoid-component");
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
        script.src = url, script.addEventListener("load", function() {
            return window[prop] ? callback(null, window[prop]) : callback(new Error("Expected " + prop + " to be present on window"));
        }), script.addEventListener("error", function(err) {
            return callback(err);
        });
        for (var _i2 = 0, _Object$keys2 = Object.keys(attrs); _i2 < _Object$keys2.length; _i2++) {
            var attr = _Object$keys2[_i2];
            script.setAttribute(attr, attrs[attr]);
        }
        container.appendChild(script);
    }
    var integrationResponder = function() {
        var err, res, callbacks = [], loaded = !1;
        function flush() {
            if (loaded) for (;callbacks.length; ) callbacks.shift()(err, res);
        }
        return {
            respond: function(error, result) {
                loaded = !0, err = error, res = result, flush();
            },
            listen: function(callback) {
                callbacks.push(callback), flush();
            }
        };
    }();
    function onLoadCheckoutIntegration(callback) {
        return integrationResponder.listen(callback);
    }
    !function(callback) {
        if (!isCheckoutXComponent()) return callback(null, null);
        var urls = {
            latest: isLatest(),
            major: config.checkoutjs_url.replace("{version}", ""),
            minor: config.checkoutjs_url.replace("{version}", "." + getVersion())
        }, props = function() {
            var props = Object(esm_extends.a)({}, config.script_props), query = function(queryString) {
                void 0 === queryString && (queryString = window.location.search);
                var params = {};
                if (queryString && 0 === queryString.indexOf("?") && (queryString = queryString.slice(1)), 
                !queryString) return params;
                if (-1 === queryString.indexOf("=")) throw new Error("Can not parse query string params: " + queryString);
                for (var _i4 = 0, _queryString$split2 = queryString.split("&"); _i4 < _queryString$split2.length; _i4++) {
                    var pair = _queryString$split2[_i4];
                    (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                }
                return params;
            }();
            return query.env && (props["data-env"] = query.env), query.stage && (props["data-stage"] = query.stage), 
            props;
        }();
        loadScript(urls.latest ? urls.major : urls.minor, config.xchild_global, props, function(err, result) {
            return err && !urls.latest ? loadScript(urls.major + "?t=" + Date.now(), config.xchild_global, props, callback) : callback(err, result);
        });
    }(function(err, result) {
        if (err && function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            var message = args.join(" ");
            window.console && window.console.warn ? window.console.warn(message) : window.console && window.console.log && window.console.log(message);
        }("Failed to load checkout.js", function stringifyError(err, level) {
            if (void 0 === level && (level = 1), level >= 3) return "stringifyError stack overflow";
            try {
                if (!err) return "<unknown error: " + {}.toString.call(err) + ">";
                if ("string" == typeof err) return err;
                if (err instanceof Error) {
                    var stack = err && err.stack, message = err && err.message;
                    if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                    if (stack) return stack;
                    if (message) return message;
                }
                return "function" == typeof err.toString ? err.toString() : {}.toString.call(err);
            } catch (newErr) {
                return "Error while stringifying error: " + stringifyError(newErr, level + 1);
            }
        }(err)), err || result) return integrationResponder.respond(err, result);
    }), __webpack_require__.d(__webpack_exports__, "onLoadCheckoutIntegration", function() {
        return onLoadCheckoutIntegration;
    }), __webpack_require__.d(__webpack_exports__, "isCheckoutXComponent", function() {
        return isCheckoutXComponent;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var esm_extends = __webpack_require__(0);
    !function(xports, namespaces, childnamespaces) {
        void 0 === namespaces && (namespaces = []), void 0 === childnamespaces && (childnamespaces = []);
        for (var _i2 = 0, _namespaces2 = namespaces; _i2 < _namespaces2.length; _i2++) {
            var namespace = window[_namespaces2[_i2]];
            if (namespace) for (var _i4 = 0, _childnamespaces2 = childnamespaces; _i4 < _childnamespaces2.length; _i4++) {
                var _extends2, childname = _childnamespaces2[_i4], childnamespace = xports[childname];
                namespace[childname] && (childnamespace = Object(esm_extends.a)({}, namespace[childname], childnamespace)), 
                xports = Object(esm_extends.a)({}, namespace, xports, ((_extends2 = {})[childname] = childnamespace, 
                _extends2));
            }
        }
        for (var _i6 = 0, _namespaces4 = namespaces; _i6 < _namespaces4.length; _i6++) window[_namespaces4[_i6]] = xports;
    }(__webpack_require__(1), [ "paypal" ]);
} ]);
//# sourceMappingURL=checkout.child.loader.js.map