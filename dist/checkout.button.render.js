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
            var location = win.location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if (protocol === CONSTANTS.FILE_PROTOCOL) return CONSTANTS.FILE_PROTOCOL + "//";
            if (protocol === CONSTANTS.ABOUT_PROTOCOL) {
                var parent = getParent(win);
                return parent && canReadFromWindow(win) ? getActualDomain(parent) : CONSTANTS.ABOUT_PROTOCOL + "//";
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
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
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
            }
            _createClass(ZalgoPromise, [ {
                key: "resolve",
                value: function(result) {
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                    this.resolved = !0;
                    this.value = result;
                    this.dispatch();
                    return this;
                }
            }, {
                key: "reject",
                value: function(error) {
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
                        _this2.errorHandled || function(err) {
                            if (-1 === Object(global.a)().dispatchedErrors.indexOf(err)) {
                                Object(global.a)().dispatchedErrors.push(err);
                                setTimeout(function() {
                                    throw err;
                                }, 1);
                                for (var j = 0; j < Object(global.a)().possiblyUnhandledPromiseHandlers.length; j++) Object(global.a)().possiblyUnhandledPromiseHandlers[j](err);
                            }
                        }(error);
                    }, 1);
                    this.dispatch();
                    return this;
                }
            }, {
                key: "asyncReject",
                value: function(error) {
                    this.errorHandled = !0;
                    this.reject(error);
                }
            }, {
                key: "dispatch",
                value: function() {
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
                }
            }, {
                key: "then",
                value: function(onSuccess, onError) {
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
                }
            }, {
                key: "catch",
                value: function(onError) {
                    return this.then(void 0, onError);
                }
            }, {
                key: "finally",
                value: function(handler) {
                    return this.then(function(result) {
                        return ZalgoPromise.try(handler).then(function() {
                            return result;
                        });
                    }, function(err) {
                        return ZalgoPromise.try(handler).then(function() {
                            throw err;
                        });
                    });
                }
            }, {
                key: "timeout",
                value: function(time, err) {
                    var _this4 = this;
                    if (this.resolved || this.rejected) return this;
                    var timeout = setTimeout(function() {
                        _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                    }, time);
                    return this.then(function(result) {
                        clearTimeout(timeout);
                        return result;
                    });
                }
            }, {
                key: "toPromise",
                value: function() {
                    if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                    return Promise.resolve(this);
                }
            } ], [ {
                key: "resolve",
                value: function(value) {
                    return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                        return value.then(resolve, reject);
                    }) : new ZalgoPromise().resolve(value);
                }
            }, {
                key: "reject",
                value: function(error) {
                    return new ZalgoPromise().reject(error);
                }
            }, {
                key: "all",
                value: function(promises) {
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
                }
            }, {
                key: "hash",
                value: function(promises) {
                    var result = {};
                    return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                        return ZalgoPromise.resolve(promises[key]).then(function(value) {
                            result[key] = value;
                        });
                    })).then(function() {
                        return result;
                    });
                }
            }, {
                key: "map",
                value: function(items, method) {
                    return ZalgoPromise.all(items.map(method));
                }
            }, {
                key: "onPossiblyUnhandledException",
                value: function(handler) {
                    return function(handler) {
                        Object(global.a)().possiblyUnhandledPromiseHandlers.push(handler);
                        return {
                            cancel: function() {
                                Object(global.a)().possiblyUnhandledPromiseHandlers.splice(Object(global.a)().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                            }
                        };
                    }(handler);
                }
            }, {
                key: "try",
                value: function(method, context, args) {
                    var result = void 0;
                    try {
                        result = method.apply(context, args || []);
                    } catch (err) {
                        return ZalgoPromise.reject(err);
                    }
                    return ZalgoPromise.resolve(result);
                }
            }, {
                key: "delay",
                value: function(_delay) {
                    return new ZalgoPromise(function(resolve) {
                        setTimeout(resolve, _delay);
                    });
                }
            }, {
                key: "isPromise",
                value: function(value) {
                    return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
                }
            }, {
                key: "flush",
                value: function() {
                    var promise = new ZalgoPromise();
                    Object(global.a)().flushPromises.push(promise);
                    0 === Object(global.a)().activeCount && ZalgoPromise.flushQueue();
                    return promise;
                }
            }, {
                key: "flushQueue",
                value: function() {
                    var promisesToFlush = Object(global.a)().flushPromises;
                    Object(global.a)().flushPromises = [];
                    var _iterator = promisesToFlush, _isArray = Array.isArray(_iterator), _i = 0;
                    for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if ((_i = _iterator.next()).done) break;
                            _ref = _i.value;
                        }
                        _ref.resolve();
                    }
                }
            } ]);
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
        var _logoColors, _tagLineColors, _secondaryColors, _logoColors2, _secondaryColors2, _logoColors3, _secondaryColors3, _logoColors4, _secondaryColors4, _logoColors5, _secondaryColors5, _logoColors6, _secondaryColors6, _logoColors7, _secondaryColors7, _logoColors8, _secondaryColors8, _logoColors9, _secondaryColors9, _secondaryColors10, _BUTTON_CONFIG, _FUNDING_TO_DEFAULT_L, _LABEL_TO_FUNDING, _BUTTON_STYLE, base64 = __webpack_require__("./node_modules/Base64/base64.js"), constants = __webpack_require__("./src/constants/index.js");
        function _defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        var _FUNDING_CONFIG, _CARD_CONFIG, BUTTON_CONFIG = (_defineProperty(_BUTTON_CONFIG = {}, constants.r, {
            colors: [ constants.e.GOLD, constants.e.BLUE, constants.e.SILVER, constants.e.BLACK ],
            sizes: [ constants.l.SMALL, constants.l.MEDIUM, constants.l.LARGE, constants.l.RESPONSIVE ],
            shapes: [ constants.k.PILL, constants.k.RECT ],
            layouts: [ constants.g.HORIZONTAL, constants.g.VERTICAL ],
            logoColors: (_logoColors = {}, _defineProperty(_logoColors, constants.e.GOLD, constants.i.BLUE), 
            _defineProperty(_logoColors, constants.e.SILVER, constants.i.BLUE), _defineProperty(_logoColors, constants.e.BLUE, constants.i.WHITE), 
            _defineProperty(_logoColors, constants.e.BLACK, constants.i.WHITE), _defineProperty(_logoColors, constants.e.BLACK, constants.i.WHITE), 
            _logoColors),
            tagLineColors: (_tagLineColors = {}, _defineProperty(_tagLineColors, constants.e.GOLD, constants.n.BLUE), 
            _defineProperty(_tagLineColors, constants.e.SILVER, constants.n.BLUE), _defineProperty(_tagLineColors, constants.e.BLUE, constants.n.BLUE), 
            _defineProperty(_tagLineColors, constants.e.BLACK, constants.n.BLACK), _defineProperty(_tagLineColors, constants.e.DARKBLUE, constants.n.BLUE), 
            _tagLineColors),
            secondaryColors: (_secondaryColors = {}, _defineProperty(_secondaryColors, constants.e.GOLD, constants.e.BLUE), 
            _defineProperty(_secondaryColors, constants.e.SILVER, constants.e.BLUE), _defineProperty(_secondaryColors, constants.e.BLUE, constants.e.SILVER), 
            _defineProperty(_secondaryColors, constants.e.BLACK, constants.e.BLACK), _defineProperty(_secondaryColors, constants.e.DARKBLUE, constants.e.SILVER), 
            _secondaryColors),
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
        }), _defineProperty(_BUTTON_CONFIG, constants.f.PAYPAL, {
            label: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            logoLabel: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            allowPrimary: !0,
            allowPrimaryVertical: !0,
            allowPrimaryHorizontal: !0
        }), _defineProperty(_BUTTON_CONFIG, constants.f.CHECKOUT, {
            label: "{ content: checkout }",
            logoLabel: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !0
        }), _defineProperty(_BUTTON_CONFIG, constants.f.PAY, {
            label: "{ content: pay }",
            logoLabel: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !0
        }), _defineProperty(_BUTTON_CONFIG, constants.f.BUYNOW, {
            label: "{ content: buynow }",
            logoLabel: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            defaultBranding: void 0,
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !0,
            allowUnbranded: !0
        }), _defineProperty(_BUTTON_CONFIG, constants.f.INSTALLMENT, {
            label: function(style) {
                return "{ content: " + (style.installmentperiod ? "installment_period" : "installment") + " }";
            },
            logoLabel: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " }",
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !0,
            allowSecondaryVertical: !1,
            allowSecondaryHorizontal: !1
        }), _defineProperty(_BUTTON_CONFIG, constants.f.CREDIT, {
            label: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " } { logo: " + constants.h.CREDIT + " }",
            logoLabel: "{ logo: " + constants.h.PP + " } { logo: " + constants.h.PAYPAL + " } { logo: " + constants.h.CREDIT + " }",
            tag: "{ content: later_tag }",
            colors: [ constants.e.DARKBLUE, constants.e.BLACK ],
            logoColors: (_logoColors2 = {}, _defineProperty(_logoColors2, constants.e.BLACK, constants.i.WHITE), 
            _defineProperty(_logoColors2, constants.e.DARKBLUE, constants.i.WHITE), _logoColors2),
            secondaryColors: (_secondaryColors2 = {}, _defineProperty(_secondaryColors2, constants.e.GOLD, constants.e.DARKBLUE), 
            _defineProperty(_secondaryColors2, constants.e.BLUE, constants.e.DARKBLUE), _defineProperty(_secondaryColors2, constants.e.SILVER, constants.e.DARKBLUE), 
            _defineProperty(_secondaryColors2, constants.e.BLACK, constants.e.BLACK), _secondaryColors2),
            defaultColor: constants.e.DARKBLUE,
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1,
            allowFundingIcons: !1
        }), _defineProperty(_BUTTON_CONFIG, constants.f.VENMO, {
            label: "{ logo: " + constants.h.VENMO + " }",
            logoLabel: "{ logo: " + constants.h.VENMO + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.BLUE, constants.e.SILVER, constants.e.BLACK ],
            logoColors: (_logoColors3 = {}, _defineProperty(_logoColors3, constants.e.BLUE, constants.i.WHITE), 
            _defineProperty(_logoColors3, constants.e.SILVER, constants.i.BLUE), _defineProperty(_logoColors3, constants.e.BLACK, constants.i.WHITE), 
            _logoColors3),
            secondaryColors: (_secondaryColors3 = {}, _defineProperty(_secondaryColors3, constants.e.GOLD, constants.e.BLUE), 
            _defineProperty(_secondaryColors3, constants.e.BLUE, constants.e.SILVER), _defineProperty(_secondaryColors3, constants.e.SILVER, constants.e.BLUE), 
            _defineProperty(_secondaryColors3, constants.e.BLACK, constants.e.BLACK), _defineProperty(_secondaryColors3, constants.e.DARKBLUE, constants.e.SILVER), 
            _secondaryColors3),
            allowPrimary: !0,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !0
        }), _defineProperty(_BUTTON_CONFIG, constants.f.IDEAL, {
            label: "{ logo: " + constants.h.IDEAL + " } Online betalen",
            logoLabel: "{ logo: " + constants.h.IDEAL + " } Online betalen",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK ],
            logoColors: (_logoColors4 = {}, _defineProperty(_logoColors4, constants.e.SILVER, constants.i.BLACK), 
            _defineProperty(_logoColors4, constants.e.BLACK, constants.i.WHITE), _logoColors4),
            secondaryColors: (_secondaryColors4 = {}, _defineProperty(_secondaryColors4, constants.e.GOLD, constants.e.SILVER), 
            _defineProperty(_secondaryColors4, constants.e.BLUE, constants.e.SILVER), _defineProperty(_secondaryColors4, constants.e.SILVER, constants.e.SILVER), 
            _defineProperty(_secondaryColors4, constants.e.BLACK, constants.e.BLACK), _defineProperty(_secondaryColors4, constants.e.DARKBLUE, constants.e.SILVER), 
            _secondaryColors4),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }), _defineProperty(_BUTTON_CONFIG, constants.f.ELV, {
            label: "{ logo: " + constants.h.ELV + " }",
            logoLabel: "{ logo: " + constants.h.ELV + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK ],
            logoColors: (_logoColors5 = {}, _defineProperty(_logoColors5, constants.e.SILVER, constants.i.BLACK), 
            _defineProperty(_logoColors5, constants.e.BLACK, constants.i.WHITE), _logoColors5),
            secondaryColors: (_secondaryColors5 = {}, _defineProperty(_secondaryColors5, constants.e.GOLD, constants.e.SILVER), 
            _defineProperty(_secondaryColors5, constants.e.BLUE, constants.e.SILVER), _defineProperty(_secondaryColors5, constants.e.SILVER, constants.e.SILVER), 
            _defineProperty(_secondaryColors5, constants.e.BLACK, constants.e.BLACK), _defineProperty(_secondaryColors5, constants.e.DARKBLUE, constants.e.SILVER), 
            _secondaryColors5),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }), _defineProperty(_BUTTON_CONFIG, constants.f.BANCONTACT, {
            label: "{ logo: " + constants.h.BANCONTACT + " }",
            logoLabel: "{ logo: " + constants.h.BANCONTACT + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK ],
            logoColors: (_logoColors6 = {}, _defineProperty(_logoColors6, constants.e.SILVER, constants.i.BLACK), 
            _defineProperty(_logoColors6, constants.e.BLACK, constants.i.WHITE), _logoColors6),
            secondaryColors: (_secondaryColors6 = {}, _defineProperty(_secondaryColors6, constants.e.GOLD, constants.e.SILVER), 
            _defineProperty(_secondaryColors6, constants.e.BLUE, constants.e.SILVER), _defineProperty(_secondaryColors6, constants.e.SILVER, constants.e.SILVER), 
            _defineProperty(_secondaryColors6, constants.e.BLACK, constants.e.BLACK), _defineProperty(_secondaryColors6, constants.e.DARKBLUE, constants.e.SILVER), 
            _secondaryColors6),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }), _defineProperty(_BUTTON_CONFIG, constants.f.GIROPAY, {
            label: "{ logo: " + constants.h.GIROPAY + " }",
            logoLabel: "{ logo: " + constants.h.GIROPAY + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK ],
            logoColors: (_logoColors7 = {}, _defineProperty(_logoColors7, constants.e.SILVER, constants.i.BLACK), 
            _defineProperty(_logoColors7, constants.e.BLACK, constants.i.WHITE), _logoColors7),
            secondaryColors: (_secondaryColors7 = {}, _defineProperty(_secondaryColors7, constants.e.GOLD, constants.e.SILVER), 
            _defineProperty(_secondaryColors7, constants.e.BLUE, constants.e.SILVER), _defineProperty(_secondaryColors7, constants.e.SILVER, constants.e.SILVER), 
            _defineProperty(_secondaryColors7, constants.e.BLACK, constants.e.BLACK), _defineProperty(_secondaryColors7, constants.e.DARKBLUE, constants.e.SILVER), 
            _secondaryColors7),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }), _defineProperty(_BUTTON_CONFIG, constants.f.EPS, {
            label: "{ logo: " + constants.h.EPS + " }",
            logoLabel: "{ logo: " + constants.h.EPS + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK ],
            logoColors: (_logoColors8 = {}, _defineProperty(_logoColors8, constants.e.SILVER, constants.i.BLACK), 
            _defineProperty(_logoColors8, constants.e.BLACK, constants.i.WHITE), _logoColors8),
            secondaryColors: (_secondaryColors8 = {}, _defineProperty(_secondaryColors8, constants.e.GOLD, constants.e.SILVER), 
            _defineProperty(_secondaryColors8, constants.e.BLUE, constants.e.SILVER), _defineProperty(_secondaryColors8, constants.e.SILVER, constants.e.SILVER), 
            _defineProperty(_secondaryColors8, constants.e.BLACK, constants.e.BLACK), _defineProperty(_secondaryColors8, constants.e.DARKBLUE, constants.e.SILVER), 
            _secondaryColors8),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }), _defineProperty(_BUTTON_CONFIG, constants.f.MYBANK, {
            label: "{ logo: " + constants.h.MYBANK + " }",
            logoLabel: "{ logo: " + constants.h.MYBANK + " }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.SILVER, constants.e.BLACK ],
            logoColors: (_logoColors9 = {}, _defineProperty(_logoColors9, constants.e.SILVER, constants.i.BLACK), 
            _defineProperty(_logoColors9, constants.e.BLACK, constants.i.WHITE), _logoColors9),
            secondaryColors: (_secondaryColors9 = {}, _defineProperty(_secondaryColors9, constants.e.GOLD, constants.e.SILVER), 
            _defineProperty(_secondaryColors9, constants.e.BLUE, constants.e.SILVER), _defineProperty(_secondaryColors9, constants.e.SILVER, constants.e.SILVER), 
            _defineProperty(_secondaryColors9, constants.e.BLACK, constants.e.BLACK), _defineProperty(_secondaryColors9, constants.e.DARKBLUE, constants.e.SILVER), 
            _secondaryColors9),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }), _defineProperty(_BUTTON_CONFIG, constants.f.CARD, {
            label: "{ cards }",
            logoLabel: "{ cards }",
            defaultColor: constants.e.SILVER,
            colors: [ constants.e.TRANSPARENT ],
            logoColors: _defineProperty({}, constants.e.TRANSPARENT, constants.i.BLACK),
            secondaryColors: (_secondaryColors10 = {}, _defineProperty(_secondaryColors10, constants.e.GOLD, constants.e.TRANSPARENT), 
            _defineProperty(_secondaryColors10, constants.e.BLUE, constants.e.TRANSPARENT), 
            _defineProperty(_secondaryColors10, constants.e.SILVER, constants.e.TRANSPARENT), 
            _defineProperty(_secondaryColors10, constants.e.BLACK, constants.e.TRANSPARENT), 
            _defineProperty(_secondaryColors10, constants.e.DARKBLUE, constants.e.TRANSPARENT), 
            _secondaryColors10),
            allowPrimary: !1,
            allowPrimaryVertical: !1,
            allowPrimaryHorizontal: !1
        }), _BUTTON_CONFIG), FUNDING_TO_DEFAULT_LABEL = (_defineProperty(_FUNDING_TO_DEFAULT_L = {}, constants.t.PAYPAL, constants.f.PAYPAL), 
        _defineProperty(_FUNDING_TO_DEFAULT_L, constants.t.VENMO, constants.f.VENMO), _defineProperty(_FUNDING_TO_DEFAULT_L, constants.t.CARD, constants.f.CARD), 
        _defineProperty(_FUNDING_TO_DEFAULT_L, constants.t.CREDIT, constants.f.CREDIT), 
        _defineProperty(_FUNDING_TO_DEFAULT_L, constants.t.IDEAL, constants.f.IDEAL), _defineProperty(_FUNDING_TO_DEFAULT_L, constants.t.ELV, constants.f.ELV), 
        _defineProperty(_FUNDING_TO_DEFAULT_L, constants.t.BANCONTACT, constants.f.BANCONTACT), 
        _defineProperty(_FUNDING_TO_DEFAULT_L, constants.t.GIROPAY, constants.f.GIROPAY), 
        _defineProperty(_FUNDING_TO_DEFAULT_L, constants.t.EPS, constants.f.EPS), _defineProperty(_FUNDING_TO_DEFAULT_L, constants.t.MYBANK, constants.f.MYBANK), 
        _FUNDING_TO_DEFAULT_L), LABEL_TO_FUNDING = (_defineProperty(_LABEL_TO_FUNDING = {}, constants.f.PAYPAL, constants.t.PAYPAL), 
        _defineProperty(_LABEL_TO_FUNDING, constants.f.CHECKOUT, constants.t.PAYPAL), _defineProperty(_LABEL_TO_FUNDING, constants.f.PAY, constants.t.PAYPAL), 
        _defineProperty(_LABEL_TO_FUNDING, constants.f.BUYNOW, constants.t.PAYPAL), _defineProperty(_LABEL_TO_FUNDING, constants.f.INSTALLMENT, constants.t.PAYPAL), 
        _defineProperty(_LABEL_TO_FUNDING, constants.f.CARD, constants.t.CARD), _defineProperty(_LABEL_TO_FUNDING, constants.f.CREDIT, constants.t.CREDIT), 
        _defineProperty(_LABEL_TO_FUNDING, constants.f.VENMO, constants.t.VENMO), _defineProperty(_LABEL_TO_FUNDING, constants.f.IDEAL, constants.t.IDEAL), 
        _defineProperty(_LABEL_TO_FUNDING, constants.f.BANCONTACT, constants.t.BANCONTACT), 
        _defineProperty(_LABEL_TO_FUNDING, constants.f.GIROPAY, constants.t.GIROPAY), _defineProperty(_LABEL_TO_FUNDING, constants.f.GIROPAY, constants.t.EPS), 
        _defineProperty(_LABEL_TO_FUNDING, constants.f.MYBANK, constants.t.MYBANK), _LABEL_TO_FUNDING), BUTTON_RELATIVE_STYLE = {
            FUNDINGICONS: 100,
            TAGLINE: 50,
            VERTICAL_MARGIN: 30
        }, BUTTON_STYLE = (_defineProperty(_BUTTON_STYLE = {}, constants.l.TINY, {
            defaultWidth: 75,
            defaultHeight: 25,
            minWidth: 75,
            maxWidth: 150,
            minHeight: 25,
            maxHeight: 30,
            allowFunding: !0,
            allowTagline: !1
        }), _defineProperty(_BUTTON_STYLE, constants.l.SMALL, {
            defaultWidth: 150,
            defaultHeight: 25,
            minWidth: 150,
            maxWidth: 200,
            minHeight: 25,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0
        }), _defineProperty(_BUTTON_STYLE, constants.l.MEDIUM, {
            defaultWidth: 250,
            defaultHeight: 35,
            minWidth: 200,
            maxWidth: 300,
            minHeight: 35,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0
        }), _defineProperty(_BUTTON_STYLE, constants.l.LARGE, {
            defaultWidth: 350,
            defaultHeight: 45,
            minWidth: 300,
            maxWidth: 500,
            minHeight: 30,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0
        }), _defineProperty(_BUTTON_STYLE, constants.l.HUGE, {
            defaultWidth: 500,
            defaultHeight: 55,
            minWidth: 500,
            maxWidth: 750,
            minHeight: 40,
            maxHeight: 55,
            allowFunding: !0,
            allowTagline: !0
        }), _BUTTON_STYLE);
        function getButtonConfig(label, key, def) {
            return function(conf, category, key, def) {
                var categoryConfig = conf[category];
                if (categoryConfig && categoryConfig.hasOwnProperty(key)) return categoryConfig[key];
                if (conf[constants.r] && conf[constants.r].hasOwnProperty(key)) return conf[constants.r][key];
                if (arguments.length >= 4) return def;
                throw new Error("No value found for " + category + ":" + key);
            }(BUTTON_CONFIG, label, key, def);
        }
        function config__defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        var FUNDING_PRIORITY = [ constants.t.PAYPAL, constants.t.VENMO, constants.t.CREDIT, constants.t.IDEAL, constants.t.ELV, constants.t.BANCONTACT, constants.t.GIROPAY, constants.t.EPS, constants.t.MYBANK, constants.t.CARD ], FUNDING_CONFIG = (config__defineProperty(_FUNDING_CONFIG = {}, constants.r, {
            enabled: !0,
            allowOptIn: !0,
            allowOptOut: !0,
            allowRemember: !0,
            allowHorizontal: !0,
            allowVertical: !0,
            requireCommitAsTrue: !1
        }), config__defineProperty(_FUNDING_CONFIG, constants.t.PAYPAL, {
            default: !0,
            allowOptIn: !1,
            allowOptOut: !1,
            allowHorizontal: !0,
            allowVertical: !0
        }), config__defineProperty(_FUNDING_CONFIG, constants.t.CARD, {
            default: !0,
            allowHorizontal: !1,
            allowVertical: !0
        }), config__defineProperty(_FUNDING_CONFIG, constants.t.VENMO, {
            allowOptOut: !1,
            allowedCountries: [ constants.q.US ],
            allowHorizontal: !0,
            allowVertical: !0
        }), config__defineProperty(_FUNDING_CONFIG, constants.t.CREDIT, {
            allowedCountries: [ constants.q.US, constants.q.GB, constants.q.DE ],
            defaultVerticalCountries: [ constants.q.US ],
            platforms: [ constants.w.MOBILE ],
            allowHorizontal: !0,
            allowVertical: !0
        }), config__defineProperty(_FUNDING_CONFIG, constants.t.IDEAL, {
            allowedCountries: [ constants.q.NL ],
            allowHorizontal: !0,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }), config__defineProperty(_FUNDING_CONFIG, constants.t.ELV, {
            allowedCountries: [ constants.q.DE, constants.q.AT ],
            defaultVerticalCountries: [ constants.q.DE, constants.q.AT ],
            allowHorizontal: !0,
            allowVertical: !0
        }), config__defineProperty(_FUNDING_CONFIG, constants.t.BANCONTACT, {
            allowedCountries: [ constants.q.BE ],
            allowHorizontal: !0,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }), config__defineProperty(_FUNDING_CONFIG, constants.t.GIROPAY, {
            allowedCountries: [ constants.q.DE ],
            allowHorizontal: !0,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }), config__defineProperty(_FUNDING_CONFIG, constants.t.EPS, {
            allowedCountries: [ constants.q.AT ],
            allowHorizontal: !0,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }), config__defineProperty(_FUNDING_CONFIG, constants.t.MYBANK, {
            allowedCountries: [ constants.q.IT ],
            allowHorizontal: !0,
            allowVertical: !0,
            requireCommitAsTrue: !0
        }), _FUNDING_CONFIG), CARD_CONFIG = (config__defineProperty(_CARD_CONFIG = {}, constants.r, {
            priority: [ constants.o.VISA, constants.o.MASTERCARD, constants.o.AMEX ]
        }), config__defineProperty(_CARD_CONFIG, constants.q.US, {
            priority: [ constants.o.VISA, constants.o.MASTERCARD, constants.o.AMEX, constants.o.DISCOVER ]
        }), config__defineProperty(_CARD_CONFIG, constants.q.BR, {
            priority: [ constants.o.VISA, constants.o.MASTERCARD, constants.o.AMEX, constants.o.HIPER, constants.o.ELO ]
        }), config__defineProperty(_CARD_CONFIG, constants.q.JP, {
            priority: [ constants.o.VISA, constants.o.MASTERCARD, constants.o.AMEX, constants.o.JCB ]
        }), _CARD_CONFIG);
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
        var util = __webpack_require__("./src/lib/util.js"), _slicedToArray = function() {
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) return function(arr, i) {
                    var _arr = [], _n = !0, _d = !1, _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = !0) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = !0;
                        _e = err;
                    } finally {
                        try {
                            !_n && _i.return && _i.return();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
        var normalizeProps = Object(util.b)(function(props) {
            var defs = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, env = props.env, locale = props.locale, _props$style = props.style, style = void 0 === _props$style ? {} : _props$style, funding = props.funding, commit = props.commit;
            locale = locale ? function(locale) {
                var _locale$split = locale.split("_"), _locale$split2 = _slicedToArray(_locale$split, 2), lang = _locale$split2[0];
                return {
                    country: _locale$split2[1],
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
                selected: function(label) {
                    return label ? LABEL_TO_FUNDING[label] : constants.t.PAYPAL;
                }(label),
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
                installmentperiod: installmentperiod
            };
        }), _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function htmlEncode() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
        }
        var JsxHTMLNode = function() {
            function JsxHTMLNode(name, props, children) {
                _classCallCheck(this, JsxHTMLNode);
                this.name = name;
                this.props = props;
                this.children = children;
            }
            _createClass(JsxHTMLNode, [ {
                key: "toString",
                value: function() {
                    return "<" + this.name + (this.props ? " " : "") + (this.props ? this.propsToString() : "") + ">" + this.childrenToString() + "</" + this.name + ">";
                }
            }, {
                key: "propsToString",
                value: function() {
                    var props = this.props;
                    return props ? Object.keys(props).filter(function(key) {
                        return "innerHTML" !== key && props && !1 !== props[key];
                    }).map(function(key) {
                        return props && !0 === props[key] ? "" + htmlEncode(key) : props ? htmlEncode(key) + '="' + htmlEncode(props[key]) + '"' : "";
                    }).join(" ") : "";
                }
            }, {
                key: "childrenToString",
                value: function() {
                    if (this.props && this.props.innerHTML) return this.props.innerHTML;
                    if (!this.children) return "";
                    var result = "";
                    !function iterate(children) {
                        var _iterator = children, _isArray = Array.isArray(_iterator), _i = 0;
                        for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if ((_i = _iterator.next()).done) break;
                                _ref = _i.value;
                            }
                            var child = _ref;
                            null !== child && void 0 !== child && (Array.isArray(child) ? iterate(child) : result += child instanceof JsxHTMLNode ? child.toString() : htmlEncode(child));
                        }
                    }(this.children);
                    return result;
                }
            } ]);
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
            }(JsxHTMLNodeContainer, JsxHTMLNode);
            function JsxHTMLNodeContainer(children) {
                _classCallCheck(this, JsxHTMLNodeContainer);
                return function(self, call) {
                    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !call || "object" != typeof call && "function" != typeof call ? self : call;
                }(this, (JsxHTMLNodeContainer.__proto__ || Object.getPrototypeOf(JsxHTMLNodeContainer)).call(this, "", {}, children));
            }
            _createClass(JsxHTMLNodeContainer, [ {
                key: "toString",
                value: function() {
                    return this.childrenToString();
                }
            } ]);
            return JsxHTMLNodeContainer;
        }();
        function jsxToHTML(name, props) {
            for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
            return new JsxHTMLNode(name, props, children);
        }
        var _BUTTON_LOGO$PP, _BUTTON_LOGO$PAYPAL, _BUTTON_LOGO$VENMO, _BUTTON_LOGO$ELV, _BUTTON_LOGO$BANCONTA, _BUTTON_LOGO$GIROPAY, _BUTTON_LOGO$EPS, _BUTTON_LOGO$MYBANK, _fundingLogos, pp_white = __webpack_require__("./src/resources/fundingLogos/pp_white.svg"), pp_white_default = __webpack_require__.n(pp_white), pp_blue = __webpack_require__("./src/resources/fundingLogos/pp_blue.svg"), pp_blue_default = __webpack_require__.n(pp_blue), pp_black = __webpack_require__("./src/resources/fundingLogos/pp_black.svg"), pp_black_default = __webpack_require__.n(pp_black), paypal_white = __webpack_require__("./src/resources/fundingLogos/paypal_white.svg"), paypal_white_default = __webpack_require__.n(paypal_white), paypal_blue = __webpack_require__("./src/resources/fundingLogos/paypal_blue.svg"), paypal_blue_default = __webpack_require__.n(paypal_blue), paypal_black = __webpack_require__("./src/resources/fundingLogos/paypal_black.svg"), paypal_black_default = __webpack_require__.n(paypal_black), credit_white = __webpack_require__("./src/resources/fundingLogos/credit_white.svg"), credit_white_default = __webpack_require__.n(credit_white), venmo_white = __webpack_require__("./src/resources/fundingLogos/venmo_white.svg"), venmo_white_default = __webpack_require__.n(venmo_white), venmo_blue = __webpack_require__("./src/resources/fundingLogos/venmo_blue.svg"), venmo_blue_default = __webpack_require__.n(venmo_blue), ideal = __webpack_require__("./src/resources/fundingLogos/ideal.svg"), ideal_default = __webpack_require__.n(ideal), elv = __webpack_require__("./src/resources/fundingLogos/elv.svg"), elv_default = __webpack_require__.n(elv), elv_white = __webpack_require__("./src/resources/fundingLogos/elv_white.svg"), elv_white_default = __webpack_require__.n(elv_white), bancontact = __webpack_require__("./src/resources/fundingLogos/bancontact.svg"), bancontact_default = __webpack_require__.n(bancontact), bancontact_white = __webpack_require__("./src/resources/fundingLogos/bancontact_white.svg"), bancontact_white_default = __webpack_require__.n(bancontact_white), giropay = __webpack_require__("./src/resources/fundingLogos/giropay.svg"), giropay_default = __webpack_require__.n(giropay), giropay_white = __webpack_require__("./src/resources/fundingLogos/giropay_white.svg"), giropay_white_default = __webpack_require__.n(giropay_white), eps = __webpack_require__("./src/resources/fundingLogos/eps.svg"), eps_default = __webpack_require__.n(eps), eps_white = __webpack_require__("./src/resources/fundingLogos/eps_white.svg"), eps_white_default = __webpack_require__.n(eps_white), mybank = __webpack_require__("./src/resources/fundingLogos/mybank.svg"), mybank_default = __webpack_require__.n(mybank), mybank_white = __webpack_require__("./src/resources/fundingLogos/mybank_white.svg"), mybank_white_default = __webpack_require__.n(mybank_white);
        function fundingLogos__defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        var _cardLogos, fundingLogos = (fundingLogos__defineProperty(_fundingLogos = {}, constants.h.PP, (fundingLogos__defineProperty(_BUTTON_LOGO$PP = {}, constants.i.WHITE, pp_white_default.a), 
        fundingLogos__defineProperty(_BUTTON_LOGO$PP, constants.i.BLUE, pp_blue_default.a), 
        fundingLogos__defineProperty(_BUTTON_LOGO$PP, constants.i.BLACK, pp_black_default.a), 
        _BUTTON_LOGO$PP)), fundingLogos__defineProperty(_fundingLogos, constants.h.PAYPAL, (fundingLogos__defineProperty(_BUTTON_LOGO$PAYPAL = {}, constants.i.WHITE, paypal_white_default.a), 
        fundingLogos__defineProperty(_BUTTON_LOGO$PAYPAL, constants.i.BLUE, paypal_blue_default.a), 
        fundingLogos__defineProperty(_BUTTON_LOGO$PAYPAL, constants.i.BLACK, paypal_black_default.a), 
        _BUTTON_LOGO$PAYPAL)), fundingLogos__defineProperty(_fundingLogos, constants.h.CREDIT, fundingLogos__defineProperty({}, constants.i.WHITE, credit_white_default.a)), 
        fundingLogos__defineProperty(_fundingLogos, constants.h.VENMO, (fundingLogos__defineProperty(_BUTTON_LOGO$VENMO = {}, constants.i.WHITE, venmo_white_default.a), 
        fundingLogos__defineProperty(_BUTTON_LOGO$VENMO, constants.i.BLUE, venmo_blue_default.a), 
        _BUTTON_LOGO$VENMO)), fundingLogos__defineProperty(_fundingLogos, constants.h.IDEAL, fundingLogos__defineProperty({}, constants.i.ANY, ideal_default.a)), 
        fundingLogos__defineProperty(_fundingLogos, constants.h.ELV, (fundingLogos__defineProperty(_BUTTON_LOGO$ELV = {}, constants.i.ANY, elv_default.a), 
        fundingLogos__defineProperty(_BUTTON_LOGO$ELV, constants.i.WHITE, elv_white_default.a), 
        _BUTTON_LOGO$ELV)), fundingLogos__defineProperty(_fundingLogos, constants.h.BANCONTACT, (fundingLogos__defineProperty(_BUTTON_LOGO$BANCONTA = {}, constants.i.ANY, bancontact_default.a), 
        fundingLogos__defineProperty(_BUTTON_LOGO$BANCONTA, constants.i.WHITE, bancontact_white_default.a), 
        _BUTTON_LOGO$BANCONTA)), fundingLogos__defineProperty(_fundingLogos, constants.h.GIROPAY, (fundingLogos__defineProperty(_BUTTON_LOGO$GIROPAY = {}, constants.i.ANY, giropay_default.a), 
        fundingLogos__defineProperty(_BUTTON_LOGO$GIROPAY, constants.i.WHITE, giropay_white_default.a), 
        _BUTTON_LOGO$GIROPAY)), fundingLogos__defineProperty(_fundingLogos, constants.h.EPS, (fundingLogos__defineProperty(_BUTTON_LOGO$EPS = {}, constants.i.ANY, eps_default.a), 
        fundingLogos__defineProperty(_BUTTON_LOGO$EPS, constants.i.WHITE, eps_white_default.a), 
        _BUTTON_LOGO$EPS)), fundingLogos__defineProperty(_fundingLogos, constants.h.MYBANK, (fundingLogos__defineProperty(_BUTTON_LOGO$MYBANK = {}, constants.i.ANY, mybank_default.a), 
        fundingLogos__defineProperty(_BUTTON_LOGO$MYBANK, constants.i.WHITE, mybank_white_default.a), 
        _BUTTON_LOGO$MYBANK)), _fundingLogos), visa = __webpack_require__("./src/resources/cardLogos/visa.svg"), visa_default = __webpack_require__.n(visa), amex = __webpack_require__("./src/resources/cardLogos/amex.svg"), amex_default = __webpack_require__.n(amex), mastercard = __webpack_require__("./src/resources/cardLogos/mastercard.svg"), mastercard_default = __webpack_require__.n(mastercard), discover = __webpack_require__("./src/resources/cardLogos/discover.svg"), discover_default = __webpack_require__.n(discover), hiper = __webpack_require__("./src/resources/cardLogos/hiper.svg"), hiper_default = __webpack_require__.n(hiper), elo = __webpack_require__("./src/resources/cardLogos/elo.svg"), elo_default = __webpack_require__.n(elo), jcb = __webpack_require__("./src/resources/cardLogos/jcb.svg"), jcb_default = __webpack_require__.n(jcb);
        function cardLogos__defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        var cardLogos = (cardLogos__defineProperty(_cardLogos = {}, constants.o.VISA, visa_default.a), 
        cardLogos__defineProperty(_cardLogos, constants.o.AMEX, amex_default.a), cardLogos__defineProperty(_cardLogos, constants.o.MASTERCARD, mastercard_default.a), 
        cardLogos__defineProperty(_cardLogos, constants.o.DISCOVER, discover_default.a), 
        cardLogos__defineProperty(_cardLogos, constants.o.HIPER, hiper_default.a), cardLogos__defineProperty(_cardLogos, constants.o.ELO, elo_default.a), 
        cardLogos__defineProperty(_cardLogos, constants.o.JCB, jcb_default.a), _cardLogos), config = __webpack_require__("./src/config/index.js"), validate__slicedToArray = function() {
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) return function(arr, i) {
                    var _arr = [], _n = !0, _d = !1, _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = !0) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = !0;
                        _e = err;
                    } finally {
                        try {
                            !_n && _i.return && _i.return();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
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
                if (style[constants.m.LABEL]) throw new Error("style." + constants.m.LABEL + " option is not allowed for " + constants.g.VERTICAL + " layout - got " + label);
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
                var _locale$split = locale.split("_"), _locale$split2 = validate__slicedToArray(_locale$split, 2), lang = _locale$split2[0], country = _locale$split2[1];
                if (!config.a.locales[country] || -1 === config.a.locales[country].indexOf(lang)) throw new Error("Expected props.locale to be valid");
            }(locale);
            validateButtonStyle(style, props);
        }
        var pageStyle = "\n    html, body {\n        padding: 0;\n        margin: 0;\n        width: 100%;\n        overflow: hidden;\n        text-align: center;\n    }\n\n    * {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        cursor: default;\n    }\n", CLASS = {
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
        }, buttonStyle = "\n\n    ." + CLASS.CONTAINER + ' {\n        display: block;\n        white-space: nowrap;\n        margin: 0;\n        background: 0;\n        border: 0;\n        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n        text-transform: none;\n        font-weight: 500;R\n        -webkit-font-smoothing: antialiased;\n        font-smoothing: antialiased;\n        z-index: 0;\n        font-size: 0;\n        width: 100%;\n        box-sizing: border-box;\n    }\n\n    .' + CLASS.BUTTON + ":not(." + CLASS.CARD + ") {\n        border: 1px solid transparent;\n        border-radius: 0 3px 3px 0;\n        position: relative;\n        width: 100%;\n        box-sizing: border-box;\n        border: none;\n        vertical-align: top;\n        cursor: pointer;\n        outline: none;\n        overflow: hidden;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.TRANSPARENT + " {\n        cursor: auto;\n    }\n\n    ." + CLASS.BUTTON + " * {\n        cursor: pointer;\n    }\n\n    ." + CLASS.CONTAINER + "." + CLASS.ENV + "-" + constants.s.TEST + " ." + CLASS.TEXT + " {\n        font-family: Arial !important;\n        background: rgba(0, 0, 0, 0.5) !important;\n        color: transparent  !important;\n        text-shadow: none  !important;\n    }\n\n    ." + CLASS.BUTTON + ":hover {\n        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.GOLD + ":hover,\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.SILVER + ":hover {\n        box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.05);\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.TRANSPARENT + ":hover {\n        box-shadow: none;\n    }\n\n    ." + CLASS.CARD + ", ." + CLASS.CARD + " * {\n        cursor: pointer;\n    }\n\n    ." + CLASS.CARD + ":hover {\n        filter: brightness(1.2);\n    }\n\n    ." + CLASS.BUTTON + ":focus {\n        box-shadow: -1px -1px 18px 1px rgba(0, 0, 0, 0.25) inset;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.TRANSPARENT + ":focus {\n        box-shadow: none;\n    }\n\n    ." + CLASS.LOGO + " {\n        padding: 0;\n        display: inline-block;\n        background: none;\n        border: none;\n        width: auto;\n    }\n\n    ." + CLASS.TEXT + " {\n        display: inline-block;\n        white-space: pre-wrap;\n    }\n\n    ." + CLASS.BUTTON + " ." + CLASS.LOGO + ",\n    ." + CLASS.BUTTON + " ." + CLASS.TEXT + " {\n        vertical-align: top;\n        position: relative;\n        top: 50%;\n        transform: translateY(-50%);\n        -webkit-transform: translateY(-50%);\n        -moz-transform: translateY(-50%);\n        -ms-transform: translateY(-50%);\n        -o-transform: translateY(-50%);\n        text-align: left;\n    }\n\n    ." + CLASS.BUTTON + " ." + CLASS.CARD + " {\n        border-radius: 4px;\n    }\n\n    ." + CLASS.BUTTON + " ." + CLASS.TEXT + " {\n        visibility: hidden;\n    }\n\n    ." + CLASS.TAGLINE + " {\n        max-width: 100%;\n        font-weight: normal;\n        display: block;\n        text-align: center;\n        width: auto;\n        visibility: hidden;\n    }\n\n    ." + CLASS.SEPARATOR + " {\n        height: 80%;\n        border-left: 1px solid rgba(0, 0, 0, 0.15);\n        margin: 0 8px;\n        display: inline-block;\n        position: relative;\n        top: 10%;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.BLACK + " ." + CLASS.SEPARATOR + " {\n        border-color: rgba(255, 255, 255, 0.45);\n    }\n", layoutStyle = "\n\n    ." + CLASS.CONTAINER + "." + CLASS.LAYOUT + "-" + constants.g.VERTICAL + " ." + CLASS.TAGLINE + " {\n        display: none;\n    }\n", brandingStyle = "\n\n    ." + CLASS.BUTTON + "." + CLASS.BRANDING + "-" + constants.d.UNBRANDED + "  {\n        min-width: 60%;\n        width: auto;\n        font-weight: 900;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.BRANDING + "-" + constants.d.UNBRANDED + " ." + CLASS.LOGO + " {\n        display: none;\n    }\n", labelStyle = "\n\n    ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + constants.f.CARD + " {\n        border-radius: 0 !important;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + constants.f.CREDIT + " ." + CLASS.TEXT + " {\n        display: none !important;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.LAYOUT + "-" + constants.g.HORIZONTAL + "." + CLASS.NUMBER + "-" + constants.j.MULTIPLE + "." + CLASS.LABEL + "-" + constants.f.CREDIT + " ." + CLASS.LOGO + "." + CLASS.LOGO + "-" + constants.h.PAYPAL + " {\n        display: none;\n    }\n\n    @media only screen and (max-width : " + BUTTON_STYLE[constants.l.SMALL].minWidth + "px) {\n\n        ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + constants.f.CREDIT + " ." + CLASS.LOGO + "." + CLASS.LOGO + "-" + constants.h.PAYPAL + " {\n            display: none;\n        }\n    }\n\n    @media only screen and (min-width : " + BUTTON_STYLE[constants.l.SMALL].minWidth + "px) {\n\n        ." + CLASS.BUTTON + "." + CLASS.LABEL + "-" + constants.f.CREDIT + " ." + CLASS.LOGO + "." + CLASS.LOGO + "-" + constants.h.PAYPAL + " {\n            display: inline-block;\n        }\n    }\n", DUAL_BUTTON_MIN_RATIO = 2.8;
        var buttonColorStyle = "\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.GOLD + " {\n        background: #ffc439;\n        color: #111;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.BLUE + " {\n        background: #009cde;\n        color: #fff;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.SILVER + " {\n        background: #eee;\n        color: #111;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.BLACK + " {\n        background: #2C2E2F;\n        color: #fff;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.DARKBLUE + " {\n        background: #003087;\n        color: #fff;\n    }\n\n    ." + CLASS.BUTTON + "." + CLASS.COLOR + "-" + constants.e.TRANSPARENT + " {\n        background: transparent;\n        color: #111;\n    }\n";
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
        __webpack_exports__.componentTemplate = function(_ref13) {
            var props = _ref13.props;
            if (props && props.style) {
                var style = props.style;
                "generic" === style.label && (style.label = "paypal");
                "creditblue" === style.color && delete style.color;
                1 !== style.maxbuttons || !1 !== style.tagline || "responsive" !== style.size || "horizontal" !== style.layout || style.height || (style.height = 44);
            }
            validateButtonProps(props);
            var _normalizeProps = normalizeProps(props), label = _normalizeProps.label, locale = _normalizeProps.locale, color = _normalizeProps.color, shape = _normalizeProps.shape, branding = _normalizeProps.branding, tagline = _normalizeProps.tagline, funding = _normalizeProps.funding, layout = _normalizeProps.layout, sources = _normalizeProps.sources, multiple = _normalizeProps.multiple, fundingicons = _normalizeProps.fundingicons, env = _normalizeProps.env, height = _normalizeProps.height, cards = _normalizeProps.cards, installmentperiod = _normalizeProps.installmentperiod, buttonNodes = function(_ref3) {
                var label = _ref3.label, color = _ref3.color, sources = _ref3.sources, multiple = _ref3.multiple;
                return sources.map(function(source, i) {
                    var buttonLabel = multiple ? FUNDING_TO_DEFAULT_LABEL[source] : label, buttonColor = multiple && i > 0 ? getButtonConfig(buttonLabel, "secondaryColors")[color] : color;
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
                multiple: multiple
            }).map(function(button, i) {
                return function(_ref9) {
                    var _ref10, label = _ref9.label, color = _ref9.color, locale = _ref9.locale, branding = _ref9.branding, multiple = _ref9.multiple, layout = _ref9.layout, shape = _ref9.shape, source = _ref9.source, funding = _ref9.funding, i = _ref9.i, env = _ref9.env, cards = _ref9.cards, installmentperiod = _ref9.installmentperiod, logoColor = getButtonConfig(label, "logoColors")[color], contentText = getButtonConfig(label, multiple ? "logoLabel" : "label"), dynamicContent = {
                        installmentperiod: installmentperiod
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
                        dynamicContent: dynamicContent
                    });
                    return jsxToHTML("div", _extends({}, (componentTemplate__defineProperty(_ref10 = {}, constants.c.FUNDING_SOURCE, source), 
                    componentTemplate__defineProperty(_ref10, constants.c.BUTTON, !0), _ref10), {
                        class: CLASS.BUTTON + " " + CLASS.NUMBER + "-" + i + " " + getCommonButtonClasses({
                            layout: layout,
                            shape: shape,
                            branding: branding,
                            multiple: multiple,
                            env: env
                        }) + " " + function(_ref2) {
                            var label = _ref2.label, color = _ref2.color, logoColor = _ref2.logoColor;
                            return [ CLASS.LABEL + "-" + label, CLASS.COLOR + "-" + color, CLASS.LOGO_COLOR + "-" + logoColor ].join(" ");
                        }({
                            label: label,
                            color: color,
                            logoColor: logoColor
                        }),
                        role: "button",
                        "aria-label": source,
                        tabindex: "0"
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
                    installmentperiod: installmentperiod
                });
            }), taglineNode = function(_ref11) {
                var label = _ref11.label, tagline = _ref11.tagline, color = _ref11.color, locale = _ref11.locale, multiple = _ref11.multiple, env = _ref11.env, cards = _ref11.cards;
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
            }), fundingiconNode = function(_ref6) {
                var cards = _ref6.cards;
                if (!_ref6.fundingicons) return;
                return jsxToHTML("div", {
                    class: "" + CLASS.FUNDINGICONS
                }, renderCards({
                    cards: cards,
                    button: !0
                }));
            }({
                cards: cards,
                fundingicons: fundingicons
            }), styleNode = function(_ref12) {
                var height = _ref12.height, cardNumber = _ref12.cardNumber;
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
            }));
            var script;
            return jsxToHTML("div", _extends({}, componentTemplate__defineProperty({}, constants.c.VERSION, "4.0.202"), {
                class: CLASS.CONTAINER + " " + getCommonButtonClasses({
                    layout: layout,
                    shape: shape,
                    branding: branding,
                    multiple: multiple,
                    env: env
                })
            }), styleNode, buttonNodes, taglineNode || fundingiconNode, scriptNode).toString();
        };
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        function componentTemplate__defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        function getCommonButtonClasses(_ref) {
            var layout = _ref.layout, shape = _ref.shape, branding = _ref.branding, multiple = _ref.multiple, env = _ref.env;
            return [ CLASS.LAYOUT + "-" + layout, CLASS.SHAPE + "-" + shape, CLASS.BRANDING + "-" + (branding ? constants.d.BRANDED : constants.d.UNBRANDED), CLASS.NUMBER + "-" + (multiple ? constants.j.MULTIPLE : constants.j.SINGLE), CLASS.ENV + "-" + env ].join(" ");
        }
        function renderCards(_ref4) {
            var cards = _ref4.cards, button = _ref4.button;
            return cards.map(function(name) {
                var _ref5, logo = cardLogos[name];
                return jsxToHTML("img", _extends({}, (componentTemplate__defineProperty(_ref5 = {}, constants.c.BUTTON, button || !1), 
                componentTemplate__defineProperty(_ref5, constants.c.FUNDING_SOURCE, "" + constants.t.CARD), 
                componentTemplate__defineProperty(_ref5, constants.c.CARD, "" + name), _ref5), {
                    class: CLASS.CARD + " " + CLASS.CARD + "-" + name + " " + (button ? CLASS.BUTTON : ""),
                    src: "data:image/svg+xml;base64," + Object(base64.btoa)(logo),
                    alt: name
                }));
            });
        }
        function renderContent(text, _ref7) {
            var template, renderers, nodes, label = _ref7.label, locale = _ref7.locale, color = _ref7.color, branding = _ref7.branding, logoColor = _ref7.logoColor, funding = _ref7.funding, env = _ref7.env, _cards = _ref7.cards, dynamicContent = _ref7.dynamicContent, _content = function(locale) {
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
                        if (!logoColor) throw new Error("Can not determine logo without logo color");
                        var logo = fundingLogos[name][logoColor] || fundingLogos[name][constants.i.ANY];
                        return jsxToHTML("img", {
                            class: CLASS.LOGO + " " + CLASS.LOGO + "-" + name + " " + CLASS.LOGO + "-" + color,
                            src: "data:image/svg+xml;base64," + Object(base64.btoa)(logo),
                            alt: name
                        });
                    }
                },
                content: function(name) {
                    var contentString = void 0, _iterator = name.split("|"), _isArray = Array.isArray(_iterator), _i = 0;
                    for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref8;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref8 = _iterator[_i++];
                        } else {
                            if ((_i = _iterator.next()).done) break;
                            _ref8 = _i.value;
                        }
                        var key = _ref8;
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
        module.exports = '{\n    "AD": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        },\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        }\n    },\n    "AG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AL": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "AM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AN": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AO": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AR": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "AT": {\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "Einfach schneller und sicherer bezahlen",\n            "later_tag": "Kaufen Sie jetzt und bezahlen Sie nach und nach.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "AU": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "AW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "AZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "BB": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BE": {\n        "en": {\n            "checkout": "Pay with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "nl": {\n            "checkout": "Betalen met {logo:pp} {logo:paypal}",\n            "safer_tag": "De veiligere en snellere manier om te betalen.",\n\n            "later_tag": "Koop nu. Betaal later.",\n            "pay": "Betalen met {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Nu kopen"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Le r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        }\n    },\n    "BF": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "BH": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BI": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BJ": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "BO": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BR": {\n        "pt": {\n            "checkout": "{logo:pp} {logo:paypal} Finalizar",\n            "safer_tag": "A maneira f\\u00e1cil e segura de enviar pagamentos.",\n            "later_tag": "Compre agora e pague depois.",\n            "pay": "Pague com {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar agora",\n            "installment": "{logo:pp} {logo:paypal}  Pagamentos<br>  sem juros",\n            "installment_period": "{logo:pp} {logo:paypal}  Pague em at\\u00e9<br>  [installmentperiod]x sem juros"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "installment": "{logo:pp} {logo:paypal}  Interest free<br>  payments",\n            "installment_period": "{logo:pp} {logo:paypal}  Pay up to [installmentperiod]x<br>  without interest"\n        }\n    },\n    "BS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BT": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "BW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "BY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "BZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "C2": {\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f\\u3002",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "CA": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer",\n            "later_tag": "Acheter. Payer plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        }\n    },\n    "CD": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CH": {\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "Einfach schneller und sicherer bezahlen",\n            "later_tag": "Kaufen Sie jetzt und bezahlen Sie nach und nach.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Le r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "CI": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "CK": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CL": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CM": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "CN": {\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CO": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CR": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CV": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "CY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "CZ": {\n        "cs": {\n            "checkout": "Zaplatit p\\u0159es {logo:pp} {logo:paypal}",\n            "safer_tag": "Jednodu\\u0161\\u0161\\u00ed a\\u00a0bezpe\\u010dn\\u011bj\\u0161\\u00ed zp\\u016fsob placen\\u00ed",\n            "later_tag": "Nakupujte nyn\\u00ed, pla\\u0165te pozd\\u011bji.",\n            "pay": "Zaplatit p\\u0159es {logo: paypal}",\n            "buynow": "Koupit ihned p\\u0159es {logo:pp} {logo:paypal}"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "DE": {\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u00dcberall schnell und sicher bezahlen.",\n            "later_tag": "Kaufen Sie jetzt und bezahlen Sie nach und nach.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "DJ": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "DK": {\n        "da": {\n            "checkout": "{logo:pp} {logo:paypal} Betal",\n            "safer_tag": "Betal nemt og sikkert",\n            "later_tag": "K\\u00f8b nu, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} K\\u00f8b nu"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "DM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "DO": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "DZ": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "EC": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "EE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "ru": {\n            "checkout": "\\u041e\\u0444\\u043e\\u0440\\u043c\\u0438\\u0442\\u044c \\u0437\\u0430\\u043a\\u0430\\u0437 \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0411\\u043e\\u043b\\u0435\\u0435 \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u044b\\u0439 \\u0438 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e\\u0439 \\u0441\\u043f\\u043e\\u0441\\u043e\\u0431 \\u043e\\u043f\\u043b\\u0430\\u0442\\u044b.",\n            "later_tag": "\\u041f\\u043e\\u043a\\u0443\\u043f\\u0430\\u0439\\u0442\\u0435 \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441, \\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u0435 \\u043f\\u043e\\u0442\\u043e\\u043c.",\n            "pay": "\\u041e\\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u044c \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u041a\\u0443\\u043f\\u0438\\u0442\\u044c \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "EG": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ER": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ES": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "ET": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "FI": {\n        "fi": {\n            "checkout": "{logo:pp} {logo:paypal}-maksu",\n            "safer_tag": "Turvallisempi ja helpompi maksutapa",\n\n            "later_tag": "Osta nyt. Maksa v\\u00e4hitellen.",\n            "pay": "{logo:paypal}-maksu",\n            "buynow": "{logo:pp} {logo:paypal} Osta nyt"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "FJ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "FK": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "FM": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "FO": {\n        "da": {\n            "checkout": "Betal med {logo:pp} {logo:paypal}",\n            "safer_tag": "Betal nemt og sikkert",\n\n            "later_tag": "K\\u00f8b nu, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} K\\u00f8b nu"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "FR": {\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Pay",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "GA": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GB": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "GD": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GL": {\n        "da": {\n            "checkout": "Betal med {logo:pp} {logo:paypal}",\n            "safer_tag": "Betal nemt og sikkert",\n\n            "later_tag": "K\\u00f8b nu, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} K\\u00f8b nu"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GN": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GP": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GR": {\n        "el": {\n            "checkout": "\\u039f\\u03bb\\u03bf\\u03ba\\u03bb\\u03ae\\u03c1\\u03c9\\u03c3\\u03b7 \\u03b1\\u03b3\\u03bf\\u03c1\\u03ac\\u03c2 \\u03bc\\u03ad\\u03c3\\u03c9 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u039f \\u03b1\\u03c3\\u03c6\\u03b1\\u03bb\\u03ad\\u03c3\\u03c4\\u03b5\\u03c1\\u03bf\\u03c2 \\u03ba\\u03b1\\u03b9 \\u03b5\\u03c5\\u03ba\\u03bf\\u03bb\\u03cc\\u03c4\\u03b5\\u03c1\\u03bf\\u03c2 \\u03c4\\u03c1\\u03cc\\u03c0\\u03bf\\u03c2 \\u03c0\\u03bb\\u03b7\\u03c1\\u03c9\\u03bc\\u03ae\\u03c2",\n\n            "later_tag": "\\u0391\\u03b3\\u03bf\\u03c1\\u03ac\\u03c3\\u03c4\\u03b5 \\u03c4\\u03ce\\u03c1\\u03b1.  \\u03a0\\u03bb\\u03b7\\u03c1\\u03ce\\u03c3\\u03c4\\u03b5 \\u03c3\\u03b5 \\u03b4\\u03cc\\u03c3\\u03b5\\u03b9\\u03c2.",\n            "pay": "\\u03a0\\u03bb\\u03b7\\u03c1\\u03c9\\u03bc\\u03ae \\u03bc\\u03ad\\u03c3\\u03c9 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0391\\u03b3\\u03bf\\u03c1\\u03ac \\u03c4\\u03ce\\u03c1\\u03b1"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GT": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "GY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "HK": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal} \\u7d50\\u5e33",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u65b9\\u4fbf\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u5148\\u8cfc\\u8cb7\\uff0c\\u5f8c\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u4f7f\\u7528 {logo:paypal} \\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8cb7"\n        }\n    },\n    "HN": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "HR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "HU": {\n        "hu": {\n            "checkout": "{logo:pp} {logo:paypal}-fizet\\u00e9s",\n            "safer_tag": "Biztons\\u00e1gosabb, k\\u00f6nnyebb fizet\\u00e9si m\\u00f3d.",\n\n            "later_tag": "V\\u00e1s\\u00e1roljon most. Fizessen k\\u00e9s\\u0151bb.",\n            "pay": "{logo:paypal}-fizet\\u00e9s",\n            "buynow": "{logo:pp} {logo:paypal} V\\u00e1s\\u00e1rl\\u00e1s"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ID": {\n        "id": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "Cara yang lebih mudah dan aman untuk membayar.",\n\n            "later_tag": "Beli Sekarang. Bayar dalam Jangka Waktu Tertentu.",\n            "pay": "Bayar dengan {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Beli Sekarang"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "IE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "IL": {\n        "he": {\n            "checkout": "{logo:pp} {logo:paypal} \\u05e9\\u05dc\\u05dd",\n            "safer_tag": ".\\u05d4\\u05d3\\u05e8\\u05da \\u05d4\\u05e7\\u05dc\\u05d4 \\u05d5\\u05d4\\u05d1\\u05d8\\u05d5\\u05d7\\u05d4 \\u05d9\\u05d5\\u05ea\\u05e8 \\u05dc\\u05e9\\u05dc\\u05dd",\n\n            "later_tag": "\\u05e7\\u05e0\\u05d4 \\u05e2\\u05db\\u05e9\\u05d9\\u05d5. \\u05e9\\u05dc\\u05dd \\u05dc\\u05d0\\u05d5\\u05e8\\u05da \\u05d6\\u05de\\u05df.",\n            "pay": "\\u05e9\\u05dc\\u05dd \\u05d1\\u05d0\\u05de\\u05e6\\u05e2\\u05d5\\u05ea {logo:paypal}\\u200f",\n            "buynow": "{logo:pp} {logo:paypal} \\u05e7\\u05e0\\u05d4 \\u05e2\\u05db\\u05e9\\u05d9\\u05d5"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "IN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "IS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "IT": {\n        "it": {\n            "checkout": "{logo:pp} {logo:paypal} Paga adesso",\n            "safer_tag": "Il modo rapido e sicuro per pagare",\n\n            "later_tag": "Acquista ora. Paga pi\\u00f9 tardi.",\n            "pay": "Paga con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Paga adesso"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "JM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "JO": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "JP": {\n        "ja": {\n            "checkout": "{logo:pp} {logo:paypal}\\u3067\\u652f\\u6255\\u3046",\n            "safer_tag": "\\u3088\\u308a\\u5b89\\u5168\\u30fb\\u7c21\\u5358\\u306b\\u304a\\u652f\\u6255\\u3044",\n\n            "later_tag": "\\u4eca\\u3059\\u3050\\u8cfc\\u5165\\u3057\\u3066\\u3001\\u5206\\u5272\\u3057\\u3066\\u304a\\u652f\\u6255\\u3044\\u3002",\n            "pay": "{logo:paypal}\\u3067\\u652f\\u6255\\u3046",\n            "buynow": "{logo:pp} {logo:paypal} \\u8cfc\\u5165"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "KE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KH": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "KI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KM": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KN": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KR": {\n        "ko": {\n            "checkout": "{logo:pp} {logo:paypal} \\uccb4\\ud06c \\uc544\\uc6c3",\n            "safer_tag": "\\ub354 \\uc548\\uc804\\ud558\\uace0 \\ube60\\ub978 \\uacb0\\uc81c \\ubc29\\ubc95",\n\n            "later_tag": "\\uc9c0\\uae08 \\uad6c\\ub9e4\\ud558\\uace0 \\ucc9c\\ucc9c\\ud788 \\uacb0\\uc81c\\ud558\\uc138\\uc694.",\n            "pay": "{logo:paypal}\\ub85c \\uc9c0\\ubd88\\ud558\\uae30",\n            "buynow": "{logo:pp} {logo:paypal} \\ubc14\\ub85c \\uad6c\\ub9e4"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "KW": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KY": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "KZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LA": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "LC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LK": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "LS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "ru": {\n            "checkout": "\\u041e\\u0444\\u043e\\u0440\\u043c\\u0438\\u0442\\u044c \\u0437\\u0430\\u043a\\u0430\\u0437 \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0411\\u043e\\u043b\\u0435\\u0435 \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u044b\\u0439 \\u0438 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e\\u0439 \\u0441\\u043f\\u043e\\u0441\\u043e\\u0431 \\u043e\\u043f\\u043b\\u0430\\u0442\\u044b.",\n\n            "later_tag": "\\u041f\\u043e\\u043a\\u0443\\u043f\\u0430\\u0439\\u0442\\u0435 \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441, \\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u0435 \\u043f\\u043e\\u0442\\u043e\\u043c.",\n            "pay": "\\u041e\\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u044c \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u041a\\u0443\\u043f\\u0438\\u0442\\u044c \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "de": {\n            "checkout": "Direkt zu {logo:pp} {logo:paypal}",\n            "safer_tag": "Einfach schneller und sicherer bezahlen",\n\n            "later_tag": "Kaufen Sie jetzt und bezahlen Sie nach und nach.",\n            "pay": "Mit {logo:paypal} zahlen",\n            "buynow": "{logo:pp} {logo:paypal} Jetzt kaufen"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "LV": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "ru": {\n            "checkout": "\\u041e\\u0444\\u043e\\u0440\\u043c\\u0438\\u0442\\u044c \\u0437\\u0430\\u043a\\u0430\\u0437 \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0411\\u043e\\u043b\\u0435\\u0435 \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u044b\\u0439 \\u0438 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e\\u0439 \\u0441\\u043f\\u043e\\u0441\\u043e\\u0431 \\u043e\\u043f\\u043b\\u0430\\u0442\\u044b.",\n\n            "later_tag": "\\u041f\\u043e\\u043a\\u0443\\u043f\\u0430\\u0439\\u0442\\u0435 \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441, \\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u0435 \\u043f\\u043e\\u0442\\u043e\\u043c.",\n            "pay": "\\u041e\\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u044c \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u041a\\u0443\\u043f\\u0438\\u0442\\u044c \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MA": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MC": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MD": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "ME": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MH": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MK": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "ML": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MQ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MV": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "MX": {\n        "es": {\n            "checkout": "Pagar con {logo:pp} {logo:paypal}",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora",\n            "installment": "{logo:pp} {logo:paypal}  Pagos sin<br>  inter\\u00e9s",\n            "installment_period": "{logo:pp} {logo:paypal}  Pague hasta<br>  [installmentperiod]x sin inter\\u00e9s"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, faster way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now",\n            "installment": "{logo:pp} {logo:paypal}  Interest free<br>  payments",\n            "installment_period": "{logo:pp} {logo:paypal}  Pay up to [installmentperiod]x<br>  without interest"\n        }\n    },\n    "MY": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "MZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NE": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "NI": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NL": {\n        "nl": {\n            "checkout": "{logo:pp} {logo:paypal} Betalen",\n            "safer_tag": "Een veilige en makkelijke manier om te betalen.",\n\n            "later_tag": "Koop nu. Betaal later.",\n            "pay": "Betalen met {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Nu kopen"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "NO": {\n        "no": {\n            "checkout": "{logo:pp} {logo:paypal} Betal",\n            "safer_tag": "En trygg og enkel betalingsmetode",\n\n            "later_tag": "Kj\\u00f8p n\\u00e5, betal senere.",\n            "pay": "Betal med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Kj\\u00f8p n\\u00e5"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "NP": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "NR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "NZ": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Un r\\u00e9flexe s\\u00e9curit\\u00e9.",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar.",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f\\u3002",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "OM": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PA": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PE": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PH": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "PL": {\n        "pl": {\n            "checkout": "{logo:pp} {logo:paypal} Do kasy",\n            "safer_tag": "P\\u0142a\\u0107 wygodnie i bezpiecznie",\n\n            "later_tag": "Kup teraz. P\\u0142a\\u0107 w ratach",\n            "pay": "Zap\\u0142a\\u0107 z {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Kup teraz"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "PM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PN": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PT": {\n        "pt": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A forma r\\u00e1pida e segura de pagar",\n\n            "later_tag": "Compre agora. V\\u00e1 pagando.",\n            "pay": "Pagar com {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar agora"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "PW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "PY": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "QA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        },\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        }\n    },\n    "RE": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "RO": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "RS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "RU": {\n        "ru": {\n            "checkout": "{logo:pp} {logo:paypal} \\u041e\\u0444\\u043e\\u0440\\u043c\\u0438\\u0442\\u044c \\u043f\\u043e\\u043a\\u0443\\u043f\\u043a\\u0443",\n            "safer_tag": "\\u0411\\u043e\\u043b\\u0435\\u0435 \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u044b\\u0439 \\u0438 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e\\u0439 \\u0441\\u043f\\u043e\\u0441\\u043e\\u0431 \\u043e\\u043f\\u043b\\u0430\\u0442\\u044b.",\n\n            "later_tag": "\\u041f\\u043e\\u043a\\u0443\\u043f\\u0430\\u0439\\u0442\\u0435 \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441, \\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u0435 \\u043f\\u043e\\u0442\\u043e\\u043c.",\n            "pay": "\\u041e\\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u044c \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u041a\\u0443\\u043f\\u0438\\u0442\\u044c \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "RW": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SA": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SB": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SC": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SE": {\n        "sv": {\n            "checkout": "{logo:pp} {logo:paypal} Betala",\n            "safer_tag": "Ett tryggt och smidigt s\\u00e4tt att betala",\n            "later_tag": "K\\u00f6p nu, betala senare",\n            "pay": "Betala med {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} K\\u00f6p nu"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "SG": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "SH": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SI": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SJ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SK": {\n        "sk": {\n            "checkout": "Zaplati\\u0165 cez {logo:pp} {logo:paypal}",\n            "safer_tag": "Jednoduch\\u0161\\u00ed a\\u00a0bezpe\\u010dnej\\u0161\\u00ed sp\\u00f4sob platby",\n            "later_tag": "Nak\\u00fapte teraz, zapla\\u0165te postupne",\n            "pay": "Zaplati\\u0165 cez {logo: paypal}",\n            "buynow": "{logo:pp} {logo:paypal} K\\u00fapi\\u0165"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SL": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SN": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SO": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SR": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ST": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SV": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "SZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TD": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TG": {\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TH": {\n        "th": {\n            "checkout": "{logo:pp} {logo:paypal} \\u0e0a\\u0e33\\u0e23\\u0e30\\u0e40\\u0e07\\u0e34\\u0e19",\n            "safer_tag": "\\u0e27\\u0e34\\u0e18\\u0e35\\u0e0a\\u0e33\\u0e23\\u0e30\\u0e40\\u0e07\\u0e34\\u0e19\\u0e17\\u0e35\\u0e48\\u0e1b\\u0e25\\u0e2d\\u0e14\\u0e20\\u0e31\\u0e22\\u0e41\\u0e25\\u0e30\\u0e07\\u0e48\\u0e32\\u0e22\\u0e01\\u0e27\\u0e48\\u0e32",\n\n            "later_tag": "\\u0e0b\\u0e37\\u0e49\\u0e2d\\u0e27\\u0e31\\u0e19\\u0e19\\u0e35\\u0e49 \\u0e41\\u0e25\\u0e49\\u0e27\\u0e04\\u0e48\\u0e2d\\u0e22\\u0e46 \\u0e08\\u0e48\\u0e32\\u0e22\\u0e17\\u0e35\\u0e2b\\u0e25\\u0e31\\u0e07",\n            "pay": "\\u0e0a\\u0e33\\u0e23\\u0e30\\u0e40\\u0e07\\u0e34\\u0e19\\u0e14\\u0e49\\u0e27\\u0e22 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0e0b\\u0e37\\u0e49\\u0e2d\\u0e17\\u0e31\\u0e19\\u0e17\\u0e35"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "TJ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TN": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TO": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "TR": {\n        "tr": {\n            "checkout": "{logo:pp} {logo:paypal} ile Sat\\u0131n Al\\u0131n",\n            "safer_tag": "\\u00d6deme yapman\\u0131n daha g\\u00fcvenli ve kolay yolu",\n\n            "later_tag": "\\u015eimdi Al\\u0131n. Daha Sonra \\u00d6deyin.",\n            "pay": "{logo:paypal} ile \\u00d6de",\n            "buynow": "{logo:pp} {logo:paypal} Hemen Sat\\u0131n Al\\u0131n"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "TT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TV": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "TW": {\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal} \\u7d50\\u5e33",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u65b9\\u4fbf\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u5148\\u8cfc\\u8cb7\\uff0c\\u5f8c\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u4f7f\\u7528 {logo:paypal} \\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8cfc"\n        },\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "TZ": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "UA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "ru": {\n            "checkout": "\\u041e\\u0444\\u043e\\u0440\\u043c\\u0438\\u0442\\u044c \\u0437\\u0430\\u043a\\u0430\\u0437 \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0411\\u043e\\u043b\\u0435\\u0435 \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u044b\\u0439 \\u0438 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e\\u0439 \\u0441\\u043f\\u043e\\u0441\\u043e\\u0431 \\u043e\\u043f\\u043b\\u0430\\u0442\\u044b.",\n\n            "later_tag": "\\u041f\\u043e\\u043a\\u0443\\u043f\\u0430\\u0439\\u0442\\u0435 \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441, \\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u0435 \\u043f\\u043e\\u0442\\u043e\\u043c.",\n            "pay": "\\u041e\\u043f\\u043b\\u0430\\u0442\\u0438\\u0442\\u044c \\u0447\\u0435\\u0440\\u0435\\u0437 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u041a\\u0443\\u043f\\u0438\\u0442\\u044c \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "UG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "US": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "dual_tag": "Two easy ways to pay",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "{logo:pp} {logo:paypal} Payer",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "Pagar con {logo:pp} {logo:paypal}",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "\\u4f7f\\u7528{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "UY": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "VA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "VC": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "VE": {\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "VG": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "VN": {\n        "en": {\n            "checkout": "{logo:pp} {logo:paypal} Checkout",\n            "safer_tag": "A safer, faster way to pay.",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "VU": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "WF": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "WS": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    },\n    "YE": {\n        "ar": {\n            "checkout": "\\u0627\\u0644\\u0633\\u062f\\u0627\\u062f \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:pp} {logo:paypal}",\n            "safer_tag": "\\u0627\\u0644\\u0637\\u0631\\u064a\\u0642\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0647\\u0644 \\u0648\\u0627\\u0644\\u0623\\u0643\\u062b\\u0631 \\u0623\\u0645\\u0627\\u0646\\u0627\\u064b \\u0641\\u064a \\u0627\\u0644\\u062f\\u0641\\u0639",\n            "later_tag": "\\u0627\\u0634\\u062a\\u0631\\u0650 \\u0627\\u0644\\u0622\\u0646\\u060c \\u0648\\u0633\\u062f\\u0651\\u062f \\u0639\\u0644\\u0649 \\u062f\\u0641\\u0639\\u0627\\u062a",\n            "pay": "\\u062f\\u0641\\u0639 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} \\u0634\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0622\\u0646"\n        },\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "YT": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ZA": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ZM": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        },\n        "fr": {\n            "checkout": "Payer avec {logo:pp} {logo:paypal}",\n            "safer_tag": "Votre r\\u00e9flexe s\\u00e9curit\\u00e9 pour payer en ligne",\n            "later_tag": "Achetez maintenant et payez plus tard.",\n            "pay": "Payer avec {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Acheter"\n        },\n        "es": {\n            "checkout": "{logo:pp} {logo:paypal} Pagar",\n            "safer_tag": "La forma r\\u00e1pida y segura de pagar",\n            "later_tag": "Compre ahora y pague m\\u00e1s adelante.",\n            "pay": "Pagar con {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Comprar ahora"\n        },\n        "zh": {\n            "checkout": "{logo:pp} {logo:paypal}\\u7ed3\\u8d26",\n            "safer_tag": "\\u66f4\\u5b89\\u5168\\u3001\\u66f4\\u4fbf\\u6377\\u7684\\u4ed8\\u6b3e\\u65b9\\u5f0f",\n            "later_tag": "\\u7acb\\u5373\\u8d2d\\u4e70\\uff0c\\u5206\\u671f\\u4ed8\\u6b3e\\u3002",\n            "pay": "\\u7528{logo:paypal}\\u4ed8\\u6b3e",\n            "buynow": "{logo:pp} {logo:paypal} \\u7acb\\u5373\\u8d2d\\u4e70"\n        }\n    },\n    "ZW": {\n        "en": {\n            "checkout": "Check out with {logo:pp} {logo:paypal}",\n            "safer_tag": "The safer, easier way to pay",\n            "later_tag": "Buy Now. Pay Over Time.",\n            "pay": "Pay with {logo:paypal}",\n            "buynow": "{logo:pp} {logo:paypal} Buy Now"\n        }\n    }\n}\n';
    },
    "./src/config/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var _checkoutUris, _altpayUris, _guestUris, _billingUris, _buttonUris, _postBridgeUris, _legacyCheckoutUris, _buttonJSUrls, _locales, constants = __webpack_require__("./src/constants/index.js");
        function _defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        var config = {
            scriptUrl: "//www.paypalobjects.com/api/checkout.button.render.js",
            paypal_domain_regex: /^(https?|mock):\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/,
            version: "4.0.202",
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
                }
            },
            creditTestDomains: [ "bluesuncorp.co.uk", "nationsphotolab.com", "plexusworldwide.com", "nshss.org", "bissell.com", "mobstub.com", "vuoriclothing.com", "tape4backup.com", "avivamiento.com", "rhododendron.org", "whiterabbitjapan.com", "atsracing.net", "thehilltopgallery.com", "weedtraqr.com", "worldpantry.com", "ciraconnect.com", "mymalls.com", "prowinch.com", "zodiacpoolsystems.com", "everlywell.com", "candlewarmers.com", "chop.edu", "incruises.com", "flikn.com", "didforsale.com", "mcc.org", "sygu.net", "merchbar.com", "eduinconline.com", "us.livebetterwith.com", "bakemeawish.com", "judolaunch.com", "eventcartel.com", "tapatalk.com", "telescope.com", "covenant.edu", "aquatruwater.com", "spingo.com", "usu.edu", "getcelerity.com", "brandless.com", "saberigniter.com", "euromodeltrains.com", "gofasttrader.com", "megamodzplanet.com", "draftanalyzer.com", "lovewithoutboundaries.com", "filterpop.com", "seekverify.com", "photoandgo.com", "sightseeingpass.com", "bigoanddukes.com", "thethirstyduck.com", "thebrushguys.com", "907delivery.com", "mauisails.com", "drive.net", "channelmax.net", "modernrebelco.com", "enchanteddiamonds.com", "ibabbleon.com", "fullgenomes.com", "conn-comp.com", "wingware.com", "paradigmgoods.com", "theneptunegroup.com", "kidzartworks.com", "unirealm.com", "ncfarmsinc.com", "oneofakindantiques.com", "servers4less.com", "stumpthespread.com", "marketwagon.com", "monsterhouseplans.com", "canterburychoral.org", "teacupnordic.org", "thethirstyduck.com", "medialoot.com", "theartistunion.com", "yourglamourzone.com", "breckstables.com", "mackephotography.com", "dsaj.org", "massluminosity.com", "tespa.org", "versatilearts.net", "yecup.org", "divinebusinessmanagement.com", "captivatebeautyservices.com", "class4me.com", "wcsonlineuniversity.com", "pvplive.com", "kyneteks.com", "rare-paper.com", "bpg.bpgsim.biz", "geodegallery.com", "way.com", "kringle.com", "talentedmrsalas.ph", "litcharts.com", "purpletreephotography.com", "apache.org", "neopackage.com", "globaldance.tv", "integral.studio", "airdoctorpro.com", "ivoryandiron.com", "yuengling.com", "averysbranchfarms.com", "amberreinink.com", "skinnymechocolate.com", "bmbl.net", "ncwatercolor.net", "astrograph.com", "localadventures.mx", "ripcurl.com", "worldfootbrakechallenge.com", "shespeakssales.com", "obrienguitars.com", "jadenikkolephoto.com", "americavoice.com", "cassiexie.com", "aamastateconvention.org", "rellesflorist.com", "passionnobby.com", "bodybyheidi.com", "roqos.com", "prijector.com", "maryswanson.net", "tsghobbies.com", "erinlaytonphotography.com", "darter.org", "fountainpenhospital.com", "myzestfullife.com", "pcog.org", "alisabethdesigns.com", "katiemathisphoto.com", "strictlybellaphotography.com", "maptools.com", "sites.google.com", "gallerr.com", "southfloridatrikke.com", "caviar.tv", "mintingmasters.com", "prospectorsguild.com", "inktale.com", "prettygirlgoods.com", "laceycahill.com", "daniellenowak.com", "t212.org", "scmsinc.com", "babypaloozanc.com", "tetrisonline.com", "grdd.net", "cdspg.info", "airshipapparel.com", "waft.com", "extendpets.com", "supplyhub.com", "hlbsusa.com", "jaderollerbeauty.com", "theparentingjunkie.com", "schagringas.com", "yourscribemate.com", "sportscollectibles.com", "thedivinenoise.com", "hometeamsonline.com", "trademarkpress.com", "destinationenglish.us", "jacquesflowers.com", "aliszhatchphotography.com", "rusticfoundry.com", "ahhhmassage.net", "frezzor.com", "mandelininc.com", "kayleejackson.com", "monkinstitute.org", "eddiebsbbq.com", "morningstarmediaservices.com", "kinevative.com", "orivet.com", "digitalprinthouse.net", "dynamicgenius.com", "allpartsusa.com", "flowersbydavid.net", "nwvoices.org", "leaptrade.com", "tulsaschoolpics.com", "alioth.io", "windowflair.com", "vitcom.net", "simplybeautifulfashions.com", "christinabenton.com", "fromthedaughter.com", "hometowngraphics.net", "fibanalysis.com", "creativejobscentral.com", "sandbox.gg", "jt-digitalmedia.com", "kodable.com", "birthingstone.com", "taranicholephoto.com", "hillyfieldsflorist.com", "charitynoelphoto.com", "auxdelicesfoods.com", "terilynnphotography.com", "folieadeuxevents.com", "karensfloral.com", "montgomerydiveclub.com", "rainbowplastics.com", "confettionthedancefloor.com", "vomozmedia.com", "neatmod.com", "getnaturafled.com", "callingpost.com", "iamfamily.org", "pedigreeonline.com", "typeboost.io", "in-n-outpetdoor.com", "nerdstockgc.com", "keiadmin.com", "createdbykaui.com", "aikophoto.com", "lonestar.ink", "stlfurs.com", "treasurelistings.com", "thecubicle.us", "redclaypaper.com", "blushhousemedia.com", "documentsanddesigns.com", "whitneyleighphotography.shootproof.com", "amaryllisday.com", "hermanproav.com", "felicemedia.com", "withloveplacenta.com", "store.brgadgets.co", "klowephoto.com", "spenceraustinconsulting.com", "sno-eagles.org", "dsatallahassee.org", "bakupages.com", "neswc.com", "josiebrooksphotography.com", "brisksale.com", "legalwhoosh.com", "jasmineeaster.com", "swatstudios.com", "facebook.com", "shakershell.com", "alexiswinslow.com", "mixeddimensions.com", "sweetpproductions.com", "lbeaphotography.com", "otlseatfillers.com", "jdtickets.com", "catholicar.com", "masque.com", "smalltownstudio.net", "goherbalife.com", "itzyourz.com", "magazinespeedloader.com", "dreammachines.io", "dallasdieteticalliance.org", "http:", "medair.org", "unbridledambition.com", "sarasprints.com", "wiperecord.com", "showmyrabbit.com", "cctrendsshop.com", "rachelalessandra.com", "otherworld-apothecary.com", "melissaannphoto.com", "girlceo.co", "seasidemexico.com", "telosid.com", "instin.com", "marinecorpsmustang.org", "lancityconnect.com", "hps1.org", "karenware.com", "livecurriculum.com", "spellingstars.com", "vektorfootball.com", "zaltv.com", "nebraskamayflower.org", "ethiopianspices.com", "immitranslate.com", "rafaelmagic.com.com", "bahc1.org", "newenamel.com", "bhchp.org", "buybulkamerica.com", "sourcepoint.com", "squarestripsports.com", "wix.com", "wilderootsphotography.com", "goodsalt.com", "systemongrid.com", "designmil.org", "freshtrendhq.com", "valisimofashions.com", "buyneatly.com", "getbeauty.us", "intellimidia.com" ],
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
                return _defineProperty(_ref = {}, constants.s.LOCAL, "http://localhost.paypal.com:" + config.ports.default), 
                _defineProperty(_ref, constants.s.STAGE, "https://www." + config.stageUrl), _defineProperty(_ref, constants.s.SANDBOX, "https://www.sandbox.paypal.com"), 
                _defineProperty(_ref, constants.s.PRODUCTION, "https://www.paypal.com"), _defineProperty(_ref, constants.s.TEST, window.location.protocol + "//" + window.location.host), 
                _defineProperty(_ref, constants.s.DEMO, window.location.protocol + "//localhost.paypal.com:" + window.location.port), 
                _ref;
            },
            get paypalDomains() {
                var _ref2;
                return _defineProperty(_ref2 = {}, constants.s.LOCAL, "http://localhost.paypal.com:" + config.ports.default), 
                _defineProperty(_ref2, constants.s.STAGE, "https://www." + config.stageUrl), _defineProperty(_ref2, constants.s.SANDBOX, "https://www.sandbox.paypal.com"), 
                _defineProperty(_ref2, constants.s.PRODUCTION, "https://www.paypal.com"), _defineProperty(_ref2, constants.s.TEST, "mock://www.paypal.com"), 
                _defineProperty(_ref2, constants.s.DEMO, window.location.protocol + "//localhost.paypal.com:" + window.location.port), 
                _ref2;
            },
            get wwwApiUrls() {
                var _ref3;
                return _defineProperty(_ref3 = {}, constants.s.LOCAL, "https://www." + config.stageUrl), 
                _defineProperty(_ref3, constants.s.STAGE, "https://www." + config.stageUrl), _defineProperty(_ref3, constants.s.SANDBOX, "https://www.sandbox.paypal.com"), 
                _defineProperty(_ref3, constants.s.PRODUCTION, "https://www.paypal.com"), _defineProperty(_ref3, constants.s.TEST, window.location.protocol + "//" + window.location.host), 
                _ref3;
            },
            get corsApiUrls() {
                var _ref4;
                return _defineProperty(_ref4 = {}, constants.s.LOCAL, "https://" + config.apiStageUrl + ":12326"), 
                _defineProperty(_ref4, constants.s.STAGE, "https://" + config.apiStageUrl + ":12326"), 
                _defineProperty(_ref4, constants.s.SANDBOX, "https://cors.api.sandbox.paypal.com"), 
                _defineProperty(_ref4, constants.s.PRODUCTION, "https://cors.api.paypal.com"), _defineProperty(_ref4, constants.s.TEST, window.location.protocol + "//" + window.location.host), 
                _ref4;
            },
            get apiUrls() {
                var _ref5, domain = window.location.protocol + "//" + window.location.host, corsApiUrls = config.corsApiUrls, wwwApiUrls = config.wwwApiUrls;
                return _defineProperty(_ref5 = {}, constants.s.LOCAL, domain === wwwApiUrls.local ? wwwApiUrls.local : corsApiUrls.local), 
                _defineProperty(_ref5, constants.s.STAGE, domain === wwwApiUrls.stage ? wwwApiUrls.stage : corsApiUrls.stage), 
                _defineProperty(_ref5, constants.s.SANDBOX, domain === wwwApiUrls.sandbox ? wwwApiUrls.sandbox : corsApiUrls.sandbox), 
                _defineProperty(_ref5, constants.s.PRODUCTION, domain === wwwApiUrls.production ? wwwApiUrls.production : corsApiUrls.production), 
                _defineProperty(_ref5, constants.s.TEST, domain === wwwApiUrls.test ? wwwApiUrls.test : corsApiUrls.test), 
                _ref5;
            },
            checkoutUris: (_checkoutUris = {}, _defineProperty(_checkoutUris, constants.s.LOCAL, "/webapps/hermes?ul=0"), 
            _defineProperty(_checkoutUris, constants.s.STAGE, "/webapps/hermes"), _defineProperty(_checkoutUris, constants.s.SANDBOX, "/checkoutnow"), 
            _defineProperty(_checkoutUris, constants.s.PRODUCTION, "/checkoutnow"), _defineProperty(_checkoutUris, constants.s.TEST, "/base/test/windows/checkout/index.htm?checkouturl=true"), 
            _defineProperty(_checkoutUris, constants.s.DEMO, "/demo/dev/checkout.htm"), _checkoutUris),
            altpayUris: (_altpayUris = {}, _defineProperty(_altpayUris, constants.s.LOCAL, "/latinumcheckout"), 
            _defineProperty(_altpayUris, constants.s.STAGE, "/latinumcheckout"), _defineProperty(_altpayUris, constants.s.SANDBOX, "/latinumcheckout"), 
            _defineProperty(_altpayUris, constants.s.PRODUCTION, "/latinumcheckout"), _defineProperty(_altpayUris, constants.s.TEST, "/base/test/windows/checkout/index.htm?checkouturl=true"), 
            _defineProperty(_altpayUris, constants.s.DEMO, "/demo/dev/checkout.htm"), _altpayUris),
            guestUris: (_guestUris = {}, _defineProperty(_guestUris, constants.s.LOCAL, "/webapps/xoonboarding"), 
            _defineProperty(_guestUris, constants.s.STAGE, "/webapps/xoonboarding"), _defineProperty(_guestUris, constants.s.SANDBOX, "/webapps/xoonboarding"), 
            _defineProperty(_guestUris, constants.s.PRODUCTION, "/webapps/xoonboarding"), _defineProperty(_guestUris, constants.s.TEST, "/base/test/windows/checkout/index.htm?guesturl=true"), 
            _defineProperty(_guestUris, constants.s.DEMO, "/demo/dev/guest.htm"), _guestUris),
            billingUris: (_billingUris = {}, _defineProperty(_billingUris, constants.s.LOCAL, "/webapps/hermes/agreements?ul=0"), 
            _defineProperty(_billingUris, constants.s.STAGE, "/webapps/hermes/agreements"), 
            _defineProperty(_billingUris, constants.s.SANDBOX, "/agreements/approve"), _defineProperty(_billingUris, constants.s.PRODUCTION, "/agreements/approve"), 
            _defineProperty(_billingUris, constants.s.TEST, "/base/test/windows/checkout/index.htm?billingurl=true"), 
            _defineProperty(_billingUris, constants.s.DEMO, "/demo/dev/checkout.htm"), _billingUris),
            buttonUris: (_buttonUris = {}, _defineProperty(_buttonUris, constants.s.LOCAL, "/webapps/hermes/button"), 
            _defineProperty(_buttonUris, constants.s.STAGE, "/webapps/hermes/button"), _defineProperty(_buttonUris, constants.s.SANDBOX, "/webapps/hermes/button"), 
            _defineProperty(_buttonUris, constants.s.PRODUCTION, "/webapps/hermes/button"), 
            _defineProperty(_buttonUris, constants.s.TEST, "/base/test/windows/button/index.htm"), 
            _defineProperty(_buttonUris, constants.s.DEMO, "/demo/dev/button.htm"), _buttonUris),
            postBridgeUris: (_postBridgeUris = {}, _defineProperty(_postBridgeUris, constants.s.LOCAL, "/webapps/hermes/component-meta"), 
            _defineProperty(_postBridgeUris, constants.s.STAGE, "/webapps/hermes/component-meta"), 
            _defineProperty(_postBridgeUris, constants.s.SANDBOX, "/webapps/hermes/component-meta"), 
            _defineProperty(_postBridgeUris, constants.s.PRODUCTION, "/webapps/hermes/component-meta"), 
            _defineProperty(_postBridgeUris, constants.s.TEST, "/base/test/windows/component-meta/index.htm"), 
            _defineProperty(_postBridgeUris, constants.s.DEMO, "/demo/dev/bridge.htm"), _postBridgeUris),
            legacyCheckoutUris: (_legacyCheckoutUris = {}, _defineProperty(_legacyCheckoutUris, constants.s.LOCAL, "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true"), 
            _defineProperty(_legacyCheckoutUris, constants.s.STAGE, "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true"), 
            _defineProperty(_legacyCheckoutUris, constants.s.SANDBOX, "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true"), 
            _defineProperty(_legacyCheckoutUris, constants.s.PRODUCTION, "/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true"), 
            _defineProperty(_legacyCheckoutUris, constants.s.TEST, "#fallback"), _legacyCheckoutUris),
            buttonJSUrls: (_buttonJSUrls = {}, _defineProperty(_buttonJSUrls, constants.s.LOCAL, "https://www.paypalobjects.com/api/button.js"), 
            _defineProperty(_buttonJSUrls, constants.s.STAGE, "https://www.paypalobjects.com/api/button.js"), 
            _defineProperty(_buttonJSUrls, constants.s.SANDBOX, "https://www.paypalobjects.com/api/button.js"), 
            _defineProperty(_buttonJSUrls, constants.s.PRODUCTION, "https://www.paypalobjects.com/api/button.js"), 
            _defineProperty(_buttonJSUrls, constants.s.TEST, "/base/test/lib/button.js"), _defineProperty(_buttonJSUrls, constants.s.DEMO, "https://www.paypalobjects.com/api/button.js"), 
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
                return _defineProperty(_ref6 = {}, constants.s.LOCAL, "" + paypalUrls.local + config.checkoutUris.local.replace(":" + config.ports.default, ":" + config.ports.checkout)), 
                _defineProperty(_ref6, constants.s.STAGE, "" + paypalUrls.stage + config.checkoutUris.stage), 
                _defineProperty(_ref6, constants.s.SANDBOX, "" + paypalUrls.sandbox + config.checkoutUris.sandbox), 
                _defineProperty(_ref6, constants.s.PRODUCTION, "" + paypalUrls.production + config.checkoutUris.production), 
                _defineProperty(_ref6, constants.s.TEST, "" + paypalUrls.test + config.checkoutUris.test), 
                _defineProperty(_ref6, constants.s.DEMO, "" + paypalUrls.test + config.checkoutUris.demo), 
                _ref6;
            },
            get guestUrls() {
                var _ref7, paypalUrls = config.paypalUrls;
                return _defineProperty(_ref7 = {}, constants.s.LOCAL, "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.guest) + config.guestUris.local), 
                _defineProperty(_ref7, constants.s.STAGE, "" + paypalUrls.stage + config.guestUris.stage), 
                _defineProperty(_ref7, constants.s.SANDBOX, "" + paypalUrls.sandbox + config.guestUris.sandbox), 
                _defineProperty(_ref7, constants.s.PRODUCTION, "" + paypalUrls.production + config.guestUris.production), 
                _defineProperty(_ref7, constants.s.TEST, "" + paypalUrls.test + config.guestUris.test), 
                _defineProperty(_ref7, constants.s.DEMO, "" + paypalUrls.test + config.guestUris.demo), 
                _ref7;
            },
            get altpayUrls() {
                var _ref8, paypalUrls = config.paypalUrls;
                return _defineProperty(_ref8 = {}, constants.s.LOCAL, "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.altpay) + config.altpayUris.local), 
                _defineProperty(_ref8, constants.s.STAGE, "" + paypalUrls.stage + config.altpayUris.stage), 
                _defineProperty(_ref8, constants.s.SANDBOX, "" + paypalUrls.sandbox + config.altpayUris.sandbox), 
                _defineProperty(_ref8, constants.s.PRODUCTION, "" + paypalUrls.production + config.altpayUris.production), 
                _defineProperty(_ref8, constants.s.TEST, "" + paypalUrls.test + config.altpayUris.test), 
                _defineProperty(_ref8, constants.s.DEMO, "" + paypalUrls.test + config.altpayUris.demo), 
                _ref8;
            },
            get billingUrls() {
                var _ref9, paypalUrls = config.paypalUrls;
                return _defineProperty(_ref9 = {}, constants.s.LOCAL, "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.checkout) + config.billingUris.local), 
                _defineProperty(_ref9, constants.s.STAGE, "" + paypalUrls.stage + config.billingUris.stage), 
                _defineProperty(_ref9, constants.s.SANDBOX, "" + paypalUrls.sandbox + config.billingUris.sandbox), 
                _defineProperty(_ref9, constants.s.PRODUCTION, "" + paypalUrls.production + config.billingUris.production), 
                _defineProperty(_ref9, constants.s.TEST, "" + paypalUrls.test + config.billingUris.test), 
                _defineProperty(_ref9, constants.s.DEMO, "" + paypalUrls.test + config.billingUris.demo), 
                _ref9;
            },
            get buttonUrls() {
                var _ref10, paypalUrls = config.paypalUrls;
                return _defineProperty(_ref10 = {}, constants.s.LOCAL, "" + paypalUrls.local.replace(":" + config.ports.default, ":" + config.ports.button) + config.buttonUris.local), 
                _defineProperty(_ref10, constants.s.STAGE, "" + paypalUrls.stage + config.buttonUris.stage), 
                _defineProperty(_ref10, constants.s.SANDBOX, "" + paypalUrls.sandbox + config.buttonUris.sandbox), 
                _defineProperty(_ref10, constants.s.PRODUCTION, "" + paypalUrls.production + config.buttonUris.production), 
                _defineProperty(_ref10, constants.s.TEST, "" + paypalUrls.test + config.buttonUris.test), 
                _defineProperty(_ref10, constants.s.DEMO, "" + paypalUrls.demo + config.buttonUris.demo), 
                _ref10;
            },
            get loginUrls() {
                var _ref11, paypalUrls = config.paypalUrls;
                return _defineProperty(_ref11 = {}, constants.s.LOCAL, "" + paypalUrls.stage + config.loginUri), 
                _defineProperty(_ref11, constants.s.STAGE, "" + paypalUrls.stage + config.loginUri), 
                _defineProperty(_ref11, constants.s.SANDBOX, "" + paypalUrls.sandbox + config.loginUri), 
                _defineProperty(_ref11, constants.s.PRODUCTION, "" + paypalUrls.production + config.loginUri), 
                _defineProperty(_ref11, constants.s.TEST, "" + paypalUrls.test + config.loginUri), 
                _ref11;
            },
            get paymentsStandardUrls() {
                var _ref12, paypalUrls = config.paypalUrls;
                return _defineProperty(_ref12 = {}, constants.s.LOCAL, "" + paypalUrls.local + config.paymentStandardUri), 
                _defineProperty(_ref12, constants.s.STAGE, "" + paypalUrls.stage + config.paymentStandardUri), 
                _defineProperty(_ref12, constants.s.SANDBOX, "" + paypalUrls.sandbox + config.paymentStandardUri), 
                _defineProperty(_ref12, constants.s.PRODUCTION, "" + paypalUrls.production + config.paymentStandardUri), 
                _defineProperty(_ref12, constants.s.TEST, "" + paypalUrls.test + config.paymentStandardUri), 
                _ref12;
            },
            get metaFrameUrls() {
                var _ref13, paypalUrls = config.paypalUrls;
                return _defineProperty(_ref13 = {}, constants.s.LOCAL, "" + paypalUrls.local + config.postBridgeUri + "&env=local"), 
                _defineProperty(_ref13, constants.s.STAGE, "" + paypalUrls.stage + config.postBridgeUri + "&env=stage&stage=" + config.stage), 
                _defineProperty(_ref13, constants.s.SANDBOX, "" + paypalUrls.sandbox + config.postBridgeUri + "&env=sandbox"), 
                _defineProperty(_ref13, constants.s.PRODUCTION, "" + paypalUrls.production + config.postBridgeUri + "&env=production"), 
                _defineProperty(_ref13, constants.s.TEST, "" + paypalUrls.test + config.postBridgeUri + "&env=test"), 
                _defineProperty(_ref13, constants.s.DEMO, "" + paypalUrls.demo + config.postBridgeUri + "&env=demo"), 
                _ref13;
            },
            get legacyCheckoutUrls() {
                var _ref14, paypalUrls = config.paypalUrls;
                return _defineProperty(_ref14 = {}, constants.s.LOCAL, "" + paypalUrls.stage + config.legacyCheckoutUris.local), 
                _defineProperty(_ref14, constants.s.STAGE, "" + paypalUrls.stage + config.legacyCheckoutUris.stage), 
                _defineProperty(_ref14, constants.s.SANDBOX, "" + paypalUrls.sandbox + config.legacyCheckoutUris.sandbox), 
                _defineProperty(_ref14, constants.s.PRODUCTION, "" + paypalUrls.production + config.legacyCheckoutUris.production), 
                _defineProperty(_ref14, constants.s.TEST, "" + paypalUrls.test + config.legacyCheckoutUris.test), 
                _ref14;
            },
            get authApiUrls() {
                var _ref15, apiUrls = config.apiUrls, authApiUri = config.authApiUri;
                return _defineProperty(_ref15 = {}, constants.s.LOCAL, "" + apiUrls.local + authApiUri), 
                _defineProperty(_ref15, constants.s.STAGE, "" + apiUrls.stage + authApiUri), _defineProperty(_ref15, constants.s.SANDBOX, "" + apiUrls.sandbox + authApiUri), 
                _defineProperty(_ref15, constants.s.PRODUCTION, "" + apiUrls.production + authApiUri), 
                _defineProperty(_ref15, constants.s.TEST, "" + apiUrls.test + authApiUri), _ref15;
            },
            get paymentApiUrls() {
                var _ref16, apiUrls = config.apiUrls, paymentApiUri = config.paymentApiUri;
                return _defineProperty(_ref16 = {}, constants.s.LOCAL, "" + apiUrls.local + paymentApiUri), 
                _defineProperty(_ref16, constants.s.STAGE, "" + apiUrls.stage + paymentApiUri), 
                _defineProperty(_ref16, constants.s.SANDBOX, "" + apiUrls.sandbox + paymentApiUri), 
                _defineProperty(_ref16, constants.s.PRODUCTION, "" + apiUrls.production + paymentApiUri), 
                _defineProperty(_ref16, constants.s.TEST, "" + apiUrls.test + paymentApiUri), _ref16;
            },
            get orderApiUrls() {
                var _ref17, apiUrls = config.apiUrls, orderApiUri = config.orderApiUri;
                return _defineProperty(_ref17 = {}, constants.s.LOCAL, "" + apiUrls.local + orderApiUri), 
                _defineProperty(_ref17, constants.s.STAGE, "" + apiUrls.stage + orderApiUri), _defineProperty(_ref17, constants.s.SANDBOX, "" + apiUrls.sandbox + orderApiUri), 
                _defineProperty(_ref17, constants.s.PRODUCTION, "" + apiUrls.production + orderApiUri), 
                _defineProperty(_ref17, constants.s.TEST, "" + apiUrls.test + orderApiUri), _ref17;
            },
            get billingApiUrls() {
                var _ref18, apiUrls = config.apiUrls, billingApiUri = config.billingApiUri;
                return _defineProperty(_ref18 = {}, constants.s.LOCAL, "" + apiUrls.local + billingApiUri), 
                _defineProperty(_ref18, constants.s.STAGE, "" + apiUrls.stage + billingApiUri), 
                _defineProperty(_ref18, constants.s.SANDBOX, "" + apiUrls.sandbox + billingApiUri), 
                _defineProperty(_ref18, constants.s.PRODUCTION, "" + apiUrls.production + billingApiUri), 
                _defineProperty(_ref18, constants.s.TEST, "" + apiUrls.test + billingApiUri), _ref18;
            },
            get experienceApiUrls() {
                var _ref19, apiUrls = config.apiUrls, experienceApiUri = config.experienceApiUri;
                return _defineProperty(_ref19 = {}, constants.s.LOCAL, "" + apiUrls.local + experienceApiUri), 
                _defineProperty(_ref19, constants.s.STAGE, "" + apiUrls.stage + experienceApiUri), 
                _defineProperty(_ref19, constants.s.SANDBOX, "" + apiUrls.sandbox + experienceApiUri), 
                _defineProperty(_ref19, constants.s.PRODUCTION, "" + apiUrls.production + experienceApiUri), 
                _defineProperty(_ref19, constants.s.TEST, "" + apiUrls.test + experienceApiUri), 
                _ref19;
            },
            get trackingApiUrls() {
                var _ref20, apiUrls = config.apiUrls, trackingApiUri = config.trackingApiUri;
                return _defineProperty(_ref20 = {}, constants.s.LOCAL, "" + apiUrls.local + trackingApiUri), 
                _defineProperty(_ref20, constants.s.STAGE, "" + apiUrls.stage + trackingApiUri), 
                _defineProperty(_ref20, constants.s.SANDBOX, "" + apiUrls.sandbox + trackingApiUri), 
                _defineProperty(_ref20, constants.s.PRODUCTION, "" + apiUrls.production + trackingApiUri), 
                _defineProperty(_ref20, constants.s.TEST, "" + apiUrls.test + trackingApiUri), _ref20;
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
            locales: (_locales = {}, _defineProperty(_locales, constants.q.AD, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.AE, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH, constants.v.AR ]), 
            _defineProperty(_locales, constants.q.AG, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.AI, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.AL, [ constants.v.EN ]), _defineProperty(_locales, constants.q.AM, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.AN, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.AO, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.AR, [ constants.v.ES, constants.v.EN ]), _defineProperty(_locales, constants.q.AT, [ constants.v.DE, constants.v.EN ]), 
            _defineProperty(_locales, constants.q.AU, [ constants.v.EN ]), _defineProperty(_locales, constants.q.AW, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.AZ, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.BA, [ constants.v.EN ]), _defineProperty(_locales, constants.q.BB, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.BE, [ constants.v.EN, constants.v.NL, constants.v.FR ]), 
            _defineProperty(_locales, constants.q.BF, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.BG, [ constants.v.EN ]), _defineProperty(_locales, constants.q.BH, [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.BI, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.BJ, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.BM, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.BN, [ constants.v.EN ]), _defineProperty(_locales, constants.q.BO, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.BR, [ constants.v.PT, constants.v.EN ]), _defineProperty(_locales, constants.q.BS, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.BT, [ constants.v.EN ]), _defineProperty(_locales, constants.q.BW, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.BY, [ constants.v.EN ]), _defineProperty(_locales, constants.q.BZ, [ constants.v.EN, constants.v.ES, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.C2, [ constants.v.ZH, constants.v.EN ]), _defineProperty(_locales, constants.q.CA, [ constants.v.EN, constants.v.FR ]), 
            _defineProperty(_locales, constants.q.CD, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.CG, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.CH, [ constants.v.DE, constants.v.FR, constants.v.EN ]), 
            _defineProperty(_locales, constants.q.CI, [ constants.v.FR, constants.v.EN ]), _defineProperty(_locales, constants.q.CK, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.CL, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.CM, [ constants.v.FR, constants.v.EN ]), _defineProperty(_locales, constants.q.CN, [ constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.CO, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.CR, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.CV, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.CY, [ constants.v.EN ]), _defineProperty(_locales, constants.q.CZ, [ constants.v.CS, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.DE, [ constants.v.DE, constants.v.EN ]), _defineProperty(_locales, constants.q.DJ, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.DK, [ constants.v.DA, constants.v.EN ]), _defineProperty(_locales, constants.q.DM, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.DO, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.DZ, [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.EC, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.EE, [ constants.v.EN, constants.v.RU, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.EG, [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.ER, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.ES, [ constants.v.ES, constants.v.EN ]), _defineProperty(_locales, constants.q.ET, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.FI, [ constants.v.FI, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.FJ, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.FK, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.FM, [ constants.v.EN ]), _defineProperty(_locales, constants.q.FO, [ constants.v.DA, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.FR, [ constants.v.FR, constants.v.EN ]), _defineProperty(_locales, constants.q.GA, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GB, [ constants.v.EN ]), _defineProperty(_locales, constants.q.GD, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GE, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GF, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GI, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GL, [ constants.v.DA, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GM, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GN, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GP, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GR, [ constants.v.EL, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GT, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GW, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.GY, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.HK, [ constants.v.EN, constants.v.ZH ]), _defineProperty(_locales, constants.q.HN, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.HR, [ constants.v.EN ]), _defineProperty(_locales, constants.q.HU, [ constants.v.HU, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.ID, [ constants.v.ID, constants.v.EN ]), _defineProperty(_locales, constants.q.IE, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.IL, [ constants.v.HE, constants.v.EN ]), _defineProperty(_locales, constants.q.IN, [ constants.v.EN ]), 
            _defineProperty(_locales, constants.q.IS, [ constants.v.EN ]), _defineProperty(_locales, constants.q.IT, [ constants.v.IT, constants.v.EN ]), 
            _defineProperty(_locales, constants.q.JM, [ constants.v.EN, constants.v.ES, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.JO, [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.JP, [ constants.v.JA, constants.v.EN ]), _defineProperty(_locales, constants.q.KE, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.KG, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.KH, [ constants.v.EN ]), _defineProperty(_locales, constants.q.KI, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.KM, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.KN, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.KR, [ constants.v.KO, constants.v.EN ]), _defineProperty(_locales, constants.q.KW, [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.KY, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.KZ, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.LA, [ constants.v.EN ]), _defineProperty(_locales, constants.q.LC, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.LI, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.LK, [ constants.v.EN ]), _defineProperty(_locales, constants.q.LS, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.LT, [ constants.v.EN, constants.v.RU, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.LU, [ constants.v.EN, constants.v.DE, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.LV, [ constants.v.EN, constants.v.RU, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.MA, [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.MC, [ constants.v.FR, constants.v.EN ]), _defineProperty(_locales, constants.q.MD, [ constants.v.EN ]), 
            _defineProperty(_locales, constants.q.ME, [ constants.v.EN ]), _defineProperty(_locales, constants.q.MG, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.MH, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.MK, [ constants.v.EN ]), _defineProperty(_locales, constants.q.ML, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.MN, [ constants.v.EN ]), _defineProperty(_locales, constants.q.MQ, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.MR, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.MS, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.MT, [ constants.v.EN ]), _defineProperty(_locales, constants.q.MU, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.MV, [ constants.v.EN ]), _defineProperty(_locales, constants.q.MW, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.MX, [ constants.v.ES, constants.v.EN ]), _defineProperty(_locales, constants.q.MY, [ constants.v.EN ]), 
            _defineProperty(_locales, constants.q.MZ, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.NA, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.NC, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.NE, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.NF, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.NG, [ constants.v.EN ]), _defineProperty(_locales, constants.q.NI, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.NL, [ constants.v.NL, constants.v.EN ]), _defineProperty(_locales, constants.q.NO, [ constants.v.NO, constants.v.EN ]), 
            _defineProperty(_locales, constants.q.NP, [ constants.v.EN ]), _defineProperty(_locales, constants.q.NR, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.NU, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.NZ, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.OM, [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.PA, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.PE, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.PF, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.PG, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.PH, [ constants.v.EN ]), _defineProperty(_locales, constants.q.PL, [ constants.v.PL, constants.v.EN ]), 
            _defineProperty(_locales, constants.q.PM, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.PN, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.PT, [ constants.v.PT, constants.v.EN ]), _defineProperty(_locales, constants.q.PW, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.PY, [ constants.v.ES, constants.v.EN ]), _defineProperty(_locales, constants.q.QA, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH, constants.v.AR ]), 
            _defineProperty(_locales, constants.q.RE, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.RO, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.RS, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.RU, [ constants.v.RU, constants.v.EN ]), _defineProperty(_locales, constants.q.RW, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SA, [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SB, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SC, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SE, [ constants.v.SV, constants.v.EN ]), _defineProperty(_locales, constants.q.SG, [ constants.v.EN ]), 
            _defineProperty(_locales, constants.q.SH, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SI, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SJ, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SK, [ constants.v.SK, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SL, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SM, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SN, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SO, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SR, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.ST, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SV, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.SZ, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.TC, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.TD, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.TG, [ constants.v.FR, constants.v.EN, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.TH, [ constants.v.TH, constants.v.EN ]), _defineProperty(_locales, constants.q.TJ, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.TM, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.TN, [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.TO, [ constants.v.EN ]), _defineProperty(_locales, constants.q.TR, [ constants.v.TR, constants.v.EN ]), 
            _defineProperty(_locales, constants.q.TT, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.TV, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.TW, [ constants.v.ZH, constants.v.EN ]), _defineProperty(_locales, constants.q.TZ, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.UA, [ constants.v.EN, constants.v.RU, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.UG, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.US, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.UY, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.VA, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.VC, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.VE, [ constants.v.ES, constants.v.EN, constants.v.FR, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.VG, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.VN, [ constants.v.EN ]), _defineProperty(_locales, constants.q.VU, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.WF, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.WS, [ constants.v.EN ]), _defineProperty(_locales, constants.q.YE, [ constants.v.AR, constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.YT, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.ZA, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.ZM, [ constants.v.EN, constants.v.FR, constants.v.ES, constants.v.ZH ]), 
            _defineProperty(_locales, constants.q.ZW, [ constants.v.EN ]), _locales)
        };
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return config;
        });
    },
    "./src/constants/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var _CONTEXT_TYPE, BUTTON_STYLE_OPTIONS = {
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
            EPS: "eps",
            MYBANK: "mybank"
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
            ELV: "elv",
            BANCONTACT: "bancontact",
            GIROPAY: "giropay",
            EPS: "eps",
            MYBANK: "mybank"
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
            EPS: "eps",
            MYBANK: "mybank"
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
            VERSION: "data-version"
        }, PLATFORM = {
            DESKTOP: "desktop",
            MOBILE: "mobile"
        };
        function _defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        var _LANG_TO_DEFAULT_COUN, FPTI = {
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
            }, _defineProperty(_CONTEXT_TYPE, PAYMENT_TYPE.PAY_ID, "Pay-ID"), _defineProperty(_CONTEXT_TYPE, PAYMENT_TYPE.EC_TOKEN, "EC-Token"), 
            _defineProperty(_CONTEXT_TYPE, PAYMENT_TYPE.BA_TOKEN, "EC-Token"), _CONTEXT_TYPE),
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
                CHECKOUT_CANCEL: "process_checkout_cancel",
                CHECKOUT_ERROR: "process_checkout_error",
                EXTERNAL_EXPERIMENT: "process_external_experiment",
                EXTERNAL_EXPERIMENT_COMPLETE: "process_external_experiment_complete",
                PPTM_LOAD: "process_pptm_load",
                PPTM_LOADED: "process_pptm_loaded",
                PXP: "process_pxp_check"
            }
        };
        function country__defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
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
        }, LANG_TO_DEFAULT_COUNTRY = (country__defineProperty(_LANG_TO_DEFAULT_COUN = {}, LANG.AR, COUNTRY.SA), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.CS, COUNTRY.CZ), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.DA, COUNTRY.DK), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.DE, COUNTRY.DE), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.EL, COUNTRY.GR), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.EN, COUNTRY.US), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.ES, COUNTRY.ES), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.FI, COUNTRY.FI), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.FR, COUNTRY.FR), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.HE, COUNTRY.IL), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.HU, COUNTRY.HU), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.ID, COUNTRY.ID), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.IT, COUNTRY.IT), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.JA, COUNTRY.JP), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.KO, COUNTRY.KR), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.NL, COUNTRY.NL), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.NO, COUNTRY.NO), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.PL, COUNTRY.PL), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.PT, COUNTRY.PT), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.RU, COUNTRY.RU), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.SK, COUNTRY.SK), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.SV, COUNTRY.SE), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.TH, COUNTRY.TH), 
        country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.TR, COUNTRY.TR), country__defineProperty(_LANG_TO_DEFAULT_COUN, LANG.ZH, COUNTRY.CN), 
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
    "./src/resources/fundingLogos/bancontact.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg version="1.1" id="Layer_1" x="0px" y="0px" width="226px" height="32px" viewBox="36.09922790527344 36.68461608886719 226 32" style="enable-background:new 0 0 476.9 123.4;" xmlns="http://www.w3.org/2000/svg">\n  <style type="text/css">\n\t.st0{fill:#FFFFFF;}\n\t.st1{fill:#005498;}\n\t.st2{fill:#FFD800;}\n</style>\n  <g transform="matrix(0.557769, 0, 0, 0.557769, 15.684875, 18.15871)">\n    <g>\n      <path class="st1" d="M147.6,50.2h-5.8h-26.9h-5.8l-3.9,4.4L92.5,68.9l0,0l-3.9,4.4h-6H56.2h-5.8l3.9-4.5l1.8-2.1l3.9-4.5h-5.8h-7.6&#10;&#9;&#9;h-4.2c-3.2,0-5.8,2.7-5.8,6l0,0v11.5v1.1c0,3.3,2.6,6,5.8,6H44h61.1h4.4c3.2,0,7.6-2,9.7-4.4l10.2-11.6L147.6,50.2z"/>\n      <path class="st2" d="M155.3,36.8c3.2,0,5.8,2.7,5.8,6v12.6c0,3.3-2.6,6-5.8,6h-3.2h-8.5h-5.8l3.9-4.4l0,0l1.9-2.2l3.9-4.4h-38.6&#10;&#9;&#9;L88.3,73.6H50l27.5-31.1l1-1.2c2.2-2.4,6.5-4.4,9.7-4.4h1.4h65.7V36.8z"/>\n    </g>\n    <path class="st1" d="M 440.7 85.6 L 440.7 81.8 C 440.7 81.3 440.4 81 439.7 81 L 437.3 81 C 436.6 81 436.1 80.9 436 80.6 C 435.8 80.3 435.8 79.7 435.8 78.7 L 435.8 64.7 L 439.7 64.7 C 440 64.7 440.2 64.6 440.4 64.4 C 440.6 64.2 440.7 64 440.7 63.7 L 440.7 59.8 C 440.7 59.5 440.6 59.3 440.4 59.1 C 440.2 58.9 440 58.8 439.7 58.8 L 435.8 58.8 L 435.8 53.8 C 435.8 53.5 435.7 53.3 435.6 53.2 C 435.4 53.1 435.2 53 435 53 L 434.9 53 L 429.1 54 C 428.8 54.1 428.6 54.2 428.4 54.3 C 428.2 54.5 428.1 54.7 428.1 54.9 L 428.1 58.8 L 424.2 58.8 C 423.9 58.8 423.7 58.9 423.5 59.1 C 423.3 59.3 423.2 59.5 423.2 59.8 L 423.2 63 C 423.2 63.3 423.3 63.5 423.5 63.6 C 423.7 63.8 423.9 63.9 424.2 64 L 428.1 64.6 L 428.1 78.6 C 428.1 80.3 428.3 81.7 428.6 82.8 C 429 83.9 429.5 84.7 430.1 85.3 C 430.8 85.9 431.6 86.3 432.6 86.5 C 433.6 86.7 434.8 86.8 436.1 86.8 C 436.8 86.8 437.4 86.8 438 86.7 C 438.5 86.6 439.2 86.5 439.9 86.4 C 440.4 86.4 440.7 86.1 440.7 85.6 M 419.9 85.1 L 419.9 80.8 C 419.9 80.5 419.8 80.3 419.6 80.2 C 419.4 80.1 419.2 80 418.9 80 L 418.8 80 C 417.9 80.1 417 80.2 416.2 80.2 C 415.4 80.3 414.3 80.3 412.9 80.3 C 412.4 80.3 411.8 80.2 411.4 80 C 410.9 79.8 410.5 79.5 410.1 79.1 C 409.7 78.7 409.5 78.1 409.3 77.4 C 409.1 76.7 409 75.8 409 74.7 L 409 70.7 C 409 69.6 409.1 68.7 409.3 68 C 409.5 67.3 409.8 66.7 410.1 66.3 C 410.5 65.9 410.9 65.6 411.4 65.4 C 411.9 65.2 412.4 65.1 412.9 65.1 C 414.3 65.1 415.4 65.1 416.2 65.2 C 417 65.3 417.9 65.3 418.8 65.4 L 418.9 65.4 C 419.2 65.4 419.4 65.3 419.6 65.2 C 419.8 65.1 419.9 64.9 419.9 64.6 L 419.9 60.3 C 419.9 59.9 419.8 59.7 419.7 59.6 C 419.5 59.5 419.3 59.3 418.9 59.2 C 418.2 59 417.3 58.9 416.3 58.7 C 415.2 58.5 414 58.5 412.5 58.5 C 409.1 58.5 406.4 59.5 404.3 61.6 C 402.3 63.7 401.2 66.7 401.2 70.7 L 401.2 74.7 C 401.2 78.6 402.2 81.7 404.3 83.8 C 406.3 85.9 409.1 86.9 412.5 86.9 C 413.9 86.9 415.2 86.8 416.3 86.7 C 417.4 86.5 418.3 86.4 418.9 86.2 C 419.3 86.1 419.5 86 419.7 85.8 C 419.8 85.7 419.9 85.4 419.9 85.1 M 388.6 80 C 388 80.3 387.4 80.5 386.7 80.7 C 386 80.9 385.3 81 384.6 81 C 383.6 81 382.8 80.9 382.3 80.6 C 381.8 80.3 381.6 79.7 381.6 78.6 L 381.6 78.2 C 381.6 77.6 381.7 77.1 381.8 76.7 C 381.9 76.3 382.2 75.9 382.5 75.6 C 382.8 75.3 383.3 75.1 383.8 74.9 C 384.3 74.8 385 74.7 385.9 74.7 L 388.6 74.7 L 388.6 80 L 388.6 80 Z M 396.2 68.3 C 396.2 66.5 395.9 65 395.4 63.8 C 394.9 62.6 394.1 61.6 393.2 60.8 C 392.2 60 391.1 59.4 389.7 59.1 C 388.3 58.7 386.7 58.5 385 58.5 C 383.4 58.5 381.8 58.6 380.3 58.8 C 378.8 59 377.6 59.2 376.7 59.5 C 376.1 59.7 375.8 60 375.8 60.6 L 375.8 64.5 C 375.8 64.8 375.9 65 376 65.2 C 376.2 65.3 376.4 65.4 376.6 65.4 L 376.8 65.4 C 377.2 65.4 377.7 65.3 378.2 65.3 C 378.8 65.3 379.4 65.2 380.2 65.2 C 380.9 65.2 381.7 65.1 382.5 65.1 C 383.3 65.1 384.1 65.1 384.8 65.1 C 385.9 65.1 386.8 65.3 387.4 65.7 C 388 66.1 388.4 67 388.4 68.4 L 388.4 70.1 L 385.8 70.1 C 381.7 70.1 378.6 70.7 376.8 72 C 375 73.3 374 75.4 374 78.2 L 374 78.6 C 374 80.2 374.2 81.5 374.7 82.5 C 375.2 83.6 375.8 84.4 376.6 85.1 C 377.4 85.7 378.2 86.2 379.2 86.5 C 380.2 86.8 381.2 86.9 382.3 86.9 C 383.7 86.9 385 86.7 386 86.3 C 387 85.9 388 85.4 389 84.7 L 389 85.5 C 389 85.8 389.1 86 389.3 86.2 C 389.5 86.4 389.7 86.5 390 86.5 L 395.4 86.5 C 395.7 86.5 395.9 86.4 396.1 86.2 C 396.3 86 396.4 85.8 396.4 85.5 L 396.4 68.3 L 396.2 68.3 Z M 370.5 85.6 L 370.5 81.8 C 370.5 81.3 370.2 81 369.5 81 L 367.1 81 C 366.4 81 365.9 80.9 365.8 80.6 C 365.6 80.3 365.6 79.7 365.6 78.7 L 365.6 64.7 L 369.5 64.7 C 369.8 64.7 370 64.6 370.2 64.4 C 370.4 64.2 370.5 64 370.5 63.7 L 370.5 59.8 C 370.5 59.5 370.4 59.3 370.2 59.1 C 370 58.9 369.8 58.8 369.5 58.8 L 365.6 58.8 L 365.6 53.8 C 365.6 53.5 365.5 53.3 365.4 53.2 C 365.2 53.1 365 53 364.8 53 L 364.7 53 L 358.9 54 C 358.6 54.1 358.4 54.2 358.2 54.3 C 358 54.5 357.9 54.7 357.9 54.9 L 357.9 58.8 L 354 58.8 C 353.7 58.8 353.5 58.9 353.3 59.1 C 353.1 59.3 353 59.5 353 59.8 L 353 63 C 353 63.3 353.1 63.5 353.3 63.6 C 353.5 63.8 353.7 63.9 354 64 L 357.9 64.6 L 357.9 78.6 C 357.9 80.3 358.1 81.7 358.4 82.8 C 358.8 83.9 359.3 84.7 359.9 85.3 C 360.6 85.9 361.4 86.3 362.4 86.5 C 363.4 86.7 364.6 86.8 365.9 86.8 C 366.6 86.8 367.2 86.8 367.8 86.7 C 368.3 86.6 369 86.5 369.7 86.4 C 370.2 86.4 370.5 86.1 370.5 85.6 M 349.5 85.5 L 349.5 69.5 C 349.5 68 349.4 66.6 349.1 65.2 C 348.9 63.9 348.4 62.7 347.8 61.7 C 347.2 60.7 346.3 59.9 345.2 59.4 C 344.1 58.8 342.7 58.5 340.9 58.5 C 339.4 58.5 338 58.7 336.8 59.1 C 335.6 59.5 334.4 60.1 333 61.1 L 333 59.8 C 333 59.5 332.9 59.3 332.7 59.1 C 332.5 58.9 332.3 58.8 332 58.8 L 326.6 58.8 C 326.3 58.8 326.1 58.9 325.9 59.1 C 325.7 59.3 325.6 59.5 325.6 59.8 L 325.6 85.4 C 325.6 85.7 325.7 85.9 325.9 86.1 C 326.1 86.3 326.3 86.4 326.6 86.4 L 332.4 86.4 C 332.7 86.4 332.9 86.3 333.1 86.1 C 333.3 85.9 333.4 85.7 333.4 85.4 L 333.4 66.5 C 334.2 66.1 335 65.7 335.8 65.4 C 336.5 65.1 337.3 65 338 65 C 338.7 65 339.3 65.1 339.8 65.2 C 340.3 65.3 340.6 65.6 340.9 65.9 C 341.2 66.3 341.3 66.7 341.4 67.3 C 341.5 67.9 341.5 68.6 341.5 69.4 L 341.5 85.4 C 341.5 85.7 341.6 85.9 341.8 86.1 C 342 86.3 342.2 86.4 342.5 86.4 L 348.3 86.4 C 348.6 86.4 348.8 86.3 349 86.1 C 349.4 85.9 349.5 85.7 349.5 85.5 M 313.1 74.4 C 313.1 78.3 311.7 80.3 308.8 80.3 C 307.4 80.3 306.3 79.8 305.6 78.8 C 304.9 77.8 304.5 76.3 304.5 74.4 L 304.5 71 C 304.5 69 304.9 67.6 305.6 66.6 C 306.3 65.6 307.4 65.1 308.8 65.1 C 311.6 65.1 313.1 67.1 313.1 71 L 313.1 74.4 Z M 320.9 71 C 320.9 69.1 320.6 67.3 320.1 65.8 C 319.6 64.3 318.8 63 317.8 61.9 C 316.8 60.8 315.5 60 314 59.4 C 312.5 58.8 310.8 58.5 308.8 58.5 C 306.8 58.5 305.1 58.8 303.6 59.4 C 302.1 60 300.8 60.8 299.8 61.9 C 298.8 63 298 64.3 297.5 65.8 C 297 67.3 296.7 69.1 296.7 71 L 296.7 74.4 C 296.7 76.3 297 78.1 297.5 79.6 C 298 81.1 298.8 82.4 299.8 83.5 C 300.8 84.6 302.1 85.4 303.6 86 C 305.1 86.6 306.8 86.9 308.8 86.9 C 310.8 86.9 312.5 86.6 314 86 C 315.5 85.4 316.8 84.6 317.8 83.5 C 318.8 82.4 319.6 81.1 320.1 79.6 C 320.6 78.1 320.9 76.3 320.9 74.4 L 320.9 71 Z M 294.1 85.1 L 294.1 80.8 C 294.1 80.5 294 80.3 293.8 80.2 C 293.6 80.1 293.4 80 293.1 80 L 293 80 C 292.1 80.1 291.2 80.2 290.4 80.2 C 289.6 80.2 288.5 80.3 287.1 80.3 C 286.6 80.3 286 80.2 285.6 80 C 285.1 79.8 284.7 79.5 284.3 79.1 C 283.9 78.7 283.7 78.1 283.5 77.4 C 283.3 76.7 283.2 75.8 283.2 74.7 L 283.2 70.7 C 283.2 69.6 283.3 68.7 283.5 68 C 283.7 67.3 284 66.7 284.3 66.3 C 284.7 65.9 285.1 65.6 285.6 65.4 C 286.1 65.2 286.6 65.1 287.1 65.1 C 288.5 65.1 289.6 65.1 290.4 65.2 C 291.2 65.3 292.1 65.3 293 65.4 L 293.1 65.4 C 293.4 65.4 293.6 65.3 293.8 65.2 C 294 65.1 294.1 64.9 294.1 64.6 L 294.1 60.3 C 294.1 59.9 294 59.7 293.9 59.6 C 293.7 59.5 293.5 59.3 293.1 59.2 C 292.4 59 291.6 58.9 290.5 58.7 C 289.4 58.5 288.2 58.5 286.7 58.5 C 283.3 58.5 280.6 59.5 278.5 61.6 C 276.5 63.7 275.4 66.7 275.4 70.7 L 275.4 74.7 C 275.4 78.6 276.4 81.7 278.5 83.8 C 280.5 85.9 283.3 86.9 286.7 86.9 C 288.1 86.9 289.4 86.8 290.5 86.7 C 291.6 86.5 292.4 86.4 293.1 86.2 C 293.5 86.1 293.7 86 293.9 85.8 C 294 85.7 294.1 85.4 294.1 85.1 M 270.4 85.5 L 270.4 69.5 C 270.4 68 270.3 66.6 270 65.2 C 269.7 63.8 269.3 62.7 268.7 61.7 C 268.1 60.7 267.2 59.9 266.1 59.4 C 265 58.8 263.6 58.5 261.8 58.5 C 260.3 58.5 258.9 58.7 257.7 59.1 C 256.5 59.5 255.3 60.1 253.9 61.1 L 253.9 59.8 C 253.9 59.5 253.8 59.3 253.6 59.1 C 253.4 58.9 253.2 58.8 252.9 58.8 L 247.5 58.8 C 247.2 58.8 247 58.9 246.8 59.1 C 246.6 59.3 246.5 59.5 246.5 59.8 L 246.5 85.4 C 246.5 85.7 246.6 85.9 246.8 86.1 C 247 86.3 247.2 86.4 247.5 86.4 L 253.3 86.4 C 253.6 86.4 253.8 86.3 254 86.1 C 254.2 85.9 254.3 85.7 254.3 85.4 L 254.3 66.5 C 255.1 66.1 255.9 65.7 256.7 65.4 C 257.4 65.1 258.2 65 258.9 65 C 259.6 65 260.2 65.1 260.7 65.2 C 261.2 65.3 261.5 65.6 261.8 65.9 C 262.1 66.3 262.2 66.7 262.3 67.3 C 262.4 67.9 262.4 68.6 262.4 69.4 L 262.4 85.4 C 262.4 85.7 262.5 85.9 262.7 86.1 C 262.9 86.3 263.1 86.4 263.4 86.4 L 269.2 86.4 C 269.5 86.4 269.7 86.3 269.9 86.1 C 270.3 85.9 270.4 85.7 270.4 85.5 M 233.3 80 C 232.7 80.3 232.1 80.5 231.4 80.7 C 230.7 80.9 230 81 229.3 81 C 228.3 81 227.5 80.9 227 80.6 C 226.5 80.3 226.3 79.7 226.3 78.6 L 226.3 78.2 C 226.3 77.6 226.4 77.1 226.5 76.7 C 226.6 76.3 226.9 75.9 227.2 75.6 C 227.5 75.3 228 75.1 228.5 74.9 C 229 74.8 229.7 74.7 230.6 74.7 L 233.3 74.7 L 233.3 80 L 233.3 80 Z M 241 68.3 C 241 66.5 240.7 65 240.2 63.8 C 239.7 62.6 238.9 61.6 238 60.8 C 237 60 235.9 59.4 234.5 59.1 C 233.1 58.7 231.5 58.5 229.8 58.5 C 228.2 58.5 226.6 58.6 225.1 58.8 C 223.6 59 222.4 59.2 221.5 59.5 C 220.9 59.7 220.6 60 220.6 60.6 L 220.6 64.5 C 220.6 64.8 220.7 65 220.8 65.2 C 221 65.3 221.2 65.4 221.4 65.4 L 221.6 65.4 C 222 65.4 222.5 65.3 223 65.3 C 223.6 65.3 224.2 65.2 225 65.2 C 225.7 65.2 226.5 65.1 227.3 65.1 C 228.1 65.1 228.9 65.1 229.6 65.1 C 230.7 65.1 231.6 65.3 232.2 65.7 C 232.8 66.1 233.2 67 233.2 68.4 L 233.2 70.1 L 230.6 70.1 C 226.5 70.1 223.4 70.7 221.6 72 C 219.8 73.3 218.8 75.4 218.8 78.2 L 218.8 78.6 C 218.8 80.2 219 81.5 219.5 82.5 C 220 83.6 220.6 84.4 221.4 85.1 C 222.2 85.7 223 86.2 224 86.5 C 225 86.8 226 86.9 227.1 86.9 C 228.5 86.9 229.8 86.7 230.8 86.3 C 231.8 85.9 232.8 85.4 233.8 84.7 L 233.8 85.5 C 233.8 85.8 233.9 86 234.1 86.2 C 234.3 86.4 234.5 86.5 234.8 86.5 L 240.2 86.5 C 240.5 86.5 240.7 86.4 240.9 86.2 C 241.1 86 241.2 85.8 241.2 85.5 L 241.2 68.3 L 241 68.3 Z M 206.6 75.9 C 206.6 77.2 206.1 78.3 205.2 79 C 204.3 79.7 202.5 80.1 200.1 80.1 L 199.3 80.1 C 198.9 80.1 198.5 80.1 198.1 80.1 C 197.7 80.1 197.3 80.1 196.9 80.1 L 196.1 80.1 L 196.1 71.1 L 201.5 71.1 C 203.4 71.1 204.8 71.5 205.5 72.4 C 206.2 73.3 206.6 74.3 206.6 75.4 L 206.6 75.9 Z M 206.4 61.6 C 206.4 62.1 206.3 62.6 206.2 63.1 C 206 63.6 205.8 64 205.4 64.3 C 205 64.6 204.5 64.9 203.9 65.1 C 203.3 65.3 202.5 65.4 201.5 65.4 L 196.1 65.4 L 196.1 57.1 C 196.3 57.1 196.5 57.1 196.8 57.1 C 197.1 57.1 197.5 57.1 197.9 57.1 L 199 57.1 L 199.8 57.1 C 202.3 57.1 204 57.4 205 58 C 206 58.6 206.5 59.6 206.5 60.9 L 206.5 61.6 L 206.4 61.6 Z M 214.6 75.4 C 214.6 73.7 214.2 72.3 213.4 71.1 C 212.6 69.9 211.6 68.9 210.3 68.3 C 211.6 67.7 212.6 66.7 213.3 65.5 C 214 64.2 214.4 62.8 214.4 61.3 L 214.4 60.4 C 214.4 58.5 214 56.9 213.3 55.6 C 212.6 54.3 211.5 53.3 210.2 52.5 C 208.9 51.7 207.3 51.2 205.4 50.8 C 203.5 50.5 201.5 50.3 199.2 50.3 C 198.4 50.3 197.6 50.3 196.8 50.3 C 196 50.3 195.2 50.4 194.4 50.4 C 193.6 50.4 192.9 50.5 192.2 50.6 C 191.5 50.7 191 50.7 190.6 50.8 C 189.7 51 189 51.3 188.6 51.7 C 188.2 52.1 188 52.9 188 54 L 188 83.3 C 188 84.4 188.2 85.1 188.6 85.6 C 189 86 189.7 86.3 190.6 86.5 C 191.1 86.6 191.7 86.7 192.3 86.7 C 193 86.8 193.7 86.8 194.5 86.9 C 195.3 86.9 196.1 87 196.9 87 C 197.7 87 198.6 87 199.4 87 C 201.5 87 203.5 86.8 205.3 86.5 C 207.1 86.2 208.7 85.6 210.1 84.8 C 211.5 84 212.5 82.9 213.4 81.5 C 214.2 80.1 214.6 78.3 214.6 76.2 L 214.6 75.4 L 214.6 75.4 Z"/>\n  </g>\n</svg>';
    },
    "./src/resources/fundingLogos/bancontact_white.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg version="1.1" id="Layer_1" x="0px" y="0px" width="258px" height="32px" viewBox="0 0 258 32" enable-background="new 0 0 403.866 49.999" xmlns="http://www.w3.org/2000/svg">\n  <g>\n    <path fill="none" d="M440.514,66.851c0,10.913-8.929,19.843-19.843,19.843H-16.593c-10.913,0-19.843-8.929-19.843-19.843v-83.81&#10;&#9;&#9;c0-10.913,8.929-19.843,19.843-19.843h437.264c10.913,0,19.843,8.929,19.843,19.843V66.851z"/>\n  </g>\n  <g transform="matrix(0.637323, 0, 0, 0.637323, 0, 0)">\n    <path fill="#FFFFFF" d="M404.061,48.855v-3.727c0-0.541-0.337-0.812-1.011-0.812h-2.36c-0.739,0-1.188-0.136-1.348-0.409&#10;&#9;&#9;c-0.161-0.272-0.241-0.891-0.241-1.854V28.039h3.949c0.256,0,0.481-0.097,0.674-0.291c0.192-0.194,0.289-0.421,0.289-0.68v-3.933&#10;&#9;&#9;c0-0.258-0.097-0.486-0.289-0.68c-0.193-0.194-0.418-0.291-0.674-0.291h-3.949v-5.105c0-0.256-0.08-0.457-0.24-0.602&#10;&#9;&#9;c-0.159-0.144-0.367-0.216-0.622-0.216h-0.144l-5.839,1.011c-0.256,0.065-0.479,0.177-0.67,0.337&#10;&#9;&#9;c-0.191,0.161-0.287,0.369-0.287,0.626v3.949h-3.852c-0.258,0-0.49,0.105-0.699,0.313c-0.209,0.209-0.313,0.442-0.313,0.698v3.179&#10;&#9;&#9;c0,0.257,0.104,0.474,0.313,0.65c0.209,0.177,0.441,0.297,0.699,0.361l3.852,0.626v13.966c0,1.702,0.176,3.09,0.526,4.165&#10;&#9;&#9;c0.351,1.076,0.862,1.919,1.532,2.529c0.67,0.61,1.507,1.019,2.513,1.228c1.005,0.208,2.162,0.313,3.472,0.313&#10;&#9;&#9;c0.705,0,1.331-0.033,1.878-0.096c0.545-0.064,1.187-0.159,1.926-0.287C403.755,49.715,404.061,49.396,404.061,48.855&#10;&#9;&#9; M383.305,48.362v-4.286c0-0.257-0.089-0.458-0.265-0.602c-0.177-0.145-0.393-0.217-0.65-0.217h-0.096&#10;&#9;&#9;c-0.899,0.096-1.758,0.177-2.577,0.241c-0.818,0.064-1.918,0.096-3.298,0.096c-0.547,0-1.06-0.088-1.541-0.265&#10;&#9;&#9;c-0.482-0.176-0.9-0.481-1.253-0.915c-0.353-0.433-0.634-1.011-0.842-1.733c-0.21-0.723-0.313-1.614-0.313-2.673v-4.045&#10;&#9;&#9;c0-1.06,0.103-1.951,0.313-2.673c0.208-0.723,0.489-1.3,0.842-1.734c0.353-0.433,0.771-0.738,1.253-0.915&#10;&#9;&#9;c0.481-0.176,0.994-0.265,1.541-0.265c1.38,0,2.48,0.033,3.298,0.097c0.819,0.064,1.678,0.144,2.577,0.24h0.096&#10;&#9;&#9;c0.257,0,0.473-0.072,0.65-0.216c0.176-0.145,0.265-0.345,0.265-0.602v-4.286c0-0.353-0.08-0.602-0.241-0.747&#10;&#9;&#9;c-0.161-0.144-0.417-0.265-0.77-0.361c-0.674-0.16-1.55-0.32-2.625-0.482c-1.076-0.16-2.335-0.24-3.78-0.24&#10;&#9;&#9;c-3.404,0-6.124,1.043-8.163,3.13s-3.058,5.105-3.058,9.054v4.045c0,3.949,1.019,6.967,3.058,9.053&#10;&#9;&#9;c2.039,2.088,4.759,3.131,8.163,3.131c1.445,0,2.704-0.081,3.78-0.241c1.075-0.161,1.951-0.321,2.625-0.482&#10;&#9;&#9;c0.353-0.096,0.609-0.216,0.77-0.361C383.225,48.964,383.305,48.715,383.305,48.362 M351.955,43.257&#10;&#9;&#9;c-0.578,0.289-1.197,0.538-1.854,0.746c-0.659,0.21-1.357,0.313-2.095,0.313c-1.028,0-1.79-0.144-2.288-0.433&#10;&#9;&#9;c-0.498-0.289-0.746-0.947-0.746-1.974v-0.434c0-0.578,0.064-1.091,0.193-1.541c0.127-0.449,0.352-0.819,0.674-1.108&#10;&#9;&#9;c0.32-0.288,0.754-0.505,1.3-0.65c0.546-0.144,1.236-0.216,2.071-0.216h2.745V43.257z M359.612,31.603&#10;&#9;&#9;c0-1.765-0.265-3.267-0.795-4.503c-0.53-1.235-1.276-2.247-2.239-3.034c-0.963-0.786-2.143-1.364-3.54-1.733&#10;&#9;&#9;c-1.396-0.369-2.961-0.554-4.695-0.554c-1.606,0-3.171,0.113-4.695,0.337c-1.526,0.225-2.738,0.45-3.636,0.674&#10;&#9;&#9;c-0.611,0.161-0.915,0.514-0.915,1.059v3.901c0,0.322,0.079,0.547,0.24,0.674c0.161,0.129,0.369,0.193,0.626,0.193h0.241&#10;&#9;&#9;c0.386-0.032,0.867-0.072,1.445-0.12c0.578-0.048,1.228-0.088,1.95-0.121c0.723-0.031,1.477-0.055,2.264-0.072&#10;&#9;&#9;c0.786-0.016,1.565-0.024,2.335-0.024c1.124,0,2.007,0.209,2.649,0.626c0.642,0.418,0.963,1.317,0.963,2.697v1.734h-2.6&#10;&#9;&#9;c-4.142,0-7.152,0.65-9.03,1.95c-1.878,1.3-2.817,3.363-2.817,6.188v0.434c0,1.573,0.232,2.889,0.698,3.948&#10;&#9;&#9;c0.465,1.06,1.084,1.911,1.854,2.553c0.771,0.642,1.645,1.1,2.625,1.372c0.979,0.273,1.998,0.41,3.058,0.41&#10;&#9;&#9;c1.445,0,2.688-0.193,3.732-0.578c1.043-0.385,2.03-0.915,2.962-1.589v0.77c0,0.257,0.096,0.482,0.289,0.674&#10;&#9;&#9;c0.192,0.193,0.417,0.289,0.674,0.289h5.394c0.256,0,0.481-0.096,0.674-0.289c0.192-0.192,0.289-0.417,0.289-0.674V31.603z&#10;&#9;&#9; M333.896,48.855v-3.727c0-0.541-0.337-0.812-1.011-0.812h-2.36c-0.739,0-1.188-0.136-1.348-0.409&#10;&#9;&#9;c-0.161-0.272-0.241-0.891-0.241-1.854V28.039h3.949c0.256,0,0.481-0.097,0.674-0.291s0.289-0.421,0.289-0.68v-3.933&#10;&#9;&#9;c0-0.258-0.096-0.486-0.289-0.68c-0.193-0.194-0.418-0.291-0.674-0.291h-3.949v-5.105c0-0.256-0.08-0.457-0.239-0.602&#10;&#9;&#9;c-0.16-0.144-0.368-0.216-0.623-0.216h-0.143l-5.839,1.011c-0.256,0.065-0.48,0.177-0.671,0.337&#10;&#9;&#9;c-0.191,0.161-0.287,0.369-0.287,0.626v3.949h-3.852c-0.258,0-0.49,0.105-0.699,0.313c-0.209,0.209-0.313,0.442-0.313,0.698v3.179&#10;&#9;&#9;c0,0.257,0.104,0.474,0.313,0.65c0.209,0.177,0.441,0.297,0.699,0.361l3.852,0.626v13.966c0,1.702,0.176,3.09,0.526,4.165&#10;&#9;&#9;c0.351,1.076,0.862,1.919,1.532,2.529c0.67,0.61,1.508,1.019,2.513,1.228c1.005,0.208,2.162,0.313,3.472,0.313&#10;&#9;&#9;c0.705,0,1.332-0.033,1.878-0.096c0.545-0.064,1.187-0.159,1.926-0.287C333.591,49.715,333.896,49.396,333.896,48.855&#10;&#9;&#9; M312.899,48.747V32.71c0-1.508-0.121-2.929-0.361-4.261c-0.241-1.332-0.675-2.488-1.301-3.468c-0.626-0.979-1.493-1.758-2.6-2.335&#10;&#9;&#9;c-1.108-0.578-2.528-0.867-4.262-0.867c-1.541,0-2.906,0.186-4.094,0.558c-1.188,0.372-2.44,1.027-3.756,1.965v-1.167&#10;&#9;&#9;c0-0.258-0.096-0.485-0.289-0.679c-0.192-0.194-0.417-0.292-0.674-0.292h-5.394c-0.257,0-0.481,0.096-0.674,0.289&#10;&#9;&#9;c-0.192,0.193-0.289,0.418-0.289,0.674v25.62c0,0.257,0.104,0.49,0.313,0.698c0.209,0.209,0.441,0.313,0.699,0.313h5.827&#10;&#9;&#9;c0.256,0,0.481-0.104,0.674-0.312c0.192-0.208,0.289-0.44,0.289-0.697V29.817c0.834-0.448,1.621-0.816,2.359-1.104&#10;&#9;&#9;c0.739-0.289,1.461-0.433,2.168-0.433c0.738,0,1.34,0.072,1.805,0.217c0.465,0.144,0.827,0.392,1.084,0.745&#10;&#9;&#9;c0.257,0.352,0.433,0.816,0.53,1.392c0.096,0.577,0.144,1.282,0.144,2.115v16c0,0.257,0.097,0.489,0.289,0.697&#10;&#9;&#9;c0.193,0.208,0.417,0.312,0.674,0.312h5.827c0.257,0,0.49-0.104,0.699-0.313C312.794,49.237,312.899,49.004,312.899,48.747&#10;&#9;&#9; M276.444,37.671c0,3.949-1.421,5.923-4.262,5.923c-1.405,0-2.474-0.497-3.208-1.493c-0.735-0.995-1.102-2.472-1.102-4.43V34.3&#10;&#9;&#9;c0-1.958,0.367-3.427,1.102-4.407c0.734-0.979,1.803-1.469,3.208-1.469c2.841,0,4.262,1.959,4.262,5.876V37.671z M284.246,34.3&#10;&#9;&#9;c0-1.927-0.266-3.66-0.797-5.201c-0.531-1.541-1.303-2.849-2.316-3.925c-1.013-1.075-2.268-1.91-3.763-2.504&#10;&#9;&#9;c-1.496-0.594-3.226-0.891-5.188-0.891c-1.962,0-3.691,0.297-5.187,0.891c-1.496,0.594-2.759,1.429-3.788,2.504&#10;&#9;&#9;c-1.03,1.076-1.81,2.384-2.34,3.925c-0.532,1.541-0.797,3.274-0.797,5.201v3.371c0,1.926,0.265,3.66,0.797,5.201&#10;&#9;&#9;c0.53,1.541,1.31,2.849,2.34,3.925c1.029,1.076,2.292,1.91,3.788,2.504c1.496,0.593,3.225,0.891,5.187,0.891&#10;&#9;&#9;c1.962,0,3.692-0.298,5.188-0.891c1.495-0.594,2.75-1.428,3.763-2.504s1.785-2.384,2.316-3.925&#10;&#9;&#9;c0.531-1.541,0.797-3.275,0.797-5.201V34.3z M257.518,48.362v-4.286c0-0.257-0.089-0.458-0.265-0.602&#10;&#9;&#9;c-0.177-0.145-0.394-0.217-0.65-0.217h-0.097c-0.899,0.096-1.757,0.177-2.576,0.241c-0.819,0.064-1.919,0.096-3.299,0.096&#10;&#9;&#9;c-0.546,0-1.059-0.088-1.541-0.265c-0.482-0.176-0.899-0.481-1.252-0.915c-0.354-0.433-0.634-1.011-0.843-1.733&#10;&#9;&#9;c-0.209-0.723-0.313-1.614-0.313-2.673v-4.045c0-1.06,0.104-1.951,0.313-2.673c0.209-0.723,0.489-1.3,0.843-1.734&#10;&#9;&#9;c0.353-0.433,0.77-0.738,1.252-0.915c0.482-0.176,0.995-0.265,1.541-0.265c1.38,0,2.48,0.033,3.299,0.097&#10;&#9;&#9;c0.819,0.064,1.677,0.144,2.576,0.24h0.097c0.256,0,0.473-0.072,0.65-0.216c0.176-0.145,0.265-0.345,0.265-0.602v-4.286&#10;&#9;&#9;c0-0.353-0.081-0.602-0.241-0.747c-0.161-0.144-0.418-0.265-0.771-0.361c-0.674-0.16-1.549-0.32-2.624-0.482&#10;&#9;&#9;c-1.076-0.16-2.336-0.24-3.781-0.24c-3.403,0-6.124,1.043-8.162,3.13c-2.039,2.087-3.058,5.105-3.058,9.054v4.045&#10;&#9;&#9;c0,3.949,1.019,6.967,3.058,9.053c2.038,2.088,4.759,3.131,8.162,3.131c1.445,0,2.705-0.081,3.781-0.241&#10;&#9;&#9;c1.075-0.161,1.95-0.321,2.624-0.482c0.353-0.096,0.61-0.216,0.771-0.361C257.437,48.964,257.518,48.715,257.518,48.362&#10;&#9;&#9; M233.824,48.747V32.71c0-1.508-0.12-2.929-0.361-4.261c-0.241-1.332-0.674-2.488-1.3-3.468c-0.626-0.979-1.493-1.758-2.601-2.335&#10;&#9;&#9;c-1.107-0.578-2.528-0.867-4.262-0.867c-1.541,0-2.906,0.186-4.093,0.558c-1.188,0.372-2.44,1.027-3.756,1.965v-1.167&#10;&#9;&#9;c0-0.258-0.097-0.485-0.289-0.679c-0.193-0.194-0.418-0.292-0.675-0.292h-5.393c-0.258,0-0.482,0.096-0.674,0.289&#10;&#9;&#9;c-0.193,0.193-0.289,0.418-0.289,0.674v25.62c0,0.257,0.103,0.49,0.313,0.698c0.208,0.209,0.441,0.313,0.698,0.313h5.827&#10;&#9;&#9;c0.257,0,0.482-0.104,0.674-0.312c0.193-0.208,0.289-0.44,0.289-0.697V29.817c0.835-0.448,1.621-0.816,2.36-1.104&#10;&#9;&#9;c0.738-0.289,1.46-0.433,2.167-0.433c0.738,0,1.34,0.072,1.806,0.217c0.465,0.144,0.826,0.392,1.083,0.745&#10;&#9;&#9;c0.257,0.352,0.434,0.816,0.53,1.392c0.096,0.577,0.145,1.282,0.145,2.115v16c0,0.257,0.096,0.489,0.289,0.697&#10;&#9;&#9;c0.192,0.208,0.416,0.312,0.674,0.312h5.827c0.256,0,0.489-0.104,0.698-0.313C233.72,49.237,233.824,49.004,233.824,48.747&#10;&#9;&#9; M196.695,43.257c-0.578,0.289-1.197,0.538-1.854,0.746c-0.659,0.21-1.357,0.313-2.095,0.313c-1.028,0-1.79-0.144-2.288-0.433&#10;&#9;&#9;c-0.498-0.289-0.746-0.947-0.746-1.974v-0.434c0-0.578,0.064-1.091,0.193-1.541c0.128-0.449,0.353-0.819,0.674-1.108&#10;&#9;&#9;c0.32-0.288,0.754-0.505,1.3-0.65c0.546-0.144,1.236-0.216,2.071-0.216h2.745V43.257z M204.352,31.603&#10;&#9;&#9;c0-1.765-0.265-3.267-0.795-4.503c-0.529-1.235-1.276-2.247-2.239-3.034c-0.963-0.786-2.143-1.364-3.54-1.733&#10;&#9;&#9;c-1.396-0.369-2.961-0.554-4.695-0.554c-1.606,0-3.171,0.113-4.695,0.337c-1.526,0.225-2.738,0.45-3.636,0.674&#10;&#9;&#9;c-0.61,0.161-0.915,0.514-0.915,1.059v3.901c0,0.322,0.08,0.547,0.241,0.674c0.16,0.129,0.368,0.193,0.626,0.193h0.24&#10;&#9;&#9;c0.386-0.032,0.867-0.072,1.445-0.12c0.578-0.048,1.228-0.088,1.951-0.121c0.722-0.031,1.476-0.055,2.263-0.072&#10;&#9;&#9;c0.786-0.016,1.565-0.024,2.336-0.024c1.123,0,2.006,0.209,2.648,0.626c0.642,0.418,0.963,1.317,0.963,2.697v1.734h-2.6&#10;&#9;&#9;c-4.142,0-7.152,0.65-9.03,1.95c-1.878,1.3-2.817,3.363-2.817,6.188v0.434c0,1.573,0.233,2.889,0.698,3.948&#10;&#9;&#9;c0.465,1.06,1.084,1.911,1.854,2.553c0.771,0.642,1.645,1.1,2.625,1.372c0.979,0.273,1.999,0.41,3.058,0.41&#10;&#9;&#9;c1.445,0,2.689-0.193,3.732-0.578c1.043-0.385,2.03-0.915,2.962-1.589v0.77c0,0.257,0.096,0.482,0.289,0.674&#10;&#9;&#9;c0.193,0.193,0.417,0.289,0.674,0.289h5.394c0.256,0,0.481-0.096,0.674-0.289c0.193-0.192,0.289-0.417,0.289-0.674V31.603z&#10;&#9;&#9; M169.968,39.212c0,1.348-0.474,2.392-1.421,3.13c-0.947,0.739-2.657,1.108-5.129,1.108h-0.794c-0.37,0-0.755-0.008-1.156-0.024&#10;&#9;&#9;c-0.402-0.016-0.787-0.025-1.156-0.025h-0.842v-9.005h5.393c1.926,0,3.258,0.426,3.997,1.276c0.738,0.851,1.108,1.854,1.108,3.01&#10;&#9;&#9;V39.212z M169.775,24.861c0,0.514-0.08,1.004-0.241,1.469c-0.161,0.465-0.425,0.866-0.794,1.204&#10;&#9;&#9;c-0.37,0.337-0.867,0.61-1.493,0.818c-0.626,0.209-1.421,0.313-2.384,0.313h-5.393v-8.331c0.16,0,0.409-0.008,0.746-0.024&#10;&#9;&#9;c0.337-0.016,0.69-0.024,1.059-0.024h1.06h0.794c2.472,0,4.198,0.313,5.177,0.939c0.979,0.626,1.469,1.597,1.469,2.913V24.861z&#10;&#9;&#9; M177.962,38.682c0-1.669-0.394-3.114-1.18-4.334c-0.787-1.22-1.822-2.151-3.106-2.793c1.284-0.642,2.279-1.59,2.986-2.842&#10;&#9;&#9;c0.706-1.252,1.059-2.664,1.059-4.237v-0.867c0-1.927-0.369-3.532-1.107-4.816c-0.739-1.284-1.775-2.312-3.107-3.082&#10;&#9;&#9;c-1.332-0.771-2.93-1.324-4.791-1.662c-1.863-0.337-3.933-0.505-6.213-0.505c-0.77,0-1.573,0.016-2.407,0.048&#10;&#9;&#9;c-0.836,0.032-1.646,0.072-2.432,0.12c-0.787,0.048-1.51,0.105-2.167,0.169c-0.659,0.065-1.197,0.129-1.614,0.192&#10;&#9;&#9;c-0.931,0.162-1.589,0.45-1.974,0.867c-0.385,0.418-0.578,1.173-0.578,2.264v29.28c0,1.091,0.2,1.846,0.602,2.263&#10;&#9;&#9;c0.401,0.418,1.083,0.706,2.047,0.867c0.481,0.096,1.059,0.176,1.733,0.241c0.674,0.064,1.404,0.12,2.191,0.168&#10;&#9;&#9;c0.787,0.048,1.597,0.088,2.432,0.121c0.835,0.031,1.653,0.048,2.456,0.048c2.087,0,4.053-0.161,5.9-0.482&#10;&#9;&#9;c1.845-0.32,3.45-0.891,4.815-1.71c1.365-0.818,2.448-1.926,3.251-3.322c0.802-1.397,1.204-3.155,1.204-5.274V38.682z"/>\n    <g>\n      <path fill="#FFFFFF" d="M111.197,13.496H74.411L52.094,39.608h-44l11.876-13.99h-2.404h-7.519H5.835&#10;&#9;&#9;&#9;C2.626,25.618,0,28.311,0,31.601v0v11.555v1.07c0,3.291,2.626,5.984,5.835,5.984h1.639h61.221h4.389c3.209,0,7.593-2,9.742-4.444&#10;&#9;&#9;&#9;l10.172-11.57l18.037-20.517L111.197,13.496z"/>\n      <polygon fill="#FFFFFF" points="105.356,20.145 101.451,24.591 101.451,24.591 105.356,20.145 &#9;&#9;"/>\n      <path fill="#FFFFFF" d="M118.959,0H51.902c-3.209,0-7.599,1.994-9.755,4.432l-28.55,32.282h36.646l22.714-26.106h43.804&#10;&#9;&#9;&#9;l-11.766,13.983h13.964c3.209,0,5.835-2.693,5.835-5.984V5.984C124.794,2.693,122.168,0,118.959,0z"/>\n      <polygon fill="#FFFFFF" points="109.24,15.724 107.292,17.941 106.772,18.533 &#9;&#9;"/>\n    </g>\n  </g>\n</svg>';
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
    "./src/resources/fundingLogos/eps.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="52px" height="32px" viewBox="0 0 52 32" version="1.1" xmlns="http://www.w3.org/2000/svg">\n  <title>Page 1</title>\n  <desc>Created with Sketch.</desc>\n  <defs>\n    <polygon id="path-1" points="0 0.0330469345 12.6787834 0.0330469345 12.6787834 12.7180364 0 12.7180364"/>\n    <polygon id="path-3" points="0.0103575649 0.00128879493 1.81575683 0.00128879493 1.81575683 2.2832981 0.0103575649 2.2832981"/>\n  </defs>\n  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="matrix(1.333759, 0, 0, 1.333759, 0.000008, -0.000005)">\n    <g id="SPB_&amp;_AltPay_NewAssets" transform="translate(-100.000000, -159.000000)">\n      <g id="Page-1" transform="translate(100.000000, 159.000000)">\n        <path d="M30.5812744,12.0000152 L27.4748661,12.0000152 C27.129394,12.0000152 26.8482796,11.7245987 26.8482796,11.3798207 C26.8482796,11.0350427 27.129394,10.7315163 27.4748661,10.7315163 L32.2041612,10.7315163 L32.2041612,8.39747822 L27.4748661,8.39747822 C25.824238,8.39747822 24.4812484,9.74381226 24.4812484,11.3911357 C24.4812484,13.0384592 25.824238,14.3847932 27.4748661,14.3847932 L30.5390793,14.3847932 C30.8846021,14.3847932 31.1657165,14.6590934 31.1657165,15.0038715 C31.1657165,15.3486495 30.8846021,15.6025522 30.5390793,15.6025522 L23.9683147,15.6025522 C23.4104473,16.6680913 22.8679974,17.5814106 21.7668179,18.0380702 L30.5812744,18.0380702 C32.2041612,18.0146791 33.5316827,16.6405903 33.5316827,15.0078292 C33.5316827,13.3751696 32.2041612,12.0234063 30.5812744,12.0000152" id="Fill-1" fill="#71706F"/>\n        <path d="M18.6731848,15.6025522 L16.2795788,15.6025522 L16.2795788,13.1992034 C16.2795788,11.8562182 17.3483005,10.7635839 18.6731848,10.7635839 C19.9980691,10.7635839 21.0759195,11.8562182 21.0759195,13.1992034 C21.0759195,14.5422393 19.9980691,15.6025522 18.6731848,15.6025522 M18.6731848,8.39747822 C16.0403551,8.39747822 13.8959637,10.5557023 13.8959637,13.2076262 L13.8959637,13.3091061 L13.8959637,23.2135459 L16.2795788,23.2135459 L16.2795788,18.0380702 L18.6682147,18.0380702 C21.3010951,18.0380702 23.4379299,15.8511273 23.4379299,13.1992034 C23.4379299,10.5472795 21.3060651,8.39747822 18.6731848,8.39747822" id="Fill-3" fill="#71706F"/>\n        <g id="Group-7" transform="translate(0.000000, 6.842233)">\n          <mask id="mask-2" fill="white">\n            <polygon id="" points="0 0.0330469345 12.6787834 0.0330469345 12.6787834 12.7180364 0 12.7180364" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n          </mask>\n          <g id="Clip-6"/>\n          <path d="M6.34967672,11.1958376 C4.09589259,11.1958376 2.20112146,9.58905539 1.68833992,7.48994334 C1.68833992,7.48994334 1.54020078,6.7959222 1.54020078,6.3389074 C1.54020078,5.8818926 1.68042835,5.18071712 1.68042835,5.18071712 C2.19686138,3.08678055 4.08935033,1.52754165 6.33943225,1.52754165 C8.98580286,1.52754165 11.1573269,3.67982918 11.1573269,6.32744017 L11.1573269,7.49182072 L4.12642315,7.49182072 C4.54162861,8.30366004 5.38137113,8.76031966 6.34967672,8.76031966 L12.6701111,8.76031966 L12.6787834,1.89423932 C12.6787834,0.870560677 11.8417287,0.0330469345 10.8185493,0.0330469345 L1.86031521,0.0330469345 C0.837135761,0.0330469345 -2.02860858e-05,0.845190698 -2.02860858e-05,1.86886934 L-2.02860858e-05,10.831474 C-2.02860858e-05,11.8551526 0.837135761,12.7180364 1.86031521,12.7180364 L10.8185493,12.7180364 C11.7367482,12.7180364 12.5027001,12.0584169 12.6506871,11.1958376 L6.34967672,11.1958376 Z" id="Fill-5" fill="#C8036F" mask="url(#mask-2)"/>\n        </g>\n        <path d="M6.33943732,10.6481099 C5.37483394,10.6481099 4.53595358,11.238926 4.11907451,12.0000254 L8.55990156,12.0000254 C8.1430225,11.238926 7.30419285,10.6481099 6.33943732,10.6481099" id="Fill-8" fill="#C8036F"/>\n        <path d="M10.396619,3.96072558 C10.396619,1.77327526 8.57959428,1.52219873e-05 6.33823537,1.52219873e-05 C4.134,1.52219873e-05 2.34126788,1.71527949 2.28238752,3.85259873 C2.28142393,3.86163044 2.28218466,3.87040846 2.28218466,3.87969387 L2.28218466,5.0699518 C2.28218466,5.21232812 2.39806892,5.35308076 2.54392588,5.35308076 L4.03703251,5.35308076 C4.18288947,5.35308076 4.31079324,5.21232812 4.31079324,5.0699518 L4.31079324,3.96072558 C4.31079324,2.86839577 5.22011704,1.97968541 6.33940182,1.97968541 C7.45868661,1.97968541 8.3680104,2.86839577 8.3680104,3.96072558 L8.3680104,5.0699518 C8.3680104,5.21232812 8.486329,5.35308076 8.63218596,5.35308076 L10.1253433,5.35308076 C10.2712003,5.35308076 10.396619,5.21232812 10.396619,5.0699518 L10.396619,3.96072558 Z" id="Fill-10" fill="#C8036F"/>\n        <path d="M20.7598572,20.7474063 C20.7598572,20.8523366 20.8407987,20.9002858 20.9277753,20.9002858 C21.0206856,20.9002858 21.1436192,20.8253429 21.1436192,20.687381 C21.1436192,20.5884888 21.0716036,20.5345015 20.9907129,20.5345015 C20.8827909,20.5345015 20.7598572,20.6034063 20.7598572,20.7474063 Z M20.0403098,20.7504 C20.0403098,20.8523366 20.1183098,20.9002858 20.2022434,20.9002858 C20.3071732,20.9002858 20.4211303,20.8253429 20.4211303,20.6843873 C20.4211303,20.5854444 20.3550991,20.5345015 20.2681732,20.5345015 C20.160302,20.5345015 20.0403098,20.6034063 20.0403098,20.7504 Z M21.3474437,21.133233 L21.1315997,22.3559645 C21.0236778,22.9739772 20.6189196,23.2570047 20.0702824,23.2570047 C19.6056296,23.2570047 19.2458559,22.9539856 19.3508364,22.3569793 L19.5666296,21.133233 L19.8994736,21.133233 L19.6835282,22.3559645 C19.6175984,22.7370723 19.7885087,22.9540364 20.1122746,22.9540364 C20.4450679,22.9540364 20.7298845,22.7559983 20.7988065,22.3569793 L21.0146505,21.133233 L21.3474437,21.133233 Z" id="Fill-12" fill="#71706F"/>\n        <path d="M21.9179189,22.5590867 C21.9059501,22.8050233 22.0647901,22.9639915 22.2956458,22.9639915 C22.5864468,22.9639915 22.8682205,22.7389598 22.8862244,22.3971247 C22.898244,22.1481438 22.736361,22.0011501 22.511439,22.0011501 C22.2236302,22.0011501 21.9358213,22.2321691 21.9179189,22.5590867 Z M22.1517667,21.1331924 L22.0018525,21.9781142 C22.1307199,21.8042283 22.388556,21.7122368 22.5684429,21.7122368 C22.9401854,21.7122368 23.1980216,21.9302156 23.1980216,22.3350698 C23.1980216,22.9079746 22.7992479,23.2524989 22.2896614,23.2524989 C22.0917706,23.2524989 21.9238525,23.178926 21.8219657,22.9930148 L21.7650125,23.2135307 L21.4741607,23.2135307 L21.8429111,21.1331924 L22.1517667,21.1331924 Z" id="Fill-14" fill="#71706F"/>\n        <path d="M24.7516112,22.3509666 C24.7755995,22.0972668 24.6256853,21.994011 24.3768257,21.994011 C24.1520559,21.994011 23.9451886,22.0972668 23.8551691,22.3509666 L24.7516112,22.3509666 Z M23.804251,22.6046664 C23.7922315,22.8076262 23.9511222,22.9733429 24.2209779,22.9733429 C24.3708921,22.9733429 24.5686814,22.9146875 24.6766034,22.812751 L24.8445215,23.006882 C24.6616931,23.1747298 24.3918375,23.2582985 24.1640247,23.2582985 C23.7383212,23.2582985 23.4894616,23.0032288 23.4894616,22.6132922 C23.4894616,22.0943746 23.8971612,21.7076854 24.4188179,21.7076854 C24.895541,21.7076854 25.1653459,21.9957869 25.0034629,22.6046664 L23.804251,22.6046664 Z" id="Fill-16" fill="#71706F"/>\n        <path d="M25.8283814,21.7420871 L25.8133697,21.9376896 C25.9573502,21.7485311 26.131202,21.7099687 26.290042,21.7099687 C26.4339718,21.7099687 26.5628391,21.7610638 26.6318118,21.8360068 L26.4459913,22.1059941 C26.3800108,22.0461717 26.314081,22.0161844 26.2001239,22.0161844 C25.9872215,22.0161844 25.7774633,22.1438968 25.729436,22.4168778 L25.5885999,23.2135459 L25.2797442,23.2135459 L25.5405726,21.7420871 L25.8283814,21.7420871 Z" id="Fill-18" fill="#71706F"/>\n        <polygon id="Fill-20" fill="#71706F" points="28.1192941 21.7420871 28.275142 22.9057573 28.8387909 21.7420871 29.1835529 21.7420871 28.4100952 23.2135459 28.0473293 23.2135459 27.900458 22.2428397 27.6635672 22.7250723 27.4057818 23.2135459 27.0460081 23.2135459 26.7851797 21.7420871 27.1329847 21.7420871 27.285891 22.9057573 27.8524307 21.7420871"/>\n        <path d="M30.5274503,22.3509666 C30.5513879,22.0972668 30.4015244,21.994011 30.1526649,21.994011 C29.9278951,21.994011 29.7210277,22.0972668 29.6310082,22.3509666 L30.5274503,22.3509666 Z M29.5800901,22.6046664 C29.5680706,22.8076262 29.7269614,22.9733429 29.996817,22.9733429 C30.1467312,22.9733429 30.3445205,22.9146875 30.4524425,22.812751 L30.6203606,23.006882 C30.4375322,23.1747298 30.1676766,23.2582985 29.9398638,23.2582985 C29.5141603,23.2582985 29.2653008,23.0032288 29.2653008,22.6132922 C29.2653008,22.0943746 29.6730004,21.7076854 30.1946571,21.7076854 C30.6713801,21.7076854 30.941185,21.9957869 30.7793021,22.6046664 L29.5800901,22.6046664 Z" id="Fill-22" fill="#71706F"/>\n        <path d="M31.3524449,21.3412364 C31.3524449,21.4461666 31.4304449,21.5003569 31.5144293,21.5003569 C31.63432,21.5003569 31.7452342,21.4222173 31.7452342,21.2753759 C31.7452342,21.1762808 31.6702264,21.119249 31.5892849,21.119249 C31.4783707,21.119249 31.3524449,21.1913505 31.3524449,21.3412364 Z M31.625242,21.742082 L31.3645151,23.2135408 L31.0556594,23.2135408 L31.3164878,21.742082 L31.625242,21.742082 Z" id="Fill-24" fill="#71706F"/>\n        <path d="M32.9955925,22.1060753 C32.8996393,21.9981006 32.7767563,21.9681133 32.629885,21.9681133 C32.4259085,21.9681133 32.2820801,22.0371704 32.2820801,22.1661006 C32.2820801,22.2740753 32.398928,22.3191831 32.5728811,22.3341006 C32.8426861,22.3580499 33.1874481,22.4481133 33.1154832,22.8290182 C33.0645651,23.1049421 32.7887251,23.266904 32.4049631,23.266904 C32.1651815,23.266904 31.9342752,23.2129167 31.7784273,22.9939738 L31.9792596,22.7750309 C32.0901737,22.9279104 32.2850723,22.9909801 32.4589241,22.9939738 C32.6057953,22.9939738 32.7797485,22.9399865 32.806729,22.8020245 C32.8337095,22.6700499 32.7167602,22.619107 32.5009163,22.5979992 C32.2490645,22.5739992 31.9733259,22.481145 31.9733259,22.202126 C31.9733259,21.833145 32.3719475,21.7042148 32.6718265,21.7042148 C32.8996393,21.7042148 33.0675573,21.7551577 33.2055027,21.9022021 L32.9955925,22.1060753 Z" id="Fill-26" fill="#71706F"/>\n        <path d="M33.9703034,21.7420871 L33.8294672,22.534493 C33.7844828,22.7865184 33.8984399,22.9606579 34.1562254,22.9606579 C34.3990498,22.9606579 34.6059172,22.7593725 34.6478079,22.5134359 L34.7827104,21.7420871 L35.0915153,21.7420871 L34.8307884,23.2135459 L34.5519562,23.2135459 L34.5729016,23.0003366 C34.3990498,23.1652922 34.2280888,23.2430765 34.0213229,23.2430765 C33.658557,23.2430765 33.442713,22.982882 33.5206116,22.5361167 L33.6615492,21.7420871 L33.9703034,21.7420871 Z" id="Fill-28" fill="#71706F"/>\n        <path d="M36.4472345,23.2135459 L36.588172,22.4259603 C36.633055,22.1709412 36.5462813,22.0020279 36.2644061,22.0020279 C36.0185895,22.0020279 35.8116207,22.199863 35.7697299,22.4428059 L35.6348274,23.2135459 L35.3260225,23.2135459 L35.5869016,21.7420871 L35.8686246,21.7420871 L35.8476792,21.957123 C36.0185895,21.7981548 36.1953827,21.7197615 36.3872384,21.7197615 C36.7470121,21.7197615 36.9809614,21.9701632 36.9000199,22.4231696 L36.7590823,23.2135459 L36.4472345,23.2135459 Z" id="Fill-30" fill="#71706F"/>\n        <g id="Group-34" transform="translate(37.174252, 21.709040)">\n          <mask id="mask-4" fill="white">\n            <polygon id="" points="0.0103575649 0.00128879493 1.81575683 0.00128879493 1.81575683 2.2832981 0.0103575649 2.2832981" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n          </mask>\n          <g id="Clip-33"/>\n          <path d="M0.406639662,0.85909852 C0.406639662,1.11092093 0.571514824,1.26400338 0.808507022,1.26400338 C1.44691014,1.26400338 1.61787113,0.2832 0.979214434,0.2832 C0.676444603,0.2832 0.406639662,0.508028753 0.406639662,0.85909852 Z M0.319663069,1.70747061 C0.298717685,1.91043044 0.45456554,1.9925277 0.715495319,1.9925277 C0.943358778,1.9925277 1.18922614,1.86522114 1.24617932,1.54134799 L1.291113,1.288663 C1.15621053,1.4776186 0.910343173,1.55220634 0.72756554,1.55220634 C0.349686476,1.55220634 0.085916645,1.32717463 0.085916645,0.91912389 C0.085916645,0.337339535 0.517553836,0.00128879493 1.00619493,0.00128879493 C1.21316372,0.00128879493 1.39903498,0.099572093 1.46501547,0.267572093 L1.51598427,0.0330520085 L1.8157619,0.0330520085 L1.55787503,1.54824863 C1.46202328,2.1092296 1.04524564,2.28331839 0.664526528,2.28331839 C0.208748895,2.28331839 -0.0429507152,2.06265032 0.0198854356,1.70747061 L0.319663069,1.70747061 Z" id="Fill-32" fill="#71706F" mask="url(#mask-4)"/>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>';
    },
    "./src/resources/fundingLogos/eps_white.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="52px" height="32px" viewBox="0 0 52 32" version="1.1" xmlns="http://www.w3.org/2000/svg">\n  <title>Page 1</title>\n  <desc>Created with Sketch.</desc>\n  <defs>\n    <polygon id="path-1" points="0 0.0413086681 15.9297534 0.0413086681 15.9297534 15.8975455 0 15.8975455"/>\n    <polygon id="path-3" points="0.0130133508 0.00161099366 2.2813355 0.00161099366 2.2813355 2.85412262 0.0130133508 2.85412262"/>\n  </defs>\n  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n    <g id="SPB_&amp;_AltPay_NewAssets" transform="matrix(1.067008, 0, 0, 1.067008, -252.880768, -656.209595)">\n      <g id="Group-Copy" transform="translate(101.000000, 606.000000)">\n        <g id="Page-1" transform="translate(136.000000, 9.000000)">\n          <path d="M38.4226268,15.000019 L34.5197035,15.000019 C34.0856489,15.000019 33.7324538,14.6557484 33.7324538,14.2247759 C33.7324538,13.7938034 34.0856489,13.4143953 34.5197035,13.4143953 L40.4616385,13.4143953 L40.4616385,10.4968478 L34.5197035,10.4968478 C32.4458375,10.4968478 30.7584915,12.1797653 30.7584915,14.2389197 C30.7584915,16.298074 32.4458375,17.9809915 34.5197035,17.9809915 L38.3696125,17.9809915 C38.8037308,17.9809915 39.1569259,18.3238668 39.1569259,18.7548393 C39.1569259,19.1858118 38.8037308,19.5031903 38.3696125,19.5031903 L30.1140364,19.5031903 C29.4131261,20.8351142 28.7315865,21.9767632 27.3480533,22.5475877 L38.4226268,22.5475877 C40.4616385,22.5183488 42.1295501,20.8007378 42.1295501,18.7597865 C42.1295501,16.7189619 40.4616385,15.0292579 38.4226268,15.000019" id="Fill-1" fill="#FFFFFF"/>\n          <path d="M23.4611809,19.5031903 L20.4538298,19.5031903 L20.4538298,16.4990042 C20.4538298,14.8202727 21.7965827,13.4544799 23.4611809,13.4544799 C25.1257791,13.4544799 26.4800014,14.8202727 26.4800014,16.4990042 C26.4800014,18.1777992 25.1257791,19.5031903 23.4611809,19.5031903 M23.4611809,10.4968478 C20.1532667,10.4968478 17.4590313,13.1946279 17.4590313,16.5095328 L17.4590313,16.6363827 L17.4590313,29.0169323 L20.4538298,29.0169323 L20.4538298,22.5475877 L23.4549364,22.5475877 C26.7629143,22.5475877 29.4476555,19.8139091 29.4476555,16.4990042 C29.4476555,13.1840994 26.7691588,10.4968478 23.4611809,10.4968478" id="Fill-3" fill="#FFFFFF"/>\n          <g id="Group-7" transform="translate(0.000000, 8.552791)">\n            <mask id="mask-2" fill="white">\n              <polygon id="" points="0 0.0413086681 15.9297534 0.0413086681 15.9297534 15.8975455 0 15.8975455" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n            </mask>\n            <g id="Clip-6"/>\n            <path d="M7.97779896,13.994797 C5.14612146,13.994797 2.76551157,11.9863192 2.12124759,9.36242918 C2.12124759,9.36242918 1.93512406,8.49490275 1.93512406,7.92363425 C1.93512406,7.35236575 2.11130741,6.47589641 2.11130741,6.47589641 C2.76015917,3.85847569 5.13790169,1.90942706 7.9649277,1.90942706 C11.2898549,1.90942706 14.01818,4.59978647 14.01818,7.90930021 L14.01818,9.3647759 L5.18448036,9.3647759 C5.70614876,10.3795751 6.76120988,10.9503996 7.97779896,10.9503996 L15.9188575,10.9503996 L15.9297534,2.36779915 C15.9297534,1.08820085 14.8780694,0.0413086681 13.5925363,0.0413086681 L2.33731912,0.0413086681 C1.05178596,0.0413086681 -2.54876463e-05,1.05648837 -2.54876463e-05,2.33608668 L-2.54876463e-05,13.5393425 C-2.54876463e-05,14.8189408 1.05178596,15.8975455 2.33731912,15.8975455 L13.5925363,15.8975455 C14.7461709,15.8975455 15.7085207,15.0730211 15.8944531,13.994797 L7.97779896,13.994797 Z" id="Fill-5" fill="#FFFFFF" mask="url(#mask-2)"/>\n          </g>\n          <path d="M7.96493407,13.3101374 C6.75299649,13.3101374 5.6990186,14.0486575 5.17524746,15.0000317 L10.7547481,15.0000317 C10.230977,14.0486575 9.17706281,13.3101374 7.96493407,13.3101374" id="Fill-8" fill="#FFFFFF"/>\n          <path d="M13.0624187,4.95090698 C13.0624187,2.21659408 10.7794902,1.90274841e-05 7.96342393,1.90274841e-05 C5.194,1.90274841e-05 2.94159298,2.14409937 2.86761508,4.81574841 C2.86640442,4.82703805 2.86736021,4.83801057 2.86736021,4.84961734 L2.86736021,6.33743975 C2.86736021,6.51541015 3.01295839,6.69135095 3.19621456,6.69135095 L5.07216905,6.69135095 C5.25542523,6.69135095 5.41612484,6.51541015 5.41612484,6.33743975 L5.41612484,4.95090698 C5.41612484,3.58549471 6.55860858,2.47460677 7.96488947,2.47460677 C9.37117035,2.47460677 10.5136541,3.58549471 10.5136541,4.95090698 L10.5136541,6.33743975 C10.5136541,6.51541015 10.6623108,6.69135095 10.845567,6.69135095 L12.7215852,6.69135095 C12.9048414,6.69135095 13.0624187,6.51541015 13.0624187,6.33743975 L13.0624187,4.95090698 Z" id="Fill-10" fill="#FFFFFF"/>\n          <path d="M26.0828975,25.9342579 C26.0828975,26.0654207 26.1845932,26.1253573 26.2938715,26.1253573 C26.4106049,26.1253573 26.5650601,26.0316786 26.5650601,25.8592262 C26.5650601,25.735611 26.4745789,25.6681268 26.3729469,25.6681268 C26.2373527,25.6681268 26.0828975,25.7542579 26.0828975,25.9342579 Z M25.1788507,25.938 C25.1788507,26.0654207 25.2768507,26.1253573 25.3823059,26.1253573 C25.5141407,26.1253573 25.6573176,26.0316786 25.6573176,25.8554841 C25.6573176,25.7318055 25.5743553,25.6681268 25.4651407,25.6681268 C25.3296101,25.6681268 25.1788507,25.7542579 25.1788507,25.938 Z M26.8211472,26.4165412 L26.5499586,27.9449556 C26.4143644,28.7174715 25.9058221,29.0712558 25.2165087,29.0712558 C24.6327142,29.0712558 24.1806908,28.692482 24.3125893,27.9462241 L24.5837142,26.4165412 L25.0019027,26.4165412 L24.7305867,27.9449556 C24.6477519,28.4213404 24.8624853,28.6925455 25.2692681,28.6925455 C25.687393,28.6925455 26.0452395,28.4449979 26.1318338,27.9462241 L26.4030224,26.4165412 L26.8211472,26.4165412 Z" id="Fill-12" fill="#FFFFFF"/>\n          <path d="M27.537898,28.1988584 C27.5228603,28.5062791 27.7224286,28.7049894 28.012478,28.7049894 C28.3778434,28.7049894 28.7318668,28.4236998 28.7544871,27.9964059 C28.7695886,27.6851797 28.5661971,27.5014376 28.2836029,27.5014376 C27.9219969,27.5014376 27.5603909,27.7902114 27.537898,28.1988584 Z M27.8317069,26.4164905 L27.6433532,27.4726427 C27.8052635,27.2552854 28.1292114,27.140296 28.3552231,27.140296 C28.8222843,27.140296 29.1462322,27.4127696 29.1462322,27.9188372 C29.1462322,28.6349683 28.6452088,29.0656237 28.0049592,29.0656237 C27.7563272,29.0656237 27.5453532,28.9736575 27.4173415,28.7412685 L27.3457849,29.0169133 L26.9803558,29.0169133 L27.4436575,26.4164905 L27.8317069,26.4164905 Z" id="Fill-14" fill="#FFFFFF"/>\n          <path d="M31.0981782,27.9387082 C31.1283173,27.6215835 30.9399636,27.4925137 30.6272939,27.4925137 C30.3448908,27.4925137 30.0849805,27.6215835 29.9718791,27.9387082 L31.0981782,27.9387082 Z M29.9079051,28.255833 C29.8928036,28.5095328 30.0924356,28.7166786 30.431485,28.7166786 C30.6198388,28.7166786 30.8683433,28.6433594 31.0039376,28.5159387 L31.2149116,28.7586025 C30.9852042,28.9684123 30.6461547,29.0728732 30.3599285,29.0728732 C29.8250702,29.0728732 29.5124005,28.7540359 29.5124005,28.2666152 C29.5124005,27.6179683 30.0246385,27.1346068 30.6800533,27.1346068 C31.279013,27.1346068 31.6179987,27.4947336 31.4146073,28.255833 L29.9079051,28.255833 Z" id="Fill-16" fill="#FFFFFF"/>\n          <path d="M32.4510433,27.1776089 L32.4321824,27.4221121 C32.613081,27.1856638 32.8315101,27.1374609 33.0310784,27.1374609 C33.2119133,27.1374609 33.3738235,27.2013298 33.4604815,27.2950085 L33.2270147,27.6324926 C33.1441161,27.5577146 33.0612813,27.5202304 32.9181044,27.5202304 C32.6506116,27.5202304 32.3870693,27.679871 32.3267273,28.0210973 L32.1497793,29.0169323 L31.7617299,29.0169323 L32.0894373,27.1776089 L32.4510433,27.1776089 Z" id="Fill-18" fill="#FFFFFF"/>\n          <polygon id="Fill-20" fill="#FFFFFF" points="35.3293696 27.1776089 35.5251784 28.6321966 36.2333527 27.1776089 36.6665152 27.1776089 35.694735 29.0169323 35.2389521 29.0169323 35.0544216 27.8035497 34.7567896 28.4063404 34.4329053 29.0169323 33.9808819 29.0169323 33.6531745 27.1776089 34.0901602 27.1776089 34.2822733 28.6321966 34.9940796 27.1776089"/>\n          <path d="M38.3550017,27.9387082 C38.3850771,27.6215835 38.1967871,27.4925137 37.8841174,27.4925137 C37.6017143,27.4925137 37.341804,27.6215835 37.2287026,27.9387082 L38.3550017,27.9387082 Z M37.1647286,28.255833 C37.1496272,28.5095328 37.3492592,28.7166786 37.6883086,28.7166786 C37.8766623,28.7166786 38.1251668,28.6433594 38.2607611,28.5159387 L38.4717351,28.7586025 C38.2420277,28.9684123 37.9029783,29.0728732 37.616752,29.0728732 C37.0818938,29.0728732 36.7692241,28.7540359 36.7692241,28.2666152 C36.7692241,27.6179683 37.281462,27.1346068 37.9368769,27.1346068 C38.5358365,27.1346068 38.8748222,27.4947336 38.6714308,28.255833 L37.1647286,28.255833 Z" id="Fill-22" fill="#FFFFFF"/>\n          <path d="M39.3915333,26.6765455 C39.3915333,26.8077082 39.4895333,26.8754461 39.5950521,26.8754461 C39.7456841,26.8754461 39.8850378,26.7777717 39.8850378,26.5942199 C39.8850378,26.470351 39.7907973,26.3990613 39.6891016,26.3990613 C39.5497479,26.3990613 39.3915333,26.4891882 39.3915333,26.6765455 Z M39.7342784,27.1776025 L39.4066984,29.016926 L39.018649,29.016926 L39.3463564,27.1776025 L39.7342784,27.1776025 Z" id="Fill-24" fill="#FFFFFF"/>\n          <path d="M41.4560008,27.6325941 C41.3354442,27.4976258 41.1810528,27.4601416 40.9965222,27.4601416 C40.740244,27.4601416 40.5595365,27.546463 40.5595365,27.7076258 C40.5595365,27.8425941 40.7063454,27.8989789 40.924902,27.9176258 C41.2638876,27.9475624 41.6970502,28.0601416 41.6066328,28.5362727 C41.5426588,28.8811776 41.1960905,29.08363 40.713928,29.08363 C40.412664,29.08363 40.1225508,29.0161459 39.926742,28.7424672 L40.1790697,28.4687886 C40.3184234,28.6598879 40.563296,28.7387252 40.7817251,28.7424672 C40.9662557,28.7424672 41.1848122,28.6749831 41.2187108,28.5025307 C41.2526094,28.3375624 41.1056731,28.2738837 40.8344845,28.2474989 C40.5180554,28.2174989 40.1716146,28.1014313 40.1716146,27.7526575 C40.1716146,27.2914313 40.6724468,27.1302685 41.0492179,27.1302685 C41.3354442,27.1302685 41.5464182,27.1939471 41.7197342,27.3777526 L41.4560008,27.6325941 Z" id="Fill-26" fill="#FFFFFF"/>\n          <path d="M42.6806376,27.1776089 L42.5036896,28.1681163 C42.4471707,28.483148 42.5903476,28.7008224 42.9142319,28.7008224 C43.219319,28.7008224 43.4792293,28.4492156 43.5318612,28.1417949 L43.7013541,27.1776089 L44.0893398,27.1776089 L43.7617598,29.0169323 L43.4114321,29.0169323 L43.4377481,28.7504207 C43.219319,28.9566152 43.0045218,29.0538457 42.744739,29.0538457 C42.2889562,29.0538457 42.0177676,28.7286025 42.1156402,28.1701459 L42.2927156,27.1776089 L42.6806376,27.1776089 Z" id="Fill-28" fill="#FFFFFF"/>\n          <path d="M45.7926792,29.0169323 L45.9697546,28.0324503 C46.026146,27.7136765 45.9171226,27.5025349 45.5629718,27.5025349 C45.2541252,27.5025349 44.9940875,27.7498288 44.9414555,28.0535074 L44.7719627,29.0169323 L44.383977,29.0169323 L44.7117481,27.1776089 L45.0657078,27.1776089 L45.0393918,27.4464038 C45.2541252,27.2476934 45.4762501,27.1497019 45.7172995,27.1497019 C46.1693229,27.1497019 46.4632592,27.462704 46.3615635,28.0289619 L46.184488,29.0169323 L45.7926792,29.0169323 Z" id="Fill-30" fill="#FFFFFF"/>\n          <g id="Group-34" transform="translate(46.706112, 27.136300)">\n            <mask id="mask-4" fill="white">\n              <polygon id="" points="0.0130133508 0.00161099366 2.2813355 0.00161099366 2.2813355 2.85412262 0.0130133508 2.85412262" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n            </mask>\n            <g id="Clip-33"/>\n            <path d="M0.510906242,1.07387315 C0.510906242,1.38865116 0.718057087,1.58000423 1.01581651,1.58000423 C1.81791274,1.58000423 2.03270988,0.354 1.23029506,0.354 C0.849891938,0.354 0.510906242,0.635035941 0.510906242,1.07387315 Z M0.401627958,2.13433827 C0.375311964,2.38803805 0.571120806,2.49065962 0.898955657,2.49065962 C1.18524564,2.49065962 1.49415592,2.33152643 1.56571248,1.92668499 L1.62216762,1.61082875 C1.45267477,1.84702326 1.1437645,1.94025793 0.914120806,1.94025793 C0.439349675,1.94025793 0.107946554,1.65896829 0.107946554,1.14890486 C0.107946554,0.421674419 0.650259948,0.00161099366 1.26419363,0.00161099366 C1.52423134,0.00161099366 1.7577619,0.124465116 1.84066047,0.334465116 L1.90469818,0.0413150106 L2.28134187,0.0413150106 L1.95733017,1.93531078 C1.83690104,2.636537 1.31325735,2.85414799 0.834917945,2.85414799 C0.262274252,2.85414799 -0.0539637191,2.5783129 0.0249842653,2.13433827 L0.401627958,2.13433827 Z" id="Fill-32" fill="#FFFFFF" mask="url(#mask-4)"/>\n          </g>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>';
    },
    "./src/resources/fundingLogos/giropay.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="75px" height="32px" viewBox="0 0 75 32" version="1.1" xmlns="http://www.w3.org/2000/svg">\n  <title>logo giropay</title>\n  <desc>Created with Sketch.</desc>\n  <defs>\n    <polygon id="path-1" points="0 0.017902439 46.0918699 0.017902439 46.0918699 19.8373984 0 19.8373984"/>\n    <polygon id="path-3" points="0 19.9821138 46.0918699 19.9821138 46.0918699 0.162601626 0 0.162601626"/>\n  </defs>\n  <g id="SPB_&amp;_AltPay_NewAssets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="matrix(1.614571, 0, 0, 1.614571, -161.457123, -256.816772)">\n    <g id="logo-giropay" transform="translate(100.000000, 159.000000)">\n      <g id="Group-3" transform="translate(0.000000, 0.144715)">\n        <mask id="mask-2" fill="white">\n          <polygon id="" points="0 0.017902439 46.0918699 0.017902439 46.0918699 19.8373984 0 19.8373984" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n        </mask>\n        <g id="Clip-2"/>\n        <path d="M0,3.5735122 C0,1.60977236 1.5998374,0.017902439 3.57349593,0.017902439 L42.5182114,0.017902439 C44.4918699,0.017902439 46.0918699,1.60977236 46.0918699,3.5735122 L46.0918699,16.2818049 C46.0918699,18.2455447 44.4918699,19.8374146 42.5182114,19.8374146 L3.57349593,19.8374146 C1.5998374,19.8374146 0,18.2455447 0,16.2818049 L0,3.5735122 Z" id="Fill-1" fill="#003A7D" mask="url(#mask-2)"/>\n      </g>\n      <path d="M1.46738211,3.84021138 L1.46738211,16.3065528 C1.46738211,17.5338699 2.46738211,18.5288293 3.70087805,18.5288293 L24.1036423,18.5288293 L24.1036423,1.61793496 L3.70087805,1.61793496 C2.46738211,1.61793496 1.46738211,2.61289431 1.46738211,3.84021138" id="Fill-4" fill="#FFFFFF"/>\n      <path d="M5.67102439,10.0205528 C5.67102439,9.34152846 6.00582114,8.77730081 6.64663415,8.77730081 C7.42126829,8.77730081 7.74630894,9.39892683 7.74630894,9.95356098 C7.74630894,10.7187642 7.25866667,11.235187 6.64663415,11.235187 C6.13004878,11.235187 5.67102439,10.795187 5.67102439,10.0205528 Z M9.41053659,7.57226016 L7.8515122,7.57226016 L7.8515122,8.47112195 L7.8324878,8.47112195 C7.46907317,7.85908943 6.87606504,7.45746341 6.13964228,7.45746341 C4.59021138,7.45746341 3.8921626,8.56689431 3.8921626,10.0491707 C3.8921626,11.5221789 4.74321951,12.5550244 6.11102439,12.5550244 C6.79964228,12.5550244 7.37346341,12.2872195 7.78468293,11.7038049 L7.80370732,11.7038049 L7.80370732,11.9716098 C7.80370732,12.9472195 7.26826016,13.4158374 6.27362602,13.4158374 C5.55622764,13.4158374 5.11622764,13.2628293 4.59021138,13.0046179 L4.50419512,14.3626667 C4.90582114,14.5060813 5.58500813,14.6782764 6.40744715,14.6782764 C8.41590244,14.6782764 9.41053659,14.0182764 9.41053659,11.9716098 L9.41053659,7.57226016 Z" id="Fill-6" fill="#ED1C24"/>\n      <mask id="mask-4" fill="white">\n        <polygon id="" points="0 19.9821138 46.0918699 19.9821138 46.0918699 0.162601626 0 0.162601626" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n      </mask>\n      <g id="Clip-9"/>\n      <path d="M10.5985366,6.75918699 L12.32,6.75918699 L12.32,5.49674797 L10.5985366,5.49674797 L10.5985366,6.75918699 Z M10.598374,12.5549593 L12.3198374,12.5549593 L12.3198374,7.57219512 L10.598374,7.57219512 L10.598374,12.5549593 Z" id="Fill-8" fill="#ED1C24" mask="url(#mask-4)"/>\n      <path d="M17.1133333,7.51479675 C16.9411382,7.48617886 16.7307317,7.45739837 16.5299187,7.45739837 C15.7839024,7.45739837 15.3534959,7.85918699 15.0570732,8.4904065 L15.0380488,8.4904065 L15.0380488,7.57219512 L13.4694309,7.57219512 L13.4694309,12.5549593 L15.1910569,12.5549593 L15.1910569,10.4508943 C15.1910569,9.47544715 15.6404878,8.89203252 16.4439024,8.89203252 C16.6447154,8.89203252 16.835935,8.89203252 17.0273171,8.94943089 L17.1133333,7.51479675 Z" id="Fill-10" fill="#ED1C24" mask="url(#mask-4)"/>\n      <path d="M20.0773496,11.4647154 C19.2835285,11.4647154 18.9583252,10.804878 18.9583252,10.0682927 C18.9583252,9.32243902 19.2835285,8.66243902 20.0773496,8.66243902 C20.8711707,8.66243902 21.196374,9.32243902 21.196374,10.0682927 C21.196374,10.804878 20.8711707,11.4647154 20.0773496,11.4647154 M20.0773496,12.6697561 C21.7223902,12.6697561 22.9752358,11.7133333 22.9752358,10.0682927 C22.9752358,8.41382114 21.7223902,7.45739837 20.0773496,7.45739837 C18.4323089,7.45739837 17.1794634,8.41382114 17.1794634,10.0682927 C17.1794634,11.7133333 18.4323089,12.6697561 20.0773496,12.6697561" id="Fill-11" fill="#ED1C24" mask="url(#mask-4)"/>\n      <path d="M29.3757073,10.0110244 C29.3757073,10.8048455 28.9836748,11.3500488 28.3332683,11.3500488 C27.7594472,11.3500488 27.2812358,10.8048455 27.2812358,10.0780163 C27.2812358,9.332 27.7020488,8.77720325 28.3332683,8.77720325 C29.0026992,8.77720325 29.3757073,9.35102439 29.3757073,10.0110244 Z M25.5597724,14.5633821 L27.2812358,14.5633821 L27.2812358,11.856878 L27.3002602,11.856878 C27.6254634,12.4498862 28.2758699,12.6697236 28.8783089,12.6697236 C30.360748,12.6697236 31.1545691,11.4456585 31.1545691,9.97265041 C31.1545691,8.76777236 30.399122,7.45736585 29.0218862,7.45736585 C28.2376585,7.45736585 27.5106667,7.77297561 27.166439,8.47118699 L27.147252,8.47118699 L27.147252,7.5721626 L25.5597724,7.5721626 L25.5597724,14.5633821 Z" id="Fill-12" fill="#FFFFFF" mask="url(#mask-4)"/>\n      <path d="M33.505252,10.9769919 C33.505252,10.4987805 33.9642764,10.3169919 34.5476911,10.3169919 C34.8059024,10.3169919 35.0546829,10.3361789 35.2745203,10.3457724 C35.2745203,10.929187 34.8633008,11.5221951 34.2128943,11.5221951 C33.8112683,11.5221951 33.505252,11.3212195 33.505252,10.9769919 Z M36.9769593,12.5550407 C36.900374,12.1628455 36.8813496,11.770813 36.8813496,11.3786179 L36.8813496,9.52317073 C36.8813496,8.00252033 35.7815122,7.45747967 34.5094797,7.45747967 C33.7730569,7.45747967 33.1322439,7.56268293 32.5202114,7.81130081 L32.5488293,8.97813008 C33.0270407,8.7103252 33.5816748,8.60512195 34.1364715,8.60512195 C34.7580976,8.60512195 35.2650894,8.78674797 35.2745203,9.46577236 C35.0546829,9.42756098 34.7485041,9.39894309 34.4711057,9.39894309 C33.5530569,9.39894309 31.8984228,9.58056911 31.8984228,11.1013821 C31.8984228,12.1820325 32.7784228,12.6698374 33.7634634,12.6698374 C34.4711057,12.6698374 34.9493171,12.392439 35.3415122,11.770813 L35.3606992,11.770813 C35.3606992,12.0290244 35.3893171,12.2872358 35.3989106,12.5550407 L36.9769593,12.5550407 Z" id="Fill-13" fill="#FFFFFF" mask="url(#mask-4)"/>\n      <path d="M37.750748,14.5634634 C38.1045691,14.6398862 38.4583902,14.6782602 38.8218049,14.6782602 C40.3998537,14.6782602 40.7728618,13.463626 41.2606667,12.2107805 L43.0873333,7.5722439 L41.3658699,7.5722439 L40.3426179,10.8239512 L40.3234309,10.8239512 L39.2522114,7.5722439 L37.3967642,7.5722439 L39.414813,12.6698049 C39.2904228,13.1098049 38.9653821,13.3584228 38.5445691,13.3584228 C38.3053821,13.3584228 38.0949756,13.3296423 37.8655447,13.2532195 L37.750748,14.5634634 Z" id="Fill-14" fill="#FFFFFF" mask="url(#mask-4)"/>\n    </g>\n  </g>\n</svg>';
    },
    "./src/resources/fundingLogos/giropay_white.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="75px" height="32px" viewBox="0 0 75 32" version="1.1" xmlns="http://www.w3.org/2000/svg">\n  <title>logo giropay copy</title>\n  <desc>Created with Sketch.</desc>\n  <defs>\n    <polygon id="path-1" points="0 0.0268536585 69.1378049 0.0268536585 69.1378049 29.7560976 0 29.7560976"/>\n    <polygon id="path-3" points="0 29.9731707 69.1378049 29.9731707 69.1378049 0.243902439 0 0.243902439"/>\n  </defs>\n  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="matrix(1.07638, 0, 0, 1.07638, 0, -0.018629)">\n    <g id="SPB_&amp;_AltPay_NewAssets" transform="translate(-226.000000, -633.000000)">\n      <g id="logo-giropay-copy" transform="translate(226.000000, 633.000000)">\n        <g id="Group-3" transform="translate(0.000000, 0.217073)">\n          <mask id="mask-2" fill="white">\n            <polygon id="" points="0 0.0268536585 69.1378049 0.0268536585 69.1378049 29.7560976 0 29.7560976" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n          </mask>\n          <g id="Clip-2"/>\n          <path d="M0,5.36026829 C0,2.41465854 2.3997561,0.0268536585 5.3602439,0.0268536585 L63.7773171,0.0268536585 C66.7378049,0.0268536585 69.1378049,2.41465854 69.1378049,5.36026829 L69.1378049,24.4227073 C69.1378049,27.3683171 66.7378049,29.756122 63.7773171,29.756122 L5.3602439,29.756122 C2.3997561,29.756122 0,27.3683171 0,24.4227073 L0,5.36026829 Z" id="Fill-1" fill="#FFFFFF" mask="url(#mask-2)"/>\n        </g>\n        <path d="M2.20107317,5.76031707 L2.20107317,24.4598293 C2.20107317,26.3008049 3.70107317,27.7932439 5.55131707,27.7932439 L36.1554634,27.7932439 L36.1554634,2.42690244 L5.55131707,2.42690244 C3.70107317,2.42690244 2.20107317,3.91934146 2.20107317,5.76031707" id="Fill-4" fill="#000000"/>\n        <path d="M8.50653659,15.0308293 C8.50653659,14.0122927 9.00873171,13.1659512 9.96995122,13.1659512 C11.1319024,13.1659512 11.6194634,14.0983902 11.6194634,14.9303415 C11.6194634,16.0781463 10.888,16.8527805 9.96995122,16.8527805 C9.19507317,16.8527805 8.50653659,16.1927805 8.50653659,15.0308293 Z M14.1158049,11.3583902 L11.7772683,11.3583902 L11.7772683,12.7066829 L11.7487317,12.7066829 C11.2036098,11.7886341 10.3140976,11.1861951 9.20946341,11.1861951 C6.88531707,11.1861951 5.8382439,12.8503415 5.8382439,15.0737561 C5.8382439,17.2832683 7.11482927,18.8325366 9.16653659,18.8325366 C10.1994634,18.8325366 11.0601951,18.4308293 11.6770244,17.5557073 L11.705561,17.5557073 L11.705561,17.9574146 C11.705561,19.4208293 10.9023902,20.1237561 9.41043902,20.1237561 C8.33434146,20.1237561 7.67434146,19.8942439 6.88531707,19.5069268 L6.75629268,21.544 C7.35873171,21.759122 8.3775122,22.0174146 9.61117073,22.0174146 C12.6238537,22.0174146 14.1158049,21.0274146 14.1158049,17.9574146 L14.1158049,11.3583902 Z" id="Fill-6" fill="#FFFFFF"/>\n        <mask id="mask-4" fill="white">\n          <polygon id="" points="0 29.9731707 69.1378049 29.9731707 69.1378049 0.243902439 0 0.243902439" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n        </mask>\n        <g id="Clip-9"/>\n        <path d="M15.8978049,10.1387805 L18.48,10.1387805 L18.48,8.24512195 L15.8978049,8.24512195 L15.8978049,10.1387805 Z M15.897561,18.832439 L18.4797561,18.832439 L18.4797561,11.3582927 L15.897561,11.3582927 L15.897561,18.832439 Z" id="Fill-8" fill="#FFFFFF" mask="url(#mask-4)"/>\n        <path d="M25.67,11.2721951 C25.4117073,11.2292683 25.0960976,11.1860976 24.794878,11.1860976 C23.6758537,11.1860976 23.0302439,11.7887805 22.5856098,12.7356098 L22.5570732,12.7356098 L22.5570732,11.3582927 L20.2041463,11.3582927 L20.2041463,18.832439 L22.7865854,18.832439 L22.7865854,15.6763415 C22.7865854,14.2131707 23.4607317,13.3380488 24.6658537,13.3380488 C24.9670732,13.3380488 25.2539024,13.3380488 25.5409756,13.4241463 L25.67,11.2721951 Z" id="Fill-10" fill="#FFFFFF" mask="url(#mask-4)"/>\n        <path d="M30.1160244,17.1970732 C28.9252927,17.1970732 28.4374878,16.2073171 28.4374878,15.102439 C28.4374878,13.9836585 28.9252927,12.9936585 30.1160244,12.9936585 C31.3067561,12.9936585 31.794561,13.9836585 31.794561,15.102439 C31.794561,16.2073171 31.3067561,17.1970732 30.1160244,17.1970732 M30.1160244,19.0046341 C32.5835854,19.0046341 34.4628537,17.57 34.4628537,15.102439 C34.4628537,12.6207317 32.5835854,11.1860976 30.1160244,11.1860976 C27.6484634,11.1860976 25.7691951,12.6207317 25.7691951,15.102439 C25.7691951,17.57 27.6484634,19.0046341 30.1160244,19.0046341" id="Fill-11" fill="#FFFFFF" mask="url(#mask-4)"/>\n        <path d="M44.063561,15.0165366 C44.063561,16.2072683 43.4755122,17.0250732 42.4999024,17.0250732 C41.6391707,17.0250732 40.9218537,16.2072683 40.9218537,15.1170244 C40.9218537,13.998 41.5530732,13.1658049 42.4999024,13.1658049 C43.5040488,13.1658049 44.063561,14.0265366 44.063561,15.0165366 Z M38.3396585,21.8450732 L40.9218537,21.8450732 L40.9218537,17.7853171 L40.9503902,17.7853171 C41.4381951,18.6748293 42.4138049,19.0045854 43.3174634,19.0045854 C45.541122,19.0045854 46.7318537,17.1684878 46.7318537,14.9589756 C46.7318537,13.1516585 45.5986829,11.1860488 43.5328293,11.1860488 C42.3564878,11.1860488 41.266,11.6594634 40.7496585,12.7067805 L40.720878,12.7067805 L40.720878,11.3582439 L38.3396585,11.3582439 L38.3396585,21.8450732 Z" id="Fill-12" fill="#000000" mask="url(#mask-4)"/>\n        <path d="M50.257878,16.4654878 C50.257878,15.7481707 50.9464146,15.4754878 51.8215366,15.4754878 C52.2088537,15.4754878 52.5820244,15.5042683 52.9117805,15.5186585 C52.9117805,16.3937805 52.2949512,17.2832927 51.3193415,17.2832927 C50.7169024,17.2832927 50.257878,16.9818293 50.257878,16.4654878 Z M55.465439,18.832561 C55.350561,18.2442683 55.3220244,17.6562195 55.3220244,17.0679268 L55.3220244,14.2847561 C55.3220244,12.0037805 53.6722683,11.1862195 51.7642195,11.1862195 C50.6595854,11.1862195 49.6983659,11.3440244 48.7803171,11.7169512 L48.8232439,13.4671951 C49.540561,13.0654878 50.3725122,12.9076829 51.2047073,12.9076829 C52.1371463,12.9076829 52.8976341,13.180122 52.9117805,14.1986585 C52.5820244,14.1413415 52.1227561,14.0984146 51.7066585,14.0984146 C50.3295854,14.0984146 47.8476341,14.3708537 47.8476341,16.6520732 C47.8476341,18.2730488 49.1676341,19.0047561 50.6451951,19.0047561 C51.7066585,19.0047561 52.4239756,18.5886585 53.0122683,17.6562195 L53.0410488,17.6562195 C53.0410488,18.0435366 53.0839756,18.4308537 53.0983659,18.832561 L55.465439,18.832561 Z" id="Fill-13" fill="#000000" mask="url(#mask-4)"/>\n        <path d="M56.626122,21.8451951 C57.1568537,21.9598293 57.6875854,22.0173902 58.2327073,22.0173902 C60.5997805,22.0173902 61.1592927,20.195439 61.891,18.3161707 L64.631,11.3583659 L62.0488049,11.3583659 L60.5139268,16.2359268 L60.4851463,16.2359268 L58.8783171,11.3583659 L56.0951463,11.3583659 L59.1222195,19.0047073 C58.9356341,19.6647073 58.4480732,20.0376341 57.8168537,20.0376341 C57.4580732,20.0376341 57.1424634,19.9944634 56.7983171,19.8798293 L56.626122,21.8451951 Z" id="Fill-14" fill="#000000" mask="url(#mask-4)"/>\n      </g>\n    </g>\n  </g>\n</svg>';
    },
    "./src/resources/fundingLogos/ideal.svg": function(module, exports) {
        module.exports = '<svg width="38" height="32" viewBox="0 0 38 32" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">\n  <polygon id="Fill-1" fill="#000000" points="4.47 27.632 10.452 27.632 10.452 17.982 4.47 17.982"/>\n  <g id="Group-9" transform="matrix(0.952642, 0, 0, 0.930979, 0.31993, 0.181113)">\n    <path d="M11.1102604,13.937999 C11.1102604,15.8893766 9.51859887,17.4723289 7.55546104,17.4723289 C5.59238806,17.4723289 4.00066169,15.8893766 4.00066169,13.937999 C4.00066169,11.9865569 5.59238806,10.4043136 7.55546104,10.4043136 C9.51859887,10.4043136 11.1102604,11.9865569 11.1102604,13.937999" id="Fill-2" fill="#000000"/>\n    <g id="Group-6">\n      <mask id="mask-2" fill="white">\n        <polygon id="" points="39.1898554 33.9678282 0 33.9678282 0 0.001572704 39.1898554 0.001572704" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n      </mask>\n      <g id="Clip-5"/>\n      <path d="M22.1049929,2.25750057 C26.4717361,2.25750057 30.1110886,3.433548 32.6296578,5.65853743 C35.476843,8.17370364 36.9204068,11.9843525 36.9204068,16.9847134 C36.9204068,26.8945533 32.0742264,31.7119261 22.1049929,31.7119261 L2.26942909,31.7119261 L2.26942909,2.25750057 L22.1049929,2.25750057 Z M22.531325,0.001572704 L-1.9452416e-05,0.001572704 L-1.9452416e-05,33.967854 L22.531325,33.967854 L22.531325,33.9614085 C27.4529808,33.8947619 31.3518934,32.6793969 34.1187402,30.3394196 C37.4837488,27.4935988 39.1898554,23.0003706 39.1898554,16.9847134 C39.1898554,14.1090499 38.7410881,11.5297509 37.8560681,9.31836144 C37.0093692,7.2028812 35.758125,5.40419768 34.13722,3.97219912 C31.2823834,1.45020067 27.2749912,0.0865245021 22.531325,0.00904949351 L22.531325,0.001572704 Z" id="Fill-4" fill="#000000" mask="url(#mask-2)"/>\n    </g>\n    <path d="M21.4851352,29.4975138 L13.5194356,29.4975138 L13.5194356,5.00387361 L21.4851352,5.00387361 L21.1636516,5.00387361 C27.8067813,5.00387361 34.8779291,7.60998594 34.8779291,17.282889 C34.8779291,27.5088167 27.8067813,29.4975138 21.1636516,29.4975138 L21.4851352,29.4975138 Z" id="Fill-7" fill="#CD0067"/>\n  </g>\n  <g id="Group-30" transform="matrix(0.952642, 0, 0, 0.930979, 11.685725, 10.562208)" fill="#FFFFFF">\n    <path d="M1.41115607,1.17495169 L1.41115607,5.07048794 L2.30681015,5.07048794 C2.64178075,5.07048794 2.88357428,5.05173151 3.03219074,5.0142831 C3.2267149,4.96613516 3.38810511,4.88459948 3.51649106,4.76961161 C3.64474732,4.65455929 3.749531,4.46538363 3.83058274,4.20189125 C3.91163447,3.93846333 3.95216034,3.57944852 3.95216034,3.12471792 C3.95216034,2.67005177 3.91163447,2.3210275 3.83058274,2.07764511 C3.749531,1.83426272 3.63605858,1.64437805 3.49016546,1.5079911 C3.34420749,1.37160414 3.15915018,1.27930447 2.93492866,1.23109207 C2.76737852,1.19370812 2.43915142,1.17495169 1.95018252,1.17495169 L1.41115607,1.17495169 Z M0.215675421,0.175897919 L2.40271056,0.175897919 C2.89589415,0.175897919 3.27190935,0.213410777 3.53069132,0.288436492 C3.878306,0.390275522 4.17612249,0.571265392 4.42407595,0.831212737 C4.67202941,1.09116008 4.86065301,1.40950373 4.99001157,1.78598587 C5.11937014,2.16253246 5.18408185,2.62686687 5.18408185,3.1789891 C5.18408185,3.66407805 5.12345515,4.08213371 5.00220176,4.433285 C4.85397434,4.86210466 4.6423969,5.20919527 4.36753426,5.47449239 C4.15997698,5.67552779 3.87966767,5.832347 3.52660632,5.94488558 C3.26244251,6.02796818 2.90938115,6.06954171 2.46742226,6.06954171 L0.215675421,6.06954171 L0.215675421,0.175897919 Z" id="Fill-10"/>\n    <path d="M2.40271056,0.337035624 C2.87825729,0.337035624 3.24247136,0.372743739 3.48523751,0.443128689 C3.80302515,0.536201827 4.07944398,0.704171771 4.30645367,0.942075479 C4.53702965,1.18384649 4.7154083,1.48530291 4.83666169,1.83813003 C4.95966581,2.19611355 5.02197838,2.64723467 5.02197838,3.1789891 C5.02197838,3.64390361 4.96375081,4.04829479 4.84885188,4.38094747 C4.70970226,4.78359837 4.50973142,5.11264156 4.25458057,5.35892443 C4.06589213,5.54165459 3.80438682,5.68712971 3.47713234,5.79148248 C3.23060538,5.86895749 2.89070683,5.908404 2.46742226,5.908404 L0.377778888,5.908404 L0.377778888,0.337035624 L2.40271056,0.337035624 Z M0.0535719538,0.0147602138 L0.0535719538,6.23067941 L2.46742226,6.23067941 C2.92390562,6.23067941 3.2967436,6.18614095 3.57549672,6.09848204 C3.95157676,5.97866004 4.25594223,5.80759625 4.48061764,5.58993144 C4.77246872,5.30819828 4.9996081,4.93661473 5.15548679,4.48562252 C5.28205718,4.11919538 5.34618531,3.67954727 5.34618531,3.1789891 C5.34618531,2.61178438 5.27797217,2.12559969 5.1434263,1.73390616 C5.00706486,1.33699177 4.80456521,0.995959927 4.54169823,0.720349996 C4.27494076,0.440679396 3.9502151,0.243317935 3.57646934,0.133873205 C3.29992083,0.0536910833 2.91612466,0.0147602138 2.40271056,0.0147602138 L0.0535719538,0.0147602138 Z" id="Fill-12"/>\n    <path d="M1.9501501,1.33608939 C2.54124418,1.33608939 2.79263424,1.36451409 2.899428,1.38836247 C3.09466542,1.43032272 3.25566658,1.50998921 3.37905974,1.6253638 C3.50439814,1.74254314 3.60457808,1.91180219 3.6766817,2.12824235 C3.75189771,2.35415741 3.79002445,2.68945275 3.79002445,3.12471792 C3.79002445,3.56127219 3.75150867,3.90784717 3.67551456,4.15477459 C3.60360546,4.38861762 3.51354078,4.55523401 3.40791416,4.64991853 C3.30014777,4.74647224 3.16054427,4.81647046 2.99299412,4.85797953 C2.85754047,4.89207627 2.62683481,4.90935023 2.30677773,4.90935023 L1.57329196,4.90935023 L1.57329196,1.33608939 L1.9501501,1.33608939 Z M1.24902018,1.01381398 L1.24902018,5.23162564 L2.30677773,5.23162564 C2.65860709,5.23162564 2.90889484,5.21158011 3.07203577,5.17052222 C3.29100514,5.1163155 3.47729444,5.02163098 3.62500312,4.88924025 C3.77699133,4.7529822 3.89493781,4.54356764 3.98558607,4.24900792 C4.07214932,3.96766148 4.11423138,3.59988078 4.11423138,3.12471792 C4.11423138,2.64833041 4.07176027,2.2893156 3.98441893,2.02698342 C3.89519718,1.75904364 3.76622766,1.54492386 3.60120633,1.39061839 C3.43423976,1.23450819 3.22162485,1.12789948 2.96919733,1.0736283 C2.78932733,1.03347278 2.45558871,1.01381398 1.9501501,1.01381398 L1.24902018,1.01381398 Z" id="Fill-14"/>\n    <polygon id="Fill-16" points="6.53678989 6.06950948 6.53678989 0.175865691 10.9257088 0.175865691 10.9257088 1.17491946 7.73227054 1.17491946 7.73227054 2.48013487 10.702849 2.48013487 10.702849 3.47918864 7.73227054 3.47918864 7.73227054 5.07045571 11.0391813 5.07045571 11.0391813 6.06950948"/>\n    <path d="M10.7636378,0.337035624 L10.7636378,1.01381398 L7.57019949,1.01381398 L7.57019949,2.64130481 L10.5407779,2.64130481 L10.5407779,3.31808317 L7.57019949,3.31808317 L7.57019949,5.23162564 L10.8771102,5.23162564 L10.8771102,5.908404 L6.69892578,5.908404 L6.69892578,0.337035624 L10.7636378,0.337035624 Z M6.37471884,0.0147602138 L6.37471884,6.23067941 L11.2013172,6.23067941 L11.2013172,4.90935023 L7.89440643,4.90935023 L7.89440643,3.64035858 L10.8649849,3.64035858 L10.8649849,2.3190294 L7.89440643,2.3190294 L7.89440643,1.33608939 L11.0878447,1.33608939 L11.0878447,0.0147602138 L6.37471884,0.0147602138 Z" id="Fill-18"/>\n    <path d="M15.5303032,3.73301276 L14.7130424,1.54959685 L13.9121864,3.73301276 L15.5303032,3.73301276 Z M17.7341971,6.06950948 L16.431793,6.06950948 L15.9144884,4.73206653 L13.5458326,4.73206653 L13.055113,6.06950948 L11.7849999,6.06950948 L14.0890089,0.175865691 L15.363207,0.175865691 L17.7341971,6.06950948 Z" id="Fill-20"/>\n    <path d="M15.2534629,0.337035624 C15.3291976,0.525244463 17.332991,5.50626875 17.4947703,5.908404 L16.5431581,5.908404 C16.4751395,5.73244163 16.0257887,4.57096105 16.0257887,4.57096105 L13.4323926,4.57096105 C13.4323926,4.57096105 13.0075518,5.72876769 12.9417378,5.908404 L12.0218979,5.908404 C12.1781008,5.50884695 14.1252876,0.527951577 14.1999201,0.337035624 L15.2534629,0.337035624 Z M13.9780328,0.0147602138 L11.5481019,6.23067941 L13.168553,6.23067941 C13.168553,6.23067941 13.5933289,5.07280832 13.6592077,4.89323646 L15.8031882,4.89323646 C15.871142,5.06913438 16.3204928,6.23067941 16.3204928,6.23067941 L17.9736239,6.23067941 L15.472951,0.0147602138 L13.9780328,0.0147602138 Z" id="Fill-22"/>\n    <path d="M14.7145337,2.01579402 C14.8921991,2.49044124 15.1926093,3.29290701 15.2970039,3.57186861 L14.1437998,3.57186861 C14.2457305,3.2940672 14.5401752,2.49134361 14.7145337,2.01579402 L14.7145337,2.01579402 Z M13.680573,3.89414402 L15.7636025,3.89414402 L14.7114862,1.0833868 L13.680573,3.89414402 Z" id="Fill-24"/>\n    <polygon id="Fill-26" points="18.7343171 6.06950948 18.7343171 0.224207003 19.9297978 0.224207003 19.9297978 5.07045571 22.9084814 5.07045571 22.9084814 6.06950948"/>\n    <path d="M19.7677267,0.385376935 L19.7677267,5.23162564 L22.7464104,5.23162564 L22.7464104,5.908404 L18.8963882,5.908404 L18.8963882,0.385376935 L19.7677267,0.385376935 Z M18.5722461,0.0631015253 L18.5722461,6.23067941 L23.0706173,6.23067941 L23.0706173,4.90935023 L20.0919337,4.90935023 L20.0919337,0.0631015253 L18.5722461,0.0631015253 Z" id="Fill-28"/>\n  </g>\n</svg>\n';
    },
    "./src/resources/fundingLogos/mybank.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="58px" height="32px" viewBox="0 0 58 32" version="1.1" xmlns="http://www.w3.org/2000/svg">\n  <title>MyBank</title>\n  <desc>Created with Sketch.</desc>\n  <defs>\n    <polygon id="path-1" points="3.086436e-05 0.00960615385 42.6159033 0.00960615385 42.6159033 24 3.086436e-05 24"/>\n  </defs>\n  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="matrix(1.333867, 0, 0, 1.333867, -0.00001, -0.00321)">\n    <g id="SPB_&amp;_AltPay_NewAssets" transform="translate(-100.000000, -159.000000)">\n      <g id="MyBank" transform="translate(100.000000, 159.000000)">\n        <path d="M29.010016,14.6206556 C29.010016,14.6206556 27.947442,14.8389924 27.9585564,14.0777038 C27.9698571,13.3164773 29.8942008,13.3619719 30.0914038,13.4236258 C30.0914038,13.4236258 30.1519432,14.2874637 29.010016,14.6206556 M29.3297879,9.81836571 C27.677716,9.80301439 26.9053582,10.753926 26.9053582,10.753926 C26.4037199,11.2864986 26.7253546,12.0076376 27.2173686,12.0597202 C27.924406,12.1345501 27.9170171,11.5413802 29.0022546,11.2784811 C29.9542434,11.0477763 29.9954723,11.9305703 29.9954723,11.9305703 C25.9352386,11.8295126 26.1290887,15.239929 27.5113104,15.9642377 C28.8367183,16.658714 30.0756326,15.7825701 30.0756326,15.7825701 C30.0756326,15.7825701 30.1222013,16.2545455 30.777951,16.2545455 C31.5283904,16.2545455 31.5272727,15.5049412 31.5272727,15.5049412 L31.5242302,12.1853897 C31.4748674,9.75671183 29.3297879,9.81836571 29.3297879,9.81836571" id="Fill-1" fill="#1A4B67"/>\n        <path d="M42.4169651,14.9132636 L40.766254,12.4266353 L41.9794586,11.2784792 C41.9794586,11.2784792 42.5394372,10.7597112 42.0797024,10.2455911 C41.5701862,9.67606803 40.9629029,10.2382165 40.9629029,10.2382165 L39.4383789,11.6556411 L39.4383789,8.81056644 C39.4383789,8.40291433 39.1083605,8.07272727 38.7011934,8.07272727 C38.2936547,8.07272727 37.9636364,8.40291433 37.9636364,8.81056644 L37.9636364,15.5050966 C37.9636364,15.9126248 38.2936547,16.2429358 38.7011934,16.2429358 C39.1083605,16.2429358 39.4383789,15.9126248 39.4383789,15.5050966 L39.4383789,13.7227806 L39.7172538,13.4440304 L41.2106953,15.7865117 C41.2106953,15.7865117 41.697426,16.5998328 42.4143027,16.0821803 C42.9532914,15.6931198 42.4169651,14.9132636 42.4169651,14.9132636" id="Fill-3" fill="#1A4B67"/>\n        <path d="M37.0887651,12.0920353 C37.0887651,9.6760941 35.0962232,9.33568291 33.7411943,10.1020724 C33.7401529,10.1029393 33.7389278,10.1056016 33.7382539,10.1063446 C33.6363205,9.81249385 33.362313,9.6 33.0365425,9.6 C32.6248269,9.6 32.2909091,9.93768691 32.2909091,10.3541303 L32.2909091,15.3913243 C32.2909091,15.8078915 32.6248269,16.1454545 33.0365425,16.1454545 C33.4485644,16.1454545 33.7826048,15.8078915 33.7826048,15.3913243 L33.7723134,11.9929705 C33.7723134,11.9929705 33.9532086,11.7752139 34.2436332,11.5669922 C34.9412403,11.0671487 35.6063806,11.2374162 35.6063806,12.0917257 L35.6234716,15.4035835 C35.6234716,15.8135877 35.9518762,16.1454545 36.3573435,16.1454545 C36.7625045,16.1454545 37.0909091,15.8135877 37.0909091,15.4035835 L37.0887651,12.0920353 Z" id="Fill-5" fill="#1A4B67"/>\n        <path d="M15.5613016,16.2862697 C15.7330634,15.9971851 15.762994,15.7935853 15.762994,15.7935853 L14.0695172,11.3349218 C14.0695172,11.3349218 13.7622674,10.4721348 14.4393994,10.2166114 C15.1567468,9.94557914 15.4157136,10.6357839 15.4696009,10.7805123 C15.5234881,10.9252407 16.5395249,13.6504516 16.5395249,13.6504516 L17.5177483,10.7867779 C17.5177483,10.7867779 17.7979621,9.89638514 18.5815138,10.2138818 C19.2290232,10.4764773 18.8964002,11.3498103 18.8964002,11.3498103 C18.8964002,11.3498103 17.8952671,14.3335844 17.0561037,16.4983684 C16.5548597,17.7916804 16.1267792,17.9191009 15.6376676,18.0403799 C14.9830758,18.2027884 13.7454545,18.1223286 13.7454545,17.30247 C13.7454545,16.655814 14.4027561,16.615491 14.6992284,16.6251065 C14.7151175,16.6254167 15.3279543,16.6788911 15.5613016,16.2862697" id="Fill-7" fill="#00C0EE"/>\n        <path d="M11.5669215,8.85710249 L10.0137262,13.1590392 L8.3203761,8.88327934 C8.3203761,8.88327934 8.06948196,8.07272727 7.36345596,8.07272727 C6.54545455,8.07272727 6.57202708,8.72317872 6.55361169,8.88327934 C6.53525811,9.04350403 6.55361169,15.569481 6.55361169,15.569481 C6.55361169,15.569481 6.54545455,16.2545455 7.29591229,16.2545455 C8.06280792,16.2545455 8.02603896,15.56334 8.03209502,15.56334 C8.03821288,15.56334 8.03209502,12.1182301 8.03209502,12.1182301 L9.27754342,15.56334 C9.27754342,15.56334 9.46151186,16.2407127 10.0381976,16.2283686 C10.6148833,16.2161486 10.7804982,15.56334 10.7804982,15.56334 L11.823501,12.1244331 L11.823501,15.56334 C11.823501,15.56334 11.823501,16.2545455 12.5780991,16.2545455 C13.3081022,16.2545455 13.3081022,15.56334 13.3081022,15.56334 L13.3090909,8.88948239 C13.3090909,8.88948239 13.3090909,8.07272727 12.5166733,8.07663519 C11.8595284,8.07973672 11.609932,8.71207526 11.5669215,8.85710249 C11.5619778,8.8740368 11.5596913,8.88327934 11.5596913,8.88327934" id="Fill-9" fill="#00C0EE"/>\n        <g id="Group-13">\n          <mask id="mask-2" fill="white">\n            <polygon id="" points="3.086436e-05 0.00960615385 42.6159033 0.00960615385 42.6159033 24 3.086436e-05 24" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n          </mask>\n          <g id="Clip-12"/>\n          <path d="M42.6159341,18.6971754 L29.5208652,18.6971754 L19.9057529,18.6956369 L19.9124196,18.7062215 C18.0119775,20.9263446 15.1892466,22.3382831 12.0318843,22.3382831 C6.30740974,22.3382831 1.66682976,17.7116369 1.66682976,12.0048677 C1.66682976,6.29803692 6.30740974,1.67182154 12.0318843,1.67182154 C15.2027652,1.67182154 18.0390147,3.09182154 19.9398272,5.32819077 L22.0210727,5.32819077 C19.8613082,2.12277538 16.1963507,0.00960615385 12.0318843,0.00960615385 C5.38703452,0.00960615385 3.086436e-05,5.38012923 3.086436e-05,12.0048677 C3.086436e-05,18.6296062 5.38703452,24.0000062 12.0318843,24.0000062 C15.5178286,24.0000062 18.6504994,22.5164985 20.846622,20.1542215 L41.6296327,20.1336062 L42.6159341,18.6971754 Z" id="Fill-11" fill="#00C0EE" mask="url(#mask-2)"/>\n        </g>\n        <path d="M23.5642714,14.6942333 L21.476941,14.6942333 L21.476941,12.703212 L23.5642714,12.703212 C24.0691167,12.729228 24.5593003,12.986305 24.5593003,13.698846 C24.5593003,14.4306215 24.1135333,14.6942333 23.5642714,14.6942333 Z M21.476941,9.5856756 L23.4225205,9.5856756 C23.8122278,9.59572442 24.2213404,9.80372869 24.2213404,10.3852036 C24.2213404,10.9910915 23.8636056,11.1846082 23.4225205,11.1846082 L21.476941,11.1846082 L21.476941,9.5856756 Z M25.2086687,11.7878453 C25.2484033,11.7332241 25.7477042,11.3284357 25.7082776,10.252103 C25.6287468,8.0729285 23.7375637,8.09777311 23.3189641,8.08507338 C22.644646,8.06479081 22.2387368,8.0729285 21.0010496,8.08507338 C19.9559983,8.09543044 19.9636372,9.0459372 19.9636372,9.0459372 L19.9636364,16.1454545 L23.4862807,16.1454545 C25.3714882,16.1454545 26.0727273,15.1069128 26.0727273,13.6549518 C26.0727273,12.1940516 25.2086687,11.7878453 25.2086687,11.7878453 Z" id="Fill-14" fill="#1A4B67"/>\n      </g>\n    </g>\n  </g>\n</svg>';
    },
    "./src/resources/fundingLogos/mybank_white.svg": function(module, exports) {
        module.exports = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="58px" height="32px" viewBox="0 0 58 32" version="1.1" xmlns="http://www.w3.org/2000/svg">\n  <title>MyBank</title>\n  <desc>Created with Sketch.</desc>\n  <defs>\n    <polygon id="path-1" points="3.76266281e-05 0.0116074359 51.9528915 0.0116074359 51.9528915 29 3.76266281e-05 29"/>\n  </defs>\n  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="matrix(1.10389, 0, 0, 1.10389, -0.000003, -0.001206)">\n    <g id="SPB_&amp;_AltPay_NewAssets" transform="translate(-234.000000, -615.000000)">\n      <g id="Group-4-Copy" transform="translate(100.000000, 606.000000)">\n        <g id="MyBank" transform="translate(134.000000, 9.000000)">\n          <path d="M35.3660042,17.6666255 C35.3660042,17.6666255 34.0706241,17.9304491 34.0841736,17.0105587 C34.0979502,16.0907434 36.4439106,16.145716 36.6843201,16.2202145 C36.6843201,16.2202145 36.7581234,17.2640186 35.3660042,17.6666255 M35.7558369,11.8638586 C33.7418021,11.8453091 32.8002236,12.9943272 32.8002236,12.9943272 C32.1886782,13.6378525 32.5807818,14.5092288 33.1805943,14.5721619 C34.042541,14.6625814 34.0335332,13.9458344 35.3565422,13.6281647 C36.5171083,13.3493964 36.5673703,14.4161058 36.5673703,14.4161058 C31.6175543,14.2939944 31.8538762,18.4149142 33.5389377,19.2901206 C35.1547376,20.1292794 36.6650934,19.0706056 36.6650934,19.0706056 C36.6650934,19.0706056 36.7218651,19.6409091 37.5212872,19.6409091 C38.4361451,19.6409091 38.4347826,18.7351373 38.4347826,18.7351373 L38.4310735,14.7240126 C38.3708955,11.7893601 35.7558369,11.8638586 35.7558369,11.8638586" id="Fill-1" fill="#FFFFFF"/>\n          <path d="M51.7103667,18.0201935 L49.6979908,15.0155176 L51.1770041,13.6281624 C51.1770041,13.6281624 51.859672,13.0013177 51.299211,12.3800893 C50.6780617,11.6919155 49.9377247,12.3711782 49.9377247,12.3711782 L48.0791832,14.0838996 L48.0791832,10.6461011 C48.0791832,10.1535215 47.676859,9.75454545 47.180483,9.75454545 C46.6836541,9.75454545 46.2813299,10.1535215 46.2813299,10.6461011 L46.2813299,18.7353251 C46.2813299,19.227755 46.6836541,19.6268808 47.180483,19.6268808 C47.676859,19.6268808 48.0791832,19.227755 48.0791832,18.7353251 L48.0791832,16.5816932 L48.4191585,16.24487 L50.2398076,19.0753683 C50.2398076,19.0753683 50.8331792,20.0581313 51.7071209,19.4326346 C52.3642001,18.9625198 51.7103667,18.0201935 51.7103667,18.0201935" id="Fill-3" fill="#FFFFFF"/>\n          <path d="M45.2147775,14.6112093 C45.2147775,11.691947 42.7856771,11.2806168 41.1337663,12.2066709 C41.1324968,12.2077183 41.1310032,12.2109353 41.1301817,12.2118331 C41.005915,11.8567634 40.6718735,11.6 40.2747279,11.6 C39.7728069,11.6 39.3657289,12.0080383 39.3657289,12.5112408 L39.3657289,18.5978502 C39.3657289,19.1012022 39.7728069,19.5090909 40.2747279,19.5090909 C40.7770223,19.5090909 41.1842497,19.1012022 41.1842497,18.5978502 L41.1717035,14.4915061 C41.1717035,14.4915061 41.3922321,14.2283834 41.7462877,13.9767822 C42.5967379,13.3728047 43.407608,13.5785446 43.407608,14.6108352 L43.4284436,18.6126634 C43.4284436,19.1080851 43.8288005,19.5090909 44.3231042,19.5090909 C44.8170344,19.5090909 45.2173913,19.1080851 45.2173913,18.6126634 L45.2147775,14.6112093 Z" id="Fill-5" fill="#FFFFFF"/>\n          <path d="M18.9707258,19.6792425 C19.18012,19.329932 19.2166082,19.0839155 19.2166082,19.0839155 L17.1520968,13.6963639 C17.1520968,13.6963639 16.7775297,12.6538296 17.6030189,12.3450721 C18.4775344,12.0175748 18.7932399,12.8515723 18.8589337,13.0264524 C18.9246275,13.2013325 20.1632742,16.4942957 20.1632742,16.4942957 L21.3558227,13.0340233 C21.3558227,13.0340233 21.6974303,11.958132 22.6526554,12.3417739 C23.4420317,12.6590767 23.0365322,13.7143541 23.0365322,13.7143541 C23.0365322,13.7143541 21.8160545,17.3197478 20.7930335,19.9355284 C20.1819688,21.4982805 19.6600975,21.6522469 19.0638232,21.7987924 C18.2658128,21.9950359 16.7570332,21.8978137 16.7570332,20.9071512 C16.7570332,20.1257752 17.5583471,20.0770516 17.9197755,20.0886703 C17.9391458,20.0890451 18.6862529,20.1536601 18.9707258,19.6792425" id="Fill-7" fill="#FFFFFF"/>\n          <path d="M14.1011917,10.7023322 L12.2076968,15.9005057 L10.14334,10.7339625 C10.14334,10.7339625 9.83747587,9.75454545 8.97676216,9.75454545 C7.97953964,9.75454545 8.01193412,10.5405076 7.98948399,10.7339625 C7.9671092,10.9275674 7.98948399,18.8131229 7.98948399,18.8131229 C7.98948399,18.8131229 7.97953964,19.6409091 8.89441993,19.6409091 C9.82933958,19.6409091 9.78451467,18.8057025 9.7918976,18.8057025 C9.79935586,18.8057025 9.7918976,14.6428613 9.7918976,14.6428613 L11.3102192,18.8057025 C11.3102192,18.8057025 11.5344944,19.6241945 12.2375299,19.6092787 C12.9405654,19.5945129 13.1424658,18.8057025 13.1424658,18.8057025 L14.4139867,14.6503567 L14.4139867,18.8057025 C14.4139867,18.8057025 14.4139867,19.6409091 15.3339145,19.6409091 C16.2238586,19.6409091 16.2238586,18.8057025 16.2238586,18.8057025 L16.2250639,10.7414579 C16.2250639,10.7414579 16.2250639,9.75454545 15.2590305,9.75926752 C14.4579076,9.7630152 14.1536255,10.5270909 14.1011917,10.7023322 C14.0951648,10.7227945 14.0923773,10.7339625 14.0923773,10.7339625" id="Fill-9" fill="#FFFFFF"/>\n          <g id="Group-13">\n            <mask id="mask-2" fill="white">\n              <polygon id="" points="3.76266281e-05 0.0116074359 51.9528915 0.0116074359 51.9528915 29 3.76266281e-05 29" transform="matrix(1, 0, 0, 1, 0, 0)"/>\n            </mask>\n            <g id="Clip-12"/>\n            <path d="M51.9529291,22.5924203 L35.9887786,22.5924203 L24.2670304,22.5905613 L24.2751577,22.603351 C21.9583357,25.2859997 18.5171548,26.9920921 14.668026,26.9920921 C7.68934009,26.9920921 2.03202605,21.4015613 2.03202605,14.5058818 C2.03202605,7.61012795 7.68934009,2.02011769 14.668026,2.02011769 C18.5336353,2.02011769 21.9912967,3.73595103 24.3085702,6.43823051 L26.845809,6.43823051 C24.212848,2.56502026 19.7449117,0.0116074359 14.668026,0.0116074359 C6.56731404,0.0116074359 3.76266281e-05,6.50098949 3.76266281e-05,14.5058818 C3.76266281e-05,22.5107741 6.56731404,29.0000074 14.668026,29.0000074 C18.9177279,29.0000074 22.7367554,27.2074356 25.4140405,24.3530177 L50.7505326,24.3281074 L51.9529291,22.5924203 Z" id="Fill-11" fill="#FFFFFF" mask="url(#mask-2)"/>\n          </g>\n          <path d="M28.7271169,17.7555319 L26.18246,17.7555319 L26.18246,15.3497145 L28.7271169,15.3497145 C29.342572,15.3811504 29.9401529,15.6917852 29.9401529,16.5527722 C29.9401529,17.437001 29.39672,17.7555319 28.7271169,17.7555319 Z M26.18246,11.5826914 L28.5543089,11.5826914 C29.0293996,11.5948337 29.5281473,11.8461722 29.5281473,12.5487876 C29.5281473,13.2809023 29.0920341,13.514735 28.5543089,13.514735 L26.18246,13.514735 L26.18246,11.5826914 Z M30.7317956,14.2436464 C30.7802359,14.1776458 31.3889318,13.6885265 31.340867,12.3879578 C31.2439113,9.7547886 28.9383768,9.78480918 28.4280636,9.76946367 C27.6060049,9.74495556 27.1111625,9.7547886 25.6023026,9.76946367 C24.3282843,9.78197845 24.3375969,10.9305075 24.3375969,10.9305075 L24.3375959,19.5090909 L28.6320387,19.5090909 C30.9302883,19.5090909 31.7851662,18.2541863 31.7851662,16.4997334 C31.7851662,14.734479 30.7317956,14.2436464 30.7317956,14.2436464 Z" id="Fill-14" fill="#FFFFFF"/>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>';
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
    }
}));
//# sourceMappingURL=checkout.button.render.js.map