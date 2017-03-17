window["paypal"] = function(modules) {
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
}({
    0: function(module, exports, __webpack_require__) {
        "use strict";
        var _namespace = __webpack_require__("./src/namespace.js");
        module.exports = module.exports["default"] = (0, _namespace.extendPayPalNamespace)(__webpack_require__("./src/loader/interface.js"));
    },
    "./src/namespace.js": function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
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
        exports.extendPayPalNamespace = extendPayPalNamespace;
        function extendPayPalNamespace(xports) {
            var _arr = [ window.paypal, window.PAYPAL ];
            for (var _i = 0; _i < _arr.length; _i++) {
                var namespace = _arr[_i];
                if (!namespace) {
                    continue;
                }
                var apps = xports.apps;
                if (namespace.apps) {
                    apps = _extends({}, namespace.apps, apps);
                }
                xports = _extends({}, namespace, xports, {
                    apps: apps
                });
            }
            window.paypal = xports;
            window.PAYPAL = xports;
            window.ppxo = xports;
            return xports;
        }
    },
    "./src/loader/interface.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.onLoadCheckoutIntegration = onLoadCheckoutIntegration;
        var _load = __webpack_require__("./src/loader/load.js");
        function onLoadCheckoutIntegration(callback) {
            return _load.integrationResponder.listen(callback);
        }
        module.exports["default"] = module.exports;
    },
    "./src/loader/load.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.integrationResponder = undefined;
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
        var _config = __webpack_require__("./src/loader/config.js");
        var _responder = __webpack_require__("./src/loader/responder.js");
        var _component = __webpack_require__("./src/loader/component.js");
        var _util = __webpack_require__("./src/loader/util.js");
        var integrationResponder = exports.integrationResponder = (0, _responder.responder)();
        function getIntegrationURLs() {
            return {
                latest: (0, _component.isLatest)(),
                major: _config.config.checkoutjs_url.replace("{version}", ""),
                minor: _config.config.checkoutjs_url.replace("{version}", "." + (0, _component.getVersion)())
            };
        }
        function getIntegrationProps() {
            var props = _extends({}, _config.config.script_props);
            var query = (0, _util.parseQuery)();
            if (query.env) {
                props["data-env"] = query.env;
            }
            if (query.stage) {
                props["data-stage"] = query.stage;
            }
            return props;
        }
        function loadCheckoutIntegration(callback) {
            if (!(0, _component.isXComponent)()) {
                return callback(null, null);
            }
            var urls = getIntegrationURLs();
            var props = getIntegrationProps();
            (0, _util.loadScript)(urls.latest ? urls.major : urls.minor, _config.config.xchild_global, props, function(err, result) {
                if (err && !urls.latest) {
                    return (0, _util.loadScript)(urls.major + "?t=" + Date.now(), _config.config.xchild_global, props, callback);
                }
                return callback(err, result);
            });
        }
        loadCheckoutIntegration(function(err, result) {
            if (err) {
                (0, _util.warn)("Failed to load checkout.js", err.stack || err.toString());
            }
            if (err || result) {
                return integrationResponder.respond(err, result);
            }
        });
    },
    "./src/loader/config.js": function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var config = exports.config = {
            checkoutjs_url: "https://www.paypalobjects.com/api/checkout{version}.js",
            major_version: "4",
            latest_version: "latest",
            xcomponent: "xcomponent",
            xchild_global: "xchild",
            name_separator: "__",
            script_props: {
                "data-paypal-checkout": "",
                "data-no-bridge": "",
                "data-state": "ppxo_checkout"
            }
        };
    },
    "./src/loader/responder.js": function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.responder = responder;
        function responder() {
            var callbacks = [];
            var loaded = false;
            var err = void 0;
            var res = void 0;
            function flush() {
                if (loaded) {
                    while (callbacks.length) {
                        callbacks.shift().call(null, err, res);
                    }
                }
            }
            function respond(error, result) {
                loaded = true;
                err = error;
                res = result;
                flush();
            }
            function listen(callback) {
                callbacks.push(callback);
                flush();
            }
            return {
                respond: respond,
                listen: listen
            };
        }
    },
    "./src/loader/component.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.isXComponent = isXComponent;
        exports.getVersion = getVersion;
        exports.isLatest = isLatest;
        var _config = __webpack_require__("./src/loader/config.js");
        function isXComponent() {
            return Boolean(window.name && window.name.split(_config.config.name_separator)[0] === _config.config.xcomponent);
        }
        function getVersion() {
            if (!isXComponent()) {
                throw new Error("Can not get version for non-xcomponent");
            }
            return window.name.split(_config.config.name_separator)[2].replace(/_/g, ".");
        }
        function isLatest() {
            if (!isXComponent()) {
                return false;
            }
            var version = getVersion();
            return Boolean(version === _config.config.major_version || version === _config.config.latest_version);
        }
    },
    "./src/loader/util.js": function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.loadScript = loadScript;
        exports.warn = warn;
        exports.parseQuery = parseQuery;
        function loadScript(url, prop, attrs, callback) {
            if (window[prop]) {
                return callback(null, window[prop]);
            }
            var container = document.body || document.head;
            if (!container) {
                return callback(new Error("Can not find container to insert script into"));
            }
            var script = document.createElement("script");
            script.src = url;
            script.onload = function() {
                if (!window[prop]) {
                    return callback(new Error("Expected " + prop + " to be present on window"));
                }
                return callback(null, window[prop]);
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
            var message = Array.prototype.slice.call(arguments).join(" ");
            if (window.console && window.console.warn) {
                window.console.warn(message);
            } else if (window.console && window.console.log) {
                window.console.log(message);
            }
        }
        function parseQuery() {
            var queryString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.search;
            var params = {};
            if (queryString && queryString.indexOf("?") === 0) {
                queryString = queryString.slice(1);
            }
            if (!queryString) {
                return params;
            }
            if (queryString.indexOf("=") === -1) {
                throw new Error("Can not parse query string params: " + queryString);
            }
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
                if (pair[0] && pair[1]) {
                    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
                }
            }
            return params;
        }
    }
});
//# sourceMappingURL=checkout.child.loader.js.map