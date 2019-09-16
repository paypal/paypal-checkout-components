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
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 27);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var COUNTRY = {
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
    }, SDK_QUERY_KEYS = {
        COMPONENTS: "components",
        ENV: "env",
        DEBUG: "debug",
        CACHEBUST: "cachebust",
        CLIENT_ID: "client-id",
        MERCHANT_ID: "merchant-id",
        MERCHANT_EMAIL_HASH: "merchant-email-hash",
        LOCALE: "locale",
        CURRENCY: "currency",
        INTENT: "intent",
        COMMIT: "commit",
        VAULT: "vault",
        BUYER_COUNTRY: "buyer-country",
        DISABLE_FUNDING: "disable-funding",
        DISABLE_CARD: "disable-card",
        LOCALE_COUNTRY: "locale-country",
        LOCALE_LANG: "locale-lang",
        FRAMEWORK: "framework",
        INTEGRATION_DATE: "integration-date",
        ORDER_CURRENCY: "order-currency",
        ORDER_INTENT: "order-intent",
        ORDER_COMMIT: "order-commit",
        ORDER_VAULT: "order-vault"
    }, FPTI_KEY = {
        FEED: "feed_name",
        STATE: "state_name",
        TRANSITION: "transition_name",
        BUTTON_TYPE: "button_type",
        SESSION_UID: "page_session_id",
        BUTTON_SESSION_UID: "button_session_id",
        TOKEN: "token",
        CONTEXT_ID: "context_id",
        CONTEXT_TYPE: "context_type",
        REFERER: "referer_url",
        MERCHANT_DOMAIN: "merchant_domain",
        PAY_ID: "pay_id",
        SELLER_ID: "seller_id",
        CLIENT_ID: "client_id",
        DATA_SOURCE: "serverside_data_source",
        BUTTON_SOURCE: "button_source",
        ERROR_CODE: "ext_error_code",
        ERROR_DESC: "ext_error_desc",
        PAGE_LOAD_TIME: "page_load_time",
        EXPERIMENT_NAME: "pxp_exp_id",
        TREATMENT_NAME: "pxp_trtmnt_id",
        TRANSITION_TIME: "transition_time",
        FUNDING_LIST: "eligible_payment_methods",
        FUNDING_COUNT: "eligible_payment_count",
        CHOSEN_FUNDING: "selected_payment_method",
        BUTTON_LAYOUT: "button_layout",
        VERSION: "checkoutjs_version",
        LOCALE: "locale",
        BUYER_COUNTRY: "buyer_cntry",
        INTEGRATION_IDENTIFIER: "integration_identifier",
        PARTNER_ATTRIBUTION_ID: "bn_code",
        SDK_NAME: "sdk_name",
        SDK_VERSION: "sdk_version",
        USER_AGENT: "user_agent",
        USER_ACTION: "user_action",
        CONTEXT_CORRID: "context_correlation_id",
        SDK_CACHE: "sdk_cache",
        SDK_LOAD_TIME: "sdk_load_time"
    }, FPTI_USER_ACTION = {
        COMMIT: "commit",
        CONTINUE: "continue"
    }, FPTI_DATA_SOURCE = {
        PAYMENTS_SDK: "checkout"
    }, FPTI_FEED = {
        PAYMENTS_SDK: "payments_sdk"
    }, FPTI_SDK_NAME = {
        PAYMENTS_SDK: "payments_sdk"
    }, INTENT = {
        CAPTURE: "capture",
        AUTHORIZE: "authorize",
        ORDER: "order"
    }, PLATFORM = {
        DESKTOP: "desktop",
        MOBILE: "mobile"
    }, FUNDING = {
        PAYPAL: "paypal",
        VENMO: "venmo",
        ITAU: "itau",
        CREDIT: "credit",
        CARD: "card",
        IDEAL: "ideal",
        SEPA: "sepa",
        BANCONTACT: "bancontact",
        GIROPAY: "giropay",
        SOFORT: "sofort",
        EPS: "eps",
        MYBANK: "mybank",
        P24: "p24",
        VERKKOPANKKI: "verkkopankki",
        PAYU: "payu",
        ZIMPLER: "zimpler",
        WECHATPAY: "wechatpay"
    };
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return COUNTRY;
    })), __webpack_require__.d(__webpack_exports__, "j", (function() {
        return SDK_QUERY_KEYS;
    })), __webpack_require__.d(__webpack_exports__, "d", (function() {
        return FPTI_KEY;
    })), __webpack_require__.d(__webpack_exports__, "f", (function() {
        return FPTI_USER_ACTION;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        return FPTI_DATA_SOURCE;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return FPTI_FEED;
    })), __webpack_require__.d(__webpack_exports__, "e", (function() {
        return FPTI_SDK_NAME;
    })), __webpack_require__.d(__webpack_exports__, "h", (function() {
        return INTENT;
    })), __webpack_require__.d(__webpack_exports__, "i", (function() {
        return PLATFORM;
    })), __webpack_require__.d(__webpack_exports__, "g", (function() {
        return FUNDING;
    }));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "n", (function() {
        return SMART_BUTTONS;
    })), __webpack_require__.d(__webpack_exports__, "o", (function() {
        return SMART_PAYMENT_BUTTONS;
    })), __webpack_require__.d(__webpack_exports__, "j", (function() {
        return HEADERS;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return DATA_ATTRIBUTES;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return CLASS;
    })), __webpack_require__.d(__webpack_exports__, "l", (function() {
        return ORDER_API_ERROR;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        return CONTEXT;
    })), __webpack_require__.d(__webpack_exports__, "p", (function() {
        return TARGET_ELEMENT;
    })), __webpack_require__.d(__webpack_exports__, "k", (function() {
        return INTEGRATION_ARTIFACT;
    })), __webpack_require__.d(__webpack_exports__, "r", (function() {
        return USER_EXPERIENCE_FLOW;
    })), __webpack_require__.d(__webpack_exports__, "d", (function() {
        return DOM_EVENT;
    })), __webpack_require__.d(__webpack_exports__, "m", (function() {
        return PRODUCT_FLOW;
    })), __webpack_require__.d(__webpack_exports__, "f", (function() {
        return FPTI_CONTEXT_TYPE;
    })), __webpack_require__.d(__webpack_exports__, "g", (function() {
        return FPTI_STATE;
    })), __webpack_require__.d(__webpack_exports__, "h", (function() {
        return FPTI_TRANSITION;
    })), __webpack_require__.d(__webpack_exports__, "e", (function() {
        return FPTI_BUTTON_TYPE;
    })), __webpack_require__.d(__webpack_exports__, "i", (function() {
        return FTPI_BUTTON_KEY;
    })), __webpack_require__.d(__webpack_exports__, "q", (function() {
        return USER_ACTION;
    }));
    var SMART_BUTTONS = "smart_buttons", SMART_PAYMENT_BUTTONS = "smart-payment-buttons", HEADERS = {
        AUTHORIZATION: "authorization",
        ACCESS_TOKEN: "x-paypal-internal-euat",
        CSRF_TOKEN: "x-csrf-jwt",
        SOURCE: "x-source",
        REQUESTED_BY: "x-requested-by",
        PARTNER_ATTRIBUTION_ID: "paypal-partner-attribution-id",
        CLIENT_METADATA_ID: "paypal-client-metadata-id",
        PAYPAL_DEBUG_ID: "paypal-debug-id"
    }, DATA_ATTRIBUTES = {
        FUNDING_SOURCE: "data-funding-source",
        CARD: "data-card",
        PAYMENT_METHOD_ID: "data-payment-method-id"
    }, CLASS = {
        LOADING: "paypal-button-loading",
        CLICKED: "paypal-button-clicked"
    }, ORDER_API_ERROR = {
        INSTRUMENT_DECLINED: "INSTRUMENT_DECLINED",
        PAYER_ACTION_REQUIRED: "PAYER_ACTION_REQUIRED"
    }, CONTEXT = {
        IFRAME: "iframe",
        POPUP: "popup"
    }, TARGET_ELEMENT = {
        BODY: "body"
    }, INTEGRATION_ARTIFACT = {
        PAYPAL_JS_SDK: "PAYPAL_JS_SDK"
    }, USER_EXPERIENCE_FLOW = {
        INCONTEXT: "INCONTEXT",
        INLINE: "INLINE"
    }, DOM_EVENT = {
        MOUSEDOWN: "mousedown",
        HOVER: "hover"
    }, PRODUCT_FLOW = {
        SMART_PAYMENT_BUTTONS: "SMART_PAYMENT_BUTTONS"
    }, FPTI_CONTEXT_TYPE = {
        BUTTON_SESSION_ID: "button_session_id",
        ORDER_ID: "EC-Token"
    }, FPTI_STATE = {
        BUTTON: "smart_button"
    }, FPTI_TRANSITION = {
        BUTTON_LOAD: "process_button_load",
        BUTTON_CLICK: "process_button_click",
        CREATE_ORDER: "process_create_order",
        RECEIVE_ORDER: "process_receive_order",
        CHECKOUT_SHIPPING_CHANGE: "process_checkout_shipping_change",
        CHECKOUT_AUTHORIZE: "process_checkout_authorize",
        CHECKOUT_CANCEL: "process_checkout_cancel"
    }, FPTI_BUTTON_TYPE = {
        IFRAME: "iframe"
    }, FTPI_BUTTON_KEY = {
        BUTTON_LAYOUT: "button_layout",
        BUTTON_COLOR: "button_color",
        BUTTON_SIZE: "button_size",
        BUTTON_SHAPE: "button_shape",
        BUTTON_LABEL: "button_label",
        BUTTON_WIDTH: "button_width",
        BUTTON_TYPE: "button_type",
        BUTTON_TAGLINE_ENABLED: "button_tagline_enabled"
    }, USER_ACTION = {
        COMMIT: "commit",
        CONTINUE: "continue"
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
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
    var flushPromise, dispatchedErrors = [], possiblyUnhandledPromiseHandlers = [], activeCount = 0;
    function flushActive() {
        if (!activeCount && flushPromise) {
            var promise = flushPromise;
            flushPromise = null, promise.resolve();
        }
    }
    function startActive() {
        activeCount += 1;
    }
    function endActive() {
        activeCount -= 1, flushActive();
    }
    var promise_ZalgoPromise = function() {
        function ZalgoPromise(handler) {
            var _this = this;
            if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, 
            this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, 
            this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, 
            this.handlers = [], handler) {
                var _result, _error, resolved = !1, rejected = !1, isAsync = !1;
                startActive();
                try {
                    handler((function(res) {
                        isAsync ? _this.resolve(res) : (resolved = !0, _result = res);
                    }), (function(err) {
                        isAsync ? _this.reject(err) : (rejected = !0, _error = err);
                    }));
                } catch (err) {
                    return endActive(), void this.reject(err);
                }
                endActive(), isAsync = !0, resolved ? this.resolve(_result) : rejected && this.reject(_error);
            }
        }
        var _proto = ZalgoPromise.prototype;
        return _proto.resolve = function(result) {
            if (this.resolved || this.rejected) return this;
            if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
            return this.resolved = !0, this.value = result, this.dispatch(), this;
        }, _proto.reject = function(error) {
            var _this2 = this;
            if (this.resolved || this.rejected) return this;
            if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
            if (!error) {
                var _err = error && "function" == typeof error.toString ? error.toString() : {}.toString.call(error);
                error = new Error("Expected reject to be called with Error, got " + _err);
            }
            return this.rejected = !0, this.error = error, this.errorHandled || setTimeout((function() {
                _this2.errorHandled || function(err, promise) {
                    if (-1 === dispatchedErrors.indexOf(err)) {
                        dispatchedErrors.push(err), setTimeout((function() {
                            throw err;
                        }), 1);
                        for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                    }
                }(error, _this2);
            }), 1), this.dispatch(), this;
        }, _proto.asyncReject = function(error) {
            return this.errorHandled = !0, this.reject(error), this;
        }, _proto.dispatch = function() {
            var _this3 = this, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
            if (!this.dispatching && (resolved || rejected)) {
                this.dispatching = !0, startActive();
                for (var _loop = function(i) {
                    var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                    if (resolved) try {
                        result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                    } catch (err) {
                        return promise.reject(err), "continue";
                    } else if (rejected) {
                        if (!onError) return promise.reject(_this3.error), "continue";
                        try {
                            result = onError(_this3.error);
                        } catch (err) {
                            return promise.reject(err), "continue";
                        }
                    }
                    result instanceof ZalgoPromise && (result.resolved || result.rejected) ? (result.resolved ? promise.resolve(result.value) : promise.reject(result.error), 
                    result.errorHandled = !0) : utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then((function(res) {
                        promise.resolve(res);
                    }), (function(err) {
                        promise.reject(err);
                    })) : promise.resolve(result);
                }, i = 0; i < handlers.length; i++) _loop(i);
                handlers.length = 0, this.dispatching = !1, endActive();
            }
        }, _proto.then = function(onSuccess, onError) {
            if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
            if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
            var promise = new ZalgoPromise;
            return this.handlers.push({
                promise: promise,
                onSuccess: onSuccess,
                onError: onError
            }), this.errorHandled = !0, this.dispatch(), promise;
        }, _proto.catch = function(onError) {
            return this.then(void 0, onError);
        }, _proto.finally = function(onFinally) {
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
        }, _proto.timeout = function(time, err) {
            var _this4 = this;
            if (this.resolved || this.rejected) return this;
            var timeout = setTimeout((function() {
                _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
            }), time);
            return this.then((function(result) {
                return clearTimeout(timeout), result;
            }));
        }, _proto.toPromise = function() {
            if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
            return Promise.resolve(this);
        }, ZalgoPromise.resolve = function(value) {
            return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise((function(resolve, reject) {
                return value.then(resolve, reject);
            })) : (new ZalgoPromise).resolve(value);
        }, ZalgoPromise.reject = function(error) {
            return (new ZalgoPromise).reject(error);
        }, ZalgoPromise.asyncReject = function(error) {
            return (new ZalgoPromise).asyncReject(error);
        }, ZalgoPromise.all = function(promises) {
            var promise = new ZalgoPromise, count = promises.length, results = [];
            if (!count) return promise.resolve(results), promise;
            for (var _loop2 = function(i) {
                var prom = promises[i];
                if (prom instanceof ZalgoPromise) {
                    if (prom.resolved) return results[i] = prom.value, count -= 1, "continue";
                } else if (!utils_isPromise(prom)) return results[i] = prom, count -= 1, "continue";
                ZalgoPromise.resolve(prom).then((function(result) {
                    results[i] = result, 0 == (count -= 1) && promise.resolve(results);
                }), (function(err) {
                    promise.reject(err);
                }));
            }, i = 0; i < promises.length; i++) _loop2(i);
            return 0 === count && promise.resolve(results), promise;
        }, ZalgoPromise.hash = function(promises) {
            var result = {};
            return ZalgoPromise.all(Object.keys(promises).map((function(key) {
                return ZalgoPromise.resolve(promises[key]).then((function(value) {
                    result[key] = value;
                }));
            }))).then((function() {
                return result;
            }));
        }, ZalgoPromise.map = function(items, method) {
            return ZalgoPromise.all(items.map(method));
        }, ZalgoPromise.onPossiblyUnhandledException = function(handler) {
            return function(handler) {
                return possiblyUnhandledPromiseHandlers.push(handler), {
                    cancel: function() {
                        possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                    }
                };
            }(handler);
        }, ZalgoPromise.try = function(method, context, args) {
            if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
            var result;
            startActive();
            try {
                result = method.apply(context, args || []);
            } catch (err) {
                return endActive(), ZalgoPromise.reject(err);
            }
            return endActive(), ZalgoPromise.resolve(result);
        }, ZalgoPromise.delay = function(_delay) {
            return new ZalgoPromise((function(resolve) {
                setTimeout(resolve, _delay);
            }));
        }, ZalgoPromise.isPromise = function(value) {
            return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
        }, ZalgoPromise.flush = function() {
            return promise = flushPromise = flushPromise || new ZalgoPromise, flushActive(), 
            promise;
            var promise;
        }, ZalgoPromise;
    }();
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return promise_ZalgoPromise;
    }));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    function getUserAgent() {
        return window.navigator.mockUserAgent || window.navigator.userAgent;
    }
    function isOperaMini(ua) {
        return void 0 === ua && (ua = getUserAgent()), ua.indexOf("Opera Mini") > -1;
    }
    function isIEIntranet() {
        if (window.document.documentMode) try {
            var status = window.status;
            return window.status = "testIntranetMode", "testIntranetMode" === window.status && (window.status = status, 
            !0);
        } catch (err) {
            return !1;
        }
        return !1;
    }
    function supportsPopups(ua) {
        return void 0 === ua && (ua = getUserAgent()), !(function(ua) {
            return void 0 === ua && (ua = getUserAgent()), !!function(ua) {
                return void 0 === ua && (ua = getUserAgent()), /iPhone|iPod|iPad/.test(ua);
            }(ua) && (!!function(ua) {
                return void 0 === ua && (ua = getUserAgent()), /\bGSA\b/.test(ua);
            }(ua) || /.+AppleWebKit(?!.*Safari)/.test(ua));
        }(ua) || function(ua) {
            return void 0 === ua && (ua = getUserAgent()), !!function(ua) {
                return void 0 === ua && (ua = getUserAgent()), /Android/.test(ua);
            }(ua) && /Version\/[\d.]+/.test(ua) && !isOperaMini(ua);
        }(ua) || isOperaMini(ua) || function(ua) {
            return void 0 === ua && (ua = getUserAgent()), /FxiOS/i.test(ua);
        }(ua) || function(ua) {
            return void 0 === ua && (ua = getUserAgent()), /EdgiOS/i.test(ua);
        }(ua) || function(ua) {
            return void 0 === ua && (ua = getUserAgent()), -1 !== ua.indexOf("FBAN") || -1 !== ua.indexOf("FBAV");
        }(ua) || function(ua) {
            return void 0 === ua && (ua = getUserAgent()), /QQBrowser/.test(ua);
        }(ua) || "undefined" != typeof process && process.versions && process.versions.electron || (userAgent = getUserAgent(), 
        /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent)) || !0 === window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches);
        var userAgent;
    }
    var esm_extends = __webpack_require__(7), src = __webpack_require__(2), cross_domain_utils_src = __webpack_require__(9);
    function safeIndexOf(collection, item) {
        for (var i = 0; i < collection.length; i++) try {
            if (collection[i] === item) return i;
        } catch (err) {}
        return -1;
    }
    var objectIDs, weakmap_CrossDomainSafeWeakMap = function() {
        function CrossDomainSafeWeakMap() {
            if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, 
            this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__", function() {
                if ("undefined" == typeof WeakMap) return !1;
                if (void 0 === Object.freeze) return !1;
                try {
                    var testWeakMap = new WeakMap, testKey = {};
                    return Object.freeze(testKey), testWeakMap.set(testKey, "__testvalue__"), "__testvalue__" === testWeakMap.get(testKey);
                } catch (err) {
                    return !1;
                }
            }()) try {
                this.weakmap = new WeakMap;
            } catch (err) {}
            this.keys = [], this.values = [];
        }
        var _proto = CrossDomainSafeWeakMap.prototype;
        return _proto._cleanupClosedWindows = function() {
            for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                var value = keys[i];
                if (Object(cross_domain_utils_src.d)(value) && Object(cross_domain_utils_src.e)(value)) {
                    if (weakmap) try {
                        weakmap.delete(value);
                    } catch (err) {}
                    keys.splice(i, 1), this.values.splice(i, 1), i -= 1;
                }
            }
        }, _proto.isSafeToReadWrite = function(key) {
            return !Object(cross_domain_utils_src.d)(key);
        }, _proto.set = function(key, value) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                weakmap.set(key, value);
            } catch (err) {
                delete this.weakmap;
            }
            if (this.isSafeToReadWrite(key)) try {
                var name = this.name, entry = key[name];
                return void (entry && entry[0] === key ? entry[1] = value : Object.defineProperty(key, name, {
                    value: [ key, value ],
                    writable: !0
                }));
            } catch (err) {}
            this._cleanupClosedWindows();
            var keys = this.keys, values = this.values, index = safeIndexOf(keys, key);
            -1 === index ? (keys.push(key), values.push(value)) : values[index] = value;
        }, _proto.get = function(key) {
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
            var index = safeIndexOf(this.keys, key);
            if (-1 !== index) return this.values[index];
        }, _proto.delete = function(key) {
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
            var keys = this.keys, index = safeIndexOf(keys, key);
            -1 !== index && (keys.splice(index, 1), this.values.splice(index, 1));
        }, _proto.has = function(key) {
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
            return this._cleanupClosedWindows(), -1 !== safeIndexOf(this.keys, key);
        }, _proto.getOrSet = function(key, getter) {
            if (this.has(key)) return this.get(key);
            var value = getter();
            return this.set(key, value), value;
        }, CrossDomainSafeWeakMap;
    }();
    function base64encode(str) {
        if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
            return String.fromCharCode(parseInt(p1, 16));
        })));
        if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64");
        throw new Error("Can not find window.btoa or Buffer");
    }
    function uniqueID() {
        var chars = "0123456789abcdef";
        return "xxxxxxxxxx".replace(/./g, (function() {
            return chars.charAt(Math.floor(Math.random() * chars.length));
        })) + "_" + base64encode((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    }
    function serializeArgs(args) {
        try {
            return JSON.stringify([].slice.call(args), (function(subkey, val) {
                return "function" == typeof val ? "memoize[" + function(obj) {
                    if (objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap, null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                    var uid = objectIDs.get(obj);
                    return uid || (uid = typeof obj + ":" + uniqueID(), objectIDs.set(obj, uid)), uid;
                }(val) + "]" : val;
            }));
        } catch (err) {
            throw new Error("Arguments not serializable -- can not be used to memoize");
        }
    }
    function memoize(method, options) {
        var _this = this;
        void 0 === options && (options = {});
        var cacheMap = new weakmap_CrossDomainSafeWeakMap, memoizedFunction = function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            var cache = cacheMap.getOrSet(options.thisNamespace ? this : method, (function() {
                return {};
            })), key = serializeArgs(args), cacheTime = options.time;
            if (cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime && delete cache[key], 
            cache[key]) return cache[key].value;
            var time = Date.now(), value = method.apply(this, arguments);
            return cache[key] = {
                time: time,
                value: value
            }, cache[key].value;
        };
        return memoizedFunction.reset = function() {
            cacheMap.delete(options.thisNamespace ? _this : method);
        }, options.name && (memoizedFunction.displayName = options.name + ":memoized"), 
        memoizedFunction;
    }
    function inlineMemoize(method, logic, args) {
        void 0 === args && (args = []);
        var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {}, key = serializeArgs(args);
        return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
    }
    function util_noop() {}
    function once(method) {
        var called = !1;
        return function() {
            if (!called) return called = !0, method.apply(this, arguments);
        };
    }
    function stringifyError(err, level) {
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
            return err && err.toString && "function" == typeof err.toString ? err.toString() : {}.toString.call(err);
        } catch (newErr) {
            return "Error while stringifying error: " + stringifyError(newErr, level + 1);
        }
    }
    function stringifyErrorMessage(err) {
        var defaultMessage = "<unknown error: " + {}.toString.call(err) + ">";
        return err ? err instanceof Error ? err.message || defaultMessage : "string" == typeof err.message && err.message || defaultMessage : defaultMessage;
    }
    function objFilter(obj, filter) {
        void 0 === filter && (filter = Boolean);
        var result = {};
        for (var key in obj) obj.hasOwnProperty(key) && filter(obj[key], key) && (result[key] = obj[key]);
        return result;
    }
    function promiseDebounce(method, delay) {
        var promise, timeout;
        return void 0 === delay && (delay = 50), function() {
            timeout && clearTimeout(timeout);
            var localPromise = promise = promise || new src.a;
            return timeout = setTimeout((function() {
                promise = null, timeout = null, src.a.try(method).then((function(result) {
                    localPromise.resolve(result);
                }), (function(err) {
                    localPromise.reject(err);
                }));
            }), delay), localPromise;
        };
    }
    function safeInterval(method, time) {
        var timeout;
        return function loop() {
            timeout = setTimeout((function() {
                method(), loop();
            }), time);
        }(), {
            cancel: function() {
                clearTimeout(timeout);
            }
        };
    }
    function debounce(method, time) {
        var timeout;
        return void 0 === time && (time = 100), function() {
            var _this4 = this, _arguments3 = arguments;
            clearTimeout(timeout), timeout = setTimeout((function() {
                return method.apply(_this4, _arguments3);
            }), time);
        };
    }
    var KEY_CODES = {
        ENTER: 13
    };
    function isDocumentReady() {
        return Boolean(document.body) && "complete" === document.readyState;
    }
    function urlEncode(str) {
        return str.replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B");
    }
    function waitForDocumentReady() {
        return inlineMemoize(waitForDocumentReady, (function() {
            return new src.a((function(resolve) {
                if (isDocumentReady()) return resolve();
                var interval = setInterval((function() {
                    if (isDocumentReady()) return clearInterval(interval), resolve();
                }), 10);
            }));
        }));
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
    function extendQuery(originalQuery, props) {
        return void 0 === props && (props = {}), props && Object.keys(props).length ? (void 0 === (obj = Object(esm_extends.a)({}, parseQuery(originalQuery), {}, props)) && (obj = {}), 
        Object.keys(obj).filter((function(key) {
            return "string" == typeof obj[key];
        })).map((function(key) {
            return urlEncode(key) + "=" + urlEncode(obj[key]);
        })).join("&")) : originalQuery;
        var obj;
    }
    function extendUrl(url, options) {
        void 0 === options && (options = {});
        var originalUrl, originalHash, query = options.query || {}, hash = options.hash || {}, _url$split = url.split("#");
        originalHash = _url$split[1];
        var _originalUrl$split = (originalUrl = _url$split[0]).split("?");
        originalUrl = _originalUrl$split[0];
        var queryString = extendQuery(_originalUrl$split[1], query), hashString = extendQuery(originalHash, hash);
        return queryString && (originalUrl = originalUrl + "?" + queryString), hashString && (originalUrl = originalUrl + "#" + hashString), 
        originalUrl;
    }
    function redirect(url, win) {
        return void 0 === win && (win = window), new src.a((function(resolve) {
            win.location = url, function(url) {
                return -1 === url.indexOf("#") || 0 !== url.indexOf("#") && url.split("#")[0] !== window.location.href.split("#")[0];
            }(url) || resolve();
        }));
    }
    function enablePerformance() {
        return inlineMemoize(enablePerformance, (function() {
            return Boolean(window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0);
        }));
    }
    function getPageRenderTime() {
        return waitForDocumentReady().then((function() {
            if (enablePerformance()) {
                var timing = window.performance.timing;
                return timing.connectEnd && timing.domInteractive ? timing.domInteractive - timing.connectEnd : void 0;
            }
        }));
    }
    function isBrowser() {
        return "undefined" != typeof window;
    }
    function querySelectorAll(selector, doc) {
        return void 0 === doc && (doc = window.document), [].slice.call(doc.querySelectorAll(selector));
    }
    function onClick(element, handler) {
        element.addEventListener("touchstart", util_noop), element.addEventListener("click", handler), 
        element.addEventListener("keypress", (function(event) {
            if (event.keyCode === KEY_CODES.ENTER) return handler(event);
        }));
    }
    Object.create(Error.prototype);
    var HEADERS = {
        CONTENT_TYPE: "content-type",
        ACCEPT: "accept"
    }, headerBuilders = [];
    function request(_ref) {
        var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 0 : _ref$timeout;
        return new src.a((function(resolve, reject) {
            if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
            for (var normalizedHeaders = {}, _i4 = 0, _Object$keys2 = Object.keys(headers); _i4 < _Object$keys2.length; _i4++) {
                var _key2 = _Object$keys2[_i4];
                normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
            }
            json ? normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/json" : (data || body) && (normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/x-www-form-urlencoded; charset=utf-8"), 
            normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || "application/json";
            for (var _i6 = 0; _i6 < headerBuilders.length; _i6++) for (var builtHeaders = (0, 
            headerBuilders[_i6])(), _i8 = 0, _Object$keys4 = Object.keys(builtHeaders); _i8 < _Object$keys4.length; _i8++) {
                var _key3 = _Object$keys4[_i8];
                normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
            }
            var xhr = new win.XMLHttpRequest;
            for (var _key4 in xhr.addEventListener("load", (function() {
                var responseHeaders = function(rawHeaders) {
                    void 0 === rawHeaders && (rawHeaders = "");
                    for (var result = {}, _i2 = 0, _rawHeaders$trim$spli2 = rawHeaders.trim().split("\n"); _i2 < _rawHeaders$trim$spli2.length; _i2++) {
                        var _line$split = _rawHeaders$trim$spli2[_i2].split(":"), _key = _line$split[0], values = _line$split.slice(1);
                        result[_key.toLowerCase()] = values.join(":").trim();
                    }
                    return result;
                }(this.getAllResponseHeaders());
                if (!this.status) return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code."));
                var contentType = responseHeaders["content-type"], isJSON = contentType && (0 === contentType.indexOf("application/json") || 0 === contentType.indexOf("text/json")), responseBody = this.responseText;
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
            }), !1), xhr.addEventListener("error", (function(evt) {
                reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
            }), !1), xhr.open(method, url, !0), normalizedHeaders) normalizedHeaders.hasOwnProperty(_key4) && xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
            json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map((function(key) {
                return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
            })).join("&")), xhr.timeout = timeout, xhr.ontimeout = function() {
                reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
            }, xhr.send(body);
        }));
    }
    __webpack_require__.d(__webpack_exports__, "e", (function() {
        return getUserAgent;
    })), __webpack_require__.d(__webpack_exports__, "h", (function() {
        return isIEIntranet;
    })), __webpack_require__.d(__webpack_exports__, "u", (function() {
        return supportsPopups;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return extendUrl;
    })), __webpack_require__.d(__webpack_exports__, "p", (function() {
        return redirect;
    })), __webpack_require__.d(__webpack_exports__, "d", (function() {
        return getPageRenderTime;
    })), __webpack_require__.d(__webpack_exports__, "g", (function() {
        return isBrowser;
    })), __webpack_require__.d(__webpack_exports__, "o", (function() {
        return querySelectorAll;
    })), __webpack_require__.d(__webpack_exports__, "l", (function() {
        return onClick;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return base64encode;
    })), __webpack_require__.d(__webpack_exports__, "v", (function() {
        return uniqueID;
    })), __webpack_require__.d(__webpack_exports__, "i", (function() {
        return memoize;
    })), __webpack_require__.d(__webpack_exports__, "f", (function() {
        return inlineMemoize;
    })), __webpack_require__.d(__webpack_exports__, "j", (function() {
        return util_noop;
    })), __webpack_require__.d(__webpack_exports__, "m", (function() {
        return once;
    })), __webpack_require__.d(__webpack_exports__, "s", (function() {
        return stringifyError;
    })), __webpack_require__.d(__webpack_exports__, "t", (function() {
        return stringifyErrorMessage;
    })), __webpack_require__.d(__webpack_exports__, "k", (function() {
        return objFilter;
    })), __webpack_require__.d(__webpack_exports__, "n", (function() {
        return promiseDebounce;
    })), __webpack_require__.d(__webpack_exports__, "r", (function() {
        return safeInterval;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        return debounce;
    })), __webpack_require__.d(__webpack_exports__, "q", (function() {
        return request;
    }));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var src = __webpack_require__(2), belter_src = __webpack_require__(3), constants = __webpack_require__(1);
    function unresolvedPromise() {
        return new src.a(belter_src.j);
    }
    function promiseNoop() {
        return src.a.resolve();
    }
    function sendBeacon(url) {
        var img = document.createElement("img");
        img.src = url, img.style.visibility = "hidden", img.style.position = "absolute", 
        document.body && document.body.appendChild(img);
    }
    function fixClickFocus(el) {
        el.addEventListener(constants.d.MOUSEDOWN, (function() {
            el.classList.add(constants.a.CLICKED);
        })), el.addEventListener(constants.d.HOVER, (function(event) {
            el.classList.contains(constants.a.CLICKED) && (event.preventDefault(), el.blur(), 
            el.classList.remove(constants.a.CLICKED));
        }));
    }
    function redirectTop(url) {
        window.top.location = url;
    }
    var esm_extends = __webpack_require__(7), LOG_LEVEL = {
        DEBUG: "debug",
        INFO: "info",
        WARN: "warn",
        ERROR: "error"
    }, PROTOCOL = {
        FILE: "file:"
    }, AUTO_FLUSH_LEVEL = [ LOG_LEVEL.WARN, LOG_LEVEL.ERROR ], LOG_LEVEL_PRIORITY = [ LOG_LEVEL.ERROR, LOG_LEVEL.WARN, LOG_LEVEL.INFO, LOG_LEVEL.DEBUG ], FLUSH_INTERVAL = 6e4, DEFAULT_LOG_LEVEL = LOG_LEVEL.WARN;
    function httpTransport(_ref) {
        var url = _ref.url, method = _ref.method, headers = _ref.headers, json = _ref.json;
        return Object(belter_src.q)({
            url: url,
            method: method,
            headers: headers,
            json: json
        }).then(belter_src.j);
    }
    function extendIfDefined(target, source) {
        for (var key in source) source.hasOwnProperty(key) && source[key] && !target[key] && (target[key] = source[key]);
    }
    var sdk_constants_src = __webpack_require__(0), config = __webpack_require__(5);
    function getLogger() {
        return Object(belter_src.f)(getLogger, (function() {
            return function(_ref2) {
                var url = _ref2.url, prefix = _ref2.prefix, _ref2$logLevel = _ref2.logLevel, logLevel = void 0 === _ref2$logLevel ? DEFAULT_LOG_LEVEL : _ref2$logLevel, _ref2$transport = _ref2.transport, transport = void 0 === _ref2$transport ? httpTransport : _ref2$transport, _ref2$flushInterval = _ref2.flushInterval, flushInterval = void 0 === _ref2$flushInterval ? FLUSH_INTERVAL : _ref2$flushInterval, events = [], tracking = [], payloadBuilders = [], metaBuilders = [], trackingBuilders = [], headerBuilders = [];
                function print(level, event, payload) {
                    if (Object(belter_src.g)() && window.console && window.console.log) {
                        var consoleLogLevel = logLevel;
                        if (window.LOG_LEVEL && -1 !== LOG_LEVEL_PRIORITY.indexOf(window.LOG_LEVEL) && (consoleLogLevel = window.LOG_LEVEL), 
                        !(LOG_LEVEL_PRIORITY.indexOf(level) > LOG_LEVEL_PRIORITY.indexOf(consoleLogLevel))) {
                            var args = [ event ];
                            args.push(payload), (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                            try {
                                window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                            } catch (err) {}
                        }
                    }
                }
                function immediateFlush() {
                    return src.a.try((function() {
                        if (Object(belter_src.g)() && window.location.protocol !== PROTOCOL.FILE && (events.length || tracking.length)) {
                            for (var meta = {}, _i2 = 0; _i2 < metaBuilders.length; _i2++) extendIfDefined(meta, (0, 
                            metaBuilders[_i2])(meta));
                            for (var headers = {}, _i4 = 0; _i4 < headerBuilders.length; _i4++) extendIfDefined(headers, (0, 
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
                            return events = [], tracking = [], req.then(belter_src.j);
                        }
                    }));
                }
                var flush = Object(belter_src.n)(immediateFlush);
                function log(level, event, payload) {
                    if (void 0 === payload && (payload = {}), !Object(belter_src.g)()) return logger;
                    prefix && (event = prefix + "_" + event);
                    for (var logPayload = Object(esm_extends.a)({}, Object(belter_src.k)(payload), {
                        timestamp: Date.now().toString()
                    }), _i6 = 0; _i6 < payloadBuilders.length; _i6++) extendIfDefined(logPayload, (0, 
                    payloadBuilders[_i6])(logPayload));
                    return function(level, event, payload) {
                        events.push({
                            level: level,
                            event: event,
                            payload: payload
                        }), -1 !== AUTO_FLUSH_LEVEL.indexOf(level) && flush();
                    }(level, event, logPayload), print(level, event, logPayload), logger;
                }
                function addBuilder(builders, builder) {
                    return builders.push(builder), logger;
                }
                Object(belter_src.g)() && Object(belter_src.r)(flush, flushInterval);
                var logger = {
                    debug: function(event, payload) {
                        return log(LOG_LEVEL.DEBUG, event, payload);
                    },
                    info: function(event, payload) {
                        return log(LOG_LEVEL.INFO, event, payload);
                    },
                    warn: function(event, payload) {
                        return log(LOG_LEVEL.WARN, event, payload);
                    },
                    error: function(event, payload) {
                        return log(LOG_LEVEL.ERROR, event, payload);
                    },
                    track: function(payload) {
                        if (void 0 === payload && (payload = {}), !Object(belter_src.g)()) return logger;
                        for (var trackingPayload = Object(belter_src.k)(payload), _i8 = 0; _i8 < trackingBuilders.length; _i8++) extendIfDefined(trackingPayload, (0, 
                        trackingBuilders[_i8])(trackingPayload));
                        return print(LOG_LEVEL.DEBUG, "track", trackingPayload), tracking.push(trackingPayload), 
                        logger;
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
                        return transport = newTransport, logger;
                    }
                };
                return logger;
            }({
                url: config.g
            });
        }));
    }
    function setupLogger(_ref) {
        var env = _ref.env, sessionID = _ref.sessionID, buttonSessionID = _ref.buttonSessionID, clientID = _ref.clientID, partnerAttributionID = _ref.partnerAttributionID, commit = _ref.commit, correlationID = _ref.correlationID, locale = _ref.locale, merchantID = _ref.merchantID, merchantDomain = _ref.merchantDomain, logger = getLogger();
        logger.addPayloadBuilder((function() {
            return {
                referer: window.location.host,
                uid: sessionID,
                env: env
            };
        })), logger.addTrackingBuilder((function() {
            var _ref2, lang = locale.lang, country = locale.country;
            return (_ref2 = {})[sdk_constants_src.d.CONTEXT_TYPE] = constants.f.BUTTON_SESSION_ID, 
            _ref2[sdk_constants_src.d.CONTEXT_ID] = buttonSessionID, _ref2[sdk_constants_src.d.STATE] = constants.g.BUTTON, 
            _ref2[sdk_constants_src.d.FEED] = sdk_constants_src.c.PAYMENTS_SDK, _ref2[sdk_constants_src.d.DATA_SOURCE] = sdk_constants_src.b.PAYMENTS_SDK, 
            _ref2[sdk_constants_src.d.CLIENT_ID] = clientID, _ref2[sdk_constants_src.d.SELLER_ID] = merchantID[0], 
            _ref2[sdk_constants_src.d.SESSION_UID] = sessionID, _ref2[sdk_constants_src.d.REFERER] = window.location.host, 
            _ref2[sdk_constants_src.d.MERCHANT_DOMAIN] = merchantDomain, _ref2[sdk_constants_src.d.LOCALE] = lang + "_" + country, 
            _ref2[sdk_constants_src.d.INTEGRATION_IDENTIFIER] = clientID, _ref2[sdk_constants_src.d.PARTNER_ATTRIBUTION_ID] = partnerAttributionID, 
            _ref2[sdk_constants_src.d.SDK_NAME] = sdk_constants_src.e.PAYMENTS_SDK, _ref2[sdk_constants_src.d.SDK_VERSION] = window.paypal.version, 
            _ref2[sdk_constants_src.d.USER_AGENT] = window.navigator && window.navigator.userAgent, 
            _ref2[sdk_constants_src.d.USER_ACTION] = commit ? sdk_constants_src.f.COMMIT : sdk_constants_src.f.CONTINUE, 
            _ref2[sdk_constants_src.d.CONTEXT_CORRID] = correlationID, _ref2;
        })), src.a.onPossiblyUnhandledException((function(err) {
            var _logger$track;
            logger.track(((_logger$track = {})[sdk_constants_src.d.ERROR_CODE] = "payments_sdk_error", 
            _logger$track[sdk_constants_src.d.ERROR_DESC] = Object(belter_src.t)(err), _logger$track)), 
            logger.error("unhandled_error", {
                err: Object(belter_src.s)(err)
            }), logger.flush().catch(belter_src.j);
        }));
    }
    var MESSAGE_TYPE = {
        REQUEST: "request",
        RESPONSE: "response"
    }, RESPONSE_STATUS = {
        SUCCESS: "success",
        ERROR: "error"
    };
    function messageSocket(_ref) {
        var sessionUID = _ref.sessionUID, driver = _ref.driver, sourceApp = _ref.sourceApp, sourceAppVersion = _ref.sourceAppVersion, targetApp = _ref.targetApp, socketPromise = new src.a, receivedMessages = {}, requestListeners = {}, responseListeners = {};
        return driver.open(), driver.onOpen((function() {
            socketPromise.resolve(driver);
        })), driver.onMessage((function(rawData) {
            var parsedData;
            try {
                parsedData = JSON.parse(rawData);
            } catch (err) {
                throw new Error("Could not parse socket message: " + rawData);
            }
            if (!parsedData) throw new Error("No data passed from socket message");
            var messageSessionUID = parsedData.session_uid, requestUID = parsedData.request_uid, messageUID = parsedData.message_uid, messageName = parsedData.message_name, messageType = parsedData.message_type, messageData = parsedData.message_data, messageTargetApp = parsedData.target_app;
            if (!(messageUID && requestUID && messageName && messageType && messageTargetApp)) throw new Error("Incomplete message: " + rawData);
            if (!receivedMessages[messageUID] && messageTargetApp === sourceApp) if (receivedMessages[messageUID] = !0, 
            messageType === MESSAGE_TYPE.REQUEST) {
                var sendResponse = function(_ref2) {
                    var responseStatus = _ref2.responseStatus, responseData = _ref2.responseData, responseMessageUID = Object(belter_src.v)(), response = {
                        session_uid: messageSessionUID,
                        request_uid: requestUID,
                        message_uid: responseMessageUID,
                        message_name: messageName,
                        message_status: responseStatus,
                        message_type: MESSAGE_TYPE.RESPONSE,
                        message_data: responseData,
                        source_app: sourceApp,
                        source_app_version: sourceAppVersion,
                        target_app: targetApp
                    };
                    return socketPromise.then((function(socket) {
                        return socket.send(JSON.stringify(response, null, 4));
                    }));
                };
                src.a.try((function() {
                    var requestListener = requestListeners[messageName];
                    if (!requestListener) throw new Error("No listener found for name: " + messageName);
                    if (messageSessionUID !== sessionUID) throw new Error("Incorrect sessionUID: " + (messageSessionUID || "undefined"));
                    return requestListener({
                        data: messageData
                    });
                })).then((function(res) {
                    sendResponse({
                        responseStatus: RESPONSE_STATUS.SUCCESS,
                        responseData: res
                    });
                }), (function(err) {
                    sendResponse({
                        responseStatus: RESPONSE_STATUS.ERROR,
                        responseData: {
                            message: err && err.message ? err.message : "Unknown error"
                        }
                    });
                }));
            } else {
                if (messageType !== MESSAGE_TYPE.RESPONSE) throw new Error("Unhandleable message type: " + messageType);
                var responseListener = responseListeners[requestUID], responseStatus = parsedData.message_status;
                if (!responseListener) throw new Error("Could not find response listener with id: " + requestUID);
                if (delete responseListeners[requestUID], responseStatus === RESPONSE_STATUS.SUCCESS) responseListener.resolve({
                    data: messageData
                }); else {
                    if (responseStatus !== RESPONSE_STATUS.ERROR) throw new Error("Can not handle response status: " + (status || "undefined"));
                    responseListener.reject(new Error(messageData.message));
                }
            }
        })), driver.onClose((function(err) {
            socketPromise.asyncReject(err);
        })), driver.onError((function(err) {
            socketPromise.asyncReject(err);
        })), {
            on: function(name, handler) {
                if (requestListeners[name]) throw new Error("Listener already registered for name: " + name);
                requestListeners[name] = handler;
            },
            send: function(messageName, messageData) {
                return socketPromise.then((function(socket) {
                    var requestUID = Object(belter_src.v)(), message = {
                        request_uid: requestUID,
                        message_uid: Object(belter_src.v)(),
                        message_name: messageName,
                        message_type: MESSAGE_TYPE.REQUEST,
                        message_data: messageData,
                        source_app: sourceApp,
                        source_app_version: sourceAppVersion,
                        target_app: targetApp
                    }, responseListener = new src.a;
                    return responseListeners[requestUID] = responseListener, socket.send(JSON.stringify(message)), 
                    responseListener;
                }));
            }
        };
    }
    function webSocket(_ref3) {
        var socket, url = _ref3.url;
        return messageSocket({
            sessionUID: _ref3.sessionUID,
            driver: {
                open: function() {
                    socket = new WebSocket(url);
                },
                send: function(data) {
                    socket.send(data);
                },
                onMessage: function(handler) {
                    socket.onmessage = function(event) {
                        var data = event.data;
                        if ("string" != typeof data || !data) throw new TypeError("Expected string data from web socket");
                        handler(data);
                    };
                },
                onError: function(handler) {
                    socket.onerror = function() {
                        handler(new Error("The socket encountered an error"));
                    };
                },
                onOpen: function(handler) {
                    socket.onopen = function() {
                        return handler();
                    };
                },
                onClose: function(handler) {
                    socket.onclose = function() {
                        return handler(new Error("Websocket connection closed"));
                    };
                }
            },
            sourceApp: _ref3.sourceApp,
            sourceAppVersion: _ref3.sourceAppVersion,
            targetApp: _ref3.targetApp
        });
    }
    function httpSocket(_ref4) {
        var url = _ref4.url, sourceApp = _ref4.sourceApp, sourceAppVersion = _ref4.sourceAppVersion, targetApp = _ref4.targetApp, sessionUID = _ref4.sessionUID, onMessageHandlers = [], onErrorHandlers = [], onOpenHandlers = [], isOpen = !1, errDelay = 1, error = function(err) {
            for (var _i8 = 0; _i8 < onErrorHandlers.length; _i8++) (0, onErrorHandlers[_i8])(err);
        }, fullURL = url + "/" + sessionUID;
        return messageSocket({
            sessionUID: sessionUID,
            driver: {
                open: Object(belter_src.m)((function() {
                    !function() {
                        for (var _i2 = 0; _i2 < onOpenHandlers.length; _i2++) (0, onOpenHandlers[_i2])();
                    }(), function poll() {
                        return Object(belter_src.q)({
                            url: fullURL
                        }).then((function(_ref5) {
                            var status = _ref5.status, body = _ref5.body;
                            if (200 !== status) throw new Error("Bad status code from " + url + ": " + status);
                            if (!body || !body.messages || !Array.isArray(body.messages)) throw new Error("Expected messages to be an array");
                            !function(messages) {
                                for (var _i4 = 0; _i4 < messages.length; _i4++) for (var message = messages[_i4], _i6 = 0; _i6 < onMessageHandlers.length; _i6++) (0, 
                                onMessageHandlers[_i6])(JSON.stringify(message, null, 4));
                            }(body.messages);
                        })).catch((function(err) {
                            return errDelay >= 32 ? (error(err), new src.a) : (time = errDelay *= 2, new src.a((function(resolve) {
                                setTimeout(resolve, time);
                            })));
                            var time;
                        })).then((function() {
                            return poll();
                        }));
                    }(), isOpen = !0;
                })),
                send: function(data) {
                    Object(belter_src.q)({
                        url: url,
                        method: "post",
                        json: {
                            poll: !1,
                            messages: [ JSON.parse(data) ]
                        }
                    }).catch(error);
                },
                onMessage: function(handler) {
                    onMessageHandlers.push(handler);
                },
                onError: function(handler) {
                    onErrorHandlers.push(handler);
                },
                onOpen: function(handler) {
                    isOpen ? handler() : onOpenHandlers.push(handler);
                },
                onClose: function() {}
            },
            sourceApp: sourceApp,
            sourceAppVersion: sourceAppVersion,
            targetApp: targetApp
        });
    }
    __webpack_require__.d(__webpack_exports__, "h", (function() {
        return unresolvedPromise;
    })), __webpack_require__.d(__webpack_exports__, "d", (function() {
        return promiseNoop;
    })), __webpack_require__.d(__webpack_exports__, "f", (function() {
        return sendBeacon;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return fixClickFocus;
    })), __webpack_require__.d(__webpack_exports__, "e", (function() {
        return redirectTop;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        return getLogger;
    })), __webpack_require__.d(__webpack_exports__, "g", (function() {
        return setupLogger;
    })), __webpack_require__.d(__webpack_exports__, "i", (function() {
        return webSocket;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return httpSocket;
    }));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "g", (function() {
        return LOGGER_URL;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return AUTH_API_URL;
    })), __webpack_require__.d(__webpack_exports__, "i", (function() {
        return ORDERS_API_URL;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return CREATE_SUBSCRIPTIONS_API_URL;
    })), __webpack_require__.d(__webpack_exports__, "k", (function() {
        return VALIDATE_PAYMENT_METHOD_API;
    })), __webpack_require__.d(__webpack_exports__, "j", (function() {
        return SMART_API_URI;
    })), __webpack_require__.d(__webpack_exports__, "e", (function() {
        return GRAPHQL_URI;
    })), __webpack_require__.d(__webpack_exports__, "d", (function() {
        return EXPERIENCE_URI;
    })), __webpack_require__.d(__webpack_exports__, "h", (function() {
        return NATIVE_WEBSOCKET_URL;
    })), __webpack_require__.d(__webpack_exports__, "f", (function() {
        return HTTP_SOCKET_URL;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        return CLIENT_ID_PAYEE_NO_MATCH;
    }));
    var LOGGER_URL = "/xoplatform/logger/api/logger", AUTH_API_URL = "/v1/oauth2/token", ORDERS_API_URL = "/v2/checkout/orders", CREATE_SUBSCRIPTIONS_API_URL = "/v1/billing/subscriptions", VALIDATE_PAYMENT_METHOD_API = "validate-payment-method", SMART_API_URI = {
        AUTH: "/smart/api/auth",
        CHECKOUT: "/smart/api/checkout",
        ORDER: "/smart/api/order",
        PAYMENT: "/smart/api/payment",
        SUBSCRIPTION: "/smart/api/billagmt/subscriptions"
    }, GRAPHQL_URI = "/graphql", EXPERIENCE_URI = {
        CHECKOUT: "/checkoutnow"
    }, NATIVE_WEBSOCKET_URL = "wss://127.0.0.1/paypal/native", HTTP_SOCKET_URL = "https://www.paypal.com/smart/api/messages", CLIENT_ID_PAYEE_NO_MATCH = [ "Af3YaeRfoJGtncwLeiahT93xTYT0-wldEEaiGehhGspP333r6tADvHeVCwZPR022F4d0YQquv7Lik_PT", "AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb", "AcjM7hAZjUAqIgU0Lvzneb9-_rWs7qAEl6PoPVHtQV5PNmWBihQWsu_SglKO", "Af_pMiA6ikCtlsNB8dJW1oG1ZI7FirXbRU43rDRfq_i_iQAPbYsojeI9Q2VzZvD1u2wKEPuaokZaNWyC", "AQAZZuAP5V0b8Wzs1t3KJM3opK8ueK6Txnlm7pw6kMFHrcAdFogBw3pBmeNP-234aHAZ2BlHeijkU2Tt", "Aef8KpflK3t-pTjstogUtqzAuk1IRGHpkdBTxyTWeARwqXyuRrX5Uj-Bs6KdMwK1g8ZhitjzfJ5jh6K7", "ARcLSr40hevzVXTnnNpHochqg9lsyznO2UugwjyCpt4MPnAmxgyLGC2Ia7aufLH1jS8BhOIZBnXqhOfP", "AYiXLQVgLszolhHbiYAm2HZERgDF5BOPXG7i4m9BNsTTSdmWhVu2Np4_GqDJLrl5VA50VDAlMMpCMArb", "ARbpxmp0udlm2zBPu6bqW6PAMV-UfCTktgWFtJ0cy1rKQUUtIRffwg1A-i0wRyFg9BhbfZM3M6ci6czP", "AeHvO7dLYAlLLnkZWxCTvHgSBMoFRn-bu1Wy9kjEXZVb8wYZPRpEykxDhLQ0WjgUPQz_MeF1e1FnH4mT", "Abi2EEJv7o1v6GKAE1nNVgeNqBWLYXSiDoAKi-ADKU6uRPi_41GJEMr5rjZC8fuQxAC-MVEPYSfYsfzD", "AW9fGl1zpjGSB474VARpj8j0hyEzrwNY7WgJCtwStaVVYkiyixnX4Z3KSe9A0jPLOcKj_2B9lHon1nAR", "ARBlYB7bfFnpO5IgprEW0PqtBSZOn1Q0Jly-3r_IzMEU8sPq0fdNrk1D4JgHAitxDBxfuL6wDpDvTZgU", "AZNQsMt_Ho-GClAUCvZVuKyz-n5rRhZyEBL2yTTetPV-lTqQE2_4quG6-ADlBMZoAgnG-yccas62Hqg2" ];
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__(2);
    var belter_src = __webpack_require__(3), config = __webpack_require__(5), lib = __webpack_require__(4);
    function createAccessToken(clientID) {
        return Object(belter_src.f)(createAccessToken, (function() {
            Object(lib.b)().info("rest_api_create_access_token");
            var basicAuth = Object(belter_src.a)(clientID + ":");
            return Object(belter_src.q)({
                method: "post",
                url: config.a,
                headers: {
                    Authorization: "Basic " + basicAuth
                },
                data: {
                    grant_type: "client_credentials"
                }
            }).then((function(_ref) {
                var body = _ref.body;
                if (body && "invalid_client" === body.error) throw new Error("Auth Api invalid client id: " + clientID + ":\n\n" + JSON.stringify(body, null, 4));
                if (!body || !body.access_token) throw new Error("Auth Api response error:\n\n" + JSON.stringify(body, null, 4));
                return body.access_token;
            }));
        }), [ clientID ]);
    }
    var sdk_constants_src = __webpack_require__(0), constants = __webpack_require__(1), api = __webpack_require__(8);
    function createOrderID(order, _ref) {
        var _headers, facilitatorAccessToken = _ref.facilitatorAccessToken, partnerAttributionID = _ref.partnerAttributionID;
        return Object(lib.b)().info("rest_api_create_order_id"), Object(api.b)({
            accessToken: facilitatorAccessToken,
            method: "post",
            url: "" + config.i,
            data: order,
            headers: (_headers = {}, _headers[constants.j.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || "", 
            _headers)
        }).then((function(body) {
            var _getLogger$track, orderID = body && body.id;
            if (!orderID) throw new Error("Order Api response error:\n\n" + JSON.stringify(body, null, 4));
            return Object(lib.b)().track(((_getLogger$track = {})[sdk_constants_src.d.STATE] = constants.g.BUTTON, 
            _getLogger$track[sdk_constants_src.d.TRANSITION] = constants.h.CREATE_ORDER, _getLogger$track[sdk_constants_src.d.CONTEXT_TYPE] = constants.f.ORDER_ID, 
            _getLogger$track[sdk_constants_src.d.TOKEN] = orderID, _getLogger$track[sdk_constants_src.d.CONTEXT_ID] = orderID, 
            _getLogger$track)), orderID;
        }));
    }
    function getOrder(orderID, _ref2) {
        var _headers2, facilitatorAccessToken = _ref2.facilitatorAccessToken, buyerAccessToken = _ref2.buyerAccessToken, partnerAttributionID = _ref2.partnerAttributionID;
        return buyerAccessToken ? Object(api.c)({
            accessToken: buyerAccessToken,
            url: config.j.ORDER + "/" + orderID
        }) : Object(api.b)({
            accessToken: facilitatorAccessToken,
            url: config.i + "/" + orderID,
            headers: (_headers2 = {}, _headers2[constants.j.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || "", 
            _headers2)
        });
    }
    function captureOrder(orderID, _ref3) {
        var _headers3, facilitatorAccessToken = _ref3.facilitatorAccessToken, buyerAccessToken = _ref3.buyerAccessToken, partnerAttributionID = _ref3.partnerAttributionID;
        return buyerAccessToken ? Object(api.c)({
            accessToken: buyerAccessToken,
            method: "post",
            url: config.j.ORDER + "/" + orderID + "/capture"
        }) : Object(api.b)({
            accessToken: facilitatorAccessToken,
            method: "post",
            url: config.i + "/" + orderID + "/capture",
            headers: (_headers3 = {}, _headers3[constants.j.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || "", 
            _headers3)
        });
    }
    function authorizeOrder(orderID, _ref4) {
        var _headers4, facilitatorAccessToken = _ref4.facilitatorAccessToken, buyerAccessToken = _ref4.buyerAccessToken, partnerAttributionID = _ref4.partnerAttributionID;
        return buyerAccessToken ? Object(api.c)({
            accessToken: buyerAccessToken,
            method: "post",
            url: config.j.ORDER + "/" + orderID + "/authorize"
        }) : Object(api.b)({
            accessToken: facilitatorAccessToken,
            method: "post",
            url: config.i + "/" + orderID + "/authorize",
            headers: (_headers4 = {}, _headers4[constants.j.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || "", 
            _headers4)
        });
    }
    function patchOrder(orderID, data, _ref5) {
        var _headers5, facilitatorAccessToken = _ref5.facilitatorAccessToken, buyerAccessToken = _ref5.buyerAccessToken, partnerAttributionID = _ref5.partnerAttributionID, patchData = Array.isArray(data) ? {
            patch: data
        } : data;
        return buyerAccessToken ? Object(api.c)({
            accessToken: buyerAccessToken,
            method: "post",
            url: config.j.ORDER + "/" + orderID + "/patch",
            json: {
                data: patchData
            }
        }) : Object(api.b)({
            accessToken: facilitatorAccessToken,
            method: "patch",
            url: config.i + "/" + orderID,
            data: patchData,
            headers: (_headers5 = {}, _headers5[constants.j.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || "", 
            _headers5)
        });
    }
    function getPayee(orderID) {
        return Object(api.c)({
            url: config.j.CHECKOUT + "/" + orderID + "/payee"
        });
    }
    var VALIDATE_CONTINGENCIES = {
        THREE_DOMAIN_SECURE: "3D_SECURE"
    };
    function validatePaymentMethod(_ref6) {
        var _headers6, clientAccessToken = _ref6.clientAccessToken, orderID = _ref6.orderID, paymentMethodID = _ref6.paymentMethodID, enableThreeDomainSecure = _ref6.enableThreeDomainSecure, partnerAttributionID = _ref6.partnerAttributionID, buttonSessionID = _ref6.buttonSessionID;
        Object(lib.b)().info("rest_api_create_order_token");
        var headers = ((_headers6 = {})[constants.j.AUTHORIZATION] = "Bearer " + clientAccessToken, 
        _headers6[constants.j.PARTNER_ATTRIBUTION_ID] = partnerAttributionID, _headers6[constants.j.CLIENT_METADATA_ID] = buttonSessionID, 
        _headers6), paymentSource = {
            token: {
                id: paymentMethodID,
                type: "NONCE"
            }
        };
        enableThreeDomainSecure && (paymentSource.contingencies = [ VALIDATE_CONTINGENCIES.THREE_DOMAIN_SECURE ]);
        var json = {
            payment_source: paymentSource
        };
        return Object(belter_src.q)({
            method: "post",
            url: config.i + "/" + orderID + "/" + config.k,
            headers: headers,
            json: json
        });
    }
    function billingTokenToOrderID(billingToken) {
        return Object(api.c)({
            method: "post",
            url: config.j.PAYMENT + "/" + billingToken + "/ectoken"
        }).then((function(data) {
            return data.token;
        }));
    }
    function subscriptionIdToCartId(subscriptionID) {
        return Object(api.c)({
            method: "post",
            url: config.j.SUBSCRIPTION + "/" + subscriptionID + "/cartid"
        }).then((function(data) {
            return data.token;
        }));
    }
    function enableVault(_ref7) {
        var _headers7, orderID = _ref7.orderID, clientAccessToken = _ref7.clientAccessToken;
        return Object(api.a)({
            query: "\n            mutation EnableVault(\n                $orderID : String!\n            ) {\n                enableVault(\n                    token: $orderID\n                )\n            }\n        ",
            variables: {
                orderID: orderID
            },
            headers: (_headers7 = {}, _headers7[constants.j.ACCESS_TOKEN] = clientAccessToken, 
            _headers7)
        });
    }
    function updateClientConfig(_ref8) {
        var orderID = _ref8.orderID, fundingSource = _ref8.fundingSource, integrationArtifact = _ref8.integrationArtifact, userExperienceFlow = _ref8.userExperienceFlow, productFlow = _ref8.productFlow;
        return Object(api.a)({
            query: "\n            mutation UpdateClientConfig(\n                $orderID : String!,\n                $fundingSource : ButtonFundingSourceType!,\n                $integrationArtifact : IntegrationArtifactType!,\n                $userExperienceFlow : UserExperienceFlowType!,\n                $productFlow : ProductFlowType!\n            ) {\n                updateClientConfig(\n                    token: $orderID,\n                    fundingSource: $fundingSource,\n                    integrationArtifact: $integrationArtifact,\n                    userExperienceFlow: $userExperienceFlow,\n                    productFlow: $productFlow\n                )\n            }\n        ",
            variables: {
                orderID: orderID,
                fundingSource: fundingSource,
                integrationArtifact: integrationArtifact,
                userExperienceFlow: userExperienceFlow,
                productFlow: productFlow
            }
        }).then(belter_src.j);
    }
    function createSubscription(accessToken, subscriptionPayload, _ref) {
        var partnerAttributionID = _ref.partnerAttributionID;
        if (Object(lib.b)().info("rest_api_create_subscription_id"), !accessToken) throw new Error("Access token not passed");
        if (!subscriptionPayload) throw new Error("Expected subscription payload to be passed");
        var headers = {
            Authorization: "Bearer " + accessToken,
            "PayPal-Partner-Attribution-Id": partnerAttributionID
        };
        return Object(belter_src.q)({
            method: "post",
            url: config.c,
            headers: headers,
            json: subscriptionPayload
        }).then((function(_ref2) {
            var body = _ref2.body;
            if (!body || !body.id) throw new Error("Create Subscription Api response error:\n\n" + JSON.stringify(body, null, 4));
            return body.id;
        }));
    }
    function reviseSubscription(accessToken, subscriptionID, subscriptionPayload, _ref3) {
        var partnerAttributionID = _ref3.partnerAttributionID;
        if (Object(lib.b)().info("rest_api_create_subscription_id"), !accessToken) throw new Error("Access token not passed");
        if (!subscriptionID) throw new Error("Expected subscription id to be passed as first argument to revise subscription api");
        if (!subscriptionPayload) throw new Error("Expected subscription payload to be passed");
        var headers = {
            Authorization: "Bearer " + accessToken,
            "PayPal-Partner-Attribution-Id": partnerAttributionID
        };
        return Object(belter_src.q)({
            method: "post",
            url: config.c + "/" + subscriptionID + "/revise",
            headers: headers,
            json: subscriptionPayload
        }).then((function(_ref4) {
            var status = _ref4.status;
            if (200 !== status) throw new Error("Revise Subscription Api HTTP-" + status + " response: error:\n\n" + JSON.stringify(_ref4.body, null, 4));
            return subscriptionID;
        }));
    }
    function activateSubscription(subscriptionID, _ref5) {
        var buyerAccessToken = _ref5.buyerAccessToken;
        return Object(api.c)({
            accessToken: buyerAccessToken,
            method: "post",
            url: config.j.SUBSCRIPTION + "/" + subscriptionID + "/activate"
        });
    }
    function getSubscription(subscriptionID, _ref6) {
        var buyerAccessToken = _ref6.buyerAccessToken;
        return Object(api.c)({
            accessToken: buyerAccessToken,
            url: config.j.SUBSCRIPTION + "/" + subscriptionID
        });
    }
    __webpack_require__.d(__webpack_exports__, "e", (function() {
        return createAccessToken;
    })), __webpack_require__.d(__webpack_exports__, "f", (function() {
        return createOrderID;
    })), __webpack_require__.d(__webpack_exports__, "i", (function() {
        return getOrder;
    })), __webpack_require__.d(__webpack_exports__, "d", (function() {
        return captureOrder;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        return authorizeOrder;
    })), __webpack_require__.d(__webpack_exports__, "l", (function() {
        return patchOrder;
    })), __webpack_require__.d(__webpack_exports__, "j", (function() {
        return getPayee;
    })), __webpack_require__.d(__webpack_exports__, "p", (function() {
        return validatePaymentMethod;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return billingTokenToOrderID;
    })), __webpack_require__.d(__webpack_exports__, "n", (function() {
        return subscriptionIdToCartId;
    })), __webpack_require__.d(__webpack_exports__, "h", (function() {
        return enableVault;
    })), __webpack_require__.d(__webpack_exports__, "o", (function() {
        return updateClientConfig;
    })), __webpack_require__.d(__webpack_exports__, "g", (function() {
        return createSubscription;
    })), __webpack_require__.d(__webpack_exports__, "m", (function() {
        return reviseSubscription;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return activateSubscription;
    })), __webpack_require__.d(__webpack_exports__, "k", (function() {
        return getSubscription;
    }));
}, function(module, __webpack_exports__, __webpack_require__) {
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
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return _extends;
    }));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", (function() {
        return callRestAPI;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return callSmartAPI;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return callGraphQL;
    }));
    var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7), belter_src__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_require__(2), 
    __webpack_require__(3)), _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5), _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
    function callRestAPI(_ref) {
        var _extends2, accessToken = _ref.accessToken, method = _ref.method, url = _ref.url, data = _ref.data, headers = _ref.headers;
        if (!accessToken) throw new Error("No access token passed to " + url);
        var requestHeaders = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.a)(((_extends2 = {})[_constants__WEBPACK_IMPORTED_MODULE_4__.j.AUTHORIZATION] = "Bearer " + accessToken, 
        _extends2), headers);
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_2__.q)({
            method: method,
            url: url,
            headers: requestHeaders,
            json: data
        }).then((function(_ref2) {
            var status = _ref2.status, body = _ref2.body;
            if (status >= 300) throw new Error(url + " returned status: " + status + " (Corr ID: " + _ref2.headers[_constants__WEBPACK_IMPORTED_MODULE_4__.j.PAYPAL_DEBUG_ID] + ")");
            return body;
        }));
    }
    function callSmartAPI(_ref3) {
        var _reqHeaders, accessToken = _ref3.accessToken, url = _ref3.url, _ref3$method = _ref3.method, method = void 0 === _ref3$method ? "get" : _ref3$method, json = _ref3.json, reqHeaders = ((_reqHeaders = {})[_constants__WEBPACK_IMPORTED_MODULE_4__.j.SOURCE] = _constants__WEBPACK_IMPORTED_MODULE_4__.n, 
        _reqHeaders[_constants__WEBPACK_IMPORTED_MODULE_4__.j.REQUESTED_BY] = _constants__WEBPACK_IMPORTED_MODULE_4__.o, 
        _reqHeaders);
        return accessToken && (reqHeaders[_constants__WEBPACK_IMPORTED_MODULE_4__.j.ACCESS_TOKEN] = accessToken), 
        Object(belter_src__WEBPACK_IMPORTED_MODULE_2__.q)({
            url: url,
            method: method,
            headers: reqHeaders,
            json: json
        }).then((function(_ref4) {
            var status = _ref4.status, body = _ref4.body, headers = _ref4.headers;
            if ("contingency" === body.ack) {
                var err = new Error(body.contingency);
                throw err.data = body.data, err;
            }
            if (status > 400) throw new Error("Api: " + url + " returned status code: " + status + " (Corr ID: " + headers[_constants__WEBPACK_IMPORTED_MODULE_4__.j.PAYPAL_DEBUG_ID] + ")");
            if ("success" !== body.ack) throw new Error("Api: " + url + " returned ack: " + body.ack + " (Corr ID: " + headers[_constants__WEBPACK_IMPORTED_MODULE_4__.j.PAYPAL_DEBUG_ID] + ")");
            return body.data;
        }));
    }
    function callGraphQL(_ref5) {
        var query = _ref5.query, _ref5$variables = _ref5.variables, variables = void 0 === _ref5$variables ? {} : _ref5$variables, _ref5$headers = _ref5.headers, headers = void 0 === _ref5$headers ? {} : _ref5$headers;
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_2__.q)({
            url: _config__WEBPACK_IMPORTED_MODULE_3__.e,
            method: "POST",
            json: {
                query: query,
                variables: variables
            },
            headers: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.a)({}, headers)
        }).then((function(_ref6) {
            var status = _ref6.status, body = _ref6.body, errors = body.errors || [];
            if (errors.length) {
                var message = errors[0].message || JSON.stringify(errors[0]);
                throw new Error(message);
            }
            if (200 !== status) throw new Error(_config__WEBPACK_IMPORTED_MODULE_3__.e + " returned status " + status);
            return body;
        }));
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var PROTOCOL = {
        MOCK: "mock:",
        FILE: "file:",
        ABOUT: "about:"
    }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
    function isAboutProtocol(win) {
        return void 0 === win && (win = window), win.location.protocol === PROTOCOL.ABOUT;
    }
    function getParent(win) {
        if (void 0 === win && (win = window), win) try {
            if (win.parent && win.parent !== win) return win.parent;
        } catch (err) {}
    }
    function canReadFromWindow(win) {
        try {
            return !0;
        } catch (err) {}
        return !1;
    }
    function getActualDomain(win) {
        var location = (win = win || window).location;
        if (!location) throw new Error("Can not read window location");
        var protocol = location.protocol;
        if (!protocol) throw new Error("Can not read window protocol");
        if (protocol === PROTOCOL.FILE) return PROTOCOL.FILE + "//";
        if (protocol === PROTOCOL.ABOUT) {
            var parent = getParent(win);
            return parent && canReadFromWindow() ? getActualDomain(parent) : PROTOCOL.ABOUT + "//";
        }
        var host = location.host;
        if (!host) throw new Error("Can not read window host");
        return protocol + "//" + host;
    }
    function getDomain(win) {
        var domain = getActualDomain(win = win || window);
        return domain && win.mockDomain && 0 === win.mockDomain.indexOf(PROTOCOL.MOCK) ? win.mockDomain : domain;
    }
    function isAncestorParent(parent, child) {
        if (!parent || !child) return !1;
        var childParent = getParent(child);
        return childParent ? childParent === parent : -1 !== function(win) {
            var result = [];
            try {
                for (;win.parent !== win; ) result.push(win.parent), win = win.parent;
            } catch (err) {}
            return result;
        }(child).indexOf(parent);
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
            for (var _i7 = 0, _getAllChildFrames4 = function getAllChildFrames(win) {
                for (var result = [], _i3 = 0, _getFrames2 = function(win) {
                    var frames, len, result = [];
                    try {
                        frames = win.frames;
                    } catch (err) {
                        frames = win;
                    }
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
                }(win); _i3 < _getFrames2.length; _i3++) {
                    var frame = _getFrames2[_i3];
                    result.push(frame);
                    for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame); _i5 < _getAllChildFrames2.length; _i5++) result.push(_getAllChildFrames2[_i5]);
                }
                return result;
            }(win); _i7 < _getAllChildFrames4.length; _i7++) {
                var frame = _getAllChildFrames4[_i7];
                try {
                    if (frame.top) return frame.top;
                } catch (err) {}
                if (getParent(frame) === frame) return frame;
            }
        }
    }
    var iframeWindows = [], iframeFrames = [];
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
                return !(!doc || !doc.documentElement || doc.documentElement.contains(frame));
            }(frame)) return !0;
        }
        return !1;
    }
    function linkFrameWindow(frame) {
        if (function() {
            for (var i = 0; i < iframeWindows.length; i++) {
                var closed = !1;
                try {
                    closed = iframeWindows[i].closed;
                } catch (err) {}
                closed && (iframeFrames.splice(i, 1), iframeWindows.splice(i, 1));
            }
        }(), frame && frame.contentWindow) try {
            iframeWindows.push(frame.contentWindow), iframeFrames.push(frame);
        } catch (err) {}
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
    __webpack_require__.d(__webpack_exports__, "b", (function() {
        return getParent;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return getDomain;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return getTop;
    })), __webpack_require__.d(__webpack_exports__, "e", (function() {
        return isWindowClosed;
    })), __webpack_require__.d(__webpack_exports__, "f", (function() {
        return linkFrameWindow;
    })), __webpack_require__.d(__webpack_exports__, "d", (function() {
        return isWindow;
    }));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "c", (function() {
        return getButtons;
    })), __webpack_require__.d(__webpack_exports__, "e", (function() {
        return getSelectedFunding;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        return enableLoadingSpinner;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return disableLoadingSpinner;
    })), __webpack_require__.d(__webpack_exports__, "d", (function() {
        return getNonce;
    })), __webpack_require__(0);
    var belter_src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3), _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
    function getButtons() {
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_1__.o)("[ " + _constants__WEBPACK_IMPORTED_MODULE_2__.c.FUNDING_SOURCE + " ]");
    }
    function getSelectedFunding(button) {
        var fundingSource = button.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.c.FUNDING_SOURCE), paymentMethodID = button.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.c.PAYMENT_METHOD_ID);
        return {
            fundingSource: fundingSource,
            card: button.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.c.CARD),
            paymentMethodID: paymentMethodID
        };
    }
    function enableLoadingSpinner(button) {
        button.classList.add(_constants__WEBPACK_IMPORTED_MODULE_2__.a.LOADING);
    }
    function disableLoadingSpinner(button) {
        button.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_2__.a.LOADING);
    }
    function getNonce() {
        var nonce = "";
        return document.body && (nonce = document.body.getAttribute("data-nonce") || ""), 
        nonce;
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return POPUP_BRIDGE_OPTYPE;
    })), __webpack_require__(2);
    var POPUP_BRIDGE_OPTYPE = {
        PAYMENT: "payment",
        CANCEL: "cancel"
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__(21);
    var _props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
    __webpack_require__.d(__webpack_exports__, "getGlobalProps", (function() {
        return _props__WEBPACK_IMPORTED_MODULE_1__.b;
    })), __webpack_require__.d(__webpack_exports__, "getButtonCallbackProps", (function() {
        return _props__WEBPACK_IMPORTED_MODULE_1__.a;
    }));
    var _createOrder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
    __webpack_require__.d(__webpack_exports__, "buildXCreateOrderData", (function() {
        return _createOrder__WEBPACK_IMPORTED_MODULE_2__.c;
    })), __webpack_require__.d(__webpack_exports__, "buildCreateOrder", (function() {
        return _createOrder__WEBPACK_IMPORTED_MODULE_2__.a;
    })), __webpack_require__.d(__webpack_exports__, "buildXCreateOrderActions", (function() {
        return _createOrder__WEBPACK_IMPORTED_MODULE_2__.b;
    })), __webpack_require__.d(__webpack_exports__, "getCreateOrder", (function() {
        return _createOrder__WEBPACK_IMPORTED_MODULE_2__.d;
    }));
    var _createBillingAgreement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
    __webpack_require__.d(__webpack_exports__, "buildXCreateBillingAgreementData", (function() {
        return _createBillingAgreement__WEBPACK_IMPORTED_MODULE_3__.b;
    })), __webpack_require__.d(__webpack_exports__, "buildXCreateBillingAgreementActions", (function() {
        return _createBillingAgreement__WEBPACK_IMPORTED_MODULE_3__.a;
    })), __webpack_require__.d(__webpack_exports__, "getCreateBillingAgreement", (function() {
        return _createBillingAgreement__WEBPACK_IMPORTED_MODULE_3__.c;
    }));
    var _createSubscription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
    __webpack_require__.d(__webpack_exports__, "buildXCreateSubscriptionData", (function() {
        return _createSubscription__WEBPACK_IMPORTED_MODULE_4__.b;
    })), __webpack_require__.d(__webpack_exports__, "buildXCreateSubscriptionActions", (function() {
        return _createSubscription__WEBPACK_IMPORTED_MODULE_4__.a;
    })), __webpack_require__.d(__webpack_exports__, "getCreateSubscription", (function() {
        return _createSubscription__WEBPACK_IMPORTED_MODULE_4__.c;
    }));
    var _onApprove__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
    __webpack_require__.d(__webpack_exports__, "getOnApprove", (function() {
        return _onApprove__WEBPACK_IMPORTED_MODULE_5__.a;
    }));
    var _onInit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
    __webpack_require__.d(__webpack_exports__, "buildXOnInitData", (function() {
        return _onInit__WEBPACK_IMPORTED_MODULE_6__.b;
    })), __webpack_require__.d(__webpack_exports__, "buildXOnInitActions", (function() {
        return _onInit__WEBPACK_IMPORTED_MODULE_6__.a;
    })), __webpack_require__.d(__webpack_exports__, "getOnInit", (function() {
        return _onInit__WEBPACK_IMPORTED_MODULE_6__.c;
    }));
    var _onCancel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16);
    __webpack_require__.d(__webpack_exports__, "buildXOnCancelData", (function() {
        return _onCancel__WEBPACK_IMPORTED_MODULE_7__.b;
    })), __webpack_require__.d(__webpack_exports__, "buildXOnCancelActions", (function() {
        return _onCancel__WEBPACK_IMPORTED_MODULE_7__.a;
    })), __webpack_require__.d(__webpack_exports__, "getOnCancel", (function() {
        return _onCancel__WEBPACK_IMPORTED_MODULE_7__.c;
    }));
    var _onShippingChange__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(20);
    __webpack_require__.d(__webpack_exports__, "buildXOnShippingChangeData", (function() {
        return _onShippingChange__WEBPACK_IMPORTED_MODULE_8__.a;
    })), __webpack_require__.d(__webpack_exports__, "buildXShippingChangeActions", (function() {
        return _onShippingChange__WEBPACK_IMPORTED_MODULE_8__.b;
    })), __webpack_require__.d(__webpack_exports__, "getOnShippingChange", (function() {
        return _onShippingChange__WEBPACK_IMPORTED_MODULE_8__.c;
    }));
    var _onClick__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(17);
    __webpack_require__.d(__webpack_exports__, "buildXOnClickData", (function() {
        return _onClick__WEBPACK_IMPORTED_MODULE_9__.b;
    })), __webpack_require__.d(__webpack_exports__, "buildXOnClickActions", (function() {
        return _onClick__WEBPACK_IMPORTED_MODULE_9__.a;
    })), __webpack_require__.d(__webpack_exports__, "getOnClick", (function() {
        return _onClick__WEBPACK_IMPORTED_MODULE_9__.c;
    }));
    var _onError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(23);
    for (var __WEBPACK_IMPORT_KEY__ in _onError__WEBPACK_IMPORTED_MODULE_10__) [ "getGlobalProps", "getButtonCallbackProps", "buildXCreateOrderData", "buildCreateOrder", "buildXCreateOrderActions", "getCreateOrder", "buildXCreateBillingAgreementData", "buildXCreateBillingAgreementActions", "getCreateBillingAgreement", "buildXCreateSubscriptionData", "buildXCreateSubscriptionActions", "getCreateSubscription", "getOnApprove", "buildXOnInitData", "buildXOnInitActions", "getOnInit", "buildXOnCancelData", "buildXOnCancelActions", "getOnCancel", "buildXOnShippingChangeData", "buildXShippingChangeActions", "getOnShippingChange", "buildXOnClickData", "buildXOnClickActions", "getOnClick", "default" ].indexOf(__WEBPACK_IMPORT_KEY__) < 0 && function(key) {
        __webpack_require__.d(__webpack_exports__, key, (function() {
            return _onError__WEBPACK_IMPORTED_MODULE_10__[key];
        }));
    }(__WEBPACK_IMPORT_KEY__);
    var _getPopupBridge__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(11);
    __webpack_require__.d(__webpack_exports__, "POPUP_BRIDGE_OPTYPE", (function() {
        return _getPopupBridge__WEBPACK_IMPORTED_MODULE_11__.a;
    })), __webpack_require__(24), __webpack_require__(25);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", (function() {
        return buildXOnInitData;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return buildXOnInitActions;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return getOnInit;
    }));
    var zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
    function buildXOnInitData() {
        return {};
    }
    function buildXOnInitActions(set) {
        return {
            enable: function() {
                return zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__.a.try((function() {
                    return set(!0);
                }));
            },
            disable: function() {
                return zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__.a.try((function() {
                    return set(!1);
                }));
            }
        };
    }
    function getOnInit(xprops) {
        var onInit = xprops.onInit;
        return function() {
            var enabled = !0;
            return {
                initPromise: zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__.a.try((function() {
                    if (onInit) return onInit({}, buildXOnInitActions((function(val) {
                        enabled = val;
                    })));
                })),
                isEnabled: function() {
                    return enabled;
                }
            };
        };
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "c", (function() {
        return buildXCreateOrderData;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return buildCreateOrder;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        return buildXCreateOrderActions;
    })), __webpack_require__.d(__webpack_exports__, "d", (function() {
        return getCreateOrder;
    }));
    var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7), zalgo_promise_src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2), belter_src__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3), _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0), _api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6), _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1), _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4);
    function buildXCreateOrderData() {
        return {};
    }
    function buildCreateOrder(_ref) {
        var clientID = _ref.clientID, intent = _ref.intent, currency = _ref.currency, merchantID = _ref.merchantID, partnerAttributionID = _ref.partnerAttributionID;
        return function(data) {
            var order = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.a)({}, data);
            if (order.intent && order.intent.toLowerCase() !== intent) throw new Error("Unexpected intent: " + order.intent + " passed to order.create. Please ensure you are passing /sdk/js?" + _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_3__.j.INTENT + "=" + order.intent.toLowerCase() + " in the paypal script tag.");
            return (order = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.a)({}, order, {
                intent: intent.toUpperCase()
            })).purchase_units = order.purchase_units.map((function(unit) {
                if (unit.amount.currency_code && unit.amount.currency_code !== currency) throw new Error("Unexpected currency: " + unit.amount.currency_code + " passed to order.create. Please ensure you are passing /sdk/js?" + _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_3__.j.CURRENCY + "=" + unit.amount.currency_code + " in the paypal script tag.");
                var payee = unit.payee;
                if (payee) {
                    if (!merchantID[0]) throw new Error("Pass " + _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_3__.j.MERCHANT_ID + "=XYZ in the paypal script tag.");
                    if (payee.merchant_id && payee.merchant_id !== merchantID[0]) throw new Error('Expected payee.merchant_id to be "' + merchantID[0] + '"');
                }
                return merchantID && (payee = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.a)({}, payee, {
                    merchant_id: merchantID[0]
                })), Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.a)({}, unit, {
                    payee: payee,
                    amount: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.a)({}, unit.amount, {
                        currency_code: currency
                    })
                });
            })), order.application_context = order.application_context || {}, Object(_api__WEBPACK_IMPORTED_MODULE_4__.e)(clientID).then((function(facilitatorAccessToken) {
                return Object(_api__WEBPACK_IMPORTED_MODULE_4__.f)(order, {
                    facilitatorAccessToken: facilitatorAccessToken,
                    partnerAttributionID: partnerAttributionID
                });
            }));
        };
    }
    function buildXCreateOrderActions(_ref2) {
        return {
            order: {
                create: buildCreateOrder({
                    clientID: _ref2.clientID,
                    intent: _ref2.intent,
                    currency: _ref2.currency,
                    merchantID: _ref2.merchantID,
                    partnerAttributionID: _ref2.partnerAttributionID
                })
            }
        };
    }
    function getCreateOrder(xprops, _ref3) {
        var createBillingAgreement = _ref3.createBillingAgreement, createSubscription = _ref3.createSubscription, createOrder = xprops.createOrder, buttonSessionID = xprops.buttonSessionID, data = {}, actions = buildXCreateOrderActions({
            clientID: xprops.clientID,
            intent: xprops.intent,
            currency: xprops.currency,
            merchantID: xprops.merchantID,
            partnerAttributionID: xprops.partnerAttributionID
        });
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_2__.i)((function() {
            return zalgo_promise_src__WEBPACK_IMPORTED_MODULE_1__.a.try((function() {
                return createBillingAgreement ? createBillingAgreement().then(_api__WEBPACK_IMPORTED_MODULE_4__.c) : createSubscription ? createSubscription().then(_api__WEBPACK_IMPORTED_MODULE_4__.n) : createOrder ? createOrder(data, actions) : actions.order.create({
                    purchase_units: [ {
                        amount: {
                            currency_code: "USD",
                            value: "0.01"
                        }
                    } ]
                });
            })).then((function(orderID) {
                var _getLogger$track;
                if (!orderID || "string" != typeof orderID) throw new Error("Expected an order id to be passed");
                if (0 === orderID.indexOf("PAY-") || 0 === orderID.indexOf("PAYID-")) throw new Error("Do not pass PAY-XXX or PAYID-XXX directly into createOrder. Pass the EC-XXX token instead");
                return Object(_lib__WEBPACK_IMPORTED_MODULE_6__.b)().track((_getLogger$track = {}, 
                _getLogger$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_3__.d.STATE] = _constants__WEBPACK_IMPORTED_MODULE_5__.g.BUTTON, 
                _getLogger$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_3__.d.TRANSITION] = _constants__WEBPACK_IMPORTED_MODULE_5__.h.RECEIVE_ORDER, 
                _getLogger$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_3__.d.CONTEXT_TYPE] = _constants__WEBPACK_IMPORTED_MODULE_5__.f.ORDER_ID, 
                _getLogger$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_3__.d.CONTEXT_ID] = orderID, 
                _getLogger$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_3__.d.BUTTON_SESSION_UID] = buttonSessionID, 
                _getLogger$track)).flush(), orderID;
            }));
        }));
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return getOnApprove;
    }));
    var belter_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3), _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6), _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1), _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
    function getOnApprove(xprops, _ref2) {
        var createOrder = _ref2.createOrder, onApprove = xprops.onApprove, onError = xprops.onError, intent = xprops.intent, buttonSessionID = xprops.buttonSessionID, partnerAttributionID = xprops.partnerAttributionID;
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.i)((function(_ref3, _ref4) {
            var payerID = _ref3.payerID, paymentID = _ref3.paymentID, billingToken = _ref3.billingToken, subscriptionID = _ref3.subscriptionID, facilitatorAccessToken = _ref3.facilitatorAccessToken, buyerAccessToken = _ref3.buyerAccessToken, restart = _ref4.restart;
            return createOrder().then((function(orderID) {
                var _getLogger$info$track;
                Object(_lib__WEBPACK_IMPORTED_MODULE_4__.b)().info("button_authorize").track((_getLogger$info$track = {}, 
                _getLogger$info$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.d.STATE] = _constants__WEBPACK_IMPORTED_MODULE_3__.g.BUTTON, 
                _getLogger$info$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.d.TRANSITION] = _constants__WEBPACK_IMPORTED_MODULE_3__.h.CHECKOUT_AUTHORIZE, 
                _getLogger$info$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.d.BUTTON_SESSION_UID] = buttonSessionID, 
                _getLogger$info$track)).flush();
                var data = {
                    orderID: orderID,
                    payerID: payerID,
                    paymentID: paymentID,
                    billingToken: billingToken,
                    subscriptionID: subscriptionID
                }, actions = function(_ref) {
                    var intent = _ref.intent, orderID = _ref.orderID, restart = _ref.restart, subscriptionID = _ref.subscriptionID, facilitatorAccessToken = _ref.facilitatorAccessToken, buyerAccessToken = _ref.buyerAccessToken, partnerAttributionID = _ref.partnerAttributionID, handleProcessorError = function(err) {
                        if (err && err.data && err.data.details && err.data.details.some((function(detail) {
                            return detail.issue === _constants__WEBPACK_IMPORTED_MODULE_3__.l.INSTRUMENT_DECLINED || detail.issue === _constants__WEBPACK_IMPORTED_MODULE_3__.l.PAYER_ACTION_REQUIRED;
                        }))) return restart().then(_lib__WEBPACK_IMPORTED_MODULE_4__.h);
                        throw new Error("Order could not be captured");
                    }, get = Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.i)((function() {
                        return Object(_api__WEBPACK_IMPORTED_MODULE_2__.i)(orderID, {
                            facilitatorAccessToken: facilitatorAccessToken,
                            buyerAccessToken: buyerAccessToken,
                            partnerAttributionID: partnerAttributionID
                        });
                    })), capture = Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.i)((function() {
                        if (intent !== _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.h.CAPTURE) throw new Error("Use " + _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.j.INTENT + "=" + _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.h.CAPTURE + " to use client-side capture");
                        return Object(_api__WEBPACK_IMPORTED_MODULE_2__.d)(orderID, {
                            facilitatorAccessToken: facilitatorAccessToken,
                            buyerAccessToken: buyerAccessToken,
                            partnerAttributionID: partnerAttributionID
                        }).finally(get.reset).finally(capture.reset).catch(handleProcessorError);
                    })), authorize = Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.i)((function() {
                        if (intent !== _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.h.AUTHORIZE) throw new Error("Use " + _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.j.INTENT + "=" + _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.h.AUTHORIZE + " to use client-side authorize");
                        return Object(_api__WEBPACK_IMPORTED_MODULE_2__.b)(orderID, {
                            facilitatorAccessToken: facilitatorAccessToken,
                            buyerAccessToken: buyerAccessToken,
                            partnerAttributionID: partnerAttributionID
                        }).finally(get.reset).finally(authorize.reset).catch(handleProcessorError);
                    })), getSubscriptionApi = Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.i)((function() {
                        return Object(_api__WEBPACK_IMPORTED_MODULE_2__.k)(subscriptionID, {
                            buyerAccessToken: buyerAccessToken
                        });
                    })), activateSubscriptionApi = Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.i)((function() {
                        return Object(_api__WEBPACK_IMPORTED_MODULE_2__.a)(subscriptionID, {
                            buyerAccessToken: buyerAccessToken
                        });
                    }));
                    return {
                        order: {
                            capture: capture,
                            authorize: authorize,
                            patch: function(data) {
                                return void 0 === data && (data = {}), Object(_api__WEBPACK_IMPORTED_MODULE_2__.l)(orderID, data, {
                                    facilitatorAccessToken: facilitatorAccessToken,
                                    buyerAccessToken: buyerAccessToken,
                                    partnerAttributionID: partnerAttributionID
                                }).catch((function() {
                                    throw new Error("Order could not be patched");
                                }));
                            },
                            get: get
                        },
                        subscription: {
                            get: getSubscriptionApi,
                            activate: activateSubscriptionApi
                        },
                        restart: restart,
                        redirect: function(url) {
                            if (!url) throw new Error("Expected redirect url");
                            if (-1 === url.indexOf("://")) throw Object(_lib__WEBPACK_IMPORTED_MODULE_4__.b)().warn("redir_url_non_scheme", {
                                url: url
                            }).flush(), new Error("Invalid redirect url: " + url + " - must be fully qualified url");
                            return url.match(/^https?:\/\//) || Object(_lib__WEBPACK_IMPORTED_MODULE_4__.b)().warn("redir_url_non_http", {
                                url: url
                            }).flush(), Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.p)(url, window.top);
                        }
                    };
                }({
                    orderID: orderID,
                    intent: intent,
                    restart: restart,
                    subscriptionID: subscriptionID,
                    facilitatorAccessToken: facilitatorAccessToken,
                    buyerAccessToken: buyerAccessToken,
                    partnerAttributionID: partnerAttributionID
                });
                return onApprove ? onApprove(data, actions).catch(onError) : intent === _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.h.CAPTURE ? actions.order.capture().then(belter_src__WEBPACK_IMPORTED_MODULE_0__.j) : intent === _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.h.AUTHORIZE ? actions.order.authorize().then(belter_src__WEBPACK_IMPORTED_MODULE_0__.j) : void 0;
            }));
        }));
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", (function() {
        return buildXOnCancelData;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return buildXOnCancelActions;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return getOnCancel;
    }));
    var belter_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3), _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4), _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
    function buildXOnCancelData(_ref) {
        return {
            orderID: _ref.orderID
        };
    }
    function buildXOnCancelActions() {
        return {
            redirect: function(url) {
                if (!url) throw new Error("Expected redirect url");
                if (-1 === url.indexOf("://")) throw Object(_lib__WEBPACK_IMPORTED_MODULE_2__.b)().warn("redir_url_non_scheme", {
                    url: url
                }).flush(), new Error("Invalid redirect url: " + url + " - must be fully qualified url");
                return url.match(/^https?:\/\//) || Object(_lib__WEBPACK_IMPORTED_MODULE_2__.b)().warn("redir_url_non_http", {
                    url: url
                }).flush(), Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.p)(url, window.top);
            }
        };
    }
    function getOnCancel(xprops, _ref2) {
        var createOrder = _ref2.createOrder, _xprops$onCancel = xprops.onCancel, onCancel = void 0 === _xprops$onCancel ? belter_src__WEBPACK_IMPORTED_MODULE_0__.j : _xprops$onCancel, onError = xprops.onError, buttonSessionID = xprops.buttonSessionID;
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.i)((function() {
            return createOrder().then((function(orderID) {
                var _getLogger$info$track;
                return Object(_lib__WEBPACK_IMPORTED_MODULE_2__.b)().info("button_cancel").track((_getLogger$info$track = {}, 
                _getLogger$info$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.d.STATE] = _constants__WEBPACK_IMPORTED_MODULE_3__.g.BUTTON, 
                _getLogger$info$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.d.TRANSITION] = _constants__WEBPACK_IMPORTED_MODULE_3__.h.CHECKOUT_CANCEL, 
                _getLogger$info$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.d.BUTTON_SESSION_UID] = buttonSessionID, 
                _getLogger$info$track)).flush(), onCancel(buildXOnCancelData({
                    orderID: orderID
                }), buildXOnCancelActions());
            })).catch((function(err) {
                return onError(err);
            }));
        }));
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", (function() {
        return buildXOnClickData;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return buildXOnClickActions;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return getOnClick;
    }));
    var zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2), _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4), _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
    function buildXOnClickData(_ref) {
        return {
            fundingSource: _ref.fundingSource
        };
    }
    function buildXOnClickActions() {
        return {
            resolve: function() {
                return zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__.a.try((function() {
                    return !0;
                }));
            },
            reject: function() {
                return zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__.a.try((function() {
                    return !1;
                }));
            }
        };
    }
    function getOnClick(xprops) {
        var _xprops$onClick = xprops.onClick, onClick = void 0 === _xprops$onClick ? _lib__WEBPACK_IMPORTED_MODULE_2__.d : _xprops$onClick, buttonSessionID = xprops.buttonSessionID;
        return function(_ref2) {
            var _getLogger$info$track, fundingSource = _ref2.fundingSource;
            return Object(_lib__WEBPACK_IMPORTED_MODULE_2__.b)().info("button_click").track((_getLogger$info$track = {}, 
            _getLogger$info$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.d.STATE] = _constants__WEBPACK_IMPORTED_MODULE_3__.g.BUTTON, 
            _getLogger$info$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.d.TRANSITION] = _constants__WEBPACK_IMPORTED_MODULE_3__.h.BUTTON_CLICK, 
            _getLogger$info$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.d.BUTTON_SESSION_UID] = buttonSessionID, 
            _getLogger$info$track[_paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.d.CHOSEN_FUNDING] = fundingSource, 
            _getLogger$info$track)).flush(), onClick(buildXOnClickData({
                fundingSource: fundingSource
            }), buildXOnClickActions()).then((function(valid) {
                return !1 !== valid;
            }));
        };
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", (function() {
        return buildXCreateBillingAgreementData;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return buildXCreateBillingAgreementActions;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return getCreateBillingAgreement;
    }));
    var belter_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
    function buildXCreateBillingAgreementData() {
        return {};
    }
    function buildXCreateBillingAgreementActions() {
        return {};
    }
    function getCreateBillingAgreement(xprops) {
        var createBillingAgreement = xprops.createBillingAgreement;
        if (createBillingAgreement) return Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.i)((function() {
            return createBillingAgreement({}, {}).then((function(billingToken) {
                if (!billingToken || "string" != typeof billingToken) throw new Error("Expected a billing token to be passed to createBillingAgreement");
                return billingToken;
            }));
        }));
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", (function() {
        return buildXCreateSubscriptionData;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return buildXCreateSubscriptionActions;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return getCreateSubscription;
    }));
    var belter_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3), _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
    function buildXCreateSubscriptionData() {
        return {};
    }
    function buildXCreateSubscriptionActions(_ref) {
        var clientID = _ref.clientID, partnerAttributionID = _ref.partnerAttributionID;
        return {
            subscription: {
                create: function(data) {
                    return Object(_api__WEBPACK_IMPORTED_MODULE_1__.e)(clientID).then((function(accessToken) {
                        return Object(_api__WEBPACK_IMPORTED_MODULE_1__.g)(accessToken, data, {
                            partnerAttributionID: partnerAttributionID
                        });
                    }));
                },
                revise: function(subscriptionID, data) {
                    return Object(_api__WEBPACK_IMPORTED_MODULE_1__.e)(clientID).then((function(accessToken) {
                        return Object(_api__WEBPACK_IMPORTED_MODULE_1__.m)(accessToken, subscriptionID, data, {
                            partnerAttributionID: partnerAttributionID
                        });
                    }));
                }
            }
        };
    }
    function getCreateSubscription(xprops) {
        var createSubscriptionFunc = xprops.createSubscription, partnerAttributionID = xprops.partnerAttributionID, clientID = xprops.clientID;
        if (createSubscriptionFunc) return Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.i)((function() {
            return createSubscriptionFunc({}, buildXCreateSubscriptionActions({
                clientID: clientID,
                partnerAttributionID: partnerAttributionID
            })).then((function(subscriptionID) {
                if (!subscriptionID || "string" != typeof subscriptionID) throw new Error("Expected an subscription id to be passed to createSubscription");
                return subscriptionID;
            }));
        }));
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var src = __webpack_require__(2), sdk_constants_src = __webpack_require__(0), api = __webpack_require__(6), constants = __webpack_require__(1), lib = __webpack_require__(4);
    function buildXOnShippingChangeData(data) {
        return data;
    }
    function buildXShippingChangeActions(_ref) {
        var orderID = _ref.orderID, facilitatorAccessToken = _ref.facilitatorAccessToken, buyerAccessToken = _ref.buyerAccessToken, partnerAttributionID = _ref.partnerAttributionID;
        return {
            resolve: function() {
                return src.a.resolve();
            },
            reject: _ref.actions.reject || function() {
                throw new Error("Missing reject action callback");
            },
            order: {
                patch: function(data) {
                    return void 0 === data && (data = {}), Object(api.l)(orderID, data, {
                        facilitatorAccessToken: facilitatorAccessToken,
                        buyerAccessToken: buyerAccessToken,
                        partnerAttributionID: partnerAttributionID
                    }).catch((function() {
                        throw new Error("Order could not be patched");
                    }));
                }
            }
        };
    }
    function getOnShippingChange(xprops, _ref2) {
        var createOrder = _ref2.createOrder, onShippingChange = xprops.onShippingChange, buttonSessionID = xprops.buttonSessionID, partnerAttributionID = xprops.partnerAttributionID;
        if (onShippingChange) return function(_ref3, actions) {
            var facilitatorAccessToken = _ref3.facilitatorAccessToken, buyerAccessToken = _ref3.buyerAccessToken, data = function(source, excluded) {
                if (null == source) return {};
                var key, i, target = {}, sourceKeys = Object.keys(source);
                for (i = 0; i < sourceKeys.length; i++) excluded.indexOf(key = sourceKeys[i]) >= 0 || (target[key] = source[key]);
                return target;
            }(_ref3, [ "facilitatorAccessToken", "buyerAccessToken" ]);
            return createOrder().then((function(orderID) {
                var _getLogger$info$track;
                return Object(lib.b)().info("button_shipping_change").track((_getLogger$info$track = {}, 
                _getLogger$info$track[sdk_constants_src.d.STATE] = constants.g.BUTTON, _getLogger$info$track[sdk_constants_src.d.TRANSITION] = constants.h.CHECKOUT_SHIPPING_CHANGE, 
                _getLogger$info$track[sdk_constants_src.d.BUTTON_SESSION_UID] = buttonSessionID, 
                _getLogger$info$track)).flush(), onShippingChange(buildXOnShippingChangeData(data), buildXShippingChangeActions({
                    orderID: orderID,
                    facilitatorAccessToken: facilitatorAccessToken,
                    buyerAccessToken: buyerAccessToken,
                    actions: actions,
                    partnerAttributionID: partnerAttributionID
                }));
            }));
        };
    }
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return buildXOnShippingChangeData;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        return buildXShippingChangeActions;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        return getOnShippingChange;
    }));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__(0);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", (function() {
        return getGlobalProps;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return getButtonCallbackProps;
    }));
    var _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10), _onInit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13), _createOrder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14), _onApprove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15), _onCancel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16), _onShippingChange__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20), _onClick__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17), _createBillingAgreement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18), _createSubscription__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(19);
    function getGlobalProps(_ref) {
        var xprops = _ref.xprops, cspNonce = _ref.cspNonce, env = xprops.env, vault = xprops.vault, commit = xprops.commit, locale = xprops.locale, platform = xprops.platform, sessionID = xprops.sessionID, buttonSessionID = xprops.buttonSessionID, clientID = xprops.clientID, partnerAttributionID = xprops.partnerAttributionID, correlationID = xprops.correlationID, getParentDomain = xprops.getParentDomain, clientAccessToken = xprops.clientAccessToken, _xprops$buyerCountry = xprops.buyerCountry, buyerCountry = void 0 === _xprops$buyerCountry ? _ref.buyerGeoCountry || _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_0__.a.US : _xprops$buyerCountry, getPopupBridge = xprops.getPopupBridge, getPrerenderDetails = xprops.getPrerenderDetails, getPageUrl = xprops.getPageUrl, enableThreeDomainSecure = xprops.enableThreeDomainSecure, enableStandardCardFields = xprops.enableStandardCardFields, enableNativeCheckout = xprops.enableNativeCheckout, rememberFunding = xprops.remember, onError = xprops.onError, stageHost = xprops.stageHost, apiStageHost = xprops.apiStageHost, style = xprops.style;
        cspNonce = cspNonce || Object(_dom__WEBPACK_IMPORTED_MODULE_1__.d)();
        var onInit = Object(_onInit__WEBPACK_IMPORTED_MODULE_2__.c)(xprops);
        return {
            env: env,
            style: style,
            vault: vault,
            commit: commit,
            clientAccessToken: clientAccessToken,
            buyerCountry: buyerCountry,
            locale: locale,
            cspNonce: cspNonce,
            sessionID: sessionID,
            buttonSessionID: buttonSessionID,
            clientID: clientID,
            partnerAttributionID: partnerAttributionID,
            correlationID: correlationID,
            merchantDomain: getParentDomain(),
            platform: platform,
            getPopupBridge: getPopupBridge,
            getPrerenderDetails: getPrerenderDetails,
            getPageUrl: getPageUrl,
            rememberFunding: rememberFunding,
            enableThreeDomainSecure: enableThreeDomainSecure,
            enableStandardCardFields: enableStandardCardFields,
            enableNativeCheckout: enableNativeCheckout,
            onInit: onInit,
            onError: onError,
            stageHost: stageHost,
            apiStageHost: apiStageHost
        };
    }
    function getButtonCallbackProps(_ref2) {
        var xprops = _ref2.xprops;
        if (xprops.createBillingAgreement) {
            if (xprops.createOrder) throw new Error("Do not pass both createBillingAgreement and createOrder");
            if (!xprops.vault) throw new Error("Must pass vault=true to sdk to use createBillingAgreement");
        }
        if (xprops.createSubscription) {
            if (xprops.createOrder) throw new Error("Do not pass both createSubscription and createOrder");
            if (xprops.createOrder) throw new Error("Do not pass both createSubscription and createBillingAgreement");
            if (!xprops.vault) throw new Error("Must pass vault=true to sdk to use createSubscription");
        }
        var createBillingAgreement = Object(_createBillingAgreement__WEBPACK_IMPORTED_MODULE_8__.c)(xprops), createSubscription = Object(_createSubscription__WEBPACK_IMPORTED_MODULE_9__.c)(xprops), createOrder = Object(_createOrder__WEBPACK_IMPORTED_MODULE_3__.d)(xprops, {
            createBillingAgreement: createBillingAgreement,
            createSubscription: createSubscription
        }), onApprove = Object(_onApprove__WEBPACK_IMPORTED_MODULE_4__.a)(xprops, {
            createOrder: createOrder
        }), onCancel = Object(_onCancel__WEBPACK_IMPORTED_MODULE_5__.c)(xprops, {
            createOrder: createOrder
        }), onShippingChange = Object(_onShippingChange__WEBPACK_IMPORTED_MODULE_6__.c)(xprops, {
            createOrder: createOrder
        });
        return {
            createOrder: createOrder,
            createBillingAgreement: createBillingAgreement,
            createSubscription: createSubscription,
            onApprove: onApprove,
            onCancel: onCancel,
            onClick: Object(_onClick__WEBPACK_IMPORTED_MODULE_7__.c)(xprops),
            onShippingChange: onShippingChange
        };
    }
}, function(module, exports) {}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__(2), __webpack_require__(0);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__(2);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var src = __webpack_require__(3), sdk_constants_src = __webpack_require__(0), zalgo_promise_src = __webpack_require__(2), lib = __webpack_require__(4), esm_extends = __webpack_require__(7), cross_domain_utils_src = __webpack_require__(9), api = __webpack_require__(6), constants = __webpack_require__(1), checkoutOpen = !1, canRenderTop = !1;
    function initCheckout(props) {
        var clientID = props.clientID, win = props.win, buttonSessionID = props.buttonSessionID, fundingSource = props.fundingSource, card = props.card, buyerCountry = props.buyerCountry, _createOrder = props.createOrder, _onApprove = props.onApprove, _onCancel = props.onCancel, onShippingChange = props.onShippingChange, cspNonce = props.cspNonce, context = props.context, locale = props.locale, commit = props.commit, onError = props.onError, vault = props.vault, clientAccessToken = props.clientAccessToken, fundingEligibility = props.fundingEligibility, createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription, _props$validationProm = props.validationPromise, validationPromise = void 0 === _props$validationProm ? zalgo_promise_src.a.resolve(!0) : _props$validationProm;
        if (checkoutOpen) throw new Error("Checkout already rendered");
        var buyerAccessToken, approved = !1, restart = Object(src.i)((function() {
            return initCheckout(Object(esm_extends.a)({}, props, {
                context: constants.b.IFRAME
            })).start().finally(lib.h);
        })), facilitatorAccessTokenPromise = Object(api.e)(clientID), _window$paypal$Checko = window.paypal.Checkout({
            window: win,
            buttonSessionID: buttonSessionID,
            clientAccessToken: clientAccessToken,
            createOrder: function() {
                return validationPromise.then((function(valid) {
                    return valid ? _createOrder().then((function(orderID) {
                        return function(_ref3) {
                            var orderID = _ref3.orderID, vault = _ref3.vault, clientAccessToken = _ref3.clientAccessToken, createBillingAgreement = _ref3.createBillingAgreement, createSubscription = _ref3.createSubscription, fundingSource = _ref3.fundingSource, fundingEligibility = _ref3.fundingEligibility;
                            return zalgo_promise_src.a.try((function() {
                                if (clientAccessToken) return function(_ref2) {
                                    var vault = _ref2.vault, fundingSource = _ref2.fundingSource, fundingEligibility = _ref2.fundingEligibility;
                                    if (!_ref2.clientAccessToken) return !1;
                                    if (_ref2.createBillingAgreement || _ref2.createSubscription) return !1;
                                    var fundingSourceEligible = Boolean(fundingEligibility[fundingSource] && fundingEligibility[fundingSource].vaultable);
                                    if (vault && !fundingSourceEligible) throw new Error("SDK received " + sdk_constants_src.j.VAULT + "=true parameter, but " + fundingSource + " is not vaultable.");
                                    return !!vault || !!fundingSourceEligible;
                                }({
                                    vault: vault,
                                    clientAccessToken: clientAccessToken,
                                    createBillingAgreement: createBillingAgreement,
                                    createSubscription: createSubscription,
                                    fundingSource: fundingSource,
                                    fundingEligibility: fundingEligibility
                                }) ? Object(api.h)({
                                    orderID: orderID,
                                    clientAccessToken: clientAccessToken
                                }).catch((function(err) {
                                    if (vault) throw err;
                                })) : void 0;
                            }));
                        }({
                            orderID: orderID,
                            vault: vault,
                            clientAccessToken: clientAccessToken,
                            fundingEligibility: fundingEligibility,
                            fundingSource: fundingSource,
                            createBillingAgreement: createBillingAgreement,
                            createSubscription: createSubscription
                        }).then((function() {
                            return orderID;
                        }));
                    })) : Object(lib.h)();
                }));
            },
            onApprove: function(_ref4) {
                var payerID = _ref4.payerID, paymentID = _ref4.paymentID, billingToken = _ref4.billingToken, subscriptionID = _ref4.subscriptionID;
                return approved = !0, zalgo_promise_src.a.all([ facilitatorAccessTokenPromise, closeCheckout() ]).then((function(_ref5) {
                    return _onApprove({
                        payerID: payerID,
                        paymentID: paymentID,
                        billingToken: billingToken,
                        subscriptionID: subscriptionID,
                        facilitatorAccessToken: _ref5[0],
                        buyerAccessToken: buyerAccessToken
                    }, {
                        restart: restart
                    });
                }));
            },
            onAuth: function(_ref6) {
                buyerAccessToken = _ref6.accessToken;
            },
            onCancel: function() {
                return validationPromise.then((function(valid) {
                    if (valid) return closeCheckout().then((function() {
                        return _onCancel();
                    }));
                }));
            },
            onShippingChange: onShippingChange ? function(data, actions) {
                return facilitatorAccessTokenPromise.then((function(facilitatorAccessToken) {
                    return onShippingChange(Object(esm_extends.a)({
                        facilitatorAccessToken: facilitatorAccessToken,
                        buyerAccessToken: buyerAccessToken
                    }, data), actions);
                }));
            } : null,
            onError: onError,
            onClose: function() {
                return checkoutOpen = !1, validationPromise.then((function(valid) {
                    if (valid && !approved) return _onCancel();
                }));
            },
            fundingSource: fundingSource,
            card: card,
            buyerCountry: buyerCountry,
            locale: locale,
            commit: commit,
            cspNonce: cspNonce
        }), closeCheckout = _window$paypal$Checko.close, triggerError = _window$paypal$Checko.onError;
        checkoutOpen = !0;
        var renderPromise = (0, _window$paypal$Checko.renderTo)(function() {
            var top = Object(cross_domain_utils_src.c)(window);
            return canRenderTop && top ? top : Object(cross_domain_utils_src.b)();
        }(), constants.p.BODY, context), close = function() {
            return checkoutOpen = !1, closeCheckout();
        };
        return {
            start: function() {
                return validationPromise.then((function(valid) {
                    return valid ? renderPromise : close();
                })).then(src.j);
            },
            close: close,
            triggerError: triggerError
        };
    }
    var cardFieldsOpen = !1;
    function highlightCard(card) {
        Object(src.o)("[" + constants.c.CARD + "]").forEach((function(el) {
            el.style.opacity = el.getAttribute(constants.c.CARD) === card ? "1" : "0.1";
        }));
    }
    var popup_bridge_popupBridge, nativeWebSocket, nativeHttpSocket, card_fields_getElements = function() {
        var buttonsContainer = document.querySelector("#buttons-container"), cardButtonsContainer = document.querySelector('[data-funding-source="' + sdk_constants_src.g.CARD + '"]'), cardFieldsContainer = document.querySelector("#card-fields-container");
        if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) throw new Error("Did not find card fields elements");
        return {
            buttonsContainer: buttonsContainer,
            cardButtonsContainer: cardButtonsContainer,
            cardFieldsContainer: cardFieldsContainer
        };
    }, card_fields_slideUpButtons = function() {
        var _getElements = card_fields_getElements(), buttonsContainer = _getElements.buttonsContainer, cardButtonsContainer = _getElements.cardButtonsContainer, cardFieldsContainer = _getElements.cardFieldsContainer;
        if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) throw new Error("Required elements not found");
        cardFieldsContainer.style.minHeight = "0px", cardFieldsContainer.style.display = "block";
        var recalculateMargin = function() {
            buttonsContainer.style.marginTop = buttonsContainer.offsetTop - cardButtonsContainer.offsetTop + "px";
        };
        window.addEventListener("resize", Object(src.b)((function() {
            buttonsContainer.style.transitionDuration = "0s", recalculateMargin();
        }))), recalculateMargin();
    }, slideDownButtons = function() {
        var buttonsContainer = card_fields_getElements().buttonsContainer;
        Object(src.o)("[" + constants.c.CARD + "]").forEach((function(el) {
            el.style.opacity = "1";
        })), buttonsContainer.style.marginTop = "0px";
    }, config = __webpack_require__(5), props_getPopupBridge = __webpack_require__(11), SOURCE_APP = "paypal_smart_payment_buttons", SOURCE_APP_VERSION = window.paypal ? window.paypal.version : "unknown", TARGET_APP = "paypal_native_checkout_sdk", MESSAGE = {
        DETECT_APP: "detectApp",
        GET_PROPS: "getProps",
        ON_APPROVE: "onApprove",
        ON_CANCEL: "onCancel",
        ON_ERROR: "onError"
    }, isNativeCheckoutInstalled = !1, sessionUID = Object(src.v)(), useNativeWebSocket = !0;
    function getNativeSocket() {
        var socketParams = {
            sessionUID: sessionUID,
            sourceApp: SOURCE_APP,
            sourceAppVersion: SOURCE_APP_VERSION,
            targetApp: TARGET_APP
        };
        return useNativeWebSocket ? nativeWebSocket = nativeWebSocket || Object(lib.i)(Object(esm_extends.a)({
            url: config.h
        }, socketParams)) : nativeHttpSocket = nativeHttpSocket || Object(lib.c)(Object(esm_extends.a)({
            url: config.f
        }, socketParams));
    }
    var button_props = __webpack_require__(12), dom = __webpack_require__(10), api_api = __webpack_require__(8);
    function setupButton(_ref) {
        var fundingEligibility = _ref.fundingEligibility, buyerGeoCountry = _ref.buyerCountry, serverCSPNonce = _ref.cspNonce, merchantID = _ref.merchantID, personalization = _ref.personalization, isCardFieldsExperimentEnabled = _ref.isCardFieldsExperimentEnabled;
        if (!window.paypal) throw new Error("PayPal SDK not loaded");
        var _getGlobalProps = Object(button_props.getGlobalProps)({
            xprops: window.xprops,
            buyerGeoCountry: buyerGeoCountry,
            cspNonce: serverCSPNonce
        }), env = _getGlobalProps.env, stageHost = _getGlobalProps.stageHost, apiStageHost = _getGlobalProps.apiStageHost, buttonSessionID = _getGlobalProps.buttonSessionID, style = _getGlobalProps.style, vault = _getGlobalProps.vault, commit = _getGlobalProps.commit, clientAccessToken = _getGlobalProps.clientAccessToken, buyerCountry = _getGlobalProps.buyerCountry, locale = _getGlobalProps.locale, cspNonce = _getGlobalProps.cspNonce, platform = _getGlobalProps.platform, sessionID = _getGlobalProps.sessionID, clientID = _getGlobalProps.clientID, partnerAttributionID = _getGlobalProps.partnerAttributionID, correlationID = _getGlobalProps.correlationID, enableThreeDomainSecure = _getGlobalProps.enableThreeDomainSecure, merchantDomain = _getGlobalProps.merchantDomain, getPopupBridge = _getGlobalProps.getPopupBridge, getPrerenderDetails = _getGlobalProps.getPrerenderDetails, getPageUrl = _getGlobalProps.getPageUrl, rememberFunding = _getGlobalProps.rememberFunding, onError = _getGlobalProps.onError, onInit = _getGlobalProps.onInit, enableStandardCardFields = _getGlobalProps.enableStandardCardFields, enableNativeCheckout = _getGlobalProps.enableNativeCheckout;
        Object(lib.g)({
            env: env,
            sessionID: sessionID,
            clientID: clientID,
            partnerAttributionID: partnerAttributionID,
            commit: commit,
            correlationID: correlationID,
            locale: locale,
            merchantID: merchantID,
            buttonSessionID: buttonSessionID,
            merchantDomain: merchantDomain
        });
        var _onInit = onInit(), initPromise = _onInit.initPromise, isEnabled = _onInit.isEnabled, buttonProcessing = !1, pay = function(_ref2) {
            var button = _ref2.button, win = _ref2.win, fundingSource = _ref2.fundingSource, card = _ref2.card, paymentMethodID = _ref2.paymentMethodID;
            return zalgo_promise_src.a.try((function() {
                if (!buttonProcessing) {
                    buttonProcessing = !0;
                    var _getButtonCallbackPro = Object(button_props.getButtonCallbackProps)({
                        xprops: window.xprops
                    }), createOrder = _getButtonCallbackPro.createOrder, createBillingAgreement = _getButtonCallbackPro.createBillingAgreement, createSubscription = _getButtonCallbackPro.createSubscription, onApprove = _getButtonCallbackPro.onApprove, onCancel = _getButtonCallbackPro.onCancel, onShippingChange = _getButtonCallbackPro.onShippingChange, validationPromise = (0, 
                    _getButtonCallbackPro.onClick)({
                        fundingSource: fundingSource
                    });
                    if (!isEnabled()) return win ? win.close() : null;
                    var isCardFields = function(_ref) {
                        var enableStandardCardFields = _ref.enableStandardCardFields;
                        return !(_ref.win || _ref.fundingSource !== sdk_constants_src.g.CARD || _ref.vault || _ref.onShippingChange || !0 !== enableStandardCardFields && !enableStandardCardFields && !_ref.isCardFieldsExperimentEnabled);
                    }({
                        win: win,
                        vault: vault,
                        onShippingChange: onShippingChange,
                        fundingSource: fundingSource,
                        isCardFieldsExperimentEnabled: isCardFieldsExperimentEnabled,
                        enableStandardCardFields: enableStandardCardFields
                    }), isVaultCapture = function(_ref) {
                        return !_ref.win && !!_ref.paymentMethodID && !_ref.onShippingChange;
                    }({
                        win: win,
                        paymentMethodID: paymentMethodID,
                        onShippingChange: onShippingChange
                    }), isPopupBridge = function(_ref2) {
                        return !_ref2.win && !!popup_bridge_popupBridge && !_ref2.onShippingChange;
                    }({
                        win: win,
                        onShippingChange: onShippingChange
                    }), isNative = function(_ref) {
                        return !(_ref.win || _ref.platform !== sdk_constants_src.i.MOBILE || _ref.onShippingChange || _ref.fundingSource !== sdk_constants_src.g.PAYPAL || _ref.createBillingAgreement || _ref.createSubscription || !_ref.enableNativeCheckout && !isNativeCheckoutInstalled);
                    }({
                        win: win,
                        platform: platform,
                        fundingSource: fundingSource,
                        onShippingChange: onShippingChange,
                        createBillingAgreement: createBillingAgreement,
                        createSubscription: createSubscription,
                        enableNativeCheckout: enableNativeCheckout
                    }), isCheckout = !(isCardFields || isVaultCapture || isPopupBridge || isNative), _ref3 = function() {
                        if (isCheckout) return initCheckout({
                            clientID: clientID,
                            win: win,
                            buttonSessionID: buttonSessionID,
                            fundingSource: fundingSource,
                            card: card,
                            buyerCountry: buyerCountry,
                            createOrder: createOrder,
                            onApprove: onApprove,
                            onCancel: onCancel,
                            onShippingChange: onShippingChange,
                            cspNonce: cspNonce,
                            locale: locale,
                            commit: commit,
                            onError: onError,
                            vault: vault,
                            clientAccessToken: clientAccessToken,
                            fundingEligibility: fundingEligibility,
                            validationPromise: validationPromise,
                            createBillingAgreement: createBillingAgreement,
                            createSubscription: createSubscription
                        });
                        if (isVaultCapture) return Object(dom.b)(button), function(props) {
                            var clientID = props.clientID, createOrder = props.createOrder, paymentMethodID = props.paymentMethodID, onApprove = props.onApprove, clientAccessToken = props.clientAccessToken, enableThreeDomainSecure = props.enableThreeDomainSecure, buttonSessionID = props.buttonSessionID, partnerAttributionID = props.partnerAttributionID;
                            if (!paymentMethodID) throw new Error("Payment method id required for vault capture");
                            if (!clientAccessToken) throw new Error("Client access token required for vault capture");
                            var restart = function() {
                                return zalgo_promise_src.a.try((function() {
                                    throw new Error("Vault capture restart not implemented");
                                }));
                            };
                            return {
                                start: function() {
                                    var facilitatorAccessTokenPromise = Object(api.e)(clientID);
                                    return zalgo_promise_src.a.try((function() {
                                        return createOrder();
                                    })).then((function(orderID) {
                                        return Object(api.p)({
                                            clientAccessToken: clientAccessToken,
                                            orderID: orderID,
                                            paymentMethodID: paymentMethodID,
                                            enableThreeDomainSecure: enableThreeDomainSecure,
                                            buttonSessionID: buttonSessionID,
                                            partnerAttributionID: partnerAttributionID
                                        });
                                    })).then((function(_ref4) {
                                        return function(_ref3) {
                                            var status = _ref3.status, body = _ref3.body, createOrder = _ref3.createOrder;
                                            return zalgo_promise_src.a.try((function() {
                                                if (422 === status && body.links && body.links.some((function(link) {
                                                    return "3ds-contingency-resolution" === link.rel;
                                                }))) return function(_ref2) {
                                                    var createOrder = _ref2.createOrder, promise = new zalgo_promise_src.a, instance = window.paypal.ThreeDomainSecure({
                                                        createOrder: createOrder,
                                                        onSuccess: function() {
                                                            return promise.resolve();
                                                        },
                                                        onCancel: function() {
                                                            return promise.reject(new Error("3DS cancelled"));
                                                        },
                                                        onError: function(err) {
                                                            return promise.reject(err);
                                                        }
                                                    });
                                                    return instance.renderTo(window.parent, constants.p.BODY).then((function() {
                                                        return promise;
                                                    })).finally(instance.close);
                                                }({
                                                    createOrder: createOrder
                                                });
                                                if (200 !== status) throw new Error("Validate payment failed with status: " + status);
                                            }));
                                        }({
                                            status: _ref4.status,
                                            body: _ref4.body,
                                            createOrder: createOrder
                                        });
                                    })).then((function() {
                                        return facilitatorAccessTokenPromise.then((function(facilitatorAccessToken) {
                                            return onApprove({
                                                facilitatorAccessToken: facilitatorAccessToken
                                            }, {
                                                restart: restart
                                            });
                                        }));
                                    }));
                                },
                                close: function() {
                                    return zalgo_promise_src.a.resolve();
                                },
                                triggerError: function(err) {
                                    throw err;
                                }
                            };
                        }({
                            clientID: clientID,
                            createOrder: createOrder,
                            paymentMethodID: paymentMethodID,
                            onApprove: onApprove,
                            clientAccessToken: clientAccessToken,
                            enableThreeDomainSecure: enableThreeDomainSecure,
                            buttonSessionID: buttonSessionID,
                            partnerAttributionID: partnerAttributionID
                        });
                        if (isCardFields) return function(props) {
                            var fundingSource = props.fundingSource, card = props.card, buyerCountry = props.buyerCountry, createOrder = props.createOrder, _onApprove = props.onApprove, onCancel = props.onCancel, onShippingChange = props.onShippingChange, cspNonce = props.cspNonce, locale = props.locale, commit = props.commit, onError = props.onError, buttonSessionID = props.buttonSessionID, clientID = props.clientID, vault = props.vault, clientAccessToken = props.clientAccessToken, fundingEligibility = props.fundingEligibility, createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription;
                            if (!card) throw new Error("Card required to render card fields");
                            if (cardFieldsOpen) return highlightCard(card), {
                                start: lib.d,
                                close: lib.d,
                                triggerError: lib.d
                            };
                            var buyerAccessToken, restart = Object(src.i)((function() {
                                return initCheckout({
                                    clientID: clientID,
                                    buttonSessionID: buttonSessionID,
                                    fundingSource: fundingSource,
                                    card: card,
                                    buyerCountry: buyerCountry,
                                    createOrder: createOrder,
                                    onApprove: _onApprove,
                                    onCancel: onCancel,
                                    onShippingChange: onShippingChange,
                                    cspNonce: cspNonce,
                                    locale: locale,
                                    commit: commit,
                                    onError: onError,
                                    vault: vault,
                                    clientAccessToken: clientAccessToken,
                                    fundingEligibility: fundingEligibility,
                                    createBillingAgreement: createBillingAgreement,
                                    createSubscription: createSubscription,
                                    context: constants.b.IFRAME
                                }).start().finally(lib.h);
                            })), facilitatorAccessTokenPromise = Object(api.e)(clientID), _window$paypal$CardFi = window.paypal.CardFields({
                                createOrder: createOrder,
                                fundingSource: fundingSource,
                                card: card,
                                onApprove: function(_ref3) {
                                    var payerID = _ref3.payerID, paymentID = _ref3.paymentID, billingToken = _ref3.billingToken;
                                    return zalgo_promise_src.a.all([ facilitatorAccessTokenPromise, close() ]).then((function(_ref4) {
                                        return _onApprove({
                                            payerID: payerID,
                                            paymentID: paymentID,
                                            billingToken: billingToken,
                                            facilitatorAccessToken: _ref4[0],
                                            buyerAccessToken: buyerAccessToken
                                        }, {
                                            restart: restart
                                        });
                                    }));
                                },
                                onAuth: function(_ref5) {
                                    buyerAccessToken = _ref5.accessToken;
                                },
                                onCancel: onCancel,
                                onError: onError,
                                onClose: function() {
                                    cardFieldsOpen = !1;
                                },
                                onShippingChange: onShippingChange,
                                onCardTypeChange: function(_ref2) {
                                    highlightCard(_ref2.card);
                                },
                                buttonSessionID: buttonSessionID,
                                buyerCountry: buyerCountry,
                                locale: locale,
                                commit: commit,
                                cspNonce: cspNonce
                            }), render = _window$paypal$CardFi.render, closeCardFields = _window$paypal$CardFi.close;
                            cardFieldsOpen = !0;
                            var close = function() {
                                return slideDownButtons(), closeCardFields();
                            };
                            return {
                                start: function() {
                                    cardFieldsOpen = !0;
                                    var renderPromise = render("#card-fields-container");
                                    return card_fields_slideUpButtons(), highlightCard(card), renderPromise;
                                },
                                close: close,
                                triggerError: _window$paypal$CardFi.onError
                            };
                        }({
                            clientID: clientID,
                            buttonSessionID: buttonSessionID,
                            fundingSource: fundingSource,
                            card: card,
                            buyerCountry: buyerCountry,
                            createOrder: createOrder,
                            onApprove: onApprove,
                            onCancel: onCancel,
                            onShippingChange: onShippingChange,
                            cspNonce: cspNonce,
                            locale: locale,
                            commit: commit,
                            onError: onError,
                            vault: vault,
                            clientAccessToken: clientAccessToken,
                            fundingEligibility: fundingEligibility,
                            createBillingAgreement: createBillingAgreement,
                            createSubscription: createSubscription
                        });
                        if (isPopupBridge) return Object(dom.b)(button), function(props) {
                            var clientID = props.clientID, createOrder = props.createOrder, onApprove = props.onApprove, onCancel = props.onCancel, commit = props.commit, fundingSource = props.fundingSource;
                            return {
                                start: function start() {
                                    var facilitatorAccessTokenPromise = Object(api.e)(clientID);
                                    return createOrder().then((function(orderID) {
                                        if (!popup_bridge_popupBridge) throw new Error("Popup bridge required");
                                        var url = Object(src.c)("" + Object(cross_domain_utils_src.a)() + config.d.CHECKOUT, {
                                            query: {
                                                fundingSource: fundingSource,
                                                token: orderID,
                                                useraction: commit ? constants.q.COMMIT : constants.q.CONTINUE,
                                                redirect_uri: popup_bridge_popupBridge.nativeUrl
                                            }
                                        });
                                        return popup_bridge_popupBridge.start(url);
                                    })).then((function(_ref3) {
                                        var opType = _ref3.opType, payerID = _ref3.PayerID, paymentID = _ref3.paymentId, billingToken = _ref3.ba_token;
                                        if (opType === props_getPopupBridge.a.PAYMENT) return facilitatorAccessTokenPromise.then((function(facilitatorAccessToken) {
                                            return onApprove({
                                                payerID: payerID,
                                                paymentID: paymentID,
                                                billingToken: billingToken,
                                                facilitatorAccessToken: facilitatorAccessToken
                                            }, {
                                                restart: start
                                            });
                                        }));
                                        if (opType === props_getPopupBridge.a.CANCEL) return onCancel();
                                        throw new Error("Unhandleable opType: " + opType);
                                    }));
                                },
                                close: lib.d,
                                triggerError: function(err) {
                                    throw err;
                                }
                            };
                        }({
                            clientID: clientID,
                            popupBridge: void 0,
                            fundingSource: fundingSource,
                            createOrder: createOrder,
                            onApprove: onApprove,
                            onCancel: onCancel,
                            commit: commit
                        });
                        if (isNative) return function(props) {
                            var createOrder = props.createOrder, onApprove = props.onApprove, onCancel = props.onCancel, onError = props.onError, commit = props.commit, clientID = props.clientID, getPageUrl = props.getPageUrl, env = props.env, stageHost = props.stageHost, apiStageHost = props.apiStageHost;
                            return {
                                start: function start() {
                                    return zalgo_promise_src.a.try((function() {
                                        var facilitatorAccessTokenPromise = Object(api.e)(clientID), orderPromise = createOrder(), pageUrlPromise = getPageUrl(), socket = getNativeSocket();
                                        socket.on(MESSAGE.GET_PROPS, (function() {
                                            return zalgo_promise_src.a.all([ facilitatorAccessTokenPromise, orderPromise, pageUrlPromise ]).then((function(_ref3) {
                                                var facilitatorAccessToken = _ref3[0], orderID = _ref3[1], pageUrl = _ref3[2], userAgent = Object(src.e)();
                                                return {
                                                    orderID: orderID,
                                                    facilitatorAccessToken: facilitatorAccessToken,
                                                    pageUrl: pageUrl,
                                                    commit: commit,
                                                    userAgent: userAgent,
                                                    env: env,
                                                    stageHost: stageHost,
                                                    apiStageHost: apiStageHost
                                                };
                                            }));
                                        })), socket.on(MESSAGE.ON_APPROVE, (function(_ref4) {
                                            var _ref4$data = _ref4.data, payerID = _ref4$data.payerID, paymentID = _ref4$data.paymentID, billingToken = _ref4$data.billingToken;
                                            return facilitatorAccessTokenPromise.then((function(facilitatorAccessToken) {
                                                return onApprove({
                                                    payerID: payerID,
                                                    paymentID: paymentID,
                                                    billingToken: billingToken,
                                                    facilitatorAccessToken: facilitatorAccessToken
                                                }, {
                                                    restart: start
                                                });
                                            }));
                                        })), socket.on(MESSAGE.ON_CANCEL, (function() {
                                            return onCancel();
                                        })), socket.on(MESSAGE.ON_ERROR, (function(_ref5) {
                                            return onError(new Error(_ref5.data.error.message));
                                        })), Object(lib.e)(Object(src.c)(config.d.CHECKOUT, {
                                            query: {
                                                sessionUID: sessionUID
                                            }
                                        }));
                                    }));
                                },
                                close: lib.d,
                                triggerError: function(err) {
                                    throw err;
                                }
                            };
                        }({
                            createOrder: createOrder,
                            onApprove: onApprove,
                            onCancel: onCancel,
                            onError: onError,
                            commit: commit,
                            fundingSource: fundingSource,
                            clientID: clientID,
                            getPageUrl: getPageUrl,
                            env: env,
                            stageHost: stageHost,
                            apiStageHost: apiStageHost
                        });
                        throw new Error("No valid flow found");
                    }(), start = _ref3.start, close = _ref3.close, triggerError = _ref3.triggerError;
                    return validationPromise.then((function(valid) {
                        return valid ? (createOrder().then((function(orderID) {
                            return function(_ref) {
                                var orderID = _ref.orderID, fundingSource = _ref.fundingSource, isCardFields = _ref.isCardFields;
                                return Object(api.o)({
                                    orderID: orderID,
                                    fundingSource: fundingSource,
                                    integrationArtifact: constants.k.PAYPAL_JS_SDK,
                                    userExperienceFlow: isCardFields ? constants.r.INLINE : constants.r.INCONTEXT,
                                    productFlow: constants.m.SMART_PAYMENT_BUTTONS
                                });
                            }({
                                orderID: orderID,
                                fundingSource: fundingSource,
                                isCardFields: isCardFields
                            });
                        })), start().then((function() {
                            return createOrder();
                        })).then((function(orderID) {
                            return function(orderID, _ref2) {
                                var clientID = _ref2.clientID, merchantID = _ref2.merchantID;
                                return zalgo_promise_src.a.all([ Object(api_api.a)({
                                    query: "\n                query GetCheckoutDetails($orderID: String!) {\n                    checkoutSession(token: $orderID) {\n                        cart {\n                            intent\n                            amounts {\n                                total {\n                                    currencyCode\n                                }\n                            }\n                        }\n                    }\n                }\n            ",
                                    variables: {
                                        orderID: orderID
                                    }
                                }), Object(api.j)(orderID) ]).then((function(_ref3) {
                                    var payee = _ref3[1], cart = _ref3[0].data.checkoutSession.cart, intent = "sale" === cart.intent.toLowerCase() ? sdk_constants_src.h.CAPTURE : cart.intent.toLowerCase(), currency = cart.amounts && cart.amounts.total.currencyCode, expectedCurrency = currency;
                                    if (intent != intent) throw new Error("Expected intent from order api call to be " + intent + ", got " + intent + ". Please ensure you are passing " + sdk_constants_src.j.INTENT + "=" + intent + " to the sdk");
                                    if (currency && currency !== expectedCurrency) throw new Error("Expected currency from order api call to be " + expectedCurrency + ", got " + currency + ". Please ensure you are passing " + sdk_constants_src.j.CURRENCY + "=" + currency + " to the sdk");
                                    var payeeMerchantID = payee && payee.merchant && payee.merchant.id, actualMerchantID = merchantID && merchantID.length && merchantID[0];
                                    if (!actualMerchantID) throw new Error("Could not determine correct merchant id");
                                    if (!payeeMerchantID) throw new Error("No payee found in transaction. Expected " + actualMerchantID);
                                    payeeMerchantID !== actualMerchantID && -1 === config.b.indexOf(clientID) && Object(lib.b)().info("client_id_payee_no_match_" + clientID).flush();
                                    var xpropMerchantID = merchantID && merchantID[0];
                                    if (xpropMerchantID && payeeMerchantID !== xpropMerchantID) throw new Error("Payee passed in transaction does not match expected merchant id: " + xpropMerchantID);
                                }));
                            }(orderID, {
                                clientID: clientID,
                                merchantID: merchantID
                            });
                        })).catch((function(err) {
                            return zalgo_promise_src.a.all([ triggerError(err), close() ]);
                        }))) : zalgo_promise_src.a.all([ close(), win && win.close() ]).then(src.j);
                    }));
                }
            })).finally((function() {
                buttonProcessing = !1, Object(dom.a)(button);
            }));
        };
        Object(dom.c)().forEach((function(button) {
            Object(lib.a)(button);
            var _getSelectedFunding = Object(dom.e)(button), fundingSource = _getSelectedFunding.fundingSource, card = _getSelectedFunding.card, paymentMethodID = _getSelectedFunding.paymentMethodID;
            Object(src.l)(button, (function(event) {
                event.preventDefault(), event.stopPropagation();
                var payPromise = pay({
                    button: button,
                    fundingSource: fundingSource,
                    card: card,
                    paymentMethodID: paymentMethodID
                });
                button.payPromise = payPromise, personalization && personalization.tagline && Object(lib.f)(personalization.tagline.tracking.click);
            }));
        }));
        var setupPrerenderTask = initPromise.then((function() {
            return getPrerenderDetails().then((function(prerenderDetails) {
                if (prerenderDetails) {
                    var win = prerenderDetails.win, fundingSource = prerenderDetails.fundingSource, card = prerenderDetails.card, button = document.querySelector("[" + constants.c.FUNDING_SOURCE + "=" + fundingSource + "]");
                    if (!button) throw new Error("Can not find button element");
                    return pay({
                        button: button,
                        win: win,
                        fundingSource: fundingSource,
                        card: card
                    });
                }
            }));
        })), setupRememberTask = function(_ref) {
            var rememberFunding = _ref.rememberFunding, fundingEligibility = _ref.fundingEligibility;
            return zalgo_promise_src.a.try((function() {
                if (fundingEligibility && fundingEligibility.venmo && fundingEligibility.venmo.eligible) return rememberFunding([ sdk_constants_src.g.VENMO ]);
            }));
        }({
            rememberFunding: rememberFunding,
            fundingEligibility: fundingEligibility
        }), setupButtonLogsTask = function(_ref) {
            var style = _ref.style, logger = Object(lib.b)();
            return Object(src.h)() && logger.warn("button_child_intranet_mode"), Object(src.d)().then((function(pageRenderTime) {
                var _logger$track, fundingSources = [].slice.call(document.querySelectorAll("[" + constants.c.FUNDING_SOURCE + "]")).map((function(el) {
                    return el.getAttribute(constants.c.CARD) || el.getAttribute(constants.c.FUNDING_SOURCE);
                })).filter((function(source) {
                    return source && source !== sdk_constants_src.g.CARD;
                })), layout = style.layout, color = style.color, shape = style.shape, label = style.label, _style$tagline = style.tagline, tagline = void 0 === _style$tagline || _style$tagline;
                logger.info("button_render_color_" + color), logger.info("button_render_shape_" + shape), 
                logger.info("button_render_label_" + label), logger.info("button_render_layout_" + layout), 
                logger.info("button_render_tagline_" + tagline.toString()), logger.track(((_logger$track = {})[sdk_constants_src.d.TRANSITION] = constants.h.BUTTON_LOAD, 
                _logger$track[sdk_constants_src.d.FUNDING_LIST] = fundingSources.join(":"), _logger$track[sdk_constants_src.d.FUNDING_COUNT] = fundingSources.length.toString(), 
                _logger$track[sdk_constants_src.d.PAGE_LOAD_TIME] = pageRenderTime ? pageRenderTime.toString() : "", 
                _logger$track[constants.i.BUTTON_LAYOUT] = layout, _logger$track[constants.i.BUTTON_COLOR] = color, 
                _logger$track[constants.i.BUTTON_SIZE] = "responsive", _logger$track[constants.i.BUTTON_SHAPE] = shape, 
                _logger$track[constants.i.BUTTON_LABEL] = label, _logger$track[constants.i.BUTTON_WIDTH] = window.innerWidth, 
                _logger$track[constants.i.BUTTON_TYPE] = constants.e.IFRAME, _logger$track[constants.i.BUTTON_TAGLINE_ENABLED] = tagline ? "1" : "0", 
                _logger$track)), logger.flush();
            }));
        }({
            style: style
        }), setupCheckoutFlow = function() {
            checkoutOpen = !1;
            var _ref = [ Object(cross_domain_utils_src.b)(window), Object(cross_domain_utils_src.c)(window) ], parent = _ref[0], top = _ref[1], tasks = {};
            return top && parent && parent !== top && (tasks.canRenderTo = window.paypal.Checkout.canRenderTo(top).then((function(result) {
                canRenderTop = result;
            }))), zalgo_promise_src.a.hash(tasks).then(src.j);
        }(), setupPopupBridgeFlow = function(_ref) {
            var getPopupBridge = _ref.getPopupBridge;
            return zalgo_promise_src.a.try((function() {
                if (getPopupBridge) return getPopupBridge().then((function(bridge) {
                    popup_bridge_popupBridge = bridge;
                }));
            }));
        }({
            getPopupBridge: getPopupBridge
        }), setupNativeFlow = function(_ref2) {
            var platform = _ref2.platform, enableNativeCheckout = _ref2.enableNativeCheckout;
            return zalgo_promise_src.a.try((function() {
                if (platform === sdk_constants_src.i.MOBILE && enableNativeCheckout) return getNativeSocket().send(MESSAGE.DETECT_APP).then((function() {
                    Object(lib.b)().info("native_sdk_detected"), isNativeCheckoutInstalled = !0;
                }), (function(err) {
                    Object(lib.b)().info("native_sdk_not_detected", {
                        err: Object(src.s)(err)
                    });
                }));
            }));
        }({
            platform: platform,
            enableNativeCheckout: enableNativeCheckout
        });
        return zalgo_promise_src.a.hash({
            initPromise: initPromise,
            setupButtonLogsTask: setupButtonLogsTask,
            setupPrerenderTask: setupPrerenderTask,
            setupRememberTask: setupRememberTask,
            setupCheckoutFlow: setupCheckoutFlow,
            setupNativeFlow: setupNativeFlow,
            setupPopupBridgeFlow: setupPopupBridgeFlow
        }).then(src.j);
    }
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return setupButton;
    }));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
    __webpack_require__.d(__webpack_exports__, "setupButton", (function() {
        return _button__WEBPACK_IMPORTED_MODULE_0__.a;
    }));
    var _props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
    for (var __WEBPACK_IMPORT_KEY__ in _props__WEBPACK_IMPORTED_MODULE_1__) [ "setupButton", "default" ].indexOf(__WEBPACK_IMPORT_KEY__) < 0 && function(key) {
        __webpack_require__.d(__webpack_exports__, key, (function() {
            return _props__WEBPACK_IMPORTED_MODULE_1__[key];
        }));
    }(__WEBPACK_IMPORT_KEY__);
} ]);
//# sourceMappingURL=smart-payment-buttons.js.map