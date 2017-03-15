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
        function loadCheckoutIntegration(callback) {
            if (!(0, _component.isXComponent)()) {
                return callback(null, null);
            }
            var urls = getIntegrationURLs();
            (0, _util.loadScript)(urls.latest ? urls.major : urls.minor, _config.config.xchild_global, function(err, result) {
                if (err && !urls.latest) {
                    return (0, _util.loadScript)(urls.major + "?t=" + Date.now(), _config.config.xchild_global, callback);
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
            name_separator: "__"
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
        function loadScript(url, prop, callback) {
            if (window[prop]) {
                return callback(null, window[prop]);
            }
            var container = document.body || document.head;
            if (!container) {
                return callback(new Error("Can not find container to insert script into"));
            }
            var script = document.createElement("script");
            script.src = url;
            container.appendChild(script);
            script.onload = function() {
                if (!window[prop]) {
                    return callback(new Error("Expected " + prop + " to be present on window"));
                }
                return callback(null, window[prop]);
            };
            script.onerror = function(err) {
                return callback(err);
            };
        }
        function warn() {
            var message = Array.prototype.slice.call(arguments).join(" ");
            if (window.console && window.console.warn) {
                window.console.warn(message);
            } else if (window.console && window.console.log) {
                window.console.log(message);
            }
        }
    }
});
//# sourceMappingURL=checkout.child.loader.js.map