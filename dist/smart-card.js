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
    return __webpack_require__(__webpack_require__.s = 2);
}([ function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(1);
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
            return O;
        })), S.d(N, "PROTOCOL", (function() {
            return Z;
        })), S.d(N, "PAGE_TYPES", (function() {
            return i;
        })), S.d(N, "MERCHANT_ID_MAX", (function() {
            return M;
        })), S.d(N, "PLATFORM", (function() {
            return k;
        })), S.d(N, "TYPES", (function() {
            return g;
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
            ZH: "zh"
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
            HK: [ t.EN, t.ZH ],
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
            TW: [ t.ZH, t.EN ],
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
        }, O = "unknown", Z = {
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
            OPTION_SELECTED: "optsel"
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
        }, k = {
            DESKTOP: "desktop",
            MOBILE: "mobile"
        }, g = !0;
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
    __webpack_require__.d(__webpack_exports__, "CardCVVField", (function() {
        return CardCVVField;
    }));
    __webpack_require__.d(__webpack_exports__, "CardExpiryField", (function() {
        return CardExpiryField;
    }));
    __webpack_require__.d(__webpack_exports__, "hasCardFields", (function() {
        return hasCardFields;
    }));
    __webpack_require__.d(__webpack_exports__, "getCardFields", (function() {
        return getCardFields;
    }));
    __webpack_require__.d(__webpack_exports__, "submitCardFields", (function() {
        return submitCardFields;
    }));
    var n, l, preact_module_u, preact_module_t, preact_module_o, preact_module_r, e = {}, c = [], s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
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
        return null != l.vnode && l.vnode(f), f;
    }
    function d(n) {
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
        for (u.__k = [], h = 0; h < l.length; h++) if (null != (_ = u.__k[h] = null == (_ = l[h]) || "boolean" == typeof _ ? null : "string" == typeof _ || "number" == typeof _ || "bigint" == typeof _ ? y(null, _, null, null, _) : Array.isArray(_) ? y(d, {
            children: _
        }, null, null, null) : _.__b > 0 ? y(_.type, _.props, _.key, null, _.__v) : _)) {
            if (_.__ = u, _.__b = u.__b + 1, null === (p = w[h]) || p && _.key == p.key && _.type === p.type) w[h] = void 0; else for (v = 0; v < A; v++) {
                if ((p = w[v]) && _.key == p.key && _.type === p.type) {
                    w[v] = void 0;
                    break;
                }
                p = null;
            }
            j(n, _, p = p || e, t, o, r, f, s, a), b = _.__e, (v = _.ref) && p.ref != v && (g || (g = []), 
            p.ref && g.push(p.ref, null, _), g.push(v, _.__c || b, _)), null != b ? (null == m && (m = b), 
            "function" == typeof _.type && null != _.__k && _.__k === p.__k ? _.__d = s = x(_, s, n) : s = P(n, _, p, w, b, s), 
            a || "option" !== u.type ? "function" == typeof u.type && (u.__d = s) : n.value = "") : s && p.__e == s && s.parentNode != n && (s = k(p));
        }
        for (u.__e = m, h = A; h--; ) null != w[h] && ("function" == typeof u.type && null != w[h].__e && w[h].__e == u.__d && (u.__d = k(i, h + 1)), 
        N(w[h], w[h]));
        if (g) for (h = 0; h < g.length; h++) M(g[h], g[++h], g[++h]);
    }
    function x(n, l, u) {
        var i, t;
        for (i = 0; i < n.__k.length; i++) (t = n.__k[i]) && (t.__ = n, l = "function" == typeof t.type ? x(t, l, u) : P(u, t, t, n.__k, t.__e, l));
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
            if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s"); else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
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
                A = null != s && s.type === d && null == s.key ? s.props.children : s, w(n, Array.isArray(A) ? A : [ A ], u, i, t, o, r, f, e, c), 
                h.base = u.__e, u.__h = null, h.__h.length && f.push(h), b && (h.__E = h.__ = null), 
                h.__e = !1;
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
        if ("svg" === d && (o = !0), null != r) for (;_ < r.length; _++) if ((s = r[_]) && (s === l || (d ? s.localName == d : 3 == s.nodeType))) {
            l = s, r[_] = null;
            break;
        }
        if (null == l) {
            if (null === d) return document.createTextNode(p);
            l = o ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), 
            r = null, c = !1;
        }
        if (null === d) y === p || c && l.data === p || (l.data = p); else {
            if (r = r && n.call(l.childNodes), a = (y = i.props || e).dangerouslySetInnerHTML, 
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
            c || ("value" in p && void 0 !== (_ = p.value) && (_ !== l.value || "progress" === d && !_) && H(l, "value", _, y.value, !1), 
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
        __e: function(n, l) {
            for (var u, i, t; l = l.__; ) if ((u = l.__c) && !u.__) try {
                if ((i = u.constructor) && null != i.getDerivedStateFromError && (u.setState(i.getDerivedStateFromError(n)), 
                t = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), t = u.__d), 
                t) return u.__E = u;
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
    }, _.prototype.render = d, preact_module_t = [], preact_module_o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
    g.__r = 0;
    var hooks_module_t, hooks_module_u, hooks_module_r, hooks_module_o = 0, hooks_module_i = [], hooks_module_c = l.__b, hooks_module_f = l.__r, hooks_module_e = l.diffed, hooks_module_a = l.__c, hooks_module_v = l.unmount;
    function hooks_module_m(t, r) {
        l.__h && l.__h(hooks_module_u, t, hooks_module_o || r), hooks_module_o = 0;
        var i = hooks_module_u.__H || (hooks_module_u.__H = {
            __: [],
            __h: []
        });
        return t >= i.__.length && i.__.push({}), i.__[t];
    }
    function hooks_module_l(n) {
        return hooks_module_o = 1, function(n, r, o) {
            var i = hooks_module_m(hooks_module_t++, 2);
            return i.t = n, i.__c || (i.__ = [ hooks_module_w(void 0, r), function(n) {
                var t = i.t(i.__[0], n);
                i.__[0] !== t && (i.__ = [ t, i.__[1] ], i.__c.setState({}));
            } ], i.__c = hooks_module_u), i.__;
        }(hooks_module_w, n);
    }
    function hooks_module_y(r, o) {
        var i = hooks_module_m(hooks_module_t++, 3);
        !l.__s && function(n, t) {
            return !n || n.length !== t.length || t.some((function(t, u) {
                return t !== n[u];
            }));
        }(i.__H, o) && (i.__ = r, i.__H = o, hooks_module_u.__H.__h.push(i));
    }
    function hooks_module_x() {
        hooks_module_i.forEach((function(t) {
            if (t.__P) try {
                t.__H.__h.forEach(hooks_module_g), t.__H.__h.forEach(hooks_module_j), t.__H.__h = [];
            } catch (u) {
                t.__H.__h = [], l.__e(u, t.__v);
            }
        })), hooks_module_i = [];
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
        })(hooks_module_x)), hooks_module_u = void 0;
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
        var u = t.__c;
        if (u && u.__H) try {
            u.__H.__.forEach(hooks_module_g);
        } catch (t) {
            l.__e(t, u.__v);
        }
    };
    var hooks_module_b = "function" == typeof requestAnimationFrame;
    function hooks_module_g(n) {
        var t = hooks_module_u;
        "function" == typeof n.__c && n.__c(), hooks_module_u = t;
    }
    function hooks_module_j(n) {
        var t = hooks_module_u;
        n.__c = n.__(), hooks_module_u = t;
    }
    function hooks_module_w(n, t) {
        return "function" == typeof t ? t(n) : t;
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
    function httpTransport(_ref) {
        var url = _ref.url, method = _ref.method, headers = _ref.headers, json = _ref.json, _ref$enableSendBeacon = _ref.enableSendBeacon, enableSendBeacon = void 0 !== _ref$enableSendBeacon && _ref$enableSendBeacon;
        return promise_ZalgoPromise.try((function() {
            var hasHeaders = headers && Object.keys(headers).length;
            if (window && window.navigator.sendBeacon && !hasHeaders && enableSendBeacon && window.Blob) try {
                var blob = new Blob([ JSON.stringify(json) ], {
                    type: "application/json"
                });
                return window.navigator.sendBeacon(url, blob);
            } catch (e) {}
            return request({
                url: url,
                method: method,
                headers: headers,
                json: json
            });
        })).then(src_util_noop);
    }
    function extendIfDefined(target, source) {
        for (var key in source) source.hasOwnProperty(key) && source[key] && !target[key] && (target[key] = source[key]);
    }
    var _FUNDING_SKIP_LOGIN, _AMPLITUDE_API_KEY;
    (_FUNDING_SKIP_LOGIN = {}).paypal = "paypal", _FUNDING_SKIP_LOGIN.paylater = "paypal", 
    _FUNDING_SKIP_LOGIN.credit = "paypal";
    (_AMPLITUDE_API_KEY = {}).test = "a23fb4dfae56daf7c3212303b53a8527", _AMPLITUDE_API_KEY.local = "a23fb4dfae56daf7c3212303b53a8527", 
    _AMPLITUDE_API_KEY.stage = "a23fb4dfae56daf7c3212303b53a8527", _AMPLITUDE_API_KEY.sandbox = "a23fb4dfae56daf7c3212303b53a8527", 
    _AMPLITUDE_API_KEY.production = "ce423f79daba95faeb0694186170605c";
    function getLogger() {
        return inlineMemoize(getLogger, (function() {
            return function(_ref2) {
                var url = _ref2.url, prefix = _ref2.prefix, _ref2$logLevel = _ref2.logLevel, logLevel = void 0 === _ref2$logLevel ? "warn" : _ref2$logLevel, _ref2$transport = _ref2.transport, transport = void 0 === _ref2$transport ? httpTransport : _ref2$transport, amplitudeApiKey = _ref2.amplitudeApiKey, _ref2$flushInterval = _ref2.flushInterval, flushInterval = void 0 === _ref2$flushInterval ? 6e4 : _ref2$flushInterval, _ref2$enableSendBeaco = _ref2.enableSendBeacon, enableSendBeacon = void 0 !== _ref2$enableSendBeaco && _ref2$enableSendBeaco;
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
                                headers: {
                                    "content-type": "application/json"
                                },
                                json: {
                                    api_key: amplitudeApiKey,
                                    events: tracking.map((function(payload) {
                                        return _extends({
                                            event_type: payload.transition_name || "event",
                                            event_properties: payload
                                        }, payload);
                                    }))
                                }
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
            name: "paypal"
        });
    }
    var _CARD_FIELD_TYPE_TO_F;
    var CARD_FIELD_TYPE_TO_FRAME_NAME = ((_CARD_FIELD_TYPE_TO_F = {}).single = "card-field", 
    _CARD_FIELD_TYPE_TO_F.number = "card-number-field", _CARD_FIELD_TYPE_TO_F.cvv = "card-cvv-field", 
    _CARD_FIELD_TYPE_TO_F.expiry = "card-expiry-field", _CARD_FIELD_TYPE_TO_F);
    var sdk_constants = __webpack_require__(0);
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
                getLogger().warn("graphql_" + name + "_error", {
                    err: message
                });
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
    function submitCardFields(_ref) {
        var intent = _ref.intent, branded = _ref.branded, vault = _ref.vault, createOrder = _ref.createOrder, onApprove = _ref.onApprove;
        return promise_ZalgoPromise.try((function() {
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
                    var _ref6;
                    return (_ref6 = {}).token = orderID, _ref6;
                })).track((_getLogger$addPayload = {}, _getLogger$addPayload.state_name = "smart_button", 
                _getLogger$addPayload.transition_name = "process_receive_order", _getLogger$addPayload.context_type = "EC-Token", 
                _getLogger$addPayload.context_id = orderID, _getLogger$addPayload.token = orderID, 
                _getLogger$addPayload.response_duration = duration.toString(), _getLogger$addPayload)).flush();
                return orderID;
            }));
        }));
    }
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
        var stickinessID = storageID && getSDKStorage().isStateFresh() ? storageID : getSDKStorage().getID();
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
                    getLogger().info("src_props_subscriptions_recreate_access_token_cache");
                    createAccessToken(clientID, {
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
        var onApprove = function(_ref4, _ref5) {
            var intent = _ref4.intent, _ref4$onApprove = _ref4.onApprove, onApprove = void 0 === _ref4$onApprove ? function(intent) {
                return function(data, actions) {
                    if ("capture" === intent) return actions.order.capture().then(src_util_noop);
                    if ("authorize" === intent) return actions.order.authorize().then(src_util_noop);
                    throw new Error("Unsupported intent for auto-capture: " + intent);
                };
            }(intent) : _ref4$onApprove, partnerAttributionID = _ref4.partnerAttributionID, onError = _ref4.onError, clientAccessToken = _ref4.clientAccessToken, vault = _ref4.vault, clientID = _ref4.clientID;
            var facilitatorAccessToken = _ref5.facilitatorAccessToken, branded = _ref5.branded, createOrder = _ref5.createOrder;
            if (!onApprove) throw new Error("Expected onApprove");
            var upgradeLSAT = -1 === LSAT_UPGRADE_EXCLUDED_MERCHANTS.indexOf(clientID);
            return memoize((function(_ref6, _ref7) {
                var payerID = _ref6.payerID, paymentID = _ref6.paymentID, billingToken = _ref6.billingToken, subscriptionID = _ref6.subscriptionID, buyerAccessToken = _ref6.buyerAccessToken, authCode = _ref6.authCode, _ref6$forceRestAPI = _ref6.forceRestAPI, forceRestAPI = void 0 === _ref6$forceRestAPI ? upgradeLSAT : _ref6$forceRestAPI;
                var restart = _ref7.restart;
                return promise_ZalgoPromise.try((function() {
                    return createOrder();
                })).then((function(orderID) {
                    var _getLogger$info$track;
                    getLogger().info("button_approve").track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_checkout_approve", 
                    _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                    _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                    billingToken || subscriptionID || clientAccessToken || vault || !payerID && branded && getLogger().error("onapprove_payerid_not_present_for_branded_standalone_button", {
                        orderID: orderID
                    }).flush();
                    return getSupplementalOrderInfo(orderID).then((function(supplementalData) {
                        var data = {
                            orderID: orderID,
                            payerID: payerID,
                            paymentID: paymentID = paymentID || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.paymentId,
                            billingToken: billingToken = billingToken || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.billingToken,
                            subscriptionID: subscriptionID,
                            facilitatorAccessToken: facilitatorAccessToken,
                            authCode: authCode
                        };
                        var actions = function(_ref3) {
                            var intent = _ref3.intent, orderID = _ref3.orderID, paymentID = _ref3.paymentID, payerID = _ref3.payerID, restart = _ref3.restart, subscriptionID = _ref3.subscriptionID, facilitatorAccessToken = _ref3.facilitatorAccessToken, buyerAccessToken = _ref3.buyerAccessToken, partnerAttributionID = _ref3.partnerAttributionID, forceRestAPI = _ref3.forceRestAPI;
                            var getSubscriptionApi = memoize((function() {
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
                            }));
                            var activateSubscriptionApi = memoize((function() {
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
                            }));
                            var order = function(_ref) {
                                var intent = _ref.intent, orderID = _ref.orderID, restart = _ref.restart, facilitatorAccessToken = _ref.facilitatorAccessToken, buyerAccessToken = _ref.buyerAccessToken, partnerAttributionID = _ref.partnerAttributionID, forceRestAPI = _ref.forceRestAPI;
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
                                                _headers5.prefer = "return=representation", _headers5)
                                            }).catch((function(err) {
                                                var _headers6;
                                                var restCorrID = getErrorResponseCorrelationID(err);
                                                getLogger().warn("capture_order_call_rest_api_error", {
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
                                        return onApprove_handleProcessorError(err, restart);
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
                            intent: intent = intent || supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.intent,
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
            }));
        }({
            onApprove: xprops.onApprove,
            intent: intent,
            onError: onError,
            partnerAttributionID: partnerAttributionID,
            clientAccessToken: clientAccessToken,
            vault: vault,
            clientID: clientID
        }, {
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
                    _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
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
                getLogger().info("spb_onauth_access_token_" + (accessToken ? "present" : "not_present"));
                return promise_ZalgoPromise.try((function() {
                    if (accessToken) return upgradeLSAT ? createOrder().then((function(orderID) {
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
    function CardField(_ref) {
        var cspNonce = _ref.cspNonce, onChange = _ref.onChange;
        var _useState = hooks_module_l(""), number = _useState[0], setNumber = _useState[1];
        var _useState2 = hooks_module_l(""), cvv = _useState2[0], setCVV = _useState2[1];
        var _useState3 = hooks_module_l(""), expiry = _useState3[0], setExpiry = _useState3[1];
        hooks_module_y((function() {
            var valid = Boolean(number && cvv && expiry);
            onChange({
                value: {
                    number: number,
                    cvv: cvv,
                    expiry: expiry
                },
                valid: valid
            });
        }), [ number, cvv, expiry ]);
        return v(d, null, v("style", {
            nonce: cspNonce
        }, "\n                    input {\n                        border: none;\n                        background: transparent;\n                        height: 100%;\n                        font-family: monospace;\n                        font-size: 50vh;\n                        display: inline-block;\n                    }\n\n                    input.number {\n                        width: 60vw;\n                        margin-right: 2vw;\n                    }\n\n                    input.cvv {\n                        width: 16vw;\n                        margin-right: 2vw;\n                    }\n\n                    input.expiry {\n                        width: 20vw;\n                    }\n                "), v("input", {
            type: "text",
            class: "number",
            placeholder: "XXXX-XXXX-XXXX-XXXX",
            value: number,
            onChange: function(event) {
                return setNumber(event.target.value);
            }
        }), v("input", {
            type: "text",
            class: "cvv",
            placeholder: "CVV",
            value: cvv,
            onChange: function(event) {
                return setCVV(event.target.value);
            }
        }), v("input", {
            type: "text",
            class: "expiry",
            placeholder: "MM/YY",
            value: expiry,
            onChange: function(event) {
                return setExpiry(event.target.value);
            }
        }));
    }
    function CardNumberField(_ref2) {
        var cspNonce = _ref2.cspNonce, onChange = _ref2.onChange;
        var _useState4 = hooks_module_l(""), number = _useState4[0], setNumber = _useState4[1];
        hooks_module_y((function() {
            var valid = Boolean(number);
            onChange({
                value: number,
                valid: valid
            });
        }), [ number ]);
        return v(d, null, v("style", {
            nonce: cspNonce
        }, "\n                    input {\n                        border: none;\n                        background: transparent;\n                        height: 100%;\n                        font-family: monospace;\n                        font-size: 50vh;\n                        width: 100vw;\n                        display: inline-block;\n                    }\n                "), v("input", {
            type: "text",
            class: "number",
            placeholder: "XXXX-XXXX-XXXX-XXXX",
            value: number,
            onChange: function(event) {
                return setNumber(event.target.value);
            }
        }));
    }
    function CardCVVField(_ref3) {
        var cspNonce = _ref3.cspNonce, onChange = _ref3.onChange;
        var _useState5 = hooks_module_l(""), cvv = _useState5[0], setCvv = _useState5[1];
        hooks_module_y((function() {
            var valid = Boolean(cvv);
            onChange({
                value: cvv,
                valid: valid
            });
        }), [ cvv ]);
        return v(d, null, v("style", {
            nonce: cspNonce
        }, "\n                    input {\n                        border: none;\n                        background: transparent;\n                        height: 100%;\n                        font-family: monospace;\n                        font-size: 50vh;\n                        width: 100vw;\n                        display: inline-block;\n                    }\n                "), v("input", {
            type: "text",
            class: "cvv",
            placeholder: "CVV",
            value: cvv,
            onChange: function(event) {
                return setCvv(event.target.value);
            }
        }));
    }
    function CardExpiryField(_ref4) {
        var cspNonce = _ref4.cspNonce, onChange = _ref4.onChange;
        var _useState6 = hooks_module_l(""), expiry = _useState6[0], setExpiry = _useState6[1];
        hooks_module_y((function() {
            var valid = Boolean(expiry);
            onChange({
                value: expiry,
                valid: valid
            });
        }), [ expiry ]);
        return v(d, null, v("style", {
            nonce: cspNonce
        }, "\n                    input {\n                        border: none;\n                        background: transparent;\n                        height: 100%;\n                        font-family: monospace;\n                        font-size: 50vh;\n                        width: 100vw;\n                        display: inline-block;\n                    }\n                "), v("input", {
            type: "text",
            class: "expiry",
            placeholder: "MM/YY",
            value: expiry,
            onChange: function(event) {
                return setExpiry(event.target.value);
            }
        }));
    }
    function Page(_ref) {
        var _style$height;
        var cspNonce = _ref.cspNonce, props = _ref.props;
        var createOrder = props.createOrder, onApprove = props.onApprove, intent = props.intent, branded = props.branded, vault = props.vault, style = props.style, type = props.type, onChange = props.onChange, xport = props.export;
        var _useState = hooks_module_l(), fieldValue = _useState[0], setFieldValue = _useState[1];
        var _useState2 = hooks_module_l(!1), fieldValid = _useState2[0], setFieldValid = _useState2[1];
        var getFieldValue = function() {
            return fieldValue;
        };
        var isFieldValid = function() {
            return fieldValid;
        };
        hooks_module_y((function() {
            onChange({
                valid: fieldValid
            });
        }), [ fieldValid ]);
        hooks_module_y((function() {
            !function(_ref) {
                window.exports = {
                    name: _ref.name,
                    isFieldValid: _ref.isFieldValid,
                    getFieldValue: _ref.getFieldValue
                };
            }({
                name: CARD_FIELD_TYPE_TO_FRAME_NAME[type],
                isFieldValid: isFieldValid,
                getFieldValue: getFieldValue
            });
            xport({
                submit: function() {
                    return submitCardFields({
                        createOrder: createOrder,
                        onApprove: onApprove,
                        intent: intent,
                        branded: branded,
                        vault: vault
                    });
                }
            });
        }), [ getFieldValue ]);
        var onFieldChange = function(_ref2) {
            var valid = _ref2.valid;
            setFieldValue(_ref2.value);
            setFieldValid(valid);
        };
        return v(d, null, v("style", {
            nonce: cspNonce
        }, "\n                    * {\n                        box-sizing: border-box;\n                    }\n\n                    html, body {\n                        margin: 0;\n                        padding: 0;\n                        height: " + (null != (_style$height = null == style ? void 0 : style.height) ? _style$height : 30) + "px;\n                    }\n\n                    body {\n                        display: inline-block;\n                        width: 100%;\n                        font-size: 100%;\n                        font-family: monospace;\n                    }\n\n                    *:focus {\n                        outline: none;\n                    }\n                "), "single" === type ? v(CardField, {
            cspNonce: cspNonce,
            onChange: onFieldChange
        }) : null, "number" === type ? v(CardNumberField, {
            cspNonce: cspNonce,
            onChange: onFieldChange
        }) : null, "cvv" === type ? v(CardCVVField, {
            cspNonce: cspNonce,
            onChange: onFieldChange
        }) : null, "expiry" === type ? v(CardExpiryField, {
            cspNonce: cspNonce,
            onChange: onFieldChange
        }) : null);
    }
    function setupCard(_ref3) {
        var _fundingEligibility$c, _fundingEligibility$c2, xprops, type, cardSessionID, style, fundingEligibility, onChange, _xprops$branded, branded, xport;
        u = v(Page, {
            cspNonce: _ref3.cspNonce,
            props: (xprops = window.xprops, type = xprops.type, cardSessionID = xprops.cardSessionID, 
            style = xprops.style, fundingEligibility = xprops.fundingEligibility, onChange = xprops.onChange, 
            branded = void 0 === (_xprops$branded = xprops.branded) ? null == (_fundingEligibility$c = null == fundingEligibility || null == (_fundingEligibility$c2 = fundingEligibility.card) ? void 0 : _fundingEligibility$c2.branded) || _fundingEligibility$c : _xprops$branded, 
            xport = xprops.export, _extends({}, getProps({
                facilitatorAccessToken: _ref3.facilitatorAccessToken,
                branded: branded
            }), {
                type: type,
                branded: branded,
                style: style,
                cardSessionID: cardSessionID,
                fundingEligibility: fundingEligibility,
                onChange: onChange,
                export: xport
            }))
        }), i = util_getBody(), l.__ && l.__(u, i), r = !1 ? null : i.__k, f = [], j(i, u = i.__k = v(d, null, [ u ]), r || e, e, void 0 !== i.ownerSVGElement, r ? null : i.firstChild ? n.call(i.childNodes) : null, f, r ? r.__e : i.firstChild, !1), 
        z(f, u);
        var u, i, r, f;
    }
} ]);