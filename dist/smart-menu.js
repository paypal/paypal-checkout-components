window.spb = function(modules) {
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
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
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
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 1);
}([ function(module, exports, __webpack_require__) {
    !function(exports) {
        "use strict";
        var VNode = function() {}, options = {}, stack = [], EMPTY_CHILDREN = [];
        function h(nodeName, attributes) {
            var children = EMPTY_CHILDREN, lastSimple = void 0, child = void 0, simple = void 0, i = void 0;
            for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
            for (attributes && null != attributes.children && (stack.length || stack.push(attributes.children), 
            delete attributes.children); stack.length; ) if ((child = stack.pop()) && void 0 !== child.pop) for (i = child.length; i--; ) stack.push(child[i]); else "boolean" == typeof child && (child = null), 
            (simple = "function" != typeof nodeName) && (null == child ? child = "" : "number" == typeof child ? child = String(child) : "string" != typeof child && (simple = !1)), 
            simple && lastSimple ? children[children.length - 1] += child : children === EMPTY_CHILDREN ? children = [ child ] : children.push(child), 
            lastSimple = simple;
            var p = new VNode();
            return p.nodeName = nodeName, p.children = children, p.attributes = null == attributes ? void 0 : attributes, 
            p.key = null == attributes ? void 0 : attributes.key, void 0 !== options.vnode && options.vnode(p), 
            p;
        }
        function extend(obj, props) {
            for (var i in props) obj[i] = props[i];
            return obj;
        }
        function applyRef(ref, value) {
            ref && ("function" == typeof ref ? ref(value) : ref.current = value);
        }
        var defer = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
        function cloneElement(vnode, props) {
            return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
        }
        var NO_RENDER = 0, SYNC_RENDER = 1, FORCE_RENDER = 2, ASYNC_RENDER = 3, ATTR_KEY = "__preactattr_", IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i, items = [];
        function enqueueRender(component) {
            !component._dirty && (component._dirty = !0) && 1 == items.push(component) && (options.debounceRendering || defer)(rerender);
        }
        function rerender() {
            for (var p = void 0; p = items.pop(); ) p._dirty && renderComponent(p);
        }
        function isSameNodeType(node, vnode, hydrating) {
            return "string" == typeof vnode || "number" == typeof vnode ? void 0 !== node.splitText : "string" == typeof vnode.nodeName ? !node._componentConstructor && isNamedNode(node, vnode.nodeName) : hydrating || node._componentConstructor === vnode.nodeName;
        }
        function isNamedNode(node, nodeName) {
            return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
        }
        function getNodeProps(vnode) {
            var props = extend({}, vnode.attributes);
            props.children = vnode.children;
            var defaultProps = vnode.nodeName.defaultProps;
            if (void 0 !== defaultProps) for (var i in defaultProps) void 0 === props[i] && (props[i] = defaultProps[i]);
            return props;
        }
        function removeNode(node) {
            var parentNode = node.parentNode;
            parentNode && parentNode.removeChild(node);
        }
        function setAccessor(node, name, old, value, isSvg) {
            if ("className" === name && (name = "class"), "key" === name) ; else if ("ref" === name) applyRef(old, null), 
            applyRef(value, node); else if ("class" !== name || isSvg) if ("style" === name) {
                if (value && "string" != typeof value && "string" != typeof old || (node.style.cssText = value || ""), 
                value && "object" == typeof value) {
                    if ("string" != typeof old) for (var i in old) i in value || (node.style[i] = "");
                    for (var _i in value) node.style[_i] = "number" == typeof value[_i] && !1 === IS_NON_DIMENSIONAL.test(_i) ? value[_i] + "px" : value[_i];
                }
            } else if ("dangerouslySetInnerHTML" === name) value && (node.innerHTML = value.__html || ""); else if ("o" == name[0] && "n" == name[1]) {
                var useCapture = name !== (name = name.replace(/Capture$/, ""));
                name = name.toLowerCase().substring(2), value ? old || node.addEventListener(name, eventProxy, useCapture) : node.removeEventListener(name, eventProxy, useCapture), 
                (node._listeners || (node._listeners = {}))[name] = value;
            } else if ("list" !== name && "type" !== name && !isSvg && name in node) {
                try {
                    node[name] = null == value ? "" : value;
                } catch (e) {}
                null != value && !1 !== value || "spellcheck" == name || node.removeAttribute(name);
            } else {
                var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ""));
                null == value || !1 === value ? ns ? node.removeAttributeNS("http://www.w3.org/1999/xlink", name.toLowerCase()) : node.removeAttribute(name) : "function" != typeof value && (ns ? node.setAttributeNS("http://www.w3.org/1999/xlink", name.toLowerCase(), value) : node.setAttribute(name, value));
            } else node.className = value || "";
        }
        function eventProxy(e) {
            return this._listeners[e.type](options.event && options.event(e) || e);
        }
        var mounts = [], diffLevel = 0, isSvgMode = !1, hydrating = !1;
        function flushMounts() {
            for (var c = void 0; c = mounts.shift(); ) options.afterMount && options.afterMount(c), 
            c.componentDidMount && c.componentDidMount();
        }
        function diff(dom, vnode, context, mountAll, parent, componentRoot) {
            diffLevel++ || (isSvgMode = null != parent && void 0 !== parent.ownerSVGElement, 
            hydrating = null != dom && !(ATTR_KEY in dom));
            var ret = function idiff(dom, vnode, context, mountAll, componentRoot) {
                var out = dom, prevSvgMode = isSvgMode;
                if (null != vnode && "boolean" != typeof vnode || (vnode = ""), "string" == typeof vnode || "number" == typeof vnode) return dom && void 0 !== dom.splitText && dom.parentNode && (!dom._component || componentRoot) ? dom.nodeValue != vnode && (dom.nodeValue = vnode) : (out = document.createTextNode(vnode), 
                dom && (dom.parentNode && dom.parentNode.replaceChild(out, dom), recollectNodeTree(dom, !0))), 
                out[ATTR_KEY] = !0, out;
                var nodeName, node, vnodeName = vnode.nodeName;
                if ("function" == typeof vnodeName) return function(dom, vnode, context, mountAll) {
                    for (var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode); c && !isOwner && (c = c._parentComponent); ) isOwner = c.constructor === vnode.nodeName;
                    return c && isOwner && (!mountAll || c._component) ? (setComponentProps(c, props, ASYNC_RENDER, context, mountAll), 
                    dom = c.base) : (originalComponent && !isDirectOwner && (unmountComponent(originalComponent), 
                    dom = oldDom = null), c = createComponent(vnode.nodeName, props, context), dom && !c.nextBase && (c.nextBase = dom, 
                    oldDom = null), setComponentProps(c, props, SYNC_RENDER, context, mountAll), dom = c.base, 
                    oldDom && dom !== oldDom && (oldDom._component = null, recollectNodeTree(oldDom, !1))), 
                    dom;
                }(dom, vnode, context, mountAll);
                if (isSvgMode = "svg" === vnodeName || "foreignObject" !== vnodeName && isSvgMode, 
                vnodeName = String(vnodeName), (!dom || !isNamedNode(dom, vnodeName)) && (nodeName = vnodeName, 
                (node = isSvgMode ? document.createElementNS("http://www.w3.org/2000/svg", nodeName) : document.createElement(nodeName)).normalizedNodeName = nodeName, 
                out = node, dom)) {
                    for (;dom.firstChild; ) out.appendChild(dom.firstChild);
                    dom.parentNode && dom.parentNode.replaceChild(out, dom), recollectNodeTree(dom, !0);
                }
                var fc = out.firstChild, props = out[ATTR_KEY], vchildren = vnode.children;
                if (null == props) {
                    props = out[ATTR_KEY] = {};
                    for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
                }
                return !hydrating && vchildren && 1 === vchildren.length && "string" == typeof vchildren[0] && null != fc && void 0 !== fc.splitText && null == fc.nextSibling ? fc.nodeValue != vchildren[0] && (fc.nodeValue = vchildren[0]) : (vchildren && vchildren.length || null != fc) && function(dom, vchildren, context, mountAll, isHydrating) {
                    var originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren ? vchildren.length : 0, j = void 0, c = void 0, f = void 0, vchild = void 0, child = void 0;
                    if (0 !== len) for (var i = 0; i < len; i++) {
                        var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
                        null != key ? (keyedLen++, keyed[key] = _child) : (props || (void 0 !== _child.splitText ? !isHydrating || _child.nodeValue.trim() : isHydrating)) && (children[childrenLen++] = _child);
                    }
                    if (0 !== vlen) for (var _i = 0; _i < vlen; _i++) {
                        child = null;
                        var _key = (vchild = vchildren[_i]).key;
                        if (null != _key) keyedLen && void 0 !== keyed[_key] && (child = keyed[_key], keyed[_key] = void 0, 
                        keyedLen--); else if (min < childrenLen) for (j = min; j < childrenLen; j++) if (void 0 !== children[j] && isSameNodeType(c = children[j], vchild, isHydrating)) {
                            child = c, children[j] = void 0, j === childrenLen - 1 && childrenLen--, j === min && min++;
                            break;
                        }
                        child = idiff(child, vchild, context, mountAll), f = originalChildren[_i], child && child !== dom && child !== f && (null == f ? dom.appendChild(child) : child === f.nextSibling ? removeNode(f) : dom.insertBefore(child, f));
                    }
                    if (keyedLen) for (var _i2 in keyed) void 0 !== keyed[_i2] && recollectNodeTree(keyed[_i2], !1);
                    for (;min <= childrenLen; ) void 0 !== (child = children[childrenLen--]) && recollectNodeTree(child, !1);
                }(out, vchildren, context, mountAll, hydrating || null != props.dangerouslySetInnerHTML), 
                function(dom, attrs, old) {
                    var name = void 0;
                    for (name in old) attrs && null != attrs[name] || null == old[name] || setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
                    for (name in attrs) "children" === name || "innerHTML" === name || name in old && attrs[name] === ("value" === name || "checked" === name ? dom[name] : old[name]) || setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
                }(out, vnode.attributes, props), isSvgMode = prevSvgMode, out;
            }(dom, vnode, context, mountAll, componentRoot);
            return parent && ret.parentNode !== parent && parent.appendChild(ret), --diffLevel || (hydrating = !1, 
            componentRoot || flushMounts()), ret;
        }
        function recollectNodeTree(node, unmountOnly) {
            var component = node._component;
            component ? unmountComponent(component) : (null != node[ATTR_KEY] && applyRef(node[ATTR_KEY].ref, null), 
            !1 !== unmountOnly && null != node[ATTR_KEY] || removeNode(node), removeChildren(node));
        }
        function removeChildren(node) {
            for (node = node.lastChild; node; ) {
                var next = node.previousSibling;
                recollectNodeTree(node, !0), node = next;
            }
        }
        var recyclerComponents = [];
        function createComponent(Ctor, props, context) {
            var inst = void 0, i = recyclerComponents.length;
            for (Ctor.prototype && Ctor.prototype.render ? (inst = new Ctor(props, context), 
            Component.call(inst, props, context)) : ((inst = new Component(props, context)).constructor = Ctor, 
            inst.render = doRender); i--; ) if (recyclerComponents[i].constructor === Ctor) return inst.nextBase = recyclerComponents[i].nextBase, 
            recyclerComponents.splice(i, 1), inst;
            return inst;
        }
        function doRender(props, state, context) {
            return this.constructor(props, context);
        }
        function setComponentProps(component, props, renderMode, context, mountAll) {
            component._disable || (component._disable = !0, component.__ref = props.ref, component.__key = props.key, 
            delete props.ref, delete props.key, void 0 === component.constructor.getDerivedStateFromProps && (!component.base || mountAll ? component.componentWillMount && component.componentWillMount() : component.componentWillReceiveProps && component.componentWillReceiveProps(props, context)), 
            context && context !== component.context && (component.prevContext || (component.prevContext = component.context), 
            component.context = context), component.prevProps || (component.prevProps = component.props), 
            component.props = props, component._disable = !1, renderMode !== NO_RENDER && (renderMode !== SYNC_RENDER && !1 === options.syncComponentUpdates && component.base ? enqueueRender(component) : renderComponent(component, SYNC_RENDER, mountAll)), 
            applyRef(component.__ref, component));
        }
        function renderComponent(component, renderMode, mountAll, isChild) {
            if (!component._disable) {
                var props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component, skip = !1, snapshot = previousContext, rendered = void 0, inst = void 0, cbase = void 0;
                if (component.constructor.getDerivedStateFromProps && (state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state)), 
                component.state = state), isUpdate && (component.props = previousProps, component.state = previousState, 
                component.context = previousContext, renderMode !== FORCE_RENDER && component.shouldComponentUpdate && !1 === component.shouldComponentUpdate(props, state, context) ? skip = !0 : component.componentWillUpdate && component.componentWillUpdate(props, state, context), 
                component.props = props, component.state = state, component.context = context), 
                component.prevProps = component.prevState = component.prevContext = component.nextBase = null, 
                component._dirty = !1, !skip) {
                    rendered = component.render(props, state, context), component.getChildContext && (context = extend(extend({}, context), component.getChildContext())), 
                    isUpdate && component.getSnapshotBeforeUpdate && (snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState));
                    var childComponent = rendered && rendered.nodeName, toUnmount = void 0, base = void 0;
                    if ("function" == typeof childComponent) {
                        var childProps = getNodeProps(rendered);
                        (inst = initialChildComponent) && inst.constructor === childComponent && childProps.key == inst.__key ? setComponentProps(inst, childProps, SYNC_RENDER, context, !1) : (toUnmount = inst, 
                        component._component = inst = createComponent(childComponent, childProps, context), 
                        inst.nextBase = inst.nextBase || nextBase, inst._parentComponent = component, setComponentProps(inst, childProps, NO_RENDER, context, !1), 
                        renderComponent(inst, SYNC_RENDER, mountAll, !0)), base = inst.base;
                    } else cbase = initialBase, (toUnmount = initialChildComponent) && (cbase = component._component = null), 
                    (initialBase || renderMode === SYNC_RENDER) && (cbase && (cbase._component = null), 
                    base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0));
                    if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                        var baseParent = initialBase.parentNode;
                        baseParent && base !== baseParent && (baseParent.replaceChild(base, initialBase), 
                        toUnmount || (initialBase._component = null, recollectNodeTree(initialBase, !1)));
                    }
                    if (toUnmount && unmountComponent(toUnmount), component.base = base, base && !isChild) {
                        for (var componentRef = component, t = component; t = t._parentComponent; ) (componentRef = t).base = base;
                        base._component = componentRef, base._componentConstructor = componentRef.constructor;
                    }
                }
                for (!isUpdate || mountAll ? mounts.push(component) : skip || (component.componentDidUpdate && component.componentDidUpdate(previousProps, previousState, snapshot), 
                options.afterUpdate && options.afterUpdate(component)); component._renderCallbacks.length; ) component._renderCallbacks.pop().call(component);
                diffLevel || isChild || flushMounts();
            }
        }
        function unmountComponent(component) {
            options.beforeUnmount && options.beforeUnmount(component);
            var base = component.base;
            component._disable = !0, component.componentWillUnmount && component.componentWillUnmount(), 
            component.base = null;
            var inner = component._component;
            inner ? unmountComponent(inner) : base && (null != base[ATTR_KEY] && applyRef(base[ATTR_KEY].ref, null), 
            component.nextBase = base, removeNode(base), recyclerComponents.push(component), 
            removeChildren(base)), applyRef(component.__ref, null);
        }
        function Component(props, context) {
            this._dirty = !0, this.context = context, this.props = props, this.state = this.state || {}, 
            this._renderCallbacks = [];
        }
        function render(vnode, parent, merge) {
            return diff(merge, vnode, {}, !1, parent, !1);
        }
        function createRef() {
            return {};
        }
        extend(Component.prototype, {
            setState: function(state, callback) {
                this.prevState || (this.prevState = this.state), this.state = extend(extend({}, this.state), "function" == typeof state ? state(this.state, this.props) : state), 
                callback && this._renderCallbacks.push(callback), enqueueRender(this);
            },
            forceUpdate: function(callback) {
                callback && this._renderCallbacks.push(callback), renderComponent(this, FORCE_RENDER);
            },
            render: function() {}
        }), exports.default = {
            h: h,
            createElement: h,
            cloneElement: cloneElement,
            createRef: createRef,
            Component: Component,
            render: render,
            rerender: rerender,
            options: options
        }, exports.h = h, exports.createElement = h, exports.cloneElement = cloneElement, 
        exports.createRef = createRef, exports.Component = Component, exports.render = render, 
        exports.rerender = rerender, exports.options = options, Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }(exports);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var preact_umd = __webpack_require__(0);
    function setupMenu() {
        Object(preact_umd.render)(Object(preact_umd.h)("div", null, "Hello World"), function() {
            var body = document.body;
            if (!body) throw new Error("Document body not found");
            return body;
        }());
    }
    Object.create(Error.prototype), __webpack_require__.d(__webpack_exports__, "setupMenu", function() {
        return setupMenu;
    });
} ]);
//# sourceMappingURL=smart-menu.js.map