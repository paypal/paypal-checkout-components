window.smartCard = function(modules) {
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
    return __webpack_require__(__webpack_require__.s = 23);
}([ function(module, exports, __webpack_require__) {
    "use strict";
    var __assign = this && this.__assign || function() {
        return (__assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) ({}).hasOwnProperty.call(s, p) && (t[p] = s[p]);
            }
            return t;
        }).apply(this, arguments);
    };
    var cardTypes = __webpack_require__(9);
    var add_matching_cards_to_results_1 = __webpack_require__(10);
    var is_valid_input_type_1 = __webpack_require__(12);
    var find_best_match_1 = __webpack_require__(13);
    var clone_1 = __webpack_require__(4);
    var customCards = {};
    var cardNames = {
        VISA: "visa",
        MASTERCARD: "mastercard",
        AMERICAN_EXPRESS: "american-express",
        DINERS_CLUB: "diners-club",
        DISCOVER: "discover",
        JCB: "jcb",
        UNIONPAY: "unionpay",
        MAESTRO: "maestro",
        ELO: "elo",
        MIR: "mir",
        HIPER: "hiper",
        HIPERCARD: "hipercard"
    };
    var ORIGINAL_TEST_ORDER = [ cardNames.VISA, cardNames.MASTERCARD, cardNames.AMERICAN_EXPRESS, cardNames.DINERS_CLUB, cardNames.DISCOVER, cardNames.JCB, cardNames.UNIONPAY, cardNames.MAESTRO, cardNames.ELO, cardNames.MIR, cardNames.HIPER, cardNames.HIPERCARD ];
    var testOrder = clone_1.clone(ORIGINAL_TEST_ORDER);
    function findType(cardType) {
        return customCards[cardType] || cardTypes[cardType];
    }
    function getCardPosition(name, ignoreErrorForNotExisting) {
        void 0 === ignoreErrorForNotExisting && (ignoreErrorForNotExisting = !1);
        var position = testOrder.indexOf(name);
        if (!ignoreErrorForNotExisting && -1 === position) throw new Error('"' + name + '" is not a supported card type.');
        return position;
    }
    function creditCardType(cardNumber) {
        var results = [];
        if (!is_valid_input_type_1.isValidInputType(cardNumber)) return results;
        if (0 === cardNumber.length) return testOrder.map((function(cardType) {
            return clone_1.clone(findType(cardType));
        }));
        testOrder.forEach((function(cardType) {
            var cardConfiguration = findType(cardType);
            add_matching_cards_to_results_1.addMatchingCardsToResults(cardNumber, cardConfiguration, results);
        }));
        var bestMatch = find_best_match_1.findBestMatch(results);
        return bestMatch ? [ bestMatch ] : results;
    }
    creditCardType.getTypeInfo = function(cardType) {
        return clone_1.clone(findType(cardType));
    };
    creditCardType.removeCard = function(name) {
        var position = getCardPosition(name);
        testOrder.splice(position, 1);
    };
    creditCardType.addCard = function(config) {
        var existingCardPosition = getCardPosition(config.type, !0);
        customCards[config.type] = config;
        -1 === existingCardPosition && testOrder.push(config.type);
    };
    creditCardType.updateCard = function(cardType, updates) {
        var originalObject = customCards[cardType] || cardTypes[cardType];
        if (!originalObject) throw new Error('"' + cardType + "\" is not a recognized type. Use `addCard` instead.'");
        if (updates.type && originalObject.type !== updates.type) throw new Error("Cannot overwrite type parameter.");
        var clonedCard = clone_1.clone(originalObject);
        clonedCard = __assign(__assign({}, clonedCard), updates);
        customCards[clonedCard.type] = clonedCard;
    };
    creditCardType.changeOrder = function(name, position) {
        var currentPosition = getCardPosition(name);
        testOrder.splice(currentPosition, 1);
        testOrder.splice(position, 0, name);
    };
    creditCardType.resetModifications = function() {
        testOrder = clone_1.clone(ORIGINAL_TEST_ORDER);
        customCards = {};
    };
    creditCardType.types = cardNames;
    module.exports = creditCardType;
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(8);
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(22);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.expirationYear = void 0;
    function verification(isValid, isPotentiallyValid, isCurrentYear) {
        return {
            isValid: isValid,
            isPotentiallyValid: isPotentiallyValid,
            isCurrentYear: isCurrentYear || !1
        };
    }
    exports.expirationYear = function(value, maxElapsedYear) {
        void 0 === maxElapsedYear && (maxElapsedYear = 19);
        var isCurrentYear;
        if ("string" != typeof value) return verification(!1, !1);
        if ("" === value.replace(/\s/g, "")) return verification(!1, !0);
        if (!/^\d*$/.test(value)) return verification(!1, !1);
        var len = value.length;
        if (len < 2) return verification(!1, !0);
        var currentYear = (new Date).getFullYear();
        if (3 === len) return verification(!1, value.slice(0, 2) === String(currentYear).slice(0, 2));
        if (len > 4) return verification(!1, !1);
        var numericValue = parseInt(value, 10);
        var twoDigitYear = Number(String(currentYear).substr(2, 2));
        var valid = !1;
        if (2 === len) {
            if (String(currentYear).substr(0, 2) === value) return verification(!1, !0);
            isCurrentYear = twoDigitYear === numericValue;
            valid = numericValue >= twoDigitYear && numericValue <= twoDigitYear + maxElapsedYear;
        } else if (4 === len) {
            isCurrentYear = currentYear === numericValue;
            valid = numericValue >= currentYear && numericValue <= currentYear + maxElapsedYear;
        }
        return verification(valid, valid, isCurrentYear);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.clone = void 0;
    exports.clone = function(originalObject) {
        return originalObject ? JSON.parse(JSON.stringify(originalObject)) : null;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.expirationMonth = void 0;
    function verification(isValid, isPotentiallyValid, isValidForThisYear) {
        return {
            isValid: isValid,
            isPotentiallyValid: isPotentiallyValid,
            isValidForThisYear: isValidForThisYear || !1
        };
    }
    exports.expirationMonth = function(value) {
        var currentMonth = (new Date).getMonth() + 1;
        if ("string" != typeof value) return verification(!1, !1);
        if ("" === value.replace(/\s/g, "") || "0" === value) return verification(!1, !0);
        if (!/^\d*$/.test(value)) return verification(!1, !1);
        var month = parseInt(value, 10);
        if (isNaN(Number(value))) return verification(!1, !1);
        var result = month > 0 && month < 13;
        return verification(result, result, result && month >= currentMonth);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(identifier) {
        var sum = 0;
        var alt = !1;
        var i = identifier.length - 1;
        var num;
        for (;i >= 0; ) {
            num = parseInt(identifier.charAt(i), 10);
            alt && (num *= 2) > 9 && (num = num % 10 + 1);
            alt = !alt;
            sum += num;
            i--;
        }
        return sum % 10 == 0;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
        void 0 === k2 && (k2 = k);
        Object.defineProperty(o, k2, {
            enumerable: !0,
            get: function() {
                return m[k];
            }
        });
    } : function(o, m, k, k2) {
        void 0 === k2 && (k2 = k);
        o[k2] = m[k];
    });
    var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", {
            enumerable: !0,
            value: v
        });
    } : function(o, v) {
        o.default = v;
    });
    var creditCardType = (this && this.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (null != mod) for (var k in mod) "default" !== k && {}.hasOwnProperty.call(mod, k) && __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    })(__webpack_require__(0));
    var cardholder_name_1 = __webpack_require__(14);
    var card_number_1 = __webpack_require__(15);
    var expiration_date_1 = __webpack_require__(17);
    var expiration_month_1 = __webpack_require__(5);
    var expiration_year_1 = __webpack_require__(3);
    var cvv_1 = __webpack_require__(20);
    var postal_code_1 = __webpack_require__(21);
    module.exports = {
        creditCardType: creditCardType,
        cardholderName: cardholder_name_1.cardholderName,
        number: card_number_1.cardNumber,
        expirationDate: expiration_date_1.expirationDate,
        expirationMonth: expiration_month_1.expirationMonth,
        expirationYear: expiration_year_1.expirationYear,
        cvv: cvv_1.cvv,
        postalCode: postal_code_1.postalCode
    };
}, function(module, exports, __webpack_require__) {
    "undefined" != typeof self && self, module.exports = function(modules) {
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
        __webpack_require__.d(__webpack_exports__, "getUserAgent", (function() {
            return getUserAgent;
        }));
        __webpack_require__.d(__webpack_exports__, "isDevice", (function() {
            return isDevice;
        }));
        __webpack_require__.d(__webpack_exports__, "isTablet", (function() {
            return isTablet;
        }));
        __webpack_require__.d(__webpack_exports__, "isWebView", (function() {
            return isWebView;
        }));
        __webpack_require__.d(__webpack_exports__, "isStandAlone", (function() {
            return isStandAlone;
        }));
        __webpack_require__.d(__webpack_exports__, "isFacebookWebView", (function() {
            return isFacebookWebView;
        }));
        __webpack_require__.d(__webpack_exports__, "isFirefox", (function() {
            return isFirefox;
        }));
        __webpack_require__.d(__webpack_exports__, "isFirefoxIOS", (function() {
            return isFirefoxIOS;
        }));
        __webpack_require__.d(__webpack_exports__, "isEdgeIOS", (function() {
            return isEdgeIOS;
        }));
        __webpack_require__.d(__webpack_exports__, "isOperaMini", (function() {
            return isOperaMini;
        }));
        __webpack_require__.d(__webpack_exports__, "isAndroid", (function() {
            return isAndroid;
        }));
        __webpack_require__.d(__webpack_exports__, "isIos", (function() {
            return isIos;
        }));
        __webpack_require__.d(__webpack_exports__, "isIOS14", (function() {
            return isIOS14;
        }));
        __webpack_require__.d(__webpack_exports__, "isGoogleSearchApp", (function() {
            return isGoogleSearchApp;
        }));
        __webpack_require__.d(__webpack_exports__, "isQQBrowser", (function() {
            return isQQBrowser;
        }));
        __webpack_require__.d(__webpack_exports__, "isIosWebview", (function() {
            return isIosWebview;
        }));
        __webpack_require__.d(__webpack_exports__, "isSFVC", (function() {
            return isSFVC;
        }));
        __webpack_require__.d(__webpack_exports__, "isSFVCorSafari", (function() {
            return isSFVCorSafari;
        }));
        __webpack_require__.d(__webpack_exports__, "isAndroidWebview", (function() {
            return isAndroidWebview;
        }));
        __webpack_require__.d(__webpack_exports__, "isIE", (function() {
            return device_isIE;
        }));
        __webpack_require__.d(__webpack_exports__, "isIECompHeader", (function() {
            return isIECompHeader;
        }));
        __webpack_require__.d(__webpack_exports__, "isElectron", (function() {
            return isElectron;
        }));
        __webpack_require__.d(__webpack_exports__, "isIEIntranet", (function() {
            return isIEIntranet;
        }));
        __webpack_require__.d(__webpack_exports__, "isMacOsCna", (function() {
            return isMacOsCna;
        }));
        __webpack_require__.d(__webpack_exports__, "supportsPopups", (function() {
            return supportsPopups;
        }));
        __webpack_require__.d(__webpack_exports__, "isChrome", (function() {
            return isChrome;
        }));
        __webpack_require__.d(__webpack_exports__, "isSafari", (function() {
            return isSafari;
        }));
        __webpack_require__.d(__webpack_exports__, "isApplePaySupported", (function() {
            return isApplePaySupported;
        }));
        __webpack_require__.d(__webpack_exports__, "isCrossSiteTrackingEnabled", (function() {
            return isCrossSiteTrackingEnabled;
        }));
        __webpack_require__.d(__webpack_exports__, "getBody", (function() {
            return getBody;
        }));
        __webpack_require__.d(__webpack_exports__, "isDocumentReady", (function() {
            return isDocumentReady;
        }));
        __webpack_require__.d(__webpack_exports__, "isDocumentInteractive", (function() {
            return isDocumentInteractive;
        }));
        __webpack_require__.d(__webpack_exports__, "urlEncode", (function() {
            return urlEncode;
        }));
        __webpack_require__.d(__webpack_exports__, "waitForWindowReady", (function() {
            return waitForWindowReady;
        }));
        __webpack_require__.d(__webpack_exports__, "waitForDocumentReady", (function() {
            return waitForDocumentReady;
        }));
        __webpack_require__.d(__webpack_exports__, "waitForDocumentBody", (function() {
            return waitForDocumentBody;
        }));
        __webpack_require__.d(__webpack_exports__, "parseQuery", (function() {
            return parseQuery;
        }));
        __webpack_require__.d(__webpack_exports__, "getQueryParam", (function() {
            return getQueryParam;
        }));
        __webpack_require__.d(__webpack_exports__, "urlWillRedirectPage", (function() {
            return urlWillRedirectPage;
        }));
        __webpack_require__.d(__webpack_exports__, "formatQuery", (function() {
            return formatQuery;
        }));
        __webpack_require__.d(__webpack_exports__, "extendQuery", (function() {
            return extendQuery;
        }));
        __webpack_require__.d(__webpack_exports__, "extendUrl", (function() {
            return extendUrl;
        }));
        __webpack_require__.d(__webpack_exports__, "redirect", (function() {
            return redirect;
        }));
        __webpack_require__.d(__webpack_exports__, "hasMetaViewPort", (function() {
            return hasMetaViewPort;
        }));
        __webpack_require__.d(__webpack_exports__, "isElementVisible", (function() {
            return isElementVisible;
        }));
        __webpack_require__.d(__webpack_exports__, "getPerformance", (function() {
            return getPerformance;
        }));
        __webpack_require__.d(__webpack_exports__, "enablePerformance", (function() {
            return enablePerformance;
        }));
        __webpack_require__.d(__webpack_exports__, "getPageRenderTime", (function() {
            return getPageRenderTime;
        }));
        __webpack_require__.d(__webpack_exports__, "htmlEncode", (function() {
            return htmlEncode;
        }));
        __webpack_require__.d(__webpack_exports__, "isBrowser", (function() {
            return dom_isBrowser;
        }));
        __webpack_require__.d(__webpack_exports__, "querySelectorAll", (function() {
            return querySelectorAll;
        }));
        __webpack_require__.d(__webpack_exports__, "onClick", (function() {
            return onClick;
        }));
        __webpack_require__.d(__webpack_exports__, "getScript", (function() {
            return getScript;
        }));
        __webpack_require__.d(__webpack_exports__, "isLocalStorageEnabled", (function() {
            return isLocalStorageEnabled;
        }));
        __webpack_require__.d(__webpack_exports__, "getBrowserLocales", (function() {
            return getBrowserLocales;
        }));
        __webpack_require__.d(__webpack_exports__, "appendChild", (function() {
            return appendChild;
        }));
        __webpack_require__.d(__webpack_exports__, "getElementSafe", (function() {
            return getElementSafe;
        }));
        __webpack_require__.d(__webpack_exports__, "getElement", (function() {
            return getElement;
        }));
        __webpack_require__.d(__webpack_exports__, "elementReady", (function() {
            return elementReady;
        }));
        __webpack_require__.d(__webpack_exports__, "PopupOpenError", (function() {
            return dom_PopupOpenError;
        }));
        __webpack_require__.d(__webpack_exports__, "popup", (function() {
            return popup;
        }));
        __webpack_require__.d(__webpack_exports__, "writeToWindow", (function() {
            return writeToWindow;
        }));
        __webpack_require__.d(__webpack_exports__, "writeElementToWindow", (function() {
            return writeElementToWindow;
        }));
        __webpack_require__.d(__webpack_exports__, "setStyle", (function() {
            return setStyle;
        }));
        __webpack_require__.d(__webpack_exports__, "awaitFrameLoad", (function() {
            return awaitFrameLoad;
        }));
        __webpack_require__.d(__webpack_exports__, "awaitFrameWindow", (function() {
            return awaitFrameWindow;
        }));
        __webpack_require__.d(__webpack_exports__, "createElement", (function() {
            return createElement;
        }));
        __webpack_require__.d(__webpack_exports__, "iframe", (function() {
            return iframe;
        }));
        __webpack_require__.d(__webpack_exports__, "addEventListener", (function() {
            return addEventListener;
        }));
        __webpack_require__.d(__webpack_exports__, "bindEvents", (function() {
            return bindEvents;
        }));
        __webpack_require__.d(__webpack_exports__, "setVendorCSS", (function() {
            return setVendorCSS;
        }));
        __webpack_require__.d(__webpack_exports__, "animate", (function() {
            return animate;
        }));
        __webpack_require__.d(__webpack_exports__, "makeElementVisible", (function() {
            return makeElementVisible;
        }));
        __webpack_require__.d(__webpack_exports__, "makeElementInvisible", (function() {
            return makeElementInvisible;
        }));
        __webpack_require__.d(__webpack_exports__, "showElement", (function() {
            return showElement;
        }));
        __webpack_require__.d(__webpack_exports__, "hideElement", (function() {
            return hideElement;
        }));
        __webpack_require__.d(__webpack_exports__, "destroyElement", (function() {
            return destroyElement;
        }));
        __webpack_require__.d(__webpack_exports__, "showAndAnimate", (function() {
            return showAndAnimate;
        }));
        __webpack_require__.d(__webpack_exports__, "animateAndHide", (function() {
            return animateAndHide;
        }));
        __webpack_require__.d(__webpack_exports__, "addClass", (function() {
            return addClass;
        }));
        __webpack_require__.d(__webpack_exports__, "removeClass", (function() {
            return removeClass;
        }));
        __webpack_require__.d(__webpack_exports__, "isElementClosed", (function() {
            return isElementClosed;
        }));
        __webpack_require__.d(__webpack_exports__, "watchElementForClose", (function() {
            return watchElementForClose;
        }));
        __webpack_require__.d(__webpack_exports__, "fixScripts", (function() {
            return fixScripts;
        }));
        __webpack_require__.d(__webpack_exports__, "onResize", (function() {
            return onResize;
        }));
        __webpack_require__.d(__webpack_exports__, "getResourceLoadTime", (function() {
            return getResourceLoadTime;
        }));
        __webpack_require__.d(__webpack_exports__, "isShadowElement", (function() {
            return isShadowElement;
        }));
        __webpack_require__.d(__webpack_exports__, "getShadowRoot", (function() {
            return getShadowRoot;
        }));
        __webpack_require__.d(__webpack_exports__, "getShadowHost", (function() {
            return getShadowHost;
        }));
        __webpack_require__.d(__webpack_exports__, "insertShadowSlot", (function() {
            return insertShadowSlot;
        }));
        __webpack_require__.d(__webpack_exports__, "preventClickFocus", (function() {
            return preventClickFocus;
        }));
        __webpack_require__.d(__webpack_exports__, "getStackTrace", (function() {
            return getStackTrace;
        }));
        __webpack_require__.d(__webpack_exports__, "getCurrentScript", (function() {
            return getCurrentScript;
        }));
        __webpack_require__.d(__webpack_exports__, "getCurrentScriptUID", (function() {
            return getCurrentScriptUID;
        }));
        __webpack_require__.d(__webpack_exports__, "submitForm", (function() {
            return submitForm;
        }));
        __webpack_require__.d(__webpack_exports__, "experiment", (function() {
            return experiment;
        }));
        __webpack_require__.d(__webpack_exports__, "getGlobalNameSpace", (function() {
            return getGlobalNameSpace;
        }));
        __webpack_require__.d(__webpack_exports__, "getStorage", (function() {
            return getStorage;
        }));
        __webpack_require__.d(__webpack_exports__, "isElement", (function() {
            return isElement;
        }));
        __webpack_require__.d(__webpack_exports__, "getFunctionName", (function() {
            return getFunctionName;
        }));
        __webpack_require__.d(__webpack_exports__, "setFunctionName", (function() {
            return setFunctionName;
        }));
        __webpack_require__.d(__webpack_exports__, "base64encode", (function() {
            return base64encode;
        }));
        __webpack_require__.d(__webpack_exports__, "base64decode", (function() {
            return base64decode;
        }));
        __webpack_require__.d(__webpack_exports__, "uniqueID", (function() {
            return uniqueID;
        }));
        __webpack_require__.d(__webpack_exports__, "getGlobal", (function() {
            return getGlobal;
        }));
        __webpack_require__.d(__webpack_exports__, "getObjectID", (function() {
            return getObjectID;
        }));
        __webpack_require__.d(__webpack_exports__, "getEmptyObject", (function() {
            return getEmptyObject;
        }));
        __webpack_require__.d(__webpack_exports__, "memoize", (function() {
            return memoize;
        }));
        __webpack_require__.d(__webpack_exports__, "promiseIdentity", (function() {
            return promiseIdentity;
        }));
        __webpack_require__.d(__webpack_exports__, "memoizePromise", (function() {
            return memoizePromise;
        }));
        __webpack_require__.d(__webpack_exports__, "promisify", (function() {
            return promisify;
        }));
        __webpack_require__.d(__webpack_exports__, "inlineMemoize", (function() {
            return inlineMemoize;
        }));
        __webpack_require__.d(__webpack_exports__, "noop", (function() {
            return src_util_noop;
        }));
        __webpack_require__.d(__webpack_exports__, "once", (function() {
            return once;
        }));
        __webpack_require__.d(__webpack_exports__, "hashStr", (function() {
            return hashStr;
        }));
        __webpack_require__.d(__webpack_exports__, "strHashStr", (function() {
            return strHashStr;
        }));
        __webpack_require__.d(__webpack_exports__, "match", (function() {
            return match;
        }));
        __webpack_require__.d(__webpack_exports__, "awaitKey", (function() {
            return awaitKey;
        }));
        __webpack_require__.d(__webpack_exports__, "stringifyError", (function() {
            return stringifyError;
        }));
        __webpack_require__.d(__webpack_exports__, "stringifyErrorMessage", (function() {
            return stringifyErrorMessage;
        }));
        __webpack_require__.d(__webpack_exports__, "stringify", (function() {
            return stringify;
        }));
        __webpack_require__.d(__webpack_exports__, "domainMatches", (function() {
            return domainMatches;
        }));
        __webpack_require__.d(__webpack_exports__, "patchMethod", (function() {
            return patchMethod;
        }));
        __webpack_require__.d(__webpack_exports__, "extend", (function() {
            return extend;
        }));
        __webpack_require__.d(__webpack_exports__, "values", (function() {
            return util_values;
        }));
        __webpack_require__.d(__webpack_exports__, "memoizedValues", (function() {
            return memoizedValues;
        }));
        __webpack_require__.d(__webpack_exports__, "perc", (function() {
            return perc;
        }));
        __webpack_require__.d(__webpack_exports__, "min", (function() {
            return min;
        }));
        __webpack_require__.d(__webpack_exports__, "max", (function() {
            return max;
        }));
        __webpack_require__.d(__webpack_exports__, "roundUp", (function() {
            return roundUp;
        }));
        __webpack_require__.d(__webpack_exports__, "regexMap", (function() {
            return regexMap;
        }));
        __webpack_require__.d(__webpack_exports__, "svgToBase64", (function() {
            return svgToBase64;
        }));
        __webpack_require__.d(__webpack_exports__, "objFilter", (function() {
            return objFilter;
        }));
        __webpack_require__.d(__webpack_exports__, "identity", (function() {
            return identity;
        }));
        __webpack_require__.d(__webpack_exports__, "regexTokenize", (function() {
            return regexTokenize;
        }));
        __webpack_require__.d(__webpack_exports__, "promiseDebounce", (function() {
            return promiseDebounce;
        }));
        __webpack_require__.d(__webpack_exports__, "safeInterval", (function() {
            return safeInterval;
        }));
        __webpack_require__.d(__webpack_exports__, "isInteger", (function() {
            return isInteger;
        }));
        __webpack_require__.d(__webpack_exports__, "isFloat", (function() {
            return isFloat;
        }));
        __webpack_require__.d(__webpack_exports__, "serializePrimitive", (function() {
            return serializePrimitive;
        }));
        __webpack_require__.d(__webpack_exports__, "deserializePrimitive", (function() {
            return deserializePrimitive;
        }));
        __webpack_require__.d(__webpack_exports__, "dotify", (function() {
            return dotify;
        }));
        __webpack_require__.d(__webpack_exports__, "undotify", (function() {
            return undotify;
        }));
        __webpack_require__.d(__webpack_exports__, "eventEmitter", (function() {
            return eventEmitter;
        }));
        __webpack_require__.d(__webpack_exports__, "camelToDasherize", (function() {
            return camelToDasherize;
        }));
        __webpack_require__.d(__webpack_exports__, "dasherizeToCamel", (function() {
            return dasherizeToCamel;
        }));
        __webpack_require__.d(__webpack_exports__, "capitalizeFirstLetter", (function() {
            return capitalizeFirstLetter;
        }));
        __webpack_require__.d(__webpack_exports__, "get", (function() {
            return util_get;
        }));
        __webpack_require__.d(__webpack_exports__, "safeTimeout", (function() {
            return safeTimeout;
        }));
        __webpack_require__.d(__webpack_exports__, "defineLazyProp", (function() {
            return defineLazyProp;
        }));
        __webpack_require__.d(__webpack_exports__, "arrayFrom", (function() {
            return arrayFrom;
        }));
        __webpack_require__.d(__webpack_exports__, "isObject", (function() {
            return isObject;
        }));
        __webpack_require__.d(__webpack_exports__, "isObjectObject", (function() {
            return isObjectObject;
        }));
        __webpack_require__.d(__webpack_exports__, "isPlainObject", (function() {
            return isPlainObject;
        }));
        __webpack_require__.d(__webpack_exports__, "replaceObject", (function() {
            return replaceObject;
        }));
        __webpack_require__.d(__webpack_exports__, "copyProp", (function() {
            return copyProp;
        }));
        __webpack_require__.d(__webpack_exports__, "regex", (function() {
            return regex;
        }));
        __webpack_require__.d(__webpack_exports__, "regexAll", (function() {
            return regexAll;
        }));
        __webpack_require__.d(__webpack_exports__, "isDefined", (function() {
            return isDefined;
        }));
        __webpack_require__.d(__webpack_exports__, "cycle", (function() {
            return cycle;
        }));
        __webpack_require__.d(__webpack_exports__, "debounce", (function() {
            return debounce;
        }));
        __webpack_require__.d(__webpack_exports__, "isRegex", (function() {
            return util_isRegex;
        }));
        __webpack_require__.d(__webpack_exports__, "weakMapMemoize", (function() {
            return util_weakMapMemoize;
        }));
        __webpack_require__.d(__webpack_exports__, "weakMapMemoizePromise", (function() {
            return util_weakMapMemoizePromise;
        }));
        __webpack_require__.d(__webpack_exports__, "getOrSet", (function() {
            return getOrSet;
        }));
        __webpack_require__.d(__webpack_exports__, "cleanup", (function() {
            return cleanup;
        }));
        __webpack_require__.d(__webpack_exports__, "tryCatch", (function() {
            return tryCatch;
        }));
        __webpack_require__.d(__webpack_exports__, "removeFromArray", (function() {
            return removeFromArray;
        }));
        __webpack_require__.d(__webpack_exports__, "assertExists", (function() {
            return assertExists;
        }));
        __webpack_require__.d(__webpack_exports__, "unique", (function() {
            return unique;
        }));
        __webpack_require__.d(__webpack_exports__, "constHas", (function() {
            return constHas;
        }));
        __webpack_require__.d(__webpack_exports__, "dedupeErrors", (function() {
            return dedupeErrors;
        }));
        __webpack_require__.d(__webpack_exports__, "ExtendableError", (function() {
            return util_ExtendableError;
        }));
        __webpack_require__.d(__webpack_exports__, "request", (function() {
            return request;
        }));
        __webpack_require__.d(__webpack_exports__, "addHeaderBuilder", (function() {
            return addHeaderBuilder;
        }));
        __webpack_require__.d(__webpack_exports__, "TYPES", (function() {
            return types_TYPES;
        }));
        __webpack_require__.d(__webpack_exports__, "memoized", (function() {
            return memoized;
        }));
        __webpack_require__.d(__webpack_exports__, "promise", (function() {
            return decorators_promise;
        }));
        __webpack_require__.d(__webpack_exports__, "isPerc", (function() {
            return isPerc;
        }));
        __webpack_require__.d(__webpack_exports__, "isPx", (function() {
            return isPx;
        }));
        __webpack_require__.d(__webpack_exports__, "toNum", (function() {
            return toNum;
        }));
        __webpack_require__.d(__webpack_exports__, "toPx", (function() {
            return toPx;
        }));
        __webpack_require__.d(__webpack_exports__, "toCSS", (function() {
            return toCSS;
        }));
        __webpack_require__.d(__webpack_exports__, "percOf", (function() {
            return percOf;
        }));
        __webpack_require__.d(__webpack_exports__, "normalizeDimension", (function() {
            return normalizeDimension;
        }));
        __webpack_require__.d(__webpack_exports__, "wrapPromise", (function() {
            return wrapPromise;
        }));
        __webpack_require__.d(__webpack_exports__, "KEY_CODES", (function() {
            return KEY_CODES;
        }));
        __webpack_require__.d(__webpack_exports__, "ATTRIBUTES", (function() {
            return ATTRIBUTES;
        }));
        __webpack_require__.d(__webpack_exports__, "UID_HASH_LENGTH", (function() {
            return UID_HASH_LENGTH;
        }));
        __webpack_require__.d(__webpack_exports__, "sfvcScreens", (function() {
            return sfvcScreens;
        }));
        var sfvcScreens = {
            926: {
                device: "iPhone 12/13 Pro Max",
                textSizeHeights: [ 752, 748, 744, 738 ],
                textSizeHeightsNoTabs: [ 860, 858, 856, 854 ],
                zoomHeight: {
                    1.15: [ 752, 747, 744, 738 ],
                    1.25: [ 753, 748, 744, 738 ],
                    1.5: [ 752, 749, 744, 738 ],
                    1.75: [ 753, 747, 744, 739 ],
                    2: [ 752, 748, 744 ],
                    2.5: [ 753, 748 ],
                    3: [ 753, 744 ]
                },
                maybeSafari: {
                    2: [ 738 ],
                    2.5: [ 745, 738 ],
                    3: [ 747, 738 ]
                }
            },
            896: {
                device: "iPhone XS Max, iPhone 11 Pro Max, iPhone XR, iPhone 11",
                textSizeHeights: [ 721, 717, 713, 707 ],
                textSizeHeightsNoTabs: [ 829, 827, 825, 823 ],
                zoomHeight: {
                    1.15: [ 721, 716, 713, 707 ],
                    1.25: [ 721, 718, 713, 708 ],
                    1.5: [ 722, 717, 713 ],
                    1.75: [ 721, 718, 712, 707 ],
                    2: [ 722, 718, 714, 708 ],
                    2.5: [ 720, 718, 713, 708 ],
                    3: [ 720, 717, 708 ]
                },
                maybeSafari: {
                    1.5: [ 707 ],
                    3: [ 714 ]
                }
            },
            844: {
                device: "iPhone 12, iPhone 12 Pro",
                textSizeHeights: [ 670, 666, 662, 656 ],
                textSizeHeightsNoTabs: [ 778, 776, 774, 772 ],
                zoomHeight: {
                    1.15: [ 670, 666, 662 ],
                    1.25: [ 670, 666, 663, 656 ],
                    1.5: [ 671, 666, 662 ],
                    1.75: [ 670, 667, 662, 656 ],
                    2: [ 670, 666, 662 ],
                    2.5: [ 670, 663 ],
                    3: [ 669, 666, 663, 657 ]
                },
                maybeSafari: {
                    1.15: [ 656 ],
                    1.5: [ 656 ],
                    2: [ 656 ],
                    2.5: [ 665, 655 ],
                    3: [ 663 ]
                }
            },
            812: {
                device: "iPhone X, iPhone XS, iPhone 11 Pro, iPhone 12 Mini",
                textSizeHeights: [ 641, 637, 633, 627 ],
                textSizeHeightsNoTabs: [ 749, 747, 745, 743 ],
                zoomHeight: {
                    1.15: [ 641, 637, 633, 627 ],
                    1.25: [ 641, 638, 633, 628 ],
                    1.5: [ 641, 638, 633, 627 ],
                    1.75: [ 641, 637, 634 ],
                    2: [ 642, 638, 634, 628 ],
                    2.5: [ 640, 638, 633, 628 ],
                    3: [ 642, 633 ]
                },
                maybeSafari: {
                    1.75: [ 627 ],
                    3: [ 636, 627 ]
                }
            },
            736: {
                device: "iPhone 6 Plus, iPhone 6S Plus, iPhone 7 Plus, iPhone 8 Plus",
                textSizeHeights: [ 628, 624, 620, 614 ],
                textSizeHeightsNoTabs: [ 736, 734, 732, 730 ],
                zoomHeight: {
                    1.15: [ 628, 624, 620, 614 ],
                    1.25: [ 628, 624, 620, 614 ],
                    1.5: [ 629, 624, 620 ],
                    1.75: [ 628, 625, 620, 614 ],
                    2: [ 628, 624, 620 ],
                    2.5: [ 628, 625, 620, 615 ],
                    3: [ 627, 624, 615 ]
                },
                maybeSafari: {
                    1.5: [ 614 ],
                    2: [ 614 ],
                    3: [ 621 ]
                }
            },
            667: {
                device: "iPhone 6, iPhone 6S, iPhone 7, iPhone 8,  iPhone SE2",
                textSizeHeights: [ 559, 555, 551, 545 ],
                textSizeHeightsNoTabs: [ 667, 665, 663, 661 ],
                zoomHeight: {
                    1.15: [ 559, 555, 551, 545 ],
                    1.25: [ 559, 555, 551, 545 ],
                    1.5: [ 560, 555, 551 ],
                    1.75: [ 558, 555, 551 ],
                    2: [ 560, 556, 552, 546 ],
                    2.5: [ 560, 555, 550 ],
                    3: [ 558, 555, 546 ]
                },
                maybeSafari: {
                    1.5: [ 545 ],
                    1.75: [ 544 ],
                    2.5: [ 545 ],
                    3: [ 552 ]
                }
            }
        };
        function getUserAgent() {
            return window.navigator.mockUserAgent || window.navigator.userAgent;
        }
        var TABLET_PATTERN = /ip(a|ro)d|silk|xoom|playbook|tablet|kindle|Nexus 7|GT-P10|SC-01C|SHW-M180S|SM-T320|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC( Flyer|_Flyer)|Sprint ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos S7|Dell Streak 7|Advent Vega|A101IT|A70BHT|MID7015|Next2|nook|FOLIO|MB511.*RUTEM|Mac OS.*Silk/i;
        function isDevice(userAgent) {
            void 0 === userAgent && (userAgent = getUserAgent());
            return !!userAgent.match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i);
        }
        function isTablet(userAgent) {
            void 0 === userAgent && (userAgent = getUserAgent());
            return TABLET_PATTERN.test(userAgent);
        }
        function isWebView() {
            var userAgent = getUserAgent();
            return /(iPhone|iPod|iPad|Macintosh).*AppleWebKit(?!.*Safari)|.*WKWebView/i.test(userAgent) || /\bwv\b/.test(userAgent) || /Android.*Version\/(\d)\.(\d)/i.test(userAgent);
        }
        function isStandAlone() {
            return !0 === window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches;
        }
        function isFacebookWebView(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /FBAN/.test(ua) || /FBAV/.test(ua);
        }
        function isFirefox(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /Firefox/i.test(ua);
        }
        function isFirefoxIOS(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /FxiOS/i.test(ua);
        }
        function isEdgeIOS(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /EdgiOS/i.test(ua);
        }
        function isOperaMini(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /Opera Mini/i.test(ua);
        }
        function isAndroid(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /Android/.test(ua);
        }
        function isIos(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /iPhone|iPod|iPad/.test(ua);
        }
        function isIOS14(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /iPhone.*OS.*(1)?(?:(1)[0-4]| [0-9])_/.test(ua);
        }
        function isGoogleSearchApp(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /\bGSA\b/.test(ua);
        }
        function isQQBrowser(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /QQBrowser/.test(ua);
        }
        function isIosWebview(ua) {
            void 0 === ua && (ua = getUserAgent());
            return !!isIos(ua) && (!!isGoogleSearchApp(ua) || /.+AppleWebKit(?!.*Safari)|.*WKWebView/.test(ua));
        }
        function isSFVC(ua) {
            void 0 === ua && (ua = getUserAgent());
            if (isIos(ua)) {
                var height = window.innerHeight;
                var scale = Math.round(window.screen.width / window.innerWidth * 100) / 100;
                var computedHeight = Math.round(height * scale);
                var device = null;
                if (isIOS14(ua)) device = sfvcScreens[window.outerHeight]; else {
                    if (1 !== scale) return !0;
                    device = sfvcScreens[window.outerHeight];
                }
                return !device || (scale > 1 && device.zoomHeight && device.zoomHeight[scale] ? -1 !== device.zoomHeight[scale].indexOf(computedHeight) : -1 !== device.textSizeHeights.indexOf(computedHeight) || -1 !== device.textSizeHeightsNoTabs.indexOf(computedHeight));
            }
            return !1;
        }
        function isSFVCorSafari(ua) {
            void 0 === ua && (ua = getUserAgent());
            if (isIos(ua)) {
                var sfvc = isSFVC(ua);
                var device = isIOS14(ua) ? sfvcScreens[window.outerHeight] : null;
                if (!device) return !1;
                var height = window.innerHeight;
                var scale = Math.round(window.screen.width / window.innerWidth * 100) / 100;
                var computedHeight = Math.round(height * scale);
                var possibleSafariSizes = device.maybeSafari;
                var maybeSafari = !1;
                scale > 1 && possibleSafariSizes[scale] && -1 !== possibleSafariSizes[scale].indexOf(computedHeight) && (maybeSafari = !0);
                return sfvc || maybeSafari;
            }
            return !1;
        }
        function isAndroidWebview(ua) {
            void 0 === ua && (ua = getUserAgent());
            return !!isAndroid(ua) && /Version\/[\d.]+/.test(ua) && !isOperaMini(ua);
        }
        function device_isIE() {
            return !!window.document.documentMode || Boolean(window.navigator && window.navigator.userAgent && /Edge|MSIE|rv:11/i.test(window.navigator.userAgent));
        }
        function isIECompHeader() {
            var mHttp = window.document.querySelector('meta[http-equiv="X-UA-Compatible"]');
            var mContent = window.document.querySelector('meta[content="IE=edge"]');
            return !(!mHttp || !mContent);
        }
        function isElectron() {
            return !("undefined" == typeof process || !process.versions || !process.versions.electron);
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
        function isMacOsCna() {
            var userAgent = getUserAgent();
            return /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent);
        }
        function supportsPopups(ua) {
            void 0 === ua && (ua = getUserAgent());
            return !(isIosWebview(ua) || isAndroidWebview(ua) || isOperaMini(ua) || isFirefoxIOS(ua) || isEdgeIOS(ua) || isFacebookWebView(ua) || isQQBrowser(ua) || isElectron() || isMacOsCna() || isStandAlone());
        }
        function isChrome(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /Chrome|Chromium|CriOS/.test(ua) && !/SamsungBrowser|Silk|EdgA/.test(ua);
        }
        function isSafari(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /Safari/.test(ua) && !isChrome(ua) && !/Silk|FxiOS|EdgiOS/.test(ua);
        }
        function isApplePaySupported() {
            try {
                if (window.ApplePaySession && window.ApplePaySession.supportsVersion(3) && window.ApplePaySession.canMakePayments()) return !0;
            } catch (e) {
                return !1;
            }
            return !1;
        }
        function isCrossSiteTrackingEnabled(expectedCookieKey) {
            return -1 === window.document.cookie.indexOf(expectedCookieKey);
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
        function isElement(element) {
            var passed = !1;
            try {
                (element instanceof window.Element || null !== element && "object" == typeof element && 1 === element.nodeType && "object" == typeof element.style && "object" == typeof element.ownerDocument) && (passed = !0);
            } catch (_) {}
            return passed;
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
        function base64encode(str) {
            if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            }))).replace(/[=]/g, "");
            if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64").replace(/[=]/g, "");
            throw new Error("Can not find window.btoa or Buffer");
        }
        function base64decode(str) {
            if ("function" == typeof atob) return decodeURIComponent([].map.call(atob(str), (function(c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })).join(""));
            if ("undefined" != typeof Buffer) return Buffer.from(str, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "uid_" + "xxxxxxxxxx".replace(/./g, (function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            })) + "_" + base64encode((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        }
        function getGlobal() {
            if ("undefined" != typeof window) return window;
            if ("undefined" != typeof window) return window;
            if ("undefined" != typeof window) return window;
            throw new Error("No global found");
        }
        var objectIDs;
        function getObjectID(obj) {
            objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap;
            if (null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
            var uid = objectIDs.get(obj);
            if (!uid) {
                uid = typeof obj + ":" + uniqueID();
                objectIDs.set(obj, uid);
            }
            return uid;
        }
        function serializeArgs(args) {
            try {
                return JSON.stringify([].slice.call(args), (function(subkey, val) {
                    return "function" == typeof val ? "memoize[" + getObjectID(val) + "]" : isElement(val) ? {} : val;
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
        function promiseIdentity(item) {
            return promise_ZalgoPromise.resolve(item);
        }
        function memoizePromise(method) {
            var cache = {};
            function memoizedPromiseFunction() {
                var _arguments = arguments, _this = this;
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                var key = serializeArgs(args);
                if (cache.hasOwnProperty(key)) return cache[key];
                cache[key] = promise_ZalgoPromise.try((function() {
                    return method.apply(_this, _arguments);
                })).finally((function() {
                    delete cache[key];
                }));
                return cache[key];
            }
            memoizedPromiseFunction.reset = function() {
                cache = {};
            };
            return setFunctionName(memoizedPromiseFunction, getFunctionName(method) + "::promiseMemoized");
        }
        function promisify(method, options) {
            void 0 === options && (options = {});
            function promisifiedFunction() {
                return promise_ZalgoPromise.try(method, this, arguments);
            }
            options.name && (promisifiedFunction.displayName = options.name + ":promisified");
            return setFunctionName(promisifiedFunction, getFunctionName(method) + "::promisified");
        }
        function inlineMemoize(method, logic, args) {
            void 0 === args && (args = []);
            var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {};
            var key = serializeArgs(args);
            return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
        }
        function src_util_noop() {}
        function once(method) {
            var called = !1;
            return setFunctionName((function() {
                if (!called) {
                    called = !0;
                    return method.apply(this, arguments);
                }
            }), getFunctionName(method) + "::once");
        }
        function hashStr(str) {
            var hash = 0;
            for (var i = 0; i < str.length; i++) hash += str[i].charCodeAt(0) * Math.pow(i % 10 + 1, 5);
            return Math.floor(Math.pow(Math.sqrt(hash), 5));
        }
        function strHashStr(str) {
            var hash = "";
            for (var i = 0; i < str.length; i++) {
                var total = str[i].charCodeAt(0) * i;
                str[i + 1] && (total += str[i + 1].charCodeAt(0) * (i - 1));
                hash += String.fromCharCode(97 + Math.abs(total) % 26);
            }
            return hash;
        }
        function match(str, pattern) {
            var regmatch = str.match(pattern);
            if (regmatch) return regmatch[1];
        }
        function awaitKey(obj, key) {
            return new promise_ZalgoPromise((function(resolve) {
                var value = obj[key];
                if (value) return resolve(value);
                delete obj[key];
                Object.defineProperty(obj, key, {
                    configurable: !0,
                    set: function(item) {
                        (value = item) && resolve(value);
                    },
                    get: function() {
                        return value;
                    }
                });
            }));
        }
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
        function stringifyErrorMessage(err) {
            var defaultMessage = "<unknown error: " + {}.toString.call(err) + ">";
            return err ? err instanceof Error ? err.message || defaultMessage : "string" == typeof err.message && err.message || defaultMessage : defaultMessage;
        }
        function stringify(item) {
            return "string" == typeof item ? item : item && item.toString && "function" == typeof item.toString ? item.toString() : {}.toString.call(item);
        }
        function domainMatches(hostname, domain) {
            var index = (hostname = hostname.split("://")[1]).indexOf(domain);
            return -1 !== index && hostname.slice(index) === domain;
        }
        function patchMethod(obj, name, handler) {
            var original = obj[name];
            obj[name] = function() {
                var _arguments2 = arguments, _this2 = this;
                return handler({
                    context: this,
                    args: [].slice.call(arguments),
                    original: original,
                    callOriginal: function() {
                        return original.apply(_this2, _arguments2);
                    }
                });
            };
        }
        function extend(obj, source) {
            if (!source) return obj;
            if (Object.assign) return Object.assign(obj, source);
            for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
            return obj;
        }
        function util_values(obj) {
            if (Object.values) return Object.values(obj);
            var result = [];
            for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
            return result;
        }
        var memoizedValues = memoize(util_values);
        function perc(pixels, percentage) {
            return Math.round(pixels * percentage / 100);
        }
        function min() {
            return Math.min.apply(Math, arguments);
        }
        function max() {
            return Math.max.apply(Math, arguments);
        }
        function roundUp(num, nearest) {
            var remainder = num % nearest;
            return remainder ? num - remainder + nearest : num;
        }
        function regexMap(str, regexp, handler) {
            var results = [];
            str.replace(regexp, (function(item) {
                results.push(handler ? handler.apply(null, arguments) : item);
            }));
            return results;
        }
        function svgToBase64(svg) {
            return "data:image/svg+xml;base64," + base64encode(svg);
        }
        function objFilter(obj, filter) {
            void 0 === filter && (filter = Boolean);
            var result = {};
            for (var key in obj) obj.hasOwnProperty(key) && filter(obj[key], key) && (result[key] = obj[key]);
            return result;
        }
        function identity(item) {
            return item;
        }
        function regexTokenize(text, regexp) {
            var result = [];
            text.replace(regexp, (function(token) {
                result.push(token);
                return "";
            }));
            return result;
        }
        function promiseDebounce(method, delay) {
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
        }
        function safeInterval(method, time) {
            var timeout;
            !function loop() {
                timeout = setTimeout((function() {
                    method();
                    loop();
                }), time);
            }();
            return {
                cancel: function() {
                    clearTimeout(timeout);
                }
            };
        }
        function isInteger(str) {
            return Boolean(str.match(/^[0-9]+$/));
        }
        function isFloat(str) {
            return Boolean(str.match(/^[0-9]+\.[0-9]+$/));
        }
        function serializePrimitive(value) {
            return value.toString();
        }
        function deserializePrimitive(value) {
            return "true" === value || "false" !== value && (isInteger(value) ? parseInt(value, 10) : isFloat(value) ? parseFloat(value) : value);
        }
        function dotify(obj, prefix, newobj) {
            void 0 === prefix && (prefix = "");
            void 0 === newobj && (newobj = {});
            prefix = prefix ? prefix + "." : prefix;
            for (var key in obj) obj.hasOwnProperty(key) && null != obj[key] && "function" != typeof obj[key] && (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every((function(val) {
                return "object" != typeof val;
            })) ? newobj["" + prefix + key + "[]"] = obj[key].join(",") : obj[key] && "object" == typeof obj[key] ? newobj = dotify(obj[key], "" + prefix + key, newobj) : newobj["" + prefix + key] = serializePrimitive(obj[key]));
            return newobj;
        }
        function undotify(obj) {
            var result = {};
            for (var key in obj) if (obj.hasOwnProperty(key) && "string" == typeof obj[key]) {
                var value = obj[key];
                if (key.match(/^.+\[\]$/)) {
                    key = key.slice(0, -2);
                    value = value.split(",").map(deserializePrimitive);
                } else value = deserializePrimitive(value);
                var keyResult = result;
                var parts = key.split(".");
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    var isLast = i + 1 === parts.length;
                    var isIndex = !isLast && isInteger(parts[i + 1]);
                    if ("constructor" === part || "prototype" === part || "__proto__" === part) throw new Error("Disallowed key: " + part);
                    isLast ? keyResult[part] = value : keyResult = keyResult[part] = keyResult[part] || (isIndex ? [] : {});
                }
            }
            return result;
        }
        function eventEmitter() {
            var triggered = {};
            var handlers = {};
            var emitter = {
                on: function(eventName, handler) {
                    var handlerList = handlers[eventName] = handlers[eventName] || [];
                    handlerList.push(handler);
                    var cancelled = !1;
                    return {
                        cancel: function() {
                            if (!cancelled) {
                                cancelled = !0;
                                handlerList.splice(handlerList.indexOf(handler), 1);
                            }
                        }
                    };
                },
                once: function(eventName, handler) {
                    var listener = emitter.on(eventName, (function() {
                        listener.cancel();
                        handler();
                    }));
                    return listener;
                },
                trigger: function(eventName) {
                    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
                    var handlerList = handlers[eventName];
                    var promises = [];
                    if (handlerList) {
                        var _loop = function(_i2) {
                            var handler = handlerList[_i2];
                            promises.push(promise_ZalgoPromise.try((function() {
                                return handler.apply(void 0, args);
                            })));
                        };
                        for (var _i2 = 0; _i2 < handlerList.length; _i2++) _loop(_i2);
                    }
                    return promise_ZalgoPromise.all(promises).then(src_util_noop);
                },
                triggerOnce: function(eventName) {
                    if (triggered[eventName]) return promise_ZalgoPromise.resolve();
                    triggered[eventName] = !0;
                    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) args[_key4 - 1] = arguments[_key4];
                    return emitter.trigger.apply(emitter, [ eventName ].concat(args));
                },
                reset: function() {
                    handlers = {};
                }
            };
            return emitter;
        }
        function camelToDasherize(string) {
            return string.replace(/([A-Z])/g, (function(g) {
                return "-" + g.toLowerCase();
            }));
        }
        function dasherizeToCamel(string) {
            return string.replace(/-([a-z])/g, (function(g) {
                return g[1].toUpperCase();
            }));
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        function util_get(item, path, def) {
            if (!path) return def;
            var pathParts = path.split(".");
            for (var i = 0; i < pathParts.length; i++) {
                if ("object" != typeof item || null === item) return def;
                item = item[pathParts[i]];
            }
            return void 0 === item ? def : item;
        }
        function safeTimeout(method, time) {
            var interval = safeInterval((function() {
                if ((time -= 100) <= 0) {
                    interval.cancel();
                    method();
                }
            }), 100);
        }
        function defineLazyProp(obj, key, getter) {
            if (Array.isArray(obj)) {
                if ("number" != typeof key) throw new TypeError("Array key must be number");
            } else if ("object" == typeof obj && null !== obj && "string" != typeof key) throw new TypeError("Object key must be string");
            Object.defineProperty(obj, key, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    delete obj[key];
                    var value = getter();
                    obj[key] = value;
                    return value;
                },
                set: function(value) {
                    delete obj[key];
                    obj[key] = value;
                }
            });
        }
        function arrayFrom(item) {
            return [].slice.call(item);
        }
        function isObject(item) {
            return "object" == typeof item && null !== item;
        }
        function isObjectObject(obj) {
            return isObject(obj) && "[object Object]" === {}.toString.call(obj);
        }
        function isPlainObject(obj) {
            if (!isObjectObject(obj)) return !1;
            var constructor = obj.constructor;
            if ("function" != typeof constructor) return !1;
            var prototype = constructor.prototype;
            return !!isObjectObject(prototype) && !!prototype.hasOwnProperty("isPrototypeOf");
        }
        function replaceObject(item, replacer, fullKey) {
            void 0 === fullKey && (fullKey = "");
            if (Array.isArray(item)) {
                var length = item.length;
                var result = [];
                var _loop2 = function(i) {
                    defineLazyProp(result, i, (function() {
                        var itemKey = fullKey ? fullKey + "." + i : "" + i;
                        var child = replacer(item[i], i, itemKey);
                        (isPlainObject(child) || Array.isArray(child)) && (child = replaceObject(child, replacer, itemKey));
                        return child;
                    }));
                };
                for (var i = 0; i < length; i++) _loop2(i);
                return result;
            }
            if (isPlainObject(item)) {
                var _result = {};
                var _loop3 = function(key) {
                    if (!item.hasOwnProperty(key)) return "continue";
                    defineLazyProp(_result, key, (function() {
                        var itemKey = fullKey ? fullKey + "." + key : "" + key;
                        var child = replacer(item[key], key, itemKey);
                        (isPlainObject(child) || Array.isArray(child)) && (child = replaceObject(child, replacer, itemKey));
                        return child;
                    }));
                };
                for (var key in item) _loop3(key);
                return _result;
            }
            throw new Error("Pass an object or array");
        }
        function copyProp(source, target, name, def) {
            if (source.hasOwnProperty(name)) {
                var descriptor = Object.getOwnPropertyDescriptor(source, name);
                Object.defineProperty(target, name, descriptor);
            } else target[name] = def;
        }
        function regex(pattern, string, start) {
            void 0 === start && (start = 0);
            "string" == typeof pattern && (pattern = new RegExp(pattern));
            var result = string.slice(start).match(pattern);
            if (result) {
                var index = result.index;
                var regmatch = result[0];
                return {
                    text: regmatch,
                    groups: result.slice(1),
                    start: start + index,
                    end: start + index + regmatch.length,
                    length: regmatch.length,
                    replace: function(text) {
                        return regmatch ? "" + regmatch.slice(0, start + index) + text + regmatch.slice(index + regmatch.length) : "";
                    }
                };
            }
        }
        function regexAll(pattern, string) {
            var matches = [];
            var start = 0;
            for (;;) {
                var regmatch = regex(pattern, string, start);
                if (!regmatch) break;
                matches.push(regmatch);
                start = match.end;
            }
            return matches;
        }
        function isDefined(value) {
            return null != value;
        }
        function cycle(method) {
            return promise_ZalgoPromise.try(method).then((function() {
                return cycle(method);
            }));
        }
        function debounce(method, time) {
            void 0 === time && (time = 100);
            var timeout;
            return setFunctionName((function() {
                var _arguments3 = arguments, _this3 = this;
                clearTimeout(timeout);
                timeout = setTimeout((function() {
                    return method.apply(_this3, _arguments3);
                }), time);
            }), getFunctionName(method) + "::debounced");
        }
        function util_isRegex(item) {
            return "[object RegExp]" === {}.toString.call(item);
        }
        var util_weakMapMemoize = function(method) {
            var weakmap = new weakmap_CrossDomainSafeWeakMap;
            return function(arg) {
                var _this4 = this;
                return weakmap.getOrSet(arg, (function() {
                    return method.call(_this4, arg);
                }));
            };
        };
        var util_weakMapMemoizePromise = function(method) {
            var weakmap = new weakmap_CrossDomainSafeWeakMap;
            return function(arg) {
                var _this5 = this;
                return weakmap.getOrSet(arg, (function() {
                    return method.call(_this5, arg).finally((function() {
                        weakmap.delete(arg);
                    }));
                }));
            };
        };
        function getOrSet(obj, key, getter) {
            if (obj.hasOwnProperty(key)) return obj[key];
            var val = getter();
            obj[key] = val;
            return val;
        }
        function cleanup(obj) {
            var tasks = [];
            var cleaned = !1;
            var cleanErr;
            var cleaner = {
                set: function(name, item) {
                    if (!cleaned) {
                        obj[name] = item;
                        cleaner.register((function() {
                            delete obj[name];
                        }));
                    }
                    return item;
                },
                register: function(method) {
                    var task = once((function() {
                        return method(cleanErr);
                    }));
                    cleaned ? method(cleanErr) : tasks.push(task);
                    return {
                        cancel: function() {
                            var index = tasks.indexOf(task);
                            -1 !== index && tasks.splice(index, 1);
                        }
                    };
                },
                all: function(err) {
                    cleanErr = err;
                    var results = [];
                    cleaned = !0;
                    for (;tasks.length; ) {
                        var task = tasks.shift();
                        results.push(task());
                    }
                    return promise_ZalgoPromise.all(results).then(src_util_noop);
                }
            };
            return cleaner;
        }
        function tryCatch(fn) {
            var result;
            var error;
            try {
                result = fn();
            } catch (err) {
                error = err;
            }
            return {
                result: result,
                error: error
            };
        }
        function removeFromArray(arr, item) {
            var index = arr.indexOf(item);
            -1 !== index && arr.splice(index, 1);
        }
        function assertExists(name, thing) {
            if (null == thing) throw new Error("Expected " + name + " to be present");
            return thing;
        }
        function unique(arr) {
            var result = {};
            for (var _i4 = 0; _i4 < arr.length; _i4++) result[arr[_i4]] = !0;
            return Object.keys(result);
        }
        var constHas = function(constant, value) {
            return -1 !== memoizedValues(constant).indexOf(value);
        };
        function dedupeErrors(handler) {
            var seenErrors = [];
            var seenStringifiedErrors = {};
            return function(err) {
                if (-1 === seenErrors.indexOf(err)) {
                    seenErrors.push(err);
                    var stringifiedError = stringifyError(err);
                    if (!seenStringifiedErrors[stringifiedError]) {
                        seenStringifiedErrors[stringifiedError] = !0;
                        return handler(err);
                    }
                }
            };
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
        var KEY_CODES = {
            ENTER: 13,
            SPACE: 32
        };
        var ATTRIBUTES = {
            UID: "data-uid"
        };
        var UID_HASH_LENGTH = 30;
        function getBody() {
            var body = document.body;
            if (!body) throw new Error("Body element not found");
            return body;
        }
        function isDocumentReady() {
            return Boolean(document.body) && "complete" === document.readyState;
        }
        function isDocumentInteractive() {
            return Boolean(document.body) && "interactive" === document.readyState;
        }
        function urlEncode(str) {
            return encodeURIComponent(str);
        }
        function waitForWindowReady() {
            return inlineMemoize(waitForWindowReady, (function() {
                return new promise_ZalgoPromise((function(resolve) {
                    isDocumentReady() && resolve();
                    window.addEventListener("load", (function() {
                        return resolve();
                    }));
                }));
            }));
        }
        var waitForDocumentReady = memoize((function() {
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
        function waitForDocumentBody() {
            return promise_ZalgoPromise.try((function() {
                return document.body ? document.body : waitForDocumentReady().then((function() {
                    if (document.body) return document.body;
                    throw new Error("Document ready but document.body not present");
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
        function getQueryParam(name) {
            return parseQuery(window.location.search.slice(1))[name];
        }
        function urlWillRedirectPage(url) {
            return -1 === url.indexOf("#") || 0 !== url.indexOf("#") && url.split("#")[0] !== window.location.href.split("#")[0];
        }
        function formatQuery(obj) {
            void 0 === obj && (obj = {});
            return Object.keys(obj).filter((function(key) {
                return "string" == typeof obj[key] || "boolean" == typeof obj[key];
            })).map((function(key) {
                var val = obj[key];
                if ("string" != typeof val && "boolean" != typeof val) throw new TypeError("Invalid type for query");
                return urlEncode(key) + "=" + urlEncode(val.toString());
            })).join("&");
        }
        function extendQuery(originalQuery, props) {
            void 0 === props && (props = {});
            return props && Object.keys(props).length ? formatQuery(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
        }
        function extendUrl(url, options) {
            var query = options.query || {};
            var hash = options.hash || {};
            var originalUrl;
            var originalHash;
            var _url$split = url.split("#");
            originalHash = _url$split[1];
            var _originalUrl$split = (originalUrl = _url$split[0]).split("?");
            originalUrl = _originalUrl$split[0];
            var queryString = extendQuery(_originalUrl$split[1], query);
            var hashString = extendQuery(originalHash, hash);
            queryString && (originalUrl = originalUrl + "?" + queryString);
            hashString && (originalUrl = originalUrl + "#" + hashString);
            return originalUrl;
        }
        function redirect(url, win) {
            void 0 === win && (win = window);
            return new promise_ZalgoPromise((function(resolve) {
                win.location = url;
                urlWillRedirectPage(url) || resolve();
            }));
        }
        function hasMetaViewPort() {
            var meta = document.querySelector("meta[name=viewport]");
            return !(isDevice() && window.screen.width < 660 && !meta);
        }
        function isElementVisible(el) {
            return Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        }
        function getPerformance() {
            return inlineMemoize(getPerformance, (function() {
                var performance = window.performance;
                if (performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0) return performance;
            }));
        }
        function enablePerformance() {
            return Boolean(getPerformance());
        }
        function getPageRenderTime() {
            return waitForDocumentReady().then((function() {
                var performance = getPerformance();
                if (performance) {
                    var timing = performance.timing;
                    return timing.connectEnd && timing.domInteractive ? timing.domInteractive - timing.connectEnd : void 0;
                }
            }));
        }
        function htmlEncode(html) {
            void 0 === html && (html = "");
            return html.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
        }
        function dom_isBrowser() {
            return "undefined" != typeof window && void 0 !== window.location;
        }
        function querySelectorAll(selector, doc) {
            void 0 === doc && (doc = window.document);
            return [].slice.call(doc.querySelectorAll(selector));
        }
        function onClick(element, handler) {
            element.addEventListener("touchstart", src_util_noop);
            element.addEventListener("click", handler);
            element.addEventListener("keypress", (function(event) {
                if (event.keyCode === KEY_CODES.ENTER || event.keyCode === KEY_CODES.SPACE) return handler(event);
            }));
        }
        function getScript(_ref) {
            var _ref$host = _ref.host, host = void 0 === _ref$host ? window.location.host : _ref$host, path = _ref.path, _ref$reverse = _ref.reverse, reverse = void 0 !== _ref$reverse && _ref$reverse;
            return inlineMemoize(getScript, (function() {
                var url = "" + host + path;
                var scripts = [].slice.call(document.getElementsByTagName("script"));
                reverse && scripts.reverse();
                for (var _i4 = 0; _i4 < scripts.length; _i4++) {
                    var script = scripts[_i4];
                    if (script.src && script.src.replace(/^https?:\/\//, "").split("?")[0] === url) return script;
                }
            }), [ path ]);
        }
        function isLocalStorageEnabled() {
            return inlineMemoize(isLocalStorageEnabled, (function() {
                try {
                    if ("undefined" == typeof window) return !1;
                    if (window.localStorage) {
                        var value = Math.random().toString();
                        window.localStorage.setItem("__test__localStorage__", value);
                        var result = window.localStorage.getItem("__test__localStorage__");
                        window.localStorage.removeItem("__test__localStorage__");
                        if (value === result) return !0;
                    }
                } catch (err) {}
                return !1;
            }));
        }
        function getBrowserLocales() {
            var nav = window.navigator;
            var locales = nav.languages ? [].concat(nav.languages) : [];
            nav.language && locales.push(nav.language);
            nav.userLanguage && locales.push(nav.userLanguage);
            return locales.map((function(locale) {
                if (locale && locale.match(/^[a-z]{2}[-_][A-Z]{2}$/)) {
                    var _locale$split = locale.split(/[-_]/);
                    return {
                        country: _locale$split[1],
                        lang: _locale$split[0]
                    };
                }
                return locale && locale.match(/^[a-z]{2}$/) ? {
                    lang: locale
                } : null;
            })).filter(Boolean);
        }
        function appendChild(container, child) {
            container.appendChild(child);
        }
        function getElementSafe(id, doc) {
            void 0 === doc && (doc = document);
            return isElement(id) ? id : "string" == typeof id ? doc.querySelector(id) : void 0;
        }
        function getElement(id, doc) {
            void 0 === doc && (doc = document);
            var element = getElementSafe(id, doc);
            if (element) return element;
            throw new Error("Can not find element: " + stringify(id));
        }
        function elementReady(id) {
            return new promise_ZalgoPromise((function(resolve, reject) {
                var name = stringify(id);
                var el = getElementSafe(id);
                if (el) return resolve(el);
                if (isDocumentReady()) return reject(new Error("Document is ready and element " + name + " does not exist"));
                var interval = setInterval((function() {
                    if (el = getElementSafe(id)) {
                        resolve(el);
                        clearInterval(interval);
                    } else if (isDocumentReady()) {
                        clearInterval(interval);
                        return reject(new Error("Document is ready and element " + name + " does not exist"));
                    }
                }), 10);
            }));
        }
        var dom_PopupOpenError = function(_ExtendableError) {
            _inheritsLoose(PopupOpenError, _ExtendableError);
            function PopupOpenError() {
                return _ExtendableError.apply(this, arguments) || this;
            }
            return PopupOpenError;
        }(util_ExtendableError);
        function popup(url, options) {
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
                if (null != options[key]) return key + "=" + stringify(options[key]);
            })).filter(Boolean).join(",");
            var win;
            try {
                win = window.open(url, name, params);
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
        }
        function writeToWindow(win, html) {
            try {
                win.document.open();
                win.document.write(html);
                win.document.close();
            } catch (err) {
                try {
                    win.location = "javascript: document.open(); document.write(" + JSON.stringify(html) + "); document.close();";
                } catch (err2) {}
            }
        }
        function writeElementToWindow(win, el) {
            var tag = el.tagName.toLowerCase();
            if ("html" !== tag) throw new Error("Expected element to be html, got " + tag);
            var documentElement = win.document.documentElement;
            for (var _i6 = 0, _arrayFrom2 = arrayFrom(documentElement.children); _i6 < _arrayFrom2.length; _i6++) documentElement.removeChild(_arrayFrom2[_i6]);
            for (var _i8 = 0, _arrayFrom4 = arrayFrom(el.children); _i8 < _arrayFrom4.length; _i8++) documentElement.appendChild(_arrayFrom4[_i8]);
        }
        function setStyle(el, styleText, doc) {
            void 0 === doc && (doc = window.document);
            el.styleSheet ? el.styleSheet.cssText = styleText : el.appendChild(doc.createTextNode(styleText));
        }
        var awaitFrameLoadPromises;
        function awaitFrameLoad(frame) {
            if ((awaitFrameLoadPromises = awaitFrameLoadPromises || new weakmap_CrossDomainSafeWeakMap).has(frame)) {
                var _promise = awaitFrameLoadPromises.get(frame);
                if (_promise) return _promise;
            }
            var promise = new promise_ZalgoPromise((function(resolve, reject) {
                frame.addEventListener("load", (function() {
                    !function(frame) {
                        !function() {
                            for (var i = 0; i < iframeWindows.length; i++) {
                                var closed = !1;
                                try {
                                    closed = iframeWindows[i].closed;
                                } catch (err) {}
                                if (closed) {
                                    iframeFrames.splice(i, 1);
                                    iframeWindows.splice(i, 1);
                                }
                            }
                        }();
                        if (frame && frame.contentWindow) try {
                            iframeWindows.push(frame.contentWindow);
                            iframeFrames.push(frame);
                        } catch (err) {}
                    }(frame);
                    resolve(frame);
                }));
                frame.addEventListener("error", (function(err) {
                    frame.contentWindow ? resolve(frame) : reject(err);
                }));
            }));
            awaitFrameLoadPromises.set(frame, promise);
            return promise;
        }
        function awaitFrameWindow(frame) {
            return awaitFrameLoad(frame).then((function(loadedFrame) {
                if (!loadedFrame.contentWindow) throw new Error("Could not find window in iframe");
                return loadedFrame.contentWindow;
            }));
        }
        function createElement(tag, options, container) {
            void 0 === tag && (tag = "div");
            void 0 === options && (options = {});
            tag = tag.toLowerCase();
            var element = document.createElement(tag);
            options.style && extend(element.style, options.style);
            options.class && (element.className = options.class.join(" "));
            options.id && element.setAttribute("id", options.id);
            if (options.attributes) for (var _i10 = 0, _Object$keys2 = Object.keys(options.attributes); _i10 < _Object$keys2.length; _i10++) {
                var key = _Object$keys2[_i10];
                element.setAttribute(key, options.attributes[key]);
            }
            options.styleSheet && setStyle(element, options.styleSheet);
            container && appendChild(container, element);
            if (options.html) if ("iframe" === tag) {
                if (!container || !element.contentWindow) throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
                writeToWindow(element.contentWindow, options.html);
            } else element.innerHTML = options.html;
            return element;
        }
        function iframe(options, container) {
            void 0 === options && (options = {});
            var style = options.style || {};
            var frame = createElement("iframe", {
                attributes: _extends({
                    allowTransparency: "true"
                }, options.attributes || {}),
                style: _extends({
                    backgroundColor: "transparent",
                    border: "none"
                }, style),
                html: options.html,
                class: options.class
            });
            var isIE = window.navigator.userAgent.match(/MSIE|Edge/i);
            frame.hasAttribute("id") || frame.setAttribute("id", uniqueID());
            awaitFrameLoad(frame);
            container && getElement(container).appendChild(frame);
            (options.url || isIE) && frame.setAttribute("src", options.url || "about:blank");
            return frame;
        }
        function addEventListener(obj, event, handler) {
            obj.addEventListener(event, handler);
            return {
                cancel: function() {
                    obj.removeEventListener(event, handler);
                }
            };
        }
        function bindEvents(element, eventNames, handler) {
            handler = once(handler);
            for (var _i12 = 0; _i12 < eventNames.length; _i12++) element.addEventListener(eventNames[_i12], handler);
            return {
                cancel: once((function() {
                    for (var _i14 = 0; _i14 < eventNames.length; _i14++) element.removeEventListener(eventNames[_i14], handler);
                }))
            };
        }
        var VENDOR_PREFIXES = [ "webkit", "moz", "ms", "o" ];
        function setVendorCSS(element, name, value) {
            element.style[name] = value;
            var capitalizedName = capitalizeFirstLetter(name);
            for (var _i16 = 0; _i16 < VENDOR_PREFIXES.length; _i16++) element.style["" + VENDOR_PREFIXES[_i16] + capitalizedName] = value;
        }
        var ANIMATION_START_EVENTS = [ "animationstart", "webkitAnimationStart", "oAnimationStart", "MSAnimationStart" ];
        var ANIMATION_END_EVENTS = [ "animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd" ];
        function animate(element, name, clean, timeout) {
            void 0 === timeout && (timeout = 1e3);
            return new promise_ZalgoPromise((function(resolve, reject) {
                var el = getElement(element);
                if (!el) return resolve();
                var hasStarted = !1;
                var startTimeout;
                var endTimeout;
                var startEvent;
                var endEvent;
                function cleanUp() {
                    clearTimeout(startTimeout);
                    clearTimeout(endTimeout);
                    startEvent.cancel();
                    endEvent.cancel();
                }
                startEvent = bindEvents(el, ANIMATION_START_EVENTS, (function(event) {
                    if (event.target === el && event.animationName === name) {
                        clearTimeout(startTimeout);
                        event.stopPropagation();
                        startEvent.cancel();
                        hasStarted = !0;
                        endTimeout = setTimeout((function() {
                            cleanUp();
                            resolve();
                        }), timeout);
                    }
                }));
                endEvent = bindEvents(el, ANIMATION_END_EVENTS, (function(event) {
                    if (event.target === el && event.animationName === name) {
                        cleanUp();
                        return "string" == typeof event.animationName && event.animationName !== name ? reject("Expected animation name to be " + name + ", found " + event.animationName) : resolve();
                    }
                }));
                setVendorCSS(el, "animationName", name);
                startTimeout = setTimeout((function() {
                    if (!hasStarted) {
                        cleanUp();
                        return resolve();
                    }
                }), 200);
                clean && clean(cleanUp);
            }));
        }
        function makeElementVisible(element) {
            element.style.setProperty("visibility", "");
        }
        function makeElementInvisible(element) {
            element.style.setProperty("visibility", "hidden", "important");
        }
        function showElement(element) {
            element.style.setProperty("display", "");
        }
        function hideElement(element) {
            element.style.setProperty("display", "none", "important");
        }
        function destroyElement(element) {
            element && element.parentNode && element.parentNode.removeChild(element);
        }
        function showAndAnimate(element, name, clean) {
            var animation = animate(element, name, clean);
            showElement(element);
            return animation;
        }
        function animateAndHide(element, name, clean) {
            return animate(element, name, clean).then((function() {
                hideElement(element);
            }));
        }
        function addClass(element, name) {
            element.classList.add(name);
        }
        function removeClass(element, name) {
            element.classList.remove(name);
        }
        function isElementClosed(el) {
            return !(el && el.parentNode && el.ownerDocument && el.ownerDocument.documentElement && el.ownerDocument.documentElement.contains(el));
        }
        function watchElementForClose(element, handler) {
            handler = once(handler);
            var cancelled = !1;
            var mutationObservers = [];
            var interval;
            var sacrificialFrame;
            var sacrificialFrameWin;
            var cancel = function() {
                cancelled = !0;
                for (var _i18 = 0; _i18 < mutationObservers.length; _i18++) mutationObservers[_i18].disconnect();
                interval && interval.cancel();
                sacrificialFrameWin && sacrificialFrameWin.removeEventListener("unload", elementClosed);
                sacrificialFrame && destroyElement(sacrificialFrame);
            };
            var elementClosed = function() {
                if (!cancelled) {
                    handler();
                    cancel();
                }
            };
            if (isElementClosed(element)) {
                elementClosed();
                return {
                    cancel: cancel
                };
            }
            if (window.MutationObserver) {
                var mutationElement = element.parentElement;
                for (;mutationElement; ) {
                    var mutationObserver = new window.MutationObserver((function() {
                        isElementClosed(element) && elementClosed();
                    }));
                    mutationObserver.observe(mutationElement, {
                        childList: !0
                    });
                    mutationObservers.push(mutationObserver);
                    mutationElement = mutationElement.parentElement;
                }
            }
            (sacrificialFrame = document.createElement("iframe")).setAttribute("name", "__detect_close_" + uniqueID() + "__");
            sacrificialFrame.style.display = "none";
            awaitFrameWindow(sacrificialFrame).then((function(frameWin) {
                (sacrificialFrameWin = function(win) {
                    if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
                    return win;
                }(frameWin)).addEventListener("unload", elementClosed);
            }));
            element.appendChild(sacrificialFrame);
            interval = safeInterval((function() {
                isElementClosed(element) && elementClosed();
            }), 1e3);
            return {
                cancel: cancel
            };
        }
        function fixScripts(el, doc) {
            void 0 === doc && (doc = window.document);
            for (var _i20 = 0, _querySelectorAll2 = querySelectorAll("script", el); _i20 < _querySelectorAll2.length; _i20++) {
                var script = _querySelectorAll2[_i20];
                var parentNode = script.parentNode;
                if (parentNode) {
                    var newScript = doc.createElement("script");
                    newScript.text = script.textContent;
                    parentNode.replaceChild(newScript, script);
                }
            }
        }
        function onResize(el, handler, _temp) {
            var _ref2 = void 0 === _temp ? {} : _temp, _ref2$width = _ref2.width, width = void 0 === _ref2$width || _ref2$width, _ref2$height = _ref2.height, height = void 0 === _ref2$height || _ref2$height, _ref2$interval = _ref2.interval, interval = void 0 === _ref2$interval ? 100 : _ref2$interval, _ref2$win = _ref2.win, win = void 0 === _ref2$win ? window : _ref2$win;
            var currentWidth = el.offsetWidth;
            var currentHeight = el.offsetHeight;
            var canceled = !1;
            handler({
                width: currentWidth,
                height: currentHeight
            });
            var check = function() {
                if (!canceled && isElementVisible(el)) {
                    var newWidth = el.offsetWidth;
                    var newHeight = el.offsetHeight;
                    (width && newWidth !== currentWidth || height && newHeight !== currentHeight) && handler({
                        width: newWidth,
                        height: newHeight
                    });
                    currentWidth = newWidth;
                    currentHeight = newHeight;
                }
            };
            var observer;
            var timeout;
            win.addEventListener("resize", check);
            if (void 0 !== win.ResizeObserver) {
                (observer = new win.ResizeObserver(check)).observe(el);
                timeout = safeInterval(check, 10 * interval);
            } else if (void 0 !== win.MutationObserver) {
                (observer = new win.MutationObserver(check)).observe(el, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0,
                    characterData: !1
                });
                timeout = safeInterval(check, 10 * interval);
            } else timeout = safeInterval(check, interval);
            return {
                cancel: function() {
                    canceled = !0;
                    observer.disconnect();
                    window.removeEventListener("resize", check);
                    timeout.cancel();
                }
            };
        }
        function getResourceLoadTime(url) {
            var performance = getPerformance();
            if (performance && "function" == typeof performance.getEntries) {
                var entries = performance.getEntries();
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry && entry.name && 0 === entry.name.indexOf(url) && "number" == typeof entry.duration) return Math.floor(entry.duration);
                }
            }
        }
        function isShadowElement(element) {
            for (;element.parentNode; ) element = element.parentNode;
            return "[object ShadowRoot]" === element.toString();
        }
        function getShadowRoot(element) {
            for (;element.parentNode; ) element = element.parentNode;
            if (isShadowElement(element)) return element;
        }
        function getShadowHost(element) {
            var shadowRoot = getShadowRoot(element);
            if (shadowRoot && shadowRoot.host) return shadowRoot.host;
        }
        function insertShadowSlot(element) {
            var shadowHost = getShadowHost(element);
            if (!shadowHost) throw new Error("Element is not in shadow dom");
            var slotName = "shadow-slot-" + uniqueID();
            var slot = document.createElement("slot");
            slot.setAttribute("name", slotName);
            element.appendChild(slot);
            var slotProvider = document.createElement("div");
            slotProvider.setAttribute("slot", slotName);
            shadowHost.appendChild(slotProvider);
            return isShadowElement(shadowHost) ? insertShadowSlot(slotProvider) : slotProvider;
        }
        function preventClickFocus(el) {
            var onFocus = function onFocus(event) {
                el.removeEventListener("focus", onFocus);
                event.preventDefault();
                el.blur();
                return !1;
            };
            el.addEventListener("mousedown", (function() {
                el.addEventListener("focus", onFocus);
                setTimeout((function() {
                    el.removeEventListener("focus", onFocus);
                }), 1);
            }));
        }
        function getStackTrace() {
            try {
                throw new Error("_");
            } catch (err) {
                return err.stack || "";
            }
        }
        var currentScript = "undefined" != typeof document ? document.currentScript : null;
        var getCurrentScript = memoize((function() {
            if (currentScript) return currentScript;
            if (currentScript = function() {
                try {
                    var stack = getStackTrace();
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
        var getCurrentScriptUID = memoize((function() {
            var script;
            try {
                script = getCurrentScript();
            } catch (err) {
                return currentUID;
            }
            var uid = script.getAttribute(ATTRIBUTES.UID);
            if (uid && "string" == typeof uid) return uid;
            if ((uid = script.getAttribute(ATTRIBUTES.UID + "-auto")) && "string" == typeof uid) return uid;
            if (script.src) {
                var hashedString = strHashStr(JSON.stringify({
                    src: script.src,
                    dataset: script.dataset
                }));
                uid = "uid_" + hashedString.slice(hashedString.length - UID_HASH_LENGTH);
            } else uid = uniqueID();
            script.setAttribute(ATTRIBUTES.UID + "-auto", uid);
            return uid;
        }));
        function submitForm(_ref3) {
            var url = _ref3.url, target = _ref3.target, body = _ref3.body, _ref3$method = _ref3.method, method = void 0 === _ref3$method ? "post" : _ref3$method;
            var form = document.createElement("form");
            form.setAttribute("target", target);
            form.setAttribute("method", method);
            form.setAttribute("action", url);
            form.style.display = "none";
            if (body) for (var _i24 = 0, _Object$keys4 = Object.keys(body); _i24 < _Object$keys4.length; _i24++) {
                var _body$key;
                var key = _Object$keys4[_i24];
                var input = document.createElement("input");
                input.setAttribute("name", key);
                input.setAttribute("value", null == (_body$key = body[key]) ? void 0 : _body$key.toString());
                form.appendChild(input);
            }
            getBody().appendChild(form);
            form.submit();
            getBody().removeChild(form);
        }
        function getStorage(_ref) {
            var name = _ref.name, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 12e5 : _ref$lifetime;
            return inlineMemoize(getStorage, (function() {
                var STORAGE_KEY = "__" + name + "_storage__";
                var newStateID = uniqueID();
                var accessedStorage;
                function getState(handler) {
                    var localStorageEnabled = isLocalStorageEnabled();
                    var storage;
                    accessedStorage && (storage = accessedStorage);
                    if (!storage && localStorageEnabled) {
                        var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                        rawStorage && (storage = JSON.parse(rawStorage));
                    }
                    storage || (storage = getGlobal()[STORAGE_KEY]);
                    storage || (storage = {
                        id: newStateID
                    });
                    storage.id || (storage.id = newStateID);
                    accessedStorage = storage;
                    var result = handler(storage);
                    localStorageEnabled ? window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage)) : getGlobal()[STORAGE_KEY] = storage;
                    accessedStorage = null;
                    return result;
                }
                function getID() {
                    return getState((function(storage) {
                        return storage.id;
                    }));
                }
                function getSession(handler) {
                    return getState((function(storage) {
                        var session = storage.__session__;
                        var now = Date.now();
                        session && now - session.created > lifetime && (session = null);
                        session || (session = {
                            guid: uniqueID(),
                            created: now
                        });
                        storage.__session__ = session;
                        return handler(session);
                    }));
                }
                return {
                    getState: getState,
                    getID: getID,
                    isStateFresh: function() {
                        return getID() === newStateID;
                    },
                    getSessionState: function(handler) {
                        return getSession((function(session) {
                            session.state = session.state || {};
                            return handler(session.state);
                        }));
                    },
                    getSessionID: function() {
                        return getSession((function(session) {
                            return session.guid;
                        }));
                    }
                };
            }), [ {
                name: name,
                lifetime: lifetime
            } ]);
        }
        function getBelterExperimentStorage() {
            return getStorage({
                name: "belter_experiment"
            });
        }
        function isEventUnique(name) {
            return getBelterExperimentStorage().getSessionState((function(state) {
                state.loggedBeacons = state.loggedBeacons || [];
                if (-1 === state.loggedBeacons.indexOf(name)) {
                    state.loggedBeacons.push(name);
                    return !0;
                }
                return !1;
            }));
        }
        function getRandomInteger(range) {
            return Math.floor(Math.random() * range);
        }
        function experiment(_ref) {
            var name = _ref.name, _ref$sample = _ref.sample, sample = void 0 === _ref$sample ? 50 : _ref$sample, _ref$logTreatment = _ref.logTreatment, logTreatment = void 0 === _ref$logTreatment ? src_util_noop : _ref$logTreatment, _ref$logCheckpoint = _ref.logCheckpoint, logCheckpoint = void 0 === _ref$logCheckpoint ? src_util_noop : _ref$logCheckpoint, _ref$sticky = _ref.sticky;
            var throttle = void 0 === _ref$sticky || _ref$sticky ? function(name) {
                return getBelterExperimentStorage().getState((function(state) {
                    state.throttlePercentiles = state.throttlePercentiles || {};
                    state.throttlePercentiles[name] = state.throttlePercentiles[name] || getRandomInteger(100);
                    return state.throttlePercentiles[name];
                }));
            }(name) : getRandomInteger(100);
            var group;
            var treatment = name + "_" + (group = throttle < sample ? "test" : sample >= 50 || sample <= throttle && throttle < 2 * sample ? "control" : "throttle");
            var started = !1;
            var forced = !1;
            try {
                window.localStorage && window.localStorage.getItem(name) && (forced = !0);
            } catch (err) {}
            var exp = {
                isEnabled: function() {
                    return "test" === group || forced;
                },
                isDisabled: function() {
                    return "test" !== group && !forced;
                },
                getTreatment: function() {
                    return treatment;
                },
                log: function(checkpoint, payload) {
                    void 0 === payload && (payload = {});
                    if (!started) return exp;
                    isEventUnique(treatment + "_" + JSON.stringify(payload)) && logTreatment({
                        name: name,
                        treatment: treatment,
                        payload: payload,
                        throttle: throttle
                    });
                    isEventUnique(treatment + "_" + checkpoint + "_" + JSON.stringify(payload)) && logCheckpoint({
                        name: name,
                        treatment: treatment,
                        checkpoint: checkpoint,
                        payload: payload,
                        throttle: throttle
                    });
                    return exp;
                },
                logStart: function(payload) {
                    void 0 === payload && (payload = {});
                    started = !0;
                    return exp.log("start", payload);
                },
                logComplete: function(payload) {
                    void 0 === payload && (payload = {});
                    return exp.log("complete", payload);
                }
            };
            return exp;
        }
        function getGlobalNameSpace(_ref) {
            var name = _ref.name, _ref$version = _ref.version, version = void 0 === _ref$version ? "latest" : _ref$version;
            var global = getGlobal();
            var globalKey = "__" + name + "__" + version + "_global__";
            var namespace = global[globalKey] = global[globalKey] || {};
            return {
                get: function(key, defValue) {
                    defValue = defValue || {};
                    return namespace[key] = namespace[key] || defValue;
                }
            };
        }
        var headerBuilders = [];
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
                for (var _i6 = 0; _i6 < headerBuilders.length; _i6++) {
                    var builtHeaders = (0, headerBuilders[_i6])();
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
        function addHeaderBuilder(method) {
            headerBuilders.push(method);
        }
        var types_TYPES = !0;
        function memoized(target, name, descriptor) {
            descriptor.value = memoize(descriptor.value, {
                name: name,
                thisNamespace: !0
            });
        }
        function decorators_promise(target, name, descriptor) {
            descriptor.value = promisify(descriptor.value, {
                name: name
            });
        }
        function isPerc(str) {
            return "string" == typeof str && /^[0-9]+%$/.test(str);
        }
        function isPx(str) {
            return "string" == typeof str && /^[0-9]+px$/.test(str);
        }
        function toNum(val) {
            if ("number" == typeof val) return val;
            var match = val.match(/^([0-9]+)(px|%)$/);
            if (!match) throw new Error("Could not match css value from " + val);
            return parseInt(match[1], 10);
        }
        function toPx(val) {
            return toNum(val) + "px";
        }
        function toCSS(val) {
            return "number" == typeof val ? toPx(val) : isPerc(val) ? val : toPx(val);
        }
        function percOf(num, perc) {
            return parseInt(num * toNum(perc) / 100, 10);
        }
        function normalizeDimension(dim, max) {
            if ("number" == typeof dim) return dim;
            if (isPerc(dim)) return percOf(max, dim);
            if (isPx(dim)) return toNum(dim);
            throw new Error("Can not normalize dimension: " + dim);
        }
        function wrapPromise(method, _temp) {
            var _ref$timeout = (void 0 === _temp ? {} : _temp).timeout, timeout = void 0 === _ref$timeout ? 5e3 : _ref$timeout;
            var expected = [];
            var promises = [];
            return new promise_ZalgoPromise((function(resolve, reject) {
                var timer = setTimeout((function() {
                    expected.length && reject(new Error("Expected " + expected[0].name + " to be called in " + timeout + "ms"));
                    promises.length && reject(new Error("Expected " + promises[0].name + " promise to complete in " + timeout + "ms"));
                }), timeout);
                var expect = function(name, handler) {
                    void 0 === handler && (handler = src_util_noop);
                    var exp = {
                        name: name,
                        handler: handler
                    };
                    expected.push(exp);
                    return function() {
                        var _this = this;
                        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                        removeFromArray(expected, exp);
                        var _tryCatch = tryCatch((function() {
                            var _handler;
                            return (_handler = handler).call.apply(_handler, [ _this ].concat(args));
                        })), result = _tryCatch.result, error = _tryCatch.error;
                        if (error) {
                            promises.push({
                                name: name,
                                promise: promise_ZalgoPromise.asyncReject(error)
                            });
                            throw error;
                        }
                        promises.push({
                            name: name,
                            promise: promise_ZalgoPromise.resolve(result)
                        });
                        return result;
                    };
                };
                var avoid = function(name, fn) {
                    void 0 === fn && (fn = src_util_noop);
                    return function() {
                        var _fn;
                        promises.push({
                            name: name,
                            promise: promise_ZalgoPromise.asyncReject(new Error("Expected " + name + " to not be called"))
                        });
                        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                        return (_fn = fn).call.apply(_fn, [ this ].concat(args));
                    };
                };
                var expectError = function(name, handler) {
                    void 0 === handler && (handler = src_util_noop);
                    var exp = {
                        name: name,
                        handler: handler
                    };
                    expected.push(exp);
                    return function() {
                        var _this2 = this;
                        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
                        removeFromArray(expected, exp);
                        var _tryCatch2 = tryCatch((function() {
                            var _handler2;
                            return (_handler2 = handler).call.apply(_handler2, [ _this2 ].concat(args));
                        })), result = _tryCatch2.result, error = _tryCatch2.error;
                        if (error) throw error;
                        promises.push({
                            name: name,
                            promise: promise_ZalgoPromise.resolve(result).then((function() {
                                throw new Error("Expected " + name + " to throw an error");
                            }), src_util_noop)
                        });
                        return result;
                    };
                };
                promises.push({
                    name: "wrapPromise handler",
                    promise: promise_ZalgoPromise.try((function() {
                        return method({
                            expect: expect,
                            avoid: avoid,
                            expectError: expectError,
                            error: avoid,
                            wait: function() {
                                return promise_ZalgoPromise.resolve();
                            }
                        });
                    }))
                });
                (function wait() {
                    return promise_ZalgoPromise.try((function() {
                        if (promises.length) {
                            var prom = promises[0];
                            return prom.promise.finally((function() {
                                removeFromArray(promises, prom);
                            })).then(wait);
                        }
                    })).then((function() {
                        if (expected.length) return promise_ZalgoPromise.delay(10).then(wait);
                    }));
                })().finally((function() {
                    clearTimeout(timer);
                })).then(resolve, reject);
            }));
        }
    } ]);
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = {
        visa: {
            niceType: "Visa",
            type: "visa",
            patterns: [ 4 ],
            gaps: [ 4, 8, 12 ],
            lengths: [ 16, 18, 19 ],
            code: {
                name: "CVV",
                size: 3
            }
        },
        mastercard: {
            niceType: "Mastercard",
            type: "mastercard",
            patterns: [ [ 51, 55 ], [ 2221, 2229 ], [ 223, 229 ], [ 23, 26 ], [ 270, 271 ], 2720 ],
            gaps: [ 4, 8, 12 ],
            lengths: [ 16 ],
            code: {
                name: "CVC",
                size: 3
            }
        },
        "american-express": {
            niceType: "American Express",
            type: "american-express",
            patterns: [ 34, 37 ],
            gaps: [ 4, 10 ],
            lengths: [ 15 ],
            code: {
                name: "CID",
                size: 4
            }
        },
        "diners-club": {
            niceType: "Diners Club",
            type: "diners-club",
            patterns: [ [ 300, 305 ], 36, 38, 39 ],
            gaps: [ 4, 10 ],
            lengths: [ 14, 16, 19 ],
            code: {
                name: "CVV",
                size: 3
            }
        },
        discover: {
            niceType: "Discover",
            type: "discover",
            patterns: [ 6011, [ 644, 649 ], 65 ],
            gaps: [ 4, 8, 12 ],
            lengths: [ 16, 19 ],
            code: {
                name: "CID",
                size: 3
            }
        },
        jcb: {
            niceType: "JCB",
            type: "jcb",
            patterns: [ 2131, 1800, [ 3528, 3589 ] ],
            gaps: [ 4, 8, 12 ],
            lengths: [ 16, 17, 18, 19 ],
            code: {
                name: "CVV",
                size: 3
            }
        },
        unionpay: {
            niceType: "UnionPay",
            type: "unionpay",
            patterns: [ 620, [ 624, 626 ], [ 62100, 62182 ], [ 62184, 62187 ], [ 62185, 62197 ], [ 62200, 62205 ], [ 622010, 622999 ], 622018, [ 622019, 622999 ], [ 62207, 62209 ], [ 622126, 622925 ], [ 623, 626 ], 6270, 6272, 6276, [ 627700, 627779 ], [ 627781, 627799 ], [ 6282, 6289 ], 6291, 6292, 810, [ 8110, 8131 ], [ 8132, 8151 ], [ 8152, 8163 ], [ 8164, 8171 ] ],
            gaps: [ 4, 8, 12 ],
            lengths: [ 14, 15, 16, 17, 18, 19 ],
            code: {
                name: "CVN",
                size: 3
            }
        },
        maestro: {
            niceType: "Maestro",
            type: "maestro",
            patterns: [ 493698, [ 5e5, 504174 ], [ 504176, 506698 ], [ 506779, 508999 ], [ 56, 59 ], 63, 67, 6 ],
            gaps: [ 4, 8, 12 ],
            lengths: [ 12, 13, 14, 15, 16, 17, 18, 19 ],
            code: {
                name: "CVC",
                size: 3
            }
        },
        elo: {
            niceType: "Elo",
            type: "elo",
            patterns: [ 401178, 401179, 438935, 457631, 457632, 431274, 451416, 457393, 504175, [ 506699, 506778 ], [ 509e3, 509999 ], 627780, 636297, 636368, [ 650031, 650033 ], [ 650035, 650051 ], [ 650405, 650439 ], [ 650485, 650538 ], [ 650541, 650598 ], [ 650700, 650718 ], [ 650720, 650727 ], [ 650901, 650978 ], [ 651652, 651679 ], [ 655e3, 655019 ], [ 655021, 655058 ] ],
            gaps: [ 4, 8, 12 ],
            lengths: [ 16 ],
            code: {
                name: "CVE",
                size: 3
            }
        },
        mir: {
            niceType: "Mir",
            type: "mir",
            patterns: [ [ 2200, 2204 ] ],
            gaps: [ 4, 8, 12 ],
            lengths: [ 16, 17, 18, 19 ],
            code: {
                name: "CVP2",
                size: 3
            }
        },
        hiper: {
            niceType: "Hiper",
            type: "hiper",
            patterns: [ 637095, 63737423, 63743358, 637568, 637599, 637609, 637612 ],
            gaps: [ 4, 8, 12 ],
            lengths: [ 16 ],
            code: {
                name: "CVC",
                size: 3
            }
        },
        hipercard: {
            niceType: "Hipercard",
            type: "hipercard",
            patterns: [ 606282 ],
            gaps: [ 4, 8, 12 ],
            lengths: [ 16 ],
            code: {
                name: "CVC",
                size: 3
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.addMatchingCardsToResults = void 0;
    var clone_1 = __webpack_require__(4);
    var matches_1 = __webpack_require__(11);
    exports.addMatchingCardsToResults = function(cardNumber, cardConfiguration, results) {
        var i, patternLength;
        for (i = 0; i < cardConfiguration.patterns.length; i++) {
            var pattern = cardConfiguration.patterns[i];
            if (matches_1.matches(cardNumber, pattern)) {
                var clonedCardConfiguration = clone_1.clone(cardConfiguration);
                patternLength = Array.isArray(pattern) ? String(pattern[0]).length : String(pattern).length;
                cardNumber.length >= patternLength && (clonedCardConfiguration.matchStrength = patternLength);
                results.push(clonedCardConfiguration);
                break;
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.matches = void 0;
    exports.matches = function(cardNumber, pattern) {
        return Array.isArray(pattern) ? function(cardNumber, min, max) {
            var maxLengthToCheck = String(min).length;
            var substr = cardNumber.substr(0, maxLengthToCheck);
            var integerRepresentationOfCardNumber = parseInt(substr, 10);
            min = parseInt(String(min).substr(0, substr.length), 10);
            max = parseInt(String(max).substr(0, substr.length), 10);
            return integerRepresentationOfCardNumber >= min && integerRepresentationOfCardNumber <= max;
        }(cardNumber, pattern[0], pattern[1]) : function(cardNumber, pattern) {
            return (pattern = String(pattern)).substring(0, cardNumber.length) === cardNumber.substring(0, pattern.length);
        }(cardNumber, pattern);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.isValidInputType = void 0;
    exports.isValidInputType = function(cardNumber) {
        return "string" == typeof cardNumber || cardNumber instanceof String;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.findBestMatch = void 0;
    exports.findBestMatch = function(results) {
        return function(results) {
            var numberOfResultsWithMaxStrengthProperty = results.filter((function(result) {
                return result.matchStrength;
            })).length;
            return numberOfResultsWithMaxStrengthProperty > 0 && numberOfResultsWithMaxStrengthProperty === results.length;
        }(results) ? results.reduce((function(bestMatch, result) {
            return bestMatch ? Number(bestMatch.matchStrength) < Number(result.matchStrength) ? result : bestMatch : result;
        })) : null;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.cardholderName = void 0;
    var CARD_NUMBER_REGEX = /^[\d\s-]*$/;
    function verification(isValid, isPotentiallyValid) {
        return {
            isValid: isValid,
            isPotentiallyValid: isPotentiallyValid
        };
    }
    exports.cardholderName = function(value) {
        return "string" != typeof value ? verification(!1, !1) : 0 === value.length ? verification(!1, !0) : value.length > 255 ? verification(!1, !1) : CARD_NUMBER_REGEX.test(value) ? verification(!1, !0) : verification(!0, !0);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.cardNumber = void 0;
    var luhn10 = __webpack_require__(16);
    var getCardTypes = __webpack_require__(0);
    function verification(card, isPotentiallyValid, isValid) {
        return {
            card: card,
            isPotentiallyValid: isPotentiallyValid,
            isValid: isValid
        };
    }
    exports.cardNumber = function(value, options) {
        void 0 === options && (options = {});
        var isValid, maxLength;
        if ("string" != typeof value && "number" != typeof value) return verification(null, !1, !1);
        var testCardValue = String(value).replace(/-|\s/g, "");
        if (!/^\d*$/.test(testCardValue)) return verification(null, !1, !1);
        var potentialTypes = getCardTypes(testCardValue);
        if (0 === potentialTypes.length) return verification(null, !1, !1);
        if (1 !== potentialTypes.length) return verification(null, !0, !1);
        var cardType = potentialTypes[0];
        if (options.maxLength && testCardValue.length > options.maxLength) return verification(cardType, !1, !1);
        isValid = cardType.type === getCardTypes.types.UNIONPAY && !0 !== options.luhnValidateUnionPay || luhn10(testCardValue);
        maxLength = Math.max.apply(null, cardType.lengths);
        options.maxLength && (maxLength = Math.min(options.maxLength, maxLength));
        for (var i = 0; i < cardType.lengths.length; i++) if (cardType.lengths[i] === testCardValue.length) return verification(cardType, testCardValue.length < maxLength || isValid, isValid);
        return verification(cardType, testCardValue.length < maxLength, !1);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(identifier) {
        var sum = 0;
        var alt = !1;
        var i = identifier.length - 1;
        var num;
        for (;i >= 0; ) {
            num = parseInt(identifier.charAt(i), 10);
            alt && (num *= 2) > 9 && (num = num % 10 + 1);
            alt = !alt;
            sum += num;
            i--;
        }
        return sum % 10 == 0;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __assign = this && this.__assign || function() {
        return (__assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) ({}).hasOwnProperty.call(s, p) && (t[p] = s[p]);
            }
            return t;
        }).apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.expirationDate = void 0;
    var parse_date_1 = __webpack_require__(18);
    var expiration_month_1 = __webpack_require__(5);
    var expiration_year_1 = __webpack_require__(3);
    function verification(isValid, isPotentiallyValid, month, year) {
        return {
            isValid: isValid,
            isPotentiallyValid: isPotentiallyValid,
            month: month,
            year: year
        };
    }
    exports.expirationDate = function(value, maxElapsedYear) {
        var date;
        if ("string" == typeof value) {
            value = value.replace(/^(\d\d) (\d\d(\d\d)?)$/, "$1/$2");
            date = parse_date_1.parseDate(String(value));
        } else {
            if (null === value || "object" != typeof value) return verification(!1, !1, null, null);
            var fullDate = __assign({}, value);
            date = {
                month: String(fullDate.month),
                year: String(fullDate.year)
            };
        }
        var monthValid = expiration_month_1.expirationMonth(date.month);
        var yearValid = expiration_year_1.expirationYear(date.year, maxElapsedYear);
        if (monthValid.isValid) {
            if (yearValid.isCurrentYear) {
                var isValidForThisYear = monthValid.isValidForThisYear;
                return verification(isValidForThisYear, isValidForThisYear, date.month, date.year);
            }
            if (yearValid.isValid) return verification(!0, !0, date.month, date.year);
        }
        return verification(!1, !(!monthValid.isPotentiallyValid || !yearValid.isPotentiallyValid), null, null);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.parseDate = void 0;
    var expiration_year_1 = __webpack_require__(3);
    var is_array_1 = __webpack_require__(19);
    exports.parseDate = function(datestring) {
        var date;
        /^\d{4}-\d{1,2}$/.test(datestring) ? date = datestring.split("-").reverse() : /\//.test(datestring) ? date = datestring.split(/\s*\/\s*/g) : /\s/.test(datestring) && (date = datestring.split(/ +/g));
        if (is_array_1.isArray(date)) return {
            month: date[0] || "",
            year: date.slice(1).join()
        };
        var numberOfDigitsInMonth = function(dateString) {
            var firstCharacter = Number(dateString[0]);
            var assumedYear;
            if (0 === firstCharacter) return 2;
            if (firstCharacter > 1) return 1;
            if (1 === firstCharacter && Number(dateString[1]) > 2) return 1;
            if (1 === firstCharacter) {
                assumedYear = dateString.substr(1);
                return expiration_year_1.expirationYear(assumedYear).isPotentiallyValid ? 1 : 2;
            }
            return 5 === dateString.length ? 1 : dateString.length > 5 ? 2 : 1;
        }(datestring);
        var month = datestring.substr(0, numberOfDigitsInMonth);
        return {
            month: month,
            year: datestring.substr(month.length)
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.isArray = void 0;
    exports.isArray = Array.isArray || function(arg) {
        return "[object Array]" === {}.toString.call(arg);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.cvv = void 0;
    function verification(isValid, isPotentiallyValid) {
        return {
            isValid: isValid,
            isPotentiallyValid: isPotentiallyValid
        };
    }
    exports.cvv = function(value, maxLength) {
        void 0 === maxLength && (maxLength = 3);
        maxLength = maxLength instanceof Array ? maxLength : [ maxLength ];
        return "string" != typeof value ? verification(!1, !1) : /^\d*$/.test(value) ? function(array, thing) {
            for (var i = 0; i < array.length; i++) if (thing === array[i]) return !0;
            return !1;
        }(maxLength, value.length) ? verification(!0, !0) : value.length < Math.min.apply(null, maxLength) ? verification(!1, !0) : value.length > function(array) {
            var maximum = 3;
            var i = 0;
            for (;i < array.length; i++) maximum = array[i] > maximum ? array[i] : maximum;
            return maximum;
        }(maxLength) ? verification(!1, !1) : verification(!0, !0) : verification(!1, !1);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.postalCode = void 0;
    function verification(isValid, isPotentiallyValid) {
        return {
            isValid: isValid,
            isPotentiallyValid: isPotentiallyValid
        };
    }
    exports.postalCode = function(value, options) {
        void 0 === options && (options = {});
        var minLength = options.minLength || 3;
        return "string" != typeof value ? verification(!1, !1) : verification(!(value.length < minLength), !0);
    };
}, function(module, exports, __webpack_require__) {
    "undefined" != typeof self && self, module.exports = function(E) {
        var N = {};
        function S(R) {
            if (N[R]) return N[R].exports;
            var t = N[R] = {
                i: R,
                l: !1,
                exports: {}
            };
            return E[R].call(t.exports, t, t.exports, S), t.l = !0, t.exports;
        }
        return S.m = E, S.c = N, S.d = function(E, N, R) {
            S.o(E, N) || Object.defineProperty(E, N, {
                enumerable: !0,
                get: R
            });
        }, S.r = function(E) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(E, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(E, "__esModule", {
                value: !0
            });
        }, S.t = function(E, N) {
            if (1 & N && (E = S(E)), 8 & N) return E;
            if (4 & N && "object" == typeof E && E && E.__esModule) return E;
            var R = Object.create(null);
            if (S.r(R), Object.defineProperty(R, "default", {
                enumerable: !0,
                value: E
            }), 2 & N && "string" != typeof E) for (var t in E) S.d(R, t, function(N) {
                return E[N];
            }.bind(null, t));
            return R;
        }, S.n = function(E) {
            var N = E && E.__esModule ? function() {
                return E.default;
            } : function() {
                return E;
            };
            return S.d(N, "a", N), N;
        }, S.o = function(E, N) {
            return {}.hasOwnProperty.call(E, N);
        }, S.p = "", S(S.s = 0);
    }([ function(E, N, S) {
        "use strict";
        S.r(N), S.d(N, "DEFAULT_COUNTRY", (function() {
            return Z;
        })), S.d(N, "DEFAULT_CURRENCY", (function() {
            return a;
        })), S.d(N, "DEFAULT_INTENT", (function() {
            return u;
        })), S.d(N, "DEFAULT_COMMIT", (function() {
            return L;
        })), S.d(N, "DEFAULT_SALE_COMMIT", (function() {
            return P;
        })), S.d(N, "DEFAULT_NONSALE_COMMIT", (function() {
            return d;
        })), S.d(N, "DEFAULT_VAULT", (function() {
            return c;
        })), S.d(N, "DEFAULT_COMPONENTS", (function() {
            return U;
        })), S.d(N, "DEFAULT_DEBUG", (function() {
            return s;
        })), S.d(N, "ENV", (function() {
            return G;
        })), S.d(N, "MOBILE_ENV", (function() {
            return B;
        })), S.d(N, "ERROR_CODE", (function() {
            return K;
        })), S.d(N, "FPTI_KEY", (function() {
            return p;
        })), S.d(N, "FPTI_USER_ACTION", (function() {
            return l;
        })), S.d(N, "FPTI_DATA_SOURCE", (function() {
            return f;
        })), S.d(N, "FPTI_FEED", (function() {
            return Y;
        })), S.d(N, "FPTI_SDK_NAME", (function() {
            return V;
        })), S.d(N, "FUNDING", (function() {
            return m;
        })), S.d(N, "FUNDING_BRAND_LABEL", (function() {
            return b;
        })), S.d(N, "CARD", (function() {
            return y;
        })), S.d(N, "WALLET_INSTRUMENT", (function() {
            return W;
        })), S.d(N, "FUNDING_PRODUCTS", (function() {
            return J;
        })), S.d(N, "COUNTRY", (function() {
            return R;
        })), S.d(N, "LANG", (function() {
            return t;
        })), S.d(N, "COUNTRY_LANGS", (function() {
            return e;
        })), S.d(N, "INTENT", (function() {
            return T;
        })), S.d(N, "COMMIT", (function() {
            return n;
        })), S.d(N, "VAULT", (function() {
            return A;
        })), S.d(N, "CURRENCY", (function() {
            return r;
        })), S.d(N, "SDK_PATH", (function() {
            return _;
        })), S.d(N, "SDK_SETTINGS", (function() {
            return F;
        })), S.d(N, "SDK_QUERY_KEYS", (function() {
            return D;
        })), S.d(N, "COMPONENTS", (function() {
            return H;
        })), S.d(N, "DEBUG", (function() {
            return I;
        })), S.d(N, "QUERY_BOOL", (function() {
            return o;
        })), S.d(N, "UNKNOWN", (function() {
            return O;
        })), S.d(N, "PROTOCOL", (function() {
            return i;
        })), S.d(N, "PAGE_TYPES", (function() {
            return M;
        })), S.d(N, "MERCHANT_ID_MAX", (function() {
            return C;
        })), S.d(N, "PLATFORM", (function() {
            return h;
        })), S.d(N, "TYPES", (function() {
            return k;
        }));
        var R = {
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
        }, t = {
            AR: "ar",
            BG: "bg",
            CS: "cs",
            DA: "da",
            DE: "de",
            EL: "el",
            EN: "en",
            ES: "es",
            ET: "et",
            FI: "fi",
            FR: "fr",
            HE: "he",
            HU: "hu",
            ID: "id",
            IT: "it",
            JA: "ja",
            KO: "ko",
            LT: "lt",
            LV: "lv",
            MS: "ms",
            NL: "nl",
            NO: "no",
            PL: "pl",
            PT: "pt",
            RO: "ro",
            RU: "ru",
            SI: "si",
            SK: "sk",
            SL: "sl",
            SQ: "sq",
            SV: "sv",
            TH: "th",
            TL: "tl",
            TR: "tr",
            VI: "vi",
            ZH: "zh",
            ZH_HANT: "zh_Hant"
        }, e = {
            AD: [ t.EN, t.FR, t.ES, t.ZH ],
            AE: [ t.EN, t.FR, t.ES, t.ZH, t.AR ],
            AG: [ t.EN, t.FR, t.ES, t.ZH ],
            AI: [ t.EN, t.FR, t.ES, t.ZH ],
            AL: [ t.SQ, t.EN ],
            AM: [ t.EN, t.FR, t.ES, t.ZH ],
            AN: [ t.EN, t.FR, t.ES, t.ZH ],
            AO: [ t.EN, t.FR, t.ES, t.ZH ],
            AR: [ t.ES, t.EN ],
            AT: [ t.DE, t.EN ],
            AU: [ t.EN ],
            AW: [ t.EN, t.FR, t.ES, t.ZH ],
            AZ: [ t.EN, t.FR, t.ES, t.ZH ],
            BA: [ t.EN ],
            BB: [ t.EN, t.FR, t.ES, t.ZH ],
            BE: [ t.EN, t.NL, t.FR ],
            BF: [ t.FR, t.EN, t.ES, t.ZH ],
            BG: [ t.BG, t.EN ],
            BH: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
            BI: [ t.FR, t.EN, t.ES, t.ZH ],
            BJ: [ t.FR, t.EN, t.ES, t.ZH ],
            BM: [ t.EN, t.FR, t.ES, t.ZH ],
            BN: [ t.MS, t.EN ],
            BO: [ t.ES, t.EN, t.FR, t.ZH ],
            BR: [ t.PT, t.EN ],
            BS: [ t.EN, t.FR, t.ES, t.ZH ],
            BT: [ t.EN ],
            BW: [ t.EN, t.FR, t.ES, t.ZH ],
            BY: [ t.EN ],
            BZ: [ t.EN, t.ES, t.FR, t.ZH ],
            CA: [ t.EN, t.FR ],
            CD: [ t.FR, t.EN, t.ES, t.ZH ],
            CG: [ t.EN, t.FR, t.ES, t.ZH ],
            CH: [ t.DE, t.FR, t.EN ],
            CI: [ t.FR, t.EN ],
            CK: [ t.EN, t.FR, t.ES, t.ZH ],
            CL: [ t.ES, t.EN, t.FR, t.ZH ],
            CM: [ t.FR, t.EN ],
            CN: [ t.ZH ],
            CO: [ t.ES, t.EN, t.FR, t.ZH ],
            CR: [ t.ES, t.EN, t.FR, t.ZH ],
            CV: [ t.EN, t.FR, t.ES, t.ZH ],
            CY: [ t.EN ],
            CZ: [ t.CS, t.EN ],
            DE: [ t.DE, t.EN ],
            DJ: [ t.FR, t.EN, t.ES, t.ZH ],
            DK: [ t.DA, t.EN ],
            DM: [ t.EN, t.FR, t.ES, t.ZH ],
            DO: [ t.ES, t.EN, t.FR, t.ZH ],
            DZ: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
            EC: [ t.ES, t.EN, t.FR, t.ZH ],
            EE: [ t.ET, t.EN, t.RU ],
            EG: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
            ER: [ t.EN, t.FR, t.ES, t.ZH ],
            ES: [ t.ES, t.EN ],
            ET: [ t.EN, t.FR, t.ES, t.ZH ],
            FI: [ t.FI, t.EN ],
            FJ: [ t.EN, t.FR, t.ES, t.ZH ],
            FK: [ t.EN, t.FR, t.ES, t.ZH ],
            FM: [ t.EN ],
            FO: [ t.DA, t.EN, t.FR, t.ES, t.ZH ],
            FR: [ t.FR, t.EN ],
            GA: [ t.FR, t.EN, t.ES, t.ZH ],
            GB: [ t.EN ],
            GD: [ t.EN, t.FR, t.ES, t.ZH ],
            GE: [ t.EN, t.FR, t.ES, t.ZH ],
            GF: [ t.EN, t.FR, t.ES, t.ZH ],
            GI: [ t.EN, t.FR, t.ES, t.ZH ],
            GL: [ t.DA, t.EN, t.FR, t.ES, t.ZH ],
            GM: [ t.EN, t.FR, t.ES, t.ZH ],
            GN: [ t.FR, t.EN, t.ES, t.ZH ],
            GP: [ t.EN, t.FR, t.ES, t.ZH ],
            GR: [ t.EL, t.EN ],
            GT: [ t.ES, t.EN, t.FR, t.ZH ],
            GW: [ t.EN, t.FR, t.ES, t.ZH ],
            GY: [ t.EN, t.FR, t.ES, t.ZH ],
            HK: [ t.EN, t.ZH_HANT, t.ZH ],
            HN: [ t.ES, t.EN, t.FR, t.ZH ],
            HR: [ t.EN ],
            HU: [ t.HU, t.EN ],
            ID: [ t.ID, t.EN ],
            IE: [ t.EN, t.FR, t.ES, t.ZH ],
            IL: [ t.HE, t.EN ],
            IN: [ t.EN ],
            IS: [ t.EN ],
            IT: [ t.IT, t.EN ],
            JM: [ t.EN, t.ES, t.FR, t.ZH ],
            JO: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
            JP: [ t.JA, t.EN ],
            KE: [ t.EN, t.FR, t.ES, t.ZH ],
            KG: [ t.EN, t.FR, t.ES, t.ZH ],
            KH: [ t.EN ],
            KI: [ t.EN, t.FR, t.ES, t.ZH ],
            KM: [ t.FR, t.EN, t.ES, t.ZH ],
            KN: [ t.EN, t.FR, t.ES, t.ZH ],
            KR: [ t.KO, t.EN ],
            KW: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
            KY: [ t.EN, t.FR, t.ES, t.ZH ],
            KZ: [ t.EN, t.FR, t.ES, t.ZH ],
            LA: [ t.EN ],
            LC: [ t.EN, t.FR, t.ES, t.ZH ],
            LI: [ t.EN, t.FR, t.ES, t.ZH ],
            LK: [ t.SI, t.EN ],
            LS: [ t.EN, t.FR, t.ES, t.ZH ],
            LT: [ t.LT, t.EN, t.RU, t.ZH ],
            LU: [ t.EN, t.DE, t.FR, t.ES, t.ZH ],
            LV: [ t.LV, t.EN, t.RU ],
            MA: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
            MC: [ t.FR, t.EN ],
            MD: [ t.EN ],
            ME: [ t.EN ],
            MG: [ t.EN, t.FR, t.ES, t.ZH ],
            MH: [ t.EN, t.FR, t.ES, t.ZH ],
            MK: [ t.EN ],
            ML: [ t.FR, t.EN, t.ES, t.ZH ],
            MN: [ t.EN ],
            MQ: [ t.EN, t.FR, t.ES, t.ZH ],
            MR: [ t.EN, t.FR, t.ES, t.ZH ],
            MS: [ t.EN, t.FR, t.ES, t.ZH ],
            MT: [ t.EN ],
            MU: [ t.EN, t.FR, t.ES, t.ZH ],
            MV: [ t.EN ],
            MW: [ t.EN, t.FR, t.ES, t.ZH ],
            MX: [ t.ES, t.EN ],
            MY: [ t.MS, t.EN ],
            MZ: [ t.EN, t.FR, t.ES, t.ZH ],
            NA: [ t.EN, t.FR, t.ES, t.ZH ],
            NC: [ t.EN, t.FR, t.ES, t.ZH ],
            NE: [ t.FR, t.EN, t.ES, t.ZH ],
            NF: [ t.EN, t.FR, t.ES, t.ZH ],
            NG: [ t.EN ],
            NI: [ t.ES, t.EN, t.FR, t.ZH ],
            NL: [ t.NL, t.EN ],
            NO: [ t.NO, t.EN ],
            NP: [ t.EN ],
            NR: [ t.EN, t.FR, t.ES, t.ZH ],
            NU: [ t.EN, t.FR, t.ES, t.ZH ],
            NZ: [ t.EN, t.FR, t.ES, t.ZH ],
            OM: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
            PA: [ t.ES, t.EN, t.FR, t.ZH ],
            PE: [ t.ES, t.EN, t.FR, t.ZH ],
            PF: [ t.EN, t.FR, t.ES, t.ZH ],
            PG: [ t.EN, t.FR, t.ES, t.ZH ],
            PH: [ t.TL, t.EN ],
            PL: [ t.PL, t.EN ],
            PM: [ t.EN, t.FR, t.ES, t.ZH ],
            PN: [ t.EN, t.FR, t.ES, t.ZH ],
            PT: [ t.PT, t.EN ],
            PW: [ t.EN, t.FR, t.ES, t.ZH ],
            PY: [ t.ES, t.EN ],
            QA: [ t.EN, t.FR, t.ES, t.ZH, t.AR ],
            RE: [ t.EN, t.FR, t.ES, t.ZH ],
            RO: [ t.RO, t.EN ],
            RS: [ t.EN, t.FR, t.ES, t.ZH ],
            RU: [ t.RU, t.EN ],
            RW: [ t.FR, t.EN, t.ES, t.ZH ],
            SA: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
            SB: [ t.EN, t.FR, t.ES, t.ZH ],
            SC: [ t.FR, t.EN, t.ES, t.ZH ],
            SE: [ t.SV, t.EN ],
            SG: [ t.EN ],
            SH: [ t.EN, t.FR, t.ES, t.ZH ],
            SI: [ t.SL, t.EN ],
            SJ: [ t.EN, t.FR, t.ES, t.ZH ],
            SK: [ t.SK, t.EN ],
            SL: [ t.EN, t.FR, t.ES, t.ZH ],
            SM: [ t.EN, t.FR, t.ES, t.ZH ],
            SN: [ t.FR, t.EN, t.ES, t.ZH ],
            SO: [ t.EN, t.FR, t.ES, t.ZH ],
            SR: [ t.EN, t.FR, t.ES, t.ZH ],
            ST: [ t.EN, t.FR, t.ES, t.ZH ],
            SV: [ t.ES, t.EN, t.FR, t.ZH ],
            SZ: [ t.EN, t.FR, t.ES, t.ZH ],
            TC: [ t.EN, t.FR, t.ES, t.ZH ],
            TD: [ t.FR, t.EN, t.ES, t.ZH ],
            TG: [ t.FR, t.EN, t.ES, t.ZH ],
            TH: [ t.TH, t.EN ],
            TJ: [ t.EN, t.FR, t.ES, t.ZH ],
            TM: [ t.EN, t.FR, t.ES, t.ZH ],
            TN: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
            TO: [ t.EN ],
            TR: [ t.TR, t.EN ],
            TT: [ t.EN, t.FR, t.ES, t.ZH ],
            TV: [ t.EN, t.FR, t.ES, t.ZH ],
            TW: [ t.ZH_HANT, t.ZH, t.EN ],
            TZ: [ t.EN, t.FR, t.ES, t.ZH ],
            UA: [ t.EN, t.RU, t.FR, t.ES, t.ZH ],
            UG: [ t.EN, t.FR, t.ES, t.ZH ],
            US: [ t.EN, t.FR, t.ES, t.ZH ],
            UY: [ t.ES, t.EN, t.FR, t.ZH ],
            VA: [ t.EN, t.FR, t.ES, t.ZH ],
            VC: [ t.EN, t.FR, t.ES, t.ZH ],
            VE: [ t.ES, t.EN, t.FR, t.ZH ],
            VG: [ t.EN, t.FR, t.ES, t.ZH ],
            VN: [ t.VI, t.EN ],
            VU: [ t.EN, t.FR, t.ES, t.ZH ],
            WF: [ t.EN, t.FR, t.ES, t.ZH ],
            WS: [ t.EN ],
            YE: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
            YT: [ t.EN, t.FR, t.ES, t.ZH ],
            ZA: [ t.EN, t.FR, t.ES, t.ZH ],
            ZM: [ t.EN, t.FR, t.ES, t.ZH ],
            ZW: [ t.EN ]
        }, T = {
            CAPTURE: "capture",
            AUTHORIZE: "authorize",
            ORDER: "order",
            TOKENIZE: "tokenize",
            SUBSCRIPTION: "subscription"
        }, n = {
            TRUE: !0,
            FALSE: !1
        }, A = {
            TRUE: !0,
            FALSE: !1
        }, r = {
            AED: "AED",
            ALL: "ALL",
            ANG: "ANG",
            AOA: "AOA",
            AUD: "AUD",
            AWG: "AWG",
            BAM: "BAM",
            BBD: "BBD",
            BGN: "BGN",
            BIF: "BIF",
            BMD: "BMD",
            BND: "BND",
            BOB: "BOB",
            BRL: "BRL",
            BSD: "BSD",
            BTN: "BTN",
            CAD: "CAD",
            CDF: "CDF",
            CHF: "CHF",
            CLP: "CLP",
            COP: "COP",
            CRC: "CRC",
            CVE: "CVE",
            CZK: "CZK",
            DJF: "DJF",
            DKK: "DKK",
            DOP: "DOP",
            DZD: "DZD",
            EGP: "EGP",
            ETB: "ETB",
            EUR: "EUR",
            FJD: "FJD",
            FKP: "FKP",
            GBP: "GBP",
            GIP: "GIP",
            GMD: "GMD",
            GNF: "GNF",
            GTQ: "GTQ",
            GYD: "GYD",
            HKD: "HKD",
            HNL: "HNL",
            HRK: "HRK",
            HUF: "HUF",
            IDR: "IDR",
            ILS: "ILS",
            INR: "INR",
            ISK: "ISK",
            JMD: "JMD",
            JPY: "JPY",
            KES: "KES",
            KMF: "KMF",
            KRW: "KRW",
            KYD: "KYD",
            LAK: "LAK",
            LKR: "LKR",
            MDL: "MDL",
            MGA: "MGA",
            MKD: "MKD",
            MNT: "MNT",
            MRO: "MRO",
            MUR: "MUR",
            MVR: "MVR",
            MXN: "MXN",
            MYR: "MYR",
            NAD: "NAD",
            NIO: "NIO",
            NOK: "NOK",
            NPR: "NPR",
            NZD: "NZD",
            PEN: "PEN",
            PGK: "PGK",
            PHP: "PHP",
            PLN: "PLN",
            PYG: "PYG",
            QAR: "QAR",
            RON: "RON",
            RSD: "RSD",
            RUB: "RUB",
            SAR: "SAR",
            SBD: "SBD",
            SCR: "SCR",
            SEK: "SEK",
            SGD: "SGD",
            SHP: "SHP",
            SLL: "SLL",
            SOS: "SOS",
            SRD: "SRD",
            SZL: "SZL",
            THB: "THB",
            TJS: "TJS",
            TOP: "TOP",
            TTD: "TTD",
            TWD: "TWD",
            TZS: "TZS",
            USD: "USD",
            UYU: "UYU",
            VND: "VND",
            VUV: "VUV",
            WST: "WST",
            XAF: "XAF",
            XCD: "XCD",
            YER: "YER"
        }, _ = "/sdk/js", F = {
            NAMESPACE: "data-namespace",
            CLIENT_TOKEN: "data-client-token",
            MERCHANT_ID: "data-merchant-id",
            PARTNER_ATTRIBUTION_ID: "data-partner-attribution-id",
            STAGE_HOST: "data-stage-host",
            API_STAGE_HOST: "data-api-stage-host",
            CSP_NONCE: "data-csp-nonce",
            ENABLE_3DS: "data-enable-3ds",
            SDK_INTEGRATION_SOURCE: "data-sdk-integration-source",
            USER_ID_TOKEN: "data-user-id-token",
            AMOUNT: "data-amount",
            CLIENT_METADATA_ID: "data-client-metadata-id",
            PAGE_TYPE: "data-page-type",
            USER_EXPERIENCE_FLOW: "data-user-experience-flow",
            POPUPS_DISABLED: "data-popups-disabled"
        }, D = {
            COMPONENTS: "components",
            ENV: "env",
            DEBUG: "debug",
            CACHEBUST: "cachebust",
            CLIENT_ID: "client-id",
            MERCHANT_ID: "merchant-id",
            LOCALE: "locale",
            CURRENCY: "currency",
            INTENT: "intent",
            COMMIT: "commit",
            VAULT: "vault",
            BUYER_COUNTRY: "buyer-country",
            ENABLE_FUNDING: "enable-funding",
            DISABLE_FUNDING: "disable-funding",
            DISABLE_CARD: "disable-card",
            INTEGRATION_DATE: "integration-date",
            STAGE_HOST: "stage-host",
            STAGE_ALIAS: "stage-alias",
            CDN_REGISTRY: "cdn-registry",
            VERSION: "version"
        }, H = {
            BUTTONS: "buttons",
            HOSTED_FIELDS: "hosted-fields"
        }, I = {
            TRUE: !0,
            FALSE: !1
        }, o = {
            TRUE: "true",
            FALSE: "false"
        }, O = "unknown", i = {
            HTTP: "http",
            HTTPS: "https"
        }, M = {
            HOME: "home",
            PRODUCT: "product",
            CART: "cart",
            CHECKOUT: "checkout",
            PRODUCT_LISTING: "product-listing",
            SEARCH_RESULTS: "search-results",
            PRODUCT_DETAILS: "product-details",
            MINI_CART: "mini-cart"
        }, C = 10, Z = R.US, a = r.USD, u = T.CAPTURE, L = n.TRUE, P = n.TRUE, d = n.TRUE, c = A.FALSE, U = H.BUTTONS, s = I.FALSE, G = {
            LOCAL: "local",
            STAGE: "stage",
            SANDBOX: "sandbox",
            PRODUCTION: "production",
            TEST: "test"
        }, B = {
            ANDROID: "android",
            IOS: "iOS"
        }, K = {
            VALIDATION_ERROR: "validation_error"
        }, p = {
            FEED: "feed_name",
            STATE: "state_name",
            TRANSITION: "transition_name",
            PAGE: "page_name",
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
            PAGE_TYPE: "pp_placement",
            SDK_NAME: "sdk_name",
            SDK_VERSION: "sdk_version",
            SDK_ENVIRONMENT: "sdk_environment",
            MOBILE_APP_VERSION: "mobile_app_version",
            MOBILE_BUNDLE_IDENTIFIER: "mapv",
            USER_AGENT: "user_agent",
            USER_ACTION: "user_action",
            CONTEXT_CORRID: "context_correlation_id",
            SDK_CACHE: "sdk_cache",
            SDK_LOAD_TIME: "sdk_load_time",
            IS_VAULT: "is_vault",
            DISABLE_FUNDING: "disable_funding",
            DISABLE_CARD: "disable_card",
            RESPONSE_DURATION: "response_duration",
            SDK_INTEGRATION_SOURCE: "sdk_integration_source",
            PAYMENT_FLOW: "payment_flow",
            BUTTON_VERSION: "button_version",
            FI_LIST: "fi_list",
            CHOSEN_FI_TYPE: "chosen_fi_type",
            SELECTED_FI: "merchant_selected_funding_source",
            POTENTIAL_PAYMENT_METHODS: "potential_payment_methods",
            PAY_NOW: "pay_now",
            STICKINESS_ID: "stickiness_id",
            TIMESTAMP: "t",
            OPTION_SELECTED: "optsel",
            USER_IDENTITY_METHOD: "user_identity_method",
            FIELDS_COMPONENT_SESSION_ID: "fields_component_session_id",
            CPL_COMP_METRICS: "cpl_comp_metrics",
            CPL_CHUNK_METRICS: "cpl_chunk_metrics",
            CPL_QUERY_METRICS: "cpl_query_metrics"
        }, l = {
            COMMIT: "commit",
            CONTINUE: "continue"
        }, f = {
            PAYMENTS_SDK: "checkout"
        }, Y = {
            PAYMENTS_SDK: "payments_sdk"
        }, V = {
            PAYMENTS_SDK: "payments_sdk"
        }, m = {
            PAYPAL: "paypal",
            VENMO: "venmo",
            APPLEPAY: "applepay",
            ITAU: "itau",
            CREDIT: "credit",
            PAYLATER: "paylater",
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
            BLIK: "blik",
            TRUSTLY: "trustly",
            ZIMPLER: "zimpler",
            MAXIMA: "maxima",
            OXXO: "oxxo",
            BOLETO: "boleto",
            BOLETOBANCARIO: "boletobancario",
            WECHATPAY: "wechatpay",
            MERCADOPAGO: "mercadopago",
            MULTIBANCO: "multibanco"
        }, b = {
            PAYPAL: "PayPal",
            CREDIT: "PayPal Credit"
        }, y = {
            VISA: "visa",
            MASTERCARD: "mastercard",
            AMEX: "amex",
            DISCOVER: "discover",
            HIPER: "hiper",
            ELO: "elo",
            JCB: "jcb",
            CUP: "cup"
        }, W = {
            BALANCE: "balance",
            CARD: "card",
            BANK: "bank",
            CREDIT: "credit"
        }, J = {
            PAY_IN_3: "payIn3",
            PAY_IN_4: "payIn4",
            PAYLATER: "paylater",
            CREDIT: "credit"
        }, h = {
            DESKTOP: "desktop",
            MOBILE: "mobile"
        }, k = !0;
    } ]);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, "setupCard", (function() {
        return setupCard;
    }));
    __webpack_require__.d(__webpack_exports__, "CardField", (function() {
        return CardField;
    }));
    __webpack_require__.d(__webpack_exports__, "CardNumberField", (function() {
        return CardNumberField;
    }));
    __webpack_require__.d(__webpack_exports__, "CardExpiryField", (function() {
        return CardExpiryField;
    }));
    __webpack_require__.d(__webpack_exports__, "CardCVVField", (function() {
        return CardCVVField;
    }));
    __webpack_require__.d(__webpack_exports__, "CardNameField", (function() {
        return CardNameField;
    }));
    __webpack_require__.d(__webpack_exports__, "hasCardFields", (function() {
        return hasCardFields;
    }));
    __webpack_require__.d(__webpack_exports__, "getCardFields", (function() {
        return getCardFields;
    }));
    __webpack_require__.d(__webpack_exports__, "emitGqlErrors", (function() {
        return emitGqlErrors;
    }));
    __webpack_require__.d(__webpack_exports__, "resetGQLErrors", (function() {
        return interface_resetGQLErrors;
    }));
    __webpack_require__.d(__webpack_exports__, "submitCardFields", (function() {
        return submitCardFields;
    }));
    function _extends() {
        return (_extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) ({}).hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }).apply(this, arguments);
    }
    var n, l, preact_module_u, preact_module_t, preact_module_o, preact_module_r, preact_module_e = {}, c = [], s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function preact_module_a(n, l) {
        for (var u in l) n[u] = l[u];
        return n;
    }
    function h(n) {
        var l = n.parentNode;
        l && l.removeChild(n);
    }
    function v(l, u, i) {
        var t, o, r, f = {};
        for (r in u) "key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
        if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), 
        "function" == typeof l && null != l.defaultProps) for (r in l.defaultProps) void 0 === f[r] && (f[r] = l.defaultProps[r]);
        return y(l, f, t, o, null);
    }
    function y(n, i, t, o, r) {
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
    function preact_module_d(n) {
        return n.children;
    }
    function _(n, l) {
        this.props = n, this.context = l;
    }
    function k(n, l) {
        if (null == l) return n.__ ? k(n.__, n.__.__k.indexOf(n) + 1) : null;
        for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
        return "function" == typeof n.type ? k(n) : null;
    }
    function b(n) {
        var l, u;
        if (null != (n = n.__) && null != n.__c) {
            for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
                n.__e = n.__c.base = u.__e;
                break;
            }
            return b(n);
        }
    }
    function m(n) {
        (!n.__d && (n.__d = !0) && preact_module_t.push(n) && !g.__r++ || preact_module_r !== l.debounceRendering) && ((preact_module_r = l.debounceRendering) || preact_module_o)(g);
    }
    function g() {
        for (var n; g.__r = preact_module_t.length; ) n = preact_module_t.sort((function(n, l) {
            return n.__v.__b - l.__v.__b;
        })), preact_module_t = [], n.some((function(n) {
            var l, u, i, t, o, r;
            n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = preact_module_a({}, t)).__v = t.__v + 1, 
            j(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [ o ] : null, u, null == o ? k(t) : o, t.__h), 
            z(u, t), t.__e != o && b(t)));
        }));
    }
    function w(n, l, u, i, t, o, r, f, s, a) {
        var h, v, p, _, b, m, g, w = i && i.__k || c, A = w.length;
        for (u.__k = [], h = 0; h < l.length; h++) if (null != (_ = u.__k[h] = null == (_ = l[h]) || "boolean" == typeof _ ? null : "string" == typeof _ || "number" == typeof _ || "bigint" == typeof _ ? y(null, _, null, null, _) : Array.isArray(_) ? y(preact_module_d, {
            children: _
        }, null, null, null) : _.__b > 0 ? y(_.type, _.props, _.key, null, _.__v) : _)) {
            if (_.__ = u, _.__b = u.__b + 1, null === (p = w[h]) || p && _.key == p.key && _.type === p.type) w[h] = void 0; else for (v = 0; v < A; v++) {
                if ((p = w[v]) && _.key == p.key && _.type === p.type) {
                    w[v] = void 0;
                    break;
                }
                p = null;
            }
            j(n, _, p = p || preact_module_e, t, o, r, f, s, a), b = _.__e, (v = _.ref) && p.ref != v && (g || (g = []), 
            p.ref && g.push(p.ref, null, _), g.push(v, _.__c || b, _)), null != b ? (null == m && (m = b), 
            "function" == typeof _.type && _.__k === p.__k ? _.__d = s = x(_, s, n) : s = P(n, _, p, w, b, s), 
            "function" == typeof u.type && (u.__d = s)) : s && p.__e == s && s.parentNode != n && (s = k(p));
        }
        for (u.__e = m, h = A; h--; ) null != w[h] && ("function" == typeof u.type && null != w[h].__e && w[h].__e == u.__d && (u.__d = k(i, h + 1)), 
        N(w[h], w[h]));
        if (g) for (h = 0; h < g.length; h++) M(g[h], g[++h], g[++h]);
    }
    function x(n, l, u) {
        for (var i, t = n.__k, o = 0; t && o < t.length; o++) (i = t[o]) && (i.__ = n, l = "function" == typeof i.type ? x(i, l, u) : P(u, i, i, t, i.__e, l));
        return l;
    }
    function P(n, l, u, i, t, o) {
        var r, f, e;
        if (void 0 !== l.__d) r = l.__d, l.__d = void 0; else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), 
        r = null; else {
            for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2) if (f == t) break n;
            n.insertBefore(t, o), r = o;
        }
        return void 0 !== r ? r : t.nextSibling;
    }
    function $(n, l, u) {
        "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || s.test(l) ? u : u + "px";
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
        var s, h, v, y, p, k, b, m, g, x, A, P = u.type;
        if (void 0 !== u.constructor) return null;
        null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, r = [ e ]), (s = l.__b) && s(u);
        try {
            n: if ("function" == typeof P) {
                if (m = u.props, g = (s = P.contextType) && t[s.__c], x = s ? g ? g.props.value : s.__ : t, 
                i.__c ? b = (h = u.__c = i.__c).__ = h.__E : ("prototype" in P && P.prototype.render ? u.__c = h = new P(m, x) : (u.__c = h = new _(m, x), 
                h.constructor = P, h.render = O), g && g.sub(h), h.props = m, h.state || (h.state = {}), 
                h.context = x, h.__n = t, v = h.__d = !0, h.__h = []), null == h.__s && (h.__s = h.state), 
                null != P.getDerivedStateFromProps && (h.__s == h.state && (h.__s = preact_module_a({}, h.__s)), 
                preact_module_a(h.__s, P.getDerivedStateFromProps(m, h.__s))), y = h.props, p = h.state, 
                v) null == P.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), 
                null != h.componentDidMount && h.__h.push(h.componentDidMount); else {
                    if (null == P.getDerivedStateFromProps && m !== y && null != h.componentWillReceiveProps && h.componentWillReceiveProps(m, x), 
                    !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(m, h.__s, x) || u.__v === i.__v) {
                        h.props = m, h.state = h.__s, u.__v !== i.__v && (h.__d = !1), h.__v = u, u.__e = i.__e, 
                        u.__k = i.__k, u.__k.forEach((function(n) {
                            n && (n.__ = u);
                        })), h.__h.length && f.push(h);
                        break n;
                    }
                    null != h.componentWillUpdate && h.componentWillUpdate(m, h.__s, x), null != h.componentDidUpdate && h.__h.push((function() {
                        h.componentDidUpdate(y, p, k);
                    }));
                }
                h.context = x, h.props = m, h.state = h.__s, (s = l.__r) && s(u), h.__d = !1, h.__v = u, 
                h.__P = n, s = h.render(h.props, h.state, h.context), h.state = h.__s, null != h.getChildContext && (t = preact_module_a(preact_module_a({}, t), h.getChildContext())), 
                v || null == h.getSnapshotBeforeUpdate || (k = h.getSnapshotBeforeUpdate(y, p)), 
                A = null != s && s.type === preact_module_d && null == s.key ? s.props.children : s, 
                w(n, Array.isArray(A) ? A : [ A ], u, i, t, o, r, f, e, c), h.base = u.__e, u.__h = null, 
                h.__h.length && f.push(h), b && (h.__E = h.__ = null), h.__e = !1;
            } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = L(i.__e, u, i, t, o, r, f, c);
            (s = l.diffed) && s(u);
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
    function L(l, u, i, t, o, r, f, c) {
        var s, a, v, y = i.props, p = u.props, d = u.type, _ = 0;
        if ("svg" === d && (o = !0), null != r) for (;_ < r.length; _++) if ((s = r[_]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
            l = s, r[_] = null;
            break;
        }
        if (null == l) {
            if (null === d) return document.createTextNode(p);
            l = o ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), 
            r = null, c = !1;
        }
        if (null === d) y === p || c && l.data === p || (l.data = p); else {
            if (r = r && n.call(l.childNodes), a = (y = i.props || preact_module_e).dangerouslySetInnerHTML, 
            v = p.dangerouslySetInnerHTML, !c) {
                if (null != r) for (y = {}, _ = 0; _ < l.attributes.length; _++) y[l.attributes[_].name] = l.attributes[_].value;
                (v || a) && (v && (a && v.__html == a.__html || v.__html === l.innerHTML) || (l.innerHTML = v && v.__html || ""));
            }
            if (function(n, l, u, i, t) {
                var o;
                for (o in u) "children" === o || "key" === o || o in l || H(n, o, null, u[o], i);
                for (o in l) t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || H(n, o, l[o], u[o], i);
            }(l, p, y, o, c), v) u.__k = []; else if (_ = u.props.children, w(l, Array.isArray(_) ? _ : [ _ ], u, i, t, o && "foreignObject" !== d, r, f, r ? r[0] : i.__k && k(i, 0), c), 
            null != r) for (_ = r.length; _--; ) null != r[_] && h(r[_]);
            c || ("value" in p && void 0 !== (_ = p.value) && (_ !== l.value || "progress" === d && !_ || "option" === d && _ !== y.value) && H(l, "value", _, y.value, !1), 
            "checked" in p && void 0 !== (_ = p.checked) && _ !== l.checked && H(l, "checked", _, y.checked, !1));
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
            t.base = t.__P = null;
        }
        if (t = n.__k) for (o = 0; o < t.length; o++) t[o] && N(t[o], u, "function" != typeof n.type);
        i || null == n.__e || h(n.__e), n.__e = n.__d = void 0;
    }
    function O(n, l, u) {
        return this.constructor(n, u);
    }
    n = c.slice, l = {
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
    }, preact_module_u = 0, _.prototype.setState = function(n, l) {
        var u;
        u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = preact_module_a({}, this.state), 
        "function" == typeof n && (n = n(preact_module_a({}, u), this.props)), n && preact_module_a(u, n), 
        null != n && this.__v && (l && this.__h.push(l), m(this));
    }, _.prototype.forceUpdate = function(n) {
        this.__v && (this.__e = !0, n && this.__h.push(n), m(this));
    }, _.prototype.render = preact_module_d, preact_module_t = [], preact_module_o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
    g.__r = 0;
    var hooks_module_t, hooks_module_u, hooks_module_r, hooks_module_o = 0, hooks_module_i = [], hooks_module_c = l.__b, hooks_module_f = l.__r, hooks_module_e = l.diffed, hooks_module_a = l.__c, hooks_module_v = l.unmount;
    function hooks_module_l(t, r) {
        l.__h && l.__h(hooks_module_u, t, hooks_module_o || r), hooks_module_o = 0;
        var i = hooks_module_u.__H || (hooks_module_u.__H = {
            __: [],
            __h: []
        });
        return t >= i.__.length && i.__.push({}), i.__[t];
    }
    function hooks_module_m(n) {
        return hooks_module_o = 1, function(n, r, o) {
            var i = hooks_module_l(hooks_module_t++, 2);
            return i.t = n, i.__c || (i.__ = [ hooks_module_w(void 0, r), function(n) {
                var t = i.t(i.__[0], n);
                i.__[0] !== t && (i.__ = [ t, i.__[1] ], i.__c.setState({}));
            } ], i.__c = hooks_module_u), i.__;
        }(hooks_module_w, n);
    }
    function hooks_module_y(r, o) {
        var i = hooks_module_l(hooks_module_t++, 3);
        !l.__s && hooks_module_k(i.__H, o) && (i.__ = r, i.__H = o, hooks_module_u.__H.__h.push(i));
    }
    function hooks_module_h(n) {
        return hooks_module_o = 5, function(n, u) {
            var r = hooks_module_l(hooks_module_t++, 7);
            return hooks_module_k(r.__H, u) && (r.__ = n(), r.__H = u, r.__h = n), r.__;
        }((function() {
            return {
                current: n
            };
        }), []);
    }
    function hooks_module_x() {
        for (var t; t = hooks_module_i.shift(); ) if (t.__P) try {
            t.__H.__h.forEach(hooks_module_g), t.__H.__h.forEach(hooks_module_j), t.__H.__h = [];
        } catch (u) {
            t.__H.__h = [], l.__e(u, t.__v);
        }
    }
    l.__b = function(n) {
        hooks_module_u = null, hooks_module_c && hooks_module_c(n);
    }, l.__r = function(n) {
        hooks_module_f && hooks_module_f(n), hooks_module_t = 0;
        var r = (hooks_module_u = n.__c).__H;
        r && (r.__h.forEach(hooks_module_g), r.__h.forEach(hooks_module_j), r.__h = []);
    }, l.diffed = function(t) {
        hooks_module_e && hooks_module_e(t);
        var o = t.__c;
        o && o.__H && o.__H.__h.length && (1 !== hooks_module_i.push(o) && hooks_module_r === l.requestAnimationFrame || ((hooks_module_r = l.requestAnimationFrame) || function(n) {
            var t, u = function() {
                clearTimeout(r), hooks_module_b && cancelAnimationFrame(t), setTimeout(n);
            }, r = setTimeout(u, 100);
            hooks_module_b && (t = requestAnimationFrame(u));
        })(hooks_module_x)), hooks_module_u = null;
    }, l.__c = function(t, u) {
        u.some((function(t) {
            try {
                t.__h.forEach(hooks_module_g), t.__h = t.__h.filter((function(n) {
                    return !n.__ || hooks_module_j(n);
                }));
            } catch (r) {
                u.some((function(n) {
                    n.__h && (n.__h = []);
                })), u = [], l.__e(r, t.__v);
            }
        })), hooks_module_a && hooks_module_a(t, u);
    }, l.unmount = function(t) {
        hooks_module_v && hooks_module_v(t);
        var u, r = t.__c;
        r && r.__H && (r.__H.__.forEach((function(n) {
            try {
                hooks_module_g(n);
            } catch (n) {
                u = n;
            }
        })), u && l.__e(u, r.__v));
    };
    var hooks_module_b = "function" == typeof requestAnimationFrame;
    function hooks_module_g(n) {
        var t = hooks_module_u, r = n.__c;
        "function" == typeof r && (n.__c = void 0, r()), hooks_module_u = t;
    }
    function hooks_module_j(n) {
        var t = hooks_module_u;
        n.__c = n.__(), hooks_module_u = t;
    }
    function hooks_module_k(n, t) {
        return !n || n.length !== t.length || t.some((function(t, u) {
            return t !== n[u];
        }));
    }
    function hooks_module_w(n, t) {
        return "function" == typeof t ? t(n) : t;
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
    function utils_getParent(win) {
        void 0 === win && (win = window);
        if (win) try {
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
        void 0 === win && (win = window);
        var location = win.location;
        if (!location) throw new Error("Can not read window location");
        var protocol = getActualProtocol(win);
        if (!protocol) throw new Error("Can not read window protocol");
        if ("file:" === protocol) return "file://";
        if ("about:" === protocol) {
            var parent = utils_getParent(win);
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
    function isAncestorParent(parent, child) {
        if (!parent || !child) return !1;
        var childParent = utils_getParent(child);
        return childParent ? childParent === parent : -1 !== function(win) {
            var result = [];
            try {
                for (;win.parent !== win; ) {
                    result.push(win.parent);
                    win = win.parent;
                }
            } catch (err) {}
            return result;
        }(child).indexOf(parent);
    }
    function getAllChildFrames(win) {
        var result = [];
        for (var _i3 = 0, _getFrames2 = function(win) {
            var result = [];
            var frames;
            try {
                frames = win.frames;
            } catch (err) {
                frames = win;
            }
            var len;
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
    function base64encode(str) {
        if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
            return String.fromCharCode(parseInt(p1, 16));
        }))).replace(/[=]/g, "");
        if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64").replace(/[=]/g, "");
        throw new Error("Can not find window.btoa or Buffer");
    }
    function uniqueID() {
        var chars = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, (function() {
            return chars.charAt(Math.floor(Math.random() * chars.length));
        })) + "_" + base64encode((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    }
    function getGlobal() {
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw new Error("No global found");
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
    function inlineMemoize(method, logic, args) {
        void 0 === args && (args = []);
        var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {};
        var key = serializeArgs(args);
        return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
    }
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
    Error;
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
        return "undefined" != typeof window && void 0 !== window.location;
    }
    function isLocalStorageEnabled() {
        return inlineMemoize(isLocalStorageEnabled, (function() {
            try {
                if ("undefined" == typeof window) return !1;
                if (window.localStorage) {
                    var value = Math.random().toString();
                    window.localStorage.setItem("__test__localStorage__", value);
                    var result = window.localStorage.getItem("__test__localStorage__");
                    window.localStorage.removeItem("__test__localStorage__");
                    if (value === result) return !0;
                }
            } catch (err) {}
            return !1;
        }));
    }
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
    function getStorage(_ref) {
        var name = _ref.name, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 12e5 : _ref$lifetime;
        return inlineMemoize(getStorage, (function() {
            var STORAGE_KEY = "__" + name + "_storage__";
            var newStateID = uniqueID();
            var accessedStorage;
            function getState(handler) {
                var localStorageEnabled = isLocalStorageEnabled();
                var storage;
                accessedStorage && (storage = accessedStorage);
                if (!storage && localStorageEnabled) {
                    var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                    rawStorage && (storage = JSON.parse(rawStorage));
                }
                storage || (storage = getGlobal()[STORAGE_KEY]);
                storage || (storage = {
                    id: newStateID
                });
                storage.id || (storage.id = newStateID);
                accessedStorage = storage;
                var result = handler(storage);
                localStorageEnabled ? window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage)) : getGlobal()[STORAGE_KEY] = storage;
                accessedStorage = null;
                return result;
            }
            function getID() {
                return getState((function(storage) {
                    return storage.id;
                }));
            }
            function getSession(handler) {
                return getState((function(storage) {
                    var session = storage.__session__;
                    var now = Date.now();
                    session && now - session.created > lifetime && (session = null);
                    session || (session = {
                        guid: uniqueID(),
                        created: now
                    });
                    storage.__session__ = session;
                    return handler(session);
                }));
            }
            return {
                getState: getState,
                getID: getID,
                isStateFresh: function() {
                    return getID() === newStateID;
                },
                getSessionState: function(handler) {
                    return getSession((function(session) {
                        session.state = session.state || {};
                        return handler(session.state);
                    }));
                },
                getSessionID: function() {
                    return getSession((function(session) {
                        return session.guid;
                    }));
                }
            };
        }), [ {
            name: name,
            lifetime: lifetime
        } ]);
    }
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
    var LSAT_UPGRADE_EXCLUDED_MERCHANTS = [ "AQipcJ1uXz50maKgYx49lKUB8MlSOXP573M6cpsFpHqDZOqnopsJpfYY7bQC_9CtQJsEhGlk8HLs2oZz", "Aco-yrRKihknb5vDBbDOdtYywjYMEPaM7mQg6kev8VDAz01lLA88J4oAUnF4UV9F_InqkqX7K62_jOjx", "AeAiB9K2rRsTXsFKZt4FMAQ8a6VEu4hijducis3a8NcIjV2J_c5I2H2PYhT3qCOwxT8P4l17skqgBlmg", "AXKrWRqEvxiDoUIZQaD1tFi2QhtmhWve3yTDBi58bxWjieYJ9j73My-yJmM7hP00JvOXu4YD6L2eaI5O", "AfRTnXv_QcuVyalbUxThtgk1xTygygsdevlBUTz36dDgD6XZNHp3Ym99a-mjMaokXyTTiI8VJ9mRgaFB", "AejlsIlg_KjKjmLKqxJqFIAwn3ZP02emx41Z2It4IfirQ-nNgZgzWk1CU-Q1QDbYUXjWoYJZ4dq1S2pK", "AQXD7-m_2yMo-5AxJ1fQaPeEWYDE7NZ9XrLzEXeiPLTHDu9vfe_T0foF8BoX8K5cMfXuRDysUEmhw-8Z" ];
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
    function Logger(_ref) {
        var url = _ref.url, prefix = _ref.prefix, _ref$logLevel = _ref.logLevel, logLevel = void 0 === _ref$logLevel ? "warn" : _ref$logLevel, _ref$transport = _ref.transport, transport = void 0 === _ref$transport ? function(httpWin) {
            void 0 === httpWin && (httpWin = window);
            var win = isSameDomain(httpWin) ? function(win) {
                if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
                return win;
            }(httpWin) : window;
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
                    return beaconResult || request({
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
    }
    var _FUNDING_SKIP_LOGIN, _AMPLITUDE_API_KEY;
    (_FUNDING_SKIP_LOGIN = {}).paypal = "paypal", _FUNDING_SKIP_LOGIN.paylater = "paypal", 
    _FUNDING_SKIP_LOGIN.credit = "paypal";
    (_AMPLITUDE_API_KEY = {}).test = "a23fb4dfae56daf7c3212303b53a8527", _AMPLITUDE_API_KEY.local = "a23fb4dfae56daf7c3212303b53a8527", 
    _AMPLITUDE_API_KEY.stage = "a23fb4dfae56daf7c3212303b53a8527", _AMPLITUDE_API_KEY.sandbox = "a23fb4dfae56daf7c3212303b53a8527", 
    _AMPLITUDE_API_KEY.production = "ce423f79daba95faeb0694186170605c";
    function getLogger() {
        return inlineMemoize(getLogger, (function() {
            return Logger({
                url: "/xoplatform/logger/api/logger",
                enableSendBeacon: !0
            });
        }));
    }
    function unresolvedPromise() {
        return new promise_ZalgoPromise(src_util_noop);
    }
    function promiseNoop() {
        return promise_ZalgoPromise.resolve();
    }
    function util_getBody() {
        var body = document.body;
        if (!body) throw new Error("Document body not found");
        return body;
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
    function isEmailAddress(str) {
        return Boolean(str.match(/^.+@.+\..+$/));
    }
    function getSDKStorage() {
        return getStorage({
            name: "paypal",
            lifetime: 36e5
        });
    }
    var belter = __webpack_require__(1);
    var dist = __webpack_require__(0);
    var dist_default = __webpack_require__.n(dist);
    var luhn_10 = __webpack_require__(6);
    var luhn_10_default = __webpack_require__.n(luhn_10);
    var card_validator_dist = __webpack_require__(7);
    var card_validator_dist_default = __webpack_require__.n(card_validator_dist);
    var _CARD_FIELD_TYPE_TO_F, _VALIDATOR_TO_TYPE_MA;
    var GQL_ERRORS = {
        "/payment_source/card/number": {
            VALIDATION_ERROR: "INVALID_NUMBER",
            MISSING_REQUIRED_PARAMETER: "MISSING_NUMBER"
        },
        "/payment_source/card/expiry": {
            INVALID_PARAMETER_SYNTAX: "INVALID_EXPIRATION_DATE_FORMAT",
            INVALID_STRING_LENGTH: "INVALID_EXPIRATION_DATE_LENGTH",
            CARD_EXPIRED: "CARD_EXPIRED",
            MISSING_REQUIRED_PARAMETER: "MISSING_EXPIRATION_DATE"
        },
        "/payment_source/card/security_code": {
            VALIDATION_ERROR: "INVALID_SECURITY_CODE"
        },
        TRANSACTION_REFUSED: "TRANSACTION_REJECTED"
    };
    var CARD_FIELD_TYPE_TO_FRAME_NAME = ((_CARD_FIELD_TYPE_TO_F = {}).single = "card-field", 
    _CARD_FIELD_TYPE_TO_F.number = "card-number-field", _CARD_FIELD_TYPE_TO_F.cvv = "card-cvv-field", 
    _CARD_FIELD_TYPE_TO_F.expiry = "card-expiry-field", _CARD_FIELD_TYPE_TO_F.name = "card-name-field", 
    _CARD_FIELD_TYPE_TO_F);
    var FIELD_STYLE = {
        height: "height",
        width: "width",
        color: "color",
        border: "border",
        borderTop: "border-top",
        borderLeft: "border-left",
        borderBottom: "border-bottom",
        borderRight: "border-right",
        display: "display",
        backgroundColor: "background-color",
        background: "background",
        appearance: "appearance",
        boxShadow: "box-shadow",
        direction: "direction",
        font: "font",
        fontFamily: "font-family",
        fontSizeAdjust: "font-size-adjust",
        fontSize: "font-size",
        fontStretch: "font-stretch",
        fontStyle: "font-style",
        fontVariantAlternates: "font-variant-alternates",
        fontVariantCaps: "font-variant-caps",
        fontVariantEastAsian: "font-variant-east-asian",
        fontVariantLigatures: "font-variant-ligatures",
        fontVariantNumeric: "font-variant-numeric",
        fontVariant: "font-variant",
        fontWeight: "font-weight",
        letterSpacing: "letter-spacing",
        lineHeight: "line-height",
        opacity: "opacity",
        outline: "outline",
        margin: "margin",
        marginTop: "margin-top",
        marginRight: "margin-right",
        marginBottom: "margin-bottom",
        marginLeft: "margin-left",
        padding: "padding",
        paddingTop: "padding-top",
        paddingRight: "padding-right",
        paddingBottom: "padding-bottom",
        paddingLeft: "padding-left",
        textAlign: "text-align",
        textShadow: "text-shadow",
        transition: "transition"
    };
    var VALIDATOR_TO_TYPE_MAP = ((_VALIDATOR_TO_TYPE_MA = {})[dist.types.AMERICAN_EXPRESS] = "AMEX", 
    _VALIDATOR_TO_TYPE_MA[dist.types.DINERS_CLUB] = "DINERS", _VALIDATOR_TO_TYPE_MA[dist.types.DISCOVER] = "DISCOVER", 
    _VALIDATOR_TO_TYPE_MA[dist.types.ELO] = "ELO", _VALIDATOR_TO_TYPE_MA[dist.types.HIPER] = "HIPER", 
    _VALIDATOR_TO_TYPE_MA[dist.types.HIPERCARD] = "HIPERCARD", _VALIDATOR_TO_TYPE_MA[dist.types.JCB] = "JCB", 
    _VALIDATOR_TO_TYPE_MA[dist.types.MASTERCARD] = "MASTER_CARD", _VALIDATOR_TO_TYPE_MA[dist.types.MAESTRO] = "MAESTRO", 
    _VALIDATOR_TO_TYPE_MA[dist.types.UNIONPAY] = "CHINA_UNION_PAY", _VALIDATOR_TO_TYPE_MA[dist.types.VISA] = "VISA", 
    _VALIDATOR_TO_TYPE_MA["cb-nationale"] = "CB_NATIONALE", _VALIDATOR_TO_TYPE_MA.cetelem = "CETELEM", 
    _VALIDATOR_TO_TYPE_MA.cofidis = "COFIDIS", _VALIDATOR_TO_TYPE_MA.cofinoga = "COFINOGA", 
    _VALIDATOR_TO_TYPE_MA);
    var DEFAULT_CARD_TYPE = {
        gaps: [ 4, 8, 12 ],
        lengths: [ 16 ],
        patterns: [],
        type: "Unknow",
        niceType: "Unknow",
        code: {
            name: "CVV",
            size: 3
        }
    };
    var DEFAULT_INPUT_STYLE = {
        border: "none",
        background: "transparent",
        height: "100%",
        width: "100%",
        fontFamily: "monospace",
        fontSize: "50vh",
        display: "inline-block"
    };
    var DEFAULT_STYLE = {
        input: DEFAULT_INPUT_STYLE,
        "input.number": {
            width: "60vw",
            marginRight: "2vw"
        },
        "input.cvv": {
            width: "16vw",
            marginRight: "2vw"
        },
        "input.expiry": {
            width: "20vw"
        }
    };
    var VALID_EXTRA_FIELDS = [ "billingAddress" ];
    dist_default.a.addCard({
        code: {
            name: "CVV",
            size: 3
        },
        gaps: [ 4, 8, 12 ],
        lengths: [ 16, 18, 19 ],
        niceType: "Carte Bancaire",
        patterns: [],
        type: "cb-nationale"
    });
    dist_default.a.addCard({
        code: {
            name: "CVV",
            size: 3
        },
        gaps: [ 4, 8, 12, 16 ],
        lengths: [ 19 ],
        niceType: "Carte Aurore",
        patterns: [],
        type: "cetelem"
    });
    dist_default.a.addCard({
        code: {
            name: "",
            size: 0
        },
        gaps: [ 4, 8, 12, 16 ],
        lengths: [ 17 ],
        niceType: "Cofinoga ou Privilège",
        patterns: [],
        type: "cofinoga"
    });
    dist_default.a.addCard({
        code: {
            name: "",
            size: 0
        },
        gaps: [ 4, 8 ],
        lengths: [ 8, 9 ],
        niceType: "4 étoiles",
        patterns: [],
        type: "cofidis"
    });
    var defaultNavigation = {
        next: function() {
            return belter.noop;
        },
        previous: function() {
            return belter.noop;
        }
    };
    var defaultInputState = {
        inputValue: "",
        maskedInputValue: "",
        cursorStart: 0,
        cursorEnd: 0,
        keyStrokeCount: 0,
        isPotentiallyValid: !0,
        isValid: !1
    };
    var initFieldValidity = {
        isValid: !1,
        isPotentiallyValid: !0
    };
    function splice(str, idx, insert) {
        return str.slice(0, idx) + insert + str.slice(idx);
    }
    function assertType(assertion, errorMsg) {
        if (!assertion) throw new TypeError(errorMsg);
    }
    function assertString() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
        assertType(args.every((function(s) {
            return "string" == typeof s;
        })), "Expected a string");
    }
    function removeSpaces(value) {
        return value.replace(/\s/g, "");
    }
    function detectCardType(number) {
        var _creditCardType;
        var cardType = null == (_creditCardType = dist_default()(number)) ? void 0 : _creditCardType[0];
        return cardType ? _extends({}, cardType, {
            type: VALIDATOR_TO_TYPE_MAP[cardType.type]
        }) : DEFAULT_CARD_TYPE;
    }
    function maskCard(number, cardType) {
        var _detectCardType;
        assertString(number);
        number = number.trim().replace(/[^0-9]/g, "").replace(/\s/g, "");
        var gaps = (null == cardType ? void 0 : cardType.gaps) || (null == (_detectCardType = detectCardType(number)) ? void 0 : _detectCardType.gaps);
        if (gaps) for (var idx = 0; idx < gaps.length; idx++) {
            var splicePoint = gaps[idx] + idx;
            if (splicePoint > number.length - 1) break;
            number = splice(number, splicePoint, " ");
        }
        return number;
    }
    function removeDateMask(date) {
        return date.trim().replace(/\s|\//g, "");
    }
    function styleToString(style) {
        void 0 === style && (style = {});
        var filteredStyles = function(rawStyles) {
            void 0 === rawStyles && (rawStyles = {});
            var camelKey = Object.keys(FIELD_STYLE);
            var dashKey = Object(belter.values)(FIELD_STYLE);
            return Object.keys(rawStyles).reduce((function(acc, key) {
                ("object" == typeof rawStyles[key] || camelKey.includes(key) || dashKey.includes(key)) && (acc[key] = rawStyles[key]);
                return acc;
            }), {});
        }(style);
        return Object.keys(filteredStyles).reduce((function(acc, key) {
            return acc + "  " + Object(belter.camelToDasherize)(key) + " " + ("object" == typeof style[key] ? "{ " + styleToString(style[key]) + " }" : ": " + style[key] + " ;");
        }), "");
    }
    function getStyles(style) {
        return Object.keys(style).reduce((function(acc, key) {
            "object" == typeof style[key] ? acc[0][key] = style[key] : acc[1][key] = style[key];
            return acc;
        }), [ {}, {} ]);
    }
    function removeNonDigits(value) {
        return removeSpaces(value).replace(/\D/g, "");
    }
    function getCvvLength(cardType) {
        if (cardType && "object" == typeof cardType) {
            var code = cardType.code;
            if ("object" == typeof code) {
                var size = code.size;
                if ("number" == typeof size) return size;
            }
        }
        return 3;
    }
    function setErrors(_ref) {
        var isCvvValid = _ref.isCvvValid, isExpiryValid = _ref.isExpiryValid, isNameValid = _ref.isNameValid, _ref$gqlErrorsObject = _ref.gqlErrorsObject, gqlErrorsObject = void 0 === _ref$gqlErrorsObject ? {} : _ref$gqlErrorsObject;
        var errors = [];
        var field = gqlErrorsObject.field, gqlErrors = gqlErrorsObject.errors;
        !1 === _ref.isNumberValid && ("number" === field && gqlErrors.length ? errors.push.apply(errors, gqlErrors) : errors.push("INVALID_NUMBER"));
        !1 === isExpiryValid && ("expiry" === field && gqlErrors.length ? errors.push.apply(errors, gqlErrors) : errors.push("INVALID_EXPIRY"));
        !1 === isCvvValid && ("cvv" === field && gqlErrors.length ? errors.push.apply(errors, gqlErrors) : errors.push("INVALID_CVV"));
        !1 === isNameValid && ("name" === field && gqlErrors.length ? errors.push.apply(errors, gqlErrors) : errors.push("INVALID_NAME"));
        return errors;
    }
    function moveCursor(element, start, end) {
        window.requestAnimationFrame((function() {
            element.selectionStart = start;
            element.selectionEnd = null != end ? end : start;
        }));
    }
    function goToNextField(ref) {
        return function() {
            moveCursor(ref.current.base, 0);
            setTimeout((function() {
                return ref.current.base.focus();
            }));
        };
    }
    function goToPreviousField(ref) {
        return function() {
            var value = ref.current.base.value;
            value && moveCursor(ref.current.base, value.length);
            setTimeout((function() {
                return ref.current.base.focus();
            }));
        };
    }
    function navigateOnKeyDown(event, navigation) {
        var _event$target = event.target, value = _event$target.value, selectionStart = _event$target.selectionStart, key = event.key;
        0 !== selectionStart || 0 !== value.length && value.length === _event$target.selectionEnd || ![ "Backspace", "ArrowLeft" ].includes(key) || navigation.previous();
        selectionStart === value.length && [ "ArrowRight" ].includes(key) && navigation.next();
    }
    function convertDateFormat(date) {
        var trimmedDate = removeSpaces(date);
        var splittedDate = trimmedDate.split("/");
        var formattedDate = trimmedDate;
        if (splittedDate[1] && 2 === splittedDate[1].length) {
            splittedDate[1] = "20" + splittedDate[1];
            formattedDate = splittedDate.join("/");
        }
        return formattedDate;
    }
    var sdk_constants = __webpack_require__(2);
    function callRestAPI(_ref) {
        var _extends2;
        var accessToken = _ref.accessToken, method = _ref.method, url = _ref.url, data = _ref.data, headers = _ref.headers, eventName = _ref.eventName;
        if (!accessToken) throw new Error("No access token passed to " + url);
        var requestHeaders = _extends(((_extends2 = {}).authorization = "Bearer " + accessToken, 
        _extends2["content-type"] = "application/json", _extends2), headers);
        return request({
            method: method,
            url: url,
            headers: requestHeaders,
            json: data
        }).then((function(_ref2) {
            var status = _ref2.status, body = _ref2.body, responseHeaders = _ref2.headers;
            if (status >= 300) {
                var error = new Error(url + " returned status " + status + " (Corr ID: " + responseHeaders["paypal-debug-id"] + ").\n\n" + JSON.stringify(body));
                error.response = {
                    status: status,
                    headers: responseHeaders,
                    body: body
                };
                if (429 === status) {
                    var _getLogger$track;
                    getLogger().track(((_getLogger$track = {}).transition_name = "call_rest_api", _getLogger$track.int_error_desc = "Error: " + status + " - " + body, 
                    _getLogger$track.info_msg = "URL: " + url, _getLogger$track));
                }
                getLogger().warn("rest_api_" + eventName + "_error");
                throw error;
            }
            return body;
        }));
    }
    function callSmartAPI(_ref3) {
        var accessToken = _ref3.accessToken, url = _ref3.url, _ref3$method = _ref3.method, method = void 0 === _ref3$method ? "get" : _ref3$method, _ref3$headers = _ref3.headers, reqHeaders = void 0 === _ref3$headers ? {} : _ref3$headers, json = _ref3.json, _ref3$authenticated = _ref3.authenticated, authenticated = void 0 === _ref3$authenticated || _ref3$authenticated, eventName = _ref3.eventName;
        reqHeaders["x-requested-by"] = "smart-payment-buttons";
        if (authenticated && !accessToken) throw new Error("Buyer access token not present - can not call smart api: " + url);
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
                err.response = {
                    url: url,
                    method: method,
                    headers: reqHeaders,
                    body: body
                };
                err.data = body.data;
                getLogger().warn("smart_api_" + eventName + "_contingency_error");
                throw err;
            }
            if (429 === status) {
                var _getLogger$track2;
                getLogger().track(((_getLogger$track2 = {}).transition_name = "call_rest_api", _getLogger$track2.int_error_desc = "Error: " + status + " - " + body, 
                _getLogger$track2.info_msg = "URL: " + url, _getLogger$track2));
            }
            if (status > 400) {
                getLogger().warn("smart_api_" + eventName + "_status_" + status + "_error");
                throw new Error("Api: " + url + " returned status code: " + status + " (Corr ID: " + headers["paypal-debug-id"] + ")\n\n" + JSON.stringify(body));
            }
            if ("success" !== body.ack) {
                getLogger().warn("smart_api_" + eventName + "_ack_error");
                throw new Error("Api: " + url + " returned ack: " + body.ack + " (Corr ID: " + headers["paypal-debug-id"] + ")\n\n" + JSON.stringify(body));
            }
            return {
                data: body.data,
                headers: headers
            };
        }));
    }
    function callGraphQL(_ref5) {
        var name = _ref5.name, _ref5$variables = _ref5.variables, _ref5$headers = _ref5.headers, _ref5$returnErrorObje = _ref5.returnErrorObject, returnErrorObject = void 0 !== _ref5$returnErrorObje && _ref5$returnErrorObje;
        return request({
            url: "/graphql?" + name,
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
                getLogger().warn("graphql_" + name + "_error", {
                    err: message
                });
                if (returnErrorObject) throw errors[0];
                throw new Error(message);
            }
            if (200 !== status) {
                getLogger().warn("graphql_" + name + "_status_" + status + "_error");
                throw new Error("/graphql returned status " + status + "\n\n" + JSON.stringify(body));
            }
            return body.data;
        }));
    }
    function getResponseCorrelationID(res) {
        return res.headers["paypal-debug-id"];
    }
    function getErrorResponseCorrelationID(err) {
        var res = null == err ? void 0 : err.response;
        if (res) return getResponseCorrelationID(res);
    }
    function createAccessToken(clientID, _temp) {
        var targetSubject = (void 0 === _temp ? {} : _temp).targetSubject;
        return inlineMemoize(createAccessToken, (function() {
            getLogger().info("rest_api_create_access_token");
            var basicAuth = base64encode((clientID || "") + ":");
            var data = {
                grant_type: "client_credentials"
            };
            targetSubject && (data.target_subject = targetSubject);
            return request({
                method: "post",
                url: "/v1/oauth2/token",
                headers: {
                    Authorization: "Basic " + basicAuth
                },
                data: data
            }).then((function(_ref2) {
                var body = _ref2.body;
                if (body && "invalid_client" === body.error) {
                    getLogger().warn("rest_api_v1_oauth2_token_create_error", {
                        err: "invalid client id"
                    });
                    throw new Error("Auth Api invalid client id: " + (clientID || "") + ":\n\n" + JSON.stringify(body, null, 4));
                }
                if (!body || !body.access_token) {
                    getLogger().warn("rest_api_v1_oauth2_token_create_error");
                    throw new Error("Auth Api response error:\n\n" + JSON.stringify(body, null, 4));
                }
                return body.access_token;
            }));
        }), [ clientID, targetSubject ]);
    }
    var lsatUpgradeCalled = !1;
    var lsatUpgradeError;
    var getLsatUpgradeCalled = function() {
        return lsatUpgradeCalled;
    };
    var getLsatUpgradeError = function() {
        return lsatUpgradeError;
    };
    function isProcessorDeclineError(err) {
        var _err$response, _err$response$body, _err$response$body$da, _err$response$body$da2;
        return Boolean(null == err || null == (_err$response = err.response) || null == (_err$response$body = _err$response.body) || null == (_err$response$body$da = _err$response$body.data) || null == (_err$response$body$da2 = _err$response$body$da.details) ? void 0 : _err$response$body$da2.some((function(detail) {
            return "INSTRUMENT_DECLINED" === detail.issue || "PAYER_ACTION_REQUIRED" === detail.issue;
        })));
    }
    function isUnprocessableEntityError(err) {
        var _err$response2, _err$response2$body, _err$response2$body$d;
        return Boolean(null == err || null == (_err$response2 = err.response) || null == (_err$response2$body = _err$response2.body) || null == (_err$response2$body$d = _err$response2$body.details) ? void 0 : _err$response2$body$d.some((function(detail) {
            return "DUPLICATE_INVOICE_ID" === detail.issue;
        })));
    }
    function patchOrder(orderID, data, _ref8) {
        var _headers13;
        var facilitatorAccessToken = _ref8.facilitatorAccessToken, buyerAccessToken = _ref8.buyerAccessToken, partnerAttributionID = _ref8.partnerAttributionID, _ref8$forceRestAPI = _ref8.forceRestAPI, forceRestAPI = void 0 !== _ref8$forceRestAPI && _ref8$forceRestAPI;
        getLogger().info("patch_order_lsat_upgrade_" + (getLsatUpgradeCalled() ? "called" : "not_called"));
        getLogger().info("patch_order_lsat_upgrade_" + (getLsatUpgradeError() ? "errored" : "did_not_error"), {
            err: stringifyError(getLsatUpgradeError())
        });
        if (forceRestAPI && !getLsatUpgradeError()) {
            var _headers11;
            return callRestAPI({
                accessToken: facilitatorAccessToken,
                method: "PATCH",
                eventName: "v2_checkout_orders_patch",
                url: "/v2/checkout/orders/" + orderID,
                data: data,
                headers: (_headers11 = {}, _headers11["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                _headers11.prefer = "return=representation", _headers11)
            }).catch((function(err) {
                var _headers12;
                var restCorrID = getErrorResponseCorrelationID(err);
                getLogger().warn("patch_order_call_rest_api_error", {
                    restCorrID: restCorrID,
                    orderID: orderID,
                    err: stringifyError(err)
                });
                return callSmartAPI({
                    accessToken: buyerAccessToken,
                    method: "post",
                    eventName: "order_patch",
                    url: "/smart/api/order/" + orderID + "/patch",
                    json: {
                        data: Array.isArray(data) ? {
                            patch: data
                        } : data
                    },
                    headers: (_headers12 = {}, _headers12["paypal-client-context"] = orderID, _headers12)
                }).then((function(res) {
                    var smartCorrID = getResponseCorrelationID(res);
                    getLogger().info("patch_order_smart_fallback_success", {
                        smartCorrID: smartCorrID,
                        restCorrID: restCorrID,
                        orderID: orderID
                    });
                    return res.data;
                })).catch((function(smartErr) {
                    var smartCorrID = getErrorResponseCorrelationID(err);
                    getLogger().info("patch_order_smart_fallback_error", {
                        smartCorrID: smartCorrID,
                        restCorrID: restCorrID,
                        orderID: orderID,
                        err: stringifyError(smartErr)
                    });
                    throw smartErr;
                }));
            }));
        }
        getLogger().info("lsat_upgrade_false");
        return callSmartAPI({
            accessToken: buyerAccessToken,
            method: "post",
            eventName: "order_patch",
            url: "/smart/api/order/" + orderID + "/patch",
            json: {
                data: Array.isArray(data) ? {
                    patch: data
                } : data
            },
            headers: (_headers13 = {}, _headers13["paypal-client-context"] = orderID, _headers13)
        }).then((function(_ref9) {
            return _ref9.data;
        }));
    }
    function billingTokenToOrderID(billingToken) {
        return callSmartAPI({
            authenticated: !1,
            method: "post",
            eventName: "payment_ectoken",
            url: "/smart/api/payment/" + billingToken + "/ectoken"
        }).then((function(_ref13) {
            return _ref13.data.token;
        }));
    }
    function subscriptionIdToCartId(subscriptionID) {
        return callSmartAPI({
            authenticated: !1,
            method: "post",
            eventName: "billagmt_subscriptions_cartid",
            url: "/smart/api/billagmt/subscriptions/" + subscriptionID + "/cartid"
        }).then((function(_ref14) {
            return _ref14.data.token;
        }));
    }
    var getSupplementalOrderInfo = memoize((function(orderID) {
        var _headers21;
        return callGraphQL({
            name: "GetCheckoutDetails",
            query: "\n            query GetCheckoutDetails($orderID: String!) {\n                checkoutSession(token: $orderID) {\n                    cart {\n                        billingType\n                        intent\n                        paymentId\n                        billingToken\n                        amounts {\n                            total {\n                                currencyValue\n                                currencyCode\n                                currencyFormatSymbolISOCurrency\n                            }\n                        }\n                        supplementary {\n                            initiationIntent\n                        }\n                        category\n                    }\n                    flags {\n                        isChangeShippingAddressAllowed\n                    }\n                    payees {\n                        merchantId\n                        email {\n                            stringValue\n                        }\n                    }\n                }\n            }\n        ",
            variables: {
                orderID: orderID
            },
            headers: (_headers21 = {}, _headers21["paypal-client-context"] = orderID, _headers21)
        });
    }));
    function createRequest(accessToken, subscriptionPayload, partnerAttributionID, eventName) {
        return request({
            method: "post",
            url: "/v1/billing/subscriptions",
            headers: {
                Authorization: "Bearer " + accessToken,
                "PayPal-Partner-Attribution-Id": partnerAttributionID || ""
            },
            json: subscriptionPayload
        }).then((function(_ref) {
            var body = _ref.body;
            if (!body || !body.id) {
                getLogger().warn("rest_api_" + eventName + "_error");
                throw new Error("Create Subscription Api response error:\n\n" + JSON.stringify(body, null, 4));
            }
            return body.id;
        }));
    }
    function reviseRequest(accessToken, subscriptionID, subscriptionPayload, partnerAttributionID, eventName) {
        return request({
            method: "post",
            url: "/v1/billing/subscriptions/" + subscriptionID + "/revise",
            headers: {
                Authorization: "Bearer " + accessToken,
                "PayPal-Partner-Attribution-Id": partnerAttributionID || ""
            },
            json: subscriptionPayload
        }).then((function(_ref3) {
            var body = _ref3.body, status = _ref3.status;
            if (200 !== status) {
                getLogger().warn("rest_api_" + eventName + "_error");
                throw new Error("Revise Subscription Api HTTP-" + status + " response: error:\n\n" + JSON.stringify(body, null, 4));
            }
            return subscriptionID;
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
    var _FRAUDNET_URL;
    var FRAUDNET_URL = ((_FRAUDNET_URL = {}).local = "https://www.stage2d0107.stage.paypal.com/FDRegression/fb.js", 
    _FRAUDNET_URL.stage = "https://www.stage2d0107.stage.paypal.com/FDRegression/fb.js", 
    _FRAUDNET_URL.sandbox = "https://c.paypal.com/da/r/fb.js", _FRAUDNET_URL.production = "https://c.paypal.com/da/r/fb.js", 
    _FRAUDNET_URL.test = "https://c.paypal.com/da/r/fb.js", _FRAUDNET_URL);
    memoize((function(_ref) {
        var env = _ref.env, clientMetadataID = _ref.clientMetadataID, cspNonce = _ref.cspNonce, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 1e3 : _ref$timeout;
        return new promise_ZalgoPromise((function(resolve) {
            var config = {
                f: clientMetadataID,
                s: "SMART_PAYMENT_BUTTONS",
                cb1: "fnCallback"
            };
            "sandbox" === env && (config.sandbox = !0);
            var configScript = document.createElement("script");
            configScript.setAttribute("nonce", cspNonce || "");
            configScript.setAttribute("type", "application/json");
            configScript.setAttribute("id", "fconfig");
            configScript.setAttribute("fncls", "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99");
            configScript.textContent = JSON.stringify(config);
            var fraudnetScript = document.createElement("script");
            fraudnetScript.setAttribute("nonce", cspNonce || "");
            fraudnetScript.setAttribute("src", FRAUDNET_URL[env]);
            fraudnetScript.addEventListener("error", (function() {
                return resolve();
            }));
            window.fnCallback = resolve;
            setTimeout(resolve, timeout);
            var body = util_getBody();
            body.appendChild(configScript);
            body.appendChild(fraudnetScript);
        }));
    }));
    memoize((function(_ref) {
        var _headers;
        var _ref$amount = _ref.amount, _ref$vetted = _ref.vetted, _ref$allowBillingPaym = _ref.allowBillingPayments;
        return callGraphQL({
            name: "GetSmartWallet",
            query: "\n            query GetSmartWallet(\n                $clientID: String!\n                $merchantID: [String!]\n                $currency: String\n                $amount: String\n                $userIDToken: String\n                $vetted: Boolean\n                $paymentMethodToken: String\n                $branded: Boolean,\n                $allowBillingPayments: Boolean\n            ) {\n                smartWallet(\n                    clientId: $clientID\n                    merchantId: $merchantID\n                    currency: $currency\n                    amount: $amount\n                    userIdToken: $userIDToken\n                    vetted: $vetted\n                    paymentMethodNonce: $paymentMethodToken\n                    branded: $branded,\n                    allowBillingPayments: $allowBillingPayments\n                ) {\n                    paypal {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                            accessToken\n                        }\n                    }\n                    credit {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                            accessToken\n                        }\n                    }\n                    card {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                        }\n                    }\n                }\n            }\n        ",
            variables: {
                clientID: _ref.clientID,
                merchantID: _ref.merchantID,
                currency: _ref.currency,
                amount: void 0 === _ref$amount ? "0.00" : _ref$amount,
                userIDToken: _ref.userIDToken,
                vetted: void 0 === _ref$vetted || _ref$vetted,
                paymentMethodToken: _ref.paymentMethodToken,
                branded: _ref.branded,
                allowBillingPayments: void 0 === _ref$allowBillingPaym || _ref$allowBillingPaym
            },
            headers: (_headers = {}, _headers["paypal-client-metadata-id"] = _ref.clientMetadataID, 
            _headers)
        }).then((function(_ref2) {
            return _ref2.smartWallet;
        }));
    }));
    function getCreateOrder(_ref5, _ref6) {
        var createOrder = _ref5.createOrder, currency = _ref5.currency;
        var createBillingAgreement = _ref6.createBillingAgreement, createSubscription = _ref6.createSubscription;
        var data = {
            paymentSource: _ref5.paymentSource
        };
        var actions = function(_ref4) {
            var facilitatorAccessToken = _ref4.facilitatorAccessToken, intent = _ref4.intent, currency = _ref4.currency, merchantID = _ref4.merchantID, partnerAttributionID = _ref4.partnerAttributionID;
            var order = function(_ref2) {
                var facilitatorAccessToken = _ref2.facilitatorAccessToken, intent = _ref2.intent, currency = _ref2.currency, merchantID = _ref2.merchantID, partnerAttributionID = _ref2.partnerAttributionID;
                return {
                    create: function(data) {
                        var order = _extends({}, data);
                        if (order.intent && order.intent.toLowerCase() !== intent) throw new Error("Unexpected intent: " + order.intent + " passed to order.create. Please ensure you are passing /sdk/js?intent=" + order.intent.toLowerCase() + " in the paypal script tag.");
                        (order = _extends({}, order, {
                            intent: intent.toUpperCase()
                        })).purchase_units = order.purchase_units.map((function(unit) {
                            if (unit.amount.currency_code && unit.amount.currency_code !== currency) throw new Error("Unexpected currency: " + unit.amount.currency_code + " passed to order.create. Please ensure you are passing /sdk/js?currency=" + unit.amount.currency_code + " in the paypal script tag.");
                            var payee = unit.payee;
                            if (merchantID && 1 === merchantID.length && merchantID[0]) {
                                var payeeID = merchantID[0];
                                payee = isEmailAddress(payeeID) ? _extends({}, payee, {
                                    email_address: payeeID
                                }) : _extends({}, payee, {
                                    merchant_id: payeeID
                                });
                            }
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
                                eventName: "v2_checkout_orders_create",
                                data: order,
                                headers: (_headers = {}, _headers["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                _headers.prefer = "return=representation", _headers)
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
            !function(_ref3) {
                var facilitatorAccessToken = _ref3.facilitatorAccessToken, intent = _ref3.intent, currency = _ref3.currency, merchantID = _ref3.merchantID, partnerAttributionID = _ref3.partnerAttributionID;
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
            facilitatorAccessToken: _ref6.facilitatorAccessToken,
            intent: _ref5.intent,
            currency: currency,
            merchantID: _ref5.merchantID,
            partnerAttributionID: _ref5.partnerAttributionID
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
            })).catch((function(err) {
                getLogger().error("create_order_error", {
                    err: stringifyError(err)
                });
                throw err;
            })).then((function(orderID) {
                var _getLogger$addPayload;
                if (!orderID || "string" != typeof orderID) throw new Error("Expected an order id to be passed");
                if (0 === orderID.indexOf("PAY-") || 0 === orderID.indexOf("PAYID-")) throw new Error("Do not pass PAY-XXX or PAYID-XXX directly into createOrder. Pass the EC-XXX token instead");
                var duration = Date.now() - startTime;
                getLogger().addPayloadBuilder((function() {
                    return {
                        token: orderID
                    };
                })).addTrackingBuilder((function() {
                    var _ref7;
                    return (_ref7 = {}).context_type = "EC-Token", _ref7.context_id = orderID, _ref7.token = orderID, 
                    _ref7;
                })).track((_getLogger$addPayload = {}, _getLogger$addPayload.state_name = "smart_button", 
                _getLogger$addPayload.transition_name = "process_receive_order", _getLogger$addPayload.context_type = "EC-Token", 
                _getLogger$addPayload.context_id = orderID, _getLogger$addPayload.token = orderID, 
                _getLogger$addPayload.response_duration = duration.toString(), _getLogger$addPayload)).flush();
                return orderID;
            }));
        }));
    }
    var onApprove_redirect = function(url) {
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
    };
    var onApprove_handleProcessorError = function(err, restart, onError) {
        if (isUnprocessableEntityError(err)) {
            err && err.response && (err.message = JSON.stringify(err.response) || err.message);
            return onError(err).then(unresolvedPromise);
        }
        if (isProcessorDeclineError(err)) return restart().then(unresolvedPromise);
        throw err;
    };
    var onComplete_redirect = function(url) {
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
    };
    var _excluded = [ "buyerAccessToken", "forceRestAPI" ];
    function getProps(_ref) {
        var facilitatorAccessToken = _ref.facilitatorAccessToken, branded = _ref.branded, paymentSource = _ref.paymentSource;
        var xprops = window.xprops;
        var uid = xprops.uid, env = xprops.env, _xprops$vault = xprops.vault, vault = void 0 !== _xprops$vault && _xprops$vault, commit = xprops.commit, locale = xprops.locale, platform = xprops.platform, sessionID = xprops.sessionID, clientID = xprops.clientID, partnerAttributionID = xprops.partnerAttributionID, merchantRequestedPopupsDisabled = xprops.merchantRequestedPopupsDisabled, clientMetadataID = xprops.clientMetadataID, sdkCorrelationID = xprops.sdkCorrelationID, getParentDomain = xprops.getParentDomain, clientAccessToken = xprops.clientAccessToken, getPopupBridge = xprops.getPopupBridge, getPrerenderDetails = xprops.getPrerenderDetails, getPageUrl = xprops.getPageUrl, enableThreeDomainSecure = xprops.enableThreeDomainSecure, enableVaultInstallments = xprops.enableVaultInstallments, _xprops$enableNativeC = xprops.enableNativeCheckout, enableNativeCheckout = void 0 !== _xprops$enableNativeC && _xprops$enableNativeC, _xprops$experience = xprops.experience, experience = void 0 === _xprops$experience ? "" : _xprops$experience, rememberFunding = xprops.remember, stageHost = xprops.stageHost, apiStageHost = xprops.apiStageHost, getParent = xprops.getParent, fundingSource = xprops.fundingSource, currency = xprops.currency, connect = xprops.connect, intent = xprops.intent, merchantID = xprops.merchantID, amount = xprops.amount, userIDToken = xprops.userIDToken, enableFunding = xprops.enableFunding, disableFunding = xprops.disableFunding, disableCard = xprops.disableCard, disableAutocomplete = xprops.disableAutocomplete, wallet = xprops.wallet, _xprops$paymentMethod = xprops.paymentMethodToken, paymentMethodToken = void 0 === _xprops$paymentMethod ? xprops.paymentMethodNonce : _xprops$paymentMethod, _xprops$getQueriedEli = xprops.getQueriedEligibleFunding, getQueriedEligibleFunding = void 0 === _xprops$getQueriedEli ? function() {
            return promise_ZalgoPromise.resolve([]);
        } : _xprops$getQueriedEli, storageID = xprops.storageID, applePay = xprops.applePay, userExperienceFlow = xprops.userExperienceFlow, allowBillingPayments = xprops.allowBillingPayments;
        var onInit = function(_ref) {
            var onInit = _ref.onInit;
            return function(data) {
                var enabled = !0;
                return {
                    initPromise: promise_ZalgoPromise.try((function() {
                        if (onInit) return onInit(data, (set = function(val) {
                            enabled = val;
                        }, {
                            enable: function() {
                                return promise_ZalgoPromise.try((function() {
                                    return set(!0);
                                }));
                            },
                            disable: function() {
                                return promise_ZalgoPromise.try((function() {
                                    return set(!1);
                                }));
                            }
                        }));
                        var set;
                    })),
                    isEnabled: function() {
                        return enabled;
                    }
                };
            };
        }({
            onInit: xprops.onInit
        });
        var merchantDomain = "function" == typeof getParentDomain ? getParentDomain() : "unknown";
        enableFunding = enableFunding || [];
        disableFunding = disableFunding || [];
        var onClick = function(_ref2) {
            var onClick = _ref2.onClick;
            if (onClick) return memoize((function(_ref3) {
                return onClick((_ref = {
                    fundingSource: _ref3.fundingSource
                }, {
                    fundingSource: _ref.fundingSource
                }), {
                    resolve: function() {
                        return promise_ZalgoPromise.try((function() {
                            return !0;
                        }));
                    },
                    reject: function() {
                        return promise_ZalgoPromise.try((function() {
                            return !1;
                        }));
                    }
                }).then((function(valid) {
                    return !1 !== valid;
                }));
                var _ref;
            }));
        }({
            onClick: xprops.onClick
        });
        var stickinessID = storageID && getSDKStorage().isStateFresh() ? storageID : getSDKStorage().getID();
        var createBillingAgreement = function(_ref2) {
            var createBillingAgreement = _ref2.createBillingAgreement, paymentSource = _ref2.paymentSource;
            if (createBillingAgreement) return function() {
                return createBillingAgreement((_ref = {
                    paymentSource: paymentSource
                }, {
                    paymentSource: _ref.paymentSource
                }), {}).then((function(billingToken) {
                    if (!billingToken || "string" != typeof billingToken) throw new Error("Expected a billing token to be passed to createBillingAgreement");
                    return billingToken;
                }));
                var _ref;
            };
        }({
            createBillingAgreement: xprops.createBillingAgreement,
            paymentSource: paymentSource
        });
        var createSubscription = function(_ref3, _ref4) {
            var createSubscription = _ref3.createSubscription, partnerAttributionID = _ref3.partnerAttributionID, merchantID = _ref3.merchantID, clientID = _ref3.clientID, paymentSource = _ref3.paymentSource;
            var facilitatorAccessToken = _ref4.facilitatorAccessToken;
            if (createSubscription) {
                if (merchantID && merchantID[0]) {
                    getLogger().info("src_props_subscriptions_recreate_access_token_cache");
                    createAccessToken(clientID, {
                        targetSubject: merchantID[0]
                    });
                }
                return function() {
                    return createSubscription((_ref = {
                        paymentSource: paymentSource
                    }, {
                        paymentSource: _ref.paymentSource
                    }), function(_ref2) {
                        var facilitatorAccessToken = _ref2.facilitatorAccessToken, partnerAttributionID = _ref2.partnerAttributionID, merchantID = _ref2.merchantID, clientID = _ref2.clientID;
                        return {
                            subscription: {
                                create: function(data) {
                                    return function(accessToken, subscriptionPayload, _ref2) {
                                        var partnerAttributionID = _ref2.partnerAttributionID, merchantID = _ref2.merchantID, clientID = _ref2.clientID;
                                        getLogger().info("rest_api_create_subscription_id");
                                        if (!subscriptionPayload) throw new Error("Expected subscription payload to be passed");
                                        if (merchantID && merchantID[0]) {
                                            getLogger().info("rest_api_subscriptions_recreate_access_token");
                                            return createAccessToken(clientID, {
                                                targetSubject: merchantID[0]
                                            }).then((function(thirdPartyAccessToken) {
                                                return createRequest(thirdPartyAccessToken, subscriptionPayload, partnerAttributionID, "v1_billing_subscriptions_recreate");
                                            }));
                                        }
                                        if (!accessToken) throw new Error("Access token not passed");
                                        return createRequest(accessToken, subscriptionPayload, partnerAttributionID, "v1_billing_subscriptions_create");
                                    }(facilitatorAccessToken, data, {
                                        partnerAttributionID: partnerAttributionID,
                                        merchantID: merchantID,
                                        clientID: clientID
                                    });
                                },
                                revise: function(subscriptionID, data) {
                                    return function(accessToken, subscriptionID, subscriptionPayload, _ref4) {
                                        var partnerAttributionID = _ref4.partnerAttributionID, merchantID = _ref4.merchantID, clientID = _ref4.clientID;
                                        getLogger().info("rest_api_create_subscription_id");
                                        if (!subscriptionID) throw new Error("Expected subscription id to be passed as first argument to revise subscription api");
                                        if (!subscriptionPayload) throw new Error("Expected subscription payload to be passed");
                                        if (merchantID && merchantID[0]) {
                                            getLogger().info("rest_api_subscriptions_recreate_access_token");
                                            return createAccessToken(clientID, {
                                                targetSubject: merchantID[0]
                                            }).then((function(thirdPartyAccessToken) {
                                                return reviseRequest(thirdPartyAccessToken, subscriptionID, subscriptionPayload, partnerAttributionID, "v1_billing_subscriptions_revise_recreate");
                                            }));
                                        }
                                        if (!accessToken) throw new Error("Access token not passed");
                                        return reviseRequest(accessToken, subscriptionID, subscriptionPayload, partnerAttributionID, "v1_billing_subscriptions_revise_create");
                                    }(facilitatorAccessToken, subscriptionID, data, {
                                        partnerAttributionID: partnerAttributionID,
                                        merchantID: merchantID,
                                        clientID: clientID
                                    });
                                }
                            }
                        };
                    }({
                        facilitatorAccessToken: facilitatorAccessToken,
                        partnerAttributionID: partnerAttributionID,
                        merchantID: merchantID,
                        clientID: clientID
                    })).then((function(subscriptionID) {
                        if (!subscriptionID || "string" != typeof subscriptionID) throw new Error("Expected an subscription id to be passed to createSubscription");
                        return subscriptionID;
                    }));
                    var _ref;
                };
            }
        }({
            createSubscription: xprops.createSubscription,
            partnerAttributionID: partnerAttributionID,
            merchantID: merchantID,
            clientID: clientID,
            paymentSource: paymentSource
        }, {
            facilitatorAccessToken: facilitatorAccessToken
        });
        var createOrder = getCreateOrder({
            createOrder: xprops.createOrder,
            currency: currency,
            intent: intent,
            merchantID: merchantID,
            partnerAttributionID: partnerAttributionID,
            paymentSource: paymentSource
        }, {
            facilitatorAccessToken: facilitatorAccessToken,
            createBillingAgreement: createBillingAgreement,
            createSubscription: createSubscription
        });
        var onError = function(_ref) {
            var onError = _ref.onError;
            var onErrorHandler = onError ? (handler = onError, seenErrors = [], seenStringifiedErrors = {}, 
            function(err) {
                if (-1 === seenErrors.indexOf(err)) {
                    seenErrors.push(err);
                    var stringifiedError = stringifyError(err);
                    if (!seenStringifiedErrors[stringifiedError]) {
                        seenStringifiedErrors[stringifiedError] = !0;
                        return handler(err);
                    }
                }
            }) : src_util_noop;
            var handler, seenErrors, seenStringifiedErrors;
            return function(err) {
                return promise_ZalgoPromise.try((function() {
                    return onErrorHandler(err);
                }));
            };
        }({
            onError: xprops.onError
        });
        var onApprove = function(_ref19) {
            var intent = _ref19.intent, createSubscription = _ref19.createSubscription, onApprove = _ref19.onApprove, partnerAttributionID = _ref19.partnerAttributionID, onError = _ref19.onError, clientAccessToken = _ref19.clientAccessToken, vault = _ref19.vault, clientID = _ref19.clientID, facilitatorAccessToken = _ref19.facilitatorAccessToken, branded = _ref19.branded, createOrder = _ref19.createOrder, paymentSource = _ref19.paymentSource;
            if (_ref19.createBillingAgreement) return function(_ref10) {
                var _ref10$onApprove = _ref10.onApprove, onApprove = void 0 === _ref10$onApprove ? function() {
                    throw new Error("Expected onApprove");
                } : _ref10$onApprove, onError = _ref10.onError, facilitatorAccessToken = _ref10.facilitatorAccessToken, createOrder = _ref10.createOrder, paymentSource = _ref10.paymentSource;
                if (!onApprove) throw new Error("Expected onApprove");
                return memoize((function(_ref11, _ref12) {
                    var payerID = _ref11.payerID, paymentID = _ref11.paymentID, billingToken = _ref11.billingToken;
                    var restart = _ref12.restart;
                    return createOrder().then((function(orderID) {
                        var _getLogger$info$track2;
                        getLogger().info("button_approve").track((_getLogger$info$track2 = {}, _getLogger$info$track2.transition_name = "process_checkout_approve", 
                        _getLogger$info$track2.context_type = "EC-Token", _getLogger$info$track2.token = orderID, 
                        _getLogger$info$track2.context_id = orderID, _getLogger$info$track2)).flush();
                        return getSupplementalOrderInfo(orderID).then((function(supplementalData) {
                            return onApprove({
                                orderID: orderID,
                                payerID: payerID,
                                paymentID: paymentID = paymentID || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.paymentId,
                                billingToken: billingToken = billingToken || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.billingToken,
                                facilitatorAccessToken: facilitatorAccessToken,
                                paymentSource: paymentSource
                            }, {
                                restart: restart,
                                redirect: onApprove_redirect
                            }).catch((function(err) {
                                return promise_ZalgoPromise.try((function() {
                                    return onError(err);
                                })).then((function() {
                                    throw err;
                                }));
                            }));
                        }));
                    }));
                }));
            }({
                onApprove: onApprove,
                onError: onError,
                facilitatorAccessToken: facilitatorAccessToken,
                createOrder: createOrder,
                paymentSource: paymentSource
            });
            if ("subscription" === intent || createSubscription) return function(_ref16) {
                var _ref16$onApprove = _ref16.onApprove, onApprove = void 0 === _ref16$onApprove ? function() {
                    throw new Error("Expected onApprove");
                } : _ref16$onApprove, onError = _ref16.onError, facilitatorAccessToken = _ref16.facilitatorAccessToken, createOrder = _ref16.createOrder, paymentSource = _ref16.paymentSource;
                if (!onApprove) throw new Error("Expected onApprove");
                return memoize((function(_ref17, _ref18) {
                    var payerID = _ref17.payerID, subscriptionID = _ref17.subscriptionID, buyerAccessToken = _ref17.buyerAccessToken;
                    var restart = _ref18.restart;
                    if (!subscriptionID) throw new Error("Expected subscriptionID");
                    return createOrder().then((function(orderID) {
                        var _getLogger$info$track4;
                        getLogger().info("button_approve").track((_getLogger$info$track4 = {}, _getLogger$info$track4.transition_name = "process_checkout_approve", 
                        _getLogger$info$track4.context_type = "EC-Token", _getLogger$info$track4.token = orderID, 
                        _getLogger$info$track4.context_id = orderID, _getLogger$info$track4)).flush();
                        var data = {
                            orderID: orderID,
                            payerID: payerID,
                            subscriptionID: subscriptionID,
                            facilitatorAccessToken: facilitatorAccessToken,
                            paymentSource: paymentSource
                        };
                        var actions = function(_ref6) {
                            var restart = _ref6.restart, subscriptionID = _ref6.subscriptionID, buyerAccessToken = _ref6.buyerAccessToken;
                            return {
                                subscription: {
                                    get: memoize((function() {
                                        if (!subscriptionID) throw new Error("No subscription ID present");
                                        return function(subscriptionID, _ref7) {
                                            return callSmartAPI({
                                                accessToken: _ref7.buyerAccessToken,
                                                eventName: "billagmt_subscriptions_get",
                                                url: "/smart/api/billagmt/subscriptions/" + subscriptionID
                                            }).then((function(_ref8) {
                                                return _ref8.data;
                                            }));
                                        }(subscriptionID, {
                                            buyerAccessToken: buyerAccessToken
                                        });
                                    })),
                                    activate: memoize((function() {
                                        if (!subscriptionID) throw new Error("No subscription ID present");
                                        return function(subscriptionID, _ref5) {
                                            return callSmartAPI({
                                                accessToken: _ref5.buyerAccessToken,
                                                method: "post",
                                                eventName: "billagmt_subscriptions_activate",
                                                url: "/smart/api/billagmt/subscriptions/" + subscriptionID + "/activate"
                                            }).then((function(_ref6) {
                                                return _ref6.data;
                                            }));
                                        }(subscriptionID, {
                                            buyerAccessToken: buyerAccessToken
                                        });
                                    }))
                                },
                                restart: restart,
                                redirect: onApprove_redirect
                            };
                        }({
                            restart: restart,
                            subscriptionID: subscriptionID,
                            buyerAccessToken: buyerAccessToken
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
            }({
                clientID: clientID,
                onApprove: onApprove,
                onError: onError,
                facilitatorAccessToken: facilitatorAccessToken,
                createOrder: createOrder,
                paymentSource: paymentSource
            });
            if ("capture" === intent || "authorize" === intent || "order" === intent) return function(_ref7) {
                var intent = _ref7.intent, _ref7$onApprove = _ref7.onApprove, onApprove = void 0 === _ref7$onApprove ? function(intent) {
                    return function(data, actions) {
                        if ("capture" === intent) return actions.order.capture().then(src_util_noop);
                        if ("authorize" === intent) return actions.order.authorize().then(src_util_noop);
                        throw new Error("Unsupported intent for auto-capture: " + intent);
                    };
                }(intent) : _ref7$onApprove, partnerAttributionID = _ref7.partnerAttributionID, onError = _ref7.onError, clientAccessToken = _ref7.clientAccessToken, vault = _ref7.vault, clientID = _ref7.clientID, facilitatorAccessToken = _ref7.facilitatorAccessToken, branded = _ref7.branded, createOrder = _ref7.createOrder, paymentSource = _ref7.paymentSource;
                if (!onApprove) throw new Error("Expected onApprove");
                var upgradeLSAT = -1 === LSAT_UPGRADE_EXCLUDED_MERCHANTS.indexOf(clientID);
                return memoize((function(_ref8, _ref9) {
                    var payerID = _ref8.payerID, paymentID = _ref8.paymentID, billingToken = _ref8.billingToken, buyerAccessToken = _ref8.buyerAccessToken, authCode = _ref8.authCode, _ref8$forceRestAPI = _ref8.forceRestAPI, forceRestAPI = void 0 === _ref8$forceRestAPI ? upgradeLSAT : _ref8$forceRestAPI;
                    var restart = _ref9.restart;
                    return createOrder().then((function(orderID) {
                        var _getLogger$info$track;
                        getLogger().info("button_approve").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_approve", 
                        _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                        _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                        billingToken || clientAccessToken || vault || !payerID && branded && getLogger().warn("onapprove_payerid_not_present_for_branded_standalone_button", {
                            orderID: orderID
                        }).flush();
                        return getSupplementalOrderInfo(orderID).then((function(supplementalData) {
                            var data = {
                                orderID: orderID,
                                payerID: payerID,
                                paymentID: paymentID = paymentID || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.paymentId,
                                billingToken: billingToken = billingToken || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.billingToken,
                                facilitatorAccessToken: facilitatorAccessToken,
                                authCode: authCode,
                                paymentSource: paymentSource
                            };
                            var actions = function(_ref3) {
                                var intent = _ref3.intent, orderID = _ref3.orderID, paymentID = _ref3.paymentID, payerID = _ref3.payerID, restart = _ref3.restart, facilitatorAccessToken = _ref3.facilitatorAccessToken, buyerAccessToken = _ref3.buyerAccessToken, partnerAttributionID = _ref3.partnerAttributionID, forceRestAPI = _ref3.forceRestAPI, onError = _ref3.onError;
                                var order = function(_ref) {
                                    var intent = _ref.intent, orderID = _ref.orderID, restart = _ref.restart, facilitatorAccessToken = _ref.facilitatorAccessToken, buyerAccessToken = _ref.buyerAccessToken, partnerAttributionID = _ref.partnerAttributionID, forceRestAPI = _ref.forceRestAPI, onError = _ref.onError;
                                    var get = memoize((function() {
                                        return function(orderID, _ref2) {
                                            var _headers4;
                                            var facilitatorAccessToken = _ref2.facilitatorAccessToken, buyerAccessToken = _ref2.buyerAccessToken, partnerAttributionID = _ref2.partnerAttributionID, _ref2$forceRestAPI = _ref2.forceRestAPI, forceRestAPI = void 0 !== _ref2$forceRestAPI && _ref2$forceRestAPI;
                                            getLogger().info("get_order_lsat_upgrade_" + (getLsatUpgradeCalled() ? "called" : "not_called"));
                                            getLogger().info("get_order_lsat_upgrade_" + (getLsatUpgradeError() ? "errored" : "did_not_error"), {
                                                err: stringifyError(getLsatUpgradeError())
                                            });
                                            if (forceRestAPI && !getLsatUpgradeError()) {
                                                var _headers2;
                                                return callRestAPI({
                                                    accessToken: facilitatorAccessToken,
                                                    url: "/v2/checkout/orders/" + orderID,
                                                    eventName: "v2_checkout_orders_get",
                                                    headers: (_headers2 = {}, _headers2["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                                    _headers2.prefer = "return=representation", _headers2)
                                                }).catch((function(err) {
                                                    var _headers3;
                                                    var restCorrID = getErrorResponseCorrelationID(err);
                                                    getLogger().warn("get_order_call_rest_api_error", {
                                                        restCorrID: restCorrID,
                                                        orderID: orderID,
                                                        err: stringifyError(err)
                                                    });
                                                    return callSmartAPI({
                                                        accessToken: buyerAccessToken,
                                                        url: "/smart/api/order/" + orderID,
                                                        eventName: "order_get",
                                                        headers: (_headers3 = {}, _headers3["paypal-client-context"] = orderID, _headers3)
                                                    }).then((function(res) {
                                                        var smartCorrID = getResponseCorrelationID(res);
                                                        getLogger().info("get_order_smart_fallback_success", {
                                                            smartCorrID: smartCorrID,
                                                            restCorrID: restCorrID,
                                                            orderID: orderID
                                                        });
                                                        return res.data;
                                                    })).catch((function(smartErr) {
                                                        var smartCorrID = getErrorResponseCorrelationID(err);
                                                        getLogger().error("get_order_smart_fallback_error", {
                                                            smartCorrID: smartCorrID,
                                                            restCorrID: restCorrID,
                                                            orderID: orderID,
                                                            err: stringifyError(smartErr)
                                                        });
                                                        throw smartErr;
                                                    }));
                                                }));
                                            }
                                            return callSmartAPI({
                                                accessToken: buyerAccessToken,
                                                url: "/smart/api/order/" + orderID,
                                                eventName: "order_get",
                                                headers: (_headers4 = {}, _headers4["paypal-client-context"] = orderID, _headers4)
                                            }).then((function(_ref3) {
                                                return _ref3.data;
                                            }));
                                        }(orderID, {
                                            facilitatorAccessToken: facilitatorAccessToken,
                                            buyerAccessToken: buyerAccessToken,
                                            partnerAttributionID: partnerAttributionID,
                                            forceRestAPI: forceRestAPI
                                        });
                                    }));
                                    var capture = memoize((function() {
                                        if ("capture" !== intent) throw new Error("Use intent=capture to use client-side capture");
                                        return function(orderID, _ref4) {
                                            var _headers7;
                                            var facilitatorAccessToken = _ref4.facilitatorAccessToken, buyerAccessToken = _ref4.buyerAccessToken, partnerAttributionID = _ref4.partnerAttributionID, _ref4$forceRestAPI = _ref4.forceRestAPI, forceRestAPI = void 0 !== _ref4$forceRestAPI && _ref4$forceRestAPI;
                                            getLogger().info("capture_order_lsat_upgrade_" + (getLsatUpgradeCalled() ? "called" : "not_called"));
                                            getLogger().info("capture_order_lsat_upgrade_" + (getLsatUpgradeError() ? "errored" : "did_not_error"), {
                                                err: stringifyError(getLsatUpgradeError())
                                            });
                                            if (forceRestAPI && !getLsatUpgradeError()) {
                                                var _headers5;
                                                return callRestAPI({
                                                    accessToken: facilitatorAccessToken,
                                                    method: "post",
                                                    eventName: "v2_checkout_orders_capture",
                                                    url: "/v2/checkout/orders/" + orderID + "/capture",
                                                    headers: (_headers5 = {}, _headers5["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                                    _headers5.prefer = "return=representation", _headers5["paypal-request-id"] = orderID, 
                                                    _headers5)
                                                }).catch((function(err) {
                                                    var _headers6;
                                                    var restCorrID = getErrorResponseCorrelationID(err);
                                                    getLogger().warn("capture_order_call_rest_api_error", {
                                                        restCorrID: restCorrID,
                                                        orderID: orderID,
                                                        err: stringifyError(err)
                                                    });
                                                    if (isProcessorDeclineError(err) || isUnprocessableEntityError(err)) throw err;
                                                    return callSmartAPI({
                                                        accessToken: buyerAccessToken,
                                                        method: "post",
                                                        eventName: "order_capture",
                                                        url: "/smart/api/order/" + orderID + "/capture",
                                                        headers: (_headers6 = {}, _headers6["paypal-client-context"] = orderID, _headers6)
                                                    }).then((function(res) {
                                                        var smartCorrID = getResponseCorrelationID(res);
                                                        getLogger().info("capture_order_smart_fallback_success", {
                                                            smartCorrID: smartCorrID,
                                                            restCorrID: restCorrID,
                                                            orderID: orderID
                                                        });
                                                        return res.data;
                                                    })).catch((function(smartErr) {
                                                        var smartCorrID = getErrorResponseCorrelationID(err);
                                                        getLogger().info("capture_order_smart_fallback_error", {
                                                            smartCorrID: smartCorrID,
                                                            restCorrID: restCorrID,
                                                            orderID: orderID,
                                                            err: stringifyError(smartErr)
                                                        });
                                                        throw smartErr;
                                                    }));
                                                }));
                                            }
                                            return callSmartAPI({
                                                accessToken: buyerAccessToken,
                                                method: "post",
                                                eventName: "order_capture",
                                                url: "/smart/api/order/" + orderID + "/capture",
                                                headers: (_headers7 = {}, _headers7["paypal-client-context"] = orderID, _headers7)
                                            }).then((function(_ref5) {
                                                return _ref5.data;
                                            }));
                                        }(orderID, {
                                            facilitatorAccessToken: facilitatorAccessToken,
                                            buyerAccessToken: buyerAccessToken,
                                            partnerAttributionID: partnerAttributionID,
                                            forceRestAPI: forceRestAPI
                                        }).finally(get.reset).finally(capture.reset).catch((function(err) {
                                            return onApprove_handleProcessorError(err, restart, onError);
                                        }));
                                    }));
                                    var authorize = memoize((function() {
                                        if ("authorize" !== intent) throw new Error("Use intent=authorize to use client-side authorize");
                                        return function(orderID, _ref6) {
                                            var _headers10;
                                            var facilitatorAccessToken = _ref6.facilitatorAccessToken, buyerAccessToken = _ref6.buyerAccessToken, partnerAttributionID = _ref6.partnerAttributionID, _ref6$forceRestAPI = _ref6.forceRestAPI, forceRestAPI = void 0 !== _ref6$forceRestAPI && _ref6$forceRestAPI;
                                            getLogger().info("authorize_order_lsat_upgrade_" + (getLsatUpgradeCalled() ? "called" : "not_called"));
                                            getLogger().info("authorize_order_lsat_upgrade_" + (getLsatUpgradeError() ? "errored" : "did_not_error"), {
                                                err: stringifyError(getLsatUpgradeError())
                                            });
                                            if (forceRestAPI && !getLsatUpgradeError()) {
                                                var _headers8;
                                                return callRestAPI({
                                                    accessToken: facilitatorAccessToken,
                                                    method: "post",
                                                    eventName: "v2_checkout_orders_authorize",
                                                    url: "/v2/checkout/orders/" + orderID + "/authorize",
                                                    headers: (_headers8 = {}, _headers8["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                                    _headers8.prefer = "return=representation", _headers8)
                                                }).catch((function(err) {
                                                    var _headers9;
                                                    var restCorrID = getErrorResponseCorrelationID(err);
                                                    getLogger().warn("authorize_order_call_rest_api_error", {
                                                        restCorrID: restCorrID,
                                                        orderID: orderID,
                                                        err: stringifyError(err)
                                                    });
                                                    if (isProcessorDeclineError(err)) throw err;
                                                    return callSmartAPI({
                                                        accessToken: buyerAccessToken,
                                                        method: "post",
                                                        eventName: "order_authorize",
                                                        url: "/smart/api/order/" + orderID + "/authorize",
                                                        headers: (_headers9 = {}, _headers9["paypal-client-context"] = orderID, _headers9)
                                                    }).then((function(res) {
                                                        var smartCorrID = getResponseCorrelationID(res);
                                                        getLogger().info("authorize_order_smart_fallback_success", {
                                                            smartCorrID: smartCorrID,
                                                            restCorrID: restCorrID,
                                                            orderID: orderID
                                                        });
                                                        return res.data;
                                                    })).catch((function(smartErr) {
                                                        var smartCorrID = getErrorResponseCorrelationID(err);
                                                        getLogger().info("authorize_order_smart_fallback_error", {
                                                            smartCorrID: smartCorrID,
                                                            restCorrID: restCorrID,
                                                            orderID: orderID,
                                                            err: stringifyError(smartErr)
                                                        });
                                                        throw smartErr;
                                                    }));
                                                }));
                                            }
                                            getLogger().info("lsat_upgrade_false");
                                            return callSmartAPI({
                                                accessToken: buyerAccessToken,
                                                method: "post",
                                                eventName: "order_authorize",
                                                url: "/smart/api/order/" + orderID + "/authorize",
                                                headers: (_headers10 = {}, _headers10["paypal-client-context"] = orderID, _headers10)
                                            }).then((function(_ref7) {
                                                return _ref7.data;
                                            }));
                                        }(orderID, {
                                            facilitatorAccessToken: facilitatorAccessToken,
                                            buyerAccessToken: buyerAccessToken,
                                            partnerAttributionID: partnerAttributionID,
                                            forceRestAPI: forceRestAPI
                                        }).finally(get.reset).finally(authorize.reset).catch((function(err) {
                                            return onApprove_handleProcessorError(err, restart, onError);
                                        }));
                                    }));
                                    return {
                                        capture: capture,
                                        authorize: authorize,
                                        patch: function(data) {
                                            void 0 === data && (data = {});
                                            return patchOrder(orderID, data, {
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
                                    restart: restart,
                                    facilitatorAccessToken: facilitatorAccessToken,
                                    buyerAccessToken: buyerAccessToken,
                                    partnerAttributionID: partnerAttributionID,
                                    forceRestAPI: forceRestAPI,
                                    onError: onError
                                });
                                !function(_ref2) {
                                    var intent = _ref2.intent, paymentID = _ref2.paymentID, payerID = _ref2.payerID, restart = _ref2.restart, facilitatorAccessToken = _ref2.facilitatorAccessToken, buyerAccessToken = _ref2.buyerAccessToken, partnerAttributionID = _ref2.partnerAttributionID, onError = _ref2.onError;
                                    if (paymentID) {
                                        var get = memoize((function() {
                                            return function(paymentID, _ref4) {
                                                var _headers2;
                                                return callRestAPI({
                                                    accessToken: _ref4.facilitatorAccessToken,
                                                    eventName: "v1_payments_payment_get",
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
                                            if (!payerID) throw new Error("payerID required for payment execute");
                                            if ("capture" !== intent) throw new Error("Use intent=capture to use client-side capture");
                                            return function(paymentID, payerID, _ref5) {
                                                var _headers3;
                                                return callRestAPI({
                                                    accessToken: _ref5.facilitatorAccessToken,
                                                    method: "post",
                                                    eventName: "v1_payments_payment_execute",
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
                                            }).finally(get.reset).finally(execute.reset).catch((function(err) {
                                                return onApprove_handleProcessorError(err, restart, onError);
                                            }));
                                        }));
                                    }
                                }({
                                    intent: intent,
                                    orderID: orderID,
                                    paymentID: paymentID,
                                    payerID: payerID,
                                    restart: restart,
                                    facilitatorAccessToken: facilitatorAccessToken,
                                    buyerAccessToken: buyerAccessToken,
                                    partnerAttributionID: partnerAttributionID,
                                    forceRestAPI: forceRestAPI,
                                    onError: onError
                                });
                                return {
                                    order: order,
                                    payment: null,
                                    restart: restart,
                                    redirect: onApprove_redirect
                                };
                            }({
                                orderID: orderID,
                                paymentID: paymentID,
                                payerID: payerID,
                                intent: intent,
                                restart: restart,
                                facilitatorAccessToken: facilitatorAccessToken,
                                buyerAccessToken: buyerAccessToken,
                                partnerAttributionID: partnerAttributionID,
                                forceRestAPI: forceRestAPI,
                                onError: onError
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
                }));
            }({
                intent: intent,
                onApprove: onApprove,
                partnerAttributionID: partnerAttributionID,
                onError: onError,
                clientAccessToken: clientAccessToken,
                vault: vault,
                clientID: clientID,
                facilitatorAccessToken: facilitatorAccessToken,
                branded: branded,
                createOrder: createOrder,
                paymentSource: paymentSource
            });
            if ("tokenize" === intent) return function(_ref13) {
                var _ref13$onApprove = _ref13.onApprove, onApprove = void 0 === _ref13$onApprove ? function() {
                    throw new Error("Expected onApprove");
                } : _ref13$onApprove, onError = _ref13.onError, facilitatorAccessToken = _ref13.facilitatorAccessToken, paymentSource = _ref13.paymentSource;
                if (!onApprove) throw new Error("Expected onApprove");
                return memoize((function(_ref14, _ref15) {
                    var _getLogger$info$track3;
                    var paymentMethodToken = _ref14.paymentMethodToken;
                    var restart = _ref15.restart;
                    if (!paymentMethodToken) throw new Error("Payment method token required for tokenize onApprove");
                    getLogger().info("button_approve").track((_getLogger$info$track3 = {}, _getLogger$info$track3.transition_name = "process_tokenize_approve", 
                    _getLogger$info$track3)).flush();
                    return onApprove({
                        facilitatorAccessToken: facilitatorAccessToken,
                        paymentMethodToken: paymentMethodToken,
                        paymentSource: paymentSource
                    }, {
                        restart: restart,
                        redirect: onApprove_redirect
                    }).catch((function(err) {
                        return promise_ZalgoPromise.try((function() {
                            return onError(err);
                        })).then((function() {
                            throw err;
                        }));
                    }));
                }));
            }({
                onApprove: onApprove,
                onError: onError,
                facilitatorAccessToken: facilitatorAccessToken,
                paymentSource: paymentSource
            });
            throw new Error("Unsupported intent: " + intent);
        }({
            onApprove: xprops.onApprove,
            createBillingAgreement: createBillingAgreement,
            createSubscription: createSubscription,
            intent: intent,
            onError: onError,
            partnerAttributionID: partnerAttributionID,
            clientAccessToken: clientAccessToken,
            vault: vault,
            clientID: clientID,
            facilitatorAccessToken: facilitatorAccessToken,
            branded: branded,
            createOrder: createOrder,
            paymentSource: paymentSource
        });
        var onComplete = function(_ref) {
            var createOrder = _ref.createOrder, onComplete = _ref.onComplete, onError = _ref.onError;
            return onComplete ? memoize((function() {
                return createOrder().then((function(orderID) {
                    var _getLogger$info$track;
                    getLogger().info("button_complete").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_complete", 
                    _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                    _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                    return onComplete({
                        orderID: orderID
                    }, {
                        redirect: onComplete_redirect
                    }).catch((function(err) {
                        return promise_ZalgoPromise.try((function() {
                            return onError(err);
                        })).then((function() {
                            throw err;
                        }));
                    }));
                }));
            })) : promiseNoop;
        }({
            createOrder: createOrder,
            onComplete: xprops.onComplete,
            onError: xprops.onError
        });
        var onCancel = function(_ref2, _ref3) {
            var _ref2$onCancel = _ref2.onCancel, onCancel = void 0 === _ref2$onCancel ? promiseNoop : _ref2$onCancel, onError = _ref2.onError;
            var createOrder = _ref3.createOrder;
            return memoize((function() {
                return createOrder().then((function(orderID) {
                    var _getLogger$info$track;
                    getLogger().info("button_cancel").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_cancel", 
                    _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                    _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
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
        }({
            onCancel: xprops.onCancel,
            onError: onError
        }, {
            createOrder: createOrder
        });
        var onShippingChange = function(_ref2, _ref3) {
            var onShippingChange = _ref2.onShippingChange, partnerAttributionID = _ref2.partnerAttributionID;
            var facilitatorAccessToken = _ref3.facilitatorAccessToken, createOrder = _ref3.createOrder;
            var upgradeLSAT = -1 === LSAT_UPGRADE_EXCLUDED_MERCHANTS.indexOf(_ref2.clientID);
            if (onShippingChange) return function(_ref4, actions) {
                var buyerAccessToken = _ref4.buyerAccessToken, _ref4$forceRestAPI = _ref4.forceRestAPI, forceRestAPI = void 0 === _ref4$forceRestAPI ? upgradeLSAT : _ref4$forceRestAPI, data = function(source, excluded) {
                    if (null == source) return {};
                    var target = {};
                    var sourceKeys = Object.keys(source);
                    var key, i;
                    for (i = 0; i < sourceKeys.length; i++) excluded.indexOf(key = sourceKeys[i]) >= 0 || (target[key] = source[key]);
                    return target;
                }(_ref4, _excluded);
                return createOrder().then((function(orderID) {
                    var _getLogger$info$track;
                    getLogger().info("button_shipping_change").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_shipping_change", 
                    _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                    _getLogger$info$track.context_id = orderID, _getLogger$info$track.shipping_callback_invoked = "1", 
                    _getLogger$info$track)).flush();
                    return onShippingChange(data, function(_ref) {
                        var orderID = _ref.orderID, facilitatorAccessToken = _ref.facilitatorAccessToken, buyerAccessToken = _ref.buyerAccessToken, partnerAttributionID = _ref.partnerAttributionID, forceRestAPI = _ref.forceRestAPI;
                        return {
                            resolve: function() {
                                return promise_ZalgoPromise.resolve();
                            },
                            reject: _ref.actions.reject || function() {
                                throw new Error("Missing reject action callback");
                            },
                            order: {
                                patch: function(data) {
                                    void 0 === data && (data = {});
                                    return patchOrder(orderID, data, {
                                        facilitatorAccessToken: facilitatorAccessToken,
                                        buyerAccessToken: buyerAccessToken,
                                        partnerAttributionID: partnerAttributionID,
                                        forceRestAPI: forceRestAPI
                                    }).catch((function() {
                                        throw new Error("Order could not be patched");
                                    }));
                                }
                            }
                        };
                    }({
                        orderID: orderID,
                        facilitatorAccessToken: facilitatorAccessToken,
                        buyerAccessToken: buyerAccessToken,
                        actions: actions,
                        partnerAttributionID: partnerAttributionID,
                        forceRestAPI: forceRestAPI
                    }));
                }));
            };
        }({
            onShippingChange: xprops.onShippingChange,
            partnerAttributionID: partnerAttributionID,
            clientID: clientID
        }, {
            facilitatorAccessToken: facilitatorAccessToken,
            createOrder: createOrder
        });
        var onAuth = function(_ref) {
            var facilitatorAccessToken = _ref.facilitatorAccessToken, createOrder = _ref.createOrder, createSubscription = _ref.createSubscription;
            var upgradeLSAT = -1 === LSAT_UPGRADE_EXCLUDED_MERCHANTS.indexOf(_ref.clientID);
            return function(_ref2) {
                var accessToken = _ref2.accessToken, doLSATCapture = _ref2.doLSATCapture;
                getLogger().info("spb_onauth_access_token_" + (accessToken ? "present" : "not_present"));
                return promise_ZalgoPromise.try((function() {
                    if (accessToken) return upgradeLSAT && !doLSATCapture ? createOrder().then((function(orderID) {
                        return createSubscription ? accessToken : function(facilitatorAccessToken, _ref3) {
                            var _headers;
                            var buyerAccessToken = _ref3.buyerAccessToken, orderID = _ref3.orderID;
                            lsatUpgradeCalled = !1;
                            return callGraphQL({
                                name: "UpgradeFacilitatorAccessToken",
                                headers: (_headers = {}, _headers["x-paypal-internal-euat"] = buyerAccessToken, 
                                _headers["paypal-client-context"] = orderID, _headers),
                                query: "\n            mutation UpgradeFacilitatorAccessToken(\n                $orderID: String!\n                $buyerAccessToken: String!\n                $facilitatorAccessToken: String!\n            ) {\n                upgradeLowScopeAccessToken(\n                    token: $orderID\n                    buyerAccessToken: $buyerAccessToken\n                    merchantLSAT: $facilitatorAccessToken\n                )\n            }\n        ",
                                variables: {
                                    facilitatorAccessToken: facilitatorAccessToken,
                                    buyerAccessToken: buyerAccessToken,
                                    orderID: orderID
                                }
                            }).then(src_util_noop).catch((function(err) {
                                !function(err) {
                                    lsatUpgradeError = err;
                                }(err);
                                throw err;
                            }));
                        }(facilitatorAccessToken, {
                            buyerAccessToken: accessToken,
                            orderID: orderID
                        });
                    })).then((function() {
                        getLogger().info("upgrade_lsat_success");
                        return accessToken;
                    })).catch((function(err) {
                        getLogger().warn("upgrade_lsat_failure", {
                            error: stringifyError(err)
                        });
                        return accessToken;
                    })) : accessToken;
                }));
            };
        }({
            facilitatorAccessToken: facilitatorAccessToken,
            createOrder: createOrder,
            createSubscription: createSubscription,
            clientID: clientID
        });
        return {
            uid: uid,
            env: env,
            vault: vault,
            commit: commit,
            clientAccessToken: clientAccessToken,
            locale: locale,
            sessionID: sessionID,
            clientID: clientID,
            partnerAttributionID: partnerAttributionID,
            clientMetadataID: clientMetadataID,
            sdkCorrelationID: sdkCorrelationID,
            merchantDomain: merchantDomain,
            platform: platform,
            currency: currency,
            intent: intent,
            wallet: wallet,
            merchantRequestedPopupsDisabled: merchantRequestedPopupsDisabled,
            getPopupBridge: getPopupBridge,
            getPrerenderDetails: getPrerenderDetails,
            getPageUrl: getPageUrl,
            rememberFunding: rememberFunding,
            getParent: getParent,
            connect: connect,
            fundingSource: fundingSource,
            enableFunding: enableFunding,
            disableFunding: disableFunding,
            disableCard: disableCard,
            disableAutocomplete: disableAutocomplete,
            getQueriedEligibleFunding: getQueriedEligibleFunding,
            amount: amount,
            userIDToken: userIDToken,
            enableThreeDomainSecure: enableThreeDomainSecure,
            enableNativeCheckout: enableNativeCheckout,
            enableVaultInstallments: enableVaultInstallments,
            experience: experience,
            onClick: onClick,
            onInit: onInit,
            onError: onError,
            stageHost: stageHost,
            apiStageHost: apiStageHost,
            createOrder: createOrder,
            createBillingAgreement: createBillingAgreement,
            createSubscription: createSubscription,
            onApprove: onApprove,
            onComplete: onComplete,
            onCancel: onCancel,
            onShippingChange: onShippingChange,
            onAuth: onAuth,
            standaloneFundingSource: fundingSource,
            paymentMethodToken: paymentMethodToken,
            branded: branded,
            stickinessID: stickinessID,
            applePay: applePay,
            userExperienceFlow: userExperienceFlow,
            allowBillingPayments: allowBillingPayments
        };
    }
    function getCardProps(_ref) {
        var _fundingEligibility$c, _fundingEligibility$c2;
        var facilitatorAccessToken = _ref.facilitatorAccessToken;
        var xprops = window.xprops;
        var type = xprops.type, cardSessionID = xprops.cardSessionID, style = xprops.style, placeholder = xprops.placeholder, fundingEligibility = xprops.fundingEligibility, onChange = xprops.onChange, _xprops$branded = xprops.branded, branded = void 0 === _xprops$branded ? null == (_fundingEligibility$c = null == fundingEligibility || null == (_fundingEligibility$c2 = fundingEligibility.card) ? void 0 : _fundingEligibility$c2.branded) || _fundingEligibility$c : _xprops$branded, parent = xprops.parent, experience = xprops.experience, xport = xprops.export;
        return _extends({}, getProps({
            facilitatorAccessToken: facilitatorAccessToken,
            branded: branded,
            paymentSource: null
        }), {
            type: type,
            branded: branded,
            style: style,
            placeholder: placeholder,
            cardSessionID: cardSessionID,
            fundingEligibility: fundingEligibility,
            onChange: onChange,
            inlinexo: "inline" === experience,
            export: parent ? parent.export : xport,
            facilitatorAccessToken: facilitatorAccessToken
        });
    }
    function getExportsByFrameName(name) {
        try {
            for (var _i2 = 0, _getAllFramesInWindow2 = function(win) {
                var top = function(win) {
                    void 0 === win && (win = window);
                    try {
                        if (win.top) return win.top;
                    } catch (err) {}
                    if (utils_getParent(win) === win) return win;
                    try {
                        if (isAncestorParent(window, win) && window.top) return window.top;
                    } catch (err) {}
                    try {
                        if (isAncestorParent(win, window) && window.top) return window.top;
                    } catch (err) {}
                    for (var _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win); _i7 < _getAllChildFrames4.length; _i7++) {
                        var frame = _getAllChildFrames4[_i7];
                        try {
                            if (frame.top) return frame.top;
                        } catch (err) {}
                        if (utils_getParent(frame) === frame) return frame;
                    }
                }(win);
                if (!top) throw new Error("Can not determine top window");
                var result = [].concat(getAllChildFrames(top), [ top ]);
                -1 === result.indexOf(win) && (result = [].concat(result, [ win ], getAllChildFrames(win)));
                return result;
            }(window); _i2 < _getAllFramesInWindow2.length; _i2++) {
                var win = _getAllFramesInWindow2[_i2];
                if (isSameDomain(win) && win.exports && win.exports.name === name) return win.exports;
            }
        } catch (err) {}
    }
    function getCardFrames() {
        return {
            cardFrame: getExportsByFrameName("card-field"),
            cardNumberFrame: getExportsByFrameName("card-number-field"),
            cardCVVFrame: getExportsByFrameName("card-cvv-field"),
            cardExpiryFrame: getExportsByFrameName("card-expiry-field"),
            cardNameFrame: getExportsByFrameName("card-name-field")
        };
    }
    function hasCardFields() {
        var _getCardFrames = getCardFrames();
        return !!(_getCardFrames.cardFrame || _getCardFrames.cardNumberFrame && _getCardFrames.cardCVVFrame && _getCardFrames.cardExpiryFrame);
    }
    function getCardFields() {
        var cardFrame = getExportsByFrameName("card-field");
        if (cardFrame && cardFrame.isFieldValid()) return cardFrame.getFieldValue();
        var _getCardFrames2 = getCardFrames(), cardNumberFrame = _getCardFrames2.cardNumberFrame, cardCVVFrame = _getCardFrames2.cardCVVFrame, cardExpiryFrame = _getCardFrames2.cardExpiryFrame, cardNameFrame = _getCardFrames2.cardNameFrame;
        if (cardNumberFrame && cardNumberFrame.isFieldValid() && cardCVVFrame && cardCVVFrame.isFieldValid() && cardExpiryFrame && cardExpiryFrame.isFieldValid() && (!cardNameFrame || cardNameFrame.isFieldValid())) return {
            number: cardNumberFrame.getFieldValue(),
            cvv: cardCVVFrame.getFieldValue(),
            expiry: cardExpiryFrame.getFieldValue(),
            name: (null == cardNameFrame ? void 0 : cardNameFrame.getFieldValue()) || ""
        };
        throw new Error("Card fields not available to submit");
    }
    function emitGqlErrors(errorsMap) {
        var _getCardFrames3 = getCardFrames(), cardFrame = _getCardFrames3.cardFrame, cardNumberFrame = _getCardFrames3.cardNumberFrame, cardExpiryFrame = _getCardFrames3.cardExpiryFrame, cardCVVFrame = _getCardFrames3.cardCVVFrame;
        var number = errorsMap.number, expiry = errorsMap.expiry, security_code = errorsMap.security_code;
        if (cardFrame) {
            var cardFieldError = {
                field: "",
                errors: []
            };
            number && (cardFieldError = {
                field: "number",
                errors: number
            });
            expiry && (cardFieldError = {
                field: "expiry",
                errors: expiry
            });
            security_code && (cardFieldError = {
                field: "cvv",
                errors: security_code
            });
            cardFrame.setGqlErrors(cardFieldError);
        }
        cardNumberFrame && number && cardNumberFrame.setGqlErrors({
            field: "number",
            errors: number
        });
        cardExpiryFrame && expiry && cardExpiryFrame.setGqlErrors({
            field: "expiry",
            errors: expiry
        });
        cardCVVFrame && security_code && cardCVVFrame.setGqlErrors({
            field: "cvv",
            errors: security_code
        });
    }
    function interface_resetGQLErrors() {
        var _getCardFrames4 = getCardFrames(), cardFrame = _getCardFrames4.cardFrame, cardNumberFrame = _getCardFrames4.cardNumberFrame, cardExpiryFrame = _getCardFrames4.cardExpiryFrame, cardCVVFrame = _getCardFrames4.cardCVVFrame;
        cardFrame && cardFrame.resetGQLErrors();
        cardNumberFrame && cardNumberFrame.resetGQLErrors();
        cardExpiryFrame && cardExpiryFrame.resetGQLErrors();
        cardCVVFrame && cardCVVFrame.resetGQLErrors();
    }
    function submitCardFields(_ref) {
        var extraFields = _ref.extraFields;
        var _getCardProps = getCardProps({
            facilitatorAccessToken: _ref.facilitatorAccessToken
        }), intent = _getCardProps.intent, branded = _getCardProps.branded, vault = _getCardProps.vault, createOrder = _getCardProps.createOrder, onApprove = _getCardProps.onApprove, clientID = _getCardProps.clientID;
        interface_resetGQLErrors();
        return promise_ZalgoPromise.try((function() {
            if (!hasCardFields()) throw new Error("Card fields not available to submit");
            var card = getCardFields();
            if (card) {
                var restart = function() {
                    throw new Error("Restart not implemented for card fields flow");
                };
                return intent === sdk_constants.INTENT.TOKENIZE ? function(_ref23) {
                    var card = _ref23.card;
                    return promise_ZalgoPromise.try((function() {
                        console.info("Card Tokenize GQL mutation not yet implemented", {
                            card: card
                        });
                        return {
                            paymentMethodToken: uniqueID()
                        };
                    }));
                }({
                    card: card
                }).then((function(_ref2) {
                    return onApprove({
                        paymentMethodToken: _ref2.paymentMethodToken
                    }, {
                        restart: restart
                    });
                })) : intent === sdk_constants.INTENT.CAPTURE || intent === sdk_constants.INTENT.AUTHORIZE ? createOrder().then((function(orderID) {
                    var cardObject = _extends({
                        cardNumber: card.number,
                        expirationDate: card.expiry,
                        securityCode: card.cvv
                    }, extraFields);
                    card.name && (cardObject.name = card.name);
                    return (_ref24 = {
                        card: cardObject,
                        orderID: orderID,
                        vault: vault,
                        branded: branded,
                        clientID: clientID
                    }, callGraphQL({
                        name: "ProcessPayment",
                        query: '\n            mutation ProcessPayment(\n                $orderID: String!\n                $clientID: String!\n                $card: CardInput!\n                $branded: Boolean!\n            ) {\n                processPayment(\n                    clientID: $clientID\n                    paymentMethod: { type: CARD, card: $card }\n                    branded: $branded\n                    orderID: $orderID\n                    buttonSessionID: "f7r7367r4"\n                )\n            }\n        ',
                        variables: {
                            orderID: _ref24.orderID,
                            clientID: _ref24.clientID,
                            card: _ref24.card,
                            branded: _ref24.branded
                        },
                        returnErrorObject: !0
                    }).then((function(gqlResult) {
                        if (!gqlResult) throw new Error("Error on GraphQL ProcessPayment mutation");
                        return gqlResult;
                    }))).catch((function(error) {
                        var _parseGQLErrors = function(errorsObject) {
                            var data = errorsObject.data;
                            var parsedErrors = [];
                            var errors = [];
                            var errorsMap = {};
                            Array.isArray(data) && data.length && data.forEach((function(e) {
                                var details = e.details;
                                Array.isArray(details) && details.length && details.forEach((function(d) {
                                    errors.push(d);
                                    var parsedError;
                                    if (d.field && d.issue && d.description) {
                                        var _GQL_ERRORS$d$field$d;
                                        parsedError = null != (_GQL_ERRORS$d$field$d = GQL_ERRORS[d.field][d.issue]) ? _GQL_ERRORS$d$field$d : d.issue + ": " + d.description;
                                        var field = d.field.split("/").pop();
                                        errorsMap[field] || (errorsMap[field] = []);
                                        errorsMap[field].push(parsedError);
                                    } else if (d.issue && d.description) {
                                        var _GQL_ERRORS$d$issue;
                                        parsedError = null != (_GQL_ERRORS$d$issue = GQL_ERRORS[d.issue]) ? _GQL_ERRORS$d$issue : d.issue + ": " + d.description;
                                    }
                                    parsedError && parsedErrors.push(parsedError);
                                }));
                            }));
                            return {
                                errors: errors,
                                parsedErrors: parsedErrors,
                                errorsMap: errorsMap
                            };
                        }(error), errorsMap = _parseGQLErrors.errorsMap, parsedErrors = _parseGQLErrors.parsedErrors, errors = _parseGQLErrors.errors;
                        errorsMap && emitGqlErrors(errorsMap);
                        getLogger().info("card_fields_payment_failed");
                        throw {
                            parsedErrors: parsedErrors,
                            errors: errors
                        };
                    }));
                    var _ref24;
                })).then((function() {
                    return onApprove({
                        payerID: uniqueID(),
                        buyerAccessToken: uniqueID()
                    }, {
                        restart: restart
                    });
                })) : void 0;
            }
        }));
    }
    function CardNumber(_ref2) {
        var _ref2$name = _ref2.name, name = void 0 === _ref2$name ? "number" : _ref2$name, _ref2$autocomplete = _ref2.autocomplete, autocomplete = void 0 === _ref2$autocomplete ? "cc-number" : _ref2$autocomplete, _ref2$navigation = _ref2.navigation, navigation = void 0 === _ref2$navigation ? defaultNavigation : _ref2$navigation, _ref2$allowNavigation = _ref2.allowNavigation, allowNavigation = void 0 !== _ref2$allowNavigation && _ref2$allowNavigation, state = _ref2.state, ref = _ref2.ref, type = _ref2.type, className = _ref2.className, placeholder = _ref2.placeholder, style = _ref2.style, maxLength = _ref2.maxLength, onChange = _ref2.onChange, onFocus = _ref2.onFocus, onBlur = _ref2.onBlur, onValidityChange = _ref2.onValidityChange;
        var _useState = hooks_module_m(DEFAULT_CARD_TYPE), cardType = _useState[0], setCardType = _useState[1];
        var _useState2 = hooks_module_m(_extends({}, defaultInputState, state)), inputState = _useState2[0], setInputState = _useState2[1];
        var inputValue = inputState.inputValue, maskedInputValue = inputState.maskedInputValue, cursorStart = inputState.cursorStart, cursorEnd = inputState.cursorEnd, keyStrokeCount = inputState.keyStrokeCount, isValid = inputState.isValid, isPotentiallyValid = inputState.isPotentiallyValid, contentPasted = inputState.contentPasted;
        hooks_module_y((function() {
            var validity = function(value, cardType) {
                var trimmedValue = removeSpaces(value);
                var lengths = cardType.lengths;
                var validLength = lengths.some((function(length) {
                    return length === trimmedValue.length;
                }));
                var validLuhn = luhn_10_default()(trimmedValue);
                var maxLength = Math.max.apply(null, lengths);
                return {
                    isValid: validLength && validLuhn,
                    isPotentiallyValid: validLength || trimmedValue.length < maxLength
                };
            }(inputValue, cardType);
            setInputState((function(newState) {
                return _extends({}, newState, validity);
            }));
        }), [ inputValue, maskedInputValue ]);
        hooks_module_y((function() {
            "function" == typeof onValidityChange && onValidityChange({
                isValid: isValid,
                isPotentiallyValid: isPotentiallyValid
            });
            (function(_ref) {
                var inputState = _ref.inputState;
                return Boolean(_ref.allowNavigation && inputState.inputValue && inputState.isValid && (inputState.maskedInputValue.length === inputState.cursorStart || inputState.contentPasted));
            })({
                allowNavigation: allowNavigation,
                inputState: inputState
            }) && navigation.next();
        }), [ isValid, isPotentiallyValid ]);
        return v("input", {
            name: name,
            autocomplete: autocomplete,
            inputmode: "numeric",
            ref: ref,
            type: type,
            className: className,
            placeholder: placeholder,
            value: maskedInputValue,
            style: style,
            maxLength: maxLength,
            onInput: function(event) {
                var _event$target = event.target, rawValue = _event$target.value, selectionStart = _event$target.selectionStart, selectionEnd = _event$target.selectionEnd;
                var value = removeNonDigits(rawValue);
                var detectedCardType = detectCardType(value);
                var maskedValue = maskCard(value);
                var startCursorPosition = selectionStart;
                var endCursorPosition = selectionEnd;
                if (function(value) {
                    return /\D/g.test(removeSpaces(value));
                }(rawValue)) {
                    startCursorPosition = cursorStart;
                    endCursorPosition = cursorEnd;
                }
                if (contentPasted) {
                    startCursorPosition = maskedValue.length;
                    endCursorPosition = maskedValue.length;
                } else if (maskedValue.length > maskedInputValue.length && " " === maskedValue[selectionStart - 1]) {
                    startCursorPosition += 1;
                    endCursorPosition += 1;
                }
                moveCursor(event.target, startCursorPosition, endCursorPosition);
                setCardType(detectedCardType);
                setInputState(_extends({}, inputState, {
                    inputValue: value,
                    maskedInputValue: maskedValue,
                    cursorStart: startCursorPosition,
                    cursorEnd: endCursorPosition,
                    contentPasted: !1,
                    keyStrokeCount: keyStrokeCount + 1
                }));
                onChange({
                    event: event,
                    cardNumber: value,
                    cardMaskedNumber: maskedValue,
                    cardType: detectedCardType
                });
            },
            onFocus: function(event) {
                "function" == typeof onFocus && onFocus(event);
                var maskedValue = maskCard(inputValue);
                var updatedState = _extends({}, inputState, {
                    maskedInputValue: maskedValue
                });
                isValid || (updatedState.isPotentiallyValid = !0);
                setInputState((function(newState) {
                    return _extends({}, newState, updatedState);
                }));
            },
            onBlur: function(event) {
                var updatedState = {
                    maskedInputValue: maskedInputValue,
                    isPotentiallyValid: isPotentiallyValid,
                    contentPasted: !1
                };
                isValid ? updatedState.maskedInputValue = (lastFour = removeSpaces(number = maskedInputValue).slice(-4), 
                number.replace(/\d/g, "•").slice(0, -4) + lastFour) : updatedState.isPotentiallyValid = !1;
                var number, lastFour;
                "function" == typeof onBlur && onBlur(event);
                setInputState((function(newState) {
                    return _extends({}, newState, updatedState);
                }));
            },
            onKeyDown: function(event) {
                allowNavigation && navigateOnKeyDown(event, navigation);
            },
            onPaste: function() {
                setInputState((function(newState) {
                    return _extends({}, newState, {
                        contentPasted: !0
                    });
                }));
            }
        });
    }
    function CardExpiry(_ref) {
        var _ref$name = _ref.name, name = void 0 === _ref$name ? "expiry" : _ref$name, _ref$autocomplete = _ref.autocomplete, autocomplete = void 0 === _ref$autocomplete ? "cc-exp" : _ref$autocomplete, _ref$navigation = _ref.navigation, navigation = void 0 === _ref$navigation ? defaultNavigation : _ref$navigation, ref = _ref.ref, type = _ref.type, className = _ref.className, placeholder = _ref.placeholder, style = _ref.style, maxLength = _ref.maxLength, onChange = _ref.onChange, onFocus = _ref.onFocus, onBlur = _ref.onBlur, onValidityChange = _ref.onValidityChange, _ref$allowNavigation = _ref.allowNavigation, allowNavigation = void 0 !== _ref$allowNavigation && _ref$allowNavigation;
        var _useState = hooks_module_m(_extends({}, defaultInputState, _ref.state)), inputState = _useState[0], setInputState = _useState[1];
        var maskedInputValue = inputState.maskedInputValue, keyStrokeCount = inputState.keyStrokeCount, isValid = inputState.isValid, isPotentiallyValid = inputState.isPotentiallyValid, contentPasted = inputState.contentPasted;
        hooks_module_y((function() {
            var validity = {
                isValid: (0, card_validator_dist_default.a.expirationDate)(maskedInputValue).isValid,
                isPotentiallyValid: !0
            };
            setInputState((function(newState) {
                return _extends({}, newState, validity);
            }));
        }), [ inputState.inputValue, maskedInputValue ]);
        hooks_module_y((function() {
            "function" == typeof onValidityChange && onValidityChange({
                isValid: isValid,
                isPotentiallyValid: isPotentiallyValid
            });
            allowNavigation && maskedInputValue && isValid && navigation.next();
        }), [ isValid, isPotentiallyValid ]);
        return v("input", {
            name: name,
            autocomplete: autocomplete,
            inputmode: "numeric",
            ref: ref,
            type: type,
            className: className,
            placeholder: placeholder,
            value: maskedInputValue,
            style: style,
            maxLength: maxLength,
            onKeyDown: function(event) {
                var value = event.target.value, key = event.key;
                if ("/" === value.trim().slice(-1) && "Backspace" === key) {
                    var month = removeDateMask(value);
                    setInputState(_extends({}, inputState, {
                        inputValue: value,
                        maskedInputValue: month
                    }));
                }
                allowNavigation && navigateOnKeyDown(event, navigation);
            },
            onInput: function(event) {
                var _event$target = event.target, rawValue = _event$target.value, selectionStart = _event$target.selectionStart, selectionEnd = _event$target.selectionEnd;
                var value = removeNonDigits(rawValue);
                var mask = function(date, prevFormat) {
                    void 0 === prevFormat && (prevFormat = "");
                    assertString(date);
                    if (prevFormat && prevFormat.includes("/") && removeSpaces(prevFormat).split("/")[0].length < 2) return prevFormat;
                    if ("/" === date.trim().slice(-1)) return date.slice(0, 2);
                    if ((date = removeDateMask(date)).length < 2) {
                        var first = date[0];
                        return parseInt(first, 10) > 1 ? "0" + first + " / " : date;
                    }
                    var month = date.slice(0, 2);
                    return parseInt(month, 10) > 12 ? "0" + month[0] + " / " + month[1] : month + " / " + date.slice(2, 4);
                }(value, rawValue);
                var startCursorPosition = selectionStart;
                var endCursorPosition = selectionEnd;
                if ("/" === mask.trim().slice(-1) || contentPasted) {
                    startCursorPosition = mask.length;
                    endCursorPosition = mask.length;
                }
                moveCursor(event.target, startCursorPosition, endCursorPosition);
                setInputState(_extends({}, inputState, {
                    inputValue: rawValue,
                    maskedInputValue: mask,
                    contentPasted: !1,
                    keyStrokeCount: keyStrokeCount + 1
                }));
                onChange({
                    event: event,
                    date: value,
                    maskedDate: mask
                });
            },
            onFocus: function(event) {
                "function" == typeof onFocus && onFocus(event);
                isValid || setInputState((function(newState) {
                    return _extends({}, newState, {
                        isPotentiallyValid: !0
                    });
                }));
            },
            onBlur: function(event) {
                "function" == typeof onBlur && onBlur(event);
                isValid || setInputState((function(newState) {
                    return _extends({}, newState, {
                        isPotentiallyValid: !1,
                        contentPasted: !1
                    });
                }));
            },
            onPaste: function() {
                setInputState((function(newState) {
                    return _extends({}, newState, {
                        contentPasted: !0
                    });
                }));
            }
        });
    }
    function CardCVV(_ref) {
        var _ref$name = _ref.name, name = void 0 === _ref$name ? "cvv" : _ref$name, _ref$autocomplete = _ref.autocomplete, autocomplete = void 0 === _ref$autocomplete ? "cc-csc" : _ref$autocomplete, _ref$navigation = _ref.navigation, navigation = void 0 === _ref$navigation ? defaultNavigation : _ref$navigation, _ref$allowNavigation = _ref.allowNavigation, allowNavigation = void 0 !== _ref$allowNavigation && _ref$allowNavigation, ref = _ref.ref, type = _ref.type, className = _ref.className, placeholder = _ref.placeholder, style = _ref.style, maxLength = _ref.maxLength, onChange = _ref.onChange, onFocus = _ref.onFocus, onBlur = _ref.onBlur, onValidityChange = _ref.onValidityChange, cardType = _ref.cardType;
        var _useState = hooks_module_m(_extends({}, defaultInputState, _ref.state)), inputState = _useState[0], setInputState = _useState[1];
        var inputValue = inputState.inputValue, keyStrokeCount = inputState.keyStrokeCount, isValid = inputState.isValid, isPotentiallyValid = inputState.isPotentiallyValid;
        hooks_module_y((function() {
            var validity = function(value, cardType) {
                var isValid = !1;
                value.length === getCvvLength(cardType) && (isValid = !0);
                return {
                    isValid: isValid,
                    isPotentiallyValid: !0
                };
            }(inputValue, cardType);
            setInputState((function(newState) {
                return _extends({}, newState, validity);
            }));
        }), [ inputValue ]);
        hooks_module_y((function() {
            "function" == typeof onValidityChange && onValidityChange({
                isValid: isValid,
                isPotentiallyValid: isPotentiallyValid
            });
            allowNavigation && inputValue && isValid && navigation.next();
        }), [ isValid, isPotentiallyValid ]);
        return v("input", {
            name: name,
            autocomplete: autocomplete,
            inputmode: "numeric",
            ref: ref,
            type: type,
            className: className,
            placeholder: placeholder,
            value: inputValue,
            style: style,
            maxLength: maxLength,
            onKeyDown: function(event) {
                allowNavigation && navigateOnKeyDown(event, navigation);
            },
            onInput: function(event) {
                var value = removeNonDigits(event.target.value);
                setInputState(_extends({}, inputState, {
                    inputValue: value,
                    maskedInputValue: value,
                    keyStrokeCount: keyStrokeCount + 1
                }));
                onChange({
                    event: event,
                    cardCvv: value
                });
            },
            onFocus: function(event) {
                "function" == typeof onFocus && onFocus(event);
                isValid || setInputState((function(newState) {
                    return _extends({}, newState, {
                        isPotentiallyValid: !0
                    });
                }));
            },
            onBlur: function(event) {
                "function" == typeof onBlur && onBlur(event);
                isValid || setInputState((function(newState) {
                    return _extends({}, newState, {
                        isPotentiallyValid: !1
                    });
                }));
            }
        });
    }
    function CardName(_ref) {
        var _ref$name = _ref.name, name = void 0 === _ref$name ? "name" : _ref$name, _ref$navigation = _ref.navigation, navigation = void 0 === _ref$navigation ? defaultNavigation : _ref$navigation, _ref$allowNavigation = _ref.allowNavigation, allowNavigation = void 0 !== _ref$allowNavigation && _ref$allowNavigation, ref = _ref.ref, type = _ref.type, className = _ref.className, placeholder = _ref.placeholder, style = _ref.style, maxLength = _ref.maxLength, onChange = _ref.onChange, onFocus = _ref.onFocus, onBlur = _ref.onBlur, onValidityChange = _ref.onValidityChange;
        var _useState = hooks_module_m(_extends({}, defaultInputState, _ref.state)), inputState = _useState[0], setInputState = _useState[1];
        var inputValue = inputState.inputValue, keyStrokeCount = inputState.keyStrokeCount, isValid = inputState.isValid, isPotentiallyValid = inputState.isPotentiallyValid;
        hooks_module_y((function() {
            var validity = function(value) {
                var isValid = !1;
                value.length >= 1 && value.length <= 255 && (isValid = !0);
                return {
                    isValid: isValid,
                    isPotentiallyValid: !0
                };
            }(inputValue);
            setInputState((function(newState) {
                return _extends({}, newState, validity);
            }));
        }), [ inputValue ]);
        hooks_module_y((function() {
            "function" == typeof onValidityChange && onValidityChange({
                isValid: isValid,
                isPotentiallyValid: isPotentiallyValid
            });
            allowNavigation && inputValue && isValid && navigation.next();
        }), [ isValid, isPotentiallyValid ]);
        return v("input", {
            name: name,
            inputmode: "text",
            ref: ref,
            type: type,
            className: className,
            placeholder: placeholder,
            value: inputValue,
            style: style,
            maxLength: maxLength,
            onKeyDown: function(event) {
                allowNavigation && navigateOnKeyDown(event, navigation);
            },
            onInput: function(event) {
                var value = event.target.value;
                setInputState(_extends({}, inputState, {
                    inputValue: value,
                    maskedInputValue: value,
                    keyStrokeCount: keyStrokeCount + 1
                }));
                onChange({
                    event: event,
                    cardName: value
                });
            },
            onFocus: function(event) {
                "function" == typeof onFocus && onFocus(event);
                isValid || setInputState((function(newState) {
                    return _extends({}, newState, {
                        isPotentiallyValid: !0
                    });
                }));
            },
            onBlur: function(event) {
                "function" == typeof onBlur && onBlur(event);
                isValid || setInputState((function(newState) {
                    return _extends({}, newState, {
                        isPotentiallyValid: !1
                    });
                }));
            }
        });
    }
    function CardField(_ref) {
        var _placeholder$number, _placeholder$expiry, _placeholder$cvv;
        var cspNonce = _ref.cspNonce, onChange = _ref.onChange, _ref$styleObject = _ref.styleObject, styleObject = void 0 === _ref$styleObject ? {} : _ref$styleObject, _ref$placeholder = _ref.placeholder, placeholder = void 0 === _ref$placeholder ? {} : _ref$placeholder, _ref$gqlErrorsObject = _ref.gqlErrorsObject, gqlErrorsObject = void 0 === _ref$gqlErrorsObject ? {} : _ref$gqlErrorsObject, autoFocusRef = _ref.autoFocusRef, autocomplete = _ref.autocomplete;
        var _useState = hooks_module_m(""), number = _useState[0], setNumber = _useState[1];
        var _useState2 = hooks_module_m(""), cvv = _useState2[0], setCvv = _useState2[1];
        var _useState3 = hooks_module_m(""), expiry = _useState3[0], setExpiry = _useState3[1];
        var _useState4 = hooks_module_m(!0), isValid = _useState4[0], setIsValid = _useState4[1];
        var _useState5 = hooks_module_m(initFieldValidity), numberValidity = _useState5[0], setNumberValidity = _useState5[1];
        var _useState6 = hooks_module_m(initFieldValidity), expiryValidity = _useState6[0], setExpiryValidity = _useState6[1];
        var _useState7 = hooks_module_m(initFieldValidity), cvvValidity = _useState7[0], setCvvValidity = _useState7[1];
        var _useState8 = hooks_module_m(DEFAULT_CARD_TYPE), cardType = _useState8[0], setCardType = _useState8[1];
        var _getStyles = getStyles(styleObject), generalStyle = _getStyles[0], inputStyle = _getStyles[1];
        var numberRef = hooks_module_h();
        var expiryRef = hooks_module_h();
        var cvvRef = hooks_module_h();
        var composedStyles = _extends({}, DEFAULT_STYLE, generalStyle);
        var cardNumberNavivation = {
            next: goToNextField(expiryRef),
            previous: function() {
                return belter.noop;
            }
        };
        var cardExpiryNavivation = {
            next: goToNextField(cvvRef),
            previous: goToPreviousField(numberRef)
        };
        var cardCvvNavivation = {
            next: function() {
                return belter.noop;
            },
            previous: goToPreviousField(expiryRef)
        };
        hooks_module_y((function() {
            autoFocusRef(numberRef);
        }), []);
        hooks_module_y((function() {
            var field = gqlErrorsObject.field, errors = gqlErrorsObject.errors;
            "number" === field && errors.length > 0 && setNumberValidity({
                isPotentiallyValid: !1,
                isValid: !1
            });
            "expiry" === field && errors.length > 0 && setExpiryValidity({
                isPotentiallyValid: !1,
                isValid: !1
            });
            "cvv" === field && errors.length > 0 && setCvvValidity({
                isPotentiallyValid: !1,
                isValid: !1
            });
        }), [ gqlErrorsObject ]);
        hooks_module_y((function() {
            var valid = Boolean(numberValidity.isValid && cvvValidity.isValid && expiryValidity.isValid);
            setIsValid(valid);
            var errors = setErrors({
                isNumberValid: numberValidity.isValid,
                isCvvValid: cvvValidity.isValid,
                isExpiryValid: expiryValidity.isValid,
                gqlErrorsObject: gqlErrorsObject
            });
            onChange({
                value: {
                    number: number,
                    cvv: cvv,
                    expiry: expiry
                },
                valid: valid,
                errors: errors
            });
        }), [ number, cvv, expiry, isValid, numberValidity, cvvValidity, expiryValidity, cardType ]);
        return v(preact_module_d, null, v("style", {
            nonce: cspNonce
        }, styleToString(composedStyles)), v(CardNumber, {
            ref: numberRef,
            autocomplete: autocomplete,
            navigation: cardNumberNavivation,
            type: "text",
            className: "number " + (numberValidity.isPotentiallyValid || numberValidity.isValid ? "valid" : "invalid"),
            style: inputStyle,
            allowNavigation: !0,
            placeholder: null != (_placeholder$number = placeholder.number) ? _placeholder$number : "Card number",
            maxLength: "24",
            onChange: function(_ref2) {
                var type = _ref2.cardType;
                setNumber(_ref2.cardNumber);
                setCardType(_extends({}, type));
            },
            onValidityChange: function(validity) {
                return setNumberValidity(_extends({}, validity));
            }
        }), v(CardExpiry, {
            ref: expiryRef,
            autocomplete: autocomplete,
            navigation: cardExpiryNavivation,
            type: "text",
            className: "expiry " + (expiryValidity.isPotentiallyValid || expiryValidity.isValid ? "valid" : "invalid"),
            style: inputStyle,
            allowNavigation: !0,
            placeholder: null != (_placeholder$expiry = placeholder.expiry) ? _placeholder$expiry : "MM/YY",
            maxLength: "7",
            onChange: function(_ref3) {
                return setExpiry(convertDateFormat(_ref3.maskedDate));
            },
            onValidityChange: function(validity) {
                return setExpiryValidity(_extends({}, validity));
            }
        }), v(CardCVV, {
            ref: cvvRef,
            autocomplete: autocomplete,
            navigation: cardCvvNavivation,
            type: "text",
            cardType: cardType,
            className: "cvv " + (cvvValidity.isPotentiallyValid || cvvValidity.isValid ? "valid" : "invalid"),
            style: inputStyle,
            allowNavigation: !0,
            placeholder: null != (_placeholder$cvv = placeholder.cvv) ? _placeholder$cvv : "CVV",
            maxLength: getCvvLength(cardType),
            onChange: function(_ref4) {
                return setCvv(_ref4.cardCvv);
            },
            onValidityChange: function(validity) {
                return setCvvValidity(_extends({}, validity));
            }
        }));
    }
    function CardNumberField(_ref5) {
        var _placeholder$number2;
        var cspNonce = _ref5.cspNonce, onChange = _ref5.onChange, _ref5$styleObject = _ref5.styleObject, styleObject = void 0 === _ref5$styleObject ? {} : _ref5$styleObject, _ref5$placeholder = _ref5.placeholder, placeholder = void 0 === _ref5$placeholder ? {} : _ref5$placeholder, autoFocusRef = _ref5.autoFocusRef, autocomplete = _ref5.autocomplete, _ref5$gqlErrors = _ref5.gqlErrors, gqlErrors = void 0 === _ref5$gqlErrors ? [] : _ref5$gqlErrors;
        var _useState9 = hooks_module_m(""), number = _useState9[0], setNumber = _useState9[1];
        var _useState10 = hooks_module_m(initFieldValidity), numberValidity = _useState10[0], setNumberValidity = _useState10[1];
        var _getStyles2 = getStyles(styleObject), generalStyle = _getStyles2[0], inputStyle = _getStyles2[1];
        var numberRef = hooks_module_h();
        var composedStyles = _extends({}, {
            input: DEFAULT_INPUT_STYLE
        }, generalStyle);
        var isValid = numberValidity.isValid, isPotentiallyValid = numberValidity.isPotentiallyValid;
        hooks_module_y((function() {
            autoFocusRef(numberRef);
        }), []);
        hooks_module_y((function() {
            gqlErrors.length > 0 && setNumberValidity({
                isPotentiallyValid: !1,
                isValid: !1
            });
        }), [ gqlErrors ]);
        hooks_module_y((function() {
            var errors = setErrors({
                isNumberValid: numberValidity.isValid,
                gqlErrorsObject: {
                    field: "number",
                    errors: gqlErrors
                }
            });
            onChange({
                value: number,
                valid: numberValidity.isValid,
                errors: errors
            });
        }), [ number, isValid, isPotentiallyValid ]);
        return v(preact_module_d, null, v("style", {
            nonce: cspNonce
        }, styleToString(composedStyles)), v(CardNumber, {
            ref: numberRef,
            type: "text",
            autocomplete: autocomplete,
            className: "number " + (numberValidity.isPotentiallyValid || numberValidity.isValid ? "valid" : "invalid"),
            style: inputStyle,
            placeholder: null != (_placeholder$number2 = placeholder.number) ? _placeholder$number2 : "Card number",
            maxLength: "24",
            onChange: function(_ref6) {
                return setNumber(_ref6.cardNumber);
            },
            onValidityChange: function(validity) {
                return setNumberValidity(validity);
            }
        }));
    }
    function CardExpiryField(_ref7) {
        var _placeholder$expiry2;
        var cspNonce = _ref7.cspNonce, onChange = _ref7.onChange, _ref7$styleObject = _ref7.styleObject, styleObject = void 0 === _ref7$styleObject ? {} : _ref7$styleObject, _ref7$placeholder = _ref7.placeholder, placeholder = void 0 === _ref7$placeholder ? {} : _ref7$placeholder, autoFocusRef = _ref7.autoFocusRef, autocomplete = _ref7.autocomplete, _ref7$gqlErrors = _ref7.gqlErrors, gqlErrors = void 0 === _ref7$gqlErrors ? [] : _ref7$gqlErrors;
        var _useState11 = hooks_module_m(""), expiry = _useState11[0], setExpiry = _useState11[1];
        var _useState12 = hooks_module_m(initFieldValidity), expiryValidity = _useState12[0], setExpiryValidity = _useState12[1];
        var _getStyles3 = getStyles(styleObject), generalStyle = _getStyles3[0], inputStyle = _getStyles3[1];
        var expiryRef = hooks_module_h();
        var composedStyles = _extends({}, {
            input: DEFAULT_INPUT_STYLE
        }, generalStyle);
        var isValid = expiryValidity.isValid, isPotentiallyValid = expiryValidity.isPotentiallyValid;
        hooks_module_y((function() {
            autoFocusRef(expiryRef);
        }), []);
        hooks_module_y((function() {
            gqlErrors.length > 0 && setExpiryValidity({
                isPotentiallyValid: !1,
                isValid: !1
            });
        }), [ gqlErrors ]);
        hooks_module_y((function() {
            var errors = setErrors({
                isExpiryValid: expiryValidity.isValid
            });
            onChange({
                value: expiry,
                valid: expiryValidity.isValid,
                errors: errors
            });
        }), [ expiry, isValid, isPotentiallyValid ]);
        return v(preact_module_d, null, v("style", {
            nonce: cspNonce
        }, styleToString(composedStyles)), v(CardExpiry, {
            ref: expiryRef,
            type: "text",
            autocomplete: autocomplete,
            className: "expiry " + (expiryValidity.isPotentiallyValid || expiryValidity.isValid ? "valid" : "invalid"),
            style: inputStyle,
            placeholder: null != (_placeholder$expiry2 = placeholder.expiry) ? _placeholder$expiry2 : "MM/YY",
            maxLength: "7",
            onChange: function(_ref8) {
                return setExpiry(convertDateFormat(_ref8.maskedDate));
            },
            onValidityChange: function(validity) {
                return setExpiryValidity(validity);
            }
        }));
    }
    function CardCVVField(_ref9) {
        var _placeholder$cvv2;
        var cspNonce = _ref9.cspNonce, onChange = _ref9.onChange, _ref9$styleObject = _ref9.styleObject, styleObject = void 0 === _ref9$styleObject ? {} : _ref9$styleObject, _ref9$placeholder = _ref9.placeholder, placeholder = void 0 === _ref9$placeholder ? {} : _ref9$placeholder, autoFocusRef = _ref9.autoFocusRef, autocomplete = _ref9.autocomplete, _ref9$gqlErrors = _ref9.gqlErrors, gqlErrors = void 0 === _ref9$gqlErrors ? [] : _ref9$gqlErrors;
        var _useState13 = hooks_module_m(""), cvv = _useState13[0], setCvv = _useState13[1];
        var _useState14 = hooks_module_m(initFieldValidity), cvvValidity = _useState14[0], setCvvValidity = _useState14[1];
        var _getStyles4 = getStyles(styleObject), generalStyle = _getStyles4[0], inputStyle = _getStyles4[1];
        var cvvRef = hooks_module_h();
        var composedStyles = _extends({}, {
            input: DEFAULT_INPUT_STYLE
        }, generalStyle);
        var isValid = cvvValidity.isValid, isPotentiallyValid = cvvValidity.isPotentiallyValid;
        hooks_module_y((function() {
            autoFocusRef(cvvRef);
        }), []);
        hooks_module_y((function() {
            gqlErrors.length > 0 && setCvvValidity({
                isPotentiallyValid: !1,
                isValid: !1
            });
        }), [ gqlErrors ]);
        hooks_module_y((function() {
            var errors = setErrors({
                isCvvValid: cvvValidity.isValid
            });
            onChange({
                value: cvv,
                valid: cvvValidity.isValid,
                errors: errors
            });
        }), [ cvv, isValid, isPotentiallyValid ]);
        return v(preact_module_d, null, v("style", {
            nonce: cspNonce
        }, styleToString(composedStyles)), v(CardCVV, {
            ref: cvvRef,
            type: "text",
            autocomplete: autocomplete,
            className: "cvv " + (cvvValidity.isPotentiallyValid || cvvValidity.isValid ? "valid" : "invalid"),
            style: inputStyle,
            placeholder: null != (_placeholder$cvv2 = placeholder.cvv) ? _placeholder$cvv2 : "CVV",
            maxLength: "4",
            onChange: function(_ref10) {
                return setCvv(_ref10.cardCvv);
            },
            onValidityChange: function(validity) {
                return setCvvValidity(validity);
            }
        }));
    }
    function CardNameField(_ref11) {
        var _placeholder$name;
        var cspNonce = _ref11.cspNonce, onChange = _ref11.onChange, _ref11$styleObject = _ref11.styleObject, styleObject = void 0 === _ref11$styleObject ? {} : _ref11$styleObject, _ref11$placeholder = _ref11.placeholder, placeholder = void 0 === _ref11$placeholder ? {} : _ref11$placeholder, autoFocusRef = _ref11.autoFocusRef, _ref11$gqlErrors = _ref11.gqlErrors, gqlErrors = void 0 === _ref11$gqlErrors ? [] : _ref11$gqlErrors;
        var _useState15 = hooks_module_m(""), name = _useState15[0], setName = _useState15[1];
        var _useState16 = hooks_module_m(initFieldValidity), nameValidity = _useState16[0], setNameValidity = _useState16[1];
        var _getStyles5 = getStyles(styleObject), generalStyle = _getStyles5[0], inputStyle = _getStyles5[1];
        var nameRef = hooks_module_h();
        var composedStyles = _extends({}, {
            input: DEFAULT_INPUT_STYLE
        }, generalStyle);
        var isValid = nameValidity.isValid, isPotentiallyValid = nameValidity.isPotentiallyValid;
        hooks_module_y((function() {
            autoFocusRef(nameRef);
        }), []);
        hooks_module_y((function() {
            gqlErrors.length > 0 && setNameValidity({
                isPotentiallyValid: !1,
                isValid: !1
            });
        }), [ gqlErrors ]);
        hooks_module_y((function() {
            var errors = setErrors({
                isNameValid: nameValidity.isValid
            });
            onChange({
                value: name,
                valid: nameValidity.isValid,
                errors: errors
            });
        }), [ name, isValid, isPotentiallyValid ]);
        return v(preact_module_d, null, v("style", {
            nonce: cspNonce
        }, styleToString(composedStyles)), v(CardName, {
            ref: nameRef,
            type: "text",
            className: "name " + (nameValidity.isPotentiallyValid || nameValidity.isValid ? "valid" : "invalid"),
            style: inputStyle,
            placeholder: null != (_placeholder$name = placeholder.name) ? _placeholder$name : "Cardholder name",
            maxLength: "255",
            onChange: function(_ref12) {
                return setName(_ref12.cardName);
            },
            onValidityChange: function(validity) {
                return setNameValidity(validity);
            }
        }));
    }
    function Page(_ref) {
        var cspNonce = _ref.cspNonce, props = _ref.props;
        var facilitatorAccessToken = props.facilitatorAccessToken, style = props.style, disableAutocomplete = props.disableAutocomplete, placeholder = props.placeholder, type = props.type, onChange = props.onChange, xport = props.export;
        var _useState = hooks_module_m(), fieldValue = _useState[0], setFieldValue = _useState[1];
        var _useState2 = hooks_module_m(!1), fieldValid = _useState2[0], setFieldValid = _useState2[1];
        var _useState3 = hooks_module_m([]), fieldErrors = _useState3[0], setFieldErrors = _useState3[1];
        var _useState4 = hooks_module_m(), mainRef = _useState4[0], setRef = _useState4[1];
        var _useState5 = hooks_module_m({
            singleField: {},
            numberField: [],
            expiryField: [],
            cvvField: []
        }), fieldGQLErrors = _useState5[0], setFieldGQLErrors = _useState5[1];
        var autocomplete;
        disableAutocomplete && (autocomplete = "off");
        var getFieldValue = function() {
            return fieldValue;
        };
        var isFieldValid = function() {
            return fieldValid;
        };
        var setGqlErrors = function(errorData) {
            var errors = errorData.errors;
            var errorObject = _extends({}, fieldGQLErrors);
            if ("single" === type) errorObject.singleField = _extends({}, errorData); else if (errors && errors.length) switch (type) {
              case "number":
                errorObject.numberField = [].concat(errors);
                break;

              case "expiry":
                errorObject.expiryField = [].concat(errors);
                break;

              case "cvv":
                errorObject.cvvField = [].concat(errors);
                break;

              case "name":
                errorObject.nameField = [].concat(errors);
            }
            setFieldGQLErrors(errorObject);
        };
        var resetGQLErrors = function() {
            setFieldGQLErrors({
                singleField: {},
                numberField: [],
                expiryField: [],
                cvvField: [],
                nameField: []
            });
        };
        hooks_module_y((function() {
            onChange({
                isValid: fieldValid,
                errors: fieldErrors
            });
        }), [ fieldValid, fieldErrors ]);
        hooks_module_y((function() {
            (input = mainRef) && window.addEventListener("focus", (function() {
                setTimeout((function() {
                    var activeEl = document.activeElement;
                    if (activeEl === document.body || activeEl === document.documentElement) {
                        !function(input) {
                            var inputIsEmptyInitially = "" === input.value;
                            inputIsEmptyInitially && (input.value = " ");
                            var start = input.selectionStart;
                            var end = input.selectionEnd;
                            input.setSelectionRange(0, 0);
                            input.setSelectionRange(start, end);
                            inputIsEmptyInitially && (input.value = "");
                        }(input);
                        input.focus();
                    }
                }), 1);
            }));
            var input;
        }), [ mainRef ]);
        hooks_module_y((function() {
            !function(_ref) {
                window.exports = {
                    name: _ref.name,
                    isFieldValid: _ref.isFieldValid,
                    getFieldValue: _ref.getFieldValue,
                    setGqlErrors: _ref.setGqlErrors,
                    resetGQLErrors: _ref.resetGQLErrors
                };
            }({
                name: CARD_FIELD_TYPE_TO_FRAME_NAME[type],
                isFieldValid: isFieldValid,
                getFieldValue: getFieldValue,
                setGqlErrors: setGqlErrors,
                resetGQLErrors: resetGQLErrors
            });
            xport({
                submit: function(extraData) {
                    var extraFields = function(extraData) {
                        return !extraData || "object" != typeof extraData || Array.isArray(extraData) ? {} : Object.keys(extraData).reduce((function(acc, key) {
                            VALID_EXTRA_FIELDS.includes(key) && (acc[key] = extraData[key]);
                            return acc;
                        }), {});
                    }(extraData);
                    return submitCardFields({
                        facilitatorAccessToken: facilitatorAccessToken,
                        extraFields: extraFields
                    });
                }
            });
        }), [ fieldValid, fieldValue ]);
        var onFieldChange = function(_ref2) {
            var valid = _ref2.valid, errors = _ref2.errors;
            var newFieldValue = "object" == typeof (value = _ref2.value) ? _extends({}, value) : value;
            var value;
            setFieldValue(newFieldValue);
            setFieldErrors([].concat(errors));
            setFieldValid(valid);
            resetGQLErrors();
        };
        return v(preact_module_d, null, v("style", {
            nonce: cspNonce
        }, "\n                    * {\n                        box-sizing: border-box;\n                    }\n\n                    html, body {\n                        margin: 0;\n                        padding: 0;\n                        height: 100%;\n                    }\n\n                    body {\n                        display: inline-block;\n                        width: 100%;\n                        font-size: 100%;\n                        font-family: monospace;\n                    }\n\n                    *:focus {\n                        outline: none;\n                    }\n                "), "single" === type ? v(CardField, {
            gqlErrorsObject: fieldGQLErrors.singleField,
            cspNonce: cspNonce,
            autocomplete: autocomplete,
            onChange: onFieldChange,
            styleObject: style,
            placeholder: placeholder,
            autoFocusRef: function(ref) {
                return setRef(ref.current.base);
            }
        }) : null, "number" === type ? v(CardNumberField, {
            ref: mainRef,
            gqlErrors: fieldGQLErrors.numberField,
            cspNonce: cspNonce,
            autocomplete: autocomplete,
            onChange: onFieldChange,
            styleObject: style,
            placeholder: placeholder,
            autoFocusRef: function(ref) {
                return setRef(ref.current.base);
            }
        }) : null, "cvv" === type ? v(CardCVVField, {
            ref: mainRef,
            gqlErrors: fieldGQLErrors.cvvField,
            cspNonce: cspNonce,
            autocomplete: autocomplete,
            onChange: onFieldChange,
            styleObject: style,
            placeholder: placeholder,
            autoFocusRef: function(ref) {
                return setRef(ref.current.base);
            }
        }) : null, "expiry" === type ? v(CardExpiryField, {
            ref: mainRef,
            gqlErrors: fieldGQLErrors.expiryField,
            cspNonce: cspNonce,
            autocomplete: autocomplete,
            onChange: onFieldChange,
            styleObject: style,
            placeholder: placeholder,
            autoFocusRef: function(ref) {
                return setRef(ref.current.base);
            }
        }) : null, "name" === type ? v(CardNameField, {
            ref: mainRef,
            gqlErrors: fieldGQLErrors.nameField,
            cspNonce: cspNonce,
            onChange: onFieldChange,
            styleObject: style,
            placeholder: placeholder,
            autoFocusRef: function(ref) {
                return setRef(ref.current.base);
            }
        }) : null);
    }
    function setupCard(_ref3) {
        u = v(Page, {
            cspNonce: _ref3.cspNonce,
            props: getCardProps({
                facilitatorAccessToken: _ref3.facilitatorAccessToken
            })
        }), i = util_getBody(), l.__ && l.__(u, i), r = !1 ? null : i.__k, f = [], j(i, u = i.__k = v(preact_module_d, null, [ u ]), r || preact_module_e, preact_module_e, void 0 !== i.ownerSVGElement, r ? null : i.firstChild ? n.call(i.childNodes) : null, f, r ? r.__e : i.firstChild, !1), 
        z(f, u);
        var u, i, r, f;
    }
} ]);