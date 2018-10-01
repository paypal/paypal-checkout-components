!function(e, a) {
    for (var i in a) e[i] = a[i];
}(exports, function(modules) {
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
    return __webpack_require__(__webpack_require__.s = "./src/button/template/componentTemplate.jsx");
}({
    "./node_modules/Base64/base64.js": function(module, exports, __webpack_require__) {
        !function() {
            var object = exports, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            function InvalidCharacterError(message) {
                this.message = message;
            }
            InvalidCharacterError.prototype = new Error();
            InvalidCharacterError.prototype.name = "InvalidCharacterError";
            object.btoa || (object.btoa = function(input) {
                for (var block, charCode, str = String(input), idx = 0, map = chars, output = ""; str.charAt(0 | idx) || (map = "=", 
                idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
                    if ((charCode = str.charCodeAt(idx += .75)) > 255) throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
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
    "./node_modules/cross-domain-utils/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
        __webpack_require__.d(__webpack_exports__, "getDomain", function() {
            return __WEBPACK_IMPORTED_MODULE_0__utils__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types__);
    },
    "./node_modules/cross-domain-utils/src/types.js": function(module, exports) {},
    "./node_modules/cross-domain-utils/src/utils.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_exports__.a = getDomain;
        var CONSTANTS = {
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            ABOUT_PROTOCOL: "about:",
            WILDCARD: "*"
        };
        function getParent(win) {
            if (win) try {
                if (win.parent && win.parent !== win) return win.parent;
            } catch (err) {}
        }
        function canReadFromWindow(win) {
            try {
                win && win.location && win.location.href;
                return !0;
            } catch (err) {}
            return !1;
        }
        function getActualDomain(win) {
            var location = (win = win || window).location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if (protocol === CONSTANTS.FILE_PROTOCOL) return CONSTANTS.FILE_PROTOCOL + "//";
            if (protocol === CONSTANTS.ABOUT_PROTOCOL) {
                var parent = getParent(win);
                return parent && canReadFromWindow(parent) ? getActualDomain(parent) : CONSTANTS.ABOUT_PROTOCOL + "//";
            }
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function getDomain(win) {
            var domain = getActualDomain(win = win || window);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) ? win.mockDomain : domain;
        }
    },
    "./node_modules/hi-base32/src/base32.js": function(module, exports, __webpack_require__) {
        (function(process, global, module) {
            var __WEBPACK_AMD_DEFINE_RESULT__, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
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
                    2: 26,
                    3: 27,
                    4: 28,
                    5: 29,
                    6: 30,
                    7: 31
                }, blocks = [ 0, 0, 0, 0, 0, 0, 0, 0 ], throwInvalidUtf8 = function(position, partial) {
                    partial.length > 10 && (partial = "..." + partial.substr(-10));
                    var err = new Error("Decoded data is not valid UTF-8. Maybe try base32.decode.asBytes()? Partial data after reading " + position + " bytes: " + partial + " <-");
                    err.position = position;
                    throw err;
                }, decodeAsBytes = function(base32Str) {
                    if (!/^[A-Z2-7=]+$/.test(base32Str)) throw new Error("Invalid base32 characters");
                    for (var v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = (base32Str = base32Str.replace(/=/g, "")).length, i = 0, count = length >> 3 << 3; i < count; ) {
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
                }, decode = function(base32Str, asciiOnly) {
                    if (!asciiOnly) return function(bytes) {
                        for (var b, c, str = "", length = bytes.length, i = 0, followingChars = 0; i < length; ) if ((b = bytes[i++]) <= 127) str += String.fromCharCode(b); else {
                            if (b > 191 && b <= 223) {
                                c = 31 & b;
                                followingChars = 1;
                            } else if (b <= 239) {
                                c = 15 & b;
                                followingChars = 2;
                            } else if (b <= 247) {
                                c = 7 & b;
                                followingChars = 3;
                            } else throwInvalidUtf8(i, str);
                            for (var j = 0; j < followingChars; ++j) {
                                ((b = bytes[i++]) < 128 || b > 191) && throwInvalidUtf8(i, str);
                                c <<= 6;
                                c += 63 & b;
                            }
                            c >= 55296 && c <= 57343 && throwInvalidUtf8(i, str);
                            c > 1114111 && throwInvalidUtf8(i, str);
                            if (c <= 65535) str += String.fromCharCode(c); else {
                                c -= 65536;
                                str += String.fromCharCode(55296 + (c >> 10));
                                str += String.fromCharCode(56320 + (1023 & c));
                            }
                        }
                        return str;
                    }(decodeAsBytes(base32Str));
                    if (!/^[A-Z2-7=]+$/.test(base32Str)) throw new Error("Invalid base32 characters");
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
                    encode: function(input, asciiOnly) {
                        var notString = "string" != typeof input;
                        notString && input.constructor === ArrayBuffer && (input = new Uint8Array(input));
                        return notString ? function(bytes) {
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
                        }(input) : asciiOnly ? function(str) {
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
                        }(input) : function(str) {
                            var v1, v2, v3, v4, v5, code, i, end = !1, base32Str = "", index = 0, start = 0, length = str.length;
                            do {
                                blocks[0] = blocks[5];
                                blocks[1] = blocks[6];
                                blocks[2] = blocks[7];
                                for (i = start; index < length && i < 5; ++index) if ((code = str.charCodeAt(index)) < 128) blocks[i++] = code; else if (code < 2048) {
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
                                } else {
                                    v2 = blocks[1];
                                    v3 = blocks[2];
                                    v4 = blocks[3];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                                }
                            } while (!end);
                            return base32Str;
                        }(input);
                    },
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
    "./node_modules/process/browser.js": function(module, exports) {
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
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
        var currentQueue, queue = [], draining = !1, queueIndex = -1;
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
                !function(marker) {
                    if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
                    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                        cachedClearTimeout = clearTimeout;
                        return clearTimeout(marker);
                    }
                    try {
                        cachedClearTimeout(marker);
                    } catch (e) {
                        try {
                            return cachedClearTimeout.call(null, marker);
                        } catch (e) {
                            return cachedClearTimeout.call(this, marker);
                        }
                    }
                }(timeout);
            }
        }
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args));
            1 !== queue.length || draining || runTimeout(drainQueue);
        };
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = !0;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {}
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
    "./node_modules/zalgo-promise/src/global.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        (function(global) {
            __webpack_exports__.a = function() {
                var glob = void 0;
                if ("undefined" != typeof window) glob = window; else {
                    if (void 0 === global) throw new TypeError("Can not find global");
                    glob = global;
                }
                var zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
                zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
                zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
                zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
                zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];
                return zalgoGlobal;
            };
        }).call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js"));
    },
    "./node_modules/zalgo-promise/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function utils_isPromise(item) {
            try {
                if (!item) return !1;
                if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                if ("undefined" != typeof window && window.Window && item instanceof window.Window) return !1;
                if ("undefined" != typeof window && window.constructor && item instanceof window.constructor) return !1;
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
        var global = __webpack_require__("./node_modules/zalgo-promise/src/global.js");
        var promise_ZalgoPromise = function() {
            function ZalgoPromise(handler) {
                var _this = this;
                !function(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }(this, ZalgoPromise);
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
                0;
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
                    _this2.errorHandled || function(err, promise) {
                        if (-1 === Object(global.a)().dispatchedErrors.indexOf(err)) {
                            Object(global.a)().dispatchedErrors.push(err);
                            setTimeout(function() {
                                throw err;
                            }, 1);
                            for (var j = 0; j < Object(global.a)().possiblyUnhandledPromiseHandlers.length; j++) Object(global.a)().possiblyUnhandledPromiseHandlers[j](err, promise);
                        }
                    }(error, _this2);
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
                    Object(global.a)().activeCount += 1;
                    for (var _loop = function(i) {
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
                    }, i = 0; i < handlers.length; i++) _loop(i);
                    handlers.length = 0;
                    this.dispatching = !1;
                    Object(global.a)().activeCount -= 1;
                    0 === Object(global.a)().activeCount && ZalgoPromise.flushQueue();
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
            ZalgoPromise.prototype.finally = function(onFinally) {
                if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                return this.then(function(result) {
                    return ZalgoPromise.try(onFinally).then(function() {
                        return result;
                    });
                }, function(err) {
                    return ZalgoPromise.try(onFinally).then(function() {
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
                if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                return Promise.resolve(this);
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
                for (var _loop2 = function(i) {
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
                        0 === (count -= 1) && promise.resolve(results);
                    }, function(err) {
                        promise.reject(err);
                    });
                }, i = 0; i < promises.length; i++) _loop2(i);
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
                return function(handler) {
                    Object(global.a)().possiblyUnhandledPromiseHandlers.push(handler);
                    return {
                        cancel: function() {
                            Object(global.a)().possiblyUnhandledPromiseHandlers.splice(Object(global.a)().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                        }
                    };
                }(handler);
            };
            ZalgoPromise.try = function(method, context, args) {
                if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
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
                Object(global.a)().flushPromises.push(promise);
                0 === Object(global.a)().activeCount && ZalgoPromise.flushQueue();
                return promise;
            };
            ZalgoPromise.flushQueue = function() {
                var promisesToFlush = Object(global.a)().flushPromises;
                Object(global.a)().flushPromises = [];
                for (var _i2 = 0, _length2 = null == promisesToFlush ? 0 : promisesToFlush.length; _i2 < _length2; _i2++) {
                    promisesToFlush[_i2].resolve();
                }
            };
            return ZalgoPromise;
        }();
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return promise_ZalgoPromise;
        });
    },
    "./src/button/template/componentTemplate.jsx": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var _logoColors, _tagLineColors, _secondaryColors, _logoColors2, _secondaryColors2, _logoColors3, _secondaryColors3, _logoColors4, _secondaryColors4, _logoColors5, _secondaryColors5, _logoColors6, _secondaryColors6, _logoColors7, _secondaryColors7, _logoColors8, _secondaryColors8, _logoColors9, _secondaryColors9, _logoColors10, _secondaryColors10, _logoColors11, _secondaryColors11, _logoColors12, _secondaryColors12, _logoColors13, _secondaryColors13, _BUTTON_CONFIG, _FUNDING_TO_DEFAULT_L, _LABEL_TO_FUNDING, _BUTTON_STYLE, _FUNDING_CONFIG, _CARD_CONFIG, base64 = __webpack_require__("./node_modules/Base64/base64.js"), constants = __webpack_require__("./src/constants/index.js"), BUTTON_CONFIG = ((_BUTTON_CONFIG = {})[constants.r] = {
            colors: [ constants.e.GOLD, constants.e.BLUE, constants.e.SILVER, constants.e.BLACK, constants.e.WHITE ],
            sizes: [ constants.l.SMALL, constants.l.MEDIUM, constants.l.LARGE, constants.l.RESPONSIVE ],
            shapes: [ constants.k.PILL, constants.k.RECT ],
            layouts: [ constants.g.HORIZONTAL, constants.g.VERTICAL ],
            logoColors: (_logoColors = {}, _logoColors[constants.e.GOLD] = constants.i.BLUE, 
            _logoColors[constants.e.SILVER] = constants.i.BLUE, _logoColors[constants.e.BLUE] = constants.i.WHITE, 
            _logoColors[constants.e.BLACK] = constants.i.WHITE, _logoColors[constants.e.BLACK] = constants.i.WHITE, 
            _logoColors[constants.e.WHITE] = constants.i.BLUE, _logoColors),
            tagLineColors: (_tagLineColors = {}, _tagLineColors[constants.e.GOLD] = constants.n.BLUE, 
            _tagLineColors[constants.e.SILVER] = constants.n.BLUE, _tagLineColors[constants.e.BLUE] = constants.n.BLUE, 
            _tagLineColors[constants.e.BLACK] = constants.n.BLACK, _tagLineColors[constants.e.DARKBLUE] = constants.n.BLUE, 
            _tagLineColors),
            secondaryColors: (_secondaryColors = {}, _secondaryColors[constants.e.GOLD] = constants.e.BLUE, 
            _secondaryColors[constants.e.SILVER] = constants.e.BLUE, _secondaryColors[constants.e.BLUE] = constants.e.SILVER, 
            _secondaryColors[constants.e.BLACK] = constants.e.BLACK, _secondaryColors[constants.e.DARKBLUE] = constants.e.SILVER, 
            _secondaryColors[constants.e.WHITE] = constants.e.WHITE, _secondaryColors),
            tag: "{ content: safer_tag }",
            dualTag: "{ content: dual_tag|safer_tag }",
            defaultLocale: "en_US",
            defaultLabel: constants.f.CHECKOUT,
            defaultVerticalLabel: constants.f.PAYPAL,
            defaultColor: constants.e.GOLD,
            defaultSize: constants.l.SMALL,
            defaultVerticalSize: constants.l.MEDIUM,
            defaultShape: constants.k.PILL,
            defaultLayout: constants.g.HORIZONTAL,
            defaultBranding: !0,
            defaultVerticalBranding: !0,
            defaultFundingIcons: !1,
            defaultTagline: !0,
            defaultDual: "",
            minimumSize: constants.l.TINY,
            minimumVerticalSize: constants.l.MEDIUM,
            maximumSize: constants.l.HUGE,
            maximumVerticalSize: constants.l.HUGE,
            minHorizontalButtons: 1,
            minVerticalButtons: 1,
            maxHorizontalButtons: 2,
            maxVerticalButtons: 4,
            allowUnbranded: !1,
            allowFundingIcons: !0,
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[constants.f.PAYPAL] = {
            label: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            logoLabel: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            allowPrimary: !0,
            allowPrimaryVertical: !0,
            allowPrimaryHorizontal: !0
        }, _BUTTON_CONFIG[constants.f.CHECKOUT] = {
            label: "{ content: checkout }",
            logoLabel: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            allowPrimary: !0,
            allowPrimaryVertical: !0,
            allowPrimaryHorizontal: !0
        }, _BUTTON_CONFIG[constants.f.PAY] = {
            label: "{ content: pay }",
            logoLabel: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            allowPrimary: !0,
            allowPrimaryVertical: !0,
            allowPrimaryHorizontal: !0
        }, _BUTTON_CONFIG[constants.f.BUYNOW] = {
            label: "{ content: buynow }",
            logoLabel: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            defaultBranding: void 0,
            allowPrimary: !0,
            allowPrimaryVertical: !0,
            allowPrimaryHorizontal: !0,
            allowUnbranded: !0
        }, _BUTTON_CONFIG[constants.f.INSTALLMENT] = {
            label: function(style) {
                return "{ content: " + (style.installmentperiod ? "installment_period" : "installment") + " }";
            },
            logoLabel: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            allowPrimary: !0,
            allowPrimaryVertical: !0,
            allowPrimaryHorizontal: !0,
            allowSecondaryVertical: !1,
            allowSecondaryHorizontal: !1
        }, _BUTTON_CONFIG[constants.f.CREDIT] = {
            label: function(_ref) {
                return _ref.locale.country === constants.q.DE ? "{ logo: " + constants.h.CREDIT + " }" : "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " } { logo: " + constants.h.CREDIT + " }";
            },
            logoLabel: function(_ref2) {
                return _ref2.locale.country === constants.q.DE ? "{ logo: " + constants.h.CREDIT + " }" : "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " } { logo: " + constants.h.CREDIT + " }";
            },
            tag: "{ content: later_tag }",
            colors: [ constants.e.DARKBLUE, constants.e.BLACK, constants.e.WHITE ],
            logoColors: (_logoColors2 = {}, _logoColors2[constants.e.BLACK] = constants.i.WHITE, 
            _logoColors2[constants.e.DARKBLUE] = constants.i.WHITE, _logoColors2[constants.e.WHITE] = constants.i.BLUE, 
            _logoColors2),
            secondaryColors: (_secondaryColors2 = {}, _secondaryColors2[constants.e.GOLD] = constants.e.DARKBLUE, 
            _secondaryColors2[constants.e.BLUE] = constants.e.DARKBLUE, _secondaryColors2[constants.e.SILVER] = constants.e.DARKBLUE, 
            _secondaryColors2[constants.e.BLACK] = constants.e.BLACK, _secondaryColors2[constants.e.WHITE] = constants.e.WHITE, 
            _secondaryColors2),
            defaultColor: constants.e.DARKBLUE,
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1,
            allowFundingIcons: !1
        }, _BUTTON_CONFIG[constants.f.VENMO] = {
            label: "{ logo: " + constants.h.VENMO + " }",
            logoLabel: "{ logo: " + constants.h.VENMO + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.BLUE, constants.e.SILVER, constants.e.BLACK, constants.e.WHITE ],
            logoColors: (_logoColors3 = {}, _logoColors3[constants.e.BLUE] = constants.i.WHITE, 
            _logoColors3[constants.e.SILVER] = constants.i.BLUE, _logoColors3[constants.e.BLACK] = constants.i.WHITE, 
            _logoColors3[constants.e.WHITE] = constants.i.BLUE, _logoColors3),
            secondaryColors: (_secondaryColors3 = {}, _secondaryColors3[constants.e.GOLD] = constants.e.BLUE, 
            _secondaryColors3[constants.e.BLUE] = constants.e.SILVER, _secondaryColors3[constants.e.SILVER] = constants.e.BLUE, 
            _secondaryColors3[constants.e.BLACK] = constants.e.BLACK, _secondaryColors3[constants.e.DARKBLUE] = constants.e.SILVER, 
            _secondaryColors3[constants.e.WHITE] = constants.e.WHITE, _secondaryColors3),
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !0
        }, _BUTTON_CONFIG[constants.f.IDEAL] = {
            label: "{ logo: " + constants.h.IDEAL + " } Online betalen",
            logoLabel: "{ logo: " + constants.h.IDEAL + " } Online betalen",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK, constants.e.WHITE ],
            logoColors: (_logoColors4 = {}, _logoColors4[constants.e.SILVER] = constants.i.BLACK, 
            _logoColors4[constants.e.BLACK] = constants.i.WHITE, _logoColors4[constants.e.WHITE] = constants.i.BLACK, 
            _logoColors4),
            secondaryColors: (_secondaryColors4 = {}, _secondaryColors4[constants.e.GOLD] = constants.e.SILVER, 
            _secondaryColors4[constants.e.BLUE] = constants.e.SILVER, _secondaryColors4[constants.e.SILVER] = constants.e.SILVER, 
            _secondaryColors4[constants.e.BLACK] = constants.e.BLACK, _secondaryColors4[constants.e.DARKBLUE] = constants.e.SILVER, 
            _secondaryColors4[constants.e.WHITE] = constants.e.WHITE, _secondaryColors4),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[constants.f.ELV] = {
            label: "{ logo: " + constants.h.ELV + " }",
            logoLabel: "{ logo: " + constants.h.ELV + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK, constants.e.WHITE ],
            logoColors: (_logoColors5 = {}, _logoColors5[constants.e.SILVER] = constants.i.BLACK, 
            _logoColors5[constants.e.BLACK] = constants.i.WHITE, _logoColors5[constants.e.WHITE] = constants.i.BLACK, 
            _logoColors5),
            secondaryColors: (_secondaryColors5 = {}, _secondaryColors5[constants.e.GOLD] = constants.e.SILVER, 
            _secondaryColors5[constants.e.BLUE] = constants.e.SILVER, _secondaryColors5[constants.e.SILVER] = constants.e.SILVER, 
            _secondaryColors5[constants.e.BLACK] = constants.e.BLACK, _secondaryColors5[constants.e.DARKBLUE] = constants.e.SILVER, 
            _secondaryColors5[constants.e.WHITE] = constants.e.WHITE, _secondaryColors5),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[constants.f.BANCONTACT] = {
            label: "{ logo: " + constants.h.BANCONTACT + " }",
            logoLabel: "{ logo: " + constants.h.BANCONTACT + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK, constants.e.WHITE ],
            logoColors: (_logoColors6 = {}, _logoColors6[constants.e.SILVER] = constants.i.BLACK, 
            _logoColors6[constants.e.BLACK] = constants.i.WHITE, _logoColors6[constants.e.WHITE] = constants.i.BLACK, 
            _logoColors6),
            secondaryColors: (_secondaryColors6 = {}, _secondaryColors6[constants.e.GOLD] = constants.e.SILVER, 
            _secondaryColors6[constants.e.BLUE] = constants.e.SILVER, _secondaryColors6[constants.e.SILVER] = constants.e.SILVER, 
            _secondaryColors6[constants.e.BLACK] = constants.e.BLACK, _secondaryColors6[constants.e.DARKBLUE] = constants.e.SILVER, 
            _secondaryColors6[constants.e.WHITE] = constants.e.WHITE, _secondaryColors6),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[constants.f.GIROPAY] = {
            label: "{ logo: " + constants.h.GIROPAY + " }",
            logoLabel: "{ logo: " + constants.h.GIROPAY + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK, constants.e.WHITE ],
            logoColors: (_logoColors7 = {}, _logoColors7[constants.e.SILVER] = constants.i.BLACK, 
            _logoColors7[constants.e.BLACK] = constants.i.WHITE, _logoColors7[constants.e.WHITE] = constants.i.BLACK, 
            _logoColors7),
            secondaryColors: (_secondaryColors7 = {}, _secondaryColors7[constants.e.GOLD] = constants.e.SILVER, 
            _secondaryColors7[constants.e.BLUE] = constants.e.SILVER, _secondaryColors7[constants.e.SILVER] = constants.e.SILVER, 
            _secondaryColors7[constants.e.BLACK] = constants.e.BLACK, _secondaryColors7[constants.e.DARKBLUE] = constants.e.SILVER, 
            _secondaryColors7[constants.e.WHITE] = constants.e.WHITE, _secondaryColors7),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[constants.f.SOFORT] = {
            label: "{ logo: " + constants.h.SOFORT + " }",
            logoLabel: "{ logo: " + constants.h.SOFORT + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK, constants.e.WHITE ],
            logoColors: (_logoColors8 = {}, _logoColors8[constants.e.SILVER] = constants.i.BLACK, 
            _logoColors8[constants.e.BLACK] = constants.i.WHITE, _logoColors8[constants.e.WHITE] = constants.i.BLACK, 
            _logoColors8),
            secondaryColors: (_secondaryColors8 = {}, _secondaryColors8[constants.e.GOLD] = constants.e.SILVER, 
            _secondaryColors8[constants.e.BLUE] = constants.e.SILVER, _secondaryColors8[constants.e.SILVER] = constants.e.SILVER, 
            _secondaryColors8[constants.e.BLACK] = constants.e.BLACK, _secondaryColors8[constants.e.DARKBLUE] = constants.e.SILVER, 
            _secondaryColors8[constants.e.WHITE] = constants.e.WHITE, _secondaryColors8),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[constants.f.EPS] = {
            label: "{ logo: " + constants.h.EPS + " }",
            logoLabel: "{ logo: " + constants.h.EPS + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK, constants.e.WHITE ],
            logoColors: (_logoColors9 = {}, _logoColors9[constants.e.SILVER] = constants.i.BLACK, 
            _logoColors9[constants.e.BLACK] = constants.i.WHITE, _logoColors9[constants.e.WHITE] = constants.i.BLACK, 
            _logoColors9),
            secondaryColors: (_secondaryColors9 = {}, _secondaryColors9[constants.e.GOLD] = constants.e.SILVER, 
            _secondaryColors9[constants.e.BLUE] = constants.e.SILVER, _secondaryColors9[constants.e.SILVER] = constants.e.SILVER, 
            _secondaryColors9[constants.e.BLACK] = constants.e.BLACK, _secondaryColors9[constants.e.DARKBLUE] = constants.e.SILVER, 
            _secondaryColors9[constants.e.WHITE] = constants.e.WHITE, _secondaryColors9),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[constants.f.MYBANK] = {
            label: "{ logo: " + constants.h.MYBANK + " }",
            logoLabel: "{ logo: " + constants.h.MYBANK + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK, constants.e.WHITE ],
            logoColors: (_logoColors10 = {}, _logoColors10[constants.e.SILVER] = constants.i.BLACK, 
            _logoColors10[constants.e.BLACK] = constants.i.WHITE, _logoColors10[constants.e.WHITE] = constants.i.BLACK, 
            _logoColors10),
            secondaryColors: (_secondaryColors10 = {}, _secondaryColors10[constants.e.GOLD] = constants.e.SILVER, 
            _secondaryColors10[constants.e.BLUE] = constants.e.SILVER, _secondaryColors10[constants.e.SILVER] = constants.e.SILVER, 
            _secondaryColors10[constants.e.BLACK] = constants.e.BLACK, _secondaryColors10[constants.e.DARKBLUE] = constants.e.SILVER, 
            _secondaryColors10[constants.e.WHITE] = constants.e.WHITE, _secondaryColors10),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[constants.f.P24] = {
            label: "{ logo: " + constants.h.P24 + " }",
            logoLabel: "{ logo: " + constants.h.P24 + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK, constants.e.WHITE ],
            logoColors: (_logoColors11 = {}, _logoColors11[constants.e.SILVER] = constants.i.BLACK, 
            _logoColors11[constants.e.BLACK] = constants.i.WHITE, _logoColors11[constants.e.WHITE] = constants.i.BLACK, 
            _logoColors11),
            secondaryColors: (_secondaryColors11 = {}, _secondaryColors11[constants.e.GOLD] = constants.e.SILVER, 
            _secondaryColors11[constants.e.BLUE] = constants.e.SILVER, _secondaryColors11[constants.e.SILVER] = constants.e.SILVER, 
            _secondaryColors11[constants.e.BLACK] = constants.e.BLACK, _secondaryColors11[constants.e.DARKBLUE] = constants.e.SILVER, 
            _secondaryColors11[constants.e.WHITE] = constants.e.WHITE, _secondaryColors11),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[constants.f.ZIMPLER] = {
            label: "{ logo: " + constants.h.ZIMPLER + " }",
            logoLabel: "{ logo: " + constants.h.ZIMPLER + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK, constants.e.WHITE ],
            logoColors: (_logoColors12 = {}, _logoColors12[constants.e.SILVER] = constants.i.BLACK, 
            _logoColors12[constants.e.BLACK] = constants.i.WHITE, _logoColors12[constants.e.WHITE] = constants.i.BLACK, 
            _logoColors12),
            secondaryColors: (_secondaryColors12 = {}, _secondaryColors12[constants.e.GOLD] = constants.e.SILVER, 
            _secondaryColors12[constants.e.BLUE] = constants.e.SILVER, _secondaryColors12[constants.e.SILVER] = constants.e.SILVER, 
            _secondaryColors12[constants.e.BLACK] = constants.e.BLACK, _secondaryColors12[constants.e.DARKBLUE] = constants.e.SILVER, 
            _secondaryColors12[constants.e.WHITE] = constants.e.WHITE, _secondaryColors12),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG[constants.f.CARD] = {
            label: "{ cards }",
            logoLabel: "{ cards }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.TRANSPARENT ],
            logoColors: (_logoColors13 = {}, _logoColors13[constants.e.TRANSPARENT] = constants.i.BLACK, 
            _logoColors13),
            secondaryColors: (_secondaryColors13 = {}, _secondaryColors13[constants.e.GOLD] = constants.e.TRANSPARENT, 
            _secondaryColors13[constants.e.BLUE] = constants.e.TRANSPARENT, _secondaryColors13[constants.e.SILVER] = constants.e.TRANSPARENT, 
            _secondaryColors13[constants.e.BLACK] = constants.e.TRANSPARENT, _secondaryColors13[constants.e.DARKBLUE] = constants.e.TRANSPARENT, 
            _secondaryColors13[constants.e.WHITE] = constants.e.TRANSPARENT, _secondaryColors13),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }, _BUTTON_CONFIG), FUNDING_TO_DEFAULT_LABEL = ((_FUNDING_TO_DEFAULT_L = {})[constants.t.PAYPAL] = constants.f.PAYPAL, 
        _FUNDING_TO_DEFAULT_L[constants.t.VENMO] = constants.f.VENMO, _FUNDING_TO_DEFAULT_L[constants.t.CARD] = constants.f.CARD, 
        _FUNDING_TO_DEFAULT_L[constants.t.CREDIT] = constants.f.CREDIT, _FUNDING_TO_DEFAULT_L[constants.t.IDEAL] = constants.f.IDEAL, 
        _FUNDING_TO_DEFAULT_L[constants.t.ELV] = constants.f.ELV, _FUNDING_TO_DEFAULT_L[constants.t.BANCONTACT] = constants.f.BANCONTACT, 
        _FUNDING_TO_DEFAULT_L[constants.t.GIROPAY] = constants.f.GIROPAY, _FUNDING_TO_DEFAULT_L[constants.t.SOFORT] = constants.f.SOFORT, 
        _FUNDING_TO_DEFAULT_L[constants.t.EPS] = constants.f.EPS, _FUNDING_TO_DEFAULT_L[constants.t.P24] = constants.f.P24, 
        _FUNDING_TO_DEFAULT_L[constants.t.ZIMPLER] = constants.f.ZIMPLER, _FUNDING_TO_DEFAULT_L[constants.t.MYBANK] = constants.f.MYBANK, 
        _FUNDING_TO_DEFAULT_L), LABEL_TO_FUNDING = ((_LABEL_TO_FUNDING = {})[constants.f.PAYPAL] = constants.t.PAYPAL, 
        _LABEL_TO_FUNDING[constants.f.CHECKOUT] = constants.t.PAYPAL, _LABEL_TO_FUNDING[constants.f.PAY] = constants.t.PAYPAL, 
        _LABEL_TO_FUNDING[constants.f.BUYNOW] = constants.t.PAYPAL, _LABEL_TO_FUNDING[constants.f.INSTALLMENT] = constants.t.PAYPAL, 
        _LABEL_TO_FUNDING[constants.f.CARD] = constants.t.CARD, _LABEL_TO_FUNDING[constants.f.CREDIT] = constants.t.CREDIT, 
        _LABEL_TO_FUNDING[constants.f.VENMO] = constants.t.VENMO, _LABEL_TO_FUNDING[constants.f.IDEAL] = constants.t.IDEAL, 
        _LABEL_TO_FUNDING[constants.f.BANCONTACT] = constants.t.BANCONTACT, _LABEL_TO_FUNDING[constants.f.GIROPAY] = constants.t.GIROPAY, 
        _LABEL_TO_FUNDING[constants.f.GIROPAY] = constants.t.EPS, _LABEL_TO_FUNDING[constants.f.SOFORT] = constants.t.SOFORT, 
        _LABEL_TO_FUNDING[constants.f.P24] = constants.t.P24, _LABEL_TO_FUNDING[constants.f.ZIMPLER] = constants.t.ZIMPLER, 
        _LABEL_TO_FUNDING[constants.f.MYBANK] = constants.t.MYBANK, _LABEL_TO_FUNDING), BUTTON_RELATIVE_STYLE = {
            FUNDINGICONS: 100,
            TAGLINE: 50,
            VERTICAL_MARGIN: 30
        }, BUTTON_STYLE = ((_BUTTON_STYLE = {})[constants.l.TINY] = {
            defaultWidth: 75,
            defaultHeight: 25,
            minWidth: 75,
            maxWidth: 150,
            minHeight: 25,
            maxHeight: 30,
            allowFunding: !0,
            allowTagline: !1,
            byPayPalHeight: 0
        }, _BUTTON_STYLE[constants.l.SMALL] = {
            defaultWidth: 150,
            defaultHeight: 25,
            minWidth: 150,
            maxWidth: 200,
            minHeight: 25,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0,
            byPayPalHeight: 0
        }, _BUTTON_STYLE[constants.l.MEDIUM] = {
            defaultWidth: 250,
            defaultHeight: 35,
            minWidth: 200,
            maxWidth: 300,
            minHeight: 35,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0,
            byPayPalHeight: 30
        }, _BUTTON_STYLE[constants.l.LARGE] = {
            defaultWidth: 350,
            defaultHeight: 45,
            minWidth: 300,
            maxWidth: 500,
            minHeight: 30,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0,
            byPayPalHeight: 30
        }, _BUTTON_STYLE[constants.l.HUGE] = {
            defaultWidth: 500,
            defaultHeight: 55,
            minWidth: 500,
            maxWidth: 750,
            minHeight: 40,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0,
            byPayPalHeight: 30
        }, _BUTTON_STYLE);
        function labelToFunding(label) {
            return label ? LABEL_TO_FUNDING[label] : constants.t.PAYPAL;
        }
        function getButtonConfig(label, key, def) {
            return function(conf, category, key, def) {
                var categoryConfig = conf[category];
                if (categoryConfig && categoryConfig.hasOwnProperty(key)) return categoryConfig[key];
                if (conf[constants.r] && conf[constants.r].hasOwnProperty(key)) return conf[constants.r][key];
                if (arguments.length >= 4) return def;
                throw new Error("No value found for " + category + ":" + key);
            }(BUTTON_CONFIG, label, key, def);
        }
        var FUNDING_PRIORITY = [ constants.t.PAYPAL, constants.t.VENMO, constants.t.CREDIT, constants.t.IDEAL, constants.t.ELV, constants.t.BANCONTACT, constants.t.GIROPAY, constants.t.EPS, constants.t.SOFORT, constants.t.MYBANK, constants.t.P24, constants.t.ZIMPLER, constants.t.CARD ], FUNDING_CONFIG = ((_FUNDING_CONFIG = {})[constants.r] = {
            enabled: !0,
            allowOptIn: !0,
            allowOptOut: !0,
            allowRemember: !0,
            allowHorizontal: !0,
            allowVertical: !0,
            requireCommitAsTrue: !1
        }, _FUNDING_CONFIG[constants.t.PAYPAL] = {
            default: !0,
            allowOptIn: !1,
            allowOptOut: !1,
            allowHorizontal: !0,
            allowVertical: !0
        }, _FUNDING_CONFIG[constants.t.CARD] = {
            default: "undefined" == typeof __paypal_checkout__ || __paypal_checkout__.serverConfig.paypalMerchantConfiguration.creditCard.isPayPalBranded,
            allowHorizontal: !1,
            allowVertical: !0
        }, _FUNDING_CONFIG[constants.t.VENMO] = {
            allowOptOut: !1,
            allowedCountries: [ constants.q.US ],
            allowHorizontal: !0,
            allowVertical: !0
        }, _FUNDING_CONFIG[constants.t.CREDIT] = {
            allowedCountries: [ constants.q.US, constants.q.GB, constants.q.DE ],
            defaultVerticalCountries: [ constants.q.US ],
            platforms: [ constants.w.MOBILE ],
            allowHorizontal: !0,
            allowVertical: !0
        }, _FUNDING_CONFIG[constants.t.IDEAL] = {
            allowedCountries: [ constants.q.NL ],
            allowHorizontal: !1,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }, _FUNDING_CONFIG[constants.t.ELV] = {
            allowedCountries: [ constants.q.DE, constants.q.AT ],
            defaultVerticalCountries: [ constants.q.DE, constants.q.AT ],
            allowHorizontal: !1,
            allowVertical: !0
        }, _FUNDING_CONFIG[constants.t.BANCONTACT] = {
            allowedCountries: [ constants.q.BE ],
            allowHorizontal: !1,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }, _FUNDING_CONFIG[constants.t.GIROPAY] = {
            allowedCountries: [ constants.q.DE ],
            allowHorizontal: !1,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }, _FUNDING_CONFIG[constants.t.SOFORT] = {
            allowedCountries: [ constants.q.DE, constants.q.AT, constants.q.BE, constants.q.ES, constants.q.IT, constants.q.NL ],
            allowHorizontal: !1,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }, _FUNDING_CONFIG[constants.t.EPS] = {
            allowedCountries: [ constants.q.AT ],
            allowHorizontal: !1,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }, _FUNDING_CONFIG[constants.t.MYBANK] = {
            allowedCountries: [ constants.q.IT ],
            allowHorizontal: !1,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }, _FUNDING_CONFIG[constants.t.P24] = {
            allowedCountries: [ constants.q.PL ],
            allowHorizontal: !1,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }, _FUNDING_CONFIG[constants.t.ZIMPLER] = {
            allowedCountries: [ constants.q.FI ],
            allowHorizontal: !1,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }, _FUNDING_CONFIG), CARD_CONFIG = ((_CARD_CONFIG = {})[constants.r] = {
            priority: [ constants.o.VISA, constants.o.MASTERCARD, constants.o.AMEX ]
        }, _CARD_CONFIG[constants.q.GB] = {
            priority: [ constants.o.VISA, constants.o.MASTERCARD, constants.o.AMEX, constants.o.DISCOVER, constants.o.MAESTRO ]
        }, _CARD_CONFIG[constants.q.US] = {
            priority: [ constants.o.VISA, constants.o.MASTERCARD, constants.o.AMEX, constants.o.DISCOVER ]
        }, _CARD_CONFIG[constants.q.BR] = {
            priority: [ constants.o.VISA, constants.o.MASTERCARD, constants.o.AMEX, constants.o.HIPER, constants.o.ELO ]
        }, _CARD_CONFIG[constants.q.JP] = {
            priority: [ constants.o.VISA, constants.o.MASTERCARD, constants.o.AMEX, constants.o.JCB ]
        }, _CARD_CONFIG[constants.q.CN] = {
            priority: [ constants.o.VISA, constants.o.MASTERCARD, constants.o.AMEX, constants.o.CUP ]
        }, _CARD_CONFIG);
        function config_getConfig(conf, category, key, def) {
            var categoryConfig = conf[category];
            if (categoryConfig && categoryConfig.hasOwnProperty(key)) return categoryConfig[key];
            if (conf[constants.r] && conf[constants.r].hasOwnProperty(key)) return conf[constants.r][key];
            if (arguments.length >= 4) return def;
            throw new Error("No value found for " + category + ":" + key);
        }
        function getFundingConfig(source, key, def) {
            return config_getConfig(FUNDING_CONFIG, source, key, def);
        }
        var fundingEligibilityReasons = [];
        function isFundingEligible(source, _ref3) {
            var locale = _ref3.locale, funding = _ref3.funding, env = _ref3.env, layout = _ref3.layout, selected = _ref3.selected, commit = _ref3.commit;
            if (selected && source === selected) return {
                eligible: !0,
                reason: constants.u.PRIMARY
            };
            if (!(getFundingConfig(source, "enabled") || env === constants.s.TEST && getFundingConfig(source, "test"))) return {
                eligible: !1,
                reason: constants.u.NOT_ENABLED
            };
            var ineligibleReason = function(source, _ref) {
                var locale = _ref.locale, funding = _ref.funding, layout = _ref.layout, commit = _ref.commit;
                return getFundingConfig(source, layout === constants.g.VERTICAL ? "allowVertical" : "allowHorizontal") ? -1 !== funding.disallowed.indexOf(source) && getFundingConfig(source, "allowOptOut") ? constants.u.OPT_OUT : -1 !== funding.disallowed.indexOf(source) && source === constants.t.VENMO ? constants.u.OPT_OUT : -1 === getFundingConfig(source, "allowedCountries", [ locale.country ]).indexOf(locale.country) ? constants.u.DISALLOWED_COUNTRY : getFundingConfig(source, "requireCommitAsTrue") && !commit ? constants.u.COMMIT_NOT_SET : void 0 : constants.u.SECONDARY_DISALLOWED;
            }(source, {
                locale: locale,
                funding: funding,
                layout: layout,
                commit: commit
            });
            if (ineligibleReason) return {
                eligible: !1,
                reason: ineligibleReason
            };
            var autoEligibleReason = function(source, _ref2) {
                var locale = _ref2.locale, funding = _ref2.funding;
                return _ref2.layout === constants.g.VERTICAL && -1 !== getFundingConfig(source, "defaultVerticalCountries", []).indexOf(locale.country) ? constants.u.DEFAULT_COUNTRY : getFundingConfig(source, "default") ? constants.u.DEFAULT : -1 !== funding.allowed.indexOf(source) && getFundingConfig(source, "allowOptIn") ? constants.u.OPT_IN : -1 !== funding.remembered.indexOf(source) && getFundingConfig(source, "allowRemember") ? constants.u.REMEMBERED : void 0;
            }(source, {
                locale: locale,
                funding: funding,
                layout: layout
            });
            return autoEligibleReason ? {
                eligible: !0,
                reason: autoEligibleReason
            } : {
                eligible: !1,
                reason: constants.u.NEED_OPT_IN
            };
        }
        function determineEligibleCards(_ref5) {
            var source, key, def, funding = _ref5.funding, locale = _ref5.locale;
            return (source = locale.country, key = "priority", config_getConfig(CARD_CONFIG, source, key, def)).filter(function(card) {
                return -1 === funding.disallowed.indexOf(card);
            });
        }
        var util = __webpack_require__("./src/lib/util.js");
        var normalizeProps = Object(util.b)(function(props) {
            var defs = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, env = props.env, locale = props.locale, _props$style = props.style, style = void 0 === _props$style ? {} : _props$style, funding = props.funding, commit = props.commit, isFundingThrottleEnabled = props.isFundingThrottleEnabled;
            locale = locale ? function(locale) {
                var _locale$split = locale.split("_"), lang = _locale$split[0];
                return {
                    country: _locale$split[1],
                    lang: lang
                };
            }(locale) : defs.locale || getButtonConfig("DEFAULT", "defaultLocale");
            (funding = funding || {}).allowed = funding.allowed || [];
            funding.disallowed = funding.disallowed || [];
            funding.remembered = funding.remembered || [];
            var label = style[constants.m.LABEL] || getButtonConfig("DEFAULT", style.layout === constants.g.VERTICAL ? "defaultVerticalLabel" : "defaultLabel"), layout = style[constants.m.LAYOUT] || getButtonConfig(label, "defaultLayout"), _style$BUTTON_STYLE_O = style[constants.m.SIZE], size = void 0 === _style$BUTTON_STYLE_O ? getButtonConfig(label, layout === constants.g.VERTICAL ? "defaultVerticalSize" : "defaultSize") : _style$BUTTON_STYLE_O, _style$BUTTON_STYLE_O2 = style[constants.m.COLOR], color = void 0 === _style$BUTTON_STYLE_O2 ? getButtonConfig(label, "defaultColor") : _style$BUTTON_STYLE_O2, _style$BUTTON_STYLE_O3 = style[constants.m.SHAPE], shape = void 0 === _style$BUTTON_STYLE_O3 ? getButtonConfig(label, "defaultShape") : _style$BUTTON_STYLE_O3, _style$BUTTON_STYLE_O4 = style[constants.m.BRANDING], branding = void 0 === _style$BUTTON_STYLE_O4 ? getButtonConfig(label, layout === constants.g.VERTICAL ? "defaultVerticalBranding" : "defaultBranding") : _style$BUTTON_STYLE_O4, _style$BUTTON_STYLE_O5 = style[constants.m.FUNDINGICONS], fundingicons = void 0 === _style$BUTTON_STYLE_O5 ? getButtonConfig(label, "defaultFundingIcons") : _style$BUTTON_STYLE_O5, _style$BUTTON_STYLE_O6 = style[constants.m.TAGLINE], tagline = void 0 === _style$BUTTON_STYLE_O6 ? getButtonConfig(label, "defaultTagline") : _style$BUTTON_STYLE_O6, max = style[constants.m.MAXBUTTONS], height = style[constants.m.HEIGHT], installmentperiod = style[constants.m.INSTALLMENTPERIOD];
            max = function(_ref) {
                var label = _ref.label, layout = _ref.layout, max = _ref.max;
                if (!(layout === constants.g.HORIZONTAL ? getButtonConfig(label, "allowPrimaryHorizontal") : getButtonConfig(label, "allowPrimaryVertical"))) return 1;
                var configMax = layout === constants.g.HORIZONTAL ? getButtonConfig(label, "maxHorizontalButtons") : getButtonConfig(label, "maxVerticalButtons");
                return max ? Math.min(configMax, max) : configMax;
            }({
                label: label,
                layout: layout,
                max: max
            });
            var sources = function(_ref4) {
                var funding = _ref4.funding, selected = _ref4.selected, locale = _ref4.locale, env = _ref4.env, layout = _ref4.layout, commit = _ref4.commit, reasons = {}, eligibleFunding = FUNDING_PRIORITY.filter(function(source) {
                    var _isFundingEligible = isFundingEligible(source, {
                        selected: selected,
                        locale: locale,
                        funding: funding,
                        env: env,
                        layout: layout,
                        commit: commit
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
            }({
                funding: funding,
                selected: labelToFunding(label),
                locale: locale,
                env: env,
                layout: layout,
                commit: commit
            }).slice(0, max), multiple = sources.length > 1;
            multiple && (branding = !0);
            return {
                size: size,
                label: label,
                locale: locale,
                color: color,
                shape: shape,
                branding: branding,
                fundingicons: fundingicons,
                tagline: tagline = function(_ref2) {
                    var tagline = _ref2.tagline, branding = _ref2.branding, fundingicons = _ref2.fundingicons, layout = _ref2.layout;
                    return Boolean(tagline && branding && !fundingicons && layout === constants.g.HORIZONTAL);
                }({
                    tagline: tagline,
                    branding: branding,
                    fundingicons: fundingicons,
                    layout: layout
                }),
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
                }),
                installmentperiod: installmentperiod,
                isFundingThrottleEnabled: isFundingThrottleEnabled
            };
        });
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function htmlEncode() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
        }
        var _ZIMPLER_LOGO_COLORS, JsxHTMLNode = function() {
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
                if (this.props && this.props.innerHTML) return this.props.innerHTML;
                if (!this.children) return "";
                var result = "";
                !function iterate(children) {
                    for (var _i2 = 0, _length2 = null == children ? 0 : children.length; _i2 < _length2; _i2++) {
                        var child = children[_i2];
                        null !== child && void 0 !== child && (Array.isArray(child) ? iterate(child) : result += child instanceof JsxHTMLNode ? child.toString() : htmlEncode(child));
                    }
                }(this.children);
                return result;
            };
            return JsxHTMLNode;
        }(), JsxHTMLNodeContainer = function(_JsxHTMLNode) {
            !function(subClass, superClass) {
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
            }(JsxHTMLNodeContainer, _JsxHTMLNode);
            function JsxHTMLNodeContainer(children) {
                _classCallCheck(this, JsxHTMLNodeContainer);
                return function(self, call) {
                    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !call || "object" != typeof call && "function" != typeof call ? self : call;
                }(this, _JsxHTMLNode.call(this, "", {}, children));
            }
            JsxHTMLNodeContainer.prototype.toString = function() {
                return this.childrenToString();
            };
            return JsxHTMLNodeContainer;
        }(JsxHTMLNode);
        function jsxToHTML(name, props) {
            for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
            return new JsxHTMLNode(name, props, children);
        }
        var _P24_LOGO_COLORS, ZIMPLER_LOGO_COLORS = ((_ZIMPLER_LOGO_COLORS = {})[constants.i.WHITE] = {
            primary: "#ffffff"
        }, _ZIMPLER_LOGO_COLORS[constants.i.BLACK] = {
            primary: "#00A599"
        }, _ZIMPLER_LOGO_COLORS[constants.i.ANY] = {
            primary: "#00A599"
        }, _ZIMPLER_LOGO_COLORS);
        var _SOFORT_LOGO_COLORS, P24_LOGO_COLORS = ((_P24_LOGO_COLORS = {})[constants.i.WHITE] = {
            primary: "#ffffff",
            secondary: "#ffffff"
        }, _P24_LOGO_COLORS[constants.i.ANY] = {
            primary: "#d03238",
            secondary: "#b3b1b1"
        }, _P24_LOGO_COLORS[constants.i.BLACK] = {
            primary: "#d03238",
            secondary: "#b3b1b1"
        }, _P24_LOGO_COLORS);
        var _IDEAL_LOGO_COLORS, SOFORT_LOGO_COLORS = ((_SOFORT_LOGO_COLORS = {})[constants.i.WHITE] = {
            primary: "#2C2E2F",
            secondary: "#ffffff"
        }, _SOFORT_LOGO_COLORS[constants.i.ANY] = {
            primary: "#EB6F93",
            secondary: "#FFFFFF"
        }, _SOFORT_LOGO_COLORS[constants.i.BLACK] = {
            primary: "#EB6F93",
            secondary: "#FFFFFF"
        }, _SOFORT_LOGO_COLORS);
        var _GIROPAY_LOGO_COLORS, IDEAL_LOGO_COLORS = ((_IDEAL_LOGO_COLORS = {})[constants.i.WHITE] = {
            primary: "#ffffff",
            secondary: "#ffffff",
            tertiary: "#2C2E2F"
        }, _IDEAL_LOGO_COLORS[constants.i.ANY] = {
            primary: "#000000",
            secondary: "#FFFFFF",
            tertiary: "#CD0067"
        }, _IDEAL_LOGO_COLORS[constants.i.BLACK] = {
            primary: "#000000",
            secondary: "#FFFFFF",
            tertiary: "#CD0067"
        }, _IDEAL_LOGO_COLORS);
        var _EPS_LOGO_COLORS, GIROPAY_LOGO_COLORS = ((_GIROPAY_LOGO_COLORS = {})[constants.i.WHITE] = {
            primary: "#ffffff",
            secondary: "#000000",
            tertiary: "#2C2E2F"
        }, _GIROPAY_LOGO_COLORS[constants.i.ANY] = {
            primary: "#FFFFFF",
            secondary: "#003A7D",
            tertiary: "#ED1C24"
        }, _GIROPAY_LOGO_COLORS[constants.i.BLACK] = {
            primary: "#FFFFFF",
            secondary: "#003A7D",
            tertiary: "#ED1C24"
        }, _GIROPAY_LOGO_COLORS);
        var _MYBANK_LOGO_COLORS, EPS_LOGO_COLORS = ((_EPS_LOGO_COLORS = {})[constants.i.WHITE] = {
            primary: "#ffffff",
            secondary: "#ffffff",
            tertiary: "#ffffff"
        }, _EPS_LOGO_COLORS[constants.i.ANY] = {
            primary: "#71706F",
            secondary: "#FFFFFF",
            tertiary: "#C8036F"
        }, _EPS_LOGO_COLORS[constants.i.BLACK] = {
            primary: "#71706F",
            secondary: "#FFFFFF",
            tertiary: "#C8036F"
        }, _EPS_LOGO_COLORS);
        var _BANCONTACT_LOGO_COLO, MYBANK_LOGO_COLORS = ((_MYBANK_LOGO_COLORS = {})[constants.i.WHITE] = {
            primary: "#ffffff",
            secondary: "#ffffff",
            tertiary: "#ffffff"
        }, _MYBANK_LOGO_COLORS[constants.i.ANY] = {
            primary: "#1A4B67",
            secondary: "#00C0EE",
            tertiary: "#FFFFFF"
        }, _MYBANK_LOGO_COLORS[constants.i.BLACK] = {
            primary: "#1A4B67",
            secondary: "#00C0EE",
            tertiary: "#FFFFFF"
        }, _MYBANK_LOGO_COLORS);
        var BANCONTACT_LOGO_COLORS = ((_BANCONTACT_LOGO_COLO = {})[constants.i.WHITE] = {
            primary: "#ffffff",
            secondary: "#ffffff"
        }, _BANCONTACT_LOGO_COLO[constants.i.ANY] = {
            primary: "#1A4B67",
            secondary: "#00C0EE"
        }, _BANCONTACT_LOGO_COLO[constants.i.BLACK] = {
            primary: "#005498",
            secondary: "#FFD800"
        }, _BANCONTACT_LOGO_COLO);
        var _PAYPAL_LOGO_COLORS, _CREDIT_LOGO_COLORS, pp_white = __webpack_require__("./src/resources/fundingLogos/pp_white.svg"), pp_white_default = __webpack_require__.n(pp_white), pp_blue = __webpack_require__("./src/resources/fundingLogos/pp_blue.svg"), pp_blue_default = __webpack_require__.n(pp_blue), pp_black = __webpack_require__("./src/resources/fundingLogos/pp_black.svg"), pp_black_default = __webpack_require__.n(pp_black), PAYPAL_LOGO_COLORS = ((_PAYPAL_LOGO_COLORS = {})[constants.i.BLUE] = {
            primary: "#003087",
            secondary: "#009cde"
        }, _PAYPAL_LOGO_COLORS[constants.i.WHITE] = {
            primary: "#ffffff",
            secondary: "#ffffff"
        }, _PAYPAL_LOGO_COLORS[constants.i.BLACK] = {
            primary: "#333030",
            secondary: "#636363"
        }, _PAYPAL_LOGO_COLORS);
        var CREDIT_LOGO_COLORS = ((_CREDIT_LOGO_COLORS = {})[constants.i.BLUE] = {
            primary: "#003087",
            secondary: "#009cde"
        }, _CREDIT_LOGO_COLORS[constants.i.WHITE] = {
            primary: "#ffffff",
            secondary: "#ffffff"
        }, _CREDIT_LOGO_COLORS[constants.i.BLACK] = {
            primary: "#333030",
            secondary: "#636363"
        }, _CREDIT_LOGO_COLORS);
        var _BUTTON_LOGO$PP, _BUTTON_LOGO$VENMO, _BUTTON_LOGO$ELV, _fundingLogos, _cardLogos, venmo_white = __webpack_require__("./src/resources/fundingLogos/venmo_white.svg"), venmo_white_default = __webpack_require__.n(venmo_white), venmo_blue = __webpack_require__("./src/resources/fundingLogos/venmo_blue.svg"), venmo_blue_default = __webpack_require__.n(venmo_blue), elv = __webpack_require__("./src/resources/fundingLogos/elv.svg"), elv_default = __webpack_require__.n(elv), elv_white = __webpack_require__("./src/resources/fundingLogos/elv_white.svg"), elv_white_default = __webpack_require__.n(elv_white), fundingLogos = ((_fundingLogos = {})[constants.h.PP] = ((_BUTTON_LOGO$PP = {})[constants.i.WHITE] = pp_white_default.a, 
        _BUTTON_LOGO$PP[constants.i.BLUE] = pp_blue_default.a, _BUTTON_LOGO$PP[constants.i.BLACK] = pp_black_default.a, 
        _BUTTON_LOGO$PP), _fundingLogos[constants.h.PAYPAL] = function(_ref) {
            var logoColor = _ref.logoColor;
            if (!PAYPAL_LOGO_COLORS[logoColor]) throw new Error("No " + logoColor + " paypal logo available");
            var _PAYPAL_LOGO_COLORS$l = PAYPAL_LOGO_COLORS[logoColor], primary = _PAYPAL_LOGO_COLORS$l.primary, secondary = _PAYPAL_LOGO_COLORS$l.secondary;
            return jsxToHTML("svg", {
                width: "100",
                height: "32",
                viewBox: "0 0 100 32",
                xmlns: "http://www.w3.org/2000/svg",
                preserveAspectRatio: "xMinYMin meet"
            }, jsxToHTML("path", {
                fill: primary,
                d: "M 12 4.917 L 4.2 4.917 C 3.7 4.917 3.2 5.317 3.1 5.817 L 0 25.817 C -0.1 26.217 0.2 26.517 0.6 26.517 L 4.3 26.517 C 4.8 26.517 5.3 26.117 5.4 25.617 L 6.2 20.217 C 6.3 19.717 6.7 19.317 7.3 19.317 L 9.8 19.317 C 14.9 19.317 17.9 16.817 18.7 11.917 C 19 9.817 18.7 8.117 17.7 6.917 C 16.6 5.617 14.6 4.917 12 4.917 Z M 12.9 12.217 C 12.5 15.017 10.3 15.017 8.3 15.017 L 7.1 15.017 L 7.9 9.817 C 7.9 9.517 8.2 9.317 8.5 9.317 L 9 9.317 C 10.4 9.317 11.7 9.317 12.4 10.117 C 12.9 10.517 13.1 11.217 12.9 12.217 Z"
            }), jsxToHTML("path", {
                fill: primary,
                d: "M 35.2 12.117 L 31.5 12.117 C 31.2 12.117 30.9 12.317 30.9 12.617 L 30.7 13.617 L 30.4 13.217 C 29.6 12.017 27.8 11.617 26 11.617 C 21.9 11.617 18.4 14.717 17.7 19.117 C 17.3 21.317 17.8 23.417 19.1 24.817 C 20.2 26.117 21.9 26.717 23.8 26.717 C 27.1 26.717 29 24.617 29 24.617 L 28.8 25.617 C 28.7 26.017 29 26.417 29.4 26.417 L 32.8 26.417 C 33.3 26.417 33.8 26.017 33.9 25.517 L 35.9 12.717 C 36 12.517 35.6 12.117 35.2 12.117 Z M 30.1 19.317 C 29.7 21.417 28.1 22.917 25.9 22.917 C 24.8 22.917 24 22.617 23.4 21.917 C 22.8 21.217 22.6 20.317 22.8 19.317 C 23.1 17.217 24.9 15.717 27 15.717 C 28.1 15.717 28.9 16.117 29.5 16.717 C 30 17.417 30.2 18.317 30.1 19.317 Z"
            }), jsxToHTML("path", {
                fill: primary,
                d: "M 55.1 12.117 L 51.4 12.117 C 51 12.117 50.7 12.317 50.5 12.617 L 45.3 20.217 L 43.1 12.917 C 43 12.417 42.5 12.117 42.1 12.117 L 38.4 12.117 C 38 12.117 37.6 12.517 37.8 13.017 L 41.9 25.117 L 38 30.517 C 37.7 30.917 38 31.517 38.5 31.517 L 42.2 31.517 C 42.6 31.517 42.9 31.317 43.1 31.017 L 55.6 13.017 C 55.9 12.717 55.6 12.117 55.1 12.117 Z"
            }), jsxToHTML("path", {
                fill: secondary,
                d: "M 67.5 4.917 L 59.7 4.917 C 59.2 4.917 58.7 5.317 58.6 5.817 L 55.5 25.717 C 55.4 26.117 55.7 26.417 56.1 26.417 L 60.1 26.417 C 60.5 26.417 60.8 26.117 60.8 25.817 L 61.7 20.117 C 61.8 19.617 62.2 19.217 62.8 19.217 L 65.3 19.217 C 70.4 19.217 73.4 16.717 74.2 11.817 C 74.5 9.717 74.2 8.017 73.2 6.817 C 72 5.617 70.1 4.917 67.5 4.917 Z M 68.4 12.217 C 68 15.017 65.8 15.017 63.8 15.017 L 62.6 15.017 L 63.4 9.817 C 63.4 9.517 63.7 9.317 64 9.317 L 64.5 9.317 C 65.9 9.317 67.2 9.317 67.9 10.117 C 68.4 10.517 68.5 11.217 68.4 12.217 Z"
            }), jsxToHTML("path", {
                fill: secondary,
                d: "M 90.7 12.117 L 87 12.117 C 86.7 12.117 86.4 12.317 86.4 12.617 L 86.2 13.617 L 85.9 13.217 C 85.1 12.017 83.3 11.617 81.5 11.617 C 77.4 11.617 73.9 14.717 73.2 19.117 C 72.8 21.317 73.3 23.417 74.6 24.817 C 75.7 26.117 77.4 26.717 79.3 26.717 C 82.6 26.717 84.5 24.617 84.5 24.617 L 84.3 25.617 C 84.2 26.017 84.5 26.417 84.9 26.417 L 88.3 26.417 C 88.8 26.417 89.3 26.017 89.4 25.517 L 91.4 12.717 C 91.4 12.517 91.1 12.117 90.7 12.117 Z M 85.5 19.317 C 85.1 21.417 83.5 22.917 81.3 22.917 C 80.2 22.917 79.4 22.617 78.8 21.917 C 78.2 21.217 78 20.317 78.2 19.317 C 78.5 17.217 80.3 15.717 82.4 15.717 C 83.5 15.717 84.3 16.117 84.9 16.717 C 85.5 17.417 85.7 18.317 85.5 19.317 Z"
            }), jsxToHTML("path", {
                fill: secondary,
                d: "M 95.1 5.417 L 91.9 25.717 C 91.8 26.117 92.1 26.417 92.5 26.417 L 95.7 26.417 C 96.2 26.417 96.7 26.017 96.8 25.517 L 100 5.617 C 100.1 5.217 99.8 4.917 99.4 4.917 L 95.8 4.917 C 95.4 4.917 95.2 5.117 95.1 5.417 Z"
            }));
        }, _fundingLogos[constants.h.CREDIT] = function(_ref) {
            var logoColor = _ref.logoColor, locale = _ref.locale, isFundingThrottleEnabled = _ref.isFundingThrottleEnabled;
            if (!CREDIT_LOGO_COLORS[logoColor]) throw new Error("No " + logoColor + " credit logo available");
            var country = (locale || {}).country, primary = CREDIT_LOGO_COLORS[logoColor].primary;
            switch (country) {
              case constants.q.DE:
                return jsxToHTML("svg", {
                    width: "135",
                    height: "32",
                    viewBox: "0 0 135 32",
                    preserveAspectRatio: "xMinYMin meet",
                    xmlns: "http://www.w3.org/2000/svg"
                }, jsxToHTML("g", {
                    transform: "matrix(1.3333333,0,0,-1.3333333,10,40)",
                    fill: primary
                }, jsxToHTML("g", {
                    transform: "matrix(0.17016911,0,0,0.17819595,39.327112,22.053803)"
                }, jsxToHTML("path", {
                    d: "m 0,0 -1.35,-8.619 c -0.146,-0.929 -0.946,-1.613 -1.886,-1.613 h -40.935 c -0.922,0 -1.445,1.057 -0.884,1.79 l 29.853,39.007 h -19.237 c -0.683,0 -1.205,0.611 -1.099,1.286 l 1.35,8.619 c 0.145,0.929 0.945,1.613 1.885,1.613 H 7.112 c 0.922,0 1.444,-1.055 0.886,-1.788 L -21.724,1.286 H -1.1 C -0.416,1.286 0.106,0.675 0,0 m 203.3312,42.0833 c 0.684,0 1.206,-0.611 1.1,-1.287 l -4.446,-28.132 c -1.041,-6.73 -2.359,-13.391 -8.395,-18.456 -5.065,-4.302 -12.143,-5.828 -18.248,-5.828 -6.106,0 -12.767,1.526 -16.444,5.828 -4.371,5.065 -3.608,11.726 -2.567,18.456 l 4.394,27.808 c 0.146,0.928 0.946,1.611 1.885,1.611 h 10.668 c 0.683,0 1.205,-0.61 1.1,-1.285 l -4.101,-26.261 c -1.11,-6.799 -1.804,-14.223 6.938,-14.223 8.743,0 10.408,7.424 11.518,14.223 l 4.05,25.932 c 0.145,0.929 0.945,1.614 1.885,1.614 z m -361.2517,-52.3157 h -10.665 c -0.685,0 -1.207,0.611 -1.1,1.287 l 6.249,39.511 h -9.939 c -0.684,0 -1.206,0.61 -1.1,1.285 l 1.35,8.619 c 0.146,0.929 0.946,1.614 1.886,1.614 h 33.145 c 0.684,0 1.206,-0.611 1.1,-1.286 l -1.35,-8.619 c -0.145,-0.929 -0.945,-1.613 -1.885,-1.613 h -9.608 l -6.198,-39.188 c -0.147,-0.927 -0.946,-1.61 -1.885,-1.61 m -98.5277,28.8638 h 1.318 c 4.441,0 9.549,0.837 10.477,6.522 0.929,5.688 -2.034,6.505 -6.779,6.522 h -1.927 c -0.58,0 -1.075,-0.422 -1.166,-0.995 z m 23.345,-28.864 h -13.977 c -0.594,0 -1.136,0.341 -1.393,0.878 l -9.224,19.244 h -0.139 l -2.985,-18.819 c -0.119,-0.75 -0.766,-1.303 -1.526,-1.303 h -10.977 c -0.684,0 -1.206,0.611 -1.1,1.287 l 7.848,49.725 c 0.119,0.751 0.766,1.304 1.526,1.304 h 19.009 c 10.339,0 17.416,-4.926 15.681,-16.097 -1.179,-7.216 -6.175,-13.461 -13.807,-14.779 l 12.015,-19.748 c 0.451,-0.742 -0.083,-1.692 -0.951,-1.692 m 445.918,52.3159 h 11.349 c 0.385,0 0.743,-0.199 0.946,-0.526 l 19.517,-31.46 h 0.139 l 4.81,30.376 c 0.147,0.927 0.946,1.61 1.885,1.61 h 10.667 c 0.684,0 1.206,-0.611 1.099,-1.287 l -7.799,-49.418 c -0.147,-0.927 -0.946,-1.611 -1.886,-1.611 h -11.347 c -0.386,0 -0.744,0.2 -0.947,0.528 l -19.517,31.528 h -0.139 l -4.811,-30.445 c -0.146,-0.928 -0.946,-1.611 -1.885,-1.611 h -10.666 c -0.684,0 -1.206,0.611 -1.1,1.287 l 7.8,49.418 c 0.146,0.928 0.946,1.611 1.885,1.611 m -304.5422,0 h 11.349 c 0.385,0 0.743,-0.199 0.946,-0.526 l 19.517,-31.46 h 0.139 l 4.81,30.376 c 0.147,0.927 0.946,1.61 1.885,1.61 h 10.667 c 0.684,0 1.206,-0.611 1.099,-1.287 l -7.799,-49.418 c -0.147,-0.927 -0.946,-1.611 -1.886,-1.611 h -11.347 c -0.386,0 -0.744,0.2 -0.947,0.528 l -19.517,31.528 h -0.139 l -4.811,-30.445 c -0.146,-0.928 -0.946,-1.611 -1.885,-1.611 h -10.666 c -0.684,0 -1.206,0.611 -1.1,1.287 l 7.8,49.418 c 0.146,0.928 0.946,1.611 1.885,1.611 M 131.156,1.2855 h 15.004 c 0.684,0 1.206,-0.61 1.1,-1.286 l -1.35,-8.619 c -0.145,-0.928 -0.945,-1.613 -1.885,-1.613 h -26.969 c -0.685,0 -1.207,0.611 -1.1,1.287 l 7.799,49.418 c 0.147,0.927 0.946,1.611 1.885,1.611 h 10.666 c 0.684,0 1.206,-0.612 1.099,-1.287 z m -33.5321,20.607 2.937,18.58 c 0.147,0.928 0.946,1.611 1.885,1.611 h 10.666 c 0.684,0 1.206,-0.611 1.1,-1.287 l -7.8,-49.418 c -0.146,-0.927 -0.946,-1.611 -1.885,-1.611 h -10.664 c -0.685,0 -1.207,0.612 -1.1,1.288 l 3.196,20.152 h -19.636 l -3.145,-19.83 c -0.147,-0.927 -0.946,-1.61 -1.885,-1.61 h -10.666 c -0.685,0 -1.207,0.611 -1.1,1.287 l 7.799,49.418 c 0.147,0.928 0.946,1.611 1.885,1.611 h 10.666 c 0.684,0 1.206,-0.611 1.099,-1.287 l -2.988,-18.904 z m 221.8207,-2.9142 c 0.699,0 1.224,-0.638 1.094,-1.325 -1.342,-7.069 -3.07,-13.21 -8.427,-19.351 -6.245,-7.147 -14.432,-10.269 -23.175,-10.269 -16.444,0 -26.088,11.171 -23.521,27.615 2.706,16.999 15.958,28.17 32.819,28.17 10.373,0 17.776,-4.519 20.966,-13.617 0.198,-0.566 -0.087,-1.189 -0.644,-1.409 l -11.599,-4.569 c -0.598,-0.236 -1.275,0.081 -1.466,0.694 -1.354,4.349 -4.637,7.175 -9.686,7.175 -8.95,0 -14.987,-8.535 -16.236,-16.514 -1.318,-8.118 2.29,-16.374 11.24,-16.374 5.898,0 10.894,3.053 12.351,9.089 h -9.793 c -0.686,0 -1.209,0.614 -1.099,1.292 l 1.373,8.458 c 0.088,0.539 0.553,0.935 1.099,0.935 z m -438.1464,9.9777 -1.132,-7.133 h 14.032 c 0.684,0 1.206,-0.61 1.1,-1.285 l -1.35,-8.619 c -0.145,-0.929 -0.945,-1.613 -1.885,-1.613 h -12.076 c -0.937,0 -1.735,-0.68 -1.884,-1.605 l -1.198,-7.415 h 14.865 c 0.684,0 1.206,-0.611 1.1,-1.286 l -1.35,-8.619 c -0.145,-0.929 -0.945,-1.613 -1.885,-1.613 h -26.831 c -0.684,0 -1.206,0.611 -1.099,1.286 l 7.799,49.418 c 0.146,0.928 0.946,1.611 1.885,1.611 h 26.834 c 0.683,0 1.206,-0.61 1.1,-1.285 l -1.35,-8.619 c -0.146,-0.929 -0.946,-1.614 -1.886,-1.614 h -12.904 c -0.939,0 -1.738,-0.682 -1.885,-1.609 M 34.135,25.9168 H 33.996 L 25.739,9.2648 h 11.31 z m -13.807,-27.06 -4.747,-8.518 c -0.197,-0.353 -0.569,-0.571 -0.973,-0.571 H 2.701 c -0.844,0 -1.381,0.902 -0.979,1.644 l 27.171,50.089 c 0.194,0.359 0.57,0.583 0.978,0.583 h 13.29 c 0.523,0 0.976,-0.365 1.088,-0.876 L 55.21,-8.8812 c 0.152,-0.694 -0.377,-1.351 -1.088,-1.351 H 41.905 c -0.525,0 -0.979,0.367 -1.089,0.88 l -1.755,8.209 z m -216.5493,27.06 h -0.139 l -8.257,-16.652 h 11.31 z m -13.807,-27.06 -4.747,-8.518 c -0.197,-0.353 -0.569,-0.571 -0.973,-0.571 h -11.907 c -0.844,0 -1.381,0.902 -0.979,1.644 l 27.171,50.089 c 0.194,0.359 0.57,0.583 0.978,0.583 h 13.29 c 0.523,0 0.976,-0.365 1.088,-0.876 l 10.961,-50.089 c 0.152,-0.694 -0.377,-1.351 -1.088,-1.351 h -12.217 c -0.525,0 -0.979,0.367 -1.089,0.88 l -1.755,8.209 z m 517.9793,-39.4791 -6.146,-39.098 c -0.119,-0.757 0.467,-1.442 1.233,-1.442 h 6.181 c 1.024,0 1.896,0.745 2.055,1.756 l 6.06,38.396 c 0.119,0.757 -0.466,1.442 -1.233,1.442 h -6.917 c -0.614,0 -1.138,-0.447 -1.233,-1.054 m -77.0618,-12.7966 h -7.207 c -0.689,0 -1.334,-0.342 -1.721,-0.912 l -9.942,-14.642 -4.213,14.07 c -0.263,0.88 -1.073,1.484 -1.993,1.484 h -7.084 c -0.856,0 -1.457,-0.842 -1.182,-1.651 l 7.936,-23.294 -7.464,-10.531 c -0.586,-0.827 0.005,-1.97 1.018,-1.97 h 7.2 c 0.683,0 1.322,0.334 1.71,0.895 l 23.968,34.591 c 0.574,0.828 -0.019,1.96 -1.026,1.96 m 58.6183,-13.956 c -0.693,-4.097 -3.945,-6.847 -8.093,-6.847 -2.08,0 -3.744,0.669 -4.815,1.935 -1.06,1.256 -1.46,3.045 -1.123,5.037 0.645,4.06 3.95,6.899 8.035,6.899 2.036,0 3.689,-0.675 4.78,-1.954 1.099,-1.287 1.53,-3.088 1.216,-5.07 m 9.992,13.956 h -7.169 c -0.615,0 -1.138,-0.447 -1.234,-1.054 l -0.315,-2.004 -0.501,0.726 c -1.553,2.254 -5.014,3.007 -8.469,3.007 -7.922,0 -14.689,-6.003 -16.006,-14.422 -0.685,-4.201 0.288,-8.215 2.669,-11.016 2.189,-2.574 5.311,-3.646 9.031,-3.646 6.385,0 9.927,4.102 9.927,4.102 l -0.321,-1.993 c -0.12,-0.758 0.466,-1.443 1.233,-1.443 h 6.457 c 1.024,0 1.896,0.744 2.055,1.756 l 3.876,24.545 c 0.12,0.757 -0.466,1.442 -1.233,1.442 m -116.7913,-13.956 c -0.693,-4.097 -3.945,-6.847 -8.093,-6.847 -2.08,0 -3.744,0.669 -4.815,1.935 -1.06,1.256 -1.46,3.045 -1.123,5.037 0.645,4.06 3.95,6.899 8.035,6.899 2.036,0 3.689,-0.675 4.78,-1.954 1.099,-1.287 1.531,-3.088 1.216,-5.07 m 9.992,13.956 h -7.169 c -0.615,0 -1.138,-0.447 -1.233,-1.054 l -0.316,-2.004 -0.501,0.726 c -1.553,2.254 -5.014,3.007 -8.469,3.007 -7.921,0 -14.689,-6.003 -16.006,-14.422 -0.685,-4.201 0.288,-8.215 2.669,-11.016 2.189,-2.574 5.311,-3.646 9.031,-3.646 6.385,0 9.927,4.102 9.927,4.102 l -0.321,-1.993 c -0.12,-0.758 0.466,-1.443 1.233,-1.443 h 6.457 c 1.024,0 1.896,0.744 2.055,1.756 l 3.876,24.545 c 0.12,0.757 -0.466,1.442 -1.233,1.442 m -43.0269,-0.172 c -0.818,-5.375 -4.924,-5.375 -8.894,-5.375 h -2.259 l 1.585,10.035 c 0.096,0.607 0.618,1.054 1.233,1.054 h 1.035 c 2.703,0 5.256,0 6.572,-1.54 0.787,-0.922 1.026,-2.287 0.728,-4.174 m -1.728,14.023 h -14.974 c -1.024,0 -1.896,-0.745 -2.055,-1.756 l -6.055,-38.396 c -0.119,-0.757 0.466,-1.442 1.233,-1.442 h 7.149 c 1.024,0 1.896,0.745 2.055,1.756 l 1.634,10.358 c 0.16,1.012 1.031,1.757 2.055,1.757 h 4.739 c 9.863,0 15.555,4.773 17.043,14.233 0.669,4.138 0.027,7.389 -1.911,9.665 -2.129,2.502 -5.904,3.825 -10.913,3.825 m 108.5272,-14.023 c -0.818,-5.375 -4.923,-5.375 -8.894,-5.375 h -2.259 l 1.585,10.035 c 0.096,0.607 0.619,1.054 1.233,1.054 h 1.035 c 2.703,0 5.256,0 6.572,-1.54 0.787,-0.922 1.026,-2.287 0.728,-4.174 m -1.728,14.023 h -14.974 c -1.024,0 -1.896,-0.745 -2.055,-1.756 l -6.055,-38.396 c -0.119,-0.757 0.466,-1.442 1.233,-1.442 h 7.683 c 0.717,0 1.327,0.521 1.438,1.229 l 1.717,10.885 c 0.16,1.012 1.031,1.757 2.055,1.757 h 4.739 c 9.863,0 15.555,4.773 17.043,14.233 0.669,4.138 0.027,7.389 -1.911,9.665 -2.129,2.502 -5.903,3.825 -10.913,3.825 m -161.6161,-40.475 -4.55,18.557 h 3.561 l 3.442,-14.442 7.914,14.442 h 3.798 l -15.748,-27.656 h -3.758 z M 82.525,-65.6994 c -0.989,1.121 -2.328,1.681 -4.016,1.681 -1.319,0 -2.546,-0.356 -3.679,-1.068 -1.135,-0.712 -2.045,-1.701 -2.731,-2.967 -0.686,-1.267 -1.028,-2.691 -1.028,-4.274 0,-1.767 0.5,-3.205 1.503,-4.313 1.002,-1.107 2.242,-1.661 3.719,-1.661 1.346,0 2.612,0.369 3.799,1.108 1.187,0.738 2.136,1.746 2.848,3.026 0.713,1.28 1.069,2.672 1.069,4.175 0,1.74 -0.495,3.171 -1.484,4.293 m -8.527,12.206 -1.661,-10.604 c 0.791,0.976 1.806,1.761 3.047,2.354 1.239,0.594 2.65,0.891 4.233,0.891 1.529,0 2.908,-0.376 4.135,-1.128 1.226,-0.752 2.182,-1.787 2.868,-3.106 0.686,-1.319 1.029,-2.809 1.029,-4.472 0,-2.162 -0.515,-4.153 -1.543,-5.974 -1.029,-1.819 -2.388,-3.264 -4.075,-4.332 -1.689,-1.068 -3.469,-1.602 -5.342,-1.602 -1.635,0 -2.981,0.329 -4.036,0.988 -1.055,0.659 -1.912,1.623 -2.571,2.889 l -0.515,-3.205 h -3.403 l 4.313,27.301 z M 39.4576,-76.5416 c 0.976,-1.121 2.308,-1.681 3.996,-1.681 1.319,0 2.552,0.356 3.699,1.069 1.148,0.712 2.064,1.701 2.751,2.967 0.685,1.266 1.028,2.691 1.028,4.273 0,1.767 -0.501,3.198 -1.503,4.293 -1.003,1.095 -2.256,1.642 -3.759,1.642 -1.32,0 -2.572,-0.37 -3.759,-1.108 -1.187,-0.738 -2.136,-1.741 -2.849,-3.007 -0.712,-1.266 -1.068,-2.651 -1.068,-4.155 0,-1.741 0.488,-3.171 1.464,-4.293 m 9.892,-4.253 0.474,2.968 c -0.844,-1.108 -1.899,-1.986 -3.165,-2.631 -1.266,-0.647 -2.704,-0.969 -4.313,-0.969 -1.53,0 -2.902,0.369 -4.115,1.107 -1.214,0.738 -2.163,1.767 -2.848,3.086 -0.687,1.319 -1.029,2.823 -1.029,4.51 0,2.111 0.507,4.083 1.523,5.916 1.016,1.833 2.347,3.29 3.996,4.372 1.648,1.081 3.357,1.622 5.124,1.622 3.297,0 5.553,-1.279 6.766,-3.837 l 1.781,11.157 h 3.521 l -4.313,-27.301 z m -28.8284,15.3321 c -1.253,-1.094 -2.104,-2.421 -2.552,-3.976 h 11.474 c 0.026,0.21 0.04,0.501 0.04,0.87 0,1.478 -0.395,2.638 -1.187,3.482 -0.792,0.844 -1.913,1.266 -3.363,1.266 -1.688,0 -3.159,-0.548 -4.412,-1.642 m 10.406,2.454 c 1.306,-1.439 1.958,-3.305 1.958,-5.6 0,-0.764 -0.039,-1.397 -0.118,-1.899 -0.079,-0.501 -0.212,-1.095 -0.396,-1.78 h -14.877 c -0.079,-1.979 0.435,-3.502 1.543,-4.57 1.108,-1.068 2.612,-1.602 4.511,-1.602 1.319,0 2.519,0.164 3.601,0.494 1.081,0.33 2.149,0.824 3.205,1.484 l -0.476,-2.968 c -2.031,-1.371 -4.431,-2.057 -7.201,-2.057 -1.82,0 -3.396,0.39 -4.728,1.167 -1.332,0.777 -2.348,1.854 -3.046,3.225 -0.699,1.371 -1.049,2.914 -1.049,4.629 0,1.688 0.422,3.435 1.266,5.243 0.845,1.806 2.124,3.323 3.839,4.55 1.714,1.226 3.824,1.84 6.33,1.84 2.453,0 4.333,-0.719 5.638,-2.156 m -18.0138,-1.4448 c -1.556,0 -2.875,-0.561 -3.956,-1.681 -1.082,-1.122 -1.794,-2.751 -2.137,-4.888 l -1.543,-9.772 h -3.522 l 3.047,19.308 h 3.403 l -0.515,-3.283 c 1.583,2.268 3.483,3.402 5.698,3.402 0.554,0 1.068,-0.039 1.543,-0.119 l -0.475,-3.086 c -0.474,0.079 -0.989,0.119 -1.543,0.119 m -24.5657,-1.0092 c -1.253,-1.094 -2.104,-2.421 -2.552,-3.976 h 11.474 c 0.026,0.21 0.04,0.501 0.04,0.87 0,1.478 -0.396,2.638 -1.187,3.482 -0.792,0.844 -1.913,1.266 -3.363,1.266 -1.689,0 -3.159,-0.548 -4.412,-1.642 m 10.406,2.454 c 1.305,-1.439 1.958,-3.305 1.958,-5.6 0,-0.764 -0.039,-1.397 -0.118,-1.899 -0.079,-0.501 -0.212,-1.095 -0.396,-1.78 h -14.877 c -0.079,-1.979 0.435,-3.502 1.543,-4.57 1.108,-1.068 2.612,-1.602 4.511,-1.602 1.319,0 2.519,0.164 3.601,0.494 1.081,0.33 2.149,0.824 3.204,1.484 l -0.475,-2.968 c -2.031,-1.371 -4.431,-2.057 -7.201,-2.057 -1.82,0 -3.396,0.39 -4.728,1.167 -1.332,0.777 -2.348,1.854 -3.046,3.225 -0.699,1.371 -1.049,2.914 -1.049,4.629 0,1.688 0.422,3.435 1.266,5.243 0.844,1.806 2.124,3.323 3.838,4.55 1.715,1.226 3.824,1.84 6.331,1.84 2.453,0 4.333,-0.719 5.638,-2.156 m -24.4869,-17.7856 h -3.561 l -2.057,14.837 -6.766,-14.837 h -3.522 l -2.77,19.308 h 3.522 l 1.741,-15.193 6.805,15.193 h 3.324 l 2.017,-15.154 6.529,15.154 h 3.6 z M -59.063,-65.225 c -1.201,-0.778 -2.124,-1.807 -2.77,-3.086 -0.647,-1.28 -0.969,-2.619 -0.969,-4.017 0,-1.741 0.494,-3.171 1.484,-4.292 0.988,-1.122 2.261,-1.682 3.817,-1.682 1.53,0 2.889,0.402 4.076,1.207 1.187,0.805 2.11,1.852 2.769,3.146 0.659,1.292 0.99,2.637 0.99,4.035 0,1.715 -0.495,3.12 -1.484,4.215 -0.989,1.093 -2.262,1.641 -3.818,1.641 -1.53,0 -2.896,-0.389 -4.095,-1.167 M -50.28,-62 c 1.332,-0.766 2.368,-1.827 3.106,-3.185 0.738,-1.359 1.108,-2.896 1.108,-4.61 0,-1.952 -0.482,-3.825 -1.444,-5.618 -0.963,-1.794 -2.321,-3.251 -4.075,-4.372 -1.755,-1.122 -3.766,-1.682 -6.034,-1.682 -1.688,0 -3.199,0.383 -4.531,1.148 -1.331,0.764 -2.374,1.833 -3.125,3.205 -0.752,1.37 -1.128,2.914 -1.128,4.628 0,1.979 0.481,3.859 1.444,5.639 0.963,1.781 2.321,3.224 4.076,4.332 1.753,1.108 3.764,1.663 6.033,1.663 1.715,0 3.238,-0.383 4.57,-1.148 m -20.7559,4.1545 c -0.897,0.87 -2.255,1.305 -4.075,1.305 h -4.471 l -1.82,-11.513 h 4.668 c 2.401,0 4.175,0.639 5.322,1.919 1.148,1.279 1.721,2.894 1.721,4.847 0,1.424 -0.448,2.571 -1.345,3.442 m 3.027,2.373 c 1.464,-1.318 2.196,-3.112 2.196,-5.38 0,-3.113 -0.944,-5.599 -2.829,-7.459 -1.887,-1.859 -4.715,-2.789 -8.487,-2.789 h -4.748 l -1.543,-9.694 h -3.759 l 4.313,27.301 h 8.309 c 2.901,0 5.084,-0.66 6.548,-1.979"
                }))));

              default:
                return isFundingThrottleEnabled ? jsxToHTML("svg", {
                    width: "482",
                    height: "100",
                    preserveAspectRatio: "xMinYMin meet",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 53 11"
                }, jsxToHTML("title", null, "checkout_bml_text"), jsxToHTML("g", {
                    fill: "#003087",
                    id: "Bill_Me_Later_orig",
                    "data-name": "Bill Me Later_orig"
                }, jsxToHTML("path", {
                    fill: "#009cde",
                    class: "cls-47",
                    d: "M21.15,6.17C21.09,5,21,3.58,21,2.54h0c-.29,1-.64,2-1.06,3.2L18.44,9.81h-.82l-1.36-4c-.4-1.19-.74-2.27-1-3.27h0c0,1-.09,2.46-.16,3.72l-.22,3.61h-1l.59-8.41h1.39l1.44,4.07c.35,1,.64,2,.85,2.83h0c.21-.85.51-1.77.89-2.83l1.5-4.07H21.9l.52,8.41H21.36Z"
                }), jsxToHTML("path", {
                    fill: "#009cde",
                    class: "cls-47",
                    d: "M24.11,7a1.94,1.94,0,0,0,2.07,2.1,4,4,0,0,0,1.67-.31l.19.79A4.85,4.85,0,0,1,26,10a2.82,2.82,0,0,1-3-3.06c0-1.82,1.07-3.26,2.83-3.26a2.56,2.56,0,0,1,2.5,2.85,4.17,4.17,0,0,1,0,.51Zm3.22-.79a1.56,1.56,0,0,0-1.52-1.78,1.82,1.82,0,0,0-1.69,1.78Z"
                }), jsxToHTML("path", {
                    class: "cls-48",
                    d: "M1,1.56a10.52,10.52,0,0,1,2-.17A3.48,3.48,0,0,1,5.29,2,1.77,1.77,0,0,1,6,3.48,2,2,0,0,1,4.57,5.33v0A2.17,2.17,0,0,1,6.3,7.47a2.27,2.27,0,0,1-.71,1.69,4.23,4.23,0,0,1-2.91.79A12.68,12.68,0,0,1,1,9.84ZM2.09,5h1c1.15,0,1.82-.6,1.82-1.41,0-1-.75-1.37-1.85-1.37a4.68,4.68,0,0,0-1,.07Zm0,4a5.83,5.83,0,0,0,.91,0c1.12,0,2.16-.41,2.16-1.64S4.17,5.83,3,5.83h-.9Z"
                }), jsxToHTML("path", {
                    class: "cls-48",
                    d: "M8.34,2.12A.68.68,0,0,1,7,2.12a.67.67,0,0,1,.69-.69.65.65,0,0,1,.67.69M7.12,3.82h1.1v6H7.12Z"
                }), jsxToHTML("rect", {
                    class: "cls-48",
                    x: "9.39",
                    y: "1",
                    width: "1.1",
                    height: "8.86"
                }), jsxToHTML("rect", {
                    class: "cls-48",
                    x: "11.68",
                    y: "1",
                    width: "1.1",
                    height: "8.86"
                }), jsxToHTML("polygon", {
                    class: "cls-48",
                    points: "29.24 1.45 30.33 1.45 30.33 8.95 33.92 8.95 33.92 9.86 29.24 9.86 29.24 1.45"
                }), jsxToHTML("path", {
                    class: "cls-48",
                    d: "M38.9,8.41A8.53,8.53,0,0,0,39,9.86H38l-.09-.76h0A2.25,2.25,0,0,1,36,10a1.72,1.72,0,0,1-1.85-1.74C34.18,6.8,35.48,6,37.81,6V5.89a1.25,1.25,0,0,0-1.37-1.4,3,3,0,0,0-1.57.45l-.25-.72a3.75,3.75,0,0,1,2-.54c1.85,0,2.3,1.26,2.3,2.47ZM37.84,6.78c-1.2,0-2.56.19-2.56,1.36a1,1,0,0,0,1,1,1.5,1.5,0,0,0,1.46-1,1.15,1.15,0,0,0,.06-.35Z"
                }), jsxToHTML("path", {
                    class: "cls-48",
                    d: "M41.27,2.37V3.82h1.57v.84H41.27V7.92c0,.75.21,1.17.82,1.17A2,2,0,0,0,42.73,9l.05.82a2.65,2.65,0,0,1-1,.16,1.53,1.53,0,0,1-1.19-.47A2.24,2.24,0,0,1,40.2,8V4.66h-.94V3.82h.94V2.71Z"
                }), jsxToHTML("path", {
                    class: "cls-48",
                    d: "M43.93,7A1.94,1.94,0,0,0,46,9.14a4,4,0,0,0,1.67-.31l.19.79a4.86,4.86,0,0,1-2,.39,2.82,2.82,0,0,1-3-3.06c0-1.82,1.07-3.26,2.83-3.26a2.56,2.56,0,0,1,2.5,2.85,4.16,4.16,0,0,1,0,.51Zm3.22-.79a1.56,1.56,0,0,0-1.52-1.78,1.82,1.82,0,0,0-1.69,1.78Z"
                }), jsxToHTML("path", {
                    class: "cls-48",
                    d: "M49,5.71c0-.71,0-1.32,0-1.88h1l0,1.19h0a1.81,1.81,0,0,1,1.67-1.32,1.18,1.18,0,0,1,.31,0v1a1.63,1.63,0,0,0-.37,0,1.54,1.54,0,0,0-1.47,1.41,3.08,3.08,0,0,0-.05.51V9.86H49Z"
                }))) : jsxToHTML("svg", {
                    width: "100",
                    height: "32",
                    viewBox: "0 0 95 32",
                    preserveAspectRatio: "xMinYMin meet",
                    xmlns: "http://www.w3.org/2000/svg"
                }, jsxToHTML("path", {
                    fill: primary,
                    d: "M 52.732 6.347 C 52.83 5.963 53.122 5.675 53.512 5.675 L 60.626 5.675 C 66.571 5.675 70.664 10.187 69.69 15.851 C 68.813 21.515 63.16 25.931 57.313 25.931 L 50.004 25.931 C 49.711 25.931 49.516 25.739 49.614 25.451 L 52.732 6.347 Z M 55.753 21.515 L 57.02 21.515 C 60.236 21.515 63.355 19.787 64.037 15.851 C 64.622 12.203 62.478 10.187 58.97 10.187 L 57.995 10.187 C 57.8 10.187 57.605 10.283 57.605 10.475 L 55.753 21.515 Z"
                }), jsxToHTML("path", {
                    fill: primary,
                    d: "M 43.571 10.763 L 43.084 13.547 L 48.737 13.547 C 49.029 13.547 49.224 13.739 49.224 14.027 L 48.639 17.387 C 48.542 17.771 48.249 17.963 47.859 17.963 L 42.987 17.963 C 42.597 17.963 42.304 18.251 42.207 18.635 L 41.72 21.515 L 47.762 21.515 C 48.054 21.515 48.249 21.707 48.152 21.995 L 47.665 25.355 C 47.567 25.643 47.275 25.931 46.885 25.931 L 36.067 25.931 C 35.775 25.931 35.58 25.643 35.58 25.451 L 38.699 6.347 C 38.796 5.963 39.186 5.675 39.478 5.675 L 50.393 5.675 C 50.588 5.675 50.881 5.963 50.783 6.155 L 50.296 9.515 C 50.198 9.899 49.906 10.091 49.516 10.091 L 44.254 10.091 C 43.864 10.187 43.571 10.379 43.571 10.763 Z"
                }), jsxToHTML("path", {
                    fill: primary,
                    d: "M 74.563 25.931 L 70.274 25.931 C 69.982 25.931 69.787 25.739 69.787 25.451 L 73.003 6.347 C 73.003 5.963 73.393 5.675 73.685 5.675 L 78.071 5.675 C 78.266 5.675 78.558 5.963 78.461 6.251 L 75.342 25.355 C 75.245 25.643 74.952 25.931 74.563 25.931 Z"
                }), jsxToHTML("path", {
                    fill: primary,
                    d: "M 34.118 25.931 L 28.466 25.931 C 28.173 25.931 27.978 25.835 27.881 25.643 L 24.178 18.155 L 24.08 18.155 L 22.911 25.451 C 22.813 25.739 22.618 25.931 22.326 25.931 L 17.843 25.931 C 17.551 25.931 17.356 25.739 17.453 25.451 L 20.572 6.251 C 20.669 5.963 20.864 5.675 21.156 5.675 L 28.855 5.675 C 33.046 5.675 35.97 7.595 35.288 11.915 C 34.8 14.699 32.754 17.195 29.635 17.675 L 34.508 25.355 C 34.703 25.547 34.411 25.931 34.118 25.931 Z M 24.665 14.795 L 25.152 14.795 C 27.004 14.795 29.05 14.411 29.44 12.203 C 29.83 10.091 28.661 9.707 26.711 9.707 L 25.932 9.707 C 25.639 9.707 25.445 9.899 25.445 10.091 L 24.665 14.795 Z"
                }), jsxToHTML("path", {
                    fill: primary,
                    d: "M 86.16 25.931 L 81.872 25.931 C 81.579 25.931 81.384 25.739 81.482 25.451 L 83.918 10.187 L 79.923 10.187 C 79.63 10.187 79.435 9.899 79.533 9.611 L 80.02 6.347 C 80.118 5.963 80.41 5.675 80.8 5.675 L 94.249 5.675 C 94.444 5.675 94.736 5.963 94.639 6.251 L 94.054 9.515 C 94.054 9.899 93.761 10.187 93.372 10.187 L 89.473 10.187 L 86.939 25.355 C 86.939 25.643 86.647 25.931 86.16 25.931 Z"
                }), jsxToHTML("path", {
                    fill: primary,
                    d: "M 17.648 11.435 C 17.648 11.819 17.161 12.011 16.868 11.723 C 15.894 10.763 14.529 10.283 13.068 10.283 C 9.657 10.283 7.025 12.779 6.441 15.851 C 5.953 19.019 7.902 21.323 11.313 21.323 C 12.678 21.323 14.237 20.843 15.407 19.979 C 15.796 19.787 16.284 20.075 16.186 20.459 L 15.407 25.067 C 15.309 25.355 15.114 25.547 14.822 25.643 C 13.165 26.123 11.898 26.507 10.339 26.507 C 1.178 26.507 -0.284 19.019 0.203 15.851 C 1.47 6.923 9.072 4.907 13.652 5.195 C 15.114 5.195 16.479 5.387 17.745 5.867 C 18.233 6.059 18.428 6.443 18.33 6.923 L 17.648 11.435 Z"
                }));
            }
        }, _fundingLogos[constants.h.VENMO] = ((_BUTTON_LOGO$VENMO = {})[constants.i.WHITE] = venmo_white_default.a, 
        _BUTTON_LOGO$VENMO[constants.i.BLUE] = venmo_blue_default.a, _BUTTON_LOGO$VENMO), 
        _fundingLogos[constants.h.IDEAL] = function(_ref) {
            var logoColor = _ref.logoColor;
            if (!IDEAL_LOGO_COLORS[logoColor]) throw new Error("No " + logoColor + " ideal logo available");
            var _IDEAL_LOGO_COLORS$lo = IDEAL_LOGO_COLORS[logoColor], primary = _IDEAL_LOGO_COLORS$lo.primary, secondary = _IDEAL_LOGO_COLORS$lo.secondary, tertiary = _IDEAL_LOGO_COLORS$lo.tertiary;
            return jsxToHTML("svg", {
                width: "38",
                height: "32",
                viewBox: "0 0 38 32",
                preserveAspectRatio: "xMinYMin meet",
                xmlns: "http://www.w3.org/2000/svg"
            }, jsxToHTML("polygon", {
                fill: primary,
                points: "4.47 27.632 10.452 27.632 10.452 17.982 4.47 17.982"
            }), jsxToHTML("g", {
                transform: "matrix(0.952642, 0, 0, 0.930979, 0.31993, 0.181113)"
            }, jsxToHTML("path", {
                d: "M11.1102604,13.937999 C11.1102604,15.8893766 9.51859887,17.4723289 7.55546104,17.4723289 C5.59238806,17.4723289 4.00066169,15.8893766 4.00066169,13.937999 C4.00066169,11.9865569 5.59238806,10.4043136 7.55546104,10.4043136 C9.51859887,10.4043136 11.1102604,11.9865569 11.1102604,13.937999",
                fill: primary
            }), jsxToHTML("g", null, jsxToHTML("mask", {
                fill: secondary
            }, jsxToHTML("polygon", {
                points: "39.1898554 33.9678282 0 33.9678282 0 0.001572704 39.1898554 0.001572704",
                transform: "matrix(1, 0, 0, 1, 0, 0)"
            })), jsxToHTML("g", null), jsxToHTML("path", {
                d: "M22.1049929,2.25750057 C26.4717361,2.25750057 30.1110886,3.433548 32.6296578,5.65853743 C35.476843,8.17370364 36.9204068,11.9843525 36.9204068,16.9847134 C36.9204068,26.8945533 32.0742264,31.7119261 22.1049929,31.7119261 L2.26942909,31.7119261 L2.26942909,2.25750057 L22.1049929,2.25750057 Z M22.531325,0.001572704 L-1.9452416e-05,0.001572704 L-1.9452416e-05,33.967854 L22.531325,33.967854 L22.531325,33.9614085 C27.4529808,33.8947619 31.3518934,32.6793969 34.1187402,30.3394196 C37.4837488,27.4935988 39.1898554,23.0003706 39.1898554,16.9847134 C39.1898554,14.1090499 38.7410881,11.5297509 37.8560681,9.31836144 C37.0093692,7.2028812 35.758125,5.40419768 34.13722,3.97219912 C31.2823834,1.45020067 27.2749912,0.0865245021 22.531325,0.00904949351 L22.531325,0.001572704 Z",
                fill: primary
            })), jsxToHTML("path", {
                d: "M21.4851352,29.4975138 L13.5194356,29.4975138 L13.5194356,5.00387361 L21.4851352,5.00387361 L21.1636516,5.00387361 C27.8067813,5.00387361 34.8779291,7.60998594 34.8779291,17.282889 C34.8779291,27.5088167 27.8067813,29.4975138 21.1636516,29.4975138 L21.4851352,29.4975138 Z",
                fill: tertiary
            })), jsxToHTML("g", {
                transform: "matrix(0.952642, 0, 0, 0.930979, 11.685725, 10.562208)",
                fill: secondary
            }, jsxToHTML("path", {
                d: "M1.41115607,1.17495169 L1.41115607,5.07048794 L2.30681015,5.07048794 C2.64178075,5.07048794 2.88357428,5.05173151 3.03219074,5.0142831 C3.2267149,4.96613516 3.38810511,4.88459948 3.51649106,4.76961161 C3.64474732,4.65455929 3.749531,4.46538363 3.83058274,4.20189125 C3.91163447,3.93846333 3.95216034,3.57944852 3.95216034,3.12471792 C3.95216034,2.67005177 3.91163447,2.3210275 3.83058274,2.07764511 C3.749531,1.83426272 3.63605858,1.64437805 3.49016546,1.5079911 C3.34420749,1.37160414 3.15915018,1.27930447 2.93492866,1.23109207 C2.76737852,1.19370812 2.43915142,1.17495169 1.95018252,1.17495169 L1.41115607,1.17495169 Z M0.215675421,0.175897919 L2.40271056,0.175897919 C2.89589415,0.175897919 3.27190935,0.213410777 3.53069132,0.288436492 C3.878306,0.390275522 4.17612249,0.571265392 4.42407595,0.831212737 C4.67202941,1.09116008 4.86065301,1.40950373 4.99001157,1.78598587 C5.11937014,2.16253246 5.18408185,2.62686687 5.18408185,3.1789891 C5.18408185,3.66407805 5.12345515,4.08213371 5.00220176,4.433285 C4.85397434,4.86210466 4.6423969,5.20919527 4.36753426,5.47449239 C4.15997698,5.67552779 3.87966767,5.832347 3.52660632,5.94488558 C3.26244251,6.02796818 2.90938115,6.06954171 2.46742226,6.06954171 L0.215675421,6.06954171 L0.215675421,0.175897919 Z"
            }), jsxToHTML("path", {
                d: "M2.40271056,0.337035624 C2.87825729,0.337035624 3.24247136,0.372743739 3.48523751,0.443128689 C3.80302515,0.536201827 4.07944398,0.704171771 4.30645367,0.942075479 C4.53702965,1.18384649 4.7154083,1.48530291 4.83666169,1.83813003 C4.95966581,2.19611355 5.02197838,2.64723467 5.02197838,3.1789891 C5.02197838,3.64390361 4.96375081,4.04829479 4.84885188,4.38094747 C4.70970226,4.78359837 4.50973142,5.11264156 4.25458057,5.35892443 C4.06589213,5.54165459 3.80438682,5.68712971 3.47713234,5.79148248 C3.23060538,5.86895749 2.89070683,5.908404 2.46742226,5.908404 L0.377778888,5.908404 L0.377778888,0.337035624 L2.40271056,0.337035624 Z M0.0535719538,0.0147602138 L0.0535719538,6.23067941 L2.46742226,6.23067941 C2.92390562,6.23067941 3.2967436,6.18614095 3.57549672,6.09848204 C3.95157676,5.97866004 4.25594223,5.80759625 4.48061764,5.58993144 C4.77246872,5.30819828 4.9996081,4.93661473 5.15548679,4.48562252 C5.28205718,4.11919538 5.34618531,3.67954727 5.34618531,3.1789891 C5.34618531,2.61178438 5.27797217,2.12559969 5.1434263,1.73390616 C5.00706486,1.33699177 4.80456521,0.995959927 4.54169823,0.720349996 C4.27494076,0.440679396 3.9502151,0.243317935 3.57646934,0.133873205 C3.29992083,0.0536910833 2.91612466,0.0147602138 2.40271056,0.0147602138 L0.0535719538,0.0147602138 Z"
            }), jsxToHTML("path", {
                d: "M1.9501501,1.33608939 C2.54124418,1.33608939 2.79263424,1.36451409 2.899428,1.38836247 C3.09466542,1.43032272 3.25566658,1.50998921 3.37905974,1.6253638 C3.50439814,1.74254314 3.60457808,1.91180219 3.6766817,2.12824235 C3.75189771,2.35415741 3.79002445,2.68945275 3.79002445,3.12471792 C3.79002445,3.56127219 3.75150867,3.90784717 3.67551456,4.15477459 C3.60360546,4.38861762 3.51354078,4.55523401 3.40791416,4.64991853 C3.30014777,4.74647224 3.16054427,4.81647046 2.99299412,4.85797953 C2.85754047,4.89207627 2.62683481,4.90935023 2.30677773,4.90935023 L1.57329196,4.90935023 L1.57329196,1.33608939 L1.9501501,1.33608939 Z M1.24902018,1.01381398 L1.24902018,5.23162564 L2.30677773,5.23162564 C2.65860709,5.23162564 2.90889484,5.21158011 3.07203577,5.17052222 C3.29100514,5.1163155 3.47729444,5.02163098 3.62500312,4.88924025 C3.77699133,4.7529822 3.89493781,4.54356764 3.98558607,4.24900792 C4.07214932,3.96766148 4.11423138,3.59988078 4.11423138,3.12471792 C4.11423138,2.64833041 4.07176027,2.2893156 3.98441893,2.02698342 C3.89519718,1.75904364 3.76622766,1.54492386 3.60120633,1.39061839 C3.43423976,1.23450819 3.22162485,1.12789948 2.96919733,1.0736283 C2.78932733,1.03347278 2.45558871,1.01381398 1.9501501,1.01381398 L1.24902018,1.01381398 Z"
            }), jsxToHTML("polygon", {
                points: "6.53678989 6.06950948 6.53678989 0.175865691 10.9257088 0.175865691 10.9257088 1.17491946 7.73227054 1.17491946 7.73227054 2.48013487 10.702849 2.48013487 10.702849 3.47918864 7.73227054 3.47918864 7.73227054 5.07045571 11.0391813 5.07045571 11.0391813 6.06950948"
            }), jsxToHTML("path", {
                d: "M10.7636378,0.337035624 L10.7636378,1.01381398 L7.57019949,1.01381398 L7.57019949,2.64130481 L10.5407779,2.64130481 L10.5407779,3.31808317 L7.57019949,3.31808317 L7.57019949,5.23162564 L10.8771102,5.23162564 L10.8771102,5.908404 L6.69892578,5.908404 L6.69892578,0.337035624 L10.7636378,0.337035624 Z M6.37471884,0.0147602138 L6.37471884,6.23067941 L11.2013172,6.23067941 L11.2013172,4.90935023 L7.89440643,4.90935023 L7.89440643,3.64035858 L10.8649849,3.64035858 L10.8649849,2.3190294 L7.89440643,2.3190294 L7.89440643,1.33608939 L11.0878447,1.33608939 L11.0878447,0.0147602138 L6.37471884,0.0147602138 Z"
            }), jsxToHTML("path", {
                d: "M15.5303032,3.73301276 L14.7130424,1.54959685 L13.9121864,3.73301276 L15.5303032,3.73301276 Z M17.7341971,6.06950948 L16.431793,6.06950948 L15.9144884,4.73206653 L13.5458326,4.73206653 L13.055113,6.06950948 L11.7849999,6.06950948 L14.0890089,0.175865691 L15.363207,0.175865691 L17.7341971,6.06950948 Z"
            }), jsxToHTML("path", {
                d: "M15.2534629,0.337035624 C15.3291976,0.525244463 17.332991,5.50626875 17.4947703,5.908404 L16.5431581,5.908404 C16.4751395,5.73244163 16.0257887,4.57096105 16.0257887,4.57096105 L13.4323926,4.57096105 C13.4323926,4.57096105 13.0075518,5.72876769 12.9417378,5.908404 L12.0218979,5.908404 C12.1781008,5.50884695 14.1252876,0.527951577 14.1999201,0.337035624 L15.2534629,0.337035624 Z M13.9780328,0.0147602138 L11.5481019,6.23067941 L13.168553,6.23067941 C13.168553,6.23067941 13.5933289,5.07280832 13.6592077,4.89323646 L15.8031882,4.89323646 C15.871142,5.06913438 16.3204928,6.23067941 16.3204928,6.23067941 L17.9736239,6.23067941 L15.472951,0.0147602138 L13.9780328,0.0147602138 Z"
            }), jsxToHTML("path", {
                d: "M14.7145337,2.01579402 C14.8921991,2.49044124 15.1926093,3.29290701 15.2970039,3.57186861 L14.1437998,3.57186861 C14.2457305,3.2940672 14.5401752,2.49134361 14.7145337,2.01579402 L14.7145337,2.01579402 Z M13.680573,3.89414402 L15.7636025,3.89414402 L14.7114862,1.0833868 L13.680573,3.89414402 Z"
            }), jsxToHTML("polygon", {
                points: "18.7343171 6.06950948 18.7343171 0.224207003 19.9297978 0.224207003 19.9297978 5.07045571 22.9084814 5.07045571 22.9084814 6.06950948"
            }), jsxToHTML("path", {
                d: "M19.7677267,0.385376935 L19.7677267,5.23162564 L22.7464104,5.23162564 L22.7464104,5.908404 L18.8963882,5.908404 L18.8963882,0.385376935 L19.7677267,0.385376935 Z M18.5722461,0.0631015253 L18.5722461,6.23067941 L23.0706173,6.23067941 L23.0706173,4.90935023 L20.0919337,4.90935023 L20.0919337,0.0631015253 L18.5722461,0.0631015253 Z"
            })));
        }, _fundingLogos[constants.h.ELV] = ((_BUTTON_LOGO$ELV = {})[constants.i.ANY] = elv_default.a, 
        _BUTTON_LOGO$ELV[constants.i.WHITE] = elv_white_default.a, _BUTTON_LOGO$ELV), _fundingLogos[constants.h.BANCONTACT] = function(_ref) {
            var logoColor = _ref.logoColor;
            if (!BANCONTACT_LOGO_COLORS[logoColor]) throw new Error("No " + logoColor + " bancontact logo available");
            var _BANCONTACT_LOGO_COLO2 = BANCONTACT_LOGO_COLORS[logoColor], primary = _BANCONTACT_LOGO_COLO2.primary, secondary = _BANCONTACT_LOGO_COLO2.secondary;
            return jsxToHTML("svg", {
                version: "1.1",
                id: "Layer_1",
                x: "0px",
                y: "0px",
                width: "226px",
                height: "32px",
                viewBox: "36.09922790527344 36.68461608886719 226 32",
                style: "enable-background:new 0 0 476.9 123.4;",
                xmlns: "http://www.w3.org/2000/svg"
            }, jsxToHTML("g", {
                transform: "matrix(0.557769, 0, 0, 0.557769, 15.684875, 18.15871)"
            }, jsxToHTML("g", null, jsxToHTML("path", {
                fill: primary,
                d: "M147.6,50.2h-5.8h-26.9h-5.8l-3.9,4.4L92.5,68.9l0,0l-3.9,4.4h-6H56.2h-5.8l3.9-4.5l1.8-2.1l3.9-4.5h-5.8h-7.6 h-4.2c-3.2,0-5.8,2.7-5.8,6l0,0v11.5v1.1c0,3.3,2.6,6,5.8,6H44h61.1h4.4c3.2,0,7.6-2,9.7-4.4l10.2-11.6L147.6,50.2z"
            }), jsxToHTML("path", {
                fill: secondary,
                d: "M155.3,36.8c3.2,0,5.8,2.7,5.8,6v12.6c0,3.3-2.6,6-5.8,6h-3.2h-8.5h-5.8l3.9-4.4l0,0l1.9-2.2l3.9-4.4h-38.6 L88.3,73.6H50l27.5-31.1l1-1.2c2.2-2.4,6.5-4.4,9.7-4.4h1.4h65.7V36.8z"
            })), jsxToHTML("path", {
                fill: primary,
                d: "M 440.7 85.6 L 440.7 81.8 C 440.7 81.3 440.4 81 439.7 81 L 437.3 81 C 436.6 81 436.1 80.9 436 80.6 C 435.8 80.3 435.8 79.7 435.8 78.7 L 435.8 64.7 L 439.7 64.7 C 440 64.7 440.2 64.6 440.4 64.4 C 440.6 64.2 440.7 64 440.7 63.7 L 440.7 59.8 C 440.7 59.5 440.6 59.3 440.4 59.1 C 440.2 58.9 440 58.8 439.7 58.8 L 435.8 58.8 L 435.8 53.8 C 435.8 53.5 435.7 53.3 435.6 53.2 C 435.4 53.1 435.2 53 435 53 L 434.9 53 L 429.1 54 C 428.8 54.1 428.6 54.2 428.4 54.3 C 428.2 54.5 428.1 54.7 428.1 54.9 L 428.1 58.8 L 424.2 58.8 C 423.9 58.8 423.7 58.9 423.5 59.1 C 423.3 59.3 423.2 59.5 423.2 59.8 L 423.2 63 C 423.2 63.3 423.3 63.5 423.5 63.6 C 423.7 63.8 423.9 63.9 424.2 64 L 428.1 64.6 L 428.1 78.6 C 428.1 80.3 428.3 81.7 428.6 82.8 C 429 83.9 429.5 84.7 430.1 85.3 C 430.8 85.9 431.6 86.3 432.6 86.5 C 433.6 86.7 434.8 86.8 436.1 86.8 C 436.8 86.8 437.4 86.8 438 86.7 C 438.5 86.6 439.2 86.5 439.9 86.4 C 440.4 86.4 440.7 86.1 440.7 85.6 M 419.9 85.1 L 419.9 80.8 C 419.9 80.5 419.8 80.3 419.6 80.2 C 419.4 80.1 419.2 80 418.9 80 L 418.8 80 C 417.9 80.1 417 80.2 416.2 80.2 C 415.4 80.3 414.3 80.3 412.9 80.3 C 412.4 80.3 411.8 80.2 411.4 80 C 410.9 79.8 410.5 79.5 410.1 79.1 C 409.7 78.7 409.5 78.1 409.3 77.4 C 409.1 76.7 409 75.8 409 74.7 L 409 70.7 C 409 69.6 409.1 68.7 409.3 68 C 409.5 67.3 409.8 66.7 410.1 66.3 C 410.5 65.9 410.9 65.6 411.4 65.4 C 411.9 65.2 412.4 65.1 412.9 65.1 C 414.3 65.1 415.4 65.1 416.2 65.2 C 417 65.3 417.9 65.3 418.8 65.4 L 418.9 65.4 C 419.2 65.4 419.4 65.3 419.6 65.2 C 419.8 65.1 419.9 64.9 419.9 64.6 L 419.9 60.3 C 419.9 59.9 419.8 59.7 419.7 59.6 C 419.5 59.5 419.3 59.3 418.9 59.2 C 418.2 59 417.3 58.9 416.3 58.7 C 415.2 58.5 414 58.5 412.5 58.5 C 409.1 58.5 406.4 59.5 404.3 61.6 C 402.3 63.7 401.2 66.7 401.2 70.7 L 401.2 74.7 C 401.2 78.6 402.2 81.7 404.3 83.8 C 406.3 85.9 409.1 86.9 412.5 86.9 C 413.9 86.9 415.2 86.8 416.3 86.7 C 417.4 86.5 418.3 86.4 418.9 86.2 C 419.3 86.1 419.5 86 419.7 85.8 C 419.8 85.7 419.9 85.4 419.9 85.1 M 388.6 80 C 388 80.3 387.4 80.5 386.7 80.7 C 386 80.9 385.3 81 384.6 81 C 383.6 81 382.8 80.9 382.3 80.6 C 381.8 80.3 381.6 79.7 381.6 78.6 L 381.6 78.2 C 381.6 77.6 381.7 77.1 381.8 76.7 C 381.9 76.3 382.2 75.9 382.5 75.6 C 382.8 75.3 383.3 75.1 383.8 74.9 C 384.3 74.8 385 74.7 385.9 74.7 L 388.6 74.7 L 388.6 80 L 388.6 80 Z M 396.2 68.3 C 396.2 66.5 395.9 65 395.4 63.8 C 394.9 62.6 394.1 61.6 393.2 60.8 C 392.2 60 391.1 59.4 389.7 59.1 C 388.3 58.7 386.7 58.5 385 58.5 C 383.4 58.5 381.8 58.6 380.3 58.8 C 378.8 59 377.6 59.2 376.7 59.5 C 376.1 59.7 375.8 60 375.8 60.6 L 375.8 64.5 C 375.8 64.8 375.9 65 376 65.2 C 376.2 65.3 376.4 65.4 376.6 65.4 L 376.8 65.4 C 377.2 65.4 377.7 65.3 378.2 65.3 C 378.8 65.3 379.4 65.2 380.2 65.2 C 380.9 65.2 381.7 65.1 382.5 65.1 C 383.3 65.1 384.1 65.1 384.8 65.1 C 385.9 65.1 386.8 65.3 387.4 65.7 C 388 66.1 388.4 67 388.4 68.4 L 388.4 70.1 L 385.8 70.1 C 381.7 70.1 378.6 70.7 376.8 72 C 375 73.3 374 75.4 374 78.2 L 374 78.6 C 374 80.2 374.2 81.5 374.7 82.5 C 375.2 83.6 375.8 84.4 376.6 85.1 C 377.4 85.7 378.2 86.2 379.2 86.5 C 380.2 86.8 381.2 86.9 382.3 86.9 C 383.7 86.9 385 86.7 386 86.3 C 387 85.9 388 85.4 389 84.7 L 389 85.5 C 389 85.8 389.1 86 389.3 86.2 C 389.5 86.4 389.7 86.5 390 86.5 L 395.4 86.5 C 395.7 86.5 395.9 86.4 396.1 86.2 C 396.3 86 396.4 85.8 396.4 85.5 L 396.4 68.3 L 396.2 68.3 Z M 370.5 85.6 L 370.5 81.8 C 370.5 81.3 370.2 81 369.5 81 L 367.1 81 C 366.4 81 365.9 80.9 365.8 80.6 C 365.6 80.3 365.6 79.7 365.6 78.7 L 365.6 64.7 L 369.5 64.7 C 369.8 64.7 370 64.6 370.2 64.4 C 370.4 64.2 370.5 64 370.5 63.7 L 370.5 59.8 C 370.5 59.5 370.4 59.3 370.2 59.1 C 370 58.9 369.8 58.8 369.5 58.8 L 365.6 58.8 L 365.6 53.8 C 365.6 53.5 365.5 53.3 365.4 53.2 C 365.2 53.1 365 53 364.8 53 L 364.7 53 L 358.9 54 C 358.6 54.1 358.4 54.2 358.2 54.3 C 358 54.5 357.9 54.7 357.9 54.9 L 357.9 58.8 L 354 58.8 C 353.7 58.8 353.5 58.9 353.3 59.1 C 353.1 59.3 353 59.5 353 59.8 L 353 63 C 353 63.3 353.1 63.5 353.3 63.6 C 353.5 63.8 353.7 63.9 354 64 L 357.9 64.6 L 357.9 78.6 C 357.9 80.3 358.1 81.7 358.4 82.8 C 358.8 83.9 359.3 84.7 359.9 85.3 C 360.6 85.9 361.4 86.3 362.4 86.5 C 363.4 86.7 364.6 86.8 365.9 86.8 C 366.6 86.8 367.2 86.8 367.8 86.7 C 368.3 86.6 369 86.5 369.7 86.4 C 370.2 86.4 370.5 86.1 370.5 85.6 M 349.5 85.5 L 349.5 69.5 C 349.5 68 349.4 66.6 349.1 65.2 C 348.9 63.9 348.4 62.7 347.8 61.7 C 347.2 60.7 346.3 59.9 345.2 59.4 C 344.1 58.8 342.7 58.5 340.9 58.5 C 339.4 58.5 338 58.7 336.8 59.1 C 335.6 59.5 334.4 60.1 333 61.1 L 333 59.8 C 333 59.5 332.9 59.3 332.7 59.1 C 332.5 58.9 332.3 58.8 332 58.8 L 326.6 58.8 C 326.3 58.8 326.1 58.9 325.9 59.1 C 325.7 59.3 325.6 59.5 325.6 59.8 L 325.6 85.4 C 325.6 85.7 325.7 85.9 325.9 86.1 C 326.1 86.3 326.3 86.4 326.6 86.4 L 332.4 86.4 C 332.7 86.4 332.9 86.3 333.1 86.1 C 333.3 85.9 333.4 85.7 333.4 85.4 L 333.4 66.5 C 334.2 66.1 335 65.7 335.8 65.4 C 336.5 65.1 337.3 65 338 65 C 338.7 65 339.3 65.1 339.8 65.2 C 340.3 65.3 340.6 65.6 340.9 65.9 C 341.2 66.3 341.3 66.7 341.4 67.3 C 341.5 67.9 341.5 68.6 341.5 69.4 L 341.5 85.4 C 341.5 85.7 341.6 85.9 341.8 86.1 C 342 86.3 342.2 86.4 342.5 86.4 L 348.3 86.4 C 348.6 86.4 348.8 86.3 349 86.1 C 349.4 85.9 349.5 85.7 349.5 85.5 M 313.1 74.4 C 313.1 78.3 311.7 80.3 308.8 80.3 C 307.4 80.3 306.3 79.8 305.6 78.8 C 304.9 77.8 304.5 76.3 304.5 74.4 L 304.5 71 C 304.5 69 304.9 67.6 305.6 66.6 C 306.3 65.6 307.4 65.1 308.8 65.1 C 311.6 65.1 313.1 67.1 313.1 71 L 313.1 74.4 Z M 320.9 71 C 320.9 69.1 320.6 67.3 320.1 65.8 C 319.6 64.3 318.8 63 317.8 61.9 C 316.8 60.8 315.5 60 314 59.4 C 312.5 58.8 310.8 58.5 308.8 58.5 C 306.8 58.5 305.1 58.8 303.6 59.4 C 302.1 60 300.8 60.8 299.8 61.9 C 298.8 63 298 64.3 297.5 65.8 C 297 67.3 296.7 69.1 296.7 71 L 296.7 74.4 C 296.7 76.3 297 78.1 297.5 79.6 C 298 81.1 298.8 82.4 299.8 83.5 C 300.8 84.6 302.1 85.4 303.6 86 C 305.1 86.6 306.8 86.9 308.8 86.9 C 310.8 86.9 312.5 86.6 314 86 C 315.5 85.4 316.8 84.6 317.8 83.5 C 318.8 82.4 319.6 81.1 320.1 79.6 C 320.6 78.1 320.9 76.3 320.9 74.4 L 320.9 71 Z M 294.1 85.1 L 294.1 80.8 C 294.1 80.5 294 80.3 293.8 80.2 C 293.6 80.1 293.4 80 293.1 80 L 293 80 C 292.1 80.1 291.2 80.2 290.4 80.2 C 289.6 80.2 288.5 80.3 287.1 80.3 C 286.6 80.3 286 80.2 285.6 80 C 285.1 79.8 284.7 79.5 284.3 79.1 C 283.9 78.7 283.7 78.1 283.5 77.4 C 283.3 76.7 283.2 75.8 283.2 74.7 L 283.2 70.7 C 283.2 69.6 283.3 68.7 283.5 68 C 283.7 67.3 284 66.7 284.3 66.3 C 284.7 65.9 285.1 65.6 285.6 65.4 C 286.1 65.2 286.6 65.1 287.1 65.1 C 288.5 65.1 289.6 65.1 290.4 65.2 C 291.2 65.3 292.1 65.3 293 65.4 L 293.1 65.4 C 293.4 65.4 293.6 65.3 293.8 65.2 C 294 65.1 294.1 64.9 294.1 64.6 L 294.1 60.3 C 294.1 59.9 294 59.7 293.9 59.6 C 293.7 59.5 293.5 59.3 293.1 59.2 C 292.4 59 291.6 58.9 290.5 58.7 C 289.4 58.5 288.2 58.5 286.7 58.5 C 283.3 58.5 280.6 59.5 278.5 61.6 C 276.5 63.7 275.4 66.7 275.4 70.7 L 275.4 74.7 C 275.4 78.6 276.4 81.7 278.5 83.8 C 280.5 85.9 283.3 86.9 286.7 86.9 C 288.1 86.9 289.4 86.8 290.5 86.7 C 291.6 86.5 292.4 86.4 293.1 86.2 C 293.5 86.1 293.7 86 293.9 85.8 C 294 85.7 294.1 85.4 294.1 85.1 M 270.4 85.5 L 270.4 69.5 C 270.4 68 270.3 66.6 270 65.2 C 269.7 63.8 269.3 62.7 268.7 61.7 C 268.1 60.7 267.2 59.9 266.1 59.4 C 265 58.8 263.6 58.5 261.8 58.5 C 260.3 58.5 258.9 58.7 257.7 59.1 C 256.5 59.5 255.3 60.1 253.9 61.1 L 253.9 59.8 C 253.9 59.5 253.8 59.3 253.6 59.1 C 253.4 58.9 253.2 58.8 252.9 58.8 L 247.5 58.8 C 247.2 58.8 247 58.9 246.8 59.1 C 246.6 59.3 246.5 59.5 246.5 59.8 L 246.5 85.4 C 246.5 85.7 246.6 85.9 246.8 86.1 C 247 86.3 247.2 86.4 247.5 86.4 L 253.3 86.4 C 253.6 86.4 253.8 86.3 254 86.1 C 254.2 85.9 254.3 85.7 254.3 85.4 L 254.3 66.5 C 255.1 66.1 255.9 65.7 256.7 65.4 C 257.4 65.1 258.2 65 258.9 65 C 259.6 65 260.2 65.1 260.7 65.2 C 261.2 65.3 261.5 65.6 261.8 65.9 C 262.1 66.3 262.2 66.7 262.3 67.3 C 262.4 67.9 262.4 68.6 262.4 69.4 L 262.4 85.4 C 262.4 85.7 262.5 85.9 262.7 86.1 C 262.9 86.3 263.1 86.4 263.4 86.4 L 269.2 86.4 C 269.5 86.4 269.7 86.3 269.9 86.1 C 270.3 85.9 270.4 85.7 270.4 85.5 M 233.3 80 C 232.7 80.3 232.1 80.5 231.4 80.7 C 230.7 80.9 230 81 229.3 81 C 228.3 81 227.5 80.9 227 80.6 C 226.5 80.3 226.3 79.7 226.3 78.6 L 226.3 78.2 C 226.3 77.6 226.4 77.1 226.5 76.7 C 226.6 76.3 226.9 75.9 227.2 75.6 C 227.5 75.3 228 75.1 228.5 74.9 C 229 74.8 229.7 74.7 230.6 74.7 L 233.3 74.7 L 233.3 80 L 233.3 80 Z M 241 68.3 C 241 66.5 240.7 65 240.2 63.8 C 239.7 62.6 238.9 61.6 238 60.8 C 237 60 235.9 59.4 234.5 59.1 C 233.1 58.7 231.5 58.5 229.8 58.5 C 228.2 58.5 226.6 58.6 225.1 58.8 C 223.6 59 222.4 59.2 221.5 59.5 C 220.9 59.7 220.6 60 220.6 60.6 L 220.6 64.5 C 220.6 64.8 220.7 65 220.8 65.2 C 221 65.3 221.2 65.4 221.4 65.4 L 221.6 65.4 C 222 65.4 222.5 65.3 223 65.3 C 223.6 65.3 224.2 65.2 225 65.2 C 225.7 65.2 226.5 65.1 227.3 65.1 C 228.1 65.1 228.9 65.1 229.6 65.1 C 230.7 65.1 231.6 65.3 232.2 65.7 C 232.8 66.1 233.2 67 233.2 68.4 L 233.2 70.1 L 230.6 70.1 C 226.5 70.1 223.4 70.7 221.6 72 C 219.8 73.3 218.8 75.4 218.8 78.2 L 218.8 78.6 C 218.8 80.2 219 81.5 219.5 82.5 C 220 83.6 220.6 84.4 221.4 85.1 C 222.2 85.7 223 86.2 224 86.5 C 225 86.8 226 86.9 227.1 86.9 C 228.5 86.9 229.8 86.7 230.8 86.3 C 231.8 85.9 232.8 85.4 233.8 84.7 L 233.8 85.5 C 233.8 85.8 233.9 86 234.1 86.2 C 234.3 86.4 234.5 86.5 234.8 86.5 L 240.2 86.5 C 240.5 86.5 240.7 86.4 240.9 86.2 C 241.1 86 241.2 85.8 241.2 85.5 L 241.2 68.3 L 241 68.3 Z M 206.6 75.9 C 206.6 77.2 206.1 78.3 205.2 79 C 204.3 79.7 202.5 80.1 200.1 80.1 L 199.3 80.1 C 198.9 80.1 198.5 80.1 198.1 80.1 C 197.7 80.1 197.3 80.1 196.9 80.1 L 196.1 80.1 L 196.1 71.1 L 201.5 71.1 C 203.4 71.1 204.8 71.5 205.5 72.4 C 206.2 73.3 206.6 74.3 206.6 75.4 L 206.6 75.9 Z M 206.4 61.6 C 206.4 62.1 206.3 62.6 206.2 63.1 C 206 63.6 205.8 64 205.4 64.3 C 205 64.6 204.5 64.9 203.9 65.1 C 203.3 65.3 202.5 65.4 201.5 65.4 L 196.1 65.4 L 196.1 57.1 C 196.3 57.1 196.5 57.1 196.8 57.1 C 197.1 57.1 197.5 57.1 197.9 57.1 L 199 57.1 L 199.8 57.1 C 202.3 57.1 204 57.4 205 58 C 206 58.6 206.5 59.6 206.5 60.9 L 206.5 61.6 L 206.4 61.6 Z M 214.6 75.4 C 214.6 73.7 214.2 72.3 213.4 71.1 C 212.6 69.9 211.6 68.9 210.3 68.3 C 211.6 67.7 212.6 66.7 213.3 65.5 C 214 64.2 214.4 62.8 214.4 61.3 L 214.4 60.4 C 214.4 58.5 214 56.9 213.3 55.6 C 212.6 54.3 211.5 53.3 210.2 52.5 C 208.9 51.7 207.3 51.2 205.4 50.8 C 203.5 50.5 201.5 50.3 199.2 50.3 C 198.4 50.3 197.6 50.3 196.8 50.3 C 196 50.3 195.2 50.4 194.4 50.4 C 193.6 50.4 192.9 50.5 192.2 50.6 C 191.5 50.7 191 50.7 190.6 50.8 C 189.7 51 189 51.3 188.6 51.7 C 188.2 52.1 188 52.9 188 54 L 188 83.3 C 188 84.4 188.2 85.1 188.6 85.6 C 189 86 189.7 86.3 190.6 86.5 C 191.1 86.6 191.7 86.7 192.3 86.7 C 193 86.8 193.7 86.8 194.5 86.9 C 195.3 86.9 196.1 87 196.9 87 C 197.7 87 198.6 87 199.4 87 C 201.5 87 203.5 86.8 205.3 86.5 C 207.1 86.2 208.7 85.6 210.1 84.8 C 211.5 84 212.5 82.9 213.4 81.5 C 214.2 80.1 214.6 78.3 214.6 76.2 L 214.6 75.4 L 214.6 75.4 Z"
            })));
        }, _fundingLogos[constants.h.GIROPAY] = function(_ref) {
            var logoColor = _ref.logoColor;
            if (!GIROPAY_LOGO_COLORS[logoColor]) throw new Error("No " + logoColor + " giropay logo available");
            var _GIROPAY_LOGO_COLORS$ = GIROPAY_LOGO_COLORS[logoColor], primary = _GIROPAY_LOGO_COLORS$.primary, secondary = _GIROPAY_LOGO_COLORS$.secondary, tertiary = _GIROPAY_LOGO_COLORS$.tertiary;
            return jsxToHTML("svg", {
                width: "75px",
                height: "32px",
                viewBox: "0 0 75 32",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg"
            }, jsxToHTML("g", {
                stroke: "none",
                "stroke-width": "1",
                fill: "none",
                "fill-rule": "evenodd",
                transform: "matrix(1.614571, 0, 0, 1.614571, -161.457123, -256.816772)"
            }, jsxToHTML("g", {
                transform: "translate(100.000000, 159.000000)"
            }, jsxToHTML("g", {
                transform: "translate(0.000000, 0.144715)"
            }, jsxToHTML("mask", {
                fill: primary
            }, jsxToHTML("polygon", {
                points: "0 0.017902439 46.0918699 0.017902439 46.0918699 19.8373984 0 19.8373984",
                transform: "matrix(1, 0, 0, 1, 0, 0)"
            })), jsxToHTML("path", {
                d: "M0,3.5735122 C0,1.60977236 1.5998374,0.017902439 3.57349593,0.017902439 L42.5182114,0.017902439 C44.4918699,0.017902439 46.0918699,1.60977236 46.0918699,3.5735122 L46.0918699,16.2818049 C46.0918699,18.2455447 44.4918699,19.8374146 42.5182114,19.8374146 L3.57349593,19.8374146 C1.5998374,19.8374146 0,18.2455447 0,16.2818049 L0,3.5735122 Z",
                fill: secondary
            })), jsxToHTML("path", {
                d: "M1.46738211,3.84021138 L1.46738211,16.3065528 C1.46738211,17.5338699 2.46738211,18.5288293 3.70087805,18.5288293 L24.1036423,18.5288293 L24.1036423,1.61793496 L3.70087805,1.61793496 C2.46738211,1.61793496 1.46738211,2.61289431 1.46738211,3.84021138",
                fill: primary
            }), jsxToHTML("path", {
                d: "M5.67102439,10.0205528 C5.67102439,9.34152846 6.00582114,8.77730081 6.64663415,8.77730081 C7.42126829,8.77730081 7.74630894,9.39892683 7.74630894,9.95356098 C7.74630894,10.7187642 7.25866667,11.235187 6.64663415,11.235187 C6.13004878,11.235187 5.67102439,10.795187 5.67102439,10.0205528 Z M9.41053659,7.57226016 L7.8515122,7.57226016 L7.8515122,8.47112195 L7.8324878,8.47112195 C7.46907317,7.85908943 6.87606504,7.45746341 6.13964228,7.45746341 C4.59021138,7.45746341 3.8921626,8.56689431 3.8921626,10.0491707 C3.8921626,11.5221789 4.74321951,12.5550244 6.11102439,12.5550244 C6.79964228,12.5550244 7.37346341,12.2872195 7.78468293,11.7038049 L7.80370732,11.7038049 L7.80370732,11.9716098 C7.80370732,12.9472195 7.26826016,13.4158374 6.27362602,13.4158374 C5.55622764,13.4158374 5.11622764,13.2628293 4.59021138,13.0046179 L4.50419512,14.3626667 C4.90582114,14.5060813 5.58500813,14.6782764 6.40744715,14.6782764 C8.41590244,14.6782764 9.41053659,14.0182764 9.41053659,11.9716098 L9.41053659,7.57226016 Z",
                fill: tertiary
            }), jsxToHTML("mask", {
                fill: primary
            }, jsxToHTML("polygon", {
                points: "0 19.9821138 46.0918699 19.9821138 46.0918699 0.162601626 0 0.162601626",
                transform: "matrix(1, 0, 0, 1, 0, 0)"
            })), jsxToHTML("path", {
                d: "M10.5985366,6.75918699 L12.32,6.75918699 L12.32,5.49674797 L10.5985366,5.49674797 L10.5985366,6.75918699 Z M10.598374,12.5549593 L12.3198374,12.5549593 L12.3198374,7.57219512 L10.598374,7.57219512 L10.598374,12.5549593 Z",
                id: "Fill-8",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M17.1133333,7.51479675 C16.9411382,7.48617886 16.7307317,7.45739837 16.5299187,7.45739837 C15.7839024,7.45739837 15.3534959,7.85918699 15.0570732,8.4904065 L15.0380488,8.4904065 L15.0380488,7.57219512 L13.4694309,7.57219512 L13.4694309,12.5549593 L15.1910569,12.5549593 L15.1910569,10.4508943 C15.1910569,9.47544715 15.6404878,8.89203252 16.4439024,8.89203252 C16.6447154,8.89203252 16.835935,8.89203252 17.0273171,8.94943089 L17.1133333,7.51479675 Z",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M20.0773496,11.4647154 C19.2835285,11.4647154 18.9583252,10.804878 18.9583252,10.0682927 C18.9583252,9.32243902 19.2835285,8.66243902 20.0773496,8.66243902 C20.8711707,8.66243902 21.196374,9.32243902 21.196374,10.0682927 C21.196374,10.804878 20.8711707,11.4647154 20.0773496,11.4647154 M20.0773496,12.6697561 C21.7223902,12.6697561 22.9752358,11.7133333 22.9752358,10.0682927 C22.9752358,8.41382114 21.7223902,7.45739837 20.0773496,7.45739837 C18.4323089,7.45739837 17.1794634,8.41382114 17.1794634,10.0682927 C17.1794634,11.7133333 18.4323089,12.6697561 20.0773496,12.6697561",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M29.3757073,10.0110244 C29.3757073,10.8048455 28.9836748,11.3500488 28.3332683,11.3500488 C27.7594472,11.3500488 27.2812358,10.8048455 27.2812358,10.0780163 C27.2812358,9.332 27.7020488,8.77720325 28.3332683,8.77720325 C29.0026992,8.77720325 29.3757073,9.35102439 29.3757073,10.0110244 Z M25.5597724,14.5633821 L27.2812358,14.5633821 L27.2812358,11.856878 L27.3002602,11.856878 C27.6254634,12.4498862 28.2758699,12.6697236 28.8783089,12.6697236 C30.360748,12.6697236 31.1545691,11.4456585 31.1545691,9.97265041 C31.1545691,8.76777236 30.399122,7.45736585 29.0218862,7.45736585 C28.2376585,7.45736585 27.5106667,7.77297561 27.166439,8.47118699 L27.147252,8.47118699 L27.147252,7.5721626 L25.5597724,7.5721626 L25.5597724,14.5633821 Z",
                id: "Fill-12",
                fill: primary,
                mask: "url(#mask-4)"
            }), jsxToHTML("path", {
                d: "M33.505252,10.9769919 C33.505252,10.4987805 33.9642764,10.3169919 34.5476911,10.3169919 C34.8059024,10.3169919 35.0546829,10.3361789 35.2745203,10.3457724 C35.2745203,10.929187 34.8633008,11.5221951 34.2128943,11.5221951 C33.8112683,11.5221951 33.505252,11.3212195 33.505252,10.9769919 Z M36.9769593,12.5550407 C36.900374,12.1628455 36.8813496,11.770813 36.8813496,11.3786179 L36.8813496,9.52317073 C36.8813496,8.00252033 35.7815122,7.45747967 34.5094797,7.45747967 C33.7730569,7.45747967 33.1322439,7.56268293 32.5202114,7.81130081 L32.5488293,8.97813008 C33.0270407,8.7103252 33.5816748,8.60512195 34.1364715,8.60512195 C34.7580976,8.60512195 35.2650894,8.78674797 35.2745203,9.46577236 C35.0546829,9.42756098 34.7485041,9.39894309 34.4711057,9.39894309 C33.5530569,9.39894309 31.8984228,9.58056911 31.8984228,11.1013821 C31.8984228,12.1820325 32.7784228,12.6698374 33.7634634,12.6698374 C34.4711057,12.6698374 34.9493171,12.392439 35.3415122,11.770813 L35.3606992,11.770813 C35.3606992,12.0290244 35.3893171,12.2872358 35.3989106,12.5550407 L36.9769593,12.5550407 Z",
                fill: primary
            }), jsxToHTML("path", {
                d: "M37.750748,14.5634634 C38.1045691,14.6398862 38.4583902,14.6782602 38.8218049,14.6782602 C40.3998537,14.6782602 40.7728618,13.463626 41.2606667,12.2107805 L43.0873333,7.5722439 L41.3658699,7.5722439 L40.3426179,10.8239512 L40.3234309,10.8239512 L39.2522114,7.5722439 L37.3967642,7.5722439 L39.414813,12.6698049 C39.2904228,13.1098049 38.9653821,13.3584228 38.5445691,13.3584228 C38.3053821,13.3584228 38.0949756,13.3296423 37.8655447,13.2532195 L37.750748,14.5634634 Z",
                fill: primary
            }))));
        }, _fundingLogos[constants.h.SOFORT] = function(_ref) {
            var logoColor = _ref.logoColor;
            if (!SOFORT_LOGO_COLORS[logoColor]) throw new Error("No " + logoColor + " sofort logo available");
            var _SOFORT_LOGO_COLORS$l = SOFORT_LOGO_COLORS[logoColor], primary = _SOFORT_LOGO_COLORS$l.primary, secondary = _SOFORT_LOGO_COLORS$l.secondary;
            return jsxToHTML("svg", {
                width: "138px",
                height: "32px",
                viewBox: "0 0 138 44",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg"
            }, jsxToHTML("g", {
                stroke: "none",
                "stroke-width": "1",
                fill: "none",
                "fill-rule": "evenodd"
            }, jsxToHTML("g", {
                transform: "translate(-24.000000, -436.000000)"
            }, jsxToHTML("g", {
                transform: "translate(24.000000, 436.000000)"
            }, jsxToHTML("g", {
                "stroke-width": "1"
            }, jsxToHTML("g", {
                mask: "url(#mask-2)",
                "fill-rule": "evenodd",
                fill: primary
            }, jsxToHTML("rect", {
                x: "0",
                y: "0",
                width: "138",
                height: "44"
            })), jsxToHTML("g", {
                transform: "translate(16.000000, 5.000000)",
                "fill-rule": "nonzero",
                fill: secondary
            }, jsxToHTML("path", {
                d: "M8.55107133,24.0386247 C9.22879411,24.6861671 9.24327745,25.7425763 8.58354713,26.4073957 L8.45110904,26.5423627 C7.79086355,27.1983175 6.69897696,27.2144066 6.01224032,26.5722566 L2.17289107,22.8768054 C1.11590922,21.8458618 0.96410333,20.5754632 1.63678914,19.9042365 L1.77159366,19.7668966 C2.32598975,19.2126062 3.22970309,19.1541252 3.86016464,19.6360673 C4.15990129,19.8651943 4.59424066,19.8150784 4.83028878,19.5241303 C5.0663369,19.2331822 5.01470714,18.8115781 4.7149705,18.5824512 C3.5284497,17.675442 1.82767241,17.7855026 0.775688111,18.8373698 L0.64137931,18.9742146 C-0.604692328,20.2175294 -0.354282964,22.3130983 1.19683948,23.8259789 L5.04656839,27.5313427 C6.28726435,28.6915831 8.24857838,28.6626828 9.44549924,27.4733999 L9.58132339,27.3350447 C10.7636633,26.1435999 10.7376475,24.2460125 9.52028002,23.0828568 C9.24837962,22.8230647 8.81099605,22.8264175 8.54335646,23.0903455 C8.27571687,23.3542735 8.27917094,23.7788325 8.55107133,24.0386247 Z"
            }), jsxToHTML("path", {
                d: "M6.25316137,4.00463901 L7.82450265,16.5582851 C7.87051944,16.9259191 8.21485204,17.1877352 8.59359104,17.1430676 C8.97233003,17.0984001 9.24205468,16.7641637 9.19603789,16.3965297 L7.61982167,3.8039371 L7.60423898,3.7221812 C7.33535457,2.67817937 8.00377183,1.50751858 8.89431251,1.32322405 C9.39350944,1.21977105 9.9143927,1.3151232 10.3403167,1.58785163 C10.7662406,1.86058007 11.0615522,2.28785533 11.1600097,2.7738347 L13.8959914,14.1304918 C13.9828807,14.4910975 14.3544774,14.7150537 14.7259757,14.6307121 C15.097474,14.5463704 15.3281952,14.1856693 15.2413059,13.8250637 L12.5104951,2.49173037 C12.3457557,1.67638792 11.8361294,0.939028727 11.1011021,0.468374716 C10.3660749,-0.00227929421 9.46717414,-0.16683078 8.60603358,0.0116310396 C6.93120471,0.358231477 5.83076908,2.26447015 6.25316137,4.00463901 Z"
            }), jsxToHTML("path", {
                d: "M20.6946385,18.7562157 L23.8016655,3.70806757 C24.1627527,2.08823591 23.171098,0.461930237 21.5243733,-0.0131380565 C19.6806639,-0.465927398 17.8331452,0.588982967 17.3518411,2.34622562 L13.9119445,13.7963592 C13.8051409,14.1518899 14.01548,14.5241472 14.3817501,14.6278193 C14.7480201,14.7314913 15.1315221,14.5273196 15.2383257,14.1717889 L18.6826501,2.70623335 C18.9740354,1.64312835 20.0755418,1.01418179 21.1583367,1.27975309 C22.0849843,1.54768368 22.6596154,2.49007404 22.4491321,3.43451398 L19.3399561,18.4926732 C19.2649826,18.8557898 19.5074605,19.20915 19.8815457,19.2819253 C20.2556309,19.3547006 20.6196649,19.1193324 20.6946385,18.7562157 Z"
            }), jsxToHTML("path", {
                d: "M12.8691892,33.2538889 C7.94394615,33.2538889 3.83027027,29.7443025 3.83027027,24.757037 C3.83027027,24.3866994 3.52098374,24.0864815 3.13945946,24.0864815 C2.75793518,24.0864815 2.44864865,24.3866994 2.44864865,24.757037 C2.44864865,30.5262551 7.21772847,34.595 12.8691892,34.595 C13.2507135,34.595 13.56,34.2947821 13.56,33.9244444 C13.56,33.5541068 13.2507135,33.2538889 12.8691892,33.2538889 Z"
            }), jsxToHTML("path", {
                d: "M10.432735,21.523985 C10.32527,21.8997898 10.0848456,22.2268322 9.75367873,22.4476857 L9.6059963,22.5431752 C8.81135162,23.0620226 7.73737824,22.860771 7.20041193,22.0943828 L4.18000129,17.7280455 C3.35596459,16.5133712 3.46371228,15.2353866 4.25688098,14.7069262 L4.40481451,14.6112693 C5.42222949,14.0388226 6.28666557,14.4731364 7.17531296,15.7298428 L9.70102318,19.3822431 C9.91366027,19.6897297 10.3428334,19.7716746 10.6596081,19.5652723 C10.9763829,19.3588699 11.0608031,18.9422806 10.848166,18.634794 L8.31843628,14.9766458 C7.06906995,13.2097547 5.52101546,12.4319743 3.67452351,13.4735669 L3.48275305,13.5961381 C1.99799965,14.5853027 1.82065576,16.6887608 3.02954142,18.4706511 L6.05567438,22.8452879 C7.02249844,24.2252138 8.95163568,24.5867144 10.3747579,23.6575027 L10.5280578,23.5583063 C11.1349164,23.1536749 11.5696876,22.5622681 11.7640218,21.8826817 C11.8660652,21.5258361 11.650769,21.1562586 11.2831443,21.0572072 C10.9155196,20.9581559 10.5347784,21.1671394 10.432735,21.523985 Z"
            }), jsxToHTML("path", {
                d: "M15.0071132,23.7451482 C13.5716937,24.5235597 12.6792061,25.9892512 12.5683793,28.2063913 C12.5498892,28.5762937 12.8438232,28.8907086 13.2248991,28.9086565 C13.6059751,28.9266044 13.9298874,28.6412889 13.9483774,28.2713865 C14.048744,26.2635083 14.8525076,25.179561 16.152515,24.704555 C16.8482268,24.4503509 17.6046979,24.3996276 18.2711038,24.4684707 C18.3606758,24.477724 18.4201821,24.4863334 18.4442402,24.4906858 C19.3337661,24.6516105 19.6045203,23.3685934 18.7214531,23.1770635 L13.4090206,22.0248413 C10.9225036,21.3638621 10.5472361,20.4704561 11.0076227,18.9808309 C11.2064187,18.3317669 11.6147718,17.9986147 12.2306776,17.865687 C12.6373189,17.7779238 13.0941226,17.7888366 13.5282841,17.8626882 C13.6538003,17.8840387 13.7420731,17.9043308 13.7811352,17.9152244 L21.8451208,19.7433694 C21.8985237,19.7533496 21.9361525,19.763479 22.0020154,19.7924494 C22.1354002,19.8511201 22.2742678,19.9453829 22.4097247,20.0858789 C22.9502905,20.6465543 23.2485509,21.7041959 23.09758,23.4414127 C22.571614,29.5314735 19.6483005,33.3130406 12.7195863,33.2539148 C12.3380768,33.2506592 12.0260833,33.5482264 12.0227294,33.9185497 C12.0193755,34.288873 12.3259312,34.5917185 12.7074407,34.5949741 C20.4944029,34.6614237 23.8949457,30.262518 24.474342,23.5537955 C24.6558214,21.4655214 24.2521788,20.0341915 23.4184922,19.1694909 C22.9588119,18.69271 22.4737204,18.4793376 22.1015974,18.4267977 L14.1289333,16.6177417 C14.0788208,16.6028791 13.9434651,16.5717637 13.7667652,16.5417067 C13.169132,16.4400483 12.5401983,16.4250234 11.9308051,16.5565455 C10.8493625,16.7899475 10.0333579,17.4556796 9.68377867,18.5970598 C9.0191343,20.7475737 9.72889785,22.4373206 13.0761134,23.3260543 L15.0071132,23.7451482 Z"
            }))), jsxToHTML("path", {
                d: "M60.72,30.286 C63.712,30.286 66,28.284 66,25.336 C66,22.608 64.064,21.42 61.688,20.716 C60.17,20.276 59.224,19.946 59.224,18.868 C59.224,17.966 59.884,17.262 60.918,17.262 C61.798,17.262 62.458,17.768 62.92,18.538 L65.406,16.976 C64.636,15.26 62.898,14.38 61.006,14.38 C58.014,14.38 56.122,16.536 56.122,19.022 C56.122,21.002 57.31,22.542 60.258,23.4 C61.864,23.862 62.876,24.17 62.876,25.446 C62.876,26.634 62.018,27.382 60.764,27.382 C59.422,27.382 58.41,26.524 57.794,25.732 L55.726,27.822 C56.826,29.318 58.63,30.286 60.72,30.286 Z M73.546,30.286 C70.378,30.286 67.804,27.756 67.804,24.676 C67.804,21.596 70.378,19.066 73.546,19.066 C76.714,19.066 79.288,21.596 79.288,24.676 C79.288,27.756 76.714,30.286 73.546,30.286 Z M73.546,27.47 C75.086,27.47 76.296,26.26 76.296,24.676 C76.296,23.092 75.086,21.882 73.546,21.882 C72.006,21.882 70.796,23.092 70.796,24.676 C70.796,26.26 72.006,27.47 73.546,27.47 Z M87.428,17.416 L87.428,14.6 L86.988,14.6 C83.336,14.6 81.554,17.02 81.554,19.88 L81.554,30 L84.546,30 L84.546,25.556 C84.546,24.082 85.69,23.026 87.34,22.982 L87.34,20.122 C86.152,20.122 85.206,20.474 84.546,21.178 L84.546,20.034 C84.546,18.186 85.756,17.35 87.428,17.416 Z M95.018,30.286 C91.85,30.286 89.276,27.756 89.276,24.676 C89.276,21.596 91.85,19.066 95.018,19.066 C98.186,19.066 100.76,21.596 100.76,24.676 C100.76,27.756 98.186,30.286 95.018,30.286 Z M95.018,27.47 C96.558,27.47 97.768,26.26 97.768,24.676 C97.768,23.092 96.558,21.882 95.018,21.882 C93.478,21.882 92.268,23.092 92.268,24.676 C92.268,26.26 93.478,27.47 95.018,27.47 Z M106.018,20.562 L106.018,19.352 L103.114,19.352 L103.114,30 L106.106,30 L106.106,25.138 C106.106,23.378 107.14,22.388 108.944,22.388 L108.944,19.176 C107.58,19.132 106.612,19.594 106.018,20.562 Z M114.378,24.566 L114.378,21.97 C115.038,22.674 115.984,23.026 117.172,23.026 L117.172,20.166 C115.544,20.122 114.378,19.044 114.378,17.592 L114.378,15.92 L111.386,15.92 L111.386,24.72 C111.386,27.58 113.168,30 116.82,30 L117.26,30 L117.26,27.184 C115.588,27.25 114.378,26.414 114.378,24.566 Z M121.572,30.176 C122.672,30.176 123.574,29.274 123.574,28.174 C123.574,27.074 122.672,26.172 121.572,26.172 C120.472,26.172 119.57,27.074 119.57,28.174 C119.57,29.274 120.472,30.176 121.572,30.176 Z",
                fill: secondary
            })))));
        }, _fundingLogos[constants.h.EPS] = function(_ref) {
            var logoColor = _ref.logoColor;
            if (!EPS_LOGO_COLORS[logoColor]) throw new Error("No " + logoColor + " eps logo available");
            var _EPS_LOGO_COLORS$logo = EPS_LOGO_COLORS[logoColor], primary = _EPS_LOGO_COLORS$logo.primary, secondary = _EPS_LOGO_COLORS$logo.secondary, tertiary = _EPS_LOGO_COLORS$logo.tertiary;
            return jsxToHTML("svg", {
                width: "52px",
                height: "32px",
                viewBox: "0 0 52 32",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg"
            }, jsxToHTML("g", {
                stroke: "none",
                "stroke-width": "1",
                fill: "none",
                "fill-rule": "evenodd",
                transform: "matrix(1.333759, 0, 0, 1.333759, 0.000008, -0.000005)"
            }, jsxToHTML("g", {
                transform: "translate(-100.000000, -159.000000)"
            }, jsxToHTML("g", {
                transform: "translate(100.000000, 159.000000)"
            }, jsxToHTML("path", {
                d: "M30.5812744,12.0000152 L27.4748661,12.0000152 C27.129394,12.0000152 26.8482796,11.7245987 26.8482796,11.3798207 C26.8482796,11.0350427 27.129394,10.7315163 27.4748661,10.7315163 L32.2041612,10.7315163 L32.2041612,8.39747822 L27.4748661,8.39747822 C25.824238,8.39747822 24.4812484,9.74381226 24.4812484,11.3911357 C24.4812484,13.0384592 25.824238,14.3847932 27.4748661,14.3847932 L30.5390793,14.3847932 C30.8846021,14.3847932 31.1657165,14.6590934 31.1657165,15.0038715 C31.1657165,15.3486495 30.8846021,15.6025522 30.5390793,15.6025522 L23.9683147,15.6025522 C23.4104473,16.6680913 22.8679974,17.5814106 21.7668179,18.0380702 L30.5812744,18.0380702 C32.2041612,18.0146791 33.5316827,16.6405903 33.5316827,15.0078292 C33.5316827,13.3751696 32.2041612,12.0234063 30.5812744,12.0000152",
                fill: primary
            }), jsxToHTML("path", {
                d: "M18.6731848,15.6025522 L16.2795788,15.6025522 L16.2795788,13.1992034 C16.2795788,11.8562182 17.3483005,10.7635839 18.6731848,10.7635839 C19.9980691,10.7635839 21.0759195,11.8562182 21.0759195,13.1992034 C21.0759195,14.5422393 19.9980691,15.6025522 18.6731848,15.6025522 M18.6731848,8.39747822 C16.0403551,8.39747822 13.8959637,10.5557023 13.8959637,13.2076262 L13.8959637,13.3091061 L13.8959637,23.2135459 L16.2795788,23.2135459 L16.2795788,18.0380702 L18.6682147,18.0380702 C21.3010951,18.0380702 23.4379299,15.8511273 23.4379299,13.1992034 C23.4379299,10.5472795 21.3060651,8.39747822 18.6731848,8.39747822",
                fill: primary
            }), jsxToHTML("g", {
                transform: "translate(0.000000, 6.842233)"
            }, jsxToHTML("mask", {
                fill: secondary
            }, jsxToHTML("polygon", {
                points: "0 0.0330469345 12.6787834 0.0330469345 12.6787834 12.7180364 0 12.7180364",
                transform: "matrix(1, 0, 0, 1, 0, 0)"
            })), jsxToHTML("path", {
                d: "M6.34967672,11.1958376 C4.09589259,11.1958376 2.20112146,9.58905539 1.68833992,7.48994334 C1.68833992,7.48994334 1.54020078,6.7959222 1.54020078,6.3389074 C1.54020078,5.8818926 1.68042835,5.18071712 1.68042835,5.18071712 C2.19686138,3.08678055 4.08935033,1.52754165 6.33943225,1.52754165 C8.98580286,1.52754165 11.1573269,3.67982918 11.1573269,6.32744017 L11.1573269,7.49182072 L4.12642315,7.49182072 C4.54162861,8.30366004 5.38137113,8.76031966 6.34967672,8.76031966 L12.6701111,8.76031966 L12.6787834,1.89423932 C12.6787834,0.870560677 11.8417287,0.0330469345 10.8185493,0.0330469345 L1.86031521,0.0330469345 C0.837135761,0.0330469345 -2.02860858e-05,0.845190698 -2.02860858e-05,1.86886934 L-2.02860858e-05,10.831474 C-2.02860858e-05,11.8551526 0.837135761,12.7180364 1.86031521,12.7180364 L10.8185493,12.7180364 C11.7367482,12.7180364 12.5027001,12.0584169 12.6506871,11.1958376 L6.34967672,11.1958376 Z",
                fill: tertiary
            })), jsxToHTML("path", {
                d: "M6.33943732,10.6481099 C5.37483394,10.6481099 4.53595358,11.238926 4.11907451,12.0000254 L8.55990156,12.0000254 C8.1430225,11.238926 7.30419285,10.6481099 6.33943732,10.6481099",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M10.396619,3.96072558 C10.396619,1.77327526 8.57959428,1.52219873e-05 6.33823537,1.52219873e-05 C4.134,1.52219873e-05 2.34126788,1.71527949 2.28238752,3.85259873 C2.28142393,3.86163044 2.28218466,3.87040846 2.28218466,3.87969387 L2.28218466,5.0699518 C2.28218466,5.21232812 2.39806892,5.35308076 2.54392588,5.35308076 L4.03703251,5.35308076 C4.18288947,5.35308076 4.31079324,5.21232812 4.31079324,5.0699518 L4.31079324,3.96072558 C4.31079324,2.86839577 5.22011704,1.97968541 6.33940182,1.97968541 C7.45868661,1.97968541 8.3680104,2.86839577 8.3680104,3.96072558 L8.3680104,5.0699518 C8.3680104,5.21232812 8.486329,5.35308076 8.63218596,5.35308076 L10.1253433,5.35308076 C10.2712003,5.35308076 10.396619,5.21232812 10.396619,5.0699518 L10.396619,3.96072558 Z",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M20.7598572,20.7474063 C20.7598572,20.8523366 20.8407987,20.9002858 20.9277753,20.9002858 C21.0206856,20.9002858 21.1436192,20.8253429 21.1436192,20.687381 C21.1436192,20.5884888 21.0716036,20.5345015 20.9907129,20.5345015 C20.8827909,20.5345015 20.7598572,20.6034063 20.7598572,20.7474063 Z M20.0403098,20.7504 C20.0403098,20.8523366 20.1183098,20.9002858 20.2022434,20.9002858 C20.3071732,20.9002858 20.4211303,20.8253429 20.4211303,20.6843873 C20.4211303,20.5854444 20.3550991,20.5345015 20.2681732,20.5345015 C20.160302,20.5345015 20.0403098,20.6034063 20.0403098,20.7504 Z M21.3474437,21.133233 L21.1315997,22.3559645 C21.0236778,22.9739772 20.6189196,23.2570047 20.0702824,23.2570047 C19.6056296,23.2570047 19.2458559,22.9539856 19.3508364,22.3569793 L19.5666296,21.133233 L19.8994736,21.133233 L19.6835282,22.3559645 C19.6175984,22.7370723 19.7885087,22.9540364 20.1122746,22.9540364 C20.4450679,22.9540364 20.7298845,22.7559983 20.7988065,22.3569793 L21.0146505,21.133233 L21.3474437,21.133233 Z",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M21.9179189,22.5590867 C21.9059501,22.8050233 22.0647901,22.9639915 22.2956458,22.9639915 C22.5864468,22.9639915 22.8682205,22.7389598 22.8862244,22.3971247 C22.898244,22.1481438 22.736361,22.0011501 22.511439,22.0011501 C22.2236302,22.0011501 21.9358213,22.2321691 21.9179189,22.5590867 Z M22.1517667,21.1331924 L22.0018525,21.9781142 C22.1307199,21.8042283 22.388556,21.7122368 22.5684429,21.7122368 C22.9401854,21.7122368 23.1980216,21.9302156 23.1980216,22.3350698 C23.1980216,22.9079746 22.7992479,23.2524989 22.2896614,23.2524989 C22.0917706,23.2524989 21.9238525,23.178926 21.8219657,22.9930148 L21.7650125,23.2135307 L21.4741607,23.2135307 L21.8429111,21.1331924 L22.1517667,21.1331924 Z",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M24.7516112,22.3509666 C24.7755995,22.0972668 24.6256853,21.994011 24.3768257,21.994011 C24.1520559,21.994011 23.9451886,22.0972668 23.8551691,22.3509666 L24.7516112,22.3509666 Z M23.804251,22.6046664 C23.7922315,22.8076262 23.9511222,22.9733429 24.2209779,22.9733429 C24.3708921,22.9733429 24.5686814,22.9146875 24.6766034,22.812751 L24.8445215,23.006882 C24.6616931,23.1747298 24.3918375,23.2582985 24.1640247,23.2582985 C23.7383212,23.2582985 23.4894616,23.0032288 23.4894616,22.6132922 C23.4894616,22.0943746 23.8971612,21.7076854 24.4188179,21.7076854 C24.895541,21.7076854 25.1653459,21.9957869 25.0034629,22.6046664 L23.804251,22.6046664 Z",
                id: "Fill-16",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M25.8283814,21.7420871 L25.8133697,21.9376896 C25.9573502,21.7485311 26.131202,21.7099687 26.290042,21.7099687 C26.4339718,21.7099687 26.5628391,21.7610638 26.6318118,21.8360068 L26.4459913,22.1059941 C26.3800108,22.0461717 26.314081,22.0161844 26.2001239,22.0161844 C25.9872215,22.0161844 25.7774633,22.1438968 25.729436,22.4168778 L25.5885999,23.2135459 L25.2797442,23.2135459 L25.5405726,21.7420871 L25.8283814,21.7420871 Z",
                fill: tertiary
            }), jsxToHTML("polygon", {
                fill: tertiary,
                points: "28.1192941 21.7420871 28.275142 22.9057573 28.8387909 21.7420871 29.1835529 21.7420871 28.4100952 23.2135459 28.0473293 23.2135459 27.900458 22.2428397 27.6635672 22.7250723 27.4057818 23.2135459 27.0460081 23.2135459 26.7851797 21.7420871 27.1329847 21.7420871 27.285891 22.9057573 27.8524307 21.7420871"
            }), jsxToHTML("path", {
                d: "M30.5274503,22.3509666 C30.5513879,22.0972668 30.4015244,21.994011 30.1526649,21.994011 C29.9278951,21.994011 29.7210277,22.0972668 29.6310082,22.3509666 L30.5274503,22.3509666 Z M29.5800901,22.6046664 C29.5680706,22.8076262 29.7269614,22.9733429 29.996817,22.9733429 C30.1467312,22.9733429 30.3445205,22.9146875 30.4524425,22.812751 L30.6203606,23.006882 C30.4375322,23.1747298 30.1676766,23.2582985 29.9398638,23.2582985 C29.5141603,23.2582985 29.2653008,23.0032288 29.2653008,22.6132922 C29.2653008,22.0943746 29.6730004,21.7076854 30.1946571,21.7076854 C30.6713801,21.7076854 30.941185,21.9957869 30.7793021,22.6046664 L29.5800901,22.6046664 Z",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M31.3524449,21.3412364 C31.3524449,21.4461666 31.4304449,21.5003569 31.5144293,21.5003569 C31.63432,21.5003569 31.7452342,21.4222173 31.7452342,21.2753759 C31.7452342,21.1762808 31.6702264,21.119249 31.5892849,21.119249 C31.4783707,21.119249 31.3524449,21.1913505 31.3524449,21.3412364 Z M31.625242,21.742082 L31.3645151,23.2135408 L31.0556594,23.2135408 L31.3164878,21.742082 L31.625242,21.742082 Z",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M32.9955925,22.1060753 C32.8996393,21.9981006 32.7767563,21.9681133 32.629885,21.9681133 C32.4259085,21.9681133 32.2820801,22.0371704 32.2820801,22.1661006 C32.2820801,22.2740753 32.398928,22.3191831 32.5728811,22.3341006 C32.8426861,22.3580499 33.1874481,22.4481133 33.1154832,22.8290182 C33.0645651,23.1049421 32.7887251,23.266904 32.4049631,23.266904 C32.1651815,23.266904 31.9342752,23.2129167 31.7784273,22.9939738 L31.9792596,22.7750309 C32.0901737,22.9279104 32.2850723,22.9909801 32.4589241,22.9939738 C32.6057953,22.9939738 32.7797485,22.9399865 32.806729,22.8020245 C32.8337095,22.6700499 32.7167602,22.619107 32.5009163,22.5979992 C32.2490645,22.5739992 31.9733259,22.481145 31.9733259,22.202126 C31.9733259,21.833145 32.3719475,21.7042148 32.6718265,21.7042148 C32.8996393,21.7042148 33.0675573,21.7551577 33.2055027,21.9022021 L32.9955925,22.1060753 Z",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M33.9703034,21.7420871 L33.8294672,22.534493 C33.7844828,22.7865184 33.8984399,22.9606579 34.1562254,22.9606579 C34.3990498,22.9606579 34.6059172,22.7593725 34.6478079,22.5134359 L34.7827104,21.7420871 L35.0915153,21.7420871 L34.8307884,23.2135459 L34.5519562,23.2135459 L34.5729016,23.0003366 C34.3990498,23.1652922 34.2280888,23.2430765 34.0213229,23.2430765 C33.658557,23.2430765 33.442713,22.982882 33.5206116,22.5361167 L33.6615492,21.7420871 L33.9703034,21.7420871 Z",
                fill: tertiary
            }), jsxToHTML("path", {
                d: "M36.4472345,23.2135459 L36.588172,22.4259603 C36.633055,22.1709412 36.5462813,22.0020279 36.2644061,22.0020279 C36.0185895,22.0020279 35.8116207,22.199863 35.7697299,22.4428059 L35.6348274,23.2135459 L35.3260225,23.2135459 L35.5869016,21.7420871 L35.8686246,21.7420871 L35.8476792,21.957123 C36.0185895,21.7981548 36.1953827,21.7197615 36.3872384,21.7197615 C36.7470121,21.7197615 36.9809614,21.9701632 36.9000199,22.4231696 L36.7590823,23.2135459 L36.4472345,23.2135459 Z",
                fill: tertiary
            }), jsxToHTML("g", {
                transform: "translate(37.174252, 21.709040)"
            }, jsxToHTML("mask", {
                fill: secondary
            }, jsxToHTML("polygon", {
                points: "0.0103575649 0.00128879493 1.81575683 0.00128879493 1.81575683 2.2832981 0.0103575649 2.2832981",
                transform: "matrix(1, 0, 0, 1, 0, 0)"
            })), jsxToHTML("path", {
                d: "M0.406639662,0.85909852 C0.406639662,1.11092093 0.571514824,1.26400338 0.808507022,1.26400338 C1.44691014,1.26400338 1.61787113,0.2832 0.979214434,0.2832 C0.676444603,0.2832 0.406639662,0.508028753 0.406639662,0.85909852 Z M0.319663069,1.70747061 C0.298717685,1.91043044 0.45456554,1.9925277 0.715495319,1.9925277 C0.943358778,1.9925277 1.18922614,1.86522114 1.24617932,1.54134799 L1.291113,1.288663 C1.15621053,1.4776186 0.910343173,1.55220634 0.72756554,1.55220634 C0.349686476,1.55220634 0.085916645,1.32717463 0.085916645,0.91912389 C0.085916645,0.337339535 0.517553836,0.00128879493 1.00619493,0.00128879493 C1.21316372,0.00128879493 1.39903498,0.099572093 1.46501547,0.267572093 L1.51598427,0.0330520085 L1.8157619,0.0330520085 L1.55787503,1.54824863 C1.46202328,2.1092296 1.04524564,2.28331839 0.664526528,2.28331839 C0.208748895,2.28331839 -0.0429507152,2.06265032 0.0198854356,1.70747061 L0.319663069,1.70747061 Z",
                fill: tertiary
            }))))));
        }, _fundingLogos[constants.h.MYBANK] = function(_ref) {
            var logoColor = _ref.logoColor;
            if (!MYBANK_LOGO_COLORS[logoColor]) throw new Error("No " + logoColor + " mybank logo available");
            var _MYBANK_LOGO_COLORS$l = MYBANK_LOGO_COLORS[logoColor], primary = _MYBANK_LOGO_COLORS$l.primary, secondary = _MYBANK_LOGO_COLORS$l.secondary, tertiary = _MYBANK_LOGO_COLORS$l.tertiary;
            return jsxToHTML("svg", {
                width: "58px",
                height: "32px",
                viewBox: "0 0 58 32",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg"
            }, jsxToHTML("g", {
                stroke: "none",
                "stroke-width": "1",
                fill: "none",
                "fill-rule": "evenodd",
                transform: "matrix(1.333867, 0, 0, 1.333867, -0.00001, -0.00321)"
            }, jsxToHTML("g", {
                transform: "translate(-100.000000, -159.000000)"
            }, jsxToHTML("g", {
                transform: "translate(100.000000, 159.000000)"
            }, jsxToHTML("path", {
                d: "M29.010016,14.6206556 C29.010016,14.6206556 27.947442,14.8389924 27.9585564,14.0777038 C27.9698571,13.3164773 29.8942008,13.3619719 30.0914038,13.4236258 C30.0914038,13.4236258 30.1519432,14.2874637 29.010016,14.6206556 M29.3297879,9.81836571 C27.677716,9.80301439 26.9053582,10.753926 26.9053582,10.753926 C26.4037199,11.2864986 26.7253546,12.0076376 27.2173686,12.0597202 C27.924406,12.1345501 27.9170171,11.5413802 29.0022546,11.2784811 C29.9542434,11.0477763 29.9954723,11.9305703 29.9954723,11.9305703 C25.9352386,11.8295126 26.1290887,15.239929 27.5113104,15.9642377 C28.8367183,16.658714 30.0756326,15.7825701 30.0756326,15.7825701 C30.0756326,15.7825701 30.1222013,16.2545455 30.777951,16.2545455 C31.5283904,16.2545455 31.5272727,15.5049412 31.5272727,15.5049412 L31.5242302,12.1853897 C31.4748674,9.75671183 29.3297879,9.81836571 29.3297879,9.81836571",
                id: "Fill-1",
                fill: primary
            }), jsxToHTML("path", {
                d: "M42.4169651,14.9132636 L40.766254,12.4266353 L41.9794586,11.2784792 C41.9794586,11.2784792 42.5394372,10.7597112 42.0797024,10.2455911 C41.5701862,9.67606803 40.9629029,10.2382165 40.9629029,10.2382165 L39.4383789,11.6556411 L39.4383789,8.81056644 C39.4383789,8.40291433 39.1083605,8.07272727 38.7011934,8.07272727 C38.2936547,8.07272727 37.9636364,8.40291433 37.9636364,8.81056644 L37.9636364,15.5050966 C37.9636364,15.9126248 38.2936547,16.2429358 38.7011934,16.2429358 C39.1083605,16.2429358 39.4383789,15.9126248 39.4383789,15.5050966 L39.4383789,13.7227806 L39.7172538,13.4440304 L41.2106953,15.7865117 C41.2106953,15.7865117 41.697426,16.5998328 42.4143027,16.0821803 C42.9532914,15.6931198 42.4169651,14.9132636 42.4169651,14.9132636",
                fill: primary
            }), jsxToHTML("path", {
                d: "M37.0887651,12.0920353 C37.0887651,9.6760941 35.0962232,9.33568291 33.7411943,10.1020724 C33.7401529,10.1029393 33.7389278,10.1056016 33.7382539,10.1063446 C33.6363205,9.81249385 33.362313,9.6 33.0365425,9.6 C32.6248269,9.6 32.2909091,9.93768691 32.2909091,10.3541303 L32.2909091,15.3913243 C32.2909091,15.8078915 32.6248269,16.1454545 33.0365425,16.1454545 C33.4485644,16.1454545 33.7826048,15.8078915 33.7826048,15.3913243 L33.7723134,11.9929705 C33.7723134,11.9929705 33.9532086,11.7752139 34.2436332,11.5669922 C34.9412403,11.0671487 35.6063806,11.2374162 35.6063806,12.0917257 L35.6234716,15.4035835 C35.6234716,15.8135877 35.9518762,16.1454545 36.3573435,16.1454545 C36.7625045,16.1454545 37.0909091,15.8135877 37.0909091,15.4035835 L37.0887651,12.0920353 Z",
                fill: primary
            }), jsxToHTML("path", {
                d: "M15.5613016,16.2862697 C15.7330634,15.9971851 15.762994,15.7935853 15.762994,15.7935853 L14.0695172,11.3349218 C14.0695172,11.3349218 13.7622674,10.4721348 14.4393994,10.2166114 C15.1567468,9.94557914 15.4157136,10.6357839 15.4696009,10.7805123 C15.5234881,10.9252407 16.5395249,13.6504516 16.5395249,13.6504516 L17.5177483,10.7867779 C17.5177483,10.7867779 17.7979621,9.89638514 18.5815138,10.2138818 C19.2290232,10.4764773 18.8964002,11.3498103 18.8964002,11.3498103 C18.8964002,11.3498103 17.8952671,14.3335844 17.0561037,16.4983684 C16.5548597,17.7916804 16.1267792,17.9191009 15.6376676,18.0403799 C14.9830758,18.2027884 13.7454545,18.1223286 13.7454545,17.30247 C13.7454545,16.655814 14.4027561,16.615491 14.6992284,16.6251065 C14.7151175,16.6254167 15.3279543,16.6788911 15.5613016,16.2862697",
                fill: secondary
            }), jsxToHTML("path", {
                d: "M11.5669215,8.85710249 L10.0137262,13.1590392 L8.3203761,8.88327934 C8.3203761,8.88327934 8.06948196,8.07272727 7.36345596,8.07272727 C6.54545455,8.07272727 6.57202708,8.72317872 6.55361169,8.88327934 C6.53525811,9.04350403 6.55361169,15.569481 6.55361169,15.569481 C6.55361169,15.569481 6.54545455,16.2545455 7.29591229,16.2545455 C8.06280792,16.2545455 8.02603896,15.56334 8.03209502,15.56334 C8.03821288,15.56334 8.03209502,12.1182301 8.03209502,12.1182301 L9.27754342,15.56334 C9.27754342,15.56334 9.46151186,16.2407127 10.0381976,16.2283686 C10.6148833,16.2161486 10.7804982,15.56334 10.7804982,15.56334 L11.823501,12.1244331 L11.823501,15.56334 C11.823501,15.56334 11.823501,16.2545455 12.5780991,16.2545455 C13.3081022,16.2545455 13.3081022,15.56334 13.3081022,15.56334 L13.3090909,8.88948239 C13.3090909,8.88948239 13.3090909,8.07272727 12.5166733,8.07663519 C11.8595284,8.07973672 11.609932,8.71207526 11.5669215,8.85710249 C11.5619778,8.8740368 11.5596913,8.88327934 11.5596913,8.88327934",
                fill: secondary
            }), jsxToHTML("g", null, jsxToHTML("mask", {
                fill: tertiary
            }, jsxToHTML("polygon", {
                points: "3.086436e-05 0.00960615385 42.6159033 0.00960615385 42.6159033 24 3.086436e-05 24",
                transform: "matrix(1, 0, 0, 1, 0, 0)"
            })), jsxToHTML("g", null), jsxToHTML("path", {
                d: "M42.6159341,18.6971754 L29.5208652,18.6971754 L19.9057529,18.6956369 L19.9124196,18.7062215 C18.0119775,20.9263446 15.1892466,22.3382831 12.0318843,22.3382831 C6.30740974,22.3382831 1.66682976,17.7116369 1.66682976,12.0048677 C1.66682976,6.29803692 6.30740974,1.67182154 12.0318843,1.67182154 C15.2027652,1.67182154 18.0390147,3.09182154 19.9398272,5.32819077 L22.0210727,5.32819077 C19.8613082,2.12277538 16.1963507,0.00960615385 12.0318843,0.00960615385 C5.38703452,0.00960615385 3.086436e-05,5.38012923 3.086436e-05,12.0048677 C3.086436e-05,18.6296062 5.38703452,24.0000062 12.0318843,24.0000062 C15.5178286,24.0000062 18.6504994,22.5164985 20.846622,20.1542215 L41.6296327,20.1336062 L42.6159341,18.6971754 Z",
                fill: secondary
            })), jsxToHTML("path", {
                d: "M23.5642714,14.6942333 L21.476941,14.6942333 L21.476941,12.703212 L23.5642714,12.703212 C24.0691167,12.729228 24.5593003,12.986305 24.5593003,13.698846 C24.5593003,14.4306215 24.1135333,14.6942333 23.5642714,14.6942333 Z M21.476941,9.5856756 L23.4225205,9.5856756 C23.8122278,9.59572442 24.2213404,9.80372869 24.2213404,10.3852036 C24.2213404,10.9910915 23.8636056,11.1846082 23.4225205,11.1846082 L21.476941,11.1846082 L21.476941,9.5856756 Z M25.2086687,11.7878453 C25.2484033,11.7332241 25.7477042,11.3284357 25.7082776,10.252103 C25.6287468,8.0729285 23.7375637,8.09777311 23.3189641,8.08507338 C22.644646,8.06479081 22.2387368,8.0729285 21.0010496,8.08507338 C19.9559983,8.09543044 19.9636372,9.0459372 19.9636372,9.0459372 L19.9636364,16.1454545 L23.4862807,16.1454545 C25.3714882,16.1454545 26.0727273,15.1069128 26.0727273,13.6549518 C26.0727273,12.1940516 25.2086687,11.7878453 25.2086687,11.7878453 Z",
                fill: secondary
            })))));
        }, _fundingLogos[constants.h.P24] = function(_ref) {
            var logoColor = _ref.logoColor;
            if (!P24_LOGO_COLORS[logoColor]) throw new Error("No " + logoColor + " p24 logo available");
            var _P24_LOGO_COLORS$logo = P24_LOGO_COLORS[logoColor], primary = _P24_LOGO_COLORS$logo.primary, secondary = _P24_LOGO_COLORS$logo.secondary;
            return jsxToHTML("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                version: "1.1",
                viewBox: "0 0 100 32",
                height: "32",
                width: "100",
                preserveAspectRatio: "xMinYMin meet"
            }, jsxToHTML("g", {
                transform: "matrix(1.2953205,0,0,1.4482638,-127.73674,-229.48747)"
            }, jsxToHTML("g", {
                transform: "translate(99,159)"
            }, jsxToHTML("path", {
                transform: "matrix(0.77200971,0,0,0.69048194,-0.38599675,-0.54304623)",
                d: "M 34.123047 14.666016 L 32.416016 14.667969 L 30.496094 27.771484 L 32.208984 27.773438 L 34.123047 14.666016 z M 2.4082031 14.669922 L 0.5 27.771484 L 2.2753906 27.773438 L 2.9785156 22.916016 L 6.421875 22.933594 C 6.421875 22.933594 7.7610468 22.994689 8.7128906 22.419922 C 9.6646511 21.844634 9.9179688 20.537109 9.9179688 20.537109 C 9.9179688 20.537109 10.021944 20.051453 10.107422 19.458984 C 10.201364 18.808401 10.297704 18.027313 10.347656 17.611328 C 10.369589 17.428799 10.382812 17.316406 10.382812 17.316406 C 10.382812 17.316406 10.406035 17.181738 10.408203 16.972656 C 10.411247 16.680039 10.373345 16.24144 10.173828 15.824219 C 10.107822 15.686199 10.023752 15.551336 9.9179688 15.423828 C 9.7749921 15.251532 9.573657 15.118146 9.3457031 15.015625 C 9.1093266 14.909344 8.8444066 14.836083 8.5878906 14.785156 C 8.2611582 14.720236 7.9481918 14.691729 7.7226562 14.679688 C 7.5151753 14.668598 7.3808594 14.669922 7.3808594 14.669922 L 4.5292969 14.669922 L 2.4082031 14.669922 z M 3.9023438 16.636719 L 6.5097656 16.644531 C 6.5097656 16.644531 6.6871684 16.640189 6.9335938 16.644531 C 7.2136679 16.6496 7.5842469 16.667097 7.8886719 16.712891 C 8.149399 16.752066 8.3620627 16.811675 8.4277344 16.90625 C 8.5143382 17.03109 8.5484972 17.190294 8.5605469 17.335938 C 8.5776425 17.542977 8.5477921 17.723762 8.546875 17.736328 C 8.5451652 17.758038 8.3882592 18.81021 8.1777344 20.056641 C 8.0971356 20.533644 7.7783765 20.790093 7.4101562 20.878906 C 6.8022654 21.025453 6.1484375 21 6.1484375 21 L 3.2695312 20.990234 L 3.9023438 16.636719 z M 27.246094 18.195312 C 26.565902 18.205016 26.253806 18.2403 26 18.302734 C 26 18.302734 24.790129 18.501565 24.103516 19.472656 C 23.416902 20.4437 23.212891 22.568359 23.212891 22.568359 C 23.212891 22.568359 22.804576 24.916796 22.923828 25.699219 C 23.042829 26.481642 23.256401 27.206424 24.033203 27.546875 C 24.810173 27.88723 25.46875 27.873047 25.46875 27.873047 C 25.46875 27.873047 26.853325 27.996517 27.896484 27.714844 C 28.939685 27.433792 29.490234 26.595703 29.490234 26.595703 C 29.490234 26.595703 29.735609 26.235379 29.912109 25.804688 C 30.088777 25.374043 30.140682 25.073949 30.148438 25.037109 L 30.257812 24.53125 L 28.484375 24.533203 C 28.484375 24.533203 28.385914 25.868868 27.429688 25.992188 C 26.473716 26.115218 25.960314 26.068498 25.775391 26.060547 C 25.593178 26.052871 24.567122 26.102566 24.650391 25.125 C 24.650808 25.111821 24.651179 25.091912 24.652344 25.064453 C 24.69996 23.94948 24.808594 23.660156 24.808594 23.660156 L 30.375 23.642578 L 30.613281 22.072266 C 30.883598 20.286624 30.683916 18.929319 29.257812 18.398438 C 28.779056 18.220288 27.947801 18.185366 27.246094 18.195312 z M 37.748047 18.197266 C 37.067855 18.206824 36.755758 18.242238 36.501953 18.304688 C 36.501953 18.304688 35.292082 18.503803 34.605469 19.474609 C 33.918854 20.445938 33.714844 22.570313 33.714844 22.570312 C 33.714844 22.570312 33.306572 24.918749 33.425781 25.701172 C 33.545028 26.483643 33.758145 27.207998 34.535156 27.548828 C 35.311959 27.889232 35.970703 27.875 35.970703 27.875 C 35.970703 27.875 37.355488 27.998135 38.398438 27.716797 C 39.441597 27.435412 39.992187 26.597656 39.992188 26.597656 C 39.992188 26.597656 40.237604 26.237189 40.414062 25.806641 C 40.590771 25.376138 40.642384 25.077855 40.650391 25.041016 L 40.759766 24.533203 L 38.986328 24.535156 C 38.986328 24.535156 38.887867 25.871106 37.931641 25.994141 C 36.975669 26.117315 36.462059 26.072303 36.277344 26.064453 C 36.095172 26.056777 35.06916 26.104467 35.152344 25.126953 C 35.152802 25.113774 35.153175 25.093967 35.154297 25.066406 C 35.201874 23.951433 35.310547 23.662109 35.310547 23.662109 L 40.876953 23.644531 L 41.115234 22.076172 C 41.385759 20.290531 41.185607 18.931462 39.759766 18.400391 C 39.280716 18.222193 38.449796 18.187223 37.748047 18.197266 z M 46.277344 18.304688 L 43.757812 24.96875 L 43.179688 18.316406 L 41.541016 18.318359 L 42.371094 27.773438 L 44.355469 27.765625 L 46.90625 21.148438 L 47.486328 27.765625 L 49.505859 27.765625 L 53.117188 18.316406 L 51.417969 18.318359 L 48.898438 24.996094 L 48.300781 18.3125 L 46.277344 18.304688 z M 11.253906 18.310547 L 9.7929688 27.720703 L 11.617188 27.720703 L 12.427734 22.507812 C 12.596271 21.449811 13.285209 20.144531 14.638672 20.144531 L 15.582031 20.140625 L 15.865234 18.310547 L 14.873047 18.310547 C 14.184891 18.310547 13.533952 18.621542 12.978516 18.96875 L 13.076172 18.310547 L 11.253906 18.310547 z M 23.574219 18.310547 L 17.048828 18.320312 L 16.789062 20.167969 L 20.960938 20.167969 L 15.732422 25.884766 L 15.451172 27.771484 L 22.191406 27.769531 L 22.457031 25.939453 L 17.880859 25.951172 L 23.335938 20.005859 L 23.574219 18.310547 z M 59.283203 18.3125 L 56.183594 25.228516 L 55.087891 18.320312 L 53.347656 18.316406 L 54.962891 27.882812 L 54.755859 28.283203 C 54.755859 28.283203 54.42297 29.081956 54.011719 29.267578 C 53.600426 29.452827 52.910156 29.304688 52.910156 29.304688 L 52.650391 31.068359 L 53.066406 31.152344 C 53.459811 31.231491 53.623329 31.198848 54.033203 31.152344 C 54.443329 31.10608 54.748768 30.903232 55.25 30.449219 C 55.751441 29.99568 56.560547 28.207031 56.560547 28.207031 L 61.027344 18.330078 L 59.283203 18.3125 z M 37.816406 20.023438 C 38.153219 20.022293 38.536406 20.045829 38.880859 20.126953 C 39.109271 20.180351 39.326106 20.327316 39.382812 20.544922 C 39.516491 21.058003 39.375 21.841797 39.375 21.841797 L 35.558594 21.835938 L 35.710938 21.144531 C 35.710938 21.144531 35.842858 20.605552 36.107422 20.375 C 36.372026 20.144305 36.710486 20.103629 37.029297 20.068359 C 37.188702 20.050872 37.479594 20.024582 37.816406 20.023438 z M 27.330078 20.027344 C 27.666911 20.026207 28.050203 20.04988 28.394531 20.130859 C 28.623194 20.184445 28.839945 20.329507 28.896484 20.546875 C 29.030121 21.059954 28.886719 21.84375 28.886719 21.84375 L 25.072266 21.839844 L 25.224609 21.148438 C 25.224609 21.148438 25.35653 20.607886 25.621094 20.376953 C 25.885906 20.146258 26.224367 20.107486 26.542969 20.072266 C 26.702373 20.054561 26.993245 20.028481 27.330078 20.027344 z ",
                fill: primary
            }), jsxToHTML("path", {
                d: "m 18.656138,16.774358 c -0.0046,0.0239 -0.0083,0.04735 -0.01154,0.07058 -0.0065,0.118231 0.01306,-0.07708 0.01154,-0.07058",
                fill: primary
            }), jsxToHTML("path", {
                d: "m 26.763669,16.775893 c -0.0046,0.02391 -0.0083,0.04743 -0.01154,0.07066 -0.0065,0.118089 0.01306,-0.07731 0.01154,-0.07066",
                fill: primary
            }), jsxToHTML("path", {
                transform: "matrix(0.77200971,0,0,0.69048194,-0.38599675,-0.54304623)",
                d: "M 51.226562 0.78710938 C 50.728893 0.78574323 50.439453 0.79296875 50.439453 0.79296875 L 48.318359 5.6542969 C 48.318359 5.6542969 49.531198 5.9719517 51.199219 6.5273438 C 54.144731 7.5791572 56.515625 9.2929688 56.515625 9.2929688 L 66.666016 3.234375 C 66.745656 3.1868271 63.084253 2.0998969 59.082031 1.3945312 C 56.08052 0.86568549 52.71957 0.7912078 51.226562 0.78710938 z M 47.589844 0.90820312 C 47.589844 0.90820313 43.781742 1.1966088 40.910156 1.8066406 C 38.038322 2.4166724 34.904297 3.3691406 34.904297 3.3691406 L 35.34375 6.2011719 C 35.34375 6.2011719 37.385444 5.5830734 39.835938 5.25 C 42.979007 4.7627651 46.330078 5.2851562 46.330078 5.2851562 L 47.589844 0.90820312 z M 32.949219 4.0429688 C 32.949219 4.0429687 31.321834 4.6211203 28.267578 6.0117188 C 25.213321 7.4021267 22.914062 8.8925781 22.914062 8.8925781 L 25.453125 10.84375 C 25.453125 10.84375 27.099522 9.6851386 28.839844 8.8378906 C 30.525001 7.9290065 33.464844 6.8066406 33.464844 6.8066406 L 32.949219 4.0429688 z M 71.046875 5.0175781 L 58.333984 10.615234 L 60.566406 12.546875 L 78.900391 12.546875 C 78.900391 12.546875 78.861436 11.867776 78.373047 10.908203 C 78.067288 10.306786 77.515959 9.6724399 76.935547 9.0117188 C 76.724772 8.771647 75.878829 8.0196942 75.248047 7.5527344 C 73.629269 6.3552786 72.725403 5.8908131 71.046875 5.0175781 z M 20.621094 10.361328 C 20.621094 10.361328 18.007768 12.208509 16.898438 13.080078 C 15.819753 13.883157 13.6875 15.744141 13.6875 15.744141 L 19.160156 15.744141 C 19.160156 15.744141 20.387652 14.611026 21.257812 13.884766 C 22.127974 13.158363 23.712891 12.011719 23.712891 12.011719 L 20.621094 10.361328 z M 66.779297 14.519531 C 65.231195 14.543948 64.467235 14.626145 63.683594 14.955078 C 62.899953 15.283726 62.446574 15.882838 62.158203 16.728516 C 61.840059 17.527168 61.65625 19.259766 61.65625 19.259766 L 63.453125 19.261719 L 63.560547 18.464844 C 63.560547 18.464844 63.753461 17.029388 64.181641 16.751953 C 64.31878 16.663088 64.538495 16.579747 64.792969 16.529297 C 65.262594 16.436347 65.860733 16.425312 66.345703 16.445312 C 67.093861 16.476103 67.374266 16.483376 68.134766 16.582031 C 68.895557 16.68089 68.701172 17.517578 68.701172 17.517578 L 68.552734 18.767578 C 68.552734 18.767578 68.488006 19.327955 68.3125 19.677734 C 68.157306 19.987057 67.733373 20.195678 67.488281 20.287109 C 66.896194 20.507571 64.871094 21.095703 64.871094 21.095703 L 63.275391 21.619141 C 63.275391 21.619141 62.297563 21.944394 61.748047 22.636719 C 61.19878 23.329281 60.983257 24.116118 60.908203 24.527344 C 60.833113 24.938283 60.412109 27.769531 60.412109 27.769531 L 69.009766 27.773438 L 69.296875 25.810547 L 62.496094 25.820312 L 62.619141 25.021484 C 62.619141 25.021484 62.697988 24.196554 62.990234 23.927734 C 63.082461 23.842591 63.127078 23.730658 63.669922 23.509766 C 63.993778 23.377829 65.103516 23.039062 65.103516 23.039062 L 67.669922 22.240234 C 67.669922 22.240234 69.069743 21.828553 69.621094 20.957031 C 70.172403 20.085747 70.384766 18.416016 70.384766 18.416016 C 70.384766 18.416016 70.533003 16.793571 70.419922 16.285156 C 70.307099 15.776804 69.886071 15.166455 69.375 14.90625 C 68.863719 14.646045 68.327565 14.495353 66.779297 14.519531 z ",
                fill: secondary
            }), jsxToHTML("g", {
                transform: "translate(53.596306,9.56338)"
            }, jsxToHTML("path", {
                d: "M 4.7408782,5.7106164 1.839113,5.7061141 5.3711256,1.8647573 Z M 6.112171,5.7095319 7.0417209,0.01876197 5.3948175,0.01774319 0.26289873,5.6444944 0.02981113,7.0693723 4.5178982,7.0688465 4.1894639,9.0682502 l 1.376733,0.00181 0.3251187,-2.001047 1.2714396,0.00269 0.2297076,-1.3639812 z",
                fill: secondary
            })))));
        }, _fundingLogos[constants.h.ZIMPLER] = function(_ref) {
            var logoColor = _ref.logoColor;
            if (!ZIMPLER_LOGO_COLORS[logoColor]) throw new Error("No " + logoColor + " zimpler logo available");
            return jsxToHTML("svg", {
                width: "127",
                height: "32",
                viewBox: "0 0 127 32",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                preserveAspectRatio: "xMinYMin meet"
            }, jsxToHTML("g", {
                transform: "matrix(2.2546708,0,0,2.0580615,0.70028058,1.3242473)",
                fill: ZIMPLER_LOGO_COLORS[logoColor].primary
            }, jsxToHTML("path", {
                d: "m 44.363387,6.5973104 c 0.2184,-1.0706901 1.091377,-1.9895312 2.0692,-1.9895312 0.550355,0 0.9492,0.4072031 0.806711,0.8621302 L 44.211564,7.544662 c 0.05693,-0.5305417 0.151823,-0.9473516 0.151823,-0.9473516 z m -14.0476,2.5296797 0.474755,-2.719026 c 0.208756,-0.6442735 0.968178,-1.5064037 1.755911,-1.5538178 0.303645,-0.018904 0.664534,-0.00961 1.006134,0.2652709 0.294311,0.3315885 0.446133,0.8243229 0.446133,1.4400859 0,1.9421172 -0.9492,3.287375 -2.2876,3.287375 -0.664222,-0.0093 -1.186267,-0.3504922 -1.395333,-0.719888 z M 55.857698,2.8454016 c -1.138978,-0.056711 -2.6292,1.3359609 -2.6292,1.3359609 l -0.474756,-1.184112 h -1.300133 l -0.626578,3.543349 c -0.04729,0.2460573 -0.1708,0.4642239 -0.370222,0.615763 l -1.717956,1.3452578 c 0,0 -0.702177,0.5401484 -1.68,1.1652083 -0.445822,0.2181667 -0.806711,0.3126849 -1.176933,0.3126849 -0.787733,0 -1.281156,-0.3030781 -1.508889,-0.8243229 -0.03827,-0.094518 -0.06658,-0.1989531 -0.0952,-0.2934713 l 4.404089,-2.975 C 49.317831,5.441399 49.308498,4.8352427 49.222942,4.5318547 48.938276,3.5845031 48.083964,2.873912 46.669964,2.873912 c -2.638844,0 -4.451688,2.2455052 -4.451688,5.438362 0,0.2178567 0.0096,0.4261067 0.03795,0.6250599 l -1.252844,0.8813437 c -0.246711,0.1515391 -0.597956,0.2841744 -0.816356,0.2841744 -0.379555,0 -0.541022,-0.2937812 -0.417511,-0.9284478 L 41.40192,0.04115417 39.361342,0.02225052 38.544987,4.5699719 c -0.03796,0.1893463 -0.1232,0.3693958 -0.256045,0.5113281 l -2.249644,2.3685338 c 0.05693,-0.3882994 0.08555,-0.8051093 0.08555,-1.2408229 0,-1.9235234 -0.892266,-3.3443958 -2.391822,-3.3443958 -1.452267,0 -2.534311,1.2219193 -2.534311,1.2219193 L 30.629076,2.9972505 H 29.34792 L 28.645431,7.0048234 C 28.616809,7.184563 28.540898,7.3457088 28.417698,7.4783443 L 27.10792,9.0225552 C 26.747031,9.4111646 26.367476,9.8942922 26.177698,9.903899 25.835787,9.96061 25.683964,9.837581 25.797831,9.2026047 l 0.522045,-2.8990755 c 0.408177,-2.2926094 -0.294,-3.4485209 -2.268312,-3.4485209 -1.176933,0 -2.562622,1.3170573 -2.562622,1.3170573 -0.294311,-0.8624401 -1.015778,-1.3170573 -2.107155,-1.3170573 -1.195911,0 -2.487023,1.3926719 -2.487023,1.3926719 L 16.363387,3.0065474 H 15.062942 L 14.39872,6.7962635 C 14.370098,6.976313 14.294187,7.1374588 14.170987,7.2700943 L 12.680764,9.032162 c -0.360888,0.3886094 -0.740444,0.871737 -0.930222,0.8810338 -0.3416,0.057021 -0.493733,-0.066318 -0.379555,-0.7009843 L 12.50032,3.0065474 h -2.059556 l -0.332266,1.8286953 c -0.0476,0.2367604 -0.1518224,0.464224 -0.3132891,0.6439635 L 6.7864533,8.9469406 C 6.0080533,9.7805604 5.0305422,9.903899 4.83112,9.9131958 H 2.7049867 L 7.5362311,4.4562401 7.7829422,2.978037 H 1.5756533 L 1.2813422,4.6362896 H 4.8880533 L 0.22792,10.093245 -1.2444444e-4,11.637456 c 0,0 4.36613334444,0.01921 4.44204444444,0 1.2814667,0 2.4204444,-1.127401 2.8759111,-1.591625 L 9.6433867,7.3079016 9.2258756,9.6101177 c -0.266,1.4967973 0.3129777,2.2073883 1.5471554,2.1791873 0.759111,-0.01921 1.281156,-0.521245 1.8032,-1.04218 l 1.404667,-1.6390385 -0.465111,2.6431015 h 2.059866 l 0.9016,-5.182388 c 0.113867,-0.6442734 0.939556,-1.7335573 1.803511,-1.7335573 0.911245,0 1.347734,0.4450104 1.138978,1.6672396 l -0.920889,5.2394087 h 2.040889 l 0.987156,-5.5709973 c 0.05693,-0.3693958 0.721155,-1.4115755 1.642044,-1.4115755 0.958534,0 1.271822,0.5209349 1.063067,1.7431641 l -0.569645,3.0980286 c -0.265688,1.4971071 0.313289,2.2076981 1.547156,2.1791871 0.759422,-0.0189 1.281467,-0.520934 1.803511,-1.042179 l 1.214889,-1.4211825 -0.427156,2.4348515 -0.493733,2.813854 h 2.059867 l 0.664222,-3.827523 c 0.284667,0.360099 0.683511,0.65388 1.176933,0.805419 0.113867,0.03781 0.227734,0.06632 0.351245,0.08522 1.328755,0.06632 2.515333,-0.577955 3.568755,-1.676846 l 0.0096,-0.00961 2.989778,-3.0887317 -0.484089,2.7004323 c -0.265689,1.4967974 0.303644,2.1788774 1.547155,2.1884844 0.806711,0 1.556489,-0.397906 2.344222,-0.928448 l 1.044089,-0.748708 c 0.01898,0.03812 0.03796,0.08553 0.05693,0.123338 0.474755,0.918842 1.348044,1.525308 2.638844,1.534915 h 0.0093 c 1.357378,0 2.686134,-1.279251 3.454889,-1.8190892 0.199423,-0.1422422 0.939867,-0.7391016 1.736934,-1.383375 L 49.906371,11.73228 h 2.059556 L 52.86792,6.5498963 c 0.113867,-0.6442734 0.939556,-1.7338671 1.8032,-1.7338671 0.332267,0 0.597956,0.057021 0.797378,0.1896562 z"
            }), jsxToHTML("g", {
                transform: "translate(10.577778,-0.309896)"
            }, jsxToHTML("path", {
                d: "m 1.0778133,2.4638268 c 0.6835111,0 1.3287556,-0.5401484 1.4332889,-1.2033255 C 2.6153244,0.59732422 2.1502133,0.05748568 1.4670133,0.04787891 c -0.68351108,0 -1.32875552,0.54014843 -1.43328886,1.20332549 -0.11386666,0.672474 0.35124445,1.2126224 1.04408886,1.2126224"
            }))));
        }, _fundingLogos), visa = __webpack_require__("./src/resources/cardLogos/visa.svg"), visa_default = __webpack_require__.n(visa), amex = __webpack_require__("./src/resources/cardLogos/amex.svg"), amex_default = __webpack_require__.n(amex), mastercard = __webpack_require__("./src/resources/cardLogos/mastercard.svg"), mastercard_default = __webpack_require__.n(mastercard), maestro = __webpack_require__("./src/resources/cardLogos/maestro.svg"), maestro_default = __webpack_require__.n(maestro), discover = __webpack_require__("./src/resources/cardLogos/discover.svg"), discover_default = __webpack_require__.n(discover), hiper = __webpack_require__("./src/resources/cardLogos/hiper.svg"), hiper_default = __webpack_require__.n(hiper), elo = __webpack_require__("./src/resources/cardLogos/elo.svg"), elo_default = __webpack_require__.n(elo), jcb = __webpack_require__("./src/resources/cardLogos/jcb.svg"), jcb_default = __webpack_require__.n(jcb), cup = __webpack_require__("./src/resources/cardLogos/cup.svg"), cup_default = __webpack_require__.n(cup), cardLogos = ((_cardLogos = {})[constants.o.VISA] = visa_default.a, 
        _cardLogos[constants.o.AMEX] = amex_default.a, _cardLogos[constants.o.MASTERCARD] = mastercard_default.a, 
        _cardLogos[constants.o.MAESTRO] = maestro_default.a, _cardLogos[constants.o.DISCOVER] = discover_default.a, 
        _cardLogos[constants.o.HIPER] = hiper_default.a, _cardLogos[constants.o.ELO] = elo_default.a, 
        _cardLogos[constants.o.JCB] = jcb_default.a, _cardLogos[constants.o.CUP] = cup_default.a, 
        _cardLogos), config = __webpack_require__("./src/config/index.js");
        function validateButtonStyle() {
            var style = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, props = arguments[1];
            if (!style) throw new Error("Expected props.style to be set");
            var label = style[constants.m.LABEL] || getButtonConfig("DEFAULT", style[constants.m.LAYOUT] === constants.g.VERTICAL ? "defaultVerticalLabel" : "defaultLabel");
            if (!BUTTON_CONFIG[label]) throw new Error("Invalid button label: " + label + ", expected: " + Object.keys(BUTTON_CONFIG[label]).join(", "));
            var color = style[constants.m.COLOR], shape = style[constants.m.SHAPE], size = style[constants.m.SIZE], branding = style[constants.m.BRANDING], fundingicons = style[constants.m.FUNDINGICONS], tagline = style[constants.m.TAGLINE], layout = style[constants.m.LAYOUT], maxbuttons = style[constants.m.MAXBUTTONS], height = style[constants.m.HEIGHT];
            if (color && -1 === getButtonConfig(label, "colors").indexOf(color)) throw new Error("Unexpected style." + constants.m.COLOR + " for " + label + " button: " + color + ", expected " + getButtonConfig(label, "colors").join(", "));
            if (shape && -1 === getButtonConfig(label, "shapes").indexOf(shape)) throw new Error("Unexpected style." + constants.m.SHAPE + " for " + label + " button: " + shape + ", expected " + getButtonConfig(label, "shapes").join(", "));
            if (size && -1 === getButtonConfig(label, "sizes").indexOf(size)) throw new Error("Unexpected style." + constants.m.SIZE + " for " + label + " button: " + size + ", expected " + getButtonConfig(label, "sizes").join(", "));
            if (!1 === branding) throw new Error("style." + constants.m.BRANDING + ":false is not allowed");
            if (fundingicons && !getButtonConfig(label, "allowFundingIcons")) throw new Error("style." + constants.m.FUNDINGICONS + ":true is not allowed for " + label + " button");
            if (layout && -1 === getButtonConfig(label, "layouts").indexOf(layout)) throw new Error("Unexpected style." + constants.m.LAYOUT + " for " + label + " button: " + layout + ", expected " + getButtonConfig(label, "layouts").join(", "));
            if (void 0 !== maxbuttons) {
                if ("number" != typeof maxbuttons) throw new TypeError("Expected style." + constants.m.MAXBUTTONS + " to be a number, got: " + maxbuttons);
                if (maxbuttons < 1) throw new Error("Expected style." + constants.m.MAXBUTTONS + " to be a at least 1, got: " + maxbuttons);
                var minButtons = layout === constants.g.VERTICAL ? getButtonConfig(label, "minVerticalButtons") : getButtonConfig(label, "minHorizontalButtons");
                if (maxbuttons < minButtons) throw new Error("Expected style." + constants.m.MAXBUTTONS + " to be no fewer than " + minButtons + ", got " + maxbuttons);
            }
            if (void 0 !== height) {
                if ("number" != typeof height) throw new TypeError("Expected style." + constants.m.HEIGHT + " to be a number, got: " + maxbuttons);
                var buttonSize = size || getButtonConfig(label, style.layout === constants.g.VERTICAL ? "defaultVerticalSize" : "defaultSize"), _ref = size === constants.l.RESPONSIVE ? {
                    minHeight: BUTTON_STYLE[constants.l.SMALL].minHeight,
                    maxHeight: BUTTON_STYLE[constants.l.HUGE].maxHeight
                } : BUTTON_STYLE[buttonSize], minHeight = _ref.minHeight, maxHeight = _ref.maxHeight;
                if (height < minHeight || height > maxHeight) throw new Error("Expected style." + constants.m.HEIGHT + " to be between " + minHeight + "px and " + maxHeight + "px - got " + height + "px");
            }
            if (!getButtonConfig(label, "allowPrimary")) throw new Error(label + " can not be used as primary button label");
            if (layout === constants.g.VERTICAL) {
                if (size && -1 === [ constants.l.MEDIUM, constants.l.LARGE, constants.l.RESPONSIVE ].indexOf(size)) throw new Error("Button must be at least " + constants.l.MEDIUM + " size for " + constants.g.VERTICAL + " layout");
                if (!getButtonConfig(label, "allowPrimaryVertical")) throw new Error("style." + constants.m.LABEL + " option is not allowed for " + constants.g.VERTICAL + " layout - got " + label);
                if (fundingicons) throw new Error("style." + constants.m.FUNDINGICONS + " not allowed for " + constants.g.VERTICAL + " layout - got " + fundingicons);
                if (tagline) throw new Error("style." + constants.m.TAGLINE + " is not allowed for " + constants.g.VERTICAL + " layout - got " + tagline);
            }
            !function() {
                var style = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, country = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "en_US").split("_")[1], isInstallmentAllowedCountry = -1 !== constants.a.indexOf(country);
                if (!isInstallmentAllowedCountry && style.label === constants.f.INSTALLMENT) throw new Error("Unexpected label: style." + style.label + " for country: " + country);
                if (!isInstallmentAllowedCountry && style[constants.m.INSTALLMENTPERIOD]) throw new Error("style." + constants.m.INSTALLMENTPERIOD + " is invalid for country: " + country);
                if (isInstallmentAllowedCountry && style[constants.m.INSTALLMENTPERIOD] && style.label !== constants.f.INSTALLMENT) throw new Error("style." + constants.m.INSTALLMENTPERIOD + " is invalid for label: style." + style.label);
                if (isInstallmentAllowedCountry && style.label === constants.f.INSTALLMENT && style[constants.m.INSTALLMENTPERIOD] && "number" != typeof style[constants.m.INSTALLMENTPERIOD]) throw new Error("style." + constants.m.INSTALLMENTPERIOD + " is expected to be a number");
                if (isInstallmentAllowedCountry && style.label === constants.f.INSTALLMENT && style[constants.m.INSTALLMENTPERIOD] && -1 === constants.b[country].indexOf(style[constants.m.INSTALLMENTPERIOD])) throw new Error("style." + constants.m.INSTALLMENTPERIOD + ": " + style[constants.m.INSTALLMENTPERIOD] + " is not a valid installment number for " + style.label);
            }(style, props.locale);
        }
        function validateButtonProps(props) {
            if (!props) throw new Error("Expected props");
            var locale = props.locale, style = props.style;
            !function(locale) {
                if (!locale) throw new Error("Expected props.locale to be set");
                if (!locale.match(/^[a-z]{2}[_][A-Z][A-Z0-9]$/)) throw new Error("Expected props.locale to be valid, got " + locale);
                var _locale$split = locale.split("_"), lang = _locale$split[0], country = _locale$split[1];
                if (!config.a.locales[country] || -1 === config.a.locales[country].indexOf(lang)) throw new Error("Expected props.locale to be valid");
            }(locale);
            validateButtonStyle(style, props);
        }
        var pageStyle = "\n    html, body {\n        padding: 0;\n        margin: 0;\n        width: 100%;\n        overflow: hidden;\n        text-align: center;\n    }\n\n    * {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        cursor: default;\n    }\n", CLASS = {
            SHOULD_FOCUS: "paypal-should-focus",
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
        }, buttonStyle = "\n\n    ." + CLASS.CONTAINER + ' {\n        display: block;\n        white-space: nowrap;\n        margin: 0;\n        background: 0;\n        border: 0;\n        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n        text-transform: none;\n        font-weight: 500;R\n        -webkit-font-smoothing: antialiased;\n        font-smoothing: antialiased;\n        z-index: 0;\n        font-size: 0;\n        width: 100%;\n        box-sizing: border-box;\n    }\n\n    .' + CLASS.BUTTON + ":not(." + CLASS.CARD + ") {\n        border: 1px solid transparent;\n        border-radius: 0 3px 3px 0;\n        position: relative;\n        width: 100%;\n        box-sizing: border-box;\n        border: none;\n        vertical-align: top;\n        cursor: pointer;\n        outline: none;\n        overflow: hidden;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.TRANSPARENT + " {\n        cursor: auto;\n    }\n\n    ." + CLASS.BUTTON + " * {\n        cursor: pointer;\n    }\n\n    ." + CLASS.CONTAINER + "." + CLASS.ENV + "-" + constants.s.TEST + " ." + CLASS.TEXT + " {\n        font-family: Arial !important;\n        background: rgba(0, 0, 0, 0.5) !important;\n        color: transparent  !important;\n        text-shadow: none  !important;\n    }\n\n    ." + CLASS.BUTTON + ":hover {\n        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.GOLD + ":hover,\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.SILVER + ":hover {\n        box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.05);\n    }\n\n    ." + CLASS.CARD + ", ." + CLASS.CARD + " * {\n        cursor: pointer;\n    }\n\n    ." + CLASS.CARD + ":hover {\n        filter: brightness(1.2);\n    }\n\n    ." + CLASS.BUTTON + ":focus, ." + CLASS.CARD + ":focus {\n        outline: none;\n    }\n\n    ." + CLASS.SHOULD_FOCUS + " ." + CLASS.BUTTON + ":focus,\n    ." + CLASS.SHOULD_FOCUS + " ." + CLASS.CARD + ":focus {\n        outline: solid 2px Highlight;\n        outline: auto 5px -webkit-focus-ring-color;\n        outline-offset: -3px;\n    }\n\n    ." + CLASS.BUTTON + ":focus {\n        box-shadow: -1px -1px 18px 1px rgba(0, 0, 0, 0.25) inset;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.TRANSPARENT + ":focus {\n        box-shadow: none;\n        outline: none;\n    }\n\n    ." + CLASS.LOGO + " {\n        padding: 0;\n        display: inline-block;\n        background: none;\n        border: none;\n        width: auto;\n    }\n\n    ." + CLASS.TEXT + " {\n        display: inline-block;\n        white-space: pre-wrap;\n    }\n\n    ." + CLASS.BUTTON + " ." + CLASS.LOGO + ",\n    ." + CLASS.BUTTON + " ." + CLASS.TEXT + " {\n        vertical-align: top;\n        position: relative;\n        top: 50%;\n        transform: translateY(-50%);\n        -webkit-transform: translateY(-50%);\n        -moz-transform: translateY(-50%);\n        -ms-transform: translateY(-50%);\n        -o-transform: translateY(-50%);\n        text-align: left;\n    }\n\n    ." + CLASS.BUTTON + " ." + CLASS.CARD + " {\n        border-radius: 4px;\n    }\n\n    ." + CLASS.BUTTON + " ." + CLASS.TEXT + " {\n        visibility: hidden;\n    }\n\n    .powered-by-paypal > ." + CLASS.TEXT + " {\n        vertical-align: top;\n        line-height: 18px;\n    } \n\n    .powered-by-paypal > ." + CLASS.LOGO + " {\n        height: 16px;\n        min-height: 16px;\n    } \n\n    ." + CLASS.TAGLINE + " {\n        max-width: 100%;\n        font-weight: normal;\n        display: block;\n        text-align: center;\n        width: auto;\n        visibility: hidden;\n    }\n\n    ." + CLASS.SEPARATOR + " {\n        height: 80%;\n        border-left: 1px solid rgba(0, 0, 0, 0.15);\n        margin: 0 8px;\n        display: inline-block;\n        position: relative;\n        top: 10%;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.BLACK + " ." + CLASS.SEPARATOR + " {\n        border-color: rgba(255, 255, 255, 0.45);\n    }\n", layoutStyle = "\n\n    ." + CLASS.CONTAINER + "." + CLASS.LAYOUT + "-" + constants.g.VERTICAL + " ." + CLASS.TAGLINE + " {\n        display: none;\n    }\n", brandingStyle = "\n\n    ." + CLASS.BUTTON + "." + CLASS.BRANDING + "-" + constants.d.UNBRANDED + "  {\n        min-width: 60%;\n        width: auto;\n        font-weight: 900;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.BRANDING + "-" + constants.d.UNBRANDED + " ." + CLASS.LOGO + " {\n        display: none;\n    }\n", labelStyle = "\n\n    ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + constants.f.CARD + " {\n        border-radius: 0 !important;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + constants.f.CREDIT + " ." + CLASS.TEXT + " {\n        display: none !important;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + constants.g.HORIZONTAL + "." + CLASS.NUMBER + "-" + constants.j.MULTIPLE + "." + CLASS.LABEL + "-" + constants.f.CREDIT + " ." + CLASS.LOGO + "." + CLASS.LOGO + "-" + constants.h.PAYPAL + " {\n        display: none;\n    }\n\n    @media only screen and (max-width : " + BUTTON_STYLE[constants.l.SMALL].minWidth + "px) {\n\n        ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + constants.f.CREDIT + " ." + CLASS.LOGO + "." + CLASS.LOGO + "-" + constants.h.PAYPAL + " {\n            display: none;\n        }\n    }\n\n    @media only screen and (min-width : " + BUTTON_STYLE[constants.l.SMALL].minWidth + "px) {\n\n        ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + constants.f.CREDIT + " ." + CLASS.LOGO + "." + CLASS.LOGO + "-" + constants.h.PAYPAL + " {\n            display: inline-block;\n        }\n    }\n", DUAL_BUTTON_MIN_RATIO = 2.8;
        var buttonColorStyle = "\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.GOLD + " {\n        background: #ffc439;\n        color: #111;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.BLUE + " {\n        background: #009cde;\n        color: #fff;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.SILVER + " {\n        background: #eee;\n        color: #111;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.BLACK + " {\n        background: #2C2E2F;\n        color: #fff;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.DARKBLUE + " {\n        background: #003087;\n        color: #fff;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.TRANSPARENT + " {\n        background: transparent;\n        color: #111;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.WHITE + " {\n        background: #fff;\n        color: #2C2E2F;\n        border: 1px solid #2C2E2F;\n    }\n";
        function componentStyle(_ref) {
            var height = _ref.height, cardNumber = _ref.cardNumber;
            return "\n        " + pageStyle + "\n        " + buttonStyle + "\n        " + buttonColorStyle + "\n        " + layoutStyle + "\n        " + brandingStyle + "\n        " + labelStyle + "\n        " + function(_ref) {
                var height = _ref.height, _ref$cardNumber = _ref.cardNumber, cardNumber = void 0 === _ref$cardNumber ? 4 : _ref$cardNumber;
                return Object.keys(BUTTON_STYLE).map(function(size) {
                    var style = BUTTON_STYLE[size], buttonHeight = height || style.defaultHeight, minDualWidth = Math.round(buttonHeight * DUAL_BUTTON_MIN_RATIO * 2);
                    return "\n\n            @media only screen and (min-width: " + style.minWidth + "px) {\n\n                ." + CLASS.CONTAINER + " {\n                    min-width: " + style.minWidth + "px;\n                    max-width: " + style.maxWidth + "px;\n                    font-size: " + Object(util.a)(Object(util.c)(buttonHeight, 32), 10) + "px;\n                }\n\n                ." + CLASS.BUTTON + ":not(." + CLASS.CARD + ") {\n                    height: " + buttonHeight + "px;\n                    min-height: " + (height || style.minHeight) + "px;\n                    max-height: " + (height || style.maxHeight) + "px;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.BRANDING + "-" + constants.d.UNBRANDED + " {\n                    font-size: " + Object(util.a)(Object(util.c)(buttonHeight, 45), 10) + "px;\n                }\n\n                ." + CLASS.LOGO + " {\n                    height: " + (Object(util.c)(buttonHeight, 35) + 5) + "px;\n                    max-height: " + Object(util.c)(buttonHeight, 60) + "px;\n                    min-height: " + Object(util.c)(buttonHeight, 40) + "px;\n                }\n                \n                ." + CLASS.LOGO + "." + CLASS.LOGO + "-" + constants.f.EPS + ",\n                ." + CLASS.LOGO + "." + CLASS.LOGO + "-" + constants.f.MYBANK + " {\n                    height: " + (Object(util.c)(buttonHeight, 50) + 5) + "px;\n                    max-height: " + Object(util.c)(buttonHeight, 70) + "px;\n                    min-height: " + Object(util.c)(buttonHeight, 40) + "px;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.SHAPE + "-" + constants.k.PILL + " {\n                    border-radius: " + Math.ceil(buttonHeight / 2) + "px;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.SHAPE + "-" + constants.k.RECT + " {\n                    border-radius: 4px;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + constants.g.VERTICAL + " {\n                    margin-bottom: " + Object(util.c)(buttonHeight, BUTTON_RELATIVE_STYLE.VERTICAL_MARGIN) + "px;\n                }\n\n                ." + CLASS.SEPARATOR + " {\n                    margin: 0 " + Object(util.c)(buttonHeight, 5) + "px;\n                }\n\n                ." + CLASS.TAGLINE + " {\n                    height: " + Object(util.c)(buttonHeight, BUTTON_RELATIVE_STYLE.TAGLINE) + "px;\n                    line-height: " + Object(util.c)(buttonHeight, BUTTON_RELATIVE_STYLE.TAGLINE) + "px;\n                }\n\n                ." + CLASS.FUNDINGICONS + " {\n                    height: " + Object(util.c)(buttonHeight, BUTTON_RELATIVE_STYLE.FUNDINGICONS) + "px;\n                }\n\n                ." + CLASS.CARD + " {\n                    display: inline-block;\n                }\n\n                ." + CLASS.BUTTON + " ." + CLASS.CARD + " {\n                    width: " + (90 / cardNumber).toFixed(2) + "%;\n                    max-width: " + Object(util.c)(buttonHeight, 160) + "px;\n                    margin-top: 0;\n                    margin-left: " + (5 / cardNumber).toFixed(2) + "%;\n                    margin-right: " + (5 / cardNumber).toFixed(2) + "%;\n                }\n\n                ." + CLASS.BUTTON + " ." + CLASS.CARD + " img {\n                    width: 100%;\n                }\n\n                ." + CLASS.FUNDINGICONS + " ." + CLASS.CARD + " {\n                    height: " + Object(util.c)(buttonHeight, 70) + "px;\n                    margin-top: " + Object(util.c)(buttonHeight, 15) + "px;\n                    margin-left: " + Object(util.c)(buttonHeight, 7) + "px;\n                    margin-right: " + Object(util.c)(buttonHeight, 7) + "px;\n                }\n\n                ." + CLASS.FUNDINGICONS + " ." + CLASS.CARD + " img {\n                    height: 100%;\n                }\n            }\n\n            @media only screen and (min-width: " + style.minWidth + "px) and (max-width: " + minDualWidth + "px) {\n\n                ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + constants.g.HORIZONTAL + "." + CLASS.NUMBER + "-" + constants.j.MULTIPLE + "." + CLASS.NUMBER + "-0 {\n                    width: 100%;\n                    margin-right: 0;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + constants.g.HORIZONTAL + "." + CLASS.NUMBER + "-" + constants.j.MULTIPLE + "." + CLASS.NUMBER + "-1 {\n                    display: none;\n                }\n\n                ." + CLASS.CONTAINER + "." + CLASS.LAYOUT + "-" + constants.g.HORIZONTAL + "." + CLASS.NUMBER + "-" + constants.j.MULTIPLE + " ." + CLASS.TAGLINE + " {\n                    display: none;\n                }\n            }\n\n            @media only screen and (min-width: " + Object(util.a)(style.minWidth, minDualWidth) + "px) {\n\n                ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + constants.g.HORIZONTAL + "." + CLASS.NUMBER + "-" + constants.j.MULTIPLE + "." + CLASS.NUMBER + "-0 {\n                    display: inline-block;\n                    width: calc(50% - 2px);\n                    margin-right: 4px;\n                }\n\n                ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + constants.g.HORIZONTAL + "." + CLASS.NUMBER + "-" + constants.j.MULTIPLE + "." + CLASS.NUMBER + "-1 {\n                    display: inline-block;\n                    width: calc(50% - 2px);\n                }\n\n                ." + CLASS.CONTAINER + "." + CLASS.LAYOUT + "-" + constants.g.HORIZONTAL + "." + CLASS.NUMBER + "-" + constants.j.MULTIPLE + " ." + CLASS.TAGLINE + " {\n                    display: block;\n                }\n            }\n        ";
                }).join("\n");
            }({
                height: height,
                cardNumber: cardNumber
            }) + "\n    ";
        }
        function getComponentScript() {
            return function() {
                var STYLE = {
                    BLOCK: "block",
                    INLINE_BLOCK: "inline-block",
                    NONE: "none",
                    VISIBLE: "visible",
                    HIDDEN: "hidden"
                };
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
                function displayedElementsHaveDimensions(elements) {
                    return elements.every(function(el) {
                        return function(el) {
                            var rect = el.getBoundingClientRect();
                            return Boolean(rect.height && rect.width);
                        }(el) || function(el) {
                            var computedStyle = window.getComputedStyle(el);
                            return !computedStyle || computedStyle.display === STYLE.NONE;
                        }(el);
                    });
                }
                function isOverflowing(el) {
                    if (el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight) return !0;
                    var parent = el.parentNode;
                    if (!parent) return !1;
                    var e = el.getBoundingClientRect(), p = parent.getBoundingClientRect();
                    return e.top < p.top || e.left < p.left || e.right > p.right || e.bottom > p.bottom || (e.left < 0 || e.top < 0 || e.left + e.width > window.innerWidth || e.top + e.height > window.innerHeight);
                }
                var images = getElements(".{ CLASS.BUTTON } .{ CLASS.LOGO }"), text = getElements(".{ CLASS.BUTTON } .{ CLASS.TEXT }"), tagline = getElements(".{ CLASS.TAGLINE }"), cards = getElements(".{ CLASS.FUNDINGICONS } .{ CLASS.CARD }"), optionals = getElements(".{ CLASS.BUTTON }-label-credit .{ CLASS.BUTTON }-logo-paypal");
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
                toggleOptionals();
                !function() {
                    var buttonsContainer = document.getElementsByClassName("{ CLASS.CONTAINER }")[0], tabKeyCode = 9;
                    function handleMouseDownOnce() {
                        buttonsContainer.classList.remove("{ CLASS.SHOULD_FOCUS }");
                        window.removeEventListener("mousedown", handleMouseDownOnce);
                        window.addEventListener("keydown", handleFirstTab);
                    }
                    function handleFirstTab(e) {
                        if (e.keyCode === tabKeyCode) {
                            buttonsContainer.classList.add("{ CLASS.SHOULD_FOCUS }");
                            window.removeEventListener("keydown", handleFirstTab);
                            window.addEventListener("mousedown", handleMouseDownOnce);
                        }
                    }
                    buttonsContainer.classList.add("{ CLASS.SHOULD_FOCUS }");
                    window.addEventListener("keydown", handleFirstTab);
                }();
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
                    !function loop(method, delay, instances) {
                        setTimeout(function() {
                            method();
                            (instances -= 1) && loop(method, delay, instances);
                        }, delay);
                    }(toggleOptionals, 10, 10);
                });
            };
        }
        var template_content = __webpack_require__("./src/button/template/content.json"), content_default = __webpack_require__.n(template_content), componentContent = "string" == typeof content_default.a ? JSON.parse(content_default.a) : content_default.a;
        __webpack_exports__.componentTemplate = function(_ref20) {
            var _ref21, props = _ref20.props;
            if (props && props.style) {
                var style = props.style;
                "generic" === style.label && (style.label = "paypal");
                "creditblue" === style.color && delete style.color;
                1 !== style.maxbuttons || !1 !== style.tagline || "responsive" !== style.size || "horizontal" !== style.layout || style.height || (style.height = 44);
            }
            validateButtonProps(props);
            var _normalizeProps = normalizeProps(props), label = _normalizeProps.label, locale = _normalizeProps.locale, color = _normalizeProps.color, shape = _normalizeProps.shape, branding = _normalizeProps.branding, tagline = _normalizeProps.tagline, funding = _normalizeProps.funding, layout = _normalizeProps.layout, sources = _normalizeProps.sources, multiple = _normalizeProps.multiple, env = _normalizeProps.env, height = _normalizeProps.height, cards = _normalizeProps.cards, installmentperiod = _normalizeProps.installmentperiod, fundingicons = _normalizeProps.fundingicons, size = _normalizeProps.size, isFundingThrottleEnabled = _normalizeProps.isFundingThrottleEnabled, buttonNodes = function(_ref4) {
                var label = _ref4.label, color = _ref4.color, sources = _ref4.sources, multiple = _ref4.multiple, layout = _ref4.layout;
                return sources.map(function(source, i) {
                    var buttonLabel = determineLabel({
                        label: label,
                        source: source,
                        multiple: multiple,
                        layout: layout
                    }), buttonColor = multiple && i > 0 ? getButtonConfig(buttonLabel, "secondaryColors")[color] : color;
                    return {
                        source: source,
                        label: buttonLabel,
                        color: buttonColor
                    };
                });
            }({
                label: label,
                color: color,
                sources: sources,
                multiple: multiple,
                layout: layout
            }).map(function(button, i) {
                return function(_ref14) {
                    var _ref15, _ref16, _ref17, size = _ref14.size, label = _ref14.label, color = _ref14.color, locale = _ref14.locale, branding = _ref14.branding, multiple = _ref14.multiple, layout = _ref14.layout, shape = _ref14.shape, source = _ref14.source, funding = _ref14.funding, i = _ref14.i, env = _ref14.env, cards = _ref14.cards, installmentperiod = _ref14.installmentperiod, isFundingThrottleEnabled = _ref14.isFundingThrottleEnabled, logoColor = getButtonConfig(label, "logoColors")[color], contentText = determineLabel({
                        label: label,
                        source: source,
                        multiple: multiple,
                        layout: layout
                    }) === label ? getButtonConfig(label, "label") : getButtonConfig(label, "logoLabel"), dynamicContent = {
                        installmentperiod: installmentperiod,
                        locale: locale
                    };
                    contentText = renderContent(contentText = "function" == typeof contentText ? contentText(dynamicContent) : contentText, {
                        label: label,
                        locale: locale,
                        color: color,
                        branding: branding,
                        logoColor: logoColor,
                        funding: funding,
                        env: env,
                        cards: cards,
                        dynamicContent: dynamicContent,
                        layout: layout,
                        size: size,
                        isFundingThrottleEnabled: isFundingThrottleEnabled
                    });
                    var hasTabIndex = -1 === [ constants.t.CARD ].indexOf(source);
                    return jsxToHTML("div", _extends({}, ((_ref15 = {})[constants.c.LAYOUT] = layout || "", 
                    _ref15), ((_ref16 = {})[constants.c.SIZE] = size || "", _ref16), ((_ref17 = {})[constants.c.FUNDING_SOURCE] = source, 
                    _ref17[constants.c.BUTTON] = !0, _ref17), {
                        class: CLASS.BUTTON + " " + CLASS.NUMBER + "-" + i + " " + getCommonButtonClasses({
                            layout: layout,
                            shape: shape,
                            branding: branding,
                            multiple: multiple,
                            env: env
                        }) + " " + function(_ref2) {
                            var label = _ref2.label, color = _ref2.color, logoColor = _ref2.logoColor;
                            _ref2.isFundingThrottleEnabled && label === constants.f.CREDIT && (color = constants.e.SILVER);
                            return [ CLASS.LABEL + "-" + label, CLASS.COLOR + "-" + color, CLASS.LOGO_COLOR + "-" + logoColor ].join(" ");
                        }({
                            label: label,
                            color: color,
                            logoColor: logoColor,
                            isFundingThrottleEnabled: isFundingThrottleEnabled
                        }),
                        role: "button",
                        "aria-label": source,
                        tabindex: hasTabIndex && 0
                    }), contentText);
                }({
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
                    cards: cards,
                    installmentperiod: installmentperiod,
                    size: size,
                    isFundingThrottleEnabled: isFundingThrottleEnabled
                });
            }), taglineNode = function(_ref18) {
                var label = _ref18.label, tagline = _ref18.tagline, color = _ref18.color, locale = _ref18.locale, multiple = _ref18.multiple, env = _ref18.env, cards = _ref18.cards;
                if (!tagline) return;
                var text = renderContent(multiple && getButtonConfig(label, "dualTag") || getButtonConfig(label, "tag"), {
                    locale: locale,
                    color: color,
                    env: env,
                    cards: cards
                });
                if (!text) return;
                var tagColor = getButtonConfig(label, "tagLineColors")[color];
                return jsxToHTML("div", {
                    class: CLASS.TAGLINE + " " + CLASS.TAGLINE_COLOR + "-" + tagColor
                }, text);
            }({
                label: label,
                tagline: tagline,
                color: color,
                locale: locale,
                multiple: multiple,
                env: env,
                cards: cards
            }), fundingiconNode = function(_ref12) {
                var cards = _ref12.cards, fundingicons = _ref12.fundingicons, size = _ref12.size, layout = _ref12.layout;
                if (!fundingicons) return;
                return jsxToHTML("div", {
                    class: "" + CLASS.FUNDINGICONS
                }, renderCards({
                    cards: cards,
                    button: !0,
                    size: size,
                    layout: layout
                }));
            }({
                cards: cards,
                fundingicons: fundingicons,
                size: size,
                layout: layout
            }), styleNode = function(_ref19) {
                var height = _ref19.height, cardNumber = _ref19.cardNumber;
                return jsxToHTML("style", {
                    innerHTML: componentStyle({
                        height: height,
                        cardNumber: cardNumber
                    })
                });
            }({
                height: height,
                cardNumber: cards.length
            }), scriptNode = (script = getComponentScript().toString(), jsxToHTML("script", {
                innerHTML: "(" + (script = script.replace(/\{\s*CLASS\.([A-Z0-9_]+)\s*\}/g, function(match, name) {
                    return CLASS[name];
                })) + ")();"
            })), labelPowerByPayPal = cards.length > 0 ? function(props) {
                if (!props) return null;
                var layout = props.layout, size = props.size, _props$sources = props.sources, sources = void 0 === _props$sources ? [] : _props$sources;
                if (layout !== constants.g.VERTICAL || size !== constants.l.MEDIUM && size !== constants.l.LARGE && size !== constants.l.HUGE) return null;
                if (-1 === sources.indexOf(constants.t.CARD)) return null;
                return jsxToHTML("div", {
                    class: "powered-by-paypal",
                    style: "\n                text-align: center;\n                margin: 10px auto;\n                height: 14px;\n                font-family: PayPal-Sans, HelveticaNeue, sans-serif;\n                font-size: 11px;\n                font-weight: normal;\n                font-style: italic;\n                font-stretch: normal;\n                color: #7b8388;\n                position: relative;\n                margin-right: 3px;\n                bottom: 3px;\n            "
                }, renderContent("{ content: poweredBy }", _extends({}, props, {
                    logoColor: "blue"
                })));
            }(normalizeProps(props)) : null;
            var script;
            return jsxToHTML("div", _extends({}, (_ref21 = {}, _ref21[constants.c.VERSION] = "4.0.224", 
            _ref21), {
                class: CLASS.CONTAINER + " " + getCommonButtonClasses({
                    layout: layout,
                    shape: shape,
                    branding: branding,
                    multiple: multiple,
                    env: env
                })
            }), styleNode, buttonNodes, taglineNode || fundingiconNode, labelPowerByPayPal, scriptNode).toString();
        };
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        function getCommonButtonClasses(_ref) {
            var layout = _ref.layout, shape = _ref.shape, branding = _ref.branding, multiple = _ref.multiple, env = _ref.env;
            return [ CLASS.LAYOUT + "-" + layout, CLASS.SHAPE + "-" + shape, CLASS.BRANDING + "-" + (branding ? constants.d.BRANDED : constants.d.UNBRANDED), CLASS.NUMBER + "-" + (multiple ? constants.j.MULTIPLE : constants.j.SINGLE), CLASS.ENV + "-" + env, "" + CLASS.SHOULD_FOCUS ].join(" ");
        }
        function determineLabel(_ref3) {
            var label = _ref3.label, source = _ref3.source, multiple = _ref3.multiple, layout = _ref3.layout, defaultLabel = FUNDING_TO_DEFAULT_LABEL[source];
            return labelToFunding(label) === source ? multiple && layout === constants.g.HORIZONTAL ? defaultLabel : label : defaultLabel;
        }
        function renderCards(_ref5) {
            var cards = _ref5.cards, button = _ref5.button, layout = _ref5.layout, size = _ref5.size;
            return cards.map(function(name) {
                var _ref6, _ref7, _ref8, _ref9, _ref10, _ref11, logo = cardLogos[name];
                return jsxToHTML("div", _extends({}, ((_ref6 = {})[constants.c.LAYOUT] = layout || "", 
                _ref6), ((_ref7 = {})[constants.c.SIZE] = size || "", _ref7), ((_ref8 = {})[constants.c.BUTTON] = button || !1, 
                _ref8[constants.c.FUNDING_SOURCE] = "" + constants.t.CARD, _ref8[constants.c.CARD] = "" + name, 
                _ref8), {
                    class: (button ? CLASS.BUTTON : "") + " " + CLASS.CARD + " " + CLASS.CARD + "-" + name,
                    tabindex: "0"
                }), jsxToHTML("img", _extends({}, ((_ref9 = {})[constants.c.LAYOUT] = layout || "", 
                _ref9), ((_ref10 = {})[constants.c.SIZE] = size || "", _ref10), ((_ref11 = {})[constants.c.BUTTON] = button || !1, 
                _ref11[constants.c.FUNDING_SOURCE] = "" + constants.t.CARD, _ref11[constants.c.CARD] = "" + name, 
                _ref11), {
                    style: " display: block; ",
                    src: "data:image/svg+xml;base64," + Object(base64.btoa)(logo),
                    alt: name
                })));
            });
        }
        function renderContent(text, _ref13) {
            var template, renderers, nodes, label = _ref13.label, locale = _ref13.locale, color = _ref13.color, branding = _ref13.branding, logoColor = _ref13.logoColor, funding = _ref13.funding, env = _ref13.env, _cards = _ref13.cards, dynamicContent = _ref13.dynamicContent, layout = _ref13.layout, size = _ref13.size, isFundingThrottleEnabled = _ref13.isFundingThrottleEnabled, _content = function(locale) {
                var country = locale.country, lang = locale.lang;
                return componentContent[country][lang];
            }(locale);
            return template = text, renderers = {
                text: function(value) {
                    return jsxToHTML("span", {
                        class: "" + CLASS.TEXT
                    }, value);
                },
                logo: function(name) {
                    if (branding) {
                        if (!logoColor && !isFundingThrottleEnabled) throw new Error("Can not determine logo without logo color");
                        if (isFundingThrottleEnabled && layout !== constants.g.VERTICAL) {
                            if (label === constants.f.CREDIT && (name === constants.h.PAYPAL || name === constants.h.PP)) return;
                            if (name === constants.h.CREDIT) {
                                color = constants.e.SILVER;
                                logoColor = constants.e.BLUE;
                            }
                        }
                        var logo = "function" == typeof fundingLogos[name] ? fundingLogos[name]({
                            label: label,
                            locale: locale,
                            color: color,
                            branding: branding,
                            logoColor: logoColor,
                            funding: funding,
                            env: env,
                            cards: _cards,
                            isFundingThrottleEnabled: isFundingThrottleEnabled
                        }) : fundingLogos[name][logoColor] || fundingLogos[name][constants.i.ANY];
                        return jsxToHTML("img", {
                            class: CLASS.LOGO + " " + CLASS.LOGO + "-" + name + " " + CLASS.LOGO + "-" + color,
                            src: "data:image/svg+xml;base64," + Object(base64.btoa)(logo),
                            alt: name
                        });
                    }
                },
                content: function(name) {
                    for (var contentString = void 0, _i2 = 0, _name$split2 = name.split("|"), _length2 = null == _name$split2 ? 0 : _name$split2.length; _i2 < _length2; _i2++) {
                        var key = _name$split2[_i2];
                        if (_content[key]) {
                            contentString = _content[key];
                            break;
                        }
                    }
                    if (!(contentString = contentString && contentString.replace(/\[([a-z]+)\]/g, function(match, contentVariable) {
                        if (match && contentVariable) return dynamicContent && dynamicContent[contentVariable];
                    })) && env === constants.s.TEST) throw new Error("Could not find content " + name + " for " + locale.lang + "_" + locale.country);
                    return renderContent(contentString || "", {
                        label: label,
                        locale: locale,
                        color: color,
                        branding: branding,
                        logoColor: logoColor,
                        funding: funding,
                        env: env,
                        cards: _cards,
                        isFundingThrottleEnabled: isFundingThrottleEnabled
                    });
                },
                cards: function() {
                    if (!funding) throw new Error("Can not determine card types without funding");
                    return renderCards({
                        cards: _cards,
                        button: !1,
                        layout: layout,
                        size: size
                    });
                },
                separator: function() {
                    return jsxToHTML("span", {
                        class: CLASS.SEPARATOR
                    });
                },
                break: function(value) {
                    return jsxToHTML("span", {
                        class: "" + CLASS.TEXT
                    }, value.split("<br>")[0], jsxToHTML("br", null, value.split("<br>")[1]));
                }
            }, nodes = Object(util.d)(template, /\{\s*([a-z]+)(?::\s*([^} ]+))?\s*\}|([^${}]+)/g, function(match, type, value, text) {
                if (type) {
                    if (!renderers[type]) throw new Error("Can not render type: " + type);
                    return renderers[type](value);
                }
                return text && text.trim() && renderers.text ? /<br>/.test(text) ? renderers.break(text) : renderers.text(text) : text;
            }), new JsxHTMLNodeContainer(nodes);
        }
    },
    "./src/button/template/content.json": function(module, exports) {
        module.exports = '{\n    "AD": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "AE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        },\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        }\n    },\n    "AG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "AI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "AL": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "AM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "AN": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "AO": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "AR": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "AT": {\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "Einfach schneller und sicherer bezahlen",\n            "later_tag": "Kaufen Sie jetzt und bezahlen Sie nach und nach.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen",\n            "poweredBy": "Abgewickelt durch {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "AU": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "AW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "AZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "BA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "BB": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "BE": {\n        "en": {\n            "checkout": "Pay with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "nl": {\n            "checkout": "Betalen met {logo:pp} {logo:paypal}",\n            "safer_tag": "De veiligere en snellere manier om te betalen.",\n            "later_tag": "Koop nu. Betaal later.",\n            "pay": "Betalen met {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Nu kopen",\n            "poweredBy": "Mogelijk gemaakt door {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Le réflexe sécurité pour payer",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        }\n    },\n    "BF": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "BG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "BH": {\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "BI": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "BJ": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "BM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "BN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "BO": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "BR": {\n        "pt": {\n            "checkout": "{logo:pp} {logo:paypal} Finalizar",\n            "safer_tag": "A maneira fácil e segura de pagar.",\n            "later_tag": "Compre agora e pague depois.",\n            "pay": "Pague com {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar agora",\n            "installment": "{logo:pp} {logo:paypal}  Pagamentos<br>  parcelados",\n            "installment_period": "{logo:pp} {logo:paypal}  Pague em at\\u00e9<br>  [installmentperiod]x sem juros",\n            "poweredBy": "Com tecnologia {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "installment": "{logo:pp} {logo:paypal}  Interest free<br>  payments",\n            "installment_period": "{logo:pp} {logo:paypal}  Pay up to [installmentperiod]x<br>  without interest",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "BS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "BT": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "BW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "BY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "BZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "C2": {\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式。",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "CA": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Votre réflexe sécurité pour payer",\n            "later_tag": "Acheter. Payer plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        }\n    },\n    "CD": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "CG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "CH": {\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "Einfach schneller und sicherer bezahlen",\n            "later_tag": "Kaufen Sie jetzt und bezahlen Sie nach und nach.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen",\n            "poweredBy": "Abgewickelt durch {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Le réflexe sécurité pour payer",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "CI": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "CK": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "CL": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "CM": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "CN": {\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "CO": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "CR": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "CV": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "CY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "CZ": {\n        "cs": {\n            "checkout": "Zaplatit přes {logo:pp} {logo:paypal}",\n            "safer_tag": "Jednodušší a bezpečnější způsob placení",\n            "later_tag": "Nakupujte nyní, plaťte později.",\n            "pay": "Zaplatit přes {logo: paypal}",\n            "buynow": "Koupit ihned přes {logo:pp} {logo:paypal}",\n            "poweredBy": "Využívá službu {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "DE": {\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "Überall schnell und sicher bezahlen.",\n            "later_tag": "Jetzt bei uns bequem in Raten zahlen.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen",\n            "poweredBy": "Abgewickelt durch {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "DJ": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "DK": {\n        "da": {\n            "checkout": "{logo:pp} {logo:paypal} Betal",\n            "safer_tag": "Betal nemt og sikkert",\n            "later_tag": "Køb nu, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Køb nu",\n            "poweredBy": "Leveret af {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "DM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "DO": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "DZ": {\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "EC": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "EE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "ru": {\n            "checkout": "Оформить заказ через {logo:pp} {logo:paypal}",\n            "safer_tag": "Более безопасный и простой способ оплаты.",\n            "later_tag": "Покупайте сейчас, платите потом.",\n            "pay": "Оплатить через {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Купить сейчас",\n            "poweredBy": "Обработано {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "EG": {\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "ER": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "ES": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Tecnología de {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "ET": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "FI": {\n        "fi": {\n            "checkout": "{logo:pp} {logo:paypal}-maksu",\n            "safer_tag": "Turvallisempi ja helpompi maksutapa",\n            "later_tag": "Osta nyt. Maksa vähitellen.",\n            "pay": "{logo:paypal}-maksu",\n            "buynow": "{logo:pp} {logo:paypal} Osta nyt",\n            "poweredBy": "Palvelun tarjoaa {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "FJ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "FK": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "FM": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "FO": {\n        "da": {\n            "checkout": "Betal med {logo:pp} {logo:paypal}",\n            "safer_tag": "Betal nemt og sikkert",\n            "later_tag": "Køb nu, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Køb nu",\n            "poweredBy": "Leveret af {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "FR": {\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Pay",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "GA": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GB": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "GD": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GL": {\n        "da": {\n            "checkout": "Betal med {logo:pp} {logo:paypal}",\n            "safer_tag": "Betal nemt og sikkert",\n            "later_tag": "Køb nu, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Køb nu",\n            "poweredBy": "Leveret af {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GN": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GP": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GR": {\n        "el": {\n            "checkout": "Ολοκλήρωση αγοράς μέσω {logo:pp} {logo:paypal}",\n            "safer_tag": "Ο ασφαλέστερος και ευκολότερος τρόπος πληρωμής",\n            "later_tag": "Αγοράστε τώρα.  Πληρώστε σε δόσεις.",\n            "pay": "Πληρωμή μέσω {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Αγορά τώρα",\n            "poweredBy": "Με την υποστήριξη του {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GT": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "GY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "HK": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal} 結帳",\n            "safer_tag": "更安全、更方便的付款方式",\n            "later_tag": "先購買，後付款。",\n            "pay": "使用 {logo:paypal} 付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即買",\n            "poweredBy": "支援方： {logo:paypal}"\n        }\n    },\n    "HN": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "HR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "HU": {\n        "hu": {\n            "checkout": "{logo:pp} {logo:paypal}-fizetés",\n            "safer_tag": "Biztonságosabb, könnyebb fizetési mód.",\n            "later_tag": "Vásároljon most. Fizessen később.",\n            "pay": "{logo:paypal}-fizetés",\n            "buynow": "{logo:pp} {logo:paypal} Vásárlás",\n            "poweredBy": "Üzemeltető: {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "ID": {\n        "id": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "Cara yang lebih mudah dan aman untuk membayar.",\n            "later_tag": "Beli Sekarang. Bayar dalam Jangka Waktu Tertentu.",\n            "pay": "Bayar dengan {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Beli Sekarang",\n            "poweredBy": "Ditunjang teknologi {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "IE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "IL": {\n        "he": {\n            "checkout": "{logo:pp} {logo:paypal} שלם",\n            "safer_tag": ".הדרך הקלה והבטוחה יותר לשלם",\n            "later_tag": "קנה עכשיו. שלם לאורך זמן.",\n            "pay": "שלם באמצעות {logo:paypal}‏",\n            "buynow": "{logo:pp} {logo:paypal} קנה עכשיו",\n            "poweredBy": "מופעל על-ידי {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "IN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "IS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "IT": {\n        "it": {\n            "checkout": "{logo:pp} {logo:paypal} Paga adesso",\n            "safer_tag": "Il modo rapido e sicuro per pagare",\n            "later_tag": "Acquista ora. Paga più tardi.",\n            "pay": "Paga con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Paga adesso",\n            "poweredBy": "Con tecnologia {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "JM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "JO": {\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "JP": {\n        "ja": {\n            "checkout": "{logo:pp} {logo:paypal}で支払う",\n            "safer_tag": "より安全・簡単にお支払い",\n            "later_tag": "今すぐ購入して、分割してお支払い。",\n            "pay": "{logo:paypal}で支払う",\n            "buynow": "{logo:pp} {logo:paypal} 購入",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "KE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "KG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "KH": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "KI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "KM": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "KN": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "KR": {\n        "ko": {\n            "checkout": "{logo:pp} {logo:paypal} 체크 아웃",\n            "safer_tag": "더 안전하고 빠른 결제 방법",\n            "later_tag": "지금 구매하고 천천히 결제하세요.",\n            "pay": "{logo:paypal}로 지불하기",\n            "buynow": "{logo:pp} {logo:paypal} 바로 구매",\n            "poweredBy": "제공: {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "KW": {\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "KY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "KZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "LA": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "LC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "LI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "LK": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "LS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "LT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "ru": {\n            "checkout": "Оформить заказ через {logo:pp} {logo:paypal}",\n            "safer_tag": "Более безопасный и простой способ оплаты.",\n            "later_tag": "Покупайте сейчас, платите потом.",\n            "pay": "Оплатить через {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Купить сейчас",\n            "poweredBy": "Обработано {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "LU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "Einfach schneller und sicherer bezahlen",\n            "later_tag": "Kaufen Sie jetzt und bezahlen Sie nach und nach.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen",\n            "poweredBy": "Abgewickelt durch {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "LV": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "ru": {\n            "checkout": "Оформить заказ через {logo:pp} {logo:paypal}",\n            "safer_tag": "Более безопасный и простой способ оплаты.",\n            "later_tag": "Покупайте сейчас, платите потом.",\n            "pay": "Оплатить через {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Купить сейчас",\n            "poweredBy": "Обработано {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "MA": {\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "MC": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "MD": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "ME": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "MG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "MH": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "MK": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "ML": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "MN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "MQ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "MR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "MS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "MT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "MU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "MV": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "MW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "MX": {\n        "es": {\n            "checkout": "Pagar con {logo:pp} {logo:paypal}",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "installment": "{logo:pp} {logo:paypal}  Pagos en<br>  mensualidades",\n            "installment_period": "{logo:pp} {logo:paypal}  Pague hasta en<br>  [installmentperiod] mensualidades",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "installment": "{logo:pp} {logo:paypal}  Interest free<br>  payments",\n            "installment_period": "{logo:pp} {logo:paypal}  Pay up to [installmentperiod]x<br>  without interest",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "MY": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "MZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "NA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "NC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "NE": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "NF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "NG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "NI": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "NL": {\n        "nl": {\n            "checkout": "{logo:pp} {logo:paypal} Betalen",\n            "safer_tag": "Een veilige en makkelijke manier om te betalen.",\n            "later_tag": "Koop nu. Betaal later.",\n            "pay": "Betalen met {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Nu kopen",\n            "poweredBy": "Mogelijk gemaakt door {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "NO": {\n        "no": {\n            "checkout": "{logo:pp} {logo:paypal} Betal",\n            "safer_tag": "En trygg og enkel betalingsmetode",\n            "later_tag": "Kjøp nå, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Kjøp nå",\n            "poweredBy": "Leveres av {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "NP": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "NR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "NU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "NZ": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Un réflexe sécurité.",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar.",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式。",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "OM": {\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "PA": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "PE": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "PF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "PG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "PH": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "PL": {\n        "pl": {\n            "checkout": "{logo:pp} {logo:paypal} Do kasy",\n            "safer_tag": "Płać wygodnie i bezpiecznie",\n            "later_tag": "Kup teraz. Płać w ratach",\n            "pay": "Zapłać z {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Kup teraz",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "PM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "PN": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "PT": {\n        "pt": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A forma rápida e segura de pagar",\n            "later_tag": "Compre agora. Vá pagando.",\n            "pay": "Pagar com {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar agora",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "PW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "PY": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "QA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        },\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        }\n    },\n    "RE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "RO": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "RS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "RU": {\n        "ru": {\n            "checkout": "{logo:pp} {logo:paypal} Оформить покупку",\n            "safer_tag": "Более безопасный и простой способ оплаты.",\n            "later_tag": "Покупайте сейчас, платите потом.",\n            "pay": "Оплатить через {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Купить сейчас",\n            "poweredBy": "Обработано {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "RW": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SA": {\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SB": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SC": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SE": {\n        "sv": {\n            "checkout": "{logo:pp} {logo:paypal} Betala",\n            "safer_tag": "Ett tryggt och smidigt sätt att betala",\n            "later_tag": "Köp nu, betala senare",\n            "pay": "Betala med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Köp nu",\n            "poweredBy": "Tillhandahålls av {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "SG": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "SH": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SJ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SK": {\n        "sk": {\n            "checkout": "Zaplatiť cez {logo:pp} {logo:paypal}",\n            "safer_tag": "Jednoduchší a bezpečnejší spôsob platby",\n            "later_tag": "Nakúpte teraz, zaplaťte postupne",\n            "pay": "Zaplatiť cez {logo: paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Kúpiť",\n            "poweredBy": "Používa technológiu {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SL": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SN": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SO": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "ST": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SV": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "SZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "TC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "TD": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "TG": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "TH": {\n        "th": {\n            "checkout": "{logo:pp} {logo:paypal} ชำระเงิน",\n            "safer_tag": "วิธีชำระเงินที่ปลอดภัยและง่ายกว่า",\n            "later_tag": "ซื้อวันนี้ แล้วค่อยๆ จ่ายทีหลัง",\n            "pay": "ชำระเงินด้วย {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} ซื้อทันที",\n            "poweredBy": "ให้บริการโดย {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "TJ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "TM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "TN": {\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "TO": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "TR": {\n        "tr": {\n            "checkout": "{logo:pp} {logo:paypal} ile Satın Alın",\n            "safer_tag": "Ödeme yapmanın daha güvenli ve kolay yolu",\n            "later_tag": "Şimdi Alın. Daha Sonra Ödeyin.",\n            "pay": "{logo:paypal} ile Öde",\n            "buynow": "{logo:pp} {logo:paypal} Hemen Satın Alın",\n            "poweredBy": "Çalıştıran {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "TT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "TV": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "TW": {\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal} 結帳",\n            "safer_tag": "更安全、更方便的付款方式",\n            "later_tag": "先購買，後付款。",\n            "pay": "使用 {logo:paypal} 付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即購",\n            "poweredBy": "服務提供者： {logo:paypal}"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "TZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "UA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "ru": {\n            "checkout": "Оформить заказ через {logo:pp} {logo:paypal}",\n            "safer_tag": "Более безопасный и простой способ оплаты.",\n            "later_tag": "Покупайте сейчас, платите потом.",\n            "pay": "Оплатить через {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Купить сейчас",\n            "poweredBy": "Обработано {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "UG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "US": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "dual_tag": "Two easy ways to pay",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "Pagar con {logo:pp} {logo:paypal}",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "使用{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "UY": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "VA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "VC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "VE": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "VG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "VN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "VU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "WF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "WS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    },\n    "YE": {\n        "ar": {\n            "checkout": "السداد بواسطة {logo:pp} {logo:paypal}",\n            "safer_tag": "الطريقة الأسهل والأكثر أماناً في الدفع",\n            "later_tag": "اشترِ الآن، وسدّد على دفعات",\n            "pay": "دفع بواسطة {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} شراء الآن",\n            "poweredBy": "مدعوم من {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "YT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "ZA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "ZM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre réflexe sécurité pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter",\n            "poweredBy": "Optimisé par {logo:paypal}"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma rápida y segura de pagar",\n            "later_tag": "Compre ahora y pague más adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "poweredBy": "Desarrollado por {logo:paypal}"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}结账",\n            "safer_tag": "更安全、更便捷的付款方式",\n            "later_tag": "立即购买，分期付款。",\n            "pay": "用{logo:paypal}付款",\n            "buynow": "{logo:pp} {logo:paypal} 立即购买",\n            "poweredBy": "技术支持提供方： {logo:paypal}"\n        }\n    },\n    "ZW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "poweredBy": "Powered by {logo:paypal}"\n        }\n    }\n}\n';
    },
    "./src/config/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var _checkoutUris, _altpayUris, _guestUris, _billingUris, _buttonUris, _inlinedCardFieldUris, _postBridgeUris, _legacyCheckoutUris, _buttonJSUrls, _locales, constants = __webpack_require__("./src/constants/index.js"), config = {
            scriptUrl: "//www.paypalobjects.com/api/checkout.button.render.js",
            paypal_domain_regex: /^(https?|mock):\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/,
            version: "4.0.224",
            cors: !0,
            env: constants.s.PRODUCTION,
            state: "checkoutjs",
            locale: {
                country: constants.q.US,
                lang: constants.v.EN
            },
            stage: "msmaster",
            stageDomain: "qa.paypal.com",
            get stageUrl() {
                return config.stage + "." + config.stageDomain;
            },
            get apiStageUrl() {
                return config.apiStage + "." + config.stageDomain;
            },
            merchantID: "",
            logLevel: "warn",
            throttles: {
                v4_mobile_device: 0
            },
            domain_settings: {
                "walmart.com": {
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
                },
                "williams-sonoma.com": {
                    disable_venmo: !0
                },
                "westelm.com": {
                    disable_venmo: !0
                },
                "markandgraham.com": {
                    disable_venmo: !0
                },
                "potterybarn.com": {
                    disable_venmo: !0
                },
                "potterybarnkids.com": {
                    disable_venmo: !0
                },
                "pbteen.com": {
                    disable_venmo: !0
                },
                "beallsflorida.com": {
                    disable_venmo: !0
                },
                "therealreal.com": {
                    disable_venmo: !0
                },
                "liveaquaria.com": {
                    disable_venmo: !0
                },
                "drsfostersmith.com": {
                    disable_venmo: !0
                },
                "boxed.com": {
                    disable_venmo: !0
                },
                "bevisible.com": {
                    disable_venmo: !0
                },
                "moeller.org": {
                    disable_venmo: !0
                },
                "searshometownstores.com": {
                    disable_venmo: !0
                },
                "searshardwarestores.com": {
                    disable_venmo: !0
                },
                "searshomeapplianceshowroom.com": {
                    disable_venmo: !0
                },
                "barkshop.com": {
                    disable_venmo: !0
                },
                "vividseats.com": {
                    disable_venmo: !0
                },
                "getcargo.today": {
                    disable_venmo: !0
                },
                "smartdestinations.com": {
                    disable_venmo: !0
                },
                "philadelphiapass.com": {
                    disable_venmo: !0
                },
                "thesydneypass.com": {
                    disable_venmo: !0
                },
                "3secondlash.com": {
                    disable_venmo: !0
                },
                "newyorkpass.com": {
                    disable_venmo: !0
                },
                "dndbeyond.com": {
                    disable_venmo: !0
                },
                "app.zapbuy.it": {
                    disable_venmo: !0
                },
                "gamersaloon.com": {
                    disable_venmo: !0
                },
                "1800contacts.com": {
                    disable_venmo: !0
                },
                "shopchatters.ca": {
                    disable_venmo: !0
                },
                "shopguyswin.ca": {
                    disable_venmo: !0
                },
                "jjill.com": {
                    disable_venmo: !0
                },
                "qvc.com": {
                    disable_venmo: !0
                },
                "stelladot.com": {
                    disable_venmo: !0
                },
                "keepcollective.com": {
                    disable_venmo: !0
                },
                "everskin.com": {
                    disable_venmo: !0
                },
                "zulily.com": {
                    disable_venmo: !0
                },
                "freshly.com": {
                    disable_venmo: !0
                },
                "buypeticare.com": {
                    disable_venmo: !0
                },
                "getownzone.com": {
                    disable_venmo: !0
                }
            },
            creditTestDomains: [ "bluesuncorp.co.uk", "nationsphotolab.com", "plexusworldwide.com", "nshss.org", "bissell.com", "mobstub.com", "vuoriclothing.com", "tape4backup.com", "avivamiento.com", "rhododendron.org", "whiterabbitjapan.com", "atsracing.net", "thehilltopgallery.com", "weedtraqr.com", "worldpantry.com", "ciraconnect.com", "mymalls.com", "prowinch.com", "zodiacpoolsystems.com", "everlywell.com", "candlewarmers.com", "chop.edu", "incruises.com", "flikn.com", "didforsale.com", "mcc.org", "sygu.net", "merchbar.com", "eduinconline.com", "us.livebetterwith.com", "bakemeawish.com", "judolaunch.com", "eventcartel.com", "tapatalk.com", "telescope.com", "covenant.edu", "aquatruwater.com", "spingo.com", "usu.edu", "getcelerity.com", "brandless.com", "saberigniter.com", "euromodeltrains.com", "gofasttrader.com", "megamodzplanet.com", "draftanalyzer.com", "lovewithoutboundaries.com", "filterpop.com", "seekverify.com", "photoandgo.com", "sightseeingpass.com", "bigoanddukes.com", "thethirstyduck.com", "thebrushguys.com", "907delivery.com", "mauisails.com", "drive.net", "channelmax.net", "modernrebelco.com", "enchanteddiamonds.com", "ibabbleon.com", "fullgenomes.com", "conn-comp.com", "wingware.com", "paradigmgoods.com", "theneptunegroup.com", "kidzartworks.com", "unirealm.com", "ncfarmsinc.com", "oneofakindantiques.com", "servers4less.com", "stumpthespread.com", "marketwagon.com", "monsterhouseplans.com", "canterburychoral.org", "teacupnordic.org", "thethirstyduck.com", "medialoot.com", "theartistunion.com", "yourglamourzone.com", "breckstables.com", "mackephotography.com", "dsaj.org", "massluminosity.com", "tespa.org", "versatilearts.net", "yecup.org", "divinebusinessmanagement.com", "captivatebeautyservices.com", "class4me.com", "wcsonlineuniversity.com", "pvplive.com", "kyneteks.com", "rare-paper.com", "bpg.bpgsim.biz", "geodegallery.com", "way.com", "kringle.com", "talentedmrsalas.ph", "litcharts.com", "purpletreephotography.com", "apache.org", "neopackage.com", "globaldance.tv", "integral.studio", "airdoctorpro.com", "ivoryandiron.com", "yuengling.com", "averysbranchfarms.com", "amberreinink.com", "skinnymechocolate.com", "bmbl.net", "ncwatercolor.net", "astrograph.com", "localadventures.mx", "ripcurl.com", "worldfootbrakechallenge.com", "shespeakssales.com", "obrienguitars.com", "jadenikkolephoto.com", "americavoice.com", "cassiexie.com", "aamastateconvention.org", "rellesflorist.com", "passionnobby.com", "bodybyheidi.com", "roqos.com", "prijector.com", "maryswanson.net", "tsghobbies.com", "erinlaytonphotography.com", "darter.org", "fountainpenhospital.com", "myzestfullife.com", "pcog.org", "alisabethdesigns.com", "katiemathisphoto.com", "strictlybellaphotography.com", "maptools.com", "sites.google.com", "gallerr.com", "southfloridatrikke.com", "caviar.tv", "mintingmasters.com", "prospectorsguild.com", "inktale.com", "prettygirlgoods.com", "laceycahill.com", "daniellenowak.com", "t212.org", "scmsinc.com", "babypaloozanc.com", "tetrisonline.com", "grdd.net", "cdspg.info", "airshipapparel.com", "waft.com", "extendpets.com", "supplyhub.com", "hlbsusa.com", "jaderollerbeauty.com", "theparentingjunkie.com", "schagringas.com", "yourscribemate.com", "sportscollectibles.com", "thedivinenoise.com", "hometeamsonline.com", "trademarkpress.com", "destinationenglish.us", "jacquesflowers.com", "aliszhatchphotography.com", "rusticfoundry.com", "ahhhmassage.net", "frezzor.com", "mandelininc.com", "kayleejackson.com", "monkinstitute.org", "eddiebsbbq.com", "morningstarmediaservices.com", "kinevative.com", "orivet.com", "digitalprinthouse.net", "dynamicgenius.com", "allpartsusa.com", "flowersbydavid.net", "nwvoices.org", "leaptrade.com", "tulsaschoolpics.com", "alioth.io", "windowflair.com", "vitcom.net", "simplybeautifulfashions.com", "christinabenton.com", "fromthedaughter.com", "hometowngraphics.net", "fibanalysis.com", "creativejobscentral.com", "sandbox.gg", "jt-digitalmedia.com", "kodable.com", "birthingstone.com", "taranicholephoto.com", "hillyfieldsflorist.com", "charitynoelphoto.com", "auxdelicesfoods.com", "terilynnphotography.com", "folieadeuxevents.com", "karensfloral.com", "montgomerydiveclub.com", "rainbowplastics.com", "confettionthedancefloor.com", "vomozmedia.com", "neatmod.com", "getnaturafled.com", "callingpost.com", "iamfamily.org", "pedigreeonline.com", "typeboost.io", "in-n-outpetdoor.com", "nerdstockgc.com", "keiadmin.com", "createdbykaui.com", "aikophoto.com", "lonestar.ink", "stlfurs.com", "treasurelistings.com", "thecubicle.us", "redclaypaper.com", "blushhousemedia.com", "documentsanddesigns.com", "whitneyleighphotography.shootproof.com", "amaryllisday.com", "hermanproav.com", "felicemedia.com", "withloveplacenta.com", "store.brgadgets.co", "klowephoto.com", "spenceraustinconsulting.com", "sno-eagles.org", "dsatallahassee.org", "bakupages.com", "neswc.com", "josiebrooksphotography.com", "brisksale.com", "legalwhoosh.com", "jasmineeaster.com", "swatstudios.com", "facebook.com", "shakershell.com", "alexiswinslow.com", "mixeddimensions.com", "sweetpproductions.com", "lbeaphotography.com", "otlseatfillers.com", "jdtickets.com", "catholicar.com", "masque.com", "smalltownstudio.net", "goherbalife.com", "itzyourz.com", "magazinespeedloader.com", "dreammachines.io", "dallasdieteticalliance.org", "http:", "medair.org", "unbridledambition.com", "sarasprints.com", "wiperecord.com", "showmyrabbit.com", "cctrendsshop.com", "rachelalessandra.com", "otherworld-apothecary.com", "melissaannphoto.com", "girlceo.co", "seasidemexico.com", "telosid.com", "instin.com", "marinecorpsmustang.org", "lancityconnect.com", "hps1.org", "karenware.com", "livecurriculum.com", "spellingstars.com", "vektorfootball.com", "zaltv.com", "nebraskamayflower.org", "ethiopianspices.com", "immitranslate.com", "rafaelmagic.com.com", "bahc1.org", "newenamel.com", "bhchp.org", "buybulkamerica.com", "sourcepoint.com", "squarestripsports.com", "wix.com", "wilderootsphotography.com", "goodsalt.com", "systemongrid.com", "designmil.org", "freshtrendhq.com", "valisimofashions.com", "buyneatly.com", "getbeauty.us", "intellimidia.com" ],
            bmlCreditTest: {
                domains: [ "fashionsandthings.com", "medicinal-herb-store.commercehq.com", "medicinalherbstore.com", "yuengling.com", "store14454605.ecwid.com", "moonpod.co", "wbbarber.com", "gadgetblu.com", "gadgetblu.com", "gadgetblu.commercehq.com", "taffytown.com", "elderwoodacademy.com", "twistedroad.com", "personalaircooler.com", "billsienkiewiczart.com", "harmagh.com", "astrograph.com", "astrograph.com", "vktrygear.com", "vktrygear.com", "shalomhealthservices.com", "longhairprettynails.com", "thundrbro.com", "yiiree.com", "yiiree.com", "daltechforce.com", "in.xero.com", "30dollargunbelt.com", "theteachertote.com", "blanktag.co", "jlaruecosmetics.com", "esther-williams.com", "ginalli.com", "orientwatchusa.com", "tbichips.com", "trendjungle.store", "freerangeamerican.us", "simpleandblush.com", "thetrendyvibe.com", "wobies.com", "unknownunicorn.com", "postmygaragesale.com", "gsalr.com", "yardsalesearch.com", "yardsales.net", "gsalr.ca", "garagesalefinder.com", "garagesalestracker.com", "shoptheladiesedge.com", "studyacer.com", "wodndone.com", "cabking.com", "tumble-bee.com", "inlandcraft.com", "hitechdiamond.com", "barcharts.com", "shopsecurelynow.com", "xinnora.commercehq.com", "cosmetictattoosupply.com", "fazeclan.com", "mamabearlegalforms.com", "mamabearlegalforms.com", "ec2-18-191-156-187.us-east-2.compute.amazonaws.com", "summit-hydraulics.com", "full-time-purpose.mykajabi.com", "nopestz.com", "lifehacksco.com", "app.catholicsingles.com", "paulamaxjewelry.com", "sadiesstickers.com", "boomkool.com", "oy-l.com", "m.musely.com", "missamericamag.com", "healthtestingcenters.com", "grab.getcargo.today", "app.getcargo.today", "longlosttees.com", "premiertrendsco.com", "photoshopcafe.com", "dragonhoardyarnco.com", "nickschips.com", "supplyhub.com", "supplyhub.com", "roomify.com", "iq-tester.org", "aa3035c6.ngrok.io", "qlive.divyamherbalcare.com", "iq-testing.me", "iq-tester.org", "60e9fcb8.ngrok.io", "9abde3c3.ngrok.io", "equinat-usa.com", "bellaellaboutique.com", "szul.com", "goodsvine.com", "whiplashdeals.com", "dino-deals.com", "mikimike.com", "geninterlock.com", "nostalgiastyles.com", "thevaultbysacha.com", "theshoptucson.com", "wristbandbros.com", "mike.outlinedepot.com", "outlinedepot.com", "outlinedepot.com", "rmadefense.com", "colorclub.com", "topicaledge.com", "fitnessqueen.co", "vivacoast.co", "thriveisland.co", "vitalityscience.com", "rawpawspetfood.com", "bark.us", "inglenookfibers.com", "psychicsource.com", "illusionsystems.com", "direct.darkhorse.com", "sparksunny.com", "cratetrendy.com", "snobbculture.com", "passionnobby.com", "passionnobby.com", "purehempshop.com", "clipdraw.com", "firevapor.com", "dev.parklanejewelry.com", "parklanejewelry.com", "lucylubaby.com", "motoskiveez.com", "suttonsboutique.com", "dealsaverstore.com", "midwestwheelandtire.com", "relationshiphero.com", "gentlemenhood.com", "modrnpad.com", "puertoricofactory.com", "recordsnv.com", "chicagocopshop.com", "spingo.com", "thebohojane.com", "crazycoolcustomtees.com", "hoodedwarrior.commercehq.com", "hoodedwarrior.com", "death-saves.com", "posterprintshop.com", "gabrielcosmeticsinc.com", "mountainamericajerky.com", "theskirtsociety.com", "austinaquafarms.com", "diedinhouse.com", "lilipubsorders.com", "rcegs.qnryj.servertrust.com", "k12schoolsupplies.net", "houstonhotels.org", "divinebazaar.deals", "thedivinebazaar.com", "cloutcar.tel", "superplastic.co", "janky.backerkit.com", "indianapolis.marketwagon.com", "fortwayne.marketwagon.com", "michiana.marketwagon.com", "evansville.marketwagon.com", "lovevibescrystals.com", "aluminyze.pro", "aluminyze.com", "abdlcompany.com", "ddlgboutique.com", "abdltoys.com", "inktale.com", "nationalhighwaysafetyadministration.com", "propellerdepot.com", "admin.billoreilly.com", "billoreilly.com", "2bsilent.mykajabi.com", "database.castingfrontier.com", "fishandcountry.com", "register.realestatewealthexpo.com", "shoplabeye.com", "lagoldleafus.com", "oldmercs.com", "codynolove.com", "loveonestore.com", "megtronix.com", "computermallshop.com", "gallerr.com", "squishiecats.com", "woopwoo.com", "socksery.com", "ossom.co", "chibi-kingdom.com", "oddlyhomey.com", "es.postermywall.com", "fr.postermywall.com", "pt.postermywall.com", "de.postermywall.com", "nl.postermywall.com", "postermywall.com", "it.postermywall.com", "edashdeals.com", "edashdeals.com", "edashdeals.commercehq.com", "kensingtonproducts.com", "spartanutrition.com", "biovape.co", "unicornclub.us", "livebetterwith.com", "homedna.com", "lightsplanneraction.co", "stickandpoketattookit.com", "pepperhead.com", "stage.crazyhotseeds.com", "ca.bathmatedirect.com", "fi.bathmatedirect.com", "au.bathmatedirect.com", "bathmatedirect.com", "eu.bathmatedirect.com", "nl.bathmatedirect.com", "il.bathmatedirect.com", "int.bathmatedirect.com", "bathmatedirect.com", "is.bathmatedirect.com", "sandmbikes.com", "fitbikeco.com", "magician.org", "skinnymechocolate.com", "elimidrol.com", "fender.com", "israelbiblecenter.com", "cookinpellets.com", "jbsperformance.com", "beverly21.com", "lemonsareblue.com", "cessere.com", "getchoosy.com", "widgetwingman.com", "snottytots.com", "app.willing.com", "theprettyhotmess.com", "egg-baby.com", "viral-click.com", "lizpearls.com", "pupnpaws.com", "tagusup.com", "m.pupnpaws.com", "hashtagme.conversionlab.online", "orlandobrewing.com", "thinksummer.shop", "libmaneducation.com", "mypetprints.co", "leftcoastvibesco.com", "immitranslate.com", "thesocceremporium.com", "giantloopmoto.com", "5oclocksomewherestore.com", "powertoolreplacementparts.com", "thelashprofessional.com", "flashstealsonline.com", "countrykitchensa.com", "prepagent.com", "shineon.com", "bravabuona.com", "bravabuona.com", "draftanalyzer.com", "draftanalyzer.com", "flagstoreusa.com", "youthfootballonline.com", "astromart.com", "astromart.com", "campchesterfield.net", "underdoggames.com", "walletsguy.com", "walletsguy.com", "walletsguy.commercehq.com", "rinsekit.com", "amplifylive.co", "usologytrends.com", "bluecollarbobbers.com", "roddersjournal.com", "nightfallclothing.com", "krakendesignco.com", "jdhirondesigns.com", "secure.cml.oeconnection.com" ]
            },
            customCountry: !1,
            SUPPORTED_BROWSERS: {
                msie: "11",
                firefox: "30",
                chrome: "27",
                safari: "7",
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
                return (_ref = {})[constants.s.LOCAL] = "http://localhost.paypal.com:" + config.ports.default, 
                _ref[constants.s.STAGE] = "https://www." + config.stageUrl, _ref[constants.s.SANDBOX] = "https://www.sandbox.paypal.com", 
                _ref[constants.s.PRODUCTION] = "https://www.paypal.com", _ref[constants.s.TEST] = window.location.protocol + "//" + window.location.host, 
                _ref[constants.s.DEMO] = window.location.protocol + "//localhost.paypal.com:" + window.location.port, 
                _ref;
            },
            get paypalDomains() {
                var _ref2;
                return (_ref2 = {})[constants.s.LOCAL] = "http://localhost.paypal.com:" + config.ports.default, 
                _ref2[constants.s.STAGE] = "https://www." + config.stageUrl, _ref2[constants.s.SANDBOX] = "https://www.sandbox.paypal.com", 
                _ref2[constants.s.PRODUCTION] = "https://www.paypal.com", _ref2[constants.s.TEST] = "mock://www.paypal.com", 
                _ref2[constants.s.DEMO] = window.location.protocol + "//localhost.paypal.com:" + window.location.port, 
                _ref2;
            },
            get wwwApiUrls() {
                var _ref3;
                return (_ref3 = {})[constants.s.LOCAL] = "https://www." + config.stageUrl, _ref3[constants.s.STAGE] = "https://www." + config.stageUrl, 
                _ref3[constants.s.SANDBOX] = "https://www.sandbox.paypal.com", _ref3[constants.s.PRODUCTION] = "https://www.paypal.com", 
                _ref3[constants.s.TEST] = window.location.protocol + "//" + window.location.host, 
                _ref3;
            },
            get corsApiUrls() {
                var _ref4;
                return (_ref4 = {})[constants.s.LOCAL] = "https://" + config.apiStageUrl + ":12326", 
                _ref4[constants.s.STAGE] = "https://" + config.apiStageUrl + ":12326", _ref4[constants.s.SANDBOX] = "https://cors.api.sandbox.paypal.com", 
                _ref4[constants.s.PRODUCTION] = "https://cors.api.paypal.com", _ref4[constants.s.TEST] = window.location.protocol + "//" + window.location.host, 
                _ref4;
            },
            get apiUrls() {
                var _ref5, domain = window.location.protocol + "//" + window.location.host, corsApiUrls = config.corsApiUrls, wwwApiUrls = config.wwwApiUrls;
                return (_ref5 = {})[constants.s.LOCAL] = domain === wwwApiUrls.local ? wwwApiUrls.local : corsApiUrls.local, 
                _ref5[constants.s.STAGE] = domain === wwwApiUrls.stage ? wwwApiUrls.stage : corsApiUrls.stage, 
                _ref5[constants.s.SANDBOX] = domain === wwwApiUrls.sandbox ? wwwApiUrls.sandbox : corsApiUrls.sandbox, 
                _ref5[constants.s.PRODUCTION] = domain === wwwApiUrls.production ? wwwApiUrls.production : corsApiUrls.production, 
                _ref5[constants.s.TEST] = domain === wwwApiUrls.test ? wwwApiUrls.test : corsApiUrls.test, 
                _ref5;
            },
            checkoutUris: (_checkoutUris = {}, _checkoutUris[constants.s.LOCAL] = "/webapps/hermes?ul=0", 
            _checkoutUris[constants.s.STAGE] = "/webapps/hermes", _checkoutUris[constants.s.SANDBOX] = "/checkoutnow", 
            _checkoutUris[constants.s.PRODUCTION] = "/checkoutnow", _checkoutUris[constants.s.TEST] = "/base/test/windows/checkout/index.htm?checkouturl=true", 
            _checkoutUris[constants.s.DEMO] = "/demo/dev/checkout.htm", _checkoutUris),
            altpayUris: (_altpayUris = {}, _altpayUris[constants.s.LOCAL] = "/latinumcheckout", 
            _altpayUris[constants.s.STAGE] = "/latinumcheckout", _altpayUris[constants.s.SANDBOX] = "/latinumcheckout", 
            _altpayUris[constants.s.PRODUCTION] = "/latinumcheckout", _altpayUris[constants.s.TEST] = "/base/test/windows/checkout/index.htm?checkouturl=true", 
            _altpayUris[constants.s.DEMO] = "/demo/dev/checkout.htm", _altpayUris),
            guestUris: (_guestUris = {}, _guestUris[constants.s.LOCAL] = "/webapps/xoonboarding", 
            _guestUris[constants.s.STAGE] = "/webapps/xoonboarding", _guestUris[constants.s.SANDBOX] = "/webapps/xoonboarding", 
            _guestUris[constants.s.PRODUCTION] = "/webapps/xoonboarding", _guestUris[constants.s.TEST] = "/base/test/windows/checkout/index.htm?guesturl=true", 
            _guestUris[constants.s.DEMO] = "/demo/dev/guest.htm", _guestUris),
            billingUris: (_billingUris = {}, _billingUris[constants.s.LOCAL] = "/webapps/hermes/agreements?ul=0", 
            _billingUris[constants.s.STAGE] = "/webapps/hermes/agreements", _billingUris[constants.s.SANDBOX] = "/agreements/approve", 
            _billingUris[constants.s.PRODUCTION] = "/agreements/approve", _billingUris[constants.s.TEST] = "/base/test/windows/checkout/index.htm?billingurl=true", 
            _billingUris[constants.s.DEMO] = "/demo/dev/checkout.htm", _billingUris),
            buttonUris: (_buttonUris = {}, _buttonUris[constants.s.LOCAL] = "/webapps/hermes/button", 
            _buttonUris[constants.s.STAGE] = "/webapps/hermes/button", _buttonUris[constants.s.SANDBOX] = "/webapps/hermes/button", 
            _buttonUris[constants.s.PRODUCTION] = "/webapps/hermes/button", _buttonUris[constants.s.TEST] = "/base/test/windows/button/index.htm", 
            _buttonUris[constants.s.DEMO] = "/demo/dev/button.htm", _buttonUris),
            inlinedCardFieldUris: (_inlinedCardFieldUris = {}, _inlinedCardFieldUris[constants.s.LOCAL] = "/webapps/hermes/card-fields", 
            _inlinedCardFieldUris[constants.s.STAGE] = "/webapps/hermes/card-fields", _inlinedCardFieldUris[constants.s.SANDBOX] = "/webapps/hermes/card-fields", 
            _inlinedCardFieldUris[constants.s.PRODUCTION] = "/webapps/hermes/card-fields", _inlinedCardFieldUris[constants.s.TEST] = "/base/test/windows/card-fields/index.htm", 
            _inlinedCardFieldUris[constants.s.DEMO] = "/demo/dev/card.htm", _inlinedCardFieldUris),
            postBridgeUris: (_postBridgeUris = {}, _postBridgeUris[constants.s.LOCAL] = "/webapps/hermes/component-meta", 
            _postBridgeUris[constants.s.STAGE] = "/webapps/hermes/component-meta", _postBridgeUris[constants.s.SANDBOX] = "/webapps/hermes/component-meta", 
            _postBridgeUris[constants.s.PRODUCTION] = "/webapps/hermes/component-meta", _postBridgeUris[constants.s.TEST] = "/base/test/windows/component-meta/index.htm", 
            _postBridgeUris[constants.s.DEMO] = "/demo/dev/bridge.htm", _postBridgeUris),
            legacyCheckoutUris: (_legacyCheckoutUris = {}, _legacyCheckoutUris[constants.s.LOCAL] = "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true", 
            _legacyCheckoutUris[constants.s.STAGE] = "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true", 
            _legacyCheckoutUris[constants.s.SANDBOX] = "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true", 
            _legacyCheckoutUris[constants.s.PRODUCTION] = "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true", 
            _legacyCheckoutUris[constants.s.TEST] = "#fallback", _legacyCheckoutUris),
            buttonJSUrls: (_buttonJSUrls = {}, _buttonJSUrls[constants.s.LOCAL] = "https://www.paypalobjects.com/api/button.js", 
            _buttonJSUrls[constants.s.STAGE] = "https://www.paypalobjects.com/api/button.js", 
            _buttonJSUrls[constants.s.SANDBOX] = "https://www.paypalobjects.com/api/button.js", 
            _buttonJSUrls[constants.s.PRODUCTION] = "https://www.paypalobjects.com/api/button.js", 
            _buttonJSUrls[constants.s.TEST] = "/base/test/lib/button.js", _buttonJSUrls[constants.s.DEMO] = "https://www.paypalobjects.com/api/button.js", 
            _buttonJSUrls),
            get buttonJSUrl() {
                return config.buttonJSUrls[config.env];
            },
            loginUri: "/signin/",
            hermesLoggerUri: "/webapps/hermes/api/logger",
            loggerUri: "/xoplatform/logger/api/logger",
            loggerThrottlePercentage: 1,
            pptmUri: "/tagmanager/pptm.js",
            get postBridgeUri() {
                return config.postBridgeUris[config.env] + "?xcomponent=1";
            },
            paymentStandardUri: "/webapps/xorouter?cmd=_s-xclick",
            authApiUri: "/v1/oauth2/token",
            paymentApiUri: "/v1/payments/payment",
            orderApiUri: "/v2/checkout/orders",
            billingApiUri: "/v1/billing-agreements/agreement-tokens",
            experienceApiUri: "/v1/payment-experience/web-profiles",
            trackingApiUri: "/v1/risk/transaction-contexts",
            get checkoutUrls() {
                var _ref6, paypalUrls = config.paypalUrls;
                return (_ref6 = {})[constants.s.LOCAL] = "" + paypalUrls.local + config.checkoutUris.local.replace(":" + config.ports.default, ":" + config.ports.checkout), 
                _ref6[constants.s.STAGE] = "" + paypalUrls.stage + config.checkoutUris.stage, _ref6[constants.s.SANDBOX] = "" + paypalUrls.sandbox + config.checkoutUris.sandbox, 
                _ref6[constants.s.PRODUCTION] = "" + paypalUrls.production + config.checkoutUris.production, 
                _ref6[constants.s.TEST] = "" + paypalUrls.test + config.checkoutUris.test, _ref6[constants.s.DEMO] = "" + paypalUrls.test + config.checkoutUris.demo, 
                _ref6;
            },
            get guestUrls() {
                var _ref7, paypalUrls = config.paypalUrls;
                return (_ref7 = {})[constants.s.LOCAL] = "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.guest) + config.guestUris.local, 
                _ref7[constants.s.STAGE] = "" + paypalUrls.stage + config.guestUris.stage, _ref7[constants.s.SANDBOX] = "" + paypalUrls.sandbox + config.guestUris.sandbox, 
                _ref7[constants.s.PRODUCTION] = "" + paypalUrls.production + config.guestUris.production, 
                _ref7[constants.s.TEST] = "" + paypalUrls.test + config.guestUris.test, _ref7[constants.s.DEMO] = "" + paypalUrls.test + config.guestUris.demo, 
                _ref7;
            },
            get altpayUrls() {
                var _ref8, paypalUrls = config.paypalUrls;
                return (_ref8 = {})[constants.s.LOCAL] = "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.altpay) + config.altpayUris.local, 
                _ref8[constants.s.STAGE] = "" + paypalUrls.stage + config.altpayUris.stage, _ref8[constants.s.SANDBOX] = "" + paypalUrls.sandbox + config.altpayUris.sandbox, 
                _ref8[constants.s.PRODUCTION] = "" + paypalUrls.production + config.altpayUris.production, 
                _ref8[constants.s.TEST] = "" + paypalUrls.test + config.altpayUris.test, _ref8[constants.s.DEMO] = "" + paypalUrls.test + config.altpayUris.demo, 
                _ref8;
            },
            get billingUrls() {
                var _ref9, paypalUrls = config.paypalUrls;
                return (_ref9 = {})[constants.s.LOCAL] = "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.checkout) + config.billingUris.local, 
                _ref9[constants.s.STAGE] = "" + paypalUrls.stage + config.billingUris.stage, _ref9[constants.s.SANDBOX] = "" + paypalUrls.sandbox + config.billingUris.sandbox, 
                _ref9[constants.s.PRODUCTION] = "" + paypalUrls.production + config.billingUris.production, 
                _ref9[constants.s.TEST] = "" + paypalUrls.test + config.billingUris.test, _ref9[constants.s.DEMO] = "" + paypalUrls.test + config.billingUris.demo, 
                _ref9;
            },
            get buttonUrls() {
                var _ref10, paypalUrls = config.paypalUrls;
                return (_ref10 = {})[constants.s.LOCAL] = "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.button) + config.buttonUris.local, 
                _ref10[constants.s.STAGE] = "" + paypalUrls.stage + config.buttonUris.stage, _ref10[constants.s.SANDBOX] = "" + paypalUrls.sandbox + config.buttonUris.sandbox, 
                _ref10[constants.s.PRODUCTION] = "" + paypalUrls.production + config.buttonUris.production, 
                _ref10[constants.s.TEST] = "" + paypalUrls.test + config.buttonUris.test, _ref10[constants.s.DEMO] = "" + paypalUrls.demo + config.buttonUris.demo, 
                _ref10;
            },
            get inlinedCardFieldUrls() {
                var _ref11, paypalUrls = config.paypalUrls;
                return (_ref11 = {})[constants.s.LOCAL] = "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.button) + config.inlinedCardFieldUris.local, 
                _ref11[constants.s.STAGE] = "" + paypalUrls.stage + config.inlinedCardFieldUris.stage, 
                _ref11[constants.s.SANDBOX] = "" + paypalUrls.sandbox + config.inlinedCardFieldUris.sandbox, 
                _ref11[constants.s.PRODUCTION] = "" + paypalUrls.production + config.inlinedCardFieldUris.production, 
                _ref11[constants.s.TEST] = "" + paypalUrls.test + config.inlinedCardFieldUris.test, 
                _ref11[constants.s.DEMO] = "" + paypalUrls.demo + config.inlinedCardFieldUris.demo, 
                _ref11;
            },
            get loginUrls() {
                var _ref12, paypalUrls = config.paypalUrls;
                return (_ref12 = {})[constants.s.LOCAL] = "" + paypalUrls.stage + config.loginUri, 
                _ref12[constants.s.STAGE] = "" + paypalUrls.stage + config.loginUri, _ref12[constants.s.SANDBOX] = "" + paypalUrls.sandbox + config.loginUri, 
                _ref12[constants.s.PRODUCTION] = "" + paypalUrls.production + config.loginUri, _ref12[constants.s.TEST] = "" + paypalUrls.test + config.loginUri, 
                _ref12;
            },
            get paymentsStandardUrls() {
                var _ref13, paypalUrls = config.paypalUrls;
                return (_ref13 = {})[constants.s.LOCAL] = "" + paypalUrls.local + config.paymentStandardUri, 
                _ref13[constants.s.STAGE] = "" + paypalUrls.stage + config.paymentStandardUri, _ref13[constants.s.SANDBOX] = "" + paypalUrls.sandbox + config.paymentStandardUri, 
                _ref13[constants.s.PRODUCTION] = "" + paypalUrls.production + config.paymentStandardUri, 
                _ref13[constants.s.TEST] = "" + paypalUrls.test + config.paymentStandardUri, _ref13;
            },
            get metaFrameUrls() {
                var _ref14, paypalUrls = config.paypalUrls;
                return (_ref14 = {})[constants.s.LOCAL] = "" + paypalUrls.local + config.postBridgeUri + "&env=local", 
                _ref14[constants.s.STAGE] = "" + paypalUrls.stage + config.postBridgeUri + "&env=stage&stage=" + config.stage, 
                _ref14[constants.s.SANDBOX] = "" + paypalUrls.sandbox + config.postBridgeUri + "&env=sandbox", 
                _ref14[constants.s.PRODUCTION] = "" + paypalUrls.production + config.postBridgeUri + "&env=production", 
                _ref14[constants.s.TEST] = "" + paypalUrls.test + config.postBridgeUri + "&env=test", 
                _ref14[constants.s.DEMO] = "" + paypalUrls.demo + config.postBridgeUri + "&env=demo", 
                _ref14;
            },
            get legacyCheckoutUrls() {
                var _ref15, paypalUrls = config.paypalUrls;
                return (_ref15 = {})[constants.s.LOCAL] = "" + paypalUrls.stage + config.legacyCheckoutUris.local, 
                _ref15[constants.s.STAGE] = "" + paypalUrls.stage + config.legacyCheckoutUris.stage, 
                _ref15[constants.s.SANDBOX] = "" + paypalUrls.sandbox + config.legacyCheckoutUris.sandbox, 
                _ref15[constants.s.PRODUCTION] = "" + paypalUrls.production + config.legacyCheckoutUris.production, 
                _ref15[constants.s.TEST] = "" + paypalUrls.test + config.legacyCheckoutUris.test, 
                _ref15;
            },
            get authApiUrls() {
                var _ref16, apiUrls = config.apiUrls, authApiUri = config.authApiUri;
                return (_ref16 = {})[constants.s.LOCAL] = "" + apiUrls.local + authApiUri, _ref16[constants.s.STAGE] = "" + apiUrls.stage + authApiUri, 
                _ref16[constants.s.SANDBOX] = "" + apiUrls.sandbox + authApiUri, _ref16[constants.s.PRODUCTION] = "" + apiUrls.production + authApiUri, 
                _ref16[constants.s.TEST] = "" + apiUrls.test + authApiUri, _ref16;
            },
            get paymentApiUrls() {
                var _ref17, apiUrls = config.apiUrls, paymentApiUri = config.paymentApiUri;
                return (_ref17 = {})[constants.s.LOCAL] = "" + apiUrls.local + paymentApiUri, _ref17[constants.s.STAGE] = "" + apiUrls.stage + paymentApiUri, 
                _ref17[constants.s.SANDBOX] = "" + apiUrls.sandbox + paymentApiUri, _ref17[constants.s.PRODUCTION] = "" + apiUrls.production + paymentApiUri, 
                _ref17[constants.s.TEST] = "" + apiUrls.test + paymentApiUri, _ref17;
            },
            get orderApiUrls() {
                var _ref18, apiUrls = config.apiUrls, orderApiUri = config.orderApiUri;
                return (_ref18 = {})[constants.s.LOCAL] = "" + apiUrls.local + orderApiUri, _ref18[constants.s.STAGE] = "" + apiUrls.stage + orderApiUri, 
                _ref18[constants.s.SANDBOX] = "" + apiUrls.sandbox + orderApiUri, _ref18[constants.s.PRODUCTION] = "" + apiUrls.production + orderApiUri, 
                _ref18[constants.s.TEST] = "" + apiUrls.test + orderApiUri, _ref18;
            },
            get billingApiUrls() {
                var _ref19, apiUrls = config.apiUrls, billingApiUri = config.billingApiUri;
                return (_ref19 = {})[constants.s.LOCAL] = "" + apiUrls.local + billingApiUri, _ref19[constants.s.STAGE] = "" + apiUrls.stage + billingApiUri, 
                _ref19[constants.s.SANDBOX] = "" + apiUrls.sandbox + billingApiUri, _ref19[constants.s.PRODUCTION] = "" + apiUrls.production + billingApiUri, 
                _ref19[constants.s.TEST] = "" + apiUrls.test + billingApiUri, _ref19;
            },
            get experienceApiUrls() {
                var _ref20, apiUrls = config.apiUrls, experienceApiUri = config.experienceApiUri;
                return (_ref20 = {})[constants.s.LOCAL] = "" + apiUrls.local + experienceApiUri, 
                _ref20[constants.s.STAGE] = "" + apiUrls.stage + experienceApiUri, _ref20[constants.s.SANDBOX] = "" + apiUrls.sandbox + experienceApiUri, 
                _ref20[constants.s.PRODUCTION] = "" + apiUrls.production + experienceApiUri, _ref20[constants.s.TEST] = "" + apiUrls.test + experienceApiUri, 
                _ref20;
            },
            get trackingApiUrls() {
                var _ref21, apiUrls = config.apiUrls, trackingApiUri = config.trackingApiUri;
                return (_ref21 = {})[constants.s.LOCAL] = "" + apiUrls.local + trackingApiUri, _ref21[constants.s.STAGE] = "" + apiUrls.stage + trackingApiUri, 
                _ref21[constants.s.SANDBOX] = "" + apiUrls.sandbox + trackingApiUri, _ref21[constants.s.PRODUCTION] = "" + apiUrls.production + trackingApiUri, 
                _ref21[constants.s.TEST] = "" + apiUrls.test + trackingApiUri, _ref21;
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
                var loggerUrl = Math.random() < config.loggerThrottlePercentage ? config.loggerUri : config.hermesLoggerUri;
                return "" + config.paypalUrl + loggerUrl;
            },
            get pptmUrl() {
                return "" + (config.env === constants.s.LOCAL ? config.paypalUrls[constants.s.STAGE] : config.paypalUrl) + config.pptmUri;
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
                country: constants.q.US,
                lang: constants.v.EN
            },
            locales: (_locales = {}, _locales[constants.q.AD] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.AE] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH, constants.v.AR ], 
            _locales[constants.q.AG] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.AI] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.AL] = [ constants.v.EN ], _locales[constants.q.AM] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.AN] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.AO] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.AR] = [ constants.v.ES, constants.v.EN ], _locales[constants.q.AT] = [ constants.v.DE, constants.v.EN ], 
            _locales[constants.q.AU] = [ constants.v.EN ], _locales[constants.q.AW] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.AZ] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.BA] = [ constants.v.EN ], _locales[constants.q.BB] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.BE] = [ constants.v.EN, constants.v.NL, constants.v.FR ], _locales[constants.q.BF] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.BG] = [ constants.v.EN ], _locales[constants.q.BH] = [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.BI] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.BJ] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.BM] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.BN] = [ constants.v.EN ], _locales[constants.q.BO] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.BR] = [ constants.v.PT, constants.v.EN ], _locales[constants.q.BS] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.BT] = [ constants.v.EN ], _locales[constants.q.BW] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.BY] = [ constants.v.EN ], _locales[constants.q.BZ] = [ constants.v.EN, constants.v.ES, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.C2] = [ constants.v.ZH, constants.v.EN ], _locales[constants.q.CA] = [ constants.v.EN, constants.v.FR ], 
            _locales[constants.q.CD] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.CG] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.CH] = [ constants.v.DE, constants.v.FR, constants.v.EN ], _locales[constants.q.CI] = [ constants.v.FR, constants.v.EN ], 
            _locales[constants.q.CK] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.CL] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.CM] = [ constants.v.FR, constants.v.EN ], _locales[constants.q.CN] = [ constants.v.ZH ], 
            _locales[constants.q.CO] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.CR] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.CV] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.CY] = [ constants.v.EN ], _locales[constants.q.CZ] = [ constants.v.CS, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.DE] = [ constants.v.DE, constants.v.EN ], _locales[constants.q.DJ] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.DK] = [ constants.v.DA, constants.v.EN ], _locales[constants.q.DM] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.DO] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.DZ] = [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.EC] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.EE] = [ constants.v.EN, constants.v.RU, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.EG] = [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.ER] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.ES] = [ constants.v.ES, constants.v.EN ], _locales[constants.q.ET] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.FI] = [ constants.v.FI, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.FJ] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.FK] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.FM] = [ constants.v.EN ], _locales[constants.q.FO] = [ constants.v.DA, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.FR] = [ constants.v.FR, constants.v.EN ], _locales[constants.q.GA] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.GB] = [ constants.v.EN ], _locales[constants.q.GD] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.GE] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.GF] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.GI] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.GL] = [ constants.v.DA, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.GM] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.GN] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.GP] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.GR] = [ constants.v.EL, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.GT] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.GW] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.GY] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.HK] = [ constants.v.EN, constants.v.ZH ], _locales[constants.q.HN] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.HR] = [ constants.v.EN ], _locales[constants.q.HU] = [ constants.v.HU, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.ID] = [ constants.v.ID, constants.v.EN ], _locales[constants.q.IE] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.IL] = [ constants.v.HE, constants.v.EN ], _locales[constants.q.IN] = [ constants.v.EN ], 
            _locales[constants.q.IS] = [ constants.v.EN ], _locales[constants.q.IT] = [ constants.v.IT, constants.v.EN ], 
            _locales[constants.q.JM] = [ constants.v.EN, constants.v.ES, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.JO] = [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.JP] = [ constants.v.JA, constants.v.EN ], _locales[constants.q.KE] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.KG] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.KH] = [ constants.v.EN ], _locales[constants.q.KI] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.KM] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.KN] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.KR] = [ constants.v.KO, constants.v.EN ], _locales[constants.q.KW] = [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.KY] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.KZ] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.LA] = [ constants.v.EN ], _locales[constants.q.LC] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.LI] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.LK] = [ constants.v.EN ], _locales[constants.q.LS] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.LT] = [ constants.v.EN, constants.v.RU, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.LU] = [ constants.v.EN, constants.v.DE, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.LV] = [ constants.v.EN, constants.v.RU, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.MA] = [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.MC] = [ constants.v.FR, constants.v.EN ], _locales[constants.q.MD] = [ constants.v.EN ], 
            _locales[constants.q.ME] = [ constants.v.EN ], _locales[constants.q.MG] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.MH] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.MK] = [ constants.v.EN ], _locales[constants.q.ML] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.MN] = [ constants.v.EN ], _locales[constants.q.MQ] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.MR] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.MS] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.MT] = [ constants.v.EN ], _locales[constants.q.MU] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.MV] = [ constants.v.EN ], _locales[constants.q.MW] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.MX] = [ constants.v.ES, constants.v.EN ], _locales[constants.q.MY] = [ constants.v.EN ], 
            _locales[constants.q.MZ] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.NA] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.NC] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.NE] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.NF] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.NG] = [ constants.v.EN ], _locales[constants.q.NI] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.NL] = [ constants.v.NL, constants.v.EN ], _locales[constants.q.NO] = [ constants.v.NO, constants.v.EN ], 
            _locales[constants.q.NP] = [ constants.v.EN ], _locales[constants.q.NR] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.NU] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.NZ] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.OM] = [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.PA] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.PE] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.PF] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.PG] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.PH] = [ constants.v.EN ], _locales[constants.q.PL] = [ constants.v.PL, constants.v.EN ], 
            _locales[constants.q.PM] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.PN] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.PT] = [ constants.v.PT, constants.v.EN ], _locales[constants.q.PW] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.PY] = [ constants.v.ES, constants.v.EN ], _locales[constants.q.QA] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH, constants.v.AR ], 
            _locales[constants.q.RE] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.RO] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.RS] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.RU] = [ constants.v.RU, constants.v.EN ], _locales[constants.q.RW] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SA] = [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SB] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SC] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SE] = [ constants.v.SV, constants.v.EN ], _locales[constants.q.SG] = [ constants.v.EN ], 
            _locales[constants.q.SH] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SI] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SJ] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SK] = [ constants.v.SK, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SL] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SM] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SN] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SO] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SR] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.ST] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.SV] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.SZ] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.TC] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.TD] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.TG] = [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.TH] = [ constants.v.TH, constants.v.EN ], _locales[constants.q.TJ] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.TM] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.TN] = [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.TO] = [ constants.v.EN ], _locales[constants.q.TR] = [ constants.v.TR, constants.v.EN ], 
            _locales[constants.q.TT] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.TV] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.TW] = [ constants.v.ZH, constants.v.EN ], _locales[constants.q.TZ] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.UA] = [ constants.v.EN, constants.v.RU, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.UG] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.US] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.UY] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.VA] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.VC] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.VE] = [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ], 
            _locales[constants.q.VG] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.VN] = [ constants.v.EN ], _locales[constants.q.VU] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.WF] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.WS] = [ constants.v.EN ], _locales[constants.q.YE] = [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.YT] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.ZA] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.ZM] = [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ], 
            _locales[constants.q.ZW] = [ constants.v.EN ], _locales)
        };
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return config;
        });
    },
    "./src/constants/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var _CONTEXT_TYPE, _LANG_TO_DEFAULT_COUN, BUTTON_STYLE_OPTIONS = {
            LABEL: "label",
            SIZE: "size",
            SHAPE: "shape",
            COLOR: "color",
            LAYOUT: "layout",
            MAXBUTTONS: "maxbuttons",
            FUNDINGICONS: "fundingicons",
            BRANDING: "branding",
            TAGLINE: "tagline",
            HEIGHT: "height",
            INSTALLMENTPERIOD: "installmentperiod"
        }, BUTTON_LABEL = {
            PAYPAL: "paypal",
            CHECKOUT: "checkout",
            PAY: "pay",
            CREDIT: "credit",
            CARD: "card",
            BUYNOW: "buynow",
            INSTALLMENT: "installment",
            VENMO: "venmo",
            IDEAL: "ideal",
            ELV: "elv",
            BANCONTACT: "bancontact",
            GIROPAY: "giropay",
            SOFORT: "sofort",
            EPS: "eps",
            MYBANK: "mybank",
            P24: "p24",
            ZIMPLER: "zimpler"
        }, BUTTON_COLOR = {
            GOLD: "gold",
            BLUE: "blue",
            SILVER: "silver",
            BLACK: "black",
            DARKBLUE: "darkblue",
            WHITE: "white",
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
            ELV: "elv",
            BANCONTACT: "bancontact",
            GIROPAY: "giropay",
            SOFORT: "sofort",
            EPS: "eps",
            MYBANK: "mybank",
            P24: "p24",
            ZIMPLER: "zimpler"
        }, CHECKOUT_OVERLAY_COLOR = {
            BLACK: "black",
            WHITE: "white"
        }, FUNDING = {
            PAYPAL: "paypal",
            VENMO: "venmo",
            CREDIT: "credit",
            CARD: "card",
            IDEAL: "ideal",
            ELV: "elv",
            BANCONTACT: "bancontact",
            GIROPAY: "giropay",
            SOFORT: "sofort",
            EPS: "eps",
            MYBANK: "mybank",
            P24: "p24",
            ZIMPLER: "zimpler"
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
            NEED_OPT_IN: "The funding source needs to be allowed in funding.allowed",
            COMMIT_NOT_SET: "The funding source is not enabled when commit is not set as true"
        }, CARD_PRIORITY = [ CARD.VISA, CARD.MASTERCARD, CARD.AMEX, CARD.DISCOVER, CARD.SWITCH, CARD.MAESTRO, CARD.HIPER, CARD.ELO, CARD.JCB, CARD.CUP, CARD.COFINOGA, CARD.COFIDIS, CARD.CETELEM, CARD.CBNATIONALE ], ENV = {
            LOCAL: "local",
            STAGE: "stage",
            SANDBOX: "sandbox",
            PRODUCTION: "production",
            TEST: "test",
            DEMO: "demo"
        }, USERS = {
            ALL: "all",
            REMEMBERED: "remembered"
        }, SOURCE = {
            MANUAL: "manual",
            BUTTON_FACTORY: "button_factory"
        }, LOG_LEVEL = {
            DEBUG: "debug",
            INFO: "info",
            WARN: "warn",
            ERROR: "error"
        }, PAYMENT_TYPE = {
            EC_TOKEN: "ec_token",
            BA_TOKEN: "ba_token",
            PAY_ID: "pay_id"
        }, ATTRIBUTE = {
            BUTTON: "data-button",
            FUNDING_SOURCE: "data-funding-source",
            CARD: "data-card",
            VERSION: "data-version",
            LAYOUT: "data-layout",
            SIZE: "data-size"
        }, PLATFORM = {
            DESKTOP: "desktop",
            MOBILE: "mobile"
        }, FPTI = {
            KEY: {
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
                PAY_ID: "pay_id",
                SELLER_ID: "seller_id",
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
                VERSION: "checkoutjs_version"
            },
            BUTTON_TYPE: {
                IFRAME: "iframe",
                HTML: "html",
                CUSTOM: "custom"
            },
            DATA_SOURCE: {
                CHECKOUT: "checkout"
            },
            CONTEXT_TYPE: (_CONTEXT_TYPE = {
                BUTTON_SESSION_ID: "button_session_id"
            }, _CONTEXT_TYPE[PAYMENT_TYPE.PAY_ID] = "Pay-ID", _CONTEXT_TYPE[PAYMENT_TYPE.EC_TOKEN] = "EC-Token", 
            _CONTEXT_TYPE[PAYMENT_TYPE.BA_TOKEN] = "EC-Token", _CONTEXT_TYPE),
            FEED: {
                CHECKOUTJS: "checkoutjs"
            },
            STATE: {
                LOAD: "checkoutjs_load",
                BUTTON: "checkoutjs_button",
                CHECKOUT: "checkoutjs_checkout",
                PPTM: "checkoutjs_pptm",
                PXP: "PXP_CHECK"
            },
            TRANSITION: {
                SCRIPT_LOAD: "process_script_load",
                BUTTON_RENDER: "process_button_render",
                BUTTON_LOAD: "process_button_load",
                BUTTON_CLICK: "process_button_click",
                CREATE_PAYMENT: "process_create_payment",
                RECIEVE_PAYMENT: "process_recieve_payment",
                CHECKOUT_INIT: "process_checkout_init",
                CHECKOUT_AUTHORIZE: "process_checkout_authorize",
                CHECKOUT_SHIPPING_CHANGE: "process_checkout_shipping_change",
                CHECKOUT_CANCEL: "process_checkout_cancel",
                CHECKOUT_ERROR: "process_checkout_error",
                EXTERNAL_EXPERIMENT: "process_external_experiment",
                EXTERNAL_EXPERIMENT_COMPLETE: "process_external_experiment_complete",
                PPTM_LOAD: "process_pptm_load",
                PPTM_LOADED: "process_pptm_loaded",
                PXP: "process_pxp_check"
            }
        }, COUNTRY = {
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
        }, LANG = {
            AR: "ar",
            CS: "cs",
            DA: "da",
            DE: "de",
            EL: "el",
            EN: "en",
            ES: "es",
            FI: "fi",
            FR: "fr",
            HE: "he",
            HU: "hu",
            ID: "id",
            IT: "it",
            JA: "ja",
            KO: "ko",
            NL: "nl",
            NO: "no",
            PL: "pl",
            PT: "pt",
            RU: "ru",
            SK: "sk",
            SV: "sv",
            TH: "th",
            TR: "tr",
            ZH: "zh"
        }, LANG_TO_DEFAULT_COUNTRY = ((_LANG_TO_DEFAULT_COUN = {})[LANG.AR] = COUNTRY.SA, 
        _LANG_TO_DEFAULT_COUN[LANG.CS] = COUNTRY.CZ, _LANG_TO_DEFAULT_COUN[LANG.DA] = COUNTRY.DK, 
        _LANG_TO_DEFAULT_COUN[LANG.DE] = COUNTRY.DE, _LANG_TO_DEFAULT_COUN[LANG.EL] = COUNTRY.GR, 
        _LANG_TO_DEFAULT_COUN[LANG.EN] = COUNTRY.US, _LANG_TO_DEFAULT_COUN[LANG.ES] = COUNTRY.ES, 
        _LANG_TO_DEFAULT_COUN[LANG.FI] = COUNTRY.FI, _LANG_TO_DEFAULT_COUN[LANG.FR] = COUNTRY.FR, 
        _LANG_TO_DEFAULT_COUN[LANG.HE] = COUNTRY.IL, _LANG_TO_DEFAULT_COUN[LANG.HU] = COUNTRY.HU, 
        _LANG_TO_DEFAULT_COUN[LANG.ID] = COUNTRY.ID, _LANG_TO_DEFAULT_COUN[LANG.IT] = COUNTRY.IT, 
        _LANG_TO_DEFAULT_COUN[LANG.JA] = COUNTRY.JP, _LANG_TO_DEFAULT_COUN[LANG.KO] = COUNTRY.KR, 
        _LANG_TO_DEFAULT_COUN[LANG.NL] = COUNTRY.NL, _LANG_TO_DEFAULT_COUN[LANG.NO] = COUNTRY.NO, 
        _LANG_TO_DEFAULT_COUN[LANG.PL] = COUNTRY.PL, _LANG_TO_DEFAULT_COUN[LANG.PT] = COUNTRY.PT, 
        _LANG_TO_DEFAULT_COUN[LANG.RU] = COUNTRY.RU, _LANG_TO_DEFAULT_COUN[LANG.SK] = COUNTRY.SK, 
        _LANG_TO_DEFAULT_COUN[LANG.SV] = COUNTRY.SE, _LANG_TO_DEFAULT_COUN[LANG.TH] = COUNTRY.TH, 
        _LANG_TO_DEFAULT_COUN[LANG.TR] = COUNTRY.TR, _LANG_TO_DEFAULT_COUN[LANG.ZH] = COUNTRY.CN, 
        _LANG_TO_DEFAULT_COUN), ALLOWED_INSTALLMENT_COUNTRIES = [ COUNTRY.BR, COUNTRY.MX ], ALLOWED_INSTALLMENT_PERIOD = {
            BR: [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
            MX: [ 3, 6, 9, 12 ]
        };
        __webpack_require__.d(__webpack_exports__, "m", function() {
            return BUTTON_STYLE_OPTIONS;
        });
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return BUTTON_LABEL;
        });
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return BUTTON_COLOR;
        });
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return BUTTON_LOGO_COLOR;
        });
        __webpack_require__.d(__webpack_exports__, "l", function() {
            return BUTTON_SIZE;
        });
        __webpack_require__.d(__webpack_exports__, "n", function() {
            return BUTTON_TAGLINE_COLOR;
        });
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return BUTTON_SHAPE;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return BUTTON_BRANDING;
        });
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return BUTTON_LAYOUT;
        });
        __webpack_require__.d(__webpack_exports__, "j", function() {
            return BUTTON_NUMBER;
        });
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return BUTTON_LOGO;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return CHECKOUT_OVERLAY_COLOR;
        });
        __webpack_require__.d(__webpack_exports__, "t", function() {
            return FUNDING;
        });
        __webpack_require__.d(__webpack_exports__, "o", function() {
            return CARD;
        });
        __webpack_require__.d(__webpack_exports__, "u", function() {
            return FUNDING_ELIGIBILITY_REASON;
        });
        __webpack_require__.d(__webpack_exports__, "p", function() {
            return CARD_PRIORITY;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return FPTI;
        });
        __webpack_require__.d(__webpack_exports__, "q", function() {
            return COUNTRY;
        });
        __webpack_require__.d(__webpack_exports__, "v", function() {
            return LANG;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return LANG_TO_DEFAULT_COUNTRY;
        });
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return ALLOWED_INSTALLMENT_COUNTRIES;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return ALLOWED_INSTALLMENT_PERIOD;
        });
        __webpack_require__.d(__webpack_exports__, "s", function() {
            return ENV;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return USERS;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return SOURCE;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return LOG_LEVEL;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return PAYMENT_TYPE;
        });
        __webpack_require__.d(__webpack_exports__, !1, function() {
            return "xo-pptm";
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return ATTRIBUTE;
        });
        __webpack_require__.d(__webpack_exports__, "w", function() {
            return PLATFORM;
        });
        __webpack_require__.d(__webpack_exports__, "r", function() {
            return "default";
        });
    },
    "./src/lib/util.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        (function(global) {
            __webpack_exports__.b = memoize;
            __webpack_exports__.c = function(pixels, percentage) {
                return Math.round(pixels * percentage / 100);
            };
            __webpack_exports__.a = function() {
                return Math.max.apply(Math, arguments);
            };
            __webpack_exports__.d = function(str, regex, handler) {
                var results = [];
                str.replace(regex, function() {
                    results.push(handler.apply(null, arguments));
                });
                return results;
            };
            var __WEBPACK_IMPORTED_MODULE_0_hi_base32__ = __webpack_require__("./node_modules/hi-base32/src/base32.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hi_base32__), __webpack_require__("./node_modules/zalgo-promise/src/index.js"), 
            __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), __webpack_require__("./src/config/index.js"), 
            "function" == typeof Symbol && Symbol.iterator;
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
                    var glob = function() {
                        if ("undefined" != typeof window) return window;
                        if (void 0 !== global) return global;
                        throw new Error("No global found");
                    }();
                    glob.__CACHE_START_TIME__ && cache[key] && cache[key].time < glob.__CACHE_START_TIME__ && delete cache[key];
                    if (cache[key]) return cache[key].value;
                    cache[key] = {
                        time: Date.now(),
                        value: method.apply(this, arguments)
                    };
                    return cache[key].value;
                };
            }
            memoize(function() {
                try {
                    if ("undefined" == typeof window) return !1;
                    if (window.localStorage) {
                        var _value = Math.random().toString();
                        window.localStorage.setItem("__test__localStorage__", _value);
                        var result = window.localStorage.getItem("__test__localStorage__");
                        window.localStorage.removeItem("__test__localStorage__");
                        if (_value === result) return !0;
                    }
                } catch (err) {}
                return !1;
            });
        }).call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js"));
    },
    "./src/resources/cardLogos/amex.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="40" height="24" viewBox="0 0 40 24" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z" style="fill: rgb(20, 119, 190);"/>\n  <path d="M6.26 12.32h2.313L7.415 9.66M27.353 9.977h-3.738v1.23h3.666v1.384h-3.675v1.385h3.821v1.005c.623-.77 1.33-1.466 2.025-2.235l.707-.77c-.934-1.004-1.87-2.08-2.804-3.075v1.077z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M38.25 7h-5.605l-1.328 1.4L30.072 7H16.984l-1.017 2.416L14.877 7h-9.58L1.25 16.5h4.826l.623-1.556h1.4l.623 1.556H29.99l1.327-1.483 1.328 1.483h5.605l-4.36-4.667L38.25 7zm-17.685 8.1h-1.557V9.883L16.673 15.1h-1.33L13.01 9.883l-.084 5.217H9.73l-.623-1.556h-3.27L5.132 15.1H3.42l2.884-6.772h2.42l2.645 6.233V8.33h2.646l2.107 4.51 1.868-4.51h2.575V15.1zm14.727 0h-2.024l-2.024-2.26-2.023 2.26H22.06V8.328H29.53l1.795 2.177 2.024-2.177h2.025L32.26 11.75l3.032 3.35z" style="fill: rgb(255, 255, 255);"/>\n</svg>';
    },
    "./src/resources/cardLogos/cup.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="UTF-8"?>\n<svg width="40px" height="24px" viewBox="0 0 40 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    \x3c!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch --\x3e\n    <title>unionpay</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id="unionpay" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g>\n            <path d="M38,24 L2,24 C0.9,24 0,23.1 0,22 L0,2 C0,0.9 0.9,0 2,0 L38,0 C39.1,0 40,0.9 40,2 L40,22 C40,23.1 39.1,24 38,24" id="Fill-1" fill="#FFFFFF"></path>\n            <path d="M38,0 L2,0 C0.9,0 0,0.9 0,2 L0,22 C0,23.1 0.9,24 2,24 L38,24 C39.1,24 40,23.1 40,22 L40,2 C40,0.9 39.1,0 38,0 M38,1 C38.551,1 39,1.449 39,2 L39,22 C39,22.551 38.551,23 38,23 L2,23 C1.449,23 1,22.551 1,22 L1,2 C1,1.449 1.449,1 2,1 L38,1" id="Fill-3" fill="#C8C8C8"></path>\n            <path d="M11.6294,3.3945 L18.4974,3.3945 C19.4564,3.3945 20.0524,4.1755 19.8284,5.1375 L16.6294,18.8655 C16.4054,19.8245 15.4474,20.6055 14.4904,20.6055 L7.6204,20.6055 C6.6624,20.6055 6.0664,19.8245 6.2894,18.8655 L9.4894,5.1375 C9.7124,4.1755 10.6694,3.3945 11.6294,3.3945" id="Fill-5" fill="#D80029"></path>\n            <path d="M17.9287,3.3945 L24.7967,3.3945 C25.7537,3.3945 26.3547,4.1755 26.1257,5.1375 L22.9297,18.8655 C22.7037,19.8245 21.7437,20.6055 20.7837,20.6055 L13.9177,20.6055 C12.9587,20.6055 12.3627,19.8245 12.5877,18.8655 L15.7837,5.1375 C16.0077,4.1755 16.9697,3.3945 17.9287,3.3945" id="Fill-7" fill="#0E2E62"></path>\n            <path d="M25.5161,3.3945 L32.3771,3.3945 C33.3361,3.3945 33.9351,4.1755 33.7091,5.1375 L30.5121,18.8655 C30.2891,19.8245 29.3291,20.6055 28.3711,20.6055 L21.5001,20.6055 C20.5421,20.6055 19.9431,19.8245 20.1691,18.8655 L23.3661,5.1375 C23.5901,4.1755 24.5511,3.3945 25.5161,3.3945" id="Fill-9" fill="#0C606C"></path>\n            <path d="M24.4546,16.3071 L25.1006,16.3071 L25.2466,15.6821 L24.5976,15.6821 L24.4546,16.3071 Z M24.8526,14.5921 L24.6816,15.3221 C24.6816,15.3221 24.9176,15.1981 25.0506,15.1611 C25.1796,15.1271 25.3786,15.1051 25.3786,15.1051 L25.5006,14.5921 L24.8526,14.5921 Z M25.1026,13.5291 L24.9406,14.2371 C24.9406,14.2371 25.1706,14.1281 25.3006,14.0941 C25.4316,14.0581 25.6296,14.0401 25.6296,14.0401 L25.7516,13.5291 L25.1026,13.5291 Z M26.5356,13.5291 L25.8886,16.2961 L26.1126,16.2961 L25.9756,16.8721 L25.7516,16.8721 L25.7106,17.0491 L24.9126,17.0491 L24.9556,16.8721 L23.3366,16.8721 L23.4636,16.3421 L23.6286,16.3401 L24.2886,13.5291 L24.4186,12.9631 L25.2336,12.9631 L25.1686,13.2481 C25.1686,13.2481 25.3736,13.0911 25.5716,13.0391 C25.7756,12.9841 26.9526,12.9641 26.9526,12.9641 L26.8176,13.5291 L26.5356,13.5291 Z" id="Fill-11" fill="#FFFFFF"></path>\n            <path d="M26.9966,12.9678 L27.8616,12.9678 L27.8726,13.2878 C27.8666,13.3418 27.9146,13.3668 28.0136,13.3688 L28.1616,13.3688 L28.0306,13.9018 L27.5596,13.9018 C27.1566,13.9318 27.0016,13.7578 27.0136,13.5618 L26.9966,12.9678" id="Fill-13" fill="#FFFFFF"></path>\n            <path d="M27.1436,15.4956 L26.3166,15.4956 L26.4276,15.0226 L27.3706,15.0226 L27.4736,14.5886 L26.5416,14.5886 L26.6686,14.0536 L29.2616,14.0536 L29.1336,14.5886 L28.2656,14.5886 L28.1616,15.0226 L29.0326,15.0226 L28.9216,15.4956 L27.9786,15.4956 L27.8216,15.6976 L28.2056,15.6976 L28.3396,16.2966 C28.3516,16.3536 28.3596,16.3926 28.3786,16.4196 C28.3956,16.4386 28.5126,16.4486 28.5806,16.4486 L28.6976,16.4486 L28.5596,17.0356 L28.2656,17.0356 C28.2206,17.0356 28.1526,17.0346 28.0576,17.0246 C27.9706,17.0176 27.9036,16.9636 27.8406,16.9376 C27.7836,16.9106 27.6996,16.8476 27.6706,16.7326 L27.5386,16.1376 L27.1546,16.7246 C27.0266,16.9106 26.8526,17.0496 26.5396,17.0496 L25.9386,17.0496 L26.0596,16.5326 L26.2906,16.5326 C26.3556,16.5326 26.4156,16.5056 26.4546,16.4836 C26.4986,16.4646 26.5356,16.4426 26.5796,16.3806 L27.1436,15.4956" id="Fill-15" fill="#FFFFFF"></path>\n            <path d="M18.0044,14.1973 L20.1934,14.1973 L20.0684,14.7183 L19.1874,14.7183 L19.0834,15.1663 L19.9734,15.1663 L19.8434,15.7033 L18.9514,15.7033 L18.7794,16.4263 C18.7584,16.5053 18.9974,16.5203 19.0834,16.5203 L19.5254,16.4583 L19.3824,17.0503 L18.3764,17.0503 C18.2934,17.0503 18.2344,17.0433 18.1454,17.0223 C18.0594,17.0003 18.0184,16.9613 17.9734,16.9053 C17.9374,16.8493 17.8764,16.7963 17.9074,16.6723 L18.1364,15.7123 L17.6394,15.7123 L17.7704,15.1663 L18.2714,15.1663 L18.3764,14.7183 L17.8784,14.7183 L18.0044,14.1973" id="Fill-17" fill="#FFFFFF"></path>\n            <path d="M19.4194,13.2588 L20.3174,13.2588 L20.1894,13.8018 L18.9614,13.8018 L18.8354,13.9198 C18.7844,13.9738 18.7614,13.9518 18.6914,13.9888 C18.6234,14.0278 18.4814,14.0938 18.2914,14.0938 L17.9004,14.0938 L18.0264,13.5718 L18.1414,13.5718 C18.2444,13.5718 18.3104,13.5588 18.3434,13.5378 C18.3804,13.5158 18.4214,13.4598 18.4644,13.3688 L18.6664,12.9618 L19.5584,12.9618 L19.4194,13.2588" id="Fill-19" fill="#FFFFFF"></path>\n            <path d="M21.1973,14.1572 C21.1973,14.1572 21.4273,13.9322 21.8443,13.8582 C21.9383,13.8422 22.5393,13.8462 22.5393,13.8462 L22.6063,13.5452 L21.3453,13.5452 L21.1973,14.1572 Z M22.3963,14.3842 L21.1463,14.3842 L21.0853,14.6352 L22.1703,14.6352 C22.2953,14.6232 22.3233,14.6392 22.3313,14.6342 L22.3963,14.3842 Z M20.6843,12.9632 L21.4543,12.9632 L21.3633,13.3512 C21.3633,13.3512 21.5903,13.1552 21.7603,13.0912 C21.9223,13.0252 22.3023,12.9702 22.3023,12.9702 L23.5393,12.9632 L23.2033,14.3672 C23.1463,14.6112 23.0763,14.7642 23.0263,14.8342 C22.9833,14.9052 22.9343,14.9662 22.8283,15.0262 C22.7283,15.0832 22.6333,15.1142 22.5453,15.1222 C22.4663,15.1322 22.3403,15.1322 22.1653,15.1332 L20.9773,15.1332 L20.7093,16.2452 C20.6813,16.3562 20.6723,16.4072 20.6943,16.4382 C20.7123,16.4622 20.7553,16.4932 20.8113,16.4932 L21.3323,16.4422 L21.1933,17.0552 L20.6003,17.0552 C20.4153,17.0552 20.2773,17.0502 20.1853,17.0422 C20.0933,17.0352 19.9953,17.0422 19.9293,16.9922 C19.8733,16.9412 19.7873,16.8822 19.7843,16.8172 C19.7873,16.7572 19.8063,16.6562 19.8333,16.5212 L20.6843,12.9632 Z" id="Fill-21" fill="#FFFFFF"></path>\n            <path d="M23.0562,15.2319 L23.0082,15.5689 C22.9802,15.6729 22.9602,15.7539 22.8882,15.8259 C22.8062,15.8939 22.7132,15.9679 22.4822,15.9679 L22.0622,15.9839 L22.0792,16.3649 C22.0832,16.4769 22.1092,16.4639 22.1282,16.4819 C22.1512,16.5019 22.1652,16.5079 22.1862,16.5139 L22.3222,16.5079 L22.7222,16.4829 L22.5922,17.0439 L22.1282,17.0439 C21.8022,17.0439 21.5562,17.0339 21.4752,16.9709 C21.3932,16.9189 21.3802,16.8579 21.3752,16.7559 L21.3112,15.2649 L22.0562,15.2649 L22.0642,15.5689 L22.2422,15.5689 C22.3052,15.5689 22.3442,15.5649 22.3702,15.5479 C22.3892,15.5289 22.4032,15.5069 22.4162,15.4709 L22.4692,15.2319 L23.0562,15.2319" id="Fill-23" fill="#FFFFFF"></path>\n            <path d="M12.4448,7.7773 C12.4168,7.9033 11.9418,10.0983 11.9398,10.1003 C11.8368,10.5433 11.7588,10.8603 11.5118,11.0673 C11.3628,11.1853 11.1948,11.2413 11.0048,11.2413 C10.6918,11.2413 10.5078,11.0883 10.4738,10.7923 L10.4658,10.6903 C10.4658,10.6903 10.5628,10.0983 10.5628,10.0963 C10.5628,10.0963 11.0648,8.0893 11.1558,7.8233 C11.1578,7.8083 11.1608,7.7983 11.1638,7.7903 C10.1898,7.8023 10.0168,7.7953 10.0048,7.7773 C9.9988,7.7983 9.9738,7.9253 9.9738,7.9253 L9.4628,10.1823 L9.4148,10.3743 L9.3348,10.9983 C9.3348,11.1853 9.3698,11.3383 9.4428,11.4663 C9.6748,11.8713 10.3408,11.9313 10.7158,11.9313 C11.1998,11.9313 11.6508,11.8263 11.9588,11.6443 C12.4908,11.3253 12.6318,10.8333 12.7528,10.3993 L12.8108,10.1743 C12.8108,10.1743 13.3288,8.0923 13.4158,7.8233 C13.4178,7.8083 13.4218,7.7983 13.4238,7.7903 C12.7188,7.8013 12.5118,7.7953 12.4448,7.7773" id="Fill-25" fill="#FFFFFF"></path>\n            <path d="M15.2935,11.9106 C14.9485,11.9056 14.8275,11.9056 14.4245,11.9246 L14.4055,11.8966 C14.4425,11.7416 14.4815,11.5876 14.5165,11.4346 L14.5645,11.2266 C14.6395,10.8986 14.7155,10.5206 14.7195,10.4026 C14.7285,10.3336 14.7505,10.1606 14.5525,10.1606 C14.4695,10.1606 14.3815,10.1996 14.2925,10.2416 C14.2475,10.4136 14.1445,10.9026 14.0985,11.1246 C14.0005,11.5956 13.9905,11.6496 13.9475,11.8796 L13.9185,11.9106 C13.5605,11.9056 13.4395,11.9056 13.0315,11.9246 L13.0135,11.8926 C13.0795,11.6086 13.1485,11.3326 13.2115,11.0526 C13.3855,10.2976 13.4265,10.0106 13.4725,9.6276 L13.5045,9.6006 C13.9065,9.5466 14.0015,9.5326 14.4355,9.4436 L14.4695,9.4836 L14.4035,9.7266 C14.4785,9.6846 14.5505,9.6406 14.6255,9.6006 C14.8275,9.5026 15.0535,9.4706 15.1805,9.4706 C15.3675,9.4706 15.5725,9.5256 15.6605,9.7426 C15.7475,9.9376 15.6885,10.1786 15.5805,10.6526 L15.5275,10.8916 C15.4135,11.4216 15.3975,11.5196 15.3345,11.8796 L15.2935,11.9106" id="Fill-27" fill="#FFFFFF"></path>\n            <path d="M16.6963,11.9106 C16.4873,11.9056 16.3543,11.9056 16.2243,11.9106 C16.0943,11.9106 15.9663,11.9146 15.7733,11.9246 L15.7623,11.9056 L15.7513,11.8926 C15.8033,11.6936 15.8313,11.6216 15.8583,11.5526 C15.8843,11.4806 15.9093,11.4106 15.9553,11.2066 C16.0143,10.9436 16.0533,10.7546 16.0783,10.5966 C16.1083,10.4366 16.1223,10.3066 16.1423,10.1526 L16.1613,10.1396 L16.1743,10.1236 C16.3833,10.0986 16.5133,10.0776 16.6503,10.0546 C16.7823,10.0356 16.9213,10.0106 17.1363,9.9716 L17.1423,9.9866 L17.1523,10.0046 C17.1083,10.1696 17.0713,10.3336 17.0303,10.4996 C16.9913,10.6646 16.9533,10.8296 16.9173,10.9926 C16.8353,11.3386 16.8083,11.4716 16.7883,11.5626 C16.7723,11.6526 16.7673,11.6976 16.7363,11.8796 L16.7173,11.8966 L16.6963,11.9106" id="Fill-29" fill="#FFFFFF"></path>\n            <path d="M18.8965,10.6846 C18.8765,10.7706 18.7985,11.1066 18.6915,11.2486 C18.6185,11.3496 18.5295,11.4126 18.4375,11.4126 C18.4085,11.4126 18.2365,11.4126 18.2325,11.1616 C18.2325,11.0356 18.2545,10.9076 18.2875,10.7676 C18.3775,10.3706 18.4865,10.0316 18.7585,10.0316 C18.9745,10.0316 18.9875,10.2766 18.8965,10.6846 M19.7975,10.7226 C19.9195,10.1886 19.8285,9.9396 19.7085,9.7916 C19.5255,9.5596 19.2115,9.4836 18.8795,9.4836 C18.6825,9.4836 18.2135,9.5056 17.8445,9.8486 C17.5825,10.0906 17.4525,10.4256 17.3825,10.7426 C17.3075,11.0676 17.2205,11.6586 17.7575,11.8716 C17.9245,11.9426 18.1635,11.9656 18.3155,11.9656 C18.7125,11.9656 19.1165,11.8536 19.4175,11.5286 C19.6555,11.2726 19.7605,10.8806 19.7975,10.7226" id="Fill-31" fill="#FFFFFF"></path>\n            <path d="M28.7817,9.5107 C28.3477,9.5897 28.2337,9.6107 27.8217,9.6667 L27.7857,9.6907 C27.7837,9.7247 27.7777,9.7567 27.7717,9.7927 C27.7097,9.6877 27.6207,9.5947 27.4737,9.5377 C27.2867,9.4687 26.8547,9.5587 26.4857,9.9007 C26.2207,10.1417 26.0987,10.4697 26.0217,10.7907 C25.9497,11.1087 25.8627,11.6977 26.3987,11.9057 C26.5687,11.9777 26.7237,11.9987 26.8767,11.9907 C27.0457,11.9847 27.1937,11.8967 27.3367,11.7747 C27.3217,11.8257 27.3107,11.8767 27.2967,11.9287 L27.3217,11.9577 C27.7077,11.9427 27.8277,11.9427 28.2447,11.9477 L28.2827,11.9147 C28.3417,11.5587 28.4027,11.2087 28.5587,10.5227 C28.6347,10.1967 28.7127,9.8717 28.7937,9.5467 L28.7817,9.5107 M27.4107,11.2907 C27.3417,11.3917 27.1717,11.4537 27.0787,11.4537 C27.0507,11.4537 26.8807,11.4537 26.8767,11.2057 C26.8747,11.0787 26.8977,10.9507 26.9297,10.8127 C27.0187,10.4157 27.1277,10.0797 27.4047,10.0797 C27.5797,10.0797 27.6667,10.2537 27.6427,10.5387 C27.6267,10.6017 27.6187,10.6597 27.6017,10.7337 C27.5717,10.8587 27.5367,10.9807 27.5067,11.1027 C27.4797,11.1767 27.4487,11.2457 27.4107,11.2907" id="Fill-33" fill="#FFFFFF"></path>\n            <path d="M22.1577,11.9106 C21.8087,11.9056 21.6947,11.9056 21.2867,11.9246 L21.2717,11.8966 C21.3087,11.7416 21.3477,11.5876 21.3827,11.4346 L21.4317,11.2266 C21.5037,10.8986 21.5797,10.5206 21.5897,10.4026 C21.5927,10.3336 21.6147,10.1606 21.4167,10.1606 C21.3367,10.1606 21.2457,10.1996 21.1567,10.2416 C21.1117,10.4136 21.0117,10.9026 20.9637,11.1246 C20.8677,11.5956 20.8597,11.6496 20.8157,11.8796 L20.7837,11.9106 C20.4287,11.9056 20.3077,11.9056 19.8967,11.9246 L19.8777,11.8926 C19.9477,11.6086 20.0137,11.3326 20.0777,11.0526 C20.2507,10.2976 20.2907,10.0106 20.3407,9.6276 L20.3727,9.6006 C20.7727,9.5466 20.8677,9.5326 21.3027,9.4436 L21.3367,9.4836 L21.2717,9.7266 C21.3407,9.6846 21.4147,9.6406 21.4887,9.6006 C21.6927,9.5026 21.9187,9.4706 22.0427,9.4706 C22.2317,9.4706 22.4397,9.5256 22.5257,9.7426 C22.6087,9.9376 22.5547,10.1786 22.4457,10.6526 L22.3907,10.8916 C22.2787,11.4216 22.2607,11.5196 22.1987,11.8796 L22.1577,11.9106" id="Fill-35" fill="#FFFFFF"></path>\n            <path d="M25.1504,7.7729 L24.8644,7.7789 C24.1174,7.7889 23.8204,7.7859 23.6934,7.7679 C23.6834,7.8229 23.6634,7.9199 23.6634,7.9199 L23.3994,9.1629 C23.3994,9.1629 22.7584,11.7979 22.7284,11.9239 C23.3774,11.9119 23.6474,11.9119 23.7574,11.9259 C23.7834,11.8019 23.9354,11.0669 23.9374,11.0629 C23.9374,11.0629 24.0654,10.5229 24.0744,10.5089 C24.0744,10.5089 24.1104,10.4499 24.1544,10.4269 L24.2154,10.4269 C24.7754,10.4269 25.4114,10.4269 25.9104,10.0589 C26.2474,9.8139 26.4764,9.4389 26.5834,8.9909 C26.6084,8.8799 26.6294,8.7489 26.6294,8.6159 C26.6294,8.4449 26.5944,8.2749 26.4944,8.1349 C26.2434,7.7809 25.7364,7.7789 25.1504,7.7729 M25.5254,9.0659 C25.4634,9.3409 25.2884,9.5699 25.0564,9.6849 C24.8664,9.7799 24.6384,9.7869 24.3974,9.7869 L24.2404,9.7869 L24.2554,9.7249 C24.2554,9.7249 24.5394,8.4899 24.5394,8.4919 L24.5454,8.4289 L24.5514,8.3809 L24.6664,8.3889 C24.6664,8.3889 25.2534,8.4409 25.2664,8.4449 C25.4964,8.5349 25.5934,8.7639 25.5254,9.0659" id="Fill-37" fill="#FFFFFF"></path>\n            <path d="M17.0757,9.7915 C17.3027,9.6335 17.3337,9.4145 17.1407,9.2965 C16.9457,9.1865 16.6047,9.2195 16.3747,9.3795 C16.1427,9.5355 16.1177,9.7565 16.3117,9.8725 C16.5047,9.9865 16.8457,9.9485 17.0757,9.7915" id="Fill-39" fill="#FFFFFF"></path>\n            <path d="M31.6587,9.5098 L31.6217,9.4688 C31.1967,9.5568 31.1197,9.5698 30.7267,9.6218 L30.6967,9.6478 C30.6967,9.6548 30.6967,9.6628 30.6957,9.6688 L30.6927,9.6628 C30.3997,10.3378 30.4117,10.1908 30.1737,10.7218 C30.1707,10.6958 30.1707,10.6768 30.1707,10.6558 L30.1107,9.5098 L30.0747,9.4688 C29.6287,9.5568 29.6167,9.5698 29.2057,9.6218 L29.1727,9.6478 C29.1687,9.6668 29.1667,9.6788 29.1637,9.6958 L29.1687,9.7008 C29.2187,9.9658 29.2067,9.9058 29.2597,10.3208 C29.2817,10.5228 29.3147,10.7308 29.3377,10.9338 C29.3807,11.2698 29.4037,11.4368 29.4507,11.9478 C29.1727,12.4128 29.1077,12.5858 28.8417,12.9888 L28.6527,13.2908 C28.6307,13.3238 28.6117,13.3418 28.5827,13.3548 C28.5547,13.3668 28.5127,13.3738 28.4587,13.3738 L28.3167,13.3738 L28.1927,13.9118 L28.7297,13.9018 C29.0437,13.9018 29.2417,13.7458 29.3477,13.5498 L29.6807,12.9768 L31.6587,9.5098" id="Fill-41" fill="#FFFFFF"></path>\n        </g>\n    </g>\n</svg>';
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
    "./src/resources/cardLogos/maestro.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 23.999999" width="40" height="24" preserveAspectRatio="xMinYMin meet" version="1.1">\n    <path d="M 0,1.927 C 0,0.86299997 0.892,0 1.992,0 H 38.008 C 39.108,0 40,0.86299997 40,1.927 V 22.073 C 40,23.137 39.108,24 38.008,24 H 1.992 C 0.892,24 0,23.137 0,22.073 Z" style="fill:#3e3939" />\n    <path d="m 23.74623,18.221667 v 0.929759 h -0.621716 v 0.609196 h 0.621716 v 1.394324 c 0,0.71165 0.275786,1.135118 1.064369,1.135118 a 1.564348,1.564348 0 0 0 0.833339,-0.237293 l -0.192215,-0.571003 a 1.2309624,1.2309624 0 0 1 -0.589785,0.17343 c -0.333383,0 -0.442649,-0.192213 -0.442649,-0.512774 v -1.388065 h 1.086908 V 19.151426 H 24.419289 V 18.221667 Z M 10.802242,19.066278 A 1.1860835,1.1860835 0 0 0 9.8436827,19.612862 1.1251765,1.1251765 0 0 0 8.830654,19.068153 1.0129794,1.0129794 0 0 0 7.9328276,19.523328 V 19.145165 H 7.2660325 v 3.061001 H 7.939089 v -1.704869 a 0.71485573,0.71485573 0 0 1 0.7500683,-0.814556 c 0.4423764,0 0.6667964,0.288356 0.6667964,0.807671 v 1.702363 h 0.6736813 v -1.695478 a 0.72126699,0.72126699 0 0 1 0.750068,-0.814556 c 0.4552,0 0.673058,0.288356 0.673058,0.807671 v 1.702363 l 0.669926,0.0094 v -1.923369 a 1.1379991,1.1379991 0 0 0 -1.202112,-1.214633 1.1860835,1.1860835 0 0 0 -0.118329,-0.002 z m 10.549158,0.002 c -0.782176,0 -1.282253,0.372027 -1.282253,0.981097 0,0.50008 0.372102,0.80792 1.058106,0.904089 l 0.320567,0.04445 c 0.365439,0.05128 0.538444,0.147461 0.538444,0.320563 0,0.237218 -0.243528,0.371902 -0.69873,0.371902 a 1.6316662,1.6316662 0 0 1 -1.019289,-0.320606 l -0.320562,0.519663 a 2.2086798,2.2086798 0 0 0 1.323576,0.396946 c 0.881546,0 1.394948,-0.461335 1.394948,-0.999881 0,-0.538545 -0.403858,-0.820441 -1.07063,-0.916612 l -0.320563,-0.04509 c -0.288506,-0.03848 -0.519662,-0.07675 -0.519662,-0.301152 0,-0.224394 0.218082,-0.359382 0.583526,-0.359382 a 1.9714631,1.9714631 0 0 1 0.961688,0.262961 l 0.298023,-0.538445 A 2.2888207,2.2888207 0 0 0 21.3514,19.06818 Z m 6.45947,0 0.0132,0.01254 a 0.90398792,0.90398792 0 0 0 -0.80829,0.448915 v -0.371917 h -0.659908 v 3.061628 h 0.666794 v -1.714927 c 0,-0.506487 0.205162,-0.788884 0.641127,-0.788884 a 1.0835034,1.0835034 0 0 1 0.416355,0.07701 l 0.205363,-0.641127 a 1.4200945,1.4200945 0 0 0 -0.474583,-0.08326 z m 2.301544,0 a 1.7246296,1.7246296 0 0 0 -0.656779,0.13148 1.5835818,1.5835818 0 0 0 -0.519661,0.339973 1.564348,1.564348 0 0 0 -0.343103,0.509644 1.7021902,1.7021902 0 0 0 0,1.282252 1.564348,1.564348 0 0 0 0.343103,0.509647 1.5835818,1.5835818 0 0 0 0.519661,0.339972 1.8143872,1.8143872 0 0 0 1.314183,0 1.6028157,1.6028157 0 0 0 0.522793,-0.339972 1.5483199,1.5483199 0 0 0 0.345606,-0.509647 1.6989845,1.6989845 0 0 0 0,-1.282252 1.5515252,1.5515252 0 0 0 -0.345606,-0.509644 1.6028157,1.6028157 0 0 0 -0.532186,-0.343105 1.7246296,1.7246296 0 0 0 -0.641125,-0.122092 z m -15.816534,0.0025 a 1.1604384,1.1604384 0 0 0 -0.05759,6.27e-4 1.602816,1.602816 0 0 0 0,3.205632 1.1604384,1.1604384 0 0 0 0.961689,-0.448915 v 0.371903 h 0.666796 l 0.0062,-1.522675 v -1.528937 h -0.673017 v 0.371902 a 1.1604384,1.1604384 0 0 0 -0.904087,-0.449539 z m 3.747834,0.0039 a 1.6029727,1.6029727 0 0 0 0.04446,3.205629 1.859266,1.859266 0 0 0 1.253452,-0.429506 l -0.320573,-0.493394 a 1.458562,1.458562 0 0 1 -0.89094,0.320563 0.84949219,0.84949219 0 0 1 -0.917235,-0.750067 h 2.273368 c 0.0096,-0.07692 0.0094,-0.160682 0.0094,-0.250439 0,-0.961691 -0.596025,-1.602816 -1.451926,-1.602816 z m -0.05135,0.589784 a 0.78858528,0.78858528 0 0 1 0.03819,0 0.75973457,0.75973457 0 0 1 0.775738,0.743808 h -1.589666 a 0.78858528,0.78858528 0 0 1 0.775738,-0.743808 z m 12.120042,0.03256 a 0.99374563,0.99374563 0 0 1 0.385051,0.08952 0.91681058,0.91681058 0 0 1 0.320563,0.201604 0.92963292,0.92963292 0 0 1 0.201606,0.320564 1.1123539,1.1123539 0 0 1 0,0.795147 0.92642727,0.92642727 0 0 1 -0.201606,0.320562 0.91681058,0.91681058 0 0 1 -0.320563,0.202231 1.0418302,1.0418302 0 0 1 -0.760083,0 0.89757672,0.89757672 0 0 1 -0.304286,-0.202231 0.9360443,0.9360443 0 0 1 -0.202231,-0.320562 1.1123539,1.1123539 0 0 1 0,-0.795147 0.93924994,0.93924994 0 0 1 0.202231,-0.320564 0.90078228,0.90078228 0 0 1 0.304286,-0.201604 0.99374563,0.99374563 0 0 1 0.381918,-0.07073 z M 14.309018,19.80595 a 0.92642727,0.92642727 0 1 1 0.01565,1.852627 0.91681058,0.91681058 0 0 1 -0.936018,-0.981097 h 0.0069 a 0.92642727,0.92642727 0 0 1 0.913439,-0.871499 z m 18.111818,1.952179 -0.01629,0.0031 a 0.3205631,0.3205631 0 0 0 -0.10581,0.0194 0.3205631,0.3205631 0 0 0 -0.09955,0.06386 0.3205631,0.3205631 0 0 0 -0.067,0.09641 0.30132932,0.30132932 0 0 0 0,0.236665 0.3205631,0.3205631 0 0 0 0.288631,0.185952 0.30132932,0.30132932 0 0 0 0.12147,-0.02567 0.3205631,0.3205631 0 0 0 0.09956,-0.06384 0.3205631,0.3205631 0 0 0 0.06763,-0.09642 0.2981237,0.2981237 0 0 0 0,-0.236664 0.3205631,0.3205631 0 0 0 -0.06763,-0.09641 0.3205631,0.3205631 0 0 0 -0.09956,-0.06387 0.3205631,0.3205631 0 0 0 -0.12147,-0.02255 z m 0,0.067 a 0.23080544,0.23080544 0 0 1 0.09266,0.01941 0.2372167,0.2372167 0 0 1 0.07387,0.384424 0.24042232,0.24042232 0 0 1 -0.07387,0.05135 0.2275998,0.2275998 0 0 1 -0.09266,0.01941 v -0.01321 a 0.2372167,0.2372167 0 0 1 -0.170301,-0.07014 0.2372167,0.2372167 0 0 1 0,-0.320564 0.23401105,0.23401105 0 0 1 0.07701,-0.05134 0.24042232,0.24042232 0 0 1 0.09329,-0.0194 z m 0.01878,0.09329 -0.134612,0.0031 v 0.281748 h 0.06134 v -0.105802 h 0.0288 l 0.08639,0.105811 h 0.07388 l -0.09329,-0.105811 a 0.11219709,0.11219709 0 0 0 0.06761,-0.02879 0.07693513,0.07693513 0 0 0 0.02255,-0.05761 0.08014078,0.08014078 0 0 0 -0.0288,-0.067 0.12822525,0.12822525 0 0 0 -0.08391,-0.02567 z m -0.07014,0.05448 0.07014,0.01878 a 0.06731826,0.06731826 0 0 1 0.03881,0 0.03205633,0.03205633 0 0 1 0,0.02943 0.03205633,0.03205633 0 0 1 0,0.0288 0.06731826,0.06731826 0 0 1 -0.03881,0 h -0.07014 z" style="fill:#ffffff;stroke-width:0.77356213" />\n    <g transform="matrix(0.21220782,0,0,0.21220782,2.1400282,0.14227739)">\n        <rect x="68.410004" y="15.14" width="31.5" height="56.610001" style="fill:#7673c0" />\n        <path d="m 382.25,296.22 a 35.94,35.94 0 0 1 13.75,-28.3 36,36 0 1 0 0,56.61 35.94,35.94 0 0 1 -13.75,-28.31 z" transform="translate(-311.84,-252.78)" id="path8" style="fill:#eb001b" />\n        <path d="m 450.81,318.53 v -1.16 h 0.47 v -0.24 h -1.19 v 0.24 h 0.47 v 1.16 z m 2.31,0 v -1.4 h -0.36 l -0.42,1 -0.42,-1 h -0.36 v 1.4 h 0.26 v -1.05 l 0.39,0.91 h 0.27 l 0.39,-0.91 v 1.06 z" transform="translate(-311.84,-252.78)" style="fill:#00a1df" />\n        <path d="m 454.25,296.22 a 36,36 0 0 1 -58.25,28.3 36,36 0 0 0 0,-56.61 36,36 0 0 1 58.25,28.3 z" transform="translate(-311.84,-252.78)" style="fill:#00a1df" />\n    </g>\n</svg>\n';
    },
    "./src/resources/cardLogos/mastercard.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="40" height="24" viewBox="0 0 40 24" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z" style="fill: rgb(62, 57, 57);"/>\n  <path style="fill: rgb(255, 95, 0);" d="M 22.205 3.901 L 15.688 3.901 L 15.688 15.589 L 22.205 15.589"/>\n  <path d="M 16.1 9.747 C 16.1 7.371 17.218 5.265 18.935 3.901 C 17.67 2.912 16.078 2.312 14.342 2.312 C 10.223 2.312 6.892 5.636 6.892 9.746 C 6.892 13.853 10.223 17.178 14.342 17.178 C 16.078 17.178 17.67 16.58 18.935 15.588 C 17.216 14.246 16.099 12.119 16.099 9.745 Z" style="fill: rgb(235, 0, 27);"/>\n  <path d="M 30.996 9.747 C 30.996 13.854 27.663 17.179 23.547 17.179 C 21.81 17.179 20.216 16.581 18.954 15.589 C 20.691 14.227 21.788 12.12 21.788 9.746 C 21.788 7.37 20.671 5.264 18.954 3.9 C 20.216 2.911 21.81 2.311 23.547 2.311 C 27.663 2.311 30.996 5.657 30.996 9.745 Z" style="fill: rgb(247, 158, 27);"/>\n  <path d="M 7.167 22.481 L 7.167 20.43 C 7.167 19.641 6.685 19.127 5.857 19.127 C 5.443 19.127 4.993 19.262 4.683 19.71 C 4.44 19.332 4.096 19.127 3.579 19.127 C 3.233 19.127 2.888 19.23 2.612 19.607 L 2.612 19.197 L 1.886 19.197 L 1.886 22.481 L 2.612 22.481 L 2.612 20.668 C 2.612 20.086 2.921 19.812 3.406 19.812 C 3.888 19.812 4.131 20.121 4.131 20.669 L 4.131 22.481 L 4.856 22.481 L 4.856 20.668 C 4.856 20.086 5.204 19.812 5.651 19.812 C 6.137 19.812 6.377 20.121 6.377 20.669 L 6.377 22.481 L 7.171 22.481 Z M 17.909 19.197 L 16.734 19.197 L 16.734 18.204 L 16.007 18.204 L 16.007 19.197 L 15.352 19.197 L 15.352 19.845 L 16.007 19.845 L 16.007 21.351 C 16.007 22.106 16.319 22.551 17.146 22.551 C 17.459 22.551 17.804 22.449 18.044 22.309 L 17.839 21.695 C 17.632 21.831 17.389 21.867 17.216 21.867 C 16.872 21.867 16.734 21.66 16.734 21.319 L 16.734 19.847 L 17.909 19.847 L 17.909 19.198 Z M 24.053 19.127 C 23.639 19.127 23.364 19.332 23.191 19.607 L 23.191 19.197 L 22.465 19.197 L 22.465 22.481 L 23.191 22.481 L 23.191 20.633 C 23.191 20.086 23.434 19.777 23.882 19.777 C 24.018 19.777 24.192 19.812 24.33 19.847 L 24.538 19.162 C 24.401 19.127 24.192 19.127 24.052 19.127 Z M 14.765 19.469 C 14.42 19.229 13.937 19.127 13.418 19.127 C 12.588 19.127 12.036 19.538 12.036 20.188 C 12.036 20.736 12.453 21.044 13.175 21.146 L 13.524 21.181 C 13.903 21.249 14.108 21.351 14.108 21.523 C 14.108 21.765 13.832 21.934 13.35 21.934 C 12.864 21.934 12.484 21.764 12.244 21.592 L 11.898 22.139 C 12.278 22.411 12.794 22.549 13.313 22.549 C 14.28 22.549 14.831 22.105 14.831 21.488 C 14.831 20.908 14.383 20.599 13.692 20.496 L 13.348 20.462 C 13.037 20.428 12.795 20.36 12.795 20.155 C 12.795 19.914 13.038 19.777 13.418 19.777 C 13.83 19.777 14.245 19.949 14.453 20.052 L 14.764 19.469 Z M 34.033 19.127 C 33.618 19.127 33.342 19.332 33.171 19.607 L 33.171 19.197 L 32.445 19.197 L 32.445 22.481 L 33.171 22.481 L 33.171 20.633 C 33.171 20.086 33.414 19.777 33.862 19.777 C 33.998 19.777 34.17 19.812 34.307 19.847 L 34.515 19.162 C 34.38 19.127 34.172 19.127 34.033 19.127 Z M 24.779 20.838 C 24.779 21.834 25.47 22.551 26.54 22.551 C 27.025 22.551 27.369 22.449 27.715 22.173 L 27.369 21.593 C 27.092 21.798 26.816 21.901 26.504 21.901 C 25.919 21.901 25.505 21.49 25.505 20.84 C 25.505 20.226 25.919 19.813 26.507 19.78 C 26.816 19.78 27.092 19.883 27.369 20.089 L 27.715 19.507 C 27.369 19.233 27.024 19.13 26.54 19.13 C 25.47 19.13 24.779 19.85 24.779 20.841 Z M 31.478 20.838 L 31.478 19.198 L 30.75 19.198 L 30.75 19.608 C 30.51 19.3 30.165 19.128 29.717 19.128 C 28.784 19.128 28.058 19.848 28.058 20.84 C 28.058 21.835 28.784 22.552 29.716 22.552 C 30.197 22.552 30.543 22.382 30.748 22.074 L 30.748 22.484 L 31.477 22.484 L 31.477 20.84 Z M 28.818 20.838 C 28.818 20.259 29.196 19.779 29.819 19.779 C 30.406 19.779 30.821 20.224 30.821 20.84 C 30.821 21.424 30.406 21.902 29.819 21.902 C 29.196 21.869 28.818 21.424 28.818 20.841 Z M 20.148 19.128 C 19.183 19.128 18.494 19.813 18.494 20.84 C 18.494 21.869 19.183 22.552 20.185 22.552 C 20.671 22.552 21.154 22.417 21.533 22.108 L 21.188 21.595 C 20.914 21.799 20.565 21.937 20.222 21.937 C 19.772 21.937 19.323 21.732 19.219 21.149 L 21.671 21.149 L 21.671 20.878 C 21.705 19.815 21.083 19.13 20.15 19.13 Z M 20.148 19.748 C 20.6 19.748 20.911 20.019 20.98 20.532 L 19.253 20.532 C 19.321 20.087 19.633 19.748 20.148 19.748 Z M 38.141 20.84 L 38.141 17.898 L 37.412 17.898 L 37.412 19.61 C 37.173 19.302 36.828 19.13 36.38 19.13 C 35.446 19.13 34.721 19.85 34.721 20.841 C 34.721 21.837 35.446 22.554 36.379 22.554 C 36.861 22.554 37.206 22.383 37.41 22.076 L 37.41 22.486 L 38.14 22.486 L 38.14 20.841 Z M 35.481 20.84 C 35.481 20.261 35.861 19.78 36.484 19.78 C 37.069 19.78 37.486 20.226 37.486 20.841 C 37.486 21.426 37.069 21.904 36.484 21.904 C 35.861 21.87 35.481 21.426 35.481 20.843 Z M 11.237 20.84 L 11.237 19.2 L 10.515 19.2 L 10.515 19.61 C 10.272 19.302 9.928 19.13 9.478 19.13 C 8.545 19.13 7.82 19.85 7.82 20.841 C 7.82 21.837 8.545 22.554 9.477 22.554 C 9.96 22.554 10.304 22.383 10.512 22.076 L 10.512 22.486 L 11.236 22.486 L 11.236 20.841 Z M 8.546 20.84 C 8.546 20.261 8.926 19.78 9.548 19.78 C 10.134 19.78 10.55 20.226 10.55 20.841 C 10.55 21.426 10.134 21.904 9.548 21.904 C 8.926 21.87 8.546 21.426 8.546 20.843 Z" style="fill: rgb(255, 255, 255);"/>\n</svg>';
    },
    "./src/resources/cardLogos/visa.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="40" height="24" viewBox="0 0 40 24" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z" style="fill: rgb(33, 86, 154);"/>\n  <path d="M19.596 7.885l-2.11 9.478H14.93l2.11-9.478h2.554zm10.743 6.12l1.343-3.56.773 3.56H30.34zm2.85 3.358h2.36l-2.063-9.478H31.31c-.492 0-.905.274-1.088.695l-3.832 8.783h2.682l.532-1.415h3.276l.31 1.415zm-6.667-3.094c.01-2.502-3.6-2.64-3.577-3.76.008-.338.345-.7 1.083-.793.365-.045 1.373-.08 2.517.425l.448-2.01c-.615-.214-1.405-.42-2.39-.42-2.523 0-4.3 1.288-4.313 3.133-.016 1.364 1.268 2.125 2.234 2.58.996.464 1.33.762 1.325 1.177-.006.636-.793.918-1.526.928-1.285.02-2.03-.333-2.623-.6l-.462 2.08c.598.262 1.7.49 2.84.502 2.682 0 4.437-1.273 4.445-3.243zM15.948 7.884l-4.138 9.478h-2.7L7.076 9.8c-.123-.466-.23-.637-.606-.834-.615-.32-1.63-.62-2.52-.806l.06-.275h4.345c.554 0 1.052.354 1.178.966l1.076 5.486 2.655-6.45h2.683z" style="fill: rgb(255, 255, 255);"/>\n</svg>';
    },
    "./src/resources/fundingLogos/elv.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="100" height="32" viewBox="0 0 100 32" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path fill="#005DA0" d="M 39.871 18.772 C 37.78 18.772 35.843 18.278 34.272 17.425 L 34.81 13.935 C 36.409 14.769 38.051 15.263 39.826 15.263 C 41.809 15.263 42.661 14.544 42.661 13.284 C 42.661 10.45 34.34 11.641 34.34 5.59 C 34.34 2.53 36.319 0.055 40.885 0.055 C 42.639 0.055 44.549 0.416 45.946 0.999 L 45.474 4.395 C 43.989 3.926 42.481 3.633 41.108 3.633 C 38.86 3.633 38.275 4.395 38.275 5.364 C 38.275 8.175 46.598 6.895 46.598 13.013 C 46.576 16.569 44.101 18.772 39.871 18.772 Z"/>\n  <path fill="#005DA0" d="M 62.233 14.881 L 62.233 18.413 L 49.951 18.413 L 49.951 0.345 L 62.233 0.345 L 62.233 3.946 L 54.022 3.946 L 54.022 7.549 L 60.705 7.549 L 60.705 10.787 L 54.022 10.787 L 54.022 14.905 L 62.233 14.905 Z"/>\n  <path fill="#005DA0" d="M 72.313 12.565 L 69.905 12.565 L 69.905 18.437 L 65.834 18.437 L 65.834 0.345 L 72.313 0.345 C 77.328 0.345 79.376 2.328 79.376 6.534 C 79.376 10.361 77.355 12.565 72.313 12.565 Z M 72.313 3.766 L 69.905 3.766 L 69.905 9.302 L 72.313 9.302 C 74.314 9.302 75.194 8.808 75.194 6.534 C 75.194 4.352 74.428 3.766 72.313 3.766 Z"/>\n  <path fill="#005DA0" d="M 91.797 14.924 L 85.246 14.924 L 84.234 18.437 L 79.939 18.437 L 86.193 0.345 L 91.031 0.345 L 97.352 18.437 L 92.808 18.437 L 91.797 14.924 Z M 88.04 5.318 L 86.238 11.506 L 90.85 11.506 L 89.118 5.318 L 88.645 3.408 L 88.578 3.408 L 88.04 5.318 Z"/>\n  <path fill="#005DA0" d="M 39.736 30.157 L 39.692 31.867 L 34.382 31.867 L 34.382 23.475 L 36.299 23.475 L 36.299 30.157 L 39.736 30.157 Z"/>\n  <path fill="#005DA0" d="M 44.798 31.215 L 44.778 31.215 C 44.371 31.71 43.722 31.977 42.931 31.977 C 41.648 31.977 40.818 31.257 40.818 29.727 C 40.818 28.468 41.695 27.613 43.222 27.613 C 43.722 27.613 44.168 27.68 44.527 27.796 L 44.527 27.411 C 44.527 26.736 44.168 26.421 43.244 26.421 C 42.505 26.421 42.007 26.534 41.382 26.782 L 41.245 25.387 C 41.919 25.095 42.707 24.936 43.563 24.936 C 45.563 24.936 46.263 25.792 46.263 27.658 L 46.263 31.867 L 44.933 31.867 L 44.798 31.215 Z M 44.549 28.966 C 44.393 28.896 44.056 28.828 43.583 28.828 C 42.819 28.828 42.46 29.12 42.46 29.727 C 42.46 30.38 42.842 30.63 43.427 30.63 C 44.012 30.63 44.549 30.271 44.549 29.842 L 44.549 28.966 Z"/>\n  <path fill="#005DA0" d="M 50.02 32.002 C 49.21 32.002 48.466 31.842 47.883 31.529 L 48.062 30.088 C 48.625 30.405 49.41 30.561 49.996 30.561 C 50.693 30.561 50.986 30.29 50.986 29.887 C 50.986 28.807 47.84 29.436 47.84 27.051 C 47.84 25.838 48.667 24.959 50.403 24.959 C 51.075 24.959 51.752 25.095 52.336 25.32 L 52.201 26.736 C 51.64 26.512 50.897 26.396 50.381 26.396 C 49.816 26.396 49.503 26.625 49.503 26.961 C 49.503 27.995 52.603 27.366 52.603 29.707 C 52.603 31.101 51.862 32.002 50.02 32.002 Z"/>\n  <path fill="#005DA0" d="M 56.026 26.375 L 56.026 29.842 C 56.026 30.36 56.295 30.582 56.836 30.582 C 57.014 30.582 57.239 30.561 57.374 30.514 L 57.464 31.776 C 57.239 31.888 56.789 31.956 56.295 31.956 C 54.946 31.956 54.27 31.169 54.27 29.887 L 54.27 26.352 L 53.506 26.352 L 53.506 25.095 L 54.337 25.095 L 54.631 23.562 L 56.002 23.451 L 56.002 25.116 L 57.51 25.116 L 57.51 26.421 L 56.026 26.421 Z"/>\n  <path fill="#005DA0" d="M 60.885 32.002 C 60.073 32.002 59.331 31.842 58.748 31.529 L 58.929 30.088 C 59.49 30.405 60.275 30.561 60.862 30.561 C 61.561 30.561 61.851 30.29 61.851 29.887 C 61.851 28.807 58.702 29.436 58.702 27.051 C 58.702 25.838 59.534 24.959 61.269 24.959 C 61.943 24.959 62.615 25.095 63.203 25.32 L 63.069 26.736 C 62.505 26.512 61.764 26.396 61.246 26.396 C 60.681 26.396 60.367 26.625 60.367 26.961 C 60.367 27.995 63.47 27.366 63.47 29.707 C 63.47 31.101 62.729 32.002 60.885 32.002 Z"/>\n  <path fill="#005DA0" d="M 69.365 26.736 C 69.028 26.625 68.603 26.534 68.22 26.534 C 66.958 26.534 66.53 27.051 66.53 28.49 C 66.53 29.954 67.116 30.514 68.174 30.514 C 68.623 30.514 69.05 30.425 69.41 30.271 L 69.525 31.616 C 69.119 31.867 68.511 32.002 67.792 32.002 C 65.787 32.002 64.732 30.854 64.732 28.49 C 64.732 26.242 65.653 24.981 67.835 24.981 C 68.397 24.981 69.05 25.095 69.479 25.276 L 69.365 26.736 Z"/>\n  <path fill="#005DA0" d="M 75.078 31.867 L 75.078 27.546 C 75.078 26.849 74.743 26.491 74.001 26.491 C 73.508 26.491 73.055 26.714 72.855 27.008 L 72.855 31.867 L 71.122 31.867 L 71.122 23.16 L 72.855 23.069 L 72.855 24.622 L 72.83 25.52 L 72.855 25.545 C 73.348 25.116 73.979 24.959 74.541 24.959 C 75.98 24.959 76.812 25.926 76.812 27.546 L 76.812 31.867 L 75.078 31.867 Z"/>\n  <path fill="#005DA0" d="M 78.658 31.867 L 78.658 25.139 L 80.052 25.072 L 80.21 26.199 L 80.231 26.199 C 80.66 25.387 81.313 24.981 82.098 24.981 C 82.39 24.981 82.663 25.028 82.84 25.072 L 82.731 26.782 C 82.528 26.714 82.257 26.667 81.985 26.667 C 81.088 26.667 80.413 27.321 80.413 28.468 L 80.413 31.867 L 78.658 31.867 Z"/>\n  <path fill="#005DA0" d="M 85.382 24.35 C 84.708 24.35 84.395 24.172 84.395 23.609 C 84.395 23.136 84.708 22.867 85.382 22.867 C 86.058 22.867 86.375 23.113 86.375 23.609 C 86.354 24.105 86.058 24.35 85.382 24.35 Z M 84.484 31.867 L 84.484 25.139 L 86.259 25.072 L 86.259 31.888 L 84.484 31.888 Z"/>\n  <path fill="#005DA0" d="M 88.757 31.867 L 88.757 26.375 L 87.902 26.375 L 87.902 25.095 L 88.757 25.095 L 88.757 24.798 C 88.757 23.79 89.454 22.935 91.076 22.935 C 91.459 22.935 91.885 22.979 92.178 23.069 L 92.063 24.195 C 91.863 24.147 91.636 24.126 91.411 24.126 C 90.738 24.126 90.466 24.399 90.466 24.825 L 90.466 25.072 L 91.907 25.072 L 91.907 26.352 L 90.466 26.352 L 90.466 31.842 L 88.757 31.842 Z"/>\n  <path fill="#005DA0" d="M 95.486 26.375 L 95.486 29.842 C 95.486 30.36 95.754 30.582 96.296 30.582 C 96.473 30.582 96.698 30.561 96.834 30.514 L 96.924 31.776 C 96.698 31.888 96.249 31.956 95.754 31.956 C 94.406 31.956 93.729 31.169 93.729 29.887 L 93.729 26.352 L 92.965 26.352 L 92.965 25.095 L 93.798 25.095 L 94.09 23.562 L 95.461 23.451 L 95.461 25.116 L 96.969 25.116 L 96.969 26.421 L 95.486 26.421 Z"/>\n  <path fill="#AEB1BC" d="M 20.357 8.826 L 15.368 5.081 L 10.379 1.334 C 10.033 1.074 9.54 1.146 9.281 1.493 L 4.883 7.322 C 4.811 7.409 4.768 7.51 4.754 7.624 C 4.68 7.93 4.782 8.248 5.043 8.45 L 8.022 10.677 L 12.042 13.698 L 15.021 15.926 C 15.281 16.13 15.629 16.13 15.888 15.97 C 15.991 15.912 16.062 15.854 16.136 15.752 L 20.531 9.91 C 20.763 9.578 20.706 9.087 20.357 8.826 Z M 10.047 1.769 L 13.012 3.995 L 13.012 3.995 L 15.021 5.5 L 17.046 7.017 L 17.046 7.017 L 20.025 9.245 C 20.142 9.332 20.156 9.491 20.082 9.607 L 19.374 10.591 L 16.005 8.058 L 12.36 5.326 L 8.976 2.809 L 9.684 1.826 C 9.772 1.709 9.931 1.682 10.047 1.769 Z M 15.673 15.463 C 15.629 15.507 15.585 15.536 15.528 15.55 C 15.469 15.564 15.398 15.55 15.339 15.507 L 12.345 13.265 L 8.34 10.257 L 5.361 8.001 C 5.302 7.958 5.275 7.9 5.259 7.842 C 5.259 7.785 5.259 7.726 5.302 7.669 L 6.113 6.585 C 6.113 6.585 7.009 5.427 7.791 4.386 L 11.16 6.917 L 14.804 9.65 L 18.173 12.181 C 17.393 13.222 16.496 14.379 16.496 14.379 L 15.673 15.463 Z"/>\n  <g transform="matrix(0.144619, 0, 0, 0.144619, -7.250457, -3.988513)">\n    <path fill="#005DA0" d="M197.1,150.4l52-69.6l5.3-7c0,0,0.1-0.2,0.2-0.2c0.4-0.5,0.3-1.2-0.2-1.6l-14.7-10.7&#10;&#9;&#9;&#9;c-0.5-0.4-1.2-0.2-1.6,0.3c-0.1,0.1-0.2,0.2-0.2,0.2l-2,2.5l-64.3,86l-70.8,0l-26.5,87.4h177.1l-25-87.4L197.1,150.4z M79.1,234.3&#10;&#9;&#9;&#9;l24.2-80.5l65.7,0l-5.7,7.6l-8.1,11.3l-0.9,1.7l-0.9,1.9l-0.9,2.2l-0.9,2.3l-0.9,2.5l-0.9,2.5l-0.8,2.5l-0.8,2.4l-0.7,2.3&#10;&#9;&#9;&#9;l-0.7,2.1l-0.6,1.9l-0.4,1.6l-0.3,1.2l-0.3,0.7c0,0-0.1,0.2-0.2,0.4c-0.2,0.2-1.2,1.1-2,0.5c-0.8-0.6-0.7-2.6-0.6-3.6&#10;&#9;&#9;&#9;c0.2-3,0.5-6,0.7-8.9c0.1-1-1.2-1.6-2-1.2c-3.6,2.1-5.8,4.6-7.8,7.5c0.2-0.7,0.4-1.4,0.6-2c0.8-3.1,2-6.2,2.5-9.4&#10;&#9;&#9;&#9;c0.3-1.8-0.2-3.9-2.3-4.3c-2.4-0.4-3.9,2.1-5.1,3.7c-3.5,5-5.6,11.2-9.9,15.5c-1.6,1.6-3.5,2.8-5.8,2.1c-2.7-0.8-3.8,2.4,1,2.9&#10;&#9;&#9;&#9;c4.7,0.4,8.3-4.6,10.4-8.1c1.6-2.5,2.9-5.2,4.5-7.8c0.7-1.2,1.5-2.4,2.3-3.6c0.4-0.5,1-1.8,1.7-2c0.8-0.2,0.6,0.3,0.6,0.9&#10;&#9;&#9;&#9;c-0.1,1.5-0.7,3-1.1,4.5c-0.4,1.6-0.9,3.2-1.3,4.7c-0.9,3.4-1.8,6.8-2.8,10.1c-0.4,1.5,1.6,2.2,2.5,1c3.4-4.8,5.1-8.9,9.2-12.1&#10;&#9;&#9;&#9;c-0.1,1.1-0.2,2.1-0.3,3.2c-0.1,1.7-0.5,3.6-0.4,5.3c0.2,2.9,2.4,4.8,5.1,3.6c1.4-0.7,2.4-1.7,2.4-1.7l0.2-0.1l0.6-0.4l1-0.7&#10;&#9;&#9;&#9;l1.4-1l1.6-1.2l1.7-1.2l2.1-1.4l2.1-1.5l2.1-1.5l2.1-1.5l2-1.5l1.9-1.4l1.8-1.4l1.5-1.2l1.2-1.1l1-0.9l0-0.1l0,0l6.5-7.6&#10;&#9;&#9;&#9;l16.6-22.1l29.4,0l22.9,80.5H79.1z"/>\n    <path fill="#005DA0" d="M261.1,77.1l-1.9-1.5c-0.4-0.3-0.9-0.2-1.2,0.2l-24.7,32.9c-0.3,0.4-0.2,0.9,0.2,1.2l1.9,1.5&#10;&#9;&#9;&#9;c0.4,0.3,0.9,0.2,1.2-0.2l24.7-32.9C261.5,77.9,261.5,77.4,261.1,77.1z"/>\n    <polygon fill="#005DA0" points="161.7,217.2 210.9,217.2 209.9,213.3 161.7,213.3 113.6,213.3 112.5,217.2 &#9;&#9;"/>\n  </g>\n</svg>';
    },
    "./src/resources/fundingLogos/elv_white.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="100" height="32" viewBox="0 0 100 32" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <path d="M 39.871 18.772 C 37.78 18.772 35.843 18.278 34.272 17.425 L 34.81 13.935 C 36.409 14.769 38.051 15.263 39.826 15.263 C 41.809 15.263 42.661 14.544 42.661 13.284 C 42.661 10.45 34.34 11.641 34.34 5.59 C 34.34 2.53 36.319 0.055 40.885 0.055 C 42.639 0.055 44.549 0.416 45.946 0.999 L 45.474 4.395 C 43.989 3.926 42.481 3.633 41.108 3.633 C 38.86 3.633 38.275 4.395 38.275 5.364 C 38.275 8.175 46.598 6.895 46.598 13.013 C 46.576 16.569 44.101 18.772 39.871 18.772 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 62.233 14.881 L 62.233 18.413 L 49.951 18.413 L 49.951 0.345 L 62.233 0.345 L 62.233 3.946 L 54.022 3.946 L 54.022 7.549 L 60.705 7.549 L 60.705 10.787 L 54.022 10.787 L 54.022 14.905 L 62.233 14.905 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 72.313 12.565 L 69.905 12.565 L 69.905 18.437 L 65.834 18.437 L 65.834 0.345 L 72.313 0.345 C 77.328 0.345 79.376 2.328 79.376 6.534 C 79.376 10.361 77.355 12.565 72.313 12.565 Z M 72.313 3.766 L 69.905 3.766 L 69.905 9.302 L 72.313 9.302 C 74.314 9.302 75.194 8.808 75.194 6.534 C 75.194 4.352 74.428 3.766 72.313 3.766 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 91.797 14.924 L 85.246 14.924 L 84.234 18.437 L 79.939 18.437 L 86.193 0.345 L 91.031 0.345 L 97.352 18.437 L 92.808 18.437 L 91.797 14.924 Z M 88.04 5.318 L 86.238 11.506 L 90.85 11.506 L 89.118 5.318 L 88.645 3.408 L 88.578 3.408 L 88.04 5.318 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 39.736 30.157 L 39.692 31.867 L 34.382 31.867 L 34.382 23.475 L 36.299 23.475 L 36.299 30.157 L 39.736 30.157 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 44.798 31.215 L 44.778 31.215 C 44.371 31.71 43.722 31.977 42.931 31.977 C 41.648 31.977 40.818 31.257 40.818 29.727 C 40.818 28.468 41.695 27.613 43.222 27.613 C 43.722 27.613 44.168 27.68 44.527 27.796 L 44.527 27.411 C 44.527 26.736 44.168 26.421 43.244 26.421 C 42.505 26.421 42.007 26.534 41.382 26.782 L 41.245 25.387 C 41.919 25.095 42.707 24.936 43.563 24.936 C 45.563 24.936 46.263 25.792 46.263 27.658 L 46.263 31.867 L 44.933 31.867 L 44.798 31.215 Z M 44.549 28.966 C 44.393 28.896 44.056 28.828 43.583 28.828 C 42.819 28.828 42.46 29.12 42.46 29.727 C 42.46 30.38 42.842 30.63 43.427 30.63 C 44.012 30.63 44.549 30.271 44.549 29.842 L 44.549 28.966 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 50.02 32.002 C 49.21 32.002 48.466 31.842 47.883 31.529 L 48.062 30.088 C 48.625 30.405 49.41 30.561 49.996 30.561 C 50.693 30.561 50.986 30.29 50.986 29.887 C 50.986 28.807 47.84 29.436 47.84 27.051 C 47.84 25.838 48.667 24.959 50.403 24.959 C 51.075 24.959 51.752 25.095 52.336 25.32 L 52.201 26.736 C 51.64 26.512 50.897 26.396 50.381 26.396 C 49.816 26.396 49.503 26.625 49.503 26.961 C 49.503 27.995 52.603 27.366 52.603 29.707 C 52.603 31.101 51.862 32.002 50.02 32.002 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 56.026 26.375 L 56.026 29.842 C 56.026 30.36 56.295 30.582 56.836 30.582 C 57.014 30.582 57.239 30.561 57.374 30.514 L 57.464 31.776 C 57.239 31.888 56.789 31.956 56.295 31.956 C 54.946 31.956 54.27 31.169 54.27 29.887 L 54.27 26.352 L 53.506 26.352 L 53.506 25.095 L 54.337 25.095 L 54.631 23.562 L 56.002 23.451 L 56.002 25.116 L 57.51 25.116 L 57.51 26.421 L 56.026 26.421 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 60.885 32.002 C 60.073 32.002 59.331 31.842 58.748 31.529 L 58.929 30.088 C 59.49 30.405 60.275 30.561 60.862 30.561 C 61.561 30.561 61.851 30.29 61.851 29.887 C 61.851 28.807 58.702 29.436 58.702 27.051 C 58.702 25.838 59.534 24.959 61.269 24.959 C 61.943 24.959 62.615 25.095 63.203 25.32 L 63.069 26.736 C 62.505 26.512 61.764 26.396 61.246 26.396 C 60.681 26.396 60.367 26.625 60.367 26.961 C 60.367 27.995 63.47 27.366 63.47 29.707 C 63.47 31.101 62.729 32.002 60.885 32.002 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 69.365 26.736 C 69.028 26.625 68.603 26.534 68.22 26.534 C 66.958 26.534 66.53 27.051 66.53 28.49 C 66.53 29.954 67.116 30.514 68.174 30.514 C 68.623 30.514 69.05 30.425 69.41 30.271 L 69.525 31.616 C 69.119 31.867 68.511 32.002 67.792 32.002 C 65.787 32.002 64.732 30.854 64.732 28.49 C 64.732 26.242 65.653 24.981 67.835 24.981 C 68.397 24.981 69.05 25.095 69.479 25.276 L 69.365 26.736 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 75.078 31.867 L 75.078 27.546 C 75.078 26.849 74.743 26.491 74.001 26.491 C 73.508 26.491 73.055 26.714 72.855 27.008 L 72.855 31.867 L 71.122 31.867 L 71.122 23.16 L 72.855 23.069 L 72.855 24.622 L 72.83 25.52 L 72.855 25.545 C 73.348 25.116 73.979 24.959 74.541 24.959 C 75.98 24.959 76.812 25.926 76.812 27.546 L 76.812 31.867 L 75.078 31.867 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 78.658 31.867 L 78.658 25.139 L 80.052 25.072 L 80.21 26.199 L 80.231 26.199 C 80.66 25.387 81.313 24.981 82.098 24.981 C 82.39 24.981 82.663 25.028 82.84 25.072 L 82.731 26.782 C 82.528 26.714 82.257 26.667 81.985 26.667 C 81.088 26.667 80.413 27.321 80.413 28.468 L 80.413 31.867 L 78.658 31.867 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 85.382 24.35 C 84.708 24.35 84.395 24.172 84.395 23.609 C 84.395 23.136 84.708 22.867 85.382 22.867 C 86.058 22.867 86.375 23.113 86.375 23.609 C 86.354 24.105 86.058 24.35 85.382 24.35 Z M 84.484 31.867 L 84.484 25.139 L 86.259 25.072 L 86.259 31.888 L 84.484 31.888 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 88.757 31.867 L 88.757 26.375 L 87.902 26.375 L 87.902 25.095 L 88.757 25.095 L 88.757 24.798 C 88.757 23.79 89.454 22.935 91.076 22.935 C 91.459 22.935 91.885 22.979 92.178 23.069 L 92.063 24.195 C 91.863 24.147 91.636 24.126 91.411 24.126 C 90.738 24.126 90.466 24.399 90.466 24.825 L 90.466 25.072 L 91.907 25.072 L 91.907 26.352 L 90.466 26.352 L 90.466 31.842 L 88.757 31.842 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 95.486 26.375 L 95.486 29.842 C 95.486 30.36 95.754 30.582 96.296 30.582 C 96.473 30.582 96.698 30.561 96.834 30.514 L 96.924 31.776 C 96.698 31.888 96.249 31.956 95.754 31.956 C 94.406 31.956 93.729 31.169 93.729 29.887 L 93.729 26.352 L 92.965 26.352 L 92.965 25.095 L 93.798 25.095 L 94.09 23.562 L 95.461 23.451 L 95.461 25.116 L 96.969 25.116 L 96.969 26.421 L 95.486 26.421 Z" style="fill: rgb(255, 255, 255);"/>\n  <path d="M 20.357 8.826 L 15.368 5.081 L 10.379 1.334 C 10.033 1.074 9.54 1.146 9.281 1.493 L 4.883 7.322 C 4.811 7.409 4.768 7.51 4.754 7.624 C 4.68 7.93 4.782 8.248 5.043 8.45 L 8.022 10.677 L 12.042 13.698 L 15.021 15.926 C 15.281 16.13 15.629 16.13 15.888 15.97 C 15.991 15.912 16.062 15.854 16.136 15.752 L 20.531 9.91 C 20.763 9.578 20.706 9.087 20.357 8.826 Z M 10.047 1.769 L 13.012 3.995 L 13.012 3.995 L 15.021 5.5 L 17.046 7.017 L 17.046 7.017 L 20.025 9.245 C 20.142 9.332 20.156 9.491 20.082 9.607 L 19.374 10.591 L 16.005 8.058 L 12.36 5.326 L 8.976 2.809 L 9.684 1.826 C 9.772 1.709 9.931 1.682 10.047 1.769 Z M 15.673 15.463 C 15.629 15.507 15.585 15.536 15.528 15.55 C 15.469 15.564 15.398 15.55 15.339 15.507 L 12.345 13.265 L 8.34 10.257 L 5.361 8.001 C 5.302 7.958 5.275 7.9 5.259 7.842 C 5.259 7.785 5.259 7.726 5.302 7.669 L 6.113 6.585 C 6.113 6.585 7.009 5.427 7.791 4.386 L 11.16 6.917 L 14.804 9.65 L 18.173 12.181 C 17.393 13.222 16.496 14.379 16.496 14.379 L 15.673 15.463 Z" style="fill: rgb(255, 255, 255);"/>\n  <g transform="matrix(0.144619, 0, 0, 0.144619, -7.250457, -3.988513)">\n    <path d="M197.1,150.4l52-69.6l5.3-7c0,0,0.1-0.2,0.2-0.2c0.4-0.5,0.3-1.2-0.2-1.6l-14.7-10.7&#10;&#9;&#9;&#9;c-0.5-0.4-1.2-0.2-1.6,0.3c-0.1,0.1-0.2,0.2-0.2,0.2l-2,2.5l-64.3,86l-70.8,0l-26.5,87.4h177.1l-25-87.4L197.1,150.4z M79.1,234.3&#10;&#9;&#9;&#9;l24.2-80.5l65.7,0l-5.7,7.6l-8.1,11.3l-0.9,1.7l-0.9,1.9l-0.9,2.2l-0.9,2.3l-0.9,2.5l-0.9,2.5l-0.8,2.5l-0.8,2.4l-0.7,2.3&#10;&#9;&#9;&#9;l-0.7,2.1l-0.6,1.9l-0.4,1.6l-0.3,1.2l-0.3,0.7c0,0-0.1,0.2-0.2,0.4c-0.2,0.2-1.2,1.1-2,0.5c-0.8-0.6-0.7-2.6-0.6-3.6&#10;&#9;&#9;&#9;c0.2-3,0.5-6,0.7-8.9c0.1-1-1.2-1.6-2-1.2c-3.6,2.1-5.8,4.6-7.8,7.5c0.2-0.7,0.4-1.4,0.6-2c0.8-3.1,2-6.2,2.5-9.4&#10;&#9;&#9;&#9;c0.3-1.8-0.2-3.9-2.3-4.3c-2.4-0.4-3.9,2.1-5.1,3.7c-3.5,5-5.6,11.2-9.9,15.5c-1.6,1.6-3.5,2.8-5.8,2.1c-2.7-0.8-3.8,2.4,1,2.9&#10;&#9;&#9;&#9;c4.7,0.4,8.3-4.6,10.4-8.1c1.6-2.5,2.9-5.2,4.5-7.8c0.7-1.2,1.5-2.4,2.3-3.6c0.4-0.5,1-1.8,1.7-2c0.8-0.2,0.6,0.3,0.6,0.9&#10;&#9;&#9;&#9;c-0.1,1.5-0.7,3-1.1,4.5c-0.4,1.6-0.9,3.2-1.3,4.7c-0.9,3.4-1.8,6.8-2.8,10.1c-0.4,1.5,1.6,2.2,2.5,1c3.4-4.8,5.1-8.9,9.2-12.1&#10;&#9;&#9;&#9;c-0.1,1.1-0.2,2.1-0.3,3.2c-0.1,1.7-0.5,3.6-0.4,5.3c0.2,2.9,2.4,4.8,5.1,3.6c1.4-0.7,2.4-1.7,2.4-1.7l0.2-0.1l0.6-0.4l1-0.7&#10;&#9;&#9;&#9;l1.4-1l1.6-1.2l1.7-1.2l2.1-1.4l2.1-1.5l2.1-1.5l2.1-1.5l2-1.5l1.9-1.4l1.8-1.4l1.5-1.2l1.2-1.1l1-0.9l0-0.1l0,0l6.5-7.6&#10;&#9;&#9;&#9;l16.6-22.1l29.4,0l22.9,80.5H79.1z" style="fill: rgb(255, 255, 255);"/>\n    <path d="M261.1,77.1l-1.9-1.5c-0.4-0.3-0.9-0.2-1.2,0.2l-24.7,32.9c-0.3,0.4-0.2,0.9,0.2,1.2l1.9,1.5&#10;&#9;&#9;&#9;c0.4,0.3,0.9,0.2,1.2-0.2l24.7-32.9C261.5,77.9,261.5,77.4,261.1,77.1z" style="fill: rgb(255, 255, 255);"/>\n    <polygon points="161.7,217.2 210.9,217.2 209.9,213.3 161.7,213.3 113.6,213.3 112.5,217.2 &#9;&#9;" style="fill: rgb(255, 255, 255);"/>\n  </g>\n</svg>';
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
    }
}));
//# sourceMappingURL=checkout.button.render.js.map