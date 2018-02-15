!function(e, a) {
    for (var i in a) e[i] = a[i];
}(exports, function(modules) {
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
    "./node_modules/Base64/base64.js": function(module, exports, __webpack_require__) {
        !function() {
            function InvalidCharacterError(message) {
                this.message = message;
            }
            var object = exports, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            InvalidCharacterError.prototype = new Error();
            InvalidCharacterError.prototype.name = "InvalidCharacterError";
            object.btoa || (object.btoa = function(input) {
                for (var block, charCode, str = String(input), idx = 0, map = chars, output = ""; str.charAt(0 | idx) || (map = "=", 
                idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
                    charCode = str.charCodeAt(idx += .75);
                    if (charCode > 255) throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                    block = block << 8 | charCode;
                }
                return output;
            });
            object.atob || (object.atob = function(input) {
                var str = String(input).replace(/[=]+$/, "");
                if (str.length % 4 == 1) throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
                for (var bs, buffer, bc = 0, idx = 0, output = ""; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? 64 * bs + buffer : buffer, 
                bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) buffer = chars.indexOf(buffer);
                return output;
            });
        }();
    },
    "./node_modules/bowser/bowser.min.js": function(module, exports, __webpack_require__) {
        /*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */
        !function(e, t, n) {
            void 0 !== module && module.exports ? module.exports = n() : __webpack_require__("./node_modules/webpack/buildin/amd-define.js")(t, n);
        }(0, "bowser", function() {
            function t(t) {
                function n(e) {
                    var n = t.match(e);
                    return n && n.length > 1 && n[1] || "";
                }
                function r(e) {
                    var n = t.match(e);
                    return n && n.length > 1 && n[2] || "";
                }
                var T, i = n(/(ipod|iphone|ipad)/i).toLowerCase(), s = /like android/i.test(t), o = !s && /android/i.test(t), u = /nexus\s*[0-6]\s*/i.test(t), a = !u && /nexus\s*[0-9]+/i.test(t), f = /CrOS/.test(t), l = /silk/i.test(t), c = /sailfish/i.test(t), h = /tizen/i.test(t), p = /(web|hpw)os/i.test(t), d = /windows phone/i.test(t), m = (/SamsungBrowser/i.test(t), 
                !d && /windows/i.test(t)), g = !i && !l && /macintosh/i.test(t), y = !o && !c && !h && !p && /linux/i.test(t), b = r(/edg([ea]|ios)\/(\d+(\.\d+)?)/i), w = n(/version\/(\d+(\.\d+)?)/i), E = /tablet/i.test(t) && !/tablet pc/i.test(t), S = !E && /[^-]mobi/i.test(t), x = /xbox/i.test(t);
                /opera/i.test(t) ? T = {
                    name: "Opera",
                    opera: e,
                    version: w || n(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
                } : /opr\/|opios/i.test(t) ? T = {
                    name: "Opera",
                    opera: e,
                    version: n(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || w
                } : /SamsungBrowser/i.test(t) ? T = {
                    name: "Samsung Internet for Android",
                    samsungBrowser: e,
                    version: w || n(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
                } : /coast/i.test(t) ? T = {
                    name: "Opera Coast",
                    coast: e,
                    version: w || n(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
                } : /yabrowser/i.test(t) ? T = {
                    name: "Yandex Browser",
                    yandexbrowser: e,
                    version: w || n(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
                } : /ucbrowser/i.test(t) ? T = {
                    name: "UC Browser",
                    ucbrowser: e,
                    version: n(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
                } : /mxios/i.test(t) ? T = {
                    name: "Maxthon",
                    maxthon: e,
                    version: n(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
                } : /epiphany/i.test(t) ? T = {
                    name: "Epiphany",
                    epiphany: e,
                    version: n(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
                } : /puffin/i.test(t) ? T = {
                    name: "Puffin",
                    puffin: e,
                    version: n(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
                } : /sleipnir/i.test(t) ? T = {
                    name: "Sleipnir",
                    sleipnir: e,
                    version: n(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
                } : /k-meleon/i.test(t) ? T = {
                    name: "K-Meleon",
                    kMeleon: e,
                    version: n(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
                } : d ? (T = {
                    name: "Windows Phone",
                    osname: "Windows Phone",
                    windowsphone: e
                }, b ? (T.msedge = e, T.version = b) : (T.msie = e, T.version = n(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(t) ? T = {
                    name: "Internet Explorer",
                    msie: e,
                    version: n(/(?:msie |rv:)(\d+(\.\d+)?)/i)
                } : f ? T = {
                    name: "Chrome",
                    osname: "Chrome OS",
                    chromeos: e,
                    chromeBook: e,
                    chrome: e,
                    version: n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                } : /edg([ea]|ios)/i.test(t) ? T = {
                    name: "Microsoft Edge",
                    msedge: e,
                    version: b
                } : /vivaldi/i.test(t) ? T = {
                    name: "Vivaldi",
                    vivaldi: e,
                    version: n(/vivaldi\/(\d+(\.\d+)?)/i) || w
                } : c ? T = {
                    name: "Sailfish",
                    osname: "Sailfish OS",
                    sailfish: e,
                    version: n(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                } : /seamonkey\//i.test(t) ? T = {
                    name: "SeaMonkey",
                    seamonkey: e,
                    version: n(/seamonkey\/(\d+(\.\d+)?)/i)
                } : /firefox|iceweasel|fxios/i.test(t) ? (T = {
                    name: "Firefox",
                    firefox: e,
                    version: n(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
                }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(t) && (T.firefoxos = e, T.osname = "Firefox OS")) : l ? T = {
                    name: "Amazon Silk",
                    silk: e,
                    version: n(/silk\/(\d+(\.\d+)?)/i)
                } : /phantom/i.test(t) ? T = {
                    name: "PhantomJS",
                    phantom: e,
                    version: n(/phantomjs\/(\d+(\.\d+)?)/i)
                } : /slimerjs/i.test(t) ? T = {
                    name: "SlimerJS",
                    slimer: e,
                    version: n(/slimerjs\/(\d+(\.\d+)?)/i)
                } : /blackberry|\bbb\d+/i.test(t) || /rim\stablet/i.test(t) ? T = {
                    name: "BlackBerry",
                    osname: "BlackBerry OS",
                    blackberry: e,
                    version: w || n(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                } : p ? (T = {
                    name: "WebOS",
                    osname: "WebOS",
                    webos: e,
                    version: w || n(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                }, /touchpad\//i.test(t) && (T.touchpad = e)) : /bada/i.test(t) ? T = {
                    name: "Bada",
                    osname: "Bada",
                    bada: e,
                    version: n(/dolfin\/(\d+(\.\d+)?)/i)
                } : h ? T = {
                    name: "Tizen",
                    osname: "Tizen",
                    tizen: e,
                    version: n(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || w
                } : /qupzilla/i.test(t) ? T = {
                    name: "QupZilla",
                    qupzilla: e,
                    version: n(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || w
                } : /chromium/i.test(t) ? T = {
                    name: "Chromium",
                    chromium: e,
                    version: n(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || w
                } : /chrome|crios|crmo/i.test(t) ? T = {
                    name: "Chrome",
                    chrome: e,
                    version: n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                } : o ? T = {
                    name: "Android",
                    version: w
                } : /safari|applewebkit/i.test(t) ? (T = {
                    name: "Safari",
                    safari: e
                }, w && (T.version = w)) : i ? (T = {
                    name: "iphone" == i ? "iPhone" : "ipad" == i ? "iPad" : "iPod"
                }, w && (T.version = w)) : T = /googlebot/i.test(t) ? {
                    name: "Googlebot",
                    googlebot: e,
                    version: n(/googlebot\/(\d+(\.\d+))/i) || w
                } : {
                    name: n(/^(.*)\/(.*) /),
                    version: r(/^(.*)\/(.*) /)
                }, !T.msedge && /(apple)?webkit/i.test(t) ? (/(apple)?webkit\/537\.36/i.test(t) ? (T.name = T.name || "Blink", 
                T.blink = e) : (T.name = T.name || "Webkit", T.webkit = e), !T.version && w && (T.version = w)) : !T.opera && /gecko\//i.test(t) && (T.name = T.name || "Gecko", 
                T.gecko = e, T.version = T.version || n(/gecko\/(\d+(\.\d+)?)/i)), T.windowsphone || !o && !T.silk ? !T.windowsphone && i ? (T[i] = e, 
                T.ios = e, T.osname = "iOS") : g ? (T.mac = e, T.osname = "macOS") : x ? (T.xbox = e, 
                T.osname = "Xbox") : m ? (T.windows = e, T.osname = "Windows") : y && (T.linux = e, 
                T.osname = "Linux") : (T.android = e, T.osname = "Android");
                var C = "";
                T.windows ? C = function(e) {
                    switch (e) {
                      case "NT":
                        return "NT";

                      case "XP":
                        return "XP";

                      case "NT 5.0":
                        return "2000";

                      case "NT 5.1":
                        return "XP";

                      case "NT 5.2":
                        return "2003";

                      case "NT 6.0":
                        return "Vista";

                      case "NT 6.1":
                        return "7";

                      case "NT 6.2":
                        return "8";

                      case "NT 6.3":
                        return "8.1";

                      case "NT 10.0":
                        return "10";

                      default:
                        return;
                    }
                }(n(/Windows ((NT|XP)( \d\d?.\d)?)/i)) : T.windowsphone ? C = n(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : T.mac ? (C = n(/Mac OS X (\d+([_\.\s]\d+)*)/i), 
                C = C.replace(/[_\s]/g, ".")) : i ? (C = n(/os (\d+([_\s]\d+)*) like mac os x/i), 
                C = C.replace(/[_\s]/g, ".")) : o ? C = n(/android[ \/-](\d+(\.\d+)*)/i) : T.webos ? C = n(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : T.blackberry ? C = n(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : T.bada ? C = n(/bada\/(\d+(\.\d+)*)/i) : T.tizen && (C = n(/tizen[\/\s](\d+(\.\d+)*)/i)), 
                C && (T.osversion = C);
                var k = !T.windows && C.split(".")[0];
                E || a || "ipad" == i || o && (3 == k || k >= 4 && !S) || T.silk ? T.tablet = e : (S || "iphone" == i || "ipod" == i || o || u || T.blackberry || T.webos || T.bada) && (T.mobile = e);
                return T.msedge || T.msie && T.version >= 10 || T.yandexbrowser && T.version >= 15 || T.vivaldi && T.version >= 1 || T.chrome && T.version >= 20 || T.samsungBrowser && T.version >= 4 || T.firefox && T.version >= 20 || T.safari && T.version >= 6 || T.opera && T.version >= 10 || T.ios && T.osversion && T.osversion.split(".")[0] >= 6 || T.blackberry && T.version >= 10.1 || T.chromium && T.version >= 20 ? T.a = e : T.msie && T.version < 10 || T.chrome && T.version < 20 || T.firefox && T.version < 20 || T.safari && T.version < 6 || T.opera && T.version < 10 || T.ios && T.osversion && T.osversion.split(".")[0] < 6 || T.chromium && T.version < 20 ? T.c = e : T.x = e, 
                T;
            }
            function r(e) {
                return e.split(".").length;
            }
            function i(e, t) {
                var r, n = [];
                if (Array.prototype.map) return Array.prototype.map.call(e, t);
                for (r = 0; r < e.length; r++) n.push(t(e[r]));
                return n;
            }
            function s(e) {
                for (var t = Math.max(r(e[0]), r(e[1])), n = i(e, function(e) {
                    var n = t - r(e);
                    return e += new Array(n + 1).join(".0"), i(e.split("."), function(e) {
                        return new Array(20 - e.length).join("0") + e;
                    }).reverse();
                }); --t >= 0; ) {
                    if (n[0][t] > n[1][t]) return 1;
                    if (n[0][t] !== n[1][t]) return -1;
                    if (0 === t) return 0;
                }
            }
            function o(e, r, i) {
                var o = n;
                "string" == typeof r && (i = r, r = void 0), void 0 === r && (r = !1), i && (o = t(i));
                var u = "" + o.version;
                for (var a in e) if (e.hasOwnProperty(a) && o[a]) {
                    if ("string" != typeof e[a]) throw new Error("Browser version in the minVersion map should be a string: " + a + ": " + String(e));
                    return s([ u, e[a] ]) < 0;
                }
                return r;
            }
            function u(e, t, n) {
                return !o(e, t, n);
            }
            var e = !0, n = t("undefined" != typeof navigator ? navigator.userAgent || "" : "");
            return n.test = function(e) {
                for (var t = 0; t < e.length; ++t) {
                    var r = e[t];
                    if ("string" == typeof r && r in n) return !0;
                }
                return !1;
            }, n.isUnsupportedBrowser = o, n.compareVersions = s, n.check = u, n._detect = t, 
            n.detect = t, n;
        });
    },
    "./node_modules/cross-domain-safe-weakmap/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function hasNativeWeakMap() {
            if (!window.WeakMap) return !1;
            if (!window.Object.freeze) return !1;
            try {
                var testWeakMap = new window.WeakMap(), testKey = {};
                window.Object.freeze(testKey);
                testWeakMap.set(testKey, "__testvalue__");
                return "__testvalue__" === testWeakMap.get(testKey);
            } catch (err) {
                return !1;
            }
        }
        function safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        var interface_namespaceObject = {};
        __webpack_require__.d(interface_namespaceObject, "WeakMap", function() {
            return weakmap_CrossDomainSafeWeakMap;
        });
        var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), defineProperty = Object.defineProperty, counter = Date.now() % 1e9, weakmap_CrossDomainSafeWeakMap = function() {
            function CrossDomainSafeWeakMap() {
                _classCallCheck(this, CrossDomainSafeWeakMap);
                counter += 1;
                this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter;
                if (hasNativeWeakMap()) try {
                    this.weakmap = new window.WeakMap();
                } catch (err) {}
                this.keys = [];
                this.values = [];
            }
            CrossDomainSafeWeakMap.prototype._cleanupClosedWindows = function() {
                for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                    var value = keys[i];
                    if (Object(src.q)(value) && Object(src.r)(value)) {
                        if (weakmap) try {
                            weakmap.delete(value);
                        } catch (err) {}
                        keys.splice(i, 1);
                        this.values.splice(i, 1);
                        i -= 1;
                    }
                }
            };
            CrossDomainSafeWeakMap.prototype.isSafeToReadWrite = function(key) {
                if (Object(src.q)(key)) return !1;
                try {
                    key && key.self;
                    key && key[this.name];
                } catch (err) {
                    return !1;
                }
                return !0;
            };
            CrossDomainSafeWeakMap.prototype.set = function(key, value) {
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
                    var keys = this.keys, values = this.values, index = safeIndexOf(keys, key);
                    if (-1 === index) {
                        keys.push(key);
                        values.push(value);
                    } else values[index] = value;
                }
            };
            CrossDomainSafeWeakMap.prototype.get = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    if (weakmap.has(key)) return weakmap.get(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (!this.isSafeToReadWrite(key)) {
                    this._cleanupClosedWindows();
                    var keys = this.keys, index = safeIndexOf(keys, key);
                    if (-1 === index) return;
                    return this.values[index];
                }
                var entry = key[this.name];
                if (entry && entry[0] === key) return entry[1];
            };
            CrossDomainSafeWeakMap.prototype.delete = function(key) {
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
                    var keys = this.keys, index = safeIndexOf(keys, key);
                    if (-1 !== index) {
                        keys.splice(index, 1);
                        this.values.splice(index, 1);
                    }
                }
            };
            CrossDomainSafeWeakMap.prototype.has = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    return weakmap.has(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) {
                    var entry = key[this.name];
                    return !(!entry || entry[0] !== key);
                }
                this._cleanupClosedWindows();
                return -1 !== safeIndexOf(this.keys, key);
            };
            return CrossDomainSafeWeakMap;
        }();
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return weakmap_CrossDomainSafeWeakMap;
        });
    },
    "./node_modules/cross-domain-utils/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isRegex(item) {
            return "[object RegExp]" === Object.prototype.toString.call(item);
        }
        function noop() {}
        function getActualDomain(win) {
            var location = win.location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if (protocol === CONSTANTS.FILE_PROTOCOL) return CONSTANTS.FILE_PROTOCOL + "//";
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function getDomain(win) {
            win = win || window;
            var domain = getActualDomain(win);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) ? win.mockDomain : domain;
        }
        function isBlankDomain(win) {
            try {
                if (!win.location.href) return !0;
                if ("about:blank" === win.location.href) return !0;
            } catch (err) {}
            return !1;
        }
        function isActuallySameDomain(win) {
            try {
                var desc = Object.getOwnPropertyDescriptor(win, "location");
                if (desc && !1 === desc.enumerable) return !1;
            } catch (err) {}
            try {
                if (isBlankDomain(win)) return !0;
                if (getActualDomain(win) === getActualDomain(window)) return !0;
            } catch (err) {}
            return !1;
        }
        function isSameDomain(win) {
            if (!isActuallySameDomain(win)) return !1;
            try {
                if (isBlankDomain(win)) return !0;
                if (getDomain(window) === getDomain(win)) return !0;
            } catch (err) {}
            return !1;
        }
        function getParent(win) {
            if (win) try {
                if (win.parent && win.parent !== win) return win.parent;
            } catch (err) {
                return;
            }
        }
        function getOpener(win) {
            if (win && !getParent(win)) try {
                return win.opener;
            } catch (err) {
                return;
            }
        }
        function getParents(win) {
            var result = [];
            try {
                for (;win.parent !== win; ) {
                    result.push(win.parent);
                    win = win.parent;
                }
            } catch (err) {}
            return result;
        }
        function isAncestorParent(parent, child) {
            if (!parent || !child) return !1;
            var childParent = getParent(child);
            return childParent ? childParent === parent : -1 !== getParents(child).indexOf(parent);
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
        }
        function getAllChildFrames(win) {
            for (var result = [], _iterator = getFrames(win), _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i2 >= _iterator.length) break;
                    _ref = _iterator[_i2++];
                } else {
                    _i2 = _iterator.next();
                    if (_i2.done) break;
                    _ref = _i2.value;
                }
                var frame = _ref;
                result.push(frame);
                for (var _iterator2 = getAllChildFrames(frame), _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i3 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i3++];
                    } else {
                        _i3 = _iterator2.next();
                        if (_i3.done) break;
                        _ref2 = _i3.value;
                    }
                    var childFrame = _ref2;
                    result.push(childFrame);
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
                    if (isAncestorParent(window, win) && window.top) return window.top;
                } catch (err) {}
                try {
                    if (isAncestorParent(win, window) && window.top) return window.top;
                } catch (err) {}
                for (var _iterator3 = getAllChildFrames(win), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray3) {
                        if (_i4 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i4++];
                    } else {
                        _i4 = _iterator3.next();
                        if (_i4.done) break;
                        _ref3 = _i4.value;
                    }
                    var frame = _ref3;
                    try {
                        if (frame.top) return frame.top;
                    } catch (err) {}
                    if (getParent(frame) === frame) return frame;
                }
            }
        }
        function getAllFramesInWindow(win) {
            var top = getTop(win);
            return getAllChildFrames(top).concat(top);
        }
        function isFrameWindowClosed(frame) {
            if (!frame.contentWindow) return !0;
            if (!frame.parentNode) return !0;
            var doc = frame.ownerDocument;
            return !(!doc || !doc.body || doc.body.contains(frame));
        }
        function safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
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
                return !err || err.message !== IE_WIN_ACCESS_ERROR;
            }
            if (allowMock && isSameDomain(win)) try {
                if (win.mockclosed) return !0;
            } catch (err) {}
            try {
                if (!win.parent || !win.top) return !0;
            } catch (err) {}
            try {
                noop(win === win);
            } catch (err) {
                return !0;
            }
            var iframeIndex = safeIndexOf(iframeWindows, win);
            if (-1 !== iframeIndex) {
                var frame = iframeFrames[iframeIndex];
                if (frame && isFrameWindowClosed(frame)) return !0;
            }
            return !1;
        }
        function getUserAgent(win) {
            win = win || window;
            return win.navigator.mockUserAgent || win.navigator.userAgent;
        }
        function getFrameByName(win, name) {
            for (var winFrames = getFrames(win), _iterator4 = winFrames, _isArray4 = Array.isArray(_iterator4), _i6 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                var _ref4;
                if (_isArray4) {
                    if (_i6 >= _iterator4.length) break;
                    _ref4 = _iterator4[_i6++];
                } else {
                    _i6 = _iterator4.next();
                    if (_i6.done) break;
                    _ref4 = _i6.value;
                }
                var childFrame = _ref4;
                try {
                    if (isSameDomain(childFrame) && childFrame.name === name && -1 !== winFrames.indexOf(childFrame)) return childFrame;
                } catch (err) {}
            }
            try {
                if (-1 !== winFrames.indexOf(win.frames[name])) return win.frames[name];
            } catch (err) {}
            try {
                if (-1 !== winFrames.indexOf(win[name])) return win[name];
            } catch (err) {}
        }
        function isOpener(parent, child) {
            return parent === getOpener(child);
        }
        function getAncestor(win) {
            win = win || window;
            var opener = getOpener(win);
            if (opener) return opener;
            var parent = getParent(win);
            return parent || void 0;
        }
        function isAncestor(parent, child) {
            var actualParent = getAncestor(child);
            if (actualParent) return actualParent === parent;
            if (child === parent) return !1;
            if (getTop(child) === child) return !1;
            for (var _iterator7 = getFrames(parent), _isArray7 = Array.isArray(_iterator7), _i9 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                var _ref7;
                if (_isArray7) {
                    if (_i9 >= _iterator7.length) break;
                    _ref7 = _iterator7[_i9++];
                } else {
                    _i9 = _iterator7.next();
                    if (_i9.done) break;
                    _ref7 = _i9.value;
                }
                if (_ref7 === child) return !0;
            }
            return !1;
        }
        function isPopup() {
            return Boolean(getOpener(window));
        }
        function isIframe() {
            return Boolean(getParent(window));
        }
        function anyMatch(collection1, collection2) {
            for (var _iterator8 = collection1, _isArray8 = Array.isArray(_iterator8), _i10 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator](); ;) {
                var _ref8;
                if (_isArray8) {
                    if (_i10 >= _iterator8.length) break;
                    _ref8 = _iterator8[_i10++];
                } else {
                    _i10 = _iterator8.next();
                    if (_i10.done) break;
                    _ref8 = _i10.value;
                }
                for (var item1 = _ref8, _iterator9 = collection2, _isArray9 = Array.isArray(_iterator9), _i11 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator](); ;) {
                    var _ref9;
                    if (_isArray9) {
                        if (_i11 >= _iterator9.length) break;
                        _ref9 = _iterator9[_i11++];
                    } else {
                        _i11 = _iterator9.next();
                        if (_i11.done) break;
                        _ref9 = _i11.value;
                    }
                    if (item1 === _ref9) return !0;
                }
            }
            return !1;
        }
        function isSameTopWindow(win1, win2) {
            var top1 = getTop(win1) || win1, top2 = getTop(win2) || win2;
            try {
                if (top1 && top2) return top1 === top2;
            } catch (err) {}
            var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
            if (anyMatch(allFrames1, allFrames2)) return !0;
            var opener1 = getOpener(top1), opener2 = getOpener(top2);
            return (!opener1 || !anyMatch(getAllFramesInWindow(opener1), allFrames2)) && (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1), 
            !1);
        }
        function matchDomain(pattern, origin) {
            if ("string" == typeof pattern) {
                if ("string" == typeof origin) return pattern === CONSTANTS.WILDCARD || origin === pattern;
                if (isRegex(origin)) return !1;
                if (Array.isArray(origin)) return !1;
            }
            return isRegex(pattern) ? isRegex(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !isRegex(origin) && pattern.some(function(subpattern) {
                return matchDomain(subpattern, origin);
            }));
        }
        function getDomainFromUrl(url) {
            var domain = void 0;
            if (!url.match(/^(https?|mock|file):\/\//)) return getDomain();
            domain = url;
            domain = domain.split("/").slice(0, 3).join("/");
            return domain;
        }
        function isWindow(obj) {
            try {
                if (obj === window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if ("[object Window]" === Object.prototype.toString.call(obj)) return !0;
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
                noop(obj === obj);
            } catch (err) {
                return !0;
            }
            try {
                noop(obj && obj.__cross_domain_utils_window_check__);
            } catch (err) {
                return !0;
            }
            return !1;
        }
        __webpack_exports__.a = getActualDomain;
        __webpack_exports__.c = getDomain;
        __webpack_exports__.j = isActuallySameDomain;
        __webpack_exports__.o = isSameDomain;
        __webpack_exports__.h = getParent;
        __webpack_exports__.g = getOpener;
        __webpack_exports__.f = getFrames;
        __webpack_exports__.r = isWindowClosed;
        __webpack_exports__.i = getUserAgent;
        __webpack_exports__.e = getFrameByName;
        __webpack_exports__.m = isOpener;
        __webpack_exports__.b = getAncestor;
        __webpack_exports__.k = isAncestor;
        __webpack_exports__.n = isPopup;
        __webpack_exports__.l = isIframe;
        __webpack_exports__.p = isSameTopWindow;
        __webpack_exports__.s = matchDomain;
        __webpack_exports__.d = getDomainFromUrl;
        __webpack_exports__.q = isWindow;
        var CONSTANTS = {
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            WILDCARD: "*"
        }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n", iframeWindows = [], iframeFrames = [];
    },
    "./node_modules/hi-base32/src/base32.js": function(module, exports, __webpack_require__) {
        (function(process, global, module) {
            var __WEBPACK_AMD_DEFINE_RESULT__, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            /*
 * [hi-base32]{@link https://github.com/emn178/hi-base32}
 *
 * @version 0.3.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2017
 * @license MIT
 */
            !function() {
                "use strict";
                var root = "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) ? window : {};
                !root.HI_BASE32_NO_NODE_JS && "object" === (void 0 === process ? "undefined" : _typeof(process)) && process.versions && process.versions.node && (root = global);
                var COMMON_JS = !root.HI_BASE32_NO_COMMON_JS && "object" === _typeof(module) && module.exports, AMD = __webpack_require__("./node_modules/webpack/buildin/amd-options.js"), BASE32_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split(""), BASE32_DECODE_CHAR = {
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
                    for (var b, c, str = "", length = bytes.length, i = 0, followingChars = 0; i < length; ) {
                        b = bytes[i++];
                        if (b <= 127) str += String.fromCharCode(b); else {
                            if (b > 191 && b <= 223) {
                                c = 31 & b;
                                followingChars = 1;
                            } else if (b <= 239) {
                                c = 15 & b;
                                followingChars = 2;
                            } else {
                                if (!(b <= 247)) throw "not a UTF-8 string";
                                c = 7 & b;
                                followingChars = 3;
                            }
                            for (var j = 0; j < followingChars; ++j) {
                                b = bytes[i++];
                                if (b < 128 || b > 191) throw "not a UTF-8 string";
                                c <<= 6;
                                c += 63 & b;
                            }
                            if (c >= 55296 && c <= 57343) throw "not a UTF-8 string";
                            if (c > 1114111) throw "not a UTF-8 string";
                            if (c <= 65535) str += String.fromCharCode(c); else {
                                c -= 65536;
                                str += String.fromCharCode(55296 + (c >> 10));
                                str += String.fromCharCode(56320 + (1023 & c));
                            }
                        }
                    }
                    return str;
                }, decodeAsBytes = function(base32Str) {
                    base32Str = base32Str.replace(/=/g, "");
                    for (var v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = base32Str.length, i = 0, count = length >> 3 << 3; i < count; ) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                        bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                        bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3);
                        bytes[index++] = 255 & (v7 << 5 | v8);
                    }
                    var remain = length - count;
                    if (2 === remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                    } else if (4 === remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                    } else if (5 === remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                        bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                    } else if (7 === remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                        bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                        bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3);
                    }
                    return bytes;
                }, encodeAscii = function(str) {
                    for (var v1, v2, v3, v4, v5, base32Str = "", length = str.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) {
                        v1 = str.charCodeAt(i++);
                        v2 = str.charCodeAt(i++);
                        v3 = str.charCodeAt(i++);
                        v4 = str.charCodeAt(i++);
                        v5 = str.charCodeAt(i++);
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                    }
                    var remain = length - count;
                    if (1 === remain) {
                        v1 = str.charCodeAt(i);
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======";
                    } else if (2 === remain) {
                        v1 = str.charCodeAt(i++);
                        v2 = str.charCodeAt(i);
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                    } else if (3 === remain) {
                        v1 = str.charCodeAt(i++);
                        v2 = str.charCodeAt(i++);
                        v3 = str.charCodeAt(i);
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                    } else if (4 === remain) {
                        v1 = str.charCodeAt(i++);
                        v2 = str.charCodeAt(i++);
                        v3 = str.charCodeAt(i++);
                        v4 = str.charCodeAt(i);
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                    }
                    return base32Str;
                }, encodeUtf8 = function(str) {
                    var v1, v2, v3, v4, v5, code, i, end = !1, base32Str = "", index = 0, start = 0, bytes = 0, length = str.length;
                    do {
                        blocks[0] = blocks[5];
                        blocks[1] = blocks[6];
                        blocks[2] = blocks[7];
                        for (i = start; index < length && i < 5; ++index) {
                            code = str.charCodeAt(index);
                            if (code < 128) blocks[i++] = code; else if (code < 2048) {
                                blocks[i++] = 192 | code >> 6;
                                blocks[i++] = 128 | 63 & code;
                            } else if (code < 55296 || code >= 57344) {
                                blocks[i++] = 224 | code >> 12;
                                blocks[i++] = 128 | code >> 6 & 63;
                                blocks[i++] = 128 | 63 & code;
                            } else {
                                code = 65536 + ((1023 & code) << 10 | 1023 & str.charCodeAt(++index));
                                blocks[i++] = 240 | code >> 18;
                                blocks[i++] = 128 | code >> 12 & 63;
                                blocks[i++] = 128 | code >> 6 & 63;
                                blocks[i++] = 128 | 63 & code;
                            }
                        }
                        bytes += i - start;
                        start = i - 5;
                        index === length && ++index;
                        index > length && i < 6 && (end = !0);
                        v1 = blocks[0];
                        if (i > 4) {
                            v2 = blocks[1];
                            v3 = blocks[2];
                            v4 = blocks[3];
                            v5 = blocks[4];
                            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                        } else if (1 === i) base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======"; else if (2 === i) {
                            v2 = blocks[1];
                            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                        } else if (3 === i) {
                            v2 = blocks[1];
                            v3 = blocks[2];
                            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                        } else if (4 === i) {
                            v2 = blocks[1];
                            v3 = blocks[2];
                            v4 = blocks[3];
                            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                        }
                    } while (!end);
                    return base32Str;
                }, encodeBytes = function(bytes) {
                    for (var v1, v2, v3, v4, v5, base32Str = "", length = bytes.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) {
                        v1 = bytes[i++];
                        v2 = bytes[i++];
                        v3 = bytes[i++];
                        v4 = bytes[i++];
                        v5 = bytes[i++];
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                    }
                    var remain = length - count;
                    if (1 === remain) {
                        v1 = bytes[i];
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======";
                    } else if (2 === remain) {
                        v1 = bytes[i++];
                        v2 = bytes[i];
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                    } else if (3 === remain) {
                        v1 = bytes[i++];
                        v2 = bytes[i++];
                        v3 = bytes[i];
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                    } else if (4 === remain) {
                        v1 = bytes[i++];
                        v2 = bytes[i++];
                        v3 = bytes[i++];
                        v4 = bytes[i];
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                    }
                    return base32Str;
                }, encode = function(input, asciiOnly) {
                    var notString = "string" != typeof input;
                    notString && input.constructor === ArrayBuffer && (input = new Uint8Array(input));
                    return notString ? encodeBytes(input) : asciiOnly ? encodeAscii(input) : encodeUtf8(input);
                }, decode = function(base32Str, asciiOnly) {
                    if (!asciiOnly) return toUtf8String(decodeAsBytes(base32Str));
                    var v1, v2, v3, v4, v5, v6, v7, v8, str = "", length = base32Str.indexOf("=");
                    -1 === length && (length = base32Str.length);
                    for (var i = 0, count = length >> 3 << 3; i < count; ) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3)) + String.fromCharCode(255 & (v7 << 5 | v8));
                    }
                    var remain = length - count;
                    if (2 === remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2));
                    } else if (4 === remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4));
                    } else if (5 === remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1));
                    } else if (7 === remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3));
                    }
                    return str;
                }, exports = {
                    encode: encode,
                    decode: decode
                };
                decode.asBytes = decodeAsBytes;
                if (COMMON_JS) module.exports = exports; else {
                    root.base32 = exports;
                    AMD && void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                        return exports;
                    }.call(exports, __webpack_require__, exports, module)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
                }
            }();
        }).call(exports, __webpack_require__("./node_modules/process/browser.js"), __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/webpack/buildin/module.js")(module));
    },
    "./node_modules/post-robot/src/bridge/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function deleteTunnelWindow(id) {
            try {
                global.a.tunnelWindows[id] && delete global.a.tunnelWindows[id].source;
            } catch (err) {}
            delete global.a.tunnelWindows[id];
        }
        function cleanTunnelWindows() {
            for (var tunnelWindows = global.a.tunnelWindows, _iterator = Object.keys(tunnelWindows), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var key = _ref, tunnelWindow = tunnelWindows[key];
                try {
                    Object(lib.j)(tunnelWindow.source);
                } catch (err) {
                    deleteTunnelWindow(key);
                    continue;
                }
                Object(cross_domain_utils_src.r)(tunnelWindow.source) && deleteTunnelWindow(key);
            }
        }
        function addTunnelWindow(_ref2) {
            var name = _ref2.name, source = _ref2.source, canary = _ref2.canary, sendMessage = _ref2.sendMessage;
            cleanTunnelWindows();
            global.a.tunnelWindowId += 1;
            global.a.tunnelWindows[global.a.tunnelWindowId] = {
                name: name,
                source: source,
                canary: canary,
                sendMessage: sendMessage
            };
            return global.a.tunnelWindowId;
        }
        function getTunnelWindow(id) {
            return global.a.tunnelWindows[id];
        }
        function needsBridgeForBrowser() {
            return !!Object(cross_domain_utils_src.i)(window).match(/MSIE|trident|edge\/12|edge\/13/i) || !conf.a.ALLOW_POSTMESSAGE_POPUP;
        }
        function needsBridgeForWin(win) {
            return !Object(cross_domain_utils_src.p)(window, win);
        }
        function needsBridgeForDomain(domain, win) {
            if (domain) {
                if (Object(cross_domain_utils_src.c)() !== Object(cross_domain_utils_src.d)(domain)) return !0;
            } else if (win && !Object(cross_domain_utils_src.o)(win)) return !0;
            return !1;
        }
        function needsBridge(_ref) {
            var win = _ref.win, domain = _ref.domain;
            return !!needsBridgeForBrowser() && (!(domain && !needsBridgeForDomain(domain, win)) && !(win && !needsBridgeForWin(win)));
        }
        function getBridgeName(domain) {
            domain = domain || Object(cross_domain_utils_src.d)(domain);
            var sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, "_");
            return conf.b.BRIDGE_NAME_PREFIX + "_" + sanitizedDomain;
        }
        function isBridge() {
            return Boolean(window.name && window.name === getBridgeName(Object(cross_domain_utils_src.c)()));
        }
        function registerRemoteWindow(win) {
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : conf.a.BRIDGE_TIMEOUT;
            global.a.remoteWindows.set(win, {
                sendMessagePromise: new src.ZalgoPromise()
            });
        }
        function findRemoteWindow(win) {
            return global.a.remoteWindows.get(win);
        }
        function registerRemoteSendMessage(win, domain, sendMessage) {
            var remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found to register sendMessage to");
            var sendMessageWrapper = function(remoteWin, message, remoteDomain) {
                if (remoteWin !== win) throw new Error("Remote window does not match window");
                if (!Object(cross_domain_utils_src.s)(remoteDomain, domain)) throw new Error("Remote domain " + remoteDomain + " does not match domain " + domain);
                sendMessage(message);
            };
            remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
            remoteWindow.sendMessagePromise = src.ZalgoPromise.resolve(sendMessageWrapper);
        }
        function rejectRemoteSendMessage(win, err) {
            var remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found on which to reject sendMessage");
            remoteWindow.sendMessagePromise.asyncReject(err);
        }
        function sendBridgeMessage(win, message, domain) {
            var messagingChild = Object(cross_domain_utils_src.m)(window, win), messagingParent = Object(cross_domain_utils_src.m)(win, window);
            if (!messagingChild && !messagingParent) throw new Error("Can only send messages to and from parent and popup windows");
            var remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found to send message to");
            return remoteWindow.sendMessagePromise.then(function(sendMessage) {
                return sendMessage(win, message, domain);
            });
        }
        function openTunnelToOpener() {
            return src.ZalgoPromise.try(function() {
                var opener = Object(cross_domain_utils_src.g)(window);
                if (opener && needsBridge({
                    win: opener
                })) {
                    registerRemoteWindow(opener);
                    return awaitRemoteBridgeForWindow(opener).then(function(bridge) {
                        return bridge ? window.name ? bridge[conf.b.WINDOW_PROPS.POSTROBOT].openTunnelToParent({
                            name: window.name,
                            source: window,
                            canary: function() {},
                            sendMessage: function(message) {
                                try {
                                    Object(lib.j)(window);
                                } catch (err) {
                                    return;
                                }
                                if (window && !window.closed) try {
                                    global.a.receiveMessage({
                                        data: message,
                                        origin: this.origin,
                                        source: this.source
                                    });
                                } catch (err) {
                                    src.ZalgoPromise.reject(err);
                                }
                            }
                        }).then(function(_ref2) {
                            var source = _ref2.source, origin = _ref2.origin, data = _ref2.data;
                            if (source !== opener) throw new Error("Source does not match opener");
                            registerRemoteSendMessage(source, origin, data.sendMessage);
                        }).catch(function(err) {
                            rejectRemoteSendMessage(opener, err);
                            throw err;
                        }) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: window does not have a name")) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: no bridge found in opener"));
                    });
                }
            });
        }
        function listenForRegister(source, domain) {
            global.a.on(conf.b.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                window: source,
                domain: domain
            }, function(_ref) {
                var origin = _ref.origin, data = _ref.data;
                if (origin !== domain) throw new Error("Domain " + domain + " does not match origin " + origin);
                if (!data.name) throw new Error("Register window expected to be passed window name");
                if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                if (!global.a.popupWindowsByName[data.name]) throw new Error("Window with name " + data.name + " does not exist, or was not opened by this window");
                if (!global.a.popupWindowsByName[data.name].domain) throw new Error("We do not have a registered domain for window " + data.name);
                if (global.a.popupWindowsByName[data.name].domain !== origin) throw new Error("Message origin " + origin + " does not matched registered window origin " + global.a.popupWindowsByName[data.name].domain);
                registerRemoteSendMessage(global.a.popupWindowsByName[data.name].win, domain, data.sendMessage);
                return {
                    sendMessage: function(message) {
                        if (window && !window.closed) {
                            var winDetails = global.a.popupWindowsByName[data.name];
                            if (winDetails) try {
                                global.a.receiveMessage({
                                    data: message,
                                    origin: winDetails.domain,
                                    source: winDetails.win
                                });
                            } catch (err) {
                                src.ZalgoPromise.reject(err);
                            }
                        }
                    }
                };
            });
        }
        function openBridgeFrame(name, url) {
            lib.i.debug("Opening bridge:", name, url);
            var iframe = document.createElement("iframe");
            iframe.setAttribute("name", name);
            iframe.setAttribute("id", name);
            iframe.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("border", "0");
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("allowTransparency", "true");
            iframe.setAttribute("tabindex", "-1");
            iframe.setAttribute("hidden", "true");
            iframe.setAttribute("title", "");
            iframe.setAttribute("role", "presentation");
            iframe.src = url;
            return iframe;
        }
        function hasBridge(url, domain) {
            domain = domain || Object(cross_domain_utils_src.d)(url);
            return Boolean(global.a.bridges[domain]);
        }
        function openBridge(url, domain) {
            domain = domain || Object(cross_domain_utils_src.d)(url);
            if (global.a.bridges[domain]) return global.a.bridges[domain];
            global.a.bridges[domain] = src.ZalgoPromise.try(function() {
                if (Object(cross_domain_utils_src.c)() === domain) throw new Error("Can not open bridge on the same domain as current domain: " + domain);
                var name = getBridgeName(domain);
                if (Object(cross_domain_utils_src.e)(window, name)) throw new Error("Frame with name " + name + " already exists on page");
                var iframe = openBridgeFrame(name, url);
                global.a.bridgeFrames[domain] = iframe;
                return documentBodyReady.then(function(body) {
                    body.appendChild(iframe);
                    var bridge = iframe.contentWindow;
                    listenForRegister(bridge, domain);
                    return new src.ZalgoPromise(function(resolve, reject) {
                        iframe.onload = resolve;
                        iframe.onerror = reject;
                    }).then(function() {
                        return Object(lib.k)(bridge, conf.a.BRIDGE_TIMEOUT, "Bridge " + url);
                    }).then(function() {
                        return bridge;
                    });
                });
            });
            return global.a.bridges[domain];
        }
        function linkUrl(win, url) {
            var winOptions = global.a.popupWindowsByWin.get(win);
            if (winOptions) {
                winOptions.domain = Object(cross_domain_utils_src.d)(url);
                registerRemoteWindow(win);
            }
        }
        function destroyBridges() {
            for (var _iterator2 = Object.keys(global.a.bridgeFrames), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref3;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref3 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref3 = _i2.value;
                }
                var domain = _ref3, frame = global.a.bridgeFrames[domain];
                frame.parentNode && frame.parentNode.removeChild(frame);
            }
            global.a.bridgeFrames = {};
            global.a.bridges = {};
        }
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), global = __webpack_require__("./node_modules/post-robot/src/global.js");
        global.a.tunnelWindows = global.a.tunnelWindows || {};
        global.a.tunnelWindowId = 0;
        global.a.openTunnelToParent = function(_ref3) {
            var name = _ref3.name, source = _ref3.source, canary = _ref3.canary, sendMessage = _ref3.sendMessage, parentWindow = Object(cross_domain_utils_src.h)(window);
            if (!parentWindow) throw new Error("No parent window found to open tunnel to");
            var id = addTunnelWindow({
                name: name,
                source: source,
                canary: canary,
                sendMessage: sendMessage
            });
            return global.a.send(parentWindow, conf.b.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                name: name,
                sendMessage: function() {
                    var tunnelWindow = getTunnelWindow(id);
                    try {
                        Object(lib.j)(tunnelWindow && tunnelWindow.source);
                    } catch (err) {
                        deleteTunnelWindow(id);
                        return;
                    }
                    if (tunnelWindow && tunnelWindow.source && !Object(cross_domain_utils_src.r)(tunnelWindow.source)) {
                        try {
                            tunnelWindow.canary();
                        } catch (err) {
                            return;
                        }
                        tunnelWindow.sendMessage.apply(this, arguments);
                    }
                }
            }, {
                domain: conf.b.WILDCARD
            });
        };
        var cross_domain_safe_weakmap_src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), documentBodyReady = new src.ZalgoPromise(function(resolve) {
            if (window.document && window.document.body) return resolve(window.document.body);
            var interval = setInterval(function() {
                if (window.document && window.document.body) {
                    clearInterval(interval);
                    return resolve(window.document.body);
                }
            }, 10);
        });
        global.a.remoteWindows = global.a.remoteWindows || new cross_domain_safe_weakmap_src.a();
        var awaitRemoteBridgeForWindow = Object(lib.q)(function(win) {
            return src.ZalgoPromise.try(function() {
                for (var _iterator = Object(cross_domain_utils_src.f)(win), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }
                    var _frame = _ref;
                    try {
                        if (_frame && _frame !== window && Object(cross_domain_utils_src.o)(_frame) && _frame[conf.b.WINDOW_PROPS.POSTROBOT]) return _frame;
                    } catch (err) {
                        continue;
                    }
                }
                try {
                    var frame = Object(cross_domain_utils_src.e)(win, getBridgeName(Object(cross_domain_utils_src.c)()));
                    if (!frame) return;
                    return Object(cross_domain_utils_src.o)(frame) && frame[conf.b.WINDOW_PROPS.POSTROBOT] ? frame : new src.ZalgoPromise(function(resolve) {
                        var interval = void 0, timeout = void 0;
                        interval = setInterval(function() {
                            if (frame && Object(cross_domain_utils_src.o)(frame) && frame[conf.b.WINDOW_PROPS.POSTROBOT]) {
                                clearInterval(interval);
                                clearTimeout(timeout);
                                return resolve(frame);
                            }
                        }, 100);
                        timeout = setTimeout(function() {
                            clearInterval(interval);
                            return resolve();
                        }, 2e3);
                    });
                } catch (err) {
                    return;
                }
            });
        });
        global.a.bridges = global.a.bridges || {};
        global.a.bridgeFrames = global.a.bridgeFrames || {};
        global.a.popupWindowsByWin = global.a.popupWindowsByWin || new cross_domain_safe_weakmap_src.a();
        global.a.popupWindowsByName = global.a.popupWindowsByName || {};
        var windowOpen = window.open;
        window.open = function(url, name, options, last) {
            var domain = url;
            if (url && 0 === url.indexOf(conf.b.MOCK_PROTOCOL)) {
                var _url$split = url.split("|");
                domain = _url$split[0];
                url = _url$split[1];
            }
            domain && (domain = Object(cross_domain_utils_src.d)(domain));
            var win = windowOpen.call(this, url, name, options, last);
            if (!win) return win;
            url && registerRemoteWindow(win);
            for (var _iterator = Object.keys(global.a.popupWindowsByName), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref2 = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref2 = _i.value;
                }
                var winName = _ref2;
                Object(cross_domain_utils_src.r)(global.a.popupWindowsByName[winName].win) && delete global.a.popupWindowsByName[winName];
            }
            if (name && win) {
                var winOptions = global.a.popupWindowsByWin.get(win) || global.a.popupWindowsByName[name] || {};
                winOptions.name = winOptions.name || name;
                winOptions.win = winOptions.win || win;
                winOptions.domain = winOptions.domain || domain;
                global.a.popupWindowsByWin.set(win, winOptions);
                global.a.popupWindowsByName[name] = winOptions;
            }
            return win;
        };
        __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", function() {
            return openTunnelToOpener;
        });
        __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", function() {
            return needsBridgeForBrowser;
        });
        __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", function() {
            return needsBridgeForWin;
        });
        __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", function() {
            return needsBridgeForDomain;
        });
        __webpack_require__.d(__webpack_exports__, "needsBridge", function() {
            return needsBridge;
        });
        __webpack_require__.d(__webpack_exports__, "getBridgeName", function() {
            return getBridgeName;
        });
        __webpack_require__.d(__webpack_exports__, "isBridge", function() {
            return isBridge;
        });
        __webpack_require__.d(__webpack_exports__, "documentBodyReady", function() {
            return documentBodyReady;
        });
        __webpack_require__.d(__webpack_exports__, "registerRemoteWindow", function() {
            return registerRemoteWindow;
        });
        __webpack_require__.d(__webpack_exports__, "findRemoteWindow", function() {
            return findRemoteWindow;
        });
        __webpack_require__.d(__webpack_exports__, "registerRemoteSendMessage", function() {
            return registerRemoteSendMessage;
        });
        __webpack_require__.d(__webpack_exports__, "rejectRemoteSendMessage", function() {
            return rejectRemoteSendMessage;
        });
        __webpack_require__.d(__webpack_exports__, "sendBridgeMessage", function() {
            return sendBridgeMessage;
        });
        __webpack_require__.d(__webpack_exports__, "hasBridge", function() {
            return hasBridge;
        });
        __webpack_require__.d(__webpack_exports__, "openBridge", function() {
            return openBridge;
        });
        __webpack_require__.d(__webpack_exports__, "linkUrl", function() {
            return linkUrl;
        });
        __webpack_require__.d(__webpack_exports__, "destroyBridges", function() {
            return destroyBridges;
        });
    },
    "./node_modules/post-robot/src/compat/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function emulateIERestrictions(sourceWindow, targetWindow) {
            if (!conf.a.ALLOW_POSTMESSAGE_POPUP && !1 === Object(src.p)(sourceWindow, targetWindow)) throw new Error("Can not send and receive post messages between two different windows (disabled to emulate IE)");
        }
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
        __webpack_require__.d(__webpack_exports__, "emulateIERestrictions", function() {
            return emulateIERestrictions;
        });
    },
    "./node_modules/post-robot/src/conf/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var _ALLOWED_POST_MESSAGE, CONSTANTS = {
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
                ERROR: "postrobot_error",
                PROMISE: "postrobot_promise",
                ZALGO_PROMISE: "postrobot_zalgo_promise",
                REGEX: "regex"
            },
            SEND_STRATEGIES: {
                POST_MESSAGE: "postrobot_post_message",
                BRIDGE: "postrobot_bridge",
                GLOBAL: "postrobot_global"
            },
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
            POSTROBOT_PROXY: "__postrobot_proxy__",
            WILDCARD: "*"
        }, POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function(key) {
            return CONSTANTS.POST_MESSAGE_NAMES[key];
        }), CONFIG = {
            ALLOW_POSTMESSAGE_POPUP: !("__ALLOW_POSTMESSAGE_POPUP__" in window) || window.__ALLOW_POSTMESSAGE_POPUP__,
            LOG_LEVEL: "info",
            BRIDGE_TIMEOUT: 5e3,
            CHILD_WINDOW_TIMEOUT: 5e3,
            ACK_TIMEOUT: -1 !== window.navigator.userAgent.match(/MSIE/i) ? 2e3 : 1e3,
            RES_TIMEOUT: 1 / 0,
            LOG_TO_PAGE: !1,
            ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _ALLOWED_POST_MESSAGE[CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = !0, 
            _ALLOWED_POST_MESSAGE[CONSTANTS.SEND_STRATEGIES.BRIDGE] = !0, _ALLOWED_POST_MESSAGE[CONSTANTS.SEND_STRATEGIES.GLOBAL] = !0, 
            _ALLOWED_POST_MESSAGE),
            ALLOW_SAME_ORIGIN: !1
        };
        0 === window.location.href.indexOf(CONSTANTS.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return CONFIG;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return CONSTANTS;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return POST_MESSAGE_NAMES_LIST;
        });
    },
    "./node_modules/post-robot/src/global.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return global;
        });
        var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), global = window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT] = window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT] || {};
        global.registerSelf = function() {};
    },
    "./node_modules/post-robot/src/lib/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function stringifyError(err) {
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
        }
        function noop() {}
        function addEventListener(obj, event, handler) {
            obj.addEventListener ? obj.addEventListener(event, handler) : obj.attachEvent("on" + event, handler);
            return {
                cancel: function() {
                    obj.removeEventListener ? obj.removeEventListener(event, handler) : obj.detachEvent("on" + event, handler);
                }
            };
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            });
        }
        function eachArray(item, callback) {
            for (var i = 0; i < item.length; i++) callback(item[i], i);
        }
        function eachObject(item, callback) {
            for (var _key in item) item.hasOwnProperty(_key) && callback(item[_key], _key);
        }
        function each(item, callback) {
            Array.isArray(item) ? eachArray(item, callback) : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && eachObject(item, callback);
        }
        function replaceObject(item, callback) {
            var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
            if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
            var newobj = void 0;
            if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item || Array.isArray(item)) {
                if (!Array.isArray(item)) throw new Error("Invalid type: " + (void 0 === item ? "undefined" : _typeof(item)));
                newobj = [];
            } else newobj = {};
            each(item, function(childItem, key) {
                var result = callback(childItem, key);
                void 0 !== result ? newobj[key] = result : "object" === (void 0 === childItem ? "undefined" : _typeof(childItem)) && null !== childItem ? newobj[key] = replaceObject(childItem, callback, depth + 1) : newobj[key] = childItem;
            });
            return newobj;
        }
        function safeInterval(method, time) {
            function runInterval() {
                timeout = setTimeout(runInterval, time);
                method.call();
            }
            var timeout = void 0;
            timeout = setTimeout(runInterval, time);
            return {
                cancel: function() {
                    clearTimeout(timeout);
                }
            };
        }
        function isRegex(item) {
            return "[object RegExp]" === Object.prototype.toString.call(item);
        }
        function getWindowType() {
            return Object(cross_domain_utils_src.n)() ? conf.b.WINDOW_TYPES.POPUP : Object(cross_domain_utils_src.l)() ? conf.b.WINDOW_TYPES.IFRAME : conf.b.WINDOW_TYPES.FULLPAGE;
        }
        function jsonStringify(obj, replacer, indent) {
            var objectToJSON = void 0, arrayToJSON = void 0;
            try {
                if ("{}" !== JSON.stringify({})) {
                    objectToJSON = Object.prototype.toJSON;
                    delete Object.prototype.toJSON;
                }
                if ("{}" !== JSON.stringify({})) throw new Error("Can not correctly serialize JSON objects");
                if ("[]" !== JSON.stringify([])) {
                    arrayToJSON = Array.prototype.toJSON;
                    delete Array.prototype.toJSON;
                }
                if ("[]" !== JSON.stringify([])) throw new Error("Can not correctly serialize JSON objects");
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            var result = JSON.stringify.call(this, obj, replacer, indent);
            try {
                objectToJSON && (Object.prototype.toJSON = objectToJSON);
                arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            return result;
        }
        function jsonParse(item) {
            return JSON.parse(item);
        }
        function isSerialized(item, type) {
            return "object" === (void 0 === item ? "undefined" : serialize__typeof(item)) && null !== item && item.__type__ === type;
        }
        function serializeMethod(destination, domain, method, name) {
            var id = uniqueID(), methods = global.a.methods.get(destination);
            if (!methods) {
                methods = {};
                global.a.methods.set(destination, methods);
            }
            methods[id] = {
                domain: domain,
                method: method
            };
            return {
                __type__: conf.b.SERIALIZATION_TYPES.METHOD,
                __id__: id,
                __name__: name
            };
        }
        function serializeError(err) {
            return {
                __type__: conf.b.SERIALIZATION_TYPES.ERROR,
                __message__: stringifyError(err),
                __code__: err.code
            };
        }
        function serializePromise(destination, domain, promise, name) {
            return {
                __type__: conf.b.SERIALIZATION_TYPES.PROMISE,
                __then__: serializeMethod(destination, domain, function(resolve, reject) {
                    return promise.then(resolve, reject);
                }, name + ".then")
            };
        }
        function serializeZalgoPromise(destination, domain, promise, name) {
            return {
                __type__: conf.b.SERIALIZATION_TYPES.ZALGO_PROMISE,
                __then__: serializeMethod(destination, domain, function(resolve, reject) {
                    return promise.then(resolve, reject);
                }, name + ".then")
            };
        }
        function serializeRegex(regex) {
            return {
                __type__: conf.b.SERIALIZATION_TYPES.REGEX,
                __source__: regex.source
            };
        }
        function serializeMethods(destination, domain, obj) {
            return replaceObject({
                obj: obj
            }, function(item, key) {
                return "function" == typeof item ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? serializeError(item) : window.Promise && item instanceof window.Promise ? serializePromise(destination, domain, item, key.toString()) : zalgo_promise_src.ZalgoPromise.isPromise(item) ? serializeZalgoPromise(destination, domain, item, key.toString()) : isRegex(item) ? serializeRegex(item) : void 0;
            }).obj;
        }
        function deserializeMethod(source, origin, obj) {
            function wrapper() {
                var args = Array.prototype.slice.call(arguments);
                log.debug("Call foreign method", obj.__name__, args);
                return global.a.send(source, conf.b.POST_MESSAGE_NAMES.METHOD, {
                    id: obj.__id__,
                    name: obj.__name__,
                    args: args
                }, {
                    domain: origin,
                    timeout: 1 / 0
                }).then(function(_ref2) {
                    var data = _ref2.data;
                    log.debug("Got foreign method result", obj.__name__, data.result);
                    return data.result;
                }, function(err) {
                    log.debug("Got foreign method error", stringifyError(err));
                    throw err;
                });
            }
            wrapper.__name__ = obj.__name__;
            wrapper.__xdomain__ = !0;
            wrapper.source = source;
            wrapper.origin = origin;
            return wrapper;
        }
        function deserializeError(source, origin, obj) {
            var err = new Error(obj.__message__);
            obj.__code__ && (err.code = obj.__code__);
            return err;
        }
        function deserializeZalgoPromise(source, origin, prom) {
            return new zalgo_promise_src.ZalgoPromise(function(resolve, reject) {
                return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
            });
        }
        function deserializePromise(source, origin, prom) {
            return window.Promise ? new window.Promise(function(resolve, reject) {
                return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
            }) : deserializeZalgoPromise(source, origin, prom);
        }
        function deserializeRegex(source, origin, item) {
            return new RegExp(item.__source__);
        }
        function deserializeMethods(source, origin, obj) {
            return replaceObject({
                obj: obj
            }, function(item, key) {
                if ("object" === (void 0 === item ? "undefined" : serialize__typeof(item)) && null !== item) return isSerialized(item, conf.b.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.PROMISE) ? deserializePromise(source, origin, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.ZALGO_PROMISE) ? deserializeZalgoPromise(source, origin, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.REGEX) ? deserializeRegex(source, origin, item) : void 0;
            }).obj;
        }
        function initOnReady() {
            global.a.on(conf.b.POST_MESSAGE_NAMES.READY, {
                domain: conf.b.WILDCARD
            }, function(event) {
                var win = event.source, promise = global.a.readyPromises.get(win);
                if (promise) promise.resolve(event); else {
                    promise = new zalgo_promise_src.ZalgoPromise().resolve(event);
                    global.a.readyPromises.set(win, promise);
                }
            });
            var parent = Object(cross_domain_utils_src.b)();
            parent && global.a.send(parent, conf.b.POST_MESSAGE_NAMES.READY, {}, {
                domain: conf.b.WILDCARD,
                timeout: 1 / 0
            }).catch(function(err) {
                log.debug(stringifyError(err));
            });
        }
        function onWindowReady(win) {
            var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = global.a.readyPromises.get(win);
            if (promise) return promise;
            promise = new zalgo_promise_src.ZalgoPromise();
            global.a.readyPromises.set(win, promise);
            -1 !== timeout && setTimeout(function() {
                return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
            }, timeout);
            return promise;
        }
        var src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, once = function(method) {
            if (!method) return method;
            var called = !1;
            return function() {
                if (!called) {
                    called = !0;
                    return method.apply(this, arguments);
                }
            };
        }, util_weakMapMemoize = function(method) {
            var weakmap = new src.a();
            return function(arg) {
                var result = weakmap.get(arg);
                if (void 0 !== result) return result;
                result = method.call(this, arg);
                void 0 !== result && weakmap.set(arg, result);
                return result;
            };
        }, log__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, LOG_LEVELS = [ "debug", "info", "warn", "error" ];
        Function.prototype.bind && window.console && "object" === log__typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
        var log = {
            clearLogs: function() {
                window.console && window.console.clear && window.console.clear();
                if (conf.a.LOG_TO_PAGE) {
                    var container = document.getElementById("postRobotLogs");
                    container && container.parentNode && container.parentNode.removeChild(container);
                }
            },
            writeToPage: function(level, args) {
                setTimeout(function() {
                    var container = document.getElementById("postRobotLogs");
                    if (!container) {
                        container = document.createElement("div");
                        container.id = "postRobotLogs";
                        container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;";
                        document.body && document.body.appendChild(container);
                    }
                    var el = document.createElement("div"), date = new Date().toString().split(" ")[4], payload = Array.prototype.slice.call(args).map(function(item) {
                        if ("string" == typeof item) return item;
                        if (!item) return Object.prototype.toString.call(item);
                        var json = void 0;
                        try {
                            json = jsonStringify(item, null, 2);
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
                    el.style.cssText = "margin-top: 10px; color: " + color + ";";
                    container.childNodes.length ? container.insertBefore(el, container.childNodes[0]) : container.appendChild(el);
                });
            },
            logLevel: function(level, args) {
                setTimeout(function() {
                    try {
                        var logLevel = window.LOG_LEVEL || conf.a.LOG_LEVEL;
                        if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) return;
                        args = Array.prototype.slice.call(args);
                        args.unshift("" + window.location.host + window.location.pathname);
                        args.unshift("::");
                        args.unshift("" + getWindowType().toLowerCase());
                        args.unshift("[post-robot]");
                        conf.a.LOG_TO_PAGE && log.writeToPage(level, args);
                        if (!window.console) return;
                        window.console[level] || (level = "log");
                        if (!window.console[level]) return;
                        window.console[level].apply(window.console, args);
                    } catch (err) {}
                }, 1);
            },
            debug: function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                log.logLevel("debug", args);
            },
            info: function() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                log.logLevel("info", args);
            },
            warn: function() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
                log.logLevel("warn", args);
            },
            error: function() {
                for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
                log.logLevel("error", args);
            }
        }, zalgo_promise_src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), global = __webpack_require__("./node_modules/post-robot/src/global.js"), serialize__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        global.a.methods = global.a.methods || new src.a();
        var listenForMethods = once(function() {
            global.a.on(conf.b.POST_MESSAGE_NAMES.METHOD, {
                origin: conf.b.WILDCARD
            }, function(_ref) {
                var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = global.a.methods.get(source);
                if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                var meth = methods[data.id];
                if (!meth) throw new Error("Could not find method with id: " + data.id);
                if (!Object(cross_domain_utils_src.s)(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                log.debug("Call local method", data.name, data.args);
                return zalgo_promise_src.ZalgoPromise.try(function() {
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
        global.a.readyPromises = global.a.readyPromises || new src.a();
        __webpack_require__.d(__webpack_exports__, "o", function() {
            return stringifyError;
        });
        __webpack_require__.d(__webpack_exports__, "l", function() {
            return once;
        });
        __webpack_require__.d(__webpack_exports__, "j", function() {
            return noop;
        });
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return addEventListener;
        });
        __webpack_require__.d(__webpack_exports__, "p", function() {
            return uniqueID;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return eachArray;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return eachObject;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return each;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return replaceObject;
        });
        __webpack_require__.d(__webpack_exports__, "m", function() {
            return safeInterval;
        });
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return isRegex;
        });
        __webpack_require__.d(__webpack_exports__, "q", function() {
            return util_weakMapMemoize;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return getWindowType;
        });
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return jsonStringify;
        });
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return jsonParse;
        });
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return log;
        });
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return listenForMethods;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return serializeMethod;
        });
        __webpack_require__.d(__webpack_exports__, "n", function() {
            return serializeMethods;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return deserializeMethod;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return deserializeError;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return deserializeZalgoPromise;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return deserializePromise;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return deserializeRegex;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return deserializeMethods;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return initOnReady;
        });
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return onWindowReady;
        });
    },
    "./node_modules/process/browser.js": function(module, exports) {
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        function cleanUpNextTick() {
            if (draining && currentQueue) {
                draining = !1;
                currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
                queue.length && drainQueue();
            }
        }
        function drainQueue() {
            if (!draining) {
                var timeout = runTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len; ) {
                    currentQueue = queue;
                    queue = [];
                    for (;++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1;
                    len = queue.length;
                }
                currentQueue = null;
                draining = !1;
                runClearTimeout(timeout);
            }
        }
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        function noop() {}
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
        !function() {
            try {
                cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }();
        var currentQueue, queue = [], draining = !1, queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args));
            1 !== queue.length || draining || runTimeout(drainQueue);
        };
        Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = !0;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;
        process.listeners = function(name) {
            return [];
        };
        process.binding = function(name) {
            throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
            return "/";
        };
        process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
            return 0;
        };
    },
    "./node_modules/webpack/buildin/amd-define.js": function(module, exports) {
        module.exports = function() {
            throw new Error("define cannot be used indirect");
        };
    },
    "./node_modules/webpack/buildin/amd-options.js": function(module, exports) {
        (function(__webpack_amd_options__) {
            module.exports = __webpack_amd_options__;
        }).call(exports, {});
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
    "./node_modules/webpack/buildin/module.js": function(module, exports) {
        module.exports = function(module) {
            if (!module.webpackPolyfill) {
                module.deprecate = function() {};
                module.paths = [];
                module.children || (module.children = []);
                Object.defineProperty(module, "loaded", {
                    enumerable: !0,
                    get: function() {
                        return module.l;
                    }
                });
                Object.defineProperty(module, "id", {
                    enumerable: !0,
                    get: function() {
                        return module.i;
                    }
                });
                module.webpackPolyfill = 1;
            }
            return module;
        };
    },
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
    "./src/button/template/componentTemplate.jsx": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function labelToFunding(label) {
            return label ? LABEL_TO_FUNDING[label] : FUNDING.PAYPAL;
        }
        function fundingToDefaultLabel(funding) {
            return FUNDING_TO_DEFAULT_LABEL[funding];
        }
        function getConfig(conf, category, key, def) {
            var categoryConfig = conf[category];
            if (categoryConfig && categoryConfig.hasOwnProperty(key)) return categoryConfig[key];
            if (conf[DEFAULT] && conf[DEFAULT].hasOwnProperty(key)) return conf[DEFAULT][key];
            if (arguments.length >= 4) return def;
            throw new Error("No value found for " + category + ":" + key);
        }
        function getButtonConfig(label, key, def) {
            return getConfig(BUTTON_CONFIG, label, key, def);
        }
        function config_getConfig(conf, category, key, def) {
            var categoryConfig = conf[category];
            if (categoryConfig && categoryConfig.hasOwnProperty(key)) return categoryConfig[key];
            if (conf[DEFAULT] && conf[DEFAULT].hasOwnProperty(key)) return conf[DEFAULT][key];
            if (arguments.length >= 4) return def;
            throw new Error("No value found for " + category + ":" + key);
        }
        function getFundingConfig(source, key, def) {
            return config_getConfig(FUNDING_CONFIG, source, key, def);
        }
        function getCardConfig(source, key, def) {
            return config_getConfig(CARD_CONFIG, source, key, def);
        }
        function isFundingEligible(source, _ref) {
            var locale = _ref.locale, funding = _ref.funding, env = _ref.env, layout = _ref.layout;
            if (source === _ref.selected) return {
                eligible: !0,
                reason: FUNDING_ELIGIBILITY_REASON.PRIMARY
            };
            if (!(getFundingConfig(source, "enabled") || env === misc_ENV.TEST && getFundingConfig(source, "test"))) return {
                eligible: !1,
                reason: FUNDING_ELIGIBILITY_REASON.NOT_ENABLED
            };
            var isVertical = layout === BUTTON_LAYOUT.VERTICAL;
            return getFundingConfig(source, isVertical ? "allowVertical" : "allowHorizontal") ? -1 !== funding.disallowed.indexOf(source) && getFundingConfig(source, "allowOptOut") ? {
                eligible: !1,
                reason: FUNDING_ELIGIBILITY_REASON.OPT_OUT
            } : -1 !== funding.disallowed.indexOf(source) && source === FUNDING.VENMO ? {
                eligible: !1,
                reason: FUNDING_ELIGIBILITY_REASON.OPT_OUT
            } : -1 === getFundingConfig(source, "allowedCountries", [ locale.country ]).indexOf(locale.country) ? {
                eligible: !1,
                reason: FUNDING_ELIGIBILITY_REASON.DISALLOWED_COUNTRY
            } : -1 !== getFundingConfig(source, "defaultCountries", []).indexOf(locale.country) ? {
                eligible: !0,
                reason: FUNDING_ELIGIBILITY_REASON.DEFAULT_COUNTRY
            } : isVertical && -1 !== getFundingConfig(source, "defaultVerticalCountries", []).indexOf(locale.country) ? {
                eligible: !0,
                reason: FUNDING_ELIGIBILITY_REASON.DEFAULT_COUNTRY
            } : getFundingConfig(source, "default") ? {
                eligible: !0,
                reason: FUNDING_ELIGIBILITY_REASON.DEFAULT
            } : -1 !== funding.allowed.indexOf(source) && getFundingConfig(source, "allowOptIn") ? {
                eligible: !0,
                reason: FUNDING_ELIGIBILITY_REASON.OPT_IN
            } : -1 !== funding.remembered.indexOf(source) && getFundingConfig(source, "allowRemember") ? {
                eligible: !0,
                reason: FUNDING_ELIGIBILITY_REASON.REMEMBERED
            } : {
                eligible: !1,
                reason: FUNDING_ELIGIBILITY_REASON.NEED_OPT_IN
            } : {
                eligible: !1,
                reason: FUNDING_ELIGIBILITY_REASON.SECONDARY_DISALLOWED
            };
        }
        function determineEligibleFunding(_ref2) {
            var funding = _ref2.funding, selected = _ref2.selected, locale = _ref2.locale, env = _ref2.env, layout = _ref2.layout, reasons = {}, eligibleFunding = FUNDING_PRIORITY.filter(function(source) {
                var _isFundingEligible = isFundingEligible(source, {
                    selected: selected,
                    locale: locale,
                    funding: funding,
                    env: env,
                    layout: layout
                }), eligible = _isFundingEligible.eligible, reason = _isFundingEligible.reason;
                reasons[source] = {
                    eligible: eligible,
                    reason: reason,
                    factors: {
                        env: env,
                        locale: locale,
                        layout: layout
                    }
                };
                return eligible;
            });
            fundingEligibilityReasons.push(reasons);
            eligibleFunding.splice(eligibleFunding.indexOf(selected), 1);
            eligibleFunding.unshift(selected);
            return eligibleFunding;
        }
        function determineEligibleCards(_ref3) {
            var funding = _ref3.funding;
            return getCardConfig(_ref3.locale.country, "priority").filter(function(card) {
                return -1 === funding.disallowed.indexOf(card);
            });
        }
        function getUserAgent() {
            return window.navigator.mockUserAgent || window.navigator.userAgent;
        }
        function isIEIntranet() {
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
        }
        function memoize(method) {
            var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, cache = {};
            return function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                var key = void 0;
                try {
                    key = JSON.stringify(Array.prototype.slice.call(arguments));
                } catch (err) {
                    throw new Error("Arguments not serializable -- can not be used to memoize");
                }
                var time = options.time;
                cache[key] && time && Date.now() - cache[key].time < time && delete cache[key];
                window.__CACHE_START_TIME__ && cache[key] && cache[key].time < window.__CACHE_START_TIME__ && delete cache[key];
                if (cache[key]) return cache[key].value;
                cache[key] = {
                    time: Date.now(),
                    value: method.apply(this, arguments)
                };
                return cache[key].value;
            };
        }
        function noop() {}
        function once(method) {
            var called = !1;
            return function() {
                if (!called) {
                    called = !0;
                    return method.apply(this, arguments);
                }
            };
        }
        function perc(pixels, percentage) {
            return Math.round(pixels * percentage / 100);
        }
        function util_max() {
            return Math.max.apply(Math, arguments);
        }
        function regexMap(str, regex, handler) {
            var results = [];
            str.replace(regex, function() {
                results.push(handler.apply(null, arguments));
            });
            return results;
        }
        function buildMessage(win, message) {
            var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = Object(lib.p)(), type = Object(lib.c)(), sourceDomain = Object(cross_domain_utils_src.c)(window);
            return _extends({}, message, options, {
                sourceDomain: sourceDomain,
                id: message.id || id,
                windowType: type
            });
        }
        function sendMessage(win, message, domain) {
            return zalgo_promise_src.ZalgoPromise.try(function() {
                var _jsonStringify;
                message = buildMessage(win, message, {
                    data: Object(lib.n)(win, domain, message.data),
                    domain: domain
                });
                var level = void 0;
                level = -1 !== src_conf.c.indexOf(message.name) || message.type === src_conf.b.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                lib.i.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || src_conf.b.WILDCARD, "\n\n", message ]);
                if (win === window && !src_conf.a.ALLOW_SAME_ORIGIN) throw new Error("Attemping to send message to self");
                if (Object(cross_domain_utils_src.r)(win)) throw new Error("Window is closed");
                lib.i.debug("Running send message strategies", message);
                var messages = [], serializedMessage = Object(lib.g)((_jsonStringify = {}, _jsonStringify[src_conf.b.WINDOW_PROPS.POSTROBOT] = message, 
                _jsonStringify), null, 2);
                return zalgo_promise_src.ZalgoPromise.map(Object.keys(SEND_MESSAGE_STRATEGIES), function(strategyName) {
                    return zalgo_promise_src.ZalgoPromise.try(function() {
                        if (!src_conf.a.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                        return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                    }).then(function() {
                        messages.push(strategyName + ": success");
                        return !0;
                    }, function(err) {
                        messages.push(strategyName + ": " + Object(lib.o)(err) + "\n");
                        return !1;
                    });
                }).then(function(results) {
                    var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                    lib.i.debug(status);
                    if (!success) throw new Error(status);
                });
            });
        }
        function addResponseListener(hash, listener) {
            global.a.responseListeners[hash] = listener;
        }
        function getResponseListener(hash) {
            return global.a.responseListeners[hash];
        }
        function deleteResponseListener(hash) {
            delete global.a.responseListeners[hash];
        }
        function markResponseListenerErrored(hash) {
            global.a.erroredResponseListeners[hash] = !0;
        }
        function isResponseListenerErrored(hash) {
            return Boolean(global.a.erroredResponseListeners[hash]);
        }
        function getRequestListener(_ref) {
            var name = _ref.name, win = _ref.win, domain = _ref.domain;
            win === src_conf.b.WILDCARD && (win = null);
            domain === src_conf.b.WILDCARD && (domain = null);
            if (!name) throw new Error("Name required to get request listener");
            var nameListeners = global.a.requestListeners[name];
            if (nameListeners) for (var _arr = [ win, global.a.WINDOW_WILDCARD ], _i = 0; _i < _arr.length; _i++) {
                var winQualifier = _arr[_i], winListeners = winQualifier && nameListeners.get(winQualifier);
                if (winListeners) {
                    if (domain && "string" == typeof domain) {
                        if (winListeners[domain]) return winListeners[domain];
                        if (winListeners[__DOMAIN_REGEX__]) for (var _iterator = winListeners[__DOMAIN_REGEX__], _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref3;
                            if (_isArray) {
                                if (_i2 >= _iterator.length) break;
                                _ref3 = _iterator[_i2++];
                            } else {
                                _i2 = _iterator.next();
                                if (_i2.done) break;
                                _ref3 = _i2.value;
                            }
                            var _ref4 = _ref3, regex = _ref4.regex, listener = _ref4.listener;
                            if (Object(cross_domain_utils_src.s)(regex, domain)) return listener;
                        }
                    }
                    if (winListeners[src_conf.b.WILDCARD]) return winListeners[src_conf.b.WILDCARD];
                }
            }
        }
        function addRequestListener(_ref5, listener) {
            var name = _ref5.name, win = _ref5.win, domain = _ref5.domain;
            if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
            if (Array.isArray(win)) {
                for (var listenersCollection = [], _iterator2 = win, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref6;
                    if (_isArray2) {
                        if (_i3 >= _iterator2.length) break;
                        _ref6 = _iterator2[_i3++];
                    } else {
                        _i3 = _iterator2.next();
                        if (_i3.done) break;
                        _ref6 = _i3.value;
                    }
                    var item = _ref6;
                    listenersCollection.push(addRequestListener({
                        name: name,
                        domain: domain,
                        win: item
                    }, listener));
                }
                return {
                    cancel: function() {
                        for (var _iterator3 = listenersCollection, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                            var _ref7;
                            if (_isArray3) {
                                if (_i4 >= _iterator3.length) break;
                                _ref7 = _iterator3[_i4++];
                            } else {
                                _i4 = _iterator3.next();
                                if (_i4.done) break;
                                _ref7 = _i4.value;
                            }
                            _ref7.cancel();
                        }
                    }
                };
            }
            if (Array.isArray(domain)) {
                for (var _listenersCollection = [], _iterator4 = domain, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref8;
                    if (_isArray4) {
                        if (_i5 >= _iterator4.length) break;
                        _ref8 = _iterator4[_i5++];
                    } else {
                        _i5 = _iterator4.next();
                        if (_i5.done) break;
                        _ref8 = _i5.value;
                    }
                    var _item = _ref8;
                    _listenersCollection.push(addRequestListener({
                        name: name,
                        win: win,
                        domain: _item
                    }, listener));
                }
                return {
                    cancel: function() {
                        for (var _iterator5 = _listenersCollection, _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                            var _ref9;
                            if (_isArray5) {
                                if (_i6 >= _iterator5.length) break;
                                _ref9 = _iterator5[_i6++];
                            } else {
                                _i6 = _iterator5.next();
                                if (_i6.done) break;
                                _ref9 = _i6.value;
                            }
                            _ref9.cancel();
                        }
                    }
                };
            }
            var existingListener = getRequestListener({
                name: name,
                win: win,
                domain: domain
            });
            win && win !== src_conf.b.WILDCARD || (win = global.a.WINDOW_WILDCARD);
            domain = domain || src_conf.b.WILDCARD;
            if (existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === global.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === global.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
            var requestListeners = global.a.requestListeners, nameListeners = requestListeners[name];
            if (!nameListeners) {
                nameListeners = new cross_domain_safe_weakmap_src.a();
                requestListeners[name] = nameListeners;
            }
            var winListeners = nameListeners.get(win);
            if (!winListeners) {
                winListeners = {};
                nameListeners.set(win, winListeners);
            }
            var strDomain = domain.toString(), regexListeners = winListeners[__DOMAIN_REGEX__], regexListener = void 0;
            if (Object(lib.e)(domain)) {
                if (!regexListeners) {
                    regexListeners = [];
                    winListeners[__DOMAIN_REGEX__] = regexListeners;
                }
                regexListener = {
                    regex: domain,
                    listener: listener
                };
                regexListeners.push(regexListener);
            } else winListeners[strDomain] = listener;
            return {
                cancel: function() {
                    if (winListeners) {
                        delete winListeners[strDomain];
                        win && 0 === Object.keys(winListeners).length && nameListeners.delete(win);
                        regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                    }
                }
            };
        }
        function parseMessage(message) {
            var parsedMessage = void 0;
            try {
                parsedMessage = Object(lib.f)(message);
            } catch (err) {
                return;
            }
            if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : receive__typeof(parsedMessage)) && null !== parsedMessage) {
                parsedMessage = parsedMessage[src_conf.b.WINDOW_PROPS.POSTROBOT];
                if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : receive__typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
            }
        }
        function receiveMessage(event) {
            if (!window || window.closed) throw new Error("Message recieved in closed window");
            try {
                if (!event.source) return;
            } catch (err) {
                return;
            }
            var source = event.source, origin = event.origin, data = event.data, message = parseMessage(data);
            if (message) {
                if (!message.sourceDomain || "string" != typeof message.sourceDomain) throw new Error("Expected message to have sourceDomain");
                0 !== message.sourceDomain.indexOf(src_conf.b.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(src_conf.b.FILE_PROTOCOL) || (origin = message.sourceDomain);
                if (-1 === global.a.receivedMessages.indexOf(message.id)) {
                    global.a.receivedMessages.push(message.id);
                    var level = void 0;
                    level = -1 !== src_conf.c.indexOf(message.name) || message.type === src_conf.b.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                    lib.i.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]);
                    if (Object(cross_domain_utils_src.r)(source)) lib.i.debug("Source window is closed - can not send " + message.type + " " + message.name); else {
                        message.data && (message.data = Object(lib.b)(source, origin, message.data));
                        RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
                    }
                }
            }
        }
        function messageListener(event) {
            try {
                event.source;
            } catch (err) {
                return;
            }
            var messageEvent = {
                source: event.source || event.sourceElement,
                origin: event.origin || event.originalEvent && event.originalEvent.origin,
                data: event.data
            };
            try {
                __webpack_require__("./node_modules/post-robot/src/compat/index.js").emulateIERestrictions(messageEvent.source, window);
            } catch (err) {
                return;
            }
            receiveMessage(messageEvent);
        }
        function listenForMessages() {
            Object(lib.a)(window, "message", messageListener);
        }
        function request(options) {
            return zalgo_promise_src.ZalgoPromise.try(function() {
                if (!options.name) throw new Error("Expected options.name");
                var name = options.name, targetWindow = void 0, domain = void 0;
                if ("string" == typeof options.window) {
                    var el = document.getElementById(options.window);
                    if (!el) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be a valid element id");
                    if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                    if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    targetWindow = el.contentWindow;
                } else if (options.window instanceof HTMLIFrameElement) {
                    if ("iframe" !== options.window.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                    if (options.window && !options.window.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    options.window && options.window.contentWindow && (targetWindow = options.window.contentWindow);
                } else targetWindow = options.window;
                if (!targetWindow) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                var win = targetWindow;
                domain = options.domain || src_conf.b.WILDCARD;
                var hash = options.name + "_" + Object(lib.p)();
                if (Object(cross_domain_utils_src.r)(win)) throw new Error("Target window is closed");
                var hasResult = !1, requestPromises = global.a.requestPromises.get(win);
                if (!requestPromises) {
                    requestPromises = [];
                    global.a.requestPromises.set(win, requestPromises);
                }
                var requestPromise = zalgo_promise_src.ZalgoPromise.try(function() {
                    if (Object(cross_domain_utils_src.k)(window, win)) return zalgo_promise_src.ZalgoPromise.resolve(Object(lib.k)(win, options.timeout || src_conf.a.CHILD_WINDOW_TIMEOUT));
                }).then(function() {
                    return new zalgo_promise_src.ZalgoPromise(function(resolve, reject) {
                        var responseListener = void 0;
                        if (!options.fireAndForget) {
                            responseListener = {
                                name: name,
                                window: win,
                                domain: domain,
                                respond: function(err, result) {
                                    if (!err) {
                                        hasResult = !0;
                                        requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                                    }
                                    err ? reject(err) : resolve(result);
                                }
                            };
                            addResponseListener(hash, responseListener);
                        }
                        sendMessage(win, {
                            type: src_conf.b.POST_MESSAGE_TYPE.REQUEST,
                            hash: hash,
                            name: name,
                            data: options.data,
                            fireAndForget: options.fireAndForget
                        }, domain).catch(reject);
                        if (options.fireAndForget) return resolve();
                        var ackTimeout = src_conf.a.ACK_TIMEOUT, resTimeout = options.timeout || src_conf.a.RES_TIMEOUT, cycleTime = 100, cycle = function cycle() {
                            if (!hasResult) {
                                if (Object(cross_domain_utils_src.r)(win)) return reject(responseListener.ack ? new Error("Window closed for " + name + " before response") : new Error("Window closed for " + name + " before ack"));
                                ackTimeout -= cycleTime;
                                resTimeout -= cycleTime;
                                if (responseListener.ack) {
                                    if (resTimeout === 1 / 0) return;
                                    cycleTime = Math.min(resTimeout, 2e3);
                                } else {
                                    if (ackTimeout <= 0) return reject(new Error("No ack for postMessage " + name + " in " + Object(cross_domain_utils_src.c)() + " in " + src_conf.a.ACK_TIMEOUT + "ms"));
                                    if (resTimeout <= 0) return reject(new Error("No response for postMessage " + name + " in " + Object(cross_domain_utils_src.c)() + " in " + (options.timeout || src_conf.a.RES_TIMEOUT) + "ms"));
                                }
                                setTimeout(cycle, cycleTime);
                            }
                        };
                        setTimeout(cycle, cycleTime);
                    });
                });
                requestPromise.catch(function() {
                    markResponseListenerErrored(hash);
                    deleteResponseListener(hash);
                });
                requestPromises.push(requestPromise);
                return requestPromise;
            });
        }
        function _send(window, name, data, options) {
            options = options || {};
            options.window = window;
            options.name = name;
            options.data = data;
            return request(options);
        }
        function sendToParent(name, data, options) {
            var win = Object(cross_domain_utils_src.b)();
            return win ? _send(win, name, data, options) : new zalgo_promise_src.ZalgoPromise(function(resolve, reject) {
                return reject(new Error("Window does not have a parent"));
            });
        }
        function client() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!options.window) throw new Error("Expected options.window");
            var win = options.window;
            return {
                send: function(name, data) {
                    return _send(win, name, data, options);
                }
            };
        }
        function listen(options) {
            if (!options.name) throw new Error("Expected options.name");
            if (!options.handler) throw new Error("Expected options.handler");
            var name = options.name, win = options.window, domain = options.domain, listenerOptions = {
                handler: options.handler,
                handleError: options.errorHandler || function(err) {
                    throw err;
                },
                window: win,
                domain: domain || src_conf.b.WILDCARD,
                name: name
            }, requestListener = addRequestListener({
                name: name,
                win: win,
                domain: domain
            }, listenerOptions);
            if (options.once) {
                var _handler = listenerOptions.handler;
                listenerOptions.handler = Object(lib.l)(function() {
                    requestListener.cancel();
                    return _handler.apply(this, arguments);
                });
            }
            if (listenerOptions.window && options.errorOnClose) var interval = Object(lib.m)(function() {
                if (win && "object" === (void 0 === win ? "undefined" : server__typeof(win)) && Object(cross_domain_utils_src.r)(win)) {
                    interval.cancel();
                    listenerOptions.handleError(new Error("Post message target window is closed"));
                }
            }, 50);
            return {
                cancel: function() {
                    requestListener.cancel();
                }
            };
        }
        function _on(name, options, handler) {
            if ("function" == typeof options) {
                handler = options;
                options = {};
            }
            options = options || {};
            options.name = name;
            options.handler = handler || options.handler;
            return listen(options);
        }
        function server_once(name) {
            var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, handler = arguments[2];
            if ("function" == typeof options) {
                handler = options;
                options = {};
            }
            options = options || {};
            handler = handler || options.handler;
            var errorHandler = options.errorHandler, promise = new zalgo_promise_src.ZalgoPromise(function(resolve, reject) {
                options = options || {};
                options.name = name;
                options.once = !0;
                options.handler = function(event) {
                    resolve(event);
                    if (handler) return handler(event);
                };
                options.errorHandler = function(err) {
                    reject(err);
                    if (errorHandler) return errorHandler(err);
                };
            }), onceListener = listen(options);
            promise.cancel = onceListener.cancel;
            return promise;
        }
        function server_listener() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                on: function(name, handler) {
                    return _on(name, options, handler);
                }
            };
        }
        function disable() {
            delete window[src_conf.b.WINDOW_PROPS.POSTROBOT];
            window.removeEventListener("message", messageListener);
        }
        function cleanUpWindow(win) {
            var requestPromises = global.a.requestPromises.get(win);
            if (requestPromises) for (var _iterator = requestPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var promise = _ref;
                promise.reject(new Error("No response from window - cleaned up"));
            }
            global.a.popupWindowsByWin && global.a.popupWindowsByWin.delete(win);
            global.a.remoteWindows && global.a.remoteWindows.delete(win);
            global.a.requestPromises.delete(win);
            global.a.methods.delete(win);
            global.a.readyPromises.delete(win);
        }
        function init() {
            if (!global.a.initialized) {
                listenForMessages();
                __webpack_require__("./node_modules/post-robot/src/bridge/index.js").openTunnelToOpener();
                Object(lib.d)();
                Object(lib.h)({
                    on: _on,
                    send: _send
                });
            }
            global.a.initialized = !0;
        }
        function util_extend(dest, src) {
            var over = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            dest = dest || {};
            src = src || {};
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
            var headers = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, data = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, _ref = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, _ref$fireAndForget = _ref.fireAndForget, fireAndForget = void 0 !== _ref$fireAndForget && _ref$fireAndForget;
            return new zalgo_promise_src.ZalgoPromise(function(resolve) {
                var XRequest = window.XMLHttpRequest || window.ActiveXObject;
                if (window.XDomainRequest && !isSameDomain(url)) {
                    if (!isSameProtocol(url)) return resolve();
                    XRequest = window.XDomainRequest;
                }
                var req = new XRequest("MSXML2.XMLHTTP.3.0");
                req.open(method.toUpperCase(), url, !0);
                if ("function" == typeof req.setRequestHeader) {
                    req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    req.setRequestHeader("Content-type", "application/json");
                    for (var headerName in headers) headers.hasOwnProperty(headerName) && req.setRequestHeader(headerName, headers[headerName]);
                }
                fireAndForget ? resolve() : req.onreadystatechange = function() {
                    req.readyState > 3 && resolve();
                };
                req.send(JSON.stringify(data).replace(/&/g, "%26"));
            });
        }
        function safeInterval(method, time) {
            function loop() {
                timeout = setTimeout(function() {
                    method();
                    loop();
                }, time);
            }
            var timeout = void 0;
            loop();
            return {
                cancel: function() {
                    clearTimeout(timeout);
                }
            };
        }
        function util_uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            });
        }
        function util_isIE() {
            return Boolean(window.document.documentMode);
        }
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
        function getTransport() {
            return logger_transport;
        }
        function setTransport(newTransport) {
            logger_transport = newTransport;
        }
        function print(level, event, payload) {
            if (!loaded) return setTimeout(function() {
                return print(level, event, payload);
            }, 1);
            if (window.console && window.console.log) {
                var logLevel = window.LOG_LEVEL || config_config.logLevel;
                if (!(logLevels.indexOf(level) > logLevels.indexOf(logLevel))) {
                    payload = payload || {};
                    var args = [ event ];
                    util_isIE() && (payload = JSON.stringify(payload));
                    args.push(payload);
                    (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                    try {
                        window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                    } catch (err) {}
                }
            }
        }
        function immediateFlush() {
            var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$fireAndForget = _ref.fireAndForget, fireAndForget = void 0 !== _ref$fireAndForget && _ref$fireAndForget;
            if (config_config.uri) {
                var hasBuffer = buffer.length, hasTracking = tracking.length;
                if (hasBuffer || hasTracking) {
                    for (var meta = {}, _iterator = metaBuilders, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref2 = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref2 = _i.value;
                        }
                        var builder = _ref2;
                        try {
                            util_extend(meta, builder(meta), !1);
                        } catch (err) {
                            console.error("Error in custom meta builder:", err.stack || err.toString());
                        }
                    }
                    for (var headers = {}, _iterator2 = headerBuilders, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref3 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref3 = _i2.value;
                        }
                        var _builder = _ref3;
                        try {
                            util_extend(headers, _builder(headers), !1);
                        } catch (err) {
                            console.error("Error in custom header builder:", err.stack || err.toString());
                        }
                    }
                    var events = buffer, req = logger_transport(headers, {
                        events: events,
                        meta: meta,
                        tracking: tracking
                    }, {
                        fireAndForget: fireAndForget
                    });
                    buffer = [];
                    tracking = [];
                    return req;
                }
            }
        }
        function enqueue(level, event, payload) {
            buffer.push({
                level: level,
                event: event,
                payload: payload
            });
            config_config.autoLog.indexOf(level) > -1 && _flush();
        }
        function logger_log(level, event, payload) {
            config_config.prefix && (event = config_config.prefix + "_" + event);
            payload = payload || {};
            "string" == typeof payload ? payload = {
                message: payload
            } : payload instanceof Error && (payload = {
                error: payload.stack || payload.toString()
            });
            try {
                JSON.stringify(payload);
            } catch (err) {
                return;
            }
            payload.timestamp = Date.now();
            for (var _iterator3 = payloadBuilders, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                var _ref4;
                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref4 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref4 = _i3.value;
                }
                var builder = _ref4;
                try {
                    util_extend(payload, builder(payload), !1);
                } catch (err) {
                    console.error("Error in custom payload builder:", err.stack || err.toString());
                }
            }
            config_config.silent || print(level, event, payload);
            buffer.length === config_config.sizeLimit ? enqueue("info", "logger_max_buffer_length") : buffer.length < config_config.sizeLimit && enqueue(level, event, payload);
        }
        function logger_prefix(name) {
            return {
                debug: function(event, payload) {
                    return logger_log("debug", name + "_" + event, payload);
                },
                info: function(event, payload) {
                    return logger_log("info", name + "_" + event, payload);
                },
                warn: function(event, payload) {
                    return logger_log("warn", name + "_" + event, payload);
                },
                error: function(event, payload) {
                    return logger_log("error", name + "_" + event, payload);
                },
                track: function(payload) {
                    return _track(payload);
                },
                flush: function() {
                    return _flush();
                }
            };
        }
        function debug(event, payload) {
            return logger_log("debug", event, payload);
        }
        function info(event, payload) {
            return logger_log("info", event, payload);
        }
        function warn(event, payload) {
            return logger_log("warn", event, payload);
        }
        function logger_error(event, payload) {
            return logger_log("error", event, payload);
        }
        function _track(payload) {
            if (payload) {
                try {
                    JSON.stringify(payload);
                } catch (err) {
                    return;
                }
                for (var _iterator4 = trackingBuilders, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref5;
                    if (_isArray4) {
                        if (_i4 >= _iterator4.length) break;
                        _ref5 = _iterator4[_i4++];
                    } else {
                        _i4 = _iterator4.next();
                        if (_i4.done) break;
                        _ref5 = _i4.value;
                    }
                    var builder = _ref5;
                    try {
                        util_extend(payload, builder(payload), !1);
                    } catch (err) {
                        console.error("Error in custom tracking builder:", err.stack || err.toString());
                    }
                }
                print("debug", "tracking", payload);
                tracking.push(payload);
            }
        }
        function performance_now() {
            return enablePerformance ? performance.now() : Date.now();
        }
        function timer(startTime) {
            startTime = void 0 !== startTime ? startTime : performance_now();
            return {
                startTime: startTime,
                elapsed: function() {
                    return parseInt(performance_now() - startTime, 10);
                },
                reset: function() {
                    startTime = performance_now();
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
            safeInterval(function() {
                if (!(config_config.heartbeatMaxThreshold && heartbeatCount > config_config.heartbeatMaxThreshold)) {
                    heartbeatCount += 1;
                    var elapsed = heartBeatTimer.elapsed(), lag = elapsed - config_config.heartbeatInterval, heartbeatPayload = {
                        count: heartbeatCount,
                        elapsed: elapsed
                    };
                    if (config_config.heartbeatTooBusy) {
                        heartbeatPayload.lag = lag;
                        lag >= config_config.heartbeatTooBusyThreshold && info("toobusy", heartbeatPayload, {
                            noConsole: !config_config.heartbeatConsoleLog
                        });
                    }
                    info("heartbeat", heartbeatPayload, {
                        noConsole: !config_config.heartbeatConsoleLog
                    });
                }
            }, config_config.heartbeatInterval);
        }
        function initPerformance() {
            if (!enablePerformance) return info("no_performance_data");
            addPayloadBuilder(function() {
                var payload = {};
                payload.client_elapsed = clientTimer.elapsed();
                enablePerformance && (payload.req_elapsed = reqTimer.elapsed());
                return payload;
            });
            windowReady.then(function() {
                var keys = [ "connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart" ], timing = {};
                keys.forEach(function(key) {
                    timing[key] = parseInt(window.performance.timing[key], 10) || 0;
                });
                var offset = timing.connectEnd - timing.navigationStart;
                timing.connectEnd && Object.keys(timing).forEach(function(name) {
                    var time = timing[name];
                    time && info("timing_" + name, {
                        client_elapsed: parseInt(time - timing.connectEnd - (clientTimer.startTime - offset), 10),
                        req_elapsed: parseInt(time - timing.connectEnd, 10)
                    });
                });
                info("timing", timing);
                info("memory", window.performance.memory);
                info("navigation", window.performance.navigation);
                window.performance.getEntries && window.performance.getEntries().forEach(function(resource) {
                    [ "link", "script", "img", "css" ].indexOf(resource.initiatorType) > -1 && info(resource.initiatorType, resource);
                });
            });
        }
        function init_init(conf) {
            util_extend(config_config, conf || {});
            if (!initiated) {
                initiated = !0;
                config_config.logPerformance && initPerformance();
                config_config.heartbeat && initHeartBeat();
                if (config_config.logUnload) {
                    window.addEventListener("beforeunload", function() {
                        info("window_beforeunload");
                        immediateFlush({
                            fireAndForget: !0
                        });
                    });
                    window.addEventListener("unload", function() {
                        info("window_unload");
                        immediateFlush({
                            fireAndForget: !0
                        });
                    });
                }
                config_config.flushInterval && setInterval(_flush, config_config.flushInterval);
                if (window.beaverLogQueue) {
                    window.beaverLogQueue.forEach(function(payload) {
                        logger_log(payload.level, payload.event, payload);
                    });
                    delete window.beaverLogQueue;
                }
            }
        }
        function startTransition() {
            startTime = performance_now();
        }
        function endTransition(toState) {
            startTime = startTime || reqStartElapsed();
            var currentTime = performance_now(), elapsedTime = void 0;
            void 0 !== startTime && (elapsedTime = parseInt(currentTime - startTime, 0));
            var transitionName = "transition_" + currentState + "_to_" + toState;
            info(transitionName, {
                duration: elapsedTime
            });
            _track({
                transition: transitionName,
                transition_time: elapsedTime
            });
            immediateFlush();
            startTime = currentTime;
            currentState = toState;
            pageID = util_uniqueID();
        }
        function transition(toState) {
            startTransition();
            endTransition(toState);
        }
        function isDocumentReady() {
            return Boolean(document.body) && "complete" === document.readyState;
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
        function extendUrl(url) {
            var params = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, hasHash = url.indexOf("#") > 0, _url$split = url.split("#"), serverUrl = _url$split[0], hash = _url$split[1];
            if (hash && !serverUrl) {
                var _ref3 = [ "#" + hash, "" ];
                serverUrl = _ref3[0];
                hash = _ref3[1];
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
        }
        function htmlEncode() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
        }
        function proxyMethod(name, win, originalMethod) {
            if (win && Object(cross_domain_utils_src.c)() === config.paypalDomain && !Object(cross_domain_utils_src.o)(win)) {
                win && _send(win, "proxy_" + name, {
                    originalMethod: originalMethod
                }).catch(noop);
                return originalMethod;
            }
            var methods = [];
            _on("proxy_" + name, {
                domain: config.paypal_domain_regex
            }, function(_ref) {
                var data = _ref.data;
                methods.push(data.originalMethod);
            });
            return function() {
                var _this = this, _arguments = arguments;
                methods = methods.filter(function(method) {
                    return !Object(cross_domain_utils_src.r)(method.source);
                });
                return methods.length ? methods[methods.length - 1].apply(this, arguments).catch(function() {
                    return originalMethod.apply(_this, _arguments);
                }) : originalMethod.apply(this, arguments);
            };
        }
        function getBowser() {
            var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$clearCache = _ref.clearCache, clearCache = void 0 !== _ref$clearCache && _ref$clearCache, userAgent = getUserAgent();
            if (bowserCache[userAgent]) return bowserCache[userAgent];
            clearCache && delete __webpack_require__.c["./node_modules/bowser/bowser.min.js"];
            var bowser = __webpack_require__("./node_modules/bowser/bowser.min.js");
            bowserCache[userAgent] = bowser;
            return bowser;
        }
        function parseHeaders() {
            for (var rawHeaders = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", result = {}, _iterator = rawHeaders.trim().split("\n"), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var line = _ref, _line$split = line.split(":"), _key = _line$split[0], values = _line$split.slice(1);
                result[_key.toLowerCase()] = values.join(":").trim();
            }
            return result;
        }
        function http_request(_ref2) {
            var url = _ref2.url, _ref2$method = _ref2.method, method = void 0 === _ref2$method ? "get" : _ref2$method, _ref2$headers = _ref2.headers, headers = void 0 === _ref2$headers ? {} : _ref2$headers, json = _ref2.json, data = _ref2.data, body = _ref2.body, _ref2$win = _ref2.win, win = void 0 === _ref2$win ? window : _ref2$win, _ref2$timeout = _ref2.timeout, timeout = void 0 === _ref2$timeout ? 0 : _ref2$timeout;
            return "/demo/checkout/api/braintree/client-token/" === url ? zalgo_promise_src.ZalgoPromise.resolve("eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJjMDFhZmRkM2Y1OTJmNWVhNTNlMzE5MWQwYmIyMWVjYjM5NzNlZGM1MzkwNDZiMjJmNTA2ODEyNzIzZmRlMTJifGNsaWVudF9pZD1jbGllbnRfaWQkc2FuZGJveCQ0ZHByYmZjNnBoNTk1Y2NqXHUwMDI2Y3JlYXRlZF9hdD0yMDE3LTA0LTI2VDIzOjI2OjU5Ljg3OTA3ODYwNiswMDAwXHUwMDI2bWVyY2hhbnRfaWQ9M3cydHR2d2QyNDY1NDhoZCIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy8zdzJ0dHZ3ZDI0NjU0OGhkL2NsaWVudF9hcGkvdjEvY29uZmlndXJhdGlvbiIsImNoYWxsZW5nZXMiOltdLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvM3cydHR2d2QyNDY1NDhoZC9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9jbGllbnQtYW5hbHl0aWNzLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20vM3cydHR2d2QyNDY1NDhoZCJ9LCJ0aHJlZURTZWN1cmVFbmFibGVkIjpmYWxzZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiYmFyY28uMDMtZmFjaWxpdGF0b3JAZ21haWwuY29tIiwiY2xpZW50SWQiOiJBV3VZdnFnMGtaN2Y5S0V4TVpqZU53T3RjQV8yZVhnOWpMZy1QSnBGX0pnYk44M0YyVml5aEdnV2JCNDg4RGU3MFpucGRBZEI2TUNqekNqSyIsInByaXZhY3lVcmwiOiJodHRwczovL2V4YW1wbGUuY29tIiwidXNlckFncmVlbWVudFVybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJVU0QiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6IjN3MnR0dndkMjQ2NTQ4aGQiLCJ2ZW5tbyI6Im9mZiJ9") : new zalgo_promise_src.ZalgoPromise(function(resolve, reject) {
                if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
                for (var normalizedHeaders = {}, _iterator2 = Object.keys(headers), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref3 = _iterator2[_i2++];
                    } else {
                        _i2 = _iterator2.next();
                        if (_i2.done) break;
                        _ref3 = _i2.value;
                    }
                    var _key3 = _ref3;
                    normalizedHeaders[_key3.toLowerCase()] = headers[_key3];
                }
                json ? normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/json" : (data || body) && (normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/x-www-form-urlencoded; charset=utf-8");
                normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || "application/json";
                for (var _iterator3 = http_headerBuilders, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref4;
                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref4 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref4 = _i3.value;
                    }
                    for (var headerBuilder = _ref4, builtHeaders = headerBuilder(), _iterator4 = Object.keys(builtHeaders), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                        var _ref5;
                        if (_isArray4) {
                            if (_i4 >= _iterator4.length) break;
                            _ref5 = _iterator4[_i4++];
                        } else {
                            _i4 = _iterator4.next();
                            if (_i4.done) break;
                            _ref5 = _i4.value;
                        }
                        var _key4 = _ref5;
                        normalizedHeaders[_key4.toLowerCase()] = builtHeaders[_key4];
                    }
                }
                var xhr = new win.XMLHttpRequest();
                xhr.addEventListener("load", function() {
                    var responseHeaders = parseHeaders(this.getAllResponseHeaders()), corrID = responseHeaders["paypal-debug-id"] || "unknown";
                    responseHeaders["paypal-debug-id"] && corrids.push(responseHeaders["paypal-debug-id"]);
                    if (!this.status) return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code. Correlation id: " + corrID));
                    var contentType = responseHeaders["content-type"], isJSON = contentType && (0 === contentType.indexOf("application/json") || 0 === contentType.indexOf("text/json")), res = this.responseText;
                    try {
                        res = JSON.parse(this.responseText);
                    } catch (err) {
                        if (isJSON) return reject(new Error("Invalid json: " + this.responseText + ". Correlation id: " + corrID));
                    }
                    if (this.status >= 400) {
                        var message = "Request to " + method.toLowerCase() + " " + url + " failed with " + this.status + " error. Correlation id: " + corrID;
                        if (res) {
                            "object" === (void 0 === res ? "undefined" : http__typeof(res)) && null !== res && (res = JSON.stringify(res, null, 4));
                            message = message + "\n\n" + res + "\n";
                        }
                        return reject(new Error(message));
                    }
                    return resolve(res);
                }, !1);
                xhr.addEventListener("error", function(evt) {
                    var corrID = this.getResponseHeader("paypal-debug-id");
                    reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + ". Correlation id: " + corrID));
                }, !1);
                xhr.open(method, url, !0);
                for (var _key2 in normalizedHeaders) normalizedHeaders.hasOwnProperty(_key2) && xhr.setRequestHeader(_key2, normalizedHeaders[_key2]);
                json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map(function(key) {
                    return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
                }).join("&"));
                xhr.timeout = timeout;
                xhr.ontimeout = function() {
                    reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
                };
                xhr.send(body);
            });
        }
        function isPayPalObjects() {
            return Boolean(getCurrentScript());
        }
        function getScriptVersion() {
            return isPayPalObjects() ? "4" : "4.0.175";
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
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function jsxToHTML(name, props) {
            for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
            return new jsx_JsxHTMLNode(name, props, children);
        }
        function jsxRender(template, renderers) {
            var nodes = regexMap(template, /\{\s*([a-z]+)(?::\s*([^} ]+))?\s*\}|([^${}]+)/g, function(match, type, value, text) {
                if (type) {
                    if (!renderers[type]) throw new Error("Can not render type: " + type);
                    return renderers[type](value);
                }
                return text && text.trim() && renderers.text ? renderers.text(text) : text;
            });
            return new JsxHTMLNodeContainer(nodes);
        }
        function parseLocale(locale) {
            var _locale$split = locale.split("_"), lang = _locale$split[0];
            return {
                country: _locale$split[1],
                lang: lang
            };
        }
        function determineMaxButtons(_ref) {
            var label = _ref.label, layout = _ref.layout, max = _ref.max;
            if (!(layout === BUTTON_LAYOUT.HORIZONTAL ? getButtonConfig(label, "allowPrimaryHorizontal") : getButtonConfig(label, "allowPrimaryVertical"))) return 1;
            var configMax = layout === BUTTON_LAYOUT.HORIZONTAL ? getButtonConfig(label, "maxHorizontalButtons") : getButtonConfig(label, "maxVerticalButtons");
            return max ? Math.min(configMax, max) : configMax;
        }
        function enableTagline(_ref2) {
            var tagline = _ref2.tagline, branding = _ref2.branding, fundingicons = _ref2.fundingicons, layout = _ref2.layout;
            return Boolean(tagline && branding && !fundingicons && layout === BUTTON_LAYOUT.HORIZONTAL);
        }
        function validateButtonLocale(locale) {
            if (!locale) throw new Error("Expected props.locale to be set");
            if (!locale.match(/^[a-z]{2}[_][A-Z][A-Z0-9]$/)) throw new Error("Expected props.locale to be valid, got " + locale);
            var _locale$split = locale.split("_"), lang = _locale$split[0], country = _locale$split[1];
            if (!config.locales[country] || -1 === config.locales[country].indexOf(lang)) throw new Error("Expected props.locale to be valid");
        }
        function validateButtonStyle() {
            var style = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!style) throw new Error("Expected props.style to be set");
            var label = style[BUTTON_STYLE_OPTIONS.LABEL] || getButtonConfig("DEFAULT", style[BUTTON_STYLE_OPTIONS.LAYOUT] === BUTTON_LAYOUT.VERTICAL ? "defaultVerticalLabel" : "defaultLabel");
            if (!BUTTON_CONFIG[label]) throw new Error("Invalid button label: " + label + ", expected: " + Object.keys(BUTTON_CONFIG[label]).join(", "));
            var color = style[BUTTON_STYLE_OPTIONS.COLOR], shape = style[BUTTON_STYLE_OPTIONS.SHAPE], size = style[BUTTON_STYLE_OPTIONS.SIZE], branding = style[BUTTON_STYLE_OPTIONS.BRANDING], fundingicons = style[BUTTON_STYLE_OPTIONS.FUNDINGICONS], tagline = style[BUTTON_STYLE_OPTIONS.TAGLINE], layout = style[BUTTON_STYLE_OPTIONS.LAYOUT], maxbuttons = style[BUTTON_STYLE_OPTIONS.MAXBUTTONS], height = style[BUTTON_STYLE_OPTIONS.HEIGHT];
            if (color && -1 === getButtonConfig(label, "colors").indexOf(color)) throw new Error("Unexpected style." + BUTTON_STYLE_OPTIONS.COLOR + " for " + label + " button: " + color + ", expected " + getButtonConfig(label, "colors").join(", "));
            if (shape && -1 === getButtonConfig(label, "shapes").indexOf(shape)) throw new Error("Unexpected style." + BUTTON_STYLE_OPTIONS.SHAPE + " for " + label + " button: " + shape + ", expected " + getButtonConfig(label, "shapes").join(", "));
            if (size && -1 === getButtonConfig(label, "sizes").indexOf(size)) throw new Error("Unexpected style." + BUTTON_STYLE_OPTIONS.SIZE + " for " + label + " button: " + size + ", expected " + getButtonConfig(label, "sizes").join(", "));
            if (!1 === branding) throw new Error("style." + BUTTON_STYLE_OPTIONS.BRANDING + ":false is not allowed");
            if (fundingicons && !getButtonConfig(label, "allowFundingIcons")) throw new Error("style." + BUTTON_STYLE_OPTIONS.FUNDINGICONS + ":true is not allowed for " + label + " button");
            if (layout && -1 === getButtonConfig(label, "layouts").indexOf(layout)) throw new Error("Unexpected style." + BUTTON_STYLE_OPTIONS.LAYOUT + " for " + label + " button: " + layout + ", expected " + getButtonConfig(label, "layouts").join(", "));
            if (void 0 !== maxbuttons) {
                if ("number" != typeof maxbuttons) throw new TypeError("Expected style." + BUTTON_STYLE_OPTIONS.MAXBUTTONS + " to be a number, got: " + maxbuttons);
                if (maxbuttons < 1) throw new Error("Expected style." + BUTTON_STYLE_OPTIONS.MAXBUTTONS + " to be a at least 1, got: " + maxbuttons);
                var minButtons = layout === BUTTON_LAYOUT.VERTICAL ? getButtonConfig(label, "minVerticalButtons") : getButtonConfig(label, "minHorizontalButtons");
                if (maxbuttons < minButtons) throw new Error("Expected style." + BUTTON_STYLE_OPTIONS.MAXBUTTONS + " to be no fewer than " + minButtons + ", got " + maxbuttons);
            }
            if (void 0 !== height) {
                if ("number" != typeof height) throw new TypeError("Expected style." + BUTTON_STYLE_OPTIONS.HEIGHT + " to be a number, got: " + maxbuttons);
                var buttonSize = size || getButtonConfig(label, style.layout === BUTTON_LAYOUT.VERTICAL ? "defaultVerticalSize" : "defaultSize"), _ref = size === BUTTON_SIZE.RESPONSIVE ? {
                    minHeight: BUTTON_STYLE[BUTTON_SIZE.SMALL].minHeight,
                    maxHeight: BUTTON_STYLE[BUTTON_SIZE.HUGE].maxHeight
                } : BUTTON_STYLE[buttonSize], minHeight = _ref.minHeight, maxHeight = _ref.maxHeight;
                if (height < minHeight || height > maxHeight) throw new Error("Expected style." + BUTTON_STYLE_OPTIONS.HEIGHT + " to be between " + minHeight + "px and " + maxHeight + "px - got " + height + "px");
            }
            if (!getButtonConfig(label, "allowPrimary")) throw new Error(label + " can not be used as primary button label");
            if (layout === BUTTON_LAYOUT.VERTICAL) {
                if (size && -1 === [ BUTTON_SIZE.MEDIUM, BUTTON_SIZE.LARGE, BUTTON_SIZE.RESPONSIVE ].indexOf(size)) throw new Error("Button must be at least " + BUTTON_SIZE.MEDIUM + " size for " + BUTTON_LAYOUT.VERTICAL + " layout");
                if (style[BUTTON_STYLE_OPTIONS.LABEL]) throw new Error("style." + BUTTON_STYLE_OPTIONS.LABEL + " option is not allowed for " + BUTTON_LAYOUT.VERTICAL + " layout - got " + label);
                if (fundingicons) throw new Error("style." + BUTTON_STYLE_OPTIONS.FUNDINGICONS + " not allowed for " + BUTTON_LAYOUT.VERTICAL + " layout - got " + fundingicons);
                if (tagline) throw new Error("style." + BUTTON_STYLE_OPTIONS.TAGLINE + " is not allowed for " + BUTTON_LAYOUT.VERTICAL + " layout - got " + tagline);
            }
        }
        function validateButtonProps(props) {
            if (!props) throw new Error("Expected props");
            var locale = props.locale, style = props.style;
            validateButtonLocale(locale);
            validateButtonStyle(style);
        }
        function buttonResponsiveStyle(_ref) {
            var height = _ref.height, _ref$cardNumber = _ref.cardNumber, cardNumber = void 0 === _ref$cardNumber ? 4 : _ref$cardNumber;
            return Object.keys(BUTTON_STYLE).map(function(size) {
                var style = BUTTON_STYLE[size], buttonHeight = height || style.defaultHeight, minDualWidth = Math.round(buttonHeight * DUAL_BUTTON_MIN_RATIO * 2);
                return "\n\n            @media only screen and (min-width: " + style.minWidth + "px) {\n\n                ." + CLASS.CONTAINER + " {\n                    min-width: " + style.minWidth + "px;\n                    max-width: " + style.maxWidth + "px;\n                    font-size: " + util_max(perc(buttonHeight, 32), 10) + "px;\n                }\n\n                ." + CLASS.BUTTON + ":not(." + CLASS.CARD + ") {\n                    height: " + buttonHeight + "px;\n                    min-height: " + (height || style.minHeight) + "px;\n                    max-height: " + (height || style.maxHeight) + "px;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.BRANDING + "-" + BUTTON_BRANDING.UNBRANDED + " {\n                    font-size: " + util_max(perc(buttonHeight, 45), 10) + "px;\n                }\n\n                ." + CLASS.LOGO + " {\n                    height: " + (perc(buttonHeight, 35) + 5) + "px;\n                    max-height: " + perc(buttonHeight, 60) + "px;\n                    min-height: " + perc(buttonHeight, 40) + "px;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.SHAPE + "-" + BUTTON_SHAPE.PILL + " {\n                    border-radius: " + Math.ceil(buttonHeight / 2) + "px;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.SHAPE + "-" + BUTTON_SHAPE.RECT + " {\n                    border-radius: 4px;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + BUTTON_LAYOUT.VERTICAL + " {\n                    margin-bottom: " + perc(buttonHeight, BUTTON_RELATIVE_STYLE.VERTICAL_MARGIN) + "px;\n                }\n\n                ." + CLASS.SEPARATOR + " {\n                    margin: 0 " + perc(buttonHeight, 5) + "px;\n                }\n\n                ." + CLASS.TAGLINE + " {\n                    height: " + perc(buttonHeight, BUTTON_RELATIVE_STYLE.TAGLINE) + "px;\n                    line-height: " + perc(buttonHeight, BUTTON_RELATIVE_STYLE.TAGLINE) + "px;\n                }\n\n                ." + CLASS.FUNDINGICONS + " {\n                    height: " + perc(buttonHeight, BUTTON_RELATIVE_STYLE.FUNDINGICONS) + "px;\n                }\n\n                ." + CLASS.CARD + " {\n                    display: inline-block;\n                }\n\n                ." + CLASS.BUTTON + " ." + CLASS.CARD + " {\n                    width: " + (90 / cardNumber).toFixed(2) + "%;\n                    max-width: " + perc(buttonHeight, 160) + "px;\n                    margin-top: 0;\n                    margin-left: " + (5 / cardNumber).toFixed(2) + "%;\n                    margin-right: " + (5 / cardNumber).toFixed(2) + "%;\n                }\n\n                ." + CLASS.BUTTON + " ." + CLASS.CARD + " img {\n                    width: 100%;\n                }\n\n                ." + CLASS.FUNDINGICONS + " ." + CLASS.CARD + " {\n                    height: " + perc(buttonHeight, 70) + "px;\n                    margin-top: " + perc(buttonHeight, 15) + "px;\n                    margin-left: " + perc(buttonHeight, 7) + "px;\n                    margin-right: " + perc(buttonHeight, 7) + "px;\n                }\n\n                ." + CLASS.FUNDINGICONS + " ." + CLASS.CARD + " img {\n                    height: 100%;\n                }\n            }\n\n            @media only screen and (min-width: " + style.minWidth + "px) and (max-width: " + minDualWidth + "px) {\n\n                ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + BUTTON_LAYOUT.HORIZONTAL + "." + CLASS.NUMBER + "-" + BUTTON_NUMBER.MULTIPLE + "." + CLASS.NUMBER + "-0 {\n                    width: 100%;\n                    margin-right: 0;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + BUTTON_LAYOUT.HORIZONTAL + "." + CLASS.NUMBER + "-" + BUTTON_NUMBER.MULTIPLE + "." + CLASS.NUMBER + "-1 {\n                    display: none;\n                }\n\n                ." + CLASS.CONTAINER + "." + CLASS.LAYOUT + "-" + BUTTON_LAYOUT.HORIZONTAL + "." + CLASS.NUMBER + "-" + BUTTON_NUMBER.MULTIPLE + " ." + CLASS.TAGLINE + " {\n                    display: none;\n                }\n            }\n\n            @media only screen and (min-width: " + util_max(style.minWidth, minDualWidth) + "px) {\n\n                ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + BUTTON_LAYOUT.HORIZONTAL + "." + CLASS.NUMBER + "-" + BUTTON_NUMBER.MULTIPLE + "." + CLASS.NUMBER + "-0 {\n                    display: inline-block;\n                    width: calc(50% - 2px);\n                    margin-right: 4px;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + BUTTON_LAYOUT.HORIZONTAL + "." + CLASS.NUMBER + "-" + BUTTON_NUMBER.MULTIPLE + "." + CLASS.NUMBER + "-1 {\n                    display: inline-block;\n                    width: calc(50% - 2px);\n                }\n\n                ." + CLASS.CONTAINER + "." + CLASS.LAYOUT + "-" + BUTTON_LAYOUT.HORIZONTAL + "." + CLASS.NUMBER + "-" + BUTTON_NUMBER.MULTIPLE + " ." + CLASS.TAGLINE + " {\n                    display: block;\n                }\n            }\n        ";
            }).join("\n");
        }
        function componentStyle(_ref) {
            var height = _ref.height, cardNumber = _ref.cardNumber;
            return "\n        " + pageStyle + "\n        " + buttonStyle + "\n        " + buttonColorStyle + "\n        " + layoutStyle + "\n        " + brandingStyle + "\n        " + labelStyle + "\n        " + buttonResponsiveStyle({
                height: height,
                cardNumber: cardNumber
            }) + "\n    ";
        }
        function getComponentScript() {
            return function() {
                function loop(method, delay, instances) {
                    setTimeout(function() {
                        method();
                        instances -= 1;
                        instances && loop(method, delay, instances);
                    }, delay);
                }
                function getElements(selector, parent) {
                    parent = parent || document;
                    return Array.prototype.slice.call(parent.querySelectorAll(selector));
                }
                function showElement(el) {
                    var displayType = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : STYLE.INLINE_BLOCK;
                    el.style.display = displayType;
                }
                function hideElement(el) {
                    el.style.display = STYLE.NONE;
                }
                function makeElementVisible(el) {
                    el.style.visibility = STYLE.VISIBLE;
                }
                function makeElementInvisible(el) {
                    el.style.visibility = STYLE.HIDDEN;
                }
                function hasDimensions(el) {
                    var rect = el.getBoundingClientRect();
                    return Boolean(rect.height && rect.width);
                }
                function isHidden(el) {
                    var computedStyle = window.getComputedStyle(el);
                    return !computedStyle || computedStyle.display === STYLE.NONE;
                }
                function displayedElementsHaveDimensions(elements) {
                    return elements.every(function(el) {
                        return hasDimensions(el) || isHidden(el);
                    });
                }
                function isOverflowing(el) {
                    if (el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight) return !0;
                    var parent = el.parentNode;
                    if (!parent) return !1;
                    var e = el.getBoundingClientRect(), p = parent.getBoundingClientRect();
                    return e.top < p.top || e.left < p.left || e.right > p.right || e.bottom > p.bottom || (e.left < 0 || e.top < 0 || e.left + e.width > window.innerWidth || e.top + e.height > window.innerHeight);
                }
                function toggleOptionals() {
                    tagline.some(isOverflowing) ? tagline.forEach(makeElementInvisible) : tagline.forEach(makeElementVisible);
                    cards.forEach(function(el) {
                        return showElement(el);
                    });
                    cards.filter(isOverflowing).forEach(hideElement);
                    text.forEach(function(el) {
                        return showElement(el);
                    });
                    optionals.forEach(function(el) {
                        return showElement(el);
                    });
                    if (images.some(isOverflowing) || text.some(isOverflowing)) {
                        text.forEach(hideElement);
                        optionals.forEach(hideElement);
                    } else {
                        text.forEach(makeElementVisible);
                        optionals.forEach(function(el) {
                            return showElement(el);
                        });
                    }
                }
                var STYLE = {
                    BLOCK: "block",
                    INLINE_BLOCK: "inline-block",
                    NONE: "none",
                    VISIBLE: "visible",
                    HIDDEN: "hidden"
                }, images = getElements(".{ CLASS.BUTTON } .{ CLASS.LOGO }"), text = getElements(".{ CLASS.BUTTON } .{ CLASS.TEXT }"), tagline = getElements(".{ CLASS.TAGLINE }"), cards = getElements(".{ CLASS.FUNDINGICONS } .{ CLASS.CARD }"), optionals = getElements(".{ CLASS.BUTTON }-label-credit .{ CLASS.BUTTON }-logo-paypal");
                toggleOptionals();
                !function(elements, method) {
                    if (displayedElementsHaveDimensions(elements)) method(); else var interval = setInterval(function() {
                        if (displayedElementsHaveDimensions(elements)) {
                            clearInterval(interval);
                            method();
                        }
                    }, 5);
                }(images, function() {
                    images.forEach(makeElementVisible);
                    toggleOptionals();
                    document.addEventListener("DOMContentLoaded", toggleOptionals);
                    window.addEventListener("load", toggleOptionals);
                    window.addEventListener("resize", toggleOptionals);
                    loop(toggleOptionals, 10, 10);
                });
            };
        }
        function getCommonButtonClasses(_ref) {
            var layout = _ref.layout, shape = _ref.shape, branding = _ref.branding, multiple = _ref.multiple, env = _ref.env;
            return [ CLASS.LAYOUT + "-" + layout, CLASS.SHAPE + "-" + shape, CLASS.BRANDING + "-" + (branding ? BUTTON_BRANDING.BRANDED : BUTTON_BRANDING.UNBRANDED), CLASS.NUMBER + "-" + (multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE), CLASS.ENV + "-" + env ].join(" ");
        }
        function getButtonClasses(_ref2) {
            var label = _ref2.label, color = _ref2.color, logoColor = _ref2.logoColor;
            return [ CLASS.LABEL + "-" + label, CLASS.COLOR + "-" + color, CLASS.LOGO_COLOR + "-" + logoColor ].join(" ");
        }
        function getLocaleContent(locale) {
            var country = locale.country, lang = locale.lang;
            return componentContent[country][lang];
        }
        function determineButtons(_ref3) {
            var label = _ref3.label, color = _ref3.color, sources = _ref3.sources, multiple = _ref3.multiple;
            return sources.map(function(source, i) {
                var buttonLabel = multiple ? fundingToDefaultLabel(source) : label;
                return {
                    source: source,
                    label: buttonLabel,
                    color: multiple && i > 0 ? getButtonConfig(buttonLabel, "secondaryColors")[color] : color
                };
            });
        }
        function renderCards(_ref4) {
            var cards = _ref4.cards, button = _ref4.button;
            return cards.map(function(name) {
                var _ref5, logo = cardLogos[name];
                return jsxToHTML("img", componentTemplate__extends({}, (_ref5 = {}, _ref5[ATTRIBUTE.BUTTON] = button || !1, 
                _ref5[ATTRIBUTE.FUNDING_SOURCE] = "" + FUNDING.CARD, _ref5[ATTRIBUTE.CARD] = "" + name, 
                _ref5), {
                    class: CLASS.CARD + " " + CLASS.CARD + "-" + name + " " + (button ? CLASS.BUTTON : ""),
                    src: "data:image/svg+xml;base64," + Object(base64.btoa)(logo),
                    alt: name
                }));
            });
        }
        function renderFundingIcons(_ref6) {
            var cards = _ref6.cards;
            if (_ref6.fundingicons) return jsxToHTML("div", {
                class: "" + CLASS.FUNDINGICONS
            }, renderCards({
                cards: cards,
                button: !0
            }));
        }
        function renderContent(text, _ref7) {
            var locale = _ref7.locale, color = _ref7.color, branding = _ref7.branding, logoColor = _ref7.logoColor, funding = _ref7.funding, env = _ref7.env, _cards = _ref7.cards, _content = getLocaleContent(locale);
            return jsxRender(text, {
                text: function(value) {
                    return jsxToHTML("span", {
                        class: CLASS.TEXT
                    }, value);
                },
                logo: function(name) {
                    if (branding) {
                        if (!logoColor) throw new Error("Can not determine logo without logo color");
                        var logo = fundingLogos[name][logoColor] || fundingLogos[name][BUTTON_LOGO_COLOR.ANY];
                        return jsxToHTML("img", {
                            class: CLASS.LOGO + " " + CLASS.LOGO + "-" + name + " " + CLASS.LOGO + "-" + color,
                            src: "data:image/svg+xml;base64," + Object(base64.btoa)(logo),
                            alt: name
                        });
                    }
                },
                content: function(name) {
                    for (var contentString = void 0, _iterator = name.split("|"), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref8;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref8 = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref8 = _i.value;
                        }
                        var key = _ref8;
                        if (_content[key]) {
                            contentString = _content[key];
                            break;
                        }
                    }
                    if (!contentString && env === misc_ENV.TEST) throw new Error("Could not find content " + name + " for " + locale.lang + "_" + locale.country);
                    return renderContent(contentString || "", {
                        locale: locale,
                        color: color,
                        branding: branding,
                        logoColor: logoColor,
                        funding: funding,
                        env: env,
                        cards: _cards
                    });
                },
                cards: function() {
                    if (!funding) throw new Error("Can not determine card types without funding");
                    return renderCards({
                        cards: _cards,
                        button: !1
                    });
                },
                separator: function() {
                    return jsxToHTML("span", {
                        class: CLASS.SEPARATOR
                    });
                }
            });
        }
        function renderButton(_ref9) {
            var _ref10, label = _ref9.label, color = _ref9.color, locale = _ref9.locale, branding = _ref9.branding, multiple = _ref9.multiple, layout = _ref9.layout, shape = _ref9.shape, source = _ref9.source, funding = _ref9.funding, i = _ref9.i, env = _ref9.env, cards = _ref9.cards, logoColor = getButtonConfig(label, "logoColors")[color], contentText = multiple ? getButtonConfig(label, "logoLabel") : getButtonConfig(label, "label");
            contentText = renderContent(contentText, {
                locale: locale,
                color: color,
                branding: branding,
                logoColor: logoColor,
                funding: funding,
                env: env,
                cards: cards
            });
            return jsxToHTML("div", componentTemplate__extends({}, (_ref10 = {}, _ref10[ATTRIBUTE.FUNDING_SOURCE] = source, 
            _ref10[ATTRIBUTE.BUTTON] = !0, _ref10), {
                class: CLASS.BUTTON + " " + CLASS.NUMBER + "-" + i + " " + getCommonButtonClasses({
                    layout: layout,
                    shape: shape,
                    branding: branding,
                    multiple: multiple,
                    env: env
                }) + " " + getButtonClasses({
                    label: label,
                    color: color,
                    logoColor: logoColor
                }),
                role: "button",
                "aria-label": source,
                tabindex: "0"
            }), contentText);
        }
        function renderTagline(_ref11) {
            var label = _ref11.label, tagline = _ref11.tagline, color = _ref11.color, locale = _ref11.locale, multiple = _ref11.multiple, env = _ref11.env, cards = _ref11.cards;
            if (tagline) {
                var tag = multiple ? getButtonConfig(label, "dualTag") || getButtonConfig(label, "tag") : getButtonConfig(label, "tag"), text = renderContent(tag, {
                    locale: locale,
                    color: color,
                    env: env,
                    cards: cards
                });
                if (text) {
                    var tagColor = getButtonConfig(label, "tagLineColors")[color];
                    return jsxToHTML("div", {
                        class: CLASS.TAGLINE + " " + CLASS.TAGLINE_COLOR + "-" + tagColor
                    }, text);
                }
            }
        }
        function renderScript() {
            var script = getComponentScript().toString();
            script = script.replace(/\{\s*CLASS\.([A-Z0-9_]+)\s*\}/g, function(match, name) {
                return CLASS[name];
            });
            return jsxToHTML("script", {
                innerHTML: "(" + script + ")();"
            });
        }
        function renderStyle(_ref12) {
            return jsxToHTML("style", {
                innerHTML: componentStyle({
                    height: _ref12.height,
                    cardNumber: _ref12.cardNumber
                })
            });
        }
        function componentTemplate(_ref13) {
            var _ref14, props = _ref13.props;
            if (props && props.style) {
                var style = props.style;
                "generic" === style.label && (style.label = "paypal");
                "creditblue" === style.color && delete style.color;
                1 !== style.maxbuttons || !1 !== style.tagline || "responsive" !== style.size || "horizontal" !== style.layout || style.height || (style.height = 44);
            }
            validateButtonProps(props);
            var _normalizeProps = normalizeProps(props), label = _normalizeProps.label, locale = _normalizeProps.locale, color = _normalizeProps.color, shape = _normalizeProps.shape, branding = _normalizeProps.branding, tagline = _normalizeProps.tagline, funding = _normalizeProps.funding, layout = _normalizeProps.layout, sources = _normalizeProps.sources, multiple = _normalizeProps.multiple, fundingicons = _normalizeProps.fundingicons, env = _normalizeProps.env, height = _normalizeProps.height, cards = _normalizeProps.cards, buttonNodes = determineButtons({
                label: label,
                color: color,
                sources: sources,
                multiple: multiple
            }).map(function(button, i) {
                return renderButton({
                    label: button.label,
                    color: button.color,
                    source: button.source,
                    env: env,
                    i: i,
                    funding: funding,
                    multiple: multiple,
                    locale: locale,
                    branding: branding,
                    layout: layout,
                    shape: shape,
                    cards: cards
                });
            }), taglineNode = renderTagline({
                label: label,
                tagline: tagline,
                color: color,
                locale: locale,
                multiple: multiple,
                env: env,
                cards: cards
            }), fundingiconNode = renderFundingIcons({
                cards: cards,
                fundingicons: fundingicons
            }), styleNode = renderStyle({
                height: height,
                cardNumber: cards.length
            }), scriptNode = renderScript();
            return jsxToHTML("div", componentTemplate__extends({}, (_ref14 = {}, _ref14[ATTRIBUTE.VERSION] = "4.0.175", 
            _ref14), {
                class: CLASS.CONTAINER + " " + getCommonButtonClasses({
                    layout: layout,
                    shape: shape,
                    branding: branding,
                    multiple: multiple,
                    env: env
                })
            }), styleNode, buttonNodes, taglineNode || fundingiconNode, scriptNode).toString();
        }
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var interface_namespaceObject = {};
        __webpack_require__.d(interface_namespaceObject, "openBridge", function() {
            return bridge.openBridge;
        });
        __webpack_require__.d(interface_namespaceObject, "linkUrl", function() {
            return bridge.linkUrl;
        });
        __webpack_require__.d(interface_namespaceObject, "isBridge", function() {
            return bridge.isBridge;
        });
        __webpack_require__.d(interface_namespaceObject, "needsBridge", function() {
            return bridge.needsBridge;
        });
        __webpack_require__.d(interface_namespaceObject, "needsBridgeForBrowser", function() {
            return bridge.needsBridgeForBrowser;
        });
        __webpack_require__.d(interface_namespaceObject, "hasBridge", function() {
            return bridge.hasBridge;
        });
        __webpack_require__.d(interface_namespaceObject, "needsBridgeForWin", function() {
            return bridge.needsBridgeForWin;
        });
        __webpack_require__.d(interface_namespaceObject, "needsBridgeForDomain", function() {
            return bridge.needsBridgeForDomain;
        });
        __webpack_require__.d(interface_namespaceObject, "openTunnelToOpener", function() {
            return bridge.openTunnelToOpener;
        });
        __webpack_require__.d(interface_namespaceObject, "destroyBridges", function() {
            return bridge.destroyBridges;
        });
        var src_interface_namespaceObject = {};
        __webpack_require__.d(src_interface_namespaceObject, "cleanUpWindow", function() {
            return cleanUpWindow;
        });
        __webpack_require__.d(src_interface_namespaceObject, "Promise", function() {
            return zalgo_promise_src.ZalgoPromise;
        });
        __webpack_require__.d(src_interface_namespaceObject, "bridge", function() {
            return interface_bridge;
        });
        __webpack_require__.d(src_interface_namespaceObject, "init", function() {
            return init;
        });
        __webpack_require__.d(src_interface_namespaceObject, "parent", function() {
            return public_parent;
        });
        __webpack_require__.d(src_interface_namespaceObject, "send", function() {
            return _send;
        });
        __webpack_require__.d(src_interface_namespaceObject, "request", function() {
            return request;
        });
        __webpack_require__.d(src_interface_namespaceObject, "sendToParent", function() {
            return sendToParent;
        });
        __webpack_require__.d(src_interface_namespaceObject, "client", function() {
            return client;
        });
        __webpack_require__.d(src_interface_namespaceObject, "on", function() {
            return _on;
        });
        __webpack_require__.d(src_interface_namespaceObject, "listen", function() {
            return listen;
        });
        __webpack_require__.d(src_interface_namespaceObject, "once", function() {
            return server_once;
        });
        __webpack_require__.d(src_interface_namespaceObject, "listener", function() {
            return server_listener;
        });
        __webpack_require__.d(src_interface_namespaceObject, "CONFIG", function() {
            return src_conf.a;
        });
        __webpack_require__.d(src_interface_namespaceObject, "CONSTANTS", function() {
            return src_conf.b;
        });
        __webpack_require__.d(src_interface_namespaceObject, "disable", function() {
            return disable;
        });
        var client_interface_namespaceObject = {};
        __webpack_require__.d(client_interface_namespaceObject, "track", function() {
            return _track;
        });
        __webpack_require__.d(client_interface_namespaceObject, "buffer", function() {
            return buffer;
        });
        __webpack_require__.d(client_interface_namespaceObject, "tracking", function() {
            return tracking;
        });
        __webpack_require__.d(client_interface_namespaceObject, "getTransport", function() {
            return getTransport;
        });
        __webpack_require__.d(client_interface_namespaceObject, "setTransport", function() {
            return setTransport;
        });
        __webpack_require__.d(client_interface_namespaceObject, "print", function() {
            return print;
        });
        __webpack_require__.d(client_interface_namespaceObject, "immediateFlush", function() {
            return immediateFlush;
        });
        __webpack_require__.d(client_interface_namespaceObject, "flush", function() {
            return _flush;
        });
        __webpack_require__.d(client_interface_namespaceObject, "log", function() {
            return logger_log;
        });
        __webpack_require__.d(client_interface_namespaceObject, "prefix", function() {
            return logger_prefix;
        });
        __webpack_require__.d(client_interface_namespaceObject, "debug", function() {
            return debug;
        });
        __webpack_require__.d(client_interface_namespaceObject, "info", function() {
            return info;
        });
        __webpack_require__.d(client_interface_namespaceObject, "warn", function() {
            return warn;
        });
        __webpack_require__.d(client_interface_namespaceObject, "error", function() {
            return logger_error;
        });
        __webpack_require__.d(client_interface_namespaceObject, "init", function() {
            return init_init;
        });
        __webpack_require__.d(client_interface_namespaceObject, "startTransition", function() {
            return startTransition;
        });
        __webpack_require__.d(client_interface_namespaceObject, "endTransition", function() {
            return endTransition;
        });
        __webpack_require__.d(client_interface_namespaceObject, "transition", function() {
            return transition;
        });
        __webpack_require__.d(client_interface_namespaceObject, "payloadBuilders", function() {
            return payloadBuilders;
        });
        __webpack_require__.d(client_interface_namespaceObject, "metaBuilders", function() {
            return metaBuilders;
        });
        __webpack_require__.d(client_interface_namespaceObject, "trackingBuilders", function() {
            return trackingBuilders;
        });
        __webpack_require__.d(client_interface_namespaceObject, "headerBuilders", function() {
            return headerBuilders;
        });
        __webpack_require__.d(client_interface_namespaceObject, "addPayloadBuilder", function() {
            return addPayloadBuilder;
        });
        __webpack_require__.d(client_interface_namespaceObject, "addMetaBuilder", function() {
            return addMetaBuilder;
        });
        __webpack_require__.d(client_interface_namespaceObject, "addTrackingBuilder", function() {
            return addTrackingBuilder;
        });
        __webpack_require__.d(client_interface_namespaceObject, "addHeaderBuilder", function() {
            return addHeaderBuilder;
        });
        __webpack_require__.d(client_interface_namespaceObject, "config", function() {
            return config_config;
        });
        __webpack_require__.d(client_interface_namespaceObject, "logLevels", function() {
            return logLevels;
        });
        var _CONTEXT_TYPE, _LANG_TO_DEFAULT_COUN, _logoColors, _tagLineColors, _secondaryColors, _logoColors2, _secondaryColors2, _logoColors3, _secondaryColors3, _logoColors4, _secondaryColors4, _logoColors5, _secondaryColors5, _logoColors6, _secondaryColors6, _BUTTON_CONFIG, _FUNDING_TO_DEFAULT_L, _LABEL_TO_FUNDING, _BUTTON_STYLE, _FUNDING_CONFIG, _CARD_CONFIG, _checkoutUris, _altpayUris, _guestUris, _billingUris, _buttonUris, _postBridgeUris, _legacyCheckoutUris, _buttonJSUrls, _locales, base64 = __webpack_require__("./node_modules/Base64/base64.js"), BUTTON_STYLE_OPTIONS = {
            LABEL: "label",
            SIZE: "size",
            SHAPE: "shape",
            COLOR: "color",
            LAYOUT: "layout",
            MAXBUTTONS: "maxbuttons",
            FUNDINGICONS: "fundingicons",
            BRANDING: "branding",
            TAGLINE: "tagline",
            HEIGHT: "height"
        }, BUTTON_LABEL = {
            PAYPAL: "paypal",
            CHECKOUT: "checkout",
            PAY: "pay",
            CREDIT: "credit",
            CARD: "card",
            BUYNOW: "buynow",
            VENMO: "venmo",
            IDEAL: "ideal",
            ELV: "elv"
        }, BUTTON_COLOR = {
            GOLD: "gold",
            BLUE: "blue",
            SILVER: "silver",
            BLACK: "black",
            DARKBLUE: "darkblue",
            TRANSPARENT: "transparent"
        }, BUTTON_LOGO_COLOR = {
            BLUE: "blue",
            WHITE: "white",
            BLACK: "black",
            ANY: "any"
        }, BUTTON_SIZE = {
            TINY: "tiny",
            SMALL: "small",
            MEDIUM: "medium",
            LARGE: "large",
            HUGE: "huge",
            RESPONSIVE: "responsive"
        }, BUTTON_TAGLINE_COLOR = {
            BLACK: "black",
            BLUE: "blue"
        }, BUTTON_SHAPE = {
            PILL: "pill",
            RECT: "rect"
        }, BUTTON_BRANDING = {
            BRANDED: "branded",
            UNBRANDED: "unbranded"
        }, BUTTON_LAYOUT = {
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical"
        }, BUTTON_NUMBER = {
            SINGLE: "single",
            MULTIPLE: "multiple"
        }, BUTTON_LOGO = {
            PP: "pp",
            PAYPAL: "paypal",
            VENMO: "venmo",
            CREDIT: "credit",
            IDEAL: "ideal",
            ELV: "elv"
        }, FUNDING = {
            PAYPAL: "paypal",
            VENMO: "venmo",
            CREDIT: "credit",
            CARD: "card",
            IDEAL: "ideal",
            ELV: "elv"
        }, CARD = {
            VISA: "visa",
            MASTERCARD: "mastercard",
            AMEX: "amex",
            DISCOVER: "discover",
            SWITCH: "switch",
            MAESTRO: "maestro",
            HIPER: "hiper",
            ELO: "elo",
            JCB: "jcb",
            CUP: "cup",
            COFINOGA: "cofinoga",
            COFIDIS: "cofidis",
            CETELEM: "cetelem",
            CBNATIONALE: "cbnationale"
        }, FUNDING_ELIGIBILITY_REASON = {
            PRIMARY: "The funding source is the primary source",
            NOT_ENABLED: "The funding source is not currently enabled for use",
            SECONDARY_DISALLOWED: "The funding source is disallowed as a secondary button",
            OPT_OUT: "The funding source was disallowed in funding.disallowed",
            OPT_IN: "The funding source was allowed in funding.allowed",
            DISALLOWED_COUNTRY: "The funding source is not enabled for the current locale",
            DEFAULT_COUNTRY: "The funding source is enabled by default for the current locale",
            DEFAULT: "The funding source is enabled by default for all users",
            REMEMBERED: "The funding source was remembered for the current user",
            NEED_OPT_IN: "The funding source needs to be allowed in funding.allowed"
        }, misc_ENV = {
            LOCAL: "local",
            STAGE: "stage",
            SANDBOX: "sandbox",
            PRODUCTION: "production",
            TEST: "test",
            DEMO: "demo"
        }, PAYMENT_TYPE = {
            EC_TOKEN: "ec_token",
            BA_TOKEN: "ba_token",
            PAY_ID: "pay_id"
        }, ATTRIBUTE = {
            BUTTON: "data-button",
            FUNDING_SOURCE: "data-funding-source",
            CARD: "data-card",
            VERSION: "data-version"
        }, PLATFORM = {
            DESKTOP: "desktop",
            MOBILE: "mobile"
        }, DEFAULT = "default", COUNTRY = (_CONTEXT_TYPE = {
            BUTTON_SESSION_ID: "button_session_id"
        }, _CONTEXT_TYPE[PAYMENT_TYPE.PAY_ID] = "Pay-ID", _CONTEXT_TYPE[PAYMENT_TYPE.EC_TOKEN] = "EC-Token", 
        _CONTEXT_TYPE[PAYMENT_TYPE.BA_TOKEN] = "EC-Token", {
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
            C2: "C2",
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
        }), LANG = {
            EN: "en",
            FR: "fr",
            ES: "es",
            ZH: "zh",
            AR: "ar",
            DE: "de",
            NL: "nl",
            PT: "pt",
            DA: "da",
            RU: "ru",
            ID: "id",
            HE: "he",
            IT: "it",
            JA: "ja",
            KO: "ko",
            NO: "no",
            PL: "pl",
            SV: "sv",
            TH: "th",
            TR: "tr"
        }, BUTTON_CONFIG = (_LANG_TO_DEFAULT_COUN = {}, _LANG_TO_DEFAULT_COUN[LANG.EN] = COUNTRY.US, 
        _LANG_TO_DEFAULT_COUN[LANG.FR] = COUNTRY.FR, _LANG_TO_DEFAULT_COUN[LANG.ES] = COUNTRY.ES, 
        _LANG_TO_DEFAULT_COUN[LANG.ZH] = COUNTRY.CN, _LANG_TO_DEFAULT_COUN[LANG.DE] = COUNTRY.DE, 
        _LANG_TO_DEFAULT_COUN[LANG.NL] = COUNTRY.NL, _LANG_TO_DEFAULT_COUN[LANG.PT] = COUNTRY.PT, 
        _LANG_TO_DEFAULT_COUN[LANG.DA] = COUNTRY.DK, _LANG_TO_DEFAULT_COUN[LANG.RU] = COUNTRY.RU, 
        _LANG_TO_DEFAULT_COUN[LANG.ID] = COUNTRY.ID, _LANG_TO_DEFAULT_COUN[LANG.HE] = COUNTRY.IL, 
        _LANG_TO_DEFAULT_COUN[LANG.IT] = COUNTRY.IT, _LANG_TO_DEFAULT_COUN[LANG.JA] = COUNTRY.JP, 
        _LANG_TO_DEFAULT_COUN[LANG.KO] = COUNTRY.KR, _LANG_TO_DEFAULT_COUN[LANG.NO] = COUNTRY.NO, 
        _LANG_TO_DEFAULT_COUN[LANG.PL] = COUNTRY.PL, _LANG_TO_DEFAULT_COUN[LANG.SV] = COUNTRY.SE, 
        _LANG_TO_DEFAULT_COUN[LANG.TH] = COUNTRY.TH, _LANG_TO_DEFAULT_COUN[LANG.TR] = COUNTRY.TR, 
        _BUTTON_CONFIG = {}, _BUTTON_CONFIG[DEFAULT] = {
            colors: [ BUTTON_COLOR.GOLD, BUTTON_COLOR.BLUE, BUTTON_COLOR.SILVER, BUTTON_COLOR.BLACK ],
            sizes: [ BUTTON_SIZE.SMALL, BUTTON_SIZE.MEDIUM, BUTTON_SIZE.LARGE, BUTTON_SIZE.RESPONSIVE ],
            shapes: [ BUTTON_SHAPE.PILL, BUTTON_SHAPE.RECT ],
            layouts: [ BUTTON_LAYOUT.HORIZONTAL, BUTTON_LAYOUT.VERTICAL ],
            logoColors: (_logoColors = {}, _logoColors[BUTTON_COLOR.GOLD] = BUTTON_LOGO_COLOR.BLUE, 
            _logoColors[BUTTON_COLOR.SILVER] = BUTTON_LOGO_COLOR.BLUE, _logoColors[BUTTON_COLOR.BLUE] = BUTTON_LOGO_COLOR.WHITE, 
            _logoColors[BUTTON_COLOR.BLACK] = BUTTON_LOGO_COLOR.WHITE, _logoColors[BUTTON_COLOR.BLACK] = BUTTON_LOGO_COLOR.WHITE, 
            _logoColors),
            tagLineColors: (_tagLineColors = {}, _tagLineColors[BUTTON_COLOR.GOLD] = BUTTON_TAGLINE_COLOR.BLUE, 
            _tagLineColors[BUTTON_COLOR.SILVER] = BUTTON_TAGLINE_COLOR.BLUE, _tagLineColors[BUTTON_COLOR.BLUE] = BUTTON_TAGLINE_COLOR.BLUE, 
            _tagLineColors[BUTTON_COLOR.BLACK] = BUTTON_TAGLINE_COLOR.BLACK, _tagLineColors[BUTTON_COLOR.DARKBLUE] = BUTTON_TAGLINE_COLOR.BLUE, 
            _tagLineColors),
            secondaryColors: (_secondaryColors = {}, _secondaryColors[BUTTON_COLOR.GOLD] = BUTTON_COLOR.BLUE, 
            _secondaryColors[BUTTON_COLOR.SILVER] = BUTTON_COLOR.BLUE, _secondaryColors[BUTTON_COLOR.BLUE] = BUTTON_COLOR.SILVER, 
            _secondaryColors[BUTTON_COLOR.BLACK] = BUTTON_COLOR.BLACK, _secondaryColors[BUTTON_COLOR.DARKBLUE] = BUTTON_COLOR.SILVER, 
            _secondaryColors),
            tag: "{ content: safer_tag }",
            dualTag: "{ content: dual_tag|safer_tag }",
            defaultLocale: "en_US",
            defaultLabel: BUTTON_LABEL.CHECKOUT,
            defaultVerticalLabel: BUTTON_LABEL.PAYPAL,
            defaultColor: BUTTON_COLOR.GOLD,
            defaultSize: BUTTON_SIZE.SMALL,
            defaultVerticalSize: BUTTON_SIZE.MEDIUM,
            defaultShape: BUTTON_SHAPE.PILL,
            defaultLayout: BUTTON_LAYOUT.HORIZONTAL,
            defaultBranding: !0,
            defaultVerticalBranding: !0,
            defaultFundingIcons: !1,
            defaultTagline: !0,
            defaultDual: "",
            minimumSize: BUTTON_SIZE.TINY,
            minimumVerticalSize: BUTTON_SIZE.MEDIUM,
            maximumSize: BUTTON_SIZE.HUGE,
            maximumVerticalSize: BUTTON_SIZE.HUGE,
            minHorizontalButtons: 1,
            minVerticalButtons: 1,
            maxHorizontalButtons: 2,
            maxVerticalButtons: 4,
            allowUnbranded: !1,
            allowFundingIcons: !0,
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[BUTTON_LABEL.PAYPAL] = {
            label: "{ logo: " + BUTTON_LOGO.PP + " } { logo: " + BUTTON_LOGO.PAYPAL + " }",
            logoLabel: "{ logo: " + BUTTON_LOGO.PP + " } { logo: " + BUTTON_LOGO.PAYPAL + " }",
            allowPrimary: !0,
            allowPrimaryVertical: !0,
            allowPrimaryHorizontal: !0
        }, _BUTTON_CONFIG[BUTTON_LABEL.CHECKOUT] = {
            label: "{ content: checkout }",
            logoLabel: "{ logo: " + BUTTON_LOGO.PP + " } { logo: " + BUTTON_LOGO.PAYPAL + " }",
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !0
        }, _BUTTON_CONFIG[BUTTON_LABEL.PAY] = {
            label: "{ content: pay }",
            logoLabel: "{ logo: " + BUTTON_LOGO.PP + " } { logo: " + BUTTON_LOGO.PAYPAL + " }",
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !0
        }, _BUTTON_CONFIG[BUTTON_LABEL.BUYNOW] = {
            label: "{ content: buynow }",
            logoLabel: "{ logo: " + BUTTON_LOGO.PP + " } { logo: " + BUTTON_LOGO.PAYPAL + " }",
            defaultBranding: void 0,
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !0,
            allowUnbranded: !0
        }, _BUTTON_CONFIG[BUTTON_LABEL.CREDIT] = {
            label: "{ logo: " + BUTTON_LOGO.PP + " } { logo: " + BUTTON_LOGO.PAYPAL + " } { logo: " + BUTTON_LOGO.CREDIT + " }",
            logoLabel: "{ logo: " + BUTTON_LOGO.PP + " } { logo: " + BUTTON_LOGO.PAYPAL + " } { logo: " + BUTTON_LOGO.CREDIT + " }",
            tag: "{ content: later_tag }",
            colors: [ BUTTON_COLOR.DARKBLUE, BUTTON_COLOR.BLACK ],
            logoColors: (_logoColors2 = {}, _logoColors2[BUTTON_COLOR.BLACK] = BUTTON_LOGO_COLOR.WHITE, 
            _logoColors2[BUTTON_COLOR.DARKBLUE] = BUTTON_LOGO_COLOR.WHITE, _logoColors2),
            secondaryColors: (_secondaryColors2 = {}, _secondaryColors2[BUTTON_COLOR.GOLD] = BUTTON_COLOR.DARKBLUE, 
            _secondaryColors2[BUTTON_COLOR.BLUE] = BUTTON_COLOR.DARKBLUE, _secondaryColors2[BUTTON_COLOR.SILVER] = BUTTON_COLOR.DARKBLUE, 
            _secondaryColors2[BUTTON_COLOR.BLACK] = BUTTON_COLOR.BLACK, _secondaryColors2),
            defaultColor: BUTTON_COLOR.DARKBLUE,
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1,
            allowFundingIcons: !1
        }, _BUTTON_CONFIG[BUTTON_LABEL.VENMO] = {
            label: "{ logo: " + BUTTON_LOGO.VENMO + " }",
            logoLabel: "{ logo: " + BUTTON_LOGO.VENMO + " }",
            defaultColor: BUTTON_COLOR.SILVER,
            colors: [ BUTTON_COLOR.BLUE, BUTTON_COLOR.SILVER, BUTTON_COLOR.BLACK ],
            logoColors: (_logoColors3 = {}, _logoColors3[BUTTON_COLOR.BLUE] = BUTTON_LOGO_COLOR.WHITE, 
            _logoColors3[BUTTON_COLOR.SILVER] = BUTTON_LOGO_COLOR.BLUE, _logoColors3[BUTTON_COLOR.BLACK] = BUTTON_LOGO_COLOR.WHITE, 
            _logoColors3),
            secondaryColors: (_secondaryColors3 = {}, _secondaryColors3[BUTTON_COLOR.GOLD] = BUTTON_COLOR.BLUE, 
            _secondaryColors3[BUTTON_COLOR.BLUE] = BUTTON_COLOR.SILVER, _secondaryColors3[BUTTON_COLOR.SILVER] = BUTTON_COLOR.BLUE, 
            _secondaryColors3[BUTTON_COLOR.BLACK] = BUTTON_COLOR.BLACK, _secondaryColors3[BUTTON_COLOR.DARKBLUE] = BUTTON_COLOR.SILVER, 
            _secondaryColors3),
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !0
        }, _BUTTON_CONFIG[BUTTON_LABEL.IDEAL] = {
            label: "{ logo: " + BUTTON_LOGO.IDEAL + " } Online betalen",
            logoLabel: "{ logo: " + BUTTON_LOGO.IDEAL + " } Online betalen",
            defaultColor: BUTTON_COLOR.SILVER,
            colors: [ BUTTON_COLOR.SILVER, BUTTON_COLOR.BLACK ],
            logoColors: (_logoColors4 = {}, _logoColors4[BUTTON_COLOR.SILVER] = BUTTON_LOGO_COLOR.BLACK, 
            _logoColors4[BUTTON_COLOR.BLACK] = BUTTON_LOGO_COLOR.WHITE, _logoColors4),
            secondaryColors: (_secondaryColors4 = {}, _secondaryColors4[BUTTON_COLOR.GOLD] = BUTTON_COLOR.SILVER, 
            _secondaryColors4[BUTTON_COLOR.BLUE] = BUTTON_COLOR.SILVER, _secondaryColors4[BUTTON_COLOR.SILVER] = BUTTON_COLOR.SILVER, 
            _secondaryColors4[BUTTON_COLOR.BLACK] = BUTTON_COLOR.BLACK, _secondaryColors4[BUTTON_COLOR.DARKBLUE] = BUTTON_COLOR.SILVER, 
            _secondaryColors4),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[BUTTON_LABEL.ELV] = {
            label: "{ logo: " + BUTTON_LOGO.ELV + " }",
            logoLabel: "{ logo: " + BUTTON_LOGO.ELV + " }",
            defaultColor: BUTTON_COLOR.SILVER,
            colors: [ BUTTON_COLOR.SILVER, BUTTON_COLOR.BLACK ],
            logoColors: (_logoColors5 = {}, _logoColors5[BUTTON_COLOR.SILVER] = BUTTON_LOGO_COLOR.BLACK, 
            _logoColors5[BUTTON_COLOR.BLACK] = BUTTON_LOGO_COLOR.WHITE, _logoColors5),
            secondaryColors: (_secondaryColors5 = {}, _secondaryColors5[BUTTON_COLOR.GOLD] = BUTTON_COLOR.SILVER, 
            _secondaryColors5[BUTTON_COLOR.BLUE] = BUTTON_COLOR.SILVER, _secondaryColors5[BUTTON_COLOR.SILVER] = BUTTON_COLOR.SILVER, 
            _secondaryColors5[BUTTON_COLOR.BLACK] = BUTTON_COLOR.BLACK, _secondaryColors5[BUTTON_COLOR.DARKBLUE] = BUTTON_COLOR.SILVER, 
            _secondaryColors5),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[BUTTON_LABEL.CARD] = {
            label: "{ cards }",
            logoLabel: "{ cards }",
            defaultColor: BUTTON_COLOR.SILVER,
            colors: [ BUTTON_COLOR.TRANSPARENT ],
            logoColors: (_logoColors6 = {}, _logoColors6[BUTTON_COLOR.TRANSPARENT] = BUTTON_LOGO_COLOR.BLACK, 
            _logoColors6),
            secondaryColors: (_secondaryColors6 = {}, _secondaryColors6[BUTTON_COLOR.GOLD] = BUTTON_COLOR.TRANSPARENT, 
            _secondaryColors6[BUTTON_COLOR.BLUE] = BUTTON_COLOR.TRANSPARENT, _secondaryColors6[BUTTON_COLOR.SILVER] = BUTTON_COLOR.TRANSPARENT, 
            _secondaryColors6[BUTTON_COLOR.BLACK] = BUTTON_COLOR.TRANSPARENT, _secondaryColors6[BUTTON_COLOR.DARKBLUE] = BUTTON_COLOR.TRANSPARENT, 
            _secondaryColors6),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG), FUNDING_TO_DEFAULT_LABEL = (_FUNDING_TO_DEFAULT_L = {}, _FUNDING_TO_DEFAULT_L[FUNDING.PAYPAL] = BUTTON_LABEL.PAYPAL, 
        _FUNDING_TO_DEFAULT_L[FUNDING.VENMO] = BUTTON_LABEL.VENMO, _FUNDING_TO_DEFAULT_L[FUNDING.CARD] = BUTTON_LABEL.CARD, 
        _FUNDING_TO_DEFAULT_L[FUNDING.CREDIT] = BUTTON_LABEL.CREDIT, _FUNDING_TO_DEFAULT_L[FUNDING.IDEAL] = BUTTON_LABEL.IDEAL, 
        _FUNDING_TO_DEFAULT_L[FUNDING.ELV] = BUTTON_LABEL.ELV, _FUNDING_TO_DEFAULT_L), LABEL_TO_FUNDING = (_LABEL_TO_FUNDING = {}, 
        _LABEL_TO_FUNDING[BUTTON_LABEL.PAYPAL] = FUNDING.PAYPAL, _LABEL_TO_FUNDING[BUTTON_LABEL.CHECKOUT] = FUNDING.PAYPAL, 
        _LABEL_TO_FUNDING[BUTTON_LABEL.PAY] = FUNDING.PAYPAL, _LABEL_TO_FUNDING[BUTTON_LABEL.BUYNOW] = FUNDING.PAYPAL, 
        _LABEL_TO_FUNDING[BUTTON_LABEL.CARD] = FUNDING.CARD, _LABEL_TO_FUNDING[BUTTON_LABEL.CREDIT] = FUNDING.CREDIT, 
        _LABEL_TO_FUNDING[BUTTON_LABEL.VENMO] = FUNDING.VENMO, _LABEL_TO_FUNDING[BUTTON_LABEL.IDEAL] = FUNDING.IDEAL, 
        _LABEL_TO_FUNDING), BUTTON_RELATIVE_STYLE = {
            FUNDINGICONS: 100,
            TAGLINE: 50,
            VERTICAL_MARGIN: 30
        }, BUTTON_STYLE = (_BUTTON_STYLE = {}, _BUTTON_STYLE[BUTTON_SIZE.TINY] = {
            defaultWidth: 75,
            defaultHeight: 25,
            minWidth: 75,
            maxWidth: 150,
            minHeight: 25,
            maxHeight: 30,
            allowFunding: !0,
            allowTagline: !1
        }, _BUTTON_STYLE[BUTTON_SIZE.SMALL] = {
            defaultWidth: 150,
            defaultHeight: 25,
            minWidth: 150,
            maxWidth: 200,
            minHeight: 25,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0
        }, _BUTTON_STYLE[BUTTON_SIZE.MEDIUM] = {
            defaultWidth: 250,
            defaultHeight: 35,
            minWidth: 200,
            maxWidth: 300,
            minHeight: 35,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0
        }, _BUTTON_STYLE[BUTTON_SIZE.LARGE] = {
            defaultWidth: 350,
            defaultHeight: 45,
            minWidth: 300,
            maxWidth: 500,
            minHeight: 30,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0
        }, _BUTTON_STYLE[BUTTON_SIZE.HUGE] = {
            defaultWidth: 500,
            defaultHeight: 55,
            minWidth: 500,
            maxWidth: 750,
            minHeight: 40,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0
        }, _BUTTON_STYLE), FUNDING_PRIORITY = [ FUNDING.PAYPAL, FUNDING.VENMO, FUNDING.CREDIT, FUNDING.IDEAL, FUNDING.ELV, FUNDING.CARD ], FUNDING_CONFIG = (_FUNDING_CONFIG = {}, 
        _FUNDING_CONFIG[DEFAULT] = {
            enabled: !0,
            allowOptIn: !0,
            allowOptOut: !0,
            allowRemember: !0,
            allowHorizontal: !0,
            allowVertical: !0
        }, _FUNDING_CONFIG[FUNDING.PAYPAL] = {
            default: !0,
            allowOptIn: !1,
            allowOptOut: !1,
            allowHorizontal: !0,
            allowVertical: !0
        }, _FUNDING_CONFIG[FUNDING.CARD] = {
            default: !0,
            allowHorizontal: !1,
            allowVertical: !0
        }, _FUNDING_CONFIG[FUNDING.VENMO] = {
            allowOptOut: !1,
            allowedCountries: [ COUNTRY.US ],
            allowHorizontal: !0,
            allowVertical: !0
        }, _FUNDING_CONFIG[FUNDING.CREDIT] = {
            allowedCountries: [ COUNTRY.US, COUNTRY.GB, COUNTRY.DE ],
            defaultVerticalCountries: [ COUNTRY.US ],
            platforms: [ PLATFORM.MOBILE ],
            allowHorizontal: !0,
            allowVertical: !0
        }, _FUNDING_CONFIG[FUNDING.IDEAL] = {
            allowedCountries: [ COUNTRY.NL ],
            allowHorizontal: !0,
            allowVertical: !0
        }, _FUNDING_CONFIG[FUNDING.ELV] = {
            allowedCountries: [ COUNTRY.DE, COUNTRY.AT ],
            defaultVerticalCountries: [ COUNTRY.DE, COUNTRY.AT ],
            allowHorizontal: !0,
            allowVertical: !0
        }, _FUNDING_CONFIG), CARD_CONFIG = (_CARD_CONFIG = {}, _CARD_CONFIG[DEFAULT] = {
            priority: [ CARD.VISA, CARD.MASTERCARD, CARD.AMEX ]
        }, _CARD_CONFIG[COUNTRY.US] = {
            priority: [ CARD.VISA, CARD.MASTERCARD, CARD.AMEX, CARD.DISCOVER ]
        }, _CARD_CONFIG[COUNTRY.BR] = {
            priority: [ CARD.VISA, CARD.MASTERCARD, CARD.AMEX, CARD.HIPER, CARD.ELO ]
        }, _CARD_CONFIG[COUNTRY.JP] = {
            priority: [ CARD.VISA, CARD.MASTERCARD, CARD.AMEX, CARD.JCB ]
        }, _CARD_CONFIG), fundingEligibilityReasons = [], zalgo_promise_src = (__webpack_require__("./node_modules/hi-base32/src/base32.js"), 
        __webpack_require__("./node_modules/zalgo-promise/src/index.js")), cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), config = {
            scriptUrl: "//www.paypalobjects.com/api/checkout.button.render.js",
            paypal_domain_regex: /^(https?|mock):\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/,
            version: "4.0.175",
            cors: !0,
            env: misc_ENV.PRODUCTION,
            state: "checkoutjs",
            locale: {
                country: COUNTRY.US,
                lang: LANG.EN
            },
            stage: "msmaster",
            merchantID: "",
            logLevel: "warn",
            throttles: {
                v4_mobile_device: 0
            },
            domain_settings: {
                "walmart.com": {
                    log_domain_prefix: !0,
                    ie_full_page: !1,
                    allow_full_page_fallback: !0,
                    memoize_payment: !0,
                    force_bridge: !0,
                    log_authorize: !0,
                    disable_payment_timeout: !0
                },
                "ulta.com": {
                    disable_venmo: !0
                },
                "barnesandnoble.com": {
                    disable_venmo: !0
                },
                "bn.com": {
                    disable_venmo: !0
                },
                "agoratix.com": {
                    disable_venmo: !0
                },
                "tractorsupply.com": {
                    disable_venmo: !0
                },
                "etsy.com": {
                    log_domain_prefix: !0,
                    ie_full_page: !1,
                    allow_full_page_fallback: !0,
                    memoize_payment: !0,
                    force_bridge: !0,
                    log_authorize: !0,
                    disable_payment_timeout: !0
                },
                "ticketmaster.com": {
                    disable_venmo: !0
                },
                "livenation.com": {
                    disable_venmo: !0
                },
                "frontgatetickets.com": {
                    disable_venmo: !0
                }
            },
            customCountry: !1,
            SUPPORTED_BROWSERS: {
                msie: "9",
                firefox: "30",
                chrome: "27",
                safari: "5.1",
                opera: "16",
                msedge: "12",
                samsungBrowser: "2.1",
                silk: "59.3",
                ucbrowser: "10.0.0.488",
                vivaldi: "1.91"
            },
            session_uid_lifetime: 3e5,
            _apiStage: "",
            get apiStage() {
                return config._apiStage || config.stage;
            },
            set apiStage(value) {
                config._apiStage = value;
            },
            ports: {
                default: 8e3,
                button: 8e3,
                checkout: 8e3,
                guest: 8001,
                altpay: 3e3
            },
            get paypalUrls() {
                var _ref;
                return _ref = {}, _ref[misc_ENV.LOCAL] = "http://localhost.paypal.com:" + config.ports.default, 
                _ref[misc_ENV.STAGE] = "https://www." + config.stage + ".qa.paypal.com", _ref[misc_ENV.SANDBOX] = "https://www.sandbox.paypal.com", 
                _ref[misc_ENV.PRODUCTION] = "https://www.paypal.com", _ref[misc_ENV.TEST] = window.location.protocol + "//" + window.location.host, 
                _ref[misc_ENV.DEMO] = window.location.protocol + "//localhost.paypal.com:" + window.location.port, 
                _ref;
            },
            get paypalDomains() {
                var _ref2;
                return _ref2 = {}, _ref2[misc_ENV.LOCAL] = "http://localhost.paypal.com:" + config.ports.default, 
                _ref2[misc_ENV.STAGE] = "https://www." + config.stage + ".qa.paypal.com", _ref2[misc_ENV.SANDBOX] = "https://www.sandbox.paypal.com", 
                _ref2[misc_ENV.PRODUCTION] = "https://www.paypal.com", _ref2[misc_ENV.TEST] = "mock://www.paypal.com", 
                _ref2[misc_ENV.DEMO] = window.location.protocol + "//localhost.paypal.com:" + window.location.port, 
                _ref2;
            },
            get wwwApiUrls() {
                var _ref3;
                return _ref3 = {}, _ref3[misc_ENV.LOCAL] = "https://www." + config.stage + ".qa.paypal.com", 
                _ref3[misc_ENV.STAGE] = "https://www." + config.stage + ".qa.paypal.com", _ref3[misc_ENV.SANDBOX] = "https://www.sandbox.paypal.com", 
                _ref3[misc_ENV.PRODUCTION] = "https://www.paypal.com", _ref3[misc_ENV.TEST] = window.location.protocol + "//" + window.location.host, 
                _ref3;
            },
            get corsApiUrls() {
                var _ref4;
                return _ref4 = {}, _ref4[misc_ENV.LOCAL] = "https://" + config.apiStage + ".qa.paypal.com:11888", 
                _ref4[misc_ENV.STAGE] = "https://" + config.apiStage + ".qa.paypal.com:11888", _ref4[misc_ENV.SANDBOX] = "https://cors.api.sandbox.paypal.com", 
                _ref4[misc_ENV.PRODUCTION] = "https://cors.api.paypal.com", _ref4[misc_ENV.TEST] = window.location.protocol + "//" + window.location.host, 
                _ref4;
            },
            get apiUrls() {
                var _ref5, domain = window.location.protocol + "//" + window.location.host, corsApiUrls = config.corsApiUrls, wwwApiUrls = config.wwwApiUrls;
                return _ref5 = {}, _ref5[misc_ENV.LOCAL] = domain === wwwApiUrls.local ? wwwApiUrls.local : corsApiUrls.local, 
                _ref5[misc_ENV.STAGE] = domain === wwwApiUrls.stage ? wwwApiUrls.stage : corsApiUrls.stage, 
                _ref5[misc_ENV.SANDBOX] = domain === wwwApiUrls.sandbox ? wwwApiUrls.sandbox : corsApiUrls.sandbox, 
                _ref5[misc_ENV.PRODUCTION] = domain === wwwApiUrls.production ? wwwApiUrls.production : corsApiUrls.production, 
                _ref5[misc_ENV.TEST] = domain === wwwApiUrls.test ? wwwApiUrls.test : corsApiUrls.test, 
                _ref5;
            },
            checkoutUris: (_checkoutUris = {}, _checkoutUris[misc_ENV.LOCAL] = "/webapps/hermes?ul=0", 
            _checkoutUris[misc_ENV.STAGE] = "/webapps/hermes", _checkoutUris[misc_ENV.SANDBOX] = "/checkoutnow", 
            _checkoutUris[misc_ENV.PRODUCTION] = "/checkoutnow", _checkoutUris[misc_ENV.TEST] = "/base/test/windows/checkout/index.htm?checkouturl=true", 
            _checkoutUris[misc_ENV.DEMO] = "/demo/dev/checkout.htm", _checkoutUris),
            altpayUris: (_altpayUris = {}, _altpayUris[misc_ENV.LOCAL] = "/latinumcheckout", 
            _altpayUris[misc_ENV.STAGE] = "/latinumcheckout", _altpayUris[misc_ENV.SANDBOX] = "/latinumcheckout", 
            _altpayUris[misc_ENV.PRODUCTION] = "/latinumcheckout", _altpayUris[misc_ENV.TEST] = "/base/test/windows/checkout/index.htm?checkouturl=true", 
            _altpayUris[misc_ENV.DEMO] = "/demo/dev/checkout.htm", _altpayUris),
            guestUris: (_guestUris = {}, _guestUris[misc_ENV.LOCAL] = "/webapps/xoonboarding", 
            _guestUris[misc_ENV.STAGE] = "/webapps/xoonboarding", _guestUris[misc_ENV.SANDBOX] = "/webapps/xoonboarding", 
            _guestUris[misc_ENV.PRODUCTION] = "/webapps/xoonboarding", _guestUris[misc_ENV.TEST] = "/base/test/windows/checkout/index.htm?guesturl=true", 
            _guestUris[misc_ENV.DEMO] = "/demo/dev/guest.htm", _guestUris),
            billingUris: (_billingUris = {}, _billingUris[misc_ENV.LOCAL] = "/webapps/hermes/agreements?ul=0", 
            _billingUris[misc_ENV.STAGE] = "/webapps/hermes/agreements", _billingUris[misc_ENV.SANDBOX] = "/agreements/approve", 
            _billingUris[misc_ENV.PRODUCTION] = "/agreements/approve", _billingUris[misc_ENV.TEST] = "/base/test/windows/checkout/index.htm?billingurl=true", 
            _billingUris[misc_ENV.DEMO] = "/demo/dev/checkout.htm", _billingUris),
            buttonUris: (_buttonUris = {}, _buttonUris[misc_ENV.LOCAL] = "/webapps/hermes/button", 
            _buttonUris[misc_ENV.STAGE] = "/webapps/hermes/button", _buttonUris[misc_ENV.SANDBOX] = "/webapps/hermes/button", 
            _buttonUris[misc_ENV.PRODUCTION] = "/webapps/hermes/button", _buttonUris[misc_ENV.TEST] = "/base/test/windows/button/index.htm", 
            _buttonUris[misc_ENV.DEMO] = "/demo/dev/button.htm", _buttonUris),
            postBridgeUris: (_postBridgeUris = {}, _postBridgeUris[misc_ENV.LOCAL] = "/webapps/hermes/component-meta", 
            _postBridgeUris[misc_ENV.STAGE] = "/webapps/hermes/component-meta", _postBridgeUris[misc_ENV.SANDBOX] = "/webapps/hermes/component-meta", 
            _postBridgeUris[misc_ENV.PRODUCTION] = "/webapps/hermes/component-meta", _postBridgeUris[misc_ENV.TEST] = "/base/test/windows/component-meta/index.htm", 
            _postBridgeUris[misc_ENV.DEMO] = "/demo/dev/bridge.htm", _postBridgeUris),
            legacyCheckoutUris: (_legacyCheckoutUris = {}, _legacyCheckoutUris[misc_ENV.LOCAL] = "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true", 
            _legacyCheckoutUris[misc_ENV.STAGE] = "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true", 
            _legacyCheckoutUris[misc_ENV.SANDBOX] = "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true", 
            _legacyCheckoutUris[misc_ENV.PRODUCTION] = "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true", 
            _legacyCheckoutUris[misc_ENV.TEST] = "#fallback", _legacyCheckoutUris),
            buttonJSUrls: (_buttonJSUrls = {}, _buttonJSUrls[misc_ENV.LOCAL] = "https://www.paypalobjects.com/api/button.js", 
            _buttonJSUrls[misc_ENV.STAGE] = "https://www.paypalobjects.com/api/button.js", _buttonJSUrls[misc_ENV.SANDBOX] = "https://www.paypalobjects.com/api/button.js", 
            _buttonJSUrls[misc_ENV.PRODUCTION] = "https://www.paypalobjects.com/api/button.js", 
            _buttonJSUrls[misc_ENV.TEST] = "/base/test/lib/button.js", _buttonJSUrls[misc_ENV.DEMO] = "https://www.paypalobjects.com/api/button.js", 
            _buttonJSUrls),
            get buttonJSUrl() {
                return config.buttonJSUrls[config.env];
            },
            loginUri: "/signin/",
            loggerUri: "/webapps/hermes/api/logger",
            pptmUri: "/tagmanager/pptm.js",
            get postBridgeUri() {
                return config.postBridgeUris[config.env] + "?xcomponent=1";
            },
            paymentStandardUri: "/webapps/xorouter?cmd=_s-xclick",
            authApiUri: "/v1/oauth2/token",
            paymentApiUri: "/v1/payments/payment",
            orderApiUri: "/v1/checkout/orders",
            billingApiUri: "/v1/billing-agreements/agreement-tokens",
            experienceApiUri: "/v1/payment-experience/web-profiles",
            trackingApiUri: "/v1/risk/transaction-contexts",
            get checkoutUrls() {
                var _ref6, paypalUrls = config.paypalUrls;
                return _ref6 = {}, _ref6[misc_ENV.LOCAL] = "" + paypalUrls.local + config.checkoutUris.local.replace(":" + config.ports.default, ":" + config.ports.checkout), 
                _ref6[misc_ENV.STAGE] = "" + paypalUrls.stage + config.checkoutUris.stage, _ref6[misc_ENV.SANDBOX] = "" + paypalUrls.sandbox + config.checkoutUris.sandbox, 
                _ref6[misc_ENV.PRODUCTION] = "" + paypalUrls.production + config.checkoutUris.production, 
                _ref6[misc_ENV.TEST] = "" + paypalUrls.test + config.checkoutUris.test, _ref6[misc_ENV.DEMO] = "" + paypalUrls.test + config.checkoutUris.demo, 
                _ref6;
            },
            get guestUrls() {
                var _ref7, paypalUrls = config.paypalUrls;
                return _ref7 = {}, _ref7[misc_ENV.LOCAL] = "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.guest) + config.guestUris.local, 
                _ref7[misc_ENV.STAGE] = "" + paypalUrls.stage + config.guestUris.stage, _ref7[misc_ENV.SANDBOX] = "" + paypalUrls.sandbox + config.guestUris.sandbox, 
                _ref7[misc_ENV.PRODUCTION] = "" + paypalUrls.production + config.guestUris.production, 
                _ref7[misc_ENV.TEST] = "" + paypalUrls.test + config.guestUris.test, _ref7[misc_ENV.DEMO] = "" + paypalUrls.test + config.guestUris.demo, 
                _ref7;
            },
            get altpayUrls() {
                var _ref8, paypalUrls = config.paypalUrls;
                return _ref8 = {}, _ref8[misc_ENV.LOCAL] = "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.altpay) + config.altpayUris.local, 
                _ref8[misc_ENV.STAGE] = "" + paypalUrls.stage + config.altpayUris.stage, _ref8[misc_ENV.SANDBOX] = "" + paypalUrls.sandbox + config.altpayUris.sandbox, 
                _ref8[misc_ENV.PRODUCTION] = "" + paypalUrls.production + config.altpayUris.production, 
                _ref8[misc_ENV.TEST] = "" + paypalUrls.test + config.altpayUris.test, _ref8[misc_ENV.DEMO] = "" + paypalUrls.test + config.altpayUris.demo, 
                _ref8;
            },
            get billingUrls() {
                var _ref9, paypalUrls = config.paypalUrls;
                return _ref9 = {}, _ref9[misc_ENV.LOCAL] = "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.checkout) + config.billingUris.local, 
                _ref9[misc_ENV.STAGE] = "" + paypalUrls.stage + config.billingUris.stage, _ref9[misc_ENV.SANDBOX] = "" + paypalUrls.sandbox + config.billingUris.sandbox, 
                _ref9[misc_ENV.PRODUCTION] = "" + paypalUrls.production + config.billingUris.production, 
                _ref9[misc_ENV.TEST] = "" + paypalUrls.test + config.billingUris.test, _ref9[misc_ENV.DEMO] = "" + paypalUrls.test + config.billingUris.demo, 
                _ref9;
            },
            get buttonUrls() {
                var _ref10, paypalUrls = config.paypalUrls;
                return _ref10 = {}, _ref10[misc_ENV.LOCAL] = "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.button) + config.buttonUris.local, 
                _ref10[misc_ENV.STAGE] = "" + paypalUrls.stage + config.buttonUris.stage, _ref10[misc_ENV.SANDBOX] = "" + paypalUrls.sandbox + config.buttonUris.sandbox, 
                _ref10[misc_ENV.PRODUCTION] = "" + paypalUrls.production + config.buttonUris.production, 
                _ref10[misc_ENV.TEST] = "" + paypalUrls.test + config.buttonUris.test, _ref10[misc_ENV.DEMO] = "" + paypalUrls.demo + config.buttonUris.demo, 
                _ref10;
            },
            get loginUrls() {
                var _ref11, paypalUrls = config.paypalUrls;
                return _ref11 = {}, _ref11[misc_ENV.LOCAL] = "" + paypalUrls.stage + config.loginUri, 
                _ref11[misc_ENV.STAGE] = "" + paypalUrls.stage + config.loginUri, _ref11[misc_ENV.SANDBOX] = "" + paypalUrls.sandbox + config.loginUri, 
                _ref11[misc_ENV.PRODUCTION] = "" + paypalUrls.production + config.loginUri, _ref11[misc_ENV.TEST] = "" + paypalUrls.test + config.loginUri, 
                _ref11;
            },
            get paymentsStandardUrls() {
                var _ref12, paypalUrls = config.paypalUrls;
                return _ref12 = {}, _ref12[misc_ENV.LOCAL] = "" + paypalUrls.local + config.paymentStandardUri, 
                _ref12[misc_ENV.STAGE] = "" + paypalUrls.stage + config.paymentStandardUri, _ref12[misc_ENV.SANDBOX] = "" + paypalUrls.sandbox + config.paymentStandardUri, 
                _ref12[misc_ENV.PRODUCTION] = "" + paypalUrls.production + config.paymentStandardUri, 
                _ref12[misc_ENV.TEST] = "" + paypalUrls.test + config.paymentStandardUri, _ref12;
            },
            get metaFrameUrls() {
                var _ref13, paypalUrls = config.paypalUrls;
                return _ref13 = {}, _ref13[misc_ENV.LOCAL] = "" + paypalUrls.local + config.postBridgeUri + "&env=local", 
                _ref13[misc_ENV.STAGE] = "" + paypalUrls.stage + config.postBridgeUri + "&env=stage&stage=" + config.stage, 
                _ref13[misc_ENV.SANDBOX] = "" + paypalUrls.sandbox + config.postBridgeUri + "&env=sandbox", 
                _ref13[misc_ENV.PRODUCTION] = "" + paypalUrls.production + config.postBridgeUri + "&env=production", 
                _ref13[misc_ENV.TEST] = "" + paypalUrls.test + config.postBridgeUri + "&env=test", 
                _ref13[misc_ENV.DEMO] = "" + paypalUrls.demo + config.postBridgeUri + "&env=demo", 
                _ref13;
            },
            get legacyCheckoutUrls() {
                var _ref14, paypalUrls = config.paypalUrls;
                return _ref14 = {}, _ref14[misc_ENV.LOCAL] = "" + paypalUrls.stage + config.legacyCheckoutUris.local, 
                _ref14[misc_ENV.STAGE] = "" + paypalUrls.stage + config.legacyCheckoutUris.stage, 
                _ref14[misc_ENV.SANDBOX] = "" + paypalUrls.sandbox + config.legacyCheckoutUris.sandbox, 
                _ref14[misc_ENV.PRODUCTION] = "" + paypalUrls.production + config.legacyCheckoutUris.production, 
                _ref14[misc_ENV.TEST] = "" + paypalUrls.test + config.legacyCheckoutUris.test, _ref14;
            },
            get authApiUrls() {
                var _ref15, apiUrls = config.apiUrls, authApiUri = config.authApiUri;
                return _ref15 = {}, _ref15[misc_ENV.LOCAL] = "" + apiUrls.local + authApiUri, _ref15[misc_ENV.STAGE] = "" + apiUrls.stage + authApiUri, 
                _ref15[misc_ENV.SANDBOX] = "" + apiUrls.sandbox + authApiUri, _ref15[misc_ENV.PRODUCTION] = "" + apiUrls.production + authApiUri, 
                _ref15[misc_ENV.TEST] = "" + apiUrls.test + authApiUri, _ref15;
            },
            get paymentApiUrls() {
                var _ref16, apiUrls = config.apiUrls, paymentApiUri = config.paymentApiUri;
                return _ref16 = {}, _ref16[misc_ENV.LOCAL] = "" + apiUrls.local + paymentApiUri, 
                _ref16[misc_ENV.STAGE] = "" + apiUrls.stage + paymentApiUri, _ref16[misc_ENV.SANDBOX] = "" + apiUrls.sandbox + paymentApiUri, 
                _ref16[misc_ENV.PRODUCTION] = "" + apiUrls.production + paymentApiUri, _ref16[misc_ENV.TEST] = "" + apiUrls.test + paymentApiUri, 
                _ref16;
            },
            get orderApiUrls() {
                var _ref17, apiUrls = config.apiUrls, orderApiUri = config.orderApiUri;
                return _ref17 = {}, _ref17[misc_ENV.LOCAL] = "" + apiUrls.local + orderApiUri, _ref17[misc_ENV.STAGE] = "" + apiUrls.stage + orderApiUri, 
                _ref17[misc_ENV.SANDBOX] = "" + apiUrls.sandbox + orderApiUri, _ref17[misc_ENV.PRODUCTION] = "" + apiUrls.production + orderApiUri, 
                _ref17[misc_ENV.TEST] = "" + apiUrls.test + orderApiUri, _ref17;
            },
            get billingApiUrls() {
                var _ref18, apiUrls = config.apiUrls, billingApiUri = config.billingApiUri;
                return _ref18 = {}, _ref18[misc_ENV.LOCAL] = "" + apiUrls.local + billingApiUri, 
                _ref18[misc_ENV.STAGE] = "" + apiUrls.stage + billingApiUri, _ref18[misc_ENV.SANDBOX] = "" + apiUrls.sandbox + billingApiUri, 
                _ref18[misc_ENV.PRODUCTION] = "" + apiUrls.production + billingApiUri, _ref18[misc_ENV.TEST] = "" + apiUrls.test + billingApiUri, 
                _ref18;
            },
            get experienceApiUrls() {
                var _ref19, apiUrls = config.apiUrls, experienceApiUri = config.experienceApiUri;
                return _ref19 = {}, _ref19[misc_ENV.LOCAL] = "" + apiUrls.local + experienceApiUri, 
                _ref19[misc_ENV.STAGE] = "" + apiUrls.stage + experienceApiUri, _ref19[misc_ENV.SANDBOX] = "" + apiUrls.sandbox + experienceApiUri, 
                _ref19[misc_ENV.PRODUCTION] = "" + apiUrls.production + experienceApiUri, _ref19[misc_ENV.TEST] = "" + apiUrls.test + experienceApiUri, 
                _ref19;
            },
            get trackingApiUrls() {
                var _ref20, apiUrls = config.apiUrls, trackingApiUri = config.trackingApiUri;
                return _ref20 = {}, _ref20[misc_ENV.LOCAL] = "" + apiUrls.local + trackingApiUri, 
                _ref20[misc_ENV.STAGE] = "" + apiUrls.stage + trackingApiUri, _ref20[misc_ENV.SANDBOX] = "" + apiUrls.sandbox + trackingApiUri, 
                _ref20[misc_ENV.PRODUCTION] = "" + apiUrls.production + trackingApiUri, _ref20[misc_ENV.TEST] = "" + apiUrls.test + trackingApiUri, 
                _ref20;
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
                return "" + config.paypalUrl + config.postBridgeUri;
            },
            get postBridgeDomain() {
                return "" + config.paypalDomain;
            },
            get loggerUrl() {
                return "" + config.paypalUrl + config.loggerUri;
            },
            get pptmUrl() {
                return "" + (config.env === misc_ENV.LOCAL ? config.paypalUrls[misc_ENV.STAGE] : config.paypalUrl) + config.pptmUri;
            },
            get authApiUrl() {
                return "" + config.apiUrl + config.authApiUri;
            },
            get paymentApiUrl() {
                return "" + config.apiUrl + config.paymentApiUri;
            },
            get orderApiUrl() {
                return "" + config.apiUrl + config.orderApiUri;
            },
            get billingApiUrl() {
                return "" + config.apiUrl + config.billingApiUri;
            },
            get experienceApiUrl() {
                return "" + config.apiUrl + config.experienceApiUri;
            },
            defaultLocale: {
                country: COUNTRY.US,
                lang: LANG.EN
            },
            locales: (_locales = {}, _locales[COUNTRY.AD] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.AE] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR ], _locales[COUNTRY.AG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.AI] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.AL] = [ LANG.EN ], 
            _locales[COUNTRY.AM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.AN] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.AO] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.AR] = [ LANG.ES, LANG.EN ], 
            _locales[COUNTRY.AT] = [ LANG.DE, LANG.EN ], _locales[COUNTRY.AU] = [ LANG.EN ], 
            _locales[COUNTRY.AW] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.AZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.BA] = [ LANG.EN ], _locales[COUNTRY.BB] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.BE] = [ LANG.EN, LANG.NL, LANG.FR ], _locales[COUNTRY.BF] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.BG] = [ LANG.EN ], _locales[COUNTRY.BH] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.BI] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _locales[COUNTRY.BJ] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.BM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.BN] = [ LANG.EN ], 
            _locales[COUNTRY.BO] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _locales[COUNTRY.BR] = [ LANG.PT, LANG.EN ], 
            _locales[COUNTRY.BS] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.BT] = [ LANG.EN ], 
            _locales[COUNTRY.BW] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.BY] = [ LANG.EN ], 
            _locales[COUNTRY.BZ] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _locales[COUNTRY.C2] = [ LANG.ZH, LANG.EN ], 
            _locales[COUNTRY.CA] = [ LANG.EN, LANG.FR ], _locales[COUNTRY.CD] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.CG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.CH] = [ LANG.DE, LANG.FR, LANG.EN ], 
            _locales[COUNTRY.CI] = [ LANG.FR, LANG.EN ], _locales[COUNTRY.CK] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.CL] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _locales[COUNTRY.CM] = [ LANG.FR, LANG.EN ], 
            _locales[COUNTRY.CN] = [ LANG.ZH ], _locales[COUNTRY.CO] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _locales[COUNTRY.CR] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _locales[COUNTRY.CV] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.CY] = [ LANG.EN ], _locales[COUNTRY.CZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.DE] = [ LANG.DE, LANG.EN ], _locales[COUNTRY.DJ] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.DK] = [ LANG.DA, LANG.EN ], _locales[COUNTRY.DM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.DO] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _locales[COUNTRY.DZ] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.EC] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _locales[COUNTRY.EE] = [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.EG] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.ER] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.ES] = [ LANG.ES, LANG.EN ], _locales[COUNTRY.ET] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.FI] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.FJ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.FK] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.FM] = [ LANG.EN ], 
            _locales[COUNTRY.FO] = [ LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.FR] = [ LANG.FR, LANG.EN ], 
            _locales[COUNTRY.GA] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _locales[COUNTRY.GB] = [ LANG.EN ], 
            _locales[COUNTRY.GD] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.GE] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.GF] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.GI] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.GL] = [ LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.GM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.GN] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _locales[COUNTRY.GP] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.GR] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.GT] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _locales[COUNTRY.GW] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.GY] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.HK] = [ LANG.EN, LANG.ZH ], _locales[COUNTRY.HN] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _locales[COUNTRY.HR] = [ LANG.EN ], _locales[COUNTRY.HU] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.ID] = [ LANG.ID, LANG.EN ], _locales[COUNTRY.IE] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.IL] = [ LANG.HE, LANG.EN ], _locales[COUNTRY.IN] = [ LANG.EN ], 
            _locales[COUNTRY.IS] = [ LANG.EN ], _locales[COUNTRY.IT] = [ LANG.IT, LANG.EN ], 
            _locales[COUNTRY.JM] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _locales[COUNTRY.JO] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.JP] = [ LANG.JA, LANG.EN ], _locales[COUNTRY.KE] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.KG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.KH] = [ LANG.EN ], 
            _locales[COUNTRY.KI] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.KM] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.KN] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.KR] = [ LANG.KO, LANG.EN ], 
            _locales[COUNTRY.KW] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.KY] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.KZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.LA] = [ LANG.EN ], 
            _locales[COUNTRY.LC] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.LI] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.LK] = [ LANG.EN ], _locales[COUNTRY.LS] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.LT] = [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.LU] = [ LANG.EN, LANG.DE, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.LV] = [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.MA] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.MC] = [ LANG.FR, LANG.EN ], _locales[COUNTRY.MD] = [ LANG.EN ], 
            _locales[COUNTRY.ME] = [ LANG.EN ], _locales[COUNTRY.MG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.MH] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.MK] = [ LANG.EN ], 
            _locales[COUNTRY.ML] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _locales[COUNTRY.MN] = [ LANG.EN ], 
            _locales[COUNTRY.MQ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.MR] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.MS] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.MT] = [ LANG.EN ], 
            _locales[COUNTRY.MU] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.MV] = [ LANG.EN ], 
            _locales[COUNTRY.MW] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.MX] = [ LANG.ES, LANG.EN ], 
            _locales[COUNTRY.MY] = [ LANG.EN ], _locales[COUNTRY.MZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.NA] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.NC] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.NE] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _locales[COUNTRY.NF] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.NG] = [ LANG.EN ], _locales[COUNTRY.NI] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _locales[COUNTRY.NL] = [ LANG.NL, LANG.EN ], _locales[COUNTRY.NO] = [ LANG.NO, LANG.EN ], 
            _locales[COUNTRY.NP] = [ LANG.EN ], _locales[COUNTRY.NR] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.NU] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.NZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.OM] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.PA] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _locales[COUNTRY.PE] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _locales[COUNTRY.PF] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.PG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.PH] = [ LANG.EN ], 
            _locales[COUNTRY.PL] = [ LANG.PL, LANG.EN ], _locales[COUNTRY.PM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.PN] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.PT] = [ LANG.PT, LANG.EN ], 
            _locales[COUNTRY.PW] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.PY] = [ LANG.ES, LANG.EN ], 
            _locales[COUNTRY.QA] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR ], _locales[COUNTRY.RE] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.RO] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.RS] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.RU] = [ LANG.RU, LANG.EN ], _locales[COUNTRY.RW] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.SA] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.SB] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.SC] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _locales[COUNTRY.SE] = [ LANG.SV, LANG.EN ], 
            _locales[COUNTRY.SG] = [ LANG.EN ], _locales[COUNTRY.SH] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.SI] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.SJ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.SK] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.SL] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.SM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.SN] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.SO] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.SR] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.ST] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.SV] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _locales[COUNTRY.SZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.TC] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.TD] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _locales[COUNTRY.TG] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.TH] = [ LANG.TH, LANG.EN ], _locales[COUNTRY.TJ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.TM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.TN] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.TO] = [ LANG.EN ], _locales[COUNTRY.TR] = [ LANG.TR, LANG.EN ], 
            _locales[COUNTRY.TT] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.TV] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.TW] = [ LANG.ZH, LANG.EN ], _locales[COUNTRY.TZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.UA] = [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.UG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.US] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.UY] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _locales[COUNTRY.VA] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.VC] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.VE] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _locales[COUNTRY.VG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.VN] = [ LANG.EN ], _locales[COUNTRY.VU] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.WF] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.WS] = [ LANG.EN ], 
            _locales[COUNTRY.YE] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.YT] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.ZA] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _locales[COUNTRY.ZM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _locales[COUNTRY.ZW] = [ LANG.EN ], _locales)
        }, lib = ("function" == typeof Symbol && Symbol.iterator, memoize(function() {
            try {
                if (window.localStorage) {
                    var _value = Math.random().toString();
                    window.localStorage.setItem("__test__localStorage__", _value);
                    var result = window.localStorage.getItem("__test__localStorage__");
                    window.localStorage.removeItem("__test__localStorage__");
                    if (_value === result) return !0;
                }
            } catch (err) {}
            return !1;
        }), __webpack_require__("./node_modules/post-robot/src/lib/index.js")), src_conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), global = __webpack_require__("./node_modules/post-robot/src/global.js"), SEND_MESSAGE_STRATEGIES = {};
        SEND_MESSAGE_STRATEGIES[src_conf.b.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
            try {
                __webpack_require__("./node_modules/post-robot/src/compat/index.js").emulateIERestrictions(window, win);
            } catch (err) {
                return;
            }
            var domains = void 0;
            domains = Array.isArray(domain) ? domain : domain ? [ domain ] : [ src_conf.b.WILDCARD ];
            domains = domains.map(function(dom) {
                if (0 === dom.indexOf(src_conf.b.MOCK_PROTOCOL)) {
                    if (window.location.protocol === src_conf.b.FILE_PROTOCOL) return src_conf.b.WILDCARD;
                    if (!Object(cross_domain_utils_src.j)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                    return Object(cross_domain_utils_src.a)(win);
                }
                return 0 === dom.indexOf(src_conf.b.FILE_PROTOCOL) ? src_conf.b.WILDCARD : dom;
            });
            domains.forEach(function(dom) {
                return win.postMessage(serializedMessage, dom);
            });
        };
        var _require = __webpack_require__("./node_modules/post-robot/src/bridge/index.js"), sendBridgeMessage = _require.sendBridgeMessage, needsBridgeForBrowser = _require.needsBridgeForBrowser, isBridge = _require.isBridge;
        SEND_MESSAGE_STRATEGIES[src_conf.b.SEND_STRATEGIES.BRIDGE] = function(win, serializedMessage, domain) {
            if (needsBridgeForBrowser() || isBridge()) {
                if (Object(cross_domain_utils_src.o)(win)) throw new Error("Post message through bridge disabled between same domain windows");
                if (!1 !== Object(cross_domain_utils_src.p)(window, win)) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
                return sendBridgeMessage(win, serializedMessage, domain);
            }
        };
        SEND_MESSAGE_STRATEGIES[src_conf.b.SEND_STRATEGIES.GLOBAL] = function(win, serializedMessage, domain) {
            if (needsBridgeForBrowser()) {
                if (!Object(cross_domain_utils_src.o)(win)) throw new Error("Post message through global disabled between different domain windows");
                if (!1 !== Object(cross_domain_utils_src.p)(window, win)) throw new Error("Can only use global to communicate between two different windows, not between frames");
                var foreignGlobal = win[src_conf.b.WINDOW_PROPS.POSTROBOT];
                if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
                return foreignGlobal.receiveMessage({
                    source: window,
                    origin: Object(cross_domain_utils_src.c)(),
                    data: serializedMessage
                });
            }
        };
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, cross_domain_safe_weakmap_src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js");
        global.a.responseListeners = global.a.responseListeners || {};
        global.a.requestListeners = global.a.requestListeners || {};
        global.a.WINDOW_WILDCARD = global.a.WINDOW_WILDCARD || new function() {}();
        global.a.erroredResponseListeners = global.a.erroredResponseListeners || {};
        var _RECEIVE_MESSAGE_TYPE, __DOMAIN_REGEX__ = "__domain_regex__", types__extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _RECEIVE_MESSAGE_TYPE[src_conf.b.POST_MESSAGE_TYPE.ACK] = function(source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                var options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!Object(cross_domain_utils_src.s)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                options.ack = !0;
            }
        }, _RECEIVE_MESSAGE_TYPE[src_conf.b.POST_MESSAGE_TYPE.REQUEST] = function(source, origin, message) {
            function respond(data) {
                return message.fireAndForget || Object(cross_domain_utils_src.r)(source) ? zalgo_promise_src.ZalgoPromise.resolve() : sendMessage(source, types__extends({
                    target: message.originalSource,
                    hash: message.hash,
                    name: message.name
                }, data), origin);
            }
            var options = getRequestListener({
                name: message.name,
                win: source,
                domain: origin
            });
            return zalgo_promise_src.ZalgoPromise.all([ respond({
                type: src_conf.b.POST_MESSAGE_TYPE.ACK
            }), zalgo_promise_src.ZalgoPromise.try(function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!Object(cross_domain_utils_src.s)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                var data = message.data;
                return options.handler({
                    source: source,
                    origin: origin,
                    data: data
                });
            }).then(function(data) {
                return respond({
                    type: src_conf.b.POST_MESSAGE_TYPE.RESPONSE,
                    ack: src_conf.b.POST_MESSAGE_ACK.SUCCESS,
                    data: data
                });
            }, function(err) {
                var error = Object(lib.o)(err).replace(/^Error: /, ""), code = err.code;
                return respond({
                    type: src_conf.b.POST_MESSAGE_TYPE.RESPONSE,
                    ack: src_conf.b.POST_MESSAGE_ACK.ERROR,
                    error: error,
                    code: code
                });
            }) ]).then(lib.j).catch(function(err) {
                if (options && options.handleError) return options.handleError(err);
                lib.i.error(Object(lib.o)(err));
            });
        }, _RECEIVE_MESSAGE_TYPE[src_conf.b.POST_MESSAGE_TYPE.RESPONSE] = function(source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                var options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!Object(cross_domain_utils_src.s)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + options.domain);
                deleteResponseListener(message.hash);
                if (message.ack === src_conf.b.POST_MESSAGE_ACK.ERROR) {
                    var err = new Error(message.error);
                    message.code && (err.code = message.code);
                    return options.respond(err, null);
                }
                if (message.ack === src_conf.b.POST_MESSAGE_ACK.SUCCESS) {
                    var data = message.data || message.response;
                    return options.respond(null, {
                        source: source,
                        origin: origin,
                        data: data
                    });
                }
            }
        }, _RECEIVE_MESSAGE_TYPE), receive__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        global.a.receivedMessages = global.a.receivedMessages || [];
        global.a.receiveMessage = receiveMessage;
        global.a.requestPromises = global.a.requestPromises || new cross_domain_safe_weakmap_src.a();
        global.a.send = _send;
        var server__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        global.a.on = _on;
        var public_parent = Object(cross_domain_utils_src.b)(), bridge = __webpack_require__("./node_modules/post-robot/src/bridge/index.js"), interface_bridge = interface_namespaceObject;
        init();
        var windowReady = new zalgo_promise_src.ZalgoPromise(function(resolve) {
            "undefined" != typeof document && "complete" === document.readyState && resolve();
            window.addEventListener && window.addEventListener("load", resolve);
        }), payloadBuilders = [], metaBuilders = [], trackingBuilders = [], headerBuilders = [], config_config = {
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
            logLevel: "warn",
            autoLog: [ "warn", "error" ],
            logUnload: !0,
            logPerformance: !0
        }, logLevels = [ "error", "warn", "info", "debug" ], logger__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, buffer = [], tracking = [];
        Function.prototype.bind && window.console && "object" === logger__typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
        var logger_transport = function(headers, data, options) {
            return ajax("post", config_config.uri, headers, data, options);
        }, loaded = !1;
        setTimeout(function() {
            loaded = !0;
        }, 1);
        var _flush = function(method, interval) {
            var debounce = {};
            return function() {
                var args = arguments;
                if (debounce.timeout) {
                    clearTimeout(debounce.timeout);
                    delete debounce.timeout;
                }
                debounce.timeout = setTimeout(function() {
                    var resolver = debounce.resolver, rejector = debounce.rejector;
                    delete debounce.promise;
                    delete debounce.resolver;
                    delete debounce.rejector;
                    delete debounce.timeout;
                    return zalgo_promise_src.ZalgoPromise.resolve().then(function() {
                        return method.apply(null, args);
                    }).then(resolver, rejector);
                }, interval);
                debounce.promise = debounce.promise || new zalgo_promise_src.ZalgoPromise(function(resolver, rejector) {
                    debounce.resolver = resolver;
                    debounce.rejector = rejector;
                });
                return debounce.promise;
            };
        }(immediateFlush, config_config.debounceInterval), enablePerformance = window && window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0, clientTimer = timer(), reqTimer = timer(reqStartElapsed()), initiated = !1, windowID = util_uniqueID(), pageID = util_uniqueID(), currentState = config_config.initial_state_name, startTime = void 0;
        addPayloadBuilder(function() {
            return {
                windowID: windowID,
                pageID: pageID
            };
        });
        addMetaBuilder(function() {
            return {
                state: "ui_" + currentState
            };
        });
        var documentReady = new zalgo_promise_src.ZalgoPromise(function(resolve) {
            if (isDocumentReady()) return resolve();
            var interval = setInterval(function() {
                if (isDocumentReady()) {
                    clearInterval(interval);
                    return resolve();
                }
            }, 10);
        }), parseQuery = (documentReady.then(function() {
            if (document.body) return document.body;
            throw new Error("Document ready but document.body not present");
        }), memoize(function(queryString) {
            var params = {};
            if (!queryString) return params;
            if (-1 === queryString.indexOf("=")) return params;
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
        })), bowserCache = (memoize(function() {
            return Boolean(window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0);
        }), once(function() {
            setTransport(proxyMethod("log", Object(cross_domain_utils_src.h)(window), getTransport()));
        }), {}), http__extends = (once(function(state) {
            for (var bowser = getBowser(), _iterator2 = Object.keys(config.SUPPORTED_BROWSERS), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref3;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref3 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref3 = _i2.value;
                }
                if (bowser[_ref3]) return;
            }
            info("unrecognized_browser_" + state, {
                name: bowser.name,
                version: bowser.version,
                mobile: bowser.mobile,
                android: bowser.android,
                ios: bowser.ios
            });
            _flush();
        }), Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }), http__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, HEADERS = {
            CONTENT_TYPE: "content-type",
            ACCEPT: "accept"
        }, http_headerBuilders = [], corrids = [];
        addPayloadBuilder(function() {
            return {
                prev_corr_ids: corrids.join(",")
            };
        });
        http_request.get = function(url) {
            var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return http_request(http__extends({
                method: "get",
                url: url
            }, options));
        };
        http_request.post = function(url, data) {
            var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return http_request(http__extends({
                method: "post",
                url: url,
                data: data
            }, options));
        };
        http_request.addHeaderBuilder = function(method) {
            http_headerBuilders.push(method);
        };
        var _BUTTON_LOGO$PP, _BUTTON_LOGO$PAYPAL, _BUTTON_LOGO$CREDIT, _BUTTON_LOGO$VENMO, _BUTTON_LOGO$IDEAL, _BUTTON_LOGO$ELV, _fundingLogos, _cardLogos, getCurrentScript = (Object.assign, 
        Object.assign, Object.assign, memoize(function() {
            for (var scripts = Array.prototype.slice.call(document.getElementsByTagName("script")), _iterator = scripts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var script = _ref;
                if (script.src && (script.src.replace(/^https?:/, "").split("?")[0] === config.scriptUrl || script.hasAttribute("data-paypal-checkout"))) return script;
                if (script.src && -1 !== script.src.indexOf("paypal.checkout.v4.js")) return script;
            }
            document.currentScript && debug("current_script_not_recognized", {
                src: document.currentScript.src
            });
        })), jsx_JsxHTMLNode = (memoize(function() {
            var env = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : config.env;
            return zalgo_promise_src.ZalgoPromise.try(function() {
                if (isIEIntranet()) return {
                    iframeEligible: !1,
                    iframeEligibleReason: "ie_intranet",
                    rememberedFunding: []
                };
                var metaFrameUrl = config.metaFrameUrls[env], metaFrameDomain = config.paypalDomains[env];
                return zalgo_promise_src.ZalgoPromise.try(function() {
                    if (interface_bridge) return interface_bridge.openBridge(extendUrl(metaFrameUrl, {
                        version: getScriptVersion()
                    }), metaFrameDomain).then(noop);
                    throw new Error("Opening meta window without bridge support is not currently supported");
                }).then(function(win) {
                    return server_once("meta", {
                        domain: metaFrameDomain,
                        window: win
                    });
                }).then(function(_ref) {
                    return _ref.data;
                });
            });
        }), function() {
            function JsxHTMLNode(name, props, children) {
                _classCallCheck(this, JsxHTMLNode);
                this.name = name;
                this.props = props;
                this.children = children;
            }
            JsxHTMLNode.prototype.toString = function() {
                return "<" + this.name + (this.props ? " " : "") + (this.props ? this.propsToString() : "") + ">" + this.childrenToString() + "</" + this.name + ">";
            };
            JsxHTMLNode.prototype.propsToString = function() {
                var props = this.props;
                return props ? Object.keys(props).filter(function(key) {
                    return "innerHTML" !== key && props && !1 !== props[key];
                }).map(function(key) {
                    return props && !0 === props[key] ? "" + htmlEncode(key) : props ? htmlEncode(key) + '="' + htmlEncode(props[key]) + '"' : "";
                }).join(" ") : "";
            };
            JsxHTMLNode.prototype.childrenToString = function() {
                function iterate(children) {
                    for (var _iterator = children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }
                        var child = _ref;
                        null !== child && void 0 !== child && (Array.isArray(child) ? iterate(child) : result += child instanceof JsxHTMLNode ? child.toString() : htmlEncode(child));
                    }
                }
                if (this.props && this.props.innerHTML) return this.props.innerHTML;
                if (!this.children) return "";
                var result = "";
                iterate(this.children);
                return result;
            };
            return JsxHTMLNode;
        }()), JsxHTMLNodeContainer = function(_JsxHTMLNode) {
            function JsxHTMLNodeContainer(children) {
                _classCallCheck(this, JsxHTMLNodeContainer);
                return _possibleConstructorReturn(this, _JsxHTMLNode.call(this, "", {}, children));
            }
            _inherits(JsxHTMLNodeContainer, _JsxHTMLNode);
            JsxHTMLNodeContainer.prototype.toString = function() {
                return this.childrenToString();
            };
            return JsxHTMLNodeContainer;
        }(jsx_JsxHTMLNode), normalizeProps = memoize(function(props) {
            var env = props.env, _props$locale = props.locale, locale = void 0 === _props$locale ? getButtonConfig("DEFAULT", "defaultLocale") : _props$locale, _props$style = props.style, style = void 0 === _props$style ? {} : _props$style, funding = props.funding;
            locale = parseLocale(locale);
            var label = style[BUTTON_STYLE_OPTIONS.LABEL] || getButtonConfig("DEFAULT", style.layout === BUTTON_LAYOUT.VERTICAL ? "defaultVerticalLabel" : "defaultLabel"), _style$BUTTON_STYLE_O = style[BUTTON_STYLE_OPTIONS.SIZE], size = void 0 === _style$BUTTON_STYLE_O ? getButtonConfig(label, style.layout === BUTTON_LAYOUT.VERTICAL ? "defaultVerticalSize" : "defaultSize") : _style$BUTTON_STYLE_O, _style$BUTTON_STYLE_O2 = style[BUTTON_STYLE_OPTIONS.COLOR], color = void 0 === _style$BUTTON_STYLE_O2 ? getButtonConfig(label, "defaultColor") : _style$BUTTON_STYLE_O2, _style$BUTTON_STYLE_O3 = style[BUTTON_STYLE_OPTIONS.SHAPE], shape = void 0 === _style$BUTTON_STYLE_O3 ? getButtonConfig(label, "defaultShape") : _style$BUTTON_STYLE_O3, _style$BUTTON_STYLE_O4 = style[BUTTON_STYLE_OPTIONS.BRANDING], branding = void 0 === _style$BUTTON_STYLE_O4 ? getButtonConfig(label, style.layout === BUTTON_LAYOUT.VERTICAL ? "defaultVerticalBranding" : "defaultBranding") : _style$BUTTON_STYLE_O4, _style$BUTTON_STYLE_O5 = style[BUTTON_STYLE_OPTIONS.FUNDINGICONS], fundingicons = void 0 === _style$BUTTON_STYLE_O5 ? getButtonConfig(label, "defaultFundingIcons") : _style$BUTTON_STYLE_O5, _style$BUTTON_STYLE_O6 = style[BUTTON_STYLE_OPTIONS.TAGLINE], tagline = void 0 === _style$BUTTON_STYLE_O6 ? getButtonConfig(label, "defaultTagline") : _style$BUTTON_STYLE_O6, _style$BUTTON_STYLE_O7 = style[BUTTON_STYLE_OPTIONS.LAYOUT], layout = void 0 === _style$BUTTON_STYLE_O7 ? getButtonConfig(label, "defaultLayout") : _style$BUTTON_STYLE_O7, max = style[BUTTON_STYLE_OPTIONS.MAXBUTTONS], height = style[BUTTON_STYLE_OPTIONS.HEIGHT];
            max = determineMaxButtons({
                label: label,
                layout: layout,
                max: max
            });
            var selected = labelToFunding(label), sources = determineEligibleFunding({
                funding: funding,
                selected: selected,
                locale: locale,
                env: env,
                layout: layout
            }).slice(0, max), multiple = sources.length > 1;
            multiple && (branding = !0);
            tagline = enableTagline({
                tagline: tagline,
                branding: branding,
                fundingicons: fundingicons,
                layout: layout
            });
            return {
                size: size,
                label: label,
                locale: locale,
                color: color,
                shape: shape,
                branding: branding,
                fundingicons: fundingicons,
                tagline: tagline,
                funding: funding,
                layout: layout,
                sources: sources,
                max: max,
                multiple: multiple,
                env: env,
                height: height,
                cards: determineEligibleCards({
                    funding: funding,
                    locale: locale
                })
            };
        }), pp_white = __webpack_require__("./src/resources/fundingLogos/pp_white.svg"), pp_white_default = __webpack_require__.n(pp_white), pp_blue = __webpack_require__("./src/resources/fundingLogos/pp_blue.svg"), pp_blue_default = __webpack_require__.n(pp_blue), pp_black = __webpack_require__("./src/resources/fundingLogos/pp_black.svg"), pp_black_default = __webpack_require__.n(pp_black), paypal_white = __webpack_require__("./src/resources/fundingLogos/paypal_white.svg"), paypal_white_default = __webpack_require__.n(paypal_white), paypal_blue = __webpack_require__("./src/resources/fundingLogos/paypal_blue.svg"), paypal_blue_default = __webpack_require__.n(paypal_blue), paypal_black = __webpack_require__("./src/resources/fundingLogos/paypal_black.svg"), paypal_black_default = __webpack_require__.n(paypal_black), credit_white = __webpack_require__("./src/resources/fundingLogos/credit_white.svg"), credit_white_default = __webpack_require__.n(credit_white), venmo_white = __webpack_require__("./src/resources/fundingLogos/venmo_white.svg"), venmo_white_default = __webpack_require__.n(venmo_white), venmo_blue = __webpack_require__("./src/resources/fundingLogos/venmo_blue.svg"), venmo_blue_default = __webpack_require__.n(venmo_blue), ideal = __webpack_require__("./src/resources/fundingLogos/ideal.svg"), ideal_default = __webpack_require__.n(ideal), elv = __webpack_require__("./src/resources/fundingLogos/elv.svg"), elv_default = __webpack_require__.n(elv), elv_white = __webpack_require__("./src/resources/fundingLogos/elv_white.svg"), elv_white_default = __webpack_require__.n(elv_white), fundingLogos = (_fundingLogos = {}, 
        _fundingLogos[BUTTON_LOGO.PP] = (_BUTTON_LOGO$PP = {}, _BUTTON_LOGO$PP[BUTTON_LOGO_COLOR.WHITE] = pp_white_default.a, 
        _BUTTON_LOGO$PP[BUTTON_LOGO_COLOR.BLUE] = pp_blue_default.a, _BUTTON_LOGO$PP[BUTTON_LOGO_COLOR.BLACK] = pp_black_default.a, 
        _BUTTON_LOGO$PP), _fundingLogos[BUTTON_LOGO.PAYPAL] = (_BUTTON_LOGO$PAYPAL = {}, 
        _BUTTON_LOGO$PAYPAL[BUTTON_LOGO_COLOR.WHITE] = paypal_white_default.a, _BUTTON_LOGO$PAYPAL[BUTTON_LOGO_COLOR.BLUE] = paypal_blue_default.a, 
        _BUTTON_LOGO$PAYPAL[BUTTON_LOGO_COLOR.BLACK] = paypal_black_default.a, _BUTTON_LOGO$PAYPAL), 
        _fundingLogos[BUTTON_LOGO.CREDIT] = (_BUTTON_LOGO$CREDIT = {}, _BUTTON_LOGO$CREDIT[BUTTON_LOGO_COLOR.WHITE] = credit_white_default.a, 
        _BUTTON_LOGO$CREDIT), _fundingLogos[BUTTON_LOGO.VENMO] = (_BUTTON_LOGO$VENMO = {}, 
        _BUTTON_LOGO$VENMO[BUTTON_LOGO_COLOR.WHITE] = venmo_white_default.a, _BUTTON_LOGO$VENMO[BUTTON_LOGO_COLOR.BLUE] = venmo_blue_default.a, 
        _BUTTON_LOGO$VENMO), _fundingLogos[BUTTON_LOGO.IDEAL] = (_BUTTON_LOGO$IDEAL = {}, 
        _BUTTON_LOGO$IDEAL[BUTTON_LOGO_COLOR.ANY] = ideal_default.a, _BUTTON_LOGO$IDEAL), 
        _fundingLogos[BUTTON_LOGO.ELV] = (_BUTTON_LOGO$ELV = {}, _BUTTON_LOGO$ELV[BUTTON_LOGO_COLOR.ANY] = elv_default.a, 
        _BUTTON_LOGO$ELV[BUTTON_LOGO_COLOR.WHITE] = elv_white_default.a, _BUTTON_LOGO$ELV), 
        _fundingLogos), visa = __webpack_require__("./src/resources/cardLogos/visa.svg"), visa_default = __webpack_require__.n(visa), amex = __webpack_require__("./src/resources/cardLogos/amex.svg"), amex_default = __webpack_require__.n(amex), mastercard = __webpack_require__("./src/resources/cardLogos/mastercard.svg"), mastercard_default = __webpack_require__.n(mastercard), discover = __webpack_require__("./src/resources/cardLogos/discover.svg"), discover_default = __webpack_require__.n(discover), hiper = __webpack_require__("./src/resources/cardLogos/hiper.svg"), hiper_default = __webpack_require__.n(hiper), elo = __webpack_require__("./src/resources/cardLogos/elo.svg"), elo_default = __webpack_require__.n(elo), jcb = __webpack_require__("./src/resources/cardLogos/jcb.svg"), jcb_default = __webpack_require__.n(jcb), cardLogos = (_cardLogos = {}, 
        _cardLogos[CARD.VISA] = visa_default.a, _cardLogos[CARD.AMEX] = amex_default.a, 
        _cardLogos[CARD.MASTERCARD] = mastercard_default.a, _cardLogos[CARD.DISCOVER] = discover_default.a, 
        _cardLogos[CARD.HIPER] = hiper_default.a, _cardLogos[CARD.ELO] = elo_default.a, 
        _cardLogos[CARD.JCB] = jcb_default.a, _cardLogos), pageStyle = "\n    html, body {\n        padding: 0;\n        margin: 0;\n        width: 100%;\n        overflow: hidden;\n        text-align: center;\n    }\n\n    * {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        cursor: default;\n    }\n", CLASS = {
            CONTAINER: "paypal-button-container",
            BUTTON: "paypal-button",
            LABEL: "paypal-button-label",
            COLOR: "paypal-button-color",
            LOGO_COLOR: "paypal-button-logo-color",
            SHAPE: "paypal-button-shape",
            BRANDING: "paypal-button-branding",
            LAYOUT: "paypal-button-layout",
            NUMBER: "paypal-button-number",
            ENV: "paypal-button-env",
            TAGLINE: "paypal-button-tagline",
            TAGLINE_COLOR: "paypal-button-tagline-color",
            FUNDINGICONS: "paypal-button-fundingicons",
            TEXT: "paypal-button-text",
            LOGO: "paypal-button-logo",
            CARD: "paypal-button-card",
            SEPARATOR: "paypal-separator"
        }, buttonStyle = "\n\n    ." + CLASS.CONTAINER + ' {\n        display: block;\n        white-space: nowrap;\n        margin: 0;\n        background: 0;\n        border: 0;\n        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n        text-transform: none;\n        font-weight: 500;R\n        -webkit-font-smoothing: antialiased;\n        font-smoothing: antialiased;\n        z-index: 0;\n        font-size: 0;\n        width: 100%;\n        box-sizing: border-box;\n    }\n\n    .' + CLASS.BUTTON + ":not(." + CLASS.CARD + ") {\n        border: 1px solid transparent;\n        border-radius: 0 3px 3px 0;\n        position: relative;\n        width: 100%;\n        box-sizing: border-box;\n        border: none;\n        vertical-align: top;\n        cursor: pointer;\n        outline: none;\n        overflow: hidden;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.TRANSPARENT + " {\n        cursor: auto;\n    }\n\n    ." + CLASS.BUTTON + " * {\n        cursor: pointer;\n    }\n\n    ." + CLASS.CONTAINER + "." + CLASS.ENV + "-" + misc_ENV.TEST + " ." + CLASS.TEXT + " {\n        font-family: Arial !important;\n        background: rgba(0, 0, 0, 0.5) !important;\n        color: transparent  !important;\n        text-shadow: none  !important;\n    }\n\n    ." + CLASS.BUTTON + ":hover {\n        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.GOLD + ":hover,\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.SILVER + ":hover {\n        box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.05);\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.TRANSPARENT + ":hover {\n        box-shadow: none;\n    }\n\n    ." + CLASS.CARD + ", ." + CLASS.CARD + " * {\n        cursor: pointer;\n    }\n\n    ." + CLASS.CARD + ":hover {\n        filter: brightness(1.2);\n    }\n\n    ." + CLASS.BUTTON + ":focus {\n        box-shadow: -1px -1px 18px 1px rgba(0, 0, 0, 0.25) inset;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.TRANSPARENT + ":focus {\n        box-shadow: none;\n    }\n\n    ." + CLASS.LOGO + " {\n        padding: 0;\n        display: inline-block;\n        background: none;\n        border: none;\n        width: auto;\n    }\n\n    ." + CLASS.TEXT + " {\n        display: inline-block;\n        white-space: pre;\n    }\n\n    ." + CLASS.BUTTON + " ." + CLASS.LOGO + ",\n    ." + CLASS.BUTTON + " ." + CLASS.TEXT + " {\n        vertical-align: top;\n        position: relative;\n        top: 50%;\n        transform: translateY(-50%);\n        -webkit-transform: translateY(-50%);\n        -moz-transform: translateY(-50%);\n        -ms-transform: translateY(-50%);\n        -o-transform: translateY(-50%);\n        text-align: left;\n    }\n\n    ." + CLASS.BUTTON + " ." + CLASS.CARD + " {\n        border-radius: 4px;\n    }\n\n    ." + CLASS.BUTTON + " ." + CLASS.TEXT + " {\n        visibility: hidden;\n    }\n\n    ." + CLASS.TAGLINE + " {\n        max-width: 100%;\n        font-weight: normal;\n        display: block;\n        text-align: center;\n        width: auto;\n        visibility: hidden;\n    }\n\n    ." + CLASS.SEPARATOR + " {\n        height: 80%;\n        border-left: 1px solid rgba(0, 0, 0, 0.15);\n        margin: 0 8px;\n        display: inline-block;\n        position: relative;\n        top: 10%;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.BLACK + " ." + CLASS.SEPARATOR + " {\n        border-color: rgba(255, 255, 255, 0.45);\n    }\n", layoutStyle = "\n\n    ." + CLASS.CONTAINER + "." + CLASS.LAYOUT + "-" + BUTTON_LAYOUT.VERTICAL + " ." + CLASS.TAGLINE + " {\n        display: none;\n    }\n", brandingStyle = "\n\n    ." + CLASS.BUTTON + "." + CLASS.BRANDING + "-" + BUTTON_BRANDING.UNBRANDED + "  {\n        min-width: 60%;\n        width: auto;\n        font-weight: 900;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.BRANDING + "-" + BUTTON_BRANDING.UNBRANDED + " ." + CLASS.LOGO + " {\n        display: none;\n    }\n", labelStyle = "\n\n    ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + BUTTON_LABEL.CARD + " {\n        border-radius: 0 !important;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + BUTTON_LABEL.CREDIT + " ." + CLASS.TEXT + " {\n        display: none !important;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + BUTTON_LAYOUT.HORIZONTAL + "." + CLASS.NUMBER + "-" + BUTTON_NUMBER.MULTIPLE + "." + CLASS.LABEL + "-" + BUTTON_LABEL.CREDIT + " ." + CLASS.LOGO + "." + CLASS.LOGO + "-" + BUTTON_LOGO.PAYPAL + " {\n        display: none;\n    }\n\n    @media only screen and (max-width : " + BUTTON_STYLE[BUTTON_SIZE.SMALL].minWidth + "px) {\n\n        ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + BUTTON_LABEL.CREDIT + " ." + CLASS.LOGO + "." + CLASS.LOGO + "-" + BUTTON_LOGO.PAYPAL + " {\n            display: none;\n        }\n    }\n\n    @media only screen and (min-width : " + BUTTON_STYLE[BUTTON_SIZE.SMALL].minWidth + "px) {\n\n        ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + BUTTON_LABEL.CREDIT + " ." + CLASS.LOGO + "." + CLASS.LOGO + "-" + BUTTON_LOGO.PAYPAL + " {\n            display: inline-block;\n        }\n    }\n", DUAL_BUTTON_MIN_RATIO = 2.8, buttonColorStyle = "\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.GOLD + " {\n        background: #ffc439;\n        color: #111;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.BLUE + " {\n        background: #009cde;\n        color: #fff;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.SILVER + " {\n        background: #eee;\n        color: #111;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.BLACK + " {\n        background: #2C2E2F;\n        color: #fff;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.DARKBLUE + " {\n        background: #003087;\n        color: #fff;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + BUTTON_COLOR.TRANSPARENT + " {\n        background: transparent;\n        color: #111;\n    }\n", template_content = __webpack_require__("./src/button/template/content.json"), content_default = __webpack_require__.n(template_content), componentContent = "string" == typeof content_default.a ? JSON.parse(content_default.a) : content_default.a;
        __webpack_exports__.componentTemplate = componentTemplate;
        var componentTemplate__extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
    },
    "./src/button/template/content.json": function(module, exports) {
        module.exports = '{\n    "AD": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        },\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        }\n    },\n    "AG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AL": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "AM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AN": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AO": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AR": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "AT": {\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "Einfach schneller und sicherer bezahlen",\n            "later_tag": "Kaufen Sie jetzt und bezahlen Sie nach und nach.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "AU": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "AW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "BB": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BE": {\n        "en": {\n            "checkout": "Pay with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "nl": {\n            "checkout": "Betalen met {logo:pp} {logo:paypal}",\n            "safer_tag": "De veiligere en snellere manier om te betalen.",\n\n            "later_tag": "Koop nu. Betaal later.",\n            "pay": "Betalen met {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Nu kopen"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Le r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        }\n    },\n    "BF": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "BH": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BI": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BJ": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "BO": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BR": {\n        "pt": {\n            "checkout": "{logo:pp} {logo:paypal} Finalizar",\n            "safer_tag": "A maneira f\\u00e1cil e segura de enviar pagamentos.",\n            "later_tag": "Compre agora e pague depois.",\n            "pay": "Pague com {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar agora"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "BS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BT": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "BW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "BZ": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "C2": {\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f\\u3002",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "CA": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer",\n            "later_tag": "Acheter. Payer plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        }\n    },\n    "CD": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CH": {\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "Einfach schneller und sicherer bezahlen",\n            "later_tag": "Kaufen Sie jetzt und bezahlen Sie nach und nach.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Le r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "CI": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "CK": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CL": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CM": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "CN": {\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CO": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CR": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CV": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "CZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "DE": {\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u00dcberall schnell und sicher bezahlen.",\n            "later_tag": "Kaufen Sie jetzt und bezahlen Sie nach und nach.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "DJ": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "DK": {\n        "da": {\n            "checkout": "{logo:pp} {logo:paypal} Betal",\n            "safer_tag": "Betal nemt og sikkert",\n            "later_tag": "K\\u00f8b nu, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} K\\u00f8b nu"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "DM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "DO": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "DZ": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "EC": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "EE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "ru": {\n            "checkout": "\\u041e\\u0444\\u043e\\u0440\\u043c\\u0438\\u0442\\u044c \\u0437\\u0430\\u043a\\u0430\\u0437 \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0411\\u043e\\u043b\\u0435\\u0435 \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u044b\\u0439 \\u0438 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e\\u0439 \\u0441\\u043f\\u043e\\u0441\\u043e\\u0431 \\u043e\\u043f\\u043b\\u0430\\u0442\\u044b.",\n            "later_tag": "\\u041f\\u043e\\u043a\\u0443\\u043f\\u0430\\u0439\\u0442\\u0435 \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441, \\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u0435 \\u043f\\u043e\\u0442\\u043e\\u043c.",\n            "pay": "\\u041e\\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u044c \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u041a\\u0443\\u043f\\u0438\\u0442\\u044c \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "EG": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ER": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ES": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "ET": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "FI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "FJ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "FK": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "FM": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "FO": {\n        "da": {\n            "checkout": "Betal med {logo:pp} {logo:paypal}",\n            "safer_tag": "Betal nemt og sikkert",\n\n            "later_tag": "K\\u00f8b nu, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} K\\u00f8b nu"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "FR": {\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Pay",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "GA": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GB": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "GD": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GL": {\n        "da": {\n            "checkout": "Betal med {logo:pp} {logo:paypal}",\n            "safer_tag": "Betal nemt og sikkert",\n\n            "later_tag": "K\\u00f8b nu, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} K\\u00f8b nu"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GN": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GP": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GT": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "HK": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal} \\u7d50\\u5e33",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u65b9\\u4fbf\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u5148\\u8cfc\\u8cb7\\uff0c\\u5f8c\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u4f7f\\u7528 {logo:paypal} \\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8cb7"\n        }\n    },\n    "HN": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "HR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "HU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ID": {\n        "id": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "Cara yang lebih mudah dan aman untuk membayar.",\n\n            "later_tag": "Beli Sekarang. Bayar dalam Jangka Waktu Tertentu.",\n            "pay": "Bayar dengan {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Beli Sekarang"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "IE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "IL": {\n        "he": {\n            "checkout": "{logo:pp} {logo:paypal} \\u05e9\\u05dc\\u05dd",\n            "safer_tag": ".\\u05d4\\u05d3\\u05e8\\u05da \\u05d4\\u05e7\\u05dc\\u05d4 \\u05d5\\u05d4\\u05d1\\u05d8\\u05d5\\u05d7\\u05d4 \\u05d9\\u05d5\\u05ea\\u05e8 \\u05dc\\u05e9\\u05dc\\u05dd",\n\n            "later_tag": "\\u05e7\\u05e0\\u05d4 \\u05e2\\u05db\\u05e9\\u05d9\\u05d5. \\u05e9\\u05dc\\u05dd \\u05dc\\u05d0\\u05d5\\u05e8\\u05da \\u05d6\\u05de\\u05df.",\n            "pay": "\\u05e9\\u05dc\\u05dd \\u05d1\\u05d0\\u05de\\u05e6\\u05e2\\u05d5\\u05ea {logo:paypal}\\u200f",\n            "buynow": "{logo:pp} {logo:paypal} \\u05e7\\u05e0\\u05d4 \\u05e2\\u05db\\u05e9\\u05d9\\u05d5"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "IN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "IS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "IT": {\n        "it": {\n            "checkout": "{logo:pp} {logo:paypal} Paga adesso",\n            "safer_tag": "Il modo rapido e sicuro per pagare",\n\n            "later_tag": "Acquista ora. Paga pi\\u00f9 tardi.",\n            "pay": "Paga con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Paga adesso"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "JM": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "JO": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "JP": {\n        "ja": {\n            "checkout": "{logo:pp} {logo:paypal}\\u3067\\u652f\\u6255\\u3046",\n            "safer_tag": "\\u3088\\u308a\\u5b89\\u5168\\u30fb\\u7c21\\u5358\\u306b\\u304a\\u652f\\u6255\\u3044",\n\n            "later_tag": "\\u4eca\\u3059\\u3050\\u8cfc\\u5165\\u3057\\u3066\\u3001\\u5206\\u5272\\u3057\\u3066\\u304a\\u652f\\u6255\\u3044\\u3002",\n            "pay": "{logo:paypal}\\u3067\\u652f\\u6255\\u3046",\n            "buynow": "{logo:pp} {logo:paypal} \\u8cfc\\u5165"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "KE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KH": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "KI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KM": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KN": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KR": {\n        "ko": {\n            "checkout": "{logo:pp} {logo:paypal} \\uccb4\\ud06c \\uc544\\uc6c3",\n            "safer_tag": "\\ub354 \\uc548\\uc804\\ud558\\uace0 \\ube60\\ub978 \\uacb0\\uc81c \\ubc29\\ubc95",\n\n            "later_tag": "\\uc9c0\\uae08 \\uad6c\\ub9e4\\ud558\\uace0 \\ucc9c\\ucc9c\\ud788 \\uacb0\\uc81c\\ud558\\uc138\\uc694.",\n            "pay": "{logo:paypal}\\ub85c \\uc9c0\\ubd88\\ud558\\uae30",\n            "buynow": "{logo:pp} {logo:paypal} \\ubc14\\ub85c \\uad6c\\ub9e4"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "KW": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LA": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "LC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LK": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "LS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "ru": {\n            "checkout": "\\u041e\\u0444\\u043e\\u0440\\u043c\\u0438\\u0442\\u044c \\u0437\\u0430\\u043a\\u0430\\u0437 \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0411\\u043e\\u043b\\u0435\\u0435 \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u044b\\u0439 \\u0438 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e\\u0439 \\u0441\\u043f\\u043e\\u0441\\u043e\\u0431 \\u043e\\u043f\\u043b\\u0430\\u0442\\u044b.",\n\n            "later_tag": "\\u041f\\u043e\\u043a\\u0443\\u043f\\u0430\\u0439\\u0442\\u0435 \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441, \\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u0435 \\u043f\\u043e\\u0442\\u043e\\u043c.",\n            "pay": "\\u041e\\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u044c \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u041a\\u0443\\u043f\\u0438\\u0442\\u044c \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "Einfach schneller und sicherer bezahlen",\n\n            "later_tag": "Kaufen Sie jetzt und bezahlen Sie nach und nach.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LV": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "ru": {\n            "checkout": "\\u041e\\u0444\\u043e\\u0440\\u043c\\u0438\\u0442\\u044c \\u0437\\u0430\\u043a\\u0430\\u0437 \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0411\\u043e\\u043b\\u0435\\u0435 \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u044b\\u0439 \\u0438 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e\\u0439 \\u0441\\u043f\\u043e\\u0441\\u043e\\u0431 \\u043e\\u043f\\u043b\\u0430\\u0442\\u044b.",\n\n            "later_tag": "\\u041f\\u043e\\u043a\\u0443\\u043f\\u0430\\u0439\\u0442\\u0435 \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441, \\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u0435 \\u043f\\u043e\\u0442\\u043e\\u043c.",\n            "pay": "\\u041e\\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u044c \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u041a\\u0443\\u043f\\u0438\\u0442\\u044c \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MA": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MC": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MD": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "ME": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MH": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MK": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "ML": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MQ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MV": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MX": {\n        "es": {\n            "checkout": "Pagar con {logo:pp} {logo:paypal}",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MY": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NE": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "NI": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NL": {\n        "nl": {\n            "checkout": "{logo:pp} {logo:paypal} Betalen",\n            "safer_tag": "Een veilige en makkelijke manier om te betalen.",\n\n            "later_tag": "Koop nu. Betaal later.",\n            "pay": "Betalen met {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Nu kopen"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "NO": {\n        "no": {\n            "checkout": "{logo:pp} {logo:paypal} Betal",\n            "safer_tag": "En trygg og enkel betalingsmetode",\n\n            "later_tag": "Kj\\u00f8p n\\u00e5, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Kj\\u00f8p n\\u00e5"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "NP": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "NR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NZ": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Un r\\u00e9flexe s\\u00e9curit\\u00e9.",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar.",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f\\u3002",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "OM": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PA": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PE": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PH": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "PL": {\n        "pl": {\n            "checkout": "{logo:pp} {logo:paypal} Do kasy",\n            "safer_tag": "P\\u0142a\\u0107 wygodnie i bezpiecznie",\n\n            "later_tag": "Kup teraz. P\\u0142a\\u0107 w ratach",\n            "pay": "Zap\\u0142a\\u0107 z {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Kup teraz"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "PM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PN": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PT": {\n        "pt": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A forma r\\u00e1pida e segura de pagar",\n\n            "later_tag": "Compre agora. V\\u00e1 pagando.",\n            "pay": "Pagar com {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar agora"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "PW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PY": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "QA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        },\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        }\n    },\n    "RE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "RO": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "RS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "RU": {\n        "ru": {\n            "checkout": "{logo:pp} {logo:paypal}\\u041e\\u0444\\u043e\\u0440\\u043c\\u0438\\u0442\\u044c \\u043f\\u043e\\u043a\\u0443\\u043f\\u043a\\u0443",\n            "safer_tag": "\\u0411\\u043e\\u043b\\u0435\\u0435 \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u044b\\u0439 \\u0438 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e\\u0439 \\u0441\\u043f\\u043e\\u0441\\u043e\\u0431 \\u043e\\u043f\\u043b\\u0430\\u0442\\u044b.",\n\n            "later_tag": "\\u041f\\u043e\\u043a\\u0443\\u043f\\u0430\\u0439\\u0442\\u0435 \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441, \\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u0435 \\u043f\\u043e\\u0442\\u043e\\u043c.",\n            "pay": "\\u041e\\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u044c \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u041a\\u0443\\u043f\\u0438\\u0442\\u044c \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "RW": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SA": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SB": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SC": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SE": {\n        "sv": {\n            "checkout": "{logo:pp} {logo:paypal} Betala",\n            "safer_tag": "Ett tryggt och smidigt s\\u00e4tt att betala",\n            "later_tag": "K\\u00f6p nu, betala senare",\n            "pay": "Betala med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} K\\u00f6p nu"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "SG": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "SH": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SJ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SK": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SL": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SN": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SO": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ST": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SV": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TD": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TG": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TH": {\n        "th": {\n            "checkout": "{logo:pp} {logo:paypal} \\u0e0a\\u0e33\\u0e23\\u0e30\\u0e40\\u0e07\\u0e34\\u0e19",\n            "safer_tag": "\\u0e27\\u0e34\\u0e18\\u0e35\\u0e0a\\u0e33\\u0e23\\u0e30\\u0e40\\u0e07\\u0e34\\u0e19\\u0e17\\u0e35\\u0e48\\u0e1b\\u0e25\\u0e2d\\u0e14\\u0e20\\u0e31\\u0e22\\u0e41\\u0e25\\u0e30\\u0e07\\u0e48\\u0e32\\u0e22\\u0e01\\u0e27\\u0e48\\u0e32",\n\n            "later_tag": "\\u0e0b\\u0e37\\u0e49\\u0e2d\\u0e27\\u0e31\\u0e19\\u0e19\\u0e35\\u0e49 \\u0e41\\u0e25\\u0e49\\u0e27\\u0e04\\u0e48\\u0e2d\\u0e22\\u0e46 \\u0e08\\u0e48\\u0e32\\u0e22\\u0e17\\u0e35\\u0e2b\\u0e25\\u0e31\\u0e07",\n            "pay": "\\u0e0a\\u0e33\\u0e23\\u0e30\\u0e40\\u0e07\\u0e34\\u0e19\\u0e14\\u0e49\\u0e27\\u0e22 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0e0b\\u0e37\\u0e49\\u0e2d\\u0e17\\u0e31\\u0e19\\u0e17\\u0e35"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "TJ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TN": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TO": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "TR": {\n        "tr": {\n            "checkout": "{logo:pp} {logo:paypal} ile Sat\\u0131n Al\\u0131n",\n            "safer_tag": "\\u00d6deme yapman\\u0131n daha g\\u00fcvenli ve kolay yolu",\n\n            "later_tag": "\\u015eimdi Al\\u0131n. Daha Sonra \\u00d6deyin.",\n            "pay": "{logo:paypal} ile \\u00d6de",\n            "buynow": "{logo:pp} {logo:paypal} Hemen Sat\\u0131n Al\\u0131n"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "TT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TV": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TW": {\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal} \\u7d50\\u5e33",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u65b9\\u4fbf\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u5148\\u8cfc\\u8cb7\\uff0c\\u5f8c\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u4f7f\\u7528 {logo:paypal} \\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8cfc"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "TZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "UA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "ru": {\n            "checkout": "\\u041e\\u0444\\u043e\\u0440\\u043c\\u0438\\u0442\\u044c \\u0437\\u0430\\u043a\\u0430\\u0437 \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0411\\u043e\\u043b\\u0435\\u0435 \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u044b\\u0439 \\u0438 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e\\u0439 \\u0441\\u043f\\u043e\\u0441\\u043e\\u0431 \\u043e\\u043f\\u043b\\u0430\\u0442\\u044b.",\n\n            "later_tag": "\\u041f\\u043e\\u043a\\u0443\\u043f\\u0430\\u0439\\u0442\\u0435 \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441, \\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u0435 \\u043f\\u043e\\u0442\\u043e\\u043c.",\n            "pay": "\\u041e\\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u044c \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u041a\\u0443\\u043f\\u0438\\u0442\\u044c \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "UG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "US": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "dual_tag": "Two easy ways to pay",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "Pagar con {logo:pp} {logo:paypal}",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "\\u4f7f\\u7528{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "UY": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "VA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "VC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "VE": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "VG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "VN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "VU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "WF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "WS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "YE": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "YT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ZA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ZM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ZW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    }\n}\n';
    },
    "./src/resources/cardLogos/amex.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="40" height="24" viewBox="0 0 40 24" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z" style="fill: rgb(20, 119, 190);"/>\n  <path d="M6.26 12.32h2.313L7.415 9.66M27.353 9.977h-3.738v1.23h3.666v1.384h-3.675v1.385h3.821v1.005c.623-.77 1.33-1.466 2.025-2.235l.707-.77c-.934-1.004-1.87-2.08-2.804-3.075v1.077z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M38.25 7h-5.605l-1.328 1.4L30.072 7H16.984l-1.017 2.416L14.877 7h-9.58L1.25 16.5h4.826l.623-1.556h1.4l.623 1.556H29.99l1.327-1.483 1.328 1.483h5.605l-4.36-4.667L38.25 7zm-17.685 8.1h-1.557V9.883L16.673 15.1h-1.33L13.01 9.883l-.084 5.217H9.73l-.623-1.556h-3.27L5.132 15.1H3.42l2.884-6.772h2.42l2.645 6.233V8.33h2.646l2.107 4.51 1.868-4.51h2.575V15.1zm14.727 0h-2.024l-2.024-2.26-2.023 2.26H22.06V8.328H29.53l1.795 2.177 2.024-2.177h2.025L32.26 11.75l3.032 3.35z" style="fill: rgb(255, 255, 255);"/>\n</svg>';
    },
    "./src/resources/cardLogos/discover.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="40" height="24" viewBox="0 0 40 24" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z" style="fill: rgb(17, 49, 82);"/>\n  <path d="M 5.498 13.349 C 5.16 13.654 4.722 13.787 4.028 13.787 L 3.738 13.787 L 3.738 10.141 L 4.028 10.141 C 4.722 10.141 5.143 10.265 5.498 10.587 C 5.868 10.917 6.093 11.431 6.093 11.959 C 6.093 12.489 5.869 13.019 5.498 13.349 Z M 4.243 9.206 L 2.666 9.206 L 2.666 14.721 L 4.236 14.721 C 5.069 14.721 5.671 14.524 6.199 14.084 C 6.829 13.564 7.199 12.779 7.199 11.968 C 7.199 10.34 5.985 9.206 4.243 9.206 Z M 7.696 14.721 L 8.77 14.721 L 8.77 9.207 L 7.696 9.207 M 11.393 11.323 C 10.748 11.083 10.559 10.926 10.559 10.628 C 10.559 10.281 10.897 10.018 11.359 10.018 C 11.681 10.018 11.946 10.15 12.226 10.464 L 12.788 9.727 C 12.326 9.322 11.773 9.115 11.17 9.115 C 10.195 9.115 9.452 9.793 9.452 10.695 C 9.452 11.455 9.798 11.845 10.807 12.208 C 11.227 12.356 11.442 12.455 11.55 12.522 C 11.765 12.662 11.872 12.862 11.872 13.092 C 11.872 13.54 11.518 13.872 11.038 13.872 C 10.528 13.872 10.114 13.614 9.868 13.136 L 9.173 13.806 C 9.668 14.532 10.263 14.856 11.08 14.856 C 12.196 14.856 12.98 14.111 12.98 13.044 C 12.98 12.168 12.617 11.771 11.395 11.324 Z M 13.316 11.968 C 13.316 13.588 14.586 14.845 16.223 14.845 C 16.685 14.845 17.081 14.755 17.57 14.525 L 17.57 13.258 C 17.14 13.688 16.76 13.862 16.273 13.862 C 15.191 13.862 14.423 13.077 14.423 11.962 C 14.423 10.902 15.215 10.067 16.223 10.067 C 16.735 10.067 17.123 10.25 17.57 10.687 L 17.57 9.421 C 17.098 9.181 16.71 9.081 16.248 9.081 C 14.621 9.081 13.316 10.364 13.316 11.968 Z M 26.088 12.911 L 24.62 9.206 L 23.446 9.206 L 25.783 14.862 L 26.361 14.862 L 28.741 9.207 L 27.576 9.207 M 29.226 14.721 L 32.272 14.721 L 32.272 13.787 L 30.299 13.787 L 30.299 12.299 L 32.199 12.299 L 32.199 11.365 L 30.299 11.365 L 30.299 10.141 L 32.272 10.141 L 32.272 9.206 L 29.226 9.206 M 34.373 11.745 L 34.059 11.745 L 34.059 10.075 L 34.389 10.075 C 35.059 10.075 35.423 10.355 35.423 10.893 C 35.423 11.447 35.059 11.745 34.373 11.745 Z M 36.528 10.835 C 36.528 9.802 35.818 9.207 34.578 9.207 L 32.986 9.207 L 32.986 14.721 L 34.059 14.721 L 34.059 12.506 L 34.199 12.506 L 35.686 14.721 L 37.006 14.721 L 35.273 12.398 C 36.083 12.233 36.528 11.678 36.528 10.835 Z" style="fill: rgb(255, 255, 255);"/>\n  <g id="MarkingBase_1_" transform="matrix(0.089776, 0, 0, 0.089776, 2.192296, 5.72498)">\n    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="224.3917" y1="44.1731" x2="201.33" y2="80.2807" gradientTransform="matrix(1 0 0 -1 0 141.7323)">\n      <stop offset="0" style="stop-color:#F89F21"/>\n      <stop offset="0.2502" style="stop-color:#F79A23"/>\n      <stop offset="0.5331" style="stop-color:#F78E22"/>\n      <stop offset="0.6196" style="stop-color:#F68721"/>\n      <stop offset="0.7232" style="stop-color:#F48220"/>\n      <stop offset="1" style="stop-color:#F27623"/>\n    </linearGradient>\n    <circle fill="url(#SVGID_1_)" cx="207.343" cy="70.866" r="33.307"/>\n    <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="220.7487" y1="44.664" x2="187.0436" y2="110.5426" gradientTransform="matrix(1 0 0 -1 0 141.7323)">\n      <stop offset="0" style="stop-color:#F68721;stop-opacity:0"/>\n      <stop offset="0.3587" style="stop-color:#E27027;stop-opacity:0.2704"/>\n      <stop offset="0.703" style="stop-color:#D4612C;stop-opacity:0.5299"/>\n      <stop offset="0.9816" style="stop-color:#D15D2D;stop-opacity:0.74"/>\n    </linearGradient>\n    <circle opacity="0.65" fill="url(#SVGID_2_)" cx="207.343" cy="70.866" r="33.307"/>\n  </g>\n  <g id="Orange_1_" enable-background="new    " transform="matrix(0.469224, 0, 0, 0.469224, 13.785085, 6.199149)">\n    <g id="Orange">\n      <g>\n        <path d="M13,38c20.1,0,40,0,40,0c1.7,0,3-1.3,3-3V18C56,18,51.2,31.8,13,38z" style="fill: rgb(255, 129, 38);"/>\n      </g>\n    </g>\n  </g>\n</svg>';
    },
    "./src/resources/cardLogos/elo.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="40" height="24" viewBox="0 0 40 24" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z" style="fill: rgb(21, 21, 21);"/>\n  <path class="st0" d="M 9.229 8.55 C 9.592 8.431 9.977 8.365 10.382 8.365 C 12.14 8.365 13.602 9.613 13.939 11.268 L 16.427 10.762 C 15.855 7.946 13.365 5.824 10.379 5.824 C 9.693 5.824 9.037 5.935 8.42 6.142 L 9.229 8.55 Z" style="fill: rgb(255, 205, 5);"/>\n  <path class="st1" d="M 6.292 16.616 L 7.973 14.716 C 7.221 14.052 6.749 13.08 6.749 11.999 C 6.749 10.917 7.221 9.945 7.973 9.279 L 6.292 7.38 C 5.015 8.51 4.209 10.16 4.209 11.999 C 4.209 13.836 5.019 15.488 6.292 16.616" style="fill: rgb(0, 164, 224);"/>\n  <path class="st2" d="M 13.939 12.723 C 13.602 14.379 12.136 15.626 10.382 15.626 C 9.977 15.626 9.592 15.562 9.229 15.442 L 8.422 17.849 C 9.039 18.055 9.698 18.167 10.382 18.167 C 13.365 18.167 15.855 16.05 16.427 13.235 L 13.939 12.723 Z" style="fill: rgb(239, 66, 35);"/>\n  <path d="M 18.603 14.794 C 18.521 14.663 18.412 14.453 18.343 14.296 C 17.948 13.381 17.932 12.434 18.264 11.526 C 18.631 10.527 19.33 9.765 20.233 9.378 C 21.366 8.889 22.626 8.986 23.713 9.632 C 24.406 10.028 24.897 10.641 25.269 11.506 C 25.319 11.615 25.358 11.737 25.398 11.835 L 18.603 14.794 Z M 20.87 10.845 C 20.066 11.194 19.65 11.949 19.734 12.834 L 23.151 11.363 C 22.565 10.675 21.802 10.444 20.87 10.845 Z M 23.578 14.044 C 23.578 14.044 23.578 14.044 23.578 14.044 L 23.508 13.998 C 23.302 14.331 22.985 14.595 22.584 14.768 C 21.82 15.1 21.113 15.014 20.602 14.569 L 20.559 14.643 C 20.559 14.643 20.559 14.643 20.559 14.643 L 19.688 15.936 C 19.905 16.088 20.134 16.213 20.376 16.315 C 21.333 16.712 22.311 16.693 23.279 16.273 C 23.978 15.971 24.527 15.509 24.9 14.924 L 23.578 14.044 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 27.77 7.466 L 27.77 14.673 L 28.891 15.13 L 28.254 16.614 L 27.018 16.1 C 26.742 15.979 26.552 15.797 26.409 15.588 C 26.272 15.377 26.171 15.085 26.171 14.698 L 26.171 7.466 L 27.77 7.466 Z" style="fill: rgb(255, 255, 255);"/>\n  <g transform="matrix(0.037801, 0, 0, 0.037801, 1.0913, 0.089785)">\n    <path d="M782.7,337.2c0-16.2,7.2-30.8,18.5-40.7l-30.4-33.9c-20.6,18.2-33.6,44.9-33.6,74.6c0,29.7,12.9,56.4,33.6,74.7l30.4-34&#10;&#9;&#9;C789.8,367.9,782.6,353.4,782.7,337.2z" style="fill: rgb(255, 255, 255);"/>\n    <path d="M836.7,391.4c-6,0-11.8-1-17.1-2.8L805,431.7c9.9,3.3,20.6,5.1,31.6,5.2c48.2,0,88.4-34.1,97.7-79.6l-44.7-9.1&#10;&#9;&#9;C884.6,372.9,862.8,391.4,836.7,391.4z" style="fill: rgb(255, 255, 255);"/>\n    <path d="M836.8,237.6c-11,0-21.7,1.8-31.6,5.1l14.4,43.2c5.4-1.8,11.2-2.8,17.1-2.8c26.2,0,48,18.6,53,43.3l44.7-9.1&#10;&#9;&#9;C925.2,272,885,237.7,836.8,237.6z" style="fill: rgb(255, 255, 255);"/>\n  </g>\n</svg>';
    },
    "./src/resources/cardLogos/hiper.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="40" height="24" viewBox="0 0 40 24" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z" style="fill: rgb(243, 97, 24);"/>\n  <path id="path16" style="fill: rgb(255, 255, 255); fill-opacity: 1; fill-rule: nonzero; stroke: none;" d="M 3.206 6.45 L 3.206 16.929 L 5.586 16.929 L 5.586 12.545 L 9.489 12.545 L 9.489 16.929 L 11.853 16.929 L 11.853 6.45 L 9.489 6.45 L 9.489 10.477 L 5.586 10.477 L 5.586 6.45 L 3.206 6.45"/>\n  <path id="path18" style="fill: rgb(255, 255, 255); fill-opacity: 1; fill-rule: nonzero; stroke: none;" d="M 32.319 13.882 C 32.351 13.71 32.397 13.353 32.397 12.949 C 32.397 11.068 31.464 9.155 29.008 9.155 C 26.364 9.155 25.167 11.285 25.167 13.213 C 25.167 15.592 26.644 17.085 29.225 17.085 C 30.251 17.085 31.2 16.929 31.977 16.618 L 31.666 15.017 C 31.029 15.219 30.376 15.328 29.567 15.328 C 28.463 15.328 27.499 14.861 27.422 13.882 Z M 27.406 12.265 C 27.468 11.628 27.873 10.725 28.868 10.725 C 29.956 10.725 30.205 11.689 30.205 12.265 L 27.406 12.265"/>\n  <path id="path20" style="fill: rgb(255, 255, 255); fill-opacity: 1; fill-rule: nonzero; stroke: none;" d="M 33.155 16.929 L 35.519 16.929 L 35.519 13.073 C 35.519 12.887 35.533 12.7 35.565 12.545 C 35.72 11.814 36.31 11.348 37.182 11.348 C 37.446 11.348 37.648 11.378 37.819 11.41 L 37.819 9.186 C 37.648 9.155 37.539 9.155 37.321 9.155 C 36.591 9.155 35.658 9.621 35.269 10.725 L 35.207 10.725 L 35.129 9.326 L 33.092 9.326 C 33.123 9.979 33.155 10.709 33.155 11.829 L 33.155 16.929"/>\n  <path id="path22" style="fill: rgb(254, 234, 1); fill-opacity: 1; fill-rule: evenodd; stroke: none;" d="M 14.256 6.028 C 14.927 6.028 15.472 6.572 15.472 7.243 C 15.472 7.914 14.927 8.458 14.256 8.458 C 13.585 8.458 13.041 7.914 13.041 7.243 C 13.041 6.572 13.585 6.028 14.256 6.028"/>\n  <path id="path24" style="fill: rgb(255, 255, 255); fill-opacity: 1; fill-rule: evenodd; stroke: none;" d="M 19.247 15.159 L 20.433 15.159 C 21.624 15.159 22.163 14.395 22.163 13.6 C 22.163 12.805 22.106 11.006 20.633 11.006 C 18.943 11.006 19.218 13.238 19.224 14.408 C 19.226 14.658 19.24 14.908 19.247 15.159 Z M 13.041 9.315 L 15.472 9.315 L 15.472 13.6 C 15.472 14.395 15.912 15.157 16.887 15.159 C 16.894 13.229 16.886 11.243 16.822 9.315 L 18.852 9.315 C 18.896 9.687 18.936 10.059 18.973 10.432 C 19.932 8.514 22.954 8.937 23.971 10.555 C 25.022 12.228 25.379 17.017 20.433 17.017 L 19.282 17.017 C 19.293 17.988 19.295 18.963 19.295 19.936 L 16.865 19.936 C 16.865 19.001 16.871 18.022 16.878 17.016 C 14.252 17.007 13.041 15.339 13.041 13.6 L 13.041 9.315"/>\n</svg>';
    },
    "./src/resources/cardLogos/jcb.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="40" height="24" viewBox="0 0 40 24" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <defs>\n    <pattern id="pattern-0" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" viewBox="0 0 100 100">\n      <path d="M 0 0 L 50 0 L 50 100 L 0 100 Z" style="fill: black;"/>\n    </pattern>\n  </defs>\n  <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z" style="fill: rgb(255, 255, 255); stroke: rgb(233, 234, 231);"/>\n  <g transform="matrix(0.100306, 0, 0, 0.100306, 4.733743, 10.105099)" id="g6321">\n    <g transform="matrix(1.8215159,0,0,1.8215159,-8.5437653,-109.83667)" id="g6323">\n      <path style="fill:#ffffff" id="path6325" d="m 174,108.3 c 0,14 -11.4,25.4 -25.4,25.4 l -138.2,0 0,-100.6 c 0,-14 11.4,-25.4 25.4,-25.4 l 138.2,0 0,100.6 z" class="st0"/>\n      <g id="g6327">\n        <linearGradient gradientTransform="matrix(1.125,0,0,1.125,-11.9755,-13.8615)" y2="81.398598" x2="157.3299" y1="81.398598" x1="117.3856" gradientUnits="userSpaceOnUse" id="SVGID_1_">\n          <stop id="stop6330" style="stop-color:#007940" offset="0"/>\n          <stop id="stop6332" style="stop-color:#00873F" offset="0.2285"/>\n          <stop id="stop6334" style="stop-color:#40A737" offset="0.7433"/>\n          <stop id="stop6336" style="stop-color:#5CB531" offset="1"/>\n        </linearGradient>\n        <path style="fill:url(#SVGID_1_)" id="path6338" d="m 129,82.5 10.5,0 c 0.3,0 1,-0.1 1.3,-0.1 2,-0.4 3.7,-2.2 3.7,-4.7 0,-2.4 -1.7,-4.2 -3.7,-4.7 -0.3,-0.1 -0.9,-0.1 -1.3,-0.1 l -10.5,0 0,9.6 z" class="st1"/>\n        <linearGradient gradientTransform="matrix(1.125,0,0,1.125,-11.9755,-13.8615)" y2="75.171402" x2="157.3318" y1="75.171402" x1="117.3844" gradientUnits="userSpaceOnUse" id="SVGID_2_">\n          <stop id="stop6341" style="stop-color:#007940" offset="0"/>\n          <stop id="stop6343" style="stop-color:#00873F" offset="0.2285"/>\n          <stop id="stop6345" style="stop-color:#40A737" offset="0.7433"/>\n          <stop id="stop6347" style="stop-color:#5CB531" offset="1"/>\n        </linearGradient>\n        <path style="fill:url(#SVGID_2_)" id="path6349" d="m 138.3,16.2 c -10,0 -18.2,8.1 -18.2,18.2 l 0,18.9 25.7,0 c 0.6,0 1.3,0 1.8,0.1 5.8,0.3 10.1,3.3 10.1,8.5 0,4.1 -2.9,7.6 -8.3,8.3 l 0,0.2 c 5.9,0.4 10.4,3.7 10.4,8.8 0,5.5 -5,9.1 -11.6,9.1 l -28.2,0 0,37 26.7,0 c 10,0 18.2,-8.1 18.2,-18.2 l 0,-90.9 -26.6,0 z" class="st2"/>\n        <linearGradient gradientTransform="matrix(1.125,0,0,1.125,-11.9755,-13.8615)" y2="68.399101" x2="157.33051" y1="68.399101" x1="117.3846" gradientUnits="userSpaceOnUse" id="SVGID_3_">\n          <stop id="stop6352" style="stop-color:#007940" offset="0"/>\n          <stop id="stop6354" style="stop-color:#00873F" offset="0.2285"/>\n          <stop id="stop6356" style="stop-color:#40A737" offset="0.7433"/>\n          <stop id="stop6358" style="stop-color:#5CB531" offset="1"/>\n        </linearGradient>\n        <path style="fill:url(#SVGID_3_)" id="path6360" d="m 143.2,63.1 c 0,-2.4 -1.7,-4 -3.7,-4.3 -0.2,0 -0.7,-0.1 -1,-0.1 l -9.5,0 0,8.8 9.5,0 c 0.3,0 0.9,0 1,-0.1 2,-0.3 3.7,-1.9 3.7,-4.3 z" class="st3"/>\n      </g>\n      <linearGradient gradientTransform="matrix(1.125,0,0,1.125,-11.9755,-13.8615)" y2="75.171402" x2="68.522102" y1="75.171402" x1="27.9594" gradientUnits="userSpaceOnUse" id="SVGID_4_">\n        <stop id="stop6363" style="stop-color:#1F286F" offset="0"/>\n        <stop id="stop6365" style="stop-color:#004E94" offset="0.4751"/>\n        <stop id="stop6367" style="stop-color:#0066B1" offset="0.8261"/>\n        <stop id="stop6369" style="stop-color:#006FBC" offset="1"/>\n      </linearGradient>\n      <path style="fill:url(#SVGID_4_)" id="path6371" d="m 37.7,16.2 c -10,0 -18.2,8.1 -18.2,18.2 l 0,44.9 c 5.1,2.5 10.4,4.1 15.7,4.1 6.3,0 9.7,-3.8 9.7,-9 l 0,-21.2 15.6,0 0,21.1 c 0,8.2 -5.1,14.9 -22.4,14.9 -10.5,0 -18.7,-2.3 -18.7,-2.3 l 0,38.3 26.7,0 c 10,0 18.2,-8.1 18.2,-18.2 l 0,-90.8 -26.6,0 z" class="st4"/>\n      <linearGradient gradientTransform="matrix(1.125,0,0,1.125,-11.9755,-13.8615)" y2="75.171402" x2="111.8553" y1="75.171402" x1="72.459503" gradientUnits="userSpaceOnUse" id="SVGID_5_">\n        <stop id="stop6374" style="stop-color:#6C2C2F" offset="0"/>\n        <stop id="stop6376" style="stop-color:#882730" offset="0.1735"/>\n        <stop id="stop6378" style="stop-color:#BE1833" offset="0.5731"/>\n        <stop id="stop6380" style="stop-color:#DC0436" offset="0.8585"/>\n        <stop id="stop6382" style="stop-color:#E60039" offset="1"/>\n      </linearGradient>\n      <path style="fill:url(#SVGID_5_)" id="path6384" d="m 88,16.2 c -10,0 -18.2,8.1 -18.2,18.2 l 0,23.8 c 4.6,-3.9 12.6,-6.4 25.5,-5.8 6.9,0.3 14.3,2.2 14.3,2.2 l 0,7.7 c -3.7,-1.9 -8.1,-3.6 -13.8,-4 -9.8,-0.7 -15.7,4.1 -15.7,12.5 0,8.5 5.9,13.3 15.7,12.5 5.7,-0.4 10.1,-2.2 13.8,-4 l 0,7.7 c 0,0 -7.3,1.9 -14.3,2.2 -12.9,0.6 -20.9,-1.9 -25.5,-5.8 l 0,42 26.7,0 c 10,0 18.2,-8.1 18.2,-18.2 l 0,-91 -26.7,0 z" class="st5"/>\n    </g>\n    <g id="g6386"/>\n  </g>\n</svg>';
    },
    "./src/resources/cardLogos/mastercard.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="40" height="24" viewBox="0 0 40 24" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z" style="fill: rgb(62, 57, 57);"/>\n  <path style="fill: rgb(255, 95, 0);" d="M 22.205 3.901 L 15.688 3.901 L 15.688 15.589 L 22.205 15.589"/>\n  <path d="M 16.1 9.747 C 16.1 7.371 17.218 5.265 18.935 3.901 C 17.67 2.912 16.078 2.312 14.342 2.312 C 10.223 2.312 6.892 5.636 6.892 9.746 C 6.892 13.853 10.223 17.178 14.342 17.178 C 16.078 17.178 17.67 16.58 18.935 15.588 C 17.216 14.246 16.099 12.119 16.099 9.745 Z" style="fill: rgb(235, 0, 27);"/>\n  <path d="M 30.996 9.747 C 30.996 13.854 27.663 17.179 23.547 17.179 C 21.81 17.179 20.216 16.581 18.954 15.589 C 20.691 14.227 21.788 12.12 21.788 9.746 C 21.788 7.37 20.671 5.264 18.954 3.9 C 20.216 2.911 21.81 2.311 23.547 2.311 C 27.663 2.311 30.996 5.657 30.996 9.745 Z" style="fill: rgb(247, 158, 27);"/>\n  <path d="M 7.167 22.481 L 7.167 20.43 C 7.167 19.641 6.685 19.127 5.857 19.127 C 5.443 19.127 4.993 19.262 4.683 19.71 C 4.44 19.332 4.096 19.127 3.579 19.127 C 3.233 19.127 2.888 19.23 2.612 19.607 L 2.612 19.197 L 1.886 19.197 L 1.886 22.481 L 2.612 22.481 L 2.612 20.668 C 2.612 20.086 2.921 19.812 3.406 19.812 C 3.888 19.812 4.131 20.121 4.131 20.669 L 4.131 22.481 L 4.856 22.481 L 4.856 20.668 C 4.856 20.086 5.204 19.812 5.651 19.812 C 6.137 19.812 6.377 20.121 6.377 20.669 L 6.377 22.481 L 7.171 22.481 Z M 17.909 19.197 L 16.734 19.197 L 16.734 18.204 L 16.007 18.204 L 16.007 19.197 L 15.352 19.197 L 15.352 19.845 L 16.007 19.845 L 16.007 21.351 C 16.007 22.106 16.319 22.551 17.146 22.551 C 17.459 22.551 17.804 22.449 18.044 22.309 L 17.839 21.695 C 17.632 21.831 17.389 21.867 17.216 21.867 C 16.872 21.867 16.734 21.66 16.734 21.319 L 16.734 19.847 L 17.909 19.847 L 17.909 19.198 Z M 24.053 19.127 C 23.639 19.127 23.364 19.332 23.191 19.607 L 23.191 19.197 L 22.465 19.197 L 22.465 22.481 L 23.191 22.481 L 23.191 20.633 C 23.191 20.086 23.434 19.777 23.882 19.777 C 24.018 19.777 24.192 19.812 24.33 19.847 L 24.538 19.162 C 24.401 19.127 24.192 19.127 24.052 19.127 Z M 14.765 19.469 C 14.42 19.229 13.937 19.127 13.418 19.127 C 12.588 19.127 12.036 19.538 12.036 20.188 C 12.036 20.736 12.453 21.044 13.175 21.146 L 13.524 21.181 C 13.903 21.249 14.108 21.351 14.108 21.523 C 14.108 21.765 13.832 21.934 13.35 21.934 C 12.864 21.934 12.484 21.764 12.244 21.592 L 11.898 22.139 C 12.278 22.411 12.794 22.549 13.313 22.549 C 14.28 22.549 14.831 22.105 14.831 21.488 C 14.831 20.908 14.383 20.599 13.692 20.496 L 13.348 20.462 C 13.037 20.428 12.795 20.36 12.795 20.155 C 12.795 19.914 13.038 19.777 13.418 19.777 C 13.83 19.777 14.245 19.949 14.453 20.052 L 14.764 19.469 Z M 34.033 19.127 C 33.618 19.127 33.342 19.332 33.171 19.607 L 33.171 19.197 L 32.445 19.197 L 32.445 22.481 L 33.171 22.481 L 33.171 20.633 C 33.171 20.086 33.414 19.777 33.862 19.777 C 33.998 19.777 34.17 19.812 34.307 19.847 L 34.515 19.162 C 34.38 19.127 34.172 19.127 34.033 19.127 Z M 24.779 20.838 C 24.779 21.834 25.47 22.551 26.54 22.551 C 27.025 22.551 27.369 22.449 27.715 22.173 L 27.369 21.593 C 27.092 21.798 26.816 21.901 26.504 21.901 C 25.919 21.901 25.505 21.49 25.505 20.84 C 25.505 20.226 25.919 19.813 26.507 19.78 C 26.816 19.78 27.092 19.883 27.369 20.089 L 27.715 19.507 C 27.369 19.233 27.024 19.13 26.54 19.13 C 25.47 19.13 24.779 19.85 24.779 20.841 Z M 31.478 20.838 L 31.478 19.198 L 30.75 19.198 L 30.75 19.608 C 30.51 19.3 30.165 19.128 29.717 19.128 C 28.784 19.128 28.058 19.848 28.058 20.84 C 28.058 21.835 28.784 22.552 29.716 22.552 C 30.197 22.552 30.543 22.382 30.748 22.074 L 30.748 22.484 L 31.477 22.484 L 31.477 20.84 Z M 28.818 20.838 C 28.818 20.259 29.196 19.779 29.819 19.779 C 30.406 19.779 30.821 20.224 30.821 20.84 C 30.821 21.424 30.406 21.902 29.819 21.902 C 29.196 21.869 28.818 21.424 28.818 20.841 Z M 20.148 19.128 C 19.183 19.128 18.494 19.813 18.494 20.84 C 18.494 21.869 19.183 22.552 20.185 22.552 C 20.671 22.552 21.154 22.417 21.533 22.108 L 21.188 21.595 C 20.914 21.799 20.565 21.937 20.222 21.937 C 19.772 21.937 19.323 21.732 19.219 21.149 L 21.671 21.149 L 21.671 20.878 C 21.705 19.815 21.083 19.13 20.15 19.13 Z M 20.148 19.748 C 20.6 19.748 20.911 20.019 20.98 20.532 L 19.253 20.532 C 19.321 20.087 19.633 19.748 20.148 19.748 Z M 38.141 20.84 L 38.141 17.898 L 37.412 17.898 L 37.412 19.61 C 37.173 19.302 36.828 19.13 36.38 19.13 C 35.446 19.13 34.721 19.85 34.721 20.841 C 34.721 21.837 35.446 22.554 36.379 22.554 C 36.861 22.554 37.206 22.383 37.41 22.076 L 37.41 22.486 L 38.14 22.486 L 38.14 20.841 Z M 35.481 20.84 C 35.481 20.261 35.861 19.78 36.484 19.78 C 37.069 19.78 37.486 20.226 37.486 20.841 C 37.486 21.426 37.069 21.904 36.484 21.904 C 35.861 21.87 35.481 21.426 35.481 20.843 Z M 11.237 20.84 L 11.237 19.2 L 10.515 19.2 L 10.515 19.61 C 10.272 19.302 9.928 19.13 9.478 19.13 C 8.545 19.13 7.82 19.85 7.82 20.841 C 7.82 21.837 8.545 22.554 9.477 22.554 C 9.96 22.554 10.304 22.383 10.512 22.076 L 10.512 22.486 L 11.236 22.486 L 11.236 20.841 Z M 8.546 20.84 C 8.546 20.261 8.926 19.78 9.548 19.78 C 10.134 19.78 10.55 20.226 10.55 20.841 C 10.55 21.426 10.134 21.904 9.548 21.904 C 8.926 21.87 8.546 21.426 8.546 20.843 Z" style="fill: rgb(255, 255, 255);"/>\n</svg>';
    },
    "./src/resources/cardLogos/visa.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="40" height="24" viewBox="0 0 40 24" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z" style="fill: rgb(33, 86, 154);"/>\n  <path d="M19.596 7.885l-2.11 9.478H14.93l2.11-9.478h2.554zm10.743 6.12l1.343-3.56.773 3.56H30.34zm2.85 3.358h2.36l-2.063-9.478H31.31c-.492 0-.905.274-1.088.695l-3.832 8.783h2.682l.532-1.415h3.276l.31 1.415zm-6.667-3.094c.01-2.502-3.6-2.64-3.577-3.76.008-.338.345-.7 1.083-.793.365-.045 1.373-.08 2.517.425l.448-2.01c-.615-.214-1.405-.42-2.39-.42-2.523 0-4.3 1.288-4.313 3.133-.016 1.364 1.268 2.125 2.234 2.58.996.464 1.33.762 1.325 1.177-.006.636-.793.918-1.526.928-1.285.02-2.03-.333-2.623-.6l-.462 2.08c.598.262 1.7.49 2.84.502 2.682 0 4.437-1.273 4.445-3.243zM15.948 7.884l-4.138 9.478h-2.7L7.076 9.8c-.123-.466-.23-.637-.606-.834-.615-.32-1.63-.62-2.52-.806l.06-.275h4.345c.554 0 1.052.354 1.178.966l1.076 5.486 2.655-6.45h2.683z" style="fill: rgb(255, 255, 255);"/>\n</svg>';
    },
    "./src/resources/fundingLogos/credit_white.svg": function(module, exports) {
        module.exports = '<svg width="100" height="32" viewBox="0 0 95 32" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path fill="#ffffff" d="M 52.732 6.347 C 52.83 5.963 53.122 5.675 53.512 5.675 L 60.626 5.675 C 66.571 5.675 70.664 10.187 69.69 15.851 C 68.813 21.515 63.16 25.931 57.313 25.931 L 50.004 25.931 C 49.711 25.931 49.516 25.739 49.614 25.451 L 52.732 6.347 Z M 55.753 21.515 L 57.02 21.515 C 60.236 21.515 63.355 19.787 64.037 15.851 C 64.622 12.203 62.478 10.187 58.97 10.187 L 57.995 10.187 C 57.8 10.187 57.605 10.283 57.605 10.475 L 55.753 21.515 Z"/>\n  <path fill="#ffffff" d="M 43.571 10.763 L 43.084 13.547 L 48.737 13.547 C 49.029 13.547 49.224 13.739 49.224 14.027 L 48.639 17.387 C 48.542 17.771 48.249 17.963 47.859 17.963 L 42.987 17.963 C 42.597 17.963 42.304 18.251 42.207 18.635 L 41.72 21.515 L 47.762 21.515 C 48.054 21.515 48.249 21.707 48.152 21.995 L 47.665 25.355 C 47.567 25.643 47.275 25.931 46.885 25.931 L 36.067 25.931 C 35.775 25.931 35.58 25.643 35.58 25.451 L 38.699 6.347 C 38.796 5.963 39.186 5.675 39.478 5.675 L 50.393 5.675 C 50.588 5.675 50.881 5.963 50.783 6.155 L 50.296 9.515 C 50.198 9.899 49.906 10.091 49.516 10.091 L 44.254 10.091 C 43.864 10.187 43.571 10.379 43.571 10.763 Z"/>\n  <path fill="#ffffff" d="M 74.563 25.931 L 70.274 25.931 C 69.982 25.931 69.787 25.739 69.787 25.451 L 73.003 6.347 C 73.003 5.963 73.393 5.675 73.685 5.675 L 78.071 5.675 C 78.266 5.675 78.558 5.963 78.461 6.251 L 75.342 25.355 C 75.245 25.643 74.952 25.931 74.563 25.931 Z"/>\n  <path fill="#ffffff" d="M 34.118 25.931 L 28.466 25.931 C 28.173 25.931 27.978 25.835 27.881 25.643 L 24.178 18.155 L 24.08 18.155 L 22.911 25.451 C 22.813 25.739 22.618 25.931 22.326 25.931 L 17.843 25.931 C 17.551 25.931 17.356 25.739 17.453 25.451 L 20.572 6.251 C 20.669 5.963 20.864 5.675 21.156 5.675 L 28.855 5.675 C 33.046 5.675 35.97 7.595 35.288 11.915 C 34.8 14.699 32.754 17.195 29.635 17.675 L 34.508 25.355 C 34.703 25.547 34.411 25.931 34.118 25.931 Z M 24.665 14.795 L 25.152 14.795 C 27.004 14.795 29.05 14.411 29.44 12.203 C 29.83 10.091 28.661 9.707 26.711 9.707 L 25.932 9.707 C 25.639 9.707 25.445 9.899 25.445 10.091 L 24.665 14.795 Z"/>\n  <path fill="#ffffff" d="M 86.16 25.931 L 81.872 25.931 C 81.579 25.931 81.384 25.739 81.482 25.451 L 83.918 10.187 L 79.923 10.187 C 79.63 10.187 79.435 9.899 79.533 9.611 L 80.02 6.347 C 80.118 5.963 80.41 5.675 80.8 5.675 L 94.249 5.675 C 94.444 5.675 94.736 5.963 94.639 6.251 L 94.054 9.515 C 94.054 9.899 93.761 10.187 93.372 10.187 L 89.473 10.187 L 86.939 25.355 C 86.939 25.643 86.647 25.931 86.16 25.931 Z"/>\n  <path fill="#ffffff" d="M 17.648 11.435 C 17.648 11.819 17.161 12.011 16.868 11.723 C 15.894 10.763 14.529 10.283 13.068 10.283 C 9.657 10.283 7.025 12.779 6.441 15.851 C 5.953 19.019 7.902 21.323 11.313 21.323 C 12.678 21.323 14.237 20.843 15.407 19.979 C 15.796 19.787 16.284 20.075 16.186 20.459 L 15.407 25.067 C 15.309 25.355 15.114 25.547 14.822 25.643 C 13.165 26.123 11.898 26.507 10.339 26.507 C 1.178 26.507 -0.284 19.019 0.203 15.851 C 1.47 6.923 9.072 4.907 13.652 5.195 C 15.114 5.195 16.479 5.387 17.745 5.867 C 18.233 6.059 18.428 6.443 18.33 6.923 L 17.648 11.435 Z"/>\n</svg>\n';
    },
    "./src/resources/fundingLogos/elv.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="100" height="32" viewBox="0 0 100 32" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path fill="#005DA0" d="M 39.871 18.772 C 37.78 18.772 35.843 18.278 34.272 17.425 L 34.81 13.935 C 36.409 14.769 38.051 15.263 39.826 15.263 C 41.809 15.263 42.661 14.544 42.661 13.284 C 42.661 10.45 34.34 11.641 34.34 5.59 C 34.34 2.53 36.319 0.055 40.885 0.055 C 42.639 0.055 44.549 0.416 45.946 0.999 L 45.474 4.395 C 43.989 3.926 42.481 3.633 41.108 3.633 C 38.86 3.633 38.275 4.395 38.275 5.364 C 38.275 8.175 46.598 6.895 46.598 13.013 C 46.576 16.569 44.101 18.772 39.871 18.772 Z"/>\n  <path fill="#005DA0" d="M 62.233 14.881 L 62.233 18.413 L 49.951 18.413 L 49.951 0.345 L 62.233 0.345 L 62.233 3.946 L 54.022 3.946 L 54.022 7.549 L 60.705 7.549 L 60.705 10.787 L 54.022 10.787 L 54.022 14.905 L 62.233 14.905 Z"/>\n  <path fill="#005DA0" d="M 72.313 12.565 L 69.905 12.565 L 69.905 18.437 L 65.834 18.437 L 65.834 0.345 L 72.313 0.345 C 77.328 0.345 79.376 2.328 79.376 6.534 C 79.376 10.361 77.355 12.565 72.313 12.565 Z M 72.313 3.766 L 69.905 3.766 L 69.905 9.302 L 72.313 9.302 C 74.314 9.302 75.194 8.808 75.194 6.534 C 75.194 4.352 74.428 3.766 72.313 3.766 Z"/>\n  <path fill="#005DA0" d="M 91.797 14.924 L 85.246 14.924 L 84.234 18.437 L 79.939 18.437 L 86.193 0.345 L 91.031 0.345 L 97.352 18.437 L 92.808 18.437 L 91.797 14.924 Z M 88.04 5.318 L 86.238 11.506 L 90.85 11.506 L 89.118 5.318 L 88.645 3.408 L 88.578 3.408 L 88.04 5.318 Z"/>\n  <path fill="#005DA0" d="M 39.736 30.157 L 39.692 31.867 L 34.382 31.867 L 34.382 23.475 L 36.299 23.475 L 36.299 30.157 L 39.736 30.157 Z"/>\n  <path fill="#005DA0" d="M 44.798 31.215 L 44.778 31.215 C 44.371 31.71 43.722 31.977 42.931 31.977 C 41.648 31.977 40.818 31.257 40.818 29.727 C 40.818 28.468 41.695 27.613 43.222 27.613 C 43.722 27.613 44.168 27.68 44.527 27.796 L 44.527 27.411 C 44.527 26.736 44.168 26.421 43.244 26.421 C 42.505 26.421 42.007 26.534 41.382 26.782 L 41.245 25.387 C 41.919 25.095 42.707 24.936 43.563 24.936 C 45.563 24.936 46.263 25.792 46.263 27.658 L 46.263 31.867 L 44.933 31.867 L 44.798 31.215 Z M 44.549 28.966 C 44.393 28.896 44.056 28.828 43.583 28.828 C 42.819 28.828 42.46 29.12 42.46 29.727 C 42.46 30.38 42.842 30.63 43.427 30.63 C 44.012 30.63 44.549 30.271 44.549 29.842 L 44.549 28.966 Z"/>\n  <path fill="#005DA0" d="M 50.02 32.002 C 49.21 32.002 48.466 31.842 47.883 31.529 L 48.062 30.088 C 48.625 30.405 49.41 30.561 49.996 30.561 C 50.693 30.561 50.986 30.29 50.986 29.887 C 50.986 28.807 47.84 29.436 47.84 27.051 C 47.84 25.838 48.667 24.959 50.403 24.959 C 51.075 24.959 51.752 25.095 52.336 25.32 L 52.201 26.736 C 51.64 26.512 50.897 26.396 50.381 26.396 C 49.816 26.396 49.503 26.625 49.503 26.961 C 49.503 27.995 52.603 27.366 52.603 29.707 C 52.603 31.101 51.862 32.002 50.02 32.002 Z"/>\n  <path fill="#005DA0" d="M 56.026 26.375 L 56.026 29.842 C 56.026 30.36 56.295 30.582 56.836 30.582 C 57.014 30.582 57.239 30.561 57.374 30.514 L 57.464 31.776 C 57.239 31.888 56.789 31.956 56.295 31.956 C 54.946 31.956 54.27 31.169 54.27 29.887 L 54.27 26.352 L 53.506 26.352 L 53.506 25.095 L 54.337 25.095 L 54.631 23.562 L 56.002 23.451 L 56.002 25.116 L 57.51 25.116 L 57.51 26.421 L 56.026 26.421 Z"/>\n  <path fill="#005DA0" d="M 60.885 32.002 C 60.073 32.002 59.331 31.842 58.748 31.529 L 58.929 30.088 C 59.49 30.405 60.275 30.561 60.862 30.561 C 61.561 30.561 61.851 30.29 61.851 29.887 C 61.851 28.807 58.702 29.436 58.702 27.051 C 58.702 25.838 59.534 24.959 61.269 24.959 C 61.943 24.959 62.615 25.095 63.203 25.32 L 63.069 26.736 C 62.505 26.512 61.764 26.396 61.246 26.396 C 60.681 26.396 60.367 26.625 60.367 26.961 C 60.367 27.995 63.47 27.366 63.47 29.707 C 63.47 31.101 62.729 32.002 60.885 32.002 Z"/>\n  <path fill="#005DA0" d="M 69.365 26.736 C 69.028 26.625 68.603 26.534 68.22 26.534 C 66.958 26.534 66.53 27.051 66.53 28.49 C 66.53 29.954 67.116 30.514 68.174 30.514 C 68.623 30.514 69.05 30.425 69.41 30.271 L 69.525 31.616 C 69.119 31.867 68.511 32.002 67.792 32.002 C 65.787 32.002 64.732 30.854 64.732 28.49 C 64.732 26.242 65.653 24.981 67.835 24.981 C 68.397 24.981 69.05 25.095 69.479 25.276 L 69.365 26.736 Z"/>\n  <path fill="#005DA0" d="M 75.078 31.867 L 75.078 27.546 C 75.078 26.849 74.743 26.491 74.001 26.491 C 73.508 26.491 73.055 26.714 72.855 27.008 L 72.855 31.867 L 71.122 31.867 L 71.122 23.16 L 72.855 23.069 L 72.855 24.622 L 72.83 25.52 L 72.855 25.545 C 73.348 25.116 73.979 24.959 74.541 24.959 C 75.98 24.959 76.812 25.926 76.812 27.546 L 76.812 31.867 L 75.078 31.867 Z"/>\n  <path fill="#005DA0" d="M 78.658 31.867 L 78.658 25.139 L 80.052 25.072 L 80.21 26.199 L 80.231 26.199 C 80.66 25.387 81.313 24.981 82.098 24.981 C 82.39 24.981 82.663 25.028 82.84 25.072 L 82.731 26.782 C 82.528 26.714 82.257 26.667 81.985 26.667 C 81.088 26.667 80.413 27.321 80.413 28.468 L 80.413 31.867 L 78.658 31.867 Z"/>\n  <path fill="#005DA0" d="M 85.382 24.35 C 84.708 24.35 84.395 24.172 84.395 23.609 C 84.395 23.136 84.708 22.867 85.382 22.867 C 86.058 22.867 86.375 23.113 86.375 23.609 C 86.354 24.105 86.058 24.35 85.382 24.35 Z M 84.484 31.867 L 84.484 25.139 L 86.259 25.072 L 86.259 31.888 L 84.484 31.888 Z"/>\n  <path fill="#005DA0" d="M 88.757 31.867 L 88.757 26.375 L 87.902 26.375 L 87.902 25.095 L 88.757 25.095 L 88.757 24.798 C 88.757 23.79 89.454 22.935 91.076 22.935 C 91.459 22.935 91.885 22.979 92.178 23.069 L 92.063 24.195 C 91.863 24.147 91.636 24.126 91.411 24.126 C 90.738 24.126 90.466 24.399 90.466 24.825 L 90.466 25.072 L 91.907 25.072 L 91.907 26.352 L 90.466 26.352 L 90.466 31.842 L 88.757 31.842 Z"/>\n  <path fill="#005DA0" d="M 95.486 26.375 L 95.486 29.842 C 95.486 30.36 95.754 30.582 96.296 30.582 C 96.473 30.582 96.698 30.561 96.834 30.514 L 96.924 31.776 C 96.698 31.888 96.249 31.956 95.754 31.956 C 94.406 31.956 93.729 31.169 93.729 29.887 L 93.729 26.352 L 92.965 26.352 L 92.965 25.095 L 93.798 25.095 L 94.09 23.562 L 95.461 23.451 L 95.461 25.116 L 96.969 25.116 L 96.969 26.421 L 95.486 26.421 Z"/>\n  <path fill="#AEB1BC" d="M 20.357 8.826 L 15.368 5.081 L 10.379 1.334 C 10.033 1.074 9.54 1.146 9.281 1.493 L 4.883 7.322 C 4.811 7.409 4.768 7.51 4.754 7.624 C 4.68 7.93 4.782 8.248 5.043 8.45 L 8.022 10.677 L 12.042 13.698 L 15.021 15.926 C 15.281 16.13 15.629 16.13 15.888 15.97 C 15.991 15.912 16.062 15.854 16.136 15.752 L 20.531 9.91 C 20.763 9.578 20.706 9.087 20.357 8.826 Z M 10.047 1.769 L 13.012 3.995 L 13.012 3.995 L 15.021 5.5 L 17.046 7.017 L 17.046 7.017 L 20.025 9.245 C 20.142 9.332 20.156 9.491 20.082 9.607 L 19.374 10.591 L 16.005 8.058 L 12.36 5.326 L 8.976 2.809 L 9.684 1.826 C 9.772 1.709 9.931 1.682 10.047 1.769 Z M 15.673 15.463 C 15.629 15.507 15.585 15.536 15.528 15.55 C 15.469 15.564 15.398 15.55 15.339 15.507 L 12.345 13.265 L 8.34 10.257 L 5.361 8.001 C 5.302 7.958 5.275 7.9 5.259 7.842 C 5.259 7.785 5.259 7.726 5.302 7.669 L 6.113 6.585 C 6.113 6.585 7.009 5.427 7.791 4.386 L 11.16 6.917 L 14.804 9.65 L 18.173 12.181 C 17.393 13.222 16.496 14.379 16.496 14.379 L 15.673 15.463 Z"/>\n  <g transform="matrix(0.144619, 0, 0, 0.144619, -7.250457, -3.988513)">\n    <path fill="#005DA0" d="M197.1,150.4l52-69.6l5.3-7c0,0,0.1-0.2,0.2-0.2c0.4-0.5,0.3-1.2-0.2-1.6l-14.7-10.7&#10;&#9;&#9;&#9;c-0.5-0.4-1.2-0.2-1.6,0.3c-0.1,0.1-0.2,0.2-0.2,0.2l-2,2.5l-64.3,86l-70.8,0l-26.5,87.4h177.1l-25-87.4L197.1,150.4z M79.1,234.3&#10;&#9;&#9;&#9;l24.2-80.5l65.7,0l-5.7,7.6l-8.1,11.3l-0.9,1.7l-0.9,1.9l-0.9,2.2l-0.9,2.3l-0.9,2.5l-0.9,2.5l-0.8,2.5l-0.8,2.4l-0.7,2.3&#10;&#9;&#9;&#9;l-0.7,2.1l-0.6,1.9l-0.4,1.6l-0.3,1.2l-0.3,0.7c0,0-0.1,0.2-0.2,0.4c-0.2,0.2-1.2,1.1-2,0.5c-0.8-0.6-0.7-2.6-0.6-3.6&#10;&#9;&#9;&#9;c0.2-3,0.5-6,0.7-8.9c0.1-1-1.2-1.6-2-1.2c-3.6,2.1-5.8,4.6-7.8,7.5c0.2-0.7,0.4-1.4,0.6-2c0.8-3.1,2-6.2,2.5-9.4&#10;&#9;&#9;&#9;c0.3-1.8-0.2-3.9-2.3-4.3c-2.4-0.4-3.9,2.1-5.1,3.7c-3.5,5-5.6,11.2-9.9,15.5c-1.6,1.6-3.5,2.8-5.8,2.1c-2.7-0.8-3.8,2.4,1,2.9&#10;&#9;&#9;&#9;c4.7,0.4,8.3-4.6,10.4-8.1c1.6-2.5,2.9-5.2,4.5-7.8c0.7-1.2,1.5-2.4,2.3-3.6c0.4-0.5,1-1.8,1.7-2c0.8-0.2,0.6,0.3,0.6,0.9&#10;&#9;&#9;&#9;c-0.1,1.5-0.7,3-1.1,4.5c-0.4,1.6-0.9,3.2-1.3,4.7c-0.9,3.4-1.8,6.8-2.8,10.1c-0.4,1.5,1.6,2.2,2.5,1c3.4-4.8,5.1-8.9,9.2-12.1&#10;&#9;&#9;&#9;c-0.1,1.1-0.2,2.1-0.3,3.2c-0.1,1.7-0.5,3.6-0.4,5.3c0.2,2.9,2.4,4.8,5.1,3.6c1.4-0.7,2.4-1.7,2.4-1.7l0.2-0.1l0.6-0.4l1-0.7&#10;&#9;&#9;&#9;l1.4-1l1.6-1.2l1.7-1.2l2.1-1.4l2.1-1.5l2.1-1.5l2.1-1.5l2-1.5l1.9-1.4l1.8-1.4l1.5-1.2l1.2-1.1l1-0.9l0-0.1l0,0l6.5-7.6&#10;&#9;&#9;&#9;l16.6-22.1l29.4,0l22.9,80.5H79.1z"/>\n    <path fill="#005DA0" d="M261.1,77.1l-1.9-1.5c-0.4-0.3-0.9-0.2-1.2,0.2l-24.7,32.9c-0.3,0.4-0.2,0.9,0.2,1.2l1.9,1.5&#10;&#9;&#9;&#9;c0.4,0.3,0.9,0.2,1.2-0.2l24.7-32.9C261.5,77.9,261.5,77.4,261.1,77.1z"/>\n    <polygon fill="#005DA0" points="161.7,217.2 210.9,217.2 209.9,213.3 161.7,213.3 113.6,213.3 112.5,217.2 &#9;&#9;"/>\n  </g>\n</svg>';
    },
    "./src/resources/fundingLogos/elv_white.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="100" height="32" viewBox="0 0 100 32" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M 39.871 18.772 C 37.78 18.772 35.843 18.278 34.272 17.425 L 34.81 13.935 C 36.409 14.769 38.051 15.263 39.826 15.263 C 41.809 15.263 42.661 14.544 42.661 13.284 C 42.661 10.45 34.34 11.641 34.34 5.59 C 34.34 2.53 36.319 0.055 40.885 0.055 C 42.639 0.055 44.549 0.416 45.946 0.999 L 45.474 4.395 C 43.989 3.926 42.481 3.633 41.108 3.633 C 38.86 3.633 38.275 4.395 38.275 5.364 C 38.275 8.175 46.598 6.895 46.598 13.013 C 46.576 16.569 44.101 18.772 39.871 18.772 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 62.233 14.881 L 62.233 18.413 L 49.951 18.413 L 49.951 0.345 L 62.233 0.345 L 62.233 3.946 L 54.022 3.946 L 54.022 7.549 L 60.705 7.549 L 60.705 10.787 L 54.022 10.787 L 54.022 14.905 L 62.233 14.905 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 72.313 12.565 L 69.905 12.565 L 69.905 18.437 L 65.834 18.437 L 65.834 0.345 L 72.313 0.345 C 77.328 0.345 79.376 2.328 79.376 6.534 C 79.376 10.361 77.355 12.565 72.313 12.565 Z M 72.313 3.766 L 69.905 3.766 L 69.905 9.302 L 72.313 9.302 C 74.314 9.302 75.194 8.808 75.194 6.534 C 75.194 4.352 74.428 3.766 72.313 3.766 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 91.797 14.924 L 85.246 14.924 L 84.234 18.437 L 79.939 18.437 L 86.193 0.345 L 91.031 0.345 L 97.352 18.437 L 92.808 18.437 L 91.797 14.924 Z M 88.04 5.318 L 86.238 11.506 L 90.85 11.506 L 89.118 5.318 L 88.645 3.408 L 88.578 3.408 L 88.04 5.318 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 39.736 30.157 L 39.692 31.867 L 34.382 31.867 L 34.382 23.475 L 36.299 23.475 L 36.299 30.157 L 39.736 30.157 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 44.798 31.215 L 44.778 31.215 C 44.371 31.71 43.722 31.977 42.931 31.977 C 41.648 31.977 40.818 31.257 40.818 29.727 C 40.818 28.468 41.695 27.613 43.222 27.613 C 43.722 27.613 44.168 27.68 44.527 27.796 L 44.527 27.411 C 44.527 26.736 44.168 26.421 43.244 26.421 C 42.505 26.421 42.007 26.534 41.382 26.782 L 41.245 25.387 C 41.919 25.095 42.707 24.936 43.563 24.936 C 45.563 24.936 46.263 25.792 46.263 27.658 L 46.263 31.867 L 44.933 31.867 L 44.798 31.215 Z M 44.549 28.966 C 44.393 28.896 44.056 28.828 43.583 28.828 C 42.819 28.828 42.46 29.12 42.46 29.727 C 42.46 30.38 42.842 30.63 43.427 30.63 C 44.012 30.63 44.549 30.271 44.549 29.842 L 44.549 28.966 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 50.02 32.002 C 49.21 32.002 48.466 31.842 47.883 31.529 L 48.062 30.088 C 48.625 30.405 49.41 30.561 49.996 30.561 C 50.693 30.561 50.986 30.29 50.986 29.887 C 50.986 28.807 47.84 29.436 47.84 27.051 C 47.84 25.838 48.667 24.959 50.403 24.959 C 51.075 24.959 51.752 25.095 52.336 25.32 L 52.201 26.736 C 51.64 26.512 50.897 26.396 50.381 26.396 C 49.816 26.396 49.503 26.625 49.503 26.961 C 49.503 27.995 52.603 27.366 52.603 29.707 C 52.603 31.101 51.862 32.002 50.02 32.002 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 56.026 26.375 L 56.026 29.842 C 56.026 30.36 56.295 30.582 56.836 30.582 C 57.014 30.582 57.239 30.561 57.374 30.514 L 57.464 31.776 C 57.239 31.888 56.789 31.956 56.295 31.956 C 54.946 31.956 54.27 31.169 54.27 29.887 L 54.27 26.352 L 53.506 26.352 L 53.506 25.095 L 54.337 25.095 L 54.631 23.562 L 56.002 23.451 L 56.002 25.116 L 57.51 25.116 L 57.51 26.421 L 56.026 26.421 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 60.885 32.002 C 60.073 32.002 59.331 31.842 58.748 31.529 L 58.929 30.088 C 59.49 30.405 60.275 30.561 60.862 30.561 C 61.561 30.561 61.851 30.29 61.851 29.887 C 61.851 28.807 58.702 29.436 58.702 27.051 C 58.702 25.838 59.534 24.959 61.269 24.959 C 61.943 24.959 62.615 25.095 63.203 25.32 L 63.069 26.736 C 62.505 26.512 61.764 26.396 61.246 26.396 C 60.681 26.396 60.367 26.625 60.367 26.961 C 60.367 27.995 63.47 27.366 63.47 29.707 C 63.47 31.101 62.729 32.002 60.885 32.002 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 69.365 26.736 C 69.028 26.625 68.603 26.534 68.22 26.534 C 66.958 26.534 66.53 27.051 66.53 28.49 C 66.53 29.954 67.116 30.514 68.174 30.514 C 68.623 30.514 69.05 30.425 69.41 30.271 L 69.525 31.616 C 69.119 31.867 68.511 32.002 67.792 32.002 C 65.787 32.002 64.732 30.854 64.732 28.49 C 64.732 26.242 65.653 24.981 67.835 24.981 C 68.397 24.981 69.05 25.095 69.479 25.276 L 69.365 26.736 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 75.078 31.867 L 75.078 27.546 C 75.078 26.849 74.743 26.491 74.001 26.491 C 73.508 26.491 73.055 26.714 72.855 27.008 L 72.855 31.867 L 71.122 31.867 L 71.122 23.16 L 72.855 23.069 L 72.855 24.622 L 72.83 25.52 L 72.855 25.545 C 73.348 25.116 73.979 24.959 74.541 24.959 C 75.98 24.959 76.812 25.926 76.812 27.546 L 76.812 31.867 L 75.078 31.867 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 78.658 31.867 L 78.658 25.139 L 80.052 25.072 L 80.21 26.199 L 80.231 26.199 C 80.66 25.387 81.313 24.981 82.098 24.981 C 82.39 24.981 82.663 25.028 82.84 25.072 L 82.731 26.782 C 82.528 26.714 82.257 26.667 81.985 26.667 C 81.088 26.667 80.413 27.321 80.413 28.468 L 80.413 31.867 L 78.658 31.867 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 85.382 24.35 C 84.708 24.35 84.395 24.172 84.395 23.609 C 84.395 23.136 84.708 22.867 85.382 22.867 C 86.058 22.867 86.375 23.113 86.375 23.609 C 86.354 24.105 86.058 24.35 85.382 24.35 Z M 84.484 31.867 L 84.484 25.139 L 86.259 25.072 L 86.259 31.888 L 84.484 31.888 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 88.757 31.867 L 88.757 26.375 L 87.902 26.375 L 87.902 25.095 L 88.757 25.095 L 88.757 24.798 C 88.757 23.79 89.454 22.935 91.076 22.935 C 91.459 22.935 91.885 22.979 92.178 23.069 L 92.063 24.195 C 91.863 24.147 91.636 24.126 91.411 24.126 C 90.738 24.126 90.466 24.399 90.466 24.825 L 90.466 25.072 L 91.907 25.072 L 91.907 26.352 L 90.466 26.352 L 90.466 31.842 L 88.757 31.842 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 95.486 26.375 L 95.486 29.842 C 95.486 30.36 95.754 30.582 96.296 30.582 C 96.473 30.582 96.698 30.561 96.834 30.514 L 96.924 31.776 C 96.698 31.888 96.249 31.956 95.754 31.956 C 94.406 31.956 93.729 31.169 93.729 29.887 L 93.729 26.352 L 92.965 26.352 L 92.965 25.095 L 93.798 25.095 L 94.09 23.562 L 95.461 23.451 L 95.461 25.116 L 96.969 25.116 L 96.969 26.421 L 95.486 26.421 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 20.357 8.826 L 15.368 5.081 L 10.379 1.334 C 10.033 1.074 9.54 1.146 9.281 1.493 L 4.883 7.322 C 4.811 7.409 4.768 7.51 4.754 7.624 C 4.68 7.93 4.782 8.248 5.043 8.45 L 8.022 10.677 L 12.042 13.698 L 15.021 15.926 C 15.281 16.13 15.629 16.13 15.888 15.97 C 15.991 15.912 16.062 15.854 16.136 15.752 L 20.531 9.91 C 20.763 9.578 20.706 9.087 20.357 8.826 Z M 10.047 1.769 L 13.012 3.995 L 13.012 3.995 L 15.021 5.5 L 17.046 7.017 L 17.046 7.017 L 20.025 9.245 C 20.142 9.332 20.156 9.491 20.082 9.607 L 19.374 10.591 L 16.005 8.058 L 12.36 5.326 L 8.976 2.809 L 9.684 1.826 C 9.772 1.709 9.931 1.682 10.047 1.769 Z M 15.673 15.463 C 15.629 15.507 15.585 15.536 15.528 15.55 C 15.469 15.564 15.398 15.55 15.339 15.507 L 12.345 13.265 L 8.34 10.257 L 5.361 8.001 C 5.302 7.958 5.275 7.9 5.259 7.842 C 5.259 7.785 5.259 7.726 5.302 7.669 L 6.113 6.585 C 6.113 6.585 7.009 5.427 7.791 4.386 L 11.16 6.917 L 14.804 9.65 L 18.173 12.181 C 17.393 13.222 16.496 14.379 16.496 14.379 L 15.673 15.463 Z" style="fill: rgb(255, 255, 255);"/>\n  <g transform="matrix(0.144619, 0, 0, 0.144619, -7.250457, -3.988513)">\n    <path d="M197.1,150.4l52-69.6l5.3-7c0,0,0.1-0.2,0.2-0.2c0.4-0.5,0.3-1.2-0.2-1.6l-14.7-10.7&#10;&#9;&#9;&#9;c-0.5-0.4-1.2-0.2-1.6,0.3c-0.1,0.1-0.2,0.2-0.2,0.2l-2,2.5l-64.3,86l-70.8,0l-26.5,87.4h177.1l-25-87.4L197.1,150.4z M79.1,234.3&#10;&#9;&#9;&#9;l24.2-80.5l65.7,0l-5.7,7.6l-8.1,11.3l-0.9,1.7l-0.9,1.9l-0.9,2.2l-0.9,2.3l-0.9,2.5l-0.9,2.5l-0.8,2.5l-0.8,2.4l-0.7,2.3&#10;&#9;&#9;&#9;l-0.7,2.1l-0.6,1.9l-0.4,1.6l-0.3,1.2l-0.3,0.7c0,0-0.1,0.2-0.2,0.4c-0.2,0.2-1.2,1.1-2,0.5c-0.8-0.6-0.7-2.6-0.6-3.6&#10;&#9;&#9;&#9;c0.2-3,0.5-6,0.7-8.9c0.1-1-1.2-1.6-2-1.2c-3.6,2.1-5.8,4.6-7.8,7.5c0.2-0.7,0.4-1.4,0.6-2c0.8-3.1,2-6.2,2.5-9.4&#10;&#9;&#9;&#9;c0.3-1.8-0.2-3.9-2.3-4.3c-2.4-0.4-3.9,2.1-5.1,3.7c-3.5,5-5.6,11.2-9.9,15.5c-1.6,1.6-3.5,2.8-5.8,2.1c-2.7-0.8-3.8,2.4,1,2.9&#10;&#9;&#9;&#9;c4.7,0.4,8.3-4.6,10.4-8.1c1.6-2.5,2.9-5.2,4.5-7.8c0.7-1.2,1.5-2.4,2.3-3.6c0.4-0.5,1-1.8,1.7-2c0.8-0.2,0.6,0.3,0.6,0.9&#10;&#9;&#9;&#9;c-0.1,1.5-0.7,3-1.1,4.5c-0.4,1.6-0.9,3.2-1.3,4.7c-0.9,3.4-1.8,6.8-2.8,10.1c-0.4,1.5,1.6,2.2,2.5,1c3.4-4.8,5.1-8.9,9.2-12.1&#10;&#9;&#9;&#9;c-0.1,1.1-0.2,2.1-0.3,3.2c-0.1,1.7-0.5,3.6-0.4,5.3c0.2,2.9,2.4,4.8,5.1,3.6c1.4-0.7,2.4-1.7,2.4-1.7l0.2-0.1l0.6-0.4l1-0.7&#10;&#9;&#9;&#9;l1.4-1l1.6-1.2l1.7-1.2l2.1-1.4l2.1-1.5l2.1-1.5l2.1-1.5l2-1.5l1.9-1.4l1.8-1.4l1.5-1.2l1.2-1.1l1-0.9l0-0.1l0,0l6.5-7.6&#10;&#9;&#9;&#9;l16.6-22.1l29.4,0l22.9,80.5H79.1z" style="fill: rgb(255, 255, 255);"/>\n    <path d="M261.1,77.1l-1.9-1.5c-0.4-0.3-0.9-0.2-1.2,0.2l-24.7,32.9c-0.3,0.4-0.2,0.9,0.2,1.2l1.9,1.5&#10;&#9;&#9;&#9;c0.4,0.3,0.9,0.2,1.2-0.2l24.7-32.9C261.5,77.9,261.5,77.4,261.1,77.1z" style="fill: rgb(255, 255, 255);"/>\n    <polygon points="161.7,217.2 210.9,217.2 209.9,213.3 161.7,213.3 113.6,213.3 112.5,217.2 &#9;&#9;" style="fill: rgb(255, 255, 255);"/>\n  </g>\n</svg>';
    },
    "./src/resources/fundingLogos/ideal.svg": function(module, exports) {
        module.exports = '<svg width="38" height="32" viewBox="0 0 38 32" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <polygon id="Fill-1" fill="#000000" points="4.47 27.632 10.452 27.632 10.452 17.982 4.47 17.982"/>\n  <g id="Group-9" transform="matrix(0.952642, 0, 0, 0.930979, 0.31993, 0.181113)">\n    <path d="M11.1102604,13.937999 C11.1102604,15.8893766 9.51859887,17.4723289 7.55546104,17.4723289 C5.59238806,17.4723289 4.00066169,15.8893766 4.00066169,13.937999 C4.00066169,11.9865569 5.59238806,10.4043136 7.55546104,10.4043136 C9.51859887,10.4043136 11.1102604,11.9865569 11.1102604,13.937999" id="Fill-2" fill="#000000"/>\n    <g id="Group-6">\n      <mask id="mask-2" fill="white">\n        <polygon id="" points="39.1898554 33.9678282 0 33.9678282 0 0.001572704 39.1898554 0.001572704" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n      </mask>\n      <g id="Clip-5"/>\n      <path d="M22.1049929,2.25750057 C26.4717361,2.25750057 30.1110886,3.433548 32.6296578,5.65853743 C35.476843,8.17370364 36.9204068,11.9843525 36.9204068,16.9847134 C36.9204068,26.8945533 32.0742264,31.7119261 22.1049929,31.7119261 L2.26942909,31.7119261 L2.26942909,2.25750057 L22.1049929,2.25750057 Z M22.531325,0.001572704 L-1.9452416e-05,0.001572704 L-1.9452416e-05,33.967854 L22.531325,33.967854 L22.531325,33.9614085 C27.4529808,33.8947619 31.3518934,32.6793969 34.1187402,30.3394196 C37.4837488,27.4935988 39.1898554,23.0003706 39.1898554,16.9847134 C39.1898554,14.1090499 38.7410881,11.5297509 37.8560681,9.31836144 C37.0093692,7.2028812 35.758125,5.40419768 34.13722,3.97219912 C31.2823834,1.45020067 27.2749912,0.0865245021 22.531325,0.00904949351 L22.531325,0.001572704 Z" id="Fill-4" fill="#000000" mask="url(#mask-2)"/>\n    </g>\n    <path d="M21.4851352,29.4975138 L13.5194356,29.4975138 L13.5194356,5.00387361 L21.4851352,5.00387361 L21.1636516,5.00387361 C27.8067813,5.00387361 34.8779291,7.60998594 34.8779291,17.282889 C34.8779291,27.5088167 27.8067813,29.4975138 21.1636516,29.4975138 L21.4851352,29.4975138 Z" id="Fill-7" fill="#CD0067"/>\n  </g>\n  <g id="Group-30" transform="matrix(0.952642, 0, 0, 0.930979, 11.685725, 10.562208)" fill="#FFFFFF">\n    <path d="M1.41115607,1.17495169 L1.41115607,5.07048794 L2.30681015,5.07048794 C2.64178075,5.07048794 2.88357428,5.05173151 3.03219074,5.0142831 C3.2267149,4.96613516 3.38810511,4.88459948 3.51649106,4.76961161 C3.64474732,4.65455929 3.749531,4.46538363 3.83058274,4.20189125 C3.91163447,3.93846333 3.95216034,3.57944852 3.95216034,3.12471792 C3.95216034,2.67005177 3.91163447,2.3210275 3.83058274,2.07764511 C3.749531,1.83426272 3.63605858,1.64437805 3.49016546,1.5079911 C3.34420749,1.37160414 3.15915018,1.27930447 2.93492866,1.23109207 C2.76737852,1.19370812 2.43915142,1.17495169 1.95018252,1.17495169 L1.41115607,1.17495169 Z M0.215675421,0.175897919 L2.40271056,0.175897919 C2.89589415,0.175897919 3.27190935,0.213410777 3.53069132,0.288436492 C3.878306,0.390275522 4.17612249,0.571265392 4.42407595,0.831212737 C4.67202941,1.09116008 4.86065301,1.40950373 4.99001157,1.78598587 C5.11937014,2.16253246 5.18408185,2.62686687 5.18408185,3.1789891 C5.18408185,3.66407805 5.12345515,4.08213371 5.00220176,4.433285 C4.85397434,4.86210466 4.6423969,5.20919527 4.36753426,5.47449239 C4.15997698,5.67552779 3.87966767,5.832347 3.52660632,5.94488558 C3.26244251,6.02796818 2.90938115,6.06954171 2.46742226,6.06954171 L0.215675421,6.06954171 L0.215675421,0.175897919 Z" id="Fill-10"/>\n    <path d="M2.40271056,0.337035624 C2.87825729,0.337035624 3.24247136,0.372743739 3.48523751,0.443128689 C3.80302515,0.536201827 4.07944398,0.704171771 4.30645367,0.942075479 C4.53702965,1.18384649 4.7154083,1.48530291 4.83666169,1.83813003 C4.95966581,2.19611355 5.02197838,2.64723467 5.02197838,3.1789891 C5.02197838,3.64390361 4.96375081,4.04829479 4.84885188,4.38094747 C4.70970226,4.78359837 4.50973142,5.11264156 4.25458057,5.35892443 C4.06589213,5.54165459 3.80438682,5.68712971 3.47713234,5.79148248 C3.23060538,5.86895749 2.89070683,5.908404 2.46742226,5.908404 L0.377778888,5.908404 L0.377778888,0.337035624 L2.40271056,0.337035624 Z M0.0535719538,0.0147602138 L0.0535719538,6.23067941 L2.46742226,6.23067941 C2.92390562,6.23067941 3.2967436,6.18614095 3.57549672,6.09848204 C3.95157676,5.97866004 4.25594223,5.80759625 4.48061764,5.58993144 C4.77246872,5.30819828 4.9996081,4.93661473 5.15548679,4.48562252 C5.28205718,4.11919538 5.34618531,3.67954727 5.34618531,3.1789891 C5.34618531,2.61178438 5.27797217,2.12559969 5.1434263,1.73390616 C5.00706486,1.33699177 4.80456521,0.995959927 4.54169823,0.720349996 C4.27494076,0.440679396 3.9502151,0.243317935 3.57646934,0.133873205 C3.29992083,0.0536910833 2.91612466,0.0147602138 2.40271056,0.0147602138 L0.0535719538,0.0147602138 Z" id="Fill-12"/>\n    <path d="M1.9501501,1.33608939 C2.54124418,1.33608939 2.79263424,1.36451409 2.899428,1.38836247 C3.09466542,1.43032272 3.25566658,1.50998921 3.37905974,1.6253638 C3.50439814,1.74254314 3.60457808,1.91180219 3.6766817,2.12824235 C3.75189771,2.35415741 3.79002445,2.68945275 3.79002445,3.12471792 C3.79002445,3.56127219 3.75150867,3.90784717 3.67551456,4.15477459 C3.60360546,4.38861762 3.51354078,4.55523401 3.40791416,4.64991853 C3.30014777,4.74647224 3.16054427,4.81647046 2.99299412,4.85797953 C2.85754047,4.89207627 2.62683481,4.90935023 2.30677773,4.90935023 L1.57329196,4.90935023 L1.57329196,1.33608939 L1.9501501,1.33608939 Z M1.24902018,1.01381398 L1.24902018,5.23162564 L2.30677773,5.23162564 C2.65860709,5.23162564 2.90889484,5.21158011 3.07203577,5.17052222 C3.29100514,5.1163155 3.47729444,5.02163098 3.62500312,4.88924025 C3.77699133,4.7529822 3.89493781,4.54356764 3.98558607,4.24900792 C4.07214932,3.96766148 4.11423138,3.59988078 4.11423138,3.12471792 C4.11423138,2.64833041 4.07176027,2.2893156 3.98441893,2.02698342 C3.89519718,1.75904364 3.76622766,1.54492386 3.60120633,1.39061839 C3.43423976,1.23450819 3.22162485,1.12789948 2.96919733,1.0736283 C2.78932733,1.03347278 2.45558871,1.01381398 1.9501501,1.01381398 L1.24902018,1.01381398 Z" id="Fill-14"/>\n    <polygon id="Fill-16" points="6.53678989 6.06950948 6.53678989 0.175865691 10.9257088 0.175865691 10.9257088 1.17491946 7.73227054 1.17491946 7.73227054 2.48013487 10.702849 2.48013487 10.702849 3.47918864 7.73227054 3.47918864 7.73227054 5.07045571 11.0391813 5.07045571 11.0391813 6.06950948"/>\n    <path d="M10.7636378,0.337035624 L10.7636378,1.01381398 L7.57019949,1.01381398 L7.57019949,2.64130481 L10.5407779,2.64130481 L10.5407779,3.31808317 L7.57019949,3.31808317 L7.57019949,5.23162564 L10.8771102,5.23162564 L10.8771102,5.908404 L6.69892578,5.908404 L6.69892578,0.337035624 L10.7636378,0.337035624 Z M6.37471884,0.0147602138 L6.37471884,6.23067941 L11.2013172,6.23067941 L11.2013172,4.90935023 L7.89440643,4.90935023 L7.89440643,3.64035858 L10.8649849,3.64035858 L10.8649849,2.3190294 L7.89440643,2.3190294 L7.89440643,1.33608939 L11.0878447,1.33608939 L11.0878447,0.0147602138 L6.37471884,0.0147602138 Z" id="Fill-18"/>\n    <path d="M15.5303032,3.73301276 L14.7130424,1.54959685 L13.9121864,3.73301276 L15.5303032,3.73301276 Z M17.7341971,6.06950948 L16.431793,6.06950948 L15.9144884,4.73206653 L13.5458326,4.73206653 L13.055113,6.06950948 L11.7849999,6.06950948 L14.0890089,0.175865691 L15.363207,0.175865691 L17.7341971,6.06950948 Z" id="Fill-20"/>\n    <path d="M15.2534629,0.337035624 C15.3291976,0.525244463 17.332991,5.50626875 17.4947703,5.908404 L16.5431581,5.908404 C16.4751395,5.73244163 16.0257887,4.57096105 16.0257887,4.57096105 L13.4323926,4.57096105 C13.4323926,4.57096105 13.0075518,5.72876769 12.9417378,5.908404 L12.0218979,5.908404 C12.1781008,5.50884695 14.1252876,0.527951577 14.1999201,0.337035624 L15.2534629,0.337035624 Z M13.9780328,0.0147602138 L11.5481019,6.23067941 L13.168553,6.23067941 C13.168553,6.23067941 13.5933289,5.07280832 13.6592077,4.89323646 L15.8031882,4.89323646 C15.871142,5.06913438 16.3204928,6.23067941 16.3204928,6.23067941 L17.9736239,6.23067941 L15.472951,0.0147602138 L13.9780328,0.0147602138 Z" id="Fill-22"/>\n    <path d="M14.7145337,2.01579402 C14.8921991,2.49044124 15.1926093,3.29290701 15.2970039,3.57186861 L14.1437998,3.57186861 C14.2457305,3.2940672 14.5401752,2.49134361 14.7145337,2.01579402 L14.7145337,2.01579402 Z M13.680573,3.89414402 L15.7636025,3.89414402 L14.7114862,1.0833868 L13.680573,3.89414402 Z" id="Fill-24"/>\n    <polygon id="Fill-26" points="18.7343171 6.06950948 18.7343171 0.224207003 19.9297978 0.224207003 19.9297978 5.07045571 22.9084814 5.07045571 22.9084814 6.06950948"/>\n    <path d="M19.7677267,0.385376935 L19.7677267,5.23162564 L22.7464104,5.23162564 L22.7464104,5.908404 L18.8963882,5.908404 L18.8963882,0.385376935 L19.7677267,0.385376935 Z M18.5722461,0.0631015253 L18.5722461,6.23067941 L23.0706173,6.23067941 L23.0706173,4.90935023 L20.0919337,4.90935023 L20.0919337,0.0631015253 L18.5722461,0.0631015253 Z" id="Fill-28"/>\n  </g>\n</svg>\n';
    },
    "./src/resources/fundingLogos/paypal_black.svg": function(module, exports) {
        module.exports = '<svg width="100" height="32" viewBox="0 0 100 32" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M 12 5.315 L 4.2 5.315 C 3.7 5.315 3.2 5.715 3.1 6.215 L 0 26.215 C -0.1 26.615 0.2 26.915 0.6 26.915 L 4.3 26.915 C 4.8 26.915 5.3 26.515 5.4 26.015 L 6.2 20.615 C 6.3 20.115 6.7 19.715 7.3 19.715 L 9.8 19.715 C 14.9 19.715 17.9 17.215 18.7 12.315 C 19 10.215 18.7 8.515 17.7 7.315 C 16.6 6.015 14.6 5.315 12 5.315 Z M 12.9 12.615 C 12.5 15.415 10.3 15.415 8.3 15.415 L 7.1 15.415 L 7.9 10.215 C 7.9 9.915 8.2 9.715 8.5 9.715 L 9 9.715 C 10.4 9.715 11.7 9.715 12.4 10.515 C 12.9 10.915 13.1 11.615 12.9 12.615 Z" fill="#333030"/>\n  <path d="M 35.2 12.515 L 31.5 12.515 C 31.2 12.515 30.9 12.715 30.9 13.015 L 30.7 14.015 L 30.4 13.615 C 29.6 12.415 27.8 12.015 26 12.015 C 21.9 12.015 18.4 15.115 17.7 19.515 C 17.3 21.715 17.8 23.815 19.1 25.215 C 20.2 26.515 21.9 27.115 23.8 27.115 C 27.1 27.115 29 25.015 29 25.015 L 28.8 26.015 C 28.7 26.415 29 26.815 29.4 26.815 L 32.8 26.815 C 33.3 26.815 33.8 26.415 33.9 25.915 L 35.9 13.115 C 36 12.915 35.6 12.515 35.2 12.515 Z M 30.1 19.815 C 29.7 21.915 28.1 23.415 25.9 23.415 C 24.8 23.415 24 23.115 23.4 22.415 C 22.8 21.715 22.6 20.815 22.8 19.815 C 23.1 17.715 24.9 16.215 27 16.215 C 28.1 16.215 28.9 16.615 29.5 17.215 C 30 17.815 30.2 18.715 30.1 19.815 Z" fill="#333030"/>\n  <path d="M 55.1 12.515 L 51.4 12.515 C 51 12.515 50.7 12.715 50.5 13.015 L 45.3 20.615 L 43.1 13.315 C 43 12.815 42.5 12.515 42.1 12.515 L 38.4 12.515 C 38 12.515 37.6 12.915 37.8 13.415 L 41.9 25.515 L 38 30.915 C 37.7 31.315 38 31.915 38.5 31.915 L 42.2 31.915 C 42.6 31.915 42.9 31.715 43.1 31.415 L 55.6 13.415 C 55.9 13.115 55.6 12.515 55.1 12.515 Z" fill="#333030"/>\n  <path d="M 67.5 5.315 L 59.7 5.315 C 59.2 5.315 58.7 5.715 58.6 6.215 L 55.5 26.115 C 55.4 26.515 55.7 26.815 56.1 26.815 L 60.1 26.815 C 60.5 26.815 60.8 26.515 60.8 26.215 L 61.7 20.515 C 61.8 20.015 62.2 19.615 62.8 19.615 L 65.3 19.615 C 70.4 19.615 73.4 17.115 74.2 12.215 C 74.5 10.115 74.2 8.415 73.2 7.215 C 72 6.015 70.1 5.315 67.5 5.315 Z M 68.4 12.615 C 68 15.415 65.8 15.415 63.8 15.415 L 62.6 15.415 L 63.4 10.215 C 63.4 9.915 63.7 9.715 64 9.715 L 64.5 9.715 C 65.9 9.715 67.2 9.715 67.9 10.515 C 68.4 10.915 68.5 11.615 68.4 12.615 Z" fill="#636363"/>\n  <path d="M 90.7 12.515 L 87 12.515 C 86.7 12.515 86.4 12.715 86.4 13.015 L 86.2 14.015 L 85.9 13.615 C 85.1 12.415 83.3 12.015 81.5 12.015 C 77.4 12.015 73.9 15.115 73.2 19.515 C 72.8 21.715 73.3 23.815 74.6 25.215 C 75.7 26.515 77.4 27.115 79.3 27.115 C 82.6 27.115 84.5 25.015 84.5 25.015 L 84.3 26.015 C 84.2 26.415 84.5 26.815 84.9 26.815 L 88.3 26.815 C 88.8 26.815 89.3 26.415 89.4 25.915 L 91.4 13.115 C 91.4 12.915 91.1 12.515 90.7 12.515 Z M 85.5 19.815 C 85.1 21.915 83.5 23.415 81.3 23.415 C 80.2 23.415 79.4 23.115 78.8 22.415 C 78.2 21.715 78 20.815 78.2 19.815 C 78.5 17.715 80.3 16.215 82.4 16.215 C 83.5 16.215 84.3 16.615 84.9 17.215 C 85.5 17.815 85.7 18.715 85.5 19.815 Z" fill="#636363"/>\n  <path d="M 95.1 5.915 L 91.9 26.215 C 91.8 26.615 92.1 26.915 92.5 26.915 L 95.7 26.915 C 96.2 26.915 96.7 26.515 96.8 26.015 L 100 6.115 C 100.1 5.715 99.8 5.415 99.4 5.415 L 95.8 5.415 C 95.4 5.315 95.2 5.515 95.1 5.915 Z" fill="#636363"/>\n</svg>\n';
    },
    "./src/resources/fundingLogos/paypal_blue.svg": function(module, exports) {
        module.exports = '<svg width="100" height="32" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">\n    <path fill="#003087" d="M 12 4.917 L 4.2 4.917 C 3.7 4.917 3.2 5.317 3.1 5.817 L 0 25.817 C -0.1 26.217 0.2 26.517 0.6 26.517 L 4.3 26.517 C 4.8 26.517 5.3 26.117 5.4 25.617 L 6.2 20.217 C 6.3 19.717 6.7 19.317 7.3 19.317 L 9.8 19.317 C 14.9 19.317 17.9 16.817 18.7 11.917 C 19 9.817 18.7 8.117 17.7 6.917 C 16.6 5.617 14.6 4.917 12 4.917 Z M 12.9 12.217 C 12.5 15.017 10.3 15.017 8.3 15.017 L 7.1 15.017 L 7.9 9.817 C 7.9 9.517 8.2 9.317 8.5 9.317 L 9 9.317 C 10.4 9.317 11.7 9.317 12.4 10.117 C 12.9 10.517 13.1 11.217 12.9 12.217 Z"></path>\n    <path fill="#003087" d="M 35.2 12.117 L 31.5 12.117 C 31.2 12.117 30.9 12.317 30.9 12.617 L 30.7 13.617 L 30.4 13.217 C 29.6 12.017 27.8 11.617 26 11.617 C 21.9 11.617 18.4 14.717 17.7 19.117 C 17.3 21.317 17.8 23.417 19.1 24.817 C 20.2 26.117 21.9 26.717 23.8 26.717 C 27.1 26.717 29 24.617 29 24.617 L 28.8 25.617 C 28.7 26.017 29 26.417 29.4 26.417 L 32.8 26.417 C 33.3 26.417 33.8 26.017 33.9 25.517 L 35.9 12.717 C 36 12.517 35.6 12.117 35.2 12.117 Z M 30.1 19.317 C 29.7 21.417 28.1 22.917 25.9 22.917 C 24.8 22.917 24 22.617 23.4 21.917 C 22.8 21.217 22.6 20.317 22.8 19.317 C 23.1 17.217 24.9 15.717 27 15.717 C 28.1 15.717 28.9 16.117 29.5 16.717 C 30 17.417 30.2 18.317 30.1 19.317 Z"></path>\n    <path fill="#003087" d="M 55.1 12.117 L 51.4 12.117 C 51 12.117 50.7 12.317 50.5 12.617 L 45.3 20.217 L 43.1 12.917 C 43 12.417 42.5 12.117 42.1 12.117 L 38.4 12.117 C 38 12.117 37.6 12.517 37.8 13.017 L 41.9 25.117 L 38 30.517 C 37.7 30.917 38 31.517 38.5 31.517 L 42.2 31.517 C 42.6 31.517 42.9 31.317 43.1 31.017 L 55.6 13.017 C 55.9 12.717 55.6 12.117 55.1 12.117 Z"></path>\n    <path fill="#009cde" d="M 67.5 4.917 L 59.7 4.917 C 59.2 4.917 58.7 5.317 58.6 5.817 L 55.5 25.717 C 55.4 26.117 55.7 26.417 56.1 26.417 L 60.1 26.417 C 60.5 26.417 60.8 26.117 60.8 25.817 L 61.7 20.117 C 61.8 19.617 62.2 19.217 62.8 19.217 L 65.3 19.217 C 70.4 19.217 73.4 16.717 74.2 11.817 C 74.5 9.717 74.2 8.017 73.2 6.817 C 72 5.617 70.1 4.917 67.5 4.917 Z M 68.4 12.217 C 68 15.017 65.8 15.017 63.8 15.017 L 62.6 15.017 L 63.4 9.817 C 63.4 9.517 63.7 9.317 64 9.317 L 64.5 9.317 C 65.9 9.317 67.2 9.317 67.9 10.117 C 68.4 10.517 68.5 11.217 68.4 12.217 Z"></path>\n    <path fill="#009cde" d="M 90.7 12.117 L 87 12.117 C 86.7 12.117 86.4 12.317 86.4 12.617 L 86.2 13.617 L 85.9 13.217 C 85.1 12.017 83.3 11.617 81.5 11.617 C 77.4 11.617 73.9 14.717 73.2 19.117 C 72.8 21.317 73.3 23.417 74.6 24.817 C 75.7 26.117 77.4 26.717 79.3 26.717 C 82.6 26.717 84.5 24.617 84.5 24.617 L 84.3 25.617 C 84.2 26.017 84.5 26.417 84.9 26.417 L 88.3 26.417 C 88.8 26.417 89.3 26.017 89.4 25.517 L 91.4 12.717 C 91.4 12.517 91.1 12.117 90.7 12.117 Z M 85.5 19.317 C 85.1 21.417 83.5 22.917 81.3 22.917 C 80.2 22.917 79.4 22.617 78.8 21.917 C 78.2 21.217 78 20.317 78.2 19.317 C 78.5 17.217 80.3 15.717 82.4 15.717 C 83.5 15.717 84.3 16.117 84.9 16.717 C 85.5 17.417 85.7 18.317 85.5 19.317 Z"></path>\n    <path fill="#009cde" d="M 95.1 5.417 L 91.9 25.717 C 91.8 26.117 92.1 26.417 92.5 26.417 L 95.7 26.417 C 96.2 26.417 96.7 26.017 96.8 25.517 L 100 5.617 C 100.1 5.217 99.8 4.917 99.4 4.917 L 95.8 4.917 C 95.4 4.917 95.2 5.117 95.1 5.417 Z"></path>\n</svg>\n';
    },
    "./src/resources/fundingLogos/paypal_white.svg": function(module, exports) {
        module.exports = '<svg width="100" height="32" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">\n    <path fill="#ffffff" d="M 12 5.315 L 4.2 5.315 C 3.7 5.315 3.2 5.715 3.1 6.215 L 0 26.215 C -0.1 26.615 0.2 26.915 0.6 26.915 L 4.3 26.915 C 4.8 26.915 5.3 26.515 5.4 26.015 L 6.2 20.615 C 6.3 20.115 6.7 19.715 7.3 19.715 L 9.8 19.715 C 14.9 19.715 17.9 17.215 18.7 12.315 C 19 10.215 18.7 8.515 17.7 7.315 C 16.6 6.015 14.6 5.315 12 5.315 Z M 12.9 12.615 C 12.5 15.415 10.3 15.415 8.3 15.415 L 7.1 15.415 L 7.9 10.215 C 7.9 9.915 8.2 9.715 8.5 9.715 L 9 9.715 C 10.4 9.715 11.7 9.715 12.4 10.515 C 12.9 10.915 13.1 11.615 12.9 12.615 Z"></path>\n    <path fill="#ffffff" d="M 35.2 12.515 L 31.5 12.515 C 31.2 12.515 30.9 12.715 30.9 13.015 L 30.7 14.015 L 30.4 13.615 C 29.6 12.415 27.8 12.015 26 12.015 C 21.9 12.015 18.4 15.115 17.7 19.515 C 17.3 21.715 17.8 23.815 19.1 25.215 C 20.2 26.515 21.9 27.115 23.8 27.115 C 27.1 27.115 29 25.015 29 25.015 L 28.8 26.015 C 28.7 26.415 29 26.815 29.4 26.815 L 32.8 26.815 C 33.3 26.815 33.8 26.415 33.9 25.915 L 35.9 13.115 C 36 12.915 35.6 12.515 35.2 12.515 Z M 30.1 19.815 C 29.7 21.915 28.1 23.415 25.9 23.415 C 24.8 23.415 24 23.115 23.4 22.415 C 22.8 21.715 22.6 20.815 22.8 19.815 C 23.1 17.715 24.9 16.215 27 16.215 C 28.1 16.215 28.9 16.615 29.5 17.215 C 30 17.815 30.2 18.715 30.1 19.815 Z"></path>\n    <path fill="#ffffff" d="M 55.1 12.515 L 51.4 12.515 C 51 12.515 50.7 12.715 50.5 13.015 L 45.3 20.615 L 43.1 13.315 C 43 12.815 42.5 12.515 42.1 12.515 L 38.4 12.515 C 38 12.515 37.6 12.915 37.8 13.415 L 41.9 25.515 L 38 30.915 C 37.7 31.315 38 31.915 38.5 31.915 L 42.2 31.915 C 42.6 31.915 42.9 31.715 43.1 31.415 L 55.6 13.415 C 55.9 13.115 55.6 12.515 55.1 12.515 Z"></path>\n    <path fill="#ffffff" d="M 67.5 5.315 L 59.7 5.315 C 59.2 5.315 58.7 5.715 58.6 6.215 L 55.5 26.115 C 55.4 26.515 55.7 26.815 56.1 26.815 L 60.1 26.815 C 60.5 26.815 60.8 26.515 60.8 26.215 L 61.7 20.515 C 61.8 20.015 62.2 19.615 62.8 19.615 L 65.3 19.615 C 70.4 19.615 73.4 17.115 74.2 12.215 C 74.5 10.115 74.2 8.415 73.2 7.215 C 72 6.015 70.1 5.315 67.5 5.315 Z M 68.4 12.615 C 68 15.415 65.8 15.415 63.8 15.415 L 62.6 15.415 L 63.4 10.215 C 63.4 9.915 63.7 9.715 64 9.715 L 64.5 9.715 C 65.9 9.715 67.2 9.715 67.9 10.515 C 68.4 10.915 68.5 11.615 68.4 12.615 Z"></path>\n    <path fill="#ffffff" d="M 90.7 12.515 L 87 12.515 C 86.7 12.515 86.4 12.715 86.4 13.015 L 86.2 14.015 L 85.9 13.615 C 85.1 12.415 83.3 12.015 81.5 12.015 C 77.4 12.015 73.9 15.115 73.2 19.515 C 72.8 21.715 73.3 23.815 74.6 25.215 C 75.7 26.515 77.4 27.115 79.3 27.115 C 82.6 27.115 84.5 25.015 84.5 25.015 L 84.3 26.015 C 84.2 26.415 84.5 26.815 84.9 26.815 L 88.3 26.815 C 88.8 26.815 89.3 26.415 89.4 25.915 L 91.4 13.115 C 91.4 12.915 91.1 12.515 90.7 12.515 Z M 85.5 19.815 C 85.1 21.915 83.5 23.415 81.3 23.415 C 80.2 23.415 79.4 23.115 78.8 22.415 C 78.2 21.715 78 20.815 78.2 19.815 C 78.5 17.715 80.3 16.215 82.4 16.215 C 83.5 16.215 84.3 16.615 84.9 17.215 C 85.5 17.815 85.7 18.715 85.5 19.815 Z"></path>\n    <path fill="#ffffff" d="M 95.1 5.915 L 91.9 26.215 C 91.8 26.615 92.1 26.915 92.5 26.915 L 95.7 26.915 C 96.2 26.915 96.7 26.515 96.8 26.015 L 100 6.115 C 100.1 5.715 99.8 5.415 99.4 5.415 L 95.8 5.415 C 95.4 5.315 95.2 5.515 95.1 5.915 Z"></path>\n</svg>\n';
    },
    "./src/resources/fundingLogos/pp_black.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="24" height="32" viewBox="0 0 24 32" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path opacity="0.7" d="M 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.548 C 18.361 3.148 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 2.948 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 6.378 28.938 C 6.285 29.238 6.659 29.638 6.94 29.638 L 11.153 29.638 C 11.621 29.638 11.995 29.238 12.089 28.739 L 12.182 28.539 L 12.931 23.341 L 13.025 23.041 C 13.119 22.441 13.493 22.141 13.961 22.141 L 14.616 22.141 C 18.642 22.141 21.731 20.342 22.668 15.443 C 23.042 13.344 22.855 11.545 21.825 10.345 C 21.451 10.046 21.076 9.646 20.702 9.446 L 20.702 9.446" style="fill: rgb(99, 99, 99);"/>\n  <path opacity="0.7" d="M 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.548 C 18.361 3.148 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 2.948 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 7.97 18.342 L 7.876 18.642 C 8.063 18.043 8.438 17.643 9.093 17.643 L 11.433 17.643 C 16.021 17.643 19.578 15.643 20.608 9.946 C 20.608 9.746 20.608 9.546 20.702 9.446"/>\n  <path d="M 9.28 9.446 C 9.28 9.146 9.468 8.846 9.842 8.646 C 9.936 8.646 10.123 8.546 10.216 8.546 L 16.489 8.546 C 17.238 8.546 17.893 8.646 18.548 8.746 C 18.736 8.746 18.829 8.746 19.11 8.846 C 19.204 8.946 19.391 8.946 19.578 9.046 C 19.672 9.046 19.672 9.046 19.859 9.146 C 20.14 9.246 20.421 9.346 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.648 C 18.361 3.248 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 3.048 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 7.97 18.342 L 9.28 9.446 Z" style="fill: rgb(51, 48, 48);"/>\n  <g transform="matrix(0.497737, 0, 0, 0.52612, 1.10144, 0.638654)" opacity="0.2">\n    <path fill="#231f20" d="M39.3 16.7c0.9 0.5 1.7 1.1 2.3 1.8 1 1.1 1.6 2.5 1.9 4.1 0.3-3.2-0.2-5.8-1.9-7.8-0.6-0.7-1.3-1.2-2.1-1.7C39.5 14.2 39.5 15.4 39.3 16.7z"/>\n    <path fill="#231f20" d="M0.4 45.2L6.7 5.6C6.8 4.5 7.8 3.7 8.9 3.7h16c5.5 0 9.8 1.2 12.2 3.9 1.2 1.4 1.9 3 2.2 4.8 0.4-3.6-0.2-6.1-2.2-8.4C34.7 1.2 30.4 0 24.9 0H8.9c-1.1 0-2.1 0.8-2.3 1.9L0 44.1C0 44.5 0.1 44.9 0.4 45.2z"/>\n    <path fill="#231f20" d="M10.7 49.4l-0.1 0.6c-0.1 0.4 0.1 0.8 0.4 1.1l0.3-1.7H10.7z"/>\n  </g>\n</svg>';
    },
    "./src/resources/fundingLogos/pp_blue.svg": function(module, exports) {
        module.exports = '<svg width="24" height="32" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">\n    <path fill="#009cde" d="M 20.905 9.5 C 21.185 7.4 20.905 6 19.782 4.7 C 18.564 3.3 16.411 2.6 13.697 2.6 L 5.739 2.6 C 5.271 2.6 4.71 3.1 4.615 3.6 L 1.339 25.8 C 1.339 26.2 1.62 26.7 2.088 26.7 L 6.956 26.7 L 6.675 28.9 C 6.581 29.3 6.862 29.6 7.236 29.6 L 11.356 29.6 C 11.825 29.6 12.292 29.3 12.386 28.8 L 12.386 28.5 L 13.228 23.3 L 13.228 23.1 C 13.322 22.6 13.79 22.2 14.258 22.2 L 14.821 22.2 C 18.845 22.2 21.935 20.5 22.871 15.5 C 23.339 13.4 23.153 11.7 22.029 10.5 C 21.748 10.1 21.279 9.8 20.905 9.5 L 20.905 9.5"></path>\n    <path fill="#012169" d="M 20.905 9.5 C 21.185 7.4 20.905 6 19.782 4.7 C 18.564 3.3 16.411 2.6 13.697 2.6 L 5.739 2.6 C 5.271 2.6 4.71 3.1 4.615 3.6 L 1.339 25.8 C 1.339 26.2 1.62 26.7 2.088 26.7 L 6.956 26.7 L 8.267 18.4 L 8.173 18.7 C 8.267 18.1 8.735 17.7 9.296 17.7 L 11.636 17.7 C 16.224 17.7 19.782 15.7 20.905 10.1 C 20.812 9.8 20.905 9.7 20.905 9.5"></path>\n    <path fill="#003087" d="M 9.485 9.5 C 9.577 9.2 9.765 8.9 10.046 8.7 C 10.232 8.7 10.326 8.6 10.513 8.6 L 16.692 8.6 C 17.442 8.6 18.189 8.7 18.753 8.8 C 18.939 8.8 19.127 8.8 19.314 8.9 C 19.501 9 19.688 9 19.782 9.1 C 19.875 9.1 19.968 9.1 20.063 9.1 C 20.343 9.2 20.624 9.4 20.905 9.5 C 21.185 7.4 20.905 6 19.782 4.6 C 18.658 3.2 16.506 2.6 13.79 2.6 L 5.739 2.6 C 5.271 2.6 4.71 3 4.615 3.6 L 1.339 25.8 C 1.339 26.2 1.62 26.7 2.088 26.7 L 6.956 26.7 L 8.267 18.4 L 9.485 9.5 Z"></path>\n</svg>\n';
    },
    "./src/resources/fundingLogos/pp_white.svg": function(module, exports) {
        module.exports = '<svg width="24" height="32" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">\n    <path fill="#ffffff" opacity="0.7" d="M 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.548 C 18.361 3.148 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 2.948 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 6.378 28.938 C 6.285 29.238 6.659 29.638 6.94 29.638 L 11.153 29.638 C 11.621 29.638 11.995 29.238 12.089 28.739 L 12.182 28.539 L 12.931 23.341 L 13.025 23.041 C 13.119 22.441 13.493 22.141 13.961 22.141 L 14.616 22.141 C 18.642 22.141 21.731 20.342 22.668 15.443 C 23.042 13.344 22.855 11.545 21.825 10.345 C 21.451 10.046 21.076 9.646 20.702 9.446 L 20.702 9.446"></path>\n    <path fill="#ffffff" opacity="0.7" d="M 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.548 C 18.361 3.148 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 2.948 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 7.97 18.342 L 7.876 18.642 C 8.063 18.043 8.438 17.643 9.093 17.643 L 11.433 17.643 C 16.021 17.643 19.578 15.643 20.608 9.946 C 20.608 9.746 20.608 9.546 20.702 9.446"></path>\n    <path fill="#ffffff" d="M 9.28 9.446 C 9.28 9.146 9.468 8.846 9.842 8.646 C 9.936 8.646 10.123 8.546 10.216 8.546 L 16.489 8.546 C 17.238 8.546 17.893 8.646 18.548 8.746 C 18.736 8.746 18.829 8.746 19.11 8.846 C 19.204 8.946 19.391 8.946 19.578 9.046 C 19.672 9.046 19.672 9.046 19.859 9.146 C 20.14 9.246 20.421 9.346 20.702 9.446 C 20.982 7.347 20.702 5.947 19.578 4.648 C 18.361 3.248 16.208 2.548 13.493 2.548 L 5.536 2.548 C 4.974 2.548 4.506 3.048 4.412 3.548 L 1.136 25.74 C 1.042 26.239 1.323 26.639 1.791 26.639 L 6.753 26.639 L 7.97 18.342 L 9.28 9.446 Z"></path>\n    <g transform="matrix(0.497737, 0, 0, 0.52612, 1.10144, 0.638654)" opacity="0.2">\n        <path fill="#231f20" d="M39.3 16.7c0.9 0.5 1.7 1.1 2.3 1.8 1 1.1 1.6 2.5 1.9 4.1 0.3-3.2-0.2-5.8-1.9-7.8-0.6-0.7-1.3-1.2-2.1-1.7C39.5 14.2 39.5 15.4 39.3 16.7z"></path>\n        <path fill="#231f20" d="M0.4 45.2L6.7 5.6C6.8 4.5 7.8 3.7 8.9 3.7h16c5.5 0 9.8 1.2 12.2 3.9 1.2 1.4 1.9 3 2.2 4.8 0.4-3.6-0.2-6.1-2.2-8.4C34.7 1.2 30.4 0 24.9 0H8.9c-1.1 0-2.1 0.8-2.3 1.9L0 44.1C0 44.5 0.1 44.9 0.4 45.2z"></path>\n        <path fill="#231f20" d="M10.7 49.4l-0.1 0.6c-0.1 0.4 0.1 0.8 0.4 1.1l0.3-1.7H10.7z"></path>\n    </g>\n</svg>\n';
    },
    "./src/resources/fundingLogos/venmo_blue.svg": function(module, exports) {
        module.exports = '<svg width="101" height="32" viewBox="0 0 101 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">\n    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="Blue" fill="#3D93CE">\n            <g id="Logo" transform="translate(0.000000, 6.000000)">\n                <path d="M16.6660484,0.18 C17.3466626,1.3390991 17.6535069,2.53297297 17.6535069,4.04108108 C17.6535069,8.85117117 13.671346,15.0998198 10.439346,19.4875676 L3.05725952,19.4875676 L0.0966314879,1.23315315 L6.56045675,0.60036036 L8.12578201,13.5895495 C9.58835986,11.1326126 11.3932543,7.27153153 11.3932543,4.6390991 C11.3932543,3.1981982 11.1538599,2.21675676 10.7797405,1.40864865 L16.6660484,0.18 Z M24.9071592,11.6938739 C24.9071592,13.8367568 26.062718,14.6774775 27.5946678,14.6774775 C29.2629152,14.6774775 30.860218,14.2571171 32.9363097,13.1691892 L32.154346,18.6445045 C30.6915934,19.3814414 28.4119291,19.8731532 26.1991903,19.8731532 C20.5863512,19.8731532 18.5775346,16.3632432 18.5775346,11.9753153 C18.5775346,6.28810811 21.8451817,0.249369369 28.5819516,0.249369369 C32.2909931,0.249369369 34.3649879,2.39207207 34.3649879,5.37567568 C34.3653374,10.1855856 28.3783789,11.6590991 24.9071592,11.6938739 Z M25.0434567,8.2181982 C26.2329152,8.2181982 29.2274429,7.65711712 29.2274429,5.90216216 C29.2274429,5.05945946 28.6495761,4.6390991 27.9686125,4.6390991 C26.7772318,4.6390991 25.2138287,6.11225225 25.0434567,8.2181982 Z M53.0187093,4.4636036 C53.0187093,5.16558559 52.9154377,6.18378378 52.8126903,6.84918919 L50.8730709,19.4873874 L44.5790934,19.4873874 L46.3483408,7.90216216 C46.381891,7.58792793 46.4849879,6.95531532 46.4849879,6.60432432 C46.4849879,5.76162162 45.9743962,5.55135135 45.3605329,5.55135135 C44.5451938,5.55135135 43.7279325,5.93711712 43.1836159,6.21873874 L41.1768962,19.4875676 L34.8474464,19.4875676 L37.7390519,0.565945946 L43.2171661,0.565945946 L43.2865381,2.07621622 C44.5789187,1.19873874 46.2807163,0.24972973 48.6952803,0.24972973 C51.8942543,0.249369369 53.0187093,1.93495495 53.0187093,4.4636036 Z M71.7037093,2.32072072 C73.5063322,0.988108108 75.2084792,0.249369369 77.5554187,0.249369369 C80.7872439,0.249369369 81.9113495,1.93495495 81.9113495,4.4636036 C81.9113495,5.16558559 81.8084273,6.18378378 81.7056799,6.84918919 L79.7683322,19.4873874 L73.4726073,19.4873874 L75.2755796,7.6572973 C75.3087803,7.34108108 75.3785017,6.95531532 75.3785017,6.71063063 C75.3785017,5.7618018 74.8677353,5.55135135 74.2540467,5.55135135 C73.4722578,5.55135135 72.6908183,5.90234234 72.1106799,6.21873874 L70.1043097,19.4875676 L63.8101574,19.4875676 L65.6131298,7.65747748 C65.6463304,7.34126126 65.713955,6.9554955 65.713955,6.71081081 C65.713955,5.76198198 65.2030138,5.55153153 64.5914221,5.55153153 C63.7743356,5.55153153 62.9588218,5.9372973 62.4145052,6.21891892 L60.4062128,19.4877477 L54.0788599,19.4877477 L56.9701159,0.566126126 L62.3813045,0.566126126 L62.551327,2.14576577 C63.8101574,1.1990991 65.5105571,0.25009009 67.7900467,0.25009009 C69.7637405,0.249369369 71.0559464,1.12702703 71.7037093,2.32072072 Z M83.55059,11.7998198 C83.55059,5.83279279 86.6120433,0.249369369 93.6558322,0.249369369 C98.9633997,0.249369369 100.903543,3.47981982 100.903543,7.93873874 C100.903543,13.8365766 97.8751159,19.9443243 90.6614792,19.9443243 C85.3196626,19.9443243 83.55059,16.3281081 83.55059,11.7998198 Z M94.4374464,7.83279279 C94.4374464,6.28810811 94.0628028,5.23495495 92.9409689,5.23495495 C90.4570329,5.23495495 89.9469654,9.76306306 89.9469654,12.0794595 C89.9469654,13.8367568 90.4238322,14.9243243 91.5453166,14.9243243 C93.8931298,14.9243243 94.4374464,10.149009 94.4374464,7.83279279 Z"></path>\n            </g>\n        </g>\n    </g>\n</svg>\n';
    },
    "./src/resources/fundingLogos/venmo_white.svg": function(module, exports) {
        module.exports = '<svg width="101" height="32" viewBox="0 0 101 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">\n    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="White" fill="#FFFFFF">\n            <g id="Logo" transform="translate(0.000000, 6.000000)">\n                <path d="M16.6660484,0.18 C17.3466626,1.3390991 17.6535069,2.53297297 17.6535069,4.04108108 C17.6535069,8.85117117 13.671346,15.0998198 10.439346,19.4875676 L3.05725952,19.4875676 L0.0966314879,1.23315315 L6.56045675,0.60036036 L8.12578201,13.5895495 C9.58835986,11.1326126 11.3932543,7.27153153 11.3932543,4.6390991 C11.3932543,3.1981982 11.1538599,2.21675676 10.7797405,1.40864865 L16.6660484,0.18 Z M24.9071592,11.6938739 C24.9071592,13.8367568 26.062718,14.6774775 27.5946678,14.6774775 C29.2629152,14.6774775 30.860218,14.2571171 32.9363097,13.1691892 L32.154346,18.6445045 C30.6915934,19.3814414 28.4119291,19.8731532 26.1991903,19.8731532 C20.5863512,19.8731532 18.5775346,16.3632432 18.5775346,11.9753153 C18.5775346,6.28810811 21.8451817,0.249369369 28.5819516,0.249369369 C32.2909931,0.249369369 34.3649879,2.39207207 34.3649879,5.37567568 C34.3653374,10.1855856 28.3783789,11.6590991 24.9071592,11.6938739 Z M25.0434567,8.2181982 C26.2329152,8.2181982 29.2274429,7.65711712 29.2274429,5.90216216 C29.2274429,5.05945946 28.6495761,4.6390991 27.9686125,4.6390991 C26.7772318,4.6390991 25.2138287,6.11225225 25.0434567,8.2181982 Z M53.0187093,4.4636036 C53.0187093,5.16558559 52.9154377,6.18378378 52.8126903,6.84918919 L50.8730709,19.4873874 L44.5790934,19.4873874 L46.3483408,7.90216216 C46.381891,7.58792793 46.4849879,6.95531532 46.4849879,6.60432432 C46.4849879,5.76162162 45.9743962,5.55135135 45.3605329,5.55135135 C44.5451938,5.55135135 43.7279325,5.93711712 43.1836159,6.21873874 L41.1768962,19.4875676 L34.8474464,19.4875676 L37.7390519,0.565945946 L43.2171661,0.565945946 L43.2865381,2.07621622 C44.5789187,1.19873874 46.2807163,0.24972973 48.6952803,0.24972973 C51.8942543,0.249369369 53.0187093,1.93495495 53.0187093,4.4636036 Z M71.7037093,2.32072072 C73.5063322,0.988108108 75.2084792,0.249369369 77.5554187,0.249369369 C80.7872439,0.249369369 81.9113495,1.93495495 81.9113495,4.4636036 C81.9113495,5.16558559 81.8084273,6.18378378 81.7056799,6.84918919 L79.7683322,19.4873874 L73.4726073,19.4873874 L75.2755796,7.6572973 C75.3087803,7.34108108 75.3785017,6.95531532 75.3785017,6.71063063 C75.3785017,5.7618018 74.8677353,5.55135135 74.2540467,5.55135135 C73.4722578,5.55135135 72.6908183,5.90234234 72.1106799,6.21873874 L70.1043097,19.4875676 L63.8101574,19.4875676 L65.6131298,7.65747748 C65.6463304,7.34126126 65.713955,6.9554955 65.713955,6.71081081 C65.713955,5.76198198 65.2030138,5.55153153 64.5914221,5.55153153 C63.7743356,5.55153153 62.9588218,5.9372973 62.4145052,6.21891892 L60.4062128,19.4877477 L54.0788599,19.4877477 L56.9701159,0.566126126 L62.3813045,0.566126126 L62.551327,2.14576577 C63.8101574,1.1990991 65.5105571,0.25009009 67.7900467,0.25009009 C69.7637405,0.249369369 71.0559464,1.12702703 71.7037093,2.32072072 Z M83.55059,11.7998198 C83.55059,5.83279279 86.6120433,0.249369369 93.6558322,0.249369369 C98.9633997,0.249369369 100.903543,3.47981982 100.903543,7.93873874 C100.903543,13.8365766 97.8751159,19.9443243 90.6614792,19.9443243 C85.3196626,19.9443243 83.55059,16.3281081 83.55059,11.7998198 Z M94.4374464,7.83279279 C94.4374464,6.28810811 94.0628028,5.23495495 92.9409689,5.23495495 C90.4570329,5.23495495 89.9469654,9.76306306 89.9469654,12.0794595 C89.9469654,13.8367568 90.4238322,14.9243243 91.5453166,14.9243243 C93.8931298,14.9243243 94.4374464,10.149009 94.4374464,7.83279279 Z"></path>\n            </g>\n        </g>\n    </g>\n</svg>\n';
    },
    0: function(module, exports, __webpack_require__) {
        __webpack_require__("./node_modules/zalgo-promise/src/index.js");
        module.exports = __webpack_require__("./src/button/template/componentTemplate.jsx");
    }
}));
//# sourceMappingURL=checkout.button.render.js.map