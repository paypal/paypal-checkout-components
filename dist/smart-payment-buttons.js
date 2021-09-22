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
    return __webpack_require__(__webpack_require__.s = "./src/button/index.js");
}({
    "./node_modules/@paypal/sdk-constants/dist/paypal-sdk-constants.js": function(module, exports, __webpack_require__) {
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
                return C;
            })), S.d(N, "DEFAULT_CURRENCY", (function() {
                return u;
            })), S.d(N, "DEFAULT_INTENT", (function() {
                return a;
            })), S.d(N, "DEFAULT_COMMIT", (function() {
                return L;
            })), S.d(N, "DEFAULT_SALE_COMMIT", (function() {
                return d;
            })), S.d(N, "DEFAULT_NONSALE_COMMIT", (function() {
                return P;
            })), S.d(N, "DEFAULT_VAULT", (function() {
                return c;
            })), S.d(N, "DEFAULT_COMPONENTS", (function() {
                return U;
            })), S.d(N, "DEFAULT_DEBUG", (function() {
                return G;
            })), S.d(N, "ENV", (function() {
                return B;
            })), S.d(N, "MOBILE_ENV", (function() {
                return s;
            })), S.d(N, "ERROR_CODE", (function() {
                return K;
            })), S.d(N, "FPTI_KEY", (function() {
                return f;
            })), S.d(N, "FPTI_USER_ACTION", (function() {
                return p;
            })), S.d(N, "FPTI_DATA_SOURCE", (function() {
                return l;
            })), S.d(N, "FPTI_FEED", (function() {
                return Y;
            })), S.d(N, "FPTI_SDK_NAME", (function() {
                return V;
            })), S.d(N, "FUNDING", (function() {
                return m;
            })), S.d(N, "FUNDING_BRAND_LABEL", (function() {
                return y;
            })), S.d(N, "CARD", (function() {
                return b;
            })), S.d(N, "WALLET_INSTRUMENT", (function() {
                return W;
            })), S.d(N, "FUNDING_PRODUCTS", (function() {
                return J;
            })), S.d(N, "COUNTRY", (function() {
                return R;
            })), S.d(N, "LANG", (function() {
                return t;
            })), S.d(N, "COUNTRY_LANGS", (function() {
                return T;
            })), S.d(N, "INTENT", (function() {
                return e;
            })), S.d(N, "COMMIT", (function() {
                return n;
            })), S.d(N, "VAULT", (function() {
                return A;
            })), S.d(N, "CURRENCY", (function() {
                return F;
            })), S.d(N, "SDK_PATH", (function() {
                return r;
            })), S.d(N, "SDK_SETTINGS", (function() {
                return H;
            })), S.d(N, "SDK_QUERY_KEYS", (function() {
                return D;
            })), S.d(N, "COMPONENTS", (function() {
                return _;
            })), S.d(N, "DEBUG", (function() {
                return I;
            })), S.d(N, "QUERY_BOOL", (function() {
                return o;
            })), S.d(N, "UNKNOWN", (function() {
                return Z;
            })), S.d(N, "PROTOCOL", (function() {
                return O;
            })), S.d(N, "PAGE_TYPES", (function() {
                return i;
            })), S.d(N, "MERCHANT_ID_MAX", (function() {
                return M;
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
            }, T = {
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
                CZ: [ t.CS, t.EN, t.FR, t.ES, t.ZH ],
                DE: [ t.DE, t.EN ],
                DJ: [ t.FR, t.EN, t.ES, t.ZH ],
                DK: [ t.DA, t.EN ],
                DM: [ t.EN, t.FR, t.ES, t.ZH ],
                DO: [ t.ES, t.EN, t.FR, t.ZH ],
                DZ: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
                EC: [ t.ES, t.EN, t.FR, t.ZH ],
                EE: [ t.ET, t.EN, t.RU, t.FR, t.ES, t.ZH ],
                EG: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
                ER: [ t.EN, t.FR, t.ES, t.ZH ],
                ES: [ t.ES, t.EN ],
                ET: [ t.EN, t.FR, t.ES, t.ZH ],
                FI: [ t.FI, t.EN, t.FR, t.ES, t.ZH ],
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
                GR: [ t.EL, t.EN, t.FR, t.ES, t.ZH ],
                GT: [ t.ES, t.EN, t.FR, t.ZH ],
                GW: [ t.EN, t.FR, t.ES, t.ZH ],
                GY: [ t.EN, t.FR, t.ES, t.ZH ],
                HK: [ t.EN, t.ZH_HANT, t.ZH ],
                HN: [ t.ES, t.EN, t.FR, t.ZH ],
                HR: [ t.EN ],
                HU: [ t.HU, t.EN, t.FR, t.ES, t.ZH ],
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
                LT: [ t.LT, t.EN, t.RU, t.FR, t.ES, t.ZH ],
                LU: [ t.EN, t.DE, t.FR, t.ES, t.ZH ],
                LV: [ t.LV, t.EN, t.RU, t.FR, t.ES, t.ZH ],
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
                RO: [ t.RO, t.EN, t.FR, t.ES, t.ZH ],
                RS: [ t.EN, t.FR, t.ES, t.ZH ],
                RU: [ t.RU, t.EN ],
                RW: [ t.FR, t.EN, t.ES, t.ZH ],
                SA: [ t.AR, t.EN, t.FR, t.ES, t.ZH ],
                SB: [ t.EN, t.FR, t.ES, t.ZH ],
                SC: [ t.FR, t.EN, t.ES, t.ZH ],
                SE: [ t.SV, t.EN ],
                SG: [ t.EN ],
                SH: [ t.EN, t.FR, t.ES, t.ZH ],
                SI: [ t.SL, t.EN, t.FR, t.ES, t.ZH ],
                SJ: [ t.EN, t.FR, t.ES, t.ZH ],
                SK: [ t.SK, t.EN, t.FR, t.ES, t.ZH ],
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
            }, e = {
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
            }, F = {
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
            }, r = "/sdk/js", H = {
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
                USER_EXPERIENCE_FLOW: "data-user-experience-flow"
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
            }, _ = {
                BUTTONS: "buttons",
                HOSTED_FIELDS: "hosted-fields"
            }, I = {
                TRUE: !0,
                FALSE: !1
            }, o = {
                TRUE: "true",
                FALSE: "false"
            }, Z = "unknown", O = {
                HTTP: "http",
                HTTPS: "https"
            }, i = {
                HOME: "home",
                PRODUCT: "product",
                CART: "cart",
                CHECKOUT: "checkout",
                PRODUCT_LISTING: "product-listing",
                SEARCH_RESULTS: "search-results",
                PRODUCT_DETAILS: "product-details",
                MINI_CART: "mini-cart"
            }, M = 10, C = R.US, u = F.USD, a = e.CAPTURE, L = n.TRUE, d = n.TRUE, P = n.TRUE, c = A.FALSE, U = _.BUTTONS, G = I.FALSE, B = {
                LOCAL: "local",
                STAGE: "stage",
                SANDBOX: "sandbox",
                PRODUCTION: "production",
                TEST: "test"
            }, s = {
                ANDROID: "android",
                IOS: "iOS"
            }, K = {
                VALIDATION_ERROR: "validation_error"
            }, f = {
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
                USER_IDENTITY_METHOD: "user_identity_method"
            }, p = {
                COMMIT: "commit",
                CONTINUE: "continue"
            }, l = {
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
                WECHATPAY: "wechatpay",
                MERCADOPAGO: "mercadopago"
            }, y = {
                PAYPAL: "PayPal",
                CREDIT: "PayPal Credit"
            }, b = {
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
                PAY_IN_4: "payIn4",
                PAYLATER: "paylater",
                CREDIT: "credit"
            }, h = {
                DESKTOP: "desktop",
                MOBILE: "mobile"
            }, k = !0;
        } ]);
    },
    "./node_modules/@paypal/sdk-constants/index.js": function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__("./node_modules/@paypal/sdk-constants/dist/paypal-sdk-constants.js");
    },
    "./src/button/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "setupButton", (function() {
            return setupButton;
        }));
        __webpack_require__.d(__webpack_exports__, "TYPES", (function() {
            return button_props_TYPES;
        }));
        __webpack_require__.d(__webpack_exports__, "getButtonProps", (function() {
            return getButtonProps;
        }));
        __webpack_require__.d(__webpack_exports__, "getComponents", (function() {
            return getComponents;
        }));
        __webpack_require__.d(__webpack_exports__, "getConfig", (function() {
            return getConfig;
        }));
        __webpack_require__.d(__webpack_exports__, "getServiceData", (function() {
            return getServiceData;
        }));
        function getUserAgent() {
            return window.navigator.mockUserAgent || window.navigator.userAgent;
        }
        function isDevice(userAgent) {
            void 0 === userAgent && (userAgent = getUserAgent());
            return !!userAgent.match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i);
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
        function supportsPopups(ua) {
            void 0 === ua && (ua = getUserAgent());
            return !(function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return !!isIos(ua) && (!!function(ua) {
                    void 0 === ua && (ua = getUserAgent());
                    return /\bGSA\b/.test(ua);
                }(ua) || /.+AppleWebKit(?!.*Safari)|.*WKWebView/.test(ua));
            }(ua) || function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return !!isAndroid(ua) && /Version\/[\d.]+/.test(ua) && !isOperaMini(ua);
            }(ua) || isOperaMini(ua) || function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /FxiOS/i.test(ua);
            }(ua) || function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /EdgiOS/i.test(ua);
            }(ua) || function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /FBAN/.test(ua) || /FBAV/.test(ua);
            }(ua) || function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /QQBrowser/.test(ua);
            }(ua) || "undefined" != typeof process && process.versions && process.versions.electron || (userAgent = getUserAgent(), 
            /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent)) || !0 === window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches);
            var userAgent;
        }
        function isChrome(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /Chrome|Chromium|CriOS/.test(ua);
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
                try {
                    throw new Error("ZalgoPromise");
                } catch (err) {
                    this.stack = err.stack;
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
                                throw new Error((err.stack || err.toString()) + "\n\nFrom promise:\n\n" + promise.stack);
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
        function isAboutProtocol(win) {
            void 0 === win && (win = window);
            return "about:" === win.location.protocol;
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
            var protocol = location.protocol;
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
        function getTop(win) {
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
        }
        function getAllFramesInWindow(win) {
            var top = getTop(win);
            if (!top) throw new Error("Can not determine top window");
            var result = [].concat(getAllChildFrames(top), [ top ]);
            -1 === result.indexOf(win) && (result = [].concat(result, [ win ], getAllChildFrames(win)));
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
        function onCloseWindow(win, callback, delay, maxtime) {
            void 0 === delay && (delay = 1e3);
            void 0 === maxtime && (maxtime = 1 / 0);
            var timeout;
            !function check() {
                if (isWindowClosed(win)) {
                    timeout && clearTimeout(timeout);
                    return callback();
                }
                if (maxtime <= 0) clearTimeout(timeout); else {
                    maxtime -= delay;
                    timeout = setTimeout(check, delay);
                }
            }();
            return {
                cancel: function() {
                    timeout && clearTimeout(timeout);
                }
            };
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
                    }(val) + "]" : val;
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
                var cacheKey = serializeArgs(args);
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
        function once(method) {
            var called = !1;
            return setFunctionName((function() {
                if (!called) {
                    called = !0;
                    return method.apply(this, arguments);
                }
            }), getFunctionName(method) + "::once");
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
        function urlEncode(str) {
            return encodeURIComponent(str);
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
            void 0 === props && (props = {});
            return props && Object.keys(props).length ? function(obj) {
                void 0 === obj && (obj = {});
                return Object.keys(obj).filter((function(key) {
                    return "string" == typeof obj[key] || "boolean" == typeof obj[key];
                })).map((function(key) {
                    var val = obj[key];
                    if ("string" != typeof val && "boolean" != typeof val) throw new TypeError("Invalid type for query");
                    return urlEncode(key) + "=" + urlEncode(val.toString());
                })).join("&");
            }(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
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
        function dom_redirect(url, win) {
            void 0 === win && (win = window);
            return new promise_ZalgoPromise((function(resolve) {
                win.location = url;
                (function(url) {
                    return -1 === url.indexOf("#") || 0 !== url.indexOf("#") && url.split("#")[0] !== window.location.href.split("#")[0];
                })(url) || resolve();
            }));
        }
        function getPerformance() {
            return inlineMemoize(getPerformance, (function() {
                var performance = window.performance;
                if (performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0) return performance;
            }));
        }
        function dom_isBrowser() {
            return "undefined" != typeof window && void 0 !== window.location;
        }
        function querySelectorAll(selector, doc) {
            void 0 === doc && (doc = window.document);
            return [].slice.call(doc.querySelectorAll(selector));
        }
        function dom_onClick(element, handler) {
            element.addEventListener("touchstart", src_util_noop);
            element.addEventListener("click", handler);
            element.addEventListener("keypress", (function(event) {
                if (13 === event.keyCode || 32 === event.keyCode) return handler(event);
            }));
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
        };
        var VAULT = {
            TRUE: !0,
            FALSE: !1
        };
        var LSAT_UPGRADE_EXCLUDED_MERCHANTS = [ "AQipcJ1uXz50maKgYx49lKUB8MlSOXP573M6cpsFpHqDZOqnopsJpfYY7bQC_9CtQJsEhGlk8HLs2oZz", "Aco-yrRKihknb5vDBbDOdtYywjYMEPaM7mQg6kev8VDAz01lLA88J4oAUnF4UV9F_InqkqX7K62_jOjx", "AeAiB9K2rRsTXsFKZt4FMAQ8a6VEu4hijducis3a8NcIjV2J_c5I2H2PYhT3qCOwxT8P4l17skqgBlmg", "AXKrWRqEvxiDoUIZQaD1tFi2QhtmhWve3yTDBi58bxWjieYJ9j73My-yJmM7hP00JvOXu4YD6L2eaI5O", "AfRTnXv_QcuVyalbUxThtgk1xTygygsdevlBUTz36dDgD6XZNHp3Ym99a-mjMaokXyTTiI8VJ9mRgaFB", "AejlsIlg_KjKjmLKqxJqFIAwn3ZP02emx41Z2It4IfirQ-nNgZgzWk1CU-Q1QDbYUXjWoYJZ4dq1S2pK", "AQXD7-m_2yMo-5AxJ1fQaPeEWYDE7NZ9XrLzEXeiPLTHDu9vfe_T0foF8BoX8K5cMfXuRDysUEmhw-8Z" ];
        var AUTO_FLUSH_LEVEL = [ "warn", "error" ];
        var LOG_LEVEL_PRIORITY = [ "error", "warn", "info", "debug" ];
        var sendBeacon = function(_ref2) {
            var url = _ref2.url, data = _ref2.data, _ref2$useBlob = _ref2.useBlob, useBlob = void 0 === _ref2$useBlob || _ref2$useBlob;
            try {
                var json = JSON.stringify(data);
                if (useBlob) {
                    var blob = new Blob([ json ], {
                        type: "application/json"
                    });
                    return window.navigator.sendBeacon(url, blob);
                }
                return window.navigator.sendBeacon(url, json);
            } catch (e) {
                return !1;
            }
        };
        var extendIfDefined = function(target, source) {
            for (var key in source) source.hasOwnProperty(key) && (target[key] = source[key]);
        };
        function httpTransport(_ref) {
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
                    url: url,
                    data: json,
                    useBlob: !1
                }) : sendBeacon({
                    url: url,
                    data: json,
                    useBlob: !0
                }));
                return beaconResult || request({
                    url: url,
                    method: method,
                    headers: headers,
                    json: json
                });
            })).then(src_util_noop);
        }
        function Logger(_ref2) {
            var url = _ref2.url, prefix = _ref2.prefix, _ref2$logLevel = _ref2.logLevel, logLevel = void 0 === _ref2$logLevel ? "debug" : _ref2$logLevel, _ref2$transport = _ref2.transport, transport = void 0 === _ref2$transport ? httpTransport : _ref2$transport, amplitudeApiKey = _ref2.amplitudeApiKey, _ref2$flushInterval = _ref2.flushInterval, flushInterval = void 0 === _ref2$flushInterval ? 6e4 : _ref2$flushInterval, _ref2$enableSendBeaco = _ref2.enableSendBeacon, enableSendBeacon = void 0 !== _ref2$enableSendBeaco && _ref2$enableSendBeaco;
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
        var ORDERS_API_URL = "/v2/checkout/orders";
        var FUNDING_SKIP_LOGIN = ((_FUNDING_SKIP_LOGIN = {}).paypal = "paypal", _FUNDING_SKIP_LOGIN.paylater = "paypal", 
        _FUNDING_SKIP_LOGIN.credit = "paypal", _FUNDING_SKIP_LOGIN);
        var AMPLITUDE_API_KEY = ((_AMPLITUDE_API_KEY = {}).test = "a23fb4dfae56daf7c3212303b53a8527", 
        _AMPLITUDE_API_KEY.local = "a23fb4dfae56daf7c3212303b53a8527", _AMPLITUDE_API_KEY.stage = "a23fb4dfae56daf7c3212303b53a8527", 
        _AMPLITUDE_API_KEY.sandbox = "a23fb4dfae56daf7c3212303b53a8527", _AMPLITUDE_API_KEY.production = "ce423f79daba95faeb0694186170605c", 
        _AMPLITUDE_API_KEY);
        var ORDER_VALIDATION_WHITELIST = [ "AWU8hQWR5S8ynvUCz0T-tt2uRPzt7-wcIp_clASLr3KrXNdKcr_iPzgNsk4s3sOG2EzgOyqpeuL9Lt2Q", "AW2HA2wTdlPiJYixm961rEhamyefXVV4Y5CxJnRJGT_AnXVZuWnneEFnnGpDeIUZaCbpz_kwtEjFwo8x", "AU0KZbJCXg9J5OJXJxrUFMaCAkMvvrk-8khEB4vLyq76klYl5RSVGNrX4qh_aERn3Wsx5Vcn2eCPQ1fo", "AUku7YwlQ9LckQ9jBEAoDTOW_l-VyzeS2ZLNS4-kWoEI0Xh5VEFEgda7KeU3Z-bRIcZ4YzkJ6kp4CIZA", "ATyGfjcN1hYSg34FNM2QFpih-UgIKxiE6nC_HR4ifq2auBHxlzm7eFTToF0-GayrwDSNgwDmTYfPNvYD", "ARa44QaubKRAeUZRlkhqkWUAilO7IGlS6qcHJ4RmG6aaDuCAi232yOjfDwWmGJL5rdjvhaA_oHLVo3_y", "AZqSMr_O6WtkSWvp2GF526yJjSyjZsnaqvmp99w2gNJHtKfOdzpnNJiwjTd_yLjdf-wt2DUtJzFw16Bq", "AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb", "AZ27S6mY7iw1toHmoVzye1XwCiOJo_uIMYJIDpUwlTsG2rxTXW8Sl3tjUEwsS0TWGIkEq7CG1zXLLvvK", "Af8k4y06mmyTM4JxdmDUK0PJBR314Yz_nWddC13y5rHawFRREVmueGa0b-MMHl5_jvo6bMM1d7DnM2Uj", "AaRz5Xo5rOOW8Pq0ofvoKD5fb48gaPrKknItbEc1k79KH6z3aPsS5oUfu0uWj7BMuEru5_6jvhjSyvRs", "Aa5QWJGciaqznqahG4ooXiL9FNZuqEcL-vhdCMrb-jIMNAFpiG1SxW1GMcPmS5pQoxrwsOmV2KtNpk1Y", "AfzuuqC32z4_opOaPcCOgB0P112SCvGoJZi-79Yj5WGNoddoDQf7gG_mbGl3tZYJB_XsZ1dHDDgzhkH7", "AQ6b-BBBspp77ZytI3Hj0FKpACemsrXhu0Gds7ubWAoKxHCW1o7RnV76wCe4", "AfFU1v8QcnRtUY5xRwxW6nZlwGscc0dmMfVQP9Ce3mqKRvqddGBHnx62WhKVcAMPALE9aR1kPeJfy4xz", "AXjQJ2vHhgpu7DYUrE1IerCOOp9y-d8dSIMEIkc49ckjO9M04AehA8qm5jm0FIV7kO3CEtzZ8e-dp8-2", "AYJqlLYWc7pJ-z3rUJBdHicjlxRg-sQUPytyCpvgPcpB4X3rKZlrmJq6pQRUZ0Pb_LCV1cvi4CLGTA9d", "AQA6JMmn0j1yvIhc2mh0QP5HedKSpEEYQuZjHgmaIRVVlvzDWJU2twyT8OklWyz8NhVNlsKReUElO_xa", "AT-LIFIee2HjafB1SJxyxiX8Bnpv-bAEJKNNDFduENR8a7xGvcQRb_5QxxDq_nVF8L3hkBpqnyVue4vt", "AYc6HFlcGY99sz6mzMNWT10vuo6l1qwzKjlKeZ_JQuL2tkUtbKrWwNZ3pcFHZJYmFk5cXK92OodadpX2", "AZ8UUzGLndt7BWxjD-NobN8gFAarZV7PNN-XfBIM7_n3oU3roq610ytrpCtL2ikSOT_HtW8-2aq0HgTc", "AdC8njZRff48qO32BRskthX85OP6eGdW_2pwbySJl0WSa3MRPWGxddYiYf0ig9hkTu6ppWLp4uQFf7Wc", "AVm6hkTgp2kObqwkPrO0KZIHeREs426g_yaq1IPsoSz5ij0vOGGkBcmfIAB7ddrhdzFvDiE4S7FjGG46", "AdCK4t9F8PiG-Lbbpu9ot8TJmzlt6JqEjSBw0r4DuZQ-h8g6bU_RazHGajCSLfTfVtobXHH5NWq7-07H", "AefZb6HGDKO-Seg-Y-T7n8JMAahIQPYbQVoQdd8JKZmF-r8wV_BT8YvY1wq_6HJ3QpiGhH1x9wTI-Qer", "AZvPeGIweYjl7UjrBplKks_ABRUW12UVxZy4dw8bU7yVLvx5AxpP_kGy5VpnL5eiaqjeyY9bcIwp5UMs", "Ab1VkGmr1COkjo_6COidM4aQw32eggx3FrwdBLe_49nQjZvsN6NGFeKCiMfvgl1424JCAMWbDIB84nM9", "AfKPyV410xcQNtx6rx0yWBp0mmovau9eb_YyiB9uPX_lnWmXvOsdKN9HRWmEcDwcp0qzp74u_NijYth1", "Ab2xNfs6Tl9v49jUupCCg8Av_KDTVb1JKovfA92DPRDqjIWDDOmir3bx3cY4qLmgPxuhXNIIYm7K2Y3g", "AdmFNVRKWUWMj4UyEomTd0CW2hHQFcY9qB31B8PbWZYwzykfRS74Jw4vRC-5W1dScVuRwwFoeQAxFNoj", "AcMnb-pPPgZGWeK6bIi6sixOzjzSQnLBX875cg7XCwbhG9Fc6kRUiN7_qjlYHOX2FZMDDCXYC2Go65LF", "AXbYLpelIUb8i9iaFeQKXt3DlWpLyC1dc3d8WOx7fBMvPny-lHueS7DnFZnfIeOiRukpum5ejF8UdSzx", "AU6945tSYM7aVoRjvIEiFE4uLYn3WWXRAt_DbqbX0BCUDVfLdL_NB85NaJYRqkrRiU41pUwwom2E_47w", "AeLMaMHVVX61YKoNlLqoQ_1zX6MS3NBjvFZNBsrrOCgeZIeqoVwXWoVz681aMaXzSXkx2Q4CB2DzdxVV", "AU2UgmLki6ZfaDt27a7WM5J73IVi36nQva7oZGs5onuWbGyo1dqDf9ruVn-cgfjyNWYQvUzk54wOLgTh", "AaBPZpGg89TAPOa2VMaKwINvjpDh-EE7a-mZQ1vV95ZoEIz65ducH23QeIL1vPUFuuRGB2goniC9KrbB", "AbarfFDHDheK7p4Z-w7JZ8rXoPBWSALu91ZJXoRX-zGz3Y6eqFSzum4OyTxn7ZJXELy_tl1ZLimrzgyn", "AT4f7iaYeBKXSFR_e27h7F4z7h73L3-lMtH38jZh8KDQ5xp9NoTGpiz1oix4B69xiT1uFuBOI0r6_SLo", "ATWcvHcxfe1gfQ-znE_Ua6dVvX7fMRsdoBy1MmC_ApxPcG3rGZLDFoAkOmtJzrdRDFeu0EhXIAu17vJh", "AeV96uDGtI2SJMobKDHpR_IEhPD6NJG379LQHeFaCe_-GObH5rRCuP6-AWCarF2gh7dxh-si_uaWSxlu", "ASgMJnHCefNb23pO1tmCqWhvwT5D-opcT8W0TW2WeZXEnDw22r7epTCrSoNjKc8O4VlDLhP4oLEYyOHV", "AeGtpFEgJWl8EKAwx-jVRGZRy8fBYlZPG2cYL-kDJmKVv0o3tU3lOJNhzWMGjUdubmqsUtTcjyFzrsk2", "AUQRtcEq9z5DHLxjiSz3rwKgB1z-O-Df8nzNU2aKYxQbntIDV7rFiHGQrISElMo1JJR5N8sYpzqkq8Dg", "Aee7fyLlCExLFFB1Cs8eco2PsnVcNMYhj5KtFTxmmHLPGp3y2i_HyooUQtRCjKjN_445-7qjnoyR8r4w", "AfxJnj-1UN_l7r46FC27ufpCzt4ymiF7ctpexNeEH8hkQwJloFB5comni5SxflMYOkWnMXWTtVRzlbfZ", "ASCS3-SkSood0ZR2Ik8EtFZrI9MOKdEhptnQHypXbCk_z0wSICf6ElQ-ge5FACcGmtjKcV6h-xOWBqF2", "AdxKNW6Rvn2NyGD6r9N7C13nh9lKZnOJ_KaNAl0Nlj_csc_wmJnm3MgpyHOhugPhMChinj2Rfsr9mpDv", "AR5XPd0OP8aXFu_aHyBK9pP097vBH62c6afOj6sjH7KSB0CfNKZ6QIR_27rsKCZYmmCkRgjXePpTq01p", "AYb7yEHXW3_n24dkjn29InoA6dCPEDiKajhbrCwbIJTQfpGuzh8a5FS4MoyXyFsiK4vhgeWxtg6zuADW", "Afo1LVZtoaCSq5HI_naZpUMjB2C0_OiB6nNHlGaNe7jwBTunPXnbodmCr4ZTtpL3WT-4RkNG6DQFvX03", "AR67hODdVoxlUsOUT8BoHSYiOJ15WDQg90nkqwRP_14vVrEb1a3S4_caxBc-w51TV3AcMyACzYREtXrH", "AZxGGpjzsdT8yXYqFS_kp-Ai6E_7EwTJ03AoLiJj6z5TBXa6GZW5h2ZRfi5-K4Y6oLyrF8FpJpPqd5xY", "AUq0DPexx9Wb84WP3jKi9r2WH9xejePjH4KAsOdRj-q4f5PfwMZ_KpVhLvsJyo3lhpzqhOJEkqFspgGN", "AXOplj0iurFjzACM1RuuWcDRlVubsIQe7ry8SRAQg3LRVDyZbAmxOs2snzLSvNJhCtNNFANLf0cKguLe", "AUwoRlv3iZ3jt3o3hhcft_tZ5g6tvefEpjCf9YNGeH7q8p_WraleitkKfLnWIs8HLpzalgRA5AMT0BYO", "AQi-8_4bMO1BqBPldsz4FyybrZMDAeQO_uqEXfZsxgZGOrMbYl-pO7sKTnQpdsNxEgM-xa5HodTHXDQg", "AajSVnIsGJdD3fKO76SmA8HxLs9flPRpdLhp-KTM34I2ZZ12WqfLZ2S3zmbzwbwJOMi5AmS96jHXppPu", "Ady0oUeIgU24A60CEhog6THKv4rO0-58E1C6CXS3mfgBjonkj_fh6hYPP1_8qVzioVPhbX8JRbyeHV_1", "AW7mu9kZkNQnih14Ugvi7DmBpdouGHi8yv6DQHScKfz1pvNh7miD60WrQaf_sRQFbya9pln1JEhtx58F", "AejlsIlg_KjKjmLKqxJqFIAwn3ZP02emx41Z2It4IfirQ-nNgZgzWk1CU-Q1QDbYUXjWoYJZ4dq1S2pK", "AVfy3rhipHfrcpAARabvSbVcG8se_5Ye4Yez65UlXA2zNQAhFLwERbc7sFooSjc1pRkQDvpWM_-6UlQI", "AZNGPAzuZGI56_rR2d6Qt5Pg9p0EP0SlgqOLF1hJ-Jhyl7Fc4KLsW3WtUaQBsq7qEv-VcMfH3yRxckw_", "AdEIkRwwggl9QpNGdXzXlT6dPT5UcxS5G3pzdimct2fQlfv2e6JC-ZoR2wEaqy1VRSYN5zYATl04lQPJ", "AV2UhIeUzG0N23-zt7_KBQ3OhYq0ZurLSvm75NuFWl2iMtNiZr0k78AvPweLerv8DcdSENAAPy_qVHdc", "AX8Pb-sAgAFp_gHsk2dQX30ABfcvMabRjPRJ97IqRt9LWWGn6bsNiU1kYqMWBkRim_ONg1XnrOq9HycV", "AQkboqLaGeUqU-UcsupDWhGINLljqGPvy1pm6JMp1EQMcuz--sOwhOp20s0H4y1b_X6EYgUYmwl3_QbI", "AVxk36f8VzzEEbhmhFRdeWR0s6kjHJB88V3q1VCDDWO-vUHkpHDx5a3c5KBiSwrEnodgmIDyVrySo19W", "AbS9SBIomzAqKCnZgxxI922RWH4sRjcXQVkzbQoxwGh1yLU5K3NyBiIksj1qy-cgI0UTRaKEENdVA3UG", "Aeof7I__CpI_sDTMc0sabPC2AtcDFSWYTA-AuSX35LgSdK_nveXR1zNGPzWb5d-EkXP8EaHFvpTXOt_W", "AdFNiM95Vg_Xslrjr1PY-bUWGKHheQsGWo46dXPnSWfkGWhOpGqCH7SOivcQU1Bw968KwMiYIdOrC9C8", "AVQfN-d4gHcYcLlNAV5jcn17hiXLr5-yktBxwl_oviEHekLjF_VtiWEHzpc7qs8VBooeZ-9HNkIaZC8c", "AWZIhxjocZGX-AfhRrmStAUGypQjzWEQEnLV670Qui0ZdjBH2xiXlCEpnXbaHxxwV011ekhRWt6kWQzy", "AYJNkqXTB-LbDWY-geBeteUhFckZhmKUXoQm1EKrHFs_jT52-Xs9HrM4yZe19i65TLy-KTPSZrbQWL4d", "AaJdlGSlPSHCXuUsoizK7BX1gQGk-LXzvuTQuISXPz5aJf07UXhnNZBXHnZ6PBIGgPSLz_ezOW_JMWI5", "Ads-AIlYmzcupU4h7aNwYtZCoxFhsytxkGRc449oi4KTs8JxxM32te5WnObdQ63roSR6_ap_RX0o-TyU", "AezPnqbw-EqAB-3QxkcQzOTFu_BZB4p9ELEmDvBRIfNYi2MktC4OR3ls8-kfoRucnB7oQoZV_63a09RE", "ATqRzjL44zV0uvmI-I8UXaA7aGN5UgXaIYvPnXot4EhMOFhL02PqzVX5vFPJ3I7Q7ezYGDluKsYJbTlb", "AQb_uhCxkswoDV-msDRSEvBrENNqphJo-cGxMJ7nUa9hSArJhefMfdMvtVRN065kc4e2jp8rJ0X8yQrz", "AcxzPl0cMHMyjC5D4uMaQZ0oqjNEGNItIbUgeokdAXzFs9Tr2uYJEe4l76DUh4HnX0Bz3XSYR0Pnwn3q", "AbBeFZDAUYMZQ-EZMFQhx3K3_vvX2tU_45Lq6G4PrAzgP3gp6UfyaFVEg7DKo0diRDacyhcJO5Bpxij3", "AR337Je4oqSvRgX7HjX2Sv7M1VsK7Lme0WBssuEwW66bkphUUWw-JjjVvHNW4ttTdikGHraEBfD3pKcZ", "AXwYaDB1wXCQLJsQwaJhpckEFdZmuZMohfwEKH1vTm0Q5HJTw3t_Zqllc0unozCPPR19Ahlq08vNsPMw", "Af8uKf29kbmHdbkYF7rCs4cAwupeZQZ42HBlOTv8C1cPsQDleyL-KibrX2rI_qxUfPXgS-AmUcL2EkCn", "ARqhdSV3eoTacPNpD0m-xMnGuaYsbdCi8xCtAM_NKRqiZ_Kj2GcmrnpKRJOimbS4Dqg2WBlMZvM_a198", "ATdvBkuCmZU0bTUYpr6UZH43vK5293QKgxGkPSYgfr5zfib2PbHNeYI_NSuhsJkiGiQqCAMLkx4lSffx", "AZHX5-mWu26D4D6Ocw_8GxZTsvGtlFCm_clftgJLP0eixyZ0rTbVBu-T5RpTaw2JYXK1rzxIibE2wUcm", "AUYwY3jZaHqT-hh5Ogpy1WkNunjk_AWi9pjdm21kb5GFOyJUnquvZeUx1jPHLYSwS1l_pHvWudWZUocs", "AWkpAaV7rEJCfTdsnAZ11aisQ_SFD1MPCt8ZLZXRga7acQT2q3UffhOPc3ei5hoW--H3rXVTlIFnn1jM", "AbQ3QKqGPFeBWir6QK2na3JAFsMp9scbSOeRi0_15AA5q6XMi4hTRuO4Tmme6jmAi3SvRY4PTPDEqY7V", "ASD3LOuSg39EBl3Pd9PEZU6GMkA-yIJQhohSF4owo2fL2eelnrgRYQKYdbvtYI5O3IDp1Pw5iqEv5Hbe", "AVRFLjMTInsB9StyuRZltkDbN4Bhi-QiXcIeqPO6YPU7GSOLR3i8F9f6pVX38_EkmDhIpgXM-D4GnPdO", "AUoMvJA_FdhFwJEVL6Ri7YhdU2nrPQUoags0yhV22_17ZgWmfvh5Zqyyxpsba-dq-LH6w0tuIuEQJ2bp", "AfCSDNtSCNV6lzSOqF3jTnR2UHPdi225JVtSowAVEcDi6KgBYBP19qnwT14_dMcALbArsbQA1s4vVGM6", "AQUolB5X1HACW19AGVFANA1SuuJOArLYtyJ0zI2yvD1jVxgUhZbl4E-m4ry_emlAEsik3xm4gcvKKL_B", "AfWrrGm1rpmDZGvGBxD0UssB3Ru50PGNgIcaWOpAN8mFGGkgl4Othmu8kPlunsRgR8YwPerYCdtiWUVL", "ARnCYfY6j3qid5w7dQHUMtoRebesjooa-ZDvw-sgChzdIap0eGlxO5rwLQy-TwKB9FNtMvEaXjKOGatC", "AazXPDqbAnyE6iEbvPw8wYi2YpjIJkRczJUF5CiSKNoQ6rEmP6mMzwAlf_KDRzTazEUukaq2feqcYYuG", "AeDWFs5RFH33pB3skuP1M57jTWgMHSuKFMxJtkMddpYsR7SSEBanfqI1RN7LlRaQ_Jmjxb8-L_1dbIJW", "AdfXyxI-oHYghKou93lC4LRkRB0OP3-8h0L5srBeDzUYFwJ44_Jk4Vv71CKt3BlMUlGUGseBIoRFAu0F", "AaXrMQuzMiglUVTF6DWsGEXij4fOW_IQU5dZ49WvIGs-lBMiUtPW9PSVX8jQbwZZsDP10xEpAjUllgcr", "AYSLmzwkSsjQMKrDgKGmAfYjO-xr06W3-WWg0DfayGHeWu7Im7UB5eetTIHUso6d-zpcE_odqb6doeBz", "AaK4HlTbGd6DSR3mnUx7Xhc3DM5akcMdDQpqnawV1O2XkLZVuAAsHswM2PK8H2UBsddrcblhPgGV2PHL", "Aa5ceOuSFIsr-yA7Xc3p-3ZAFogzycThssblaTOUd1JpcLOUX8LUXApTe2m_QvmjAovdYcs1YujLvRtu", "AUf_Wbw9mq4zdVOg4XYC5JHrc-mGolFDwWF6ex-l7BA8lxCp7B0VKqU7BpQWlrfCxgKe5fqRL_N7Knz7", "AUH7PO7l4LubjN0ogPX2GY28oACKu296xjV1a0yRGWdd3EwfBmOyWSYO1doaZd0gx-Bx7Zao1SsY23EW", "AbH0SUlVzrLY0ldQG026EbqR0lVthG7UP5XpZGjoyTAUxyDNPvtyR67dcUSNLxOZSX2TLgNIRk5jX29D", "AeadV3OUHInuU5wL-D5zlR-luGSVIfX-nA90teNgJQGYscnG0RvVnq5eNme7pnHtcVnRCBVl4itjlG4b", "Acv9CfoOzVZ-rIwwd3xF6KK_meBjucMzn5m8LdlYHPr4sHr0u9adnH3DOlNrUA6QolpqhGEWmptO6lqi", "AeLH-VryI92PffbhsBWgsnhFBftVk8zwbupdi_LwKAQFckM6OmwTGbKWOOKfUz2LQctrtvVygNvs6iXf", "AQMYXqEHnLgLDn2Ke_4SefTHx4oL5pYbEmlp3g0D282gED7WCCFu4C6uMk8OqHdkTQIYmd63cr68_-Hq", "AT9wpTr3uD58XIjdJkQd6OOh_m9392fPJg3Oo1mSki98E3OvDqVw2U_uBZ4YltQjo3iNrn7ZlRz4JjGS", "AUqz2lilNW9t5eMx1VEwCMVSDeMHVas5zLpolzIGLDOjaJgS51Yy8fep4KKNQTUi-fj9yO7qIxSKRN23", "AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP", "AW6_nv9voVzeF2SPx2CeIWV3AYzNFDOiPOmoGtiRwQB6t58EN4ix_utEKqDHSAQUaxhYI-AtwnoQnMUL", "AXVv0WVqILDE_ALwvlqIuLMT4h_2OCQu28rZyzN6VHiB9dFlPFJpWyoZnkzUBYIbuuYwdxfNZPvNwqSJ", "AfcRKeMgHWWby7ltUUzqiTBoHmO4aVrsdNpRZVBiEZt7U56nKUGySIyNSK9m2JvCQfOGfjxI0oZKAYmS", "AQVhaTnL5pyyXwnn4D8pGfZIpSASJ3hvCfE04-2t-oZ5bxG0Br08c1v609avdfOd8M1jTGaAMZCu-MLa", "AQnAfBfkA8BoHKE63NS_bKyGpVaxxmgRfPzgxThwY_N9fTSrSITOKSSv6OTrpGHiSrA2YbLKo_KB4qeh", "Af_pMiA6ikCtlsNB8dJW1oG1ZI7FirXbRU43rDRfq_i_iQAPbYsojeI9Q2VzZvD1u2wKEPuaokZaNWyC", "Af3YaeRfoJGtncwLeiahT93xTYT0-wldEEaiGehhGspP333r6tADvHeVCwZPR022F4d0YQquv7Lik_PT", "AXg0AmHuT2a0Fg8NXx0SezjfLG9UgmLK1qE-fUfbAi6fEF1mbXWAcfp0-rlzFhWS-K_aXveJ2_h95E4x", "AdVBcUmJoUuavK3_TQkaUMV5S45EDAsY2G_GN9dw3MxbtdUeEu0Lio2nATu-cK5PUGJMqIUME4soaaDr", "AVVPnV2oTAsBDiXdmLnZxhgnVpGlYkMlByGm_SzWg_3e85tbRhD49Ix-Ucx3l0ib9BfmZykje0uV5KzK", "AfWrLXLdbApBAVcEvM7xmQwr2QhHMk6jbvAx4jDMnS4QGmkdxQ5uKDfwOV0jHyPC-0pRSisTRpB7sEby", "ARkuH9nh8MlJG8zEmVHx9jKsi8xWHR-P_1vWD8--7vsqaWl2zBO3_TAipWc6f9yMHmziI_0blQqViGFG", "AZgBvhDOw5FiH6rL1VPNaAQ68dmpMaAO-ZI0rg_QWC7of7SLT6JXSAagblw5", "Ae9ydowlZztIMFy9HbRaMTyLDltKCy1v-8Ip6J9WkU4WUyWcW_QAzUnMPLV9cxy6czPjtN21uddn9IG4", "AWWh5qDSn8fdahjjO4AJ_GmbyXjb_Qwrmk_Vtr-d6TCb6IAyPUItp6L7iyZ_KgIBxBhLLHpJF13xMhXl", "AaJ6YsPUaMOVjHH67sM0pWiAxlGU5dMNmBHMDu6IxpxX4RMxTNwHShxDabIIIoG_hezmQ_bLwBl62Zz-", "AavIU-CI9kUiQ7e76nQrNWl08jQdsCSOALmuWJ8cN2rpJwKNm9SLcWyJNErFLNNYvXjRRxVVnJW-4iRw", "ARwAdSLROuMQJ-91zD4w_-_Pe1FkBJEgTpKNw8LZKCtoRxsq5cQaQDcOW3V8QAziiIlp_xAr0iMhL5Y6", "AWpmV2CUaza_wgqCWG5df8LRAgmWyD__zhsJJHU9TOdqgZs95mvuvMRmaLPlYrRJMaVVy8Dz-Wqkmute", "AaCbDDpHWz5anhIQ_Ge_RmUqTLguwXwCrn5U50KZt7xU7tU3tH411rCyBuNYCaIV_nvgOvUNmI8YU_Df", "AfUEYT7nO4BwZQERn9Vym5TbHAG08ptiKa9gm8OARBYgoqiAJIjllRjeIMI4g294KAH1JdTnkzubt1fr", "Abu0Rwqhorsjm3yK3OVe-Cy15saxELijgiA8yWdGveJvDgevs7Nc_P-zsHg5tCJoac4mcjTVjGuJLBzA", "Ad-_JWvlIx4ED8vWip75RskfgcM1JLY3NnAKDoqDSBr9gxXVR1L5kVFZGqKHR_lIQO4gY7EFrQz7O0pj", "AZh-q5bJ1_kWDREHUN390ffVG-ubxGxHB08kvHlWETqkleYtWWhGge8z5nKzfZW7aM-U3R0YJTmbfafh", "AZymbWti-n22driaG2L7G7NOyQMZgKumqw05JTSIT8_MWMGMqsWdWR4TBo_e75oVkMViBe4zjO_DDmjI", "AdRRy5qiC2TsP3OtbkgwRzLpU8WqdAjVf18Me1BO7yRMBHK1JVHXqlr8XIIj9qagyePiG4_Z8iZIgOmm", "AXjYFXWyb4xJCErTUDiFkzL0Ulnn-bMm4fal4G-1nQXQ1ZQxp06fOuE7naKUXGkq2TZpYSiI9xXbs4eo", "AcSMCRA5xVRrJ7HOPe7HFj1GicmGAUIKujZVOYnDD9_Qiz_HYSrx3RlAtVwf", "AdZYKRBNf1xFvz6fcYRoTXlmoBg-acv-dakLzJTtaBn0cqNf5M8Z4OCHUBMv", "AU-ACu0mLYYRgiceSGEbzYcX9yA5bhil5ICbW02h2M7cbdEwiAE6akFH8NgRuCsT6dI33gzZX9zmKr3M", "Ab6M4m9Nok1o_LOQq0l1Sc1fX8aWo_Ce0Mrjm15FyXguNnWzgHOJOdWKbz384w-Ja5FsJ4IXHScGwo1E", "AaGocs2Ps2V3yhN7A_lS5SdS1mF2hxmUZ8SNBCzFHf0TUpGdkmwEomPxENzxR8_tqYKcwgB_TErnHCX6", "AWmkdE5Z_AhcR3GGOophAu_qDRHpOh22NJBB-0QjLFpWFo0aY_wx1UBwqmiG4OY-BFkS7L0gXY6gSmu8", "AVt2-Fr2w7QVb7qxDp0gHohDqZFQKYB4MgUs4KULrN4zayXnwycugMykkE1zUjYJBsglaAWFGs_U8UEt", "Ab-nG3JqVgV470TB3zmlXXMt9vZvUlOqNGVMkyu51ymtw8MESNvwkyFUbERwEU1obtLJp3g1V30v3lLQ", "AdTMvLUejL5-E65uSwBZnRjNV5JlTrGMvEQEwhMLU4dhm6cJTfgzHuYhKt5r9vfKlwNyeieq8-ZqdFGW", "AQX-OJLJe2aT67e4nouWcPdrl4Q4uqOMoC5jS0otp-vX7ZcYM_uQQQuFST6l7QKtC3Fg378Bh1c6qtXr", "ATDAHEYwG8nsvQgqf9yTWUbQ2iBfounObrJWfoeoEWoErLoaUW_rMh0i3o6uAN6XfRvU6GUnF1gRHL-P", "AURDh-fRhpncZm8Y2qxh_fj9VaUH2fTeEGvA9L3jkak1vfhISEDoWTsmYVfj2Az_4nPWaZlPwi_obgTA", "AUPF8VFKX8BsjR3ON0IDB71s2tcW_RF-q-ppFwFU81LfDUCyhPChAeATXYPeGsgLIlB9TEN_bkh-_ASb", "ATr5EshElZhaC4c0e2_ZwaSwKb0S4RKy39g-4al7OUYUezgOuKV-IQdyLesPj4axzgSldEzLbWAeVYc8", "AfPnJMClV1R-CNXdpctubgLazXxJ5cUDPeImRKZRLGqWep1N4q22hEDtfXC3R7daG0JdtOO4vNqgKs5L", "AYphQKIxbbbdGutmpobhIbo0jkFSigSIMCE-L79h71YBjzsBjP18q9RK9rgeeZ6APprQ9tWAFf2FNGRL", "AZQPVKeH0usLoAuZVvn8_jOGHCT6nP7pySllud9Dh-sbIqi7kBgDt9Xs6bCxEhCpF24x1JieEDdgn29S", "AUcaacy0l8SHnxKXCdYaZLHcrRPoj6KDxw78tHlZ6zaJ7ALqeIx_rXfkXZ8EDH1DgSfZIAw1r92NzFTu", "AXz-FTdsaLKAup3SCFE_BBHjr4vtV26NLHt-oSvcxhqjBUjMKiNM4xH4zALKTyiu9_E3laCtgbn3_Zxl", "AeDCkxuOsfL2RdE9qGK7pqNOMvjknv02TZnIBqj48N7jr9EsNuHKfvO-2Ndq62It-TtifNWdALIaly5B", "AZB6Fi32uCC1QRTPi98AR-yBdDyiYBlW2iybmv3oPv2ka8OVM41OGW3N8DICRfZg5kvyjpdgizGxNpO8", "AUdiNR8sRJIYiwA02_4UuSjRRUvGUFqaS9a-xJQPRBeJnbZKY4DRBPzc_MHkoHN3parC7iaUcSZoUNHs", "AX9Y1FE6CmttN_PzOo1rDjjnmQrgU5gTbIy29G56vnM4imILXMW_9Q-WbFw6Lqv89Au1bTETv17YZCCm", "AXw0UXVUt0zPbf8zAeuYUPH5Mk6yWbGk1GFXYrKAEveUJiC7UCmAWPacs1-ri1Q2ACUNt0fVDcxY_phQ", "AUTeu3BWbHn4Z4sH_fAF89K_WdAtUIe_EnhpGlXrEEbj4MpBwbs8VCbwCGmiOzSRqt5zu37OihWxRC6I", "AV4Y0B7PSyc6DW63gsLtgk12P02kXFcdMJSt8LiyUuiAFS60z22ZlbYNLOBaaegHENNTEFsWX7n6bPP8", "AVEjCpwSc-e9jOY8dHKoTUckaKtPo0shiwe_T2rKtxp30K4TYGRopYjsUS6Qmkj6bILd7Nt72pbMWCXe", "ATLQ9jIClPt9QFPCVGFNaODFlZWIkqGv8os6ntTK-QR1iTRbMntGtvuJNR-z06QIrsPpe5ujJrfJnw80", "ATWCV-slH_K6L9tzvdm-comm1gpQqHxji7spHcfGAARQ_NuMRRYAHR2gJ36A3okABucUuImSl1YSqnv4", "ATDgSNqwYRLEEOrMHB-5Tx-5GxRZB5WSbi68NtIvvGovxOAfSxNhv-gFulnJX9AvMrHDacpPNvnpUOrY", "AVyrz3xlA7YsPL9yRG6WTJTJ9JA36ulnYq0A-W2a7-FQHagTd-h2XEnslSKWN9GQH__VVTjcGZWlltGq", "AYrt1t_Rn_Ce-988DREp5bsPwGCoCdILPsOEb0Jap_LBWdc-E6j0AJ4jR26o-Bhu6HB9rhw_XdO4S_Kc", "Abp1F3rN8bSojLO9dhYwEaPStHml-OckvsXx7D_B_gqkbCTGhKoI6UCzN5oVTAwMb8KO1KwWg5GLz4AC", "AXY3oISYFxU1MqS5vG1QvFkMMwym6A-EDTT8DFJIq5ZWlq3OIoP5yX4wNKKmKKZ4yxTHCocYWoPAGNQX", "ARcf0pSIWH4zw6SnO-MYJCEyU9HexIQ9sYrzUE6bRsQJrP-95zmlGyhWjp2s0ZHLoG4nF2uyQPzvVcfD", "AYiXLQVgLszolhHbiYAm2HZERgDF5BOPXG7i4m9BNsTTSdmWhVu2Np4_GqDJLrl5VA50VDAlMMpCMArb", "Ac8X-wQoJRqcR7hjhnPl_0EAoxHuj7pWE8PFtBU2xsvcL94bxepJUNj0awMrs-o0uMeH1pqxZvhOwr7Z", "AQemBOgcqnwET6EUgdQZHNXRgNZ9pPFJalKsEKDL_YlfpGEUyhLBj7BRw7xWSB3iq8Q6gIxo74OSx32k", "AerUB-6mTARcvaeXjg0i99oWQxLi7WrHzFo6vAGYwEahSQ3cOOxA6iXfvxfBsEOmsfo1tfaK6pKnl4Kw", "AUiUO36J52hSCkhaMPLWedP4yIc8AzYxQf9IWwI2zxv_mEFOr4S6v8JwAmKTPztnRqzLneQ5g6D3OZDf", "AZqMhoiURMT7qtC-gKxZorl3AjLOxAqz04Y03kRFzSBnrWL5W5FEucdVk0EHc6XSZ1DD3lV1O6Ei4T7Q", "AYA1kbHZEGfgO0GQZ2AmRZc4Pt0xA_bjH_04oqwnN_eHjiaoLSR1SQ9agvNDB8og4LZEHHVK6m-r3XxT", "Adm59IrYvPigXwV8lVehwwoToY62oxUEWZue81iqw7fx2ogOvrqbCv2yKAVQaMgt-YQjfpM5mavPDWRl", "ASHRFCrZatJJD779KhJh4vReZxHyjkEjJqOcH51HiBdN0VCGPzGsY5qcsyKOanBuLdRcq6DGIxMkIzdE", "AUC9st_MCkpnFj5grSnlCNOh1ujx2NsAjMyctoMVNZy7P5p4X2suh-XKAdfP_G8G_ttwARjVP2qVh5_U", "AWD-BLYAm7ZItS5rqG2NwudODLJwEjzGPZ7mmeJMnOxYdXVrZj_JhUpgrnPoGPS5DdDS4Wc1-KjIEnkC", "AZ81OGWmwmMz4z1H8LJlowtkiZMpLGDSe5L8Mkg4vjlOX8QwhzMB_H83KpHNPOLSvCJ4W_zlhDQ8JXWX", "AbTZGAAj-YmmToFZbGY6oerdrhM2VHZAHhSj9ou2WRxX6deDa-kksuEJorQWte6VMT41vx-cORSYZLpU", "Ad4njTiG2f0fgrygZXIGwnCB3p6BflSSVDQROEQgofSJZvAgrYFQtXejNTiRYan1AWwRH1fQF9U1WcLV", "AUFWrErwbbFvjbcxeYzqEWMI5G0w_LP0B-2wm6VlyxNhcHyIdlDBMQmKI298W-EIE9Z5dNdP29EzHSY7", "AYMn26-nPadhPzVAH_RPfIXaYMOGtZgPnsSs6p_ieUsM56FipfvZn6f-h-tqe1ZsIejirYnooAYnPrpz", "Aa3vEKJmA0ZOgxcPLPvVLrdcIjNqOUXyvcJxJdE_UvJB22YJepjDX-uJmaP3i7jLiePb08pTMuSFU5by", "AezgqjuewrZjjN-whkJhUTFLg_wP-hPWJdwa0yPh_rnsJtcAwltilMGjQEJAa5lGmFKwgMEqzHmU-i0e", "AUPjnwsAZyNIPBNY1lRy_zDafMe14VrpcfeIp7zznNmd9zBPurPIP32TKV-dL1xg-dy42eZJdlk_0gDJ", "AYmOiHBgeNwOszgNnOKM1p08gdtx3K7Rkq0Iyf3oqz7inUaZZJYsXzueM_ET09hdjvkfChbbMwT9n4Z8", "AV16buDgQ4t1rLTlRLALiK4l2V-bBXbuexvxGnk3t_Tu2GUYG7tCB-tTPG5eD9Lz2juWTwUT_i7Cf4jz", "AXRILPvYUu4SLa6wG1z4n_1DsC3_sA7_asy0HYm1rCXXnRw1v9Sbe9NsGDLNjrE_8GL-eVw_YDjlTCrA", "AfKrgEQQWsMUR9wtvQmB31X0T37HEZ3g-uQmdMPt2B_cphEkyID4sYZnDGLrFe8cP6Yx-WSTqnDZ5Wgw", "ATJBc7APFn7FuVkOvl2xI4b8NfggI6Us5KrHlc7It3e6AOUSqGalL1R8LNQBoxtFzppb10lPKwAbuBUd", "AUUoVCSxi2WznYhlTPy6x7oxCOeuDZBFy0iCSrgHg8mj1JBDY3_dTkS7rhFQnaPRh7EG929pfUS7hjmD", "AXircH2zJ2lUmvEMsZw5HWbxPEYF37ZcRAgOfkjf_wVXPJCVecRES3_gEEi8uJMnw4E53Ho2gVTb41LZ", "AbOUyivVwdLJoOfhVYz9Qw0YL-rz89edlPM3S_vK041Rnz2t8hxtvmFnhIwv7CGa-mHoIl2354UvFH7g", "AcsCdakTXBXS_Y6WfsGrjw4kBjzcKsyNBdA26LiwCCo-23guumU93tkTCxg9Q6XadSuCkfbn3LURD9hf", "ARyG-7O26qHxhBX6Gv2-HzXu-F27Tu9KQAP8jJicb7Gpik5x-I4CmU486piV3iQ5Gu4qkYOWUbvBaUF7", "AbFEddN5fdmNJA2-pqMsI_ITOs_Pcl43tzzjsru0ENbtmlW1C2bLpk0oThT1qNL8tgmPHvc4es6j_B9B", "AcACdB2RGxb-23peUt2ovwfDUXBYSGbBlv2iEsMOV94YHcKqj4ATAGnWYsbddFAGWR1HtkbGo5ASw5ao", "AR_TEvkkg8-EPqsZr1iMYADrr35BE-JDN5Puwugm3NF98k8tZRQW_UiFa4u7HolQHThYxd1n05Wtxs9D", "ATvwK90V7SFihAVdjTQlIGsil9oQ1uSHT8h7GRM-ZOowkAQi9DCg6JAwFBpt6azdFFiriWT42jcvIjVe", "ASFwlXgoOm_Rpsu5f3Nj74nTgbIT_eD27oY7vLsEZ2ICOUOtBvPBYHMZnxhEKRNKmM0tCqf0-AxWUVH3", "Acn-VnbkQeJlIfc-pBgbQmyginPTAILbLKiMFrOH-LBEa62Yyc_LdEtpkd3iKtJVgtkJL59MERCBSHas", "AfySg1lo0aeg43kcf25LLQhxEbSJGU3fmgldk8sVu14EERcjca4dpHy0c9PwTo-oI-y0gUK__E20ustG", "ARp4zaq3RYAZaNLBnOE3xfpZWzDAO_oWczsJ7xcpxohLyAYz02hndRARptVRJIUc_lp7TwHvrl92U87J", "AVZDQ7ynJEI9MCy7bZeDPGMSC6xCYUBNU4QGi2lWcH01RqoIqJIL1wE8IdKRBaMC7G3aAJXDbSKuM_PT", "AWhQQuykpN_nyVKTgHZeviUEtQ6f1O9zu1Ygf_OSsyJzr1vmNxU1ouYkgMxlRHEUQKEnGJ-p6EyabmQD", "AX7oINKfpN4DK0n54Qa7cg1ba3mRas8C1e49Gq6Q1WXdenjGlJ4ym1cswCLbRFz84c8ORgxFfMBeXSPB", "AYrM6JV9iA-xCCU1xCMvA1DePbwK1L0Z35aaOK-li0DpX-5qhZmO-0cHx1UdrDYTThGsUZ6858QodAfD", "AdybeG3hNG3xDrQ0QNDw9Rbjf2KMxqoNn5vbNYhgQowqMIlsvvz1X3jOsaTWu-1TM0NnvcSsLm1bkNXA", "AWJoAvDUxeoxjN47oBS1KQCHP_lGDA2pqLXBahns6PMmMDBgHYoYmF5zZoMiOX0m_60MAux6DuqhbuhI", "AR3dGJe8zToNs2fp2XT2NTQ9NVGuGeNzzMO8Z-uuncYM-wHJ0QTclojSh_dwl42G_hRm0_S3zKMgqC9E", "AVJPoSO7nQcOwfC8mjDFlYZd0hB6uRPXn9bMaXC81YYV-g-MXziOdXFmk_nnfSrOGcqxh9mN75bVV2Ak", "AZdKwrTwEzQ8XxeoW3-dVZwvoXEb8LJVqCoM-9fjEKMa7rO93dREWhDHFx6xWu59fsDpxXidHxFpv2s6", "AfUHjf07HcSdnyIVrjKMGKrtwNcNTDi-3QEAJtkJFi-l8vWi9XbjrUbM6Hr4PbOo5leBKl2bL53dHLZi", "ARPe6sWG22KZp0YKSbebgdaDblz7a7wyex_OV7_4zSY5eOdLAtz0okSKznOwkoX0mvA6W-zPPJppY96_", "AXwCJppbQ9ykBy4P4NWNN22x8KsyKlfHdtMJCLeN0_IxS3YJGzMCTOjfmTimrQJ-i1bqkFUJcTP1eww7", "AQL96QrjY7kmWnxRgYQtKgpnyBbd5MGyF2XinDu2vhDT4sYS4nnCE5bcoogXK15Q78zHiK7lSK9i8cLY", "AYraDnKk5Rqdlm0ZPF_aYLDWlCAoBBbpROZ7hlwbassgAw3-SXHJObcFTm9Im7GfyT_YI0hgAxkZrCe-", "AcG3yUDIcfKxr_uumVTtvj5bpENO8IT6eI6oKSlgVDkrf9ZshIAh1m9TObJqdOUZz3D1Qi67-dyRWY36", "AQSgGxsMmajM4NvcuZUZ0fUzSHuuv7VPcUhUoDuN1lwT4VEgq89WO01CKxqK3vVjt7_c4h0VLPchKfsw", "AcY3PqxKJN5tvdtds5nGpzLiatwiJznJYJoWpG4scbLnfPyG6eHeDPQ65AmoEbg7ic7JPahPBZRkjSUC", "Ac6ke_AYE0zbyhhPZYMA3oaIDU0RRU4xSySelFvMVoe7aZyUk9KqC51XnTf-gkvXQ1nDBEh9zQQMFzlA", "Aea-KrjL-ubqOR6RcqaHPTFWJ4QcGfsx1t-k3hDL52ZA1GIp0YoSvW_ykkRHMiEaztr2aupN0ev26eyD", "ASZKgb3hE-0wkV9NCG6Z_KL7lTaoA896U21tg_zeVDcJqatd5uXKlzBTQV4t60TYdcObCvoaniK9C-pc", "AcbDULRdfjY7w-DS60g0-mCXwOJQNWotOZes7mlwT2VCsXyAwdvgPnAnphtPwe8kRiol5CkNnrV7ty4h", "AdKY0ce1_Cac5x9xIYMeLRXWQb08bCvEFvaOgd6FKT0EpZwxi4a0QQ9DYB8RcSda_x9hGZNNLxX5ox52", "AdtmjnhumIVf512r9eVKWUSd-FB1m50_qDGaMddykHwE_fCzuDkKl7lsWk7VmDVQT348tjSvK0xWWqxW", "Af4Q8vg0vQGDOS4CZCo3lRGuxa-0uCea8ThUMVbj_AG_va0-pwbERM6DwznoR66uASQJdR1iCqiAOlY-", "AQ30yLnZhcxW1OaYle1tKeiYOBbwusFVu9tKAQo2B2gTZoyM6qIWP1cA9aBOwUv5v7x-Zymm3ScDc62i", "AWFgO9_WbDSGn-3EoliV4Xe5tUOVjlvTxzRD--a6rnDEKWsr1DzaR01XK8DhXCu7BulgWxY-3T46GddB", "AZoLIJ_07qZVfTVNFg6zrb6X1tOgOwz49qXKAdssCOowJ4o3QFwUSOAVZY7WA9t2JO462nSvIxmg8r4c", "AaqFBIll_36pnXqDpUctsxLhL5mGC8J2odsn0pDQIBkidfb4St3J44ENAujonkUJWt8lePJ-7mSBb2gY", "AeTaeY1w5wt3je9FFRRE1t313-vcXeS5hNnoF-uYB6FVD-ChMmhhy3EvCnozTH2TnLXNldFwz16d1b44", "AT3e9Naa87eXT8mQ7OakeQCsih35N8VjJ6sLA0hP9zDcoK3fcqF0HpHa7mbfPEj2zqqJtyd8dRECKXKn", "AT9JbsWaW_r6I-pzOuZ0zs3VD2CG1AyOgDUOBnMXAno9TjPZYOiegXhjMbqUmAef5783n6yRz7nMm8mr", "AU1f7xobnegPXLuqQq2o-_nS331U2pUmWxUuFNlUd5QYLwUuItn9mok1Zh0T57FY9nE8YI47GR9vsZDS", "ASDT55P6Jdw0oYgpftSjw12L2wcl3LKRqiO8hCnx7NLqc0SfWstmVmcoLa22R-1LVKtAcexEBP60HpMd", "AVMDh4hHgdV9v5DSD2GfBRw2LCz3jF8UBDr8qG0z3pGFjWNrBh8RqH1hrzXqQZ3TdyqsPjuGAH2GvzoP", "AaghtEu2Cr3W24akci5JY2StSLCb4IhD5BrCx9K2z242JwKzxnDrsZx-va1mTUu_FIxBTFEmHDZP9MgC", "AaWFb3GC2C5C4Wmky3pQ1LNH_nmE3Vwkj-LpgDFPT-vWBNgg09MOLtWbNN4wu6fjASkk4DGpkcK1bbyG", "Abpk6sczIxGd4uShN1NF18-Uu45acQiqIHtEhblwB7fegLhVlzI5j9qmAl6kxM_vMaIAEfFFON9Go-yJ", "Ac4ulvdzyWGE2CFo5xV3nYhwkd0CrALQleV0oImj91NfzxpRc94iyPHoQzrTUTJ7WcrgSrxjc-MxbAEY", "Advgqk6L03sFnkLl6UXmlkAwozU8X4RmqlisNUrsk0RFqoldvD6W-ZXVdghbzPguZXl0ocnSLn_OwK42", "AfR9rDd35YCFWhtTa0VaTRhzYWN1d6bNd_4EkOFFEHRLDsyzKYFyzCuwX20MgTYejsUje3274eTVRQr8", "AQh2k_kNuGS1cfbJ_PlYg28uPkvk9QHGfX4Pft7xY0c15CRBUYwiir01am3hIXcHLWqG_oS3UYan9Gfh", "AXsdF0L_Fmdcza2k68VrKLskKuocgMSZkfrMwrgSuHvLeUNCPJGnIHEG4hmxbDthJ5SPvaorE2qFe7dQ", "AexgYDRBEwcfrhm1u7-LmGDxEtDZtBKQb_PITb2C6_ZolyS5BaIZgfLHeBiHc_G_vElZUqc3qz3lEsPB", "ARePeTtGtCKd_jt4pH_nQrjW56VjnNhfgJEYosgwtxafxaEJUjabpnd-Xxls40tcMp88eq31KBz5DWrA", "AUaH1R1TbCLQM8Qi1V6pCIpkQxyFHKQMoNAE_-Blr1Vhlssr-But0VSrlwk_1d5E174GmBjB0-Ulqylj", "AX_wkrO1bztO3Zk5o7xpTxd2VaQLZfCOllBu5dnWLI8IJsib7LcVV0dK9nf6byYsY5PrYlSCupx6d0uW", "AYNuKyjrY4_ptFwMXpQhowCR9V6ns35FC0cElYYZwjshMkQ3wc0iQJQciXkr2KsBJiOi3SO1nBHHu8Xa", "AaaXw7i_cFPcN1LHYIPDFjsn4qN2--nQgL413zW5s--ZMK5zXvtlGIvscQjT24axqeTasFjB7qXXcBI5", "AaErQSStIgrMS1Wt6vyVh1dI9S38ueIYroiEEfQIG6bAaLn1YSKytF7Th4utpxo9tipKSStXUlobuB5N", "AbPSFDwkxJ_Pxau-Ek8nKIMWIanP8jhAdSXX5MbFoCq_VkpAHX7DZEbfTARicVRWOVUgeUt44lu7oHF-", "AbXt5XyCzxxMhuZvBVENK_djVGwGcWsDPZHOpem3s8YFDN80wCl-6kq-vf-bt9-k0FLiJIOksYceQpFZ", "AcIpUPU8c1i0sDZ-FMYIsJuOEpeP2BTL-hmwcbcYijfZW9_esiJoBGeX0lGE8U-A5YbXCpOWuPMkQCDQ", "AeXffmIejvxgasb8c_1t1pxfj8hzaywUILZzr-TPII6nk3KrLkdnqfiQlcNjghmpaHwtBjdRAjcJkGwX", "AUXZ4u8N3OPaxj_b-RwgBRr3Efs5mqeRT1qZXWwCeXjQaQpW9GeJnfPZy6ZfUDZh0u_szXrNDjzSM5-Q", "Abd-37lTccSNiHam_-H_NZtQa0tmsjxztAbnmvy_7R8kjvuVz8QvETPLfYW5Zf0dfvWHIfmaHIALs6Qf", "AfIGckSuPS8-PLFn7rcis59G2tQOaKlqgRuUHPW3_ed_Y6JZdohTjjTpUVfvAxnKC0-zWuOLBWrpMCo2", "ARbpxmp0udlm2zBPu6bqW6PAMV-UfCTktgWFtJ0cy1rKQUUtIRffwg1A-i0wRyFg9BhbfZM3M6ci6czP", "ARGQ1kBYHQGaz6Y9_0twfc0Ityx3TUCMTucXOni6OmABeu8s9yxaCXOJRibWvKRELFp1KyYRpMJRYxzs", "ATHcOc29WISmwi5VvnVKP8LN3LFVaeWIUiX0FfsNgm1u7CIFAxB7FEZv1vJPOBu3UTbvisBO3wWECYAp", "AX5cTDOjB4CuFZeR7gWVEzVeI3cM6_j_5BZ99ZjKOtyH2hQl4Ptkun5gdXa27n5p8E_MSc5VTNcicOY8", "ARbo7WUH4Uas8uz-UpsOpRos4hAt8h-PQXVI9c9MajzrKTyB3sGwY6L8LcRpuEDq9VGAQGRgbbEU9ReS", "AWKM7WCLJ9CfunAKHctvRPmYdhwC9dGyY6EAtkSUGHVV58kxRc9clx3hPf9U0nNkWsFFzRu-Ila5Fr8A", "AX5TZNFfJqB2PmFoEKCYtd6vpDzEkanw-TIh70ZZ-h3bFsyvcjlz3BUafZDA8JsYjidNw_TmlGDMwgL-", "AQWgSfn9emdJnPEBBwwvB6N4F2AoXbDHKq3rwW4-ieEP3TRlWiApzCWpGdyNjymcxlXIAxuf8sScQWMv", "ATrCdcXIyAX6fPCjCD6UBgIJ4sNNm3SNQzJ54cO_X8f-SI9kSAhV_Z999bFb225scgZdB0lmk78-jcwb", "Aa_DG3hUsFI6iMf87VUOyRCWH28pC5ijDrFPYnG_fXUT9NccX5D5qm218rUWcXyTj65vu2FBmYxP3Zam", "Aderc8flr4FvE21kxRJaxvFyURKeUi4znzTj71EbyHNiFDm7uhagNFq3ctfig5ZAcj6vobt7C4y060d7", "AdtXhR3loNJ7B0hpup-jhP5Tt23VwLdtfHDbqW2vcJ6bIwrsvKajuMvTP7a48PFRzNsWJgqL4Ai14vNb", "AeueZ5XoPc4cPG9v2kwlk4dIeK67CE0RyIwTzKSZlYlClcxH9P1xAtpfCpE4UQuVCXxo466IUj8ALNa2", "Afc6ldERu0z1EWXp8MYi4QzHudDEAfMjL9UwCW-DYH1RTA0qSkRJWoMsu3kUp1dR4zeRAVNovSU5Gh8n", "ARjjpGuuTRVYUQ3h73A2Zl6zOglzYtuWCnPC8yZTp51sA1XlKpuj5pOmQeoYkDrPIAQTQTwteJhAaqd9", "ARTz2u_4Z9ZHcbwont1r7U7Y9cXBHMbkhTfOx67ONIMkwqDYr08vv4SIrYP7_wabZuYobR9A1AtS-C0e", "AVhCvBBwz7WcCJNWt4ShmzeXcTs-B-ydD1hdqsV1bbT6P4TvhsFxIHKAE-GO", "AVX7d1JfuB4fLeUhpG6O5JA6i6iB0sQr9IG-SAyvEN5TIo6N9otHSB4X8aaMcLOQL0R7J4XEJBQzQPIj", "AWS6hhBD7yuASYqmEX180QF5ELJGDf9vW4pOwwVg3PxA16entKKfNOxhkMoE", "AZKHl5I5X2-oWg30KETaXhj_5-CtJ2NftUT70No3-FD2MDm76KhanS_XM8OrPEA1JYc2RrhNrDYL5rbL", "AZsPWotgvxGKy-sWOcTE2xtZbHqJ15jyXWHJDVrODGF0j5ufpB-89ILdNDq8cOFA8o3YnFvC_rlUDKOq", "Adk1XwEPQMKOn-b9a0lMZ87uctEXKc7K9ZPHIfm4z8Yr3ZlWYDlAznceFFyzS0RbXfQqONuyFvZa4rto", "Af96d--L5ACQRgWAJ21VbDgbLMEW0m7SnlwtzVziKtwhkeaUVSSex-ivaMqCe5yO5ACRBzOTa57RNFfO", "ARBQw6GmaZaOMNkUUz78FN0hrNHflsmVAbXsSgQoHlOnXEzBjzqMpp4V9HH2LxVXK0t1cUCQtfijdHQ8", "ASdxwSqu8dAfiPTYWGxXF_oB1m2f5-kiEShqzrLSrq1UzI7m718X1Bh7oA6oRRaUgiCIyW8Dcfbxyj-J", "ASuksXjiG9-kzC6UT1_WQFSdcokQjFFivpw7MvzJzPLH_o7dxj5pnlCjs_u3Iu7x4xLgqTM5oJB28I_o", "AYArObyAM4DSnefp0u4QEGEgPOolT0sT5KVtC-kApU4UOhnotD55PPvts7tbdBNVPYHrJ1mDDzgDrfLt", "AZNBW_MBovzo-FQb3NoLC3TqhUOTZgcluCth-oYF4Ur4Hnk16bD0J7o1srJxd8RtRuDI1-Pf8mlAcAOZ", "AQtA-m8ydts6vPKeNcR2V9lbnUk1pBIjDA8F7d7pnnE22OdcoVKS6v2mpuicU9ETnPtD7KSgfClOW2ez", "ARiex1Obbt8VCzA3oiFddD6IM8GW_rSM-7bEQHYMEbm-Z8PKnZhnJiVZ8R2h6QnOOkRhO6qrPkacUB-6", "ARme3lHreiKJ3gYg6HThgcBTRwPTJ8AZEzVORV6N_b92yDHYyf1QNZ1bI7OPdF9Wxnk6iyQ84-5ZVj6b", "ASdzkkc3gZD4p6OQENcdTF4-BYbalbTCRZEuruTd1IcGuu3CjOFEAXX4KRtseAVv2_0VJhkegmfK066l", "ASgUH7GYLmT5OeoCIiZxCLdf_TkJWuN5xm6XyYm4UoKy2PJ9ph2kNS-jJRHEa11UfrsH90mrHCiFYneD", "AUstsy-MMWK_e92mOhtyXamPhDkjragWS2E-1N51CqQEPzLA-TmQW65ROOnE5horq0XmVGAHn3gwC9Px", "AUvtyfR1BKhuGWyI6oKu-KCJ_hr1wkh-BZTWIH8N6b6CqLc09mp1u43ZAB5Gv17wP2d2kecRhWdQMNJt", "AVZhYm14YbV6P_TNkde0MGGSxEtDncv7eL6xfh4NToEXB_vMMBETx6VjDX794rWvGhERKeb1xEXxD0Ze", "AfnCuLnoYiXnUIU-xTedeAUqQ_d_E17FiQVeNxXsDBrgHeUlDO9Di607PQWdRIep2-2wLMNk6w05BS4_", "AfVbaF5KGZuZzvs7b37iTEqatdhRly1S_uqGgAZ9H1rJixIm2Z1CNiMli4I-U5tDvF7wFR0ZGtC0sqJL", "ARnXPP5gAw_eGAXH1GVKM95kLABSvGRyCny-BkHW6UWSlmFnv5zkLskgEjuNwahxA1pBI2RRGCL1U2E7", "ASxq51TP92spfbizUkcxNEl7x84Ct717OJ0xgI3A2O_FeIH1F1jEdTBAKWZq5Ml2G3U0p3g57OQlZJOB", "AZf3sGCx2OIfGAMTGmcHDd0tt-VXYCducWtnkOnlOOUaA9gtWni3RbxZJ9U5LpJ-jsQ5YG3xX5nudMjG", "AddUoLv5JTnaAb5F2sxspDib4pni6Npi2ahl5NB0jXZMTqODYwujzQc4dGwywjbql5XBZN_-vFQNgN3X", "AfMTdM4POMezgiXfKDh3HCjxr5ztnb1N8AC60fHc23GdDCFq6DuIFhgwKG4W2-PsH9Lm3DqcuBGSIO52", "AT9nuYQxHQVOx-HSovm8DAAi3IWig_NlDrHibluNefWCzToCfar4G7DVp79FQLhVqqrdh9Ekk3KDcZoT", "AUzzFVKF6GZQDgNZH8JEUizm9sMhd-57lsAXyU6u4aFuTxU33OiutNq58_s1io0kd7epP5W6ASgcF-nF", "AVAqdF32y5UFhSWdjs7l67vcOuoQNk1KKXL5v49h14CZpW4QN7pJQDQyEXRbUBO4yylXXya9nu1LRn9Q", "AYOzl27R846B-NlpnYdfBveJ78MS5-CqTCS-kS4t2cTUwRUDkb4XsAyTLbwla1FWNdN7815pLLQOl5VJ", "AaLE7VZ5LC8sxudigS7Ekjfezc0MfHyzVW0n3AhZAJdfnim546ZwwY4iqK980R1ghPwh0lPoLyKddhS_", "AdtSQhJ6ffDtKJUwFl_ibaLaZliNOn-7E10cAVWC0MCEE2b9ptVe3bqj_M2hSLA6DTN5hPPqowKEGHxJ", "AQUSF3r4WLcs0AtHj1KxHdEEtJzQ3UdDmQ3MabfGLYcB4Chi8vgXJDL6dhxwQgtslpbgXX2A3RDMHV_z", "ASBI4ZfWKMssNADQJn-i3HMjph-s_sh7TlRQ8QJSz5TuoKhYGQRtsjXAN8bpantK0Eyd8SF7zniRcMPo", "ASIXJkiQIe-qp3P9iuC36a0xdjm57cP6nYnT3fgTxU8zALI2fLW9KwU6ZoP1oE9E7bzmG_dZOEZmEMja", "AVb8SEdeAJbnLi-QmoaBiapiRr7FbrGZksICDQgrDtCdQfSvXtmuFH0VqlzdS4sRj6R2qmNhrjJj7IzA", "AXvrPG7sDG6Zvt2o3ZnaXRK4m6Nie-KPDrChxf2_a30zFFs6eJwQ-BJgFrATt-IE9kvR5jjj757NgKSC", "AafaqFH6ta0PFlvqt02vd08h_gApCvhSt07by8A1rBga83TyFty8iVRVv-BiOEWO-8AtwyOQaNBiLMES", "AaqFeKtndmKfGYPQxXkV1ZErQylYG0OJ3MapCrQBfBojhG9heTdKKXXLMoMj7SW3ImZhNWVQ82zp2QCF", "AcecQRTPYDrLRKbub07lSrii9oCxy_gRf4AN3DBYP1qXkT7vNq_ljT_tw2FQDTtcIfOc85h4wKtfwOzn", "AcqlbM3LatHfLUfAqshlfyg33bmVs76nZl8cMQBbstVqyF2fDaiEz7qhcFZSMhA3pepiZpIiYXjW0d_F", "AcvRLo7nXCDN0fkkFDP0iocM2bSQ2ZALUxfUllf-fG55OeQjgOjkDnmjunrwZiiOsfzbSNlRQnqC8VK0", "Af5KN34nRKGpeuf-NXHG-VApLYlIxYO8Oaiid4CZVv6LIu7n4u-SWt04ChxQNn6jDZNH76kNRLXspEwS", "AQTB_zZaQzo1yd1NYCgFFox9wV7_V_BNfW2gDhcvRWpEMypkh5RCDU8z82wwkgni0d09XYJPIO6BM_GQ", "ARbuhqx-MQmTt3P2BBa3CEPakK2GupfPZuqAahytrA20seYZqlQ_bM4QHssuXkWkH0xCt0grj4QmJ6zC", "ATKIVzgAqAehDQPdPR1DAQsj-_PldhwMrxXCJCicmvthg2f4lm0df0nALpg4dEZT57QO21fLmfpln0Wj", "AVnVnDe3ACy2bgUFhKHBPbp_-fQwoe5qrgfcURR-UI3iOshoaGvNwUqxkx4SU6QR6eUt8fRCxR0U2ylp", "AVwOriXt7qS3KYOGRhP3JAOLbSM43pfk61ZVORvZTyhmQ-mvRW-zXWMS2AWUokQ14s1UQ29jpfiIumJU", "AX09zAGVFtWwrm5_JZUFfh_VKOcx953llczSMPGYsPFbFzk1QoCgeRHVnwXhR0AN718VDiJJnos2-dKm", "AXadcB5XetUTL34QyQlIiRK_UtDm4cn9_ShNmMw8FhBIh6rZQxtiQ9K8oqHsk9PQXkLQtaOzgkahWRi4", "AYRs82wfBGrz_kctFWYHBCnZd4Eof_ZLNzAeb-m7M0s4OHaD-go6vm7rpmH_hLOdMYc3DiJ80v5TPSgJ", "AacYo2k113JWY4e066cKchwdJLmyIcnYyowIloKB6o7DHdldIhH6N-pqDr7EMshGQyHrulbVbmAYmgJc", "AbJfQBbMXrRGZZSGyEqvHdRxtpr5bc5GHojFP2WWcObXlYU5zQunRwQUJ63PFMfXIv7stZDQFH1-yfJp", "AcCj4SalkPbqb47qQc5yJ1weNTvmbiea0lzR-3EDvXDZIyMsHcIpdB5BElpyrf_lAqDKOQSynZradhxY", "Ae6Vx3mw2UPZEf7QczT7tg0uUxLauuKtka_myxmlu6ShkZrdj4NBGHAvDYdaMYPXLnSxzfXmaeGkVN54", "AQPe41YXAOtjyC5dSdPbIt0gxNU8ptIDxJyb09A1BDIEeVovW_rZs-m2TehzWYAlnv_kmWgTn5VBslpL", "ASOCm7KsBwt5LUae_eeq6k1lv-ac0rcrSh3Gwk0dfEZ0_Sha3FdEDFXq0zAjXVLVBGUJGAS4KJIba165", "ASVO3qMzYivRm-QVp0B4jkB4DiiFp7kAG7s8FFYrp4KS3NNl1WQlezd_XsEE_4dXaftMYdF4KMdvh7WT", "ATCn6Ird1RIzRDVOLbUmGI5AUavRrK0XnnOmYhdghgFdhKMkZ6Zvr4C73_UH5xp5F1jCcBX9a4fiHbDf", "ATSJJDJxr9LpuVNkxYbXGvteFXCDD1tmPMDfKJ5sefBSIguK4c6dn4WfK6oCYnvbj1sVQNtuXVDaWDi9", "AUrnJiuXzmouRq2NZCcXZoDQYpP-gO4HwNiwgu7QCmlmWgx3bAY1qEI8ou343m943Ylbfmwn_5Ttye4D", "AUwcswMqaswx06CvK70TO4WUtE2Ar4DRXm-_WypzdIlVNUXotXB5fhQtlc-MftdF0GOwkDCbDHQsWl9D", "AXDJmCbAxM8PXTV5EFph8mlO6TzPnbcmQ5gNeWvCL6gbaX2qKKmXqfDC6EEppPSHq7wDSip6UvbT9eZA", "AXGOUolOr-cZ-NRP1lo5q9oolK2j4JBSAQeqYCvnuRPN-LKHIUemaEGtyXWbrMsSt6Ur-ixbO6oRZN3C", "AYD7u5dAmXH8EcBmhuWEs15anelQVxDZNhjYT2WnaZWksgB8vsnbCSmMVnyYo06IUUD9xF6LKJriPew7", "Aa5GsKmJC0UkW4un8T_6lvdXsb1fUgkfVi84AesLRWAmO_3MA7503teyZ_Uzf6xUixuyUuTkpfS5LftD", "AciW0Q7w0Ok2Ri_dvGTwJKsRcb5dAOHFJZfHf_kMC_PnP_7KnLj-OdwRPLxD7M25CRvXgp5nNJA3C2jH", "AcjM7hAZjUAqIgU0Lvzneb9-_rWs7qAEl6PoPVHtQV5PNmWBihQWsu_SglKO", "ART7rYn1IyUVDyGzxwiQSruiFD5OvkD6lkfpv3aX8UdMdmtVQWIUfkiAe_wwRepxtpJzWebA1dQYQpxE", "AS-9YzIwIgM7pFVJwG83_0cmtz-p6ErqV0diV8BDctjfX4mj-UUVi8hRwfb5pTuRi7GobwyUExMP5IYt", "AS3XJS9qJqzSoJ80MhsYv0FYMI-Tt2HtAJawgorL9yKBpjeRMaao5YtctUMlTH2i9pZ3x0gJbP9ybBEy", "ASG2hdCw4rCGvBmIjUIrZpBkDuBnuiaEryLrd8KBROyg-7FGdgcFeQ4eOVRxwIJCDZT-h2v8oqAeStxV", "AU8l__XI_fM9mqndO3EV43pfH2NvPawYNdotjsAqksFa2EnXfn3Q3ngwAIi5-Dx03TKAyliifkTfKYTU", "AUe6fpHCdjTKK_sxP7apE-6Qot1BV6xnDGg2iPQXJzMpbrQzbWebryYPkF5eBRxUYWRGwaEc3q3GpLbS", "AWCNxJ1zPs-NqO0AS6tBiGbIbHfy12-uVfhmtibM51Jv2qXJx08RqfBfWQ9oJkUaXON16zXFUfpXEgFz", "AWTCyz8bsjCppOZ4znVuzCXiq0pvGZeNWhlL-izK02ArHOlBoLVq97AtNDLhA3jQWcpuNRcab7dEB7lo", "AXZQrZVm8c3MGvovD4cNKiwBjIMMKAlhbP-wWcj67N39xDe-2ZdEdAPO7nV1bAcLM4v8iNUp0N_Mcphk", "AYmAf1wW0BWJMwUM_3lygY2_9wJeNok7DcguZ5VQZSWrk2DdnyMqBKKH_sh8T_DYJ10Jv1FTIzcBoRmV", "AZ10uBSCpZr5Stazc2Qp4kamQ7e5j1uvYugUfyqjn3_E0mPiQn7IZbfJ_5PHVQoNRwokZMCSSxEVk5gv", "AZbL__Y_-mRd5WEZYRHkxpw4PDaVGapobKAwboA1syWwSr9VdPTHos6FEWaGJvajHiJG72ZyVzNeslIO", "Aajr1vTTrL58YvDThPIsdrNP4jl_d2KahfheyZFUb6bs8Kbx3WoZCn0b5u_TnLHcOiymePb7OcYbIRvn", "Ab3Kury5vH4Nd2yDJ44vRvmuJhrCSj00bXcZ1L2MVrJ1XMjhQFDIgSFADUdytto901kBDIB_q-9kICcA", "AbB_czT7AhCglLGQDWtB6BNcW2IIhmhHaHGH89qJWNNjJHzYxIk6z5cQN3Os8nknVBXw2bdNB_m6wSxs", "AeJImnS4UyTQcDktg0Nr5RDUHEj5paDkjR35_FpWY2BANcQWwcUDTMTdcHz_6MCETc5EqLHSglfTrXha", "Af-FvbZhoCMcq70C9YwduBsM2FkmNlLnwIz4O9o_4NhQdxYwlKiRa4kUgXBJafXUdfija4n-wmmISFkW", "AfMBvZqDv9OoaMe8pn35-xOwufIhaHRkr-FgC64gh_ZanWKd3z3t__siBDz94SYWVAXfh1x5Nv03AfzZ", "AQXnKIXPG9SXvMmfD9G7yFtN3dCJjSKE8BfKaafZlzgPxGYkpb0yZhxvUbh5EYk86C7KXxPURskN12OL", "ARMyhNwHKlGvZneOKlDPtzTtMKg785buN1F8ABciuHl7HfSFYxz75e4bHhjQBzZgG7_5vjzNEGl6zMG5", "ASZNICUjJUEjOf5gXhSp9d99nd8OWF1qabSswy0xD9vOTUxeqtfdlDK102NWoG3OfgZE7DAQt97q2OKN", "AT-6KyRrMjWr8Ffr8yR10WOCVVxiMpM8Z2KL2J1YGkCKHdDCFu7c7dVtsajXH_hEu1gd0Qb_am8-crjF", "ATZjgdCbWKKq4wIsbgt_KUuWcBzRNTuoTz_JVKiXFNVkxBCNC-CYqvH4aNr7D-7uubhUtqiVsA_Etz0X", "AW3Xj48NN_K6zsH8JpAnNXlora23DOI1DhWiLFTWI3tVH6BN0PZD298BW2aizd-Z3CLISV53NynfoWkJ", "AWeM9QIuoOntrqxWoZuJHErA4790NA3MpoG5MxSFvsM9U-fVys3H_KzwLnJfL7P5jkdrVThaudOylTaU", "AWVZGksyYh40TiLsK3w_ertVJEbOJOdpyfjProgzy9-lbdtXQyHCh_G8-9iKG2DfHobdEtBPZKagnISS", "AXpt3KjQyq_WAuuHhBOJNbgz1-hJ6ViIWsujd0uQ-50tYJDB2YkcCDOP8AzsdfPZOLWWBV67TR-ZD9wO", "AYFD2Z4N3HgIqrNq78qpZRqL7JLBqaxCYQYoPqEiQC74gKn8KKFnYZ9fdzwLSC7oIGoGfVa-0KGiKKpp", "AZGnlh3ha2__TizDxGMvhmxqxXAsft0QoIFjU54D_pHJyABwEF3PR69Ol2hlGQwDZZTb9TdZ33FXi9kb", "AZy8eT5YydIKi92O9Y5V0RPuNM_uBIdAq_Keg_rIO7vlsNF9twjOqv2sQVoUnpiJ6qyb10l6SSeNoL1z", "AaoAGjTmC0H9GdbzY_qY7-LHEpXMNeO4m4gaxnGBd_2MnRCmH7u9PwYNrvUc_MPkng9MnZjoeRfuGPhe", "Aat6dgzz-AhMNM-t6f9ZLMr57DgxiehUDOsBWetFn6oSESrYdd72Q2b-SKzea3x4aHwEnbB6IpNmvhXb", "Aaz-u5JdoYyYd2scU6ITuhwKJXfBDcyAS5TWhmC5Pbs0kmvef07CfLC-arEIYXLivOI2G4zexNkz2fEc", "AbIdboZdEpyrKU4XclA-dkyGt0PlgaS1-Ffvr3xXvHbYSsYL1sGtus2vv_IYEIKfB5VeFW7s5TccmCqX", "AbN-0XBdWV1G0FEnQqVyXUklEHjiMDUIYkyk6FLO6csgUjXHtP9neRBnFaPTYM19NiTkxZxzOa-lwqYS", "AciGZEIKay92OieK_taeAIxk4gmkvZYD4V-5V_inGr5N8o4nsissrMfNKp5KF3BOWDDXE6uNmlm8poNM", "AdJvUhBNhkJ6wulv88yXQrzbU4ZiMocyZbTsv-9HW0ZDNIZc9YXP-IwNvl7_", "AdSP52hoO2-Uq_mBCuOBGgzOzerKx_NBWqcay8Iye3F7DZqSo2xTMsS_hc-sBxBq9ZeZnDJqEtAqU6Mo", "AeibaoRpUM9JPbRGAuyNa04EZWfVHI-0EuLLNMJfpU4oA8GduQ8y20G_B1LEI_6IvASe3sCqJGxEY6Jd", "AekF1vsyH-KcE0Dit28DhGv6o9KYpcTpGUrC1xmHuUG7x_HimZMMTpH3Hkiam0OXMznjo28JwwBvc2bv", "AeWuuHIpOmF5j55eDYdCoW9-rOgh9qGvlcy0aQpxXq27n3a55TL0j2XnWVDCquBjr14x4Fioqp4se4Pc", "Af7UiccMdL4x5RZZ0jGTYcaUnsgJS2ghv-iUYbUlXIn0Rxi1Hom2F-Clelfj9yoGczFxUoWcjX81vZew", "AfCxhs8W3WGn7Rv0S92CVPHXi7TWSCnRZ1U__AQhOHuw52NjJYFSGTodM5JFjZnVo01eJj8WuDAmM-qC", "AQozhXI5S4IvGDPmDJrJKcZi4c8gNDw7Gtn_cdXn78ejc4luxXJ0zCwEjWbjRuY62nfKWhc87LukhvAv", "ARbZ7RQg4eBkkdQZBwVIKQxFVCuIeOrv0sRZbMKRxNZVkx_sMbklmaAAbBnwWJy9LQs5xbgh7YfAsH18", "ARq9LAELs6Rd9zwF_cp6hoBHrxMA8OsBwvBYCsdifrZq-LU9P9VwPpUby7yqZIgfsrWHoJhWIuK9IPFp", "ASqTSIOiYASN3KYHsxmk6uO4O_cmAjk-Shl-Wx1ixHAFGjrDnv6_P_eMCshr9LdwNL5g95ly1cHqVy4z", "ASwoeikdyflPIKFAC3U34ewfFVRE5-_p6qc1TTQG9g_sHNs3RP5Sq3pE_e7V2p0VTi-nJQuIA5ApP1XH", "AUA_R6qBmczCAhGF-AGP0WbqxunumqEc6FZ8eaD1fbt2jjVmZaiu2QNeKEyC6uXx_PnbXaCOGyMocjuI", "AazPaZlGBPP6zyXwC7NgdRNNrfEgD0fNxGpohhfADfPDqHxDjRuO1vwqjEE4aKJrPJ9DaKkfuCD15IWE", "AQyNR1vnQtxPvo1wU7wS9OXY7svT_5KlFcgqkBgmEjPgy3vaZBjgReQCV0RD3n4iBh613SJeUqEC37XO", "AWum_K9KRwhlt4CGpNTHt5J-jhq4gXQdJ8jAdB3DdhsCc8SlKabUbl26C4UHsg--vKrMiCOxBb4ZixuF", "AYLmn4GCg4s8ZKrrU_5fzzwz72vDDJby44c9KbE9QYx1l4zrnFTncWPDx2AGsS65Bqo29D8rCdSBNqt9", "AROO3lVGvW116zkoEZ6KRQMg7iAhZ5ZeQ0jyxIYSJHHKflx04MCOdt-wPgJqRONhfHazb3cPYv244uf8", "ASncnAA2XqvFN3lpms6oapYFg_dh2cne5MzD5VCk3R_aL9zQIGdi6Nkjzfc0CDZy8q1BeqOWBqnaNFsA", "AQedjY9kGMi1lhC2AEl8qbYn_rTY9iS1Z99ijIH-T3RIBzkHcJ1_OEwFJkRjL1j-K3Yt9ezPuEvyjIBK", "AZZBF8oL40dzcyCcLIEi50pULlY_GyAc3nr6o5Qq87ImOU1-ZC1IoYqaJeWNT-kTt99KgtZrUFK9u-Bs", "AcRXfjC-a3HDICh_w7Yo9NEbLHW-TZThdotn2ztNlPSVUwh1rF_z6NS_iUOO1Ffl1cs56Lez9iAzzLuz", "AWlXddGW6zfufuNdkdEX2evRGOPItXHhGJleiDgJh7u2PjAFu9Ykv1mzdSB1emAdcfBf2WySEgamKr5q", "AWVPY_vj2qsiDlkk8xUifR1AGWmWPa-Kff7sc4PSNeZzSfoZqeF44xX7AyqpK9MXXNhHglzwX3okwJeD", "AXYNQHZFo1_JJkOeYsh7k3ii3OcIVDyreTAuJ7ZS0-2b5p_XWqHJ4KVGygYyn1_DGDKB0TQxnisrzAWv", "AYlEZzFdz7zw245KfQKnjjoaKlIIkmdOD8Xi7PRIx-oDcK5DKrWu4ex5zhNTioYVCAwgy5E5UZ8KWRKg", "AY2y4DTvaD_eftECds3SuKHQG8CJfmmP9zl7BrblUCl7h1svpwFBASQBNNQwDb-7EYW0QT1hFZFQUBIl", "ATJHnb_Iny4VkMc5ybUoeDS7x2CIMnFQYFTtOHfslNzYtdRJCGGrZTVM-mNdG97GU78F_UmpsKzCCIgU", "AeVgr6n0UlS9_b4u45Nlkd2mpKc6VUe9wjw2oKRrsXzIXZJ4K1q1CUaXvrTgcB5j0jb-E3fEwDD6DOEd", "AaVd3541KiAbjObfq8486KohVuhP6y_ZJWc0zY1ysMoOSeIx3OF5amcgw-BvxcMD0TNyayCQ9Agri_f_", "AUB2EIv-ZUzTepk_K4_yf6EnL3b8vX1LG1a4DaSZANNFiQ8QqPUIKej8_thsKURH8G8nbwrsrJB13bgz", "AUO4pKr0n9zirKGKfTQlOgQ8EfIDOjT24AUmKK1lGwaruTPyv3F4FbIBwzt3jqm7_m19fnu6AB5d5PNz", "AcgZye2RdQr5aPKy83TuiedDJEYoUxQuEA8ot8ELuhJ9ya0U5GSXRsqw0zqrAgPbfSi3MWvaZMdm4mG2", "AU1AoXXAQ_pZhAhZPKMBgbqIalttfnvDhGieEucHsAYfFePjb_Gq-g4pOW9YtUBxJuEBkt4IlW098XCe", "AYWZhcjTcWKK63g5TQ5dGdV2VhnBSQ4a1ZctLLpHPGW8NVI6FEOGIlprUkW7RwJ3ZSft2Yfjuv0e_GG-", "Adc6rmNeqiVf9o6lwUPHLhYwUgApqWgIcQOmiSLAKXU9lRCVs-iMgs4MOdkbvn_pRaBtOqlBG_v6nu7C", "AShG7lb-2gG6EHCP3LMZxo96dGYW23_Vu1KPeK3lWG01QcjZUarqJPbM3d7LqjFJiRMcFKNXD9gubJYC", "AV32VxQG3VgFK4XBV2fszwTZ1SI1GR3056xWzvXNuNf_unHdT1lIwtXp4x-0-nKngOKLhk8K5odXZRh7", "AZ_5b9jS3YKFPSeZ6J6YSavRS_WXD6ENRDfX_JGIL4qExwKkN45xBmLLy28tNQsQ0HkNkVKbGPqh_gGI", "AR0xZKtsgHB6nA3THJuR-ONFov1r9Hpi8mUCYYHg8YoIcd5TDQfHtbKPv-7xlMVTRmvAW2R5oZ4HPzLe", "AXyN1SOeUydASWS3ad68oxw4mAozfK6cGi1X7Wp2alKKZ3ycBKxt8lndwnATvAtAN5w-_HPm4ij39G6I", "AdUZm6mA2lFH0Zeca_2JqIUk0qyAuaFr-D1n8OjN8dD9aXsEaGAF7Sw8rF--Td32LdoLXEsdvnIFbBfz", "AccIQkAq3PaYhno7Lb7EfDChSPYVwRVSLjdG5xPGa7ryKBFVpImRM8_jc9_kGdC4PkgtlHFv6l_ET4aB", "AUP00nLYtQvAPZUR69WsZ0mZCbiy9VYXY_kT_E5ntJRulDMEFvdlc4O7NQjk05iAcwrxx5rMfRhjMo8I", "AV7dY22NFKx7_DTYq9M7cxp6NTy48StOdiwdZ3zuSN-gYxx8cobEcEMeHvoM6eYcRLFQ21t5R3bYvhZj", "AUKvgsLekmtbfmbTZadqyWaGa8DWOvMsiDaURUW02BxlXzHIBTBzxiUsLqEaHCrCdNJTB0wYV1zeU_7f", "Ae78ZfS3n0VwwsRs72OKgr5ftSyDzt1nDuNZOVkH5S_5kFWX_dEos-JxEPCtksCcF7hTESFIOl2aqFcT", "AZ0VQKlQnhFkU9Jbd96BIMPmyI_cvrRaPkWOuMoRW7UPvczAsnG-9S_mlPh4DWAZz4kd8OLbVa4w96Rs", "AVuI4Yp-EWv6x9winEG-YiVcqzwbJvmArOBXXhzAQkCGP9TgMar3ubQdRmsJxREwmSFbLlzgR-Nj0CAW", "AVprADxNJhFQNlRSRMfFt2jbD3tErjYUa7oe0gHfy6hoCREK_1pYEkp0_zwNwSmFMDLKATKdCOBn_Wfv", "AasxOtHMRE4YYG9yuhj-b7AXliaTL0RX8A8Gxby5PKwqQarRhRWbh-52Me5-q02Y_i8_u5Chr2-FeLZL", "Ae5TI7LcDvUcz2kn__X38Xzsxbxhm1vZxeyDVMxxEq4g6WlAs7WojPbvEfkKA0xMn98tumiSLvVKLDBs", "AQKieExqN7l0BH2tRVHqwKqmO1OMheTGbSOFa88DntLF1X1gSBulgivXX3EtrgMta4EDSOSaefHF9XeU", "AczvgJdJSXtSxPO58fyvUXsQcLdfIGerTZJ7llbZksgOb3z160wVtPoGoJlwjGDx1x4a42JMqe0C3Mdq" ];
        var SANDBOX_ORDER_VALIDATION_WHITELIST = [ "AcFUr3vhIePYLOXXuZzdvFL5th99W0Uygya9lqfjN3XCx-W2dGlr6A9mqiIZAHAMng1g0_haL2LitLAl", "ASmWKJfGIEy4BmvwWA3PpAX-uOdz0EYCQ89Y-oLww8LgaqqHtXEcB4dfxr88kmcp3no-efNznSFDcVjg", "AY-UBQDZ53U9-lrZ-7RGWIn-CLhVJEaZI9HsWcqqApUx_CET1nlkkNow0HpLb-y0kTUuyIA3uwbME6Dd" ];
        function logger_getLogger() {
            return inlineMemoize(logger_getLogger, (function() {
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
        function util_sendBeacon(url) {
            var img = document.createElement("img");
            img.src = url;
            img.style.visibility = "hidden";
            img.style.position = "absolute";
            document.body && document.body.appendChild(img);
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
        function isIOSSafari() {
            return isIos() && function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /Safari/.test(ua) && !isChrome(ua);
            }();
        }
        function isAndroidChrome() {
            return isAndroid() && isChrome();
        }
        function getNonce() {
            var nonce = "";
            document.body && (nonce = document.body.getAttribute("data-nonce") || "");
            return nonce;
        }
        function getSDKStorage() {
            return getStorage({
                name: "paypal"
            });
        }
        function getStorageState(handler) {
            return getSDKStorage().getState(handler);
        }
        function getStorageID() {
            return getSDKStorage().getID();
        }
        function isStorageStateFresh() {
            return getSDKStorage().isStateFresh();
        }
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
                        logger_getLogger().track(((_getLogger$track = {}).transition_name = "call_rest_api", 
                        _getLogger$track.int_error_desc = "Error: " + status + " - " + body, _getLogger$track.info_msg = "URL: " + url, 
                        _getLogger$track));
                    }
                    logger_getLogger().warn("rest_api_" + eventName + "_error");
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
                    logger_getLogger().warn("smart_api_" + eventName + "_contingency_error");
                    throw err;
                }
                if (429 === status) {
                    var _getLogger$track2;
                    logger_getLogger().track(((_getLogger$track2 = {}).transition_name = "call_rest_api", 
                    _getLogger$track2.int_error_desc = "Error: " + status + " - " + body, _getLogger$track2.info_msg = "URL: " + url, 
                    _getLogger$track2));
                }
                if (status > 400) {
                    logger_getLogger().warn("smart_api_" + eventName + "_status_" + status + "_error");
                    throw new Error("Api: " + url + " returned status code: " + status + " (Corr ID: " + headers["paypal-debug-id"] + ")\n\n" + JSON.stringify(body));
                }
                if ("success" !== body.ack) {
                    logger_getLogger().warn("smart_api_" + eventName + "_ack_error");
                    throw new Error("Api: " + url + " returned ack: " + body.ack + " (Corr ID: " + headers["paypal-debug-id"] + ")\n\n" + JSON.stringify(body));
                }
                return {
                    data: body.data,
                    headers: headers
                };
            }));
        }
        function callGraphQL(_ref5) {
            var name = _ref5.name, _ref5$variables = _ref5.variables, _ref5$headers = _ref5.headers;
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
                    logger_getLogger().warn("graphql_" + name + "_error", {
                        err: message
                    });
                    throw new Error(message);
                }
                if (200 !== status) {
                    logger_getLogger().warn("graphql_" + name + "_status_" + status + "_error");
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
        function auth_createAccessToken(clientID, _temp) {
            var targetSubject = (void 0 === _temp ? {} : _temp).targetSubject;
            return inlineMemoize(auth_createAccessToken, (function() {
                logger_getLogger().info("rest_api_create_access_token");
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
                        logger_getLogger().warn("rest_api_v1_oauth2_token_create_error", {
                            err: "invalid client id"
                        });
                        throw new Error("Auth Api invalid client id: " + (clientID || "") + ":\n\n" + JSON.stringify(body, null, 4));
                    }
                    if (!body || !body.access_token) {
                        logger_getLogger().warn("rest_api_v1_oauth2_token_create_error");
                        throw new Error("Auth Api response error:\n\n" + JSON.stringify(body, null, 4));
                    }
                    return body.access_token;
                }));
            }), [ clientID, targetSubject ]);
        }
        function getFirebaseSessionToken(sessionUID) {
            return callGraphQL({
                name: "GetFireBaseSessionToken",
                query: "\n            query GetFireBaseSessionToken($sessionUID: String!) {\n                firebase {\n                    auth(sessionUID: $sessionUID) {\n                        sessionToken\n                    }\n                }\n            }\n        ",
                variables: {
                    sessionUID: sessionUID
                }
            }).then((function(res) {
                return res.firebase.auth.sessionToken;
            }));
        }
        var lsatUpgradeCalled = !1;
        var lsatUpgradeError;
        var onLsatUpgradeCalled = function() {
            lsatUpgradeCalled = !1;
        };
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
        function patchOrder(orderID, data, _ref8) {
            var _headers13;
            var facilitatorAccessToken = _ref8.facilitatorAccessToken, buyerAccessToken = _ref8.buyerAccessToken, partnerAttributionID = _ref8.partnerAttributionID, _ref8$forceRestAPI = _ref8.forceRestAPI, forceRestAPI = void 0 !== _ref8$forceRestAPI && _ref8$forceRestAPI;
            logger_getLogger().info("patch_order_lsat_upgrade_" + (getLsatUpgradeCalled() ? "called" : "not_called"));
            logger_getLogger().info("patch_order_lsat_upgrade_" + (getLsatUpgradeError() ? "errored" : "did_not_error"), {
                err: stringifyError(getLsatUpgradeError())
            });
            if (forceRestAPI && !getLsatUpgradeError()) {
                var _headers11;
                return callRestAPI({
                    accessToken: facilitatorAccessToken,
                    method: "PATCH",
                    eventName: "v2_checkout_orders_patch",
                    url: ORDERS_API_URL + "/" + orderID,
                    data: data,
                    headers: (_headers11 = {}, _headers11["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                    _headers11.prefer = "return=representation", _headers11)
                }).catch((function(err) {
                    var _headers12;
                    var restCorrID = getErrorResponseCorrelationID(err);
                    logger_getLogger().warn("patch_order_call_rest_api_error", {
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
                        logger_getLogger().info("patch_order_smart_fallback_success", {
                            smartCorrID: smartCorrID,
                            restCorrID: restCorrID,
                            orderID: orderID
                        });
                        return res.data;
                    })).catch((function(smartErr) {
                        var smartCorrID = getErrorResponseCorrelationID(err);
                        logger_getLogger().info("patch_order_smart_fallback_error", {
                            smartCorrID: smartCorrID,
                            restCorrID: restCorrID,
                            orderID: orderID,
                            err: stringifyError(smartErr)
                        });
                        throw smartErr;
                    }));
                }));
            }
            logger_getLogger().info("lsat_upgrade_false");
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
        function validatePaymentMethod(_ref12) {
            var _headers15;
            var accessToken = _ref12.accessToken, orderID = _ref12.orderID, paymentMethodID = _ref12.paymentMethodID, enableThreeDomainSecure = _ref12.enableThreeDomainSecure, partnerAttributionID = _ref12.partnerAttributionID, clientMetadataID = _ref12.clientMetadataID, installmentPlan = _ref12.installmentPlan;
            logger_getLogger().info("rest_api_create_order_token");
            var headers = ((_headers15 = {}).authorization = "Bearer " + accessToken, _headers15["paypal-partner-attribution-id"] = partnerAttributionID, 
            _headers15["paypal-client-metadata-id"] = clientMetadataID, _headers15["x-app-name"] = "smart-payment-buttons", 
            _headers15["x-app-version"] = "5.0.68", _headers15);
            var paymentSource = {
                token: {
                    id: paymentMethodID,
                    type: "NONCE"
                }
            };
            enableThreeDomainSecure && (paymentSource.contingencies = [ "3D_SECURE" ]);
            installmentPlan && (paymentSource.token.attributes = {
                installments: {
                    term: installmentPlan.term,
                    interval_duration: installmentPlan.interval_duration
                }
            });
            return request({
                method: "post",
                url: ORDERS_API_URL + "/" + orderID + "/validate-payment-method",
                headers: headers,
                json: {
                    payment_source: paymentSource
                }
            });
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
        function oneClickApproveOrder(_ref20) {
            var _headers20;
            var orderID = _ref20.orderID, clientMetadataID = _ref20.clientMetadataID;
            return callGraphQL({
                name: "OneClickApproveOrder",
                query: "\n            mutation OneClickApproveOrder(\n                $orderID : String!\n                $instrumentType : String!\n                $instrumentID : String!\n            ) {\n                oneClickPayment(\n                    token: $orderID\n                    selectedInstrumentType : $instrumentType\n                    selectedInstrumentId : $instrumentID\n                ) {\n                    userId\n                }\n            }\n        ",
                variables: {
                    orderID: orderID,
                    instrumentType: _ref20.instrumentType,
                    instrumentID: _ref20.instrumentID
                },
                headers: (_headers20 = {}, _headers20["x-paypal-internal-euat"] = _ref20.buyerAccessToken, 
                _headers20["paypal-client-context"] = orderID, _headers20["paypal-client-metadata-id"] = clientMetadataID || orderID, 
                _headers20)
            }).then((function(_ref21) {
                return {
                    payerID: _ref21.oneClickPayment.userId
                };
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
        var order_getDetailedOrderInfo = function(orderID, country) {
            var _headers22;
            return callGraphQL({
                name: "GetCheckoutDetails",
                query: "\n            query GetCheckoutDetails($orderID: String!, $country: CountryCodes!) {\n                checkoutSession(token: $orderID) {\n                    allowedCardIssuers(country: $country)\n                    cart {\n                        amounts {\n                            shippingAndHandling {\n                                currencyValue\n                                currencySymbol\n                                currencyFormat\n                            }\n                            tax {\n                                currencyValue\n                                currencySymbol\n                                currencyFormat\n                            }\n                            subtotal {\n                                currencyValue\n                                currencySymbol\n                                currencyFormat\n                            }\n                            total {\n                                currencyValue\n                                currencyCode\n                                currencyFormatSymbolISOCurrency\n                            }\n                        }\n                        shippingAddress {\n                            firstName\n                            lastName\n                            line1\n                            line2\n                            city\n                            state\n                            postalCode\n                            country\n                        }\n                        shippingMethods {\n                            amount {\n                                currencyCode\n                                currencyValue\n                            }\n                            label\n                            selected\n                            type\n                        }\n                    }\n                }\n            }\n        ",
                variables: {
                    orderID: orderID,
                    country: country
                },
                headers: (_headers22 = {}, _headers22["paypal-client-context"] = orderID, _headers22)
            });
        };
        function updateButtonClientConfig(_ref22) {
            var _ref22$inline = _ref22.inline;
            return callGraphQL({
                name: "UpdateClientConfig",
                query: "\n            mutation UpdateClientConfig(\n                $orderID : String!,\n                $fundingSource : ButtonFundingSourceType!,\n                $integrationArtifact : IntegrationArtifactType!,\n                $userExperienceFlow : UserExperienceFlowType!,\n                $productFlow : ProductFlowType!,\n                $buttonSessionID : String\n            ) {\n                updateClientConfig(\n                    token: $orderID,\n                    fundingSource: $fundingSource,\n                    integrationArtifact: $integrationArtifact,\n                    userExperienceFlow: $userExperienceFlow,\n                    productFlow: $productFlow,\n                    buttonSessionID: $buttonSessionID\n                )\n            }\n        ",
                variables: {
                    orderID: orderID = (_ref17 = {
                        orderID: _ref22.orderID,
                        fundingSource: _ref22.fundingSource,
                        integrationArtifact: "PAYPAL_JS_SDK",
                        userExperienceFlow: _ref22.userExperienceFlow || (void 0 !== _ref22$inline && _ref22$inline ? "INLINE" : "INCONTEXT"),
                        productFlow: "SMART_PAYMENT_BUTTONS",
                        buttonSessionID: _ref22.buttonSessionID
                    }).orderID,
                    fundingSource: _ref17.fundingSource,
                    integrationArtifact: _ref17.integrationArtifact,
                    userExperienceFlow: _ref17.userExperienceFlow,
                    productFlow: _ref17.productFlow,
                    buttonSessionID: _ref17.buttonSessionID
                },
                headers: (_headers18 = {}, _headers18["paypal-client-context"] = orderID, _headers18)
            }).then(src_util_noop);
            var _ref17, _headers18, orderID;
        }
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
                    logger_getLogger().warn("rest_api_" + eventName + "_error");
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
                    logger_getLogger().warn("rest_api_" + eventName + "_error");
                    throw new Error("Revise Subscription Api HTTP-" + status + " response: error:\n\n" + JSON.stringify(body, null, 4));
                }
                return subscriptionID;
            }));
        }
        var loadFirebaseSDK = memoize((function(config) {
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
        var loadFraudnet = memoize((function(_ref) {
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
                var body = function() {
                    var body = document.body;
                    if (!body) throw new Error("Document body not found");
                    return body;
                }();
                body.appendChild(configScript);
                body.appendChild(fraudnetScript);
            }));
        }));
        var getSmartWallet = memoize((function(_ref) {
            var _headers;
            var _ref$amount = _ref.amount, _ref$vetted = _ref.vetted;
            return callGraphQL({
                name: "GetSmartWallet",
                query: "\n            query GetSmartWallet(\n                $clientID: String!\n                $merchantID: [String!]\n                $currency: String\n                $amount: String\n                $userIDToken: String\n                $vetted: Boolean\n                $paymentMethodToken: String\n                $branded: Boolean\n            ) {\n                smartWallet(\n                    clientId: $clientID\n                    merchantId: $merchantID\n                    currency: $currency\n                    amount: $amount\n                    userIdToken: $userIDToken\n                    vetted: $vetted\n                    paymentMethodNonce: $paymentMethodToken\n                    branded: $branded\n                ) {\n                    paypal {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                            accessToken\n                        }\n                    }\n                    credit {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                            accessToken\n                        }\n                    }\n                    card {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                        }\n                    }\n                }\n            }\n        ",
                variables: {
                    clientID: _ref.clientID,
                    merchantID: _ref.merchantID,
                    currency: _ref.currency,
                    amount: void 0 === _ref$amount ? "0.00" : _ref$amount,
                    userIDToken: _ref.userIDToken,
                    vetted: void 0 === _ref$vetted || _ref$vetted,
                    paymentMethodToken: _ref.paymentMethodToken,
                    branded: _ref.branded
                },
                headers: (_headers = {}, _headers["paypal-client-metadata-id"] = _ref.clientMetadataID, 
                _headers)
            }).then((function(_ref2) {
                return _ref2.smartWallet;
            }));
        }));
        function getNativeEligibility(_ref2) {
            var buttonSessionID = _ref2.buttonSessionID, cookies = _ref2.cookies, orderID = _ref2.orderID, enableFunding = _ref2.enableFunding, stickinessID = _ref2.stickinessID, domain = _ref2.domain, _ref2$skipElmo = _ref2.skipElmo, skipElmo = void 0 !== _ref2$skipElmo && _ref2$skipElmo;
            return callGraphQL({
                name: "GetNativeEligibility",
                query: "\n            query GetNativeEligibility(\n                $vault : Boolean,\n                $shippingCallbackEnabled : Boolean,\n                $merchantID : String,\n                $clientID : String,\n                $buyerCountry : String,\n                $currency : String,\n                $userAgent : String,\n                $buttonSessionID : String,\n                $cookies : String,\n                $orderID : String,\n                $enableFunding : [String],\n                $stickinessID : String,\n                $domain : String,\n                $skipElmo : Boolean\n            ) {\n                mobileSDKEligibility(\n                    vault: $vault,\n                    shippingCallbackEnabled: $shippingCallbackEnabled,\n                    merchantID: $merchantID,\n                    facilitatorClientID: $clientID,\n                    buyerCountry: $buyerCountry,\n                    currency: $currency,\n                    userAgent: $userAgent,\n                    buttonSessionID: $buttonSessionID,\n                    cookies: $cookies,\n                    token: $orderID,\n                    enableFunding: $enableFunding,\n                    stickinessID: $stickinessID,\n                    domain: $domain,\n                    skipElmo: $skipElmo\n                ) {\n                    paypal {\n                        eligibility\n                        ineligibilityReason\n                    }\n                    venmo {\n                        eligibility\n                        ineligibilityReason\n                    }\n                }\n            }\n        ",
                variables: {
                    vault: _ref2.vault,
                    shippingCallbackEnabled: _ref2.shippingCallbackEnabled,
                    merchantID: _ref2.merchantID,
                    clientID: _ref2.clientID,
                    buyerCountry: _ref2.buyerCountry,
                    currency: _ref2.currency,
                    userAgent: getUserAgent(),
                    buttonSessionID: buttonSessionID,
                    cookies: cookies,
                    orderID: orderID,
                    enableFunding: enableFunding,
                    stickinessID: stickinessID,
                    domain: domain,
                    skipElmo: skipElmo
                }
            }).then((function(gqlResult) {
                if (!gqlResult || !gqlResult.mobileSDKEligibility) throw new Error("GraphQL GetNativeEligibility returned no mobileSDKEligibility object");
                return gqlResult.mobileSDKEligibility;
            }));
        }
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
                                logger_getLogger().info("rest_api_create_order_id");
                                return callRestAPI({
                                    accessToken: facilitatorAccessToken,
                                    method: "post",
                                    url: "" + ORDERS_API_URL,
                                    eventName: "v2_checkout_orders_create",
                                    data: order,
                                    headers: (_headers = {}, _headers["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                    _headers.prefer = "return=representation", _headers)
                                }).then((function(body) {
                                    var _getLogger$track;
                                    var orderID = body && body.id;
                                    if (!orderID) throw new Error("Order Api response error:\n\n" + JSON.stringify(body, null, 4));
                                    logger_getLogger().track(((_getLogger$track = {}).transition_name = "process_create_order", 
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
                })).catch((function(err) {
                    logger_getLogger().error("create_order_error", {
                        err: stringifyError(err)
                    });
                    throw err;
                })).then((function(orderID) {
                    var _getLogger$addPayload;
                    if (!orderID || "string" != typeof orderID) throw new Error("Expected an order id to be passed");
                    if (0 === orderID.indexOf("PAY-") || 0 === orderID.indexOf("PAYID-")) throw new Error("Do not pass PAY-XXX or PAYID-XXX directly into createOrder. Pass the EC-XXX token instead");
                    var duration = Date.now() - startTime;
                    logger_getLogger().addPayloadBuilder((function() {
                        return {
                            token: orderID
                        };
                    })).addTrackingBuilder((function() {
                        var _ref6;
                        return (_ref6 = {}).context_type = "EC-Token", _ref6.context_id = orderID, _ref6.token = orderID, 
                        _ref6;
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
                logger_getLogger().warn("redir_url_non_scheme", {
                    url: url
                }).flush();
                throw new Error("Invalid redirect url: " + url + " - must be fully qualified url");
            }
            url.match(/^https?:\/\//) || logger_getLogger().warn("redir_url_non_http", {
                url: url
            }).flush();
            return dom_redirect(url, window.top);
        };
        var onApprove_handleProcessorError = function(err, restart) {
            if (isProcessorDeclineError(err)) return restart().then(unresolvedPromise);
            throw err;
        };
        var _excluded = [ "buyerAccessToken", "forceRestAPI" ];
        function getProps(_ref) {
            var facilitatorAccessToken = _ref.facilitatorAccessToken, branded = _ref.branded;
            var xprops = window.xprops;
            var uid = xprops.uid, env = xprops.env, _xprops$vault = xprops.vault, vault = void 0 !== _xprops$vault && _xprops$vault, commit = xprops.commit, locale = xprops.locale, platform = xprops.platform, sessionID = xprops.sessionID, clientID = xprops.clientID, partnerAttributionID = xprops.partnerAttributionID, clientMetadataID = xprops.clientMetadataID, sdkCorrelationID = xprops.sdkCorrelationID, getParentDomain = xprops.getParentDomain, clientAccessToken = xprops.clientAccessToken, getPopupBridge = xprops.getPopupBridge, getPrerenderDetails = xprops.getPrerenderDetails, getPageUrl = xprops.getPageUrl, enableThreeDomainSecure = xprops.enableThreeDomainSecure, enableVaultInstallments = xprops.enableVaultInstallments, _xprops$enableNativeC = xprops.enableNativeCheckout, enableNativeCheckout = void 0 !== _xprops$enableNativeC && _xprops$enableNativeC, rememberFunding = xprops.remember, stageHost = xprops.stageHost, apiStageHost = xprops.apiStageHost, getParent = xprops.getParent, fundingSource = xprops.fundingSource, currency = xprops.currency, connect = xprops.connect, intent = xprops.intent, merchantID = xprops.merchantID, amount = xprops.amount, userIDToken = xprops.userIDToken, enableFunding = xprops.enableFunding, disableFunding = xprops.disableFunding, disableCard = xprops.disableCard, wallet = xprops.wallet, _xprops$paymentMethod = xprops.paymentMethodToken, paymentMethodToken = void 0 === _xprops$paymentMethod ? xprops.paymentMethodNonce : _xprops$paymentMethod, _xprops$getQueriedEli = xprops.getQueriedEligibleFunding, getQueriedEligibleFunding = void 0 === _xprops$getQueriedEli ? function() {
                return promise_ZalgoPromise.resolve([]);
            } : _xprops$getQueriedEli, storageID = xprops.storageID, applePay = xprops.applePay, userExperienceFlow = xprops.userExperienceFlow;
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
            var stickinessID = storageID && isStorageStateFresh() ? storageID : getStorageID();
            var createBillingAgreement = function(_ref) {
                var createBillingAgreement = _ref.createBillingAgreement;
                if (createBillingAgreement) return function() {
                    return createBillingAgreement({}, {}).then((function(billingToken) {
                        if (!billingToken || "string" != typeof billingToken) throw new Error("Expected a billing token to be passed to createBillingAgreement");
                        return billingToken;
                    }));
                };
            }({
                createBillingAgreement: xprops.createBillingAgreement
            });
            var createSubscription = function(_ref2, _ref3) {
                var createSubscription = _ref2.createSubscription, partnerAttributionID = _ref2.partnerAttributionID, merchantID = _ref2.merchantID, clientID = _ref2.clientID;
                var facilitatorAccessToken = _ref3.facilitatorAccessToken;
                if (createSubscription) {
                    if (merchantID && merchantID[0]) {
                        logger_getLogger().info("src_props_subscriptions_recreate_access_token_cache");
                        auth_createAccessToken(clientID, {
                            targetSubject: merchantID[0]
                        });
                    }
                    return function() {
                        return createSubscription({}, function(_ref) {
                            var facilitatorAccessToken = _ref.facilitatorAccessToken, partnerAttributionID = _ref.partnerAttributionID, merchantID = _ref.merchantID, clientID = _ref.clientID;
                            return {
                                subscription: {
                                    create: function(data) {
                                        return function(accessToken, subscriptionPayload, _ref2) {
                                            var partnerAttributionID = _ref2.partnerAttributionID, merchantID = _ref2.merchantID, clientID = _ref2.clientID;
                                            logger_getLogger().info("rest_api_create_subscription_id");
                                            if (!subscriptionPayload) throw new Error("Expected subscription payload to be passed");
                                            if (merchantID && merchantID[0]) {
                                                logger_getLogger().info("rest_api_subscriptions_recreate_access_token");
                                                return auth_createAccessToken(clientID, {
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
                                            logger_getLogger().info("rest_api_create_subscription_id");
                                            if (!subscriptionID) throw new Error("Expected subscription id to be passed as first argument to revise subscription api");
                                            if (!subscriptionPayload) throw new Error("Expected subscription payload to be passed");
                                            if (merchantID && merchantID[0]) {
                                                logger_getLogger().info("rest_api_subscriptions_recreate_access_token");
                                                return auth_createAccessToken(clientID, {
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
                    };
                }
            }({
                createSubscription: xprops.createSubscription,
                partnerAttributionID: partnerAttributionID,
                merchantID: merchantID,
                clientID: clientID
            }, {
                facilitatorAccessToken: facilitatorAccessToken
            });
            var createOrder = getCreateOrder({
                createOrder: xprops.createOrder,
                currency: currency,
                intent: intent,
                merchantID: merchantID,
                partnerAttributionID: partnerAttributionID
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
                var intent = _ref19.intent, createSubscription = _ref19.createSubscription, onApprove = _ref19.onApprove, partnerAttributionID = _ref19.partnerAttributionID, onError = _ref19.onError, clientAccessToken = _ref19.clientAccessToken, vault = _ref19.vault, clientID = _ref19.clientID, facilitatorAccessToken = _ref19.facilitatorAccessToken, branded = _ref19.branded, createOrder = _ref19.createOrder;
                if (_ref19.createBillingAgreement) return function(_ref10) {
                    var _ref10$onApprove = _ref10.onApprove, onApprove = void 0 === _ref10$onApprove ? function() {
                        throw new Error("Expected onApprove");
                    } : _ref10$onApprove, onError = _ref10.onError, facilitatorAccessToken = _ref10.facilitatorAccessToken, createOrder = _ref10.createOrder;
                    if (!onApprove) throw new Error("Expected onApprove");
                    return memoize((function(_ref11, _ref12) {
                        var payerID = _ref11.payerID, paymentID = _ref11.paymentID, billingToken = _ref11.billingToken;
                        var restart = _ref12.restart;
                        return createOrder().then((function(orderID) {
                            var _getLogger$info$track2;
                            logger_getLogger().info("button_approve").track((_getLogger$info$track2 = {}, _getLogger$info$track2.transition_name = "process_checkout_approve", 
                            _getLogger$info$track2.context_type = "EC-Token", _getLogger$info$track2.token = orderID, 
                            _getLogger$info$track2.context_id = orderID, _getLogger$info$track2)).flush();
                            return getSupplementalOrderInfo(orderID).then((function(supplementalData) {
                                return onApprove({
                                    orderID: orderID,
                                    payerID: payerID,
                                    paymentID: paymentID = paymentID || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.paymentId,
                                    billingToken: billingToken = billingToken || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.billingToken,
                                    facilitatorAccessToken: facilitatorAccessToken
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
                    createOrder: createOrder
                });
                if ("subscription" === intent || createSubscription) return function(_ref16) {
                    var _ref16$onApprove = _ref16.onApprove, onApprove = void 0 === _ref16$onApprove ? function() {
                        throw new Error("Expected onApprove");
                    } : _ref16$onApprove, onError = _ref16.onError, facilitatorAccessToken = _ref16.facilitatorAccessToken, createOrder = _ref16.createOrder;
                    if (!onApprove) throw new Error("Expected onApprove");
                    return memoize((function(_ref17, _ref18) {
                        var payerID = _ref17.payerID, subscriptionID = _ref17.subscriptionID, buyerAccessToken = _ref17.buyerAccessToken;
                        var restart = _ref18.restart;
                        if (!subscriptionID) throw new Error("Expected subscriptionID");
                        return createOrder().then((function(orderID) {
                            var _getLogger$info$track4;
                            logger_getLogger().info("button_approve").track((_getLogger$info$track4 = {}, _getLogger$info$track4.transition_name = "process_checkout_approve", 
                            _getLogger$info$track4.context_type = "EC-Token", _getLogger$info$track4.token = orderID, 
                            _getLogger$info$track4.context_id = orderID, _getLogger$info$track4)).flush();
                            var data = {
                                orderID: orderID,
                                payerID: payerID,
                                subscriptionID: subscriptionID,
                                facilitatorAccessToken: facilitatorAccessToken
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
                    createOrder: createOrder
                });
                if ("capture" === intent || "authorize" === intent || "order" === intent) return function(_ref7) {
                    var intent = _ref7.intent, _ref7$onApprove = _ref7.onApprove, onApprove = void 0 === _ref7$onApprove ? function(intent) {
                        return function(data, actions) {
                            if ("capture" === intent) return actions.order.capture().then(src_util_noop);
                            if ("authorize" === intent) return actions.order.authorize().then(src_util_noop);
                            throw new Error("Unsupported intent for auto-capture: " + intent);
                        };
                    }(intent) : _ref7$onApprove, partnerAttributionID = _ref7.partnerAttributionID, onError = _ref7.onError, clientAccessToken = _ref7.clientAccessToken, vault = _ref7.vault, clientID = _ref7.clientID, facilitatorAccessToken = _ref7.facilitatorAccessToken, branded = _ref7.branded, createOrder = _ref7.createOrder;
                    if (!onApprove) throw new Error("Expected onApprove");
                    var upgradeLSAT = -1 === LSAT_UPGRADE_EXCLUDED_MERCHANTS.indexOf(clientID);
                    return memoize((function(_ref8, _ref9) {
                        var payerID = _ref8.payerID, paymentID = _ref8.paymentID, billingToken = _ref8.billingToken, buyerAccessToken = _ref8.buyerAccessToken, authCode = _ref8.authCode, _ref8$forceRestAPI = _ref8.forceRestAPI, forceRestAPI = void 0 === _ref8$forceRestAPI ? upgradeLSAT : _ref8$forceRestAPI;
                        var restart = _ref9.restart;
                        return createOrder().then((function(orderID) {
                            var _getLogger$info$track;
                            logger_getLogger().info("button_approve").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_approve", 
                            _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                            _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                            billingToken || clientAccessToken || vault || !payerID && branded && logger_getLogger().error("onapprove_payerid_not_present_for_branded_standalone_button", {
                                orderID: orderID
                            }).flush();
                            return getSupplementalOrderInfo(orderID).then((function(supplementalData) {
                                var data = {
                                    orderID: orderID,
                                    payerID: payerID,
                                    paymentID: paymentID = paymentID || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.paymentId,
                                    billingToken: billingToken = billingToken || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.billingToken,
                                    facilitatorAccessToken: facilitatorAccessToken,
                                    authCode: authCode
                                };
                                var actions = function(_ref3) {
                                    var intent = _ref3.intent, orderID = _ref3.orderID, paymentID = _ref3.paymentID, payerID = _ref3.payerID, restart = _ref3.restart, facilitatorAccessToken = _ref3.facilitatorAccessToken, buyerAccessToken = _ref3.buyerAccessToken, partnerAttributionID = _ref3.partnerAttributionID, forceRestAPI = _ref3.forceRestAPI;
                                    var order = function(_ref) {
                                        var intent = _ref.intent, orderID = _ref.orderID, restart = _ref.restart, facilitatorAccessToken = _ref.facilitatorAccessToken, buyerAccessToken = _ref.buyerAccessToken, partnerAttributionID = _ref.partnerAttributionID, forceRestAPI = _ref.forceRestAPI;
                                        var get = memoize((function() {
                                            return function(orderID, _ref2) {
                                                var _headers4;
                                                var facilitatorAccessToken = _ref2.facilitatorAccessToken, buyerAccessToken = _ref2.buyerAccessToken, partnerAttributionID = _ref2.partnerAttributionID, _ref2$forceRestAPI = _ref2.forceRestAPI, forceRestAPI = void 0 !== _ref2$forceRestAPI && _ref2$forceRestAPI;
                                                logger_getLogger().info("get_order_lsat_upgrade_" + (getLsatUpgradeCalled() ? "called" : "not_called"));
                                                logger_getLogger().info("get_order_lsat_upgrade_" + (getLsatUpgradeError() ? "errored" : "did_not_error"), {
                                                    err: stringifyError(getLsatUpgradeError())
                                                });
                                                if (forceRestAPI && !getLsatUpgradeError()) {
                                                    var _headers2;
                                                    return callRestAPI({
                                                        accessToken: facilitatorAccessToken,
                                                        url: ORDERS_API_URL + "/" + orderID,
                                                        eventName: "v2_checkout_orders_get",
                                                        headers: (_headers2 = {}, _headers2["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                                        _headers2.prefer = "return=representation", _headers2)
                                                    }).catch((function(err) {
                                                        var _headers3;
                                                        var restCorrID = getErrorResponseCorrelationID(err);
                                                        logger_getLogger().warn("get_order_call_rest_api_error", {
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
                                                            logger_getLogger().info("get_order_smart_fallback_success", {
                                                                smartCorrID: smartCorrID,
                                                                restCorrID: restCorrID,
                                                                orderID: orderID
                                                            });
                                                            return res.data;
                                                        })).catch((function(smartErr) {
                                                            var smartCorrID = getErrorResponseCorrelationID(err);
                                                            logger_getLogger().error("get_order_smart_fallback_error", {
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
                                                logger_getLogger().info("capture_order_lsat_upgrade_" + (getLsatUpgradeCalled() ? "called" : "not_called"));
                                                logger_getLogger().info("capture_order_lsat_upgrade_" + (getLsatUpgradeError() ? "errored" : "did_not_error"), {
                                                    err: stringifyError(getLsatUpgradeError())
                                                });
                                                if (forceRestAPI && !getLsatUpgradeError()) {
                                                    var _headers5;
                                                    return callRestAPI({
                                                        accessToken: facilitatorAccessToken,
                                                        method: "post",
                                                        eventName: "v2_checkout_orders_capture",
                                                        url: ORDERS_API_URL + "/" + orderID + "/capture",
                                                        headers: (_headers5 = {}, _headers5["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                                        _headers5.prefer = "return=representation", _headers5["paypal-request-id"] = orderID, 
                                                        _headers5)
                                                    }).catch((function(err) {
                                                        var _headers6;
                                                        var restCorrID = getErrorResponseCorrelationID(err);
                                                        logger_getLogger().warn("capture_order_call_rest_api_error", {
                                                            restCorrID: restCorrID,
                                                            orderID: orderID,
                                                            err: stringifyError(err)
                                                        });
                                                        if (isProcessorDeclineError(err)) throw err;
                                                        return callSmartAPI({
                                                            accessToken: buyerAccessToken,
                                                            method: "post",
                                                            eventName: "order_capture",
                                                            url: "/smart/api/order/" + orderID + "/capture",
                                                            headers: (_headers6 = {}, _headers6["paypal-client-context"] = orderID, _headers6)
                                                        }).then((function(res) {
                                                            var smartCorrID = getResponseCorrelationID(res);
                                                            logger_getLogger().info("capture_order_smart_fallback_success", {
                                                                smartCorrID: smartCorrID,
                                                                restCorrID: restCorrID,
                                                                orderID: orderID
                                                            });
                                                            return res.data;
                                                        })).catch((function(smartErr) {
                                                            var smartCorrID = getErrorResponseCorrelationID(err);
                                                            logger_getLogger().info("capture_order_smart_fallback_error", {
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
                                                return onApprove_handleProcessorError(err, restart);
                                            }));
                                        }));
                                        var authorize = memoize((function() {
                                            if ("authorize" !== intent) throw new Error("Use intent=authorize to use client-side authorize");
                                            return function(orderID, _ref6) {
                                                var _headers10;
                                                var facilitatorAccessToken = _ref6.facilitatorAccessToken, buyerAccessToken = _ref6.buyerAccessToken, partnerAttributionID = _ref6.partnerAttributionID, _ref6$forceRestAPI = _ref6.forceRestAPI, forceRestAPI = void 0 !== _ref6$forceRestAPI && _ref6$forceRestAPI;
                                                logger_getLogger().info("authorize_order_lsat_upgrade_" + (getLsatUpgradeCalled() ? "called" : "not_called"));
                                                logger_getLogger().info("authorize_order_lsat_upgrade_" + (getLsatUpgradeError() ? "errored" : "did_not_error"), {
                                                    err: stringifyError(getLsatUpgradeError())
                                                });
                                                if (forceRestAPI && !getLsatUpgradeError()) {
                                                    var _headers8;
                                                    return callRestAPI({
                                                        accessToken: facilitatorAccessToken,
                                                        method: "post",
                                                        eventName: "v2_checkout_orders_authorize",
                                                        url: ORDERS_API_URL + "/" + orderID + "/authorize",
                                                        headers: (_headers8 = {}, _headers8["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                                        _headers8.prefer = "return=representation", _headers8)
                                                    }).catch((function(err) {
                                                        var _headers9;
                                                        var restCorrID = getErrorResponseCorrelationID(err);
                                                        logger_getLogger().warn("authorize_order_call_rest_api_error", {
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
                                                            logger_getLogger().info("authorize_order_smart_fallback_success", {
                                                                smartCorrID: smartCorrID,
                                                                restCorrID: restCorrID,
                                                                orderID: orderID
                                                            });
                                                            return res.data;
                                                        })).catch((function(smartErr) {
                                                            var smartCorrID = getErrorResponseCorrelationID(err);
                                                            logger_getLogger().info("authorize_order_smart_fallback_error", {
                                                                smartCorrID: smartCorrID,
                                                                restCorrID: restCorrID,
                                                                orderID: orderID,
                                                                err: stringifyError(smartErr)
                                                            });
                                                            throw smartErr;
                                                        }));
                                                    }));
                                                }
                                                logger_getLogger().info("lsat_upgrade_false");
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
                                                return onApprove_handleProcessorError(err, restart);
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
                                        forceRestAPI: forceRestAPI
                                    });
                                    !function(_ref2) {
                                        var intent = _ref2.intent, paymentID = _ref2.paymentID, payerID = _ref2.payerID, restart = _ref2.restart, facilitatorAccessToken = _ref2.facilitatorAccessToken, buyerAccessToken = _ref2.buyerAccessToken, partnerAttributionID = _ref2.partnerAttributionID;
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
                                                    return onApprove_handleProcessorError(err, restart);
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
                                        forceRestAPI: forceRestAPI
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
                    createOrder: createOrder
                });
                if ("tokenize" === intent) return function(_ref13) {
                    var _ref13$onApprove = _ref13.onApprove, onApprove = void 0 === _ref13$onApprove ? function() {
                        throw new Error("Expected onApprove");
                    } : _ref13$onApprove, onError = _ref13.onError, facilitatorAccessToken = _ref13.facilitatorAccessToken;
                    if (!onApprove) throw new Error("Expected onApprove");
                    return memoize((function(_ref14, _ref15) {
                        var _getLogger$info$track3;
                        var paymentMethodToken = _ref14.paymentMethodToken;
                        var restart = _ref15.restart;
                        if (!paymentMethodToken) throw new Error("Payment method token required for tokenize onApprove");
                        logger_getLogger().info("button_approve").track((_getLogger$info$track3 = {}, _getLogger$info$track3.transition_name = "process_tokenize_approve", 
                        _getLogger$info$track3)).flush();
                        return onApprove({
                            facilitatorAccessToken: facilitatorAccessToken,
                            paymentMethodToken: paymentMethodToken
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
                    facilitatorAccessToken: facilitatorAccessToken
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
                createOrder: createOrder
            });
            var onCancel = function(_ref2, _ref3) {
                var _ref2$onCancel = _ref2.onCancel, onCancel = void 0 === _ref2$onCancel ? promiseNoop : _ref2$onCancel, onError = _ref2.onError;
                var createOrder = _ref3.createOrder;
                return memoize((function() {
                    return createOrder().then((function(orderID) {
                        var _getLogger$info$track;
                        logger_getLogger().info("button_cancel").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_cancel", 
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
                                    logger_getLogger().warn("redir_url_non_scheme", {
                                        url: url
                                    }).flush();
                                    throw new Error("Invalid redirect url: " + url + " - must be fully qualified url");
                                }
                                url.match(/^https?:\/\//) || logger_getLogger().warn("redir_url_non_http", {
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
                        logger_getLogger().info("button_shipping_change").track((_getLogger$info$track = {}, 
                        _getLogger$info$track.transition_name = "process_checkout_shipping_change", _getLogger$info$track.context_type = "EC-Token", 
                        _getLogger$info$track.token = orderID, _getLogger$info$track.context_id = orderID, 
                        _getLogger$info$track.shipping_callback_invoked = "1", _getLogger$info$track)).flush();
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
                    var accessToken = _ref2.accessToken;
                    logger_getLogger().info("spb_onauth_access_token_" + (accessToken ? "present" : "not_present"));
                    return promise_ZalgoPromise.try((function() {
                        if (accessToken) return upgradeLSAT ? createOrder().then((function(orderID) {
                            return createSubscription ? accessToken : function(facilitatorAccessToken, _ref3) {
                                var _headers;
                                var buyerAccessToken = _ref3.buyerAccessToken, orderID = _ref3.orderID;
                                onLsatUpgradeCalled();
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
                            logger_getLogger().info("upgrade_lsat_success");
                            return accessToken;
                        })).catch((function(err) {
                            logger_getLogger().warn("upgrade_lsat_failure", {
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
                getQueriedEligibleFunding: getQueriedEligibleFunding,
                amount: amount,
                userIDToken: userIDToken,
                enableThreeDomainSecure: enableThreeDomainSecure,
                enableNativeCheckout: enableNativeCheckout,
                enableVaultInstallments: enableVaultInstallments,
                onClick: onClick,
                onInit: onInit,
                onError: onError,
                stageHost: stageHost,
                apiStageHost: apiStageHost,
                createOrder: createOrder,
                createBillingAgreement: createBillingAgreement,
                createSubscription: createSubscription,
                onApprove: onApprove,
                onCancel: onCancel,
                onShippingChange: onShippingChange,
                onAuth: onAuth,
                standaloneFundingSource: fundingSource,
                paymentMethodToken: paymentMethodToken,
                branded: branded,
                stickinessID: stickinessID,
                applePay: applePay,
                userExperienceFlow: userExperienceFlow
            };
        }
        var button_props_TYPES = !0;
        function getButtonProps(_ref) {
            var _branded;
            var facilitatorAccessToken = _ref.facilitatorAccessToken;
            var xprops = window.xprops;
            var buttonSessionID = xprops.buttonSessionID, style = xprops.style, branded = xprops.branded, intent = xprops.intent;
            branded = null != (_branded = branded) ? _branded : _ref.brandedDefault;
            if (xprops.createBillingAgreement) {
                if (xprops.createOrder) throw new Error("Do not pass both createBillingAgreement and createOrder");
                if (!xprops.vault) throw new Error("Must pass vault=true to sdk to use createBillingAgreement");
            }
            if (xprops.createSubscription) {
                if (xprops.createOrder) throw new Error("Do not pass both createSubscription and createOrder");
                if (xprops.createOrder) throw new Error("Do not pass both createSubscription and createBillingAgreement");
                if (!xprops.vault) throw new Error("Must pass vault=true to sdk to use createSubscription");
            }
            if ("tokenize" === intent) {
                if (!xprops.createBillingAgreement) throw new Error("Must pass createBillingAgreement with intent=tokenize");
                if (xprops.createOrder || xprops.createSubscription) throw new Error("Must not pass createOrder or createSubscription with intent=tokenize");
            }
            if ("subscription" === intent) {
                if (!xprops.createSubscription) throw new Error("Must pass createSubscription with intent=subscription");
                if (xprops.createOrder || xprops.createBillingAgreement) throw new Error("Must not pass createOrder or createBillingAgreement with intent=tokenize");
            }
            return _extends({}, getProps({
                facilitatorAccessToken: facilitatorAccessToken,
                branded: branded
            }), {
                style: style,
                buttonSessionID: buttonSessionID,
                branded: branded
            });
        }
        function getComponents() {
            var _paypal = paypal;
            return {
                Checkout: _paypal.Checkout,
                CardForm: _paypal.CardForm,
                ThreeDomainSecure: _paypal.ThreeDomainSecure,
                Menu: _paypal.Menu,
                Installments: _paypal.Installments,
                QRCode: _paypal.QRCode
            };
        }
        function getConfig(_ref2) {
            var firebaseConfig = _ref2.firebaseConfig;
            var cspNonce = _ref2.serverCSPNonce || getNonce();
            return {
                sdkVersion: paypal.version,
                cspNonce: cspNonce,
                firebase: firebaseConfig
            };
        }
        function getServiceData(_ref3) {
            var eligibility = _ref3.eligibility;
            return {
                merchantID: _ref3.serverMerchantID,
                buyerCountry: _ref3.buyerGeoCountry || COUNTRY.US,
                fundingEligibility: _ref3.fundingEligibility,
                wallet: _ref3.wallet,
                sdkMeta: _ref3.sdkMeta,
                content: _ref3.content,
                buyerAccessToken: _ref3.buyerAccessToken,
                facilitatorAccessToken: _ref3.facilitatorAccessToken,
                eligibility: eligibility ? {
                    cardForm: eligibility.cardFields || !1
                } : {
                    cardForm: !1
                },
                cookies: _ref3.cookies,
                personalization: _ref3.personalization
            };
        }
        function enableLoadingSpinner(button) {
            button.classList.add("paypal-button-loading");
        }
        function disableLoadingSpinner(button) {
            button.classList.remove("paypal-button-loading");
        }
        var validNetworks = {
            discover: "discover",
            visa: "visa",
            mastercard: "masterCard",
            amex: "amex",
            cb_nationale: "cartesBancaires",
            maestro: "maestro",
            jcb: "jcb"
        };
        var applepay_clean;
        var applepay = {
            name: "applepay",
            setup: function() {
                return promise_ZalgoPromise.resolve();
            },
            isEligible: function(_ref) {
                var fundingEligibility = _ref.serviceData.fundingEligibility;
                return !!(fundingEligibility && fundingEligibility.applepay && fundingEligibility.applepay.eligible) && fundingEligibility.applepay.eligible;
            },
            isPaymentEligible: function(_ref2) {
                return "applepay" === _ref2.payment.fundingSource;
            },
            init: function(_ref3) {
                var props = _ref3.props;
                var createOrder = props.createOrder, onApprove = props.onApprove, onCancel = props.onCancel, onError = props.onError, onClick = props.onClick, onShippingChange = props.onShippingChange, locale = props.locale, clientID = props.clientID, merchantDomain = props.merchantDomain, currency = props.currency, applePay = props.applePay, partnerAttributionID = props.partnerAttributionID;
                var facilitatorAccessToken = _ref3.serviceData.facilitatorAccessToken;
                var fundingSource = _ref3.payment.fundingSource;
                applepay_clean && applepay_clean.all();
                applepay_clean = cleanup();
                var close = memoize((function() {
                    return applepay_clean.all();
                }));
                var validate = memoize((function() {
                    return promise_ZalgoPromise.try((function() {
                        return !onClick || onClick({
                            fundingSource: fundingSource
                        });
                    }));
                }));
                function logApplePayEvent(event, payload) {
                    var _getLogger$info$track;
                    var data = function(json) {
                        try {
                            JSON.parse(JSON.stringify(json));
                            return !0;
                        } catch (_unused) {
                            return !1;
                        }
                    }(payload) ? payload : {};
                    logger_getLogger().info("applepay_event_" + event, data).track((_getLogger$info$track = {}, 
                    _getLogger$info$track.transition_name = "applepay_event_" + event, _getLogger$info$track.info_msg = JSON.stringify(data), 
                    _getLogger$info$track)).flush();
                }
                function handleApplePayError(eventName, error) {
                    var _getLogger$info$track2;
                    logger_getLogger().info(eventName).track((_getLogger$info$track2 = {}, _getLogger$info$track2.transition_name = eventName, 
                    _getLogger$info$track2.int_error_desc = "Error: " + stringifyError(error), _getLogger$info$track2)).flush();
                    return close().then((function() {
                        return onError(error);
                    }));
                }
                return {
                    click: function() {
                        return promise_ZalgoPromise.try((function() {
                            return onShippingChangeCallback = function(_ref4) {
                                var orderID = _ref4.orderID, shippingContact = _ref4.shippingContact, _ref4$shippingMethod = _ref4.shippingMethod, shippingMethod = void 0 === _ref4$shippingMethod ? null : _ref4$shippingMethod;
                                if (!onShippingChange) {
                                    var _currentShippingMetho;
                                    var update = {
                                        newTotal: {
                                            label: "Total",
                                            amount: currentTotalAmount
                                        },
                                        newLineItems: [ {
                                            label: "Subtotal",
                                            amount: currentSubtotalAmount
                                        }, {
                                            label: "Sales Tax",
                                            amount: currentTaxAmount
                                        }, {
                                            label: (null == (_currentShippingMetho = currentShippingMethod) ? void 0 : _currentShippingMetho.label) || "Shipping",
                                            amount: currentShippingAmount
                                        } ]
                                    };
                                    return promise_ZalgoPromise.resolve(update);
                                }
                                var _validateShippingCont = function(contact) {
                                    var errors = [];
                                    contact.locality || errors.push({
                                        code: "shippingContactInvalid",
                                        contactField: "locality",
                                        message: "City is invalid"
                                    });
                                    contact.administrativeArea || errors.push({
                                        code: "shippingContactInvalid",
                                        contactField: "administrativeArea",
                                        message: "State is invalid"
                                    });
                                    var country_code = contact.countryCode ? COUNTRY[contact.countryCode.toUpperCase()] : null;
                                    country_code || errors.push({
                                        code: "shippingContactInvalid",
                                        contactField: "countryCode",
                                        message: "Country code is invalid"
                                    });
                                    contact.postalCode || errors.push({
                                        code: "shippingContactInvalid",
                                        contactField: "postalCode",
                                        message: "Postal code is invalid"
                                    });
                                    return {
                                        errors: errors,
                                        shipping_address: {
                                            city: contact.locality,
                                            state: contact.administrativeArea,
                                            country_code: country_code,
                                            postal_code: contact.postalCode
                                        }
                                    };
                                }(shippingContact), errors = _validateShippingCont.errors, shipping_address = _validateShippingCont.shipping_address;
                                if (errors && errors.length) {
                                    var _currentShippingMetho2;
                                    var _update = {
                                        errors: errors,
                                        newTotal: {
                                            label: "Total",
                                            amount: currentTotalAmount
                                        },
                                        newLineItems: [ {
                                            label: "Subtotal",
                                            amount: currentSubtotalAmount
                                        }, {
                                            label: "Sales Tax",
                                            amount: currentTaxAmount
                                        }, {
                                            label: (null == (_currentShippingMetho2 = currentShippingMethod) ? void 0 : _currentShippingMetho2.label) || "Shipping",
                                            amount: currentShippingAmount
                                        } ]
                                    };
                                    return promise_ZalgoPromise.resolve(_update);
                                }
                                var data = {
                                    amount: {
                                        currency_code: currency,
                                        value: "0.00"
                                    },
                                    orderID: orderID,
                                    shipping_address: shipping_address
                                };
                                if (shippingMethod) {
                                    var _currentShippingMetho3;
                                    data.selected_shipping_option = {
                                        label: shippingMethod.label || (null == (_currentShippingMetho3 = currentShippingMethod) ? void 0 : _currentShippingMetho3.label) || "Shipping",
                                        type: shippingMethod.identifier,
                                        amount: {
                                            currency_code: currency,
                                            value: shippingMethod.amount
                                        }
                                    };
                                }
                                var actions = {
                                    resolve: function() {
                                        return promise_ZalgoPromise.resolve();
                                    },
                                    reject: function(err) {
                                        return promise_ZalgoPromise.reject(err);
                                    }
                                };
                                return onShippingChange(_extends({}, data, {
                                    facilitatorAccessToken: facilitatorAccessToken,
                                    partnerAttributionID: partnerAttributionID,
                                    forceRestAPI: !0
                                }), actions).then((function() {
                                    currentShippingContact = shippingContact;
                                    shippingMethod && (currentShippingMethod = shippingMethod);
                                    return order_getDetailedOrderInfo(orderID, locale.country).then((function(updatedOrder) {
                                        var _currentShippingMetho4, _currentShippingMetho5;
                                        var _updatedOrder$checkou = updatedOrder.checkoutSession.cart.amounts, updatedTaxValue = _updatedOrder$checkou.tax.currencyValue, updatedSubtotalValue = _updatedOrder$checkou.subtotal.currencyValue, updatedTotalValue = _updatedOrder$checkou.total.currencyValue;
                                        currentShippingAmount = (null == (_currentShippingMetho4 = currentShippingMethod) ? void 0 : _currentShippingMetho4.amount) || "0.00";
                                        currentTotalAmount = updatedTotalValue;
                                        var update = {
                                            newTotal: {
                                                label: "Total",
                                                amount: updatedTotalValue
                                            },
                                            newLineItems: [ {
                                                label: "Subtotal",
                                                amount: currentSubtotalAmount = "0.00" === updatedSubtotalValue ? currentSubtotalAmount : updatedSubtotalValue
                                            }, {
                                                label: "Sales Tax",
                                                amount: currentTaxAmount = "0.00" === updatedTaxValue ? currentTaxAmount : updatedTaxValue
                                            }, {
                                                label: (null == (_currentShippingMetho5 = currentShippingMethod) ? void 0 : _currentShippingMetho5.label) || "Shipping",
                                                amount: currentShippingAmount
                                            } ]
                                        };
                                        return promise_ZalgoPromise.resolve(update);
                                    }));
                                }));
                            }, orderPromise = validate().then((function(valid) {
                                if (!valid) {
                                    var _getLogger$info$track3;
                                    logger_getLogger().info("applepay_onclick_invalid").track((_getLogger$info$track3 = {}, 
                                    _getLogger$info$track3.state_name = "smart_button", _getLogger$info$track3.transition_name = "applepay_onclick_invalid", 
                                    _getLogger$info$track3)).flush();
                                }
                                return valid;
                            })).then((function(valid) {
                                return valid ? createOrder() : unresolvedPromise();
                            })), function setupApplePaySession() {
                                return orderPromise.then((function(orderID) {
                                    var country = locale.country;
                                    return order_getDetailedOrderInfo(orderID, country).then((function(order) {
                                        var applePayRequest = function(countryCode, order) {
                                            var _order$checkoutSessio = order.checkoutSession, _order$checkoutSessio2 = _order$checkoutSessio.cart, _order$checkoutSessio3 = _order$checkoutSessio2.amounts, shippingValue = _order$checkoutSessio3.shippingAndHandling.currencyValue, taxValue = _order$checkoutSessio3.tax.currencyValue, subtotalValue = _order$checkoutSessio3.subtotal.currencyValue, _order$checkoutSessio4 = _order$checkoutSessio3.total, currencyCode = _order$checkoutSessio4.currencyCode, totalValue = _order$checkoutSessio4.currencyValue, shippingAddress = _order$checkoutSessio2.shippingAddress, shippingMethods = _order$checkoutSessio2.shippingMethods;
                                            var supportedNetworks = function(issuers) {
                                                if (!issuers || issuers && 0 === issuers.length) return [];
                                                var validIssuers = [];
                                                issuers.forEach((function(issuer) {
                                                    var network = issuer.toLowerCase().replace(/_/g, "");
                                                    -1 !== Object.keys(validNetworks).indexOf(network) && validIssuers.push(validNetworks[network]);
                                                }));
                                                return validIssuers;
                                            }(_order$checkoutSessio.allowedCardIssuers);
                                            var shippingContact = function(shippingAddress) {
                                                return shippingAddress ? {
                                                    givenName: shippingAddress.firstName,
                                                    familyName: shippingAddress.lastName,
                                                    addressLines: [ shippingAddress.line1, shippingAddress.line2 ],
                                                    locality: shippingAddress.city,
                                                    administrativeArea: shippingAddress.state,
                                                    postalCode: shippingAddress.postalCode,
                                                    country: shippingAddress.country
                                                } : {
                                                    givenName: "",
                                                    familyName: "",
                                                    addressLines: [],
                                                    locality: "",
                                                    administrativeArea: "",
                                                    postalCode: "",
                                                    country: ""
                                                };
                                            }(shippingAddress);
                                            var applePayShippingMethods = function(shippingMethods) {
                                                return shippingMethods && 0 !== shippingMethods.length ? [].concat(shippingMethods).sort((function(method) {
                                                    return method.selected ? -1 : 0;
                                                })).map((function(method) {
                                                    return {
                                                        amount: method.amount && method.amount.currencyValue ? method.amount.currencyValue : "0.00",
                                                        detail: "",
                                                        identifier: method.type,
                                                        label: method.label
                                                    };
                                                })) : [];
                                            }(shippingMethods);
                                            var merchantCapabilities = function(supportedNetworks) {
                                                var merchantCapabilities = [];
                                                merchantCapabilities.push("supports3DS");
                                                merchantCapabilities.push("supportsCredit");
                                                merchantCapabilities.push("supportsDebit");
                                                supportedNetworks && -1 !== supportedNetworks.indexOf("chinaUnionPay") && merchantCapabilities.push("supportsEMV");
                                                return merchantCapabilities;
                                            }(supportedNetworks);
                                            var selectedShippingMethod = shippingMethods && shippingMethods.length ? shippingMethods.filter((function(method) {
                                                return method.selected;
                                            }))[0] : null;
                                            var result = {
                                                countryCode: countryCode,
                                                currencyCode: currencyCode,
                                                merchantCapabilities: merchantCapabilities,
                                                supportedNetworks: supportedNetworks,
                                                requiredBillingContactFields: [ "postalAddress", "name", "phone" ],
                                                requiredShippingContactFields: [ "postalAddress", "name", "phone", "email" ],
                                                shippingContact: shippingContact && shippingContact.givenName ? shippingContact : {},
                                                shippingMethods: applePayShippingMethods && applePayShippingMethods.length ? applePayShippingMethods : [],
                                                lineItems: [],
                                                total: {
                                                    label: "Total",
                                                    amount: totalValue,
                                                    type: "final"
                                                }
                                            };
                                            subtotalValue && subtotalValue.length && result.lineItems.push({
                                                label: "Subtotal",
                                                amount: subtotalValue
                                            });
                                            taxValue && taxValue.length && result.lineItems.push({
                                                label: "Sales Tax",
                                                amount: taxValue
                                            });
                                            shippingValue && shippingValue.length && result.lineItems.push({
                                                label: "Shipping",
                                                amount: shippingValue
                                            });
                                            selectedShippingMethod && "PICKUP" === selectedShippingMethod.type && (result.requiredShippingContactFields = []);
                                            return result;
                                        }(country, order);
                                        var _order$checkoutSessio = order.checkoutSession.cart.amounts, shippingValue = _order$checkoutSessio.shippingAndHandling.currencyValue, taxValue = _order$checkoutSessio.tax.currencyValue, subtotalValue = _order$checkoutSessio.subtotal.currencyValue;
                                        currentShippingAmount = shippingValue;
                                        currentShippingMethod = applePayRequest.shippingMethods && applePayRequest.shippingMethods.length ? applePayRequest.shippingMethods[0] : null;
                                        currentTaxAmount = taxValue;
                                        currentSubtotalAmount = subtotalValue;
                                        currentTotalAmount = _order$checkoutSessio.total.currencyValue;
                                        return applePay(4, applePayRequest).then((function(response) {
                                            var begin = response.begin, addEventListener = response.addEventListener, completeMerchantValidation = response.completeMerchantValidation, completeShippingContactSelection = response.completeShippingContactSelection, completePaymentMethodSelection = response.completePaymentMethodSelection, completeShippingMethodSelection = response.completeShippingMethodSelection, completePayment = response.completePayment;
                                            promise_ZalgoPromise.all([ addEventListener("validatemerchant", (function(_ref5) {
                                                var validationURL = _ref5.validationURL;
                                                logApplePayEvent("validatemerchant", {
                                                    validationURL: validationURL
                                                });
                                                (function(_ref3) {
                                                    var merchantDomain = _ref3.merchantDomain;
                                                    return callGraphQL({
                                                        name: "GetApplePayMerchantSession",
                                                        query: "\n            query GetApplePayMerchantSession(\n                $url : String!\n                $orderID : String!\n                $clientID : String!\n                $merchantDomain : String!\n            ) {\n                applePayMerchantSession(\n                    url: $url\n                    orderID: $orderID\n                    clientID: $clientID\n                    merchantDomain: $merchantDomain\n                ) {\n                    session\n                }\n            }\n        ",
                                                        variables: {
                                                            url: _ref3.url,
                                                            clientID: _ref3.clientID,
                                                            orderID: _ref3.orderID,
                                                            merchantDomain: -1 !== merchantDomain.indexOf("://") ? merchantDomain.split("://")[1] : merchantDomain
                                                        }
                                                    }).then((function(gqlResult) {
                                                        if (!gqlResult || !gqlResult.applePayMerchantSession) throw new Error("GraphQL GetApplePayMerchantSession returned no applePayMerchantSession object");
                                                        return gqlResult.applePayMerchantSession;
                                                    }));
                                                })({
                                                    url: validationURL,
                                                    clientID: clientID,
                                                    orderID: orderID,
                                                    merchantDomain: merchantDomain
                                                }).then((function(merchantSession) {
                                                    try {
                                                        var session = atob(merchantSession.session);
                                                        completeMerchantValidation(JSON.parse(session));
                                                    } catch (err) {
                                                        handleApplePayError("applepay_merchant_validation_completion_error", err);
                                                    }
                                                })).catch((function(err) {
                                                    handleApplePayError("applepay_merchant_validation_error", err);
                                                }));
                                            })), addEventListener("paymentmethodselected", (function(_ref6) {
                                                logApplePayEvent("paymentmethodselected", _ref6.paymentMethod);
                                                var update = {
                                                    newTotal: {
                                                        label: "Total",
                                                        amount: currentTotalAmount
                                                    },
                                                    newLineItems: []
                                                };
                                                subtotalValue && subtotalValue.length && update.newLineItems.push({
                                                    label: "Subtotal",
                                                    amount: currentSubtotalAmount
                                                });
                                                taxValue && taxValue.length && update.newLineItems.push({
                                                    label: "Sales Tax",
                                                    amount: currentTaxAmount
                                                });
                                                if (shippingValue && shippingValue.length) {
                                                    var _currentShippingMetho6;
                                                    update.newLineItems.push({
                                                        label: (null == (_currentShippingMetho6 = currentShippingMethod) ? void 0 : _currentShippingMetho6.label) || "Shipping",
                                                        amount: currentShippingAmount
                                                    });
                                                }
                                                completePaymentMethodSelection(update);
                                            })), addEventListener("shippingmethodselected", (function(_ref7) {
                                                var shippingMethod = _ref7.shippingMethod;
                                                logApplePayEvent("shippingmethodselected");
                                                onShippingChangeCallback({
                                                    orderID: orderID,
                                                    shippingContact: currentShippingContact,
                                                    shippingMethod: shippingMethod
                                                }).then((function(update) {
                                                    currentShippingMethod = shippingMethod;
                                                    completeShippingMethodSelection(update);
                                                })).catch((function() {
                                                    var update = {
                                                        newTotal: {
                                                            label: "Total",
                                                            amount: currentTotalAmount
                                                        },
                                                        newLineItems: []
                                                    };
                                                    subtotalValue && subtotalValue.length && update.newLineItems.push({
                                                        label: "Subtotal",
                                                        amount: currentSubtotalAmount
                                                    });
                                                    taxValue && taxValue.length && update.newLineItems.push({
                                                        label: "Sales Tax",
                                                        amount: currentTaxAmount
                                                    });
                                                    if (shippingValue && shippingValue.length) {
                                                        var _currentShippingMetho7;
                                                        update.newLineItems.push({
                                                            label: (null == (_currentShippingMetho7 = currentShippingMethod) ? void 0 : _currentShippingMetho7.label) || "Shipping",
                                                            amount: currentShippingAmount
                                                        });
                                                    }
                                                    completeShippingMethodSelection(update);
                                                }));
                                            })), addEventListener("shippingcontactselected", (function(_ref8) {
                                                var shippingContact = _ref8.shippingContact;
                                                logApplePayEvent("shippingcontactselected", shippingContact);
                                                onShippingChangeCallback({
                                                    orderID: orderID,
                                                    shippingContact: shippingContact,
                                                    shippingMethod: currentShippingMethod
                                                }).then((function(update) {
                                                    completeShippingContactSelection(update);
                                                })).catch((function(err) {
                                                    handleApplePayError("shippingContactSelected", err);
                                                }));
                                            })), addEventListener("paymentauthorized", (function(_ref9) {
                                                var applePayPayment = _ref9.payment;
                                                logApplePayEvent("paymentauthorized");
                                                if (!applePayPayment) throw new Error("No payment received from Apple.");
                                                applePayPayment.shippingContact.countryCode = applePayPayment.shippingContact.countryCode.toUpperCase();
                                                applePayPayment.billingContact.countryCode = applePayPayment.billingContact.countryCode.toUpperCase();
                                                (function(orderID, clientID, applePayPayment) {
                                                    return callGraphQL({
                                                        name: "ApproveApplePayPayment",
                                                        query: "\n            mutation ApproveApplePayPayment(\n                $token: ApplePayPaymentToken!\n                $orderID: String!\n                $clientID : String!\n                $billingContact: ApplePayPaymentContact!\n                $shippingContact: ApplePayPaymentContact!\n            ) {\n                approveApplePayPayment(\n                    token: $token\n                    orderID: $orderID\n                    clientID: $clientID\n                    billingContact: $billingContact\n                    shippingContact: $shippingContact\n                )\n            }\n        ",
                                                        variables: {
                                                            token: applePayPayment.token,
                                                            orderID: orderID,
                                                            clientID: clientID,
                                                            billingContact: applePayPayment.billingContact,
                                                            shippingContact: applePayPayment.shippingContact
                                                        }
                                                    }).then((function(gqlResult) {
                                                        if (!gqlResult || !gqlResult.approveApplePayPayment) throw new Error("GraphQL GetApplePayPayment returned no applePayment object");
                                                        return gqlResult.approveApplePayPayment;
                                                    }));
                                                })(orderID, clientID, applePayPayment).then((function(validatedPayment) {
                                                    if (validatedPayment) {
                                                        completePayment({
                                                            status: window.ApplePaySession.STATUS_SUCCESS
                                                        });
                                                        var actions = {
                                                            restart: function() {
                                                                return promise_ZalgoPromise.try(setupApplePaySession);
                                                            }
                                                        };
                                                        return promise_ZalgoPromise.all([ onApprove({}, actions), close() ]).then(src_util_noop);
                                                    }
                                                })).catch((function(err) {
                                                    completePayment({
                                                        status: window.ApplePaySession.STATUS_FAILURE
                                                    });
                                                    handleApplePayError("applepay_payment_error", err);
                                                }));
                                            })), addEventListener("cancel", (function() {
                                                logApplePayEvent("cancel");
                                                onCancel && onCancel();
                                            })) ]).then((function() {
                                                begin();
                                            }));
                                        })).catch((function(err) {
                                            handleApplePayError("applepay_get_details_error", err);
                                        }));
                                    }));
                                })).catch((function(err) {
                                    handleApplePayError("applepay_create_order_error", err);
                                }));
                            }();
                            var currentTotalAmount, currentSubtotalAmount, currentTaxAmount, currentShippingAmount, currentShippingContact, currentShippingMethod, onShippingChangeCallback, orderPromise;
                        })).catch((function(err) {
                            return close().then((function() {
                                var _getLogger$error$trac;
                                logger_getLogger().error("applepay_flow_error", {
                                    err: stringifyError(err)
                                }).track((_getLogger$error$trac = {}, _getLogger$error$trac.transition_name = "applepay_flow_error", 
                                _getLogger$error$trac.ext_error_code = "applepay_error", _getLogger$error$trac.ext_error_desc = stringifyErrorMessage(err), 
                                _getLogger$error$trac)).flush();
                                throw err;
                            }));
                        }));
                    },
                    start: promiseNoop,
                    close: close
                };
            },
            spinner: !0
        };
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
        var checkoutOpen = !1;
        var canRenderTop = !1;
        var checkout = {
            name: "checkout",
            setup: function(_ref) {
                var Checkout = _ref.components.Checkout;
                checkoutOpen = !1;
                var _ref2 = [ utils_getParent(window), getTop(window) ], parent = _ref2[0], top = _ref2[1];
                var tasks = {};
                top && parent && parent !== top && (tasks.canRenderTo = Checkout.canRenderTo(top).then((function(result) {
                    canRenderTop = result;
                })));
                return promise_ZalgoPromise.hash(tasks).then(src_util_noop);
            },
            isEligible: function() {
                return !0;
            },
            isPaymentEligible: function() {
                return !0;
            },
            init: function initCheckout(_ref5) {
                var props = _ref5.props, components = _ref5.components, serviceData = _ref5.serviceData, payment = _ref5.payment, config = _ref5.config;
                if (checkoutOpen) throw new Error("Checkout already rendered");
                var Checkout = components.Checkout;
                var sessionID = props.sessionID, buttonSessionID = props.buttonSessionID, _createOrder = props.createOrder, _onApprove = props.onApprove, _onCancel = props.onCancel, onShippingChange = props.onShippingChange, locale = props.locale, commit = props.commit, onError = props.onError, vault = props.vault, clientAccessToken = props.clientAccessToken, createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription, onClick = props.onClick, amount = props.amount, clientID = props.clientID, connect = props.connect, cmid = props.clientMetadataID, _onAuth = props.onAuth, userIDToken = props.userIDToken, env = props.env, currency = props.currency, enableFunding = props.enableFunding, stickinessID = props.stickinessID, standaloneFundingSource = props.standaloneFundingSource, branded = props.branded;
                var button = payment.button, win = payment.win, fundingSource = payment.fundingSource, card = payment.card, _payment$buyerAccessT = payment.buyerAccessToken, buyerAccessToken = void 0 === _payment$buyerAccessT ? serviceData.buyerAccessToken : _payment$buyerAccessT, venmoPayloadID = payment.venmoPayloadID, buyerIntent = payment.buyerIntent;
                var buyerCountry = serviceData.buyerCountry, sdkMeta = serviceData.sdkMeta, merchantID = serviceData.merchantID;
                var cspNonce = config.cspNonce;
                var context = (_ref4 = {
                    win: win,
                    isClick: payment.isClick
                }).win || _ref4.isClick && supportsPopups() ? "popup" : "iframe";
                var _ref4;
                var connectEligible = function(_ref3) {
                    var fundingSource = _ref3.fundingSource;
                    return !(!_ref3.connect || _ref3.vault || "paypal" !== fundingSource && "credit" !== fundingSource || _ref3.createBillingAgreement || _ref3.createSubscription);
                }({
                    connect: connect,
                    createBillingAgreement: createBillingAgreement,
                    createSubscription: createSubscription,
                    vault: vault,
                    fundingSource: fundingSource
                });
                var approved = !1;
                var doApproveOnClose = !1;
                var forceClosed = !1;
                var instance;
                var close = function() {
                    checkoutOpen = !1;
                    return promise_ZalgoPromise.try((function() {
                        if (instance) {
                            forceClosed = !0;
                            return instance.close();
                        }
                    }));
                };
                var start = memoize((function() {
                    return (instance = Checkout({
                        window: win,
                        sessionID: sessionID,
                        buttonSessionID: buttonSessionID,
                        stickinessID: stickinessID,
                        clientAccessToken: clientAccessToken,
                        venmoPayloadID: venmoPayloadID,
                        createAuthCode: function() {
                            return promise_ZalgoPromise.try((function() {
                                var fundingSkipLogin = FUNDING_SKIP_LOGIN[fundingSource];
                                if (payment.createAccessToken) return payment.createAccessToken();
                                if (buyerAccessToken) return buyerAccessToken;
                                if (clientID && userIDToken && fundingSkipLogin) {
                                    var clientMetadataID = cmid || sessionID;
                                    return loadFraudnet({
                                        env: env,
                                        clientMetadataID: clientMetadataID,
                                        cspNonce: cspNonce
                                    }).catch(src_util_noop).then((function() {
                                        return getSmartWallet({
                                            clientID: clientID,
                                            merchantID: merchantID,
                                            currency: currency,
                                            amount: amount,
                                            clientMetadataID: clientMetadataID,
                                            userIDToken: userIDToken
                                        });
                                    })).then((function(wallet) {
                                        var walletInstruments = wallet[fundingSkipLogin] && wallet[fundingSkipLogin].instruments;
                                        if (walletInstruments) for (var _i2 = 0; _i2 < walletInstruments.length; _i2++) {
                                            var instrument = walletInstruments[_i2];
                                            if (instrument.accessToken) return instrument.accessToken;
                                        }
                                    }));
                                }
                            })).then((function(accessToken) {
                                if (accessToken && ("pay" === buyerIntent || "pay_with_different_funding_shipping" === buyerIntent)) return function(buyerAccessToken) {
                                    return callGraphQL({
                                        name: "ExchangeAuthCode",
                                        query: "\n            query ExchangeAuthCode(\n                $buyerAccessToken: String!\n            ) {\n                auth(\n                    accessToken: $buyerAccessToken\n                ) {\n                    authCode\n                }\n            }\n        ",
                                        variables: {
                                            buyerAccessToken: buyerAccessToken
                                        }
                                    }).then((function(_ref4) {
                                        return _ref4.auth.authCode;
                                    }));
                                }(accessToken);
                            })).catch((function(err) {
                                logger_getLogger().warn("exchange_access_token_auth_code_error", {
                                    err: stringifyError(err)
                                });
                            }));
                        },
                        getConnectURL: connect && connectEligible ? function(_ref6) {
                            var payerID = _ref6.payerID;
                            if (!clientID) throw new Error("Expected clientID");
                            return _createOrder().then((function(orderID) {
                                return function(_ref5) {
                                    return callGraphQL({
                                        name: "GetConnectURL",
                                        query: "\n            query GetConnectURL(\n                $clientID: String!\n                $orderID: String!\n                $scopes: [String]!\n                $fundingSource: String\n                $payerID: String\n            ) {\n                auth(\n                    clientId: $clientID\n                ) {\n                    connectUrl(\n                        token: $orderID\n                        scopes: $scopes\n                        fundingSource: $fundingSource\n                        payerId: $payerID\n                    ) {\n                        href\n                    }\n                }\n            }\n        ",
                                        variables: {
                                            clientID: _ref5.clientID,
                                            orderID: _ref5.orderID,
                                            payerID: _ref5.payerID,
                                            scopes: _ref5.connect.scopes,
                                            fundingSource: _ref5.fundingSource
                                        }
                                    }).then((function(_ref6) {
                                        return _ref6.auth.connectUrl.href;
                                    }));
                                }({
                                    orderID: orderID,
                                    payerID: payerID,
                                    clientID: clientID,
                                    fundingSource: fundingSource,
                                    connect: connect
                                }).then((function(connectURL) {
                                    var _getLogger$info$track;
                                    logger_getLogger().info("connect_redirect", {
                                        connectURL: connectURL
                                    }).track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_connect_redirect", 
                                    _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                                    _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                                    return extendUrl(connectURL, {
                                        query: {
                                            sdkMeta: sdkMeta
                                        }
                                    });
                                })).catch((function(err) {
                                    logger_getLogger().error("connect_redirect_error", {
                                        err: stringifyError(err)
                                    });
                                    throw err;
                                }));
                            }));
                        } : null,
                        createOrder: function() {
                            return _createOrder().then((function(orderID) {
                                return orderID;
                            }));
                        },
                        onApprove: function(_ref7) {
                            var _ref7$approveOnClose = _ref7.approveOnClose, payerID = _ref7.payerID, paymentID = _ref7.paymentID, billingToken = _ref7.billingToken, subscriptionID = _ref7.subscriptionID, authCode = _ref7.authCode;
                            if (void 0 === _ref7$approveOnClose || !_ref7$approveOnClose) {
                                approved = !0;
                                logger_getLogger().info("spb_onapprove_access_token_" + (buyerAccessToken ? "present" : "not_present")).flush();
                                return _onApprove({
                                    payerID: payerID,
                                    paymentID: paymentID,
                                    billingToken: billingToken,
                                    subscriptionID: subscriptionID,
                                    buyerAccessToken: buyerAccessToken,
                                    authCode: authCode
                                }, {
                                    restart: restart
                                }).finally((function() {
                                    return close().then(src_util_noop);
                                })).catch(src_util_noop);
                            }
                            doApproveOnClose = !0;
                        },
                        onAuth: function(_ref8) {
                            return _onAuth({
                                accessToken: _ref8.accessToken || buyerAccessToken
                            }).then((function(token) {
                                buyerAccessToken = token;
                            }));
                        },
                        onCancel: function() {
                            return close().then((function() {
                                return _onCancel();
                            }));
                        },
                        onShippingChange: onShippingChange ? function(data, actions) {
                            return onShippingChange(_extends({
                                buyerAccessToken: buyerAccessToken
                            }, data), actions);
                        } : null,
                        onClose: function() {
                            checkoutOpen = !1;
                            return doApproveOnClose ? _onApprove({
                                forceRestAPI: !0
                            }, {
                                restart: restart
                            }).catch(src_util_noop) : forceClosed || approved ? void 0 : _onCancel();
                        },
                        onError: onError,
                        fundingSource: fundingSource,
                        card: card,
                        buyerCountry: buyerCountry,
                        locale: locale,
                        commit: commit,
                        cspNonce: cspNonce,
                        clientMetadataID: cmid,
                        enableFunding: enableFunding,
                        standaloneFundingSource: standaloneFundingSource,
                        branded: branded
                    })).renderTo((top = getTop(window), canRenderTop && top ? top : utils_getParent() ? utils_getParent() : window), "body", context).catch((function(err) {
                        if (checkoutOpen) throw err;
                    }));
                    var top;
                }));
                var restart = memoize((function() {
                    return close().finally((function() {
                        return initCheckout({
                            props: props,
                            components: components,
                            serviceData: serviceData,
                            config: config,
                            payment: {
                                button: button,
                                fundingSource: fundingSource,
                                card: card,
                                buyerIntent: buyerIntent,
                                isClick: !1
                            }
                        }).start().finally(unresolvedPromise);
                    }));
                }));
                return {
                    click: function() {
                        return promise_ZalgoPromise.try((function() {
                            if (!win && supportsPopups()) try {
                                win = function(_ref) {
                                    var _ref$closeOnUnload = _ref.closeOnUnload;
                                    var win = function(win) {
                                        if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
                                        return win;
                                    }(function(url, options) {
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
                                    width: 500,
                                    height: 590
                                });
                            } catch (err) {
                                logger_getLogger().warn("popup_open_error_iframe_fallback", {
                                    err: stringifyError(err)
                                });
                                if (!(err instanceof dom_PopupOpenError)) throw err;
                                context = "iframe";
                            }
                            if (onClick) return promise_ZalgoPromise.try((function() {
                                return !onClick || onClick({
                                    fundingSource: fundingSource
                                });
                            })).then((function(valid) {
                                win && !valid && win.close();
                            }));
                            start();
                        }));
                    },
                    start: start,
                    close: close
                };
            },
            updateFlowClientConfig: function(_ref9) {
                var orderID = _ref9.orderID, payment = _ref9.payment, userExperienceFlow = _ref9.userExperienceFlow;
                return promise_ZalgoPromise.try((function() {
                    var buyerIntent = payment.buyerIntent;
                    var updateClientConfigPromise = updateButtonClientConfig({
                        fundingSource: payment.fundingSource,
                        orderID: orderID,
                        inline: !1,
                        userExperienceFlow: userExperienceFlow
                    });
                    if ("pay_with_different_funding_shipping" === buyerIntent) return updateClientConfigPromise;
                }));
            }
        };
        var cardFormOpen = !1;
        function highlightCard(card) {
            card && querySelectorAll("[data-card]").forEach((function(el) {
                el.style.opacity = el.getAttribute("data-card") === card ? "1" : "0.1";
            }));
        }
        var card_form_getElements = function() {
            var buttonsContainer = document.querySelector("#buttons-container");
            var cardButtonsContainer = document.querySelector('[data-funding-source="card"]');
            var cardFormContainer = document.querySelector("#card-fields-container");
            if (!buttonsContainer || !cardButtonsContainer || !cardFormContainer) throw new Error("Did not find card fields elements");
            return {
                buttonsContainer: buttonsContainer,
                cardButtonsContainer: cardButtonsContainer,
                cardFormContainer: cardFormContainer
            };
        };
        var resizeListener;
        var cardForm = {
            name: "card_form",
            setup: function() {},
            isEligible: function(_ref) {
                var props = _ref.props;
                return !props.vault && !props.onShippingChange && _ref.serviceData.eligibility.cardForm;
            },
            isPaymentEligible: function(_ref2) {
                var _ref3 = _ref2.payment || {}, fundingSource = _ref3.fundingSource;
                return !(_ref3.win || fundingSource && "card" !== fundingSource);
            },
            init: function(_ref4) {
                var props = _ref4.props, components = _ref4.components, payment = _ref4.payment, serviceData = _ref4.serviceData, config = _ref4.config;
                var createOrder = props.createOrder, _onApprove = props.onApprove, _onCancel = props.onCancel, locale = props.locale, commit = props.commit, onError = props.onError, sessionID = props.sessionID, buttonSessionID = props.buttonSessionID, _onAuth = props.onAuth;
                var CardForm = components.CardForm;
                var fundingSource = payment.fundingSource, card = payment.card;
                var cspNonce = config.cspNonce;
                var buyerCountry = serviceData.buyerCountry;
                if (cardFormOpen) {
                    highlightCard(card);
                    return {
                        start: promiseNoop,
                        close: promiseNoop
                    };
                }
                var restart = memoize((function() {
                    return checkout.init({
                        props: props,
                        components: components,
                        payment: _extends({}, payment, {
                            isClick: !1
                        }),
                        serviceData: serviceData,
                        config: config
                    }).start().finally(unresolvedPromise);
                }));
                var buyerAccessToken;
                var _CardForm = CardForm({
                    createOrder: createOrder,
                    fundingSource: fundingSource,
                    card: card,
                    onApprove: function(_ref6) {
                        var payerID = _ref6.payerID, paymentID = _ref6.paymentID, billingToken = _ref6.billingToken;
                        return close().then((function() {
                            return _onApprove({
                                payerID: payerID,
                                paymentID: paymentID,
                                billingToken: billingToken,
                                buyerAccessToken: buyerAccessToken
                            }, {
                                restart: restart
                            }).catch(src_util_noop);
                        }));
                    },
                    onAuth: function(_ref7) {
                        return _onAuth({
                            accessToken: _ref7.accessToken || buyerAccessToken
                        }).then((function(token) {
                            buyerAccessToken = token;
                        }));
                    },
                    onCancel: function() {
                        return close().then((function() {
                            return _onCancel();
                        }));
                    },
                    onError: onError,
                    onClose: function() {
                        cardFormOpen = !1;
                    },
                    onCardTypeChange: function(_ref5) {
                        highlightCard(_ref5.card);
                    },
                    sessionID: sessionID,
                    buttonSessionID: buttonSessionID,
                    buyerCountry: buyerCountry,
                    locale: locale,
                    commit: commit,
                    cspNonce: cspNonce
                }), render = _CardForm.render, closeCardForm = _CardForm.close;
                var close = function() {
                    !function() {
                        var buttonsContainer = card_form_getElements().buttonsContainer;
                        querySelectorAll("[data-card]").forEach((function(el) {
                            el.style.opacity = "1";
                        }));
                        window.removeEventListener("resize", resizeListener);
                        buttonsContainer.style.removeProperty("transition-duration");
                        buttonsContainer.style.removeProperty("margin-top");
                    }();
                    return closeCardForm().then((function() {
                        cardFormOpen = !1;
                    }));
                };
                return {
                    start: function() {
                        cardFormOpen = !0;
                        var renderPromise = render("#card-fields-container");
                        !function() {
                            var _getElements = card_form_getElements(), buttonsContainer = _getElements.buttonsContainer, cardButtonsContainer = _getElements.cardButtonsContainer, cardFormContainer = _getElements.cardFormContainer;
                            if (!buttonsContainer || !cardButtonsContainer || !cardFormContainer) throw new Error("Required elements not found");
                            cardFormContainer.style.minHeight = "0px";
                            cardFormContainer.style.display = "block";
                            var recalculateMargin = function() {
                                buttonsContainer.style.marginTop = buttonsContainer.offsetTop - cardButtonsContainer.offsetTop + "px";
                            };
                            resizeListener = function(method, time) {
                                void 0 === time && (time = 100);
                                var timeout;
                                return setFunctionName((function() {
                                    var _arguments3 = arguments, _this3 = this;
                                    clearTimeout(timeout);
                                    timeout = setTimeout((function() {
                                        return method.apply(_this3, _arguments3);
                                    }), time);
                                }), getFunctionName(method) + "::debounced");
                            }((function() {
                                buttonsContainer.style.transitionDuration = "0s";
                                recalculateMargin();
                            }));
                            window.addEventListener("resize", resizeListener);
                            recalculateMargin();
                        }();
                        highlightCard(card);
                        return renderPromise;
                    },
                    close: close
                };
            },
            inline: !0
        };
        var sdk_constants = __webpack_require__("./node_modules/@paypal/sdk-constants/index.js");
        var _CARD_FIELD_TYPE_TO_F;
        (_CARD_FIELD_TYPE_TO_F = {}).single = "card-field", _CARD_FIELD_TYPE_TO_F.number = "card-number-field", 
        _CARD_FIELD_TYPE_TO_F.cvv = "card-cvv-field", _CARD_FIELD_TYPE_TO_F.expiry = "card-expiry-field";
        function getExportsByFrameName(name) {
            try {
                for (var _i2 = 0, _getAllFramesInWindow2 = getAllFramesInWindow(window); _i2 < _getAllFramesInWindow2.length; _i2++) {
                    var win = _getAllFramesInWindow2[_i2];
                    if (isSameDomain(win) && win.exports && win.exports.name === name) return win.exports;
                }
            } catch (err) {}
        }
        function hasCardFields() {
            if (getExportsByFrameName("card-field")) return !0;
            var cardNumberFrame = getExportsByFrameName("card-number-field");
            var cardCVVFrame = getExportsByFrameName("card-cvv-field");
            var cardExpiryFrame = getExportsByFrameName("card-expiry-field");
            return !!(cardNumberFrame && cardCVVFrame && cardExpiryFrame);
        }
        function getCardFields() {
            var cardFrame = getExportsByFrameName("card-field");
            if (cardFrame && cardFrame.isFieldValid()) return cardFrame.getFieldValue();
            var cardNumberFrame = getExportsByFrameName("card-number-field");
            var cardCVVFrame = getExportsByFrameName("card-cvv-field");
            var cardExpiryFrame = getExportsByFrameName("card-expiry-field");
            return cardNumberFrame && cardNumberFrame.isFieldValid() && cardCVVFrame && cardCVVFrame.isFieldValid() && cardExpiryFrame && cardExpiryFrame.isFieldValid() ? {
                number: cardNumberFrame.getFieldValue(),
                cvv: cardCVVFrame.getFieldValue(),
                expiry: cardExpiryFrame.getFieldValue()
            } : void 0;
        }
        var cardField = {
            name: "card_field",
            setup: function() {},
            isEligible: function(_ref) {
                var props = _ref.props;
                return !props.vault && !props.onShippingChange;
            },
            isPaymentEligible: function(_ref2) {
                var _ref3 = _ref2.payment || {}, fundingSource = _ref3.fundingSource;
                return !(_ref3.win || fundingSource && "card" !== fundingSource || !hasCardFields());
            },
            init: function(_ref4) {
                var facilitatorAccessToken = _ref4.serviceData.facilitatorAccessToken;
                return {
                    click: function() {
                        if (!getCardFields()) return !1;
                    },
                    start: function() {
                        return _getCardProps = function(_ref) {
                            var _fundingEligibility$c, _fundingEligibility$c2;
                            var facilitatorAccessToken = _ref.facilitatorAccessToken;
                            var xprops = window.xprops;
                            var type = xprops.type, cardSessionID = xprops.cardSessionID, style = xprops.style, fundingEligibility = xprops.fundingEligibility, onChange = xprops.onChange, _xprops$branded = xprops.branded, branded = void 0 === _xprops$branded ? null == (_fundingEligibility$c = null == fundingEligibility || null == (_fundingEligibility$c2 = fundingEligibility.card) ? void 0 : _fundingEligibility$c2.branded) || _fundingEligibility$c : _xprops$branded, parent = xprops.parent, xport = xprops.export;
                            return _extends({}, getProps({
                                facilitatorAccessToken: facilitatorAccessToken,
                                branded: branded
                            }), {
                                type: type,
                                branded: branded,
                                style: style,
                                cardSessionID: cardSessionID,
                                fundingEligibility: fundingEligibility,
                                onChange: onChange,
                                export: parent ? parent.export : xport,
                                facilitatorAccessToken: facilitatorAccessToken
                            });
                        }({
                            facilitatorAccessToken: facilitatorAccessToken
                        }), intent = _getCardProps.intent, branded = _getCardProps.branded, vault = _getCardProps.vault, 
                        createOrder = _getCardProps.createOrder, onApprove = _getCardProps.onApprove, promise_ZalgoPromise.try((function() {
                            if (!hasCardFields()) throw new Error("Card fields not available to submit");
                            var card = getCardFields();
                            if (card) {
                                var restart = function() {
                                    throw new Error("Restart not implemented for card fields flow");
                                };
                                return intent === sdk_constants.INTENT.TOKENIZE ? function(_ref25) {
                                    var card = _ref25.card;
                                    return promise_ZalgoPromise.try((function() {
                                        console.warn("Card Tokenize GQL mutation not yet implemented", {
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
                                    return function(_ref26) {
                                        var card = _ref26.card, orderID = _ref26.orderID, vault = _ref26.vault, branded = _ref26.branded;
                                        return promise_ZalgoPromise.try((function() {
                                            console.warn("Card Approve Payment GQL mutation not yet implemented", {
                                                card: card,
                                                orderID: orderID,
                                                vault: vault,
                                                branded: branded
                                            });
                                        }));
                                    }({
                                        card: card,
                                        orderID: orderID,
                                        vault: vault,
                                        branded: branded
                                    });
                                })).then((function() {
                                    return onApprove({
                                        payerID: uniqueID()
                                    }, {
                                        restart: restart
                                    });
                                })) : void 0;
                            }
                        }));
                        var _getCardProps, intent, branded, vault, createOrder, onApprove;
                    },
                    close: promiseNoop
                };
            },
            inline: !0,
            spinner: !0
        };
        function lib_logger_getLogger() {
            return inlineMemoize(lib_logger_getLogger, (function() {
                return Logger({
                    url: "/xoplatform/logger/api/logger"
                });
            }));
        }
        var POPUP_OPTIONS = {
            width: 500,
            height: 590
        };
        var vaultCapture = {
            name: "vault_capture",
            setup: function() {},
            isEligible: function(_ref) {
                return !_ref.props.onShippingChange;
            },
            isPaymentEligible: function(_ref2) {
                var payment = _ref2.payment;
                return !(payment.win || !payment.paymentMethodID || window.innerWidth < 250 && "paypal" === payment.fundingSource);
            },
            init: function(_ref7) {
                var props = _ref7.props, components = _ref7.components, payment = _ref7.payment, serviceData = _ref7.serviceData, config = _ref7.config;
                var createOrder = props.createOrder, onApprove = props.onApprove, clientAccessToken = props.clientAccessToken, enableThreeDomainSecure = props.enableThreeDomainSecure, partnerAttributionID = props.partnerAttributionID, getParent = props.getParent, userIDToken = props.userIDToken, clientID = props.clientID, env = props.env;
                var ThreeDomainSecure = components.ThreeDomainSecure, Installments = components.Installments;
                var fundingSource = payment.fundingSource, paymentMethodID = payment.paymentMethodID, button = payment.button;
                var facilitatorAccessToken = serviceData.facilitatorAccessToken, buyerCountry = serviceData.buyerCountry;
                var cspNonce = config.cspNonce;
                var clientMetadataID = function(_ref6) {
                    var props = _ref6.props;
                    return props.clientMetadataID || props.sessionID;
                }({
                    props: props
                });
                var accessToken = userIDToken ? facilitatorAccessToken : clientAccessToken;
                if (!paymentMethodID) throw new Error("Payment method id required for vault capture");
                if (!accessToken) throw new Error("Client access token required for vault capture");
                var restart = function() {
                    return promise_ZalgoPromise.try((function() {
                        throw new Error("Vault capture restart not implemented");
                    }));
                };
                var shippingRequired = function(orderID) {
                    return getSupplementalOrderInfo(orderID).then((function(order) {
                        return !!order.checkoutSession.flags.isChangeShippingAddressAllowed;
                    }));
                };
                var startPaymentFlow = function(orderID, installmentPlan) {
                    return promise_ZalgoPromise.hash({
                        validate: validatePaymentMethod({
                            accessToken: accessToken,
                            orderID: orderID,
                            paymentMethodID: paymentMethodID,
                            enableThreeDomainSecure: enableThreeDomainSecure,
                            clientMetadataID: clientMetadataID,
                            partnerAttributionID: partnerAttributionID,
                            installmentPlan: installmentPlan
                        }),
                        requireShipping: shippingRequired(orderID)
                    }).then((function(_ref8) {
                        var validate = _ref8.validate;
                        if (_ref8.requireShipping) {
                            if ("paypal" !== fundingSource) throw new Error("Shipping address requested for " + fundingSource + " payment");
                            return function() {
                                logger_getLogger().info("web_checkout_fallback").flush();
                                return checkout.init({
                                    props: props,
                                    components: components,
                                    serviceData: serviceData,
                                    payment: _extends({}, payment, {
                                        isClick: !1,
                                        buyerIntent: "pay_with_different_funding_shipping"
                                    }),
                                    config: config
                                }).start();
                            }();
                        }
                        return function(_ref5) {
                            var ThreeDomainSecure = _ref5.ThreeDomainSecure, status = _ref5.status, body = _ref5.body, createOrder = _ref5.createOrder, getParent = _ref5.getParent;
                            return promise_ZalgoPromise.try((function() {
                                if (422 === status && body.links && body.links.some((function(link) {
                                    return "3ds-contingency-resolution" === link.rel;
                                }))) return function(_ref4) {
                                    var ThreeDomainSecure = _ref4.ThreeDomainSecure, createOrder = _ref4.createOrder, getParent = _ref4.getParent;
                                    var promise = new promise_ZalgoPromise;
                                    var instance = ThreeDomainSecure({
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
                                    return instance.renderTo(getParent(), "body").then((function() {
                                        return promise;
                                    })).finally(instance.close);
                                }({
                                    ThreeDomainSecure: ThreeDomainSecure,
                                    createOrder: createOrder,
                                    getParent: getParent
                                });
                                if (200 !== status) throw new Error("Validate payment failed with status: " + status);
                            }));
                        }({
                            ThreeDomainSecure: ThreeDomainSecure,
                            status: validate.status,
                            body: validate.body,
                            createOrder: createOrder,
                            getParent: getParent
                        }).then((function() {
                            return onApprove({}, {
                                restart: restart
                            });
                        }));
                    }));
                };
                return {
                    start: function() {
                        return createOrder().then((function(orderID) {
                            return loadFraudnet({
                                env: env,
                                clientMetadataID: clientMetadataID,
                                cspNonce: cspNonce
                            }).catch(src_util_noop).then((function() {
                                var _getLogger$info$track;
                                var installmentsEligible = (fundingEligibility = (_ref3 = {
                                    props: props,
                                    serviceData: serviceData
                                }).serviceData.fundingEligibility, !!(_ref3.props.enableVaultInstallments && fundingEligibility.card && fundingEligibility.card.installments));
                                var _ref3, fundingEligibility;
                                logger_getLogger().info(installmentsEligible ? "vault_merchant_installments_eligible" : "vault_merchant_installments_ineligible").track((_getLogger$info$track = {}, 
                                _getLogger$info$track.transition_name = installmentsEligible ? "installments_eligible" : "installments_ineligible", 
                                _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                                _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                                return clientID && installmentsEligible ? getSupplementalOrderInfo(orderID).then((function(order) {
                                    return function(_ref) {
                                        var clientID = _ref.clientID, Installments = _ref.Installments, button = _ref.button, orderID = _ref.orderID, cartAmount = _ref.cartAmount, _onPay = _ref.onPay, _ref$getLogger = _ref.getLogger, getLogger = void 0 === _ref$getLogger ? lib_logger_getLogger : _ref$getLogger;
                                        return function(_ref) {
                                            var _headers;
                                            return function(_ref) {
                                                var _ref$variables = _ref.variables, _ref$headers = _ref.headers;
                                                return request({
                                                    url: "/graphql?" + _ref.name,
                                                    method: "POST",
                                                    json: {
                                                        query: _ref.query,
                                                        variables: void 0 === _ref$variables ? {} : _ref$variables
                                                    },
                                                    headers: _extends({
                                                        "x-app-name": "smart-payment-buttons"
                                                    }, void 0 === _ref$headers ? {} : _ref$headers)
                                                }).then((function(_ref2) {
                                                    var status = _ref2.status, body = _ref2.body;
                                                    var errors = body.errors || [];
                                                    if (errors.length) {
                                                        var message = errors[0].message || JSON.stringify(errors[0]);
                                                        throw new Error(message);
                                                    }
                                                    if (200 !== status) throw new Error("/graphql returned status " + status);
                                                    return body.data;
                                                }));
                                            }({
                                                name: "getInstallmentsForVaultedToken",
                                                query: "\n            query getInstallmentsForVaultedToken(\n                $vaultedToken: String!\n                $token: String!\n            ) {\n                getInstallmentsForVaultedToken(\n                    vaultedToken: $vaultedToken\n                    token: $token\n                ) {\n                    discount {\n                        amount {\n                            currencyCode\n                            currencyFormatSymbolISOCurrency\n                            currencyValue\n                        }\n                        percentage\n                    }\n                    monthlyPayment {\n                        currencyCode\n                        currencyFormatSymbolISOCurrency\n                        currencyValue\n                    }\n                    totalCost {\n                        currencyCode\n                        currencyFormatSymbolISOCurrency\n                        currencyValue\n                    }\n                    term\n                    intervalDuration\n                }\n            }\n        ",
                                                variables: {
                                                    vaultedToken: _ref.vaultedToken,
                                                    token: _ref.token
                                                },
                                                headers: (_headers = {}, _headers["x-paypal-internal-euat"] = _ref.buyerAccessToken, 
                                                _headers)
                                            });
                                        }({
                                            vaultedToken: _ref.paymentMethodID,
                                            token: orderID,
                                            buyerAccessToken: _ref.accessToken
                                        }).then((function(installmentsResponse) {
                                            if (installmentsResponse && installmentsResponse.getInstallmentsForVaultedToken) {
                                                var _getLogger$info$track;
                                                var installmentsData = installmentsResponse.getInstallmentsForVaultedToken;
                                                getLogger().info("installments_loaded").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "installments_load", 
                                                _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                                                _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                                                if (installmentsData.length > 1 || installmentsData[0] && installmentsData[0].discount) {
                                                    var _getLogger$info$track5;
                                                    var options = installmentsData.map((function(info) {
                                                        return _extends({
                                                            term: info.term,
                                                            intervalDuration: info.intervalDuration
                                                        }, info.discount && {
                                                            percent: info.discount.percentage
                                                        }, {
                                                            amount: info.monthlyPayment.currencyFormatSymbolISOCurrency,
                                                            totalAmount: info.totalCost.currencyFormatSymbolISOCurrency,
                                                            onSelect: function(option) {
                                                                var _getLogger$info$track2;
                                                                getLogger().info("installment_option_selected_" + option.term + "x").track((_getLogger$info$track2 = {}, 
                                                                _getLogger$info$track2.transition_name = "installment_select", _getLogger$info$track2.context_type = "EC-Token", 
                                                                _getLogger$info$track2.token = orderID, _getLogger$info$track2.context_id = orderID, 
                                                                _getLogger$info$track2)).flush();
                                                            }
                                                        });
                                                    }));
                                                    var data = {
                                                        cartAmount: cartAmount,
                                                        onPay: function(selectedInstallment) {
                                                            var _getLogger$info$track3;
                                                            !function(button) {
                                                                button.classList.add("paypal-button-loading");
                                                            }(button);
                                                            getLogger().info("installments_pay_button_clicked_" + (selectedInstallment ? selectedInstallment.term : "") + "x").track((_getLogger$info$track3 = {}, 
                                                            _getLogger$info$track3.transition_name = "installments_pay", _getLogger$info$track3.context_type = "EC-Token", 
                                                            _getLogger$info$track3.token = orderID, _getLogger$info$track3.context_id = orderID, 
                                                            _getLogger$info$track3)).flush();
                                                            var installmentPlan = null;
                                                            selectedInstallment && (installmentPlan = {
                                                                term: selectedInstallment.term,
                                                                interval_duration: selectedInstallment.intervalDuration
                                                            });
                                                            return promise_ZalgoPromise.try((function() {
                                                                return _onPay(orderID, installmentPlan);
                                                            })).finally((function() {
                                                                !function(button) {
                                                                    button.classList.remove("paypal-button-loading");
                                                                }(button);
                                                            }));
                                                        },
                                                        onClose: function() {
                                                            var _getLogger$info$track4;
                                                            getLogger().info("installments_modal_close").track((_getLogger$info$track4 = {}, 
                                                            _getLogger$info$track4.transition_name = "installments_close", _getLogger$info$track4.context_type = "EC-Token", 
                                                            _getLogger$info$track4.token = orderID, _getLogger$info$track4.context_id = orderID, 
                                                            _getLogger$info$track4)).flush();
                                                        },
                                                        options: options,
                                                        orderID: orderID
                                                    };
                                                    getLogger().info("initiate_installments_modal").track((_getLogger$info$track5 = {}, 
                                                    _getLogger$info$track5.transition_name = "installments_load_modal", _getLogger$info$track5.context_type = "EC-Token", 
                                                    _getLogger$info$track5.token = orderID, _getLogger$info$track5.context_id = orderID, 
                                                    _getLogger$info$track5)).flush();
                                                    return function(_ref) {
                                                        var clientID = _ref.clientID, Installments = _ref.Installments, data = _ref.data;
                                                        if (!clientID) throw new Error("Can not render installments without client id");
                                                        var _Installments = Installments({
                                                            clientID: clientID
                                                        }), renderTo = _Installments.renderTo, updateProps = _Installments.updateProps, show = _Installments.show, close = _Installments.close;
                                                        var render = memoize((function() {
                                                            return renderTo(window.xprops.getParent(), "#installments-modal");
                                                        }));
                                                        render();
                                                        return render().then((function() {
                                                            return updateProps({
                                                                clientID: clientID,
                                                                data: data,
                                                                close: close
                                                            });
                                                        })).then((function() {
                                                            return show();
                                                        }));
                                                    }({
                                                        clientID: clientID,
                                                        Installments: Installments,
                                                        data: data
                                                    });
                                                }
                                                return _onPay(orderID);
                                            }
                                            throw new Error("Installments fetch returns null");
                                        })).catch((function(err) {
                                            return promise_ZalgoPromise.try((function() {
                                                var _getLogger$error$trac;
                                                getLogger().error("installment_fetch_error", {
                                                    err: stringifyError(err)
                                                }).track((_getLogger$error$trac = {}, _getLogger$error$trac.transition_name = "installments_error", 
                                                _getLogger$error$trac.context_type = "EC-Token", _getLogger$error$trac.token = orderID, 
                                                _getLogger$error$trac.context_id = orderID, _getLogger$error$trac.err = stringifyError(err), 
                                                _getLogger$error$trac)).flush();
                                                return _onPay(orderID);
                                            }));
                                        }));
                                    }({
                                        clientID: clientID,
                                        Installments: Installments,
                                        paymentMethodID: paymentMethodID,
                                        button: button,
                                        buyerCountry: buyerCountry,
                                        orderID: orderID,
                                        accessToken: accessToken,
                                        cartAmount: order.checkoutSession.cart.amounts.total.currencyFormatSymbolISOCurrency,
                                        onPay: startPaymentFlow,
                                        getLogger: logger_getLogger
                                    });
                                })) : startPaymentFlow(orderID);
                            }));
                        }));
                    },
                    close: function() {
                        return promise_ZalgoPromise.resolve();
                    }
                };
            },
            setupMenu: function(_ref9) {
                var props = _ref9.props, payment = _ref9.payment, serviceData = _ref9.serviceData, components = _ref9.components, config = _ref9.config;
                var clientAccessToken = props.clientAccessToken, createOrder = props.createOrder, enableThreeDomainSecure = props.enableThreeDomainSecure, partnerAttributionID = props.partnerAttributionID, sessionID = props.sessionID, clientMetadataID = props.clientMetadataID, userIDToken = props.userIDToken;
                var fundingSource = payment.fundingSource, paymentMethodID = payment.paymentMethodID, button = payment.button;
                var content = serviceData.content, facilitatorAccessToken = serviceData.facilitatorAccessToken;
                if (!clientAccessToken || !paymentMethodID) throw new Error("Client access token and payment method id required");
                var updateMenuClientConfig = function() {
                    return promise_ZalgoPromise.try((function() {
                        return createOrder();
                    })).then((function(orderID) {
                        return updateButtonClientConfig({
                            fundingSource: fundingSource,
                            orderID: orderID,
                            inline: !1
                        });
                    }));
                };
                var loadCheckout = function(_ref10) {
                    return checkout.init({
                        props: props,
                        components: components,
                        serviceData: serviceData,
                        config: config,
                        payment: _ref10.payment
                    }).start();
                };
                if ("paypal" === fundingSource) return [ {
                    label: content.payWithDifferentMethod,
                    popup: POPUP_OPTIONS,
                    onSelect: function(_ref11) {
                        var _getLogger$info$track2;
                        var win = _ref11.win;
                        logger_getLogger().info("click_choose_funding").track((_getLogger$info$track2 = {}, 
                        _getLogger$info$track2.transition_name = "process_click_pay_with_different_payment_method", 
                        _getLogger$info$track2.optsel = "pay_with_different_payment_method", _getLogger$info$track2)).flush();
                        return promise_ZalgoPromise.try((function() {
                            return updateMenuClientConfig();
                        })).then((function() {
                            return accessToken = userIDToken ? facilitatorAccessToken : clientAccessToken, promise_ZalgoPromise.try((function() {
                                return createOrder();
                            })).then((function(orderID) {
                                return validatePaymentMethod({
                                    accessToken: accessToken,
                                    orderID: orderID,
                                    paymentMethodID: paymentMethodID,
                                    enableThreeDomainSecure: enableThreeDomainSecure,
                                    partnerAttributionID: partnerAttributionID,
                                    clientMetadataID: clientMetadataID || sessionID
                                });
                            }));
                            var accessToken;
                        })).then((function() {
                            return loadCheckout({
                                payment: _extends({}, payment, {
                                    win: win,
                                    buyerIntent: "pay_with_different_funding_shipping"
                                })
                            });
                        }));
                    }
                }, {
                    label: content.payWithDifferentAccount,
                    popup: POPUP_OPTIONS,
                    onSelect: function(_ref12) {
                        var _getLogger$info$track3;
                        var win = _ref12.win;
                        logger_getLogger().info("click_choose_account").track((_getLogger$info$track3 = {}, 
                        _getLogger$info$track3.transition_name = "process_click_pay_with_different_account", 
                        _getLogger$info$track3.optsel = "pay_with_different_account", _getLogger$info$track3)).flush();
                        return promise_ZalgoPromise.try((function() {
                            return updateMenuClientConfig();
                        })).then((function() {
                            return loadCheckout({
                                payment: _extends({}, payment, {
                                    win: win,
                                    buyerIntent: "pay_with_different_account"
                                })
                            });
                        }));
                    }
                } ];
                if ("card" === fundingSource) return [ {
                    label: content.deleteVaultedCard,
                    spinner: !0,
                    onSelect: function() {
                        var _getLogger$info$track4;
                        var element = button.parentElement || button;
                        logger_getLogger().info("click_unlink_account").track((_getLogger$info$track4 = {}, 
                        _getLogger$info$track4.transition_name = "process_click_unlink_account", _getLogger$info$track4.optsel = "unlink_account", 
                        _getLogger$info$track4)).flush();
                        return (_ref16 = {
                            paymentMethodID: paymentMethodID,
                            clientAccessToken: clientAccessToken
                        }, callGraphQL({
                            name: "DeleteVault",
                            query: "\n            mutation DeleteVault(\n                $paymentMethodID : String!\n            ) {\n                deleteVault(\n                    paymentMethodID: $paymentMethodID\n                )\n            }\n        ",
                            variables: {
                                paymentMethodID: _ref16.paymentMethodID
                            },
                            headers: (_headers17 = {}, _headers17["x-paypal-internal-euat"] = _ref16.clientAccessToken, 
                            _headers17)
                        })).then((function() {
                            !function(element) {
                                element && element.parentNode && element.parentNode.removeChild(element);
                            }(element);
                        }));
                        var _ref16, _headers17;
                    }
                } ];
                throw new Error("Can not render menu for " + fundingSource);
            },
            updateFlowClientConfig: function(_ref13) {
                return updateButtonClientConfig({
                    fundingSource: _ref13.payment.fundingSource,
                    orderID: _ref13.orderID,
                    inline: !0
                });
            },
            spinner: !0,
            inline: !0
        };
        var smartWalletPromise;
        var smartWalletErrored = !1;
        function getInstrument(wallet, fundingSource, instrumentID) {
            var walletFunding = wallet[fundingSource];
            if (!walletFunding) throw new Error("Wallet has no " + fundingSource);
            var instrument;
            for (var _i2 = 0, _walletFunding$instru2 = walletFunding.instruments; _i2 < _walletFunding$instru2.length; _i2++) {
                var inst = _walletFunding$instru2[_i2];
                inst.instrumentID === instrumentID && (instrument = inst);
            }
            if (!instrument) throw new Error("Can not find instrument with id " + instrumentID);
            return instrument;
        }
        var wallet_capture_POPUP_OPTIONS = {
            width: 500,
            height: 590
        };
        var walletCapture = {
            name: "wallet_capture",
            setup: function(_ref3) {
                var props = _ref3.props, serviceData = _ref3.serviceData;
                var env = props.env, clientID = props.clientID, currency = props.currency, amount = props.amount, userIDToken = props.userIDToken;
                var cspNonce = _ref3.config.cspNonce;
                var merchantID = serviceData.merchantID, wallet = serviceData.wallet;
                var clientMetadataID = function(_ref2) {
                    var props = _ref2.props;
                    return props.clientMetadataID || props.sessionID;
                }({
                    props: props
                });
                if (!wallet) throw new Error("No wallet found");
                (smartWalletPromise = loadFraudnet({
                    env: env,
                    clientMetadataID: clientMetadataID,
                    cspNonce: cspNonce
                }).catch(src_util_noop).then((function() {
                    return userIDToken ? getSmartWallet({
                        clientID: clientID,
                        merchantID: merchantID,
                        currency: currency,
                        amount: amount,
                        clientMetadataID: clientMetadataID,
                        userIDToken: userIDToken
                    }) : wallet;
                }))).catch((function(err) {
                    logger_getLogger().warn("load_smart_wallet_error", {
                        err: stringifyError(err)
                    });
                    smartWalletErrored = !0;
                }));
            },
            isEligible: function(_ref) {
                return !!_ref.serviceData.wallet && !_ref.props.onShippingChange;
            },
            isPaymentEligible: function(_ref4) {
                var payment = _ref4.payment;
                var wallet = _ref4.serviceData.wallet;
                var fundingSource = payment.fundingSource, instrumentID = payment.instrumentID;
                if (payment.win) return !1;
                if (!wallet) return !1;
                if (!instrumentID) return !1;
                if (!smartWalletPromise) return !1;
                if (smartWalletErrored) return !1;
                try {
                    getInstrument(wallet, fundingSource, instrumentID);
                } catch (err) {
                    return !1;
                }
                return !0;
            },
            init: function(_ref5) {
                var props = _ref5.props, components = _ref5.components, payment = _ref5.payment, serviceData = _ref5.serviceData, config = _ref5.config;
                var createOrder = props.createOrder, onApprove = props.onApprove, clientMetadataID = props.clientMetadataID, vault = props.vault, onAuth = props.onAuth;
                var fundingSource = payment.fundingSource, instrumentID = payment.instrumentID;
                var wallet = serviceData.wallet;
                if (!wallet || !smartWalletPromise) throw new Error("No smart wallet found");
                if (!instrumentID) throw new Error("Instrument id required for wallet capture");
                var instrument = getInstrument(wallet, fundingSource, instrumentID);
                var createAccessToken = function() {
                    if (!smartWalletPromise) throw new Error("No smart wallet found");
                    return smartWalletPromise.then((function(smartWallet) {
                        var accessToken = getInstrument(smartWallet, fundingSource, instrumentID).accessToken;
                        if (!accessToken) throw new Error("Instrument access token not found");
                        return accessToken;
                    }));
                };
                var getWebCheckoutFallback = function() {
                    return checkout.init({
                        props: props,
                        components: components,
                        serviceData: serviceData,
                        payment: _extends({}, payment, {
                            createAccessToken: createAccessToken,
                            isClick: !1,
                            buyerIntent: "pay_with_different_funding_shipping",
                            fundingSource: instrument && "credit" === instrument.type ? "credit" : fundingSource
                        }),
                        config: config
                    });
                };
                var fallbackToWebCheckout = function() {
                    logger_getLogger().info("web_checkout_fallback").flush();
                    return getWebCheckoutFallback().start();
                };
                if (!instrument.oneClick || smartWalletErrored || vault) return getWebCheckoutFallback();
                var restart = function() {
                    return fallbackToWebCheckout();
                };
                var shippingRequired = function(orderID) {
                    return getSupplementalOrderInfo(orderID).then((function(order) {
                        return !!order.checkoutSession.flags.isChangeShippingAddressAllowed;
                    }));
                };
                return {
                    start: function() {
                        return promise_ZalgoPromise.hash({
                            orderID: createOrder(),
                            smartWallet: smartWalletPromise
                        }).then((function(_ref6) {
                            var orderID = _ref6.orderID;
                            var buyerAccessToken = getInstrument(_ref6.smartWallet, fundingSource, instrumentID).accessToken;
                            if (!buyerAccessToken) throw new Error("No access token available for instrument");
                            var instrumentType = instrument.type;
                            if (!instrumentType) throw new Error("Instrument has no type");
                            return promise_ZalgoPromise.hash({
                                requireShipping: shippingRequired(orderID),
                                orderApproval: oneClickApproveOrder({
                                    orderID: orderID,
                                    instrumentType: instrumentType,
                                    buyerAccessToken: buyerAccessToken,
                                    instrumentID: instrumentID,
                                    clientMetadataID: clientMetadataID
                                }),
                                onAuth: onAuth({
                                    accessToken: buyerAccessToken
                                })
                            }).then((function(_ref7) {
                                var orderApproval = _ref7.orderApproval;
                                return _ref7.requireShipping ? fallbackToWebCheckout() : onApprove({
                                    payerID: orderApproval.payerID,
                                    buyerAccessToken: buyerAccessToken
                                }, {
                                    restart: restart
                                }).catch(src_util_noop);
                            }));
                        })).catch((function(err) {
                            logger_getLogger().warn("approve_order_error", {
                                err: stringifyError(err)
                            }).flush();
                            return fallbackToWebCheckout();
                        }));
                    },
                    close: function() {
                        return promise_ZalgoPromise.resolve();
                    }
                };
            },
            setupMenu: function(_ref8) {
                var props = _ref8.props, payment = _ref8.payment, serviceData = _ref8.serviceData, components = _ref8.components, config = _ref8.config;
                var createOrder = props.createOrder;
                var fundingSource = payment.fundingSource, instrumentID = payment.instrumentID;
                var wallet = serviceData.wallet, content = serviceData.content;
                if (!wallet) throw new Error("Can not render wallet menu without wallet");
                if (!instrumentID) throw new Error("Can not render wallet menu without instrumentID");
                var instrument = getInstrument(wallet, fundingSource, instrumentID);
                if (!instrument) throw new Error("Can not render wallet menu without instrument");
                var loadCheckout = function(_ref9) {
                    return checkout.init({
                        props: props,
                        components: components,
                        serviceData: serviceData,
                        config: config,
                        payment: _ref9.payment
                    }).start();
                };
                var newFundingSource = "credit" === instrument.type ? "credit" : fundingSource;
                if ("paypal" === fundingSource || "credit" === fundingSource) return [ {
                    label: content.payWithDifferentMethod,
                    popup: wallet_capture_POPUP_OPTIONS,
                    onSelect: function(_ref10) {
                        var _getLogger$info$track;
                        var win = _ref10.win;
                        logger_getLogger().info("click_choose_funding").track((_getLogger$info$track = {}, 
                        _getLogger$info$track.transition_name = "process_click_pay_with_different_payment_method", 
                        _getLogger$info$track.optsel = "pay_with_different_payment_method", _getLogger$info$track)).flush();
                        return promise_ZalgoPromise.try((function() {
                            return promise_ZalgoPromise.try((function() {
                                return createOrder();
                            })).then((function(orderID) {
                                return updateButtonClientConfig({
                                    fundingSource: fundingSource,
                                    orderID: orderID,
                                    inline: !1
                                });
                            }));
                        })).then((function() {
                            return loadCheckout({
                                payment: _extends({}, payment, {
                                    win: win,
                                    buyerIntent: "pay_with_different_funding_shipping",
                                    fundingSource: newFundingSource,
                                    createAccessToken: function() {
                                        return smartWalletPromise.then((function(smartWallet) {
                                            var smartInstrument = getInstrument(smartWallet, fundingSource, instrumentID);
                                            if (!smartInstrument) throw new Error("Instrument not found");
                                            if (!smartInstrument.accessToken) throw new Error("Instrument access token not found");
                                            return smartInstrument.accessToken;
                                        }));
                                    }
                                })
                            });
                        }));
                    }
                }, {
                    label: content.payWithDifferentAccount,
                    popup: wallet_capture_POPUP_OPTIONS,
                    onSelect: function(_ref11) {
                        var _getLogger$info$track2;
                        var win = _ref11.win;
                        logger_getLogger().info("click_choose_account").track((_getLogger$info$track2 = {}, 
                        _getLogger$info$track2.transition_name = "process_click_pay_with_different_account", 
                        _getLogger$info$track2.optsel = "pay_with_different_account", _getLogger$info$track2)).flush();
                        return loadCheckout({
                            payment: _extends({}, payment, {
                                win: win,
                                buyerIntent: "pay_with_different_account",
                                fundingSource: newFundingSource
                            })
                        });
                    }
                } ];
                throw new Error("Can not render menu for " + fundingSource);
            },
            updateFlowClientConfig: function(_ref12) {
                return updateButtonClientConfig({
                    fundingSource: _ref12.payment.fundingSource,
                    orderID: _ref12.orderID,
                    inline: !0
                });
            },
            spinner: !0,
            inline: !0
        };
        var _NATIVE_DOMAIN, _HISTORY_NATIVE_POPUP, _MOBILE_NATIVE_POPUP_, _NATIVE_CHECKOUT_URI, _NATIVE_CHECKOUT_POPU, _NATIVE_CHECKOUT_FALL;
        var SUPPORTED_FUNDING = [ "paypal", "venmo" ];
        var NATIVE_DOMAIN = ((_NATIVE_DOMAIN = {}).test = "https://www.paypal.com", _NATIVE_DOMAIN.local = "https://www.paypal.com", 
        _NATIVE_DOMAIN.stage = "https://www.paypal.com", _NATIVE_DOMAIN.sandbox = "https://www.sandbox.paypal.com", 
        _NATIVE_DOMAIN.production = "https://www.paypal.com", _NATIVE_DOMAIN);
        var HISTORY_NATIVE_POPUP_DOMAIN = ((_HISTORY_NATIVE_POPUP = {}).test = "https://history.paypal.com", 
        _HISTORY_NATIVE_POPUP.local = getDomain(), _HISTORY_NATIVE_POPUP.stage = "https://history.paypal.com", 
        _HISTORY_NATIVE_POPUP.sandbox = "https://history.paypal.com", _HISTORY_NATIVE_POPUP.production = "https://history.paypal.com", 
        _HISTORY_NATIVE_POPUP);
        var MOBILE_NATIVE_POPUP_DOMAIN = ((_MOBILE_NATIVE_POPUP_ = {}).test = "https://mobile.paypal.com", 
        _MOBILE_NATIVE_POPUP_.local = getDomain(), _MOBILE_NATIVE_POPUP_.stage = "https://mobile.paypal.com", 
        _MOBILE_NATIVE_POPUP_.sandbox = "https://mobile.paypal.com", _MOBILE_NATIVE_POPUP_.production = "https://mobile.paypal.com", 
        _MOBILE_NATIVE_POPUP_);
        var NATIVE_CHECKOUT_URI = ((_NATIVE_CHECKOUT_URI = {}).paypal = "/smart/checkout/native", 
        _NATIVE_CHECKOUT_URI.venmo = "/smart/checkout/venmo", _NATIVE_CHECKOUT_URI);
        var NATIVE_CHECKOUT_POPUP_URI = ((_NATIVE_CHECKOUT_POPU = {}).paypal = "/smart/checkout/native/popup", 
        _NATIVE_CHECKOUT_POPU.venmo = "/smart/checkout/venmo/popup", _NATIVE_CHECKOUT_POPU);
        var NATIVE_CHECKOUT_FALLBACK_URI = ((_NATIVE_CHECKOUT_FALL = {}).paypal = "/smart/checkout/fallback", 
        _NATIVE_CHECKOUT_FALL.venmo = "/smart/checkout/fallback", _NATIVE_CHECKOUT_FALL);
        function isTestGroup(nativeEligibility, fundingSource) {
            var fundingEligibility = nativeEligibility[fundingSource];
            return !(!fundingEligibility || !fundingEligibility.eligibility);
        }
        function isControlGroup(nativeEligibility, fundingSource) {
            var fundingEligibility = nativeEligibility[fundingSource];
            return !(!fundingEligibility || fundingEligibility.eligibility || "experimentation_ineligibility" !== fundingEligibility.ineligibilityReason);
        }
        function isNativeOptedIn(_ref2) {
            if (_ref2.props.enableNativeCheckout) return !0;
            try {
                if (window.localStorage.getItem("__native_checkout__")) return !0;
            } catch (err) {}
            return !1;
        }
        var nativeEligibilityResults;
        function canUsePopupAppSwitch(_ref4) {
            var fundingSource = _ref4.fundingSource;
            return !(!isIOSSafari() && !isAndroidChrome() || fundingSource && "paypal" !== fundingSource && "venmo" !== fundingSource);
        }
        function canUseNativeQRCode(_ref5) {
            var fundingSource = _ref5.fundingSource;
            return !(isIos() || isAndroid() || fundingSource && "venmo" !== fundingSource);
        }
        function getNativeDomain(_ref) {
            var props = _ref.props;
            var env = props.env;
            return "sandbox" !== env || !isNativeOptedIn({
                props: props
            }) || window.xprops && window.xprops.useCorrectNativeSandboxDomain ? NATIVE_DOMAIN[env] : "https://www.paypal.com";
        }
        function getNativePopupDomain(_ref2) {
            var props = _ref2.props;
            var env = props.env;
            return "sandbox" !== env || !isNativeOptedIn({
                props: props
            }) || window.xprops && window.xprops.useCorrectNativeSandboxDomain ? ((name = "enable_mobile_native_popup_domain", 
            _ref = {
                sample: 0
            }, sample = _ref.sample, _ref$sticky = _ref.sticky, sticky = void 0 === _ref$sticky || _ref$sticky, 
            logger = logger_getLogger(), function(_ref) {
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
            }({
                name: name,
                sample: sample,
                logTreatment: function(_ref2) {
                    var _extends2;
                    var treatment = _ref2.treatment, payload = _ref2.payload;
                    var fullPayload = _extends(((_extends2 = {}).state_name = "PXP_CHECK", _extends2.transition_name = "process_pxp_check", 
                    _extends2.pxp_exp_id = name, _extends2.pxp_trtmnt_id = treatment, _extends2), payload);
                    logger.track(fullPayload);
                    logger.flush();
                },
                logCheckpoint: function(_ref3) {
                    logger.info(_ref3.treatment + "_" + _ref3.checkpoint, _extends({}, _ref3.payload, {
                        throttle: _ref3.throttle.toString()
                    }));
                    logger.flush();
                },
                sticky: sticky
            })).isEnabled() ? MOBILE_NATIVE_POPUP_DOMAIN : HISTORY_NATIVE_POPUP_DOMAIN)[env] : "https://www.sandbox.paypal.com";
            var name, _ref, sample, _ref$sticky, sticky, logger;
        }
        function getNativeUrlQueryParams(_ref4) {
            var props = _ref4.props, serviceData = _ref4.serviceData, config = _ref4.config, fundingSource = _ref4.fundingSource, sessionUID = _ref4.sessionUID, pageUrl = _ref4.pageUrl, orderID = _ref4.orderID, stickinessID = _ref4.stickinessID;
            var env = props.env, clientID = props.clientID, commit = props.commit, buttonSessionID = props.buttonSessionID, stageHost = props.stageHost, apiStageHost = props.apiStageHost, enableFunding = props.enableFunding, merchantDomain = props.merchantDomain;
            var facilitatorAccessToken = serviceData.facilitatorAccessToken, sdkMeta = serviceData.sdkMeta, buyerCountry = serviceData.buyerCountry;
            var sdkVersion = config.sdkVersion, firebase = config.firebase;
            var webCheckoutUrl = function(_ref3) {
                var orderID = _ref3.orderID, props = _ref3.props, fundingSource = _ref3.fundingSource, facilitatorAccessToken = _ref3.facilitatorAccessToken;
                var commit = props.commit;
                return extendUrl(getNativeDomain({
                    props: props
                }) + "/checkoutnow", {
                    query: {
                        fundingSource: fundingSource,
                        facilitatorAccessToken: facilitatorAccessToken,
                        token: orderID,
                        useraction: commit ? "commit" : "continue",
                        native_xo: "1"
                    }
                });
            }({
                orderID: orderID,
                props: props,
                fundingSource: fundingSource,
                facilitatorAccessToken: facilitatorAccessToken
            });
            var forceEligible = isNativeOptedIn({
                props: props
            });
            var channel = isDevice() ? "mobile-web" : "desktop-web";
            if (!firebase) throw new Error("Can not find firebase config");
            var queryParams = {
                channel: channel,
                sdkMeta: sdkMeta,
                sessionUID: sessionUID,
                orderID: orderID,
                facilitatorAccessToken: facilitatorAccessToken,
                pageUrl: pageUrl,
                clientID: clientID,
                commit: String(commit),
                webCheckoutUrl: isIOSSafari() ? webCheckoutUrl : "",
                stickinessID: stickinessID,
                buttonSessionID: buttonSessionID,
                env: env,
                stageHost: stageHost || "",
                apiStageHost: apiStageHost || "",
                forceEligible: forceEligible,
                fundingSource: fundingSource,
                enableFunding: enableFunding.join(","),
                domain: merchantDomain,
                rtdbInstanceID: firebase.databaseURL,
                buyerCountry: buyerCountry,
                sdkVersion: sdkVersion
            };
            "desktop-web" === queryParams.channel && delete queryParams.sdkMeta;
            return queryParams;
        }
        function getNativeUrl(_ref5) {
            var props = _ref5.props, fundingSource = _ref5.fundingSource;
            var queryParams = getNativeUrlQueryParams({
                props: props,
                serviceData: _ref5.serviceData,
                config: _ref5.config,
                fundingSource: fundingSource,
                sessionUID: _ref5.sessionUID,
                pageUrl: _ref5.pageUrl,
                orderID: _ref5.orderID,
                stickinessID: _ref5.stickinessID
            });
            return extendUrl("" + getNativeDomain({
                props: props
            }) + NATIVE_CHECKOUT_URI[fundingSource], {
                query: queryParams
            });
        }
        function getNativeFallbackUrl(_ref6) {
            var props = _ref6.props, fundingSource = _ref6.fundingSource;
            var queryParams = getNativeUrlQueryParams({
                props: props,
                serviceData: _ref6.serviceData,
                config: _ref6.config,
                fundingSource: fundingSource,
                sessionUID: _ref6.sessionUID,
                pageUrl: _ref6.pageUrl,
                orderID: _ref6.orderID,
                stickinessID: _ref6.stickinessID
            });
            return extendUrl("" + getNativeDomain({
                props: props
            }) + NATIVE_CHECKOUT_FALLBACK_URI[fundingSource], {
                query: queryParams
            });
        }
        var getNativeSocket = memoize((function(_ref) {
            var nativeSocket = (config = (_ref9 = {
                sessionUID: _ref.sessionUID,
                sourceApp: "paypal_smart_payment_buttons",
                sourceAppVersion: _ref.version,
                targetApp: "paypal_native_checkout",
                config: _ref.firebaseConfig
            }).config, function(_ref) {
                var sessionUID = _ref.sessionUID, driver = _ref.driver, sourceApp = _ref.sourceApp, sourceAppVersion = _ref.sourceAppVersion, targetApp = _ref.targetApp, _ref$retry = _ref.retry, retry = void 0 === _ref$retry || _ref$retry;
                var receivedMessages = {};
                var responseListeners = {};
                var activeRequests = [];
                var requestListeners = {};
                var errorListeners = [];
                var triggerError = function(err) {
                    for (var _i2 = 0, _errorListeners2 = errorListeners; _i2 < _errorListeners2.length; _i2++) (0, 
                    _errorListeners2[_i2])(err);
                };
                var sendMessage = function(socket, data) {
                    var messageUID = uniqueID();
                    receivedMessages[messageUID] = !0;
                    var message = _extends({
                        session_uid: sessionUID,
                        message_uid: messageUID,
                        source_app: sourceApp,
                        source_app_version: sourceAppVersion,
                        target_app: targetApp
                    }, data);
                    socket.send(JSON.stringify(message));
                };
                var sendResponse = function(socket, _ref2) {
                    var messageName = _ref2.messageName, responseStatus = _ref2.responseStatus, responseData = _ref2.responseData, requestUID = _ref2.requestUID;
                    if (socket.isOpen()) return sendMessage(socket, {
                        request_uid: requestUID,
                        message_name: messageName,
                        message_status: responseStatus,
                        message_type: "response",
                        message_data: responseData
                    });
                };
                var closed = !1;
                var retryDelay;
                var socketPromise;
                var retryPromise;
                var init = function init() {
                    (socketPromise = promise_ZalgoPromise.try((function() {
                        if (retryDelay) return retryPromise = promise_ZalgoPromise.delay(retryDelay);
                    })).then((function() {
                        retryPromise = null;
                        var instance = driver();
                        var connectionPromise = new promise_ZalgoPromise((function(resolve, reject) {
                            instance.onOpen((function() {
                                closed = !1;
                                retryDelay = 0;
                                resolve(instance);
                            }));
                            instance.onClose((function(err) {
                                closed = !0;
                                reject(err || new Error("socket closed"));
                                if (retry) {
                                    retry && (retryDelay = retryDelay ? 2 * retryDelay : 1);
                                    init();
                                }
                            }));
                            instance.onError((function(err) {
                                reject(err);
                                triggerError(err);
                            }));
                        }));
                        instance.onMessage((function(rawMessage) {
                            connectionPromise.then((function(socket) {
                                return function(socket, rawData) {
                                    var parsedData;
                                    try {
                                        parsedData = JSON.parse(rawData);
                                    } catch (err) {
                                        throw new Error("Could not parse socket message: " + rawData);
                                    }
                                    if (!parsedData) throw new Error("No data passed from socket message");
                                    var messageSessionUID = parsedData.session_uid, requestUID = parsedData.request_uid, messageUID = parsedData.message_uid, messageName = parsedData.message_name, messageType = parsedData.message_type, messageData = parsedData.message_data, responseStatus = parsedData.message_status;
                                    requestUID = requestUID || parsedData.request_id;
                                    if (!messageUID || !receivedMessages[messageUID]) {
                                        if (!(messageUID && requestUID && messageName && messageType && parsedData.target_app)) throw new Error("Incomplete message: " + rawData);
                                        receivedMessages[messageUID] = !0;
                                        if ("request" === messageType) return function(socket, _ref3) {
                                            var messageSessionUID = _ref3.messageSessionUID, requestUID = _ref3.requestUID, messageName = _ref3.messageName, messageData = _ref3.messageData;
                                            var activeRequest = new promise_ZalgoPromise;
                                            activeRequests.push(activeRequest);
                                            return promise_ZalgoPromise.try((function() {
                                                var requestListener = requestListeners[messageName];
                                                if (!requestListener) throw new Error("No listener found for name: " + messageName);
                                                var handler = requestListener.handler;
                                                if (requestListener.requireSessionUID && messageSessionUID !== sessionUID) throw new Error("Incorrect sessionUID: " + (messageSessionUID || "undefined"));
                                                return handler({
                                                    data: messageData
                                                });
                                            })).then((function(res) {
                                                sendResponse(socket, {
                                                    responseStatus: "success",
                                                    responseData: res,
                                                    messageName: messageName,
                                                    requestUID: requestUID
                                                });
                                            }), (function(err) {
                                                sendResponse(socket, {
                                                    responseStatus: "error",
                                                    responseData: {
                                                        message: err && err.message ? err.message : "Unknown error"
                                                    },
                                                    messageName: messageName,
                                                    messageSessionUID: messageSessionUID,
                                                    requestUID: requestUID
                                                });
                                            })).finally((function() {
                                                activeRequest.resolve();
                                                activeRequests.splice(activeRequests.indexOf(activeRequest), 1);
                                            }));
                                        }(socket, {
                                            messageSessionUID: messageSessionUID,
                                            requestUID: requestUID,
                                            messageName: messageName,
                                            messageData: messageData
                                        });
                                        if ("response" === messageType) return function(_ref4) {
                                            var requestUID = _ref4.requestUID, messageSessionUID = _ref4.messageSessionUID, responseStatus = _ref4.responseStatus, messageData = _ref4.messageData;
                                            var _ref5 = responseListeners[requestUID] || {}, listenerPromise = _ref5.listenerPromise, requireSessionUID = _ref5.requireSessionUID;
                                            if (!listenerPromise) return triggerError(new Error("Could not find response listener for " + _ref4.messageName + " with id: " + requestUID));
                                            if (requireSessionUID && messageSessionUID !== sessionUID) return triggerError(new Error("Incorrect sessionUID: " + (messageSessionUID || "undefined")));
                                            delete responseListeners[requestUID];
                                            "success" === responseStatus ? listenerPromise.resolve({
                                                data: messageData
                                            }) : listenerPromise.reject("error" === responseStatus ? new Error(messageData.message) : new Error("Can not handle response status: " + (status || "undefined")));
                                        }({
                                            messageName: messageName,
                                            requestUID: requestUID,
                                            messageSessionUID: messageSessionUID,
                                            responseStatus: responseStatus,
                                            messageData: messageData
                                        });
                                        throw new Error("Unhandleable message type: " + messageType);
                                    }
                                }(socket, rawMessage);
                            }));
                        }));
                        return connectionPromise;
                    }))).catch(src_util_noop);
                };
                init();
                return {
                    on: function(name, handler, _temp) {
                        var _ref6$requireSessionU = (void 0 === _temp ? {} : _temp).requireSessionUID, requireSessionUID = void 0 === _ref6$requireSessionU || _ref6$requireSessionU;
                        if (requestListeners[name]) throw new Error("Listener already registered for name: " + name);
                        requestListeners[name] = {
                            handler: handler,
                            requireSessionUID: requireSessionUID
                        };
                        return {
                            cancel: function() {
                                delete requestListeners[name];
                            }
                        };
                    },
                    send: function(messageName, messageData, _temp2) {
                        var _ref7 = void 0 === _temp2 ? {} : _temp2, _ref7$requireSessionU = _ref7.requireSessionUID, requireSessionUID = void 0 === _ref7$requireSessionU || _ref7$requireSessionU, _ref7$timeout = _ref7.timeout, timeout = void 0 === _ref7$timeout ? 0 : _ref7$timeout;
                        return socketPromise.then((function(socket) {
                            var requestUID = uniqueID();
                            var listenerPromise = new promise_ZalgoPromise;
                            responseListeners[requestUID] = {
                                listenerPromise: listenerPromise,
                                requireSessionUID: requireSessionUID
                            };
                            sendMessage(socket, {
                                request_uid: requestUID,
                                message_name: messageName,
                                message_type: "request",
                                message_data: messageData
                            });
                            timeout && setTimeout((function() {
                                listenerPromise.reject(new Error("Timeoued out waiting for " + messageName + " response after " + timeout + "ms"));
                            }), timeout);
                            return listenerPromise;
                        }));
                    },
                    onError: function(handler) {
                        errorListeners.push(handler);
                    },
                    reconnect: function() {
                        return promise_ZalgoPromise.try((function() {
                            if (!closed) return socketPromise;
                            if (retryPromise) {
                                retryPromise.resolve();
                                return socketPromise;
                            }
                            retryDelay = 0;
                            return init();
                        })).then(src_util_noop);
                    },
                    close: function() {
                        retry = !1;
                        requestListeners = {};
                        errorListeners = [];
                        for (var _i4 = 0, _Object$keys2 = Object.keys(responseListeners); _i4 < _Object$keys2.length; _i4++) responseListeners[_Object$keys2[_i4]].listenerPromise.asyncReject(new Error("Socket closed"));
                        promise_ZalgoPromise.all(activeRequests).then((function() {
                            return socketPromise.then((function(socket) {
                                return socket.close();
                            }), src_util_noop);
                        }));
                    }
                };
            }({
                sessionUID: sessionUID = _ref9.sessionUID,
                driver: function() {
                    var open = !1;
                    var onMessageHandlers = [];
                    var onErrorHandlers = [];
                    var onCloseHandlers = [];
                    var onOpenHandlers = [];
                    var error = function(err) {
                        for (var _i6 = 0; _i6 < onErrorHandlers.length; _i6++) (0, onErrorHandlers[_i6])(err);
                    };
                    var databasePromise = promise_ZalgoPromise.hash({
                        firebase: loadFirebaseSDK(config),
                        sessionToken: getFirebaseSessionToken(sessionUID)
                    }).then((function(_ref10) {
                        var firebase = _ref10.firebase, sessionToken = _ref10.sessionToken;
                        var valueCallback = function(res) {
                            var messages = res.val() || {};
                            for (var _i8 = 0, _Object$keys4 = Object.keys(messages); _i8 < _Object$keys4.length; _i8++) {
                                var message = messages[_Object$keys4[_i8]];
                                for (var _i10 = 0; _i10 < onMessageHandlers.length; _i10++) (0, onMessageHandlers[_i10])(message);
                            }
                        };
                        return firebase.auth().signInWithCustomToken(sessionToken).then((function() {
                            var _getLogger$info$track;
                            var database = firebase.database();
                            firebase.database.INTERNAL.forceWebSockets();
                            open = !0;
                            logger_getLogger().info("firebase_connection_opened").track((_getLogger$info$track = {}, 
                            _getLogger$info$track.state_name = "smart_button", _getLogger$info$track.transition_name = "firebase_connection_opened", 
                            _getLogger$info$track)).flush();
                            for (var _i12 = 0; _i12 < onOpenHandlers.length; _i12++) (0, onOpenHandlers[_i12])();
                            database.ref("users/" + sessionUID + "/messages").on("value", valueCallback, (function(err) {
                                error(err);
                            }));
                            database.goOnline();
                            return database;
                        }));
                    }));
                    databasePromise.catch((function(err) {
                        var _getLogger$warn$track;
                        logger_getLogger().warn("firebase_connection_errored", {
                            err: stringifyError(err)
                        }).track((_getLogger$warn$track = {}, _getLogger$warn$track.state_name = "smart_button", 
                        _getLogger$warn$track.transition_name = "firebase_connection_errored", _getLogger$warn$track.int_error_desc = stringifyError(err), 
                        _getLogger$warn$track)).flush();
                    }));
                    return {
                        send: function(data) {
                            databasePromise.then((function(database) {
                                return database.ref("users/" + sessionUID + "/messages/" + uniqueID()).set(data);
                            })).catch(error);
                        },
                        close: function() {
                            databasePromise.then((function(database) {
                                database.goOffline();
                            }));
                        },
                        onMessage: function(handler) {
                            onMessageHandlers.push(handler);
                        },
                        onError: function(handler) {
                            onErrorHandlers.push(handler);
                        },
                        onOpen: function(handler) {
                            open ? handler() : onOpenHandlers.push(handler);
                        },
                        onClose: function(handler) {
                            onCloseHandlers.push(handler);
                        },
                        isOpen: function() {
                            return open;
                        }
                    };
                },
                sourceApp: _ref9.sourceApp,
                sourceAppVersion: _ref9.sourceAppVersion,
                targetApp: _ref9.targetApp
            }));
            var _ref9, sessionUID, config;
            nativeSocket.onError((function(err) {
                var stringifiedError = stringifyError(err);
                if (stringifiedError && -1 === stringifiedError.toLowerCase().indexOf("permission_denied")) {
                    var _getLogger$error$trac;
                    logger_getLogger().error("native_socket_error", {
                        err: stringifiedError
                    }).track((_getLogger$error$trac = {}, _getLogger$error$trac.state_name = "smart_button", 
                    _getLogger$error$trac.transition_name = "native_app_switch_ack", _getLogger$error$trac.int_error_desc = "[Native Socket Error] " + stringifiedError, 
                    _getLogger$error$trac)).flush();
                }
            }));
            return nativeSocket;
        }));
        function connectNative(_ref2) {
            var config = _ref2.config, sessionUID = _ref2.sessionUID, callbacks = _ref2.callbacks;
            var onInit = callbacks.onInit, onApprove = callbacks.onApprove, onCancel = callbacks.onCancel, onShippingChange = callbacks.onShippingChange, onError = callbacks.onError, onFallback = callbacks.onFallback;
            var firebaseConfig = config.firebase, sdkVersion = config.sdkVersion;
            if (!firebaseConfig) throw new Error("Firebase config not found");
            var socket = getNativeSocket({
                sessionUID: sessionUID,
                firebaseConfig: firebaseConfig,
                version: sdkVersion
            });
            var onInitListener = socket.on("onInit", onInit);
            var onShippingChangeListener = socket.on("onShippingChange", onShippingChange);
            var onApproveListener = socket.on("onApprove", onApprove);
            var onCancelListener = socket.on("onCancel", onCancel);
            var onErrorListener = socket.on("onError", onError);
            var onFallbackListener = socket.on("onFallback", onFallback);
            return {
                cancel: function() {
                    return promise_ZalgoPromise.all([ onInitListener.cancel(), onShippingChangeListener.cancel(), onApproveListener.cancel(), onCancelListener.cancel(), onErrorListener.cancel(), onFallbackListener.cancel() ]).then(src_util_noop);
                }
            };
        }
        function getEligibility(_ref) {
            var fundingSource = _ref.fundingSource, props = _ref.props, serviceData = _ref.serviceData, validatePromise = _ref.validatePromise;
            var createOrder = props.createOrder, vault = props.vault, clientID = props.clientID, currency = props.currency, buttonSessionID = props.buttonSessionID, enableFunding = props.enableFunding, merchantDomain = props.merchantDomain;
            var buyerCountry = serviceData.buyerCountry, cookies = serviceData.cookies, merchantID = serviceData.merchantID;
            var shippingCallbackEnabled = Boolean(props.onShippingChange);
            return validatePromise.then((function(valid) {
                return !!valid && (!!isNativeOptedIn({
                    props: props
                }) || createOrder().then((function(orderID) {
                    return getNativeEligibility({
                        vault: vault,
                        platform: "mobile",
                        shippingCallbackEnabled: shippingCallbackEnabled,
                        clientID: clientID,
                        buyerCountry: buyerCountry,
                        currency: currency,
                        buttonSessionID: buttonSessionID,
                        cookies: cookies,
                        orderID: orderID,
                        enableFunding: enableFunding,
                        merchantID: merchantID[0],
                        domain: merchantDomain,
                        skipElmo: !0
                    }).then((function(eligibility) {
                        var _eligibility$fundingS, _eligibility$fundingS2;
                        var eligibleReasons = [ "isUserAgentEligible", "isBrowserMobileAndroid" ];
                        var ineligibleReasons = eligibility && (null == (_eligibility$fundingS = eligibility[fundingSource]) || null == (_eligibility$fundingS2 = _eligibility$fundingS.ineligibilityReason) ? void 0 : _eligibility$fundingS2.split(","));
                        var eligible = null == ineligibleReasons ? void 0 : ineligibleReasons.every((function(reason) {
                            return !reason || -1 !== (null == eligibleReasons ? void 0 : eligibleReasons.indexOf(reason));
                        }));
                        if (ineligibleReasons && !eligible) {
                            var _getLogger$info$track;
                            logger_getLogger().info("native_appswitch_ineligible", {
                                orderID: orderID
                            }).track((_getLogger$info$track = {}, _getLogger$info$track.state_name = "smart_button", 
                            _getLogger$info$track.transition_name = "app_switch_ineligible", _getLogger$info$track.info_msg = null == ineligibleReasons ? void 0 : ineligibleReasons.join(","), 
                            _getLogger$info$track)).flush();
                            return !1;
                        }
                        return !0;
                    }));
                })));
            }));
        }
        function initNativeQRCode(_ref2) {
            var props = _ref2.props, serviceData = _ref2.serviceData, config = _ref2.config, components = _ref2.components, payment = _ref2.payment, clean = _ref2.clean, callbacks = _ref2.callbacks, sessionUID = _ref2.sessionUID;
            var createOrder = props.createOrder, onClick = props.onClick;
            var QRCode = components.QRCode;
            var fundingSource = payment.fundingSource;
            var onInit = callbacks.onInit, onApprove = callbacks.onApprove, onCancel = callbacks.onCancel, onError = callbacks.onError, onFallback = callbacks.onFallback, onClose = callbacks.onClose, onDestroy = callbacks.onDestroy, onShippingChange = callbacks.onShippingChange;
            var qrCodeRenderTarget = window.xprops.getParent();
            var pageUrl = window.xprops.getPageUrl();
            var stickinessID = getStorageID();
            return {
                click: src_util_noop,
                start: function() {
                    var _getLogger$info$track2, _getLogger$info$track3;
                    logger_getLogger().info("VenmoDesktopPay_qrcode").track((_getLogger$info$track2 = {}, 
                    _getLogger$info$track2.transition_name = "qr_shown", _getLogger$info$track2)).flush();
                    logger_getLogger().info("VenmoDesktopPay_qrcode_prepare_escape").track((_getLogger$info$track3 = {}, 
                    _getLogger$info$track3.transition_name = "qr_prepare_pay", _getLogger$info$track3)).flush();
                    var onQRClose = function(event) {
                        void 0 === event && (event = "closeQRCode");
                        return promise_ZalgoPromise.try((function() {
                            var _getLogger$info$track4;
                            logger_getLogger().info("VenmoDesktopPay_qrcode_closing_" + event).track((_getLogger$info$track4 = {}, 
                            _getLogger$info$track4.state_name = "smart_button", _getLogger$info$track4.transition_name = event ? "qr_closing_" + event : "qr_closing", 
                            _getLogger$info$track4)).flush();
                            onClose();
                        }));
                    };
                    var onEscapePath = function(win, selectedFundingSource) {
                        var _getLogger$info$track5;
                        logger_getLogger().info("VenmoDesktopPay_process_pay_with_" + selectedFundingSource).track((_getLogger$info$track5 = {}, 
                        _getLogger$info$track5.state_name = "smart_button", _getLogger$info$track5.transition_name = "qr_process_pay_with_" + selectedFundingSource, 
                        _getLogger$info$track5)).flush();
                        return promise_ZalgoPromise.try((function() {
                            var paymentInfo = _extends({}, payment, {
                                win: win,
                                fundingSource: selectedFundingSource
                            });
                            return checkout.init({
                                props: props,
                                components: components,
                                payment: paymentInfo,
                                config: config,
                                serviceData: serviceData
                            }).start().then((function() {
                                return promise_ZalgoPromise.resolve();
                            }));
                        }));
                    };
                    var validatePromise = promise_ZalgoPromise.try((function() {
                        return !onClick || onClick({
                            fundingSource: fundingSource
                        });
                    })).then((function(valid) {
                        if (!valid) {
                            var _getLogger$info$track6;
                            logger_getLogger().info("native_onclick_invalid").track((_getLogger$info$track6 = {}, 
                            _getLogger$info$track6.state_name = "smart_button", _getLogger$info$track6.transition_name = "native_onclick_invalid", 
                            _getLogger$info$track6)).flush();
                        }
                        return valid;
                    }));
                    return promise_ZalgoPromise.hash({
                        valid: validatePromise,
                        eligible: getEligibility({
                            fundingSource: fundingSource,
                            props: props,
                            serviceData: serviceData,
                            validatePromise: validatePromise
                        })
                    }).then((function(_ref3) {
                        if (_ref3.valid) return _ref3.eligible ? createOrder().then((function(orderID) {
                            var url = getNativeUrl({
                                props: props,
                                serviceData: serviceData,
                                config: config,
                                fundingSource: fundingSource,
                                sessionUID: sessionUID,
                                orderID: orderID,
                                stickinessID: stickinessID,
                                pageUrl: pageUrl
                            });
                            var qrCodeComponentInstance = QRCode({
                                cspNonce: config.cspNonce,
                                qrPath: url,
                                state: "qr_default",
                                onClose: onQRClose,
                                onEscapePath: onEscapePath
                            });
                            function updateQRCodeComponentState(newState) {
                                return qrCodeComponentInstance.updateProps(_extends({
                                    cspNonce: config.cspNonce,
                                    qrPath: url,
                                    onClose: onQRClose,
                                    onEscapePath: onEscapePath
                                }, newState));
                            }
                            var connection = connectNative({
                                config: config,
                                sessionUID: sessionUID,
                                callbacks: {
                                    onInit: function() {
                                        return updateQRCodeComponentState({
                                            state: "qr_scanned"
                                        }).then((function() {
                                            return onInit();
                                        }));
                                    },
                                    onApprove: function(res) {
                                        return updateQRCodeComponentState({
                                            state: "qr_authorized"
                                        }).then((function() {
                                            return function(event) {
                                                onQRClose("onApprove");
                                                return promise_ZalgoPromise.delay(2e3).then((function() {
                                                    return promise_ZalgoPromise.try((function() {
                                                        qrCodeComponentInstance.close();
                                                        return onDestroy();
                                                    }));
                                                })).then(src_util_noop);
                                            }().then((function() {
                                                return onApprove(res);
                                            }));
                                        }));
                                    },
                                    onCancel: function() {
                                        return updateQRCodeComponentState({
                                            state: "qr_error",
                                            errorText: "The authorization was canceled"
                                        }).then((function() {
                                            return onCancel();
                                        }));
                                    },
                                    onError: function(res) {
                                        return updateQRCodeComponentState({
                                            state: "qr_authorized",
                                            errorText: res.data.message
                                        }).then((function() {
                                            return onError(res);
                                        }));
                                    },
                                    onFallback: function(_ref4) {
                                        var data = _ref4.data;
                                        return updateQRCodeComponentState({
                                            state: "qr_error",
                                            errorText: "The authorization was canceled"
                                        }).then((function() {
                                            return onFallback({
                                                optOut: data
                                            });
                                        }));
                                    },
                                    onShippingChange: onShippingChange
                                }
                            });
                            clean.register(connection.cancel);
                            return qrCodeComponentInstance.renderTo(qrCodeRenderTarget, "body");
                        })) : onFallback().then(src_util_noop);
                    }));
                }
            };
        }
        function onPostMessage(win, domain, event, handler) {
            return paypal.postRobot.once(event, {
                window: win,
                domain: domain
            }, handler);
        }
        function popup_getEligibility(_ref) {
            var fundingSource = _ref.fundingSource, props = _ref.props, serviceData = _ref.serviceData, sfvc = _ref.sfvc, validatePromise = _ref.validatePromise, stickinessID = _ref.stickinessID, appDetect = _ref.appDetect;
            var createOrder = props.createOrder, vault = props.vault, platform = props.platform, clientID = props.clientID, currency = props.currency, buttonSessionID = props.buttonSessionID, enableFunding = props.enableFunding, merchantDomain = props.merchantDomain;
            var buyerCountry = serviceData.buyerCountry, cookies = serviceData.cookies, merchantID = serviceData.merchantID;
            var shippingCallbackEnabled = Boolean(props.onShippingChange);
            return validatePromise.then((function(valid) {
                return !!valid && !(appDetect && !appDetect.installed) && (!!isNativeOptedIn({
                    props: props
                }) || !sfvc && createOrder().then((function(orderID) {
                    return getNativeEligibility({
                        vault: vault,
                        platform: platform,
                        shippingCallbackEnabled: shippingCallbackEnabled,
                        clientID: clientID,
                        buyerCountry: buyerCountry,
                        currency: currency,
                        buttonSessionID: buttonSessionID,
                        cookies: cookies,
                        orderID: orderID,
                        enableFunding: enableFunding,
                        stickinessID: stickinessID,
                        merchantID: merchantID[0],
                        domain: merchantDomain
                    }).then((function(eligibility) {
                        var _eligibility$fundingS;
                        var ineligibilityReason = eligibility && null != (_eligibility$fundingS = eligibility[fundingSource]) && _eligibility$fundingS.ineligibilityReason ? eligibility[fundingSource].ineligibilityReason : "";
                        if (!eligibility || !eligibility[fundingSource] || !eligibility[fundingSource].eligibility) {
                            var _getLogger$info$track2;
                            logger_getLogger().info("native_appswitch_ineligible", {
                                orderID: orderID
                            }).track((_getLogger$info$track2 = {}, _getLogger$info$track2.state_name = "smart_button", 
                            _getLogger$info$track2.transition_name = "app_switch_ineligible", _getLogger$info$track2.info_msg = ineligibilityReason, 
                            _getLogger$info$track2)).flush();
                            return !1;
                        }
                        return !0;
                    }));
                })));
            }));
        }
        function initNativePopup(_ref2) {
            var props = _ref2.props, serviceData = _ref2.serviceData, config = _ref2.config, sessionUID = _ref2.sessionUID, callbacks = _ref2.callbacks, clean = _ref2.clean;
            var onClick = props.onClick, createOrder = props.createOrder;
            var fundingSource = _ref2.payment.fundingSource;
            var _onInit = callbacks.onInit, _onApprove = callbacks.onApprove, _onCancel = callbacks.onCancel, _onError = callbacks.onError, _onFallback = callbacks.onFallback, onClose = callbacks.onClose, onDestroy = callbacks.onDestroy, _onShippingChange = callbacks.onShippingChange;
            if (!config.firebase) throw new Error("Can not load popup without firebase config");
            var nativePopupPromise;
            return {
                click: function() {
                    nativePopupPromise = new promise_ZalgoPromise((function(resolve, reject) {
                        var _getLogger$info$track3;
                        var nativePopupWin = window.open(function(_ref8) {
                            var props = _ref8.props, fundingSource = _ref8.fundingSource;
                            var queryParams = function(_ref7) {
                                var props = _ref7.props, serviceData = _ref7.serviceData;
                                var buttonSessionID = props.buttonSessionID, env = props.env, clientID = props.clientID, sessionID = props.sessionID, sdkCorrelationID = props.sdkCorrelationID;
                                var sdkMeta = serviceData.sdkMeta, buyerCountry = serviceData.buyerCountry;
                                var parentDomain = getDomain();
                                return {
                                    buttonSessionID: buttonSessionID,
                                    buyerCountry: buyerCountry,
                                    clientID: clientID,
                                    channel: isDevice() ? "mobile-web" : "desktop-web",
                                    env: env,
                                    parentDomain: parentDomain,
                                    sdkCorrelationID: sdkCorrelationID,
                                    sdkMeta: sdkMeta,
                                    sessionID: sessionID
                                };
                            }({
                                props: props,
                                serviceData: _ref8.serviceData,
                                fundingSource: fundingSource
                            });
                            return extendUrl("" + getNativePopupDomain({
                                props: props
                            }) + NATIVE_CHECKOUT_POPUP_URI[fundingSource], {
                                query: queryParams
                            }) + "#init";
                        }({
                            props: props,
                            serviceData: serviceData,
                            fundingSource: fundingSource
                        }));
                        if (!nativePopupWin) throw new Error("Expected native popup to have opened");
                        var nativePopupDomain = getNativePopupDomain({
                            props: props
                        });
                        logger_getLogger().info("native_attempt_appswitch_popup_shown").track((_getLogger$info$track3 = {}, 
                        _getLogger$info$track3.state_name = "smart_button", _getLogger$info$track3.transition_name = "popup_shown", 
                        _getLogger$info$track3)).flush();
                        var redirectListenerTimeout = setTimeout((function() {
                            logger_getLogger().info("native_popup_load_timeout").flush();
                        }), 5e3);
                        var validatePromise = promise_ZalgoPromise.try((function() {
                            return !onClick || onClick({
                                fundingSource: fundingSource
                            });
                        })).then((function(valid) {
                            if (!valid) {
                                var _getLogger$info$track4;
                                logger_getLogger().info("native_onclick_invalid").track((_getLogger$info$track4 = {}, 
                                _getLogger$info$track4.state_name = "smart_button", _getLogger$info$track4.transition_name = "native_onclick_invalid", 
                                _getLogger$info$track4)).flush();
                            }
                            return valid;
                        }));
                        var orderPromise = validatePromise.then((function(valid) {
                            return valid ? createOrder() : unresolvedPromise();
                        }));
                        var detectAppSwitch = once((function() {
                            return promise_ZalgoPromise.try((function() {
                                var _getLogger$info$track5;
                                resolve();
                                onLsatUpgradeCalled();
                                logger_getLogger().info("native_detect_app_switch").track((_getLogger$info$track5 = {}, 
                                _getLogger$info$track5.transition_name = "native_detect_app_switch", _getLogger$info$track5)).flush();
                                getStorageState((function(state) {
                                    var _state$lastAppSwitchT = state.lastAppSwitchTime, lastAppSwitchTime = void 0 === _state$lastAppSwitchT ? 0 : _state$lastAppSwitchT, _state$lastWebSwitchT = state.lastWebSwitchTime, lastWebSwitchTime = void 0 === _state$lastWebSwitchT ? 0 : _state$lastWebSwitchT;
                                    lastAppSwitchTime > lastWebSwitchTime && logger_getLogger().info("app_switch_detect_with_previous_app_switch", {
                                        lastAppSwitchTime: lastAppSwitchTime.toString(),
                                        lastWebSwitchTime: lastWebSwitchTime.toString()
                                    });
                                    lastWebSwitchTime > lastAppSwitchTime && logger_getLogger().info("app_switch_detect_with_previous_web_switch", {
                                        lastAppSwitchTime: lastAppSwitchTime.toString(),
                                        lastWebSwitchTime: lastWebSwitchTime.toString()
                                    });
                                    lastAppSwitchTime || lastWebSwitchTime || logger_getLogger().info("app_switch_detect_with_no_previous_switch", {
                                        lastAppSwitchTime: lastAppSwitchTime.toString(),
                                        lastWebSwitchTime: lastWebSwitchTime.toString()
                                    });
                                    state.lastAppSwitchTime = Date.now();
                                }));
                            }));
                        }));
                        var appSwitchError = once((function(err) {
                            reject(err);
                        }));
                        var detectPossibleAppSwitch = once((function() {
                            return promise_ZalgoPromise.try((function() {
                                var _getLogger$info$track6;
                                onLsatUpgradeCalled();
                                logger_getLogger().info("native_detect_possible_app_switch").track((_getLogger$info$track6 = {}, 
                                _getLogger$info$track6.transition_name = "native_detect_possible_app_switch", _getLogger$info$track6)).flush();
                                var connection = connectNative({
                                    config: config,
                                    sessionUID: sessionUID,
                                    callbacks: {
                                        onInit: function() {
                                            detectAppSwitch();
                                            return _onInit();
                                        },
                                        onApprove: function(_ref3) {
                                            var data = _ref3.data;
                                            detectAppSwitch();
                                            return _onApprove({
                                                data: data
                                            });
                                        },
                                        onCancel: function() {
                                            detectAppSwitch();
                                            return _onCancel();
                                        },
                                        onShippingChange: function(_ref4) {
                                            var data = _ref4.data;
                                            detectAppSwitch();
                                            return _onShippingChange({
                                                data: data
                                            });
                                        },
                                        onError: function(_ref5) {
                                            var data = _ref5.data;
                                            appSwitchError(new Error(data.message));
                                            return _onError({
                                                data: data
                                            });
                                        },
                                        onFallback: function(_ref6) {
                                            var data = _ref6.data;
                                            detectAppSwitch();
                                            return _onFallback({
                                                win: nativePopupWin,
                                                optOut: data
                                            });
                                        }
                                    }
                                });
                                clean.register(connection.cancel);
                            })).catch(reject);
                        }));
                        var detectWebSwitch = once((function() {
                            return promise_ZalgoPromise.try((function() {
                                var _getLogger$info$track7;
                                getStorageState((function(state) {
                                    var _state$lastAppSwitchT2 = state.lastAppSwitchTime, lastAppSwitchTime = void 0 === _state$lastAppSwitchT2 ? 0 : _state$lastAppSwitchT2, _state$lastWebSwitchT2 = state.lastWebSwitchTime, lastWebSwitchTime = void 0 === _state$lastWebSwitchT2 ? 0 : _state$lastWebSwitchT2;
                                    lastAppSwitchTime > lastWebSwitchTime && logger_getLogger().info("web_switch_detect_with_previous_app_switch", {
                                        lastAppSwitchTime: lastAppSwitchTime.toString(),
                                        lastWebSwitchTime: lastWebSwitchTime.toString()
                                    });
                                    lastWebSwitchTime > lastAppSwitchTime && logger_getLogger().info("web_switch_detect_with_previous_web_switch", {
                                        lastAppSwitchTime: lastAppSwitchTime.toString(),
                                        lastWebSwitchTime: lastWebSwitchTime.toString()
                                    });
                                    lastAppSwitchTime || lastWebSwitchTime || logger_getLogger().info("web_switch_detect_with_no_previous_switch", {
                                        lastAppSwitchTime: lastAppSwitchTime.toString(),
                                        lastWebSwitchTime: lastWebSwitchTime.toString()
                                    });
                                    state.lastWebSwitchTime = Date.now();
                                }));
                                logger_getLogger().info("native_detect_web_switch").track((_getLogger$info$track7 = {}, 
                                _getLogger$info$track7.transition_name = "native_detect_web_switch", _getLogger$info$track7)).flush();
                                return _onFallback({
                                    win: nativePopupWin
                                }).then(src_util_noop);
                            })).then(resolve, reject);
                        }));
                        var closeListener = onCloseWindow(nativePopupWin, (function() {
                            var _getLogger$info$track8;
                            logger_getLogger().info("native_popup_closed").track((_getLogger$info$track8 = {}, 
                            _getLogger$info$track8.state_name = "smart_button", _getLogger$info$track8.transition_name = "popup_closed", 
                            _getLogger$info$track8)).flush();
                            appSwitchError(new Error("Native popup closed"));
                            onClose();
                        }), 500);
                        var closePopup = function(event) {
                            var _getLogger$info$track9;
                            logger_getLogger().info("native_closing_popup_" + event).track((_getLogger$info$track9 = {}, 
                            _getLogger$info$track9.state_name = "smart_button", _getLogger$info$track9.transition_name = event ? "native_closing_popup_" + event : "native_closing_popup", 
                            _getLogger$info$track9)).flush();
                            closeListener.cancel();
                            nativePopupWin.close();
                        };
                        var awaitRedirectListener = onPostMessage(nativePopupWin, nativePopupDomain, "awaitRedirect", (function(_ref7) {
                            var _ref7$data = _ref7.data, appDetect = _ref7$data.app, pageUrl = _ref7$data.pageUrl, sfvc = _ref7$data.sfvc, stickinessID = _ref7$data.stickinessID;
                            clearTimeout(redirectListenerTimeout);
                            logger_getLogger().info("native_post_message_await_redirect").flush();
                            (app = appDetect) && Object.keys(app).forEach((function(key) {
                                var _getLogger$info, _getLogger$info$track;
                                logger_getLogger().info("native_app_" + (app.installed ? "installed" : "not_installed") + "_" + key, (_getLogger$info = {}, 
                                _getLogger$info[key] = app[key], _getLogger$info)).track((_getLogger$info$track = {}, 
                                _getLogger$info$track.state_name = "smart_button", _getLogger$info$track.transition_name = "native_app_installed", 
                                _getLogger$info$track.info_msg = "native_app_" + (app.installed ? "installed" : "not_installed") + "_" + key + ": " + app[key].toString(), 
                                _getLogger$info$track)).flush();
                            }));
                            var app;
                            logger_getLogger().addTrackingBuilder((function() {
                                var _ref8;
                                return (_ref8 = {}).stickiness_id = stickinessID, _ref8;
                            }));
                            return promise_ZalgoPromise.hash({
                                valid: validatePromise,
                                eligible: popup_getEligibility({
                                    fundingSource: fundingSource,
                                    props: props,
                                    serviceData: serviceData,
                                    sfvc: sfvc,
                                    validatePromise: validatePromise,
                                    stickinessID: stickinessID,
                                    appDetect: appDetect
                                })
                            }).then((function(_ref9) {
                                var eligible = _ref9.eligible;
                                if (!_ref9.valid) {
                                    closeListener.cancel();
                                    nativePopupWin.close();
                                    return onDestroy().then((function() {
                                        return {
                                            appSwitch: !1,
                                            orderID: null,
                                            redirect: !1
                                        };
                                    }));
                                }
                                return orderPromise.then(eligible ? function(orderID) {
                                    var _getLogger$info$track10;
                                    var nativeUrl = getNativeUrl({
                                        props: props,
                                        serviceData: serviceData,
                                        config: config,
                                        fundingSource: fundingSource,
                                        sessionUID: sessionUID,
                                        pageUrl: pageUrl,
                                        orderID: orderID,
                                        stickinessID: stickinessID
                                    });
                                    logger_getLogger().info("native_attempt_appswitch_url_popup", {
                                        url: nativeUrl
                                    }).track((_getLogger$info$track10 = {}, _getLogger$info$track10.state_name = "smart_button", 
                                    _getLogger$info$track10.transition_name = "app_switch_attempted", _getLogger$info$track10.info_msg = nativeUrl, 
                                    _getLogger$info$track10)).flush();
                                    if (isAndroidChrome()) {
                                        closeListener.cancel();
                                        var appSwitchCloseListener = onCloseWindow(nativePopupWin, (function() {
                                            return detectPossibleAppSwitch();
                                        }), 50);
                                        setTimeout(appSwitchCloseListener.cancel, 1e3);
                                    }
                                    return {
                                        appSwitch: !0,
                                        orderID: orderID,
                                        redirect: !0,
                                        redirectUrl: nativeUrl
                                    };
                                } : function(orderID) {
                                    return {
                                        redirect: !0,
                                        appSwitch: !1,
                                        orderID: orderID,
                                        redirectUrl: getNativeFallbackUrl({
                                            props: props,
                                            serviceData: serviceData,
                                            config: config,
                                            fundingSource: fundingSource,
                                            sessionUID: sessionUID,
                                            pageUrl: pageUrl,
                                            orderID: orderID,
                                            stickinessID: stickinessID
                                        })
                                    };
                                });
                            })).catch((function(err) {
                                var _getLogger$info$track11;
                                logger_getLogger().info("native_attempt_appswitch_url_popup_errored").track((_getLogger$info$track11 = {}, 
                                _getLogger$info$track11.state_name = "smart_button", _getLogger$info$track11.transition_name = "app_switch_attempted_errored", 
                                _getLogger$info$track11.int_error_desc = stringifyError(err), _getLogger$info$track11)).flush();
                                return orderPromise.then((function(orderID) {
                                    return {
                                        appSwitch: !1,
                                        orderID: orderID,
                                        redirect: !0,
                                        redirectUrl: getNativeFallbackUrl({
                                            props: props,
                                            serviceData: serviceData,
                                            config: config,
                                            fundingSource: fundingSource,
                                            sessionUID: sessionUID,
                                            pageUrl: pageUrl,
                                            orderID: orderID,
                                            stickinessID: stickinessID
                                        })
                                    };
                                }));
                            })).catch((function(err) {
                                nativePopupWin.close();
                                appSwitchError(err);
                                return onDestroy().then((function() {
                                    return _onError({
                                        data: {
                                            message: stringifyError(err)
                                        }
                                    });
                                })).then((function() {
                                    return {
                                        redirect: !1,
                                        appSwitch: !1
                                    };
                                }));
                            }));
                        }));
                        var detectPossibleAppSwitchListener = onPostMessage(nativePopupWin, nativePopupDomain, "detectAppSwitch", (function() {
                            logger_getLogger().info("native_post_message_detect_possible_app_switch").flush();
                            return detectPossibleAppSwitch();
                        }));
                        var detectWebSwitchListener = onPostMessage(nativePopupWin, getNativeDomain({
                            props: props
                        }), "detectWebSwitch", (function() {
                            logger_getLogger().info("native_post_message_detect_web_switch").flush();
                            return detectWebSwitch({
                                win: nativePopupWin
                            });
                        }));
                        var onApproveListener = onPostMessage(nativePopupWin, nativePopupDomain, "onApprove", (function(data) {
                            detectAppSwitch();
                            _onApprove(data);
                            closePopup("onApprove");
                        }));
                        var onCancelListener = onPostMessage(nativePopupWin, nativePopupDomain, "onCancel", (function() {
                            detectAppSwitch();
                            _onCancel();
                            closePopup("onCancel");
                        }));
                        var onFallbackListener = onPostMessage(nativePopupWin, nativePopupDomain, "onFallback", (function(_ref10) {
                            var _getLogger$info$track12;
                            var data = _ref10.data;
                            logger_getLogger().info("native_message_onfallback").track((_getLogger$info$track12 = {}, 
                            _getLogger$info$track12.transition_name = "native_onfallback", _getLogger$info$track12)).flush();
                            _onFallback({
                                win: nativePopupWin,
                                optOut: data
                            });
                        }));
                        var onCompleteListener = onPostMessage(nativePopupWin, nativePopupDomain, "onComplete", (function() {
                            var _getLogger$info$track13;
                            detectAppSwitch();
                            logger_getLogger().info("native_post_message_on_complete").track((_getLogger$info$track13 = {}, 
                            _getLogger$info$track13.state_name = "smart_button", _getLogger$info$track13.transition_name = "native_oncomplete", 
                            _getLogger$info$track13)).flush();
                            closePopup("onComplete");
                        }));
                        var onErrorListener = onPostMessage(nativePopupWin, nativePopupDomain, "onError", (function(data) {
                            _onError(data);
                            closePopup("onError");
                            appSwitchError(new Error(data.message));
                        }));
                        window.addEventListener("pagehide", (function() {
                            return closePopup("pagehide");
                        }));
                        window.addEventListener("unload", (function() {
                            return closePopup("unload");
                        }));
                        clean.register((function() {
                            return promise_ZalgoPromise.all([ awaitRedirectListener.cancel, detectPossibleAppSwitchListener.cancel, onApproveListener.cancel, onCancelListener.cancel, onFallbackListener.cancel, onCompleteListener.cancel, onErrorListener.cancel, detectWebSwitchListener.cancel, closeListener.cancel ]).then(src_util_noop);
                        }));
                    }));
                },
                start: function() {
                    if (!nativePopupPromise) throw new Error("Expected native popup promise to be set");
                    return nativePopupPromise;
                }
            };
        }
        var native_clean;
        var parentPopupBridge;
        function branded_vault_card_getClientMetadataID(_ref) {
            var props = _ref.props;
            return props.clientMetadataID || props.sessionID;
        }
        function isValidMerchantIDs(merchantIDs, payees) {
            if (merchantIDs.length !== payees.length) return !1;
            var merchantEmails = [];
            var merchantIds = [];
            merchantIDs.forEach((function(id) {
                isEmailAddress(id) ? merchantEmails.push(id.toLowerCase()) : merchantIds.push(id);
            }));
            var foundEmail = merchantEmails.every((function(email) {
                return payees.some((function(payee) {
                    return email === (payee.email && payee.email.stringValue && payee.email.stringValue.toLowerCase());
                }));
            }));
            var foundMerchantId = merchantIds.every((function(id) {
                return payees.some((function(payee) {
                    return id === payee.merchantId;
                }));
            }));
            return !(!foundEmail || !foundMerchantId) && payees.every((function(payee) {
                return merchantIds.indexOf(payee.merchantId) > -1 || merchantEmails.indexOf(payee.email && payee.email.stringValue && payee.email.stringValue.toLowerCase()) > -1;
            }));
        }
        function triggerIntegrationError(_ref) {
            var _getLogger$warn$track;
            var error = _ref.error, _ref$message = _ref.message, message = void 0 === _ref$message ? error : _ref$message, clientID = _ref.clientID, orderID = _ref.orderID, _ref$loggerPayload = _ref.loggerPayload, loggerPayload = void 0 === _ref$loggerPayload ? {} : _ref$loggerPayload, _ref$throwError = _ref.throwError, throwError = void 0 === _ref$throwError || _ref$throwError;
            var isWhitelisted = "sandbox" === _ref.env ? clientID && -1 !== SANDBOX_ORDER_VALIDATION_WHITELIST.indexOf(clientID) : clientID && -1 !== ORDER_VALIDATION_WHITELIST.indexOf(clientID);
            var shouldThrow = throwError && !isWhitelisted;
            logger_getLogger().warn(error, loggerPayload).track((_getLogger$warn$track = {}, 
            _getLogger$warn$track.transition_name = "process_order_validate", _getLogger$warn$track.context_type = "EC-Token", 
            _getLogger$warn$track.token = orderID, _getLogger$warn$track.context_id = orderID, 
            _getLogger$warn$track.integration_issue = error, _getLogger$warn$track.whitelist = shouldThrow ? "false" : "true", 
            _getLogger$warn$track.ext_error_desc = message, _getLogger$warn$track)).flush();
            if (shouldThrow) {
                console.error(message);
                throw new Error(message);
            }
            console.warn(message);
        }
        var VALIDATE_INTENTS = [ "capture", "authorize", "order" ];
        var menu_menu;
        function renderButtonSmartMenu(_ref) {
            var containerUID = _ref.containerUID;
            if (menu_menu) return menu_menu;
            var newMenu = (0, _ref.Menu)({
                clientID: _ref.clientID
            });
            newMenu.hide();
            newMenu.renderTo(window.xprops.getParent(), "#" + containerUID + " #smart-menu");
            return menu_menu = newMenu;
        }
        var PAYMENT_FLOWS = [ {
            name: "nonce",
            setup: function(_ref2) {
                var props = _ref2.props;
                var env = props.env;
                var cspNonce = _ref2.config.cspNonce;
                var clientMetadataID = branded_vault_card_getClientMetadataID({
                    props: props
                });
                loadFraudnet({
                    env: env,
                    clientMetadataID: clientMetadataID,
                    cspNonce: cspNonce
                }).catch(src_util_noop);
            },
            isEligible: function(_ref3) {
                var _wallet$card;
                var props = _ref3.props;
                var paymentMethodToken = props.paymentMethodToken, branded = props.branded;
                var wallet = _ref3.serviceData.wallet;
                var instrument = null == wallet || null == (_wallet$card = wallet.card) ? void 0 : _wallet$card.instruments.filter((function(_ref4) {
                    return _ref4.tokenID === paymentMethodToken;
                }))[0];
                return !!(paymentMethodToken && wallet && instrument && branded && 0 !== wallet.card.instruments.length && wallet.card.instruments.some((function(item) {
                    return item.tokenID && item.branded;
                })));
            },
            isPaymentEligible: function(_ref5) {
                var _wallet$card2;
                var payment = _ref5.payment;
                var branded = _ref5.props.branded;
                var wallet = _ref5.serviceData.wallet;
                var fundingSource = payment.fundingSource, paymentMethodID = payment.paymentMethodID;
                var instrument = null == wallet || null == (_wallet$card2 = wallet.card) ? void 0 : _wallet$card2.instruments.filter((function(_ref6) {
                    return _ref6.tokenID === paymentMethodID;
                }))[0];
                return !!instrument && "card" === fundingSource && !(!branded || !instrument.branded) && !(null == instrument || !instrument.tokenID);
            },
            init: function(_ref8) {
                var _wallet$card3;
                var props = _ref8.props, components = _ref8.components, payment = _ref8.payment, serviceData = _ref8.serviceData, config = _ref8.config;
                var createOrder = props.createOrder, onApprove = props.onApprove, clientID = props.clientID, branded = props.branded, buttonSessionID = props.buttonSessionID;
                var wallet = serviceData.wallet;
                var paymentMethodID = payment.paymentMethodID;
                var clientMetadataID = branded_vault_card_getClientMetadataID({
                    props: props
                });
                var instrument = null == wallet || null == (_wallet$card3 = wallet.card) ? void 0 : _wallet$card3.instruments.filter((function(_ref9) {
                    return _ref9.tokenID === paymentMethodID;
                }))[0];
                var paymentMethodToken = null == instrument ? void 0 : instrument.tokenID;
                if (!paymentMethodToken) {
                    logger_getLogger().info("branded_vault_card_payment_failed");
                    throw new Error("PAY_WITH_DIFFERENT_CARD");
                }
                var restart = function() {
                    return function() {
                        logger_getLogger().info("web_checkout_fallback").flush();
                        return checkout.init({
                            props: props,
                            components: components,
                            serviceData: serviceData,
                            payment: payment,
                            config: config
                        });
                    }().start();
                };
                return {
                    start: function() {
                        return createOrder().then((function(orderID) {
                            return function(_ref7) {
                                var orderID = _ref7.orderID, paymentMethodToken = _ref7.paymentMethodToken, clientID = _ref7.clientID, branded = _ref7.branded, buttonSessionID = _ref7.buttonSessionID, clientMetadataID = _ref7.clientMetadataID;
                                logger_getLogger().info("branded_vault_card_payment_initiated");
                                if (!branded) throw new Error("Expected payment to be branded");
                                return function(_ref23) {
                                    var _headers23;
                                    var orderID = _ref23.orderID, paymentMethodToken = _ref23.paymentMethodToken, clientID = _ref23.clientID, branded = _ref23.branded, buttonSessionID = _ref23.buttonSessionID, clientMetadataID = _ref23.clientMetadataID;
                                    logger_getLogger().info("pay_with_payment_method_token_input_params", {
                                        orderID: orderID,
                                        paymentMethodToken: paymentMethodToken,
                                        clientID: clientID,
                                        branded: branded,
                                        buttonSessionID: buttonSessionID
                                    });
                                    return callGraphQL({
                                        name: "approvePaymentWithNonce",
                                        query: "\n            mutation ApprovePaymentWithNonce(\n                $orderID : String!\n                $clientID : String!\n                $paymentMethodToken: String!\n                $branded: Boolean!\n                $buttonSessionID: String\n            ) {\n                approvePaymentWithNonce(\n                    token: $orderID\n                    clientID: $clientID\n                    paymentMethodNonce: $paymentMethodToken\n                    branded: $branded\n                    buttonSessionID: $buttonSessionID\n                ) {\n                    buyer {\n                        userId\n                    }\n                }\n            }\n        ",
                                        variables: {
                                            orderID: orderID,
                                            clientID: clientID,
                                            paymentMethodToken: paymentMethodToken,
                                            branded: branded,
                                            buttonSessionID: buttonSessionID
                                        },
                                        headers: (_headers23 = {}, _headers23["paypal-client-context"] = orderID, _headers23["paypal-client-metadata-id"] = clientMetadataID, 
                                        _headers23)
                                    }).then((function(_ref24) {
                                        var approvePaymentWithNonce = _ref24.approvePaymentWithNonce;
                                        logger_getLogger().info("pay_with_paymentMethodToken", JSON.stringify(approvePaymentWithNonce));
                                        return {
                                            payerID: approvePaymentWithNonce.buyer.userId
                                        };
                                    }));
                                }({
                                    orderID: orderID,
                                    paymentMethodToken: paymentMethodToken,
                                    clientID: clientID,
                                    branded: branded,
                                    buttonSessionID: buttonSessionID,
                                    clientMetadataID: clientMetadataID
                                }).catch((function(error) {
                                    logger_getLogger().info("branded_vault_card_payment_failed");
                                    error.code = "PAY_WITH_DIFFERENT_CARD";
                                    throw error;
                                }));
                            }({
                                orderID: orderID,
                                paymentMethodToken: paymentMethodToken,
                                clientID: clientID,
                                branded: branded,
                                buttonSessionID: buttonSessionID,
                                clientMetadataID: clientMetadataID
                            }).then((function(_ref10) {
                                return onApprove({
                                    payerID: _ref10.payerID
                                }, {
                                    restart: restart
                                });
                            }));
                        }));
                    },
                    close: promiseNoop
                };
            },
            inline: !0
        }, vaultCapture, walletCapture, cardField, cardForm, {
            name: "popup_bridge",
            setup: function(_ref) {
                var props = _ref.props;
                return promise_ZalgoPromise.try((function() {
                    var getPopupBridge = props.getPopupBridge;
                    if (getPopupBridge) return getPopupBridge().then((function(bridge) {
                        parentPopupBridge = bridge;
                    }));
                }));
            },
            isEligible: function(_ref2) {
                return !_ref2.props.onShippingChange;
            },
            isPaymentEligible: function(_ref3) {
                return !_ref3.payment.win && !!parentPopupBridge;
            },
            init: function(_ref4) {
                var props = _ref4.props;
                var createOrder = props.createOrder, onApprove = props.onApprove, onCancel = props.onCancel, commit = props.commit;
                var fundingSource = _ref4.payment.fundingSource;
                return {
                    start: function start() {
                        return createOrder().then((function(orderID) {
                            if (!parentPopupBridge) throw new Error("Popup bridge required");
                            var url = extendUrl(getDomain() + "/checkoutnow", {
                                query: {
                                    fundingSource: fundingSource,
                                    token: orderID,
                                    useraction: commit ? "commit" : "continue",
                                    redirect_uri: parentPopupBridge.nativeUrl,
                                    native_xo: "1"
                                }
                            });
                            return parentPopupBridge.start(url);
                        })).then((function(_ref5) {
                            var opType = _ref5.opType, payerID = _ref5.PayerID, paymentID = _ref5.paymentId, billingToken = _ref5.ba_token;
                            if ("payment" === opType) {
                                if (!payerID && !billingToken) throw new Error("Expected payerID to be passed");
                                return onApprove({
                                    payerID: payerID,
                                    paymentID: paymentID,
                                    billingToken: billingToken
                                }, {
                                    restart: start
                                });
                            }
                            if ("cancel" === opType) return onCancel();
                            throw new Error("Unhandleable opType: " + opType);
                        }));
                    },
                    close: promiseNoop
                };
            },
            spinner: !0
        }, applepay, {
            name: "native",
            setup: function(_ref) {
                return (_ref3 = {
                    props: _ref.props,
                    serviceData: _ref.serviceData
                }, props = _ref3.props, serviceData = _ref3.serviceData, clientID = props.clientID, 
                currency = props.currency, env = props.env, buttonSessionID = props.buttonSessionID, 
                enableFunding = props.enableFunding, merchantDomain = props.merchantDomain, merchantID = serviceData.merchantID, 
                buyerCountry = serviceData.buyerCountry, cookies = serviceData.cookies, getNativeEligibility({
                    vault: props.vault,
                    platform: props.platform,
                    shippingCallbackEnabled: Boolean(props.onShippingChange),
                    clientID: clientID,
                    buyerCountry: buyerCountry,
                    currency: currency,
                    buttonSessionID: buttonSessionID,
                    cookies: cookies,
                    enableFunding: enableFunding,
                    stickinessID: null,
                    skipElmo: !0,
                    merchantID: merchantID[0],
                    domain: merchantDomain
                }).then((function(nativeEligibility) {
                    nativeEligibilityResults = nativeEligibility;
                    (function(_ref) {
                        var nativeEligibility = _ref.nativeEligibility;
                        for (var _i2 = 0; _i2 < SUPPORTED_FUNDING.length; _i2++) {
                            var fundingSource = SUPPORTED_FUNDING[_i2];
                            if (isTestGroup(nativeEligibility, fundingSource) || isControlGroup(nativeEligibility, fundingSource)) return !0;
                        }
                        return !1;
                    })({
                        nativeEligibility: nativeEligibility
                    }) && function(_ref) {
                        var env = _ref.env;
                        logger_getLogger().configure({
                            amplitudeApiKey: AMPLITUDE_API_KEY[env]
                        });
                    }({
                        env: env
                    });
                }))).then(src_util_noop);
                var _ref3, props, serviceData, clientID, currency, env, buttonSessionID, enableFunding, merchantDomain, merchantID, buyerCountry, cookies;
            },
            isEligible: function(_ref6) {
                var props = _ref6.props;
                var clientID = props.clientID, fundingSource = props.fundingSource, onShippingChange = props.onShippingChange, createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription, env = props.env;
                var firebaseConfig = _ref6.config.firebase;
                var merchantID = _ref6.serviceData.merchantID;
                return !(!canUsePopupAppSwitch({
                    fundingSource: fundingSource
                }) && !canUseNativeQRCode({
                    fundingSource: fundingSource
                }) || onShippingChange && !isNativeOptedIn({
                    props: props
                }) || createBillingAgreement || createSubscription || !supportsPopups() || !firebaseConfig || function() {
                    var now = Date.now();
                    var optOutLifetime = 0;
                    getStorageState((function(state) {
                        var nativeOptOutLifetime = state.nativeOptOutLifetime;
                        nativeOptOutLifetime && "number" == typeof nativeOptOutLifetime && (optOutLifetime = nativeOptOutLifetime);
                    }));
                    return optOutLifetime > now;
                }() || !isNativeOptedIn({
                    props: props
                }) && ("local" === env || "stage" === env || merchantID.length > 1 || -1 !== LSAT_UPGRADE_EXCLUDED_MERCHANTS.indexOf(clientID)));
            },
            isPaymentEligible: function(_ref7) {
                var payment = _ref7.payment;
                var platform = _ref7.props.platform;
                var fundingSource = payment.fundingSource;
                if (payment.win) return !1;
                if (!NATIVE_CHECKOUT_URI[fundingSource] || !NATIVE_CHECKOUT_POPUP_URI[fundingSource] || !NATIVE_CHECKOUT_FALLBACK_URI[fundingSource]) return !1;
                if (!canUsePopupAppSwitch({
                    fundingSource: fundingSource
                }) && !canUseNativeQRCode({
                    fundingSource: fundingSource
                })) return !1;
                if (platform && "desktop" === platform) {
                    var _nativeEligibilityRes, _nativeEligibilityRes2;
                    var eligibleReasons = [ "isUserAgentEligible", "isBrowserMobileAndroid" ];
                    var ineligibleReasons = nativeEligibilityResults && (null == (_nativeEligibilityRes = nativeEligibilityResults[fundingSource]) || null == (_nativeEligibilityRes2 = _nativeEligibilityRes.ineligibilityReason) ? void 0 : _nativeEligibilityRes2.split(","));
                    var eligible = null == ineligibleReasons ? void 0 : ineligibleReasons.every((function(reason) {
                        return !reason || -1 !== (null == eligibleReasons ? void 0 : eligibleReasons.indexOf(reason));
                    }));
                    if (ineligibleReasons && !eligible) return !1;
                }
                return !0;
            },
            init: function(_ref2) {
                var props = _ref2.props, components = _ref2.components, config = _ref2.config, payment = _ref2.payment, serviceData = _ref2.serviceData;
                var onApprove = props.onApprove, onCancel = props.onCancel, onError = props.onError, buttonSessionID = props.buttonSessionID, onShippingChange = props.onShippingChange;
                var fundingSource = payment.fundingSource;
                if (!config.firebase) throw new Error("Can not run native flow without firebase config");
                native_clean && native_clean.all();
                native_clean = cleanup();
                var approved = !1;
                var cancelled = !1;
                var didFallback = !1;
                var destroy = memoize((function() {
                    return native_clean.all();
                }));
                var fallbackToWebCheckout = function(fallbackWin) {
                    didFallback = !0;
                    var checkoutPayment = _extends({}, payment, {
                        win: fallbackWin,
                        isClick: !1,
                        isNativeFallback: !0
                    });
                    var instance = checkout.init({
                        props: props,
                        components: components,
                        payment: checkoutPayment,
                        config: config,
                        serviceData: serviceData
                    });
                    native_clean.register((function() {
                        return instance.close();
                    }));
                    return instance.start();
                };
                var sessionUID = uniqueID();
                var initFlow;
                if (canUsePopupAppSwitch({
                    fundingSource: fundingSource
                })) initFlow = initNativePopup; else {
                    if (!canUseNativeQRCode({
                        fundingSource: fundingSource
                    })) throw new Error("No valid native payment flow found");
                    initFlow = initNativeQRCode;
                }
                var flow = initFlow({
                    props: props,
                    serviceData: serviceData,
                    config: config,
                    components: components,
                    payment: payment,
                    clean: native_clean,
                    sessionUID: sessionUID,
                    callbacks: {
                        onInit: function() {
                            return promise_ZalgoPromise.try((function() {
                                onLsatUpgradeCalled();
                                return {
                                    buttonSessionID: buttonSessionID
                                };
                            }));
                        },
                        onApprove: function(_ref3) {
                            var _getLogger$info$track;
                            var _ref3$data = _ref3.data, payerID = _ref3$data.payerID, paymentID = _ref3$data.paymentID, billingToken = _ref3$data.billingToken;
                            approved = !0;
                            logger_getLogger().info("native_message_onapprove", {
                                payerID: payerID,
                                paymentID: paymentID,
                                billingToken: billingToken
                            }).track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "native_onapprove", 
                            _getLogger$info$track.info_msg = "payerID: " + payerID + ", paymentID: " + (paymentID || "undefined") + ", billingToken: " + (billingToken || "undefined"), 
                            _getLogger$info$track)).flush();
                            return promise_ZalgoPromise.all([ onApprove({
                                payerID: payerID,
                                paymentID: paymentID,
                                billingToken: billingToken,
                                forceRestAPI: !0
                            }, {
                                restart: function() {
                                    return fallbackToWebCheckout();
                                }
                            }).catch((function(err) {
                                var _getLogger$info$track2;
                                logger_getLogger().info("native_message_onapprove_error", {
                                    payerID: payerID,
                                    paymentID: paymentID,
                                    billingToken: billingToken
                                }).track((_getLogger$info$track2 = {}, _getLogger$info$track2.transition_name = "native_onapprove_error", 
                                _getLogger$info$track2.info_msg = "Error: " + stringifyError(err), _getLogger$info$track2)).flush();
                                onError(err);
                            })), destroy() ]).then((function() {
                                return {
                                    buttonSessionID: buttonSessionID
                                };
                            }));
                        },
                        onCancel: function() {
                            var _getLogger$info$track3;
                            cancelled = !0;
                            logger_getLogger().info("native_message_oncancel").track((_getLogger$info$track3 = {}, 
                            _getLogger$info$track3.transition_name = "native_oncancel", _getLogger$info$track3)).flush();
                            return promise_ZalgoPromise.all([ onCancel(), destroy() ]).then((function() {
                                return {
                                    buttonSessionID: buttonSessionID
                                };
                            }));
                        },
                        onError: function(_ref4) {
                            var _getLogger$info$track4;
                            var message = _ref4.data.message;
                            logger_getLogger().info("native_message_onerror", {
                                err: message
                            }).track((_getLogger$info$track4 = {}, _getLogger$info$track4.transition_name = "native_onerror", 
                            _getLogger$info$track4.info_msg = "Error message: " + message, _getLogger$info$track4)).flush();
                            return promise_ZalgoPromise.all([ onError(new Error(message)), destroy() ]).then((function() {
                                return {
                                    buttonSessionID: buttonSessionID
                                };
                            }));
                        },
                        onShippingChange: function(_ref5) {
                            var data = _ref5.data;
                            return promise_ZalgoPromise.try((function() {
                                var _getLogger$info$track5;
                                logger_getLogger().info("native_message_onshippingchange").track((_getLogger$info$track5 = {}, 
                                _getLogger$info$track5.transition_name = "native_onshippingchange", _getLogger$info$track5)).flush();
                                if (onShippingChange) {
                                    var resolved = !0;
                                    var actions = {
                                        resolve: function() {
                                            return promise_ZalgoPromise.try((function() {
                                                resolved = !0;
                                            }));
                                        },
                                        reject: function() {
                                            return promise_ZalgoPromise.try((function() {
                                                resolved = !1;
                                            }));
                                        }
                                    };
                                    return onShippingChange(_extends({}, data, {
                                        forceRestAPI: !0
                                    }), actions).then((function() {
                                        return {
                                            resolved: resolved
                                        };
                                    }));
                                }
                                return {
                                    resolved: !0
                                };
                            }));
                        },
                        onFallback: function(opts) {
                            var _ref6 = opts || {}, win = _ref6.win, _ref6$optOut = _ref6.optOut, optOut = void 0 === _ref6$optOut ? {} : _ref6$optOut;
                            return promise_ZalgoPromise.try((function() {
                                var _getLogger$info$track6;
                                var result = function(optOut) {
                                    var type = optOut.type, skip_native_duration = optOut.skip_native_duration;
                                    if (type && "native_opt_out" === type) {
                                        var OPT_OUT_TIME = 36288e5;
                                        skip_native_duration && "number" == typeof skip_native_duration && (OPT_OUT_TIME = skip_native_duration);
                                        var now = Date.now();
                                        getStorageState((function(state) {
                                            state.nativeOptOutLifetime = now + OPT_OUT_TIME;
                                        }));
                                        return !0;
                                    }
                                    return !1;
                                }(optOut);
                                var fallback_reason = optOut.fallback_reason;
                                logger_getLogger().info("native_message_onfallback").track((_getLogger$info$track6 = {}, 
                                _getLogger$info$track6.transition_name = "native_onfallback", _getLogger$info$track6.transition_type = result ? "native_opt_out" : "native_fallback", 
                                _getLogger$info$track6.transition_reason = fallback_reason || "", _getLogger$info$track6)).flush();
                                fallbackToWebCheckout(win);
                                return {
                                    buttonSessionID: buttonSessionID
                                };
                            }));
                        },
                        onClose: function() {
                            return promise_ZalgoPromise.delay(1e3).then((function() {
                                if (!(approved || cancelled || didFallback || isAndroidChrome())) return promise_ZalgoPromise.try((function() {
                                    return destroy();
                                }));
                            })).then(src_util_noop);
                        },
                        onDestroy: destroy
                    }
                });
                return {
                    click: function() {
                        return flow.click();
                    },
                    start: function() {
                        return promise_ZalgoPromise.try((function() {
                            return flow.start();
                        })).catch((function(err) {
                            return destroy().then((function() {
                                var _getLogger$error$trac;
                                logger_getLogger().error("native_error", {
                                    err: stringifyError(err)
                                }).track((_getLogger$error$trac = {}, _getLogger$error$trac.transition_name = "native_app_switch_ack", 
                                _getLogger$error$trac.ext_error_code = "native_error", _getLogger$error$trac.ext_error_desc = stringifyErrorMessage(err), 
                                _getLogger$error$trac)).flush();
                                throw err;
                            }));
                        }));
                    },
                    close: destroy
                };
            },
            updateFlowClientConfig: function(_ref7) {
                var orderID = _ref7.orderID, payment = _ref7.payment, userExperienceFlow = _ref7.userExperienceFlow, buttonSessionID = _ref7.buttonSessionID;
                return promise_ZalgoPromise.try((function() {
                    return updateButtonClientConfig({
                        fundingSource: payment.fundingSource,
                        orderID: orderID,
                        inline: !1,
                        userExperienceFlow: userExperienceFlow,
                        buttonSessionID: buttonSessionID
                    });
                }));
            },
            spinner: !0
        }, checkout ];
        function getPaymentFlow(_ref2) {
            var props = _ref2.props, payment = _ref2.payment, config = _ref2.config, serviceData = _ref2.serviceData;
            !props.fundingSource && payment.fundingSource && (props.fundingSource = payment.fundingSource);
            for (var _i2 = 0; _i2 < PAYMENT_FLOWS.length; _i2++) {
                var flow = PAYMENT_FLOWS[_i2];
                if (flow.isEligible({
                    props: props,
                    config: config,
                    serviceData: serviceData
                }) && flow.isPaymentEligible({
                    props: props,
                    payment: payment,
                    config: config,
                    serviceData: serviceData
                })) return flow;
            }
            throw new Error("Could not find eligible payment flow");
        }
        function initiatePaymentFlow(_ref3) {
            var _props$style;
            var payment = _ref3.payment, serviceData = _ref3.serviceData, config = _ref3.config, components = _ref3.components, props = _ref3.props;
            var button = payment.button, fundingSource = payment.fundingSource, instrumentType = payment.instrumentType, buyerIntent = payment.buyerIntent;
            var buttonLabel = null == (_props$style = props.style) ? void 0 : _props$style.label;
            return promise_ZalgoPromise.try((function() {
                var _getLogger$addPayload;
                var merchantID = serviceData.merchantID, fundingEligibility = serviceData.fundingEligibility, buyerCountry = serviceData.buyerCountry;
                var clientID = props.clientID, onClick = props.onClick, createOrder = props.createOrder, env = props.env, vault = props.vault, partnerAttributionID = props.partnerAttributionID, userExperienceFlow = props.userExperienceFlow, buttonSessionID = props.buttonSessionID, intent = props.intent, currency = props.currency, clientAccessToken = props.clientAccessToken, createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription, commit = props.commit, disableFunding = props.disableFunding, disableCard = props.disableCard, userIDToken = props.userIDToken;
                !function(personalization) {
                    personalization && personalization.tagline && personalization.tagline.tracking && util_sendBeacon(personalization.tagline.tracking.click);
                    personalization && personalization.buttonText && personalization.buttonText.tracking && util_sendBeacon(personalization.buttonText.tracking.click);
                }(serviceData.personalization);
                var _getPaymentFlow = getPaymentFlow({
                    props: props,
                    payment: payment,
                    config: config,
                    components: components,
                    serviceData: serviceData
                }), name = _getPaymentFlow.name, inline = _getPaymentFlow.inline, spinner = _getPaymentFlow.spinner, updateFlowClientConfig = _getPaymentFlow.updateFlowClientConfig;
                var _init = (0, _getPaymentFlow.init)({
                    props: props,
                    config: config,
                    serviceData: serviceData,
                    components: components,
                    payment: payment
                }), click = _init.click, start = _init.start, close = _init.close;
                logger_getLogger().addPayloadBuilder((function() {
                    return {
                        token: null
                    };
                })).info("button_click").info("button_click_pay_flow_" + name).info("button_click_fundingsource_" + fundingSource).info("button_click_instrument_" + (instrumentType || "default")).addTrackingBuilder((function() {
                    var _ref4;
                    return (_ref4 = {}).selected_payment_method = fundingSource, _ref4.context_type = "button_session_id", 
                    _ref4.context_id = buttonSessionID, _ref4.token = null, _ref4;
                })).track((_getLogger$addPayload = {}, _getLogger$addPayload.transition_name = "process_button_click", 
                _getLogger$addPayload.chosen_fi_type = instrumentType, _getLogger$addPayload.payment_flow = name, 
                _getLogger$addPayload.is_vault = instrumentType ? "1" : "0", _getLogger$addPayload)).flush();
                var clickPromise = click ? promise_ZalgoPromise.try(click) : promise_ZalgoPromise.resolve();
                clickPromise.catch(src_util_noop);
                return promise_ZalgoPromise.try((function() {
                    return !onClick || onClick({
                        fundingSource: fundingSource
                    });
                })).then((function(valid) {
                    return !!valid && clickPromise;
                })).then((function(valid) {
                    if (!1 !== valid) {
                        spinner && enableLoadingSpinner(button);
                        var updateClientConfigPromise = createOrder().then((function(orderID) {
                            if (updateFlowClientConfig) return updateFlowClientConfig({
                                orderID: orderID,
                                payment: payment,
                                userExperienceFlow: userExperienceFlow,
                                buttonSessionID: buttonSessionID
                            });
                            updateButtonClientConfig({
                                orderID: orderID,
                                fundingSource: fundingSource,
                                inline: inline,
                                userExperienceFlow: userExperienceFlow
                            }).catch((function(err) {
                                logger_getLogger().error("update_client_config_error", {
                                    err: stringifyError(err)
                                });
                            }));
                        })).catch(src_util_noop);
                        var vaultPromise = createOrder().then((function(orderID) {
                            return promise_ZalgoPromise.try((function() {
                                if (clientID && "pay" === buyerIntent) return function(_ref3) {
                                    var orderID = _ref3.orderID, vault = _ref3.vault, clientAccessToken = _ref3.clientAccessToken, createBillingAgreement = _ref3.createBillingAgreement, createSubscription = _ref3.createSubscription, fundingSource = _ref3.fundingSource, clientID = _ref3.clientID, merchantID = _ref3.merchantID, buyerCountry = _ref3.buyerCountry, currency = _ref3.currency, commit = _ref3.commit, intent = _ref3.intent, disableFunding = _ref3.disableFunding, disableCard = _ref3.disableCard, userIDToken = _ref3.userIDToken;
                                    return promise_ZalgoPromise.try((function() {
                                        logger_getLogger().info("vault_auto_setup_vault_" + vault.toString() + "_id_token_" + (userIDToken ? "present" : "not_present")).flush();
                                        return function(_ref2) {
                                            var vault = _ref2.vault, clientAccessToken = _ref2.clientAccessToken, createBillingAgreement = _ref2.createBillingAgreement, createSubscription = _ref2.createSubscription, fundingSource = _ref2.fundingSource, clientID = _ref2.clientID, merchantID = _ref2.merchantID, buyerCountry = _ref2.buyerCountry, currency = _ref2.currency, commit = _ref2.commit, intent = _ref2.intent, disableFunding = _ref2.disableFunding, disableCard = _ref2.disableCard;
                                            return promise_ZalgoPromise.try((function() {
                                                return !!clientAccessToken && !createBillingAgreement && !createSubscription && (!!vault || function(_ref) {
                                                    var accessToken = _ref.accessToken, fundingSource = _ref.fundingSource, clientID = _ref.clientID, merchantID = _ref.merchantID, buyerCountry = _ref.buyerCountry, currency = _ref.currency, commit = _ref.commit, vault = _ref.vault, intent = _ref.intent, disableFunding = _ref.disableFunding, disableCard = _ref.disableCard;
                                                    return promise_ZalgoPromise.try((function() {
                                                        return "paypal" === fundingSource && function(query, _ref) {
                                                            var _headers;
                                                            var accessToken = _ref.accessToken, intent = _ref.intent, disableFunding = _ref.disableFunding, disableCard = _ref.disableCard;
                                                            return callGraphQL({
                                                                name: "GetFundingEligibility",
                                                                query: "\n            query GetFundingEligibility(\n                $clientID:String,\n                $merchantID:[ String ],\n                $buyerCountry:CountryCodes,\n                $currency:SupportedCountryCurrencies,\n                $intent:FundingEligibilityIntent,\n                $commit:Boolean,\n                $vault:Boolean,\n                $disableFunding:[ SupportedPaymentMethodsType ],\n                $disableCard:[ SupportedCardsType ]\n            ) {\n            fundingEligibility(\n                clientId: $clientID,\n                buyerCountry: $buyerCountry,\n                currency: $currency,\n                intent: $intent,\n                commit: $commit,\n                vault: $vault,\n                disableFunding: $disableFunding,\n                disableCard: $disableCard,\n                merchantId: $merchantID\n            ) {\n                " + query + "\n            }\n          }\n        ",
                                                                variables: {
                                                                    clientID: _ref.clientID,
                                                                    merchantID: _ref.merchantID,
                                                                    buyerCountry: _ref.buyerCountry,
                                                                    currency: _ref.currency,
                                                                    commit: _ref.commit,
                                                                    vault: _ref.vault,
                                                                    intent: intent ? intent.toUpperCase() : intent,
                                                                    disableFunding: disableFunding ? disableFunding.map((function(f) {
                                                                        return f && f.toUpperCase();
                                                                    })) : disableFunding,
                                                                    disableCard: disableCard ? disableCard.map((function(f) {
                                                                        return f && f.toUpperCase();
                                                                    })) : disableCard
                                                                },
                                                                headers: (_headers = {}, _headers["x-paypal-internal-euat"] = accessToken || "", 
                                                                _headers)
                                                            }).then((function(gqlResult) {
                                                                if (!gqlResult || !gqlResult.fundingEligibility) throw new Error("GraphQL fundingEligibility returned no fundingEligibility object");
                                                                return gqlResult && gqlResult.fundingEligibility;
                                                            }));
                                                        }("\n                " + fundingSource + " {\n                    vaultable\n                }\n            ", {
                                                            accessToken: accessToken,
                                                            clientID: clientID,
                                                            merchantID: merchantID,
                                                            buyerCountry: buyerCountry,
                                                            currency: currency,
                                                            commit: commit,
                                                            vault: vault,
                                                            intent: intent,
                                                            disableFunding: disableFunding,
                                                            disableCard: disableCard
                                                        }).then((function(newFundingEligibility) {
                                                            return !(!newFundingEligibility[fundingSource] || !newFundingEligibility[fundingSource].vaultable);
                                                        }));
                                                    }));
                                                }({
                                                    accessToken: clientAccessToken,
                                                    fundingSource: fundingSource,
                                                    clientID: clientID,
                                                    merchantID: merchantID,
                                                    buyerCountry: buyerCountry,
                                                    currency: currency,
                                                    commit: commit,
                                                    vault: vault,
                                                    intent: intent,
                                                    disableFunding: disableFunding,
                                                    disableCard: disableCard
                                                }).catch((function(err) {
                                                    logger_getLogger().warn("funding_vaultable_error", {
                                                        err: stringifyError(err)
                                                    });
                                                    return !1;
                                                })));
                                            }));
                                        }({
                                            vault: vault,
                                            clientAccessToken: clientAccessToken,
                                            createBillingAgreement: createBillingAgreement,
                                            createSubscription: createSubscription,
                                            fundingSource: fundingSource,
                                            clientID: clientID,
                                            merchantID: merchantID,
                                            buyerCountry: buyerCountry,
                                            currency: currency,
                                            commit: commit,
                                            intent: intent,
                                            disableFunding: disableFunding,
                                            disableCard: disableCard
                                        });
                                    })).then((function(eligible) {
                                        if (eligible && clientAccessToken) return function(_ref15) {
                                            var _headers16;
                                            var orderID = _ref15.orderID;
                                            return callGraphQL({
                                                name: "EnableVault",
                                                query: "\n            mutation EnableVault(\n                $orderID : String!\n            ) {\n                enableVault(\n                    token: $orderID\n                )\n            }\n        ",
                                                variables: {
                                                    orderID: orderID
                                                },
                                                headers: (_headers16 = {}, _headers16["x-paypal-internal-euat"] = _ref15.clientAccessToken, 
                                                _headers16["paypal-client-context"] = orderID, _headers16)
                                            });
                                        }({
                                            orderID: orderID,
                                            clientAccessToken: clientAccessToken
                                        }).catch((function(err) {
                                            if (vault) throw err;
                                        }));
                                    }));
                                }({
                                    orderID: orderID,
                                    vault: vault,
                                    clientAccessToken: clientAccessToken,
                                    fundingEligibility: fundingEligibility,
                                    fundingSource: fundingSource,
                                    createBillingAgreement: createBillingAgreement,
                                    createSubscription: createSubscription,
                                    clientID: clientID,
                                    merchantID: merchantID,
                                    buyerCountry: buyerCountry,
                                    currency: currency,
                                    commit: commit,
                                    intent: intent,
                                    disableFunding: disableFunding,
                                    disableCard: disableCard,
                                    userIDToken: userIDToken
                                });
                            }));
                        }));
                        var startPromise = promise_ZalgoPromise.try((function() {
                            return updateClientConfigPromise;
                        })).then((function() {
                            return start();
                        }));
                        var validateOrderPromise = createOrder().then((function(orderID) {
                            return function(orderID, _ref3) {
                                var env = _ref3.env, clientID = _ref3.clientID, merchantID = _ref3.merchantID, currency = _ref3.currency, intent = _ref3.intent, vault = _ref3.vault, buttonLabel = _ref3.buttonLabel;
                                var logger = logger_getLogger();
                                return getSupplementalOrderInfo(orderID).then((function(order) {
                                    var _cart$supplementary, _cart$supplementary$i, _cart$supplementary2, _cart$supplementary2$;
                                    var cart = order.checkoutSession.cart;
                                    var cartIntent = "sale" === cart.intent.toLowerCase() ? "capture" : cart.intent.toLowerCase();
                                    var initiationIntent = "authorization" === (null == (_cart$supplementary = cart.supplementary) || null == (_cart$supplementary$i = _cart$supplementary.initiationIntent) ? void 0 : _cart$supplementary$i.toLowerCase()) ? "authorize" : null == (_cart$supplementary2 = cart.supplementary) || null == (_cart$supplementary2$ = _cart$supplementary2.initiationIntent) ? void 0 : _cart$supplementary2$.toLowerCase();
                                    var cartCurrency = cart.amounts && cart.amounts.total.currencyCode;
                                    var cartAmount = cart.amounts && cart.amounts.total.currencyValue;
                                    var cartBillingType = cart.billingType;
                                    cartIntent === intent || initiationIntent === intent || -1 === VALIDATE_INTENTS.indexOf(intent) || triggerIntegrationError({
                                        error: "smart_button_validation_error_incorrect_intent",
                                        message: "Expected intent from order api call to be " + intent + ", got " + cartIntent + ". Please ensure you are passing intent=" + (initiationIntent || cartIntent) + " to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/",
                                        loggerPayload: {
                                            cartIntent: cartIntent,
                                            intent: intent
                                        },
                                        env: env,
                                        clientID: clientID,
                                        orderID: orderID
                                    });
                                    if ("donate" === buttonLabel) {
                                        var itemCategory = cart.category || "";
                                        itemCategory && "DONATION" === itemCategory || triggerIntegrationError({
                                            error: "smart_button_validation_error_incorrect_item_category",
                                            message: "Expected item category from order api call to be DONATION, got " + itemCategory + ". Please ensure you are passing category=DONATION for all items in the order payload. https://developer.paypal.com/docs/checkout/reference/customize-sdk/",
                                            loggerPayload: {
                                                itemCategory: itemCategory,
                                                category: "DONATION"
                                            },
                                            env: env,
                                            clientID: clientID,
                                            orderID: orderID
                                        });
                                    }
                                    cartCurrency && cartCurrency !== currency && triggerIntegrationError({
                                        error: "smart_button_validation_error_incorrect_currency",
                                        message: "Expected currency from order api call to be " + currency + ", got " + cartCurrency + ". Please ensure you are passing currency=" + cartCurrency + " to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/",
                                        loggerPayload: {
                                            cartCurrency: cartCurrency,
                                            currency: currency
                                        },
                                        env: env,
                                        clientID: clientID,
                                        orderID: orderID
                                    });
                                    merchantID && 0 !== merchantID.length || triggerIntegrationError({
                                        error: "smart_button_validation_error_no_merchant_id",
                                        message: "Could not determine correct merchant id",
                                        env: env,
                                        clientID: clientID,
                                        orderID: orderID
                                    });
                                    cartBillingType && !vault && triggerIntegrationError({
                                        error: "smart_button_validation_error_billing_" + (cartAmount ? "with" : "without") + "_purchase_no_vault",
                                        message: "Expected vault=" + VAULT.TRUE.toString() + " for a billing transaction",
                                        env: env,
                                        clientID: clientID,
                                        orderID: orderID,
                                        loggerPayload: {
                                            cartBillingType: cartBillingType,
                                            vault: vault
                                        },
                                        throwError: !1
                                    });
                                    !vault || cartBillingType || window.xprops.createBillingAgreement || window.xprops.createSubscription || window.xprops.clientAccessToken || window.xprops.userIDToken || triggerIntegrationError({
                                        error: "smart_button_validation_error_vault_passed_not_needed",
                                        message: "Expected vault=" + VAULT.FALSE.toString() + " for a non-billing, non-subscription transaction",
                                        env: env,
                                        clientID: clientID,
                                        orderID: orderID,
                                        loggerPayload: {
                                            vault: vault,
                                            cartBillingType: cartBillingType
                                        },
                                        throwError: !1
                                    });
                                    cartBillingType && !cartAmount && "tokenize" !== intent && triggerIntegrationError({
                                        error: "smart_button_validation_error_billing_without_purchase_intent_tokenize_not_passed",
                                        message: "Expected intent=tokenize for a billing-without-purchase transaction",
                                        env: env,
                                        clientID: clientID,
                                        orderID: orderID,
                                        loggerPayload: {
                                            vault: vault,
                                            cartBillingType: cartBillingType,
                                            cartAmount: cartAmount
                                        },
                                        throwError: !1
                                    });
                                    var payees = order.checkoutSession.payees;
                                    if (!payees) return triggerIntegrationError({
                                        error: "smart_button_validation_error_supplemental_order_missing_payees",
                                        env: env,
                                        clientID: clientID,
                                        orderID: orderID,
                                        throwError: !1
                                    });
                                    if (!payees.length) return triggerIntegrationError({
                                        error: "smart_button_validation_error_supplemental_order_no_payees",
                                        env: env,
                                        clientID: clientID,
                                        orderID: orderID,
                                        throwError: !1
                                    });
                                    var dict = {};
                                    var uniquePayees = [];
                                    for (var _i2 = 0; _i2 < payees.length; _i2++) {
                                        var payee = payees[_i2];
                                        if (!(payee.merchantId || payee.email && payee.email.stringValue)) return triggerIntegrationError({
                                            error: "smart_button_validation_error_supplemental_order_missing_values",
                                            env: env,
                                            clientID: clientID,
                                            orderID: orderID,
                                            loggerPayload: {
                                                payees: JSON.stringify(payees)
                                            },
                                            throwError: !1
                                        });
                                        if (payee.merchantId) {
                                            if (!dict[payee.merchantId]) {
                                                dict[payee.merchantId] = 1;
                                                uniquePayees.push(payee);
                                            }
                                        } else if (payee.email && payee.email.stringValue && !dict[payee.email.stringValue]) {
                                            dict[payee.email.stringValue] = 1;
                                            uniquePayees.push(payee);
                                        }
                                    }
                                    var payeesStr = uniquePayees.map((function(payee) {
                                        if (payee.merchantId) return payee.merchantId;
                                        if (payee.email && payee.email.stringValue) return payee.email.stringValue;
                                        triggerIntegrationError({
                                            error: "smart_button_validation_error_invalid_payee_state",
                                            message: "Invalid payee state: " + JSON.stringify(uniquePayees),
                                            loggerPayload: {
                                                uniquePayees: JSON.stringify(uniquePayees)
                                            },
                                            env: env,
                                            clientID: clientID,
                                            orderID: orderID
                                        });
                                        throw new Error("Payees Incorrect");
                                    })).join(",");
                                    var xpropMerchantID = window.xprops.merchantID;
                                    if (xpropMerchantID && xpropMerchantID.length) isValidMerchantIDs(xpropMerchantID, uniquePayees) || triggerIntegrationError(1 === uniquePayees.length ? {
                                        error: "smart_button_validation_error_payee_no_match",
                                        message: "Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing merchant-id=" + payeesStr + " or merchant-id=" + (uniquePayees[0] && uniquePayees[0].email && uniquePayees[0].email.stringValue ? uniquePayees[0].email.stringValue : "payee@merchant.com") + " to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/",
                                        env: env,
                                        clientID: clientID,
                                        orderID: orderID
                                    } : {
                                        error: "smart_button_validation_error_payee_no_match",
                                        message: 'Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing merchant-id=* to the sdk url and data-merchant-id="' + payeesStr + '" in the sdk script tag. https://developer.paypal.com/docs/checkout/reference/customize-sdk/',
                                        env: env,
                                        clientID: clientID,
                                        orderID: orderID
                                    }); else if (!isValidMerchantIDs(merchantID, uniquePayees)) {
                                        logger.warn("smart_button_validation_error_derived_payee_transaction_mismatch", {
                                            payees: JSON.stringify(uniquePayees),
                                            merchantID: JSON.stringify(merchantID)
                                        });
                                        if (1 === uniquePayees.length) {
                                            "sandbox" === env && logger.warn("smart_button_validation_error_derived_payee_transaction_mismatch_sandbox", {
                                                payees: JSON.stringify(payees),
                                                merchantID: JSON.stringify(merchantID)
                                            });
                                            triggerIntegrationError({
                                                error: "smart_button_validation_error_payee_no_match",
                                                message: "Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing merchant-id=" + payeesStr + " or merchant-id=" + (uniquePayees[0] && uniquePayees[0].email && uniquePayees[0].email.stringValue ? uniquePayees[0].email.stringValue : "payee@merchant.com") + " to the sdk url. https://developer.paypal.com/docs/checkout/reference/customize-sdk/",
                                                env: env,
                                                clientID: clientID,
                                                orderID: orderID,
                                                throwError: !1
                                            });
                                        } else triggerIntegrationError({
                                            error: "smart_button_validation_error_payee_no_match",
                                            message: 'Payee(s) passed in transaction does not match expected merchant id. Please ensure you are passing merchant-id=* to the sdk url and data-merchant-id="' + payeesStr + '" in the sdk script tag. https://developer.paypal.com/docs/checkout/reference/customize-sdk/',
                                            env: env,
                                            clientID: clientID,
                                            orderID: orderID
                                        });
                                    }
                                }));
                            }(orderID, {
                                env: env,
                                clientID: clientID,
                                merchantID: merchantID,
                                intent: intent,
                                currency: currency,
                                vault: vault,
                                buttonLabel: buttonLabel
                            });
                        }));
                        validateOrderPromise.catch(src_util_noop);
                        var confirmOrderPromise = createOrder().then((function(orderID) {
                            return window.xprops.sessionState.get("__confirm_" + fundingSource + "_payload__").then((function(confirmOrderPayload) {
                                if (confirmOrderPayload) {
                                    return function(_ref, _ref2) {
                                        var orderID = _ref.orderID, payload = _ref.payload, partnerAttributionID = _ref.partnerAttributionID;
                                        var facilitatorAccessToken = _ref2.facilitatorAccessToken;
                                        var startTime = Date.now();
                                        return promise_ZalgoPromise.try((function() {
                                            return function(orderID, data, _ref10) {
                                                var _headers14;
                                                return callRestAPI({
                                                    accessToken: _ref10.facilitatorAccessToken,
                                                    method: "post",
                                                    eventName: "order_confirm_payment_source",
                                                    url: ORDERS_API_URL + "/" + orderID + "/confirm-payment-source",
                                                    data: data,
                                                    headers: (_headers14 = {}, _headers14["paypal-partner-attribution-id"] = _ref10.partnerAttributionID || "", 
                                                    _headers14.prefer = "return=representation", _headers14)
                                                }).then((function(_ref11) {
                                                    return _ref11.data;
                                                }));
                                            }(orderID, payload, {
                                                facilitatorAccessToken: facilitatorAccessToken,
                                                partnerAttributionID: partnerAttributionID
                                            });
                                        })).catch((function(err) {
                                            logger_getLogger().error("confirm_order_error", {
                                                err: stringifyError(err)
                                            });
                                            throw err;
                                        })).then((function() {
                                            var _getLogger$track;
                                            var duration = Date.now() - startTime;
                                            logger_getLogger().track((_getLogger$track = {}, _getLogger$track.state_name = "smart_button", 
                                            _getLogger$track.transition_name = "process_confirm_order", _getLogger$track.context_type = "EC-Token", 
                                            _getLogger$track.context_id = orderID, _getLogger$track.token = orderID, _getLogger$track.response_duration = duration.toString(), 
                                            _getLogger$track)).flush();
                                        }));
                                    }({
                                        orderID: (_ref5 = {
                                            orderID: orderID,
                                            payload: confirmOrderPayload
                                        }).orderID,
                                        payload: _ref5.payload,
                                        partnerAttributionID: partnerAttributionID
                                    }, {
                                        facilitatorAccessToken: serviceData.facilitatorAccessToken
                                    });
                                    var _ref5;
                                }
                            }));
                        }));
                        var startSequencePromise = vaultPromise.then((function() {
                            return validateOrderPromise;
                        })).then((function() {
                            return startPromise;
                        }));
                        return promise_ZalgoPromise.all([ clickPromise, startSequencePromise, confirmOrderPromise ]).catch((function(err) {
                            return promise_ZalgoPromise.try(close).then((function() {
                                throw err;
                            }));
                        })).then(src_util_noop);
                    }
                }));
            })).finally((function() {
                disableLoadingSpinner(button);
            }));
        }
        try {
            if (!window.paypal) {
                var button_script = querySelectorAll("script").find((function(el) {
                    return el.getAttribute("data-namespace");
                }));
                button_script && (window.paypal = window[button_script.getAttribute("data-namespace")]);
            }
        } catch (err) {}
        function setupButton(opts) {
            if (!window.paypal) throw new Error("PayPal SDK not loaded");
            var facilitatorAccessToken = opts.facilitatorAccessToken, fundingEligibility = opts.fundingEligibility, serverCSPNonce = opts.cspNonce, firebaseConfig = opts.firebaseConfig, _opts$correlationID = opts.correlationID, buttonCorrelationID = void 0 === _opts$correlationID ? "" : _opts$correlationID, _opts$brandedDefault = opts.brandedDefault, brandedDefault = void 0 === _opts$brandedDefault ? null : _opts$brandedDefault;
            var clientID = window.xprops.clientID;
            var serviceData = getServiceData({
                eligibility: opts.eligibility,
                facilitatorAccessToken: facilitatorAccessToken,
                buyerGeoCountry: opts.buyerCountry,
                serverMerchantID: opts.merchantID,
                fundingEligibility: fundingEligibility,
                cookies: opts.cookies,
                sdkMeta: opts.sdkMeta,
                buyerAccessToken: opts.buyerAccessToken,
                wallet: opts.wallet,
                content: opts.content,
                personalization: opts.personalization
            });
            var merchantID = serviceData.merchantID, buyerCountry = serviceData.buyerCountry;
            var props = getButtonProps({
                facilitatorAccessToken: facilitatorAccessToken,
                brandedDefault: brandedDefault
            });
            var env = props.env, sessionID = props.sessionID, partnerAttributionID = props.partnerAttributionID, commit = props.commit, sdkCorrelationID = props.sdkCorrelationID, locale = props.locale, onShippingChange = props.onShippingChange, buttonSessionID = props.buttonSessionID, merchantDomain = props.merchantDomain, onInit = props.onInit, getPrerenderDetails = props.getPrerenderDetails, rememberFunding = props.rememberFunding, getQueriedEligibleFunding = props.getQueriedEligibleFunding, style = props.style, fundingSource = props.fundingSource, intent = props.intent, createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription, stickinessID = props.stickinessID;
            var config = getConfig({
                serverCSPNonce: serverCSPNonce,
                firebaseConfig: firebaseConfig
            });
            var sdkVersion = config.sdkVersion;
            var components = getComponents();
            var _onInit = onInit({
                correlationID: buttonCorrelationID
            }), initPromise = _onInit.initPromise, isEnabled = _onInit.isEnabled;
            var paymentProcessing = !1;
            function initiatePayment(_ref) {
                var payment = _ref.payment, paymentProps = _ref.props;
                return promise_ZalgoPromise.try((function() {
                    if (!paymentProcessing) {
                        var win = payment.win, paymentFundingSource = payment.fundingSource;
                        var onClick = paymentProps.onClick;
                        var smartFields = function(fundingSource) {
                            try {
                                for (var _i2 = 0, _getAllFramesInWindow2 = getAllFramesInWindow(window); _i2 < _getAllFramesInWindow2.length; _i2++) {
                                    var win = _getAllFramesInWindow2[_i2];
                                    if (isSameDomain(win) && win.exports && "smart-fields" === win.exports.name && win.exports.fundingSource === fundingSource) return win.exports;
                                }
                            } catch (err) {}
                        }(paymentFundingSource);
                        if (!smartFields || smartFields.isValid()) {
                            onClick && onClick({
                                fundingSource: paymentFundingSource
                            });
                            if (isEnabled()) {
                                paymentProcessing = !0;
                                return initiatePaymentFlow({
                                    payment: payment,
                                    config: config,
                                    serviceData: serviceData,
                                    components: components,
                                    props: paymentProps
                                }).finally((function() {
                                    paymentProcessing = !1;
                                }));
                            }
                            win && win.close();
                        } else win && win.close();
                    }
                })).catch((function(err) {
                    var _getLogger$info$track;
                    logger_getLogger().info("smart_buttons_payment_error", {
                        err: stringifyError(err)
                    }).track(((_getLogger$info$track = {}).ext_error_code = "smart_buttons_payment_error", 
                    _getLogger$info$track.ext_error_desc = stringifyErrorMessage(err), _getLogger$info$track));
                    throw err;
                }));
            }
            menu_menu = null;
            querySelectorAll("[ data-funding-source ]").forEach((function(button) {
                var menuToggle = function(button) {
                    var menu = button.querySelector("[data-menu]");
                    if (menu) return menu;
                    var parent = button.parentNode;
                    parent && (menu = parent.querySelector("[data-menu]"));
                    return menu || void 0;
                }(button);
                var _getSelectedFunding = function(button) {
                    var fundingSource = button.getAttribute("data-funding-source");
                    var paymentMethodID = button.getAttribute("data-payment-method-id");
                    var instrumentID = button.getAttribute("data-instrument-id");
                    var instrumentType = button.getAttribute("data-instrument-type");
                    return {
                        fundingSource: fundingSource,
                        card: button.getAttribute("data-card"),
                        paymentMethodID: paymentMethodID,
                        instrumentID: instrumentID,
                        instrumentType: instrumentType
                    };
                }(button);
                var payment = {
                    button: button,
                    menuToggle: menuToggle,
                    fundingSource: _getSelectedFunding.fundingSource,
                    card: _getSelectedFunding.card,
                    paymentMethodID: _getSelectedFunding.paymentMethodID,
                    instrumentID: _getSelectedFunding.instrumentID,
                    instrumentType: _getSelectedFunding.instrumentType,
                    isClick: !0,
                    buyerIntent: "pay"
                };
                onFocus = function onFocus(event) {
                    el.removeEventListener("focus", onFocus);
                    event.preventDefault();
                    el.blur();
                    return !1;
                }, (el = button).addEventListener("mousedown", (function() {
                    el.addEventListener("focus", onFocus);
                    setTimeout((function() {
                        el.removeEventListener("focus", onFocus);
                    }), 1);
                }));
                var el, onFocus;
                dom_onClick(button, (function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var paymentProps = getButtonProps({
                        facilitatorAccessToken: facilitatorAccessToken,
                        brandedDefault: brandedDefault
                    });
                    var payPromise = initiatePayment({
                        payment: payment,
                        props: paymentProps
                    });
                    var onError = paymentProps.onError;
                    payPromise.catch((function(err) {
                        logger_getLogger().warn("click_initiate_payment_reject", {
                            err: stringifyError(err)
                        }).flush();
                        onError(err);
                    }));
                    button.payPromise = payPromise;
                }));
                if (menuToggle) {
                    !function(_ref2) {
                        var props = _ref2.props;
                        var clientID = props.clientID;
                        clientID && renderButtonSmartMenu({
                            containerUID: props.uid,
                            clientID: clientID,
                            Menu: _ref2.components.Menu
                        });
                    }({
                        props: props,
                        components: components
                    });
                    dom_onClick(menuToggle, (function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        var menuPromise = function(_ref2) {
                            var payment = _ref2.payment;
                            return promise_ZalgoPromise.try((function() {
                                if (!paymentProcessing) return isEnabled() ? function(_ref6) {
                                    var payment = _ref6.payment, serviceData = _ref6.serviceData, config = _ref6.config, components = _ref6.components, props = _ref6.props;
                                    return promise_ZalgoPromise.try((function() {
                                        var _getLogger$info$info$;
                                        var fundingSource = payment.fundingSource, button = payment.button;
                                        var _getPaymentFlow2 = getPaymentFlow({
                                            props: props,
                                            payment: payment,
                                            config: config,
                                            components: components,
                                            serviceData: serviceData
                                        }), name = _getPaymentFlow2.name, setupMenu = _getPaymentFlow2.setupMenu;
                                        if (!setupMenu) throw new Error(name + " does not support menu");
                                        logger_getLogger().info("menu_click").info("pay_flow_" + name).track((_getLogger$info$info$ = {}, 
                                        _getLogger$info$info$.transition_name = "process_menu_click", _getLogger$info$info$.selected_payment_method = fundingSource, 
                                        _getLogger$info$info$.payment_flow = name, _getLogger$info$info$)).flush();
                                        var choices = setupMenu({
                                            props: props,
                                            payment: payment,
                                            serviceData: serviceData,
                                            components: components,
                                            config: config
                                        }).map((function(choice) {
                                            return _extends({}, choice, {
                                                onSelect: function() {
                                                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                                                    choice.spinner && enableLoadingSpinner(button);
                                                    return promise_ZalgoPromise.try((function() {
                                                        return choice.onSelect.apply(choice, args);
                                                    })).then((function() {
                                                        choice.spinner && disableLoadingSpinner(button);
                                                    }));
                                                }
                                            });
                                        }));
                                        return function(_ref3) {
                                            var props = _ref3.props, payment = _ref3.payment, choices = _ref3.choices;
                                            var clientID = props.clientID, containerUID = props.uid;
                                            var button = payment.button, menuToggle = payment.menuToggle;
                                            var Menu = _ref3.components.Menu;
                                            if (!clientID) throw new Error("Can not render menu without client id");
                                            var smartMenu = menu_menu || renderButtonSmartMenu({
                                                containerUID: containerUID,
                                                clientID: clientID,
                                                Menu: Menu
                                            });
                                            menu_menu = smartMenu;
                                            var loadingTimeout = setTimeout((function() {
                                                return enableLoadingSpinner(button);
                                            }), 50);
                                            var updateProps = function() {
                                                return smartMenu.updateProps({
                                                    clientID: clientID,
                                                    choices: choices,
                                                    verticalOffset: button.getBoundingClientRect().bottom,
                                                    onFocusFail: onFocusFail,
                                                    onBlur: onBlur
                                                });
                                            };
                                            window.addEventListener("resize", updateProps);
                                            var onBlur = function() {
                                                smartMenu.hide();
                                                window.removeEventListener("resize", updateProps);
                                            };
                                            var onFocusFail = function() {
                                                menuToggle && menuToggle.addEventListener("blur", (function blur() {
                                                    menuToggle.removeEventListener("blur", blur);
                                                    onBlur();
                                                }));
                                            };
                                            return updateProps().then((function() {
                                                return smartMenu.show();
                                            })).then((function() {
                                                disableLoadingSpinner(button);
                                            })).finally((function() {
                                                clearTimeout(loadingTimeout);
                                            }));
                                        }({
                                            props: props,
                                            payment: payment,
                                            components: components,
                                            choices: choices
                                        });
                                    }));
                                }({
                                    payment: payment,
                                    config: config,
                                    serviceData: serviceData,
                                    components: components,
                                    props: props
                                }) : void 0;
                            })).catch((function(err) {
                                var _getLogger$info$track2;
                                logger_getLogger().info("smart_buttons_payment_error", {
                                    err: stringifyError(err)
                                }).track(((_getLogger$info$track2 = {}).ext_error_code = "smart_buttons_payment_error", 
                                _getLogger$info$track2.ext_error_desc = stringifyErrorMessage(err), _getLogger$info$track2));
                                throw err;
                            }));
                        }({
                            payment: payment
                        });
                        button.menuPromise = menuPromise;
                    }));
                }
            }));
            var setupPrerenderTask = initPromise.then((function() {
                return promise_ZalgoPromise.hash({
                    prerenderDetails: getPrerenderDetails(),
                    initPromise: initPromise
                }).then((function(_ref3) {
                    var prerenderDetails = _ref3.prerenderDetails;
                    if (prerenderDetails) {
                        var win = prerenderDetails.win, paymentFundingSource = prerenderDetails.fundingSource, card = prerenderDetails.card;
                        var button = document.querySelector("[data-funding-source=" + paymentFundingSource + "]");
                        if (!button) throw new Error("Can not find button element");
                        var paymentProps = getButtonProps({
                            facilitatorAccessToken: facilitatorAccessToken,
                            brandedDefault: brandedDefault
                        });
                        var payPromise = initiatePayment({
                            payment: {
                                win: win,
                                button: button,
                                fundingSource: paymentFundingSource,
                                card: card,
                                buyerIntent: "pay"
                            },
                            props: paymentProps
                        });
                        var onError = paymentProps.onError;
                        payPromise.catch((function(err) {
                            logger_getLogger().error("prerender_initiate_payment_reject", {
                                err: stringifyError(err)
                            }).flush();
                            onError(err);
                        }));
                        button.payPromise = payPromise;
                    }
                }));
            }));
            var setupRememberTask = function(_ref) {
                var rememberFunding = _ref.rememberFunding, fundingEligibility = _ref.fundingEligibility;
                return promise_ZalgoPromise.try((function() {
                    if (fundingEligibility && fundingEligibility.venmo && fundingEligibility.venmo.eligible) return rememberFunding([ "venmo" ]);
                }));
            }({
                rememberFunding: rememberFunding,
                fundingEligibility: fundingEligibility
            });
            var setupButtonLogsTask = function(_ref) {
                var env = _ref.env, sessionID = _ref.sessionID, buttonSessionID = _ref.buttonSessionID, clientID = _ref.clientID, partnerAttributionID = _ref.partnerAttributionID, commit = _ref.commit, sdkCorrelationID = _ref.sdkCorrelationID, buttonCorrelationID = _ref.buttonCorrelationID, locale = _ref.locale, merchantID = _ref.merchantID, merchantDomain = _ref.merchantDomain, sdkVersion = _ref.sdkVersion, style = _ref.style, fundingSource = _ref.fundingSource, getQueriedEligibleFunding = _ref.getQueriedEligibleFunding, stickinessID = _ref.stickinessID, buyerCountry = _ref.buyerCountry, onShippingChange = _ref.onShippingChange;
                var logger = logger_getLogger();
                !function(_ref2) {
                    var env = _ref2.env, sessionID = _ref2.sessionID, clientID = _ref2.clientID, sdkCorrelationID = _ref2.sdkCorrelationID, buyerCountry = _ref2.buyerCountry, locale = _ref2.locale, sdkVersion = _ref2.sdkVersion, fundingSource = _ref2.fundingSource;
                    var logger = logger_getLogger();
                    logger.addPayloadBuilder((function() {
                        return {
                            referer: window.location.host,
                            sdkCorrelationID: sdkCorrelationID,
                            sessionID: sessionID,
                            clientID: clientID,
                            env: env
                        };
                    }));
                    logger.addTrackingBuilder((function() {
                        var _ref3;
                        var lang = locale.lang, country = locale.country;
                        return (_ref3 = {}).feed_name = "payments_sdk", _ref3.serverside_data_source = "checkout", 
                        _ref3.client_id = clientID, _ref3.page_session_id = sessionID, _ref3.referer_url = window.location.host, 
                        _ref3.buyer_cntry = buyerCountry, _ref3.locale = lang + "_" + country, _ref3.integration_identifier = clientID, 
                        _ref3.sdk_environment = isIos() ? "iOS" : isAndroid() ? "android" : null, _ref3.sdk_name = "payments_sdk", 
                        _ref3.sdk_version = sdkVersion, _ref3.user_agent = window.navigator && window.navigator.userAgent, 
                        _ref3.context_correlation_id = sdkCorrelationID, _ref3.t = Date.now().toString(), 
                        _ref3.selected_payment_method = fundingSource, _ref3;
                    }));
                    promise_ZalgoPromise.onPossiblyUnhandledException((function(err) {
                        var _logger$track;
                        logger.track(((_logger$track = {}).ext_error_code = "payments_sdk_error", _logger$track.ext_error_desc = stringifyErrorMessage(err), 
                        _logger$track));
                        logger.error("unhandled_error", {
                            err: stringifyError(err)
                        });
                        logger.flush().catch(src_util_noop);
                    }));
                }({
                    env: env,
                    sessionID: sessionID,
                    clientID: clientID,
                    sdkCorrelationID: sdkCorrelationID,
                    locale: locale,
                    sdkVersion: sdkVersion,
                    buyerCountry: buyerCountry,
                    fundingSource: fundingSource
                });
                logger.addPayloadBuilder((function() {
                    var _ref2;
                    return (_ref2 = {
                        buttonSessionID: buttonSessionID,
                        buttonCorrelationID: buttonCorrelationID
                    }).user_id = buttonSessionID, _ref2;
                }));
                logger.addTrackingBuilder((function() {
                    var _ref3;
                    return (_ref3 = {}).state_name = "smart_button", _ref3.context_type = "button_session_id", 
                    _ref3.context_id = buttonSessionID, _ref3.button_session_id = buttonSessionID, _ref3.button_version = "5.0.68", 
                    _ref3.button_correlation_id = buttonCorrelationID, _ref3.stickiness_id = isAndroidChrome() ? stickinessID : null, 
                    _ref3.bn_code = partnerAttributionID, _ref3.user_action = commit ? "commit" : "continue", 
                    _ref3.seller_id = merchantID[0], _ref3.merchant_domain = merchantDomain, _ref3.t = Date.now().toString(), 
                    _ref3.user_id = buttonSessionID, _ref3;
                }));
                (function() {
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
                })() && logger.warn("button_child_intranet_mode");
                return promise_ZalgoPromise.hash({
                    pageRenderTime: waitForDocumentReady().then((function() {
                        var performance = getPerformance();
                        if (performance) {
                            var timing = performance.timing;
                            return timing.connectEnd && timing.domInteractive ? timing.domInteractive - timing.connectEnd : void 0;
                        }
                    })),
                    queriedEligibleFunding: getQueriedEligibleFunding()
                }).then((function(_ref4) {
                    var _logger$track;
                    var pageRenderTime = _ref4.pageRenderTime, queriedEligibleFunding = _ref4.queriedEligibleFunding;
                    var fundingSources = querySelectorAll("[data-funding-source]").map((function(el) {
                        return el.getAttribute("data-funding-source");
                    })).filter(Boolean);
                    var walletInstruments = querySelectorAll("[data-instrument-type]").map((function(el) {
                        return el.getAttribute("data-instrument-type");
                    })).filter(Boolean);
                    var payNow = querySelectorAll("[data-funding-source]").map((function(el) {
                        return el.getAttribute("data-pay-now");
                    })).some(Boolean);
                    var layout = style.layout, color = style.color, shape = style.shape, label = style.label, _style$tagline = style.tagline, tagline = void 0 === _style$tagline || _style$tagline;
                    var native_device = "non_native";
                    isIOSSafari() ? native_device = "ios_safari" : isAndroidChrome() && (native_device = "android_chrome");
                    logger.info("button_render");
                    logger.info("button_render_template_version_" + (document.body && document.body.getAttribute("data-render-version") || "unknown").replace(/[^a-zA-Z0-9]+/g, "_"));
                    logger.info("button_render_client_version_" + (document.body && document.body.getAttribute("data-client-version") || "unknown").replace(/[^a-zA-Z0-9]+/g, "_"));
                    logger.info("button_render_color_" + color);
                    logger.info("button_render_shape_" + shape);
                    logger.info("button_render_label_" + label);
                    logger.info("button_render_layout_" + layout);
                    logger.info("button_render_tagline_" + tagline.toString());
                    logger.info("button_render_funding_count_" + fundingSources.length);
                    logger.info("button_render_wallet_instrument_count_" + walletInstruments.length);
                    logger.info("button_render_" + native_device + "_storage_state_" + (isStorageStateFresh() ? "fresh" : "not_fresh"));
                    for (var _i2 = 0; _i2 < walletInstruments.length; _i2++) logger.info("button_render_wallet_instrument_" + walletInstruments[_i2]);
                    logger.track(((_logger$track = {}).transition_name = "process_button_load", _logger$track.eligible_payment_methods = fundingSources.join(":"), 
                    _logger$track.fi_list = walletInstruments.join(":"), _logger$track.merchant_selected_funding_source = fundingSource, 
                    _logger$track.eligible_payment_count = fundingSources.length.toString(), _logger$track.page_load_time = pageRenderTime ? pageRenderTime.toString() : "", 
                    _logger$track.potential_payment_methods = queriedEligibleFunding.join(":"), _logger$track.pay_now = payNow.toString(), 
                    _logger$track.button_layout = layout, _logger$track.button_color = color, _logger$track.button_size = "responsive", 
                    _logger$track.button_shape = shape, _logger$track.button_label = label, _logger$track.button_width = window.innerWidth, 
                    _logger$track.button_type = "iframe", _logger$track.button_tagline_enabled = tagline ? "1" : "0", 
                    _logger$track.shipping_callback_passed = onShippingChange ? "1" : "0", _logger$track));
                    logger.flush();
                }));
            }({
                style: style,
                env: env,
                sdkVersion: sdkVersion,
                sessionID: sessionID,
                clientID: clientID,
                partnerAttributionID: partnerAttributionID,
                commit: commit,
                sdkCorrelationID: sdkCorrelationID,
                stickinessID: stickinessID,
                buttonCorrelationID: buttonCorrelationID,
                locale: locale,
                merchantID: merchantID,
                buttonSessionID: buttonSessionID,
                merchantDomain: merchantDomain,
                fundingSource: fundingSource,
                getQueriedEligibleFunding: getQueriedEligibleFunding,
                buyerCountry: buyerCountry,
                onShippingChange: onShippingChange
            });
            var setupPaymentFlowsTask = function(_ref) {
                var props = _ref.props, config = _ref.config, serviceData = _ref.serviceData, components = _ref.components;
                return promise_ZalgoPromise.all(PAYMENT_FLOWS.map((function(flow) {
                    return flow.isEligible({
                        props: props,
                        config: config,
                        serviceData: serviceData
                    }) ? flow.setup({
                        props: props,
                        config: config,
                        serviceData: serviceData,
                        components: components
                    }) : null;
                }))).then(src_util_noop);
            }({
                props: props,
                config: config,
                serviceData: serviceData,
                components: components
            });
            var setupExportsTask = function(_ref) {
                var props = _ref.props, isEnabled = _ref.isEnabled;
                var _createOrder = props.createOrder, _onApprove = props.onApprove, onError = props.onError, onCancel = props.onCancel, onClick = props.onClick, fundingSource = props.fundingSource, commit = props.commit, intent = props.intent, currency = props.currency;
                var fundingSources = querySelectorAll("[data-funding-source]").map((function(el) {
                    return el.getAttribute("data-funding-source");
                })).filter(Boolean);
                window.exports = {
                    name: "smart-payment-buttons",
                    commit: {
                        commit: commit,
                        currency: currency,
                        intent: intent
                    },
                    paymentSession: function() {
                        return {
                            getAvailableFundingSources: function() {
                                return fundingSources;
                            },
                            createOrder: function() {
                                if (!isEnabled()) throw new Error("Error occurred. Button not enabled.");
                                return promise_ZalgoPromise.hash({
                                    valid: !onClick || !fundingSource || onClick({
                                        fundingSource: fundingSource
                                    })
                                }).then((function(_ref2) {
                                    if (_ref2.valid) return _createOrder();
                                    throw new Error("Error occurred during async validation");
                                }));
                            },
                            onApprove: function(merchantData) {
                                return _onApprove({
                                    payerID: merchantData.payerID
                                }, {
                                    restart: function() {
                                        throw new Error("Action unimplemented");
                                    }
                                });
                            },
                            onCancel: onCancel,
                            onError: onError
                        };
                    }
                };
            }({
                props: props,
                isEnabled: isEnabled
            });
            var validatePropsTask = setupButtonLogsTask.then((function() {
                return function(_ref2) {
                    var env = _ref2.env, clientID = _ref2.clientID, intent = _ref2.intent, createBillingAgreement = _ref2.createBillingAgreement, createSubscription = _ref2.createSubscription;
                    var logger = logger_getLogger();
                    createBillingAgreement && "tokenize" !== intent && triggerIntegrationError({
                        error: "smart_button_validation_error_expected_intent_tokenize",
                        message: "Expected intent=tokenize to be passed to SDK with createBillingAgreement, but got intent=" + intent,
                        env: env,
                        clientID: clientID,
                        loggerPayload: {
                            intent: intent
                        },
                        throwError: !1
                    });
                    createSubscription && "subscription" !== intent && triggerIntegrationError({
                        error: "smart_button_validation_error_expected_intent_subscription",
                        message: "Expected intent=subscription to be passed to SDK with createSubscription, but got intent=" + intent,
                        env: env,
                        clientID: clientID,
                        loggerPayload: {
                            intent: intent
                        },
                        throwError: !1
                    });
                    logger.flush();
                }({
                    env: env,
                    clientID: clientID,
                    intent: intent,
                    createBillingAgreement: createBillingAgreement,
                    createSubscription: createSubscription
                });
            }));
            return promise_ZalgoPromise.hash({
                initPromise: initPromise,
                facilitatorAccessToken: facilitatorAccessToken,
                setupButtonLogsTask: setupButtonLogsTask,
                setupPrerenderTask: setupPrerenderTask,
                setupRememberTask: setupRememberTask,
                setupPaymentFlowsTask: setupPaymentFlowsTask,
                validatePropsTask: validatePropsTask,
                setupExportsTask: setupExportsTask
            }).then(src_util_noop);
        }
    }
});