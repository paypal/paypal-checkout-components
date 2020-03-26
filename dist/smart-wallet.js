/*! For license information please see smart-wallet.js.LICENSE.txt */
!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("spb", [], factory) : "object" == typeof exports ? exports.spb = factory() : root.spb = factory();
}("undefined" != typeof self ? self : this, (function() {
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
                enumerable: !0,
                get: getter
            });
        };
        __webpack_require__.r = function(exports) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
        };
        __webpack_require__.t = function(value, mode) {
            1 & mode && (value = __webpack_require__(value));
            if (8 & mode) return value;
            if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
            var ns = Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", {
                enumerable: !0,
                value: value
            });
            if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
                return value[key];
            }.bind(null, key));
            return ns;
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
            return {}.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 10);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = function(useSourceMap) {
            var list = [];
            list.toString = function() {
                return this.map((function(item) {
                    var content = function(item, useSourceMap) {
                        var content = item[1] || "";
                        var cssMapping = item[3];
                        if (!cssMapping) return content;
                        if (useSourceMap && "function" == typeof btoa) {
                            var sourceMapping = (base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping)))), 
                            data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64), 
                            "/*# ".concat(data, " */"));
                            var sourceURLs = cssMapping.sources.map((function(source) {
                                return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
                            }));
                            return [ content ].concat(sourceURLs).concat([ sourceMapping ]).join("\n");
                        }
                        var base64, data;
                        return [ content ].join("\n");
                    }(item, useSourceMap);
                    return item[2] ? "@media ".concat(item[2], " {").concat(content, "}") : content;
                })).join("");
            };
            list.i = function(modules, mediaQuery, dedupe) {
                "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
                var alreadyImportedModules = {};
                if (dedupe) for (var i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    null != id && (alreadyImportedModules[id] = !0);
                }
                for (var _i = 0; _i < modules.length; _i++) {
                    var item = [].concat(modules[_i]);
                    if (!dedupe || !alreadyImportedModules[item[0]]) {
                        mediaQuery && (item[2] = item[2] ? "".concat(mediaQuery, " and ").concat(item[2]) : mediaQuery);
                        list.push(item);
                    }
                }
            };
            return list;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var inserted = {};
        function removeCss(ids) {
            ids.forEach((function(id) {
                if (--inserted[id] <= 0) {
                    var elem = document.getElementById(id);
                    elem && elem.parentNode.removeChild(elem);
                }
            }));
        }
        module.exports = function(styles, _temp) {
            var _ref = void 0 === _temp ? {} : _temp, _ref$replace = _ref.replace, replace = void 0 !== _ref$replace && _ref$replace, _ref$prepend = _ref.prepend, prepend = void 0 !== _ref$prepend && _ref$prepend, _ref$prefix = _ref.prefix, prefix = void 0 === _ref$prefix ? "s" : _ref$prefix;
            var ids = [];
            for (var i = 0; i < styles.length; i++) {
                var _styles$i = styles[i], css = _styles$i[1], media = _styles$i[2], sourceMap = _styles$i[3];
                var id = "" + prefix + _styles$i[0] + "-" + i;
                ids.push(id);
                if (!inserted[id] || replace) {
                    inserted[id] = 1;
                    var elem = document.getElementById(id);
                    var create = !1;
                    if (!elem) {
                        create = !0;
                        (elem = document.createElement("style")).setAttribute("type", "text/css");
                        elem.id = id;
                        media && elem.setAttribute("media", media);
                    }
                    var cssText = css;
                    if (sourceMap && "function" == typeof btoa) {
                        cssText += "\n/*# sourceMappingURL=data:application/json;base64," + (str = JSON.stringify(sourceMap), 
                        btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(match, p1) {
                            return String.fromCharCode("0x" + p1);
                        })))) + "*/";
                        cssText += "\n/*# sourceURL=" + sourceMap.file + "?" + id + "*/";
                    }
                    "textContent" in elem ? elem.textContent = cssText : elem.styleSheet.cssText = cssText;
                    create && (prepend ? document.head.insertBefore(elem, document.head.childNodes[0]) : document.head.appendChild(elem));
                } else inserted[id]++;
            }
            var str;
            return removeCss.bind(null, ids);
        };
    }, function(module, exports, __webpack_require__) {
        var css = __webpack_require__(6);
        var insertCss = __webpack_require__(1);
        var content = "string" == typeof css ? [ [ module.i, css, "" ] ] : css;
        (exports = module.exports = css.locals || {})._getContent = function() {
            return content;
        };
        exports._getCss = function() {
            return "" + css;
        };
        exports._insertCss = function(options) {
            return insertCss(content, options);
        };
    }, function(module, exports, __webpack_require__) {
        var css = __webpack_require__(7);
        var insertCss = __webpack_require__(1);
        var content = "string" == typeof css ? [ [ module.i, css, "" ] ] : css;
        (exports = module.exports = css.locals || {})._getContent = function() {
            return content;
        };
        exports._getCss = function() {
            return "" + css;
        };
        exports._insertCss = function(options) {
            return insertCss(content, options);
        };
    }, function(module, exports, __webpack_require__) {
        var css = __webpack_require__(8);
        var insertCss = __webpack_require__(1);
        var content = "string" == typeof css ? [ [ module.i, css, "" ] ] : css;
        (exports = module.exports = css.locals || {})._getContent = function() {
            return content;
        };
        exports._getCss = function() {
            return "" + css;
        };
        exports._insertCss = function(options) {
            return insertCss(content, options);
        };
    }, function(module, exports, __webpack_require__) {
        var css = __webpack_require__(9);
        var insertCss = __webpack_require__(1);
        var content = "string" == typeof css ? [ [ module.i, css, "" ] ] : css;
        (exports = module.exports = css.locals || {})._getContent = function() {
            return content;
        };
        exports._getCss = function() {
            return "" + css;
        };
        exports._insertCss = function(options) {
            return insertCss(content, options);
        };
    }, function(module, exports, __webpack_require__) {
        (exports = __webpack_require__(0)(!1)).push([ module.i, ".wallet-item[data-v-fdd787a1]{cursor:pointer;width:100%;display:flex;justify-content:flex-start;align-items:center;padding:0 20px;box-sizing:border-box;transition:background-color 0.3s ease-in-out;height:60px}@media only screen and (max-width: 600px){.wallet-item[data-v-fdd787a1]{height:50px}}.wallet-item .icon[data-v-fdd787a1]{display:inline-block;vertical-align:top;text-align:center;width:50px;margin-right:20px}.wallet-item .icon img[data-v-fdd787a1]{max-height:90%;max-width:90%}.wallet-item .description[data-v-fdd787a1]{display:inline-block;vertical-align:top}.wallet-item .description .name[data-v-fdd787a1]{font-size:16px;margin-bottom:5px}@media only screen and (max-width: 600px){.wallet-item .description .name[data-v-fdd787a1]{font-size:13px}}.wallet-item .description .details[data-v-fdd787a1]{color:#6c7378;font-size:14px}@media only screen and (max-width: 600px){.wallet-item .description .details[data-v-fdd787a1]{font-size:12px}}.wallet-item .preferred[data-v-fdd787a1]{background-color:#eaf7e9;color:#2d542b;font-size:10px;padding:2px 5px;border-radius:3px;margin:0 5px}.wallet-item[data-v-fdd787a1]:hover{background-color:#eee}\n", "" ]);
        module.exports = exports;
    }, function(module, exports, __webpack_require__) {
        (exports = __webpack_require__(0)(!1)).push([ module.i, "", "" ]);
        module.exports = exports;
    }, function(module, exports, __webpack_require__) {
        (exports = __webpack_require__(0)(!1)).push([ module.i, ".add-card-button[data-v-d2ff3bcf]{padding:20px}.add-card-button a[data-v-d2ff3bcf]{color:#007ab7;font-weight:400;font-size:16px;text-decoration:none}.add-card-button a[data-v-d2ff3bcf]:hover{text-decoration:underline}\n", "" ]);
        module.exports = exports;
    }, function(module, exports, __webpack_require__) {
        (exports = __webpack_require__(0)(!1)).push([ module.i, "html,body{margin:0;width:100%;overflow:hidden;font-family:Helvetica Neue, HelveticaNeue, HelveticaNeue-Light, Helvetica Neue Light, helvetica, arial, sans-serif}*{box-sizing:border-box}.flex-spacer{flex:1}\n", "" ]);
        module.exports = exports;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "setupWallet", (function() {
            return setupWallet;
        }));
        __webpack_require__.d(__webpack_exports__, "renderWallet", (function() {
            return renderWallet;
        }));
        var preact_module_n, preact_module_u, preact_module_i, preact_module_t, preact_module_o, preact_module_r, preact_module_f, e = {}, c = [], s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
        function a(n, l) {
            for (var u in l) n[u] = l[u];
            return n;
        }
        function v(n) {
            var l = n.parentNode;
            l && l.removeChild(n);
        }
        function preact_module_h(n, l, u) {
            var i, t = arguments, o = {};
            for (i in l) "key" !== i && "ref" !== i && (o[i] = l[i]);
            if (arguments.length > 3) for (u = [ u ], i = 3; i < arguments.length; i++) u.push(t[i]);
            if (null != u && (o.children = u), "function" == typeof n && null != n.defaultProps) for (i in n.defaultProps) void 0 === o[i] && (o[i] = n.defaultProps[i]);
            return p(n, o, l && l.key, l && l.ref);
        }
        function p(l, u, i, t) {
            var o = {
                type: l,
                props: u,
                key: i,
                ref: t,
                __k: null,
                __: null,
                __b: 0,
                __e: null,
                __d: void 0,
                __c: null,
                constructor: void 0
            };
            return preact_module_n.vnode && preact_module_n.vnode(o), o;
        }
        function preact_module_d(n) {
            return n.children;
        }
        function preact_module_m(n, l) {
            this.props = n, this.context = l;
        }
        function preact_module_w(n, l) {
            if (null == l) return n.__ ? preact_module_w(n.__, n.__.__k.indexOf(n) + 1) : null;
            for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
            return "function" == typeof n.type ? preact_module_w(n) : null;
        }
        function g(n) {
            var l, u;
            if (null != (n = n.__) && null != n.__c) {
                for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
                    n.__e = n.__c.base = u.__e;
                    break;
                }
                return g(n);
            }
        }
        function preact_module_k(l) {
            (!l.__d && (l.__d = !0) && preact_module_u.push(l) && !preact_module_i++ || preact_module_o !== preact_module_n.debounceRendering) && ((preact_module_o = preact_module_n.debounceRendering) || preact_module_t)(preact_module_);
        }
        function preact_module_() {
            for (var n; preact_module_i = preact_module_u.length; ) n = preact_module_u.sort((function(n, l) {
                return n.__v.__b - l.__v.__b;
            })), preact_module_u = [], n.some((function(n) {
                var l, u, i, t, o, r;
                n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], i = preact_module_A(r, t, a({}, t), l.__n, void 0 !== r.ownerSVGElement, null, u, null == o ? preact_module_w(t) : o), 
                preact_module_T(u, t), i != o && g(t)));
            }));
        }
        function preact_module_b(n, l, u, i, t, o, r, f, s) {
            var a, h, p, y, d, m, g, k = u && u.__k || c, _ = k.length;
            if (f == e && (f = null != o ? o[0] : _ ? preact_module_w(u, 0) : null), a = 0, 
            l.__k = preact_module_x(l.__k, (function(u) {
                if (null != u) {
                    if (u.__ = l, u.__b = l.__b + 1, null === (p = k[a]) || p && u.key == p.key && u.type === p.type) k[a] = void 0; else for (h = 0; h < _; h++) {
                        if ((p = k[h]) && u.key == p.key && u.type === p.type) {
                            k[h] = void 0;
                            break;
                        }
                        p = null;
                    }
                    if (y = preact_module_A(n, u, p = p || e, i, t, o, r, f, s), (h = u.ref) && p.ref != h && (g || (g = []), 
                    p.ref && g.push(p.ref, null, u), g.push(h, u.__c || y, u)), null != y) {
                        var c;
                        if (null == m && (m = y), void 0 !== u.__d) c = u.__d, u.__d = void 0; else if (o == p || y != f || null == y.parentNode) {
                            n: if (null == f || f.parentNode !== n) n.appendChild(y), c = null; else {
                                for (d = f, h = 0; (d = d.nextSibling) && h < _; h += 2) if (d == y) break n;
                                n.insertBefore(y, f), c = f;
                            }
                            "option" == l.type && (n.value = "");
                        }
                        f = void 0 !== c ? c : y.nextSibling, "function" == typeof l.type && (l.__d = f);
                    } else f && p.__e == f && f.parentNode != n && (f = preact_module_w(p));
                }
                return a++, u;
            })), l.__e = m, null != o && "function" != typeof l.type) for (a = o.length; a--; ) null != o[a] && v(o[a]);
            for (a = _; a--; ) null != k[a] && preact_module_D(k[a], k[a]);
            if (g) for (a = 0; a < g.length; a++) preact_module_j(g[a], g[++a], g[++a]);
        }
        function preact_module_x(n, l, u) {
            if (null == u && (u = []), null == n || "boolean" == typeof n) l && u.push(l(null)); else if (Array.isArray(n)) for (var i = 0; i < n.length; i++) preact_module_x(n[i], l, u); else u.push(l ? l("string" == typeof n || "number" == typeof n ? p(null, n, null, null) : null != n.__e || null != n.__c ? p(n.type, n.props, n.key, null) : n) : n);
            return u;
        }
        function preact_module_C(n, l, u) {
            "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === s.test(l) ? u + "px" : null == u ? "" : u;
        }
        function preact_module_N(n, l, u, i, t) {
            var o, r, f, e, c;
            if (t ? "className" === l && (l = "class") : "class" === l && (l = "className"), 
            "key" === l || "children" === l) ; else if ("style" === l) if (o = n.style, "string" == typeof u) o.cssText = u; else {
                if ("string" == typeof i && (o.cssText = "", i = null), i) for (r in i) u && r in u || preact_module_C(o, r, "");
                if (u) for (f in u) i && u[f] === i[f] || preact_module_C(o, f, u[f]);
            } else "o" === l[0] && "n" === l[1] ? (e = l !== (l = l.replace(/Capture$/, "")), 
            c = l.toLowerCase(), l = (c in n ? c : l).slice(2), u ? (i || n.addEventListener(l, preact_module_z, e), 
            (n.l || (n.l = {}))[l] = u) : n.removeEventListener(l, preact_module_z, e)) : "list" !== l && "tagName" !== l && "form" !== l && "type" !== l && "size" !== l && !t && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u && !/^ar/.test(l) ? n.removeAttribute(l) : n.setAttribute(l, u));
        }
        function preact_module_z(l) {
            this.l[l.type](preact_module_n.event ? preact_module_n.event(l) : l);
        }
        function preact_module_A(l, u, i, t, o, r, f, e, c) {
            var s, v, h, p, y, w, g, k, _, x, P = u.type;
            if (void 0 !== u.constructor) return null;
            (s = preact_module_n.__b) && s(u);
            try {
                n: if ("function" == typeof P) {
                    if (k = u.props, _ = (s = P.contextType) && t[s.__c], x = s ? _ ? _.props.value : s.__ : t, 
                    i.__c ? g = (v = u.__c = i.__c).__ = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(k, x) : (u.__c = v = new preact_module_m(k, x), 
                    v.constructor = P, v.render = preact_module_E), _ && _.sub(v), v.props = k, v.state || (v.state = {}), 
                    v.context = x, v.__n = t, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), 
                    null != P.getDerivedStateFromProps && (v.__s == v.state && (v.__s = a({}, v.__s)), 
                    a(v.__s, P.getDerivedStateFromProps(k, v.__s))), p = v.props, y = v.state, h) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), 
                    null != v.componentDidMount && v.__h.push(v.componentDidMount); else {
                        if (null == P.getDerivedStateFromProps && k !== p && null != v.componentWillReceiveProps && v.componentWillReceiveProps(k, x), 
                        !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(k, v.__s, x)) {
                            for (v.props = k, v.state = v.__s, v.__d = !1, v.__v = u, u.__e = i.__e, u.__k = i.__k, 
                            v.__h.length && f.push(v), s = 0; s < u.__k.length; s++) u.__k[s] && (u.__k[s].__ = u);
                            break n;
                        }
                        null != v.componentWillUpdate && v.componentWillUpdate(k, v.__s, x), null != v.componentDidUpdate && v.__h.push((function() {
                            v.componentDidUpdate(p, y, w);
                        }));
                    }
                    v.context = x, v.props = k, v.state = v.__s, (s = preact_module_n.__r) && s(u), 
                    v.__d = !1, v.__v = u, v.__P = l, s = v.render(v.props, v.state, v.context), u.__k = null != s && s.type == preact_module_d && null == s.key ? s.props.children : Array.isArray(s) ? s : [ s ], 
                    null != v.getChildContext && (t = a(a({}, t), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (w = v.getSnapshotBeforeUpdate(p, y)), 
                    preact_module_b(l, u, i, t, o, r, f, e, c), v.base = u.__e, v.__h.length && f.push(v), 
                    g && (v.__E = v.__ = null), v.__e = !1;
                } else u.__e = preact_module_$(i.__e, u, i, t, o, r, f, c);
                (s = preact_module_n.diffed) && s(u);
            } catch (l) {
                preact_module_n.__e(l, u, i);
            }
            return u.__e;
        }
        function preact_module_T(l, u) {
            preact_module_n.__c && preact_module_n.__c(u, l), l.some((function(u) {
                try {
                    l = u.__h, u.__h = [], l.some((function(n) {
                        n.call(u);
                    }));
                } catch (l) {
                    preact_module_n.__e(l, u.__v);
                }
            }));
        }
        function preact_module_$(n, l, u, i, t, o, r, f) {
            var s, a, v, h, p, y = u.props, d = l.props;
            if (t = "svg" === l.type || t, null != o) for (s = 0; s < o.length; s++) if (null != (a = o[s]) && ((null === l.type ? 3 === a.nodeType : a.localName === l.type) || n == a)) {
                n = a, o[s] = null;
                break;
            }
            if (null == n) {
                if (null === l.type) return document.createTextNode(d);
                n = t ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type, d.is && {
                    is: d.is
                }), o = null;
            }
            if (null === l.type) y !== d && n.data != d && (n.data = d); else if (l !== u) {
                if (null != o && (o = c.slice.call(n.childNodes)), v = (y = u.props || e).dangerouslySetInnerHTML, 
                h = d.dangerouslySetInnerHTML, !f) {
                    if (y === e) for (y = {}, p = 0; p < n.attributes.length; p++) y[n.attributes[p].name] = n.attributes[p].value;
                    (h || v) && (h && v && h.__html == v.__html || (n.innerHTML = h && h.__html || ""));
                }
                (function(n, l, u, i, t) {
                    var o;
                    for (o in u) o in l || preact_module_N(n, o, null, u[o], i);
                    for (o in l) t && "function" != typeof l[o] || "value" === o || "checked" === o || u[o] === l[o] || preact_module_N(n, o, l[o], u[o], i);
                })(n, d, y, t, f), l.__k = l.props.children, h || preact_module_b(n, l, u, i, "foreignObject" !== l.type && t, o, r, e, f), 
                f || ("value" in d && void 0 !== d.value && d.value !== n.value && (n.value = null == d.value ? "" : d.value), 
                "checked" in d && void 0 !== d.checked && d.checked !== n.checked && (n.checked = d.checked));
            }
            return n;
        }
        function preact_module_j(l, u, i) {
            try {
                "function" == typeof l ? l(u) : l.current = u;
            } catch (l) {
                preact_module_n.__e(l, i);
            }
        }
        function preact_module_D(l, u, i) {
            var t, o, r;
            if (preact_module_n.unmount && preact_module_n.unmount(l), (t = l.ref) && (t.current && t.current !== l.__e || preact_module_j(t, null, u)), 
            i || "function" == typeof l.type || (i = null != (o = l.__e)), l.__e = l.__d = void 0, 
            null != (t = l.__c)) {
                if (t.componentWillUnmount) try {
                    t.componentWillUnmount();
                } catch (l) {
                    preact_module_n.__e(l, u);
                }
                t.base = t.__P = null;
            }
            if (t = l.__k) for (r = 0; r < t.length; r++) t[r] && preact_module_D(t[r], u, i);
            null != o && v(o);
        }
        function preact_module_E(n, l, u) {
            return this.constructor(n, u);
        }
        preact_module_n = {
            __e: function(n, l) {
                for (var u, i; l = l.__; ) if ((u = l.__c) && !u.__) try {
                    if (u.constructor && null != u.constructor.getDerivedStateFromError && (i = !0, 
                    u.setState(u.constructor.getDerivedStateFromError(n))), null != u.componentDidCatch && (i = !0, 
                    u.componentDidCatch(n)), i) return preact_module_k(u.__E = u);
                } catch (l) {
                    n = l;
                }
                throw n;
            }
        }, preact_module_m.prototype.setState = function(n, l) {
            var u;
            u = this.__s !== this.state ? this.__s : this.__s = a({}, this.state), "function" == typeof n && (n = n(u, this.props)), 
            n && a(u, n), null != n && this.__v && (l && this.__h.push(l), preact_module_k(this));
        }, preact_module_m.prototype.forceUpdate = function(n) {
            this.__v && (this.__e = !0, n && this.__h.push(n), preact_module_k(this));
        }, preact_module_m.prototype.render = preact_module_d, preact_module_u = [], preact_module_i = 0, 
        preact_module_t = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
        preact_module_r = e, preact_module_f = 0;
        var index_module_n = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i, index_module_o = function(e) {
            return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        }, index_module_a = function(e, t) {
            return String(e).replace(/(\n+)/g, "$1" + (t || "\t"));
        }, index_module_i = function(e, t, r) {
            return String(e).length > (t || 40) || !r && -1 !== String(e).indexOf("\n") || -1 !== String(e).indexOf("<");
        }, index_module_l = {};
        function index_module_s(e) {
            var t = "";
            for (var r in e) {
                var o = e[r];
                null != o && (t && (t += " "), t += index_module_l[r] || (index_module_l[r] = r.replace(/([A-Z])/g, "-$1").toLowerCase()), 
                t += ": ", t += o, "number" == typeof o && !1 === index_module_n.test(r) && (t += "px"), 
                t += ";");
            }
            return t || void 0;
        }
        function index_module_p(e, t) {
            for (var r in t) e[r] = t[r];
            return e;
        }
        function index_module_c(e, t) {
            return Array.isArray(t) ? t.reduce(index_module_c, e) : null != t && !1 !== t && e.push(t), 
            e;
        }
        var index_module_f = {
            shallow: !0
        }, index_module_u = [], index_module_g = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
        index_module_v.render = index_module_v;
        function index_module_v(n, l, f, _, h, d) {
            if (null == n || "boolean" == typeof n) return "";
            Array.isArray(n) && (n = preact_module_h(preact_module_d, null, n));
            var m = n.type, x = n.props, y = !1;
            l = l || {};
            var b, S = (f = f || {}).pretty, w = S && "string" == typeof S ? S : "\t";
            if ("object" != typeof n && !m) return index_module_o(n);
            if ("function" == typeof m) {
                if (y = !0, !f.shallow || !_ && !1 !== f.renderRootComponent) {
                    if (m === preact_module_d) {
                        var k = "", O = [];
                        index_module_c(O, n.props.children);
                        for (var C = 0; C < O.length; C++) k += (C > 0 && S ? "\n" : "") + index_module_v(O[C], l, f, !1 !== f.shallowHighOrder, h, d);
                        return k;
                    }
                    var A, H = n.__c = {
                        __v: n,
                        context: l,
                        props: n.props,
                        __h: []
                    };
                    if (preact_module_n.__r && preact_module_n.__r(n), m.prototype && "function" == typeof m.prototype.render) {
                        var j = m.contextType, $ = j && l[j.__c], F = null != j ? $ ? $.props.value : j.__ : l;
                        (H = n.__c = new m(x, F)).__v = n, H._dirty = H.__d = !0, H.props = x, null == H.state && (H.state = {}), 
                        null == H._nextState && null == H.__s && (H._nextState = H.__s = H.state), H.context = F, 
                        m.getDerivedStateFromProps ? H.state = index_module_p(index_module_p({}, H.state), m.getDerivedStateFromProps(H.props, H.state)) : H.componentWillMount && H.componentWillMount(), 
                        H.state = H._nextState !== H.state ? H._nextState : H.__s !== H.state ? H.__s : H.state, 
                        A = H.render(H.props, H.state, H.context);
                    } else {
                        var L = m.contextType, M = L && l[L.__c];
                        A = m.call(n.__c, x, null != L ? M ? M.props.value : L.__ : l);
                    }
                    return H.getChildContext && (l = index_module_p(index_module_p({}, l), H.getChildContext())), 
                    index_module_v(A, l, f, !1 !== f.shallowHighOrder, h, d);
                }
                m = (b = m).displayName || b !== Function && b.name || function(e) {
                    var t = (function() {}.toString.call(e).match(/^\s*function\s+([^( ]+)/) || "")[1];
                    if (!t) {
                        for (var r = -1, n = index_module_u.length; n--; ) if (index_module_u[n] === e) {
                            r = n;
                            break;
                        }
                        r < 0 && (r = index_module_u.push(e) - 1), t = "UnnamedComponent" + r;
                    }
                    return t;
                }(b);
            }
            var T, D = "";
            if (x) {
                var N = Object.keys(x);
                f && !0 === f.sortAttributes && N.sort();
                for (var P = 0; P < N.length; P++) {
                    var R = N[P], W = x[R];
                    if ("children" !== R && !R.match(/[\s\n\\/='"\0<>]/) && (f && f.allAttributes || "key" !== R && "ref" !== R)) {
                        if ("className" === R) {
                            if (x.class) continue;
                            R = "class";
                        } else h && R.match(/^xlink:?./) && (R = R.toLowerCase().replace(/^xlink:?/, "xlink:"));
                        "style" === R && W && "object" == typeof W && (W = index_module_s(W));
                        var q = f.attributeHook && f.attributeHook(R, W, l, f, y);
                        if (q || "" === q) D += q; else if ("dangerouslySetInnerHTML" === R) T = W && W.__html; else if ((W || 0 === W || "" === W) && "function" != typeof W) {
                            if (!(!0 !== W && "" !== W || (W = R, f && f.xml))) {
                                D += " " + R;
                                continue;
                            }
                            if ("value" === R) {
                                if ("select" === m) {
                                    d = W;
                                    continue;
                                }
                                "option" === m && d == W && (D += " selected");
                            }
                            D += " " + R + '="' + index_module_o(W) + '"';
                        }
                    }
                }
            }
            if (S) {
                var z = D.replace(/^\n\s*/, " ");
                z === D || ~z.indexOf("\n") ? S && ~D.indexOf("\n") && (D += "\n") : D = z;
            }
            if (D = "<" + m + D + ">", String(m).match(/[\s\n\\/='"\0<>]/)) throw new Error(m + " is not a valid HTML tag name in " + D);
            var E = String(m).match(index_module_g);
            E && (D = D.replace(/>$/, " />"));
            var I, U = [];
            if (T) S && index_module_i(T) && (T = "\n" + w + index_module_a(T, w)), D += T; else if (x && index_module_c(I = [], x.children).length) {
                for (var Z = S && ~D.indexOf("\n"), B = !1, G = 0; G < I.length; G++) {
                    var J = I[G];
                    if (null != J && !1 !== J) {
                        var K = index_module_v(J, l, f, !0, "svg" === m || "foreignObject" !== m && h, d);
                        if (S && !Z && index_module_i(K) && (Z = !0), K) if (S) {
                            var Q = K.length > 0 && "<" != K[0];
                            B && Q ? U[U.length - 1] += K : U.push(K), B = Q;
                        } else U.push(K);
                    }
                }
                if (S && Z) for (var V = U.length; V--; ) U[V] = "\n" + w + index_module_a(U[V], w);
            }
            if (U.length) D += U.join(""); else if (f && f.xml) return D.substring(0, D.length - 1) + " />";
            return E || (S && ~D.indexOf("\n") && (D += "\n"), D += "</" + m + ">"), D;
        }
        index_module_v.shallowRender = function(e, t) {
            return index_module_v(e, t, index_module_f);
        };
        var index_module = index_module_v;
        function utils_isPromise(item) {
            try {
                if (!item) return !1;
                if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                if ("undefined" != typeof window && "function" == typeof window.Window && item instanceof window.Window) return !1;
                if ("undefined" != typeof window && "function" == typeof window.constructor && item instanceof window.constructor) return !1;
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
        var dispatchedErrors = [];
        var possiblyUnhandledPromiseHandlers = [];
        var activeCount = 0;
        var flushPromise;
        function flushActive() {
            if (!activeCount && flushPromise) {
                var promise = flushPromise;
                flushPromise = null;
                promise.resolve();
            }
        }
        function startActive() {
            activeCount += 1;
        }
        function endActive() {
            activeCount -= 1;
            flushActive();
        }
        var promise_ZalgoPromise = function() {
            function ZalgoPromise(handler) {
                var _this = this;
                this.resolved = void 0;
                this.rejected = void 0;
                this.errorHandled = void 0;
                this.value = void 0;
                this.error = void 0;
                this.handlers = void 0;
                this.dispatching = void 0;
                this.stack = void 0;
                this.resolved = !1;
                this.rejected = !1;
                this.errorHandled = !1;
                this.handlers = [];
                if (handler) {
                    var _result;
                    var _error;
                    var resolved = !1;
                    var rejected = !1;
                    var isAsync = !1;
                    startActive();
                    try {
                        handler((function(res) {
                            if (isAsync) _this.resolve(res); else {
                                resolved = !0;
                                _result = res;
                            }
                        }), (function(err) {
                            if (isAsync) _this.reject(err); else {
                                rejected = !0;
                                _error = err;
                            }
                        }));
                    } catch (err) {
                        endActive();
                        this.reject(err);
                        return;
                    }
                    endActive();
                    isAsync = !0;
                    resolved ? this.resolve(_result) : rejected && this.reject(_error);
                }
            }
            var _proto = ZalgoPromise.prototype;
            _proto.resolve = function(result) {
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                this.resolved = !0;
                this.value = result;
                this.dispatch();
                return this;
            };
            _proto.reject = function(error) {
                var _this2 = this;
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                if (!error) {
                    var _err = error && "function" == typeof error.toString ? error.toString() : {}.toString.call(error);
                    error = new Error("Expected reject to be called with Error, got " + _err);
                }
                this.rejected = !0;
                this.error = error;
                this.errorHandled || setTimeout((function() {
                    _this2.errorHandled || function(err, promise) {
                        if (-1 === dispatchedErrors.indexOf(err)) {
                            dispatchedErrors.push(err);
                            setTimeout((function() {
                                throw err;
                            }), 1);
                            for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                        }
                    }(error, _this2);
                }), 1);
                this.dispatch();
                return this;
            };
            _proto.asyncReject = function(error) {
                this.errorHandled = !0;
                this.reject(error);
                return this;
            };
            _proto.dispatch = function() {
                var resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                if (!this.dispatching && (resolved || rejected)) {
                    this.dispatching = !0;
                    startActive();
                    var chain = function(firstPromise, secondPromise) {
                        return firstPromise.then((function(res) {
                            secondPromise.resolve(res);
                        }), (function(err) {
                            secondPromise.reject(err);
                        }));
                    };
                    for (var i = 0; i < handlers.length; i++) {
                        var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise;
                        var _result2 = void 0;
                        if (resolved) try {
                            _result2 = onSuccess ? onSuccess(this.value) : this.value;
                        } catch (err) {
                            promise.reject(err);
                            continue;
                        } else if (rejected) {
                            if (!onError) {
                                promise.reject(this.error);
                                continue;
                            }
                            try {
                                _result2 = onError(this.error);
                            } catch (err) {
                                promise.reject(err);
                                continue;
                            }
                        }
                        if (_result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected)) {
                            _result2.resolved ? promise.resolve(_result2.value) : promise.reject(_result2.error);
                            _result2.errorHandled = !0;
                        } else utils_isPromise(_result2) ? _result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected) ? _result2.resolved ? promise.resolve(_result2.value) : promise.reject(_result2.error) : chain(_result2, promise) : promise.resolve(_result2);
                    }
                    handlers.length = 0;
                    this.dispatching = !1;
                    endActive();
                }
            };
            _proto.then = function(onSuccess, onError) {
                if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                var promise = new ZalgoPromise;
                this.handlers.push({
                    promise: promise,
                    onSuccess: onSuccess,
                    onError: onError
                });
                this.errorHandled = !0;
                this.dispatch();
                return promise;
            };
            _proto.catch = function(onError) {
                return this.then(void 0, onError);
            };
            _proto.finally = function(onFinally) {
                if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                return this.then((function(result) {
                    return ZalgoPromise.try(onFinally).then((function() {
                        return result;
                    }));
                }), (function(err) {
                    return ZalgoPromise.try(onFinally).then((function() {
                        throw err;
                    }));
                }));
            };
            _proto.timeout = function(time, err) {
                var _this3 = this;
                if (this.resolved || this.rejected) return this;
                var timeout = setTimeout((function() {
                    _this3.resolved || _this3.rejected || _this3.reject(err || new Error("Promise timed out after " + time + "ms"));
                }), time);
                return this.then((function(result) {
                    clearTimeout(timeout);
                    return result;
                }));
            };
            _proto.toPromise = function() {
                if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                return Promise.resolve(this);
            };
            ZalgoPromise.resolve = function(value) {
                return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise((function(resolve, reject) {
                    return value.then(resolve, reject);
                })) : (new ZalgoPromise).resolve(value);
            };
            ZalgoPromise.reject = function(error) {
                return (new ZalgoPromise).reject(error);
            };
            ZalgoPromise.asyncReject = function(error) {
                return (new ZalgoPromise).asyncReject(error);
            };
            ZalgoPromise.all = function(promises) {
                var promise = new ZalgoPromise;
                var count = promises.length;
                var results = [];
                if (!count) {
                    promise.resolve(results);
                    return promise;
                }
                var chain = function(i, firstPromise, secondPromise) {
                    return firstPromise.then((function(res) {
                        results[i] = res;
                        0 == (count -= 1) && promise.resolve(results);
                    }), (function(err) {
                        secondPromise.reject(err);
                    }));
                };
                for (var i = 0; i < promises.length; i++) {
                    var prom = promises[i];
                    if (prom instanceof ZalgoPromise) {
                        if (prom.resolved) {
                            results[i] = prom.value;
                            count -= 1;
                            continue;
                        }
                    } else if (!utils_isPromise(prom)) {
                        results[i] = prom;
                        count -= 1;
                        continue;
                    }
                    chain(i, ZalgoPromise.resolve(prom), promise);
                }
                0 === count && promise.resolve(results);
                return promise;
            };
            ZalgoPromise.hash = function(promises) {
                var result = {};
                return ZalgoPromise.all(Object.keys(promises).map((function(key) {
                    return ZalgoPromise.resolve(promises[key]).then((function(value) {
                        result[key] = value;
                    }));
                }))).then((function() {
                    return result;
                }));
            };
            ZalgoPromise.map = function(items, method) {
                return ZalgoPromise.all(items.map(method));
            };
            ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                return function(handler) {
                    possiblyUnhandledPromiseHandlers.push(handler);
                    return {
                        cancel: function() {
                            possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                        }
                    };
                }(handler);
            };
            ZalgoPromise.try = function(method, context, args) {
                if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                var result;
                startActive();
                try {
                    result = method.apply(context, args || []);
                } catch (err) {
                    endActive();
                    return ZalgoPromise.reject(err);
                }
                endActive();
                return ZalgoPromise.resolve(result);
            };
            ZalgoPromise.delay = function(_delay) {
                return new ZalgoPromise((function(resolve) {
                    setTimeout(resolve, _delay);
                }));
            };
            ZalgoPromise.isPromise = function(value) {
                return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
            };
            ZalgoPromise.flush = function() {
                return function(Zalgo) {
                    var promise = flushPromise = flushPromise || new Zalgo;
                    flushActive();
                    return promise;
                }(ZalgoPromise);
            };
            return ZalgoPromise;
        }();
        function _extends() {
            return (_extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) ({}).hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }).apply(this, arguments);
        }
        var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
        function isAboutProtocol(win) {
            void 0 === win && (win = window);
            return "about:" === win.location.protocol;
        }
        function canReadFromWindow(win) {
            try {
                return !0;
            } catch (err) {}
            return !1;
        }
        function getActualDomain(win) {
            void 0 === win && (win = window);
            var location = win.location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if ("file:" === protocol) return "file://";
            if ("about:" === protocol) {
                var parent = function(win) {
                    void 0 === win && (win = window);
                    if (win) try {
                        if (win.parent && win.parent !== win) return win.parent;
                    } catch (err) {}
                }(win);
                return parent && canReadFromWindow() ? getActualDomain(parent) : "about://";
            }
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function getDomain(win) {
            void 0 === win && (win = window);
            var domain = getActualDomain(win);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf("mock:") ? win.mockDomain : domain;
        }
        var iframeWindows = [];
        var iframeFrames = [];
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
                    if (doc && doc.documentElement && !doc.documentElement.contains(frame)) {
                        var parent = frame;
                        for (;parent.parentNode && parent.parentNode !== parent; ) parent = parent.parentNode;
                        if (!parent.host || !doc.documentElement.contains(parent.host)) return !0;
                    }
                    return !1;
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
            try {
                if (obj && "__unlikely_value__" === obj.__cross_domain_utils_window_check__) return !1;
            } catch (err) {
                return !0;
            }
            return !1;
        }
        function util_safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }
        var weakmap_CrossDomainSafeWeakMap = function() {
            function CrossDomainSafeWeakMap() {
                this.name = void 0;
                this.weakmap = void 0;
                this.keys = void 0;
                this.values = void 0;
                this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__";
                if (function() {
                    if ("undefined" == typeof WeakMap) return !1;
                    if (void 0 === Object.freeze) return !1;
                    try {
                        var testWeakMap = new WeakMap;
                        var testKey = {};
                        Object.freeze(testKey);
                        testWeakMap.set(testKey, "__testvalue__");
                        return "__testvalue__" === testWeakMap.get(testKey);
                    } catch (err) {
                        return !1;
                    }
                }()) try {
                    this.weakmap = new WeakMap;
                } catch (err) {}
                this.keys = [];
                this.values = [];
            }
            var _proto = CrossDomainSafeWeakMap.prototype;
            _proto._cleanupClosedWindows = function() {
                var weakmap = this.weakmap;
                var keys = this.keys;
                for (var i = 0; i < keys.length; i++) {
                    var value = keys[i];
                    if (isWindow(value) && isWindowClosed(value)) {
                        if (weakmap) try {
                            weakmap.delete(value);
                        } catch (err) {}
                        keys.splice(i, 1);
                        this.values.splice(i, 1);
                        i -= 1;
                    }
                }
            };
            _proto.isSafeToReadWrite = function(key) {
                return !isWindow(key);
            };
            _proto.set = function(key, value) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    weakmap.set(key, value);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var name = this.name;
                    var entry = key[name];
                    entry && entry[0] === key ? entry[1] = value : Object.defineProperty(key, name, {
                        value: [ key, value ],
                        writable: !0
                    });
                    return;
                } catch (err) {}
                this._cleanupClosedWindows();
                var keys = this.keys;
                var values = this.values;
                var index = util_safeIndexOf(keys, key);
                if (-1 === index) {
                    keys.push(key);
                    values.push(value);
                } else values[index] = value;
            };
            _proto.get = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    if (weakmap.has(key)) return weakmap.get(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var entry = key[this.name];
                    return entry && entry[0] === key ? entry[1] : void 0;
                } catch (err) {}
                this._cleanupClosedWindows();
                var index = util_safeIndexOf(this.keys, key);
                if (-1 !== index) return this.values[index];
            };
            _proto.delete = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    weakmap.delete(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var entry = key[this.name];
                    entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                } catch (err) {}
                this._cleanupClosedWindows();
                var keys = this.keys;
                var index = util_safeIndexOf(keys, key);
                if (-1 !== index) {
                    keys.splice(index, 1);
                    this.values.splice(index, 1);
                }
            };
            _proto.has = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    if (weakmap.has(key)) return !0;
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var entry = key[this.name];
                    return !(!entry || entry[0] !== key);
                } catch (err) {}
                this._cleanupClosedWindows();
                return -1 !== util_safeIndexOf(this.keys, key);
            };
            _proto.getOrSet = function(key, getter) {
                if (this.has(key)) return this.get(key);
                var value = getter();
                this.set(key, value);
                return value;
            };
            return CrossDomainSafeWeakMap;
        }();
        function getFunctionName(fn) {
            return fn.name || fn.__name__ || fn.displayName || "anonymous";
        }
        function setFunctionName(fn, name) {
            try {
                delete fn.name;
                fn.name = name;
            } catch (err) {}
            fn.__name__ = fn.displayName = name;
            return fn;
        }
        var objectIDs;
        function serializeArgs(args) {
            try {
                return JSON.stringify([].slice.call(args), (function(subkey, val) {
                    return "function" == typeof val ? "memoize[" + function(obj) {
                        objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap;
                        if (null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                        var uid = objectIDs.get(obj);
                        if (!uid) {
                            uid = typeof obj + ":" + (chars = "0123456789abcdef", "xxxxxxxxxx".replace(/./g, (function() {
                                return chars.charAt(Math.floor(Math.random() * chars.length));
                            })) + "_" + function(str) {
                                if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
                                    return String.fromCharCode(parseInt(p1, 16));
                                })));
                                if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64");
                                throw new Error("Can not find window.btoa or Buffer");
                            }((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase());
                            objectIDs.set(obj, uid);
                        }
                        var chars;
                        return uid;
                    }(val) + "]" : val;
                }));
            } catch (err) {
                throw new Error("Arguments not serializable -- can not be used to memoize");
            }
        }
        function memoize(method, options) {
            var _this = this;
            void 0 === options && (options = {});
            var cacheMap = new weakmap_CrossDomainSafeWeakMap;
            var memoizedFunction = function() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                var cache = cacheMap.getOrSet(options.thisNamespace ? this : method, (function() {
                    return {};
                }));
                var key = serializeArgs(args);
                var cacheTime = options.time;
                cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime && delete cache[key];
                if (cache[key]) return cache[key].value;
                var time = Date.now();
                var value = method.apply(this, arguments);
                cache[key] = {
                    time: time,
                    value: value
                };
                return cache[key].value;
            };
            memoizedFunction.reset = function() {
                cacheMap.delete(options.thisNamespace ? _this : method);
            };
            return setFunctionName(memoizedFunction, (options.name || getFunctionName(method)) + "::memoized");
        }
        function inlineMemoize(method, logic, args) {
            void 0 === args && (args = []);
            var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {};
            var key = serializeArgs(args);
            return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
        }
        function src_util_noop() {}
        function objFilter(obj, filter) {
            void 0 === filter && (filter = Boolean);
            var result = {};
            for (var key in obj) obj.hasOwnProperty(key) && filter(obj[key], key) && (result[key] = obj[key]);
            return result;
        }
        function parseQuery(queryString) {
            return inlineMemoize(parseQuery, (function() {
                var params = {};
                if (!queryString) return params;
                if (-1 === queryString.indexOf("=")) return params;
                for (var _i2 = 0, _queryString$split2 = queryString.split("&"); _i2 < _queryString$split2.length; _i2++) {
                    var pair = _queryString$split2[_i2];
                    (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                }
                return params;
            }), [ queryString ]);
        }
        function dom_redirect(url, win) {
            void 0 === win && (win = window);
            return new promise_ZalgoPromise((function(resolve) {
                win.location = url;
                (function(url) {
                    return -1 === url.indexOf("#") || 0 !== url.indexOf("#") && url.split("#")[0] !== window.location.href.split("#")[0];
                })(url) || resolve();
            }));
        }
        function dom_isBrowser() {
            return "undefined" != typeof window;
        }
        Object.create(Error.prototype);
        var http_headerBuilders = [];
        function request(_ref) {
            var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 0 : _ref$timeout;
            return new promise_ZalgoPromise((function(resolve, reject) {
                if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
                var normalizedHeaders = {};
                for (var _i4 = 0, _Object$keys2 = Object.keys(headers); _i4 < _Object$keys2.length; _i4++) {
                    var _key2 = _Object$keys2[_i4];
                    normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
                }
                json ? normalizedHeaders["content-type"] = normalizedHeaders["content-type"] || "application/json" : (data || body) && (normalizedHeaders["content-type"] = normalizedHeaders["content-type"] || "application/x-www-form-urlencoded; charset=utf-8");
                normalizedHeaders.accept = normalizedHeaders.accept || "application/json";
                for (var _i6 = 0; _i6 < http_headerBuilders.length; _i6++) {
                    var builtHeaders = (0, http_headerBuilders[_i6])();
                    for (var _i8 = 0, _Object$keys4 = Object.keys(builtHeaders); _i8 < _Object$keys4.length; _i8++) {
                        var _key3 = _Object$keys4[_i8];
                        normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
                    }
                }
                var xhr = new win.XMLHttpRequest;
                xhr.addEventListener("load", (function() {
                    var responseHeaders = function(rawHeaders) {
                        void 0 === rawHeaders && (rawHeaders = "");
                        var result = {};
                        for (var _i2 = 0, _rawHeaders$trim$spli2 = rawHeaders.trim().split("\n"); _i2 < _rawHeaders$trim$spli2.length; _i2++) {
                            var _line$split = _rawHeaders$trim$spli2[_i2].split(":"), _key = _line$split[0], values = _line$split.slice(1);
                            result[_key.toLowerCase()] = values.join(":").trim();
                        }
                        return result;
                    }(this.getAllResponseHeaders());
                    if (!this.status) return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code."));
                    var contentType = responseHeaders["content-type"];
                    var isJSON = contentType && (0 === contentType.indexOf("application/json") || 0 === contentType.indexOf("text/json"));
                    var responseBody = this.responseText;
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
                }), !1);
                xhr.addEventListener("error", (function(evt) {
                    reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
                }), !1);
                xhr.open(method, url, !0);
                for (var _key4 in normalizedHeaders) normalizedHeaders.hasOwnProperty(_key4) && xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
                json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map((function(key) {
                    return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
                })).join("&"));
                xhr.timeout = timeout;
                xhr.ontimeout = function() {
                    reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
                };
                xhr.send(body);
            }));
        }
        function unresolvedPromise() {
            return new promise_ZalgoPromise(src_util_noop);
        }
        function promiseNoop() {
            return promise_ZalgoPromise.resolve();
        }
        function loadScript(url) {
            return new promise_ZalgoPromise((function(resolve, reject) {
                var container = document.body || document.head;
                if (!container) return reject(new Error("Can not find container for script: " + url));
                var script = document.createElement("script");
                script.setAttribute("src", url);
                script.addEventListener("load", (function() {
                    return resolve(script);
                }));
                script.addEventListener("error", (function(err) {
                    return reject(err);
                }));
                container.appendChild(script);
            }));
        }
        function isServer() {
            return "undefined" == typeof window;
        }
        var AUTO_FLUSH_LEVEL = [ "warn", "error" ];
        var LOG_LEVEL_PRIORITY = [ "error", "warn", "info", "debug" ];
        function httpTransport(_ref) {
            return request({
                url: _ref.url,
                method: _ref.method,
                headers: _ref.headers,
                json: _ref.json
            }).then(src_util_noop);
        }
        function extendIfDefined(target, source) {
            for (var key in source) source.hasOwnProperty(key) && source[key] && !target[key] && (target[key] = source[key]);
        }
        var _NATIVE_CHECKOUT_URI, _NATIVE_CHECKOUT_POPU;
        (_NATIVE_CHECKOUT_URI = {}).paypal = "/smart/checkout/native", _NATIVE_CHECKOUT_URI.venmo = "/smart/checkout/venmo";
        (_NATIVE_CHECKOUT_POPU = {}).paypal = "/smart/checkout/native/popup", _NATIVE_CHECKOUT_POPU.venmo = "/smart/checkout/venmo/popup";
        function getLogger() {
            return inlineMemoize(getLogger, (function() {
                return function(_ref2) {
                    var url = _ref2.url, prefix = _ref2.prefix, _ref2$logLevel = _ref2.logLevel, logLevel = void 0 === _ref2$logLevel ? "warn" : _ref2$logLevel, _ref2$transport = _ref2.transport, transport = void 0 === _ref2$transport ? httpTransport : _ref2$transport, _ref2$flushInterval = _ref2.flushInterval, flushInterval = void 0 === _ref2$flushInterval ? 6e4 : _ref2$flushInterval;
                    var events = [];
                    var tracking = [];
                    var payloadBuilders = [];
                    var metaBuilders = [];
                    var trackingBuilders = [];
                    var headerBuilders = [];
                    function print(level, event, payload) {
                        if (dom_isBrowser() && window.console && window.console.log && !(LOG_LEVEL_PRIORITY.indexOf(level) > LOG_LEVEL_PRIORITY.indexOf(logLevel))) {
                            var args = [ event ];
                            args.push(payload);
                            (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                            try {
                                window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                            } catch (err) {}
                        }
                    }
                    function immediateFlush() {
                        return promise_ZalgoPromise.try((function() {
                            if (dom_isBrowser() && "file:" !== window.location.protocol && (events.length || tracking.length)) {
                                var meta = {};
                                for (var _i2 = 0; _i2 < metaBuilders.length; _i2++) extendIfDefined(meta, (0, metaBuilders[_i2])(meta));
                                var headers = {};
                                for (var _i4 = 0; _i4 < headerBuilders.length; _i4++) extendIfDefined(headers, (0, 
                                headerBuilders[_i4])(headers));
                                var req = transport({
                                    method: "POST",
                                    url: url,
                                    headers: headers,
                                    json: {
                                        events: events,
                                        meta: meta,
                                        tracking: tracking
                                    }
                                });
                                events = [];
                                tracking = [];
                                return req.then(src_util_noop);
                            }
                        }));
                    }
                    var flush = function(method, delay) {
                        void 0 === delay && (delay = 50);
                        var promise;
                        var timeout;
                        return setFunctionName((function() {
                            timeout && clearTimeout(timeout);
                            var localPromise = promise = promise || new promise_ZalgoPromise;
                            timeout = setTimeout((function() {
                                promise = null;
                                timeout = null;
                                promise_ZalgoPromise.try(method).then((function(result) {
                                    localPromise.resolve(result);
                                }), (function(err) {
                                    localPromise.reject(err);
                                }));
                            }), delay);
                            return localPromise;
                        }), getFunctionName(method) + "::promiseDebounced");
                    }(immediateFlush);
                    function log(level, event, payload) {
                        void 0 === payload && (payload = {});
                        if (!dom_isBrowser()) return logger;
                        prefix && (event = prefix + "_" + event);
                        var logPayload = _extends({}, objFilter(payload), {
                            timestamp: Date.now().toString()
                        });
                        for (var _i6 = 0; _i6 < payloadBuilders.length; _i6++) extendIfDefined(logPayload, (0, 
                        payloadBuilders[_i6])(logPayload));
                        !function(level, event, payload) {
                            events.push({
                                level: level,
                                event: event,
                                payload: payload
                            });
                            -1 !== AUTO_FLUSH_LEVEL.indexOf(level) && flush();
                        }(level, event, logPayload);
                        print(level, event, logPayload);
                        return logger;
                    }
                    function addBuilder(builders, builder) {
                        builders.push(builder);
                        return logger;
                    }
                    dom_isBrowser() && (method = flush, time = flushInterval, function loop() {
                        setTimeout((function() {
                            method();
                            loop();
                        }), time);
                    }());
                    var method, time;
                    var logger = {
                        debug: function(event, payload) {
                            return log("debug", event, payload);
                        },
                        info: function(event, payload) {
                            return log("info", event, payload);
                        },
                        warn: function(event, payload) {
                            return log("warn", event, payload);
                        },
                        error: function(event, payload) {
                            return log("error", event, payload);
                        },
                        track: function(payload) {
                            void 0 === payload && (payload = {});
                            if (!dom_isBrowser()) return logger;
                            var trackingPayload = objFilter(payload);
                            for (var _i8 = 0; _i8 < trackingBuilders.length; _i8++) extendIfDefined(trackingPayload, (0, 
                            trackingBuilders[_i8])(trackingPayload));
                            print("debug", "track", trackingPayload);
                            tracking.push(trackingPayload);
                            return logger;
                        },
                        flush: flush,
                        immediateFlush: immediateFlush,
                        addPayloadBuilder: function(builder) {
                            return addBuilder(payloadBuilders, builder);
                        },
                        addMetaBuilder: function(builder) {
                            return addBuilder(metaBuilders, builder);
                        },
                        addTrackingBuilder: function(builder) {
                            return addBuilder(trackingBuilders, builder);
                        },
                        addHeaderBuilder: function(builder) {
                            return addBuilder(headerBuilders, builder);
                        },
                        setTransport: function(newTransport) {
                            transport = newTransport;
                            return logger;
                        }
                    };
                    return logger;
                }({
                    url: "/xoplatform/logger/api/logger"
                });
            }));
        }
        function callRestAPI(_ref) {
            var _extends2;
            var accessToken = _ref.accessToken, method = _ref.method, url = _ref.url, data = _ref.data, headers = _ref.headers;
            if (!accessToken) throw new Error("No access token passed to " + url);
            var requestHeaders = _extends(((_extends2 = {}).authorization = "Bearer " + accessToken, 
            _extends2["content-type"] = "application/json", _extends2), headers);
            return request({
                method: method,
                url: url,
                headers: requestHeaders,
                json: data
            }).then((function(_ref2) {
                var status = _ref2.status, body = _ref2.body;
                if (status >= 300) throw new Error(url + " returned status: " + status + " (Corr ID: " + _ref2.headers["paypal-debug-id"] + ")");
                return body;
            }));
        }
        function callSmartAPI(_ref3) {
            var _reqHeaders;
            var accessToken = _ref3.accessToken, url = _ref3.url, _ref3$method = _ref3.method, method = void 0 === _ref3$method ? "get" : _ref3$method, json = _ref3.json;
            var reqHeaders = ((_reqHeaders = {})["x-requested-by"] = "smart-payment-buttons", 
            _reqHeaders);
            accessToken && (reqHeaders["x-paypal-internal-euat"] = accessToken);
            return request({
                url: url,
                method: method,
                headers: reqHeaders,
                json: json
            }).then((function(_ref4) {
                var status = _ref4.status, body = _ref4.body, headers = _ref4.headers;
                if ("contingency" === body.ack) {
                    var err = new Error(body.contingency);
                    err.data = body.data;
                    throw err;
                }
                if (status > 400) throw new Error("Api: " + url + " returned status code: " + status + " (Corr ID: " + headers["paypal-debug-id"] + ")");
                if ("success" !== body.ack) throw new Error("Api: " + url + " returned ack: " + body.ack + " (Corr ID: " + headers["paypal-debug-id"] + ")");
                return body.data;
            }));
        }
        function callGraphQL(_ref5) {
            var _ref5$variables = _ref5.variables, _ref5$headers = _ref5.headers;
            return request({
                url: "/graphql",
                method: "POST",
                json: {
                    query: _ref5.query,
                    variables: void 0 === _ref5$variables ? {} : _ref5$variables
                },
                headers: _extends({
                    "x-app-name": "smart-payment-buttons"
                }, void 0 === _ref5$headers ? {} : _ref5$headers)
            }).then((function(_ref6) {
                var status = _ref6.status, body = _ref6.body;
                var errors = body.errors || [];
                if (errors.length) {
                    var message = errors[0].message || JSON.stringify(errors[0]);
                    throw new Error(message);
                }
                if (200 !== status) throw new Error("/graphql returned status " + status);
                return body.data;
            }));
        }
        function billingTokenToOrderID(billingToken) {
            return callSmartAPI({
                method: "post",
                url: "/smart/api/payment/" + billingToken + "/ectoken"
            }).then((function(data) {
                return data.token;
            }));
        }
        function subscriptionIdToCartId(subscriptionID) {
            return callSmartAPI({
                method: "post",
                url: "/smart/api/billagmt/subscriptions/" + subscriptionID + "/cartid"
            }).then((function(data) {
                return data.token;
            }));
        }
        memoize((function(config) {
            return promise_ZalgoPromise.try((function() {
                if (!window.firebase || !window.firebase.auth || !window.firebase.database) return loadScript("https://www.paypalobjects.com/checkout/js/lib/firebase-app.js").then((function() {
                    return promise_ZalgoPromise.all([ loadScript("https://www.paypalobjects.com/checkout/js/lib/firebase-auth.js"), loadScript("https://www.paypalobjects.com/checkout/js/lib/firebase-database.js") ]);
                }));
            })).then((function() {
                var firebase = window.firebase;
                if (!firebase) throw new Error("Firebase failed to load");
                firebase.initializeApp(config);
                return firebase;
            }));
        }));
        function getCreateOrder(_ref4, _ref5) {
            var createOrder = _ref4.createOrder, currency = _ref4.currency;
            var createBillingAgreement = _ref5.createBillingAgreement, createSubscription = _ref5.createSubscription;
            var data = {};
            var actions = function(_ref3) {
                var facilitatorAccessToken = _ref3.facilitatorAccessToken, intent = _ref3.intent, currency = _ref3.currency, merchantID = _ref3.merchantID, partnerAttributionID = _ref3.partnerAttributionID;
                var order = function(_ref) {
                    var facilitatorAccessToken = _ref.facilitatorAccessToken, intent = _ref.intent, currency = _ref.currency, merchantID = _ref.merchantID, partnerAttributionID = _ref.partnerAttributionID;
                    return {
                        create: function(data) {
                            var order = _extends({}, data);
                            if (order.intent && order.intent.toLowerCase() !== intent) throw new Error("Unexpected intent: " + order.intent + " passed to order.create. Please ensure you are passing /sdk/js?intent=" + order.intent.toLowerCase() + " in the paypal script tag.");
                            (order = _extends({}, order, {
                                intent: intent.toUpperCase()
                            })).purchase_units = order.purchase_units.map((function(unit) {
                                if (unit.amount.currency_code && unit.amount.currency_code !== currency) throw new Error("Unexpected currency: " + unit.amount.currency_code + " passed to order.create. Please ensure you are passing /sdk/js?currency=" + unit.amount.currency_code + " in the paypal script tag.");
                                var payee = unit.payee;
                                if (payee && merchantID && merchantID.length) {
                                    if (!merchantID[0]) throw new Error("Pass merchant-id=XYZ in the paypal script tag.");
                                    if (payee.merchant_id && payee.merchant_id !== merchantID[0]) throw new Error('Expected payee.merchant_id to be "' + merchantID[0] + '"');
                                }
                                merchantID && (payee = _extends({}, payee, {
                                    merchant_id: merchantID[0]
                                }));
                                return _extends({}, unit, {
                                    payee: payee,
                                    amount: _extends({}, unit.amount, {
                                        currency_code: currency
                                    })
                                });
                            }));
                            order.application_context = order.application_context || {};
                            return function(order, _ref) {
                                var _headers;
                                var facilitatorAccessToken = _ref.facilitatorAccessToken, partnerAttributionID = _ref.partnerAttributionID;
                                getLogger().info("rest_api_create_order_id");
                                return callRestAPI({
                                    accessToken: facilitatorAccessToken,
                                    method: "post",
                                    url: "/v2/checkout/orders",
                                    data: order,
                                    headers: (_headers = {}, _headers["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                    _headers)
                                }).then((function(body) {
                                    var _getLogger$track;
                                    var orderID = body && body.id;
                                    if (!orderID) throw new Error("Order Api response error:\n\n" + JSON.stringify(body, null, 4));
                                    getLogger().track(((_getLogger$track = {}).transition_name = "process_create_order", 
                                    _getLogger$track.context_type = "EC-Token", _getLogger$track.token = orderID, _getLogger$track.context_id = orderID, 
                                    _getLogger$track));
                                    return orderID;
                                }));
                            }(order, {
                                facilitatorAccessToken: facilitatorAccessToken,
                                partnerAttributionID: partnerAttributionID,
                                forceRestAPI: !1
                            });
                        }
                    };
                }({
                    facilitatorAccessToken: facilitatorAccessToken,
                    intent: intent,
                    currency: currency,
                    merchantID: merchantID,
                    partnerAttributionID: partnerAttributionID
                });
                !function(_ref2) {
                    var facilitatorAccessToken = _ref2.facilitatorAccessToken, intent = _ref2.intent, currency = _ref2.currency, merchantID = _ref2.merchantID, partnerAttributionID = _ref2.partnerAttributionID;
                }({
                    facilitatorAccessToken: facilitatorAccessToken,
                    intent: intent,
                    currency: currency,
                    merchantID: merchantID,
                    partnerAttributionID: partnerAttributionID
                });
                return {
                    order: order,
                    payment: null
                };
            }({
                facilitatorAccessToken: _ref5.facilitatorAccessToken,
                intent: _ref4.intent,
                currency: currency,
                merchantID: _ref4.merchantID,
                partnerAttributionID: _ref4.partnerAttributionID
            });
            return memoize((function() {
                var queryOrderID = parseQuery(window.location.search.slice(1)).orderID;
                if (queryOrderID) return promise_ZalgoPromise.resolve(queryOrderID);
                var startTime = Date.now();
                return promise_ZalgoPromise.try((function() {
                    return createBillingAgreement ? createBillingAgreement().then(billingTokenToOrderID) : createSubscription ? createSubscription().then(subscriptionIdToCartId) : createOrder ? createOrder(data, actions) : actions.order.create({
                        purchase_units: [ {
                            amount: {
                                currency_code: currency,
                                value: "0.01"
                            }
                        } ]
                    });
                })).then((function(orderID) {
                    var _getLogger$track;
                    if (!orderID || "string" != typeof orderID) throw new Error("Expected an order id to be passed");
                    if (0 === orderID.indexOf("PAY-") || 0 === orderID.indexOf("PAYID-")) throw new Error("Do not pass PAY-XXX or PAYID-XXX directly into createOrder. Pass the EC-XXX token instead");
                    var duration = Date.now() - startTime;
                    getLogger().track((_getLogger$track = {}, _getLogger$track.state_name = "smart_button", 
                    _getLogger$track.transition_name = "process_receive_order", _getLogger$track.context_type = "EC-Token", 
                    _getLogger$track.context_id = orderID, _getLogger$track.token = orderID, _getLogger$track.response_duration = duration.toString(), 
                    _getLogger$track)).flush();
                    return orderID;
                }));
            }));
        }
        function getOnApprove(_ref4, _ref5) {
            var intent = _ref4.intent, _ref4$onApprove = _ref4.onApprove, onApprove = void 0 === _ref4$onApprove ? function(intent) {
                return function(data, actions) {
                    if ("capture" === intent) return actions.order.capture().then(src_util_noop);
                    if ("authorize" === intent) return actions.order.authorize().then(src_util_noop);
                    throw new Error("Unsupported intent for auto-capture: " + intent);
                };
            }(intent) : _ref4$onApprove, partnerAttributionID = _ref4.partnerAttributionID, onError = _ref4.onError, _ref4$upgradeLSAT = _ref4.upgradeLSAT, upgradeLSAT = void 0 !== _ref4$upgradeLSAT && _ref4$upgradeLSAT;
            var facilitatorAccessToken = _ref5.facilitatorAccessToken, createOrder = _ref5.createOrder;
            if (!onApprove) throw new Error("Expected onApprove");
            return memoize((function(_ref6, _ref7) {
                var payerID = _ref6.payerID, paymentID = _ref6.paymentID, billingToken = _ref6.billingToken, subscriptionID = _ref6.subscriptionID, buyerAccessToken = _ref6.buyerAccessToken, _ref6$forceRestAPI = _ref6.forceRestAPI, forceRestAPI = void 0 === _ref6$forceRestAPI ? upgradeLSAT : _ref6$forceRestAPI;
                var restart = _ref7.restart;
                return promise_ZalgoPromise.try((function() {
                    if (upgradeLSAT && buyerAccessToken) return createOrder().then((function(orderID) {
                        return function(facilitatorAccessToken, _ref2) {
                            var _headers;
                            var buyerAccessToken = _ref2.buyerAccessToken, orderID = _ref2.orderID;
                            return callGraphQL({
                                headers: (_headers = {}, _headers["x-paypal-internal-euat"] = buyerAccessToken, 
                                _headers),
                                query: "\n            mutation UpgradeFacilitatorAccessToken(\n                $orderID: String!\n                $buyerAccessToken: String!\n                $facilitatorAccessToken: String!\n            ) {\n                upgradeLowScopeAccessToken(\n                    token: $orderID\n                    buyerAccessToken: $buyerAccessToken\n                    merchantLSAT: $facilitatorAccessToken\n                )\n            }\n        ",
                                variables: {
                                    facilitatorAccessToken: facilitatorAccessToken,
                                    buyerAccessToken: buyerAccessToken,
                                    orderID: orderID
                                }
                            }).then(src_util_noop);
                        }(facilitatorAccessToken, {
                            buyerAccessToken: buyerAccessToken,
                            orderID: orderID
                        });
                    }));
                })).then((function() {
                    return createOrder();
                })).then((function(orderID) {
                    var _getLogger$info$track;
                    getLogger().info("button_approve").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_approve", 
                    _getLogger$info$track.token = orderID, _getLogger$info$track)).flush();
                    var data = {
                        orderID: orderID,
                        payerID: payerID,
                        paymentID: paymentID,
                        billingToken: billingToken,
                        subscriptionID: subscriptionID,
                        facilitatorAccessToken: facilitatorAccessToken
                    };
                    var actions = function(_ref3) {
                        var intent = _ref3.intent, orderID = _ref3.orderID, paymentID = _ref3.paymentID, payerID = _ref3.payerID, restart = _ref3.restart, subscriptionID = _ref3.subscriptionID, facilitatorAccessToken = _ref3.facilitatorAccessToken, buyerAccessToken = _ref3.buyerAccessToken, partnerAttributionID = _ref3.partnerAttributionID, forceRestAPI = _ref3.forceRestAPI;
                        var getSubscriptionApi = memoize((function() {
                            if (!subscriptionID) throw new Error("No subscription ID present");
                            return function(subscriptionID, _ref6) {
                                return callSmartAPI({
                                    accessToken: _ref6.buyerAccessToken,
                                    url: "/smart/api/billagmt/subscriptions/" + subscriptionID
                                });
                            }(subscriptionID, {
                                buyerAccessToken: buyerAccessToken
                            });
                        }));
                        var activateSubscriptionApi = memoize((function() {
                            if (!subscriptionID) throw new Error("No subscription ID present");
                            return function(subscriptionID, _ref5) {
                                return callSmartAPI({
                                    accessToken: _ref5.buyerAccessToken,
                                    method: "post",
                                    url: "/smart/api/billagmt/subscriptions/" + subscriptionID + "/activate"
                                });
                            }(subscriptionID, {
                                buyerAccessToken: buyerAccessToken
                            });
                        }));
                        var order = function(_ref) {
                            var intent = _ref.intent, orderID = _ref.orderID, restart = _ref.restart, facilitatorAccessToken = _ref.facilitatorAccessToken, buyerAccessToken = _ref.buyerAccessToken, partnerAttributionID = _ref.partnerAttributionID, forceRestAPI = _ref.forceRestAPI;
                            var handleProcessorError = function(err) {
                                if (err && err.data && err.data.details && err.data.details.some((function(detail) {
                                    return "INSTRUMENT_DECLINED" === detail.issue || "PAYER_ACTION_REQUIRED" === detail.issue;
                                }))) return restart().then(unresolvedPromise);
                                throw new Error("Order could not be captured");
                            };
                            var get = memoize((function() {
                                return function(orderID, _ref2) {
                                    var _headers2;
                                    var buyerAccessToken = _ref2.buyerAccessToken, _ref2$forceRestAPI = _ref2.forceRestAPI;
                                    return void 0 !== _ref2$forceRestAPI && _ref2$forceRestAPI ? callRestAPI({
                                        accessToken: _ref2.facilitatorAccessToken,
                                        url: "/v2/checkout/orders/" + orderID,
                                        headers: (_headers2 = {}, _headers2["paypal-partner-attribution-id"] = _ref2.partnerAttributionID || "", 
                                        _headers2)
                                    }) : callSmartAPI({
                                        accessToken: buyerAccessToken,
                                        url: "/smart/api/order/" + orderID
                                    });
                                }(orderID, {
                                    facilitatorAccessToken: facilitatorAccessToken,
                                    buyerAccessToken: buyerAccessToken,
                                    partnerAttributionID: partnerAttributionID,
                                    forceRestAPI: forceRestAPI
                                });
                            }));
                            var capture = memoize((function() {
                                if ("capture" !== intent) throw new Error("Use intent=capture to use client-side capture");
                                return function(orderID, _ref3) {
                                    var _headers3;
                                    var buyerAccessToken = _ref3.buyerAccessToken, _ref3$forceRestAPI = _ref3.forceRestAPI;
                                    return void 0 !== _ref3$forceRestAPI && _ref3$forceRestAPI ? callRestAPI({
                                        accessToken: _ref3.facilitatorAccessToken,
                                        method: "post",
                                        url: "/v2/checkout/orders/" + orderID + "/capture",
                                        headers: (_headers3 = {}, _headers3["paypal-partner-attribution-id"] = _ref3.partnerAttributionID || "", 
                                        _headers3)
                                    }) : callSmartAPI({
                                        accessToken: buyerAccessToken,
                                        method: "post",
                                        url: "/smart/api/order/" + orderID + "/capture"
                                    });
                                }(orderID, {
                                    facilitatorAccessToken: facilitatorAccessToken,
                                    buyerAccessToken: buyerAccessToken,
                                    partnerAttributionID: partnerAttributionID,
                                    forceRestAPI: forceRestAPI
                                }).finally(get.reset).finally(capture.reset).catch(handleProcessorError);
                            }));
                            var authorize = memoize((function() {
                                if ("authorize" !== intent) throw new Error("Use intent=authorize to use client-side authorize");
                                return function(orderID, _ref4) {
                                    var _headers4;
                                    var buyerAccessToken = _ref4.buyerAccessToken, _ref4$forceRestAPI = _ref4.forceRestAPI;
                                    return void 0 !== _ref4$forceRestAPI && _ref4$forceRestAPI ? callRestAPI({
                                        accessToken: _ref4.facilitatorAccessToken,
                                        method: "post",
                                        url: "/v2/checkout/orders/" + orderID + "/authorize",
                                        headers: (_headers4 = {}, _headers4["paypal-partner-attribution-id"] = _ref4.partnerAttributionID || "", 
                                        _headers4)
                                    }) : callSmartAPI({
                                        accessToken: buyerAccessToken,
                                        method: "post",
                                        url: "/smart/api/order/" + orderID + "/authorize"
                                    });
                                }(orderID, {
                                    facilitatorAccessToken: facilitatorAccessToken,
                                    buyerAccessToken: buyerAccessToken,
                                    partnerAttributionID: partnerAttributionID,
                                    forceRestAPI: forceRestAPI
                                }).finally(get.reset).finally(authorize.reset).catch(handleProcessorError);
                            }));
                            return {
                                capture: capture,
                                authorize: authorize,
                                patch: function(data) {
                                    void 0 === data && (data = {});
                                    return function(orderID, data, _ref5) {
                                        var _headers5;
                                        var facilitatorAccessToken = _ref5.facilitatorAccessToken, buyerAccessToken = _ref5.buyerAccessToken, partnerAttributionID = _ref5.partnerAttributionID, _ref5$forceRestAPI = _ref5.forceRestAPI, forceRestAPI = void 0 !== _ref5$forceRestAPI && _ref5$forceRestAPI;
                                        var patchData = Array.isArray(data) ? {
                                            patch: data
                                        } : data;
                                        return forceRestAPI ? callRestAPI({
                                            accessToken: facilitatorAccessToken,
                                            method: "patch",
                                            url: "/v2/checkout/orders/" + orderID,
                                            data: patchData,
                                            headers: (_headers5 = {}, _headers5["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                            _headers5)
                                        }) : callSmartAPI({
                                            accessToken: buyerAccessToken,
                                            method: "post",
                                            url: "/smart/api/order/" + orderID + "/patch",
                                            json: {
                                                data: patchData
                                            }
                                        });
                                    }(orderID, data, {
                                        facilitatorAccessToken: facilitatorAccessToken,
                                        buyerAccessToken: buyerAccessToken,
                                        partnerAttributionID: partnerAttributionID,
                                        forceRestAPI: forceRestAPI
                                    }).catch((function() {
                                        throw new Error("Order could not be patched");
                                    }));
                                },
                                get: get
                            };
                        }({
                            intent: intent,
                            orderID: orderID,
                            paymentID: paymentID,
                            payerID: payerID,
                            subscriptionID: subscriptionID,
                            restart: restart,
                            facilitatorAccessToken: facilitatorAccessToken,
                            buyerAccessToken: buyerAccessToken,
                            partnerAttributionID: partnerAttributionID,
                            forceRestAPI: forceRestAPI
                        });
                        !function(_ref2) {
                            var intent = _ref2.intent, paymentID = _ref2.paymentID, payerID = _ref2.payerID, restart = _ref2.restart, facilitatorAccessToken = _ref2.facilitatorAccessToken, buyerAccessToken = _ref2.buyerAccessToken, partnerAttributionID = _ref2.partnerAttributionID;
                            if (paymentID) {
                                var handleProcessorError = function(err) {
                                    if (err && err.data && err.data.details && err.data.details.some((function(detail) {
                                        return "INSTRUMENT_DECLINED" === detail.issue || "PAYER_ACTION_REQUIRED" === detail.issue;
                                    }))) return restart().then(unresolvedPromise);
                                    throw new Error("Order could not be captured");
                                };
                                var get = memoize((function() {
                                    return function(paymentID, _ref4) {
                                        var _headers2;
                                        return callRestAPI({
                                            accessToken: _ref4.facilitatorAccessToken,
                                            url: "/v1/payments/payment/" + paymentID,
                                            headers: (_headers2 = {}, _headers2["paypal-partner-attribution-id"] = _ref4.partnerAttributionID || "", 
                                            _headers2)
                                        });
                                    }(paymentID, {
                                        facilitatorAccessToken: facilitatorAccessToken,
                                        buyerAccessToken: buyerAccessToken,
                                        partnerAttributionID: partnerAttributionID
                                    });
                                }));
                                var execute = memoize((function() {
                                    if ("capture" !== intent) throw new Error("Use intent=capture to use client-side capture");
                                    return function(paymentID, payerID, _ref5) {
                                        var _headers3;
                                        return callRestAPI({
                                            accessToken: _ref5.facilitatorAccessToken,
                                            method: "post",
                                            url: "/v1/payments/payment/" + paymentID + "/execute",
                                            headers: (_headers3 = {}, _headers3["paypal-partner-attribution-id"] = _ref5.partnerAttributionID || "", 
                                            _headers3),
                                            data: {
                                                payer_id: payerID
                                            }
                                        });
                                    }(paymentID, payerID, {
                                        facilitatorAccessToken: facilitatorAccessToken,
                                        buyerAccessToken: buyerAccessToken,
                                        partnerAttributionID: partnerAttributionID
                                    }).finally(get.reset).finally(execute.reset).catch(handleProcessorError);
                                }));
                            }
                        }({
                            intent: intent,
                            orderID: orderID,
                            paymentID: paymentID,
                            payerID: payerID,
                            subscriptionID: subscriptionID,
                            restart: restart,
                            facilitatorAccessToken: facilitatorAccessToken,
                            buyerAccessToken: buyerAccessToken,
                            partnerAttributionID: partnerAttributionID,
                            forceRestAPI: forceRestAPI
                        });
                        return {
                            order: order,
                            payment: null,
                            subscription: {
                                get: getSubscriptionApi,
                                activate: activateSubscriptionApi
                            },
                            restart: restart,
                            redirect: function(url) {
                                if (!url) throw new Error("Expected redirect url");
                                if (-1 === url.indexOf("://")) {
                                    getLogger().warn("redir_url_non_scheme", {
                                        url: url
                                    }).flush();
                                    throw new Error("Invalid redirect url: " + url + " - must be fully qualified url");
                                }
                                url.match(/^https?:\/\//) || getLogger().warn("redir_url_non_http", {
                                    url: url
                                }).flush();
                                return dom_redirect(url, window.top);
                            }
                        };
                    }({
                        orderID: orderID,
                        paymentID: paymentID,
                        payerID: payerID,
                        intent: intent,
                        restart: restart,
                        subscriptionID: subscriptionID,
                        facilitatorAccessToken: facilitatorAccessToken,
                        buyerAccessToken: buyerAccessToken,
                        partnerAttributionID: partnerAttributionID,
                        forceRestAPI: forceRestAPI
                    });
                    return onApprove(data, actions).catch((function(err) {
                        return promise_ZalgoPromise.try((function() {
                            return onError(err);
                        })).then((function() {
                            throw err;
                        }));
                    }));
                }));
            }));
        }
        function getOnCancel(_ref2, _ref3) {
            var _ref2$onCancel = _ref2.onCancel, onCancel = void 0 === _ref2$onCancel ? promiseNoop : _ref2$onCancel, onError = _ref2.onError;
            var createOrder = _ref3.createOrder;
            return memoize((function() {
                return createOrder().then((function(orderID) {
                    var _getLogger$info$track;
                    getLogger().info("button_cancel").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_cancel", 
                    _getLogger$info$track.token = orderID, _getLogger$info$track)).flush();
                    return onCancel({
                        orderID: {
                            orderID: orderID
                        }.orderID
                    }, {
                        redirect: function(url) {
                            if (!url) throw new Error("Expected redirect url");
                            if (-1 === url.indexOf("://")) {
                                getLogger().warn("redir_url_non_scheme", {
                                    url: url
                                }).flush();
                                throw new Error("Invalid redirect url: " + url + " - must be fully qualified url");
                            }
                            url.match(/^https?:\/\//) || getLogger().warn("redir_url_non_http", {
                                url: url
                            }).flush();
                            return dom_redirect(url, window.top);
                        }
                    });
                })).catch((function(err) {
                    return onError(err);
                }));
            }));
        }
        var hooks_module_t, hooks_module_r, hooks_module_u, hooks_module_i = [], hooks_module_o = preact_module_n.__r, hooks_module_f = preact_module_n.diffed, hooks_module_c = preact_module_n.__c, hooks_module_e = preact_module_n.unmount;
        function hooks_module_a(t) {
            preact_module_n.__h && preact_module_n.__h(hooks_module_r);
            var u = hooks_module_r.__H || (hooks_module_r.__H = {
                __: [],
                __h: []
            });
            return t >= u.__.length && u.__.push({}), u.__[t];
        }
        function hooks_module_v(n) {
            return function(n, u, i) {
                var o = hooks_module_a(hooks_module_t++);
                return o.__c || (o.__c = hooks_module_r, o.__ = [ hooks_module_x(void 0, u), function(t) {
                    var r = n(o.__[0], t);
                    o.__[0] !== r && (o.__[0] = r, o.__c.setState({}));
                } ]), o.__;
            }(hooks_module_x, n);
        }
        function hooks_module_p(n, u) {
            var i = hooks_module_a(hooks_module_t++);
            (function(n, t) {
                return !n || t.some((function(t, r) {
                    return t !== n[r];
                }));
            })(i.__H, u) && (i.__ = n, i.__H = u, hooks_module_r.__H.__h.push(i));
        }
        function hooks_module_F() {
            hooks_module_i.some((function(t) {
                if (t.__P) try {
                    t.__H.__h.forEach(hooks_module_), t.__H.__h.forEach(hooks_module_g), t.__H.__h = [];
                } catch (r) {
                    return preact_module_n.__e(r, t.__v), !0;
                }
            })), hooks_module_i = [];
        }
        function hooks_module_(n) {
            n.t && n.t();
        }
        function hooks_module_g(n) {
            var t = n.__();
            "function" == typeof t && (n.t = t);
        }
        function hooks_module_x(n, t) {
            return "function" == typeof t ? t(n) : t;
        }
        preact_module_n.__r = function(n) {
            hooks_module_o && hooks_module_o(n), hooks_module_t = 0, (hooks_module_r = n.__c).__H && (hooks_module_r.__H.__h.forEach(hooks_module_), 
            hooks_module_r.__H.__h.forEach(hooks_module_g), hooks_module_r.__H.__h = []);
        }, preact_module_n.diffed = function(t) {
            hooks_module_f && hooks_module_f(t);
            var r = t.__c;
            if (r) {
                var o = r.__H;
                o && o.__h.length && (1 !== hooks_module_i.push(r) && hooks_module_u === preact_module_n.requestAnimationFrame || ((hooks_module_u = preact_module_n.requestAnimationFrame) || function(n) {
                    var t, r = function() {
                        clearTimeout(u), cancelAnimationFrame(t), setTimeout(n);
                    }, u = setTimeout(r, 100);
                    "undefined" != typeof window && (t = requestAnimationFrame(r));
                })(hooks_module_F));
            }
        }, preact_module_n.__c = function(t, r) {
            r.some((function(t) {
                try {
                    t.__h.forEach(hooks_module_), t.__h = t.__h.filter((function(n) {
                        return !n.__ || hooks_module_g(n);
                    }));
                } catch (u) {
                    r.some((function(n) {
                        n.__h && (n.__h = []);
                    })), r = [], preact_module_n.__e(u, t.__v);
                }
            })), hooks_module_c && hooks_module_c(t, r);
        }, preact_module_n.unmount = function(t) {
            hooks_module_e && hooks_module_e(t);
            var r = t.__c;
            if (r) {
                var u = r.__H;
                if (u) try {
                    u.__.forEach((function(n) {
                        return n.t && n.t();
                    }));
                } catch (t) {
                    preact_module_n.__e(t, r.__v);
                }
            }
        };
        var StyleContext = (l = {}, (u = {
            __c: "__cC" + preact_module_f++,
            __: void 0,
            Consumer: function(n, l) {
                return n.children(l);
            },
            Provider: function(n) {
                var i, t = this;
                return this.getChildContext || (i = [], this.getChildContext = function() {
                    return l[u.__c] = t, l;
                }, this.shouldComponentUpdate = function(l) {
                    n.value !== l.value && i.some((function(n) {
                        n.context = l.value, preact_module_k(n);
                    }));
                }, this.sub = function(n) {
                    i.push(n);
                    var l = n.componentWillUnmount;
                    n.componentWillUnmount = function() {
                        i.splice(i.indexOf(n), 1), l && l.call(n);
                    };
                }), n.children;
            }
        }).Consumer.contextType = u, u);
        var l, u;
        var style_StyleSheet = function(_ref) {
            var cspNonce = _ref.cspNonce, _ref$children = _ref.children, children = void 0 === _ref$children ? null : _ref$children;
            var _useState = hooks_module_v({}), styles = _useState[0], setStyles = _useState[1];
            return preact_module_h(StyleContext.Provider, {
                value: {
                    cspNonce: cspNonce,
                    addStyle: function(css) {
                        if (isServer()) {
                            var _extends2;
                            styles = _extends({}, styles, ((_extends2 = {})[css] = (styles[css] || 0) + 1, _extends2));
                        } else setStyles((function(prevState) {
                            var _extends3;
                            return _extends({}, prevState, ((_extends3 = {})[css] = (prevState[css] || 0) + 1, 
                            _extends3));
                        }));
                    },
                    removeStyle: function(css) {
                        if (isServer()) {
                            var _extends4;
                            styles = _extends({}, styles, ((_extends4 = {})[css] = (styles[css] || 0) - 1, _extends4));
                        } else setStyles((function(prevState) {
                            var _extends5;
                            return _extends({}, prevState, ((_extends5 = {})[css] = (prevState[css] || 0) - 1, 
                            _extends5));
                        }));
                    }
                }
            }, children, preact_module_h((function() {
                var styleString = Object.keys(styles).filter((function(style) {
                    return styles[style] > 0;
                })).join("\n");
                return preact_module_h("style", {
                    nonce: cspNonce
                }, styleString);
            }), null));
        };
        var style_Style = function(_ref2) {
            var css = _ref2.css, _ref2$children = _ref2.children, children = void 0 === _ref2$children ? null : _ref2$children;
            var _useContext = function(n) {
                var u = hooks_module_r.context[n.__c];
                if (!u) return n.__;
                var i = hooks_module_a(hooks_module_t++);
                return null == i.__ && (i.__ = !0, u.sub(hooks_module_r)), u.props.value;
            }(StyleContext), addStyle = _useContext.addStyle, removeStyle = _useContext.removeStyle;
            var cssText = css._getCss();
            isServer() ? addStyle(cssText) : hooks_module_p((function() {
                addStyle(cssText);
                return function() {
                    return removeStyle(cssText);
                };
            }), [ cssText ]);
            return children;
        };
        var check_Check = function() {
            return preact_module_h("svg", {
                width: "18px",
                height: "15px",
                viewBox: "0 0 18 15",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg"
            }, preact_module_h("title", null, "Icons/check"), preact_module_h("desc", null, "Created with Sketch."), preact_module_h("g", {
                id: "✅-Icon-Library",
                stroke: "none",
                "stroke-width": "1",
                fill: "none",
                "fill-rule": "evenodd"
            }, preact_module_h("g", {
                id: "Icons/check",
                transform: "translate(-6.000000, -7.000000)",
                fill: "#0070BA",
                "fill-rule": "nonzero"
            }, preact_module_h("path", {
                d: "M11.4121381,19.6994417 L22.6691362,7.6974334 C22.9052747,7.44566678 23.3008,7.43299769 23.5525666,7.6691362 C23.8043332,7.90527472 23.8170023,8.30079998 23.5808638,8.5525666 L11.8567862,21.0525666 C11.6057696,21.3201959 11.1792894,21.315028 10.9348317,21.0413946 L6.40890929,15.9753097 C6.17894091,15.7178949 6.20119062,15.3227928 6.45860541,15.0928244 C6.7160202,14.862856 7.11112232,14.8851057 7.34109071,15.1425205 L11.4121381,19.6994417 Z",
                id: "Path"
            }))));
        };
        var style_scopedscopeId_fdd787a1 = __webpack_require__(2);
        var style_scopedscopeId_fdd787a1_default = __webpack_require__.n(style_scopedscopeId_fdd787a1);
        var walletItem_WalletItem = function(_ref) {
            var selected = _ref.selected, details = _ref.details, selectWalletItemHandler = _ref.selectWalletItemHandler, listOpen = _ref.listOpen, listOpenHandler = _ref.listOpenHandler;
            var _useState = hooks_module_v(selected), showSelected = _useState[0], setShowSelected = _useState[1];
            hooks_module_p((function() {
                setShowSelected(selected);
            }), [ selected ]);
            return preact_module_h(style_Style, {
                css: style_scopedscopeId_fdd787a1_default.a,
                "data-v-fdd787a1": ""
            }, preact_module_h("div", {
                className: "wallet-item " + (selected ? "selected-wallet-item" : ""),
                onClick: function() {
                    return function(item) {
                        selectWalletItemHandler(item);
                        listOpenHandler(!listOpen);
                    }(details.id);
                },
                "data-v-fdd787a1": ""
            }, preact_module_h("div", {
                className: "icon",
                "data-v-fdd787a1": ""
            }, preact_module_h("img", {
                src: details.fundingOptionIcon,
                "data-v-fdd787a1": ""
            })), preact_module_h("div", {
                className: "description",
                "data-v-fdd787a1": ""
            }, preact_module_h("div", {
                className: "name",
                "data-v-fdd787a1": ""
            }, details.fundingOptionTitle), preact_module_h("div", {
                className: "details",
                "data-v-fdd787a1": ""
            }, preact_module_h("span", {
                className: "type",
                "data-v-fdd787a1": ""
            }, details.instrumentSubType, " "), preact_module_h("span", {
                className: "digits",
                "data-v-fdd787a1": ""
            }, details.lastDigits))), details.showPreferredText ? preact_module_h("div", {
                className: "preferred",
                "data-v-fdd787a1": ""
            }, "PREFERRED") : "", preact_module_h("div", {
                className: "flex-spacer",
                "data-v-fdd787a1": ""
            }), showSelected ? preact_module_h("div", {
                className: "selected",
                "data-v-fdd787a1": ""
            }, preact_module_h(check_Check, {
                "data-v-fdd787a1": ""
            })) : ""));
        };
        var style_scopedscopeId_d7b06a5e = __webpack_require__(3);
        var style_scopedscopeId_d7b06a5e_default = __webpack_require__.n(style_scopedscopeId_d7b06a5e);
        var credit_CreditBanner = function() {
            return preact_module_h(style_Style, {
                css: style_scopedscopeId_d7b06a5e_default.a,
                "data-v-d7b06a5e": ""
            }, preact_module_h("div", {
                "data-v-d7b06a5e": ""
            }, "This is where the credit messaging goes..."));
        };
        var buildWalletItemDetails = function(fundingOption) {
            var _fundingOption$fundin = fundingOption.fundingInstrument, image = _fundingOption$fundin.image, name = _fundingOption$fundin.name, issuerProductDescription = _fundingOption$fundin.issuerProductDescription, subType = _fundingOption$fundin.instrumentSubType, digits = _fundingOption$fundin.lastDigits, isPreferred = _fundingOption$fundin.isPreferred;
            return {
                id: fundingOption.id,
                fundingOptionIcon: image ? image.url.href : function(type, name) {
                    var prefix = "https://www.paypalobjects.com/ui-web";
                    switch (type) {
                      case "BANK_ACCOUNT":
                        return prefix + "/money-icons/bank/generic_bank.png";

                      case "PAYPAL_CREDIT":
                        switch (name) {
                          case "EBAY_MASTERCARD":
                            return prefix + "/money-icons/card/ebay_mastercard.png";

                          case "PAYPAL_EXTRAS_MASTERCARD":
                            return prefix + "/money-icons/card/extrasMastercardLogo.svg";

                          default:
                            return prefix + "/wallet-icons/bank/PP_Credit_large.svg";
                        }

                      default:
                        return prefix + "/wallet-icons/bank/PP_Balance_large.svg";
                    }
                }(_fundingOption$fundin.type, name),
                fundingOptionTitle: "PAYPAL" === subType ? "PayPal Credit" : issuerProductDescription || name,
                instrumentSubType: "PAYPAL" === subType ? "Pay overtime for your purchase" : subType,
                showPreferredText: isPreferred,
                lastDigits: "PAYPAL" === subType ? "" : "•••• " + (digits || "")
            };
        };
        var style_scopedscopeId_d2ff3bcf = __webpack_require__(4);
        var style_scopedscopeId_d2ff3bcf_default = __webpack_require__.n(style_scopedscopeId_d2ff3bcf);
        var wallet_Wallet = function(_ref) {
            var checkoutSession = _ref.checkoutSession;
            var fundingOptions = checkoutSession.fundingOptions, _useState = hooks_module_v(!1), listOpen = _useState[0], setListOpen = _useState[1], _useState2 = hooks_module_v(fundingOptions[0]), selectedWalletItem = _useState2[0], setSelectedWalletItem = _useState2[1];
            var changeSelectedWalletItem = function(itemId) {
                var newItem = fundingOptions.find((function(option) {
                    return option.id === itemId;
                }));
                setSelectedWalletItem(newItem);
            };
            return preact_module_h(style_Style, {
                css: style_scopedscopeId_d2ff3bcf_default.a,
                "data-v-d2ff3bcf": ""
            }, preact_module_h("div", {
                className: "wallet",
                "data-v-d2ff3bcf": ""
            }, listOpen ? "" : preact_module_h(walletItem_WalletItem, {
                selected: !0,
                details: buildWalletItemDetails(selectedWalletItem),
                selectWalletItemHandler: changeSelectedWalletItem,
                listOpen: listOpen,
                listOpenHandler: setListOpen,
                "data-v-d2ff3bcf": ""
            }), listOpen ? preact_module_h("div", {
                "data-v-d2ff3bcf": ""
            }, fundingOptions.map((function(option) {
                return preact_module_h(walletItem_WalletItem, {
                    selected: option.id === selectedWalletItem.id,
                    details: buildWalletItemDetails(option),
                    selectWalletItemHandler: changeSelectedWalletItem,
                    listOpen: listOpen,
                    listOpenHandler: setListOpen,
                    "data-v-d2ff3bcf": ""
                });
            })), preact_module_h(credit_CreditBanner, {
                checkoutSession: checkoutSession,
                "data-v-d2ff3bcf": ""
            }), preact_module_h("div", {
                className: "add-card-button",
                "data-v-d2ff3bcf": ""
            }, preact_module_h("a", {
                href: "#",
                "data-v-d2ff3bcf": ""
            }, "Add debit or credit card"))) : ""));
        };
        var page_style = __webpack_require__(5);
        var style_default = __webpack_require__.n(page_style);
        var page_Page = function(_ref) {
            return preact_module_h(style_Style, {
                css: style_default.a
            }, preact_module_h(wallet_Wallet, {
                checkoutSession: _ref.checkoutSession
            }));
        };
        function fallbackToWebCheckout() {
            throw new Error("Not implemented");
        }
        function App(_ref4) {
            return preact_module_h(style_StyleSheet, {
                cspNonce: _ref4.cspNonce
            }, preact_module_h(page_Page, {
                checkoutSession: _ref4.checkoutSession
            }));
        }
        function renderWallet(props) {
            return index_module(preact_module_h(App, props));
        }
        function setupWallet(_ref5) {
            var buyerAccessToken = _ref5.buyerAccessToken, cspNonce = _ref5.cspNonce, checkoutSession = _ref5.checkoutSession;
            !function(props, _ref3) {
                var checkoutSession = _ref3.checkoutSession, buyerAccessToken = _ref3.buyerAccessToken;
                (0, props.setup)({}, {
                    submit: function() {
                        return function(props, _ref) {
                            var buyerAccessToken = _ref.buyerAccessToken;
                            var onApprove = props.onApprove;
                            var planID = _ref.checkoutSession.fundingOptions[0].allPlans[0].id;
                            return (0, props.createOrder)().then((function(orderID) {
                                return callGraphQL({
                                    query: "\n            mutation ApproveOrder(\n                $orderID : String!\n                $planID : String!\n            ) {\n                approvePayment(\n                    token: $orderID\n                    selectedPlanId: $planID\n                ) {\n                    buyer {\n                        userId\n                    }\n                }\n            }\n        ",
                                    variables: {
                                        orderID: (_ref10 = {
                                            orderID: orderID,
                                            planID: planID,
                                            buyerAccessToken: buyerAccessToken
                                        }).orderID,
                                        planID: _ref10.planID
                                    },
                                    headers: (_headers9 = {}, _headers9["x-paypal-internal-euat"] = _ref10.buyerAccessToken, 
                                    _headers9)
                                }).then((function(_ref11) {
                                    return {
                                        payerID: _ref11.approvePayment.buyer.userId
                                    };
                                }));
                                var _ref10, _headers9;
                            })).then((function(_ref2) {
                                return onApprove({
                                    payerID: _ref2.payerID
                                }, {
                                    restart: fallbackToWebCheckout
                                });
                            }));
                        }(props, {
                            checkoutSession: checkoutSession,
                            buyerAccessToken: buyerAccessToken
                        });
                    }
                });
            }((_ref = {
                facilitatorAccessToken: _ref5.facilitatorAccessToken
            }, facilitatorAccessToken = _ref.facilitatorAccessToken, xprops = function() {
                if (window.xprops) return window.xprops;
                throw new Error("No xprops found");
            }(), env = xprops.env, vault = xprops.vault, commit = xprops.commit, locale = xprops.locale, 
            platform = xprops.platform, sessionID = xprops.sessionID, intent = xprops.intent, 
            walletSessionID = xprops.walletSessionID, clientID = xprops.clientID, partnerAttributionID = xprops.partnerAttributionID, 
            correlationID = xprops.correlationID, getParentDomain = xprops.getParentDomain, 
            clientAccessToken = xprops.clientAccessToken, getPageUrl = xprops.getPageUrl, rememberFunding = xprops.remember, 
            onError = xprops.onError, stageHost = xprops.stageHost, apiStageHost = xprops.apiStageHost, 
            style = xprops.style, getParent = xprops.getParent, currency = xprops.currency, 
            merchantID = xprops.merchantID, _xprops$setup = xprops.setup, setup = void 0 === _xprops$setup ? promiseNoop : _xprops$setup, 
            merchantDomain = "function" == typeof getParentDomain ? getParentDomain() : "unknown", 
            createOrder = getCreateOrder({
                createOrder: xprops.createOrder,
                currency: currency,
                intent: intent,
                merchantID: merchantID,
                partnerAttributionID: partnerAttributionID
            }, {
                facilitatorAccessToken: facilitatorAccessToken
            }), {
                env: env,
                style: style,
                locale: locale,
                sessionID: sessionID,
                walletSessionID: walletSessionID,
                clientID: clientID,
                partnerAttributionID: partnerAttributionID,
                correlationID: correlationID,
                platform: platform,
                currency: currency,
                commit: commit,
                vault: vault,
                merchantDomain: merchantDomain,
                getPageUrl: getPageUrl,
                rememberFunding: rememberFunding,
                getParent: getParent,
                setup: setup,
                clientAccessToken: clientAccessToken,
                onError: onError,
                stageHost: stageHost,
                apiStageHost: apiStageHost,
                createOrder: createOrder,
                onApprove: getOnApprove({
                    onApprove: xprops.onApprove,
                    intent: intent,
                    onError: onError,
                    partnerAttributionID: partnerAttributionID,
                    upgradeLSAT: !1
                }, {
                    facilitatorAccessToken: facilitatorAccessToken,
                    createOrder: createOrder
                }),
                onCancel: getOnCancel({
                    onCancel: xprops.onCancel,
                    onError: onError
                }, {
                    facilitatorAccessToken: facilitatorAccessToken,
                    createOrder: createOrder
                })
            }), {
                checkoutSession: checkoutSession,
                buyerAccessToken: buyerAccessToken
            });
            var _ref, facilitatorAccessToken, xprops, env, vault, commit, locale, platform, sessionID, intent, walletSessionID, clientID, partnerAttributionID, correlationID, getParentDomain, clientAccessToken, getPageUrl, rememberFunding, onError, stageHost, apiStageHost, style, getParent, currency, merchantID, _xprops$setup, setup, merchantDomain, createOrder;
            !function(l, u, i) {
                var t, o, f;
                preact_module_n.__ && preact_module_n.__(l, u), o = (t = i === preact_module_r) ? null : u.__k, 
                l = preact_module_h(preact_module_d, null, [ l ]), f = [], preact_module_A(u, u.__k = l, o || e, e, void 0 !== u.ownerSVGElement, o ? null : c.slice.call(u.childNodes), f, e, t), 
                preact_module_T(f, l);
            }(preact_module_h(App, {
                cspNonce: cspNonce,
                checkoutSession: checkoutSession
            }), function() {
                var body = document.body;
                if (!body) throw new Error("Document body not found");
                return body;
            }().querySelector("#wallet-container"));
        }
    } ]);
}));
//# sourceMappingURL=smart-wallet.js.map