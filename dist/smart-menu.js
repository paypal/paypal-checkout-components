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
    var n, l, preact_module_u, preact_module_t, preact_module_r = {}, f = [], o = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
    function e(n, l) {
        for (var u in l) n[u] = l[u];
        return n;
    }
    function c(n) {
        var l = n.parentNode;
        l && l.removeChild(n);
    }
    function s(n, l, u) {
        var t, i, r, f, o = arguments;
        if (l = e({}, l), arguments.length > 3) for (u = [ u ], t = 3; t < arguments.length; t++) u.push(o[t]);
        if (null != u && (l.children = u), null != n && null != n.defaultProps) for (i in n.defaultProps) void 0 === l[i] && (l[i] = n.defaultProps[i]);
        return f = l.key, null != (r = l.ref) && delete l.ref, null != f && delete l.key, 
        a(n, l, f, r);
    }
    function a(l, u, t, i) {
        var r = {
            type: l,
            props: u,
            key: t,
            ref: i,
            __k: null,
            __p: null,
            __b: 0,
            __e: null,
            l: null,
            __c: null,
            constructor: void 0
        };
        return n.vnode && n.vnode(r), r;
    }
    function v(n) {
        return n.children;
    }
    function p(n) {
        if (null == n || "boolean" == typeof n) return null;
        if ("string" == typeof n || "number" == typeof n) return a(null, n, null, null);
        if (null != n.__e || null != n.__c) {
            var l = a(n.type, n.props, n.key, null);
            return l.__e = n.__e, l;
        }
        return n;
    }
    function y(n, l) {
        this.props = n, this.context = l;
    }
    function d(n, l) {
        if (null == l) return n.__p ? d(n.__p, n.__p.__k.indexOf(n) + 1) : null;
        for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
        return "function" == typeof n.type ? d(n) : null;
    }
    function w(t) {
        !t.__d && (t.__d = !0) && 1 === l.push(t) && (n.debounceRendering || preact_module_u)(g);
    }
    function g() {
        var n;
        for (l.sort((function(n, l) {
            return l.__v.__b - n.__v.__b;
        })); n = l.pop(); ) n.__d && n.forceUpdate(!1);
    }
    function k(n, l, u, t, i, o, e, s, a) {
        var h, v, y, m, w, g, k, b, x = l.__k || _(l.props.children, l.__k = [], p, !0), C = u && u.__k || f, P = C.length;
        for (s == preact_module_r && (s = null != o ? o[0] : P ? d(u, 0) : null), v = 0; v < x.length; v++) if (null != (h = x[v] = p(x[v]))) {
            if (h.__p = l, h.__b = l.__b + 1, null === (m = C[v]) || m && h.key == m.key && h.type === m.type) C[v] = void 0; else for (y = 0; y < P; y++) {
                if ((m = C[y]) && h.key == m.key && h.type === m.type) {
                    C[y] = void 0;
                    break;
                }
                m = null;
            }
            if (w = N(n, h, m = m || preact_module_r, t, i, o, e, null, s, a), (y = h.ref) && m.ref != y && (b || (b = [])).push(y, h.__c || w, h), 
            null != w) {
                if (null == k && (k = w), null != h.l) w = h.l, h.l = null; else if (o == m || w != s || null == w.parentNode) n: if (null == s || s.parentNode !== n) n.appendChild(w); else {
                    for (g = s, y = 0; (g = g.nextSibling) && y < P; y += 2) if (g == w) break n;
                    n.insertBefore(w, s);
                }
                s = w.nextSibling, "function" == typeof l.type && (l.l = w);
            }
        }
        if (l.__e = k, null != o && "function" != typeof l.type) for (v = o.length; v--; ) null != o[v] && c(o[v]);
        for (v = P; v--; ) null != C[v] && z(C[v], C[v]);
        if (b) for (v = 0; v < b.length; v++) j(b[v], b[++v], b[++v]);
    }
    function _(n, l, u, t) {
        if (null == l && (l = []), null == n || "boolean" == typeof n) t && l.push(null); else if (Array.isArray(n)) for (var i = 0; i < n.length; i++) _(n[i], l, u, t); else l.push(u ? u(n) : n);
        return l;
    }
    function x(n, l, u) {
        "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === o.test(l) ? u + "px" : u;
    }
    function C(n, l, u, t, i) {
        var r, f, o, e, c;
        if ("key" === (l = i ? "className" === l ? "class" : l : "class" === l ? "className" : l) || "children" === l) ; else if ("style" === l) if (r = n.style, 
        "string" == typeof u) r.cssText = u; else {
            if ("string" == typeof t && (r.cssText = "", t = null), t) for (f in t) u && f in u || x(r, f, "");
            if (u) for (o in u) t && u[o] === t[o] || x(r, o, u[o]);
        } else if ("o" === l[0] && "n" === l[1]) e = l !== (l = l.replace(/Capture$/, "")), 
        c = l.toLowerCase(), l = (c in n ? c : l).slice(2), u ? (t || n.addEventListener(l, P, e), 
        (n.u || (n.u = {}))[l] = u) : n.removeEventListener(l, P, e); else if ("list" !== l && "tagName" !== l && !i && l in n) if (n.length && "value" == l) for (l = n.length; l--; ) n.options[l].selected = n.options[l].value == u; else n[l] = null == u ? "" : u; else "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u ? n.removeAttribute(l) : n.setAttribute(l, u));
    }
    function P(l) {
        return this.u[l.type](n.event ? n.event(l) : l);
    }
    function N(l, u, t, i, r, f, o, c, s, a) {
        var h, d, m, w, g, b, x, C, P, N, T = u.type;
        if (void 0 !== u.constructor) return null;
        (h = n.__b) && h(u);
        try {
            n: if ("function" == typeof T) {
                if (C = u.props, P = (h = T.contextType) && i[h.__c], N = h ? P ? P.props.value : h.__p : i, 
                t.__c ? x = (d = u.__c = t.__c).__p = d.__E : (T.prototype && T.prototype.render ? u.__c = d = new T(C, N) : (u.__c = d = new y(C, N), 
                d.constructor = T, d.render = A), P && P.sub(d), d.props = C, d.state || (d.state = {}), 
                d.context = N, d.__n = i, m = d.__d = !0, d.__h = []), null == d.__s && (d.__s = d.state), 
                null != T.getDerivedStateFromProps && e(d.__s == d.state ? d.__s = e({}, d.__s) : d.__s, T.getDerivedStateFromProps(C, d.__s)), 
                m) null == T.getDerivedStateFromProps && null != d.componentWillMount && d.componentWillMount(), 
                null != d.componentDidMount && o.push(d); else {
                    if (null == T.getDerivedStateFromProps && null == c && null != d.componentWillReceiveProps && d.componentWillReceiveProps(C, N), 
                    !c && null != d.shouldComponentUpdate && !1 === d.shouldComponentUpdate(C, d.__s, N)) {
                        d.props = C, d.state = d.__s, d.__d = !1, d.__v = u, u.__e = t.__e, u.__k = t.__k;
                        break n;
                    }
                    null != d.componentWillUpdate && d.componentWillUpdate(C, d.__s, N);
                }
                for (w = d.props, g = d.state, d.context = N, d.props = C, d.state = d.__s, (h = n.__r) && h(u), 
                d.__d = !1, d.__v = u, d.__P = l, _(null != (h = d.render(d.props, d.state, d.context)) && h.type == v && null == h.key ? h.props.children : h, u.__k = [], p, !0), 
                null != d.getChildContext && (i = e(e({}, i), d.getChildContext())), m || null == d.getSnapshotBeforeUpdate || (b = d.getSnapshotBeforeUpdate(w, g)), 
                k(l, u, t, i, r, f, o, s, a), d.base = u.__e; h = d.__h.pop(); ) h.call(d);
                m || null == w || null == d.componentDidUpdate || d.componentDidUpdate(w, g, b), 
                x && (d.__E = d.__p = null);
            } else u.__e = $(t.__e, u, t, i, r, f, o, a);
            (h = n.diffed) && h(u);
        } catch (l) {
            n.__e(l, u, t);
        }
        return u.__e;
    }
    function T(l, u) {
        for (var t; t = l.pop(); ) try {
            t.componentDidMount();
        } catch (l) {
            n.__e(l, t.__v);
        }
        n.__c && n.__c(u);
    }
    function $(n, l, u, t, i, o, e, c) {
        var s, a, h, v, p = u.props, y = l.props;
        if (i = "svg" === l.type || i, null == n && null != o) for (s = 0; s < o.length; s++) if (null != (a = o[s]) && (null === l.type ? 3 === a.nodeType : a.localName === l.type)) {
            n = a, o[s] = null;
            break;
        }
        if (null == n) {
            if (null === l.type) return document.createTextNode(y);
            n = i ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type), 
            o = null;
        }
        return null === l.type ? p !== y && (n.data = y) : l !== u && (null != o && (o = f.slice.call(n.childNodes)), 
        h = (p = u.props || preact_module_r).dangerouslySetInnerHTML, v = y.dangerouslySetInnerHTML, 
        c || (v || h) && (v && h && v.__html == h.__html || (n.innerHTML = v && v.__html || "")), 
        function(n, l, u, t, i) {
            var r;
            for (r in u) r in l || C(n, r, null, u[r], t);
            for (r in l) i && "function" != typeof l[r] || "value" === r || "checked" === r || u[r] === l[r] || C(n, r, l[r], u[r], t);
        }(n, y, p, i, c), v || k(n, l, u, t, "foreignObject" !== l.type && i, o, e, preact_module_r, c), 
        c || ("value" in y && void 0 !== y.value && y.value !== n.value && (n.value = null == y.value ? "" : y.value), 
        "checked" in y && void 0 !== y.checked && y.checked !== n.checked && (n.checked = y.checked))), 
        n;
    }
    function j(l, u, t) {
        try {
            "function" == typeof l ? l(u) : l.current = u;
        } catch (l) {
            n.__e(l, t);
        }
    }
    function z(l, u, t) {
        var i, r, f;
        if (n.unmount && n.unmount(l), (i = l.ref) && j(i, null, u), t || "function" == typeof l.type || (t = null != (r = l.__e)), 
        l.__e = l.l = null, null != (i = l.__c)) {
            if (i.componentWillUnmount) try {
                i.componentWillUnmount();
            } catch (l) {
                n.__e(l, u);
            }
            i.base = i.__P = null;
        }
        if (i = l.__k) for (f = 0; f < i.length; f++) i[f] && z(i[f], u, t);
        null != r && c(r);
    }
    function A(n, l, u) {
        return this.constructor(n, u);
    }
    n = {}, y.prototype.setState = function(n, l) {
        var u = this.__s !== this.state && this.__s || (this.__s = e({}, this.state));
        ("function" != typeof n || (n = n(u, this.props))) && e(u, n), null != n && this.__v && (l && this.__h.push(l), 
        w(this));
    }, y.prototype.forceUpdate = function(n) {
        var l, u, t, i = this.__v, r = this.__v.__e, f = this.__P;
        f && (l = !1 !== n, u = [], t = N(f, i, e({}, i), this.__n, void 0 !== f.ownerSVGElement, null, u, l, null == r ? d(i) : r), 
        T(u, i), t != r && function m(n) {
            var l, u;
            if (null != (n = n.__p) && null != n.__c) {
                for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
                    n.__e = n.__c.base = u.__e;
                    break;
                }
                return m(n);
            }
        }(i)), n && n();
    }, y.prototype.render = v, l = [], preact_module_u = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
    n.__e = function(n, l, u) {
        for (var t; l = l.__p; ) if ((t = l.__c) && !t.__p) try {
            if (t.constructor && null != t.constructor.getDerivedStateFromError) t.setState(t.constructor.getDerivedStateFromError(n)); else {
                if (null == t.componentDidCatch) continue;
                t.componentDidCatch(n);
            }
            return w(t.__E = t);
        } catch (l) {
            n = l;
        }
        throw n;
    }, preact_module_t = preact_module_r;
    var hooks_module_t, hooks_module_r, hooks_module_u = [], hooks_module_i = n.__r;
    n.__r = function(n) {
        hooks_module_i && hooks_module_i(n), hooks_module_t = 0, (hooks_module_r = n.__c).__H && (hooks_module_r.__H.t = hooks_module_w(hooks_module_r.__H.t));
    };
    var hooks_module_o = n.diffed;
    n.diffed = function(n) {
        hooks_module_o && hooks_module_o(n);
        var t = n.__c;
        if (t) {
            var r = t.__H;
            r && (r.u = hooks_module_w(r.u));
        }
    };
    var hooks_module_f = n.unmount;
    function hooks_module_c(t) {
        n.__h && n.__h(hooks_module_r);
        var u = hooks_module_r.__H || (hooks_module_r.__H = {
            i: [],
            t: [],
            u: []
        });
        return t >= u.i.length && u.i.push({}), u.i[t];
    }
    function hooks_module_e(n) {
        return function(n, u, i) {
            var o = hooks_module_c(hooks_module_t++);
            return o.__c || (o.__c = hooks_module_r, o.o = [ q(null, u), function(t) {
                var r = n(o.o[0], t);
                o.o[0] !== r && (o.o[0] = r, o.__c.setState({}));
            } ]), o.o;
        }(q, n);
    }
    function hooks_module_v(n, u) {
        var i = hooks_module_c(hooks_module_t++);
        F(i.v, u) && (i.o = n, i.v = u, hooks_module_r.__H.t.push(i), hooks_module_(hooks_module_r));
    }
    n.unmount = function(n) {
        hooks_module_f && hooks_module_f(n);
        var t = n.__c;
        if (t) {
            var r = t.__H;
            r && r.i.forEach((function(n) {
                return n.p && n.p();
            }));
        }
    };
    var hooks_module_ = function() {};
    function hooks_module_g() {
        hooks_module_u.some((function(n) {
            n.l = !1, n.__P && (n.__H.t = hooks_module_w(n.__H.t));
        })), hooks_module_u = [];
    }
    function hooks_module_w(n) {
        return n.forEach(hooks_module_A), n.forEach(E), [];
    }
    function hooks_module_A(n) {
        n.p && n.p();
    }
    function E(n) {
        var t = n.o();
        "function" == typeof t && (n.p = t);
    }
    function F(n, t) {
        return !n || t.some((function(t, r) {
            return t !== n[r];
        }));
    }
    function q(n, t) {
        return "function" == typeof t ? t(n) : t;
    }
    "undefined" != typeof window && (hooks_module_ = function(t) {
        !t.l && (t.l = !0) && 1 === hooks_module_u.push(t) && (n.requestAnimationFrame || function(n) {
            var t = function() {
                clearTimeout(r), cancelAnimationFrame(u), setTimeout(n);
            }, r = setTimeout(t, 100), u = requestAnimationFrame(t);
        })(hooks_module_g);
    });
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
    var iframeWindows = [];
    var iframeFrames = [];
    function src_util_noop() {}
    function arrayFrom(item) {
        return [].slice.call(item);
    }
    function PopupOpenError(message) {
        this.message = message;
    }
    PopupOpenError.prototype = Object.create(Error.prototype);
    var _NATIVE_CHECKOUT_URI, _NATIVE_CHECKOUT_POPU;
    (_NATIVE_CHECKOUT_URI = {}).paypal = "/smart/checkout/native", _NATIVE_CHECKOUT_URI.venmo = "/smart/checkout/venmo";
    (_NATIVE_CHECKOUT_POPU = {}).paypal = "/smart/checkout/native/popup", _NATIVE_CHECKOUT_POPU.venmo = "/smart/checkout/venmo/popup";
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
            this.props = props;
            this.children = children;
            var onRender = props.onRender;
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
            this.props = props;
            this.children = children;
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
            if (child) if ("string" == typeof child) result.push(new node_TextNode(child)); else if (Array.isArray(child)) for (var _i8 = 0, _normalizeChildren2 = normalizeChildren(child); _i8 < _normalizeChildren2.length; _i8++) result.push(_normalizeChildren2[_i8]); else {
                if (!child || "element" !== child.type && "text" !== child.type && "component" !== child.type) throw new TypeError("Unrecognized node type: " + typeof child);
                result.push(child);
            }
        }
        return result;
    }
    var node_node = function(element, props) {
        for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
        props = props || {};
        children = normalizeChildren(children);
        if ("string" == typeof element) return new node_ElementNode(element, props, children);
        if ("function" == typeof element) return new node_ComponentNode(element, props, children);
        throw new TypeError("Expected jsx element to be a string or a function");
    };
    var _ADD_CHILDREN;
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
    function dom(opts) {
        void 0 === opts && (opts = {});
        var _opts$doc = opts.doc, doc = void 0 === _opts$doc ? document : _opts$doc;
        return function domRenderer(node) {
            if ("component" === node.type) return node.renderComponent(domRenderer);
            if ("text" === node.type) return function(doc, node) {
                return doc.createTextNode(node.text);
            }(doc, node);
            if ("element" === node.type) {
                var el = function(doc, node) {
                    return node.props.el ? node.props.el : doc.createElement(node.name);
                }(doc, node);
                !function(el, node) {
                    var props = node.props;
                    for (var _i4 = 0, _Object$keys2 = Object.keys(props); _i4 < _Object$keys2.length; _i4++) {
                        var prop = _Object$keys2[_i4];
                        var val = props[prop];
                        null != val && "el" !== prop && "innerHTML" !== prop && (prop.match(/^on[A-Z][a-z]/) && "function" == typeof val ? el.addEventListener(prop.slice(2).toLowerCase(), val) : "string" == typeof val || "number" == typeof val ? el.setAttribute(prop, val.toString()) : "boolean" == typeof val && !0 === val && el.setAttribute(prop, ""));
                    }
                    "iframe" !== el.tagName.toLowerCase() || props.id || el.setAttribute("id", "jsx-iframe-" + "xxxxxxxxxx".replace(/./g, (function() {
                        return "0123456789abcdef".charAt(Math.floor(Math.random() * "0123456789abcdef".length));
                    })));
                }(el, node);
                !function(el, node, doc, renderer) {
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
                }(el, node, doc, domRenderer);
                return el;
            }
            throw new TypeError("Unhandleable node");
        };
    }
    function SpinnerPage(_ref, children) {
        var nonce = _ref.nonce;
        return node_node("html", null, node_node("head", null, node_node("title", null, "PayPal"), node_node("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
        })), node_node("body", null, node_node("div", {
            class: "preloader spinner"
        }, node_node("style", {
            nonce: nonce,
            innerHTML: "\n\n    body {\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        position: fixed;\n        top: 0;\n        left: 0;\n        margin: 0;\n    }\n\n    .spinner {\n        height: 100%;\n        width: 100%;\n        position: absolute;\n        z-index: 10\n    }\n\n    .spinner .spinWrap {\n        width: 200px;\n        height: 100px;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin-left: -100px;\n        margin-top: -50px\n    }\n\n    .spinner .loader,\n    .spinner .spinnerImage {\n        height: 100px;\n        width: 100px;\n        position: absolute;\n        top: 0;\n        left: 50%;\n        opacity: 1;\n        filter: alpha(opacity=100)\n    }\n\n    .spinner .spinnerImage {\n        margin: 28px 0 0 -25px;\n        background: url(https://www.paypalobjects.com/images/checkout/hermes/icon_ot_spin_lock_skinny.png) no-repeat\n    }\n\n    .spinner .loader {\n        margin: 0 0 0 -55px;\n        background-color: transparent;\n        animation: rotation .7s infinite linear;\n        border-left: 5px solid #cbcbca;\n        border-right: 5px solid #cbcbca;\n        border-bottom: 5px solid #cbcbca;\n        border-top: 5px solid #2380be;\n        border-radius: 100%\n    }\n\n    @keyframes rotation {\n        from {\n            transform: rotate(0deg)\n        }\n        to {\n            transform: rotate(359deg)\n        }\n    }\n"
        }), node_node("div", {
            class: "spinWrap"
        }, node_node("p", {
            class: "spinnerImage"
        }), node_node("p", {
            class: "loader"
        }))), children));
    }
    function getNonce() {
        var nonce = "";
        document.body && (nonce = document.body.getAttribute("data-nonce") || "");
        return nonce;
    }
    function Menu(_ref) {
        var choices = _ref.choices, onChoose = _ref.onChoose, onBlur = _ref.onBlur, cspNonce = _ref.cspNonce, verticalOffset = _ref.verticalOffset;
        var autoFocus = function() {
            var ref = function(n, r) {
                var u = hooks_module_c(hooks_module_t++);
                return F(u.v, r) ? (u.v = r, u.m = n, u.o = {
                    current: void 0
                }) : u.o;
            }((function() {
                return {
                    current: void 0
                };
            }), []);
            hooks_module_v((function() {
                ref.current && ref.current.focus();
            }));
            return ref;
        }();
        return s(v, null, s("style", {
            nonce: cspNonce
        }, "\n                    .menu {\n                        width: 100%;\n                        z-index: 5000;\n                        background: white;\n                        border-radius: 3px;\n                        font-family: Helvetica, sans-serif;\n                        font-size: 14px;\n                        letter-spacing: 0.5px;\n                        box-shadow: 0px 0px 3px 1px rgba(222,222,222,1);\n                        outline-style: none;\n                        user-select: none;\n                        text-align: center;\n                        margin-top: " + verticalOffset + "px;\n                    }\n                    \n                    .menu-item {\n                        border-top: 2px solid rgba(230, 230, 230, 0.5);;\n                        padding: 14px 18px;\n                        color: #0070ba;\n                        cursor: pointer;\n                        line-height: 18px;\n                    }\n                    \n                    .menu-item:first-child {\n                        border-top: none;\n                    }\n                    \n                    .menu-item:hover {\n                        background: #fcfcfc;\n                        text-decoration: underline;\n                    }\n                "), s("div", {
            class: "menu",
            tabIndex: "0",
            onBlur: onBlur,
            ref: autoFocus
        }, choices.map((function(choice) {
            return s("div", {
                class: "menu-item",
                onClick: function() {
                    return function(choice) {
                        var win;
                        choice.popup && (win = function(_ref) {
                            var win = function(win) {
                                if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
                                return win;
                            }(function(url, options) {
                                var width = (options = options || {}).width, height = options.height;
                                var top = 0;
                                var left = 0;
                                width && (window.outerWidth ? left = Math.round((window.outerWidth - width) / 2) + window.screenX : window.screen.width && (left = Math.round((window.screen.width - width) / 2)));
                                height && (window.outerHeight ? top = Math.round((window.outerHeight - height) / 2) + window.screenY : window.screen.height && (top = Math.round((window.screen.height - height) / 2)));
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
                                var name = options.name || "";
                                delete options.name;
                                var params = Object.keys(options).map((function(key) {
                                    if (null != options[key]) return key + "=" + ("string" == typeof (item = options[key]) ? item : item && item.toString && "function" == typeof item.toString ? item.toString() : {}.toString.call(item));
                                    var item;
                                })).filter(Boolean).join(",");
                                var win;
                                try {
                                    win = window.open("", name, params, !0);
                                } catch (err) {
                                    throw new PopupOpenError("Can not open popup window - " + (err.stack || err.message));
                                }
                                if (function(win, allowMock) {
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
                                        return !err || "Call was rejected by callee.\r\n" !== err.message;
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
                                            return !(!doc || !doc.documentElement || doc.documentElement.contains(frame));
                                        }(frame)) return !0;
                                    }
                                    return !1;
                                }(win)) {
                                    var err;
                                    throw new PopupOpenError("Can not open popup window - blocked");
                                }
                                window.addEventListener("unload", (function() {
                                    return win.close();
                                }));
                                return win;
                            }(0, {
                                width: _ref.width,
                                height: _ref.height
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
                        }));
                        return onChoose({
                            id: choice.id,
                            win: win
                        });
                    }(choice);
                }
            }, choice.label);
        }))));
    }
    function Page(_ref) {
        var cspNonce = _ref.cspNonce;
        var _useXProps = function() {
            var _useState = hooks_module_e(window.xprops), xprops = _useState[0], setXProps = _useState[1];
            hooks_module_v((function() {
                return xprops.onProps((function(newProps) {
                    setXProps(_extends({}, newProps));
                }));
            }), []);
            return _extends({}, xprops);
        }(), choices = _useXProps.choices, onChoose = _useXProps.onChoose, verticalOffset = _useXProps.verticalOffset, hide = _useXProps.hide, _useXProps$onBlur = _useXProps.onBlur, onBlur = void 0 === _useXProps$onBlur ? src_util_noop : _useXProps$onBlur;
        var _useState = hooks_module_e(!1), opaque = _useState[0], setOpaque = _useState[1];
        var _useState2 = hooks_module_e(!1), visible = _useState2[0], setVisible = _useState2[1];
        hooks_module_v((function() {
            var hasChoices = Boolean(choices && choices.length);
            setOpaque(hasChoices);
            setVisible(hasChoices);
        }), [ choices ]);
        return s(v, null, s("style", {
            nonce: cspNonce
        }, "\n                    * {\n                        box-sizing: border-box;\n                    }\n\n                    html, body {\n                        margin: 0;\n                        padding: 0;\n                        opacity: " + (opaque ? "1" : "0") + ";\n                        transition: opacity " + .15.toFixed(2) + "s ease-in-out;\n                    }\n\n                    body {\n                        padding: 5px 20px;\n                        display: inline-block;\n                        width: 100%;\n                    }\n                "), choices && visible ? s(Menu, {
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
            cspNonce: cspNonce,
            verticalOffset: verticalOffset
        }) : null);
    }
    function setupMenu(_ref3) {
        !function(l, u, i) {
            var o, e, c;
            n.__p && n.__p(l, u), e = (o = i === preact_module_t) ? null : u.__k, l = s(v, null, [ l ]), 
            c = [], N(u, u.__k = l, e || preact_module_r, preact_module_r, void 0 !== u.ownerSVGElement, e ? null : f.slice.call(u.childNodes), c, !1, preact_module_r, o), 
            T(c, l);
        }(s(Page, {
            cspNonce: _ref3.cspNonce
        }), function() {
            var body = document.body;
            if (!body) throw new Error("Document body not found");
            return body;
        }());
    }
    __webpack_require__.d(__webpack_exports__, "setupMenu", (function() {
        return setupMenu;
    }));
} ]);
//# sourceMappingURL=smart-menu.js.map