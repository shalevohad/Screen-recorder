function ym(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ch = { exports: {} }, Mt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Io = Symbol.for("react.element"), vm = Symbol.for("react.portal"), Nm = Symbol.for("react.fragment"), km = Symbol.for("react.strict_mode"), wm = Symbol.for("react.profiler"), Em = Symbol.for("react.provider"), jm = Symbol.for("react.context"), Cm = Symbol.for("react.forward_ref"), Sm = Symbol.for("react.suspense"), Mm = Symbol.for("react.memo"), bm = Symbol.for("react.lazy"), td = Symbol.iterator;
function Im(e) {
  return e === null || typeof e != "object" ? null : (e = td && e[td] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Sh = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Mh = Object.assign, bh = {};
function Rl(e, t, n) {
  this.props = e, this.context = t, this.refs = bh, this.updater = n || Sh;
}
Rl.prototype.isReactComponent = {};
Rl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Rl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ih() {
}
Ih.prototype = Rl.prototype;
function Zc(e, t, n) {
  this.props = e, this.context = t, this.refs = bh, this.updater = n || Sh;
}
var qc = Zc.prototype = new Ih();
qc.constructor = Zc;
Mh(qc, Rl.prototype);
qc.isPureReactComponent = !0;
var nd = Array.isArray, Th = Object.prototype.hasOwnProperty, eu = { current: null }, Ah = { key: !0, ref: !0, __self: !0, __source: !0 };
function $h(e, t, n) {
  var r, l = {}, o = null, a = null;
  if (t != null) for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) Th.call(t, r) && !Ah.hasOwnProperty(r) && (l[r] = t[r]);
  var i = arguments.length - 2;
  if (i === 1) l.children = n;
  else if (1 < i) {
    for (var c = Array(i), d = 0; d < i; d++) c[d] = arguments[d + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) l[r] === void 0 && (l[r] = i[r]);
  return { $$typeof: Io, type: e, key: o, ref: a, props: l, _owner: eu.current };
}
function Tm(e, t) {
  return { $$typeof: Io, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function tu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Io;
}
function Am(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var sd = /\/+/g;
function yi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Am("" + e.key) : t.toString(36);
}
function la(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else switch (o) {
    case "string":
    case "number":
      a = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Io:
        case vm:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + yi(a, 0) : r, nd(l) ? (n = "", e != null && (n = e.replace(sd, "$&/") + "/"), la(l, t, n, "", function(d) {
    return d;
  })) : l != null && (tu(l) && (l = Tm(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace(sd, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", nd(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var c = r + yi(o, i);
    a += la(o, t, n, c, l);
  }
  else if (c = Im(e), typeof c == "function") for (e = c.call(e), i = 0; !(o = e.next()).done; ) o = o.value, c = r + yi(o, i++), a += la(o, t, n, c, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function _o(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return la(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function $m(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Dn = { current: null }, oa = { transition: null }, Rm = { ReactCurrentDispatcher: Dn, ReactCurrentBatchConfig: oa, ReactCurrentOwner: eu };
function Rh() {
  throw Error("act(...) is not supported in production builds of React.");
}
Mt.Children = { map: _o, forEach: function(e, t, n) {
  _o(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return _o(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return _o(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!tu(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
Mt.Component = Rl;
Mt.Fragment = Nm;
Mt.Profiler = wm;
Mt.PureComponent = Zc;
Mt.StrictMode = km;
Mt.Suspense = Sm;
Mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Rm;
Mt.act = Rh;
Mt.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Mh({}, e.props), l = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = eu.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (c in t) Th.call(t, c) && !Ah.hasOwnProperty(c) && (r[c] = t[c] === void 0 && i !== void 0 ? i[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    i = Array(c);
    for (var d = 0; d < c; d++) i[d] = arguments[d + 2];
    r.children = i;
  }
  return { $$typeof: Io, type: e.type, key: l, ref: o, props: r, _owner: a };
};
Mt.createContext = function(e) {
  return e = { $$typeof: jm, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Em, _context: e }, e.Consumer = e;
};
Mt.createElement = $h;
Mt.createFactory = function(e) {
  var t = $h.bind(null, e);
  return t.type = e, t;
};
Mt.createRef = function() {
  return { current: null };
};
Mt.forwardRef = function(e) {
  return { $$typeof: Cm, render: e };
};
Mt.isValidElement = tu;
Mt.lazy = function(e) {
  return { $$typeof: bm, _payload: { _status: -1, _result: e }, _init: $m };
};
Mt.memo = function(e, t) {
  return { $$typeof: Mm, type: e, compare: t === void 0 ? null : t };
};
Mt.startTransition = function(e) {
  var t = oa.transition;
  oa.transition = {};
  try {
    e();
  } finally {
    oa.transition = t;
  }
};
Mt.unstable_act = Rh;
Mt.useCallback = function(e, t) {
  return Dn.current.useCallback(e, t);
};
Mt.useContext = function(e) {
  return Dn.current.useContext(e);
};
Mt.useDebugValue = function() {
};
Mt.useDeferredValue = function(e) {
  return Dn.current.useDeferredValue(e);
};
Mt.useEffect = function(e, t) {
  return Dn.current.useEffect(e, t);
};
Mt.useId = function() {
  return Dn.current.useId();
};
Mt.useImperativeHandle = function(e, t, n) {
  return Dn.current.useImperativeHandle(e, t, n);
};
Mt.useInsertionEffect = function(e, t) {
  return Dn.current.useInsertionEffect(e, t);
};
Mt.useLayoutEffect = function(e, t) {
  return Dn.current.useLayoutEffect(e, t);
};
Mt.useMemo = function(e, t) {
  return Dn.current.useMemo(e, t);
};
Mt.useReducer = function(e, t, n) {
  return Dn.current.useReducer(e, t, n);
};
Mt.useRef = function(e) {
  return Dn.current.useRef(e);
};
Mt.useState = function(e) {
  return Dn.current.useState(e);
};
Mt.useSyncExternalStore = function(e, t, n) {
  return Dn.current.useSyncExternalStore(e, t, n);
};
Mt.useTransition = function() {
  return Dn.current.useTransition();
};
Mt.version = "18.3.1";
Ch.exports = Mt;
var u = Ch.exports;
const To = /* @__PURE__ */ ym(u);
var va = {}, Lh = { exports: {} }, ns = {}, Oh = { exports: {} }, Dh = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(D, K) {
    var b = D.length;
    D.push(K);
    e: for (; 0 < b; ) {
      var B = b - 1 >>> 1, L = D[B];
      if (0 < l(L, K)) D[B] = K, D[b] = L, b = B;
      else break e;
    }
  }
  function n(D) {
    return D.length === 0 ? null : D[0];
  }
  function r(D) {
    if (D.length === 0) return null;
    var K = D[0], b = D.pop();
    if (b !== K) {
      D[0] = b;
      e: for (var B = 0, L = D.length, ie = L >>> 1; B < ie; ) {
        var ne = 2 * (B + 1) - 1, q = D[ne], H = ne + 1, Ae = D[H];
        if (0 > l(q, b)) H < L && 0 > l(Ae, q) ? (D[B] = Ae, D[H] = b, B = H) : (D[B] = q, D[ne] = b, B = ne);
        else if (H < L && 0 > l(Ae, b)) D[B] = Ae, D[H] = b, B = H;
        else break e;
      }
    }
    return K;
  }
  function l(D, K) {
    var b = D.sortIndex - K.sortIndex;
    return b !== 0 ? b : D.id - K.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var a = Date, i = a.now();
    e.unstable_now = function() {
      return a.now() - i;
    };
  }
  var c = [], d = [], v = 1, p = null, m = 3, y = !1, C = !1, j = !1, P = typeof setTimeout == "function" ? setTimeout : null, w = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function x(D) {
    for (var K = n(d); K !== null; ) {
      if (K.callback === null) r(d);
      else if (K.startTime <= D) r(d), K.sortIndex = K.expirationTime, t(c, K);
      else break;
      K = n(d);
    }
  }
  function I(D) {
    if (j = !1, x(D), !C) if (n(c) !== null) C = !0, re(S);
    else {
      var K = n(d);
      K !== null && X(I, K.startTime - D);
    }
  }
  function S(D, K) {
    C = !1, j && (j = !1, w($), $ = -1), y = !0;
    var b = m;
    try {
      for (x(K), p = n(c); p !== null && (!(p.expirationTime > K) || D && !_()); ) {
        var B = p.callback;
        if (typeof B == "function") {
          p.callback = null, m = p.priorityLevel;
          var L = B(p.expirationTime <= K);
          K = e.unstable_now(), typeof L == "function" ? p.callback = L : p === n(c) && r(c), x(K);
        } else r(c);
        p = n(c);
      }
      if (p !== null) var ie = !0;
      else {
        var ne = n(d);
        ne !== null && X(I, ne.startTime - K), ie = !1;
      }
      return ie;
    } finally {
      p = null, m = b, y = !1;
    }
  }
  var M = !1, h = null, $ = -1, E = 5, N = -1;
  function _() {
    return !(e.unstable_now() - N < E);
  }
  function U() {
    if (h !== null) {
      var D = e.unstable_now();
      N = D;
      var K = !0;
      try {
        K = h(!0, D);
      } finally {
        K ? R() : (M = !1, h = null);
      }
    } else M = !1;
  }
  var R;
  if (typeof g == "function") R = function() {
    g(U);
  };
  else if (typeof MessageChannel < "u") {
    var F = new MessageChannel(), oe = F.port2;
    F.port1.onmessage = U, R = function() {
      oe.postMessage(null);
    };
  } else R = function() {
    P(U, 0);
  };
  function re(D) {
    h = D, M || (M = !0, R());
  }
  function X(D, K) {
    $ = P(function() {
      D(e.unstable_now());
    }, K);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(D) {
    D.callback = null;
  }, e.unstable_continueExecution = function() {
    C || y || (C = !0, re(S));
  }, e.unstable_forceFrameRate = function(D) {
    0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : E = 0 < D ? Math.floor(1e3 / D) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(D) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var K = 3;
        break;
      default:
        K = m;
    }
    var b = m;
    m = K;
    try {
      return D();
    } finally {
      m = b;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(D, K) {
    switch (D) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        D = 3;
    }
    var b = m;
    m = D;
    try {
      return K();
    } finally {
      m = b;
    }
  }, e.unstable_scheduleCallback = function(D, K, b) {
    var B = e.unstable_now();
    switch (typeof b == "object" && b !== null ? (b = b.delay, b = typeof b == "number" && 0 < b ? B + b : B) : b = B, D) {
      case 1:
        var L = -1;
        break;
      case 2:
        L = 250;
        break;
      case 5:
        L = 1073741823;
        break;
      case 4:
        L = 1e4;
        break;
      default:
        L = 5e3;
    }
    return L = b + L, D = { id: v++, callback: K, priorityLevel: D, startTime: b, expirationTime: L, sortIndex: -1 }, b > B ? (D.sortIndex = b, t(d, D), n(c) === null && D === n(d) && (j ? (w($), $ = -1) : j = !0, X(I, b - B))) : (D.sortIndex = L, t(c, D), C || y || (C = !0, re(S))), D;
  }, e.unstable_shouldYield = _, e.unstable_wrapCallback = function(D) {
    var K = m;
    return function() {
      var b = m;
      m = K;
      try {
        return D.apply(this, arguments);
      } finally {
        m = b;
      }
    };
  };
})(Dh);
Oh.exports = Dh;
var Lm = Oh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Om = u, ts = Lm;
function je(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Ph = /* @__PURE__ */ new Set(), uo = {};
function zr(e, t) {
  Sl(e, t), Sl(e + "Capture", t);
}
function Sl(e, t) {
  for (uo[e] = t, e = 0; e < t.length; e++) Ph.add(t[e]);
}
var Ws = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Zi = Object.prototype.hasOwnProperty, Dm = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, rd = {}, ld = {};
function Pm(e) {
  return Zi.call(ld, e) ? !0 : Zi.call(rd, e) ? !1 : Dm.test(e) ? ld[e] = !0 : (rd[e] = !0, !1);
}
function _m(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Fm(e, t, n, r) {
  if (t === null || typeof t > "u" || _m(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function Pn(e, t, n, r, l, o, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
}
var Cn = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Cn[e] = new Pn(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Cn[t] = new Pn(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Cn[e] = new Pn(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Cn[e] = new Pn(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Cn[e] = new Pn(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Cn[e] = new Pn(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Cn[e] = new Pn(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Cn[e] = new Pn(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Cn[e] = new Pn(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var nu = /[\-:]([a-z])/g;
function su(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    nu,
    su
  );
  Cn[t] = new Pn(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(nu, su);
  Cn[t] = new Pn(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(nu, su);
  Cn[t] = new Pn(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Cn[e] = new Pn(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Cn.xlinkHref = new Pn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Cn[e] = new Pn(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ru(e, t, n, r) {
  var l = Cn.hasOwnProperty(t) ? Cn[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Fm(t, n, l, r) && (n = null), r || l === null ? Pm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ks = Om.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Fo = Symbol.for("react.element"), rl = Symbol.for("react.portal"), ll = Symbol.for("react.fragment"), lu = Symbol.for("react.strict_mode"), qi = Symbol.for("react.profiler"), _h = Symbol.for("react.provider"), Fh = Symbol.for("react.context"), ou = Symbol.for("react.forward_ref"), ec = Symbol.for("react.suspense"), tc = Symbol.for("react.suspense_list"), au = Symbol.for("react.memo"), nr = Symbol.for("react.lazy"), Bh = Symbol.for("react.offscreen"), od = Symbol.iterator;
function Fl(e) {
  return e === null || typeof e != "object" ? null : (e = od && e[od] || e["@@iterator"], typeof e == "function" ? e : null);
}
var nn = Object.assign, vi;
function Ql(e) {
  if (vi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    vi = t && t[1] || "";
  }
  return `
` + vi + e;
}
var Ni = !1;
function ki(e, t) {
  if (!e || Ni) return "";
  Ni = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (d) {
        var r = d;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (d) {
        r = d;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (d) {
        r = d;
      }
      e();
    }
  } catch (d) {
    if (d && r && typeof d.stack == "string") {
      for (var l = d.stack.split(`
`), o = r.stack.split(`
`), a = l.length - 1, i = o.length - 1; 1 <= a && 0 <= i && l[a] !== o[i]; ) i--;
      for (; 1 <= a && 0 <= i; a--, i--) if (l[a] !== o[i]) {
        if (a !== 1 || i !== 1)
          do
            if (a--, i--, 0 > i || l[a] !== o[i]) {
              var c = `
` + l[a].replace(" at new ", " at ");
              return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
            }
          while (1 <= a && 0 <= i);
        break;
      }
    }
  } finally {
    Ni = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Ql(e) : "";
}
function Bm(e) {
  switch (e.tag) {
    case 5:
      return Ql(e.type);
    case 16:
      return Ql("Lazy");
    case 13:
      return Ql("Suspense");
    case 19:
      return Ql("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = ki(e.type, !1), e;
    case 11:
      return e = ki(e.type.render, !1), e;
    case 1:
      return e = ki(e.type, !0), e;
    default:
      return "";
  }
}
function nc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case ll:
      return "Fragment";
    case rl:
      return "Portal";
    case qi:
      return "Profiler";
    case lu:
      return "StrictMode";
    case ec:
      return "Suspense";
    case tc:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Fh:
      return (e.displayName || "Context") + ".Consumer";
    case _h:
      return (e._context.displayName || "Context") + ".Provider";
    case ou:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case au:
      return t = e.displayName || null, t !== null ? t : nc(e.type) || "Memo";
    case nr:
      t = e._payload, e = e._init;
      try {
        return nc(e(t));
      } catch {
      }
  }
  return null;
}
function Wm(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return nc(t);
    case 8:
      return t === lu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function vr(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Wh(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Um(e) {
  var t = Wh(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(a) {
      r = "" + a, o.call(this, a);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(a) {
      r = "" + a;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function Bo(e) {
  e._valueTracker || (e._valueTracker = Um(e));
}
function Uh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Wh(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Na(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function sc(e, t) {
  var n = t.checked;
  return nn({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function ad(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = vr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function zh(e, t) {
  t = t.checked, t != null && ru(e, "checked", t, !1);
}
function rc(e, t) {
  zh(e, t);
  var n = vr(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? lc(e, t.type, n) : t.hasOwnProperty("defaultValue") && lc(e, t.type, vr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function id(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function lc(e, t, n) {
  (t !== "number" || Na(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Jl = Array.isArray;
function xl(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + vr(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function oc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(je(91));
  return nn({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function cd(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(je(92));
      if (Jl(n)) {
        if (1 < n.length) throw Error(je(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: vr(n) };
}
function Hh(e, t) {
  var n = vr(t.value), r = vr(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ud(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Kh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ac(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Kh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Wo, Vh = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Wo = Wo || document.createElement("div"), Wo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Wo.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function ho(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var to = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, zm = ["Webkit", "ms", "Moz", "O"];
Object.keys(to).forEach(function(e) {
  zm.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), to[t] = to[e];
  });
});
function Yh(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || to.hasOwnProperty(e) && to[e] ? ("" + t).trim() : t + "px";
}
function Xh(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Yh(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var Hm = nn({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ic(e, t) {
  if (t) {
    if (Hm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(je(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(je(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(je(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(je(62));
  }
}
function cc(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var uc = null;
function iu(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var dc = null, yl = null, vl = null;
function dd(e) {
  if (e = Ro(e)) {
    if (typeof dc != "function") throw Error(je(280));
    var t = e.stateNode;
    t && (t = Ja(t), dc(e.stateNode, e.type, t));
  }
}
function Gh(e) {
  yl ? vl ? vl.push(e) : vl = [e] : yl = e;
}
function Qh() {
  if (yl) {
    var e = yl, t = vl;
    if (vl = yl = null, dd(e), t) for (e = 0; e < t.length; e++) dd(t[e]);
  }
}
function Jh(e, t) {
  return e(t);
}
function Zh() {
}
var wi = !1;
function qh(e, t, n) {
  if (wi) return e(t, n);
  wi = !0;
  try {
    return Jh(e, t, n);
  } finally {
    wi = !1, (yl !== null || vl !== null) && (Zh(), Qh());
  }
}
function fo(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Ja(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(je(231, t, typeof n));
  return n;
}
var hc = !1;
if (Ws) try {
  var Bl = {};
  Object.defineProperty(Bl, "passive", { get: function() {
    hc = !0;
  } }), window.addEventListener("test", Bl, Bl), window.removeEventListener("test", Bl, Bl);
} catch {
  hc = !1;
}
function Km(e, t, n, r, l, o, a, i, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var no = !1, ka = null, wa = !1, fc = null, Vm = { onError: function(e) {
  no = !0, ka = e;
} };
function Ym(e, t, n, r, l, o, a, i, c) {
  no = !1, ka = null, Km.apply(Vm, arguments);
}
function Xm(e, t, n, r, l, o, a, i, c) {
  if (Ym.apply(this, arguments), no) {
    if (no) {
      var d = ka;
      no = !1, ka = null;
    } else throw Error(je(198));
    wa || (wa = !0, fc = d);
  }
}
function Hr(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function ef(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function hd(e) {
  if (Hr(e) !== e) throw Error(je(188));
}
function Gm(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Hr(e), t === null) throw Error(je(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return hd(l), e;
        if (o === r) return hd(l), t;
        o = o.sibling;
      }
      throw Error(je(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var a = !1, i = l.child; i; ) {
        if (i === n) {
          a = !0, n = l, r = o;
          break;
        }
        if (i === r) {
          a = !0, r = l, n = o;
          break;
        }
        i = i.sibling;
      }
      if (!a) {
        for (i = o.child; i; ) {
          if (i === n) {
            a = !0, n = o, r = l;
            break;
          }
          if (i === r) {
            a = !0, r = o, n = l;
            break;
          }
          i = i.sibling;
        }
        if (!a) throw Error(je(189));
      }
    }
    if (n.alternate !== r) throw Error(je(190));
  }
  if (n.tag !== 3) throw Error(je(188));
  return n.stateNode.current === n ? e : t;
}
function tf(e) {
  return e = Gm(e), e !== null ? nf(e) : null;
}
function nf(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = nf(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var sf = ts.unstable_scheduleCallback, fd = ts.unstable_cancelCallback, Qm = ts.unstable_shouldYield, Jm = ts.unstable_requestPaint, an = ts.unstable_now, Zm = ts.unstable_getCurrentPriorityLevel, cu = ts.unstable_ImmediatePriority, rf = ts.unstable_UserBlockingPriority, Ea = ts.unstable_NormalPriority, qm = ts.unstable_LowPriority, lf = ts.unstable_IdlePriority, Ya = null, bs = null;
function e0(e) {
  if (bs && typeof bs.onCommitFiberRoot == "function") try {
    bs.onCommitFiberRoot(Ya, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var ys = Math.clz32 ? Math.clz32 : s0, t0 = Math.log, n0 = Math.LN2;
function s0(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (t0(e) / n0 | 0) | 0;
}
var Uo = 64, zo = 4194304;
function Zl(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function ja(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
  if (a !== 0) {
    var i = a & ~l;
    i !== 0 ? r = Zl(i) : (o &= a, o !== 0 && (r = Zl(o)));
  } else a = n & ~l, a !== 0 ? r = Zl(a) : o !== 0 && (r = Zl(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - ys(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function r0(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function l0(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - ys(o), i = 1 << a, c = l[a];
    c === -1 ? (!(i & n) || i & r) && (l[a] = r0(i, t)) : c <= t && (e.expiredLanes |= i), o &= ~i;
  }
}
function pc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function of() {
  var e = Uo;
  return Uo <<= 1, !(Uo & 4194240) && (Uo = 64), e;
}
function Ei(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Ao(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ys(t), e[t] = n;
}
function o0(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - ys(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function uu(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - ys(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Pt = 0;
function af(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var cf, du, uf, df, hf, mc = !1, Ho = [], dr = null, hr = null, fr = null, po = /* @__PURE__ */ new Map(), mo = /* @__PURE__ */ new Map(), or = [], a0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function pd(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      dr = null;
      break;
    case "dragenter":
    case "dragleave":
      hr = null;
      break;
    case "mouseover":
    case "mouseout":
      fr = null;
      break;
    case "pointerover":
    case "pointerout":
      po.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      mo.delete(t.pointerId);
  }
}
function Wl(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Ro(t), t !== null && du(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function i0(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return dr = Wl(dr, e, t, n, r, l), !0;
    case "dragenter":
      return hr = Wl(hr, e, t, n, r, l), !0;
    case "mouseover":
      return fr = Wl(fr, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return po.set(o, Wl(po.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, mo.set(o, Wl(mo.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function ff(e) {
  var t = Tr(e.target);
  if (t !== null) {
    var n = Hr(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = ef(n), t !== null) {
          e.blockedOn = t, hf(e.priority, function() {
            uf(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function aa(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = gc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      uc = r, n.target.dispatchEvent(r), uc = null;
    } else return t = Ro(n), t !== null && du(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function md(e, t, n) {
  aa(e) && n.delete(t);
}
function c0() {
  mc = !1, dr !== null && aa(dr) && (dr = null), hr !== null && aa(hr) && (hr = null), fr !== null && aa(fr) && (fr = null), po.forEach(md), mo.forEach(md);
}
function Ul(e, t) {
  e.blockedOn === t && (e.blockedOn = null, mc || (mc = !0, ts.unstable_scheduleCallback(ts.unstable_NormalPriority, c0)));
}
function go(e) {
  function t(l) {
    return Ul(l, e);
  }
  if (0 < Ho.length) {
    Ul(Ho[0], e);
    for (var n = 1; n < Ho.length; n++) {
      var r = Ho[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (dr !== null && Ul(dr, e), hr !== null && Ul(hr, e), fr !== null && Ul(fr, e), po.forEach(t), mo.forEach(t), n = 0; n < or.length; n++) r = or[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < or.length && (n = or[0], n.blockedOn === null); ) ff(n), n.blockedOn === null && or.shift();
}
var Nl = Ks.ReactCurrentBatchConfig, Ca = !0;
function u0(e, t, n, r) {
  var l = Pt, o = Nl.transition;
  Nl.transition = null;
  try {
    Pt = 1, hu(e, t, n, r);
  } finally {
    Pt = l, Nl.transition = o;
  }
}
function d0(e, t, n, r) {
  var l = Pt, o = Nl.transition;
  Nl.transition = null;
  try {
    Pt = 4, hu(e, t, n, r);
  } finally {
    Pt = l, Nl.transition = o;
  }
}
function hu(e, t, n, r) {
  if (Ca) {
    var l = gc(e, t, n, r);
    if (l === null) Ri(e, t, r, Sa, n), pd(e, r);
    else if (i0(l, e, t, n, r)) r.stopPropagation();
    else if (pd(e, r), t & 4 && -1 < a0.indexOf(e)) {
      for (; l !== null; ) {
        var o = Ro(l);
        if (o !== null && cf(o), o = gc(e, t, n, r), o === null && Ri(e, t, r, Sa, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Ri(e, t, r, null, n);
  }
}
var Sa = null;
function gc(e, t, n, r) {
  if (Sa = null, e = iu(r), e = Tr(e), e !== null) if (t = Hr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = ef(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Sa = e, null;
}
function pf(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Zm()) {
        case cu:
          return 1;
        case rf:
          return 4;
        case Ea:
        case qm:
          return 16;
        case lf:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var cr = null, fu = null, ia = null;
function mf() {
  if (ia) return ia;
  var e, t = fu, n = t.length, r, l = "value" in cr ? cr.value : cr.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === l[o - r]; r++) ;
  return ia = l.slice(e, 1 < r ? 1 - r : void 0);
}
function ca(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Ko() {
  return !0;
}
function gd() {
  return !1;
}
function ss(e) {
  function t(n, r, l, o, a) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(o) : o[i]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Ko : gd, this.isPropagationStopped = gd, this;
  }
  return nn(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ko);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ko);
  }, persist: function() {
  }, isPersistent: Ko }), t;
}
var Ll = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, pu = ss(Ll), $o = nn({}, Ll, { view: 0, detail: 0 }), h0 = ss($o), ji, Ci, zl, Xa = nn({}, $o, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: mu, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== zl && (zl && e.type === "mousemove" ? (ji = e.screenX - zl.screenX, Ci = e.screenY - zl.screenY) : Ci = ji = 0, zl = e), ji);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ci;
} }), xd = ss(Xa), f0 = nn({}, Xa, { dataTransfer: 0 }), p0 = ss(f0), m0 = nn({}, $o, { relatedTarget: 0 }), Si = ss(m0), g0 = nn({}, Ll, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), x0 = ss(g0), y0 = nn({}, Ll, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), v0 = ss(y0), N0 = nn({}, Ll, { data: 0 }), yd = ss(N0), k0 = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, w0 = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, E0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function j0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = E0[e]) ? !!t[e] : !1;
}
function mu() {
  return j0;
}
var C0 = nn({}, $o, { key: function(e) {
  if (e.key) {
    var t = k0[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = ca(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? w0[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: mu, charCode: function(e) {
  return e.type === "keypress" ? ca(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? ca(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), S0 = ss(C0), M0 = nn({}, Xa, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), vd = ss(M0), b0 = nn({}, $o, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: mu }), I0 = ss(b0), T0 = nn({}, Ll, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), A0 = ss(T0), $0 = nn({}, Xa, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), R0 = ss($0), L0 = [9, 13, 27, 32], gu = Ws && "CompositionEvent" in window, so = null;
Ws && "documentMode" in document && (so = document.documentMode);
var O0 = Ws && "TextEvent" in window && !so, gf = Ws && (!gu || so && 8 < so && 11 >= so), Nd = " ", kd = !1;
function xf(e, t) {
  switch (e) {
    case "keyup":
      return L0.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function yf(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var ol = !1;
function D0(e, t) {
  switch (e) {
    case "compositionend":
      return yf(t);
    case "keypress":
      return t.which !== 32 ? null : (kd = !0, Nd);
    case "textInput":
      return e = t.data, e === Nd && kd ? null : e;
    default:
      return null;
  }
}
function P0(e, t) {
  if (ol) return e === "compositionend" || !gu && xf(e, t) ? (e = mf(), ia = fu = cr = null, ol = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return gf && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var _0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function wd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!_0[e.type] : t === "textarea";
}
function vf(e, t, n, r) {
  Gh(r), t = Ma(t, "onChange"), 0 < t.length && (n = new pu("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var ro = null, xo = null;
function F0(e) {
  Tf(e, 0);
}
function Ga(e) {
  var t = cl(e);
  if (Uh(t)) return e;
}
function B0(e, t) {
  if (e === "change") return t;
}
var Nf = !1;
if (Ws) {
  var Mi;
  if (Ws) {
    var bi = "oninput" in document;
    if (!bi) {
      var Ed = document.createElement("div");
      Ed.setAttribute("oninput", "return;"), bi = typeof Ed.oninput == "function";
    }
    Mi = bi;
  } else Mi = !1;
  Nf = Mi && (!document.documentMode || 9 < document.documentMode);
}
function jd() {
  ro && (ro.detachEvent("onpropertychange", kf), xo = ro = null);
}
function kf(e) {
  if (e.propertyName === "value" && Ga(xo)) {
    var t = [];
    vf(t, xo, e, iu(e)), qh(F0, t);
  }
}
function W0(e, t, n) {
  e === "focusin" ? (jd(), ro = t, xo = n, ro.attachEvent("onpropertychange", kf)) : e === "focusout" && jd();
}
function U0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ga(xo);
}
function z0(e, t) {
  if (e === "click") return Ga(t);
}
function H0(e, t) {
  if (e === "input" || e === "change") return Ga(t);
}
function K0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ns = typeof Object.is == "function" ? Object.is : K0;
function yo(e, t) {
  if (Ns(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Zi.call(t, l) || !Ns(e[l], t[l])) return !1;
  }
  return !0;
}
function Cd(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Sd(e, t) {
  var n = Cd(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Cd(n);
  }
}
function wf(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? wf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Ef() {
  for (var e = window, t = Na(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Na(e.document);
  }
  return t;
}
function xu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function V0(e) {
  var t = Ef(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && wf(n.ownerDocument.documentElement, n)) {
    if (r !== null && xu(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = Sd(n, o);
        var a = Sd(
          n,
          r
        );
        l && a && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== a.node || e.focusOffset !== a.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(a.node, a.offset)) : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Y0 = Ws && "documentMode" in document && 11 >= document.documentMode, al = null, xc = null, lo = null, yc = !1;
function Md(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  yc || al == null || al !== Na(r) || (r = al, "selectionStart" in r && xu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), lo && yo(lo, r) || (lo = r, r = Ma(xc, "onSelect"), 0 < r.length && (t = new pu("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = al)));
}
function Vo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var il = { animationend: Vo("Animation", "AnimationEnd"), animationiteration: Vo("Animation", "AnimationIteration"), animationstart: Vo("Animation", "AnimationStart"), transitionend: Vo("Transition", "TransitionEnd") }, Ii = {}, jf = {};
Ws && (jf = document.createElement("div").style, "AnimationEvent" in window || (delete il.animationend.animation, delete il.animationiteration.animation, delete il.animationstart.animation), "TransitionEvent" in window || delete il.transitionend.transition);
function Qa(e) {
  if (Ii[e]) return Ii[e];
  if (!il[e]) return e;
  var t = il[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in jf) return Ii[e] = t[n];
  return e;
}
var Cf = Qa("animationend"), Sf = Qa("animationiteration"), Mf = Qa("animationstart"), bf = Qa("transitionend"), If = /* @__PURE__ */ new Map(), bd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function kr(e, t) {
  If.set(e, t), zr(t, [e]);
}
for (var Ti = 0; Ti < bd.length; Ti++) {
  var Ai = bd[Ti], X0 = Ai.toLowerCase(), G0 = Ai[0].toUpperCase() + Ai.slice(1);
  kr(X0, "on" + G0);
}
kr(Cf, "onAnimationEnd");
kr(Sf, "onAnimationIteration");
kr(Mf, "onAnimationStart");
kr("dblclick", "onDoubleClick");
kr("focusin", "onFocus");
kr("focusout", "onBlur");
kr(bf, "onTransitionEnd");
Sl("onMouseEnter", ["mouseout", "mouseover"]);
Sl("onMouseLeave", ["mouseout", "mouseover"]);
Sl("onPointerEnter", ["pointerout", "pointerover"]);
Sl("onPointerLeave", ["pointerout", "pointerover"]);
zr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
zr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
zr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
zr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
zr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
zr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var ql = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Q0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(ql));
function Id(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Xm(r, t, void 0, e), e.currentTarget = null;
}
function Tf(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var a = r.length - 1; 0 <= a; a--) {
        var i = r[a], c = i.instance, d = i.currentTarget;
        if (i = i.listener, c !== o && l.isPropagationStopped()) break e;
        Id(l, i, d), o = c;
      }
      else for (a = 0; a < r.length; a++) {
        if (i = r[a], c = i.instance, d = i.currentTarget, i = i.listener, c !== o && l.isPropagationStopped()) break e;
        Id(l, i, d), o = c;
      }
    }
  }
  if (wa) throw e = fc, wa = !1, fc = null, e;
}
function Yt(e, t) {
  var n = t[Ec];
  n === void 0 && (n = t[Ec] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Af(t, e, 2, !1), n.add(r));
}
function $i(e, t, n) {
  var r = 0;
  t && (r |= 4), Af(n, e, r, t);
}
var Yo = "_reactListening" + Math.random().toString(36).slice(2);
function vo(e) {
  if (!e[Yo]) {
    e[Yo] = !0, Ph.forEach(function(n) {
      n !== "selectionchange" && (Q0.has(n) || $i(n, !1, e), $i(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Yo] || (t[Yo] = !0, $i("selectionchange", !1, t));
  }
}
function Af(e, t, n, r) {
  switch (pf(t)) {
    case 1:
      var l = u0;
      break;
    case 4:
      l = d0;
      break;
    default:
      l = hu;
  }
  n = l.bind(null, t, n, e), l = void 0, !hc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Ri(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var a = r.tag;
    if (a === 3 || a === 4) {
      var i = r.stateNode.containerInfo;
      if (i === l || i.nodeType === 8 && i.parentNode === l) break;
      if (a === 4) for (a = r.return; a !== null; ) {
        var c = a.tag;
        if ((c === 3 || c === 4) && (c = a.stateNode.containerInfo, c === l || c.nodeType === 8 && c.parentNode === l)) return;
        a = a.return;
      }
      for (; i !== null; ) {
        if (a = Tr(i), a === null) return;
        if (c = a.tag, c === 5 || c === 6) {
          r = o = a;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  qh(function() {
    var d = o, v = iu(n), p = [];
    e: {
      var m = If.get(e);
      if (m !== void 0) {
        var y = pu, C = e;
        switch (e) {
          case "keypress":
            if (ca(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = S0;
            break;
          case "focusin":
            C = "focus", y = Si;
            break;
          case "focusout":
            C = "blur", y = Si;
            break;
          case "beforeblur":
          case "afterblur":
            y = Si;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = xd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = p0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = I0;
            break;
          case Cf:
          case Sf:
          case Mf:
            y = x0;
            break;
          case bf:
            y = A0;
            break;
          case "scroll":
            y = h0;
            break;
          case "wheel":
            y = R0;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = v0;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = vd;
        }
        var j = (t & 4) !== 0, P = !j && e === "scroll", w = j ? m !== null ? m + "Capture" : null : m;
        j = [];
        for (var g = d, x; g !== null; ) {
          x = g;
          var I = x.stateNode;
          if (x.tag === 5 && I !== null && (x = I, w !== null && (I = fo(g, w), I != null && j.push(No(g, I, x)))), P) break;
          g = g.return;
        }
        0 < j.length && (m = new y(m, C, null, n, v), p.push({ event: m, listeners: j }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (m = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", m && n !== uc && (C = n.relatedTarget || n.fromElement) && (Tr(C) || C[Us])) break e;
        if ((y || m) && (m = v.window === v ? v : (m = v.ownerDocument) ? m.defaultView || m.parentWindow : window, y ? (C = n.relatedTarget || n.toElement, y = d, C = C ? Tr(C) : null, C !== null && (P = Hr(C), C !== P || C.tag !== 5 && C.tag !== 6) && (C = null)) : (y = null, C = d), y !== C)) {
          if (j = xd, I = "onMouseLeave", w = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (j = vd, I = "onPointerLeave", w = "onPointerEnter", g = "pointer"), P = y == null ? m : cl(y), x = C == null ? m : cl(C), m = new j(I, g + "leave", y, n, v), m.target = P, m.relatedTarget = x, I = null, Tr(v) === d && (j = new j(w, g + "enter", C, n, v), j.target = x, j.relatedTarget = P, I = j), P = I, y && C) t: {
            for (j = y, w = C, g = 0, x = j; x; x = Zr(x)) g++;
            for (x = 0, I = w; I; I = Zr(I)) x++;
            for (; 0 < g - x; ) j = Zr(j), g--;
            for (; 0 < x - g; ) w = Zr(w), x--;
            for (; g--; ) {
              if (j === w || w !== null && j === w.alternate) break t;
              j = Zr(j), w = Zr(w);
            }
            j = null;
          }
          else j = null;
          y !== null && Td(p, m, y, j, !1), C !== null && P !== null && Td(p, P, C, j, !0);
        }
      }
      e: {
        if (m = d ? cl(d) : window, y = m.nodeName && m.nodeName.toLowerCase(), y === "select" || y === "input" && m.type === "file") var S = B0;
        else if (wd(m)) if (Nf) S = H0;
        else {
          S = U0;
          var M = W0;
        }
        else (y = m.nodeName) && y.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (S = z0);
        if (S && (S = S(e, d))) {
          vf(p, S, n, v);
          break e;
        }
        M && M(e, m, d), e === "focusout" && (M = m._wrapperState) && M.controlled && m.type === "number" && lc(m, "number", m.value);
      }
      switch (M = d ? cl(d) : window, e) {
        case "focusin":
          (wd(M) || M.contentEditable === "true") && (al = M, xc = d, lo = null);
          break;
        case "focusout":
          lo = xc = al = null;
          break;
        case "mousedown":
          yc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          yc = !1, Md(p, n, v);
          break;
        case "selectionchange":
          if (Y0) break;
        case "keydown":
        case "keyup":
          Md(p, n, v);
      }
      var h;
      if (gu) e: {
        switch (e) {
          case "compositionstart":
            var $ = "onCompositionStart";
            break e;
          case "compositionend":
            $ = "onCompositionEnd";
            break e;
          case "compositionupdate":
            $ = "onCompositionUpdate";
            break e;
        }
        $ = void 0;
      }
      else ol ? xf(e, n) && ($ = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && ($ = "onCompositionStart");
      $ && (gf && n.locale !== "ko" && (ol || $ !== "onCompositionStart" ? $ === "onCompositionEnd" && ol && (h = mf()) : (cr = v, fu = "value" in cr ? cr.value : cr.textContent, ol = !0)), M = Ma(d, $), 0 < M.length && ($ = new yd($, e, null, n, v), p.push({ event: $, listeners: M }), h ? $.data = h : (h = yf(n), h !== null && ($.data = h)))), (h = O0 ? D0(e, n) : P0(e, n)) && (d = Ma(d, "onBeforeInput"), 0 < d.length && (v = new yd("onBeforeInput", "beforeinput", null, n, v), p.push({ event: v, listeners: d }), v.data = h));
    }
    Tf(p, t);
  });
}
function No(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ma(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = fo(e, n), o != null && r.unshift(No(e, o, l)), o = fo(e, t), o != null && r.push(No(e, o, l))), e = e.return;
  }
  return r;
}
function Zr(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Td(e, t, n, r, l) {
  for (var o = t._reactName, a = []; n !== null && n !== r; ) {
    var i = n, c = i.alternate, d = i.stateNode;
    if (c !== null && c === r) break;
    i.tag === 5 && d !== null && (i = d, l ? (c = fo(n, o), c != null && a.unshift(No(n, c, i))) : l || (c = fo(n, o), c != null && a.push(No(n, c, i)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var J0 = /\r\n?/g, Z0 = /\u0000|\uFFFD/g;
function Ad(e) {
  return (typeof e == "string" ? e : "" + e).replace(J0, `
`).replace(Z0, "");
}
function Xo(e, t, n) {
  if (t = Ad(t), Ad(e) !== t && n) throw Error(je(425));
}
function ba() {
}
var vc = null, Nc = null;
function kc(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var wc = typeof setTimeout == "function" ? setTimeout : void 0, q0 = typeof clearTimeout == "function" ? clearTimeout : void 0, $d = typeof Promise == "function" ? Promise : void 0, eg = typeof queueMicrotask == "function" ? queueMicrotask : typeof $d < "u" ? function(e) {
  return $d.resolve(null).then(e).catch(tg);
} : wc;
function tg(e) {
  setTimeout(function() {
    throw e;
  });
}
function Li(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), go(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  go(t);
}
function pr(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Rd(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Ol = Math.random().toString(36).slice(2), Ss = "__reactFiber$" + Ol, ko = "__reactProps$" + Ol, Us = "__reactContainer$" + Ol, Ec = "__reactEvents$" + Ol, ng = "__reactListeners$" + Ol, sg = "__reactHandles$" + Ol;
function Tr(e) {
  var t = e[Ss];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Us] || n[Ss]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Rd(e); e !== null; ) {
        if (n = e[Ss]) return n;
        e = Rd(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Ro(e) {
  return e = e[Ss] || e[Us], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function cl(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(je(33));
}
function Ja(e) {
  return e[ko] || null;
}
var jc = [], ul = -1;
function wr(e) {
  return { current: e };
}
function Xt(e) {
  0 > ul || (e.current = jc[ul], jc[ul] = null, ul--);
}
function Kt(e, t) {
  ul++, jc[ul] = e.current, e.current = t;
}
var Nr = {}, In = wr(Nr), zn = wr(!1), _r = Nr;
function Ml(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Nr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Hn(e) {
  return e = e.childContextTypes, e != null;
}
function Ia() {
  Xt(zn), Xt(In);
}
function Ld(e, t, n) {
  if (In.current !== Nr) throw Error(je(168));
  Kt(In, t), Kt(zn, n);
}
function $f(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(je(108, Wm(e) || "Unknown", l));
  return nn({}, n, r);
}
function Ta(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Nr, _r = In.current, Kt(In, e), Kt(zn, zn.current), !0;
}
function Od(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(je(169));
  n ? (e = $f(e, t, _r), r.__reactInternalMemoizedMergedChildContext = e, Xt(zn), Xt(In), Kt(In, e)) : Xt(zn), Kt(zn, n);
}
var Os = null, Za = !1, Oi = !1;
function Rf(e) {
  Os === null ? Os = [e] : Os.push(e);
}
function rg(e) {
  Za = !0, Rf(e);
}
function Er() {
  if (!Oi && Os !== null) {
    Oi = !0;
    var e = 0, t = Pt;
    try {
      var n = Os;
      for (Pt = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Os = null, Za = !1;
    } catch (l) {
      throw Os !== null && (Os = Os.slice(e + 1)), sf(cu, Er), l;
    } finally {
      Pt = t, Oi = !1;
    }
  }
  return null;
}
var dl = [], hl = 0, Aa = null, $a = 0, os = [], as = 0, Fr = null, Ps = 1, _s = "";
function Mr(e, t) {
  dl[hl++] = $a, dl[hl++] = Aa, Aa = e, $a = t;
}
function Lf(e, t, n) {
  os[as++] = Ps, os[as++] = _s, os[as++] = Fr, Fr = e;
  var r = Ps;
  e = _s;
  var l = 32 - ys(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - ys(t) + l;
  if (30 < o) {
    var a = l - l % 5;
    o = (r & (1 << a) - 1).toString(32), r >>= a, l -= a, Ps = 1 << 32 - ys(t) + l | n << l | r, _s = o + e;
  } else Ps = 1 << o | n << l | r, _s = e;
}
function yu(e) {
  e.return !== null && (Mr(e, 1), Lf(e, 1, 0));
}
function vu(e) {
  for (; e === Aa; ) Aa = dl[--hl], dl[hl] = null, $a = dl[--hl], dl[hl] = null;
  for (; e === Fr; ) Fr = os[--as], os[as] = null, _s = os[--as], os[as] = null, Ps = os[--as], os[as] = null;
}
var es = null, qn = null, Jt = !1, gs = null;
function Of(e, t) {
  var n = is(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Dd(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, es = e, qn = pr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, es = e, qn = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Fr !== null ? { id: Ps, overflow: _s } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = is(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, es = e, qn = null, !0) : !1;
    default:
      return !1;
  }
}
function Cc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Sc(e) {
  if (Jt) {
    var t = qn;
    if (t) {
      var n = t;
      if (!Dd(e, t)) {
        if (Cc(e)) throw Error(je(418));
        t = pr(n.nextSibling);
        var r = es;
        t && Dd(e, t) ? Of(r, n) : (e.flags = e.flags & -4097 | 2, Jt = !1, es = e);
      }
    } else {
      if (Cc(e)) throw Error(je(418));
      e.flags = e.flags & -4097 | 2, Jt = !1, es = e;
    }
  }
}
function Pd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  es = e;
}
function Go(e) {
  if (e !== es) return !1;
  if (!Jt) return Pd(e), Jt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !kc(e.type, e.memoizedProps)), t && (t = qn)) {
    if (Cc(e)) throw Df(), Error(je(418));
    for (; t; ) Of(e, t), t = pr(t.nextSibling);
  }
  if (Pd(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(je(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              qn = pr(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      qn = null;
    }
  } else qn = es ? pr(e.stateNode.nextSibling) : null;
  return !0;
}
function Df() {
  for (var e = qn; e; ) e = pr(e.nextSibling);
}
function bl() {
  qn = es = null, Jt = !1;
}
function Nu(e) {
  gs === null ? gs = [e] : gs.push(e);
}
var lg = Ks.ReactCurrentBatchConfig;
function Hl(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(je(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(je(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(a) {
        var i = l.refs;
        a === null ? delete i[o] : i[o] = a;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(je(284));
    if (!n._owner) throw Error(je(290, e));
  }
  return e;
}
function Qo(e, t) {
  throw e = Object.prototype.toString.call(t), Error(je(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function _d(e) {
  var t = e._init;
  return t(e._payload);
}
function Pf(e) {
  function t(w, g) {
    if (e) {
      var x = w.deletions;
      x === null ? (w.deletions = [g], w.flags |= 16) : x.push(g);
    }
  }
  function n(w, g) {
    if (!e) return null;
    for (; g !== null; ) t(w, g), g = g.sibling;
    return null;
  }
  function r(w, g) {
    for (w = /* @__PURE__ */ new Map(); g !== null; ) g.key !== null ? w.set(g.key, g) : w.set(g.index, g), g = g.sibling;
    return w;
  }
  function l(w, g) {
    return w = yr(w, g), w.index = 0, w.sibling = null, w;
  }
  function o(w, g, x) {
    return w.index = x, e ? (x = w.alternate, x !== null ? (x = x.index, x < g ? (w.flags |= 2, g) : x) : (w.flags |= 2, g)) : (w.flags |= 1048576, g);
  }
  function a(w) {
    return e && w.alternate === null && (w.flags |= 2), w;
  }
  function i(w, g, x, I) {
    return g === null || g.tag !== 6 ? (g = Ui(x, w.mode, I), g.return = w, g) : (g = l(g, x), g.return = w, g);
  }
  function c(w, g, x, I) {
    var S = x.type;
    return S === ll ? v(w, g, x.props.children, I, x.key) : g !== null && (g.elementType === S || typeof S == "object" && S !== null && S.$$typeof === nr && _d(S) === g.type) ? (I = l(g, x.props), I.ref = Hl(w, g, x), I.return = w, I) : (I = ga(x.type, x.key, x.props, null, w.mode, I), I.ref = Hl(w, g, x), I.return = w, I);
  }
  function d(w, g, x, I) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== x.containerInfo || g.stateNode.implementation !== x.implementation ? (g = zi(x, w.mode, I), g.return = w, g) : (g = l(g, x.children || []), g.return = w, g);
  }
  function v(w, g, x, I, S) {
    return g === null || g.tag !== 7 ? (g = Dr(x, w.mode, I, S), g.return = w, g) : (g = l(g, x), g.return = w, g);
  }
  function p(w, g, x) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = Ui("" + g, w.mode, x), g.return = w, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Fo:
          return x = ga(g.type, g.key, g.props, null, w.mode, x), x.ref = Hl(w, null, g), x.return = w, x;
        case rl:
          return g = zi(g, w.mode, x), g.return = w, g;
        case nr:
          var I = g._init;
          return p(w, I(g._payload), x);
      }
      if (Jl(g) || Fl(g)) return g = Dr(g, w.mode, x, null), g.return = w, g;
      Qo(w, g);
    }
    return null;
  }
  function m(w, g, x, I) {
    var S = g !== null ? g.key : null;
    if (typeof x == "string" && x !== "" || typeof x == "number") return S !== null ? null : i(w, g, "" + x, I);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Fo:
          return x.key === S ? c(w, g, x, I) : null;
        case rl:
          return x.key === S ? d(w, g, x, I) : null;
        case nr:
          return S = x._init, m(
            w,
            g,
            S(x._payload),
            I
          );
      }
      if (Jl(x) || Fl(x)) return S !== null ? null : v(w, g, x, I, null);
      Qo(w, x);
    }
    return null;
  }
  function y(w, g, x, I, S) {
    if (typeof I == "string" && I !== "" || typeof I == "number") return w = w.get(x) || null, i(g, w, "" + I, S);
    if (typeof I == "object" && I !== null) {
      switch (I.$$typeof) {
        case Fo:
          return w = w.get(I.key === null ? x : I.key) || null, c(g, w, I, S);
        case rl:
          return w = w.get(I.key === null ? x : I.key) || null, d(g, w, I, S);
        case nr:
          var M = I._init;
          return y(w, g, x, M(I._payload), S);
      }
      if (Jl(I) || Fl(I)) return w = w.get(x) || null, v(g, w, I, S, null);
      Qo(g, I);
    }
    return null;
  }
  function C(w, g, x, I) {
    for (var S = null, M = null, h = g, $ = g = 0, E = null; h !== null && $ < x.length; $++) {
      h.index > $ ? (E = h, h = null) : E = h.sibling;
      var N = m(w, h, x[$], I);
      if (N === null) {
        h === null && (h = E);
        break;
      }
      e && h && N.alternate === null && t(w, h), g = o(N, g, $), M === null ? S = N : M.sibling = N, M = N, h = E;
    }
    if ($ === x.length) return n(w, h), Jt && Mr(w, $), S;
    if (h === null) {
      for (; $ < x.length; $++) h = p(w, x[$], I), h !== null && (g = o(h, g, $), M === null ? S = h : M.sibling = h, M = h);
      return Jt && Mr(w, $), S;
    }
    for (h = r(w, h); $ < x.length; $++) E = y(h, w, $, x[$], I), E !== null && (e && E.alternate !== null && h.delete(E.key === null ? $ : E.key), g = o(E, g, $), M === null ? S = E : M.sibling = E, M = E);
    return e && h.forEach(function(_) {
      return t(w, _);
    }), Jt && Mr(w, $), S;
  }
  function j(w, g, x, I) {
    var S = Fl(x);
    if (typeof S != "function") throw Error(je(150));
    if (x = S.call(x), x == null) throw Error(je(151));
    for (var M = S = null, h = g, $ = g = 0, E = null, N = x.next(); h !== null && !N.done; $++, N = x.next()) {
      h.index > $ ? (E = h, h = null) : E = h.sibling;
      var _ = m(w, h, N.value, I);
      if (_ === null) {
        h === null && (h = E);
        break;
      }
      e && h && _.alternate === null && t(w, h), g = o(_, g, $), M === null ? S = _ : M.sibling = _, M = _, h = E;
    }
    if (N.done) return n(
      w,
      h
    ), Jt && Mr(w, $), S;
    if (h === null) {
      for (; !N.done; $++, N = x.next()) N = p(w, N.value, I), N !== null && (g = o(N, g, $), M === null ? S = N : M.sibling = N, M = N);
      return Jt && Mr(w, $), S;
    }
    for (h = r(w, h); !N.done; $++, N = x.next()) N = y(h, w, $, N.value, I), N !== null && (e && N.alternate !== null && h.delete(N.key === null ? $ : N.key), g = o(N, g, $), M === null ? S = N : M.sibling = N, M = N);
    return e && h.forEach(function(U) {
      return t(w, U);
    }), Jt && Mr(w, $), S;
  }
  function P(w, g, x, I) {
    if (typeof x == "object" && x !== null && x.type === ll && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Fo:
          e: {
            for (var S = x.key, M = g; M !== null; ) {
              if (M.key === S) {
                if (S = x.type, S === ll) {
                  if (M.tag === 7) {
                    n(w, M.sibling), g = l(M, x.props.children), g.return = w, w = g;
                    break e;
                  }
                } else if (M.elementType === S || typeof S == "object" && S !== null && S.$$typeof === nr && _d(S) === M.type) {
                  n(w, M.sibling), g = l(M, x.props), g.ref = Hl(w, M, x), g.return = w, w = g;
                  break e;
                }
                n(w, M);
                break;
              } else t(w, M);
              M = M.sibling;
            }
            x.type === ll ? (g = Dr(x.props.children, w.mode, I, x.key), g.return = w, w = g) : (I = ga(x.type, x.key, x.props, null, w.mode, I), I.ref = Hl(w, g, x), I.return = w, w = I);
          }
          return a(w);
        case rl:
          e: {
            for (M = x.key; g !== null; ) {
              if (g.key === M) if (g.tag === 4 && g.stateNode.containerInfo === x.containerInfo && g.stateNode.implementation === x.implementation) {
                n(w, g.sibling), g = l(g, x.children || []), g.return = w, w = g;
                break e;
              } else {
                n(w, g);
                break;
              }
              else t(w, g);
              g = g.sibling;
            }
            g = zi(x, w.mode, I), g.return = w, w = g;
          }
          return a(w);
        case nr:
          return M = x._init, P(w, g, M(x._payload), I);
      }
      if (Jl(x)) return C(w, g, x, I);
      if (Fl(x)) return j(w, g, x, I);
      Qo(w, x);
    }
    return typeof x == "string" && x !== "" || typeof x == "number" ? (x = "" + x, g !== null && g.tag === 6 ? (n(w, g.sibling), g = l(g, x), g.return = w, w = g) : (n(w, g), g = Ui(x, w.mode, I), g.return = w, w = g), a(w)) : n(w, g);
  }
  return P;
}
var Il = Pf(!0), _f = Pf(!1), Ra = wr(null), La = null, fl = null, ku = null;
function wu() {
  ku = fl = La = null;
}
function Eu(e) {
  var t = Ra.current;
  Xt(Ra), e._currentValue = t;
}
function Mc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function kl(e, t) {
  La = e, ku = fl = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Un = !0), e.firstContext = null);
}
function us(e) {
  var t = e._currentValue;
  if (ku !== e) if (e = { context: e, memoizedValue: t, next: null }, fl === null) {
    if (La === null) throw Error(je(308));
    fl = e, La.dependencies = { lanes: 0, firstContext: e };
  } else fl = fl.next = e;
  return t;
}
var Ar = null;
function ju(e) {
  Ar === null ? Ar = [e] : Ar.push(e);
}
function Ff(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, ju(t)) : (n.next = l.next, l.next = n), t.interleaved = n, zs(e, r);
}
function zs(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var sr = !1;
function Cu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Bf(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Fs(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function mr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, At & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, zs(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, ju(r)) : (t.next = l.next, l.next = t), r.interleaved = t, zs(e, n);
}
function ua(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, uu(e, n);
  }
}
function Fd(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var a = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? l = o = a : o = o.next = a, n = n.next;
      } while (n !== null);
      o === null ? l = o = t : o = o.next = t;
    } else l = o = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Oa(e, t, n, r) {
  var l = e.updateQueue;
  sr = !1;
  var o = l.firstBaseUpdate, a = l.lastBaseUpdate, i = l.shared.pending;
  if (i !== null) {
    l.shared.pending = null;
    var c = i, d = c.next;
    c.next = null, a === null ? o = d : a.next = d, a = c;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, i = v.lastBaseUpdate, i !== a && (i === null ? v.firstBaseUpdate = d : i.next = d, v.lastBaseUpdate = c));
  }
  if (o !== null) {
    var p = l.baseState;
    a = 0, v = d = c = null, i = o;
    do {
      var m = i.lane, y = i.eventTime;
      if ((r & m) === m) {
        v !== null && (v = v.next = {
          eventTime: y,
          lane: 0,
          tag: i.tag,
          payload: i.payload,
          callback: i.callback,
          next: null
        });
        e: {
          var C = e, j = i;
          switch (m = t, y = n, j.tag) {
            case 1:
              if (C = j.payload, typeof C == "function") {
                p = C.call(y, p, m);
                break e;
              }
              p = C;
              break e;
            case 3:
              C.flags = C.flags & -65537 | 128;
            case 0:
              if (C = j.payload, m = typeof C == "function" ? C.call(y, p, m) : C, m == null) break e;
              p = nn({}, p, m);
              break e;
            case 2:
              sr = !0;
          }
        }
        i.callback !== null && i.lane !== 0 && (e.flags |= 64, m = l.effects, m === null ? l.effects = [i] : m.push(i));
      } else y = { eventTime: y, lane: m, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, v === null ? (d = v = y, c = p) : v = v.next = y, a |= m;
      if (i = i.next, i === null) {
        if (i = l.shared.pending, i === null) break;
        m = i, i = m.next, m.next = null, l.lastBaseUpdate = m, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (c = p), l.baseState = c, l.firstBaseUpdate = d, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        a |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Wr |= a, e.lanes = a, e.memoizedState = p;
  }
}
function Bd(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(je(191, l));
      l.call(r);
    }
  }
}
var Lo = {}, Is = wr(Lo), wo = wr(Lo), Eo = wr(Lo);
function $r(e) {
  if (e === Lo) throw Error(je(174));
  return e;
}
function Su(e, t) {
  switch (Kt(Eo, t), Kt(wo, e), Kt(Is, Lo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ac(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ac(t, e);
  }
  Xt(Is), Kt(Is, t);
}
function Tl() {
  Xt(Is), Xt(wo), Xt(Eo);
}
function Wf(e) {
  $r(Eo.current);
  var t = $r(Is.current), n = ac(t, e.type);
  t !== n && (Kt(wo, e), Kt(Is, n));
}
function Mu(e) {
  wo.current === e && (Xt(Is), Xt(wo));
}
var en = wr(0);
function Da(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var Di = [];
function bu() {
  for (var e = 0; e < Di.length; e++) Di[e]._workInProgressVersionPrimary = null;
  Di.length = 0;
}
var da = Ks.ReactCurrentDispatcher, Pi = Ks.ReactCurrentBatchConfig, Br = 0, tn = null, xn = null, vn = null, Pa = !1, oo = !1, jo = 0, og = 0;
function Sn() {
  throw Error(je(321));
}
function Iu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ns(e[n], t[n])) return !1;
  return !0;
}
function Tu(e, t, n, r, l, o) {
  if (Br = o, tn = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, da.current = e === null || e.memoizedState === null ? ug : dg, e = n(r, l), oo) {
    o = 0;
    do {
      if (oo = !1, jo = 0, 25 <= o) throw Error(je(301));
      o += 1, vn = xn = null, t.updateQueue = null, da.current = hg, e = n(r, l);
    } while (oo);
  }
  if (da.current = _a, t = xn !== null && xn.next !== null, Br = 0, vn = xn = tn = null, Pa = !1, t) throw Error(je(300));
  return e;
}
function Au() {
  var e = jo !== 0;
  return jo = 0, e;
}
function Cs() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return vn === null ? tn.memoizedState = vn = e : vn = vn.next = e, vn;
}
function ds() {
  if (xn === null) {
    var e = tn.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = xn.next;
  var t = vn === null ? tn.memoizedState : vn.next;
  if (t !== null) vn = t, xn = e;
  else {
    if (e === null) throw Error(je(310));
    xn = e, e = { memoizedState: xn.memoizedState, baseState: xn.baseState, baseQueue: xn.baseQueue, queue: xn.queue, next: null }, vn === null ? tn.memoizedState = vn = e : vn = vn.next = e;
  }
  return vn;
}
function Co(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function _i(e) {
  var t = ds(), n = t.queue;
  if (n === null) throw Error(je(311));
  n.lastRenderedReducer = e;
  var r = xn, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var a = l.next;
      l.next = o.next, o.next = a;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var i = a = null, c = null, d = o;
    do {
      var v = d.lane;
      if ((Br & v) === v) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var p = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (i = c = p, a = r) : c = c.next = p, tn.lanes |= v, Wr |= v;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? a = r : c.next = i, Ns(r, t.memoizedState) || (Un = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = c, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, tn.lanes |= o, Wr |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Fi(e) {
  var t = ds(), n = t.queue;
  if (n === null) throw Error(je(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var a = l = l.next;
    do
      o = e(o, a.action), a = a.next;
    while (a !== l);
    Ns(o, t.memoizedState) || (Un = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Uf() {
}
function zf(e, t) {
  var n = tn, r = ds(), l = t(), o = !Ns(r.memoizedState, l);
  if (o && (r.memoizedState = l, Un = !0), r = r.queue, $u(Vf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || vn !== null && vn.memoizedState.tag & 1) {
    if (n.flags |= 2048, So(9, Kf.bind(null, n, r, l, t), void 0, null), Nn === null) throw Error(je(349));
    Br & 30 || Hf(n, t, l);
  }
  return l;
}
function Hf(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = tn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, tn.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Kf(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Yf(t) && Xf(e);
}
function Vf(e, t, n) {
  return n(function() {
    Yf(t) && Xf(e);
  });
}
function Yf(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ns(e, n);
  } catch {
    return !0;
  }
}
function Xf(e) {
  var t = zs(e, 1);
  t !== null && vs(t, e, 1, -1);
}
function Wd(e) {
  var t = Cs();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Co, lastRenderedState: e }, t.queue = e, e = e.dispatch = cg.bind(null, tn, e), [t.memoizedState, e];
}
function So(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = tn.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, tn.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Gf() {
  return ds().memoizedState;
}
function ha(e, t, n, r) {
  var l = Cs();
  tn.flags |= e, l.memoizedState = So(1 | t, n, void 0, r === void 0 ? null : r);
}
function qa(e, t, n, r) {
  var l = ds();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (xn !== null) {
    var a = xn.memoizedState;
    if (o = a.destroy, r !== null && Iu(r, a.deps)) {
      l.memoizedState = So(t, n, o, r);
      return;
    }
  }
  tn.flags |= e, l.memoizedState = So(1 | t, n, o, r);
}
function Ud(e, t) {
  return ha(8390656, 8, e, t);
}
function $u(e, t) {
  return qa(2048, 8, e, t);
}
function Qf(e, t) {
  return qa(4, 2, e, t);
}
function Jf(e, t) {
  return qa(4, 4, e, t);
}
function Zf(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function qf(e, t, n) {
  return n = n != null ? n.concat([e]) : null, qa(4, 4, Zf.bind(null, t, e), n);
}
function Ru() {
}
function ep(e, t) {
  var n = ds();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Iu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function tp(e, t) {
  var n = ds();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Iu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function np(e, t, n) {
  return Br & 21 ? (Ns(n, t) || (n = of(), tn.lanes |= n, Wr |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Un = !0), e.memoizedState = n);
}
function ag(e, t) {
  var n = Pt;
  Pt = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Pi.transition;
  Pi.transition = {};
  try {
    e(!1), t();
  } finally {
    Pt = n, Pi.transition = r;
  }
}
function sp() {
  return ds().memoizedState;
}
function ig(e, t, n) {
  var r = xr(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, rp(e)) lp(t, n);
  else if (n = Ff(e, t, n, r), n !== null) {
    var l = On();
    vs(n, e, r, l), op(n, t, r);
  }
}
function cg(e, t, n) {
  var r = xr(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (rp(e)) lp(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var a = t.lastRenderedState, i = o(a, n);
      if (l.hasEagerState = !0, l.eagerState = i, Ns(i, a)) {
        var c = t.interleaved;
        c === null ? (l.next = l, ju(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Ff(e, t, l, r), n !== null && (l = On(), vs(n, e, r, l), op(n, t, r));
  }
}
function rp(e) {
  var t = e.alternate;
  return e === tn || t !== null && t === tn;
}
function lp(e, t) {
  oo = Pa = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function op(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, uu(e, n);
  }
}
var _a = { readContext: us, useCallback: Sn, useContext: Sn, useEffect: Sn, useImperativeHandle: Sn, useInsertionEffect: Sn, useLayoutEffect: Sn, useMemo: Sn, useReducer: Sn, useRef: Sn, useState: Sn, useDebugValue: Sn, useDeferredValue: Sn, useTransition: Sn, useMutableSource: Sn, useSyncExternalStore: Sn, useId: Sn, unstable_isNewReconciler: !1 }, ug = { readContext: us, useCallback: function(e, t) {
  return Cs().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: us, useEffect: Ud, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ha(
    4194308,
    4,
    Zf.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return ha(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return ha(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Cs();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Cs();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = ig.bind(null, tn, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Cs();
  return e = { current: e }, t.memoizedState = e;
}, useState: Wd, useDebugValue: Ru, useDeferredValue: function(e) {
  return Cs().memoizedState = e;
}, useTransition: function() {
  var e = Wd(!1), t = e[0];
  return e = ag.bind(null, e[1]), Cs().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = tn, l = Cs();
  if (Jt) {
    if (n === void 0) throw Error(je(407));
    n = n();
  } else {
    if (n = t(), Nn === null) throw Error(je(349));
    Br & 30 || Hf(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ud(Vf.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, So(9, Kf.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Cs(), t = Nn.identifierPrefix;
  if (Jt) {
    var n = _s, r = Ps;
    n = (r & ~(1 << 32 - ys(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = jo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = og++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, dg = {
  readContext: us,
  useCallback: ep,
  useContext: us,
  useEffect: $u,
  useImperativeHandle: qf,
  useInsertionEffect: Qf,
  useLayoutEffect: Jf,
  useMemo: tp,
  useReducer: _i,
  useRef: Gf,
  useState: function() {
    return _i(Co);
  },
  useDebugValue: Ru,
  useDeferredValue: function(e) {
    var t = ds();
    return np(t, xn.memoizedState, e);
  },
  useTransition: function() {
    var e = _i(Co)[0], t = ds().memoizedState;
    return [e, t];
  },
  useMutableSource: Uf,
  useSyncExternalStore: zf,
  useId: sp,
  unstable_isNewReconciler: !1
}, hg = { readContext: us, useCallback: ep, useContext: us, useEffect: $u, useImperativeHandle: qf, useInsertionEffect: Qf, useLayoutEffect: Jf, useMemo: tp, useReducer: Fi, useRef: Gf, useState: function() {
  return Fi(Co);
}, useDebugValue: Ru, useDeferredValue: function(e) {
  var t = ds();
  return xn === null ? t.memoizedState = e : np(t, xn.memoizedState, e);
}, useTransition: function() {
  var e = Fi(Co)[0], t = ds().memoizedState;
  return [e, t];
}, useMutableSource: Uf, useSyncExternalStore: zf, useId: sp, unstable_isNewReconciler: !1 };
function ps(e, t) {
  if (e && e.defaultProps) {
    t = nn({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function bc(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : nn({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ei = { isMounted: function(e) {
  return (e = e._reactInternals) ? Hr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = On(), l = xr(e), o = Fs(r, l);
  o.payload = t, n != null && (o.callback = n), t = mr(e, o, l), t !== null && (vs(t, e, l, r), ua(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = On(), l = xr(e), o = Fs(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = mr(e, o, l), t !== null && (vs(t, e, l, r), ua(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = On(), r = xr(e), l = Fs(n, r);
  l.tag = 2, t != null && (l.callback = t), t = mr(e, l, r), t !== null && (vs(t, e, r, n), ua(t, e, r));
} };
function zd(e, t, n, r, l, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !yo(n, r) || !yo(l, o) : !0;
}
function ap(e, t, n) {
  var r = !1, l = Nr, o = t.contextType;
  return typeof o == "object" && o !== null ? o = us(o) : (l = Hn(t) ? _r : In.current, r = t.contextTypes, o = (r = r != null) ? Ml(e, l) : Nr), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ei, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Hd(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ei.enqueueReplaceState(t, t.state, null);
}
function Ic(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Cu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = us(o) : (o = Hn(t) ? _r : In.current, l.context = Ml(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (bc(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && ei.enqueueReplaceState(l, l.state, null), Oa(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Al(e, t) {
  try {
    var n = "", r = t;
    do
      n += Bm(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Bi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Tc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var fg = typeof WeakMap == "function" ? WeakMap : Map;
function ip(e, t, n) {
  n = Fs(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Ba || (Ba = !0, Bc = r), Tc(e, t);
  }, n;
}
function cp(e, t, n) {
  n = Fs(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Tc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Tc(e, t), typeof r != "function" && (gr === null ? gr = /* @__PURE__ */ new Set([this]) : gr.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function Kd(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new fg();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Mg.bind(null, e, t, n), t.then(e, e));
}
function Vd(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Yd(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Fs(-1, 1), t.tag = 2, mr(n, t, 1))), n.lanes |= 1), e);
}
var pg = Ks.ReactCurrentOwner, Un = !1;
function Ln(e, t, n, r) {
  t.child = e === null ? _f(t, null, n, r) : Il(t, e.child, n, r);
}
function Xd(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return kl(t, l), r = Tu(e, t, n, r, o, l), n = Au(), e !== null && !Un ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Hs(e, t, l)) : (Jt && n && yu(t), t.flags |= 1, Ln(e, t, r, l), t.child);
}
function Gd(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Wu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, up(e, t, o, r, l)) : (e = ga(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : yo, n(a, r) && e.ref === t.ref) return Hs(e, t, l);
  }
  return t.flags |= 1, e = yr(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function up(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (yo(o, r) && e.ref === t.ref) if (Un = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Un = !0);
    else return t.lanes = e.lanes, Hs(e, t, l);
  }
  return Ac(e, t, n, r, l);
}
function dp(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Kt(ml, Jn), Jn |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Kt(ml, Jn), Jn |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Kt(ml, Jn), Jn |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Kt(ml, Jn), Jn |= r;
  return Ln(e, t, l, n), t.child;
}
function hp(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ac(e, t, n, r, l) {
  var o = Hn(n) ? _r : In.current;
  return o = Ml(t, o), kl(t, l), n = Tu(e, t, n, r, o, l), r = Au(), e !== null && !Un ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Hs(e, t, l)) : (Jt && r && yu(t), t.flags |= 1, Ln(e, t, n, l), t.child);
}
function Qd(e, t, n, r, l) {
  if (Hn(n)) {
    var o = !0;
    Ta(t);
  } else o = !1;
  if (kl(t, l), t.stateNode === null) fa(e, t), ap(t, n, r), Ic(t, n, r, l), r = !0;
  else if (e === null) {
    var a = t.stateNode, i = t.memoizedProps;
    a.props = i;
    var c = a.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = us(d) : (d = Hn(n) ? _r : In.current, d = Ml(t, d));
    var v = n.getDerivedStateFromProps, p = typeof v == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    p || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== r || c !== d) && Hd(t, a, r, d), sr = !1;
    var m = t.memoizedState;
    a.state = m, Oa(t, r, a, l), c = t.memoizedState, i !== r || m !== c || zn.current || sr ? (typeof v == "function" && (bc(t, n, v, r), c = t.memoizedState), (i = sr || zd(t, n, i, r, m, c, d)) ? (p || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), a.props = r, a.state = c, a.context = d, r = i) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, Bf(e, t), i = t.memoizedProps, d = t.type === t.elementType ? i : ps(t.type, i), a.props = d, p = t.pendingProps, m = a.context, c = n.contextType, typeof c == "object" && c !== null ? c = us(c) : (c = Hn(n) ? _r : In.current, c = Ml(t, c));
    var y = n.getDerivedStateFromProps;
    (v = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== p || m !== c) && Hd(t, a, r, c), sr = !1, m = t.memoizedState, a.state = m, Oa(t, r, a, l);
    var C = t.memoizedState;
    i !== p || m !== C || zn.current || sr ? (typeof y == "function" && (bc(t, n, y, r), C = t.memoizedState), (d = sr || zd(t, n, d, r, m, C, c) || !1) ? (v || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, C, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, C, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = C), a.props = r, a.state = C, a.context = c, r = d) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return $c(e, t, n, r, o, l);
}
function $c(e, t, n, r, l, o) {
  hp(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && Od(t, n, !1), Hs(e, t, o);
  r = t.stateNode, pg.current = t;
  var i = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = Il(t, e.child, null, o), t.child = Il(t, null, i, o)) : Ln(e, t, i, o), t.memoizedState = r.state, l && Od(t, n, !0), t.child;
}
function fp(e) {
  var t = e.stateNode;
  t.pendingContext ? Ld(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ld(e, t.context, !1), Su(e, t.containerInfo);
}
function Jd(e, t, n, r, l) {
  return bl(), Nu(l), t.flags |= 256, Ln(e, t, n, r), t.child;
}
var Rc = { dehydrated: null, treeContext: null, retryLane: 0 };
function Lc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function pp(e, t, n) {
  var r = t.pendingProps, l = en.current, o = !1, a = (t.flags & 128) !== 0, i;
  if ((i = a) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Kt(en, l & 1), e === null)
    return Sc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = si(a, r, 0, null), e = Dr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Lc(n), t.memoizedState = Rc, e) : Lu(t, a));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return mg(e, t, a, r, i, l, n);
  if (o) {
    o = r.fallback, a = t.mode, l = e.child, i = l.sibling;
    var c = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = yr(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? o = yr(i, o) : (o = Dr(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? Lc(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = Rc, r;
  }
  return o = e.child, e = o.sibling, r = yr(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Lu(e, t) {
  return t = si({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Jo(e, t, n, r) {
  return r !== null && Nu(r), Il(t, e.child, null, n), e = Lu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function mg(e, t, n, r, l, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Bi(Error(je(422))), Jo(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = si({ mode: "visible", children: r.children }, l, 0, null), o = Dr(o, l, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Il(t, e.child, null, a), t.child.memoizedState = Lc(a), t.memoizedState = Rc, o);
  if (!(t.mode & 1)) return Jo(e, t, a, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
    return r = i, o = Error(je(419)), r = Bi(o, r, void 0), Jo(e, t, a, r);
  }
  if (i = (a & e.childLanes) !== 0, Un || i) {
    if (r = Nn, r !== null) {
      switch (a & -a) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | a) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, zs(e, l), vs(r, e, l, -1));
    }
    return Bu(), r = Bi(Error(je(421))), Jo(e, t, a, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = bg.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, qn = pr(l.nextSibling), es = t, Jt = !0, gs = null, e !== null && (os[as++] = Ps, os[as++] = _s, os[as++] = Fr, Ps = e.id, _s = e.overflow, Fr = t), t = Lu(t, r.children), t.flags |= 4096, t);
}
function Zd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Mc(e.return, t, n);
}
function Wi(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function mp(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (Ln(e, t, r.children, n), r = en.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Zd(e, n, t);
      else if (e.tag === 19) Zd(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (Kt(en, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Da(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Wi(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Da(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Wi(t, !0, n, null, o);
      break;
    case "together":
      Wi(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function fa(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Hs(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Wr |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(je(153));
  if (t.child !== null) {
    for (e = t.child, n = yr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = yr(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function gg(e, t, n) {
  switch (t.tag) {
    case 3:
      fp(t), bl();
      break;
    case 5:
      Wf(t);
      break;
    case 1:
      Hn(t.type) && Ta(t);
      break;
    case 4:
      Su(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Kt(Ra, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Kt(en, en.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? pp(e, t, n) : (Kt(en, en.current & 1), e = Hs(e, t, n), e !== null ? e.sibling : null);
      Kt(en, en.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return mp(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Kt(en, en.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, dp(e, t, n);
  }
  return Hs(e, t, n);
}
var gp, Oc, xp, yp;
gp = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
Oc = function() {
};
xp = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, $r(Is.current);
    var o = null;
    switch (n) {
      case "input":
        l = sc(e, l), r = sc(e, r), o = [];
        break;
      case "select":
        l = nn({}, l, { value: void 0 }), r = nn({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = oc(e, l), r = oc(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ba);
    }
    ic(n, r);
    var a;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var i = l[d];
      for (a in i) i.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (uo.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var c = r[d];
      if (i = l != null ? l[d] : void 0, r.hasOwnProperty(d) && c !== i && (c != null || i != null)) if (d === "style") if (i) {
        for (a in i) !i.hasOwnProperty(a) || c && c.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
        for (a in c) c.hasOwnProperty(a) && i[a] !== c[a] && (n || (n = {}), n[a] = c[a]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, i = i ? i.__html : void 0, c != null && i !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (uo.hasOwnProperty(d) ? (c != null && d === "onScroll" && Yt("scroll", e), o || i === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
yp = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Kl(e, t) {
  if (!Jt) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function Mn(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function xg(e, t, n) {
  var r = t.pendingProps;
  switch (vu(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Mn(t), null;
    case 1:
      return Hn(t.type) && Ia(), Mn(t), null;
    case 3:
      return r = t.stateNode, Tl(), Xt(zn), Xt(In), bu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Go(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, gs !== null && (zc(gs), gs = null))), Oc(e, t), Mn(t), null;
    case 5:
      Mu(t);
      var l = $r(Eo.current);
      if (n = t.type, e !== null && t.stateNode != null) xp(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(je(166));
          return Mn(t), null;
        }
        if (e = $r(Is.current), Go(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ss] = t, r[ko] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Yt("cancel", r), Yt("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Yt("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < ql.length; l++) Yt(ql[l], r);
              break;
            case "source":
              Yt("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Yt(
                "error",
                r
              ), Yt("load", r);
              break;
            case "details":
              Yt("toggle", r);
              break;
            case "input":
              ad(r, o), Yt("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Yt("invalid", r);
              break;
            case "textarea":
              cd(r, o), Yt("invalid", r);
          }
          ic(n, o), l = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var i = o[a];
            a === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && Xo(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && Xo(
              r.textContent,
              i,
              e
            ), l = ["children", "" + i]) : uo.hasOwnProperty(a) && i != null && a === "onScroll" && Yt("scroll", r);
          }
          switch (n) {
            case "input":
              Bo(r), id(r, o, !0);
              break;
            case "textarea":
              Bo(r), ud(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ba);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          a = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Kh(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Ss] = t, e[ko] = r, gp(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = cc(n, r), n) {
              case "dialog":
                Yt("cancel", e), Yt("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Yt("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < ql.length; l++) Yt(ql[l], e);
                l = r;
                break;
              case "source":
                Yt("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                Yt(
                  "error",
                  e
                ), Yt("load", e), l = r;
                break;
              case "details":
                Yt("toggle", e), l = r;
                break;
              case "input":
                ad(e, r), l = sc(e, r), Yt("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = nn({}, r, { value: void 0 }), Yt("invalid", e);
                break;
              case "textarea":
                cd(e, r), l = oc(e, r), Yt("invalid", e);
                break;
              default:
                l = r;
            }
            ic(n, l), i = l;
            for (o in i) if (i.hasOwnProperty(o)) {
              var c = i[o];
              o === "style" ? Xh(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && Vh(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && ho(e, c) : typeof c == "number" && ho(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (uo.hasOwnProperty(o) ? c != null && o === "onScroll" && Yt("scroll", e) : c != null && ru(e, o, c, a));
            }
            switch (n) {
              case "input":
                Bo(e), id(e, r, !1);
                break;
              case "textarea":
                Bo(e), ud(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + vr(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? xl(e, !!r.multiple, o, !1) : r.defaultValue != null && xl(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ba);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return Mn(t), null;
    case 6:
      if (e && t.stateNode != null) yp(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(je(166));
        if (n = $r(Eo.current), $r(Is.current), Go(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ss] = t, (o = r.nodeValue !== n) && (e = es, e !== null)) switch (e.tag) {
            case 3:
              Xo(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Xo(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ss] = t, t.stateNode = r;
      }
      return Mn(t), null;
    case 13:
      if (Xt(en), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Jt && qn !== null && t.mode & 1 && !(t.flags & 128)) Df(), bl(), t.flags |= 98560, o = !1;
        else if (o = Go(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(je(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(je(317));
            o[Ss] = t;
          } else bl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Mn(t), o = !1;
        } else gs !== null && (zc(gs), gs = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || en.current & 1 ? yn === 0 && (yn = 3) : Bu())), t.updateQueue !== null && (t.flags |= 4), Mn(t), null);
    case 4:
      return Tl(), Oc(e, t), e === null && vo(t.stateNode.containerInfo), Mn(t), null;
    case 10:
      return Eu(t.type._context), Mn(t), null;
    case 17:
      return Hn(t.type) && Ia(), Mn(t), null;
    case 19:
      if (Xt(en), o = t.memoizedState, o === null) return Mn(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null) if (r) Kl(o, !1);
      else {
        if (yn !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = Da(e), a !== null) {
            for (t.flags |= 128, Kl(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Kt(en, en.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && an() > $l && (t.flags |= 128, r = !0, Kl(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Da(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Kl(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !Jt) return Mn(t), null;
        } else 2 * an() - o.renderingStartTime > $l && n !== 1073741824 && (t.flags |= 128, r = !0, Kl(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = an(), t.sibling = null, n = en.current, Kt(en, r ? n & 1 | 2 : n & 1), t) : (Mn(t), null);
    case 22:
    case 23:
      return Fu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Jn & 1073741824 && (Mn(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Mn(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(je(156, t.tag));
}
function yg(e, t) {
  switch (vu(t), t.tag) {
    case 1:
      return Hn(t.type) && Ia(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Tl(), Xt(zn), Xt(In), bu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Mu(t), null;
    case 13:
      if (Xt(en), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(je(340));
        bl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Xt(en), null;
    case 4:
      return Tl(), null;
    case 10:
      return Eu(t.type._context), null;
    case 22:
    case 23:
      return Fu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Zo = !1, bn = !1, vg = typeof WeakSet == "function" ? WeakSet : Set, Ke = null;
function pl(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    ln(e, t, r);
  }
  else n.current = null;
}
function Dc(e, t, n) {
  try {
    n();
  } catch (r) {
    ln(e, t, r);
  }
}
var qd = !1;
function Ng(e, t) {
  if (vc = Ca, e = Ef(), xu(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, o = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, o.nodeType;
        } catch {
          n = null;
          break e;
        }
        var a = 0, i = -1, c = -1, d = 0, v = 0, p = e, m = null;
        t: for (; ; ) {
          for (var y; p !== n || l !== 0 && p.nodeType !== 3 || (i = a + l), p !== o || r !== 0 && p.nodeType !== 3 || (c = a + r), p.nodeType === 3 && (a += p.nodeValue.length), (y = p.firstChild) !== null; )
            m = p, p = y;
          for (; ; ) {
            if (p === e) break t;
            if (m === n && ++d === l && (i = a), m === o && ++v === r && (c = a), (y = p.nextSibling) !== null) break;
            p = m, m = p.parentNode;
          }
          p = y;
        }
        n = i === -1 || c === -1 ? null : { start: i, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Nc = { focusedElem: e, selectionRange: n }, Ca = !1, Ke = t; Ke !== null; ) if (t = Ke, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Ke = e;
  else for (; Ke !== null; ) {
    t = Ke;
    try {
      var C = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (C !== null) {
            var j = C.memoizedProps, P = C.memoizedState, w = t.stateNode, g = w.getSnapshotBeforeUpdate(t.elementType === t.type ? j : ps(t.type, j), P);
            w.__reactInternalSnapshotBeforeUpdate = g;
          }
          break;
        case 3:
          var x = t.stateNode.containerInfo;
          x.nodeType === 1 ? x.textContent = "" : x.nodeType === 9 && x.documentElement && x.removeChild(x.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(je(163));
      }
    } catch (I) {
      ln(t, t.return, I);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Ke = e;
      break;
    }
    Ke = t.return;
  }
  return C = qd, qd = !1, C;
}
function ao(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Dc(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function ti(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Pc(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function vp(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, vp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ss], delete t[ko], delete t[Ec], delete t[ng], delete t[sg])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Np(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function eh(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Np(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function _c(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ba));
  else if (r !== 4 && (e = e.child, e !== null)) for (_c(e, t, n), e = e.sibling; e !== null; ) _c(e, t, n), e = e.sibling;
}
function Fc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Fc(e, t, n), e = e.sibling; e !== null; ) Fc(e, t, n), e = e.sibling;
}
var En = null, ms = !1;
function qs(e, t, n) {
  for (n = n.child; n !== null; ) kp(e, t, n), n = n.sibling;
}
function kp(e, t, n) {
  if (bs && typeof bs.onCommitFiberUnmount == "function") try {
    bs.onCommitFiberUnmount(Ya, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      bn || pl(n, t);
    case 6:
      var r = En, l = ms;
      En = null, qs(e, t, n), En = r, ms = l, En !== null && (ms ? (e = En, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : En.removeChild(n.stateNode));
      break;
    case 18:
      En !== null && (ms ? (e = En, n = n.stateNode, e.nodeType === 8 ? Li(e.parentNode, n) : e.nodeType === 1 && Li(e, n), go(e)) : Li(En, n.stateNode));
      break;
    case 4:
      r = En, l = ms, En = n.stateNode.containerInfo, ms = !0, qs(e, t, n), En = r, ms = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!bn && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && Dc(n, t, a), l = l.next;
        } while (l !== r);
      }
      qs(e, t, n);
      break;
    case 1:
      if (!bn && (pl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (i) {
        ln(n, t, i);
      }
      qs(e, t, n);
      break;
    case 21:
      qs(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (bn = (r = bn) || n.memoizedState !== null, qs(e, t, n), bn = r) : qs(e, t, n);
      break;
    default:
      qs(e, t, n);
  }
}
function th(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new vg()), t.forEach(function(r) {
      var l = Ig.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function fs(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, a = t, i = a;
      e: for (; i !== null; ) {
        switch (i.tag) {
          case 5:
            En = i.stateNode, ms = !1;
            break e;
          case 3:
            En = i.stateNode.containerInfo, ms = !0;
            break e;
          case 4:
            En = i.stateNode.containerInfo, ms = !0;
            break e;
        }
        i = i.return;
      }
      if (En === null) throw Error(je(160));
      kp(o, a, l), En = null, ms = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (d) {
      ln(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) wp(t, e), t = t.sibling;
}
function wp(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (fs(t, e), js(e), r & 4) {
        try {
          ao(3, e, e.return), ti(3, e);
        } catch (j) {
          ln(e, e.return, j);
        }
        try {
          ao(5, e, e.return);
        } catch (j) {
          ln(e, e.return, j);
        }
      }
      break;
    case 1:
      fs(t, e), js(e), r & 512 && n !== null && pl(n, n.return);
      break;
    case 5:
      if (fs(t, e), js(e), r & 512 && n !== null && pl(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          ho(l, "");
        } catch (j) {
          ln(e, e.return, j);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, i = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          i === "input" && o.type === "radio" && o.name != null && zh(l, o), cc(i, a);
          var d = cc(i, o);
          for (a = 0; a < c.length; a += 2) {
            var v = c[a], p = c[a + 1];
            v === "style" ? Xh(l, p) : v === "dangerouslySetInnerHTML" ? Vh(l, p) : v === "children" ? ho(l, p) : ru(l, v, p, d);
          }
          switch (i) {
            case "input":
              rc(l, o);
              break;
            case "textarea":
              Hh(l, o);
              break;
            case "select":
              var m = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var y = o.value;
              y != null ? xl(l, !!o.multiple, y, !1) : m !== !!o.multiple && (o.defaultValue != null ? xl(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : xl(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[ko] = o;
        } catch (j) {
          ln(e, e.return, j);
        }
      }
      break;
    case 6:
      if (fs(t, e), js(e), r & 4) {
        if (e.stateNode === null) throw Error(je(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (j) {
          ln(e, e.return, j);
        }
      }
      break;
    case 3:
      if (fs(t, e), js(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        go(t.containerInfo);
      } catch (j) {
        ln(e, e.return, j);
      }
      break;
    case 4:
      fs(t, e), js(e);
      break;
    case 13:
      fs(t, e), js(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Pu = an())), r & 4 && th(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (bn = (d = bn) || v, fs(t, e), bn = d) : fs(t, e), js(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (Ke = e, v = e.child; v !== null; ) {
          for (p = Ke = v; Ke !== null; ) {
            switch (m = Ke, y = m.child, m.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                ao(4, m, m.return);
                break;
              case 1:
                pl(m, m.return);
                var C = m.stateNode;
                if (typeof C.componentWillUnmount == "function") {
                  r = m, n = m.return;
                  try {
                    t = r, C.props = t.memoizedProps, C.state = t.memoizedState, C.componentWillUnmount();
                  } catch (j) {
                    ln(r, n, j);
                  }
                }
                break;
              case 5:
                pl(m, m.return);
                break;
              case 22:
                if (m.memoizedState !== null) {
                  sh(p);
                  continue;
                }
            }
            y !== null ? (y.return = m, Ke = y) : sh(p);
          }
          v = v.sibling;
        }
        e: for (v = null, p = e; ; ) {
          if (p.tag === 5) {
            if (v === null) {
              v = p;
              try {
                l = p.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (i = p.stateNode, c = p.memoizedProps.style, a = c != null && c.hasOwnProperty("display") ? c.display : null, i.style.display = Yh("display", a));
              } catch (j) {
                ln(e, e.return, j);
              }
            }
          } else if (p.tag === 6) {
            if (v === null) try {
              p.stateNode.nodeValue = d ? "" : p.memoizedProps;
            } catch (j) {
              ln(e, e.return, j);
            }
          } else if ((p.tag !== 22 && p.tag !== 23 || p.memoizedState === null || p === e) && p.child !== null) {
            p.child.return = p, p = p.child;
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            v === p && (v = null), p = p.return;
          }
          v === p && (v = null), p.sibling.return = p.return, p = p.sibling;
        }
      }
      break;
    case 19:
      fs(t, e), js(e), r & 4 && th(e);
      break;
    case 21:
      break;
    default:
      fs(
        t,
        e
      ), js(e);
  }
}
function js(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Np(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(je(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (ho(l, ""), r.flags &= -33);
          var o = eh(e);
          Fc(e, o, l);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, i = eh(e);
          _c(e, i, a);
          break;
        default:
          throw Error(je(161));
      }
    } catch (c) {
      ln(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function kg(e, t, n) {
  Ke = e, Ep(e);
}
function Ep(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Ke !== null; ) {
    var l = Ke, o = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || Zo;
      if (!a) {
        var i = l.alternate, c = i !== null && i.memoizedState !== null || bn;
        i = Zo;
        var d = bn;
        if (Zo = a, (bn = c) && !d) for (Ke = l; Ke !== null; ) a = Ke, c = a.child, a.tag === 22 && a.memoizedState !== null ? rh(l) : c !== null ? (c.return = a, Ke = c) : rh(l);
        for (; o !== null; ) Ke = o, Ep(o), o = o.sibling;
        Ke = l, Zo = i, bn = d;
      }
      nh(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, Ke = o) : nh(e);
  }
}
function nh(e) {
  for (; Ke !== null; ) {
    var t = Ke;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            bn || ti(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !bn) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : ps(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Bd(t, o, r);
            break;
          case 3:
            var a = t.updateQueue;
            if (a !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Bd(t, a, n);
            }
            break;
          case 5:
            var i = t.stateNode;
            if (n === null && t.flags & 4) {
              n = i;
              var c = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  c.autoFocus && n.focus();
                  break;
                case "img":
                  c.src && (n.src = c.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var d = t.alternate;
              if (d !== null) {
                var v = d.memoizedState;
                if (v !== null) {
                  var p = v.dehydrated;
                  p !== null && go(p);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(je(163));
        }
        bn || t.flags & 512 && Pc(t);
      } catch (m) {
        ln(t, t.return, m);
      }
    }
    if (t === e) {
      Ke = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, Ke = n;
      break;
    }
    Ke = t.return;
  }
}
function sh(e) {
  for (; Ke !== null; ) {
    var t = Ke;
    if (t === e) {
      Ke = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, Ke = n;
      break;
    }
    Ke = t.return;
  }
}
function rh(e) {
  for (; Ke !== null; ) {
    var t = Ke;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ti(4, t);
          } catch (c) {
            ln(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              ln(t, l, c);
            }
          }
          var o = t.return;
          try {
            Pc(t);
          } catch (c) {
            ln(t, o, c);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Pc(t);
          } catch (c) {
            ln(t, a, c);
          }
      }
    } catch (c) {
      ln(t, t.return, c);
    }
    if (t === e) {
      Ke = null;
      break;
    }
    var i = t.sibling;
    if (i !== null) {
      i.return = t.return, Ke = i;
      break;
    }
    Ke = t.return;
  }
}
var wg = Math.ceil, Fa = Ks.ReactCurrentDispatcher, Ou = Ks.ReactCurrentOwner, cs = Ks.ReactCurrentBatchConfig, At = 0, Nn = null, fn = null, jn = 0, Jn = 0, ml = wr(0), yn = 0, Mo = null, Wr = 0, ni = 0, Du = 0, io = null, Wn = null, Pu = 0, $l = 1 / 0, Ls = null, Ba = !1, Bc = null, gr = null, qo = !1, ur = null, Wa = 0, co = 0, Wc = null, pa = -1, ma = 0;
function On() {
  return At & 6 ? an() : pa !== -1 ? pa : pa = an();
}
function xr(e) {
  return e.mode & 1 ? At & 2 && jn !== 0 ? jn & -jn : lg.transition !== null ? (ma === 0 && (ma = of()), ma) : (e = Pt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : pf(e.type)), e) : 1;
}
function vs(e, t, n, r) {
  if (50 < co) throw co = 0, Wc = null, Error(je(185));
  Ao(e, n, r), (!(At & 2) || e !== Nn) && (e === Nn && (!(At & 2) && (ni |= n), yn === 4 && ar(e, jn)), Kn(e, r), n === 1 && At === 0 && !(t.mode & 1) && ($l = an() + 500, Za && Er()));
}
function Kn(e, t) {
  var n = e.callbackNode;
  l0(e, t);
  var r = ja(e, e === Nn ? jn : 0);
  if (r === 0) n !== null && fd(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && fd(n), t === 1) e.tag === 0 ? rg(lh.bind(null, e)) : Rf(lh.bind(null, e)), eg(function() {
      !(At & 6) && Er();
    }), n = null;
    else {
      switch (af(r)) {
        case 1:
          n = cu;
          break;
        case 4:
          n = rf;
          break;
        case 16:
          n = Ea;
          break;
        case 536870912:
          n = lf;
          break;
        default:
          n = Ea;
      }
      n = Ap(n, jp.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function jp(e, t) {
  if (pa = -1, ma = 0, At & 6) throw Error(je(327));
  var n = e.callbackNode;
  if (wl() && e.callbackNode !== n) return null;
  var r = ja(e, e === Nn ? jn : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ua(e, r);
  else {
    t = r;
    var l = At;
    At |= 2;
    var o = Sp();
    (Nn !== e || jn !== t) && (Ls = null, $l = an() + 500, Or(e, t));
    do
      try {
        Cg();
        break;
      } catch (i) {
        Cp(e, i);
      }
    while (!0);
    wu(), Fa.current = o, At = l, fn !== null ? t = 0 : (Nn = null, jn = 0, t = yn);
  }
  if (t !== 0) {
    if (t === 2 && (l = pc(e), l !== 0 && (r = l, t = Uc(e, l))), t === 1) throw n = Mo, Or(e, 0), ar(e, r), Kn(e, an()), n;
    if (t === 6) ar(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Eg(l) && (t = Ua(e, r), t === 2 && (o = pc(e), o !== 0 && (r = o, t = Uc(e, o))), t === 1)) throw n = Mo, Or(e, 0), ar(e, r), Kn(e, an()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(je(345));
        case 2:
          br(e, Wn, Ls);
          break;
        case 3:
          if (ar(e, r), (r & 130023424) === r && (t = Pu + 500 - an(), 10 < t)) {
            if (ja(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              On(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = wc(br.bind(null, e, Wn, Ls), t);
            break;
          }
          br(e, Wn, Ls);
          break;
        case 4:
          if (ar(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var a = 31 - ys(r);
            o = 1 << a, a = t[a], a > l && (l = a), r &= ~o;
          }
          if (r = l, r = an() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * wg(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = wc(br.bind(null, e, Wn, Ls), r);
            break;
          }
          br(e, Wn, Ls);
          break;
        case 5:
          br(e, Wn, Ls);
          break;
        default:
          throw Error(je(329));
      }
    }
  }
  return Kn(e, an()), e.callbackNode === n ? jp.bind(null, e) : null;
}
function Uc(e, t) {
  var n = io;
  return e.current.memoizedState.isDehydrated && (Or(e, t).flags |= 256), e = Ua(e, t), e !== 2 && (t = Wn, Wn = n, t !== null && zc(t)), e;
}
function zc(e) {
  Wn === null ? Wn = e : Wn.push.apply(Wn, e);
}
function Eg(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Ns(o(), l)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function ar(e, t) {
  for (t &= ~Du, t &= ~ni, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - ys(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function lh(e) {
  if (At & 6) throw Error(je(327));
  wl();
  var t = ja(e, 0);
  if (!(t & 1)) return Kn(e, an()), null;
  var n = Ua(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = pc(e);
    r !== 0 && (t = r, n = Uc(e, r));
  }
  if (n === 1) throw n = Mo, Or(e, 0), ar(e, t), Kn(e, an()), n;
  if (n === 6) throw Error(je(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, br(e, Wn, Ls), Kn(e, an()), null;
}
function _u(e, t) {
  var n = At;
  At |= 1;
  try {
    return e(t);
  } finally {
    At = n, At === 0 && ($l = an() + 500, Za && Er());
  }
}
function Ur(e) {
  ur !== null && ur.tag === 0 && !(At & 6) && wl();
  var t = At;
  At |= 1;
  var n = cs.transition, r = Pt;
  try {
    if (cs.transition = null, Pt = 1, e) return e();
  } finally {
    Pt = r, cs.transition = n, At = t, !(At & 6) && Er();
  }
}
function Fu() {
  Jn = ml.current, Xt(ml);
}
function Or(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, q0(n)), fn !== null) for (n = fn.return; n !== null; ) {
    var r = n;
    switch (vu(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Ia();
        break;
      case 3:
        Tl(), Xt(zn), Xt(In), bu();
        break;
      case 5:
        Mu(r);
        break;
      case 4:
        Tl();
        break;
      case 13:
        Xt(en);
        break;
      case 19:
        Xt(en);
        break;
      case 10:
        Eu(r.type._context);
        break;
      case 22:
      case 23:
        Fu();
    }
    n = n.return;
  }
  if (Nn = e, fn = e = yr(e.current, null), jn = Jn = t, yn = 0, Mo = null, Du = ni = Wr = 0, Wn = io = null, Ar !== null) {
    for (t = 0; t < Ar.length; t++) if (n = Ar[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var a = o.next;
        o.next = l, r.next = a;
      }
      n.pending = r;
    }
    Ar = null;
  }
  return e;
}
function Cp(e, t) {
  do {
    var n = fn;
    try {
      if (wu(), da.current = _a, Pa) {
        for (var r = tn.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Pa = !1;
      }
      if (Br = 0, vn = xn = tn = null, oo = !1, jo = 0, Ou.current = null, n === null || n.return === null) {
        yn = 1, Mo = t, fn = null;
        break;
      }
      e: {
        var o = e, a = n.return, i = n, c = t;
        if (t = jn, i.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, v = i, p = v.tag;
          if (!(v.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var m = v.alternate;
            m ? (v.updateQueue = m.updateQueue, v.memoizedState = m.memoizedState, v.lanes = m.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var y = Vd(a);
          if (y !== null) {
            y.flags &= -257, Yd(y, a, i, o, t), y.mode & 1 && Kd(o, d, t), t = y, c = d;
            var C = t.updateQueue;
            if (C === null) {
              var j = /* @__PURE__ */ new Set();
              j.add(c), t.updateQueue = j;
            } else C.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              Kd(o, d, t), Bu();
              break e;
            }
            c = Error(je(426));
          }
        } else if (Jt && i.mode & 1) {
          var P = Vd(a);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256), Yd(P, a, i, o, t), Nu(Al(c, i));
            break e;
          }
        }
        o = c = Al(c, i), yn !== 4 && (yn = 2), io === null ? io = [o] : io.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var w = ip(o, c, t);
              Fd(o, w);
              break e;
            case 1:
              i = c;
              var g = o.type, x = o.stateNode;
              if (!(o.flags & 128) && (typeof g.getDerivedStateFromError == "function" || x !== null && typeof x.componentDidCatch == "function" && (gr === null || !gr.has(x)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var I = cp(o, i, t);
                Fd(o, I);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      bp(n);
    } catch (S) {
      t = S, fn === n && n !== null && (fn = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Sp() {
  var e = Fa.current;
  return Fa.current = _a, e === null ? _a : e;
}
function Bu() {
  (yn === 0 || yn === 3 || yn === 2) && (yn = 4), Nn === null || !(Wr & 268435455) && !(ni & 268435455) || ar(Nn, jn);
}
function Ua(e, t) {
  var n = At;
  At |= 2;
  var r = Sp();
  (Nn !== e || jn !== t) && (Ls = null, Or(e, t));
  do
    try {
      jg();
      break;
    } catch (l) {
      Cp(e, l);
    }
  while (!0);
  if (wu(), At = n, Fa.current = r, fn !== null) throw Error(je(261));
  return Nn = null, jn = 0, yn;
}
function jg() {
  for (; fn !== null; ) Mp(fn);
}
function Cg() {
  for (; fn !== null && !Qm(); ) Mp(fn);
}
function Mp(e) {
  var t = Tp(e.alternate, e, Jn);
  e.memoizedProps = e.pendingProps, t === null ? bp(e) : fn = t, Ou.current = null;
}
function bp(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = yg(n, t), n !== null) {
        n.flags &= 32767, fn = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        yn = 6, fn = null;
        return;
      }
    } else if (n = xg(n, t, Jn), n !== null) {
      fn = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      fn = t;
      return;
    }
    fn = t = e;
  } while (t !== null);
  yn === 0 && (yn = 5);
}
function br(e, t, n) {
  var r = Pt, l = cs.transition;
  try {
    cs.transition = null, Pt = 1, Sg(e, t, n, r);
  } finally {
    cs.transition = l, Pt = r;
  }
  return null;
}
function Sg(e, t, n, r) {
  do
    wl();
  while (ur !== null);
  if (At & 6) throw Error(je(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(je(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (o0(e, o), e === Nn && (fn = Nn = null, jn = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || qo || (qo = !0, Ap(Ea, function() {
    return wl(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = cs.transition, cs.transition = null;
    var a = Pt;
    Pt = 1;
    var i = At;
    At |= 4, Ou.current = null, Ng(e, n), wp(n, e), V0(Nc), Ca = !!vc, Nc = vc = null, e.current = n, kg(n), Jm(), At = i, Pt = a, cs.transition = o;
  } else e.current = n;
  if (qo && (qo = !1, ur = e, Wa = l), o = e.pendingLanes, o === 0 && (gr = null), e0(n.stateNode), Kn(e, an()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Ba) throw Ba = !1, e = Bc, Bc = null, e;
  return Wa & 1 && e.tag !== 0 && wl(), o = e.pendingLanes, o & 1 ? e === Wc ? co++ : (co = 0, Wc = e) : co = 0, Er(), null;
}
function wl() {
  if (ur !== null) {
    var e = af(Wa), t = cs.transition, n = Pt;
    try {
      if (cs.transition = null, Pt = 16 > e ? 16 : e, ur === null) var r = !1;
      else {
        if (e = ur, ur = null, Wa = 0, At & 6) throw Error(je(331));
        var l = At;
        for (At |= 4, Ke = e.current; Ke !== null; ) {
          var o = Ke, a = o.child;
          if (Ke.flags & 16) {
            var i = o.deletions;
            if (i !== null) {
              for (var c = 0; c < i.length; c++) {
                var d = i[c];
                for (Ke = d; Ke !== null; ) {
                  var v = Ke;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ao(8, v, o);
                  }
                  var p = v.child;
                  if (p !== null) p.return = v, Ke = p;
                  else for (; Ke !== null; ) {
                    v = Ke;
                    var m = v.sibling, y = v.return;
                    if (vp(v), v === d) {
                      Ke = null;
                      break;
                    }
                    if (m !== null) {
                      m.return = y, Ke = m;
                      break;
                    }
                    Ke = y;
                  }
                }
              }
              var C = o.alternate;
              if (C !== null) {
                var j = C.child;
                if (j !== null) {
                  C.child = null;
                  do {
                    var P = j.sibling;
                    j.sibling = null, j = P;
                  } while (j !== null);
                }
              }
              Ke = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, Ke = a;
          else e: for (; Ke !== null; ) {
            if (o = Ke, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                ao(9, o, o.return);
            }
            var w = o.sibling;
            if (w !== null) {
              w.return = o.return, Ke = w;
              break e;
            }
            Ke = o.return;
          }
        }
        var g = e.current;
        for (Ke = g; Ke !== null; ) {
          a = Ke;
          var x = a.child;
          if (a.subtreeFlags & 2064 && x !== null) x.return = a, Ke = x;
          else e: for (a = g; Ke !== null; ) {
            if (i = Ke, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  ti(9, i);
              }
            } catch (S) {
              ln(i, i.return, S);
            }
            if (i === a) {
              Ke = null;
              break e;
            }
            var I = i.sibling;
            if (I !== null) {
              I.return = i.return, Ke = I;
              break e;
            }
            Ke = i.return;
          }
        }
        if (At = l, Er(), bs && typeof bs.onPostCommitFiberRoot == "function") try {
          bs.onPostCommitFiberRoot(Ya, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      Pt = n, cs.transition = t;
    }
  }
  return !1;
}
function oh(e, t, n) {
  t = Al(n, t), t = ip(e, t, 1), e = mr(e, t, 1), t = On(), e !== null && (Ao(e, 1, t), Kn(e, t));
}
function ln(e, t, n) {
  if (e.tag === 3) oh(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      oh(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (gr === null || !gr.has(r))) {
        e = Al(n, e), e = cp(t, e, 1), t = mr(t, e, 1), e = On(), t !== null && (Ao(t, 1, e), Kn(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Mg(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = On(), e.pingedLanes |= e.suspendedLanes & n, Nn === e && (jn & n) === n && (yn === 4 || yn === 3 && (jn & 130023424) === jn && 500 > an() - Pu ? Or(e, 0) : Du |= n), Kn(e, t);
}
function Ip(e, t) {
  t === 0 && (e.mode & 1 ? (t = zo, zo <<= 1, !(zo & 130023424) && (zo = 4194304)) : t = 1);
  var n = On();
  e = zs(e, t), e !== null && (Ao(e, t, n), Kn(e, n));
}
function bg(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Ip(e, n);
}
function Ig(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(je(314));
  }
  r !== null && r.delete(t), Ip(e, n);
}
var Tp;
Tp = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || zn.current) Un = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Un = !1, gg(e, t, n);
    Un = !!(e.flags & 131072);
  }
  else Un = !1, Jt && t.flags & 1048576 && Lf(t, $a, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      fa(e, t), e = t.pendingProps;
      var l = Ml(t, In.current);
      kl(t, n), l = Tu(null, t, r, e, l, n);
      var o = Au();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Hn(r) ? (o = !0, Ta(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Cu(t), l.updater = ei, t.stateNode = l, l._reactInternals = t, Ic(t, r, e, n), t = $c(null, t, r, !0, o, n)) : (t.tag = 0, Jt && o && yu(t), Ln(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (fa(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Ag(r), e = ps(r, e), l) {
          case 0:
            t = Ac(null, t, r, e, n);
            break e;
          case 1:
            t = Qd(null, t, r, e, n);
            break e;
          case 11:
            t = Xd(null, t, r, e, n);
            break e;
          case 14:
            t = Gd(null, t, r, ps(r.type, e), n);
            break e;
        }
        throw Error(je(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ps(r, l), Ac(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ps(r, l), Qd(e, t, r, l, n);
    case 3:
      e: {
        if (fp(t), e === null) throw Error(je(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Bf(e, t), Oa(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = Al(Error(je(423)), t), t = Jd(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Al(Error(je(424)), t), t = Jd(e, t, r, n, l);
          break e;
        } else for (qn = pr(t.stateNode.containerInfo.firstChild), es = t, Jt = !0, gs = null, n = _f(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (bl(), r === l) {
            t = Hs(e, t, n);
            break e;
          }
          Ln(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Wf(t), e === null && Sc(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = l.children, kc(r, l) ? a = null : o !== null && kc(r, o) && (t.flags |= 32), hp(e, t), Ln(e, t, a, n), t.child;
    case 6:
      return e === null && Sc(t), null;
    case 13:
      return pp(e, t, n);
    case 4:
      return Su(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Il(t, null, r, n) : Ln(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ps(r, l), Xd(e, t, r, l, n);
    case 7:
      return Ln(e, t, t.pendingProps, n), t.child;
    case 8:
      return Ln(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Ln(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, a = l.value, Kt(Ra, r._currentValue), r._currentValue = a, o !== null) if (Ns(o.value, a)) {
          if (o.children === l.children && !zn.current) {
            t = Hs(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var i = o.dependencies;
          if (i !== null) {
            a = o.child;
            for (var c = i.firstContext; c !== null; ) {
              if (c.context === r) {
                if (o.tag === 1) {
                  c = Fs(-1, n & -n), c.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var v = d.pending;
                    v === null ? c.next = c : (c.next = v.next, v.next = c), d.pending = c;
                  }
                }
                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Mc(
                  o.return,
                  n,
                  t
                ), i.lanes |= n;
                break;
              }
              c = c.next;
            }
          } else if (o.tag === 10) a = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (a = o.return, a === null) throw Error(je(341));
            a.lanes |= n, i = a.alternate, i !== null && (i.lanes |= n), Mc(a, n, t), a = o.sibling;
          } else a = o.child;
          if (a !== null) a.return = o;
          else for (a = o; a !== null; ) {
            if (a === t) {
              a = null;
              break;
            }
            if (o = a.sibling, o !== null) {
              o.return = a.return, a = o;
              break;
            }
            a = a.return;
          }
          o = a;
        }
        Ln(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, kl(t, n), l = us(l), r = r(l), t.flags |= 1, Ln(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = ps(r, t.pendingProps), l = ps(r.type, l), Gd(e, t, r, l, n);
    case 15:
      return up(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ps(r, l), fa(e, t), t.tag = 1, Hn(r) ? (e = !0, Ta(t)) : e = !1, kl(t, n), ap(t, r, l), Ic(t, r, l, n), $c(null, t, r, !0, e, n);
    case 19:
      return mp(e, t, n);
    case 22:
      return dp(e, t, n);
  }
  throw Error(je(156, t.tag));
};
function Ap(e, t) {
  return sf(e, t);
}
function Tg(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function is(e, t, n, r) {
  return new Tg(e, t, n, r);
}
function Wu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Ag(e) {
  if (typeof e == "function") return Wu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ou) return 11;
    if (e === au) return 14;
  }
  return 2;
}
function yr(e, t) {
  var n = e.alternate;
  return n === null ? (n = is(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function ga(e, t, n, r, l, o) {
  var a = 2;
  if (r = e, typeof e == "function") Wu(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else e: switch (e) {
    case ll:
      return Dr(n.children, l, o, t);
    case lu:
      a = 8, l |= 8;
      break;
    case qi:
      return e = is(12, n, t, l | 2), e.elementType = qi, e.lanes = o, e;
    case ec:
      return e = is(13, n, t, l), e.elementType = ec, e.lanes = o, e;
    case tc:
      return e = is(19, n, t, l), e.elementType = tc, e.lanes = o, e;
    case Bh:
      return si(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case _h:
          a = 10;
          break e;
        case Fh:
          a = 9;
          break e;
        case ou:
          a = 11;
          break e;
        case au:
          a = 14;
          break e;
        case nr:
          a = 16, r = null;
          break e;
      }
      throw Error(je(130, e == null ? e : typeof e, ""));
  }
  return t = is(a, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Dr(e, t, n, r) {
  return e = is(7, e, r, t), e.lanes = n, e;
}
function si(e, t, n, r) {
  return e = is(22, e, r, t), e.elementType = Bh, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Ui(e, t, n) {
  return e = is(6, e, null, t), e.lanes = n, e;
}
function zi(e, t, n) {
  return t = is(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function $g(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ei(0), this.expirationTimes = Ei(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ei(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Uu(e, t, n, r, l, o, a, i, c) {
  return e = new $g(e, t, n, i, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = is(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Cu(o), e;
}
function Rg(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: rl, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function $p(e) {
  if (!e) return Nr;
  e = e._reactInternals;
  e: {
    if (Hr(e) !== e || e.tag !== 1) throw Error(je(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Hn(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(je(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Hn(n)) return $f(e, n, t);
  }
  return t;
}
function Rp(e, t, n, r, l, o, a, i, c) {
  return e = Uu(n, r, !0, e, l, o, a, i, c), e.context = $p(null), n = e.current, r = On(), l = xr(n), o = Fs(r, l), o.callback = t ?? null, mr(n, o, l), e.current.lanes = l, Ao(e, l, r), Kn(e, r), e;
}
function ri(e, t, n, r) {
  var l = t.current, o = On(), a = xr(l);
  return n = $p(n), t.context === null ? t.context = n : t.pendingContext = n, t = Fs(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = mr(l, t, a), e !== null && (vs(e, l, a, o), ua(e, l, a)), a;
}
function za(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ah(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function zu(e, t) {
  ah(e, t), (e = e.alternate) && ah(e, t);
}
function Lg() {
  return null;
}
var Lp = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Hu(e) {
  this._internalRoot = e;
}
li.prototype.render = Hu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(je(409));
  ri(e, t, null, null);
};
li.prototype.unmount = Hu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ur(function() {
      ri(null, e, null, null);
    }), t[Us] = null;
  }
};
function li(e) {
  this._internalRoot = e;
}
li.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = df();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < or.length && t !== 0 && t < or[n].priority; n++) ;
    or.splice(n, 0, e), n === 0 && ff(e);
  }
};
function Ku(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function oi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ih() {
}
function Og(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = za(a);
        o.call(d);
      };
    }
    var a = Rp(t, r, e, 0, null, !1, !1, "", ih);
    return e._reactRootContainer = a, e[Us] = a.current, vo(e.nodeType === 8 ? e.parentNode : e), Ur(), a;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var d = za(c);
      i.call(d);
    };
  }
  var c = Uu(e, 0, !1, null, null, !1, !1, "", ih);
  return e._reactRootContainer = c, e[Us] = c.current, vo(e.nodeType === 8 ? e.parentNode : e), Ur(function() {
    ri(t, c, n, r);
  }), c;
}
function ai(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof l == "function") {
      var i = l;
      l = function() {
        var c = za(a);
        i.call(c);
      };
    }
    ri(t, a, e, l);
  } else a = Og(n, t, e, l, r);
  return za(a);
}
cf = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Zl(t.pendingLanes);
        n !== 0 && (uu(t, n | 1), Kn(t, an()), !(At & 6) && ($l = an() + 500, Er()));
      }
      break;
    case 13:
      Ur(function() {
        var r = zs(e, 1);
        if (r !== null) {
          var l = On();
          vs(r, e, 1, l);
        }
      }), zu(e, 1);
  }
};
du = function(e) {
  if (e.tag === 13) {
    var t = zs(e, 134217728);
    if (t !== null) {
      var n = On();
      vs(t, e, 134217728, n);
    }
    zu(e, 134217728);
  }
};
uf = function(e) {
  if (e.tag === 13) {
    var t = xr(e), n = zs(e, t);
    if (n !== null) {
      var r = On();
      vs(n, e, t, r);
    }
    zu(e, t);
  }
};
df = function() {
  return Pt;
};
hf = function(e, t) {
  var n = Pt;
  try {
    return Pt = e, t();
  } finally {
    Pt = n;
  }
};
dc = function(e, t, n) {
  switch (t) {
    case "input":
      if (rc(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Ja(r);
            if (!l) throw Error(je(90));
            Uh(r), rc(r, l);
          }
        }
      }
      break;
    case "textarea":
      Hh(e, n);
      break;
    case "select":
      t = n.value, t != null && xl(e, !!n.multiple, t, !1);
  }
};
Jh = _u;
Zh = Ur;
var Dg = { usingClientEntryPoint: !1, Events: [Ro, cl, Ja, Gh, Qh, _u] }, Vl = { findFiberByHostInstance: Tr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Pg = { bundleType: Vl.bundleType, version: Vl.version, rendererPackageName: Vl.rendererPackageName, rendererConfig: Vl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ks.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = tf(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Vl.findFiberByHostInstance || Lg, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ea = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ea.isDisabled && ea.supportsFiber) try {
    Ya = ea.inject(Pg), bs = ea;
  } catch {
  }
}
ns.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dg;
ns.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ku(t)) throw Error(je(200));
  return Rg(e, t, null, n);
};
ns.createRoot = function(e, t) {
  if (!Ku(e)) throw Error(je(299));
  var n = !1, r = "", l = Lp;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Uu(e, 1, !1, null, null, n, !1, r, l), e[Us] = t.current, vo(e.nodeType === 8 ? e.parentNode : e), new Hu(t);
};
ns.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(je(188)) : (e = Object.keys(e).join(","), Error(je(268, e)));
  return e = tf(t), e = e === null ? null : e.stateNode, e;
};
ns.flushSync = function(e) {
  return Ur(e);
};
ns.hydrate = function(e, t, n) {
  if (!oi(t)) throw Error(je(200));
  return ai(null, e, t, !0, n);
};
ns.hydrateRoot = function(e, t, n) {
  if (!Ku(e)) throw Error(je(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", a = Lp;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = Rp(t, null, e, 1, n ?? null, l, !1, o, a), e[Us] = t.current, vo(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new li(t);
};
ns.render = function(e, t, n) {
  if (!oi(t)) throw Error(je(200));
  return ai(null, e, t, !1, n);
};
ns.unmountComponentAtNode = function(e) {
  if (!oi(e)) throw Error(je(40));
  return e._reactRootContainer ? (Ur(function() {
    ai(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Us] = null;
    });
  }), !0) : !1;
};
ns.unstable_batchedUpdates = _u;
ns.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!oi(n)) throw Error(je(200));
  if (e == null || e._reactInternals === void 0) throw Error(je(38));
  return ai(e, t, n, !1, r);
};
ns.version = "18.3.1-next-f1338f8080-20240426";
function Op() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Op);
    } catch (e) {
      console.error(e);
    }
}
Op(), Lh.exports = ns;
var Ts = Lh.exports, ch = Ts;
va.createRoot = ch.createRoot, va.hydrateRoot = ch.hydrateRoot;
var Dp = { exports: {} }, ii = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _g = u, Fg = Symbol.for("react.element"), Bg = Symbol.for("react.fragment"), Wg = Object.prototype.hasOwnProperty, Ug = _g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, zg = { key: !0, ref: !0, __self: !0, __source: !0 };
function Pp(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) Wg.call(t, r) && !zg.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Fg, type: e, key: o, ref: a, props: l, _owner: Ug.current };
}
ii.Fragment = Bg;
ii.jsx = Pp;
ii.jsxs = Pp;
Dp.exports = ii;
var s = Dp.exports;
let ir = [], _p = 120, Hi = !1;
async function Hg() {
  if (!Hi) {
    try {
      const e = await fetch("/api/v1/settings/dst-transitions");
      if (e.ok) {
        const t = await e.json(), n = Array.isArray(t) ? t : t.transitions || t.manualDstTransitions || [];
        if (n.length > 0) {
          Kg(n), Hi = !0;
          return;
        }
      }
    } catch (e) {
      console.warn("[DST Engine] Failed to fetch server transitions:", e);
    }
    Hi = !0;
  }
}
function Kg(e) {
  Array.isArray(e) && (ir = e.map((t) => ({
    switchEpochMs: new Date(t.switchUtc || t.SwitchUtc).getTime(),
    offsetBeforeMin: t.offsetBeforeMinutes ?? t.OffsetBeforeMinutes,
    offsetAfterMin: t.offsetAfterMinutes ?? t.OffsetAfterMinutes,
    labelBefore: t.labelBefore || t.LabelBefore || "IDT",
    labelAfter: t.labelAfter || t.LabelAfter || "IST",
    description: t.description || t.Description || "DST Transition"
  })).sort((t, n) => t.switchEpochMs - n.switchEpochMs));
}
function Bs(e) {
  for (let t = ir.length - 1; t >= 0; t--) {
    const n = ir[t];
    if (e >= n.switchEpochMs)
      return { offsetMin: n.offsetAfterMin, label: n.labelAfter };
  }
  return ir.length > 0 ? {
    offsetMin: ir[0].offsetBeforeMin,
    label: ir[0].labelBefore
  } : { offsetMin: _p, label: "LOCAL" };
}
function Fp(e, t) {
  return ir.filter(
    (n) => n.switchEpochMs >= e && n.switchEpochMs <= t
  );
}
function Ha(e, t) {
  if (!e || !t) return { isAmbiguous: !1 };
  const [n, r, l] = e.split("-").map(Number), [o, a, i] = t.split(":").map(Number);
  for (const c of ir)
    if (c.offsetBeforeMin > c.offsetAfterMin) {
      const d = (c.offsetBeforeMin - c.offsetAfterMin) / 60, v = new Date(c.switchEpochMs + c.offsetAfterMin * 6e4);
      if (v.getUTCFullYear() === n && v.getUTCMonth() + 1 === r && v.getUTCDate() === l) {
        const p = v.getUTCHours();
        if (o >= p && o < p + d)
          return {
            isAmbiguous: !0,
            transition: c,
            firstOccurrenceEpoch: new Date(Date.UTC(n, r - 1, l, o, a, i)).getTime() - c.offsetBeforeMin * 6e4,
            secondOccurrenceEpoch: new Date(Date.UTC(n, r - 1, l, o, a, i)).getTime() - c.offsetAfterMin * 6e4
          };
      }
    }
  return { isAmbiguous: !1 };
}
function Vg(e) {
  const { offsetMin: t, label: n } = Bs(e), r = e + t * 60 * 1e3, l = new Date(r);
  return {
    year: l.getUTCFullYear(),
    month: l.getUTCMonth() + 1,
    day: l.getUTCDate(),
    hour: l.getUTCHours(),
    minute: l.getUTCMinutes(),
    second: l.getUTCSeconds(),
    offsetMin: t,
    label: n
  };
}
function Yg(e) {
  const t = new Date(e);
  return {
    year: t.getUTCFullYear(),
    month: t.getUTCMonth() + 1,
    day: t.getUTCDate(),
    hour: t.getUTCHours(),
    minute: t.getUTCMinutes(),
    second: t.getUTCSeconds(),
    offsetMin: 0,
    label: "UTC"
  };
}
function Rr(e, t = "LOCAL") {
  return t === "UTC" ? Yg(e) : Vg(e);
}
function uh(e, t = "LOCAL") {
  const n = (l) => String(l).padStart(2, "0"), r = Rr(e, t);
  return {
    dateStr: `${r.year}-${n(r.month)}-${n(r.day)}`,
    timeStr: `${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    fullStr: `${r.year}-${n(r.month)}-${n(r.day)}T${n(r.hour)}:${n(r.minute)}:${n(r.second)}`,
    label: r.label,
    offsetMin: r.offsetMin
  };
}
function Hc(e, t, n = "LOCAL", r = 1) {
  if (!e) return null;
  const [l, o, a] = e.split("-").map(Number), [i, c, d = 0] = (t || "00:00:00").split(":").map(Number);
  if (isNaN(l) || isNaN(o) || isNaN(a) || isNaN(i) || isNaN(c)) return null;
  const v = Date.UTC(l, o - 1, a, i, c, d);
  if (n === "UTC")
    return v;
  const p = Ha(e, t);
  if (p.isAmbiguous)
    return r === 2 ? p.secondOccurrenceEpoch : p.firstOccurrenceEpoch;
  const m = v - _p * 6e4, { offsetMin: y } = Bs(m);
  let C = v - y * 6e4;
  const j = Bs(C);
  return j.offsetMin !== y && (C = v - j.offsetMin * 6e4), C;
}
function Xg({
  timeRange: e,
  baseEpochMs: t,
  timeMode: n,
  setTimeMode: r,
  activeStationId: l,
  hideBackToGrid: o,
  onResetActiveStation: a,
  onOpenRangeModal: i,
  onOpenBookmarksModal: c,
  onOpenHelpModal: d,
  onToggleDrawer: v,
  isInitialSetup: p = !1,
  selectedCount: m = 0,
  totalCount: y = 0,
  onResetStudio: C
}) {
  const [j, P] = u.useState(!1);
  u.useEffect(() => {
    if (!j) return;
    const S = (M) => {
      M.key === "Escape" && P(!1);
    };
    return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S);
  }, [j]);
  const w = u.useMemo(() => {
    const S = t || (e != null && e.startEpochMs ? e.startEpochMs : e != null && e.start ? new Date(String(e.start).replace(" ", "T")).getTime() : 0), M = (e == null ? void 0 : e.durationMs) || 0;
    if (!S || M <= 0) return "-- ➔ --";
    const h = S + M, $ = (X) => String(X).padStart(2, "0"), E = Rr(S, n), N = Rr(h, n), _ = `${E.year}-${$(E.month)}-${$(E.day)}`, U = `${$(E.hour)}:${$(E.minute)}:${$(E.second)}`, R = `${N.year}-${$(N.month)}-${$(N.day)}`, F = `${$(N.hour)}:${$(N.minute)}:${$(N.second)}`, oe = n === "UTC" ? " (UTC)" : E.label ? ` (${E.label})` : "", re = _ === R ? F : `${R} ${F}`;
    return `${_} ${U} ➔ ${re}${oe}`;
  }, [t, e == null ? void 0 : e.startEpochMs, e == null ? void 0 : e.start, e == null ? void 0 : e.durationMs, n]), g = u.useMemo(() => {
    const S = Math.floor(((e == null ? void 0 : e.durationMs) || 0) / 6e4);
    if (S >= 1440) {
      const M = (S / 1440).toFixed(1);
      return `(${M.endsWith(".0") ? parseInt(M, 10) : M}d / ${S}m Total)`;
    }
    return `(${S}m Total)`;
  }, [e == null ? void 0 : e.durationMs]), x = () => {
    P(!1), C == null || C();
  }, I = j ? /* @__PURE__ */ s.jsx("div", { className: "studio-reset-modal-backdrop", onClick: () => P(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "studio-reset-modal-card", onClick: (S) => S.stopPropagation(), dir: "ltr", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "reset-modal-header", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "reset-header-title-group", children: [
        /* @__PURE__ */ s.jsx("div", { className: "warning-icon-badge", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: [
          /* @__PURE__ */ s.jsx("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
          /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
          /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
        ] }) }),
        /* @__PURE__ */ s.jsxs("div", { className: "reset-header-text", children: [
          /* @__PURE__ */ s.jsx("h3", { children: "RESET STUDIO SESSION" }),
          /* @__PURE__ */ s.jsx("span", { className: "reset-header-sub", children: "WORKSPACE CACHE CLEAR" })
        ] })
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-modal-close",
          onClick: () => P(!1),
          title: "Close (ESC)",
          children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "reset-modal-body", children: [
      /* @__PURE__ */ s.jsx("p", { className: "reset-modal-lead", children: "Are you sure you want to reset the entire studio workspace?" }),
      /* @__PURE__ */ s.jsxs("ul", { className: "reset-impact-list", children: [
        /* @__PURE__ */ s.jsx("li", { children: "All station selections and multicam views will be unpinned" }),
        /* @__PURE__ */ s.jsx("li", { children: "Cut In / Out points and playhead timeline markers will reset" }),
        /* @__PURE__ */ s.jsx("li", { children: "Playback speeds, zoom parameters, and local caches will clear" })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "reset-modal-actions", children: [
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: () => P(!1), children: "CANCEL" }),
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-confirm-danger", onClick: x, children: [
        /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", width: "14", height: "14", children: [
          /* @__PURE__ */ s.jsx("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
          /* @__PURE__ */ s.jsx("path", { d: "M3 3v5h5" })
        ] }),
        "YES, RESET EVERYTHING"
      ] })
    ] })
  ] }) }) : null;
  return /* @__PURE__ */ s.jsxs("div", { className: "studio-top-scope-bar", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "scope-info-group", children: [
      /* @__PURE__ */ s.jsx("span", { className: "scope-tag", children: "MISSION SCOPE" }),
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "scope-time-badge clickable",
          onClick: i,
          title: "Click to modify mission time window",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: "time-string", children: w }),
            /* @__PURE__ */ s.jsx("span", { className: "total-duration", children: g })
          ]
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "time-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-mode-icon ${n === "LOCAL" ? "active" : ""}`,
            onClick: () => r("LOCAL"),
            title: "Workstation Local Time (e.g. IDT / GMT+3)",
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
              /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "9", strokeWidth: "2.5" }),
              /* @__PURE__ */ s.jsx("polyline", { points: "12 7 12 12 15 15", strokeWidth: "2.5", strokeLinecap: "round" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-mode-icon ${n === "UTC" ? "active" : ""}`,
            onClick: () => r("UTC"),
            title: "Coordinated Universal Time / Military Zulu (UTC)",
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
              /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10", strokeWidth: "2.5" }),
              /* @__PURE__ */ s.jsx("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z", strokeWidth: "2.5" }),
              /* @__PURE__ */ s.jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12", strokeWidth: "2.5" })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "scope-fleet-selection-pill clickable",
          onClick: v,
          title: "Click to change selected station pool",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: "beacon-dot" }),
            /* @__PURE__ */ s.jsx("span", { className: "selection-label", children: "SELECTED:" }),
            /* @__PURE__ */ s.jsx("strong", { className: "selection-count", children: m }),
            /* @__PURE__ */ s.jsxs("span", { className: "selection-total", children: [
              "/ ",
              y
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "scope-view-actions", children: [
      !o && l && /* @__PURE__ */ s.jsx("button", { type: "button", onClick: a, className: "btn-grid-return", children: "⊞ Back to Grid" }),
      /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          onClick: c,
          className: "btn-bookmarks-prominent",
          title: "Session Bookmarks & Events",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" }) }),
            /* @__PURE__ */ s.jsx("span", { children: "BOOKMARKS" })
          ]
        }
      ),
      /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          onClick: d,
          className: "btn-help-shortcuts",
          title: "Keyboard Shortcuts & Controls Cheat Sheet (Press ?)",
          children: [
            /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", width: "13", height: "13", className: "help-icon-symbol", children: [
              /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
              /* @__PURE__ */ s.jsx("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
              /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
            ] }),
            /* @__PURE__ */ s.jsx("span", { children: "SHORTCUTS" })
          ]
        }
      ),
      /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          onClick: () => P(!0),
          className: "btn-reset-studio",
          title: "Reset Studio Session & Clear Cache",
          children: [
            /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: [
              /* @__PURE__ */ s.jsx("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
              /* @__PURE__ */ s.jsx("path", { d: "M3 3v5h5" })
            ] }),
            /* @__PURE__ */ s.jsx("span", { children: "RESET" })
          ]
        }
      ),
      !p && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          onClick: v,
          className: "btn-toggle-drawer",
          title: "Toggle Station Pool",
          children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      )
    ] }),
    typeof document < "u" && I && Ts.createPortal(I, document.body)
  ] });
}
const qr = (e) => String(e).padStart(2, "0");
function St(e, t = "LOCAL", n = {}) {
  if (!e || isNaN(e) || e <= 0) return "--:--:--";
  let r = !1, l = !0;
  if (typeof n == "boolean" ? r = n : typeof n == "object" && n !== null && (n.showZone !== void 0 && (r = !!n.showZone), n.includeSeconds !== void 0 && (l = !!n.includeSeconds)), t === "UTC") {
    const m = new Date(e), y = qr(m.getUTCHours()), C = qr(m.getUTCMinutes()), j = qr(m.getUTCSeconds()), P = l ? `${y}:${C}:${j}` : `${y}:${C}`;
    return r ? `${P} UTC` : P;
  }
  const { offsetMin: o, label: a } = Bs(e), i = new Date(e + o * 60 * 1e3), c = qr(i.getUTCHours()), d = qr(i.getUTCMinutes()), v = qr(i.getUTCSeconds()), p = l ? `${c}:${d}:${v}` : `${c}:${d}`;
  return r ? `${p} ${a}` : p;
}
const Gg = 600, dh = 250, ls = /* @__PURE__ */ new Map(), Ir = /* @__PURE__ */ new Map(), Kc = /* @__PURE__ */ new Set(), hh = 4;
let El = 0, xs = [];
function Vc(e) {
  return !e || isNaN(e) ? 0 : Math.round(e / dh) * dh;
}
function Bp() {
  var e;
  if (!(El >= hh || xs.length === 0))
    for (xs = xs.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); El < hh && xs.length > 0; ) {
      const t = xs.pop();
      !t || (e = t.signal) != null && e.aborted || (El++, Qg(t));
    }
}
function xa(e, t, n, r = "mon-0") {
  const l = Vc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
  if (ls.size >= Gg) {
    const i = ls.keys().next().value, c = ls.get(i);
    c && c.startsWith("blob:") && URL.revokeObjectURL(c), ls.delete(i);
  }
  ls.set(a, n), Kc.forEach((i) => i(e, l, n, o));
}
async function Qg(e) {
  const { key: t, hostname: n, epochMs: r, displayId: l, signal: o, resolve: a } = e;
  try {
    if (o != null && o.aborted) {
      a(null);
      return;
    }
    const i = l ? `&displayId=${encodeURIComponent(l)}` : "", c = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(n)}&epochMs=${r}${i}`, { signal: o });
    if (c.status === 200) {
      const d = await c.blob(), v = URL.createObjectURL(d);
      xa(n, r, v, l), a(v);
    } else c.status === 204 ? (xa(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } catch (i) {
    i.name !== "AbortError" ? (xa(n, r, "NO_SIGNAL", l), a("NO_SIGNAL")) : a(null);
  } finally {
    El = Math.max(0, El - 1), Ir.delete(t), Bp();
  }
}
const Rn = {
  /**
   * Gets a cached frame URL by station, timestamp, and optional displayId.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} [displayId='mon-0']
   * @returns {string|null} Blob URL, 'NO_SIGNAL', or null if not cached.
   */
  get(e, t, n = "mon-0") {
    const r = Vc(t), o = `${e}_${n || "mon-0"}_${r}`;
    if (!ls.has(o)) return null;
    const a = ls.get(o);
    return ls.delete(o), ls.set(o, a), a;
  },
  /**
   * Stores a frame value and notifies subscribers.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {string} value
   * @param {string} [displayId='mon-0']
   */
  set: xa,
  /**
   * Clears all cached frames, releases blob URLs, and flushes queues.
   */
  clearAll() {
    ls.forEach((e) => {
      e && e.startsWith("blob:") && URL.revokeObjectURL(e);
    }), ls.clear(), Ir.clear(), xs = [], El = 0;
  },
  /**
   * Subscribes to frame store updates.
   * 
   * @param {(hostname: string, epochMs: number, value: string, displayId?: string) => void} listener
   * @returns {() => void} Unsubscribe callback.
   */
  subscribe(e) {
    return Kc.add(e), () => Kc.delete(e);
  },
  /**
   * Fetches a frame for the specified station, timestamp, and display with deduplication and queueing.
   * 
   * @param {string} hostname
   * @param {number} rawEpochMs
   * @param {AbortSignal} [signal=null]
   * @param {string} [displayId='mon-0']
   * @returns {Promise<string|null>}
   */
  fetchFrame(e, t, n = null, r = "mon-0") {
    const l = Vc(t), o = r || "mon-0", a = `${e}_${o}_${l}`;
    if (ls.has(a))
      return Promise.resolve(this.get(e, l, o));
    if (Ir.has(a))
      return Ir.get(a);
    const i = new Promise((c) => {
      if (n != null && n.aborted) {
        c(null);
        return;
      }
      xs = xs.filter((v) => v.hostname === e && v.displayId === o && v.key !== a ? (Ir.delete(v.key), v.resolve(null), !1) : !0);
      const d = { key: a, hostname: e, epochMs: l, displayId: o, signal: n, resolve: c };
      n && n.addEventListener("abort", () => {
        xs = xs.filter((v) => v.key !== a), Ir.delete(a), c(null);
      }, { once: !0 }), xs.push(d), Bp();
    });
    return Ir.set(a, i), i;
  }
};
typeof window < "u" && window.addEventListener("extractor:clear-session", () => {
  Rn.clearAll();
});
const Vu = "ITB_STUDIO_SESSION_CACHE_V2", Wp = "itb_player_audio_settings";
let Ki = null;
function Jg() {
  try {
    const e = localStorage.getItem(Vu);
    return e ? JSON.parse(e) : null;
  } catch (e) {
    return console.warn("[SessionStore] Failed reading studio session cache:", e), null;
  }
}
function Up(e) {
  e && (Ki && clearTimeout(Ki), Ki = setTimeout(() => {
    try {
      const t = (e.allStations || []).map((r) => ({
        id: r.id,
        hostname: r.hostname,
        displayName: r.displayName,
        isOnline: r.isOnline,
        recordingsCount: r.recordingsCount
      })), n = {
        timeRange: e.timeRange,
        timeMode: e.timeMode || "LOCAL",
        inPointMs: typeof e.inPointMs == "number" ? e.inPointMs : null,
        outPointMs: typeof e.outPointMs == "number" ? e.outPointMs : null,
        playheadMs: typeof e.playheadMs == "number" ? e.playheadMs : null,
        // Absolute Epoch millisecond timestamps for cut points
        inEpochMs: typeof e.inEpochMs == "number" ? e.inEpochMs : null,
        outEpochMs: typeof e.outEpochMs == "number" ? e.outEpochMs : null,
        playheadEpochMs: typeof e.playheadEpochMs == "number" ? e.playheadEpochMs : null,
        selectedStationIds: Array.isArray(e.selectedStationIds) ? e.selectedStationIds : [],
        activeStationId: e.activeStationId || null,
        zoomLevel: e.zoomLevel || 1,
        viewportStartMs: typeof e.viewportStartMs == "number" ? e.viewportStartMs : 0,
        isWorkspaceActive: !!e.isWorkspaceActive,
        allStations: t,
        isLooping: typeof e.isLooping == "boolean" ? e.isLooping : !0,
        playbackSpeed: typeof e.playbackSpeed == "number" ? e.playbackSpeed : 1,
        showRulerKeystrokes: typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1,
        lastSavedAt: Date.now()
      };
      localStorage.setItem(Vu, JSON.stringify(n));
    } catch (t) {
      console.warn("[SessionStore] Quota exceeded or failed saving session:", t);
    }
  }, 300));
}
function Zg() {
  try {
    localStorage.removeItem(Vu);
  } catch (e) {
    console.warn("[SessionStore] Failed to clear session storage", e);
  }
}
function jl() {
  try {
    const e = localStorage.getItem(Wp);
    if (e) {
      const t = JSON.parse(e);
      return {
        volume: typeof t.volume == "number" ? t.volume : 0.8,
        isMuted: typeof t.isMuted == "boolean" ? t.isMuted : !0,
        channelMode: t.channelMode || "both"
      };
    }
  } catch (e) {
    console.warn("[SessionStore] Failed to read audio settings:", e);
  }
  return { volume: 0.8, isMuted: !0, channelMode: "both" };
}
function qg(e) {
  try {
    localStorage.setItem(Wp, JSON.stringify(e)), window.dispatchEvent(new CustomEvent("itb-audio-state-changed", { detail: e }));
  } catch (t) {
    console.warn("[SessionStore] Failed to persist audio settings:", t);
  }
}
let rr = null, gl = null, Vi = null, Fn = 0, el = 0, ta = -60, bo = 1;
function ex() {
  if (!rr) {
    const e = window.AudioContext || window.webkitAudioContext;
    e && (rr = new e());
  }
  return rr && rr.state === "suspended" && rr.resume().catch(() => {
  }), rr;
}
function Ka(e, t = 1) {
  if (!e) return null;
  bo = typeof t == "number" && t >= 0 ? t : 1;
  try {
    const n = ex();
    if (!n) return null;
    let r = e.__audioSourceNode, l = e.__audioGainNode, o = e.__audioAnalyserNode;
    if (!r)
      try {
        r = n.createMediaElementSource(e), l = n.createGain(), o = n.createAnalyser(), o.fftSize = 256, o.smoothingTimeConstant = 0.5, r.connect(l), l.connect(o), o.connect(n.destination), e.__audioSourceNode = r, e.__audioGainNode = l, e.__audioAnalyserNode = o;
      } catch (a) {
        console.warn("[AudioLevelMonitor] createMediaElementSource warning:", a);
      }
    return l && l.gain.setValueAtTime(bo, n.currentTime), gl = e, tx(), { ctx: n, gainNode: l, analyserNode: o };
  } catch (n) {
    return console.warn("[AudioLevelMonitor] Failed to attach video audio:", n), null;
  }
}
function fh(e) {
  if (bo = Math.max(0, Number(e) || 1), gl != null && gl.__audioGainNode && rr)
    try {
      gl.__audioGainNode.gain.setValueAtTime(bo, rr.currentTime);
    } catch {
    }
}
function tx() {
  if (Vi) return;
  const e = new Uint8Array(256), t = () => {
    const n = gl, r = n == null ? void 0 : n.__audioAnalyserNode;
    if (!n || !r || n.paused || n.ended || n.muted)
      Fn *= 0.85, el *= 0.85, Fn < 1e-3 && (Fn = 0), el < 1e-3 && (el = 0), ta = Fn > 1e-3 ? 20 * Math.log10(Fn) : -60;
    else
      try {
        r.getByteTimeDomainData(e);
        let l = 0, o = 0;
        for (let i = 0; i < e.length; i++) {
          const c = (e[i] - 128) / 128;
          l += c * c;
          const d = Math.abs(c);
          d > o && (o = d);
        }
        const a = Math.sqrt(l / e.length);
        Fn = a > Fn ? Fn * 0.3 + a * 0.7 : Fn * 0.85 + a * 0.15, el = Math.max(Fn, o), ta = Fn > 1e-4 ? 20 * Math.log10(Fn) : -60;
      } catch {
        Fn = 0, el = 0, ta = -60;
      }
    window.dispatchEvent(new CustomEvent("itb-live-audio-level", {
      detail: {
        rms: Fn,
        peak: el,
        db: ta,
        gain: bo,
        isPlaying: !!(n && !n.paused && !n.muted)
      }
    })), Vi = requestAnimationFrame(t);
  };
  Vi = requestAnimationFrame(t);
}
function zp({ isPlaying: e = !1 }) {
  return /* @__PURE__ */ s.jsxs("div", { className: "tactical-no-signal-hero", children: [
    /* @__PURE__ */ s.jsx("div", { className: "spotlight-badge-container", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 40 40", fill: "none", className: "torch-fullscreen-svg", children: [
      /* @__PURE__ */ s.jsx("path", { d: "M5 12V6a1 1 0 0 1 1-1h6", stroke: "#22d3ee", strokeWidth: "2.5", strokeLinecap: "round" }),
      /* @__PURE__ */ s.jsx("path", { d: "M28 5h6a1 1 0 0 1 1 1v6", stroke: "#22d3ee", strokeWidth: "2.5", strokeLinecap: "round" }),
      /* @__PURE__ */ s.jsx("path", { d: "M5 28v6a1 1 0 0 0 1 1h6", stroke: "#22d3ee", strokeWidth: "2.5", strokeLinecap: "round" }),
      /* @__PURE__ */ s.jsx("path", { d: "M28 35h6a1 1 0 0 0 1-1v-6", stroke: "#22d3ee", strokeWidth: "2.5", strokeLinecap: "round" }),
      /* @__PURE__ */ s.jsx("line", { x1: "20", y1: "13", x2: "20", y2: "7", stroke: "#38bdf8", strokeWidth: "2", strokeLinecap: "round" }),
      /* @__PURE__ */ s.jsx("polygon", { points: "14,18 26,18 23,22 17,22", fill: "#0284c7", stroke: "#38bdf8", strokeWidth: "1.8", strokeLinejoin: "round" }),
      /* @__PURE__ */ s.jsx("rect", { x: "17", y: "22", width: "6", height: "10", rx: "1.5", fill: "#0f172a", stroke: "#22d3ee", strokeWidth: "1.8" })
    ] }) }),
    /* @__PURE__ */ s.jsxs("span", { className: "spotlight-title-label", children: [
      "NO SIGNAL / GAP ",
      e ? "� PLAYING THROUGH" : ""
    ] })
  ] });
}
function nx({
  displays: e = [],
  activeDisplayId: t = "mon-0",
  onSelectDisplay: n,
  areAllDisplaysPlaced: r = !1,
  isAutoDirectorEnabled: l = !1
}) {
  if (!e || e.length <= 1)
    return null;
  const o = (t || "mon-0").toLowerCase(), a = o === "auto" || o === "director";
  return /* @__PURE__ */ s.jsx(
    "aside",
    {
      className: `tactical-display-strip-wrapper ${r ? "are-all-placed" : ""}`,
      "aria-label": "Workstation Display Switcher",
      onClick: (i) => i.stopPropagation(),
      children: /* @__PURE__ */ s.jsxs("div", { className: "vertical-display-strip", role: "toolbar", children: [
        l && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `display-strip-btn btn-auto ${a ? "is-active" : ""}`,
            onClick: (i) => {
              i.stopPropagation(), n == null || n("auto");
            },
            title: "Auto-Director: Automatically follow active keyboard/mouse cuts",
            "aria-label": "Auto-Director",
            children: /* @__PURE__ */ s.jsx("span", { className: "auto-icon", children: "⚡" })
          }
        ),
        e.map((i, c) => {
          const d = (i.displayId ?? i.DisplayId ?? `mon-${c}`).toLowerCase(), v = !a && o === d, p = i.width ?? i.Width ?? 1920, m = i.height ?? i.Height ?? 1080, y = i.displayName ?? i.DisplayName ?? `Monitor ${c + 1}`;
          return /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `display-strip-btn btn-number ${v ? "is-active" : ""}`,
              onClick: (C) => {
                C.stopPropagation(), n == null || n(d);
              },
              title: `Switch window to Monitor ${c + 1}: ${y} (${p}×${m})`,
              "aria-label": `Monitor ${c + 1}`,
              children: /* @__PURE__ */ s.jsx("span", { className: "number-label", children: c + 1 })
            },
            d
          );
        })
      ] })
    }
  );
}
function Hp({
  displays: e = [],
  activeDisplayId: t = "mon-0",
  onSelectDisplay: n,
  isTransitioning: r = !1,
  mode: l = "AUTO",
  // 'AUTO' or 'MANUAL'
  activeTimeRange: o = ""
}) {
  const a = u.useMemo(() => {
    if (!e || e.length <= 1) return null;
    let y = 1 / 0, C = 1 / 0, j = -1 / 0, P = -1 / 0;
    e.forEach((x) => {
      const I = x.x ?? x.X ?? 0, S = x.y ?? x.Y ?? 0, M = x.width ?? x.Width ?? 1920, h = x.height ?? x.Height ?? 1080;
      y = Math.min(y, I), C = Math.min(C, S), j = Math.max(j, I + M), P = Math.max(P, S + h);
    });
    const w = Math.max(1, j - y), g = Math.max(1, P - C);
    return { minX: y, minY: C, totalW: w, totalH: g };
  }, [e]);
  if (!e || e.length <= 1 || !a)
    return null;
  const i = e.find((y) => (y.displayId ?? y.DisplayId) === t) || e[0], c = e.indexOf(i), d = c >= 0 ? c + 1 : 1, p = (i ? i.displayName ?? i.DisplayName ?? "" : "").replace(/\s*\(mon-\d+\)/i, "").trim(), m = p && !p.toLowerCase().includes("screen") ? `SCREEN ${d} (${p.toUpperCase()})` : p ? p.toUpperCase() : `SCREEN ${d}`;
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      className: `persistent-minimap-hud ${r ? "transition-inflection" : ""}`,
      "aria-label": "Display Topology Minimap Radar",
      onClick: (y) => y.stopPropagation(),
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "hud-header", children: /* @__PURE__ */ s.jsxs("span", { className: `hud-badge ${l.toLowerCase()}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "hud-pulse" }),
          l === "MANUAL" ? "✋ OVERRIDE" : "⚡ AUTO",
          " : ",
          m,
          o && /* @__PURE__ */ s.jsxs("span", { className: "hud-time-range", children: [
            " [",
            o,
            "]"
          ] })
        ] }) }),
        r && /* @__PURE__ */ s.jsxs("div", { className: "hud-transition-alert", children: [
          /* @__PURE__ */ s.jsx("span", { className: "transition-icon", children: "⚡" }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "SWITCHED TO ",
            m
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "hud-canvas-wrap", children: /* @__PURE__ */ s.jsx(
          "svg",
          {
            className: "hud-topology-svg",
            viewBox: `0 0 ${a.totalW} ${a.totalH}`,
            preserveAspectRatio: "xMidYMid meet",
            children: e.map((y, C) => {
              const j = y.displayId ?? y.DisplayId ?? `mon-${C}`, P = (y.x ?? y.X ?? 0) - a.minX, w = (y.y ?? y.Y ?? 0) - a.minY, g = y.width ?? y.Width ?? 1920, x = y.height ?? y.Height ?? 1080, I = j === t;
              return /* @__PURE__ */ s.jsxs(
                "g",
                {
                  className: `hud-monitor-node ${I ? "is-active" : ""}`,
                  onClick: (S) => {
                    S.stopPropagation(), n == null || n(j);
                  },
                  children: [
                    /* @__PURE__ */ s.jsx(
                      "rect",
                      {
                        x: P + 10,
                        y: w + 10,
                        width: Math.max(10, g - 20),
                        height: Math.max(10, x - 20),
                        rx: "24",
                        className: "monitor-box"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "text",
                      {
                        x: P + g / 2,
                        y: w + x / 2,
                        className: "monitor-text",
                        dominantBaseline: "central",
                        textAnchor: "middle",
                        children: C + 1
                      }
                    )
                  ]
                },
                j
              );
            })
          }
        ) })
      ]
    }
  );
}
function sx({
  station: e,
  currentEpochMs: t,
  isOffline: n,
  isSolo: r,
  isPlaying: l,
  setIsPlaying: o,
  baseEpochMs: a,
  totalDurationMs: i,
  outPointMs: c,
  setPlayheadMs: d,
  isSpotlightActive: v,
  globalGaps: p = [],
  recordingSegments: m = {},
  playbackSpeed: y = 1,
  activeAudioStationId: C = null,
  directorPlan: j = null,
  isAutoDirectorEnabled: P = !0,
  targetDisplayId: w = "auto",
  onSelectDisplayId: g = null,
  areAllDisplaysPlaced: x = !1,
  hideDisplayStrip: I = !1,
  isDecoderAllowed: S = !0,
  maxHeight: M = null
}) {
  var We;
  const h = e.hostname || e.name || e.id || "", $ = Math.round(t), [E, N] = u.useState(() => !h || !$ ? null : Rn.get(h, $) || null), [_, U] = u.useState(""), [R, F] = u.useState(!1), [oe, re] = u.useState(!1), [X, D] = u.useState(!1), K = u.useRef(l), b = u.useRef(null), B = u.useRef(0), L = u.useRef(t - a), ie = u.useRef(t - a), ne = u.useRef(!1), q = u.useRef(null), H = u.useRef(!1);
  L.current = t - a;
  const Ae = (e == null ? void 0 : e.displays) || ((We = e == null ? void 0 : e.topology) == null ? void 0 : We.displays) || [], [$e, Ie] = u.useState(null);
  u.useEffect(() => {
    Ie(null);
  }, [w]);
  const Ue = u.useMemo(() => {
    const se = j || (e == null ? void 0 : e.directorPlan);
    return !se || !se.segments || se.segments.length === 0 ? null : se.segments.find((me) => {
      const T = me.startEpochMs ?? me.StartEpochMs ?? 0, Q = me.endEpochMs ?? me.EndEpochMs ?? 0;
      return t >= T && t <= Q;
    }) || se.segments[0];
  }, [j, e == null ? void 0 : e.directorPlan, t]), xe = u.useMemo(() => {
    var se;
    return $e ? $e.toLowerCase() : w && w !== "auto" && w !== "director" ? w.toLowerCase() : Ae.length > 1 && P !== !1 && Ue ? (Ue.targetDisplayId || Ue.TargetDisplayId || "mon-0").toLowerCase() : (((se = Ae[0]) == null ? void 0 : se.displayId) || "mon-0").toLowerCase();
  }, [$e, w, Ae, P, Ue]), Me = u.useRef(xe), [nt, gt] = u.useState(!1);
  u.useEffect(() => {
    if (Me.current && Me.current !== xe) {
      gt(!0);
      const se = setTimeout(() => gt(!1), 2e3);
      return Me.current = xe, () => clearTimeout(se);
    }
    Me.current = xe;
  }, [xe]);
  const ce = m[e == null ? void 0 : e.id] || m[h] || (e == null ? void 0 : e.segments) || [], Ce = ce.length === 0 || ce.some((se) => {
    const me = se.startEpochMs ?? se.startEpoch ?? 0, T = se.endEpochMs ?? se.endEpoch ?? 0;
    return t >= me && t <= T;
  }), Ve = !!(r ? !jl().isMuted : C && (e.id === C || h === C)), ze = u.useCallback(() => {
    if (!b.current) return;
    const se = jl();
    if (r)
      b.current.volume = se.volume, b.current.muted = se.isMuted, se.isMuted || Ka(b.current);
    else {
      const me = !!(C && (e.id === C || h === C));
      b.current.muted = !me, me && (b.current.volume = se.volume, Ka(b.current));
    }
  }, [r, C, e.id, h]);
  u.useEffect(() => {
    ze();
  }, [ze]), u.useEffect(() => {
    const se = (me) => {
      b.current && me.detail && ze();
    };
    return window.addEventListener("itb-audio-state-changed", se), () => window.removeEventListener("itb-audio-state-changed", se);
  }, [ze]), u.useEffect(() => {
    b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y);
  }, [y]), u.useEffect(() => {
    if (n || !$ || !h) return;
    if (l && S) {
      K.current = !0;
      return;
    }
    const se = K.current;
    K.current = l;
    let me = !0;
    const T = new AbortController(), Q = Rn.get(h, $, xe);
    if (Q) {
      N(Q), re(!1), D(!1);
      return;
    }
    D(!0);
    const te = setTimeout(() => {
      me && Rn.fetchFrame(h, $, T.signal, xe).then((ee) => {
        me && (D(!1), ee && ee !== "NO_SIGNAL" ? (N(ee), re(!1)) : ee === "NO_SIGNAL" && re(!0));
      });
    }, l ? 180 : se ? 25 : 40), J = Rn.subscribe((ee, he, Ge, _e) => {
      ee === h && he === $ && (!_e || _e === xe) && me && (D(!1), Ge && Ge !== "NO_SIGNAL" ? (N(Ge), re(!1)) : Ge === "NO_SIGNAL" && re(!0));
    });
    return () => {
      me = !1, clearTimeout(te), T.abort(), J();
    };
  }, [h, $, n, l, r, R, xe, S]), u.useEffect(() => {
    if (!h || !(r || l && S)) {
      (!l || !S) && (q.current && clearTimeout(q.current), ne.current = !1, U(""), F(!1), b.current && (b.current.pause(), b.current.removeAttribute("src"), b.current.load()));
      return;
    }
    let me = null;
    return l && !v && Ce ? me = setTimeout(() => {
      const T = L.current;
      B.current = T, ie.current = T, ne.current = !1;
      const Q = M && M < 1080 ? `&maxHeight=${M}` : "", G = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(h)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + T}&displayId=${encodeURIComponent(xe)}${Q}&_t=${Date.now()}`;
      F(!1), U(G);
    }, 80) : l || (q.current && clearTimeout(q.current), ne.current = !1, U(""), F(!1), b.current && (b.current.pause(), b.current.removeAttribute("src"), b.current.load())), () => {
      me && clearTimeout(me);
    };
  }, [l, r, h, a, i, v, Ce, xe, S, M]), u.useEffect(() => {
    if (!h || !(r || l)) return;
    const me = L.current, T = Math.abs(me - ie.current);
    if (!l || T < 800) {
      ie.current = me;
      return;
    }
    return ne.current = !0, ie.current = me, B.current = me, b.current && b.current.pause(), F(!1), q.current && clearTimeout(q.current), q.current = setTimeout(() => {
      if (!Ce || v) {
        U(""), F(!1), ne.current = !1;
        return;
      }
      const Q = L.current, G = M && M < 1080 ? `&maxHeight=${M}` : "", te = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(h)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + Q}&displayId=${encodeURIComponent(xe)}${G}&_t=${Date.now()}`;
      U(te);
    }, 75), () => {
      q.current && clearTimeout(q.current);
    };
  }, [t, l, r, h, a, i, v, Ce, xe, S, M]), u.useEffect(() => {
    if (r || !l || !b.current || !R || ne.current) return;
    const se = (L.current - B.current) / 1e3;
    if (se >= 0) {
      const me = b.current, T = me.currentTime, Q = Math.abs(T - se);
      if (Q > 0.35 && Q < 3)
        try {
          me.currentTime = se;
        } catch {
        }
    }
  }, [r, l, t, R]), u.useEffect(() => {
    if (!r || !l || !_ || !R || v) return;
    let se = null, me = b.current ? b.current.currentTime : 0, T = performance.now(), Q = B.current + Math.round(me * 1e3);
    const G = () => {
      const te = b.current;
      if (te && !te.paused && !te.ended && !H.current && !ne.current) {
        const J = performance.now(), ee = te.currentTime;
        Math.abs(ee - me) > 5e-4 && (me = ee, T = J);
        const he = Math.max(0, (J - T) / 1e3), Ge = te.playbackRate || y || 1, _e = me + he * Ge;
        let Be = B.current + Math.round(_e * 1e3);
        const dt = Be - Q;
        if (dt < 0 && dt > -300 && (Be = Q), Be >= c) {
          o == null || o(!1), d == null || d(c);
          return;
        }
        const Je = a + Be, wt = p == null ? void 0 : p.find((Et) => Je >= Et.startEpochMs && Je < Et.endEpochMs);
        if (wt) {
          H.current = !0;
          const Et = wt.endEpochMs - a;
          d(Et), B.current = Et, Q = Et, ie.current = Et;
          const Gt = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(h)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + Et}&_t=${Date.now()}`;
          F(!1), U(Gt), setTimeout(() => {
            H.current = !1;
          }, 300);
          return;
        }
        Be !== Q && (Q = Be, ie.current = Be, d == null || d(Be));
      }
      se = requestAnimationFrame(G);
    };
    return se = requestAnimationFrame(G), () => {
      se && cancelAnimationFrame(se);
    };
  }, [
    r,
    l,
    _,
    R,
    v,
    y,
    c,
    a,
    i,
    h,
    p,
    d,
    o
  ]);
  const st = () => {
    if (H.current) return;
    const se = a + L.current, me = ce.map((T) => ({ start: T.startEpochMs ?? T.startEpoch ?? 0, end: T.endEpochMs ?? T.endEpoch ?? 0 })).filter((T) => T.start > se + 200).sort((T, Q) => T.start - Q.start)[0];
    if (me && me.start - a < c) {
      H.current = !0;
      const T = me.start - a;
      d(T), B.current = T;
      const Q = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(h)}&startEpoch=${a}&endEpoch=${a + i}&seekEpoch=${a + T}&_t=${Date.now()}`;
      F(!1), U(Q), setTimeout(() => {
        H.current = !1;
      }, 300);
      return;
    }
    o && o(!1);
  };
  return n ? /* @__PURE__ */ s.jsxs("div", { className: "offline-state-overlay", children: [
    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
      /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
    ] }),
    /* @__PURE__ */ s.jsx("span", { children: "SIGNAL LOST" })
  ] }) : /* @__PURE__ */ s.jsxs("div", { className: "camera-card-feed-root", children: [
    (r || l) && _ && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: b,
        src: _,
        className: "station-live-frame",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: R ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          zIndex: R ? 3 : 1,
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: !0,
        muted: !Ve,
        onLoadedData: () => {
          b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y);
        },
        onCanPlay: () => {
          ze(), b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y), l && b.current && b.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          ne.current = !1, F(!0), ze(), b.current && (b.current.defaultPlaybackRate = y, b.current.playbackRate = y);
        },
        onWaiting: () => {
          F(!1);
        },
        onTimeUpdate: () => {
          var se;
          !R && ((se = b.current) == null ? void 0 : se.currentTime) > 0 && (ne.current = !1, F(!0));
        },
        onEnded: st
      }
    ),
    /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: {
          position: "absolute",
          inset: 0,
          zIndex: (r || l) && R && !v ? 0 : 2,
          pointerEvents: "none"
        },
        children: E && !oe ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: E,
            alt: h,
            className: "station-live-frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            },
            onError: () => re(!0)
          }
        ) : (!E || oe || !Ce) && !_ ? /* @__PURE__ */ s.jsx(zp, { isPlaying: l }) : null
      }
    ),
    (r || l) && l && Ce && !R && !v && /* @__PURE__ */ s.jsx("div", { className: "tactical-feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-hud", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "radar-dual-ring", children: [
        /* @__PURE__ */ s.jsx("div", { className: "ring-outer" }),
        /* @__PURE__ */ s.jsx("div", { className: "ring-inner" }),
        /* @__PURE__ */ s.jsx("div", { className: "radar-blip" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "hud-meta-stack", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "hud-headline", children: [
          /* @__PURE__ */ s.jsx("span", { className: "beacon-pulse" }),
          /* @__PURE__ */ s.jsx("span", { children: "INITIALIZING STREAM PIPELINE" })
        ] }),
        /* @__PURE__ */ s.jsxs("span", { className: "hud-sub", children: [
          "BUFFERING // ",
          h
        ] })
      ] })
    ] }) }),
    Ae.length > 1 && /* @__PURE__ */ s.jsx(
      Hp,
      {
        displays: Ae,
        activeDisplayId: xe,
        onSelectDisplay: (se) => {
          Ie(se), g == null || g(se);
        },
        isTransitioning: nt,
        mode: P ? "AUTO" : "MANUAL"
      }
    ),
    !I && /* @__PURE__ */ s.jsx(
      nx,
      {
        displays: Ae,
        activeDisplayId: xe,
        onSelectDisplay: (se) => {
          Ie(se), g == null || g(se);
        },
        areAllDisplaysPlaced: x,
        isAutoDirectorEnabled: P
      }
    )
  ] });
}
function rx({
  station: e,
  isSolo: t = !1,
  stationsCount: n = 1,
  onDeselectStation: r = null,
  currentEpochMs: l,
  timeMode: o = "LOCAL",
  isPlaying: a,
  setIsPlaying: i,
  baseEpochMs: c,
  totalDurationMs: d,
  outPointMs: v,
  setPlayheadMs: p,
  isSpotlightActive: m,
  globalGaps: y = [],
  onOpenSpotlight: C,
  onSelectActiveStation: j,
  recordingSegments: P = {},
  playbackSpeed: w = 1,
  activeAudioStationId: g = null,
  onSoloAudio: x,
  directorPlan: I = null,
  isAutoDirectorEnabled: S = !0,
  targetDisplayId: M = "auto",
  onSelectDisplayId: h = null,
  areAllDisplaysPlaced: $ = !1,
  _slotIndex: E = 0,
  borderColor: N = null,
  onSwapWithNext: _ = null,
  isDecoderAllowed: U = !0,
  maxHeight: R = null
}) {
  var b;
  const F = !!(g && (e.id === g || e.hostname && e.hostname === g)), oe = (e.hostname || e.name || "").includes("Offline"), re = oe ? "offline" : "live";
  ((e == null ? void 0 : e.displays) || ((b = e == null ? void 0 : e.topology) == null ? void 0 : b.displays) || []).length > 1;
  const D = () => {
    if (t) {
      const B = M && M !== "auto" && M !== "director" ? M : null;
      C && C(e.id, B);
    } else
      j && j(e.id);
  }, K = (B) => {
    B.preventDefault(), B.stopPropagation(), t && j && (i && i(!1), j(null));
  };
  return /* @__PURE__ */ s.jsx("div", { className: `camera-card-cell ${t ? "solo-mode" : ""}`, children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: D,
      onContextMenu: K,
      className: `camera-card ${re} ${t ? "is-solo-card" : ""}`,
      style: N ? { borderColor: N } : void 0,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-topbar", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "station-meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: `status-pulse ${re}` }),
            /* @__PURE__ */ s.jsx("span", { className: "station-name", children: e.displayName || e.roleAlias || e.hostname || e.name }),
            e.hostname && (e.displayName || e.roleAlias) && (e.displayName || e.roleAlias).toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { className: "station-physical-badge", title: `Physical Machine: ${e.hostname}`, children: e.hostname })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "card-header-actions", children: [
            _ && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action swap-action",
                onClick: (B) => {
                  B.stopPropagation(), _();
                },
                title: "Swap Slot Position (⇄)",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: /* @__PURE__ */ s.jsx("path", { d: "M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" }) })
              }
            ),
            x && n > 1 && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action audio-action ${F ? "audio-active" : ""}`,
                onClick: (B) => {
                  B.stopPropagation(), x(F ? null : e.id);
                },
                title: F ? "Mute Station Audio (Audio Active)" : "Solo Station Audio (Rule 12)",
                children: F ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor", fillOpacity: "0.25" }),
                  /* @__PURE__ */ s.jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" })
                ] }) : /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
                ] })
              }
            ),
            C && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action",
                onClick: (B) => {
                  B.stopPropagation();
                  const L = M && M !== "auto" && M !== "director" ? M : null;
                  C(e.id, L);
                },
                title: "Cinema Fullscreen Inspection",
                children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" }) })
              }
            ),
            j && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-card-action ${t ? "active" : ""}`,
                onClick: (B) => {
                  B.stopPropagation(), t && i && i(!1), j(t ? null : e.id);
                },
                title: t ? "Exit Solo Focus (Back to Grid)" : "Solo Focus",
                children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  t ? /* @__PURE__ */ s.jsx("path", { d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" }) : /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "3" }),
                  !t && /* @__PURE__ */ s.jsx("path", { d: "M3 12h3m12 0h3M12 3v3m0 12v3" })
                ] })
              }
            ),
            r && /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: "btn-card-action deselect-action",
                onClick: (B) => {
                  B.stopPropagation(), r(e.id);
                },
                title: `Deselect and remove ${e.displayName || e.hostname} from project`,
                children: "✕"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: `card-feed-body ${oe ? "blurred-offline" : ""}`, children: [
          /* @__PURE__ */ s.jsx(
            sx,
            {
              station: e,
              currentEpochMs: l,
              isOffline: oe,
              isSolo: t,
              isPlaying: a,
              setIsPlaying: i,
              baseEpochMs: c,
              totalDurationMs: d,
              outPointMs: v,
              setPlayheadMs: p,
              isSpotlightActive: m,
              globalGaps: y,
              recordingSegments: P,
              playbackSpeed: w,
              activeAudioStationId: g,
              directorPlan: I,
              isAutoDirectorEnabled: S,
              targetDisplayId: M,
              onSelectDisplayId: h,
              areAllDisplaysPlaced: $,
              hideDisplayStrip: !0,
              isDecoderAllowed: U,
              maxHeight: R
            }
          ),
          t && !a && /* @__PURE__ */ s.jsxs("div", { className: "solo-hover-tooltip", children: [
            /* @__PURE__ */ s.jsxs("span", { className: "tooltip-action", children: [
              /* @__PURE__ */ s.jsx("kbd", { children: "L-Click" }),
              " Fullscreen"
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "tooltip-dot" }),
            /* @__PURE__ */ s.jsxs("span", { className: "tooltip-action", children: [
              /* @__PURE__ */ s.jsx("kbd", { children: "R-Click" }),
              " Back to Grid"
            ] })
          ] })
        ] }),
        !oe && /* @__PURE__ */ s.jsx("div", { className: "card-bottom-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "overlay-pill timestamp", children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
          ] }),
          St(l, o)
        ] }) })
      ]
    }
  ) });
}
const eo = ["top-right", "bottom-right", "bottom-left", "top-left"];
function Kp(e) {
  if (!e || typeof e != "string")
    return { isCustom: !1, preset: "top-right", xPct: 100, yPct: 0 };
  const t = e.trim().toLowerCase();
  if (eo.includes(t)) {
    const n = t.includes("right") ? 100 : 0, r = t.includes("bottom") ? 100 : 0;
    return { isCustom: !1, preset: t, xPct: n, yPct: r };
  }
  if (t.startsWith("custom:") || t.includes(",")) {
    const n = t.replace("custom:", "").split(/[,;]/);
    if (n.length >= 2) {
      const r = parseFloat(n[0].replace("%", "")), l = parseFloat(n[1].replace("%", ""));
      if (!isNaN(r) && !isNaN(l))
        return {
          isCustom: !0,
          preset: null,
          xPct: Math.max(0, Math.min(100, r)),
          yPct: Math.max(0, Math.min(100, l))
        };
    }
  }
  return { isCustom: !1, preset: "top-right", xPct: 100, yPct: 0 };
}
function lx(e) {
  const t = Kp(e);
  return t.isCustom ? `CUSTOM (${Math.round(t.xPct)}% X, ${Math.round(t.yPct)}% Y)` : (t.preset || "top-right").toUpperCase();
}
function ox({
  currentEpochMs: e,
  position: t = null,
  onPositionChange: n = null
}) {
  var U;
  const r = u.useRef(null), l = u.useRef(null), [o, a] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), i = t || o, c = Kp(i), [d, v] = u.useState(!1), [p, m] = u.useState(null);
  u.useEffect(() => {
    d || (c.isCustom ? m({ xPct: c.xPct, yPct: c.yPct }) : m(null));
  }, [i, d, c.isCustom, c.xPct, c.yPct]);
  const y = u.useCallback((R) => {
    R && (R.preventDefault(), R.stopPropagation());
    let F;
    if (c.isCustom || !eo.includes(c.preset))
      F = "top-right";
    else {
      const re = (eo.indexOf(c.preset) + 1) % eo.length;
      F = eo[re];
    }
    a(F), m(null);
    try {
      localStorage.setItem("itb_canvas_utc_clock_pos", F);
    } catch {
    }
    n && n(F);
  }, [c.isCustom, c.preset, n]), C = u.useCallback((R) => {
    if (R.button !== void 0 && R.button !== 0 || R.target.closest(".btn-cycle-corner")) return;
    const F = r.current;
    if (!F) return;
    const oe = F.parentElement;
    if (!oe) return;
    const re = F.getBoundingClientRect(), X = oe.getBoundingClientRect();
    l.current = {
      startX: R.clientX,
      startY: R.clientY,
      clockWidth: re.width,
      clockHeight: re.height,
      parentRect: X,
      offsetX: R.clientX - re.left,
      offsetY: R.clientY - re.top,
      hasMoved: !1
    };
    const D = (b) => {
      if (!l.current) return;
      const B = l.current, L = Math.hypot(b.clientX - B.startX, b.clientY - B.startY);
      if (!B.hasMoved && L > 4 && (B.hasMoved = !0, v(!0)), !B.hasMoved) return;
      const ie = B.parentRect.width, ne = B.parentRect.height, q = Math.max(1, ie - B.clockWidth - 28), H = Math.max(1, ne - B.clockHeight - 28), Ae = b.clientX - B.parentRect.left - B.offsetX - 14, $e = b.clientY - B.parentRect.top - B.offsetY - 14, Ie = Math.max(0, Math.min(q, Ae)), Ue = Math.max(0, Math.min(H, $e)), xe = Math.round(Ie / q * 1e3) / 10, Me = Math.round(Ue / H * 1e3) / 10;
      m({ xPct: xe, yPct: Me });
    }, K = (b) => {
      window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", K), window.removeEventListener("pointercancel", K);
      const B = l.current;
      if (l.current = null, v(!1), !B) return;
      if (!B.hasMoved) {
        y();
        return;
      }
      const L = Math.max(1, B.parentRect.width - B.clockWidth - 28), ie = Math.max(1, B.parentRect.height - B.clockHeight - 28), ne = b.clientX - B.parentRect.left - B.offsetX - 14, q = b.clientY - B.parentRect.top - B.offsetY - 14, H = Math.max(0, Math.min(L, ne)), Ae = Math.max(0, Math.min(ie, q)), $e = H / L * 100, Ie = Ae / ie * 100;
      let Ue;
      $e > 94 && Ie < 6 ? Ue = "top-right" : $e < 6 && Ie < 6 ? Ue = "top-left" : $e > 94 && Ie > 94 ? Ue = "bottom-right" : $e < 6 && Ie > 94 ? Ue = "bottom-left" : Ue = `custom:${$e.toFixed(1)},${Ie.toFixed(1)}`, a(Ue);
      try {
        localStorage.setItem("itb_canvas_utc_clock_pos", Ue);
      } catch {
      }
      n && n(Ue);
    };
    window.addEventListener("pointermove", D), window.addEventListener("pointerup", K), window.addEventListener("pointercancel", K);
  }, [y, n]), j = new Date(e || Date.now()), P = j.getUTCFullYear(), w = String(j.getUTCMonth() + 1).padStart(2, "0"), g = String(j.getUTCDate()).padStart(2, "0"), x = String(j.getUTCHours()).padStart(2, "0"), I = String(j.getUTCMinutes()).padStart(2, "0"), S = String(j.getUTCSeconds()).padStart(2, "0"), M = `${P}-${w}-${g}`, h = `${x}:${I}:${S} UTC`, $ = p !== null || c.isCustom, E = p || (c.isCustom ? { xPct: c.xPct, yPct: c.yPct } : null);
  let N;
  if (E) {
    const R = E.xPct / 100, F = E.yPct / 100;
    N = {
      left: `calc(14px + (100% - 28px) * ${R})`,
      top: `calc(14px + (100% - 28px) * ${F})`,
      transform: `translate(-${E.xPct}%, -${E.yPct}%)`,
      right: "auto",
      bottom: "auto"
    };
  }
  const _ = !$ && c.preset ? `corner-${c.preset}` : "";
  return /* @__PURE__ */ s.jsxs(
    "aside",
    {
      ref: r,
      className: `canvas-utc-wall-clock ${_} ${d ? "is-dragging" : ""} ${$ ? "is-custom" : ""}`,
      style: N,
      onPointerDown: C,
      title: "Persistent Canvas UTC Wall Clock • Drag to place anywhere on canvas • Click or use [⤢] to cycle corners",
      "aria-label": "Canvas UTC Wall Clock",
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clock-beacon-pulse" }),
        /* @__PURE__ */ s.jsxs("div", { className: "clock-content-wrap", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clock-date-val", children: M }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-sep", children: "•" }),
          /* @__PURE__ */ s.jsx("span", { className: "clock-time-val", children: h })
        ] }),
        d && E && /* @__PURE__ */ s.jsx("div", { className: "clock-drag-badge", children: /* @__PURE__ */ s.jsxs("span", { children: [
          Math.round(E.xPct),
          "%, ",
          Math.round(E.yPct),
          "%"
        ] }) }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-cycle-corner",
            onClick: y,
            title: $ ? `Custom Position (${Math.round((E == null ? void 0 : E.xPct) || 0)}%, ${Math.round((E == null ? void 0 : E.yPct) || 0)}%) • Click to snap to TOP-RIGHT` : `Current corner: ${((U = c.preset) == null ? void 0 : U.toUpperCase()) || "TOP-RIGHT"} • Click to switch corner`,
            "aria-label": "Switch clock corner",
            children: "⤢"
          }
        )
      ]
    }
  );
}
function ax() {
  const [e, t] = u.useState(null), [n, r] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  if (u.useEffect(() => {
    const a = (c) => {
      t(c.detail || null);
    }, i = (c) => {
      c.detail && r(c.detail);
    };
    return window.addEventListener("itb-active-audio-source", a), window.addEventListener("itb-live-audio-level", i), () => {
      window.removeEventListener("itb-active-audio-source", a), window.removeEventListener("itb-live-audio-level", i);
    };
  }, []), !e || !n.isPlaying || (e.gain || 1) <= 0)
    return null;
  const l = (e.channelMode || "both").toUpperCase(), o = Math.round((e.gain || 1) * 100);
  return /* @__PURE__ */ s.jsxs("div", { className: "active-audio-source-overlay", title: `Playing Audio from ${e.stationName} (${l}) • Gain ${o}%`, children: [
    /* @__PURE__ */ s.jsx("div", { className: "audio-live-pulse-dot" }),
    /* @__PURE__ */ s.jsx("span", { className: "audio-source-icon", children: "🔊" }),
    /* @__PURE__ */ s.jsx("span", { className: "audio-source-label", children: "PLAYING AUDIO:" }),
    /* @__PURE__ */ s.jsx("span", { className: "audio-source-station", children: e.stationName }),
    /* @__PURE__ */ s.jsx("span", { className: `audio-channel-badge mode-${(e.channelMode || "both").toLowerCase()}`, children: l === "MIC" ? "🎤 MIC" : l === "SYS" ? "🔊 SYS" : "🎧 BOTH" }),
    /* @__PURE__ */ s.jsxs("span", { className: "audio-gain-badge", children: [
      o,
      "%"
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "audio-vu-bars", children: [
      /* @__PURE__ */ s.jsx("span", { className: "vu-bar bar-1", style: { height: `${Math.min(100, Math.max(20, n.rms * 160))}%` } }),
      /* @__PURE__ */ s.jsx("span", { className: "vu-bar bar-2", style: { height: `${Math.min(100, Math.max(30, n.rms * 240))}%` } }),
      /* @__PURE__ */ s.jsx("span", { className: "vu-bar bar-3", style: { height: `${Math.min(100, Math.max(15, n.rms * 190))}%` } }),
      /* @__PURE__ */ s.jsx("span", { className: "vu-bar bar-4", style: { height: `${Math.min(100, Math.max(35, n.rms * 280))}%` } })
    ] })
  ] });
}
function qt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function ix(e) {
  const t = qt(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function cx(e, t) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  let n = 0;
  for (let r = 0; r < e.length && e[r].timestampEpochMs <= t + 100; r++)
    n = r;
  return Math.min(n, e.length - 1);
}
function ux({
  keyframes: e = [],
  currentEpochMs: t = 0,
  currentPlacements: n = [],
  isEditing: r = !1
}) {
  var j, P, w, g, x, I;
  if (r || !Array.isArray(e) || e.length <= 1)
    return n;
  let l = e[0], o = e[0];
  for (let S = 0; S < e.length; S++)
    if (e[S].timestampEpochMs <= t)
      l = e[S], o = e[S + 1] || e[S];
    else {
      o === l && e[S] && (o = e[S]);
      break;
    }
  if (l === o)
    return ((j = l.layout) == null ? void 0 : j.placements) || n;
  const a = Math.max(100, (o.transitionDurationSec || 0.5) * 1e3), i = o.transitionType || "smooth", c = o.timestampEpochMs - a;
  if (t < c)
    return ((P = l.layout) == null ? void 0 : P.placements) || n;
  if (t >= o.timestampEpochMs)
    return ((w = o.layout) == null ? void 0 : w.placements) || n;
  if (i === "cut")
    return ((g = l.layout) == null ? void 0 : g.placements) || n;
  const d = (t - c) / a, v = qt(d, 0, 1), p = i === "linear" ? v : ix(v), m = ((x = l.layout) == null ? void 0 : x.placements) || [], y = ((I = o.layout) == null ? void 0 : I.placements) || [], C = y.map((S) => {
    const M = m.find((U) => U.stationId === S.stationId && U.displayId === S.displayId);
    if (!M)
      return {
        ...S,
        opacity: Math.max(0.05, p)
      };
    const h = Math.round(M.x + (S.x - M.x) * p), $ = Math.round(M.y + (S.y - M.y) * p), E = Math.round(M.width + (S.width - M.width) * p), N = Math.round(M.height + (S.height - M.height) * p), _ = Number(((M.rotation || 0) + ((S.rotation || 0) - (M.rotation || 0)) * p).toFixed(1));
    return {
      ...S,
      x: h,
      y: $,
      width: E,
      height: N,
      rotation: _,
      opacity: 1
    };
  });
  return m.forEach((S) => {
    y.some((h) => h.stationId === S.stationId && h.displayId === S.displayId) || C.push({
      ...S,
      opacity: Math.max(0, 1 - p)
    });
  }), C;
}
function dx({
  prevTimeline: e,
  newPlacements: t,
  currentEpochMs: n,
  baseEpochMs: r,
  toleranceMs: l = 500,
  virtualW: o = 1920,
  virtualH: a = 1080,
  fps: i = 30
}) {
  const c = [...(e == null ? void 0 : e.keyframes) || []];
  if (c.length === 0) {
    const C = {
      id: `kf_root_${Date.now()}`,
      timestampEpochMs: r,
      transitionDurationSec: 0.5,
      transitionType: "smooth",
      layout: {
        width: o,
        height: a,
        backgroundColor: "#070A10",
        fps: i,
        placements: t
      }
    };
    return {
      nextTimeline: { ...e || {}, keyframes: [C] },
      newIndex: 0,
      isNewKeyframe: !0,
      activeKeyframe: C
    };
  }
  const d = c.findIndex((C) => Math.abs(C.timestampEpochMs - n) <= l);
  if (d >= 0)
    return c[d] = {
      ...c[d],
      layout: {
        ...c[d].layout,
        width: o,
        height: a,
        placements: t
      }
    }, {
      nextTimeline: { ...e, keyframes: c },
      newIndex: d,
      isNewKeyframe: !1,
      activeKeyframe: c[d]
    };
  if (n <= r + l)
    return c[0] = {
      ...c[0],
      layout: {
        ...c[0].layout,
        width: o,
        height: a,
        placements: t
      }
    }, {
      nextTimeline: { ...e, keyframes: c },
      newIndex: 0,
      isNewKeyframe: !1,
      activeKeyframe: c[0]
    };
  const v = {
    id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestampEpochMs: Math.round(n),
    transitionDurationSec: 0.5,
    transitionType: "smooth",
    layout: {
      width: o,
      height: a,
      backgroundColor: "#070A10",
      fps: i,
      placements: t
    }
  }, p = [...c, v].sort((C, j) => C.timestampEpochMs - j.timestampEpochMs), m = p.findIndex((C) => C.id === v.id);
  return {
    nextTimeline: { ...e, keyframes: p },
    newIndex: m >= 0 ? m : 0,
    isNewKeyframe: !0,
    activeKeyframe: v
  };
}
function Yc(e, t, { transitionType: n, transitionDurationSec: r }) {
  if (!e || !Array.isArray(e.keyframes) || t < 0 || t >= e.keyframes.length)
    return e;
  const l = [...e.keyframes], o = l[t];
  return l[t] = {
    ...o,
    ...n !== void 0 ? { transitionType: n } : {},
    ...r !== void 0 ? { transitionDurationSec: Math.max(0.1, Number(r)) } : {}
  }, {
    ...e,
    keyframes: l
  };
}
function hx(e, t) {
  if (!e || !Array.isArray(e.keyframes) || t <= 0 || t >= e.keyframes.length)
    return {
      nextTimeline: e,
      success: !1,
      newIndex: Math.max(0, t || 0)
    };
  const n = e.keyframes.filter((l, o) => o !== t), r = Math.max(0, t - 1);
  return {
    nextTimeline: {
      ...e,
      keyframes: n
    },
    success: !0,
    newIndex: r
  };
}
function ph(e, t, n, r = 500) {
  const l = (e == null ? void 0 : e.keyframes) || [], o = l.findIndex((d) => Math.abs(d.timestampEpochMs - t) <= r);
  if (o >= 0)
    return {
      nextTimeline: e,
      newIndex: o,
      isNew: !1
    };
  const a = {
    id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestampEpochMs: Math.round(t),
    transitionDurationSec: 0.5,
    transitionType: "smooth",
    layout: JSON.parse(JSON.stringify(n))
  }, i = [...l, a].sort((d, v) => d.timestampEpochMs - v.timestampEpochMs), c = i.findIndex((d) => d.id === a.id);
  return {
    nextTimeline: {
      ...e,
      keyframes: i
    },
    newIndex: c >= 0 ? c : 0,
    isNew: !0
  };
}
function fx(e, t = [], n = [], r = null, l = null, o = "mon-0") {
  let a = Array.isArray(e) ? e.map((d) => ({
    ...d,
    startEpochMs: d.startEpochMs ?? d.StartEpochMs ?? 0,
    endEpochMs: d.endEpochMs ?? d.EndEpochMs ?? 0,
    targetDisplayId: (d.targetDisplayId || d.TargetDisplayId || o || "mon-0").toLowerCase()
  })).sort((d, v) => d.startEpochMs - v.startEpochMs) : [];
  if (r !== null && l !== null && l > r)
    if (a.length === 0)
      a.push({
        startEpochMs: r,
        endEpochMs: l,
        targetDisplayId: (o || "mon-0").toLowerCase(),
        isManualOverride: !1
      });
    else {
      a[0].startEpochMs > r && (a[0].startEpochMs = r), a[a.length - 1].endEpochMs < l && (a[a.length - 1].endEpochMs = l);
      for (let d = 0; d < a.length - 1; d++)
        a[d + 1].startEpochMs > a[d].endEpochMs && (a[d].endEpochMs = a[d + 1].startEpochMs);
    }
  const i = [];
  Array.isArray(n) && n.length > 0 && n.forEach((d) => {
    const v = d.startEpochMs ?? d.StartEpochMs ?? d.startEpoch ?? 0, p = d.endEpochMs ?? d.EndEpochMs ?? d.endEpoch ?? 0;
    p > v && i.push({ startEpoch: v, endEpoch: p });
  }), Array.isArray(t) && t.filter((d) => d.type === "global").forEach((d) => {
    const v = d.startEpochMs ?? d.startEpoch ?? 0, p = d.endEpochMs ?? d.endEpoch ?? 0;
    p > v && !i.some((m) => m.startEpoch === v && m.endEpoch === p) && i.push({ startEpoch: v, endEpoch: p });
  }), i.forEach((d) => {
    const v = d.startEpoch, p = d.endEpoch, m = [];
    a.forEach((y) => {
      y.endEpochMs <= v || y.startEpochMs >= p ? m.push(y) : (y.startEpochMs < v && m.push({
        ...y,
        endEpochMs: v
      }), y.endEpochMs > p && m.push({
        ...y,
        startEpochMs: p
      }));
    }), a = m;
  }), (t || []).filter((d) => d.type !== "global").forEach((d) => {
    const v = d.startEpochMs ?? d.StartEpochMs ?? d.startEpoch ?? 0, p = d.endEpochMs ?? d.EndEpochMs ?? d.endEpoch ?? 0;
    if (!(!v || !p || p <= v))
      for (let m = a.length - 1; m > 0; m--) {
        const y = a[m].startEpochMs;
        y >= v && y <= p && a[m].startEpochMs === a[m - 1].endEpochMs && (a[m - 1].endEpochMs = a[m].endEpochMs, a.splice(m, 1));
      }
  });
  for (let d = a.length - 1; d > 0; d--)
    a[d].targetDisplayId === a[d - 1].targetDisplayId && a[d].startEpochMs === a[d - 1].endEpochMs && (a[d - 1].endEpochMs = a[d].endEpochMs, a.splice(d, 1));
  return a;
}
const Vp = 4;
function px(e, t) {
  return !t || t <= 0 ? null : t <= 360 ? 360 : t <= 540 ? 480 : t <= 750 ? 720 : null;
}
function mx(e, {
  maxConcurrentDecoders: t = Vp,
  activeAudioStationId: n = null,
  selectedFeedIndex: r = null,
  hoveredFeedIndex: l = null
} = {}) {
  if (!Array.isArray(e) || e.length === 0)
    return [];
  if (e.length <= t)
    return e.map(() => !0);
  const a = e.map((c, d) => {
    var j, P;
    const v = c.width || 1920, p = c.height || 1080;
    let m = v * p;
    const y = (c.stationId || c.hostname || ((j = c.station) == null ? void 0 : j.id) || ((P = c.station) == null ? void 0 : P.hostname) || "").toLowerCase(), C = (n || "").toLowerCase();
    return C && (y === C || y.includes(C) || C.includes(y)) && (m += 1e8), r === d && (m += 5e7), l === d && (m += 25e6), { idx: d, score: m };
  });
  a.sort((c, d) => d.score - c.score);
  const i = new Set(a.slice(0, t).map((c) => c.idx));
  return e.map((c, d) => i.has(d));
}
const Yi = [
  { id: "4K", label: "4K UHD", shortLabel: "4K", baseH: 2160, desc: "Ultra-High Density" },
  { id: "2K", label: "2K QHD / WQXGA", shortLabel: "2K", baseH: 1440, desc: "High Pixel Density (Default)" },
  { id: "FHD", label: "1080p FHD", shortLabel: "FHD", baseH: 1080, desc: "Standard Full HD" },
  { id: "HD", label: "720p HD", shortLabel: "HD", baseH: 720, desc: "Compact Fast Export" }
], Qn = [
  { id: "16:9", label: "16:9 Broadcast", ratio: 16 / 9, w: 2560, h: 1440 },
  { id: "16:10", label: "16:10 WUXGA / WQXGA", ratio: 16 / 10, w: 2560, h: 1600 },
  { id: "19:10", label: "19:10 NOC Extended", ratio: 19 / 10, w: 2736, h: 1440 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9, w: 3440, h: 1440 },
  { id: "32:9", label: "32:9 Dual Screen", ratio: 32 / 9, w: 5120, h: 1440 },
  { id: "4:3", label: "4:3 Standard", ratio: 4 / 3, w: 1920, h: 1440 }
], gx = "16:9", Xc = 2560, Gc = 1440;
function Sr(e = "2K", t = "16:9") {
  if (t === "16:9")
    switch (e) {
      case "4K":
        return { w: 3840, h: 2160 };
      case "2K":
        return { w: 2560, h: 1440 };
      case "HD":
        return { w: 1280, h: 720 };
      case "FHD":
      default:
        return { w: 1920, h: 1080 };
    }
  if (t === "16:10")
    switch (e) {
      case "4K":
        return { w: 3840, h: 2400 };
      case "2K":
        return { w: 2560, h: 1600 };
      case "HD":
        return { w: 1280, h: 800 };
      case "FHD":
      default:
        return { w: 1920, h: 1200 };
    }
  if (t === "19:10")
    switch (e) {
      case "4K":
        return { w: 4104, h: 2160 };
      case "2K":
        return { w: 2736, h: 1440 };
      case "HD":
        return { w: 1368, h: 720 };
      case "FHD":
      default:
        return { w: 2052, h: 1080 };
    }
  if (t === "21:9")
    switch (e) {
      case "4K":
        return { w: 5120, h: 2160 };
      case "2K":
        return { w: 3440, h: 1440 };
      case "HD":
        return { w: 1720, h: 720 };
      case "FHD":
      default:
        return { w: 2560, h: 1080 };
    }
  if (t === "32:9")
    switch (e) {
      case "4K":
        return { w: 7680, h: 2160 };
      case "2K":
        return { w: 5120, h: 1440 };
      case "HD":
        return { w: 2560, h: 720 };
      case "FHD":
      default:
        return { w: 3840, h: 1080 };
    }
  if (t === "4:3")
    switch (e) {
      case "4K":
        return { w: 2880, h: 2160 };
      case "2K":
        return { w: 1920, h: 1440 };
      case "HD":
        return { w: 960, h: 720 };
      case "FHD":
      default:
        return { w: 1440, h: 1080 };
    }
  const n = Qn.find((a) => a.id === t), r = n ? n.ratio : 16 / 9, l = e === "4K" ? 2160 : e === "2K" ? 1440 : e === "HD" ? 720 : 1080;
  let o = Math.round(l * r);
  return o -= o % 2, { w: o, h: l };
}
function tl(e, t) {
  if (!e || !t || e <= 0 || t <= 0) return "16:9";
  const n = e / t;
  return Math.abs(n - 16 / 9) < 0.04 ? "16:9" : Math.abs(n - 16 / 10) < 0.04 ? "16:10" : Math.abs(n - 19 / 10) < 0.04 ? "19:10" : Math.abs(n - 4 / 3) < 0.04 ? "4:3" : Math.abs(n - 21 / 9) < 0.06 ? "21:9" : Math.abs(n - 32 / 9) < 0.08 ? "32:9" : Math.abs(n - 5 / 4) < 0.04 ? "5:4" : Math.abs(n - 9 / 16) < 0.04 ? "9:16" : Math.abs(n - 1) < 0.04 ? "1:1" : `${n.toFixed(2)}:1`;
}
const Ct = [
  "#06B6D4",
  // Cyan
  "#10B981",
  // Emerald
  "#F59E0B",
  // Amber
  "#F43F5E",
  // Rose
  "#A855F7",
  // Purple
  "#38BDF8"
  // Sky
], xx = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#A855F7",
  "#38BDF8",
  "#FFFFFF",
  "transparent"
];
function yx(e, t, n) {
  let r;
  switch (e) {
    case "deep":
      r = "0 18px 45px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 0.7)";
      break;
    case "glow-cyan":
      r = "0 0 24px rgba(6, 182, 212, 0.65), 0 10px 30px rgba(0, 0, 0, 0.8)";
      break;
    case "glow-emerald":
      r = "0 0 24px rgba(16, 185, 129, 0.65), 0 10px 30px rgba(0, 0, 0, 0.8)";
      break;
    case "glow-rose":
      r = "0 0 24px rgba(244, 63, 94, 0.65), 0 10px 30px rgba(0, 0, 0, 0.8)";
      break;
    case "glow-amber":
      r = "0 0 24px rgba(245, 158, 11, 0.65), 0 10px 30px rgba(0, 0, 0, 0.8)";
      break;
    default:
      r = "0 6px 20px rgba(0, 0, 0, 0.5)";
      break;
  }
  return t ? `${r}, 0 0 0 2px ${n || "#06B6D4"}, inset 0 0 16px rgba(6, 182, 212, 0.25)` : r;
}
function lr(e, t, n, r, l) {
  const o = l > 0 ? l : 1.7777777777777777, a = n / r;
  let i, c, d, v;
  return o >= a ? (i = n, c = Math.round(i / o), d = e, v = t + Math.round((r - c) / 2)) : (c = r, i = Math.round(c * o), d = e + Math.round((n - i) / 2), v = t), { x: d, y: v, width: i, height: c };
}
function er(e, t = Xc, n = Gc) {
  const r = e.length;
  if (r === 0) return [];
  if (r === 1) {
    const c = e[0], d = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: v, y: p, width: m, height: y } = lr(0, 0, t, n, d);
    return [{
      ...c,
      x: v,
      y: p,
      width: m,
      height: y,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: d,
      aspectRatio: d,
      zIndex: 0,
      rotation: 0,
      borderWidth: 0,
      borderColor: Ct[0],
      shadowEffect: "deep",
      borderRadius: 0
    }];
  }
  if (r === 2) {
    const c = Math.round(t / 2);
    return e.slice(0, 2).map((d, v) => {
      const p = d.nativeAspectRatio || (d.sourceWidth && d.sourceHeight ? d.sourceWidth / d.sourceHeight : 1.7777777777777777), { x: m, y, width: C, height: j } = lr(v * c, 0, c, n, p);
      return {
        ...d,
        x: m,
        y,
        width: C,
        height: j,
        sourceWidth: d.sourceWidth || 1920,
        sourceHeight: d.sourceHeight || 1080,
        nativeAspectRatio: p,
        aspectRatio: p,
        zIndex: v,
        rotation: 0,
        borderWidth: 2,
        borderColor: Ct[v % Ct.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 3) {
    if (t / n >= 2.5) {
      const m = Math.round(t / 3);
      return e.slice(0, 3).map((y, C) => {
        const j = y.nativeAspectRatio || (y.sourceWidth && y.sourceHeight ? y.sourceWidth / y.sourceHeight : 1.7777777777777777), { x: P, y: w, width: g, height: x } = lr(C * m, 0, m, n, j);
        return {
          ...y,
          x: P,
          y: w,
          width: g,
          height: x,
          sourceWidth: y.sourceWidth || 1920,
          sourceHeight: y.sourceHeight || 1080,
          nativeAspectRatio: j,
          aspectRatio: j,
          zIndex: C,
          rotation: 0,
          borderWidth: 2,
          borderColor: Ct[C % Ct.length],
          shadowEffect: "deep",
          borderRadius: 0
        };
      });
    }
    const d = Math.round(t / 2), v = Math.round(n / 2), p = [
      { cx: 0, cy: 0 },
      { cx: d, cy: 0 },
      { cx: Math.round(d / 2), cy: v }
    ];
    return e.slice(0, 3).map((m, y) => {
      const C = m.nativeAspectRatio || (m.sourceWidth && m.sourceHeight ? m.sourceWidth / m.sourceHeight : 1.7777777777777777), { cx: j, cy: P } = p[y], { x: w, y: g, width: x, height: I } = lr(j, P, d, v, C);
      return {
        ...m,
        x: w,
        y: g,
        width: x,
        height: I,
        sourceWidth: m.sourceWidth || 1920,
        sourceHeight: m.sourceHeight || 1080,
        nativeAspectRatio: C,
        aspectRatio: C,
        zIndex: y,
        rotation: 0,
        borderWidth: 2,
        borderColor: Ct[y % Ct.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  if (r === 4) {
    const c = Math.round(t / 2), d = Math.round(n / 2), v = [
      { cx: 0, cy: 0 },
      { cx: c, cy: 0 },
      { cx: 0, cy: d },
      { cx: c, cy: d }
    ];
    return e.slice(0, 4).map((p, m) => {
      const y = p.nativeAspectRatio || (p.sourceWidth && p.sourceHeight ? p.sourceWidth / p.sourceHeight : 1.7777777777777777), { cx: C, cy: j } = v[m], { x: P, y: w, width: g, height: x } = lr(C, j, c, d, y);
      return {
        ...p,
        x: P,
        y: w,
        width: g,
        height: x,
        sourceWidth: p.sourceWidth || 1920,
        sourceHeight: p.sourceHeight || 1080,
        nativeAspectRatio: y,
        aspectRatio: y,
        zIndex: m,
        rotation: 0,
        borderWidth: 2,
        borderColor: Ct[m % Ct.length],
        shadowEffect: "deep",
        borderRadius: 0
      };
    });
  }
  const l = r <= 6 ? 3 : r <= 8 ? 4 : Math.ceil(Math.sqrt(r)), o = Math.ceil(r / l), a = Math.floor(t / l), i = Math.floor(n / o);
  return e.map((c, d) => {
    const v = d % l, p = Math.floor(d / l), m = c.nativeAspectRatio || (c.sourceWidth && c.sourceHeight ? c.sourceWidth / c.sourceHeight : 16 / 9), { x: y, y: C, width: j, height: P } = lr(v * a, p * i, a, i, m);
    return {
      ...c,
      x: y,
      y: C,
      width: j,
      height: P,
      sourceWidth: c.sourceWidth || 1920,
      sourceHeight: c.sourceHeight || 1080,
      nativeAspectRatio: m,
      aspectRatio: m,
      zIndex: d,
      rotation: 0,
      borderWidth: 2,
      borderColor: Ct[d % Ct.length],
      shadowEffect: "deep",
      borderRadius: 0
    };
  });
}
function vx({
  activeStation: e,
  timelineStations: t = [],
  allStations: n = [],
  onSelectActiveStation: r,
  onOpenSpotlight: l,
  onStationContextMenu: o,
  onDeselectStation: a = null,
  stationAutoDirectorMap: i = {},
  onToggleStationAutoDirector: c = null,
  baseEpochMs: d = 0,
  playheadMs: v = 0,
  playheadEpochMs: p = 0,
  timeMode: m = "LOCAL",
  isPlaying: y = !1,
  setIsPlaying: C,
  totalDurationMs: j,
  inPointMs: P = 0,
  outPointMs: w,
  setPlayheadMs: g,
  globalGaps: x = [],
  recordingSegments: I = {},
  playbackSpeed: S = 1,
  onChangePlaybackSpeed: M,
  keystrokeMode: h = "BurnIn",
  keystrokes: $ = [],
  directorPlan: E = null,
  onOverrideDisplay: N,
  onResetOverride: _,
  compositionLayout: U = "canvas",
  onChangeCompositionLayout: R,
  isAutoDirectorEnabled: F = !0,
  onToggleAutoDirector: oe,
  onUpdateCanvasLayout: re,
  canvasLayoutTimeline: X = null,
  onUpdateCanvasLayoutTimeline: D,
  activeKfIndex: K = 0,
  setActiveKfIndex: b,
  isModalOpen: B = !1,
  isGridFullscreen: L = void 0,
  onToggleGridFullscreen: ie = null
}) {
  const ne = p > 0 ? p : d + v, [q, H] = u.useState(() => {
    try {
      return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
    } catch {
      return "top-right";
    }
  }), [Ae, $e] = u.useState(() => {
    var f;
    return ((f = t[0]) == null ? void 0 : f.id) || null;
  }), [Ie, Ue] = u.useState(!1), [xe, Me] = u.useState(null), [nt, gt] = u.useState({ index: null, position: null }), [ce, Ce] = u.useState(!1), [Ve, ze] = u.useState(!1), [st, We] = u.useState(!1), [se, me] = u.useState(!1), [T, Q] = u.useState(!1), [G, te] = u.useState(""), [J, ee] = u.useState(""), he = u.useRef(null), [Ge, _e] = u.useState(() => {
    try {
      const f = localStorage.getItem("itb_canvas_saved_presets");
      return f ? JSON.parse(f) : [];
    } catch {
      return [];
    }
  }), Be = (f) => {
    _e(f);
    try {
      localStorage.setItem("itb_canvas_saved_presets", JSON.stringify(f));
    } catch {
    }
  }, [dt, Je] = u.useState(!1), wt = L !== void 0 ? L : dt, [Et, Gt] = u.useState(!1);
  u.useRef(null);
  const Lt = u.useRef(null), et = u.useRef(null), ht = u.useRef(null), [Tt, rt] = u.useState({ width: 960, height: 540 }), [Re, ot] = u.useState(null), [Zt, _t] = u.useState(!1), [cn, De] = u.useState(null), [Pe, lt] = u.useState(""), ue = u.useRef(null), [Ze, V] = u.useState("");
  u.useEffect(() => {
    cn !== null && ue.current && (ue.current.focus(), ue.current.select());
  }, [cn]), u.useEffect(() => {
    const f = (k) => {
      k.key === "Escape" && (_t(!1), ot(null));
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, []);
  const [pe, ye] = u.useState(!1), [He, qe] = u.useState(!1), [xt, ft] = u.useState(!1), [Qe, Nt] = u.useState(!1), [kt, Ft] = u.useState(!1), [$t, un] = u.useState({ vertical: null, horizontal: null }), [Tn, kn] = u.useState(!0), [hs, ks] = u.useState(!0), [Ut, As] = u.useState(null), [Vn, Vs] = u.useState({ x: 0, y: 0, isInside: !1 }), Kr = u.useRef(null), Bt = u.useRef(null), pn = u.useRef(!1), [Vt, sn] = u.useState("auto-grid"), wn = u.useRef([]), rs = u.useRef([]), Yn = u.useRef(null), [, mn] = u.useState(0), $s = u.useRef(null), [Vr, gn] = u.useState(null), Qt = u.useCallback((f, k = "success", O = "💾") => {
    $s.current && clearTimeout($s.current), gn({ text: f, type: k, icon: O }), $s.current = setTimeout(() => {
      gn(null), $s.current = null;
    }, 2200);
  }, []), [on, Rs] = u.useState(() => {
    const f = X == null ? void 0 : X.resolution;
    if (f && Yi.some((k) => k.id === f))
      return f;
    try {
      const k = localStorage.getItem("itb_studio_canvas_resolution");
      if (k && Yi.some((O) => O.id === k)) return k;
    } catch {
    }
    return "2K";
  }), [bt, ws] = u.useState(() => {
    var Z, Y, W, ae, Te, ve;
    const f = X == null ? void 0 : X.aspectRatio;
    if (f && Qn.some((Ee) => Ee.id === f))
      return f;
    const k = (W = (Y = (Z = X == null ? void 0 : X.keyframes) == null ? void 0 : Z[0]) == null ? void 0 : Y.layout) == null ? void 0 : W.width, O = (ve = (Te = (ae = X == null ? void 0 : X.keyframes) == null ? void 0 : ae[0]) == null ? void 0 : Te.layout) == null ? void 0 : ve.height;
    if (k && O) {
      const Ee = k / O, at = Qn.find((it) => Math.abs(it.ratio - Ee) < 0.04);
      if (at) return at.id;
    }
    try {
      const Ee = localStorage.getItem("itb_studio_canvas_aspect");
      if (Ee && Qn.some((at) => at.id === Ee)) return Ee;
    } catch {
    }
    return gx;
  }), Es = u.useMemo(() => Sr(on, bt), [on, bt]), Oe = Es.w, Le = Es.h, Ys = u.useMemo(() => ({ ...Qn.find((k) => k.id === bt) || Qn[0], w: Oe, h: Le }), [bt, Oe, Le]).ratio, [Xn, ui] = u.useState(() => {
    try {
      const f = localStorage.getItem("itb_studio_canvas_fullwidth");
      if (f !== null) return f === "true";
    } catch {
    }
    return !1;
  }), Dl = u.useCallback(() => {
    ui((f) => {
      const k = !f;
      try {
        localStorage.setItem("itb_studio_canvas_fullwidth", String(k));
      } catch {
      }
      return k;
    });
  }, []), di = u.useMemo(() => {
    const f = [], k = Oe >= 3e3 ? 200 : 100, O = k / 2, Z = k / 10;
    for (let Y = 0; Y <= Oe; Y += Z) {
      const W = Y % k === 0, ae = !W && Y % O === 0;
      f.push({ val: Y, isMajor: W, isMed: ae });
    }
    return f;
  }, [Oe]), hi = u.useMemo(() => {
    const f = [];
    for (let Y = 0; Y <= Le; Y += 10) {
      const W = Y % 100 === 0, ae = !W && Y % 50 === 0;
      f.push({ val: Y, isMajor: W, isMed: ae });
    }
    return f;
  }, [Le]), Yr = u.useCallback((f) => {
    const k = Kr.current || et.current;
    if (!k) return;
    const O = k.getBoundingClientRect(), Z = qt(Math.round((f.clientX - O.left) / O.width * Oe), 0, Oe), Y = qt(Math.round((f.clientY - O.top) / O.height * Le), 0, Le);
    Vs({ x: Z, y: Y, isInside: !0 });
  }, [Oe, Le]), Xr = u.useCallback(() => {
    Vs((f) => ({ ...f, isInside: !1 }));
  }, []), Xs = u.useCallback(() => {
    const f = ht.current;
    if (!f) return;
    const k = f.getBoundingClientRect(), Z = Math.max(320, Math.floor(k.width || 960) - 104 - 16), Y = Math.max(180, Math.floor(k.height || 540) - 16);
    let W, ae;
    Xn ? (W = Z, ae = Math.round(W / Ys)) : Z / Y >= Ys ? (ae = Y, W = Math.round(ae * Ys)) : (W = Z, ae = Math.round(W / Ys)), rt((Te) => Te.width === W && Te.height === ae ? Te : { width: W, height: ae });
  }, [Xn, Ys]);
  u.useEffect(() => {
    const f = ht.current;
    if (!f) return;
    Xs();
    let k = null;
    return typeof ResizeObserver < "u" && (k = new ResizeObserver(() => {
      Xs();
    }), k.observe(f)), window.addEventListener("resize", Xs), () => {
      k && k.disconnect(), window.removeEventListener("resize", Xs);
    };
  }, [Xs]);
  const dn = u.useMemo(() => (t && t.length > 0 ? t : n).map((k) => {
    const O = k.displays && k.displays.length > 0 ? k.displays : k.topology && k.topology.displays && k.topology.displays.length > 0 ? k.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: k.width || 1920, height: k.height || 1080 }], Z = O.find((ve) => ve.isPrimary) || O[0], Y = Z.width || Z.Width || k.width || 1920, W = Z.height || Z.Height || k.height || 1080, ae = Y && W ? Y / W : 16 / 9, Te = O.length > 1;
    return {
      stationId: k.id,
      displayId: "auto",
      label: `${k.displayName || k.roleAlias || k.hostname || k.name} - ${Te ? "Central Composition (Auto-Director)" : "Main Display"}`,
      stationName: k.displayName || k.roleAlias || k.hostname || k.name,
      stationHostname: k.hostname || k.id,
      isPrimary: !0,
      sourceWidth: Y,
      sourceHeight: W,
      nativeAspectRatio: ae,
      aspectRatio: ae,
      width: Y,
      height: W
    };
  }), [t, n]), A = u.useMemo(() => {
    const f = t && t.length > 0 ? t : n, k = [];
    return f.forEach((O) => {
      const Z = O.displays && O.displays.length > 0 ? O.displays : O.topology && O.topology.displays && O.topology.displays.length > 0 ? O.topology.displays : [{ displayId: "mon-0", isPrimary: !0, width: O.width || 1920, height: O.height || 1080 }], Y = Z.find((ve) => ve.isPrimary) || Z[0], W = Y.width || Y.Width || O.width || 1920, ae = Y.height || Y.Height || O.height || 1080, Te = W / ae;
      k.push({
        stationId: O.id,
        displayId: "auto",
        label: `${O.displayName || O.roleAlias || O.hostname || O.name} - ${Z.length > 1 ? "Central Composition" : "Main Display"}`,
        stationName: O.displayName || O.roleAlias || O.hostname || O.name,
        stationHostname: O.hostname || O.id,
        isPrimary: !0,
        sourceWidth: W,
        sourceHeight: ae,
        nativeAspectRatio: Te,
        aspectRatio: Te,
        width: W,
        height: ae
      }), Z.length > 1 && Z.forEach((ve, Ee) => {
        const at = (ve.displayId || `mon-${Ee}`).toLowerCase(), it = ve.displayNumber || Ee + 1, pt = ve.displayName || `Screen ${it}`, ke = ve.width || ve.Width || O.width || 1920, ct = ve.height || ve.Height || O.height || 1080, Ot = ke / ct;
        k.push({
          stationId: O.id,
          displayId: at,
          label: `${O.displayName || O.roleAlias || O.hostname || O.name} - ${pt}`,
          stationName: O.displayName || O.roleAlias || O.hostname || O.name,
          stationHostname: O.hostname || O.id,
          isPrimary: !!ve.isPrimary,
          sourceWidth: ke,
          sourceHeight: ct,
          nativeAspectRatio: Ot,
          aspectRatio: Ot,
          width: ke,
          height: ct
        });
      });
    }), k;
  }, [t, n]), [le, de] = u.useState(() => {
    var f;
    if (((f = X == null ? void 0 : X.keyframes) == null ? void 0 : f.length) > 0) {
      const k = JSON.parse(JSON.stringify(X));
      if (t && t.length > 0) {
        const O = new Set(t.map((Y) => Y.id));
        if (k.keyframes.forEach((Y) => {
          var W, ae;
          ((ae = (W = Y.layout) == null ? void 0 : W.placements) == null ? void 0 : ae.length) > 0 && (Y.layout.placements = Y.layout.placements.filter((Te) => O.has(Te.stationId)));
        }), k.keyframes.some((Y) => {
          var W, ae;
          return ((ae = (W = Y.layout) == null ? void 0 : W.placements) == null ? void 0 : ae.length) > 0;
        })) return k;
      } else
        return k;
    }
    return {
      id: "canvas-timeline-root",
      keyframes: [
        {
          id: "kf_root_0",
          timestampEpochMs: d,
          transitionDurationSec: 0.5,
          transitionType: "smooth",
          layout: {
            width: Xc,
            height: Gc,
            backgroundColor: "#070A10",
            fps: 30,
            placements: er(dn, Xc, Gc)
          }
        }
      ]
    };
  });
  u.useEffect(() => {
    var f;
    if (((f = X == null ? void 0 : X.keyframes) == null ? void 0 : f.length) > 0) {
      const k = JSON.parse(JSON.stringify(X));
      if (t && t.length > 0) {
        const Z = new Set(t.map((Y) => Y.id));
        k.keyframes.forEach((Y) => {
          var W, ae;
          ((ae = (W = Y.layout) == null ? void 0 : W.placements) == null ? void 0 : ae.length) > 0 && (Y.layout.placements = Y.layout.placements.filter((Te) => Z.has(Te.stationId)));
        });
      }
      de(k), k.keyframes.some((Z) => {
        var Y, W;
        return ((W = (Y = Z.layout) == null ? void 0 : Y.placements) == null ? void 0 : W.length) > 0;
      }) && (pn.current = !0, sn("custom"));
    }
  }, [X, t]);
  const fe = le.keyframes || [], be = u.useMemo(() => cx(fe, ne), [fe, ne]), ge = qt(
    K ?? be,
    0,
    Math.max(0, fe.length - 1)
  ), Se = fe[ge] || fe[be] || fe[0], z = u.useMemo(() => {
    var f;
    return ((f = Se == null ? void 0 : Se.layout) == null ? void 0 : f.placements) || [];
  }, [Se]);
  u.useEffect(() => {
    Re >= 0 && z[Re] ? V(z[Re].label ?? "") : V("");
  }, [Re, z]);
  const Ye = u.useCallback((f = "Action") => ({
    label: f,
    timeline: JSON.parse(JSON.stringify(le)),
    resolutionId: on,
    aspectId: bt,
    presetId: Vt,
    selectedFeedIndex: Re
  }), [le, on, bt, Vt, Re]), Fe = u.useCallback((f = "Action") => {
    const k = Ye(f);
    wn.current.push(k), wn.current.length > 50 && wn.current.shift(), rs.current = [], mn((O) => O + 1);
  }, [Ye]), Xe = u.useCallback(() => {
    Yn.current && (wn.current.push(Yn.current), wn.current.length > 50 && wn.current.shift(), rs.current = [], Yn.current = null, mn((f) => f + 1));
  }, []), tt = u.useCallback(() => {
    const f = p > 0 ? p : d + v, k = 500;
    if (f <= d + k) return ge;
    const O = (Se == null ? void 0 : Se.layout) || {
      width: Oe,
      height: Le,
      backgroundColor: "#070A10",
      fps: 30,
      placements: z
    }, { nextTimeline: Z, newIndex: Y, isNew: W } = ph(le, f, O, k);
    return W && (de(Z), D && D(Z), b && b(Y), Qt(
      `Keyframe #${Y + 1} created at ${St(f, m, { includeSeconds: !0 })}`,
      "success",
      "💎"
    )), Y;
  }, [p, d, v, ge, Se, Oe, Le, z, le, D, b, m, Qt]), Ne = u.useCallback((f, k = null) => {
    k && Fe(k);
    const O = p > 0 ? p : d + v;
    de((Z) => {
      const { nextTimeline: Y, newIndex: W, isNewKeyframe: ae } = dx({
        prevTimeline: Z,
        newPlacements: f,
        currentEpochMs: O,
        baseEpochMs: d,
        toleranceMs: 500,
        virtualW: Oe,
        virtualH: Le,
        fps: 30
      });
      return D && D(Y), b && b(W), ae && W > 0 && Qt(
        `Keyframe #${W + 1} created at ${St(O, m, { includeSeconds: !0 })}`,
        "success",
        "💎"
      ), Y;
    });
  }, [p, d, v, Oe, Le, D, b, m, Qt, Fe]);
  u.useEffect(() => {
    if (dn.length > 0 && (!z || z.length === 0) && !pn.current) {
      let f = bt;
      dn.length === 2 && bt === "16:9" && (f = "32:9", ws("32:9"));
      const k = Qn.find((Z) => Z.id === f) || Qn[0], O = er(dn, k.w, k.h);
      O.length > 0 && (Ne(O), sn("auto-grid"));
    }
  }, [dn, z, Ne, bt]);
  const It = u.useRef("");
  u.useEffect(() => {
    const f = (t || []).map((k) => k.id).sort().join(",");
    if (It.current === "") {
      It.current = f;
      return;
    }
    if (It.current !== f && (It.current = f, t && t.length > 0)) {
      const k = new Set(t.map((O) => O.id));
      if (Vt === "auto-grid" || !pn.current) {
        let O = bt;
        dn.length === 2 && bt === "16:9" && (O = "32:9", ws("32:9"));
        const Z = Qn.find((W) => W.id === O) || Qn[0], Y = er(dn, Z.w, Z.h);
        Y.length > 0 && Ne(Y);
      } else if (z && z.length > 0) {
        const O = z.filter((Z) => k.has(Z.stationId));
        if (O.length !== z.length)
          if (O.length === 0) {
            const Z = er(dn, Oe, Le);
            Ne(Z);
          } else
            Ne(O);
      }
    }
  }, [t, dn, Vt, bt, z, Ne, Oe, Le]), u.useEffect(() => {
    re && re({
      width: Oe,
      height: Le,
      resolution: on,
      aspectRatio: bt,
      backgroundColor: "#070A10",
      fps: 30,
      placements: z,
      timeline: le
    }), D && le && D(le);
  }, [z, le, re, D, Oe, Le, on, bt]);
  const rn = u.useCallback((f) => {
    if (on === f) return;
    const k = Sr(on, bt), O = Sr(f, bt);
    Rs(f);
    try {
      localStorage.setItem("itb_studio_canvas_resolution", f);
    } catch {
    }
    const Z = O.w / k.w, Y = O.h / k.h, W = z.map((ae) => ({
      ...ae,
      x: Math.round(ae.x * Z),
      y: Math.round(ae.y * Y),
      width: Math.round(ae.width * Z),
      height: Math.round(ae.height * Y)
    }));
    Ne(W, `Resolution change to ${f}`), Qt(`Canvas Resolution: ${f} (${O.w}×${O.h})`, "info", "📺");
  }, [on, bt, z, Ne, Qt]), zt = u.useCallback((f) => {
    if (bt === f) return;
    const k = Sr(on, bt), O = Sr(on, f);
    ws(f);
    try {
      localStorage.setItem("itb_studio_canvas_aspect", f);
    } catch {
    }
    if (pn.current) {
      const Z = O.w / k.w, Y = O.h / k.h, W = z.map((ae) => ({
        ...ae,
        x: Math.round(ae.x * Z),
        y: Math.round(ae.y * Y),
        width: Math.round(ae.width * Z),
        height: Math.round(ae.height * Y)
      }));
      Ne(W, `Aspect change to ${f}`);
    } else {
      const Z = dn.length > 0 ? dn : z && z.length > 0 ? z : A, Y = er(Z, O.w, O.h);
      Ne(Y, `Aspect change to ${f}`);
    }
    Qt(`Canvas Aspect: ${f} (${O.w}×${O.h})`, "info", "📐");
  }, [bt, on, dn, z, A, Ne, Qt]), hn = u.useCallback((f) => {
    const k = z.length > 0 ? Math.max(...z.map((ve) => ve.zIndex || 0)) + 1 : 0, O = Ct[z.length % Ct.length], Z = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9), Y = Z >= 1 ? 640 : Math.round(360 * Z), W = Z >= 1 ? Math.round(640 / Z) : 360, ae = {
      stationId: f.stationId,
      displayId: f.displayId,
      label: f.label,
      x: 100 + z.length * 40 % 800,
      y: 80 + z.length * 40 % 500,
      width: Y,
      height: W,
      sourceWidth: f.sourceWidth || 1920,
      sourceHeight: f.sourceHeight || 1080,
      nativeAspectRatio: Z,
      aspectRatio: Z,
      zIndex: k,
      rotation: 0,
      borderWidth: 2,
      borderColor: O,
      shadowEffect: "deep",
      borderRadius: 0
    }, Te = [...z, ae];
    Ne(Te), ot(Te.length - 1);
  }, [z, Ne]), _n = u.useCallback((f) => {
    const k = z.filter((O, Z) => Z !== f);
    Ne(k), ot((O) => k.length === 0 ? null : O !== null ? Math.min(O, k.length - 1) : null);
  }, [z, Ne]), Gr = u.useCallback(() => {
    Ne([]), ot(null);
  }, [Ne]), Qr = (f) => {
    const k = f.map((Z, Y) => ({ p: Z, origIdx: Y }));
    k.sort((Z, Y) => (Z.p.zIndex ?? Z.origIdx) - (Y.p.zIndex ?? Y.origIdx));
    const O = [...f];
    return k.forEach(({ origIdx: Z }, Y) => {
      O[Z] = { ...O[Z], zIndex: Y + 1 };
    }), O;
  };
  u.useCallback((f = Re) => {
    if (f < 0 || !z[f]) return;
    const k = Qr(z), O = k[f].zIndex, Z = k.length;
    if (O >= Z) return;
    const Y = k.map((W, ae) => ae === f ? { ...W, zIndex: Z } : W.zIndex > O ? { ...W, zIndex: W.zIndex - 1 } : W);
    Ne(Y);
  }, [Re, z, Ne]), u.useCallback((f = Re) => {
    if (f < 0 || !z[f]) return;
    const k = Qr(z), O = k[f].zIndex;
    if (O <= 1) return;
    const Z = k.map((Y, W) => W === f ? { ...Y, zIndex: 1 } : Y.zIndex < O ? { ...Y, zIndex: Y.zIndex + 1 } : Y);
    Ne(Z);
  }, [Re, z, Ne]);
  const Jr = u.useCallback((f = Re) => {
    if (f < 0 || !z[f]) return;
    const k = Qr(z), O = k[f].zIndex, Z = O + 1;
    if (Z > k.length) return;
    const Y = k.map((W, ae) => ae === f ? { ...W, zIndex: Z } : W.zIndex === Z ? { ...W, zIndex: O } : W);
    Ne(Y);
  }, [Re, z, Ne]), Yu = u.useCallback((f = Re) => {
    if (f < 0 || !z[f]) return;
    const k = Qr(z), O = k[f].zIndex, Z = O - 1;
    if (Z < 1) return;
    const Y = k.map((W, ae) => ae === f ? { ...W, zIndex: Z } : W.zIndex === Z ? { ...W, zIndex: O } : W);
    Ne(Y);
  }, [Re, z, Ne]), Pl = u.useCallback((f) => {
    if (Re < 0 || !z[Re]) return;
    const k = z.map((O, Z) => Z === Re ? { ...O, ...f } : O);
    Ne(k);
  }, [Re, z, Ne]), Oo = u.useCallback((f, k, O = !0) => {
    if (f < 0 || !z[f]) return;
    const Z = typeof k == "string" ? k.trim() : "", Y = Z.length > 0 ? Z : null;
    if (z[f].label === Y) return;
    const W = z.map((ae, Te) => Te === f ? { ...ae, label: Y } : ae);
    Ne(W, O ? "Rename Screen Title" : null);
  }, [z, Ne]), fi = u.useCallback((f) => {
    if (f < 0 || !z[f]) {
      De(null);
      return;
    }
    Oo(f, Pe, !0), De(null);
  }, [z, Pe, Oo]), rm = u.useCallback((f = 90) => {
    const k = z[Re];
    if (!k) return;
    const Z = ((k.rotation || 0) + f) % 360;
    Pl({ rotation: Z });
  }, [Re, z, Pl]), pi = u.useCallback((f = Re) => {
    if (f < 0 || !z[f]) return;
    const k = z.length, O = z.map((Z, Y) => Y === f ? {
      ...Z,
      x: 0,
      y: 0,
      width: Oe,
      height: Le,
      zIndex: k
    } : Z);
    Ne(O);
  }, [Re, z, Ne, Oe, Le]), Gs = u.useCallback((f) => {
    let k = [];
    const O = dn.length > 0 ? dn : A.length > 0 ? A : z;
    switch (f) {
      case "auto":
      case "auto-grid":
        k = er(O, Oe, Le);
        break;
      case "1x1":
        O.length > 0 && (k = [{
          ...O[0],
          x: 0,
          y: 0,
          width: Oe,
          height: Le,
          zIndex: 1,
          rotation: 0,
          borderWidth: 0,
          borderColor: Ct[0],
          shadowEffect: "none",
          borderRadius: 0
        }]);
        break;
      case "1x2":
        if (O.length >= 2) {
          const Z = Math.round(Oe / 2);
          k = O.slice(0, 2).map((Y, W) => {
            const ae = Y.nativeAspectRatio || (Y.sourceWidth && Y.sourceHeight ? Y.sourceWidth / Y.sourceHeight : 1.7777777777777777), { x: Te, y: ve, width: Ee, height: at } = lr(W * Z, 0, Z, Le, ae);
            return {
              ...Y,
              x: Te,
              y: ve,
              width: Ee,
              height: at,
              sourceWidth: Y.sourceWidth || 1920,
              sourceHeight: Y.sourceHeight || 1080,
              nativeAspectRatio: ae,
              aspectRatio: ae,
              zIndex: W + 1,
              rotation: 0,
              borderWidth: 2,
              borderColor: Ct[W % Ct.length],
              shadowEffect: "deep",
              borderRadius: 0
            };
          });
        } else
          k = er(O, Oe, Le);
        break;
      case "2x2": {
        const Z = Math.round(Oe / 2), Y = Math.round(Le / 2);
        k = O.slice(0, 4).map((W, ae) => ({
          ...W,
          x: ae % 2 * Z,
          y: Math.floor(ae / 2) * Y,
          width: Z,
          height: Y,
          zIndex: ae,
          rotation: 0,
          borderWidth: 2,
          borderColor: Ct[ae % Ct.length],
          shadowEffect: "deep",
          borderRadius: 0
        }));
        break;
      }
      case "1+3-pip":
        if (O.length >= 2) {
          k = [
            { ...O[0], x: 0, y: 0, width: Oe, height: Le, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: Ct[0], shadowEffect: "none", borderRadius: 0 }
          ];
          const Z = O.slice(1, 4), Y = Math.round(Oe * 0.23), W = Math.round(Y / (16 / 9));
          Z.forEach((ae, Te) => {
            k.push({
              ...ae,
              x: Oe - Y - 24,
              y: 24 + Te * (W + 16),
              width: Y,
              height: W,
              zIndex: 10 + Te,
              rotation: 0,
              borderWidth: 3,
              borderColor: Ct[(Te + 1) % Ct.length],
              shadowEffect: "glow-cyan",
              borderRadius: 6
            });
          });
        }
        break;
      case "hero-stacked":
        if (O.length >= 3) {
          const Z = Math.round(Oe * 0.666), Y = Oe - Z, W = Math.round(Le / 2);
          k = [
            { ...O[0], x: 0, y: 0, width: Z, height: Le, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: Ct[0], shadowEffect: "deep", borderRadius: 0 },
            { ...O[1], x: Z, y: 0, width: Y, height: W, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: Ct[1], shadowEffect: "deep", borderRadius: 0 },
            { ...O[2], x: Z, y: W, width: Y, height: W, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: Ct[2], shadowEffect: "deep", borderRadius: 0 }
          ];
        }
        break;
      case "3-grid":
        if (O.length >= 3)
          if (Oe / Le >= 2.5) {
            const Y = Math.round(Oe / 3);
            k = O.slice(0, 3).map((W, ae) => {
              const Te = W.nativeAspectRatio || (W.sourceWidth && W.sourceHeight ? W.sourceWidth / W.sourceHeight : 1.7777777777777777), { x: ve, y: Ee, width: at, height: it } = lr(ae * Y, 0, Y, Le, Te);
              return {
                ...W,
                x: ve,
                y: Ee,
                width: at,
                height: it,
                sourceWidth: W.sourceWidth || 1920,
                sourceHeight: W.sourceHeight || 1080,
                nativeAspectRatio: Te,
                aspectRatio: Te,
                zIndex: ae,
                rotation: 0,
                borderWidth: 2,
                borderColor: Ct[ae % Ct.length],
                shadowEffect: "deep",
                borderRadius: 0
              };
            });
          } else {
            const Y = Math.round(Oe / 2), W = Math.round(Le / 2);
            k = [
              { ...O[0], x: 0, y: 0, width: Y, height: W, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: Ct[0], shadowEffect: "deep", borderRadius: 0 },
              { ...O[1], x: Y, y: 0, width: Y, height: W, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: Ct[1], shadowEffect: "deep", borderRadius: 0 },
              { ...O[2], x: Math.round(Y / 2), y: W, width: Y, height: W, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: Ct[2], shadowEffect: "deep", borderRadius: 0 }
            ];
          }
        break;
    }
    k.length > 0 && (Ne(k), ot(0), f === "auto" || f === "auto-grid" ? sn("auto-grid") : (sn(f), pn.current = !0));
  }, [A, z, Ne, Oe, Le]), Xu = u.useCallback(() => {
    const f = G.trim() || `Custom Layout ${Ge.length + 1}`, O = [{
      id: `preset-${Date.now()}`,
      name: f,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(z)),
      keyframes: JSON.parse(JSON.stringify(fe))
    }, ...Ge];
    Be(O), te(""), Ce(!1);
  }, [G, Ge, z, fe]), lm = u.useCallback((f) => {
    !f || !f.placements || (Ne(f.placements), ot(0), sn("custom"), pn.current = !0, ze(!1));
  }, [Ne]), om = u.useCallback((f, k) => {
    k == null || k.stopPropagation();
    const O = Ge.filter((Z) => Z.id !== f);
    Be(O);
  }, [Ge]), am = u.useCallback(() => {
    const f = {
      version: "1.0",
      type: "itb-canvas-layout",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      width: Oe,
      height: Le,
      aspectRatio: bt,
      placements: z,
      timeline: le
    }, k = JSON.stringify(f, null, 2), O = new window.Blob([k], { type: "application/json" }), Z = window.URL.createObjectURL(O), Y = document.createElement("a"), W = /* @__PURE__ */ new Date(), ae = (ve) => String(ve).padStart(2, "0"), Te = `${W.getFullYear()}${ae(W.getMonth() + 1)}${ae(W.getDate())}_${ae(W.getHours())}${ae(W.getMinutes())}${ae(W.getSeconds())}`;
    Y.href = Z, Y.download = `canvas_layout_${Te}.json`, document.body.appendChild(Y), Y.click(), document.body.removeChild(Y), window.URL.revokeObjectURL(Z);
  }, [z, le, Oe, Le, bt]), im = u.useCallback((f) => {
    var Z;
    const k = (Z = f.target.files) == null ? void 0 : Z[0];
    if (!k) return;
    const O = new window.FileReader();
    O.onload = (Y) => {
      var W, ae, Te;
      try {
        const ve = JSON.parse(Y.target.result);
        if (ve.width && ve.height) {
          const at = Qn.find((it) => it.w === ve.width && it.h === ve.height);
          at && ws(at.id);
        } else if (ve.aspectRatio) {
          const at = Qn.find((it) => it.id === ve.aspectRatio);
          at && ws(at.id);
        }
        let Ee = null;
        Array.isArray(ve) ? Ee = ve : ve.placements && Array.isArray(ve.placements) ? Ee = ve.placements : (W = ve.layout) != null && W.placements && Array.isArray(ve.layout.placements) && (Ee = ve.layout.placements), Ee && Ee.length > 0 && (Ne(Ee), ot(0), sn("custom"), pn.current = !0), ((Te = (ae = ve.timeline) == null ? void 0 : ae.keyframes) == null ? void 0 : Te.length) > 0 && (de(ve.timeline), D && D(ve.timeline));
      } catch (ve) {
        console.error("Failed to parse imported canvas JSON:", ve), alert(`Canvas Import Error: ${ve.message}`);
      }
    }, O.readAsText(k), f.target.value = "";
  }, [Ne, D]), mi = (f, k) => {
    if (f.button !== 0) return;
    f.stopPropagation(), f.preventDefault(), ot(k), pn.current = !0, sn("custom");
    const O = tt(), Z = Kr.current || et.current;
    if (!Z) return;
    const Y = Z.getBoundingClientRect(), W = z[k];
    if (!W) return;
    Yn.current = Ye("Move Feed"), Bt.current = {
      mode: "drag",
      index: k,
      startX: f.clientX,
      startY: f.clientY,
      initialX: W.x,
      initialY: W.y,
      initialW: W.width,
      initialH: W.height,
      scaleX: Oe / Y.width,
      scaleY: Le / Y.height,
      activeSnapZone: null
    }, Nt(!0);
    const ae = (ve) => {
      if (!Bt.current || Bt.current.mode !== "drag") return;
      const Ee = Bt.current, at = Kr.current || et.current;
      if (!at) return;
      const it = at.getBoundingClientRect(), pt = (ve.clientX - Ee.startX) * Ee.scaleX, ke = (ve.clientY - Ee.startY) * Ee.scaleY;
      let ct = Math.round(Ee.initialX + pt), Ot = Math.round(Ee.initialY + ke);
      ct = qt(ct, 0, Oe - Ee.initialW), Ot = qt(Ot, 0, Le - Ee.initialH);
      const yt = hs && !ve.altKey;
      let jt = null, An = null, Gn = null;
      if (yt) {
        const Wt = ve.clientX - it.left, Rt = ve.clientY - it.top, Dt = 32, we = Math.round(Oe / 2), vt = Math.round(Le / 2);
        if (Wt <= Dt ? Rt <= it.height * 0.22 ? jt = { x: 0, y: 0, width: we, height: vt, label: "◰ Top-Left Quarter" } : Rt >= it.height * 0.78 ? jt = { x: 0, y: vt, width: we, height: vt, label: "◱ Bottom-Left Quarter" } : jt = { x: 0, y: 0, width: we, height: Le, label: "◧ Left Half (50%)" } : Wt >= it.width - Dt ? Rt <= it.height * 0.22 ? jt = { x: we, y: 0, width: we, height: vt, label: "◲ Top-Right Quarter" } : Rt >= it.height * 0.78 ? jt = { x: we, y: vt, width: we, height: vt, label: "◳ Bottom-Right Quarter" } : jt = { x: we, y: 0, width: we, height: Le, label: "◨ Right Half (50%)" } : Rt <= Dt && Wt >= it.width * 0.25 && Wt <= it.width * 0.75 && (jt = { x: 0, y: 0, width: Oe, height: Le, label: "🗖 Full Canvas Maximize" }), !jt) {
          const jr = z.filter((ut, Cr) => Cr !== Ee.index), Zs = [
            { snapTo: 0, targetX: 0, guide: 0 },
            { snapTo: Oe, targetX: Oe - Ee.initialW, guide: 100 },
            { snapTo: we, targetX: we - Math.round(Ee.initialW / 2), guide: 50 }
          ];
          jr.forEach((ut) => {
            Zs.push({ snapTo: ut.x, targetX: ut.x, guide: ut.x / Oe * 100 }), Zs.push({ snapTo: ut.x + ut.width, targetX: ut.x + ut.width - Ee.initialW, guide: (ut.x + ut.width) / Oe * 100 }), Zs.push({ snapTo: ut.x + ut.width, targetX: ut.x + ut.width, guide: (ut.x + ut.width) / Oe * 100 }), Zs.push({ snapTo: ut.x, targetX: ut.x - Ee.initialW, guide: ut.x / Oe * 100 });
          });
          let qu = 18;
          Zs.forEach((ut) => {
            const Cr = Math.abs(ct - ut.targetX);
            Cr < qu && (qu = Cr, ct = ut.targetX, An = ut.guide);
          });
          const _l = [
            { snapTo: 0, targetY: 0, guide: 0 },
            { snapTo: Le, targetY: Le - Ee.initialH, guide: 100 },
            { snapTo: vt, targetY: vt - Math.round(Ee.initialH / 2), guide: 50 }
          ];
          jr.forEach((ut) => {
            _l.push({ snapTo: ut.y, targetY: ut.y, guide: ut.y / Le * 100 }), _l.push({ snapTo: ut.y + ut.height, targetY: ut.y + ut.height - Ee.initialH, guide: (ut.y + ut.height) / Le * 100 }), _l.push({ snapTo: ut.y + ut.height, targetY: ut.y + ut.height, guide: (ut.y + ut.height) / Le * 100 }), _l.push({ snapTo: ut.y, targetY: ut.y - Ee.initialH, guide: ut.y / Le * 100 });
          });
          let ed = 18;
          _l.forEach((ut) => {
            const Cr = Math.abs(Ot - ut.targetY);
            Cr < ed && (ed = Cr, Ot = ut.targetY, Gn = ut.guide);
          });
        }
      }
      Ee.activeSnapZone = jt, Ee.latestX = ct, Ee.latestY = Ot, As(jt), un({ vertical: An, horizontal: Gn }), de((Wt) => {
        const Rt = [...Wt.keyframes || []], Dt = O < Rt.length ? O : ge;
        if (!Rt[Dt]) return Wt;
        const we = [...Rt[Dt].layout.placements || []];
        return we[Ee.index] ? (we[Ee.index] = { ...we[Ee.index], x: ct, y: Ot }, Rt[Dt] = {
          ...Rt[Dt],
          layout: { ...Rt[Dt].layout, placements: we }
        }, { ...Wt, keyframes: Rt }) : Wt;
      });
    }, Te = () => {
      var ve;
      if (Nt(!1), un({ vertical: null, horizontal: null }), (ve = Bt.current) != null && ve.activeSnapZone) {
        const Ee = Bt.current.activeSnapZone, at = Bt.current.index;
        de((it) => {
          const pt = [...it.keyframes || []], ke = O < pt.length ? O : ge;
          if (!pt[ke]) return it;
          const ct = [...pt[ke].layout.placements || []];
          return ct[at] ? (ct[at] = {
            ...ct[at],
            x: Ee.x,
            y: Ee.y,
            width: Ee.width,
            height: Ee.height
          }, pt[ke] = {
            ...pt[ke],
            layout: { ...pt[ke].layout, placements: ct }
          }, { ...it, keyframes: pt }) : it;
        });
      }
      if (Bt.current) {
        const Ee = Bt.current, at = Ee.initialX, it = Ee.initialY, pt = Ee.activeSnapZone ? Ee.activeSnapZone.x : Ee.latestX ?? at, ke = Ee.activeSnapZone ? Ee.activeSnapZone.y : Ee.latestY ?? it;
        pt !== at || ke !== it ? (Xe(), D && de((ct) => (D(ct), ct))) : Yn.current = null;
      }
      As(null), Bt.current = null, window.removeEventListener("mousemove", ae), window.removeEventListener("mouseup", Te);
    };
    window.addEventListener("mousemove", ae), window.addEventListener("mouseup", Te);
  }, Do = (f, k, O = "br") => {
    if (f.button !== 0) return;
    f.stopPropagation(), f.preventDefault(), ot(k), pn.current = !0, sn("custom");
    const Z = tt();
    if (!et.current) return;
    const Y = et.current.getBoundingClientRect(), W = z[k];
    if (!W) return;
    Yn.current = Ye("Resize Feed");
    const ae = A.find((pt) => pt.stationId === W.stationId && pt.displayId === W.displayId), Te = W.sourceWidth || (ae == null ? void 0 : ae.sourceWidth) || 1920, ve = W.sourceHeight || (ae == null ? void 0 : ae.sourceHeight) || 1080, Ee = W.nativeAspectRatio || W.aspectRatio || (ae == null ? void 0 : ae.nativeAspectRatio) || Te / ve || W.width / W.height || 16 / 9;
    Bt.current = {
      mode: "resize",
      corner: O,
      index: k,
      startX: f.clientX,
      startY: f.clientY,
      initialX: W.x,
      initialY: W.y,
      initialW: W.width,
      initialH: W.height,
      sourceWidth: Te,
      sourceHeight: ve,
      nativeAspectRatio: Ee,
      scaleX: Oe / Y.width,
      scaleY: Le / Y.height
    }, Ft(!0);
    const at = (pt) => {
      if (!Bt.current || Bt.current.mode !== "resize") return;
      const ke = Bt.current, ct = (pt.clientX - ke.startX) * ke.scaleX, Ot = (pt.clientY - ke.startY) * ke.scaleY, yt = pt.ctrlKey || pt.shiftKey || pt.metaKey, jt = ke.nativeAspectRatio > 0 ? ke.nativeAspectRatio : ke.initialW / ke.initialH;
      let An = ke.initialX, Gn = ke.initialY, Wt = ke.initialW, Rt = ke.initialH;
      if (ke.corner === "br") {
        const Dt = Oe - ke.initialX, we = Le - ke.initialY;
        if (yt) {
          let vt = Math.max(160, Math.min(Dt, Math.round(ke.initialW + ct))), mt = Math.round(vt / jt);
          mt > we && (mt = we, vt = Math.round(mt * jt)), mt < 90 && (mt = 90, vt = Math.round(mt * jt)), Wt = vt, Rt = mt;
        } else
          Wt = qt(Math.round(ke.initialW + ct), 160, Dt), Rt = qt(Math.round(ke.initialH + Ot), 90, we);
      } else if (ke.corner === "bl") {
        const Dt = ke.initialX + ke.initialW, we = Le - ke.initialY;
        if (yt) {
          let vt = Math.max(160, Math.min(Dt, Math.round(ke.initialW - ct))), mt = Math.round(vt / jt);
          mt > we && (mt = we, vt = Math.round(mt * jt)), mt < 90 && (mt = 90, vt = Math.round(mt * jt)), Wt = vt, Rt = mt, An = ke.initialX + ke.initialW - Wt;
        } else
          Wt = qt(Math.round(ke.initialW - ct), 160, Dt), Rt = qt(Math.round(ke.initialH + Ot), 90, we), An = ke.initialX + ke.initialW - Wt;
      } else if (ke.corner === "tr") {
        const Dt = Oe - ke.initialX, we = ke.initialY + ke.initialH;
        if (yt) {
          let vt = Math.max(160, Math.min(Dt, Math.round(ke.initialW + ct))), mt = Math.round(vt / jt);
          mt > we && (mt = we, vt = Math.round(mt * jt)), mt < 90 && (mt = 90, vt = Math.round(mt * jt)), Wt = vt, Rt = mt, Gn = ke.initialY + ke.initialH - Rt;
        } else
          Wt = qt(Math.round(ke.initialW + ct), 160, Dt), Rt = qt(Math.round(ke.initialH - Ot), 90, we), Gn = ke.initialY + ke.initialH - Rt;
      } else if (ke.corner === "tl") {
        const Dt = ke.initialX + ke.initialW, we = ke.initialY + ke.initialH;
        if (yt) {
          let vt = Math.max(160, Math.min(Dt, Math.round(ke.initialW - ct))), mt = Math.round(vt / jt);
          mt > we && (mt = we, vt = Math.round(mt * jt)), mt < 90 && (mt = 90, vt = Math.round(mt * jt)), Wt = vt, Rt = mt, An = ke.initialX + ke.initialW - Wt, Gn = ke.initialY + ke.initialH - Rt;
        } else
          Wt = qt(Math.round(ke.initialW - ct), 160, Dt), Rt = qt(Math.round(ke.initialH - Ot), 90, we), An = ke.initialX + ke.initialW - Wt, Gn = ke.initialY + ke.initialH - Rt;
      }
      de((Dt) => {
        const we = [...Dt.keyframes || []], vt = Z < we.length ? Z : ge;
        if (!we[vt]) return Dt;
        const mt = [...we[vt].layout.placements || []];
        return mt[ke.index] ? (mt[ke.index] = {
          ...mt[ke.index],
          x: An,
          y: Gn,
          width: Wt,
          height: Rt,
          sourceWidth: ke.sourceWidth,
          sourceHeight: ke.sourceHeight,
          nativeAspectRatio: ke.nativeAspectRatio,
          aspectRatio: ke.nativeAspectRatio
        }, we[vt] = {
          ...we[vt],
          layout: { ...we[vt].layout, placements: mt }
        }, { ...Dt, keyframes: we }) : Dt;
      });
    }, it = () => {
      if (Bt.current) {
        const pt = Bt.current, ke = pt.latestW ?? pt.initialW, ct = pt.latestH ?? pt.initialH;
        ke !== pt.initialW || ct !== pt.initialH ? (Xe(), D && de((Ot) => (D(Ot), Ot))) : Yn.current = null;
      }
      Ft(!1), Bt.current = null, window.removeEventListener("mousemove", at), window.removeEventListener("mouseup", it);
    };
    window.addEventListener("mousemove", at), window.addEventListener("mouseup", it);
  }, cm = u.useCallback((f) => {
    const k = z[f];
    if (!k) return;
    const O = A.find((Te) => Te.stationId === k.stationId && Te.displayId === k.displayId), Z = k.nativeAspectRatio || k.aspectRatio || (O == null ? void 0 : O.nativeAspectRatio) || (k.sourceWidth && k.sourceHeight ? k.sourceWidth / k.sourceHeight : 16 / 9);
    let Y = k.width, W = Math.round(Y / Z);
    k.y + W > Le && (W = Le - k.y, Y = Math.round(W * Z)), k.x + Y > Oe && (Y = Oe - k.x, W = Math.round(Y / Z));
    const ae = z.map((Te, ve) => ve === f ? {
      ...Te,
      width: Math.max(160, Y),
      height: Math.max(90, W),
      sourceWidth: k.sourceWidth || (O == null ? void 0 : O.sourceWidth) || 1920,
      sourceHeight: k.sourceHeight || (O == null ? void 0 : O.sourceHeight) || 1080,
      nativeAspectRatio: Z,
      aspectRatio: Z
    } : Te);
    Ne(ae, "Snap Native Aspect");
  }, [z, A, Ne]), gi = u.useCallback(() => {
    if (wn.current.length === 0) return;
    const f = Ye("Redo State");
    rs.current.push(f), rs.current.length > 50 && rs.current.shift();
    const k = wn.current.pop();
    k && (de(k.timeline), D && D(k.timeline), k.resolutionId && k.resolutionId !== on && Rs(k.resolutionId), k.aspectId && k.aspectId !== bt && ws(k.aspectId), k.presetId && sn(k.presetId), k.selectedFeedIndex !== void 0 && ot(k.selectedFeedIndex), pn.current = !0, mn((O) => O + 1), Qt(`Undo: ${k.label || "Previous State"}`, "undo", "↺"));
  }, [Ye, D, bt, Qt]), xi = u.useCallback(() => {
    if (rs.current.length === 0) return;
    const f = Ye("Undo State");
    wn.current.push(f), wn.current.length > 50 && wn.current.shift();
    const k = rs.current.pop();
    k && (de(k.timeline), D && D(k.timeline), k.resolutionId && k.resolutionId !== on && Rs(k.resolutionId), k.aspectId && k.aspectId !== bt && ws(k.aspectId), k.presetId && sn(k.presetId), k.selectedFeedIndex !== void 0 && ot(k.selectedFeedIndex), pn.current = !0, mn((O) => O + 1), Qt(`Redo: ${k.label || "Restored State"}`, "info", "↻"));
  }, [Ye, D, bt, Qt]), Gu = u.useCallback(() => {
    const k = [{
      id: "preset-quicksave",
      name: `QuickSave (${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateStr: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      placements: JSON.parse(JSON.stringify(z)),
      keyframes: JSON.parse(JSON.stringify(fe)),
      aspectId: bt,
      width: Oe,
      height: Le
    }, ...Ge.filter((O) => O.id !== "preset-quicksave")];
    Be(k);
    try {
      Up({
        canvasLayoutTimeline: le,
        selectedAspectId: bt,
        selectedPresetId: Vt,
        isFullWidth: Xn
      });
    } catch (O) {
      console.warn("[MulticamViewport] QuickSave session cache flush error:", O);
    }
    Qt(`State Saved (${Oe}×${Le} • ${z.length} Feeds)`, "success", "💾");
  }, [z, fe, bt, Oe, Le, Ge, Be, le, Vt, Xn, Qt]);
  u.useEffect(() => {
    const f = () => gi(), k = () => xi(), O = () => Gu();
    return window.addEventListener("itb:studio-undo", f), window.addEventListener("itb:studio-redo", k), window.addEventListener("itb:studio-save-now", O), () => {
      window.removeEventListener("itb:studio-undo", f), window.removeEventListener("itb:studio-redo", k), window.removeEventListener("itb:studio-save-now", O);
    };
  }, [gi, xi, Gu]);
  const um = u.useCallback(() => {
    if (ie) {
      ie();
      return;
    }
    Je((f) => {
      const k = !f;
      if (k) {
        r && r(null);
        const O = Lt.current;
        O && O.requestFullscreen && O.requestFullscreen().catch(() => {
        });
      } else
        document.fullscreenElement && document.exitFullscreen().catch(() => {
        });
      return k;
    });
  }, [ie, r]), dm = u.useCallback(() => {
    const f = p > 0 ? p : d + v, { nextTimeline: k, newIndex: O, isNew: Z } = ph(
      le,
      f,
      (Se == null ? void 0 : Se.layout) || {
        width: Oe,
        height: Le,
        backgroundColor: "#070A10",
        fps: 30,
        placements: JSON.parse(JSON.stringify(z))
      }
    );
    Z ? (Fe("Add Keyframe"), de(k), D && D(k), b && b(O), Qt(`Keyframe #${O + 1} created at ${St(f, m, { includeSeconds: !0 })}`, "success", "💎")) : (b && b(O), Qt(`Jumped to existing Keyframe #${O + 1}`, "info", "💎"));
  }, [p, d, v, Se, z, Oe, Le, le, D, b, m, Qt, Fe]);
  u.useCallback(() => {
    if (fe.length <= 1 || ge === 0) {
      Qt("Cannot delete the root keyframe (t=0)", "warning", "⚠️");
      return;
    }
    Fe("Delete Keyframe");
    const { nextTimeline: f, success: k, newIndex: O } = hx(le, ge);
    k && (de(f), D && D(f), b && b(O), Qt("Keyframe deleted", "info", "🗑️"));
  }, [fe, ge, le, D, b, Qt, Fe]), u.useCallback((f) => {
    ge !== 0 && (Fe("Update Transition Type"), de((k) => {
      const O = Yc(k, ge, { transitionType: f });
      return D && D(O), O;
    }));
  }, [ge, D, Fe]), u.useCallback((f) => {
    ge !== 0 && (Fe("Update Transition Duration"), de((k) => {
      const O = Yc(k, ge, { transitionDurationSec: f });
      return D && D(O), O;
    }));
  }, [ge, D, Fe]), u.useEffect(() => {
    const f = (k) => {
      if (!(k.target.tagName === "INPUT" || k.target.tagName === "TEXTAREA" || k.target.isContentEditable)) {
        if (k.key === "Delete" || k.key === "Backspace") {
          Re >= 0 && z[Re] && (k.preventDefault(), _n(Re));
          return;
        }
        if ((k.code === "Space" || k.key === " ") && C) {
          k.preventDefault(), C((O) => !O);
          return;
        }
        if ((k.key === "k" || k.key === "K") && !k.ctrlKey && !k.metaKey && !k.altKey) {
          k.preventDefault(), dm();
          return;
        }
        if (k.key === "Escape") {
          Ue(!1), ze(!1), qe(!1), ye(!1), ft(!1), Ce(!1), _t(!1), ot(null);
          return;
        }
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(k.key)) {
          if (Re >= 0 && z[Re]) {
            k.preventDefault(), pn.current = !0, sn("custom");
            const O = k.shiftKey ? 1 : 10;
            let Z = 0, Y = 0;
            k.key === "ArrowLeft" && (Z = -O), k.key === "ArrowRight" && (Z = O), k.key === "ArrowUp" && (Y = -O), k.key === "ArrowDown" && (Y = O);
            const W = z[Re], ae = qt(W.x + Z, 0, Oe - W.width), Te = qt(W.y + Y, 0, Le - W.height), ve = z.map((Ee, at) => at === Re ? { ...Ee, x: ae, y: Te } : Ee);
            Ne(ve);
          }
          return;
        }
        if ((k.key === "r" || k.key === "R") && !k.ctrlKey && !k.metaKey && !k.altKey) {
          k.preventDefault(), kn((O) => !O);
          return;
        }
        if ((k.key === "s" || k.key === "S") && !k.ctrlKey && !k.metaKey && !k.altKey) {
          k.preventDefault(), ks((O) => !O);
          return;
        }
      }
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [Re, z, _n, Ne, kn, ks]);
  const Qu = u.useMemo(() => ux({
    keyframes: fe,
    currentEpochMs: ne,
    currentPlacements: z,
    isEditing: Qe || kt
  }), [Qe, kt, fe, ne, z]), hm = u.useMemo(() => Qu.map((f, k) => ({ ...f, originalIndex: k })).sort((f, k) => (f.zIndex ?? f.originalIndex) - (k.zIndex ?? k.originalIndex)), [Qu]), fm = u.useMemo(() => mx(z, {
    maxConcurrentDecoders: Vp,
    activeAudioStationId: Ae,
    selectedFeedIndex: Re
  }), [z, Ae, Re]), Qs = z[Re] || null, { filteredPlaced: Js, filteredUnplaced: Po } = u.useMemo(() => {
    const f = (J || "").toLowerCase(), k = z.map((W, ae) => {
      const Te = W.zIndex ?? ae + 1, ve = A.find((Ee) => Ee.stationId === W.stationId && Ee.displayId === W.displayId);
      return {
        type: "placed",
        origIdx: ae,
        placement: W,
        feed: ve,
        stationId: W.stationId,
        displayId: W.displayId,
        label: W.label || (ve == null ? void 0 : ve.label) || `${W.stationId} (${W.displayId})`,
        layerRank: Te,
        isSelected: ae === Re,
        sourceWidth: W.sourceWidth || (ve == null ? void 0 : ve.sourceWidth) || 1920,
        sourceHeight: W.sourceHeight || (ve == null ? void 0 : ve.sourceHeight) || 1080
      };
    });
    k.sort((W, ae) => ae.layerRank - W.layerRank);
    const O = A.filter((W) => !z.some((ae) => ae.stationId === W.stationId && ae.displayId === W.displayId)).map((W) => ({
      type: "unplaced",
      feed: W,
      stationId: W.stationId,
      displayId: W.displayId,
      label: W.label,
      layerRank: null,
      isSelected: !1,
      sourceWidth: W.sourceWidth || 1920,
      sourceHeight: W.sourceHeight || 1080
    })), Z = f ? k.filter((W) => W.label.toLowerCase().includes(f)) : k, Y = f ? O.filter((W) => W.label.toLowerCase().includes(f)) : O;
    return { filteredPlaced: Z, filteredUnplaced: Y };
  }, [z, A, Re, J]), Ju = u.useCallback((f, k) => {
    f.stopPropagation(), Me(k), f.dataTransfer.effectAllowed = "copyMove", f.dataTransfer.setData("text/plain", JSON.stringify({
      origIdx: k.origIdx,
      type: k.type,
      stationId: k.stationId,
      displayId: k.displayId
    }));
  }, []), pm = u.useCallback((f, k) => {
    f.preventDefault(), f.stopPropagation(), f.dataTransfer.dropEffect = "move";
    const O = f.currentTarget.getBoundingClientRect(), Z = O.top + O.height / 2, Y = f.clientY < Z ? "above" : "below";
    gt((W) => W.index === k && W.position === Y ? W : { index: k, position: Y });
  }, []), mm = u.useCallback((f, k) => {
    f.stopPropagation(), gt((O) => O.index === k ? { index: null, position: null } : O);
  }, []), Zu = u.useCallback(() => {
    Me(null), gt({ index: null, position: null });
  }, []), gm = u.useCallback((f, k) => {
    f.preventDefault(), f.stopPropagation();
    const O = nt;
    gt({ index: null, position: null }), Me(null);
    const Z = f.dataTransfer.getData("text/plain");
    if (Z)
      try {
        const Y = JSON.parse(Z);
        if (Y.type === "placed") {
          const W = Y.origIdx, ae = Js.findIndex((pt) => pt.origIdx === W);
          if (ae === -1) return;
          let Te = k;
          if (O.position === "below" && (Te += 1), ae < Te && (Te -= 1), ae === Te) return;
          const ve = [...Js], [Ee] = ve.splice(ae, 1);
          ve.splice(Te, 0, Ee);
          const at = ve.length, it = z.map((pt, ke) => {
            const ct = ve.findIndex((Ot) => Ot.origIdx === ke);
            return ct !== -1 ? {
              ...pt,
              zIndex: at - ct
            } : pt;
          });
          Ne(it), ot(Ee.origIdx);
        } else if (Y.type === "unplaced") {
          const W = A.find((jt) => jt.stationId === Y.stationId && jt.displayId === Y.displayId);
          if (!W) return;
          const ae = W.nativeAspectRatio || (W.sourceWidth && W.sourceHeight ? W.sourceWidth / W.sourceHeight : 16 / 9), Te = ae >= 1 ? 640 : Math.round(360 * ae), ve = ae >= 1 ? Math.round(640 / ae) : 360, Ee = Ct[z.length % Ct.length];
          let at = k;
          O.position === "below" && (at += 1);
          const it = {
            stationId: W.stationId,
            displayId: W.displayId,
            label: W.label,
            x: 100 + z.length * 40 % 800,
            y: 80 + z.length * 40 % 500,
            width: Te,
            height: ve,
            sourceWidth: W.sourceWidth || 1920,
            sourceHeight: W.sourceHeight || 1080,
            nativeAspectRatio: ae,
            aspectRatio: ae,
            zIndex: 1,
            rotation: 0,
            borderWidth: 2,
            borderColor: Ee,
            shadowEffect: "deep",
            borderRadius: 0
          }, pt = [...z, it], ke = pt.length - 1, ct = [...Js];
          ct.splice(at, 0, { origIdx: ke });
          const Ot = ct.length, yt = pt.map((jt, An) => {
            const Gn = ct.findIndex((Wt) => Wt.origIdx === An);
            return {
              ...jt,
              zIndex: Gn !== -1 ? Ot - Gn : 1
            };
          });
          Ne(yt), ot(ke);
        }
      } catch (Y) {
        console.warn("Failed to handle layer drag drop:", Y);
      }
  }, [nt, Js, z, A, Ne]), xm = u.useCallback((f) => {
    f.preventDefault();
    const k = f.dataTransfer.getData("text/plain");
    if (!(!k || !et.current))
      try {
        const O = JSON.parse(k), Z = et.current.getBoundingClientRect(), Y = f.clientX - Z.left, W = f.clientY - Z.top, ae = qt(Math.round(Y / Z.width * Oe), 0, Oe - 320), Te = qt(Math.round(W / Z.height * Le), 0, Le - 180);
        if (O.type === "unplaced") {
          const ve = A.find((Ee) => Ee.stationId === O.stationId && Ee.displayId === O.displayId);
          if (ve) {
            const Ee = ve.nativeAspectRatio || (ve.sourceWidth && ve.sourceHeight ? ve.sourceWidth / ve.sourceHeight : 1.7777777777777777), at = Ee >= 1 ? 640 : Math.round(360 * Ee), it = Ee >= 1 ? Math.round(640 / Ee) : 360, pt = z.length > 0 ? Math.max(...z.map((yt) => yt.zIndex || 0)) + 1 : 1, ke = Ct[z.length % Ct.length], ct = {
              stationId: ve.stationId,
              displayId: ve.displayId,
              label: ve.label,
              x: qt(ae, 0, Oe - at),
              y: qt(Te, 0, Le - it),
              width: at,
              height: it,
              sourceWidth: ve.sourceWidth || 1920,
              sourceHeight: ve.sourceHeight || 1080,
              nativeAspectRatio: Ee,
              aspectRatio: Ee,
              zIndex: pt,
              rotation: 0,
              borderWidth: 2,
              borderColor: ke,
              shadowEffect: "deep",
              borderRadius: 0
            }, Ot = [...z, ct];
            Ne(Ot), ot(Ot.length - 1);
          }
        } else if (O.type === "placed" && O.origIdx !== void 0) {
          const ve = z.map((Ee, at) => at === O.origIdx ? {
            ...Ee,
            x: qt(ae, 0, Oe - Ee.width),
            y: qt(Te, 0, Le - Ee.height)
          } : Ee);
          Ne(ve), ot(O.origIdx);
        }
      } catch (O) {
        console.warn("Canvas drop failed:", O);
      }
  }, [A, z, Ne, Oe, Le]);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: Lt,
      className: `multicam-viewport-root canvas-grid ${wt ? "fullscreen-grid-active" : ""}`,
      children: [
        (Qe || kt) && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "canvas-global-drag-shield",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              cursor: Qe ? "grabbing" : "nwse-resize",
              userSelect: "none"
            }
          }
        ),
        Vr && /* @__PURE__ */ s.jsxs("div", { className: `canvas-action-toast ${Vr.type}`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-icon", children: Vr.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "toast-text", children: Vr.text })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-editing-arena", children: /* @__PURE__ */ s.jsxs(
          "div",
          {
            ref: ht,
            className: `canvas-stage-wrapper ${Xn ? "is-full-width-mode" : "is-fit-stage-mode"}`,
            onClick: (f) => {
              var k, O;
              (f.target === ht.current || (O = (k = f.target) == null ? void 0 : k.classList) != null && O.contains("canvas-stage-wrapper")) && (ot(null), _t(!1));
            },
            children: [
              Ie && /* @__PURE__ */ s.jsxs("div", { className: "canvas-side-drawer feeds-layers-drawer", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "header-title-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "🗂️" }),
                    /* @__PURE__ */ s.jsx("span", { children: "FEEDS & LAYERS" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "header-count-pill", children: [
                      z.length,
                      " on canvas"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-drawer", onClick: () => Ue(!1), children: "✕" })
                ] }),
                /* @__PURE__ */ s.jsx("div", { className: "drawer-search", children: /* @__PURE__ */ s.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Filter workstations / displays...",
                    value: J,
                    onChange: (f) => ee(f.target.value)
                  }
                ) }),
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-list-scroll", children: [
                  Js.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                      /* @__PURE__ */ s.jsx("span", { children: "CANVAS LAYERS" }),
                      /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Js.length })
                    ] }),
                    Js.map((f, k) => {
                      const O = xe && xe.type === "placed" && xe.origIdx === f.origIdx, Y = nt.index === k ? nt.position === "above" ? "drop-above" : "drop-below" : "";
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: `feed-layer-row ${f.isSelected ? "is-selected" : ""} ${O ? "is-dragging-row" : ""} ${Y}`,
                          draggable: !0,
                          onDragStart: (W) => Ju(W, f),
                          onDragOver: (W) => pm(W, k),
                          onDragLeave: (W) => mm(W, k),
                          onDrop: (W) => gm(W, k),
                          onDragEnd: Zu,
                          onClick: () => ot(f.origIdx),
                          title: `Drag to reorder layer (${f.label})`,
                          children: [
                            /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag to reorder layer order", children: "⠿" }),
                            /* @__PURE__ */ s.jsxs("span", { className: "layer-rank-badge", title: `Layer Priority: #${f.layerRank}`, children: [
                              "#",
                              f.layerRank
                            ] }),
                            /* @__PURE__ */ s.jsx("span", { className: `status-dot ${f.isSelected ? "active" : ""}` }),
                            /* @__PURE__ */ s.jsx("span", { className: "row-label", title: f.label, children: f.label }),
                            /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                              f.sourceWidth,
                              "×",
                              f.sourceHeight
                            ] }),
                            /* @__PURE__ */ s.jsxs("div", { className: "row-actions", onClick: (W) => W.stopPropagation(), children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => Jr(f.origIdx),
                                  title: "Bring Forward (Layer +1)",
                                  children: "⬆️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => Yu(f.origIdx),
                                  title: "Send Backward (Layer -1)",
                                  children: "⬇️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-remove-row",
                                  onClick: () => _n(f.origIdx),
                                  title: "Remove from canvas",
                                  children: "✕"
                                }
                              )
                            ] })
                          ]
                        },
                        `feed-layer-${f.stationId}-${f.displayId}-${f.origIdx}`
                      );
                    })
                  ] }),
                  Po.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "drawer-section", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "drawer-section-title", children: [
                      /* @__PURE__ */ s.jsx("span", { children: "AVAILABLE FEEDS" }),
                      /* @__PURE__ */ s.jsx("span", { className: "section-count", children: Po.length })
                    ] }),
                    Po.map((f) => {
                      const k = xe && xe.type === "unplaced" && xe.stationId === f.stationId && xe.displayId === f.displayId;
                      return /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          className: `feed-layer-row unplaced ${k ? "is-dragging-row" : ""}`,
                          draggable: !0,
                          onDragStart: (O) => Ju(O, f),
                          onDragEnd: Zu,
                          onClick: () => hn(f.feed),
                          title: `Drag onto canvas or layers, or click to add ${f.label}`,
                          children: [
                            /* @__PURE__ */ s.jsx("span", { className: "drag-handle-grip", title: "Drag onto canvas or layers", children: "⠿" }),
                            /* @__PURE__ */ s.jsx("span", { className: "layer-rank-badge unplaced", children: "＋" }),
                            /* @__PURE__ */ s.jsx("span", { className: "status-dot unplaced" }),
                            /* @__PURE__ */ s.jsx("span", { className: "row-label", title: f.label, children: f.label }),
                            /* @__PURE__ */ s.jsxs("span", { className: "row-res", children: [
                              f.sourceWidth,
                              "×",
                              f.sourceHeight
                            ] }),
                            /* @__PURE__ */ s.jsx("div", { className: "row-actions", onClick: (O) => O.stopPropagation(), children: /* @__PURE__ */ s.jsx(
                              "button",
                              {
                                type: "button",
                                className: "btn-add-row",
                                onClick: () => hn(f.feed),
                                title: "Add to canvas",
                                children: "＋ ADD"
                              }
                            ) })
                          ]
                        },
                        `unplaced-feed-${f.stationId}-${f.displayId}`
                      );
                    })
                  ] }),
                  Js.length === 0 && Po.length === 0 && /* @__PURE__ */ s.jsx("div", { className: "drawer-empty-search", children: "No matching workstation feeds found." })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "drawer-footer-actions", children: [
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action auto", onClick: () => Gs("auto"), children: "⊞ ADD ALL FEEDS" }),
                  /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-drawer-action clear", onClick: Gr, children: "🗑️ CLEAR CANVAS" })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "canvas-stage-assembly", children: [
                /* @__PURE__ */ s.jsxs("aside", { className: "canvas-left-wing-dock", children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${Ie ? "active" : ""}`,
                      onClick: () => Ue((f) => !f),
                      title: `Feeds & Layers Palette (${z.length}/${A.length} on canvas)`,
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗂️" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: z.length }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "FEEDS" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs("div", { className: "wing-popout-wrapper", children: [
                    /* @__PURE__ */ s.jsxs(
                      "button",
                      {
                        type: "button",
                        className: `btn-wing-tool ${st ? "active" : ""}`,
                        onClick: () => {
                          We((f) => !f), me(!1);
                        },
                        title: "Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)",
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "⊞" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "GRID" })
                        ]
                      }
                    ),
                    st && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                      /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "LAYOUT PRESETS" }),
                      /* @__PURE__ */ s.jsxs(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${Vt === "auto-grid" ? "active" : ""}`,
                          onClick: () => {
                            sn("auto-grid"), Gs("auto-grid"), We(!1);
                          },
                          children: [
                            /* @__PURE__ */ s.jsx("span", { children: "⊞ AUTO-GRID" }),
                            /* @__PURE__ */ s.jsx("span", { className: "item-badge", children: (() => {
                              const f = new Set((t && t.length > 0 ? t : n).map((Z) => Z.id)), k = (z || []).filter((Z) => f.has(Z.stationId)), O = (t && t.length > 0 ? t : n).filter((Z) => !k.some((Y) => Y.stationId === Z.id));
                              return k.length > 0 ? k.length + O.length : dn.length;
                            })() })
                          ]
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${Vt === "1x1" ? "active" : ""}`,
                          onClick: () => {
                            sn("1x1"), Gs("1x1"), We(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x1 FOCUS" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${Vt === "1x2" ? "active" : ""}`,
                          onClick: () => {
                            sn("1x2"), Gs("1x2"), We(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1x2 DUAL" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${Vt === "2x2" ? "active" : ""}`,
                          onClick: () => {
                            sn("2x2"), Gs("2x2"), We(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 2x2 QUAD" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${Vt === "1+3-pip" ? "active" : ""}`,
                          onClick: () => {
                            sn("1+3-pip"), Gs("1+3-pip"), We(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ 1+3 PIP" })
                        }
                      ),
                      /* @__PURE__ */ s.jsx(
                        "button",
                        {
                          type: "button",
                          className: `popout-item ${Vt === "hero-stacked" ? "active" : ""}`,
                          onClick: () => {
                            sn("hero-stacked"), Gs("hero-stacked"), We(!1);
                          },
                          children: /* @__PURE__ */ s.jsx("span", { children: "⊞ HERO+2" })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "wing-popout-wrapper", children: [
                    /* @__PURE__ */ s.jsxs(
                      "button",
                      {
                        type: "button",
                        className: `btn-wing-tool ${T ? "active" : ""}`,
                        onClick: () => {
                          Q((f) => !f), me(!1), We(!1);
                        },
                        title: `Canvas Resolution: ${on} (${Oe}×${Le}px) - Click to change`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📺" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: on })
                        ]
                      }
                    ),
                    T && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                      /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "CANVAS RESOLUTION" }),
                      Yi.map((f) => {
                        const k = Sr(f.id, bt);
                        return /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: `popout-item ${on === f.id ? "active" : ""}`,
                            onClick: () => {
                              rn(f.id), Q(!1);
                            },
                            children: [
                              /* @__PURE__ */ s.jsx("span", { children: f.label }),
                              /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                                k.w,
                                "×",
                                k.h
                              ] })
                            ]
                          },
                          f.id
                        );
                      })
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "wing-popout-wrapper", children: [
                    /* @__PURE__ */ s.jsxs(
                      "button",
                      {
                        type: "button",
                        className: `btn-wing-tool ${se ? "active" : ""}`,
                        onClick: () => {
                          me((f) => !f), Q(!1), We(!1);
                        },
                        title: `Aspect Ratio: ${bt} (${Oe}×${Le}px) - Click to change`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📐" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: bt })
                        ]
                      }
                    ),
                    se && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout left-side-popout", children: [
                      /* @__PURE__ */ s.jsx("div", { className: "popout-title", children: "CANVAS ASPECT" }),
                      Qn.map((f) => {
                        const k = Sr(on, f.id);
                        return /* @__PURE__ */ s.jsxs(
                          "button",
                          {
                            type: "button",
                            className: `popout-item ${bt === f.id ? "active" : ""}`,
                            onClick: () => {
                              zt(f.id), me(!1);
                            },
                            children: [
                              /* @__PURE__ */ s.jsx("span", { children: f.label }),
                              /* @__PURE__ */ s.jsxs("span", { className: "dimmed-size", children: [
                                k.w,
                                "×",
                                k.h
                              ] })
                            ]
                          },
                          f.id
                        );
                      })
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${Xn ? "highlight-emerald" : "highlight-cyan"}`,
                      onClick: Dl,
                      title: Xn ? "100% Width (Click for FIT PAGE)" : "Fit Page (Click for 100% Width)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: Xn ? "↔" : "⊞" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: Xn ? "100%" : "FIT" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${hs ? "active" : ""}`,
                      onClick: () => ks((f) => !f),
                      title: hs ? "Aero Snap & Smart Guides: ON (S)" : "Aero Snap: OFF (S)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🧲" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "SNAP" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${Tn ? "active" : ""}`,
                      onClick: () => kn((f) => !f),
                      title: Tn ? "CAD Rulers: ON (R)" : "CAD Rulers: OFF (R)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📏" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "RULER" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool",
                      onClick: gi,
                      disabled: wn.current.length === 0,
                      title: "Undo (Ctrl+Z)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "↺" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "UNDO" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool",
                      onClick: xi,
                      disabled: rs.current.length === 0,
                      title: "Redo (Ctrl+Y)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "↻" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "REDO" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ s.jsxs(
                  "div",
                  {
                    ref: (f) => {
                      et.current = f, Kr.current = f;
                    },
                    className: `canvas-master-frame-16-9 ${Xn ? "is-full-width" : "is-fit-stage"}`,
                    style: {
                      width: Tt.width > 180 ? `${Tt.width}px` : "100%",
                      height: Tt.height > 100 ? `${Tt.height}px` : "auto",
                      aspectRatio: `${Oe} / ${Le}`
                    },
                    onMouseMove: Yr,
                    onMouseLeave: Xr,
                    onDragOver: (f) => {
                      f.preventDefault(), f.dataTransfer.dropEffect = "copy";
                    },
                    onDrop: xm,
                    onClick: (f) => {
                      var k, O, Z, Y, W, ae;
                      (f.target === et.current || (O = (k = f.target) == null ? void 0 : k.classList) != null && O.contains("canvas-master-frame-16-9") || (Y = (Z = f.target) == null ? void 0 : Z.classList) != null && Y.contains("corner-accent") || (ae = (W = f.target) == null ? void 0 : W.classList) != null && ae.contains("canvas-work-surface")) && (ot(null), _t(!1));
                    },
                    children: [
                      /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-left" }),
                      /* @__PURE__ */ s.jsx("div", { className: "corner-accent top-right" }),
                      /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-left" }),
                      /* @__PURE__ */ s.jsx("div", { className: "corner-accent bottom-right" }),
                      Ut && /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "canvas-snap-ghost-preview",
                          style: {
                            position: "absolute",
                            left: `${Ut.x / Oe * 100}%`,
                            top: `${Ut.y / Le * 100}%`,
                            width: `${Ut.width / Oe * 100}%`,
                            height: `${Ut.height / Le * 100}%`,
                            zIndex: 9990,
                            pointerEvents: "none"
                          },
                          children: /* @__PURE__ */ s.jsxs("div", { className: "snap-ghost-badge", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "snap-icon", children: "🧲" }),
                            /* @__PURE__ */ s.jsx("span", { className: "snap-label", children: Ut.label })
                          ] })
                        }
                      ),
                      Tn && /* @__PURE__ */ s.jsxs("div", { className: "canvas-rulers-container", children: [
                        /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-corner", title: `Virtual Canvas Bounds: ${Oe}×${Le}px`, children: /* @__PURE__ */ s.jsx("span", { className: "corner-coord-mini", children: Vn.isInside ? `${Vn.x},${Vn.y}` : "px" }) }),
                        /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-top-bar", children: /* @__PURE__ */ s.jsxs(
                          "svg",
                          {
                            className: "canvas-ruler-svg-x",
                            viewBox: `0 0 ${Oe} 20`,
                            preserveAspectRatio: "none",
                            children: [
                              Qs && /* @__PURE__ */ s.jsx(
                                "rect",
                                {
                                  x: Qs.x,
                                  y: "0",
                                  width: Qs.width,
                                  height: "20",
                                  fill: "rgba(6, 182, 212, 0.25)",
                                  stroke: "#06B6D4",
                                  strokeWidth: "1"
                                }
                              ),
                              di.map((f) => f.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                                /* @__PURE__ */ s.jsx("line", { x1: f.val, y1: "0", x2: f.val, y2: "18", stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                                /* @__PURE__ */ s.jsx("text", { x: f.val + 2, y: "11", fill: "#94A3B8", fontSize: "9", fontFamily: "monospace", children: f.val })
                              ] }, `rx-${f.val}`) : f.isMed ? /* @__PURE__ */ s.jsx("line", { x1: f.val, y1: "8", x2: f.val, y2: "18", stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `rx-${f.val}`) : /* @__PURE__ */ s.jsx("line", { x1: f.val, y1: "13", x2: f.val, y2: "18", stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `rx-${f.val}`)),
                              Vn.isInside && /* @__PURE__ */ s.jsx(
                                "line",
                                {
                                  x1: Vn.x,
                                  y1: "0",
                                  x2: Vn.x,
                                  y2: "20",
                                  stroke: "#06B6D4",
                                  strokeWidth: "2"
                                }
                              )
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ s.jsx("div", { className: "canvas-ruler-left-bar", children: /* @__PURE__ */ s.jsxs(
                          "svg",
                          {
                            className: "canvas-ruler-svg-y",
                            viewBox: `0 0 20 ${Le}`,
                            preserveAspectRatio: "none",
                            children: [
                              Qs && /* @__PURE__ */ s.jsx(
                                "rect",
                                {
                                  x: "0",
                                  y: Qs.y,
                                  width: "20",
                                  height: Qs.height,
                                  fill: "rgba(6, 182, 212, 0.25)",
                                  stroke: "#06B6D4",
                                  strokeWidth: "1"
                                }
                              ),
                              hi.map((f) => f.isMajor ? /* @__PURE__ */ s.jsxs("g", { children: [
                                /* @__PURE__ */ s.jsx("line", { x1: "0", y1: f.val, x2: "18", y2: f.val, stroke: "rgba(255,255,255,0.4)", strokeWidth: "1" }),
                                /* @__PURE__ */ s.jsx("text", { x: "2", y: f.val - 2, fill: "#94A3B8", fontSize: "8", fontFamily: "monospace", children: f.val })
                              ] }, `ry-${f.val}`) : f.isMed ? /* @__PURE__ */ s.jsx("line", { x1: "8", y1: f.val, x2: "18", y2: f.val, stroke: "rgba(255,255,255,0.25)", strokeWidth: "1" }, `ry-${f.val}`) : /* @__PURE__ */ s.jsx("line", { x1: "13", y1: f.val, x2: "18", y2: f.val, stroke: "rgba(255,255,255,0.12)", strokeWidth: "1" }, `ry-${f.val}`)),
                              Vn.isInside && /* @__PURE__ */ s.jsx(
                                "line",
                                {
                                  x1: "0",
                                  y1: Vn.y,
                                  x2: "20",
                                  y2: Vn.y,
                                  stroke: "#06B6D4",
                                  strokeWidth: "2"
                                }
                              )
                            ]
                          }
                        ) })
                      ] }),
                      $t.vertical !== null && /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "canvas-snap-guide-v",
                          style: {
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: `${$t.vertical}%`,
                            width: "2px",
                            background: "#06B6D4",
                            boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                            zIndex: 9999,
                            pointerEvents: "none"
                          }
                        }
                      ),
                      $t.horizontal !== null && /* @__PURE__ */ s.jsx(
                        "div",
                        {
                          className: "canvas-snap-guide-h",
                          style: {
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: `${$t.horizontal}%`,
                            height: "2px",
                            background: "#06B6D4",
                            boxShadow: "0 0 10px #06B6D4, 0 0 4px #FFFFFF",
                            zIndex: 9999,
                            pointerEvents: "none"
                          }
                        }
                      ),
                      z.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "canvas-empty-state-guide", children: [
                        /* @__PURE__ */ s.jsx("div", { className: "empty-icon", children: "🎨" }),
                        /* @__PURE__ */ s.jsx("h3", { children: "MANUAL CANVAS STUDIO" }),
                        /* @__PURE__ */ s.jsx("p", { children: "The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template." }),
                        /* @__PURE__ */ s.jsxs("div", { className: "empty-actions-row", children: [
                          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-add", onClick: () => Ue(!0), children: "＋ OPEN FEEDS & LAYERS" }),
                          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-empty-preset", onClick: () => Gs("auto"), children: "⊞ AUTO-PACK ALL SCREENS" })
                        ] })
                      ] }),
                      hm.map((f) => {
                        var Dt;
                        const k = f.originalIndex, O = Re === k, Z = Qe && Re === k, Y = kt && Re === k, W = (n.length > 0 ? n : t).find(
                          (we) => {
                            var vt, mt, jr, Zs;
                            return we.id === f.stationId || ((vt = we.hostname) == null ? void 0 : vt.toLowerCase()) === ((mt = f.stationId) == null ? void 0 : mt.toLowerCase()) || ((jr = we.id) == null ? void 0 : jr.toLowerCase()) === ((Zs = f.stationId) == null ? void 0 : Zs.toLowerCase());
                          }
                        ), ae = A.find((we) => we.stationId === f.stationId && we.displayId === f.displayId), Te = W || {
                          id: f.stationId,
                          hostname: (ae == null ? void 0 : ae.stationHostname) || f.stationHostname || f.stationId,
                          displayName: (ae == null ? void 0 : ae.stationName) || f.label || f.stationId,
                          displays: ae ? [{ displayId: ae.displayId, width: ae.sourceWidth, height: ae.sourceHeight }] : []
                        }, ve = (Te == null ? void 0 : Te.displays) || ((Dt = Te == null ? void 0 : Te.topology) == null ? void 0 : Dt.displays) || [], Ee = z.filter(
                          (we) => we.stationId === f.stationId || Te && (we.stationId === Te.id || we.stationId === Te.hostname)
                        ), at = ve.length > 1 && Ee.length >= ve.length, it = f.borderColor || Ct[k % Ct.length], pt = f.borderWidth !== void 0 ? f.borderWidth : 2, ke = f.rotation || 0, ct = f.shadowEffect || "deep", Ot = f.borderRadius || 0, yt = f.x / Oe * 100, jt = f.y / Le * 100, An = f.width / Oe * 100, Gn = f.height / Le * 100, Wt = yx(ct, O, it);
                        f.y < 50, f.x < 100, f.x + f.width > Oe - 100;
                        const Rt = f.zIndex !== void 0 ? f.zIndex : k + 1;
                        return /* @__PURE__ */ s.jsxs(
                          "div",
                          {
                            className: `canvas-feed-card-box ${O ? "is-selected" : ""} ${Z ? "is-dragging" : ""} ${Y ? "is-resizing" : ""}`,
                            style: {
                              position: "absolute",
                              left: `${yt}%`,
                              top: `${jt}%`,
                              width: `${An}%`,
                              height: `${Gn}%`,
                              zIndex: Z || Y ? 2e3 : O ? 1e3 + Rt * 10 : Rt * 10,
                              transformOrigin: "center center",
                              border: `${pt}px solid ${it}`,
                              borderRadius: `${Ot}px`,
                              boxShadow: Wt,
                              opacity: f.opacity !== void 0 ? f.opacity : 1,
                              pointerEvents: f.opacity !== void 0 && f.opacity < 0.1 ? "none" : "auto",
                              cursor: Z ? "grabbing" : "grab",
                              transition: Z || Y ? "none" : "left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out"
                            },
                            onMouseDown: (we) => mi(we, k),
                            onContextMenu: (we) => {
                              we.preventDefault(), we.stopPropagation(), ot(k), _t(!0);
                            },
                            onClick: (we) => {
                              we.stopPropagation(), ot(k);
                            },
                            children: [
                              /* @__PURE__ */ s.jsxs(
                                "div",
                                {
                                  className: "box-header-badge",
                                  onMouseDown: (we) => mi(we, k),
                                  onDoubleClick: () => pi(k),
                                  title: "Click and drag to move window (Double-click to expand 1x1)",
                                  children: [
                                    /* @__PURE__ */ s.jsxs("div", { className: "badge-title", children: [
                                      /* @__PURE__ */ s.jsx("span", { className: "badge-drag-grip", children: "⠿" }),
                                      /* @__PURE__ */ s.jsx("span", { className: "dot-indicator" }),
                                      cn === k ? /* @__PURE__ */ s.jsxs(
                                        "span",
                                        {
                                          className: "badge-title-edit-container",
                                          onClick: (we) => we.stopPropagation(),
                                          onMouseDown: (we) => we.stopPropagation(),
                                          onDoubleClick: (we) => we.stopPropagation(),
                                          children: [
                                            /* @__PURE__ */ s.jsx(
                                              "input",
                                              {
                                                ref: ue,
                                                type: "text",
                                                className: "badge-title-input",
                                                value: Pe,
                                                placeholder: `${Te.displayName || f.stationId} (${f.displayId})`,
                                                onChange: (we) => lt(we.target.value),
                                                onKeyDown: (we) => {
                                                  we.stopPropagation(), we.key === "Enter" ? (we.preventDefault(), fi(k)) : we.key === "Escape" && (we.preventDefault(), De(null));
                                                },
                                                onBlur: () => fi(k)
                                              }
                                            ),
                                            /* @__PURE__ */ s.jsx(
                                              "button",
                                              {
                                                type: "button",
                                                className: "btn-edit-title is-saving",
                                                onClick: (we) => {
                                                  we.stopPropagation(), fi(k);
                                                },
                                                title: "Save screen title (Enter)",
                                                children: "✓"
                                              }
                                            )
                                          ]
                                        }
                                      ) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                                        /* @__PURE__ */ s.jsx(
                                          "span",
                                          {
                                            className: "badge-title-text",
                                            onDoubleClick: (we) => {
                                              we.stopPropagation(), De(k), lt(f.label || "");
                                            },
                                            title: "Double-click to rename screen (burned into video)",
                                            children: f.label || `${Te.displayName || f.stationId} (${f.displayId})`
                                          }
                                        ),
                                        /* @__PURE__ */ s.jsx(
                                          "button",
                                          {
                                            type: "button",
                                            className: "btn-edit-title",
                                            onClick: (we) => {
                                              we.stopPropagation(), De(k), lt(f.label || "");
                                            },
                                            title: "Rename screen title (burned into video)",
                                            children: "✏️"
                                          }
                                        )
                                      ] })
                                    ] }),
                                    /* @__PURE__ */ s.jsxs("div", { className: "badge-coords", children: [
                                      Math.round(f.width),
                                      "×",
                                      Math.round(f.height),
                                      " (",
                                      tl(f.width, f.height),
                                      ") @ (",
                                      Math.round(f.x),
                                      ",",
                                      Math.round(f.y),
                                      ")",
                                      ke !== 0 && /* @__PURE__ */ s.jsxs("span", { className: "badge-rot", children: [
                                        "📐",
                                        ke,
                                        "°"
                                      ] })
                                    ] }),
                                    /* @__PURE__ */ s.jsxs("span", { className: "badge-layer", title: `Layer priority rank: #${Rt}`, children: [
                                      "#$",
                                      Rt
                                    ] }),
                                    /* @__PURE__ */ s.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: `btn-badge-action-inspector ${O && Zt ? "active" : ""}`,
                                        onClick: (we) => {
                                          we.stopPropagation(), ot(k), _t((vt) => !vt || Re !== k);
                                        },
                                        title: "Window Controls & Styling (Right-click window)",
                                        children: "⚙️"
                                      }
                                    )
                                  ]
                                }
                              ),
                              /* @__PURE__ */ s.jsxs("div", { className: "feed-content-viewport", children: [
                                /* @__PURE__ */ s.jsx(
                                  "div",
                                  {
                                    className: "feed-rotation-surface",
                                    style: {
                                      width: "100%",
                                      height: "100%",
                                      transform: ke ? `rotate(${ke}deg)` : void 0,
                                      transformOrigin: "center center",
                                      transition: Z ? "none" : "transform 0.2s ease-out"
                                    },
                                    children: /* @__PURE__ */ s.jsx(
                                      rx,
                                      {
                                        station: Te,
                                        isSolo: !1,
                                        currentEpochMs: ne,
                                        timeMode: m,
                                        isPlaying: y,
                                        setIsPlaying: C,
                                        baseEpochMs: d,
                                        totalDurationMs: j,
                                        outPointMs: w,
                                        setPlayheadMs: g,
                                        globalGaps: x,
                                        onOpenSpotlight: l,
                                        onSelectActiveStation: null,
                                        recordingSegments: I,
                                        playbackSpeed: S,
                                        activeAudioStationId: Ae,
                                        onSoloAudio: $e,
                                        directorPlan: E || (Te == null ? void 0 : Te.directorPlan),
                                        isAutoDirectorEnabled: i ? i[Te.id] ?? !0 : !0,
                                        stationsCount: t.length,
                                        onDeselectStation: a,
                                        targetDisplayId: f.displayId,
                                        onSelectDisplayId: (we) => {
                                          const vt = z.map((mt, jr) => jr === k ? { ...mt, displayId: we } : mt);
                                          Ne(vt);
                                        },
                                        areAllDisplaysPlaced: at,
                                        slotIndex: k,
                                        borderColor: it,
                                        isDecoderAllowed: fm[k] ?? !0,
                                        maxHeight: px(
                                          Math.round((f.width || 1920) * (((Tt == null ? void 0 : Tt.width) || 960) / Oe)),
                                          Math.round((f.height || 1080) * (((Tt == null ? void 0 : Tt.height) || 540) / Le))
                                        )
                                      }
                                    )
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "div",
                                  {
                                    className: "card-drag-surface",
                                    onMouseDown: (we) => mi(we, k),
                                    onDoubleClick: () => pi(k),
                                    title: "Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                                  }
                                )
                              ] }),
                              O && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                                /* @__PURE__ */ s.jsx(
                                  "div",
                                  {
                                    className: "resize-handle-corner resize-handle-tl",
                                    onMouseDown: (we) => Do(we, k, "tl"),
                                    title: `Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${tl(f.sourceWidth, f.sourceHeight)})`
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "div",
                                  {
                                    className: "resize-handle-corner resize-handle-tr",
                                    onMouseDown: (we) => Do(we, k, "tr"),
                                    title: `Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${tl(f.sourceWidth, f.sourceHeight)})`
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "div",
                                  {
                                    className: "resize-handle-corner resize-handle-bl",
                                    onMouseDown: (we) => Do(we, k, "bl"),
                                    title: `Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${tl(f.sourceWidth, f.sourceHeight)})`
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "div",
                                  {
                                    className: "resize-handle-corner resize-handle-br",
                                    onMouseDown: (we) => Do(we, k, "br"),
                                    title: `Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${tl(f.sourceWidth, f.sourceHeight)})`,
                                    children: "↘"
                                  }
                                )
                              ] })
                            ]
                          },
                          `feed-${f.stationId}-${f.displayId}-${k}`
                        );
                      }),
                      !B && Zt && Re !== null && Qs && (() => {
                        const f = Qs, k = Re, O = f.borderColor || Ct[k % Ct.length], Z = f.borderWidth !== void 0 ? f.borderWidth : 2, Y = f.rotation || 0, W = f.shadowEffect || "deep", ae = f.zIndex !== void 0 ? f.zIndex : k + 1, Te = f.x / Oe * 100, ve = f.width / Oe * 100, Ee = Te + ve / 2;
                        let at = `${Ee}%`, it = "translateX(-50%)";
                        Ee < 28 ? (at = `${Math.max(1, Te)}%`, it = "none") : Ee > 72 && (at = `${Math.min(99, Te + ve)}%`, it = "translateX(-100%)");
                        const pt = f.y + f.height + 8;
                        let ke;
                        pt + 45 > Le ? ke = `${Math.max(20, (f.y + f.height - 44) / Le * 100)}%` : ke = `${pt / Le * 100}%`;
                        const ct = (n.length > 0 ? n : t).find(
                          (yt) => {
                            var jt, An;
                            return yt.id === f.stationId || ((jt = yt.hostname) == null ? void 0 : jt.toLowerCase()) === ((An = f.stationId) == null ? void 0 : An.toLowerCase());
                          }
                        ), Ot = ct ? ct.id : f.stationId;
                        return /* @__PURE__ */ s.jsxs(
                          "div",
                          {
                            className: "floating-feed-inspector compact-hud-inspector",
                            style: {
                              position: "absolute",
                              left: at,
                              top: ke,
                              transform: it,
                              zIndex: 99999
                            },
                            onMouseDown: (yt) => yt.stopPropagation(),
                            onClick: (yt) => yt.stopPropagation(),
                            children: [
                              /* @__PURE__ */ s.jsxs("span", { className: "inspector-screen-pill", title: `Active Screen: ${f.label || Ot} • Layer #${ae}`, children: [
                                "🎛️ #$",
                                ae
                              ] }),
                              /* @__PURE__ */ s.jsxs("div", { className: "inspector-group title-rename-group", children: [
                                /* @__PURE__ */ s.jsx("span", { className: "inspector-group-label", children: "TITLE:" }),
                                /* @__PURE__ */ s.jsx(
                                  "input",
                                  {
                                    type: "text",
                                    className: "inspector-title-input",
                                    value: Ze,
                                    placeholder: `${(ct == null ? void 0 : ct.displayName) || f.stationId} (${f.displayId})`,
                                    onChange: (yt) => V(yt.target.value),
                                    onKeyDown: (yt) => {
                                      yt.key === "Enter" && (yt.preventDefault(), Oo(Re, Ze));
                                    },
                                    onBlur: () => {
                                      Oo(Re, Ze);
                                    },
                                    title: "Rename screen feed (displayed on canvas and burned into exported video)"
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ s.jsxs("div", { className: "inspector-group color-swatch-group", children: [
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-mini-tool color-swatch-trigger",
                                    onClick: () => ft((yt) => !yt),
                                    title: "🎨 Frame Color: Choose border color",
                                    children: /* @__PURE__ */ s.jsx(
                                      "span",
                                      {
                                        className: "swatch-circle",
                                        style: { backgroundColor: O === "transparent" ? "#1E293B" : O }
                                      }
                                    )
                                  }
                                ),
                                xt && /* @__PURE__ */ s.jsx("div", { className: "compact-color-palette-popover", children: xx.map((yt) => /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: `btn-color-dot ${O === yt ? "is-active" : ""}`,
                                    style: { backgroundColor: yt === "transparent" ? "#1E293B" : yt },
                                    onClick: () => {
                                      Pl({ borderColor: yt }), ft(!1);
                                    },
                                    title: yt === "transparent" ? "No Border (Transparent)" : `Border Color: ${yt}`
                                  },
                                  yt
                                )) })
                              ] }),
                              /* @__PURE__ */ s.jsxs(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool",
                                  onClick: () => {
                                    const yt = [0, 2, 4, 8], jt = yt[(yt.indexOf(Z) + 1) % yt.length];
                                    Pl({ borderWidth: jt });
                                  },
                                  title: `Border Width: ${Z}px (Click to cycle: 0px → 2px → 4px → 8px)`,
                                  children: [
                                    "📏 ",
                                    Z,
                                    "px"
                                  ]
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-mini-tool ${W !== "none" ? "highlight-glow" : ""}`,
                                  onClick: () => {
                                    const yt = ["none", "deep", "glow-cyan", "glow-emerald"], jt = yt[(yt.indexOf(W) + 1) % yt.length];
                                    Pl({ shadowEffect: jt });
                                  },
                                  title: `Shadow Effect: ${W} (Click to cycle: None → Cinema → Cyan Glow → Emerald Glow)`,
                                  children: "🌑"
                                }
                              ),
                              /* @__PURE__ */ s.jsxs("div", { className: "mini-layer-dock", children: [
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-mini-tool",
                                    onClick: () => Jr(k),
                                    title: "Step Layer Up (+1)",
                                    children: "▲"
                                  }
                                ),
                                /* @__PURE__ */ s.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-mini-tool",
                                    onClick: () => Yu(k),
                                    title: "Step Layer Down (-1)",
                                    children: "▼"
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool",
                                  onClick: () => rm(90),
                                  title: `Rotate: Step 90° clockwise (Current: ${Y}°)`,
                                  children: "↺ 90°"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool highlight",
                                  onClick: () => cm(k),
                                  title: `Snap to Native Recorded Aspect (${tl(f.sourceWidth, f.sourceHeight)})`,
                                  children: "📐 NATIVE"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool highlight",
                                  onClick: () => pi(k),
                                  title: "1x1 Focus Mode (Double-click window to toggle)",
                                  children: "⛶ 1x1"
                                }
                              ),
                              l && /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool",
                                  onClick: () => l(Ot, f.displayId),
                                  title: "Deep Forensic Multi-Angle Spotlight",
                                  children: "🔍"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool btn-del-feed",
                                  onClick: () => _n(k),
                                  title: "Remove Screen from Canvas",
                                  children: "🗑️"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "btn-mini-tool btn-close-inspector",
                                  onClick: () => {
                                    ot(null), _t(!1);
                                  },
                                  title: "Deselect & Finish Editing (Esc)",
                                  children: "✕"
                                }
                              )
                            ]
                          }
                        );
                      })(),
                      /* @__PURE__ */ s.jsx(
                        ox,
                        {
                          currentEpochMs: ne,
                          position: q,
                          onPositionChange: (f) => {
                            H(f);
                            try {
                              localStorage.setItem("itb_canvas_utc_clock_pos", f);
                            } catch {
                            }
                          }
                        }
                      ),
                      /* @__PURE__ */ s.jsx(ax, {})
                    ]
                  }
                ),
                /* @__PURE__ */ s.jsxs("aside", { className: "canvas-right-wing-dock", children: [
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool highlight-emerald",
                      onClick: () => Ce(!0),
                      title: "Save current canvas layout as custom preset",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "💾" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "SAVE" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "wing-popout-wrapper", children: [
                    /* @__PURE__ */ s.jsxs(
                      "button",
                      {
                        type: "button",
                        className: `btn-wing-tool ${Ve ? "active" : ""}`,
                        onClick: () => ze((f) => !f),
                        title: `Saved Presets Library (${Ge.length})`,
                        children: [
                          /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📁" }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-badge", children: Ge.length }),
                          /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "PRESETS" })
                        ]
                      }
                    ),
                    Ve && /* @__PURE__ */ s.jsxs("div", { className: "wing-floating-popout right-side-popout", children: [
                      /* @__PURE__ */ s.jsxs("div", { className: "popout-header", children: [
                        /* @__PURE__ */ s.jsx("span", { children: "SAVED PRESETS" }),
                        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-pop", onClick: () => ze(!1), children: "✕" })
                      ] }),
                      /* @__PURE__ */ s.jsx("div", { className: "presets-list-scroll", children: Ge.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "empty-presets-hint", children: "No saved custom presets yet." }) : Ge.map((f) => {
                        var k;
                        return /* @__PURE__ */ s.jsxs("div", { className: "saved-preset-item", onClick: () => {
                          lm(f), ze(!1);
                        }, children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "preset-item-info", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "preset-item-name", children: f.name }),
                            /* @__PURE__ */ s.jsxs("span", { className: "preset-item-meta", children: [
                              ((k = f.placements) == null ? void 0 : k.length) || 0,
                              " screens • ",
                              f.dateStr
                            ] })
                          ] }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-del-preset",
                              onClick: (O) => om(f.id, O),
                              title: "Delete saved preset",
                              children: "🗑️"
                            }
                          )
                        ] }, f.id);
                      }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool",
                      onClick: am,
                      title: "Export Canvas Layout to .json file",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📤" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "EXPORT" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool",
                      onClick: () => {
                        var f;
                        return (f = he.current) == null ? void 0 : f.click();
                      },
                      title: "Import Canvas Layout from .json file",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "📥" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "IMPORT" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      ref: he,
                      type: "file",
                      accept: ".json",
                      style: { display: "none" },
                      onChange: im
                    }
                  ),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool highlight-rose",
                      onClick: () => {
                        pn.current = !1, sn("auto-grid");
                        const f = dn.length > 0 ? dn : A, k = er(f, Oe, Le), O = {
                          id: "canvas-timeline-root",
                          keyframes: [
                            {
                              id: "kf_root_0",
                              timestampEpochMs: d,
                              transitionDurationSec: 0.5,
                              transitionType: "smooth",
                              layout: {
                                width: Oe,
                                height: Le,
                                backgroundColor: "#070A10",
                                fps: 30,
                                placements: k
                              }
                            }
                          ]
                        };
                        de(O), D && D(O), ot(0);
                      },
                      title: "Reset Canvas: Auto-Grid arrangement of all available screens",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "↺" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "RESET" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-wing-tool",
                      onClick: Gr,
                      title: "Clear Canvas: Remove all screens",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: "🗑️" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: "CLEAR" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ s.jsx("div", { className: "wing-divider" }),
                  /* @__PURE__ */ s.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `btn-wing-tool ${wt ? "active" : ""}`,
                      onClick: um,
                      title: "Fullscreen Canvas Grid (F)",
                      children: [
                        /* @__PURE__ */ s.jsx("span", { className: "tool-icon", children: wt ? "⤓" : "⛶" }),
                        /* @__PURE__ */ s.jsx("span", { className: "tool-label", children: wt ? "EXIT" : "FULL" })
                      ]
                    }
                  )
                ] })
              ] }),
              " "
            ]
          }
        ) }),
        " ",
        ce && /* @__PURE__ */ s.jsx("div", { className: "canvas-modal-backdrop", onClick: () => Ce(!1), children: /* @__PURE__ */ s.jsxs("div", { className: "canvas-modal-card", onClick: (f) => f.stopPropagation(), children: [
          /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ s.jsx("span", { children: "💾 SAVE CANVAS LAYOUT PRESET" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: () => Ce(!1), children: "✕" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
            /* @__PURE__ */ s.jsx("label", { className: "input-label", children: "Preset Name:" }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                className: "input-preset-name",
                placeholder: "e.g. Command Dual Screen Setup, Tactical Quad",
                value: G,
                onChange: (f) => te(f.target.value),
                autoFocus: !0,
                onKeyDown: (f) => {
                  f.key === "Enter" && Xu();
                }
              }
            ),
            /* @__PURE__ */ s.jsxs("p", { className: "modal-hint", children: [
              "This saves the exact positions, dimensions, rotation, borders, and shadows of all ",
              z.length,
              " screens so you can load them anytime in future editing sessions."
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-cancel", onClick: () => Ce(!1), children: "Cancel" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-modal-confirm", onClick: Xu, children: "Save Preset" })
          ] })
        ] }) })
      ]
    }
  );
}
const Xi = [0.5, 1, 1.25, 1.5, 2, 4];
function Qc({
  activeStationId: e,
  isPlaying: t,
  setIsPlaying: n,
  isLooping: r = !0,
  setIsLooping: l,
  _playheadMs: o = 0,
  setPlayheadMs: a,
  inPointMs: i = 0,
  outPointMs: c = 36e5,
  totalDurationMs: d = 36e5,
  hasGridPlacements: v = !0,
  onStepFrameForward: p,
  onStepFrameBackward: m,
  playbackSpeed: y = 1,
  onChangeSpeed: C,
  onSetInPoint: j,
  onSetOutPoint: P
}) {
  const [w, g] = u.useState(() => jl()), { volume: x, isMuted: I } = w, S = !!(v && d > 0);
  u.useEffect(() => {
    const X = (D) => {
      D.detail && g(D.detail);
    };
    return window.addEventListener("itb-audio-state-changed", X), () => window.removeEventListener("itb-audio-state-changed", X);
  }, []);
  const M = u.useCallback((X, D, K) => {
    const b = {
      volume: typeof X == "number" ? X : x,
      isMuted: typeof D == "boolean" ? D : I,
      channelMode: K || w.channelMode || "both"
    };
    g(b), qg(b);
  }, [x, I, w.channelMode]), h = (X) => {
    X == null || X.stopPropagation(), S && n(!t);
  }, $ = (X) => {
    if (X == null || X.stopPropagation(), !S || !C) return;
    const D = Xi.indexOf(y), K = D === -1 ? 1 : (D + 1) % Xi.length;
    C(Xi[K]);
  }, E = (X) => {
    X == null || X.stopPropagation(), I ? M(x === 0 ? 0.5 : x, !1) : M(x, !0);
  }, N = (X) => {
    X.stopPropagation();
    const D = parseFloat(X.target.value);
    D === 0 ? M(0, !0) : M(D, !1);
  }, _ = (X) => {
    const D = u.useRef(null), K = u.useRef(null), b = u.useRef(0), B = u.useCallback(() => {
      D.current && clearTimeout(D.current), K.current && clearInterval(K.current), D.current = null, K.current = null;
    }, []), L = u.useCallback((ne = 1) => {
      if (n && n(!1), a) {
        const q = 33 * ne;
        a((H) => {
          const Ae = X === "forward" ? H + q : H - q;
          return Math.max(0, Math.min(d, Ae));
        });
      } else X === "forward" && p ? p() : X === "backward" && m && m();
    }, [X]), ie = u.useCallback((ne) => {
      ne.preventDefault(), ne.stopPropagation(), S && (B(), L(1), b.current = performance.now(), D.current = setTimeout(() => {
        K.current = setInterval(() => {
          const q = performance.now() - b.current, H = q > 2500 ? 4 : q > 1e3 ? 2 : 1;
          L(H);
        }, 50);
      }, 280));
    }, [L, B]);
    return u.useEffect(() => B, [B]), {
      onMouseDown: ie,
      onMouseUp: B,
      onMouseLeave: B,
      onTouchStart: ie,
      onTouchEnd: B
    };
  }, U = _("backward"), R = _("forward"), F = (X) => {
    X.stopPropagation(), S && (n && n(!1), a && a(i));
  }, oe = (X) => {
    X.stopPropagation(), S && (n && n(!1), a && a(c));
  }, re = () => I || x === 0 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
    /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
    /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
  ] }) : x < 0.5 ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
    /* @__PURE__ */ s.jsx("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" })
  ] }) : /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
    /* @__PURE__ */ s.jsx("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }),
    /* @__PURE__ */ s.jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" })
  ] });
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `transport-bar-root ${S ? "is-expanded" : "is-compact-disabled"}`,
      title: S ? "" : "Playback ready",
      children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-speed-badge",
            disabled: !S,
            onClick: $,
            title: "Playback Speed",
            children: [
              y,
              "x"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-cut-action cut-in",
            disabled: !j,
            onClick: (X) => {
              X.stopPropagation(), j == null || j();
            },
            title: "Set CUT IN to current Playhead (Key: I)",
            children: "[ IN"
          }
        ),
        /* @__PURE__ */ s.jsxs("div", { className: "transport-controls-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-ctrl-action btn-loop ${r ? "active-loop" : ""}`,
              disabled: !S,
              onClick: (X) => {
                X.stopPropagation(), l && l(!r);
              },
              title: r ? "Repeat/Loop Range (ON)" : "Repeat/Loop Range (OFF)",
              children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("polyline", { points: "17 1 21 5 17 9" }),
                /* @__PURE__ */ s.jsx("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" }),
                /* @__PURE__ */ s.jsx("polyline", { points: "7 23 3 19 7 15" }),
                /* @__PURE__ */ s.jsx("path", { d: "M21 13v2a4 4 0 0 1-4 4H3" })
              ] })
            }
          ),
          /* @__PURE__ */ s.jsx("div", { className: "divider" }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-ctrl-action btn-jump-cut accent-in",
              disabled: !S,
              onClick: F,
              title: "Jump to Start of Cut (IN Point)",
              children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "5", y1: "5", x2: "5", y2: "19", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round" }),
                /* @__PURE__ */ s.jsx("polygon", { points: "19 19 8 12 19 5 19 19", fill: "currentColor" })
              ] })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-ctrl-action btn-step",
              disabled: !S,
              ...U,
              title: "Step 1 Frame Back (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "16 5 7 12 16 19 16 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-play-hero ${t ? "playing" : ""}`,
              disabled: !S,
              onClick: h,
              title: t ? "Pause (Space)" : "Play (Space)",
              children: t ? /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: [
                /* @__PURE__ */ s.jsx("rect", { x: "6", y: "4", width: "4", height: "16", rx: "1.5" }),
                /* @__PURE__ */ s.jsx("rect", { x: "14", y: "4", width: "4", height: "16", rx: "1.5" })
              ] }) : /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "7 4 20 12 7 20 7 4" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-ctrl-action btn-step",
              disabled: !S,
              ...R,
              title: "Step 1 Frame Forward (Hold to continuous scrub)",
              children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "8 5 17 12 8 19 8 5" }) })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-ctrl-action btn-jump-cut accent-out",
              disabled: !S,
              onClick: oe,
              title: "Jump to End of Cut (OUT Point)",
              children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("polygon", { points: "5 5 16 12 5 19 5 5", fill: "currentColor" }),
                /* @__PURE__ */ s.jsx("line", { x1: "19", y1: "5", x2: "19", y2: "19", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round" })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-cut-action cut-out",
            disabled: !P,
            onClick: (X) => {
              X.stopPropagation(), P == null || P();
            },
            title: "Set CUT OUT to current Playhead (Key: O)",
            children: "OUT ]"
          }
        ),
        S && /* @__PURE__ */ s.jsxs("div", { className: "audio-control-cluster", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-audio-mute ${I || x === 0 ? "is-muted" : ""}`,
              onClick: E,
              title: I ? "Unmute" : `Mute (${Math.round(x * 100)}%)`,
              children: re()
            }
          ),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "1",
              step: "0.05",
              value: I ? 0 : x,
              onChange: N,
              className: "volume-slider"
            }
          )
        ] })
      ]
    }
  );
}
const ya = 2500, Nx = {
  // Mouse and control keys
  1: "LButton",
  2: "RButton",
  3: "Cancel",
  4: "MButton",
  5: "XButton1",
  6: "XButton2",
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Ctrl",
  18: "Alt",
  19: "Pause",
  20: "Caps Lock",
  27: "Esc",
  32: "Space",
  33: "Page Up",
  34: "Page Down",
  35: "End",
  36: "Home",
  37: "Left",
  38: "Up",
  39: "Right",
  40: "Down",
  41: "Select",
  42: "Print",
  43: "Execute",
  44: "Print Screen",
  45: "Insert",
  46: "Delete",
  47: "Help",
  // Top row digits (0-9)
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",
  // Latin alphabet (A-Z)
  65: "A",
  66: "B",
  67: "C",
  68: "D",
  69: "E",
  70: "F",
  71: "G",
  72: "H",
  73: "I",
  74: "J",
  75: "K",
  76: "L",
  77: "M",
  78: "N",
  79: "O",
  80: "P",
  81: "Q",
  82: "R",
  83: "S",
  84: "T",
  85: "U",
  86: "V",
  87: "W",
  88: "X",
  89: "Y",
  90: "Z",
  // System / Windows keys
  91: "Win",
  92: "RWin",
  93: "Apps",
  95: "Sleep",
  // Numpad
  96: "Num 0",
  97: "Num 1",
  98: "Num 2",
  99: "Num 3",
  100: "Num 4",
  101: "Num 5",
  102: "Num 6",
  103: "Num 7",
  104: "Num 8",
  105: "Num 9",
  106: "Num *",
  107: "Num +",
  108: "Separator",
  109: "Num -",
  110: "Num .",
  111: "Num /",
  // Function keys (F1 - F24)
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  124: "F13",
  125: "F14",
  126: "F15",
  127: "F16",
  128: "F17",
  129: "F18",
  130: "F19",
  131: "F20",
  132: "F21",
  133: "F22",
  134: "F23",
  135: "F24",
  // Locks
  144: "Num Lock",
  145: "Scroll Lock",
  // Specific modifier keys (Left & Right)
  160: "Shift",
  161: "RShift",
  162: "Ctrl",
  163: "RCtrl",
  164: "Alt",
  165: "RAlt",
  // Browser navigation keys
  166: "Browser Back",
  167: "Browser Forward",
  168: "Browser Refresh",
  169: "Browser Stop",
  170: "Browser Search",
  171: "Browser Favorites",
  172: "Browser Home",
  // Media & Volume controls
  173: "Mute",
  174: "Vol -",
  175: "Vol +",
  176: "Next Track",
  177: "Prev Track",
  178: "Stop",
  179: "Play/Pause",
  180: "Mail",
  181: "Media Select",
  182: "App 1",
  183: "App 2",
  // OEM punctuation and symbols
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'",
  226: "\\"
};
function kx(e) {
  if (!e) return "";
  const t = e.trim(), n = t.match(/^Key\((\d+)\)$/i);
  if (n) {
    const l = parseInt(n[1], 10);
    return Nx[l] || `Key(${l})`;
  }
  const r = t.toLowerCase();
  return r === "ctrl" || r === "control" ? "Ctrl" : r === "shift" ? "Shift" : r === "alt" ? "Alt" : r === "win" || r === "windows" ? "Win" : r === "rctrl" ? "Ctrl" : r === "rshift" ? "Shift" : r === "ralt" ? "Alt" : r === "backspace" ? "Backspace" : r === "enter" || r === "return" ? "Enter" : r === "escape" || r === "esc" ? "Esc" : r === "space" ? "Space" : r === "delete" || r === "del" ? "Delete" : r === "capslock" || r === "caps lock" ? "Caps Lock" : t;
}
function Yp(e) {
  if (!e || typeof e != "string") return [];
  const n = e.split("+").map((o) => o.trim()).filter(Boolean).map(kx), r = /* @__PURE__ */ new Set(), l = [];
  for (const o of n)
    o && (r.has(o) || (r.add(o), l.push(o)));
  return l;
}
function Xp(e, t = " + ") {
  return Yp(e).join(t);
}
function Yl(e) {
  return Xp(e, "+");
}
const wx = 8;
function Ex({
  activeStationName: e = "",
  stationHostname: t = "",
  stations: n = [],
  keystrokes: r = null,
  baseEpochMs: l = 0,
  timeMode: o = "LOCAL",
  viewportStartMs: a = 0,
  viewportDurationMs: i = 36e5,
  pixelWidth: c = 1e3,
  onSeek: d
}) {
  const [v, p] = u.useState([]), [, m] = u.useState(!1), y = u.useMemo(() => n && Array.isArray(n) && n.length > 0 ? n.map((x) => ({
    id: x.id,
    name: x.displayName || x.hostname || x.name || x.id,
    hostname: x.hostname || x.id
  })) : t || e ? [{
    id: t || e,
    name: e || t,
    hostname: t || e
  }] : [], [n, t, e]);
  u.useEffect(() => {
    if (r && Array.isArray(r) && r.length > 0)
      return;
    if (!y.length || !l || i <= 0) {
      p([]);
      return;
    }
    const x = new AbortController(), I = Math.max(0, l + a - ya), S = l + a + i + ya;
    m(!0);
    const M = y.map((h) => {
      const $ = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(h.hostname)}&startEpoch=${I}&endEpoch=${S}`;
      return fetch($, { signal: x.signal }).then((E) => E.ok ? E.json() : []).then((E) => (Array.isArray(E) ? E : []).map((N) => ({
        ...N,
        stationId: h.id,
        stationName: h.name
      }))).catch((E) => {
        if (E.name !== "AbortError") return [];
        throw E;
      });
    });
    return Promise.all(M).then((h) => {
      const $ = h.flat();
      p($), m(!1);
    }).catch((h) => {
      h.name !== "AbortError" && (p([]), m(!1));
    }), () => x.abort();
  }, [y, l, a, i, r]);
  const C = r && Array.isArray(r) && r.length > 0 ? r : v, j = u.useMemo(() => {
    if (!C.length || i <= 0 || c <= 0)
      return [];
    const x = l + a, I = x + i, S = [...C].sort((E, N) => E.epochMs - N.epochMs), M = [];
    let h = null, $ = -999;
    for (const E of S) {
      const N = E.epochMs + ya;
      if (N < x || N > I)
        continue;
      const _ = N - l, U = (_ - a) / i * c;
      if (h && U - $ < wx) {
        h.events.push(E), h.endOffsetMs = _, h.endEpochMs = N;
        const R = new Set(h.events.map((F) => F.stationName || "Workstation"));
        h.isMultiStation = R.size > 1, h.stationCount = R.size, $ = U;
      } else {
        const R = (_ - a) / i * 100;
        h = {
          id: `kc_${E.epochMs}_${M.length}`,
          startOffsetMs: _,
          endOffsetMs: _,
          startEpochMs: N,
          endEpochMs: N,
          pct: R,
          events: [E],
          isMultiStation: !1,
          stationCount: 1
        }, M.push(h), $ = U;
      }
    }
    return M;
  }, [C, l, a, i, c]);
  function P(x) {
    if (!x.events.length) return "";
    if (x.events.length === 1)
      return Yl(x.events[0].keyCombination);
    const I = x.events.find((h) => h.keyCombination.includes("+"));
    if (I) {
      const h = Yl(I.keyCombination);
      return x.events.length > 1 ? `${h} (+${x.events.length - 1})` : h;
    }
    const S = Yl(x.events[0].keyCombination);
    return x.events.every((h) => Yl(h.keyCombination) === S) ? `${S} ×${x.events.length}` : `${S} (+${x.events.length - 1})`;
  }
  function w(x, I = "LOCAL") {
    return St(x, I);
  }
  function g(x) {
    const I = [];
    for (const S of x) {
      const M = Yl(S.keyCombination);
      I.length && I[I.length - 1].key === M ? I[I.length - 1].count++ : I.push({ key: M, count: 1 });
    }
    return I;
  }
  return j.length ? /* @__PURE__ */ s.jsx("div", { className: "timeline-keystrokes-layer", children: j.map((x) => {
    const I = x.events.length, S = I > 1, M = x.isMultiStation, h = P(x), $ = w(x.startEpochMs, o), E = x.pct < 10 ? "edge-left" : x.pct > 90 ? "edge-right" : "", N = {};
    return x.events.forEach((_) => {
      const U = _.stationName || e || "Workstation";
      N[U] || (N[U] = []), N[U].push(_);
    }), /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `keystroke-tick-node ${S ? "is-cluster" : "is-single"} ${M ? "is-multi-station" : ""}`,
        style: { left: `${x.pct}%` },
        onClick: (_) => {
          _.stopPropagation(), d && d(x.startOffsetMs);
        },
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "keystroke-tick-line" }),
          /* @__PURE__ */ s.jsxs("div", { className: "keystroke-pip-anchor", title: `${h} at ${$}`, children: [
            /* @__PURE__ */ s.jsx("div", { className: "keystroke-pip-glyph" }),
            S && /* @__PURE__ */ s.jsx("span", { className: "keystroke-pip-count", children: M ? `${x.stationCount}S` : I > 9 ? "9+" : I })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: `keystroke-tooltip ${E}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "tooltip-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-type", children: M ? `MULTICAM KEYSTROKES (${x.stationCount} WORKSTATIONS • ${I} EVT)` : S ? `KEYSTROKE BURST (${I})` : "KEYSTROKE" }),
              /* @__PURE__ */ s.jsx("span", { className: "tooltip-time", children: $ })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-station-sections-container", children: Object.entries(N).map(([_, U]) => {
              const R = g(U);
              return /* @__PURE__ */ s.jsxs("div", { className: "tooltip-station-row", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "station-row-badge", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "station-mini-icon", children: "🖥️" }),
                  /* @__PURE__ */ s.jsx("span", { className: "station-title", children: _ }),
                  /* @__PURE__ */ s.jsxs("span", { className: "station-count", children: [
                    "(",
                    U.length,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "tooltip-keys-list", children: [
                  R.slice(0, 6).map((F, oe) => /* @__PURE__ */ s.jsxs("span", { className: "tooltip-key-pill", children: [
                    F.key,
                    F.count > 1 ? ` ×${F.count}` : ""
                  ] }, oe)),
                  R.length > 6 && /* @__PURE__ */ s.jsxs("span", { className: "tooltip-more", children: [
                    "+",
                    R.length - 6,
                    " more"
                  ] })
                ] })
              ] }, _);
            }) }),
            /* @__PURE__ */ s.jsx("div", { className: "tooltip-hint", children: "Click to seek playhead" })
          ] })
        ]
      },
      x.id
    );
  }) }) : null;
}
const jx = u.memo(Ex), Gi = [
  1e3,
  2e3,
  5e3,
  1e4,
  15e3,
  3e4,
  6e4,
  12e4,
  3e5,
  6e5,
  9e5,
  18e5,
  36e5,
  72e5,
  144e5,
  216e5,
  432e5,
  864e5
], Cx = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function Sx({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  totalDurationMs: l = 36e5,
  hoverMs: o = null,
  onHoverChange: a,
  onSeek: i,
  inPointMs: c = null,
  outPointMs: d = null,
  earliestMediaMs: v = null,
  movieBoundaries: p = null,
  stationHostname: m = "",
  activeStationName: y = "",
  showKeystrokes: C = !0,
  keystrokes: j = []
}) {
  const P = u.useRef(null), [w, g] = u.useState(1e3);
  u.useEffect(() => {
    if (!P.current) return;
    const L = new ResizeObserver((ie) => {
      for (let ne of ie)
        ne.contentRect.width > 50 && g(ne.contentRect.width);
    });
    return L.observe(P.current), () => L.disconnect();
  }, []);
  const x = u.useCallback((L) => !r || r <= 0 ? "0%" : `${(L - n) / r * 100}%`, [r, n]), I = u.useCallback((L) => {
    const ne = (L - n) / r * 100;
    return ne >= -5 && ne <= 105;
  }, [n, r]), S = (L) => {
    if (!P.current) return;
    const ie = P.current.getBoundingClientRect(), ne = Math.max(0, Math.min(L.clientX - ie.left, ie.width)), q = Math.round(n + ne / ie.width * r);
    a && a(q);
  }, M = () => {
    a && a(null);
  }, h = (L) => {
    if (!P.current || !i) return;
    const ie = P.current.getBoundingClientRect(), ne = Math.max(0, Math.min(L.clientX - ie.left, ie.width)), q = Math.round(n + ne / ie.width * r);
    i(Math.max(0, Math.min(l, q)));
  }, $ = u.useMemo(() => {
    const L = Math.max(3, Math.floor(w / 95)), ie = r / L;
    for (let ne of Gi)
      if (ne >= ie) return ne;
    return Gi[Gi.length - 1];
  }, [r, w]), E = u.useMemo(() => {
    if (!e || r <= 0) return [];
    const L = e + n, ie = L + r, ne = t === "LOCAL" ? Bs(L).offsetMin * 60 * 1e3 : 0, q = L + ne, H = Math.ceil(q / $) * $, Ae = [];
    for (let $e = H; $e <= ie + ne; $e += $) {
      const Ie = $e - ne, Ue = (Ie - L) / r * 100;
      Ue >= 0 && Ue <= 100 && Ae.push({
        epoch: Ie,
        pct: Ue,
        label: St(Ie, t, {
          includeSeconds: $ < 6e4
        })
      });
    }
    return Ae;
  }, [e, n, r, $, t]), N = u.useMemo(() => {
    if (t === "UTC" || !e) return [];
    const L = e + n, ie = L + r;
    return Fp(L, ie).map((ne) => ({
      ...ne,
      pct: (ne.switchEpochMs - e - n) / r * 100
    }));
  }, [e, n, r, t]), _ = u.useMemo(() => {
    if (!r || !e) return [];
    const L = e + n, ie = L + r, ne = t === "UTC", q = [], H = ne ? 0 : Bs(L).offsetMin * 60 * 1e3, Ae = L + H, $e = ie + H, Ie = new Date(Ae);
    for (Ie.setUTCHours(0, 0, 0, 0), Ie.getTime() < Ae && Ie.setUTCDate(Ie.getUTCDate() + 1); Ie.getTime() <= $e; ) {
      const xe = Ie.getTime() - H, Me = (xe - L) / r * 100, nt = String(Ie.getUTCDate()).padStart(2, "0"), gt = Cx[Ie.getUTCMonth()], ce = `${nt} ${gt}`;
      q.push({ epoch: xe, pct: Me, dateLabel: ce }), Ie.setUTCDate(Ie.getUTCDate() + 1);
    }
    return q;
  }, [e, n, r, t]), {
    globalFirstMs: U = v,
    globalLastMs: R = null,
    currentFirstMs: F = null,
    currentLastMs: oe = null
  } = p || { globalFirstMs: v }, re = U !== null && F !== null && Math.abs(U - F) < 1e3, X = R !== null && oe !== null && Math.abs(R - oe) < 1e3, D = u.useMemo(() => {
    const L = [];
    return re ? I(U) && L.push({
      id: "first-combined",
      ms: U,
      pct: x(U),
      className: "ruler-media-pin global-first combined",
      badge: "FIRST (ALL & ACTIVE)",
      title: `First Media (All & Active Station): ${St(e + U, t)} (Click to jump)`
    }) : (I(U) && L.push({
      id: "first-global",
      ms: U,
      pct: x(U),
      className: "ruler-media-pin global-first",
      badge: "FIRST (ALL)",
      title: `Global First Media: ${St(e + U, t)} (Click to jump)`
    }), I(F) && L.push({
      id: "first-current",
      ms: F,
      pct: x(F),
      className: "ruler-media-pin current-first",
      badge: y ? `FIRST (${y})` : "FIRST (ACTIVE)",
      title: `Active Station First Media: ${St(e + F, t)} (Click to jump)`
    })), X ? I(R) && L.push({
      id: "last-combined",
      ms: R,
      pct: x(R),
      className: "ruler-media-pin global-last combined",
      badge: "LAST (ALL & ACTIVE)",
      title: `Last Media (All & Active Station): ${St(e + R, t)} (Click to jump)`
    }) : (I(oe) && L.push({
      id: "last-current",
      ms: oe,
      pct: x(oe),
      className: "ruler-media-pin current-last",
      badge: y ? `LAST (${y})` : "LAST (ACTIVE)",
      title: `Active Station Last Media: ${St(e + oe, t)} (Click to jump)`
    }), I(R) && L.push({
      id: "last-global",
      ms: R,
      pct: x(R),
      className: "ruler-media-pin global-last",
      badge: "LAST (ALL)",
      title: `Global Last Media: ${St(e + R, t)} (Click to jump)`
    })), L;
  }, [
    U,
    R,
    F,
    oe,
    re,
    X,
    e,
    t,
    y,
    I,
    x
  ]), K = u.useMemo(() => {
    const L = [];
    return typeof c == "number" && I(c) && L.push({
      id: "cut-first-frame-in",
      type: "in",
      ms: c,
      pct: x(c),
      shortLabel: "IN",
      title: `First Frame in Cut (IN): ${St(e + c, t, { includeSeconds: !0 })} (Click to seek)`
    }), typeof d == "number" && I(d) && L.push({
      id: "cut-last-frame-out",
      type: "out",
      ms: d,
      pct: x(d),
      shortLabel: "OUT",
      title: `Last Frame in Cut (OUT): ${St(e + d, t, { includeSeconds: !0 })} (Click to seek)`
    }), L;
  }, [c, d, e, t, I, x]), b = o !== null ? x(o) : null, B = b !== null && b >= 0 && b <= 100;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: P,
      className: "timeline-ruler-root",
      onMouseMove: S,
      onMouseLeave: M,
      onClick: h,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ruler-ticks-track", children: [
          E.map((L) => /* @__PURE__ */ s.jsxs("div", { className: "ruler-tick", style: { left: `${L.pct}%` }, children: [
            /* @__PURE__ */ s.jsx("div", { className: "tick-line" }),
            /* @__PURE__ */ s.jsx("span", { className: "tick-label", children: L.label })
          ] }, L.epoch)),
          C && /* @__PURE__ */ s.jsx(
            jx,
            {
              stationHostname: m,
              activeStationName: y,
              baseEpochMs: e,
              timeMode: t,
              viewportStartMs: n,
              viewportDurationMs: r,
              pixelWidth: w,
              onSeek: i,
              keystrokes: j
            }
          ),
          N.map((L) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-dst-boundary",
              style: { left: `${L.pct}%` },
              title: `${L.description} (${L.labelBefore} ➔ ${L.labelAfter})`,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "dst-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "dst-tactical-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "dst-icon", children: "⚡" }),
                  /* @__PURE__ */ s.jsx("span", { className: "dst-text", children: L.description })
                ] })
              ]
            },
            L.switchEpochMs
          )),
          _.map((L) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "ruler-date-boundary",
              style: { left: `${L.pct}%` },
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "boundary-datum-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "boundary-tactical-chip", children: [
                  /* @__PURE__ */ s.jsxs("svg", { className: "calendar-svg", viewBox: "0 0 12 12", fill: "none", children: [
                    /* @__PURE__ */ s.jsx("rect", { x: "1.5", y: "2.5", width: "9", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "3.5", y1: "1", x2: "3.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "8.5", y1: "1", x2: "8.5", y2: "2.5", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "1.5", y1: "5.5", x2: "10.5", y2: "5.5", stroke: "currentColor", strokeWidth: "0.8" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { className: "date-str", children: L.dateLabel }),
                  /* @__PURE__ */ s.jsx("span", { className: "divider-dot" }),
                  /* @__PURE__ */ s.jsx("span", { className: "time-str", children: "00:00" })
                ] })
              ]
            },
            L.epoch
          )),
          D.map((L) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: L.className,
              style: { left: `${L.pct}` },
              onClick: (ie) => {
                ie.stopPropagation(), i && i(L.ms);
              },
              title: L.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "pin-badge", children: L.badge }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-head", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "12 18 6 6 18 6 12 18" }) }) }),
                /* @__PURE__ */ s.jsx("div", { className: "pin-line" })
              ]
            },
            L.id
          )),
          K.map((L) => /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `ruler-cut-tick ${L.type}-cut-tick`,
              style: { left: `${L.pct}` },
              onClick: (ie) => {
                ie.stopPropagation(), i && i(L.ms);
              },
              title: L.title,
              children: [
                /* @__PURE__ */ s.jsx("div", { className: "cut-tick-line" }),
                /* @__PURE__ */ s.jsxs("div", { className: "cut-tick-chip", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-dir", children: L.type === "in" ? "▶" : "◀" }),
                  /* @__PURE__ */ s.jsx("span", { className: "cut-tick-tag", children: L.shortLabel })
                ] })
              ]
            },
            L.id
          ))
        ] }),
        B && /* @__PURE__ */ s.jsxs("div", { className: "ruler-hover-cursor", style: { left: `${b}%` }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "hover-time-badge", children: St(e + o, t, { includeSeconds: !0 }) }),
          /* @__PURE__ */ s.jsx("div", { className: "hover-guide-line" })
        ] })
      ]
    }
  );
}
const Bn = (e) => String(e).padStart(2, "0");
function Mx({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  totalDurationMs: n = 36e5,
  inPointMs: r = 0,
  setInPointMs: l,
  outPointMs: o = 36e5,
  setOutPointMs: a
}) {
  const [i, c] = u.useState(!1), [d, v] = u.useState(!1), [p, m] = u.useState(""), [y, C] = u.useState(""), j = u.useCallback((E) => {
    if (!E || isNaN(E) || E <= 0)
      return { timeStr: "--:--:--", zoneLabel: "" };
    if (t === "UTC") {
      const R = new Date(E);
      return {
        timeStr: `${Bn(R.getUTCHours())}:${Bn(R.getUTCMinutes())}:${Bn(R.getUTCSeconds())}`,
        zoneLabel: "UTC"
      };
    }
    const { offsetMin: N, label: _ } = Bs(E), U = new Date(E + N * 60 * 1e3);
    return {
      timeStr: `${Bn(U.getUTCHours())}:${Bn(U.getUTCMinutes())}:${Bn(U.getUTCSeconds())}`,
      zoneLabel: _
    };
  }, [t]), P = u.useCallback((E) => {
    if (!E || E < 0) return "00:00:00";
    const N = Math.floor(E / 1e3), _ = Math.floor(N / 3600), U = Math.floor(N % 3600 / 60), R = N % 60;
    return `${Bn(_)}:${Bn(U)}:${Bn(R)}`;
  }, []), w = u.useMemo(() => j(e + r), [j, e, r]), g = u.useMemo(() => j(e + o), [j, e, o]), x = u.useMemo(() => P(Math.max(0, o - r)), [P, r, o]), I = u.useCallback((E, N) => {
    if (!E || !E.trim()) return N;
    const U = E.trim().split(" ")[0].split(":").map(Number);
    if (U.length < 2 || U.some(isNaN)) return N;
    const [R, F, oe = 0] = U;
    if (t === "UTC") {
      const H = new Date(e);
      H.setUTCHours(R, F, oe, 0);
      let Ae = H.getTime();
      for (; Ae < e; ) Ae += 864e5;
      for (; Ae > e + n + 1e3; ) Ae -= 864e5;
      const $e = Ae - e;
      return isNaN($e) ? N : Math.max(0, Math.min(n, $e));
    }
    const { offsetMin: re } = Bs(e), X = new Date(e + re * 6e4), D = X.getUTCFullYear(), K = X.getUTCMonth(), b = X.getUTCDate(), B = `${D}-${Bn(K + 1)}-${Bn(b)}`, L = `${Bn(R)}:${Bn(F)}:${Bn(oe)}`, ie = Ha(B, L);
    let ne;
    if (ie.isAmbiguous) {
      const H = e + N, Ae = Math.abs(ie.firstOccurrenceEpoch - H), $e = Math.abs(ie.secondOccurrenceEpoch - H);
      ne = Ae <= $e ? ie.firstOccurrenceEpoch : ie.secondOccurrenceEpoch;
    } else {
      const H = Date.UTC(D, K, b, R, F, oe), { offsetMin: Ae } = Bs(H - re * 6e4);
      ne = H - Ae * 6e4;
    }
    for (; ne < e; ) ne += 864e5;
    for (; ne > e + n + 1e3; ) ne -= 864e5;
    const q = ne - e;
    return isNaN(q) ? N : Math.max(0, Math.min(n, q));
  }, [e, t, n]), S = () => {
    m(w.timeStr), c(!0);
  }, M = () => {
    if (c(!1), !p || !p.trim() || p.trim() === w.timeStr)
      return;
    const E = I(p.trim(), r);
    E !== null && !isNaN(E) && E < o && l(E);
  }, h = () => {
    C(g.timeStr), v(!0);
  }, $ = () => {
    if (v(!1), !y || !y.trim() || y.trim() === g.timeStr)
      return;
    const E = I(y.trim(), o);
    E !== null && !isNaN(E) && E > r && a(E);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "tactical-timecode-console", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "console-row in-accent", children: [
      /* @__PURE__ */ s.jsx("span", { className: "console-tag", children: "IN" }),
      i ? /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "text",
          className: "console-input",
          value: p,
          autoFocus: !0,
          onChange: (E) => m(E.target.value),
          onBlur: M,
          onKeyDown: (E) => {
            E.key === "Enter" && M(), E.key === "Escape" && c(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: S,
          title: `Click to edit IN time (${w.zoneLabel})`,
          children: [
            w.timeStr,
            /* @__PURE__ */ s.jsx("span", { className: "console-zone-tag", children: w.zoneLabel })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "console-row out-accent", children: [
      /* @__PURE__ */ s.jsx("span", { className: "console-tag", children: "OUT" }),
      d ? /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "text",
          className: "console-input",
          value: y,
          autoFocus: !0,
          onChange: (E) => C(E.target.value),
          onBlur: $,
          onKeyDown: (E) => {
            E.key === "Enter" && $(), E.key === "Escape" && v(!1);
          }
        }
      ) : /* @__PURE__ */ s.jsxs(
        "span",
        {
          className: "console-digits",
          onClick: h,
          title: `Click to edit OUT time (${g.zoneLabel})`,
          children: [
            g.timeStr,
            /* @__PURE__ */ s.jsx("span", { className: "console-zone-tag", children: g.zoneLabel })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "console-duration-shelf", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "dur-label-group", children: [
        /* @__PURE__ */ s.jsx("span", { className: "dur-dot" }),
        /* @__PURE__ */ s.jsx("span", { className: "dur-title", children: "DUR" })
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "dur-timecode", children: x })
    ] })
  ] });
}
function bx({
  minimapRef: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  totalDurationMs: r = 36e5,
  viewportStartMs: l = 0,
  viewportDurationMs: o = 36e5,
  zoomLevel: a = 1,
  inPointMs: i = 0,
  outPointMs: c = 36e5,
  playheadMs: d = 0,
  onStartDragMinimap: v
}) {
  const p = Math.max(0, Math.min(100, i / r * 100)), m = Math.max(0, Math.min(100, c / r * 100)), y = Math.max(0, m - p), C = Math.max(0, Math.min(100, l / r * 100)), j = Math.max(0, Math.min(100 - C, o / r * 100)), P = C + j, w = a > 1.05, g = 7, x = y >= 10, I = y >= 16, S = x, M = I, h = S && Math.abs(C - p) < g, $ = w && j >= 12 && !h, E = M && Math.abs(P - m) < g, N = w && j >= 12 && !E;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: e,
      className: "overview-track-canvas",
      onMouseDown: (_) => v && v("minimap-viewport", _),
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-cut-highlight",
            style: { left: `${p}%`, width: `${y}%` },
            children: [
              S && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-in-tag", children: St(t + i, n) }),
              M && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag cut-out-tag", children: St(t + c, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "minimap-viewport-box",
            style: { left: `${C}%`, width: `${j}%` },
            children: [
              $ && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag left", children: St(t + l, n) }),
              N && /* @__PURE__ */ s.jsx("span", { className: "minimap-time-tag viewport-tag right", children: St(t + l + o, n) })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "minimap-needle",
            style: { left: `${d / r * 100}%` }
          }
        )
      ]
    }
  );
}
function Ix({
  earliestMediaMs: e,
  latestMediaMs: t,
  hasActiveCut: n,
  onJumpToFirst: r,
  onJumpToLast: l,
  onContextualFit: o,
  onResetZoom: a,
  baseEpochMs: i,
  timeMode: c,
  keystrokeMode: d = "BURN_IN",
  // 'NONE' | 'CAPTION' | 'BURN_IN'
  onChangeKeystrokeMode: v,
  showRulerKeystrokes: p = !1,
  onToggleRulerKeystrokes: m
}) {
  const y = (d || "NONE").toUpperCase().replace("-", "_"), C = () => {
    v && v(y === "NONE" || y === "OFF" ? "BURN_IN" : y === "BURN_IN" ? "CAPTION" : "NONE");
  }, j = () => {
    switch (y) {
      case "BURN_IN":
        return "KEYS: BURN-IN";
      case "CAPTION":
        return "KEYS: CAPTION";
      default:
        return "KEYS: OFF";
    }
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "timeline-viewport-actions-group", children: [
    v && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action keys-mode-btn mode-${y.toLowerCase().replace("_", "-")}`,
        onClick: C,
        title: "Toggle Keystroke Export & Preview Mode (Off / Burn-in / Soft Caption)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
            /* @__PURE__ */ s.jsx("path", { d: "M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: j() })
        ]
      }
    ),
    m && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action ruler-keys-btn ${p ? "active" : "inactive"}`,
        onClick: m,
        title: p ? "Hide Keystroke Ticks on Ruler" : "Show Keystroke Ticks on Ruler (Default: Off)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "3", fill: p ? "currentColor" : "none" }),
            /* @__PURE__ */ s.jsx("path", { d: "M3 12h3M18 12h3M12 3v3M12 18v3" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: p ? "RULER TICKS: ON" : "RULER TICKS: OFF" })
        ]
      }
    ),
    e !== null && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: "btn-vp-action",
        onClick: r,
        title: `Jump playhead to first media (${St(i + e, c)})`,
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: [
            /* @__PURE__ */ s.jsx("polygon", { points: "19 20 9 12 19 4 19 20" }),
            /* @__PURE__ */ s.jsx("line", { x1: "5", y1: "19", x2: "5", y2: "5", stroke: "currentColor", strokeWidth: "2.5" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: "FIRST MEDIA" })
        ]
      }
    ),
    t !== null && /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: "btn-vp-action",
        onClick: l,
        title: `Jump playhead to last media (${St(i + t, c)})`,
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: [
            /* @__PURE__ */ s.jsx("polygon", { points: "5 4 15 12 5 20 5 4" }),
            /* @__PURE__ */ s.jsx("line", { x1: "19", y1: "5", x2: "19", y2: "19", stroke: "currentColor", strokeWidth: "2.5" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: "LAST MEDIA" })
        ]
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `btn-vp-action fit-action ${n ? "fit-cut" : ""}`,
        onClick: o,
        title: n ? "Fit Viewport to Cut Range" : "Fit Viewport to Recorded Media",
        children: [
          /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" }) }),
          /* @__PURE__ */ s.jsx("span", { children: n ? "FIT CUT" : "FIT MEDIA" })
        ]
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: "btn-vp-action",
        onClick: a,
        title: "Reset to Full Time Scope (100% / No Zoom)",
        children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ s.jsx("polyline", { points: "1 4 1 10 7 10" }),
            /* @__PURE__ */ s.jsx("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { children: "RESET" })
        ]
      }
    )
  ] });
}
const Ms = /* @__PURE__ */ new Map(), sl = /* @__PURE__ */ new Map();
let Ds = [], Cl = 0;
const mh = 3, Tx = 8e3, Ax = 80;
function Gp() {
  setTimeout($x, 0);
}
function $x() {
  var e;
  if (!(Cl >= mh || Ds.length === 0))
    for (Ds = Ds.filter((t) => {
      var n;
      return !((n = t.signal) != null && n.aborted);
    }); Cl < mh && Ds.length > 0; ) {
      const t = Ds.pop();
      !t || (e = t.signal) != null && e.aborted || (Cl++, Rx(t));
    }
}
async function Rx(e) {
  const { key: t, hostname: n, startEpoch: r, endEpoch: l, frameCount: o, signal: a, resolve: i, displayId: c } = e;
  let d = !1, v = null;
  const p = () => {
    d || (d = !0, v && clearTimeout(v), Cl = Math.max(0, Cl - 1), sl.delete(t), Gp());
  };
  v = setTimeout(() => {
    p(), i(null);
  }, Tx);
  try {
    const m = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(n)}&startEpoch=${r}&endEpoch=${l}&frameCount=${o}&tileWidth=100&tileHeight=50${c ? `&displayId=${encodeURIComponent(c)}` : ""}`, y = await fetch(m, { signal: a });
    if (y.ok && y.status !== 204) {
      const C = await y.blob();
      if (C && C.size > 1500) {
        const j = URL.createObjectURL(C);
        if (Ms.size >= Ax) {
          const P = Ms.keys().next().value, w = Ms.get(P);
          w && URL.revokeObjectURL(w), Ms.delete(P);
        }
        Ms.set(t, j), i(j);
        return;
      }
    }
    i(null);
  } catch {
    i(null);
  } finally {
    p();
  }
}
const gh = {
  /**
   * Gets a cached spritesheet tile URL synchronously.
   * 
   * @param {string} hostname
   * @param {number} startEpoch
   * @param {number} endEpoch
   * @param {number} [frameCount=6]
   * @returns {string|undefined} Blob URL if cached.
   */
  get(e, t, n, r = 6, l = null) {
    const o = `${e}_${l || "mon-0"}_${t}_${n}_${r}`;
    return Ms.get(o);
  },
  /**
   * Fetches a spritesheet tile asynchronously with queueing and deduplication.
   * 
   * @param {string} hostname
   * @param {number} startEpoch
   * @param {number} endEpoch
   * @param {number} [frameCount=6]
   * @param {AbortSignal} [signal=null]
   * @returns {Promise<string|null>}
   */
  fetchTile(e, t, n, r = 6, l = null, o = null) {
    const a = `${e}_${o || "mon-0"}_${t}_${n}_${r}`;
    if (Ms.has(a))
      return Promise.resolve(Ms.get(a));
    if (sl.has(a))
      return sl.get(a);
    const i = new Promise((c) => {
      if (l != null && l.aborted) {
        c(null);
        return;
      }
      const d = {
        key: a,
        hostname: e,
        startEpoch: t,
        endEpoch: n,
        frameCount: r,
        displayId: o || "mon-0",
        signal: l,
        resolve: c
      };
      l && l.addEventListener("abort", () => {
        Ds = Ds.filter((v) => v.key !== a), sl.delete(a), c(null);
      }, { once: !0 }), Ds.push(d), Gp();
    });
    return sl.set(a, i), i;
  },
  clear() {
    Ms.forEach((e) => URL.revokeObjectURL(e)), Ms.clear(), sl.clear(), Ds = [], Cl = 0;
  }
}, Lx = (e) => e <= 60 * 1e3 ? { tileDurationMs: 5 * 1e3, framesPerTile: 4 } : e <= 5 * 60 * 1e3 ? { tileDurationMs: 20 * 1e3, framesPerTile: 4 } : e <= 30 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 1e3, framesPerTile: 4 } : e <= 2 * 60 * 60 * 1e3 ? { tileDurationMs: 8 * 60 * 1e3, framesPerTile: 5 } : e <= 8 * 60 * 60 * 1e3 ? { tileDurationMs: 30 * 60 * 1e3, framesPerTile: 5 } : e <= 24 * 60 * 60 * 1e3 ? { tileDurationMs: 2 * 60 * 60 * 1e3, framesPerTile: 5 } : e <= 72 * 60 * 60 * 1e3 ? { tileDurationMs: 6 * 60 * 60 * 1e3, framesPerTile: 4 } : e <= 7 * 24 * 60 * 60 * 1e3 ? { tileDurationMs: 14 * 60 * 60 * 1e3, framesPerTile: 4 } : { tileDurationMs: Math.max(24 * 60 * 60 * 1e3, Math.round(e / 14)), framesPerTile: 4 }, Zn = (e) => e.startEpochMs ?? e.StartEpochMs ?? e.startEpoch ?? e.start ?? 0, Lr = (e) => e.endEpochMs ?? e.EndEpochMs ?? e.endEpoch ?? e.end ?? 0;
function Jc({
  hostname: e,
  displayId: t = "mon-0",
  activeSegments: n = [],
  viewportStartMs: r = 0,
  viewportDurationMs: l = 36e5,
  baseEpochMs: o = 0,
  inPointMs: a = 0,
  outPointMs: i = 36e5,
  globalGaps: c = [],
  gaps: d = [],
  directorSegments: v = [],
  isAutoDirectorEnabled: p = !1,
  showDirectorCoverage: m = !1,
  stepperSegments: y = null,
  isCanvasSummary: C = !1
}) {
  const [j, P] = u.useState({}), w = u.useRef(j);
  w.current = j;
  const g = u.useMemo(() => Lx(l), [l]), x = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const { tileDurationMs: N, framesPerTile: _ } = g, U = [], R = o + r, F = R + l, oe = R - N, re = F + N, X = [...n].sort((L, ie) => Zn(L) - Zn(ie)), D = C ? c || [] : [...c || [], ...d || []], K = (L, ie) => !D || D.length === 0 ? !1 : D.some((ne) => {
      const q = ne.startEpochMs ?? ne.startEpoch ?? ne.start ?? 0, H = ne.endEpochMs ?? ne.endEpoch ?? ne.end ?? 0;
      return H <= q ? !1 : Math.max(L, q) < Math.min(ie, H);
    }), b = o + a, B = o + i;
    if (X.forEach((L, ie) => {
      const ne = Math.round(Zn(L)), q = Math.round(Lr(L));
      if (q <= ne) return;
      const H = Math.max(ne, b), Ae = Math.min(q, B);
      if (Ae <= H) return;
      const $e = Math.max(H, oe), Ie = Math.min(Ae, re);
      if (Ie <= $e) return;
      const Ue = Math.floor($e / N) * N;
      for (let xe = Ue; xe < Ie; xe += N) {
        const Me = xe + N, nt = Math.max(H, xe), gt = Math.min(Ae, Me);
        gt > nt && !K(nt, gt) && U.push({
          key: `${e}_${t}_${nt}_${gt}_${_}`,
          sIdx: ie,
          startEpoch: nt,
          endEpoch: gt,
          framesPerTile: _,
          displayId: t
        });
      }
    }), U.length > 20) {
      const L = o + r + l / 2;
      U.sort((ie, ne) => {
        const q = Math.abs((ie.startEpoch + ie.endEpoch) / 2 - L), H = Math.abs((ne.startEpoch + ne.endEpoch) / 2 - L);
        return q - H;
      }), U.length = 20, U.sort((ie, ne) => ie.startEpoch - ne.startEpoch);
    }
    return U;
  }, [n, o, e, t, r, l, g, a, i, d, c]);
  u.useEffect(() => {
    if (x.length === 0) return;
    let N = !0;
    const _ = new AbortController(), U = [], R = {};
    let F = !1;
    x.forEach((b) => {
      const B = gh.get(e, b.startEpoch, b.endEpoch, b.framesPerTile, t);
      B ? w.current[b.key] !== B && (R[b.key] = B, F = !0) : U.push(b);
    });
    const oe = new Set(x.map((b) => b.key)), re = w.current, X = {};
    let D = !1;
    if (Object.keys(re).forEach((b) => {
      oe.has(b) ? X[b] = re[b] : D = !0;
    }), F || D) {
      const b = { ...X, ...R };
      w.current = b, P(b);
    }
    if (U.length === 0) return () => {
      N = !1;
    };
    const K = setTimeout(() => {
      U.forEach((b) => {
        gh.fetchTile(e, b.startEpoch, b.endEpoch, b.framesPerTile, _.signal, t).then((B) => {
          N && B && (w.current[b.key] = B, P((L) => ({ ...L, [b.key]: B })));
        });
      });
    }, 150);
    return () => {
      N = !1, clearTimeout(K), _.abort();
    };
  }, [x, e, t]);
  const I = (a - r) / l * 100, S = (i - r) / l * 100, M = u.useMemo(() => {
    if (x.length === 0 || !o || l <= 0) return [];
    const N = r, _ = r + l;
    return x.map((U) => {
      const R = U.startEpoch - o, F = U.endEpoch - o;
      if (F <= N || R >= _) return null;
      const oe = Math.max(N, R), re = Math.min(_, F);
      return {
        key: U.key,
        spriteUrl: j[U.key] || null,
        leftPct: (oe - N) / l * 100,
        widthPct: (re - oe) / l * 100
      };
    }).filter(Boolean);
  }, [x, o, r, l, j]), h = u.useMemo(() => {
    if (n.length === 0 || !o || l <= 0) return [];
    const N = r, _ = r + l;
    return n.map((U, R) => {
      const F = Math.round(Zn(U)) - o, oe = Math.round(Lr(U)) - o;
      if (oe <= N || F >= _) return null;
      const re = Math.max(N, F), X = Math.min(_, oe);
      return {
        id: R,
        leftPct: (re - N) / l * 100,
        widthPct: (X - re) / l * 100
      };
    }).filter(Boolean);
  }, [n, o, r, l]), $ = u.useMemo(() => {
    if (!o || l <= 0) return [];
    const N = [...n].sort((K, b) => Zn(K) - Zn(b)), _ = [], U = r, R = r + l, F = o + U, oe = o + R, re = o + (a !== void 0 ? a : U), X = o + (i !== void 0 ? i : R);
    if (N.length > 0) {
      const K = Zn(N[0]);
      K > F && _.push({ startEpoch: F, endEpoch: K });
    } else l > 0 && _.push({ startEpoch: F, endEpoch: oe });
    for (let K = 0; K < N.length - 1; K++) {
      const b = Lr(N[K]), B = Zn(N[K + 1]);
      B - b > 1e3 && _.push({ startEpoch: b, endEpoch: B });
    }
    if (N.length > 0) {
      const K = Lr(N[N.length - 1]);
      K < oe && _.push({ startEpoch: K, endEpoch: oe });
    }
    const D = [];
    return c && c.length > 0 && c.forEach((K, b) => {
      const B = Math.max(K.startEpochMs ?? K.StartEpochMs, re), L = Math.min(K.endEpochMs ?? K.EndEpochMs, X);
      if (L > B && L > F && B < oe) {
        const ie = Math.max(F, B), ne = Math.min(oe, L), q = (ne - o - (ie - o)) / l * 100;
        q > 0 && D.push({
          id: `global-${b}`,
          type: "global",
          startEpoch: ie,
          endEpoch: ne,
          leftPct: (ie - o - U) / l * 100,
          widthPct: q,
          durationSec: Math.round((L - B) / 1e3)
        });
      }
    }), C || _.forEach((K, b) => {
      let B = [K];
      c && c.length > 0 && c.forEach((L) => {
        const ie = Math.max(L.startEpochMs ?? L.StartEpochMs, re), ne = Math.min(L.endEpochMs ?? L.EndEpochMs, X);
        if (ne <= ie) return;
        const q = [];
        B.forEach((H) => {
          ne <= H.startEpoch || ie >= H.endEpoch ? q.push(H) : (ie > H.startEpoch && q.push({ startEpoch: H.startEpoch, endEpoch: ie }), ne < H.endEpoch && q.push({ startEpoch: ne, endEpoch: H.endEpoch }));
        }), B = q;
      }), B.forEach((L, ie) => {
        if (L.endEpoch - L.startEpoch < 1e3 || L.endEpoch <= F || L.startEpoch >= oe) return;
        const ne = Math.max(F, L.startEpoch), q = Math.min(oe, L.endEpoch), H = (q - o - (ne - o)) / l * 100;
        H > 0 && D.push({
          id: `station-${b}-${ie}`,
          type: "station",
          startEpoch: ne,
          endEpoch: q,
          leftPct: (ne - o - U) / l * 100,
          widthPct: H,
          durationSec: Math.round((L.endEpoch - L.startEpoch) / 1e3)
        });
      });
    }), D;
  }, [n, c, o, r, l, a, i, C]), E = u.useMemo(() => {
    if (!m || !p || !v || v.length === 0) return [];
    const N = (t || "mon-0").toLowerCase(), _ = r, U = r + l;
    return v.map((R, F) => {
      const oe = (R.startEpochMs ?? R.StartEpochMs ?? 0) - o, re = (R.endEpochMs ?? R.EndEpochMs ?? 0) - o;
      if (re <= _ || oe >= U) return null;
      const X = Math.max(_, oe), D = Math.min(U, re), K = (X - _) / l * 100, b = (D - X) / l * 100;
      if (b <= 0) return null;
      const L = (R.targetDisplayId || R.TargetDisplayId || "mon-0").toLowerCase() === N;
      return {
        id: `cov_${F}`,
        isFeatured: L,
        leftPct: K,
        widthPct: b
      };
    }).filter(Boolean);
  }, [m, p, v, t, o, r, l]);
  return /* @__PURE__ */ s.jsxs("div", { className: "track-canvas", children: [
    /* @__PURE__ */ s.jsx("div", { className: "full-height-gaps-layer", children: $.map((N) => /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `gap-full-block ${N.type === "global" ? "gap-global-skipped" : "gap-station-signal"}`,
        style: { left: `${N.leftPct}%`, width: `${N.widthPct}%` },
        title: N.type === "global" ? `Shared Gap: ${N.durationSec}s will be skipped` : `Station Gap: ${N.durationSec}s No-Signal`,
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "gap-pattern" }),
          N.widthPct > 5 && /* @__PURE__ */ s.jsx("div", { className: `gap-badge ${N.type === "global" ? "global-badge" : ""}`, children: /* @__PURE__ */ s.jsx("span", { children: N.type === "global" ? `✂ SKIPPED (${N.durationSec}s)` : "NO SIGNAL" }) })
        ]
      },
      N.id
    )) }),
    /* @__PURE__ */ s.jsx("div", { className: "spritesheet-filmstrip-layer", children: M.map((N) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: `spritesheet-tile-block ${N.spriteUrl ? "is-loaded" : "is-loading"}`,
        style: {
          position: "absolute",
          left: `${N.leftPct}%`,
          width: `${N.widthPct}%`,
          height: "100%",
          backgroundImage: N.spriteUrl ? `url("${N.spriteUrl}")` : "none",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          transition: "opacity 0.25s ease"
        },
        children: !N.spriteUrl && /* @__PURE__ */ s.jsx("div", { className: "tile-shimmer-loader", children: /* @__PURE__ */ s.jsx("div", { className: "shimmer-wave" }) })
      },
      N.key
    )) }),
    E.map((N) => N.isFeatured ? /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-active-coverage-highlight",
        style: { left: `${N.leftPct}%`, width: `${N.widthPct}%` },
        title: "Display Featured by Auto-Director"
      },
      N.id
    ) : /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "director-mask-dimmed",
        style: { left: `${N.leftPct}%`, width: `${N.widthPct}%` },
        title: "Display Off-Air (Masked by Auto-Director)"
      },
      N.id
    )),
    /* @__PURE__ */ s.jsx("div", { className: `data-presence-layer ${y ? "has-stepper" : ""}`, children: h.map((N) => /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "data-presence-bar",
        style: { left: `${N.leftPct}%`, width: `${N.widthPct}%` }
      },
      `bar_${N.id}`
    )) }),
    y && y.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "director-stepper-ribbon", children: p ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      y.map((N, _) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-block display-${N.dispNum}`,
          style: { left: `${N.leftPct}%`, width: `${N.widthPct}%` },
          title: `Auto-Director: Screen ${N.dispNum} (${N.dispLabel})`,
          children: /* @__PURE__ */ s.jsx("span", { children: N.dispNum })
        },
        `stp_${_}`
      )),
      $ && $.map((N) => /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `stepper-gap-block ${N.type === "global" ? "gap-global" : "gap-station"}`,
          style: { left: `${N.leftPct}%`, width: `${N.widthPct}%` },
          title: N.type === "global" ? `Global Gap: ${N.durationSec}s skipped in export (No switches)` : `Station Gap: ${N.durationSec}s No Signal (No switches)`,
          children: N.widthPct > 6 && /* @__PURE__ */ s.jsx("span", { className: "stepper-gap-badge", children: N.type === "global" ? "✂ SKIPPED" : "NO SIGNAL" })
        },
        `gap_stp_${N.id}`
      ))
    ] }) : /* @__PURE__ */ s.jsx("div", { className: "stepper-block-manual", title: "Auto-Director is OFF — Displaying Screen 1 (Manual Mode)", children: /* @__PURE__ */ s.jsx("span", { children: "✋ AUTO-DIRECTOR OFF • SCREEN 1 (MANUAL)" }) }) }),
    I > 0 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed left-mask", style: { width: `${Math.min(100, I)}%` } }),
    S < 100 && /* @__PURE__ */ s.jsx("div", { className: "mask-dimmed right-mask", style: { left: `${Math.max(0, S)}%`, right: 0 } })
  ] });
}
function Ox({
  station: e,
  isExpanded: t = !1,
  onToggleExpand: n,
  isAutoDirectorEnabled: r = !0,
  onToggleAutoDirector: l,
  canvasPlacements: o = [],
  onToggleDisplayOnCanvas: a,
  directorPlan: i = null,
  isActive: c = !0,
  onSelect: d,
  onStationContextMenu: v,
  onDeselectStation: p,
  viewportStartMs: m = 0,
  viewportDurationMs: y = 36e5,
  inPointMs: C = 0,
  outPointMs: j = 36e5,
  baseEpochMs: P = 0,
  segments: w = [],
  recordingSegments: g = {},
  globalGaps: x = []
}) {
  const I = (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", S = (e == null ? void 0 : e.id) || I, M = (e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.roleAlias) || (e == null ? void 0 : e.hostname) || (e == null ? void 0 : e.name) || "", h = (e == null ? void 0 : e.hostname) || "", $ = u.useMemo(() => {
    var b, B, L;
    return (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((b = e == null ? void 0 : e.displayTopology) == null ? void 0 : b.displays) || ((B = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : B.Displays) || ((L = e == null ? void 0 : e.topology) == null ? void 0 : L.displays) || [{ displayId: "mon-0", displayName: "Screen 1", isPrimary: !0, width: 1920, height: 1080 }];
  }, [e]), E = u.useMemo(() => {
    var B, L;
    const b = $.find((ie) => ie.isPrimary || ie.IsPrimary);
    return ((b == null ? void 0 : b.displayId) || (b == null ? void 0 : b.DisplayId) || ((B = $[0]) == null ? void 0 : B.displayId) || ((L = $[0]) == null ? void 0 : L.DisplayId) || "mon-0").toLowerCase();
  }, [$]), N = i || (e == null ? void 0 : e.directorPlan) || (e == null ? void 0 : e.DirectorPlan), _ = u.useMemo(() => (N == null ? void 0 : N.segments) || (N == null ? void 0 : N.Segments) || [], [N]), U = _ && _.length > 0, R = !!($ && $.length > 1), F = !!(t && R), oe = u.useMemo(() => {
    let b = g[S] || g[I] || w || [];
    if (!b || b.length === 0) {
      const B = (S || "").toLowerCase(), L = (I || "").toLowerCase();
      for (const [ie, ne] of Object.entries(g || {})) {
        const q = ie.toLowerCase();
        if (B && q === B || L && q === L) {
          b = ne;
          break;
        }
      }
    }
    if ((!b || b.length === 0) && (b = (e == null ? void 0 : e.segments) || (e == null ? void 0 : e.Segments) || []), !b || b.length === 0)
      for (const B of $) {
        const L = B.segments || B.Segments || [];
        if (L.length > 0) {
          b = L;
          break;
        }
      }
    return (b || []).filter((B) => Lr(B) - Zn(B) > 0);
  }, [g, w, S, I, e, $]), re = u.useMemo(() => {
    if (!P || y <= 0) return [];
    const b = [...oe].sort((q, H) => Zn(q) - Zn(H)), B = [], L = P + y;
    if (x && x.length > 0 && x.forEach((q) => {
      const H = q.startEpochMs ?? q.StartEpochMs ?? 0, Ae = q.endEpochMs ?? q.EndEpochMs ?? 0;
      Ae > H && B.push({ startEpoch: H, endEpoch: Ae, type: "global" });
    }), b.length === 0)
      return B.push({ startEpoch: P, endEpoch: L, type: "station" }), B;
    const ie = Math.round(Zn(b[0]));
    ie - P > 2e3 && (B.some((H) => H.type === "global" && H.startEpoch <= P && H.endEpoch >= ie) || B.push({ startEpoch: P, endEpoch: ie, type: "station" }));
    for (let q = 0; q < b.length - 1; q++) {
      const H = Math.round(Lr(b[q])), Ae = Math.round(Zn(b[q + 1]));
      Ae - H > 2e3 && (B.some((Ie) => Ie.type === "global" && Ie.startEpoch <= H && Ie.endEpoch >= Ae) || B.push({ startEpoch: H, endEpoch: Ae, type: "station" }));
    }
    const ne = Math.round(Lr(b[b.length - 1]));
    return L - ne > 2e3 && (B.some((H) => H.type === "global" && H.startEpoch <= ne && H.endEpoch >= L) || B.push({ startEpoch: ne, endEpoch: L, type: "station" })), B;
  }, [oe, x, P, y]), X = u.useMemo(() => {
    const b = P + C, B = P + j;
    return fx(_, re, x, b, B, E);
  }, [_, re, x, P, C, j, E]), D = u.useMemo(() => {
    if (!U || y <= 0) return null;
    const b = m, B = m + y;
    return X.map((L, ie) => {
      const ne = (L.startEpochMs ?? L.StartEpochMs ?? 0) - P, q = (L.endEpochMs ?? L.EndEpochMs ?? 0) - P;
      if (q <= b || ne >= B) return null;
      const H = Math.max(b, ne), Ae = Math.min(B, q), $e = (H - b) / y * 100, Ie = (Ae - H) / y * 100;
      if (Ie <= 0) return null;
      const Ue = (L.targetDisplayId || L.TargetDisplayId || "mon-0").toLowerCase(), xe = $.findIndex((gt) => (gt.displayId || gt.DisplayId || "").toLowerCase() === Ue);
      let Me = xe >= 0 ? xe + 1 : null;
      if (!Me) {
        const gt = Ue.match(/\d+/);
        Me = gt ? parseInt(gt[0], 10) + 1 : 1;
      }
      const nt = xe >= 0 ? $[xe].displayName || $[xe].DisplayName || `Screen ${Me}` : `Screen ${Me}`;
      return {
        id: ie,
        dispNum: Me,
        dispLabel: nt,
        leftPct: $e,
        widthPct: Ie
      };
    }).filter(Boolean);
  }, [U, X, $, P, m, y]), K = u.useCallback((b) => {
    const B = (b || "mon-0").toLowerCase();
    return o.some((L) => {
      if (L.stationId !== S) return !1;
      const ie = (L.displayId || "mon-0").toLowerCase();
      return ie === B || ie === "auto" && (B === "mon-0" || B === "screen-0");
    });
  }, [o, S]);
  return F ? /* @__PURE__ */ s.jsxs("div", { className: "timeline-station-accordion-group", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "station-accordion-header", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-accordion-toggle is-open",
            onClick: (b) => {
              b.stopPropagation(), n == null || n();
            },
            title: "Collapse station tracks",
            children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "6 9 12 15 18 9" }) })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
        /* @__PURE__ */ s.jsx("span", { className: "station-accordion-title", title: M, children: M }),
        R && l && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
            onClick: (b) => {
              b.stopPropagation(), l(e.id);
            },
            title: r ? "Auto-Director is Active. Click to turn OFF" : "Auto-Director is OFF. Click to turn ON",
            children: r ? "⚡ AUTO" : "✋ OFF"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "accordion-header-timeline", children: [
        R && l && /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-station-auto-director ${r ? "is-active" : "is-inactive"}`,
            onClick: (b) => {
              b.stopPropagation(), l(e.id);
            },
            title: r ? "Auto-Director is Active. Click to turn OFF for manual multi-screen canvas placement." : "Auto-Director is OFF. Primary screen active. Click to re-enable Auto-Director.",
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "dot" }),
              /* @__PURE__ */ s.jsx("span", { children: r ? "⚡ AUTO-DIRECTOR: ON" : "✋ AUTO-DIRECTOR: OFF" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-close-accordion",
            onClick: (b) => {
              b.stopPropagation(), n == null || n();
            },
            title: "Close station expansion",
            children: "CLOSE ✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "station-child-tracks-container", children: $.map((b, B) => {
      const L = (b.displayId || b.DisplayId || `mon-${B}`).toLowerCase(), ie = b.displayNumber || b.DisplayNumber || B + 1, ne = b.displayName || b.DisplayName || "", q = ne && !ne.toLowerCase().includes(I.toLowerCase()) ? ne : `Screen ${ie}${b.isPrimary || B === 0 ? " (Main)" : ""}`, H = K(L);
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "timeline-track-container station-child-display-track",
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar child-display-sidebar", children: [
              /* @__PURE__ */ s.jsx("span", { className: "child-display-icon", children: "🖥️" }),
              /* @__PURE__ */ s.jsx("span", { className: "child-display-title", title: `${q} (${b.width || 1920}×${b.height || 1080})`, children: q }),
              !r && a && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-add-screen-canvas ${H ? "is-on-canvas" : ""}`,
                  onClick: (Ae) => {
                    Ae.stopPropagation(), a(e.id, L);
                  },
                  title: H ? "Remove Screen from Canvas" : "Add Screen to Canvas Grid",
                  children: H ? "✓ ON" : "＋ ADD"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx(
              Jc,
              {
                hostname: I,
                displayId: L,
                activeSegments: b.segments && b.segments.length > 0 ? b.segments : oe,
                viewportStartMs: m,
                viewportDurationMs: y,
                baseEpochMs: P,
                inPointMs: C,
                outPointMs: j,
                globalGaps: x,
                directorSegments: X,
                isAutoDirectorEnabled: r,
                gaps: re,
                showDirectorCoverage: R
              }
            )
          ]
        },
        `${e.id}-${L}`
      );
    }) })
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => {
        d && d(), R && n && n();
      },
      onContextMenu: (b) => {
        v && (b.preventDefault(), b.stopPropagation(), v(b, e));
      },
      className: `timeline-track-container station-collapsed-track ${c ? "active-track" : ""} ${R ? "has-stepper" : "no-stepper"}`,
      children: [
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "track-sidebar station-collapsed-sidebar",
            title: `Workstation: ${M}${h ? ` (${h})` : ""} • Click to select${R ? " / expand" : ""}`,
            children: [
              R && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-accordion-toggle",
                  onClick: (b) => {
                    b.stopPropagation(), n == null || n();
                  },
                  title: "Expand station tracks",
                  children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) })
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: `status-indicator ${e != null && e.isOnline ? "online" : "idle"}` }),
              /* @__PURE__ */ s.jsx("span", { className: "station-single-label", title: M, children: M }),
              R && l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `btn-track-auto-dir-pill ${r ? "is-active" : "is-inactive"}`,
                  onClick: (b) => {
                    b.stopPropagation(), l(e.id);
                  },
                  title: r ? "Auto-Director is Active. Click to turn OFF" : "Auto-Director is OFF. Click to turn ON",
                  children: r ? "⚡ AUTO" : "✋ OFF"
                }
              ),
              p && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-track-deselect",
                  title: `Remove ${M} from project`,
                  onClick: (b) => {
                    b.stopPropagation(), p(e.id);
                  },
                  children: "✕"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Jc,
          {
            hostname: I,
            displayId: E,
            activeSegments: oe,
            viewportStartMs: m,
            viewportDurationMs: y,
            baseEpochMs: P,
            inPointMs: C,
            outPointMs: j,
            globalGaps: x,
            isAutoDirectorEnabled: r,
            gaps: re,
            stepperSegments: R ? D : null
          }
        )
      ]
    }
  );
}
const nl = /* @__PURE__ */ new Map(), Xl = /* @__PURE__ */ new Map();
function xh(e, t, n, r = 250) {
  return `${(e || "").replace(/^live\//i, "").toLowerCase().trim()}_${Math.round(t)}_${Math.round(n)}_${r}`;
}
const Pr = {
  /**
   * Gets cached waveform peaks synchronously if already fetched.
   */
  get(e, t, n, r = 250) {
    const l = xh(e, t, n, r);
    return nl.get(l) || null;
  },
  /**
   * Asynchronously fetches acoustic peaks from the server.
   * Deduplicates in-flight calls and caches responses in memory.
   */
  async fetchWaveform(e, t, n, r = null, l = 250) {
    if (!e || n <= t) return null;
    const o = (e || "").replace(/^live\//i, "").trim(), a = xh(e, t, n, l);
    if (nl.has(a))
      return nl.get(a);
    if (Xl.has(a))
      return Xl.get(a);
    const i = (async () => {
      try {
        const c = `/api/v1/extractor-advanced/audio-waveform?stationId=${encodeURIComponent(o)}&startEpoch=${Math.round(t)}&endEpoch=${Math.round(n)}&points=${l}`, d = await fetch(c, { signal: r });
        if (!d.ok) {
          if (d.status === 204) return null;
          throw new Error(`HTTP ${d.status}`);
        }
        const v = await d.json();
        if (Array.isArray(v) && v.length > 0)
          return nl.set(a, v), v;
      } catch (c) {
        if (c.name !== "AbortError") {
          const d = new Array(l).fill(0.02);
          return nl.set(a, d), d;
        }
      } finally {
        Xl.delete(a);
      }
      return null;
    })();
    return Xl.set(a, i), i;
  },
  /**
   * Clears cached waveforms (e.g. on project change)
   */
  clear() {
    nl.clear(), Xl.clear();
  }
}, na = {
  sys: "#8B5CF6",
  // Tactical Violet (System Audio / PC Output)
  mic: "#F59E0B"
};
function Va(e, t = 100, n = 24, r = 1, l = {}) {
  const o = l.yCenter !== void 0 ? l.yCenter : n / 2, a = l.maxHalfHeight !== void 0 ? l.maxHalfHeight : n / 2 - 1.5;
  if (!e || !Array.isArray(e) || e.length === 0)
    return `M 0,${o} L ${t},${o}`;
  const i = e.length, c = t / Math.max(1, i - 1), d = Math.max(0, Math.min(3, Number(r) || 1));
  let v = "";
  for (let m = 0; m < i; m++) {
    const y = m * c, C = Math.min(1, Math.max(0.02, (e[m] || 0) * d)), j = o - C * a;
    v += m === 0 ? `M ${y.toFixed(2)},${j.toFixed(2)}` : ` L ${y.toFixed(2)},${j.toFixed(2)}`;
  }
  let p = "";
  for (let m = i - 1; m >= 0; m--) {
    const y = m * c, C = Math.min(1, Math.max(0.02, (e[m] || 0) * d)), j = o + C * a;
    p += ` L ${y.toFixed(2)},${j.toFixed(2)}`;
  }
  return `${v}${p} Z`;
}
function Dx(e, t = 100, n = 24, r = 1) {
  let l = null, o = null;
  e && typeof e == "object" && !Array.isArray(e) && e.sys && e.mic ? (l = e.sys, o = e.mic) : Array.isArray(e) && (l = e.map((c, d) => Math.min(1, Math.max(0.02, c * (1 + 0.12 * Math.sin(d * 0.45))))), o = e.map((c, d) => Math.min(1, Math.max(0.02, c * (0.92 + 0.15 * Math.cos(d * 0.38))))));
  const a = Va(l, t, n, r, {
    yCenter: n * 0.25,
    maxHalfHeight: n * 0.25 - 1.2
  }), i = Va(o, t, n, r, {
    yCenter: n * 0.75,
    maxHalfHeight: n * 0.25 - 1.2
  });
  return { sysPath: a, micPath: i };
}
const sa = ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
function Qp({ peaks: e, channelMode: t = "both", effectiveGain: n = 1, isLoadingWaveform: r = !1, laneColor: l = "#06B6D4" }) {
  const o = t === "both", a = t === "sys", i = t === "mic", c = u.useMemo(() => !o || !e ? null : Dx(e, 100, 24, n), [o, e, n]), d = u.useMemo(() => o || !e ? null : Va(e, 100, 24, n, { yCenter: 12, maxHalfHeight: 10.5 }), [o, e, n]);
  if (r)
    return /* @__PURE__ */ s.jsxs("div", { className: "waveform-loading-shimmer", title: "Decoding Station Audio Waveform...", children: [
      /* @__PURE__ */ s.jsx("div", { className: "shimmer-scanner" }),
      /* @__PURE__ */ s.jsx("span", { className: "shimmer-text", children: "DECODING AUDIO..." })
    ] });
  if (o) {
    const p = na.sys, m = na.mic;
    return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg waveform-svg-dual", children: [
      /* @__PURE__ */ s.jsx(
        "path",
        {
          d: (c == null ? void 0 : c.sysPath) || "M 0,6 L 100,6",
          fill: p,
          fillOpacity: "0.45",
          stroke: p,
          strokeWidth: "1.1",
          strokeOpacity: "0.9",
          className: "waveform-sys-path"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "line",
        {
          x1: "0",
          y1: "12",
          x2: "100",
          y2: "12",
          stroke: "rgba(255, 255, 255, 0.22)",
          strokeWidth: "0.8",
          strokeDasharray: "2 2",
          className: "waveform-center-divider"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "path",
        {
          d: (c == null ? void 0 : c.micPath) || "M 0,18 L 100,18",
          fill: m,
          fillOpacity: "0.45",
          stroke: m,
          strokeWidth: "1.1",
          strokeOpacity: "0.9",
          className: "waveform-mic-path"
        }
      )
    ] });
  }
  const v = a ? na.sys : i ? na.mic : l || "#06B6D4";
  return /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 100 24", preserveAspectRatio: "none", className: "waveform-svg", children: /* @__PURE__ */ s.jsx(
    "path",
    {
      d: d || Va(e, 100, 24, n),
      fill: v,
      fillOpacity: "0.45",
      stroke: v,
      strokeWidth: "1.2",
      strokeOpacity: "0.85"
    }
  ) });
}
function Px({
  clip: e,
  lane: t,
  laneColor: n,
  isSelected: r,
  onSelect: l,
  onOpenMenu: o,
  onTrimDrag: a,
  onClipMoveDrag: i,
  onToggleChannelMode: c,
  vpStartEpoch: d,
  viewportDurationMs: v,
  timeMode: p,
  stationName: m
}) {
  const [y, C] = u.useState(() => Pr.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250) || null), [j, P] = u.useState(!1);
  u.useEffect(() => {
    let F = !0;
    const oe = new AbortController(), re = Pr.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 250);
    if (re) {
      C(re), P(!1);
      return;
    }
    return C(null), P(!0), Pr.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, oe.signal, 250).then((X) => {
      F && (X && C(X), P(!1));
    }).catch(() => {
      F && P(!1);
    }), () => {
      F = !1, oe.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const w = e.startEpochMs, g = e.endEpochMs, x = Math.max(1, g - w), I = (e.gain || 1) * (t.gain || 1), S = Math.max(d, w), M = Math.min(d + v, g), h = (S - d) / v * 100, $ = (M - S) / v * 100;
  if ($ <= 0) return null;
  const E = e.channelMode || t.channelMode || "both", N = e.fadeInMs ?? 50, _ = e.fadeOutMs ?? 50, U = Math.min(45, N / x * 100), R = Math.min(45, _ / x * 100);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `audio-clip-block ${t.isMuted ? "lane-muted" : ""} ${r ? "is-selected" : ""}`,
      style: {
        left: `${h}%`,
        width: `${$}%`,
        borderLeftColor: n
      },
      onClick: l,
      onMouseDown: (F) => {
        !F.target.closest(".trim-handle") && !F.target.closest(".btn-menu-close") && !F.target.closest(".clip-channel-tag") && (i == null || i(F));
      },
      onDoubleClick: o,
      onContextMenu: o,
      title: `Audio Clip: ${m} [${E.toUpperCase()}] (${St(w, p, { includeSeconds: !0 })} - ${St(g, p, { includeSeconds: !0 })})
Gain: ${Math.round(e.gain * 100)}% • Fade: IN ${N}ms / OUT ${_}ms
Drag body: Move in time • Drag edges: Trim • Click tag: Toggle channel • Double-click: Edit`,
      children: [
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-left",
            onMouseDown: (F) => a(F, "start"),
            title: "Drag to trim Clip In-Point"
          }
        ),
        N > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-in-ramp",
            style: { width: `${U}%` },
            title: `Fade In: ${N}ms`,
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "fade-ramp-svg", children: [
              /* @__PURE__ */ s.jsx("polygon", { points: "0,0 100,0 0,100", fill: "rgba(6, 182, 212, 0.3)" }),
              /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "100", x2: "100", y2: "0", stroke: "#38BDF8", strokeWidth: "2", strokeDasharray: "3 2" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          Qp,
          {
            peaks: y,
            channelMode: E,
            effectiveGain: I,
            isLoadingWaveform: j,
            laneColor: n
          }
        ) }),
        _ > 0 && /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "clip-fade-ramp fade-out-ramp",
            style: { width: `${R}%` },
            title: `Fade Out: ${_}ms`,
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "fade-ramp-svg", children: [
              /* @__PURE__ */ s.jsx("polygon", { points: "0,0 100,0 100,100", fill: "rgba(244, 63, 94, 0.3)" }),
              /* @__PURE__ */ s.jsx("line", { x1: "0", y1: "0", x2: "100", y2: "100", stroke: "#F43F5E", strokeWidth: "2", strokeDasharray: "3 2" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsxs("div", { className: "clip-info-badge", children: [
          /* @__PURE__ */ s.jsx("span", { className: "clip-station-name", children: m }),
          /* @__PURE__ */ s.jsx(
            "span",
            {
              className: `clip-channel-tag mode-${E}`,
              onClick: (F) => {
                F.stopPropagation(), c == null || c();
              },
              title: `Channel Mode: ${E.toUpperCase()} (Click to cycle BOTH / SYS / MIC)`,
              children: E.toUpperCase()
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "clip-gain-tag", children: [
            Math.round(e.gain * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "trim-handle trim-handle-right",
            onMouseDown: (F) => a(F, "end"),
            title: "Drag to trim Clip Out-Point"
          }
        )
      ]
    }
  );
}
function _x({
  clip: e,
  vpStartEpoch: t,
  viewportDurationMs: n,
  timeMode: r,
  stationName: l,
  onExpand: o
}) {
  const [a, i] = u.useState(() => Pr.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 200) || null), [c, d] = u.useState(!1);
  u.useEffect(() => {
    let w = !0;
    const g = new AbortController(), x = Pr.get(e.sourceStationId, e.startEpochMs, e.endEpochMs, 200);
    if (x) {
      i(x), d(!1);
      return;
    }
    return i(null), d(!0), Pr.fetchWaveform(e.sourceStationId, e.startEpochMs, e.endEpochMs, g.signal, 200).then((I) => {
      w && (I && i(I), d(!1));
    }).catch(() => {
      w && d(!1);
    }), () => {
      w = !1, g.abort();
    };
  }, [e.sourceStationId, e.startEpochMs, e.endEpochMs]);
  const v = e.startEpochMs, p = e.endEpochMs, m = Math.max(t, v), y = Math.min(t + n, p), C = (m - t) / n * 100, j = (y - m) / n * 100;
  if (j <= 0) return null;
  const P = e.effectiveChannelMode || "both";
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `collapsed-master-clip mode-${P}`,
      style: {
        left: `${C}%`,
        width: `${j}%`,
        borderLeftColor: e.laneColor
      },
      onDoubleClick: o,
      title: `Master Audio Bus Stream: ${l} [${P.toUpperCase()}] (${St(v, r, { includeSeconds: !0 })} - ${St(p, r, { includeSeconds: !0 })})
Gain: ${Math.round(e.effectiveGain * 100)}%
Double-click to expand multitrack audio lanes`,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "clip-waveform-graphic", children: /* @__PURE__ */ s.jsx(
          Qp,
          {
            peaks: a,
            channelMode: P,
            effectiveGain: e.effectiveGain,
            isLoadingWaveform: c,
            laneColor: e.laneColor
          }
        ) }),
        /* @__PURE__ */ s.jsxs("div", { className: "collapsed-clip-info", children: [
          /* @__PURE__ */ s.jsx("span", { className: "collapsed-clip-station", children: l }),
          /* @__PURE__ */ s.jsx("span", { className: `clip-channel-tag mode-${P}`, children: P.toUpperCase() }),
          /* @__PURE__ */ s.jsxs("span", { className: "collapsed-clip-gain", children: [
            Math.round(e.effectiveGain * 100),
            "%"
          ] })
        ] })
      ]
    }
  );
}
function Fx({
  audioPlan: e,
  stations: t = [],
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  baseEpochMs: l = 0,
  playheadMs: o = 0,
  onSplitSegment: a,
  onChangeSegmentStation: i,
  onChangeSegmentGain: c,
  onFollowVisualFeed: d,
  isAutoFollow: v = !1,
  timeMode: p = "LOCAL",
  onUpdateAudioPlan: m = null
}) {
  const y = u.useRef(null), [C, j] = u.useState(() => {
    try {
      return localStorage.getItem("itb_audio_bus_expanded") === "true";
    } catch {
      return !1;
    }
  }), [P, w] = u.useState(!1), [g, x] = u.useState(null), [I, S] = u.useState(1), [M, h] = u.useState(50), [$, E] = u.useState(50), [N, _] = u.useState([]), [U, R] = u.useState(null), [F, oe] = u.useState({ rms: 0, peak: 0, db: -60, isPlaying: !1 });
  u.useEffect(() => {
    const T = (Q) => {
      Q.detail && oe(Q.detail);
    };
    return window.addEventListener("itb-live-audio-level", T), () => window.removeEventListener("itb-live-audio-level", T);
  }, []);
  const re = u.useCallback(() => {
    j((T) => {
      const Q = !T;
      try {
        localStorage.setItem("itb_audio_bus_expanded", String(Q));
      } catch {
      }
      return Q;
    });
  }, []), [X, D] = u.useState(() => e != null && e.segments && e.segments.length > 0 ? [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      channelMode: "both",
      clips: e.segments.map((T, Q) => {
        var G;
        return {
          id: `clip_${Q}_${T.startEpochMs || T.StartEpochMs}`,
          startEpochMs: T.startEpochMs ?? T.StartEpochMs ?? l,
          endEpochMs: T.endEpochMs ?? T.EndEpochMs ?? l + r,
          sourceStationId: T.sourceStationId ?? T.SourceStationId ?? (((G = t[0]) == null ? void 0 : G.id) || "station-0"),
          gain: T.gain ?? T.Gain ?? 1,
          channelMode: T.channelMode ?? T.ChannelMode ?? "both",
          fadeInMs: T.fadeInMs ?? T.FadeInMs ?? 50,
          fadeOutMs: T.fadeOutMs ?? T.FadeOutMs ?? 50
        };
      })
    }
  ] : [
    {
      id: "A1",
      name: "Track A1",
      isMuted: !1,
      isSolo: !1,
      gain: 1,
      channelMode: "both",
      clips: []
    }
  ]), K = l + o, b = l + n, B = b + r, L = u.useCallback((T) => {
    if (!m) return;
    const Q = [];
    T.forEach((G) => {
      G.isMuted || P || G.clips.forEach((te) => {
        Q.push({
          startEpochMs: te.startEpochMs,
          endEpochMs: te.endEpochMs,
          sourceStationId: te.sourceStationId,
          gain: te.gain * G.gain,
          channelMode: te.channelMode || G.channelMode || "both",
          fadeInMs: te.fadeInMs ?? 50,
          fadeOutMs: te.fadeOutMs ?? 50
        });
      });
    }), Q.sort((G, te) => G.startEpochMs - te.startEpochMs), m({ segments: Q });
  }, [m, P]);
  u.useEffect(() => {
    let T = null;
    for (const Q of X)
      if (!(Q.isMuted || P)) {
        for (const G of Q.clips)
          if (K >= G.startEpochMs && K <= G.endEpochMs) {
            const te = t.find((J) => J.id === G.sourceStationId);
            T = {
              stationId: G.sourceStationId,
              stationName: te ? te.displayName || te.hostname || te.id : G.sourceStationId,
              channelMode: G.channelMode || Q.channelMode || "both",
              gain: G.gain * Q.gain,
              isPlaying: F.isPlaying
            };
            break;
          }
        if (T) break;
      }
    window.dispatchEvent(new CustomEvent("itb-active-audio-source", { detail: T }));
  }, [X, P, K, t, F.isPlaying]), u.useEffect(() => {
    const T = () => {
      N.length !== 0 && (D((te) => {
        const J = te.map((ee) => ({
          ...ee,
          clips: ee.clips.filter((he) => !N.includes(he.id))
        }));
        return L(J), J;
      }), _([]), x(null));
    }, Q = (te) => {
      if (te.key === "Delete" || te.key === "Backspace") {
        const J = te.target;
        if (J.tagName === "INPUT" || J.tagName === "TEXTAREA" || J.isContentEditable) return;
        N.length > 0 && (te.preventDefault(), T());
      }
    }, G = () => T();
    return window.addEventListener("keydown", Q), window.addEventListener("itb:studio-delete-selected", G), () => {
      window.removeEventListener("keydown", Q), window.removeEventListener("itb:studio-delete-selected", G);
    };
  }, [N, L]);
  const ie = u.useCallback(() => {
    D((T) => {
      const G = `A${T.length + 1}`, te = {
        id: G,
        name: `Track ${G}`,
        isMuted: !1,
        isSolo: !1,
        gain: 1,
        channelMode: "both",
        clips: []
      }, J = [...T, te];
      return L(J), J;
    });
  }, [L]), ne = u.useCallback((T) => {
    D((Q) => {
      if (Q.length <= 1) return Q;
      const G = Q.filter((te) => te.id !== T);
      return L(G), G;
    });
  }, [L]), q = u.useCallback((T) => {
    D((Q) => {
      const G = Q.map((te) => te.id === T ? { ...te, isMuted: !te.isMuted } : te);
      return L(G), G;
    });
  }, [L]), H = u.useCallback((T) => {
    D((Q) => {
      var J;
      const G = (J = Q.find((ee) => ee.id === T)) == null ? void 0 : J.isSolo, te = Q.map((ee) => ({
        ...ee,
        isSolo: ee.id === T ? !G : !1,
        isMuted: ee.id === T ? !1 : !G
      }));
      return L(te), te;
    });
  }, [L]), Ae = u.useCallback((T) => {
    const Q = ["both", "sys", "mic"];
    D((G) => {
      const te = G.map((J) => {
        if (J.id !== T) return J;
        const ee = J.channelMode || "both", he = Q[(Q.indexOf(ee) + 1) % Q.length];
        return {
          ...J,
          channelMode: he,
          clips: J.clips.map((Ge) => ({ ...Ge, channelMode: he }))
        };
      });
      return L(te), te;
    });
  }, [L]), $e = u.useCallback((T, Q) => {
    const G = Math.max(0, Math.min(2, Number(Q)));
    D((te) => {
      const J = te.map((ee) => ee.id === T ? { ...ee, gain: G } : ee);
      return L(J), J;
    }), fh(G);
  }, [L]), Ie = u.useCallback((T, Q) => {
    Q && D((G) => {
      const te = G.map((J) => {
        if (J.id !== T) return J;
        if (J.clips.length === 0) {
          const ee = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: l,
            endEpochMs: l + r,
            sourceStationId: Q,
            gain: 1,
            channelMode: J.channelMode || "both",
            fadeInMs: 50,
            fadeOutMs: 50
          };
          return { ...J, clips: [ee] };
        }
        return {
          ...J,
          clips: J.clips.map((ee) => ({ ...ee, sourceStationId: Q }))
        };
      });
      return L(te), te;
    });
  }, [l, r, L]), Ue = u.useCallback((T, Q = null, G = null) => {
    var dt;
    const te = Q || ((dt = t[0]) == null ? void 0 : dt.id) || "station-0", J = G !== null ? G : K, ee = Math.min(r, 6e4), he = J + ee, Ge = X.find((Je) => Je.id === T), _e = (Ge == null ? void 0 : Ge.channelMode) || "both", Be = {
      id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      startEpochMs: Math.round(J),
      endEpochMs: Math.round(he),
      sourceStationId: te,
      gain: 1,
      channelMode: _e,
      fadeInMs: 50,
      fadeOutMs: 50
    };
    D((Je) => {
      const wt = Je.map((Et) => Et.id === T ? {
        ...Et,
        clips: [...Et.clips, Be].sort((Gt, Lt) => Gt.startEpochMs - Lt.startEpochMs)
      } : Et);
      return L(wt), wt;
    });
  }, [X, K, r, t, L]), xe = u.useCallback((T, Q = null) => {
    D((G) => {
      const te = G.map((J) => {
        if (T && J.id !== T) return J;
        const ee = [];
        return J.clips.forEach((he) => {
          (!Q || he.id === Q || N.includes(he.id)) && K > he.startEpochMs + 500 && K < he.endEpochMs - 500 ? (ee.push({ ...he, endEpochMs: K }), ee.push({
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: K,
            endEpochMs: he.endEpochMs,
            sourceStationId: he.sourceStationId,
            gain: he.gain,
            channelMode: he.channelMode || J.channelMode || "both",
            fadeInMs: he.fadeInMs ?? 50,
            fadeOutMs: he.fadeOutMs ?? 50
          })) : ee.push(he);
        }), { ...J, clips: ee };
      });
      return L(te), te;
    }), x(null);
  }, [K, N, L]), Me = u.useCallback(() => {
    xe(null, null);
  }, [xe]), nt = u.useCallback((T, Q) => {
    D((G) => {
      const te = G.map((J) => J.id !== T ? J : {
        ...J,
        clips: J.clips.filter((ee) => ee.id !== Q)
      });
      return L(te), te;
    }), x(null);
  }, [L]), gt = u.useCallback((T, Q, G) => {
    D((te) => {
      const J = te.map((ee) => ee.id !== T ? ee : {
        ...ee,
        clips: ee.clips.map((he) => he.id === Q ? { ...he, sourceStationId: G } : he)
      });
      return L(J), J;
    }), x((te) => te ? { ...te, stationId: G } : null);
  }, [L]), ce = u.useCallback((T, Q, G) => {
    const te = Math.max(0, Math.min(2.5, Number(G)));
    S(te), D((J) => {
      const ee = J.map((he) => he.id !== T ? he : {
        ...he,
        clips: he.clips.map((Ge) => Ge.id === Q ? { ...Ge, gain: te } : Ge)
      });
      return L(ee), ee;
    }), fh(te);
  }, [L]), Ce = u.useCallback((T, Q, G, te) => {
    const J = Math.max(0, Math.min(1e4, Math.round(Number(te) || 0)));
    G === "in" ? h(J) : E(J), D((ee) => {
      const he = ee.map((Ge) => Ge.id !== T ? Ge : {
        ...Ge,
        clips: Ge.clips.map((_e) => _e.id === Q ? G === "in" ? { ..._e, fadeInMs: J } : { ..._e, fadeOutMs: J } : _e)
      });
      return L(he), he;
    }), x((ee) => ee ? G === "in" ? { ...ee, fadeInMs: J } : { ...ee, fadeOutMs: J } : null);
  }, [L]), Ve = u.useCallback((T, Q, G) => {
    var Gt, Lt;
    if (T.preventDefault(), T.stopPropagation(), T.button !== 0) return;
    const te = X.find((et) => et.id === Q), J = (Gt = te == null ? void 0 : te.clips) == null ? void 0 : Gt.find((et) => et.id === G);
    if (!J) return;
    const ee = T.clientX, he = J.startEpochMs, _e = J.endEpochMs - he, Be = y.current;
    if (!Be) return;
    const dt = (Lt = Be.querySelector(".audio-lane-timeline")) == null ? void 0 : Lt.getBoundingClientRect();
    if (!dt || dt.width <= 0) return;
    let Je = !1;
    const wt = (et) => {
      const ht = et.clientX - ee;
      Math.abs(ht) > 3 && (Je = !0);
      const Tt = ht / dt.width * r;
      let rt = Math.round(he + Tt), Re = rt + _e;
      const ot = 12 / dt.width * r;
      Math.abs(rt - K) <= ot ? (rt = K, Re = rt + _e) : Math.abs(Re - K) <= ot && (Re = K, rt = Re - _e), rt < l && (rt = l, Re = rt + _e), D((Zt) => Zt.map((_t) => _t.id !== Q ? _t : {
        ..._t,
        clips: _t.clips.map((cn) => cn.id === G ? { ...cn, startEpochMs: rt, endEpochMs: Re } : cn)
      }));
    }, Et = () => {
      window.removeEventListener("mousemove", wt), window.removeEventListener("mouseup", Et), Je && D((et) => (L(et), et));
    };
    window.addEventListener("mousemove", wt), window.addEventListener("mouseup", Et);
  }, [X, r, K, l, L]), ze = u.useCallback((T, Q, G, te) => {
    T.preventDefault(), T.stopPropagation();
    const J = T.clientX, ee = X.find((Je) => Je.id === Q), he = ee == null ? void 0 : ee.clips.find((Je) => Je.id === G);
    if (!he) return;
    const Ge = he.startEpochMs, _e = he.endEpochMs, Be = (Je) => {
      var et;
      const wt = Je.clientX - J, Et = (et = y.current) == null ? void 0 : et.querySelector(".audio-lane-timeline");
      if (!Et) return;
      const Gt = Et.getBoundingClientRect(), Lt = wt / Gt.width * r;
      D((ht) => ht.map((Tt) => Tt.id !== Q ? Tt : {
        ...Tt,
        clips: Tt.clips.map((rt) => {
          if (rt.id !== G) return rt;
          if (te === "start") {
            const Re = Math.min(_e - 500, Ge + Lt);
            return { ...rt, startEpochMs: Math.round(Re) };
          } else {
            const Re = Math.max(Ge + 500, _e + Lt);
            return { ...rt, endEpochMs: Math.round(Re) };
          }
        })
      }));
    }, dt = () => {
      window.removeEventListener("mousemove", Be), window.removeEventListener("mouseup", dt), D((Je) => (L(Je), Je));
    };
    window.addEventListener("mousemove", Be), window.addEventListener("mouseup", dt);
  }, [X, r, L]), st = u.useCallback((T, Q, G) => {
    D((te) => {
      const J = te.map((ee) => ee.id !== T ? ee : {
        ...ee,
        clips: ee.clips.map((he) => he.id === Q ? { ...he, channelMode: G } : he)
      });
      return L(J), J;
    }), x((te) => te ? { ...te, channelMode: G } : null);
  }, [L]), We = u.useCallback((T, Q) => {
    var _e;
    const G = X.find((Be) => Be.id === T), te = (_e = G == null ? void 0 : G.clips) == null ? void 0 : _e.find((Be) => Be.id === Q);
    if (!te) return;
    const J = te.channelMode || G.channelMode || "both", ee = ["both", "sys", "mic"], he = (ee.indexOf(J) + 1) % ee.length, Ge = ee[he];
    st(T, Q, Ge);
  }, [X, st]), se = (T, Q, G) => {
    T.preventDefault(), T.stopPropagation();
    const te = 280, J = 390, ee = Math.max(16, Math.min(window.innerWidth - te - 16, T.clientX - te / 2));
    let he = T.clientY - J - 12;
    he < 80 && (he = Math.min(window.innerHeight - J - 16, T.clientY + 24)), S(G.gain || 1), h(G.fadeInMs ?? 50), E(G.fadeOutMs ?? 50), x({
      laneId: Q,
      clipId: G.id,
      s: G.startEpochMs,
      e: G.endEpochMs,
      x: ee,
      y: he,
      stationId: G.sourceStationId,
      gain: G.gain || 1,
      channelMode: G.channelMode || "both",
      fadeInMs: G.fadeInMs ?? 50,
      fadeOutMs: G.fadeOutMs ?? 50
    });
  };
  u.useEffect(() => {
    if (!g) return;
    const T = () => x(null), Q = (G) => {
      G.key === "Escape" && x(null);
    };
    return window.addEventListener("click", T), window.addEventListener("keydown", Q), () => {
      window.removeEventListener("click", T), window.removeEventListener("keydown", Q);
    };
  }, [g]);
  const me = u.useMemo(() => {
    if (P) return [];
    const T = X.some((te) => te.isSolo), Q = X.filter((te) => T ? te.isSolo : !te.isMuted), G = [];
    return Q.forEach((te) => {
      const J = sa[X.indexOf(te) % sa.length];
      te.clips.forEach((ee) => {
        G.push({
          ...ee,
          laneId: te.id,
          laneName: te.name,
          laneColor: J,
          effectiveChannelMode: ee.channelMode || te.channelMode || "both",
          effectiveGain: (ee.gain || 1) * (te.gain || 1)
        });
      });
    }), G.sort((te, J) => te.startEpochMs - J.startEpochMs);
  }, [X, P]);
  return !t || t.length === 0 ? null : C ? /* @__PURE__ */ s.jsxs("div", { className: "audio-routing-track-container is-expanded-multitrack", ref: y, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "audio-bus-master-bar", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-left", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-expand-bus is-open",
            onClick: re,
            title: "Collapse Audio Master Bus",
            children: "▼"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: "🔊" }),
        /* @__PURE__ */ s.jsx("span", { className: "audio-master-title", children: "AUDIO MASTER BUS" }),
        /* @__PURE__ */ s.jsxs("span", { className: "badge-lanes-count", children: [
          X.length,
          " TRACKS"
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-add-audio-lane",
            onClick: ie,
            title: "Add New Audio Lane (A2, A3...)",
            children: "＋ ADD AUDIO LANE"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "btn-split-playhead",
            onClick: Me,
            title: "Split clip at playhead (Ctrl+K / Razor Tool)",
            children: "✂️ SPLIT AT PLAYHEAD"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "master-bar-right", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "vu-meter-readout", title: `Current Master Level: ${F.db.toFixed(1)} dB`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "vu-db-text", children: F.db > -55 ? `${F.db.toFixed(0)} dB` : "-∞ dB" }),
          /* @__PURE__ */ s.jsx("div", { className: "vu-meter-groove", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "vu-meter-bar",
              style: {
                width: `${Math.min(100, Math.max(0, (F.peak || 0) * 100))}%`,
                background: F.peak > 0.85 ? "#F43F5E" : F.peak > 0.65 ? "#F59E0B" : "#10B981"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-master-mute ${P ? "is-muted" : ""}`,
            onClick: () => {
              w((T) => {
                const Q = !T;
                return L(X), Q;
              });
            },
            title: P ? "Unmute All Audio Buses" : "Mute All Audio Buses",
            children: P ? "🔇 MUTED" : "🔊 MUTE ALL"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "audio-lanes-stack", children: X.map((T, Q) => {
      const G = sa[Q % sa.length], te = U === T.id, J = t.find((ee) => {
        var he;
        return ee.id === ((he = T.clips[0]) == null ? void 0 : he.sourceStationId);
      }) || t[0];
      return /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-lane-header", style: { borderLeftColor: G }, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "lane-ident", children: [
            /* @__PURE__ */ s.jsx("span", { className: "lane-badge", style: { backgroundColor: G }, children: T.id }),
            /* @__PURE__ */ s.jsx("span", { className: "lane-name", children: T.name })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "lane-station-selector", children: /* @__PURE__ */ s.jsx(
            "select",
            {
              className: "lane-station-select",
              value: (J == null ? void 0 : J.id) || "",
              onChange: (ee) => Ie(T.id, ee.target.value),
              title: "Select source workstation for this track / Drop workstation here",
              children: t.map((ee) => /* @__PURE__ */ s.jsx("option", { value: ee.id, children: ee.displayName || ee.hostname || ee.id }, ee.id))
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-buttons-group", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle mute-btn ${T.isMuted ? "active" : ""}`,
                onClick: () => q(T.id),
                title: T.isMuted ? "Unmute Lane" : "Mute Lane",
                children: "M"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-toggle solo-btn ${T.isSolo ? "active" : ""}`,
                onClick: () => H(T.id),
                title: T.isSolo ? "Unsolo Lane" : "Solo Lane",
                children: "S"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-lane-channel-mode mode-${T.channelMode || "both"}`,
                onClick: () => Ae(T.id),
                title: `Discrete Audio Channel: ${(T.channelMode || "both").toUpperCase()} (Click to toggle BOTH / SYS / MIC)`,
                children: (T.channelMode || "both").toUpperCase()
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "lane-gain-control", children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "range",
                min: "0",
                max: "2",
                step: "0.05",
                value: T.gain,
                onChange: (ee) => $e(T.id, ee.target.value),
                title: `Lane Gain: ${Math.round(T.gain * 100)}%`,
                className: "lane-gain-slider"
              }
            ),
            /* @__PURE__ */ s.jsxs("span", { className: "gain-label-pct", children: [
              Math.round(T.gain * 100),
              "%"
            ] })
          ] }),
          X.length > 1 && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-remove-lane",
              onClick: () => ne(T.id),
              title: "Delete Audio Lane",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `audio-lane-timeline ${te ? "is-drag-over" : ""}`,
            onClick: () => _([]),
            onDragOver: (ee) => {
              ee.preventDefault(), ee.dataTransfer.dropEffect = "copy", U !== T.id && R(T.id);
            },
            onDragLeave: () => {
              U === T.id && R(null);
            },
            onDrop: (ee) => {
              ee.preventDefault(), R(null);
              const he = ee.dataTransfer.getData("text/station-id") || ee.dataTransfer.getData("text/plain");
              if (he) {
                const Ge = ee.currentTarget.getBoundingClientRect(), _e = Math.max(0, Math.min(1, (ee.clientX - Ge.left) / Ge.width)), Be = Math.round(b + _e * r);
                Ue(T.id, he, Be);
              }
            },
            onDoubleClick: (ee) => {
              var Be;
              const he = ee.currentTarget.getBoundingClientRect(), Ge = Math.max(0, Math.min(1, (ee.clientX - he.left) / he.width)), _e = Math.round(b + Ge * r);
              Ue(T.id, (Be = t[0]) == null ? void 0 : Be.id, _e);
            },
            children: [
              T.clips.map((ee) => {
                const he = t.find((_e) => _e.id === ee.sourceStationId), Ge = he ? he.displayName || he.hostname || he.id : ee.sourceStationId;
                return ee.endEpochMs <= b || ee.startEpochMs >= B ? null : /* @__PURE__ */ s.jsx(
                  Px,
                  {
                    clip: ee,
                    lane: T,
                    laneColor: G,
                    isSelected: N.includes(ee.id),
                    onSelect: (_e) => {
                      _e.stopPropagation(), _e.ctrlKey || _e.metaKey ? _(
                        (Be) => Be.includes(ee.id) ? Be.filter((dt) => dt !== ee.id) : [...Be, ee.id]
                      ) : _([ee.id]);
                    },
                    onOpenMenu: (_e) => se(_e, T.id, ee),
                    onTrimDrag: (_e, Be) => ze(_e, T.id, ee.id, Be),
                    onClipMoveDrag: (_e) => Ve(_e, T.id, ee.id),
                    onToggleChannelMode: () => We(T.id, ee.id),
                    vpStartEpoch: b,
                    viewportDurationMs: r,
                    timeMode: p,
                    stationName: Ge
                  },
                  ee.id
                );
              }),
              T.clips.length === 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "empty-lane-placeholder",
                  onClick: () => {
                    var ee;
                    return Ue(T.id, (ee = t[0]) == null ? void 0 : ee.id, K);
                  },
                  title: "Click or drop workstation here to insert audio clip",
                  children: /* @__PURE__ */ s.jsxs("span", { children: [
                    "＋ CLICK OR DRAG WORKSTATION HERE (",
                    T.name,
                    ")"
                  ] })
                }
              )
            ]
          }
        )
      ] }, T.id);
    }) }),
    g && Ts.createPortal(
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "audio-clip-context-menu",
          style: { left: g.x, top: g.y },
          onClick: (T) => T.stopPropagation(),
          children: [
            /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
              /* @__PURE__ */ s.jsx("span", { className: "menu-title", children: "🎙️ EDIT AUDIO CLIP" }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-close",
                  onClick: () => x(null),
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "SOURCE WORKSTATION" }),
              /* @__PURE__ */ s.jsx("div", { className: "station-select-grid", children: t.map((T) => {
                const Q = T.id === g.stationId;
                return /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-station-chip ${Q ? "is-selected" : ""}`,
                    onClick: () => gt(g.laneId, g.clipId, T.id),
                    children: T.displayName || T.hostname || T.id
                  },
                  T.id
                );
              }) })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "AUDIO CHANNEL ROUTING" }),
              /* @__PURE__ */ s.jsxs("div", { className: "channel-mode-grid", children: [
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-both ${g.channelMode === "both" ? "is-selected" : ""}`,
                    onClick: () => st(g.laneId, g.clipId, "both"),
                    title: "Dual channels: SYS loopback + MIC voice",
                    children: "BOTH (SYS + MIC)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-sys ${g.channelMode === "sys" ? "is-selected" : ""}`,
                    onClick: () => st(g.laneId, g.clipId, "sys"),
                    title: "System audio only (PC output loopback)",
                    children: "SYS (PC AUDIO)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: `btn-channel-chip mode-mic ${g.channelMode === "mic" ? "is-selected" : ""}`,
                    onClick: () => st(g.laneId, g.clipId, "mic"),
                    title: "Microphone audio only (vocal input)",
                    children: "MIC (VOICE)"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "section-label-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "VOLUME GAIN" }),
                /* @__PURE__ */ s.jsxs("span", { className: "gain-val", children: [
                  Math.round(I * 100),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ s.jsx(
                "input",
                {
                  type: "range",
                  min: "0",
                  max: "2.5",
                  step: "0.05",
                  value: I,
                  onChange: (T) => ce(g.laneId, g.clipId, T.target.value),
                  className: "menu-gain-slider"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-section", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "section-label-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "section-label", children: "VOLUME FADE IN / FADE OUT" }),
                /* @__PURE__ */ s.jsxs("span", { className: "fade-val", children: [
                  M,
                  "ms / ",
                  $,
                  "ms"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "fade-controls-row", children: [
                /* @__PURE__ */ s.jsxs("label", { className: "fade-input-group", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "fade-input-label", children: "IN" }),
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      max: "5000",
                      step: "25",
                      value: M,
                      onChange: (T) => Ce(g.laneId, g.clipId, "in", T.target.value),
                      className: "fade-number-input"
                    }
                  ),
                  /* @__PURE__ */ s.jsx("span", { className: "fade-unit", children: "ms" })
                ] }),
                /* @__PURE__ */ s.jsxs("label", { className: "fade-input-group", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "fade-input-label", children: "OUT" }),
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      max: "5000",
                      step: "25",
                      value: $,
                      onChange: (T) => Ce(g.laneId, g.clipId, "out", T.target.value),
                      className: "fade-number-input"
                    }
                  ),
                  /* @__PURE__ */ s.jsx("span", { className: "fade-unit", children: "ms" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "menu-actions-row", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-action split",
                  onClick: () => xe(g.laneId, g.clipId),
                  title: "Split clip at timeline playhead (Ctrl+K)",
                  children: "✂️ SPLIT AT PLAYHEAD"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-menu-action delete",
                  onClick: () => nt(g.laneId, g.clipId),
                  title: "Delete this audio clip",
                  children: "🗑️ DELETE CLIP"
                }
              )
            ] })
          ]
        }
      ),
      document.body
    )
  ] }) : /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: "audio-routing-track-container is-compact-track",
      ref: y,
      title: "Audio Master Bus is Collapsed. Click or double-click to Expand Multi-Track Lanes (Fairlight/Premiere NLE)",
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "audio-track-label collapsed-bus-sidebar", onClick: re, children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-expand-bus", title: "Expand Audio Master Bus", children: "▶" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-icon", children: P || me.length === 0 ? "🔇" : "🔊" }),
          /* @__PURE__ */ s.jsx("span", { className: "audio-title", children: "AUDIO MASTER BUS" }),
          /* @__PURE__ */ s.jsx("span", { className: "badge-bus-status", children: me.length > 0 ? `${me.length} CLIPS ACTIVE` : P ? "MUTED" : "0 ACTIVE" }),
          /* @__PURE__ */ s.jsx("div", { className: "mini-vu-dot", style: { background: F.isPlaying ? "#10B981" : "#64748B" } })
        ] }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "audio-track-timeline collapsed-bus-timeline",
            onClick: (T) => {
              T.target.closest(".collapsed-master-clip") || re();
            },
            children: me.length === 0 ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx("div", { className: "collapsed-audio-guide-line" }),
              /* @__PURE__ */ s.jsx("span", { className: "collapsed-audio-label", children: "[ 🔇 MASTER AUDIO BUS (0 ACTIVE) — CLICK TO EXPAND MULTI-TRACK LANES ]" })
            ] }) : me.map((T) => {
              const Q = t.find((te) => te.id === T.sourceStationId), G = Q ? Q.displayName || Q.hostname || Q.id : T.sourceStationId;
              return T.endEpochMs <= b || T.startEpochMs >= B ? null : /* @__PURE__ */ s.jsx(
                _x,
                {
                  clip: T,
                  vpStartEpoch: b,
                  viewportDurationMs: r,
                  timeMode: p,
                  stationName: G,
                  onExpand: re
                },
                `master_${T.id}`
              );
            })
          }
        )
      ]
    }
  );
}
function Bx({
  canvasLayoutTimeline: e,
  activeKfIndex: t = 0,
  onSelectKeyframe: n,
  onAddKeyframeAtEpoch: r,
  onDeleteKeyframe: l,
  onUpdateKeyframeEpoch: o,
  onUpdateKeyframeTransition: a,
  viewportStartMs: i = 0,
  viewportDurationMs: c = 36e5,
  baseEpochMs: d = 0,
  totalDurationMs: v = 36e5,
  playheadMs: p = 0,
  inPointMs: m = 0,
  outPointMs: y = 36e5,
  timeMode: C = "LOCAL"
}) {
  const j = u.useMemo(() => (e == null ? void 0 : e.keyframes) || [], [e]), [P, w] = u.useState(null), [g, x] = u.useState(null);
  To.useEffect(() => {
    if (g === null) return;
    const E = (_) => {
      _.key === "Escape" && x(null);
    }, N = (_) => {
      !_.target.closest(".kf-inspector-popover") && !_.target.closest(".kf-marker-diamond") && x(null);
    };
    return window.addEventListener("keydown", E), window.addEventListener("mousedown", N), () => {
      window.removeEventListener("keydown", E), window.removeEventListener("mousedown", N);
    };
  }, [g]);
  const I = d + p, S = d + i, M = S + c, h = (E) => {
    const N = E.currentTarget.getBoundingClientRect(), _ = E.clientX - N.left, U = Math.max(0, Math.min(1, _ / N.width)), R = Math.round(S + U * c);
    r && r(R);
  }, $ = (E, N, _) => {
    if (E.button !== 0) return;
    E.stopPropagation(), E.preventDefault();
    const U = E.clientX, R = _.timestampEpochMs, F = _.id || `kf_${N}_${R}`, oe = E.currentTarget.closest(".track-surface");
    if (!oe) return;
    let re = !1;
    w({
      idx: N,
      kfId: F,
      startClientX: U,
      initialEpoch: R,
      currentEpoch: R
    });
    const X = (K) => {
      const b = K.clientX - U;
      Math.abs(b) > 3 && (re = !0);
      const B = oe.getBoundingClientRect(), L = b / B.width * c;
      let ie = Math.round(R + L);
      ie = Math.max(d, Math.min(d + v, ie));
      const ne = d + m, q = d + y, H = 14 / B.width * c;
      Math.abs(ie - I) <= H ? ie = I : Math.abs(ie - ne) <= H ? ie = ne : Math.abs(ie - q) <= H && (ie = q), w((Ae) => Ae ? { ...Ae, currentEpoch: ie } : null);
    }, D = (K) => {
      window.removeEventListener("mousemove", X), window.removeEventListener("mouseup", D), w(null);
      const b = oe.getBoundingClientRect(), L = (K.clientX - U) / b.width * c;
      let ie = Math.round(R + L);
      ie = Math.max(d, Math.min(d + v, ie));
      const ne = d + m, q = d + y, H = 14 / b.width * c;
      Math.abs(ie - I) <= H ? ie = I : Math.abs(ie - ne) <= H ? ie = ne : Math.abs(ie - q) <= H && (ie = q), re ? (o && o(F, ie), n && n(N, ie)) : (n && n(N, R), x((Ae) => Ae === N ? null : N));
    };
    window.addEventListener("mousemove", X), window.addEventListener("mouseup", D);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "canvas-keyframe-track-row", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "track-header-cell", children: [
      /* @__PURE__ */ s.jsx("span", { className: "track-icon", children: "❖" }),
      /* @__PURE__ */ s.jsx("span", { className: "track-title", children: "LAYOUT" }),
      /* @__PURE__ */ s.jsxs("span", { className: "kf-count-pill", children: [
        j.length,
        " KF"
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-add-kf-track",
          onClick: (E) => {
            E.stopPropagation(), r && r(I);
          },
          title: "Add layout keyframe at playhead position (+)",
          children: "+ KF"
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "track-surface",
        onClick: h,
        title: "Click anywhere to insert a layout keyframe at timestamp",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "track-grid-lines" }),
          j.map((E, N) => {
            const _ = (P == null ? void 0 : P.idx) === N, U = _ ? P.currentEpoch : E.timestampEpochMs;
            if (U < S - 5e4 || U > M + 5e4) return null;
            const R = (U - S) / c * 100;
            if (R < -2 || R > 102) return null;
            const F = N === t, oe = St(U, C, { includeSeconds: !0 }), re = `${E.transitionType || "smooth"} (${E.transitionDurationSec ?? 0.5}s)`, X = Math.max(0, (U - d) / 1e3).toFixed(1);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `kf-marker-diamond ${F ? "is-active" : ""} ${_ ? "is-dragging" : ""}`,
                style: { left: `${R}%` },
                onMouseDown: (D) => $(D, N, E),
                onContextMenu: (D) => {
                  D.preventDefault(), D.stopPropagation(), j.length > 1 && l && l(N);
                },
                title: `Keyframe #${N + 1} at ${oe} (+${X}s) • ${re}
Drag: Reposition timestamp • Click: Seek • Right-click: Delete`,
                children: [
                  /* @__PURE__ */ s.jsx("div", { className: "diamond-shape", children: "❖" }),
                  _ && /* @__PURE__ */ s.jsxs("div", { className: "diamond-drag-tooltip", children: [
                    /* @__PURE__ */ s.jsx("span", { children: oe }),
                    /* @__PURE__ */ s.jsxs("span", { className: "tooltip-sub", children: [
                      "+",
                      X,
                      "s"
                    ] })
                  ] }),
                  g === N && !_ && /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      className: "kf-inspector-popover",
                      onClick: (D) => D.stopPropagation(),
                      onMouseDown: (D) => D.stopPropagation(),
                      children: [
                        /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-header", children: [
                          /* @__PURE__ */ s.jsxs("span", { className: "kf-badge", children: [
                            "💎 KEYFRAME #",
                            N + 1
                          ] }),
                          /* @__PURE__ */ s.jsx("span", { className: "kf-clock", children: oe }),
                          /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-popover-close",
                              onClick: (D) => {
                                D.stopPropagation(), x(null);
                              },
                              title: "Close",
                              children: "✕"
                            }
                          )
                        ] }),
                        N > 0 ? /* @__PURE__ */ s.jsxs("div", { className: "kf-popover-body", children: [
                          /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "TRANSITION" }),
                            /* @__PURE__ */ s.jsxs("div", { className: "kf-trans-buttons", children: [
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${(E.transitionType || "smooth") === "smooth" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(N, { transitionType: "smooth" }),
                                  title: "Smooth Bezier transition into keyframe layout",
                                  children: "⚡ Smooth"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${E.transitionType === "linear" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(N, { transitionType: "linear" }),
                                  title: "Linear transition into keyframe layout",
                                  children: "↗ Linear"
                                }
                              ),
                              /* @__PURE__ */ s.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: `btn-trans-choice ${E.transitionType === "cut" ? "is-active" : ""}`,
                                  onClick: () => a == null ? void 0 : a(N, { transitionType: "cut" }),
                                  title: "Instant cut into keyframe layout",
                                  children: "✂ Cut"
                                }
                              )
                            ] })
                          ] }),
                          E.transitionType !== "cut" && /* @__PURE__ */ s.jsxs("div", { className: "kf-field-row", children: [
                            /* @__PURE__ */ s.jsx("span", { className: "kf-field-label", children: "DURATION" }),
                            /* @__PURE__ */ s.jsx("div", { className: "kf-dur-buttons", children: [0.2, 0.5, 1, 1.5, 2].map((D) => /* @__PURE__ */ s.jsxs(
                              "button",
                              {
                                type: "button",
                                className: `btn-dur-choice ${(E.transitionDurationSec ?? 0.5) === D ? "is-active" : ""}`,
                                onClick: () => a == null ? void 0 : a(N, { transitionDurationSec: D }),
                                children: [
                                  D,
                                  "s"
                                ]
                              },
                              D
                            )) })
                          ] }),
                          /* @__PURE__ */ s.jsx("div", { className: "kf-popover-footer", children: /* @__PURE__ */ s.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-kf-delete",
                              onClick: (D) => {
                                D.stopPropagation(), l && l(N), x(null);
                              },
                              title: "Delete this keyframe",
                              children: "🗑️ Delete Keyframe"
                            }
                          ) })
                        ] }) : /* @__PURE__ */ s.jsx("div", { className: "kf-popover-body", children: /* @__PURE__ */ s.jsx("span", { className: "kf-root-notice", children: "Root Origin Keyframe (Base layout at timeline origin)" }) })
                      ]
                    }
                  )
                ]
              },
              `kf-${N}`
            );
          })
        ]
      }
    )
  ] });
}
function Wx({
  baseEpochMs: e = 0,
  timeMode: t = "LOCAL",
  viewportStartMs: n = 0,
  viewportDurationMs: r = 36e5,
  playheadMs: l = 0,
  inPointMs: o = 0,
  outPointMs: a = 36e5,
  onStartDrag: i
}) {
  const c = (E) => !r || r <= 0 ? "0%" : `${(E - n) / r * 100}%`, d = (o - n) / r * 100, v = (a - n) / r * 100, p = (l - n) / r * 100, m = p >= -0.2 && p <= 100.2, y = Math.max(0, Math.min(100, p)), C = Math.max(0, d), j = Math.min(100, v), P = Math.max(0, j - C), w = (E) => (N) => {
    N.preventDefault(), N.stopPropagation(), typeof i == "function" && i(E, N);
  }, g = d < 1.5, x = v > 98.5, I = d <= 0.2 && d >= -0.2, S = v >= 99.8 && v <= 100.2, M = p >= -0.2 && p < 3.5, h = p > 96.5 && p <= 100.2, $ = u.useMemo(() => St(e + l, t), [e, l, t]);
  return /* @__PURE__ */ s.jsxs("div", { className: "playhead-overlay-pane", children: [
    P > 0 && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "draggable-cut-band",
        style: { left: `${C}%`, width: `${P}%` },
        onMouseDown: w("range"),
        title: "Drag body to move entire cut range"
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker in-marker ${g ? "flipped" : ""} ${I ? "at-edge" : ""}`,
        style: { left: c(o) },
        onMouseDown: w("in"),
        title: "Drag IN Point",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "handle-badge", children: "IN" }),
          /* @__PURE__ */ s.jsx("div", { className: "marker-core-line" })
        ]
      }
    ),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `marker out-marker ${x ? "flipped" : ""} ${S ? "at-edge" : ""}`,
        style: { left: c(a) },
        onMouseDown: w("out"),
        title: "Drag OUT Point",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "handle-badge", children: "OUT" }),
          /* @__PURE__ */ s.jsx("div", { className: "marker-core-line" })
        ]
      }
    ),
    m && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "playhead-needle",
        style: { left: `${y}%` },
        onMouseDown: w("playhead"),
        title: "Drag Playhead",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: `head-badge ${M ? "edge-left" : ""} ${h ? "edge-right" : ""}`, children: $ }),
          /* @__PURE__ */ s.jsx("div", { className: "needle-core-line" }),
          /* @__PURE__ */ s.jsx("div", { className: "bottom-handle-node" })
        ]
      }
    )
  ] });
}
const Ux = To.memo(Wx);
function zx({
  contextMenu: e,
  baseEpochMs: t = 0,
  timeMode: n = "LOCAL",
  onAction: r,
  onClose: l
}) {
  const o = u.useRef(null);
  if (u.useEffect(() => {
    if (!e) return;
    const p = (m) => {
      m.key === "Escape" && l && l();
    };
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  }, [e, l]), !e) return null;
  const a = 210, i = 150, c = Math.min(e.x, window.innerWidth - a - 12), d = Math.min(e.y, window.innerHeight - i - 12), v = /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: o,
      className: "timeline-context-menu",
      style: { top: d, left: c },
      onClick: (p) => p.stopPropagation(),
      onContextMenu: (p) => p.preventDefault(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
          /* @__PURE__ */ s.jsx("span", { className: "header-tag", children: "TIMELINE POSITION" }),
          /* @__PURE__ */ s.jsx("span", { className: "time-badge", children: St(t + e.targetMs, n) })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "menu-items", children: [
          /* @__PURE__ */ s.jsxs("button", { type: "button", onClick: () => r("playhead"), children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polygon", { points: "6 4 18 12 6 20 6 4", fill: "currentColor" }) }),
            /* @__PURE__ */ s.jsx("span", { children: "Move Playhead" })
          ] }),
          /* @__PURE__ */ s.jsxs("button", { type: "button", onClick: () => r("in"), children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ s.jsx("path", { d: "M4 6v12M9 6l6 6-6 6" }) }),
            /* @__PURE__ */ s.jsx("span", { children: "Set Cut IN" }),
            /* @__PURE__ */ s.jsx("kbd", { className: "shortcut-pill", children: "[" })
          ] }),
          /* @__PURE__ */ s.jsxs("button", { type: "button", onClick: () => r("out"), children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ s.jsx("path", { d: "M20 6v12M15 6l-6 6 6 6" }) }),
            /* @__PURE__ */ s.jsx("span", { children: "Set Cut OUT" }),
            /* @__PURE__ */ s.jsx("kbd", { className: "shortcut-pill", children: "]" })
          ] })
        ] })
      ]
    }
  );
  return Ts.createPortal(v, document.body);
}
function Hx({
  isRangeValid: e,
  onExport: t,
  isEstimating: n,
  estimateData: r,
  formatEstimateSize: l,
  stationsCount: o = 0
}) {
  const a = () => {
    if (o === 0) return "Select stations to enable export";
    if (!e) return "Select a valid IN/OUT range to export";
    if (!r) return "Export Synchronized Multi-Track Clip (Ctrl+E)";
    const i = l(r.estimatedFileSizeBytes), c = r.removedGlobalGapsCount > 0 ? ` • ${r.removedGlobalGapsCount} global gap(s) skipped` : "";
    return `Export Cut (Ctrl+E) • Est: ~${i}${c}`;
  };
  return /* @__PURE__ */ s.jsxs(
    "button",
    {
      type: "button",
      onClick: e ? t : void 0,
      className: `btn-vertical-export-action ${e ? "active" : "disabled"}`,
      disabled: !e,
      title: a(),
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "export-icon-top", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
          /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
          /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
        ] }) }),
        /* @__PURE__ */ s.jsx("span", { className: "vertical-label", children: "EXPORT CUT" }),
        e && /* @__PURE__ */ s.jsx("div", { className: "export-button-estimate-box", children: n ? /* @__PURE__ */ s.jsx("span", { className: "estimate-loading", children: "..." }) : r ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          /* @__PURE__ */ s.jsxs("span", { className: "estimate-size-pill", children: [
            "~",
            l(r.estimatedFileSizeBytes)
          ] }),
          r.removedGlobalGapsCount > 0 && /* @__PURE__ */ s.jsxs("span", { className: "estimate-gaps-pill", title: `${r.removedGlobalGapsCount} global gaps will be skipped`, children: [
            "✂ ",
            r.removedGlobalGapsCount
          ] })
        ] }) : null })
      ]
    }
  );
}
const Kx = (e) => {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024);
  return t >= 1e3 ? `${(t / 1024).toFixed(1)} GB` : `${Math.round(t)} MB`;
};
function Vx({
  stationIdsKey: e,
  inPointMs: t,
  outPointMs: n,
  baseEpochMs: r,
  onEstimateLoaded: l
}) {
  const [o, a] = u.useState(null), [i, c] = u.useState(!1), d = u.useRef(l);
  return u.useEffect(() => {
    d.current = l;
  }, [l]), u.useEffect(() => {
    if (!e || n <= t || !r) {
      a(null);
      return;
    }
    const v = new AbortController();
    c(!0);
    const p = setTimeout(async () => {
      try {
        const m = {
          stationIds: e.split(","),
          inEpochMs: r + Math.round(t),
          outEpochMs: r + Math.round(n)
        }, y = await fetch("/api/v1/extractor-advanced/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(m),
          signal: v.signal
        });
        if (y.ok) {
          const C = await y.json();
          a(C), d.current && d.current(C);
        }
      } catch (m) {
        m.name !== "AbortError" && console.warn("[useTimelineEstimate] Failed estimating cut:", m);
      } finally {
        c(!1);
      }
    }, 350);
    return () => {
      clearTimeout(p), v.abort();
    };
  }, [e, t, n, r]), { estimateData: o, isEstimating: i, formatEstimateSize: Kx };
}
function Yx({
  viewportDurationMs: e,
  totalDurationMs: t,
  playheadMs: n,
  setPlayheadMs: r,
  inPointMs: l,
  setInPointMs: o,
  outPointMs: a,
  setOutPointMs: i,
  viewportStartMs: c,
  setViewportStartMs: d,
  getMsFromClientX: v,
  minimapRef: p
}) {
  const [m, y] = u.useState(null), [C, j] = u.useState(null), P = (w, g) => {
    y(w), j({
      target: w,
      startX: g.clientX,
      initialPlayhead: n,
      initialIn: l,
      initialOut: a,
      initialViewportStart: c
    });
  };
  return u.useEffect(() => {
    if (!m) return;
    const w = e * 0.015, g = (I) => {
      if (m === "minimap-viewport" && (p != null && p.current)) {
        const M = p.current.getBoundingClientRect(), $ = Math.max(0, Math.min(I.clientX - M.left, M.width)) / M.width * t, E = Math.max(0, Math.min($ - e / 2, t - e));
        d(E);
        return;
      }
      const S = v(I.clientX);
      if (m === "playhead") {
        let M = S;
        Math.abs(M - l) <= w ? M = l : Math.abs(M - a) <= w && (M = a), r(Math.max(0, Math.min(t, M)));
      } else if (m === "in") {
        const M = a - 1e3;
        o(Math.max(0, Math.min(S, M)));
      } else if (m === "out") {
        const M = l + 1e3;
        i(Math.min(t, Math.max(S, M)));
      } else if (m === "range" && C) {
        const M = S - v(C.startX), h = C.initialOut - C.initialIn;
        let $ = C.initialIn + M, E = C.initialOut + M;
        $ < 0 ? ($ = 0, E = h) : E > t && (E = t, $ = t - h), o($), i(E);
      }
    }, x = () => {
      y(null), j(null);
    };
    return window.addEventListener("mousemove", g), window.addEventListener("mouseup", x), () => {
      window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", x);
    };
  }, [
    m,
    C,
    v,
    l,
    a,
    n,
    t,
    e,
    r,
    o,
    i,
    d,
    p
  ]), { draggingTarget: m, handleStartDrag: P };
}
const tr = 4;
function Jp({
  stations: e = [],
  activeStationId: t,
  onSelectActiveStation: n,
  onStationContextMenu: r,
  onDeselectStation: l,
  stationAutoDirectorMap: o = {},
  onToggleStationAutoDirector: a,
  baseEpochMs: i = 0,
  timeMode: c = "LOCAL",
  totalDurationMs: d = 36e5,
  zoomLevel: v = 1,
  onZoomChange: p,
  onZoomReset: m,
  playheadMs: y = 0,
  setPlayheadMs: C,
  inPointMs: j = 0,
  setInPointMs: P,
  outPointMs: w = 36e5,
  setOutPointMs: g,
  onExport: x,
  recordingSegments: I = {},
  movieBoundaries: S,
  viewportStartMs: M = 0,
  onViewportStartChange: h,
  onEstimateLoaded: $,
  onFitRange: E,
  onJumpViewportTo: N,
  keystrokeMode: _ = "BURN_IN",
  onChangeKeystrokeMode: U,
  keystrokes: R = [],
  showKeystrokes: F = !1,
  showRulerKeystrokes: oe = !1,
  onToggleRulerKeystrokes: re,
  _onSplitDirectorSegment: X,
  _onChangeDirectorSegmentDisplay: D,
  _onResetDirectorSegmentToAuto: K,
  audioRoutingPlan: b,
  onSplitAudioSegment: B,
  onChangeAudioSegmentStation: L,
  onChangeAudioSegmentGain: ie,
  onFollowVisualFeed: ne,
  isAutoFollowAudio: q,
  canvasLayoutTimeline: H,
  activeKfIndex: Ae = 0,
  onSelectKeyframe: $e,
  onAddKeyframeAtEpoch: Ie,
  onDeleteKeyframe: Ue,
  onUpdateKeyframeEpoch: xe,
  onUpdateKeyframeTransition: Me,
  onToggleDisplayOnCanvas: nt,
  onUpdateAudioPlan: gt
}) {
  var Pe, lt;
  const [ce, Ce] = u.useState(null), [Ve, ze] = u.useState(0), [st, We] = u.useState(null), [se, me] = u.useState(!0), T = (ue) => {
    var V, pe, ye;
    return ((ue == null ? void 0 : ue.displays) || (ue == null ? void 0 : ue.Displays) || ((V = ue == null ? void 0 : ue.displayTopology) == null ? void 0 : V.displays) || ((pe = ue == null ? void 0 : ue.DisplayTopology) == null ? void 0 : pe.Displays) || ((ye = ue == null ? void 0 : ue.topology) == null ? void 0 : ye.displays) || []).length;
  }, [Q, G] = u.useState(() => {
    var ue;
    return e.length === 1 && T(e[0]) > 1 ? (ue = e[0]) == null ? void 0 : ue.id : null;
  });
  u.useEffect(() => {
    var ue;
    if (e.length === 1 && !Q && ((ue = e[0]) != null && ue.id) && T(e[0]) > 1)
      G(e[0].id);
    else if (Q) {
      const Ze = e.find((V) => V.id === Q);
      (!Ze || T(Ze) <= 1) && G(null);
    }
  }, [e, Q]);
  const te = u.useRef(null), J = u.useRef(null), ee = d / Math.max(1, v), he = Math.ceil(e.length / tr) || 1, Ge = u.useMemo(() => {
    const ue = Ve * tr;
    return e.slice(ue, ue + tr);
  }, [e, Ve]);
  u.useEffect(() => {
    if (!t && !Q) return;
    const ue = Q || t, Ze = e.findIndex((V) => V.id === ue);
    if (Ze !== -1) {
      const V = Math.floor(Ze / tr);
      V !== Ve && ze(V);
    }
  }, [t, Q, e, Ve]);
  const _e = ((Pe = H == null ? void 0 : H.keyframes) == null ? void 0 : Pe[Ae]) || ((lt = H == null ? void 0 : H.keyframes) == null ? void 0 : lt[0]), Be = u.useMemo(() => {
    var ue;
    return ((ue = _e == null ? void 0 : _e.layout) == null ? void 0 : ue.placements) || [];
  }, [_e]), dt = u.useMemo(() => e.find((ue) => ue.id === t) || null, [e, t]), Je = (S == null ? void 0 : S.globalFirstMs) ?? null, wt = (S == null ? void 0 : S.globalLastMs) ?? null, Et = u.useMemo(() => (j > 500 || w < d - 500) && w - j >= 1e3, [j, w, d]), Gt = u.useMemo(() => e.map((ue) => ue.id).sort().join(","), [e]), { estimateData: Lt, isEstimating: et, formatEstimateSize: ht } = Vx({
    stationIdsKey: Gt,
    inPointMs: j,
    outPointMs: w,
    baseEpochMs: i,
    onEstimateLoaded: $
  }), Tt = u.useCallback((ue) => {
    if (!te.current) return M;
    const Ze = te.current.getBoundingClientRect(), V = Ze.left + 200, pe = Ze.width - 200 - 58;
    if (pe <= 0) return M;
    const ye = Math.max(0, Math.min(ue - V, pe));
    return Math.round(M + ye / pe * ee);
  }, [M, ee]), { draggingTarget: rt, handleStartDrag: Re } = Yx({
    viewportDurationMs: ee,
    totalDurationMs: d,
    playheadMs: y,
    setPlayheadMs: C,
    inPointMs: j,
    setInPointMs: P,
    outPointMs: w,
    setOutPointMs: g,
    viewportStartMs: M,
    setViewportStartMs: h,
    getMsFromClientX: Tt,
    minimapRef: J
  }), ot = u.useRef(v);
  ot.current = v;
  const Zt = u.useRef(M);
  Zt.current = M;
  const _t = u.useRef(d);
  _t.current = d;
  const cn = u.useRef(y);
  cn.current = y, u.useEffect(() => {
    const ue = te.current;
    if (!ue) return;
    const Ze = (V) => {
      V.preventDefault(), V.stopPropagation();
      const pe = V.ctrlKey || V.shiftKey, ye = ot.current, He = Zt.current, qe = _t.current, xt = cn.current;
      if (pe) {
        const ft = Math.abs(V.deltaX) > Math.abs(V.deltaY) ? V.deltaX : V.deltaY;
        if (ft === 0) return;
        const Qe = qe / Math.max(1, ye), Nt = Math.max(0, qe - Qe), kt = Qe * 0.08 * (ft > 0 ? 1 : -1);
        h == null || h(Math.max(0, Math.min(Nt, He + kt)));
      } else {
        if (V.deltaY === 0) return;
        const Qe = V.deltaY < 0 ? 1.25 : 0.8, Nt = Math.max(32, qe / 2e3), kt = ue.getBoundingClientRect(), Ft = kt.left + 200, $t = kt.width - 200 - 58;
        let un = 0.5;
        if ($t > 0)
          if (V.clientX >= Ft && V.clientX <= kt.right - 58)
            un = Math.max(0, Math.min(1, (V.clientX - Ft) / $t));
          else {
            const Vn = qe / Math.max(1, ye), Vs = (xt - He) / Vn;
            un = Vs >= 0 && Vs <= 1 ? Vs : 0.5;
          }
        const Tn = Math.max(1, Math.min(Nt, Math.round(ye * Qe * 100) / 100));
        if (Tn === ye) return;
        const kn = qe / ye, hs = qe / Tn, Ut = He + un * kn - un * hs, As = Math.max(0, qe - hs);
        p == null || p(Tn), h == null || h(Math.max(0, Math.min(As, Ut)));
      }
    };
    return ue.addEventListener("wheel", Ze, { passive: !1, capture: !0 }), () => ue.removeEventListener("wheel", Ze, { capture: !0 });
  }, [p, h]);
  const De = e.length > 0 && Math.abs(w - j) >= 1e3;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: te,
      className: "timeline-board-root",
      onContextMenu: (ue) => {
        var V;
        ue.preventDefault();
        const Ze = (V = te.current) == null ? void 0 : V.getBoundingClientRect();
        !Ze || ue.clientX - Ze.left < 200 || ue.clientX > Ze.right - 58 || We({ x: ue.clientX, y: ue.clientY, targetMs: Math.max(0, Math.min(d, Tt(ue.clientX))) });
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "timeline-top-deck", children: [
          /* @__PURE__ */ s.jsx("div", { className: "timeline-badge-slot", children: /* @__PURE__ */ s.jsx(
            Mx,
            {
              baseEpochMs: i,
              timeMode: c,
              totalDurationMs: d,
              inPointMs: j,
              setInPointMs: P,
              outPointMs: w,
              setOutPointMs: g
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "timeline-meters-track", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "timeline-overview-strip", children: [
              /* @__PURE__ */ s.jsx(
                bx,
                {
                  minimapRef: J,
                  baseEpochMs: i,
                  timeMode: c,
                  totalDurationMs: d,
                  viewportStartMs: M,
                  viewportDurationMs: ee,
                  zoomLevel: v,
                  inPointMs: j,
                  outPointMs: w,
                  playheadMs: y,
                  onStartDragMinimap: Re
                }
              ),
              /* @__PURE__ */ s.jsx(
                Ix,
                {
                  earliestMediaMs: Je,
                  latestMediaMs: wt,
                  hasActiveCut: Et,
                  onJumpToFirst: () => {
                    Je !== null && (C == null || C(Je), N == null || N(Je, "start"));
                  },
                  onJumpToLast: () => {
                    wt !== null && (C == null || C(wt), N == null || N(wt, "end"));
                  },
                  onContextualFit: () => {
                    Et ? E == null || E(j, w) : Je !== null && wt !== null && wt > Je ? E == null || E(Je, wt) : m == null || m();
                  },
                  onResetZoom: m,
                  baseEpochMs: i,
                  timeMode: c,
                  keystrokeMode: _,
                  onChangeKeystrokeMode: U,
                  showRulerKeystrokes: oe,
                  onToggleRulerKeystrokes: re
                }
              )
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "ruler-container-offset", children: /* @__PURE__ */ s.jsx(
              Sx,
              {
                baseEpochMs: i,
                timeMode: c,
                viewportStartMs: M,
                viewportDurationMs: ee,
                totalDurationMs: d,
                hoverMs: ce,
                onHoverChange: Ce,
                onSeek: (ue) => C == null ? void 0 : C(ue),
                inPointMs: j,
                outPointMs: w,
                earliestMediaMs: Je,
                movieBoundaries: S,
                stationHostname: (dt == null ? void 0 : dt.hostname) || (dt == null ? void 0 : dt.id) || (dt == null ? void 0 : dt.name),
                activeStationName: (dt == null ? void 0 : dt.displayName) || (dt == null ? void 0 : dt.hostname) || (dt == null ? void 0 : dt.name),
                showKeystrokes: !!(oe ?? F),
                keystrokes: R
              }
            ) })
          ] })
        ] }),
        he > 1 && /* @__PURE__ */ s.jsxs("div", { className: "timeline-bank-nav-bar", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: Ve === 0,
              onClick: () => ze((ue) => Math.max(0, ue - 1)),
              className: "btn-bank-step",
              title: "Previous 8 channels",
              children: "◀ PREV"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "bank-status-pill", children: [
            "CHANNELS ",
            Ve * tr + 1,
            "–",
            Math.min(e.length, (Ve + 1) * tr),
            " OF ",
            e.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: Ve >= he - 1,
              onClick: () => ze((ue) => Math.min(he - 1, ue + 1)),
              className: "btn-bank-step",
              title: "Next 8 channels",
              children: "NEXT ▶"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "tracks-with-export-layout",
            onMouseMove: (ue) => {
              if (rt || !te.current) return;
              const Ze = te.current.getBoundingClientRect();
              ue.clientX >= Ze.left + 200 && ue.clientX <= Ze.right - 58 ? Ce(Tt(ue.clientX)) : Ce(null);
            },
            onMouseLeave: () => !rt && Ce(null),
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "tracks-scroll-area", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "timeline-section-divider-bar video-section-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "section-title-wrap", onClick: () => me((ue) => !ue), children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-section-toggle", title: "Collapse / Expand All Video Stations", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: se ? "6 9 12 15 18 9" : "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsxs("span", { className: "section-title-text", children: [
                      "🎬 VIDEO STATIONS (",
                      e.length,
                      " Active Workstations)"
                    ] })
                  ] }),
                  se && he > 1 && /* @__PURE__ */ s.jsxs("div", { className: "bank-pagination-inline", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: Ve === 0,
                        onClick: (ue) => {
                          ue.stopPropagation(), ze((Ze) => Math.max(0, Ze - 1));
                        },
                        className: "btn-bank-mini",
                        title: "Previous Bank",
                        children: "◀"
                      }
                    ),
                    /* @__PURE__ */ s.jsxs("span", { className: "bank-pill-mini", children: [
                      "BANK ",
                      Ve + 1,
                      "/",
                      he,
                      " (",
                      Ve * tr + 1,
                      "–",
                      Math.min(e.length, (Ve + 1) * tr),
                      ")"
                    ] }),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        disabled: Ve >= he - 1,
                        onClick: (ue) => {
                          ue.stopPropagation(), ze((Ze) => Math.min(he - 1, Ze + 1));
                        },
                        className: "btn-bank-mini",
                        title: "Next Bank",
                        children: "▶"
                      }
                    )
                  ] })
                ] }),
                !se && /* @__PURE__ */ s.jsxs("div", { className: "timeline-track-container master-video-summary-track", onClick: () => me(!0), children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "track-sidebar summary-sidebar", title: "Click to Expand Video Stations", children: [
                    /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-accordion-toggle", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "11", height: "11", children: /* @__PURE__ */ s.jsx("polyline", { points: "9 18 15 12 9 6" }) }) }),
                    /* @__PURE__ */ s.jsx("span", { className: "summary-title", children: "ALL VIDEO (CANVAS)" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "summary-badge", children: [
                      (Be == null ? void 0 : Be.length) || e.length,
                      " STA"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "track-canvas", children: e.length > 0 && (() => {
                    var ye, He, qe, xt, ft;
                    const ue = (Be == null ? void 0 : Be.find((Qe) => Qe.isPrimary || Qe.isFocused)) || (Be == null ? void 0 : Be[0]), Ze = (ue == null ? void 0 : ue.stationId) || ((ye = e[0]) == null ? void 0 : ye.hostname) || ((He = e[0]) == null ? void 0 : He.id), V = (ue == null ? void 0 : ue.displayId) || "mon-0";
                    let pe = [];
                    if (Be && Be.length > 0) {
                      const Qe = /* @__PURE__ */ new Map();
                      Be.forEach((Nt) => {
                        var Ft;
                        (I[Nt.stationId] || I[(Ft = Nt.stationId) == null ? void 0 : Ft.toLowerCase()] || []).forEach(($t) => {
                          const un = `${$t.startEpochMs || $t.start}_${$t.endEpochMs || $t.end}`;
                          Qe.has(un) || Qe.set(un, $t);
                        });
                      }), pe = Array.from(Qe.values());
                    }
                    return pe.length === 0 && (pe = I[(qe = e[0]) == null ? void 0 : qe.id] || I[(xt = e[0]) == null ? void 0 : xt.hostname] || ((ft = e[0]) == null ? void 0 : ft.segments) || []), /* @__PURE__ */ s.jsx(
                      Jc,
                      {
                        hostname: Ze,
                        displayId: V,
                        activeSegments: pe,
                        viewportStartMs: M,
                        viewportDurationMs: ee,
                        baseEpochMs: i,
                        inPointMs: j,
                        outPointMs: w,
                        globalGaps: (Lt == null ? void 0 : Lt.removedGlobalGaps) || [],
                        isAutoDirectorEnabled: !1,
                        isCanvasSummary: !0
                      }
                    );
                  })() })
                ] }),
                se && (e.length > 0 ? Ge.map((ue) => {
                  const Ze = !!(t && ue.id === t), V = Q === ue.id, pe = o ? o[ue.id] ?? !0 : !0;
                  return /* @__PURE__ */ s.jsx(
                    Ox,
                    {
                      station: ue,
                      isExpanded: V && T(ue) > 1,
                      onToggleExpand: () => {
                        T(ue) > 1 && G((ye) => ye === ue.id ? null : ue.id);
                      },
                      isAutoDirectorEnabled: pe,
                      onToggleAutoDirector: a,
                      canvasPlacements: Be,
                      onToggleDisplayOnCanvas: nt,
                      directorPlan: ue.directorPlan,
                      isActive: Ze,
                      onSelect: () => n == null ? void 0 : n(ue.id),
                      onStationContextMenu: r,
                      onDeselectStation: l,
                      viewportStartMs: M,
                      viewportDurationMs: ee,
                      inPointMs: j,
                      outPointMs: w,
                      baseEpochMs: i,
                      segments: I[ue.id] || I[ue.hostname] || ue.segments || [],
                      recordingSegments: I,
                      globalGaps: (Lt == null ? void 0 : Lt.removedGlobalGaps) || []
                    },
                    ue.id
                  );
                }) : /* @__PURE__ */ s.jsxs("div", { className: "timeline-empty-tracks-placeholder", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "placeholder-pulse" }),
                  /* @__PURE__ */ s.jsx("span", { children: "NO STATIONS SELECTED — TIMELINE CHANNELS MUTED" })
                ] })),
                e.length > 0 && /* @__PURE__ */ s.jsx(
                  Fx,
                  {
                    audioPlan: b,
                    stations: e,
                    viewportStartMs: M,
                    viewportDurationMs: ee,
                    baseEpochMs: i,
                    playheadMs: y,
                    onSplitSegment: B,
                    onChangeSegmentStation: L,
                    onChangeSegmentGain: ie,
                    onFollowVisualFeed: ne,
                    isAutoFollow: q,
                    timeMode: c,
                    onUpdateAudioPlan: gt
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  Bx,
                  {
                    canvasLayoutTimeline: H,
                    activeKfIndex: Ae,
                    onSelectKeyframe: $e,
                    onAddKeyframeAtEpoch: Ie,
                    onDeleteKeyframe: Ue,
                    onUpdateKeyframeEpoch: xe,
                    onUpdateKeyframeTransition: Me,
                    viewportStartMs: M,
                    viewportDurationMs: ee,
                    baseEpochMs: i,
                    totalDurationMs: d,
                    playheadMs: y,
                    inPointMs: j,
                    outPointMs: w,
                    timeMode: c
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsx(
                Hx,
                {
                  isRangeValid: De,
                  onExport: x,
                  isEstimating: et,
                  estimateData: Lt,
                  formatEstimateSize: ht,
                  stationsCount: e.length
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          Ux,
          {
            baseEpochMs: i,
            timeMode: c,
            viewportStartMs: M,
            viewportDurationMs: ee,
            playheadMs: y,
            inPointMs: j,
            outPointMs: w,
            onStartDrag: Re
          }
        ),
        /* @__PURE__ */ s.jsx(
          zx,
          {
            contextMenu: st,
            baseEpochMs: i,
            timeMode: c,
            onAction: (ue) => {
              st && (ue === "playhead" ? C == null || C(st.targetMs) : ue === "in" ? P == null || P(Math.max(0, Math.min(st.targetMs, w - 1e3))) : ue === "out" && (g == null || g(Math.min(d, Math.max(st.targetMs, j + 1e3)))), We(null));
            },
            onClose: () => We(null)
          }
        )
      ]
    }
  );
}
function Xx({ station: e, isSelected: t, onToggle: n, meta: r }) {
  const l = e.displayName || e.hostname || e.name || "", o = r == null ? void 0 : r.isLoading;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => n(e.id),
      className: `hub-station-card ${t ? "is-selected" : ""} ${o ? "is-syncing" : ""}`,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "card-top", children: [
          /* @__PURE__ */ s.jsx("div", { className: "monitor-icon-wrap", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
            /* @__PURE__ */ s.jsx("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
            /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
          ] }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "card-top-badges", children: [
            /* @__PURE__ */ s.jsx("span", { className: `audio-pill ${o ? "loading" : r.hasAudio ? "has-audio" : "no-audio"}`, title: r.audioChannels, children: o ? /* @__PURE__ */ s.jsx("span", { children: "CHECKING..." }) : r.hasAudio ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
                /* @__PURE__ */ s.jsx("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }),
                /* @__PURE__ */ s.jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" })
              ] }),
              /* @__PURE__ */ s.jsx("span", { children: "AUDIO" })
            ] }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }),
                /* @__PURE__ */ s.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
                /* @__PURE__ */ s.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
              ] }),
              /* @__PURE__ */ s.jsx("span", { children: "NO AUDIO" })
            ] }) }),
            (() => {
              const a = !o && ((r == null ? void 0 : r.coveragePct) <= 0 || (r == null ? void 0 : r.recordedDuration) === "00:00:00"), i = !o && (r == null ? void 0 : r.coveragePct) >= 100 && !(r != null && r.hasGaps);
              let c, d;
              return o ? (c = "SCANNING...", d = "is-loading") : a ? (c = "NO RECORDINGS", d = "gap-warning") : i ? (c = "100% COVERAGE", d = "full-archived") : (c = r != null && r.hasGaps ? "GAPS DETECTED" : `${r == null ? void 0 : r.coveragePct}% COVERAGE`, d = "gap-warning"), /* @__PURE__ */ s.jsxs("span", { className: `status-indicator-badge ${d}`, children: [
                /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                c
              ] });
            })()
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "card-info", children: [
          /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", minWidth: 0, marginBottom: "8px" }, children: [
            /* @__PURE__ */ s.jsx("span", { className: "station-card-title", children: l }),
            e.hostname && l.toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { style: { fontSize: "10px", color: "#94a3b8", background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: "4px", whiteSpace: "nowrap" }, title: `Physical Machine: ${e.hostname}`, children: e.hostname })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "recording-specs-grid", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "spec-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "spec-label", children: "RECORDED" }),
              /* @__PURE__ */ s.jsx("span", { className: "spec-value highlight", children: o ? "..." : r.recordedDuration })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "spec-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "spec-label", children: "COVERAGE" }),
              /* @__PURE__ */ s.jsx("span", { className: "spec-value", children: o ? "..." : `${r.coveragePct}%` })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "spec-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "spec-label", children: "VIDEO FEED" }),
              /* @__PURE__ */ s.jsx("span", { className: "spec-value", children: o ? "Scanning..." : `${r.resolution} • ${r.fps}fps` })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "spec-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "spec-label", children: "SIZE" }),
              /* @__PURE__ */ s.jsx("span", { className: "spec-value", children: o ? "..." : r.fileSize })
            ] })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "card-gap-track-container", title: o ? "Scanning chunks..." : `Recorded: ${r.recordedDuration} (${r.coveragePct}%)`, children: o ? /* @__PURE__ */ s.jsx("div", { className: "track-loading-shimmer" }) : /* @__PURE__ */ s.jsx("div", { className: "card-gap-track", children: r.segments.map((a, i) => /* @__PURE__ */ s.jsx(
            "div",
            {
              className: `track-segment ${a.type === "rec" ? "rec" : "gap"}`,
              style: {
                left: `${a.startPct}%`,
                width: `${a.widthPct}%`
              }
            },
            i
          )) }) })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "card-bottom-action", children: /* @__PURE__ */ s.jsx("div", { className: `custom-checkbox-pill ${t ? "checked" : ""}`, children: t ? "✓ SELECTED" : "+ ADD TO WORKSPACE" }) })
      ]
    }
  );
}
function Gx({ station: e, isSelected: t, onToggle: n, meta: r }) {
  const l = e.displayName || e.hostname || e.name || "", o = r == null ? void 0 : r.isLoading;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      onClick: () => n(e.id),
      className: `hub-table-row ${t ? "is-selected" : ""} ${o ? "is-syncing" : ""}`,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-check", children: /* @__PURE__ */ s.jsx("div", { className: `row-checkbox ${t ? "checked" : ""}`, children: t && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-name", children: /* @__PURE__ */ s.jsxs("span", { className: "station-name-text", title: e.hostname ? `Physical: ${e.hostname}` : l, children: [
          l,
          e.hostname && l.toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsxs("small", { style: { fontSize: "10px", color: "#94a3b8", marginLeft: "6px" }, children: [
            "(",
            e.hostname,
            ")"
          ] })
        ] }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-audio", children: /* @__PURE__ */ s.jsx("span", { className: `badge-pill ${o ? "audio-loading" : r.hasAudio ? "audio-on" : "audio-off"}`, title: r.audioChannels, children: o ? "..." : r.hasAudio ? "AUDIO" : "MUTED" }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-coverage", children: /* @__PURE__ */ s.jsx("span", { className: "coverage-text", children: o ? "Scanning..." : `${r.recordedDuration} (${r.coveragePct}%)` }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-gaps-bar", children: /* @__PURE__ */ s.jsx("div", { className: "row-gap-track", title: o ? "Scanning segments..." : `Coverage: ${r.coveragePct}%`, children: o ? /* @__PURE__ */ s.jsx("div", { className: "row-loading-shimmer" }) : r.segments.map((a, i) => /* @__PURE__ */ s.jsx(
          "div",
          {
            className: `track-seg ${a.type === "rec" ? "rec" : "gap"}`,
            style: { left: `${a.startPct}%`, width: `${a.widthPct}%` }
          },
          i
        )) }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-specs", children: /* @__PURE__ */ s.jsx("span", { className: "specs-text", children: o ? "..." : `${r.resolution} • ${r.fps}fps` }) }),
        /* @__PURE__ */ s.jsx("div", { className: "row-col col-size", children: /* @__PURE__ */ s.jsx("span", { className: "size-text", children: o ? "..." : r.fileSize }) })
      ]
    }
  );
}
function Qx({ station: e, isSelected: t, onToggle: n, meta: r }) {
  var c, d;
  const l = e.displayName || e.hostname || e.name || "", o = r == null ? void 0 : r.isLoading, a = !o && ((r == null ? void 0 : r.coveragePct) <= 0 || (r == null ? void 0 : r.recordedDuration) === "00:00:00"), i = o ? "loading" : a ? "critical" : ((c = r.trafficStatus) == null ? void 0 : c.level) || (r.hasGaps ? "critical" : "optimal");
  return /* @__PURE__ */ s.jsxs("label", { className: `station-row ${t ? "selected" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "checkbox-wrap", children: [
      /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "checkbox",
          className: "hidden-checkbox",
          checked: t,
          onChange: () => n(e.id)
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "custom-checkbox", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
      /* @__PURE__ */ s.jsx("div", { className: `status-dot ${i}`, title: o ? "Scanning..." : (d = r.trafficStatus) == null ? void 0 : d.label }),
      /* @__PURE__ */ s.jsxs("span", { className: "hostname", title: e.hostname ? `Physical: ${e.hostname}` : l, children: [
        l,
        e.hostname && l.toLowerCase() !== e.hostname.toLowerCase() && /* @__PURE__ */ s.jsxs("small", { className: "physical-host-sub", children: [
          " (",
          e.hostname,
          ")"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "mini-row-tags", children: [
      r.hasAudio && !o && /* @__PURE__ */ s.jsx("span", { className: "mini-audio-icon", title: r.audioChannels, children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", fill: "currentColor" }) }) }),
      /* @__PURE__ */ s.jsx("span", { className: `coverage-pct ${i}`, children: o ? "..." : `${r.coveragePct}%` })
    ] })
  ] });
}
function Jx({
  searchTerm: e,
  onSearchChange: t,
  sortAlpha: n,
  onToggleSort: r,
  effectiveTabs: l,
  selectedTabId: o,
  onSelectTab: a,
  isLoadingTabs: i,
  allStations: c,
  selectedStationIds: d,
  filterMode: v,
  onFilterModeChange: p,
  filteredCount: m,
  selectedInTabCount: y,
  unselectedInTabCount: C,
  activeTabName: j,
  onSelectAllInScope: P,
  onClearInScope: w,
  viewMode: g = "grid",
  onViewModeChange: x,
  isDrawerMode: I = !1
}) {
  const [S, M] = u.useState(!1), h = v !== "all", $ = !j || j.toLowerCase() === "all", E = $ ? "Select All" : `Select ${j}`, N = $ ? "Clear All" : `Clear ${j}`;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-filter-bar-root ${I ? "is-drawer-compact" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "search-bar-row", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "search-input-wrap", children: [
        /* @__PURE__ */ s.jsxs("svg", { className: "search-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "11", cy: "11", r: "8" }),
          /* @__PURE__ */ s.jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
        ] }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            type: "text",
            placeholder: "Filter stations...",
            value: e,
            onChange: (_) => t(_.target.value)
          }
        )
      ] }),
      I && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `btn-filter-toggle ${S ? "open" : ""} ${h ? "has-filter" : ""}`,
          onClick: () => M(!S),
          title: "Toggle Filters",
          children: [
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: /* @__PURE__ */ s.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
            h && /* @__PURE__ */ s.jsx("span", { className: "active-dot" })
          ]
        }
      ),
      !I && x && /* @__PURE__ */ s.jsxs("div", { className: "view-mode-toggle-group", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${g === "grid" ? "active" : ""}`,
            onClick: () => x("grid"),
            title: "Grid View",
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: [
              /* @__PURE__ */ s.jsx("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1.5" }),
              /* @__PURE__ */ s.jsx("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1.5" }),
              /* @__PURE__ */ s.jsx("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1.5" }),
              /* @__PURE__ */ s.jsx("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1.5" })
            ] })
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-view-mode ${g === "table" ? "active" : ""}`,
            onClick: () => x("table"),
            title: "Table View",
            children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
              /* @__PURE__ */ s.jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6", strokeLinecap: "round" }),
              /* @__PURE__ */ s.jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12", strokeLinecap: "round" }),
              /* @__PURE__ */ s.jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18", strokeLinecap: "round" })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-sort",
          onClick: r,
          title: "Toggle alphabetical sort",
          children: n ? "A-Z" : "Def"
        }
      )
    ] }),
    l.length > 1 && (I ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-tabs-dropdown-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dropdown-label", children: "TAB:" }),
      /* @__PURE__ */ s.jsx(
        "select",
        {
          className: "tab-select-native",
          value: o,
          onChange: (_) => a(_.target.value),
          children: l.map((_) => {
            const U = _.id === "all" ? c.map((F) => F.id) : _.stationIds || [], R = U.filter((F) => d.includes(F)).length;
            return /* @__PURE__ */ s.jsxs("option", { value: _.id, children: [
              _.name,
              " (",
              R,
              "/",
              U.length,
              ")"
            ] }, _.id);
          })
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "compact-bulk-btns", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text", onClick: P, children: "+All" }),
        /* @__PURE__ */ s.jsx("span", { className: "div", children: "|" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-bulk-text clear", onClick: w, children: "Clear" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "tabs-filter-strip", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "tabs-header-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip-label", children: "SYSTEM TABS (FILTER ONLY)" }),
        i && /* @__PURE__ */ s.jsx("span", { className: "sync-badge", children: "Syncing..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tabs-scroll-row", children: l.map((_) => {
        const U = o === _.id, R = _.id === "all" ? c.map((re) => re.id) : _.stationIds || [], F = R.length, oe = R.filter((re) => d.includes(re)).length;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-tab-filter ${U ? "active" : ""}`,
            onClick: () => a(_.id),
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "tab-name", children: _.name }),
              /* @__PURE__ */ s.jsxs("span", { className: `tab-count-pill ${oe > 0 ? "has-selected" : ""}`, children: [
                oe,
                "/",
                F
              ] })
            ]
          },
          _.id
        );
      }) })
    ] })),
    (!I || S) && /* @__PURE__ */ s.jsxs("div", { className: `filter-controls-row ${I ? "is-collapsed-tray" : ""}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "filter-pills-group", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "all" ? "active" : ""}`,
            onClick: () => p("all"),
            children: [
              "All (",
              m,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "selected" ? "active" : ""}`,
            onClick: () => p("selected"),
            children: [
              "Sel (",
              y,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "unselected" ? "active" : ""}`,
            onClick: () => p("unselected"),
            children: [
              "Unsel (",
              C,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "gaps" ? "active" : ""}`,
            onClick: () => p("gaps"),
            title: "Show stations with gaps",
            children: "Gaps ⚠️"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `filter-pill ${v === "audio" ? "active" : ""}`,
            onClick: () => p("audio"),
            title: "Show stations with audio",
            children: "Audio 🔊"
          }
        )
      ] }),
      !I && /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-group", children: [
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk", onClick: P, children: [
          "+ ",
          E
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "divider" }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "btn-bulk clear-btn", onClick: w, children: [
          "✕ ",
          N
        ] })
      ] })
    ] })
  ] });
}
function Zx({
  currentPage: e,
  totalPages: t,
  pageSize: n,
  totalItems: r,
  onPageChange: l,
  onPageSizeChange: o,
  viewMode: a = "table"
}) {
  if (r === 0) return null;
  const i = Math.min((e - 1) * n + 1, r), c = Math.min(e * n, r), d = a === "table" ? [5, 10, 15, 25] : [4, 8, 12, 16], v = t <= 1, p = (m) => {
    if (m === n) return !0;
    const y = Math.min(n, r), C = Math.min(m, r), j = Math.ceil(r / n), P = Math.ceil(r / m);
    return y !== C || j !== P;
  };
  return /* @__PURE__ */ s.jsxs("div", { className: `hub-pagination-bar ${v ? "is-single-page-mode" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "pagination-range-info", children: [
      /* @__PURE__ */ s.jsx("span", { children: "SHOWING" }),
      /* @__PURE__ */ s.jsxs("strong", { className: "accent-num", children: [
        i,
        "-",
        c
      ] }),
      /* @__PURE__ */ s.jsx("span", { children: "OF" }),
      /* @__PURE__ */ s.jsx("strong", { className: "total-num", children: r }),
      /* @__PURE__ */ s.jsx("span", { children: "STATIONS" })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: `pagination-controls ${v ? "controls-disabled-compact" : ""}`, children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-page-step",
          disabled: e === 1,
          onClick: () => l(1),
          title: "First Page",
          children: "«"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-page-step",
          disabled: e === 1,
          onClick: () => l(e - 1),
          title: "Previous Page",
          children: "‹"
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "page-indicator", children: [
        /* @__PURE__ */ s.jsx("span", { className: "current-page", children: e }),
        /* @__PURE__ */ s.jsx("span", { className: "divider", children: "/" }),
        /* @__PURE__ */ s.jsx("span", { className: "total-pages", children: t })
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-page-step",
          disabled: e === t,
          onClick: () => l(e + 1),
          title: "Next Page",
          children: "›"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "btn-page-step",
          disabled: e === t,
          onClick: () => l(t),
          title: "Last Page",
          children: "»"
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "pagination-size-selector", children: [
      /* @__PURE__ */ s.jsx("span", { className: "selector-label", children: "PER PAGE:" }),
      /* @__PURE__ */ s.jsx("div", { className: "size-pills-group", children: d.map((m) => {
        const y = n === m, C = !p(m);
        return /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `btn-size-pill ${y ? "active" : ""} ${C ? "redundant-disabled" : ""}`,
            disabled: C,
            onClick: () => o(m),
            title: C ? `All stations already fit on screen (Total: ${r})` : `Show ${m} per page`,
            children: m
          },
          m
        );
      }) })
    ] })
  ] });
}
function qx({
  selectedStationIds: e = [],
  allStations: t = [],
  onToggleStation: n,
  onClearAll: r,
  maxVisible: l = 3
}) {
  const [o, a] = u.useState(!1), i = u.useRef(null);
  u.useEffect(() => {
    const m = (y) => {
      i.current && !i.current.contains(y.target) && a(!1);
    };
    return o && document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [o]);
  const c = u.useMemo(() => {
    const m = new Map(t.map((y) => [y.id, y]));
    return e.map((y) => m.get(y) || { id: y, hostname: `Station ${y}` });
  }, [e, t]);
  if (e.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root empty-selection", children: [
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-dot" }),
      /* @__PURE__ */ s.jsx("span", { className: "dock-hint-text", children: "Select workstations above to include in mission scope" })
    ] });
  const d = c.slice(0, l), v = c.slice(l), p = v.length > 0;
  return /* @__PURE__ */ s.jsxs("div", { className: "selected-chips-dock-root", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "dock-lead-badge", children: [
      /* @__PURE__ */ s.jsx("span", { className: "pulse-dot" }),
      /* @__PURE__ */ s.jsxs("span", { children: [
        "ACTIVE (",
        e.length,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "chips-dock-track", children: [
      d.map((m) => {
        const y = m.displayName || m.hostname || m.name || m.id;
        return /* @__PURE__ */ s.jsxs("div", { className: "dock-chip", title: y, children: [
          /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: y }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-chip-remove",
              onClick: (C) => {
                C.stopPropagation(), n(m.id);
              },
              title: `Remove ${y}`,
              children: "✕"
            }
          )
        ] }, m.id);
      }),
      p && /* @__PURE__ */ s.jsxs("div", { className: "overflow-popover-container", ref: i, children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-overflow-pill ${o ? "active" : ""}`,
            onClick: () => a(!o),
            title: "View all selected workstations",
            children: [
              /* @__PURE__ */ s.jsxs("span", { children: [
                "+",
                v.length,
                " MORE"
              ] }),
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "18 15 12 9 6 15" }) })
            ]
          }
        ),
        o && /* @__PURE__ */ s.jsxs("div", { className: "overflow-popover-menu upward", children: [
          /* @__PURE__ */ s.jsx("div", { className: "popover-header", children: /* @__PURE__ */ s.jsxs("span", { children: [
            "ADDITIONAL WORKSTATIONS (",
            v.length,
            ")"
          ] }) }),
          /* @__PURE__ */ s.jsx("div", { className: "popover-list", children: v.map((m) => {
            const y = m.displayName || m.hostname || m.name || m.id;
            return /* @__PURE__ */ s.jsxs("div", { className: "popover-item", children: [
              /* @__PURE__ */ s.jsx("span", { className: "item-name", title: y, children: y }),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-item-remove",
                  onClick: () => n(m.id),
                  title: `Remove ${y}`,
                  children: "✕"
                }
              )
            ] }, m.id);
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        className: "btn-clear-dock",
        onClick: r,
        title: "Deselect all stations",
        children: "Clear All"
      }
    )
  ] });
}
const Zp = {
  // 95% and above (without significant gaps) - Optimal green
  optimalMinPct: 95,
  // 70% to 94% - Warning amber (minor gaps or partial coverage)
  warningMinPct: 70
  // Below 70% - Critical rose (critical missing intervals)
};
function yh(e, t, n = Zp) {
  return e >= n.optimalMinPct && !t ? {
    level: "optimal",
    color: "#10b981",
    label: "FULL",
    badgeClass: "status-optimal"
  } : e >= n.warningMinPct ? {
    level: "warning",
    color: "#f59e0b",
    label: "PARTIAL",
    badgeClass: "status-warning"
  } : {
    level: "critical",
    color: "#f43f5e",
    label: "CRITICAL",
    badgeClass: "status-critical"
  };
}
function e1(e) {
  if (!e || e <= 0) return "00:00:00";
  const t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = t % 60, o = (a) => String(a).padStart(2, "0");
  return `${o(n)}:${o(r)}:${o(l)}`;
}
function t1(e) {
  if (!e || e <= 0) return "0 MB";
  const t = e / (1024 * 1024 * 1024);
  return t >= 1 ? `${t.toFixed(1)} GB` : `${(e / (1024 * 1024)).toFixed(0)} MB`;
}
function n1(e, t = [], n = { baseEpochMs: 0, durationMs: 0 }, r = Zp) {
  const { baseEpochMs: l, durationMs: o } = n, a = !!(e != null && e.hasAudio), i = (e == null ? void 0 : e.audioChannels) || (a ? "AUDIO STREAM" : "MUTED"), c = (e == null ? void 0 : e.resolution) || (e != null && e.width && (e != null && e.height) ? `${e.height}p` : "1080p"), d = (e == null ? void 0 : e.fps) || 30, v = (e == null ? void 0 : e.fileSize) || (e != null && e.bytesRecorded ? t1(e.bytesRecorded) : "--");
  if (!o || o <= 0 || !Array.isArray(t) || t.length === 0) {
    const h = yh(0, !0, r);
    return {
      coveragePct: 0,
      recordedDuration: "00:00:00",
      totalRecordedMs: 0,
      hasAudio: a,
      audioChannels: i,
      resolution: c,
      fps: d,
      fileSize: v,
      hasGaps: !0,
      gapsCount: 1,
      trafficStatus: h,
      segments: [{ type: "gap", startPct: 0, widthPct: 100 }]
    };
  }
  const p = l, m = l + o, y = [];
  for (const h of t) {
    const $ = Math.max(h.startEpoch, p), E = Math.min(h.endEpoch, m);
    E > $ && y.push({ startEpoch: $, endEpoch: E });
  }
  y.sort((h, $) => h.startEpoch - $.endEpoch);
  const C = [];
  for (const h of y)
    if (C.length === 0)
      C.push({ ...h });
    else {
      const $ = C[C.length - 1];
      h.startEpoch <= $.endEpoch + 1e3 ? $.endEpoch = Math.max($.endEpoch, h.endEpoch) : C.push({ ...h });
    }
  let j = 0;
  for (const h of C)
    j += h.endEpoch - h.startEpoch;
  const P = o > 0 ? j / o * 100 : 0, w = P > 0 && P < 1 ? Number(P.toFixed(1)) : Math.min(100, Math.round(P)), g = [];
  let x = p, I = 0;
  for (const h of C) {
    if (h.startEpoch > x + 2e3) {
      const N = (h.startEpoch - x) / o * 100, _ = (x - p) / o * 100;
      g.push({
        type: "gap",
        startPct: Math.max(0, _),
        widthPct: Math.min(100, N)
      }), I++;
    }
    const $ = (h.endEpoch - h.startEpoch) / o * 100, E = (h.startEpoch - p) / o * 100;
    g.push({
      type: "rec",
      startPct: Math.max(0, E),
      widthPct: Math.min(100, $)
    }), x = h.endEpoch;
  }
  if (x < m - 2e3) {
    const h = (m - x) / o * 100, $ = (x - p) / o * 100;
    g.push({
      type: "gap",
      startPct: Math.max(0, $),
      widthPct: Math.min(100, h)
    }), I++;
  }
  const S = I > 0 || w < 100, M = yh(w, S, r);
  return {
    coveragePct: w,
    recordedDuration: e1(j),
    totalRecordedMs: j,
    hasAudio: a,
    audioChannels: i,
    resolution: c,
    fps: d,
    fileSize: v,
    hasGaps: S,
    gapsCount: I,
    trafficStatus: M,
    segments: g.length > 0 ? g : [{ type: "gap", startPct: 0, widthPct: 100 }]
  };
}
const s1 = Object.freeze([]), r1 = 12;
function l1({
  isOpen: e,
  onToggle: t,
  onClose: n,
  allStations: r = [],
  selectedStationIds: l = [],
  onToggleStation: o,
  onUpdateSelections: a,
  isInitialSetup: i,
  isLoadingStations: c = !1,
  isLoadingSegments: d = !1,
  onApply: v,
  onOpenRangeModal: p,
  systemTabs: m = s1,
  recordingSegments: y = {},
  baseEpochMs: C = 0,
  durationMs: j = 0
}) {
  const [P, w] = u.useState([]), [g, x] = u.useState("all"), [I, S] = u.useState(""), [M, h] = u.useState(!0), [$, E] = u.useState("all"), [N, _] = u.useState(null), [U, R] = u.useState(!1), [F, oe] = u.useState(15), [re, X] = u.useState(8), [D, K] = u.useState(1), b = u.useRef(!1), B = u.useRef(null), L = c && r.length === 0, ie = r.length === 0 && !c;
  let ne = "is-closed";
  i || ie || L ? ne = "is-full-width" : e && (ne = "is-open"), u.useLayoutEffect(() => {
    const se = () => {
      if (!B.current) return;
      const T = B.current.clientHeight;
      if (T <= 0) return;
      const Q = B.current.querySelector(".station-row, .hub-table-row"), G = Q ? Q.offsetHeight : 40;
      if (G > 0) {
        const J = Math.floor(T / G) - 2, he = [5, 10, 15, 20, 25, 30].filter((Ge) => Ge <= J).pop() || 5;
        oe(he);
      }
      const te = B.current.clientWidth;
      if (te > 0) {
        const he = Math.max(1, Math.floor((te + 12) / 252)), _e = Math.max(1, Math.floor((T + 12) / (175 + 12))), Be = Math.max(he * _e, he);
        X(Be);
      }
    };
    se(), window.addEventListener("resize", se);
    const me = new ResizeObserver(se);
    return B.current && me.observe(B.current), () => {
      window.removeEventListener("resize", se), me.disconnect();
    };
  }, [N, r.length]), u.useEffect(() => {
    if (m && m.length > 0) {
      w(m);
      return;
    }
    if (b.current || !e && !i) return;
    b.current = !0;
    let se = !0;
    return (async () => {
      R(!0);
      try {
        const T = await fetch("/api/v1/dashboard/tabs");
        if (T.ok && se) {
          const Q = await T.json();
          Array.isArray(Q) && w(Q);
        }
      } catch (T) {
        console.warn("[StationDrawer] Failed to fetch server tabs:", T);
      } finally {
        se && R(!1);
      }
    })(), () => {
      se = !1;
    };
  }, [e, i, m]);
  const q = u.useMemo(() => {
    const se = P.length > 0 ? P : m;
    if (se && se.length > 0) {
      const me = se.map((T) => {
        const Q = T.hostnames || T.assignedHostnames || T.stations || T.stationIds || [], G = r.filter((te) => {
          const J = (te.hostname || te.name || "").trim().toLowerCase();
          return Q.some((ee) => typeof ee == "string" ? ee.trim().toLowerCase() === J || J.includes(ee.trim().toLowerCase()) : (ee.hostname || ee.name || "").trim().toLowerCase() === J);
        }).map((te) => te.id);
        return {
          id: String(T.id || T.tabId || T.name),
          name: T.name || "Tab",
          stationIds: G
        };
      });
      return [
        { id: "all", name: "ALL", stationIds: r.map((T) => T.id) },
        ...me.filter((T) => T.id.toLowerCase() !== "all")
      ];
    }
    return [{ id: "all", name: "ALL", stationIds: r.map((me) => me.id) }];
  }, [P, m, r]), H = u.useMemo(() => q.find((se) => se.id === g) || q[0], [q, g]), Ae = u.useMemo(() => !H || H.id === "all" ? r.map((se) => se.id) : H.stationIds || [], [H, r]), $e = u.useMemo(() => !y || Object.keys(y).length === 0 ? r.filter((se) => se.isLoaded || se.segments && se.segments.length > 0).length : r.filter((se) => y[se.id] !== void 0 || se.isLoaded).length, [r, y]), Ie = u.useMemo(() => !!(d || c && r.length > 0 || r.length > 0 && $e < r.length && Object.keys(y).length > 0), [d, c, r.length, $e, y]), Ue = u.useMemo(() => {
    const se = /* @__PURE__ */ new Map(), me = { baseEpochMs: C, durationMs: j };
    for (const T of r) {
      const G = !(y && y[T.id] !== void 0 || T.isLoaded === !0 || T.segments && T.segments.length > 0) && (Ie || c || d), te = y && y[T.id] || T.segments || [], J = n1(T, te, me);
      se.set(T.id, {
        ...J,
        hasAudio: T.hasAudio !== void 0 ? T.hasAudio : J == null ? void 0 : J.hasAudio,
        audioLabel: T.audioLabel || (T.hasAudio ? "AAC" : (J == null ? void 0 : J.audioLabel) || "NONE"),
        audioChannels: T.audioChannels ? T.audioChannels === 1 ? "Mono" : "Stereo" : J == null ? void 0 : J.audioChannels,
        feedSpec: T.feedSpec || (J == null ? void 0 : J.feedSpec) || `${T.resolution || "1080p"} • ${T.fps || 30}fps`,
        resolution: T.resolution || (J == null ? void 0 : J.resolution) || "1080p",
        fps: T.fps || (J == null ? void 0 : J.fps) || 30,
        isLoading: G
      });
    }
    return se;
  }, [r, y, C, j, Ie, c, d]), xe = u.useMemo(() => r.filter((se) => {
    const me = Ue.get(se.id), T = y && y[se.id] && y[se.id].length > 0 || se.segments && se.segments.length > 0, Q = me && (me.coveragePct > 0 || me.totalRecordedMs > 0), G = typeof se.recordingsCount == "number" && se.recordingsCount > 0;
    return me && !me.isLoading ? Q || T : G || T;
  }), [r, Ue, y]), Me = u.useMemo(() => xe.filter((se) => {
    if (H.id !== "all" && !Ae.includes(se.id) || !(se.displayName || se.hostname || se.name || "").toLowerCase().includes(I.toLowerCase())) return !1;
    const T = l.includes(se.id), Q = Ue.get(se.id);
    return $ === "selected" ? T : $ === "unselected" ? !T : $ === "gaps" ? Q == null ? void 0 : Q.hasGaps : $ === "audio" ? Q == null ? void 0 : Q.hasAudio : !0;
  }).sort((se, me) => M ? (se.displayName || se.hostname || "").localeCompare(me.displayName || me.hostname || "") : 0), [xe, H, Ae, I, $, l, M, Ue]), nt = u.useMemo(() => N !== null ? N : Me.length > r1 ? "table" : "grid", [N, Me.length]), gt = nt === "table" ? F : re, ce = Math.max(1, Math.ceil(Me.length / gt));
  u.useEffect(() => {
    K(1);
  }, [g, I, $, nt]), u.useEffect(() => {
    D > ce && K(ce);
  }, [ce, D]);
  const Ce = u.useMemo(() => {
    if (ne !== "is-full-width") return Me;
    const se = (D - 1) * gt;
    return Me.slice(se, se + gt);
  }, [Me, D, gt, ne]), Ve = () => {
    if (!a) return;
    const se = H.id === "all" ? Me.map((me) => me.id) : Ae;
    a(Array.from(/* @__PURE__ */ new Set([...l, ...se])));
  }, ze = () => {
    if (!a) return;
    const se = new Set(
      H.id === "all" ? Me.map((me) => me.id) : Ae
    );
    a(l.filter((me) => !se.has(me)));
  }, st = Ae.filter((se) => l.includes(se)).length, We = Me.filter((se) => l.includes(se.id)).length;
  return /* @__PURE__ */ s.jsxs("div", { className: `station-drawer-panel ${ne}`, children: [
    ne !== "is-full-width" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", onClick: () => ne === "is-closed" && t && t(), children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M4 6h16M4 12h16M4 18h16" }) }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            "Station Pool (",
            l.length,
            "/",
            r.length,
            ")",
            Ie && /* @__PURE__ */ s.jsxs("span", { className: "sync-badge-inline", children: [
              " • Syncing ",
              $e,
              "/",
              r.length
            ] })
          ] })
        ] }),
        ne === "is-open" && /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: n || t, title: "Close Drawer", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
          /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      ne === "is-open" && /* @__PURE__ */ s.jsxs("div", { className: "drawer-quick-actions-bar", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action select-all",
            onClick: Ve,
            disabled: Me.length === 0,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Select All (",
                Me.length,
                ")"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: "action-sep", children: "•" }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-quick-action clear",
            onClick: ze,
            disabled: We === 0,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { children: [
                "Clear (",
                We,
                ")"
              ] })
            ]
          }
        )
      ] }),
      Ie && /* @__PURE__ */ s.jsx("div", { className: "drawer-thin-progress-bar", children: /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "drawer-thin-progress-fill",
          style: { width: `${r.length > 0 ? $e / r.length * 100 : 0}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "drawer-body", children: L ? /* @__PURE__ */ s.jsxs("div", { className: "drawer-loading-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "tactical-spinner" }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-title", children: "DISCOVERING RECORDING STATIONS..." }),
      /* @__PURE__ */ s.jsx("span", { className: "loading-subtitle", children: "Scanning storage directories and catalog database" })
    ] }) : ie ? /* @__PURE__ */ s.jsxs("div", { className: "empty-state-view", children: [
      /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ s.jsx("h3", { children: "No Recording Sessions Found" }),
      /* @__PURE__ */ s.jsx("p", { children: "No video archives exist for any workstation during the selected mission scope." }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-change-time", onClick: p, children: "Change Time Scope" })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: ne === "is-full-width" ? "initial-setup-hub-wrapper" : "standard-drawer-content", children: [
      ne === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-hero-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "hero-title-group", children: [
          /* @__PURE__ */ s.jsxs("svg", { className: "hero-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
            /* @__PURE__ */ s.jsx("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
            /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
          ] }),
          /* @__PURE__ */ s.jsx("h2", { className: "hero-title", children: "WORKSPACE INITIALIZATION" })
        ] }),
        /* @__PURE__ */ s.jsx("p", { className: "hero-subtitle", children: "Review recording continuity, audio availability, and feed health to select stations for investigation." })
      ] }),
      ne === "is-full-width" && r.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: `hub-sync-banner ${Ie ? "is-syncing" : "is-synced"}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sync-info", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sync-icon-wrap", children: Ie ? /* @__PURE__ */ s.jsx("div", { className: "mini-tactical-spinner" }) : /* @__PURE__ */ s.jsx("svg", { className: "check-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sync-text-group", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sync-title", children: Ie ? `ANALYZING TIMELINE ARCHIVES • ${$e} OF ${xe.length} STATIONS SYNCED (${xe.length > 0 ? Math.min(100, Math.round($e / xe.length * 100)) : 100}%)` : `ALL WORKSTATION ARCHIVES SYNCED • ${xe.length} STATIONS READY` }),
            /* @__PURE__ */ s.jsx("span", { className: "sync-subtitle", children: Ie ? "Scanning verified recording chunks in background. You can select stations and begin immediately." : "Continuity analysis and feed specifications are verified and up-to-date." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sync-progress-bar-wrap", children: /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "sync-progress-bar-fill",
            style: {
              width: `${r.length > 0 ? Math.min(100, Math.round($e / r.length * 100)) : 0}%`
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        Jx,
        {
          searchTerm: I,
          onSearchChange: S,
          sortAlpha: M,
          onToggleSort: () => h(!M),
          effectiveTabs: q,
          selectedTabId: g,
          onSelectTab: (se) => {
            x(se), _(null);
          },
          isLoadingTabs: U,
          allStations: xe,
          selectedStationIds: l,
          filterMode: $,
          onFilterModeChange: E,
          filteredCount: Me.length,
          selectedInTabCount: st,
          unselectedInTabCount: Ae.length - st,
          activeTabName: H.name,
          onSelectAllInScope: Ve,
          onClearInScope: ze,
          viewMode: nt,
          onViewModeChange: ne === "is-full-width" ? _ : null,
          isDrawerMode: ne !== "is-full-width"
        }
      ),
      ne === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-bulk-actions-bar", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "bulk-actions-left", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action select-all",
              onClick: Ve,
              disabled: Me.length === 0,
              children: [
                /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "SELECT ALL IN VIEW (",
                  Me.length,
                  ")"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-bulk-action clear",
              onClick: ze,
              disabled: We === 0,
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { children: [
                  "CLEAR SELECTION (",
                  We,
                  ")"
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "bulk-actions-right", children: /* @__PURE__ */ s.jsxs("span", { className: "bulk-stats-label", children: [
          "Active Selection: ",
          /* @__PURE__ */ s.jsx("strong", { children: l.length }),
          " / ",
          r.length,
          " Stations"
        ] }) })
      ] }),
      ne === "is-full-width" && nt === "table" && /* @__PURE__ */ s.jsxs("div", { className: "hub-table-header-row", children: [
        /* @__PURE__ */ s.jsx("div", { className: "header-col col-check", children: "SEL" }),
        /* @__PURE__ */ s.jsx("div", { className: "header-col col-name", children: "WORKSTATION IDENTITY" }),
        /* @__PURE__ */ s.jsx("div", { className: "header-col col-audio", children: "AUDIO" }),
        /* @__PURE__ */ s.jsx("div", { className: "header-col col-coverage", children: "RECORDED SCOPE" }),
        /* @__PURE__ */ s.jsx("div", { className: "header-col col-gaps-bar", children: "TIMELINE CONTINUITY & GAPS" }),
        /* @__PURE__ */ s.jsx("div", { className: "header-col col-specs", children: "FEED SPEC" }),
        /* @__PURE__ */ s.jsx("div", { className: "header-col col-size", children: "ARCHIVE" })
      ] }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          ref: B,
          className: `station-list ${ne === "is-full-width" ? nt === "grid" ? "initial-cards-grid" : "initial-dense-table" : ""}`,
          children: Ce.map((se) => {
            const me = l.includes(se.id), T = Ue.get(se.id);
            return ne === "is-full-width" ? nt === "grid" ? /* @__PURE__ */ s.jsx(
              Xx,
              {
                station: se,
                isSelected: me,
                onToggle: o,
                meta: T
              },
              se.id
            ) : /* @__PURE__ */ s.jsx(
              Gx,
              {
                station: se,
                isSelected: me,
                onToggle: o,
                meta: T
              },
              se.id
            ) : /* @__PURE__ */ s.jsx(
              Qx,
              {
                station: se,
                isSelected: me,
                onToggle: o,
                meta: T
              },
              se.id
            );
          })
        }
      ),
      ne === "is-full-width" && /* @__PURE__ */ s.jsx(
        Zx,
        {
          currentPage: D,
          totalPages: ce,
          pageSize: gt,
          totalItems: Me.length,
          onPageChange: K,
          onPageSizeChange: (se) => {
            nt === "table" ? oe(se) : X(se), K(1);
          },
          viewMode: nt
        }
      ),
      ne === "is-full-width" && /* @__PURE__ */ s.jsxs("div", { className: "hub-footer-action-bar", children: [
        /* @__PURE__ */ s.jsx(
          qx,
          {
            selectedStationIds: l,
            allStations: r,
            onToggleStation: o,
            onClearAll: () => a && a([]),
            maxVisible: 3
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "btn-start-hero",
            disabled: l.length === 0,
            onClick: v,
            children: [
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("polygon", { points: "5 3 19 12 5 21 5 3" }) }),
              /* @__PURE__ */ s.jsx("span", { children: l.length === 0 ? "SELECT AT LEAST ONE STATION" : `START WORKSPACE (${l.length} SELECTED)` })
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
const $n = (e) => String(e).padStart(2, "0"), o1 = [
  { label: "00", val: 0, angle: 0 },
  { label: "01", val: 1, angle: 30 },
  { label: "02", val: 2, angle: 60 },
  { label: "03", val: 3, angle: 90 },
  { label: "04", val: 4, angle: 120 },
  { label: "05", val: 5, angle: 150 },
  { label: "06", val: 6, angle: 180 },
  { label: "07", val: 7, angle: 210 },
  { label: "08", val: 8, angle: 240 },
  { label: "09", val: 9, angle: 270 },
  { label: "10", val: 10, angle: 300 },
  { label: "11", val: 11, angle: 330 }
], a1 = [
  { label: "12", val: 12, angle: 0 },
  { label: "13", val: 13, angle: 30 },
  { label: "14", val: 14, angle: 60 },
  { label: "15", val: 15, angle: 90 },
  { label: "16", val: 16, angle: 120 },
  { label: "17", val: 17, angle: 150 },
  { label: "18", val: 18, angle: 180 },
  { label: "19", val: 19, angle: 210 },
  { label: "20", val: 20, angle: 240 },
  { label: "21", val: 21, angle: 270 },
  { label: "22", val: 22, angle: 300 },
  { label: "23", val: 23, angle: 330 }
];
function vh({
  value: e = "00:00:00",
  onChange: t,
  label: n = "TIME (24H)",
  accent: r = "cyan",
  showSeconds: l = !0,
  className: o = ""
}) {
  const [a, i] = u.useState(e), [c, d] = u.useState(null), v = u.useRef(null), { h: p, m, s: y } = u.useMemo(() => {
    if (!e) return { h: 0, m: 0, s: 0 };
    const E = String(e).split(":").map(Number);
    return {
      h: Math.min(23, Math.max(0, E[0] || 0)),
      m: Math.min(59, Math.max(0, E[1] || 0)),
      s: Math.min(59, Math.max(0, E[2] || 0))
    };
  }, [e]), C = u.useMemo(() => p >= 12, [p]);
  u.useEffect(() => {
    i(e);
  }, [e]);
  const j = () => {
    const N = a.replace(/[^0-9:]/g, "").trim().split(":").filter((oe) => oe.length > 0);
    let _ = 0, U = 0, R = 0;
    N.length >= 1 && (_ = Math.min(23, Math.max(0, parseInt(N[0], 10) || 0))), N.length >= 2 && (U = Math.min(59, Math.max(0, parseInt(N[1], 10) || 0))), N.length >= 3 && l && (R = Math.min(59, Math.max(0, parseInt(N[2], 10) || 0)));
    const F = l ? `${$n(_)}:${$n(U)}:${$n(R)}` : `${$n(_)}:${$n(U)}`;
    i(F), t && t(F, { h: _, m: U, s: R });
  }, P = (E) => {
    let N = p;
    E === "AM" && p >= 12 ? N = p - 12 : E === "PM" && p < 12 && (N = p + 12);
    const _ = l ? `${$n(N)}:${$n(m)}:${$n(y)}` : `${$n(N)}:${$n(m)}`;
    i(_), t && t(_, { h: N, m, s: y });
  }, w = u.useCallback((E, N) => {
    if (!v.current) return null;
    const _ = v.current.getBoundingClientRect(), U = _.left + _.width / 2, R = _.top + _.height / 2, F = E.clientX - U, oe = E.clientY - R;
    let re = Math.atan2(oe, F) * 180 / Math.PI + 90;
    if (re < 0 && (re += 360), N === "hours") {
      const X = Math.round(re / 30) % 12;
      return C ? X === 0 ? 12 : X + 12 : X === 0 ? 0 : X;
    }
    return Math.round(re / 6) % 60;
  }, [C]), g = u.useCallback((E, N) => {
    let _ = p, U = m, R = y;
    E === "hours" ? _ = N : E === "minutes" ? U = N : E === "seconds" && (R = N);
    const F = l ? `${$n(_)}:${$n(U)}:${$n(R)}` : `${$n(_)}:${$n(U)}`;
    i(F), t && t(F, { h: _, m: U, s: R });
  }, [p, m, y, l, t]), x = (E, N) => {
    N.preventDefault(), N.stopPropagation(), d(E);
    const _ = w(N, E);
    _ !== null && g(E, _);
  };
  u.useEffect(() => {
    if (!c) return;
    const E = (_) => {
      const U = w(_, c);
      U !== null && g(c, U);
    }, N = () => {
      d(null);
    };
    return window.addEventListener("pointermove", E), window.addEventListener("pointerup", N), () => {
      window.removeEventListener("pointermove", E), window.removeEventListener("pointerup", N);
    };
  }, [c, w, g]);
  const I = u.useMemo(() => p % 12 * 30, [p]), S = u.useMemo(() => m % 60 * 6, [m]), M = u.useMemo(() => y % 60 * 6, [y]), h = C ? a1 : o1, $ = u.useMemo(() => {
    const E = [];
    for (let N = 0; N < 60; N++) {
      const _ = (N * 6 - 90) * (Math.PI / 180), U = N % 5 === 0, R = 104, F = U ? 93 : 98;
      E.push({
        index: N,
        x1: 110 + F * Math.cos(_),
        y1: 110 + F * Math.sin(_),
        x2: 110 + R * Math.cos(_),
        y2: 110 + R * Math.sin(_),
        isMajor: U
      });
    }
    return E;
  }, []);
  return /* @__PURE__ */ s.jsxs("div", { className: `tactical-24h-clock-picker ${r} ${o} ${c ? "is-dragging" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "clock-header-shelf", children: [
      /* @__PURE__ */ s.jsx("span", { className: "shelf-label", children: n }),
      /* @__PURE__ */ s.jsxs("div", { className: "shelf-controls-group", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "am-pm-toggle-pill", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${C ? "" : "active"}`,
              onClick: () => P("AM"),
              title: "Day / Morning (00:00 - 11:59)",
              children: "AM"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: `btn-period ${C ? "active" : ""}`,
              onClick: () => P("PM"),
              title: "Night / Evening (12:00 - 23:59)",
              children: "PM"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            type: "text",
            className: "shelf-digital-input",
            value: a,
            onChange: (E) => i(E.target.value),
            onBlur: j,
            onKeyDown: (E) => {
              E.key === "Enter" && E.currentTarget.blur();
            },
            maxLength: 8,
            placeholder: "HH:MM:SS",
            title: "Type 24H time or drag the hands directly"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "clock-dial-container", children: /* @__PURE__ */ s.jsxs(
      "svg",
      {
        ref: v,
        className: "clock-dial-svg",
        viewBox: "0 0 220 220",
        children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "110", r: "105", className: "dial-background" }),
          /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "110", r: "88", className: "dial-track-ring" }),
          /* @__PURE__ */ s.jsx("g", { className: "dial-ticks-layer", children: $.map((E) => /* @__PURE__ */ s.jsx(
            "line",
            {
              x1: E.x1,
              y1: E.y1,
              x2: E.x2,
              y2: E.y2,
              className: `dial-tick ${E.isMajor ? "major" : "minor"}`
            },
            `tick-${E.index}`
          )) }),
          h.map((E) => {
            const N = (E.angle - 90) * (Math.PI / 180), _ = 76, U = 110 + _ * Math.cos(N), R = 110 + _ * Math.sin(N), F = p === E.val;
            return /* @__PURE__ */ s.jsx(
              "text",
              {
                x: U,
                y: R,
                className: `dial-num ${F ? "selected" : ""}`,
                textAnchor: "middle",
                dominantBaseline: "central",
                children: E.label
              },
              `dial-h-${E.val}`
            );
          }),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-hour ${c === "hours" ? "dragging" : ""}`,
              transform: `rotate(${I} 110 110)`,
              children: [
                /* @__PURE__ */ s.jsx("line", { x1: "110", y1: "110", x2: "110", y2: "52", className: "dial-hand hand-hour" }),
                /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "52", r: "7.5", className: "hand-grab-ring ring-hour" }),
                /* @__PURE__ */ s.jsx(
                  "circle",
                  {
                    cx: "110",
                    cy: "52",
                    r: "20",
                    className: "hand-hitbox",
                    onPointerDown: (E) => x("hours", E)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-minute ${c === "minutes" ? "dragging" : ""}`,
              transform: `rotate(${S} 110 110)`,
              children: [
                /* @__PURE__ */ s.jsx("line", { x1: "110", y1: "110", x2: "110", y2: "28", className: "dial-hand hand-minute" }),
                /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "28", r: "6.5", className: "hand-grab-ring ring-minute" }),
                /* @__PURE__ */ s.jsx(
                  "circle",
                  {
                    cx: "110",
                    cy: "28",
                    r: "18",
                    className: "hand-hitbox",
                    onPointerDown: (E) => x("minutes", E)
                  }
                )
              ]
            }
          ),
          l && /* @__PURE__ */ s.jsxs(
            "g",
            {
              className: `interactive-hand-group hand-group-second ${c === "seconds" ? "dragging" : ""}`,
              transform: `rotate(${M} 110 110)`,
              children: [
                /* @__PURE__ */ s.jsx("line", { x1: "110", y1: "126", x2: "110", y2: "22", className: "dial-hand hand-second" }),
                /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "22", r: "5", className: "hand-grab-ring ring-second" }),
                /* @__PURE__ */ s.jsx(
                  "circle",
                  {
                    cx: "110",
                    cy: "22",
                    r: "16",
                    className: "hand-hitbox",
                    onPointerDown: (E) => x("seconds", E)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "110", r: "5.5", className: "dial-center-pin" }),
          /* @__PURE__ */ s.jsx("circle", { cx: "110", cy: "110", r: "2.2", className: "dial-center-dot" })
        ]
      }
    ) })
  ] });
}
const ra = 7 * 24 * 60 * 60 * 1e3, Ht = (e) => String(e).padStart(2, "0");
function i1({
  isOpen: e,
  onClose: t,
  currentRange: n,
  onApplyRange: r,
  onLoadBookmark: l,
  timeMode: o = "LOCAL",
  onTimeModeChange: a
}) {
  const [i, c] = u.useState(""), [d, v] = u.useState(""), [p, m] = u.useState("00:00:00"), [y, C] = u.useState("00:00:00"), [j, P] = u.useState(() => /* @__PURE__ */ new Date()), [w, g] = u.useState(null), [x, I] = u.useState([]), [S, M] = u.useState(!1), [h, $] = u.useState(""), [E, N] = u.useState(1), [_, U] = u.useState(2), [R, F] = u.useState(null), oe = u.useCallback(() => {
    try {
      const ce = localStorage.getItem("itb_studio_bookmarks") || localStorage.getItem("itb_bookmarks");
      if (ce) {
        const Ce = JSON.parse(ce);
        Array.isArray(Ce) && I(Ce);
      }
    } catch {
    }
    fetch("/api/v1/extractor-advanced/bookmarks").then((ce) => ce.ok ? ce.json() : null).then((ce) => {
      Array.isArray(ce) && ce.length > 0 && I(ce);
    }).catch(() => {
    });
  }, []);
  u.useEffect(() => {
    if (!e) return;
    oe();
    let ce = n == null ? void 0 : n.startEpochMs, Ce = n == null ? void 0 : n.endEpochMs;
    if (!ce || isNaN(ce))
      if (n != null && n.start) {
        const st = String(n.start).replace(" ", "T"), We = new Date(st).getTime();
        ce = isNaN(We) ? Date.now() - 24 * 3600 * 1e3 : We;
      } else
        Ce = Date.now(), ce = Ce - 24 * 3600 * 1e3;
    if (!Ce || isNaN(Ce))
      if (n != null && n.end) {
        const st = String(n.end).replace(" ", "T"), We = new Date(st).getTime();
        Ce = isNaN(We) ? Date.now() : We;
      } else
        Ce = ce + 24 * 3600 * 1e3;
    F(null);
    const Ve = Rr(ce, o), ze = Rr(Ce, o);
    c(`${Ve.year}-${Ht(Ve.month)}-${Ht(Ve.day)}`), v(`${ze.year}-${Ht(ze.month)}-${Ht(ze.day)}`), m(`${Ht(Ve.hour)}:${Ht(Ve.minute)}:${Ht(Ve.second)}`), C(`${Ht(ze.hour)}:${Ht(ze.minute)}:${Ht(ze.second)}`), P(new Date(Date.UTC(Ve.year, Ve.month - 1, 1)));
  }, [e, n, o, oe]);
  const re = u.useCallback(() => {
    i && !d && v(i);
  }, [i, d]), X = d || i, D = u.useMemo(() => i ? `${i}T${p}` : "", [i, p]), K = u.useMemo(() => X ? `${X}T${y}` : "", [X, y]), b = u.useMemo(() => {
    const ce = {};
    return x.forEach((Ce) => {
      const Ve = Ce.startTime || Ce.start, ze = Ce.endTime || Ce.end || Ve;
      if (!Ve) return;
      const st = String(Ve).substring(0, 10), We = String(ze).substring(0, 10), [se, me, T] = st.split("-").map(Number), [Q, G, te] = We.split("-").map(Number);
      if (isNaN(se) || isNaN(me) || isNaN(T) || isNaN(Q) || isNaN(G) || isNaN(te)) return;
      let J = new Date(Date.UTC(se, me - 1, T));
      const ee = new Date(Date.UTC(Q, G - 1, te));
      for (; J.getTime() <= ee.getTime(); ) {
        const he = `${J.getUTCFullYear()}-${Ht(J.getUTCMonth() + 1)}-${Ht(J.getUTCDate())}`;
        ce[he] || (ce[he] = []), ce[he].push(Ce), J.setUTCDate(J.getUTCDate() + 1);
      }
    }), ce;
  }, [x]), B = async (ce, Ce) => {
    if (Ce && Ce.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const Ve = x.filter((ze) => (ze.id || ze.startTime) !== ce);
    I(Ve);
    try {
      localStorage.setItem("itb_studio_bookmarks", JSON.stringify(Ve)), localStorage.setItem("itb_bookmarks", JSON.stringify(Ve)), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: Ve }));
    } catch {
    }
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${ce}`, { method: "DELETE" });
    } catch {
    }
  }, L = (ce) => {
    const Ce = ce.startTime || ce.start, Ve = ce.endTime || ce.end;
    if (!Ce || !Ve) return;
    const ze = Ce.substring(0, 10), st = Ce.includes("T") ? Ce.split("T")[1].substring(0, 8) : "00:00:00", We = Ve.substring(0, 10), se = Ve.includes("T") ? Ve.split("T")[1].substring(0, 8) : "23:59:59";
    c(ze), v(We), m(st), C(se);
    const [me, T] = ze.split("-").map(Number);
    P(new Date(Date.UTC(me, T - 1, 1))), M(!1);
  }, ie = (ce) => {
    l ? (l(ce), t && t()) : L(ce);
  }, ne = u.useMemo(() => {
    if (o === "UTC" || !D.includes("T")) return { isAmbiguous: !1 };
    const [ce, Ce] = D.split("T");
    return Ha(ce, Ce);
  }, [D, o]), q = u.useMemo(() => {
    if (o === "UTC" || !K.includes("T")) return { isAmbiguous: !1 };
    const [ce, Ce] = K.split("T");
    return Ha(ce, Ce);
  }, [K, o]), H = u.useMemo(() => {
    if (!i || !X) return null;
    const ce = Hc(i, p, o, E), Ce = Hc(X, y, o, _);
    return ce === null || Ce === null || isNaN(ce) || isNaN(Ce) ? null : { startEpoch: ce, endEpoch: Ce, durationMs: Ce - ce };
  }, [i, p, X, y, o, E, _]), Ae = u.useMemo(() => !H || H.durationMs <= 0 ? [] : Fp(H.startEpoch, H.endEpoch), [H]), $e = u.useMemo(() => {
    if (!H || H.durationMs <= 0) return "0h";
    const ce = H.durationMs / (1e3 * 60 * 60);
    return ce >= 24 ? `${(ce / 24).toFixed(1)}d (${ce.toFixed(0)}h)` : `${ce.toFixed(1)}h`;
  }, [H]), Ie = u.useMemo(() => {
    const ce = j.getUTCFullYear(), Ce = j.getUTCMonth(), Ve = new Date(Date.UTC(ce, Ce, 1)).getUTCDay(), ze = new Date(Date.UTC(ce, Ce + 1, 0)).getUTCDate(), st = [];
    for (let We = 0; We < Ve; We++) st.push(null);
    for (let We = 1; We <= ze; We++) st.push(`${ce}-${Ht(Ce + 1)}-${Ht(We)}`);
    return st;
  }, [j]), Ue = (ce) => {
    if (ce) {
      if (F(null), !i || i && d)
        c(ce), v("");
      else if (i && !d)
        if (ce < i)
          c(ce), v("");
        else {
          const Ce = (/* @__PURE__ */ new Date(i + "T00:00:00Z")).getTime();
          if ((/* @__PURE__ */ new Date(ce + "T00:00:00Z")).getTime() - Ce > ra) {
            alert("The selected scope exceeds 7 days (168 hours). Capped to 7 days.");
            const ze = new Date(Ce + ra);
            v(`${ze.getUTCFullYear()}-${Ht(ze.getUTCMonth() + 1)}-${Ht(ze.getUTCDate())}`);
          } else
            v(ce);
        }
    }
  }, xe = (ce, Ce) => {
    F(Ce);
    const Ve = Date.now(), ze = Ve - ce, st = Rr(ze, o), We = Rr(Ve, o);
    c(`${st.year}-${Ht(st.month)}-${Ht(st.day)}`), v(`${We.year}-${Ht(We.month)}-${Ht(We.day)}`), m(`${Ht(st.hour)}:${Ht(st.minute)}:${Ht(st.second)}`), C(`${Ht(We.hour)}:${Ht(We.minute)}:${Ht(We.second)}`), P(new Date(Date.UTC(st.year, st.month - 1, 1)));
  }, Me = () => {
    if (re(), !H || isNaN(H.startEpoch) || isNaN(H.endEpoch)) {
      alert("Invalid date or time values");
      return;
    }
    if (H.durationMs <= 0) {
      alert("End point must be strictly after the start point.");
      return;
    }
    if (H.durationMs > ra) {
      alert("The selected scope cannot exceed 7 days (168 hours).");
      return;
    }
    r && r({
      start: D,
      end: K,
      startEpochMs: H.startEpoch,
      endEpochMs: H.endEpoch,
      durationMs: H.durationMs,
      timeMode: o
    }), t && t();
  }, nt = u.useMemo(() => {
    if (!h.trim()) return x;
    const ce = h.toLowerCase();
    return x.filter(
      (Ce) => (Ce.title || Ce.name || "").toLowerCase().includes(ce) || (Ce.startTime || "").includes(ce)
    );
  }, [x, h]);
  if (!e) return null;
  const gt = o === "UTC";
  return Ts.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "modal-backdrop-overlay", dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "master-time-modal-card tactical-dual-clocks", onClick: (ce) => ce.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title-block", children: [
          /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "MISSION RECORDING SCOPE" }),
          /* @__PURE__ */ s.jsxs("div", { className: "header-actions-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: `timezone-badge ${gt ? "utc" : "local"}`, children: [
              /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                "TIMEZONE: ",
                /* @__PURE__ */ s.jsx("strong", { children: gt ? "UTC (ZULU)" : "LOCAL (CONFIGURED)" })
              ] })
            ] }),
            a && /* @__PURE__ */ s.jsxs("div", { className: "modal-mode-toggle", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${gt ? "" : "active"}`,
                  onClick: () => a("LOCAL"),
                  children: "LOCAL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: `mode-pill ${gt ? "active" : ""}`,
                  onClick: () => a("UTC"),
                  children: "UTC"
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-bookmarks-pill ${S ? "active" : ""}`,
                onClick: () => M(!S),
                title: "Toggle Mission Bookmarks",
                children: [
                  /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "12", height: "12", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                  /* @__PURE__ */ s.jsx("span", { children: "BOOKMARKS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-count-tag", children: x.length })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-modal-close", onClick: t, title: "Close", children: "✕" })
      ] }),
      Ae.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "dst-notice-banner", children: [
        /* @__PURE__ */ s.jsx("span", { className: "banner-icon", children: "⚡" }),
        /* @__PURE__ */ s.jsxs("div", { className: "banner-text", children: [
          /* @__PURE__ */ s.jsx("strong", { children: "DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:" }),
          /* @__PURE__ */ s.jsx("span", { children: Ae.map((ce) => `${ce.description} (${ce.labelBefore} ➔ ${ce.labelAfter})`).join(", ") })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "quick-presets-grid", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${R === "7d" ? "active" : ""}`,
            onClick: () => xe(7 * 24 * 3600 * 1e3, "7d"),
            children: [
              "7d Week Max ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${R === "3d" ? "active" : ""}`,
            onClick: () => xe(3 * 24 * 3600 * 1e3, "3d"),
            children: [
              "3d Block ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${R === "24h" ? "active" : ""}`,
            onClick: () => xe(24 * 3600 * 1e3, "24h"),
            children: [
              "24h Day ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-preset ${R === "8h" ? "active" : ""}`,
            onClick: () => xe(8 * 3600 * 1e3, "8h"),
            children: [
              "8h Shift ",
              /* @__PURE__ */ s.jsx("span", { className: "dot" })
            ]
          }
        )
      ] }),
      S && /* @__PURE__ */ s.jsxs("div", { className: "modal-bookmarks-shelf-drawer", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "drawer-shelf-header", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "search-box", children: [
            /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "13", height: "13", children: [
              /* @__PURE__ */ s.jsx("circle", { cx: "11", cy: "11", r: "8" }),
              /* @__PURE__ */ s.jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
            ] }),
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "text",
                placeholder: "Filter saved mission bookmarks...",
                value: h,
                onChange: (ce) => $(ce.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "total-hint", children: [
            nt.length,
            " saved"
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "shelf-bookmarks-scroll", children: nt.length === 0 ? /* @__PURE__ */ s.jsx("div", { className: "shelf-empty-state", children: "No saved mission bookmarks found" }) : nt.map((ce) => {
          var We;
          const Ce = ce.id || ce.startTime, Ve = ce.title || ce.name || "Untitled Mission", ze = (ce.startTime || "").replace("T", " "), st = (ce.endTime || "").replace("T", " ");
          return /* @__PURE__ */ s.jsxs("div", { className: "shelf-bookmark-card", onClick: () => L(ce), children: [
            /* @__PURE__ */ s.jsxs("div", { className: "card-info-col", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "card-title-row", children: [
                /* @__PURE__ */ s.jsx("span", { className: "bm-pin-icon", children: "🔖" }),
                /* @__PURE__ */ s.jsx("strong", { className: "bm-title", children: Ve }),
                ce.cutStationName && /* @__PURE__ */ s.jsxs("span", { className: "bm-focus-pill", children: [
                  "🎯 ",
                  ce.cutStationName
                ] }),
                ((We = ce.stationIds) == null ? void 0 : We.length) > 0 && /* @__PURE__ */ s.jsxs("span", { className: "bm-stations-pill", children: [
                  ce.stationIds.length,
                  " STATIONS"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "bm-dates-range", children: [
                ze,
                " ➔ ",
                st
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "card-actions-col", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action set-range",
                  onClick: (se) => {
                    se.stopPropagation(), L(ce);
                  },
                  children: "SET SCOPE"
                }
              ),
              l && /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-action load-full",
                  onClick: (se) => {
                    se.stopPropagation(), ie(ce);
                  },
                  children: "LOAD ALL"
                }
              ),
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-bm-delete",
                  onClick: (se) => B(Ce, se),
                  children: "✕"
                }
              )
            ] })
          ] }, Ce);
        }) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "tactical-pickers-split dual-clocks-mode", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel calendar-panel", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "panel-top-nav", children: [
            /* @__PURE__ */ s.jsx("span", { className: "nav-title", children: j.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).toUpperCase() }),
            /* @__PURE__ */ s.jsxs("div", { className: "nav-arrows", children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => P((ce) => new Date(Date.UTC(ce.getUTCFullYear(), ce.getUTCMonth() - 1, 1))), className: "btn-nav", children: "◀" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", onClick: () => P((ce) => new Date(Date.UTC(ce.getUTCFullYear(), ce.getUTCMonth() + 1, 1))), className: "btn-nav", children: "▶" })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "calendar-week-headers", children: [
            /* @__PURE__ */ s.jsx("span", { children: "SU" }),
            /* @__PURE__ */ s.jsx("span", { children: "MO" }),
            /* @__PURE__ */ s.jsx("span", { children: "TU" }),
            /* @__PURE__ */ s.jsx("span", { children: "WE" }),
            /* @__PURE__ */ s.jsx("span", { children: "TH" }),
            /* @__PURE__ */ s.jsx("span", { children: "FR" }),
            /* @__PURE__ */ s.jsx("span", { children: "SA" })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "calendar-grid-days", children: Ie.map((ce, Ce) => {
            if (!ce) return /* @__PURE__ */ s.jsx("div", { className: "cal-cell empty" }, `empty-${Ce}`);
            const Ve = parseInt(ce.split("-")[2], 10), ze = ce === i, st = ce === (d || i), We = d || w, se = i && We && ce > i && ce < We, me = b[ce], T = !!(me && me.length > 0);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `cal-cell ${ze ? "start-edge" : ""} ${st ? "end-edge" : ""} ${se ? "in-range" : ""} ${T ? "has-bookmark" : ""}`,
                onClick: () => Ue(ce),
                onMouseEnter: () => !d && i && g(ce),
                onMouseLeave: () => g(null),
                title: T ? `${me.length} Bookmark(s) on this date` : void 0,
                children: [
                  /* @__PURE__ */ s.jsx("span", { className: "cell-num", children: Ve }),
                  T && /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "cal-cell-bookmark-ribbon",
                      onClick: (Q) => {
                        Q.stopPropagation(), M(!0), $(ce);
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }),
                        me.length > 1 && /* @__PURE__ */ s.jsx("span", { className: "ribbon-count", children: me.length })
                      ]
                    }
                  )
                ]
              },
              ce
            );
          }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "range-status-footer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "point-chip start", children: [
              /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "FROM:" }),
              /* @__PURE__ */ s.jsx("strong", { children: i || "SELECT" })
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "arrow-sep", children: "➔" }),
            /* @__PURE__ */ s.jsxs("div", { className: "point-chip end", children: [
              /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "TO:" }),
              /* @__PURE__ */ s.jsx("strong", { children: d || i || "--" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "picker-panel dual-clocks-wrapper", onPointerDown: re, children: [
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box start-clock", children: /* @__PURE__ */ s.jsx(
            vh,
            {
              label: "START TIME (FROM)",
              value: p,
              onChange: (ce) => {
                re(), m(ce), F(null);
              },
              accent: "cyan",
              showSeconds: !0
            }
          ) }),
          /* @__PURE__ */ s.jsx("div", { className: "single-clock-box end-clock", children: /* @__PURE__ */ s.jsx(
            vh,
            {
              label: "END TIME (TO)",
              value: y,
              onChange: (ce) => {
                re(), C(ce), F(null);
              },
              accent: "amber",
              showSeconds: !0
            }
          ) })
        ] })
      ] }),
      (ne.isAmbiguous || q.isAmbiguous) && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-strip-banner", children: [
        ne.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "START HOUR (",
            ne.transition.labelBefore,
            " / ",
            ne.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: E === 1 ? "active" : "",
                onClick: () => N(1),
                children: [
                  "1st Occurrence (",
                  ne.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: E === 2 ? "active" : "",
                onClick: () => N(2),
                children: [
                  "2nd Occurrence (",
                  ne.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        q.isAmbiguous && /* @__PURE__ */ s.jsxs("div", { className: "ambiguity-box", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "amb-title", children: [
            "END HOUR (",
            q.transition.labelBefore,
            " / ",
            q.transition.labelAfter,
            "):"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "amb-btns", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: _ === 1 ? "active" : "",
                onClick: () => U(1),
                children: [
                  "1st Occurrence (",
                  q.transition.labelBefore,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: _ === 2 ? "active" : "",
                onClick: () => U(2),
                children: [
                  "2nd Occurrence (",
                  q.transition.labelAfter,
                  ")"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "range-scope-summary-pill", children: [
        /* @__PURE__ */ s.jsx("span", { className: "summary-label", children: "SELECTED WINDOW:" }),
        /* @__PURE__ */ s.jsx("strong", { className: "summary-value", style: { color: H && H.durationMs > ra ? "#f43f5e" : "#22d3ee" }, children: $e }),
        /* @__PURE__ */ s.jsx("span", { className: "summary-cap", children: Ae.length > 0 ? "(INCLUDES CLOCK SHIFT)" : "/ 7 DAYS MAXIMUM" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer-actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-cancel", onClick: t, children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-action-load", onClick: Me, children: "APPLY SCOPE" })
      ] })
    ] }) }),
    document.body
  );
}
const qp = "extractor_incident_bookmarks_fallback", c1 = ["itb_studio_bookmarks", "itb_bookmarks", qp];
function u1({
  isOpen: e,
  onClose: t,
  currentState: n,
  onLoadBookmark: r,
  timeMode: l
}) {
  const o = l || (n == null ? void 0 : n.timeMode) || "LOCAL", [a, i] = u.useState([]), [c, d] = u.useState(""), [v, p] = u.useState(!1), [m, y] = u.useState(!1), [C, j] = u.useState(null), [P, w] = u.useState(""), g = u.useCallback((R) => {
    c1.forEach((F) => {
      try {
        localStorage.setItem(F, JSON.stringify(R));
      } catch {
      }
    }), window.dispatchEvent(new CustomEvent("bookmarks-updated", { detail: R }));
  }, []), x = u.useCallback(async () => {
    p(!0);
    try {
      const R = await fetch("/api/v1/extractor-advanced/bookmarks");
      if (R.ok) {
        const F = await R.json(), oe = Array.isArray(F) ? F : [];
        i(oe), g(oe);
        return;
      }
    } catch (R) {
      console.warn("[BookmarksModal] Failed loading from server, falling back to local storage", R);
    } finally {
      p(!1);
    }
    try {
      const R = localStorage.getItem(qp) || localStorage.getItem("itb_studio_bookmarks");
      R && i(JSON.parse(R));
    } catch {
    }
  }, [g]);
  if (u.useEffect(() => {
    e && x();
  }, [e, x]), !e) return null;
  const I = async () => {
    var ne, q, H, Ae, $e, Ie;
    if (!c.trim() || m) return;
    const R = (n == null ? void 0 : n.timelineBaseEpochMs) ?? (n == null ? void 0 : n.baseEpochMs) ?? ((ne = n == null ? void 0 : n.timeRange) != null && ne.start ? new Date(n.timeRange.start.replace(" ", "T")).getTime() : 0), F = (n == null ? void 0 : n.inPointMs) ?? 0, oe = (n == null ? void 0 : n.outPointMs) ?? (((q = n == null ? void 0 : n.timeRange) == null ? void 0 : q.durationMs) || 0), re = (n == null ? void 0 : n.playheadMs) ?? F, X = R + F, D = R + oe, K = R + re, b = (n == null ? void 0 : n.selectedStationIds) || [], B = (n == null ? void 0 : n.selectedStationNames) || [], L = ((H = n == null ? void 0 : n.allStationIds) == null ? void 0 : H.length) > 0 ? n.allStationIds : b, ie = {
      title: c.trim(),
      startTime: ((Ae = n == null ? void 0 : n.timeRange) == null ? void 0 : Ae.start) || "",
      endTime: (($e = n == null ? void 0 : n.timeRange) == null ? void 0 : $e.end) || "",
      baseEpochMs: R,
      timelineBaseEpochMs: R,
      inPointMs: F,
      outPointMs: oe,
      playheadMs: re,
      inEpochMs: X,
      outEpochMs: D,
      playheadEpochMs: K,
      selectedStationIds: b,
      selectedStationNames: B,
      allStationIds: L,
      stationIds: b.length > 0 ? b : L,
      activeStationId: (n == null ? void 0 : n.activeStationId) || null,
      activeStationName: (n == null ? void 0 : n.activeStationName) || null,
      spotlightStationId: (n == null ? void 0 : n.spotlightStationId) || null
    };
    y(!0);
    try {
      const Ue = await fetch("/api/v1/extractor-advanced/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ie)
      });
      if (Ue.ok) {
        const xe = await Ue.json(), nt = [{
          ...ie,
          ...xe.bookmark || {},
          inEpochMs: X,
          outEpochMs: D,
          playheadEpochMs: K,
          selectedStationIds: b,
          selectedStationNames: B,
          allStationIds: L,
          id: ((Ie = xe.bookmark) == null ? void 0 : Ie.id) || xe.id || `bm_${Date.now()}`
        }, ...a];
        i(nt), g(nt), d("");
      } else
        throw new Error(`Server returned ${Ue.status}`);
    } catch (Ue) {
      console.error("[BookmarksModal] Failed saving bookmark to server:", Ue);
      const Me = [{
        ...ie,
        inEpochMs: X,
        outEpochMs: D,
        playheadEpochMs: K,
        selectedStationIds: b,
        selectedStationNames: B,
        allStationIds: L,
        id: `bm_local_${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, ...a];
      i(Me), g(Me), d("");
    } finally {
      y(!1);
    }
  }, S = async (R, F) => {
    if (F.stopPropagation(), !window.confirm("Delete this mission bookmark permanently?")) return;
    const oe = a.filter((re) => (re.id || re.startTime) !== R);
    i(oe), g(oe);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${R}`, { method: "DELETE" });
    } catch (re) {
      console.warn("[BookmarksModal] Server delete failed, deleted locally:", re);
    }
  }, M = (R, F) => {
    F.stopPropagation(), j(R.id || R.startTime), w(R.title || R.name || "");
  }, h = async (R, F) => {
    if (F && F.stopPropagation(), !P.trim()) return;
    const oe = a.find((D) => (D.id || D.startTime) === R), re = P.trim(), X = a.map(
      (D) => (D.id || D.startTime) === R ? { ...D, title: re, name: re } : D
    );
    i(X), g(X), j(null);
    try {
      await fetch(`/api/v1/extractor-advanced/bookmarks/${R}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...oe, title: re })
      });
    } catch (D) {
      console.warn("[BookmarksModal] Server rename failed, updated locally:", D);
    }
  }, $ = (R) => {
    R.stopPropagation(), j(null);
  }, E = (R) => !R || isNaN(R) ? "--:--:--" : St(R, o), N = (R) => {
    const F = R.startTime || R.StartTime, oe = R.endTime || R.EndTime;
    if (!F) return "--";
    const re = String(F).replace("T", " ").substring(0, 19), X = oe ? String(oe).replace("T", " ").substring(0, 19) : re;
    return `${re} ➔ ${X}`;
  }, _ = (R) => {
    let F = R.inEpochMs || R.InEpochMs, oe = R.outEpochMs || R.OutEpochMs;
    if (!F || !oe) {
      const re = R.timelineBaseEpochMs || R.baseEpochMs || (R.startTime ? new Date(String(R.startTime).replace(" ", "T")).getTime() : 0), X = R.inPointMs ?? R.InPointMs, D = R.outPointMs ?? R.OutPointMs;
      re && typeof X == "number" && typeof D == "number" && (X > 0 || D > 0) && (F = re + X, oe = re + D);
    }
    if (F && oe && !isNaN(F) && !isNaN(oe) && F > 0) {
      const re = E(F), X = E(oe), D = Math.max(0, oe - F), K = Math.floor(D / 6e4), b = Math.floor(K / 60), B = K % 60, L = b > 0 ? `${b}h ${B}m` : `${K}m`;
      return { timeText: `${re} ➔ ${X}`, duration: L };
    }
    return { timeText: "--:--:-- ➔ --:--:--", duration: "" };
  }, U = (R) => {
    const F = R.selectedStationNames || [], oe = R.selectedStationIds || R.cutStationIds || R.stationIds || [];
    return F.length > 0 ? F.join(", ") : oe.length > 0 ? oe.join(", ") : R.cutStationName ? R.cutStationName : R.activeStationName ? R.activeStationName : "All Stations in Scope";
  };
  return Ts.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "bookmarks-modal-overlay", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "bookmarks-modal-card", onClick: (R) => R.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-brand-wrap", children: [
          /* @__PURE__ */ s.jsx("div", { className: "brand-icon-box", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }) }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "brand-text-col", children: [
            /* @__PURE__ */ s.jsx("span", { className: "modal-title", children: "SESSION BOOKMARKS" }),
            /* @__PURE__ */ s.jsx("span", { className: "modal-subtitle", children: "OPERATIONAL TIMELINE POINTS & DEBRIEFING SNAPSHOTS" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "btn-modal-close", onClick: t, title: "Close (Esc)", children: "✕" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "create-bookmark-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "input-field-wrap", children: [
          /* @__PURE__ */ s.jsxs("svg", { className: "input-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "4", y1: "9", x2: "20", y2: "9" }),
            /* @__PURE__ */ s.jsx("line", { x1: "4", y1: "15", x2: "20", y2: "15" }),
            /* @__PURE__ */ s.jsx("line", { x1: "10", y1: "3", x2: "8", y2: "21" }),
            /* @__PURE__ */ s.jsx("line", { x1: "16", y1: "3", x2: "14", y2: "21" })
          ] }),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "text",
              placeholder: "Enter event tag or debriefing note...",
              value: c,
              onChange: (R) => d(R.target.value),
              onKeyDown: (R) => R.key === "Enter" && I(),
              disabled: m,
              autoFocus: !0
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `btn-save-state ${c.trim() && !m ? "active" : ""}`,
            onClick: I,
            disabled: !c.trim() || m,
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
                /* @__PURE__ */ s.jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
              ] }),
              /* @__PURE__ */ s.jsx("span", { children: m ? "SAVING..." : "SAVE SNAPSHOT" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "bookmarks-section-heading", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "heading-title-group", children: [
          /* @__PURE__ */ s.jsx("span", { className: "pulse-indicator" }),
          /* @__PURE__ */ s.jsx("span", { children: "SAVED TIMELINE EVENTS" })
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "count-badge", children: v ? "SYNCING..." : `${a.length} RECORDED` })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "bookmarks-list-container", children: a.length === 0 && !v ? /* @__PURE__ */ s.jsxs("div", { className: "empty-bookmarks-state", children: [
        /* @__PURE__ */ s.jsx("div", { className: "empty-reticle-box", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
          /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "9", strokeDasharray: "3 3" }),
          /* @__PURE__ */ s.jsx("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z", opacity: "0.6" })
        ] }) }),
        /* @__PURE__ */ s.jsx("span", { className: "empty-title", children: "NO SAVED TIMELINE POINTS" }),
        /* @__PURE__ */ s.jsx("p", { className: "empty-desc", children: "Bookmark operational moments and active screen configurations to quickly return to them during debriefing." })
      ] }) : a.map((R) => {
        var K, b, B;
        const F = R.id || R.startTime, oe = C === F, re = _(R), X = U(R), D = ((K = R.allStationIds) == null ? void 0 : K.length) || ((b = R.selectedStationIds) == null ? void 0 : b.length) || ((B = R.stationIds) == null ? void 0 : B.length) || 0;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `bookmark-item-card ${oe ? "is-editing" : ""}`,
            onClick: () => {
              oe || (r && r(R), t());
            },
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "card-indicator-accent" }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-info", children: [
                oe ? /* @__PURE__ */ s.jsxs("div", { className: "bm-edit-inline-wrap", onClick: (L) => L.stopPropagation(), children: [
                  /* @__PURE__ */ s.jsx(
                    "input",
                    {
                      type: "text",
                      className: "bm-edit-input",
                      value: P,
                      onChange: (L) => w(L.target.value),
                      onKeyDown: (L) => {
                        L.key === "Enter" && h(F, L), L.key === "Escape" && $(L);
                      },
                      autoFocus: !0
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "edit-btn-group", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-edit-confirm",
                        onClick: (L) => h(F, L),
                        title: "Save (Enter)",
                        children: "✓"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-edit-cancel",
                        onClick: $,
                        title: "Cancel (Esc)",
                        children: "✕"
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ s.jsxs("div", { className: "bm-title-row", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "bm-title", children: R.title || R.name || "Untitled Event" }),
                  /* @__PURE__ */ s.jsx("span", { className: "bm-time-tag", children: R.createdAt ? new Date(R.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "" })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "bm-primary-scope-row", children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "meta-pill main-scope", title: "General timeline window selected", children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                      /* @__PURE__ */ s.jsx("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "16", y1: "2", x2: "16", y2: "6" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "8", y1: "2", x2: "8", y2: "6" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "3", y1: "10", x2: "21", y2: "10" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "scope-lbl", children: "SCOPE:" }),
                    /* @__PURE__ */ s.jsx("strong", { children: N(R) })
                  ] }),
                  D > 0 && /* @__PURE__ */ s.jsxs("span", { className: "meta-pill scope-stations", title: "Total stations in this scope window", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "dot" }),
                    D,
                    " STATIONS IN SCOPE"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "bm-cut-secondary-header", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-time-cell", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "cut-icon", children: "✂️" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT WINDOW:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-time-val", children: re.timeText }),
                    re.duration && /* @__PURE__ */ s.jsxs("span", { className: "cut-duration-badge", children: [
                      "(",
                      re.duration,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-stations-cell", title: `Selected Stations: ${X}`, children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-header-tag", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "target-icon", children: "🎯" }),
                      /* @__PURE__ */ s.jsx("span", { children: "CUT STATIONS:" })
                    ] }),
                    /* @__PURE__ */ s.jsx("strong", { className: "cut-stations-names", children: X })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "bm-card-actions", onClick: (L) => L.stopPropagation(), children: [
                !oe && /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control edit",
                    onClick: (L) => M(R, L),
                    title: "Edit bookmark title",
                    children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", width: "13", height: "13", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
                      /* @__PURE__ */ s.jsx("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
                    ] })
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-bm-control delete",
                    onClick: (L) => S(F, L),
                    title: "Delete bookmark permanently",
                    children: /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", width: "13", height: "13", children: [
                      /* @__PURE__ */ s.jsx("polyline", { points: "3 6 5 6 21 6" }),
                      /* @__PURE__ */ s.jsx("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
                    ] })
                  }
                )
              ] })
            ]
          },
          F
        );
      }) })
    ] }) }),
    document.body
  );
}
const Nh = {
  USER: "itb_auth_user",
  ROLES: "itb_auth_roles"
};
function em() {
  try {
    if (typeof window > "u") return "Guest Operator";
    const e = sessionStorage.getItem(Nh.USER) || localStorage.getItem(Nh.USER);
    if (e) {
      const t = JSON.parse(e), n = (t == null ? void 0 : t.displayName) || (t == null ? void 0 : t.username);
      if (n && typeof n == "string" && n.trim())
        return n.trim();
    }
  } catch {
  }
  return "Guest Operator";
}
function d1(e) {
  if (!e || e.length === 0)
    return { minX: 0, minY: 0, totalWidth: 1920, totalHeight: 1080 };
  const t = Math.min(...e.map((o) => o.X ?? o.x ?? 0)), n = Math.min(...e.map((o) => o.Y ?? o.y ?? 0)), r = Math.max(...e.map((o) => (o.X ?? o.x ?? 0) + (o.Width || o.width || 1920))), l = Math.max(...e.map((o) => (o.Y ?? o.y ?? 0) + (o.Height || o.height || 1080)));
  return {
    minX: t,
    minY: n,
    totalWidth: Math.max(1, r - t),
    totalHeight: Math.max(1, l - n)
  };
}
function h1(e, t) {
  if (!e || !t || t.totalWidth <= 0 || t.totalHeight <= 0)
    return { leftPct: 0, topPct: 0, widthPct: 100, heightPct: 100 };
  const n = e.X ?? e.x ?? 0, r = e.Y ?? e.y ?? 0, l = e.Width || e.width || 1920, o = e.Height || e.height || 1080;
  return {
    leftPct: (n - t.minX) / t.totalWidth * 100,
    topPct: (r - t.minY) / t.totalHeight * 100,
    widthPct: l / t.totalWidth * 100,
    heightPct: o / t.totalHeight * 100
  };
}
function f1({
  station: e,
  baseEpochMs: t = 0,
  totalDurationMs: n = 36e5,
  playheadMs: r = 0,
  setPlayheadMs: l,
  isPlaying: o = !1,
  setIsPlaying: a,
  playbackSpeed: i = 1,
  _timeMode: c = "LOCAL",
  inPointMs: d = 0,
  outPointMs: v = 36e5,
  isLooping: p = !0,
  recordingSegments: m = {},
  globalGaps: y = [],
  showWatermark: C = !0,
  directorPlan: j,
  onOverrideDisplay: P,
  onResetOverride: w,
  viewMode: g,
  onViewModeChange: x,
  onOpenFullscreen: I,
  isPipSwapped: S,
  onPipSwapChange: M,
  className: h = ""
}) {
  const $ = u.useRef(null), E = u.useRef(null), N = u.useRef(null), _ = u.useRef(r), U = u.useRef(r), R = u.useRef(r), F = u.useRef(!1), oe = u.useRef(null), re = u.useRef(o), X = u.useRef(!1);
  _.current = r;
  const D = e == null ? void 0 : e.id, K = e && (e.hostname || e.name) || "", b = u.useMemo(() => {
    var He, qe, xt, ft;
    const V = (e == null ? void 0 : e.displays) || (e == null ? void 0 : e.Displays) || ((He = e == null ? void 0 : e.displayTopology) == null ? void 0 : He.displays) || ((qe = e == null ? void 0 : e.displayTopology) == null ? void 0 : qe.Displays) || ((xt = e == null ? void 0 : e.DisplayTopology) == null ? void 0 : xt.Displays) || ((ft = e == null ? void 0 : e.topology) == null ? void 0 : ft.displays) || [];
    if (!Array.isArray(V) || V.length === 0) return [];
    const pe = V.length > 1 && V.every((Qe) => (Qe.X ?? Qe.x ?? 0) === 0 && (Qe.Y ?? Qe.y ?? 0) === 0);
    let ye = 0;
    return V.map((Qe, Nt) => {
      const kt = Qe.Width || Qe.width || 1920, Ft = Qe.Height || Qe.height || 1080, $t = pe ? ye : Qe.X ?? Qe.x ?? Nt * kt, un = pe ? 0 : Qe.Y ?? Qe.y ?? 0;
      pe && (ye += kt);
      const Tn = (Qe.displayId ?? Qe.DisplayId ?? `mon-${Nt}`).toLowerCase(), kn = Qe.displayNumber ?? Qe.DisplayNumber ?? Nt + 1, Ut = (Qe.displayName || Qe.DisplayName || "").replace(/\s*\(mon-\d+\)/i, "").trim() || `Screen ${kn}`, As = !!(Qe.isPrimary ?? Qe.IsPrimary ?? Nt === 0);
      return {
        ...Qe,
        displayId: Tn,
        DisplayId: Tn,
        displayIndex: Nt,
        displayNumber: kn,
        DisplayNumber: kn,
        displayName: Ut,
        DisplayName: Ut,
        isPrimary: As,
        IsPrimary: As,
        x: $t,
        y: un,
        X: $t,
        Y: un,
        width: kt,
        height: Ft,
        Width: kt,
        Height: Ft
      };
    });
  }, [e]), B = b.length > 1, [L, ie] = u.useState(() => {
    if (!B) return "mon-0";
    try {
      const V = localStorage.getItem("itb_solo_viewmode");
      if (V) return V;
    } catch {
    }
    return "canvas";
  }), q = B ? g !== void 0 ? g : L : "mon-0", H = u.useCallback((V) => {
    const pe = typeof V == "function" ? V(q) : V;
    ie(pe);
    try {
      localStorage.setItem("itb_solo_viewmode", pe);
    } catch {
    }
    x && x(pe);
  }, [q, x]), [Ae, $e] = u.useState(!1), Ie = S !== void 0 ? S : Ae, Ue = u.useCallback((V) => {
    const pe = typeof V == "function" ? V(Ie) : V;
    $e(pe), M && M(pe);
  }, [Ie, M]), xe = u.useMemo(() => {
    const V = j || (e == null ? void 0 : e.directorPlan);
    if (!V || !V.segments || V.segments.length === 0) return null;
    const pe = t + r;
    return V.segments.find((ye) => {
      const He = ye.startEpochMs ?? ye.StartEpochMs ?? 0, qe = ye.endEpochMs ?? ye.EndEpochMs ?? 0;
      return pe >= He && pe <= qe;
    }) || V.segments[0];
  }, [j, e == null ? void 0 : e.directorPlan, t, r]), Me = u.useMemo(() => {
    var V, pe;
    if (!B) return "mon-0";
    if (q === "split" || q === "pip" || q === "canvas" || q === "all-displays") {
      const ye = (((V = b[0]) == null ? void 0 : V.displayId) ?? "mon-0").toLowerCase(), He = (((pe = b[1]) == null ? void 0 : pe.displayId) ?? "mon-1").toLowerCase();
      return Ie ? He : ye;
    }
    return q !== "director" ? q.toLowerCase() : ((xe == null ? void 0 : xe.targetDisplayId) ?? (xe == null ? void 0 : xe.TargetDisplayId) ?? "mon-0").toLowerCase();
  }, [B, q, xe, b, Ie]), nt = u.useMemo(() => {
    var pe;
    if (!B) return null;
    const V = b.find((ye) => (ye.displayId ?? ye.DisplayId ?? "").toLowerCase() !== Me);
    return V ? (V.displayId ?? V.DisplayId).toLowerCase() : (((pe = b[1]) == null ? void 0 : pe.displayId) || "mon-1").toLowerCase();
  }, [B, b, Me]), gt = u.useMemo(() => {
    const V = b.find((ye) => (ye.displayId ?? "").toLowerCase() === (Me || "").toLowerCase());
    if (V) return V.displayName || `Screen ${V.displayNumber || 1}`;
    if (Me === "mon-0" || Me === "0") return "Screen 1";
    if (Me === "mon-1" || Me === "1") return "Screen 2";
    const pe = (Me || "").match(/\d+/);
    if (pe) {
      const ye = parseInt(pe[0], 10);
      return `Screen ${(Me || "").startsWith("mon-") ? ye + 1 : ye}`;
    }
    return (Me || "Screen 1").toUpperCase();
  }, [b, Me]), ce = u.useMemo(() => {
    const V = b.find((pe) => (pe.displayId ?? "").toLowerCase() === (nt || "").toLowerCase());
    return V ? V.displayName || `Screen ${V.displayNumber || 2}` : "Screen 2";
  }, [b, nt]), Ce = u.useMemo(() => q !== "director" && q !== "split" && q !== "pip" && q !== "canvas" ? !0 : !!((xe == null ? void 0 : xe.isManualOverride) ?? (xe == null ? void 0 : xe.IsManualOverride)), [q, xe]), [Ve, ze] = u.useState({}), st = u.useRef(null), [We, se] = u.useState({ width: 0, height: 0 }), me = u.useMemo(() => d1(b), [b]);
  u.useEffect(() => {
    if (!B || q !== "canvas" && q !== "all-displays" || o)
      return;
    const V = () => {
      const ye = st.current;
      if (!ye) return;
      const He = 48, qe = 72, xt = Math.max(100, ye.clientWidth - He), ft = Math.max(100, ye.clientHeight - qe), Qe = me.totalWidth || 1920, Nt = me.totalHeight || 1080, kt = Qe / Nt;
      let Ft = xt, $t = Ft / kt;
      $t > ft && ($t = ft, Ft = $t * kt), se({ width: Math.round(Ft), height: Math.round($t) });
    };
    V();
    const pe = new ResizeObserver(V);
    return st.current && pe.observe(st.current), () => pe.disconnect();
  }, [B, q, me]);
  const T = u.useMemo(() => Math.round((t + r) / 250) * 250, [t, r]);
  u.useEffect(() => {
    if (!B || q !== "canvas" && q !== "all-displays")
      return;
    let V = !0;
    const pe = new AbortController(), ye = T;
    b.forEach((qe, xt) => {
      const ft = (qe.displayId ?? qe.DisplayId ?? `mon-${xt}`).toLowerCase(), Qe = Rn.get(K, ye, ft);
      Qe ? ze((Nt) => ({ ...Nt, [ft]: Qe })) : Rn.fetchFrame(K, ye, pe.signal, ft).then((Nt) => {
        V && Nt && ze((kt) => ({ ...kt, [ft]: Nt }));
      });
    });
    const He = Rn.subscribe((qe, xt, ft, Qe) => {
      qe === K && xt === ye && Qe && V && ze((Nt) => ({ ...Nt, [Qe.toLowerCase()]: ft }));
    });
    return () => {
      V = !1, pe.abort(), He();
    };
  }, [B, q, b, K, T]);
  const Q = u.useRef(Me), G = u.useMemo(() => e ? m[e.id] || m[e.hostname] || e.segments || [] : [], [e, m]), te = t + r, J = u.useMemo(() => G.length === 0 ? !0 : G.some((V) => {
    const pe = (V.startEpochMs ?? V.startEpoch ?? 0) - 2e3, ye = (V.endEpochMs ?? V.endEpoch ?? 0) + 2e3;
    return te >= pe && te <= ye;
  }), [G, te]), ee = !J && G.length > 0, [he, Ge] = u.useState("A"), [_e, Be] = u.useState(""), [dt, Je] = u.useState(""), [wt, Et] = u.useState(""), [Gt, Lt] = u.useState(null), [et, ht] = u.useState(!1), [Tt, rt] = u.useState(!1), [Re, ot] = u.useState(() => {
    if (!K) return null;
    const V = Math.round(t + r);
    return Rn.get(K, V, Me) || null;
  }), [Zt, _t] = u.useState(null), cn = he === "A" ? $ : E, De = u.useCallback(() => {
    const V = jl();
    $.current && ($.current.volume = V.volume, $.current.muted = he !== "A" || V.isMuted, $.current.defaultPlaybackRate = i, $.current.playbackRate = i, he === "A" && !V.isMuted && Ka($.current)), E.current && (E.current.volume = V.volume, E.current.muted = he !== "B" || V.isMuted, E.current.defaultPlaybackRate = i, E.current.playbackRate = i, he === "B" && !V.isMuted && Ka(E.current)), N.current && (N.current.muted = !0, N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [he, i]);
  u.useEffect(() => {
    const V = (pe) => {
      pe.detail && ($.current && ($.current.volume = pe.detail.volume), E.current && (E.current.volume = pe.detail.volume));
    };
    return window.addEventListener("itb-audio-state-changed", V), () => window.removeEventListener("itb-audio-state-changed", V);
  }, []), u.useEffect(() => {
    $.current && ($.current.defaultPlaybackRate = i, $.current.playbackRate = i), E.current && (E.current.defaultPlaybackRate = i, E.current.playbackRate = i), N.current && (N.current.defaultPlaybackRate = i, N.current.playbackRate = i);
  }, [i]), u.useEffect(() => {
    if (!D || !K) return;
    if (o) {
      re.current = !0;
      return;
    }
    const V = re.current;
    re.current = o;
    let pe = !0;
    const ye = new AbortController(), He = Math.round(t + r), qe = Rn.get(K, He, Me);
    if (qe) {
      ot(qe);
      return;
    }
    const ft = setTimeout(() => {
      pe && Rn.fetchFrame(K, He, ye.signal, Me).then((Nt) => {
        pe && Nt && ot(Nt);
      });
    }, V ? 25 : 35), Qe = Rn.subscribe((Nt, kt, Ft, $t) => {
      Nt === K && kt === He && (!$t || $t === Me) && pe && ot(Ft);
    });
    return () => {
      pe = !1, clearTimeout(ft), ye.abort(), Qe();
    };
  }, [D, K, t, r, o, et, Me]), u.useEffect(() => {
    if (!B || q !== "split" && q !== "pip" || !nt || o) {
      _t(null);
      return;
    }
    let V = !0;
    const pe = new AbortController(), ye = Math.round(t + r), He = Rn.get(K, ye, nt);
    if (He) {
      _t(He);
      return;
    }
    const qe = setTimeout(() => {
      V && Rn.fetchFrame(K, ye, pe.signal, nt).then((ft) => {
        V && ft && _t(ft);
      });
    }, 40), xt = Rn.subscribe((ft, Qe, Nt, kt) => {
      ft === K && Qe === ye && (!kt || kt === nt) && V && _t(Nt);
    });
    return () => {
      V = !1, clearTimeout(qe), pe.abort(), xt();
    };
  }, [B, q, nt, D, K, t, r]);
  const Pe = u.useCallback((V, pe = Me) => {
    const ye = Math.round(t), He = Math.round(t + n), qe = Math.min(He, Math.max(ye, Math.round(t + V)));
    return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(K)}&startEpoch=${ye}&endEpoch=${He}&seekEpoch=${qe}&displayId=${encodeURIComponent(pe)}&_t=${Date.now()}`;
  }, [t, n, K, Me]);
  u.useEffect(() => {
    if (!(!D || !K))
      if (o && J) {
        const V = _.current;
        U.current = V, R.current = V, F.current = !1;
        const pe = Pe(V, Me);
        ht(!1), rt(!0), Ge("A"), Be(pe), Je(""), Lt(null), Et((q === "split" || q === "pip") && nt ? Pe(V, nt) : "");
      } else o || (oe.current && clearTimeout(oe.current), F.current = !1, Be(""), Je(""), Et(""), Lt(null), ht(!1), rt(!1), $.current && $.current.pause(), E.current && E.current.pause(), N.current && N.current.pause());
  }, [o, D, K, J, Pe, Me, q, nt]), u.useEffect(() => {
    if (Q.current !== Me && (Q.current = Me, o && J)) {
      const V = _.current;
      U.current = V;
      const pe = Pe(V, Me);
      ht(!1), rt(!0), Ge("A"), Be(pe), Je("");
    }
  }, [Me, o, J, Pe]), u.useEffect(() => {
    if (!D || !K) return;
    const V = Math.abs(r - R.current);
    if (!o || V < 15) {
      R.current = r;
      return;
    }
    return F.current = !0, R.current = r, U.current = r, $.current && $.current.pause(), E.current && E.current.pause(), N.current && N.current.pause(), ht(!1), rt(!0), oe.current && clearTimeout(oe.current), oe.current = setTimeout(() => {
      if (!J) {
        Be(""), Je(""), Et(""), rt(!1), F.current = !1;
        return;
      }
      const pe = _.current, ye = Pe(pe, Me);
      Ge("A"), Be(ye), Je(""), Lt(null), (q === "split" || q === "pip") && nt && Et(Pe(pe, nt));
    }, 75), () => {
      oe.current && clearTimeout(oe.current);
    };
  }, [r, o, D, K, J, Pe, Me, q, nt]), u.useEffect(() => {
    if (!o || !et || G.length === 0) return;
    const V = t + _.current, pe = G.map((ye) => ({
      start: ye.startEpochMs ?? ye.startEpoch ?? 0,
      end: ye.endEpochMs ?? ye.endEpoch ?? 0
    })).filter((ye) => ye.start > V + 500).sort((ye, He) => ye.start - He.start)[0];
    if (pe && (!Gt || Gt.start !== pe.start)) {
      const ye = pe.start - t;
      if (ye < v) {
        const He = Pe(ye, Me);
        Lt({ start: pe.start, ms: ye }), he === "A" ? Je(He) : Be(He);
      }
    }
  }, [o, et, r, t, v, G, Gt, he, Pe, Me]);
  const lt = u.useCallback(() => {
    if (Gt) {
      const V = he === "A" ? "B" : "A", pe = V === "A" ? $ : E;
      Ge(V), U.current = Gt.ms, R.current = Gt.ms, Lt(null), pe.current && pe.current.play().then(() => {
        De();
      }).catch(() => {
      });
    } else
      p ? l(d) : a(!1);
  }, [Gt, he, De, p, d, l, a]), ue = u.useCallback(() => {
    const V = cn.current;
    if (!V || F.current || !o || X.current) return;
    const pe = V.currentTime * 1e3, ye = Math.round(U.current + pe);
    if (y && y.length > 0) {
      const He = t + ye, qe = y.find((xt) => He >= xt.startEpochMs && He < xt.endEpochMs);
      if (qe) {
        X.current = !0;
        const xt = Math.round(qe.endEpochMs - t) + 10;
        l(xt), setTimeout(() => {
          X.current = !1;
        }, 150);
        return;
      }
    }
    if (ye >= v) {
      p ? l(d) : (a(!1), l(v));
      return;
    }
    R.current = ye, l(ye);
  }, [cn, o, t, y, v, p, d, l, a]), Ze = Tt && o && !ee;
  return /* @__PURE__ */ s.jsxs("div", { className: `studio-video-feed-root ${q} ${h}`, children: [
    B && /* @__PURE__ */ s.jsxs("div", { className: "feed-viewmode-toolbar", onClick: (V) => V.stopPropagation(), children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${q === "director" ? "active" : ""}`,
          onClick: () => H("director"),
          title: "Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)",
          children: "🎬 DIRECTOR"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${q === "canvas" ? "active" : ""}`,
          onClick: () => H("canvas"),
          title: "Virtual Desktop Canvas: Physical OS monitor arrangement and geometry",
          children: "⊞ CANVAS"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${q === "split" ? "active" : ""}`,
          onClick: () => H("split"),
          title: "Split Screen: View all station monitors side-by-side",
          children: "🔲 SPLIT"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: `btn-mode ${q === "pip" ? "active" : ""}`,
          onClick: () => H("pip"),
          title: "Picture-in-Picture: Hero primary display with floating secondary window",
          children: "🪟 PiP"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
      b.map((V, pe) => {
        const ye = (V.displayId ?? `mon-${pe}`).toLowerCase(), He = V.displayNumber ?? pe + 1, qe = V.displayName || `Screen ${He}`;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: `btn-mode ${q === ye ? "active" : ""}`,
            onClick: () => H(ye),
            title: `Pin directly to ${qe}`,
            children: [
              "🖥️ ",
              He
            ]
          },
          ye
        );
      }),
      q === "director" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "toolbar-divider" }),
        /* @__PURE__ */ s.jsxs("div", { className: "director-punch-strip", title: "Live Camera Switcher: Click to punch monitor override at current time", children: [
          /* @__PURE__ */ s.jsx("span", { className: "punch-strip-label", children: "PUNCH:" }),
          b.map((V, pe) => {
            const ye = (V.displayId ?? `mon-${pe}`).toLowerCase(), He = V.displayNumber ?? pe + 1, qe = V.displayName || `Screen ${He}`, xt = Me === ye;
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: `btn-punch-camera ${xt ? "active" : ""} ${Ce && xt ? "is-override" : ""}`,
                onClick: () => {
                  P == null || P(D, t + r, ye);
                },
                title: `Punch ${qe} as override at playhead`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: "cam-num", children: [
                    "SCREEN ",
                    He
                  ] }),
                  xt && /* @__PURE__ */ s.jsx("span", { className: "cam-status", children: Ce ? "✋" : "⚡" })
                ]
              },
              `punch-${ye}`
            );
          }),
          Ce && w && /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-revert-auto",
              onClick: () => {
                w == null || w(D, t + r);
              },
              title: "Revert manual override back to AI Auto-Director",
              children: "↩ AUTO"
            }
          )
        ] })
      ] })
    ] }),
    B && /* @__PURE__ */ s.jsxs("div", { className: `feed-display-orientation-banner ${Ce ? "is-override" : "is-auto"}`, children: [
      /* @__PURE__ */ s.jsx("span", { className: "banner-pulse" }),
      /* @__PURE__ */ s.jsx("span", { className: "banner-text", children: q === "canvas" ? "⊞ CANVAS (PHYSICAL OS TOPOLOGY)" : q === "split" ? "🔲 SPLIT SCREEN (ALL MONITORS)" : q === "pip" ? `🪟 PiP MODE: ${gt.toUpperCase()} (HERO)` : `${Ce ? "✋ MANUAL OVERRIDE" : "⚡ AUTO-DIRECTOR"}: ${gt.toUpperCase()}` }),
      Ce && q === "director" && w && /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "banner-revert-btn",
          onClick: () => w == null ? void 0 : w(D, t + r),
          title: "Revert override back to AI Auto-Director",
          children: "↩ REVERT TO AUTO"
        }
      )
    ] }),
    _e && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: $,
        src: _e,
        className: "feed-video-element",
        style: {
          opacity: et && he === "A" ? 1 : 0,
          zIndex: he === "A" ? 3 : 1,
          pointerEvents: he === "A" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: he === "A",
        preload: "auto",
        muted: he !== "A" || jl().isMuted,
        onCanPlay: () => {
          De(), o && he === "A" && $.current && $.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          he === "A" && (F.current = !1, ht(!0), rt(!1), $.current && ($.current.defaultPlaybackRate = i, $.current.playbackRate = i));
        },
        onWaiting: () => {
          he === "A" && rt(!0);
        },
        onTimeUpdate: () => {
          var V;
          he === "A" && (!et && ((V = $.current) == null ? void 0 : V.currentTime) > 0 && (F.current = !1, ht(!0), rt(!1), $.current && ($.current.defaultPlaybackRate = i, $.current.playbackRate = i)), ue());
        },
        onError: () => {
          he === "A" && (F.current = !1, rt(!1), ht(!1));
        },
        onEnded: () => {
          he === "A" && lt();
        }
      }
    ),
    dt && /* @__PURE__ */ s.jsx(
      "video",
      {
        ref: E,
        src: dt,
        className: "feed-video-element",
        style: {
          opacity: et && he === "B" ? 1 : 0,
          zIndex: he === "B" ? 3 : 1,
          pointerEvents: he === "B" ? "auto" : "none",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        },
        playsInline: !0,
        autoPlay: he === "B",
        preload: "auto",
        muted: he !== "B" || jl().isMuted,
        onCanPlay: () => {
          De(), o && he === "B" && E.current && E.current.play().catch(() => {
          });
        },
        onPlaying: () => {
          he === "B" && (F.current = !1, ht(!0), rt(!1), E.current && (E.current.defaultPlaybackRate = i, E.current.playbackRate = i));
        },
        onWaiting: () => {
          he === "B" && rt(!0);
        },
        onTimeUpdate: () => {
          var V;
          he === "B" && (!et && ((V = E.current) == null ? void 0 : V.currentTime) > 0 && (F.current = !1, ht(!0), rt(!1), E.current && (E.current.defaultPlaybackRate = i, E.current.playbackRate = i)), ue());
        },
        onError: () => {
          he === "B" && (F.current = !1, rt(!1), ht(!1));
        },
        onEnded: () => {
          he === "B" && lt();
        }
      }
    ),
    q !== "split" && q !== "canvas" && /* @__PURE__ */ s.jsx(
      "div",
      {
        className: "feed-static-layer",
        style: { zIndex: et ? 0 : 2 },
        children: ee ? /* @__PURE__ */ s.jsx(zp, { isPlaying: o }) : Re && Re !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
          "img",
          {
            src: Re,
            className: "feed-static-image",
            alt: "Playback Frame",
            style: {
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)"
            }
          }
        ) : o ? null : /* @__PURE__ */ s.jsx("div", { className: "feed-decode-pending", children: /* @__PURE__ */ s.jsx("span", { children: "DECODE PENDING..." }) })
      }
    ),
    q === "split" && B && /* @__PURE__ */ s.jsxs("div", { className: "feed-split-container", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-primary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 1" }) }),
        Re && Re !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Re, className: "split-frame-img", alt: "Display 1" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "split-pane-divider" }),
      /* @__PURE__ */ s.jsxs("div", { className: "split-pane pane-secondary", children: [
        /* @__PURE__ */ s.jsx("div", { className: "split-pane-header", children: /* @__PURE__ */ s.jsx("span", { children: "SCREEN 2" }) }),
        Zt && Zt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Zt, className: "split-frame-img", alt: "Display 2" }) : /* @__PURE__ */ s.jsx("div", { className: "split-pane-placeholder", children: "DECODE PENDING..." })
      ] })
    ] }),
    q === "pip" && B && /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "feed-pip-overlay",
        onClick: (V) => {
          V.stopPropagation(), Ue((pe) => !pe);
        },
        title: "Click to swap primary and secondary screens",
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "pip-header", children: [
            /* @__PURE__ */ s.jsxs("span", { children: [
              "PiP: ",
              ce.toUpperCase()
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "pip-swap-hint", children: "⇄ SWAP" })
          ] }),
          Zt && Zt !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx("img", { src: Zt, className: "pip-frame-img", alt: "PiP Stream" }) : /* @__PURE__ */ s.jsx("div", { className: "pip-placeholder", children: "DECODE PENDING..." })
        ]
      }
    ),
    (q === "canvas" || q === "all-displays") && B && /* @__PURE__ */ s.jsxs("div", { className: "feed-canvas-container", ref: st, children: [
      /* @__PURE__ */ s.jsx("div", { className: "feed-canvas-grid-bg" }),
      /* @__PURE__ */ s.jsx(
        "div",
        {
          className: "feed-canvas-board",
          style: {
            width: We.width ? `${We.width}px` : "92%",
            height: We.height ? `${We.height}px` : "auto",
            aspectRatio: `${me.totalWidth} / ${me.totalHeight}`,
            maxWidth: "100%",
            maxHeight: "100%"
          },
          children: b.map((V, pe) => {
            const ye = h1(V, me), He = (V.displayId ?? V.DisplayId ?? `mon-${pe}`).toLowerCase(), qe = Ve[He] || (He === Me ? Re : null), xt = !!(V.isPrimary ?? V.IsPrimary);
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `canvas-display-pane ${xt ? "is-primary" : ""}`,
                style: {
                  left: `${ye.leftPct}%`,
                  top: `${ye.topPct}%`,
                  width: `${ye.widthPct}%`,
                  height: `${ye.heightPct}%`
                },
                onClick: (ft) => {
                  ft.stopPropagation(), I ? I(He) : H(He);
                },
                title: `Display ${pe + 1} (${V.width || 1920}x${V.height || 1080}) • Click to enter Fullscreen`,
                children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-header", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-index-pill", children: [
                      xt ? "★ " : "",
                      "🖥 ",
                      pe + 1
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "pane-title", children: V.displayName || V.DisplayName || He.toUpperCase() }),
                    /* @__PURE__ */ s.jsxs("span", { className: "pane-res", children: [
                      V.width || 1920,
                      "x",
                      V.height || 1080
                    ] }),
                    I && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "canvas-pane-fullscreen-btn",
                        onClick: (ft) => {
                          ft.stopPropagation(), I(He);
                        },
                        title: `Open Display ${pe + 1} in Fullscreen`,
                        children: "⛶"
                      }
                    )
                  ] }),
                  qe && qe !== "NO_SIGNAL" ? /* @__PURE__ */ s.jsx(
                    "img",
                    {
                      src: qe,
                      className: "canvas-frame-img",
                      alt: He
                    }
                  ) : /* @__PURE__ */ s.jsxs("div", { className: "canvas-pane-placeholder", children: [
                    /* @__PURE__ */ s.jsx("div", { className: "placeholder-radar-blip" }),
                    /* @__PURE__ */ s.jsxs("span", { children: [
                      "SYNCING ",
                      V.displayName || He.toUpperCase(),
                      "..."
                    ] })
                  ] })
                ]
              },
              He
            );
          })
        }
      )
    ] }),
    Ze && /* @__PURE__ */ s.jsx("div", { className: "feed-buffering-overlay", children: /* @__PURE__ */ s.jsxs("div", { className: "buffering-glass-card", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "radar-spinner-cluster", children: [
        /* @__PURE__ */ s.jsx("div", { className: "spinner-outer-ring" }),
        /* @__PURE__ */ s.jsx("div", { className: "spinner-inner-ring" }),
        /* @__PURE__ */ s.jsx("div", { className: "spinner-center-dot" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "buffering-meta-stack", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "meta-headline", children: [
          /* @__PURE__ */ s.jsx("span", { className: "beacon-pulse" }),
          /* @__PURE__ */ s.jsx("span", { children: "INITIALIZING STREAM PIPELINE" })
        ] }),
        /* @__PURE__ */ s.jsxs("span", { className: "meta-sub", children: [
          "BUFFERING // ",
          K,
          " • ",
          Me.toUpperCase()
        ] })
      ] })
    ] }) }),
    q === "director" && xe && /* @__PURE__ */ s.jsxs("div", { className: "director-live-hud-pill", children: [
      /* @__PURE__ */ s.jsx("span", { className: "director-live-icon", children: "🎬" }),
      /* @__PURE__ */ s.jsx("span", { className: "director-live-title", children: "AUTO-DIRECTOR:" }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-display", children: [
        "🖥️ ",
        Me.toUpperCase()
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "director-live-time", children: [
        "[",
        St(xe.startEpochMs ?? xe.StartEpochMs ?? 0, c, { includeSeconds: !0 }),
        " - ",
        St(xe.endEpochMs ?? xe.EndEpochMs ?? 0, c, { includeSeconds: !0 }),
        "]"
      ] })
    ] }),
    B && q !== "canvas" && /* @__PURE__ */ s.jsx(
      Hp,
      {
        displays: b,
        activeDisplayId: Me,
        mode: Ce ? "MANUAL" : "AUTO",
        activeTimeRange: xe ? `${St(xe.startEpochMs ?? xe.StartEpochMs ?? 0, c, { includeSeconds: !0 })} - ${St(xe.endEpochMs ?? xe.EndEpochMs ?? 0, c, { includeSeconds: !0 })}` : "",
        onSelectDisplay: (V) => {
          P && P(D, t + r, V), H(V);
        }
      }
    ),
    C && /* @__PURE__ */ s.jsx("div", { className: "feed-brand-watermark", children: /* @__PURE__ */ s.jsxs("span", { children: [
      "ARCHIVE RECORDING // ",
      K
    ] }) })
  ] });
}
const Qi = 2200, Ji = 400;
function p1({
  currentEpochMs: e = 0,
  keystrokes: t = [],
  keystrokeMode: n = "BURN_IN"
  // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
  const r = (n || "NONE").toUpperCase().replace("-", "_"), l = r === "BURN_IN" || r === "CAPTION", o = u.useMemo(() => {
    if (!l || !t.length || !e) return null;
    for (let c = t.length - 1; c >= 0; c--) {
      const d = t[c], v = d.epochMs + ya, p = e - v;
      if (p >= 0 && p <= Qi)
        return {
          ...d,
          elapsed: p
        };
    }
    return null;
  }, [l, e, t]);
  if (!l || !o) return null;
  let a = 1;
  if (o.elapsed > Qi - Ji) {
    const c = (o.elapsed - (Qi - Ji)) / Ji;
    a = Math.max(0, 1 - c);
  }
  if (a <= 0.05) return null;
  if (r === "CAPTION") {
    const c = Xp(o.keyCombination);
    return c ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-caption", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "caption-bar", children: /* @__PURE__ */ s.jsxs("span", { className: "caption-text", children: [
      "[ ",
      c,
      " ]"
    ] }) }) }) : null;
  }
  const i = Yp(o.keyCombination);
  return i.length ? /* @__PURE__ */ s.jsx("div", { className: "keystroke-overlay-root mode-burnin", style: { opacity: a }, children: /* @__PURE__ */ s.jsx("div", { className: "keycap-cluster", children: i.map((c, d) => /* @__PURE__ */ s.jsxs(To.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "keycap-badge", children: /* @__PURE__ */ s.jsx("span", { className: "keycap-text", children: c.toUpperCase() }) }),
    d < i.length - 1 && /* @__PURE__ */ s.jsx("span", { className: "keycap-plus", children: "+" })
  ] }, d)) }) }) : null;
}
const m1 = [
  {
    title: "PLAYBACK & SHUTTLE (NLE)",
    shortcuts: [
      { keys: ["Space"], desc: "Toggle timeline Play / Pause" },
      { keys: ["J", "K", "L"], desc: "NLE Shuttle: J = Reverse, K = Pause, L = Forward (2x / 4x)" },
      { keys: ["M"], desc: "Toggle Master Audio Mute" },
      { keys: ["←", "→"], desc: "Adaptive step by zoom level" },
      { keys: ["Ctrl", "+", "← / →"], desc: "Single frame precision step (1 Frame / 33ms)" },
      { keys: ["Shift", "+", "← / →"], desc: "Fast jump 5 seconds backward / forward" },
      { keys: ["Home", "End"], desc: "Jump playhead to Mark In / Mark Out" }
    ]
  },
  {
    title: "MARKING & SMART CUTTING",
    shortcuts: [
      { keys: ["I"], desc: "Set Mark In boundary at current playhead" },
      { keys: ["O"], desc: "Set Mark Out boundary at current playhead" },
      { keys: ["X"], desc: "Clear / Reset In & Out to entire timeline" },
      { keys: ["S"], desc: "Split Multicam Director cut at playhead" },
      { keys: ["Ctrl", "+", "E"], desc: "Export selected cut range directly" },
      { keys: ["Ctrl", "+", "S"], desc: "Save studio session draft state" }
    ]
  },
  {
    title: "CANVAS & VIEWPORT PRESETS",
    shortcuts: [
      { keys: ["1", "2", "4"], desc: "Instant layout presets (1x1 Focus, 2-Screen, 4-Screen Quad)" },
      { keys: ["G"], desc: "Auto-Grid arrangement of all active screens" },
      { keys: ["R"], desc: "Reset Canvas arrangement & center view" },
      { keys: ["F"], desc: "Toggle Fullscreen Viewport mode" },
      { keys: ["↑", "↓"], desc: "Select previous / next station in timeline" }
    ]
  },
  {
    title: "TIMELINE, AUDIO & KEYFRAMES",
    shortcuts: [
      { keys: ["+", "or", "Ins"], desc: "Add Canvas Keyframe at current playhead" },
      { keys: ["Delete", "or", "Bksp"], desc: "Delete selected Keyframe or Audio Clip" },
      { keys: ["Ctrl", "+", "Click"], desc: "Multi-select Audio Clips (Windows style)" },
      { keys: ["[", "or", "]"], desc: "Zoom Timeline In / Out" },
      { keys: ["\\"], desc: "Zoom to Fit Cut range in viewport" },
      { keys: ["Ctrl", "+", "Z / Y"], desc: "Undo / Redo editing actions" }
    ]
  }
];
function tm({ isOpen: e, onClose: t }) {
  return u.useEffect(() => {
    if (!e) return;
    const n = (r) => {
      r.key === "Escape" && (r.preventDefault(), t());
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e, t]), e ? Ts.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "shortcuts-modal-backdrop", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "shortcuts-modal-card", onClick: (n) => n.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title-row", children: [
          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", className: "header-icon", children: [
            /* @__PURE__ */ s.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "8", x2: "6.01", y2: "8", strokeWidth: "3" }),
            /* @__PURE__ */ s.jsx("line", { x1: "10", y1: "8", x2: "10.01", y2: "8", strokeWidth: "3" }),
            /* @__PURE__ */ s.jsx("line", { x1: "14", y1: "8", x2: "14.01", y2: "8", strokeWidth: "3" }),
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "18.01", y2: "8", strokeWidth: "3" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "12", x2: "6.01", y2: "12", strokeWidth: "3" }),
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "12", x2: "18.01", y2: "12", strokeWidth: "3" }),
            /* @__PURE__ */ s.jsx("line", { x1: "8", y1: "16", x2: "16", y2: "16", strokeWidth: "2.5" })
          ] }),
          /* @__PURE__ */ s.jsx("h3", { children: "KEYBOARD SHORTCUTS & OPERATIONAL CONTROLS" })
        ] }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close-modal", onClick: t, title: "Close (Esc)", children: "✕" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "modal-body-grid", children: m1.map((n, r) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-group-panel", children: [
        /* @__PURE__ */ s.jsx("h4", { className: "group-title", children: n.title }),
        /* @__PURE__ */ s.jsx("div", { className: "group-items-list", children: n.shortcuts.map((l, o) => /* @__PURE__ */ s.jsxs("div", { className: "shortcut-row", children: [
          /* @__PURE__ */ s.jsx("div", { className: "keys-cluster", children: l.keys.map((a, i) => a === "or" || a === "+" || a === "← / →" || a === "Z / Y" ? /* @__PURE__ */ s.jsx("span", { className: "key-separator", children: a }, i) : /* @__PURE__ */ s.jsx("kbd", { className: "tactical-kbd", children: a }, i)) }),
          /* @__PURE__ */ s.jsx("span", { className: "shortcut-desc", children: l.desc })
        ] }, o)) })
      ] }, r)) }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ s.jsx("span", { className: "footer-hint", children: "💡 Pro-Tip: Hardware-code mapped (I/O/J/K/L) ensures flawless operation across Hebrew & English keyboard layouts." }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-got-it", onClick: t, children: "GOT IT" })
      ] })
    ] }) }),
    document.body
  ) : null;
}
const kh = (e, t = 30) => {
  const n = Math.max(0, e), r = Math.floor(n / 1e3), l = Math.floor(r / 3600), o = Math.floor(r % 3600 / 60), a = r % 60, i = Math.floor(n % 1e3 / 1e3 * t), c = (d) => String(d).padStart(2, "0");
  return `${c(l)}:${c(o)}:${c(a)}.${c(i)}`;
};
function g1({
  isOpen: e,
  station: t,
  initialDisplayId: n = null,
  allStations: r = [],
  onSelectStation: l,
  onClose: o,
  baseEpochMs: a = 0,
  timeMode: i = "LOCAL",
  totalDurationMs: c = 36e5,
  zoomLevel: d = 1,
  onZoomChange: v,
  onZoomReset: p,
  onFitRange: m,
  onJumpViewportTo: y,
  viewportStartMs: C = 0,
  onViewportStartChange: j,
  playheadMs: P = 0,
  playheadEpochMs: w = 0,
  setPlayheadMs: g,
  inPointMs: x = 0,
  setInPointMs: I,
  outPointMs: S = 36e5,
  setOutPointMs: M,
  recordingSegments: h = {},
  globalGaps: $ = [],
  onExport: E,
  isPlaying: N,
  setIsPlaying: _,
  isLooping: U = !0,
  setIsLooping: R,
  playbackSpeed: F,
  setPlaybackSpeed: oe,
  keystrokeMode: re = "BURN_IN",
  onChangeKeystrokeMode: X,
  keystrokes: D = [],
  showRulerKeystrokes: K = !1,
  onToggleRulerKeystrokes: b,
  directorPlan: B,
  onOverrideDisplay: L,
  onSplitDirectorSegment: ie,
  onChangeDirectorSegmentDisplay: ne,
  onResetDirectorSegmentToAuto: q
}) {
  var Zt, _t, cn;
  const [H, Ae] = u.useState(!1), $e = N !== void 0 ? N : H, Ie = u.useCallback((De) => {
    const Pe = typeof De == "function" ? De($e) : De;
    _ ? _(Pe) : Ae(Pe), window.dispatchEvent(new CustomEvent("itb-set-playing", { detail: { isPlaying: Pe } }));
  }, [$e, _]), [Ue, xe] = u.useState(!0), Me = U !== void 0 ? U : Ue, nt = R || xe, [gt, ce] = u.useState(1), Ce = F !== void 0 ? F : gt, Ve = oe || ce, [ze, st] = u.useState(null), [We, se] = u.useState(!1), [me, T] = u.useState($), Q = ((Zt = t == null ? void 0 : t.displays) == null ? void 0 : Zt.length) > 1 || ((cn = (_t = t == null ? void 0 : t.topology) == null ? void 0 : _t.displays) == null ? void 0 : cn.length) > 1, [G, te] = u.useState(() => {
    if (!Q) return "mon-0";
    if (n) return n;
    try {
      const De = localStorage.getItem("itb_spotlight_viewmode");
      if (De) return De;
    } catch {
    }
    return "canvas";
  }), J = u.useCallback((De) => {
    te((Pe) => {
      const lt = typeof De == "function" ? De(Pe) : De;
      try {
        localStorage.setItem("itb_spotlight_viewmode", lt);
      } catch {
      }
      return lt;
    });
  }, []), [ee, he] = u.useState(!1);
  u.useEffect(() => {
    if (e) {
      if (!Q) {
        te("mon-0");
        return;
      }
      if (n)
        te(n);
      else
        try {
          const De = localStorage.getItem("itb_spotlight_viewmode");
          te(De || "canvas");
        } catch {
          te("canvas");
        }
    }
  }, [e, n, Q, t == null ? void 0 : t.id]);
  const Ge = u.useRef(null), _e = u.useRef(d);
  _e.current = d;
  const Be = u.useRef(C);
  Be.current = C;
  const dt = u.useRef(c);
  dt.current = c;
  const Je = u.useRef(t && t.id);
  u.useEffect(() => {
    var De, Pe, lt;
    t && t.id && Je.current !== t.id && (Je.current = t.id, Ve(1), ((De = t.displays) == null ? void 0 : De.length) > 1 || ((lt = (Pe = t.topology) == null ? void 0 : Pe.displays) == null ? void 0 : lt.length) > 1 || J("mon-0"));
  }, [t, Ve]);
  const wt = u.useMemo(() => t ? [t] : [], [t]);
  u.useEffect(() => {
    if (e)
      return document.body.classList.add("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !0 } })), () => {
        document.body.classList.remove("itb-spotlight-active"), window.dispatchEvent(new CustomEvent("spotlight-state-changed", { detail: { isOpen: !1 } }));
      };
  }, [e]), u.useEffect(() => {
    if (!e) return;
    const De = Ge.current;
    if (!De || !v || !j) return;
    const Pe = (lt) => {
      lt.preventDefault(), lt.stopPropagation();
      const ue = lt.ctrlKey || lt.shiftKey, Ze = _e.current, V = Be.current, pe = dt.current || 36e5;
      if (ue) {
        const ye = Math.abs(lt.deltaX) > Math.abs(lt.deltaY) ? lt.deltaX : lt.deltaY;
        if (ye === 0) return;
        const He = pe / Ze, qe = Math.max(0, pe - He), xt = He * 0.08 * (ye > 0 ? 1 : -1), ft = Math.max(0, Math.min(qe, V + xt));
        Be.current = ft, j(ft);
      } else {
        if (lt.deltaY === 0) return;
        const He = lt.deltaY < 0 ? 1.25 : 0.8, qe = De.getBoundingClientRect(), xt = qe.left + 150, ft = qe.right - 58, Qe = Math.max(100, ft - xt);
        let Nt = 0.5;
        lt.clientX >= xt && lt.clientX <= ft ? Nt = (lt.clientX - xt) / Qe : qe.width > 0 && (Nt = Math.max(0, Math.min(1, (lt.clientX - qe.left) / qe.width)));
        const kt = Math.max(32, pe / 2e3), Ft = Math.max(1, Math.min(kt, Math.round(Ze * He * 100) / 100));
        if (Ft === Ze) return;
        const $t = pe / Ze, un = pe / Ft, kn = V + Nt * $t - Nt * un, hs = Math.max(0, pe - un), ks = Math.max(0, Math.min(hs, kn));
        _e.current = Ft, Be.current = ks, j(ks), v(Ft);
      }
    };
    return De.addEventListener("wheel", Pe, { passive: !1, capture: !0 }), () => De.removeEventListener("wheel", Pe, { capture: !0 });
  }, [e, t, v, j]);
  const Et = u.useCallback(() => {
    p ? p() : (Be.current = 0, _e.current = 1, j == null || j(0), v == null || v(1));
  }, [p, j, v]), Gt = u.useCallback((De, Pe) => {
    if (m)
      m(De, Pe);
    else {
      const lt = Math.max(1e3, Pe - De), ue = Math.max(500, lt * 0.05), Ze = Math.max(0, De - ue), pe = Math.min(c, Pe + ue) - Ze, ye = Math.max(32, c / 2e3), He = Math.max(1, Math.min(ye, Number((c / pe).toFixed(1)))), qe = c / He, xt = Math.max(0, Math.min(Ze, c - qe));
      Be.current = xt, _e.current = He, j == null || j(xt), v == null || v(He);
    }
  }, [m, c, j, v]), Lt = u.useCallback((De, Pe = "center") => {
    if (y)
      y(De, Pe);
    else {
      if (De == null) return;
      const lt = _e.current || 1, ue = c / Math.max(1, lt), Ze = Pe === "start" ? ue / 4 : ue * 0.75, V = Math.max(0, Math.min(De - Ze, c - ue));
      Be.current = V, j == null || j(V);
    }
  }, [y, c, j]), et = u.useCallback(() => {
    Ie((De) => !De);
  }, [Ie]), ht = u.useCallback(async () => {
    var ue;
    if (!t || Math.abs(S - x) < 1e3) return;
    const De = (re || "NONE").toUpperCase().replace("-", "_");
    let Pe;
    De === "NONE" || De === "OFF" ? Pe = "None" : De === "CAPTION" ? Pe = "Caption" : Pe = "BurnIn";
    const lt = {
      createdBy: em(),
      stationIds: [t.id],
      stations: [t.id],
      stationId: t.id,
      hostname: t.hostname || t.name || t.id,
      inEpochMs: a + Math.round(x),
      outEpochMs: a + Math.round(S),
      keystrokeMode: Pe,
      layoutMode: Q ? G : "mon-0",
      targetDisplayId: !Q || G === "mon-0" || G === "mon-1" || G.startsWith("mon-") ? Q ? G : "mon-0" : null,
      isPipSwapped: ee,
      directorSegments: Q ? (B == null ? void 0 : B.segments) || ((ue = t == null ? void 0 : t.directorPlan) == null ? void 0 : ue.segments) || [] : []
    };
    try {
      E ? await E(lt) : (await fetch("/api/v1/extractor-advanced/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lt)
      })).ok || await fetch("/api/v1/extractor/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lt)
      });
    } catch (Ze) {
      console.warn("[SoloSpotlightModal] Export trigger error:", Ze);
    } finally {
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    }
  }, [t, x, S, a, E, re, G, ee, B]);
  u.useEffect(() => {
    if (!e || !t) return;
    const De = (Pe) => {
      if ((Pe.ctrlKey || Pe.metaKey) && (Pe.key === "e" || Pe.key === "E")) {
        Pe.preventDefault(), ht();
        return;
      }
      if (Pe.key === "?" || Pe.shiftKey && Pe.code === "Slash") {
        Pe.preventDefault(), se((lt) => !lt);
        return;
      }
      if (We) {
        Pe.key === "Escape" && se(!1);
        return;
      }
      if (Pe.key === "Escape" || Pe.code === "Escape") {
        Pe.preventDefault(), Pe.stopPropagation(), o == null || o();
        return;
      }
      if (Pe.code === "Space") {
        Pe.preventDefault(), et();
        return;
      }
      if (Pe.code === "KeyI") {
        Pe.preventDefault(), I(Math.max(0, Math.min(P, S - 1e3)));
        return;
      }
      if (Pe.code === "KeyO") {
        Pe.preventDefault(), M(Math.min(c, Math.max(P, x + 1e3)));
        return;
      }
      if (Pe.code === "ArrowLeft" || Pe.code === "ArrowRight") {
        Pe.preventDefault(), Ie(!1);
        const lt = Pe.code === "ArrowLeft";
        let ue;
        if (Pe.ctrlKey || Pe.metaKey)
          ue = 33;
        else if (Pe.shiftKey)
          ue = 5e3;
        else {
          const Ze = Math.max(1, d);
          ue = Math.max(33, Math.round(1e3 / Ze));
        }
        g((Ze) => {
          const V = lt ? Ze - ue : Ze + ue;
          return Math.max(0, Math.min(c, V));
        });
        return;
      }
      if (Pe.key === "ArrowDown") {
        Pe.preventDefault();
        const lt = r.findIndex((ue) => ue.id === t.id);
        if (lt !== -1) {
          const ue = (lt + 1) % r.length;
          l(r[ue].id);
        }
        return;
      }
      if (Pe.key === "ArrowUp") {
        Pe.preventDefault();
        const lt = r.findIndex((ue) => ue.id === t.id);
        if (lt !== -1) {
          const ue = (lt - 1 + r.length) % r.length;
          l(r[ue].id);
        }
        return;
      }
    };
    return window.addEventListener("keydown", De, { capture: !0 }), () => window.removeEventListener("keydown", De, { capture: !0 });
  }, [
    e,
    t,
    r,
    l,
    o,
    P,
    x,
    S,
    c,
    d,
    I,
    M,
    g,
    ht,
    et,
    Ie,
    We
  ]);
  const Tt = r.findIndex((De) => De.id === (t && t.id)), rt = r[Tt - 1], Re = r[Tt + 1];
  if (!e || !t) return null;
  const ot = w > 0 ? w : Math.round(a + P);
  return Ts.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "solo-spotlight-modal-overlay", dir: "ltr", children: [
      ze && /* @__PURE__ */ s.jsxs("div", { className: `spotlight-export-toast ${ze.status}`, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "toast-icon", children: [
          ze.status === "submitting" && /* @__PURE__ */ s.jsx("div", { className: "toast-spinner" }),
          ze.status === "success" && /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ s.jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          ze.status === "error" && /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [
            /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toast-content", children: [
          /* @__PURE__ */ s.jsx("span", { className: "toast-title", children: ze.message }),
          /* @__PURE__ */ s.jsxs("span", { className: "toast-meta", children: [
            "CUT: ",
            kh(S - x),
            " (",
            St(a + x, i),
            " → ",
            St(a + S, i),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-viewport-canvas", children: [
        /* @__PURE__ */ s.jsx(
          f1,
          {
            station: t,
            baseEpochMs: a,
            totalDurationMs: c,
            playheadMs: P,
            setPlayheadMs: g,
            isPlaying: $e,
            setIsPlaying: Ie,
            playbackSpeed: Ce,
            timeMode: i,
            inPointMs: x,
            outPointMs: S,
            isLooping: Me,
            recordingSegments: h,
            globalGaps: me,
            showWatermark: !0,
            directorPlan: B || (t == null ? void 0 : t.directorPlan),
            onOverrideDisplay: L,
            onResetOverride: q,
            viewMode: G,
            onViewModeChange: J,
            isPipSwapped: ee,
            onPipSwapChange: he
          }
        ),
        /* @__PURE__ */ s.jsx(
          p1,
          {
            currentEpochMs: ot,
            keystrokes: D,
            keystrokeMode: re
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-scrim-top" }),
        /* @__PURE__ */ s.jsx("div", { className: "canvas-scrim-bottom" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "spotlight-top-hud", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "top-hud-left-group", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-exit-spotlight",
              onClick: (De) => {
                De.preventDefault(), De.stopPropagation(), o == null || o();
              },
              title: "Exit Fullscreen (Esc)",
              children: [
                /* @__PURE__ */ s.jsx("kbd", { children: "ESC" }),
                /* @__PURE__ */ s.jsx("span", { children: "EXIT FULLSCREEN" })
              ]
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-spotlight-help",
              onClick: () => se(!0),
              title: "Keyboard Shortcuts Cheat Sheet (?)",
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", width: "13", height: "13", className: "help-icon-symbol", children: [
                  /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
                  /* @__PURE__ */ s.jsx("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
                  /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
                ] }),
                /* @__PURE__ */ s.jsx("span", { children: "SHORTCUTS" })
              ]
            }
          )
        ] }),
        r.length > 1 && /* @__PURE__ */ s.jsxs("div", { className: "station-switcher-pill", dir: "ltr", children: [
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !rt,
              onClick: () => rt && l(rt.id),
              title: rt ? `Previous: ${rt.displayName || rt.roleAlias || rt.hostname || rt.name} (↑)` : "First station",
              children: "◀"
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "counter-text", dir: "ltr", children: [
            Tt + 1,
            " / ",
            r.length
          ] }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              disabled: !Re,
              onClick: () => Re && l(Re.id),
              title: Re ? `Next: ${Re.displayName || Re.roleAlias || Re.hostname || Re.name} (↓)` : "Last station",
              children: "▶"
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "station-brand-pill", children: [
          /* @__PURE__ */ s.jsx("span", { className: "feed-res", children: "SURVEILLANCE ARCHIVE" }),
          /* @__PURE__ */ s.jsx("span", { className: "divider" }),
          /* @__PURE__ */ s.jsx("span", { className: "station-title", children: t.displayName || t.roleAlias || t.hostname || t.name }),
          t.hostname && (t.displayName || t.roleAlias) && (t.displayName || t.roleAlias).toLowerCase() !== t.hostname.toLowerCase() && /* @__PURE__ */ s.jsx("span", { className: "station-physical-badge", style: { fontSize: "10px", color: "#94a3b8", background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: "4px", marginLeft: "6px" }, title: `Physical Machine: ${t.hostname}`, children: t.hostname })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: `spotlight-bottom-island ${$e ? "is-playing-dimmed" : ""}`, ref: Ge, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "island-transport-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
              /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
              /* @__PURE__ */ s.jsx("span", { className: "val", children: kh(S - x) })
            ] }),
            (() => {
              const De = G === "mon-0" ? "SCREEN 1" : G === "mon-1" ? "SCREEN 2" : G.startsWith("mon-") ? `SCREEN ${parseInt(G.slice(4)) + 1}` : G.toUpperCase();
              return /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-export-cut-hero",
                  onClick: ht,
                  title: `Export Selected Cut Window as ${De} (Ctrl+E)`,
                  children: [
                    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                      /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                      /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { children: G === "all-displays" ? "EXPORT ALL SCREENS & DIRECTOR" : `EXPORT CUT (${De})` })
                  ]
                }
              );
            })()
          ] }),
          /* @__PURE__ */ s.jsx(
            Qc,
            {
              activeStationId: t.id,
              isPlaying: $e,
              setIsPlaying: et,
              isLooping: Me,
              setIsLooping: nt,
              playbackSpeed: Ce,
              onChangeSpeed: Ve,
              baseEpochMs: a,
              timeMode: i,
              totalDurationMs: c,
              inPointMs: x,
              setInPointMs: I,
              outPointMs: S,
              setOutPointMs: M,
              onSetInPoint: () => I(Math.max(0, Math.min(P, S - 1e3))),
              onSetOutPoint: () => M(Math.min(c, Math.max(P, x + 1e3))),
              onStepFrameBackward: () => {
                Ie(!1), g((De) => Math.max(0, De - 33));
              },
              onStepFrameForward: () => {
                Ie(!1), g((De) => Math.min(c, De + 33));
              }
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
            /* @__PURE__ */ s.jsx("span", { className: "digits", children: St(a + P, i) })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "island-timeline-board-wrap", children: /* @__PURE__ */ s.jsx(
          Jp,
          {
            stations: wt,
            activeStationId: t.id,
            onSelectActiveStation: () => {
            },
            baseEpochMs: a,
            timeMode: i,
            totalDurationMs: c,
            zoomLevel: d,
            onZoomChange: v,
            onZoomReset: Et,
            onFitRange: Gt,
            onJumpViewportTo: Lt,
            viewportStartMs: C,
            onViewportStartChange: j,
            playheadMs: P,
            setPlayheadMs: (De) => {
              Ie(!1), g(De);
            },
            inPointMs: x,
            setInPointMs: I,
            outPointMs: S,
            setOutPointMs: M,
            recordingSegments: h,
            onExport: ht,
            onEstimateLoaded: (De) => {
              De != null && De.removedGlobalGaps && T(De.removedGlobalGaps);
            },
            keystrokeMode: re,
            onChangeKeystrokeMode: X,
            keystrokes: D,
            showKeystrokes: K,
            showRulerKeystrokes: K,
            onToggleRulerKeystrokes: b,
            onSplitDirectorSegment: ie,
            onChangeDirectorSegmentDisplay: ne,
            onResetDirectorSegmentToAuto: q
          }
        ) })
      ] }),
      /* @__PURE__ */ s.jsx(
        tm,
        {
          isOpen: We,
          onClose: () => se(!1)
        }
      )
    ] }),
    document.body
  );
}
function nm({ isGlobalHost: e = !1 }) {
  const [t, n] = u.useState([]), [r, l] = u.useState(/* @__PURE__ */ new Set()), o = u.useRef(null), a = u.useRef(!1), i = u.useRef(0), [c, d] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), [v, p] = u.useState(() => {
    try {
      return localStorage.getItem("itb_export_drawer_pinned") === "true";
    } catch {
      return !1;
    }
  }), m = u.useCallback(async () => {
    if (!a.current && !(typeof document < "u" && document.hidden)) {
      a.current = !0;
      try {
        let h = await fetch("/api/v1/extractor-advanced/jobs");
        if (h.ok || (h = await fetch("/api/v1/extractor/jobs")), h.ok) {
          i.current = 0;
          const $ = await h.json(), E = Array.isArray($) ? $ : [];
          n(E), window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: E }));
        } else
          i.current++;
      } catch (h) {
        i.current++, i.current <= 2 && console.warn("[ExportJobMonitor] Polling error:", h);
      } finally {
        a.current = !1;
      }
    }
  }, []);
  u.useEffect(() => {
    let h = !0, $ = null;
    const E = () => {
      if (!h) return;
      let _ = 2500;
      typeof document < "u" && document.hidden ? _ = 3e4 : i.current > 0 && (_ = Math.min(3e4, 2500 * Math.pow(2, Math.min(i.current, 4)))), $ = setTimeout(async () => {
        await m(), E();
      }, _);
    }, N = () => {
      !document.hidden && h && (clearTimeout($), i.current = 0, m().then(E));
    };
    return document.addEventListener("visibilitychange", N), m().then(E), () => {
      h = !1, clearTimeout($), document.removeEventListener("visibilitychange", N);
    };
  }, [m]), u.useEffect(() => {
    const h = () => {
      p(!0), m();
    };
    return window.addEventListener("open-export-monitor", h), () => window.removeEventListener("open-export-monitor", h);
  }, [m]), u.useEffect(() => {
    if (!v || c) return;
    const h = ($) => {
      o.current && !o.current.contains($.target) && !$.target.closest(".export-floating-hud") && p(!1);
    };
    return document.addEventListener("pointerdown", h), () => document.removeEventListener("pointerdown", h);
  }, [v, c]);
  const y = typeof document < "u" && !!document.getElementById("itb-global-export-job-monitor-root");
  if (!e && y)
    return null;
  const C = t.filter((h) => h.status === "Processing" || h.status === "Queued"), j = t.filter((h) => h.status === "Completed" || h.isCompleted), P = () => {
    d((h) => {
      const $ = !h;
      try {
        localStorage.setItem("itb_export_drawer_pinned", String($));
      } catch {
      }
      return $;
    });
  }, w = () => {
    p(!1), d(!1);
    try {
      localStorage.setItem("itb_export_drawer_pinned", "false");
    } catch {
    }
  }, g = (h, $) => {
    $.stopPropagation(), !(!h || r.has(h)) && (l((E) => new Set(E).add(h)), setTimeout(() => {
      n((E) => {
        const N = E.filter((_) => (_.jobId || _.id) !== h);
        return window.dispatchEvent(new CustomEvent("export-jobs-updated", { detail: N })), N;
      }), l((E) => {
        const N = new Set(E);
        return N.delete(h), N;
      });
    }, 320), fetch(`/api/v1/extractor-advanced/jobs/${h}`, { method: "DELETE" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}`, { method: "DELETE" })).catch((E) => console.warn("[ExportJobMonitor] Dismiss failed:", E)));
  }, x = async (h, $) => {
    $.stopPropagation();
    try {
      await fetch(`/api/v1/extractor-advanced/jobs/${h}/bookmark`, { method: "POST" }).catch(() => fetch(`/api/v1/extractor/jobs/${h}/bookmark`, { method: "POST" })), m();
    } catch (E) {
      console.warn("[ExportJobMonitor] Bookmark failed:", E);
    }
  }, I = (h, $) => {
    $.stopPropagation();
    const E = h.networkFolderPath || (h.outputFilePath ? h.outputFilePath.substring(0, h.outputFilePath.lastIndexOf("\\")) : "");
    E && (navigator.clipboard.writeText(E), alert(`UNC Directory Path copied to clipboard:
${E}`));
  }, S = (h) => {
    const $ = h.jobId || h.id, E = `/api/v1/extractor-advanced/jobs/${$}/download`, N = document.createElement("a");
    N.href = E, N.download = h.fileName || `archive_${$}.tar`, document.body.appendChild(N), N.click(), document.body.removeChild(N), setTimeout(m, 1e3);
  }, M = (h) => {
    if (!h || h <= 0) return "0 B";
    const $ = h / (1024 * 1024);
    return $ >= 1e3 ? `${($ / 1024).toFixed(2)} GB` : `${$.toFixed(1)} MB`;
  };
  return t.length === 0 && !v ? null : Ts.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "export-job-monitor-root", dir: "ltr", children: [
      t.length > 0 && !v && /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `export-floating-hud ${C.length > 0 ? "has-active" : "all-ready"}`,
          onClick: () => p(!0),
          title: "Open Export Queue",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `beacon-dot ${C.length > 0 ? "active" : "done"}` }),
            /* @__PURE__ */ s.jsxs("div", { className: "hud-content", children: [
              /* @__PURE__ */ s.jsx("span", { className: "hud-title", children: C.length > 0 ? `EXPORTS: ${C.length} PACKAGING` : `${j.length} ARCHIVE${j.length > 1 ? "S" : ""} READY` }),
              /* @__PURE__ */ s.jsx("span", { className: `hud-metric ${C.length > 0 ? "" : "ready"}`, children: C.length > 0 ? `${C[0].progressPercent}%` : "DOWNLOAD" })
            ] })
          ]
        }
      ),
      v && /* @__PURE__ */ s.jsx("div", { className: "export-drawer-backdrop", onClick: () => !c && p(!1), children: /* @__PURE__ */ s.jsxs("aside", { ref: o, className: `export-drawer-panel ${c ? "pinned" : ""}`, onClick: (h) => h.stopPropagation(), children: [
        /* @__PURE__ */ s.jsxs("div", { className: "drawer-header", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "header-left", children: [
            /* @__PURE__ */ s.jsx("span", { className: "header-icon", children: "📦" }),
            /* @__PURE__ */ s.jsxs("div", { children: [
              /* @__PURE__ */ s.jsx("h3", { className: "drawer-title", children: "EXPORT QUEUE" }),
              /* @__PURE__ */ s.jsxs("span", { className: "drawer-subtitle", children: [
                t.length,
                " REGISTERED EXPORTS"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "bar-actions", style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                type: "button",
                className: `btn-pin ${c ? "active" : ""}`,
                onClick: P,
                title: c ? "Unpin Drawer" : "Pin Drawer",
                style: { background: "transparent", border: "none", cursor: "pointer", fontSize: "14px", color: c ? "#22d3ee" : "#94a3b8" },
                children: "📌"
              }
            ),
            /* @__PURE__ */ s.jsx("button", { className: "btn-close", onClick: w, children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "drawer-cards-scroll", children: t.map((h) => {
          const $ = h.status === "Completed" || h.isCompleted, E = h.status === "Failed" || h.isFailed, N = h.status === "Processing" || h.status === "Queued", _ = h.jobId || h.id, U = r.has(_), R = $ ? 100 : Math.round(h.progressPercent || h.progressPercentage || h.progress || 0);
          return /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `export-job-card ${h.status.toLowerCase()} ${h.isBookmarked ? "is-bookmarked" : ""} ${U ? "is-dismissing" : ""}`,
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "card-header-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "identity-group", children: [
                    /* @__PURE__ */ s.jsx("span", { className: `status-pill ${h.status.toLowerCase()}`, children: $ ? "READY" : h.status }),
                    /* @__PURE__ */ s.jsxs("span", { className: "operator-chip", title: `Export created by ${h.createdBy || "Guest Operator"}`, children: [
                      /* @__PURE__ */ s.jsx("span", { className: "chip-icon", children: "👤" }),
                      /* @__PURE__ */ s.jsx("span", { className: "chip-name", children: h.createdBy || "Guest Operator" })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "file-name", title: h.fileName, children: h.fileName })
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      className: "btn-dismiss-card",
                      onClick: (F) => g(_, F),
                      title: "Dismiss export task",
                      children: "✕"
                    }
                  )
                ] }),
                (h.notes || h.Notes) && /* @__PURE__ */ s.jsxs("div", { className: "job-notes-callout", title: `Export Note: ${h.notes || h.Notes}`, children: [
                  /* @__PURE__ */ s.jsx("span", { className: "notes-icon", children: "📝" }),
                  /* @__PURE__ */ s.jsx("span", { className: "notes-label", children: "NOTE:" }),
                  /* @__PURE__ */ s.jsx("span", { className: "notes-body", children: h.notes || h.Notes })
                ] }),
                N && /* @__PURE__ */ s.jsxs("div", { className: "job-progress-section", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-top-line", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "phase-lbl", children: h.statusMessage || "Processing..." }),
                    /* @__PURE__ */ s.jsxs("span", { className: "percent-val", children: [
                      R,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsx("div", { className: "progress-rail", children: /* @__PURE__ */ s.jsx("div", { className: "progress-fill", style: { width: `${Math.max(3, R)}%` } }) }),
                  /* @__PURE__ */ s.jsxs("div", { className: "progress-bottom-meta", children: [
                    /* @__PURE__ */ s.jsxs("span", { className: "size-streamed", children: [
                      "EST: ",
                      M(h.fileSizeBytes)
                    ] }),
                    /* @__PURE__ */ s.jsxs("div", { className: "telemetry-tags", children: [
                      /* @__PURE__ */ s.jsxs("span", { className: "operator-mini-tag", title: `Initiated by ${h.createdBy || "Guest Operator"}`, children: [
                        "👤 ",
                        h.createdBy || "Guest Operator"
                      ] }),
                      /* @__PURE__ */ s.jsx("span", { className: "speed", children: h.speedMBps > 0 ? `${h.speedMBps.toFixed(1)} MB/s` : "Analyzing" }),
                      h.estimatedSecondsRemaining > 0 && /* @__PURE__ */ s.jsxs("span", { className: "eta", children: [
                        "ETA ~",
                        Math.ceil(h.estimatedSecondsRemaining),
                        "s"
                      ] })
                    ] })
                  ] })
                ] }),
                $ && /* @__PURE__ */ s.jsxs("div", { className: "job-ready-meta-box", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "OPERATOR" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "val highlight-cyan", title: h.createdBy || "Guest Operator", children: [
                      "👤 ",
                      h.createdBy || "Guest Operator"
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "ARCHIVE SIZE" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val highlight-emerald", children: M(h.fileSizeBytes) })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "DOWNLOADS" }),
                    /* @__PURE__ */ s.jsxs("span", { className: "val", children: [
                      "📥 ",
                      h.downloadCount || 0
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "COMPLETED" }),
                    /* @__PURE__ */ s.jsx("span", { className: "val", children: h.completedAtUtc ? new Date(h.completedAtUtc).toLocaleTimeString() : "--:--" })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "meta-item", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "lbl", children: "RETENTION" }),
                    /* @__PURE__ */ s.jsx("span", { className: `val policy-tag ${h.isBookmarked ? "pinned" : ""}`, children: h.isBookmarked ? "★ PINNED" : "24H PURGE" })
                  ] })
                ] }),
                $ && /* @__PURE__ */ s.jsxs("div", { className: "card-actions-bar", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "sub-actions", children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: `btn-action-tool ${h.isBookmarked ? "bookmarked" : ""}`,
                        onClick: (F) => x(_, F),
                        title: h.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge",
                        children: h.isBookmarked ? "★ PINNED" : "☆ PIN"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-action-tool",
                        onClick: (F) => I(h, F),
                        title: "Copy shared network directory path (UNC)",
                        children: "📂 UNC"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    "button",
                    {
                      type: "button",
                      className: "btn-download-primary",
                      onClick: () => S(h),
                      children: "⬇ DOWNLOAD ARCHIVE"
                    }
                  )
                ] }),
                E && /* @__PURE__ */ s.jsx("div", { className: "job-failed-banner", children: /* @__PURE__ */ s.jsxs("span", { children: [
                  "FAILED: ",
                  h.errorMessage || h.error || "Export failed"
                ] }) })
              ]
            },
            _
          );
        }) })
      ] }) })
    ] }),
    document.body
  );
}
function x1({
  menu: e,
  // { x, y, station }
  onClose: t,
  onDeselect: n,
  onFocusSolo: r
}) {
  const l = u.useRef(null);
  if (u.useEffect(() => {
    if (!e) return;
    const d = (p) => {
      p.key === "Escape" && (t == null || t());
    }, v = (p) => {
      l.current && !l.current.contains(p.target) && (t == null || t());
    };
    return window.addEventListener("mousedown", v), window.addEventListener("keydown", d), () => {
      window.removeEventListener("mousedown", v), window.removeEventListener("keydown", d);
    };
  }, [e, t]), !e || !e.station) return null;
  const { x: o, y: a, station: i } = e, c = i.displayName || i.hostname || i.name || i.id;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      ref: l,
      className: "station-context-menu-root",
      style: { top: `${a}px`, left: `${o}px` },
      onClick: (d) => d.stopPropagation(),
      onContextMenu: (d) => d.preventDefault(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "menu-header", children: [
          /* @__PURE__ */ s.jsx("span", { className: "station-title", title: c, children: c }),
          /* @__PURE__ */ s.jsx("span", { className: "station-sub", children: i.hostname && c.toLowerCase() !== i.hostname.toLowerCase() ? `HOST: ${i.hostname}` : i.ipAddress || (i.isOnline ? "ONLINE" : "ACTIVE CHANNEL") })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "menu-divider" }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "menu-action-item deselect-action",
            onClick: () => {
              n == null || n(i.id), t == null || t();
            },
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", width: "13", height: "13", children: [
                /* @__PURE__ */ s.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ s.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] }),
              /* @__PURE__ */ s.jsx("span", { children: "Deselect (Remove from Grid)" })
            ]
          }
        ),
        r && /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "menu-action-item focus-action",
            onClick: () => {
              r == null || r(i.id), t == null || t();
            },
            children: [
              /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", width: "13", height: "13", children: [
                /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "3" }),
                /* @__PURE__ */ s.jsx("path", { d: "M3 12h3M18 12h3M12 3v3M12 18v3" })
              ] }),
              /* @__PURE__ */ s.jsx("span", { children: "Focus Station (Solo)" })
            ]
          }
        )
      ]
    }
  );
}
function y1({
  isOpen: e,
  onClose: t,
  onConfirm: n,
  compositionSummary: r = {},
  title: l = "MASTER MP4 EXPORT CONFIRMATION"
}) {
  const o = r.canvasWidth || 2560, a = r.canvasHeight || 1440, i = o / a, c = r.resolution || "2K";
  let d;
  Math.abs(i - 16 / 9) < 0.05 ? d = "16:9 Broadcast" : Math.abs(i - 16 / 10) < 0.05 ? d = "16:10 WUXGA / WQXGA" : Math.abs(i - 19 / 10) < 0.05 ? d = "19:10 NOC Extended" : Math.abs(i - 32 / 9) < 0.15 ? d = "32:9 Dual Screen" : Math.abs(i - 21 / 9) < 0.15 ? d = "21:9 Ultrawide" : Math.abs(i - 4 / 3) < 0.15 ? d = "4:3 Standard" : d = `${Math.round(i * 100) / 100}:1 Custom`;
  const p = ((M, h) => {
    const $ = Math.round(M * h / 2073600 * 6 * 10) / 10, E = Math.round($ * 60 / 8 * 10) / 10;
    return `~${$} Mbps (~${E} MB/min)`;
  })(o, a), [m, y] = u.useState("BurnIn"), [C, j] = u.useState(""), [P, w] = u.useState(!1);
  if (!e) return null;
  const g = async () => {
    w(!0);
    try {
      await n(m, c, C), t();
    } finally {
      w(!1);
    }
  }, x = (r.layout || "DIRECTOR").toUpperCase(), I = r.stationsCount || 1, S = r.audioSegmentsCount || 1;
  return Ts.createPortal(
    /* @__PURE__ */ s.jsx("div", { className: "itb-export-modal-backdrop", onClick: t, dir: "ltr", children: /* @__PURE__ */ s.jsxs("div", { className: "itb-export-modal-card", onClick: (M) => M.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "header-title", children: [
          /* @__PURE__ */ s.jsx("span", { className: "dot" }),
          /* @__PURE__ */ s.jsx("h3", { children: l })
        ] }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-close", onClick: t, children: "✕" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-body", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "summary-banner master-mp4-badge", children: [
          /* @__PURE__ */ s.jsx("div", { className: "banner-icon", children: "🎬" }),
          /* @__PURE__ */ s.jsxs("div", { className: "banner-details", children: [
            /* @__PURE__ */ s.jsx("div", { className: "banner-title", children: "UNIVERSAL MASTER MP4 OUTPUT" }),
            /* @__PURE__ */ s.jsxs("div", { className: "banner-desc", children: [
              "Slices, aligns, and composes all active channels into a ",
              /* @__PURE__ */ s.jsx("strong", { children: "single standalone MP4 file" }),
              ". Plays seamlessly in VLC, browsers, and forensic viewers with zero external player dependencies."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "composition-summary-card", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "VISUAL COMPOSITION:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value highlight", children: [
              "MASTER CANVAS [",
              x,
              "] (WYSIWYG ",
              d,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "CANVAS GEOMETRY:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value", children: [
              o,
              " × ",
              a,
              " (Ratio ",
              i.toFixed(2),
              ":1)"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "TARGET RESOLUTION:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value highlight", children: [
              o,
              " × ",
              a,
              " (",
              c,
              " • WYSIWYG MATCH)"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "ESTIMATED BITRATE:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value", children: p })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "ACTIVE STATIONS:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value", children: [
              I,
              " WORKSTATION",
              I > 1 ? "S" : ""
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUDIO MASTER MIX:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value", children: S > 1 ? `DYNAMIC ROUTING (${S} SEGMENTS)` : "PRIMARY CHANNEL AUDIO" })
          ] }),
          r.isAutoDirectorEnabled && /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "AUTO-DIRECTOR:" }),
            /* @__PURE__ */ s.jsx("span", { className: "value enabled", children: "ENABLED (SEAMLESS 150ms DIP-TO-BLACK & DISPLAY TOPOLOGY HUD)" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "summary-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: "label", children: "UTC WALL CLOCK:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "value enabled", children: [
              "PERMANENT (BURNED-IN AT ",
              lx(typeof localStorage < "u" && localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right"),
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "CANVAS EXPORT SPECIFICATION (WYSIWYG 1:1)" }),
        /* @__PURE__ */ s.jsxs("div", { className: "locked-resolution-banner", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "locked-res-header", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "locked-res-badge", children: [
              /* @__PURE__ */ s.jsx("span", { className: "lock-icon", children: "🔒" }),
              /* @__PURE__ */ s.jsxs("span", { className: "badge-text", children: [
                o,
                " × ",
                a,
                " (",
                c,
                " • ",
                d,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "locked-res-metric", children: p })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "locked-res-desc", children: "Exact 1:1 WYSIWYG canvas rendering locked from workspace. Pre-configured canvas geometry, multi-screen tiles, typography, and UTC clock overlay export with zero distortion or scaling artifacts." })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "SELECT KEYSTROKE PRESENTATION" }),
        /* @__PURE__ */ s.jsxs("div", { className: "modes-grid", children: [
          /* @__PURE__ */ s.jsxs("label", { className: `mode-card ${m === "BurnIn" ? "active" : ""}`, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "radio",
                name: "keystrokeMode",
                value: "BurnIn",
                checked: m === "BurnIn",
                onChange: () => y("BurnIn")
              }
            ),
            /* @__PURE__ */ s.jsxs("div", { className: "mode-content", children: [
              /* @__PURE__ */ s.jsx("div", { className: "mode-name", children: "HARD BURN-IN (IN-PLACE ON VIDEO)" }),
              /* @__PURE__ */ s.jsx("div", { className: "mode-desc", children: "Permanently bakes keystrokes directly onto the video pixels at the exact coordinate position of each screen for unalterable forensic evidence." })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("label", { className: `mode-card ${m === "None" ? "active" : ""}`, children: [
            /* @__PURE__ */ s.jsx(
              "input",
              {
                type: "radio",
                name: "keystrokeMode",
                value: "None",
                checked: m === "None",
                onChange: () => y("None")
              }
            ),
            /* @__PURE__ */ s.jsxs("div", { className: "mode-content", children: [
              /* @__PURE__ */ s.jsx("div", { className: "mode-name", children: "NONE (CLEAN MASTER VIDEO)" }),
              /* @__PURE__ */ s.jsx("div", { className: "mode-desc", children: "Export master video cleanly without any on-screen keystroke overlays." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "options-title", children: "MISSION / FORENSIC EXPORT NOTE (OPTIONAL)" }),
        /* @__PURE__ */ s.jsxs("div", { className: "export-notes-wrapper", children: [
          /* @__PURE__ */ s.jsx(
            "textarea",
            {
              className: "export-notes-input",
              placeholder: "Add operational notes or investigation context for team members (e.g. Incident #104 review, Shift handover)...",
              value: C,
              onChange: (M) => j(M.target.value),
              rows: 2,
              maxLength: 500
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "notes-char-counter", children: [
            C.length,
            " / 500"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-cancel", onClick: t, disabled: P, children: "CANCEL" }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "btn-confirm", onClick: g, disabled: P, children: P ? "ENQUEUING MASTER EXPORT..." : `CONFIRM & EXPORT MASTER MP4 (${o}×${a})` })
      ] })
    ] }) }),
    document.body
  );
}
function v1(e, t, n, r, l = null) {
  const [o, a] = u.useState([]), [i, c] = u.useState({}), [d, v] = u.useState(!1), p = u.useRef(o);
  p.current = o;
  const m = u.useCallback(async () => {
    if (isNaN(e)) return;
    const j = e + t;
    v(!0);
    try {
      const P = new URLSearchParams({
        startEpoch: String(e),
        endEpoch: String(j),
        startTime: n.start,
        endTime: n.end,
        timeMode: r
      }), w = await fetch(`/api/v1/extractor-advanced/stations?${P.toString()}`);
      if (w.ok) {
        const g = w.headers.get("content-type");
        if (g && g.includes("application/json")) {
          const x = await w.json(), S = (Array.isArray(x) ? x : x.stations || x.items || []).filter((M) => (M.recordingsCount || (M.segments ? M.segments.length : 0)) > 0).map((M) => {
            var h, $;
            return {
              id: String(M.id || M.stationId || M.agentId || M.hostname),
              hostname: M.hostname || "Station",
              roleAlias: M.roleAlias || null,
              roleHistory: M.roleHistory || [],
              displayName: M.displayName || M.roleAlias || M.hostname || "Station",
              isOnline: M.isOnline !== void 0 ? M.isOnline : !0,
              recordingsCount: M.recordingsCount || 0,
              segments: M.segments || [],
              displays: M.displays || M.Displays || ((h = M.displayTopology) == null ? void 0 : h.displays) || (($ = M.DisplayTopology) == null ? void 0 : $.Displays) || [],
              displayTopology: M.displayTopology || M.DisplayTopology || null,
              directorPlan: M.directorPlan || M.DirectorPlan || null,
              hasAudio: !!M.hasAudio,
              audioCodec: M.audioCodec || "",
              audioChannels: M.audioChannels || 0,
              audioLabel: M.audioLabel || (M.hasAudio ? "AAC" : "NONE"),
              width: M.width || 1920,
              height: M.height || 1080,
              fps: M.fps || 30,
              isVfr: !!M.isVfr,
              resolution: M.resolution || "1080p",
              feedSpec: M.feedSpec || "1080p • 30fps"
            };
          });
          a((M) => {
            if (!M || M.length === 0) return S;
            const h = new Map(M.map((N) => [N.id, N]));
            let $ = M.length !== S.length;
            const E = S.map((N) => {
              const _ = h.get(N.id);
              return _ ? _.isOnline === N.isOnline && _.displayName === N.displayName && _.roleAlias === N.roleAlias && _.feedSpec === N.feedSpec && _.recordingsCount === N.recordingsCount && _.fps === N.fps ? _ : ($ = !0, { ..._, ...N }) : ($ = !0, N);
            });
            return $ ? E : M;
          });
        }
      }
    } catch (P) {
      console.warn("[useStudioData] Failed fetching active stations:", P);
    } finally {
      v(!1);
    }
  }, [e, t, n.start, n.end, r]);
  u.useEffect(() => {
    m();
  }, [m]);
  const y = u.useMemo(() => {
    const j = /* @__PURE__ */ new Set();
    return o.forEach((P) => {
      P.id && j.add(P.id), P.hostname && j.add(P.hostname);
    }), Array.from(j).sort().join(",");
  }, [o]);
  u.useEffect(() => {
    if (!y || isNaN(e)) {
      c({});
      return;
    }
    let j = !0;
    return (async () => {
      try {
        const w = e + t, g = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(y)}&startEpoch=${e}&endEpoch=${w}`);
        if (g.ok && j) {
          const x = await g.json() || {}, I = {};
          (p.current || []).forEach((S) => {
            const M = x[S.id] || x[S.hostname] || x[S.displayName] || [];
            I[S.id] = M, I[S.hostname] = M;
          }), Object.keys(x).forEach((S) => {
            I[S] || (I[S] = x[S]);
          }), c(I);
        }
      } catch {
        j && c({});
      }
    })(), () => {
      j = !1;
    };
  }, [y, e, t]);
  const C = u.useMemo(() => {
    if (!o.length || !e)
      return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
    let j = 1 / 0, P = -1 / 0;
    o.forEach((I) => {
      (i[I.id] || i[I.hostname] || I.segments || []).forEach((M) => {
        const h = M.startEpochMs ?? M.startEpoch ?? 0, $ = M.endEpochMs ?? M.endEpoch ?? 0;
        h > 0 && h < j && (j = h), $ > 0 && $ > P && (P = $);
      });
    });
    let w = 1 / 0, g = -1 / 0;
    l && (i[l] || []).forEach((S) => {
      const M = S.startEpochMs ?? S.startEpoch ?? 0, h = S.endEpochMs ?? S.endEpoch ?? 0;
      M > 0 && M < w && (w = M), h > 0 && h > g && (g = h);
    });
    const x = (I) => I === 1 / 0 || I === -1 / 0 ? null : Math.max(0, Math.min(t, I - e));
    return {
      globalFirstMs: x(j),
      globalLastMs: x(P),
      currentFirstMs: x(w),
      currentLastMs: x(g)
    };
  }, [o, i, l, e, t]);
  return {
    allStations: o,
    setAllStations: a,
    recordingSegments: i,
    setRecordingSegments: c,
    isLoadingStations: d,
    refetchStations: m,
    movieBoundaries: C
  };
}
function N1({
  timelineBaseEpochMs: e,
  inPointMs: t,
  outPointMs: n,
  globalGaps: r = [],
  activeStation: l,
  spotlightStation: o,
  recordingSegments: a = {},
  initialPlayheadMs: i = 0,
  initialIsPlaying: c = !1,
  initialIsLooping: d = !0,
  initialPlaybackSpeed: v = 1,
  isGridMode: p = !1
}) {
  const [m, y] = u.useState(i), [C, j] = u.useState(c), [P, w] = u.useState(d), [g, x] = u.useState(v), I = u.useRef(null), S = u.useRef(null), M = o || l, h = u.useMemo(() => M ? a[M.id] || M.segments || [] : [], [M, a]), $ = h.some((U) => {
    const R = U.startEpochMs ?? U.startEpoch ?? 0, F = U.endEpochMs ?? U.endEpoch ?? 0, oe = e + m;
    return oe >= R && oe <= F;
  }), E = !!(!p && M && $);
  u.useEffect(() => {
    y((U) => U < t ? t : U > n ? (j(!1), n) : U);
  }, [t, n]);
  const N = u.useCallback((U) => {
    I.current || (I.current = U);
    const R = (U - I.current) * g, F = Math.min(R, 250 * g);
    I.current = U, y((oe) => {
      let re = oe + F;
      if (r && r.length > 0) {
        const X = e + re, D = r.find((K) => X >= K.startEpochMs && X < K.endEpochMs);
        D && (re = D.endEpochMs - e);
      }
      return re >= n && (P ? re = t : (j(!1), re = n)), re;
    }), C && (!E || p) && (S.current = requestAnimationFrame(N));
  }, [C, P, t, n, r, e, E, g, p]);
  u.useEffect(() => (C && (!E || p) ? (I.current = performance.now(), S.current = requestAnimationFrame(N)) : (S.current && cancelAnimationFrame(S.current), I.current = null), () => {
    S.current && cancelAnimationFrame(S.current);
  }), [C, N, E, p]);
  const _ = u.useCallback(() => {
    if (C)
      j(!1);
    else {
      let U = m;
      const R = e + U, F = r == null ? void 0 : r.find((oe) => R >= oe.startEpochMs && R < oe.endEpochMs);
      if (F)
        U = F.endEpochMs - e;
      else if (M && !$) {
        const oe = h.map((re) => ({ start: re.startEpochMs ?? re.startEpoch ?? 0, end: re.endEpochMs ?? re.endEpoch ?? 0 })).filter((re) => re.start > R).sort((re, X) => re.start - X.start)[0];
        oe && (U = oe.start - e);
      }
      U !== m && y(U), j(!0);
    }
  }, [C, m, e, r, M, $, h]);
  return {
    playheadMs: m,
    setPlayheadMs: y,
    isPlaying: C,
    setIsPlaying: j,
    isLooping: P,
    setIsLooping: w,
    playbackSpeed: g,
    setPlaybackSpeed: x,
    togglePlaySmart: _
  };
}
function k1(e) {
  return 1 - Math.pow(1 - e, 3);
}
function w1({
  containerRef: e,
  totalTimelineDurationMs: t,
  initialZoom: n = 1,
  initialViewportStart: r = 0
}) {
  const [l, o] = u.useState(n), [a, i] = u.useState(r), c = u.useRef(null), d = u.useRef(a);
  d.current = a;
  const v = u.useRef(l);
  v.current = l;
  const p = u.useRef(t);
  p.current = t;
  const m = Math.max(32, t / 2e3), y = t / l, C = u.useCallback((g, x = 280) => {
    c.current && cancelAnimationFrame(c.current);
    const I = d.current, S = g - I;
    if (Math.abs(S) < 1) return;
    const M = performance.now(), h = ($) => {
      const E = $ - M, N = Math.min(1, E / x);
      i(Math.round(I + S * k1(N))), N < 1 ? c.current = requestAnimationFrame(h) : c.current = null;
    };
    c.current = requestAnimationFrame(h);
  }, []), j = u.useCallback((g, x) => {
    const I = Math.max(1e3, x - g), S = Math.max(500, I * 0.05), M = Math.max(0, g - S), $ = Math.min(t, x + S) - M, E = Math.max(1, Math.min(m, Number((t / $).toFixed(1)))), N = t / E, _ = Math.max(0, Math.min(M, t - N));
    C(_), o(E);
  }, [t, m, C]), P = u.useCallback(() => {
    C(0), o(1);
  }, [C]), w = u.useCallback((g, x = "center") => {
    if (g == null) return;
    const I = x === "start" ? y / 4 : y * 0.75, S = Math.max(0, Math.min(g - I, t - y));
    C(S);
  }, [y, t, C]);
  return u.useEffect(() => () => {
    c.current && cancelAnimationFrame(c.current);
  }, []), u.useEffect(() => {
    let g = null;
    const x = (S) => {
      if (S.defaultPrevented) return;
      S.preventDefault(), S.stopPropagation();
      const M = S.ctrlKey || S.shiftKey, h = v.current, $ = d.current, E = p.current;
      if (M) {
        const N = Math.abs(S.deltaX) > Math.abs(S.deltaY) ? S.deltaX : S.deltaY;
        if (N === 0) return;
        const _ = E / Math.max(1, h), U = Math.max(0, E - _), R = _ * 0.08 * (N > 0 ? 1 : -1);
        i((F) => Math.max(0, Math.min(U, F + R)));
      } else {
        if (S.deltaY === 0) return;
        const _ = S.deltaY < 0 ? 1.25 : 0.8, U = Math.max(32, E / 2e3), R = g ? g.getBoundingClientRect() : { left: 0, width: window.innerWidth }, F = Math.max(0, Math.min(R.width, S.clientX - R.left)), oe = R.width > 0 ? F / R.width : 0.5;
        o((re) => {
          const X = Math.max(1, Math.min(U, Math.round(re * _ * 100) / 100));
          if (X === re) return re;
          const D = E / re, K = E / X, B = $ + oe * D - oe * K, L = Math.max(0, E - K);
          return i(Math.max(0, Math.min(L, B))), X;
        });
      }
    }, I = () => {
      const S = (e == null ? void 0 : e.current) || (typeof document < "u" ? document.querySelector(".studio-bottom-timeline") || document.querySelector(".timeline-board-root") : null);
      return S && !g ? (g = S, g.addEventListener("wheel", x, { passive: !1, capture: !0 }), !0) : !!g;
    };
    if (!I()) {
      const S = setInterval(() => {
        I() && clearInterval(S);
      }, 100);
      return () => {
        clearInterval(S), g && g.removeEventListener("wheel", x, { capture: !0 });
      };
    }
    return () => {
      g && g.removeEventListener("wheel", x, { capture: !0 });
    };
  }, [e]), {
    zoomLevel: l,
    setZoomLevel: o,
    viewportStartMs: a,
    setViewportStartMs: i,
    viewportDurationMs: y,
    animateViewportTo: C,
    fitRange: j,
    resetZoom: P,
    jumpViewportTo: w
  };
}
function E1({
  activeStationId: e,
  spotlightStationId: t,
  timelineStations: n = [],
  selectedStationIdsCount: r = 0,
  onSelectActiveStation: l,
  setPlaybackSpeed: o,
  playheadMs: a,
  setPlayheadMs: i,
  inPointMs: c,
  setInPointMs: d,
  outPointMs: v,
  setOutPointMs: p,
  totalTimelineDurationMs: m,
  zoomLevel: y = 1,
  togglePlaySmart: C,
  onToggleHelpModal: j,
  onSplitDirectorAtPlayhead: P,
  isModalActive: w = !1,
  hasGridPlacements: g = !0,
  onToggleGridFullscreen: x,
  isGridFullscreen: I = !1,
  onExitGridFullscreen: S
}) {
  u.useEffect(() => {
    const M = (h) => {
      const $ = h.target;
      if (!($.tagName === "INPUT" || $.tagName === "TEXTAREA" || $.tagName === "SELECT" || $.isContentEditable || $.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]'))) {
        if (h.key === "?" || h.shiftKey && h.code === "Slash") {
          h.preventDefault(), j == null || j();
          return;
        }
        if (!(w || t)) {
          if (h.code === "KeyI" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), d == null || d(Math.max(0, Math.min(a, v - 1e3)));
            return;
          }
          if (h.code === "KeyO" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), p == null || p(Math.min(m, Math.max(a, c + 1e3)));
            return;
          }
          if (h.code === "KeyX" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), d == null || d(0), p == null || p(m);
            return;
          }
          if (h.code === "KeyL" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), o == null || o((N) => N <= 0 ? 1 : N === 1 ? 2 : N === 2 ? 4 : N >= 4 ? 8 : 1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-forward"));
            return;
          }
          if (h.code === "KeyK" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), o == null || o(1), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-pause"));
            return;
          }
          if (h.code === "KeyJ" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-shuttle-reverse"));
            return;
          }
          if (h.code === "KeyM" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-toggle-mute"));
            return;
          }
          if (h.code === "Digit1" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 1 } }));
            return;
          }
          if (h.code === "Digit2" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 2 } }));
            return;
          }
          if (h.code === "Digit4" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-layout-preset", { detail: { count: 4 } }));
            return;
          }
          if (h.code === "KeyG" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-auto-grid"));
            return;
          }
          if (h.code === "KeyR" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-reset-canvas"));
            return;
          }
          if (h.code === "KeyF" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-toggle-fullscreen"));
            return;
          }
          if ((h.code === "Equal" || h.code === "NumpadAdd" || h.code === "Insert") && !h.ctrlKey && !h.metaKey) {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-add-keyframe"));
            return;
          }
          if ((h.code === "Delete" || h.code === "Backspace") && window.dispatchEvent(new CustomEvent("itb:studio-delete-selected")), h.code === "BracketLeft") {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-step", { detail: { direction: "in" } }));
            return;
          }
          if (h.code === "BracketRight") {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-step", { detail: { direction: "out" } }));
            return;
          }
          if (h.code === "Backslash") {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-zoom-fit-cut"));
            return;
          }
          if (h.code === "KeyS") {
            if (h.ctrlKey || h.metaKey) {
              h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-save-now"));
              return;
            } else if (!h.altKey) {
              h.preventDefault(), P == null || P();
              return;
            }
          }
          if (h.code === "KeyZ" && (h.ctrlKey || h.metaKey)) {
            h.preventDefault(), h.shiftKey ? window.dispatchEvent(new CustomEvent("itb:studio-redo")) : window.dispatchEvent(new CustomEvent("itb:studio-undo"));
            return;
          }
          if (h.code === "KeyY" && (h.ctrlKey || h.metaKey)) {
            h.preventDefault(), window.dispatchEvent(new CustomEvent("itb:studio-redo"));
            return;
          }
          if (h.code === "Space") {
            if (h.preventDefault(), !g) return;
            C();
            return;
          }
          if (h.code === "KeyF" && !h.ctrlKey && !h.metaKey && !h.altKey) {
            h.preventDefault(), x == null || x();
            return;
          }
          if ((h.key === "Escape" || h.code === "Escape") && I) {
            h.preventDefault(), S == null || S();
            return;
          }
          if (h.key === "Home") {
            h.preventDefault(), i == null || i(c);
            return;
          }
          if (h.key === "End") {
            h.preventDefault(), i == null || i(v);
            return;
          }
          if (h.code === "ArrowLeft" || h.code === "ArrowRight") {
            h.preventDefault();
            const N = h.code === "ArrowLeft";
            let _;
            if (h.ctrlKey || h.metaKey)
              _ = 33;
            else if (h.shiftKey)
              _ = 5e3;
            else {
              const U = Math.max(1, y);
              _ = Math.max(33, Math.round(1e3 / U));
            }
            i == null || i((U) => {
              const R = N ? U - _ : U + _;
              return Math.max(0, Math.min(m, R));
            });
            return;
          }
          if (h.code === "ArrowDown" || h.code === "ArrowUp") {
            if (!e || n.length <= 1) return;
            h.preventDefault();
            const N = n.findIndex((_) => _.id === e);
            if (N === -1) {
              l(n[0].id), o(1);
              return;
            }
            if (h.code === "ArrowDown") {
              const _ = (N + 1) % n.length;
              l(n[_].id), o(1);
            } else {
              const _ = (N - 1 + n.length) % n.length;
              l(n[_].id), o(1);
            }
          }
        }
      }
    };
    return window.addEventListener("keydown", M, { capture: !0 }), () => window.removeEventListener("keydown", M, { capture: !0 });
  }, [
    e,
    t,
    n,
    r,
    l,
    o,
    a,
    i,
    c,
    d,
    v,
    p,
    m,
    y,
    C,
    j,
    P,
    w,
    g,
    x,
    I,
    S
  ]);
}
const wh = (e = "LOCAL") => {
  const t = Date.now(), n = t - 4 * 60 * 60 * 1e3, r = uh(n, e), l = uh(t, e);
  return {
    start: r.fullStr,
    end: l.fullStr,
    startEpochMs: n,
    endEpochMs: t,
    durationMs: 144e5
  };
}, Gl = (e, t = null, n = "LOCAL") => {
  if (!e) return Date.now();
  if (typeof e == "number") return e;
  const r = String(e).trim();
  if (/^\d+$/.test(r)) return Number(r);
  let l = r, o = t;
  if (!o) {
    if (r.includes("T")) {
      const c = r.split("T");
      l = c[0], o = c[1];
    } else if (r.includes(" ")) {
      const c = r.split(" ");
      l = c[0], o = c[1];
    }
  }
  if (l && o) {
    const c = o.substring(0, 8), d = Hc(l, c, n);
    if (d !== null && !isNaN(d)) return d;
  }
  const a = r.replace(" ", "T"), i = new Date(a).getTime();
  return isNaN(i) ? Date.now() : i;
};
function j1() {
  var Xs, dn;
  const e = u.useMemo(() => Jg() || {}, []), [t, n] = u.useState(() => {
    var A, le;
    return (A = e.timeRange) != null && A.startEpochMs && ((le = e.timeRange) != null && le.endEpochMs) ? e.timeRange : wh();
  }), [r, l] = u.useState(e.timeMode || "LOCAL"), [o, a] = u.useState(e.keystrokeMode || "BURN_IN"), [i, c] = u.useState(() => typeof e.showRulerKeystrokes == "boolean" ? e.showRulerKeystrokes : !1);
  u.useEffect(() => {
    Hg().catch((A) => console.warn("[Studio] DST init error:", A));
  }, []);
  const d = u.useMemo(() => t.startEpochMs ? t.startEpochMs : Gl(t.start), [t.start, t.startEpochMs]), v = u.useMemo(() => Math.max(6e4, Math.round(t.durationMs * 0.05)), [t.durationMs]), p = u.useMemo(() => d - v, [d, v]), m = u.useMemo(() => t.durationMs + 2 * v, [t.durationMs, v]), [y, C] = u.useState(e.selectedStationIds || []), [j, P] = u.useState(e.activeStationId || null), [w, g] = u.useState(null), [x, I] = u.useState(null), [S, M] = u.useState([]), [h, $] = u.useState(!1), [E, N] = u.useState(null), [_, U] = u.useState(() => {
    var A;
    return e.compositionScope || (((A = e.selectedStationIds) == null ? void 0 : A.length) > 1 ? "inter-station" : "intra-station");
  }), [R, F] = u.useState(() => {
    try {
      const A = localStorage.getItem("itb_composition_layout");
      if (A) return A;
    } catch {
    }
    return e.compositionLayout || "canvas";
  }), oe = u.useCallback((A) => {
    F((le) => {
      const de = typeof A == "function" ? A(le) : A;
      try {
        localStorage.setItem("itb_composition_layout", de);
      } catch {
      }
      return de;
    });
  }, []), [re, X] = u.useState(() => typeof e.isAutoDirectorEnabled == "boolean" ? e.isAutoDirectorEnabled : !0), [D, K] = u.useState(() => !!e.isPipSwapped), [b, B] = u.useState(() => e.audioRoutingPlan || null), [L, ie] = u.useState(() => typeof e.isAutoFollowAudio == "boolean" ? e.isAutoFollowAudio : !0), [ne, q] = u.useState(!1), [H, Ae] = u.useState(null), [$e, Ie] = u.useState(() => e.canvasLayoutTimeline || null), [Ue, xe] = u.useState(0), Me = u.useCallback((A) => {
    Ie((le) => {
      const de = [...(le == null ? void 0 : le.keyframes) || []], fe = de.findIndex((Fe) => Math.abs(Fe.timestampEpochMs - A) < 300);
      if (fe >= 0)
        return xe(fe), le;
      const be = de[Ue] || de[0], ge = (be == null ? void 0 : be.layout) || H || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      }, Se = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestampEpochMs: Math.round(A),
        transitionDurationSec: 0.5,
        transitionType: "smooth",
        layout: JSON.parse(JSON.stringify(ge))
      }, z = [...de, Se].sort((Fe, Xe) => Fe.timestampEpochMs - Xe.timestampEpochMs), Ye = z.findIndex((Fe) => Fe.timestampEpochMs === Math.round(A));
      return xe(Ye >= 0 ? Ye : 0), {
        ...le || {},
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: z
      };
    });
  }, [Ue, H]), nt = u.useCallback((A, le) => {
    Ie((de) => !(de != null && de.keyframes) || de.keyframes.length === 0 ? de : Yc(de, A, le));
  }, []), gt = u.useCallback((A) => {
    Ie((le) => {
      if (!(le != null && le.keyframes) || le.keyframes.length <= 1) return le;
      const de = le.keyframes.filter((fe, be) => be !== A);
      return xe((fe) => Math.max(0, fe - 1)), { ...le, keyframes: de };
    });
  }, []), ce = u.useCallback((A, le) => {
    Ie((de) => {
      if (!(de != null && de.keyframes) || de.keyframes.length === 0) return de;
      const fe = Math.round(le), be = typeof A == "number" && de.keyframes[A] ? A : de.keyframes.findIndex((z) => z.id === A);
      if (be === -1) return de;
      const ge = [...de.keyframes];
      ge[be] = {
        ...ge[be],
        timestampEpochMs: fe
      }, ge.sort((z, Ye) => z.timestampEpochMs - Ye.timestampEpochMs);
      const Se = ge.findIndex((z) => z.timestampEpochMs === fe);
      return Se >= 0 && xe(Se), {
        ...de,
        keyframes: ge
      };
    });
  }, []);
  u.useEffect(() => (window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !0 } })), () => {
    window.dispatchEvent(new CustomEvent("itb:studio-mode", { detail: { active: !1 } }));
  }), []);
  const [Ce, Ve] = u.useState({}), ze = u.useCallback((A) => {
    C((le) => le.filter((de) => de !== A)), j === A && P(null), w === A && g(null), Ie((le) => {
      if (!le || !le.keyframes) return le;
      const de = le.keyframes.map((fe) => {
        var be;
        return {
          ...fe,
          layout: {
            ...fe.layout,
            placements: (((be = fe.layout) == null ? void 0 : be.placements) || []).filter((ge) => ge.stationId !== A)
          }
        };
      });
      return { ...le, keyframes: de };
    });
  }, [j, w]), st = u.useCallback((A, le) => {
    A.preventDefault(), A.stopPropagation();
    const de = 195, fe = 110, be = Math.min(A.clientX, window.innerWidth - de - 10), ge = Math.min(A.clientY, window.innerHeight - fe - 10);
    N({ x: be, y: ge, station: le });
  }, []), We = u.useMemo(() => typeof e.inEpochMs == "number" ? Math.max(0, Math.min(m, e.inEpochMs - p)) : typeof e.inPointMs == "number" ? Math.max(0, Math.min(m, e.inPointMs)) : v, [e.inEpochMs, e.inPointMs, p, m, v]), se = u.useMemo(() => typeof e.outEpochMs == "number" ? Math.max(We + 1e3, Math.min(m, e.outEpochMs - p)) : typeof e.outPointMs == "number" ? Math.max(We + 1e3, Math.min(m, e.outPointMs)) : v + t.durationMs, [e.outEpochMs, e.outPointMs, p, m, v, t.durationMs, We]), me = u.useMemo(() => typeof e.playheadEpochMs == "number" ? Math.max(0, Math.min(m, e.playheadEpochMs - p)) : typeof e.playheadMs == "number" ? Math.max(0, Math.min(m, e.playheadMs)) : We, [e.playheadEpochMs, e.playheadMs, p, m, We]), [T, Q] = u.useState(We), [G, te] = u.useState(se);
  u.useEffect(() => {
    if (!p) return;
    const A = Math.round(p + T), le = Math.round(p + G);
    Ie((de) => {
      var z, Ye;
      if (!de || !de.keyframes || de.keyframes.length === 0) return de;
      let fe = [...de.keyframes], be = !1, ge = fe.find((Fe) => Fe.tag === "cut-in");
      if (ge)
        ge.timestampEpochMs !== A && (ge.timestampEpochMs = A, be = !0);
      else {
        const Fe = fe.find((Xe) => Math.abs(Xe.timestampEpochMs - A) < 500);
        if (Fe)
          Fe.tag = "cut-in", Fe.timestampEpochMs = A, be = !0;
        else {
          const Xe = ((z = fe[0]) == null ? void 0 : z.layout) || H || { width: 1920, height: 1080, placements: [] };
          fe.push({
            id: `kf_cut_in_${Date.now()}`,
            tag: "cut-in",
            timestampEpochMs: A,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Xe))
          }), be = !0;
        }
      }
      let Se = fe.find((Fe) => Fe.tag === "cut-out");
      if (Se)
        Se.timestampEpochMs !== le && (Se.timestampEpochMs = le, be = !0);
      else {
        const Fe = fe.find((Xe) => Math.abs(Xe.timestampEpochMs - le) < 500 && Xe.tag !== "cut-in");
        if (Fe)
          Fe.tag = "cut-out", Fe.timestampEpochMs = le, be = !0;
        else {
          const Xe = ((Ye = fe[fe.length - 1]) == null ? void 0 : Ye.layout) || H || { width: 1920, height: 1080, placements: [] };
          fe.push({
            id: `kf_cut_out_${Date.now()}`,
            tag: "cut-out",
            timestampEpochMs: le,
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(Xe))
          }), be = !0;
        }
      }
      return be ? (fe.sort((Fe, Xe) => Fe.timestampEpochMs - Xe.timestampEpochMs), {
        ...de,
        keyframes: fe
      }) : de;
    });
  }, [p, T, G, H]);
  const { allStations: J, recordingSegments: ee, isLoadingStations: he, movieBoundaries: Ge } = v1(
    p,
    m,
    t,
    r,
    j
  ), _e = u.useMemo(() => J.find((A) => A.id === j) || null, [J, j]), Be = u.useCallback((A) => {
    Ve((le) => {
      const de = !(le[A] ?? !0);
      return Ie((fe) => {
        if (!(fe != null && fe.keyframes)) return fe;
        const be = fe.keyframes.map((ge) => {
          var Fe;
          const Se = ((Fe = ge.layout) == null ? void 0 : Fe.placements) || [];
          let z = !1;
          const Ye = Se.map((Xe) => {
            if (Xe.stationId === A) {
              if (!de && (Xe.displayId === "auto" || !Xe.displayId)) {
                z = !0;
                const tt = J.find((Ne) => Ne.id === A);
                return {
                  ...Xe,
                  displayId: "mon-0",
                  label: `${(tt == null ? void 0 : tt.displayName) || A} - Screen 1 (Main)`
                };
              } else if (de && (Xe.displayId === "mon-0" || !Xe.displayId) && Se.filter((Ne) => Ne.stationId === A).length === 1) {
                z = !0;
                const Ne = J.find((It) => It.id === A);
                return {
                  ...Xe,
                  displayId: "auto",
                  label: `${(Ne == null ? void 0 : Ne.displayName) || A} - Central Composition (Auto-Director)`
                };
              }
            }
            return Xe;
          });
          return z ? {
            ...ge,
            layout: {
              ...ge.layout,
              placements: Ye
            }
          } : ge;
        });
        return { ...fe, keyframes: be };
      }), {
        ...le,
        [A]: de
      };
    });
  }, [J]), dt = u.useCallback((A, le) => {
    Ie((de) => {
      var Xe, tt;
      if (!de || !de.keyframes || de.keyframes.length === 0) return de;
      const fe = Ue >= 0 && Ue < de.keyframes.length ? Ue : 0, be = de.keyframes[fe], ge = ((Xe = be == null ? void 0 : be.layout) == null ? void 0 : Xe.placements) || [], Se = (le || "mon-0").toLowerCase(), z = ge.findIndex((Ne) => {
        if (Ne.stationId !== A) return !1;
        const It = (Ne.displayId || "mon-0").toLowerCase();
        return It === Se || It === "auto" && (Se === "mon-0" || Se === "screen-0");
      });
      let Ye;
      if (z >= 0)
        Ye = ge.filter((Ne, It) => It !== z);
      else {
        const Ne = J.find((Jr) => Jr.id === A), It = ((tt = Ne == null ? void 0 : Ne.displays) == null ? void 0 : tt.find((Jr) => (Jr.displayId || "").toLowerCase() === Se)) || { width: 1920, height: 1080 }, rn = It.width || 1920, zt = It.height || 1080, hn = rn / zt, _n = hn >= 1 ? 640 : Math.round(360 * hn), Gr = hn >= 1 ? Math.round(640 / hn) : 360, Qr = {
          stationId: A,
          displayId: Se,
          label: `${(Ne == null ? void 0 : Ne.displayName) || A} - ${It.displayName || Se}`,
          x: 120 + ge.length * 40 % 800,
          y: 100 + ge.length * 40 % 500,
          width: _n,
          height: Gr,
          sourceWidth: rn,
          sourceHeight: zt,
          nativeAspectRatio: hn,
          aspectRatio: hn,
          zIndex: ge.length,
          rotation: 0,
          borderWidth: 2,
          borderColor: "#06B6D4",
          shadowEffect: "deep",
          borderRadius: 0
        };
        Ye = [...ge, Qr];
      }
      const Fe = [...de.keyframes];
      return Fe[fe] = {
        ...Fe[fe],
        layout: {
          ...Fe[fe].layout,
          placements: Ye
        }
      }, { ...de, keyframes: Fe };
    });
  }, [Ue, J]), Je = u.useMemo(() => !y || y.length === 0 ? [] : J.filter((A) => y.includes(A.id)), [J, y]);
  u.useEffect(() => {
    !p || isNaN(p) || Ie((A) => {
      if (A != null && A.keyframes && A.keyframes.length > 0) return A;
      const le = p + (T || 0), de = p + (G || m || 36e5), fe = H || {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        placements: []
      };
      return {
        width: 1920,
        height: 1080,
        backgroundColor: "#070A10",
        fps: 30,
        keyframes: [
          {
            id: `kf_root_${le}`,
            timestampEpochMs: Math.round(le),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(fe))
          },
          {
            id: `kf_out_${de}`,
            timestampEpochMs: Math.round(de),
            transitionDurationSec: 0.5,
            transitionType: "smooth",
            layout: JSON.parse(JSON.stringify(fe))
          }
        ]
      };
    });
  }, [p, T, G, m, H]), u.useEffect(() => {
    if (!Je || Je.length === 0 || !p || isNaN(p)) return;
    const A = p + (T || 0), le = p + (G || m || 36e5);
    le <= A || Je.forEach((de) => {
      Pr.fetchWaveform(de.id, A, le, null, 250);
    });
  }, [Je, p, T, G, m]);
  const wt = u.useMemo(() => J.find((A) => A.id === w) || null, [J, w]), Et = !!(w && wt), Gt = u.useRef("grid"), Lt = u.useRef(null), {
    playheadMs: et,
    setPlayheadMs: ht,
    isPlaying: Tt,
    setIsPlaying: rt,
    playbackSpeed: Re,
    setPlaybackSpeed: ot,
    isLooping: Zt,
    setIsLooping: _t,
    togglePlaySmart: cn
  } = N1({
    timelineBaseEpochMs: p,
    inPointMs: T,
    outPointMs: G,
    globalGaps: S,
    activeStation: _e,
    spotlightStation: wt,
    recordingSegments: ee,
    initialPlayheadMs: me,
    initialIsPlaying: !1,
    initialIsLooping: e.isLooping !== void 0 ? e.isLooping : !0,
    initialPlaybackSpeed: e.playbackSpeed || 1,
    isGridMode: !j
  }), {
    zoomLevel: De,
    setZoomLevel: Pe,
    viewportStartMs: lt,
    setViewportStartMs: ue,
    resetZoom: Ze,
    fitRange: V,
    jumpViewportTo: pe
  } = w1({
    containerRef: Lt,
    totalTimelineDurationMs: m,
    initialZoom: e.zoomLevel || 1,
    initialViewportStart: e.viewportStartMs || 0
  }), [ye, He] = u.useState(!1), [qe, xt] = u.useState(!1), [ft, Qe] = u.useState(!1), [Nt, kt] = u.useState(!1), [Ft, $t] = u.useState(
    !!(e.isWorkspaceActive && ((Xs = e.selectedStationIds) == null ? void 0 : Xs.length) > 0)
  ), [un, Tn] = u.useState([]);
  u.useEffect(() => {
    const A = Et && wt || _e, le = (A == null ? void 0 : A.hostname) || (A == null ? void 0 : A.displayName) || (A == null ? void 0 : A.id), de = (o || "NONE").toUpperCase().replace("-", "_");
    if (!le || !p || !(de !== "NONE" && de !== "OFF" || i)) {
      Tn([]);
      return;
    }
    const be = Math.max(0, p - 5e3), ge = p + m + 5e3, Se = new AbortController();
    return fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(le)}&startEpoch=${be}&endEpoch=${ge}`, { signal: Se.signal }).then((z) => z.ok ? z.json() : []).then((z) => Tn(Array.isArray(z) ? z : [])).catch((z) => {
      z.name !== "AbortError" && Tn([]);
    }), () => Se.abort();
  }, [_e, wt, Et, p, m, o, i]), u.useEffect(() => {
    he || (J.length === 0 ? ((y.length > 0 || j || Ft) && (C([]), P(null), g(null), $t(!1)), kt(!0), $(!0)) : ($(!1), C((A) => {
      const le = A.filter((de) => J.some((fe) => fe.id === de));
      return le.length !== A.length ? (le.length === 0 && ($t(!1), kt(!0)), le) : A;
    })));
  }, [he, J]);
  const kn = u.useCallback((A) => {
    if (A === null) {
      rt(!1), ot(1), P(null);
      return;
    }
    A !== j && ot(1), P(A);
  }, [j, rt, ot]), hs = u.useCallback((A, le = null) => {
    A !== j && ot(1), Gt.current = y.length <= 1 || j ? "spotlight" : "grid", P(A), g(A), I(le || null);
  }, [j, y.length, ot]), ks = u.useCallback(() => {
    g(null), I(null), Gt.current === "grid" && P(null);
  }, []), Ut = u.useMemo(() => {
    if (b != null && b.segments && b.segments.length > 0)
      return b;
    const A = y[0] || j || "mon-0";
    return {
      segments: [
        {
          startEpochMs: p,
          endEpochMs: p + m,
          sourceStationId: A
        }
      ]
    };
  }, [b, y, j, p, m]), As = u.useCallback((A) => {
    B((le) => {
      const de = le || Ut, fe = [...de.segments || []], be = fe.findIndex((tt) => {
        const Ne = tt.startEpochMs ?? tt.StartEpochMs ?? 0, It = tt.endEpochMs ?? tt.EndEpochMs ?? 0;
        return A > Ne + 500 && A < It - 500;
      });
      if (be === -1) return le;
      const ge = fe[be], Se = ge.startEpochMs ?? ge.StartEpochMs ?? 0, z = ge.endEpochMs ?? ge.EndEpochMs ?? 0, Ye = ge.sourceStationId ?? ge.SourceStationId ?? y[0], Fe = { startEpochMs: Se, endEpochMs: A, sourceStationId: Ye }, Xe = { startEpochMs: A, endEpochMs: z, sourceStationId: Ye };
      return fe.splice(be, 1, Fe, Xe), { ...de, segments: fe };
    });
  }, [Ut, y]), Vn = u.useCallback((A, le) => {
    B((de) => {
      const fe = de || Ut, be = (fe.segments || []).map((ge) => {
        const Se = ge.startEpochMs ?? ge.StartEpochMs ?? 0, z = ge.endEpochMs ?? ge.EndEpochMs ?? 0;
        return A >= Se && A <= z ? { ...ge, sourceStationId: le } : ge;
      });
      return { ...fe, segments: be };
    }), ie(!1);
  }, [Ut]), Vs = u.useCallback((A, le) => {
    B((de) => {
      const fe = de || Ut, be = (fe.segments || []).map((ge) => {
        const Se = ge.startEpochMs ?? ge.StartEpochMs ?? 0, z = ge.endEpochMs ?? ge.EndEpochMs ?? 0;
        return A >= Se && A <= z ? { ...ge, gain: le } : ge;
      });
      return { ...fe, segments: be };
    });
  }, [Ut]), Kr = u.useCallback(() => {
    ie((A) => !A);
  }, []), [Bt, pn] = u.useState({}), Vt = u.useCallback((A) => {
    if (!A) return null;
    if (Bt[A]) return Bt[A];
    const le = J.find((de) => de.id === A);
    return le != null && le.directorPlan ? le.directorPlan : {
      stationId: A,
      segments: [
        {
          startEpochMs: p,
          endEpochMs: p + m,
          targetDisplayId: "mon-0",
          isManualOverride: !1
        }
      ]
    };
  }, [Bt, J, p, m]), sn = u.useCallback((A, le) => {
    A && pn((de) => {
      const fe = de[A] || Vt(A), be = [...fe.segments || []], ge = be.findIndex((It) => {
        const rn = It.startEpochMs ?? It.StartEpochMs ?? 0, zt = It.endEpochMs ?? It.EndEpochMs ?? 0;
        return le > rn + 500 && le < zt - 500;
      });
      if (ge === -1) return de;
      const Se = be[ge], z = Se.startEpochMs ?? Se.StartEpochMs ?? 0, Ye = Se.endEpochMs ?? Se.EndEpochMs ?? 0, Fe = Se.targetDisplayId ?? Se.TargetDisplayId ?? "mon-0", Xe = !!(Se.isManualOverride ?? Se.IsManualOverride), tt = { ...Se, startEpochMs: z, endEpochMs: le, targetDisplayId: Fe, isManualOverride: Xe }, Ne = { ...Se, startEpochMs: le, endEpochMs: Ye, targetDisplayId: Fe, isManualOverride: Xe };
      return be.splice(ge, 1, tt, Ne), { ...de, [A]: { ...fe, segments: be } };
    });
  }, [Vt]), wn = u.useCallback((A, le, de) => {
    A && pn((fe) => {
      const be = fe[A] || Vt(A), ge = [...be.segments || []];
      let Se = ge.findIndex((Ye) => {
        const Fe = Ye.startEpochMs ?? Ye.StartEpochMs ?? 0, Xe = Ye.endEpochMs ?? Ye.EndEpochMs ?? 0;
        return le > Fe && le < Xe;
      });
      if (Se === -1 && (Se = ge.findIndex((Ye) => {
        const Fe = Ye.startEpochMs ?? Ye.StartEpochMs ?? 0, Xe = Ye.endEpochMs ?? Ye.EndEpochMs ?? 0;
        return le >= Fe && le <= Xe;
      })), Se === -1) return fe;
      const z = ge[Se];
      return ge[Se] = { ...z, targetDisplayId: de, isManualOverride: !0 }, { ...fe, [A]: { ...be, segments: ge } };
    });
  }, [Vt]), rs = u.useCallback((A, le) => {
    if (!A) return;
    const de = J.find((be) => be.id === A), fe = de == null ? void 0 : de.directorPlan;
    pn((be) => {
      var rn;
      const ge = be[A] || Vt(A), Se = [...ge.segments || []];
      let z = Se.findIndex((zt) => {
        const hn = zt.startEpochMs ?? zt.StartEpochMs ?? 0, _n = zt.endEpochMs ?? zt.EndEpochMs ?? 0;
        return le > hn && le < _n;
      });
      if (z === -1 && (z = Se.findIndex((zt) => {
        const hn = zt.startEpochMs ?? zt.StartEpochMs ?? 0, _n = zt.endEpochMs ?? zt.EndEpochMs ?? 0;
        return le >= hn && le <= _n;
      })), z === -1) return be;
      const Ye = Se[z], Fe = Ye.startEpochMs ?? Ye.StartEpochMs ?? 0, Xe = Ye.endEpochMs ?? Ye.EndEpochMs ?? 0, tt = (Fe + Xe) / 2, Ne = (rn = fe == null ? void 0 : fe.segments) == null ? void 0 : rn.find((zt) => {
        const hn = zt.startEpochMs ?? zt.StartEpochMs ?? 0, _n = zt.endEpochMs ?? zt.EndEpochMs ?? 0;
        return tt >= hn && tt <= _n;
      }), It = Ne ? Ne.targetDisplayId ?? Ne.TargetDisplayId ?? "mon-0" : "mon-0";
      return Se[z] = { ...Ye, targetDisplayId: It, isManualOverride: !1 }, { ...be, [A]: { ...ge, segments: Se } };
    });
  }, [J, Vt]);
  u.useEffect(() => {
    if (!Je || Je.length === 0 || isNaN(p)) return;
    const A = p + T, le = p + G;
    if (le <= A) return;
    const de = setTimeout(async () => {
      const fe = Je.filter((be) => {
        var Se;
        return (be.displays || be.Displays || ((Se = be.displayTopology) == null ? void 0 : Se.displays) || []).length > 1;
      });
      if (fe.length !== 0)
        for (const be of fe)
          try {
            const ge = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent(be.id)}&startEpoch=${A}&endEpoch=${le}`);
            if (ge.ok) {
              const Se = await ge.json();
              Se != null && Se.segments && Se.segments.length > 0 && pn((z) => {
                const Ye = z[be.id] || be.directorPlan, Fe = ((Ye == null ? void 0 : Ye.segments) || []).filter((tt) => tt.isManualOverride || tt.IsManualOverride);
                if (Fe.length === 0)
                  return { ...z, [be.id]: Se };
                const Xe = [...Se.segments];
                return Fe.forEach((tt) => {
                  const Ne = tt.startEpochMs ?? tt.StartEpochMs, It = tt.endEpochMs ?? tt.EndEpochMs;
                  for (let rn = Xe.length - 1; rn >= 0; rn--) {
                    const zt = Xe[rn].startEpochMs ?? Xe[rn].StartEpochMs, hn = Xe[rn].endEpochMs ?? Xe[rn].EndEpochMs;
                    if (!(hn <= Ne || zt >= It))
                      if (zt >= Ne && hn <= It)
                        Xe.splice(rn, 1);
                      else if (zt < Ne && hn > It) {
                        const _n = { ...Xe[rn], endEpochMs: Ne }, Gr = { ...Xe[rn], startEpochMs: It };
                        Xe.splice(rn, 1, _n, Gr);
                      } else zt < Ne ? Xe[rn].endEpochMs = Ne : hn > It && (Xe[rn].startEpochMs = It);
                  }
                  Xe.push(tt);
                }), Xe.sort((tt, Ne) => (tt.startEpochMs ?? tt.StartEpochMs) - (Ne.startEpochMs ?? Ne.StartEpochMs)), { ...z, [be.id]: { ...Se, segments: Xe } };
              });
            }
          } catch {
          }
    }, 500);
    return () => clearTimeout(de);
  }, [T, G, Je, p]);
  const Yn = u.useMemo(() => Je.map((A) => ({
    ...A,
    directorPlan: Bt[A.id] || A.directorPlan || Vt(A.id)
  })), [Je, Bt, Vt]), mn = u.useMemo(() => _e ? {
    ..._e,
    directorPlan: Bt[_e.id] || _e.directorPlan || Vt(_e.id)
  } : null, [_e, Bt, Vt]), $s = u.useMemo(() => wt ? {
    ...wt,
    directorPlan: Bt[wt.id] || wt.directorPlan || Vt(wt.id)
  } : null, [wt, Bt, Vt]), Vr = (A, le = 30) => {
    const de = Math.max(0, A), fe = Math.floor(de / 1e3), be = Math.floor(fe / 3600), ge = Math.floor(fe % 3600 / 60), Se = fe % 60, z = Math.floor(de % 1e3 / 1e3 * le), Ye = (Fe) => String(Fe).padStart(2, "0");
    return `${Ye(be)}:${Ye(ge)}:${Ye(Se)}.${Ye(z)}`;
  }, [gn, Qt] = u.useState(!1), [on, Rs] = u.useState(!0), [bt, ws] = u.useState(!1), Es = u.useRef(null), Oe = u.useMemo(() => {
    var fe;
    const A = $e == null ? void 0 : $e.keyframes, le = (A == null ? void 0 : A[Ue]) || (A == null ? void 0 : A[0]);
    return (((fe = le == null ? void 0 : le.layout) == null ? void 0 : fe.placements) || (H == null ? void 0 : H.placements) || []).length > 0 || y && y.length > 0;
  }, [$e, Ue, H, y]), Le = u.useCallback(() => {
    Es.current && clearTimeout(Es.current), Rs(!0), Es.current = setTimeout(() => {
      bt || Rs(!1);
    }, 2500);
  }, [bt]);
  u.useEffect(() => {
    if (!gn) {
      Rs(!0), Es.current && clearTimeout(Es.current);
      return;
    }
    const A = (le) => {
      le.clientY >= window.innerHeight - 280 && Rs(!0), Le();
    };
    return window.addEventListener("mousemove", A, { passive: !0 }), Le(), () => {
      window.removeEventListener("mousemove", A), Es.current && clearTimeout(Es.current);
    };
  }, [gn, Le]);
  const ci = u.useCallback(() => {
    Qt((A) => {
      const le = !A;
      return le ? document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {
      }) : document.fullscreenElement && document.exitFullscreen().catch(() => {
      }), le;
    });
  }, []), Ys = u.useCallback(() => {
    Qt(!1), document.fullscreenElement && document.exitFullscreen().catch(() => {
    });
  }, []);
  u.useEffect(() => {
    const A = () => {
      !document.fullscreenElement && gn && Qt(!1);
    };
    return document.addEventListener("fullscreenchange", A), () => document.removeEventListener("fullscreenchange", A);
  }, [gn]), E1({
    activeStationId: j,
    spotlightStationId: w,
    timelineStations: Yn,
    selectedStationIdsCount: y.length,
    onSelectActiveStation: kn,
    setPlaybackSpeed: ot,
    playheadMs: et,
    setPlayheadMs: ht,
    inPointMs: T,
    setInPointMs: Q,
    outPointMs: G,
    setOutPointMs: te,
    totalTimelineDurationMs: m,
    zoomLevel: De,
    togglePlaySmart: cn,
    onToggleHelpModal: () => Qe((A) => !A),
    onSplitDirectorAtPlayhead: () => {
      var le, de, fe;
      const A = j || (y.length === 1 ? y[0] : null);
      if (A) {
        const be = J.find((Se) => Se.id === A);
        (((le = be == null ? void 0 : be.displays) == null ? void 0 : le.length) > 1 || ((fe = (de = be == null ? void 0 : be.topology) == null ? void 0 : de.displays) == null ? void 0 : fe.length) > 1) && sn(A, p + et);
      }
    },
    isModalActive: ye || qe || ft,
    hasGridPlacements: Oe,
    onToggleGridFullscreen: ci,
    isGridFullscreen: gn,
    onExitGridFullscreen: Ys
  }), u.useEffect(() => {
    const A = p + T, le = p + G, de = p + et;
    Up({
      timeRange: t,
      timeMode: r,
      inPointMs: T,
      outPointMs: G,
      playheadMs: Math.round(et),
      inEpochMs: A,
      outEpochMs: le,
      playheadEpochMs: de,
      selectedStationIds: y,
      activeStationId: j,
      zoomLevel: De,
      viewportStartMs: lt,
      isWorkspaceActive: Ft,
      isLooping: Zt,
      playbackSpeed: Re,
      keystrokeMode: o,
      showRulerKeystrokes: i,
      compositionScope: _,
      compositionLayout: R,
      isAutoDirectorEnabled: re,
      isPipSwapped: D,
      audioRoutingPlan: Ut,
      isAutoFollowAudio: L,
      canvasLayoutTimeline: $e
    });
  }, [
    t,
    r,
    T,
    G,
    et,
    y,
    j,
    De,
    lt,
    Ft,
    Zt,
    Re,
    p,
    o,
    i,
    _,
    R,
    re,
    D,
    Ut,
    L,
    $e
  ]);
  const Xn = u.useCallback((A) => {
    var Fe, Xe;
    const le = Gl(A.startTime), de = Gl(A.endTime), fe = Math.max(0, de - le) || 144e5, be = {
      start: A.startTime,
      end: A.endTime,
      durationMs: fe,
      startEpochMs: le,
      endEpochMs: de
    }, ge = Math.max(6e4, Math.round(fe * 0.05)), Se = le - ge, z = fe + 2 * ge;
    if (n(be), A.inEpochMs && A.outEpochMs) {
      const tt = Math.max(0, Math.min(z, A.inEpochMs - Se)), Ne = Math.max(tt + 1e3, Math.min(z, A.outEpochMs - Se)), It = A.playheadEpochMs ? Math.max(0, Math.min(z, A.playheadEpochMs - Se)) : tt;
      Q(tt), te(Ne), ht(It);
    } else {
      const tt = typeof A.inPointMs == "number" ? A.inPointMs : ge, Ne = typeof A.outPointMs == "number" ? A.outPointMs : ge + fe, It = typeof A.playheadMs == "number" ? A.playheadMs : tt;
      Q(Math.max(0, Math.min(z, tt))), te(Math.max(0, Math.min(z, Ne))), ht(Math.max(0, Math.min(z, It)));
    }
    const Ye = ((Fe = A.selectedStationIds) == null ? void 0 : Fe.length) > 0 ? A.selectedStationIds : ((Xe = A.cutStationIds) == null ? void 0 : Xe.length) > 0 ? A.cutStationIds : A.stationIds;
    if ((Ye == null ? void 0 : Ye.length) > 0) {
      C(Ye);
      const tt = A.spotlightStationId || A.SpotlightStationId || null, Ne = A.activeStationId || A.ActiveStationId || null;
      tt && Ye.includes(tt) ? (P(tt), g(tt)) : Ne && Ye.includes(Ne) ? (P(Ne), g(null)) : (P(null), g(null));
    }
    A.keystrokeMode && a(A.keystrokeMode), $t(!0), kt(!1);
  }, []), ui = u.useCallback((A) => {
    const le = A.startEpochMs || Gl(A.start, null, r), de = A.endEpochMs || Gl(A.end, null, r), fe = Math.max(0, de - le) || 144e5, be = Math.max(6e4, Math.round(fe * 0.05)), ge = le - be, Se = fe + 2 * be;
    n({
      ...A,
      startEpochMs: le,
      endEpochMs: de,
      durationMs: fe
    }), $(!1), Q(be), te(be + fe), ht(be), Ie((z) => {
      if (!(z != null && z.keyframes) || z.keyframes.length === 0) return z;
      const Ye = z.keyframes.map((Fe, Xe) => Xe === 0 ? { ...Fe, timestampEpochMs: ge } : Fe).filter((Fe) => Fe.timestampEpochMs >= ge && Fe.timestampEpochMs <= ge + Se);
      return { ...z, keyframes: Ye };
    }), B((z) => {
      if (!(z != null && z.segments) || z.segments.length === 0) return z;
      if (!z.segments.some((Fe) => {
        const Xe = Fe.startEpochMs ?? Fe.StartEpochMs ?? 0;
        return (Fe.endEpochMs ?? Fe.EndEpochMs ?? 0) > ge && Xe < ge + Se;
      })) {
        const Fe = y[0] || j || "station-0";
        return {
          segments: [
            {
              startEpochMs: ge,
              endEpochMs: ge + Se,
              sourceStationId: Fe
            }
          ]
        };
      }
      return z;
    }), pn({});
  }, [r, y, j]), Dl = u.useCallback(() => {
    if (Je.map((le) => le.id).length === 0) return alert("No active stations selected in timeline.");
    q(!0);
  }, [Je]), di = u.useCallback(async (A, le, de = "") => {
    var z, Ye, Fe, Xe;
    const fe = Je.map((tt) => tt.id);
    if (fe.length === 0) return;
    let be = A === "None" ? "None" : "BurnIn";
    const ge = le || "NATIVE", Se = ((z = mn == null ? void 0 : mn.displays) == null ? void 0 : z.length) > 1 || ((Fe = (Ye = mn == null ? void 0 : mn.topology) == null ? void 0 : Ye.displays) == null ? void 0 : Fe.length) > 1 ? ((Xe = mn == null ? void 0 : mn.directorPlan) == null ? void 0 : Xe.segments) || [] : [];
    try {
      const tt = await fetch("/api/v1/extractor-advanced/cut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdBy: em(),
          notes: (de || "").trim(),
          stationIds: fe,
          inEpochMs: p + T,
          outEpochMs: p + G,
          keystrokeMode: be,
          resolution: ge || ($e == null ? void 0 : $e.resolution) || (H == null ? void 0 : H.resolution) || "2K",
          videoQuality: ge || ($e == null ? void 0 : $e.resolution) || (H == null ? void 0 : H.resolution) || "2K",
          compositionScope: _,
          layoutMode: "canvas",
          canvasLayout: H,
          canvasLayoutTimeline: $e || (H == null ? void 0 : H.timeline) || null,
          isPipSwapped: D,
          isAutoDirectorEnabled: re,
          directorSegments: Se,
          audioRoutingSegments: Ut.segments || [],
          utcClockPosition: (() => {
            try {
              return localStorage.getItem("itb_canvas_utc_clock_pos") || "top-right";
            } catch {
              return "top-right";
            }
          })()
        })
      });
      if (!tt.ok) {
        const Ne = await tt.json().catch(() => ({}));
        throw new Error(Ne.message || Ne.error || `HTTP ${tt.status}`);
      }
      window.dispatchEvent(new CustomEvent("open-export-monitor"));
    } catch (tt) {
      console.error("[Studio] Export failed:", tt), alert(`Failed to launch background master MP4 export job: ${tt.message}`);
    }
  }, [Je, p, T, G, _, H, $e, D, re, mn, Ut]), hi = u.useCallback(() => {
    Zg();
    try {
      window.dispatchEvent(new CustomEvent("extractor:clear-session"));
    } catch {
    }
    const A = wh(), le = Math.max(6e4, Math.round(A.durationMs * 0.05));
    n(A), Q(le), te(le + A.durationMs), ht(le), C([]), P(null), g(null), rt(!1), ot(1), a("BURN_IN"), Ze(), $t(!1), kt(!0);
  }, [Ze, rt, ot, ht]), Yr = !Ft || y.length === 0, Xr = p + et;
  return u.useEffect(() => {
    const A = $e == null ? void 0 : $e.keyframes;
    if (!A || A.length === 0) return;
    let le = 0;
    for (let de = 0; de < A.length && A[de].timestampEpochMs <= Xr + 50; de++)
      le = de;
    le !== Ue && xe(le);
  }, [Xr, $e == null ? void 0 : $e.keyframes, Ue]), /* @__PURE__ */ s.jsxs("div", { className: "extractor-advanced-studio", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "studio-workspace-area", children: [
      /* @__PURE__ */ s.jsx(
        Xg,
        {
          timeRange: t,
          baseEpochMs: d,
          timeMode: r,
          setTimeMode: l,
          activeStationId: j,
          hideBackToGrid: Je.length <= 1,
          onResetActiveStation: () => kn(null),
          onOpenRangeModal: () => He(!0),
          onOpenBookmarksModal: () => xt(!0),
          onOpenHelpModal: () => Qe(!0),
          onToggleDrawer: () => kt(!Nt),
          isInitialSetup: Yr,
          selectedCount: y.length,
          totalCount: J.length,
          onResetStudio: hi
        }
      ),
      h && /* @__PURE__ */ s.jsxs("div", { className: "studio-scope-alert-banner", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "alert-content", children: [
          /* @__PURE__ */ s.jsx("svg", { className: "alert-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "alert-text", children: [
            /* @__PURE__ */ s.jsx("span", { className: "alert-title", children: "NO RECORDING SESSIONS FOUND IN SELECTED TIME SCOPE" }),
            /* @__PURE__ */ s.jsxs("span", { className: "alert-desc", children: [
              "No stations or recorded video segments were found in the selected time range (",
              t.start,
              " — ",
              t.end,
              ")."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "alert-actions", children: [
          /* @__PURE__ */ s.jsxs(
            "button",
            {
              type: "button",
              className: "btn-alert-change-time",
              onClick: () => He(!0),
              children: [
                /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
                  /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
                  /* @__PURE__ */ s.jsx("polyline", { points: "12 6 12 12 16 14" })
                ] }),
                /* @__PURE__ */ s.jsx("span", { children: "CHANGE TIME SCOPE" })
              ]
            }
          ),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              className: "btn-alert-dismiss",
              onClick: () => $(!1),
              title: "Dismiss Alert",
              children: "✕"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: `studio-lower-body ${gn ? "cinema-fullscreen-mode" : ""}`, children: [
        gn && /* @__PURE__ */ s.jsxs("div", { className: `cinema-top-hud ${on ? "" : "is-hud-hidden"}`, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "top-hud-left-group", children: [
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: "btn-exit-spotlight",
                onClick: Ys,
                title: "Exit Fullscreen (Esc or F)",
                children: [
                  /* @__PURE__ */ s.jsx("kbd", { children: "ESC" }),
                  /* @__PURE__ */ s.jsx("span", { children: "EXIT FULLSCREEN" })
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                type: "button",
                className: "btn-spotlight-help",
                onClick: () => Qe(!0),
                title: "Keyboard Shortcuts (?)",
                children: [
                  /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", width: "13", height: "13", children: [
                    /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "10" }),
                    /* @__PURE__ */ s.jsx("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
                    /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
                  ] }),
                  /* @__PURE__ */ s.jsx("span", { children: "SHORTCUTS" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "cinema-brand-pill", children: [
            /* @__PURE__ */ s.jsx("span", { className: "feed-res", children: "MULTICAM GRID" }),
            /* @__PURE__ */ s.jsx("span", { className: "divider" }),
            /* @__PURE__ */ s.jsx("span", { className: "station-title", children: "TACTICAL CANVAS THEATER" }),
            /* @__PURE__ */ s.jsxs("span", { className: "station-physical-badge", children: [
              Yn.length,
              " ACTIVE WORKSTATIONS"
            ] })
          ] })
        ] }),
        !Yr && /* @__PURE__ */ s.jsxs("div", { className: "studio-left-content", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "studio-main-viewport-container", children: [
            /* @__PURE__ */ s.jsx(
              vx,
              {
                activeStation: mn,
                timelineStations: Yn,
                allStations: J,
                onSelectActiveStation: kn,
                onOpenSpotlight: hs,
                onStationContextMenu: st,
                onDeselectStation: ze,
                stationAutoDirectorMap: Ce,
                onToggleStationAutoDirector: Be,
                onOpenDrawer: () => kt(!0),
                baseEpochMs: p,
                playheadMs: et,
                playheadEpochMs: Xr,
                timeMode: r,
                isPlaying: Et ? !1 : Tt,
                setIsPlaying: rt,
                totalDurationMs: m,
                inPointMs: T,
                outPointMs: G,
                setPlayheadMs: ht,
                globalGaps: S,
                recordingSegments: ee,
                playbackSpeed: Re,
                onChangePlaybackSpeed: ot,
                keystrokeMode: o,
                keystrokes: un,
                directorPlan: mn == null ? void 0 : mn.directorPlan,
                onOverrideDisplay: wn,
                onResetOverride: rs,
                compositionScope: _,
                onChangeCompositionScope: U,
                compositionLayout: R,
                onChangeCompositionLayout: oe,
                isAutoDirectorEnabled: re,
                onToggleAutoDirector: () => X((A) => !A),
                isPipSwapped: D,
                onTogglePipSwap: () => K((A) => !A),
                onUpdateCanvasLayout: Ae,
                canvasLayoutTimeline: $e,
                onUpdateCanvasLayoutTimeline: Ie,
                activeKfIndex: Ue,
                setActiveKfIndex: xe,
                isModalOpen: ne || ye || qe || Et || ft,
                isGridFullscreen: gn,
                onToggleGridFullscreen: ci
              }
            ),
            !gn && /* @__PURE__ */ s.jsx(
              Qc,
              {
                hasGridPlacements: Oe,
                baseEpochMs: p,
                timeMode: r,
                totalDurationMs: m,
                playheadMs: et,
                setPlayheadMs: ht,
                inPointMs: T,
                setInPointMs: Q,
                outPointMs: G,
                setOutPointMs: te,
                activeStationId: j,
                isPlaying: Tt,
                setIsPlaying: cn,
                isLooping: Zt,
                setIsLooping: _t,
                playbackSpeed: Re,
                onChangeSpeed: ot,
                onSetInPoint: () => Q(Math.max(0, Math.min(et, G - 1e3))),
                onSetOutPoint: () => te(Math.min(m, Math.max(et, T + 1e3))),
                onStepFrameBackward: () => {
                  rt(!1), ht((A) => Math.max(0, A - 33));
                },
                onStepFrameForward: () => {
                  rt(!1), ht((A) => Math.min(m, A + 33));
                }
              }
            )
          ] }),
          gn && /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "cinema-bottom-sensor-strip",
              onMouseEnter: () => {
                Rs(!0), Le();
              }
            }
          ),
          /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: `studio-bottom-timeline ${gn ? "cinema-timeline-island" : ""} ${gn && !on ? "dock-hidden" : ""} ${gn && Tt ? "is-playing-dimmed" : ""}`,
              ref: Lt,
              onMouseEnter: () => ws(!0),
              onMouseLeave: () => {
                ws(!1), gn && Le();
              },
              children: [
                gn && /* @__PURE__ */ s.jsxs("div", { className: "cinema-island-transport-row", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "cut-actions-cluster", children: [
                    /* @__PURE__ */ s.jsxs("div", { className: "cut-duration-pill", children: [
                      /* @__PURE__ */ s.jsx("span", { className: "label", children: "CUT DURATION" }),
                      /* @__PURE__ */ s.jsx("span", { className: "val", children: Vr(G - T) })
                    ] }),
                    /* @__PURE__ */ s.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "btn-export-cut-hero",
                        onClick: Dl,
                        title: "Export Selected Cut Window (Ctrl+E)",
                        children: [
                          /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", width: "12", height: "12", children: [
                            /* @__PURE__ */ s.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                            /* @__PURE__ */ s.jsx("polyline", { points: "7 10 12 15 17 10" }),
                            /* @__PURE__ */ s.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                          ] }),
                          /* @__PURE__ */ s.jsx("span", { children: "EXPORT CUT" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ s.jsx(
                    Qc,
                    {
                      hasGridPlacements: Oe,
                      baseEpochMs: p,
                      timeMode: r,
                      totalDurationMs: m,
                      playheadMs: et,
                      setPlayheadMs: ht,
                      inPointMs: T,
                      setInPointMs: Q,
                      outPointMs: G,
                      setOutPointMs: te,
                      activeStationId: j,
                      isPlaying: Tt,
                      setIsPlaying: cn,
                      isLooping: Zt,
                      setIsLooping: _t,
                      playbackSpeed: Re,
                      onChangeSpeed: ot,
                      onSetInPoint: () => Q(Math.max(0, Math.min(et, G - 1e3))),
                      onSetOutPoint: () => te(Math.min(m, Math.max(et, T + 1e3))),
                      onStepFrameBackward: () => {
                        rt(!1), ht((A) => Math.max(0, A - 33));
                      },
                      onStepFrameForward: () => {
                        rt(!1), ht((A) => Math.min(m, A + 33));
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "clock-timecode", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "label", children: "PLAYHEAD" }),
                    /* @__PURE__ */ s.jsx("span", { className: "digits", children: St(p + et, r) })
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx(
                  Jp,
                  {
                    stations: Yn,
                    activeStationId: j,
                    onSelectActiveStation: (A) => kn(y.length <= 1 ? A : A === j ? null : A),
                    onStationContextMenu: st,
                    onDeselectStation: ze,
                    stationAutoDirectorMap: Ce,
                    onToggleStationAutoDirector: Be,
                    baseEpochMs: p,
                    timeMode: r,
                    totalDurationMs: m,
                    zoomLevel: De,
                    onZoomChange: Pe,
                    onZoomReset: Ze,
                    onFitRange: V,
                    onJumpViewportTo: pe,
                    playheadMs: et,
                    setPlayheadMs: ht,
                    inPointMs: T,
                    setInPointMs: Q,
                    outPointMs: G,
                    setOutPointMs: te,
                    viewportStartMs: lt,
                    onViewportStartChange: ue,
                    onExport: Dl,
                    recordingSegments: ee,
                    movieBoundaries: Ge,
                    onEstimateLoaded: (A) => (A == null ? void 0 : A.removedGlobalGaps) && M(A.removedGlobalGaps),
                    keystrokeMode: o,
                    onChangeKeystrokeMode: a,
                    keystrokes: un,
                    showKeystrokes: i,
                    showRulerKeystrokes: i,
                    onToggleRulerKeystrokes: () => c((A) => !A),
                    onSplitDirectorSegment: sn,
                    onChangeDirectorSegmentDisplay: wn,
                    onResetDirectorSegmentToAuto: rs,
                    audioRoutingPlan: Ut,
                    onSplitAudioSegment: As,
                    onChangeAudioSegmentStation: Vn,
                    onChangeAudioSegmentGain: Vs,
                    onFollowVisualFeed: Kr,
                    isAutoFollowAudio: L,
                    canvasLayoutTimeline: $e,
                    activeKfIndex: Ue,
                    onSelectKeyframe: (A, le) => {
                      xe(A), ht(Math.max(0, le - p));
                    },
                    onAddKeyframeAtEpoch: Me,
                    onDeleteKeyframe: gt,
                    onUpdateKeyframeEpoch: ce,
                    onUpdateKeyframeTransition: nt,
                    onToggleDisplayOnCanvas: dt,
                    onUpdateAudioPlan: B
                  }
                )
              ]
            }
          )
        ] }),
        !gn && /* @__PURE__ */ s.jsx(
          l1,
          {
            isOpen: Nt || Yr,
            onToggle: () => kt(!Nt),
            onClose: () => kt(!1),
            allStations: J,
            selectedStationIds: y,
            onToggleStation: (A) => C((le) => le.includes(A) ? le.filter((de) => de !== A) : [...le, A]),
            onUpdateSelections: C,
            isInitialSetup: Yr,
            isLoadingStations: he,
            recordingSegments: ee,
            baseEpochMs: d,
            durationMs: t.durationMs,
            onApply: () => {
              y.length > 0 && (P(null), g(null), $t(!0), kt(!1));
            },
            onOpenRangeModal: () => He(!0)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      i1,
      {
        isOpen: ye,
        onClose: () => He(!1),
        currentRange: t,
        timeMode: r,
        onTimeModeChange: l,
        onLoadBookmark: Xn,
        onApplyRange: ui
      }
    ),
    /* @__PURE__ */ s.jsx(
      u1,
      {
        isOpen: qe,
        onClose: () => xt(!1),
        timeMode: r,
        currentState: {
          timeRange: t,
          baseEpochMs: p,
          timelineBaseEpochMs: p,
          playheadMs: et,
          inPointMs: T,
          outPointMs: G,
          selectedStationIds: y,
          selectedStationNames: J.filter((A) => y.includes(A.id)).map((A) => A.displayName || A.hostname || A.id),
          allStationIds: J.map((A) => A.id),
          activeStationId: j,
          activeStationName: (_e == null ? void 0 : _e.displayName) || (_e == null ? void 0 : _e.hostname) || null,
          spotlightStationId: w,
          keystrokeMode: o
        },
        onLoadBookmark: Xn
      }
    ),
    /* @__PURE__ */ s.jsx(
      tm,
      {
        isOpen: ft,
        onClose: () => Qe(!1)
      }
    ),
    /* @__PURE__ */ s.jsx(
      g1,
      {
        isOpen: Et,
        station: $s,
        initialDisplayId: x,
        allStations: Yn,
        onSelectStation: (A) => {
          A !== w && ot(1), P(A), g(A);
        },
        onClose: ks,
        baseEpochMs: p,
        timeMode: r,
        totalDurationMs: m,
        zoomLevel: De,
        onZoomChange: Pe,
        onZoomReset: Ze,
        onFitRange: V,
        onJumpViewportTo: pe,
        viewportStartMs: lt,
        onViewportStartChange: ue,
        playheadMs: et,
        setPlayheadMs: ht,
        playheadEpochMs: Xr,
        inPointMs: T,
        setInPointMs: Q,
        outPointMs: G,
        setOutPointMs: te,
        recordingSegments: ee,
        globalGaps: S,
        isPlaying: Tt,
        setIsPlaying: rt,
        isLooping: Zt,
        setIsLooping: _t,
        playbackSpeed: Re,
        setPlaybackSpeed: ot,
        onExport: Dl,
        keystrokeMode: o,
        onChangeKeystrokeMode: a,
        keystrokes: un,
        showRulerKeystrokes: i,
        onToggleRulerKeystrokes: () => c((A) => !A),
        directorPlan: $s == null ? void 0 : $s.directorPlan,
        onOverrideDisplay: wn,
        onSplitDirectorSegment: sn,
        onChangeDirectorSegmentDisplay: wn,
        onResetDirectorSegmentToAuto: rs
      }
    ),
    /* @__PURE__ */ s.jsx(
      x1,
      {
        menu: E,
        onClose: () => N(null),
        onDeselect: ze,
        onFocusSolo: kn
      }
    ),
    /* @__PURE__ */ s.jsx(
      y1,
      {
        isOpen: ne,
        onClose: () => q(!1),
        onConfirm: di,
        compositionSummary: {
          scope: _,
          layout: (H == null ? void 0 : H.preset) || R,
          isPipSwapped: D,
          isAutoDirectorEnabled: re,
          stationsCount: Je.length,
          audioSegmentsCount: ((dn = Ut == null ? void 0 : Ut.segments) == null ? void 0 : dn.length) || 1,
          resolution: ($e == null ? void 0 : $e.resolution) || (H == null ? void 0 : H.resolution) || "2K",
          canvasWidth: (H == null ? void 0 : H.width) || 2560,
          canvasHeight: (H == null ? void 0 : H.height) || 1440
        }
      }
    ),
    /* @__PURE__ */ s.jsx(nm, {})
  ] });
}
const Eh = "itb-extractor-advanced-theme", jh = "itb-global-export-job-monitor-root";
function sm() {
  if (!(typeof document > "u") && !document.getElementById(Eh)) {
    const e = document.createElement("link");
    e.id = Eh, e.rel = "stylesheet", e.type = "text/css", e.href = "/extractor-advanced/extractor-advanced.style.css", document.head.appendChild(e);
  }
}
sm();
(function() {
  if (typeof document > "u") return;
  let t = document.getElementById(jh);
  if (!t) {
    t = document.createElement("div"), t.id = jh, document.body.appendChild(t);
    try {
      va.createRoot(t).render(To.createElement(nm, { isGlobalHost: !0 }));
    } catch (n) {
      console.error("[ExtractorAdvanced] Failed initializing global job monitor:", n);
    }
  }
})();
function C1(e, t = {}) {
  sm();
  const n = va.createRoot(e);
  return n.render(To.createElement(j1, t)), () => {
    n.unmount();
  };
}
export {
  nm as ExportJobMonitor,
  j1 as ExtractorAdvancedStudio,
  j1 as default,
  C1 as mount
};
