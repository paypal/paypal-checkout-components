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
    return __webpack_require__(__webpack_require__.s = 0);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, "setupMenu", (function() {
        return setupMenu;
    }));
    var preact_module_n, l, preact_module_u, preact_module_t, preact_module_o, f = {}, e = [], c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function s(n, l) {
        for (var u in l) n[u] = l[u];
        return n;
    }
    function preact_module_a(n) {
        var l = n.parentNode;
        l && l.removeChild(n);
    }
    function h(l, u, i) {
        var t, o, r, f = {};
        for (r in u) "key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
        if (arguments.length > 2 && (f.children = arguments.length > 3 ? preact_module_n.call(arguments, 2) : i), 
        "function" == typeof l && null != l.defaultProps) for (r in l.defaultProps) void 0 === f[r] && (f[r] = l.defaultProps[r]);
        return v(l, f, t, o, null);
    }
    function v(n, i, t, o, r) {
        var f = {
            type: n,
            props: i,
            key: t,
            ref: o,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: null == r ? ++preact_module_u : r
        };
        return null == r && null != l.vnode && l.vnode(f), f;
    }
    function p(n) {
        return n.children;
    }
    function d(n, l) {
        this.props = n, this.context = l;
    }
    function _(n, l) {
        if (null == l) return n.__ ? _(n.__, n.__.__k.indexOf(n) + 1) : null;
        for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
        return "function" == typeof n.type ? _(n) : null;
    }
    function k(n) {
        var l, u;
        if (null != (n = n.__) && null != n.__c) {
            for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
                n.__e = n.__c.base = u.__e;
                break;
            }
            return k(n);
        }
    }
    function b(n) {
        (!n.__d && (n.__d = !0) && preact_module_t.push(n) && !g.__r++ || preact_module_o !== l.debounceRendering) && ((preact_module_o = l.debounceRendering) || setTimeout)(g);
    }
    function g() {
        for (var n; g.__r = preact_module_t.length; ) n = preact_module_t.sort((function(n, l) {
            return n.__v.__b - l.__v.__b;
        })), preact_module_t = [], n.some((function(n) {
            var l, u, i, t, o, r;
            n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = s({}, t)).__v = t.__v + 1, 
            j(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [ o ] : null, u, null == o ? _(t) : o, t.__h), 
            z(u, t), t.__e != o && k(t)));
        }));
    }
    function w(n, l, u, i, t, o, r, c, s, a) {
        var h, y, d, k, b, g, w, x = i && i.__k || e, C = x.length;
        for (u.__k = [], h = 0; h < l.length; h++) if (null != (k = u.__k[h] = null == (k = l[h]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k || "bigint" == typeof k ? v(null, k, null, null, k) : Array.isArray(k) ? v(p, {
            children: k
        }, null, null, null) : k.__b > 0 ? v(k.type, k.props, k.key, k.ref ? k.ref : null, k.__v) : k)) {
            if (k.__ = u, k.__b = u.__b + 1, null === (d = x[h]) || d && k.key == d.key && k.type === d.type) x[h] = void 0; else for (y = 0; y < C; y++) {
                if ((d = x[y]) && k.key == d.key && k.type === d.type) {
                    x[y] = void 0;
                    break;
                }
                d = null;
            }
            j(n, k, d = d || f, t, o, r, c, s, a), b = k.__e, (y = k.ref) && d.ref != y && (w || (w = []), 
            d.ref && w.push(d.ref, null, k), w.push(y, k.__c || b, k)), null != b ? (null == g && (g = b), 
            "function" == typeof k.type && k.__k === d.__k ? k.__d = s = m(k, s, n) : s = A(n, k, d, x, b, s), 
            "function" == typeof u.type && (u.__d = s)) : s && d.__e == s && s.parentNode != n && (s = _(d));
        }
        for (u.__e = g, h = C; h--; ) null != x[h] && ("function" == typeof u.type && null != x[h].__e && x[h].__e == u.__d && (u.__d = _(i, h + 1)), 
        N(x[h], x[h]));
        if (w) for (h = 0; h < w.length; h++) M(w[h], w[++h], w[++h]);
    }
    function m(n, l, u) {
        for (var i, t = n.__k, o = 0; t && o < t.length; o++) (i = t[o]) && (i.__ = n, l = "function" == typeof i.type ? m(i, l, u) : A(u, i, i, t, i.__e, l));
        return l;
    }
    function A(n, l, u, i, t, o) {
        var r, f, e;
        if (void 0 !== l.__d) r = l.__d, l.__d = void 0; else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), 
        r = null; else {
            for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2) if (f == t) break n;
            n.insertBefore(t, o), r = o;
        }
        return void 0 !== r ? r : t.nextSibling;
    }
    function $(n, l, u) {
        "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || c.test(l) ? u : u + "px";
    }
    function H(n, l, u, i, t) {
        var o;
        n: if ("style" === l) if ("string" == typeof u) n.style.cssText = u; else {
            if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) u && l in u || $(n.style, l, "");
            if (u) for (l in u) i && u[l] === i[l] || $(n.style, l, u[l]);
        } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), 
        l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), 
        n.l[l + o] = u, u ? i || n.addEventListener(l, o ? T : I, o) : n.removeEventListener(l, o ? T : I, o); else if ("dangerouslySetInnerHTML" !== l) {
            if (t) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s"); else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
                n[l] = null == u ? "" : u;
                break n;
            } catch (n) {}
            "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
        }
    }
    function I(n) {
        this.l[n.type + !1](l.event ? l.event(n) : n);
    }
    function T(n) {
        this.l[n.type + !0](l.event ? l.event(n) : n);
    }
    function j(n, u, i, t, o, r, f, e, c) {
        var a, h, v, y, _, k, b, g, m, x, A, C, $, H = u.type;
        if (void 0 !== u.constructor) return null;
        null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, r = [ e ]), (a = l.__b) && a(u);
        try {
            n: if ("function" == typeof H) {
                if (g = u.props, m = (a = H.contextType) && t[a.__c], x = a ? m ? m.props.value : a.__ : t, 
                i.__c ? b = (h = u.__c = i.__c).__ = h.__E : ("prototype" in H && H.prototype.render ? u.__c = h = new H(g, x) : (u.__c = h = new d(g, x), 
                h.constructor = H, h.render = O), m && m.sub(h), h.props = g, h.state || (h.state = {}), 
                h.context = x, h.__n = t, v = h.__d = !0, h.__h = []), null == h.__s && (h.__s = h.state), 
                null != H.getDerivedStateFromProps && (h.__s == h.state && (h.__s = s({}, h.__s)), 
                s(h.__s, H.getDerivedStateFromProps(g, h.__s))), y = h.props, _ = h.state, v) null == H.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), 
                null != h.componentDidMount && h.__h.push(h.componentDidMount); else {
                    if (null == H.getDerivedStateFromProps && g !== y && null != h.componentWillReceiveProps && h.componentWillReceiveProps(g, x), 
                    !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(g, h.__s, x) || u.__v === i.__v) {
                        h.props = g, h.state = h.__s, u.__v !== i.__v && (h.__d = !1), h.__v = u, u.__e = i.__e, 
                        u.__k = i.__k, u.__k.forEach((function(n) {
                            n && (n.__ = u);
                        })), h.__h.length && f.push(h);
                        break n;
                    }
                    null != h.componentWillUpdate && h.componentWillUpdate(g, h.__s, x), null != h.componentDidUpdate && h.__h.push((function() {
                        h.componentDidUpdate(y, _, k);
                    }));
                }
                if (h.context = x, h.props = g, h.__v = u, h.__P = n, A = l.__r, C = 0, "prototype" in H && H.prototype.render) h.state = h.__s, 
                h.__d = !1, A && A(u), a = h.render(h.props, h.state, h.context); else do {
                    h.__d = !1, A && A(u), a = h.render(h.props, h.state, h.context), h.state = h.__s;
                } while (h.__d && ++C < 25);
                h.state = h.__s, null != h.getChildContext && (t = s(s({}, t), h.getChildContext())), 
                v || null == h.getSnapshotBeforeUpdate || (k = h.getSnapshotBeforeUpdate(y, _)), 
                $ = null != a && a.type === p && null == a.key ? a.props.children : a, w(n, Array.isArray($) ? $ : [ $ ], u, i, t, o, r, f, e, c), 
                h.base = u.__e, u.__h = null, h.__h.length && f.push(h), b && (h.__E = h.__ = null), 
                h.__e = !1;
            } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = L(i.__e, u, i, t, o, r, f, c);
            (a = l.diffed) && a(u);
        } catch (n) {
            u.__v = null, (c || null != r) && (u.__e = e, u.__h = !!c, r[r.indexOf(e)] = null), 
            l.__e(n, u, i);
        }
    }
    function z(n, u) {
        l.__c && l.__c(u, n), n.some((function(u) {
            try {
                n = u.__h, u.__h = [], n.some((function(n) {
                    n.call(u);
                }));
            } catch (n) {
                l.__e(n, u.__v);
            }
        }));
    }
    function L(l, u, i, t, o, r, e, c) {
        var s, h, v, y = i.props, p = u.props, d = u.type, k = 0;
        if ("svg" === d && (o = !0), null != r) for (;k < r.length; k++) if ((s = r[k]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
            l = s, r[k] = null;
            break;
        }
        if (null == l) {
            if (null === d) return document.createTextNode(p);
            l = o ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), 
            r = null, c = !1;
        }
        if (null === d) y === p || c && l.data === p || (l.data = p); else {
            if (r = r && preact_module_n.call(l.childNodes), h = (y = i.props || f).dangerouslySetInnerHTML, 
            v = p.dangerouslySetInnerHTML, !c) {
                if (null != r) for (y = {}, k = 0; k < l.attributes.length; k++) y[l.attributes[k].name] = l.attributes[k].value;
                (v || h) && (v && (h && v.__html == h.__html || v.__html === l.innerHTML) || (l.innerHTML = v && v.__html || ""));
            }
            if (function(n, l, u, i, t) {
                var o;
                for (o in u) "children" === o || "key" === o || o in l || H(n, o, null, u[o], i);
                for (o in l) t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || H(n, o, l[o], u[o], i);
            }(l, p, y, o, c), v) u.__k = []; else if (k = u.props.children, w(l, Array.isArray(k) ? k : [ k ], u, i, t, o && "foreignObject" !== d, r, e, r ? r[0] : i.__k && _(i, 0), c), 
            null != r) for (k = r.length; k--; ) null != r[k] && preact_module_a(r[k]);
            c || ("value" in p && void 0 !== (k = p.value) && (k !== l.value || "progress" === d && !k || "option" === d && k !== y.value) && H(l, "value", k, y.value, !1), 
            "checked" in p && void 0 !== (k = p.checked) && k !== l.checked && H(l, "checked", k, y.checked, !1));
        }
        return l;
    }
    function M(n, u, i) {
        try {
            "function" == typeof n ? n(u) : n.current = u;
        } catch (n) {
            l.__e(n, i);
        }
    }
    function N(n, u, i) {
        var t, o;
        if (l.unmount && l.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || M(t, null, u)), 
        null != (t = n.__c)) {
            if (t.componentWillUnmount) try {
                t.componentWillUnmount();
            } catch (n) {
                l.__e(n, u);
            }
            t.base = t.__P = null, n.__c = void 0;
        }
        if (t = n.__k) for (o = 0; o < t.length; o++) t[o] && N(t[o], u, "function" != typeof n.type);
        i || null == n.__e || preact_module_a(n.__e), n.__ = n.__e = n.__d = void 0;
    }
    function O(n, l, u) {
        return this.constructor(n, u);
    }
    preact_module_n = e.slice, l = {
        __e: function(n, l, u, i) {
            for (var t, o, r; l = l.__; ) if ((t = l.__c) && !t.__) try {
                if ((o = t.constructor) && null != o.getDerivedStateFromError && (t.setState(o.getDerivedStateFromError(n)), 
                r = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), r = t.__d), 
                r) return t.__E = t;
            } catch (l) {
                n = l;
            }
            throw n;
        }
    }, preact_module_u = 0, d.prototype.setState = function(n, l) {
        var u;
        u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), 
        "function" == typeof n && (n = n(s({}, u), this.props)), n && s(u, n), null != n && this.__v && (l && this.__h.push(l), 
        b(this));
    }, d.prototype.forceUpdate = function(n) {
        this.__v && (this.__e = !0, n && this.__h.push(n), b(this));
    }, d.prototype.render = p, preact_module_t = [], g.__r = 0;
    var hooks_module_r, hooks_module_u, hooks_module_i, hooks_module_o, hooks_module_f = 0, hooks_module_c = [], hooks_module_e = [], hooks_module_a = l.__b, hooks_module_v = l.__r, hooks_module_l = l.diffed, hooks_module_m = l.__c, hooks_module_d = l.unmount;
    function hooks_module_p(t, r) {
        l.__h && l.__h(hooks_module_u, t, hooks_module_f || r), hooks_module_f = 0;
        var i = hooks_module_u.__H || (hooks_module_u.__H = {
            __: [],
            __h: []
        });
        return t >= i.__.length && i.__.push({
            __V: hooks_module_e
        }), i.__[t];
    }
    function hooks_module_y(n) {
        return hooks_module_f = 1, function(n, t, i) {
            var o = hooks_module_p(hooks_module_r++, 2);
            if (o.t = n, !o.__c && (o.__ = [ hooks_module_C(void 0, t), function(n) {
                var t = o.__N ? o.__N[0] : o.__[0], r = o.t(t, n);
                t !== r && (o.__N = [ r, o.__[1] ], o.__c.setState({}));
            } ], o.__c = hooks_module_u, !hooks_module_u.u)) {
                hooks_module_u.u = !0;
                var f = hooks_module_u.shouldComponentUpdate;
                hooks_module_u.shouldComponentUpdate = function(n, t, r) {
                    if (!o.__c.__H) return !0;
                    var u = o.__c.__H.__.filter((function(n) {
                        return n.__c;
                    }));
                    if (u.every((function(n) {
                        return !n.__N;
                    }))) return !f || f.call(this, n, t, r);
                    var i = !1;
                    return u.forEach((function(n) {
                        if (n.__N) {
                            var t = n.__[0];
                            n.__ = n.__N, n.__N = void 0, t !== n.__[0] && (i = !0);
                        }
                    })), !!i && (!f || f.call(this, n, t, r));
                };
            }
            return o.__N || o.__;
        }(hooks_module_C, n);
    }
    function hooks_module_s(t, i) {
        var o = hooks_module_p(hooks_module_r++, 3);
        !l.__s && hooks_module_B(o.__H, i) && (o.__ = t, o.i = i, hooks_module_u.__H.__h.push(o));
    }
    function hooks_module_g() {
        for (var t; t = hooks_module_c.shift(); ) if (t.__P && t.__H) try {
            t.__H.__h.forEach(hooks_module_w), t.__H.__h.forEach(hooks_module_z), t.__H.__h = [];
        } catch (r) {
            t.__H.__h = [], l.__e(r, t.__v);
        }
    }
    l.__b = function(n) {
        "function" != typeof n.type || n.o || n.type === p ? n.o || (n.o = n.__ && n.__.o ? n.__.o : "") : n.o = (n.__ && n.__.o ? n.__.o : "") + (n.__ && n.__.__k ? n.__.__k.indexOf(n) : 0), 
        hooks_module_u = null, hooks_module_a && hooks_module_a(n);
    }, l.__r = function(n) {
        hooks_module_v && hooks_module_v(n), hooks_module_r = 0;
        var t = (hooks_module_u = n.__c).__H;
        t && (hooks_module_i === hooks_module_u ? (t.__h = [], hooks_module_u.__h = [], 
        t.__.forEach((function(n) {
            n.__N && (n.__ = n.__N), n.__V = hooks_module_e, n.__N = n.i = void 0;
        }))) : (t.__h.forEach(hooks_module_w), t.__h.forEach(hooks_module_z), t.__h = [])), 
        hooks_module_i = hooks_module_u;
    }, l.diffed = function(t) {
        hooks_module_l && hooks_module_l(t);
        var r = t.__c;
        r && r.__H && (r.__H.__h.length && (1 !== hooks_module_c.push(r) && hooks_module_o === l.requestAnimationFrame || ((hooks_module_o = l.requestAnimationFrame) || hooks_module_k)(hooks_module_g)), 
        r.__H.__.forEach((function(n) {
            n.i && (n.__H = n.i), n.__V !== hooks_module_e && (n.__ = n.__V), n.i = void 0, 
            n.__V = hooks_module_e;
        }))), hooks_module_i = hooks_module_u = null;
    }, l.__c = function(t, r) {
        r.some((function(t) {
            try {
                t.__h.forEach(hooks_module_w), t.__h = t.__h.filter((function(n) {
                    return !n.__ || hooks_module_z(n);
                }));
            } catch (u) {
                r.some((function(n) {
                    n.__h && (n.__h = []);
                })), r = [], l.__e(u, t.__v);
            }
        })), hooks_module_m && hooks_module_m(t, r);
    }, l.unmount = function(t) {
        hooks_module_d && hooks_module_d(t);
        var r, u = t.__c;
        u && u.__H && (u.__H.__.forEach((function(n) {
            try {
                hooks_module_w(n);
            } catch (n) {
                r = n;
            }
        })), u.__H = void 0, r && l.__e(r, u.__v));
    };
    var hooks_module_j = "function" == typeof requestAnimationFrame;
    function hooks_module_k(n) {
        var t, r = function() {
            clearTimeout(u), hooks_module_j && cancelAnimationFrame(t), setTimeout(n);
        }, u = setTimeout(r, 100);
        hooks_module_j && (t = requestAnimationFrame(r));
    }
    function hooks_module_w(n) {
        var t = hooks_module_u, r = n.__c;
        "function" == typeof r && (n.__c = void 0, r()), hooks_module_u = t;
    }
    function hooks_module_z(n) {
        var t = hooks_module_u;
        n.__c = n.__(), hooks_module_u = t;
    }
    function hooks_module_B(n, t) {
        return !n || n.length !== t.length || t.some((function(t, r) {
            return t !== n[r];
        }));
    }
    function hooks_module_C(n, t) {
        return "function" == typeof t ? t(n) : t;
    }
    function _setPrototypeOf(o, p) {
        return (_setPrototypeOf = Object.setPrototypeOf || function(o, p) {
            o.__proto__ = p;
            return o;
        })(o, p);
    }
    function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        _setPrototypeOf(subClass, superClass);
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
                        var promiseResult = _result2;
                        promiseResult.resolved ? promise.resolve(promiseResult.value) : promise.reject(promiseResult.error);
                        promiseResult.errorHandled = !0;
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
        _proto.lazy = function() {
            this.errorHandled = !0;
            return this;
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
            var results = [].slice();
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
            var awaitPromises = [];
            var _loop = function(key) {
                if (promises.hasOwnProperty(key)) {
                    var value = promises[key];
                    utils_isPromise(value) ? awaitPromises.push(value.then((function(res) {
                        result[key] = res;
                    }))) : result[key] = value;
                }
            };
            for (var key in promises) _loop(key);
            return ZalgoPromise.all(awaitPromises).then((function() {
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
    var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
    function getActualProtocol(win) {
        void 0 === win && (win = window);
        return win.location.protocol;
    }
    function getProtocol(win) {
        void 0 === win && (win = window);
        if (win.mockDomain) {
            var protocol = win.mockDomain.split("//")[0];
            if (protocol) return protocol;
        }
        return getActualProtocol(win);
    }
    function isAboutProtocol(win) {
        void 0 === win && (win = window);
        return "about:" === getProtocol(win);
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
        var protocol = getActualProtocol(win);
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
    function isSameDomain(win) {
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
                if (function(win) {
                    void 0 === win && (win = window);
                    return "mock:" === getProtocol(win);
                }(win) && canReadFromWindow()) return !0;
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
    }
    function assertSameDomain(win) {
        if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
        return win;
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
        if (allowMock && isSameDomain(win)) try {
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
        try {
            if ("postMessage" in obj && "self" in obj && "location" in obj) return !0;
        } catch (err) {}
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
    function _getPrototypeOf(o) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        })(o);
    }
    function _isNativeReflectConstruct() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            Date.prototype.toString.call(Reflect.construct(Date, [], (function() {})));
            return !0;
        } catch (e) {
            return !1;
        }
    }
    function construct_construct(Parent, args, Class) {
        return (construct_construct = _isNativeReflectConstruct() ? Reflect.construct : function(Parent, args, Class) {
            var a = [ null ];
            a.push.apply(a, args);
            var instance = new (Function.bind.apply(Parent, a));
            Class && _setPrototypeOf(instance, Class.prototype);
            return instance;
        }).apply(null, arguments);
    }
    function wrapNativeSuper_wrapNativeSuper(Class) {
        var _cache = "function" == typeof Map ? new Map : void 0;
        return (wrapNativeSuper_wrapNativeSuper = function(Class) {
            if (null === Class || !(fn = Class, -1 !== Function.toString.call(fn).indexOf("[native code]"))) return Class;
            var fn;
            if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== _cache) {
                if (_cache.has(Class)) return _cache.get(Class);
                _cache.set(Class, Wrapper);
            }
            function Wrapper() {
                return construct_construct(Class, arguments, _getPrototypeOf(this).constructor);
            }
            Wrapper.prototype = Object.create(Class.prototype, {
                constructor: {
                    value: Wrapper,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
            return _setPrototypeOf(Wrapper, Class);
        })(Class);
    }
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
    function uniqueID() {
        var chars = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, (function() {
            return chars.charAt(Math.floor(Math.random() * chars.length));
        })) + "_" + function(str) {
            if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            }))).replace(/[=]/g, "");
            if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64").replace(/[=]/g, "");
            throw new Error("Can not find window.btoa or Buffer");
        }((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
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
                        uid = typeof obj + ":" + uniqueID();
                        objectIDs.set(obj, uid);
                    }
                    return uid;
                }(val) + "]" : function(element) {
                    var passed = !1;
                    try {
                        (element instanceof window.Element || null !== element && "object" == typeof element && 1 === element.nodeType && "object" == typeof element.style && "object" == typeof element.ownerDocument) && (passed = !0);
                    } catch (_) {}
                    return passed;
                }(val) ? {} : val;
            }));
        } catch (err) {
            throw new Error("Arguments not serializable -- can not be used to memoize");
        }
    }
    function getEmptyObject() {
        return {};
    }
    var memoizeGlobalIndex = 0;
    var memoizeGlobalIndexValidFrom = 0;
    function memoize(method, options) {
        void 0 === options && (options = {});
        var _options$thisNamespac = options.thisNamespace, thisNamespace = void 0 !== _options$thisNamespac && _options$thisNamespac, cacheTime = options.time;
        var simpleCache;
        var thisCache;
        var memoizeIndex = memoizeGlobalIndex;
        memoizeGlobalIndex += 1;
        var memoizedFunction = function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            if (memoizeIndex < memoizeGlobalIndexValidFrom) {
                simpleCache = null;
                thisCache = null;
                memoizeIndex = memoizeGlobalIndex;
                memoizeGlobalIndex += 1;
            }
            var cache;
            cache = thisNamespace ? (thisCache = thisCache || new weakmap_CrossDomainSafeWeakMap).getOrSet(this, getEmptyObject) : simpleCache = simpleCache || {};
            var cacheKey;
            try {
                cacheKey = serializeArgs(args);
            } catch (_unused) {
                return method.apply(this, arguments);
            }
            var cacheResult = cache[cacheKey];
            if (cacheResult && cacheTime && Date.now() - cacheResult.time < cacheTime) {
                delete cache[cacheKey];
                cacheResult = null;
            }
            if (cacheResult) return cacheResult.value;
            var time = Date.now();
            var value = method.apply(this, arguments);
            cache[cacheKey] = {
                time: time,
                value: value
            };
            return value;
        };
        memoizedFunction.reset = function() {
            simpleCache = null;
            thisCache = null;
        };
        return setFunctionName(memoizedFunction, (options.name || getFunctionName(method)) + "::memoized");
    }
    memoize.clear = function() {
        memoizeGlobalIndexValidFrom = memoizeGlobalIndex;
    };
    function src_util_noop() {}
    function stringifyError(err, level) {
        void 0 === level && (level = 1);
        if (level >= 3) return "stringifyError stack overflow";
        try {
            if (!err) return "<unknown error: " + {}.toString.call(err) + ">";
            if ("string" == typeof err) return err;
            if (err instanceof Error) {
                var stack = err && err.stack;
                var message = err && err.message;
                if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                if (stack) return stack;
                if (message) return message;
            }
            return err && err.toString && "function" == typeof err.toString ? err.toString() : {}.toString.call(err);
        } catch (newErr) {
            return "Error while stringifying error: " + stringifyError(newErr, level + 1);
        }
    }
    memoize((function(obj) {
        if (Object.values) return Object.values(obj);
        var result = [];
        for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
        return result;
    }));
    function objFilter(obj, filter) {
        void 0 === filter && (filter = Boolean);
        var result = {};
        for (var key in obj) obj.hasOwnProperty(key) && filter(obj[key], key) && (result[key] = obj[key]);
        return result;
    }
    function arrayFrom(item) {
        return [].slice.call(item);
    }
    var util_ExtendableError = function(_Error) {
        _inheritsLoose(ExtendableError, _Error);
        function ExtendableError(message) {
            var _this6;
            (_this6 = _Error.call(this, message) || this).name = _this6.constructor.name;
            "function" == typeof Error.captureStackTrace ? Error.captureStackTrace(function(self) {
                if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return self;
            }(_this6), _this6.constructor) : _this6.stack = new Error(message).stack;
            return _this6;
        }
        return ExtendableError;
    }(wrapNativeSuper_wrapNativeSuper(Error));
    function isDocumentReady() {
        return Boolean(document.body) && "complete" === document.readyState;
    }
    function isDocumentInteractive() {
        return Boolean(document.body) && "interactive" === document.readyState;
    }
    memoize((function() {
        return new promise_ZalgoPromise((function(resolve) {
            if (isDocumentReady() || isDocumentInteractive()) return resolve();
            var interval = setInterval((function() {
                if (isDocumentReady() || isDocumentInteractive()) {
                    clearInterval(interval);
                    return resolve();
                }
            }), 10);
        }));
    }));
    function dom_isBrowser() {
        return "undefined" != typeof window && void 0 !== window.location;
    }
    var dom_PopupOpenError = function(_ExtendableError) {
        _inheritsLoose(PopupOpenError, _ExtendableError);
        function PopupOpenError() {
            return _ExtendableError.apply(this, arguments) || this;
        }
        return PopupOpenError;
    }(util_ExtendableError);
    var currentScript = "undefined" != typeof document ? document.currentScript : null;
    var getCurrentScript = memoize((function() {
        if (currentScript) return currentScript;
        if (currentScript = function() {
            try {
                var stack = function() {
                    try {
                        throw new Error("_");
                    } catch (err) {
                        return err.stack || "";
                    }
                }();
                var stackDetails = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(stack);
                var scriptLocation = stackDetails && stackDetails[1];
                if (!scriptLocation) return;
                for (var _i22 = 0, _Array$prototype$slic2 = [].slice.call(document.getElementsByTagName("script")).reverse(); _i22 < _Array$prototype$slic2.length; _i22++) {
                    var script = _Array$prototype$slic2[_i22];
                    if (script.src && script.src === scriptLocation) return script;
                }
            } catch (err) {}
        }()) return currentScript;
        throw new Error("Can not determine current script");
    }));
    var currentUID = uniqueID();
    memoize((function() {
        var script;
        try {
            script = getCurrentScript();
        } catch (err) {
            return currentUID;
        }
        var uid = script.getAttribute("data-uid");
        if (uid && "string" == typeof uid) return uid;
        if ((uid = script.getAttribute("data-uid-auto")) && "string" == typeof uid) return uid;
        if (script.src) {
            var hashedString = function(str) {
                var hash = "";
                for (var i = 0; i < str.length; i++) {
                    var total = str[i].charCodeAt(0) * i;
                    str[i + 1] && (total += str[i + 1].charCodeAt(0) * (i - 1));
                    hash += String.fromCharCode(97 + Math.abs(total) % 26);
                }
                return hash;
            }(JSON.stringify({
                src: script.src,
                dataset: script.dataset
            }));
            uid = "uid_" + hashedString.slice(hashedString.length - 30);
        } else uid = uniqueID();
        script.setAttribute("data-uid-auto", uid);
        return uid;
    }));
    var http_headerBuilders = [];
    var AUTO_FLUSH_LEVEL = [ "warn", "error" ];
    var LOG_LEVEL_PRIORITY = [ "error", "warn", "info", "debug" ];
    var sendBeacon = function(_ref2) {
        var _ref2$win = _ref2.win, win = void 0 === _ref2$win ? window : _ref2$win, url = _ref2.url, data = _ref2.data, _ref2$useBlob = _ref2.useBlob, useBlob = void 0 === _ref2$useBlob || _ref2$useBlob;
        try {
            var json = JSON.stringify(data);
            if (!win.navigator.sendBeacon) throw new Error("No sendBeacon available");
            if (useBlob) {
                var blob = new Blob([ json ], {
                    type: "application/json"
                });
                return win.navigator.sendBeacon(url, blob);
            }
            return win.navigator.sendBeacon(url, json);
        } catch (e) {
            return !1;
        }
    };
    var extendIfDefined = function(target, source) {
        for (var key in source) source.hasOwnProperty(key) && (target[key] = source[key]);
    };
    var _FUNDING_SKIP_LOGIN, _AMPLITUDE_API_KEY;
    (_FUNDING_SKIP_LOGIN = {}).paypal = "paypal", _FUNDING_SKIP_LOGIN.paylater = "paypal", 
    _FUNDING_SKIP_LOGIN.credit = "paypal";
    (_AMPLITUDE_API_KEY = {}).test = "a23fb4dfae56daf7c3212303b53a8527", _AMPLITUDE_API_KEY.local = "a23fb4dfae56daf7c3212303b53a8527", 
    _AMPLITUDE_API_KEY.stage = "a23fb4dfae56daf7c3212303b53a8527", _AMPLITUDE_API_KEY.sandbox = "a23fb4dfae56daf7c3212303b53a8527", 
    _AMPLITUDE_API_KEY.production = "ce423f79daba95faeb0694186170605c";
    function getLogger() {
        return function(method, logic, args) {
            void 0 === args && (args = []);
            var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {};
            var key = serializeArgs(args);
            return cache.hasOwnProperty(key) ? cache[key] : cache[key] = function() {
                return function(_ref) {
                    var url = _ref.url, prefix = _ref.prefix, _ref$logLevel = _ref.logLevel, logLevel = void 0 === _ref$logLevel ? "warn" : _ref$logLevel, _ref$transport = _ref.transport, transport = void 0 === _ref$transport ? function(httpWin) {
                        void 0 === httpWin && (httpWin = window);
                        var win = isSameDomain(httpWin) ? assertSameDomain(httpWin) : window;
                        return function(_ref) {
                            var url = _ref.url, method = _ref.method, headers = _ref.headers, json = _ref.json, _ref$enableSendBeacon = _ref.enableSendBeacon, enableSendBeacon = void 0 !== _ref$enableSendBeacon && _ref$enableSendBeacon;
                            return promise_ZalgoPromise.try((function() {
                                var beaconResult = !1;
                                (function(_ref) {
                                    var headers = _ref.headers, enableSendBeacon = _ref.enableSendBeacon;
                                    var hasHeaders = headers && Object.keys(headers).length;
                                    return !!(window && window.navigator.sendBeacon && !hasHeaders && enableSendBeacon && window.Blob);
                                })({
                                    headers: headers,
                                    enableSendBeacon: enableSendBeacon
                                }) && (beaconResult = function(url) {
                                    return "https://api2.amplitude.com/2/httpapi" === url;
                                }(url) ? sendBeacon({
                                    win: win,
                                    url: url,
                                    data: json,
                                    useBlob: !1
                                }) : sendBeacon({
                                    win: win,
                                    url: url,
                                    data: json,
                                    useBlob: !0
                                }));
                                return beaconResult || function(_ref) {
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
                                }({
                                    win: win,
                                    url: url,
                                    method: method,
                                    headers: headers,
                                    json: json
                                });
                            })).then(src_util_noop);
                        };
                    }() : _ref$transport, amplitudeApiKey = _ref.amplitudeApiKey, _ref$flushInterval = _ref.flushInterval, flushInterval = void 0 === _ref$flushInterval ? 6e4 : _ref$flushInterval, _ref$enableSendBeacon = _ref.enableSendBeacon, enableSendBeacon = void 0 !== _ref$enableSendBeacon && _ref$enableSendBeacon;
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
                                var res;
                                url && (res = transport({
                                    method: "POST",
                                    url: url,
                                    headers: headers,
                                    json: {
                                        events: events,
                                        meta: meta,
                                        tracking: tracking
                                    },
                                    enableSendBeacon: enableSendBeacon
                                }).catch(src_util_noop));
                                amplitudeApiKey && transport({
                                    method: "POST",
                                    url: "https://api2.amplitude.com/2/httpapi",
                                    headers: {},
                                    json: {
                                        api_key: amplitudeApiKey,
                                        events: tracking.map((function(payload) {
                                            return _extends({
                                                event_type: payload.transition_name || "event",
                                                event_properties: payload
                                            }, payload);
                                        }))
                                    },
                                    enableSendBeacon: enableSendBeacon
                                }).catch(src_util_noop);
                                events = [];
                                tracking = [];
                                return promise_ZalgoPromise.resolve(res).then(src_util_noop);
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
                    if ("object" == typeof window) {
                        window.addEventListener("beforeunload", (function() {
                            immediateFlush();
                        }));
                        window.addEventListener("unload", (function() {
                            immediateFlush();
                        }));
                        window.addEventListener("pagehide", (function() {
                            immediateFlush();
                        }));
                    }
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
                        },
                        configure: function(opts) {
                            opts.url && (url = opts.url);
                            opts.prefix && (prefix = opts.prefix);
                            opts.logLevel && (logLevel = opts.logLevel);
                            opts.transport && (transport = opts.transport);
                            opts.amplitudeApiKey && (amplitudeApiKey = opts.amplitudeApiKey);
                            opts.flushInterval && (flushInterval = opts.flushInterval);
                            opts.enableSendBeacon && (enableSendBeacon = opts.enableSendBeacon);
                            return logger;
                        }
                    };
                    return logger;
                }({
                    url: "/xoplatform/logger/api/logger",
                    enableSendBeacon: !0
                });
            }.apply(void 0, args);
        }(getLogger);
    }
    function getNonce() {
        var nonce = "";
        document.body && (nonce = document.body.getAttribute("data-nonce") || "");
        return nonce;
    }
    function _renderChildren(children, renderer) {
        var result = [];
        for (var _i2 = 0; _i2 < children.length; _i2++) {
            var renderedChild = children[_i2].render(renderer);
            if (renderedChild) if (Array.isArray(renderedChild)) for (var _i4 = 0; _i4 < renderedChild.length; _i4++) {
                var subchild = renderedChild[_i4];
                subchild && result.push(subchild);
            } else result.push(renderedChild);
        }
        return result;
    }
    var node_ElementNode = function() {
        function ElementNode(name, props, children) {
            this.type = "element";
            this.name = void 0;
            this.props = void 0;
            this.children = void 0;
            this.onRender = void 0;
            this.name = name;
            this.props = props || {};
            this.children = children;
            var onRender = this.props.onRender;
            if ("function" == typeof onRender) {
                this.onRender = onRender;
                delete props.onRender;
            }
        }
        var _proto = ElementNode.prototype;
        _proto.render = function(renderer) {
            var el = renderer(this);
            this.onRender && this.onRender(el);
            return el;
        };
        _proto.renderChildren = function(renderer) {
            return _renderChildren(this.children, renderer);
        };
        return ElementNode;
    }();
    var node_FragmentNode = function() {
        function FragmentNode(children) {
            this.type = "fragment";
            this.children = void 0;
            this.children = children;
        }
        FragmentNode.prototype.render = function(renderer) {
            return _renderChildren(this.children, renderer);
        };
        return FragmentNode;
    }();
    var node_TextNode = function() {
        function TextNode(text) {
            this.type = "text";
            this.text = void 0;
            this.text = text;
        }
        TextNode.prototype.render = function(renderer) {
            return renderer(this);
        };
        return TextNode;
    }();
    var node_ComponentNode = function() {
        function ComponentNode(component, props, children) {
            this.type = "component";
            this.component = void 0;
            this.props = void 0;
            this.children = void 0;
            this.component = component;
            this.props = props || {};
            this.children = children;
            this.props.children = children;
        }
        var _proto4 = ComponentNode.prototype;
        _proto4.renderComponent = function(renderer) {
            var child = function(child) {
                var children = normalizeChildren(Array.isArray(child) ? child : [ child ]);
                return 1 === children.length ? children[0] : children.length > 1 ? new node_FragmentNode(children) : void 0;
            }(this.component(this.props, this.children));
            if (child) return child.render(renderer);
        };
        _proto4.render = function(renderer) {
            return renderer(this);
        };
        _proto4.renderChildren = function(renderer) {
            return _renderChildren(this.children, renderer);
        };
        return ComponentNode;
    }();
    function normalizeChildren(children) {
        var result = [];
        for (var _i6 = 0; _i6 < children.length; _i6++) {
            var child = children[_i6];
            if (child) if ("string" == typeof child || "number" == typeof child) result.push(new node_TextNode(child.toString())); else {
                if ("boolean" == typeof child) continue;
                if (Array.isArray(child)) for (var _i8 = 0, _normalizeChildren2 = normalizeChildren(child); _i8 < _normalizeChildren2.length; _i8++) result.push(_normalizeChildren2[_i8]); else {
                    if (!child || "element" !== child.type && "text" !== child.type && "component" !== child.type) throw new TypeError("Unrecognized node type: " + typeof child);
                    result.push(child);
                }
            }
        }
        return result;
    }
    var node_node = function(element, props) {
        for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
        children = normalizeChildren(children);
        if ("string" == typeof element) return new node_ElementNode(element, props, children);
        if ("function" == typeof element) return new node_ComponentNode(element, props, children);
        throw new TypeError("Expected jsx element to be a string or a function");
    };
    var _ELEMENT_DEFAULT_XML_, _ATTRIBUTE_DEFAULT_XM, _ADD_CHILDREN;
    var ELEMENT_DEFAULT_XML_NAMESPACE = ((_ELEMENT_DEFAULT_XML_ = {}).svg = "http://www.w3.org/2000/svg", 
    _ELEMENT_DEFAULT_XML_);
    var ATTRIBUTE_DEFAULT_XML_NAMESPACE = ((_ATTRIBUTE_DEFAULT_XM = {})["xlink:href"] = "http://www.w3.org/1999/xlink", 
    _ATTRIBUTE_DEFAULT_XM);
    function createTextElement(doc, node) {
        return doc.createTextNode(node.text);
    }
    function addProps(el, node) {
        var props = node.props;
        for (var _i4 = 0, _Object$keys2 = Object.keys(props); _i4 < _Object$keys2.length; _i4++) {
            var prop = _Object$keys2[_i4];
            var val = props[prop];
            if (null != val && "el" !== prop && "innerHTML" !== prop) if (prop.match(/^on[A-Z][a-z]/) && "function" == typeof val) el.addEventListener(prop.slice(2).toLowerCase(), val); else if ("string" == typeof val || "number" == typeof val) {
                var xmlNamespace = ATTRIBUTE_DEFAULT_XML_NAMESPACE[prop];
                xmlNamespace ? el.setAttributeNS(xmlNamespace, prop, val.toString()) : el.setAttribute(prop, val.toString());
            } else "boolean" == typeof val && !0 === val && el.setAttribute(prop, "");
        }
        "iframe" !== el.tagName.toLowerCase() || props.id || el.setAttribute("id", "jsx-iframe-" + "xxxxxxxxxx".replace(/./g, (function() {
            return "0123456789abcdef".charAt(Math.floor(Math.random() * "0123456789abcdef".length));
        })));
    }
    var ADD_CHILDREN = ((_ADD_CHILDREN = {}).iframe = function(el, node) {
        var firstChild = node.children[0];
        if (1 !== node.children.length || !firstChild || "element" !== firstChild.type || "html" !== firstChild.name) throw new Error("Expected only single html element node as child of iframe element");
        el.addEventListener("load", (function() {
            var win = el.contentWindow;
            if (!win) throw new Error("Expected frame to have contentWindow");
            var doc = win.document;
            var docElement = doc.documentElement;
            for (;docElement.children && docElement.children.length; ) docElement.removeChild(docElement.children[0]);
            var child = firstChild.render(dom({
                doc: doc
            }));
            for (;child.children.length; ) docElement.appendChild(child.children[0]);
        }));
    }, _ADD_CHILDREN.script = function(el, node) {
        var firstChild = node.children[0];
        if (1 !== node.children.length || !firstChild || "text" !== firstChild.type) throw new Error("Expected only single text node as child of script element");
        el.text = firstChild.text;
    }, _ADD_CHILDREN.default = function(el, node, renderer) {
        for (var _i6 = 0, _node$renderChildren2 = node.renderChildren(renderer); _i6 < _node$renderChildren2.length; _i6++) el.appendChild(_node$renderChildren2[_i6]);
    }, _ADD_CHILDREN);
    function addChildren(el, node, doc, renderer) {
        if (node.props.hasOwnProperty("innerHTML")) {
            if (node.children.length) throw new Error("Expected no children to be passed when innerHTML prop is set");
            var html = node.props.innerHTML;
            if ("string" != typeof html) throw new TypeError("innerHTML prop must be string");
            if ("script" === node.name) el.text = html; else {
                el.innerHTML = html;
                !function(el, doc) {
                    void 0 === doc && (doc = window.document);
                    for (var _i2 = 0, _el$querySelectorAll2 = el.querySelectorAll("script"); _i2 < _el$querySelectorAll2.length; _i2++) {
                        var script = _el$querySelectorAll2[_i2];
                        var parentNode = script.parentNode;
                        if (parentNode) {
                            var newScript = doc.createElement("script");
                            newScript.text = script.textContent;
                            parentNode.replaceChild(newScript, script);
                        }
                    }
                }(el, doc);
            }
        } else (ADD_CHILDREN[node.name] || ADD_CHILDREN.default)(el, node, renderer);
    }
    function dom(opts) {
        void 0 === opts && (opts = {});
        var _opts$doc = opts.doc, doc = void 0 === _opts$doc ? document : _opts$doc;
        return function domRenderer(node) {
            if ("component" === node.type) return node.renderComponent(domRenderer);
            if ("text" === node.type) return createTextElement(doc, node);
            if ("element" === node.type) {
                var xmlNamespace = ELEMENT_DEFAULT_XML_NAMESPACE[node.name.toLowerCase()];
                if (xmlNamespace) return function xmlNamespaceDomRenderer(node, xmlNamespace) {
                    if ("component" === node.type) return node.renderComponent((function(childNode) {
                        return xmlNamespaceDomRenderer(childNode, xmlNamespace);
                    }));
                    if ("text" === node.type) return createTextElement(doc, node);
                    if ("element" === node.type) {
                        var el = function(doc, node, xmlNamespace) {
                            return doc.createElementNS(xmlNamespace, node.name);
                        }(doc, node, xmlNamespace);
                        addProps(el, node);
                        addChildren(el, node, doc, (function(childNode) {
                            return xmlNamespaceDomRenderer(childNode, xmlNamespace);
                        }));
                        return el;
                    }
                    throw new TypeError("Unhandleable node");
                }(node, xmlNamespace);
                var el = function(doc, node) {
                    return node.props.el ? node.props.el : doc.createElement(node.name);
                }(doc, node);
                addProps(el, node);
                addChildren(el, node, doc, domRenderer);
                return el;
            }
            throw new TypeError("Unhandleable node");
        };
    }
    function Spinner(_ref) {
        return node_node("div", {
            class: "preloader spinner"
        }, node_node("style", {
            nonce: _ref.nonce,
            innerHTML: "\n\n    body {\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        position: fixed;\n        top: 0;\n        left: 0;\n        margin: 0;\n    }\n\n    .spinner {\n        height: 100%;\n        width: 100%;\n        position: absolute;\n        z-index: 10\n    }\n\n    .spinner .spinWrap {\n        width: 200px;\n        height: 100px;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin-left: -100px;\n        margin-top: -50px\n    }\n\n    .spinner .loader,\n    .spinner .spinnerImage {\n        height: 100px;\n        width: 100px;\n        position: absolute;\n        top: 0;\n        left: 50%;\n        opacity: 1;\n        filter: alpha(opacity=100)\n    }\n\n    .spinner .spinnerImage {\n        margin: 28px 0 0 -25px;\n        background: url(https://www.paypalobjects.com/images/checkout/hermes/icon_ot_spin_lock_skinny.png) no-repeat\n    }\n\n    .spinner .loader {\n        margin: 0 0 0 -55px;\n        background-color: transparent;\n        animation: rotation .7s infinite linear;\n        border-left: 5px solid #cbcbca;\n        border-right: 5px solid #cbcbca;\n        border-bottom: 5px solid #cbcbca;\n        border-top: 5px solid #2380be;\n        border-radius: 100%\n    }\n\n    @keyframes rotation {\n        from {\n            transform: rotate(0deg)\n        }\n        to {\n            transform: rotate(359deg)\n        }\n    }\n"
        }), node_node("div", {
            class: "spinWrap"
        }, node_node("p", {
            class: "spinnerImage"
        }), node_node("p", {
            class: "loader"
        })));
    }
    function SpinnerPage(_ref2, children) {
        var nonce = _ref2.nonce;
        return node_node("html", null, node_node("head", null, node_node("title", null, "PayPal"), node_node("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
        })), node_node("body", null, node_node(Spinner, {
            nonce: nonce
        }), children));
    }
    function Menu(_ref) {
        var choices = _ref.choices, onBlur = _ref.onBlur, cspNonce = _ref.cspNonce, verticalOffset = _ref.verticalOffset;
        var autoFocus = function(_temp) {
            var _ref = void 0 === _temp ? {} : _temp, _ref$onFocus = _ref.onFocus, onFocus = void 0 === _ref$onFocus ? src_util_noop : _ref$onFocus, _ref$onFocusFail = _ref.onFocusFail, onFocusFail = void 0 === _ref$onFocusFail ? src_util_noop : _ref$onFocusFail;
            var ref = (hooks_module_f = 5, function(n, t) {
                var u = hooks_module_p(hooks_module_r++, 7);
                return hooks_module_B(u.__H, t) ? (u.__V = {
                    current: void 0
                }, u.i = t, u.__h = n, u.__V) : u.__;
            }((function() {
                return {
                    current: void 0
                };
            }), []));
            hooks_module_s((function() {
                if (ref.current) {
                    ref.current.focus();
                    document.activeElement === ref.current ? onFocus() : onFocusFail();
                }
            }));
            return ref;
        }({
            onFocus: _ref.onFocus,
            onFocusFail: _ref.onFocusFail
        });
        return h(p, null, h("style", {
            nonce: cspNonce
        }, '\n                    .menu {\n                        width: 100%;\n                        z-index: 5000;\n                        background: white;\n                        border-radius: 0 0 3px 3px;\n                        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n                        letter-spacing: 0.5px;\n                        box-shadow: 0px 0px 3px 1px rgba(222,222,222,1);\n                        outline-style: none;\n                        user-select: none;\n                        text-align: center;\n                        margin-top: ' + verticalOffset + "px;\n                        overflow: hidden;\n                    }\n\n                    .menu-item {\n                        border-top: 2px solid rgba(230, 230, 230, 0.5);;\n                        color: #0070ba;\n                        cursor: pointer;\n                    }\n\n                    .menu-item:first-child {\n                        border-top: none;\n                    }\n\n                    .menu-item:hover {\n                        background: #fcfcfc;\n                        text-decoration: underline;\n                    }\n\n                    @media screen and (min-width: 0px) {\n                        .menu-item {\n                            font-size: 11px;\n                            line-height: 14px;\n                            padding: 8px;\n                        }\n                    }\n\n                    @media screen and (min-width: 300px) {\n                        .menu-item {\n                            font-size: 14px;\n                            line-height: 18px;\n                            padding: 14px;\n                        }\n                    }\n\n                    @media screen and (min-width: 500px) {\n                        .menu-item {\n                            font-size: 18px;\n                            line-height: 21px;\n                            padding: 17px;\n                        }\n                    }\n                "), h("div", {
            class: "menu",
            tabIndex: "0",
            onBlur: onBlur,
            ref: autoFocus
        }, choices.map((function(choice) {
            return h("div", {
                class: "menu-item",
                onClick: function() {
                    return function(choice) {
                        var win;
                        if (choice.popup) try {
                            win = function(_ref) {
                                var _ref$closeOnUnload = _ref.closeOnUnload;
                                var win = assertSameDomain(function(url, options) {
                                    var _options$closeOnUnloa = (options = options || {}).closeOnUnload, closeOnUnload = void 0 === _options$closeOnUnloa ? 1 : _options$closeOnUnloa, _options$name = options.name, name = void 0 === _options$name ? "" : _options$name, width = options.width, height = options.height;
                                    var top = 0;
                                    var left = 0;
                                    width && (window.outerWidth ? left = Math.round((window.outerWidth - width) / 2) + window.screenX : window.screen.width && (left = Math.round((window.screen.width - width) / 2)));
                                    height && (window.outerHeight ? top = Math.round((window.outerHeight - height) / 2) + window.screenY : window.screen.height && (top = Math.round((window.screen.height - height) / 2)));
                                    delete options.closeOnUnload;
                                    delete options.name;
                                    width && height && (options = _extends({
                                        top: top,
                                        left: left,
                                        width: width,
                                        height: height,
                                        status: 1,
                                        toolbar: 0,
                                        menubar: 0,
                                        resizable: 1,
                                        scrollbars: 1
                                    }, options));
                                    var params = Object.keys(options).map((function(key) {
                                        if (null != options[key]) return key + "=" + ("string" == typeof (item = options[key]) ? item : item && item.toString && "function" == typeof item.toString ? item.toString() : {}.toString.call(item));
                                        var item;
                                    })).filter(Boolean).join(",");
                                    var win;
                                    try {
                                        win = window.open("", name, params);
                                    } catch (err) {
                                        throw new dom_PopupOpenError("Can not open popup window - " + (err.stack || err.message));
                                    }
                                    if (isWindowClosed(win)) {
                                        var err;
                                        throw new dom_PopupOpenError("Can not open popup window - blocked");
                                    }
                                    closeOnUnload && window.addEventListener("unload", (function() {
                                        return win.close();
                                    }));
                                    return win;
                                }(0, {
                                    width: _ref.width,
                                    height: _ref.height,
                                    closeOnUnload: void 0 === _ref$closeOnUnload ? 1 : _ref$closeOnUnload
                                }));
                                var doc = win.document;
                                !function(win, el) {
                                    var tag = el.tagName.toLowerCase();
                                    if ("html" !== tag) throw new Error("Expected element to be html, got " + tag);
                                    var documentElement = win.document.documentElement;
                                    for (var _i6 = 0, _arrayFrom2 = arrayFrom(documentElement.children); _i6 < _arrayFrom2.length; _i6++) documentElement.removeChild(_arrayFrom2[_i6]);
                                    for (var _i8 = 0, _arrayFrom4 = arrayFrom(el.children); _i8 < _arrayFrom4.length; _i8++) documentElement.appendChild(_arrayFrom4[_i8]);
                                }(win, node_node(SpinnerPage, {
                                    nonce: getNonce()
                                }).render(dom({
                                    doc: doc
                                })));
                                return win;
                            }({
                                width: choice.popup.width,
                                height: choice.popup.height
                            });
                        } catch (err) {
                            getLogger().warn("menu_popup_open_error", {
                                err: stringifyError(err)
                            });
                        }
                        return choice.onSelect({
                            win: win
                        });
                    }(choice);
                }
            }, choice.label);
        }))));
    }
    function Page(_ref) {
        var cspNonce = _ref.cspNonce, _ref$pageVisible = _ref.pageVisible, pageVisible = void 0 !== _ref$pageVisible && _ref$pageVisible;
        var _useXProps = function() {
            var _useState = hooks_module_y(window.xprops), xprops = _useState[0], setXProps = _useState[1];
            hooks_module_s((function() {
                return xprops.onProps((function(newProps) {
                    setXProps(_extends({}, newProps));
                }));
            }), []);
            return _extends({}, xprops);
        }(), choices = _useXProps.choices, onChoose = _useXProps.onChoose, verticalOffset = _useXProps.verticalOffset, hide = _useXProps.hide, _useXProps$onBlur = _useXProps.onBlur, onBlur = void 0 === _useXProps$onBlur ? src_util_noop : _useXProps$onBlur, _useXProps$onFocus = _useXProps.onFocus, onFocus = void 0 === _useXProps$onFocus ? src_util_noop : _useXProps$onFocus, _useXProps$onFocusFai = _useXProps.onFocusFail, onFocusFail = void 0 === _useXProps$onFocusFai ? src_util_noop : _useXProps$onFocusFai;
        var _useState = hooks_module_y(!1), opaque = _useState[0], setOpaque = _useState[1];
        var _useState2 = hooks_module_y(pageVisible), visible = _useState2[0], setVisible = _useState2[1];
        hooks_module_s((function() {
            var hasChoices = Boolean(choices && choices.length);
            setOpaque(hasChoices);
            setVisible(hasChoices);
        }), [ choices ]);
        return h(p, null, h("style", {
            nonce: cspNonce
        }, "\n                    * {\n                        box-sizing: border-box;\n                    }\n\n                    html, body {\n                        margin: 0;\n                        padding: 0;\n                        opacity: " + (opaque ? "1" : "0") + ";\n                        transition: opacity " + .15.toFixed(2) + 's ease-in-out;\n                        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n                    }\n\n                    body {\n                        padding: 5px 20px;\n                        display: inline-block;\n                        width: 100%;\n                    }\n                '), choices && visible ? h(Menu, {
            choices: choices,
            onChoose: function(_ref2) {
                var id = _ref2.id, win = _ref2.win;
                setVisible(!1);
                return onChoose({
                    id: id,
                    win: win
                });
            },
            onBlur: function() {
                setOpaque(!1);
                return promise_ZalgoPromise.delay(150).then((function() {
                    setVisible(!1);
                    return promise_ZalgoPromise.all([ onBlur(), hide() ]);
                }));
            },
            onFocus: onFocus,
            onFocusFail: onFocusFail,
            cspNonce: cspNonce,
            verticalOffset: verticalOffset
        }) : null);
    }
    function setupMenu(_ref3) {
        var _ref3$pageVisible = _ref3.pageVisible;
        !function(u, i, t) {
            var r, e;
            l.__ && l.__(u, i), r = !1 ? null : i.__k, e = [], j(i, u = i.__k = h(p, null, [ u ]), r || f, f, void 0 !== i.ownerSVGElement, r ? null : i.firstChild ? preact_module_n.call(i.childNodes) : null, e, r ? r.__e : i.firstChild, !1), 
            z(e, u);
        }(h(Page, {
            cspNonce: _ref3.cspNonce,
            pageVisible: void 0 !== _ref3$pageVisible && _ref3$pageVisible
        }), function() {
            var body = document.body;
            if (!body) throw new Error("Document body not found");
            return body;
        }());
    }
} ]);